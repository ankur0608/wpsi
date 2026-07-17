"use client";

import React, { useRef, KeyboardEvent } from "react";

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function OTPInput({ length = 4, value, onChange, disabled = false }: OTPInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = e.target.value;
    if (/[^0-9]/.test(newValue)) return;

    const otpArray = value.split("").slice(0, length);
    while (otpArray.length < length) {
        otpArray.push("");
    }
    
    if (newValue.length > 1) {
        // Handle autocomplete or pasted value that missed onPaste
        const pasted = newValue.slice(0, length).split("");
        for (let i = 0; i < pasted.length; i++) {
            otpArray[i] = pasted[i];
        }
        onChange(otpArray.join(""));
        const focusIndex = Math.min(pasted.length, length - 1);
        inputsRef.current[focusIndex]?.focus();
    } else {
        otpArray[index] = newValue.substring(newValue.length - 1);
        onChange(otpArray.join(""));
        if (newValue && index < length - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
        if (!value[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
            const otpArray = value.split("");
            otpArray[index - 1] = "";
            onChange(otpArray.join(""));
        } else {
            const otpArray = value.split("");
            otpArray[index] = "";
            onChange(otpArray.join(""));
        }
    }
    if (e.key === "ArrowLeft" && index > 0) {
        inputsRef.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < length - 1) {
        inputsRef.current[index + 1]?.focus();
    }
  };
  
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, length);
    if (pastedData) {
      const otpArray = pastedData.split("");
      while (otpArray.length < length) {
          otpArray.push("");
      }
      onChange(otpArray.join(""));
      const focusIndex = Math.min(pastedData.length, length - 1);
      inputsRef.current[focusIndex]?.focus();
    }
  };

  return (
    <div className="flex gap-3 justify-center w-full py-2">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => { inputsRef.current[index] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={length}
          disabled={disabled}
          value={value[index] || ""}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="w-12 sm:w-14 h-14 text-center text-2xl font-bold bg-white dark:bg-dark-bg border-2 border-gray-200 dark:border-white/10 rounded-xl text-dark-900 dark:text-[var(--text-primary)] focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all shadow-sm hover:border-gray-300 dark:hover:border-white/20 disabled:opacity-50"
        />
      ))}
    </div>
  );
}
