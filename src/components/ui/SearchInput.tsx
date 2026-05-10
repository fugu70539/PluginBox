"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, icon, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div
        className={cn(
          "relative w-full h-11",
          "bg-white/[0.08] hover:bg-white/12 backdrop-blur-[30px]",
          "border border-white/[0.08]",
          "rounded-full px-5",
          "flex items-center gap-3",
          "transition-all duration-200",
          isFocused && "ring-2 ring-white/20"
        )}
      >
        {icon ? (
          icon
        ) : (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="flex-shrink-0 opacity-40"
          >
            <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10 10L14 14" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        )}
        <input
          ref={ref}
          type="text"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "flex-1 bg-transparent outline-none",
            "text-sm font-medium text-white/90 placeholder-white/30",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";
