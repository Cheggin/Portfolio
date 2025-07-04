import React, { useState, useEffect } from 'react';
import './App.css';
import FluidCursor from './components/FluidCursor';
import LiquidGlassCard from './components/LiquidGlassCard';
import LiquidGlassButton from './components/LiquidGlassButton';
import LiquidGlassNav from './components/LiquidGlassNav';
import LiquidGlassModal from './components/LiquidGlassModal';
import AppleGlowName from './components/AppleGlowName';

function App() {
  const [activeNavItem, setActiveNavItem] = useState('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showButtons, setShowButtons] = useState([false, false, false]);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    setShowButtons([false, false, false]);
    const timers = [
      setTimeout(() => setShowButtons(s => [true, s[1], s[2]]), 800),
      setTimeout(() => setShowButtons(s => [true, true, s[2]]), 1000),
      setTimeout(() => setShowButtons([true, true, true]), 1200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="App">
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

        {/* Footer */}
        {/* Footer removed as requested */}
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
          <LiquidGlassButton size="large" variant="primary">Hire Me</LiquidGlassButton>
        </div>
        <div style={{
          opacity: showButtons[1] ? 1 : 0,
          transform: showButtons[1] ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1)',
        }}>
          <LiquidGlassButton size="large" variant="secondary">About Me</LiquidGlassButton>
        </div>
        <div style={{
          opacity: showButtons[2] ? 1 : 0,
          transform: showButtons[2] ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1)',
        }}>
          <LiquidGlassButton size="large" variant="ghost">Projects</LiquidGlassButton>
        </div>
      </div>
    </div>
  );
}

export default App;
