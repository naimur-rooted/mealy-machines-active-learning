import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitCompare, Clock, Zap, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import { presentationSound } from '@/lib/presentationSound';

export const Slide04MealyVsMoore: React.FC = () => {
  const [simStep, setSimStep] = useState<'idle' | 'tapping' | 'result'>('idle');
  const simStepRef = useRef<'idle' | 'tapping' | 'result'>('idle');
  simStepRef.current = simStep;

  const triggerNextAction = () => {
    if (simStepRef.current === 'idle') {
      presentationSound.play("counterTick", 0.7);
      setSimStep('tapping');

      setTimeout(() => {
        presentationSound.play("warpComplete", 0.8);
        setSimStep('result');
      }, 850);
      return true; // handled within slide
    }
    return false; // let presentation advance to next slide
  };

  // Wire into the presentation's global navigation gate (Space, Right Arrow, Click)
  useEffect(() => {
    window.__slideNavigationGate = {
      trigger: () => {
        return triggerNextAction();
      },
      prev: () => {
        if (simStepRef.current !== 'idle') {
          presentationSound.play("click", 0.5);
          setSimStep('idle');
          return true; // handled within slide
        }
        return false; // allow backward navigation
      },
      step: simStep === 'idle' ? 1 : 2,
      subSteps: ['The Subway Dilemma', 'Instant Gate Activation'],
    };

    return () => {
      window.__slideNavigationGate = undefined;
    };
  }, [simStep]);

  return (
    <div 
      onClick={triggerNextAction}
      className={`slide-dark-bg w-[1920px] h-[1080px] p-[70px] flex flex-col justify-between relative select-none overflow-hidden ${
        simStep === 'idle' ? 'cursor-pointer' : ''
      }`}
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-[750px] h-[500px] bg-red-500/5 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[750px] h-[500px] bg-[#10b981]/5 rounded-full blur-[170px] pointer-events-none" />

      {/* Header with Title (Clean without the button) */}
      <div className="flex items-center justify-between z-10">
        <div>
          <div className="flex items-center gap-2.5 text-[14px] font-mono font-bold tracking-[0.2em] uppercase text-[#00f2fe] mb-1.5">
            <GitCompare className="w-4 h-4" />
            <span>ACT I (PART 2) • REAL-WORLD HUMAN EXPERIENCE</span>
          </div>
          <h2 className="text-[50px] font-black text-white tracking-tight leading-tight">
            The Subway Gate Reality: Moore vs. Mealy
          </h2>
          <p className="text-white/60 text-[20px] font-light">
            Why commuters get physically blocked by clock cycles — and how George Mealy eliminated the delay.
          </p>
        </div>

        {/* Minimal Replay Reset Trigger if already played */}
        {simStep !== 'idle' && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              presentationSound.play("click", 0.5);
              setSimStep('idle');
            }}
            className="text-xs font-mono text-white/50 hover:text-white px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition cursor-pointer"
          >
            ↺ Replay Comparison
          </button>
        )}
      </div>

      {/* Side-by-Side Photographic Scenario Showcase */}
      <div className="grid grid-cols-2 gap-10 my-auto z-10 w-full max-w-[1780px] mx-auto">
        
        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* LEFT CARD: MOORE MACHINE — THE FROZEN / ANNOYED COMMUTER           */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <div className="rounded-3xl bg-[#0c0d16]/95 border-2 border-red-500/40 p-7 flex flex-col justify-between backdrop-blur-2xl relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
          {/* Header Tag */}
          <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="w-3.5 h-3.5 rounded-full bg-red-500 animate-pulse" />
              <h3 className="text-[26px] font-black text-white">The Moore Turnstile</h3>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/15 border border-red-500/40 text-red-400 font-mono text-[12px] font-bold">
              <Clock className="w-3.5 h-3.5" />
              <span>1-CYCLE CLOCK LAG</span>
            </div>
          </div>

          {/* Photographic Visual Body */}
          <div className="relative h-[340px] my-4 rounded-2xl overflow-hidden border border-white/10 bg-black group">
            {/* Real Subway Station Background */}
            <img 
              src="/ticket_gates_real.jpg" 
              alt="Subway Turnstile Gate"
              className="w-full h-full object-cover filter brightness-[0.5] contrast-[1.1] scale-105"
            />

            {/* Red Atmospheric Overlay to signify Locked Barrier */}
            <div className="absolute inset-0 bg-gradient-to-t from-red-950/90 via-black/40 to-transparent" />

            {/* Real Card Tap Floating Card with Motion */}
            <motion.div 
              animate={
                simStep === 'tapping' || simStep === 'result'
                  ? { y: [0, -15, 0], scale: 1.05 }
                  : { y: 0 }
              }
              transition={{ duration: 0.4 }}
              className="absolute top-4 left-4 z-20 w-[170px] h-[105px] rounded-xl overflow-hidden border-2 border-[#00f2fe] shadow-[0_0_25px_rgba(0,242,254,0.4)]"
            >
              <img src="/card_tap_real.jpg" alt="Card Tap" className="w-full h-full object-cover" />
              <div className="absolute bottom-0 inset-x-0 bg-black/80 text-[10px] font-mono font-bold text-[#00f2fe] text-center py-0.5">
                Input: Card Contact
              </div>
            </motion.div>

            {/* The Locked Gate Status Screen */}
            <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-2">
              <div className="px-4 py-2 rounded-xl bg-black/90 border-2 border-red-500/60 shadow-[0_0_30px_rgba(239,68,68,0.4)] flex items-center gap-2.5">
                <XCircle className="w-5 h-5 text-red-400 animate-pulse" />
                <div>
                  <div className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider">Gate Actuator</div>
                  <div className="text-[17px] font-mono font-black text-white">
                    {simStep === 'result' ? '🛑 GATE LOCKED' : 'STANDBY (LOCKED)'}
                  </div>
                </div>
              </div>
              <div className="text-[11px] font-mono px-3 py-1 rounded bg-black/70 border border-white/10 text-white/70">
                Clock Edge: <span className="text-red-400 font-bold">10 ns pending</span>
              </div>
            </div>

            {/* Human Frustration Floating Callout on Tap */}
            <AnimatePresence>
              {simStep === 'result' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-5 inset-x-5 z-20 p-4 rounded-2xl bg-red-950/95 border-2 border-red-500/70 shadow-[0_0_40px_rgba(239,68,68,0.5)] flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[36px]">😠</span>
                    <div>
                      <div className="text-[16px] font-bold text-white flex items-center gap-2">
                        <span>"Wait, why didn't the gate open?!"</span>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30 font-bold">
                          COMMUTER STUMBLES
                        </span>
                      </div>
                      <div className="text-[12px] font-mono text-white/80 mt-0.5">
                        Card touched at <code className="text-[#00f2fe]">t=0.00ms</code>, but gate motor is stalled waiting for flip-flops to clock!
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-red-400 font-mono font-black text-[15px] shrink-0">
                    Lag: +1 Cycle
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {simStep === 'idle' && (
              <div className="absolute inset-x-0 bottom-4 text-center z-10 pointer-events-none">
                <span className="text-xs font-mono px-4 py-1.5 rounded-full bg-black/80 text-white/60 border border-white/10">
                  Tap card to see the physical 1-cycle delay trap
                </span>
              </div>
            )}
          </div>

          {/* Theoretical Root Cause Box */}
          <div className="space-y-2.5">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-[15px] text-white/85 leading-relaxed font-sans">
              <strong className="text-red-400 font-mono">Why does the passenger get blocked?</strong> In Moore hardware, the turnstile output is computed purely from <strong className="text-white">State Register Flip-Flops: λ(Q)</strong>. It cannot read the card directly. The gate physically refuses to unlock until the internal clock ticks.
            </div>
            <div className="flex items-center justify-between text-[13px] font-mono text-white/50 pt-1.5 border-t border-white/10">
              <span>Moore Logic Formula: Output = λ( Current State )</span>
              <span className="text-red-400 font-bold">Human Hesitation Cost</span>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* RIGHT CARD: MEALY MACHINE — THE INSTANT SEAMLESS FLOW              */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <div className="rounded-3xl bg-[#0c0d16]/95 border-2 border-[#10b981]/50 p-7 flex flex-col justify-between backdrop-blur-2xl relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
          {/* Header Tag */}
          <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="w-3.5 h-3.5 rounded-full bg-[#10b981] animate-pulse" />
              <h3 className="text-[26px] font-black text-white">The Mealy Turnstile</h3>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#10b981]/15 border border-[#10b981]/40 text-[#10b981] font-mono text-[12px] font-bold">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>0 ns INSTANT FLOW</span>
            </div>
          </div>

          {/* Photographic Visual Body */}
          <div className="relative h-[340px] my-4 rounded-2xl overflow-hidden border border-white/10 bg-black group">
            {/* Real Subway Station Background */}
            <img 
              src="/turnstile_gate_wide.jpg" 
              alt="Open Subway Turnstile Gate"
              className="w-full h-full object-cover filter brightness-[0.6] contrast-[1.1] scale-105"
            />

            {/* Emerald Atmospheric Overlay to signify Open Gate Flow */}
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-black/40 to-transparent" />

            {/* Real Card Tap Floating Card with Motion */}
            <motion.div 
              animate={
                simStep === 'tapping' || simStep === 'result'
                  ? { y: [0, -15, 0], scale: 1.05 }
                  : { y: 0 }
              }
              transition={{ duration: 0.4 }}
              className="absolute top-4 left-4 z-20 w-[170px] h-[105px] rounded-xl overflow-hidden border-2 border-[#10b981] shadow-[0_0_25px_rgba(16,185,129,0.5)]"
            >
              <img src="/card_tap_real.jpg" alt="Card Tap" className="w-full h-full object-cover" />
              <div className="absolute bottom-0 inset-x-0 bg-black/80 text-[10px] font-mono font-bold text-[#10b981] text-center py-0.5">
                Input: Contactless Touch
              </div>
            </motion.div>

            {/* The Unlocked Gate Status Screen */}
            <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-2">
              <div className={`px-4 py-2 rounded-xl bg-black/90 border-2 shadow-[0_0_30px_rgba(16,185,129,0.4)] flex items-center gap-2.5 ${
                simStep === 'result' ? 'border-[#10b981]' : 'border-white/20'
              }`}>
                <CheckCircle2 className="w-5 h-5 text-[#10b981]" />
                <div>
                  <div className="text-[10px] font-mono text-[#10b981] font-bold uppercase tracking-wider">Gate Actuator</div>
                  <div className="text-[17px] font-mono font-black text-white">
                    {simStep === 'result' ? '🟢 UNLOCKED (0 ns)' : 'STANDBY (READY)'}
                  </div>
                </div>
              </div>
              <div className="text-[11px] font-mono px-3 py-1 rounded bg-black/70 border border-[#10b981]/30 text-[#10b981] font-bold">
                Bypass Wire: <span className="text-white">Active Combinational Path</span>
              </div>
            </div>

            {/* Human Seamless Pass Floating Callout on Tap */}
            <AnimatePresence>
              {simStep === 'result' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-5 inset-x-5 z-20 p-4 rounded-2xl bg-emerald-950/95 border-2 border-[#10b981]/70 shadow-[0_0_40px_rgba(16,185,129,0.5)] flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[36px]">🏃💨</span>
                    <div>
                      <div className="text-[16px] font-bold text-white flex items-center gap-2">
                        <span>"Zero hesitation! Pure natural speed."</span>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/40 font-bold">
                          SEAMLESS GLIDE
                        </span>
                      </div>
                      <div className="text-[12px] font-mono text-white/80 mt-0.5">
                        Card touch instantly trips the motor gates through the bypass wire. Flaps swing open at 0 ns!
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-[#10b981] font-mono font-black text-[15px] shrink-0">
                    Latency: 0.00 ns
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {simStep === 'idle' && (
              <div className="absolute inset-x-0 bottom-4 text-center z-10 pointer-events-none">
                <span className="text-xs font-mono px-4 py-1.5 rounded-full bg-black/80 text-white/60 border border-white/10">
                  Tap card to see the zero-delay bypass reaction
                </span>
              </div>
            )}
          </div>

          {/* Theoretical Solution Box */}
          <div className="space-y-2.5">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-[15px] text-white/85 leading-relaxed font-sans">
              <strong className="text-[#10b981] font-mono">The 1955 Engineering Breakthrough:</strong> Mealy connected the card sensor directly into <strong className="text-white">Output Logic: λ(Q, X)</strong>. The turnstile does not ask the clock register for permission; it reacts at the speed of light through silicon gates.
            </div>
            <div className="flex items-center justify-between text-[13px] font-mono text-white/50 pt-1.5 border-t border-white/10">
              <span>Mealy Logic Formula: Output = λ( Current State , Current Input )</span>
              <span className="text-[#10b981] font-bold">Zero-Latency Reactive Model</span>
            </div>
          </div>
        </div>

      </div>

      {/* Footer Benchmark */}
      <div className="flex items-center justify-between text-[14px] text-white/40 border-t border-white/10 pt-4 z-10 font-mono">
        <span>Historical Reference: Edward F. Moore (1956) vs. George H. Mealy (1955)</span>
        <span className="text-[#00f2fe] font-bold">Why Modern Network Stacks, High-Speed Buses & Fuzzers Adopt Mealy</span>
      </div>
    </div>
  );
};
