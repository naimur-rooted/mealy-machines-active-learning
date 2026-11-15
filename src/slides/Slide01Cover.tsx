import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Clock, Sparkles, CheckCircle2, XCircle, HelpCircle } from 'lucide-react';
import { PainBeats, PainBeat } from '@/components/presentation/PainBeats';
import { presentationEase } from '@/lib/presentationMotion';
import { presentationSound } from '@/lib/presentationSound';

// The Exact Question Hook Beats:
const THINKING_QUESTION_BEATS: PainBeat[] = [
  {
    text: "Thinking",
    size: "md",
    sizePx: 96,
    smallAfter: "how machines",
    smallSizePx: 44,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 800,
    wordAnim: true,
    indentClass: "ml-[160px]",
    className: "whitespace-nowrap",
  },
  {
    text: "talk back",
    size: "xl",
    sizePx: 94,
    hook: true,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 800,
    wordAnim: true,
    wordColors: {
      talk: "#FFFFFF",
      back: "#FF0000",
    },
    className: "whitespace-nowrap mt-[10px]",
  },
  {
    text: "instantly?",
    size: "md",
    sizePx: 68,
    soft: true,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 800,
    wordAnim: true,
    selectWords: ["instantly"],
    fillWords: ["instantly"],
    indentClass: "ml-[360px]",
    className: "whitespace-nowrap mt-[10px]",
  },
];

export type PhysicsPhase = "idle" | "morphing" | "dropping" | "rolling" | "jumping" | "docked";

export const Slide01Cover: React.FC = () => {
  // preziStage:
  // 0: Initial centered question hook ("Thinking how machines talk back instantly?")
  // 1: Ball morphs, drops, rolls, jumps, and docks into center headline:
  //    "How Machines Learned to Talk Back [Instantly]"
  // 2: The headline zooms out, blurs & pushes UP (like "We have solutions for you"),
  //    and the historical question "Why Should a Machine Wait?" appears BOLDLY in center, nothing else!
  // 3: The screen clears, and the zero-delay circuit architecture comparison appears!
  const [preziStage, setPreziStage] = useState<0 | 1 | 2 | 3>(0);
  const [physicsPhase, setPhysicsPhase] = useState<PhysicsPhase>("idle");
  const [mode, setMode] = useState<'mealy' | 'moore'>('mealy');
  const [pulseCount, setPulseCount] = useState(0);

  const preziStageRef = useRef<number>(0);
  preziStageRef.current = preziStage;
  const physicsPhaseRef = useRef<PhysicsPhase>("idle");
  physicsPhaseRef.current = physicsPhase;

  const timersRef = useRef<number[]>([]);
  const addTimer = (fn: () => void, delayMs: number) => {
    const id = window.setTimeout(fn, delayMs);
    timersRef.current.push(id);
    return id;
  };

  const clearAllTimers = () => {
    timersRef.current.forEach(window.clearTimeout);
    timersRef.current = [];
    presentationSound.stopBallRoll();
  };

  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, []);

  // EXACT CHOREOGRAPHY ADVANCE
  const advanceStage = () => {
    const currentStage = preziStageRef.current;
    const currentPhase = physicsPhaseRef.current;

    if (currentStage === 0 && currentPhase === "idle") {
      setPreziStage(1);
      clearAllTimers();

      // Step 1: VISIBLE MORPHING — right before the user's eyes, "instantly?" in the question
      // contracts its rectangular borders into a round glowing amber circle ball (0 to 600ms)
      physicsPhaseRef.current = "morphing";
      setPhysicsPhase("morphing");
      presentationSound.play("whooshFast", 1);

      // Step 2: Ball drops under heavy gravity towards the floor line at y: 250 (at 600ms)
      addTimer(() => {
        physicsPhaseRef.current = "dropping";
        setPhysicsPhase("dropping");
      }, 600);

      // Floor Impact 1: hits floor at 600 + 420 = 1020ms -> BIG BOUNCE!
      addTimer(() => {
        presentationSound.play("ballBounce", 1.0);
      }, 1020);

      // Floor Impact 2: lands from rebound hop at 600 + 1050 = 1650ms
      addTimer(() => {
        presentationSound.play("ballBounce", 0.65);
      }, 1650);

      // Floor Impact 3: secondary settling hop at 600 + 1400 = 2000ms
      addTimer(() => {
        presentationSound.play("ballBounce", 0.35);
      }, 2000);

      // Step 3: Ball rolls smoothly across the floor line towards the jump slot (2050ms to 3650ms, duration 1.6s)
      addTimer(() => {
        physicsPhaseRef.current = "rolling";
        setPhysicsPhase("rolling");
        presentationSound.play("ballRoll", 1.6);
      }, 2050);

      // Step 4: Ball reaches launch runway and JUMPS up towards headline! (at 3650ms, duration 0.7s)
      addTimer(() => {
        physicsPhaseRef.current = "jumping";
        setPhysicsPhase("jumping");
        presentationSound.play("jumpWhoosh");
      }, 3650);

      // Step 5: Ball impacts headline slot and POPS into place ("pup") at 4350ms!
      addTimer(() => {
        physicsPhaseRef.current = "docked";
        setPhysicsPhase("docked");
        presentationSound.play("pillDrop", 0.95);
      }, 4350);

    } else if (currentStage === 1 && currentPhase === "docked") {
      // User clicked after ball docked into "How Machines Learned to Talk Back Instantly"
      // Pushes the headline UP with zoom out & blur, revealing "Why Should a Machine Wait?" boldly in center!
      presentationSound.play("whooshFast", 0.9);
      presentationSound.play("reveal", 0.9);
      setPreziStage(2);

    } else if (currentStage === 2) {
      // User clicked after reading the bold question
      // Clears screen and reveals the zero-delay circuit comparison!
      presentationSound.play("transition");
      setPreziStage(3);
    }
  };

  // Keyboard navigation & slide navigation gate
  useEffect(() => {
    window.__slideNavigationGate = {
      trigger: () => {
        if (preziStageRef.current === 0) {
          advanceStage();
          return true;
        } else if (preziStageRef.current === 1) {
          if (physicsPhaseRef.current === "docked") {
            advanceStage();
            return true;
          }
          // In mid-flight, lock navigation so ball finishes its authentic arc
          return true;
        } else if (preziStageRef.current === 2) {
          advanceStage();
          return true;
        }
        return false;
      },
      prev: () => {
        if (preziStageRef.current > 0) {
          clearAllTimers();
          setPreziStage((p) => (p > 0 ? ((p - 1) as 0 | 1 | 2 | 3) : 0));
          if (preziStageRef.current <= 1) {
            setPhysicsPhase("idle");
          }
          return true;
        }
        return false;
      }
    };

    return () => {
      window.__slideNavigationGate = undefined;
    };
  }, []);

  return (
    <div 
      onClick={advanceStage}
      className={`slide-dark-bg w-[1920px] h-[1080px] p-[60px] flex flex-col justify-between relative select-none overflow-hidden ${
        preziStage < 3 ? 'cursor-pointer' : ''
      }`}
    >
      {/* Cinematic Blueprint Circuit Background Image */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
        style={{
          opacity: preziStage < 3 ? 0.32 : 0.12,
          transition: 'opacity 0.8s ease-in-out',
        }}
      >
        <img 
          src="/cyber_circuit_grid.jpg" 
          alt="Circuit Architecture Blueprint"
          className="w-full h-full object-cover filter brightness-[0.95] contrast-[1.35] scale-105"
        />
        {/* Soft atmospheric gradient allowing glowing traces to be visible */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080d] via-[#08080d]/65 to-[#08080d]/75" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#08080d_85%)]" />
      </div>

      {/* Background atmospheric ambient lighting */}
      <div className="absolute top-1/4 right-1/4 w-[850px] h-[550px] bg-[#f59e0b]/8 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[750px] h-[450px] bg-[#ef4444]/6 rounded-full blur-[180px] pointer-events-none" />

      {/* Subtle grid background matching OfferMangeService */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      {/* Top Floating Pill Banner */}
      <div className="flex items-center justify-between z-40 w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: preziStage === 3 ? 1 : 0, y: preziStage === 3 ? 0 : -20 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-[#f59e0b]/40 backdrop-blur-xl shadow-[0_0_20px_rgba(245,158,11,0.15)]">
            <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse" />
            <span className="text-[13px] font-mono font-bold tracking-[0.16em] uppercase text-[#f59e0b]">
              THE FOUNDATIONAL DISCOVERY • 1955 TO 2026
            </span>
          </div>
          <span className="text-white/20 text-sm">•</span>
          <span className="text-[#a1a1aa] text-[14px] font-medium tracking-wide">
            How George Mealy Solved The 1-Cycle Clock Delay
          </span>
        </motion.div>

        {/* Replay Hook Button */}
        {preziStage > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              clearAllTimers();
              setPreziStage(0);
              setPhysicsPhase("idle");
              presentationSound.play("click", 0.6);
            }}
            className="text-xs font-mono text-white/50 hover:text-white px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition cursor-pointer"
          >
            ↺ Replay Hook
          </button>
        )}
      </div>

      {/* ════════════════════════════════════════════════════════════════════════ */}
      {/* MAIN STORYTELLING CONTAINER                                              */}
      {/* ════════════════════════════════════════════════════════════════════════ */}
      <div className="my-auto max-w-[1800px] z-10 w-full flex flex-col relative min-h-[780px] justify-center mx-auto">

        {/* 1. STAGE 0: THE INITIAL QUESTION HOOK IN CENTER SCREEN */}
        {preziStage === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center select-none z-30">
            <div className="flex flex-col items-start -translate-x-[40px]">
              <PainBeats
                beats={THINKING_QUESTION_BEATS}
                highlight="yellow"
                highlightStyle="marker"
                highlightIndex={-1}
              />
            </div>
          </div>
        )}

        {/* 1B. MORPHING DISSOLVE: When user clicks, the top text lines dissolve away, leaving "instantly?" */}
        {preziStage === 1 && physicsPhase === "morphing" && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center select-none z-20 pointer-events-none"
          >
            <div className="flex flex-col items-start -translate-x-[40px]">
              <div className="text-[96px] font-black text-white font-['Plus_Jakarta_Sans'] ml-[160px] opacity-40">
                Thinking <span className="text-[44px]">how machines</span>
              </div>
              <div className="text-[94px] font-black text-white font-['Plus_Jakarta_Sans'] opacity-40">
                talk <span className="text-[#FF0000]">back</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* 2. THE VISIBLE MORPHING BALL: STARTS EXACTLY ON THE "INSTANTLY?" WORD,
               TRANSFORMS INTO THE CIRCULAR BALL, DROPS, ROLLS, AND LEAPS */}
        {preziStage === 1 && physicsPhase !== "idle" && physicsPhase !== "docked" && (
          <motion.div
            initial={{
              x: 180,
              y: 75,
              width: 250,
              height: 80,
              borderRadius: "16px",
              scale: 1,
              rotate: 0,
              opacity: 1,
            }}
            animate={
              physicsPhase === "morphing"
                ? {
                    // Visible morph: Rectangle rounds up into a perfect circle orb with pulse pop!
                    x: 180,
                    y: 75,
                    width: 170,
                    height: 170,
                    borderRadius: "50%",
                    scale: [1, 1.15, 0.95, 1.0],
                    rotate: [0, 15, -10, 0],
                    opacity: 1,
                  }
                : physicsPhase === "dropping"
                ? {
                    // Drops down with 3 damped bounces onto the floor line (y: 250)
                    x: [180, 100, 20, -50, -120, -180],
                    y: [75, 250, 140, 250, 205, 250],
                    width: 170,
                    height: 170,
                    borderRadius: "50%",
                    scaleX: [1, 1.25, 0.92, 1.12, 0.98, 1.0],
                    scaleY: [1, 0.75, 1.08, 0.90, 1.02, 1.0],
                    rotate: [0, 60, 120, 180, 240, 270],
                    opacity: 1,
                  }
                : physicsPhase === "rolling"
                ? {
                    // Rolls across the floor line to the left runway towards jump position
                    x: [-180, -420, -170],
                    y: 250,
                    width: 170,
                    height: 170,
                    borderRadius: "50%",
                    rotate: [270, 720, 990],
                    scale: 1,
                    opacity: 1,
                  }
                : physicsPhase === "jumping"
                ? {
                    // Physical jump arc directly UP into center headline slot at (285, 0)
                    x: [-170, 60, 285],
                    y: [250, -120, 0],
                    width: 170,
                    height: 170,
                    borderRadius: "50%",
                    scaleX: [1, 0.92, 1.08, 1.0],
                    scaleY: [1, 1.15, 0.92, 1.0],
                    rotate: [990, 1260, 1440],
                    scale: 1,
                    opacity: 1,
                  }
                : {}
            }
            transition={
              physicsPhase === "morphing"
                ? { duration: 0.55, ease: "easeInOut" }
                : physicsPhase === "dropping"
                ? { duration: 1.4, ease: "easeOut" }
                : physicsPhase === "rolling"
                ? { duration: 1.6, ease: "linear" }
                : physicsPhase === "jumping"
                ? { duration: 0.7, times: [0, 0.55, 1.0], ease: ["easeOut", "easeIn"] }
                : {}
            }
            className="absolute z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center select-none border-[3px] border-[#f59e0b] bg-[#1a1205] pointer-events-none"
            style={{
              boxShadow: "0 0 0 2px #f59e0b, 1.5px 1.5px 0 2px rgba(255, 255, 255, 0.85), 3px 3px 8px 1px rgba(0, 0, 0, 0.85), 0 16px 40px rgba(245,158,11,0.45)",
            }}
          >
            <div className="flex flex-col items-center justify-center select-none">
              <Zap className="w-8 h-8 text-[#f59e0b] fill-[#f59e0b] drop-shadow-[0_0_12px_rgba(245,158,11,0.8)]" />
              <span className="font-['Plus_Jakarta_Sans'] font-black text-[22px] text-white tracking-tight leading-none mt-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
                Instantly
              </span>
              <span className="text-[10px] font-mono text-[#f59e0b] font-bold tracking-widest uppercase mt-0.5">
                0 ns
              </span>
            </div>
          </motion.div>
        )}

        {/* 3. HEADLINE: "How Machines Learned to Talk Back [Instantly]"
               First, appears in center while the ball rolls.
               The ball leaps and docks here to complete the full sentence!
               In Stage 2, it ZOOMS OUT, BLURS & PUSHES UP to the top (like "We have solutions for you" in reference)! */}
        {(preziStage === 1 || preziStage === 2) && (physicsPhase === "rolling" || physicsPhase === "jumping" || physicsPhase === "docked" || preziStage === 2) && (
          <motion.div
            initial={{ opacity: 0, y: 0, scale: 1 }}
            animate={
              preziStage === 1
                ? {
                    // Centered firmly on screen without exceeding bounds
                    y: 0,
                    scale: 1,
                    opacity: 1,
                    filter: "blur(0px)",
                  }
                : {
                    // Stage 2: Zooms out, blurs and pushes up into upper section! (Exact OfferMangeService values)
                    y: -240,
                    scale: 0.58,
                    opacity: 0.55,
                    filter: "blur(2px)",
                  }
            }
            transition={{
              duration: 0.75,
              ease: [0.25, 0.1, 0.25, 1.0],
            }}
            className="absolute inset-x-0 top-[42%] -translate-y-1/2 flex flex-col items-center justify-center text-center select-none z-30"
          >
            <h1 className="font-heading text-[74px] font-black text-white leading-[1.18] tracking-tight max-w-[1600px] mx-auto flex items-center justify-center flex-wrap gap-x-4">
              <span className="inline-block text-white" style={{ textShadow: "0 8px 24px rgba(0,0,0,0.65)" }}>
                How
              </span>
              <span className="inline-block text-white" style={{ textShadow: "0 8px 24px rgba(0,0,0,0.65)" }}>
                Machines
              </span>
              <span className="inline-block text-white" style={{ textShadow: "0 8px 24px rgba(0,0,0,0.65)" }}>
                Learned
              </span>
              <span className="inline-block text-white" style={{ textShadow: "0 8px 24px rgba(0,0,0,0.65)" }}>
                to
              </span>
              <span className="inline-block text-white" style={{ textShadow: "0 8px 24px rgba(0,0,0,0.65)" }}>
                Talk
              </span>
              <span className="inline-block text-[#ef4444]" style={{ textShadow: "0 8px 24px rgba(0,0,0,0.65)" }}>
                Back
              </span>

              {/* THE TARGET SLOT: Empty spacing gap while rolling/jumping, then pops into locked badge on impact */}
              {physicsPhase === "docked" || preziStage === 2 ? (
                <motion.div
                  initial={{ scale: 1.35, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 480, damping: 22 }}
                  className="inline-flex items-center justify-center px-6 py-2.5 rounded-2xl border-2 border-[#f59e0b] bg-[#f59e0b]/15 shadow-[0_0_35px_rgba(245,158,11,0.45)] select-none mx-2 align-middle"
                >
                  <span className="font-['Plus_Jakarta_Sans'] font-black text-[58px] text-[#f59e0b] tracking-tight leading-none">
                    Instantly
                  </span>
                </motion.div>
              ) : (
                <span className="inline-block w-[280px] h-[72px] mx-2 align-middle border-2 border-dashed border-[#f59e0b]/30 rounded-2xl bg-[#f59e0b]/5" />
              )}
            </h1>
          </motion.div>
        )}

        {/* 4. STAGE 2: THE PROVOCATIVE QUESTION APPEARS BOLDLY IN THE CENTER SCREEN!
               Nothing else on screen! Matches Quote 2 ("We have managed service") in reference! */}
        <AnimatePresence>
          {preziStage === 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.92, y: -50, filter: "blur(8px)" }}
              transition={{ duration: 0.65, delay: 0.1, ease: presentationEase }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 select-none z-40 pointer-events-none"
            >
              {/* Bell Labs 1955 Sub-badge */}
              <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/[0.06] border border-white/20 backdrop-blur-md shadow-lg mb-6">
                <HelpCircle className="w-5 h-5 text-[#f59e0b]" />
                <span className="font-mono font-bold text-[15px] tracking-widest uppercase text-white/90">
                  BELL LABS, 1955 • GEORGE MEALY'S PARADOX
                </span>
              </div>

              {/* Bold Headline Question */}
              <h2 className="font-heading text-[80px] font-black tracking-tight text-white leading-[1.12] drop-shadow-[0_15px_40px_rgba(0,0,0,0.9)] max-w-[1450px] mx-auto">
                &ldquo;Why should a machine{" "}
                <span className="relative inline-flex items-center mx-2 px-5 py-1 rounded-2xl bg-red-500/15 border-2 border-red-500/40 text-[#ef4444] shadow-[0_0_35px_rgba(239,68,68,0.3)]">
                  wait
                </span>{" "}
                for the next clock tick?&rdquo;
              </h2>

              <p className="text-[26px] text-white/70 max-w-[1100px] mx-auto mt-6 font-medium leading-relaxed font-sans">
                When it could speak the exact microsecond an input arrives.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 5. STAGE 3: THE PHYSICAL CIRCUIT ANSWER UNFOLDS (AFTER CLEARING THE SCREEN) */}
        <AnimatePresence>
          {preziStage === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.65, ease: presentationEase }}
              className="w-full p-8 rounded-3xl bg-[#0e1017]/95 border border-white/10 backdrop-blur-2xl relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
            >
              {/* Top Control Bar */}
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono font-bold px-3 py-1.5 rounded bg-white/10 text-white/80 uppercase tracking-wider">
                    THE ANSWER • CIRCUIT COMPARISON
                  </span>

                  <div className="flex items-center p-1 rounded-full bg-[#161824] border border-white/10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setMode('moore');
                        presentationSound.play("click", 0.6);
                      }}
                      className={`px-5 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                        mode === 'moore'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                          : 'text-white/50 hover:text-white'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>The Old Way (Moore Machine)</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setMode('mealy');
                        presentationSound.play("click", 0.6);
                      }}
                      className={`px-5 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                        mode === 'mealy'
                          ? 'bg-[#f59e0b] text-black shadow-[0_0_20px_rgba(245,158,11,0.4)]'
                          : 'text-white/50 hover:text-white'
                      }`}
                    >
                      <Zap className="w-3.5 h-3.5 fill-current" />
                      <span>Mealy's Breakthrough (1955)</span>
                    </button>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPulseCount(c => c + 1);
                    presentationSound.play("counterTick", 0.8);
                  }}
                  className="px-5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold flex items-center gap-2 transition cursor-pointer border border-white/15"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#f59e0b]" />
                  <span>Send Stimulus Pulse</span>
                </button>
              </div>

              {/* Interactive Circuit Canvas: Standard Textbook FSM Architecture */}
              <div className="relative w-full h-[460px] bg-[#05060a] rounded-3xl border border-white/10 p-8 flex items-center justify-between shadow-[inset_0_2px_40px_rgba(0,0,0,0.8)]">
                
                {/* 1. INPUT SOURCE (External Stimulus X) */}
                <div className="w-[220px] h-[210px] rounded-3xl bg-[#121424] border-2 border-[#00f2fe]/60 flex flex-col items-center justify-center text-center p-5 z-10 shadow-[0_0_40px_rgba(0,242,254,0.18)]">
                  <div className="text-[12px] font-mono text-[#00f2fe] font-extrabold uppercase tracking-widest mb-1">
                    INPUT (X)
                  </div>
                  <div className="text-[24px] font-black text-white leading-tight mt-1">
                    Card Tap / Coin
                  </div>
                  <div className="text-[14px] font-mono text-white/70 mt-2 font-medium">
                    External Stimulus
                  </div>
                  <div className="mt-3 text-[12px] px-3.5 py-1 rounded-full bg-[#00f2fe]/15 text-[#00f2fe] font-mono font-black border border-[#00f2fe]/30">
                    t = 0.00 ms
                  </div>
                </div>

                {/* SVG Circuit Routing Traces */}
                <svg key={`${mode}-${pulseCount}`} className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="bypassActiveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00f2fe" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                    <filter id="glowEffect">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Wire 1: Input (X) into Next-State Logic δ */}
                  <line x1="250" y1="230" x2="310" y2="230" stroke="#00f2fe" strokeWidth="3" />
                  <polygon points="310,230 300,225 300,235" fill="#00f2fe" />

                  {/* Wire 2: Next State D from δ into State Register (Flip-Flops) */}
                  <line x1="640" y1="230" x2="710" y2="230" stroke="rgba(255,255,255,0.4)" strokeWidth="3" />
                  <polygon points="710,230 700,225 700,235" fill="rgba(255,255,255,0.7)" />

                  {/* Wire 3: Present State Q from Flip-Flops into Output Logic λ */}
                  <line x1="1040" y1="230" x2="1110" y2="230" stroke="#38bdf8" strokeWidth="3" />
                  <polygon points="1110,230 1100,225 1100,235" fill="#38bdf8" />

                  {/* Wire 4: Output Z from Output Logic into Gate Actuator */}
                  <line x1="1440" y1="230" x2="1510" y2="230" stroke={mode === 'mealy' ? "#10b981" : "rgba(255,255,255,0.3)"} strokeWidth="3" />
                  <polygon points="1510,230 1500,225 1500,235" fill={mode === 'mealy' ? "#10b981" : "rgba(255,255,255,0.5)"} />

                  {/* Wire 5: State Register Feedback Loop (Q returns to Next-State Logic δ) */}
                  <path
                    d="M 875 345 L 875 405 L 475 405 L 475 345"
                    fill="none"
                    stroke="rgba(56,189,248,0.5)"
                    strokeWidth="3"
                    strokeDasharray="7 6"
                  />
                  <polygon points="475,345 470,355 480,355" fill="#38bdf8" />
                  <text x="675" y="426" fill="rgba(56,189,248,0.9)" fontSize="13" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    State Feedback Loop: Present State Q(t) fed back into δ
                  </text>

                  {/* Wire 6: THE MEALY BYPASS WIRE (Input X directly feeds Output Logic λ) */}
                  {mode === 'mealy' ? (
                    <>
                      <path
                        d="M 140 125 L 140 46 L 1275 46 L 1275 115"
                        fill="none"
                        stroke="url(#bypassActiveGrad)"
                        strokeWidth="5"
                        strokeDasharray="10 8"
                        filter="url(#glowEffect)"
                        className="animate-pulse"
                      />
                      <circle cx="140" cy="125" r="7" fill="#00f2fe" />
                      <circle cx="1275" cy="115" r="7" fill="#f59e0b" />
                      <polygon points="1275,115 1269,103 1281,103" fill="#f59e0b" />

                      {/* Moving Electron Packet along Mealy Bypass */}
                      <motion.circle
                        r="8"
                        fill="#f59e0b"
                        filter="url(#glowEffect)"
                        initial={{ cx: 140, cy: 125, opacity: 0 }}
                        animate={{
                          cx: [140, 140, 1275, 1275],
                          cy: [125, 46, 46, 115],
                          opacity: [0, 1, 1, 0]
                        }}
                        transition={{
                          duration: 1.1,
                          repeat: Infinity,
                          repeatDelay: 0.6,
                          ease: "easeInOut"
                        }}
                      />
                    </>
                  ) : (
                    <path
                      d="M 140 125 L 140 46 L 1275 46 L 1275 115"
                      fill="none"
                      stroke="rgba(239,68,68,0.25)"
                      strokeWidth="3"
                      strokeDasharray="6 8"
                    />
                  )}
                </svg>

                {/* 2. BLOCK A: Combinational Next-State Logic δ(Q, X) */}
                <div className="w-[330px] h-[230px] rounded-3xl bg-[#121424] border-2 border-white/20 p-5 flex flex-col justify-between z-10 shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-mono font-extrabold text-[#00f2fe] uppercase tracking-wider">
                      COMBINATIONAL
                    </span>
                    <span className="text-[13px] font-mono px-3 py-1 rounded-md bg-white/10 text-white font-bold border border-white/10">
                      δ( State, Input )
                    </span>
                  </div>
                  <div>
                    <div className="text-[23px] font-black text-white leading-tight">Next-State Logic</div>
                    <div className="text-[14px] text-white/80 font-sans mt-2 font-medium leading-snug">
                      Silicon logic gates compute next state bits from <strong className="text-white">Q(t)</strong> and <strong className="text-white">X</strong>.
                    </div>
                  </div>
                  <div className="text-[12px] font-mono text-white/60 border-t border-white/10 pt-2 flex items-center justify-between font-bold">
                    <span>In: X + Q(t)</span>
                    <span className="text-[#00f2fe]">Out: D(t)</span>
                  </div>
                </div>

                {/* 3. BLOCK B: State Register (Clocked Flip-Flops) */}
                <div className="w-[330px] h-[230px] rounded-3xl bg-[#0f111d] border-2 border-white/25 p-5 flex flex-col justify-between z-10 shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-mono font-extrabold text-white/60 uppercase tracking-wider">
                      SYNCHRONOUS
                    </span>
                    <span className="text-[13px] font-mono px-3 py-1 rounded-md bg-[#38bdf8]/15 text-[#38bdf8] font-bold border border-[#38bdf8]/30">
                      Clock Edge (10 ns)
                    </span>
                  </div>
                  <div>
                    <div className="text-[23px] font-black text-white leading-tight">State Register</div>
                    <div className="text-[14px] text-white/80 font-sans mt-2 font-medium leading-snug">
                      Bank of D Flip-Flops storing current system state: <span className="text-[#38bdf8] font-black">q₀ (IDLE)</span>.
                    </div>
                  </div>
                  <div className="text-[12px] font-mono text-white/60 border-t border-white/10 pt-2 flex items-center justify-between font-bold">
                    <span>Synchronous Latch:</span>
                    <span className="text-[#38bdf8]">Q(t+1) = D(t)</span>
                  </div>
                </div>

                {/* Center Top Floating Banner */}
                <div className="absolute top-[12px] left-[50%] -translate-x-1/2 z-20 pointer-events-none">
                  {mode === 'mealy' ? (
                    <div className="px-6 py-2 rounded-full bg-black/95 border-2 border-[#f59e0b] text-[#f59e0b] text-[13px] font-mono font-black flex items-center gap-2.5 shadow-[0_0_30px_rgba(245,158,11,0.4)] animate-bounce">
                      <Zap className="w-4 h-4 fill-current" />
                      <span>THE MEALY BYPASS: INPUT FEEDS OUTPUT LOGIC DIRECTLY (0 ns CLOCK DELAY)</span>
                    </div>
                  ) : (
                    <div className="px-6 py-2 rounded-full bg-red-950/95 border-2 border-red-500/60 text-red-300 text-[13px] font-mono font-black flex items-center gap-2.5 shadow-[0_0_30px_rgba(239,68,68,0.3)]">
                      <XCircle className="w-4 h-4 text-red-400" />
                      <span>MOORE ARCHITECTURE: NO BYPASS WIRE (OUTPUT TRAPPED IN STATE FLIP-FLOPS)</span>
                    </div>
                  )}
                </div>

                {/* 4. BLOCK C: Combinational Output Logic λ */}
                <div className={`w-[330px] h-[230px] rounded-3xl p-5 flex flex-col justify-between transition-all z-10 ${
                  mode === 'mealy'
                    ? 'bg-[#181b29] border-2 border-[#f59e0b] amber-glow-box shadow-[0_0_45px_rgba(245,158,11,0.35)]'
                    : 'bg-[#10111c] border-2 border-white/15'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-mono font-extrabold text-[#f59e0b] uppercase tracking-wider">
                      OUTPUT LOGIC
                    </span>
                    <span className={`text-[13px] font-mono px-3 py-1 rounded-md font-bold border ${
                      mode === 'mealy' 
                        ? 'bg-[#f59e0b]/15 text-[#f59e0b] border-[#f59e0b]/40' 
                        : 'bg-white/10 text-white/80 border-white/10'
                    }`}>
                      {mode === 'mealy' ? 'λ( State, Input )' : 'λ( State Only )'}
                    </span>
                  </div>
                  <div>
                    <div className="text-[23px] font-black text-white leading-tight">Output Logic</div>
                    <div className="text-[14px] text-white/80 font-sans mt-2 font-medium leading-snug">
                      {mode === 'mealy' 
                        ? 'Evaluates State (Q) + Input (X) immediately via silicon gates.'
                        : 'Evaluates State (Q) only; updates exclusively after clock tick.'}
                    </div>
                  </div>
                  <div className="text-[12px] font-mono border-t border-white/10 pt-2 flex items-center justify-between font-bold">
                    <span className="text-white/60">Speed:</span>
                    <span className={mode === 'mealy' ? 'text-[#10b981]' : 'text-red-400'}>
                      {mode === 'mealy' ? '⚡ 0 ns Instant Reaction' : '⏳ 1-Cycle Clock Lag'}
                    </span>
                  </div>
                </div>

                {/* 5. OUTPUT ACTUATOR (Z) */}
                <div className={`w-[220px] h-[210px] rounded-3xl border-2 flex flex-col items-center justify-center text-center p-5 z-10 transition-all ${
                  mode === 'mealy'
                    ? 'bg-[#10b981]/15 border-[#10b981] shadow-[0_0_40px_rgba(16,185,129,0.3)]'
                    : 'bg-red-950/25 border-red-500/40'
                }`}>
                  <div className={`text-[12px] font-mono font-extrabold uppercase tracking-widest mb-1 ${
                    mode === 'mealy' ? 'text-[#10b981]' : 'text-red-400'
                  }`}>
                    OUTPUT (Z)
                  </div>
                  <div className="text-[24px] font-black text-white leading-tight mt-1">
                    Gate Unlocks
                  </div>
                  <div className="text-[14px] font-mono mt-2 font-black">
                    {mode === 'mealy' ? (
                      <span className="text-[#10b981] drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">⚡ Zero Latency</span>
                    ) : (
                      <span className="text-red-400">⏳ 1-Cycle Lag</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Dynamic Explanation Footer */}
              <div className="mt-5 p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between text-[14px] text-[#a1a1aa] font-mono">
                {mode === 'mealy' ? (
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#10b981] shrink-0" />
                    <span className="text-white text-[15px] font-medium font-sans">
                      <strong className="text-[#10b981] font-mono">Textbook Mealy Architecture:</strong> External input <strong>X</strong> bypasses the clocked flip-flop register and feeds directly into <strong>Output Logic λ(Q, X)</strong>, producing immediate silicon reaction with <strong className="text-[#f59e0b]">zero clock delay</strong>.
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                    <span className="text-white text-[15px] font-medium font-sans">
                      <strong className="text-red-400 font-mono">Textbook Moore Architecture:</strong> Output logic strictly computes <strong>λ(Q)</strong>. Any input change must first clock into the state register before the output can react, creating a mandatory <strong className="text-red-400">1-cycle delay</strong>.
                    </span>
                  </div>
                )}
                <div className="text-right text-[#f59e0b] font-mono font-black text-[16px] shrink-0 ml-4">
                  {mode === 'mealy' ? 'Z = λ( Q , X )' : 'Z = λ( Q )'}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Clean bottom padding */}
      <div className="h-4 w-full" />
    </div>
  );
};
