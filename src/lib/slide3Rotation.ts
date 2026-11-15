export type Slide3ImageVariant = "1" | "2";

/**
 * Returns the next image variant for slide 3 deterministically alternating between "1" and "2".
 */
export const nextSlide3Image = (prev: Slide3ImageVariant): Slide3ImageVariant =>
  prev === "1" ? "2" : "1";

const STORAGE_KEY = "riseup_last_slide3_img";

/**
 * Hook to manage Slide 3 fragile code image variant.
 * Reads last persisted variant on load, deterministically alternates to the other variant,
 * and persists it so every reload or return gets the alternative photo.
 */
export const getInitialSlide3Variant = (): Slide3ImageVariant => {
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
    const m = /riseup_slide3_img_(1|2)/.exec(typeof window !== "undefined" ? window.name || "" : "");
    if (m) last = m[1];
  }

  // If last was "1", choose "2"; otherwise choose "1"
  return last === "1" ? "2" : "1";
};

export const persistSlide3Variant = (variant: Slide3ImageVariant): void => {
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
      window.name = `riseup_slide3_img_${variant}`;
    }
  } catch {
    /* blocked */
  }
};
