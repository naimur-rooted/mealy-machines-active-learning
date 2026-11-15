import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Search, ShieldAlert, CheckCircle2, Lock, Cpu, Activity, AlertTriangle } from 'lucide-react';
import { presentationSound } from '@/lib/presentationSound';
import { presentationEase } from '@/lib/presentationMotion';

export const Slide02Motivation: React.FC = () => {
  // Stage 0: Left Box (Systems We Cannot Inspect) in center with 3 threat points cascading in
  // Stage 1: Right Box (The Black-Box Learning Objective) takes center with oracle & solutions
  // Stage 2: Full 2-column Grand Overview (Both boxes side-by-side)
  const [stage, setStage] = useState(0);
  const stageRef = useRef(0);
  stageRef.current = stage;

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
      subSteps: ['Systems We Cannot Inspect', 'Learning Objective', 'Grand Comparison'],
    };

    return () => {
      window.__slideNavigationGate = undefined;
    };
  }, [stage]);

  return (
    <div 
      onClick={advanceStage}
      className={`slide-dark-bg w-[1920px] h-[1080px] p-[80px] flex flex-col justify-between relative select-none overflow-hidden ${
        stage < 2 ? 'cursor-pointer' : ''
      }`}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/3 w-[850px] h-[550px] bg-red-500/6 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[750px] h-[500px] bg-[#00f2fe]/6 rounded-full blur-[180px] pointer-events-none" />

      {/* Top Banner & Replay controls */}
      <div className="flex items-center justify-between z-30 w-full">
        <div className="flex items-center gap-2.5 text-[14px] font-semibold tracking-[0.2em] uppercase text-[#ffaa00] font-mono">
          <HelpCircle className="w-4 h-4" />
          <span>ACT I (PART 3) • THE BLACK-BOX CRISIS</span>
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
      {/* 1. HERO TITLE: Permanently docked at top, crisp, professional & clean  */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="z-20 flex flex-col mt-2">
        <h2 className="text-[56px] font-black text-white tracking-tight leading-tight">
          The Black-Box Crisis in Modern Systems
        </h2>
        <p className="text-white/70 text-[20px] mt-1.5 font-light max-w-[1400px]">
          Software & hardware are increasingly opaque, yet civilization depends on them for critical operations.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 2. AUTOMATIC CASCADE STAGING (NO BLUR, SHARP & HIGH-CONTRAST)          */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="relative my-auto z-10 w-full max-w-[1760px] mx-auto min-h-[580px] flex items-center justify-center">

        {/* STAGE 0: LEFT BOX IN CENTER WITH AUTOMATIC 3-POINT CASCADE */}
        {stage === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: presentationEase }}
            className="w-[1240px] p-9 rounded-3xl bg-[#0d0e17]/98 border-2 border-red-500/50 shadow-[0_25px_60px_rgba(239,68,68,0.22)] flex flex-col justify-between"
          >
            {/* Box Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-red-500/15 border border-red-500/50 flex items-center justify-center text-red-400">
                  <ShieldAlert className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-[32px] font-black text-white">Systems We Cannot Inspect</h3>
                  <p className="text-[17px] text-white/70">Critical infrastructure where internal source code is sealed or inaccessible</p>
                </div>
              </div>
              <span className="px-4 py-1.5 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 font-mono text-[13px] font-bold">
                THE 3 OPAQUE DOMAINS
              </span>
            </div>

            {/* The 3 Threat Points: Cascading in automatically with crisp images */}
            <div className="my-6 space-y-4">
              
              {/* Point 1: Cryptographic Protocols */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.15, ease: presentationEase }}
                className="p-4 rounded-2xl border border-red-500/30 bg-red-500/10 shadow-[0_4px_25px_rgba(239,68,68,0.15)] flex items-center gap-6"
              >
                <div className="w-32 h-24 rounded-xl overflow-hidden border-2 border-red-500/50 shrink-0 shadow-lg">
                  <img src="/crypto_server.jpg" alt="Cryptographic Protocols" className="w-full h-full object-cover filter brightness-[1.05] contrast-[1.2]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2.5">
                    <Lock className="w-5 h-5 text-[#f59e0b]" />
                    <h4 className="text-[21px] font-black text-white">1. Cryptographic Protocols (TLS, SSH, IPsec)</h4>
                  </div>
                  <p className="text-[16px] text-white/80 mt-1 leading-snug">
                    Multi-million-line legacy implementations with subtle, undocumented state machine bugs and authentication bypass vulnerabilities.
                  </p>
                </div>
              </motion.div>

              {/* Point 2: Smartcard Silicon */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.45, ease: presentationEase }}
                className="p-4 rounded-2xl border border-red-500/30 bg-red-500/10 shadow-[0_4px_25px_rgba(239,68,68,0.15)] flex items-center gap-6"
              >
                <div className="w-32 h-24 rounded-xl overflow-hidden border-2 border-red-500/50 shrink-0 shadow-lg">
                  <img src="/smartcard_silicon.jpg" alt="Smartcard Silicon" className="w-full h-full object-cover filter brightness-[1.05] contrast-[1.2]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2.5">
                    <Cpu className="w-5 h-5 text-[#f59e0b]" />
                    <h4 className="text-[21px] font-black text-white">2. Smartcard Silicon (e-Passports, Banking EMV)</h4>
                  </div>
                  <p className="text-[16px] text-white/80 mt-1 leading-snug">
                    Sealed hardware chips with read-protection circuitry; physical decapping or electron microscope probing destroys the substrate.
                  </p>
                </div>
              </motion.div>

              {/* Point 3: Cyber-Physical Controllers */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.75, ease: presentationEase }}
                className="p-4 rounded-2xl border border-red-500/30 bg-red-500/10 shadow-[0_4px_25px_rgba(239,68,68,0.15)] flex items-center gap-6"
              >
                <div className="w-32 h-24 rounded-xl overflow-hidden border-2 border-red-500/50 shrink-0 shadow-lg">
                  <img src="/controller_canbus.jpg" alt="Cyber-Physical Controllers" className="w-full h-full object-cover filter brightness-[1.05] contrast-[1.2]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2.5">
                    <Activity className="w-5 h-5 text-[#f59e0b]" />
                    <h4 className="text-[21px] font-black text-white">3. Cyber-Physical Controllers (Automotive CAN, SCADA)</h4>
                  </div>
                  <p className="text-[16px] text-white/80 mt-1 leading-snug">
                    Automotive electronic control units and industrial power grid controllers operating without public formal specifications.
                  </p>
                </div>
              </motion.div>

            </div>

            {/* Bottom Insight */}
            <div className="pt-3.5 border-t border-white/10 flex items-center justify-between text-[14px] text-red-400 font-mono">
              <span className="font-bold">⚠️ The Failure: Static code analysis fails when source code is missing or confidential.</span>
              <span className="text-white/60 text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10">Click to see the Learning Objective</span>
            </div>
          </motion.div>
        )}

        {/* STAGE 1: RIGHT BOX IN CENTER WITH AUTOMATIC SOLUTION CASCADE */}
        {stage === 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: presentationEase }}
            className="w-[1240px] p-9 rounded-3xl bg-[#0d0e17] border border-[#00f2fe]/40 shadow-[0_12px_35px_rgba(0,0,0,0.5)] flex flex-col justify-between"
          >
            {/* Box Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#00f2fe]/15 border border-[#00f2fe]/50 flex items-center justify-center text-[#00f2fe]">
                  <Search className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-[32px] font-black text-white">The Black-Box Learning Objective</h3>
                  <p className="text-[17px] text-white/70">Interacting purely through external stimulus-response queries</p>
                </div>
              </div>
              <span className="px-4 py-1.5 rounded-full bg-[#00f2fe]/20 border border-[#00f2fe]/40 text-[#00f2fe] font-mono text-[13px] font-bold">
                MATHEMATICAL RECONSTRUCTION
              </span>
            </div>

            {/* Oracle Interface & Visual Concept */}
            <div className="my-6 grid grid-cols-12 gap-6 items-stretch">
              {/* Oracle Code Box - Large, Readable, No Collision, No Tiny Text */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.15 }}
                className="col-span-8 p-6 rounded-2xl bg-[#090a12] border border-[#00f2fe]/40 font-mono flex flex-col justify-center space-y-4 shadow-md"
              >
                <div className="text-[#00f2fe] font-bold text-[20px] flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-[#00f2fe]" />
                  <span>Stimulus-Response Oracle Interface</span>
                </div>

                <div className="space-y-3 font-mono text-[18px]">
                  <div className="flex items-center gap-3">
                    <span className="text-white/70 w-[210px] shrink-0 font-medium">Input Query Sequence:</span>
                    <span className="text-white font-bold bg-white/10 px-3.5 py-1 rounded-lg border border-white/15">
                      σ = (a₁ · a₂ · ... · aₙ) ∈ Σ*
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[#00f2fe] w-[210px] shrink-0 font-medium">Observed Output Trace:</span>
                    <span className="text-[#00f2fe] font-bold bg-[#00f2fe]/15 px-3.5 py-1 rounded-lg border border-[#00f2fe]/30">
                      ω = (b₁ · b₂ · ... · bₙ) ∈ Δ*
                    </span>
                  </div>
                </div>

                <p className="text-[16px] text-white/80 font-sans leading-relaxed pt-2 border-t border-white/10">
                  The active learner queries the opaque system purely through input strings and records emitted output reactions.
                </p>
              </motion.div>

              {/* Visual Black Box Oracle Image Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="col-span-4 relative rounded-2xl overflow-hidden border border-[#00f2fe]/40 shadow-md group min-h-[200px]"
              >
                <img 
                  src="/black_box_oracle.jpg" 
                  alt="Black-Box Oracle & Cyber Security Matrix" 
                  className="w-full h-full object-cover filter contrast-[1.1] brightness-[0.95]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090a12] via-[#090a12]/50 to-transparent flex flex-col justify-end p-5">
                  <span className="px-3 py-1 rounded bg-[#00f2fe]/20 text-[#00f2fe] border border-[#00f2fe]/40 text-[13px] font-mono font-bold uppercase w-fit">
                    Active Learner Loop
                  </span>
                  <span className="text-white font-bold text-[18px] mt-1.5">SUT Oracle Reconstruction</span>
                </div>
              </motion.div>
            </div>

            {/* Solution Highlights */}
            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.35, ease: presentationEase }}
                className="flex items-start gap-4 p-4.5 rounded-2xl bg-[#00f2fe]/10 border border-[#00f2fe]/30 shadow-md"
              >
                <CheckCircle2 className="w-7 h-7 text-[#00f2fe] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[20px] font-black text-white">Reverse-Engineer the Exact Minimal Automaton</h4>
                  <p className="text-[16px] text-white/80 mt-1 leading-snug">
                    Synthesize the unique minimal Mealy state machine that precisely mirrors the internal state behavior of the black box.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.55, ease: presentationEase }}
                className="flex items-start gap-4 p-4.5 rounded-2xl bg-[#00f2fe]/10 border border-[#00f2fe]/30 shadow-md"
              >
                <CheckCircle2 className="w-7 h-7 text-[#00f2fe] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[20px] font-black text-white">Expose Undocumented & Illegal Transitions</h4>
                  <p className="text-[16px] text-white/80 mt-1 leading-snug">
                    Uncover zero-day vulnerabilities, handshake bypasses, and privilege escalations that normal unit tests never test.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Bottom Insight */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[15px] text-[#00f2fe] font-mono font-bold">
              <span>💡 The formal machine of choice for this stimulus-response reality? The Mealy Machine.</span>
              <span className="text-white/60 text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10">Click for Grand Comparison</span>
            </div>
          </motion.div>
        )}

        {/* STAGE 2: FULL 2-COLUMN GRAND OVERVIEW (EXPANSIVE & READABLE) */}
        {stage === 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: presentationEase }}
            className="grid grid-cols-2 gap-10 w-full max-w-[1760px] mx-auto"
          >
            {/* Left Card: Summary */}
            <div className="p-9 rounded-3xl bg-[#0d0e17] border border-red-500/40 flex flex-col justify-between shadow-xl min-h-[580px]">
              <div>
                <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-white/10">
                  <div className="w-14 h-14 rounded-2xl bg-red-500/15 border border-red-500/40 flex items-center justify-center text-red-400">
                    <ShieldAlert className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-[28px] font-black text-white">Systems We Cannot Inspect</h3>
                    <p className="text-[16px] text-white/60">Closed architectures lacking visible source code</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                    <div className="w-20 h-16 rounded-xl overflow-hidden shrink-0 border border-white/20">
                      <img src="/crypto_server.jpg" alt="Cryptographic Protocols" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-[19px] font-bold text-white">Cryptographic Protocols (TLS, SSH)</h4>
                      <p className="text-[15px] text-white/70 leading-snug mt-0.5">Legacy implementations with undocumented state machine bugs.</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                    <div className="w-20 h-16 rounded-xl overflow-hidden shrink-0 border border-white/20">
                      <img src="/smartcard_silicon.jpg" alt="Smartcard Silicon" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-[19px] font-bold text-white">Smartcard Silicon (e-Passports, EMV)</h4>
                      <p className="text-[15px] text-white/70 leading-snug mt-0.5">Hardware with read-out locks where physical decapping destroys data.</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                    <div className="w-20 h-16 rounded-xl overflow-hidden shrink-0 border border-white/20">
                      <img src="/controller_canbus.jpg" alt="Cyber-Physical Controllers" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-[19px] font-bold text-white">Cyber-Physical Controllers (Automotive CAN)</h4>
                      <p className="text-[15px] text-white/70 leading-snug mt-0.5">Automotive & SCADA controllers without public formal specs.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 text-[16px] text-red-400 font-mono font-bold">
                ⚠️ The Failure: Static code analysis fails completely on closed binaries.
              </div>
            </div>

            {/* Right Card: Summary */}
            <div className="p-9 rounded-3xl bg-[#0d0e17] border border-[#00f2fe]/40 flex flex-col justify-between shadow-xl min-h-[580px]">
              <div>
                <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-white/10">
                  <div className="w-14 h-14 rounded-2xl bg-[#00f2fe]/15 border border-[#00f2fe]/40 flex items-center justify-center text-[#00f2fe]">
                    <Search className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-[28px] font-black text-white">The Black-Box Learning Objective</h3>
                    <p className="text-[16px] text-white/60">Interrogating purely through external queries</p>
                  </div>
                </div>

                {/* Clear Oracle Block */}
                <div className="p-4.5 rounded-2xl bg-[#08080d] border border-[#00f2fe]/30 font-mono text-[17px] text-white/90 space-y-2 mb-5">
                  <div className="flex items-center gap-3">
                    <span className="text-white/60 text-sm">Input Query:</span>
                    <span className="text-white font-bold bg-white/10 px-3 py-0.5 rounded text-sm">σ = (a₁ · a₂ · ... · aₙ) ∈ Σ*</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[#00f2fe] text-sm">Observed Out:</span>
                    <span className="text-[#00f2fe] font-bold bg-[#00f2fe]/15 px-3 py-0.5 rounded text-sm">ω = (b₁ · b₂ · ... · bₙ) ∈ Δ*</span>
                  </div>
                </div>

                <div className="space-y-4 text-white">
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#00f2fe]/10 border border-[#00f2fe]/25">
                    <CheckCircle2 className="w-6 h-6 text-[#00f2fe] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-[19px] font-bold text-white">Synthesize the Exact Minimal Automaton</h4>
                      <p className="text-[15px] text-white/80 mt-0.5 leading-snug">
                        Reconstruct the unique minimal Mealy state machine matching target behaviors.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#00f2fe]/10 border border-[#00f2fe]/25">
                    <CheckCircle2 className="w-6 h-6 text-[#00f2fe] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-[19px] font-bold text-white">Expose Undocumented State Transitions</h4>
                      <p className="text-[15px] text-white/80 mt-0.5 leading-snug">
                        Discover hidden zero-day bypasses and security holes missed by traditional audits.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 text-[16px] text-[#00f2fe] font-mono font-bold">
                💡 The ideal formal machine for this stimulus-response reality? The Mealy Machine.
              </div>
            </div>
          </motion.div>
        )}

      </div>

      {/* Footer Citation */}
      <div className="flex items-center justify-between text-[14px] text-white/40 border-t border-white/10 pt-4 z-10 font-mono">
        <span>Frits Vaandrager, "Model Learning" (CACM 2017)</span>
        <span className="text-white/60">System Under Test (SUT) : Σ* ──► Δ*</span>
      </div>
    </div>
  );
};
