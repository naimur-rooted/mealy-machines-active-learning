import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScaledSlide } from "@/components/presentation/ScaledSlide";
import { SlideHeader } from "@/components/presentation/SlideHeader";
import { presentationSound } from "@/lib/presentationSound";
import { fadeUp, scaleIn } from "@/lib/presentationMotion";
import {
  Smartphone,
  Zap,
  Palette,
  Server,
  Award,
  Code2,
  ShieldCheck,
  BarChart3,
  Share2,
  CheckCircle2,
} from "lucide-react";

export interface EcosystemNode {
  id: string;
  num: string;
  name: string;
  shortLabel: string;
  tag: string;
  icon: React.ElementType;
  gradient: string;
  glowColor: string;
  activeColor: string;
  coords: { x: number; y: number };
  size: number;
  floatPath: { y: number[]; x: number[]; duration: number; delay: number };
  headline: string;
  sub: string;
  points: string[];
  tags: string[];
  guarantee: string;
}

export const ECOSYSTEM_NODES: EcosystemNode[] = [
  {
    id: "software_dev",
    num: "01",
    name: "Full-Cycle Mobile & Web Dev",
    shortLabel: "Mobile & Web Dev",
    tag: "01 • ENGINEERING CORE",
    icon: Smartphone,
    gradient: "radial-gradient(circle at 35% 30%, #38bdf8, #0284c7 65%, #0369a1 100%)",
    glowColor: "rgba(2, 132, 199, 0.35)",
    activeColor: "#38bdf8",
    coords: { x: 85, y: 35 },
    size: 120,
    floatPath: { y: [0, -12, 0], x: [0, 6, -5, 0], duration: 5.2, delay: 0 },
    headline: "Mobile & Web Engineering",
    sub: "Full-cycle Flutter, Native Android/Kotlin, and modern scalable backend integration",
    points: [
      "Cross-platform Flutter for smooth 60fps iOS and Android applications",
      "Robust state management (BLoC, Riverpod) with offline-first local caching",
      "Secure REST & GraphQL API wiring with bulletproof error boundaries",
    ],
    tags: ["Flutter", "Kotlin", "iOS", "Android", "BLoC", "REST / GraphQL"],
    guarantee: "✓ 100% Clean Code Standards with Strict Typing and Zero Regressions",
  },
  {
    id: "mvp_validation",
    num: "02",
    name: "Idea Validation & Rapid MVP",
    shortLabel: "Idea Validation",
    tag: "02 • PRODUCT DISCOVERY",
    icon: Zap,
    gradient: "radial-gradient(circle at 35% 30%, #fb923c, #ea580c 65%, #9a3412 100%)",
    glowColor: "rgba(234, 88, 12, 0.35)",
    activeColor: "#fb923c",
    coords: { x: 395, y: 20 },
    size: 118,
    floatPath: { y: [0, 12, 0], x: [0, -7, 5, 0], duration: 4.8, delay: 0.4 },
    headline: "Idea Validation & Rapid MVP",
    sub: "Transform conceptual product ideas into production-ready MVPs in 2.5 to 3 months",
    points: [
      "Pre-build technical feasibility checks and architecture blueprints",
      "Sprint-based milestone delivery keeping timeline deterministic",
      "Agreed MVP target upfront with no bloated feature creep",
    ],
    tags: ["MVP in 2.5-3 Mos", "Product Architecture", "Feasibility", "Roadmap"],
    guarantee: "✓ Deterministic Timeline Agreed Upfront Before Writing Line 1",
  },
  {
    id: "uiux_design",
    num: "03",
    name: "UI/UX Design Systems",
    shortLabel: "UI/UX Design",
    tag: "03 • PRODUCT DESIGN",
    icon: Palette,
    gradient: "radial-gradient(circle at 35% 30%, #ec4899, #db2777 65%, #831843 100%)",
    glowColor: "rgba(219, 39, 119, 0.35)",
    activeColor: "#f472b6",
    coords: { x: 705, y: 35 },
    size: 120,
    floatPath: { y: [0, -10, 0], x: [0, -6, 6, 0], duration: 5.0, delay: 0.6 },
    headline: "UI/UX Design & Prototyping",
    sub: "High-fidelity Figma design systems, user journeys, and smooth 60fps interaction patterns",
    points: [
      "Conversion-focused mobile & web user journeys crafted in Figma",
      "Reusable component tokens ensuring brand consistency across screens",
      "Interactive prototypes validated before engineering begins",
    ],
    tags: ["Figma", "Design Systems", "UX Research", "Prototyping", "Micro-UI"],
    guarantee: "✓ Pixel-Perfect Interfaces Engineered for Retention & Clarity",
  },
  {
    id: "cloud_devops",
    num: "04",
    name: "Cloud Backend & DevOps",
    shortLabel: "Cloud & DevOps",
    tag: "04 • SCALABLE INFRASTRUCTURE",
    icon: Server,
    gradient: "radial-gradient(circle at 35% 30%, #2dd4bf, #0d9488 65%, #115e59 100%)",
    glowColor: "rgba(13, 148, 136, 0.35)",
    activeColor: "#2dd4bf",
    coords: { x: 145, y: 205 },
    size: 118,
    floatPath: { y: [0, 11, 0], x: [0, 5, -5, 0], duration: 5.3, delay: 0.2 },
    headline: "Cloud Backend & CI/CD DevOps",
    sub: "Scalable API architecture, PostgreSQL databases, and automated TestFlight / Play Console deploys",
    points: [
      "Zero-downtime cloud infrastructure on AWS, GCP, or Supabase",
      "Automated CI/CD pipelines shipping staging builds every two weeks",
      "End-to-end encryption, JWT/OAuth security, and automated daily backups",
    ],
    tags: ["AWS / GCP", "PostgreSQL", "CI/CD", "Docker", "API Security"],
    guarantee: "✓ Enterprise-Grade Uptime with Automated Release Pipelines",
  },
  {
    id: "chief_architect",
    num: "05",
    name: "Chief Architect Gatekeeping",
    shortLabel: "Chief Architect",
    tag: "05 • FRACTIONAL CTO (FREE)",
    icon: Award,
    gradient: "radial-gradient(circle at 35% 30%, #fcd34d, #ffad01 65%, #b45309 100%)",
    glowColor: "rgba(255, 173, 1, 0.38)",
    activeColor: "#ffad01",
    coords: { x: 400, y: 205 },
    size: 126,
    floatPath: { y: [0, -10, 0], x: [0, 4, -4, 0], duration: 4.9, delay: 0.1 },
    headline: "Chief Architect Supervision",
    sub: "Alim Ul Karim (20+ yrs exp) personally oversees architecture and PR quality — 100% FREE",
    points: [
      "4h/week direct architectural gatekeeping outside your squad hours",
      "Line-by-line PR audits preventing brittle patterns before merge",
      "Strategic advisory on App Store compliance, scaling, and cost control",
    ],
    tags: ["20+ Yrs Exp", "PR Gatekeeper", "Fractional CTO", "Included FREE"],
    guarantee: "✓ Included 100% FREE on Top of Your Dedicated Squad Capacity",
  },
  {
    id: "code_quality",
    num: "06",
    name: "Code Modernization & Stability",
    shortLabel: "Code Quality",
    tag: "06 • ARCHITECTURAL REFACTORING",
    icon: Code2,
    gradient: "radial-gradient(circle at 35% 30%, #a78bfa, #7c3aed 65%, #5b21b6 100%)",
    glowColor: "rgba(124, 58, 237, 0.35)",
    activeColor: "#a78bfa",
    coords: { x: 660, y: 205 },
    size: 118,
    floatPath: { y: [0, -11, 0], x: [0, 5, -6, 0], duration: 5.6, delay: 0.8 },
    headline: "Code Modernization & Stability",
    sub: "Fine-tuning existing codebases, eliminating technical debt, and memory leak triage",
    points: [
      "Inherit and stabilize fragile codebases from previous agencies or freelancers",
      "De-couple monolithic components into maintainable testable modules",
      "Thermal profile tuning, garbage collection audits, and battery life optimization",
    ],
    tags: ["Refactoring", "Tech Debt Triage", "Performance Tuning", "Modularization"],
    guarantee: "✓ Transforms Fragile Codebases into Enterprise-Grade Repositories",
  },
  {
    id: "qa_testing",
    num: "07",
    name: "Zero-Crash QA Verification",
    shortLabel: "QA Verification",
    tag: "07 • QUALITY ASSURANCE",
    icon: ShieldCheck,
    gradient: "radial-gradient(circle at 35% 30%, #34d399, #059669 65%, #064e3b 100%)",
    glowColor: "rgba(5, 150, 105, 0.35)",
    activeColor: "#34d399",
    coords: { x: 85, y: 375 },
    size: 120,
    floatPath: { y: [0, 12, 0], x: [0, -6, 6, 0], duration: 5.0, delay: 0.3 },
    headline: "Automated QA Verification",
    sub: "Every sprint build is stress-tested on real physical devices before reaching users",
    points: [
      "Automated regression suites running across Android and iOS real hardware",
      "Edge-case verification: network drops, background suspend, low-memory states",
      "Continuous crash monitoring integration via Firebase Crashlytics and Sentry",
    ],
    tags: ["Real Devices", "Automated UI Tests", "Crashlytics", "Zero Regressions"],
    guarantee: "✓ 99.9% Crash-Free User Sessions on Live Production Builds",
  },
  {
    id: "marketing_growth",
    num: "08",
    name: "Marketing & Growth Engine",
    shortLabel: "Marketing Team",
    tag: "08 • USER ACQUISITION",
    icon: BarChart3,
    gradient: "radial-gradient(circle at 35% 30%, #f43f5e, #e11d48 65%, #9f1239 100%)",
    glowColor: "rgba(225, 29, 72, 0.35)",
    activeColor: "#f43f5e",
    coords: { x: 395, y: 385 },
    size: 118,
    floatPath: { y: [0, -12, 0], x: [0, 7, -5, 0], duration: 5.4, delay: 0.7 },
    headline: "Marketing Growth Squad",
    sub: "Align development velocity directly with user acquisition and conversion funnels",
    points: [
      "App Store Optimization (ASO) for iOS App Store and Google Play discovery",
      "Conversion rate optimization (CRO) on onboarding and subscription checkout flows",
      "Event analytics implementation (Mixpanel, PostHog, Google Analytics)",
    ],
    tags: ["ASO", "Funnel CRO", "Mixpanel", "Analytics", "Acquisition"],
    guarantee: "✓ Data-Driven User Acquisition Built Directly into Your Application",
  },
  {
    id: "social_media",
    num: "09",
    name: "Social Media & Brand Authority",
    shortLabel: "Social Media",
    tag: "09 • BRAND VISIBILITY",
    icon: Share2,
    gradient: "radial-gradient(circle at 35% 30%, #fbbf24, #d97706 65%, #92400e 100%)",
    glowColor: "rgba(217, 119, 6, 0.35)",
    activeColor: "#fbbf24",
    coords: { x: 705, y: 375 },
    size: 120,
    floatPath: { y: [0, 11, 0], x: [0, -5, 7, 0], duration: 5.1, delay: 0.2 },
    headline: "Social Media Management",
    sub: "Turn software product updates into compelling multi-channel brand momentum",
    points: [
      "Continuous content cadence highlighting product releases, demos, and wins",
      "Community management across LinkedIn, X/Twitter, and specialized channels",
      "Cohesive brand visual identity aligned with your mobile user interface",
    ],
    tags: ["Content Cadence", "LinkedIn / X", "Community", "Brand Authority"],
    guarantee: "✓ Cohesive Public Brand Presence Matching Production Velocity",
  },
];

export const Slide3_Deliverables_9Tracks: React.FC<{ onNavigate?: (idx: number) => void }> = ({ onNavigate }) => {
  const [activeNodeId, setActiveNodeId] = useState<string>("software_dev");
  const [isDropping, setIsDropping] = useState(false);
  const [dropParams, setDropParams] = useState<
    Record<string, { scatterX: number; rotate: number; b1: number; b2: number; b3: number; delay: number }>
  >({});
  const droppingRef = React.useRef(false);
  const dropTimersRef = React.useRef<ReturnType<typeof setTimeout>[]>([]);
  const activeNode = ECOSYSTEM_NODES.find((n) => n.id === activeNodeId) || ECOSYSTEM_NODES[0];

  const clearDropTimers = () => {
    dropTimersRef.current.forEach((t) => clearTimeout(t));
    dropTimersRef.current = [];
  };

  const triggerMarbleDrop = () => {
    if (droppingRef.current) return;
    droppingRef.current = true;

    const nextParams: Record<string, { scatterX: number; rotate: number; b1: number; b2: number; b3: number; delay: number }> = {};
    ECOSYSTEM_NODES.forEach((node) => {
      const minX = 16 - node.coords.x;
      const maxX = 920 - node.size - 16 - node.coords.x;
      const rawScatter = (Math.random() - 0.5) * 220;
      const scatterX = Math.max(minX, Math.min(maxX, rawScatter));
      nextParams[node.id] = {
        scatterX,
        rotate: (Math.random() - 0.5) * 320,
        b1: 85 + Math.random() * 85,
        b2: 32 + Math.random() * 38,
        b3: 10 + Math.random() * 14,
        delay: Math.random() * 0.14,
      };
    });
    setDropParams(nextParams);
    setIsDropping(true);

    presentationSound.play("whooshFast", 0.7);
    const tB1 = setTimeout(() => presentationSound.play("ballBounce", 0.95), 340);
    const tB2 = setTimeout(() => presentationSound.play("ballBounce", 0.78), 430);
    const tB3 = setTimeout(() => presentationSound.play("ballBounce", 0.58), 530);
    const tB4 = setTimeout(() => presentationSound.play("ballBounce", 0.42), 700);
    const tB5 = setTimeout(() => presentationSound.play("ballBounce", 0.28), 850);

    const tNav = setTimeout(() => {
      if (onNavigate) {
        onNavigate(4);
      } else if (typeof window !== "undefined" && window.__goToSlide) {
        window.__goToSlide(4);
      }
    }, 1250);

    dropTimersRef.current = [tB1, tB2, tB3, tB4, tB5, tNav];
  };

  useEffect(() => {
    window.__slideNavigationGate = {
      trigger: () => {
        if (!droppingRef.current) {
          triggerMarbleDrop();
        }
        return true;
      },
      prev: () => droppingRef.current,
    };
    return () => {
      window.__slideNavigationGate = undefined;
      clearDropTimers();
    };
  }, []);

  const handleOrbHover = (id: string) => {
    if (isDropping) return;
    if (id !== activeNodeId) {
      presentationSound.play("hoverNode", 0.7);
      setActiveNodeId(id);
    }
  };

  return (
    <ScaledSlide>
      <div className="slide-dark-bg relative w-[1920px] h-[1080px] overflow-hidden text-white font-sans flex items-center justify-center">
        <SlideHeader />
        
        {/* Ambient background glow */}
        <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] rounded-full bg-pres-accent/[0.05] blur-[180px]" />

        <div className="relative z-10 w-full px-[80px] pt-[20px] flex flex-col justify-center">
          {/* Eyebrow & Headline */}
          <div className="text-center max-w-[1200px] mx-auto mb-6">
            <motion.div
              {...fadeUp(0)}
              className="inline-flex items-center px-4 py-1.5 rounded-full bg-pres-accent/15 border border-pres-accent/35 text-pres-accent text-[14px] font-bold tracking-widest uppercase mb-2 shadow-[0_0_20px_rgba(255,173,1,0.15)]"
            >
              <span>Full-Stack Capabilities • Interactive Bubble Field</span>
            </motion.div>

            <motion.h1
              {...fadeUp(0.08)}
              className="font-heading text-[52px] font-bold tracking-tight text-white leading-tight"
            >
              The 9 Multi-Disciplinary Service Tracks
            </motion.h1>
            <motion.p
              {...fadeUp(0.14)}
              className="text-[20px] text-pres-text-muted mt-1"
            >
              Hover over any floating orb to inspect how our managed squad covers every dimension of your product.
            </motion.p>
          </div>

          {/* Interactive Stage: Orbital Floating Bubbles (Left) + Executive Inspection Dock (Right) */}
          <div className="flex items-center justify-between gap-10 max-w-[1760px] mx-auto w-full mb-6">
            
            {/* LEFT: Floating Bubble Orbital Field */}
            <motion.div
              {...fadeUp(0.2)}
              className="relative w-[920px] h-[540px] shrink-0 rounded-3xl bg-black/40 border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl backdrop-blur-md"
            >
              {/* Concentric Orbital Ripple Waves (Background) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[740px] h-[740px] rounded-full border border-white/[0.04] animate-[spin_60s_linear_infinite]" />
                <div className="absolute w-[540px] h-[540px] rounded-full border border-white/[0.06] animate-[spin_40s_linear_infinite_reverse]" />
                <div className="absolute w-[360px] h-[360px] rounded-full border border-pres-accent/[0.12]" />
                <div className="absolute w-[180px] h-[180px] rounded-full bg-pres-accent/[0.04] blur-xl" />
              </div>

              {/* Floating Orbs (Rendered from data) — Gravity Marble Drop on Next */}
              {ECOSYSTEM_NODES.map((node) => {
                const Icon = node.icon;
                const isActive = activeNodeId === node.id;
                const dp = dropParams[node.id];
                const floorDeltaY = Math.max(30, 540 - node.coords.y - node.size - 14);
                return (
                  <motion.button
                    key={node.id}
                    type="button"
                    onClick={() => {
                      if (isDropping) return;
                      presentationSound.play("nodeReveal", 0.8);
                      setActiveNodeId(node.id);
                    }}
                    onMouseEnter={() => handleOrbHover(node.id)}
                    animate={
                      isDropping && dp
                        ? {
                            y: [
                              0,
                              floorDeltaY,
                              floorDeltaY - dp.b1,
                              floorDeltaY,
                              floorDeltaY - dp.b2,
                              floorDeltaY,
                              floorDeltaY - dp.b3,
                              floorDeltaY,
                            ],
                            x: [0, dp.scatterX * 0.45, dp.scatterX * 0.78, dp.scatterX * 0.94, dp.scatterX],
                            rotate: [0, dp.rotate * 0.5, dp.rotate * 0.85, dp.rotate],
                          }
                        : {
                            y: node.floatPath.y,
                            x: node.floatPath.x,
                            rotate: 0,
                          }
                    }
                    transition={
                      isDropping && dp
                        ? {
                            duration: 1.05,
                            delay: dp.delay,
                            times: [0, 0.36, 0.54, 0.7, 0.82, 0.9, 0.96, 1],
                            ease: "easeInOut",
                          }
                        : {
                            duration: node.floatPath.duration,
                            repeat: Infinity,
                            repeatType: "mirror",
                            ease: "easeInOut",
                            delay: node.floatPath.delay,
                          }
                    }
                    style={{
                      position: "absolute",
                      left: node.coords.x,
                      top: node.coords.y,
                      width: node.size,
                      height: node.size,
                    }}
                    className="group cursor-pointer focus:outline-none select-none"
                  >
                    {/* The Marble Glass Sphere */}
                    <div
                      className={`relative w-full h-full rounded-full flex flex-col items-center justify-center transition-all duration-300 ${
                        isActive ? "scale-110" : "scale-100 group-hover:scale-105"
                      }`}
                      style={{
                        background: node.gradient,
                        boxShadow: isActive
                          ? `0 0 24px ${node.glowColor}, inset 0 2px 4px rgba(255,255,255,0.65), inset 0 -4px 8px rgba(0,0,0,0.4)`
                          : `0 8px 20px rgba(0,0,0,0.45), inset 0 1px 2px rgba(255,255,255,0.45), inset 0 -3px 6px rgba(0,0,0,0.3)`,
                      }}
                    >
                      {/* Top Specular Crescent Rim Highlight (Glass effect) */}
                      <div
                        className="absolute top-1 left-2.5 right-2.5 h-[36%] rounded-t-full pointer-events-none opacity-60"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0) 100%)",
                        }}
                      />

                      {/* Icon */}
                      <Icon className="w-8 h-8 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] mb-1" />

                      {/* Pill Label */}
                      <span className="text-[12px] font-heading font-black text-white tracking-wide uppercase drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)] text-center px-2 leading-tight">
                        {node.shortLabel}
                      </span>

                      {/* Pulsing selection ring when active */}
                      {isActive && (
                        <motion.div
                          layoutId="activeOrbRing"
                          className="absolute -inset-2.5 rounded-full border-2 border-white pointer-events-none animate-pulse"
                        />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>

            {/* RIGHT: Active Inspection Dock (Smooth Animated Card Detail) */}
            <motion.div
              {...scaleIn(0.28)}
              className="flex-1 h-[540px] rounded-3xl bg-pres-surface/95 border-2 border-white/15 p-9 shadow-2xl flex flex-col justify-between relative overflow-hidden backdrop-blur-xl"
              style={{
                borderColor: `${activeNode.activeColor}55`,
                boxShadow: `0 0 20px ${activeNode.activeColor}28`,
              }}
            >
              {/* Background ambient corner tint */}
              <div
                className="absolute -top-16 -right-16 w-52 h-52 rounded-full blur-[60px] opacity-35 pointer-events-none transition-colors duration-500"
                style={{ background: activeNode.glowColor }}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeNode.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col justify-between h-full relative z-10"
                >
                  <div>
                    {/* Node Eyebrow Pill */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="text-[13px] font-mono font-black uppercase tracking-widest px-3.5 py-1.5 rounded-lg border font-bold"
                        style={{
                          background: `${activeNode.activeColor}18`,
                          borderColor: `${activeNode.activeColor}44`,
                          color: activeNode.activeColor,
                        }}
                      >
                        {activeNode.tag}
                      </span>
                      <span className="text-[14px] font-semibold text-white/50">Managed End-Result</span>
                    </div>

                    {/* Headline & Sub */}
                    <h2 className="font-heading text-[34px] font-bold text-white mb-2 leading-tight">
                      {activeNode.headline}
                    </h2>
                    <p className="text-[18px] text-pres-text-muted mb-6 leading-relaxed">
                      {activeNode.sub}
                    </p>

                    {/* Deliverables List */}
                    <ul className="space-y-4 text-[18px] text-white/90">
                      {activeNode.points.map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2
                            className="w-5 h-5 shrink-0 mt-0.5"
                            strokeWidth={1.5}
                            style={{ color: activeNode.activeColor }}
                          />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    {/* Technology Badges */}
                    <div className="flex flex-wrap gap-2.5 pt-5 border-t border-white/10 mb-4">
                      {activeNode.tags.map((tg, idx) => (
                        <span
                          key={idx}
                          className="px-3.5 py-1 bg-white/5 rounded-lg text-[13px] font-mono text-white/80 border border-white/5"
                        >
                          {tg}
                        </span>
                      ))}
                    </div>

                    {/* Bottom Guarantee Statement */}
                    <div
                      className="pt-2 flex items-center gap-2 text-[15px] font-bold"
                      style={{
                        color: activeNode.activeColor,
                      }}
                    >
                      <span>{activeNode.guarantee}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </ScaledSlide>
  );
};

export default Slide3_Deliverables_9Tracks;
