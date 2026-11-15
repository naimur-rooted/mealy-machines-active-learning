import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Bug, AlertTriangle, Lock, ShieldAlert, Cpu, ArrowRight } from 'lucide-react';

export const Slide07TLSFuzzing: React.FC = () => {
  return (
    <div className="slide-dark-bg w-[1920px] h-[1080px] px-[80px] pt-[50px] pb-[60px] flex flex-col justify-between relative select-none overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/4 right-1/4 w-[800px] h-[600px] bg-red-600/8 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[700px] h-[500px] bg-[#00f2fe]/6 rounded-full blur-[180px] pointer-events-none" />

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 1. HERO HEADER: Docked & High-Impact                                  */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="z-20 flex flex-col">
        <div className="flex items-center gap-2.5 text-[14px] font-semibold tracking-[0.2em] uppercase text-red-400 font-mono mb-2">
          <ShieldAlert className="w-4 h-4" />
          <span>ACT IV • INDUSTRIAL SECURITY VERIFICATION</span>
        </div>
        <h2 className="text-[52px] font-black text-white tracking-tight leading-tight">
          Breaking TLS: Protocol State Fuzzing
        </h2>
        <p className="text-white/70 text-[20px] mt-1.5 font-light max-w-[1500px]">
          J. de Ruiter and E. Poll, <em className="text-white">"Protocol State Fuzzing of TLS Implementations"</em>, USENIX Security (2015).
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 2. GRAND 2-COLUMN VIEW                                                */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-12 gap-8 my-auto z-10 w-full max-w-[1760px] items-stretch">
        
        {/* LEFT COLUMN: Metric Impact & Blindspot Analysis (5 cols) */}
        <div className="col-span-5 flex flex-col justify-between gap-6">
          
          {/* Flaw Metric Card */}
          <div className="p-8 rounded-3xl bg-[#0d0e17] border-2 border-red-500/40 shadow-2xl relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-44 h-44 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-center gap-2.5 text-red-400 text-[16px] font-black uppercase font-mono tracking-wider mb-2">
              <Bug className="w-5 h-5" />
              <span>Real-World Zero-Day Flaws</span>
            </div>
            
            <div className="text-[76px] font-black font-mono text-white tracking-tight leading-none my-2">
              <span className="text-red-500">9</span> <span className="text-[44px] text-white/90">Critical Flaws</span>
            </div>

            <p className="text-white/85 text-[18px] leading-relaxed mt-4">
              Synthesized Mealy automata exposed severe protocol logic vulnerabilities across world-standard libraries: <strong className="text-white">OpenSSL, Java JSSE, GnuTLS, and RSA BSAFE</strong>.
            </p>
          </div>

          {/* Blindspot Insight */}
          <div className="p-7 rounded-3xl bg-[#0d0e17] border border-white/15 shadow-xl flex flex-col justify-between">
            <div className="flex items-center gap-2.5 text-[20px] font-bold text-white mb-3">
              <Lock className="w-6 h-6 text-[#00f2fe]" />
              <span>Why Millions of Tests Missed It:</span>
            </div>
            <p className="text-[17px] text-white/80 leading-relaxed">
              Standard automated unit tests only exercised the happy paths (<code className="text-white font-mono font-bold bg-white/10 px-2 py-0.5 rounded">ClientHello ➔ ServerHello ➔ Finished</code>). None explored out-of-order state transitions like receiving <strong className="text-red-400">Heartbeat</strong> or <strong className="text-red-400">ChangeCipherSpec</strong> mid-handshake.
            </p>
          </div>

        </div>

        {/* RIGHT COLUMN: The OpenSSL Anomaly Anatomy (7 cols) */}
        <div className="col-span-7 p-8 rounded-3xl bg-[#0d0e17] border-2 border-white/20 flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-4">
              <span className="text-[16px] font-mono uppercase text-[#00f2fe] tracking-wider font-bold">
                Case Highlight: OpenSSL State Machine Anomaly
              </span>
              <span className="text-sm font-mono text-red-400 font-bold px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30">
                CVE-2014-0224
              </span>
            </div>

            {/* Trace Comparison Box */}
            <div className="p-6 rounded-2xl bg-[#08080d] border border-white/15 space-y-4 font-mono shadow-inner">
              <div>
                <div className="text-white/50 text-[14px] mb-1.5">// Expected RFC Compliant Handshake:</div>
                <div className="text-white text-[16px] font-bold bg-white/5 p-3 rounded-xl border border-white/10">
                  ClientHello ──► ServerHello ──► KeyExchange ──► Finished ──► <span className="text-[#38ef7d]">[Encrypted Channel]</span>
                </div>
              </div>

              <div>
                <div className="text-red-400 font-bold text-[14px] mb-1.5">// The Learned Mealy Machine Exposed in Live Silicon:</div>
                <div className="p-4 rounded-xl bg-red-950/40 border-2 border-red-500/50 text-red-200">
                  <div className="text-[17px] font-black text-red-300">
                    ClientHello ──► <span className="text-white bg-red-500/40 px-2 py-0.5 rounded">ChangeCipherSpec</span> ──► AppData Emitted!
                  </div>
                  <div className="mt-3 text-[16px] font-sans text-white/90 leading-snug">
                    🚨 <strong className="text-red-400">Critical Authentication Bypass:</strong> OpenSSL switched to decrypted communication prematurely before cryptographic key exchange was verified!
                  </div>
                </div>
              </div>
            </div>

            {/* Methodology Badges */}
            <div className="mt-6 grid grid-cols-2 gap-4 text-[16px]">
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

          <div className="mt-6 pt-4 border-t border-white/10 text-[15px] text-white/70 flex items-center justify-between font-mono">
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
