export const samplePacks = [
  {
    title: "Late Night Lofi",
    tag: "Lofi / Chill",
    bpm: "82 BPM",
    image: "/assets/pack-lofi.jpg",
    color: "cyan",
    description: "黑胶噪声、柔和 Rhodes、松弛鼓组和温暖低频。",
  },
  {
    title: "Future Alley",
    tag: "Future Beats",
    bpm: "96 BPM",
    image: "/assets/pack-electronic.jpg",
    color: "purple",
    description: "霓虹合成器、切片人声和带空气感的鼓机律动。",
  },
  {
    title: "CN Street Drums",
    tag: "Hip-Hop",
    bpm: "74 BPM",
    image: "/assets/pack-hiphop.jpg",
    color: "green",
    description: "硬朗 808、街头底鼓、军鼓与适合中文说唱的律动。",
  },
];

export const techStack = [
  "Next.js App Router: SSR/ISR 负责 SEO、采样包详情和付费页",
  "React Server Components: 降低客户端包体，播放器等交互区再使用 Client Component",
  "Tailwind CSS: 主题变量驱动暗色玻璃拟态设计系统",
  "Framer Motion: 页面入场、卡片 hover、播放器状态动画",
  "音频流: CDN 边缘缓存 + HTTP Range Request + HLS/DASH 自适应码率",
  "后端建议: 对象存储存放 WAV/MP3 预览，签名 URL、Redis 热点缓存、队列处理转码",
];
