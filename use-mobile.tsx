import { useState, useEffect } from 'react';

// A hook to detect if the current view is a mobile view
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check if screen is mobile size (less than 768px)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check initially
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup function
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

export { useIsMobile };