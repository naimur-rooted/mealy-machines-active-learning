import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Users, DollarSign, AlertCircle, FileX, ArrowRight, UserX, XCircle } from "lucide-react";

export const HiringSinkholeAnimation: React.FC = () => {
  const [days, setDays] = useState(0);
  const [resumes, setResumes] = useState(0);
  const [interviewHours, setInterviewHours] = useState(0);

  // Counter swell animation on slide entrance
  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 2400; // 2.4s

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // ease-out cubic
      const ease = 1 - Math.pow(1 - progress, 3);

      setDays(Math.floor(ease * 84));
      setResumes(Math.floor(ease * 142));
      setInterviewHours(Math.floor(ease * 65));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(step);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const frictionPills = [
    { text: "Candidate Ghosted After Offer", icon: UserX, delay: 1.4 },
    { text: "Failed Live System Architecture", icon: FileX, delay: 2.1 },
    { text: "$240k+ Demand + 20% Agency Fee", icon: XCircle, delay: 2.8 },
  ];

  return (
    <div className="absolute right-[80px] bottom-[50px] z-20 flex flex-col items-end gap-3.5 pointer-events-none select-none">
      
      {/* Real-time Startup Loss HUD: The Recruitment Drain Tracker */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-[440px] p-5 rounded-3xl bg-[#090b14]/95 border border-amber-500/35 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_35px_rgba(255,173,1,0.18)] flex flex-col gap-3.5"
      >
        {/* HUD Header */}
        <div className="flex items-center justify-between border-b border-white/15 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
            <span className="text-[13px] font-mono font-black tracking-widest text-rose-400 uppercase drop-shadow-[0_0_12px_rgba(244,63,94,0.4)]">
              RECRUITMENT SINKHOLE METRICS
            </span>
          </div>
          <span className="text-[11.5px] font-mono font-bold text-slate-300 uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded border border-white/10">
            AVG. IN-HOUSE
          </span>
        </div>

        {/* 3 Metric Counters */}
        <div className="grid grid-cols-3 gap-3 text-center">
          
          {/* Days Sunk */}
          <div className="p-3.5 rounded-2xl bg-white/[0.06] border border-white/15 flex flex-col items-center shadow-inner">
            <Clock className="w-4.5 h-4.5 text-amber-400 mb-1 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
            <span className="font-heading text-[34px] font-black text-white leading-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              {days}<span className="text-[20px] text-amber-400 font-black ml-0.5">d</span>
            </span>
            <span className="text-[12px] font-mono font-black text-slate-200 uppercase tracking-wide mt-1.5">
              Time Sunk
            </span>
          </div>

          {/* Resumes Screened */}
          <div className="p-3.5 rounded-2xl bg-white/[0.06] border border-white/15 flex flex-col items-center shadow-inner">
            <Users className="w-4.5 h-4.5 text-sky-400 mb-1 drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
            <span className="font-heading text-[34px] font-black text-white leading-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              {resumes}
            </span>
            <span className="text-[12px] font-mono font-black text-slate-200 uppercase tracking-wide mt-1.5">
              Resumes
            </span>
          </div>

          {/* Founder Hours Wasted */}
          <div className="p-3.5 rounded-2xl bg-white/[0.06] border border-white/15 flex flex-col items-center shadow-inner">
            <AlertCircle className="w-4.5 h-4.5 text-rose-400 mb-1 drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
            <span className="font-heading text-[34px] font-black text-white leading-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              {interviewHours}<span className="text-[20px] text-rose-400 font-black ml-0.5">h</span>
            </span>
            <span className="text-[12px] font-mono font-black text-slate-200 uppercase tracking-wide mt-1.5">
              CTO Hours
            </span>
          </div>

        </div>

        {/* Summary Impact Pill */}
        <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 flex items-center justify-between text-[13.5px] font-mono text-rose-200 shadow-sm">
          <span className="font-bold">Net Product Delay:</span>
          <strong className="text-white font-black tracking-wide bg-rose-500/30 px-2.5 py-0.5 rounded border border-rose-500/50">
            1 full quarter lost
          </strong>
        </div>
      </motion.div>

      {/* Floating Ghosting / Friction Badges Sucking Inward */}
      <div className="flex flex-col gap-2.5 w-[380px]">
        {frictionPills.map((pill, idx) => {
          const Icon = pill.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: [0, 1, 0.95], x: 0, scale: 1 }}
              transition={{
                delay: pill.delay,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="px-4 py-2.5 rounded-2xl bg-[#090b14]/95 border-2 border-rose-500/40 backdrop-blur-2xl shadow-[0_8px_25px_rgba(0,0,0,0.8),0_0_15px_rgba(244,63,94,0.2)] flex items-center gap-3.5 text-[14.5px] text-white font-bold"
            >
              <div className="w-7 h-7 rounded-xl bg-rose-500/25 border border-rose-500/40 flex items-center justify-center shrink-0 text-rose-400 shadow-inner">
                <Icon className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="font-extrabold text-white tracking-tight truncate drop-shadow-sm">{pill.text}</span>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
};
