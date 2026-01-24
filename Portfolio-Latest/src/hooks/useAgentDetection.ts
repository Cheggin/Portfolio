import { useState, useCallback, useMemo } from 'react';

interface UseAgentDetectionResult {
  isAgentMode: boolean;
  enableAgentMode: () => void;
  disableAgentMode: () => void;
}

/**
 * Agent detection via DOM trigger only (production).
 * In development, also supports ?agent=true query param for testing.
 */
export function useAgentDetection(): UseAgentDetectionResult {
  // Check for dev mode query param
  const hasDevQueryParam = useMemo(() => {
    if (typeof window === 'undefined') return false;
    if (import.meta.env.PROD) return false; // Only in dev
    const params = new URLSearchParams(window.location.search);
    return params.get('agent') === 'true';
  }, []);

  const [manualMode, setManualMode] = useState<boolean | null>(null);

  const isAgentMode = manualMode ?? hasDevQueryParam;

  const enableAgentMode = useCallback(() => {
    setManualMode(true);
  }, []);

  const disableAgentMode = useCallback(() => {
    setManualMode(false);
  }, []);

  return {
    isAgentMode,
    enableAgentMode,
    disableAgentMode,
  };
}
