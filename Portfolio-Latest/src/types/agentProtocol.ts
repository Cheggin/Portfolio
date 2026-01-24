/**
 * Agent CLI Protocol v1.0
 * 
 * Standardized types for AI agent interaction with web applications.
 * See AGENT_PROTOCOL.md for full specification.
 */

// ============================================
// Command Types
// ============================================

/** Command response type determines how output is rendered/processed */
export type CommandResultType = 'system' | 'data' | 'error' | 'delegate';

export interface Command {
  /** Unique command name (lowercase, no spaces) */
  name: string;
  /** Human-readable description */
  description: string;
  /** Usage example (e.g., "/query [question]") */
  usage: string;
  /** 
   * Handler type: 
   * - 'local': executed client-side
   * - 'delegate': passed to backend/LLM for processing
   */
  handlerType: 'local' | 'delegate';
}

export interface ParsedCommand {
  /** Whether input is a slash command or natural query */
  type: 'command' | 'query';
  /** Command name if type is 'command' */
  command?: string;
  /** Arguments passed to the command */
  args: string[];
  /** Original raw input */
  raw: string;
}

export interface CommandResult {
  /** Whether command executed successfully */
  success: boolean;
  /** Output message or data */
  output: string;
  /** Response type for UI rendering */
  type: CommandResultType;
}

/**
 * Command handler function signature.
 * Implement this interface to add custom commands.
 */
export type CommandHandler = (
  args: string[],
  context: CommandContext
) => CommandResult | Promise<CommandResult>;

export interface CommandContext {
  messages: Message[];
  /** Optional: pass backend functions for commands that need them */
  delegate?: (input: string) => Promise<string>;
  export?: (format: ExportFormat) => void;
}

// ============================================
// Export Types
// ============================================

export type ExportFormat = 'json' | 'md' | 'xml';

export interface ExportedData {
  /** Subject/entity name */
  subject: string;
  /** ISO 8601 timestamp */
  collectedAt: string;
  /** List of user queries */
  queries: string[];
  /** List of assistant responses */
  responses: string[];
}

// ============================================
// Message Types
// ============================================

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'system' | 'error';
  content: string;
}

// ============================================
// Protocol Constants
// ============================================

export const PROTOCOL_VERSION = '1.0';

/**
 * Standard commands included in the protocol.
 * Extend by adding to this array or creating your own.
 */
export const STANDARD_COMMANDS: Command[] = [
  {
    name: 'query',
    description: 'Query application data',
    usage: '/query [question]',
    handlerType: 'delegate',
  },
  {
    name: 'export',
    description: 'Export conversation',
    usage: '/export [json|md|xml]',
    handlerType: 'local',
  },
];

export const VALID_EXPORT_FORMATS: ExportFormat[] = ['json', 'md', 'xml'];

// ============================================
// Command Registry (for extensibility)
// ============================================

/**
 * Registry for custom command handlers.
 * Use registerCommand() to add new commands at runtime.
 */
export const commandRegistry = new Map<string, CommandHandler>();

export function registerCommand(name: string, handler: CommandHandler): void {
  commandRegistry.set(name.toLowerCase(), handler);
}

export function getCommandHandler(name: string): CommandHandler | undefined {
  return commandRegistry.get(name.toLowerCase());
}
