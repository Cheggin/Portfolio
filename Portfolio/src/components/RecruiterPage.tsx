import React from "react";
import FluidCursor from "./FluidCursor";

const RecruiterPage: React.FC = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        position: "relative",
        overflow: "hidden",
      }}
    >
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
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
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
            }}
          >
            Why You Should Hire Me
          </h1>
          <p style={{ fontSize: 20, color: "#e6e6f0", marginBottom: 40, textAlign: "left", width: "100%" }}>
            I am a passionate, results-driven developer with a proven track record in AI/ML, full-stack development, and leadership. My experience spans research, startups, and award-winning hackathons. I thrive in fast-paced, collaborative environments and am eager to bring my skills to your team.
          </p>
        </div>
        {/* Right half: empty or subtle effect */}
        <div
          style={{
            width: "50vw",
            minHeight: "100vh",
            background: "transparent",
          }}
        />
      </div>
    </div>
  );
};

export default RecruiterPage; 