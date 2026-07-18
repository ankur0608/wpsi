"use client";
import React from 'react';

export default function PrintButton() {
  return (
    <button 
      onClick={() => window.print()} 
      className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-6 rounded-lg shadow-sm transition-colors"
    >
      Download / Print Receipt
    </button>
  );
}
