let ctx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!ctx) ctx = new AudioContext();
  return ctx;
}

interface ToneParams {
  type: OscillatorType;
  freq: number;
  freqEnd?: number;
  a: number;
  d: number;
  s: number;
  r: number;
  g?: number;
}

function tone({ type, freq, freqEnd, a, d, s, r, g = 0.3 }: ToneParams) {
  try {
    const C = getCtx();
    if (C.state === "suspended") C.resume();
    const o = C.createOscillator();
    const e = C.createGain();
    o.connect(e);
    e.connect(C.destination);
    o.type = type;
    o.frequency.setValueAtTime(freq, C.currentTime);
    if (freqEnd)
      o.frequency.linearRampToValueAtTime(freqEnd, C.currentTime + a + d);
    e.gain.setValueAtTime(0, C.currentTime);
    e.gain.linearRampToValueAtTime(g, C.currentTime + a);
    e.gain.linearRampToValueAtTime(s * g, C.currentTime + a + d);
    e.gain.linearRampToValueAtTime(0, C.currentTime + a + d + r);
    o.start(C.currentTime);
    o.stop(C.currentTime + a + d + r + 0.05);
  } catch (e) {
    console.warn("sound err", e);
  }
}

const ok = () =>
  typeof window !== "undefined" &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const dockSounds = {
  phone: () => ok() && tone({ type: "sine", freq: 440, a: 0.002, d: 0.03, s: 0, r: 0.02 }),
  camera: () =>
    ok() &&
    (tone({ type: "square", freq: 800, a: 0.001, d: 0.02, s: 0, r: 0.01, g: 0.15 }),
    tone({ type: "sine", freq: 1200, a: 0.001, d: 0.04, s: 0, r: 0.02, g: 0.1 })),
  calendar: () => ok() && tone({ type: "sine", freq: 660, a: 0.002, d: 0.025, s: 0, r: 0.015 }),
  charging: () =>
    ok() &&
    tone({ type: "sawtooth", freq: 120, freqEnd: 240, a: 0.01, d: 0.05, s: 0.2, r: 0.02, g: 0.2 }),
  bluetooth: () =>
    ok() &&
    (tone({ type: "sine", freq: 880, a: 0.002, d: 0.025, s: 0, r: 0.015, g: 0.2 }),
    setTimeout(
      () => tone({ type: "sine", freq: 1100, a: 0.002, d: 0.025, s: 0, r: 0.015, g: 0.15 }),
      60
    )),
  browser: () =>
    ok() && tone({ type: "sine", freq: 300, freqEnd: 600, a: 0.005, d: 0.04, s: 0, r: 0.01 }),
  ctReveal: () =>
    ok() &&
    (tone({ type: "sine", freq: 80, a: 0.01, d: 0.1, s: 0.3, r: 0.15, g: 0.5 }),
    setTimeout(
      () => tone({ type: "sawtooth", freq: 160, a: 0.005, d: 0.08, s: 0, r: 0.1, g: 0.3 }),
      80
    )),
  powerUp: () =>
    ok() &&
    tone({ type: "sawtooth", freq: 100, freqEnd: 800, a: 0.02, d: 0.3, s: 0.1, r: 0.2, g: 0.4 }),
  // Easter egg sounds for dead CT controls
  denied: () =>
    ok() &&
    (tone({ type: "square", freq: 200, a: 0.002, d: 0.06, s: 0, r: 0.03, g: 0.15 }),
    setTimeout(
      () => tone({ type: "square", freq: 150, a: 0.002, d: 0.08, s: 0, r: 0.04, g: 0.12 }),
      80
    )),
  frunkOpen: () =>
    ok() &&
    (tone({ type: "sine", freq: 220, freqEnd: 440, a: 0.01, d: 0.15, s: 0.1, r: 0.1, g: 0.25 }),
    setTimeout(
      () => tone({ type: "sine", freq: 660, a: 0.005, d: 0.05, s: 0, r: 0.03, g: 0.15 }),
      180
    )),
  tonneauSlide: () =>
    ok() &&
    tone({ type: "sawtooth", freq: 80, freqEnd: 160, a: 0.02, d: 0.2, s: 0.15, r: 0.1, g: 0.2 }),
};
