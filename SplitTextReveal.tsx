import { useEffect, useRef } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'framer-motion';

interface SplitTextRevealProps {
  text: string;
  className?: string;
  textColor?: string;
  highlightWords?: string[];
  highlightColor?: string;
  delay?: number;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

const SplitTextReveal = ({
  text,
  className = '',
  textColor = 'inherit',
  highlightWords = [],
  highlightColor = '#e72c33',
  delay = 0,
  tag: Tag = 'div'
}: SplitTextRevealProps) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Split text into words and then into characters
  const words = text.split(' ');

  const wordVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay
      }
    }
  };

  const characterVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: 30,
      filter: 'blur(10px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    }
  };

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const shouldHighlight = (word: string) => {
    return highlightWords.includes(word);
  };

  return (
    <Tag className={className} ref={ref}>
      <span className="sr-only">{text}</span>
      <motion.span
        className="inline-block"
        aria-hidden="true"
        initial="hidden"
        animate={controls}
        variants={wordVariants}
        style={{ color: textColor }}
      >
        {words.map((word, wordIndex) => (
          <motion.span
            key={`word-${wordIndex}`}
            className="inline-block"
            variants={wordVariants}
            style={{ 
              color: shouldHighlight(word) ? highlightColor : 'inherit',
              marginRight: wordIndex < words.length - 1 ? '0.5rem' : 0,
              display: 'inline-block'
            }}
          >
            {Array.from(word).map((char, charIndex) => (
              <motion.span
                key={`char-${wordIndex}-${charIndex}`}
                className="inline-block"
                variants={characterVariants}
                style={{ 
                  display: 'inline-block',
                  willChange: 'transform',
                  fontWeight: shouldHighlight(word) ? 700 : 'inherit',
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
};

export default SplitTextReveal;