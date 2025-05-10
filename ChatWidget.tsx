import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X } from "lucide-react";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-16 left-0 w-80 bg-black rounded-xl shadow-2xl overflow-hidden border border-primary/20 relative"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              transition: { 
                type: "spring", 
                damping: 20, 
                stiffness: 300 
              }
            }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
          >
            {/* Decorative element */}
            <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-gradient-to-br from-primary/30 to-red-600/30 blur-xl" />
            
            <div className="bg-gradient-to-r from-primary to-red-600 p-4 flex justify-between items-center relative">
              <motion.h3 
                className="text-white font-bold"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1, transition: { delay: 0.1 } }}
              >
                Chat with RBFC
              </motion.h3>
              <motion.button 
                onClick={toggleChat}
                className="rounded-full p-1.5 bg-white/20 text-white hover:bg-white/30 transition-all hover:rotate-90 duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close chat"
              >
                <X size={16} />
              </motion.button>
            </div>
            
            <div className="p-4 h-72 bg-zinc-900 overflow-y-auto">
              <motion.div 
                className="mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
              >
                <div className="bg-gradient-to-r from-primary/20 to-red-600/20 border border-primary/30 rounded-lg p-3 inline-block">
                  <p className="text-sm text-white">
                    Hello! How can we help you today?
                  </p>
                </div>
              </motion.div>
            </div>
            
            <div className="p-4 border-t border-zinc-800 bg-gradient-to-br from-zinc-900 to-black relative">
              <div className="flex">
                <div className="relative flex-1 group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-red-600/20 rounded-l-lg blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 w-full px-3 py-2.5 bg-zinc-800 border border-zinc-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-white text-sm transition-all relative"
                    style={{ fontSize: '14px' }}
                  />
                </div>
                <motion.button
                  className="bg-gradient-to-r from-primary to-red-600 text-white px-4 py-2.5 rounded-r-lg overflow-hidden relative group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="Send message"
                >
                  {/* Button background effect */}
                  <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-20 group-hover:h-20 opacity-10"></span>
                  <span>Send</span>
                </motion.button>
              </div>
            </div>
            
            {/* Decorative element */}
            <div className="absolute -bottom-10 -left-10 w-20 h-20 rounded-full bg-gradient-to-tl from-primary/30 to-red-600/30 blur-xl" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="bg-gradient-to-r from-primary to-red-600 text-white w-16 h-16 rounded-full shadow-xl flex items-center justify-center overflow-hidden relative group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        onClick={toggleChat}
        aria-label="Open chat widget"
      >
        {/* Button background effect */}
        <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
        
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="relative"
        >
          <MessageSquare size={24} className="group-hover:rotate-12 transition-transform duration-200" />
        </motion.div>
      </motion.button>
    </div>
  );
};

export default ChatWidget;
