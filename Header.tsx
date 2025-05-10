import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, LogIn, LogOut, User, ChevronDown } from "lucide-react";
import { useAuth } from "../hooks/use-auth-context";
import LoginModal from "./LoginModal";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "../hooks/use-mobile";

const Header = () => {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [activeHover, setActiveHover] = useState<string | null>(null);
  const { isAdmin, logout } = useAuth();
  const isMobile = useIsMobile();
  const headerRef = useRef<HTMLElement>(null);
  
  // Track scroll for header appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Disable body scroll when menu is open
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  // Close mobile menu when navigating
  useEffect(() => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  }, [location]);

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleLogoutClick = () => {
    logout();
  };

  // Animations for menu button
  const buttonVariants = {
    open: { rotate: 90, scale: 1.1 },
    closed: { rotate: 0, scale: 1 }
  };
  
  // Animation for the entire header
  const headerVariants = {
    visible: { 
      y: 0,
      opacity: 1,
    },
    hidden: { 
      y: -100,
      opacity: 0,
    }
  };
  
  // Track last scroll position to determine scroll direction
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  
  useEffect(() => {
    const controlHeader = () => {
      if (typeof window !== 'undefined') {
        // Hide header only when scrolling down and already scrolled past 150px
        if (window.scrollY > 150) {
          if (window.scrollY > lastScrollY) {
            // Scrolling down
            setIsHeaderVisible(false);
          } else {
            // Scrolling up
            setIsHeaderVisible(true);
          }
        } else {
          setIsHeaderVisible(true);
        }
        
        // Update the last scroll position
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlHeader);
      
      // Cleanup
      return () => {
        window.removeEventListener('scroll', controlHeader);
      };
    }
  }, [lastScrollY]);

  return (
    <>
      <motion.header
        ref={headerRef}
        initial="visible"
        animate={isHeaderVisible ? "visible" : "hidden"}
        variants={headerVariants}
        transition={{ duration: 0.3 }}
        className={`fixed w-full z-50 ${
          isScrolled 
            ? "bg-white/90 backdrop-blur-md py-2 shadow-lg" 
            : "bg-transparent py-3 md:py-4"
        } transition-all duration-300`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Link href="/" className="flex items-center">
                <img 
                  src="https://i.postimg.cc/G2GphDJf/RBFC-LOGO.png" 
                  alt="RB First Connect Logo" 
                  className={`transition-all ${isScrolled ? "h-10" : "h-11 md:h-12"} object-contain`}
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center">
              <motion.div 
                className="flex space-x-1 lg:space-x-2 items-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, staggerChildren: 0.1, delayChildren: 0.2 }}
              >
                <NavLink href="/" label="Home" isScrolled={isScrolled} activeHover={activeHover} setActiveHover={setActiveHover} />
                <NavLink href="/about" label="About Us" isScrolled={isScrolled} activeHover={activeHover} setActiveHover={setActiveHover} />
                <NavLink href="/stores" label="Stores" isScrolled={isScrolled} activeHover={activeHover} setActiveHover={setActiveHover} />
                <NavLink href="/careers" label="Careers" isScrolled={isScrolled} activeHover={activeHover} setActiveHover={setActiveHover} />
                <NavLink href="/contact" label="Contact" isScrolled={isScrolled} activeHover={activeHover} setActiveHover={setActiveHover} />
                
                <div className="mx-2 h-5 w-px bg-gray-300/50"></div>
                
                {/* Auth Button */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {isAdmin ? (
                    <motion.button 
                      onClick={handleLogoutClick}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-charcoal transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <LogOut className="h-4 w-4" />
                      <span className="text-sm font-medium">Logout</span>
                    </motion.button>
                  ) : (
                    <motion.button 
                      onClick={handleLoginClick}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/90 to-red-600/90 text-white hover:from-primary hover:to-red-600 transition-all hover:shadow-md"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <LogIn className="h-4 w-4" />
                      <span className="text-sm font-medium">Login</span>
                    </motion.button>
                  )}
                </motion.div>
              </motion.div>
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/90 shadow-md text-charcoal"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
              variants={buttonVariants}
              animate={isMobileMenuOpen ? 'open' : 'closed'}
              transition={{ duration: 0.3 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileMenu}
            />
          )}
        </AnimatePresence>

        {/* Mobile Menu Panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden fixed top-0 right-0 w-[85%] max-w-xs h-screen bg-white z-50 shadow-2xl flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className="flex justify-end p-4">
                <button
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100"
                  onClick={toggleMobileMenu}
                >
                  <X className="h-5 w-5 text-charcoal" />
                </button>
              </div>
              
              <div className="p-6 flex flex-col space-y-1 flex-grow">
                <div className="mb-6">
                  <img 
                    src="https://i.postimg.cc/G2GphDJf/RBFC-LOGO.png" 
                    alt="RB First Connect Logo" 
                    className="h-10 object-contain"
                  />
                </div>
                
                <MobileNavLink href="/" label="Home" />
                <MobileNavLink href="/about" label="About Us" />
                <MobileNavLink href="/stores" label="Stores" />
                <MobileNavLink href="/careers" label="Careers" />
                <MobileNavLink href="/contact" label="Contact" />
              </div>
              
              {/* Mobile Auth Section */}
              <div className="p-6 pt-0 mt-auto border-t border-gray-100">
                {isAdmin ? (
                  <>
                    <div className="mb-3 text-sm flex items-center gap-1.5 text-green-600">
                      <User className="h-4 w-4" />
                      <span>Admin mode active</span>
                    </div>
                    <button 
                      onClick={handleLogoutClick}
                      className="w-full flex items-center justify-center gap-2 bg-gray-100 text-charcoal rounded-full py-3 hover:bg-gray-200 transition-colors"
                    >
                      <LogOut className="h-5 w-5" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={handleLoginClick}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-red-600 text-white rounded-full py-3 hover:shadow-lg transition-all"
                  >
                    <LogIn className="h-5 w-5" />
                    <span className="font-medium">Login</span>
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
      
      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
};

interface NavLinkProps {
  href: string;
  label: string;
  isScrolled?: boolean;
  activeHover?: string | null;
  setActiveHover?: (label: string | null) => void;
}

const NavLink = ({ 
  href, 
  label, 
  isScrolled = false,
  activeHover,
  setActiveHover
}: NavLinkProps) => {
  const [location] = useLocation();
  const isActive = location === href;
  
  const handleMouseEnter = () => {
    if (setActiveHover) setActiveHover(label);
  };
  
  const handleMouseLeave = () => {
    if (setActiveHover) setActiveHover(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={href}
        className={`font-medium px-3 py-2 rounded-full transition-all duration-200 block relative ${
          isActive 
            ? "text-white bg-gradient-to-r from-primary to-red-600 shadow-md" 
            : activeHover === label
              ? "text-primary bg-gray-100" 
              : isScrolled
                ? "text-charcoal hover:text-primary hover:bg-gray-50"
                : "text-white hover:text-primary hover:bg-white/10"
        }`}
      >
        <span className="relative z-10">{label}</span>
      </Link>
    </motion.div>
  );
};

const MobileNavLink = ({ href, label }: NavLinkProps) => {
  const [location] = useLocation();
  const isActive = location === href;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        delay: label === "Home" ? 0.1 : 
              label === "About Us" ? 0.2 :
              label === "Stores" ? 0.3 :
              label === "Careers" ? 0.4 : 0.5
      }}
    >
      <Link
        href={href}
        className={`flex items-center justify-between py-3.5 px-3 rounded-xl font-medium transition-all ${
          isActive 
            ? "text-white bg-gradient-to-r from-primary to-red-600 shadow-sm" 
            : "text-charcoal hover:bg-gray-100"
        }`}
      >
        <span>{label}</span>
        {isActive && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="h-2 w-2 rounded-full bg-white"
          />
        )}
      </Link>
    </motion.div>
  );
};

export default Header;
