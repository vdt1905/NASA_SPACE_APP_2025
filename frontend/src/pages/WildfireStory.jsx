import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Flame,
  MessageCircle,
  ChevronDown,
  ArrowRight
} from 'lucide-react';
import Map from '../components/map';
import WildfireHeroSection from '../components/WildfireHeroSection';
const WildfireStory = () => {
  const timelineRef = useRef(null);
  const impactRef = useRef(null);
  const solutionsRef = useRef(null);

  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start start", "end end"]
  });

  const { scrollYProgress: impactProgress } = useScroll({
    target: impactRef,
    offset: ["start start", "end end"]
  });

  const { scrollYProgress: solutionsProgress } = useScroll({
    target: solutionsRef,
    offset: ["start start", "end end"]
  });

  const timelineX = useTransform(timelineProgress, [0, 1], ["0%", "-500%"]);
  const impactX = useTransform(impactProgress, [0, 1], ["0%", "-100%"]);
  const solutionsX = useTransform(solutionsProgress, [0, 1], ["0%", "-100%"]);

  // Timeline Events with Components
  const timelineEvents = [
    {
      year: "2000",
      title: "Pristine Forests",
      description: "Ancient ecosystems thrived in balance. Fire seasons were predictable, lasting 3-4 months. Communities coexisted with natural fire cycles that had sustained forests for millennia.",
      stat1: "2.5M Species",
      stat2: "300M Trees",
      color: "#10b981",
      component: <Map />
    },
    {
      year: "2005",
      title: "Early Warning Signs",
      description: "Temperatures climbed beyond historical norms. Drought periods extended. Fire seasons stretched to 6-7 months. Scientists documented unusual fire behavior patterns worldwide.",
      stat1: "85% Human-caused",
      stat2: "40°C Average",
      color: "#f59e0b",
      component: <Map />
    },
    {
      year: "2010",
      title: "Megafire Era Begins",
      description: "Russia's worst fire season in history. Unprecedented intensity across the American West. Fires that once burned for weeks now lasted months, defying containment efforts.",
      stat1: "1000+ Acres/hr",
      stat2: "2000°F Peak",
      color: "#f97316",
      component: <Map />
    },
    {
      year: "2015",
      title: "Global Crisis",
      description: "Indonesia's peatland fires released more carbon than entire countries. Mediterranean regions faced catastrophic seasons. Fire-generated thunderstorms created tornado-like vortexes.",
      stat1: "5M Acres burned",
      stat2: "500M Animals lost",
      color: "#dc2626",
      component: <Map />
    },
    {
      year: "2020",
      title: "The Black Summer",
      description: "Australia burned 46 million acres. California experienced 5 of its 6 largest fires in a single year. Smoke traveled continents. The pyrocene era was officially recognized.",
      stat1: "46M Acres",
      stat2: "1B+ Animals",
      color: "#991b1b",
      component: <Map />
    },
    {
      year: "2025",
      title: "Adaptation Era",
      description: "Fire-adapted building codes implemented. Indigenous practices recognized. Technology improved predictions. Humanity began learning to coexist with fire in a warming world.",
      stat1: "50+ Species adapt",
      stat2: "100yrs to recover",
      color: "#059669",
      component: <Map />
    }
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

  // Solutions Events with Components
  const solutionsEvents = [
    {
      title: "Prevention Technology",
      description: "Advanced satellite monitoring and AI prediction systems now detect fire risks weeks in advance. Drones and sensors create early warning networks.",
      stat1: "90% Accuracy",
      stat2: "48H Early Warning",
      color: "#059669",
      component: <Map />
    },
    {
      title: "Sustainable Management",
      description: "Controlled burns and forest thinning restore natural fire cycles. Indigenous knowledge combines with modern science for ecosystem management.",
      stat1: "1M Acres Managed",
      stat2: "80% Risk Reduction",
      color: "#0d9488",
      component: <Map />
    },
  ];

  // Updated Horizontal Scroll Section Component with Static Video Background
  const HorizontalScrollSection = ({
    sectionRef,
    progress,
    x,
    events,
    title,
    subtitle,
    bgColor = "slate-950",
    staticVideo
  }) => (
    <div ref={sectionRef} className={`relative bg-${bgColor}`} style={{ height: '400vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Static Video Background - stays fixed */}
        {staticVideo && (
          <>
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={staticVideo}
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
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

                  {/* Component Display */}
                  <div className="flex-1 max-w-2xl h-96 lg:h-[500px]">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="w-full h-full bg-black/40 backdrop-blur-md rounded-3xl border-2 border-white/20 shadow-2xl overflow-hidden"
                    >
                      {event.component}
                      
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

  return (
    <div className="bg-slate-950">
      <WildfireHeroSection/>
      {/* <section className="min-h-screen relative flex items-center justify-center overflow-hidden">
        
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/hero-bg.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/40 to-slate-900/90" />

     
        <div className="relative z-10 max-w-6xl mx-auto px-4 lg:px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
          >
            
            <motion.div 
              className="mb-12 lg:mb-16"
              initial={{ opacity: 0, scale: 1.1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, delay: 0.3 }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 lg:mb-6 tracking-tighter">
                <span className="bg-gradient-to-r from-amber-500 via-orange-600 to-red-700 bg-clip-text text-transparent">
                  INFERNO
                </span>
              </h1>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.7 }}
                className="border-l-4 border-amber-500 pl-4 lg:pl-6 my-4 lg:my-6"
              >
                <p className="text-xl md:text-3xl lg:text-4xl text-amber-100 font-medium text-left leading-tight">
                  When Earth<br />
                  <span className="text-orange-300 font-bold">Fights Back</span>
                </p>
              </motion.div>
              <motion.p 
                className="text-base lg:text-lg text-gray-300 mt-4 lg:mt-6 font-light tracking-wider uppercase border-t border-orange-500/30 pt-3 lg:pt-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
              >
                2000–2025 • The Age of Fire
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.4 }}
              className="max-w-4xl lg:max-w-5xl mx-auto mb-12 lg:mb-16"
            >
              <div className="bg-gradient-to-r from-black/50 to-slate-900/40 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-orange-600/30 shadow-2xl">
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                  className="text-lg md:text-xl lg:text-2xl text-gray-100 leading-relaxed font-serif italic"
                >
                  "We taught fire to burn for us, never imagining it would learn to think for itself—<span className="text-amber-300 font-semibold">evolving from servant to sovereign</span> in a world we thought we controlled."
                </motion.p>
              </div>
            </motion.div>

         
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 max-w-5xl lg:max-w-6xl mx-auto mb-12 lg:mb-16"
            >
              {[
                {
                  value: "78%",
                  label: "Increase in Fire Frequency",
                  description: "More fires ignite each year as conditions worsen",
                  highlight: "Accelerating Threat",
                  delay: 0.7
                },
                {
                  value: "4.2×",
                  label: "Longer Fire Seasons",
                  description: "What was seasonal is now nearly year-round",
                  highlight: "Extended Impact",
                  delay: 0.9
                },
                {
                  value: "300%",
                  label: "Growth in Burn Area",
                  description: "Fires consume exponentially more land",
                  highlight: "Expanding Scale",
                  delay: 1.1
                }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, rotateY: 90 }}
                  whileInView={{ opacity: 1, rotateY: 0 }}
                  transition={{ duration: 0.8, delay: stat.delay }}
                  className="group"
                >
                  <div className="bg-gradient-to-br from-slate-800/70 to-slate-900/90 backdrop-blur-lg rounded-xl lg:rounded-2xl p-4 lg:p-6 border-2 border-amber-600/30 hover:border-amber-500/60 transition-all duration-500 h-full">
                    <div className="text-center">
                      <div className="text-3xl lg:text-4xl font-black text-amber-500 mb-3 group-hover:text-amber-400 transition-colors duration-300">
                        {stat.value}
                      </div>
                      <div className="text-base lg:text-lg font-bold text-white mb-3 tracking-wide">
                        {stat.label}
                      </div>
                      <div className="text-gray-300 mb-3 leading-relaxed text-sm lg:text-base">
                        {stat.description}
                      </div>
                      <div className="inline-block px-3 py-1 bg-amber-900/30 rounded-full text-amber-300 font-medium text-xs uppercase tracking-wider border border-amber-600/30">
                        {stat.highlight}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

           
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 1.3 }}
              className="max-w-2xl lg:max-w-3xl mx-auto mb-8 lg:mb-12"
            >
              <div className="bg-gradient-to-br from-orange-900/20 to-red-900/20 backdrop-blur-lg rounded-2xl lg:rounded-3xl p-6 lg:p-8 border-2 border-orange-500/40 shadow-xl">
                <motion.h3 
                  className="text-lg lg:text-xl font-black text-white mb-3 lg:mb-4 uppercase tracking-widest"
                  animate={{ textShadow: ["0 0 8px rgba(251,191,36,0.3)", "0 0 16px rgba(251,191,36,0.6)", "0 0 8px rgba(251,191,36,0.3)"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Witness The Transformation
                </motion.h3>
                <motion.p 
                  className="text-gray-200 mb-4 lg:mb-6 text-sm lg:text-base leading-relaxed font-light"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.5 }}
                >
                  Journey through a quarter-century of escalating fire intensity—from early warning signs to the frontline of climate response and innovative firefighting technologies.
                </motion.p>
                
              
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="flex flex-col items-center text-amber-300/80"
                >
                  <div className="text-sm lg:text-base font-bold tracking-wider mb-2 uppercase">
                    Continue Journey
                  </div>
                  <div className="w-5 h-10 lg:w-6 lg:h-12 border-2 border-amber-400/60 rounded-full flex justify-center pt-2">
                    <motion.div
                      animate={{ y: [0, 8, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "circInOut" }}
                      className="w-1 h-2 lg:w-1 lg:h-3 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>

       
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
      </section>
       */}
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

      {/* Section 4: Solutions - Horizontal Scroll */}
      <HorizontalScrollSection
        sectionRef={solutionsRef}
        progress={solutionsProgress}
        x={solutionsX}
        events={solutionsEvents}
        title="Solutions & Hope"
        subtitle="Innovative Approaches to Fire Management"
        bgColor="green-950"
        staticVideo="/videos/solutions-bg-1.mp4"
      />

      {/* Section 5: Q&A - Normal Vertical Scroll */}
      <section className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 px-4 lg:px-6 py-12 lg:py-16 overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/80 to-slate-900/90" />

        <div className="relative z-10 max-w-3xl lg:max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-4 mb-6 lg:mb-8 justify-center">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl lg:rounded-2xl flex items-center justify-center shadow-2xl"
              >
                <MessageCircle className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
              </motion.div>
              <h2 className="text-2xl lg:text-4xl font-bold text-white text-center">
                Your Questions
                <span className="block text-base lg:text-xl text-purple-300 mt-1">Answered by Experts</span>
              </h2>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-4 lg:p-6 border border-purple-500/30 shadow-2xl mb-6 lg:mb-8">
              <p className="text-base lg:text-lg text-gray-200 mb-4 lg:mb-6 text-center leading-relaxed">
                Have questions about wildfire impact, prevention, or recovery?
                Our AI assistant is here to help you understand this critical issue.
              </p>

              <div className="space-y-3 lg:space-y-4">
                <input
                  type="text"
                  placeholder="What would you like to know about wildfires?"
                  className="w-full bg-black/40 border-2 border-purple-500/30 rounded-xl lg:rounded-2xl px-3 lg:px-4 py-3 lg:py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all text-sm lg:text-base"
                />
                <motion.button
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 lg:py-4 rounded-xl lg:rounded-2xl transition-all transform hover:scale-[1.02] shadow-2xl text-sm lg:text-base"
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
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-black/40 border border-purple-500/20 hover:border-purple-500/50 rounded-xl lg:rounded-2xl p-3 lg:p-4 text-left text-gray-300 hover:text-white transition-all hover:scale-[1.02] text-sm lg:text-base"
                >
                  {question}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default WildfireStory;