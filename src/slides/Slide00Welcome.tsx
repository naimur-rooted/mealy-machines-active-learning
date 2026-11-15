import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  GraduationCap,
  Users,
  Code2,
  Cpu,
  ArrowRight
} from 'lucide-react';

export const Slide00Welcome: React.FC = () => {
  const presenters = [
    { name: "Naimur Rahman Nahid", role: "Lead Presenter", id: "01" },
    { name: "Md Bakhtear", role: "Co-Presenter", id: "02" },
    { name: "Md Anik", role: "Co-Presenter", id: "03" },
  ];

  return (
    <div className="slide-dark-bg w-[1920px] h-[1080px] px-[80px] pt-[45px] pb-[55px] flex flex-col justify-between relative select-none overflow-hidden">
      {/* Ambient background glows - yellow and amber accent */}
      <div className="absolute top-1/4 left-1/4 w-[900px] h-[700px] bg-[#f59e0b]/10 rounded-full blur-[220px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[800px] h-[600px] bg-[#f59e0b]/8 rounded-full blur-[200px] pointer-events-none" />

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 1. TOP HEADER: Course & University Branding                          */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="z-20 flex items-center justify-between border-b border-white/15 pb-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#f59e0b]/15 border-2 border-[#f59e0b]/40 flex items-center justify-center text-[#f59e0b] shadow-lg">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[15px] font-mono tracking-[0.2em] uppercase text-[#f59e0b] font-bold block">
              DEPARTMENT OF COMPUTER SCIENCE &amp; ENGINEERING
            </span>
            <span className="text-[18px] font-mono text-white/80">
              Course: <strong className="text-white">Compiler Design</strong> • Code: <strong className="text-[#f59e0b]">CSE 3219</strong>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/5 border border-white/15 text-white/90 font-mono text-[16px]">
          <Cpu className="w-5 h-5 text-[#f59e0b]" />
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
          className="inline-flex items-center gap-2.5 px-7 py-2.5 rounded-full bg-[#f59e0b]/10 border-2 border-[#f59e0b]/40 backdrop-blur-md mb-6 shadow-xl shadow-amber-500/10"
        >
          <Sparkles className="w-5 h-5 text-[#f59e0b] animate-pulse" />
          <span className="font-mono font-bold text-[16px] tracking-widest uppercase text-[#f59e0b]">
            TECHNICAL PRESENTATION &amp; RESEARCH DEFENSE
          </span>
        </motion.div>

        {/* Main Title - BOLD & LARGE */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-[76px] font-black tracking-tight text-white leading-[1.12] max-w-[1650px] font-heading drop-shadow-2xl"
        >
          Active Learning of <span className="text-[#f59e0b] px-3 py-1 rounded-3xl bg-[#f59e0b]/15 border-2 border-[#f59e0b]/40 inline-block">Mealy Machines</span> &amp; Modern Conformance
        </motion.h1>

        {/* Subtitle - Bold and Legible */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-white/85 text-[26px] mt-5 font-normal max-w-[1400px] leading-relaxed font-sans"
        >
          From George Mealy's 1955 Sequential Circuits to Automated Black-Box Reverse-Engineering of TLS &amp; Embedded Chips
        </motion.p>

        {/* ══════════════════════════════════════════════════════════════════════ */}
        {/* 3. TEACHER & TEAM DETAILS (Large Bold Cards, No Green)                 */}
        {/* ══════════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-12 gap-8 w-full mt-10 text-left">
          
          {/* Teacher Card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="col-span-5 p-8 rounded-3xl bg-[#0d0e17] border-2 border-[#f59e0b]/40 shadow-2xl shadow-amber-500/10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2.5 text-[15px] font-mono uppercase tracking-widest text-[#f59e0b] font-bold mb-3">
                <GraduationCap className="w-5 h-5 text-[#f59e0b]" />
                <span>Supervised &amp; Evaluated By</span>
              </div>

              <h3 className="text-[34px] font-black text-white font-heading tracking-tight mt-1">
                Rafia Sultana
              </h3>

              <p className="text-[20px] text-white/80 font-medium mt-2 leading-snug font-sans">
                Lecturer, Department of Computer Science &amp; Engineering
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-[15px] font-mono text-white/60">
              <span>Department of CSE</span>
              <span className="text-[#f59e0b] font-bold">Compiler Design (CSE 3219)</span>
            </div>
          </motion.div>

          {/* Student Presenters Card (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="col-span-7 p-8 rounded-3xl bg-[#0d0e17] border-2 border-white/20 shadow-2xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2.5 text-[15px] font-mono uppercase tracking-widest text-[#f59e0b] font-bold mb-3">
                <Users className="w-5 h-5 text-[#f59e0b]" />
                <span>Presented By (Group Members)</span>
              </div>

              {/* 3 Presenters Grid - Enlarged & Bold */}
              <div className="grid grid-cols-3 gap-5 mt-2">
                {presenters.map((p) => (
                  <div
                    key={p.name}
                    className="p-5 rounded-2xl bg-white/[0.04] border border-white/15 flex flex-col justify-between hover:border-[#f59e0b]/60 hover:bg-[#f59e0b]/5 transition-all shadow-md"
                  >
                    <div>
                      <span className="text-[13px] font-mono text-[#f59e0b] font-bold block mb-1">
                        {p.id} • {p.role}
                      </span>
                      <h4 className="text-[22px] font-bold text-white font-heading leading-tight mt-1">
                        {p.name}
                      </h4>
                    </div>
                    <span className="text-[14px] text-white/60 mt-3 font-mono">
                      CSE 3219 Group
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-[15px] font-mono text-white/60">
              <span>Undergraduate Engineering Defense</span>
              <span className="text-[#f59e0b] font-bold flex items-center gap-1.5">
                <span>Press Right Arrow to Begin</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </motion.div>

        </div>

      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 4. DOCKED FOOTER                                                      */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="z-20 pt-4 border-t border-white/10 flex items-center justify-between text-[16px] text-white/65 font-mono">
        <span>Academic Year 2026 • Compiler Design Defense</span>
        <span className="text-white/80">Interactive Web-Based Slide Deck</span>
      </div>
    </div>
  );
};
