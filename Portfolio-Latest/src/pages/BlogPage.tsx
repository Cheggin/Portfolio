import { Link } from "react-router-dom";
import { blogPosts } from "../utils/loadBlogPosts";

export default function BlogPage() {
  return (
    <div className="section writing">
      <h1 className="page-title">Writing</h1>

      {blogPosts.length === 0 ? (
        <p className="body-text">
          Coming soon. Thoughts on AI, software engineering, and building
          products.
        </p>
      ) : (
        <div className="blog-list">
          {blogPosts.map((post) => (
            <article key={post.id} className="blog-item">
              <h2 className="blog-title">
                <Link className="blog-link" to={`/writing/${post.id}`}>
                  {post.title}
                </Link>
              </h2>
              {(post.date || post.readTime) && (
                <p className="blog-meta">
                  {[post.date, post.readTime].filter(Boolean).join(" · ")}
                </p>
              )}
              {post.excerpt && <p className="blog-excerpt">{post.excerpt}</p>}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
