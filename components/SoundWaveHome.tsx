"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Download, Heart, Pause, Play, Search, SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { samplePacks } from "@/lib/data";
import { usePlayerStore, type Sound } from "@/stores/playerStore";

const sounds: Sound[] = [
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

const filters = ["Loop", "One Shot", "Lofi", "Chill", "Trap", "鼓组", "键盘", "人声"];

export function SoundWaveHome() {
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>(["Loop", "Lofi"]);
  const [likedIds, setLikedIds] = useState<string[]>(["dusty-keys"]);
  const { currentSound, setCurrentSound, isPlaying, setIsPlaying } = usePlayerStore();

  const filteredSounds = useMemo(() => {
    const search = query.trim().toLowerCase();
    return sounds.filter((sound) => {
      const haystack = [sound.title, sound.pack, sound.type, sound.key, ...sound.tags].join(" ").toLowerCase();
      const matchesSearch = !search || haystack.includes(search);
      const matchesFilter =
        activeFilters.length === 0 ||
        activeFilters.some((filter) => sound.type === filter || sound.key === filter || sound.tags.includes(filter));
      return matchesSearch && matchesFilter;
    });
  }, [activeFilters, query]);

  const toggleFilter = (value: string) => {
    setActiveFilters((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const toggleLike = (id: string) => {
    setLikedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const playSound = (sound: Sound) => {
    if (currentSound?.id === sound.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSound(sound);
    }
  };

  return (
    <main className="min-h-screen bg-[#201d23] px-4 py-8 text-white md:px-6">
      <div className="mx-auto max-w-7xl space-y-10">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 p-8 md:p-12">
          <div className="relative z-10 max-w-2xl space-y-5">
            <Badge variant="secondary" className="bg-cyan-300/20 text-cyan-100">
              面向中国年轻制作人的采样库
            </Badge>
            <h1 className="text-3xl font-bold leading-tight md:text-5xl">
              发现你的下一段 Beat 灵感
            </h1>
            <p className="text-base text-white/70 md:text-lg">
              浏览 Lofi、Chill、Future Bass 等风格的 Loop、One Shot 和 MIDI，随时试听、收藏、下载。
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/sounds">
                <Button className="rounded-full bg-cyan-300 text-zinc-900 hover:bg-cyan-300/90">
                  浏览采样库
                </Button>
              </Link>
              <Link href="/packs">
                <Button variant="outline" className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10">
                  查看采样包
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Packs */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold md:text-2xl">推荐采样包</h2>
            <Link href="/packs" className="text-sm text-cyan-300 hover:underline">
              查看全部
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {samplePacks.map((pack, index) => (
              <motion.div
                key={pack.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5"
              >
                <div className="relative h-44 w-full">
                  <Image src={pack.image} alt={pack.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#201d23] via-transparent to-transparent" />
                  <Button
                    size="icon"
                    className="absolute bottom-4 right-4 size-11 rounded-full bg-white text-zinc-900 hover:bg-white/90"
                  >
                    <Play size={18} fill="currentColor" />
                  </Button>
                </div>
                <div className="space-y-2 p-5">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{pack.tag}</Badge>
                    <Badge variant="outline">{pack.bpm}</Badge>
                  </div>
                  <h3 className="text-lg font-bold">{pack.title}</h3>
                  <p className="text-sm text-white/60">{pack.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Sample Browser */}
        <section className="space-y-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl font-bold md:text-2xl">采样浏览器</h2>
              <p className="text-sm text-white/60">搜索、筛选、试听最新上传的采样</p>
            </div>
            <Link href="/sounds">
              <Button variant="outline" className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10">
                进入完整采样库
              </Button>
            </Link>
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/50" />
              <Input
                placeholder="搜索采样、Loop、BPM、Key..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="rounded-full border-white/10 bg-white/5 pl-9"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="h-9 gap-2 px-3">
                <SlidersHorizontal size={14} /> 筛选
              </Badge>
              {filters.map((value) => {
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
              })}
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
                          <span
                            key={i}
                            className="w-1 flex-1 rounded-full bg-white/50"
                            style={{
                              height: `${20 + ((i * 17 + sound.bpm) % 60)}%`,
                              opacity: isCurrent && isPlaying ? 0.9 : 0.5,
                            }}
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
        </section>
      </div>
    </main>
  );
}
