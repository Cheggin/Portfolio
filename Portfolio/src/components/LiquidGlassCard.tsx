import React, { useState, useEffect } from 'react';

interface LiquidGlassCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  hoverEffect?: boolean;
  animated?: boolean;
}

const LiquidGlassCard: React.FC<LiquidGlassCardProps> = ({
  children,
  className = '',
  style = {},
  hoverEffect = true,
  animated = true,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    if (animated) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (animated) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [animated]);

  const cardStyle: React.CSSProperties = {
    position: 'relative',
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(40px) saturate(180%)',
    WebkitBackdropFilter: 'blur(40px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '20px',
    padding: '24px',
    boxShadow: `
      0 8px 32px rgba(0, 0, 0, 0.12),
      0 0 0 1px rgba(255, 255, 255, 0.05) inset,
      0 1px 0 rgba(255, 255, 255, 0.1) inset
    `,
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    overflow: 'hidden',
    ...style,
  };

  const glassEffect: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
        rgba(255, 255, 255, 0.15) 0%, 
        rgba(255, 255, 255, 0.05) 30%, 
        transparent 60%
      ),
      linear-gradient(
        135deg, 
        rgba(255, 255, 255, 0.1) 0%, 
        rgba(255, 255, 255, 0.05) 50%, 
        rgba(255, 255, 255, 0.02) 100%
      )
    `,
    pointerEvents: 'none',
    transition: animated ? 'none' : 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    opacity: isHovered ? 1 : 0.4,
    mixBlendMode: 'overlay',
  };

  const borderGlow: React.CSSProperties = {
    position: 'absolute',
    top: '-2px',
    left: '-2px',
    right: '-2px',
    bottom: '-2px',
    background: `
      linear-gradient(45deg, 
        rgba(255, 255, 255, 0.2), 
        rgba(255, 255, 255, 0.1), 
        rgba(255, 255, 255, 0.05), 
        rgba(255, 255, 255, 0.1), 
        rgba(255, 255, 255, 0.2)
      )
    `,
    borderRadius: '22px',
    zIndex: -1,
    opacity: isHovered ? 1 : 0.4,
    transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    filter: 'blur(1px)',
  };

  const handleMouseEnter = () => {
    if (hoverEffect) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (hoverEffect) {
      setIsHovered(false);
    }
  };

  return (
    <div
      className={`liquid-glass-card ${className}`}
      style={cardStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={borderGlow} />
      <div style={glassEffect} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};

export default LiquidGlassCard; 