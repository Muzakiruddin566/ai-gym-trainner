import { create } from "zustand";

export const useProgramStore = create((set) => ({
  program: null,
  setProgram: (data) => set({ program: data }),
  clearProgram: () => set({ program: null }),
  reorderExercises: (weekKey, dayKey, newExercisesObj) =>
    set((state) => ({
      program: {
        ...state.program,
        program_structure: {
          ...state.program.program_structure,
          [weekKey]: {
            ...state.program.program_structure[weekKey],
            [dayKey]: newExercisesObj,
          },
        },
      },
    })),
  deleteExercise: (id) =>
    set((state) => {
      let updatedProgramStructure = { ...state.program.program_structure };

      // Loop through the weeks and days to find and remove the exercise by id
      for (const weekKey in updatedProgramStructure) {
        for (const dayKey in updatedProgramStructure[weekKey]) {
          const day = updatedProgramStructure[weekKey][dayKey];
          // If this exercise is in the current day, delete it
          if (day[id]) {
            const updatedDay = { ...day };
            delete updatedDay[id]; // Remove the exercise from the day

            // Update the program structure
            updatedProgramStructure[weekKey] = {
              ...updatedProgramStructure[weekKey],
              [dayKey]: updatedDay,
            };
          }
        }
      }

      return {
        program: {
          ...state.program,
          program_structure: updatedProgramStructure,
        },
      };
    }),
}));
