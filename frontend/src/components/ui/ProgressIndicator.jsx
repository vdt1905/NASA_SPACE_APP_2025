// src/components/ui/ProgressIndicator.jsx
import React from 'react';
import { motion } from 'framer-motion';

const ProgressIndicator = ({ progress, currentSection }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
      className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block"
    >
      <div className="flex flex-col items-center space-y-4">
        {[1, 2, 3, 4, 5].map((section) => (
          <motion.div
            key={section}
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
              currentSection === section
                ? 'bg-white border-white scale-125'
                : currentSection > section
                ? 'bg-white/50 border-white/50'
                : 'border-white/30'
            }`}
            whileHover={{ scale: 1.3 }}
          />
        ))}
        
        <div className="w-0.5 h-20 bg-white/30 mt-2"></div>
        
        <motion.div
          className="text-white/60 text-sm font-mono"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {currentSection}/5
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProgressIndicator;