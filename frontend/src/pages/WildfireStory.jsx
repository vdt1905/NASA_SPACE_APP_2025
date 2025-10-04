import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  Flame,
  MessageCircle,
  ChevronDown,
  ArrowRight
} from 'lucide-react';
import Map from '../components/map';
import WildfireHeroSection from '../components/WildfireHeroSection';
import SurfaceTemp from '../components/SurfaceTemp';

// Video Component with Play/Pause based on visibility
const VideoPlayer = ({ src, isVisible }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isVisible) {
      video.play().catch(error => {
        console.log('Video play failed:', error);
      });
    } else {
      video.pause();
      video.currentTime = 0; // Reset to beginning when not visible
    }
  }, [isVisible]);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover"
      src={src}
      muted
      loop
      playsInline
      preload="metadata" // Only load metadata, not the entire video
      aria-hidden="true"
    />
  );
};

// Component with visibility detection for background videos
const BackgroundVideoPlayer = ({ src, sectionRef }) => {
  const videoRef = useRef(null);
  const isInView = useInView(sectionRef, {
    margin: "-50% 0px -50% 0px", // Play when 50% of section is visible
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView) {
      video.play().catch(error => {
        console.log('Background video play failed:', error);
      });
    } else {
      video.pause();
      video.currentTime = 0; // Reset to beginning when not visible
    }
  }, [isInView]);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover"
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    />
  );
};

// Component with visibility detection for individual components
const VisibilityAwareComponent = ({ component, index, sectionRef }) => {
  const componentRef = useRef(null);
  const isInView = useInView(componentRef, {
    root: sectionRef,
    margin: "-30% 0px -30% 0px", // Play when 30% of component is visible
  });

  return (
    <div ref={componentRef} className="w-full h-full">
      {React.cloneElement(component, { 
        isVisible: isInView,
        key: index 
      })}
    </div>
  );
};

const WildfireStory = () => {
  const timelineRef = useRef(null);
  const impactRef = useRef(null);
  const qaRef = useRef(null);

  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start start", "end end"]
  });

  const { scrollYProgress: impactProgress } = useScroll({
    target: impactRef,
    offset: ["start start", "end end"]
  });

  const timelineX = useTransform(timelineProgress, [0, 1], ["0%", "-100%"]);
  const impactX = useTransform(impactProgress, [0, 1], ["0%", "-100%"]);

  // Timeline Events with Components
const timelineEvents = [
  {
    year: "2000",
    title: "Pristine Forests",
    description:
      "Ancient ecosystems thrived in balance. Fire seasons were predictable, lasting 3-4 months. Communities coexisted with natural fire cycles that had sustained forests for millennia.",
    stat1: "2.5M Species",
    stat2: "300M Trees",
    color: "#10b981",
    component: <Map gifSrc="/gifs/fire_barrace.gif" caption="Pristine Forests" />
  },
  {
    year: "2005",
    title: "Early Warning Signs",
    description:
      "Temperatures climbed beyond historical norms. Drought periods extended. Fire seasons stretched to 6-7 months. Scientists documented unusual fire behavior patterns worldwide.",
    stat1: "85% Human-caused",
    stat2: "40°C Average",
    color: "#f59e0b",
    component: <Map gifSrc="/gifs/fire_timeseries.gif" caption="Early Warning Signs" />
  },
  
];


  // Impact Events with Components
  const impactEvents = [
    {
      title: "Ecological Destruction",
      description: "Ancient forests that stood for centuries were reduced to ash in hours. Biodiversity hotspots vanished, disrupting delicate ecosystems that took millennia to evolve.",
      stat1: "2.5M Hectares",
      stat2: "300 Species Lost",
      color: "#dc2626",
      component: <Map />
    },
    {
      title: "Human Displacement",
      description: "Entire communities were forced to evacuate, many never returning home. The psychological and economic toll continues to affect generations of families.",
      stat1: "500K People",
      stat2: "$50B Damage",
      color: "#ea580c",
      component: <Map />
    },
  ];

  // Updated Horizontal Scroll Section Component with Controlled Video Background
  const HorizontalScrollSection = ({
    sectionRef,
    progress,
    x,
    events,
    title,
    subtitle,
    bgColor = "slate-950",
    staticVideo
  }) => {
    return (
      <div ref={sectionRef} className={`relative bg-${bgColor}`} style={{ height: '400vh' }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Controlled Video Background - only plays when section is in view */}
          {staticVideo && (
            <>
              <BackgroundVideoPlayer 
                src={staticVideo} 
                sectionRef={sectionRef}
              />
              <div className="absolute inset-0 bg-black/60" />
            </>
          )}

          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-50 px-8 py-6 bg-gradient-to-b from-black/80 to-transparent">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white">{title}</h2>
                <p className="text-white/60 mt-1">{subtitle}</p>
              </div>
              <motion.div
                className="text-white/60 text-sm flex items-center gap-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span>Scroll to navigate</span>
                <ArrowRight size={16} />
              </motion.div>
            </div>
          </div>

          {/* Horizontal sliding content */}
          <motion.div style={{ x }} className="absolute inset-0 flex items-center">
            <div className="flex h-full" style={{ width: `${events.length * 100}vw` }}>
              {events.map((event, index) => (
                <div
                  key={index}
                  className="relative flex-shrink-0 w-screen h-full flex items-center justify-center px-4 lg:px-8"
                >
                  {/* Content Container */}
                  <div className="relative z-10 w-full h-full flex flex-col lg:flex-row items-center justify-center gap-8 px-4 lg:px-12">
                    
                    {/* Text Content */}
                    <div className="flex-1 max-w-2xl">
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 lg:p-8 border-2 border-white/20 shadow-2xl"
                      >
                        {event.year && (
                          <div className="text-2xl font-bold text-white/80 mb-3">
                            {event.year}
                          </div>
                        )}

                        <div
                          className="inline-block px-4 py-2 rounded-full text-white font-bold text-base lg:text-lg mb-4"
                          style={{ backgroundColor: event.color }}
                        >
                          {event.title}
                        </div>

                        <p className="text-lg lg:text-xl text-gray-200 leading-relaxed mb-6">
                          {event.description}
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4 lg:gap-8">
                          <div className="text-center">
                            <div className="text-2xl lg:text-3xl font-bold text-white mb-2">{event.stat1}</div>
                            <div className="text-gray-300 font-medium text-sm">Impact Scale</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl lg:text-3xl font-bold text-white mb-2">{event.stat2}</div>
                            <div className="text-gray-300 font-medium text-sm">Magnitude</div>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Component Display with Visibility Control */}
                    <div className="flex-1 max-w-2xl h-96 lg:h-[500px]">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full h-full bg-black/40 backdrop-blur-md rounded-3xl border-2 border-white/20 shadow-2xl overflow-hidden"
                      >
                        <VisibilityAwareComponent 
                          component={event.component}
                          index={index}
                          sectionRef={sectionRef}
                        />
                      </motion.div>
                    </div>
                  </div>

                  {/* Section number */}
                  <div className="absolute bottom-6 left-6 text-white/20 text-4xl lg:text-6xl font-bold">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Progress dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-2 bg-black/60 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
            {events.map((event, index) => {
              const start = index / events.length;
              const end = (index + 1) / events.length;

              return (
                <button
                  key={index}
                  onClick={() => {
                    const section = sectionRef.current;
                    const sectionTop = section.offsetTop;
                    const scrollTo = sectionTop + (index / events.length) * (window.innerHeight * 4);
                    window.scrollTo({ top: scrollTo, behavior: 'smooth' });
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    progress.get() >= start && progress.get() < end ? 'w-8' : 'w-4'
                  }`}
                  style={{
                    backgroundColor: (progress.get() >= start && progress.get() < end) ? event.color : 'rgba(255,255,255,0.3)'
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-slate-950">
      <WildfireHeroSection/>
      
      {/* Section 2: Timeline - Horizontal Scroll */}
      <HorizontalScrollSection
        sectionRef={timelineRef}
        progress={timelineProgress}
        x={timelineX}
        events={timelineEvents}
        title="Historical Timeline"
        subtitle="2000-2025: The Evolution of Wildfires"
        staticVideo="/videos/forestBG.mp4"
      />

      {/* Section 3: Impact - Horizontal Scroll */}
      <HorizontalScrollSection
        sectionRef={impactRef}
        progress={impactProgress}
        x={impactX}
        events={impactEvents}
        title="Global Impact"
        subtitle="The Consequences of Uncontrolled Fires"
        bgColor="red-950"
        staticVideo="/videos/impact-bg-1.mp4"
      />

      {/* SurfaceTemp Component */}
    

      {/* Section 4: Q&A - Normal Vertical Scroll */}
      <section className="min-h-screen relative flex items-center justify-center bg-slate-950 px-3 lg:px-4 py-8 lg:py-10 overflow-hidden">
        {/* Video Background for Q&A Section */}
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-30"
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

        <div className="relative z-10 max-w-2xl lg:max-w-3xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-3 mb-4 lg:mb-6 justify-center">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg lg:rounded-xl flex items-center justify-center shadow-xl"
              >
                <MessageCircle className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </motion.div>
              <h2 className="text-xl lg:text-2xl font-bold text-white text-center">
                Your Questions
                <span className="block text-sm lg:text-base text-amber-300 mt-1">Answered by Experts</span>
              </h2>
            </div>

            <div className="bg-black/40 backdrop-blur-xl rounded-xl lg:rounded-2xl p-3 lg:p-4 border border-amber-500/30 shadow-xl mb-4 lg:mb-6">
              <p className="text-sm lg:text-base text-gray-200 mb-3 lg:mb-4 text-center leading-relaxed">
                Have questions about wildfire impact, prevention, or recovery?
                Our AI assistant is here to help you understand this critical issue.
              </p>

              <div className="space-y-2 lg:space-y-3">
                <input
                  type="text"
                  placeholder="What would you like to know about wildfires?"
                  className="w-full bg-black/40 border-2 border-amber-500/30 rounded-lg lg:rounded-xl px-3 py-2 lg:py-3 text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 transition-all text-sm"
                />
                <motion.button
                  className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold py-2 lg:py-3 rounded-lg lg:rounded-xl transition-all transform hover:scale-[1.02] shadow-xl text-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Submit Your Question
                </motion.button>
              </div>
            </div>

            {/* Common questions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-3">
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
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-black/40 border border-amber-500/20 hover:border-amber-500/50 rounded-lg lg:rounded-xl p-2 lg:p-3 text-left text-gray-300 hover:text-white transition-all hover:scale-[1.02] text-xs lg:text-sm"
                >
                  {question}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Fire Animation Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Enhanced Floating Particles */}
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

          {/* Large Fire Glow Particles */}
          <div className="absolute inset-0">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full blur-sm opacity-50"
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
    </div>
  );
};

export default WildfireStory;