// src/components/scenes/Scene3.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Scene3 = () => {
  const [activeThreat, setActiveThreat] = useState(0);

  const threats = [
    {
      title: "Overfishing",
      description: "90% of global fish stocks are fully exploited or overfished, threatening marine biodiversity and food security.",
      icon: "🎣",
      color: "from-red-500/20 to-red-600/20"
    },
    {
      title: "Pollution",
      description: "8 million tons of plastic enter our oceans each year, harming marine life and ecosystems.",
      icon: "🗑️",
      color: "from-orange-500/20 to-orange-600/20"
    },
    {
      title: "Climate Change",
      description: "Ocean temperatures are rising, causing coral bleaching and disrupting marine habitats worldwide.",
      icon: "🌡️",
      color: "from-yellow-500/20 to-yellow-600/20"
    }
  ];

  return (
    <div className="relative h-full flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 to-emerald-800/60"></div>
      
      <div className="relative z-10 text-white px-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            Threats to Our Oceans
          </h2>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
            Human activities are putting unprecedented pressure on marine ecosystems, 
            threatening the very foundation of life on Earth.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {threats.map((threat, index) => (
            <motion.button
              key={threat.title}
              onClick={() => setActiveThreat(index)}
              className={`p-6 rounded-2xl text-left transition-all duration-300 ${
                activeThreat === index 
                  ? `bg-gradient-to-br ${threat.color} border-2 border-white/30 shadow-2xl scale-105` 
                  : 'bg-white/10 border border-white/10 hover:bg-white/20'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-4xl mb-4">{threat.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{threat.title}</h3>
              <p className="text-white/80 leading-relaxed">{threat.description}</p>
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeThreat}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p className="text-lg text-white/60">
              Select a threat to learn more about its impact on marine ecosystems
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Scene3;