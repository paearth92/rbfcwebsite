import { ReactNode, useRef, useState, MouseEvent, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const MagneticButton = ({
  children,
  className = '',
  strength = 30,
  radius = 300,
  href,
  onClick,
  disabled = false,
  type = 'button'
}: MagneticButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [size, setSize] = useState({ width: 0, height: 0 });

  // Update element size on resize or mount
  useEffect(() => {
    if (buttonRef.current) {
      const updateSize = () => {
        if (buttonRef.current) {
          const { width, height } = buttonRef.current.getBoundingClientRect();
          setSize({ width, height });
        }
      };

      updateSize();
      window.addEventListener('resize', updateSize);
      
      return () => {
        window.removeEventListener('resize', updateSize);
      };
    }
  }, []);

  // Handle the magnetic effect
  const handleMouseMove = (e: MouseEvent) => {
    if (!buttonRef.current || disabled) return;
    
    const { left, top } = buttonRef.current.getBoundingClientRect();
    
    // Calculate the center of the button
    const centerX = left + size.width / 2;
    const centerY = top + size.height / 2;
    
    // Calculate the distance from mouse to center
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    // Calculate the distance from mouse to center (Pythagorean theorem)
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    // Only apply the effect if the cursor is within the defined radius
    if (distance < radius) {
      // The closer to the center, the stronger the effect (inverse relationship)
      const magneticPull = 1 - Math.min(distance / radius, 1);
      
      // Apply a non-linear scale for more natural movement
      const pullStrength = magneticPull * magneticPull * strength;
      
      // Calculate the magnetic movement
      const moveX = (distanceX / distance) * pullStrength;
      const moveY = (distanceY / distance) * pullStrength;
      
      setPosition({ x: moveX, y: moveY });
    } else {
      // Reset position if outside radius
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseEnter = () => {
    if (!disabled) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = () => {
    if (!disabled) {
      setIsPressed(true);
    }
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const buttonVariants = {
    rest: {
      scale: 1,
      backgroundColor: "var(--button-bg, #e72c33)",
      boxShadow: "0 4px 10px rgba(231, 44, 51, 0.2)"
    },
    hover: {
      scale: 1.05,
      backgroundColor: "var(--button-hover-bg, #cc262d)",
      boxShadow: "0 6px 20px rgba(231, 44, 51, 0.4)"
    },
    pressed: {
      scale: 0.95,
      backgroundColor: "var(--button-active-bg, #b62229)",
      boxShadow: "0 2px 5px rgba(231, 44, 51, 0.3)"
    }
  };

  // Apply the appropriate state
  const currentVariant = isPressed ? 'pressed' : isHovered ? 'hover' : 'rest';

  // Create a component - either button or anchor based on props
  const Component = href ? motion.a : motion.button;
  const additionalProps = href 
    ? { href, target: href.startsWith('http') ? '_blank' : undefined, rel: href.startsWith('http') ? 'noopener noreferrer' : undefined } 
    : { type, disabled };

  return (
    <Component
      ref={buttonRef as any}
      className={`relative inline-block ${className}`}
      style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
      animate={{
        x: position.x,
        y: position.y,
        transition: { type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={disabled ? undefined : onClick}
      {...additionalProps}
    >
      <motion.span
        className="block relative"
        animate={currentVariant}
        variants={buttonVariants}
        transition={{ 
          type: 'spring', 
          stiffness: 500, 
          damping: 30,
          mass: 1
        }}
      >
        {children}
      </motion.span>
    </Component>
  );
};

export default MagneticButton;