// Monochrome marks rendered as CSS masks, so they take the surrounding text
// color and work in both themes. Labels without a mark render as text only.
const techLogos: Record<string, string> = {
  "Anthropic Claude": "claude",
  Arduino: "arduino",
  "Browser Harness": "browseruse",
  "Browser Use": "browseruse",
  "Claude Code": "claude",
  Convex: "convex",
  Electron: "electron",
  FastAPI: "fastapi",
  "Framer Motion": "framer",
  GSAP: "gsap",
  "Hugging Face": "huggingface",
  "Intel Tiber": "intel",
  Java: "java",
  PostgreSQL: "postgresql",
  Python: "python",
  Ratatui: "ratatui",
  React: "react",
  "React Native": "react",
  Rust: "rust",
  Supabase: "supabase",
  "Tailwind CSS": "tailwindcss",
  "Three.js": "threedotjs",
  TypeScript: "typescript",
  Vite: "vite",
  pgvector: "postgresql",
  tmux: "tmux",
};

export default function TechList({ tech }: { tech: string }) {
  return (
    <p className="tech-list">
      {tech.split(", ").map((item) => {
        const logo = techLogos[item];
        return (
          <span key={item} className="tech-item">
            {logo && (
              <span
                className="tech-icon"
                style={{
                  maskImage: `url(/logos/${logo}.svg)`,
                  WebkitMaskImage: `url(/logos/${logo}.svg)`,
                }}
                aria-hidden="true"
              />
            )}
            {item}
          </span>
        );
      })}
    </p>
  );
}
