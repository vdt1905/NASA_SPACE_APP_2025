// src/components/scenes/Scene2.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Scene2 = () => {
  const stats = [
    { number: "71%", label: "Earth's Surface", description: "Covered by oceans" },
    { number: "97%", label: "Earth's Water", description: "Found in oceans" },
    { number: "50-80%", label: "Oxygen Production", description: "From marine life" }
  ];

  return (
    <div className="relative h-full flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-teal-900/80 to-emerald-800/60"></div>
      
      {/* Animated waves */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-8 bg-white/10"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-2 left-0 right-0 h-6 bg-white/5"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        />
      </div>

      <div className="relative z-10 text-white px-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            Our Blue Planet
          </h2>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
            The ocean is the foundation of all life, regulating our climate and providing 
            resources that sustain billions of people worldwide.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
            >
              <div className="text-4xl md:text-5xl font-bold text-teal-300 mb-2">
                {stat.number}
              </div>
              <div className="text-xl font-semibold mb-2">{stat.label}</div>
              <div className="text-white/80">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Scene2;