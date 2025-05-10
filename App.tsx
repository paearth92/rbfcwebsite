import { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";
import { AuthProvider } from "./hooks/use-auth-context";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";
import SimpleCursor from "./components/animations/SimpleCursor";
import NearestStoreButton from "./components/NearestStoreButton";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Stores from "./pages/Stores";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import NotFound from "@/pages/not-found";

// Preloader component for initial page load animation
const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500); // Give a slight delay before completing
          return 100;
        }
        return newProgress;
      });
    }, 150);
    
    return () => clearInterval(interval);
  }, [onComplete]);
  
  return (
    <motion.div 
      className="fixed inset-0 bg-charcoal z-50 flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <motion.div
        className="w-40 h-40 relative mb-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#333"
            strokeWidth="5"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#e72c33"
            strokeWidth="5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: progress / 100 }}
            transition={{ duration: 0.1, ease: "linear" }}
            style={{
              rotate: -90,
              transformOrigin: "center",
              strokeDasharray: "283",
              strokeDashoffset: "0",
            }}
          />
        </svg>
        
        <motion.div 
          className="absolute inset-0 flex items-center justify-center text-white font-medium text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {Math.round(progress)}%
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="text-2xl font-bold text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        RB First Connect
      </motion.div>
      
      <motion.div 
        className="text-gray-400 mt-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Loading your experience...
      </motion.div>
    </motion.div>
  );
};

function Router() {
  const [location] = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Switch location={location} key={location}>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/stores" component={Stores} />
        <Route path="/careers" component={Careers} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

// Page transition wrapper
const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.4, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

function App() {
  const [loading, setLoading] = useState(true);
  const [, setLocation] = useLocation();
  
  // Handle page transitions
  useEffect(() => {
    // Add a class to the body when loading
    if (loading) {
      document.body.classList.add('loading');
    } else {
      document.body.classList.remove('loading');
    }
    
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, [loading]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <AnimatePresence mode="wait">
            {loading && (
              <Preloader onComplete={() => setLoading(false)} />
            )}
          </AnimatePresence>
          
          <div className={loading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
            <ScrollToTop />
            <SimpleCursor />
            <Header />
            <PageTransition>
              <main>
                <Router />
              </main>
            </PageTransition>
            <Footer />
            <ChatWidget />
            <NearestStoreButton />
          </div>
          
          <Toaster />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
