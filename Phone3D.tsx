import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Animation variants for the phone
const phoneVariants = {
  initial: { scale: 0.8, opacity: 0, rotateY: -30 },
  animate: { 
    scale: 1, 
    opacity: 1, 
    rotateY: 0,
    transition: { 
      duration: 1.2,
      ease: "easeOut"
    }
  },
  hover: { 
    scale: 1.05,
    rotateY: 5,
    transition: { 
      duration: 0.3 
    }
  }
};

// Animation variants for the notification dots
const dotVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: (custom: number) => ({
    scale: 1,
    opacity: 0.8,
    transition: {
      delay: custom * 0.05,
      duration: 0.5
    }
  })
};

// Animation variants for signal waves
const signalVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { 
    scale: [0.8, 1.2, 0.8], 
    opacity: [0, 0.8, 0],
    transition: { 
      repeat: Infinity,
      duration: 2,
      ease: "easeInOut"
    }
  }
};

// Main exported Phone3D component with enhanced CSS-based 3D effect
interface Phone3DProps {
  className?: string;
}

// Network point type
interface NetworkPoint {
  id: number;
  x: number;
  y: number;
  size: number;
}

const Phone3D = ({ className = "h-72 w-72 md:h-96 md:w-96 mx-auto" }: Phone3DProps) => {
  const [isRotating, setIsRotating] = useState(true);
  const [rotation, setRotation] = useState(0);
  const [floating, setFloating] = useState(0);
  
  // Create network points once
  const [networkPoints] = useState<NetworkPoint[]>(() => {
    return Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2
    }));
  });
  
  // Animation loop for continuous rotation and floating
  useEffect(() => {
    let animationFrame: number;
    
    const animate = () => {
      setRotation(prev => (prev + 0.2) % 360);
      setFloating(Math.sin(Date.now() * 0.001) * 10);
      animationFrame = requestAnimationFrame(animate);
    };
    
    if (isRotating) {
      animate();
    }
    
    return () => cancelAnimationFrame(animationFrame);
  }, [isRotating]);
  
  return (
    <div className={className} style={{ perspective: "1000px" }}>
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Signal waves - visual "3D" effect */}
        {[1, 2, 3].map((ring) => (
          <motion.div
            key={`ring-${ring}`}
            className="absolute rounded-full border-2 border-primary/20"
            style={{ 
              width: `${ring * 50}px`, 
              height: `${ring * 50}px`,
              zIndex: -10
            }}
            variants={signalVariants}
            initial="initial"
            animate="animate"
            custom={ring * 0.5}
          />
        ))}
        
        {/* 3D Phone with CSS transforms */}
        <motion.div
          className="relative"
          style={{ 
            transformStyle: "preserve-3d", 
            transform: `rotateY(${rotation / 20}deg) translateY(${floating}px)`,
            transformOrigin: "center center",
          }}
          whileHover="hover"
          initial="initial"
          animate="animate"
          variants={phoneVariants}
        >
          {/* Phone body */}
          <div className="relative w-48 h-80 bg-[#3a3a3c] rounded-[2rem] shadow-2xl overflow-hidden">
            {/* Phone screen */}
            <div className="absolute inset-2 bg-[#0A84FF] rounded-[1.5rem]">
              {/* App grid */}
              <div className="grid grid-cols-4 gap-2 p-4">
                {Array.from({ length: 16 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-full aspect-square rounded-lg bg-white/20"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.03, duration: 0.3 }}
                  />
                ))}
              </div>
            </div>
            
            {/* Camera */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-black rounded-full" />
            
            {/* Home button */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-[#222] rounded-full" />
            
            {/* Reflection overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
          </div>
          
          {/* Notification dots floating around the phone */}
          <div className="absolute inset-0 -z-10">
            {networkPoints.map((point: NetworkPoint) => (
              <motion.div
                key={point.id}
                className="absolute rounded-full bg-primary"
                style={{
                  left: `${point.x}%`,
                  top: `${point.y}%`,
                  width: `${point.size}px`,
                  height: `${point.size}px`,
                  filter: "blur(1px)"
                }}
                variants={dotVariants}
                initial="initial"
                animate="animate"
                custom={point.id}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Phone3D;