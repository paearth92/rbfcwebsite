import { ReactNode, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface SmoothScrollProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

const SmoothScroll = ({ children, speed = 0.8, className = '' }: SmoothScrollProps) => {
  const [isReady, setIsReady] = useState(false);
  const scrollWrapper = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const scrollTween = useRef<gsap.core.Tween | null>(null);
  const windowSize = useRef({ width: 0, height: 0 });
  const scrollTop = useRef(0);

  // Initialize GSAP plugins
  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      setIsReady(true);
    }
  }, []);

  // Set up the smooth scrolling effect
  useEffect(() => {
    if (!isReady || !scrollWrapper.current || !content.current) return;

    // Store window sizes
    windowSize.current = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    // Set content element to position: fixed
    gsap.set(content.current, { position: 'fixed', top: 0, left: 0, width: '100%' });
    
    // Update content size on resize
    const updateHeight = () => {
      if (!scrollWrapper.current || !content.current) return;
      
      // Set wrapper height to match content
      scrollWrapper.current.style.height = `${content.current.scrollHeight}px`;

      // Update ScrollTrigger
      ScrollTrigger.refresh();
    };

    // Handle scrolling animation
    const handleScroll = () => {
      if (!content.current) return;
      scrollTop.current = window.scrollY;
      
      // Kill previous tween
      if (scrollTween.current) {
        scrollTween.current.kill();
      }
      
      // Create new tween
      scrollTween.current = gsap.to(content.current, {
        y: -scrollTop.current,
        ease: 'power2.out',
        duration: speed,
        overwrite: 'auto'
      });
    };
    
    // Add event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateHeight);
    
    // Trigger initial setup
    updateHeight();
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateHeight);
      
      if (scrollTween.current) {
        scrollTween.current.kill();
      }
      
      // Cleanup ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      ScrollTrigger.clearMatchMedia();
    };
  }, [isReady, speed]);

  if (!isReady) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={scrollWrapper} className={`smooth-scroll-container ${className}`}>
      <div ref={content} className="smooth-scroll-content">
        {children}
      </div>
    </div>
  );
};

export default SmoothScroll;