"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface AvatarProps {
  src?: string;
  fallback: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  status?: "online" | "offline" | "idle";
}

const sizeClasses = {
  sm: "size-8",
  md: "size-10",
  lg: "size-14",
};

const statusIndicatorSize = {
  sm: "size-2",
  md: "size-2.5",
  lg: "size-3.5",
};

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, fallback, size = "md", className, status }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("relative flex-shrink-0", sizeClasses[size], className)}
      >
        {/* Avatar image or fallback */}
        <div
          className={cn(
            "size-full rounded-full flex items-center justify-center",
            "bg-gradient-to-br from-white/20 to-white/5",
            "border border-white/10 overflow-hidden"
          )}
        >
          {src ? (
            <img src={src} alt="Avatar" className="size-full object-cover" />
          ) : (
            <span className="text-xs font-bold text-white/60 uppercase">
              {fallback.charAt(0)}
            </span>
          )}
        </div>

        {/* Status indicator */}
        {status && (
          <div
            className={cn(
              "absolute bottom-0 right-0 rounded-full",
              "border border-[#0a0a0a]",
              statusIndicatorSize[size],
              status === "online" && "bg-green-500",
              status === "idle" && "bg-yellow-500",
              status === "offline" && "bg-gray-500"
            )}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";
