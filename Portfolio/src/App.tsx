import React, { useState, useEffect } from 'react';
import './App.css';
import FluidCursor from './components/FluidCursor';
import LiquidGlassButton from './components/LiquidGlassButton';
import LiquidGlassModal from './components/LiquidGlassModal';
import AppleGlowName from './components/AppleGlowName';
import LoadingScreen from './components/LoadingScreen';
import VisitorCounter from './components/VisitorCounter';
import UniversalNavbar from './components/UniversalNavbar';
import { navItems, handleNavItemClick } from './components/navConfig';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import RecruiterPage from './components/RecruiterPage';
import ResumePage from './components/ResumePage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import RecruiterContactPage from './components/RecruiterContactPage';

function App() {
  const [activeNavItem, setActiveNavItem] = useState('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showButtons, setShowButtons] = useState([false, false, false]);
  const [showLoading, setShowLoading] = useState<null | string>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setShowButtons([false, false, false]);
    const timers = [
      setTimeout(() => setShowButtons(s => [true, s[1], s[2]]), 800),
      setTimeout(() => setShowButtons(s => [true, true, s[2]]), 1000),
      setTimeout(() => setShowButtons([true, true, true]), 1200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      setActiveNavItem('home');
    } else if (path === '/about') {
      setActiveNavItem('about');
    } else if (path === '/projects') {
      setActiveNavItem('projects');
    } else if (path === '/contact') {
      setActiveNavItem('contact');
    } else if (path === '/recruiter-contact') {
      setActiveNavItem('recruiter-contact');
    }
  }, [location.pathname]);

  return (
    <div className="App">
      <LoadingScreen
        animateTo={showLoading || undefined}
        visible={!!showLoading}
        onFinish={() => {
          if (showLoading === 'recruiter') navigate('/recruiter');
          setShowLoading(null);
        }}
      />

      {/* Universal Navbar at top right */}
      <UniversalNavbar
        navItems={navItems}
        activeNavItem={activeNavItem}
        onItemClick={id => handleNavItemClick(id, navigate, setActiveNavItem)}
      />

      {/* Visitor Counter and GitHub Star at top left */}
      <div style={{ position: 'fixed', top: 24, left: 36, zIndex: 2000 }}>
      <VisitorCounter />
      </div>

      <div className="content" style={{ opacity: showLoading ? 0 : 1, pointerEvents: showLoading ? 'none' : 'auto', transition: 'opacity 0.6s cubic-bezier(.4,0,.2,1)' }}>
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

      {/* Bottom Liquid Glass Buttons */}
      <div style={{
        position: 'fixed',
        bottom: '32px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '24px',
        zIndex: 2000,
      }}>
        <div style={{
          opacity: showButtons[0] ? 1 : 0,
          transform: showButtons[0] ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1)',
        }}>
          <LiquidGlassButton size="large" variant="primary" onClick={() => setShowLoading('recruiter')}>Recruiters</LiquidGlassButton>
        </div>
        <div style={{
          opacity: showButtons[1] ? 1 : 0,
          transform: showButtons[1] ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1)',
        }}>
          <LiquidGlassButton size="large" variant="secondary" onClick={() => setShowLoading('friends/family')}>Friends & Family</LiquidGlassButton>
        </div>
        <div style={{
          opacity: showButtons[2] ? 1 : 0,
          transform: showButtons[2] ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1)',
        }}>
          <LiquidGlassButton size="large" variant="ghost" onClick={() => setShowLoading('secret admirer')}>Secret Admirer...?</LiquidGlassButton>
        </div>
      </div>
    </div>
  );
}

const AppWithRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/recruiter" element={<RecruiterPage />} />
      <Route path="/resume" element={<ResumePage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/recruiter-contact" element={<RecruiterContactPage />} />
    </Routes>
  </BrowserRouter>
);

export default AppWithRouter;
