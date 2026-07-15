export default function HomePage() {
  return (
    <div className="section">
      <p className="intro-text">
        Hey, I'm Reagan! I'm a software engineer currently trying to build the future of web automations with browser agents.
      </p>

      <p className="body-text">
        I love working on products to make them seamless for users and making people's lives better via software.
      </p>

      <p className="body-text">
        My day-to-day work mostly spans frontend development and product engineering. However, I'm comfortable working around the stack!
      </p>

      <div className="highlight-section">
        <h2 className="section-heading">Current</h2>
        <p className="body-text">
          Growth Engineer at <a href = "https://browser-use.com/" target="_blank" rel="noopener noreferrer" className="text-link">Browser Use (YC W25)</a>, shipping daily and helping identify friction points for users.
        </p>
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
        <a href="mailto:reaganhsu123@gmail.com" className="text-link">
          email
        </a>
      </div>
    </div>
  );
}
