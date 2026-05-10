"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "glass" | "surface" | "outlined";
  clickable?: boolean;
  onClick?: () => void;
}

const variantClasses = {
  glass: cn(
    "bg-white/[0.08] backdrop-blur-[30px]",
    "border border-white/[0.08]"
  ),
  surface: "bg-white/5 border border-white/[0.05]",
  outlined: "bg-transparent border border-white/[0.08]",
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { 
      className, 
      variant = "glass", 
      clickable = false,
      onClick,
      children,
      ...props 
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        onClick={onClick}
        className={cn(
          "rounded-[24px] p-4 transition-all duration-200",
          variantClasses[variant],
          clickable && "cursor-pointer active:scale-95 hover:bg-white/12",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
