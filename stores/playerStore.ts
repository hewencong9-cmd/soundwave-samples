import { create } from "zustand";

export interface Sound {
  id: string;
  title: string;
  pack: string;
  type: string;
  bpm: number;
  key: string;
  tags: string[];
  length: string;
  audioUrl: string;
  imageUrl?: string;
}

interface PlayerState {
  currentSound: Sound | null;
  isPlaying: boolean;
  playlist: Sound[];
  setCurrentSound: (sound: Sound | null) => void;
  setIsPlaying: (playing: boolean) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentSound: null,
  isPlaying: false,
  playlist: [],
  setCurrentSound: (sound) => set({ currentSound: sound, isPlaying: !!sound }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  playNext: () => {
    const { currentSound, playlist } = get();
    if (!currentSound || playlist.length === 0) return;
    const index = playlist.findIndex((s) => s.id === currentSound.id);
    const next = playlist[(index + 1) % playlist.length];
    set({ currentSound: next, isPlaying: true });
  },
  playPrevious: () => {
    const { currentSound, playlist } = get();
    if (!currentSound || playlist.length === 0) return;
    const index = playlist.findIndex((s) => s.id === currentSound.id);
    const prev = playlist[(index - 1 + playlist.length) % playlist.length];
    set({ currentSound: prev, isPlaying: true });
  },
}));
