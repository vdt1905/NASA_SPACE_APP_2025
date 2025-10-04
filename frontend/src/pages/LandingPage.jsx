// src/components/LandingPage.jsx
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const cards = [
  {
    id: 1,
    title: "Text 1",
    description: "This card slides into view with horizontal scroll animation.",
    video: "/videos/forestBG.mp4"
  },
  {
    id: 2,
    title: "Text 2", 
    description: "Experience the smooth horizontal scrolling effect.",
    video: "/videos/forestBG.mp4"
  },
  {
    id: 3,
    title: "Text 3",
    description: "Each card moves horizontally as you scroll vertically.",
    video: "/videos/forestBG.mp4"
  },
  {
    id: 4,
    title: "Text 4",
    description: "The background video remains static throughout.",
    video: "/videos/forestBG.mp4"
  },
  {
    id: 5,
    title: "Text 5",
    description: "Scroll down to see all cards slide horizontally.",
    video: "/videos/forestBG.mp4"
  },
  {
    id: 6,
    title: "Text 6",
    description: "Final card in the horizontal scroll journey.",
    video: "/videos/forestBG.mp4"
  }
];

const LandingPage = () => {
  const sectionRef = useRef(null);

  // Track scroll progress for horizontal movement
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Horizontal movement calculation - moves from 0% to -500% to show all 6 cards
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-500%"]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Top hero section */}
      <div className="relative z-10 pt-20 md:pt-28">
        <header className="px-6 text-center">
          <h1 className="text-4xl font-extrabold text-white md:text-6xl drop-shadow">
            Horizontal Scroll Experience
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-gray-200 md:text-lg">
            Scroll vertically to move horizontally through the cards
          </p>
        </header>
      </div>

      {/* Horizontal scroll section */}
      <div
        ref={sectionRef}
        className="relative z-10 h-screen"
      >
        {/* Background video for the entire horizontal section */}
        <video
          className="fixed inset-0 h-full w-full object-cover"
          src="/videos/forestBG.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="fixed inset-0 bg-black/40" />

        {/* Horizontal track that moves with scroll */}
        <motion.div
          style={{ x }}
          className="flex h-full items-center gap-6 px-6 absolute top-0 left-0"
        >
          {cards.map((card, index) => (
            <div
              key={card.id}
              className="relative flex-shrink-0 w-screen h-full flex items-center justify-center px-4 lg:px-8"
            >
              {/* Individual card background video */}
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src={card.video}
                autoPlay
                muted
                loop
                playsInline
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-black/50" />

              {/* Card content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/20 shadow-2xl w-full max-w-2xl relative z-10"
              >
                <h3 className="text-3xl font-bold text-white mb-4">
                  {card.title}
                </h3>
                
                <p className="text-lg text-gray-200 leading-relaxed mb-6">
                  {card.description}
                </p>
                
                <div className="flex items-center gap-3">
                  <a
                    href="#"
                    className="rounded-xl bg-white/90 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-white"
                  >
                    Action
                  </a>
                  <a
                    href="#"
                    className="rounded-xl border border-white/50 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
                  >
                    Learn more
                  </a>
                </div>
              </motion.div>

              {/* Section number */}
              <div className="absolute bottom-6 left-6 text-white/20 text-4xl lg:text-6xl font-bold z-10">
                {String(index + 1).padStart(2, '0')}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 text-white text-center">
        <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
          <span className="text-sm">Scroll to navigate horizontally</span>
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            →
          </motion.div>
        </div>
      </div>

      {/* Vertical scroll sections for components like Map */}
      <div className="relative z-20">
        {/* Map Component Section - appears when scrolling vertically */}
        <section className="min-h-screen flex items-center justify-center bg-black/80">
          <div className="w-full max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-white mb-4">Interactive Map</h2>
              <p className="text-xl text-gray-300">Scroll down to see more components</p>
            </motion.div>
            
            {/* Map container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border-2 border-white/20 shadow-2xl h-96"
            >
              {/* Your Map component will go here */}
              <div className="w-full h-full flex items-center justify-center text-white">
                <p className="text-lg">Map Component Placeholder</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Additional vertical sections for other components */}
        <section className="min-h-screen flex items-center justify-center bg-black/60">
          <div className="w-full max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-white mb-4">Another Component</h2>
              <p className="text-xl text-gray-300">More content appears as you scroll</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border-2 border-white/20 shadow-2xl h-96"
            >
              <div className="w-full h-full flex items-center justify-center text-white">
                <p className="text-lg">Another Component Placeholder</p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default LandingPage;