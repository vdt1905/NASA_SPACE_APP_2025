import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Mountain,
  Globe,
  TrendingUp,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Map from '../components/Map';
import TopologyHeroSection from '../components/TopologyHeroSection';
import BackButton from '../components/BackButton';

// Video Background Component
const VideoBackground = ({ src, opacity = 30, isActive = true }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      video.play().catch(error => {
        console.log('Video play failed:', error);
      });
    } else {
      video.pause();
    }
  }, [isActive]);

  return (
    <div className="absolute inset-0 w-full h-full">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={src}
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        style={{ opacity: opacity / 100 }}
      />
      <div className="absolute inset-0 bg-black/60" />
    </div>
  );
};

// Enhanced Impact Component for Topology
const TopologyImpactComponent = ({ title, description, stat1, stat2, color, component, isActive = true }) => {
  return (
    <motion.div
      className="w-full h-full flex flex-col items-center justify-center p-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center mb-6">
        <motion.h3
          className="text-2xl font-bold text-white mb-2"
          style={{ color }}
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {title}
        </motion.h3>
        <motion.p
          className="text-gray-300 text-sm max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {description}
        </motion.p>
      </div>

      <motion.div
        className="flex gap-6 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="text-center">
          <div className="text-3xl font-bold text-white" style={{ color }}>
            {stat1}
          </div>
          <div className="text-gray-400 text-sm mt-1">Elevation Range</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-white" style={{ color }}>
            {stat2}
          </div>
          <div className="text-gray-400 text-sm mt-1">Area Coverage</div>
        </div>
      </motion.div>

      <motion.div
        className="w-full max-w-md h-48 bg-black/30 rounded-xl border-2 border-white/10 overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        {component}
      </motion.div>
    </motion.div>
  );
};

const TopologyStory = () => {
  // Refs for each section
  const heroRef = useRef(null);
  const formationRef = useRef(null);
  const evolutionRef = useRef(null);
  const impactRef = useRef(null);


  // Audio ref
  const audioRef = useRef(null);

  // State management
  const [currentSection, setCurrentSection] = useState('hero');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [hasAudioError, setHasAudioError] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Section visibility detection
  const isHeroInView = useInView(heroRef, { margin: "-10% 0px -10% 0px" });
  const isFormationInView = useInView(formationRef, { margin: "-10% 0px -10% 0px" });
  const isEvolutionInView = useInView(evolutionRef, { margin: "-10% 0px -10% 0px" });
  const isImpactInView = useInView(impactRef, { margin: "-10% 0px -10% 0px" });


  // Audio narrations for each section
  const audioNarrations = {
    hero: "/audio/topo_about.mp3",
    formation: "/audio/topo_anaglyph.mp3",
    evolution: "/audio/topo_gujarat.mp3",
    impact: "/audio/topo_girnar.mp3",
   
  };

  // Section order for auto-play
  const sectionOrder = ['hero', 'formation', 'evolution', 'impact'];
  const sectionRefs = {
    hero: heroRef,
    formation: formationRef,
    evolution: evolutionRef,
    impact: impactRef,
    
  };

  // Section data for topology
  const sections = {
    hero: {
      title: "Earth's Topology",
      subtitle: "The Story of Our Planet's Surface",
      background: "/videos/topology_hero.mp4"
    },
    formation: {
      year: "4.5B Years Ago",
      title: "Planetary Formation",
      description: "Earth's surface began as a molten landscape, gradually cooling to form the first continental crust. Tectonic forces started shaping the primitive landmasses that would evolve into today's continents.",
      stat1: "4,500M Years",
      stat2: "40KM Depth",
      color: "#8b5cf6",
      component: <Map gifSrc="/images/topology1.jpg" caption="Continental Formation" />,
      background: "/videos/formation_bg.mp4"
    },
    evolution: {
      year: "",
      title: "Gujarat Topology",
      description: "The supercontinent Pangea dominated Earth's surface before breaking apart. Continental drift created the ocean basins and mountain ranges we recognize today, shaping global climate patterns.",
      stat1: "15CM/Year",
      stat2: "7 Continents",
      color: "#06b6d4",
      component: <Map gifSrc="/images/gujarat.jpg" caption="Plate Tectonics" />,
      background: "/videos/evolution_bg.mp4"
    },
    impact: {
      title: "Girnar Topology",
      description: "Tectonic collisions created the world's great mountain ranges. The Himalayas continue to rise as the Indian plate pushes into Eurasia, while erosion constantly reshapes these majestic landscapes.",
      stat1: "8,848M Peak",
      stat2: "2,400KM Range",
      color: "#10b981",
      component: <Map gifSrc="/images/girnar.jpg" caption="Plate Tectonics" />,
      background: "/videos/mountain_bg.mp4"
    },
   
  };

  // Improved scroll function
  const scrollToSection = useCallback((sectionId) => {
    if (isScrolling) return;

    const sectionRef = sectionRefs[sectionId];
    if (sectionRef?.current) {
      setIsScrolling(true);

      sectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    }
  }, [isScrolling]);

  // Move to next section
  const moveToNextSection = useCallback(() => {
    if (isScrolling || isPaused) return;

    const currentIndex = sectionOrder.indexOf(currentSection);
    if (currentIndex < sectionOrder.length - 1) {
      const nextSection = sectionOrder[currentIndex + 1];
      setCurrentSection(nextSection);
      scrollToSection(nextSection);
    } else {
      setAutoPlayEnabled(false);
      setIsPlaying(false);
      setIsPaused(false);
    }
  }, [currentSection, isScrolling, isPaused, scrollToSection]);

  // Move to previous section
  const moveToPreviousSection = useCallback(() => {
    if (isScrolling) return;

    const currentIndex = sectionOrder.indexOf(currentSection);
    if (currentIndex > 0) {
      const prevSection = sectionOrder[currentIndex - 1];
      setCurrentSection(prevSection);
      scrollToSection(prevSection);
    }
  }, [currentSection, isScrolling, scrollToSection]);

  // Play audio for current section
  const playCurrentAudio = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !autoPlayEnabled || isScrolling || isPaused) return;

    const audioSrc = audioNarrations[currentSection];
    if (!audioSrc) {
      moveToNextSection();
      return;
    }

    if (audio.src !== audioSrc || hasAudioError) {
      audio.pause();
      audio.currentTime = 0;
      audio.src = audioSrc;
      setHasAudioError(false);
    }

    audio.muted = isMuted;

    try {
      await audio.play();
      setIsPlaying(true);
      setIsPaused(false);
    } catch (err) {
      console.warn('Audio play failed:', err);
      setHasAudioError(true);
      setTimeout(() => {
        if (autoPlayEnabled && !isScrolling && !isPaused) {
          moveToNextSection();
        }
      }, 2000);
    }
  }, [currentSection, autoPlayEnabled, isMuted, isScrolling, hasAudioError, isPaused, moveToNextSection]);

  // Start auto presentation
  const startAutoPresentation = useCallback(() => {
    setAutoPlayEnabled(true);
    setCurrentSection('hero');
    setHasAudioError(false);
    setIsPaused(false);

    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      scrollToSection('hero');
    }, 500);
  }, [scrollToSection]);

  // Stop auto presentation
  const stopAutoPresentation = useCallback(() => {
    setAutoPlayEnabled(false);
    setIsPlaying(false);
    setIsPaused(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  // Toggle play/pause
  const togglePlayPause = useCallback(() => {
    if (autoPlayEnabled) {
      if (isPlaying) {
        if (audioRef.current) {
          audioRef.current.pause();
        }
        setIsPlaying(false);
        setIsPaused(true);
      } else {
        setIsPaused(false);
        if (audioRef.current) {
          audioRef.current.play().then(() => {
            setIsPlaying(true);
          }).catch(err => {
            console.warn('Audio play failed:', err);
            playCurrentAudio();
          });
        } else {
          playCurrentAudio();
        }
      }
    } else {
      startAutoPresentation();
    }
  }, [autoPlayEnabled, isPlaying, playCurrentAudio, startAutoPresentation]);

  // Toggle mute
  const toggleMute = useCallback(() => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    if (audioRef.current) {
      audioRef.current.muted = newMutedState;
    }
  }, [isMuted]);

  // Handle audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setIsPlaying(false);
      if (autoPlayEnabled && !isScrolling && !isPaused) {
        setTimeout(moveToNextSection, 500);
      }
    };

    const handleTimeUpdate = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setAudioProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleError = () => {
      console.error('Audio error:', audio.error);
      setHasAudioError(true);
      if (autoPlayEnabled && !isPaused) {
        setTimeout(moveToNextSection, 2000);
      }
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('error', handleError);
    };
  }, [autoPlayEnabled, isScrolling, isPaused, moveToNextSection]);

  // Play audio when section changes
  useEffect(() => {
    if (autoPlayEnabled && !isScrolling && !isPaused) {
      const timer = setTimeout(() => {
        playCurrentAudio();
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [currentSection, autoPlayEnabled, isScrolling, isPaused, playCurrentAudio]);

  // Update current section based on scroll
  useEffect(() => {
    if (autoPlayEnabled || isScrolling) return;

    
    else if (isImpactInView) setCurrentSection('impact');
    else if (isEvolutionInView) setCurrentSection('evolution');
    else if (isFormationInView) setCurrentSection('formation');
    else if (isHeroInView) setCurrentSection('hero');
  }, [
    isHeroInView,
    isFormationInView,
    isEvolutionInView,
    isImpactInView,
   
    autoPlayEnabled,
    isScrolling
  ]);

  // Content Section Component
  const ContentSection = React.useCallback(({ sectionId, data, isTimeline = false }) => {
    const sectionRef = sectionRefs[sectionId];
    const sectionInView = useInView(sectionRef, {
      margin: "-10% 0px -10% 0px",
    });

    const [hasBeenViewed, setHasBeenViewed] = useState(false);

    useEffect(() => {
      if (sectionInView) {
        setHasBeenViewed(true);
      }
    }, [sectionInView]);

    const shouldAnimate = sectionInView || hasBeenViewed;

    return (
      <section
        ref={sectionRef}
        className="min-h-screen relative flex items-center justify-center px-4 lg:px-8 py-12 lg:py-20 overflow-hidden"
      >
        <VideoBackground
          src={data.background}
          opacity={30}
          isActive={shouldAnimate}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />

        <div className="relative z-10 w-full max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full"
          >
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

              <div className="space-y-6">
                {isTimeline && data.year && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-2xl font-bold text-white/80"
                  >
                    {data.year}
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.3, duration: 0.7 }}
                >
                  <div
                    className="inline-block px-4 py-2 rounded-full text-white font-bold text-lg mb-4"
                    style={{ backgroundColor: data.color }}
                  >
                    {data.title}
                  </div>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-lg lg:text-xl text-gray-200 leading-relaxed"
                >
                  {data.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.5, duration: 0.7 }}
                  className="flex flex-col sm:flex-row gap-6 lg:gap-8"
                >
                  <div className="text-center">
                    <div className="text-3xl lg:text-4xl font-bold text-white mb-2">{data.stat1}</div>
                    <div className="text-gray-300 font-medium text-sm">Time Scale</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl lg:text-4xl font-bold text-white mb-2">{data.stat2}</div>
                    <div className="text-gray-300 font-medium text-sm">Geological Feature</div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={shouldAnimate ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full h-80 lg:h-96 bg-black/40 backdrop-blur-md rounded-3xl border-2 border-white/20 shadow-2xl overflow-hidden flex items-center justify-center"
              >
                {React.cloneElement(data.component, { isActive: shouldAnimate })}
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-8 text-white/20 text-4xl lg:text-6xl font-bold">
          {String(sectionOrder.indexOf(sectionId) + 1).padStart(2, '0')}
        </div>
      </section>
    );
  }, []);

  return (
    <div className="bg-slate-950">
      <div className="fixed top-6 left-6 z-50">
        <BackButton />
      </div>
      
      <audio ref={audioRef} preload="auto" />

      {/* Global Controls */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="fixed top-6 right-6 z-50 flex gap-3"
      >
        {/* Previous Section Button */}
        <motion.button
          onClick={moveToPreviousSection}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="group relative bg-black/60 backdrop-blur-xl border border-blue-500/40 rounded-full p-4 hover:bg-black/80 hover:border-blue-400/60 transition-all duration-300 shadow-xl"
          disabled={sectionOrder.indexOf(currentSection) === 0}
        >
          <ChevronLeft size={20} className="text-blue-300" />
          <div className="absolute -bottom-10 right-0 bg-black/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs text-blue-200 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Previous Section
          </div>
        </motion.button>

        {/* Play/Pause Button */}
        <motion.button
          onClick={togglePlayPause}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`group relative backdrop-blur-xl border rounded-full p-4 transition-all duration-300 shadow-xl ${autoPlayEnabled && isPlaying
              ? 'bg-yellow-500/80 border-yellow-400/60'
              : autoPlayEnabled && isPaused
                ? 'bg-blue-500/80 border-blue-400/60'
                : 'bg-green-500/80 border-green-400/60'
            }`}
        >
          {autoPlayEnabled && isPlaying ? (
            <Pause size={20} className="text-white" />
          ) : (
            <Play size={20} className="text-white ml-0.5" />
          )}
          <div className="absolute -bottom-10 right-0 bg-black/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {autoPlayEnabled && isPlaying ? 'Pause' :
              autoPlayEnabled && isPaused ? 'Resume' : 'Start Presentation'}
          </div>
        </motion.button>

        {/* Next Section Button */}
        <motion.button
          onClick={moveToNextSection}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="group relative bg-black/60 backdrop-blur-xl border border-blue-500/40 rounded-full p-4 hover:bg-black/80 hover:border-blue-400/60 transition-all duration-300 shadow-xl"
          disabled={sectionOrder.indexOf(currentSection) === sectionOrder.length - 1}
        >
          <ChevronRight size={20} className="text-blue-300" />
          <div className="absolute -bottom-10 right-0 bg-black/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs text-blue-200 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Next Section
          </div>
        </motion.button>

        {/* Mute Toggle */}
        <motion.button
          onClick={toggleMute}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="group relative bg-black/60 backdrop-blur-xl border border-blue-500/40 rounded-full p-4 hover:bg-black/80 hover:border-blue-400/60 transition-all duration-300 shadow-xl"
        >
          {isMuted ? (
            <VolumeX size={20} className="text-blue-300" />
          ) : (
            <Volume2 size={20} className="text-blue-300" />
          )}
          <div className="absolute -bottom-10 right-0 bg-black/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs text-blue-200 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {isMuted ? 'Unmute narration' : 'Mute narration'}
          </div>
        </motion.button>
      </motion.div>

      {/* Current Section Indicator */}
      {autoPlayEnabled && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-black/60 backdrop-blur-xl border border-blue-500/40 rounded-full px-4 py-2 text-blue-300 text-sm"
        >
          {currentSection === 'hero' && 'Introduction'}
          {currentSection === 'formation' && 'Planetary Formation'}
          {currentSection === 'evolution' && 'Continental Drift'}
          {currentSection === 'impact' && 'Mountain Building'}
          
          
          {isPlaying && (
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="ml-2"
            >
              ●
            </motion.span>
          )}
          {isPaused && (
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="ml-2"
            >
              ⏸
            </motion.span>
          )}
        </motion.div>
      )}

      {/* Audio Progress Bar */}
      {autoPlayEnabled && (isPlaying || isPaused) && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-64 bg-black/40 backdrop-blur-xl rounded-full p-1 border border-blue-500/30">
          <div
            className="h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-100"
            style={{ width: `${audioProgress}%` }}
          />
        </div>
      )}

      {/* Hero Section */}
      <section ref={heroRef} className="h-screen relative">
        <TopologyHeroSection />
      </section>

      {/* Formation Section */}
      <ContentSection
        sectionId="formation"
        data={sections.formation}
        isTimeline={true}
      />

      {/* Evolution Section */}
      <ContentSection
        sectionId="evolution"
        data={sections.evolution}
        isTimeline={true}
      />

      {/* Impact Section */}
      <ContentSection
        sectionId="impact"
        data={sections.impact}
      />

    </div>
  );
};

export default TopologyStory;