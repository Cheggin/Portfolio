// Standardized Command Schema for CLI Agent Interface
// This protocol can be extended for larger projects

import type { CommandResult } from '../utils/cliParser';

export interface Command {
  name: string;
  description: string;
  usage: string;
}

export interface CommandContext {
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
}

// Command definitions - minimal set for scalable protocol
export const COMMANDS: Command[] = [
  {
    name: 'query',
    description: 'Query portfolio data',
    usage: '/query [question]',
  },
  {
    name: 'export',
    description: 'Export conversation',
    usage: '/export [json|md|xml]',
  },
];

// Get all valid command names
export function getAllCommandNames(): string[] {
  return COMMANDS.map(cmd => cmd.name);
}

// Resolve command name
export function resolveCommand(input: string): string | null {
  const lower = input.toLowerCase();
  const cmd = COMMANDS.find(c => c.name === lower);
  return cmd ? cmd.name : null;
}

// Generate help text for agents
export function generateHelpText(): string {
  let output = 'Available commands:\n';
  for (const cmd of COMMANDS) {
    output += `  ${cmd.usage.padEnd(30)} ${cmd.description}\n`;
  }
  return output;
}

// Execute a command
export function executeCommand(
  command: string,
  args: string[],
  context: CommandContext,
  exportFn: (format: 'json' | 'md' | 'xml') => void
): CommandResult {
  const resolved = resolveCommand(command);
  
  if (!resolved) {
    return {
      success: false,
      output: `Unknown command: /${command}. Use /query or /export.`,
      type: 'error',
    };
  }

  switch (resolved) {
    case 'query':
      // /query returns a signal to process as natural language
      return {
        success: true,
        output: args.join(' '),
        type: 'query' as CommandResult['type'],
      };

    case 'export': {
      const format = (args[0]?.toLowerCase() || 'json') as 'json' | 'md' | 'xml';
      if (!['json', 'md', 'xml'].includes(format)) {
        return {
          success: false,
          output: `Invalid format: ${format}. Use json, md, or xml.`,
          type: 'error',
        };
      }
      if (context.messages.length === 0) {
        return {
          success: false,
          output: 'No conversation to export.',
          type: 'error',
        };
      }
      exportFn(format);
      return {
        success: true,
        output: `Exported as ${format}.`,
        type: 'system',
      };
    }

    default:
      return {
        success: false,
        output: `Unknown command: /${command}`,
        type: 'error',
      };
  }
}
