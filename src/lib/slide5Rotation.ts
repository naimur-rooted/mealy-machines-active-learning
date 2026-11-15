export type Slide5ImageVariant = "1" | "2";

/**
 * Returns the next image variant for slide 5 deterministically alternating between "1" and "2".
 */
export const nextSlide5Image = (prev: Slide5ImageVariant): Slide5ImageVariant =>
  prev === "1" ? "2" : "1";

const STORAGE_KEY = "riseup_last_slide5_img";

/**
 * Hook to manage Slide 5 bad hire cost image variant.
 * Reads last persisted variant on load, deterministically alternates to the other variant,
 * and persists it so every reload or return gets the alternative photo.
 */
export const getInitialSlide5Variant = (): Slide5ImageVariant => {
  let last: string | null = null;
  try {
    last = localStorage.getItem(STORAGE_KEY);
  } catch {
    /* blocked */
  }
  if (!last) {
    try {
      last = sessionStorage.getItem(STORAGE_KEY);
    } catch {
      /* blocked */
    }
  }
  if (!last) {
    const m = /riseup_slide5_img_(1|2)/.exec(typeof window !== "undefined" ? window.name || "" : "");
    if (m) last = m[1];
  }

  // If last was "1", choose "2"; otherwise choose "1"
  return last === "1" ? "2" : "1";
};

export const persistSlide5Variant = (variant: Slide5ImageVariant): void => {
  try {
    localStorage.setItem(STORAGE_KEY, variant);
  } catch {
    /* blocked */
  }
  try {
    sessionStorage.setItem(STORAGE_KEY, variant);
  } catch {
    /* blocked */
  }
  try {
    if (typeof window !== "undefined") {
      window.name = `riseup_slide5_img_${variant}`;
    }
  } catch {
    /* blocked */
  }
};
