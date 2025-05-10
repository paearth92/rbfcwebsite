import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface CursorState {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  mixBlendMode?: ValidBlendMode;
  delay: number;
}

interface AnimatedCursorProps {
  color?: string;
  outerScale?: number;
  innerScale?: number;
  trailingSpeed?: number;
  clickScale?: number;
  hoverScale?: number;
}

const AnimatedCursor = ({
  color = '#e72c33',
  outerScale = 6,
  innerScale = 3,
  trailingSpeed = 0.2,
  clickScale = 0.8,
  hoverScale = 1.5
}: AnimatedCursorProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [cursorVariant, setCursorVariant] = useState('default');
  
  // Trail effect 
  const [trail, setTrail] = useState<CursorState[]>([]);
  const trailLength = 8; // Number of trailing dots
  
  // Define valid blend modes
  type ValidBlendMode = 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' | 'color-dodge' | 'color-burn' | 'hard-light' | 'soft-light' | 'difference' | 'exclusion' | 'hue' | 'saturation' | 'color' | 'luminosity';
  
  // Ref to keep track of animation frame
  const requestRef = useRef<number | null>(null);
  
  // Set up cursor movement
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
      
      // Update trail positions with delay
      setTrail(prevTrail => {
        // If trail is empty, initialize it
        if (prevTrail.length === 0) {
          return Array(trailLength).fill(0).map((_, i) => ({
            x: e.clientX,
            y: e.clientY,
            width: outerScale * (1 - i / trailLength) * 2,
            height: outerScale * (1 - i / trailLength) * 2,
            color: `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${1 - i / trailLength})`,
            delay: i * trailingSpeed,
            mixBlendMode: i % 2 ? 'screen' : 'normal'
          }));
        }
        
        // Otherwise, add new position at the beginning and remove the last one
        const newTrail = [...prevTrail];
        newTrail.unshift({
          x: e.clientX,
          y: e.clientY,
          width: outerScale * 2,
          height: outerScale * 2,
          color: color,
          delay: 0,
          mixBlendMode: 'normal'
        });
        newTrail.pop();
        
        return newTrail;
      });
    };
    
    const onMouseLeave = () => setHidden(true);
    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);
    
    // Listen for hover on links and buttons
    const handleLinkHoverEvents = () => {
      document.querySelectorAll('a, button, [role="button"], [role="link"]').forEach(el => {
        el.addEventListener('mouseenter', () => {
          setLinkHovered(true);
          setCursorVariant('hover');
        });
        
        el.addEventListener('mouseleave', () => {
          setLinkHovered(false);
          setCursorVariant('default');
        });
      });
    };
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    
    // Initial setup - run once after first render
    const setupTimeout = setTimeout(handleLinkHoverEvents, 1000);
    
    // Setup interval to check for new links
    const checkInterval = setInterval(handleLinkHoverEvents, 3000);
    
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      
      clearInterval(checkInterval);
      clearTimeout(setupTimeout);
      
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [color, outerScale, trailingSpeed]);
  
  // Handle cursor variants
  const variants = {
    default: {
      width: outerScale * 20,
      height: outerScale * 20,
      x: position.x - (outerScale * 10),
      y: position.y - (outerScale * 10),
      backgroundColor: `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, 0.18)`,
      mixBlendMode: 'normal' as const
    },
    hover: {
      width: outerScale * 20 * hoverScale,
      height: outerScale * 20 * hoverScale,
      x: position.x - (outerScale * 10 * hoverScale),
      y: position.y - (outerScale * 10 * hoverScale),
      backgroundColor: `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, 0.25)`,
      mixBlendMode: 'normal' as const
    }
  } as const;
  
  // Define inner dot variants
  const innerDotVariants = {
    default: {
      width: innerScale * 10,
      height: innerScale * 10,
      x: position.x - (innerScale * 5),
      y: position.y - (innerScale * 5),
      backgroundColor: clicked ? 'rgba(255, 255, 255, 0.6)' : color,
      scale: clicked ? clickScale : 1
    },
    hover: {
      width: innerScale * 10 * hoverScale,
      height: innerScale * 10 * hoverScale,
      x: position.x - (innerScale * 5 * hoverScale),
      y: position.y - (innerScale * 5 * hoverScale),
      backgroundColor: color,
      scale: 1.1
    }
  };
  
  if (typeof window === 'undefined') return null;
  
  return (
    <div 
      className={`cursor-wrapper ${hidden ? 'hidden' : ''}`} 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        pointerEvents: 'none',
        zIndex: 9999 
      }}
    >
      {/* Outer cursor (halo effect) */}
      <motion.div
        className="cursor-dot-outline"
        style={{
          position: 'fixed',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'opacity 0.15s ease-in-out'
        }}
        animate={cursorVariant}
        variants={variants}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 200,
          mass: 0.5
        }}
      />
      
      {/* Inner cursor dot */}
      <motion.div
        className="cursor-dot"
        style={{
          position: 'fixed',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999
        }}
        animate={cursorVariant}
        variants={innerDotVariants}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 300,
          mass: 0.2
        }}
      />
      
      {/* Trailing effect */}
      {trail.map((dot, index) => (
        <motion.div
          key={index}
          style={{
            position: 'fixed',
            borderRadius: '50%',
            width: dot.width,
            height: dot.height,
            backgroundColor: dot.color,
            mixBlendMode: dot.mixBlendMode || 'normal',
            pointerEvents: 'none',
            zIndex: 9997 - index,
            opacity: linkHovered ? 0.5 : 0.7
          }}
          animate={{
            x: position.x - (dot.width / 2),
            y: position.y - (dot.height / 2)
          }}
          transition={{
            ease: 'linear',
            duration: trailingSpeed / 5,
            delay: dot.delay
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedCursor;