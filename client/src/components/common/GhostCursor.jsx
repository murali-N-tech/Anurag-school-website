import React, { useEffect, useRef } from 'react';

const GhostCursor = ({ color = "#B19EEF", trailLength = 50, radius = 10 }) => {
  const canvasRef = useRef(null);
  const points = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Safety check

    const parent = canvas.parentElement; // Store reference to parent
    const ctx = canvas.getContext('2d');
    let requestRef;

    const resize = () => {
      if (parent) {
        canvas.width = window.innerWidth;
        canvas.height = parent.offsetHeight;
      }
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      points.current.push({ 
        x: e.clientX - rect.left, 
        y: e.clientY - rect.top, 
        age: 0 
      });
    };

    window.addEventListener('resize', resize);
    // Attach listener to window or parent safely
    window.addEventListener('mousemove', handleMouseMove);
    
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = points.current.length - 1; i >= 0; i--) {
        const p = points.current[i];
        p.age++;
        
        if (p.age > trailLength) {
          points.current.splice(i, 1);
          continue;
        }
        
        const opacity = 1 - (p.age / trailLength);
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * opacity, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = opacity * 0.6;
        ctx.fill();
        
        ctx.shadowBlur = 15;
        ctx.shadowColor = color;
      }

      requestRef = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestRef) {
        cancelAnimationFrame(requestRef);
      }
    };
  }, [color, trailLength, radius]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full block pointer-events-none" 
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default GhostCursor;