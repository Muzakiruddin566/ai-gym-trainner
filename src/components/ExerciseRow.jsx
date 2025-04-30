import React from 'react';

export default function ExerciseRow({ setKey, details }) {
  const label = Object.keys(details).find((key) => key !== 'sets');
  const exerciseName = details[label];
  const sets = details.sets;

  return (
    <div className="flex justify-between items-center bg-gray-50 border border-gray-200 p-3 rounded-md shadow-sm text-sm">
      <div className="font-semibold text-gray-700">Set {setKey}</div>
      <div className="text-gray-600">{label}: {exerciseName}</div>
      <div className="text-gray-500">Sets: {sets}</div>
    </div>
  );
}
