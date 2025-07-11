import React, { useState, useEffect, useRef } from "react";
import UniversalNavbar from "./UniversalNavbar";
import { useNavigate, useLocation } from "react-router-dom";
import { navItems, handleNavItemClick } from "./navConfig";
import "./AboutPage.css";
import aboutMePfp from "./images/aboutmepfp.webp";
import Eddie from "./images/Eddie.webp";
import HENRYYY from "./images/HENRYYY.webp";
import Oscar from "./images/Oscar.webp";

// Immediate preloading - starts as soon as this module is imported
const preloadImages = () => {
  const images = [aboutMePfp, Eddie, HENRYYY, Oscar];
  images.forEach(src => {
    const img = new Image();
    img.loading = 'eager';
    img.decoding = 'sync';
    if ('fetchPriority' in img) {
      (img as any).fetchPriority = 'high';
    }
    img.src = src;
  });
};

// Start preloading immediately
preloadImages();

const sections = [
  {
    id: 'hero',
    title: 'Hello, I\'m Reagan!',
    type: 'hero',
    content: {
      image: aboutMePfp,
      intro: "I'm a software engineer that aims to help the people who have gotten me to where I am today, and help others make their dreams a reality through web development and AIML research.",
      subtitle: "Six of Crows Enthusiast • Cookie Monster • Cat Lover"
    }
  },
  {
    id: 'about',
    title: 'About Me',
    type: 'text',
    content: "I'm passionate about artificial intelligence and machine learning, currently working as an AI/ML Researcher at Algoverse. I also lead front-end development at NetSerpent, a startup focused on innovative solutions. When I'm not coding or researching, you'll find me reading sci-fi novels, experimenting with new baking recipes, or playing with my three cats. I believe in creating technology that not only solves problems but also brings joy to people's lives."
  },
  {
    id: 'cats',
    title: 'My Cats!!!',
    type: 'gallery',
    content: {
      images: [
        { src: Eddie, alt: "Eddie", name: "Eddie" },
        { src: HENRYYY, alt: "Henry", name: "Henry" },
        { src: Oscar, alt: "Oscar", name: "Oscar" }
      ],
      description: "I would die for my cats I love them so much. "
    }
  },
  {
    id: 'hobbies',
    title: 'Hobbies',
    type: 'hobbies',
    content: {
      hobbies: [
        { icon: "📚", name: "Reading", description: "Sci-fi, fantasy, and technical books" },
        { icon: "🍰", name: "Baking", description: "Cakes, cookies, and experimental recipes" },
        { icon: "🎵", name: "Music", description: "Always listening while I work" },
        { icon: "🎬", name: "Video Creation", description: "Though I'm always behind on editing!" }
      ]
    }
  },
  {
    id: 'interests',
    title: 'Current Interests',
    type: 'text',
    content: "I'm currently diving deep into large language models, computer vision, and the intersection of AI with healthcare. I'm also exploring new front-end technologies and always looking for ways to make user experiences more intuitive and delightful. When I'm not working on tech, I'm probably planning my next baking adventure or trying to convince my cats to pose for photos."
  }
];

const AboutPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeNavItem, setActiveNavItem] = useState("about");
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set(['hero']));
  const [activeSection, setActiveSection] = useState<string>('hero');
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    // Additional preloading for component mount
    const imagesToPreload = [
      { src: aboutMePfp, priority: 'high' },
      { src: Eddie, priority: 'medium' },
      { src: HENRYYY, priority: 'medium' },
      { src: Oscar, priority: 'medium' }
    ];

    const imagePromises = imagesToPreload.map(({ src, priority }) => {
      return new Promise<void>((resolve, reject) => {
        const img = new window.Image();
        if ('fetchPriority' in img) {
          (img as any).fetchPriority = priority;
        }
        img.loading = 'eager';
        img.decoding = 'sync';
        img.onload = () => resolve();
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
        img.src = src;
      });
    });

    Promise.allSettled(imagePromises).then((results) => {
      const failed = results.filter(result => result.status === 'rejected');
      if (failed.length > 0) {
        console.warn('Some images failed to preload:', failed);
      }
    });
  }, []);

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
    }
  }, [location.pathname]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.getAttribute('data-section-id');
          if (sectionId) {
            if (entry.isIntersecting) {
              setVisibleSections(prev => new Set([...prev, sectionId]));
              setActiveSection(sectionId);
            }
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '-20% 0px -20% 0px'
      }
    );

    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const renderHeroSection = (section: any) => (
    <div className="hero-section">
      <div className="hero-image-container">
        <div className="hero-image-zoom-container">
          <img src={section.content.image} alt="Reagan" className="hero-image" />
        </div>
      </div>
      <div className="hero-content">
        <h1 className="hero-title">{section.title}</h1>
        <p className="hero-subtitle">{section.content.subtitle}</p>
        <p className="hero-intro">{section.content.intro}</p>
        
        {/* Social Media Icons */}
        <div className="social-icons">
          <a 
            href="https://www.youtube.com/@ReaganHsu123/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="YouTube"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
          <a 
            href="https://open.spotify.com/user/cf064y9uehxyl4bvc63krwlgi?si=bf9bb5d61c114cd6" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="Spotify"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
          </a>
          <a 
            href="https://www.instagram.com/reagan._.hsu" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="Instagram"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );

  const renderTextSection = (section: any) => (
    <div className="text-section">
      <p className="section-text">{section.content}</p>
    </div>
  );

  const renderGallerySection = (section: any) => (
    <div className="gallery-section">
      <p className="gallery-description">{section.content.description}</p>
      <div className="gallery-grid">
        {section.content.images.map((image: any, index: number) => (
          <div key={image.name} className="gallery-item">
            <img src={image.src} alt={image.alt} className="gallery-image" />
            <div className="gallery-caption">{image.name}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderHobbiesSection = (section: any) => (
    <div className="hobbies-section">
      <div className="hobbies-grid">
        {section.content.hobbies.map((hobby: any, index: number) => (
          <div key={hobby.name} className="hobby-item">
            <div className="hobby-icon">{hobby.icon}</div>
            <h3 className="hobby-name">{hobby.name}</h3>
            <p className="hobby-description">{hobby.description}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSection = (section: any) => {
    switch (section.type) {
      case 'hero':
        return renderHeroSection(section);
      case 'text':
        return renderTextSection(section);
      case 'gallery':
        return renderGallerySection(section);
      case 'hobbies':
        return renderHobbiesSection(section);
      default:
        return <div>Unknown section type</div>;
    }
  };

  return (
    <div className="about-root">
      <UniversalNavbar
        navItems={navItems}
        activeNavItem={activeNavItem}
        onItemClick={id => handleNavItemClick(id, navigate, setActiveNavItem)}
      />
      
      {/* Timeline */}
      <div className="timeline">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className={`timeline-marker ${activeSection === section.id ? 'active' : ''}`}
            style={{ top: `${(index / (sections.length - 1)) * 100}%` }}
          >
            <div className="timeline-label">{section.title}</div>
          </div>
        ))}
      </div>

      {/* Scroll Container */}
      <div className="about-scroll-container">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className={`about-section ${visibleSections.has(section.id) ? 'visible' : ''}`}
            ref={(el) => {
              sectionRefs.current[section.id] = el;
            }}
            data-section-id={section.id}
          >
            <div className="section-card-inner">
              {/* Only render section title if not hero */}
              {section.type !== 'hero' && (
                <h2 className="section-title">{section.title}</h2>
              )}
              {renderSection(section)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutPage; 