import React from "react";

const AppleGlowName = () => (
  <div style={{
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "40vh",
    position: "relative",
    zIndex: 2,
    textAlign: "center",
  }}>
    <span
      style={{
        color: "#fff",
        fontWeight: 600,
        fontSize: "2rem",
        marginBottom: "1.5rem",
        letterSpacing: "0.02em",
        textAlign: "center"
      }}
    >
      Portfolio of
    </span>
    <h1
      style={{
        fontSize: "clamp(2.5rem, 8vw, 5rem)",
        fontWeight: 800,
        letterSpacing: "-0.01em",
        margin: 0,
        textAlign: "center",
        color: "#fff",
      }}
    >
      Reagan Hsu
    </h1>
  </div>
);

export default AppleGlowName; 