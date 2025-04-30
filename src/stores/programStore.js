import { create } from 'zustand';

export const useProgramStore = create((set) => ({
  program: null,
  setProgram: (data) => set({ program: data }),
  clearProgram: () => set({ program: null }),
}));
