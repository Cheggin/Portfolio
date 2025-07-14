import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { navItems, handleNavItemClick } from "./navConfig";
import { MdEmail, MdWork, MdSchool, MdCode } from "react-icons/md";
import { FaLinkedin, FaGithub, FaCalendarAlt } from "react-icons/fa";
import "./RecruiterContactPage.css";

const RecruiterContactPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeNavItem, setActiveNavItem] = useState("contact");


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
    } else if (path === "/recruiter-contact") {
      setActiveNavItem("recruiter-contact");
    }
  }, [location.pathname]);



  const recruiterInfo = [
    {
      icon: <MdEmail />,
      label: "Email",
      value: "reaganhsu123@gmail.com",
      link: "mailto:reaganhsu123@gmail.com",
    },
    {
      icon: <FaCalendarAlt />,
      label: "Schedule a Call",
      value: "calendly.com/reaganhsu123/30min",
      link: "https://calendly.com/reaganhsu123/30min",
      description: "Book a 30-minute meeting"
    },
    {
      icon: <FaLinkedin />,
      label: "LinkedIn",
      value: "linkedin.com/in/reaganhsu",
      link: "https://linkedin.com/in/reaganhsu",
      description: "Professional profile"
    },
    {
      icon: <FaGithub />,
      label: "GitHub",
      value: "github.com/Cheggin",
      link: "https://github.com/Cheggin",
      description: "Code portfolio"
    }
  ];

  const availabilityInfo = [
    {
      icon: <MdWork />,
      title: "Internship Availability",
      details: "Summer 2026 (June - August)",
      status: "Available"
    },
    {
      icon: <MdSchool />,
      title: "Graduation",
      details: "Expected June 2026",
      status: "On Track"
    },
    {
      icon: <MdCode />,
      title: "Preferred Roles",
      details: "Software Engineering, AI/ML, Full Stack, Research & Development",
      status: "Open"
    }
  ];

  return (
    <div className="recruiter-contact-root">
      
      <div className="recruiter-contact-container">
        <div className="recruiter-contact-content">
          {/* Header Section */}
          <div className="recruiter-contact-header">
            <h1 className="recruiter-contact-title">Professional Contact</h1>
            <p className="recruiter-contact-subtitle">
              I'm actively seeking internship opportunities for Summer 2026. 
              I'm passionate about software engineering, AI/ML, and full-stack development.
            </p>
          </div>

          <div className="recruiter-contact-layout">
            {/* Contact Information */}
            <div className="recruiter-contact-info-section">
              <h2 className="section-title">Contact Information</h2>
              <div className="recruiter-contact-info-grid">
                {recruiterInfo.map((info, index) => (
                  <div key={index} className="recruiter-contact-info-item">
                    <div className="recruiter-contact-info-icon">
                      {info.icon}
                    </div>
                    <div className="recruiter-contact-info-content">
                      <div className="recruiter-contact-info-label">{info.label}</div>
                      {info.link ? (
                        <a 
                          href={info.link} 
                          className="recruiter-contact-info-value recruiter-contact-link"
                          target={info.link.startsWith('http') ? "_blank" : undefined}
                          rel={info.link.startsWith('http') ? "noopener noreferrer" : undefined}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <div className="recruiter-contact-info-value">{info.value}</div>
                      )}
                      <div className="recruiter-contact-info-description">{info.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability Section */}
            <div className="recruiter-availability-section">
              <h2 className="section-title">Availability & Preferences</h2>
              <div className="recruiter-availability-grid">
                {availabilityInfo.map((info, index) => (
                  <div key={index} className="recruiter-availability-item">
                    <div className="recruiter-availability-icon">
                      {info.icon}
                    </div>
                    <div className="recruiter-availability-content">
                      <div className="recruiter-availability-title">{info.title}</div>
                      <div className="recruiter-availability-details">{info.details}</div>
                      <div className="recruiter-availability-status">{info.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterContactPage; 