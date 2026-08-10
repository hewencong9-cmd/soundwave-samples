"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Music2, AudioLines, Layers, Smartphone, Monitor, Check } from "lucide-react";

const features = [
  {
    title: "歌曲",
    badge: "采样许可已包含",
    description:
      "探索超过 10 万张唱片的庞大曲库，从标志性艺术家到鲜为人知的佳作，许多还包含分轨音频。跨越百年，涵盖所有流派与地区。",
    image: "/assets/pack-hiphop.jpg",
    tint: "from-amber-600/30",
  },
  {
    title: "声音",
    badge: "100% 免版税",
    description:
      "从 300 多位制作人的采样包库中拖放超过 60 万个单次采样与循环，涵盖经典设备、真实质感与前卫音色。",
    image: "/assets/pack-electronic.jpg",
    tint: "from-rose-600/30",
  },
  {
    title: "每周上新",
    badge: "持续更新",
    description:
      "超过 500 家唱片公司与出版商持续提供素材，每次访问都能发现新鲜声音。",
    image: "/assets/hero-waveform.jpg",
    tint: "from-emerald-600/30",
  },
  {
    title: "完整工具包",
    badge: "一站搞定",
    description:
      "获取顶级采样工具、插件与应用程序。直观易用的软件，随时随地激发灵感。",
    image: "/assets/pack-lofi.jpg",
    tint: "from-violet-600/30",
  },
];

const genres = [
  "70s Afrobeat",
  "Southern Gospel",
  "2010s Indie",
  "Vintage Library",
  "Japanese Pop",
  "Modern Pop",
  "Latin Jazz",
  "60s Jazz",
  "Bossa Nova",
  "2000s R&B",
  "Folk",
  "80s Funk",
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
              className="mb-8 inline-flex items-center gap-0 overflow-hidden rounded-full border border-white/10 bg-white/5 text-xs font-bold backdrop-blur-sm transition hover:bg-white/10"
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
                className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-bold text-white transition hover:bg-[var(--accent-hover)]"
              >
                开始使用
              </Link>
              <Link
                href="/sounds"
                className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/10"
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
                  {[
                    "/assets/pack-lofi.jpg",
                    "/assets/pack-electronic.jpg",
                    "/assets/hero-waveform.jpg",
                  ].map((src, i) => (
                    <div
                      key={i}
                      className="relative aspect-square w-16 shrink-0 overflow-hidden rounded-md"
                    >
                      <Image src={src} alt="" fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating phone mockup */}
            <div className="absolute -bottom-8 -left-8 w-32 overflow-hidden rounded-xl border border-white/10 bg-[var(--surface)] shadow-2xl">
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
            </div>
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
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={itemFade}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[var(--surface)]"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${feature.tint} via-black/40 to-black/80`} />
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
            持续扩展的 10 万+ 可采样唱片曲库——从经典大作到隐藏宝石。
          </motion.p>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
          >
            {genres.map((genre) => (
              <motion.div
                key={genre}
                variants={itemFade}
                className="group relative aspect-[4/5] overflow-hidden rounded-xl"
              >
                <Image
                  src="/assets/pack-lofi.jpg"
                  alt={genre}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-sm font-bold">{genre}</h3>
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
                className="rounded-2xl border border-white/10 bg-[var(--surface)] p-6 transition hover:border-white/20"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-[var(--accent)]">
                  <type.icon className="size-6" strokeWidth={1.5} />
                </div>
                <h3 className="mb-2 text-lg font-bold">{type.title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{type.description}</p>
              </motion.div>
            ))}
          </motion.div>
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
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-[var(--surface)] p-8"
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
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-[var(--surface)] p-8"
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
                className="rounded-2xl border border-white/10 bg-[var(--surface)] p-6"
              >
                <p className="mb-6 text-lg font-medium leading-relaxed text-white/90">
                  “{t.quote}”
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
              className="inline-block rounded-full bg-[var(--accent)] px-8 py-4 text-sm font-bold text-white transition hover:bg-[var(--accent-hover)]"
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
            {["浏览", "定价", "上传", "关于"].map((label) => (
              <Link
                key={label}
                href={label === "关于" ? "/" : `/${label === "浏览" ? "sounds" : label.toLowerCase()}`}
                className="text-sm text-white/50 transition hover:text-white"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
