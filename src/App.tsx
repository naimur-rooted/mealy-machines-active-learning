import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SlideNavigation } from './components/SlideNavigation';
import { ScaledSlide } from './components/ScaledSlide';
import { presentationSound } from './lib/presentationSound';
import { Slide00Welcome } from './slides/Slide00Welcome';
import { Slide01Cover } from './slides/Slide01Cover';
import { Slide02Motivation } from './slides/Slide02Motivation';
import { Slide03FormalDefinition } from './slides/Slide03FormalDefinition';
import { Slide04MealyVsMoore } from './slides/Slide04MealyVsMoore';
import { Slide05ActiveLearning } from './slides/Slide05ActiveLearning';
import { Slide06ObservationTable } from './slides/Slide06ObservationTable';
import { Slide07TLSFuzzing } from './slides/Slide07TLSFuzzing';
import { Slide08PassportCaseStudy } from './slides/Slide08PassportCaseStudy';
import { Slide09LSharpAlgorithm } from './slides/Slide09LSharpAlgorithm';
import { Slide10MealyWithTimers } from './slides/Slide10MealyWithTimers';
import { Slide11CompilerConnection } from './slides/Slide11CompilerConnection';
import { Slide11Synthesis } from './slides/Slide11Synthesis';
import { Slide12References } from './slides/Slide12References';

const slides = [
  { id: 'welcome', title: 'Welcome & Course Intro', component: Slide00Welcome },
  { id: 'cover', title: 'Hero Cover & Overview', component: Slide01Cover },
  { id: 'mealy-vs-moore', title: 'Subway Dilemma: Moore vs. Mealy', component: Slide04MealyVsMoore },
  { id: 'motivation', title: 'The Black-Box Crisis', component: Slide02Motivation },
  { id: 'formal-def', title: 'Formal 6-Tuple Definition', component: Slide03FormalDefinition },
  { id: 'active-learning', title: 'Active Automata Learning', component: Slide05ActiveLearning },
  { id: 'obs-table', title: 'Inside the Observation Table', component: Slide06ObservationTable },
  { id: 'tls-fuzzing', title: 'Case 1: Protocol State Fuzzing', component: Slide07TLSFuzzing },
  { id: 'compiler-connection', title: 'The Compiler Design Connection', component: Slide11CompilerConnection },
  { id: 'passport-case', title: 'Case 2: Biometric e-Passport', component: Slide08PassportCaseStudy },
  { id: 'lsharp-algo', title: 'Frontier: The L# Algorithm', component: Slide09LSharpAlgorithm },
  { id: 'timers-mealy', title: 'Frontier: Mealy with Timers', component: Slide10MealyWithTimers },
  { id: 'synthesis', title: 'Synthesis & Core Takeaways', component: Slide11Synthesis },
  { id: 'references', title: 'Academic References', component: Slide12References },
];

// Global navigation gate interface (like OfferMangeService)
declare global {
  interface Window {
    __slideNavigationGate?: {
      trigger?: () => boolean;
      prev?: () => boolean;
      locked?: boolean;
      step?: number;
      subSteps?: string[];
      goToStep?: (step: number) => void;
      tooltip?: string;
    };
  }
}

export function App() {
  // Read initial slide from URL hash or localStorage so refreshing stays on the current slide
  const [currentSlide, setCurrentSlide] = useState(() => {
    try {
      const hash = window.location.hash.replace('#', '');
      const hashIndex = parseInt(hash, 10);
      if (!isNaN(hashIndex) && hashIndex >= 0 && hashIndex < slides.length) {
        return hashIndex;
      }
      const saved = localStorage.getItem('current_presentation_slide');
      if (saved !== null) {
        const savedIndex = parseInt(saved, 10);
        if (!isNaN(savedIndex) && savedIndex >= 0 && savedIndex < slides.length) {
          return savedIndex;
        }
      }
    } catch (e) {
      // fallback to 0
    }
    return 0;
  });

  const [direction, setDirection] = useState(1);
  const [soundMuted, setSoundMuted] = useState(presentationSound.isMuted());

  const toggleSound = () => {
    presentationSound.toggle();
    setSoundMuted(presentationSound.isMuted());
  };

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < slides.length && index !== currentSlide) {
      setDirection(index > currentSlide ? 1 : -1);
      setCurrentSlide(index);
      try {
        localStorage.setItem('current_presentation_slide', String(index));
        window.history.replaceState(null, '', `#${index}`);
      } catch (e) {}
      // Play the authentic mechanical sliding sound from your reference repo
      presentationSound.play("transition");
    }
  }, [currentSlide]);

  const nextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      goToSlide(currentSlide + 1);
    }
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1);
    }
  }, [currentSlide, goToSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        if (window.__slideNavigationGate?.trigger) {
          e.preventDefault();
          const handled = window.__slideNavigationGate.trigger();
          if (handled) return;
        }
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        if (window.__slideNavigationGate?.prev) {
          e.preventDefault();
          const handled = window.__slideNavigationGate.prev();
          if (handled) return;
        }
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Home') {
        goToSlide(0);
      } else if (e.key === 'End') {
        goToSlide(slides.length - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, goToSlide]);

  const CurrentSlideComponent = slides[currentSlide].component;

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '4%' : '-4%',
      opacity: 0,
      scale: 0.99
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.38,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-4%' : '4%',
      opacity: 0,
      scale: 0.99,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#08080d]">
      {/* Global Noise Overlay Layer */}
      <div className="noise-overlay" />

      {/* Presentation Engine HUD */}
      <SlideNavigation
        currentSlide={currentSlide}
        totalSlides={slides.length}
        onPrev={() => {
          if (window.__slideNavigationGate?.prev) {
            const handled = window.__slideNavigationGate.prev();
            if (handled) return;
          }
          prevSlide();
        }}
        onNext={() => {
          if (window.__slideNavigationGate?.trigger) {
            const handled = window.__slideNavigationGate.trigger();
            if (handled) return;
          }
          nextSlide();
        }}
        onGoTo={goToSlide}
        titles={slides.map(s => s.title)}
        soundMuted={soundMuted}
        toggleSound={toggleSound}
      />

      {/* Scaled Slide Canvas with AnimatePresence */}
      <ScaledSlide>
        <div className="relative w-[1920px] h-[1080px] overflow-hidden">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full h-full absolute inset-0"
            >
              <CurrentSlideComponent />
            </motion.div>
          </AnimatePresence>
        </div>
      </ScaledSlide>
    </div>
  );
}

export default App;
