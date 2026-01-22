// Known AI agent user-agent patterns for detection
export const AGENT_USER_AGENTS = [
  // OpenAI
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',

  // Anthropic
  'ClaudeBot',
  'Claude-User',
  'Claude-Web',

  // Perplexity
  'PerplexityBot',

  // Google
  'Google-Extended',

  // Other AI crawlers
  'CCBot',
  'cohere-ai',
  'Diffbot',
  'Bytespider',
  'PetalBot',
  'Applebot-Extended',
] as const;

// Query parameter for manual agent mode access
export const AGENT_QUERY_PARAM = 'agent';
