"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const plans = [
  {
    name: "免费体验",
    price: "¥0",
    period: "/月",
    description: "适合刚入门的制作人",
    features: ["每月 10 次下载", "基础采样库访问", "MP3 预览试听", "个人收藏夹"],
    cta: "免费开始",
    popular: false,
  },
  {
    name: "制作人",
    price: "¥49",
    period: "/月",
    description: "全职制作人的最佳选择",
    features: ["无限下载", "完整采样库", "WAV 无损下载", "BPM/Key 高级筛选", "采样包优先上架"],
    cta: "立即订阅",
    popular: true,
  },
  {
    name: "团队版",
    price: "¥199",
    period: "/月",
    description: "工作室和小团队共享",
    features: ["5 个席位", "团队共享采样库", "商业授权", "API 访问", "专属客服支持"],
    cta: "联系销售",
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-full bg-black p-4 pb-28 text-white md:p-6">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold md:text-4xl">选择你的创作计划</h1>
          <p className="mx-auto mt-3 max-w-2xl text-[var(--text-secondary)]">
            无限制访问高质量采样，随时取消，为你的下一段 Beat 做好准备。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`relative h-full ${
                  plan.popular ? "border-[var(--accent)]/50 bg-[var(--accent)]/5" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-bold text-white">
                    最受欢迎
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4 flex items-baseline justify-center">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-[var(--text-muted)]">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                        <Check className="size-4 text-[var(--accent)]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={plan.popular ? "default" : "outline"}
                    className="w-full rounded-md"
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
