export interface VisualizerPreset {
  name: string;
  description: string;
  render: (
    ctx: CanvasRenderingContext2D,
    data: Uint8Array,
    width: number,
    height: number,
    time: number,
  ) => void;
}

// ── Preset 1: Frequency Bars ──────────────────────────────────────────────
function renderFrequencyBars(
  ctx: CanvasRenderingContext2D,
  data: Uint8Array,
  width: number,
  height: number,
) {
  const bars = 64;
  const barWidth = width / bars - 2;
  const gap = 2;

  ctx.clearRect(0, 0, width, height);

  for (let i = 0; i < bars; i++) {
    const magnitude = data[i] / 255;
    const barHeight = Math.max(2, magnitude * height * 0.85);
    const x = i * (barWidth + gap);
    const y = height - barHeight;
    const alpha = 0.3 + magnitude * 0.7;

    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.fillRect(x, y, barWidth, barHeight);
  }
}

// ── Preset 2: Waveform Oscilloscope ───────────────────────────────────────
function renderWaveform(
  ctx: CanvasRenderingContext2D,
  data: Uint8Array,
  width: number,
  height: number,
) {
  ctx.clearRect(0, 0, width, height);

  const sliceWidth = width / data.length;

  ctx.shadowBlur = 8;
  ctx.shadowColor = "rgba(74, 200, 255, 0.6)";
  ctx.strokeStyle = "rgba(74, 200, 255, 0.8)";
  ctx.lineWidth = 2;

  ctx.beginPath();
  for (let i = 0; i < data.length; i++) {
    const v = data[i] / 128.0;
    const y = (v * height) / 2;
    const x = i * sliceWidth;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  ctx.shadowBlur = 0;
}

// ── Preset 3: Circular Radial ─────────────────────────────────────────────
function renderCircularRadial(
  ctx: CanvasRenderingContext2D,
  data: Uint8Array,
  width: number,
  height: number,
) {
  ctx.clearRect(0, 0, width, height);

  const cx = width / 2;
  const cy = height / 2;
  const baseRadius = Math.min(width, height) * 0.15;
  const maxBarLen = Math.min(width, height) * 0.3;
  const bins = data.length;

  let avg = 0;
  for (let i = 0; i < bins; i++) avg += data[i];
  avg = avg / bins / 255;
  const pulseRadius = baseRadius + avg * 10;

  for (let i = 0; i < bins; i++) {
    const angle = (i / bins) * Math.PI * 2 - Math.PI / 2;
    const magnitude = data[i] / 255;
    const barLen = magnitude * maxBarLen;
    const x1 = cx + Math.cos(angle) * pulseRadius;
    const y1 = cy + Math.sin(angle) * pulseRadius;
    const x2 = cx + Math.cos(angle) * (pulseRadius + barLen);
    const y2 = cy + Math.sin(angle) * (pulseRadius + barLen);

    const alpha = 0.2 + magnitude * 0.8;
    ctx.strokeStyle = `rgba(74, 158, 255, ${alpha})`;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 + avg * 0.3})`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(cx, cy, pulseRadius, 0, Math.PI * 2);
  ctx.stroke();
}

// ── Preset 4: Spectrogram Waterfall ───────────────────────────────────────
let spectrogramHistory: number[][] = [];

function renderSpectrogram(
  ctx: CanvasRenderingContext2D,
  data: Uint8Array,
  width: number,
  height: number,
) {
  const column = Array.from(data);
  spectrogramHistory.push(column);

  const maxColumns = Math.ceil(width / 2);
  if (spectrogramHistory.length > maxColumns) {
    spectrogramHistory = spectrogramHistory.slice(-maxColumns);
  }

  ctx.clearRect(0, 0, width, height);

  const colWidth = 2;
  const binHeight = height / data.length;

  for (let col = 0; col < spectrogramHistory.length; col++) {
    const frame = spectrogramHistory[col];
    const x = col * colWidth;

    for (let bin = 0; bin < frame.length; bin++) {
      const magnitude = frame[bin] / 255;
      const y = height - (bin + 1) * binHeight;

      const r = Math.floor(magnitude * magnitude * 255);
      const g = Math.floor(magnitude * 200);
      const b = Math.floor(100 + magnitude * 155);
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.fillRect(x, y, colWidth, binHeight);
    }
  }
}

// ── Preset 5: Particle Burst ──────────────────────────────────────────────
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

const particles: Particle[] = [];
const MAX_PARTICLES = 200;

function renderParticleBurst(
  ctx: CanvasRenderingContext2D,
  data: Uint8Array,
  width: number,
  height: number,
) {
  ctx.clearRect(0, 0, width, height);

  let energy = 0;
  for (let i = 0; i < 10; i++) energy += data[i];
  energy = energy / (10 * 255);

  const cx = width / 2;
  const cy = height / 2;

  if (energy > 0.4 && particles.length < MAX_PARTICLES) {
    const burst = Math.floor(energy * 15);
    for (let i = 0; i < burst; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + energy * 4 + Math.random() * 2;
      particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 40 + Math.random() * 60,
        size: 1 + Math.random() * 2,
      });
    }
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vx *= 0.98;
    p.vy *= 0.98;
    p.life++;

    if (p.life >= p.maxLife) {
      particles.splice(i, 1);
      continue;
    }

    if (p.x < 0) p.x = width;
    if (p.x > width) p.x = 0;
    if (p.y < 0) p.y = height;
    if (p.y > height) p.y = 0;

    const alpha = 0.8 * (1 - p.life / p.maxLife);
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// ── Export all presets ─────────────────────────────────────────────────────
export const VISUALIZER_PRESETS: VisualizerPreset[] = [
  { name: "Frequency Bars", description: "CT-style vertical frequency display", render: renderFrequencyBars },
  { name: "Waveform", description: "Oscilloscope waveform trace", render: renderWaveform },
  { name: "Circular Radial", description: "Radial frequency ring", render: renderCircularRadial },
  { name: "Spectrogram", description: "Scrolling frequency waterfall", render: renderSpectrogram },
  { name: "Particle Burst", description: "Beat-reactive particle system", render: renderParticleBurst },
];

export function resetSpectrogramHistory() {
  spectrogramHistory = [];
}
