import { useState, useCallback, useMemo } from 'react';
import { AGENT_USER_AGENTS, AGENT_QUERY_PARAM } from '../constants/agentPatterns';

interface UseAgentDetectionResult {
  isAgentMode: boolean;
  detectionMethod: 'userAgent' | 'queryParam' | 'trigger' | null;
  enableAgentMode: () => void;
  disableAgentMode: () => void;
}

export function useAgentDetection(): UseAgentDetectionResult {
  const [manualEnabled, setManualEnabled] = useState(false);
  const [manualDisabled, setManualDisabled] = useState(false);

  // Check for user-agent patterns (only on initial load)
  const isAgentUserAgent = useMemo((): boolean => {
    if (typeof window === 'undefined') return false;
    const userAgent = navigator.userAgent;
    return AGENT_USER_AGENTS.some(pattern =>
      userAgent.toLowerCase().includes(pattern.toLowerCase())
    );
  }, []);

  // Check for query parameter (only on initial load)
  const hasQueryParam = useMemo((): boolean => {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    return params.get(AGENT_QUERY_PARAM) === 'true';
  }, []);

  // Determine detection method and agent mode status
  const detectionMethod = useMemo((): 'userAgent' | 'queryParam' | 'trigger' | null => {
    // If user manually disabled, return null
    if (manualDisabled) return null;
    // If user manually enabled via trigger button
    if (manualEnabled) return 'trigger';
    // Check initial query param
    if (hasQueryParam) return 'queryParam';
    // Check user agent
    if (isAgentUserAgent) return 'userAgent';
    return null;
  }, [manualEnabled, manualDisabled, hasQueryParam, isAgentUserAgent]);

  const isAgentMode = detectionMethod !== null;

  const enableAgentMode = useCallback(() => {
    setManualDisabled(false);
    setManualEnabled(true);
  }, []);

  const disableAgentMode = useCallback(() => {
    setManualEnabled(false);
    setManualDisabled(true);
    // Also remove query param if present
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete(AGENT_QUERY_PARAM);
      window.history.replaceState({}, '', url.toString());
    }
  }, []);

  return {
    isAgentMode,
    detectionMethod,
    enableAgentMode,
    disableAgentMode,
  };
}
