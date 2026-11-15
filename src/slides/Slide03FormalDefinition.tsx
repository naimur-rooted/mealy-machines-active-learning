import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, RefreshCw, Zap, ArrowRight, CheckCircle2, Coins, Sparkles } from 'lucide-react';
import { presentationSound } from '@/lib/presentationSound';
import { presentationEase } from '@/lib/presentationMotion';

export const Slide03FormalDefinition: React.FC = () => {
  // Stage 0: Formula centered in screen -> Spring explosion of variables -> 4 definition cards cascade in with icon pop & text bloom
  // Stage 1: The Interactive Vending Machine Anatomy box appears ALONE in the big screen with an enhanced graphical experience
  // Stage 2: Full 2-column Grand Overview: Both the Mathematical Foundation & Vending Machine side-by-side
  const [stage, setStage] = useState(0);
  const stageRef = useRef(0);
  stageRef.current = stage;

  const [activeStep, setActiveStep] = useState(0);

  const demoTransitions = [
    { 
      from: 'q₀ (Idle)', 
      input: 'Coin (10¢)', 
      output: 'Display "10¢"', 
      to: 'q₁ (Armed / Has 10¢)', 
      status: 'Coin inserted: instantaneous display reaction emitted on transition edge',
      actionTitle: 'Customer Inserts 10¢ Coin',
      wireSignal: '10¢ Coin Detected'
    },
    { 
      from: 'q₁ (Armed)', 
      input: 'Select Soda', 
      output: 'Dispense Item + Green LED', 
      to: 'q₀ (Idle)', 
      status: 'Drink drops immediately as transition executes without waiting for clock tick',
      actionTitle: 'Customer Selects Cold Soda Button',
      wireSignal: 'Solenoid Fires ──► Drink Dispensed'
    }
  ];

  const advanceStage = () => {
    if (stageRef.current < 2) {
      presentationSound.play("counterTick", 0.75);
      setStage(s => s + 1);
      return true; // handled within this slide
    }
    return false; // let presentation advance to next slide
  };

  const prevStage = () => {
    if (stageRef.current > 0) {
      presentationSound.play("click", 0.5);
      setStage(s => s - 1);
      return true; // handled within this slide
    }
    return false; // allow backward slide navigation
  };

  // Wire into the global slide navigation gate
  useEffect(() => {
    window.__slideNavigationGate = {
      trigger: () => advanceStage(),
      prev: () => prevStage(),
      step: stage + 1,
      subSteps: ['Mathematical Specification', 'Vending Machine Anatomy', 'Grand 2-Column Synthesis'],
    };

    return () => {
      window.__slideNavigationGate = undefined;
    };
  }, [stage]);

  const tupleParts = [
    { symbol: 'Q', name: 'States', color: 'text-[#00f2fe]', bg: 'bg-[#00f2fe]/10', border: 'border-[#00f2fe]/30', delay: 0.2 },
    { symbol: 'q₀', name: 'Initial', color: 'text-[#00f2fe]', bg: 'bg-[#00f2fe]/10', border: 'border-[#00f2fe]/30', delay: 0.3 },
    { symbol: 'Σ', name: 'Inputs', color: 'text-[#38ef7d]', bg: 'bg-[#38ef7d]/10', border: 'border-[#38ef7d]/30', delay: 0.4 },
    { symbol: 'Δ', name: 'Outputs', color: 'text-[#38ef7d]', bg: 'bg-[#38ef7d]/10', border: 'border-[#38ef7d]/30', delay: 0.5 },
    { symbol: 'δ', name: 'Transition', color: 'text-[#f59e0b]', bg: 'bg-[#f59e0b]/10', border: 'border-[#f59e0b]/30', delay: 0.6 },
    { symbol: 'λ', name: 'Output Fn', color: 'text-[#00f2fe]', bg: 'bg-[#00f2fe]/15', border: 'border-[#00f2fe]/40', delay: 0.7 }
  ];

  return (
    <div 
      onClick={advanceStage}
      className={`slide-dark-bg w-[1920px] h-[1080px] p-[80px] flex flex-col justify-between relative select-none overflow-hidden ${
        stage < 2 ? 'cursor-pointer' : ''
      }`}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/3 w-[850px] h-[550px] bg-[#00f2fe]/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[750px] h-[500px] bg-[#38ef7d]/5 rounded-full blur-[180px] pointer-events-none" />

      {/* Top Banner & Replay controls */}
      <div className="flex items-center justify-between z-30 w-full">
        <div className="flex items-center gap-2.5 text-[14px] font-semibold tracking-[0.2em] uppercase text-[#00f2fe] font-mono">
          <BookOpen className="w-4 h-4" />
          <span>ACT II • FORMAL AUTOMATA THEORY</span>
        </div>

        {stage > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              presentationSound.play("click", 0.5);
              setStage(0);
            }}
            className="text-xs font-mono text-white/50 hover:text-white px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition cursor-pointer"
          >
            ↺ Restart Storyline
          </button>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 1. HERO HEADER: Fixed, crisp, clear executive presentation             */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="z-20 flex flex-col mt-2">
        <h2 className="text-[56px] font-black text-white tracking-tight leading-tight">
          The Formal 6-Tuple Definition
        </h2>
        <p className="text-white/70 text-[20px] mt-1.5 font-light max-w-[1400px]">
          George H. Mealy, <em>"A Method for Synthesizing Sequential Circuits"</em>, Bell System Technical Journal (1955)
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 2. MAIN STAGE CONTENT (3 PROGRESSIVE PHASES)                          */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="relative my-auto z-10 w-full max-w-[1760px] mx-auto min-h-[600px] flex items-center justify-center">

        {/* ────────────────────────────────────────────────────────────────── */}
        {/* STAGE 0: Centered Formula + Spring Explosion of Variables           */}
        {/* ────────────────────────────────────────────────────────────────── */}
        {stage === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: presentationEase }}
            className="w-[1300px] p-10 rounded-3xl bg-[#0d0e17] border border-[#00f2fe]/40 shadow-2xl flex flex-col items-center justify-between"
          >
            {/* Center Formula with Spring Effect */}
            <div className="text-center my-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="text-xs font-mono uppercase text-[#00f2fe] tracking-widest font-bold mb-3"
              >
                THE FORMAL AUTOMATON SPECIFICATION
              </motion.div>

              <div className="flex items-center justify-center gap-4 py-3">
                <motion.span 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="font-mono text-[48px] font-black text-white tracking-wider"
                >
                  M = ⟨
                </motion.span>

                {/* 6 Elements Spring Outward from M */}
                <div className="flex items-center gap-3">
                  {tupleParts.map((part) => (
                    <motion.div
                      key={part.symbol}
                      initial={{ scale: 0, y: 35, opacity: 0 }}
                      animate={{ scale: 1, y: 0, opacity: 1 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 450, 
                        damping: 18, 
                        delay: part.delay 
                      }}
                      className={`flex flex-col items-center justify-center px-4 py-2 rounded-2xl ${part.bg} border ${part.border} shadow-md`}
                    >
                      <span className={`font-mono text-[32px] font-black ${part.color}`}>
                        {part.symbol}
                      </span>
                      <span className="text-[12px] font-mono text-white/60 uppercase tracking-wider font-semibold">
                        {part.name}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <motion.span 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.75 }}
                  className="font-mono text-[48px] font-black text-white tracking-wider"
                >
                  ⟩
                </motion.span>
              </div>
            </div>

            {/* 4 Definition Cards: Icon pops up first, then text blooms outward from it */}
            <div className="grid grid-cols-2 gap-5 w-full my-6">
              
              {/* Card 1: Q & q0 */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-4 shadow-sm overflow-hidden">
                <motion.div 
                  initial={{ scale: 0, rotate: -20, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 450, damping: 16, delay: 0.85 }}
                  className="w-14 h-14 rounded-xl bg-[#00f2fe]/10 border border-[#00f2fe]/40 flex items-center justify-center text-[#00f2fe] font-mono font-black text-[24px] shrink-0 shadow-md"
                >
                  Q
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -25, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.05, ease: presentationEase }}
                  className="flex-1"
                >
                  <h4 className="text-[20px] font-bold text-white">Finite State Set & Initial State (q₀)</h4>
                  <p className="text-[15px] text-white/70 mt-1 leading-snug">
                    A non-empty finite set of internal system memory configurations, starting in initial state <code className="text-[#00f2fe] font-bold">q₀ ∈ Q</code>.
                  </p>
                </motion.div>
              </div>

              {/* Card 2: Sigma & Delta */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-4 shadow-sm overflow-hidden">
                <motion.div 
                  initial={{ scale: 0, rotate: -20, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 450, damping: 16, delay: 1.15 }}
                  className="w-14 h-14 rounded-xl bg-[#38ef7d]/10 border border-[#38ef7d]/40 flex items-center justify-center text-[#38ef7d] font-mono font-black text-[24px] shrink-0 shadow-md"
                >
                  Σ
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -25, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.35, ease: presentationEase }}
                  className="flex-1"
                >
                  <h4 className="text-[20px] font-bold text-white">Input (Σ) & Output (Δ) Alphabets</h4>
                  <p className="text-[15px] text-white/70 mt-1 leading-snug">
                    Finite alphabet of incoming stimulus symbols <code className="text-[#38ef7d] font-bold">Σ</code> and emitted response symbols <code className="text-[#38ef7d] font-bold">Δ</code>.
                  </p>
                </motion.div>
              </div>

              {/* Card 3: Transition Function delta */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-4 shadow-sm overflow-hidden">
                <motion.div 
                  initial={{ scale: 0, rotate: -20, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 450, damping: 16, delay: 1.45 }}
                  className="w-14 h-14 rounded-xl bg-[#f59e0b]/10 border border-[#f59e0b]/40 flex items-center justify-center text-[#f59e0b] font-mono font-black text-[24px] shrink-0 shadow-md"
                >
                  δ
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -25, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.65, ease: presentationEase }}
                  className="flex-1"
                >
                  <h4 className="text-[20px] font-bold text-white">State Transition Function (δ : Q × Σ → Q)</h4>
                  <p className="text-[15px] text-white/70 mt-1 leading-snug">
                    Given present state <code className="text-white font-mono">q</code> and input symbol <code className="text-white font-mono">a</code>, computes the deterministic next state.
                  </p>
                </motion.div>
              </div>

              {/* Card 4: Output Function lambda (Crucial) */}
              <div className="p-5 rounded-2xl bg-[#00f2fe]/10 border border-[#00f2fe]/40 flex items-start gap-4 shadow-md overflow-hidden">
                <motion.div 
                  initial={{ scale: 0, rotate: -20, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 450, damping: 16, delay: 1.75 }}
                  className="w-14 h-14 rounded-xl bg-[#00f2fe]/20 border border-[#00f2fe]/50 flex items-center justify-center text-[#00f2fe] font-mono font-black text-[24px] shrink-0 shadow-md"
                >
                  λ
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -25, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.95, ease: presentationEase }}
                  className="flex-1"
                >
                  <div className="flex items-center gap-2">
                    <h4 className="text-[20px] font-bold text-white">Output Function (λ : Q × Σ → Δ)</h4>
                    <span className="px-2.5 py-0.5 rounded bg-[#00f2fe]/20 text-[#00f2fe] text-xs font-mono font-bold">CRUCIAL</span>
                  </div>
                  <p className="text-[15px] text-white/85 mt-1 leading-snug">
                    Output is produced <strong>instantly on the transition</strong>, depending on both current state AND incoming input.
                  </p>
                </motion.div>
              </div>

            </div>

            {/* Bottom Insight Call-to-action */}
            <div className="w-full pt-4 border-t border-white/10 flex items-center justify-between text-[15px] text-[#00f2fe] font-mono">
              <span className="font-bold">⚡ All 6 mathematical parameters ready for reactive modeling.</span>
              <span className="text-white/60 text-xs px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10">
                Click Next to see Interactive Vending Machine Anatomy ➔
              </span>
            </div>
          </motion.div>
        )}

        {/* ────────────────────────────────────────────────────────────────── */}
        {/* STAGE 1: Interactive Vending Machine Anatomy (ALONE in Big Screen) */}
        {/* ────────────────────────────────────────────────────────────────── */}
        {stage === 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: presentationEase }}
            className="w-[1400px] p-9 rounded-3xl bg-[#0d0e17] border-2 border-[#00f2fe]/50 shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex flex-col justify-between"
          >
            {/* Header with trigger button */}
            <div className="flex items-center justify-between pb-5 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#38ef7d]/15 border border-[#38ef7d]/40 flex items-center justify-center text-[#38ef7d]">
                  <Coins className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-[30px] font-black text-white">Interactive Vending Machine Anatomy</h3>
                  <p className="text-[16px] text-white/70">The Classical Real-World Mealy Machine Proof</p>
                </div>
              </div>

              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  presentationSound.play("counterTick", 0.75);
                  setActiveStep((prev) => (prev + 1) % demoTransitions.length);
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00f2fe]/20 hover:bg-[#00f2fe]/35 border border-[#00f2fe]/50 text-[#00f2fe] text-sm font-mono font-bold transition cursor-pointer shadow-md"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Simulate Hardware Pulse ➔</span>
              </button>
            </div>

            {/* Main Graphical Showcase: Image + Live Silicon Wire Display */}
            <div className="my-6 grid grid-cols-12 gap-6 items-stretch">
              
              {/* Left Side: Real Tokyo Vending Machine Banner (5 cols) */}
              <div className="col-span-5 relative rounded-2xl overflow-hidden border border-white/20 shadow-lg min-h-[280px]">
                <img 
                  src="/vending_machine_real.jpg" 
                  alt="Real Tokyo Beverage Vending Machine" 
                  className="w-full h-full object-cover filter contrast-[1.2] brightness-[0.95]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090a12] via-[#090a12]/40 to-transparent flex flex-col justify-end p-5">
                  <span className="px-3 py-1 rounded-md bg-[#38ef7d]/20 text-[#38ef7d] border border-[#38ef7d]/40 text-xs font-mono font-bold uppercase w-fit">
                    PHYSICAL STIMULUS-RESPONSE
                  </span>
                  <span className="text-white font-black text-xl mt-1.5">Tokyo Beverage Automaton</span>
                  <span className="text-white/60 text-xs mt-0.5">Dual-state sequential coin & beverage dispenser</span>
                </div>
              </div>

              {/* Right Side: Interactive Silicon State & Edge Diagram (7 cols) */}
              <div className="col-span-7 p-6 rounded-2xl bg-[#08080d] border border-white/10 flex flex-col justify-between shadow-inner">
                
                {/* Upper Live Action Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs font-mono text-white/50 uppercase tracking-wider">Current Stimulus Trigger</span>
                  <span className="text-[#38ef7d] font-mono font-bold text-sm bg-[#38ef7d]/10 px-3 py-1 rounded-full border border-[#38ef7d]/20">
                    {demoTransitions[activeStep].actionTitle}
                  </span>
                </div>

                {/* State Machine Transition Graph */}
                <div className="my-4 py-4 flex items-center justify-between px-6 bg-white/[0.02] rounded-xl border border-white/5 relative">
                  
                  {/* State q0 */}
                  <div className={`w-24 h-24 rounded-full flex flex-col items-center justify-center border-2 transition-all duration-300 ${
                    activeStep === 0 
                      ? 'border-[#00f2fe] bg-[#00f2fe]/20 shadow-[0_0_30px_rgba(0,242,254,0.35)] scale-105' 
                      : 'border-white/20 bg-white/5 opacity-70'
                  }`}>
                    <span className="font-mono text-lg font-black text-white">q₀</span>
                    <span className="text-[11px] font-mono text-[#00f2fe] font-semibold">Idle</span>
                  </div>

                  {/* Dynamic Transition Wire with Input / Output Badge */}
                  <div className="flex-1 flex flex-col items-center px-6 relative">
                    <motion.div 
                      key={activeStep}
                      initial={{ scale: 0.85, y: -5 }}
                      animate={{ scale: 1, y: 0 }}
                      className="px-5 py-2 rounded-xl bg-[#141524] border-2 border-[#00f2fe]/50 text-base font-mono text-white mb-2 shadow-xl"
                    >
                      <span className="text-[#38ef7d] font-black">{demoTransitions[activeStep].input}</span>
                      <span className="text-white/40 mx-2.5 font-bold">/</span>
                      <span className="text-[#00f2fe] font-black">{demoTransitions[activeStep].output}</span>
                    </motion.div>

                    <div className="w-full h-1.5 bg-gradient-to-r from-[#00f2fe] via-[#38ef7d] to-[#00f2fe] relative rounded-full shadow-[0_0_12px_rgba(56,239,125,0.4)]">
                      <div className="absolute right-0 -top-1.5 w-4 h-4 border-t-2 border-r-2 border-[#00f2fe] rotate-45" />
                    </div>

                    <span className="text-[12px] text-white/50 mt-2 font-mono">
                      Mealy Transition Format: <strong>(Input / Output)</strong>
                    </span>
                  </div>

                  {/* State q1 */}
                  <div className={`w-24 h-24 rounded-full flex flex-col items-center justify-center border-2 transition-all duration-300 ${
                    activeStep === 1 
                      ? 'border-[#00f2fe] bg-[#00f2fe]/20 shadow-[0_0_30px_rgba(0,242,254,0.35)] scale-105' 
                      : 'border-white/20 bg-white/5 opacity-70'
                  }`}>
                    <span className="font-mono text-lg font-black text-white">q₁</span>
                    <span className="text-[11px] font-mono text-[#38ef7d] font-semibold">Armed</span>
                  </div>
                </div>

                {/* Instant Output Status Highlight */}
                <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white/90 flex items-center gap-3">
                  <Zap className="w-5 h-5 text-[#38ef7d] shrink-0" />
                  <div>
                    <span className="text-white font-bold">{demoTransitions[activeStep].status}</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Bottom Insight & Next Prompt */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[15px] font-mono">
              <span className="text-[#38ef7d] font-bold">
                💡 Key Mealy Insight: Output is emitted directly during state transition (0 ns delay).
              </span>
              <span className="text-white/60 text-xs px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10">
                Click Next to view Grand Side-by-Side Comparison ➔
              </span>
            </div>
          </motion.div>
        )}

        {/* ────────────────────────────────────────────────────────────────── */}
        {/* STAGE 2: Full 2-Column Grand Overview (Both Side-by-Side)           */}
        {/* ────────────────────────────────────────────────────────────────── */}
        {stage === 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: presentationEase }}
            className="grid grid-cols-12 gap-8 w-full items-stretch"
          >
            {/* Left Column: Formal 6-Tuple & Definitions (6 cols) */}
            <div className="col-span-6 p-8 rounded-3xl bg-[#0d0e17] border border-white/15 flex flex-col justify-between shadow-xl min-h-[590px]">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="text-xs font-mono uppercase text-[#00f2fe] tracking-wider font-bold">
                    The Mathematical Foundation
                  </div>
                  <span className="text-white/50 font-mono text-xs">Mealy (1955)</span>
                </div>

                {/* 6-Tuple Banner */}
                <div className="my-5 p-4 rounded-2xl bg-white/[0.04] border border-white/10 font-mono text-2xl text-[#00f2fe] font-black text-center tracking-wider">
                  M = ⟨ Q, q₀, Σ, Δ, δ, λ ⟩
                </div>

                {/* 4 Definitions Compacted */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="font-mono text-sm text-[#00f2fe] font-bold">Q & q₀</div>
                    <div className="text-white font-bold text-sm mt-0.5">States & Initial</div>
                    <p className="text-white/65 text-xs mt-1">Finite state set with start state <code className="text-white font-mono">q₀ ∈ Q</code>.</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="font-mono text-sm text-[#38ef7d] font-bold">Σ & Δ</div>
                    <div className="text-white font-bold text-sm mt-0.5">Input & Output</div>
                    <p className="text-white/65 text-xs mt-1">Input symbols <code className="text-white font-mono">Σ</code> and emitted reaction symbols <code className="text-white font-mono">Δ</code>.</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="font-mono text-sm text-[#f59e0b] font-bold">δ : Q × Σ ──► Q</div>
                    <div className="text-white font-bold text-sm mt-0.5">Transition Logic</div>
                    <p className="text-white/65 text-xs mt-1">Computes deterministic next state from present state and input.</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#00f2fe]/10 border border-[#00f2fe]/30">
                    <div className="font-mono text-sm text-[#00f2fe] font-bold">λ : Q × Σ ──► Δ</div>
                    <div className="text-white font-bold text-sm mt-0.5">Output Logic (Mealy)</div>
                    <p className="text-white/80 text-xs mt-1">Produced <strong>directly on the edge</strong> from (state, input).</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 text-xs text-white/50 font-mono">
                Key Law: The output is never stored inside the target state—it emits on transition.
              </div>
            </div>

            {/* Right Column: Real Vending Machine + Interactive Anatomy (6 cols) */}
            <div className="col-span-6 p-8 rounded-3xl bg-[#0d0e17] border border-[#00f2fe]/40 flex flex-col justify-between shadow-xl min-h-[590px]">
              <div>
                {/* Header with Step trigger */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <Coins className="w-5 h-5 text-[#38ef7d]" />
                    <h3 className="text-[20px] font-black text-white">Interactive Vending Machine Anatomy</h3>
                  </div>

                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      presentationSound.play("counterTick", 0.7);
                      setActiveStep((prev) => (prev + 1) % demoTransitions.length);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#00f2fe]/15 hover:bg-[#00f2fe]/30 border border-[#00f2fe]/40 text-[#00f2fe] text-xs font-mono font-bold transition cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Trigger Next Step</span>
                  </button>
                </div>

                {/* Vending Machine Real Photographic Banner */}
                <div className="my-4 relative h-36 rounded-2xl overflow-hidden border border-white/15 shadow-md">
                  <img 
                    src="/vending_machine_real.jpg" 
                    alt="Real World Vending Machine" 
                    className="w-full h-full object-cover filter contrast-[1.15] brightness-[0.9]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0d0e17] via-transparent to-[#0d0e17]/80 flex items-center justify-between px-6">
                    <div className="bg-[#0d0e17]/80 backdrop-blur-md p-3 rounded-xl border border-white/15">
                      <span className="text-xs font-mono text-[#38ef7d] font-bold uppercase tracking-wider block">Real-World Hardware</span>
                      <span className="text-white font-bold text-base">Tokyo Beverage Vending Machine</span>
                    </div>

                    <div className="bg-[#0d0e17]/85 backdrop-blur-md px-4 py-2 rounded-xl border border-[#00f2fe]/30 text-right">
                      <span className="text-[11px] font-mono text-white/60 block">Current Action</span>
                      <span className="text-[#00f2fe] font-mono font-black text-sm">{demoTransitions[activeStep].input}</span>
                    </div>
                  </div>
                </div>

                {/* Visual State Transition Diagram */}
                <div className="relative h-32 rounded-2xl bg-[#08080d] border border-white/10 p-4 flex items-center justify-between px-10 shadow-inner">
                  {/* State q0 */}
                  <div className={`w-20 h-20 rounded-full flex flex-col items-center justify-center border-2 transition-all ${
                    activeStep === 0 
                      ? 'border-[#00f2fe] bg-[#00f2fe]/20 shadow-[0_0_25px_rgba(0,242,254,0.3)]' 
                      : 'border-white/20 bg-white/5'
                  }`}>
                    <span className="font-mono text-sm font-black text-white">q₀</span>
                    <span className="text-[10px] text-white/60">Idle</span>
                  </div>

                  {/* Transition Arrow with Input/Output Label */}
                  <div className="flex-1 flex flex-col items-center px-4 relative">
                    <div className="px-4 py-1.5 rounded-lg bg-[#141522] border border-[#00f2fe]/40 text-sm font-mono text-white mb-1.5 shadow-lg">
                      <span className="text-[#38ef7d] font-black">{demoTransitions[activeStep].input}</span>
                      <span className="text-white/40 mx-2">/</span>
                      <span className="text-[#00f2fe] font-black">{demoTransitions[activeStep].output}</span>
                    </div>
                    <div className="w-full h-1 bg-gradient-to-r from-[#00f2fe] to-[#38ef7d] relative rounded-full">
                      <div className="absolute right-0 -top-1 w-3 h-3 border-t-2 border-r-2 border-[#38ef7d] rotate-45" />
                    </div>
                    <span className="text-[11px] text-white/50 mt-1.5 font-mono">Transition Format: (Input / Output)</span>
                  </div>

                  {/* State q1 */}
                  <div className={`w-20 h-20 rounded-full flex flex-col items-center justify-center border-2 transition-all ${
                    activeStep === 1 
                      ? 'border-[#00f2fe] bg-[#00f2fe]/20 shadow-[0_0_25px_rgba(0,242,254,0.3)]' 
                      : 'border-white/20 bg-white/5'
                  }`}>
                    <span className="font-mono text-sm font-black text-white">q₁</span>
                    <span className="text-[10px] text-white/60">Armed</span>
                  </div>
                </div>

                {/* Execution Note */}
                <div className="mt-4 p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white/80 flex items-center gap-3">
                  <Zap className="w-5 h-5 text-[#38ef7d] shrink-0" />
                  <div>
                    <span className="text-white font-bold">{demoTransitions[activeStep].status}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 text-xs text-[#00f2fe] font-mono font-bold flex items-center justify-between">
                <span>⚡ Zero clock cycle delay: output produced in same step as input.</span>
                <span className="text-white/50 text-xs">Click Next to advance slide</span>
              </div>
            </div>
          </motion.div>
        )}

      </div>

      {/* Footer Citation */}
      <div className="flex items-center justify-between text-[14px] text-white/40 border-t border-white/10 pt-4 z-10 font-mono">
        <span>Hopcroft, Motwani & Ullman — Introduction to Automata Theory (3rd Edition)</span>
        <span className="text-[#00f2fe]">λ(q, a) Mealy Output vs Moore λ(q)</span>
      </div>
    </div>
  );
};
