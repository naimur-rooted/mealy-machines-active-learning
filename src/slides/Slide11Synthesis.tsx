import React from 'react';
import { motion } from 'framer-motion';
import { Award, Zap, ShieldCheck, Compass, CheckCircle2 } from 'lucide-react';

export const Slide11Synthesis: React.FC = () => {
  return (
    <div className="slide-dark-bg w-[1920px] h-[1080px] px-[80px] pt-[50px] pb-[60px] flex flex-col justify-between relative select-none overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] bg-[#00f2fe]/6 rounded-full blur-[200px] pointer-events-none" />

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 1. HERO HEADER: Docked & High-Impact                                  */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="z-20 flex flex-col">
        <div className="flex items-center gap-2.5 text-[14px] font-semibold tracking-[0.2em] uppercase text-[#00f2fe] font-mono mb-2">
          <Award className="w-4 h-4" />
          <span>SYNTHESIS & ENGINEERING TAKEAWAYS</span>
        </div>
        <h2 className="text-[52px] font-black text-white tracking-tight leading-tight">
          Why Mealy Machines Endure
        </h2>
        <p className="text-white/70 text-[20px] mt-1.5 font-light max-w-[1500px]">
          70 years since George Mealy's seminal 1955 paper: from vacuum-tube circuits to AI-driven cyber-physical verification.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 2. THREE PILLAR CARDS (Large, Bold & Readable)                        */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-3 gap-8 my-auto z-10 w-full max-w-[1760px] items-stretch">
        
        {/* Pillar 1 */}
        <div className="p-8 rounded-3xl bg-[#0d0e17] border-2 border-[#00f2fe]/40 shadow-2xl flex flex-col justify-between hover:border-[#00f2fe]/70 transition">
          <div>
            <div className="w-16 h-16 rounded-2xl bg-[#00f2fe]/10 border border-[#00f2fe]/30 flex items-center justify-center text-[#00f2fe] mb-6 shadow-md">
              <Zap className="w-8 h-8" />
            </div>
            <h3 className="text-[28px] font-black text-white mb-3">
              1. Reactive Expressivity
            </h3>
            <p className="text-[17px] text-white/80 leading-relaxed">
              Associating output directly with the transition <code className="text-[#00f2fe] font-mono font-bold bg-white/10 px-2 py-0.5 rounded">λ(q, a)</code> mirrors the real-world stimulus-response nature of network packets, OS system calls, and digital microcontrollers.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-white/10 text-[16px] text-[#00f2fe] font-bold flex items-center gap-2 font-mono">
            <CheckCircle2 className="w-5 h-5" />
            <span>Minimal states, zero clock latency</span>
          </div>
        </div>

        {/* Pillar 2 */}
        <div className="p-8 rounded-3xl bg-[#0d0e17] border-2 border-[#38ef7d]/40 shadow-2xl flex flex-col justify-between hover:border-[#38ef7d]/70 transition">
          <div>
            <div className="w-16 h-16 rounded-2xl bg-[#38ef7d]/10 border border-[#38ef7d]/30 flex items-center justify-center text-[#38ef7d] mb-6 shadow-md">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-[28px] font-black text-white mb-3">
              2. Gold Standard for Verification
            </h3>
            <p className="text-[17px] text-white/80 leading-relaxed">
              Active model learning (<strong className="text-white">L*, L#</strong>) provides a mathematically sound, reproducible method to reverse-engineer opaque black-box software and exposed real-world zero-day flaws in TLS, SSH, and smartcards.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-white/10 text-[16px] text-[#38ef7d] font-bold flex items-center gap-2 font-mono">
            <CheckCircle2 className="w-5 h-5" />
            <span>Black-box formal guarantees</span>
          </div>
        </div>

        {/* Pillar 3 */}
        <div className="p-8 rounded-3xl bg-[#0d0e17] border-2 border-[#ffaa00]/40 shadow-2xl flex flex-col justify-between hover:border-[#ffaa00]/70 transition">
          <div>
            <div className="w-16 h-16 rounded-2xl bg-[#ffaa00]/10 border border-[#ffaa00]/30 flex items-center justify-center text-[#ffaa00] mb-6 shadow-md">
              <Compass className="w-8 h-8" />
            </div>
            <h3 className="text-[28px] font-black text-white mb-3">
              3. Continuous Evolution
            </h3>
            <p className="text-[17px] text-white/80 leading-relaxed">
              The paradigm is not frozen in 1955. Active algorithms today scale to continuous real-time timers (2024), register automata (data parameters), and probabilistic transitions in modern autonomous systems.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-white/10 text-[16px] text-[#ffaa00] font-bold flex items-center gap-2 font-mono">
            <CheckCircle2 className="w-5 h-5" />
            <span>Living, vital research discipline</span>
          </div>
        </div>

      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 3. DOCKED FOOTER QUOTE                                                */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="z-20 pt-4 border-t border-white/10 flex items-center justify-between text-[16px] text-white/70 font-mono">
        <span>"State machines remain the most natural bridge between mathematical logic and physical computation."</span>
        <span className="font-mono text-white/90 font-bold px-4 py-1 rounded-full bg-white/5 border border-white/15">
          Q.E.D.
        </span>
      </div>
    </div>
  );
};
