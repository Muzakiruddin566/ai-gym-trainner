import React from "react";

export default function InputField({ label, name, type = "text", value, onChange, placeholder }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-1 font-medium text-sm text-gray-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
