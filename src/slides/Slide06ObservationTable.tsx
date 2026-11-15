import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Table, CheckCircle2, Sparkles, Database, ArrowRight, Eye, RefreshCw, Cpu, Play } from 'lucide-react';
import { presentationEase } from '@/lib/presentationMotion';
import { presentationSound } from '@/lib/presentationSound';

export const Slide06ObservationTable: React.FC = () => {
  // Step 0: Initial state q0 appears with its loop
  // Step 1: Input 'b' discovers new state q1 + transition arrow
  // Step 2: Transitions validated & full machine complete
  const [animStage, setAnimStage] = useState<number>(0);
  const [activeRow, setActiveRow] = useState<'q0' | 'q1' | 'loop0' | 'loop1' | null>(null);

  // Auto-play the dynamic graph birth upon slide appearance!
  useEffect(() => {
    setAnimStage(0);
    const t1 = setTimeout(() => {
      presentationSound.play("counterTick", 0.7);
      setAnimStage(1);
    }, 600); // 600ms: State q0 emerges

    const t2 = setTimeout(() => {
      presentationSound.play("warpComplete", 0.8);
      setAnimStage(2);
    }, 1800); // 1800ms: State q1 emerges with transition b/1

    const t3 = setTimeout(() => {
      presentationSound.play("pillDrop", 0.9);
      setAnimStage(3);
    }, 3000); // 3000ms: Full graph complete with closedness/consistency verified!

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const replayBirth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAnimStage(0);
    presentationSound.play("click", 0.6);
    setTimeout(() => setAnimStage(1), 300);
    setTimeout(() => setAnimStage(2), 1500);
    setTimeout(() => setAnimStage(3), 2700);
  };

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
        <h2 className="text-[52px] font-black text-white tracking-tight leading-tight">
          Inside the Engine: The Observation Table
        </h2>
        <p className="text-white/75 text-[20px] mt-1 font-light max-w-[1550px]">
          Watch how each row's <strong className="text-[#00f2fe]">test signature [e₁, e₂]</strong> mathematically proves state existence and dynamically births the reactive Mealy state machine.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 2. GRAND 2-COLUMN VIEW: Interactive Table (Left) + Live Machine (Right) */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-12 gap-8 my-auto z-10 w-full max-w-[1760px] items-stretch">
        
        {/* LEFT COLUMN: The Interactive Detective Table Matrix (5 cols) */}
        <div className="col-span-5 p-7 rounded-3xl bg-[#0d0e17] border-2 border-white/15 flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2.5">
                <Database className="w-5 h-5 text-[#38ef7d]" />
                <span className="text-[17px] font-bold text-white font-mono">
                  Observation Table <span className="text-[#38ef7d]">T = (S, Σ, E)</span>
                </span>
              </div>
              <span className="text-[12px] font-mono text-white/50 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                Click row to inspect ➔
              </span>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#08080d]/90 shadow-inner">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/[0.06] border-b border-white/15 text-white/90 text-[15px] font-mono">
                    <th className="p-3.5 pl-4 font-black text-white/80">Prefix (S)</th>
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
                      activeRow === 'q0' || animStage === 1
                        ? 'bg-[#00f2fe]/15 shadow-[inset_0_0_20px_rgba(0,242,254,0.2)]' 
                        : 'hover:bg-white/[0.04]'
                    }`}
                  >
                    <td className="p-3.5 pl-4 font-black text-white flex items-center gap-2.5">
                      <span className="w-3.5 h-3.5 rounded-full bg-[#00f2fe] shadow-[0_0_10px_#00f2fe]" />
                      <span>ε (Start)</span>
                    </td>
                    <td className="p-3.5 border-l border-white/15 text-[#00f2fe] font-black text-center text-[18px]">0</td>
                    <td className="p-3.5 border-l border-white/15 text-amber-400 font-black text-center text-[18px]">1</td>
                    <td className="p-3.5 border-l border-white/15 text-center">
                      <span className="px-2.5 py-1 rounded-lg bg-[#00f2fe]/15 border border-[#00f2fe]/40 text-[#00f2fe] font-bold text-[13px]">
                        [ 0, 1 ] ➔ q₀
                      </span>
                    </td>
                  </tr>

                  <tr 
                    onClick={() => selectRow('q1')}
                    className={`border-b border-white/15 bg-white/[0.02] cursor-pointer transition ${
                      activeRow === 'q1' || animStage === 2
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
                      <span className="px-2.5 py-1 rounded-lg bg-[#f59e0b]/15 border border-[#f59e0b]/40 text-[#f59e0b] font-bold text-[13px]">
                        [ 1, 0 ] ➔ q₁
                      </span>
                    </td>
                  </tr>

                  {/* Transition Frontier (S . Sigma) */}
                  <tr className="bg-red-500/15 border-b border-white/15">
                    <td colSpan={4} className="py-2 px-4 text-[12px] uppercase tracking-wider text-red-300 font-mono font-bold">
                      ▼ TRANSITION FRONTIER (S · Σ) — VALIDATING ARROWS
                    </td>
                  </tr>

                  <tr 
                    onClick={() => selectRow('loop0')}
                    className={`border-b border-white/10 cursor-pointer transition ${
                      activeRow === 'loop0' || animStage === 1
                        ? 'bg-[#00f2fe]/15 shadow-[inset_0_0_20px_rgba(0,242,254,0.2)]' 
                        : 'hover:bg-white/[0.04]'
                    }`}
                  >
                    <td className="p-3.5 pl-4 text-white/90 font-bold flex items-center gap-1.5">
                      <span className="text-[#00f2fe] font-black">a</span>
                      <span className="text-white/40 text-[11px]">(from q₀)</span>
                    </td>
                    <td className="p-3.5 border-l border-white/15 text-[#00f2fe] font-black text-center text-[18px]">0</td>
                    <td className="p-3.5 border-l border-white/15 text-amber-400 font-black text-center text-[18px]">1</td>
                    <td className="p-3.5 border-l border-white/15 text-center">
                      <span className="px-2 py-0.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-[#38ef7d] font-bold text-[12px]">
                        [0, 1] ➔ Loop q₀
                      </span>
                    </td>
                  </tr>

                  <tr 
                    onClick={() => selectRow('loop1')}
                    className={`cursor-pointer transition ${
                      activeRow === 'loop1' || animStage >= 3
                        ? 'bg-[#f59e0b]/15 shadow-[inset_0_0_20px_rgba(245,158,11,0.2)]' 
                        : 'hover:bg-white/[0.04]'
                    }`}
                  >
                    <td className="p-3.5 pl-4 text-white/90 font-bold flex items-center gap-1.5">
                      <span className="text-[#f59e0b] font-black">b · a</span>
                      <span className="text-white/40 text-[11px]">(from q₁)</span>
                    </td>
                    <td className="p-3.5 border-l border-white/15 text-amber-400 font-black text-center text-[18px]">1</td>
                    <td className="p-3.5 border-l border-white/15 text-[#00f2fe] font-black text-center text-[18px]">0</td>
                    <td className="p-3.5 border-l border-white/15 text-center">
                      <span className="px-2 py-0.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-[#38ef7d] font-bold text-[12px]">
                        [1, 0] ➔ Stays q₁
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Invariant Rule Notes */}
            <div className="mt-4 p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-[13.5px] text-white/80 font-mono space-y-1">
              <div><strong className="text-[#38ef7d]">Closedness:</strong> Every lower row matches an existing state signature.</div>
              <div><strong className="text-[#00f2fe]">Consistency:</strong> Matching states never split upon receiving the same input.</div>
            </div>
          </div>

          {/* Invariant Status Badges */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="px-3.5 py-1 rounded-full bg-[#38ef7d]/15 border border-[#38ef7d]/40 text-[#38ef7d] font-mono font-bold text-[13px]">
              ✓ Status: CLOSED & CONSISTENT
            </span>
            <span className="text-white/50 text-xs font-mono">
              Hypothesis Complete
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: Grand Live Graphical State Machine Diagram (7 cols) */}
        <div className="col-span-7 p-8 rounded-3xl bg-[#0d0e17] border-2 border-[#38ef7d]/40 shadow-2xl flex flex-col justify-between relative overflow-hidden">
          
          <div>
            <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-4">
              <div className="flex items-center gap-3">
                <Cpu className="w-6 h-6 text-[#00f2fe]" />
                <span className="text-[20px] font-bold text-white font-mono">
                  Live Automaton Synthesis <span className="text-[#38ef7d]">ℳ(T)</span>
                </span>
              </div>

              <button
                onClick={replayBirth}
                className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-[13px] font-bold flex items-center gap-2 transition cursor-pointer border border-white/20 shadow-sm"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#38ef7d]" />
                <span>Replay Graph Birth</span>
              </button>
            </div>

            {/* ENLARGED Live Interactive Automaton Canvas */}
            <div className="relative w-full h-[450px] bg-[#05060a] rounded-2xl border-2 border-white/10 flex items-center justify-center p-6 shadow-inner overflow-hidden">
              
              <svg className="w-full h-full" viewBox="0 0 800 380" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <marker id="arrowhead" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto">
                    <polygon points="0 0, 7 3.5, 0 7" fill="#38ef7d" />
                  </marker>
                  <marker id="arrowhead-cyan" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto">
                    <polygon points="0 0, 7 3.5, 0 7" fill="#00f2fe" />
                  </marker>
                  <marker id="arrowhead-amber" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto">
                    <polygon points="0 0, 7 3.5, 0 7" fill="#f59e0b" />
                  </marker>
                  <filter id="glowq0">
                    <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="#00f2fe" floodOpacity="0.8" />
                  </filter>
                  <filter id="glowq1">
                    <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="#f59e0b" floodOpacity="0.8" />
                  </filter>
                </defs>

                {/* 1. START ARROW: Appears at stage >= 1 */}
                <AnimatePresence>
                  {animStage >= 1 && (
                    <motion.g
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, ease: presentationEase }}
                    >
                      <line x1="50" y1="190" x2="140" y2="190" stroke="#00f2fe" strokeWidth="4" markerEnd="url(#arrowhead-cyan)" />
                      <text x="85" y="172" fill="#00f2fe" fontSize="15" fontWeight="bold" fontFamily="monospace" textAnchor="middle">start</text>
                    </motion.g>
                  )}
                </AnimatePresence>

                {/* 2. STATE NODE q0: Pops up first with spring scale! */}
                <AnimatePresence>
                  {animStage >= 1 && (
                    <motion.g
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="cursor-pointer"
                      onClick={() => selectRow('q0')}
                      style={{ transformOrigin: "210px 190px" }}
                    >
                      <circle
                        cx="210"
                        cy="190"
                        r="64"
                        fill="#0d0e17"
                        stroke="#00f2fe"
                        strokeWidth={activeRow === 'q0' || activeRow === 'loop0' ? '7' : '4.5'}
                        filter="url(#glowq0)"
                      />
                      <text x="210" y="184" fill="#ffffff" fontSize="28" fontWeight="900" fontFamily="monospace" textAnchor="middle">
                        q₀
                      </text>
                      <text x="210" y="210" fill="#00f2fe" fontSize="15" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                        [ 0, 1 ]
                      </text>
                    </motion.g>
                  )}
                </AnimatePresence>

                {/* 3. SELF-LOOP ON q0 (Input a / Output 0): Blooms from q0 */}
                <AnimatePresence>
                  {animStage >= 1 && (
                    <motion.g
                      initial={{ opacity: 0, pathLength: 0 }}
                      animate={{ opacity: 1, pathLength: 1 }}
                      transition={{ duration: 0.6, delay: 0.3, ease: presentationEase }}
                    >
                      <path
                        d="M 190 130 C 145 35, 265 35, 230 130"
                        fill="none"
                        stroke={activeRow === 'loop0' ? '#00f2fe' : 'rgba(0,242,254,0.65)'}
                        strokeWidth={activeRow === 'loop0' ? '6' : '4'}
                        strokeDasharray={activeRow === 'loop0' ? '8 4' : 'none'}
                        markerEnd="url(#arrowhead-cyan)"
                        className={activeRow === 'loop0' ? 'animate-pulse' : ''}
                      />
                      <text x="210" y="32" fill="#00f2fe" fontSize="18" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                        a / 0
                      </text>
                      <text x="210" y="52" fill="rgba(255,255,255,0.7)" fontSize="12" fontFamily="sans-serif" textAnchor="middle">
                        (Row a ➔ Loops q₀)
                      </text>
                    </motion.g>
                  )}
                </AnimatePresence>

                {/* 4. DISCOVERY TRANSITION: q0 ──► q1 (Input b / Output 1) */}
                <AnimatePresence>
                  {animStage >= 2 && (
                    <motion.g
                      initial={{ opacity: 0, pathLength: 0 }}
                      animate={{ opacity: 1, pathLength: 1 }}
                      transition={{ duration: 0.7, ease: presentationEase }}
                    >
                      <path
                        d="M 275 165 C 385 105, 500 105, 595 165"
                        fill="none"
                        stroke={activeRow === 'q1' ? '#f59e0b' : '#38ef7d'}
                        strokeWidth={activeRow === 'q1' ? '6' : '4.5'}
                        markerEnd="url(#arrowhead)"
                        className={activeRow === 'q1' ? 'animate-pulse' : ''}
                      />
                      <text x="440" y="110" fill="#38ef7d" fontSize="19" fontWeight="black" fontFamily="monospace" textAnchor="middle">
                        b / 1
                      </text>
                      <text x="440" y="130" fill="rgba(255,255,255,0.7)" fontSize="12" fontFamily="sans-serif" textAnchor="middle">
                        (Row b ➔ Discovers q₁)
                      </text>
                    </motion.g>
                  )}
                </AnimatePresence>

                {/* 5. STATE NODE q1: Dynamically births when input 'b' arrives! */}
                <AnimatePresence>
                  {animStage >= 2 && (
                    <motion.g
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="cursor-pointer"
                      onClick={() => selectRow('q1')}
                      style={{ transformOrigin: "660px 190px" }}
                    >
                      <circle
                        cx="660"
                        cy="190"
                        r="64"
                        fill="#0d0e17"
                        stroke="#f59e0b"
                        strokeWidth={activeRow === 'q1' || activeRow === 'loop1' ? '7' : '4.5'}
                        filter="url(#glowq1)"
                      />
                      <text x="660" y="184" fill="#ffffff" fontSize="28" fontWeight="900" fontFamily="monospace" textAnchor="middle">
                        q₁
                      </text>
                      <text x="660" y="210" fill="#f59e0b" fontSize="15" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                        [ 1, 0 ]
                      </text>
                    </motion.g>
                  )}
                </AnimatePresence>

                {/* 6. SELF-LOOP ON q1 (Input a / Output 0) */}
                <AnimatePresence>
                  {animStage >= 3 && (
                    <motion.g
                      initial={{ opacity: 0, pathLength: 0 }}
                      animate={{ opacity: 1, pathLength: 1 }}
                      transition={{ duration: 0.6, ease: presentationEase }}
                    >
                      <path
                        d="M 640 130 C 595 35, 715 35, 680 130"
                        fill="none"
                        stroke={activeRow === 'loop1' ? '#f59e0b' : 'rgba(245,158,11,0.65)'}
                        strokeWidth={activeRow === 'loop1' ? '6' : '4'}
                        strokeDasharray={activeRow === 'loop1' ? '8 4' : 'none'}
                        markerEnd="url(#arrowhead-amber)"
                        className={activeRow === 'loop1' ? 'animate-pulse' : ''}
                      />
                      <text x="660" y="32" fill="#f59e0b" fontSize="18" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                        a / 0
                      </text>
                      <text x="660" y="52" fill="rgba(255,255,255,0.7)" fontSize="12" fontFamily="sans-serif" textAnchor="middle">
                        (Row b·a ➔ Stays q₁)
                      </text>
                    </motion.g>
                  )}
                </AnimatePresence>

                {/* 7. RETURN TRANSITION: q1 ──► q0 (Input b / Output 0) */}
                <AnimatePresence>
                  {animStage >= 3 && (
                    <motion.g
                      initial={{ opacity: 0, pathLength: 0 }}
                      animate={{ opacity: 1, pathLength: 1 }}
                      transition={{ duration: 0.7, ease: presentationEase }}
                    >
                      <path
                        d="M 595 215 C 500 275, 385 275, 275 215"
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="4.5"
                        markerEnd="url(#arrowhead-cyan)"
                      />
                      <text x="440" y="275" fill="#38bdf8" fontSize="19" fontWeight="black" fontFamily="monospace" textAnchor="middle">
                        b / 0
                      </text>
                    </motion.g>
                  )}
                </AnimatePresence>

              </svg>

            </div>

            {/* Invariant Explanation Summary */}
            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                <span className="text-[#38ef7d] font-bold block mb-1 font-mono text-[15px]">1. Closedness Invariant</span>
                <span className="text-white/80 text-[14px] leading-snug">
                  Every transition frontier row matches a known profile. All destinations resolved!
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                <span className="text-[#00f2fe] font-bold block mb-1 font-mono text-[15px]">2. Consistency Invariant</span>
                <span className="text-white/80 text-[14px] leading-snug">
                  States with matching signatures never contradict each other upon future stimuli.
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
