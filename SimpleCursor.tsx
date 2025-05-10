import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SimpleCursorProps {
  color?: string;
  size?: number;
  ringSize?: number;
  duration?: number;
}

const SimpleCursor = ({
  color = '#e72c33',
  size = 12,
  ringSize = 40,
  duration = 0.15
}: SimpleCursorProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);
  
  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      if (!visible) {
        setVisible(true);
      }
    };
    
    const handleMouseDown = () => {
      setClicking(true);
    };
    
    const handleMouseUp = () => {
      setClicking(false);
    };
    
    const handleMouseEnter = () => {
      setVisible(true);
    };
    
    const handleMouseLeave = () => {
      setVisible(false);
    };
    
    // Check for hoverable elements
    const handleLinkHover = () => {
      document.querySelectorAll('a, button, [role="button"], .hoverable').forEach(el => {
        el.addEventListener('mouseenter', () => setHovering(true));
        el.addEventListener('mouseleave', () => setHovering(false));
      });
    };
    
    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Set up checking for hoverable elements
    handleLinkHover();
    const intervalId = setInterval(handleLinkHover, 2000);
    
    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      clearInterval(intervalId);
    };
  }, [visible]);
  
  // Adjust sizes based on state
  const dotSize = clicking ? size * 0.8 : hovering ? size * 1.5 : size;
  const ringRadius = clicking ? ringSize * 0.8 : hovering ? ringSize * 1.5 : ringSize;
  
  return (
    <div style={{ 
      position: 'fixed', 
      pointerEvents: 'none', 
      zIndex: 9999, 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%',
      opacity: visible ? 1 : 0
    }}>
      {/* Outer ring */}
      <motion.div
        style={{
          position: 'fixed',
          width: ringRadius,
          height: ringRadius,
          borderRadius: '50%',
          border: `2px solid ${color}`,
          opacity: 0.6,
          top: 0,
          left: 0,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 9998
        }}
        animate={{
          x: position.x,
          y: position.y,
          scale: clicking ? 0.8 : hovering ? 1.2 : 1
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 300,
          duration
        }}
      />
      
      {/* Inner dot */}
      <motion.div
        style={{
          position: 'fixed',
          width: dotSize,
          height: dotSize,
          borderRadius: '50%',
          backgroundColor: color,
          top: 0,
          left: 0,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 9999
        }}
        animate={{
          x: position.x,
          y: position.y,
          scale: clicking ? 0.8 : hovering ? 1.2 : 1
        }}
        transition={{
          type: 'tween',
          ease: 'backOut',
          duration: duration / 2
        }}
      />
    </div>
  );
};

export default SimpleCursor;