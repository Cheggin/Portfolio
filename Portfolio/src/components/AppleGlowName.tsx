import React from "react";
import { useEffect, useState } from "react";

const AppleGlowName = () => {
  const [showSubtitle, setShowSubtitle] = useState(false);
  useEffect(() => {
    setShowSubtitle(false);
    const timeout = setTimeout(() => setShowSubtitle(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div style={{
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "center",
      minHeight: "40vh",
      position: "relative",
      zIndex: 2,
      textAlign: "left",
      paddingBottom: "2em",
      overflow: "visible",
      marginLeft: "3vw",
    }}>
      <h1
        style={{
          fontSize: "clamp(2.5rem, 8vw, 7rem)",
          fontWeight: 900,
          letterSpacing: "-0.01em",
          margin: 0,
          marginBottom: "0.1em",
          textAlign: "left",
          background: "linear-gradient(90deg, #0a84ff 0%, #5e5ce6 30%, #bf5af2 55%, #ff375f 75%, #ff9f0a 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          color: "transparent",
          lineHeight: 1.1,
          fontFamily: "'Roboto', system-ui, Avenir, Helvetica, Arial, sans-serif",
          userSelect: "none",
        }}
      >
        Reagan Hsu
      </h1>
      <h2
        style={{
          display: "block",
          fontSize: "clamp(2rem, 4vw, 5rem)",
          fontWeight: 900,
          letterSpacing: "-0.01em",
          margin: 0,
          marginTop: "0.1em",
          opacity: showSubtitle ? 1 : 0,
          transform: showSubtitle ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1)",
          lineHeight: 1.1,
          fontFamily: "'Roboto', system-ui, Avenir, Helvetica, Arial, sans-serif",
          color: "#fff",
          userSelect: "none",
        }}
      >
        Portfolio
      </h2>
    </div>
  );
}

export default AppleGlowName; 