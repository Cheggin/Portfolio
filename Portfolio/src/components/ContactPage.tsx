import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { navItems, handleNavItemClick } from "./navConfig";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import "./ContactPage.css";

const ContactPage: React.FC = () => {
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



  const contactInfo = [
    {
      icon: <FaInstagram />,
      label: "Instagram",
      value: "@reagan._.hsu",
      link: "https://instagram.com/reagan._.hsu"
    },
    {
      icon: <MdEmail />,
      label: "Email",
      value: "reaganhsu123@gmail.com",
      link: "mailto:reaganhsu123@gmail.com"
    },
    {
      icon: <FaLinkedin />,
      label: "LinkedIn",
      value: "linkedin.com/in/reaganhsu",
      link: "https://linkedin.com/in/reaganhsu"
    },
    {
      icon: <FaGithub />,
      label: "GitHub",
      value: "github.com/Cheggin",
      link: "https://github.com/Cheggin"
    },
    {
      icon: <MdLocationOn />,
      label: "Location",
      value: "La Jolla, CA",
      link: null
    },
  ];

  return (
    <div className="contact-root">
      
      <div className="contact-container">
        <div className="contact-content">
          {/* Header Section */}
          <div className="contact-header">
            <h1 className="contact-title">Get in Touch</h1>
            <p className="contact-subtitle">
              I'm always open to new opportunities, collaborations, and interesting conversations. 
              Feel free to reach out!
            </p>
            <button 
              className="recruiter-link-button"
              onClick={() => navigate('/recruiter-contact')}
            >
              Wanna Hire Me? Click here (Please)
            </button>
          </div>

          <div className="contact-info-section">
            <h2 className="section-title">Contact Information</h2>
            <div className="contact-info-grid">
              {contactInfo.map((info, index) => (
                <div key={index} className="contact-info-item">
                  <div className="contact-info-icon">
                    {info.icon}
                  </div>
                  <div className="contact-info-content">
                    <div className="contact-info-label">{info.label}</div>
                    {info.link ? (
                      <a 
                        href={info.link} 
                        className="contact-info-value contact-link"
                        target={info.link.startsWith('http') ? "_blank" : undefined}
                        rel={info.link.startsWith('http') ? "noopener noreferrer" : undefined}
                      >
                        {info.value}
                      </a>
                    ) : (
                      <div className="contact-info-value">{info.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 