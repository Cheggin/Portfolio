import React, { useState, useEffect } from 'react';
import './App.css';
import FluidCursor from './components/FluidCursor';
import LiquidGlassButton from './components/LiquidGlassButton';
import LiquidGlassModal from './components/LiquidGlassModal';
import AppleGlowName from './components/AppleGlowName';
import VisitorCounter from './components/VisitorCounter';
import UniversalNavbar from './components/UniversalNavbar';
import { navItems, handleNavItemClick } from './components/navConfig';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Outlet } from 'react-router-dom';
import RecruiterPage from './components/RecruiterPage';
import ResumePage from './components/ResumePage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import RecruiterContactPage from './components/RecruiterContactPage';
import ProjectsPage from './components/ProjectsPage';
import IntroAnimation from './components/IntroAnimation';

function Layout({ activeNavItem, setActiveNavItem }: { activeNavItem: string, setActiveNavItem: (id: string) => void }) {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      setActiveNavItem('home');
    } else if (path === '/about') {
      setActiveNavItem('about');
    } else if (path === '/projects') {
      setActiveNavItem('projects');
    } else if (path === '/resume') {
      setActiveNavItem('resume');
    } else if (path === '/recruiter') {
      setActiveNavItem('recruiter');
    } else if (path === '/contact') {
      setActiveNavItem('contact');
    } else if (path === '/recruiter-contact') {
      setActiveNavItem('recruiter-contact');
    }
  }, [location.pathname, setActiveNavItem]);
  return (
    <>
      <UniversalNavbar
        navItems={navItems}
        activeNavItem={activeNavItem}
        onItemClick={id => handleNavItemClick(id, navigate, setActiveNavItem)}
      />
      <Outlet />
    </>
  );
}


const EveryoneElseButton: React.FC<{ onClick?: () => void; style?: React.CSSProperties }> = ({ onClick, style }) => (
  <div className="everyone-else-button-container" style={style}>
    <LiquidGlassButton
      size="large"
      variant="primary"
      onClick={onClick}
      className="everyone-else-button"
    >
      <div className="everyone-blinking-dot"></div>
      Everyone Else, Click Here!
    </LiquidGlassButton>
  </div>
);

// Add a similar mobile media query for the recruiter button
const RecruiterButton: React.FC<{ onClick?: () => void; style?: React.CSSProperties }> = ({ onClick, style }) => (
  <>
    <style>
      {`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0.3; }
        }
        .recruiter-button-container {
          position: relative;
          display: inline-block;
        }
        .recruiter-button {
          position: relative;
          background: linear-gradient(135deg, 
            rgba(0, 255, 136, 0.1) 0%, 
            rgba(0, 200, 255, 0.1) 50%, 
            rgba(138, 43, 226, 0.1) 100%
          ) !important;
          border: 2px solid rgba(0, 255, 136, 0.3) !important;
          box-shadow: 
            0 8px 32px rgba(0, 255, 136, 0.2),
            0 0 0 1px rgba(255, 255, 255, 0.08) inset,
            0 1px 0 rgba(255, 255, 255, 0.15) inset !important;
          font-weight: 600 !important;
          text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
          display: flex !important;
          align-items: center !important;
          justify-content: flex-start !important;
          gap: 12px !important;
          padding-left: 20px !important;
          padding-right: 32px !important;
          font-size: 1.1rem !important;
          border-radius: 20px !important;
        }
        .recruiter-button span {
          display: flex !important;
          align-items: center !important;
          gap: 12px !important;
          width: 100% !important;
        }
        .recruiter-button:hover {
          background: linear-gradient(135deg, 
            rgba(0, 255, 136, 0.15) 0%, 
            rgba(0, 200, 255, 0.15) 50%, 
            rgba(138, 43, 226, 0.15) 100%
          ) !important;
          border: 2px solid rgba(0, 255, 136, 0.5) !important;
          box-shadow: 
            0 12px 40px rgba(0, 255, 136, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.08) inset,
            0 1px 0 rgba(255, 255, 255, 0.15) inset !important;
          transform: translateY(-2px) scale(1.02) !important;
        }
        .blinking-dot {
          width: 8px;
          height: 8px;
          background: #00ff88;
          border-radius: 50%;
          animation: blink 2s ease-in-out infinite;
          box-shadow: 
            0 0 6px #00ff88,
            0 0 12px #00ff88;
          flex-shrink: 0;
          margin: 0 !important;
        }
        @media (max-width: 700px) {
          .recruiter-button {
            font-size: 0.92rem !important;
            padding-left: 12px !important;
            padding-right: 18px !important;
            border-radius: 12px !important;
            min-width: 120px !important;
            max-width: 80vw !important;
          }
        }
      `}
    </style>
    <div className="recruiter-button-container" style={style}>
      <LiquidGlassButton
        size="large"
        variant="primary"
        onClick={onClick}
        className="recruiter-button"
      >
        <div className="blinking-dot"></div>
        Recruiters, Click Here!
      </LiquidGlassButton>
    </div>
  </>
);

function App() {
  const [activeNavItem, setActiveNavItem] = useState('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setShowButton(false);
    const timer = setTimeout(() => setShowButton(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {/* Visitor Counter and GitHub Star at top left */}
      <div style={{ position: 'fixed', top: 24, left: 36, zIndex: 2000 }}>
        <VisitorCounter />
      </div>
      <div className="content">
        {/* Apple Glow Name Hero (no glass) */}
        <div style={{ marginTop: '120px', marginBottom: '40px', display: 'flex', justifyContent: 'center' }}>
          <AppleGlowName />
        </div>
        {/* Main Content */}
        <main style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gap: '32px', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
            {/* About Section removed as requested */}
          </div>
        </main>
      </div>
      {/* Modal */}
      <LiquidGlassModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Portfolio Demo"
      >
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ margin: '0 0 20px 0' }}>Welcome to the Demo!</h3>
          <p style={{ margin: '0 0 30px 0', lineHeight: '1.6' }}>
            This modal showcases the liquid glass effect. Notice how it blurs the background
            and creates a beautiful glassmorphism effect that matches the overall design.
          </p>
          <LiquidGlassButton onClick={() => setIsModalOpen(false)}>
            Close Demo
          </LiquidGlassButton>
        </div>
      </LiquidGlassModal>
      <FluidCursor />
      {/* Prominent Recruiter Button and Everyone Else Button - Bottom Left */}
      <style>{`
        @media (max-width: 700px) {
          .bottom-button-row {
            left: 0 !important;
            right: 0 !important;
            margin: 0 auto !important;
            width: fit-content !important;
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
        }
      `}</style>
      <div
        className="bottom-button-row"
        style={{
          position: 'fixed',
          bottom: '32px',
          left: 32,
          zIndex: 2000,
          display: 'flex',
          flexDirection: 'row',
          gap: 16,
          alignItems: 'center',
        }}
      >
        <div style={{
          opacity: showButton ? 1 : 0,
          transform: showButton ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)',
          transition: 'opacity 0.8s cubic-bezier(.4,0,.2,1), transform 0.8s cubic-bezier(.4,0,.2,1)',
          display: 'flex',
          flexDirection: 'row',
          gap: 16,
        }}>
          <RecruiterButton onClick={() => navigate('/recruiter')} />
          <EveryoneElseButton onClick={() => navigate('/about')} />
        </div>
      </div>
    </div>
  );
}

const AppWithRouter = () => {
  const [activeNavItem, setActiveNavItem] = React.useState('home');
  // Only show intro if not already shown in this session
  const [showIntro, setShowIntro] = React.useState(() => {
    return sessionStorage.getItem('introShown') !== 'true';
  });
  const [appFadeIn, setAppFadeIn] = React.useState(false); // New state for main app fade-in
  const [introVisible, setIntroVisible] = React.useState(showIntro); // Controls actual mounting

  const FADE_OUT_DURATION = 600; // ms, should match CSS fade-out duration

  const handleIntroFinish = () => {
    sessionStorage.setItem('introShown', 'true');
    // Start fade-out, but keep intro mounted for fade duration
    setShowIntro(false);
    setTimeout(() => {
      setIntroVisible(false);
      setAppFadeIn(true); // Start main app fade-in
    }, FADE_OUT_DURATION);
  };

  React.useEffect(() => {
    // If intro is not shown on first load, fade in app immediately
    if (!showIntro && !introVisible) {
      setAppFadeIn(true);
    }
  }, [showIntro, introVisible]);

  return (
    <>
      {introVisible && <IntroAnimation onFinish={handleIntroFinish} />}
      {!introVisible && (
        <div className={appFadeIn ? 'app-fade-in' : ''}>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout activeNavItem={activeNavItem} setActiveNavItem={setActiveNavItem} />}>
                <Route path="/" element={<App />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/recruiter" element={<RecruiterPage />} />
                <Route path="/resume" element={<ResumePage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/recruiter-contact" element={<RecruiterContactPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      )}
    </>
  );
};

export default AppWithRouter;

