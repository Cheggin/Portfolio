import Fuse from 'fuse.js';
import { personalInfo, projects, skills, formatAsMarkdown, formatAsXML, getPortfolioData } from '../data/portfolioData';

// Intent types for categorizing queries
type Intent =
  | 'who'
  | 'projects'
  | 'contact'
  | 'skills'
  | 'current_work'
  | 'export_json'
  | 'export_markdown'
  | 'export_xml'
  | 'help'
  | 'unknown';

interface IntentPattern {
  intent: Intent;
  patterns: string[];
}

// Pre-defined patterns for common queries
const INTENT_PATTERNS: IntentPattern[] = [
  {
    intent: 'who',
    patterns: [
      'who is reagan',
      'tell me about reagan',
      'reagan hsu',
      'who are you',
      'about',
      'bio',
      'introduction',
      'background',
    ],
  },
  {
    intent: 'projects',
    patterns: [
      'projects',
      'hackathon',
      'work',
      'portfolio',
      'built',
      'created',
      'betterweb',
      'job use',
      'finhog',
      'citetrace',
      'sfgovtv',
      'carp',
      'list projects',
      'show projects',
    ],
  },
  {
    intent: 'contact',
    patterns: [
      'contact',
      'email',
      'reach',
      'github',
      'linkedin',
      'social',
      'connect',
      'hire',
      'message',
    ],
  },
  {
    intent: 'skills',
    patterns: [
      'skills',
      'tech',
      'technology',
      'stack',
      'programming',
      'languages',
      'frameworks',
      'tools',
      'experience with',
    ],
  },
  {
    intent: 'current_work',
    patterns: [
      'current',
      'work',
      'job',
      'browser use',
      'anthropic',
      'where does',
      'what does',
      'employer',
      'company',
    ],
  },
  {
    intent: 'export_json',
    patterns: [
      'export json',
      'json data',
      'structured data',
      'api',
      'raw data',
    ],
  },
  {
    intent: 'export_markdown',
    patterns: [
      'export markdown',
      'markdown',
      'md format',
    ],
  },
  {
    intent: 'export_xml',
    patterns: [
      'export xml',
      'xml format',
      'llm context',
      'context window',
    ],
  },
  {
    intent: 'help',
    patterns: [
      'help',
      'what can you do',
      'commands',
      'options',
      'how to use',
    ],
  },
];

// Flatten patterns for fuzzy search
const allPatterns = INTENT_PATTERNS.flatMap(({ intent, patterns }) =>
  patterns.map(pattern => ({ pattern, intent }))
);

// Configure Fuse for fuzzy matching
const fuse = new Fuse(allPatterns, {
  keys: ['pattern'],
  threshold: 0.4,
  includeScore: true,
});

// Detect intent from query
export function detectIntent(query: string): Intent {
  const normalizedQuery = query.toLowerCase().trim();

  // Try fuzzy matching first
  const results = fuse.search(normalizedQuery);

  if (results.length > 0 && results[0].score !== undefined && results[0].score < 0.4) {
    return results[0].item.intent;
  }

  // Fallback to keyword matching
  for (const { intent, patterns } of INTENT_PATTERNS) {
    for (const pattern of patterns) {
      if (normalizedQuery.includes(pattern)) {
        return intent;
      }
    }
  }

  return 'unknown';
}

// Generate response based on intent
export function generateResponse(intent: Intent): { response: string; isPredefined: boolean } {
  switch (intent) {
    case 'who':
      return {
        response: `**${personalInfo.name}** - ${personalInfo.role}

${personalInfo.bio}

${personalInfo.currentFocus}`,
        isPredefined: true,
      };

    case 'projects':
      const projectList = projects.map(p =>
        `**${p.name}** (${p.date})
${p.award}
${p.description}
Tech: ${p.tech}
[View Project](${p.link})`
      ).join('\n\n---\n\n');

      return {
        response: `## Reagan's Projects\n\n${projectList}`,
        isPredefined: true,
      };

    case 'contact':
      return {
        response: `## Contact Reagan

- **Email:** [${personalInfo.contact.email}](mailto:${personalInfo.contact.email})
- **GitHub:** [${personalInfo.contact.github}](${personalInfo.contact.github})
- **LinkedIn:** [${personalInfo.contact.linkedin}](${personalInfo.contact.linkedin})`,
        isPredefined: true,
      };

    case 'skills':
      const skillsList = skills.map(s =>
        `**${s.category}:** ${s.items.join(', ')}`
      ).join('\n');

      return {
        response: `## Reagan's Skills\n\n${skillsList}`,
        isPredefined: true,
      };

    case 'current_work':
      const workList = personalInfo.currentWork.map(w =>
        `**${w.role}** at [${w.company}](${w.url})
${w.description}`
      ).join('\n\n');

      return {
        response: `## Current Work\n\n${workList}`,
        isPredefined: true,
      };

    case 'export_json':
      return {
        response: `Here's the portfolio data in JSON format:\n\n\`\`\`json\n${JSON.stringify(getPortfolioData(), null, 2)}\n\`\`\`\n\nYou can also use the export buttons below to download this data.`,
        isPredefined: true,
      };

    case 'export_markdown':
      return {
        response: `Here's the portfolio in Markdown format:\n\n\`\`\`markdown\n${formatAsMarkdown()}\n\`\`\``,
        isPredefined: true,
      };

    case 'export_xml':
      return {
        response: `Here's the portfolio in XML format (optimized for LLM context):\n\n\`\`\`xml\n${formatAsXML()}\n\`\`\``,
        isPredefined: true,
      };

    case 'help':
      return {
        response: `## Available Commands

I can help you learn about Reagan Hsu. Here are some things you can ask:

- **"Who is Reagan?"** - Get an introduction
- **"List projects"** - See all hackathon projects
- **"Contact info"** - Get email, GitHub, LinkedIn
- **"Skills"** - See technical skills
- **"Current work"** - Learn about current roles
- **"Export JSON/Markdown/XML"** - Get structured data

You can also ask more complex questions and I'll do my best to help!`,
        isPredefined: true,
      };

    case 'unknown':
    default:
      return {
        response: '',
        isPredefined: false,
      };
  }
}

// Quick action suggestions
export const QUICK_ACTIONS = [
  { label: 'Who is Reagan?', query: 'Who is Reagan?' },
  { label: 'List Projects', query: 'List all projects' },
  { label: 'Contact Info', query: 'How can I contact Reagan?' },
  { label: 'Skills', query: 'What are Reagan\'s skills?' },
  { label: 'Current Work', query: 'Where does Reagan work?' },
] as const;
