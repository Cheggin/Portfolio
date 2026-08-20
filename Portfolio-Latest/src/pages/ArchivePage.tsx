import TechList from "../components/TechList";

export default function ArchivePage() {
  const portfolios = [
    {
      version: "V1",
      name: "Liquid Glass Portfolio",
      date: "2024",
      description: "Interactive portfolio with fluid cursor effects, glassmorphism UI, and advanced animations using React, Three.js, and WebGL.",
      tech: "React, TypeScript, Three.js, GSAP, Framer Motion, Supabase",
      link: "/v1/"
    }
  ];

  return (
    <div className="section">
      <h1 className="page-title">Archive</h1>

      <p className="body-text">
        A collection of previous portfolio iterations. Thought it would be fun to see as I continue developing. 
      </p>

      <div className="projects-list">
        {portfolios.map((portfolio, index) => (
          <div key={index} className="project-item">
            <h3 className="project-name">
              <a href={portfolio.link} target="_blank" rel="noopener noreferrer">
                {portfolio.name}
              </a>
            </h3>
            <p className="meta-text">{portfolio.version} · {portfolio.date}</p>
            <p className="body-text">{portfolio.description}</p>
            <TechList tech={portfolio.tech} />
          </div>
        ))}
      </div>
    </div>
  );
}
