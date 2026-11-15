import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Table, CheckCircle2, Sparkles, Database, ArrowRight, Eye, RefreshCw, Cpu } from 'lucide-react';
import { presentationEase } from '@/lib/presentationMotion';
import { presentationSound } from '@/lib/presentationSound';

export const Slide06ObservationTable: React.FC = () => {
  // Interactive selected row to visually bridge Table rows to Automaton nodes/edges
  // null = all visible, 'q0' = row eps, 'q1' = row b, 'loop0' = row a, 'loop1' = row b.a
  const [activeRow, setActiveRow] = useState<'q0' | 'q1' | 'loop0' | 'loop1' | null>(null);

  const selectRow = (rowId: 'q0' | 'q1' | 'loop0' | 'loop1') => {
    presentationSound.play("counterTick", 0.7);
    setActiveRow(current => current === rowId ? null : rowId);
  };

  return (
    <div className="slide-dark-bg w-[1920px] h-[1080px] px-[80px] pt-[45px] pb-[50px] flex flex-col justify-between relative select-none overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-1/4 w-[850px] h-[600px] bg-[#38ef7d]/8 rounded-full blur-[190px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[750px] h-[500px] bg-[#00f2fe]/8 rounded-full blur-[190px] pointer-events-none" />

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 1. HERO HEADER: Docked & High Visibility                              */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="z-20 flex flex-col">
        <div className="flex items-center gap-2.5 text-[14px] font-semibold tracking-[0.2em] uppercase text-[#38ef7d] font-mono mb-1.5">
          <Table className="w-4 h-4" />
          <span>ACT III • HOW DATA TABLES SYNTHESIZE HARDWARE AUTOMATA</span>
        </div>
        <h2 className="text-[50px] font-black text-white tracking-tight leading-tight">
          Inside the Engine: The Observation Table
        </h2>
        <p className="text-white/75 text-[20px] mt-1 font-light max-w-[1550px]">
          Watch how each row's <strong className="text-[#00f2fe]">test signature [e₁, e₂]</strong> mathematically proves state existence and instantly constructs the state machine graph.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 2. GRAND 2-COLUMN VIEW: Interactive Table (Left) + Live Machine (Right) */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-12 gap-8 my-auto z-10 w-full max-w-[1760px] items-stretch">
        
        {/* LEFT COLUMN: The Interactive Detective Table Matrix (6 cols) */}
        <div className="col-span-6 p-7 rounded-3xl bg-[#0d0e17] border-2 border-white/15 flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2.5">
                <Database className="w-5 h-5 text-[#38ef7d]" />
                <span className="text-[17px] font-bold text-white font-mono">
                  Observation Table <span className="text-[#38ef7d]">T = (S, Σ, E)</span>
                </span>
              </div>
              <span className="text-[13px] font-mono text-white/50 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                Click any row to inspect ➔
              </span>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#08080d]/90 shadow-inner">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/[0.06] border-b border-white/15 text-white/90 text-[15px] font-mono">
                    <th className="p-3.5 pl-4 font-black text-white/80">Prefix / Candidate</th>
                    <th className="p-3.5 border-l border-white/15 text-[#38ef7d] font-black text-center">e₁: a</th>
                    <th className="p-3.5 border-l border-white/15 text-[#38ef7d] font-black text-center">e₂: b</th>
                    <th className="p-3.5 border-l border-white/15 text-white/90 font-mono text-center">Signature</th>
                  </tr>
                </thead>
                <tbody className="text-[16px] font-mono">
                  
                  {/* S Rows (Identified states) */}
                  <tr 
                    onClick={() => selectRow('q0')}
                    className={`border-b border-white/10 cursor-pointer transition ${
                      activeRow === 'q0' 
                        ? 'bg-[#00f2fe]/15 shadow-[inset_0_0_20px_rgba(0,242,254,0.2)]' 
                        : 'hover:bg-white/[0.04]'
                    }`}
                  >
                    <td className="p-3.5 pl-4 font-black text-white flex items-center gap-2.5">
                      <span className="w-3.5 h-3.5 rounded-full bg-[#00f2fe] shadow-[0_0_10px_#00f2fe]" />
                      <span>ε (Initial)</span>
                    </td>
                    <td className="p-3.5 border-l border-white/15 text-[#00f2fe] font-black text-center text-[18px]">0</td>
                    <td className="p-3.5 border-l border-white/15 text-amber-400 font-black text-center text-[18px]">1</td>
                    <td className="p-3.5 border-l border-white/15 text-center">
                      <span className="px-3 py-1 rounded-lg bg-[#00f2fe]/15 border border-[#00f2fe]/40 text-[#00f2fe] font-bold text-[14px]">
                        [ 0, 1 ] ──► State q₀
                      </span>
                    </td>
                  </tr>

                  <tr 
                    onClick={() => selectRow('q1')}
                    className={`border-b border-white/15 bg-white/[0.02] cursor-pointer transition ${
                      activeRow === 'q1' 
                        ? 'bg-[#f59e0b]/15 shadow-[inset_0_0_20px_rgba(245,158,11,0.2)]' 
                        : 'hover:bg-white/[0.05]'
                    }`}
                  >
                    <td className="p-3.5 pl-4 font-black text-white flex items-center gap-2.5">
                      <span className="w-3.5 h-3.5 rounded-full bg-[#f59e0b] shadow-[0_0_10px_#f59e0b]" />
                      <span>b (Input b)</span>
                    </td>
                    <td className="p-3.5 border-l border-white/15 text-amber-400 font-black text-center text-[18px]">1</td>
                    <td className="p-3.5 border-l border-white/15 text-[#00f2fe] font-black text-center text-[18px]">0</td>
                    <td className="p-3.5 border-l border-white/15 text-center">
                      <span className="px-3 py-1 rounded-lg bg-[#f59e0b]/15 border border-[#f59e0b]/40 text-[#f59e0b] font-bold text-[14px]">
                        [ 1, 0 ] ──► State q₁
                      </span>
                    </td>
                  </tr>

                  {/* Transition Frontier (S . Sigma) */}
                  <tr className="bg-red-500/15 border-b border-white/15">
                    <td colSpan={4} className="py-2 px-4 text-[12px] uppercase tracking-wider text-red-300 font-mono font-bold">
                      ▼ TRANSITION FRONTIER (S · Σ) — WHERE DO TRANSITIONS LEAD?
                    </td>
                  </tr>

                  <tr 
                    onClick={() => selectRow('loop0')}
                    className={`border-b border-white/10 cursor-pointer transition ${
                      activeRow === 'loop0' 
                        ? 'bg-[#00f2fe]/15 shadow-[inset_0_0_20px_rgba(0,242,254,0.2)]' 
                        : 'hover:bg-white/[0.04]'
                    }`}
                  >
                    <td className="p-3.5 pl-4 text-white/90 font-bold flex items-center gap-2">
                      <span className="text-[#00f2fe] font-black">a</span>
                      <span className="text-white/40 text-xs">(from q₀)</span>
                    </td>
                    <td className="p-3.5 border-l border-white/15 text-[#00f2fe] font-black text-center text-[18px]">0</td>
                    <td className="p-3.5 border-l border-white/15 text-amber-400 font-black text-center text-[18px]">1</td>
                    <td className="p-3.5 border-l border-white/15 text-center">
                      <span className="px-3 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-[#38ef7d] font-bold text-[14px]">
                        Matches [0, 1] ──► Loop q₀
                      </span>
                    </td>
                  </tr>

                  <tr 
                    onClick={() => selectRow('loop1')}
                    className={`cursor-pointer transition ${
                      activeRow === 'loop1' 
                        ? 'bg-[#f59e0b]/15 shadow-[inset_0_0_20px_rgba(245,158,11,0.2)]' 
                        : 'hover:bg-white/[0.04]'
                    }`}
                  >
                    <td className="p-3.5 pl-4 text-white/90 font-bold flex items-center gap-2">
                      <span className="text-[#f59e0b] font-black">b · a</span>
                      <span className="text-white/40 text-xs">(from q₁)</span>
                    </td>
                    <td className="p-3.5 border-l border-white/15 text-amber-400 font-black text-center text-[18px]">1</td>
                    <td className="p-3.5 border-l border-white/15 text-[#00f2fe] font-black text-center text-[18px]">0</td>
                    <td className="p-3.5 border-l border-white/15 text-center">
                      <span className="px-3 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-[#38ef7d] font-bold text-[14px]">
                        Matches [1, 0] ──► Stay at q₁
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Quick Helper Note */}
            <div className="mt-4 p-3 rounded-xl bg-white/[0.03] border border-white/10 text-[14px] text-white/70 font-mono flex items-center justify-between">
              <span>Different Signatures = New State Discovered. Identical Signatures = State Equivalence.</span>
            </div>
          </div>

          {/* Invariant Status Badges */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#38ef7d] font-mono text-[14px] font-bold">
              <CheckCircle2 className="w-5 h-5" />
              <span>Closed: All Frontier Rows Match S</span>
            </div>
            <div className="flex items-center gap-2 text-[#00f2fe] font-mono text-[14px] font-bold">
              <Sparkles className="w-5 h-5" />
              <span>Consistent: No State Ambiguity</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Live Graphical State Machine Diagram Synthesizer (6 cols) */}
        <div className="col-span-6 p-7 rounded-3xl bg-[#0d0e17] border-2 border-[#38ef7d]/40 shadow-2xl flex flex-col justify-between relative overflow-hidden">
          
          <div>
            <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2.5">
                <Cpu className="w-5 h-5 text-[#00f2fe]" />
                <span className="text-[17px] font-bold text-white font-mono">
                  Live Synthesized Automaton <span className="text-[#38ef7d]">ℳ(T)</span>
                </span>
              </div>
              <span className="px-3.5 py-1 rounded-full bg-[#38ef7d]/15 border border-[#38ef7d]/30 text-[#38ef7d] font-mono font-bold text-[13px]">
                Polynomial Extraction
              </span>
            </div>

            {/* Live Interactive Automaton Canvas */}
            <div className="relative w-full h-[360px] bg-[#05060a] rounded-2xl border border-white/10 flex items-center justify-center p-6 shadow-inner">
              
              <svg className="w-full h-full" viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="edgeGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00f2fe" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                  <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                    <polygon points="0 0, 6 3, 0 6" fill="#38ef7d" />
                  </marker>
                  <marker id="arrowhead-cyan" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                    <polygon points="0 0, 6 3, 0 6" fill="#00f2fe" />
                  </marker>
                  <marker id="arrowhead-amber" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                    <polygon points="0 0, 6 3, 0 6" fill="#f59e0b" />
                  </marker>
                </defs>

                {/* Initial Entry Arrow into q0 */}
                <line x1="60" y1="160" x2="140" y2="160" stroke="#00f2fe" strokeWidth="3" markerEnd="url(#arrowhead-cyan)" />
                <text x="95" y="145" fill="#00f2fe" fontSize="13" fontWeight="bold" fontFamily="monospace" textAnchor="middle">start</text>

                {/* Self Loop on q0 (Triggered by input 'a', produces output '0') */}
                <path
                  d="M 180 115 C 150 40, 230 40, 205 115"
                  fill="none"
                  stroke={activeRow === 'loop0' ? '#00f2fe' : 'rgba(0,242,254,0.5)'}
                  strokeWidth={activeRow === 'loop0' ? '5' : '3'}
                  strokeDasharray={activeRow === 'loop0' ? '6 4' : 'none'}
                  markerEnd="url(#arrowhead-cyan)"
                  className={activeRow === 'loop0' ? 'animate-pulse' : ''}
                />
                <text x="195" y="35" fill="#00f2fe" fontSize="15" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                  a / 0
                </text>
                <text x="195" y="52" fill="rgba(255,255,255,0.6)" fontSize="11" fontFamily="sans-serif" textAnchor="middle">
                  (Row a ➔ Loops q₀)
                </text>

                {/* Transition Forward from q0 to q1 (Input 'b', output '1') */}
                <path
                  d="M 245 140 C 340 90, 410 90, 500 140"
                  fill="none"
                  stroke={activeRow === 'q1' ? '#f59e0b' : '#38ef7d'}
                  strokeWidth={activeRow === 'q1' ? '5' : '3.5'}
                  markerEnd="url(#arrowhead)"
                  className={activeRow === 'q1' ? 'animate-pulse' : ''}
                />
                <text x="375" y="95" fill="#38ef7d" fontSize="16" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                  b / 1
                </text>
                <text x="375" y="112" fill="rgba(255,255,255,0.6)" fontSize="11" fontFamily="sans-serif" textAnchor="middle">
                  (Row b ➔ Discovers q₁)
                </text>

                {/* Self Loop on q1 (Triggered by input 'a', produces output '0') */}
                <path
                  d="M 540 115 C 510 40, 590 40, 565 115"
                  fill="none"
                  stroke={activeRow === 'loop1' ? '#f59e0b' : 'rgba(245,158,11,0.5)'}
                  strokeWidth={activeRow === 'loop1' ? '5' : '3'}
                  strokeDasharray={activeRow === 'loop1' ? '6 4' : 'none'}
                  markerEnd="url(#arrowhead-amber)"
                  className={activeRow === 'loop1' ? 'animate-pulse' : ''}
                />
                <text x="555" y="35" fill="#f59e0b" fontSize="15" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                  a / 0
                </text>
                <text x="555" y="52" fill="rgba(255,255,255,0.6)" fontSize="11" fontFamily="sans-serif" textAnchor="middle">
                  (Row b·a ➔ Stays q₁)
                </text>

                {/* Transition Backward from q1 to q0 (Input 'b', output '0') */}
                <path
                  d="M 500 180 C 410 230, 340 230, 245 180"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="3.5"
                  markerEnd="url(#arrowhead-cyan)"
                />
                <text x="375" y="240" fill="#38bdf8" fontSize="16" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                  b / 0
                </text>

                {/* State Node q0 (Circle) */}
                <g className="cursor-pointer" onClick={() => selectRow('q0')}>
                  <circle
                    cx="195"
                    cy="160"
                    r="52"
                    fill="#0d0e17"
                    stroke="#00f2fe"
                    strokeWidth={activeRow === 'q0' || activeRow === 'loop0' ? '6' : '3.5'}
                    filter={activeRow === 'q0' || activeRow === 'loop0' ? 'drop-shadow(0px 0px 18px rgba(0,242,254,0.8))' : 'none'}
                  />
                  <text x="195" y="155" fill="#ffffff" fontSize="24" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    q₀
                  </text>
                  <text x="195" y="178" fill="#00f2fe" fontSize="13" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    [ 0, 1 ]
                  </text>
                </g>

                {/* State Node q1 (Circle) */}
                <g className="cursor-pointer" onClick={() => selectRow('q1')}>
                  <circle
                    cx="555"
                    cy="160"
                    r="52"
                    fill="#0d0e17"
                    stroke="#f59e0b"
                    strokeWidth={activeRow === 'q1' || activeRow === 'loop1' ? '6' : '3.5'}
                    filter={activeRow === 'q1' || activeRow === 'loop1' ? 'drop-shadow(0px 0px 18px rgba(245,158,11,0.8))' : 'none'}
                  />
                  <text x="555" y="155" fill="#ffffff" fontSize="24" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    q₁
                  </text>
                  <text x="555" y="178" fill="#f59e0b" fontSize="13" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    [ 1, 0 ]
                  </text>
                </g>
              </svg>

            </div>

            {/* Invariant Explanation Summary */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                <span className="text-[#38ef7d] font-bold block mb-1 font-mono text-[15px]">1. Closedness Invariant</span>
                <span className="text-white/80 text-[14px] leading-snug">
                  Every frontier transition leads to a known state profile. Zero undefined destinations.
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                <span className="text-[#00f2fe] font-bold block mb-1 font-mono text-[15px]">2. Consistency Invariant</span>
                <span className="text-white/80 text-[14px] leading-snug">
                  States with identical profiles never contradict each other upon receiving new inputs.
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 text-[14px] text-white/70 flex items-center justify-between font-mono">
            <span>Result: Minimal deterministic Mealy machine guaranteed by Myhill-Nerode Theorem.</span>
            <span className="text-[#38ef7d] font-bold">100% Extracted</span>
          </div>
        </div>

      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 3. DOCKED FOOTER                                                      */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="z-20 pt-3 border-t border-white/10 flex items-center justify-between text-[15px] text-white/70 font-mono">
        <span>Angluin (1987) &amp; Vaandrager (2017) • Model Learning Foundations</span>
        <span className="text-[#38ef7d] font-bold px-4 py-1 rounded-full bg-[#38ef7d]/10 border border-[#38ef7d]/30">
          Hypothesis M(T) Synthesized
        </span>
      </div>
    </div>
  );
};
