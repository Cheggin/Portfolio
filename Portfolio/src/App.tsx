import React, { useState } from 'react';
import './App.css';
import FluidCursor from './components/FluidCursor';
import LiquidGlassCard from './components/LiquidGlassCard';
import LiquidGlassButton from './components/LiquidGlassButton';
import LiquidGlassNav from './components/LiquidGlassNav';
import LiquidGlassModal from './components/LiquidGlassModal';

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
        {/* Navigation */}
        <nav style={{ position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }}>
          <LiquidGlassNav
            items={navItems}
            activeItem={activeNavItem}
            onItemClick={setActiveNavItem}
          />
        </nav>

        {/* Header */}
        <header style={{ marginTop: '100px', textAlign: 'center', padding: '40px 20px' }}>
          <LiquidGlassCard style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ 
              fontSize: '3rem', 
              margin: '0 0 20px 0', 
              background: 'linear-gradient(45deg, #fff, #a8edea)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Welcome to My Portfolio
            </h1>
            <p style={{ fontSize: '1.2rem', margin: '0 0 30px 0', opacity: 0.9 }}>
              Move your mouse to create beautiful fluid effects and explore the liquid glass components
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <LiquidGlassButton onClick={() => setIsModalOpen(true)}>
                View Demo
              </LiquidGlassButton>
              <LiquidGlassButton variant="secondary">
                Download CV
              </LiquidGlassButton>
            </div>
          </LiquidGlassCard>
        </header>

        {/* Main Content */}
        <main style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gap: '32px', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
            
            {/* About Section */}
            <LiquidGlassCard>
              <h2 style={{ margin: '0 0 20px 0', fontSize: '1.8rem' }}>About Me</h2>
              <p style={{ lineHeight: '1.6', margin: '0 0 20px 0' }}>
                I'm a passionate developer who loves creating beautiful, interactive experiences. 
                This portfolio showcases my expertise in modern web technologies and creative design.
              </p>
              <LiquidGlassButton variant="ghost" size="small">
                Learn More
              </LiquidGlassButton>
            </LiquidGlassCard>

            {/* Skills Section */}
            <LiquidGlassCard>
              <h2 style={{ margin: '0 0 20px 0', fontSize: '1.8rem' }}>Skills</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['React', 'TypeScript', 'WebGL', 'Three.js', 'Node.js', 'Python'].map(skill => (
                  <span key={skill} style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </LiquidGlassCard>

            {/* Projects Section */}
            <LiquidGlassCard>
              <h2 style={{ margin: '0 0 20px 0', fontSize: '1.8rem' }}>Featured Projects</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ padding: '16px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '1.2rem' }}>Fluid Simulation</h3>
                  <p style={{ margin: '0 0 12px 0', fontSize: '0.9rem', opacity: 0.8 }}>
                    Real-time WebGL fluid dynamics with interactive cursor effects
                  </p>
                  <LiquidGlassButton size="small" variant="secondary">
                    View Project
                  </LiquidGlassButton>
                </div>
                <div style={{ padding: '16px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '1.2rem' }}>Liquid Glass UI</h3>
                  <p style={{ margin: '0 0 12px 0', fontSize: '0.9rem', opacity: 0.8 }}>
                    Modern glassmorphism components with fluid animations
                  </p>
                  <LiquidGlassButton size="small" variant="secondary">
                    View Project
                  </LiquidGlassButton>
                </div>
              </div>
            </LiquidGlassCard>

            {/* Contact Section */}
            <LiquidGlassCard>
              <h2 style={{ margin: '0 0 20px 0', fontSize: '1.8rem' }}>Get In Touch</h2>
              <p style={{ lineHeight: '1.6', margin: '0 0 20px 0' }}>
                Interested in working together? Let's create something amazing!
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <LiquidGlassButton variant="primary">
                  Contact Me
                </LiquidGlassButton>
                <LiquidGlassButton variant="ghost">
                  LinkedIn
                </LiquidGlassButton>
              </div>
            </LiquidGlassCard>
      </div>
        </main>

        {/* Footer */}
        <footer style={{ textAlign: 'center', padding: '40px 20px', marginTop: '60px' }}>
          <LiquidGlassCard style={{ maxWidth: '600px', margin: '0 auto' }}>
            <p style={{ margin: 0, opacity: 0.8 }}>
              © 2024 My Portfolio. Built with React, TypeScript, and WebGL.
            </p>
          </LiquidGlassCard>
        </footer>
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
    </div>
  );
}

export default App;
