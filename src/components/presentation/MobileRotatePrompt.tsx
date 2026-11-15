import React, { useState, useEffect } from "react";
import { X, RotateCcw, Maximize2 } from "lucide-react";
import { presentationSound } from "@/lib/presentationSound";

interface MobileRotatePromptProps {
  isPortrait: boolean;
}

export const MobileRotatePrompt: React.FC<MobileRotatePromptProps> = ({ isPortrait }) => {
  const [isDismissed, setIsDismissed] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("riseup.mobileRotatePrompt.dismissed") === "1";
    }
    return false;
  });

  const [isManualRotate, setIsManualRotate] = useState(false);

  useEffect(() => {
    // If user rotated back to landscape, allow prompt to reappear if they rotate back to portrait in another session
    if (!isPortrait) {
      setIsManualRotate(false);
    }
  }, [isPortrait]);

  const handleDismiss = () => {
    presentationSound.play("click");
    setIsDismissed(true);
    try {
      sessionStorage.setItem("riseup.mobileRotatePrompt.dismissed", "1");
    } catch {}
  };

  const handleRotateAndFullScreen = async () => {
    presentationSound.play("click");
    try {
      // 1. Request fullscreen on document
      if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen().catch(() => {});
      }

      // 2. Try Screen Orientation API lock
      const orientation = screen.orientation as (ScreenOrientation & { lock?: (type: string) => Promise<void> });
      if (orientation && typeof orientation.lock === "function") {
        await orientation.lock("landscape");
        handleDismiss();
      } else {
        // Fallback when lock API is unsupported or throws (e.g. iOS Safari)
        setIsManualRotate(true);
      }
    } catch {
      // Lock API threw or failed -> switch prompt body to manual text
      setIsManualRotate(true);
    }
  };

  if (!isPortrait || isDismissed) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Present in landscape prompt"
      className="fixed inset-x-4 top-5 z-[350] pointer-events-auto flex justify-center animate-in fade-in slide-in-from-top-4 duration-300"
    >
      <div className="w-full max-w-sm rounded-2xl border border-amber-400/40 bg-black/90 p-4 shadow-[0_12px_40px_rgba(0,0,0,0.85)] backdrop-blur-xl text-white">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-1.5">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-400/15 border border-amber-400/30 text-amber-400 text-sm">
              <RotateCcw className="w-4 h-4" />
            </span>
            <span className="font-heading text-[15px] font-bold text-white tracking-wide">
              Present in landscape
            </span>
          </div>

          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss rotate prompt"
            className="rounded-full p-1 text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Text: Automatic vs Manual Fallback */}
        <p className="text-[13px] leading-relaxed text-white/75 font-sans mb-3.5 pl-9">
          {isManualRotate
            ? "Please rotate your phone to landscape."
            : "Rotate your phone for the clearest full-screen view."}
        </p>

        {/* Action Button */}
        <div className="flex items-center gap-2 pl-9">
          <button
            type="button"
            onClick={handleRotateAndFullScreen}
            className="flex items-center gap-2 rounded-xl bg-pres-accent px-4 py-2 text-[13px] font-heading font-black text-black transition-transform active:scale-95 shadow-[0_0_20px_rgba(255,173,1,0.35)] cursor-pointer"
          >
            <Maximize2 className="w-4 h-4" />
            <span>Rotate &amp; Full Screen</span>
          </button>

          <button
            type="button"
            onClick={handleDismiss}
            className="rounded-xl border border-white/15 px-3 py-2 text-[12px] font-medium text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
