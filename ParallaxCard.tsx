import { useRef, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ParallaxCardProps {
  children: ReactNode;
  className?: string;
  glareIntensity?: number;
  depth?: number;
  glareColor?: string;
  backgroundColor?: string;
  borderRadius?: string;
}

const ParallaxCard = ({
  children,
  className = '',
  glareIntensity = 0.5,
  depth = 50,
  glareColor = 'rgba(255, 255, 255, 0.5)',
  backgroundColor = '#1a1a1a',
  borderRadius = '1rem',
}: ParallaxCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Calculate mouse position relative to card center (in percentage)
    const centerX = (e.clientX - rect.left) / rect.width;
    const centerY = (e.clientY - rect.top) / rect.height;
    
    // Calculate rotation based on mouse position
    // Normalize to -1 to 1 range, then scale by depth factor
    const rotateYValue = ((centerX - 0.5) * 2) * (depth / 100);
    const rotateXValue = ((centerY - 0.5) * -2) * (depth / 100);
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
    
    // Update the position of the glare effect
    setGlarePosition({ 
      x: centerX * 100, 
      y: centerY * 100 
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Reset card position with smooth animation
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      style={{ 
        backgroundColor,
        borderRadius, 
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        willChange: 'transform',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotateX,
        rotateY: rotateY,
        transition: { type: 'spring', stiffness: 300, damping: 30 },
      }}
    >
      {/* The card content */}
      <motion.div
        style={{ 
          transformStyle: 'preserve-3d',
          transform: `translateZ(${isHovered ? 20 : 0}px)`, 
          transition: 'transform 0.2s ease-out',
        }}
      >
        {children}
      </motion.div>

      {/* Glare effect */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ 
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, ${glareColor} 0%, rgba(255, 255, 255, 0) 80%)`,
            opacity: glareIntensity,
            mixBlendMode: 'overlay',
            transition: 'opacity 0.3s ease-out'
          }}
        />
      )}
      
      {/* Edge glow effect on hover */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius,
            boxShadow: `0 0 20px rgba(231, 44, 51, 0.7)`,
            opacity: 0.7,
            transition: 'opacity 0.3s ease-out'
          }}
        />
      )}
    </motion.div>
  );
};

export default ParallaxCard;