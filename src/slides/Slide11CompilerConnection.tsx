import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Workflow,
  Sparkles,
  ArrowRight,
  Minimize2,
  Cpu,
  Layers,
  FileCode,
  CheckCircle2
} from 'lucide-react';

export const Slide11CompilerConnection: React.FC = () => {
  return (
    <div className="slide-dark-bg w-[1920px] h-[1080px] px-[80px] pt-[45px] pb-[55px] flex flex-col justify-between relative select-none overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[650px] bg-[#00f2fe]/8 rounded-full blur-[200px] pointer-events-none" />

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 1. HERO HEADER                                                        */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="z-20 flex flex-col">
        <div className="flex items-center gap-2.5 text-[14px] font-semibold tracking-[0.2em] uppercase text-[#00f2fe] font-mono mb-2">
          <Code2 className="w-4 h-4 text-[#00f2fe]" />
          <span>COURSE INTEGRATION • COMPILER DESIGN &amp; AUTOMATA THEORY</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[50px] font-black text-white tracking-tight leading-tight font-heading">
              The Compiler Design Connection
            </h2>
            <p className="text-white/75 text-[20px] mt-1 font-light max-w-[1400px]">
              How the tools and theorems in our syllabus map directly to active automata learning.
            </p>
          </div>

          <span className="text-xs font-mono px-3.5 py-1.5 rounded-full bg-[#00f2fe]/15 text-[#00f2fe] border border-[#00f2fe]/30 font-bold flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Syllabus Link</span>
          </span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 2. DUAL PIPELINE BANNER: FORWARD vs INVERSE (Ultra Simple Visual)     */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="z-10 w-full max-w-[1760px] mx-auto my-auto flex flex-col gap-8">
        
        {/* Simple 2-Line Pipeline Visual */}
        <div className="p-6 rounded-3xl bg-[#0a0b12] border-2 border-white/15 shadow-2xl flex items-center justify-around font-mono text-[17px]">
          <div className="flex items-center gap-3">
            <span className="text-white/50 text-sm">// Forward Compiler:</span>
            <span className="px-3.5 py-1.5 rounded-xl bg-white/10 text-white font-bold">Source Code</span>
            <ArrowRight className="w-5 h-5 text-cyan-400" />
            <span className="px-3.5 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-bold">Lexer &amp; Parser</span>
            <ArrowRight className="w-5 h-5 text-cyan-400" />
            <span className="px-3.5 py-1.5 rounded-xl bg-white/10 text-white font-bold">Machine Binary</span>
          </div>

          <div className="h-8 w-px bg-white/20" />

          <div className="flex items-center gap-3">
            <span className="text-white/50 text-sm">// Inverse Learner:</span>
            <span className="px-3.5 py-1.5 rounded-xl bg-white/10 text-white font-bold">Opaque Binary</span>
            <ArrowRight className="w-5 h-5 text-emerald-400" />
            <span className="px-3.5 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-bold">Active Learning (L*)</span>
            <ArrowRight className="w-5 h-5 text-emerald-400" />
            <span className="px-3.5 py-1.5 rounded-xl bg-white/10 text-white font-bold">Minimal Automaton</span>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════ */}
        {/* 3. THREE MINIMAL PILLARS (Clean 2–3 Lines Each)                       */}
        {/* ══════════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-3 gap-8 w-full items-stretch">
          
          {/* Pillar 1: Lexical Analyzer */}
          <div className="p-8 rounded-3xl bg-[#0d0e17] border-2 border-[#00f2fe]/40 shadow-2xl flex flex-col justify-between hover:border-[#00f2fe] transition-all">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#00f2fe]/15 border border-[#00f2fe]/40 flex items-center justify-center text-[#00f2fe] mb-5 shadow-lg">
                <FileCode className="w-7 h-7" />
              </div>

              <h3 className="text-[26px] font-black text-white mb-3 font-heading">
                1. The Lexer is a Mealy Machine
              </h3>

              <p className="text-[18px] text-white/80 leading-relaxed font-sans">
                A compiler's scanner reads input characters (<span className="font-mono text-cyan-300">Σ</span>) and emits output tokens (<span className="font-mono text-cyan-300">Δ</span>) on every transition.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-[15px] font-mono text-[#00f2fe] font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>Input: Characters ➔ Output: Tokens</span>
            </div>
          </div>

          {/* Pillar 2: DFA Minimization */}
          <div className="p-8 rounded-3xl bg-[#0d0e17] border-2 border-[#38ef7d]/40 shadow-2xl flex flex-col justify-between hover:border-[#38ef7d] transition-all">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#38ef7d]/15 border border-[#38ef7d]/40 flex items-center justify-center text-[#38ef7d] mb-5 shadow-lg">
                <Minimize2 className="w-7 h-7" />
              </div>

              <h3 className="text-[26px] font-black text-white mb-3 font-heading">
                2. DFA Minimization Theorem
              </h3>

              <p className="text-[18px] text-white/80 leading-relaxed font-sans">
                Compilers merge duplicate states using <strong className="text-white">Myhill-Nerode equivalence</strong>. Our Observation Table uses the exact same math in reverse to find the minimal machine!
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-[15px] font-mono text-[#38ef7d] font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>Same Math: Hopcroft &amp; Myhill-Nerode</span>
            </div>
          </div>

          {/* Pillar 3: Reverse-Engineering Binaries */}
          <div className="p-8 rounded-3xl bg-[#0d0e17] border-2 border-[#ffaa00]/40 shadow-2xl flex flex-col justify-between hover:border-[#ffaa00] transition-all">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#ffaa00]/15 border border-[#ffaa00]/40 flex items-center justify-center text-[#ffaa00] mb-5 shadow-lg">
                <Workflow className="w-7 h-7" />
              </div>

              <h3 className="text-[26px] font-black text-white mb-3 font-heading">
                3. Automated Reverse-Compiler
              </h3>

              <p className="text-[18px] text-white/80 leading-relaxed font-sans">
                While a compiler translates code into opaque machine binary, active automata learning probes the binary to reconstruct its original control-flow logic.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-[15px] font-mono text-[#ffaa00] font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>Reconstructing Control-Flow Without Source</span>
            </div>
          </div>

        </div>

      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 4. DOCKED FOOTER                                                      */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="z-20 pt-4 border-t border-white/10 flex items-center justify-between text-[16px] text-white/70 font-mono">
        <span>Formal Language Theory in Action: Linking Theoretical Automata to Practical Systems</span>
        <span className="font-mono text-white/80">Lexers · Parsers · Automata Synthesis</span>
      </div>
    </div>
  );
};
