import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Table, CheckCircle2, Sparkles, Database, ArrowRight, ShieldCheck } from 'lucide-react';
import { presentationEase } from '@/lib/presentationMotion';

export const Slide06ObservationTable: React.FC = () => {
  return (
    <div className="slide-dark-bg w-[1920px] h-[1080px] px-[80px] pt-[50px] pb-[60px] flex flex-col justify-between relative select-none overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-1/4 w-[750px] h-[550px] bg-[#38ef7d]/8 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[650px] h-[450px] bg-[#00f2fe]/8 rounded-full blur-[180px] pointer-events-none" />

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 1. HERO HEADER: Docked & Bold (Ubuntu)                                */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="z-20 flex flex-col">
        <div className="flex items-center gap-2.5 text-[14px] font-semibold tracking-[0.2em] uppercase text-[#38ef7d] font-mono mb-2">
          <Table className="w-4 h-4" />
          <span>ACT III • LEARNING DATA STRUCTURE & INVARIANTS</span>
        </div>
        <h2 className="text-[52px] font-black text-white tracking-tight leading-tight">
          Inside the Engine: The Observation Table
        </h2>
        <p className="text-white/70 text-[20px] mt-1.5 font-light max-w-[1500px]">
          Organizing prefix candidate states <code className="text-[#00f2fe] font-mono font-bold">(S)</code> and suffix distinguishing experiments <code className="text-[#38ef7d] font-mono font-bold">(E)</code> to systematically extract minimal state machines.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 2. GRAND 2-COLUMN VIEW: Table (7 cols) + Invariants (5 cols)           */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-12 gap-8 my-auto z-10 w-full max-w-[1760px] items-stretch">
        
        {/* LEFT COLUMN: The Interactive Observation Table Matrix */}
        <div className="col-span-7 p-7 rounded-3xl bg-[#0d0e17] border-2 border-white/15 flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2.5">
                <Database className="w-5 h-5 text-[#38ef7d]" />
                <span className="text-[17px] font-bold text-white font-mono">
                  Observation Table <span className="text-[#38ef7d]">T = (S, Σ, E)</span>
                </span>
              </div>
              <div className="px-3.5 py-1 rounded-full bg-[#00f2fe]/10 border border-[#00f2fe]/30 text-[#00f2fe] font-mono text-[14px] font-bold">
                Input Alphabet Σ = {'{a, b}'}
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#08080d]/90 shadow-inner">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/[0.06] border-b border-white/15 text-white/90 text-[16px] font-mono">
                    <th className="p-3.5 pl-5 font-black text-[#00f2fe]">Prefix / State (S)</th>
                    <th className="p-3.5 border-l border-white/15 text-[#38ef7d] font-black text-center">e₁ = a</th>
                    <th className="p-3.5 border-l border-white/15 text-[#38ef7d] font-black text-center">e₂ = b</th>
                    <th className="p-3.5 border-l border-white/15 text-white/80 font-sans font-bold">Semantic Meaning</th>
                  </tr>
                </thead>
                <tbody className="text-[16px] font-mono">
                  {/* S Rows (Identified states) */}
                  <tr className="border-b border-white/10 hover:bg-white/[0.04] transition">
                    <td className="p-3.5 pl-5 font-black text-white flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#00f2fe]" />
                      <span>ε (empty string)</span>
                    </td>
                    <td className="p-3.5 border-l border-white/15 text-emerald-400 font-black text-center text-[18px]">0</td>
                    <td className="p-3.5 border-l border-white/15 text-amber-400 font-black text-center text-[18px]">1</td>
                    <td className="p-3.5 border-l border-white/15 text-white/90 font-sans text-[15px] font-medium">Initial State q₀</td>
                  </tr>
                  <tr className="border-b border-white/15 bg-white/[0.02] hover:bg-white/[0.05] transition">
                    <td className="p-3.5 pl-5 font-black text-white flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#38ef7d]" />
                      <span>b</span>
                    </td>
                    <td className="p-3.5 border-l border-white/15 text-amber-400 font-black text-center text-[18px]">1</td>
                    <td className="p-3.5 border-l border-white/15 text-emerald-400 font-black text-center text-[18px]">0</td>
                    <td className="p-3.5 border-l border-white/15 text-white/90 font-sans text-[15px] font-medium">Distinct State q₁</td>
                  </tr>

                  {/* S . Sigma Boundary Rows */}
                  <tr className="bg-red-500/15 border-b border-white/15">
                    <td colSpan={4} className="py-2 px-5 text-[13px] uppercase tracking-wider text-red-300 font-mono font-bold">
                      ▼ Transition Frontier (S · Σ) — Validated by Experiments
                    </td>
                  </tr>
                  <tr className="border-b border-white/10 hover:bg-white/[0.04] transition">
                    <td className="p-3.5 pl-5 text-white/90 font-bold">a</td>
                    <td className="p-3.5 border-l border-white/15 text-emerald-400 font-black text-center text-[18px]">0</td>
                    <td className="p-3.5 border-l border-white/15 text-amber-400 font-black text-center text-[18px]">1</td>
                    <td className="p-3.5 border-l border-white/15 text-[#38ef7d] font-sans text-[15px] font-semibold">
                      Matches row(ε) ──► Loop to q₀
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.04] transition">
                    <td className="p-3.5 pl-5 text-white/90 font-bold">b · a</td>
                    <td className="p-3.5 border-l border-white/15 text-amber-400 font-black text-center text-[18px]">1</td>
                    <td className="p-3.5 border-l border-white/15 text-emerald-400 font-black text-center text-[18px]">0</td>
                    <td className="p-3.5 border-l border-white/15 text-[#38ef7d] font-sans text-[15px] font-semibold">
                      Matches row(b) ──► Transition to q₁
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-[15px]">
            <span className="text-white/70 font-mono">
              Equivalence Proof: <code className="text-[#00f2fe] font-bold">row(s₁) = row(s₂) ⟹ s₁ ≡ s₂</code>
            </span>
            <span className="px-4 py-1.5 rounded-full bg-[#38ef7d]/15 border border-[#38ef7d]/40 text-[#38ef7d] font-mono font-bold text-[14px]">
              ✓ Status: CLOSED & CONSISTENT
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: The Two Invariant Pillars */}
        <div className="col-span-5 flex flex-col justify-between gap-6">
          
          {/* Invariant 1: Closedness */}
          <div className="p-7 rounded-3xl bg-[#0d0e17] border-2 border-[#38ef7d]/40 shadow-xl flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 text-[20px] font-bold text-[#38ef7d] mb-2 font-mono">
                <CheckCircle2 className="w-6 h-6" />
                <span>1. Closedness Invariant</span>
              </div>
              <p className="text-[17px] text-white/85 leading-relaxed mb-3">
                For every transition candidate string <code className="text-white font-mono font-bold bg-white/10 px-2 py-0.5 rounded">t ∈ S · Σ</code>, there must exist an identified state <code className="text-[#00f2fe] font-mono font-bold bg-white/10 px-2 py-0.5 rounded">s ∈ S</code> such that:
              </p>
              <div className="p-3.5 rounded-2xl bg-[#08080d] border border-[#38ef7d]/30 font-mono text-[17px] text-[#38ef7d] font-black text-center shadow-inner">
                row(t) == row(s)
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 text-[15px] text-white/70">
              <strong className="text-white font-bold">If violated:</strong> An undiscovered state exists! Move <code className="text-[#00f2fe] font-mono font-bold">t</code> into <code className="text-[#00f2fe] font-mono font-bold">S</code> to expand memory.
            </div>
          </div>

          {/* Invariant 2: Consistency */}
          <div className="p-7 rounded-3xl bg-[#0d0e17] border-2 border-[#00f2fe]/40 shadow-xl flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 text-[20px] font-bold text-[#00f2fe] mb-2 font-mono">
                <Sparkles className="w-6 h-6" />
                <span>2. Consistency Invariant</span>
              </div>
              <p className="text-[17px] text-white/85 leading-relaxed mb-3">
                Whenever two candidate states look identical <code className="text-white font-mono font-bold bg-white/10 px-2 py-0.5 rounded">row(s₁) = row(s₂)</code>, then appending input symbol <code className="text-white font-mono font-bold bg-white/10 px-2 py-0.5 rounded">a ∈ Σ</code> must remain identical:
              </p>
              <div className="p-3.5 rounded-2xl bg-[#08080d] border border-[#00f2fe]/30 font-mono text-[17px] text-[#00f2fe] font-black text-center shadow-inner">
                row(s₁ · a) == row(s₂ · a)
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 text-[15px] text-white/70">
              <strong className="text-white font-bold">If violated:</strong> States were mistakenly lumped together! Add <code className="text-[#38ef7d] font-mono font-bold">a · e</code> into suffix experiments <code className="text-[#38ef7d] font-mono font-bold">E</code>.
            </div>
          </div>

        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 3. DOCKED FOOTER                                                      */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="z-20 pt-4 border-t border-white/10 flex items-center justify-between text-[16px] text-white/70 font-mono">
        <span>Formal Theorem: When Table T is closed & consistent, a unique minimal Mealy automaton is extracted in polynomial time.</span>
        <span className="text-[#38ef7d] font-bold px-4 py-1 rounded-full bg-[#38ef7d]/10 border border-[#38ef7d]/30">
          Synthesized Hypothesis ℳ(T)
        </span>
      </div>
    </div>
  );
};
