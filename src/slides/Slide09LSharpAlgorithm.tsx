import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GitBranch,
  Zap,
  Sparkles,
  TrendingUp,
  Layers,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  TreePine,
  Workflow,
  Cpu,
  Volume2
} from 'lucide-react';
import { presentationSound } from '@/lib/presentationSound';

interface InnovationStep {
  step: number;
  title: string;
  badge: string;
  icon: React.ReactNode;
  color: string;
  accentBg: string;
  borderColor: string;
  flowSteps: {
    label: string;
    sub: string;
    code?: string;
  }[];
  summary: string;
}

const INNOVATION_STEPS: InnovationStep[] = [
  {
    step: 1,
    title: '1. Observation Trees (Tries) Instead of Tables',
    badge: 'Zero Table Explosion',
    icon: <GitBranch className="w-6 h-6 text-[#00f2fe]" />,
    color: '#00f2fe',
    accentBg: 'rgba(0, 242, 254, 0.08)',
    borderColor: 'rgba(0, 242, 254, 0.4)',
    flowSteps: [
      { label: 'Prefix Trie Root (ε)', sub: 'Single tree shared across all runs', code: 'Root node' },
      { label: 'Branch per Input a, b', sub: 'Shared prefixes never re-queried', code: 'Trie edges' },
      { label: 'Stores Incomplete Traces', sub: 'Zero table padding or forced nulls', code: 'O(1) lookups' }
    ],
    summary: 'Stores all known query traces inside a prefix observation tree. Never re-queries known paths and handles incomplete observation data without forced table padding.'
  },
  {
    step: 2,
    title: '2. Lazy State Isolation',
    badge: 'On-Demand Separation',
    icon: <Zap className="w-6 h-6 text-[#38ef7d]" />,
    color: '#38ef7d',
    accentBg: 'rgba(56, 239, 125, 0.08)',
    borderColor: 'rgba(56, 239, 125, 0.4)',
    flowSteps: [
      { label: 'Assume Equivalence', sub: 'Groups candidate states together', code: 'q_i ≈ q_j' },
      { label: 'Encounter Inconsistency', sub: 'Conflict discovered along active branch', code: 'σ(a) ≠ σ(b)' },
      { label: 'Isolate Locally', sub: 'Splits only the conflicting states', code: 'Lazy partition' }
    ],
    summary: 'Rather than globally separating every state candidate simultaneously across all experiments, L# isolates candidate states locally on-demand only when a concrete inconsistency is encountered.'
  },
  {
    step: 3,
    title: '3. Optimal Counterexample Processing',
    badge: 'Guaranteed Polynomial',
    icon: <Layers className="w-6 h-6 text-[#ffaa00]" />,
    color: '#ffaa00',
    accentBg: 'rgba(255, 170, 0, 0.08)',
    borderColor: 'rgba(255, 170, 0, 0.4)',
    flowSteps: [
      { label: 'Oracle Counterexample', sub: 'Receives long diverging trace from SUT', code: 'length = m' },
      { label: 'Suture into Trie Directly', sub: 'Incorporate path without S × E blowup', code: 'O(m) insert' },
      { label: 'Synthesize Minimal FSM', sub: 'Preserves polynomial query bound', code: 'Minimal states' }
    ],
    summary: 'Directly incorporates long counterexamples into the observation tree without prematurely blowing up the candidate state count, preserving polynomial guarantees.'
  }
];

export const Slide09LSharpAlgorithm: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [revealedItems, setRevealedItems] = useState<number[]>([1]);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  // Play sound and trigger flow on item selection
  const selectItem = (stepNum: number, withSound = true) => {
    setActiveStep(stepNum);
    if (!revealedItems.includes(stepNum)) {
      setRevealedItems((prev) => [...prev, stepNum]);
    }
    if (withSound) {
      presentationSound.play('counterTick', 0.75);
    }
  };

  // Automatic one-after-another cascade on slide appearance
  useEffect(() => {
    setRevealedItems([1]);
    setActiveStep(1);
    setIsAutoPlaying(true);

    // 1st sound for item 1
    presentationSound.play('nodeReveal', 0.7);

    const timer1 = setTimeout(() => {
      selectItem(2, true);
    }, 1800);

    const timer2 = setTimeout(() => {
      selectItem(3, true);
      presentationSound.play('pillDrop', 0.85);
      setIsAutoPlaying(false);
    }, 3600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const replaySequence = (e: React.MouseEvent) => {
    e.stopPropagation();
    presentationSound.play('click', 0.6);
    setRevealedItems([1]);
    setActiveStep(1);
    setIsAutoPlaying(true);

    setTimeout(() => {
      presentationSound.play('counterTick', 0.75);
    }, 200);

    setTimeout(() => {
      selectItem(2, true);
    }, 1600);

    setTimeout(() => {
      selectItem(3, true);
      presentationSound.play('pillDrop', 0.85);
      setIsAutoPlaying(false);
    }, 3200);
  };

  return (
    <div className="slide-dark-bg w-[1920px] h-[1080px] px-[80px] pt-[45px] pb-[55px] flex flex-col justify-between relative select-none overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-1/4 w-[800px] h-[600px] bg-[#00f2fe]/8 rounded-full blur-[200px] pointer-events-none" />
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
            <RotateCcw className={`w-4 h-4 text-[#00f2fe] ${isAutoPlaying ? 'animate-spin' : ''}`} />
            <span>Replay Flowchart Reveal</span>
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 2. GRAND 2-COLUMN VIEW                                                */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-12 gap-8 my-auto z-10 w-full max-w-[1760px] items-stretch">
        
        {/* LEFT COLUMN: The Fundamental Bottleneck in Angluin L* (5 cols) */}
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
                <span><strong className="text-white">Quadratic Blowup:</strong> Membership queries scale quadratic in counterexample lengths (<span className="font-mono text-red-300">O(m²)</span>).</span>
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

        {/* RIGHT COLUMN: The 3 Core L# Innovations with Dynamic Flowcharts (7 cols) */}
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

            {/* The 3 Sequential Innovation Cards with Sub-Flowcharts */}
            <div className="space-y-4">
              {INNOVATION_STEPS.map((item) => {
                const isRevealed = revealedItems.includes(item.step);
                const isSelected = activeStep === item.step;

                return (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{
                      opacity: isRevealed ? 1 : 0.45,
                      y: 0,
                      scale: isSelected ? 1.01 : 1
                    }}
                    transition={{ duration: 0.4 }}
                    onClick={() => selectItem(item.step, true)}
                    className="p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 relative overflow-hidden"
                    style={{
                      backgroundColor: isSelected ? item.accentBg : 'rgba(255, 255, 255, 0.03)',
                      borderColor: isSelected ? item.borderColor : 'rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    {/* Header Row: Icon + Title + Badge */}
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-3">
                        <div
                          className="p-2.5 rounded-xl border shadow-inner flex items-center justify-center shrink-0"
                          style={{
                            backgroundColor: isSelected ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.05)',
                            borderColor: isSelected ? item.color : 'rgba(255,255,255,0.1)'
                          }}
                        >
                          {item.icon}
                        </div>
                        <div>
                          <div className="text-[19px] font-bold text-white font-heading">
                            {item.title}
                          </div>
                          <div className="text-[14px] text-white/70 mt-0.5 leading-snug">
                            {item.summary}
                          </div>
                        </div>
                      </div>

                      <span
                        className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full shrink-0 border"
                        style={{
                          color: item.color,
                          backgroundColor: `${item.color}15`,
                          borderColor: `${item.color}40`
                        }}
                      >
                        {item.badge}
                      </span>
                    </div>

                    {/* Dynamic Sub-Flowchart revealed sequentially */}
                    <AnimatePresence>
                      {isRevealed && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4 }}
                          className="mt-3 pt-3 border-t border-white/10"
                        >
                          <div className="text-[11px] font-mono text-white/50 mb-2 flex items-center justify-between">
                            <span>OPERATIONAL EXECUTION FLOW:</span>
                            <span className="text-[10px] text-white/40">Step-by-step pipeline</span>
                          </div>

                          {/* Horizontal 3-Step Flowchart Pipeline */}
                          <div className="grid grid-cols-3 gap-2.5">
                            {item.flowSteps.map((flow, fIdx) => (
                              <motion.div
                                key={fIdx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.15 * fIdx, duration: 0.3 }}
                                className="p-2.5 rounded-xl bg-black/50 border border-white/10 relative flex flex-col justify-between"
                              >
                                <div>
                                  <div className="flex items-center justify-between text-[10px] font-mono text-white/50 mb-0.5">
                                    <span>STEP 0{fIdx + 1}</span>
                                    {flow.code && (
                                      <span
                                        className="font-bold px-1 rounded text-[9px]"
                                        style={{ color: item.color, backgroundColor: `${item.color}20` }}
                                      >
                                        {flow.code}
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-[13px] font-bold text-white leading-tight">
                                    {flow.label}
                                  </div>
                                </div>
                                <div className="text-[11px] text-white/60 mt-1 leading-snug">
                                  {flow.sub}
                                </div>

                                {/* Flow arrow to next node */}
                                {fIdx < 2 && (
                                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white/10 border border-white/20 flex items-center justify-center z-10">
                                    <ArrowRight className="w-2.5 h-2.5 text-white/70" />
                                  </div>
                                )}
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 text-[15px] text-white/70 flex items-center justify-between font-mono">
            <span>Implemented in open-source libraries: AALpy (Python) &amp; Rust-LearnLib.</span>
            <span className="text-[#00f2fe] font-bold">State of the Art (2022–Present)</span>
          </div>
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
