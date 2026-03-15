"use client";

import { useRef, useState, useEffect, useCallback } from "react";

const TRACKS = [
  { title: "Slack Key Sessions", artist: "Keola Beamer", genre: "Hawaiian Slack Key" },
  { title: "Maui Sunset", artist: "Keola Beamer", genre: "Hawaiian Slack Key" },
  { title: "Aloha ʻOe", artist: "Israel Kamakawiwoʻole", genre: "Hawaiian" },
];

export default function MediaPlayer() {
  const [playing, setPlaying] = useState(false);
  const [trackIdx, setTrackIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [elapsed, setElapsed] = useState("0:00");
  const [duration, setDuration] = useState("4:28");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  const track = TRACKS[trackIdx];

  // Waveform visualization
  const drawWaveform = useCallback(() => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    if (!canvas || !analyser) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteTimeDomainData(dataArray);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "rgba(255,255,255,0.4)";
    ctx.beginPath();

    const sliceWidth = canvas.width / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      const y = (v * canvas.height) / 2;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
      x += sliceWidth;
    }

    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();

    if (playing) {
      rafRef.current = requestAnimationFrame(drawWaveform);
    }
  }, [playing]);

  // Ambient tone generator (slack key inspired harmonics)
  const startAudio = useCallback(() => {
    if (audioCtxRef.current) return;

    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    const analyser = ctx.createAnalyser();
    analyser.fftSize = 256;
    analyserRef.current = analyser;

    const gain = ctx.createGain();
    gain.gain.value = 0.08;
    gainRef.current = gain;

    // Slack key: layered harmonics for ambient Hawaiian sound
    const freqs = [196, 293.66, 392, 587.33]; // G3, D4, G4, D5
    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = i < 2 ? "sine" : "triangle";
      osc.frequency.value = freq;

      const oscGain = ctx.createGain();
      oscGain.gain.value = i === 0 ? 0.04 : 0.02;

      // Gentle LFO for wavering
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.3 + i * 0.1;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 2;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      osc.connect(oscGain);
      oscGain.connect(gain);
      osc.start();

      if (i === 0) oscillatorRef.current = osc;
    });

    gain.connect(analyser);
    analyser.connect(ctx.destination);

    startTimeRef.current = Date.now();
    setPlaying(true);
  }, []);

  const stopAudio = useCallback(() => {
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
      oscillatorRef.current = null;
      analyserRef.current = null;
      gainRef.current = null;
    }
    cancelAnimationFrame(rafRef.current);
    setPlaying(false);

    // Draw flat line
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(255,255,255,0.15)";
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
      }
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (playing) stopAudio();
    else startAudio();
  }, [playing, startAudio, stopAudio]);

  const nextTrack = useCallback(() => {
    setTrackIdx((i) => (i + 1) % TRACKS.length);
    setProgress(0);
    setElapsed("0:00");
    if (playing) {
      stopAudio();
      setTimeout(startAudio, 100);
    }
  }, [playing, startAudio, stopAudio]);

  const prevTrack = useCallback(() => {
    setTrackIdx((i) => (i - 1 + TRACKS.length) % TRACKS.length);
    setProgress(0);
    setElapsed("0:00");
    if (playing) {
      stopAudio();
      setTimeout(startAudio, 100);
    }
  }, [playing, startAudio, stopAudio]);

  // Update progress and waveform while playing
  useEffect(() => {
    if (!playing) return;

    drawWaveform();

    const interval = setInterval(() => {
      const totalSec = 268; // 4:28
      const elapsedSec = Math.floor((Date.now() - startTimeRef.current) / 1000) % totalSec;
      const m = Math.floor(elapsedSec / 60);
      const s = (elapsedSec % 60).toString().padStart(2, "0");
      setElapsed(`${m}:${s}`);
      setProgress((elapsedSec / totalSec) * 100);
    }, 500);

    return () => clearInterval(interval);
  }, [playing, drawWaveform]);

  // Draw flat line on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
  }, []);

  return (
    <div
      style={{
        background: "#14141e",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 14,
        padding: "12px 14px 14px",
        flex: 1,
        minWidth: 0,
        fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
      }}
    >
      <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", textTransform: "uppercase" as const, marginBottom: 10 }}>
        Hawaiian Radio
      </div>
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: "#ffffff", letterSpacing: "0.01em", lineHeight: 1.3 }}>{track.title}</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 2, lineHeight: 1.3 }}>{track.artist} · {track.genre}</div>
      </div>

      {/* Waveform visualization */}
      <canvas
        ref={canvasRef}
        width={300}
        height={24}
        style={{ width: "100%", height: 24, marginBottom: 4, borderRadius: 2 }}
      />

      {/* Progress bar */}
      <div style={{ height: 2.5, background: "rgba(255,255,255,0.08)", borderRadius: 2, marginBottom: 4, position: "relative" as const, cursor: "pointer" }}>
        <div style={{ width: `${progress}%`, height: "100%", background: "rgba(255,255,255,0.55)", borderRadius: 2, transition: "width 0.5s linear" }} />
        <div style={{ position: "absolute" as const, left: `${progress}%`, top: "50%", transform: "translate(-50%, -50%)", width: 8, height: 8, borderRadius: "50%", background: "#ffffff", boxShadow: "0 0 4px rgba(0,0,0,0.4)" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "rgba(255,255,255,0.28)", marginBottom: 10, fontVariantNumeric: "tabular-nums" as const }}>
        <span>{elapsed}</span>
        <span>{duration}</span>
      </div>

      {/* Transport controls */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button style={btnStyle} aria-label="Shuffle">
          <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
            <path d="M1 10h2l3-3M1 4h2l8 6h4M11 4h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13 2l2 2-2 2M13 8l2 2-2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button style={btnStyle} aria-label="Previous" onClick={prevTrack}>
          <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
            <rect x="1" y="2" width="2" height="10" rx="0.8" fill="currentColor" />
            <path d="M14 2L5 7L14 12V2Z" fill="currentColor" />
          </svg>
        </button>
        <button
          style={{
            ...btnStyle,
            background: playing ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "50%",
            width: 38,
            height: 38,
          }}
          aria-label={playing ? "Pause" : "Play"}
          onClick={togglePlay}
        >
          {playing ? (
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
              <rect x="1" y="1" width="3.5" height="12" rx="0.8" fill="white" />
              <rect x="7.5" y="1" width="3.5" height="12" rx="0.8" fill="white" />
            </svg>
          ) : (
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
              <path d="M2 1L13 8L2 15V1Z" fill="white" />
            </svg>
          )}
        </button>
        <button style={btnStyle} aria-label="Next" onClick={nextTrack}>
          <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
            <rect x="13" y="2" width="2" height="10" rx="0.8" fill="currentColor" />
            <path d="M2 2L11 7L2 12V2Z" fill="currentColor" />
          </svg>
        </button>
        <button style={btnStyle} aria-label="Repeat">
          <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
            <path d="M3 3h10a2 2 0 0 1 2 2v0M13 11H3a2 2 0 0 1-2-2v0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M11 1l2 2-2 2M5 9l-2 2 2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  color: "rgba(255,255,255,0.5)",
  cursor: "pointer",
  padding: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "opacity 0.15s ease",
};
