import { useEffect, useRef } from 'react';

const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Use only binary digits
    const characters = '01';
    const fontSize = 28;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      // Fade effect by drawing a semi-transparent black rectangle over the canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00FF88';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Randomly choose '0' or '1'
        const text = characters[Math.floor(Math.random() * characters.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Vary brightness based on position (higher drops are brighter)
        if (drops[i] * fontSize > canvas.height * 0.95) {
          ctx.fillStyle = '#00FF88'; // fully bright at bottom
        } else if (drops[i] * fontSize > canvas.height * 0.8) {
          ctx.fillStyle = 'rgba(0, 255, 136, 0.8)';
        } else {
          ctx.fillStyle = 'rgba(0, 255, 136, 0.3)';
        }
        
        ctx.fillText(text, x, y);

        // Reset drop when it goes off screen, with random chance
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33); // ~30 fps

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1, opacity: 0.6 }}
    />
  );
};

export default MatrixRain;