import React, { useState, useEffect } from 'react';
import CountUp from './CountUp';
import { FaRegStar, FaEye } from 'react-icons/fa';

const VisitorCounter: React.FC = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [githubStars, setGithubStars] = useState(0);

  useEffect(() => {
    // Check if we've already counted this session
    const sessionKey = 'portfolioVisitorCounted';
    const hasCounted = sessionStorage.getItem(sessionKey);
    
    if (!hasCounted) {
      // Get visitor count from localStorage
      const storedCount = localStorage.getItem('portfolioVisitorCount');
      const currentCount = storedCount ? parseInt(storedCount, 10) : 0;
      
      // Increment count for this visit
      const newCount = currentCount + 1;
      localStorage.setItem('portfolioVisitorCount', newCount.toString());
      setVisitorCount(newCount);
      
      // Mark this session as counted
      sessionStorage.setItem(sessionKey, 'true');
    } else {
      // Just display the current count without incrementing
      const storedCount = localStorage.getItem('portfolioVisitorCount');
      const currentCount = storedCount ? parseInt(storedCount, 10) : 0;
      setVisitorCount(currentCount);
    }
  }, []);

  // Fetch GitHub star count
  useEffect(() => {
    const fetchGithubStars = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/Cheggin/Portfolio');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setGithubStars(data.stargazers_count || 0);
      } catch (error) {
        console.error('Failed to fetch GitHub stars:', error);
        setGithubStars(0);
      }
    };

    fetchGithubStars();
  }, []);

  const containerStyle: React.CSSProperties = {
    position: 'fixed',
    top: '24px',
    left: '24px',
    zIndex: 3001,
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: 'rgba(30, 30, 40, 0.18)',
    backdropFilter: 'blur(60px) saturate(180%)',
    WebkitBackdropFilter: 'blur(60px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '20px',
    padding: '8px 16px',
    boxShadow: `
      0 8px 32px rgba(0, 0, 0, 0.12),
      0 0 0 1px rgba(255, 255, 255, 0.05) inset,
      0 1px 0 rgba(255, 255, 255, 0.1) inset
    `,
    overflow: 'hidden',
  };

  const counterStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: 'rgba(255, 255, 255, 0.95)',
    fontSize: '14px',
    fontWeight: '500',
    letterSpacing: '0.5px',
  };

  const githubLinkStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: 'rgba(255, 255, 255, 0.95)',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    letterSpacing: '0.5px',
    padding: '8px 12px',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'inherit',
  };

  const hoverEffectStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    transition: 'background 0.3s ease',
    pointerEvents: 'none',
  };

  return (
    <div style={containerStyle}>
      {/* Visitor Counter */}
      <div style={counterStyle}>
        <FaEye style={{ fontSize: '16px' }} />
        <span>
          <CountUp 
            to={visitorCount} 
            duration={1.5}
            separator=","
          />
          <span style={{ marginLeft: '4px', opacity: 0.8 }}>Views</span>
        </span>
      </div>

      {/* GitHub Star Link with Count */}
      <div style={{ position: 'relative' }}>
        <a
          href="https://github.com/Cheggin/Portfolio"
          target="_blank"
          rel="noopener noreferrer"
          style={githubLinkStyle}
          onMouseEnter={(e) => {
            const hoverEffect = e.currentTarget.querySelector('.hover-effect') as HTMLElement;
            if (hoverEffect) hoverEffect.style.background = 'rgba(255, 255, 255, 0.05)';
          }}
          onMouseLeave={(e) => {
            const hoverEffect = e.currentTarget.querySelector('.hover-effect') as HTMLElement;
            if (hoverEffect) hoverEffect.style.background = 'transparent';
          }}
        >
          <div className="hover-effect" style={hoverEffectStyle} />
          <FaRegStar style={{ fontSize: '16px', position: 'relative', zIndex: 1 }} />
          <span style={{ position: 'relative', zIndex: 1 }}>
            Github
            <span style={{ marginLeft: '4px', opacity: 0.8 }}>
              (<CountUp to={githubStars} duration={1} separator="," />)
            </span>
          </span>
        </a>
      </div>
    </div>
  );
};

export default VisitorCounter; 