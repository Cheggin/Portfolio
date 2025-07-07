import React, { useState, useEffect } from "react";
import FluidCursor from "./FluidCursor";
import UniversalNavbar from "./UniversalNavbar";
import { useNavigate, useLocation } from "react-router-dom";
import { navItems, handleNavItemClick } from "./navConfig";
import "./ResumePage.css";
import Henry from "./images/HENRYYY.png";
import Eddie from "./images/Eddie.jpeg";
import Oscar from "./images/Oscar.jpeg";

const ResumePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeNavItem, setActiveNavItem] = useState("resume");

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

  useEffect(() => {
    const originalHtmlOverflowX = document.documentElement.style.overflowX;
    const originalBodyOverflowX = document.body.style.overflowX;
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';
    return () => {
      document.documentElement.style.overflowX = originalHtmlOverflowX;
      document.body.style.overflowX = originalBodyOverflowX;
    };
  }, []);

  return (
    <div className="resume-root">
      <UniversalNavbar
        navItems={navItems}
        activeNavItem={activeNavItem}
        onItemClick={id => handleNavItemClick(id, navigate, setActiveNavItem)}
      />
      <FluidCursor />
      <div className="resume-center-row">
        <div className="resume-card">
          <h1 className="resume-title">Reagan Hsu</h1>
          {/* Header */}
          <div className="resume-header">
            <p className="resume-header-contact">reaganhsu123@gmail.com • (714) 686-8809 • LinkedIn • Github</p>
          </div>
          {/* Education */}
          <div className="resume-section">
            <h3 className="resume-section-title">EDUCATION</h3>
            <div className="resume-section-inner">
              <div className="resume-row">
                <span className="resume-role">University of California, San Diego</span>
                <span className="resume-location">La Jolla, CA</span>
              </div>
              <div className="resume-detail">B.S. in Computer Science | GPA: 4.00/4.00</div>
              <div className="resume-detail">EXPECTED GRADUATION: 06/26</div>
              <div className="resume-detail">Relevant Coursework: Data Structures and OO Design, Systems Programming, Data Science in Practice</div>
            </div>
          </div>
          {/* Technical Skills */}
          <div className="resume-section">
            <h3 className="resume-section-title">TECHNICAL SKILLS</h3>
            <div className="resume-detail"><b>Programming Languages:</b> Java, Python, Typescript, Javascript, C, MATLAB</div>
            <div className="resume-detail"><b>Libraries/Frameworks:</b> React Native, TensorFlow, SciKit Learn, pandas, Docker, Flask, Expo</div>
          </div>
          {/* Relevant Experience */}
          <div className="resume-section">
            <h3 className="resume-section-title">RELEVANT EXPERIENCE</h3>
            <div className="resume-section-inner">
              <div className="resume-row">
                <span className="resume-role">AI/ML Researcher</span>
                <span className="resume-date">Mar. 2025 - Present</span>
              </div>
              <div className="resume-detail">Algoverse | La Jolla, CA</div>
              <ul className="resume-list">
                <li>Developing LLM benchmarking techniques based on the GAIA framework with stepwise evaluations</li>
                <li>Test tool-use reasoning via ToolLLM</li>
              </ul>
            </div>
            <div className="resume-section-inner">
              <div className="resume-row">
                <span className="resume-role">Front End Lead</span>
                <span className="resume-date">Mar. 2025 - Present</span>
              </div>
              <div className="resume-detail">NetSerpent (Startup) | La Jolla, CA</div>
              <ul className="resume-list">
                <li>Lead front-end web and desktop app development using React Native Web with Expo and Tauri</li>
                <li>Mentor junior devs and use Linear to track code-quality KPIs and feature delivery timelines</li>
              </ul>
            </div>
            <div className="resume-section-inner">
              <div className="resume-row">
                <span className="resume-role">Cancer Researcher</span>
                <span className="resume-date">Oct. 2024 - Present</span>
              </div>
              <div className="resume-detail">UC San Diego Ongkeko Lab | La Jolla, CA</div>
              <ul className="resume-list">
                <li>Training a multi-modality imaging deep learning model for HNSCC prognosis using Python Tensorflow</li>
                <li>Developed an automated data processing pipeline in Python for patient-matching using SciKit Learn</li>
              </ul>
            </div>
            <div className="resume-section-inner">
              <div className="resume-row">
                <span className="resume-role">Research Intern</span>
                <span className="resume-date">Jun. 2022 - Sep. 2022</span>
              </div>
              <div className="resume-detail">The Lundquist Institute | Torrance, CA</div>
              <ul className="resume-list">
                <li>Developed automated data processing pipelines in Python for qRT-PCR output using pandas and Smirnov-Grubbs libraries</li>
                <li>Performed dissection, RNA extraction, RT-PCR, NanoDrop, and Western Blot</li>
              </ul>
            </div>
            <div className="resume-section-inner">
              <div className="resume-row">
                <span className="resume-role">Research Intern</span>
                <span className="resume-date">Jun. 2023 - Nov. 2023</span>
              </div>
              <div className="resume-detail">UC Irvine Enciso Lab | Irvine, CA</div>
              <ul className="resume-list">
                <li>Wrote MATLAB algorithm that analyzed Ferrell's Inequality; Best Poster Presenter: PMBMC 2023</li>
              </ul>
            </div>
            <div className="resume-section-inner">
              <div className="resume-row">
                <span className="resume-role">Student Virtual Program Participant</span>
                <span className="resume-date">May. 2022- Jun. 2022</span>
              </div>
              <div className="resume-detail">JP Morgan & Chase | Fullerton, CA</div>
              <ul className="resume-list">
                <li>Built a data-visualization dashboard that utilized JPMC's real-time stock-price feed</li>
              </ul>
            </div>
          </div>
          {/* Leadership and Activities */}
          <div className="resume-section">
            <h3 className="resume-section-title">LEADERSHIP AND ACTIVITIES</h3>
            <div className="resume-section-inner">
              <div className="resume-row">
                <span className="resume-role">Projects Director</span>
                <span className="resume-date">Jun. 2025 - Present</span>
              </div>
              <div className="resume-detail">Association for Computing Machinery | La Jolla, CA</div>
              <ul className="resume-list">
                <li>Manage Hack, Design, and AI project teams, produce tech tutorials, and orchestrate showcases of student projects for companies</li>
              </ul>
            </div>
            <div className="resume-section-inner">
              <div className="resume-row">
                <span className="resume-role">AI Project Team Co-Mentor</span>
                <span className="resume-date">Jan. 2025 - May 2025</span>
              </div>
              <div className="resume-detail">Association for Computing Machinery | La Jolla, CA</div>
              <ul className="resume-list">
                <li>Led a team of 6 programmers in predicting the winners of the NCAA men's volleyball season</li>
              </ul>
            </div>
          </div>
          {/* Polaroid Cat Photos */}
          <div className="polaroid-cats-row">
            <div className="polaroid-cat polaroid-rotate-left">
              <img src={Henry} alt="Henry the cat" className="polaroid-cat-img" />
              <div className="polaroid-caption">Henry: The Fluffy King</div>
            </div>
            <div className="polaroid-cat polaroid-rotate-center">
              <img src={Oscar} alt="Oscar the cat" className="polaroid-cat-img" />
              <div className="polaroid-caption">Oscar: The Mischief Maker</div>
            </div>
            <div className="polaroid-cat polaroid-rotate-right">
              <img src={Eddie} alt="Eddie the cat" className="polaroid-cat-img" />
              <div className="polaroid-caption">Eddie: The Sleepy Prince</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePage; 