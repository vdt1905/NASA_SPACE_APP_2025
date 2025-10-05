// components/AirQuality.jsx
import React from 'react';
import { motion } from 'framer-motion';

const AirQuality = ({ isVisible }) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      <div className="text-center text-white p-8">
        <motion.h3 
          className="text-2xl font-bold mb-4"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          Air Quality Index
        </motion.h3>
        <motion.div
          className="text-5xl font-bold mb-4 text-red-400"
          initial={{ scale: 0 }}
          animate={isVisible ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          156
        </motion.div>
        <motion.div
          className="text-lg text-gray-300"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Unhealthy
        </motion.div>
      </div>
    </div>
  );
};

export default AirQuality;