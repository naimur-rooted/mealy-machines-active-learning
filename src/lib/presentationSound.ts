import { nodeRevealSoundData } from "./nodeRevealSoundData";
import { slashCutSoundData } from "./slashCutSoundData";
import { waterBubbleSoundData } from "./waterBubbleSoundData";
import { cardShuffleSoundData } from "./cardShuffleSoundData";
import { paperRollAudioData } from "./paperRollAudioData";

export type PresentationSound =
  | "transition"
  | "click"
  | "reveal"
  | "launch"
  | "rocket"
  | "counterTick"
  | "counterSwell"
  | "marimbaDrop"
  | "hoverNode"
  | "nodeReveal"
  | "slashCut"
  | "whooshFast"
  | "tagPop"
  | "pendulumDrop"
  | "cardSlideSnap"
  | "cardWhooshOut"
  | "waterFill"
  | "pillDrop"
  | "paperUnfold"
  | "ballBounce"
  | "ballRoll"
  | "jumpWhoosh";

const STORAGE_KEY = "riseup-presentation-sound";
const listeners = new Set<(muted: boolean) => void>();
let context: AudioContext | null = null;
let muted = false;

if (typeof window !== "undefined") {
  try {
    muted = window.localStorage.getItem(STORAGE_KEY) === "off";
  } catch {
    muted = false;
  }
}

const getContext = () => {
  if (context) {
    if (context.state === "suspended") {
      context.resume().catch(() => undefined);
    }
    return context;
  }
  const AudioContextConstructor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextConstructor) return null;
  context = new AudioContextConstructor();
  if (context.state === "suspended") {
    context.resume().catch(() => undefined);
  }
  return context;
};

// Global automatic unlocker: ensure any interaction wakes the AudioContext
if (typeof window !== "undefined") {
  const unlockAudio = () => {
    const ctx = getContext();
    if (ctx && ctx.state === "suspended") {
      ctx.resume().catch(() => undefined);
    }
  };
  window.addEventListener("pointerdown", unlockAudio, { passive: true });
  window.addEventListener("keydown", unlockAudio, { passive: true });
  window.addEventListener("click", unlockAudio, { passive: true });
  window.addEventListener("touchstart", unlockAudio, { passive: true });
}

const tone = (frequency: number, duration: number, volume: number, delay = 0) => {
  const audioContext = getContext();
  if (!audioContext) return;
  const start = audioContext.currentTime + delay;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(frequency, start);
  oscillator.frequency.exponentialRampToValueAtTime(Math.max(80, frequency * 0.78), start + duration);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.018);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.02);
};

/**
 * Concept 1: Liquid Marimba / Glass Droplet Ascend
 * Plays a warm, crystalline wooden bar resonance with soft harmonic overtone
 * that smoothly ascends in pentatonic pitch as the counter climbs to $35,000.
 */
const PENTATONIC_SCALE = [
  261.63, 293.66, 329.63, 392.00, 440.00, // C4, D4, E4, G4, A4
  523.25, 587.33, 659.25, 783.99, 880.00, // C5, D5, E5, G5, A5
  1046.50, 1174.66, 1318.51, 1567.98       // C6, D6, E6, G6
];

const playLiquidMarimbaDrop = (progress = 0) => {
  const ctx = getContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  // Pick ascending note based on count progress
  const noteIndex = Math.min(
    PENTATONIC_SCALE.length - 1,
    Math.floor(progress * (PENTATONIC_SCALE.length - 1))
  );
  const fundamental = PENTATONIC_SCALE[noteIndex];

  // 1. Fundamental warm wooden tone (Marimba bar strike)
  const osc1 = ctx.createOscillator();
  const gain1 = ctx.createGain();
  osc1.type = "sine";
  osc1.frequency.setValueAtTime(fundamental, now);
  // Subtle wooden pitch bend at impact
  osc1.frequency.exponentialRampToValueAtTime(fundamental * 0.985, now + 0.08);

  gain1.gain.setValueAtTime(0.0001, now);
  gain1.gain.exponentialRampToValueAtTime(0.045, now + 0.003);
  gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

  osc1.connect(gain1);
  gain1.connect(ctx.destination);
  osc1.start(now);
  osc1.stop(now + 0.1);

  // 2. Liquid Glass droplet harmonic shimmer (3rd harmonic)
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.type = "sine";
  osc2.frequency.setValueAtTime(fundamental * 3, now);
  osc2.frequency.exponentialRampToValueAtTime(fundamental * 2.8, now + 0.04);

  gain2.gain.setValueAtTime(0.0001, now);
  gain2.gain.exponentialRampToValueAtTime(0.018, now + 0.002);
  gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

  osc2.connect(gain2);
  gain2.connect(ctx.destination);
  osc2.start(now);
  osc2.stop(now + 0.05);
};

/**
 * Satisfying acoustic glass droplet / soft crystal ping on hovering mind map nodes.
 */
const playHoverNodeSound = (pitchIndex = 0) => {
  const ctx = getContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  // Harmonious pentatonic frequencies based on node index (C6, D6, E6, G6)
  const freqs = [1046.5, 1174.66, 1318.51, 1567.98];
  const fundamental = freqs[Math.abs(Math.round(pitchIndex)) % freqs.length];

  // 1. Crystal bell fundamental with soft exponential decay
  const osc1 = ctx.createOscillator();
  const gain1 = ctx.createGain();
  osc1.type = "sine";
  osc1.frequency.setValueAtTime(fundamental, now);

  gain1.gain.setValueAtTime(0.0001, now);
  gain1.gain.exponentialRampToValueAtTime(0.016, now + 0.003);
  gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

  osc1.connect(gain1);
  gain1.connect(ctx.destination);
  osc1.start(now);
  osc1.stop(now + 0.095);

  // 2. High harmonic sparkle (2.5x harmonic)
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.type = "sine";
  osc2.frequency.setValueAtTime(fundamental * 2.5, now);

  gain2.gain.setValueAtTime(0.0001, now);
  gain2.gain.exponentialRampToValueAtTime(0.008, now + 0.002);
  gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

  osc2.connect(gain2);
  gain2.connect(ctx.destination);
  osc2.start(now);
  osc2.stop(now + 0.05);
};

let nodeRevealBufferPromise: Promise<AudioBuffer | null> | null = null;

const getNodeRevealBuffer = async (ctx: AudioContext): Promise<AudioBuffer | null> => {
  if (!nodeRevealBufferPromise) {
    nodeRevealBufferPromise = (async () => {
      try {
        const resp = await fetch(nodeRevealSoundData);
        const arrayBuf = await resp.arrayBuffer();
        const decoded = await ctx.decodeAudioData(arrayBuf);
        return decoded;
      } catch (err) {
        console.warn("Failed to decode reference audio sample", err);
        return null;
      }
    })();
  }
  return nodeRevealBufferPromise;
};

/**
 * Authentic high-definition acoustic whoosh/reveal cue based on user reference audio.
 * Plays the crisp sample with subtle musical pitch steps and warm harmonic polish.
 */
const playNodeRevealSound = async (nodeIndex = 0) => {
  const ctx = getContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  try {
    const audioBuf = await getNodeRevealBuffer(ctx);
    if (audioBuf) {
      const source = ctx.createBufferSource();
      source.buffer = audioBuf;

      // Subtle upward musical pitch progression across the 4 nodes
      const pitchRatios = [1.0, 1.0595, 1.1225, 1.1892];
      source.playbackRate.setValueAtTime(pitchRatios[nodeIndex % pitchRatios.length], now);

      // Warm output gain with clean quick envelope to avoid any clipping
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.35, now + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + Math.min(audioBuf.duration, 0.45));

      // Crisp acoustic presence filter
      const presenceFilter = ctx.createBiquadFilter();
      presenceFilter.type = "highshelf";
      presenceFilter.frequency.setValueAtTime(3200, now);
      presenceFilter.gain.setValueAtTime(3.0, now);

      source.connect(presenceFilter);
      presenceFilter.connect(gain);
      gain.connect(ctx.destination);

      source.start(now);
      source.stop(now + 0.48);
      return;
    }
  } catch {
    // Fallback if audio buffer fails to load
  }

  // Fallback tone
  tone(480 + (nodeIndex % 4) * 50, 0.12, 0.08);
};

/**
 * Satisfying soft golden swell chime when the monetary count hits the full $35,000 mark.
 */
const playCounterCompleteSwell = () => {
  const ctx = getContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  // Rich quadruple-harmonic acoustic resolution chord (C maj9: C, E, G, B, D)
  [523.25, 659.25, 783.99, 987.77, 1174.66].forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    const startOffset = now + idx * 0.025;
    osc.frequency.setValueAtTime(freq, startOffset);

    gain.gain.setValueAtTime(0.0001, startOffset);
    gain.gain.exponentialRampToValueAtTime(0.035 / (idx * 0.4 + 1), startOffset + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, startOffset + 0.65);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(startOffset);
    osc.stop(startOffset + 0.7);
  });
};

/**
 * Ultra-crisp, tight, high-end mechanical slide click with silky airy whoosh
 */
const playSlideSlidingTransitionSound = () => {
  const ctx = getContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  const slideDuration = 0.22;

  // 1. Ultra-sharp mechanical micro-click (tight, crisp, snappy)
  const oscClick = ctx.createOscillator();
  const gainClick = ctx.createGain();
  oscClick.type = "sine";
  oscClick.frequency.setValueAtTime(3200, now);
  oscClick.frequency.exponentialRampToValueAtTime(1200, now + 0.009);

  gainClick.gain.setValueAtTime(0.0001, now);
  gainClick.gain.exponentialRampToValueAtTime(0.08, now + 0.0015);
  gainClick.gain.exponentialRampToValueAtTime(0.0001, now + 0.012);

  oscClick.connect(gainClick);
  gainClick.connect(ctx.destination);
  oscClick.start(now);
  oscClick.stop(now + 0.015);

  // 2. High-frequency tactile friction snap
  const snapBufferSize = Math.floor(ctx.sampleRate * 0.018);
  const snapBuffer = ctx.createBuffer(1, snapBufferSize, ctx.sampleRate);
  const snapData = snapBuffer.getChannelData(0);
  for (let i = 0; i < snapBufferSize; i++) {
    snapData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (snapBufferSize * 0.25));
  }

  const snapSource = ctx.createBufferSource();
  snapSource.buffer = snapBuffer;

  const snapFilter = ctx.createBiquadFilter();
  snapFilter.type = "highpass";
  snapFilter.frequency.setValueAtTime(2400, now);

  const snapGain = ctx.createGain();
  snapGain.gain.setValueAtTime(0.0001, now);
  snapGain.gain.exponentialRampToValueAtTime(0.06, now + 0.001);
  snapGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.018);

  snapSource.connect(snapFilter);
  snapFilter.connect(snapGain);
  snapGain.connect(ctx.destination);
  snapSource.start(now);
  snapSource.stop(now + 0.02);

  // 3. Silky, airy slide whoosh
  const whooshBufferSize = Math.floor(ctx.sampleRate * slideDuration);
  const whooshBuffer = ctx.createBuffer(1, whooshBufferSize, ctx.sampleRate);
  const whooshData = whooshBuffer.getChannelData(0);
  for (let i = 0; i < whooshBufferSize; i++) {
    whooshData[i] = Math.random() * 2 - 1;
  }

  const whooshSource = ctx.createBufferSource();
  whooshSource.buffer = whooshBuffer;

  const whooshFilter = ctx.createBiquadFilter();
  whooshFilter.type = "bandpass";
  whooshFilter.frequency.setValueAtTime(800, now);
  whooshFilter.frequency.exponentialRampToValueAtTime(2200, now + 0.08);
  whooshFilter.frequency.exponentialRampToValueAtTime(650, now + slideDuration);
  whooshFilter.Q.setValueAtTime(1.8, now);

  const whooshGain = ctx.createGain();
  whooshGain.gain.setValueAtTime(0.0001, now);
  whooshGain.gain.exponentialRampToValueAtTime(0.038, now + 0.05);
  whooshGain.gain.exponentialRampToValueAtTime(0.0001, now + slideDuration);

  whooshSource.connect(whooshFilter);
  whooshFilter.connect(whooshGain);
  whooshGain.connect(ctx.destination);

  whooshSource.start(now);
  whooshSource.stop(now + slideDuration);
};

/** Synthesize an authentic acoustic rocket pre-ignition rumble + blast-off whoosh sound */
const playRocketFlightSound = () => {
  const ctx = getContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  const duration = 3.4;

  const bufferSize = Math.floor(ctx.sampleRate * duration);
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }

  const whiteNoise = ctx.createBufferSource();
  whiteNoise.buffer = noiseBuffer;

  const bandpass = ctx.createBiquadFilter();
  bandpass.type = "bandpass";
  bandpass.frequency.setValueAtTime(110, now);
  bandpass.frequency.linearRampToValueAtTime(140, now + 1.2);
  bandpass.frequency.exponentialRampToValueAtTime(640, now + 2.3);
  bandpass.frequency.exponentialRampToValueAtTime(260, now + duration);
  bandpass.Q.setValueAtTime(1.8, now);

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.0001, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.025, now + 0.3);
  noiseGain.gain.linearRampToValueAtTime(0.035, now + 1.2);
  noiseGain.gain.exponentialRampToValueAtTime(0.08, now + 2.1);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  whiteNoise.connect(bandpass);
  bandpass.connect(noiseGain);
  noiseGain.connect(ctx.destination);

  whiteNoise.start(now);
  whiteNoise.stop(now + duration);

  const subOsc = ctx.createOscillator();
  const subGain = ctx.createGain();
  subOsc.type = "triangle";
  subOsc.frequency.setValueAtTime(65, now);
  subOsc.frequency.linearRampToValueAtTime(80, now + 1.2);
  subOsc.frequency.exponentialRampToValueAtTime(140, now + 2.0);
  subOsc.frequency.exponentialRampToValueAtTime(50, now + duration);

  subGain.gain.setValueAtTime(0.0001, now);
  subGain.gain.exponentialRampToValueAtTime(0.035, now + 0.3);
  subGain.gain.linearRampToValueAtTime(0.045, now + 1.2);
  subGain.gain.exponentialRampToValueAtTime(0.07, now + 2.0);
  subGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  subOsc.connect(subGain);
  subGain.connect(ctx.destination);

  subOsc.start(now);
  subOsc.stop(now + duration);
};

/**
 * Crisp, subtle "pop / tap" bubble acoustic for independent child tags
 * as they unfold into the mind map clusters.
 */
const playTagPopSound = (tagIndex = 0) => {
  const ctx = getContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  // Gentle ascending bubble frequencies (G5 to E6)
  const freqs = [783.99, 880.0, 987.77, 1046.5, 1174.66, 1318.51];
  const fundamental = freqs[Math.abs(Math.round(tagIndex)) % freqs.length];

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(fundamental, now);
  // Fast downward chirp gives authentic bubble "pup / pop" quality
  osc.frequency.exponentialRampToValueAtTime(fundamental * 0.55, now + 0.035);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.038, now + 0.002);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.048);
};

/**
 * Sharp, visceral sword-slash / whip-cut sound for strikethrough rate cancellation.
 */
let slashAudio: HTMLAudioElement | null = null;
const playSlashCutSound = (index = 0) => {
  if (typeof window === "undefined") return;
  try {
    if (!slashAudio) {
      slashAudio = new Audio(slashCutSoundData);
    }
    const soundClone = slashAudio.cloneNode() as HTMLAudioElement;
    soundClone.volume = 0.85;
    soundClone.currentTime = 0;
    soundClone.play().catch(() => undefined);
  } catch {
    // ignore
  }
};

const playFastWhooshSound = () => {
  const ctx = getContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  const duration = 0.22;
  const bufferSize = Math.floor(ctx.sampleRate * duration);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(800, now);
  filter.frequency.exponentialRampToValueAtTime(2800, now + 0.09);
  filter.frequency.exponentialRampToValueAtTime(600, now + duration);
  filter.Q.setValueAtTime(3.0, now);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.045, now + 0.08);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noise.start(now);
  noise.stop(now + duration);
};

/**
 * Deep mechanical pendulum signboard catch sound:
 * Initial soft metal chain tautness + warm wooden swing woosh.
 */
const playPendulumDropSound = () => {
  const ctx = getContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  // 1. Cable / chain taut snap (metallic high tap)
  const oscTap = ctx.createOscillator();
  const gainTap = ctx.createGain();
  oscTap.type = "triangle";
  oscTap.frequency.setValueAtTime(2400, now);
  oscTap.frequency.exponentialRampToValueAtTime(400, now + 0.04);

  gainTap.gain.setValueAtTime(0.0001, now);
  gainTap.gain.exponentialRampToValueAtTime(0.06, now + 0.002);
  gainTap.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

  oscTap.connect(gainTap);
  gainTap.connect(ctx.destination);
  oscTap.start(now);
  oscTap.stop(now + 0.07);

  // 2. Heavy wooden/acrylic signboard body swing resonance (warm low thud + whoosh)
  const oscThud = ctx.createOscillator();
  const gainThud = ctx.createGain();
  oscThud.type = "sine";
  oscThud.frequency.setValueAtTime(140, now + 0.01);
  oscThud.frequency.exponentialRampToValueAtTime(65, now + 0.35);

  gainThud.gain.setValueAtTime(0.0001, now + 0.01);
  gainThud.gain.exponentialRampToValueAtTime(0.08, now + 0.04);
  gainThud.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

  oscThud.connect(gainThud);
  gainThud.connect(ctx.destination);
  oscThud.start(now + 0.01);
  oscThud.stop(now + 0.5);
};

/**
 * Authentic tactile card shuffle / heavy paper page flick sound:
 * 1. Initial quick thumb-release flick & paper edge snap (textured burst)
 * 2. Rapid multi-leaf air flutter (like riffling 2-3 deck cards or book pages)
 * 3. Dry, warm paper-to-felt landing thud (soft matte slap, zero synthetic oscillation)
 */
const playCardSlideSnapSound = (cardIndex = 0) => {
  const ctx = getContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  // Slight micro-variation based on card index so each shuffle sounds natural & non-mechanical
  const pitchVar = 1 + (cardIndex % 6) * 0.05;

  // 1. Tactile thumb flick / leaf riffle noise buffer
  const bufferLen = Math.floor(ctx.sampleRate * 0.14);
  const buffer = ctx.createBuffer(1, bufferLen, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  // Generate pink/brown velvet noise for authentic cardboard/paper texture
  let b0 = 0, b1 = 0, b2 = 0;
  for (let i = 0; i < bufferLen; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    const pink = b0 + b1 + b2 + white * 0.25;
    
    // Add micro-riffle ripples (simulating 3-4 cards fluttering past the thumb)
    const t = i / ctx.sampleRate;
    const flutterEnvelope = 1 + 0.35 * Math.sin(t * 180 * Math.PI);
    data[i] = pink * flutterEnvelope * 0.4;
  }

  const noiseSource = ctx.createBufferSource();
  noiseSource.buffer = buffer;

  // Bandpass filter centered around 2,800Hz - 4,500Hz for that crisp cardboard edge brush
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(3200 * pitchVar, now);
  filter.Q.setValueAtTime(1.8, now);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.09, now + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.035, now + 0.06);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.13);

  noiseSource.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  noiseSource.start(now);
  noiseSource.stop(now + 0.14);

  // 2. Dry matte card landing "thwap" (the quiet physical impact on the table)
  const thudOsc = ctx.createOscillator();
  const thudGain = ctx.createGain();
  thudOsc.type = "sine";
  thudOsc.frequency.setValueAtTime(185 * pitchVar, now + 0.02);
  thudOsc.frequency.exponentialRampToValueAtTime(55, now + 0.075);

  thudGain.gain.setValueAtTime(0.0001, now + 0.02);
  thudGain.gain.exponentialRampToValueAtTime(0.07, now + 0.03);
  thudGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

  thudOsc.connect(thudGain);
  thudGain.connect(ctx.destination);
  thudOsc.start(now + 0.02);
  thudOsc.stop(now + 0.09);
};

let cardShuffleBufferPromise: Promise<AudioBuffer | null> | null = null;

const getCardShuffleBuffer = async (ctx: AudioContext): Promise<AudioBuffer | null> => {
  if (!cardShuffleBufferPromise) {
    cardShuffleBufferPromise = (async () => {
      try {
        const resp = await fetch(cardShuffleSoundData);
        const arrayBuf = await resp.arrayBuffer();
        const decoded = await ctx.decodeAudioData(arrayBuf);
        return decoded;
      } catch (err) {
        console.warn("Failed to decode card shuffle audio sample", err);
        return null;
      }
    })();
  }
  return cardShuffleBufferPromise;
};

/**
 * 10/10 Authentic card shuffle & page turn glide:
 * Uses the user's reference acoustic card flutter sample, enhanced with:
 * 1. Warm lowpass mastering to remove any high-frequency digital harshness.
 * 2. Dynamic subtle pitch variation per card step (so each of the 6 cards sounds natural).
 * 3. Soft tactile gain envelope with zero clipping.
 */
const playCardWhooshOutSound = async (cardIndex = 0) => {
  const ctx = getContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  try {
    const audioBuf = await getCardShuffleBuffer(ctx);
    if (audioBuf) {
      const source = ctx.createBufferSource();
      source.buffer = audioBuf;

      // Subtle musical micro-pitch variation (step 0 through 5)
      const pitchSteps = [1.0, 1.04, 0.98, 1.06, 1.02, 1.08];
      const pitchRatio = pitchSteps[cardIndex % pitchSteps.length];
      source.playbackRate.setValueAtTime(pitchRatio, now);

      // Warm acoustic mastering filter: gentle high-shelf/lowpass roll-off for meeting safety
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(5400, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, now);
      // Quick clean attack
      gain.gain.exponentialRampToValueAtTime(0.38, now + 0.012);
      // Smooth natural decay
      gain.gain.setValueAtTime(0.38, now + 0.18);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);

      source.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      source.start(now);
      source.stop(now + 0.42);
      return;
    }
  } catch {
    // Fallback if audio buffer decoding is unavailable
  }

  // Fallback procedural card slide
  const bufferLen = Math.floor(ctx.sampleRate * 0.12);
  const buffer = ctx.createBuffer(1, bufferLen, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  let b0 = 0, b1 = 0;
  for (let i = 0; i < bufferLen; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99 * b0 + white * 0.08;
    b1 = 0.95 * b1 + white * 0.12;
    data[i] = (b0 + b1) * 0.35;
  }

  const noiseSource = ctx.createBufferSource();
  noiseSource.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(2600, now);
  filter.frequency.exponentialRampToValueAtTime(800, now + 0.11);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.065, now + 0.025);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.115);

  noiseSource.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  noiseSource.start(now);
  noiseSource.stop(now + 0.12);
};

let waterBubbleBufferPromise: Promise<AudioBuffer | null> | null = null;

const getWaterBubbleBuffer = async (ctx: AudioContext): Promise<AudioBuffer | null> => {
  if (!waterBubbleBufferPromise) {
    waterBubbleBufferPromise = (async () => {
      try {
        const resp = await fetch(waterBubbleSoundData);
        const arrayBuf = await resp.arrayBuffer();
        const decoded = await ctx.decodeAudioData(arrayBuf);
        return decoded;
      } catch (err) {
        console.warn("Failed to decode water bubble audio sample", err);
        return null;
      }
    })();
  }
  return waterBubbleBufferPromise;
};

/**
 * Authentic liquid water trickle & bubble sound based on the user reference audio,
 * tailored to match the paced wave filling animation.
 */
const playWaterFillSound = async () => {
  const ctx = getContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  const duration = 1.6;

  try {
    const audioBuf = await getWaterBubbleBuffer(ctx);
    if (audioBuf) {
      const source = ctx.createBufferSource();
      source.buffer = audioBuf;

      // Soft bandpass/lowpass shaping for clean keynote aesthetics
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(3200, now);
      filter.frequency.exponentialRampToValueAtTime(1400, now + duration);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, now);
      // Fast smooth attack
      gain.gain.exponentialRampToValueAtTime(0.24, now + 0.08);
      // Gentle fade out at the end of the wave fill
      gain.gain.setValueAtTime(0.24, now + duration - 0.25);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      source.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      source.start(now);
      source.stop(now + duration + 0.05);
      return;
    }
  } catch {
    // Fallback to organic synthesis if audio decode fails
  }

  // Fallback procedural gentle water bubbling
  const bufferLen = Math.floor(ctx.sampleRate * duration);
  const buffer = ctx.createBuffer(1, bufferLen, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  let last = 0;
  for (let i = 0; i < bufferLen; i++) {
    const white = Math.random() * 2 - 1;
    last = 0.92 * last + white * 0.15;
    data[i] = last;
  }

  const noiseSource = ctx.createBufferSource();
  noiseSource.buffer = buffer;

  const bandpass = ctx.createBiquadFilter();
  bandpass.type = "bandpass";
  bandpass.Q.setValueAtTime(3.8, now);
  bandpass.frequency.setValueAtTime(380, now);
  bandpass.frequency.exponentialRampToValueAtTime(780, now + duration);

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.0001, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.045, now + 0.18);
  noiseGain.gain.setValueAtTime(0.045, now + duration - 0.25);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  noiseSource.connect(bandpass);
  bandpass.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  noiseSource.start(now);
  noiseSource.stop(now + duration + 0.05);
};

/**
 * Satisfying tactile "shuup" air suction glide & cushioned magnetic pill snap
 * for label drop on "Time." / "Minutes."
 */
const playPillDropSound = () => {
  const ctx = getContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  // 1. "Shuup" aerodynamic velvet suction whoosh (smooth inward air glide)
  const whooshLen = Math.floor(ctx.sampleRate * 0.16);
  const whooshBuffer = ctx.createBuffer(1, whooshLen, ctx.sampleRate);
  const whooshData = whooshBuffer.getChannelData(0);

  let b0 = 0, b1 = 0;
  for (let i = 0; i < whooshLen; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.985 * b0 + white * 0.09;
    b1 = 0.94 * b1 + white * 0.14;
    whooshData[i] = (b0 + b1) * 0.38;
  }

  const whooshSource = ctx.createBufferSource();
  whooshSource.buffer = whooshBuffer;

  // Bandpass filter sweeping inward for that signature "shuup" suction
  const whooshFilter = ctx.createBiquadFilter();
  whooshFilter.type = "bandpass";
  whooshFilter.Q.setValueAtTime(2.2, now);
  whooshFilter.frequency.setValueAtTime(1100, now);
  whooshFilter.frequency.exponentialRampToValueAtTime(2400, now + 0.08);
  whooshFilter.frequency.exponentialRampToValueAtTime(750, now + 0.15);

  const whooshGain = ctx.createGain();
  whooshGain.gain.setValueAtTime(0.0001, now);
  whooshGain.gain.exponentialRampToValueAtTime(0.085, now + 0.06);
  whooshGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.155);

  whooshSource.connect(whooshFilter);
  whooshFilter.connect(whooshGain);
  whooshGain.connect(ctx.destination);
  whooshSource.start(now);
  whooshSource.stop(now + 0.16);

  // 2. Soft, rich cushioned magnetic dock thud (corks into place)
  const landingTime = now + 0.065;
  const thudOsc = ctx.createOscillator();
  const thudGain = ctx.createGain();
  thudOsc.type = "sine";
  thudOsc.frequency.setValueAtTime(220, landingTime);
  thudOsc.frequency.exponentialRampToValueAtTime(60, landingTime + 0.11);

  thudGain.gain.setValueAtTime(0.0001, landingTime);
  thudGain.gain.exponentialRampToValueAtTime(0.09, landingTime + 0.012);
  thudGain.gain.exponentialRampToValueAtTime(0.0001, landingTime + 0.12);

  thudOsc.connect(thudGain);
  thudGain.connect(ctx.destination);
  thudOsc.start(landingTime);
  thudOsc.stop(landingTime + 0.13);

  // 3. Crisp, micro-matte contact click
  const snapOsc = ctx.createOscillator();
  const snapGain = ctx.createGain();
  snapOsc.type = "triangle";
  snapOsc.frequency.setValueAtTime(1650, landingTime);
  snapOsc.frequency.exponentialRampToValueAtTime(420, landingTime + 0.035);

  snapGain.gain.setValueAtTime(0.0001, landingTime);
  snapGain.gain.exponentialRampToValueAtTime(0.055, landingTime + 0.004);
  snapGain.gain.exponentialRampToValueAtTime(0.0001, landingTime + 0.04);

  snapOsc.connect(snapGain);
  snapGain.connect(ctx.destination);
  snapOsc.start(landingTime);
  snapOsc.stop(landingTime + 0.045);
};

let paperRollBufferPromise: Promise<AudioBuffer | null> | null = null;

const getPaperRollBuffer = async (ctx: AudioContext): Promise<AudioBuffer | null> => {
  if (!paperRollBufferPromise) {
    paperRollBufferPromise = (async () => {
      try {
        const resp = await fetch(paperRollAudioData);
        const arrayBuf = await resp.arrayBuffer();
        const decoded = await ctx.decodeAudioData(arrayBuf);
        return decoded;
      } catch (err) {
        console.warn("Failed to decode paper roll audio sample", err);
        return null;
      }
    })();
  }
  return paperRollBufferPromise;
};

/**
 * Authentic tactile crisp parchment/paper unrolling sound effect
 * played directly from the user's high-fidelity recording
 */
const playPaperUnfoldSound = async () => {
  const ctx = getContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  try {
    const audioBuffer = await getPaperRollBuffer(ctx);
    if (audioBuffer) {
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;

      // Master gain for natural, crisp presentation volume
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.85, now);

      source.connect(gain);
      gain.connect(ctx.destination);
      source.start(now);
      return;
    }
  } catch {
    // Fallback if audio buffer decoding is unavailable
  }

  // Fallback high-frequency fibrous paper scrape & micro-crinkle synthesis
  const duration = 1.75;
  const frictionLen = Math.floor(ctx.sampleRate * duration);
  const frictionBuffer = ctx.createBuffer(1, frictionLen, ctx.sampleRate);
  const frictionData = frictionBuffer.getChannelData(0);

  let b0 = 0, b1 = 0;
  for (let i = 0; i < frictionLen; i++) {
    const t = i / ctx.sampleRate;
    const progress = t / duration;
    const white = Math.random() * 2 - 1;
    b0 = 0.82 * b0 + white * 0.18;
    b1 = 0.55 * b1 + white * 0.45;
    const rotationRipple = 1 + 0.35 * Math.sin(t * (24 - 12 * progress) * Math.PI);
    frictionData[i] = (white * 0.5 + b1 * 0.35 - b0 * 0.2) * rotationRipple * 0.38;
  }

  const frictionSource = ctx.createBufferSource();
  frictionSource.buffer = frictionBuffer;

  const bandpass = ctx.createBiquadFilter();
  bandpass.type = "bandpass";
  bandpass.Q.setValueAtTime(2.2, now);
  bandpass.frequency.setValueAtTime(3200, now);
  bandpass.frequency.exponentialRampToValueAtTime(4200, now + 0.5);
  bandpass.frequency.exponentialRampToValueAtTime(3300, now + duration);

  const highpass = ctx.createBiquadFilter();
  highpass.type = "highpass";
  highpass.frequency.setValueAtTime(1800, now);

  const frictionGain = ctx.createGain();
  frictionGain.gain.setValueAtTime(0.0001, now);
  frictionGain.gain.exponentialRampToValueAtTime(0.07, now + 0.1);
  frictionGain.gain.setValueAtTime(0.065, now + duration - 0.3);
  frictionGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  frictionSource.connect(bandpass);
  bandpass.connect(highpass);
  highpass.connect(frictionGain);
  frictionGain.connect(ctx.destination);
  frictionSource.start(now);
  frictionSource.stop(now + duration + 0.05);
};


/**
 * Realistic physical ball bounce on a hard floor (matching user reference audio):
 * Sharp tactile click (~1900 Hz), warm wooden resonance (~320 Hz), and deep floor impact thump (~65 Hz).
 */
const playBallBounceSound = (intensity = 1.0) => {
  const ctx = getContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  const isPrimary = intensity >= 0.7;

  // 1. Sharp tactile surface contact slap / click (matching 1915 Hz user knuckle/ball tap)
  const noiseBuf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.025), ctx.sampleRate);
  const data = noiseBuf.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.004));
  }
  const noiseSrc = ctx.createBufferSource();
  noiseSrc.buffer = noiseBuf;
  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = 'bandpass';
  noiseFilter.frequency.setValueAtTime(isPrimary ? 1900 : 2200, now);
  noiseFilter.Q.setValueAtTime(2.8, now);
  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(isPrimary ? 0.12 : 0.05, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);

  noiseSrc.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  noiseSrc.start(now);

  // 2. Woody resonant body pitch drop
  const osc = ctx.createOscillator();
  const oscGain = ctx.createGain();
  osc.type = 'triangle';
  const startFreq = isPrimary ? 380 : 440;
  const endFreq = isPrimary ? 120 : 160;
  const duration = isPrimary ? 0.12 : 0.07;
  osc.frequency.setValueAtTime(startFreq, now);
  osc.frequency.exponentialRampToValueAtTime(endFreq, now + duration);

  const vol = (isPrimary ? 0.22 : 0.11) * Math.max(0.2, Math.min(intensity, 1.5));
  oscGain.gain.setValueAtTime(0.0001, now);
  oscGain.gain.exponentialRampToValueAtTime(vol, now + 0.002);
  oscGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc.connect(oscGain);
  oscGain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + duration + 0.02);

  // 3. Deep floor body thump
  if (isPrimary) {
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(85, now);
    subOsc.frequency.exponentialRampToValueAtTime(38, now + 0.15);
    subGain.gain.setValueAtTime(0.0001, now);
    subGain.gain.exponentialRampToValueAtTime(0.24, now + 0.005);
    subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
    subOsc.connect(subGain);
    subGain.connect(ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 0.18);
  }
};

/**
 * Authentic Heavy Bowling Ball on Wooden Platform Acoustic Engine (v2.0)
 * - Zero high-frequency hiss ("sususu" completely eliminated)
 * - Psychoacoustic Harmonic Waveshaping for full audibility on laptop speakers
 * - Dynamic Velocity-Coupled Wood Plank Seam Impacts
 */
let activeBallRollStopper: (() => void) | null = null;

/**
 * Authentic Organic Wooden Floor Ball Roll Sound
 * - Pure physical contact friction & low-frequency wood resonance
 * - ZERO pitch-bending synth sweeps (completely eliminates any "cow/huuu" tone)
 * - Micro-textured surface contact
 */
const playBallRollSound = (duration = 1.6) => {
  const ctx = getContext();
  if (!ctx) return;
  if (activeBallRollStopper) {
    activeBallRollStopper();
    activeBallRollStopper = null;
  }
  const now = ctx.currentTime;

  // 1. Friction Noise Buffer (Pink/Brown filtered contact noise)
  const bufferSize = Math.floor(ctx.sampleRate * duration);
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = noiseBuffer.getChannelData(0);
  let b0 = 0, b1 = 0, b2 = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    // Brown/pink filter formula for deep friction rumble
    b0 = 0.99 * b0 + white * 0.05;
    b1 = 0.95 * b1 + white * 0.1;
    b2 = 0.85 * b2 + white * 0.15;
    data[i] = (b0 + b1 + b2) * 0.35;
  }

  const noiseSource = ctx.createBufferSource();
  noiseSource.buffer = noiseBuffer;

  // Resonant low-pass filter (fixed at 180Hz - NO pitch sweep!)
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(180, now);
  filter.Q.setValueAtTime(1.8, now);

  // Body cavity bandpass (fixed woody body resonance at 110Hz - NO pitch sweep!)
  const bodyFilter = ctx.createBiquadFilter();
  bodyFilter.type = "bandpass";
  bodyFilter.frequency.setValueAtTime(110, now);
  bodyFilter.Q.setValueAtTime(2.2, now);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.28, now + 0.08);
  gain.gain.linearRampToValueAtTime(0.22, now + duration * 0.7);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  noiseSource.connect(filter);
  filter.connect(bodyFilter);
  bodyFilter.connect(gain);
  gain.connect(ctx.destination);

  noiseSource.start(now);
  noiseSource.stop(now + duration);

  activeBallRollStopper = () => {
    try {
      gain.gain.cancelScheduledValues(ctx.currentTime);
      gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.04);
      setTimeout(() => {
        try { noiseSource.stop(); } catch(e){}
      }, 50);
    } catch(e) {}
  };
};

/**
 * Crisp jump liftoff whoosh
 */
const playJumpWhooshSound = () => {
  const ctx = getContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  const duration = 0.28;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(160, now);
  osc.frequency.exponentialRampToValueAtTime(480, now + duration);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.14, now + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + duration);
};

export const presentationSound = {
  isMuted: () => muted,
  stopBallRoll: () => {
    if (activeBallRollStopper) {
      activeBallRollStopper();
      activeBallRollStopper = null;
    }
  },
  subscribe(listener: (nextMuted: boolean) => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  setMuted(nextMuted: boolean) {
    muted = nextMuted;
    try {
      window.localStorage.setItem(STORAGE_KEY, nextMuted ? "off" : "on");
    } catch {
      // Sound still works for the current session when storage is unavailable.
    }
    if (!nextMuted) {
      const audioContext = getContext();
      audioContext?.resume().catch(() => undefined);
    }
    listeners.forEach((listener) => listener(muted));
  },
  play(kind: PresentationSound, param?: number) {
    if (muted || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (kind === "click") tone(420, 0.07, 0.025);
    if (kind === "transition") {
      playSlideSlidingTransitionSound();
    }
    if (kind === "counterTick" || kind === "marimbaDrop") {
      playLiquidMarimbaDrop(param ?? 0);
    }
    if (kind === "counterSwell") {
      playCounterCompleteSwell();
    }
    if (kind === "reveal") {
      tone(440, 0.12, 0.03);
      tone(660, 0.18, 0.025, 0.08);
    }
    if (kind === "launch") {
      tone(180, 0.22, 0.04);
      tone(520, 0.3, 0.03, 0.08);
    }
    if (kind === "hoverNode") {
      playHoverNodeSound(param ?? 0);
    }
    if (kind === "nodeReveal") {
      playNodeRevealSound(param ?? 0);
    }
    if (kind === "slashCut") {
      playSlashCutSound(param ?? 0);
    }
    if (kind === "whooshFast") {
      playFastWhooshSound();
    }
    if (kind === "tagPop") {
      playTagPopSound(param ?? 0);
    }
    if (kind === "rocket") {
      playRocketFlightSound();
    }
    if (kind === "pendulumDrop") {
      playPendulumDropSound();
    }
    if (kind === "cardSlideSnap") {
      playCardSlideSnapSound(param ?? 0);
    }
    if (kind === "cardWhooshOut") {
      playCardWhooshOutSound(param ?? 0);
    }
    if (kind === "waterFill") {
      playWaterFillSound();
    }
    if (kind === "pillDrop") {
      playPillDropSound();
    }
    if (kind === "paperUnfold") {
      playPaperUnfoldSound();
    }
    if (kind === "ballBounce") {
      playBallBounceSound(param ?? 1.0);
    }
    if (kind === "jumpWhoosh") {
      playJumpWhooshSound();
    }
    if (kind === "ballRoll") {
      playBallRollSound(param ?? 3.5);
    }
  },
};

if (typeof window !== "undefined") {
  (window as unknown as { presentationSound?: typeof presentationSound }).presentationSound = presentationSound;
}
