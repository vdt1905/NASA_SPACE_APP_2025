import React from 'react';

const SpaceMap = ({ stations, currentStation, onStationSelect }) => {
  // Calculate path points for visualization
  const pathPoints = stations.map(station => station.position);

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-900 to-blue-900 relative overflow-hidden">
      {/* Starfield Background */}
      <div className="absolute inset-0">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.8 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Navigation Path */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#06B6D4" />
          </marker>
        </defs>
        
        {/* Path Line */}
        <path
          d={`M ${pathPoints.map((point, i) => `${point[0]} ${point[1]}`).join(' L ')}`}
          fill="none"
          stroke="url(#pathGradient)"
          strokeWidth="3"
          strokeDasharray="8,4"
          markerEnd="url(#arrowhead)"
          className="animate-pulse"
        />
      </svg>

      {/* Stations */}
      <div className="relative w-full h-full">
        {stations.map((station, index) => (
          <button
            key={station.id}
            onClick={() => onStationSelect(index)}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
              index === currentStation 
                ? 'scale-125 z-10' 
                : 'hover:scale-110'
            }`}
            style={{
              left: `${station.position[0]}%`,
              top: `${station.position[1]}%`,
            }}
          >
            <div
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                index === currentStation
                  ? 'bg-cyan-500 border-cyan-300 shadow-lg shadow-cyan-500/50'
                  : 'bg-purple-600 border-purple-400 hover:bg-purple-500'
              }`}
            >
              <span className="text-white font-bold text-xs">
                {index + 1}
              </span>
            </div>
            
            {/* Station Label */}
            <div
              className={`absolute left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 rounded-lg text-sm font-semibold transition-all duration-300 ${
                index === currentStation
                  ? 'bg-cyan-900/80 text-cyan-100 border border-cyan-500 scale-100'
                  : 'bg-gray-900/70 text-gray-300 border border-gray-600 scale-90 opacity-0 hover:opacity-100'
              }`}
            >
              {station.name}
            </div>
          </button>
        ))}
      </div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(#4F46E5 1px, transparent 1px),
            linear-gradient(90deg, #4F46E5 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  );
};

export default SpaceMap;