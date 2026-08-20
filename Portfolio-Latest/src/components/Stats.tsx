import { useEffect, useRef } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

export default function Stats() {
  const views = useQuery(api.myFunctions.getViews);
  const incrementViews = useMutation(api.myFunctions.incrementViews);
  const hasIncrementedRef = useRef(false);

  useEffect(() => {
    const sessionKey = 'portfolioVisitorCounted';
    const hasCounted = sessionStorage.getItem(sessionKey);

    if (!hasCounted && incrementViews && !hasIncrementedRef.current) {
      hasIncrementedRef.current = true;
      incrementViews()
        .then(() => {
          sessionStorage.setItem(sessionKey, 'true');
        })
        .catch((error) => {
          console.error('Error incrementing views:', error);
        });
    }
  }, [incrementViews]);

  return (
    <p className="stats-container">
      {views !== undefined ? views.toLocaleString() : '...'} views
    </p>
  );
}
