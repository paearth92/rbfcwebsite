import { useEffect } from 'react';
import { useLocation } from 'wouter';

/**
 * ScrollToTop - A utility component that scrolls to the top of the page
 * whenever the route changes.
 */
const ScrollToTop = () => {
  const [location] = useLocation();

  useEffect(() => {
    // Scroll to top with smooth behavior when route changes
    const scrollToTop = () => {
      const scrollOptions: ScrollToOptions = {
        top: 0,
        left: 0,
        behavior: 'smooth'
      };
      
      // Check if we're not already at the top
      if (window.scrollY > 0) {
        window.scrollTo(scrollOptions);
      }
    };
    
    scrollToTop();
    
    // Also handle browser back/forward navigation
    window.addEventListener('popstate', scrollToTop);
    
    return () => {
      window.removeEventListener('popstate', scrollToTop);
    };
  }, [location]);

  return null; // This component doesn't render anything
};

export default ScrollToTop;