import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  Thermometer,
  Globe,
  TrendingUp,
  ChevronDown,
  ArrowRight,
  AlertTriangle
} from 'lucide-react';
import SurfaceTemp from '../components/SurfaceTemp';
import Map from '../components/map';
import VideoMap from '../components/VideoMap';
import MediaMap from '../components/MediaMap';

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
      video.currentTime = 0;
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
      preload="metadata"
      aria-hidden="true"
    />
  );
};

// Component with visibility detection for background videos
const BackgroundVideoPlayer = ({ src, sectionRef }) => {
  const videoRef = useRef(null);
  const isInView = useInView(sectionRef, {
    margin: "-50% 0px -50% 0px",
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
      video.currentTime = 0;
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
    margin: "-30% 0px -30% 0px",
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

// Hero Section for Surface Temperature
const SurfaceTempHeroSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const quoteRef = useRef(null);
  const statsRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen relative flex items-center justify-center overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/heat-wave.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Enhanced Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-blue-900/30 to-blue-950/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 via-transparent to-blue-900/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent" />
        
        {/* Enhanced Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="floating-particle absolute w-1 h-1 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full shadow-lg"
              animate={{
                y: [0, -150],
                x: [0, Math.random() * 60 - 30],
                opacity: [0.8, 0],
                scale: [1, 0.3],
                rotate: [0, 180]
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeOut"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                bottom: '0%'
              }}
            />
          ))}
        </div>

        {/* Large Heat Glow Particles */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-yellow-400 rounded-full blur-sm opacity-60"
              animate={{
                y: [0, -120],
                x: [0, Math.random() * 40 - 20],
                opacity: [0.6, 0],
                scale: [1, 0.2]
              }}
              transition={{
                duration: 5 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 1.5,
                ease: "easeOut"
              }}
              style={{
                left: `${30 + Math.random() * 40}%`,
                bottom: '0%'
              }}
            />
          ))}
        </div>
      </div>

      <motion.div 
        style={{ opacity, scale }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Title Section */}
          <div ref={titleRef} className="space-y-8">
            <div className="overflow-hidden">
              <div className="title-line">
                <span className="text-cyan-300/90 text-sm tracking-[0.3em] uppercase font-light block mb-4 drop-shadow-2xl">
                  2000–2025 • Global Warming
                </span>
              </div>
            </div>

            <div className="space-y-2 overflow-hidden">
              <div className="title-line">
                <h1 className="text-7xl lg:text-8xl xl:text-9xl font-light tracking-tighter leading-none text-white drop-shadow-2xl">
                  Surface
                </h1>
              </div>
              <div className="title-line">
                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-light tracking-tight leading-none text-cyan-100/95 drop-shadow-2xl">
                  Temperature Rise
                </h2>
              </div>
            </div>

            <div className="overflow-hidden">
              <div className="title-line">
                <div className="h-px w-32 bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg" />
              </div>
            </div>

            <div className="overflow-hidden">
              <div className="title-line">
                <p className="text-lg lg:text-xl text-cyan-100/90 leading-relaxed max-w-lg font-light drop-shadow-2xl">
                  Tracking the unprecedented rise in global temperatures and its profound impact on our planet's climate systems and ecosystems.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Quote & Stats */}
          <div className="space-y-8">
            <div ref={quoteRef}>
              <blockquote className="border-l-2 border-cyan-500/60 pl-6 lg:pl-8 backdrop-blur-lg bg-black/30 p-6 rounded-r-2xl border-r border-r-cyan-500/20 shadow-2xl">
                <p className="text-xl lg:text-2xl text-cyan-50 leading-relaxed font-light italic mb-4 drop-shadow-2xl">
                  "The Earth's fever continues to rise—each fraction of a degree reshaping our world in ways we are only beginning to understand."
                </p>
                <footer className="text-sm text-cyan-200/70 tracking-wide font-light">
                  — Global Climate Research Center, 2024
                </footer>
              </blockquote>
            </div>

            <div ref={statsRef} className="grid grid-cols-3 gap-4 lg:gap-6">
              <div className="stat-card space-y-2 p-4 rounded-2xl bg-black/40 backdrop-blur-lg border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-500 group hover:bg-black/50 shadow-xl">
                <div className="text-3xl lg:text-4xl font-light text-cyan-300 drop-shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  +1.2°C
                </div>
                <div className="text-xs lg:text-sm text-cyan-200/80 leading-tight font-light">
                  Since 1880
                </div>
              </div>

              <div className="stat-card space-y-2 p-4 rounded-2xl bg-black/40 backdrop-blur-lg border border-blue-500/30 hover:border-blue-400/60 transition-all duration-500 group hover:bg-black/50 shadow-xl">
                <div className="text-3xl lg:text-4xl font-light text-blue-300 drop-shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  2023
                </div>
                <div className="text-xs lg:text-sm text-blue-200/80 leading-tight font-light">
                  Hottest Year
                </div>
              </div>

              <div className="stat-card space-y-2 p-4 rounded-2xl bg-black/40 backdrop-blur-lg border border-red-500/30 hover:border-red-400/60 transition-all duration-500 group hover:bg-black/50 shadow-xl">
                <div className="text-3xl lg:text-4xl font-light text-red-300 drop-shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  97%
                </div>
                <div className="text-xs lg:text-sm text-red-200/80 leading-tight font-light">
                  Scientific Consensus
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
         
        </motion.div>
         <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-cyan-200/70 tracking-[0.3em] uppercase drop-shadow-2xl font-light">
              Scroll to Explore
            </span>
            <div className="w-px h-20 bg-gradient-to-b from-cyan-400/80 via-blue-500/60 to-transparent shadow-lg" />
          </motion.div>
      </motion.div>
    </section>
  );
};

const SurfaceTempPage = () => {
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

  const timelineX = useTransform(timelineProgress, [0, 1], ["0%", "-200%"]);
  const impactX = useTransform(impactProgress, [0, 1], ["0%", "-100%"]);

  // Timeline Events with Components
  const timelineEvents = [
    {
      year: "",
      title: "Early Warming Signs",
      description:
        "Global surface temperatures began showing consistent upward trends. Glaciers in the Arctic and Himalayas started visibly retreating, signaling the onset of accelerated climate change.",
      stat1: "+0.4°C",
      stat2: "Early Signs",
      color: "#0ea5e9",
      component: (
        <Map
          gifSrc="/gifs/global_temp_bar.gif"
          caption="Global temperature anomaly trend in 2023"
        />
      )
    },
    {
      year: "2005–2023",
      title: "Rising Temperature Trend",
      description:
        "A consistent upward trajectory in global surface temperature anomalies was observed from 2005 to 2023. The scatter points represent annual temperature deviations, while the trendline highlights the unmistakable warming pattern caused by greenhouse gas accumulation.",
      stat1: "+0.65 → +1.2°C",
      stat2: "Warming Trend",
      color: "#fde047",
      component: <Map gifSrc="/gifs/global_temp_scatter.gif" caption="Rapid Arctic ice decline observed in 2005" />
    },
    {
      year: "",
      title: "Extreme Heat Events",
      description:
        "Frequency and intensity of heatwaves increased across multiple continents, leading to droughts and heat stress affecting both humans and wildlife.",
      stat1: "3x more frequent",
      stat2: "Severe",
      color: "#ef4444",
      component: (
        <Map
          gifSrc="/gifs/global_temp_heatmap.gif"
          caption="Extreme heat events frequency"
        />
      ),
    },
    {
      year: "",
      title: "Paris Agreement",
      description: "Global leaders united to limit warming to 1.5°C...",
      stat1: "195 Nations",
      stat2: "1.5°C Goal",
      color: "#10b981",
      component: <Map gifSrc="/gifs/global_temp_line.gif" caption="Paris Agreement and renewable surge" />
    },
  ];

  // Impact Events with Components
 const impactEvents = [
  {
    title: "Polar Ice Melt",
    description: "Arctic and Antarctic ice sheets retreated at unprecedented rates, contributing to sea level rise and disrupting global ocean currents that regulate climate patterns.",
    stat1: "3.4mm/yr",
    stat2: "Sea Level Rise",
    color: "#0ea5e9",
    component: <VideoMap src="/videos/temp.mp4" caption="Polar ice melt 2023" sectionRef={impactRef} />
  },
  {
    title: "Ocean Warming",
    description: "Marine heatwaves devastated coral reefs and disrupted marine ecosystems. Ocean acidification threatened shellfish and plankton, the foundation of marine food webs.",
    stat1: "+0.11°C/decade",
    stat2: "Ocean Temp Rise",
    color: "#3b82f6",
    component: <Map gifSrc="/images/impact.jpg" caption="Paris Agreement and renewable surge" />
  },
];
  // Horizontal Scroll Section Component
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
          {staticVideo && (
            <>
              <BackgroundVideoPlayer 
                src={staticVideo} 
                sectionRef={sectionRef}
              />
              <div className="absolute inset-0 bg-black/60" />
            </>
          )}

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

          <motion.div style={{ x }} className="absolute inset-0 flex items-center">
            <div className="flex h-full" style={{ width: `${events.length * 100}vw` }}>
              {events.map((event, index) => (
                <div
                  key={index}
                  className="relative flex-shrink-0 w-screen h-full flex items-center justify-center px-4 lg:px-8"
                >
                  <div className="relative z-10 w-full h-full flex flex-col lg:flex-row items-center justify-center gap-8 px-4 lg:px-12">
                    
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
                            <div className="text-gray-300 font-medium text-sm">Temperature Impact</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl lg:text-3xl font-bold text-white mb-2">{event.stat2}</div>
                            <div className="text-gray-300 font-medium text-sm">Climate Effect</div>
                          </div>
                        </div>
                      </motion.div>
                    </div>

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

                  <div className="absolute bottom-6 left-6 text-white/20 text-4xl lg:text-6xl font-bold">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

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
      <SurfaceTempHeroSection/>
      
      {/* Section 2: Timeline - Horizontal Scroll */}
      <HorizontalScrollSection
        sectionRef={timelineRef}
        progress={timelineProgress}
        x={timelineX}
        events={timelineEvents}
        title="Temperature Timeline"
        subtitle="2000-2025: The Global Warming Journey"
        staticVideo="/videos/heat-timeline.mp4"
      />

      {/* Section 3: Impact - Horizontal Scroll */}
      <HorizontalScrollSection
        sectionRef={impactRef}
        progress={impactProgress}
        x={impactX}
        events={impactEvents}
        title="Climate Impact"
        subtitle="How Rising Temperatures Reshape Our Planet"
        bgColor="blue-950"
        staticVideo="/videos/ocean-warming.mp4"
      />

      {/* SurfaceTemp Component */}
      <SurfaceTemp/>

      {/* Section 4: Q&A - Normal Vertical Scroll */}
      <section className="min-h-screen relative flex items-center justify-center bg-slate-950 px-3 lg:px-4 py-8 lg:py-10 overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-30"
          src="/videos/climate-qa.mp4"
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
                className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg lg:rounded-xl flex items-center justify-center shadow-xl"
              >
                <Thermometer className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </motion.div>
              <h2 className="text-xl lg:text-2xl font-bold text-white text-center">
                Climate Questions
                <span className="block text-sm lg:text-base text-cyan-300 mt-1">Answered by Scientists</span>
              </h2>
            </div>

            <div className="bg-black/40 backdrop-blur-xl rounded-xl lg:rounded-2xl p-3 lg:p-4 border border-cyan-500/30 shadow-xl mb-4 lg:mb-6">
              <p className="text-sm lg:text-base text-gray-200 mb-3 lg:mb-4 text-center leading-relaxed">
                Have questions about climate change, temperature rise, or solutions?
                Our climate experts are here to provide accurate, science-based answers.
              </p>

              <div className="space-y-2 lg:space-y-3">
                <input
                  type="text"
                  placeholder="What would you like to know about climate change?"
                  className="w-full bg-black/40 border-2 border-cyan-500/30 rounded-lg lg:rounded-xl px-3 py-2 lg:py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-all text-sm"
                />
                <motion.button
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold py-2 lg:py-3 rounded-lg lg:rounded-xl transition-all transform hover:scale-[1.02] shadow-xl text-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Ask Climate Question
                </motion.button>
              </div>
            </div>

            {/* Common questions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-3">
              {[
                "How much has Earth warmed in the last century?",
                "What are the main causes of global warming?",
                "How does climate change affect weather patterns?",
                "What can individuals do to reduce their carbon footprint?",
                "How do scientists measure global temperatures?",
                "What are the most effective climate solutions?"
              ].map((question, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-black/40 border border-cyan-500/20 hover:border-cyan-500/50 rounded-lg lg:rounded-xl p-2 lg:p-3 text-left text-gray-300 hover:text-white transition-all hover:scale-[1.02] text-xs lg:text-sm"
                >
                  {question}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Climate Animation Particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="floating-particle absolute w-1 h-1 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full shadow-lg"
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
                className="absolute w-2 h-2 bg-cyan-400 rounded-full blur-sm opacity-50"
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

export default SurfaceTempPage;