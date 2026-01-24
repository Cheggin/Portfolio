// CLI Parser for Agent Interface
// Parses user input to detect slash commands vs natural language queries

export interface ParsedCommand {
  type: 'command' | 'query';
  command?: string;
  args: string[];
  raw: string;
}

export interface CommandResult {
  success: boolean;
  output: string;
  type: 'system' | 'data' | 'error' | 'query';
}

/**
 * Parse user input to determine if it's a slash command or natural language
 */
export function parseInput(input: string): ParsedCommand {
  const trimmed = input.trim();
  
  // Check if input starts with /
  if (trimmed.startsWith('/')) {
    const parts = trimmed.slice(1).split(/\s+/);
    const command = parts[0]?.toLowerCase() || '';
    const args = parts.slice(1);
    
    return {
      type: 'command',
      command,
      args,
      raw: trimmed,
    };
  }
  
  // Natural language query
  return {
    type: 'query',
    args: [],
    raw: trimmed,
  };
}

/**
 * Format command output for terminal display
 */
export function formatOutput(result: CommandResult): string {
  const prefix = result.type === 'error' ? '[error]' : 
                 result.type === 'system' ? '[system]' : '';
  
  if (prefix) {
    return `${prefix} ${result.output}`;
  }
  return result.output;
}

/**
 * Validate command exists
 */
export function isValidCommand(command: string, validCommands: string[]): boolean {
  return validCommands.includes(command.toLowerCase());
}
