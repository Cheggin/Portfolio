// Centralized portfolio data for agent responses and exports

export interface PersonalInfo {
  name: string;
  role: string;
  bio: string;
  currentFocus: string;
  contact: {
    email: string;
    github: string;
    linkedin: string;
  };
  currentWork: {
    role: string;
    company: string;
    url: string;
    description: string;
  }[];
}

export interface Project {
  name: string;
  award: string;
  date: string;
  description: string;
  tech: string;
  link: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export const personalInfo: PersonalInfo = {
  name: 'Reagan Hsu',
  role: 'Software Engineer',
  bio: "Hey, I'm Reagan! I'm a software engineer currently trying to build the future of web automations with browser agents. I love working on products to make them seamless for users and making people's lives better via software.",
  currentFocus: 'My day-to-day work mostly spans frontend development and product engineering. However, I\'m comfortable working around the stack!',
  contact: {
    email: 'reaganhsu123@gmail.com',
    github: 'https://github.com/Cheggin',
    linkedin: 'https://linkedin.com/in/reaganhsu',
  },
  currentWork: [
    {
      role: 'Growth Engineer',
      company: 'Browser Use (YC W25)',
      url: 'https://browser-use.com/',
      description: 'Shipping daily and helping identify friction points for users.',
    },
    {
      role: 'Claude Campus Ambassador',
      company: 'Anthropic',
      url: 'https://www.claudebuildersucsd.com/',
      description: 'Hosting events and helping other students build and learn with AI.',
    },
  ],
};

export const projects: Project[] = [
  {
    name: 'Browser Use Desktop',
    award: '',
    date: 'Apr. 2026',
    description: 'A cross-platform desktop app for running a team of browser agents locally. Ports your cookies into a fresh Chromium so agents are logged in everywhere you are, and spawns tasks from anywhere with a keyboard shortcut.',
    tech: 'Electron, React, TypeScript, Browser Harness',
    link: 'https://github.com/browser-use/desktop',
  },
  {
    name: 'Minecraft Use',
    award: '',
    date: 'Apr. 2026',
    description: 'Turns Minecraft into a coding workstation — spawn Claude Code as a villager, open VS Code in-game, and find and build web-sourced schematics in your world, all from chat.',
    tech: 'Java, Claude Code, Browser Use, tmux',
    link: 'https://www.minecraft-code.com/',
  },
  {
    name: 'BetterWeb',
    award: '1st Place Overall + Best Use of Web Agents @ Dedalus Labs (YC S25) x YC Agents Hackathon',
    date: 'Aug. 2025',
    description: 'A web extension that rewrites websites for improved accessibility and customization in real time using deep agentic search and user-focused UI reconstruction.',
    tech: 'Browser Use, Convex, Vite',
    link: 'https://www.linkedin.com/feed/update/urn:li:activity:7365805210167885824/',
  },
  {
    name: 'Job Use',
    award: '3rd Place + 2nd Place SonicJobs Prize @ AGI House Web Agent Build Day',
    date: 'Sep. 2025',
    description: 'A job application agent that fills out any job application form in real time with automated form filling, profile creation, and company research.',
    tech: 'Browser Use, Convex, React, TypeScript, Vite',
    link: 'https://github.com/Cheggin/Job-Use',
  },
  {
    name: 'FinHog',
    award: '1st Place Best Use of Anthropic + 2nd Place Best Financial Visualization Agent @ HackMIT',
    date: 'Sep. 2025',
    description: 'An agent-driven analytics platform that automatically generates and adapts visualizations for financial transaction data in real-time.',
    tech: 'Anthropic Claude, PostgreSQL, React Native, Tailwind CSS',
    link: 'https://github.com/Cheggin/HACKMit2025',
  },
  {
    name: 'CiteTrace',
    award: '1st Place Overall @ Intel x ACM SCU Hackathon',
    date: 'May 2025',
    description: 'An app that visually maps how research ideas, methods, and concepts relate across academic papers for easier comprehension.',
    tech: 'Hugging Face, Intel Tiber, Supabase, React Native, RAG',
    link: 'https://github.com/ShawnPana/citetrace',
  },
  {
    name: 'SFGovTV++',
    award: '3rd Place Overall @ SF10X Hackathon',
    date: 'Aug. 2025',
    description: 'Makes civic engagement accessible through keyword search of 5TB of SF government video data with RAG chatbot assistance.',
    tech: 'pgvector, React Native, Supabase, FastAPI',
    link: 'https://devpost.com/software/your-city-hall-digest-san-francisco',
  },
  {
    name: 'CARP',
    award: '3rd Place Overall @ SushiHacks 2025',
    date: 'Oct. 2025',
    description: 'CARP is an all-in-one app for fishermen, processing >15k fish data points to optimize fishing location while providing a wrist brace to detect carpal tunnel syndrome early.',
    tech: 'Browser Use, React Native, FastAPI, Arduino',
    link: 'https://github.com/Cheggin/sushihacks2025/tree/main',
  },
];

export const skills: Skill[] = [
  {
    category: 'Frontend',
    items: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'React Native'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'FastAPI', 'PostgreSQL', 'Supabase', 'Convex'],
  },
  {
    category: 'AI/ML',
    items: ['Browser Use', 'Anthropic Claude', 'RAG', 'Hugging Face'],
  },
  {
    category: 'Tools',
    items: ['Git', 'Docker', 'Arduino'],
  },
];

// Utility function to get all data as a single object
export function getPortfolioData() {
  return {
    personalInfo,
    projects,
    skills,
  };
}

// Format portfolio data as markdown
export function formatAsMarkdown(): string {
  let md = `# ${personalInfo.name}\n\n`;
  md += `## About\n${personalInfo.bio}\n\n${personalInfo.currentFocus}\n\n`;

  md += `## Current Work\n`;
  personalInfo.currentWork.forEach(work => {
    md += `- **${work.role}** at [${work.company}](${work.url}): ${work.description}\n`;
  });
  md += '\n';

  md += `## Contact\n`;
  md += `- Email: ${personalInfo.contact.email}\n`;
  md += `- GitHub: ${personalInfo.contact.github}\n`;
  md += `- LinkedIn: ${personalInfo.contact.linkedin}\n\n`;

  md += `## Projects\n`;
  projects.forEach(project => {
    md += `### ${project.name}\n`;
    md += `**${project.award}** (${project.date})\n\n`;
    md += `${project.description}\n\n`;
    md += `Tech: ${project.tech}\n\n`;
    md += `[View Project](${project.link})\n\n`;
  });

  md += `## Skills\n`;
  skills.forEach(skill => {
    md += `- **${skill.category}**: ${skill.items.join(', ')}\n`;
  });

  return md;
}

// Format portfolio data as XML for LLM context windows
export function formatAsXML(): string {
  let xml = `<portfolio>\n`;

  xml += `  <personal_info>\n`;
  xml += `    <name>${personalInfo.name}</name>\n`;
  xml += `    <role>${personalInfo.role}</role>\n`;
  xml += `    <bio>${personalInfo.bio}</bio>\n`;
  xml += `    <current_focus>${personalInfo.currentFocus}</current_focus>\n`;
  xml += `    <contact>\n`;
  xml += `      <email>${personalInfo.contact.email}</email>\n`;
  xml += `      <github>${personalInfo.contact.github}</github>\n`;
  xml += `      <linkedin>${personalInfo.contact.linkedin}</linkedin>\n`;
  xml += `    </contact>\n`;
  xml += `    <current_work>\n`;
  personalInfo.currentWork.forEach(work => {
    xml += `      <position>\n`;
    xml += `        <role>${work.role}</role>\n`;
    xml += `        <company>${work.company}</company>\n`;
    xml += `        <url>${work.url}</url>\n`;
    xml += `        <description>${work.description}</description>\n`;
    xml += `      </position>\n`;
  });
  xml += `    </current_work>\n`;
  xml += `  </personal_info>\n\n`;

  xml += `  <projects>\n`;
  projects.forEach(project => {
    xml += `    <project>\n`;
    xml += `      <name>${project.name}</name>\n`;
    xml += `      <award>${project.award}</award>\n`;
    xml += `      <date>${project.date}</date>\n`;
    xml += `      <description>${project.description}</description>\n`;
    xml += `      <tech>${project.tech}</tech>\n`;
    xml += `      <link>${project.link}</link>\n`;
    xml += `    </project>\n`;
  });
  xml += `  </projects>\n\n`;

  xml += `  <skills>\n`;
  skills.forEach(skill => {
    xml += `    <category name="${skill.category}">\n`;
    skill.items.forEach(item => {
      xml += `      <skill>${item}</skill>\n`;
    });
    xml += `    </category>\n`;
  });
  xml += `  </skills>\n`;

  xml += `</portfolio>`;

  return xml;
}
