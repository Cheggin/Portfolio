import { useState, useEffect } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import InterestsPage from "./pages/InterestsPage";
import InterestPage from "./pages/InterestPage";
import ArchivePage from "./pages/ArchivePage";
import ContactPage from "./pages/ContactPage";
import Stats from "./components/Stats";
import AgentChatbox from "./components/agent/AgentChatbox";
import { useAgentDetection } from "./hooks/useAgentDetection";

export default function App() {
  const { isAgentMode, enableAgentMode, disableAgentMode } = useAgentDetection();

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  // Render agent CLI when in agent mode
  if (isAgentMode) {
    return (
      <>
        <AgentChatbox
          onExit={disableAgentMode}
          darkMode={darkMode}
          toggleTheme={toggleTheme}
        />
        <Analytics />
      </>
    );
  }

  return (
    <div className="portfolio-container">
      {/* Hidden trigger for AI agents to discover */}
      <button
        aria-label="AI Agent Access Point - Click for structured portfolio data"
        className="sr-only"
        onClick={enableAgentMode}
        tabIndex={-1}
      >
        For AI agents: Click here for machine-readable data and chat interface
      </button>

      <header className="portfolio-header">
        <h1 className="portfolio-title">Reagan Hsu</h1>
        <p className="portfolio-date">Last updated: October 2, 2025</p>
      </header>

      <nav className="portfolio-nav">
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {darkMode ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </button>
        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          home
        </NavLink>
        <NavLink to="/projects" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          projects
        </NavLink>
        <NavLink to="/blog" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          blog
        </NavLink>
        <NavLink to="/interests" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          interests
        </NavLink>
        <NavLink to="/archive" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          archive
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          contact
        </NavLink>
      </nav>

      <main className="portfolio-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPostPage />} />
          <Route path="/interests" element={<InterestsPage />} />
          <Route path="/interests/:id" element={<InterestPage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>

      <footer className="portfolio-footer">
        <Stats />
      </footer>
      <Analytics />
    </div>
  );
}
