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
  // Step 0: Graphical sentence appears
  // Step 1: Card 1 emerges
  // Step 2: Card 2 emerges from back of Card 1
  // Step 3: Card 3 emerges from back of Card 2
  const [animStep, setAnimStep] = useState<number>(0);
  const [animationKey, setAnimationKey] = useState<number>(0);

  useEffect(() => {
    setAnimStep(0);

    // Sentence appears at 200ms
    const t0 = setTimeout(() => {
      setAnimStep(1);
      presentationSound.play("nodeReveal", 0.8);
    }, 400);

    // Card 1 emerges at 1400ms
    const t1 = setTimeout(() => {
      setAnimStep(2);
      presentationSound.play("cardSlideSnap", 1);
    }, 1500);

    // Card 2 emerges from back at 2700ms
    const t2 = setTimeout(() => {
      setAnimStep(3);
      presentationSound.play("cardSlideSnap", 2);
    }, 2800);

    // Card 3 emerges from back at 4000ms
    const t3 = setTimeout(() => {
      setAnimStep(4);
      presentationSound.play("cardSlideSnap", 3);
      presentationSound.play("counterSwell");
    }, 4100);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [animationKey]);

  const replaySequence = (e: React.MouseEvent) => {
    e.stopPropagation();
    presentationSound.play("click", 0.6);
    setAnimationKey((prev) => prev + 1);
  };

  return (
    <div
      key={animationKey}
      className="slide-dark-bg w-[1920px] h-[1080px] px-[80px] pt-[45px] pb-[55px] flex flex-col justify-between relative select-none overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[750px] bg-[#00f2fe]/7 rounded-full blur-[220px] pointer-events-none" />

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 1. HERO HEADER                                                        */}
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
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-mono text-sm transition-all shadow-lg hover:shadow-[#00f2fe]/20"
          >
            <RotateCcw className="w-4 h-4 text-[#00f2fe]" />
            <span>↺ Replay Card Cascade</span>
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 2. PROMINENT GRAPHICAL SENTENCE (Appears First)                       */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="z-20 w-full max-w-[1760px] mx-auto my-auto flex flex-col gap-8">
        
        {/* Graphical Headline Banner */}
        <motion.div
          initial={{ opacity: 0, y: -25, scale: 0.95 }}
          animate={{
            opacity: animStep >= 1 ? 1 : 0,
            y: animStep >= 1 ? 0 : -25,
            scale: animStep >= 1 ? 1 : 0.95
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="p-6 rounded-3xl bg-gradient-to-r from-[#00f2fe]/15 via-[#38ef7d]/10 to-[#ffaa00]/15 border-2 border-white/20 shadow-2xl flex items-center justify-between backdrop-blur-md"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#00f2fe]/20 border border-[#00f2fe]/50 flex items-center justify-center text-[#00f2fe] shadow-lg">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[13px] font-mono uppercase tracking-[0.2em] text-[#00f2fe] font-bold block">
                CORE PHILOSOPHICAL FOUNDATION
              </span>
              <h3 className="text-[30px] font-black text-white font-heading tracking-tight leading-tight">
                Why Mealy Machine and Conformance?
              </h3>
            </div>
          </div>

          <div className="text-right font-mono text-sm text-white/70 hidden lg:block">
            <span className="text-[#38ef7d] font-bold">1955 Breakthrough</span> ➔ <span className="text-[#00f2fe] font-bold">Active Learning</span> ➔ <span className="text-[#ffaa00] font-bold">Formal Security</span>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════════════ */}
        {/* 3. THREE PILLAR CARDS (Emerging One After Another from One's Backside) */}
        {/* ══════════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-3 gap-8 w-full items-stretch relative min-h-[440px]">
          {PILLARS.map((card, idx) => {
            // Card 1 reveals when animStep >= 2
            // Card 2 reveals when animStep >= 3 (emerging from behind card 1)
            // Card 3 reveals when animStep >= 4 (emerging from behind card 2)
            const isVisible = animStep >= idx + 2;

            return (
              <motion.div
                key={card.id}
                initial={{
                  opacity: 0,
                  x: -120, // Slide out from the back of the previous card!
                  scale: 0.82,
                  zIndex: 10 - idx
                }}
                animate={{
                  opacity: isVisible ? 1 : 0,
                  x: isVisible ? 0 : -120,
                  scale: isVisible ? 1 : 0.82,
                  zIndex: isVisible ? 10 : 10 - idx
                }}
                transition={{
                  duration: 0.65,
                  type: "spring",
                  stiffness: 190,
                  damping: 18
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

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 4. DOCKED FOOTER                                                      */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="z-20 pt-4 border-t border-white/10 flex items-center justify-between text-[16px] text-white/70 font-mono">
        <span>Formal Engineering Takeaway: Reactive Mealy Transducers as the Bedrock of Formal Synthesis</span>
        <span className="font-mono text-white/80">From George Mealy (1955) to L# Active Verification (2024)</span>
      </div>
    </div>
  );
};
