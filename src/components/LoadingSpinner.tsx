import React from "react";

export default function LoadingSpinner({ size = 9 }) {
  return (
    <div className="flex items-center justify-center">
      <div
        className="animate-spin rounded-full border-t-2 border-b-2 border-blue-500"
        style={{
          height: `${size * 4}px`, // Adjust size multiplier as needed
          width: `${size * 4}px`, // Adjust size multiplier as needed
        }}
      ></div>
    </div>
  );
}
