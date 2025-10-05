import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Flame,
  MessageCircle,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import GujaratTopography from '../components/GujaratTopology';
import Map from '../components/Map';
import WildfireHeroSection from '../components/WildfireHeroSection';
import BackButton from '../components/BackButton';

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
          <div className="text-gray-400 text-sm mt-1">Impact Scale</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-white" style={{ color }}>
            {stat2}
          </div>
          <div className="text-gray-400 text-sm mt-1">Magnitude</div>
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

const WildfireStory = () => {
  // Refs for each section
  const heroRef = useRef(null);
  const timeline1Ref = useRef(null);
  const timeline2Ref = useRef(null);
  const impact1Ref = useRef(null);

  

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


  // Audio narrations for each section
  const audioNarrations = {
    hero: "/audio/wildfire_about.mp3",
    timeline1: "/audio/wildfire_5order.mp3",
    timeline2: "/audio/wildfire_CO2.mp3",
    impact1: "/audio/wildfire_impact.mp3",
  
  
  };

  // Section order for auto-play
  const sectionOrder = ['hero', 'timeline1', 'timeline2', 'impact1', 'impact2'];
  const sectionRefs = {
    hero: heroRef,
    timeline1: timeline1Ref,
    timeline2: timeline2Ref,
    impact1: impact1Ref,
  };

  // Section data with proper impact components
  const sections = {
    hero: {
      title: "Wildfire Crisis",
      subtitle: "A Story of Climate Change",
      background: "/videos/hero-bg.mp4"
    },
    timeline1: {
      year: "2000",
      title: "Pristine Forests",
      description: "Ancient ecosystems thrived in balance. Fire seasons were predictable, lasting 3-4 months. Communities coexisted with natural fire cycles that had sustained forests for millennia.",
      stat1: "2.5M Species",
      stat2: "300M Trees",
      color: "#10b981",
      component: <Map gifSrc="/gifs/fire_barrace.gif" caption="Pristine Forests" />,
      background: "/videos/forestBG.mp4"
    },
    timeline2: {
      year: "2005",
      title: "Early Warning Signs",
      description: "Temperatures climbed beyond historical norms. Drought periods extended. Fire seasons stretched to 6-7 months. Scientists documented unusual fire behavior patterns worldwide.",
      stat1: "85% Human-caused",
      stat2: "40°C Average",
      color: "#f59e0b",
      component: <Map gifSrc="/gifs/fire_timeseries.gif" caption="Early Warning Signs" />,
      background: "/videos/forestBG.mp4"
    },
    impact1: {
      title: "Ecological Destruction",
      description: "Ancient forests that stood for centuries were reduced to ash in hours. Biodiversity hotspots vanished, disrupting delicate ecosystems that took millennia to evolve.",
      stat1: "2.5M Hectares",
      stat2: "300 Species Lost",
      color: "#dc2626",
     component: <Map gifSrc="/images/ecovul.png" caption="Ecological Vulnerability" />,
      background: "/videos/impact-bg-1.mp4"
    },
   
   
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

   
   
    else if (isImpact1InView) setCurrentSection('impact1');
    else if (isTimeline2InView) setCurrentSection('timeline2');
    else if (isTimeline1InView) setCurrentSection('timeline1');
    else if (isHeroInView) setCurrentSection('hero');
  }, [
    isHeroInView,
    isTimeline1InView,
    isTimeline2InView,
    isImpact1InView,
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
                    <div className="text-gray-300 font-medium text-sm">Impact Scale</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl lg:text-4xl font-bold text-white mb-2">{data.stat2}</div>
                    <div className="text-gray-300 font-medium text-sm">Magnitude</div>
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




  return (
    <div className="bg-slate-950">
      <div className="fixed top-6 left-6 z-50">
        <BackButton />
      </div>
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
          className="group relative bg-black/60 backdrop-blur-xl border border-amber-500/40 rounded-full p-4 hover:bg-black/80 hover:border-amber-400/60 transition-all duration-300 shadow-xl"
          disabled={sectionOrder.indexOf(currentSection) === 0}
        >
          <ChevronLeft size={20} className="text-amber-300" />
          <div className="absolute -bottom-10 right-0 bg-black/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs text-amber-200 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
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
          className="group relative bg-black/60 backdrop-blur-xl border border-amber-500/40 rounded-full p-4 hover:bg-black/80 hover:border-amber-400/60 transition-all duration-300 shadow-xl"
          disabled={sectionOrder.indexOf(currentSection) === sectionOrder.length - 1}
        >
          <ChevronRight size={20} className="text-amber-300" />
          <div className="absolute -bottom-10 right-0 bg-black/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs text-amber-200 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Next Section
          </div>
        </motion.button>

        {/* Mute Toggle */}
        <motion.button
          onClick={toggleMute}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="group relative bg-black/60 backdrop-blur-xl border border-amber-500/40 rounded-full p-4 hover:bg-black/80 hover:border-amber-400/60 transition-all duration-300 shadow-xl"
        >
          {isMuted ? (
            <VolumeX size={20} className="text-amber-300" />
          ) : (
            <Volume2 size={20} className="text-amber-300" />
          )}
          <div className="absolute -bottom-10 right-0 bg-black/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs text-amber-200 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {isMuted ? 'Unmute narration' : 'Mute narration'}
          </div>
        </motion.button>
      </motion.div>

      {/* Current Section Indicator */}
      {autoPlayEnabled && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-black/60 backdrop-blur-xl border border-amber-500/40 rounded-full px-4 py-2 text-amber-300 text-sm"
        >
          {currentSection === 'hero' && 'Introduction'}
          {currentSection === 'timeline1' && '2000: Pristine Forests'}
          {currentSection === 'timeline2' && '2005: Early Warning Signs'}
          {currentSection === 'impact1' && 'Ecological Destruction'}
      
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
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-64 bg-black/40 backdrop-blur-xl rounded-full p-1 border border-amber-500/30">
          <div
            className="h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-100"
            style={{ width: `${audioProgress}%` }}
          />
        </div>
      )}

      {/* Hero Section */}
      <section ref={heroRef} className="h-screen relative">
        <WildfireHeroSection />
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
      

  

    </div>
  );
};

export default WildfireStory;