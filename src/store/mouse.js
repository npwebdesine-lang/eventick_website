import { create } from 'zustand'

export const useMouseStore = create((set) => ({
  x: 0,
  y: 0,
  setMouse: (x, y) => set({ x, y }),
}))
