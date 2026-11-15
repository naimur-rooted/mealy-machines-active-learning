import React, { useEffect, useState } from "react";
import { MobileRotatePrompt } from "./MobileRotatePrompt";

interface ScaledSlideProps {
  children: React.ReactNode;
}

const checkIsPortrait = () => {
  if (typeof window === "undefined") return false;
  const isTouch = "ontouchstart" in window || (typeof navigator !== "undefined" && navigator.maxTouchPoints > 0);
  return window.innerHeight > window.innerWidth && (isTouch || window.innerWidth < 1024);
};

export const ScaledSlide: React.FC<ScaledSlideProps> = ({ children }) => {
  const [scale, setScale] = useState(() => {
    if (typeof window !== "undefined") {
      return Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    }
    return 1;
  });

  const [isPortrait, setIsPortrait] = useState(checkIsPortrait);

  useEffect(() => {
    const handleResize = () => {
      const factor = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
      setScale(factor);
      setIsPortrait(checkIsPortrait());
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return (
    <div className="relative w-screen h-[100dvh] overflow-hidden bg-pres-bg flex items-center justify-center select-none">
      {/* Spec-Compliant Mobile Portrait Orientation & Fullscreen Prompt */}
      <MobileRotatePrompt isPortrait={isPortrait} />

      <div
        style={{
          width: "1920px",
          height: "1080px",
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          position: "absolute",
          left: "50%",
          top: "50%",
          marginLeft: "-960px",
          marginTop: "-540px",
        }}
        className="select-none"
      >
        {children}
      </div>
    </div>
  );
};
