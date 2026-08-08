"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { samplePacks } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";

export default function PacksPage() {
  return (
    <main className="min-h-screen bg-[#201d23] px-4 py-8 text-white md:px-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">采样包</h1>
          <p className="text-white/60">精选制作人出品的高质量 Loop、One Shot 和 MIDI 合集</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {samplePacks.map((pack, index) => (
            <motion.div
              key={pack.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image src={pack.image} alt={pack.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#201d23] via-transparent to-transparent" />
                  <Button
                    size="icon"
                    className="absolute bottom-4 right-4 size-12 rounded-full bg-white text-zinc-900 hover:bg-white/90"
                  >
                    <Play size={20} fill="currentColor" />
                  </Button>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{pack.tag}</Badge>
                    <Badge variant="outline">{pack.bpm}</Badge>
                  </div>
                  <CardTitle className="text-xl">{pack.title}</CardTitle>
                  <CardDescription>{pack.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={`/packs/${pack.title.toLowerCase().replace(/\s+/g, "-")}`}>
                    <Button className="w-full rounded-full">查看采样包</Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
