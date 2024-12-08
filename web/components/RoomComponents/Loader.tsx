"use client";

import React from "react";
import { Loader2 } from "lucide-react";

interface LoaderProps {
  fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ fullScreen = true }) => {
  return (
    <div
      className={`
        ${fullScreen ? "fixed inset-0 z-50 flex items-center justify-center bg-black/70" : "flex items-center justify-center"}
      `}
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <Loader2
          className="animate-spin text-white"
          size={64}
          strokeWidth={2}
        />
        <p className="text-white text-lg font-semibold tracking-wide">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loader;
