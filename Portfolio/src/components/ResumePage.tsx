import React, { useState, useEffect, useRef } from "react";
import UniversalNavbar from "./UniversalNavbar";
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
        "Perfect GPA maintained throughout program",
        "Relevant coursework in data structures and systems programming",
        "Active in ACM and research projects"
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
      description: "Developing LLM benchmarking techniques based on the GAIA framework with stepwise evaluations. Test tool-use reasoning via ToolLLM.",
      highlights: [
        "LLM benchmarking with GAIA framework",
        "Tool-use reasoning evaluation",
        "Stepwise evaluation techniques"
      ]
    },
    {
      id: "netserpent",
      role: "Front End Lead",
      company: "NetSerpent (Startup)",
      location: "La Jolla, CA",
      duration: "Mar. 2025 - Present",
      description: "Lead front-end web and desktop app development using React Native Web with Expo and Tauri. Mentor junior devs and use Linear to track code-quality KPIs and feature delivery timelines.",
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
      description: "Training a multi-modality imaging deep learning model for HNSCC prognosis using Python Tensorflow. Developed an automated data processing pipeline in Python for patient-matching using SciKit Learn.",
      highlights: [
        "Multi-modality imaging deep learning",
        "HNSCC prognosis modeling",
        "Automated data processing pipeline"
      ]
    },
    {
      id: "lundquist",
      role: "Research Intern",
      company: "The Lundquist Institute",
      location: "Torrance, CA",
      duration: "Jun. 2022 - Sep. 2022",
      description: "Developed automated data processing pipelines in Python for qRT-PCR output using pandas and Smirnov-Grubbs libraries. Performed dissection, RNA extraction, RT-PCR, NanoDrop, and Western Blot.",
      highlights: [
        "Automated data processing pipelines",
        "qRT-PCR output analysis",
        "Laboratory techniques and procedures"
      ]
    },
    {
      id: "uci",
      role: "Research Intern",
      company: "UC Irvine Enciso Lab",
      location: "Irvine, CA",
      duration: "Jun. 2023 - Nov. 2023",
      description: "Wrote MATLAB algorithm that analyzed Ferrell's Inequality; Best Poster Presenter: PMBMC 2023",
      highlights: [
        "MATLAB algorithm development",
        "Ferrell's Inequality analysis",
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
        "Data visualization dashboard",
        "Real-time stock price feed",
        "Financial technology exposure"
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
      description: "Manage Hack, Design, and AI project teams, produce tech tutorials, and orchestrate showcases of student projects for companies.",
      highlights: [
        "Managing multiple project teams",
        "Tech tutorial production",
        "Student project showcases"
      ]
    },
    {
      id: "acm-mentor",
      role: "AI Project Team Co-Mentor",
      organization: "Association for Computing Machinery",
      location: "La Jolla, CA",
      duration: "Jan. 2025 - May 2025",
      description: "Led a team of 6 programmers in predicting the winners of the NCAA men's volleyball season.",
      highlights: [
        "Team leadership of 6 programmers",
        "Sports prediction modeling",
        "NCAA volleyball analysis"
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
      <UniversalNavbar
        navItems={navItems}
        activeNavItem={activeNavItem}
        onItemClick={id => handleNavItemClick(id, navigate, setActiveNavItem)}
      />
      
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
              className="resume-section"
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
                            <div className="card-duration-pill">{edu.duration}</div>
                          </div>
                          {edu.duration.includes('Present') || edu.duration.includes('Expected') ? (
                            <div className="card-badge">Active</div>
                          ) : null}
                        </div>
                        <div className="card-gpa">{edu.gpa}</div>
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
                            <div className="card-duration-pill">{exp.duration}</div>
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
                            <div className="card-duration-pill">{role.duration}</div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePage; 