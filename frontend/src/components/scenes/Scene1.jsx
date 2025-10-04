// src/components/scenes/Scene1.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Scene1 = () => {
  return (
    <div className="relative h-full flex items-center justify-center">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/20"></div>
        {/* Animated background patterns */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [1, 2, 1],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center text-white px-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
          >
            The Ocean's Story
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            Journey through the depths of our blue planet and discover the vital role 
            marine ecosystems play in sustaining life on Earth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="flex flex-col items-center"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mb-4"
            >
              <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                <motion.div
                  animate={{ y: [0, 16, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1 h-3 bg-white rounded-full mt-2"
                />
              </div>
            </motion.div>
            <p className="text-sm opacity-80">Scroll to dive deeper</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Scene1;