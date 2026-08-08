# SoundWave

SoundWave 是一个面向中国年轻制作人的在线音乐采样库，对标 Splice。视觉方向为暗色玻璃拟态、青紫霓虹、Lofi / Chill / Future Beats。

## 技术栈

- **Next.js 15** App Router + React 19
- **Tailwind CSS v4** + 自定义玻璃拟态设计系统
- **shadcn/ui** 组件库（Button / Card / Input / Dialog / Slider / Tabs / Badge）
- **Framer Motion** 动画
- **wavesurfer.js** 音频波形可视化
- **Zustand** 全局播放器状态
- **Supabase** 后端服务（认证、PostgreSQL 数据库、对象存储）

## 项目结构

```text
soundwave/
  app/                    # Next.js App Router 页面
    layout.tsx            # 根布局（Header + AudioPlayer）
    page.tsx              # 首页（发现与推荐）
    sounds/page.tsx       # 采样浏览器
    packs/page.tsx        # 采样包列表
    upload/page.tsx       # 上传采样
    pricing/page.tsx      # 订阅定价
  components/             # React 组件
    ui/                   # shadcn/ui 组件
    Header.tsx            # 顶部导航
    AudioPlayer.tsx       # 全局播放器
    SoundWaveHome.tsx     # 首页主体
    WaveformPlayer.tsx    # wavesurfer.js 波形播放器
  stores/
    playerStore.ts        # 播放器全局状态
  lib/
    utils.ts              # cn 工具函数
    data.ts               # 静态示例数据
    supabase/             # Supabase 客户端/服务端/中间件
      client.ts
      server.ts
      middleware.ts
  supabase/
    schema.sql            # 数据库表结构
  .env.example            # 环境变量示例
```

## 本地运行

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env.local`，填写你的 Supabase 项目信息：

```bash
cp .env.example .env.local
```

变量说明：

- `NEXT_PUBLIC_SUPABASE_URL`：Supabase 项目 URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`：公开匿名 Key
- `SUPABASE_SERVICE_ROLE_KEY`：服务端 Key（可选，用于管理脚本）

### 3. 初始化数据库

在 Supabase 的 SQL Editor 中执行 `supabase/schema.sql`。

### 4. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

## 核心功能路线

- [x] 首页发现与推荐
- [x] 采样浏览器（搜索、筛选、播放）
- [x] 采样包展示
- [x] 订阅定价页
- [x] 上传采样表单
- [x] 全局音频播放器
- [x] wavesurfer.js 波形可视化
- [ ] Supabase 数据库接入
- [ ] 用户认证与授权
- [ ] 文件上传与存储
- [ ] 支付集成（Stripe / 支付宝 / 微信支付）
- [ ] BPM/Key 自动检测
- [ ] 相似声音推荐

## 部署

推荐部署到 Vercel：

```bash
vercel
```

记得在 Vercel 项目设置中添加 Supabase 环境变量。
