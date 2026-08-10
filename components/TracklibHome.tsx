"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Pause, Heart, Download } from "lucide-react";
import { samplePacks } from "@/lib/data";
import { usePlayerStore, type Sound } from "@/stores/playerStore";

const heroSlides = [
  {
    id: "hero-1",
    title: "来自威廉·奥尼博尔的尼日利亚放克",
    subtitle: "稀有黑胶采样 · 复古律动",
    image: "/assets/pack-hiphop.jpg",
    color: "from-amber-900/80",
  },
  {
    id: "hero-2",
    title: "CHIEF KEEF 的芝加哥钻井",
    subtitle: "Trap 鼓组与街头氛围",
    image: "/assets/pack-electronic.jpg",
    color: "from-rose-900/80",
  },
  {
    id: "hero-3",
    title: "莱斯·巴克斯特的复古异域风情",
    subtitle: "Exotica · 电影感氛围",
    image: "/assets/hero-waveform.jpg",
    color: "from-emerald-900/80",
  },
  {
    id: "hero-4",
    title: "传奇人物斯莱和罗比",
    subtitle: "雷鬼与 Dub 的 rhythm section",
    image: "/assets/pack-lofi.jpg",
    color: "from-violet-900/80",
  },
];

const songHighlights: Sound[] = [
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

const packHighlights = [
  { title: "Barbie Mak 的流行人声", artist: "芭比·麦", image: "/assets/pack-electronic.jpg" },
  { title: "Kount Drums Vol. 1", artist: "昆特", image: "/assets/pack-hiphop.jpg" },
  { title: "英国车库鼓组 Vol. 2", artist: "DefRock Sounds", image: "/assets/pack-lofi.jpg" },
  { title: "基本面", artist: "样品实验室", image: "/assets/hero-waveform.jpg" },
  { title: "Drop Tech", artist: "热门采样", image: "/assets/pack-electronic.jpg" },
  { title: "Traktrain Trap Beats", artist: "轨道列车", image: "/assets/pack-hiphop.jpg" },
];

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <span className="size-2 rounded-full bg-[var(--accent)]" />
      <h2 className="text-sm font-bold uppercase tracking-wider text-white">{title}</h2>
    </div>
  );
}

function HorizontalRail({ children }: { children: React.ReactNode }) {
  return (
    <div className="group relative">
      <div className="hide-scrollbar flex gap-4 overflow-x-auto pb-4">{children}</div>
    </div>
  );
}

export function TracklibHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { currentSound, setCurrentSound, isPlaying, setIsPlaying } = usePlayerStore();

  const playSound = (sound: Sound) => {
    if (currentSound?.id === sound.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSound(sound);
    }
  };

  const nextSlide = () => setCurrentSlide((i) => (i + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((i) => (i - 1 + heroSlides.length) % heroSlides.length);

  return (
    <div className="space-y-10 bg-black p-4 pb-28 text-white md:p-6">
      {/* Hero carousel */}
      <section className="relative">
        <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
          {heroSlides.map((slide, index) => (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="relative h-64 w-[calc(100%-1rem)] shrink-0 cursor-pointer overflow-hidden rounded-2xl md:h-80 md:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]"
            >
              <Image src={slide.image} alt={slide.title} fill className="object-cover" />
              <div className={`absolute inset-0 bg-gradient-to-t ${slide.color} via-black/30 to-transparent`} />
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <p className="mb-1 text-xs font-medium text-white/80">{slide.subtitle}</p>
                <h3 className="mb-4 text-lg font-bold leading-tight md:text-xl">{slide.title}</h3>
                <div className="flex gap-2">
                  <button className="rounded-md border border-white/30 bg-white/10 px-4 py-2 text-xs font-bold text-white backdrop-blur-sm transition hover:bg-white/20">
                    浏览
                  </button>
                  <button className="flex items-center gap-1.5 rounded-md bg-white px-4 py-2 text-xs font-bold text-black transition hover:bg-white/90">
                    <Play className="size-3" fill="currentColor" />
                    预览
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-3 flex justify-center gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1 rounded-full transition ${i === currentSlide ? "w-6 bg-[var(--accent)]" : "w-2 bg-white/20"}`}
            />
          ))}
        </div>
      </section>

      {/* Song highlights */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <SectionHeader title="歌曲亮点" />
          <Link href="/sounds" className="text-xs font-bold text-[var(--text-secondary)] hover:text-white">
            查看全部
          </Link>
        </div>
        <HorizontalRail>
          {songHighlights.map((sound, index) => {
            const isCurrent = currentSound?.id === sound.id;
            return (
              <motion.div
                key={sound.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="w-44 shrink-0 cursor-pointer"
                onClick={() => playSound(sound)}
              >
                <div className="group relative mb-3 aspect-square overflow-hidden rounded-xl bg-[var(--surface-elevated)]">
                  <Image src="/assets/pack-lofi.jpg" alt={sound.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition group-hover:opacity-100">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)] text-white">
                      {isCurrent && isPlaying ? <Pause className="size-4" fill="currentColor" /> : <Play className="size-4" fill="currentColor" />}
                    </div>
                  </div>
                </div>
                <h4 className="truncate text-sm font-semibold text-white">{sound.title}</h4>
                <p className="truncate text-xs text-[var(--text-secondary)]">{sound.pack}</p>
              </motion.div>
            );
          })}
        </HorizontalRail>
      </section>

      {/* Pack highlights */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <SectionHeader title="包装亮点" />
          <Link href="/packs" className="text-xs font-bold text-[var(--text-secondary)] hover:text-white">
            查看全部
          </Link>
        </div>
        <HorizontalRail>
          {packHighlights.map((pack, index) => (
            <motion.div
              key={pack.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="w-44 shrink-0 cursor-pointer"
            >
              <div className="group relative mb-3 aspect-square overflow-hidden rounded-xl bg-[var(--surface-elevated)]">
                <Image src={pack.image} alt={pack.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition group-hover:opacity-100">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)] text-white">
                    <Play className="size-4" fill="currentColor" />
                  </div>
                </div>
              </div>
              <h4 className="truncate text-sm font-semibold text-white">{pack.title}</h4>
              <p className="truncate text-xs text-[var(--text-secondary)]">{pack.artist}</p>
            </motion.div>
          ))}
        </HorizontalRail>
      </section>

      {/* Recently added row */}
      <section>
        <SectionHeader title="最新上架" />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          {songHighlights.map((sound, index) => {
            const isCurrent = currentSound?.id === sound.id;
            return (
              <motion.div
                key={`recent-${sound.id}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center gap-3 rounded-xl border p-3 transition ${isCurrent ? "border-[var(--accent)]/50 bg-[var(--accent)]/10" : "border-[var(--border-subtle)] bg-[var(--surface)] hover:bg-[var(--surface-elevated)]"}`}
              >
                <button
                  onClick={() => playSound(sound)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black"
                >
                  {isCurrent && isPlaying ? <Pause className="size-4" fill="currentColor" /> : <Play className="size-4" fill="currentColor" />}
                </button>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">{sound.title}</p>
                  <p className="truncate text-xs text-[var(--text-secondary)]">{sound.type} · {sound.bpm} BPM</p>
                </div>
                <button className="text-[var(--text-muted)] hover:text-white">
                  <Heart className="size-4" />
                </button>
                <button className="text-[var(--text-muted)] hover:text-white">
                  <Download className="size-4" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
