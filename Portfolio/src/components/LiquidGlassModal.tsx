import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface LiquidGlassModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
  style?: React.CSSProperties;
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
}

const LiquidGlassModal: React.FC<LiquidGlassModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  className = '',
  style = {},
  showCloseButton = true,
  closeOnBackdropClick = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = 'unset';
      }, 300);
      return () => clearTimeout(timer);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    if (isOpen) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  const backdropStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10000,
    opacity: isVisible ? 1 : 0,
    transition: 'opacity 0.3s ease',
    padding: '20px',
  };

  const modalStyle: React.CSSProperties = {
    position: 'relative',
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(50px) saturate(200%)',
    WebkitBackdropFilter: 'blur(50px) saturate(200%)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '24px',
    boxShadow: `
      0 25px 80px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(255, 255, 255, 0.08) inset,
      0 1px 0 rgba(255, 255, 255, 0.15) inset
    `,
    maxWidth: '90vw',
    maxHeight: '90vh',
    overflow: 'hidden',
    transform: isVisible ? 'scale(1)' : 'scale(0.9)',
    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
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

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '24px 24px 0 24px',
    borderBottom: title ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
    marginBottom: title ? '16px' : 0,
  };

  const titleStyle: React.CSSProperties = {
    color: 'rgba(255, 255, 255, 0.95)',
    fontSize: '20px',
    fontWeight: 600,
    margin: 0,
  };

  const closeButtonStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '18px',
    transition: 'all 0.3s ease',
  };

  const contentStyle: React.CSSProperties = {
    padding: title ? '0 24px 24px 24px' : '24px',
    color: 'rgba(255, 255, 255, 0.9)',
    maxHeight: 'calc(90vh - 120px)',
    overflowY: 'auto',
  };

  if (!isVisible && !isOpen) return null;

  const modalContent = (
    <div className={`liquid-glass-modal-backdrop ${className}`} style={backdropStyle} onClick={handleBackdropClick}>
      <div className="liquid-glass-modal" style={modalStyle}>
        <div style={glassEffect} />
        
        {(title || showCloseButton) && (
          <div style={headerStyle}>
            {title && <h2 style={titleStyle}>{title}</h2>}
            {showCloseButton && (
              <button
                style={closeButtonStyle}
                onClick={onClose}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                }}
              >
                ×
              </button>
            )}
          </div>
        )}
        
        <div style={contentStyle}>
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default LiquidGlassModal; 