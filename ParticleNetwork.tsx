import { useEffect, useRef } from 'react';

interface ParticleNetworkProps {
  className?: string;
  color?: string;
  particleCount?: number;
  particleSize?: number;
  lineColor?: string;
  speed?: number;
  density?: number;
  interactive?: boolean;
}

const ParticleNetwork = ({
  className = '',
  color = '#e72c33',
  particleCount = 80,
  particleSize = 3,
  lineColor = 'rgba(231, 44, 51, 0.3)',
  speed = 0.5,
  density = 12000,
  interactive = true
}: ParticleNetworkProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Avoid running in SSR
    if (typeof window === 'undefined') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Resize handler
    const handleResize = () => {
      if (canvas && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };
    
    // Initialize canvas size
    handleResize();
    
    // Mouse position
    let mousePosition = {
      x: 0,
      y: 0,
      active: false
    };
    
    // Set up particles
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      
      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * speed;
        this.vy = (Math.random() - 0.5) * speed;
        this.radius = Math.random() * particleSize + 1;
        this.color = color;
      }
      
      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
      
      update(width: number, height: number) {
        // Boundary check
        if (this.x < 0 || this.x > width) {
          this.vx = -this.vx;
        }
        
        if (this.y < 0 || this.y > height) {
          this.vy = -this.vy;
        }
        
        // Mouse interaction
        if (interactive && mousePosition.active) {
          const dx = this.x - mousePosition.x;
          const dy = this.y - mousePosition.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            const angle = Math.atan2(dy, dx);
            const force = (120 - distance) / 1000;
            this.vx += Math.cos(angle) * force;
            this.vy += Math.sin(angle) * force;
          }
        }
        
        // Update position
        this.x += this.vx;
        this.y += this.vy;
        
        // Dampen velocity slightly
        this.vx *= 0.99;
        this.vy *= 0.99;
        
        // Add occasional randomness
        if (Math.random() > 0.97) {
          this.vx += (Math.random() - 0.5) * 0.2;
          this.vy += (Math.random() - 0.5) * 0.2;
        }
      }
    }
    
    // Create particles
    const particles: Particle[] = [];
    
    const createParticles = () => {
      particles.length = 0;
      const count = Math.min(particleCount, Math.floor(canvas.width * canvas.height / density));
      
      for (let i = 0; i < count; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push(new Particle(x, y));
      }
    };
    
    createParticles();
    
    // Draw lines between particles
    const drawLines = (ctx: CanvasRenderingContext2D) => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = lineColor;
            ctx.globalAlpha = 1 - (distance / 100);
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
    };
    
    // Animation loop
    const animate = () => {
      if (!canvas || !ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update(canvas.width, canvas.height);
        particle.draw(ctx);
      });
      
      // Draw lines
      drawLines(ctx);
      
      requestAnimationFrame(animate);
    };
    
    // Start animation
    const animationId = requestAnimationFrame(animate);
    
    // Mouse events
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      mousePosition.x = e.clientX - rect.left;
      mousePosition.y = e.clientY - rect.top;
      mousePosition.active = true;
    };
    
    const handleMouseLeave = () => {
      mousePosition.active = false;
    };
    
    if (interactive && containerRef.current) {
      containerRef.current.addEventListener('mousemove', handleMouseMove);
      containerRef.current.addEventListener('mouseleave', handleMouseLeave);
    }
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      
      if (interactive && containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
        containerRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [color, particleCount, particleSize, lineColor, speed, density, interactive]);
  
  return (
    <div ref={containerRef} className={`w-full h-full relative ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
};

export default ParticleNetwork;