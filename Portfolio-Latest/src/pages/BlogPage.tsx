/*
 * BLOG POST FORMATTING GUIDE
 *
 * To add a new blog post, create a new .mdx file in src/content/blog/
 *
 * Format:
 * ---
 * title: "Your Blog Post Title"
 * date: "Month DD, YYYY"
 * readTime: "X min read"
 * excerpt: "A brief summary that appears in the blog list view"
 * tags: ["tag1", "tag2"]
 * ---
 *
 * # Your content here
 *
 * Write your blog post using Markdown or MDX (React components)!
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { loadBlogPosts, BlogPost } from '../utils/loadBlogPosts';

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlogPosts().then((posts) => {
      setBlogPosts(posts);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="section">
        <h1 className="page-title">Writing</h1>
        <p className="body-text">Loading...</p>
      </div>
    );
  }

  if (blogPosts.length === 0) {
    return (
      <div className="section">
        <h1 className="page-title">Writing</h1>
        <p className="body-text">
          Coming soon. Thoughts on AI, software engineering, and building products.
        </p>
      </div>
    );
  }

  return (
    <div className="section">
      <h1 className="page-title">Writing</h1>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '3rem',
        marginTop: '3rem',
        maxWidth: '900px'
      }}>
        {blogPosts.map((post) => (
          <article
            key={post.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '200px 1fr',
              gap: '3rem',
              alignItems: 'start'
            }}
          >
            {/* Left side: Date and read time */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
              color: 'rgba(255, 255, 255, 0.5)',
              fontSize: '0.95rem'
            }}>
              <div>{post.date}</div>
              <div>{post.readTime}</div>
            </div>

            {/* Right side: Title and description */}
            <div>
              <Link
                to={`/writing/${post.id}`}
                style={{
                  textDecoration: 'none',
                  color: 'inherit'
                }}
              >
                <h3 style={{
                  fontSize: '1.25rem',
                  marginBottom: '0.75rem',
                  fontWeight: '400',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.8)',
                  paddingBottom: '2px',
                  display: 'inline-block',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 1)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.8)'}
                >
                  {post.title}
                </h3>
              </Link>

              <p style={{
                color: 'rgba(255, 255, 255, 0.7)',
                lineHeight: '1.6',
                fontSize: '0.95rem'
              }}>
                {post.excerpt}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
