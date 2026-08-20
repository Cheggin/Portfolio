import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { loadInterests, Interest } from '../utils/loadInterests';

export default function InterestsPage() {
  const [interests, setInterests] = useState<Interest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInterests().then((items) => {
      setInterests(items);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="section">
        <h1 className="page-title">Interests</h1>
        <p className="body-text">Loading...</p>
      </div>
    );
  }

  return (
    <div className="section">
      <h1 className="page-title">Interests</h1>

      <ul style={{
        listStyle: 'none',
        padding: 0,
        marginTop: '2rem'
      }}>
        {interests.map((interest) => (
          <li key={interest.id} style={{ marginBottom: '1rem' }}>
            <Link
              to={`/interests/${interest.id}`}
              className="body-text"
              style={{
                textDecoration: 'underline',
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              {interest.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
