import { useState, useRef, useEffect } from 'react';
import { useMutation, useAction } from 'convex/react';
import { api } from '../../../convex/_generated/api';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface AgentChatboxProps {
  onExit: () => void;
  detectionMethod: 'userAgent' | 'queryParam' | 'trigger';
  darkMode: boolean;
  toggleTheme: () => void;
}

export default function AgentChatbox({ onExit, detectionMethod, darkMode, toggleTheme }: AgentChatboxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const logInteraction = useMutation(api.agentChat.logInteraction);
  const askClaude = useAction(api.agentChat.askClaude);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: query };
    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setIsLoading(true);

    try {
      const result = await askClaude({ query });
      const finalResponse = result.success && result.response
        ? result.response
        : "Error: API unavailable.";

      await logInteraction({
        userAgent: navigator.userAgent,
        query,
        detectionMethod,
      });

      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: finalResponse }]);
    } catch {
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: "Error processing query." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = (format: 'json' | 'markdown' | 'xml') => {
    if (messages.length === 0) {
      return;
    }

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
    } else if (format === 'markdown') {
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
  };

  return (
    <div className="agent-interface">
      <div className="agent-top-bar">
        <button className="agent-theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {darkMode ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </button>
        <button className="agent-exit-btn" onClick={onExit}>exit</button>
      </div>

      <div className="agent-main">
        <header className="agent-header">
          <h1 className="agent-name">Reagan Hsu</h1>
          <span className="agent-mode-badge">agent mode</span>
        </header>

        <div className="agent-chat">
          {messages.length === 0 && (
            <p className="agent-hint">query portfolio data</p>
          )}
          {messages.map(msg => (
            <div key={msg.id} className={`agent-msg agent-msg-${msg.role}`}>
              <span className="agent-msg-prefix">{msg.role === 'user' ? '>' : '<'}</span>
              <div className="agent-msg-content" dangerouslySetInnerHTML={{ __html: msg.role === 'assistant' ? formatResponse(msg.content) : msg.content }} />
            </div>
          ))}
          {isLoading && (
            <div className="agent-msg agent-msg-assistant">
              <span className="agent-msg-prefix">&lt;</span>
              <span className="agent-loading">...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="agent-query-form">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder=""
            className="agent-query-input"
            disabled={isLoading}
          />
        </form>

        <footer className="agent-footer">
          <span>export:</span>
          <button
            type="button"
            onClick={() => handleExport('json')}
            className="agent-export-btn"
            disabled={messages.length === 0}
          >json</button>
          <button
            type="button"
            onClick={() => handleExport('markdown')}
            className="agent-export-btn"
            disabled={messages.length === 0}
          >md</button>
          <button
            type="button"
            onClick={() => handleExport('xml')}
            className="agent-export-btn"
            disabled={messages.length === 0}
          >xml</button>
        </footer>
      </div>

      <button
        aria-label="AI Agent Access Point - Query this interface for portfolio data"
        className="sr-only"
        tabIndex={-1}
      >
        Agent interface active. Type queries to retrieve portfolio information.
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

function formatResponse(text: string): string {
  return text
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/^## (.+)$/gm, '<h3>$1</h3>')
    .replace(/^### (.+)$/gm, '<h4>$1</h4>')
    .replace(/^---$/gm, '<hr />')
    .replace(/\n/g, '<br />');
}
