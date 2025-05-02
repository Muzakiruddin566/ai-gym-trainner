import React, { useState } from "react";
import DayCard from "./DayCard";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useProgramStore } from "@/stores/programStore";
import { Button } from "./UI/button";
import { PlusIcon } from "lucide-react";

export default function WeekTabs() {
  const program = useProgramStore((state) => state.program);
  const programStructure = program?.program_structure;
  console.log({ programStructure, program });
  const reorderExercises = useProgramStore((state) => state.reorderExercises);
  const [weekKeys, setWeekKeys] = useState(
    Object?.keys(program?.program_structure)
  );
  const [activeWeek, setActiveWeek] = useState(weekKeys[0]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    // Parse IDs: e.g. "day1-A"
    const [activeDay, activeExercise] = active.id.split("-");
    const [overDay, overExercise] = over.id.split("-");

    if (activeDay === overDay) {
      const exercisesObj = programStructure[activeWeek][activeDay];
      const exerciseEntries = Object.entries(exercisesObj);
      const oldIndex = exerciseEntries.findIndex(
        ([k, v]) => v.id === active.id
      );
      const newIndex = exerciseEntries.findIndex(([k, v]) => v.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newEntries = arrayMove(exerciseEntries, oldIndex, newIndex);
        const newExercisesObj = Object.fromEntries(newEntries);
        reorderExercises(activeWeek, activeDay, newExercisesObj);
      }
    }
  };

  console.log({ weekKeys });

  return (
    <div>
      <div className="flex space-x-2 mb-4">
        {weekKeys.map((weekKey) => (
          <button
            key={weekKey}
            onClick={() => setActiveWeek(weekKey)}
            className={`px-4 py-2 rounded ${
              activeWeek === weekKey
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {weekKey.replace("week", "Week ")}
          </button>
        ))}
      </div>
      <div className="container  max-w-5xl">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            // items={activeWeek.map((ex) => `${day.id}-${ex.id}`)}
            items={Object.entries(programStructure[activeWeek]).map(
              ([dayKey, exercises], index) => `${dayKey}-${index}`
            )}
            strategy={verticalListSortingStrategy}
          >
            {Object.entries(programStructure[activeWeek]).map(
              ([dayKey, exercises]) => (
                <div key={dayKey} className="mb-8">
                  <h2 className="text-xl font-bold mb-4 capitalize">
                    {dayKey.replace("day", "Day ")}
                  </h2>

                  {/* Day Header */}
                  <div className="bg-gray-50 rounded-lg flex items-center w-full border border-solid border-[#f2f2f2] overflow-hidden mb-2">
                    <div className="w-[85px] bg-[#e8e8e8]">
                      <div className="flex items-center justify-center p-4 bg-gray-50 border-t border-r border-[#f7f7f7]">
                        <span className="font-body-3-regular text-black">
                          Circuits
                        </span>
                      </div>
                    </div>
                    <div className="w-[212px] bg-[#e8e8e8]">
                      <div className="p-4 bg-gray-50 border-t border-r border-[#f7f7f7] flex items-center">
                        <span className="font-body-3-regular text-black">
                          Exercise
                        </span>
                      </div>
                    </div>
                    <div className="w-[60px] bg-[#e8e8e8]">
                      <div className="p-4 bg-gray-50 border-t border-r border-[#f7f7f7] flex items-center">
                        <span className="font-body-3-regular text-black">
                          Sets
                        </span>
                      </div>
                    </div>
                    <div className="w-[100px] bg-[#e8e8e8]">
                      <div className="p-4 bg-gray-50 border-t border-r border-[#f7f7f7] flex items-center">
                        <span className="font-body-3-regular text-black">
                          Reps
                        </span>
                      </div>
                    </div>
                    <div className="w-[100px] bg-[#e8e8e8]">
                      <div className="p-4 bg-gray-50 border-t border-r border-[#f7f7f7] flex items-center">
                        <span className="font-body-3-regular text-black">
                          Rest Time
                        </span>
                      </div>
                    </div>
                    <div className="w-[203px] bg-[#e8e8e8]">
                      <div className="p-4 bg-gray-50 border-t border-r border-[#f7f7f7] flex items-center">
                        <span className="font-body-3-regular text-black">
                          Notes
                        </span>
                      </div>
                    </div>
                    <div className="flex h-[53px] items-center justify-center p-2.5 flex-1 rounded overflow-hidden">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1 text-purple"
                      >
                        <PlusIcon className="w-4 h-4" />
                        <span className="font-small-txt">Circuit</span>
                      </Button>
                    </div>
                  </div>

                  {/* Exercises */}
                  {Object.entries(exercises).map(
                    ([exerciseKey, exerciseObj]) => (
                      <DayCard
                        key={exerciseObj.id}
                        dayKey={dayKey}
                        exercise={exerciseObj}
                        id={exerciseObj.id}
                        onMoveExercise={(exerciseId, direction) =>
                          handleMoveExercise(dayKey, exerciseId, direction)
                        }
                      />
                    )
                  )}
                </div>
              )
            )}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
