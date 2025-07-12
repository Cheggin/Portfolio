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
    color: '#18191a',
    content: {
      image: aboutMePfp,
      intro: "I'm a software engineer that aims to help the people who have gotten me to where I am today, and help others make their dreams a reality through web development and AIML research.",
      subtitle: "Six of Crows Enthusiast • Cookie Monster • Cat Lover",
      socialLinks: [
        {
          name: "YouTube",
          url: "https://www.youtube.com/@ReaganHsu123/",
          icon: "youtube"
        },
        {
          name: "Spotify",
          url: "https://open.spotify.com/user/cf064y9uehxyl4bvc63krwlgi?si=bf9bb5d61c114cd6",
          icon: "spotify"
        },
        {
          name: "Instagram",
          url: "https://www.instagram.com/reagan._.hsu",
          icon: "instagram"
        }
      ]
    }
  },
  {
    id: 'cats',
    title: 'My Cats!!!',
    type: 'gallery',
    color: '#232325',
    content: {
      description: "They come first in the list because I would die for my cats, I love them so much.",
      cats: [
        {
          name: "Eddie",
          image: Eddie,
          story: "We got Eddie when I was like 10 years old, and I love him so much and I would jump in front of a bus for him.",
          personality: "Absolutely massive and shy chonker"
        },
        {
          name: "Henry",
          image: HENRYYY,
          story: "Eddie's little brother. He is so extroverted and has lighter fur than Eddie. Would also jump in front of a bus for him.",
          personality: "Less chonky and extroverted but still fluffy asf"
        },
        {
          name: "Oscar",
          image: Oscar,
          story: "Oscar is literally the nicest and most chill cat ever. Unfortunately bro is in Ohio, so I haven't seen him in years. I would also jump in front of a bus for him, as you might expect. ",
          personality: "Becoming a chonker, and also extroverted"
        }
      ]
    }
  },
  {
    id: 'baking',
    title: 'Baking & Cooking',
    type: 'hobby',
    color: '#22201e',
    content: {
      description: "Ever since I started baking with my sisters in elementary school, I have always loved cooking and baking, and I would consider it one of my top love languages. Nobody can ever make a better chocolate chip cookie than me, and if you disagree, I'm afraid I can't be friends with you. ",
      photos: ["baking1.jpg", "baking2.jpg", "baking3.jpg"], // Placeholders
    }
  },
  {
    id: 'reading',
    title: 'Reading',
    type: 'hobby',
    color: '#1c2227',
    content: {
      description: "I am currently extremely behind on reading, but I am currently reading Crime and Punishment by Fyodor Dostoyevsky and I also really want to finish reading King of Scars and Rule of Wolves by Leigh Bardugo. It's criminal that I haven't finished the latter of the two.",
      genres: ["Sci-Fi", "Fantasy", "Technical", "Philosophy", "AI/ML"],
      photos: ["books1.jpg", "books2.jpg"], 
    }
  },
  {
    id: 'music',
    title: 'Music Taste',
    type: 'hobby',
    color: '#211e22',
    content: {
      description: "I had like 200,000 minutes on Spotify one year. I am always listening to music, and most of my taste is centered around Indie music and some EDM that I inherited from my sisters.",
      currentFavorites: ["Classical Piano", "Electronic", "Lo-Fi Beats"],
      photos: ["music1.jpg"], // Placeholder
    }
  },
  {
    id: 'video',
    title: 'Video Creation',
    type: 'hobby',
    color: '#232021',
    content: {
      description: "Though I'm always behind on editing, I love creating content and vlogging. I would consider my video hard drive one of, if not my most valuable possession.",
      photos: ["video1.jpg"], 
    }
  },
  {
    id: 'friends',
    title: 'Friends + Family',
    type: 'gallery',
    color: '#1b2320',
    content: {
      description: "These are the people who make me me. They're the reason I'm where I'm at today, and I appreciate and care for them more than anything.",
      photos: ["friends1.jpg", "family1.jpg"], 
    }
  }
];

const AboutPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeNavItem, setActiveNavItem] = useState("about");

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
          {section.content.socialLinks.map((link: any, index: number) => (
            <a 
              key={index}
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon"
              aria-label={link.name}
            >
              {link.icon === 'youtube' && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              )}
              {link.icon === 'spotify' && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
              )}
              {link.icon === 'instagram' && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );

  const renderGallerySection = (section: any) => (
    <div className="gallery-section">
      <p className="gallery-description">{section.content.description}</p>
      <div className="gallery-grid">
        {section.content.cats ? (
          section.content.cats.map((cat: any, index: number) => (
            <div key={cat.name} className="gallery-item">
              <img src={cat.image} alt={cat.name} className="gallery-image" />
              <div className="gallery-caption">
                <h3>{cat.name}</h3>
                <p>{cat.personality}</p>
                <p className="cat-story">{cat.story}</p>
              </div>
            </div>
          ))
        ) : section.content.photos ? (
          section.content.photos.map((photo: string, index: number) => (
            <div key={index} className="gallery-item">
              <div className="photo-placeholder">
                <div className="placeholder-text">{photo}</div>
              </div>
              <div className="gallery-caption">
                <h3>Photo {index + 1}</h3>
                <p>Placeholder for {photo}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="gallery-item">
            <div className="photo-placeholder">
              <div className="placeholder-text">No content available</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderHobbySection = (section: any) => (
    <div className="hobby-section">
      <div className="hobby-content">
        <h2 className="hobby-title">{section.title}</h2>
        <p className="hobby-description">{section.content.description}</p>
        
        {/* Skills/Tags */}
        {section.content.skills && section.content.skills.length > 0 && (
          <div className="hobby-skills">
            <h3>Skills & Interests</h3>
            <div className="skills-tags">
              {section.content.skills.map((skill: string, index: number) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        )}

        {/* Stories */}
        {section.content.stories && section.content.stories.length > 0 && (
          <div className="hobby-stories">
            <h3>Personal Stories</h3>
            <div className="stories-list">
              {section.content.stories.map((story: string, index: number) => (
                <p key={index} className="story-item">{story}</p>
              ))}
            </div>
          </div>
        )}

        {/* Photo Placeholders */}
        {section.content.photos && section.content.photos.length > 0 && (
          <div className="hobby-photos">
            <h3>Photos</h3>
            <div className="photo-grid">
              {section.content.photos.map((photo: string, index: number) => (
                <div key={index} className="photo-placeholder">
                  <div className="placeholder-text">{photo}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderSection = (section: any) => {
    switch (section.type) {
      case 'hero':
        return renderHeroSection(section);
      case 'gallery':
        return renderGallerySection(section);
      case 'hobby':
        return renderHobbySection(section);
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
      
      {/* Smooth Scroll Container */}
      <div className="about-scroll-container">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className="about-section"
            style={{ backgroundColor: section.color }}
          >
            <div className="section-content">
              {renderSection(section)}
            </div>
            {/* SVG Diagonal Separator */}
            {index < sections.length - 1 && (
              index % 2 === 0 ? (
                <svg
                  className="section-diagonal-separator"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                  style={{ display: 'block', width: '100%', height: '60px', position: 'absolute', bottom: 0, left: 0, zIndex: 2 }}
                >
                  {/* Diagonal fill: top right to bottom left */}
                  <polygon
                    points="0,10 100,0 100,10"
                    fill={sections[index + 1].color}
                  />
                  {/* White border only on the diagonal */}
                  <polyline
                    points="0,10 100,0"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
                  />
                </svg>
              ) : (
                <svg
                  className="section-diagonal-separator"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                  style={{ display: 'block', width: '100%', height: '60px', position: 'absolute', bottom: 0, left: 0, zIndex: 2 }}
                >
                  {/* Diagonal fill: top left to bottom right */}
                  <polygon
                    points="0,0 100,10 0,10"
                    fill={sections[index + 1].color}
                  />
                  {/* White border only on the diagonal */}
                  <polyline
                    points="0,0 100,10"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
                  />
                </svg>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutPage; 