import React, { useState, useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist-min';
import Papa from 'papaparse';

const SurfaceTemp = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMonth, setCurrentMonth] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const plotRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Parse CSV data
        const response = await fetch('/src/assets/global_surface_temp_NOAA_grid_2005_2025.csv');
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            const parsedData = results.data
              .filter(row => row.temp_anomaly_c && row.lat && row.lon && row.date)
              .map(row => ({
                lat: Number(row.lat),
                lon: Number(row.lon),
                temp_anomaly_c: Number(row.temp_anomaly_c),
                date: new Date(row.date),
                month_str: new Date(row.date).toISOString().slice(0, 7) // YYYY-MM format
              }))
              .filter(item => !isNaN(item.lat) && !isNaN(item.lon) && !isNaN(item.temp_anomaly_c));

            setData(parsedData);
            setLoading(false);
          },
          error: (error) => {
            setError('Error parsing CSV data: ' + error.message);
            setLoading(false);
          }
        });
      } catch (err) {
        setError('Error loading data: ' + err.message);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (data.length === 0) return;

    // Create traces for each month
    const months = [...new Set(data.map(d => d.month_str))].sort();
    const frames = [];
    const traces = [];

    months.forEach(month => {
      const monthData = data.filter(d => d.month_str === month);
      
      const trace = {
        type: 'scattergeo',
        mode: 'markers',
        lat: monthData.map(d => d.lat),
        lon: monthData.map(d => d.lon),
        marker: {
          color: monthData.map(d => d.temp_anomaly_c),
          colorscale: 'RdBu_r',
          cmin: -2.5,
          cmax: 2.5,
          size: 4,
          opacity: 0.8,
          line: {
            width: 0.5,
            color: 'rgba(255,255,255,0.3)'
          },
          colorbar: {
            title: {
              text: 'Temperature Anomaly (°C)',
              font: { color: 'white', size: 14 }
            },
            tickvals: [-2, -1, 0, 1, 2],
            ticks: 'outside',
            tickfont: { color: 'white', size: 12 }
          }
        },
        name: month,
        visible: month === months[0] // Only first month visible initially
      };

      traces.push(trace);
    });

    // Create frames for animation
    months.forEach((month, index) => {
      const frame = {
        name: month,
        data: traces.map((trace, traceIndex) => ({
          ...trace,
          visible: traceIndex === index
        }))
      };
      frames.push(frame);
    });

    const layout = {
      title: {
        text: '',
        font: { size: 18, color: '#87CEEB' }
      },
      geo: {
        showland: true,
        landcolor: 'rgba(20,20,30,0.8)',
        showcountries: true,
        countrycolor: 'rgba(100,100,120,0.6)',
        showocean: true,
        oceancolor: 'rgba(5,15,35,0.9)',
        projection: {
          type: 'natural earth'
        },
        bgcolor: 'rgba(0,0,0,0)'
      },
      margin: { l: 0, r: 0, t: 0, b: 0 },
      font: { family: 'Inter, Arial, sans-serif', size: 12, color: 'white' },
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      updatemenus: [],
      sliders: []
    };

    const config = {
      responsive: true,
      displayModeBar: false,
      staticPlot: false
    };

    Plotly.newPlot(plotRef.current, traces, layout, config).then(() => {
      Plotly.addFrames(plotRef.current, frames);
      if (months.length > 0) {
        setCurrentMonth(months[0]);
        setCurrentIndex(0);
      }
    });

    return () => {
      if (plotRef.current) {
        Plotly.purge(plotRef.current);
      }
    };
  }, [data]);

  const handlePlayPause = () => {
    if (plotRef.current) {
      if (isPlaying) {
        // Stop the animation
        if (plotRef.current.animationControl) {
          plotRef.current.animationControl();
        }
        setIsPlaying(false);
      } else {
        // Start animation and update UI during playback
        const months = [...new Set(data.map(d => d.month_str))].sort();
        let currentFrameIndex = currentIndex;
        let animationActive = true;
        
        setIsPlaying(true);
        
        const animateFrame = () => {
          if (!animationActive) return; // Stop if paused
          
          Plotly.animate(plotRef.current, [months[currentFrameIndex]], {
            mode: 'immediate',
            transition: { duration: 300 },
            frame: { duration: 0 }
          });
          
          setCurrentMonth(months[currentFrameIndex]);
          setCurrentIndex(currentFrameIndex);
          
          currentFrameIndex = (currentFrameIndex + 1) % months.length;
          
          if (animationActive) {
            setTimeout(animateFrame, 800); // Continue to next frame
          }
        };
        
        animateFrame();
        
        // Store the animation control function
        plotRef.current.animationControl = () => {
          animationActive = false;
        };
      }
    }
  };

  const handleSliderChange = (index) => {
    const months = [...new Set(data.map(d => d.month_str))].sort();
    const month = months[index];
    if (month && plotRef.current) {
      // Stop any running animation
      if (plotRef.current.animationControl) {
        plotRef.current.animationControl();
      }
      setIsPlaying(false);
      
      Plotly.animate(plotRef.current, [month], {
        mode: 'immediate',
        transition: { duration: 300 },
        frame: { duration: 500 }
      });
      setCurrentMonth(month);
      setCurrentIndex(index);
    }
  };

  // Function to handle year click
  const handleYearClick = (year) => {
    const months = [...new Set(data.map(d => d.month_str))].sort();
    // Find the first month of the selected year
    const targetMonth = months.find(month => month.startsWith(year));
    if (targetMonth) {
      const targetIndex = months.indexOf(targetMonth);
      handleSliderChange(targetIndex);
    }
  };

  // Function to get current year from current month
  const getCurrentYear = () => {
    return currentMonth.split('-')[0];
  };

  if (loading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center relative overflow-hidden">
        {/* Space-themed background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-blue-900/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-black to-purple-900/20"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxyYWRpYWxHcmFkaWVudCBpZD0iYSIgY3g9IjUwJSIgY3k9IjUwJSIgcj0iNTAlIj48c3RvcCBzdG9wLWNvbG99IiAjZmZmIiBvZmZzZXQ9Ii4xIiBzdG9wLW9wYWNpdHk9Ii4wNSIvPjxzdG9wIHN0b3AtY29sb3I9IiNmZmYiIG9mZnNldD0iMSIgc3RvcC1vcGFjaXR5PSIwIi8+PC9yYWRpYWxHcmFkaWVudD48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNhKSIgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')]"></div>
        </div>
        
        {/* Stars */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                animationDelay: `${Math.random() * 2}s`,
                opacity: Math.random() * 0.7 + 0.3
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 text-center">
          <div className="mb-8">
            <div className="inline-block animate-spin rounded-full h-20 w-20 border-4 border-blue-400/30 border-t-cyan-400 shadow-lg shadow-cyan-400/20"></div>
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Loading Planetary Climate Data
          </h2>
          <p className="text-cyan-200 text-lg">Initializing orbital temperature sensors...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🚨</div>
          <h2 className="text-3xl font-bold text-white mb-4">Signal Lost</h2>
          <p className="text-gray-400 text-lg mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-8 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white rounded-lg transition-all duration-300 border border-red-500/30 shadow-lg shadow-red-500/20 hover:shadow-red-500/30 transform hover:scale-105"
          >
            Re-establish Connection
          </button>
        </div>
      </div>
    );
  }

  const months = [...new Set(data.map(d => d.month_str))].sort();
  const years = [...new Set(months.map(month => month.split('-')[0]))].sort();
  const currentYear = getCurrentYear();

  return (
    <>
      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #60a5fa, #3b82f6);
          cursor: pointer;
          border: 2px solid #bfdbfe;
          box-shadow: 0 0 12px rgba(59, 130, 246, 0.5);
          transition: all 0.3s ease;
        }
        
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 0 16px rgba(59, 130, 246, 0.7);
        }
        
        input[type="range"]::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #60a5fa, #3b82f6);
          cursor: pointer;
          border: 2px solid #bfdbfe;
          box-shadow: 0 0 12px rgba(59, 130, 246, 0.5);
          transition: all 0.3s ease;
        }
        
        input[type="range"]::-moz-range-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 0 16px rgba(59, 130, 246, 0.7);
        }
        
        input[type="range"]::-webkit-slider-track {
          height: 8px;
          border-radius: 4px;
          background: linear-gradient(90deg, #1e3a8a, #3730a3);
          border: 1px solid #374151;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4);
        }
        
        input[type="range"]::-moz-range-track {
          height: 8px;
          border-radius: 4px;
          background: linear-gradient(90deg, #1e3a8a, #3730a3);
          border: 1px solid #374151;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        .float-animation {
          animation: float 6s ease-in-out infinite;
        }

        .year-button {
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .year-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(6, 182, 212, 0.4);
        }

        .year-button.active {
          background: linear-gradient(135deg, #06b6d4, #3b82f6);
          color: white;
          border-color: #06b6d4;
        }
      `}</style>
      
      <div className="h-screen bg-black relative overflow-hidden flex flex-col">
        {/* Space Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-blue-900/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-black to-purple-900/10"></div>
          {/* Stars */}
          {[...Array(80)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 2}px`,
                height: `${Math.random() * 2}px`,
                opacity: Math.random() * 0.7 + 0.2,
                animation: `twinkle ${Math.random() * 3 + 2}s infinite ${Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Animated Nebula Effects */}
        <div className="absolute inset-0 opacity-25">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-15 float-animation"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-15 float-animation" style={{animationDelay: '3s'}}></div>
        </div>

        {/* Controls Bar */}
        <div className="relative z-10 px-6 pt-6 flex-shrink-0">
          <div className="max-w-7xl mx-auto bg-gray-900/40 backdrop-blur-xl rounded-2xl p-4 border border-cyan-500/30 shadow-2xl shadow-cyan-500/10">
            <div className="flex items-center justify-between">
              {/* Play/Pause Button */}
              
              {/* Current Month Display */}
              <div className="text-center">
                <div className="text-cyan-300 text-xs font-medium tracking-wide uppercase">CURRENT PERIOD</div>
                <div className="text-2xl font-bold text-cyan-100">{currentMonth}</div>
              </div>

              {/* Legend */}
              <div className="flex items-center space-x-4 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-full shadow-md"></div>
                  <span className="text-cyan-100 font-medium">Warm</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full shadow-md"></div>
                  <span className="text-cyan-100 font-medium">Cool</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Visualization */}
        <div className="relative z-10 flex-1 px-6 pb-3">
          <div className="h-full bg-gray-900/30 backdrop-blur-md rounded-xl p-2 border border-cyan-500/20 shadow-xl shadow-cyan-500/5">
            <div ref={plotRef} className="w-full h-full rounded-lg overflow-hidden" />
          </div>
        </div>

        {/* Compact Timeline with Clickable Years */}
        <div className="relative z-10 p-4 flex-shrink-0">
          
          <div className="max-w-7xl mx-auto bg-gray-900/40 backdrop-blur-xl rounded-xl p-4 border border-cyan-500/30 shadow-xl shadow-cyan-500/10">
            <button
                onClick={handlePlayPause}
                className={`px-6 py-3 rounded-xl font-semibold text-base transition-all duration-300 transform hover:scale-105 border ${
                  isPlaying 
                    ? 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white border-red-400/40 shadow-lg shadow-red-500/25' 
                    : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-cyan-400/40 shadow-lg shadow-cyan-500/25'
                }`}
              >
                <span className="flex items-center space-x-2">
                  
                  <span className="text-sm">{isPlaying ? 'Pause' : 'Play'}</span>
                </span>
              </button>

            {/* Clickable Year Labels */}
            <div className="flex justify-between mb-3 px-1 pt-4">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => handleYearClick(year)}
                  className={`year-button text-cyan-400 text-xs font-semibold bg-gray-800/40 px-3 py-2 rounded-md border transition-all duration-200 ${
                    currentYear === year 
                      ? 'active border-cyan-400 shadow-lg' 
                      : 'border-cyan-500/20 hover:border-cyan-400/60'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
            
            
            {/* Slider */}
            <div className="relative mb-3">
              <input
                type="range"
                min="0"
                max={months.length - 1}
                value={currentIndex}
                onChange={(e) => handleSliderChange(parseInt(e.target.value))}
                className="w-full h-2 bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:ring-opacity-50 border border-cyan-500/20"
                style={{
                  background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${(currentIndex / (months.length - 1)) * 100}%, #1e3a8a ${(currentIndex / (months.length - 1)) * 100}%, #1e3a8a 100%)`
                }}
              />
            </div>
            
            
            {/* Compact Progress and Info */}
            <div className="flex items-center justify-between text-xs">
              
              <div className="flex items-center space-x-2">
                <span className="text-cyan-300 font-medium">Progress</span>
                <div className="w-20 bg-gray-800 rounded-full h-1.5 border border-gray-600">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${(currentIndex / (months.length - 1)) * 100}%` }}
                  />
                </div>
                <span className="text-cyan-400 font-bold">
                  {Math.round((currentIndex / (months.length - 1)) * 100)}%
                </span>
              </div>
              
              <div className="text-right">
                <span className="text-cyan-300 font-medium">Data: </span>
                <span className="text-cyan-100 font-bold">{data.length.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </>
  );
};

export default SurfaceTemp;