import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Timer,
  Clock,
  Car,
  HeartPulse,
  Smartphone,
  Play,
  RotateCcw,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Unlock,
  Radio,
  ArrowRight
} from 'lucide-react';
import { presentationSound } from '@/lib/presentationSound';

export const Slide10MealyWithTimers: React.FC = () => {
  // Interactive Stopwatch Simulator
  const [timerMs, setTimerMs] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [hasFired, setHasFired] = useState<boolean>(false);
  const [selectedExample, setSelectedExample] = useState<'phone' | 'car' | 'pacemaker'>('phone');

  const THRESHOLD = 500; // 500 ms threshold

  useEffect(() => {
    let interval: number | undefined;
    if (isRunning) {
      interval = window.setInterval(() => {
        setTimerMs((prev) => {
          if (prev >= THRESHOLD) {
            setIsRunning(false);
            setHasFired(true);
            presentationSound.play("counterTick", 0.9);
            return THRESHOLD;
          }
          return prev + 25;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const startTimer = () => {
    presentationSound.play("click", 0.6);
    setTimerMs(0);
    setHasFired(false);
    setIsRunning(true);
  };

  const resetTimer = () => {
    presentationSound.play("click", 0.5);
    setTimerMs(0);
    setHasFired(false);
    setIsRunning(false);
  };

  return (
    <div className="slide-dark-bg w-[1920px] h-[1080px] px-[80px] pt-[45px] pb-[55px] flex flex-col justify-between relative select-none overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/3 w-[850px] h-[650px] bg-[#ffaa00]/8 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[750px] h-[550px] bg-[#00f2fe]/7 rounded-full blur-[200px] pointer-events-none" />

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 1. HERO HEADER                                                        */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="z-20 flex flex-col">
        <div className="flex items-center gap-2.5 text-[14px] font-semibold tracking-[0.2em] uppercase text-[#ffaa00] font-mono mb-2">
          <Timer className="w-4 h-4 text-[#ffaa00]" />
          <span>ACT V • ACTIVE 2024 RESEARCH FRONTIER</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[50px] font-black text-white tracking-tight leading-tight font-heading">
              Learning Mealy Machines with Timers
            </h2>
            <p className="text-white/75 text-[20px] mt-1 font-light max-w-[1400px]">
              First exact polynomial algorithm for active query-learning of timed Mealy automata (arXiv:2403.02019v3, 2024).
            </p>
          </div>

          <span className="text-xs font-mono px-3.5 py-1.5 rounded-full bg-[#ffaa00]/15 text-[#ffaa00] border border-[#ffaa00]/30 font-bold flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>2024 Algorithmic Breakthrough</span>
          </span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 2. GRAND 2-COLUMN VIEW                                                */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-12 gap-8 my-auto z-10 w-full max-w-[1760px] items-stretch">
        
        {/* LEFT COLUMN: The Real-World Timeout Dilemma (5 cols) */}
        <div className="col-span-5 flex flex-col justify-between gap-6">
          
          <div className="p-7 rounded-3xl bg-[#0d0e17] border-2 border-[#ffaa00]/40 shadow-2xl relative overflow-hidden">
            <div className="text-[15px] font-mono uppercase tracking-wider text-[#ffaa00] font-bold mb-2">
              Why Real Software Needs Clocks
            </div>
            <h3 className="text-[32px] font-black text-white leading-tight mb-3 font-heading">
              The Timeout Dilemma
            </h3>
            <p className="text-[17px] text-white/80 leading-relaxed mb-4">
              Classical state machines assume time is frozen (transitions happen in <span className="font-mono text-cyan-300">0 ns</span>). But in reality, software depends entirely on <strong className="text-white">stopwatches and countdowns</strong>:
            </p>

            {/* 3 Everyday Real-Life Cards */}
            <div className="space-y-3">
              <button
                onClick={() => setSelectedExample('phone')}
                className={`w-full p-3.5 rounded-2xl border-2 flex items-center gap-3.5 text-left transition-all ${
                  selectedExample === 'phone'
                    ? 'bg-[#ffaa00]/15 border-[#ffaa00] text-white shadow-lg'
                    : 'bg-white/[0.03] border-white/10 text-white/70 hover:text-white'
                }`}
              >
                <div className="p-2.5 rounded-xl bg-black/40 border border-[#ffaa00]/40 text-[#ffaa00] shrink-0">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[16px] font-bold text-white flex items-center justify-between">
                    <span>1. Phone Screen Auto-Lock</span>
                    <span className="text-xs font-mono text-[#ffaa00]">30s Timer</span>
                  </div>
                  <div className="text-[13px] text-white/70 leading-snug">
                    No button was pressed! The phone screen turns off all on its own simply because the countdown expired.
                  </div>
                </div>
              </button>

              <button
                onClick={() => setSelectedExample('car')}
                className={`w-full p-3.5 rounded-2xl border-2 flex items-center gap-3.5 text-left transition-all ${
                  selectedExample === 'car'
                    ? 'bg-[#00f2fe]/15 border-[#00f2fe] text-white shadow-lg'
                    : 'bg-white/[0.03] border-white/10 text-white/70 hover:text-white'
                }`}
              >
                <div className="p-2.5 rounded-xl bg-black/40 border border-[#00f2fe]/40 text-[#00f2fe] shrink-0">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[16px] font-bold text-white flex items-center justify-between">
                    <span>2. Automotive ABS Brakes</span>
                    <span className="text-xs font-mono text-cyan-400">10ms Safety Window</span>
                  </div>
                  <div className="text-[13px] text-white/70 leading-snug">
                    If wheel sensor feedback is delayed by even 10ms, an emergency watchdog fires to prevent wheel lockup.
                  </div>
                </div>
              </button>

              <button
                onClick={() => setSelectedExample('pacemaker')}
                className={`w-full p-3.5 rounded-2xl border-2 flex items-center gap-3.5 text-left transition-all ${
                  selectedExample === 'pacemaker'
                    ? 'bg-[#38ef7d]/15 border-[#38ef7d] text-white shadow-lg'
                    : 'bg-white/[0.03] border-white/10 text-white/70 hover:text-white'
                }`}
              >
                <div className="p-2.5 rounded-xl bg-black/40 border border-[#38ef7d]/40 text-[#38ef7d] shrink-0">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[16px] font-bold text-white flex items-center justify-between">
                    <span>3. Cardiac Pacemaker</span>
                    <span className="text-xs font-mono text-emerald-400">800ms Heartbeat Window</span>
                  </div>
                  <div className="text-[13px] text-white/70 leading-snug">
                    If no natural heart contraction occurs within 800ms, the pacemaker immediately shocks the ventricle.
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#0d0e17] border border-[#ffaa00]/30 shadow-xl">
            <div className="font-bold text-white flex items-center gap-2 mb-1.5 text-[18px] font-heading">
              <Zap className="w-5 h-5 text-[#ffaa00]" />
              <span>What the 2024 Algorithm Does:</span>
            </div>
            <p className="text-[16px] text-white/85 leading-relaxed">
              Without ever opening the source code, the active learning oracle discovers both the <strong className="text-white">discrete state machine</strong> and the <strong className="text-[#ffaa00]">exact millisecond numbers</strong> of each timer!
            </p>
          </div>

        </div>

        {/* RIGHT COLUMN: Interactive Live Stopwatch & Timed Transition (7 cols) */}
        <div className="col-span-7 p-7 rounded-3xl bg-[#0d0e17] border-2 border-white/20 flex flex-col justify-between shadow-2xl">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-[#ffaa00]" />
                <span className="text-[17px] font-mono uppercase text-[#ffaa00] tracking-wider font-bold">
                  Interactive Timed Transition Simulator
                </span>
              </div>
              <span className="text-sm font-mono text-[#00f2fe] font-bold px-3 py-1 rounded-full bg-[#00f2fe]/10 border border-[#00f2fe]/30">
                Timed Mealy Machine (TMM)
              </span>
            </div>

            {/* Timed Guard Mathematical Expression */}
            <div className="p-6 rounded-2xl bg-[#07080e] border border-[#ffaa00]/40 font-mono shadow-inner mb-5">
              <div className="text-white/50 text-[13px] mb-1">
                // Continuous Clock Guard &amp; Reset Rule:
              </div>
              <div className="text-white text-[19px] font-bold p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <span>
                  q₀ ──( <span className="text-[#38ef7d]">Input</span> [ <span className="text-[#ffaa00] font-black">timer ≥ 500ms</span> ] / <span className="text-[#00f2fe]">Action</span>, <span className="text-purple-400 font-bold">reset(timer)</span> )──► q₁
                </span>
                <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase ${
                  hasFired
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                }`}>
                  {hasFired ? '✓ Transition Fired' : '🔒 Guard Locked'}
                </span>
              </div>

              {/* Intuitive Explanation Box */}
              <div className="mt-3 p-3.5 rounded-xl bg-white/[0.04] text-[15px] text-white/85 leading-snug">
                💡 <strong className="text-white">The Simple Rule:</strong> The action will <strong className="text-red-300">REFUSE</strong> to fire if you press the button too quickly. You must wait until the stopwatch shows <strong className="text-[#ffaa00]">at least 500ms</strong>. Once it fires, the stopwatch resets back to zero!
              </div>
            </div>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* LIVE MILLISECOND STOPWATCH RIG                                */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <div className="p-6 rounded-2xl bg-[#07080e] border border-white/15 relative overflow-hidden shadow-inner">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-white/60">LIVE MILLISECOND CLOCK:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={startTimer}
                    disabled={isRunning}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#ffaa00] hover:bg-[#ffaa00]/90 text-black font-bold text-xs font-mono transition-all disabled:opacity-50 shadow-lg shadow-[#ffaa00]/20"
                  >
                    <Play className="w-3.5 h-3.5 fill-black" />
                    <span>Start 500ms Clock</span>
                  </button>
                  <button
                    onClick={resetTimer}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>

              {/* Visual Progress Bar */}
              <div className="w-full h-7 bg-white/10 rounded-xl overflow-hidden relative p-1 border border-white/15">
                <motion.div
                  className={`h-full rounded-lg transition-all ${
                    hasFired
                      ? 'bg-gradient-to-r from-amber-500 to-emerald-400 shadow-[0_0_15px_#38ef7d]'
                      : 'bg-gradient-to-r from-cyan-500 to-amber-500'
                  }`}
                  style={{ width: `${(timerMs / THRESHOLD) * 100}%` }}
                />
                <span className="absolute inset-0 flex items-center justify-center font-mono text-xs font-black text-white drop-shadow">
                  {timerMs} ms / {THRESHOLD} ms {hasFired ? '— THRESHOLD CROSSED!' : ''}
                </span>
              </div>

              {/* State Machine Transition Display */}
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs font-mono">
                <div className={`p-3 rounded-xl border flex items-center justify-between ${
                  !hasFired ? 'bg-[#00f2fe]/10 border-[#00f2fe]/50 text-cyan-300' : 'bg-white/5 border-white/10 text-white/50'
                }`}>
                  <span>Current State: <strong>q₀ (WAITING)</strong></span>
                  <Lock className="w-4 h-4 text-cyan-400" />
                </div>

                <div className={`p-3 rounded-xl border flex items-center justify-between ${
                  hasFired ? 'bg-[#38ef7d]/15 border-[#38ef7d]/60 text-emerald-300' : 'bg-white/5 border-white/10 text-white/50'
                }`}>
                  <span>Next State: <strong>q₁ (TRIGGERED)</strong></span>
                  <Unlock className="w-4 h-4 text-emerald-400" />
                </div>
              </div>

              {/* Spontaneous Self-Triggering Callout */}
              <div className="mt-4 p-3 rounded-xl bg-amber-950/30 border border-amber-500/40 text-[14px] text-amber-200 flex items-center gap-2.5">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                <span>
                  <strong>Spontaneous Self-Action:</strong> If no user input arrives, the machine can transition automatically when the stopwatch crosses 500ms.
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 pt-3 border-t border-white/10 text-[15px] text-white/70 flex items-center justify-between font-mono">
            <span>Published on arXiv: 2403.02019v3 (Active 2024 Research Milestone)</span>
            <span className="text-[#ffaa00] font-bold">Continuous Clock Semantics</span>
          </div>
        </div>

      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 3. DOCKED FOOTER                                                      */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="z-20 pt-4 border-t border-white/10 flex items-center justify-between text-[16px] text-white/70 font-mono">
        <span>Formal Timing Verification: Unifying Discrete States with Dense Time</span>
        <span className="font-mono text-white/80">Continuous Clock Regions</span>
      </div>
    </div>
  );
};
