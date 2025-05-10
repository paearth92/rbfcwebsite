import React, { ReactNode, useEffect, useRef } from 'react';
import { motion, useAnimation, Variant } from 'framer-motion';
import { useInView } from 'framer-motion';

interface ScrollTriggerAnimationProps {
  children: ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideIn' | 'scaleUp' | 'bounce' | 'rotate' | 'staggered';
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  staggerChildren?: number;
  repeat?: boolean;
}

type AnimationVariants = {
  [key: string]: {
    hidden: Record<string, any>;
    visible: Record<string, any> | ((i: number) => Record<string, any>);
  };
};

const animations: AnimationVariants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  slideUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  },
  slideIn: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  },
  bounce: {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 10
      }
    }
  },
  rotate: {
    hidden: { opacity: 0, rotate: -5 },
    visible: { 
      opacity: 1, 
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20
      }
    }
  },
  staggered: {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.1
      }
    })
  }
};

const ScrollTriggerAnimation = ({
  children,
  animation = 'fadeIn',
  delay = 0,
  duration = 0.5,
  className = '',
  threshold = 0.3,
  staggerChildren = 0.1,
  repeat = false
}: ScrollTriggerAnimationProps) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: !repeat, amount: threshold });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else if (repeat) {
      controls.start("hidden");
    }
  }, [controls, isInView, repeat]);

  const getAnimationVariants = () => {
    const baseAnimation = animations[animation];
    
    // Custom transition based on props
    const transition = {
      duration,
      delay,
      ease: "easeOut"
    };

    if (animation === 'staggered') {
      return {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren,
            delayChildren: delay
          }
        }
      };
    }

    // Type guard to check if the visible property is a function
    const isVisibleFunction = typeof baseAnimation.visible === 'function';
    
    if (isVisibleFunction) {
      return {
        hidden: baseAnimation.hidden,
        visible: baseAnimation.visible // Return as is if it's a function
      };
    }
    
    return {
      hidden: baseAnimation.hidden,
      visible: {
        ...(baseAnimation.visible as Record<string, any>),
        transition: {
          ...(baseAnimation.visible as any).transition,
          ...transition
        }
      }
    };
  };

  const getStaggeredChildVariants = () => {
    const baseAnimation = animations.fadeIn;
    
    return {
      hidden: baseAnimation.hidden,
      visible: {
        ...(baseAnimation.visible as Record<string, any>),
        transition: {
          duration,
          ease: "easeOut"
        }
      }
    };
  };

  const MotionComponent = motion.div;

  // For staggered animations, we wrap each child in a motion component
  if (animation === 'staggered') {
    return (
      <MotionComponent
        ref={ref}
        className={className}
        initial="hidden"
        animate={controls}
        variants={getAnimationVariants()}
      >
        {React.Children.map(children, (child, i) => (
          <MotionComponent
            variants={getStaggeredChildVariants()}
            custom={i}
          >
            {child}
          </MotionComponent>
        ))}
      </MotionComponent>
    );
  }

  // For standard animations
  return (
    <MotionComponent
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={getAnimationVariants()}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </MotionComponent>
  );
};

export default ScrollTriggerAnimation;