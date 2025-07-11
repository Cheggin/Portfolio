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
      intro: "I'm an AI/ML researcher, front-end developer, and chronic cat lover. I love reading, baking, and creating things that make people smile.",
      subtitle: "AI Researcher • Developer • Cat Enthusiast"
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
    title: 'Meet My Cats',
    type: 'gallery',
    content: {
      images: [
        { src: Eddie, alt: "Eddie", name: "Eddie" },
        { src: HENRYYY, alt: "Henry", name: "Henry" },
        { src: Oscar, alt: "Oscar", name: "Oscar" }
      ],
      description: "My three furry companions who keep me company during late-night coding sessions."
    }
  },
  {
    id: 'hobbies',
    title: 'What I Love',
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