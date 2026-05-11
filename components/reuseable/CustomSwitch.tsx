"use client";

import React, { useState } from 'react';

interface CustomSwitchProps {
  initialState?: boolean | number;
  onChange?: (enabled: boolean) => void;
}

export default function CustomSwitch({ initialState = true, onChange }: CustomSwitchProps) {
  const [enabled, setEnabled] = useState(initialState);

  const toggleSwitch = () => {
    const newState = !enabled;
    setEnabled(newState);
    if (onChange) onChange(newState);
  };

  return (
    <button
      onClick={toggleSwitch}
      className={`
        flex w-11 h-6 items-center p-0.5 rounded-xl transition-colors duration-200 ease-in-out
        ${enabled ? 'bg-[#22C55E] justify-end' : 'bg-[#3F3F46] justify-start'}
      `}
    >
      <div 
        className="w-5 h-5 bg-white rounded-full shadow-sm transition-all duration-200"
      />
    </button>
  );
}