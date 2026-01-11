import { create } from "zustand";
import { createDockSlice, type DockSlice } from "./dockSlice";
import { createSystemSlice, type SystemSlice } from "./systemSlice";

type StoreState = DockSlice & SystemSlice;

export const useStore = create<StoreState>()((...a) => ({
  ...createDockSlice(...a),
  ...createSystemSlice(...a)
}));
