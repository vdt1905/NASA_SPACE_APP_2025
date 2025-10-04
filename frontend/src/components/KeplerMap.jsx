import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import mapboxgl from "mapbox-gl";

// Mapbox token from the original HTML file
const MAPBOX_TOKEN = 'pk.eyJ1Ijoia3Jpc2h2MDYxMCIsImEiOiJjbWdiNHB5NnMwYzhvMmlxdTg4bXZoNndzIn0.O772wNyGUJIfLMWRRFowOg';

// Sample fire data extracted from the original HTML (simplified)
const fireData = [
  { lat: 54.60776, lng: 160.29082, intensity: 367, date: "01-09-2025" },
  { lat: 71.17511, lng: 72.21886, intensity: 337, date: "01-09-2025" },
  { lat: 66.06741, lng: 57.82202, intensity: 297, date: "01-09-2025" },
  { lat: 68.58983, lng: 58.05226, intensity: 318, date: "01-09-2025" },
  { lat: 63.24849, lng: 56.38565, intensity: 307, date: "01-09-2025" },
  { lat: 68.58666, lng: 58.0441, intensity: 299, date: "01-09-2025" },
  { lat: 65.04021, lng: 56.67122, intensity: 328, date: "01-09-2025" },
  { lat: 67.83864, lng: 58.93511, intensity: 295, date: "01-09-2025" },
  { lat: 68.16811, lng: 55.35911, intensity: 297, date: "01-09-2025" },
  { lat: 68.614, lng: 57.96304, intensity: 337, date: "01-09-2025" },
  // Add more sample data points
  { lat: 40.7128, lng: -74.0060, intensity: 350, date: "01-09-2025" },
  { lat: 34.0522, lng: -118.2437, intensity: 320, date: "01-09-2025" },
  { lat: 51.5074, lng: -0.1278, intensity: 300, date: "01-09-2025" },
  { lat: 48.8566, lng: 2.3522, intensity: 310, date: "01-09-2025" },
  { lat: 35.6762, lng: 139.6503, intensity: 290, date: "01-09-2025" },
  { lat: -33.8688, lng: 151.2093, intensity: 340, date: "01-09-2025" },
  { lat: 55.7558, lng: 37.6176, intensity: 280, date: "01-09-2025" },
  { lat: 39.9042, lng: 116.4074, intensity: 330, date: "01-09-2025" },
  { lat: 19.0760, lng: 72.8777, intensity: 360, date: "01-09-2025" },
  { lat: -22.9068, lng: -43.1729, intensity: 315, date: "01-09-2025" }
];

const KeplerMap = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (map.current) return; // Initialize map only once

    mapboxgl.accessToken = MAPBOX_TOKEN;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [0, 20], // Center on world view
        zoom: 2,
        projection: 'globe'
      });

      map.current.on('load', () => {
        console.log('Map loaded successfully ✅');
        setIsLoading(false);
        setHasError(false);

        // Add fire data as points
        map.current.addSource('fire-data', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: fireData.map(fire => ({
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [fire.lng, fire.lat]
              },
              properties: {
                intensity: fire.intensity,
                date: fire.date
              }
            }))
          }
        });

        // Add fire points layer
        map.current.addLayer({
          id: 'fire-points',
          type: 'circle',
          source: 'fire-data',
          paint: {
            'circle-radius': {
              'base': 1.75,
              'stops': [
                [12, 2],
                [22, 180]
              ]
            },
            'circle-color': [
              'interpolate',
              ['linear'],
              ['get', 'intensity'],
              280, '#4C0035',
              300, '#880030',
              320, '#B72F15',
              340, '#D6610A',
              360, '#EF9100',
              380, '#FFC300'
            ],
            'circle-opacity': 0.8,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#ffffff'
          }
        });

        // Add hover effect
        map.current.on('mouseenter', 'fire-points', () => {
          map.current.getCanvas().style.cursor = 'pointer';
        });

        map.current.on('mouseleave', 'fire-points', () => {
          map.current.getCanvas().style.cursor = '';
        });

        // Add click popup
        map.current.on('click', 'fire-points', (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const properties = e.features[0].properties;

          new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(`
              <div style="color: #333; padding: 10px;">
                <h3 style="margin: 0 0 5px 0; color: #ff6b35;">🔥 Fire Detection</h3>
                <p style="margin: 0;"><strong>Intensity:</strong> ${properties.intensity}K</p>
                <p style="margin: 0;"><strong>Date:</strong> ${properties.date}</p>
                <p style="margin: 0;"><strong>Coordinates:</strong> ${coordinates[1].toFixed(4)}, ${coordinates[0].toFixed(4)}</p>
              </div>
            `)
            .addTo(map.current);
        });

        // Add navigation controls
        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
        
        // Add fullscreen control
        map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');

      });

      map.current.on('error', (e) => {
        console.error('Map error:', e);
        setIsLoading(false);
        setHasError(true);
      });

    } catch (error) {
      console.error('Failed to initialize map:', error);
      setIsLoading(false);
      setHasError(true);
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <section className="min-h-screen relative flex items-center justify-center bg-slate-950 px-3 lg:px-4 py-8 lg:py-10 overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-20"
        src="/videos/qa-bg.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full max-w-6xl mx-auto relative z-10"
      >
        {/* Title + Description */}
        <div className="mb-6 lg:mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.3 }}
            className="text-center mb-6"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tighter">
              <span className="bg-gradient-to-r from-amber-500 via-orange-600 to-red-700 bg-clip-text text-transparent">
                Interactive Fire Map
              </span>
            </h2>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.7 }}
              className="border-l-4 border-amber-500 pl-4 lg:pl-6 my-4 lg:my-6"
            >
              <p className="text-lg md:text-xl lg:text-2xl text-amber-100 font-medium text-left leading-tight">
                Explore Real-Time <br />
                <span className="text-orange-300 font-bold">Wildfire Data</span>
              </p>
            </motion.div>
            <motion.p
              className="text-sm lg:text-base text-gray-300 mt-4 lg:mt-6 font-light tracking-wider uppercase border-t border-orange-500/30 pt-3 lg:pt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              NASA VIIRS Fire Detection • Live Updates
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.4 }}
            className="max-w-5xl lg:max-w-6xl mx-auto mb-6 lg:mb-8"
          >
            <div className="bg-gradient-to-r from-black/50 to-slate-900/40 backdrop-blur-xl rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-orange-600/30 shadow-2xl">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.8 }}
                className="text-base md:text-lg lg:text-xl text-gray-100 leading-relaxed font-serif italic text-center"
              >
                "Navigate through{" "}
                <span className="text-amber-300 font-semibold">
                  real-time fire detection data
                </span>{" "}
                from NASA's VIIRS satellite, witnessing the global scale of
                wildfire activity as it unfolds."
              </motion.p>
            </div>
          </motion.div>
        </div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="relative bg-black/40 backdrop-blur-xl rounded-xl lg:rounded-2xl p-3 lg:p-4 border border-amber-500/30 shadow-2xl overflow-hidden"
        >
          {/* Loader */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-10">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-amber-300 text-sm">
                  Loading Interactive Map...
                </p>
                <p className="text-gray-400 text-xs mt-2">
                  Initializing NASA fire data...
                </p>
              </div>
            </div>
          )}

          {/* Map */}
          <div
            ref={mapContainer}
            className="w-full h-96 lg:h-[500px] rounded-xl"
            style={{ minHeight: '400px' }}
          />

          {/* Error fallback */}
          {hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="text-center p-6">
                <div className="text-4xl mb-4">🗺️</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Map Unavailable
                </h3>
                <p className="text-gray-300 mb-4">
                  Unable to load the interactive map.
                </p>
                <button
                  onClick={() => {
                    setIsLoading(true);
                    setHasError(false);
                    // Force reload
                    window.location.reload();
                  }}
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold py-2 px-4 rounded-lg transition-all transform hover:scale-105"
                >
                  Retry Loading
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Map Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-4 lg:mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4"
        >
          {[
            {
              title: "Real-Time Detection",
              description: "NASA VIIRS satellite data",
              icon: "🛰️",
            },
            {
              title: "Global Coverage",
              description: "Worldwide fire monitoring",
              icon: "🌍",
            },
            {
              title: "Interactive Analysis",
              description: "Click points for details",
              icon: "🔍",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.1 }}
              className="bg-black/40 backdrop-blur-lg rounded-lg lg:rounded-xl p-3 lg:p-4 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 text-center"
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <h3 className="text-sm lg:text-base font-bold text-white mb-1">
                {item.title}
              </h3>
              <p className="text-xs lg:text-sm text-gray-300">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Fire Animation Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Small Particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="floating-particle absolute w-1 h-1 bg-gradient-to-b from-orange-400 to-red-500 rounded-full shadow-lg"
              animate={{
                y: [0, -120],
                x: [0, Math.random() * 50 - 25],
                opacity: [0.6, 0],
                scale: [1, 0.3],
                rotate: [0, 180],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 1.5,
                ease: "easeOut",
              }}
              style={{
                left: `${Math.random() * 100}%`,
                bottom: "0%",
              }}
            />
          ))}
        </div>

        {/* Large Glow Particles */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full blur-sm opacity-50"
              animate={{
                y: [0, -100],
                x: [0, Math.random() * 30 - 15],
                opacity: [0.5, 0],
                scale: [1, 0.2],
              }}
              transition={{
                duration: 4 + Math.random() * 1.5,
                repeat: Infinity,
                delay: Math.random() * 1,
                ease: "easeOut",
              }}
              style={{
                left: `${35 + Math.random() * 30}%`,
                bottom: "0%",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeplerMap;