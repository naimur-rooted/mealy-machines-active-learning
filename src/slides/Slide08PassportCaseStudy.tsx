import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Zap, CheckCircle2, AlertOctagon, Cpu, ShieldCheck } from 'lucide-react';

export const Slide08PassportCaseStudy: React.FC = () => {
  return (
    <div className="slide-dark-bg w-[1920px] h-[1080px] px-[80px] pt-[50px] pb-[60px] flex flex-col justify-between relative select-none overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-[800px] h-[600px] bg-[#00f2fe]/8 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[700px] h-[500px] bg-[#38ef7d]/6 rounded-full blur-[180px] pointer-events-none" />

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 1. HERO HEADER: Docked & High-Impact                                  */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="z-20 flex flex-col">
        <div className="flex items-center gap-2.5 text-[14px] font-semibold tracking-[0.2em] uppercase text-[#00f2fe] font-mono mb-2">
          <CreditCard className="w-4 h-4" />
          <span>ACT IV • EMBEDDED HARDWARE VERIFICATION</span>
        </div>
        <h2 className="text-[52px] font-black text-white tracking-tight leading-tight">
          Reverse-Engineering the Biometric e-Passport
        </h2>
        <p className="text-white/70 text-[20px] mt-1.5 font-light max-w-[1500px]">
          Radboud University Benchmark: Model learning of embedded RFID smartcard chips (Aarts, Jonsson, Vaandrager).
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 2. GRAND 2-COLUMN VIEW                                                */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-12 gap-8 my-auto z-10 w-full max-w-[1760px] items-stretch">
        
        {/* LEFT COLUMN: Inference Speed & Fidelity (5 cols) */}
        <div className="col-span-5 flex flex-col justify-between gap-6">
          
          {/* Main Speed Card */}
          <div className="p-8 rounded-3xl bg-[#0d0e17] border-2 border-[#00f2fe]/40 shadow-2xl relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-44 h-44 bg-[#00f2fe]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-center gap-2.5 text-[#00f2fe] text-[16px] font-black uppercase font-mono tracking-wider mb-2">
              <Zap className="w-5 h-5" />
              <span>Full Black-Box Extraction Time</span>
            </div>
            
            <div className="text-[76px] font-black font-mono text-white tracking-tight leading-none my-2">
              <span className="text-[#00f2fe]">&lt; 1</span> <span className="text-[44px] text-white/90">Hour</span>
            </div>

            <p className="text-white/85 text-[18px] leading-relaxed mt-4">
              Complete Mealy state machine extracted over physical radio frequency (RFID) without opening the casing, modifying hardware, or reading proprietary firmware code.
            </p>
          </div>

          {/* Model Fidelity Card */}
          <div className="p-7 rounded-3xl bg-[#0d0e17] border border-white/15 shadow-xl flex flex-col justify-between">
            <div className="flex items-center gap-2.5 text-[20px] font-bold text-white mb-3">
              <Cpu className="w-6 h-6 text-[#38ef7d]" />
              <span>Model Scale & Human Equivalence:</span>
            </div>
            <p className="text-[17px] text-white/80 leading-relaxed">
              The synthesized Mealy machine achieved 100% state count and architectural equivalence to formal models hand-constructed by senior security researchers over <strong className="text-white">several months</strong>.
            </p>
          </div>

        </div>

        {/* RIGHT COLUMN: Real-World Discoveries (7 cols) */}
        <div className="col-span-7 p-8 rounded-3xl bg-[#0d0e17] border-2 border-white/20 flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-4">
              <span className="text-[16px] font-mono uppercase text-[#38ef7d] tracking-wider font-bold">
                Experimental Findings & Security Consequences
              </span>
              <span className="text-sm font-mono text-[#00f2fe] font-bold px-3 py-1 rounded-full bg-[#00f2fe]/10 border border-[#00f2fe]/30">
                ICAO 9303 Doc Standard
              </span>
            </div>

            <div className="space-y-4">
              {/* Finding 1 */}
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-4">
                <CheckCircle2 className="w-7 h-7 text-[#38ef7d] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[20px] font-bold text-white">Mathematical Conformance Guaranteed</div>
                  <div className="text-[16px] text-white/75 mt-1 leading-snug">
                    Proved whether commercial biometric passport chips deployed by European issuing authorities complied strictly with formal UN/ICAO specifications.
                  </div>
                </div>
              </div>

              {/* Finding 2 */}
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-[#ffaa00]/30 flex items-start gap-4">
                <AlertOctagon className="w-7 h-7 text-[#ffaa00] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[20px] font-bold text-white">Cross-Nation Behavioral Fingerprinting</div>
                  <div className="text-[16px] text-white/75 mt-1 leading-snug">
                    Passports from different countries displayed divergent Mealy transitions upon receiving invalid security certificates—allowing passive RFID scanners to <strong className="text-[#ffaa00]">fingerprint a traveler's nationality</strong> without credentials!
                  </div>
                </div>
              </div>

              {/* Finding 3 */}
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-4">
                <ShieldCheck className="w-7 h-7 text-[#00f2fe] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[20px] font-bold text-white">Continuous Firmware Regression Auditing</div>
                  <div className="text-[16px] text-white/75 mt-1 leading-snug">
                    Issuers now run automated Mealy learning pipelines on every firmware iteration to mathematically guarantee that zero backdoors or state regressions are introduced.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 text-[15px] text-white/70 flex items-center justify-between font-mono">
            <span>Published in: Formal Methods in System Design & Radboud Research</span>
            <span className="text-[#38ef7d] font-bold">100% Automated Conformance</span>
          </div>
        </div>

      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 3. DOCKED FOOTER                                                      */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="z-20 pt-4 border-t border-white/10 flex items-center justify-between text-[16px] text-white/70 font-mono">
        <span>Hardware Verification via Reactive Mealy Transducers</span>
        <span className="font-mono text-white/80">Physical ISO/IEC 14443 Smartcard Channel</span>
      </div>
    </div>
  );
};
