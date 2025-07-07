import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import pfp from "./images/pfp.png";
import TiltedCard from "./TiltedCard";
import UniversalNavbar from "./UniversalNavbar";
import LiquidGlassButton from "./LiquidGlassButton";
import "./RecruiterPage.css";
import acmLogo from "./images/acmlogo.png";
import MetaBalls from "./MetaBalls";
import { MdComputer, MdCalendarToday, MdLocationOn } from "react-icons/md";
import { navItems, handleNavItemClick } from "./navConfig";

const funWords = [
  "Funny 😹",
  "Awesome 🚀",
  "Cat Whisperer 🐾",
  "Meme Lord 🤡",
  "Hackathon Addict 🏆",
  "Coffee Enthusiast ☕️",
];

const RecruiterPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeNavItem, setActiveNavItem] = useState("recruiter");

  useEffect(() => {
    const path = location.pathname;
    if (path === "/") {
      setActiveNavItem("home");
    } else if (path === "/about") {
      setActiveNavItem("about");
    } else if (path === "/projects") {
      setActiveNavItem("projects");
    } else if (path === "/contact") {
      setActiveNavItem("contact");
    } else if (path === "/recruiter") {
      setActiveNavItem("recruiter");
    }
  }, [location.pathname]);

  // Prevent horizontal scrolling globally
  useEffect(() => {
    const originalHtmlOverflowX = document.documentElement.style.overflowX;
    const originalBodyOverflowX = document.body.style.overflowX;
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';
    return () => {
      document.documentElement.style.overflowX = originalHtmlOverflowX;
      document.body.style.overflowX = originalBodyOverflowX;
    };
  }, []);

  // Dropdown state for tech stack groups
  const [openTechGroups, setOpenTechGroups] = useState<{ [key: string]: boolean }>({});
  const techGroups = [
    {
      key: 'frontend',
      title: 'Front End',
      items: [
        'React Native, React Native Web, Expo, Tauri',
        'Typescript, Javascript, Tailwind CSS',
      ],
    },
    {
      key: 'backend',
      title: 'Back End / DevOps',
      items: [
        'Python, Flask, Docker, Render, GCP Authentication',
      ],
    },
    {
      key: 'ai',
      title: 'AI / ML',
      items: [
        'TensorFlow, SciKit Learn, pandas',
        'Hugging Face Transformers, Gemini, RAG, LLMs, ToolLLM, GAIA framework',
      ],
    },
    {
      key: 'languages',
      title: 'Programming Languages',
      items: [
        'Java, Python, Typescript, Javascript, C, MATLAB',
      ],
    },
    {
      key: 'databases',
      title: 'Databases / Data',
      items: [
        'Supabase, Prisma, Weaviate, Pinecone, vector DBs',
      ],
    },
    {
      key: 'other',
      title: 'Other Tools',
      items: [
        'Linear, Auth0, d3-force, OpenFDA, Drugs.com API',
      ],
    },
  ];

  const toggleTechGroup = (key: string) => {
    setOpenTechGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const [showFunWords, setShowFunWords] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Pixel-perfect scroll snap correction
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    let timeout: NodeJS.Timeout | null = null;
    const handleScroll = () => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        // Find all sections
        const sections = Array.from(container.querySelectorAll<HTMLElement>(".recruiter-section"));
        const scrollTop = container.scrollTop;
        const containerHeight = container.clientHeight;
        // Find the section closest to the current scroll position
        let minDist = Infinity;
        let snapTo = 0;
        sections.forEach((section) => {
          const offset = section.offsetTop;
          const dist = Math.abs(scrollTop - offset);
          if (dist < minDist) {
            minDist = dist;
            snapTo = offset;
          }
        });
        // Only snap if not already perfectly aligned
        if (Math.abs(scrollTop - snapTo) > 2) {
          container.scrollTo({ top: snapTo, behavior: "smooth" });
        }
      }, 80); // 80ms after scroll stops
    };
    container.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();
    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="recruiter-root">
      <UniversalNavbar
        navItems={navItems}
        activeNavItem={activeNavItem}
        onItemClick={id => handleNavItemClick(id, navigate, setActiveNavItem)}
      />
      <div className="recruiter-scroll-container" ref={scrollContainerRef}>
        {/* Section 1: My Application */}
        <section className="recruiter-section">
          {/* Left: Liquid glass card with all text */}
          <div className="recruiter-left">
            <div className="liquid-glass-card recruiter-application-card">
              <div className="application-header">
                <div className="application-header-left">
                  <h1 className="application-title">Reagan Hsu</h1>
                </div>
                <div className="application-header-right">
                  <div className="application-subtitle">Internship Application</div>
                  <span className="application-status-live"><span className="application-status-dot">●</span> Live</span>
                </div>
              </div>
              <div className="application-details-row">
                <div className="application-detail">
                  <span className="application-detail-icon" role="img" aria-label="calendar"><MdCalendarToday color="#3fa7ff" /></span>
                  <div>
                    <div className="application-detail-title">Duration</div>
                    <div className="application-detail-desc">3 months – starting Summer 2026 (June)</div>
                  </div>
                </div>
                <div className="application-detail">
                  <span className="application-detail-icon" role="img" aria-label="location"><MdLocationOn color="#ff4b4b" /></span>
                  <div>
                    <div className="application-detail-title">Location</div>
                    <div className="application-detail-desc">San Francisco, New York, San Jose, San Diego, Texas, LA, Seattle, Chicago, Boston, Remote</div>
                  </div>
                </div>
              </div>
              <div className="application-tech-stack">
                <div className="application-tech-title">
                  <span className="application-detail-icon" role="img" aria-label="tech"><MdComputer color="#a259ff" /></span> Tech stack
                </div>
                <ul className="application-tech-list">
                  <li>React Native, Expo, Tauri, Vite </li>
                  <li>Vercel, Render, Flask, Supabase</li>
                  <li>Docker, Git</li>
                  <li>TensorFlow, SciKit Learn, pandas</li>
                  <li>Hugging Face Transformers, Gemini, Claude, RAG</li>
                  <li>Java, Python, Typescript, Javascript, C, MATLAB</li>
                </ul>
              </div>
              <div className="application-section">
                <h2 className="application-section-title">What I bring</h2>
                <div className="application-section-desc">
                  I'm a hardworking, communicative, and thorough developer with experience in LLMs, cancer imaging, bioinformatics, computational biology, full stack engineering at startups, and award-winning hackathon projects. I thrive in fast-paced, collaborative environments and am eager to bring my skills to your team.
                </div>
              </div>
              <div className="application-section">
                <h2 className="application-section-title">Goal</h2>
                <div className="application-section-desc">
                  I'm passionate about model efficiency, fast training, sleek web/app design, and building tools for education and healthcare. My goal is to use my programming skills to propel others and myself in our goals of making change.
                </div>
              </div>
              <div className="application-contact-btn-row">
                <button className="application-contact-btn">Contact me</button>
              </div>
            </div>
          </div>
          {/* Right: 2x2 grid of profile images */}
          <div className="recruiter-right recruiter-right-single" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TiltedCard
              imageSrc={pfp}
              altText="Reagan Hsu photo"
              containerHeight="min(90vh, 600px)"
              containerWidth="min(45vw, 420px)"
              imageHeight="100%"
              imageWidth="100%"
              rotateAmplitude={14}
              scaleOnHover={1.08}
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent={true}
              overlayContent={
                <div className="recruiter-overlay">This is me!</div>
              }
              imageStyle={{
                border: "2.5px solid rgba(255,255,255,0.18)",
                borderRadius: "32px",
              }}
            />
          </div>
        </section>
        {/* Section 2: Experiences */}
        <section className="recruiter-section">
          {/* Left half: experiences content */}
          <div className="recruiter-left">
            <h1 className="recruiter-heading">A Few of My Experiences</h1>
            <ul className="recruiter-list">
              <li><span style={{ whiteSpace: 'nowrap' }}><b>AI/ML Researcher</b> @ Algoverse (2025–Present)</span></li>
              <li><span style={{ whiteSpace: 'nowrap' }}><b>Front End Lead</b> @ NetSerpent (Startup) (2025–Present)</span></li>
              <li><span style={{ whiteSpace: 'nowrap' }}><b>Cancer Researcher</b> @ UCSD Ongkeko Lab (2024–Present)</span></li>
              <li><span style={{ whiteSpace: 'nowrap' }}><b>Projects Director</b> @ ACM UCSD (2025–Present)</span></li>
            </ul>
            <LiquidGlassButton
              size="large"
              className="recruiter-glass-btn"
              onClick={() => navigate('/resume')}
            >
              View my full resume here
            </LiquidGlassButton>
          </div>
          {/* Right half: MetaBalls interactive blob simulation */}
          <div className="recruiter-right recruiter-coin-3d" style={{ minHeight: 400, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginLeft: -80 }}>
            <MetaBalls
            color="#ffffff"
            cursorBallColor="#ffffff"
            cursorBallSize={2}
            ballCount={15}
            animationSize={30}
            enableMouseInteraction={true}
            enableTransparency={true}
            hoverSmoothness={0.05}
            clumpFactor={1}
            speed={0.3}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default RecruiterPage; 