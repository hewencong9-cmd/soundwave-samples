"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Pause, Play, SkipBack, SkipForward, Volume2, VolumeX, Repeat, Repeat1, Shuffle, Heart } from "lucide-react";
import { usePlayerStore } from "@/stores/playerStore";

const bars = [38, 58, 42, 76, 34, 66, 84, 48, 72, 40, 92, 56, 78, 46, 68, 36, 82, 54, 74, 44, 88, 52, 70, 32, 62, 90, 50, 80];

function formatTime(seconds: number): string {
  if (!seconds || isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function parseLength(length: string): number {
  const parts = length.split(":");
  if (parts.length === 2) {
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
  }
  return 0;
}

export function AppPlayer() {
  const {
    currentSound,
    isPlaying,
    setIsPlaying,
    playNext,
    playPrevious,
    volume,
    setVolume,
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
    seekTo,
    isShuffle,
    toggleShuffle,
    repeatMode,
    toggleRepeat,
    toggleLike,
    isLiked,
  } = usePlayerStore();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const isSeekingRef = useRef(false);
  const prevSoundIdRef = useRef<string | null>(null);

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current && !isSeekingRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }, [setCurrentTime]);

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }, [setDuration]);

  const handlePlay = useCallback(() => setIsPlaying(true), [setIsPlaying]);
  const handlePause = useCallback(() => setIsPlaying(false), [setIsPlaying]);

  const initAudio = useCallback((url: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current.removeEventListener("ended", playNext);
      audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      audioRef.current.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audioRef.current.removeEventListener("play", handlePlay);
      audioRef.current.removeEventListener("pause", handlePause);
    }

    audioRef.current = new Audio(url);
    audioRef.current.volume = volume;
    audioRef.current.preload = "metadata";
    audioRef.current.addEventListener("ended", playNext);
    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
    audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
    audioRef.current.addEventListener("play", handlePlay);
    audioRef.current.addEventListener("pause", handlePause);
    audioRef.current.load();
  }, [volume, playNext, handleTimeUpdate, handleLoadedMetadata, handlePlay, handlePause]);

  useEffect(() => {
    if (!currentSound) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("ended", playNext);
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        audioRef.current.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audioRef.current.removeEventListener("play", handlePlay);
        audioRef.current.removeEventListener("pause", handlePause);
        audioRef.current = null;
      }
      prevSoundIdRef.current = null;
      return;
    }

    if (prevSoundIdRef.current !== currentSound.id) {
      initAudio(currentSound.audioUrl);
      prevSoundIdRef.current = currentSound.id;
    }

    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [currentSound, isPlaying, initAudio, setIsPlaying, playNext, handleTimeUpdate, handleLoadedMetadata, handlePlay, handlePause]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, setIsPlaying]);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !duration) return;
    const rect = progressRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newTime = percent * duration;
    seekTo(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleProgressDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    isSeekingRef.current = true;
    const handleMouseMove = (ev: MouseEvent) => {
      if (!progressRef.current || !duration) return;
      const rect = progressRef.current.getBoundingClientRect();
      const percent = Math.max(0, Math.min(1, (ev.clientX - rect.left) / rect.width));
      const newTime = percent * duration;
      seekTo(newTime);
    };
    const handleMouseUp = (ev: MouseEvent) => {
      if (!progressRef.current || !duration) return;
      const rect = progressRef.current.getBoundingClientRect();
      const percent = Math.max(0, Math.min(1, (ev.clientX - rect.left) / rect.width));
      const newTime = percent * duration;
      if (audioRef.current) {
        audioRef.current.currentTime = newTime;
      }
      seekTo(newTime);
      isSeekingRef.current = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    handleMouseMove(e.nativeEvent);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const toggleMute = () => {
    setVolume(volume === 0 ? 0.7 : 0);
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;
  const liked = currentSound ? isLiked(currentSound.id) : false;

  if (!currentSound) return null;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 flex h-[var(--player-height)] items-center gap-3 border-t border-[var(--border-subtle)] bg-[var(--surface)] px-3 md:gap-4 md:px-6"
      aria-label="试听播放器"
    >
      {/* Track info */}
      <div className="flex w-40 shrink-0 items-center gap-2 md:w-56 md:gap-3">
        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-md bg-[var(--surface-elevated)]">
          <Image
            src="/assets/pack-lofi.jpg"
            alt={currentSound.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">{currentSound.title}</p>
          <p className="truncate text-xs text-[var(--text-secondary)]">{currentSound.pack}</p>
        </div>
        <button
          onClick={() => toggleLike(currentSound.id)}
          className={`shrink-0 transition ${liked ? "text-[var(--accent)]" : "text-[var(--text-secondary)] hover:text-white"}`}
          aria-label={liked ? "取消收藏" : "收藏"}
        >
          <Heart className="size-4" fill={liked ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Controls + progress */}
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
        <div className="flex items-center justify-center gap-2 md:gap-4">
          <button
            onClick={toggleShuffle}
            className={`transition ${isShuffle ? "text-[var(--accent)]" : "text-[var(--text-muted)] hover:text-white"}`}
            aria-label="随机播放"
          >
            <Shuffle className="size-3.5 md:size-4" />
          </button>
          <button
            onClick={playPrevious}
            className="text-[var(--text-secondary)] transition hover:text-white"
            aria-label="上一首"
          >
            <SkipBack className="size-4 md:size-5" fill="currentColor" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex h-8 w-8 md:h-9 md:w-9 shrink-0 items-center justify-center rounded-full bg-white text-black transition hover:scale-105"
            aria-label={isPlaying ? "暂停" : "播放"}
          >
            {isPlaying ? <Pause className="size-3.5 md:size-4" fill="currentColor" /> : <Play className="size-3.5 md:size-4" fill="currentColor" className="ml-0.5" />}
          </button>
          <button
            onClick={playNext}
            className="text-[var(--text-secondary)] transition hover:text-white"
            aria-label="下一首"
          >
            <SkipForward className="size-4 md:size-5" fill="currentColor" />
          </button>
          <button
            onClick={toggleRepeat}
            className={`transition ${repeatMode !== "off" ? "text-[var(--accent)]" : "text-[var(--text-muted)] hover:text-white"}`}
            aria-label={repeatMode === "one" ? "单曲循环" : repeatMode === "all" ? "列表循环" : "循环关闭"}
          >
            {repeatMode === "one" ? <Repeat1 className="size-3.5 md:size-4" /> : <Repeat className="size-3.5 md:size-4" />}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden w-8 text-right text-[10px] text-[var(--text-muted)] md:block md:text-xs">
            {formatTime(currentTime)}
          </span>
          <div
            ref={progressRef}
            onClick={handleProgressClick}
            onMouseDown={handleProgressDrag}
            className="group relative h-1 flex-1 cursor-pointer rounded-full bg-[var(--surface-highlight)]"
          >
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-white/40 group-hover:bg-[var(--accent)]"
              style={{ width: `${progressPercent}%` }}
            />
            <div
              className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-white opacity-0 shadow transition group-hover:opacity-100"
              style={{ left: `calc(${progressPercent}% - 6px)` }}
            />
          </div>
          <span className="hidden w-8 text-[10px] text-[var(--text-muted)] md:block md:text-xs">
            {formatTime(duration || parseLength(currentSound.length))}
          </span>
        </div>
      </div>

      {/* Volume */}
      <div className="hidden w-28 shrink-0 items-center gap-2 lg:flex xl:w-36">
        <button
          onClick={toggleMute}
          className="text-[var(--text-secondary)] transition hover:text-white"
          aria-label={volume === 0 ? "取消静音" : "静音"}
        >
          {volume === 0 ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-[var(--surface-highlight)] accent-[var(--accent)]"
          aria-label="音量"
        />
      </div>
    </motion.div>
  );
}