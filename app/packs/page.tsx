"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Heart, Download, Music2, Clock, Tag, Check } from "lucide-react";
import { samplePacks } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePlayerStore, type Sound } from "@/stores/playerStore";

interface PackWithSamples {
  title: string;
  tag: string;
  bpm: string;
  image: string;
  color: string;
  description: string;
  samples: Sound[];
}

const packsWithSamples: PackWithSamples[] = samplePacks.map((pack, packIndex) => ({
  ...pack,
  samples: [
    {
      id: `${pack.title.toLowerCase().replace(/\s+/g, "-")}-sample-1`,
      title: `${pack.title} Loop 1`,
      pack: pack.title,
      type: "Loop",
      bpm: parseInt(pack.bpm) || 82,
      key: "A minor",
      tags: [pack.tag.split(" / ")[0], "鼓组"],
      length: "0:16",
      audioUrl: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(packIndex * 3 + 1) % 16 || 1}.mp3`,
    },
    {
      id: `${pack.title.toLowerCase().replace(/\s+/g, "-")}-sample-2`,
      title: `${pack.title} One Shot`,
      pack: pack.title,
      type: "One Shot",
      bpm: parseInt(pack.bpm) || 96,
      key: "C major",
      tags: [pack.tag.split(" / ")[0], "旋律"],
      length: "0:04",
      audioUrl: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(packIndex * 3 + 2) % 16 || 2}.mp3`,
    },
    {
      id: `${pack.title.toLowerCase().replace(/\s+/g, "-")}-sample-3`,
      title: `${pack.title} Bass Loop`,
      pack: pack.title,
      type: "Loop",
      bpm: parseInt(pack.bpm) || 74,
      key: "D minor",
      tags: [pack.tag.split(" / ")[0], "贝斯"],
      length: "0:20",
      audioUrl: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(packIndex * 3 + 3) % 16 || 3}.mp3`,
    },
  ],
}));

export default function PacksPage() {
  const router = useRouter();
  const [hoveredPack, setHoveredPack] = useState<string | null>(null);
  const [expandedPack, setExpandedPack] = useState<string | null>(null);
  const [likedPacks, setLikedPacks] = useState<string[]>([]);
  const [downloadedPacks, setDownloadedPacks] = useState<string[]>([]);
  const [downloadingPack, setDownloadingPack] = useState<string | null>(null);
  const [downloadingSample, setDownloadingSample] = useState<string | null>(null);
  const [downloadedSamples, setDownloadedSamples] = useState<string[]>([]);
  const { currentSound, setCurrentSound, setPlaylist, isPlaying, setIsPlaying, toggleLike, isLiked } =
    usePlayerStore();

  useEffect(() => {
    const allSamples = packsWithSamples.flatMap(p => p.samples);
    setPlaylist(allSamples);
  }, [setPlaylist]);

  const togglePackLike = (title: string) => {
    setLikedPacks((prev) =>
      prev.includes(title) ? prev.filter((p) => p !== title) : [...prev, title]
    );
  };

  const playSample = (sample: Sound) => {
    if (currentSound?.id === sample.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSound(sample);
    }
  };

  const playPackFirstSample = (pack: PackWithSamples) => {
    const firstSample = pack.samples[0];
    if (currentSound?.id === firstSample.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSound(firstSample);
    }
  };

  const toggleExpand = (title: string) => {
    setExpandedPack((prev) => (prev === title ? null : title));
  };

  const handleDownloadPack = (title: string) => {
    if (downloadingPack) return;
    setDownloadingPack(title);
    setTimeout(() => {
      setDownloadedPacks((prev) => [...prev, title]);
      setDownloadingPack(null);
    }, 1500);
  };

  const handleDownloadSample = (sampleId: string) => {
    if (downloadingSample) return;
    setDownloadingSample(sampleId);
    setTimeout(() => {
      setDownloadedSamples((prev) => [...prev, sampleId]);
      setDownloadingSample(null);
    }, 800);
  };

  const isPackPlaying = (pack: PackWithSamples) => {
    return currentSound && pack.samples.some((s) => s.id === currentSound.id) && isPlaying;
  };

  return (
    <main className="min-h-full bg-black p-4 pb-28 text-white md:p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold md:text-3xl">采样包</h1>
          <p className="text-sm text-[var(--text-secondary)]">
            精选制作人出品的高质量 Loop、One Shot 和 MIDI 合集 · {packsWithSamples.length} 个采样包
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {packsWithSamples.map((pack, index) => {
            const isLikedPack = likedPacks.includes(pack.title);
            const isExpanded = expandedPack === pack.title;
            const isThisPackDownloaded = downloadedPacks.includes(pack.title);
            const isThisPackDownloading = downloadingPack === pack.title;
            const isCurrentlyPlaying = isPackPlaying(pack);

            return (
              <motion.div
                key={pack.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                onMouseEnter={() => setHoveredPack(pack.title)}
                onMouseLeave={() => setHoveredPack(null)}
              >
                <Card className="group overflow-hidden transition-all duration-300 hover:border-[var(--accent)]/30">
                  <div
                    className="relative h-48 w-full cursor-pointer overflow-hidden"
                    onClick={() => {
                      if (hoveredPack === pack.title) {
                        playPackFirstSample(pack);
                      } else {
                        toggleExpand(pack.title);
                      }
                    }}
                  >
                    <Image
                      src={pack.image}
                      alt={pack.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <AnimatePresence>
                      {hoveredPack === pack.title && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="absolute inset-0 flex items-center justify-center bg-black/20"
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              playPackFirstSample(pack);
                            }}
                            className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent)]/30 transition hover:scale-105 active:scale-95"
                          >
                            {isCurrentlyPlaying ? (
                              <Pause size={24} fill="currentColor" />
                            ) : (
                              <Play size={24} fill="currentColor" className="ml-0.5" />
                            )}
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePackLike(pack.title);
                      }}
                      className={`absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full backdrop-blur-sm transition active:scale-90 ${
                        isLikedPack
                          ? "bg-[var(--accent)] text-white"
                          : "bg-black/40 text-white/80 hover:bg-black/60 hover:text-white"
                      }`}
                      aria-label={isLikedPack ? "取消收藏" : "收藏采样包"}
                    >
                      <Heart size={14} fill={isLikedPack ? "currentColor" : "none"} />
                    </button>

                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="mb-2 flex items-center gap-2">
                        <Badge className="bg-white/20 text-white backdrop-blur-sm">{pack.tag}</Badge>
                        <Badge variant="outline" className="border-white/30 text-white/80 backdrop-blur-sm">
                          {pack.bpm}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-bold text-white">{pack.title}</h3>
                    </div>
                  </div>

                  <CardHeader className="pb-2">
                    <CardDescription className="line-clamp-2">{pack.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-1 rounded-lg bg-[var(--surface-elevated)] p-2">
                            {pack.samples.map((sample, i) => {
                              const isCurrent = currentSound?.id === sample.id;
                              const isSampleLiked = isLiked(sample.id);
                              const isSampleDownloaded = downloadedSamples.includes(sample.id);
                              const isThisSampleDownloading = downloadingSample === sample.id;
                              return (
                                <div
                                  key={sample.id}
                                  className={`flex items-center gap-2 rounded-md p-2 transition ${
                                    isCurrent ? "bg-[var(--accent)]/10" : "hover:bg-white/5"
                                  }`}
                                >
                                  <button
                                    onClick={() => playSample(sample)}
                                    className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 active:scale-90"
                                  >
                                    {isCurrent && isPlaying ? (
                                      <Pause size={12} fill="currentColor" />
                                    ) : (
                                      <Play size={12} fill="currentColor" className="ml-0.5" />
                                    )}
                                  </button>
                                  <div className="min-w-0 flex-1">
                                    <p className="truncate text-xs font-medium">{sample.title}</p>
                                    <p className="text-[10px] text-[var(--text-muted)]">
                                      {sample.type} · {sample.bpm} BPM · {sample.key}
                                    </p>
                                  </div>
                                  <button
                                    onClick={() => toggleLike(sample.id)}
                                    className={`text-[var(--text-muted)] transition hover:text-white active:scale-90 ${
                                      isSampleLiked ? "text-[var(--accent)]" : ""
                                    }`}
                                  >
                                    <Heart size={12} fill={isSampleLiked ? "currentColor" : "none"} />
                                  </button>
                                  <button
                                    onClick={() => handleDownloadSample(sample.id)}
                                    disabled={isThisSampleDownloading}
                                    className={`text-[var(--text-muted)] transition hover:text-white active:scale-90 disabled:opacity-50 ${
                                      isSampleDownloaded ? "text-emerald-400" : ""
                                    }`}
                                  >
                                    {isThisSampleDownloading ? (
                                      <div className="size-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                    ) : isSampleDownloaded ? (
                                      <Check size={12} />
                                    ) : (
                                      <Download size={12} />
                                    )}
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                      <span className="flex items-center gap-1">
                        <Music2 size={12} />
                        {pack.samples.length} 采样
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        约 {pack.samples.length * 15}秒
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 rounded-md border-[var(--border-subtle)] active:scale-95"
                        onClick={() => toggleExpand(pack.title)}
                      >
                        {isExpanded ? "收起预览" : "预览采样"}
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 rounded-md bg-[var(--accent)] hover:bg-[var(--accent-hover)] active:scale-95"
                        onClick={() => {
                          if (!isThisPackDownloaded) {
                            handleDownloadPack(pack.title);
                          }
                        }}
                        disabled={isThisPackDownloading}
                      >
                        {isThisPackDownloading ? (
                          <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        ) : isThisPackDownloaded ? (
                          <>
                            <Check size={14} className="mr-1" />
                            已下载
                          </>
                        ) : (
                          <>
                            <Download size={14} className="mr-1" />
                            下载
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="rounded-xl border border-dashed border-[var(--border-subtle)] bg-[var(--surface)] p-8 text-center">
          <Tag className="mx-auto mb-3 size-8 text-[var(--text-muted)]" />
          <h3 className="mb-1 text-lg font-bold">更多采样包即将上线</h3>
          <p className="text-sm text-[var(--text-secondary)]">
            我们正在与更多制作人合作，每周上新优质采样包
          </p>
          <Button 
            variant="outline" 
            className="mt-4 rounded-md active:scale-95"
            onClick={() => router.push("/sounds")}
          >
            浏览采样库
          </Button>
        </div>
      </div>
    </main>
  );
}
