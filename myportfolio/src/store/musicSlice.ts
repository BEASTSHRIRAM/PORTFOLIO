import { StateCreator } from 'zustand';

export interface MusicSlice {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  audioElement: HTMLAudioElement | null;
  setIsPlaying: (playing: boolean) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setAudioElement: (element: HTMLAudioElement | null) => void;
}

export const createMusicSlice: StateCreator<MusicSlice> = (set) => ({
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  audioElement: null,
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration }),
  setAudioElement: (element) => set({ audioElement: element }),
});
