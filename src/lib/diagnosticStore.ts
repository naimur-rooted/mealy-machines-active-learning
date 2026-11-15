export type DiagnosticBottleneck = "outage" | "architecture" | "hiring";

interface DiagnosticState {
  answers: Record<DiagnosticBottleneck, boolean | null>;
}

const STORAGE_KEY = "riseup_sprint_diagnosis";

const listeners = new Set<() => void>();

function loadState(): DiagnosticState {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return {
    answers: {
      outage: null,
      architecture: null,
      hiring: null,
    },
  };
}

let currentState = loadState();

export function setDiagnosticAnswer(bottleneck: DiagnosticBottleneck, answer: boolean) {
  currentState = {
    ...currentState,
    answers: {
      ...currentState.answers,
      [bottleneck]: answer,
    },
  };
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(currentState));
  } catch {
    // ignore
  }
  listeners.forEach((fn) => fn());
}

export function getDiagnosticAnswers() {
  return currentState.answers;
}

export function subscribeDiagnostic(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function getRecommendedTierKey(): "skilled" | "growth" | "leadership" | null {
  const { architecture, outage, hiring } = currentState.answers;
  // If architecture (fragile AI logic) is flagged, System Architect (Tier 3.A) is top priority
  if (architecture === true) return "skilled";
  // If outage is flagged, System Architect is recommended for system hardening
  if (outage === true) return "skilled";
  // If hiring sinkhole is flagged, Tier 2 provides immediate velocity relief
  if (hiring === true) return "growth";
  return null;
}
