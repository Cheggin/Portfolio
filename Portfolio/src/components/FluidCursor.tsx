import React, { useEffect, useRef } from 'react';

const FluidCursor: React.FC = () => {
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
          const cleanup = useFluidCursor();
          
          // Return cleanup function
          return cleanup;
        }
      } catch (error) {
        console.error('Failed to initialize fluid cursor:', error);
      }
    };

    const cleanup = initFluidCursor();
    
    // Return cleanup function
    return () => {
      if (cleanup && typeof cleanup === 'function') {
        cleanup();
      }
    };
  }, []);

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