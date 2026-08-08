"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WaveformPlayerProps {
  audioUrl: string;
  height?: number;
  waveColor?: string;
  progressColor?: string;
  className?: string;
}

export function WaveformPlayer({
  audioUrl,
  height = 48,
  waveColor = "rgba(255,255,255,0.35)",
  progressColor = "#7df9ff",
  className,
}: WaveformPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let ws: any;

    const init = async () => {
      const WaveSurfer = (await import("wavesurfer.js")).default;
      if (!containerRef.current) return;

      ws = WaveSurfer.create({
        container: containerRef.current,
        waveColor,
        progressColor,
        height,
        barWidth: 2,
        barGap: 2,
        barRadius: 2,
        cursorColor: "transparent",
        url: audioUrl,
      });

      ws.on("ready", () => setIsReady(true));
      ws.on("play", () => setIsPlaying(true));
      ws.on("pause", () => setIsPlaying(false));
      ws.on("finish", () => setIsPlaying(false));

      wavesurferRef.current = ws;
    };

    init();

    return () => {
      ws?.destroy();
    };
  }, [audioUrl, height, waveColor, progressColor]);

  const togglePlay = () => {
    wavesurferRef.current?.playPause();
  };

  return (
    <div className={className}>
      <div className="flex items-center gap-3">
        <Button
          variant="default"
          size="icon"
          className="shrink-0 rounded-full bg-white text-zinc-900 hover:bg-white/90"
          onClick={togglePlay}
          disabled={!isReady}
        >
          {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
        </Button>
        <div ref={containerRef} className="min-w-0 flex-1" />
      </div>
    </div>
  );
}
