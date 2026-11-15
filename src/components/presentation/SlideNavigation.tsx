import "@/types/navigation";
import React, { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Share2, Maximize, Minimize, Check, Volume2, VolumeX, Video, VideoOff, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { presentationSound } from "@/lib/presentationSound";
import { CameraBubble } from "@/components/presentation/CameraBubble";

import "@/types/navigation";

interface SlideNavigationProps {
  currentIndex: number;
  totalSlides: number;
  onNavigate: (index: number, step?: number) => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export interface SlideMetadata {
  title: string;
  subSteps?: string[];
}

export const SLIDES_METADATA: SlideMetadata[] = [
  {
    title: "In-House Trap",
    subSteps: ["Opening Question", "$25k–$46k Cost", "Team Bubble Field", "Solution Dock"],
  },
  {
    title: "Solution & Burn",
  },
  {
    title: "Value Stack",
    subSteps: [
      "Price Crusher",
      "Team Value",
      "Card 01: Squad",
      "Card 02: Sprint",
      "Card 03: 5 Disciplines",
      "Card 04: Chief Architect",
    ],
  },
  {
    title: "Early Bird Offer",
    subSteps: ["$4,997 Price Ball", "$3,997 Early Bird"],
  },
  {
    title: "Process & Rollover",
    subSteps: ["Q&A Reveal", "01 Rollover Card", "02 Blocker Card", "Full Overview"],
  },
  {
    title: "Contact",
  },
];

export const SlideNavigation: React.FC<SlideNavigationProps> = ({
  currentIndex,
  totalSlides,
  onNavigate,
  onNext,
  onPrev,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [gateTooltip, setGateTooltip] = useState<string | null>(null);
  const [gateStep, setGateStep] = useState<number | null>(null);
  const [gateSubSteps, setGateSubSteps] = useState<string[] | null>(null);
  const [isGateLocked, setIsGateLocked] = useState(false);
  const [soundMuted, setSoundMuted] = useState(() => presentationSound.isMuted());
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<null | "denied" | "notfound" | "other">(null);
  const [visitedSlides, setVisitedSlides] = useState<Set<number>>(() => new Set([currentIndex]));

  useEffect(() => {
    setVisitedSlides((prev) => {
      if (prev.has(currentIndex)) return prev;
      const next = new Set(prev);
      next.add(currentIndex);
      return next;
    });
  }, [currentIndex]);

  useEffect(() => presentationSound.subscribe(setSoundMuted), []);

  // Stop the webcam if the navigation unmounts while it is live
  useEffect(() => {
    return () => {
      setCameraStream((s) => {
        if (s) s.getTracks().forEach((tr) => tr.stop());
        return null;
      });
    };
  }, []);

  // Poll for interactive gate tooltip state & animation locked state
  useEffect(() => {
    // Reset gate lock immediately upon navigating to a new slide so next button is never frozen from previous slide
    setIsGateLocked(false);

    const updateGate = () => {
      const gate = window.__slideNavigationGate;
      if (gate && gate.tooltip) {
        setGateTooltip(gate.tooltip);
      } else {
        setGateTooltip(null);
      }
      setGateStep(typeof gate?.step === "number" ? gate.step : null);
      setGateSubSteps(Array.isArray(gate?.subSteps) && gate.subSteps.length > 0 ? gate.subSteps : null);
      setIsGateLocked(Boolean(gate?.locked));
    };

    updateGate();
    const timer = setInterval(updateGate, 100);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < totalSlides - 1;

  const goPrev = useCallback(() => {
    const gate = window.__slideNavigationGate;
    if (gate?.locked || isGateLocked) return; // LOCKED during animation!

    if (gate && typeof gate.prev === "function") {
      const isHandled = gate.prev();
      if (isHandled) {
        return;
      }
    }

    if (onPrev) {
      onPrev();
      return;
    }
    if (canGoPrev) {
      onNavigate(currentIndex - 1);
    }
  }, [canGoPrev, currentIndex, onNavigate, onPrev, isGateLocked]);

  const goNext = useCallback(() => {
    const gate = window.__slideNavigationGate;
    if (gate?.locked || isGateLocked) return; // LOCKED during animation!

    // Check interactive slide animation gate first (e.g. Slide 1 Prezi storytelling beats)
    if (gate && typeof gate.trigger === "function") {
      const isHandled = gate.trigger();
      if (isHandled) {
        return;
      }
    }

    if (onNext) {
      onNext();
      return;
    }

    if (canGoNext) {
      onNavigate(currentIndex + 1);
    }
  }, [canGoNext, currentIndex, onNavigate, onNext, isGateLocked]);

  // Fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    presentationSound.play("click");
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
      }
    }
  }, []);


  // Touch swipe support — Deliberate horizontal swipe only, never triggers on taps or slow drags
  useEffect(() => {
    let startX = 0;
    let startY = 0;
    let startTime = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      startTime = Date.now();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const deltaX = e.changedTouches[0].clientX - startX;
      const deltaY = e.changedTouches[0].clientY - startY;
      const duration = Date.now() - startTime;

      // Deliberate horizontal swipe: >80px horizontal travel, strictly horizontal ratio, within 500ms
      if (Math.abs(deltaX) > 80 && Math.abs(deltaX) > Math.abs(deltaY) * 2 && duration < 500) {
        if (deltaX < 0) {
          goNext();
        } else {
          goPrev();
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [goNext, goPrev]);

  // Share handler
  const handleShare = () => {
    presentationSound.play("click");
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const toggleSound = () => {
    const nextMuted = !soundMuted;
    presentationSound.setMuted(nextMuted);
    if (!nextMuted) presentationSound.play("reveal");
  };

  // FB-05: "Start camera" presenter webcam overlay (mirrors the reference deck).
  // Not a recorder: opens the device webcam as a draggable bubble over the slides.
  const toggleCamera = useCallback(async () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((tr) => tr.stop());
      setCameraStream(null);
      return;
    }
    setCameraError(null);
    try {
      if (!navigator.mediaDevices?.getUserMedia) throw new Error("unsupported");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false,
      });
      stream.getVideoTracks()[0]?.addEventListener("ended", () => setCameraStream(null));
      setCameraStream(stream);
    } catch (err) {
      // Batch 101: name the failure instead of one generic notice.
      // NotAllowedError = permission denied; NotFoundError /
      // OverconstrainedError = no matching camera; anything else
      // (unsupported API, blocked frame) = other.
      const name = (err as { name?: string } | null)?.name;
      setCameraError(
        name === "NotAllowedError"
          ? "denied"
          : name === "NotFoundError" || name === "OverconstrainedError"
            ? "notfound"
            : "other",
      );
    }
  }, [cameraStream]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      // Comparison overlay owns the keyboard while open
      if (window.__comparisonOpen) return;

      const gate = window.__slideNavigationGate;
      if (gate?.locked || isGateLocked) {
        // Locked during physics animation: lock next, space, enter, arrow keys!
        if (["ArrowRight", "ArrowDown", " ", "Enter", "ArrowLeft", "ArrowUp"].includes(e.key)) {
          e.preventDefault();
          return;
        }
      }

      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        toggleFullscreen();
      } else if ((e.key === "c" || e.key === "C") && !e.ctrlKey && !e.metaKey && !e.altKey) {
        // Batch 101 (owner: camera shortcuts): C toggles the camera,
        // mirroring F for fullscreen. Modifier-guarded so Ctrl+C
        // (copy) is never hijacked.
        e.preventDefault();
        toggleCamera();
      } else if (e.key === "Escape") {
        setIsFullscreen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev, toggleFullscreen, toggleCamera]);

  // Mouse Back (button 3) and Forward (button 4) hardware button navigation
  useEffect(() => {
    const handleMouseAux = (e: MouseEvent) => {
      // If the comparison overlay is open, let its own listener handle button 3 to close it
      if (window.__comparisonOpen) return;

      const gate = window.__slideNavigationGate;
      if (gate?.locked || isGateLocked) {
        if (e.button === 2 || e.button === 3 || e.button === 4) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
      }

      if (e.button === 3) {
        // Standard mouse Back button
        e.preventDefault();
        e.stopPropagation();
        goPrev();
      } else if (e.button === 4) {
        // Standard mouse Forward button
        e.preventDefault();
        e.stopPropagation();
        goNext();
      }
    };

    // Listen on pointerup / mouseup with capture to reliably intercept hardware button clicks
    window.addEventListener("mouseup", handleMouseAux, { capture: true });
    window.addEventListener("pointerup", handleMouseAux, { capture: true });
    return () => {
      window.removeEventListener("mouseup", handleMouseAux, { capture: true });
      window.removeEventListener("pointerup", handleMouseAux, { capture: true });
    };
  }, [goNext, goPrev]);

  // Browser History Back/Forward (popstate) navigation support
  useEffect(() => {
    const handlePopState = () => {
      if (window.__comparisonOpen) return;

      try {
        const params = new URLSearchParams(window.location.search);
        const slideParam = params.get("slide");
        if (slideParam) {
          const parsed = parseInt(slideParam, 10);
          if (!isNaN(parsed) && parsed >= 1 && parsed <= totalSlides) {
            const targetIndex = parsed - 1;
            if (targetIndex !== currentIndex) {
              onNavigate(targetIndex);
            }
          }
        }
      } catch {
        // Ignore iframe sandbox restrictions
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [currentIndex, totalSlides, onNavigate]);

  const stopCamera = useCallback(() => {
    setCameraStream((s) => {
      if (s) s.getTracks().forEach((tr) => tr.stop());
      return null;
    });
  }, []);

  return (
    <>
      {/* Top-Right Control Bar */}
      <div className="presentation-controls fixed top-6 right-6 z-[250] pointer-events-auto flex items-center gap-1 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 shadow-2xl text-white">
        {/* Previous */}
        <button
          type="button"
          onClick={goPrev}
          disabled={!canGoPrev || isGateLocked}
          aria-label="Previous slide"
          className={`presentation-control p-1.5 rounded-full ${
            !canGoPrev || isGateLocked
              ? "opacity-30 cursor-not-allowed text-white/50"
              : "text-white/90 hover:text-pres-accent cursor-pointer"
          }`}
          title={isGateLocked ? "Animation in progress..." : "Previous (ArrowLeft)"}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Counter */}
        <span className="px-2 text-xs font-medium tracking-wider text-white/70 font-mono select-none">
          {currentIndex + 1} / {totalSlides}
        </span>

        {/* Next */}
        <button
          type="button"
          onClick={goNext}
          disabled={!canGoNext || isGateLocked}
          aria-label="Next slide"
          className={`presentation-control p-1.5 rounded-full ${
            !canGoNext || isGateLocked
              ? "opacity-30 cursor-not-allowed text-white/50"
              : "text-white/90 hover:text-pres-accent cursor-pointer"
          }`}
          title={isGateLocked ? "Animation in progress..." : "Next (Space / ArrowRight)"}
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Divider */}
        <div className="w-[1px] h-4 bg-white/20 mx-1" />

        <button
          type="button"
          onClick={toggleSound}
          aria-label={soundMuted ? "Enable presentation sound" : "Mute presentation sound"}
          className="presentation-control p-1.5 rounded-full text-white/90 hover:text-pres-accent cursor-pointer"
          title={soundMuted ? "Enable sound" : "Mute sound"}
        >
          {soundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Camera (FB-05) */}
        <button
          type="button"
          onClick={toggleCamera}
          aria-label={cameraStream ? "Stop camera" : "Start camera"}
          className={`presentation-control p-1.5 rounded-full cursor-pointer ${
            cameraStream ? "text-red-400 hover:text-red-300" : "text-white/90 hover:text-pres-accent"
          }`}
          title={cameraStream ? "Stop camera (C)" : "Start camera (C)"}
        >
          {cameraStream ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
        </button>

        <div className="w-[1px] h-4 bg-white/20 mx-1" />

        {/* Share */}
        <button
          type="button"
          onClick={handleShare}
          aria-label="Share slide"
          className="presentation-control p-1.5 rounded-full text-white/90 hover:text-pres-accent cursor-pointer"
          title="Copy link"
        >
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4" />}
        </button>

        {/* Divider */}
        <div className="w-[1px] h-4 bg-white/20 mx-1" />

        {/* Fullscreen */}
        <button
          type="button"
          onClick={toggleFullscreen}
          aria-label="Toggle fullscreen"
          className="presentation-control p-1.5 rounded-full text-white/90 hover:text-pres-accent cursor-pointer"
          title="Fullscreen (F)"
        >
          {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
        </button>
      </div>

      {/* Interactive Gate Tooltip Bubble - Top Right */}
      {gateTooltip && (
        <div
          key={gateTooltip}
          className="gate-hint fixed top-[78px] right-7 z-[250] pointer-events-none"
        >
          <span className="text-[13px] font-medium tracking-wide text-white/55">
            {gateTooltip}
          </span>
        </div>
      )}

      {/* Camera bubble overlay */}
      {cameraStream && <CameraBubble stream={cameraStream} onClose={stopCamera} />}

      {/* Camera unavailable notice (mirrors the reference deck) */}
      {cameraError !== null && (
        <div className="fixed bottom-8 left-1/2 z-[300] -translate-x-1/2 pointer-events-auto">
          <div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-pres-surface/95 px-6 py-4 shadow-2xl backdrop-blur-md">
            <ShieldAlert className="h-8 w-8 shrink-0 text-pres-accent" />
            <div>
              <div className="font-heading text-[18px] font-bold text-white">
                {cameraError === "denied" ? "Camera permission denied" : "Camera unavailable"}
              </div>
              <div className="text-[15px] text-pres-text-muted">
                {cameraError === "denied"
                  ? "Camera permission was denied. Allow camera access in your browser, then try again."
                  : cameraError === "notfound"
                    ? "No camera found on this device."
                    : "The camera could not be started. If this is a preview frame, open the deployed link directly and try again."}
              </div>
            </div>
            <div className="flex items-center gap-2 pl-2">
              <button
                type="button"
                onClick={toggleCamera}
                className="rounded-full bg-pres-accent px-4 py-1.5 text-[15px] font-bold text-pres-bg pres-dark-safe-accent cursor-pointer"
              >
                Try again
              </button>
              <button
                type="button"
                onClick={() => setCameraError(null)}
                className="rounded-full border border-white/20 px-4 py-1.5 text-[15px] font-semibold text-white/80 hover:text-white cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Dot Navigation - Progressive exposure during travelling; never hides completed sub-menus */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[250] pointer-events-auto flex items-center gap-2 bg-black/75 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 shadow-2xl">
        {SLIDES_METADATA.map((slideMeta, idx) => {
          const isActive = idx === currentIndex;
          const isPassed = idx < currentIndex;
          const isTravelledOrActive = isActive || isPassed || visitedSlides.has(idx);
          const subSteps = isActive && gateSubSteps && gateSubSteps.length > 0 ? gateSubSteps : slideMeta.subSteps;
          // Sub-menus are ONLY exposed once reached or during travelling. Future unvisited slides stay clean single dots!
          const hasSubSteps = isTravelledOrActive && Array.isArray(subSteps) && subSteps.length > 0;

          // Only show divider if this slide or previous slide has exposed sub-steps
          const prevMeta = idx > 0 ? SLIDES_METADATA[idx - 1] : null;
          const prevTravelled = idx > 0 && (idx - 1 < currentIndex || visitedSlides.has(idx - 1));
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
                      onNavigate(idx);
                    }}
                    aria-label={`Go to slide ${idx + 1}: ${slideMeta.title}`}
                    className={`presentation-dot transition-all duration-300 rounded-full cursor-pointer ${
                      isActive
                        ? "w-6 h-2 bg-pres-accent shadow-[0_0_10px_rgba(255,173,1,0.6)]"
                        : isPassed
                        ? "w-2.5 h-2.5 bg-pres-accent/80 hover:bg-pres-accent"
                        : "w-2 h-2 bg-white/30 hover:bg-white/70"
                    }`}
                  />
                  <span className="pointer-events-none absolute bottom-full left-1/2 mb-2.5 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/15 bg-black/90 px-3 py-1.5 text-[12px] font-medium text-white opacity-0 shadow-xl transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 z-50">
                    {`${idx + 1}. ${slideMeta.title}`}
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
                              if (isActive) {
                                const gate = window.__slideNavigationGate;
                                if (gate && typeof gate.goToStep === "function") {
                                  gate.goToStep(stepNo);
                                }
                              } else {
                                onNavigate(idx, stepNo);
                              }
                            }}
                            className={`presentation-subdot rounded-full transition-all duration-300 cursor-pointer ${
                              isCurrentStep
                                ? "w-3.5 h-2 bg-pres-accent shadow-[0_0_8px_rgba(255,173,1,0.75)]"
                                : isStepReached
                                ? "w-2 h-2 bg-pres-accent/70 hover:bg-pres-accent"
                                : "w-1.5 h-1.5 bg-white/25 hover:bg-white/60"
                            }`}
                          />
                          <span className="pointer-events-none absolute bottom-full left-1/2 mb-2.5 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/15 bg-black/90 px-3 py-1.5 text-[12px] font-medium text-white opacity-0 shadow-xl transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 z-50">
                            {`${idx + 1}.${stepNo} ${label}`}
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
    </>
  );
};
