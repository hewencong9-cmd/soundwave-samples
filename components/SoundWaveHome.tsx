"use client";

import { motion } from "framer-motion";
import { Bookmark, ChevronLeft, ChevronRight, Download, Heart, MoreHorizontal, Music2, Pause, Play, RotateCcw, Search, SlidersHorizontal, WandSparkles } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

const newDrops = [
  { title: "天台 Lofi 鼓组", type: "复古鼓", image: "/assets/pack-lofi.jpg", progress: "新上架" },
  { title: "霓虹 Chill 吉他", type: "吉他 Loop", image: "/assets/pack-electronic.jpg", progress: "热门" },
  { title: "夜班车 808 低音", type: "Bass 单音", image: "/assets/pack-hiphop.jpg", progress: "Club" },
];

const continueItems = [
  { title: "雨夜键盘", meta: "已收藏 55%", image: "/assets/pack-lofi.jpg" },
  { title: "未来人声", meta: "已收藏 13%", image: "/assets/pack-electronic.jpg" },
  { title: "中文 Trap 鼓", meta: "已收藏 67%", image: "/assets/pack-hiphop.jpg" },
  { title: "黑胶质感", meta: "已收藏 31%", image: "/assets/hero-waveform.jpg" },
];

const recommendations = [
  { title: "胶片 Lofi", label: "编辑精选", meta: "带灰尘感的钢琴 Loop", image: "/assets/pack-lofi.jpg" },
  { title: "流动合成器", label: "动画感", meta: "未来合成器与流动和弦", image: "/assets/hero-waveform.jpg" },
  { title: "夜色氛围", label: "效果器", meta: "适合深夜节拍的 Chill 纹理", image: "/assets/pack-electronic.jpg" },
  { title: "中文流行梦境", label: "编辑精选", meta: "国语流行 Loop 起手包", image: "/assets/pricing-material.png" },
];

const filterGroups = [
  { label: "类型", values: ["Loop", "One Shot", "MIDI", "Preset"] },
  { label: "风格", values: ["Lofi", "Chill", "Future Bass", "Trap"] },
  { label: "乐器", values: ["鼓组", "键盘", "人声", "贝斯"] },
  { label: "BPM", values: ["70-90", "90-110", "110-130"] },
  { label: "Key", values: ["A minor", "C major", "D minor"] },
];

const soundRows = [
  { id: "dusty-keys", title: "雨夜 Rhodes Loop", pack: "Late Night Lofi", type: "Loop", bpm: 82, key: "A minor", tags: ["Lofi", "键盘"], length: "0:16" },
  { id: "neon-vocal", title: "霓虹人声切片", pack: "Future Alley", type: "One Shot", bpm: 96, key: "C major", tags: ["Chill", "人声"], length: "0:04" },
  { id: "bus-808", title: "夜班车 808", pack: "CN Street Drums", type: "One Shot", bpm: 74, key: "D minor", tags: ["Trap", "贝斯"], length: "0:03" },
  { id: "soft-drums", title: "松弛鼓组 Loop", pack: "Late Night Lofi", type: "Loop", bpm: 88, key: "A minor", tags: ["Lofi", "鼓组"], length: "0:12" },
];

export function SoundWaveHome() {
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>(["Loop", "Lofi"]);
  const [playingId, setPlayingId] = useState<string>("dusty-keys");
  const [likedIds, setLikedIds] = useState<string[]>(["dusty-keys"]);
  const [selectedSound, setSelectedSound] = useState(soundRows[0]);
  const [toast, setToast] = useState("已同步采样浏览交互");

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
    setActiveFilters((filters) => (filters.includes(value) ? filters.filter((filter) => filter !== value) : [...filters, value]));
  };

  const toggleLike = (id: string) => {
    setLikedIds((ids) => (ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id]));
  };

  const playSound = (id: string) => {
    setPlayingId((current) => (current === id ? "" : id));
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--sw-bg)] px-5 py-6 text-white md:px-7">
      <Image src="/assets/home-material.png" alt="" fill priority className="pointer-events-none object-cover opacity-45 blur-[7px] scale-105" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(255,196,141,0.24),transparent_26%),radial-gradient(circle_at_78%_18%,rgba(168,85,247,0.18),transparent_24%),linear-gradient(180deg,rgba(7,7,13,0.38),rgba(7,7,13,0.88))]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-64px)] max-w-[1240px] flex-col gap-7">
        <section className="glass-soft rounded-[24px] px-4 py-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-black/18 px-3 py-2 text-xs font-bold text-white/78">
              <SlidersHorizontal size={14} /> 筛选
            </span>
            {filterGroups.map((group) => (
              <div className="flex items-center gap-2" key={group.label}>
                <span className="text-[11px] font-semibold text-white/50">{group.label}</span>
                {group.values.slice(0, 3).map((value) => {
                  const active = activeFilters.includes(value);

                  return (
                    <button className={active ? "filter-chip filter-chip-active" : "filter-chip"} key={value} onClick={() => toggleFilter(value)}>
                      {value}
                    </button>
                  );
                })}
              </div>
            ))}
            <button className="ml-auto rounded-full bg-white/10 px-3 py-2 text-xs font-bold text-white/70" onClick={() => setActiveFilters([])}>
              清空 {activeFilters.length}
            </button>
          </div>
        </section>

        <section className="grid flex-1 grid-cols-1 gap-5 lg:grid-cols-[265px_1fr]">
          <aside className="flex flex-col gap-5">
            <motion.div className="glass-panel h-[415px] rounded-[28px] p-6" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-base font-bold">新鲜上架</h2>
                <span className="text-[11px] text-white/55">排序 <b className="text-white">今日</b></span>
              </div>
              <div className="space-y-3">
                {newDrops.map((item) => (
                  <article className="group relative h-[145px] overflow-hidden rounded-[16px]" key={item.title}>
                    <Image src={item.image} alt={item.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                      <div>
                        <p className="mb-1 text-[10px] font-semibold text-cyan-100">{item.progress}</p>
                        <h3 className="max-w-[150px] text-sm font-bold leading-4">{item.title}</h3>
                      </div>
                    <button className="play-dot">
                        <Play size={12} fill="currentColor" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </motion.div>

            <motion.div className="glass-panel min-h-[275px] rounded-[28px] p-6" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 }}>
              <h2 className="mb-5 text-base font-bold">继续挖掘</h2>
              <div className="space-y-3">
                {continueItems.map((item) => (
                  <article className="flex items-center gap-3" key={item.title}>
                    <div className="relative h-12 w-14 shrink-0 overflow-hidden rounded-[10px]">
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-xs font-semibold">{item.title}</h3>
                      <p className="mt-1 text-[9px] text-white/55">{item.meta}</p>
                    </div>
                    <button className="mini-play" onClick={() => setToast(`继续试听：${item.title}`)}>
                      <Play size={10} fill="currentColor" />
                    </button>
                  </article>
                ))}
              </div>
            </motion.div>
          </aside>

          <div className="min-w-0">
            <motion.article className="glass-hero relative min-h-[418px] overflow-hidden rounded-[28px] p-7 md:p-8" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
              <Image src="/assets/pack-electronic.jpg" alt="Lofi 制作人主视觉背景" fill priority className="pointer-events-none object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/76 via-black/38 to-black/8" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute left-5 right-5 top-5 z-10 grid gap-3 md:grid-cols-[1fr_1.3fr]">
                <label className="flex h-11 items-center gap-2 rounded-full bg-black/24 px-4 text-xs text-white/70 backdrop-blur-xl">
                  <Search size={14} />
                  <input className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-white/58" placeholder="在包内搜索 Loop" onChange={(event) => setQuery(event.target.value)} />
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["鼓组", "人声", "氛围"].map((tag) => (
                    <button className="rounded-full bg-white/16 px-3 py-2 text-xs font-bold text-white/82 backdrop-blur-xl" key={tag} onClick={() => toggleFilter(tag)}>
                      {tag}
                    </button>
                  ))}
                </div>
                <div className="md:col-span-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {soundRows.map((sound) => (
                    <button className="rounded-[14px] bg-black/28 p-3 text-left backdrop-blur-xl" key={sound.id} onClick={() => { setSelectedSound(sound); playSound(sound.id); setToast(`正在试听：${sound.title}`); }}>
                      <span className="mb-2 flex items-center justify-between text-[10px] text-white/52">
                        {sound.bpm} BPM <Play size={11} fill="currentColor" />
                      </span>
                      <span className="block truncate text-xs font-bold">{sound.title}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="relative z-10 flex min-h-[360px] max-w-[520px] flex-col justify-end">
                <span className="mb-5 inline-flex w-fit rounded-full bg-white/18 px-4 py-2 text-xs font-semibold backdrop-blur-xl">🔥 趋势采样包</span>
                <div className="mb-5 flex gap-2">
                  <span className="rounded-full bg-white/18 px-5 py-2 text-xs font-semibold backdrop-blur-xl">Lofi</span>
                  <span className="rounded-full bg-white/18 px-5 py-2 text-xs font-semibold backdrop-blur-xl">Chill</span>
                </div>
                <h1 className="max-w-[470px] text-[34px] font-semibold leading-[0.98] md:text-[42px]">午夜 Loop：穿过 SoundWave</h1>
                <p className="mt-4 max-w-[500px] text-sm leading-6 text-white/76">为年轻制作人精选的灵感起手包：柔和键盘、松弛鼓组、黑胶颗粒和未来感纹理，随时接入你的下一段 Beat。</p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button className="hero-action bg-white text-zinc-900" onClick={() => { setSelectedSound(soundRows[0]); playSound(soundRows[0].id); setToast("正在试听趋势采样包"); }}>
                    <Play size={16} fill="currentColor" /> 开始
                  </button>
                  <button className="hero-action border border-white/85 bg-white/8 text-white" onClick={() => setToast("已收藏趋势采样包")}>
                    <Bookmark size={16} /> 收藏包
                  </button>
                  <button className="hero-round" onClick={() => setToast("已加入稍后试听")}>
                    <Bookmark size={16} />
                  </button>
                </div>
              </div>
              <div className="absolute bottom-7 right-7 flex gap-3">
                <button className="hero-nav" onClick={() => setToast("已切换到上一组推荐")}><ChevronLeft size={22} /></button>
                <button className="hero-nav" onClick={() => setToast("已切换到下一组推荐")}><ChevronRight size={22} /></button>
              </div>
            </motion.article>

            <div className="mt-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">猜你喜欢</h2>
              <button className="rounded-full bg-white/20 px-3 py-1 text-[9px] font-bold backdrop-blur-xl">查看全部</button>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {recommendations.map((item, index) => (
                <motion.article className="rec-card group relative h-[238px] overflow-hidden rounded-[20px]" key={item.title} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 + index * 0.05 }}>
                  <Image src={item.image} alt={item.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/76 via-black/18 to-transparent" />
                  <button className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/28 backdrop-blur-xl">
                    <MoreHorizontal size={18} />
                  </button>
                  <div className="absolute bottom-5 left-4 right-4">
                    <span className="text-xs text-white/72">{item.label}</span>
                    <h3 className="mt-2 text-lg font-bold leading-5">{item.title}</h3>
                    <p className="mt-2 max-w-[145px] text-[11px] leading-4 text-white/68">{item.meta}</p>
                  </div>
                  <button className="absolute bottom-5 right-4 grid h-12 w-12 place-items-center rounded-full bg-white text-zinc-900" onClick={() => setToast(`开始试听推荐：${item.title}`)}>
                    <Play size={17} fill="currentColor" />
                  </button>
                </motion.article>
              ))}
            </div>

            <section className="glass-panel mt-5 rounded-[28px] p-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold">采样浏览器</h2>
                  <p className="mt-1 text-xs text-white/52">搜索、筛选、试听、收藏、下载和查找相似声音</p>
                </div>
                <button className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-xs font-bold text-white/78" onClick={() => setToast("已根据当前声音查找相似采样")}>
                  <WandSparkles size={14} /> 相似声音
                </button>
              </div>

              <div className="space-y-2">
                {filteredSounds.map((sound) => {
                  const isPlaying = playingId === sound.id;
                  const isLiked = likedIds.includes(sound.id);

                  return (
                    <article className={selectedSound.id === sound.id ? "sample-row sample-row-active" : "sample-row"} key={sound.id} onClick={() => setSelectedSound(sound)}>
                      <button className="row-play" onClick={(event) => { event.stopPropagation(); playSound(sound.id); }}>
                        {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
                      </button>
                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-bold">{sound.title}</h3>
                        <p className="mt-1 truncate text-[11px] text-white/48">{sound.pack}</p>
                      </div>
                      <div className="hidden h-8 items-center gap-1 sm:flex">
                        {Array.from({ length: 18 }).map((_, index) => (
                          <span className="w-1 rounded-full bg-cyan-100/70" key={index} style={{ height: `${26 + ((index * 19 + sound.bpm) % 45)}%`, opacity: isPlaying ? 0.9 : 0.45 }} />
                        ))}
                      </div>
                      <span className="hidden text-xs text-white/58 md:block">{sound.type}</span>
                      <span className="hidden text-xs text-white/58 md:block">{sound.bpm} BPM</span>
                      <span className="hidden text-xs text-white/58 lg:block">{sound.key}</span>
                      <span className="text-xs text-white/58">{sound.length}</span>
                      <button className={isLiked ? "row-icon row-icon-liked" : "row-icon"} onClick={(event) => { event.stopPropagation(); toggleLike(sound.id); }}>
                        <Heart size={14} fill={isLiked ? "currentColor" : "none"} />
                      </button>
                      <button className="row-icon" onClick={(event) => { event.stopPropagation(); setToast(`已加入下载队列：${sound.title}`); }}>
                        <Download size={14} />
                      </button>
                    </article>
                  );
                })}
              </div>
            </section>
          </div>
        </section>
      </div>

      <button className="glass-icon fixed bottom-4 right-4 z-20">
        <RotateCcw size={21} />
      </button>
      <aside className="glass-soft fixed bottom-4 left-4 z-20 hidden max-w-[360px] rounded-[20px] p-4 lg:block">
        <div className="mb-2 flex items-center gap-2 text-sm font-bold">
          <Music2 size={16} /> 当前试听：{selectedSound.title}
        </div>
        <p className="text-xs leading-5 text-white/58">{selectedSound.pack} · {selectedSound.type} · {selectedSound.bpm} BPM · {selectedSound.key}</p>
        <p className="mt-2 text-[11px] text-cyan-100/80">{toast}</p>
      </aside>
    </main>
  );
}
