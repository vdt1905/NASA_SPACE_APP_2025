import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Trees,
  MessageCircle,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Map from '../components/Map';
import DeforestationHeroSection from '../components/DeforestationHeroSection';

// Video Background Component with proper state management
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

// Enhanced Impact Component with proper animations
const ImpactComponent = ({ title, description, stat1, stat2, color, component, isActive = true }) => {
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
          <div className="text-gray-400 text-sm mt-1">Scale of Loss</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-white" style={{ color }}>
            {stat2}
          </div>
          <div className="text-gray-400 text-sm mt-1">Impact Level</div>
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

const DeforestationStory = () => {
  // Refs for each section
  const heroRef = useRef(null);
  const timeline1Ref = useRef(null);
  const timeline2Ref = useRef(null);
  const impact1Ref = useRef(null);
  const impact2Ref = useRef(null);
  const qaRef = useRef(null);
  
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
  const isTimeline1InView = useInView(timeline1Ref, { margin: "-10% 0px -10% 0px" });
  const isTimeline2InView = useInView(timeline2Ref, { margin: "-10% 0px -10% 0px" });
  const isImpact1InView = useInView(impact1Ref, { margin: "-10% 0px -10% 0px" });
  const isImpact2InView = useInView(impact2Ref, { margin: "-10% 0px -10% 0px" });
  const isQAInView = useInView(qaRef, { margin: "-10% 0px -10% 0px" });

  // Audio narrations for each section
  const audioNarrations = {
    hero: "/audio/about.mp3",
    timeline1: "/audio/about.mp3",
    timeline2: "/audio/about.mp3",
    impact1: "/audio/about.mp3",
    impact2: "/audio/about.mp3",
    qa: "/audio/about.mp3"
  };

  // Section order for auto-play
  const sectionOrder = ['hero', 'timeline1', 'timeline2', 'impact1', 'impact2', 'qa'];
  const sectionRefs = {
    hero: heroRef,
    timeline1: timeline1Ref,
    timeline2: timeline2Ref,
    impact1: impact1Ref,
    impact2: impact2Ref,
    qa: qaRef
  };

  // Section data with proper components
  const sections = {
    hero: {
      title: "Deforestation Crisis",
      subtitle: "A Story of Forest Loss",
      background: "/videos/forest-bg.mp4"
    },
    timeline1: {
      year: "2000",
      title: "Pristine Rainforests",
      description: "Vast untouched forests covered the tropics. The Amazon, Congo Basin, and Southeast Asian rainforests thrived with unparalleled biodiversity and served as the planet's vital lungs.",
      stat1: "6M km²",
      stat2: "80% Coverage",
      color: "#10b981",
      component: <Map gifSrc="/gifs/forest_intact.gif" caption="Pristine Rainforests 2000" />,
      background: "/videos/forest-bg.mp4"
    },
    timeline2: {
      year: "2005",
      title: "Agricultural Expansion",
      description: "Massive clearing for soy, palm oil, and cattle ranching accelerated. Industrial-scale deforestation became the primary driver of forest loss across the tropics.",
      stat1: "50% Increase",
      stat2: "Palm Oil Boom",
      color: "#f59e0b",
      component: <Map gifSrc="/gifs/deforestation_trend.gif" caption="Agricultural Expansion 2005" />,
      background: "/videos/forest-bg.mp4"
    },
    impact1: {
      title: "Biodiversity Loss",
      description: "Countless species lost their habitats forever. Iconic animals like orangutans, jaguars, and tigers faced extinction as their forest homes disappeared at alarming rates.",
      stat1: "137 Species/Day",
      stat2: "50% Decline",
      color: "#dc2626",
      component: <Map gifSrc="/gifs/species_loss.gif" caption="Biodiversity Impact" />,
      background: "/videos/deforestation-impact.mp4"
    },
    impact2: {
      title: "Climate Impact",
      description: "Forests that once absorbed carbon now release it. Deforestation contributes significantly to greenhouse gas emissions, accelerating global climate change.",
      stat1: "15% Emissions",
      stat2: "Carbon Sink Lost",
      color: "#ea580c",
      component: <Map gifSrc="/gifs/carbon_emissions.gif" caption="Climate Impact" />,
      background: "/videos/deforestation-impact.mp4"
    },
    qa: {
      title: "Q&A Session",
      subtitle: "Answered by Experts",
      background: "/videos/forest-qa.mp4"
    }
  };

  // Improved scroll function with proper timing
  const scrollToSection = useCallback((sectionId) => {
    if (isScrolling) return;

    const sectionRef = sectionRefs[sectionId];
    if (sectionRef?.current) {
      setIsScrolling(true);
      
      sectionRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });

      // Reset scrolling state after animation completes
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    }
  }, [isScrolling]);

  // Move to next section with proper timing
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

    // Only change source if it's different or there was an error
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
      // Fallback: move to next section after delay
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
    
    // Scroll to top first, then start
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
        // Pause
        if (audioRef.current) {
          audioRef.current.pause();
        }
        setIsPlaying(false);
        setIsPaused(true);
      } else {
        // Play/resume
        setIsPaused(false);
        if (audioRef.current) {
          audioRef.current.play().then(() => {
            setIsPlaying(true);
          }).catch(err => {
            console.warn('Audio play failed:', err);
            // If play fails, try playing current audio again
            playCurrentAudio();
          });
        } else {
          playCurrentAudio();
        }
      }
    } else {
      // If auto-play is not enabled, start it
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

  // Handle audio end and time updates
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

  // Play audio when section changes in auto-play mode
  useEffect(() => {
    if (autoPlayEnabled && !isScrolling && !isPaused) {
      const timer = setTimeout(() => {
        playCurrentAudio();
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [currentSection, autoPlayEnabled, isScrolling, isPaused, playCurrentAudio]);

  // Update current section based on scroll (for manual navigation)
  useEffect(() => {
    if (autoPlayEnabled || isScrolling) return;

    if (isQAInView) setCurrentSection('qa');
    else if (isImpact2InView) setCurrentSection('impact2');
    else if (isImpact1InView) setCurrentSection('impact1');
    else if (isTimeline2InView) setCurrentSection('timeline2');
    else if (isTimeline1InView) setCurrentSection('timeline1');
    else if (isHeroInView) setCurrentSection('hero');
  }, [
    isHeroInView, 
    isTimeline1InView, 
    isTimeline2InView, 
    isImpact1InView, 
    isImpact2InView, 
    isQAInView, 
    autoPlayEnabled, 
    isScrolling
  ]);

  // Enhanced Content Section Component with stable animations
  const ContentSection = React.useCallback(({ sectionId, data, isTimeline = false }) => {
    const sectionRef = sectionRefs[sectionId];
    const sectionInView = useInView(sectionRef, { 
      margin: "-10% 0px -10% 0px",
    });

    // Use a more stable approach for animations
    const [hasBeenViewed, setHasBeenViewed] = useState(false);
    
    useEffect(() => {
      if (sectionInView) {
        setHasBeenViewed(true);
      }
    }, [sectionInView]);

    // Determine if animations should play - simplified logic
    const shouldAnimate = sectionInView || hasBeenViewed;

    return (
      <section 
        ref={sectionRef}
        className="min-h-screen relative flex items-center justify-center px-4 lg:px-8 py-12 lg:py-20 overflow-hidden"
      >
        {/* Background Video - More stable activation */}
        <VideoBackground 
          src={data.background} 
          opacity={30} 
          isActive={shouldAnimate} 
        />
        
        {/* Additional Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
        
        {/* Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full"
          >
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              
              {/* Text Content */}
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
                    <div className="text-gray-300 font-medium text-sm">Scale of Loss</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl lg:text-4xl font-bold text-white mb-2">{data.stat2}</div>
                    <div className="text-gray-300 font-medium text-sm">Impact Level</div>
                  </div>
                </motion.div>
              </div>

              {/* Component Display */}
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

        {/* Section Indicator */}
        <div className="absolute bottom-8 left-8 text-white/20 text-4xl lg:text-6xl font-bold">
          {String(sectionOrder.indexOf(sectionId) + 1).padStart(2, '0')}
        </div>
      </section>
    );
  }, []);

  // Enhanced Q&A Section Component
  const QASection = React.useCallback(() => {
    const sectionInView = useInView(qaRef, { margin: "-10% 0px -10% 0px" });

    return (
      <section 
        ref={qaRef}
        className="min-h-screen relative flex items-center justify-center bg-slate-950 px-4 lg:px-8 py-12 lg:py-20 overflow-hidden"
      >
        {/* Background Video */}
        <VideoBackground src={sections.qa.background} opacity={30} isActive={sectionInView} />
        
        {/* Additional Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
        
        <div className="relative z-10 max-w-2xl lg:max-w-3xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-4 mb-6 lg:mb-8 justify-center">
              <motion.div
                animate={{
                  scale: sectionInView ? [1, 1.1, 1] : 1,
                }}
                transition={{ duration: 3, repeat: sectionInView ? Infinity : 0 }}
                className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl lg:rounded-2xl flex items-center justify-center shadow-xl"
              >
                <MessageCircle className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
              </motion.div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white text-center">
                Your Questions
                <span className="block text-base lg:text-lg text-green-300 mt-1">Answered by Experts</span>
              </h2>
            </div>

            <div className="bg-black/40 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-4 lg:p-6 border border-green-500/30 shadow-xl mb-6 lg:mb-8">
              <p className="text-base lg:text-lg text-gray-200 mb-4 lg:mb-6 text-center leading-relaxed">
                Have questions about deforestation, conservation, or solutions?
                Our experts are here to help you understand this critical environmental issue.
              </p>

              <div className="space-y-3 lg:space-y-4">
                <input
                  type="text"
                  placeholder="What would you like to know about deforestation?"
                  className="w-full bg-black/40 border-2 border-green-500/30 rounded-xl lg:rounded-2xl px-4 py-3 lg:py-4 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-all text-base"
                />
                <motion.button
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 lg:py-4 rounded-xl lg:rounded-2xl transition-all transform hover:scale-[1.02] shadow-xl text-base"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Submit Your Question
                </motion.button>
              </div>
            </div>

            {/* Common questions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
              {[
                "What are the main causes of deforestation?",
                "How does deforestation affect climate change?",
                "What can I do to help stop deforestation?",
                "Which countries have the highest deforestation rates?",
                "How does deforestation impact indigenous communities?",
                "What are the most effective conservation strategies?"
              ].map((question, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-black/40 border border-green-500/20 hover:border-green-500/50 rounded-xl lg:rounded-2xl p-3 lg:p-4 text-left text-gray-300 hover:text-white transition-all hover:scale-[1.02] text-sm lg:text-base"
                >
                  {question}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Forest Animation Particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="floating-particle absolute w-1 h-1 bg-gradient-to-b from-green-400 to-emerald-500 rounded-full shadow-lg"
                animate={{
                  y: [0, -120],
                  x: [0, Math.random() * 50 - 25],
                  opacity: [0.6, 0],
                  scale: [1, 0.3],
                  rotate: [0, 180]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 1.5,
                  ease: "easeOut"
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  bottom: '0%'
                }}
              />
            ))}
          </div>

          <div className="absolute inset-0">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-green-400 rounded-full blur-sm opacity-50"
                animate={{
                  y: [0, -100],
                  x: [0, Math.random() * 30 - 15],
                  opacity: [0.5, 0],
                  scale: [1, 0.2]
                }}
                transition={{
                  duration: 4 + Math.random() * 1.5,
                  repeat: Infinity,
                  delay: Math.random() * 1,
                  ease: "easeOut"
                }}
                style={{
                  left: `${35 + Math.random() * 30}%`,
                  bottom: '0%'
                }}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }, []);

  return (
    <div className="bg-slate-950">
      {/* Hidden Audio Element */}
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
          className="group relative bg-black/60 backdrop-blur-xl border border-green-500/40 rounded-full p-4 hover:bg-black/80 hover:border-green-400/60 transition-all duration-300 shadow-xl"
          disabled={sectionOrder.indexOf(currentSection) === 0}
        >
          <ChevronLeft size={20} className="text-green-300" />
          <div className="absolute -bottom-10 right-0 bg-black/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs text-green-200 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Previous Section
          </div>
        </motion.button>

        {/* Play/Pause Button */}
        <motion.button
          onClick={togglePlayPause}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`group relative backdrop-blur-xl border rounded-full p-4 transition-all duration-300 shadow-xl ${
            autoPlayEnabled && isPlaying
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
          className="group relative bg-black/60 backdrop-blur-xl border border-green-500/40 rounded-full p-4 hover:bg-black/80 hover:border-green-400/60 transition-all duration-300 shadow-xl"
          disabled={sectionOrder.indexOf(currentSection) === sectionOrder.length - 1}
        >
          <ChevronRight size={20} className="text-green-300" />
          <div className="absolute -bottom-10 right-0 bg-black/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs text-green-200 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Next Section
          </div>
        </motion.button>

        {/* Mute Toggle */}
        <motion.button
          onClick={toggleMute}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="group relative bg-black/60 backdrop-blur-xl border border-green-500/40 rounded-full p-4 hover:bg-black/80 hover:border-green-400/60 transition-all duration-300 shadow-xl"
        >
          {isMuted ? (
            <VolumeX size={20} className="text-green-300" />
          ) : (
            <Volume2 size={20} className="text-green-300" />
          )}
          <div className="absolute -bottom-10 right-0 bg-black/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs text-green-200 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {isMuted ? 'Unmute narration' : 'Mute narration'}
          </div>
        </motion.button>
      </motion.div>

      {/* Current Section Indicator */}
      {autoPlayEnabled && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-black/60 backdrop-blur-xl border border-green-500/40 rounded-full px-4 py-2 text-green-300 text-sm"
        >
          {currentSection === 'hero' && 'Introduction'}
          {currentSection === 'timeline1' && '2000: Pristine Rainforests'}
          {currentSection === 'timeline2' && '2005: Agricultural Expansion'}
          {currentSection === 'impact1' && 'Biodiversity Loss'}
          {currentSection === 'impact2' && 'Climate Impact'}
          {currentSection === 'qa' && 'Q&A Session'}
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
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-64 bg-black/40 backdrop-blur-xl rounded-full p-1 border border-green-500/30">
          <div 
            className="h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-100"
            style={{ width: `${audioProgress}%` }}
          />
        </div>
      )}

      {/* Hero Section */}
      <section ref={heroRef} className="h-screen relative">
        <DeforestationHeroSection />
      </section>

      {/* Timeline Section 1 */}
      <ContentSection 
        sectionId="timeline1" 
        data={sections.timeline1}
        isTimeline={true}
      />

      {/* Timeline Section 2 */}
      <ContentSection 
        sectionId="timeline2" 
        data={sections.timeline2}
        isTimeline={true}
      />

      {/* Impact Section 1 */}
      <ContentSection 
        sectionId="impact1" 
        data={sections.impact1}
      />

      {/* Impact Section 2 */}
      <ContentSection 
        sectionId="impact2" 
        data={sections.impact2}
      />

      {/* Q&A Section */}
      <QASection />
    </div>
  );
};

export default DeforestationStory;