import React, { useEffect, useState } from "react";
import FluidCursor from "./FluidCursor";
import pfp from "./images/pfp.png";
import TiltedCard from "./TiltedCard";
import FallingText from "./FallingText";
import UniversalNavbar from "./UniversalNavbar";

const RecruiterPage: React.FC = () => {
  useEffect(() => {
    // Prevent scrolling on this page
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;
    };
  }, []);

  // Navbar logic (local state)
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
          display: "flex",
          flexDirection: "row",
          height: "100vh",
          width: "100vw",
        }}
      >
        {/* Left half: content */}
        <div
          style={{
            width: "50vw",
            minHeight: "100vh",
            padding: "96px 48px 48px 3vw",
            marginTop: 90,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            marginRight: 32,
          }}
        >
          <h1
            style={{
              fontSize: 44,
              fontWeight: 900,
              marginBottom: 12,
              color: "#fff",
              textShadow: "0 0 16px #0a84ff22",
              textAlign: "left",
              width: "100%",
              fontFamily: "Roboto, system-ui, sans-serif",
            }}
          >
            Why You Should Hire Me
          </h1>
          <p style={{ fontSize: 20, color: "#e6e6f0", marginBottom: 40, textAlign: "left", width: "100%", fontFamily: "Roboto, system-ui, sans-serif" }}>
            I am a passionate, results-driven developer with a proven track record in AI/ML, full-stack development, and leadership. My experience spans research, startups, and award-winning hackathons. I thrive in fast-paced, collaborative environments and am eager to bring my skills to your team.
          </p>
        </div>
        {/* Right half: large TiltedCard with border, rounded corners, and persistent overlay caption */}
        <div
          style={{
            width: "50vw",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            background: "transparent",
          }}
        >
          <TiltedCard
            imageSrc={pfp}
            altText="Reagan Hsu photo"
            containerHeight="min(80vh, 540px)"
            containerWidth="min(80vw, 380px)"
            imageHeight="100%"
            imageWidth="100%"
            rotateAmplitude={14}
            scaleOnHover={1.08}
            showMobileWarning={false}
            showTooltip={false}
            displayOverlayContent={true}
            overlayContent={
              <div
                style={{
                  position: "absolute",
                  top: 24,
                  right: 24,
                  left: "auto",
                  transform: "none",
                  background: "rgba(40,40,50,0.65)",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 22,
                  padding: "10px 28px",
                  borderRadius: 32,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
                  textAlign: "center",
                  letterSpacing: 0.5,
                  zIndex: 10,
                  pointerEvents: "none",
                  fontFamily: "Roboto, system-ui, sans-serif",
                  whiteSpace: "nowrap",
                }}
              >
                This is me!
              </div>
            }
            imageStyle={{
              border: "2.5px solid rgba(255,255,255,0.18)",
              borderRadius: "32px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RecruiterPage; 