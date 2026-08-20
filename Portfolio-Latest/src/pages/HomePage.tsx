export default function HomePage() {
  return (
    <div className="section">
      <h1 className="page-title">Introduction</h1>

      <p className="intro-text">
        Hey, I'm Reagan! I'm a software engineer.
      </p>

      <p className="body-text">
        I love working on products to make them seamless for users and making people's lives better via software.
      </p>

      <div className="highlight-section">
        <h2 className="section-heading">Work</h2>

        <div className="work-item">
          <p className="body-text">
            Member of Technical Staff at <span className="work-logo work-logo-datacurve" aria-hidden="true" /><a href="https://datacurve.ai/" target="_blank" rel="noopener noreferrer" className="text-link">Datacurve AI</a>
          </p>
          <p className="meta-text">Aug. 2026 - Present</p>
        </div>

        <div className="work-item">
          <p className="body-text">
            Founding Engineer at <span className="work-logo work-logo-browser-use" aria-hidden="true" /><a href="https://browser-use.com/" target="_blank" rel="noopener noreferrer" className="text-link">Browser Use (YC W25)</a>
          </p>
          <p className="meta-text">Sep. 2025 - Aug. 2026</p>
          <p className="body-text">
            Worked on Browser Use Cloud, Browser Use Desktop, and Browser Use Terminal.
          </p>
        </div>
      </div>

      <div className="link-section">
        <a href="https://github.com/Cheggin" target="_blank" rel="noopener noreferrer" className="text-link">
          github
        </a>
        <span className="link-separator">·</span>
        <a href="https://linkedin.com/in/reaganhsu" target="_blank" rel="noopener noreferrer" className="text-link">
          linkedin
        </a>
        <span className="link-separator">·</span>
        <a href="https://x.com/reagan_hsu" target="_blank" rel="noopener noreferrer" className="text-link">
          twitter
        </a>
        <span className="link-separator">·</span>
        <a href="mailto:reaganhsu123@gmail.com" className="text-link">
          email
        </a>
      </div>
    </div>
  );
}
