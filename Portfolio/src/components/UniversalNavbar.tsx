import React from "react";
import LiquidGlassNav from "./LiquidGlassNav";

interface NavItem {
  id: string;
  label: string;
}

interface UniversalNavbarProps {
  navItems: NavItem[];
  activeNavItem: string;
  onItemClick: (id: string) => void;
  style?: React.CSSProperties;
}

const UniversalNavbar: React.FC<UniversalNavbarProps> = ({ navItems, activeNavItem, onItemClick, style }) => {
  // Responsive styles: use inline styles for base, and a style tag for mobile overrides
  return (
    <>
      <style>
        {`
          @media (max-width: 600px) {
            .universal-navbar-root {
              right: 8px !important;
              left: 8px !important;
              top: 8px !important;
              width: auto !important;
              max-width: calc(100vw - 16px) !important;
              min-width: 0 !important;
            }
            .liquid-glass-nav {
              flex-wrap: wrap !important;
              min-width: 0 !important;
              max-width: 100vw !important;
            }
            .nav-item {
              min-width: 0 !important;
              flex: 1 1 auto !important;
              word-break: break-word;
            }
          }
        `}
      </style>
      <div
        className="universal-navbar-root"
        style={{
          position: 'fixed',
          top: '24px',
          right: '36px',
          zIndex: 3000,
          width: 'auto',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          maxWidth: '100vw',
          minWidth: 0,
          ...style,
        }}
      >
        <LiquidGlassNav
          items={navItems}
          variant="horizontal"
          style={{ minWidth: 0 }}
          activeItem={activeNavItem}
          onItemClick={onItemClick}
        />
      </div>
    </>
  );
};

export default UniversalNavbar; 