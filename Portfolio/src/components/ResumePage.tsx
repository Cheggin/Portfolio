import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { navItems, handleNavItemClick } from "./navConfig";
import { MdSchool, MdWork, MdCode, MdLeaderboard, MdEmail, MdLink, MdLocationOn, MdCalendarToday } from "react-icons/md";
import "./ResumePage.css";

const ResumePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeNavItem, setActiveNavItem] = useState("resume");
  const [activeSection, setActiveSection] = useState("education");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

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
    } else if (path === "/resume") {
      setActiveNavItem("resume");
    }
  }, [location.pathname]);

  // Scroll tracking effect
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;

      const container = scrollContainerRef.current;
      const scrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;

      // Find which section is currently in view
      const sections = Object.keys(sectionRefs.current);
      let currentSection = "education";

      sections.forEach((sectionId) => {
        const sectionElement = sectionRefs.current[sectionId];
        if (sectionElement) {
          const rect = sectionElement.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          const sectionTop = rect.top - containerRect.top;
          const sectionHeight = rect.height;

          // Check if section is in view (with some tolerance)
          if (sectionTop <= containerHeight * 0.3 && sectionTop + sectionHeight > containerHeight * 0.3) {
            currentSection = sectionId;
          }
        }
      });

      setActiveSection(currentSection);
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    const sectionElement = sectionRefs.current[sectionId];
    if (sectionElement && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const containerRect = container.getBoundingClientRect();
      const sectionRect = sectionElement.getBoundingClientRect();
      const scrollTop = container.scrollTop;
      const targetScrollTop = scrollTop + sectionRect.top - containerRect.top - 20;
      
      container.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth'
      });
    }
  };

  const educationData = [
    {
      id: "ucsd",
      degree: "B.S. in Computer Science",
      school: "University of California, San Diego",
      location: "La Jolla, CA",
      duration: "Expected Graduation: 06/26",
      gpa: "GPA: 4.00/4.00",
      coursework: "Data Structures and OO Design, Systems Programming, Data Science in Practice",
      highlights: [
        "Relevant coursework in DSA, AI/ML, Web Dev, and Systems Programming",
        "Provost Honors"
      ]
    }
  ];

  const experienceData = [
    {
      id: "algoverse",
      role: "AI/ML Researcher",
      company: "Algoverse",
      location: "La Jolla, CA",
      duration: "Mar. 2025 - Present",
      highlights: [
        "Improving GAIA framework for LLM benchmarking",
        "Letta stateful agent reasoning pipeline for stepwise task evaluation"
      ]
    },
    {
      id: "netserpent",
      role: "Front End Lead",
      company: "NetSerpent (Startup)",
      location: "La Jolla, CA",
      duration: "Mar. 2025 - Present",
      highlights: [
        "React Native Web with Expo and Tauri",
        "Mentoring junior developers",
        "Linear project management"
      ]
    },
    {
      id: "ucsd-lab",
      role: "Cancer Researcher",
      company: "UC San Diego Ongkeko Lab",
      location: "La Jolla, CA",
      duration: "Oct. 2024 - Present",
      highlights: [
        "Creating multi-modality imaging model for HNSCC diagnosis",
        "Analyzing population-level Alzheimer's risk factors"
      ]
    },
    {
      id: "lundquist",
      role: "Research Intern",
      company: "The Lundquist Institute",
      location: "Torrance, CA",
      duration: "Jun. 2022 - Sep. 2022",
      highlights: [
        "automated qRT-PCR data processing : 2 hour speedup for analysis",
        "NanoDrop, Western Blot, RNA Extraction, Dissection"
      ]
    },
    {
      id: "uci",
      role: "Research Intern",
      company: "UC Irvine Enciso Lab",
      location: "Irvine, CA",
      duration: "Jun. 2023 - Nov. 2023",
      highlights: [
        "Wrote MATLAB algorithm that analyzed Ferrell's Inequality",
        "Wrote research paper and poster in LaTeX",
        "Best Poster Presenter: PMBMC 2023"
      ]
    },
    {
      id: "jpmc",
      role: "Student Virtual Program Participant",
      company: "JP Morgan & Chase",
      location: "Fullerton, CA",
      duration: "May. 2022 - Jun. 2022",
      description: "Built a data-visualization dashboard that utilized JPMC's real-time stock-price feed",
      highlights: [
        "Built a data-visualization dashboard with real-time stock price feed",
        "Interfaced with JPMC tools"
      ]
    }
  ];

  const skillsData = {
    programming: ["Java", "Python", "Typescript", "Javascript", "C", "MATLAB"],
    frameworks: ["React Native", "TensorFlow", "SciKit Learn", "pandas", "Docker", "Flask", "Expo"],
    tools: ["Linear", "Git", "Vercel", "Render", "Supabase"]
  };

  const leadershipData = [
    {
      id: "acm-director",
      role: "Projects Director",
      organization: "Association for Computing Machinery",
      location: "La Jolla, CA",
      duration: "Jun. 2025 - Present",
      highlights: [
        "Manage Hack, Design, and AI project teams",
        "AI/Hack tutorial production",
        "Orchestrate student projects showcases for companies"
      ]
    },
    {
      id: "acm-mentor",
      role: "AI Project Team Co-Mentor",
      organization: "Association for Computing Machinery",
      location: "La Jolla, CA",
      duration: "Jan. 2025 - May 2025",
      highlights: [
        "Led a team of 6 programmers",
        "Predicted the winners of the NCAA men's volleyball season",
        "Presented at ACM Winter Projects Showcase 2025"
      ]
    }
  ];

  const sections = [
    { id: "education", label: "Education", icon: MdSchool },
    { id: "experience", label: "Experience", icon: MdWork },
    { id: "skills", label: "Skills", icon: MdCode },
    { id: "leadership", label: "Leadership", icon: MdLeaderboard }
  ];

  return (
    <div className="resume-root">
      
      <div className="resume-layout">
        {/* Left Sidebar - Section Labels */}
        <div className="resume-sidebar">
          <div className="sidebar-content">
            {sections.map((section) => {
              const IconComponent = section.icon;
              return (
                <button
                  key={section.id}
                  className={`sidebar-item ${activeSection === section.id ? 'active' : ''}`}
                  onClick={() => scrollToSection(section.id)}
                >
                  <IconComponent className="sidebar-icon" />
                  <span className="sidebar-label">{section.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Content Area */}
        <div className="resume-content">
          <div className="resume-scroll-container" ref={scrollContainerRef}>
            {/* Education Section */}
            <section 
              className="resume-section first-section-padding"
              ref={(el) => { sectionRefs.current["education"] = el; }}
            >
              <div className="section-card-inner">
                <h2 className="section-title">Education</h2>
                <div className="cards-grid">
                  {educationData.map((edu) => (
                    <div key={edu.id} className="resume-card education-card">
                      <div className="card-content">
                        <div className="card-header card-header-flex">
                          <div>
                            <h3 className="card-title">{edu.degree}</h3>
                            <div className="card-company">{edu.school}</div>
                            <div className="card-pills-row">
                              <div className="card-gpa-pill">{edu.gpa}</div>
                              <div className="card-gpa-pill">{edu.duration}</div>
                            </div>
                          </div>
                          {edu.duration.includes('Present') || edu.duration.includes('Expected') ? (
                            <div className="card-badge">Active</div>
                          ) : null}
                        </div>
                        <div className="card-highlights">
                          {edu.highlights.map((highlight, index) => (
                            <div key={index} className="highlight-item">
                              <span className="highlight-dot">•</span>
                              {highlight}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            <hr className="section-separator" />
            {/* Experience Section */}
            <section 
              className="resume-section"
              ref={(el) => { sectionRefs.current["experience"] = el; }}
            >
              <div className="section-card-inner">
                <h2 className="section-title">Relevant Experience</h2>
                <div className="cards-grid">
                  {experienceData.map((exp) => (
                    <div key={exp.id} className="resume-card experience-card">
                      <div className="card-content">
                        <div className="card-header card-header-flex">
                          <div>
                            <h3 className="card-title">{exp.role}</h3>
                            <div className="card-company">{exp.company}</div>
                            <div className="card-pills-row">
                              <div className="card-gpa-pill">{exp.duration}</div>
                            </div>
                          </div>
                          {exp.duration.includes('Present') ? (
                            <div className="card-badge">Active</div>
                          ) : null}
                        </div>
                        <div className="card-highlights">
                          {exp.highlights.map((highlight, index) => (
                            <div key={index} className="highlight-item">
                              <span className="highlight-dot">•</span>
                              {highlight}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            <hr className="section-separator" />
            {/* Skills Section */}
            <section 
              className="resume-section"
              ref={(el) => { sectionRefs.current["skills"] = el; }}
            >
              <div className="section-card-inner">
                <h2 className="section-title">Technical Skills</h2>
                <div className="skills-grid">
                  <div className="skills-category">
                    <h3>Programming Languages</h3>
                    <div className="skills-list">
                      {skillsData.programming.map((skill, index) => (
                        <span key={index} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <div className="skills-category">
                    <h3>Libraries & Frameworks</h3>
                    <div className="skills-list">
                      {skillsData.frameworks.map((skill, index) => (
                        <span key={index} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <div className="skills-category">
                    <h3>Tools & Platforms</h3>
                    <div className="skills-list">
                      {skillsData.tools.map((skill, index) => (
                        <span key={index} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <hr className="section-separator" />
            {/* Leadership Section */}
            <section 
              className="resume-section"
              ref={(el) => { sectionRefs.current["leadership"] = el; }}
            >
              <div className="section-card-inner">
                <h2 className="section-title">Leadership & Activities</h2>
                <div className="cards-grid">
                  {leadershipData.map((role) => (
                    <div key={role.id} className="resume-card leadership-card">
                      <div className="card-content">
                        <div className="card-header card-header-flex">
                          <div>
                            <h3 className="card-title">{role.role}</h3>
                            <div className="card-company">{role.organization}</div>
                            <div className="card-pills-row">
                              <div className="card-gpa-pill">{role.duration}</div>
                            </div>
                          </div>
                          {role.duration.includes('Present') ? (
                            <div className="card-badge">Active</div>
                          ) : null}
                        </div>
                        <div className="card-highlights">
                          {role.highlights.map((highlight, index) => (
                            <div key={index} className="highlight-item">
                              <span className="highlight-dot">•</span>
                              {highlight}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            {/* Navigation button to contact page */}
            <div style={{ display: 'flex', justifyContent: 'center', margin: '56px 0 32px 0' }}>
              <button
                className="nav-next-button"
                onClick={() => navigate('/contact')}
              >
                Want to Connect? Contact Me!
                <svg className="nav-next-arrow" width="30" height="30" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 11H15M15 11L11.5 7.5M15 11L11.5 14.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePage; 