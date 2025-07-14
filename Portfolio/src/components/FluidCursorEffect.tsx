import React, { useEffect, useRef, useState } from "react";

const FluidCursorEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [canvasReady, setCanvasReady] = useState<boolean>(false);

  console.log('FluidCursorEffect rendering, canvasRef.current:', canvasRef.current);

  // Callback ref to handle canvas when it's available
  const setCanvasRef = (canvas: HTMLCanvasElement | null) => {
    console.log('setCanvasRef called with:', canvas);
    canvasRef.current = canvas;
    if (canvas) {
      console.log('Canvas element is now available!');
      setCanvasReady(true);
      setIsLoading(false);
    } else {
      console.log('Canvas element was removed');
    }
  };

  // Fallback useEffect to check for canvas
  useEffect(() => {
    const checkCanvas = () => {
      console.log('Checking for canvas, canvasRef.current:', canvasRef.current);
      if (canvasRef.current && !canvasReady) {
        console.log('Canvas found in fallback check!');
        setCanvasReady(true);
        setIsLoading(false);
      }
    };

    // Check immediately
    checkCanvas();
    
    // Check repeatedly
    const interval = setInterval(checkCanvas, 50);
    
    // Also try to find canvas by querying the DOM
    const findCanvasInDOM = () => {
      const canvasElement = document.querySelector('canvas');
      console.log('Canvas found in DOM:', canvasElement);
      if (canvasElement && !canvasRef.current) {
        canvasRef.current = canvasElement as HTMLCanvasElement;
        console.log('Canvas assigned from DOM query!');
        setCanvasReady(true);
        setIsLoading(false);
      }
    };
    
    setTimeout(findCanvasInDOM, 200);
    
    return () => clearInterval(interval);
  }, [canvasReady]);

  useEffect(() => {
    if (!canvasReady) return;

    const canvas = canvasRef.current;
    if (!canvas) {
      console.error('Canvas not found in animation setup');
      setError('Canvas not found in animation setup');
      setIsLoading(false);
      return;
    }

    console.log('Initializing fluid effect...');

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Get 2D context for simple animation
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('2D context not available');
      setError('2D context not available');
      setIsLoading(false);
      return;
    }

    // Simple animation variables
    let time = 0;
    const particles: Array<{x: number, y: number, vx: number, vy: number, color: string, size: number}> = [];

    // Create some particles
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        color: `hsl(${Math.random() * 360}, 70%, 50%)`,
        size: Math.random() * 4 + 2
      });
    }

    // Animation function
    const animate = () => {
      time += 0.016; // 60fps

      // Clear canvas with gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
      );
      gradient.addColorStop(0, `hsl(${time * 10 % 360}, 70%, 20%)`);
      gradient.addColorStop(1, `hsl(${time * 10 % 360 + 180}, 70%, 10%)`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Draw glow effect
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        const glowGradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 2
        );
        glowGradient.addColorStop(0, particle.color);
        glowGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGradient;
        ctx.fill();
      });

      // Draw connections between nearby particles
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * (1 - distance / 150)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();
    setIsLoading(false);
    console.log('Fluid effect started successfully');

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [canvasReady]);

  if (error) {
    return (
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000",
        color: "#fff",
        fontSize: "18px",
        zIndex: 9999,
      }}>
        Error: {error}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000",
        color: "#fff",
        fontSize: "18px",
        zIndex: 9999,
      }}>
        Loading fluid effect... (Canvas: {canvasRef.current ? 'Found' : 'Not Found'}, Ready: {canvasReady ? 'Yes' : 'No'})
      </div>
    );
  }

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "#000",
      zIndex: 9999,
    }}>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          border: "2px solid red", // Debug border
        }}
      />
      <div style={{
        position: "absolute",
        top: "10px",
        left: "10px",
        color: "white",
        fontSize: "14px",
        zIndex: 10000,
      }}>
        Debug: Canvas rendered
      </div>
    </div>
  );
};

export default FluidCursorEffect; 