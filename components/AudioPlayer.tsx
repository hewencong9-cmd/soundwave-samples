"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { usePlayerStore } from "@/stores/playerStore";
import { Button } from "@/components/ui/button";

const bars = [38, 58, 42, 76, 34, 66, 84, 48, 72, 40, 92, 56, 78, 46, 68, 36, 82, 54, 74, 44, 88, 52, 70, 32, 62, 90, 50, 80];

export function AudioPlayer() {
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
    <motion.section
      className="glass fixed bottom-4 left-4 right-4 z-40 mx-auto flex max-w-6xl items-center gap-4 rounded-[var(--sw-radius)] p-3 shadow-2xl md:bottom-6 md:p-4"
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.55, type: "spring", stiffness: 110, damping: 18 }}
      aria-label="试听播放器"
    >
      <Button
        size="icon"
        className="h-10 w-10 shrink-0 rounded-full bg-[var(--sw-cyan)] text-black shadow-[var(--sw-shadow-cyan)]"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="hidden h-9 w-9 text-white/60 hover:bg-white/10 hover:text-white md:grid"
        onClick={playPrevious}
      >
        <SkipBack size={16} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="hidden h-9 w-9 text-white/60 hover:bg-white/10 hover:text-white md:grid"
        onClick={playNext}
      >
        <SkipForward size={16} />
      </Button>
      <div className="min-w-0 flex-1">
        <div className="mb-2 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">
              {currentSound.pack} / {currentSound.title}
            </p>
            <p className="truncate text-xs text-[var(--sw-text-muted)]">
              {currentSound.bpm} BPM · {currentSound.key} · {currentSound.type}
            </p>
          </div>
        </div>
        <div className="flex h-9 items-center gap-1 overflow-hidden rounded bg-black/20 px-2">
          {bars.map((height, index) => (
            <span
              className="wave-bar flex-1 rounded-full bg-gradient-to-t from-[var(--sw-purple)] to-[var(--sw-cyan)]"
              key={index}
              style={{
                height: `${height}%`,
                animationDelay: `${index * 0.045}s`,
                animationPlayState: isPlaying ? "running" : "paused",
              }}
            />
          ))}
        </div>
      </div>
      <div className="hidden items-center gap-2 text-[var(--sw-text-muted)] lg:flex">
        <Volume2 size={18} />
        <div className="h-1.5 w-24 rounded-full bg-white/10">
          <div className="h-full w-2/3 rounded-full bg-[var(--sw-cyan)]" />
        </div>
      </div>
    </motion.section>
  );
}
