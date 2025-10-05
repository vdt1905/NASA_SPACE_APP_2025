import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Flame,
  MessageCircle,
  Volume2,
  VolumeX,
  Play,
  Pause
} from 'lucide-react';
import Map from '../components/Map';
import WildfireHeroSection from '../components/WildfireHeroSection';

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
  const [activeAnimations, setActiveAnimations] = useState(new Set(['hero']));

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
      background: "/videos/forest.mp4"
    },
    timeline2: {
      year: "2005",
      title: "Early Warning Signs",
      description: "Temperatures climbed beyond historical norms. Drought periods extended. Fire seasons stretched to 6-7 months. Scientists documented unusual fire behavior patterns worldwide.",
      stat1: "85% Human-caused",
      stat2: "40°C Average",
      color: "#f59e0b",
      component: <Map gifSrc="/gifs/fire_timeseries.gif" caption="Early Warning Signs" />,
      background: "/videos/forest.mp4"
    },
    impact1: {
      title: "Ecological Destruction",
      description: "Ancient forests that stood for centuries were reduced to ash in hours. Biodiversity hotspots vanished, disrupting delicate ecosystems that took millennia to evolve.",
      stat1: "2.5M Hectares",
      stat2: "300 Species Lost",
      color: "#dc2626",
      component: <ImpactComponent
        title="Ecological Destruction"
        description="Ancient forests reduced to ash, biodiversity hotspots vanished"
        stat1="2.5M Hectares"
        stat2="300 Species"
        color="#dc2626"
        component={<Map />}
      />,
      background: "/videos/impact-bg-1.mp4"
    },
    impact2: {
      title: "Human Displacement",
      description: "Entire communities were forced to evacuate, many never returning home. The psychological and economic toll continues to affect generations of families.",
      stat1: "500K People",
      stat2: "$50B Damage",
      color: "#ea580c",
      component: <ImpactComponent
        title="Human Displacement"
        description="Communities forced to evacuate, never returning home"
        stat1="500K People"
        stat2="$50B Damage"
        color="#ea580c"
        component={<Map />}
      />,
      background: "/videos/impact-bg-1.mp4"
    },
    qa: {
      title: "Q&A Session",
      subtitle: "Answered by Experts",
      background: "/videos/qa-bg.mp4"
    }
  };

  // Update active animations when section changes
  useEffect(() => {
    setActiveAnimations(prev => {
      const newSet = new Set(prev);
      newSet.add(currentSection);
      return newSet;
    });
  }, [currentSection]);

  // Play audio for current section
  const playCurrentAudio = async () => {
    const audio = audioRef.current;
    if (!audio || !autoPlayEnabled) return;

    const audioSrc = audioNarrations[currentSection];
    if (!audioSrc) {
      moveToNextSection();
      return;
    }

    // Reset audio and set new source
    audio.pause();
    audio.currentTime = 0;
    audio.src = audioSrc;
    audio.muted = isMuted;

    try {
      await audio.play();
      setIsPlaying(true);
    } catch (err) {
      console.warn('Audio play failed:', err);
      setTimeout(moveToNextSection, 3000);
    }
  };

  // Move to next section with proper timing
  const moveToNextSection = () => {
    if (isScrolling) return;

    const currentIndex = sectionOrder.indexOf(currentSection);
    if (currentIndex < sectionOrder.length - 1) {
      const nextSection = sectionOrder[currentIndex + 1];
      setCurrentSection(nextSection);
      scrollToSection(nextSection);
    } else {
      setAutoPlayEnabled(false);
      setIsPlaying(false);
    }
  };

  // Improved scroll function with proper timing
  const scrollToSection = (sectionId) => {
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
  };

  // Start auto presentation
  const startAutoPresentation = () => {
    setAutoPlayEnabled(true);
    setCurrentSection('hero');
    setActiveAnimations(new Set(['hero']));
    
    // Scroll to top first, then start
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      scrollToSection('hero');
    }, 500);
  };

  // Stop auto presentation
  const stopAutoPresentation = () => {
    setAutoPlayEnabled(false);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  // Toggle mute
  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    if (audioRef.current) {
      audioRef.current.muted = newMutedState;
    }
  };

  // Handle audio end and time updates
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setIsPlaying(false);
      if (autoPlayEnabled && !isScrolling) {
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
      if (autoPlayEnabled) {
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
  }, [autoPlayEnabled, isScrolling]);

  // Play audio when section changes in auto-play mode
  useEffect(() => {
    if (autoPlayEnabled && !isScrolling) {
      const timer = setTimeout(() => {
        playCurrentAudio();
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [currentSection, autoPlayEnabled, isScrolling]);

  // Update current section based on scroll (for manual navigation)
  useEffect(() => {
    if (autoPlayEnabled || isScrolling) return;

    if (isQAInView) setCurrentSection('qa');
    else if (isImpact2InView) setCurrentSection('impact2');
    else if (isImpact1InView) setCurrentSection('impact1');
    else if (isTimeline2InView) setCurrentSection('timeline2');
    else if (isTimeline1InView) setCurrentSection('timeline1');
    else if (isHeroInView) setCurrentSection('hero');
  }, [isHeroInView, isTimeline1InView, isTimeline2InView, isImpact1InView, isImpact2InView, isQAInView, autoPlayEnabled, isScrolling]);

  // Enhanced Content Section Component with always-active animations
  const ContentSection = ({ sectionId, data, isTimeline = false }) => {
    const isActive = activeAnimations.has(sectionId);
    const sectionInView = useInView(sectionRefs[sectionId], { margin: "-10% 0px -10% 0px" });

    return (
      <section 
        ref={sectionRefs[sectionId]}
        className="min-h-screen relative flex items-center justify-center px-4 lg:px-8 py-12 lg:py-20 overflow-hidden"
      >
        {/* Background Video - Always active when section is in view */}
        <VideoBackground src={data.background} opacity={30} isActive={sectionInView || isActive} />
        
        {/* Additional Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
        
        {/* Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={(sectionInView || isActive) ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              
              {/* Text Content */}
              <div className="space-y-6">
                {isTimeline && data.year && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={(sectionInView || isActive) ? { opacity: 1 } : { opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl font-bold text-white/80"
                  >
                    {data.year}
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={(sectionInView || isActive) ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
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
                  animate={(sectionInView || isActive) ? { opacity: 1 } : { opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg lg:text-xl text-gray-200 leading-relaxed"
                >
                  {data.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={(sectionInView || isActive) ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
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
                animate={(sectionInView || isActive) ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full h-80 lg:h-96 bg-black/40 backdrop-blur-md rounded-3xl border-2 border-white/20 shadow-2xl overflow-hidden flex items-center justify-center"
              >
                {React.cloneElement(data.component, { isActive: sectionInView || isActive })}
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
  };

  // Enhanced Q&A Section Component
  const QASection = () => {
    const sectionInView = useInView(qaRef, { margin: "-10% 0px -10% 0px" });
    const isActive = activeAnimations.has('qa');

    return (
      <section 
        ref={qaRef}
        className="min-h-screen relative flex items-center justify-center bg-slate-950 px-4 lg:px-8 py-12 lg:py-20 overflow-hidden"
      >
        {/* Background Video */}
        <VideoBackground src={sections.qa.background} opacity={30} isActive={sectionInView || isActive} />
        
        {/* Additional Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
        
        <div className="relative z-10 max-w-2xl lg:max-w-3xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={(sectionInView || isActive) ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-4 mb-6 lg:mb-8 justify-center">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl lg:rounded-2xl flex items-center justify-center shadow-xl"
              >
                <MessageCircle className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
              </motion.div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white text-center">
                Your Questions
                <span className="block text-base lg:text-lg text-amber-300 mt-1">Answered by Experts</span>
              </h2>
            </div>

            <div className="bg-black/40 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-4 lg:p-6 border border-amber-500/30 shadow-xl mb-6 lg:mb-8">
              <p className="text-base lg:text-lg text-gray-200 mb-4 lg:mb-6 text-center leading-relaxed">
                Have questions about wildfire impact, prevention, or recovery?
                Our AI assistant is here to help you understand this critical issue.
              </p>

              <div className="space-y-3 lg:space-y-4">
                <input
                  type="text"
                  placeholder="What would you like to know about wildfires?"
                  className="w-full bg-black/40 border-2 border-amber-500/30 rounded-xl lg:rounded-2xl px-4 py-3 lg:py-4 text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 transition-all text-base"
                />
                <motion.button
                  className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold py-3 lg:py-4 rounded-xl lg:rounded-2xl transition-all transform hover:scale-[1.02] shadow-xl text-base"
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
                "How can I protect my home from wildfires?",
                "What causes megafires to spread so quickly?",
                "How does climate change affect fire seasons?",
                "What are fire-adapted communities?",
                "How do controlled burns help prevent larger fires?",
                "What technologies are used to detect fires early?"
              ].map((question, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={(sectionInView || isActive) ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-black/40 border border-amber-500/20 hover:border-amber-500/50 rounded-xl lg:rounded-2xl p-3 lg:p-4 text-left text-gray-300 hover:text-white transition-all hover:scale-[1.02] text-sm lg:text-base"
                >
                  {question}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    );
  };

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
        {/* Start/Stop Auto Presentation */}
        <motion.button
          onClick={autoPlayEnabled ? stopAutoPresentation : startAutoPresentation}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`group relative backdrop-blur-xl border rounded-full p-4 transition-all duration-300 shadow-xl ${
            autoPlayEnabled 
              ? 'bg-red-500/80 border-red-400/60' 
              : 'bg-green-500/80 border-green-400/60'
          }`}
        >
          {autoPlayEnabled ? (
            <Pause size={20} className="text-white" />
          ) : (
            <Play size={20} className="text-white ml-0.5" />
          )}
          <div className="absolute -bottom-10 right-0 bg-black/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {autoPlayEnabled ? 'Stop Presentation' : 'Start Presentation'}
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
          {currentSection === 'impact2' && 'Human Displacement'}
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
        </motion.div>
      )}

      {/* Audio Progress Bar */}
      {autoPlayEnabled && isPlaying && (
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
      <ContentSection 
        sectionId="impact2" 
        data={sections.impact2}
      />

      {/* Q&A Section */}
      {/* <QASection /> */}
    </div>
  );
};

export default WildfireStory;