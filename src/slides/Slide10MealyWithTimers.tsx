import React from 'react';
import { motion } from 'framer-motion';
import { Timer, Radio, Cpu, Bell, Activity, ArrowRight } from 'lucide-react';

export const Slide10MealyWithTimers: React.FC = () => {
  return (
    <div className="slide-dark-bg w-[1920px] h-[1080px] px-[80px] pt-[50px] pb-[60px] flex flex-col justify-between relative select-none overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/3 w-[800px] h-[600px] bg-[#ffaa00]/8 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[700px] h-[500px] bg-[#00f2fe]/6 rounded-full blur-[180px] pointer-events-none" />

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 1. HERO HEADER: Docked & High-Impact                                  */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="z-20 flex flex-col">
        <div className="flex items-center gap-2.5 text-[14px] font-semibold tracking-[0.2em] uppercase text-[#ffaa00] font-mono mb-2">
          <Timer className="w-4 h-4" />
          <span>ACT V • ACTIVE 2024 RESEARCH FRONTIER</span>
        </div>
        <h2 className="text-[52px] font-black text-white tracking-tight leading-tight">
          Learning Mealy Machines with Timers
        </h2>
        <p className="text-white/70 text-[20px] mt-1.5 font-light max-w-[1500px]">
          First exact polynomial algorithm for active query-learning of timed Mealy automata (arXiv:2403.02019v3, 2024).
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 2. GRAND 2-COLUMN VIEW                                                */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-12 gap-8 my-auto z-10 w-full max-w-[1760px] items-stretch">
        
        {/* LEFT COLUMN: Why Untimed Abstractions Fail (5 cols) */}
        <div className="col-span-5 flex flex-col justify-between gap-6">
          
          <div className="p-8 rounded-3xl bg-[#0d0e17] border-2 border-white/15 shadow-2xl relative overflow-hidden">
            <div className="text-[15px] font-mono uppercase tracking-wider text-[#ffaa00] font-bold mb-2">
              The Real-Time Physical Limitation
            </div>
            <h3 className="text-[32px] font-black text-white leading-tight mb-3">
              Beyond Untimed Abstractions
            </h3>
            <p className="text-[17px] text-white/80 leading-relaxed mb-4">
              Standard Mealy machines assume transitions execute instantaneously and ignore the physical passage of continuous real time.
            </p>

            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2.5 text-[16px] text-white/85">
              <div className="font-bold text-white flex items-center gap-2">
                <span>⚠️ Real software fundamentally depends on timeouts:</span>
              </div>
              <div className="text-[#ffaa00] font-mono text-[15px] font-bold">• TCP retransmission &amp; ACK timeouts</div>
              <div className="text-[#ffaa00] font-mono text-[15px] font-bold">• Heartbeat keep-alives in distributed consensus</div>
              <div className="text-[#ffaa00] font-mono text-[15px] font-bold">• Hardware watchdog resets in embedded automotive ECUs</div>
            </div>
          </div>

          <div className="p-7 rounded-3xl bg-[#0d0e17] border border-[#ffaa00]/40 shadow-xl">
            <div className="font-bold text-white flex items-center gap-2.5 mb-2 text-[19px]">
              <Activity className="w-6 h-6 text-[#ffaa00]" />
              <span>Theoretical Breakthrough:</span>
            </div>
            <p className="text-[17px] text-white/80 leading-relaxed">
              Provides the <strong className="text-[#ffaa00]">first polynomial-time active learning algorithm</strong> that systematically recovers both discrete internal state transitions and continuous timer thresholds!
            </p>
          </div>

        </div>

        {/* RIGHT COLUMN: The Timed Transition Anatomy & Domains (7 cols) */}
        <div className="col-span-7 p-8 rounded-3xl bg-[#0d0e17] border-2 border-white/20 flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-4">
              <span className="text-[16px] font-mono uppercase text-[#ffaa00] tracking-wider font-bold">
                Anatomy of a Timed Transition
              </span>
              <span className="text-sm font-mono text-[#00f2fe] font-bold px-3 py-1 rounded-full bg-[#00f2fe]/10 border border-[#00f2fe]/30">
                Timed Mealy Machine (TMM)
              </span>
            </div>

            {/* Timed Guard Expression Box */}
            <div className="p-6 rounded-2xl bg-[#08080d] border border-[#ffaa00]/30 font-mono text-[17px] shadow-inner space-y-3 mb-5">
              <div className="text-white/50 text-[14px]">// Continuous Clock Guard & Reset Transition:</div>
              <div className="text-white font-bold p-3 rounded-xl bg-white/5 border border-white/10">
                q₀ ──( <span className="text-[#38ef7d]">Input</span> [ <span className="text-[#ffaa00] font-black">timer &gt; 500ms</span> ] / <span className="text-[#00f2fe]">Output</span>, <span className="text-purple-400 font-bold">reset(timer)</span> )──► q₁
              </div>
              <div className="p-3 rounded-xl bg-white/[0.04] text-[15px] font-sans text-white/80 leading-snug">
                🚨 <strong className="text-white">Autonomous Spontaneous Transitions:</strong> The automaton can fire without external stimulus if continuous time exceeds threshold before user action arrives!
              </div>
            </div>

            {/* Industrial Applications */}
            <div className="grid grid-cols-2 gap-4 text-[16px]">
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-3">
                <Radio className="w-6 h-6 text-[#00f2fe] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white text-[18px] block mb-1">Automotive & CAN Bus</strong>
                  <span className="text-white/70 text-[15px] leading-snug block">
                    Validates millisecond timing constraints in anti-lock braking (ABS) and steer-by-wire cyber-physical networks.
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-3">
                <Cpu className="w-6 h-6 text-[#ffaa00] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white text-[18px] block mb-1">Medical IoT Devices</strong>
                  <span className="text-white/70 text-[15px] leading-snug block">
                    Pacemakers and insulin infusion pumps where delayed output is a life-critical safety hazard.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 text-[15px] text-white/70 flex items-center justify-between font-mono">
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
