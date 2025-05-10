import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useAnimation } from "framer-motion";
import { ArrowRight, ArrowDown, ChevronDown, Store, Map, History, Users } from "lucide-react";
import { Link } from "wouter";
import Phone3D from "../components/animations/Phone3D";
import LottieAnimation from "../components/animations/LottieAnimation";
import ParticleNetwork from "../components/animations/ParticleNetwork";
import SplitTextReveal from "../components/animations/SplitTextReveal";
import ScrollTriggerAnimation from "../components/animations/ScrollTriggerAnimation";
import ParallaxCard from "../components/animations/ParallaxCard";
import MagneticButton from "../components/animations/MagneticButton";
import FeatureCard from "../components/FeatureCard";
import EditableContent from "../components/EditableContent";
import AnimatedCounter from "../components/AnimatedCounter";
import { features } from "../data/features";

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const phoneAnimationRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorControls = useAnimation();
  
  // Track scroll progress for parallax effects
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 500]);
  const parallaxYReverse = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.3]);
  const springY = useSpring(parallaxY, { stiffness: 50, damping: 15 });
  const springYReverse = useSpring(parallaxYReverse, { stiffness: 50, damping: 15 });
  
  // Handle scroll detection for animation triggers
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
      
      // Fade out scroll indicator when user starts scrolling
      if (scrollTop > 50) {
        scrollIndicatorControls.start({
          opacity: 0,
          y: 20,
          transition: { duration: 0.3 }
        });
      } else {
        scrollIndicatorControls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.3 }
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollIndicatorControls]);
  
  // Phone animation on hover
  const handlePhoneHover = () => {
    if (phoneAnimationRef.current) {
      const phoneElement = phoneAnimationRef.current;
      phoneElement.style.transform = 'translateY(-10px) rotate(5deg)';
      phoneElement.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    }
  };
  
  const handlePhoneLeave = () => {
    if (phoneAnimationRef.current) {
      const phoneElement = phoneAnimationRef.current;
      phoneElement.style.transform = 'translateY(0) rotate(0)';
    }
  };
  
  return (
    <>
      {/* Hero Section with Particle Background */}
      <section 
        id="home" 
        ref={heroRef}
        className="pt-24 md:pt-32 relative min-h-screen flex items-center bg-gradient-to-br from-[#15191E] via-[#1F252E] to-[#2A303A] overflow-hidden"
      >
        {/* Particle animation background */}
        <div className="absolute inset-0 opacity-80">
          <ParticleNetwork 
            particleCount={100} 
            speed={0.3} 
            color="#e72c33" 
            lineColor="rgba(231, 44, 51, 0.2)"
          />
        </div>
        
        <div className="container mx-auto px-4 py-12 md:py-24 flex flex-col-reverse md:flex-row items-center relative z-10">
          <motion.div 
            className="md:w-1/2 mt-12 mb-12 md:mt-0 md:mb-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1] 
            }}
          >
            <SplitTextReveal 
              text="Connecting Communities Through Technology"
              highlightWords={["Connecting", "Technology"]}
              highlightColor="#e72c33"
              textColor="white"
              className="text-4xl md:text-6xl font-poppins font-bold mb-8 leading-tight"
              tag="h1"
            />
            
            <motion.div 
              className="text-xl mb-10 text-gray-300 max-w-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <EditableContent 
                id="hero-description" 
                initialContent="Your local Boost Mobile dealer with 80+ stores across 5 states, bringing reliable mobile services to your community."
              >
                <p>Your local Boost Mobile dealer with 80+ stores across 5 states, bringing reliable mobile services to your community.</p>
              </EditableContent>
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <MagneticButton strength={20}>
                <Link href="/stores" className="px-8 py-4 rounded-md bg-primary text-white font-medium flex items-center justify-center whitespace-nowrap">
                  Find a Store
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </MagneticButton>
              
              <MagneticButton strength={15}>
                <Link href="/careers" className="px-8 py-4 rounded-md border-2 border-white text-white font-medium flex items-center justify-center hover:bg-white/5 transition-colors">
                  Join Our Team
                </Link>
              </MagneticButton>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 relative z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ y: springYReverse }}
            ref={phoneAnimationRef}
            onMouseEnter={handlePhoneHover}
            onMouseLeave={handlePhoneLeave}
          >
            <motion.div 
              className="relative"
              animate={{ 
                rotate: [0, 2, 0, -2, 0],
                y: [0, -5, 0, -5, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 6,
                ease: "easeInOut"
              }}
            >
              <Phone3D className="h-72 w-72 md:h-[450px] md:w-[450px] mx-auto" />
              
              {/* Glow effect */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-primary/20 blur-3xl -z-10"></div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          animate={scrollIndicatorControls}
          initial={{ opacity: 1, y: 0 }}
        >
          <span className="text-white/70 text-sm mb-2">Scroll to explore</span>
          <motion.div
            animate={{ 
              y: [0, 8, 0],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5 
            }}
          >
            <ChevronDown className="text-primary h-6 w-6" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats section with animated counters */}
      <section className="py-20 bg-gradient-to-b from-black to-zinc-900 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full bg-primary/10 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-red-600/10 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
          
          {/* Animated particles */}
          <div className="absolute inset-0 opacity-30">
            <ParticleNetwork 
              color="#e72c33" 
              particleCount={30} 
              speed={0.3} 
              interactive={true}
            />
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Title */}
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Our Impact by the Numbers
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-primary to-red-600 mx-auto mb-6 rounded-full"></div>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                RB First Connect has grown to become one of the leading authorized Boost Mobile dealers, with an ever-expanding reach across the nation.
              </p>
            </motion.div>
          </div>

          {/* Stats Cards - Now in a circular layout on desktop */}
          <div className="hidden md:flex justify-center items-center relative h-[500px]">
            {/* Center element */}
            <motion.div 
              className="absolute z-10 w-40 h-40 rounded-full bg-gradient-to-br from-primary to-red-600 flex items-center justify-center shadow-xl"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, type: "spring" }}
            >
              <img 
                src="https://i.postimg.cc/G2GphDJf/RBFC-LOGO.png" 
                alt="RB First Connect Logo" 
                className="w-20 h-20 object-contain" 
              />
            </motion.div>
            
            {/* Circular layout stats */}
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4"
              initial={{ y: -50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-gradient-to-br from-zinc-800 to-black p-6 rounded-xl border border-primary/20 shadow-[0_0_15px_rgba(231,44,51,0.3)] backdrop-blur-sm">
                <div className="text-white">
                  <span className="block text-3xl md:text-5xl font-bold font-poppins">
                    80+
                  </span>
                  <span className="text-gray-300">Retail Stores</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="absolute right-1/4 top-1/4"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bg-gradient-to-br from-zinc-800 to-black p-6 rounded-xl border border-primary/20 shadow-[0_0_15px_rgba(231,44,51,0.3)] backdrop-blur-sm">
                <div className="text-white">
                  <span className="block text-3xl md:text-5xl font-bold font-poppins">
                    5
                  </span>
                  <span className="text-gray-300">States</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 -mb-4"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-gradient-to-br from-zinc-800 to-black p-6 rounded-xl border border-primary/20 shadow-[0_0_15px_rgba(231,44,51,0.3)] backdrop-blur-sm">
                <div className="text-white">
                  <span className="block text-3xl md:text-5xl font-bold font-poppins">
                    50K+
                  </span>
                  <span className="text-gray-300">Happy Customers</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="absolute left-1/4 top-1/4"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="bg-gradient-to-br from-zinc-800 to-black p-6 rounded-xl border border-primary/20 shadow-[0_0_15px_rgba(231,44,51,0.3)] backdrop-blur-sm">
                <div className="text-white">
                  <span className="block text-3xl md:text-5xl font-bold font-poppins">
                    15+
                  </span>
                  <span className="text-gray-300">Years of Service</span>
                </div>
              </div>
            </motion.div>
            
            {/* Connecting lines */}
            <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 500 500">
              <motion.path 
                d="M250,250 L250,100" 
                stroke="url(#lineGradient)" 
                strokeWidth="2" 
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.6 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.8 }}
              />
              <motion.path 
                d="M250,250 L375,175" 
                stroke="url(#lineGradient)" 
                strokeWidth="2" 
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.6 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 1.0 }}
              />
              <motion.path 
                d="M250,250 L250,400" 
                stroke="url(#lineGradient)" 
                strokeWidth="2" 
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.6 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 1.2 }}
              />
              <motion.path 
                d="M250,250 L125,175" 
                stroke="url(#lineGradient)" 
                strokeWidth="2" 
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.6 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 1.4 }}
              />
              
              {/* Gradient definition */}
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#e72c33" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ff4e57" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          {/* Mobile layout - vertical stack with animations */}
          <div className="md:hidden grid grid-cols-1 gap-8">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-zinc-900 to-black rounded-xl overflow-hidden border border-primary/20 shadow-lg"
            >
              <div className="relative p-6">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary to-red-600 rounded-full flex items-center justify-center">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className="w-7 h-7 text-white"
                      >
                        <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                        <path d="M3 9V5a2 2 0 0 1 2-2h2" />
                        <path d="M9 3h2" />
                        <path d="M15 3h2a2 2 0 0 1 2 2v4" />
                        <path d="M9 14v2" />
                        <path d="M15 14v2" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-primary">
                        <span className="block text-3xl font-bold">80+</span>
                      </h3>
                      <p className="text-zinc-400">Retail Stores</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-r from-zinc-900 to-black rounded-xl overflow-hidden border border-primary/20 shadow-lg"
            >
              <div className="relative p-6">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary to-red-600 rounded-full flex items-center justify-center">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className="w-7 h-7 text-white"
                      >
                        <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                        <line x1="9" x2="9" y1="3" y2="18" />
                        <line x1="15" x2="15" y1="6" y2="21" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-primary">
                        <span className="block text-3xl font-bold">5</span>
                      </h3>
                      <p className="text-zinc-400">States</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gradient-to-r from-zinc-900 to-black rounded-xl overflow-hidden border border-primary/20 shadow-lg"
            >
              <div className="relative p-6">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary to-red-600 rounded-full flex items-center justify-center">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className="w-7 h-7 text-white"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-primary">
                        <span className="block text-3xl font-bold">15+</span>
                      </h3>
                      <p className="text-zinc-400">Years of Service</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-gradient-to-r from-zinc-900 to-black rounded-xl overflow-hidden border border-primary/20 shadow-lg"
            >
              <div className="relative p-6">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary to-red-600 rounded-full flex items-center justify-center">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className="w-7 h-7 text-white"
                      >
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-primary">
                        <span className="block text-3xl font-bold">50K+</span>
                      </h3>
                      <p className="text-zinc-400">Happy Customers</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section with Background Video */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Background Video */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <video 
            className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover transform -translate-x-1/2 -translate-y-1/2"
            autoPlay 
            muted 
            loop 
            playsInline
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-group-of-friends-using-their-phones-4862-large.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <motion.div 
                className="relative rounded-xl overflow-hidden shadow-2xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {/* Main video container with phone frame effect */}
                <div className="relative aspect-[9/16] max-w-[350px] mx-auto">
                  {/* Phone border overlay */}
                  <div className="absolute inset-0 rounded-[24px] border-[8px] border-black z-20 shadow-lg"></div>
                  
                  {/* Phone screen content - using nested video */}
                  <div className="absolute top-[8px] right-[8px] bottom-[8px] left-[8px] rounded-[18px] overflow-hidden z-10">
                    <video 
                      className="w-full h-full object-cover"
                      autoPlay 
                      muted 
                      loop 
                      playsInline
                    >
                      <source src="https://assets.mixkit.co/videos/preview/mixkit-happy-people-scanning-their-phones-4832-large.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  
                  {/* Phone notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[100px] h-[24px] bg-black rounded-b-xl z-30"></div>
                  
                  {/* Animated pulse effect */}
                  <motion.div 
                    className="absolute inset-[-1px] rounded-[28px] border-2 border-primary z-40"
                    animate={{
                      boxShadow: [
                        '0 0 0 rgba(231, 44, 51, 0.4)',
                        '0 0 15px rgba(231, 44, 51, 0.6)',
                        '0 0 0 rgba(231, 44, 51, 0.4)'
                      ]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      ease: "easeInOut"
                    }}
                  ></motion.div>
                </div>
                
                {/* Mission keywords overlaid on the video */}
                <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-between py-8 z-20">
                  <motion.div 
                    className="bg-primary/90 px-4 py-2 rounded-full text-white font-medium shadow-lg"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    Accessible
                  </motion.div>
                  
                  <div className="flex justify-between w-full px-5">
                    <motion.div 
                      className="bg-white/90 px-4 py-2 rounded-full text-primary font-medium shadow-lg"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      Affordable
                    </motion.div>
                    
                    <motion.div 
                      className="bg-white/90 px-4 py-2 rounded-full text-primary font-medium shadow-lg"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                    >
                      Reliable
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    className="bg-primary/90 px-5 py-3 rounded-full text-white font-medium shadow-lg flex items-center gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  >
                    <span className="w-3 h-3 rounded-full bg-white"></span>
                    Boost Mobile Dealer
                  </motion.div>
                </div>
              </motion.div>
            </div>
            
            <ScrollTriggerAnimation animation="slideIn" delay={0.3} className="md:w-1/2 md:pl-16">
              <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg">
                <SplitTextReveal 
                  text="Our Mission"
                  className="text-3xl md:text-5xl font-poppins font-bold mb-8 text-primary"
                  tag="h2"
                  delay={0.2}
                />
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <div className="text-lg mb-6 text-gray-800">
                    <EditableContent 
                      id="mission-paragraph-1" 
                      initialContent="At RB First Connect, we believe in the power of technology to bring communities together. Our mission is to provide accessible, affordable, and reliable mobile services to everyone."
                    >
                      <p>At RB First Connect, we believe in the power of technology to bring communities together. Our mission is to provide <span className="text-primary font-medium">accessible</span>, <span className="text-primary font-medium">affordable</span>, and <span className="text-primary font-medium">reliable</span> mobile services to everyone.</p>
                    </EditableContent>
                  </div>
                  <div className="text-lg mb-8 text-gray-800">
                    <EditableContent 
                      id="mission-paragraph-2" 
                      initialContent="As an authorized Boost Mobile dealer, we're committed to delivering exceptional service and innovative solutions that keep you connected to what matters most."
                    >
                      <p>As an authorized <span className="text-primary font-medium">Boost Mobile dealer</span>, we're committed to delivering exceptional service and innovative solutions that keep you connected to what matters most.</p>
                    </EditableContent>
                  </div>
                  
                  <MagneticButton strength={15}>
                    <Link 
                      href="/about" 
                      className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors font-medium"
                    >
                      Learn more about us 
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </MagneticButton>
                </motion.div>
              </div>
            </ScrollTriggerAnimation>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-light-gray relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
          <motion.div 
            className="absolute top-[10%] left-[5%] w-64 h-64 rounded-full bg-primary/10"
            animate={{ 
              x: [0, 50, 0], 
              y: [0, 30, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 20,
              ease: "easeInOut"
            }}
          />
          
          <motion.div 
            className="absolute bottom-[20%] right-[10%] w-80 h-80 rounded-full bg-primary/10"
            animate={{ 
              x: [0, -40, 0], 
              y: [0, -30, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 25,
              ease: "easeInOut"
            }}
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <ScrollTriggerAnimation 
            animation="slideUp" 
            className="text-center mb-16"
          >
            <SplitTextReveal 
              text="Why Choose RBFC?"
              className="text-3xl md:text-5xl font-poppins font-bold mb-8"
              tag="h2"
            />
            
            <div className="text-lg text-gray-700 max-w-3xl mx-auto">
              <EditableContent 
                id="features-intro" 
                initialContent="We're more than just a mobile provider - we're your connection to affordable technology and exceptional service."
              >
                <p>We're more than just a mobile provider - we're your connection to affordable technology and exceptional service.</p>
              </EditableContent>
            </div>
          </ScrollTriggerAnimation>
          
          <ScrollTriggerAnimation animation="staggered" staggerChildren={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </ScrollTriggerAnimation>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section 
        className="py-24 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Background with particle effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark">
          <ParticleNetwork 
            color="rgba(255, 255, 255, 0.5)" 
            lineColor="rgba(255, 255, 255, 0.2)"
            particleCount={60}
            speed={0.2}
            particleSize={2}
          />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-6 text-white">
              <EditableContent 
                id="cta-heading" 
                initialContent="Ready to Get Connected?"
                contentType="text"
              >
                Ready to Get Connected?
              </EditableContent>
            </h2>
            <div className="text-xl mb-10 max-w-2xl mx-auto text-white/90">
              <EditableContent 
                id="cta-description" 
                initialContent="Visit your nearest RBFC store today and discover how we can help you stay connected with the latest mobile technology and affordable plans."
              >
                <p>Visit your nearest RBFC store today and discover how we can help you stay connected with the latest mobile technology and affordable plans.</p>
              </EditableContent>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <MagneticButton strength={25}>
                <Link href="/stores" className="bg-white text-primary hover:bg-gray-100 font-medium py-4 px-8 rounded-md transition-colors flex items-center justify-center text-lg">
                  <span>Find a Store</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </MagneticButton>
              
              <MagneticButton strength={20}>
                <Link href="/careers" className="border-2 border-white text-white hover:bg-white/10 font-medium py-4 px-8 rounded-md transition-colors flex items-center justify-center text-lg">
                  <span>Join Our Team</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="ml-2 h-5 w-5"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </Link>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};

export default Home;
