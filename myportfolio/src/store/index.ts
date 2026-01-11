import { create } from "zustand";
import { createDockSlice, type DockSlice } from "./dockSlice";
import { createSystemSlice, type SystemSlice } from "./systemSlice";
import { createMusicSlice, type MusicSlice } from "./musicSlice";

type StoreState = DockSlice & SystemSlice & MusicSlice;

export const useStore = create<StoreState>()((...a) => ({
  ...createDockSlice(...a),
  ...createSystemSlice(...a),
  ...createMusicSlice(...a)
}));
