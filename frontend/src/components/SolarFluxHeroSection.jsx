import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

const SolarFluxHeroSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const quoteRef = useRef(null);
  const statsRef = useRef(null);
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current?.querySelectorAll('.title-line'), {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.3
      });

      gsap.from(quoteRef.current, {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        delay: 1
      });

      gsap.from(statsRef.current?.querySelectorAll('.stat-card'), {
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        delay: 1.5
      });

      gsap.to('.floating-particle', {
        y: -200,
        rotation: 360,
        opacity: 0,
        duration: 4,
        stagger: 0.2,
        repeat: -1,
        ease: 'power1.inOut'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleEnded = () => setIsPlaying(false);
      audio.addEventListener('ended', handleEnded);
      return () => audio.removeEventListener('ended', handleEnded);
    }
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen relative flex items-center justify-center overflow-hidden"
    >
      {/* Audio Element */}
     
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-sun-flares-on-the-surface-of-the-sun-42957-large.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Enhanced Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-purple-900/30 to-indigo-900/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/50 via-transparent to-cyan-900/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-yellow-600/20 via-transparent to-transparent" />
        
        {/* Solar Flare Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="floating-particle absolute w-1 h-1 bg-gradient-to-b from-yellow-300 to-orange-500 rounded-full shadow-lg"
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

        {/* Large Solar Flares */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-yellow-300 rounded-full blur-md opacity-70"
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

        {/* Cosmic Rays */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-32 bg-gradient-to-b from-cyan-400/80 to-transparent"
              animate={{
                opacity: [0, 0.6, 0],
                scaleX: [1, 1.5, 1]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: '0%',
                transformOrigin: 'center top'
              }}
            />
          ))}
        </div>
      </div>

      {/* Cosmic Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-10 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 2000 2000' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.3'/%3E%3C/svg%3E")`
        }}
      />

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
                  2020–2025 • Cosmic Energy Revolution
                </span>
              </div>
            </div>

            <div className="space-y-2 overflow-hidden">
              <div className="title-line">
                <h1 className="text-7xl lg:text-8xl xl:text-9xl font-light tracking-tighter leading-none text-white drop-shadow-2xl">
                  SolarFlux
                </h1>
              </div>
              <div className="title-line">
                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-light tracking-tight leading-none text-cyan-100/95 drop-shadow-2xl">
                  Infinite Power
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
                  Harnessing the boundless energy of our sun to power a sustainable future and transform global energy systems.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Quote & Stats */}
          <div className="space-y-8">
            <div ref={quoteRef}>
              <blockquote className="border-l-2 border-cyan-500/60 pl-6 lg:pl-8 backdrop-blur-lg bg-black/30 p-6 rounded-r-2xl border-r border-r-cyan-500/20 shadow-2xl">
                <p className="text-xl lg:text-2xl text-cyan-50 leading-relaxed font-light italic mb-4 drop-shadow-2xl">
                  "The sun delivers more energy to Earth in one hour than humanity uses in an entire year—unlocking this potential is our greatest opportunity."
                </p>
                <footer className="text-sm text-cyan-200/70 tracking-wide font-light">
                  — International Solar Energy Council, 2024
                </footer>
              </blockquote>
            </div>

            <div ref={statsRef} className="grid grid-cols-3 gap-4 lg:gap-6">
              <div className="stat-card space-y-2 p-4 rounded-2xl bg-black/40 backdrop-blur-lg border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-500 group hover:bg-black/50 shadow-xl">
                <div className="text-3xl lg:text-4xl font-light text-cyan-300 drop-shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  45%
                </div>
                <div className="text-xs lg:text-sm text-cyan-200/80 leading-tight font-light">
                  Annual Growth Rate
                </div>
              </div>

              <div className="stat-card space-y-2 p-4 rounded-2xl bg-black/40 backdrop-blur-lg border border-blue-500/30 hover:border-blue-400/60 transition-all duration-500 group hover:bg-black/50 shadow-xl">
                <div className="text-3xl lg:text-4xl font-light text-blue-300 drop-shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  2.8TW
                </div>
                <div className="text-xs lg:text-sm text-blue-200/80 leading-tight font-light">
                  Global Capacity
                </div>
              </div>

              <div className="stat-card space-y-2 p-4 rounded-2xl bg-black/40 backdrop-blur-lg border border-purple-500/30 hover:border-purple-400/60 transition-all duration-500 group hover:bg-black/50 shadow-xl">
                <div className="text-3xl lg:text-4xl font-light text-purple-300 drop-shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  85%
                </div>
                <div className="text-xs lg:text-sm text-purple-200/80 leading-tight font-light">
                  Cost Reduction
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
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-3"
          >
            <span className="text-xs text-cyan-200/70 tracking-[0.3em] uppercase drop-shadow-2xl font-light">
              Scroll to Explore
            </span>
            <div className="w-px h-20 bg-gradient-to-b from-cyan-400/80 via-blue-500/60 to-transparent shadow-lg" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SolarFluxHeroSection;