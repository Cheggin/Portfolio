import React from 'react';
import { useNavigate } from 'react-router-dom';
import { projects } from './projectsData';
import ProjectCard from './ProjectCard';
import './ProjectsPage.css';

const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="projects-root">
      <div className="projects-scroll-container">
        <div className="projects-layout">
          <div className="projects-title-block">
            <h1 className="projects-title">Projects</h1>
            <div className="projects-subtitle">Below are some of my projects that I've worked on. I first started developing my own projects after participating in hackathons late 2024. </div>
          </div>
          <div style={{
            marginBottom: '18px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            border: '2px solid #fff',
            borderRadius: '18px',
            padding: '6px 18px 6px 12px',
            background: 'rgba(20,20,20,0.18)',
            width: 'fit-content',
          }}>
            <span className="hackathon-winner-label" style={{ position: 'static', width: 24, height: 24, fontSize: '1.1rem', minWidth: 24, minHeight: 24, border: '2px solid #fffbe6', background: 'rgba(255,215,0,0.92)', color: '#fffbe6', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }} aria-label="Hackathon Winner" role="img">{'\u{1F451}'}</span>
            <span style={{ color: '#fff', fontSize: '1rem', opacity: 0.85, lineHeight: 1.2 }}>
              = Hackathon Winner
            </span>
          </div>
          <div className="projects-grid">
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          {/* Navigation button to contact page */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 56 }}>
            <button
              className="nav-next-button"
              onClick={() => navigate('/contact')}
            >
              Want to Chat About a Project? Contact Me!
              <svg className="nav-next-arrow" width="30" height="30" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 11H15M15 11L11.5 7.5M15 11L11.5 14.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage; 