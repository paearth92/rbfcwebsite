import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import { LogIn, X, User, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../hooks/use-auth-context';

type LoginFormData = {
  email: string;
  password: string;
};

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LoginFormData>();
  
  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Trim whitespace from email and password
      const trimmedEmail = data.email.trim();
      const trimmedPassword = data.password.trim();
      
      await login(trimmedEmail, trimmedPassword);
      reset();
      onClose();
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle modal closing
  const handleClose = () => {
    reset();
    setError(null);
    onClose();
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-xl shadow-2xl z-[60] w-[95%] max-w-md overflow-hidden mx-auto my-4 border border-primary/20"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              transition: { 
                type: "spring", 
                damping: 20, 
                stiffness: 300 
              }
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.9, 
              y: 20,
              transition: { 
                duration: 0.2 
              }
            }}
          >
            {/* Animated top design element */}
            <motion.div 
              className="absolute -top-12 -left-12 w-40 h-40 rounded-full bg-gradient-to-br from-primary to-red-600 opacity-90"
              initial={{ scale: 0 }}
              animate={{ 
                scale: 1,
                transition: { delay: 0.2, duration: 0.5 }
              }}
            />
            
            {/* Header */}
            <div className="relative flex items-center justify-between p-5 border-b border-gray-800">
              <motion.h2 
                className="text-2xl font-bold text-white"
                initial={{ x: -20, opacity: 0 }}
                animate={{ 
                  x: 0, 
                  opacity: 1,
                  transition: { delay: 0.1, duration: 0.3 }
                }}
              >
                Admin Login
              </motion.h2>
              <motion.button
                onClick={onClose}
                className="rounded-full p-2 bg-gray-800/50 text-white hover:bg-primary/80 transition-all hover:rotate-90 duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={20} />
              </motion.button>
            </div>
            
            {/* Body */}
            <div className="relative p-6 pt-5 bg-gradient-to-br from-zinc-900 to-black">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Error message */}
                <AnimatePresence>
                  {error && (
                    <motion.div 
                      className="mb-5 p-3 bg-red-900/40 border border-red-500/50 text-red-300 rounded-lg text-sm flex items-center space-x-2"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <span>{error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Email field */}
                <motion.div 
                  className="mb-5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: 0.2 }
                  }}
                >
                  <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
                    Email
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-red-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-primary transition-colors" size={18} />
                      <input
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                          },
                          // Automatically trim whitespace
                          setValueAs: (value: string) => value.trim()
                        })}
                        type="email"
                        id="email"
                        className="w-full pl-10 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-white text-base transition-all"
                        style={{ fontSize: '16px' }}
                        placeholder="Enter your email"
                        autoCapitalize="off"
                        autoCorrect="off"
                        defaultValue="Reporting@rbfc.us" // Pre-fill admin email
                      />
                    </div>
                  </div>
                  
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p 
                        className="mt-2 text-sm text-red-400"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        {errors.email.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
                
                {/* Password field */}
                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: 0.3 }
                  }}
                >
                  <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-2">
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-red-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-primary transition-colors" size={18} />
                      <input
                        {...register('password', { 
                          required: 'Password is required',
                          // Automatically trim whitespace
                          setValueAs: (value: string) => value.trim()
                        })}
                        type="password"
                        id="password"
                        className="w-full pl-10 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-white text-base transition-all"
                        style={{ fontSize: '16px' }}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        defaultValue="Boostmobile!23" // Pre-fill admin password
                      />
                    </div>
                  </div>
                  
                  <AnimatePresence>
                    {errors.password && (
                      <motion.p 
                        className="mt-2 text-sm text-red-400"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        {errors.password.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
                
                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="relative w-full bg-gradient-to-r from-primary to-red-600 text-white font-medium py-3.5 px-4 rounded-lg flex items-center justify-center text-base mt-6 overflow-hidden group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: 0.4 }
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Button background effect */}
                  <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
                  
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Logging In...</span>
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <span className="mr-2">Sign In</span>
                      <ArrowRight className="group-hover:translate-x-1 transition-transform duration-200" size={18} />
                    </span>
                  )}
                </motion.button>
              </form>
              
              {/* Decorative elements */}
              <motion.div 
                className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-tl from-primary/50 to-red-600/50 blur-xl"
                initial={{ scale: 0 }}
                animate={{ 
                  scale: 1,
                  transition: { delay: 0.3, duration: 0.5 }
                }}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;