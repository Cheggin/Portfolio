import React, { useState, useRef, useEffect } from 'react';
import LiquidGlassButton from './LiquidGlassButton';

const nodeStyle: React.CSSProperties = {
  width: 90,
  height: 90,
  minWidth: 90,
  minHeight: 90,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 13,
  fontWeight: 700,
  margin: '0 auto',
  zIndex: 2,
  padding: 0,
  textAlign: 'center',
  boxShadow: '0 8px 32px rgba(0,0,0,0.22), 0 2px 12px rgba(255,255,255,0.18) inset',
  border: '2.5px solid rgba(255,255,255,0.28)',
  background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(30,30,40,0.18) 100%)',
  backdropFilter: 'blur(80px) saturate(220%)',
  WebkitBackdropFilter: 'blur(80px) saturate(220%)',
  overflow: 'hidden',
  wordBreak: 'break-word',
  whiteSpace: 'pre-line',
};

interface LoadingScreenProps {
  animateTo?: string;
  onFinish?: () => void;
  visible?: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ animateTo, onFinish, visible = true }) => {
  // Layout constants
  const width = 500;
  const height = 350;
  const centerX = width / 2;
  const homeY = 80;
  const nodeRadius = 45; // half of node width/height
  const arcRadius = 170; // distance from home to children
  // Place children evenly spaced on a horizontal line
  const childY = homeY + nodeRadius + arcRadius;
  const childSpacing = 180;
  const children = [
    { label: 'Recruiter', id: 'recruiter', x: centerX - childSpacing, y: childY },
    { label: 'Friends/Family', id: 'friends/family', x: centerX, y: childY },
    { label: 'Secret Admirer', id: 'secret admirer', x: centerX + childSpacing, y: childY },
  ];

  const [animProgress, setAnimProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isFadingIn, setIsFadingIn] = useState(false);
  const animRef = useRef<number | null>(null);

  // Animate the highlight
  useEffect(() => {
    if (!animateTo) return;
    setAnimProgress(0);
    let start: number | null = null;
    function animate(ts: number) {
      if (start === null) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / 900, 1); // 0.9s
      setAnimProgress(progress);
      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        setTimeout(() => setIsFadingOut(true), 400); // slight pause after animation
      }
    }
    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [animateTo]);

  // Fade-in on mount
  useEffect(() => {
    if (visible) {
      setIsFadingIn(true);
      setIsFadingOut(false);
    } else {
      setIsFadingIn(false);
      setIsFadingOut(true);
    }
  }, [visible]);

  // Fade-out effect and call onFinish after fade
  useEffect(() => {
    if (!isFadingOut) return;
    const timeout = setTimeout(() => {
      if (onFinish) onFinish();
    }, 600); // match fade duration
    return () => clearTimeout(timeout);
  }, [isFadingOut, onFinish]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(10,10,20,0.95)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isFadingOut ? 0 : (isFadingIn ? 1 : 0),
        pointerEvents: isFadingOut ? 'none' : 'auto',
        transition: 'opacity 0.6s cubic-bezier(.4,0,.2,1)',
      }}
    >
      <div style={{ position: 'relative', width, height }}>
        {/* SVG lines */}
        <svg width={width} height={height} style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
          <defs>
            {children.map(child => {
              if (animateTo === child.id) {
                // Animate the gradient highlight
                const gradId = `highlight-gradient-${child.id.replace(/\s+/g, '-')}`;
                return (
                  <linearGradient
                    key={gradId}
                    id={gradId}
                    gradientUnits="userSpaceOnUse"
                    x1={centerX}
                    y1={homeY + nodeRadius}
                    x2={child.x}
                    y2={child.y - nodeRadius}
                  >
                    <stop offset="0%" stopColor="#0a84ff" />
                    <stop offset={Math.max(0, animProgress * 100 - 10) + '%'} stopColor="#0a84ff" />
                    <stop offset={Math.max(0, animProgress * 100) + '%'} stopColor="#bf5af2" />
                    <stop offset={Math.min(100, animProgress * 100 + 30) + '%'} stopColor="#ff375f" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="#ff375f" stopOpacity={0.2} />
                  </linearGradient>
                );
              }
              return null;
            })}
          </defs>
          {children.map(child => {
            const isActive = animateTo === child.id;
            const gradId = `highlight-gradient-${child.id.replace(/\s+/g, '-')}`;
            return (
              <line
                key={child.id}
                x1={centerX}
                y1={homeY + nodeRadius}
                x2={child.x}
                y2={child.y - nodeRadius}
                stroke={isActive ? `url(#${gradId})` : 'rgba(255,255,255,0.18)'}
                strokeWidth={isActive ? 5 : 3}
                style={{ filter: isActive ? 'drop-shadow(0 0 8px #bf5af2)' : undefined, transition: 'stroke-width 0.2s' }}
              />
            );
          })}
        </svg>
        {/* Home node */}
        <div style={{ position: 'absolute', left: centerX - nodeRadius, top: homeY, zIndex: 2 }}>
          <LiquidGlassButton size="large" style={nodeStyle}>Home</LiquidGlassButton>
        </div>
        {/* Child nodes */}
        {children.map(child => (
          <div key={child.id} style={{ position: 'absolute', left: child.x - nodeRadius, top: child.y - nodeRadius, zIndex: 2 }}>
            <LiquidGlassButton
              size="large"
              style={nodeStyle}
              // No onClick, not interactive
            >
              <span style={{whiteSpace:'pre-line'}}>{child.label}</span>
            </LiquidGlassButton>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen; 