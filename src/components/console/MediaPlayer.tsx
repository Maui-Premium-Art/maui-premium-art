"use client";

import { useRef, useState, useEffect, useCallback } from "react";

const ALL_TRACKS = [
  { title: "Hawaiian Ska", artist: "Hetyati", genre: "Hawaiian Ska", src: "/music/hawaiian-ska.mp3" },
  { title: "Hawaiian Peaceful", artist: "James Franco Jr", genre: "Hawaiian", src: "/music/hawaiian-peaceful.mp3" },
  { title: "Blue Island", artist: "Matthew Mike Music", genre: "Hawaiian", src: "/music/blue-island.mp3" },
  { title: "Trouble in the Tiki Bar", artist: "AI Picture This", genre: "Hawaiian", src: "/music/trouble-in-the-tiki-bar.mp3" },
  { title: "Hawaiian Sea", artist: "Alana Jordan", genre: "Hawaiian", src: "/music/hawaiian-sea.mp3" },
  { title: "Happy Ukulele", artist: "Emmraan", genre: "Hawaiian", src: "/music/happy-ukulele.mp3" },
  { title: "Luau", artist: "Matthew Mike Music", genre: "Hawaiian", src: "/music/luau.mp3" },
  { title: "Having Fun", artist: "Nerdworld", genre: "Hawaiian", src: "/music/having-fun.mp3" },
  { title: "A Cheerful World", artist: "Red Productions", genre: "Hawaiian", src: "/music/cheerful-world.mp3" },
  { title: "Wave", artist: "Tooone", genre: "Hawaiian", src: "/music/wave.mp3" },
  { title: "Honohono", artist: "Yasuko", genre: "Hawaiian", src: "/music/honohono.mp3" },
];

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function MediaPlayer() {
  const [tracks, setTracks] = useState(ALL_TRACKS);

  // Shuffle on client only to avoid hydration mismatch (BUG-005)
  useEffect(() => {
    setTracks(shuffleArray(ALL_TRACKS));
  }, []);
  const [playing, setPlaying] = useState(false);
  const [trackIdx, setTrackIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [elapsed, setElapsed] = useState("0:00");
  const [totalDuration, setTotalDuration] = useState("0:00");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const rafRef = useRef<number>(0);

  const track = tracks[trackIdx];

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

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
    if (playing) rafRef.current = requestAnimationFrame(drawWaveform);
  }, [playing]);

  const drawFlatLine = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
  }, []);

  const ensureAudioContext = useCallback(() => {
    if (audioCtxRef.current) return;
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 256;
    analyserRef.current = analyser;
    const gain = ctx.createGain();
    gain.gain.value = 1.0;
    gainRef.current = gain;
  }, []);

  const connectSource = useCallback((audio: HTMLAudioElement) => {
    const ctx = audioCtxRef.current;
    const analyser = analyserRef.current;
    const gain = gainRef.current;
    if (!ctx || !analyser || !gain) return;
    // Disconnect old source if exists
    if (sourceRef.current) {
      try { sourceRef.current.disconnect(); } catch {}
    }
    const source = ctx.createMediaElementSource(audio);
    // Chain: source → analyser → gain → destination (BUG-004 fix)
    source.connect(analyser);
    analyser.connect(gain);
    gain.connect(ctx.destination);
    sourceRef.current = source;
  }, []);

  const playTrack = useCallback((idx: number) => {
    ensureAudioContext();
    const t = tracks[idx];
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.removeAttribute("src");
    }
    const audio = new Audio(t.src);
    audio.crossOrigin = "anonymous";
    audioRef.current = audio;

    audio.addEventListener("loadedmetadata", () => {
      setTotalDuration(formatTime(audio.duration));
    });
    audio.addEventListener("ended", () => {
      // Auto-advance to next track
      const nextIdx = (idx + 1) % tracks.length;
      setTrackIdx(nextIdx);
      playTrack(nextIdx);
    });

    connectSource(audio);
    audio.play().catch(() => {});
    setPlaying(true);
  }, [tracks, ensureAudioContext, connectSource]);

  const togglePlay = useCallback(() => {
    if (playing) {
      audioRef.current?.pause();
      setPlaying(false);
      cancelAnimationFrame(rafRef.current);
      drawFlatLine();
    } else {
      if (audioRef.current?.src) {
        audioRef.current.play().catch(() => {});
        setPlaying(true);
      } else {
        playTrack(trackIdx);
      }
    }
  }, [playing, trackIdx, playTrack, drawFlatLine]);

  const nextTrack = useCallback(() => {
    const next = (trackIdx + 1) % tracks.length;
    setTrackIdx(next);
    setProgress(0);
    setElapsed("0:00");
    if (playing) playTrack(next);
  }, [trackIdx, tracks.length, playing, playTrack]);

  const prevTrack = useCallback(() => {
    const prev = (trackIdx - 1 + tracks.length) % tracks.length;
    setTrackIdx(prev);
    setProgress(0);
    setElapsed("0:00");
    if (playing) playTrack(prev);
  }, [trackIdx, tracks.length, playing, playTrack]);

  // Update progress bar and elapsed time
  useEffect(() => {
    if (!playing) return;
    drawWaveform();
    const interval = setInterval(() => {
      const audio = audioRef.current;
      if (!audio || !audio.duration) return;
      setElapsed(formatTime(audio.currentTime));
      setProgress((audio.currentTime / audio.duration) * 100);
    }, 500);
    return () => clearInterval(interval);
  }, [playing, drawWaveform]);

  useEffect(() => { drawFlatLine(); }, [drawFlatLine]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
      audioRef.current?.pause();
      if (sourceRef.current) try { sourceRef.current.disconnect(); } catch {}
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  return (
    <div
      role="region"
      aria-label="Hawaiian Radio music player"
      style={{
        background: "#14141e",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 14,
        padding: "10px 12px 10px",
        flex: 1,
        minWidth: 0,
        fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
      }}
    >
      <div style={{ fontSize: 9, fontWeight: 600, color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", textTransform: "uppercase" as const, marginBottom: 6 }}>
        Hawaiian Radio
      </div>
      <div style={{ marginBottom: 6 }} aria-live="polite">
        <div style={{ fontSize: 13, fontWeight: 500, color: "#ffffff", letterSpacing: "0.01em", lineHeight: 1.3 }}>{track.title}</div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 1, lineHeight: 1.3 }}>{track.artist} · {track.genre}</div>
      </div>

      <canvas
        ref={canvasRef}
        width={300}
        height={20}
        role="img"
        aria-label="Audio waveform visualization"
        style={{ width: "100%", height: 20, marginBottom: 3, borderRadius: 2 }}
      />

      <div
        role="progressbar"
        aria-label="Track progress"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{ height: 2.5, background: "rgba(255,255,255,0.08)", borderRadius: 2, marginBottom: 4, position: "relative" as const, cursor: "pointer" }}
      >
        <div style={{ width: `${progress}%`, height: "100%", background: "rgba(255,255,255,0.55)", borderRadius: 2, transition: "width 0.5s linear" }} />
        <div style={{ position: "absolute" as const, left: `${progress}%`, top: "50%", transform: "translate(-50%, -50%)", width: 8, height: 8, borderRadius: "50%", background: "#ffffff", boxShadow: "0 0 4px rgba(0,0,0,0.4)" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "rgba(255,255,255,0.28)", marginBottom: 6, fontVariantNumeric: "tabular-nums" as const }}>
        <span>{elapsed}</span>
        <span>{totalDuration}</span>
      </div>

      <div role="toolbar" aria-label="Playback controls" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button style={btnStyle} aria-label="Shuffle">
          <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
            <path d="M1 10h2l3-3M1 4h2l8 6h4M11 4h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13 2l2 2-2 2M13 8l2 2-2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button style={btnStyle} aria-label="Previous track" onClick={prevTrack}>
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
        <button style={btnStyle} aria-label="Next track" onClick={nextTrack}>
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
