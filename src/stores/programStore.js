import { create } from 'zustand';

export const useProgramStore = create((set) => ({
  program: null,
  setProgram: (data) => set({ program: data }),
  clearProgram: () => set({ program: null }),
  reorderExercises: (weekKey, dayKey, newExercisesObj) => {
    state.programStructure[weekKey][dayKey] = newExercisesObj;
    return { programStructure: state.programStructure };
  }
}));
