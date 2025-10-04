// src/components/ui/Navigation.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Navigation = ({ currentSection, onSectionChange, totalSections }) => {
  const sections = [
    { id: 1, title: "Introduction", icon: "🌊" },
    { id: 2, title: "Our Blue Planet", icon: "🌍" },
    { id: 3, title: "Threats", icon: "⚠️" },
    { id: 4, title: "Solutions", icon: "💡" },
    { id: 5, title: "Take Action", icon: "🚀" }
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 1 }}
      className="fixed left-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block"
    >
      <div className="flex flex-col space-y-4">
        {sections.map((section) => (
          <motion.button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={`flex items-center space-x-3 p-3 rounded-2xl transition-all duration-300 ${
              currentSection === section.id
                ? 'bg-white/20 backdrop-blur-sm text-white shadow-lg'
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-2xl">{section.icon}</span>
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ 
                opacity: currentSection === section.id ? 1 : 0,
                width: currentSection === section.id ? 'auto' : 0
              }}
              className="whitespace-nowrap overflow-hidden font-medium"
            >
              {section.title}
            </motion.span>
          </motion.button>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navigation;