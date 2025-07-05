import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    const originalHtmlOverflowX = document.documentElement.style.overflowX;
    const originalBodyOverflowX = document.body.style.overflowX;
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';
    return () => {
      document.documentElement.style.overflowX = originalHtmlOverflowX;
      document.body.style.overflowX = originalBodyOverflowX;
    };
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 1,
        marginTop: 100,
        overflowX: "hidden",
        overflowY: "auto",
        fontFamily: "Roboto, system-ui, sans-serif",
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
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
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100vw",
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