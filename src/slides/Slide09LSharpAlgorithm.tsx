import React from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Zap, Sparkles, TrendingUp, Layers, ArrowRight } from 'lucide-react';

export const Slide09LSharpAlgorithm: React.FC = () => {
  return (
    <div className="slide-dark-bg w-[1920px] h-[1080px] px-[80px] pt-[50px] pb-[60px] flex flex-col justify-between relative select-none overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-1/4 w-[800px] h-[600px] bg-[#00f2fe]/8 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[700px] h-[500px] bg-[#38ef7d]/6 rounded-full blur-[180px] pointer-events-none" />

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 1. HERO HEADER: Docked & High-Impact                                  */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="z-20 flex flex-col">
        <div className="flex items-center gap-2.5 text-[14px] font-semibold tracking-[0.2em] uppercase text-[#00f2fe] font-mono mb-2">
          <Sparkles className="w-4 h-4" />
          <span>ACT V • CUTTING-EDGE ACTIVE LEARNING FRONTIERS</span>
        </div>
        <h2 className="text-[52px] font-black text-white tracking-tight leading-tight">
          Beyond L*: The L# (L-Sharp) Algorithm
        </h2>
        <p className="text-white/70 text-[20px] mt-1.5 font-light max-w-[1500px]">
          F. Vaandrager, B. Garhewal, J. Jurrjens et al. (TACAS / Springer Nature 2022).
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 2. GRAND 2-COLUMN VIEW                                                */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-12 gap-8 my-auto z-10 w-full max-w-[1760px] items-stretch">
        
        {/* LEFT COLUMN: Why Classic L* Exploded (5 cols) */}
        <div className="col-span-5 flex flex-col justify-between gap-6">
          
          <div className="p-8 rounded-3xl bg-[#0d0e17] border-2 border-red-500/40 shadow-2xl relative overflow-hidden">
            <div className="text-[15px] font-mono uppercase tracking-wider text-red-400 font-bold mb-2">
              The Fundamental Bottleneck in Angluin L*
            </div>
            <h3 className="text-[32px] font-black text-white leading-tight mb-3">
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
                <span><strong className="text-white">Quadratic Query Blowup:</strong> Membership queries scale quadratic in counterexample lengths ($O(m^2)$).</span>
              </div>
            </div>
          </div>

          <div className="p-7 rounded-3xl bg-[#0d0e17] border border-[#00f2fe]/40 shadow-xl">
            <div className="font-bold text-white flex items-center gap-2.5 mb-2 text-[19px]">
              <TrendingUp className="w-6 h-6 text-[#00f2fe]" />
              <span>Benchmark Breakthrough:</span>
            </div>
            <p className="text-[17px] text-white/80 leading-relaxed">
              L# consistently requires up to an <strong className="text-[#00f2fe]">order of magnitude fewer membership queries</strong> on standard industrial state machine benchmarks.
            </p>
          </div>

        </div>

        {/* RIGHT COLUMN: The 3 Core L# Innovations (7 cols) */}
        <div className="col-span-7 p-8 rounded-3xl bg-[#0d0e17] border-2 border-white/20 flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-4">
              <span className="text-[16px] font-mono uppercase text-[#00f2fe] tracking-wider font-bold">
                Core Innovations in the L# Active Learning Engine
              </span>
              <span className="text-sm font-mono text-[#38ef7d] font-bold px-3 py-1 rounded-full bg-[#38ef7d]/10 border border-[#38ef7d]/30">
                TACAS Best Paper
              </span>
            </div>

            <div className="space-y-4">
              {/* Innovation 1 */}
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-4">
                <GitBranch className="w-7 h-7 text-[#00f2fe] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[20px] font-bold text-white">1. Observation Trees (Tries) Instead of Tables</div>
                  <div className="text-[16px] text-white/75 mt-1 leading-snug">
                    Stores all known query traces inside a prefix observation tree. Never re-queries known paths and handles incomplete observation data without forced table padding.
                  </div>
                </div>
              </div>

              {/* Innovation 2 */}
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-4">
                <Zap className="w-7 h-7 text-[#38ef7d] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[20px] font-bold text-white">2. Lazy State Isolation</div>
                  <div className="text-[16px] text-white/75 mt-1 leading-snug">
                    Rather than globally separating every state candidate simultaneously across all experiments, L# isolates candidate states locally on-demand only when a concrete inconsistency is encountered.
                  </div>
                </div>
              </div>

              {/* Innovation 3 */}
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-4">
                <Layers className="w-7 h-7 text-[#ffaa00] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[20px] font-bold text-white">3. Optimal Counterexample Processing</div>
                  <div className="text-[16px] text-white/75 mt-1 leading-snug">
                    Directly incorporates long counterexamples into the observation tree without prematurely blowing up the candidate state count, preserving polynomial guarantees.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 text-[15px] text-white/70 flex items-center justify-between font-mono">
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
