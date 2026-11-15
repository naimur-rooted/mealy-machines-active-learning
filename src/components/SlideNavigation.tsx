import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  Volume2, 
  VolumeX 
} from 'lucide-react';
import { presentationSound } from '@/lib/presentationSound';

export interface SlideMetadata {
  title: string;
  subSteps?: string[];
}

export const SLIDES_METADATA: SlideMetadata[] = [
  {
    title: "Hero Cover & Overview",
  },
  {
    title: "Subway Dilemma: Moore vs. Mealy",
    subSteps: ["The Subway Dilemma", "Instant Gate Activation"],
  },
  {
    title: "The Black-Box Crisis",
    subSteps: ["Systems We Cannot Inspect", "Learning Objective", "Grand Comparison"],
  },
  {
    title: "Formal 6-Tuple Definition",
    subSteps: ["Mathematical Specification", "Vending Machine Anatomy", "Grand 2-Column Synthesis"],
  },
  {
    title: "Active Automata Learning",
    subSteps: ["Active Ping-Pong Loop", "Two Core Query Engines"],
  },
  {
    title: "Inside the Observation Table",
  },
  {
    title: "Case 1: Protocol State Fuzzing",
  },
  {
    title: "Case 2: Biometric e-Passport",
  },
  {
    title: "Frontier: The L# Algorithm",
  },
  {
    title: "Frontier: Mealy with Timers",
  },
  {
    title: "Synthesis & Core Takeaways",
  },
  {
    title: "Academic References",
  },
];

interface SlideNavigationProps {
  currentSlide: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (index: number) => void;
  titles: string[];
  soundMuted: boolean;
  toggleSound: () => void;
}

export const SlideNavigation: React.FC<SlideNavigationProps> = ({
  currentSlide,
  totalSlides,
  onPrev,
  onNext,
  onGoTo,
  soundMuted,
  toggleSound
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [gateStep, setGateStep] = useState<number | null>(null);
  const [gateSubSteps, setGateSubSteps] = useState<string[] | null>(null);
  const [isGateLocked, setIsGateLocked] = useState(false);
  const [visitedSlides, setVisitedSlides] = useState<Set<number>>(() => new Set([currentSlide]));

  useEffect(() => {
    setVisitedSlides((prev) => {
      if (prev.has(currentSlide)) return prev;
      const next = new Set(prev);
      next.add(currentSlide);
      return next;
    });
  }, [currentSlide]);

  // Poll for interactive gate state & subSteps
  useEffect(() => {
    setIsGateLocked(false);

    const updateGate = () => {
      const gate = window.__slideNavigationGate;
      setGateStep(typeof gate?.step === "number" ? gate.step : null);
      setGateSubSteps(Array.isArray(gate?.subSteps) && gate.subSteps.length > 0 ? gate.subSteps : null);
      setIsGateLocked(Boolean(gate?.locked));
    };

    updateGate();
    const timer = setInterval(updateGate, 100);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const toggleFullscreen = () => {
    presentationSound.play("click");
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  const handleNext = () => {
    if (isGateLocked || window.__slideNavigationGate?.locked) return;
    presentationSound.play("click");
    onNext();
  };

  const handlePrev = () => {
    if (isGateLocked || window.__slideNavigationGate?.locked) return;
    presentationSound.play("click");
    onPrev();
  };

  return (
    <>
      {/* Top Bar Minimal HUD */}
      <div className="fixed top-6 right-8 z-50 flex items-center gap-3">
        {/* Slide Counter */}
        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#14151f]/80 border border-white/10 backdrop-blur-md text-xs font-medium text-white/80 font-mono shadow-sm">
          <span className="text-white font-semibold">
            {String(currentSlide + 1).padStart(2, '0')}
          </span>
          <span className="text-white/30">/</span>
          <span className="text-white/50">{String(totalSlides).padStart(2, '0')}</span>
        </div>

        {/* Audio Toggle */}
        <button
          onClick={toggleSound}
          className="p-2 rounded-full bg-[#14151f]/80 border border-white/10 hover:border-white/20 text-white/60 hover:text-white transition-all backdrop-blur-md cursor-pointer"
          title={soundMuted ? "Sound muted" : "Sound enabled"}
        >
          {soundMuted ? (
            <VolumeX className="w-4 h-4 text-white/40" />
          ) : (
            <Volume2 className="w-4 h-4 text-white/80" />
          )}
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullscreen}
          className="p-2 rounded-full bg-[#14151f]/80 border border-white/10 hover:border-white/20 text-white/60 hover:text-white transition-all backdrop-blur-md cursor-pointer"
          title="Toggle Fullscreen (F)"
        >
          {isFullscreen ? (
            <Minimize2 className="w-4 h-4" />
          ) : (
            <Maximize2 className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Floating Bottom Nav Dots & Controls — Lifted down to bottom-2.5 to avoid content collision */}
      <div className="fixed bottom-2.5 left-1/2 -translate-x-1/2 z-50 pointer-events-auto flex items-center gap-3 px-4 py-2 rounded-full bg-[#12131c]/90 border border-white/15 backdrop-blur-xl shadow-2xl">
        <button
          onClick={handlePrev}
          disabled={currentSlide === 0 || isGateLocked}
          className="p-1.5 rounded-full hover:bg-white/10 disabled:opacity-20 disabled:hover:bg-transparent text-white/70 hover:text-white transition cursor-pointer disabled:cursor-not-allowed"
          title="Previous (← / Up)"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Dot Strip with Progressive Sub-Navigation Menu */}
        <div className="flex items-center gap-2 px-1">
          {SLIDES_METADATA.map((slideMeta, idx) => {
            const isActive = idx === currentSlide;
            const isPassed = idx < currentSlide;
            const isTravelledOrActive = isActive || isPassed || visitedSlides.has(idx);
            const subSteps = isActive && gateSubSteps && gateSubSteps.length > 0 ? gateSubSteps : slideMeta.subSteps;
            
            // Sub-menus are ONLY exposed once reached or during travelling (matching OfferMangeService spec)
            const hasSubSteps = isTravelledOrActive && Array.isArray(subSteps) && subSteps.length > 0;

            // Only show divider if this slide or previous slide has exposed sub-steps
            const prevMeta = idx > 0 ? SLIDES_METADATA[idx - 1] : null;
            const prevTravelled = idx > 0 && (idx - 1 < currentSlide || visitedSlides.has(idx - 1));
            const prevHadSubSteps = Boolean(prevTravelled && prevMeta?.subSteps && prevMeta.subSteps.length > 0);
            const showDivider = idx > 0 && (prevHadSubSteps || hasSubSteps);

            return (
              <React.Fragment key={idx}>
                {/* Subtle divider between segmented slide groups */}
                {showDivider && <div className="w-[1px] h-3 bg-white/15 mx-0.5" />}

                {/* Slide Item + Sub-Segments */}
                <div className="flex items-center gap-1.5" role="group" aria-label={`Slide ${idx + 1}: ${slideMeta.title}`}>
                  {/* Main Slide Dot */}
                  <span className="group relative flex items-center">
                    <button
                      type="button"
                      onClick={() => {
                        if (isGateLocked || window.__slideNavigationGate?.locked) return;
                        presentationSound.play("click");
                        onGoTo(idx);
                      }}
                      aria-label={`Go to slide ${idx + 1}: ${slideMeta.title}`}
                      className={`presentation-dot transition-all duration-300 rounded-full cursor-pointer ${
                        isActive
                          ? "w-6 h-2 bg-[#00f2fe] shadow-[0_0_10px_rgba(0,242,254,0.6)]"
                          : isPassed
                          ? "w-2.5 h-2.5 bg-[#00f2fe]/80 hover:bg-[#00f2fe]"
                          : "w-2 h-2 bg-white/30 hover:bg-white/70"
                      }`}
                    />
                    <span className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/15 bg-[#181926]/95 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-xl transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 z-50">
                      <span className="text-[#00f2fe] font-mono mr-1.5">{String(idx + 1).padStart(2, '0')}</span>
                      <span>{slideMeta.title}</span>
                    </span>
                  </span>

                  {/* Sub-navigation dots: EXPOSED ONLY DURING OR AFTER TRAVELLING */}
                  {hasSubSteps && (
                    <span className="flex items-center gap-1 pl-1 border-l border-white/15" role="group" aria-label={`${slideMeta.title} segments`}>
                      {subSteps.map((label, subIdx) => {
                        const stepNo = subIdx + 1;
                        const isCurrentStep = isActive && gateStep === stepNo;
                        const isStepReached = isPassed || (isActive && gateStep !== null && gateStep >= stepNo);

                        return (
                          <span key={stepNo} className="group relative flex items-center">
                            <button
                              type="button"
                              aria-label={`Slide ${idx + 1} • Segment ${stepNo}: ${label}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (isGateLocked || window.__slideNavigationGate?.locked) return;
                                presentationSound.play("click");
                                if (isActive) {
                                  const gate = window.__slideNavigationGate;
                                  if (gate && typeof gate.goToStep === "function") {
                                    gate.goToStep(stepNo);
                                  }
                                } else {
                                  onGoTo(idx);
                                }
                              }}
                              className={`presentation-subdot rounded-full transition-all duration-300 cursor-pointer ${
                                isCurrentStep
                                  ? "w-3.5 h-2 bg-[#38ef7d] shadow-[0_0_8px_rgba(56,239,125,0.75)]"
                                  : isStepReached
                                  ? "w-2 h-2 bg-[#38ef7d]/70 hover:bg-[#38ef7d]"
                                  : "w-1.5 h-1.5 bg-white/25 hover:bg-white/60"
                              }`}
                            />
                            <span className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/15 bg-[#181926]/95 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-xl transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 z-50">
                              <span className="text-[#38ef7d] font-mono mr-1">{`${idx + 1}.${stepNo}`}</span>
                              <span>{label}</span>
                            </span>
                          </span>
                        );
                      })}
                    </span>
                  )}
                </div>
              </React.Fragment>
            );
          })}
        </div>

        <button
          onClick={handleNext}
          disabled={currentSlide === totalSlides - 1 || isGateLocked}
          className="p-1.5 rounded-full hover:bg-white/10 disabled:opacity-20 disabled:hover:bg-transparent text-white/70 hover:text-white transition cursor-pointer disabled:cursor-not-allowed"
          title="Next (→ / Down / Space)"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </>
  );
};
