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

type RepeatMode = "off" | "all" | "one";

interface PlayerState {
  currentSound: Sound | null;
  isPlaying: boolean;
  playlist: Sound[];
  volume: number;
  currentTime: number;
  duration: number;
  isShuffle: boolean;
  repeatMode: RepeatMode;
  likedIds: string[];
  searchQuery: string;
  setCurrentSound: (sound: Sound | null) => void;
  setIsPlaying: (playing: boolean) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
  setVolume: (volume: number) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  seekTo: (time: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  toggleLike: (id: string) => void;
  isLiked: (id: string) => boolean;
  setPlaylist: (sounds: Sound[]) => void;
  setSearchQuery: (query: string) => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentSound: null,
  isPlaying: false,
  playlist: [],
  volume: 0.7,
  currentTime: 0,
  duration: 0,
  isShuffle: false,
  repeatMode: "off",
  likedIds: ["dusty-keys", "neon-vocal"],
  searchQuery: "",

  setCurrentSound: (sound) => set({ currentSound: sound, isPlaying: !!sound, currentTime: 0 }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),

  playNext: () => {
    const { currentSound, playlist, isShuffle, repeatMode } = get();
    if (!currentSound || playlist.length === 0) return;

    if (repeatMode === "one") {
      set({ currentTime: 0 });
      return;
    }

    let nextIndex: number;
    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * playlist.length);
    } else {
      const currentIndex = playlist.findIndex((s) => s.id === currentSound.id);
      nextIndex = (currentIndex + 1) % playlist.length;
      if (nextIndex === 0 && repeatMode === "off") {
        set({ isPlaying: false });
        return;
      }
    }

    const next = playlist[nextIndex];
    set({ currentSound: next, isPlaying: true, currentTime: 0 });
  },

  playPrevious: () => {
    const { currentSound, playlist, currentTime } = get();
    if (!currentSound || playlist.length === 0) return;

    if (currentTime > 3) {
      set({ currentTime: 0 });
      return;
    }

    const currentIndex = playlist.findIndex((s) => s.id === currentSound.id);
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    const prev = playlist[prevIndex];
    set({ currentSound: prev, isPlaying: true, currentTime: 0 });
  },

  setVolume: (volume) => set({ volume: Math.max(0, Math.min(1, volume)) }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration }),
  seekTo: (time) => set({ currentTime: time }),

  toggleShuffle: () => set((state) => ({ isShuffle: !state.isShuffle })),
  toggleRepeat: () =>
    set((state) => ({
      repeatMode: state.repeatMode === "off" ? "all" : state.repeatMode === "all" ? "one" : "off",
    })),

  toggleLike: (id) =>
    set((state) => ({
      likedIds: state.likedIds.includes(id)
        ? state.likedIds.filter((i) => i !== id)
        : [...state.likedIds, id],
    })),

  isLiked: (id) => get().likedIds.includes(id),
  setPlaylist: (sounds) => set({ playlist: sounds }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
