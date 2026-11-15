import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCard,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  Wifi,
  ShieldCheck,
  RotateCcw,
  Radio,
  FileBadge2,
  Lock,
  Search
} from 'lucide-react';

interface PassportProfile {
  id: 'germany' | 'netherlands' | 'uk';
  country: string;
  flag: string;
  chipModel: string;
  swCode: string;
  stateResult: string;
  statusColor: string;
  fingerprintVerdict: string;
  explanation: string;
}

const PASSPORT_PROFILES: PassportProfile[] = [
  {
    id: 'germany',
    country: 'Germany (BSI Standard)',
    flag: '🇩🇪',
    chipModel: 'Infineon SLE78 / BAC v1.1',
    swCode: 'SW 69 82 (Security Status Not Satisfied)',
    stateResult: 'State → HARD_LOCK (Re-Auth Required)',
    statusColor: 'text-amber-400',
    fingerprintVerdict: 'SIGNATURE A: German Implementation Fingerprint Identified!',
    explanation: 'Terminates BAC session immediately upon malformed signature. Resets cryptographic session keys to zero.'
  },
  {
    id: 'netherlands',
    country: 'Netherlands (Sagem Morpho)',
    flag: '🇳🇱',
    chipModel: 'NXP SmartMX / EAC v1.11',
    swCode: 'SW 6A 88 (Referenced Data Not Found)',
    stateResult: 'State → DEGRADED_WAIT (Silent Drop)',
    statusColor: 'text-cyan-400',
    fingerprintVerdict: 'SIGNATURE B: Dutch Implementation Fingerprint Identified!',
    explanation: 'Returns data-not-found error code instead of security violation. State machine remains in intermediate unauthenticated wait.'
  },
  {
    id: 'uk',
    country: 'United Kingdom (HMPO)',
    flag: '🇬🇧',
    chipModel: 'Gemalto Upteq / BAC v1.0',
    swCode: 'SW 67 00 (Wrong Length Expected)',
    stateResult: 'State → SOFT_RESET (Warning Echo)',
    statusColor: 'text-purple-400',
    fingerprintVerdict: 'SIGNATURE C: UK Implementation Fingerprint Identified!',
    explanation: 'Fails length validation prior to cryptographic verification, leaking distinct pre-authentication transition behavior.'
  }
];

export const Slide08PassportCaseStudy: React.FC = () => {
  const [selectedPassport, setSelectedPassport] = useState<PassportProfile>(PASSPORT_PROFILES[0]);
  const [scanStep, setScanStep] = useState<number>(0);
  const [isScanning, setIsScanning] = useState<boolean>(false);

  const runScan = (profile: PassportProfile) => {
    setSelectedPassport(profile);
    setIsScanning(true);
    setScanStep(0);

    const t1 = setTimeout(() => setScanStep(1), 500);  // RFID Carrier established
    const t2 = setTimeout(() => setScanStep(2), 1500); // APDU stimulus sent
    const t3 = setTimeout(() => {
      setScanStep(3); // Response and fingerprint
      setIsScanning(false);
    }, 2600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  };

  useEffect(() => {
    runScan(PASSPORT_PROFILES[0]);
  }, []);

  return (
    <div className="slide-dark-bg w-[1920px] h-[1080px] px-[80px] pt-[45px] pb-[55px] flex flex-col justify-between relative select-none overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-[800px] h-[600px] bg-[#00f2fe]/8 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[750px] h-[550px] bg-[#ffaa00]/8 rounded-full blur-[200px] pointer-events-none" />

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 1. HERO HEADER                                                        */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="z-20 flex flex-col">
        <div className="flex items-center gap-2.5 text-[14px] font-semibold tracking-[0.2em] uppercase text-[#00f2fe] font-mono mb-2">
          <CreditCard className="w-4 h-4 text-[#00f2fe]" />
          <span>ACT IV • EMBEDDED HARDWARE VERIFICATION</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[50px] font-black text-white tracking-tight leading-tight font-heading">
              Reverse-Engineering the Biometric e-Passport
            </h2>
            <p className="text-white/75 text-[20px] mt-1 font-light max-w-[1400px]">
              Radboud University Benchmark: Model learning of embedded RFID smartcard chips (Aarts, Jonsson, Vaandrager).
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/80 font-mono text-sm">
            <Radio className="w-4 h-4 text-[#00f2fe] animate-pulse" />
            <span>ISO/IEC 14443 Type-A/B Air Interface</span>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 2. GRAND 2-COLUMN VIEW                                                */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-12 gap-8 my-auto z-10 w-full max-w-[1760px] items-stretch">
        
        {/* LEFT COLUMN: Physical Black-Box Benchmark (5 cols) */}
        <div className="col-span-5 flex flex-col justify-between gap-6">
          
          {/* Main Benchmark Metric Card */}
          <div className="p-7 rounded-3xl bg-[#0d0e17] border-2 border-[#00f2fe]/40 shadow-2xl relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-44 h-44 bg-[#00f2fe]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5 text-[#00f2fe] text-[15px] font-black uppercase font-mono tracking-wider">
                <Zap className="w-5 h-5" />
                <span>Full Black-Box Extraction Time</span>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[#00f2fe]/15 text-[#00f2fe] border border-[#00f2fe]/30 font-bold">
                Physical Airwaves
              </span>
            </div>
            
            <div className="text-[72px] font-black font-mono text-white tracking-tight leading-none my-2">
              <span className="text-[#00f2fe]">&lt; 1</span> <span className="text-[40px] text-white/90">Hour</span>
            </div>

            <p className="text-white/85 text-[17px] leading-relaxed mt-3">
              Complete Mealy state machine extracted over contactless radio frequency (RFID) without opening the casing, modifying hardware, or reading proprietary firmware code.
            </p>
          </div>

          {/* Speed & Labor Comparison Gauge */}
          <div className="p-6 rounded-3xl bg-[#0a0b12] border border-white/15 shadow-xl flex flex-col justify-between">
            <div className="flex items-center gap-2.5 text-[18px] font-bold text-white mb-3">
              <Cpu className="w-5 h-5 text-[#38ef7d]" />
              <span className="font-heading">Automata Synthesis vs Human Cryptographers</span>
            </div>

            <div className="space-y-4 font-mono">
              <div>
                <div className="flex justify-between text-xs text-white/60 mb-1">
                  <span>HUMAN EXPERT MANUAL AUDIT (Reading 500-pg ISO spec):</span>
                  <span className="text-amber-400 font-bold">~ 3 to 6 Months</span>
                </div>
                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-amber-500/80 rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-white/60 mb-1">
                  <span>ACTIVE MEALY LEARNING (Automated L* Transducer):</span>
                  <span className="text-[#38ef7d] font-bold">&lt; 54 Minutes (100% Precision)</span>
                </div>
                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-[12%] h-full bg-[#38ef7d] rounded-full shadow-[0_0_12px_#38ef7d]" />
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center gap-3 text-xs text-white/70">
              <Lock className="w-4 h-4 text-[#00f2fe] shrink-0" />
              <span>
                <strong>Anti-Tamper Silicon Barrier:</strong> Physical decapping or etching with acid destroys memory sensors. Wireless black-box testing is the only safe method.
              </span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Interactive Contactless RFID Scanner Rig (7 cols) */}
        <div className="col-span-7 p-7 rounded-3xl bg-[#0d0e17] border-2 border-white/20 shadow-2xl flex flex-col justify-between">
          <div>
            {/* Rig Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2.5">
                <Wifi className="w-5 h-5 text-[#00f2fe]" />
                <span className="text-[17px] font-mono uppercase text-[#38ef7d] tracking-wider font-bold">
                  Live RFID Test Rig: Behavioral Fingerprinting
                </span>
              </div>

              <span className="text-sm font-mono text-[#00f2fe] font-bold px-3 py-1 rounded-full bg-[#00f2fe]/10 border border-[#00f2fe]/30">
                ICAO 9303 Doc Standard
              </span>
            </div>

            {/* Country Selector Tabs */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {PASSPORT_PROFILES.map((p) => {
                const isActive = selectedPassport.id === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => runScan(p)}
                    className={`p-3.5 rounded-2xl border-2 flex items-center justify-between transition-all duration-300 font-sans text-left ${
                      isActive
                        ? 'bg-white/10 border-[#00f2fe] shadow-lg shadow-[#00f2fe]/20 text-white'
                        : 'bg-black/30 border-white/10 text-white/60 hover:text-white hover:border-white/20'
                    }`}
                  >
                    <div>
                      <div className="text-[16px] font-bold flex items-center gap-2">
                        <span>{p.flag}</span>
                        <span>{p.country.split(' ')[0]}</span>
                      </div>
                      <div className="text-[12px] font-mono text-white/50 mt-0.5">
                        {p.chipModel.split('/')[0]}
                      </div>
                    </div>
                    {isActive && (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#00f2fe] shadow-[0_0_8px_#00f2fe]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* INTERACTIVE RFID SCANNER CANVAS                               */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <div className="p-6 rounded-2xl bg-[#07080e] border border-white/15 relative overflow-hidden shadow-inner min-h-[300px] flex flex-col justify-between">
              
              {/* Wireless Wave Animation */}
              <div className="flex items-center justify-between text-xs font-mono text-white/60 mb-2">
                <span>WIRELESS APDU QUERY STIMULUS:</span>
                <button
                  onClick={() => runScan(selectedPassport)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-all"
                >
                  <RotateCcw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
                  <span>Transmit Radio Signal</span>
                </button>
              </div>

              {/* Graphical Transceiver Nodes */}
              <div className="grid grid-cols-12 gap-4 items-center my-2 relative">
                
                {/* 1. RFID Reader Node (3 cols) */}
                <div className="col-span-3 p-4 rounded-xl bg-[#0f111f] border-2 border-[#00f2fe]/40 text-center relative shadow-lg">
                  <div className="text-xs font-mono text-[#00f2fe] font-bold mb-1">RFID SCANNER</div>
                  <Radio className="w-8 h-8 text-[#00f2fe] mx-auto my-1 animate-pulse" />
                  <div className="text-[12px] font-mono text-white/70">13.56 MHz Carrier</div>
                  <div className="text-[11px] text-cyan-300 font-bold mt-1">Learner Oracle</div>
                </div>

                {/* 2. Airwave Beam (6 cols) */}
                <div className="col-span-6 flex flex-col items-center justify-center px-2">
                  <div className="text-[11px] font-mono text-white/50 mb-1">
                    APDU: <code className="text-amber-400 font-bold">VerifyCert(Malformed)</code>
                  </div>
                  
                  {/* Animated Wave Packet */}
                  <div className="w-full h-8 relative flex items-center justify-center">
                    <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-[#00f2fe] via-amber-400 to-[#38ef7d]" />
                    <motion.div
                      animate={{
                        x: scanStep === 1 ? [-80, 80] : 0,
                        opacity: scanStep >= 1 ? 1 : 0
                      }}
                      transition={{ duration: 0.9, repeat: isScanning ? Infinity : 0 }}
                      className="w-5 h-5 rounded-full bg-amber-400 border-2 border-white shadow-[0_0_12px_#ffaa00] z-10"
                    />
                  </div>

                  <div className="text-[11px] font-mono text-white/50 mt-1">
                    {scanStep >= 2 ? (
                      <span className="text-[#38ef7d] font-bold">Response Received: {selectedPassport.swCode.split(' ')[0]}</span>
                    ) : (
                      'Pinging Smartcard...'
                    )}
                  </div>
                </div>

                {/* 3. Passport Smartcard Chip (3 cols) */}
                <div className="col-span-3 p-4 rounded-xl bg-[#0f111f] border-2 border-[#ffaa00]/40 text-center relative shadow-lg">
                  <div className="text-xs font-mono text-amber-400 font-bold mb-1">
                    {selectedPassport.flag} PASSPORT CHIP
                  </div>
                  <Cpu className="w-8 h-8 text-amber-400 mx-auto my-1" />
                  <div className="text-[12px] font-mono text-white/70">Silicon Mealy FSM</div>
                  <div className="text-[11px] text-amber-300 font-bold mt-1">Tamper-Proof</div>
                </div>

              </div>

              {/* Live Fingerprint Detection Result Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedPassport.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-3 p-4 rounded-xl bg-black/60 border border-white/15"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                      <span className="text-[15px] font-mono font-bold text-amber-300">
                        {selectedPassport.fingerprintVerdict}
                      </span>
                    </div>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80">
                      Response: {selectedPassport.swCode}
                    </span>
                  </div>

                  <p className="text-[14px] text-white/85 leading-snug">
                    {selectedPassport.explanation}
                  </p>

                  <div className="mt-2 text-xs font-mono text-[#00f2fe] flex items-center gap-2">
                    <span>Transition:</span>
                    <span className="text-white font-bold bg-white/10 px-2 py-0.5 rounded">
                      {selectedPassport.stateResult}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>

            {/* Key Takeaways Grid */}
            <div className="mt-5 grid grid-cols-2 gap-4 text-[15px]">
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                <span className="text-[#38ef7d] font-bold block mb-1 font-mono">1. Zero-Credential Leak</span>
                Passive RFID scanners in an airport can distinguish passenger nationalities without reading personal data.
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                <span className="text-[#00f2fe] font-bold block mb-1 font-mono">2. Automated Firmware QA</span>
                Issuers now run automated Mealy pipelines on every firmware release to guarantee zero unintended state leaks.
              </div>
            </div>
          </div>

          {/* Card Footer */}
          <div className="mt-4 pt-3 border-t border-white/10 text-[15px] text-white/70 flex items-center justify-between font-mono">
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
