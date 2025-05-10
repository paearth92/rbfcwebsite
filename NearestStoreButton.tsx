import { useState, useEffect, useCallback } from 'react';
import { MapPin, Navigation, Loader2, X, Phone, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNearestStore } from '../hooks/use-nearest-store';
import { stores } from '../data/stores';
import { useToast } from '@/hooks/use-toast';

interface NearestStoreButtonProps {
  className?: string;
}

const NearestStoreButton = ({ className = '' }: NearestStoreButtonProps) => {
  // State hooks must always be called in the same order
  const [expanded, setExpanded] = useState(false);
  const [showError, setShowError] = useState(false);
  const [pulseEffect, setPulseEffect] = useState(false);
  
  // Other hooks
  const { toast } = useToast();
  const {
    loading,
    error,
    nearestStore,
    formattedDistance,
    findNearest,
    navigateToNearest,
    callStore
  } = useNearestStore(stores);
  
  // Handler functions using callbacks to ensure they don't change between renders
  const handleFindNearest = useCallback(async () => {
    if (!nearestStore) {
      await findNearest();
    }
    setExpanded(true);
  }, [nearestStore, findNearest]);
  
  const handleNavigate = useCallback(() => {
    if (nearestStore) {
      // Show a toast message to indicate navigation is starting
      toast({
        title: "Opening Maps",
        description: `Navigating to ${nearestStore.name}`,
        duration: 3000,
      });
      
      navigateToNearest();
      setExpanded(false);
    }
  }, [nearestStore, navigateToNearest, toast]);
  
  const handleCallStore = useCallback(() => {
    if (nearestStore) {
      toast({
        title: "Calling Store",
        description: `Calling ${nearestStore.name}`,
        duration: 2000,
      });
      callStore();
    }
  }, [nearestStore, callStore, toast]);
  
  const handleOneTabNavigation = useCallback(async () => {
    if (nearestStore) {
      // If we already have a store, go directly to navigation
      handleNavigate();
    } else {
      // First find the nearest store, then navigate
      try {
        const store = await findNearest();
        if (store) {
          // We need a small timeout to let the state update
          setTimeout(() => {
            handleNavigate();
          }, 100);
        }
      } catch (err) {
        // Error handled in the hook
      }
    }
  }, [nearestStore, findNearest, handleNavigate]);
  
  // Reset error display after 5 seconds
  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [error]);
  
  // Add pulse effect to attract attention when component mounts
  useEffect(() => {
    // Start pulsing after a short delay
    const timer = setTimeout(() => {
      setPulseEffect(true);
      
      // Stop pulsing after a few seconds
      const stopTimer = setTimeout(() => {
        setPulseEffect(false);
      }, 5000);
      
      return () => clearTimeout(stopTimer);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Auto-find nearest store when the component mounts
  useEffect(() => {
    const autoLocate = async () => {
      try {
        await findNearest();
      } catch (err) {
        // Already handled in the hook
      }
    };
    
    autoLocate();
  }, [findNearest]);
  
  return (
    <>
      <div className={`fixed bottom-6 sm:right-6 right-4 z-40 flex flex-col items-end ${className}`}>
        <AnimatePresence>
          {showError && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className="mb-4 bg-red-800 px-4 py-3 rounded-lg shadow-lg text-sm text-white border border-red-600 flex items-center"
            >
              <span>{error}</span>
              <button 
                className="ml-3 p-1 rounded-full bg-red-700 hover:bg-red-600 text-white transition-colors"
                onClick={() => setShowError(false)}
              >
                <X size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {expanded && nearestStore && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1, transition: { type: "spring", damping: 25, stiffness: 300 } }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className="mb-4 bg-black p-4 rounded-lg shadow-xl max-w-xs sm:w-full w-[calc(100vw-2rem)] border border-primary/30 overflow-hidden relative"
            >
              {/* Decorative element */}
              <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-gradient-to-br from-primary/30 to-red-600/30 blur-xl" />
              
              <div className="flex items-start gap-3 relative">
                <div className="p-2 rounded-full bg-primary/20 text-primary">
                  <MapPin size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">{nearestStore.name}</h3>
                  <p className="text-gray-400 text-xs mt-1">{nearestStore.address}</p>
                  <p className="text-gray-400 text-xs">{nearestStore.city}, {nearestStore.state} {nearestStore.zip}</p>
                  
                  {formattedDistance && (
                    <span className="inline-block mt-2 text-xs font-medium bg-zinc-800 text-gray-300 px-2 py-1 rounded-md border border-zinc-700">
                      {formattedDistance} away
                    </span>
                  )}
                  
                  <div className="mt-2 text-xs text-gray-300 flex items-center gap-1">
                    <Clock size={12} className="text-gray-400" />
                    <span>{nearestStore.hours}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-2">
                <motion.button
                  onClick={handleNavigate}
                  className="flex items-center justify-center gap-1 bg-gradient-to-r from-primary to-red-600 text-white text-sm px-3 py-2 rounded-md overflow-hidden relative group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Button background effect */}
                  <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                  
                  <Navigation size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
                  <span>Directions</span>
                </motion.button>
                
                <motion.button
                  onClick={handleCallStore}
                  className="flex items-center justify-center gap-1 bg-zinc-800 hover:bg-zinc-700 text-white text-sm px-3 py-2 rounded-md border border-zinc-700"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Phone size={15} />
                  <span>Call</span>
                </motion.button>
              </div>
              
              <div className="mt-3 flex items-center justify-end">
                <motion.button
                  onClick={() => setExpanded(false)}
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>
              </div>
              
              {/* Decorative element */}
              <div className="absolute -bottom-10 -right-10 w-20 h-20 rounded-full bg-gradient-to-tl from-primary/30 to-red-600/30 blur-xl" />
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.button
          onClick={nearestStore ? handleOneTabNavigation : handleFindNearest}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`${
            pulseEffect ? 'animate-pulse' : ''
          } bg-gradient-to-r from-primary to-red-600 text-white rounded-full p-4 shadow-xl flex items-center justify-center overflow-hidden relative group z-10`}
          aria-label="Find nearest store"
        >
          {/* Button background effect */}
          <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
          
          {loading ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <span className="flex items-center gap-2 font-medium">
              <Navigation className="h-6 w-6 group-hover:rotate-12 transition-transform duration-200" />
              <span className="hidden md:inline">{nearestStore ? 'Go to Nearest' : 'Find Nearest'}</span>
            </span>
          )}
          
          {/* Ripple effect for the pulse animation */}
          {pulseEffect && (
            <span className="absolute inset-0 rounded-full animate-ping-slow bg-white opacity-30"></span>
          )}
        </motion.button>
      </div>
    </>
  );
};

export default NearestStoreButton;