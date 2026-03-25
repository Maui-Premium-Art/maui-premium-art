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
        background: "#0c1a2e",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 10,
        padding: "8px 10px",
        flex: 1,
        minWidth: 0,
        fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
      }}
    >
      {/* Row 1: Album art left + title/artist right — matches CT layout */}
      <div style={{ display: "flex", gap: 10, paddingBottom: 6, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        {/* Album art — compact like real CT */}
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 4,
            background: "linear-gradient(135deg, #1a2d4a 0%, #0f1d35 50%, #1a3050 100%)",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          🌺
        </div>
        <div style={{ minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center" }} aria-live="polite">
          <div style={{ fontSize: 13, fontWeight: 600, color: "#ffffff", letterSpacing: "0.01em", lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{track.title}</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2, lineHeight: 1.2 }}>
            {track.artist} · <span style={{ color: "rgba(74,158,255,0.5)" }}>HAWAIIAN RADIO</span>
          </div>
        </div>
      </div>

      {/* Hidden canvas for audio visualization — kept for functionality */}
      <canvas
        ref={canvasRef}
        width={300}
        height={20}
        role="img"
        aria-label="Audio waveform visualization"
        style={{ width: "100%", height: 0, overflow: "hidden", marginBottom: 0 }}
      />

      {/* Row 2: Controls — flat row like real CT (prev, pause, next, eq, search) */}
      <div role="toolbar" aria-label="Playback controls" style={{ display: "flex", alignItems: "center", justifyContent: "space-around", paddingTop: 6 }}>
        <button style={btnStyle} aria-label="Previous track" onClick={prevTrack}>
          <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
            <rect x="1" y="2" width="2" height="10" rx="0.8" fill="currentColor" />
            <path d="M14 2L5 7L14 12V2Z" fill="currentColor" />
          </svg>
        </button>
        <button
          style={btnStyle}
          aria-label={playing ? "Pause" : "Play"}
          onClick={togglePlay}
        >
          {playing ? (
            <svg width="14" height="14" viewBox="0 0 12 14" fill="none">
              <rect x="1" y="1" width="3.5" height="12" rx="0.8" fill="currentColor" />
              <rect x="7.5" y="1" width="3.5" height="12" rx="0.8" fill="currentColor" />
            </svg>
          ) : (
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
              <path d="M2 1L13 8L2 15V1Z" fill="currentColor" />
            </svg>
          )}
        </button>
        <button style={btnStyle} aria-label="Next track" onClick={nextTrack}>
          <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
            <rect x="13" y="2" width="2" height="10" rx="0.8" fill="currentColor" />
            <path d="M2 2L11 7L2 12V2Z" fill="currentColor" />
          </svg>
        </button>
        <button style={btnStyle} aria-label="Equalizer">
          <svg width="16" height="14" viewBox="0 0 16 16" fill="none">
            <line x1="3" y1="2" x2="3" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="8" y1="4" x2="8" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="13" y1="1" x2="13" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <button style={btnStyle} aria-label="Search">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.2" />
            <line x1="9" y1="9" x2="13" y2="13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
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
