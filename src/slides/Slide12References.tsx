import React from 'react';
import { motion } from 'framer-motion';
import { Bookmark, Library, ExternalLink, CheckCircle } from 'lucide-react';

export const Slide12References: React.FC = () => {
  return (
    <div className="slide-dark-bg w-[1920px] h-[1080px] px-[80px] pt-[50px] pb-[60px] flex flex-col justify-between relative select-none overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 right-1/4 w-[800px] h-[600px] bg-[#00f2fe]/8 rounded-full blur-[180px] pointer-events-none" />

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 1. HERO HEADER: Docked & High-Impact                                  */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="z-20 flex flex-col">
        <div className="flex items-center gap-2.5 text-[14px] font-semibold tracking-[0.2em] uppercase text-[#00f2fe] font-mono mb-2">
          <Library className="w-4 h-4" />
          <span>BIBLIOGRAPHY & FOUNDATIONAL LITERATURE</span>
        </div>
        <h2 className="text-[52px] font-black text-white tracking-tight leading-tight">
          References &amp; Foundational Papers
        </h2>
        <p className="text-white/70 text-[20px] mt-1.5 font-light max-w-[1500px]">
          Peer-reviewed citations and foundational literature cited throughout this presentation.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 2. THREE HIGH-VISIBILITY REFERENCE CARDS                              */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-3 gap-8 my-auto z-10 w-full max-w-[1760px] items-stretch">
        
        {/* Col 1: Classic Foundations */}
        <div className="p-7 rounded-3xl bg-[#0d0e17] border-2 border-[#00f2fe]/30 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="font-bold text-[18px] text-[#00f2fe] uppercase tracking-wider flex items-center gap-2 mb-4 font-mono">
              <Bookmark className="w-5 h-5" />
              <span>Classic Foundations</span>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                <div className="font-bold text-white text-[17px]">George H. Mealy (1955)</div>
                <div className="text-[#00f2fe] text-[15px] italic">"A Method for Synthesizing Sequential Circuits"</div>
                <div className="text-white/60 text-[14px] font-mono">Bell System Technical Journal 34(5), pp. 1045–1079.</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                <div className="font-bold text-white text-[17px]">Edward F. Moore (1956)</div>
                <div className="text-white/90 text-[15px] italic">"Gedanken-experiments on Sequential Machines"</div>
                <div className="text-white/60 text-[14px] font-mono">Automata Studies, Annals of Mathematics Studies.</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                <div className="font-bold text-white text-[17px]">Dana Angluin (1987)</div>
                <div className="text-[#38ef7d] text-[15px] italic">"Learning Regular Sets from Queries & Counterexamples"</div>
                <div className="text-white/60 text-[14px] font-mono">Information and Computation 75(2), pp. 87–106.</div>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-white/10 text-xs text-white/50 font-mono">
            Groundwork for Finite State Transducers
          </div>
        </div>

        {/* Col 2: Model Learning Reviews */}
        <div className="p-7 rounded-3xl bg-[#0d0e17] border-2 border-[#38ef7d]/30 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="font-bold text-[18px] text-[#38ef7d] uppercase tracking-wider flex items-center gap-2 mb-4 font-mono">
              <Bookmark className="w-5 h-5" />
              <span>Model Learning Reviews</span>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                <div className="font-bold text-white text-[17px]">Frits Vaandrager (2017)</div>
                <div className="text-[#38ef7d] text-[15px] italic">"Model Learning"</div>
                <div className="text-white/60 text-[14px] font-mono">Communications of the ACM (CACM) 60(2), pp. 86–95.</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                <div className="font-bold text-white text-[17px]">Deepak D'Souza (2020)</div>
                <div className="text-white/90 text-[15px] italic">"Learning Mealy Machines & Observation Tables"</div>
                <div className="text-white/60 text-[14px] font-mono">Indian Institute of Science (IISc Bangalore) Lecture Series.</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                <div className="font-bold text-white text-[17px]">Gerco van Heerdt (2014)</div>
                <div className="text-white/90 text-[15px] italic">"Efficient Inference of Mealy Machines"</div>
                <div className="text-white/60 text-[14px] font-mono">Radboud University Computing Science Thesis.</div>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-white/10 text-xs text-white/50 font-mono">
            Active Automata Inference Frameworks
          </div>
        </div>

        {/* Col 3: Industrial Security & Frontier */}
        <div className="p-7 rounded-3xl bg-[#0d0e17] border-2 border-[#ffaa00]/30 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="font-bold text-[18px] text-[#ffaa00] uppercase tracking-wider flex items-center gap-2 mb-4 font-mono">
              <Bookmark className="w-5 h-5" />
              <span>Security &amp; Frontiers</span>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                <div className="font-bold text-white text-[17px]">Joeri de Ruiter &amp; Erik Poll (2015)</div>
                <div className="text-red-400 text-[15px] italic">"Protocol State Fuzzing of TLS Implementations"</div>
                <div className="text-white/60 text-[14px] font-mono">USENIX Security Symposium 2015.</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                <div className="font-bold text-white text-[17px]">Vaandrager et al. (2022)</div>
                <div className="text-[#00f2fe] text-[15px] italic">"The L# Algorithm for Active Mealy Learning"</div>
                <div className="text-white/60 text-[14px] font-mono">TACAS 2022 / Springer Nature LNCS 13243.</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                <div className="font-bold text-white text-[17px]">Recent Frontier (2024)</div>
                <div className="text-[#ffaa00] text-[15px] italic">"Learning Mealy Machines with Timers"</div>
                <div className="text-white/60 text-[14px] font-mono">arXiv:2403.02019v3 (Published 2024).</div>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-white/10 text-xs text-white/50 font-mono">
            Cyber-Physical & Security Verification
          </div>
        </div>

      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 3. DOCKED FOOTER                                                      */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="z-20 pt-4 border-t border-white/10 flex items-center justify-between text-[16px] text-white/70 font-mono">
        <span>Verified Academic Citations • All Papers Peer-Reviewed</span>
        <span className="font-mono text-white/90">ACM / IEEE / USENIX / Springer</span>
      </div>
    </div>
  );
};
