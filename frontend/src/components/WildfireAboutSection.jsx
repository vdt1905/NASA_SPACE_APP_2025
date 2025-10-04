import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flame, ChevronDown, Trees, Thermometer, Mountain } from 'lucide-react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const WildfireAboutSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const statsRef = useRef(null);
  const particlesRef = useRef(null);
  const fireElementsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation with fire-like effect
      gsap.fromTo(titleRef.current, 
        { 
          opacity: 0,
          y: 100,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Content animation with staggered fire effect
      gsap.fromTo(contentRef.current.querySelectorAll('.content-line'),
        {
          opacity: 0,
          x: -50,
          rotationY: 90
        },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          duration: 1.2,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 70%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Stats animation with flame-like scaling
      gsap.fromTo(statsRef.current.querySelectorAll('.stat-item'),
        {
          opacity: 0,
          scale: 0,
          y: 50
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Particle animation
      gsap.fromTo(particlesRef.current.querySelectorAll('.fire-particle'),
        {
          scale: 0,
          opacity: 0,
          y: 100
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 2,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Fire elements animation
      fireElementsRef.current.forEach((element, index) => {
        gsap.to(element, {
          scale: 1.2,
          opacity: 0.8,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.5
        });
      });

      // Background gradient animation
      gsap.to(sectionRef.current, {
        background: "linear-gradient(45deg, #0c4a6e 0%, #7c2d12 25%, #431407 50%, #1e1b4b 75%, #000000 100%)",
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Create fire particles
  const FireParticles = () => (
    <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="fire-particle absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.sin(i) * 50, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          <div className={`w-2 h-2 rounded-full ${
            i % 3 === 0 ? 'bg-orange-500' : 
            i % 3 === 1 ? 'bg-red-500' : 'bg-yellow-400'
          } blur-sm`} />
        </motion.div>
      ))}
    </div>
  );

  // Fire wave effect
  const FireWave = () => (
    <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          ref={el => fireElementsRef.current[i] = el}
          className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-orange-500 to-transparent opacity-60"
          style={{
            y: i * 8,
            filter: `blur(${i * 2}px)`
          }}
        />
      ))}
    </div>
  );

  // Burning text effect component
  const BurningText = ({ children, className = "" }) => (
    <motion.span
      className={`relative inline-block ${className}`}
      animate={{
        textShadow: [
          '0 0 10px rgba(255, 100, 0, 0.5)',
          '0 0 20px rgba(255, 50, 0, 0.8)',
          '0 0 30px rgba(255, 0, 0, 1)',
          '0 0 20px rgba(255, 50, 0, 0.8)',
          '0 0 10px rgba(255, 100, 0, 0.5)',
        ]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.span>
  );

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-orange-950 to-slate-900"
    >
      {/* Animated Background Layers */}
      <div className="absolute inset-0">
        {/* Smoke overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-gray-800/30 via-transparent to-black/50"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Ember glow */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <FireParticles />
      <FireWave />

      <div className="relative z-10 max-w-6xl mx-auto px-8 text-center">
        {/* Main Title with Fire Animation */}
        <div ref={titleRef} className="mb-12">
          <motion.div
            className="flex items-center justify-center gap-6 mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-orange-500 via-red-600 to-yellow-400 rounded-3xl flex items-center justify-center shadow-2xl border-4 border-orange-300/50">
                <Flame className="w-12 h-12 text-white" />
              </div>
              {/* Flame glow */}
              <motion.div
                className="absolute inset-0 rounded-3xl bg-orange-500 blur-xl"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
            
            <div>
              <h1 className="text-7xl md:text-8xl font-bold text-white mb-4 leading-tight">
                <BurningText className="text-orange-400">WILDFIRE</BurningText>
              </h1>
              <motion.p 
                className="text-3xl md:text-4xl text-orange-200 font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
              >
                25 Years of <BurningText className="text-red-400">Transformation</BurningText>
              </motion.p>
            </div>
          </motion.div>
        </div>

        {/* Content with Fire-themed Stagger Animation */}
        <div ref={contentRef} className="mb-16">
          <motion.div
            className="max-w-4xl mx-auto bg-black/40 backdrop-blur-xl rounded-3xl p-12 border-2 border-orange-500/30 shadow-2xl relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            {/* Burning border effect */}
            <motion.div
              className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500 via-red-600 to-yellow-400 opacity-20 blur-sm"
              animate={{
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <div className="relative z-10">
              <p className="content-line text-2xl md:text-3xl text-gray-200 leading-relaxed mb-8 font-light">
                Over the past <BurningText className="text-orange-300">quarter-century</BurningText>, wildfires have evolved from predictable seasonal events into{' '}
                <BurningText className="text-red-300">year-round catastrophes</BurningText> that reshape landscapes, displace communities, and accelerate climate change.
              </p>
              
              <p className="content-line text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
                This is the story of how <BurningText className="text-yellow-300">fire transformed our world</BurningText>—and how we must adapt to survive in this new era of{' '}
                <BurningText className="text-orange-400">unprecedented challenges</BurningText>.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Wildfire Statistics with Flame Animations */}
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              icon: Trees,
              value: "25",
              label: "Years of Data",
              description: "Comprehensive wildfire tracking",
              color: "from-emerald-400 to-green-500"
            },
            {
              icon: Thermometer,
              value: "+2.5°C",
              label: "Temperature Rise",
              description: "Global warming impact",
              color: "from-orange-400 to-red-500"
            },
            {
              icon: Mountain,
              value: "200M+",
              label: "Acres Burned",
              description: "Total area affected",
              color: "from-red-400 to-rose-500"
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="stat-item group relative"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative bg-black/40 backdrop-blur-lg rounded-2xl p-8 border-2 border-orange-500/20 hover:border-orange-500/50 transition-all duration-300 h-full">
                {/* Animated background glow */}
                <motion.div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 blur-sm`}
                  animate={{
                    opacity: [0.05, 0.1, 0.05],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <div className="relative z-10 text-center">
                  <motion.div
                    className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <stat.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <motion.div
                    className="text-4xl font-bold text-white mb-2"
                    animate={{
                      textShadow: [
                        '0 0 0px rgba(255, 255, 255, 0)',
                        '0 0 10px rgba(255, 100, 0, 0.5)',
                        '0 0 0px rgba(255, 255, 255, 0)',
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  
                  <div className="text-lg font-semibold text-orange-300 mb-2">
                    {stat.label}
                  </div>
                  
                  <div className="text-sm text-gray-400">
                    {stat.description}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="mt-16 text-orange-300"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-sm mb-2 font-medium tracking-wider uppercase">
            Scroll to Ignite the Timeline
          </div>
          <motion.div
            className="w-8 h-12 border-2 border-orange-300 rounded-full mx-auto flex justify-center relative"
            animate={{
              borderColor: ['rgba(253, 186, 116, 1)', 'rgba(251, 146, 60, 1)', 'rgba(249, 115, 22, 1)'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.div
              animate={{ 
                y: [0, 16, 0],
                opacity: [1, 0, 1],
                backgroundColor: ['#fdba74', '#fb923c', '#f97316']
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-1 h-3 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WildfireAboutSection;