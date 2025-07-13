import React, { useState, useRef, useEffect } from 'react';

interface LiquidGlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
}

const LiquidGlassButton: React.FC<LiquidGlassButtonProps> = ({
  children,
  onClick,
  className = '',
  style = {},
  disabled = false,
  variant = 'primary',
  size = 'medium',
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleId = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const size = Math.max(rect.width, rect.height);

      const newRipple = {
        id: rippleId.current++,
        x,
        y,
        size,
      };

      setRipples(prev => [...prev, newRipple]);

      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 600);
    }

    onClick?.();
  };

  const getVariantStyles = () => {
    return {
      background: 'rgba(30, 30, 40, 0.18)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      color: 'rgba(255, 255, 255, 0.95)',
    };
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { padding: '8px 16px', fontSize: '14px' };
      case 'large':
        return { padding: '16px 32px', fontSize: '18px' };
      default:
        return { padding: '12px 24px', fontSize: '16px' };
    }
  };

  const buttonStyle: React.CSSProperties = {
    position: 'relative',
    borderRadius: '16px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontFamily: 'inherit',
    fontWeight: 500,
    letterSpacing: '0.5px',
    backdropFilter: 'blur(60px) saturate(180%)',
    WebkitBackdropFilter: 'blur(60px) saturate(180%)',
    boxShadow: `
      0 4px 20px rgba(0, 0, 0, 0.15),
      0 0 0 1px rgba(255, 255, 255, 0.08) inset,
      0 1px 0 rgba(255, 255, 255, 0.15) inset
    `,
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    overflow: 'hidden',
    opacity: disabled ? 0.5 : 1,
    transform: isPressed ? 'scale(0.96)' : 'scale(1)',
    outline: 'none',
    ...getVariantStyles(),
    ...getSizeStyles(),
    ...style,
  };

  const glassEffect: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'transparent',
    pointerEvents: 'none',
    opacity: disabled ? 0 : 0.6,
    mixBlendMode: 'overlay',
  };

  const rippleStyle = (ripple: { x: number; y: number; size: number }) => ({
    position: 'absolute' as const,
    left: ripple.x - ripple.size / 2,
    top: ripple.y - ripple.size / 2,
    width: ripple.size,
    height: ripple.size,
    background: 'rgba(255, 255, 255, 0.3)',
    borderRadius: '50%',
    transform: 'scale(0)',
    animation: 'ripple 0.6s ease-out',
    pointerEvents: 'none' as const,
  });

  return (
    <>
      <style>
        {`
          @keyframes ripple {
            to {
              transform: scale(2);
              opacity: 0;
            }
          }
          .liquid-glass-button:focus {
            outline: none;
            box-shadow: none;
          }
          .liquid-glass-button:focus-visible {
            outline: 2px solid #99c7ff;
            box-shadow: 0 0 0 2px #222, 0 0 0 4px #99c7ff;
          }
        `}
      </style>
      <button
        ref={buttonRef}
        className={`liquid-glass-button ${className}`}
        style={buttonStyle}
        onClick={handleClick}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        disabled={disabled}
      >
        <div style={glassEffect} />
        {ripples.map(ripple => (
          <div key={ripple.id} style={rippleStyle(ripple)} />
        ))}
        <span style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </span>
      </button>
    </>
  );
};

export default LiquidGlassButton; 