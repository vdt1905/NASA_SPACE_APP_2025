import React from 'react';
import { motion } from 'framer-motion';

const SolarActivity = ({ isVisible }) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-900 via-yellow-900 to-red-900">
      <div className="text-center text-white p-8">
        <motion.h3 
          className="text-2xl font-bold mb-4"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          Solar Activity Index
        </motion.h3>
        <motion.div
          className="text-5xl font-bold mb-4 text-yellow-400"
          initial={{ scale: 0 }}
          animate={isVisible ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          147 sfu
        </motion.div>
        <motion.div
          className="text-lg text-yellow-300"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          10.7 cm Radio Flux
        </motion.div>
      </div>
    </div>
  );
};

export default SolarActivity;