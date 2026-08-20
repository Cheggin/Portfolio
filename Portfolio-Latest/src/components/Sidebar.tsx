import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

// Long enough to read the message before the name comes back.
const WHALE_RESET_MS = 3000;

const navItems = [
  { to: "/", label: "home" },
  { to: "/projects", label: "projects" },
  { to: "/writing", label: "writing" },
  { to: "/interests", label: "interests" },
  { to: "/archive", label: "archive" },
  { to: "/contact", label: "contact" },
];

type SidebarProps = {
  darkMode: boolean;
  toggleTheme: () => void;
};

export default function Sidebar({ darkMode, toggleTheme }: SidebarProps) {
  const [open, setOpen] = useState(false);
  const [whaleShark, setWhaleShark] = useState(false);
  const navigate = useNavigate();
  const isHome = useLocation().pathname === "/";

  useEffect(() => {
    if (!whaleShark) return;
    const timer = setTimeout(() => setWhaleShark(false), WHALE_RESET_MS);
    return () => clearTimeout(timer);
  }, [whaleShark]);

  // On home the mark introduces itself; anywhere else it goes home.
  const showWhale = isHome && whaleShark;

  const onMarkClick = () => {
    setOpen(false);
    if (isHome) setWhaleShark(!whaleShark);
    else void navigate("/");
  };

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="mobile-bar">
        <NavLink to="/" className="mobile-bar-brand" onClick={() => setOpen(false)}>
          Reagan Hsu
        </NavLink>
        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="sidebar"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span>{open ? "Close" : "Menu"}</span>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
            {open ? (
              <>
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </>
            ) : (
              <>
                <line x1="3" y1="8" x2="21" y2="8" />
                <line x1="3" y1="16" x2="21" y2="16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && <div className="sidebar-backdrop" onClick={() => setOpen(false)} />}

      <aside id="sidebar" className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-top">
          <h1 className={`sidebar-brand ${showWhale ? "whale" : ""}`}>
            <button
              className="sidebar-mark-button"
              onClick={onMarkClick}
              aria-label={isHome ? "What is this?" : "Go home"}
            >
              <img src="/whale-mark.svg" alt="" className="sidebar-mark" />
            </button>
            <NavLink to="/" onClick={() => setOpen(false)}>
              {/* Keyed so React remounts the span and replays the swap animation. */}
              <span key={showWhale ? "whale" : "name"} className="brand-text">
                {showWhale ? "this is a whale shark :)" : "Reagan Hsu"}
              </span>
            </NavLink>
          </h1>

          <nav className="sidebar-nav">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="sidebar-footer">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {darkMode ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
