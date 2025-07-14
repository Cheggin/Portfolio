import React, { useEffect, useRef } from 'react';
import type { FluidCursorConfig } from '../hooks/use-FluidCursor';
import useFluidCursor from '../hooks/use-FluidCursor';

interface FluidCursorProps {
  config?: FluidCursorConfig;
}

const FluidCursor: React.FC<FluidCursorProps> = ({ config }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Import and use the fluid cursor hook
    const initFluidCursor = async () => {
      try {
        // Dynamically import the hook
        const { default: useFluidCursor } = await import('../hooks/use-FluidCursor');
        
        // The hook expects a canvas with id="fluid"
        if (canvasRef.current) {
          canvasRef.current.id = 'fluid';
          
          // Call the hook and get cleanup function
          const cleanup = useFluidCursor(config);
          
          // Return cleanup function
          return cleanup;
        }
      } catch (error) {
        console.error('Failed to initialize fluid cursor:', error);
      }
    };

    let cleanup: (() => void) | undefined;
    
    initFluidCursor().then((cleanupFn) => {
      cleanup = cleanupFn;
    });
    
    // Return cleanup function
    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, [config]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: -1,
      }}
    />
  );
};

export default FluidCursor; 