import { projects } from "../data/portfolioData";
import TechList from "../components/TechList";
import StarCount from "../components/StarCount";
import { useGithubStars } from "../hooks/useGithubStars";

export default function ProjectsPage() {
  const stars = useGithubStars(projects.flatMap((project) => (project.repo ? [project.repo] : [])));

  return (
    <div className="section">
      <h1 className="page-title">Projects</h1>

      <div className="projects-list">
        {projects.map((project) => {
          const starCount = project.repo === undefined ? undefined : stars[project.repo];
          const meta = [project.award, project.date].filter(Boolean).join(" · ");

          return (
          <div key={project.name} className="project-item">
            <h3 className="project-name">
              {project.link ? (
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  {project.name}
                </a>
              ) : (
                project.name
              )}
              {starCount !== undefined && <StarCount count={starCount} />}
            </h3>
            {meta && <p className="meta-text">{meta}</p>}
            <p className="body-text">{project.description}</p>
            <TechList tech={project.tech} />
          </div>
          );
        })}
      </div>
    </div>
  );
}
