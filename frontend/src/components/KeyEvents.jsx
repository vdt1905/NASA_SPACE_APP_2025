import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const KeyEvents = () => {
  const [ref, inView] = useInView({ threshold: 0.3 });

  const events = [
    {
      year: 2023,
      title: "Canada's Record Fire Season",
      description: "Largest wildfire season in recorded history, burning over 18 million hectares",
      impact: "Global air quality affected, massive evacuations",
      type: "record"
    },
    {
      year: 2020,
      title: "Australian Black Summer",
      description: "Catastrophic bushfires burned 24 million hectares",
      impact: "3 billion animals affected, 34 human lives lost",
      type: "catastrophe"
    },
    {
      year: 2019,
      title: "Amazon Rainforest Fires",
      description: "Unprecedented fires in the world's largest rainforest",
      impact: "Global climate implications, biodiversity loss",
      type: "climate"
    },
    {
      year: 2018,
      title: "California's Camp Fire",
      description: "Deadliest and most destructive wildfire in California history",
      impact: "85 fatalities, 18,000 structures destroyed",
      type: "urban"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div ref={ref} className="w-full max-w-6xl mx-auto">
      <motion.h2 
        className="text-5xl font-bold text-center mb-12 text-white"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
          Critical Events
        </span>
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {events.map((event, index) => (
          <motion.div
            key={event.year}
            variants={itemVariants}
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-2xl hover:shadow-orange-500/10 transition-all duration-300"
            whileHover={{ 
              scale: 1.02,
              y: -5,
              borderColor: "rgba(249, 115, 22, 0.3)"
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-2xl font-bold text-orange-400">{event.year}</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                event.type === 'record' ? 'bg-red-500/20 text-red-400' :
                event.type === 'catastrophe' ? 'bg-orange-500/20 text-orange-400' :
                event.type === 'climate' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-gray-500/20 text-gray-400'
              }`}>
                {event.type.toUpperCase()}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-3">{event.title}</h3>
            <p className="text-gray-300 mb-4 leading-relaxed">{event.description}</p>
            
            <div className="flex items-center space-x-2 text-sm text-orange-400">
              <span>🔥</span>
              <span>{event.impact}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default KeyEvents;