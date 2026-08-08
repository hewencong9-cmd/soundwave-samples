"use client";

import { useMemo, useState } from "react";
import { Download, Heart, Pause, Play, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { usePlayerStore, type Sound } from "@/stores/playerStore";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

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
];

const filterGroups = [
  { label: "类型", values: ["Loop", "One Shot", "MIDI", "Preset"] },
  { label: "风格", values: ["Lofi", "Chill", "Future Bass", "Trap"] },
  { label: "乐器", values: ["鼓组", "键盘", "人声", "贝斯"] },
];

export default function SoundsPage() {
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>(["Loop", "Lofi"]);
  const [likedIds, setLikedIds] = useState<string[]>(["dusty-keys"]);
  const { currentSound, setCurrentSound, isPlaying, setIsPlaying } = usePlayerStore();

  const filteredSounds = useMemo(() => {
    const search = query.trim().toLowerCase();
    return soundRows.filter((sound) => {
      const haystack = [sound.title, sound.pack, sound.type, sound.key, ...sound.tags].join(" ").toLowerCase();
      const matchesSearch = !search || haystack.includes(search);
      const matchesFilter =
        activeFilters.length === 0 ||
        activeFilters.some((filter) => sound.type === filter || sound.key === filter || sound.tags.includes(filter));
      return matchesSearch && matchesFilter;
    });
  }, [activeFilters, query]);

  const toggleFilter = (value: string) => {
    setActiveFilters((filters) =>
      filters.includes(value) ? filters.filter((filter) => filter !== value) : [...filters, value]
    );
  };

  const toggleLike = (id: string) => {
    setLikedIds((ids) => (ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id]));
  };

  const playSound = (sound: Sound) => {
    if (currentSound?.id === sound.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSound(sound);
    }
  };

  return (
    <main className="relative min-h-screen bg-[#201d23] px-4 py-6 text-white md:px-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold md:text-3xl">采样浏览器</h1>
          <p className="text-sm text-white/60">搜索、筛选、试听、收藏和下载高质量采样</p>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative max-w-md flex-1">
            <Input
              placeholder="搜索采样、Loop、BPM、Key..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="h-9 gap-2 px-3">
              <SlidersHorizontal size={14} /> 筛选
            </Badge>
            {filterGroups.map((group) =>
              group.values.slice(0, 3).map((value) => {
                const active = activeFilters.includes(value);
                return (
                  <button
                    key={value}
                    onClick={() => toggleFilter(value)}
                    className={`rounded-full px-3 py-2 text-xs font-bold transition ${
                      active
                        ? "bg-white text-zinc-900"
                        : "border border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    {value}
                  </button>
                );
              })
            )}
            {activeFilters.length > 0 && (
              <button
                onClick={() => setActiveFilters([])}
                className="text-xs text-white/50 hover:text-white"
              >
                清空 ({activeFilters.length})
              </button>
            )}
          </div>
        </div>

        <div className="space-y-3">
          {filteredSounds.map((sound, index) => {
            const isCurrent = currentSound?.id === sound.id;
            const isLiked = likedIds.includes(sound.id);

            return (
              <motion.div
                key={sound.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`rounded-2xl border p-4 transition ${
                  isCurrent
                    ? "border-cyan-300/50 bg-cyan-300/10"
                    : "border-white/10 bg-white/5 hover:bg-white/8"
                }`}
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                  <button
                    onClick={() => playSound(sound)}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-zinc-900"
                  >
                    {isCurrent && isPlaying ? (
                      <Pause size={18} fill="currentColor" />
                    ) : (
                      <Play size={18} fill="currentColor" />
                    )}
                  </button>

                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <h3 className="font-bold">{sound.title}</h3>
                      <span className="text-xs text-white/50">{sound.pack}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-white/60">
                      <Badge variant="outline">{sound.type}</Badge>
                      <span>{sound.bpm} BPM</span>
                      <span>{sound.key}</span>
                      <span>{sound.length}</span>
                      {sound.tags.map((tag) => (
                        <span key={tag} className="text-cyan-300/80">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="hidden flex-1 lg:block">
                    <div className="flex h-10 items-center gap-1 opacity-40">
                      {Array.from({ length: 24 }).map((_, i) => (
                        <motion.span
                          key={i}
                          className="w-1 flex-1 rounded-full bg-white/50"
                          animate={
                            isCurrent && isPlaying
                              ? { height: ["20%", "80%", "40%", "70%", "30%"] }
                              : { height: `${20 + ((i * 17 + sound.bpm) % 60)}%` }
                          }
                          transition={
                            isCurrent && isPlaying
                              ? {
                                  duration: 0.8 + (i % 5) * 0.1,
                                  repeat: Infinity,
                                  repeatType: "reverse",
                                  ease: "easeInOut",
                                }
                              : undefined
                          }
                          style={
                            !(isCurrent && isPlaying)
                              ? { height: `${20 + ((i * 17 + sound.bpm) % 60)}%` }
                              : undefined
                          }
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleLike(sound.id)}
                      className={`grid h-9 w-9 place-items-center rounded-full transition ${
                        isLiked ? "bg-pink-500/20 text-pink-300" : "bg-white/10 text-white/70 hover:bg-white/20"
                      }`}
                    >
                      <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
                    </button>
                    <button className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white/70 hover:bg-white/20">
                      <Download size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
