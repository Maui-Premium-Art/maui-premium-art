"use client";

import { useState, useRef, useCallback, useEffect } from "react";

const ART_IMAGES = [
  "/images/tailgate-art/mahalo-bird_tailgate.jpg",
  "/images/tailgate-art/aloha_tailgate.webp",
  "/images/tailgate-art/eyes-of-the-world_tailgate.jpg",
  "/images/tailgate-art/heart_tailgate.jpg",
  "/images/tailgate-art/humming-bird_tailgate.jpg",
  "/images/tailgate-art/lovers_tailgate.jpg",
  "/images/tailgate-art/music_tailgate.jpg",
  "/images/tailgate-art/pono_tailgate.jpg",
  "/images/tailgate-art/sunset_tailgate.jpg",
];

export interface Track {
  title: string;
  artist: string;
  src: string;
  artworkImage: string;
}

const ALL_TRACKS: Track[] = [
  { title: "Hawaiian Ska", artist: "Hetyati", src: "/music/hawaiian-ska.mp3", artworkImage: ART_IMAGES[0] },
  { title: "Hawaiian Peaceful", artist: "James Franco Jr", src: "/music/hawaiian-peaceful.mp3", artworkImage: ART_IMAGES[1] },
  { title: "Blue Island", artist: "Matthew Mike Music", src: "/music/blue-island.mp3", artworkImage: ART_IMAGES[2] },
  { title: "Trouble in the Tiki Bar", artist: "AI Picture This", src: "/music/trouble-in-the-tiki-bar.mp3", artworkImage: ART_IMAGES[3] },
  { title: "Hawaiian Sea", artist: "Alana Jordan", src: "/music/hawaiian-sea.mp3", artworkImage: ART_IMAGES[4] },
  { title: "Happy Ukulele", artist: "Emmraan", src: "/music/happy-ukulele.mp3", artworkImage: ART_IMAGES[5] },
  { title: "Luau", artist: "Matthew Mike Music", src: "/music/luau.mp3", artworkImage: ART_IMAGES[6] },
  { title: "Having Fun", artist: "Nerdworld", src: "/music/having-fun.mp3", artworkImage: ART_IMAGES[7] },
  { title: "A Cheerful World", artist: "Red Productions", src: "/music/cheerful-world.mp3", artworkImage: ART_IMAGES[8] },
  { title: "Wave", artist: "Tooone", src: "/music/wave.mp3", artworkImage: ART_IMAGES[0] },
  { title: "Honohono", artist: "Yasuko", src: "/music/honohono.mp3", artworkImage: ART_IMAGES[1] },
  { title: "Hawaiian Shuffle", artist: "Kaazoom", src: "/music/hawaiian-shuffle.mp3", artworkImage: ART_IMAGES[2] },
  { title: "Hawaiian Cocktail Nights", artist: "Geoff Harvey", src: "/music/hawaiian-cocktail-nights.mp3", artworkImage: ART_IMAGES[3] },
];

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export interface UseHawaiianRadioReturn {
  tracks: Track[];
  currentTrack: Track;
  trackIndex: number;
  isPlaying: boolean;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
}

export function useHawaiianRadio(): UseHawaiianRadioReturn {
  const [tracks, setTracks] = useState(ALL_TRACKS);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  // Shuffle on client only (avoid hydration mismatch)
  useEffect(() => {
    setTracks(shuffleArray(ALL_TRACKS));
  }, []);

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
    if (sourceRef.current) {
      try { sourceRef.current.disconnect(); } catch { /* ignore */ }
    }
    const source = ctx.createMediaElementSource(audio);
    source.connect(gain);
    gain.connect(ctx.destination);
    sourceRef.current = source;
  }, []);

  const playTrack = useCallback((idx: number) => {
    ensureAudioContext();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.removeAttribute("src");
    }
    const audio = new Audio(tracks[idx].src);
    audio.crossOrigin = "anonymous";
    audioRef.current = audio;
    audio.addEventListener("ended", () => {
      const next = (idx + 1) % tracks.length;
      setTrackIndex(next);
      playTrack(next);
    });
    connectSource(audio);
    audio.play().catch(() => { /* autoplay blocked */ });
    setIsPlaying(true);
  }, [tracks, ensureAudioContext, connectSource]);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else if (audioRef.current?.src) {
      const ctx = audioCtxRef.current;
      if (ctx?.state === "suspended") ctx.resume();
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      playTrack(trackIndex);
    }
  }, [isPlaying, trackIndex, playTrack]);

  const nextTrack = useCallback(() => {
    const next = (trackIndex + 1) % tracks.length;
    setTrackIndex(next);
    if (isPlaying) playTrack(next);
  }, [trackIndex, tracks.length, isPlaying, playTrack]);

  const prevTrack = useCallback(() => {
    const prev = (trackIndex - 1 + tracks.length) % tracks.length;
    setTrackIndex(prev);
    if (isPlaying) playTrack(prev);
  }, [trackIndex, tracks.length, isPlaying, playTrack]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      if (sourceRef.current) try { sourceRef.current.disconnect(); } catch { /* ignore */ }
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  return {
    tracks,
    currentTrack: tracks[trackIndex],
    trackIndex,
    isPlaying,
    togglePlay,
    nextTrack,
    prevTrack,
  };
}
