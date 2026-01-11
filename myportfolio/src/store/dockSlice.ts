import type { StateCreator } from "zustand";

export interface DockSlice {
  dockSize: number;
  dockMag: number;
  setDockSize: (v: number) => void;
  setDockMag: (v: number) => void;
}

export const createDockSlice: StateCreator<DockSlice> = (set) => ({
  dockSize: 80,
  dockMag: 1.9,
  setDockSize: (v) => set(() => ({ dockSize: v })),
  setDockMag: (v) => set(() => ({ dockMag: v }))
});
