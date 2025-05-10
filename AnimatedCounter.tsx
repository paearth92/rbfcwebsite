import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  label: string;
  delay?: number;
}

const AnimatedCounter = ({
  end,
  duration = 2,
  suffix = "",
  label,
  delay = 0
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(countRef, { once: true, amount: 0.5 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      const timer = setTimeout(() => {
        let start = 0;
        const increment = end / 40;
        const interval = (duration * 1000) / 40;
        
        const counter = setInterval(() => {
          start += increment;
          setCount(Math.min(Math.floor(start), end));
          
          if (start >= end) {
            clearInterval(counter);
          }
        }, interval);
        
        return () => clearInterval(counter);
      }, delay);
      
      setHasAnimated(true);
      return () => clearTimeout(timer);
    }
  }, [isInView, end, duration, delay, hasAnimated]);

  return (
    <div ref={countRef} className="text-white">
      <span className="block text-3xl md:text-5xl font-bold font-poppins">
        {count}
        {suffix}
      </span>
      <span className="text-gray-300">{label}</span>
    </div>
  );
};

export default AnimatedCounter;
