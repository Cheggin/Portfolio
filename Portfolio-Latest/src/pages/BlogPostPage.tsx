import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { loadBlogPosts, BlogPost } from '../utils/loadBlogPosts';

export default function BlogPostPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlogPosts().then((posts) => {
      const foundPost = posts.find((p) => p.id === id);
      setPost(foundPost || null);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="section">
        <p className="body-text">Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="section">
        <h2 className="section-heading">Post Not Found</h2>
        <Link to="/writing" className="body-text" style={{ textDecoration: 'underline' }}>
          ← Back to writing
        </Link>
      </div>
    );
  }

  const { Component, title, date, readTime } = post;

  return (
    <div className="section">
      <Link
        to="/writing"
        style={{
          color: 'rgba(255, 255, 255, 0.6)',
          textDecoration: 'none',
          fontSize: '0.95rem',
          marginBottom: '2rem',
          display: 'inline-block',
          transition: 'color 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 1)'}
        onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'}
      >
        ← Back to writing
      </Link>

      <article style={{ maxWidth: '900px' }}>
        {/* Post metadata */}
        <div style={{
          marginBottom: '2rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h1 style={{
            fontSize: '2rem',
            marginBottom: '1rem',
            fontWeight: '400',
            lineHeight: '1.2'
          }}>
            {title}
          </h1>
          <div style={{
            display: 'flex',
            gap: '1rem',
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: '0.95rem'
          }}>
            <span>{date}</span>
            <span>·</span>
            <span>{readTime}</span>
          </div>
        </div>

        {/* Blog post content */}
        <div className="blog-content">
          <Component />
        </div>
      </article>
    </div>
  );
}
