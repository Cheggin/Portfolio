import React, { useState } from "react";
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

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
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
          width: "100vw",
          height: "100vh",
          overflowY: "auto",
          scrollSnapType: "y mandatory",
        }}
      >
        {/* Section 1: Intro */}
        <section
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "row",
            scrollSnapAlign: "start",
            position: "relative",
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
              I am a hard working, communicative, and thorough developer that is always looking for new things to learn and new challenges to take on. My experience spans cancer, bioinformatics, and computational biology research, full stack engineering @ startups, and participating in award-winning hackathon projects. I thrive in fast-paced, collaborative environments and am eager to bring my skills to your team. <br /><br />
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
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "row",
            scrollSnapAlign: "start",
            position: "relative",
            background: "rgba(0,0,0,0.98)",
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
              My Experiences
            </h1>
            <ul style={{ fontSize: 20, color: "#e6e6f0", marginBottom: 40, textAlign: "left", width: "100%", fontFamily: "Roboto, system-ui, sans-serif", paddingLeft: 24 }}>
              <li>Full Stack Engineer @ Startup XYZ (2022-2023): Built scalable web apps with React, Node.js, and AWS.</li>
              <li>AI/ML Research Intern @ Cancer Research Lab (2021): Developed deep learning models for bioinformatics.</li>
              <li>Hackathon Winner @ Major League Hacking (2023): Led a team to create an award-winning education app.</li>
              <li>Freelance Developer (2020-2022): Delivered custom web solutions for small businesses and nonprofits.</li>
              <li>Teaching Assistant @ University (2019-2020): Helped students master algorithms and data structures.</li>
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