import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';

const GalacticStory = () => {
  const [currentScene, setCurrentScene] = useState(0);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [direction, setDirection] = useState(1);
  const sceneRef = useRef(null);

  const scenes = [
    {
      id: 1,
      number: "01 / 15",
      title: "THE QUANTUM VOYAGER",
      subtitle: "CAPTAIN NOVA'S FIRST MISSION",
      story: [
        "Meet Captain Aria Nova, the youngest starship commander in the Galactic Fleet.",
        "Fresh from the academy, she's assigned to pilot the experimental vessel 'Stellar Dream' on its maiden voyage.",
        "Her mission: deliver a mysterious artifact to the edge of known space.",
        "Little does she know, this routine delivery will change the fate of galaxies forever."
      ],
      bgGradient: "from-purple-900 via-blue-900 to-cyan-900",
      characterColor: "from-cyan-400 to-blue-500"
    },
    {
      id: 2,
      number: "02 / 15",
      title: "ANOMALY DETECTED",
      subtitle: "THE SPATIAL RIFT",
      story: [
        "Three parsecs into the journey, the ship's sensors detect an impossible phenomenon.",
        "A swirling vortex of energy tears through the fabric of space itself.",
        "The artifact begins to glow, resonating with the anomaly's frequency.",
        "Against protocol, Nova decides to investigate. The pull is irresistible."
      ],
      bgGradient: "from-orange-900 via-red-900 to-purple-900",
      characterColor: "from-orange-400 to-pink-500"
    },
    {
      id: 3,
      number: "03 / 15",
      title: "DIMENSIONAL BREACH",
      subtitle: "CROSSING THE THRESHOLD",
      story: [
        "The Stellar Dream is pulled into the vortex, systems failing one by one.",
        "Time dilates and contracts as reality bends around the ship.",
        "Nova struggles to maintain control as the vessel tumbles through dimensions.",
        "When the chaos subsides, they emerge in a place that shouldn't exist."
      ],
      bgGradient: "from-green-900 via-emerald-900 to-teal-900",
      characterColor: "from-green-400 to-emerald-500"
    },
    {
      id: 4,
      number: "04 / 15",
      title: "THE FORGOTTEN REALM",
      subtitle: "ECHOES OF ANCIENT CIVILIZATIONS",
      story: [
        "Before them lies a megastructure spanning light-years.",
        "Ancient ruins float in the void, defying the laws of physics.",
        "The artifact pulses stronger here, as if calling out to its home.",
        "Nova realizes: this is not a delivery mission. It's a summoning."
      ],
      bgGradient: "from-indigo-900 via-violet-900 to-purple-900",
      characterColor: "from-indigo-400 to-violet-500"
    },
    {
      id: 5,
      number: "05 / 15",
      title: "FIRST CONTACT",
      subtitle: "THE GUARDIANS AWAKEN",
      story: [
        "Massive sentient beings materialize from the structure itself.",
        "They communicate through pure thought, overwhelming Nova's mind.",
        "She learns their truth: they are the Architects, builders of reality itself.",
        "And humanity has just knocked on their door."
      ],
      bgGradient: "from-pink-900 via-rose-900 to-red-900",
      characterColor: "from-pink-400 to-rose-500"
    }
  ];

  useEffect(() => {
    if (sceneRef.current) {
      gsap.fromTo(
        sceneRef.current.querySelectorAll('.story-line'),
        { opacity: 0, x: direction * 50, rotateY: direction * 15 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 0.3
        }
      );
    }
  }, [currentScene, direction]);

  const nextScene = () => {
    if (currentScene < scenes.length - 1) {
      setDirection(1);
      setCurrentScene(currentScene + 1);
    }
  };

  const prevScene = () => {
    if (currentScene > 0) {
      setDirection(-1);
      setCurrentScene(currentScene - 1);
    }
  };

  const skipToEnd = () => {
    setDirection(1);
    setCurrentScene(scenes.length - 1);
  };

  const scene = scenes[currentScene];

  const FloatingObjects = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            rotate: 360,
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${scene.characterColor}`} />
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated Background with Blur */}
      <motion.div
        key={currentScene}
        className={`absolute inset-0 bg-gradient-to-br ${scene.bgGradient} blur-3xl scale-110`}
        initial={{ opacity: 0, scale: 1.3 }}
        animate={{ opacity: 1, scale: 1.1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      />

      <FloatingObjects />

      {/* Radial Overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/40 to-black/80" />

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center">
        <motion.h1
          className="text-xl md:text-2xl font-black italic tracking-tight"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          ADVENTURES OF A COSMIC EXPLORER
        </motion.h1>
        
        <motion.button
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all"
          onClick={() => setMusicPlaying(!musicPlaying)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {musicPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
          <span className="text-sm font-bold">Start Music ▶</span>
        </motion.button>
      </header>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 px-8 lg:px-16">
          {/* Left Side - Visual Scene */}
          <motion.div
            key={`scene-${currentScene}`}
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8, x: direction > 0 ? -200 : 200 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: direction > 0 ? 200 : -200 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 80 }}
          >
            <div className="relative w-full max-w-2xl aspect-square">
              {/* Character/Scene Illustration Placeholder */}
              <motion.div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${scene.characterColor} opacity-20`}
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, 0],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              <motion.div
                className="absolute inset-12 rounded-full bg-gradient-to-br from-white/10 to-transparent backdrop-blur-xl border border-white/20"
                animate={{
                  boxShadow: [
                    '0 0 60px rgba(59, 130, 246, 0.5)',
                    '0 0 100px rgba(139, 92, 246, 0.5)',
                    '0 0 60px rgba(59, 130, 246, 0.5)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              {/* Orbiting Elements */}
              {[0, 120, 240].map((rotation, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-4 h-4"
                  animate={{
                    rotate: [rotation, rotation + 360],
                  }}
                  transition={{
                    duration: 10 + i * 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{ transformOrigin: '0 0' }}
                >
                  <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${scene.characterColor} blur-sm`} />
                </motion.div>
              ))}

              {/* Central Glow */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${scene.characterColor} blur-3xl`} />
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Story Card */}
          <motion.div
            key={currentScene}
            className="flex items-center"
            initial={{ opacity: 0, x: direction > 0 ? 300 : -300, rotateY: direction > 0 ? 20 : -20 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -300 : 300, rotateY: direction > 0 ? -20 : 20 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 80 }}
          >
            <div className="w-full bg-gray-100 text-black rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl backdrop-blur-sm">
              {/* Purple Badge */}
              <motion.div
                className="absolute -top-4 -right-4 w-32 h-32 bg-purple-600 rounded-full flex items-center justify-center shadow-lg"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.5 }}
              >
                <span className="text-white font-black text-xl">{scene.number}</span>
              </motion.div>

              {/* Decorative Blobs */}
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-200 rounded-full blur-3xl opacity-30 -z-0" />
              
              <div ref={sceneRef} className="relative z-10">
                <motion.h2
                  className="text-4xl md:text-5xl font-black italic mb-2 leading-tight"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {scene.title}
                </motion.h2>

                <motion.p
                  className="text-lg font-bold text-gray-600 mb-8"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {scene.subtitle}
                </motion.p>

                <div className="space-y-4 mb-12">
                  {scene.story.map((line, index) => (
                    <p key={index} className="story-line text-base md:text-lg leading-relaxed text-gray-700">
                      {line}
                    </p>
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                  <motion.button
                    onClick={skipToEnd}
                    className="px-6 py-3 font-bold text-sm flex items-center gap-2 hover:text-purple-600 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    Skip To End ⏭
                  </motion.button>

                  <div className="flex gap-3">
                    <motion.button
                      onClick={prevScene}
                      disabled={currentScene === 0}
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 border-black transition-all ${
                        currentScene === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-black hover:text-white'
                      }`}
                      whileHover={currentScene > 0 ? { scale: 1.1 } : {}}
                      whileTap={currentScene > 0 ? { scale: 0.9 } : {}}
                    >
                      <ChevronLeft size={24} />
                    </motion.button>
                    
                    <motion.button
                      onClick={nextScene}
                      disabled={currentScene === scenes.length - 1}
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 border-black transition-all ${
                        currentScene === scenes.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-black hover:text-white'
                      }`}
                      whileHover={currentScene < scenes.length - 1 ? { scale: 1.1 } : {}}
                      whileTap={currentScene < scenes.length - 1 ? { scale: 0.9 } : {}}
                    >
                      <ChevronRight size={24} />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scene Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-2">
        {scenes.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setDirection(index > currentScene ? 1 : -1);
              setCurrentScene(index);
            }}
            className={`h-2 rounded-full transition-all ${
              index === currentScene ? 'w-12 bg-white' : 'w-2 bg-white/40'
            }`}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>

      {/* Keyboard Navigation */}
      <div
        className="fixed inset-0 z-0"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') nextScene();
          if (e.key === 'ArrowLeft') prevScene();
        }}
        tabIndex={0}
      />
    </div>
  );
};

export default GalacticStory;