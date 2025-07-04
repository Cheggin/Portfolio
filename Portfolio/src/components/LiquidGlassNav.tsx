import React, { useState, useEffect } from 'react';

interface NavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface LiquidGlassNavProps {
  items: NavItem[];
  activeItem?: string;
  onItemClick?: (itemId: string) => void;
  className?: string;
  style?: React.CSSProperties;
  variant?: 'horizontal' | 'vertical';
}

const LiquidGlassNav: React.FC<LiquidGlassNavProps> = ({
  items,
  activeItem,
  onItemClick,
  className = '',
  style = {},
  variant = 'horizontal',
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    background: 'rgba(30, 30, 40, 0.18)',
    backdropFilter: 'blur(60px) saturate(180%)',
    WebkitBackdropFilter: 'blur(60px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: variant === 'horizontal' ? '20px' : '16px',
    padding: variant === 'horizontal' ? '8px' : '12px',
    display: 'flex',
    flexDirection: variant === 'horizontal' ? 'row' : 'column',
    gap: '4px',
    boxShadow: `
      0 8px 32px rgba(0, 0, 0, 0.12),
      0 0 0 1px rgba(255, 255, 255, 0.05) inset,
      0 1px 0 rgba(255, 255, 255, 0.1) inset
    `,
    overflow: 'hidden',
    ...style,
  };

  const glassEffect: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.05) 0%, transparent 50%)`,
    pointerEvents: 'none',
  };

  const itemStyle = (itemId: string): React.CSSProperties => ({
    position: 'relative',
    padding: variant === 'horizontal' ? '12px 20px' : '16px 20px',
    borderRadius: '12px',
    border: 'none',
    background: 'transparent',
    color: activeItem === itemId ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.7)',
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontSize: '14px',
    fontWeight: activeItem === itemId ? 600 : 500,
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    minWidth: variant === 'horizontal' ? 'auto' : '200px',
    textAlign: variant === 'horizontal' ? 'center' : 'left',
  });

  const activeIndicatorStyle: React.CSSProperties = {
    position: 'absolute',
    top: '8px',
    left: '8px',
    right: '8px',
    bottom: '8px',
    background: `
      linear-gradient(135deg, 
        rgba(255, 255, 255, 0.2) 0%, 
        rgba(255, 255, 255, 0.1) 50%, 
        rgba(255, 255, 255, 0.05) 100%
      )
    `,
    borderRadius: '12px',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: -1,
    boxShadow: `
      0 0 0 1px rgba(255, 255, 255, 0.1) inset,
      0 1px 0 rgba(255, 255, 255, 0.15) inset
    `,
  };

  const hoverEffectStyle = (itemId: string): React.CSSProperties => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: hoveredItem === itemId ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
    borderRadius: '12px',
    transition: 'background 0.3s ease',
    pointerEvents: 'none',
  });

  const handleItemClick = (itemId: string) => {
    onItemClick?.(itemId);
  };

  const handleItemHover = (itemId: string) => {
    setHoveredItem(itemId);
  };

  const handleItemLeave = () => {
    setHoveredItem(null);
  };

  return (
    <nav className={`liquid-glass-nav ${className}`} style={containerStyle}>
      <div style={glassEffect} />
      
      {items.map((item) => (
        <button
          key={item.id}
          className={`nav-item ${activeItem === item.id ? 'active' : ''}`}
          style={itemStyle(item.id)}
          onClick={() => handleItemClick(item.id)}
          onMouseEnter={() => handleItemHover(item.id)}
          onMouseLeave={handleItemLeave}
        >
          <div style={hoverEffectStyle(item.id)} />
          {item.icon && <span className="nav-icon">{item.icon}</span>}
          <span className="nav-label" style={{ position: 'relative', display: 'inline-block' }}>
            {item.label}
            <span
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: -5,
                height: 1,
                borderRadius: 1,
                background: activeItem === item.id ? 'rgba(255,255,255,0.85)' : 'transparent',
                transition: 'background 0.3s, width 0.3s',
                width: activeItem === item.id ? '100%' : '0%',
                margin: '0 auto',
                zIndex: 2,
              }}
            />
          </span>
        </button>
      ))}
    </nav>
  );
};

export default LiquidGlassNav; 