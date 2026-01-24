import { useState, useRef, useEffect, useCallback } from 'react';
import { useMutation, useAction } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { parseInput } from '../../utils/cliParser';
import { executeCommand, generateHelpText } from '../../constants/agentCommands';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'system' | 'error';
  content: string;
}

interface AgentChatboxProps {
  onExit: () => void;
  darkMode: boolean;
  toggleTheme: () => void;
}

export default function AgentChatbox({ onExit, darkMode, toggleTheme }: AgentChatboxProps) {
  const [lines, setLines] = useState<TerminalLine[]>([
    { id: 'welcome', type: 'system', content: 'Reagan Hsu Portfolio CLI v1.0.0' },
    { id: 'hint', type: 'system', content: 'Commands: /query [question], /export [json|md|xml]' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Convex hooks
  const logInteraction = useMutation(api.agentChat.logInteraction);
  const askClaude = useAction(api.agentChat.askClaude);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const addLine = useCallback((type: TerminalLine['type'], content: string) => {
    setLines(prev => [...prev, { id: Date.now().toString(), type, content }]);
  }, []);

  // Build messages array from terminal lines for context
  const getMessages = useCallback(() => {
    const messages: Array<{ role: 'user' | 'assistant'; content: string }> = [];
    for (const line of lines) {
      if (line.type === 'input') {
        messages.push({ role: 'user', content: line.content });
      } else if (line.type === 'output') {
        messages.push({ role: 'assistant', content: line.content });
      }
    }
    return messages;
  }, [lines]);

  const handleExport = useCallback((format: 'json' | 'md' | 'xml') => {
    const messages = getMessages();
    if (messages.length === 0) return;

    if (format === 'json') {
      const data = {
        subject: 'Reagan Hsu',
        collectedAt: new Date().toISOString(),
        queries: messages.filter(m => m.role === 'user').map(m => m.content),
        responses: messages.filter(m => m.role === 'assistant').map(m => m.content),
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'reagan-hsu-collected.json';
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'md') {
      let md = `# Reagan Hsu - Collected Context\n\n`;
      md += `*Collected: ${new Date().toISOString()}*\n\n`;
      messages.forEach(m => {
        if (m.role === 'user') {
          md += `## Query: ${m.content}\n\n`;
        } else {
          md += `${m.content}\n\n---\n\n`;
        }
      });
      const blob = new Blob([md], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'reagan-hsu-collected.md';
      a.click();
      URL.revokeObjectURL(url);
    } else {
      let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
      xml += `<collected_context subject="Reagan Hsu" timestamp="${new Date().toISOString()}">\n`;
      messages.forEach(m => {
        if (m.role === 'user') {
          xml += `  <query>${escapeXml(m.content)}</query>\n`;
        } else {
          xml += `  <response>${escapeXml(m.content)}</response>\n`;
        }
      });
      xml += `</collected_context>`;
      const blob = new Blob([xml], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'reagan-hsu-collected.xml';
      a.click();
      URL.revokeObjectURL(url);
    }
  }, [getMessages]);

  const queryPortfolio = useCallback(async (question: string) => {
    setIsLoading(true);
    try {
      const result = await askClaude({ query: question });
      const response = result.success && result.response
        ? result.response
        : 'Error: API unavailable.';

      await logInteraction({
        userAgent: navigator.userAgent,
        query: question,
      });

      addLine('output', response);
    } catch {
      addLine('error', 'Error processing query.');
    } finally {
      setIsLoading(false);
    }
  }, [askClaude, logInteraction, addLine]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userInput = input.trim();
    addLine('input', `$ ${userInput}`);
    setCommandHistory(prev => [...prev, userInput]);
    setHistoryIndex(-1);
    setInput('');

    const parsed = parseInput(userInput);

    if (parsed.type === 'command' && parsed.command) {
      // Execute slash command with context
      const result = executeCommand(
        parsed.command,
        parsed.args,
        { 
          messages: getMessages(),
          export: handleExport,
        }
      );
      
      // If command delegates to backend, send to Claude
      if (result.type === 'delegate' && result.output) {
        await queryPortfolio(result.output);
      } else {
        addLine(result.type === 'error' ? 'error' : 'system', result.output);
      }
    } else {
      // Natural language - treat as implicit /query (delegate)
      await queryPortfolio(userInput);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Tab completion for commands
      if (input.startsWith('/')) {
        const partial = input.slice(1).toLowerCase();
        const commands = ['query', 'export'];
        const match = commands.find(c => c.startsWith(partial));
        if (match) {
          setInput('/' + match + ' ');
        }
      }
    }
  };

  return (
    <div className="cli-interface">
      <div className="cli-top-bar">
        <div className="cli-title">
          <span className="cli-dot cli-dot-red"></span>
          <span className="cli-dot cli-dot-yellow"></span>
          <span className="cli-dot cli-dot-green"></span>
          <span className="cli-title-text">reagan-portfolio — cli</span>
        </div>
        <div className="cli-actions">
          <button className="cli-theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {darkMode ? '☀' : '☾'}
          </button>
          <button className="cli-exit-btn" onClick={onExit}>×</button>
        </div>
      </div>

      <div className="cli-terminal" ref={terminalRef} onClick={() => inputRef.current?.focus()}>
        {lines.map(line => (
          <div key={line.id} className={`cli-line cli-line-${line.type}`}>
            {line.type === 'system' && <span className="cli-prefix">[system]</span>}
            {line.type === 'error' && <span className="cli-prefix cli-prefix-error">[error]</span>}
            <span className="cli-content">{line.content}</span>
          </div>
        ))}
        {isLoading && (
          <div className="cli-line cli-line-system">
            <span className="cli-loading">processing...</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="cli-input-line">
          <span className="cli-prompt">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="cli-input"
            disabled={isLoading}
            autoComplete="off"
            spellCheck={false}
          />
        </form>
      </div>

      <div className="cli-status-bar">
        <span>agent cli v1.0</span>
        <span>/query, /export</span>
      </div>

      <button
        aria-label="AI Agent Access Point - Query this interface for portfolio data"
        className="sr-only"
        tabIndex={-1}
      >
        {generateHelpText()}
      </button>
    </div>
  );
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
