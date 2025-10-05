import React, { useState } from 'react';
import { Flame, Leaf, Mountain, Cloud, Sun, Zap, ChevronLeft, ChevronRight, Satellite, Activity } from 'lucide-react';
import LightRays from './LightRays';
import { useNavigate } from 'react-router-dom';


const stations = [
  {
    id: 'wildfire',
    name: 'Wildfire',
    icon: Flame,
    color: '#FF6B35',
    tagline: 'Real-time fire detection & monitoring',
    description: 'Advanced thermal imaging and AI-powered detection systems monitor global fire activity in real-time. Our satellite network identifies hotspots, tracks fire spread patterns, and provides critical data to emergency response teams worldwide.',
    gradient: 'from-orange-500 to-red-600',
    lightRays: {
      raysColor: '#FF6B35',
      raysSpeed: 2.0,
      lightSpread: 0.9,
      rayLength: 1.3,
      noiseAmount: 0.15,
      distortion: 0.08
    }
  },
  {
    id: 'ndvi',
    name: 'Deforestation',
    icon: Leaf,
    color: '#4CAF50',
    tagline: 'Vegetation health analysis',
    description: 'Normalized Difference Vegetation Index measurements provide comprehensive insights into plant health, agricultural productivity, and ecosystem vitality. Track seasonal changes, crop conditions, and environmental impact across the globe.',
    gradient: 'from-green-500 to-emerald-600',
    lightRays: {
      raysColor: '#4CAF50',
      raysSpeed: 1.2,
      lightSpread: 0.7,
      rayLength: 1.1,
      noiseAmount: 0.1,
      distortion: 0.05
    }
  },
  {
    id: 'aster',
    name: 'Surface Temp',
    icon: Mountain,
    color: '#D4A574',
    tagline: 'Terrain & surface temperature',
    description: 'Advanced Spaceborne Thermal Emission and Reflection Radiometer captures detailed elevation data and surface temperature readings. Essential for geological surveys, climate research, and natural resource management.',
    gradient: 'from-amber-600 to-orange-700',
    lightRays: {
      raysColor: '#D4A574',
      raysSpeed: 0.8,
      lightSpread: 0.6,
      rayLength: 1.0,
      noiseAmount: 0.12,
      distortion: 0.06
    }
  },
  {
    id: 'aerosol',
    name: 'Pollution',
    icon: Cloud,
    color: '#64B5F6',
    tagline: 'Air quality & particle tracking',
    description: 'Monitor atmospheric aerosol concentrations and air quality indices across urban and remote regions. Track pollution patterns, dust storms, and particulate matter to support public health initiatives and environmental policy.',
    gradient: 'from-blue-400 to-cyan-500',
    lightRays: {
      raysColor: '#64B5F6',
      raysSpeed: 1.5,
      lightSpread: 0.8,
      rayLength: 1.2,
      noiseAmount: 0.08,
      distortion: 0.04
    }
  },
  {
    id: 'radiation',
    name: 'Topology',
    icon: Sun,
    color: '#FFB300',
    tagline: 'Solar energy & UV monitoring',
    description: 'Comprehensive solar radiation measurements and UV index monitoring for renewable energy planning and public health protection. Track solar irradiance patterns and optimize photovoltaic system deployment worldwide.',
    gradient: 'from-yellow-500 to-amber-600',
    lightRays: {
      raysColor: '#FFB300',
      raysSpeed: 2.5,
      lightSpread: 1.0,
      rayLength: 1.4,
      noiseAmount: 0.05,
      distortion: 0.1
    }
  },
 
];

export default function StationNavigator() {
  const [activeStation, setActiveStation] = useState(0);
  const [hoveredStation, setHoveredStation] = useState(null);
  const navigate = useNavigate();


  const handleStationClick = (index) => {
    setActiveStation(index);
  };

  const handlePrevious = () => {
    setActiveStation(prev => prev > 0 ? prev - 1 : prev);
  };

  const handleNext = () => {
    setActiveStation(prev => prev < stations.length - 1 ? prev + 1 : prev);
  };

  const currentStation = stations[activeStation];

  return (
    <div className="h-screen w-screen overflow-hidden relative flex flex-col bg-black">
      {/* LightRays Background - Dynamic per station */}
      <div className="absolute inset-0">
        <LightRays
          key={activeStation}
          raysOrigin="top-center"
          raysColor={currentStation.lightRays.raysColor}
          raysSpeed={currentStation.lightRays.raysSpeed}
          lightSpread={currentStation.lightRays.lightSpread}
          rayLength={currentStation.lightRays.rayLength}
          followMouse={true}
          mouseInfluence={0.15}
          noiseAmount={currentStation.lightRays.noiseAmount}
          distortion={currentStation.lightRays.distortion}
          pulsating={false}
          fadeDistance={1.0}
          saturation={1.0}
        />
      </div>

      {/* Dark overlay for content readability */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Main content container */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header - 10% */}
        <div className="flex-none h-[10vh] flex flex-col items-center justify-center px-4 pt-6">
          
        </div>

        {/* Navigation controls - 10% */}
        <div className="flex-none h-[10vh] flex items-center justify-center px-8">
          <div className="flex items-center justify-between w-full max-w-4xl">
            <button
              onClick={handlePrevious}
              disabled={activeStation === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 border backdrop-blur-sm ${
                activeStation === 0 
                  ? 'border-gray-700/50 text-gray-600 cursor-not-allowed bg-gray-900/20' 
                  : 'border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400 bg-cyan-900/20'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium tracking-wide">PREVIOUS</span>
            </button>

            <div className="text-center">
              <div 
                className="text-2xl font-bold tracking-wider mb-1 transition-all duration-500"
                style={{ color: currentStation.color, textShadow: `0 0 20px ${currentStation.color}60` }}
              >
                {currentStation.name}
              </div>
              <div className="text-cyan-400 text-xs tracking-widest">STATION {activeStation + 1} / {stations.length}</div>
            </div>

            <button
              onClick={handleNext}
              disabled={activeStation === stations.length - 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 border backdrop-blur-sm ${
                activeStation === stations.length - 1 
                  ? 'border-gray-700/50 text-gray-600 cursor-not-allowed bg-gray-900/20' 
                  : 'border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400 bg-cyan-900/20'
              }`}
            >
              <span className="text-sm font-medium tracking-wide">NEXT</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Station navigation - 35% */}
        <div className="flex-none h-[35vh] flex items-center justify-center px-8">
          <div className="relative w-full max-w-6xl h-full">
            {/* Connection line with gradient */}
            <div className="absolute top-1/2 left-0 right-0 h-px transform -translate-y-1/2">
              <div 
                className="h-full transition-all duration-1000"
                style={{
                  background: `linear-gradient(to right, transparent, ${currentStation.color}40 30%, ${currentStation.color}60 50%, ${currentStation.color}40 70%, transparent)`
                }}
              />
            </div>

            {/* Stations */}
            <div className="relative h-full flex items-center justify-between">
              {stations.map((station, index) => {
                const Icon = station.icon;
                const isActive = activeStation === index;
                const isHovered = hoveredStation === index;

                return (
                  <div
                    key={station.id}
                    className="relative flex flex-col items-center cursor-pointer group"
                    onClick={() => handleStationClick(index)}
                    onMouseEnter={() => setHoveredStation(index)}
                    onMouseLeave={() => setHoveredStation(null)}
                  >
                    {/* Vertical connection line */}
                    <div
                      className="absolute bottom-full mb-2 w-px transition-all duration-500"
                      style={{
                        height: isActive ? '60px' : '30px',
                        background: isActive 
                          ? `linear-gradient(to top, ${station.color}, transparent)`
                          : `linear-gradient(to top, ${station.color}40, transparent)`,
                        opacity: isActive ? 1 : 0.4
                      }}
                    />

                    {/* Station orb */}
                    <div className="relative">
                      {/* Outer glow ring */}
                      {isActive && (
                        <div
                          className="absolute inset-0 rounded-full animate-ping"
                          style={{
                            background: `radial-gradient(circle, ${station.color}, transparent 70%)`,
                            transform: 'scale(1.8)',
                            opacity: 0.4,
                            animationDuration: '2s'
                          }}
                        />
                      )}

                      {/* Main orb */}
                      <div
                        className={`relative w-20 h-20 rounded-full transition-all duration-500 transform ${
                          isActive ? 'scale-125' : isHovered ? 'scale-110' : 'scale-100'
                        }`}
                        style={{
                          background: isActive
                            ? `radial-gradient(circle at 30% 30%, ${station.color}50, ${station.color}20 50%, rgba(0,0,0,0.8) 70%)`
                            : `radial-gradient(circle at 30% 30%, rgba(100,100,150,0.3), rgba(0,0,0,0.9) 70%)`,
                          boxShadow: isActive
                            ? `0 0 40px ${station.color}80, inset 0 2px 20px rgba(255,255,255,0.2)`
                            : isHovered
                            ? `0 0 25px ${station.color}40, inset 0 2px 10px rgba(255,255,255,0.1)`
                            : '0 0 15px rgba(0,0,0,0.5), inset 0 2px 8px rgba(255,255,255,0.05)',
                          border: `2px solid ${isActive ? station.color : isHovered ? `${station.color}60` : 'rgba(100,100,150,0.3)'}`
                        }}
                      >
                        <Icon
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
                          style={{
                            width: isActive ? '36px' : '28px',
                            height: isActive ? '36px' : '28px',
                            color: isActive ? station.color : isHovered ? `${station.color}cc` : '#8899aa',
                            filter: isActive ? `drop-shadow(0 0 10px ${station.color})` : 'none'
                          }}
                        />

                        {/* Pulsing core */}
                        {isActive && (
                          <div
                            className="absolute inset-3 rounded-full animate-pulse"
                            style={{
                              background: `radial-gradient(circle, ${station.color}60, transparent)`,
                              animationDuration: '1.5s'
                            }}
                          />
                        )}
                      </div>
                    </div>

                    {/* Label */}
                    <div
                      className={`mt-4 text-center transition-all duration-500 ${
                        isActive ? 'opacity-100' : 'opacity-70'
                      }`}
                    >
                      <div
                        className="text-sm font-bold tracking-wide whitespace-nowrap"
                        style={{
                          color: isActive ? station.color : '#aabbcc',
                          textShadow: isActive ? `0 0 15px ${station.color}60` : 'none'
                        }}
                      >
                        {station.name}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Info panel - 30% */}
        <div className="flex-none h-[30vh] flex items-center justify-center px-8">
          <div 
            className="w-full max-w-5xl rounded-3xl backdrop-blur-xl border-2 transition-all duration-1000 relative overflow-hidden p-10"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 10, 20, 0.85), rgba(10, 20, 30, 0.75))',
              borderColor: `${currentStation.color}50`,
              boxShadow: `0 0 80px ${currentStation.color}25, inset 0 4px 60px rgba(0,0,0,0.6)`
            }}
          >
            {/* Animated scan line */}
            <div 
              className="absolute top-0 left-0 right-0 h-px animate-scan"
              style={{
                background: `linear-gradient(to right, transparent, ${currentStation.color}80, transparent)`
              }}
            />

            <div className="relative z-10 h-full flex flex-col justify-between">
              {/* Header with icon and status */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500 relative"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${currentStation.color}30, ${currentStation.color}10)`,
                      boxShadow: `0 0 40px ${currentStation.color}30, inset 0 4px 30px rgba(0,0,0,0.3)`,
                      border: `2px solid ${currentStation.color}50`
                    }}
                  >
                    {React.createElement(currentStation.icon, {
                      className: "w-10 h-10",
                      style: { 
                        color: currentStation.color,
                        filter: `drop-shadow(0 0 10px ${currentStation.color})`,
                        strokeWidth: 1.5
                      }
                    })}
                    {/* Icon glow effect */}
                    <div 
                      className="absolute inset-0 rounded-2xl animate-pulse"
                      style={{
                        background: `radial-gradient(circle, ${currentStation.color}20, transparent 70%)`,
                        animationDuration: '3s'
                      }}
                    />
                  </div>
                  <div>
                    <h2 
                      className="text-4xl font-bold mb-2 transition-all duration-500"
                      style={{ 
                        color: currentStation.color,
                        textShadow: `0 0 30px ${currentStation.color}60`
                      }}
                    >
                      {currentStation.name}
                    </h2>
                    <div className="flex items-center gap-2">
                      <Activity className="w-3 h-3 text-green-400 animate-pulse" />
                      <span className="text-green-400 text-xs tracking-widest font-mono">ONLINE • STREAMING</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-cyan-400 text-xs tracking-wider mb-1">STATION ID</div>
                  <div className="text-white font-mono text-lg font-bold">{String(activeStation + 1).padStart(2, '0')}</div>
                </div>
              </div>

              {/* Station description */}
              <div className="mb-6 flex-1">
                <p className="text-gray-300 text-base leading-relaxed">
                  {currentStation.description}
                </p>
              </div>

              {/* Navigation button */}
              <button 
              onClick={() => navigate(`/${currentStation.id}`)} 
                className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: `linear-gradient(135deg, ${currentStation.color}20, ${currentStation.color}10)`,
                  border: `2px solid ${currentStation.color}50`,
                  boxShadow: `0 0 30px ${currentStation.color}20`
                }}
              >
                <div className="relative z-10 py-4 px-8 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Satellite 
                      className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" 
                      style={{ color: currentStation.color }}
                    />
                    <span className="text-white font-bold text-lg tracking-wide">Navigate to Station</span>
                  </div>
                  <ChevronRight 
                    className="w-6 h-6 transition-all duration-300 group-hover:translate-x-1" 
                    style={{ color: currentStation.color }}
                  />
                </div>
                
                {/* Hover effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${currentStation.color}30, ${currentStation.color}15)`
                  }}
                />
              </button>
            </div>

            {/* Corner accents */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 rounded-tl-lg transition-all duration-500" style={{ borderColor: currentStation.color }} />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 rounded-tr-lg transition-all duration-500" style={{ borderColor: currentStation.color }} />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 rounded-bl-lg transition-all duration-500" style={{ borderColor: currentStation.color }} />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 rounded-br-lg transition-all duration-500" style={{ borderColor: currentStation.color }} />
          </div>
        </div>

        {/* Footer - Quick access - 10% */}
        <div className="flex-none h-[10vh] flex items-center justify-center gap-2 px-8">
          {stations.map((station, index) => (
            <button
              key={station.id}
              onClick={() => handleStationClick(index)}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                activeStation === index ? 'w-12' : 'hover:scale-125'
              }`}
              style={{
                background: activeStation === index 
                  ? `linear-gradient(90deg, ${station.color}, ${station.color}80)`
                  : `${station.color}40`,
                boxShadow: activeStation === index ? `0 0 10px ${station.color}` : 'none'
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        
        .animate-scan {
          animation: scan 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}