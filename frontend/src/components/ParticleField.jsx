import React from 'react';

const ParticleField = ({ color = "#6366f1", particleCount = 50, intensity = 1 }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(particleCount)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-float"
          style={{
            backgroundColor: color,
            width: `${Math.random() * 4 + 1}px`,
            height: `${Math.random() * 4 + 1}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.3 * intensity + 0.1,
            animationDelay: `${Math.random() * 20}s`,
            animationDuration: `${Math.random() * 10 + 10}s`,
          }}
        />
      ))}
    </div>
  );
};

export default ParticleField;