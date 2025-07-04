import React, { useState } from 'react';
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

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

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
        <LiquidGlassButton size="large" variant="primary">Hire Me</LiquidGlassButton>
        <LiquidGlassButton size="large" variant="secondary">About Me</LiquidGlassButton>
        <LiquidGlassButton size="large" variant="ghost">Projects</LiquidGlassButton>
      </div>
    </div>
  );
}

export default App;
