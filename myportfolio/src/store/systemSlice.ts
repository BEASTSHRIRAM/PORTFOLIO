import type { StateCreator } from "zustand";

export interface SystemSlice {
  // System settings
  wifi: boolean;
  bluetooth: boolean;
  airdrop: boolean;
  dark: boolean;
  fullscreen: boolean;
  brightness: number;
  volume: number;
  
  // Toggles
  toggleWifi: () => void;
  toggleBluetooth: () => void;
  toggleAirdrop: () => void;
  toggleDark: () => void;
  toggleFullscreen: () => void;
  
  // Setters
  setBrightness: (v: number) => void;
  setVolume: (v: number) => void;
}

export const createSystemSlice: StateCreator<SystemSlice> = (set) => ({
  wifi: true,
  bluetooth: true,
  airdrop: false,
  dark: true,
  fullscreen: false,
  brightness: 100,
  volume: 50,
  
  toggleWifi: () => set((state) => ({ wifi: !state.wifi })),
  toggleBluetooth: () => set((state) => ({ bluetooth: !state.bluetooth })),
  toggleAirdrop: () => set((state) => ({ airdrop: !state.airdrop })),
  toggleDark: () => set((state) => ({ dark: !state.dark })),
  toggleFullscreen: () => set((state) => ({ fullscreen: !state.fullscreen })),
  
  setBrightness: (v) => set(() => ({ brightness: v })),
  setVolume: (v) => set(() => ({ volume: v })),
});
