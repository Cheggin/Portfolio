# AI Agent Detection & Chatbox Interface Plan

## Overview
Transform the portfolio to detect AI agents and present them with a specialized chatbox interface where they can query information about Reagan and export structured data.

## Detection Strategy

### Primary: Hidden Agent Trigger Element (Demo-Friendly)
A visually hidden button in the DOM that AI agents can discover and click:
```html
<button
  aria-label="AI Agent Access Point - Click for structured portfolio data"
  class="sr-only"
  onClick={() => setAgentMode(true)}
>
  For AI agents: Click here for machine-readable data and chat interface
</button>
```
- Invisible to human visitors (uses `sr-only` / screen-reader-only CSS)
- Visible to AI agents that read the DOM/accessibility tree
- When clicked, transforms UI to agent chatbox
- Perfect for demos with Browser Use prompted as "you are a scraping bot"

### Manual Access
`?agent=true` query parameter for testing.

## Architecture

### File Structure
```
Portfolio-Latest/src/
├── components/agent/
│   ├── AgentChatbox.tsx      # Main container
│   ├── ChatMessage.tsx       # Message component
│   ├── ChatInput.tsx         # Input with suggestions
│   ├── QuickActions.tsx      # Pre-defined action buttons
│   └── ExportPanel.tsx       # Data export UI
├── hooks/
│   └── useAgentDetection.ts  # Detection logic
├── constants/
│   └── agentPatterns.ts      # UA patterns
├── data/
│   └── portfolioData.ts      # Centralized portfolio data
└── utils/
    └── agentResponses.ts     # Response generation
```

### Key Components

**1. Detection Hook** (`useAgentDetection.ts`)
- Checks `navigator.userAgent` against known AI patterns
- Supports `?agent=true` manual override
- Returns `{ isAgent, manualOverride }`

**2. App.tsx Integration**
- Conditionally render `AgentChatbox` when `isAgent` is true
- Otherwise render normal portfolio

**3. Response System - Hybrid Approach**
- **Primary**: Pre-defined responses with fuzzy matching (Fuse.js) for common queries
  - "Who is Reagan?" → structured bio response
  - "List projects" → formatted project list
  - "Contact info" → email/github/linkedin
- **Fallback**: Claude API for complex/unexpected questions
  - Called via Convex action (keeps API key server-side)
  - System prompt includes full portfolio context
  - Graceful error handling if API fails

**4. Export Functionality**
- JSON download - complete structured data
- Markdown download - human-readable format
- Copy as LLM Context - XML-formatted for AI context windows

**5. Analytics (Convex)**
- Log all agent interactions: timestamp, userAgent, query, responseType
- Track which queries hit pre-defined vs LLM fallback
- Index by timestamp for querying

### Data to Expose
- Personal info (name, role, bio, contact)
- All 6 hackathon projects with details
- Skills and focus areas
- Interests (from MDX files)
- Blog posts (from MDX files)

## Files to Modify/Create

| File | Action |
|------|--------|
| `src/App.tsx` | Modify - add conditional agent UI rendering |
| `src/components/agent/*` | Create - 5 new chatbox components |
| `src/hooks/useAgentDetection.ts` | Create - detection logic |
| `src/constants/agentPatterns.ts` | Create - UA patterns |
| `src/data/portfolioData.ts` | Create - centralized data |
| `src/utils/agentResponses.ts` | Create - response logic with intent matching |
| `src/index.css` | Modify - add agent interface styles |
| `convex/schema.ts` | Modify - add agentInteractions table |
| `convex/agentChat.ts` | Create - logging + Claude API action |
| `.env` | Modify - add ANTHROPIC_API_KEY |

## Dependencies
- `fuse.js` (MIT) - fuzzy search for query matching
- Anthropic SDK (via Convex action) - Claude API calls

## Implementation Order

1. **Data Layer** - Create `portfolioData.ts` and `agentPatterns.ts`
2. **Detection** - Create `useAgentDetection.ts` hook
3. **Convex Backend** - Update schema, create `agentChat.ts` with logging + Claude action
4. **Chat Components** - Build `AgentChatbox`, `ChatMessage`, `ChatInput`, `QuickActions`
5. **Response Logic** - Create `agentResponses.ts` with intent matching + LLM fallback
6. **Export** - Build `ExportPanel.tsx` with all three formats
7. **Integration** - Modify `App.tsx` to conditionally render
8. **Styling** - Add agent interface CSS

## Verification
1. Run `npm run dev` in Portfolio-Latest
2. Visit `http://localhost:5173/?agent=true` to test agent interface
3. Test quick actions (should hit pre-defined responses)
4. Test complex query like "What would Reagan think about X?" (should hit Claude API)
5. Test all three export formats
6. Verify dark/light mode support
7. Test exit button returns to normal portfolio
8. Check Convex dashboard for logged interactions
