import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert,
  Bug,
  Lock,
  Unlock,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Radio,
  ArrowRight,
  Zap,
  Terminal,
  ShieldCheck
} from 'lucide-react';

export const Slide07TLSFuzzing: React.FC = () => {
  const [mode, setMode] = useState<'normal' | 'exploit'>('exploit');
  const [animStep, setAnimStep] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);

  // Auto animation sequence for the active mode
  useEffect(() => {
    setAnimStep(0);
    setIsSimulating(true);

    const step1 = setTimeout(() => setAnimStep(1), 500);   // ClientHello
    const step2 = setTimeout(() => setAnimStep(2), 1600);  // ServerHello or CCS injection
    const step3 = setTimeout(() => setAnimStep(3), 2700);  // KeyExchange / Bypass
    const step4 = setTimeout(() => {
      setAnimStep(4);
      setIsSimulating(false);
    }, 3800);  // Final outcome

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(step3);
      clearTimeout(step4);
    };
  }, [mode]);

  const restartSimulation = (targetMode: 'normal' | 'exploit') => {
    setMode(targetMode);
  };

  return (
    <div className="slide-dark-bg w-[1920px] h-[1080px] px-[80px] pt-[45px] pb-[55px] flex flex-col justify-between relative select-none overflow-hidden">
      {/* Ambient background glow */}
      <div className={`absolute top-1/4 right-1/4 w-[850px] h-[650px] rounded-full blur-[200px] pointer-events-none transition-colors duration-700 ${
        mode === 'exploit' ? 'bg-red-600/12' : 'bg-emerald-600/12'
      }`} />
      <div className="absolute bottom-1/4 left-1/4 w-[750px] h-[550px] bg-[#00f2fe]/8 rounded-full blur-[200px] pointer-events-none" />

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 1. HERO HEADER                                                        */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="z-20 flex flex-col">
        <div className="flex items-center gap-2.5 text-[14px] font-semibold tracking-[0.2em] uppercase text-red-400 font-mono mb-2">
          <ShieldAlert className="w-4 h-4 text-red-400" />
          <span>ACT IV • INDUSTRIAL SECURITY VERIFICATION</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[50px] font-black text-white tracking-tight leading-tight font-heading">
              Breaking TLS: Protocol State Fuzzing
            </h2>
            <p className="text-white/75 text-[20px] mt-1 font-light max-w-[1400px]">
              J. de Ruiter and E. Poll, <em className="text-white">"Protocol State Fuzzing of TLS Implementations"</em>, USENIX Security (2015).
            </p>
          </div>

          {/* Interactive Mode Toggle Bar */}
          <div className="flex items-center gap-3 p-1.5 rounded-2xl bg-[#090b14] border-2 border-white/20 shadow-2xl">
            <button
              onClick={() => restartSimulation('normal')}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-[16px] transition-all duration-300 font-sans ${
                mode === 'normal'
                  ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/30'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <ShieldCheck className="w-5 h-5" />
              <span>1. Expected RFC Path</span>
            </button>

            <button
              onClick={() => restartSimulation('exploit')}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-[16px] transition-all duration-300 font-sans ${
                mode === 'exploit'
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/40 ring-2 ring-red-400/50'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Bug className="w-5 h-5" />
              <span>2. Active Fuzzing Exploit (CVE-2014-0224)</span>
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 2. GRAND 2-COLUMN VIEW                                                */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-12 gap-8 my-auto z-10 w-full max-w-[1760px] items-stretch">
        
        {/* LEFT COLUMN: Metric Impact & Fuzzing Oracle (5 cols) */}
        <div className="col-span-5 flex flex-col justify-between gap-6">
          
          {/* Flaw Metric Card */}
          <div className="p-7 rounded-3xl bg-[#0d0e17] border-2 border-red-500/40 shadow-2xl relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-44 h-44 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5 text-red-400 text-[15px] font-black uppercase font-mono tracking-wider">
                <Bug className="w-5 h-5" />
                <span>Real-World Zero-Day Flaws</span>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 font-bold">
                USENIX Award Winner
              </span>
            </div>
            
            <div className="text-[72px] font-black font-mono text-white tracking-tight leading-none my-2">
              <span className="text-red-500">9</span> <span className="text-[40px] text-white/90">Critical Flaws</span>
            </div>

            <p className="text-white/85 text-[17px] leading-relaxed mt-3">
              Synthesized Mealy automata exposed severe protocol logic vulnerabilities across world-standard libraries: <strong className="text-white">OpenSSL, Java JSSE, GnuTLS, and RSA BSAFE</strong>.
            </p>
          </div>

          {/* Live Automated Fuzzer Log Card */}
          <div className="p-6 rounded-3xl bg-[#0a0b12] border border-white/15 shadow-xl flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5 text-[18px] font-bold text-white">
                <Terminal className="w-5 h-5 text-[#00f2fe]" />
                <span className="font-heading">Active Learning Oracle (LearnLib)</span>
              </div>
              <span className="flex items-center gap-1.5 text-xs font-mono text-cyan-300 bg-cyan-950/60 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                <Radio className="w-3 h-3 animate-pulse text-cyan-400" />
                <span>Live State Invariant Check</span>
              </span>
            </div>

            {/* Simulated Query Stream */}
            <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 font-mono text-[13px] space-y-2">
              <div className="text-white/50 flex items-center justify-between">
                <span>[TEST #1418] ClientHello → Heartbeat</span>
                <span className="text-emerald-400 font-bold">PASS (Handshake Reject)</span>
              </div>
              <div className="text-white/50 flex items-center justify-between">
                <span>[TEST #1419] ClientHello → ServerKeyExchange</span>
                <span className="text-emerald-400 font-bold">PASS (Wait Order)</span>
              </div>
              <div className={`p-2 rounded-lg flex items-center justify-between transition-all duration-300 ${
                mode === 'exploit'
                  ? 'bg-red-950/80 border border-red-500/60 text-red-200'
                  : 'bg-white/5 border border-white/10 text-white/70'
              }`}>
                <span className="font-bold flex items-center gap-1.5">
                  <Zap className={`w-3.5 h-3.5 ${mode === 'exploit' ? 'text-red-400 animate-bounce' : 'text-white/40'}`} />
                  [TEST #1420] ClientHello → ChangeCipherSpec
                </span>
                <span className={`font-black ${mode === 'exploit' ? 'text-red-400 animate-pulse' : 'text-white/50'}`}>
                  {mode === 'exploit' ? 'CRITICAL DIVERGENCE!' : 'CHECKING...'}
                </span>
              </div>
            </div>

            <p className="text-[15px] text-white/70 mt-3 leading-snug">
              Active learning discovered that unit test suites only exercised standard paths, completely missing dangerous out-of-order transitions.
            </p>
          </div>

        </div>

        {/* RIGHT COLUMN: Interactive Handshake Pipeline Simulator (7 cols) */}
        <div className={`col-span-7 p-7 rounded-3xl bg-[#0d0e17] border-2 shadow-2xl flex flex-col justify-between transition-all duration-500 ${
          mode === 'exploit' ? 'border-red-500/50' : 'border-emerald-500/50'
        }`}>
          <div>
            {/* Pipeline Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-3">
                <span className={`text-[17px] font-mono uppercase tracking-wider font-bold ${
                  mode === 'exploit' ? 'text-red-400' : 'text-emerald-400'
                }`}>
                  {mode === 'exploit'
                    ? '⚠️ CVE-2014-0224: OpenSSL Early ChangeCipherSpec Attack'
                    : '🛡️ RFC 5246: Standard Compliant TLS Handshake'}
                </span>
              </div>

              <button
                onClick={() => restartSimulation(mode)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-all"
                title="Restart Handshake Trace Animation"
              >
                <RotateCcw className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
                <span>Replay Protocol Trace</span>
              </button>
            </div>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* GRAPHICAL PROTOCOL STEP PIPELINE                            */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <div className="p-6 rounded-2xl bg-[#07080e] border border-white/15 relative overflow-hidden shadow-inner min-h-[300px] flex flex-col justify-between">
              
              {/* Stepper Status Badge */}
              <div className="flex items-center justify-between text-xs font-mono mb-4">
                <span className="text-white/60">HANDSHAKE PACKET FLOW SIMULATION:</span>
                <span className={`px-2.5 py-0.5 rounded-full font-bold ${
                  mode === 'exploit' ? 'bg-red-500/20 text-red-300 border border-red-500/40' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}>
                  Step {Math.min(animStep, 3)} of 3 Complete
                </span>
              </div>

              {/* Protocol Step Cards Row */}
              <div className="grid grid-cols-3 gap-4 relative z-10">
                
                {/* STEP 1: ClientHello */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: animStep >= 1 ? 1 : 0.35,
                    scale: animStep === 1 ? 1.04 : 1,
                    borderColor: animStep >= 1 ? '#00f2fe' : 'rgba(255,255,255,0.1)'
                  }}
                  className="p-4 rounded-xl bg-[#0f111f] border-2 flex flex-col justify-between relative shadow-lg"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400 font-bold mb-1">
                    <span>STEP 01</span>
                    <span>CLIENT ➔</span>
                  </div>
                  <div className="text-[17px] font-mono font-bold text-white">ClientHello</div>
                  <div className="text-[13px] text-white/70 mt-2">
                    Client offers supported cipher suites and session ID.
                  </div>
                  {animStep >= 1 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-black font-bold text-xs"
                    >
                      ✓
                    </motion.div>
                  )}
                </motion.div>

                {/* STEP 2: KeyExchange OR Injected CCS */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: animStep >= 2 ? 1 : 0.35,
                    scale: animStep === 2 ? 1.04 : 1,
                    borderColor: mode === 'exploit'
                      ? (animStep >= 2 ? '#ef4444' : 'rgba(255,255,255,0.1)')
                      : (animStep >= 2 ? '#10b981' : 'rgba(255,255,255,0.1)')
                  }}
                  className={`p-4 rounded-xl flex flex-col justify-between relative shadow-lg border-2 ${
                    mode === 'exploit' ? 'bg-red-950/30' : 'bg-[#0f111f]'
                  }`}
                >
                  <div className={`flex items-center justify-between text-[11px] font-mono font-bold mb-1 ${
                    mode === 'exploit' ? 'text-red-400' : 'text-emerald-400'
                  }`}>
                    <span>STEP 02</span>
                    <span>{mode === 'exploit' ? '⚠️ ATTACK INJECT' : 'SERVER ➔'}</span>
                  </div>
                  
                  <div className={`text-[17px] font-mono font-bold ${
                    mode === 'exploit' ? 'text-red-300' : 'text-white'
                  }`}>
                    {mode === 'exploit' ? 'ChangeCipherSpec' : 'ServerKeyExchange'}
                  </div>

                  <div className="text-[13px] text-white/70 mt-2">
                    {mode === 'exploit'
                      ? 'Out-of-order injection! Key exchange was deliberately skipped!'
                      : 'Cryptographic public keys verified and pre-master secret derived.'}
                  </div>

                  {animStep >= 2 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs ${
                        mode === 'exploit' ? 'bg-red-500 text-white' : 'bg-emerald-500 text-black'
                      }`}
                    >
                      {mode === 'exploit' ? '!' : '✓'}
                    </motion.div>
                  )}
                </motion.div>

                {/* STEP 3: Channel Outcome */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: animStep >= 3 ? 1 : 0.35,
                    scale: animStep >= 3 ? 1.04 : 1,
                    borderColor: mode === 'exploit'
                      ? (animStep >= 3 ? '#ef4444' : 'rgba(255,255,255,0.1)')
                      : (animStep >= 3 ? '#10b981' : 'rgba(255,255,255,0.1)')
                  }}
                  className={`p-4 rounded-xl flex flex-col justify-between relative shadow-lg border-2 ${
                    mode === 'exploit' ? 'bg-red-950/50' : 'bg-emerald-950/30'
                  }`}
                >
                  <div className={`flex items-center justify-between text-[11px] font-mono font-bold mb-1 ${
                    mode === 'exploit' ? 'text-red-400' : 'text-emerald-400'
                  }`}>
                    <span>OUTCOME</span>
                    <span>{mode === 'exploit' ? '💥 BROKEN' : '🔒 SECURE'}</span>
                  </div>

                  <div className={`text-[17px] font-mono font-bold flex items-center gap-2 ${
                    mode === 'exploit' ? 'text-red-300' : 'text-emerald-300'
                  }`}>
                    {mode === 'exploit' ? (
                      <>
                        <Unlock className="w-5 h-5 text-red-400 animate-pulse" />
                        <span>Decrypted AppData!</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5 text-emerald-400" />
                        <span>Encrypted Channel</span>
                      </>
                    )}
                  </div>

                  <div className="text-[13px] text-white/70 mt-2">
                    {mode === 'exploit'
                      ? 'Server emitted raw payload using zero/uninitialized session key!'
                      : 'Authenticated symmetrical encryption ready for secure transfer.'}
                  </div>

                  {animStep >= 3 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs ${
                        mode === 'exploit' ? 'bg-red-500 text-white' : 'bg-emerald-500 text-black'
                      }`}
                    >
                      {mode === 'exploit' ? '✕' : '✓'}
                    </motion.div>
                  )}
                </motion.div>

              </div>

              {/* Dynamic Exploit Callout Alert */}
              <AnimatePresence mode="wait">
                {mode === 'exploit' && animStep >= 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 p-3.5 rounded-xl bg-red-900/40 border-2 border-red-500/80 flex items-center gap-3.5 shadow-lg"
                  >
                    <AlertTriangle className="w-8 h-8 text-red-400 shrink-0 animate-bounce" />
                    <div>
                      <div className="text-red-300 font-bold text-[15px] font-mono">
                        🚨 VULNERABILITY EXPOSED: Premature State Transition in OpenSSL
                      </div>
                      <div className="text-white/90 text-[14px] mt-0.5 leading-snug">
                        By accepting <code className="bg-red-500/30 text-white px-1.5 py-0.5 rounded font-mono text-[13px]">ChangeCipherSpec</code> early, OpenSSL synthesized an unencrypted master secret, allowing passive Man-In-The-Middle attackers to decrypt all traffic!
                      </div>
                    </div>
                  </motion.div>
                )}

                {mode === 'normal' && animStep >= 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 p-3.5 rounded-xl bg-emerald-900/30 border border-emerald-500/60 flex items-center gap-3.5 shadow-lg"
                  >
                    <CheckCircle2 className="w-7 h-7 text-emerald-400 shrink-0" />
                    <div>
                      <div className="text-emerald-300 font-bold text-[15px] font-mono">
                        STANDARD CONFORMANCE: Full Cryptographic Handshake Verified
                      </div>
                      <div className="text-white/85 text-[14px] mt-0.5">
                        Both parties successfully verify digital signatures and establish symmetric keys before any application data is sent.
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* Methodology Badges */}
            <div className="mt-5 grid grid-cols-2 gap-4 text-[15px]">
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                <span className="text-[#00f2fe] font-bold block mb-1 font-mono">Active Fuzzing Harness</span>
                Learned full Mealy machine automatically with LearnLib test harness without manual code instrumentation.
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                <span className="text-[#38ef7d] font-bold block mb-1 font-mono">Formal Equivalence</span>
                Compared inferred state machine directly against ICAO / RFC standard models to prove divergence.
              </div>
            </div>
          </div>

          {/* Card Footer */}
          <div className="mt-4 pt-3 border-t border-white/10 text-[15px] text-white/70 flex items-center justify-between font-mono">
            <span>Result: Upstream patches deployed across major international security infrastructure.</span>
            <span className="text-[#38ef7d] font-bold">100% Mitigated</span>
          </div>
        </div>

      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 3. DOCKED FOOTER                                                      */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="z-20 pt-4 border-t border-white/10 flex items-center justify-between text-[16px] text-white/70 font-mono">
        <span>USENIX Security Outstanding Research Milestone</span>
        <span className="font-mono text-white/80">Tool: LearnLib + State Fuzzing Adapter</span>
      </div>
    </div>
  );
};
