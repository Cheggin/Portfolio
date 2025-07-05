import React, { useState } from "react";
import FluidCursor from "./FluidCursor";
import UniversalNavbar from "./UniversalNavbar";

const ResumePage: React.FC = () => {
  const [activeNavItem, setActiveNavItem] = useState('home');
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Me' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        position: "relative",
        overflow: "hidden",
        fontFamily: "Roboto, system-ui, sans-serif",
        margin: 0,
        padding: 0,
        background: "rgba(0,0,0,0.85)",
      }}
    >
      <UniversalNavbar
        navItems={navItems}
        activeNavItem={activeNavItem}
        onItemClick={setActiveNavItem}
      />
      <FluidCursor />
      <div
        style={{
          width: "100vw",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "center",
          paddingTop: 120,
        }}
      >
        <div
          style={{
            width: "60vw",
            minHeight: "80vh",
            background: "rgba(20,20,30,0.55)",
            borderRadius: 32,
            boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            padding: "48px 48px 48px 48px",
            margin: "0 auto",
            color: "#fff",
            fontFamily: "Roboto, system-ui, sans-serif",
            fontSize: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <h1 style={{ fontSize: 44, fontWeight: 900, marginBottom: 24, color: "#fff", textShadow: "0 0 16px #0a84ff22" }}>Full Resume</h1>
          <p style={{ marginBottom: 24, color: "#e6e6f0" }}>
            (Your full resume content goes here. You can format this as you wish, or render a PDF, etc.)
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResumePage; 