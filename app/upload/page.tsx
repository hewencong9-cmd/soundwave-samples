"use client";

import { useState } from "react";
import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const tags = ["Lofi", "Chill", "Trap", "Future Bass", "鼓组", "键盘", "人声", "贝斯"];

export default function UploadPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <main className="min-h-screen bg-[#201d23] px-4 py-8 text-white md:px-6">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold md:text-3xl">上传采样</h1>
          <p className="text-white/60">分享你的声音，让其他制作人发现你的作品</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>基本信息</CardTitle>
            <CardDescription>填写采样标题、归属采样包和元数据</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">采样标题</label>
              <Input placeholder="例如：雨夜 Rhodes Loop" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">所属采样包</label>
              <Input placeholder="例如：Late Night Lofi" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">BPM</label>
                <Input type="number" placeholder="82" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Key</label>
                <Input placeholder="A minor" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">标签</label>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                      selectedTags.includes(tag)
                        ? "bg-cyan-300 text-zinc-900"
                        : "border border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>音频文件</CardTitle>
            <CardDescription>支持 WAV、MP3、FLAC 格式，最大 50MB</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-white/20 bg-white/5 py-12">
              <UploadCloud className="size-10 text-white/50" />
              <p className="text-sm text-white/70">拖拽文件到此处，或点击上传</p>
              <Button variant="outline" className="rounded-full border-white/20">
                选择文件
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button variant="ghost" className="rounded-full">
            保存草稿
          </Button>
          <Button className="rounded-full">发布采样</Button>
        </div>
      </div>
    </main>
  );
}
