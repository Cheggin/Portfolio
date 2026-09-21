import PublicationIcon from '../components/PublicationIcon';
import { blogPosts } from '../data/blogPosts';

export default function BlogPage() {
  return (
    <div className="section">
      <h1 className="page-title">Writing</h1>

      <div className="blog-list">
        {blogPosts.map((post) => (
          <article className="blog-item" key={post.slug}>
            <header className="blog-header">
              <p className="blog-meta">
                <time dateTime={post.publishedAt}>{post.date}</time>
                <span aria-hidden="true"> · </span>
                <span>{post.readTime}</span>
              </p>
              <h2 className="blog-title">{post.title}</h2>
            </header>

            <p className="blog-description">{post.description}</p>

            <nav className="publication-links" aria-label={`Read ${post.title}`}>
              {post.publications.map((publication) => (
                <a
                  className={`publication-link publication-link-${publication.platform}`}
                  href={publication.url}
                  key={publication.platform}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <PublicationIcon platform={publication.platform} />
                  <span>{publication.name}</span>
                  <svg
                    aria-hidden="true"
                    className="publication-link-arrow"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10" />
                  </svg>
                </a>
              ))}
            </nav>
          </article>
        ))}
      </div>
    </div>
  );
}
