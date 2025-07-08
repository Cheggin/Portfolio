import React, { useState, useEffect, useRef } from "react";
import Hyperspeed from "./HyperSpeed";
import UniversalNavbar from "./UniversalNavbar";
import { useNavigate, useLocation } from "react-router-dom";
import { navItems, handleNavItemClick } from "./navConfig";
import "./AboutPage.css";

const aboutCards = [
  '👋 Welcome to my interactive resume! Click & Hold to continue.',
  '🏆 Here are some of my achievements...',
  '💡 My passions and interests...',
  '📫 Contact me for collaboration!'
];

const AboutPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeNavItem, setActiveNavItem] = useState("about");
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const holdStartRef = useRef<number | null>(null);

  useEffect(() => {
    const path = location.pathname;
    if (path === "/") {
      setActiveNavItem("home");
    } else if (path === "/about") {
      setActiveNavItem("about");
    } else if (path === "/projects") {
      setActiveNavItem("projects");
    } else if (path === "/contact") {
      setActiveNavItem("contact");
    }
  }, [location.pathname]);

  // Advance card while holding
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isHolding) {
      interval = setInterval(() => {
        setCardIndex(idx => (idx + 1) % aboutCards.length);
      }, 1200); // Advance every 1.2s while holding
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isHolding]);

  // Mouse/touch handlers
  const handleHoldStart = () => setIsHolding(true);
  const handleHoldEnd = () => setIsHolding(false);

  const exampleInfoCards = [
    { position: 50 },
    { position: 150 },
    { position: 250 },
    { position: 350 },
  ];

  return (
    <div className="about-page-container">
      <UniversalNavbar
        navItems={navItems}
        activeNavItem={activeNavItem}
        onItemClick={id => handleNavItemClick(id, navigate, setActiveNavItem)}
      />
      <div className="about-content">
        <h1 className="about-title">Click &amp; Hold!</h1>
        {/* Add any about text or content here if needed */}
      </div>
      <div
        className="hyperspeed-bottom-container"
        onMouseDown={handleHoldStart}
        onMouseUp={handleHoldEnd}
        onMouseLeave={handleHoldEnd}
        onTouchStart={handleHoldStart}
        onTouchEnd={handleHoldEnd}
      >
        <Hyperspeed
          effectOptions={{
            distortion: "turbulentDistortion",
            length: 400,
            roadWidth: 10,
            islandWidth: 2,
            lanesPerRoad: 4,
            fov: 90,
            fovSpeedUp: 150,
            speedUp: 2,
            carLightsFade: 0.4,
            totalSideLightSticks: 20,
            lightPairsPerRoadWay: 40,
            shoulderLinesWidthPercentage: 0.05,
            brokenLinesWidthPercentage: 0.1,
            brokenLinesLengthPercentage: 0.5,
            lightStickWidth: [0.12, 0.5],
            lightStickHeight: [1.3, 1.7],
            movingAwaySpeed: [60, 80],
            movingCloserSpeed: [-120, -160],
            carLightsLength: [400 * 0.03, 400 * 0.2],
            carLightsRadius: [0.05, 0.14],
            carWidthPercentage: [0.3, 0.5],
            carShiftX: [-0.8, 0.8],
            carFloorSeparation: [0, 5],
            colors: {
              roadColor: 0x080808,
              islandColor: 0x0a0a0a,
              background: 0x000000,
              shoulderLines: 0xffffff,
              brokenLines: 0xffffff,
              leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
              rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
              sticks: 0x03b3c3,
            },
          }}
          onProgressChange={setProgress}
        />
        <div className="about-overlay-card">{aboutCards[cardIndex]}</div>
      </div>
    </div>
  );
};

export default AboutPage; 