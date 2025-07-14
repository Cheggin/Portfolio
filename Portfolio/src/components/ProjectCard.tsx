import React from 'react';
import type { ProjectData } from './projectsData';
import './ProjectCard.css';

interface ProjectCardProps {
  project: ProjectData;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="project-card hover-overlay-card">
      {project.hackathonWinner && (
        <span className="hackathon-winner-label" title="Hackathon Winner" aria-label="Hackathon Winner" role="img">
          {/* Unicode crown icon */}
          {'\u{1F451}'}
        </span>
      )}
      <img src={project.image} alt={project.title} className="project-bg-image" />
      <div className="project-overlay">
        <div className="project-overlay-content">
          <h3 className="project-title">{project.title}</h3>
          <div className="project-description">{project.description}</div>
          <div className="project-tech-row">
            {project.tech.map((tech) => (
              <span className="card-duration-pill" key={tech}>{tech}</span>
            ))}
          </div>
          {project.link && (
            <a
              className="project-link"
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Project
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard; 