import React from "react";
import ExerciseRow from "./ExerciseRow";



export default function DayCard({ dayKey, exercises }) {
  return (
    <div className="mb-6 bg-white rounded shadow p-4">
      <h2 className="text-xl font-semibold mb-2 capitalize">
        {dayKey.replace("day", "Day ")}
      </h2>
      <div className="space-y-2">
        {Object.entries(exercises).map(([setKey, details]) => (
          <ExerciseRow key={setKey} setKey={setKey} details={details} />
        ))}
      </div>
    </div>
  );
}
