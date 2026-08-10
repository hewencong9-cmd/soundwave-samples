"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Pause, Play, SkipBack, SkipForward, Volume2, Repeat, Shuffle, Heart } from "lucide-react";
import { usePlayerStore } from "@/stores/playerStore";

const bars = [38, 58, 42, 76, 34, 66, 84, 48, 72, 40, 92, 56, 78, 46, 68, 36, 82, 54, 74, 44, 88, 52, 70, 32, 62, 90, 50, 80];

export function AppPlayer() {
  const { currentSound, isPlaying, setIsPlaying, playNext, playPrevious } = usePlayerStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!currentSound) return;

    if (!audioRef.current) {
      audioRef.current = new Audio(currentSound.audioUrl);
      audioRef.current.addEventListener("ended", playNext);
    } else {
      audioRef.current.src = currentSound.audioUrl;
      audioRef.current.load();
    }

    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    }

    return () => {
      audioRef.current?.pause();
      audioRef.current?.removeEventListener("ended", playNext);
    };
  }, [currentSound]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, setIsPlaying]);

  if (!currentSound) return null;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="flex h-[var(--player-height)] flex-shrink-0 items-center gap-4 border-t border-[var(--border-subtle)] bg-[var(--surface)] px-4 md:px-6"
      aria-label="试听播放器"
    >
      {/* Track info */}
      <div className="flex w-48 items-center gap-3 md:w-64">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-[var(--surface-elevated)]">
          <Image
            src="/assets/pack-lofi.jpg"
            alt={currentSound.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">{currentSound.title}</p>
          <p className="truncate text-xs text-[var(--text-secondary)]">{currentSound.pack}</p>
        </div>
        <button className="hidden text-[var(--text-secondary)] transition hover:text-white md:block">
          <Heart className="size-4" />
        </button>
      </div>

      {/* Controls + waveform */}
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-2">
        <div className="flex items-center justify-center gap-4">
          <button className="text-[var(--text-muted)] transition hover:text-white">
            <Shuffle className="size-4" />
          </button>
          <button
            onClick={playPrevious}
            className="text-[var(--text-secondary)] transition hover:text-white"
          >
            <SkipBack className="size-5" fill="currentColor" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition hover:scale-105"
          >
            {isPlaying ? <Pause className="size-4" fill="currentColor" /> : <Play className="size-4" fill="currentColor" />}
          </button>
          <button
            onClick={playNext}
            className="text-[var(--text-secondary)] transition hover:text-white"
          >
            <SkipForward className="size-5" fill="currentColor" />
          </button>
          <button className="text-[var(--text-muted)] transition hover:text-white">
            <Repeat className="size-4" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden text-xs text-[var(--text-muted)] md:block">0:00</span>
          <div className="flex h-10 flex-1 items-center gap-px overflow-hidden rounded-md bg-black/30 px-2">
            {bars.map((height, index) => (
              <span
                key={index}
                className="wave-bar flex-1 rounded-full bg-[var(--accent)]"
                style={{
                  height: `${height}%`,
                  animationDelay: `${index * 0.04}s`,
                  animationPlayState: isPlaying ? "running" : "paused",
                  opacity: isPlaying ? 1 : 0.35,
                }}
              />
            ))}
          </div>
          <span className="hidden text-xs text-[var(--text-muted)] md:block">{currentSound.length}</span>
        </div>
      </div>

      {/* Volume */}
      <div className="hidden w-48 items-center gap-3 lg:flex">
        <Volume2 className="size-4 text-[var(--text-secondary)]" />
        <div className="h-1 flex-1 rounded-full bg-[var(--surface-highlight)]">
          <div className="h-full w-2/3 rounded-full bg-[var(--accent)]" />
        </div>
      </div>
    </motion.div>
  );
}
