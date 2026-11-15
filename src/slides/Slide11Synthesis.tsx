import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  Zap,
  ShieldCheck,
  Compass,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { presentationSound } from '@/lib/presentationSound';

interface PillarCard {
  id: number;
  title: string;
  badge: string;
  icon: React.ReactNode;
  color: string;
  borderColor: string;
  shadowColor: string;
  desc: string;
  subBullet: string;
}

const PILLARS: PillarCard[] = [
  {
    id: 1,
    title: "1. Reactive Expressivity",
    badge: "Silicon Synchronous",
    icon: <Zap className="w-8 h-8 text-[#00f2fe]" />,
    color: "#00f2fe",
    borderColor: "border-[#00f2fe]/50",
    shadowColor: "shadow-[#00f2fe]/20",
    desc: "Associating output directly with the transition λ(q, a) mirrors the real-world stimulus-response nature of network packets, OS system calls, and digital microcontrollers.",
    subBullet: "Minimal states, zero clock latency"
  },
  {
    id: 2,
    title: "2. Gold Standard for Verification",
    badge: "Formal Security",
    icon: <ShieldCheck className="w-8 h-8 text-[#38ef7d]" />,
    color: "#38ef7d",
    borderColor: "border-[#38ef7d]/50",
    shadowColor: "shadow-[#38ef7d]/20",
    desc: "Active model learning (L*, L#) provides a mathematically sound, reproducible method to reverse-engineer opaque black-box software and exposed real-world zero-day flaws in TLS, SSH, and smartcards.",
    subBullet: "Black-box formal guarantees"
  },
  {
    id: 3,
    title: "3. Continuous Evolution",
    badge: "2024 & Beyond",
    icon: <Compass className="w-8 h-8 text-[#ffaa00]" />,
    color: "#ffaa00",
    borderColor: "border-[#ffaa00]/50",
    shadowColor: "shadow-[#ffaa00]/20",
    desc: "The paradigm is not frozen in 1955. Active algorithms today scale to continuous real-time timers (2024), register automata (data parameters), and probabilistic transitions in modern autonomous systems.",
    subBullet: "Living, vital research discipline"
  }
];

export const Slide11Synthesis: React.FC = () => {
  // Stage 0: Center provocative question hook ("Why Mealy Machine and Conformance?")
  // Stage 1: The question zooms up/settles into header, Card 1 deals into center
  // Stage 2: Card 2 deals out from behind Card 1
  // Stage 3: Card 3 deals out from behind Card 2 into full 3-card layout
  const [stage, setStage] = useState<number>(0);
  const [animationKey, setAnimationKey] = useState<number>(0);

  // Progressive auto-advance schedule matching Slide 1 story choreography
  useEffect(() => {
    setStage(0);

    // Initial dramatic question appearance
    const t0 = setTimeout(() => {
      presentationSound.play("reveal", 0.9);
      presentationSound.play("nodeReveal", 0.9);
    }, 250);

    // Question transitions up & Card 1 deals in at 2.4s
    const t1 = setTimeout(() => {
      setStage(1);
      presentationSound.play("cardSlideSnap", 1);
    }, 2500);

    // Card 2 deals out from behind Card 1 at 4.2s
    const t2 = setTimeout(() => {
      setStage(2);
      presentationSound.play("cardSlideSnap", 2);
    }, 4300);

    // Card 3 deals out from behind Card 2 at 6.0s
    const t3 = setTimeout(() => {
      setStage(3);
      presentationSound.play("cardSlideSnap", 3);
      presentationSound.play("counterSwell");
    }, 6100);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [animationKey]);

  // Click anywhere on slide to advance stage manually if presenter wants to control pacing
  const handleStageAdvance = () => {
    if (stage < 3) {
      presentationSound.play("cardSlideSnap", stage + 1);
      setStage((prev) => prev + 1);
    }
  };

  const replaySequence = (e: React.MouseEvent) => {
    e.stopPropagation();
    presentationSound.play("click", 0.6);
    setAnimationKey((prev) => prev + 1);
  };

  return (
    <div
      key={animationKey}
      onClick={handleStageAdvance}
      className={`slide-dark-bg w-[1920px] h-[1080px] px-[80px] pt-[45px] pb-[55px] flex flex-col justify-between relative select-none overflow-hidden ${
        stage < 3 ? 'cursor-pointer' : ''
      }`}
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[750px] bg-[#00f2fe]/7 rounded-full blur-[220px] pointer-events-none" />

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 1. TOP DOCKED HEADER                                                  */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="z-20 flex flex-col">
        <div className="flex items-center gap-2.5 text-[14px] font-semibold tracking-[0.2em] uppercase text-[#00f2fe] font-mono mb-2">
          <Award className="w-4 h-4 text-[#00f2fe]" />
          <span>SYNTHESIS &amp; ENGINEERING TAKEAWAYS</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[50px] font-black text-white tracking-tight leading-tight font-heading">
              Why Mealy Machines Endure
            </h2>
            <p className="text-white/75 text-[20px] mt-1 font-light max-w-[1400px]">
              70 years since George Mealy's seminal 1955 paper: from vacuum-tube circuits to AI-driven cyber-physical verification.
            </p>
          </div>

          <button
            onClick={replaySequence}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-mono text-sm transition-all shadow-lg hover:shadow-[#00f2fe]/20 z-40"
          >
            <RotateCcw className="w-4 h-4 text-[#00f2fe]" />
            <span>↺ Replay Presentation Hook</span>
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 2. THE GRAPHICAL SENTENCE: APPEARS FIRST IN CENTER (LIKE SLIDE 1)     */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="my-auto max-w-[1840px] z-10 w-full flex flex-col relative min-h-[640px] justify-center mx-auto">
        
        {/* STAGE 0: BOLD GRAPHICAL QUESTION HOOK IN FULL CENTER SCREEN */}
        <AnimatePresence>
          {stage === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 35, filter: "blur(12px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.94, y: -45, filter: "blur(8px)" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 select-none z-30 pointer-events-none"
            >
              <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-white/[0.06] border border-white/20 backdrop-blur-xl shadow-2xl mb-8">
                <Sparkles className="w-5 h-5 text-[#00f2fe] animate-pulse" />
                <span className="font-mono font-bold text-[15px] tracking-widest uppercase text-cyan-300">
                  THE ESSENTIAL QUESTION
                </span>
              </div>

              <h1 className="font-heading text-[80px] font-black tracking-tight text-white leading-[1.12] drop-shadow-[0_15px_40px_rgba(0,0,0,0.9)] max-w-[1600px] mx-auto">
                &ldquo;Why <span className="text-[#00f2fe] px-3 py-1 rounded-3xl bg-[#00f2fe]/10 border border-[#00f2fe]/30 mx-1 inline-block">Mealy Machine</span> and <span className="text-[#38ef7d] px-3 py-1 rounded-3xl bg-[#38ef7d]/10 border border-[#38ef7d]/30 mx-1 inline-block">Conformance?</span>&rdquo;
              </h1>

              <p className="text-[26px] text-white/75 max-w-[1200px] mx-auto mt-7 font-medium leading-relaxed font-sans">
                Connecting mathematical transducer theory with 70 years of real-world silicon &amp; protocol security.
              </p>

              <div className="mt-8 text-xs font-mono text-white/40 tracking-widest uppercase animate-pulse">
                Click anywhere or wait to deal the 3 synthesis cards ➔
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══════════════════════════════════════════════════════════════════════ */}
        {/* STAGES 1 TO 3: CARDS DEAL OUT ONE AFTER ANOTHER FROM ONE'S BACKSIDE   */}
        {/* ══════════════════════════════════════════════════════════════════════ */}
        {stage >= 1 && (
          <div className="w-full flex flex-col gap-6">
            
            {/* Docked Subtitle Bar (Shifted up smoothly from center) */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="p-4 px-6 rounded-2xl bg-gradient-to-r from-[#00f2fe]/10 via-[#38ef7d]/10 to-[#ffaa00]/10 border border-white/15 flex items-center justify-between backdrop-blur-md"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-[#00f2fe]" />
                <span className="text-[17px] font-black text-white font-heading">
                  Why Mealy Machine and Conformance?
                </span>
                <span className="text-xs font-mono text-white/50 px-2.5 py-0.5 rounded-full bg-white/10">
                  Three Pillar Proof
                </span>
              </div>
              <div className="font-mono text-xs text-white/60">
                Card {Math.min(stage, 3)} of 3 Dealt
              </div>
            </motion.div>

            {/* 3 Pillar Cards Container */}
            <div className="grid grid-cols-3 gap-8 w-full items-stretch relative min-h-[440px]">
              {PILLARS.map((card, idx) => {
                // Card 1 appears at stage 1
                // Card 2 appears at stage 2, emerging from behind Card 1
                // Card 3 appears at stage 3, emerging from behind Card 2
                const isVisible = stage >= idx + 1;

                return (
                  <motion.div
                    key={card.id}
                    initial={{
                      opacity: 0,
                      // Emerges from the exact horizontal location of the PREVIOUS card's backside!
                      x: -540,
                      scale: 0.78,
                      rotateY: -15,
                      zIndex: 10 - idx
                    }}
                    animate={{
                      opacity: isVisible ? 1 : 0,
                      x: isVisible ? 0 : -540,
                      scale: isVisible ? 1 : 0.78,
                      rotateY: isVisible ? 0 : -15,
                      zIndex: isVisible ? 10 : 10 - idx
                    }}
                    transition={{
                      duration: 0.75,
                      type: "spring",
                      stiffness: 170,
                      damping: 17
                    }}
                    className={`p-8 rounded-3xl bg-[#0d0e17] border-2 ${card.borderColor} ${card.shadowColor} shadow-2xl flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:scale-[1.02]`}
                  >
                    {/* Background Subtle Gradient Glow */}
                    <div
                      className="absolute -right-12 -top-12 w-48 h-48 rounded-full blur-3xl pointer-events-none"
                      style={{ backgroundColor: `${card.color}15` }}
                    />

                    <div>
                      {/* Top Bar: Icon + Badge */}
                      <div className="flex items-center justify-between mb-6">
                        <div
                          className="w-16 h-16 rounded-2xl border flex items-center justify-center shadow-lg"
                          style={{
                            backgroundColor: `${card.color}15`,
                            borderColor: `${card.color}50`
                          }}
                        >
                          {card.icon}
                        </div>

                        <span
                          className="text-xs font-mono font-bold px-3 py-1 rounded-full border"
                          style={{
                            color: card.color,
                            backgroundColor: `${card.color}15`,
                            borderColor: `${card.color}40`
                          }}
                        >
                          {card.badge}
                        </span>
                      </div>

                      <h3 className="text-[28px] font-black text-white mb-3 font-heading tracking-tight">
                        {card.title}
                      </h3>

                      <p className="text-[17px] text-white/80 leading-relaxed font-sans">
                        {card.desc}
                      </p>
                    </div>

                    {/* Sub-Bullet Callout at Bottom of Card */}
                    <div
                      className="mt-6 pt-4 border-t border-white/10 text-[16px] font-bold flex items-center gap-2 font-mono"
                      style={{ color: card.color }}
                    >
                      <CheckCircle2 className="w-5 h-5 shrink-0" />
                      <span>{card.subBullet}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        )}

      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 3. DOCKED FOOTER                                                      */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="z-20 pt-4 border-t border-white/10 flex items-center justify-between text-[16px] text-white/70 font-mono">
        <span>Formal Engineering Takeaway: Reactive Mealy Transducers as the Bedrock of Formal Synthesis</span>
        <span className="font-mono text-white/80">From George Mealy (1955) to L# Active Verification (2024)</span>
      </div>
    </div>
  );
};
