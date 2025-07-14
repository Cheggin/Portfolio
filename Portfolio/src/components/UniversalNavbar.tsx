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
  return (
    <div
      style={{
        position: 'fixed',
        top: '24px',
        right: '36px',
        zIndex: 3000,
        width: 'auto',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
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
  );
};

export default UniversalNavbar; 