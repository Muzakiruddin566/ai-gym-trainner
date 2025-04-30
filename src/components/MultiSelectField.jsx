import React, { useRef, useState } from "react";
import { useClickAnyWhere } from "usehooks-ts";

export default function MultiSelectField({ label, options, selected, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const toggleOption = (value) => {
    const isSelected = selected.includes(value);
    const updated = isSelected
      ? selected.filter((v) => v !== value)
      : [...selected, value];

    onChange(updated);
  };

  useClickAnyWhere((e) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  });

  return (
    <div className="flex flex-col relative" ref={wrapperRef}>
      <label className="mb-1 font-medium text-sm text-gray-700">{label}</label>

      <div
        className="border border-gray-300 rounded-md p-2 cursor-pointer bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap gap-1">
          {selected.length > 0 ? (
            selected.map((val) => (
              <span
                key={val}
                className="bg-blue-100 text-blue-700 text-sm px-2 py-1 rounded-full"
              >
                {options.find((o) => o.value === val)?.label}
              </span>
            ))
          ) : (
            <span className="text-gray-400">Select options</span>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md z-10 max-h-60 overflow-y-auto">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => toggleOption(opt.value)}
              className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${
                selected.includes(opt.value) ? "bg-blue-50 font-medium" : ""
              }`}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
