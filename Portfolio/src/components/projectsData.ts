import CiteTraceImg from './images/CiteTrace.png';
import BouncerImg from './images/Bouncer.webp';
import ThankMyTeacherImg from './images/ThankMyTeacher.webp';
import PillSnapImg from './images/PillSnapLogo.webp';
import SFGovTVImg from './images/SFGovTV++.png';
export interface ProjectData {
  id: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  link?: string;
  hackathonWinner?: boolean;
  isHackathon?: boolean;
}

export const projects: ProjectData[] = [
  {
    id: 'citetrace',
    title: 'CiteTrace - AI Research Visualization Tool',
    description: 'Award-winning hackathon project that uses AI and machine learning to intuitively visualize, interpret, and connect hundreds of pages of academic research in minutes. Built with D3.js force simulation, RAG (Retrieval-Augmented Generation), and Hugging Face transformers for natural language processing.',
    image: CiteTraceImg,
    tech: ['d3-force', 'RAG', 'Hugging Face', 'Intel Tiber', 'Machine Learning', 'AI', 'Research Tools'],
    link: 'https://devpost.com/software/inciteful',
    hackathonWinner: true,
    isHackathon: true,
  },
  {
    id: 'bouncer',
    title: 'Bouncer - Database Security Assessment',
    description: 'Comprehensive cybersecurity risk assessment tool for databases using web scraping and AI analysis. Leverages BeautifulSoup for data extraction, Claude AI for intelligent analysis, and Google Custom Search API for gathering publicly available security information.',
    image: BouncerImg,
    tech: ['BeautifulSoup', 'Claude AI', 'Google Custom Search API', 'Flask', 'Resend', 'Cybersecurity', 'Web Scraping'],
    link: 'https://devpost.com/software/bouncer-7cvsgz',
    hackathonWinner: false,
    isHackathon: true,
  },
  {
    id: 'thankmyteacher',
    title: 'Thank My Teacher - Education Appreciation Platform',
    description: 'Mobile and web application promoting teacher appreciation through personalized email campaigns. Built with React Native and Expo for cross-platform compatibility, integrated with Google Maps API for location services and Supabase for real-time database management.',
    image: ThankMyTeacherImg,
    tech: ['Google Maps API','Resend', 'React Native', 'Expo', 'Supabase', 'Cross-Platform', 'Education Tech'],
    link: 'https://thankmyteacher.net',
    hackathonWinner: false,
    isHackathon: false,
  },
  {
    id: 'pillsnap',
    title: 'PillSnap - AI-Powered Medication Identifier',
    description: 'Healthcare hackathon winner that uses computer vision and AI to identify medications from photos. Features drug interaction warnings, food compatibility checks, and secure medication tracking. Built with Google Gemini AI, Vertex.ai for machine learning, and Auth0 for secure authentication.',
    image: PillSnapImg,
    tech: ['Auth0','Flask', 'Gemini AI', 'Vertex.ai', 'Selenium', 'Computer Vision', 'Healthcare', 'Machine Learning'],
    link: 'https://devpost.com/software/pill-snap',
    hackathonWinner: true,
    isHackathon: true,
  },
  {
    id: 'SFGovTv++',
    title: 'SFGovTV++ - Government Transparency Tool',
    description: 'Award-winning civic tech application that makes San Francisco government meetings accessible through AI summarization. Uses natural language processing, vector embeddings, and RAG technology to break down hours-long board meetings into digestible insights for citizens.',
    image: SFGovTVImg,
    tech: ['Beautiful-soup', 'Claude AI', 'FastAPI', 'Gemini', 'LangChain', 'PostgreSQL', 'RAG', 'Supabase', 'Vector Embeddings', 'Vite', 'Civic Tech', 'AI Summarization'],
    link: 'https://devpost.com/software/your-city-hall-digest-san-francisco',
    hackathonWinner: true,
    isHackathon: true,
  }
]; 