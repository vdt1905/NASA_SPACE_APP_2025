import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const WildfireTimeline = () => {
  const [selectedYear, setSelectedYear] = useState(2023);
  const [ref, inView] = useInView({ threshold: 0.3 });

  const timelineData = [
    { year: 2023, fires: 68542, area: 2.8, location: 'Canada', intensity: 'Extreme' },
    { year: 2020, fires: 58250, area: 2.2, location: 'USA, Australia', intensity: 'Very High' },
    { year: 2019, fires: 52180, area: 1.8, location: 'Amazon, Australia', intensity: 'High' },
    { year: 2018, fires: 49870, area: 1.6, location: 'California, Greece', intensity: 'High' },
    { year: 2015, fires: 45630, area: 1.4, location: 'Indonesia', intensity: 'Medium' },
    { year: 2010, fires: 41200, area: 1.1, location: 'Russia', intensity: 'Medium' },
    { year: 2005, fires: 38500, area: 0.9, location: 'Portugal', intensity: 'Medium' },
    { year: 2000, fires: 35200, area: 0.7, location: 'USA', intensity: 'Low' },
    { year: 1998, fires: 32150, area: 0.6, location: 'Global', intensity: 'Low' },
  ];

  const selectedData = timelineData.find(data => data.year === selectedYear);

  return (
    <div ref={ref} className="w-full max-w-6xl mx-auto">
      <motion.h2 
        className="text-5xl font-bold text-center mb-12 text-white"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
          25-Year Timeline
        </span>
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Timeline Visualization */}
        <div className="lg:col-span-2">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-2xl">
            <div className="flex justify-between mb-8 overflow-x-auto">
              {timelineData.map((data) => (
                <motion.button
                  key={data.year}
                  onClick={() => setSelectedYear(data.year)}
                  className={`px-4 py-2 rounded-lg mx-1 min-w-20 transition-all duration-300 ${
                    selectedYear === data.year
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {data.year}
                </motion.button>
              ))}
            </div>

            {/* Animated Map/Chart Area */}
            <div className="h-64 bg-black/30 rounded-xl border border-white/10 p-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedYear}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                  className="h-full flex items-center justify-center"
                >
                  <div className="text-center">
                    <div className="text-6xl font-bold text-orange-400 mb-2">
                      {selectedData.fires.toLocaleString()}
                    </div>
                    <div className="text-gray-400">Wildfires in {selectedYear}</div>
                    
                    {/* Simple Visualization */}
                    <div className="mt-4 flex justify-center space-x-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <motion.div
                          key={i}
                          className={`w-8 h-8 rounded ${
                            i <= timelineData.findIndex(d => d.year === selectedYear) + 1
                              ? 'bg-orange-500'
                              : 'bg-gray-600'
                          }`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Data Panel */}
        <div className="lg:col-span-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedYear}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-2xl h-full"
            >
              <h3 className="text-2xl font-bold text-orange-400 mb-4">
                {selectedYear} Overview
              </h3>
              
              <div className="space-y-4">
                <DataItem label="Total Fires" value={selectedData.fires.toLocaleString()} />
                <DataItem label="Area Burned" value={`${selectedData.area}M km²`} />
                <DataItem label="Major Locations" value={selectedData.location} />
                <DataItem label="Intensity" value={selectedData.intensity} />
              </div>

              <motion.div 
                className="mt-6 p-4 bg-orange-500/10 rounded-lg border border-orange-500/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-sm text-gray-300">
                  {selectedYear === 2023 
                    ? "Record-breaking season with unprecedented scale and intensity"
                    : selectedYear === 2020
                    ? "Global impact with major fires across multiple continents"
                    : "Significant wildfire activity contributing to long-term trends"
                  }
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const DataItem = ({ label, value }) => (
  <motion.div 
    className="flex justify-between items-center py-3 border-b border-white/10"
    whileHover={{ x: 5 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <span className="text-gray-400">{label}</span>
    <span className="text-white font-semibold">{value}</span>
  </motion.div>
);

export default WildfireTimeline;