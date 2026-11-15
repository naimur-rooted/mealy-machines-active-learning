import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, RefreshCw, Zap, Search, ShieldCheck, CheckCircle2, AlertTriangle, Cpu, Server, GitFork } from 'lucide-react';
import { presentationSound } from '@/lib/presentationSound';
import { presentationEase } from '@/lib/presentationMotion';

export const Slide05ActiveLearning: React.FC = () => {
  // Stage 0: The MAT Architecture Pulse Loop (Big Interactive Center Stage)
  // Stage 1: The Two Core Query Engines Unpacked (Output vs Equivalence Queries side-by-side with Observation Tree)
  const [stage, setStage] = useState(0);
  const stageRef = useRef(0);
  stageRef.current = stage;

  // Interactive Query Pulse state
  const [pulseActive, setPulseActive] = useState(false);
  const [simStep, setSimStep] = useState<0 | 1>(0);

  const queryDemos = [
    {
      type: 'Output Query (Membership)',
      queryLabel: 'σ = (SYN, ACK, GET)',
      responseLabel: 'ω = (SYN-ACK, ACK, 200 OK)',
      intent: 'Probing black-box state response to build initial observation tree',
      oracleStatus: '200 OK • Normal Handshake'
    },
    {
      type: 'Equivalence Query (Conformance Test)',
      queryLabel: 'Is Hypothesis ℋ ≡ SUT?',
      responseLabel: 'Counterexample: cex = (CLIENT_HELLO, FIN)',
      intent: 'Fuzzing reveals undocumented state transition! Tree branches expanded.',
      oracleStatus: 'VULNERABILITY FOUND: Auth Bypass'
    }
  ];

  const triggerPulse = () => {
    presentationSound.play("counterTick", 0.7);
    setPulseActive(true);
    setTimeout(() => {
      presentationSound.play("warpComplete", 0.8);
      setPulseActive(false);
      setSimStep((prev) => (prev === 0 ? 1 : 0));
    }, 1100);
  };

  const advanceStage = () => {
    if (stageRef.current < 1) {
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
      subSteps: ['Active Ping-Pong Loop', 'Two Core Query Engines'],
    };

    return () => {
      window.__slideNavigationGate = undefined;
    };
  }, [stage]);

  return (
    <div 
      onClick={advanceStage}
      className={`slide-dark-bg w-[1920px] h-[1080px] px-[80px] pt-[50px] pb-[60px] flex flex-col justify-start gap-5 relative select-none overflow-hidden ${
        stage < 2 ? 'cursor-pointer' : ''
      }`}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/3 w-[850px] h-[550px] bg-[#00f2fe]/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[750px] h-[500px] bg-[#38ef7d]/5 rounded-full blur-[180px] pointer-events-none" />

      {/* Top Banner & Replay controls */}
      <div className="flex items-center justify-between z-30 w-full shrink-0">
        <div className="flex items-center gap-2.5 text-[14px] font-semibold tracking-[0.2em] uppercase text-[#00f2fe] font-mono">
          <Network className="w-4 h-4" />
          <span>ACT III • ACTIVE AUTOMATA INFERENCE</span>
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
      <div className="z-20 flex flex-col shrink-0">
        <h2 className="text-[46px] font-black text-white tracking-tight leading-tight">
          Learning Mealy Machines from the Outside
        </h2>
        <p className="text-white/70 text-[18px] mt-1 font-light max-w-[1400px]">
          Dana Angluin's <em>L*</em> Algorithm Adapted for Reactive Mealy Machines (Vaandrager CACM 2017)
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 2. MAIN STAGE CONTENT (3 PROGRESSIVE PHASES)                          */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-[1760px] mx-auto flex-1 flex items-center justify-center">

        {/* ────────────────────────────────────────────────────────────────── */}
        {/* STAGE 0: The MAT Architecture Pulse Loop (EXPANDED TO 1680px)      */}
        {/* ────────────────────────────────────────────────────────────────── */}
        {stage === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: presentationEase }}
            className="w-[1680px] p-8 rounded-3xl bg-[#0d0e17] border-2 border-[#00f2fe]/40 shadow-2xl flex flex-col justify-between max-h-[720px]"
          >
            {/* Upper Header with Trigger Button */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div>
                <span className="text-sm font-mono uppercase text-[#00f2fe] tracking-widest font-bold block mb-1.5">
                  THE MINIMALLY ADEQUATE TEACHER (MAT) FRAMEWORK
                </span>
                <h3 className="text-[34px] font-black text-white">Active Ping-Pong Stimulus Loop</h3>
              </div>

              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  triggerPulse();
                }}
                disabled={pulseActive}
                className="flex items-center gap-3 px-6 py-3 rounded-full bg-[#00f2fe]/20 hover:bg-[#00f2fe]/35 border border-[#00f2fe]/50 text-[#00f2fe] text-base font-mono font-bold transition cursor-pointer shadow-lg disabled:opacity-50"
              >
                <RefreshCw className={`w-5 h-5 ${pulseActive ? 'animate-spin' : ''}`} />
                <span>Simulate Query Pulse ➔</span>
              </button>
            </div>

            {/* Main Interactive MAT Communication Channel (Generous Size & Clear Typography) */}
            <div className="my-8 grid grid-cols-12 gap-10 items-stretch">
              
              {/* Left Box: Active Learner (4 cols) */}
              <div className="col-span-4 p-8 rounded-2xl bg-[#08080d] border-2 border-[#00f2fe]/50 shadow-[0_0_35px_rgba(0,242,254,0.18)] flex flex-col justify-between min-h-[320px]">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3.5 py-1.5 rounded-md bg-[#00f2fe]/20 text-[#00f2fe] border border-[#00f2fe]/30 text-xs font-mono font-bold uppercase tracking-wider">
                      ACTIVE LEARNER
                    </span>
                    <Cpu className="w-6 h-6 text-[#00f2fe]" />
                  </div>
                  <h4 className="text-[28px] font-black text-white">L* Algorithm Engine</h4>
                  <p className="text-[17px] text-white/80 mt-2 leading-relaxed">
                    Maintains the 2D Observation Table $(S, E)$ and synthesizes candidate hypothesis models.
                  </p>
                </div>

                <div className="mt-6 p-4 rounded-xl bg-white/[0.04] border border-white/10 text-sm font-mono text-white/90">
                  <span className="text-[#00f2fe] font-bold">Objective:</span> Reconstruct exact minimal automaton with zero source-code access.
                </div>
              </div>

              {/* Middle: Active Animated Communication Channel (4 cols) */}
              <div className="col-span-4 flex flex-col items-center justify-center space-y-8 px-4">
                
                {/* Outgoing Query Channel (Learner -> SUT) */}
                <div className="w-full relative">
                  <div className="flex items-center justify-between text-sm font-mono text-[#00f2fe] mb-2 font-bold">
                    <span>1. Output Query (σ)</span>
                    <span className="text-base font-black">──►</span>
                  </div>
                  <div className="w-full h-3 bg-[#12131f] rounded-full overflow-hidden relative border border-white/15">
                    <motion.div 
                      animate={pulseActive ? { x: ['-100%', '200%'] } : { x: '100%' }}
                      transition={{ duration: 1, ease: "linear" }}
                      className="absolute inset-0 w-32 bg-gradient-to-r from-transparent via-[#00f2fe] to-transparent rounded-full shadow-[0_0_20px_#00f2fe]"
                    />
                  </div>
                  <div className="text-[14px] font-mono text-white font-bold mt-2 text-center bg-white/5 py-1 rounded-md border border-white/10">
                    {queryDemos[simStep].queryLabel}
                  </div>
                </div>

                {/* Return Response Channel (SUT -> Learner) */}
                <div className="w-full relative">
                  <div className="flex items-center justify-between text-sm font-mono text-[#38ef7d] mb-2 font-bold">
                    <span className="text-base font-black">◄──</span>
                    <span>2. Emitted Output (ω)</span>
                  </div>
                  <div className="w-full h-3 bg-[#12131f] rounded-full overflow-hidden relative border border-white/15">
                    <motion.div 
                      animate={pulseActive ? { x: ['200%', '-100%'] } : { x: '-100%' }}
                      transition={{ duration: 1, ease: "linear", delay: 0.3 }}
                      className="absolute inset-0 w-32 bg-gradient-to-r from-transparent via-[#38ef7d] to-transparent rounded-full shadow-[0_0_20px_#38ef7d]"
                    />
                  </div>
                  <div className="text-[14px] font-mono text-[#38ef7d] font-bold mt-2 text-center bg-[#38ef7d]/10 py-1 rounded-md border border-[#38ef7d]/20">
                    {queryDemos[simStep].responseLabel}
                  </div>
                </div>

              </div>

              {/* Right Box: Teacher / SUT Cloud (4 cols) */}
              <div className="col-span-4 relative rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl min-h-[320px] flex flex-col justify-between p-8">
                <img 
                  src="/server_cluster.jpg" 
                  alt="Target Server Cluster Under Test" 
                  className="absolute inset-0 w-full h-full object-cover filter contrast-[1.2] brightness-[0.45]"
                />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3.5 py-1.5 rounded-md bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/40 text-xs font-mono font-bold uppercase tracking-wider">
                      TEACHER / ORACLE
                    </span>
                    <Server className="w-6 h-6 text-[#f59e0b]" />
                  </div>
                  <h4 className="text-[28px] font-black text-white">System Under Test (SUT)</h4>
                  <p className="text-[17px] text-white/90 mt-2 leading-relaxed">
                    The closed, opaque black-box target (TLS server, Smartcard chip, or Automotive ECU).
                  </p>
                </div>

                <div className="relative z-10 mt-6 p-4 rounded-xl bg-[#08080d]/90 backdrop-blur-md border border-white/20 text-sm font-mono text-white/90">
                  <span className="text-[#38ef7d] font-bold">Live Status:</span> {queryDemos[simStep].oracleStatus}
                </div>
              </div>

            </div>

            {/* Bottom Real-World Insight */}
            <div className="pt-5 border-t border-white/10 flex items-center justify-between text-[16px] font-mono">
              <span className="text-white/80">
                ⚡ <strong className="text-white">Active Paradigm:</strong> The learner drives the experimentation by injecting queries and observing emitted reactions.
              </span>
              <span className="text-white/60 text-xs px-4 py-2 rounded-full bg-white/5 border border-white/10">
                Click Next to unpack the Two Core Query Engines ➔
              </span>
            </div>
          </motion.div>
        )}

        {/* ────────────────────────────────────────────────────────────────── */}
        {/* STAGE 1: The Two Query Engines Unpacked (Side-by-Side)              */}
        {/* ────────────────────────────────────────────────────────────────── */}
        {stage === 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: presentationEase }}
            className="w-[1680px] p-8 rounded-3xl bg-[#0d0e17] border-2 border-[#00f2fe]/40 shadow-2xl flex flex-col justify-between max-h-[720px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#00f2fe]/15 border border-[#00f2fe]/40 flex items-center justify-center text-[#00f2fe]">
                  <Search className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-[28px] font-black text-white">The Two Core Query Engines</h3>
                  <p className="text-[16px] text-white/70">How the Learner Discovers States vs. How It Verifies Hypotheses</p>
                </div>
              </div>
              <span className="text-xs font-mono text-[#00f2fe] px-3.5 py-1.5 rounded-full bg-[#00f2fe]/10 border border-[#00f2fe]/30 font-bold uppercase tracking-wider">
                ACTIVE INFERENCE PILLARS
              </span>
            </div>

            {/* The 2 Query Cards with Rich Large Typography */}
            <div className="my-5 grid grid-cols-2 gap-8 items-stretch">
              
              {/* Card 1: Output Queries */}
              <div className="p-7 rounded-2xl bg-[#08080d] border border-[#00f2fe]/40 flex flex-col justify-between shadow-xl">
                <div>
                  <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#00f2fe]/20 text-[#00f2fe] font-mono font-black flex items-center justify-center text-base border border-[#00f2fe]/30">
                        ①
                      </div>
                      <h4 className="text-[24px] font-black text-white">Output Queries (Membership)</h4>
                    </div>
                    <span className="text-xs font-mono text-[#00f2fe] font-bold px-3 py-1 rounded bg-[#00f2fe]/15 border border-[#00f2fe]/30 uppercase tracking-wider">
                      STATE DISCOVERY
                    </span>
                  </div>

                  <p className="text-[16px] text-white/85 leading-relaxed mb-4">
                    The learner asks: <em>"If I send input sequence <code className="text-white font-mono font-bold">σ</code>, what exact reaction trace <code className="text-[#38ef7d] font-mono font-bold">ω</code> does the black box produce?"</em>
                  </p>

                  {/* Concrete Query Box with Large Font */}
                  <div className="p-4 rounded-2xl bg-[#12131e] border border-white/15 font-mono text-[15px] space-y-2.5 mb-4 shadow-inner">
                    <div className="flex items-center gap-3">
                      <span className="text-white/60 w-20 shrink-0 font-bold">Query :</span>
                      <span className="text-white font-bold bg-white/10 px-3 py-0.5 rounded-lg border border-white/10">
                        σ = (SYN, ACK, GET)
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[#38ef7d] w-20 shrink-0 font-bold">Reply :</span>
                      <span className="text-[#38ef7d] font-bold bg-[#38ef7d]/15 px-3 py-0.5 rounded-lg border border-[#38ef7d]/20">
                        ω = (SYN-ACK, ACK, 200 OK)
                      </span>
                    </div>
                  </div>

                  {/* Visual Node Diagram (Observation Tree branching) */}
                  <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center gap-4">
                    <GitFork className="w-7 h-7 text-[#00f2fe] shrink-0" />
                    <div className="text-[14px] text-white/80 leading-snug">
                      <strong className="text-white">Observation Tree Growth:</strong> Traces populate the Observation Table $(S, E)$ until it is proven <strong>closed</strong> and <strong>consistent</strong>.
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 text-[13px] text-[#00f2fe] font-mono font-semibold">
                  Used to systematically explore and separate distinct internal states.
                </div>
              </div>

              {/* Card 2: Equivalence Queries */}
              <div className="p-7 rounded-2xl bg-[#08080d] border border-[#f59e0b]/40 flex flex-col justify-between shadow-xl">
                <div>
                  <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#f59e0b]/20 text-[#f59e0b] font-mono font-black flex items-center justify-center text-base border border-[#f59e0b]/30">
                        ②
                      </div>
                      <h4 className="text-[24px] font-black text-white">Equivalence Queries (Testing)</h4>
                    </div>
                    <span className="text-xs font-mono text-[#f59e0b] font-bold px-3 py-1 rounded bg-[#f59e0b]/15 border border-[#f59e0b]/30 uppercase tracking-wider">
                      CONFORMANCE VERIFICATION
                    </span>
                  </div>

                  <p className="text-[16px] text-white/85 leading-relaxed mb-4">
                    The learner builds a candidate automaton <code className="text-white font-mono font-bold">ℋ</code> and asks: <em>"Is <code className="text-white font-mono font-bold">ℋ</code> mathematically isomorphic to the true target machine?"</em>
                  </p>

                  {/* Concrete Result Box with Large Font */}
                  <div className="p-4 rounded-2xl bg-[#12131e] border border-white/15 font-mono text-[15px] space-y-2.5 mb-4 shadow-inner">
                    <div className="flex items-center gap-3 text-[#38ef7d]">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span className="font-bold">If YES: Learning succeeds! Model is 100% complete.</span>
                    </div>
                    <div className="flex items-center gap-3 text-[#f59e0b]">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span className="font-bold">If NO : Returns counterexample string cex ∈ Σ*</span>
                    </div>
                  </div>

                  {/* Real World Approximation Note */}
                  <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center gap-4">
                    <ShieldCheck className="w-7 h-7 text-[#f59e0b] shrink-0" />
                    <div className="text-[14px] text-white/80 leading-snug">
                      <strong className="text-white">Real-World Conformance:</strong> Since real black boxes lack a magical teacher, equivalence is approximated via randomized fuzzing and the <strong>W-Method</strong>.
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 text-[13px] text-[#f59e0b] font-mono font-semibold">
                  Counterexamples force the learner to split states and discover hidden branches.
                </div>
              </div>

            </div>

            {/* Bottom Insight & Next Prompt */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[15px] font-mono">
              <span className="text-[#00f2fe] font-bold">
                💡 Result: Exact minimal state machine extracted in polynomial time $O(|Q|^2 \cdot |\Sigma| \cdot m)$.
              </span>
              <span className="text-white/60 text-xs px-4 py-2 rounded-full bg-white/5 border border-white/10">
                Click Next to advance to Observation Table ➔
              </span>
            </div>
          </motion.div>
        )}

      </div>

      {/* Clean Bottom Area without cluttered micro-citations */}
    </div>
  );
};
