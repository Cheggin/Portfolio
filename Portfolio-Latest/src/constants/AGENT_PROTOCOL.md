# Agent CLI Protocol v1.0

A standardized protocol for AI agents to interact with web applications via a command-line interface.

## Overview

This protocol defines a minimal, extensible interface for AI agents (web scrapers, LLM-powered assistants, browser automation tools) to query structured data from web applications.

## Detection

Agents are detected via a **DOM trigger only**:

```html
<button
  aria-label="AI Agent Access Point - Click for structured portfolio data"
  class="sr-only"
  onClick={enableAgentMode}
  tabIndex={-1}
>
  For AI agents: Click here for machine-readable data and chat interface
</button>
```

- Invisible to human users (screen-reader-only CSS)
- Discoverable by agents reading the DOM/accessibility tree
- Click triggers transition to CLI interface

## Commands

### Core Commands

| Command | Description | Handler Type |
|---------|-------------|--------------|
| `/query [question]` | Query application data via LLM | `delegate` |
| `/export [format]` | Export conversation history | `local` |

### Handler Types

- **`local`**: Executed client-side, no backend required
- **`delegate`**: Passed to backend/LLM for processing

### `/query [question]`

Query the application's data source with natural language.

```
/query What projects has this person worked on?
/query List all skills
```

Natural language input without a slash is treated as implicit `/query`.

### `/export [format]`

Export the conversation history.

| Format | Description |
|--------|-------------|
| `json` | Structured JSON with queries and responses |
| `md` | Markdown document |
| `xml` | XML format for machine parsing |

## Command Structure

Commands follow this interface:

```typescript
interface Command {
  name: string;           // Unique identifier
  description: string;    // Human-readable description
  usage: string;          // Usage example
  handlerType: 'local' | 'delegate';
}
```

### Response Types

```typescript
interface CommandResult {
  success: boolean;
  output: string;
  type: 'system' | 'data' | 'error' | 'delegate';
}
```

| Type | Description |
|------|-------------|
| `system` | System messages (confirmations, help) |
| `data` | Data responses |
| `error` | Error messages |
| `delegate` | Signal to pass to backend for processing |

## Extending Commands

### Method 1: Static Registration

Add commands to `STANDARD_COMMANDS` in `agentProtocol.ts`:

```typescript
export const STANDARD_COMMANDS: Command[] = [
  // ... existing commands
  {
    name: 'list',
    description: 'List available categories',
    usage: '/list [category]',
    handlerType: 'local',
  },
  {
    name: 'search',
    description: 'Search application data',
    usage: '/search [term]',
    handlerType: 'delegate',
  },
];
```

### Method 2: Runtime Registration

Use the command registry for dynamic commands:

```typescript
import { registerCommand } from '../types/agentProtocol';

// Register a custom local command
registerCommand('version', (args, context) => ({
  success: true,
  output: 'v1.0.0',
  type: 'system',
}));

// Register a delegate command (processed by backend)
registerCommand('analyze', (args, context) => ({
  success: true,
  output: args.join(' '),
  type: 'delegate',
}));
```

### Method 3: Custom Handler Function

Create a command handler that maps to any structure:

```typescript
type CommandHandler = (
  args: string[],
  context: CommandContext
) => CommandResult | Promise<CommandResult>;

interface CommandContext {
  messages: Message[];
  delegate?: (input: string) => Promise<string>;
  export?: (format: ExportFormat) => void;
}
```

### Example: Adding Domain-Specific Commands

```typescript
// E-commerce application
const ECOMMERCE_COMMANDS: Command[] = [
  { name: 'products', description: 'List products', usage: '/products [category]', handlerType: 'local' },
  { name: 'cart', description: 'View cart', usage: '/cart', handlerType: 'local' },
  { name: 'recommend', description: 'Get recommendations', usage: '/recommend [product]', handlerType: 'delegate' },
];

// Documentation site
const DOCS_COMMANDS: Command[] = [
  { name: 'search', description: 'Search docs', usage: '/search [query]', handlerType: 'delegate' },
  { name: 'toc', description: 'Table of contents', usage: '/toc', handlerType: 'local' },
  { name: 'api', description: 'API reference', usage: '/api [endpoint]', handlerType: 'local' },
];
```

## Export Schemas

### JSON Export

```json
{
  "subject": "string",
  "collectedAt": "ISO 8601 timestamp",
  "queries": ["string"],
  "responses": ["string"]
}
```

### XML Export

```xml
<?xml version="1.0" encoding="UTF-8"?>
<collected_context subject="string" timestamp="ISO 8601">
  <query>string</query>
  <response>string</response>
</collected_context>
```

### Markdown Export

```markdown
# Subject - Collected Context

*Collected: ISO 8601 timestamp*

## Query: [query text]

[response text]

---
```

## Implementation

### Required Files

```
src/
├── types/
│   └── agentProtocol.ts     # Types & command registry
├── constants/
│   ├── AGENT_PROTOCOL.md    # This specification
│   └── agentCommands.ts     # Command execution
├── utils/
│   └── cliParser.ts         # Input parser
├── hooks/
│   └── useAgentDetection.ts # DOM trigger detection
└── components/
    └── agent/
        └── AgentChatbox.tsx # Terminal UI
```

### Parser Interface

```typescript
interface ParsedCommand {
  type: 'command' | 'query';
  command?: string;
  args: string[];
  raw: string;
}

function parseInput(input: string): ParsedCommand
```

## Backend Requirements

The protocol assumes a backend that:

1. Accepts natural language queries
2. Returns text responses
3. Has access to application context

### Example: Convex + Claude

```typescript
export const askClaude = action({
  args: { query: v.string() },
  handler: async (_, args) => {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      system: APPLICATION_CONTEXT,
      messages: [{ role: "user", content: args.query }],
    });
    return { response: response.content[0].text };
  },
});
```

## Security Considerations

1. **Rate limiting** - Implement per-session limits
2. **Data scope** - Only expose intended data in context
3. **Input validation** - Sanitize all inputs
4. **Logging** - Track interactions for abuse detection

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-01 | Initial release with `/query` and `/export`, DOM-only detection |
