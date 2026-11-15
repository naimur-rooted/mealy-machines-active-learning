import React from "react";
import logoImg from "@/assets/riseup-asia-logo.png";
import { presentationSound } from "@/lib/presentationSound";

/**
 * Brand lockup — the Riseup Asia logo, on its own.
 * Clicking the logo navigates to the home slide (Slide 1 / Cover).
 */
export const SlideHeader: React.FC = () => {
  const handleLogoClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    // 1. If inside a detail/comparison overlay, clicking the logo reverts to the main options (closes overlay)
    if (typeof window !== "undefined" && typeof window.__closeOverlay === "function") {
      presentationSound.play("cardSlideSnap", 0.8);
      window.__closeOverlay();
      return;
    }

    // 2. When in a main slide, clicking the logo reverts to the home slide (Slide 1)
    if (typeof window !== "undefined" && typeof window.__goToSlide === "function") {
      presentationSound.play("transition");
      window.__goToSlide(0);
    }
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50 pointer-events-none px-[60px] py-[36px] flex items-center justify-between">
      <div className="flex flex-col items-start pointer-events-auto">
        <button
          type="button"
          onClick={handleLogoClick}
          className="cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none"
          aria-label="Return to Home Cover"
        >
          <img
            src={logoImg}
            alt="Riseup Asia"
            className="h-[54px] w-auto object-contain"
          />
        </button>
      </div>
    </header>
  );
};
