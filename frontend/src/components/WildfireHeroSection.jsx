import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

const WildfireHeroSection = () => {
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
        x: 100,
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
          <source src="https://assets.mixkit.co/videos/preview/mixkit-fire-spreading-through-dry-grass-43557-large.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Enhanced Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        
        {/* Enhanced Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="floating-particle absolute w-1 h-1 bg-gradient-to-b from-orange-400 to-red-500 rounded-full shadow-lg"
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

        {/* Large Fire Glow Particles */}
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

      {/* Cosmic Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-15 mix-blend-overlay"
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
                <span className="text-amber-300/90 text-sm tracking-[0.3em] uppercase font-light block mb-4 drop-shadow-2xl">
                  2000–2025 • Earth's Burning Story
                </span>
              </div>
            </div>

            <div className="space-y-2 overflow-hidden">
              <div className="title-line">
                <h1 className="text-7xl lg:text-8xl xl:text-9xl font-light tracking-tighter leading-none text-white drop-shadow-2xl">
                  Wildfire
                </h1>
              </div>
              <div className="title-line">
                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-light tracking-tight leading-none text-amber-100/95 drop-shadow-2xl">
                  Planetary Shift
                </h2>
              </div>
            </div>

            <div className="overflow-hidden">
              <div className="title-line">
                <div className="h-px w-32 bg-gradient-to-r from-amber-500 to-orange-600 shadow-lg" />
              </div>
            </div>

            <div className="overflow-hidden">
              <div className="title-line">
                <p className="text-lg lg:text-xl text-amber-100/90 leading-relaxed max-w-lg font-light drop-shadow-2xl">
                  Witness the transformation of our planet through 25 years of escalating wildfires and their profound impact on Earth's ecosystems.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Quote & Stats */}
          <div className="space-y-8">
            <div ref={quoteRef}>
              <blockquote className="border-l-2 border-amber-500/60 pl-6 lg:pl-8 backdrop-blur-lg bg-black/30 p-6 rounded-r-2xl border-r border-r-amber-500/20 shadow-2xl">
                <p className="text-xl lg:text-2xl text-amber-50 leading-relaxed font-light italic mb-4 drop-shadow-2xl">
                  "The flames that reshape our landscapes are rewriting the story of our climate—a transformation visible from forest floors to satellite orbits."
                </p>
                <footer className="text-sm text-amber-200/70 tracking-wide font-light">
                  — Global Climate Observatory, 2024
                </footer>
              </blockquote>
            </div>

            <div ref={statsRef} className="grid grid-cols-3 gap-4 lg:gap-6">
              <div className="stat-card space-y-2 p-4 rounded-2xl bg-black/40 backdrop-blur-lg border border-amber-500/30 hover:border-amber-400/60 transition-all duration-500 group hover:bg-black/50 shadow-xl">
                <div className="text-3xl lg:text-4xl font-light text-amber-300 drop-shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  78%
                </div>
                <div className="text-xs lg:text-sm text-amber-200/80 leading-tight font-light">
                  Increase in Major Fire Events
                </div>
              </div>

              <div className="stat-card space-y-2 p-4 rounded-2xl bg-black/40 backdrop-blur-lg border border-orange-500/30 hover:border-orange-400/60 transition-all duration-500 group hover:bg-black/50 shadow-xl">
                <div className="text-3xl lg:text-4xl font-light text-orange-300 drop-shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  4.2×
                </div>
                <div className="text-xs lg:text-sm text-orange-200/80 leading-tight font-light">
                  Longer Burning Seasons
                </div>
              </div>

              <div className="stat-card space-y-2 p-4 rounded-2xl bg-black/40 backdrop-blur-lg border border-red-500/30 hover:border-red-400/60 transition-all duration-500 group hover:bg-black/50 shadow-xl">
                <div className="text-3xl lg:text-4xl font-light text-red-300 drop-shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  300%
                </div>
                <div className="text-xs lg:text-sm text-red-200/80 leading-tight font-light">
                  Growth in Annual Burn Area
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
            className="flex flex-col items-center gap-3"
          >
            <span className="text-xs text-amber-200/70 tracking-[0.3em] uppercase drop-shadow-2xl font-light">
              Scroll to Explore
            </span>
            <div className="w-px h-20 bg-gradient-to-b from-amber-400/80 via-orange-500/60 to-transparent shadow-lg" />
          </motion.div>
      </motion.div>
    </section>
  );
};

export default WildfireHeroSection;