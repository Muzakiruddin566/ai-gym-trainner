import { useSortable } from "@dnd-kit/sortable";
// import {  } from "@dnd-kit/core";
import React from "react";
import { CSS } from "@dnd-kit/utilities";
import { Badge } from "./UI/Badge";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  GripVerticalIcon,
  MoreHorizontalIcon,
  Trash2Icon,
} from "lucide-react";
import { useProgramStore } from "@/stores/programStore";

export default function DayCard({ dayKey, exercise, id }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
  };

  const moveExercise = (direction) => {
    moveExercise(id, direction);
  };

  return (
    <div ref={setNodeRef} style={style} className="relative my-2">
      <div className="flex flex-col items-start w-full rounded-lg">
        {/* Exercise Set Type Header */}
        <div className="h-[53px] justify-center pl-4 pr-0 py-4 bg-white rounded-[8px_8px_0px_0px] border-r border-l border-t border-[#f2f2f2] flex items-center gap-2.5 w-full">
          <div className="flex items-center justify-between flex-1 mt-[-2.50px] mb-[-2.50px]">
            <Badge
              variant="outline"
              className="bg-strokeinput rounded-[32px] px-4 py-1"
            >
              <span className="font-small-txt text-black text-[length:var(--small-txt-font-size)] tracking-[var(--small-txt-letter-spacing)] leading-[var(--small-txt-line-height)] [font-style:var(--small-txt-font-style)]">
                {exercise?.training_intensifiers ?? "Regular Set"}
              </span>
            </Badge>
          </div>
          <div className="flex items-center">
            <div className="border-l border-[#f2f2f2] h-[53px] flex items-center justify-center p-4">
              <MoreHorizontalIcon className="w-5 h-5" />
            </div>
            <div
              {...attributes}
              {...listeners}
              className="border-l border-[#f2f2f2] h-[53px] flex items-center justify-center p-4 cursor-grab"
            >
              <GripVerticalIcon className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Exercise Details */}
        <div className="bg-white rounded-[0px_0px_8px_8px] flex items-center w-full border border-solid border-[#f2f2f2] overflow-hidden">
          {/* <div className="w-[85px]">
            <div className="justify-center p-4 border-r border-t border-[#f7f7f7] flex items-center">
              <span className="font-body-3-regular text-black text-[length:var(--body-3-regular-font-size)] tracking-[var(--body-3-regular-letter-spacing)] leading-[var(--body-3-regular-line-height)] [font-style:var(--body-3-regular-font-style)]">
              {Object.entries(exercise)
  .find(([key]) => key.startsWith("exercise"))
  ?.[1] ?? id}
              </span>
            </div>
          </div> */}
          <div className="w-[300px]">
            <div className="p-4 border-r border-t border-[#f7f7f7] flex items-center">
              <span className="font-body-3-regular text-black text-[length:var(--body-3-regular-font-size)] tracking-[var(--body-3-regular-letter-spacing)] leading-[var(--body-3-regular-line-height)] [font-style:var(--body-3-regular-font-style)]">
                {exercise?.name}
              </span>
            </div>
          </div>
          <div className="w-[60px]">
            <div className="p-4 bg-white border-r border-t border-[#f7f7f7] flex items-center">
              <span className="font-body-3-regular text-black text-[length:var(--body-3-regular-font-size)] tracking-[var(--body-3-regular-letter-spacing)] leading-[var(--body-3-regular-line-height)] [font-style:var(--body-3-regular-font-style)]">
                {exercise?.sets ?? 3}
              </span>
            </div>
          </div>
          <div className="w-[100px]">
            <div className="p-4 border-r border-t border-[#f7f7f7] flex items-center">
              <span className="font-body-3-regular text-black text-[length:var(--body-3-regular-font-size)] tracking-[var(--body-3-regular-letter-spacing)] leading-[var(--body-3-regular-line-height)] [font-style:var(--body-3-regular-font-style)]">
                {exercise?.reps ?? "12, 10,8"}
              </span>
            </div>
          </div>
          <div className="w-[100px]">
            <div className="p-4 border-r border-t border-[#f7f7f7] flex items-center">
              <span className="font-body-3-regular text-black text-[length:var(--body-3-regular-font-size)] tracking-[var(--body-3-regular-letter-spacing)] leading-[var(--body-3-regular-line-height)] [font-style:var(--body-3-regular-font-style)]">
                {exercise?.restTime ?? "95,155,135"}
              </span>
            </div>
          </div>
          <div className="flex-1">
            <div className="p-4 border-r border-t border-[#f7f7f7] flex items-center">
              <span className="font-body-3-regular text-black text-[length:var(--body-3-regular-font-size)] tracking-[var(--body-3-regular-letter-spacing)] leading-[var(--body-3-regular-line-height)] [font-style:var(--body-3-regular-font-style)]">
                {exercise?.notes ?? "1-3-1 tempo"}
              </span>
            </div>
          </div>
          <div className="border-l border-[#f2f2f2]">
            <div className="border-t border-r border-[#f7f7f7] flex h-[53px] items-center justify-center p-4"  onClick={() => useProgramStore.getState().deleteExercise(exercise.id)}>
              <Trash2Icon className="w-5 h-5" />
            </div>
          </div>
          <div className="border-l border-[#f2f2f2] flex flex-col">
            <button
              onClick={() => moveExercise("up")}
              className="border-t border-r border-[#f7f7f7] flex h-[26.5px] items-center justify-center p-2"
            >
              <ArrowUpIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => moveExercise("down")}
              className="border-t border-r border-[#f7f7f7] flex h-[26.5px] items-center justify-center p-2"
            >
              <ArrowDownIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
