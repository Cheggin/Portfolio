import { useState, useCallback } from 'react';

interface UseAgentDetectionResult {
  isAgentMode: boolean;
  enableAgentMode: () => void;
  disableAgentMode: () => void;
}

/**
 * Agent detection via DOM trigger only.
 * Agents discover the hidden accessible button and click it to enable agent mode.
 */
export function useAgentDetection(): UseAgentDetectionResult {
  const [isAgentMode, setIsAgentMode] = useState(false);

  const enableAgentMode = useCallback(() => {
    setIsAgentMode(true);
  }, []);

  const disableAgentMode = useCallback(() => {
    setIsAgentMode(false);
  }, []);

  return {
    isAgentMode,
    enableAgentMode,
    disableAgentMode,
  };
}
