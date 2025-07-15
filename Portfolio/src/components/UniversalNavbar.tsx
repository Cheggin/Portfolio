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
              flex-wrap: nowrap !important;
              min-width: 0 !important;
              max-width: 100vw !important;
              overflow-x: auto !important;
              overflow-y: visible !important;
              padding: 4px !important;
              gap: 0 !important;
              justify-content: space-between !important;
            }
            .nav-item {
              min-width: 0 !important;
              flex: 1 1 0 !important;
              word-break: break-word;
              font-size: 12px !important;
              padding: 8px 8px !important;
              line-height: 1.1 !important;
              max-width: 100vw !important;
              white-space: nowrap !important;
              overflow: hidden !important;
              text-overflow: ellipsis !important;
            }
            .nav-label {
              font-size: 12px !important;
              padding: 0 !important;
              white-space: nowrap !important;
              overflow: hidden !important;
              text-overflow: ellipsis !important;
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