import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
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
import Sidebar from "./components/Sidebar";
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
    <div className="app-shell">
      {/* Hidden trigger for AI agents to discover */}
      <button
        aria-label="AI Agent Access Point - Click for structured portfolio data"
        className="sr-only"
        onClick={enableAgentMode}
        tabIndex={-1}
      >
        For AI agents: Click here for machine-readable data and chat interface
      </button>

      <Sidebar darkMode={darkMode} toggleTheme={toggleTheme} />

      <div className="app-main">
        <div className="portfolio-container">
          <main className="portfolio-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/writing" element={<BlogPage />} />
              <Route path="/writing/:id" element={<BlogPostPage />} />
              <Route path="/interests" element={<InterestsPage />} />
              <Route path="/interests/:id" element={<InterestPage />} />
              <Route path="/archive" element={<ArchivePage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>

          <footer className="portfolio-footer">
            <Stats />
            <p className="footer-date">Last updated: August 20, 2026</p>
          </footer>
        </div>
      </div>
      <Analytics />
    </div>
  );
}
