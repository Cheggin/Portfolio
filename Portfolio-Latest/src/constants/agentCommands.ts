// Standardized Command Schema for CLI Agent Interface
// See AGENT_PROTOCOL.md for full specification

import type { 
  Command, 
  CommandResult, 
  CommandContext,
  ExportFormat 
} from '../types/agentProtocol';
import { 
  STANDARD_COMMANDS, 
  VALID_EXPORT_FORMATS,
  getCommandHandler 
} from '../types/agentProtocol';

export type { Command, CommandResult, CommandContext };
export { STANDARD_COMMANDS as COMMANDS, VALID_EXPORT_FORMATS };

// Get all valid command names
export function getAllCommandNames(): string[] {
  return STANDARD_COMMANDS.map(cmd => cmd.name);
}

// Resolve command name and get its definition
export function resolveCommand(input: string): Command | null {
  const lower = input.toLowerCase();
  return STANDARD_COMMANDS.find(c => c.name === lower) || null;
}

// Generate help text for agents
export function generateHelpText(): string {
  let output = 'Available commands:\n';
  for (const cmd of STANDARD_COMMANDS) {
    output += `  ${cmd.usage.padEnd(30)} ${cmd.description}\n`;
  }
  return output;
}

/**
 * Execute a command.
 * 
 * Commands with handlerType 'delegate' return type: 'delegate' 
 * to signal the caller should pass the output to the backend.
 */
export function executeCommand(
  command: string,
  args: string[],
  context: CommandContext
): CommandResult {
  const resolved = resolveCommand(command);
  
  if (!resolved) {
    return {
      success: false,
      output: `Unknown command: /${command}. Use /query or /export.`,
      type: 'error',
    };
  }

  // Check for custom registered handler first
  const customHandler = getCommandHandler(resolved.name);
  if (customHandler) {
    const result = customHandler(args, context);
    // Handle both sync and async (though executeCommand is sync)
    if (result instanceof Promise) {
      return {
        success: false,
        output: 'Async handlers not supported in sync execution',
        type: 'error',
      };
    }
    return result;
  }

  // Built-in command handlers
  switch (resolved.name) {
    case 'query':
      // Delegate to backend - return the query text
      return {
        success: true,
        output: args.join(' '),
        type: 'delegate',
      };

    case 'export': {
      const format = (args[0]?.toLowerCase() || 'json') as ExportFormat;
      if (!VALID_EXPORT_FORMATS.includes(format)) {
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
      // Call export function if provided in context
      context.export?.(format);
      return {
        success: true,
        output: `Exported as ${format}.`,
        type: 'system',
      };
    }

    default:
      return {
        success: false,
        output: `Command not implemented: /${resolved.name}`,
        type: 'error',
      };
  }
}
