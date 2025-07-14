import React from 'react';
import { projects } from './projectsData';
import ProjectCard from './ProjectCard';
import './ProjectsPage.css';

const ProjectsPage: React.FC = () => {
  return (
    <div className="projects-root">
      <div className="projects-scroll-container">
        <div className="projects-layout">
          <h1 className="projects-title">Projects</h1>
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
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage; 