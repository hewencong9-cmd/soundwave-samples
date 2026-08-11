"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Download, Heart, Pause, Play, Search, SlidersHorizontal, Check } from "lucide-react";
import { motion } from "framer-motion";
import { usePlayerStore, type Sound } from "@/stores/playerStore";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const soundRows: Sound[] = [
  {
    id: "dusty-keys",
    title: "雨夜 Rhodes Loop",
    pack: "Late Night Lofi",
    type: "Loop",
    bpm: 82,
    key: "A minor",
    tags: ["Lofi", "键盘"],
    length: "0:16",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: "neon-vocal",
    title: "霓虹人声切片",
    pack: "Future Alley",
    type: "One Shot",
    bpm: 96,
    key: "C major",
    tags: ["Chill", "人声"],
    length: "0:04",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: "bus-808",
    title: "夜班车 808",
    pack: "CN Street Drums",
    type: "One Shot",
    bpm: 74,
    key: "D minor",
    tags: ["Trap", "贝斯"],
    length: "0:03",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    id: "soft-drums",
    title: "松弛鼓组 Loop",
    pack: "Late Night Lofi",
    type: "Loop",
    bpm: 88,
    key: "A minor",
    tags: ["Lofi", "鼓组"],
    length: "0:12",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  },
  {
    id: "warm-bass",
    title: "暖色调贝斯线",
    pack: "Future Alley",
    type: "Loop",
    bpm: 92,
    key: "E minor",
    tags: ["Future Bass", "贝斯"],
    length: "0:20",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  },
  {
    id: "vinyl-crackle",
    title: "黑胶噪声纹理",
    pack: "Late Night Lofi",
    type: "One Shot",
    bpm: 0,
    key: "-",
    tags: ["Lofi", "音效"],
    length: "0:08",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
  },
  {
    id: "street-hihat",
    title: "街头 Hi-Hat Roll",
    pack: "CN Street Drums",
    type: "Loop",
    bpm: 140,
    key: "-",
    tags: ["Trap", "鼓组"],
    length: "0:08",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
  },
  {
    id: "dream-pad",
    title: "梦境合成器 Pad",
    pack: "Future Alley",
    type: "Loop",
    bpm: 85,
    key: "F major",
    tags: ["Chill", "合成器"],
    length: "0:24",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
  },
];

const filterGroups = [
  { label: "类型", values: ["Loop", "One Shot", "MIDI", "Preset"] },
  { label: "风格", values: ["Lofi", "Chill", "Future Bass", "Trap"] },
  { label: "乐器", values: ["鼓组", "键盘", "人声", "贝斯", "合成器", "音效"] },
];

export default function SoundsPage() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [downloadedIds, setDownloadedIds] = useState<string[]>([]);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(true);
  const [showLikedOnly, setShowLikedOnly] = useState(false);
  const {
    currentSound,
    setCurrentSound,
    isPlaying,
    setIsPlaying,
    toggleLike,
    isLiked,
    setPlaylist,
    likedIds,
    searchQuery,
    setSearchQuery,
  } = usePlayerStore();

  useEffect(() => {
    setPlaylist(soundRows);
  }, [setPlaylist]);

  useEffect(() => {
    const view = searchParams.get("view");
    if (view === "liked") {
      setShowLikedOnly(true);
    }
  }, [searchParams]);

  useEffect(() => {
    if (searchQuery) {
      setQuery(searchQuery);
    }
  }, []);

  useEffect(() => {
    setSearchQuery(query);
  }, [query, setSearchQuery]);

  const filteredSounds = useMemo(() => {
    const search = query.trim().toLowerCase();
    return soundRows.filter((sound) => {
      const haystack = [sound.title, sound.pack, sound.type, sound.key, ...sound.tags]
        .join(" ")
        .toLowerCase();
      const matchesSearch = !search || haystack.includes(search);
      const matchesFilter =
        activeFilters.length === 0 ||
        activeFilters.some(
          (filter) =>
            sound.type === filter ||
            sound.key === filter ||
            sound.tags.includes(filter)
        );
      const matchesLiked = !showLikedOnly || likedIds.includes(sound.id);
      return matchesSearch && matchesFilter && matchesLiked;
    });
  }, [activeFilters, query, showLikedOnly, likedIds]);

  const toggleFilter = (value: string) => {
    setActiveFilters((filters) =>
      filters.includes(value) ? filters.filter((f) => f !== value) : [...filters, value]
    );
  };

  const playSound = (sound: Sound) => {
    if (currentSound?.id === sound.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSound(sound);
    }
  };

  const handleDownload = (sound: Sound) => {
    if (downloadingId) return;
    setDownloadingId(sound.id);
    setTimeout(() => {
      setDownloadedIds((prev) => [...prev, sound.id]);
      setDownloadingId(null);
    }, 800);
  };

  const clearAll = () => {
    setQuery("");
    setActiveFilters([]);
    setShowLikedOnly(false);
    setSearchQuery("");
  };

  return (
    <main className="min-h-full bg-black p-4 pb-28 text-white md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold md:text-3xl">采样浏览器</h1>
            <p className="text-sm text-[var(--text-secondary)]">
              搜索、筛选、试听、收藏和下载高质量采样 · 共 {filteredSounds.length} 个结果
              {showLikedOnly && " · 仅显示收藏"}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
          <div className={`${showFilters ? "block" : "hidden"} lg:block lg:w-56 lg:shrink-0`}>
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] p-4">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-bold">筛选</h3>
                {(activeFilters.length > 0 || showLikedOnly) && (
                  <button
                    onClick={clearAll}
                    className="text-xs text-[var(--text-muted)] hover:text-white"
                  >
                    清空
                  </button>
                )}
              </div>

              <div className="mb-4 space-y-2">
                <button
                  onClick={() => setShowLikedOnly(!showLikedOnly)}
                  className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-xs font-medium transition ${
                    showLikedOnly
                      ? "bg-[var(--accent)]/20 text-[var(--accent)]"
                      : "bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:bg-[var(--surface-highlight)] hover:text-white"
                  }`}
                >
                  <Heart size={14} fill={showLikedOnly ? "currentColor" : "none"} />
                  仅显示已收藏 ({likedIds.length})
                </button>
              </div>

              {filterGroups.map((group) => (
                <div key={group.label} className="mb-4 last:mb-0">
                  <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    {group.label}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {group.values.map((value) => {
                      const active = activeFilters.includes(value);
                      return (
                        <button
                          key={value}
                          onClick={() => toggleFilter(value)}
                          className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
                            active
                              ? "bg-[var(--accent)] text-white"
                              : "bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:bg-[var(--surface-highlight)] hover:text-white"
                          }`}
                        >
                          {value}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="min-w-0 flex-1 space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--text-muted)]" />
                <Input
                  placeholder="搜索采样、Loop、BPM、Key..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="h-10 rounded-lg border-[var(--border-subtle)] bg-[var(--surface)] pl-9 text-white placeholder:text-[var(--text-muted)] focus-visible:ring-[var(--accent)]"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-white"
                  >
                    ×
                  </button>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="h-10 rounded-lg border-[var(--border-subtle)] bg-[var(--surface)] lg:hidden"
              >
                <SlidersHorizontal size={14} />
                筛选 {(activeFilters.length > 0 || showLikedOnly) && `(${activeFilters.length + (showLikedOnly ? 1 : 0)})`}
              </Button>
            </div>

            {(activeFilters.length > 0 || showLikedOnly) && (
              <div className="flex flex-wrap gap-2">
                {showLikedOnly && (
                  <button
                    onClick={() => setShowLikedOnly(false)}
                    className="flex items-center gap-1 rounded-full bg-[var(--accent)]/20 px-3 py-1 text-xs font-medium text-[var(--accent)]"
                  >
                    <Heart size={10} fill="currentColor" />
                    已收藏
                    <span className="ml-1">×</span>
                  </button>
                )}
                {activeFilters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => toggleFilter(filter)}
                    className="flex items-center gap-1 rounded-full bg-[var(--accent)]/20 px-3 py-1 text-xs font-medium text-[var(--accent)]"
                  >
                    {filter}
                    <span className="ml-1">×</span>
                  </button>
                ))}
              </div>
            )}

            <div className="space-y-2">
              {filteredSounds.map((sound, index) => {
                const isCurrent = currentSound?.id === sound.id;
                const isLikedSound = isLiked(sound.id);
                const isDownloaded = downloadedIds.includes(sound.id);
                const isThisDownloading = downloadingId === sound.id;

                return (
                  <motion.div
                    key={sound.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(index * 0.03, 0.3) }}
                    className={`flex items-center gap-3 rounded-xl border p-3 transition ${
                      isCurrent
                        ? "border-[var(--accent)]/50 bg-[var(--accent)]/10"
                        : "border-[var(--border-subtle)] bg-[var(--surface)] hover:bg-[var(--surface-elevated)]"
                    }`}
                  >
                    <button
                      onClick={() => playSound(sound)}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black transition hover:scale-105 active:scale-95"
                    >
                      {isCurrent && isPlaying ? (
                        <Pause size={18} fill="currentColor" />
                      ) : (
                        <Play size={18} fill="currentColor" className="ml-0.5" />
                      )}
                    </button>

                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <h3 className="truncate font-semibold text-white">{sound.title}</h3>
                        <span className="hidden shrink-0 text-xs text-[var(--text-muted)] sm:inline">
                          {sound.pack}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-secondary)]">
                        <Badge
                          variant="outline"
                          className="border-[var(--border-subtle)] text-[var(--text-secondary)]"
                        >
                          {sound.type}
                        </Badge>
                        <span>{sound.bpm > 0 ? `${sound.bpm} BPM` : ""}</span>
                        <span>{sound.key !== "-" ? sound.key : ""}</span>
                        <span className="hidden sm:inline">{sound.length}</span>
                        {sound.tags.map((tag) => (
                          <span key={tag} className="text-[var(--accent)]">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="hidden h-8 flex-1 items-center gap-px lg:flex xl:max-w-48">
                      {Array.from({ length: 32 }).map((_, i) => {
                        const height = 20 + ((i * 17 + sound.bpm * 3) % 60);
                        return (
                          <span
                            key={i}
                            className={`flex-1 rounded-full ${
                              isCurrent && isPlaying
                                ? "bg-[var(--accent)] wave-bar"
                                : "bg-white/20"
                            }`}
                            style={{
                              height: `${height}%`,
                              animationDelay: `${i * 0.04}s`,
                              animationPlayState: isCurrent && isPlaying ? "running" : "paused",
                            }}
                          />
                        );
                      })}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => toggleLike(sound.id)}
                        className={`grid h-9 w-9 place-items-center rounded-full transition active:scale-90 ${
                          isLikedSound
                            ? "bg-[var(--accent)]/20 text-[var(--accent)]"
                            : "bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:bg-[var(--surface-highlight)] hover:text-white"
                        }`}
                        aria-label={isLikedSound ? "取消收藏" : "收藏"}
                      >
                        <Heart size={16} fill={isLikedSound ? "currentColor" : "none"} />
                      </button>
                      <button
                        onClick={() => handleDownload(sound)}
                        disabled={isThisDownloading}
                        className={`grid h-9 w-9 place-items-center rounded-full transition active:scale-90 ${
                          isDownloaded
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:bg-[var(--surface-highlight)] hover:text-white disabled:opacity-50"
                        }`}
                        aria-label={isDownloaded ? "已下载" : "下载"}
                      >
                        {isThisDownloading ? (
                          <div className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        ) : isDownloaded ? (
                          <Check size={16} />
                        ) : (
                          <Download size={16} />
                        )}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {filteredSounds.length === 0 && (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[var(--border-subtle)] bg-[var(--surface)] py-16 text-center">
                <Search className="mb-3 size-10 text-[var(--text-muted)]" />
                <p className="text-sm font-medium text-white">没有找到匹配的采样</p>
                <p className="mt-1 text-xs text-[var(--text-secondary)]">
                  {showLikedOnly ? "你还没有收藏任何采样" : "尝试调整搜索关键词或筛选条件"}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={clearAll}
                >
                  清除所有筛选
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
