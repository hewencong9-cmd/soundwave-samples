"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Music2, AudioLines, Layers, Smartphone, Monitor, Check, Pause } from "lucide-react";
import { usePlayerStore, type Sound } from "@/stores/playerStore";
import { samplePacks } from "@/lib/data";

const previewSounds: Sound[] = [
  {
    id: "preview-lofi",
    title: "Lofi 预览",
    pack: "Late Night Lofi",
    type: "Loop",
    bpm: 82,
    key: "A minor",
    tags: ["Lofi"],
    length: "0:16",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: "preview-electronic",
    title: "Electronic 预览",
    pack: "Future Alley",
    type: "Loop",
    bpm: 96,
    key: "C major",
    tags: ["Chill"],
    length: "0:20",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  },
  {
    id: "preview-hiphop",
    title: "Hip-Hop 预览",
    pack: "CN Street Drums",
    type: "Loop",
    bpm: 74,
    key: "D minor",
    tags: ["Trap"],
    length: "0:12",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  },
];

const features = [
  {
    title: "歌曲",
    badge: "采样许可已包含",
    description:
      "探索超过 10 万张唱片的庞大曲库，从标志性艺术家到鲜为人知的佳作，许多还包含分轨音频。跨越百年，涵盖所有流派与地区。",
    image: "/assets/pack-hiphop.jpg",
    tint: "from-amber-600/30",
    previewSound: previewSounds[2],
  },
  {
    title: "声音",
    badge: "100% 免版税",
    description:
      "从 300 多位制作人的采样包库中拖放超过 60 万个单次采样与循环，涵盖经典设备、真实质感与前卫音色。",
    image: "/assets/pack-electronic.jpg",
    tint: "from-rose-600/30",
    previewSound: previewSounds[1],
  },
  {
    title: "每周上新",
    badge: "持续更新",
    description:
      "超过 500 家唱片公司与出版商持续提供素材，每次访问都能发现新鲜声音。",
    image: "/assets/hero-waveform.jpg",
    tint: "from-emerald-600/30",
    previewSound: previewSounds[0],
  },
  {
    title: "完整工具包",
    badge: "一站搞定",
    description:
      "获取顶级采样工具、插件与应用程序。直观易用的软件，随时随地激发灵感。",
    image: "/assets/pack-lofi.jpg",
    tint: "from-violet-600/30",
    previewSound: previewSounds[0],
  },
];

const genres = [
  { name: "Lo-Fi 嘻哈", tag: "Lofi" },
  { name: "Future Bass", tag: "Future Bass" },
  { name: "Chill 电子", tag: "Chill" },
  { name: "Trap 街头", tag: "Trap" },
  { name: "鼓组 Loop", tag: "鼓组" },
  { name: "键盘音色", tag: "键盘" },
  { name: "人声切片", tag: "人声" },
  { name: "贝斯线条", tag: "贝斯" },
  { name: "合成器 Pad", tag: "合成器" },
  { name: "音效纹理", tag: "音效" },
  { name: "One Shot", tag: "One Shot" },
  { name: "Loop 循环", tag: "Loop" },
];

const genreImages = [
  "/assets/pack-hiphop.jpg",
  "/assets/pack-electronic.jpg",
  "/assets/pack-lofi.jpg",
  "/assets/hero-waveform.jpg",
];

const sampleTypes = [
  {
    icon: Music2,
    title: "Records",
    description: "经典歌曲，饱含灵魂与故事——跨越时代、地区与流派。",
  },
  {
    icon: Layers,
    title: "Stems",
    description: "真实录音室分轨，如阿卡贝拉，让你完全掌控采样。",
  },
  {
    icon: AudioLines,
    title: "Loops",
    description: "海量优质循环库，聚焦鼓组、贝斯与旋律律动。",
  },
  {
    icon: Check,
    title: "One-shots",
    description: "丰富的单次采样与音效，拖入工程即可使用。",
  },
];

const testimonials = [
  {
    quote: "SoundWave 会彻底改变人们创作音乐的方式。",
    author: "张制作人",
    role: "白金唱片制作人",
  },
  {
    quote: "现在找采样，我第一个想到的就是 SoundWave。",
    author: "李 Beatmaker",
    role: "独立音乐人",
  },
  {
    quote: "合法采样从未如此简单，创作自由回来了。",
    author: "王 DJ",
    role: "电子音乐艺人",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemFade = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function TracklibLanding() {
  const router = useRouter();
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const { currentSound, isPlaying, setCurrentSound, setIsPlaying, setPlaylist } = usePlayerStore();

  const handleGenreClick = (tag: string) => {
    router.push(`/sounds?tag=${encodeURIComponent(tag)}`);
  };

  const handlePreviewPlay = (sound: Sound) => {
    setPlaylist(previewSounds);
    if (currentSound?.id === sound.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSound(sound);
    }
  };

  const isFeaturePlaying = (sound: Sound) => {
    return currentSound?.id === sound.id && isPlaying;
  };

  return (
    <div className="bg-black text-white">
      {/* Hero */}
      <section className="relative flex min-h-screen items-center overflow-hidden pt-16">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-20 md:grid-cols-2 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-xl"
          >
            <Link
              href="/pricing"
              className="mb-8 inline-flex items-center gap-0 overflow-hidden rounded-full border border-white/10 bg-white/5 text-xs font-bold backdrop-blur-sm transition hover:bg-white/10 hover:scale-105 active:scale-95"
            >
              <span className="bg-emerald-500 px-3 py-1.5 text-[10px] font-black uppercase text-black">
                节省 33%
              </span>
              <span className="px-3 py-1.5 text-white/80">立即注册！</span>
            </Link>

            <h1 className="mb-6 text-5xl font-black uppercase leading-[0.92] tracking-tight md:text-6xl lg:text-7xl">
              唯一一个
              <br />
              360° 全方位
              <br />
              <span className="text-[var(--accent)]">采样平台</span>
            </h1>

            <p className="mb-8 text-lg text-white/60 md:text-xl">
              使用全球最全面的采样平台。
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/sounds"
                className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-bold text-white transition hover:bg-[var(--accent-hover)] hover:scale-105 active:scale-95"
              >
                开始使用
              </Link>
              <Link
                href="/sounds"
                className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/10 hover:scale-105 active:scale-95"
              >
                <Play className="size-4" fill="currentColor" />
                试听采样
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden md:block"
          >
            <div className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[var(--surface)] shadow-2xl">
              <Image
                src="/assets/pack-hiphop.jpg"
                alt="SoundWave app preview"
                fill
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="mb-3 flex items-center gap-2 text-xs font-bold text-white/60">
                  <span className="rounded bg-[var(--accent)] px-1.5 py-0.5 text-black">SONG HIGHLIGHTS</span>
                </div>
                <div className="flex gap-3 overflow-hidden">
                  {["/assets/pack-lofi.jpg", "/assets/pack-electronic.jpg", "/assets/hero-waveform.jpg"].map(
                    (src, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        className="relative aspect-square w-16 shrink-0 cursor-pointer overflow-hidden rounded-md"
                        onClick={() => handlePreviewPlay(previewSounds[i])}
                      >
                        <Image src={src} alt="" fill className="object-cover" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition hover:opacity-100">
                          <Play size={20} fill="white" />
                        </div>
                      </motion.div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Floating phone mockup */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-8 w-32 overflow-hidden rounded-xl border border-white/10 bg-[var(--surface)] shadow-2xl"
            >
              <div className="relative aspect-[9/16] w-full">
                <Image
                  src="/assets/pack-electronic.jpg"
                  alt="Mobile app"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="h-1 w-full rounded-full bg-white/20">
                    <div className="h-full w-2/3 rounded-full bg-[var(--accent)]" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Background texture */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_30%,rgba(255,85,0,0.08),transparent_40%)]" />
      </section>

      {/* All inclusive */}
      <section id="how-it-works" className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-3xl font-bold md:text-4xl"
          >
            全包式服务。
          </motion.h2>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-6 md:grid-cols-2"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemFade}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[var(--surface)] transition hover:border-[var(--accent)]/30"
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${feature.tint} via-black/40 to-black/80`} />
                  
                  {/* Play button overlay */}
                  <AnimatePresence>
                    {hoveredFeature === index && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={() => handlePreviewPlay(feature.previewSound)}
                        className="absolute inset-0 flex items-center justify-center bg-black/20 transition"
                      >
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent)]/30 transition hover:scale-110 active:scale-95">
                          {isFeaturePlaying(feature.previewSound) ? (
                            <Pause size={28} fill="currentColor" />
                          ) : (
                            <Play size={28} fill="currentColor" className="ml-1" />
                          )}
                        </div>
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
                <div className="p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <span className="rounded-full border border-white/10 bg-white/10 px-2.5 py-0.5 text-[10px] font-bold text-[var(--accent)]">
                      {feature.badge}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-white/60">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Genres */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 text-3xl font-bold md:text-4xl"
          >
            每个流派。每个时代。都精彩。
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-12 max-w-2xl text-white/60"
          >
            持续扩展的 10 万+ 可采样唱片曲库——从经典大作到隐藏宝石。点击任意流派开始探索。
          </motion.p>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
          >
            {genres.map((genre, index) => (
              <motion.div
                key={genre.name}
                variants={itemFade}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleGenreClick(genre.tag)}
                className="group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-xl"
              >
                <Image
                  src={genreImages[index % genreImages.length]}
                  alt={genre.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute inset-0 bg-[var(--accent)]/0 transition group-hover:bg-[var(--accent)]/20" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-sm font-bold transition group-hover:text-[var(--accent)]">{genre.name}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Sample types */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-3xl font-bold md:text-4xl"
          >
            获取任何类型的采样。
          </motion.h2>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {sampleTypes.map((type) => (
              <motion.div
                key={type.title}
                variants={itemFade}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-white/10 bg-[var(--surface)] p-6 transition hover:border-[var(--accent)]/30 hover:bg-[var(--surface-elevated)]"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-[var(--accent)] transition group-hover:bg-[var(--accent)]/10">
                  <type.icon className="size-6" strokeWidth={1.5} />
                </div>
                <h3 className="mb-2 text-lg font-bold">{type.title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{type.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured packs */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-3xl font-bold md:text-4xl"
          >
            精选采样包
          </motion.h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {samplePacks.slice(0, 3).map((pack, index) => (
              <motion.div
                key={pack.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-[var(--surface)] transition hover:border-[var(--accent)]/30"
                onClick={() => router.push("/packs")}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={pack.image}
                    alt={pack.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition group-hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePreviewPlay(previewSounds[index]);
                    }}
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)] text-white shadow-lg transition hover:scale-110 active:scale-95">
                      {isFeaturePlaying(previewSounds[index]) ? (
                        <Pause size={24} fill="currentColor" />
                      ) : (
                        <Play size={24} fill="currentColor" className="ml-0.5" />
                      )}
                    </div>
                  </motion.div>
                </div>
                <div className="p-5">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold text-white/60">
                      {pack.tag}
                    </span>
                    <span className="text-xs text-white/40">{pack.bpm}</span>
                  </div>
                  <h3 className="mb-1 text-lg font-bold">{pack.title}</h3>
                  <p className="text-sm text-white/60 line-clamp-2">{pack.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/packs"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10 hover:scale-105 active:scale-95"
            >
              查看全部采样包
              <Play size={14} className="rotate-90" fill="currentColor" />
            </Link>
          </div>
        </div>
      </section>

      {/* Apps */}
      <section id="apps" className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-3xl font-bold uppercase tracking-tight md:text-4xl"
          >
            完整工具包
          </motion.h2>

          <div className="grid gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-[var(--surface)] p-8 transition hover:border-[var(--accent)]/30"
            >
              <div className="relative z-10">
                <span className="mb-3 inline-block rounded bg-[var(--accent)] px-2 py-0.5 text-[10px] font-bold text-black">
                  New
                </span>
                <h3 className="mb-2 flex items-center gap-2 text-xl font-bold">
                  <Smartphone className="size-5" />
                  移动应用
                </h3>
                <p className="max-w-xs text-sm text-white/60">
                  滑动浏览采样，找到完美循环，通过全新 beatmaker 将它们变成你的作品。
                </p>
              </div>
              <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-xl">
                <Image
                  src="/assets/pack-electronic.jpg"
                  alt="Mobile app"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -4 }}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-[var(--surface)] p-8 transition hover:border-[var(--accent)]/30"
            >
              <div className="relative z-10">
                <h3 className="mb-2 flex items-center gap-2 text-xl font-bold">
                  <Monitor className="size-5" />
                  桌面应用
                </h3>
                <p className="max-w-xs text-sm text-white/60">
                  查找采样并无缝同步到你的 DAW。下载、拖拽、创作。
                </p>
              </div>
              <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-xl">
                <Image
                  src="/assets/hero-waveform.jpg"
                  alt="Desktop app"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center text-3xl font-bold uppercase tracking-tight md:text-4xl"
          >
            被最优秀的人使用。为每个人打造。
          </motion.h2>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-6 md:grid-cols-3"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.author}
                variants={itemFade}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-white/10 bg-[var(--surface)] p-6 transition hover:border-white/20"
              >
                <p className="mb-6 text-lg font-medium leading-relaxed text-white/90">
                  "{t.quote}"
                </p>
                <div>
                  <p className="font-bold">{t.author}</p>
                  <p className="text-sm text-white/50">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 text-3xl font-bold md:text-5xl">
              你需要的唯一采样库
            </h2>
            <p className="mb-8 text-lg text-white/60">
              采样经典唱片、独家采样包与 30 万+ 免版税声音——尽在一处。
            </p>
            <Link
              href="/pricing"
              className="inline-block rounded-md bg-[var(--accent)] px-8 py-4 text-sm font-bold text-white transition hover:bg-[var(--accent-hover)] hover:scale-105 active:scale-95"
            >
              开始使用
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 md:flex-row md:px-6">
          <Link href="/" className="text-lg font-black tracking-tight text-white">
            SOUNDWAVE
          </Link>
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} SoundWave. 让采样创作更简单。
          </p>
          <div className="flex gap-6">
            {[
              { label: "浏览", href: "/sounds" },
              { label: "采样包", href: "/packs" },
              { label: "定价", href: "/pricing" },
              { label: "上传", href: "/upload" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-white/50 transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}