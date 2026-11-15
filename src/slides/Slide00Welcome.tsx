import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  BookOpen,
  GraduationCap,
  Users,
  Code2,
  Cpu,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const Slide00Welcome: React.FC = () => {
  const presenters = [
    { name: "Naimur Rahman Nahid", role: "Lead Presenter" },
    { name: "Md Bakhtear", role: "Co-Presenter" },
    { name: "Md Anik", role: "Co-Presenter" },
  ];

  return (
    <div className="slide-dark-bg w-[1920px] h-[1080px] px-[80px] pt-[50px] pb-[60px] flex flex-col justify-between relative select-none overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-[850px] h-[650px] bg-[#00f2fe]/8 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[750px] h-[550px] bg-[#38ef7d]/7 rounded-full blur-[200px] pointer-events-none" />

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 1. TOP HEADER: Course & University Branding                          */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="z-20 flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00f2fe]/10 border border-[#00f2fe]/40 flex items-center justify-center text-[#00f2fe]">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[13px] font-mono tracking-[0.2em] uppercase text-[#00f2fe] font-bold block">
              DEPARTMENT OF COMPUTER SCIENCE &amp; ENGINEERING
            </span>
            <span className="text-[15px] font-mono text-white/70">
              Course: <strong className="text-white">Compiler Design</strong> • Code: <strong className="text-cyan-300">CSE 3219</strong>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 text-white/80 font-mono text-sm">
          <Cpu className="w-4 h-4 text-[#38ef7d]" />
          <span>Automata Theory &amp; Formal Verification</span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 2. GRAND HERO: Presentation Title & Topic Hook                        */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="my-auto z-10 w-full max-w-[1760px] flex flex-col items-center text-center">
        
        {/* Topic Tag */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-6 py-2 rounded-full bg-cyan-950/50 border border-cyan-500/40 backdrop-blur-md mb-6 shadow-lg shadow-cyan-500/10"
        >
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="font-mono font-bold text-[14px] tracking-widest uppercase text-cyan-300">
            TECHNICAL PRESENTATION &amp; RESEARCH DEFENSE
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-[68px] font-black tracking-tight text-white leading-[1.12] max-w-[1600px] font-heading drop-shadow-2xl"
        >
          Active Learning of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] via-[#38ef7d] to-[#ffaa00]">Mealy Machines</span> &amp; Modern Conformance
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-white/75 text-[24px] mt-4 font-normal max-w-[1300px] leading-relaxed"
        >
          From George Mealy's 1955 Sequential Circuits to Automated Black-Box Reverse-Engineering of TLS &amp; Embedded Chips
        </motion.p>

        {/* ══════════════════════════════════════════════════════════════════════ */}
        {/* 3. TEACHER & TEAM DETAILS (Symmetrical Grid)                          */}
        {/* ══════════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-12 gap-8 w-full mt-12 text-left">
          
          {/* Teacher Card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="col-span-5 p-7 rounded-3xl bg-[#0a0b12] border-2 border-white/15 shadow-2xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-[#38ef7d] font-bold mb-3">
                <GraduationCap className="w-4 h-4 text-[#38ef7d]" />
                <span>Supervised &amp; Evaluated By</span>
              </div>
              <h3 className="text-[28px] font-black text-white font-heading">
                Rafia Sultana
              </h3>
              <p className="text-[17px] text-white/70 font-medium mt-1">
                Lecturer, Department of Computer Science &amp; Engineering
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50">
              <span>Department of CSE</span>
              <span className="text-[#38ef7d] font-bold">Compiler Design (CSE 3219)</span>
            </div>
          </motion.div>

          {/* Student Presenters Card (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="col-span-7 p-7 rounded-3xl bg-[#0a0b12] border-2 border-[#00f2fe]/40 shadow-2xl shadow-cyan-500/10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-[#00f2fe] font-bold mb-3">
                <Users className="w-4 h-4 text-[#00f2fe]" />
                <span>Presented By (Group Members)</span>
              </div>

              {/* 3 Presenters Grid */}
              <div className="grid grid-cols-3 gap-4 mt-2">
                {presenters.map((p, idx) => (
                  <div
                    key={p.name}
                    className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col justify-between hover:border-[#00f2fe]/50 transition-all"
                  >
                    <div>
                      <span className="text-[11px] font-mono text-cyan-400 font-bold block mb-1">
                        0{idx + 1} • {p.role}
                      </span>
                      <h4 className="text-[19px] font-bold text-white font-heading leading-tight">
                        {p.name}
                      </h4>
                    </div>
                    <span className="text-xs text-white/50 mt-2 font-mono">
                      CSE 3219 Group
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50">
              <span>Undergraduate Engineering Defense</span>
              <span className="text-[#00f2fe] font-bold">Press Right Arrow ➔ to Begin</span>
            </div>
          </motion.div>

        </div>

      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 4. DOCKED FOOTER                                                      */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="z-20 pt-4 border-t border-white/10 flex items-center justify-between text-[16px] text-white/60 font-mono">
        <span>Academic Year 2026 • Compiler Design Defense</span>
        <span className="text-white/80">Interactive Web-Based Slide Deck</span>
      </div>
    </div>
  );
};
