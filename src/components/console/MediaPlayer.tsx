"use client";

import { useRef, useState, useEffect, useCallback } from "react";

const ALL_TRACKS = [
  { title: "Hawaiian Ska", artist: "Hetyati", src: "/music/hawaiian-ska.mp3" },
  { title: "Hawaiian Peaceful", artist: "James Franco Jr", src: "/music/hawaiian-peaceful.mp3" },
  { title: "Blue Island", artist: "Matthew Mike Music", src: "/music/blue-island.mp3" },
  { title: "Trouble in the Tiki Bar", artist: "AI Picture This", src: "/music/trouble-in-the-tiki-bar.mp3" },
  { title: "Hawaiian Sea", artist: "Alana Jordan", src: "/music/hawaiian-sea.mp3" },
  { title: "Happy Ukulele", artist: "Emmraan", src: "/music/happy-ukulele.mp3" },
  { title: "Luau", artist: "Matthew Mike Music", src: "/music/luau.mp3" },
  { title: "Having Fun", artist: "Nerdworld", src: "/music/having-fun.mp3" },
  { title: "A Cheerful World", artist: "Red Productions", src: "/music/cheerful-world.mp3" },
  { title: "Wave", artist: "Tooone", src: "/music/wave.mp3" },
  { title: "Honohono", artist: "Yasuko", src: "/music/honohono.mp3" },
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
  useEffect(() => { setTracks(shuffleArray(ALL_TRACKS)); }, []);
  const [playing, setPlaying] = useState(false);
  const [trackIdx, setTrackIdx] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const track = tracks[trackIdx];

  const ensureAudioContext = useCallback(() => {
    if (audioCtxRef.current) return;
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;
    const gain = ctx.createGain();
    gain.gain.value = 1.0;
    gainRef.current = gain;
  }, []);

  const connectSource = useCallback((audio: HTMLAudioElement) => {
    const ctx = audioCtxRef.current;
    const gain = gainRef.current;
    if (!ctx || !gain) return;
    if (sourceRef.current) { try { sourceRef.current.disconnect(); } catch {} }
    const source = ctx.createMediaElementSource(audio);
    source.connect(gain);
    gain.connect(ctx.destination);
    sourceRef.current = source;
  }, []);

  const playTrack = useCallback((idx: number) => {
    ensureAudioContext();
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.removeAttribute("src"); }
    const audio = new Audio(tracks[idx].src);
    audio.crossOrigin = "anonymous";
    audioRef.current = audio;
    audio.addEventListener("ended", () => {
      const n = (idx + 1) % tracks.length;
      setTrackIdx(n); playTrack(n);
    });
    connectSource(audio);
    audio.play().catch(() => {});
    setPlaying(true);
  }, [tracks, ensureAudioContext, connectSource]);

  const togglePlay = useCallback(() => {
    if (playing) { audioRef.current?.pause(); setPlaying(false); }
    else if (audioRef.current?.src) { audioRef.current.play().catch(() => {}); setPlaying(true); }
    else { playTrack(trackIdx); }
  }, [playing, trackIdx, playTrack]);

  const nextTrack = useCallback(() => {
    const n = (trackIdx + 1) % tracks.length;
    setTrackIdx(n); if (playing) playTrack(n);
  }, [trackIdx, tracks.length, playing, playTrack]);

  const prevTrack = useCallback(() => {
    const p = (trackIdx - 1 + tracks.length) % tracks.length;
    setTrackIdx(p); if (playing) playTrack(p);
  }, [trackIdx, tracks.length, playing, playTrack]);

  useEffect(() => () => {
    audioRef.current?.pause();
    if (sourceRef.current) try { sourceRef.current.disconnect(); } catch {}
    if (audioCtxRef.current) audioCtxRef.current.close();
  }, []);

  return (
    <div
      role="region"
      aria-label="Hawaiian Radio music player"
      style={{
        background: "#0c1a2e",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 6,
        flex: 1,
        minWidth: 0,
        fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
        display: "flex",
        flexDirection: "row",
        overflow: "hidden",
      }}
    >
      {/* ALBUM ART — full left column, top to bottom */}
      <div
        style={{
          width: 90,
          flexShrink: 0,
          background: "linear-gradient(135deg, #1a2d4a 0%, #0f1d35 50%, #1a3050 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
          borderRight: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        🌺
      </div>

      {/* RIGHT SIDE — title on top, controls on bottom */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

        {/* Title + source */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "8px 12px" }} aria-live="polite">
          <div style={{ fontSize: 14, fontWeight: 700, color: "#ffffff", lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {track.title}
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 3, display: "flex", alignItems: "center", gap: 4 }}>
            🎵 HAWAIIAN RADIO
          </div>
        </div>

        {/* Controls row — separated by line */}
        <div
          role="toolbar"
          aria-label="Playback controls"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            padding: "6px 12px",
          }}
        >
          <button style={btn} aria-label="Previous track" onClick={prevTrack}>
            <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
              <rect x="1" y="2" width="2" height="10" rx="0.8" fill="currentColor" />
              <path d="M14 2L5 7L14 12V2Z" fill="currentColor" />
            </svg>
          </button>
          <button style={btn} aria-label={playing ? "Pause" : "Play"} onClick={togglePlay}>
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
          <button style={btn} aria-label="Next track" onClick={nextTrack}>
            <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
              <rect x="13" y="2" width="2" height="10" rx="0.8" fill="currentColor" />
              <path d="M2 2L11 7L2 12V2Z" fill="currentColor" />
            </svg>
          </button>
          <button style={btn} aria-label="Equalizer">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <line x1="3" y1="2" x2="3" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="8" y1="5" x2="8" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="13" y1="1" x2="13" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <button style={btn} aria-label="Search">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.5" />
              <line x1="9.5" y1="9.5" x2="13" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

const btn: React.CSSProperties = {
  background: "none",
  border: "none",
  color: "rgba(255,255,255,0.6)",
  cursor: "pointer",
  padding: 6,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
