import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  GitBranch,
  Zap,
  Sparkles,
  TrendingUp,
  Layers,
  RotateCcw,
  Workflow,
  Cpu
} from 'lucide-react';
import { presentationSound } from '@/lib/presentationSound';

interface InnovationFeature {
  icon: React.ElementType;
  title: string;
  desc: string;
  badge: string;
  color: string;
  iconDelay: number;
  textDelay: number;
}

export const Slide09LSharpAlgorithm: React.FC = () => {
  const [animationKey, setAnimationKey] = useState<number>(0);

  const features: InnovationFeature[] = [
    {
      icon: GitBranch,
      title: "1. Observation Trees (Tries) Instead of Tables",
      desc: "Stores all known query traces inside a prefix observation tree. Never re-queries known paths and handles incomplete observation data without forced table padding.",
      badge: "Zero Matrix Overhead",
      color: "#00f2fe",
      iconDelay: 0.6,
      textDelay: 0.95,
    },
    {
      icon: Zap,
      title: "2. Lazy State Isolation",
      desc: "Rather than globally separating every state candidate simultaneously across all experiments, L# isolates candidate states locally on-demand only when a concrete inconsistency is encountered.",
      badge: "On-Demand Partition",
      color: "#38ef7d",
      iconDelay: 1.8,
      textDelay: 2.15,
    },
    {
      icon: Layers,
      title: "3. Optimal Counterexample Processing",
      desc: "Directly incorporates long counterexamples into the observation tree without prematurely blowing up the candidate state count, preserving polynomial guarantees.",
      badge: "Polynomial Bound",
      color: "#ffaa00",
      iconDelay: 3.0,
      textDelay: 3.35,
    },
  ];

  // Choreographed Sound Schedule strictly following RiseUp reference implementation
  useEffect(() => {
    const timers: number[] = [];

    // Row 1: Icon enters 0.6s (nodeReveal), text expands 0.95s (tagPop)
    timers.push(
      window.setTimeout(() => {
        presentationSound.play("nodeReveal", 1);
      }, 600)
    );
    timers.push(
      window.setTimeout(() => {
        presentationSound.play("tagPop");
      }, 950)
    );

    // Row 2: Icon enters 1.8s (nodeReveal), text expands 2.15s (tagPop)
    timers.push(
      window.setTimeout(() => {
        presentationSound.play("nodeReveal", 1);
      }, 1800)
    );
    timers.push(
      window.setTimeout(() => {
        presentationSound.play("tagPop");
      }, 2150)
    );

    // Row 3: Icon enters 3.0s (nodeReveal), text expands 3.35s (tagPop)
    timers.push(
      window.setTimeout(() => {
        presentationSound.play("nodeReveal", 1);
      }, 3000)
    );
    timers.push(
      window.setTimeout(() => {
        presentationSound.play("tagPop");
      }, 3350)
    );

    // Underground banner: Rises at 4.2s with counterSwell
    timers.push(
      window.setTimeout(() => {
        presentationSound.play("counterSwell");
      }, 4200)
    );

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
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
      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-1/4 w-[850px] h-[650px] bg-[#00f2fe]/8 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[750px] h-[550px] bg-[#38ef7d]/6 rounded-full blur-[200px] pointer-events-none" />

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 1. HERO HEADER                                                        */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="z-20 flex flex-col">
        <div className="flex items-center gap-2.5 text-[14px] font-semibold tracking-[0.2em] uppercase text-[#00f2fe] font-mono mb-2">
          <Sparkles className="w-4 h-4 text-[#00f2fe]" />
          <span>ACT V • CUTTING-EDGE ACTIVE LEARNING FRONTIERS</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[50px] font-black text-white tracking-tight leading-tight font-heading">
              Beyond L*: The L# (L-Sharp) Algorithm
            </h2>
            <p className="text-white/75 text-[20px] mt-1 font-light max-w-[1400px]">
              F. Vaandrager, B. Garhewal, J. Jurrjens et al. (TACAS / Springer Nature 2022).
            </p>
          </div>

          <button
            onClick={replaySequence}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-mono text-sm transition-all shadow-lg hover:shadow-[#00f2fe]/20"
          >
            <RotateCcw className="w-4 h-4 text-[#00f2fe]" />
            <span>↺ Replay Reveal Sequence</span>
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 2. GRAND 2-COLUMN VIEW                                                */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-12 gap-8 my-auto z-10 w-full max-w-[1760px] items-stretch">
        
        {/* LEFT COLUMN: Why Classic L* Exploded (5 cols) */}
        <div className="col-span-5 flex flex-col justify-between gap-6">
          
          <div className="p-7 rounded-3xl bg-[#0d0e17] border-2 border-red-500/40 shadow-2xl relative overflow-hidden">
            <div className="text-[15px] font-mono uppercase tracking-wider text-red-400 font-bold mb-2">
              The Fundamental Bottleneck in Angluin L*
            </div>
            <h3 className="text-[32px] font-black text-white leading-tight mb-3 font-heading">
              Observation Table Explosion
            </h3>
            <p className="text-[17px] text-white/80 leading-relaxed mb-4">
              Classic L* insists on maintaining a rigid 2D matrix <code className="text-white font-mono font-bold bg-white/10 px-2 py-0.5 rounded">(S × E)</code>. In complex reactive protocols, this creates severe scaling barriers:
            </p>

            <div className="space-y-3 text-[16px] text-white/85">
              <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-start gap-2.5">
                <span className="text-red-400 font-bold text-lg">•</span>
                <span><strong className="text-white">Redundant Queries:</strong> Vast numbers of table cells ask identical or uninformative queries.</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-start gap-2.5">
                <span className="text-red-400 font-bold text-lg">•</span>
                <span><strong className="text-white">Quadratic Query Blowup:</strong> Membership queries scale quadratic in counterexample lengths (<span className="font-mono text-red-300">O(m²)</span>).</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#0d0e17] border-2 border-[#00f2fe]/40 shadow-xl flex flex-col justify-between">
            <div className="font-bold text-white flex items-center gap-2.5 mb-2 text-[19px] font-heading">
              <TrendingUp className="w-6 h-6 text-[#00f2fe]" />
              <span>Benchmark Breakthrough:</span>
            </div>
            <p className="text-[17px] text-white/85 leading-relaxed">
              L# consistently requires up to an <strong className="text-[#00f2fe]">order of magnitude fewer membership queries</strong> on standard industrial state machine benchmarks.
            </p>
          </div>

        </div>

        {/* RIGHT COLUMN: The 3 Core L# Innovations (7 cols) */}
        {/* Strictly implementing the RiseUp 2-Phase Animated Feature Rows */}
        <div className="col-span-7 p-7 rounded-3xl bg-[#0d0e17] border-2 border-white/20 flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2.5">
                <Workflow className="w-5 h-5 text-[#00f2fe]" />
                <span className="text-[16px] font-mono uppercase text-[#00f2fe] tracking-wider font-bold">
                  Core Innovations in the L# Active Learning Engine
                </span>
              </div>
              <span className="text-sm font-mono text-[#38ef7d] font-bold px-3 py-1 rounded-full bg-[#38ef7d]/10 border border-[#38ef7d]/30">
                TACAS Best Paper
              </span>
            </div>

            {/* 3 Horizontal Benefit Rows: Two-Phase Sequential Reveal */}
            <div className="space-y-4">
              {features.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="px-6 py-5 rounded-2xl bg-[#0a0b12] border border-white/10 flex items-center gap-5 hover:border-white/30 transition-all shadow-md overflow-hidden"
                  >
                    {/* Phase 1: High-impact Glowing Badge slides in from the left with spring physics */}
                    <motion.div
                      initial={{ opacity: 0, x: -60, scale: 0.6 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{
                        delay: item.iconDelay,
                        duration: 0.55,
                        type: "spring",
                        stiffness: 240,
                        damping: 18,
                      }}
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg"
                      style={{
                        backgroundColor: `${item.color}15`,
                        borderColor: `${item.color}88`,
                        borderWidth: "1.5px",
                        boxShadow: `0 0 16px ${item.color}35`,
                        color: item.color,
                      }}
                    >
                      <Icon className="w-7 h-7 stroke-[2.2]" />
                    </motion.div>

                    {/* Phase 2: Benefit text reveals and expands from the icon with blur dissipation */}
                    <motion.div
                      initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      transition={{
                        delay: item.textDelay,
                        duration: 0.5,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="flex-1"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="text-[21px] font-extrabold font-heading text-white leading-tight tracking-tight">
                          {item.title}
                        </h4>
                        <span
                          className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full shrink-0 border"
                          style={{
                            color: item.color,
                            backgroundColor: `${item.color}15`,
                            borderColor: `${item.color}40`,
                          }}
                        >
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-[15px] font-medium text-white/80 leading-snug">
                        {item.desc}
                      </p>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Underground Banner: Rises at 4.2s with counterSwell chime */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 4.2,
              duration: 0.75,
              type: "spring",
              stiffness: 160,
              damping: 18,
            }}
            className="mt-6 pt-4 border-t border-white/10 text-[15px] text-white/70 flex items-center justify-between font-mono"
          >
            <span>Implemented in open-source libraries: AALpy (Python) &amp; Rust-LearnLib.</span>
            <span className="text-[#00f2fe] font-bold">State of the Art (2022–Present)</span>
          </motion.div>
        </div>

      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 3. DOCKED FOOTER                                                      */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="z-20 pt-4 border-t border-white/10 flex items-center justify-between text-[16px] text-white/70 font-mono">
        <span>Active Model Learning Paradigm Shift: From 2D Tables to Prefix Tries</span>
        <span className="font-mono text-white/80">Observation Tree Trie Architecture</span>
      </div>
    </div>
  );
};
