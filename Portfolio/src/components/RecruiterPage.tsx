import React, { useState, useEffect } from "react";
import FluidCursor from "./FluidCursor";
import pfp from "./images/pfp.png";
import TiltedCard from "./TiltedCard";
import UniversalNavbar from "./UniversalNavbar";

const RecruiterPage: React.FC = () => {
  // Navbar logic (local state)
  const [activeNavItem, setActiveNavItem] = useState('home');
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Me' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  // Prevent horizontal scrolling globally
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
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
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
          width: "100vw",
          height: "100vh",
          overflowY: "auto",
          overflowX: "hidden",
          scrollSnapType: "y mandatory",
          boxSizing: "border-box",
        }}
      >
        {/* Section 1: Intro */}
        <section
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "row",
            scrollSnapAlign: "start",
            position: "relative",
            boxSizing: "border-box",
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
              I am a hard working, communicative, and thorough developer that is always looking for new things to learn and new challenges to take on. My experience spans LLM, cancer imaging, bioinformatics, and computational biology research, full stack engineering @ startups, and participating in award-winning hackathon projects. I thrive in fast-paced, collaborative environments and am eager to bring my skills to your team. <br /><br />
              I am always interested in projects in the space of model resource efficiency and training speedup, sleek and fun web design, app development for social media, and website/app development in the space of education and medical care. My goal is to use my programming skills to create a platform that is dedicated towards propelling others and myself towards making waves of change in the world.
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
          {/* Scroll prompt at bottom of first section */}
          <span
            style={{
              position: "fixed",
              bottom: 32,
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "3.2rem",
              fontWeight: 900,
              color: "#fff",
              opacity: 0.12,
              letterSpacing: 1.5,
              zIndex: 3001,
              pointerEvents: "none",
              userSelect: "none",
              fontFamily: "Roboto, system-ui, sans-serif",
              whiteSpace: "nowrap",
            }}
          >
            scroll :D
          </span>
        </section>
        {/* Section 2: Experiences */}
        <section
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "row",
            scrollSnapAlign: "start",
            position: "relative",
            boxSizing: "border-box",
          }}
        >
          {/* Left half: experiences content */}
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
              A Few of My Experiences
            </h1>
            <ul style={{ fontSize: 20, color: "#e6e6f0", marginBottom: 40, textAlign: "left", width: "100%", fontFamily: "Roboto, system-ui, sans-serif", paddingLeft: 24 }}>
              <li><b>AI/ML Researcher</b> @ Algoverse (2025–Present): Developing LLM benchmarking techniques and testing tool-use reasoning via ToolLLM.</li>
              <li><b>Front End Lead</b> @ NetSerpent (Startup) (2025–Present): Led web and desktop app development with React Native Web, Expo, and Tauri; mentored junior devs and tracked KPIs with Linear.</li>
              <li><b>Cancer Researcher</b> @ UCSD Ongkeko Lab (2024–Present): Training multi-modality imaging deep learning models for HNSCC prognosis; automated patient-matching pipelines in Python.</li>
              <li><b>Projects Director</b> @ ACM UCSD (2025–Present): Managed Hack, Design, and AI project teams; produced tech tutorials and orchestrated student project showcases for companies.</li>
              <li><b>PillSnap</b> (Best use of Auth0 @ ACM DiamondHacks 2025): Cross-platform app for medication safety; fine-tuned Gemini model for pill ID; built Flask backend and integrated REST APIs.</li>
              <li><b>CiteTrace</b> (1st Place @ Intel x ACM SCU Hackathon 2025): Built a research visualization app; trained a RAG model for article expertise; created node clustering graph with d3-force.</li>
            </ul>
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
        </section>
      </div>
    </div>
  );
};

export default RecruiterPage; 