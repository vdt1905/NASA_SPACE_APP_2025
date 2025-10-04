// src/components/StoryJourney.jsx
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Scene1 from '../components/scenes/Scene1';
import Scene2 from '../components/scenes/Scene2';
import Scene3 from '../components/scenes/Scene3';
import Navigation from '../components/ui/Navigation';
import ProgressIndicator from '../components/ui/ProgressIndicator';

const StoryJourney = () => {
  const containerRef = useRef(null);
  const [currentSection, setCurrentSection] = useState(1);
  const [isScrolling, setIsScrolling] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth section navigation
  const scrollToSection = (sectionId) => {
    if (isScrolling) return;

    setIsScrolling(true);
    const element = document.getElementById(`section-${sectionId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setTimeout(() => setIsScrolling(false), 1000);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (isScrolling) return;
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        scrollToSection(Math.min(5, currentSection + 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        scrollToSection(Math.max(1, currentSection - 1));
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSection, isScrolling]);

  return (
    <div ref={containerRef} className="story-journey">
      {/* Full-page sections */}
      <div className="sections-container">
        <SectionWrapper 
          id={1} 
          onInView={() => setCurrentSection(1)}
          background="blue"
        >
          <Scene1 />
        </SectionWrapper>

        <SectionWrapper 
          id={2} 
          onInView={() => setCurrentSection(2)}
          background="teal"
        >
          <Scene2 />
        </SectionWrapper>

        <SectionWrapper 
          id={3} 
          onInView={() => setCurrentSection(3)}
          background="green"
        >
          <Scene3 />
        </SectionWrapper>

        {/* <SectionWrapper 
          id={4} 
          onInView={() => setCurrentSection(4)}
          background="orange"
        >
          <Scene4 />
        </SectionWrapper>

        <SectionWrapper 
          id={5} 
          onInView={() => setCurrentSection(5)}
          background="purple"
        >
          <Scene5 />
        </SectionWrapper> */}
      </div>

      {/* UI Overlays */}
      <Navigation 
        currentSection={currentSection}
        onSectionChange={scrollToSection}
        totalSections={5}
      />
      
      <ProgressIndicator 
        progress={scrollYProgress}
        currentSection={currentSection}
      />
    </div>
  );
};

// Section Wrapper Component
const SectionWrapper = ({ id, children, onInView, background = 'blue' }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onInView();
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [onInView]);

  const backgroundClasses = {
    blue: 'bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-800',
    teal: 'bg-gradient-to-br from-teal-900 via-teal-700 to-emerald-800',
    green: 'bg-gradient-to-br from-green-900 via-emerald-700 to-lime-800',
    orange: 'bg-gradient-to-br from-orange-900 via-amber-700 to-yellow-800',
    purple: 'bg-gradient-to-br from-purple-900 via-violet-700 to-fuchsia-800'
  };

  return (
    <section
      id={`section-${id}`}
      ref={sectionRef}
      className={`min-h-screen relative overflow-hidden ${backgroundClasses[background]}`}
    >
      {children}
    </section>
  );
};

export default StoryJourney;