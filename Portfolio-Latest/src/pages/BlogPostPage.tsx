import { useParams, Link } from "react-router-dom";
import { blogPosts } from "../utils/loadBlogPosts";

export default function BlogPostPage() {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find((post) => post.id === id);

  if (!post) {
    return (
      <div className="section writing">
        <h1 className="page-title">Post not found</h1>
        <Link to="/writing" className="blog-link">
          ← Back to writing
        </Link>
      </div>
    );
  }

  const { Component, title, date, readTime } = post;

  return (
    <div className="section writing">
      <Link to="/writing" className="blog-link blog-back">
        ← Back to writing
      </Link>

      <article>
        <header className="blog-header">
          <h1 className="blog-post-title">{title}</h1>
          {(date || readTime) && (
            <p className="blog-meta">
              {[date, readTime].filter(Boolean).join(" · ")}
            </p>
          )}
        </header>

        <div className="blog-content">
          <Component />
        </div>
      </article>
    </div>
  );
}
