import React from 'react';
import './App.css';
import FluidCursor from './components/FluidCursor';

function App() {
  return (
    <div className="App">
      <FluidCursor />
      <div className="content">
        <header className="header">
          <h1>Welcome to My Portfolio</h1>
          <p>Move your mouse or touch to create beautiful fluid effects</p>
        </header>
        
        <main className="main">
          <section className="section">
            <h2>About Me</h2>
            <p>
              I'm a passionate developer who loves creating beautiful, interactive experiences. 
              This fluid cursor background demonstrates my interest in graphics programming and 
              real-time visual effects.
            </p>
          </section>
          
          <section className="section">
            <h2>Skills</h2>
            <div className="skills">
              <div className="skill">React</div>
              <div className="skill">TypeScript</div>
              <div className="skill">WebGL</div>
              <div className="skill">Three.js</div>
              <div className="skill">Node.js</div>
              <div className="skill">Python</div>
            </div>
          </section>
          
          <section className="section">
            <h2>Projects</h2>
            <div className="projects">
              <div className="project">
                <h3>Fluid Simulation</h3>
                <p>Real-time WebGL fluid dynamics with interactive cursor effects</p>
              </div>
              <div className="project">
                <h3>3D Graphics Engine</h3>
                <p>Custom 3D rendering engine built with WebGL</p>
              </div>
              <div className="project">
                <h3>Interactive Portfolio</h3>
                <p>Dynamic portfolio website with fluid animations</p>
              </div>
            </div>
          </section>
        </main>
        
        <footer className="footer">
          <p>© 2024 My Portfolio. Built with React, TypeScript, and WebGL.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
