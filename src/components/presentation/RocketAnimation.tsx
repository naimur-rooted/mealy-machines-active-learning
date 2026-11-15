import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { presentationSound } from "@/lib/presentationSound";

interface RocketAnimationProps {
  active?: boolean;
  intensity?: number;
  profile?: "compact" | "full";
  flyingLabel?: string;
  onComplete?: () => void;
}

/** Illustrated Retro Cartoon 3D Rocket matching the uploaded screenshot */
const IllustratedRocket: React.FC = () => (
  <svg viewBox="0 0 120 240" className="h-[250px] w-[130px] filter drop-shadow-[0_0_30px_rgba(56,189,248,0.65)]" aria-hidden="true">
    <defs>
      {/* Fuselage silver gradient */}
      <linearGradient id="fuselage-grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#8ba1b3" />
        <stop offset="35%" stopColor="#d1e3ee" />
        <stop offset="70%" stopColor="#b4c7d6" />
        <stop offset="100%" stopColor="#697d8e" />
      </linearGradient>

      {/* Red nose and fin gradient */}
      <linearGradient id="red-accent-grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#d32f2f" />
        <stop offset="40%" stopColor="#ef5350" />
        <stop offset="100%" stopColor="#b71c1c" />
      </linearGradient>

      {/* Window metallic rim */}
      <radialGradient id="porthole-rim" cx="40%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#607d8b" />
        <stop offset="85%" stopColor="#263238" />
        <stop offset="100%" stopColor="#102027" />
      </radialGradient>

      {/* Window glass reflection */}
      <linearGradient id="glass-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#90caf9" />
        <stop offset="50%" stopColor="#42a5f5" />
        <stop offset="100%" stopColor="#1565c0" />
      </linearGradient>

      {/* Thruster Flame Gradient */}
      <linearGradient id="flame-outer" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffeb3b" />
        <stop offset="45%" stopColor="#ff9800" />
        <stop offset="100%" stopColor="transparent" />
      </linearGradient>

      {/* Blue Ion Jet Beam */}
      <linearGradient id="ion-plume" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
        <stop offset="25%" stopColor="#38bdf8" stopOpacity="0.75" />
        <stop offset="70%" stopColor="#0284c7" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
      </linearGradient>
    </defs>

    {/* Long Blue Atmospheric Exhaust Plume */}
    <ellipse cx="60" cy="185" rx="16" ry="50" fill="url(#ion-plume)" opacity="0.85">
      <animate attributeName="ry" values="50;58;48;54;50" dur="0.22s" repeatCount="indefinite" />
      <animate attributeName="rx" values="16;18;15;17;16" dur="0.22s" repeatCount="indefinite" />
    </ellipse>

    {/* Dynamic Thruster Flame */}
    <path d="M48 140 Q60 178 72 140 Q60 152 48 140 Z" fill="url(#flame-outer)">
      <animate
        attributeName="d"
        dur="0.14s"
        repeatCount="indefinite"
        values="M48 140 Q60 178 72 140 Q60 152 48 140 Z;
                M49 140 Q60 168 71 140 Q60 148 49 140 Z;
                M47 140 Q60 184 73 140 Q60 155 47 140 Z;
                M48 140 Q60 178 72 140 Q60 152 48 140 Z"
      />
    </path>
    {/* Inner White-Hot Flame Core */}
    <ellipse cx="60" cy="146" rx="6" ry="12" fill="#ffffff">
      <animate attributeName="ry" values="12;16;11;14;12" dur="0.12s" repeatCount="indefinite" />
    </ellipse>

    {/* Left Red Wing Fin */}
    <path
      d="M42 98 C36 102 24 115 20 138 C28 135 38 133 43 134 C41 120 41 108 42 98 Z"
      fill="url(#red-accent-grad)"
      stroke="#7f0000"
      strokeWidth="1.2"
    />

    {/* Right Red Wing Fin */}
    <path
      d="M78 98 C84 102 96 115 100 138 C92 135 82 133 77 134 C79 120 79 108 78 98 Z"
      fill="url(#red-accent-grad)"
      stroke="#7f0000"
      strokeWidth="1.2"
    />

    {/* Center Rocket Fuselage Body */}
    <path
      d="M60 18 C78 44 82 85 79 138 L41 138 C38 85 42 44 60 18 Z"
      fill="url(#fuselage-grad)"
      stroke="#455a64"
      strokeWidth="1.4"
    />

    {/* Red Nose Cone */}
    <path
      d="M60 18 C72 35 77 52 77 62 L43 62 C43 52 48 35 60 18 Z"
      fill="url(#red-accent-grad)"
      stroke="#7f0000"
      strokeWidth="1.2"
    />

    {/* Soft highlight reflection along the nose cone */}
    <path d="M56 24 C52 38 50 48 49 58 L46 58 C47 48 50 36 56 24 Z" fill="#ffffff" opacity="0.45" />

    {/* Fuselage Joint Seam */}
    <line x1="42" y1="108" x2="78" y2="108" stroke="#78909c" strokeWidth="1.5" opacity="0.75" />

    {/* Porthole Outer Metallic Rim */}
    <circle cx="60" cy="84" r="14" fill="url(#porthole-rim)" stroke="#37474f" strokeWidth="1.5" />
    {/* Porthole Glass Window */}
    <circle cx="60" cy="84" r="10" fill="url(#glass-grad)" />
    {/* Glass Highlight Arc */}
    <path d="M54 78 A 7 7 0 0 1 66 78 A 7 7 0 0 0 54 84 Z" fill="#ffffff" opacity="0.75" />

    {/* Center Stabilizer Keel Fin */}
    <path
      d="M57 106 C57 95 63 95 63 106 L64 146 L56 146 Z"
      fill="url(#red-accent-grad)"
      stroke="#7f0000"
      strokeWidth="1"
    />

    {/* Base Nozzle */}
    <rect x="50" y="138" width="20" height="6" rx="2" fill="#37474f" />
  </svg>
);

export const RocketAnimation: React.FC<RocketAnimationProps> = ({
  active = false,
  flyingLabel = "Growth booster",
  onComplete,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (active) {
      setIsPlaying(true);
      // Play acoustic rocket ignition + flight sound
      presentationSound.play("rocket");

      const timer = setTimeout(() => {
        setIsPlaying(false);
        onComplete?.();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [active, onComplete]);

  return (
    <AnimatePresence>
      {isPlaying && (
        <div className="pointer-events-none absolute inset-0 z-40 overflow-hidden">
          <motion.div
            initial={reduce ? { opacity: 0 } : { y: 1100, x: 0 }}
            animate={
              reduce
                ? { opacity: [0, 1, 1, 0] }
                : {
                    // Stage 1 (0 to 0.28): Emerges from bottom to launchpad hover (y: 840)
                    // Stage 2 (0.28 to 0.48): Initialization rumble / pre-ignition hover at y: 840
                    // Stage 3 (0.48 to 0.72): Thrust build-up and steady ascent (y: 420)
                    // Stage 4 (0.72 to 1.0): Full hypersonic blast-off into space (y: -500)
                    y: [1100, 840, 836, 842, 838, 420, -500],
                    x: [0, 0, -2, 2, -1, 14, 25],
                  }
            }
            transition={{
              duration: 3.4,
              times: [0, 0.25, 0.32, 0.4, 0.48, 0.72, 1],
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute left-[33%] top-0 -ml-[110px] flex w-[240px] flex-col items-center"
          >
            <div className="relative">
              <IllustratedRocket />
            </div>

            {/* Glowing Atmospheric Thruster Smoke Trail */}
            <div className="-mt-10 h-[340px] w-[65px] rounded-full bg-gradient-to-b from-sky-400/50 via-pres-accent/20 to-transparent blur-2xl pointer-events-none" />

            {/* Floating Banner Tag */}
            {flyingLabel && (
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.1, 1], opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.45, ease: "easeOut" }}
                className="pres-dark-safe-accent absolute top-[85px] left-[175px] whitespace-nowrap rounded-full bg-pres-accent px-4 py-1.5 font-heading text-[20px] font-bold uppercase text-pres-bg shadow-[0_0_20px_rgba(255,173,1,0.6)] border border-amber-300"
              >
                {flyingLabel}
              </motion.span>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
