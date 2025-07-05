import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FluidCursor from "./FluidCursor";
import pfp from "./images/pfp.png";
import Henry from "./images/HENRYYY.png";
import TiltedCard from "./TiltedCard";
import UniversalNavbar from "./UniversalNavbar";
import LiquidGlassButton from "./LiquidGlassButton";
import "./RecruiterPage.css";

const RecruiterPage: React.FC = () => {
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

  const [activeNavItem, setActiveNavItem] = useState('home');
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Me' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];
  const navigate = useNavigate();

  return (
    <div className="recruiter-root">
      <UniversalNavbar
        navItems={navItems}
        activeNavItem={activeNavItem}
        onItemClick={setActiveNavItem}
      />
      <FluidCursor />
      <div className="recruiter-scroll-container">
        {/* Section 1: Intro */}
        <section className="recruiter-section">
          {/* Left half: content */}
          <div className="recruiter-left">
            <h1 className="recruiter-heading">Why You Should Hire Me</h1>
            <p className="recruiter-paragraph">
              I am a hard working, communicative, and thorough developer that is always looking for new things to learn and new challenges to take on. My experience spans LLM, cancer imaging, bioinformatics, and computational biology research, full stack engineering @ startups, and participating in award-winning hackathon projects. I thrive in fast-paced, collaborative environments and am eager to bring my skills to your team.
            </p>
            <h1 className="recruiter-heading">My Interests</h1>
            <p className="recruiter-paragraph">
              I am always interested in projects in the space of model resource efficiency and training speedup, sleek and fun web design, app development for social media, and website/app development in the space of education and medical care. My goal is to use my programming skills to create a platform that is dedicated towards propelling others and myself towards making waves of change in the world.
            </p>
          </div>
          {/* Right half: large TiltedCard with border, rounded corners, and persistent overlay caption */}
          <div className="recruiter-right">
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
                <div className="recruiter-overlay">This is me!</div>
              }
              imageStyle={{
                border: "2.5px solid rgba(255,255,255,0.18)",
                borderRadius: "32px",
              }}
            />
          </div>
          {/* Scroll prompt at bottom of first section */}
          <span className="recruiter-scroll-prompt">scroll :D</span>
        </section>
        {/* Section 2: Experiences */}
        <section className="recruiter-section">
          {/* Left half: experiences content */}
          <div className="recruiter-left">
            <h1 className="recruiter-heading">A Few of My Experiences</h1>
            <ul className="recruiter-list">
              <li><b>AI/ML Researcher</b> @ Algoverse (2025–Present)</li>
              <li><b>Front End Lead</b> @ NetSerpent (Startup) (2025–Present) </li>
              <li><b>Cancer Researcher</b> @ UCSD Ongkeko Lab (2024–Present)</li>
              <li><b>Projects Director</b> @ ACM UCSD (2025–Present):</li>
            </ul>
            <LiquidGlassButton
              size="large"
              className="recruiter-glass-btn"
              onClick={() => navigate('/resume')}
            >
              View my full resume here
            </LiquidGlassButton>
          </div>
          {/* Right half: large TiltedCard with border, rounded corners, and persistent overlay caption */}
          <div className="recruiter-right">
            <TiltedCard
              imageSrc={Henry}
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
                <div className="recruiter-overlay-lower">This is Henry!</div>
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