import React, { useState, useEffect } from 'react';
import './App.css';
import FluidCursor from './components/FluidCursor';
import LiquidGlassButton from './components/LiquidGlassButton';
import LiquidGlassModal from './components/LiquidGlassModal';
import AppleGlowName from './components/AppleGlowName';
import RecruiterButton from './components/RecruiterButton';
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
      {/* Prominent Recruiter Button - Bottom Left */}
      <div style={{
        position: 'fixed',
        bottom: '32px',
        left: '32px',
        zIndex: 2000,
      }}>
        <div style={{
          opacity: showButton ? 1 : 0,
          transform: showButton ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)',
          transition: 'opacity 0.8s cubic-bezier(.4,0,.2,1), transform 0.8s cubic-bezier(.4,0,.2,1)',
        }}>
          <RecruiterButton onClick={() => navigate('/recruiter')} />
        </div>
      </div>
    </div>
  );
}

const AppWithRouter = () => {
  const [activeNavItem, setActiveNavItem] = React.useState('home');
  return (
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
  );
};

export default AppWithRouter;

