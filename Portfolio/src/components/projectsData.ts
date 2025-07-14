import CiteTraceImg from './images/CiteTrace.png';
import BouncerImg from './images/Bouncer.webp';
import ThankMyTeacherImg from './images/ThankMyTeacher.webp';
import PillSnapImg from './images/PillSnapLogo.webp';
export interface ProjectData {
  id: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  link?: string;
  hackathonWinner?: boolean;
}

export const projects: ProjectData[] = [
  {
    id: 'citetrace',
    title: 'CiteTrace',
    description: 'Intuitively visualize, interpret, and connect hundreds of pages of research in minutes.',
    image: CiteTraceImg,
    tech: ['d3-force', 'RAG', 'Hugging Face', 'Intel Tiber'],
    link: 'https://devpost.com/software/inciteful',
    hackathonWinner: true,
  },
  {
    id: 'bouncer',
    title: 'Bouncer',
    description: 'Comprehensive risk assessment for databases using publicly available information.',
    image: BouncerImg,
    tech: ['BeautifulSoup', 'Claude', 'Google Custom Search API', 'Flask', 'Resend'],
    link: 'https://devpost.com/software/bouncer-7cvsgz',
    hackathonWinner: false,
  },
  {
    id: 'thankmyteacher',
    title: 'Thank My Teacher',
    description: 'Encouraging teacher appreciation through fun email formats.',
    image: ThankMyTeacherImg,
    tech: ['Google Maps API','Resend', 'React Native', 'Expo', 'Supabase'],
    link: 'https://thankmyteacher.net',
    hackathonWinner: false,
  },
  {
    id: 'pillsnap',
    title: 'PillSnap',
    description: 'Snap a photo to identify any pill, save its details, and get drug interaction warnings, including with food, so you never misuse your medication or forget what it was!',
    image: PillSnapImg,
    tech: ['auth0','Flask', 'Gemini API', 'Vertex.ai', 'Selenium'],
    link: 'https://devpost.com/software/pill-snap',
    hackathonWinner: true,
  },
]; 