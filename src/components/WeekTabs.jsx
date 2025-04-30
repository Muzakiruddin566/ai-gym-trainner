import React, { useState } from "react";
import DayCard from "./DayCard";


export default function WeekTabs({ programStructure }) {
    console.log({programStructure});
  const weekKeys = Object.keys(programStructure);
  const [activeWeek, setActiveWeek] = useState(weekKeys[0]);
    
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

      {Object.entries(programStructure[activeWeek]).map(
        ([dayKey, exercises]) => (
          <DayCard key={dayKey} dayKey={dayKey} exercises={exercises} />
        )
      )}
    </div>
  );
}
