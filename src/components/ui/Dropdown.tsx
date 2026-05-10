"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ANIMATION } from "@/constants";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  icon?: React.ReactNode;
  className?: string;
  showArrow?: boolean;
}

export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  (
    { 
      options, 
      value, 
      onChange, 
      label, 
      icon,
      className,
      showArrow = true,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedOption = options.find((opt) => opt.value === value);

    const toggleDropdown = () => {
      const tg = (window as any).Telegram?.WebApp;
      if (tg?.HapticFeedback) {
        tg.HapticFeedback.impactOccurred("light");
      }
      setIsOpen(!isOpen);
    };

    const handleSelect = (optionValue: string) => {
      onChange(optionValue);
      setIsOpen(false);
      const tg = (window as any).Telegram?.WebApp;
      if (tg?.HapticFeedback) {
        tg.HapticFeedback.selectionChanged();
      }
    };

    return (
      <div ref={ref} className={cn("relative", className)}>
        {/* Trigger Button */}
        <button
          onClick={toggleDropdown}
          className={cn(
            "h-11 min-w-[95px] bg-white/[0.08] hover:bg-white/12 backdrop-blur-[30px]",
            "border border-white/[0.08] rounded-full px-5 py-2.5",
            "flex items-center justify-between gap-2",
            "transition-all duration-200 active:scale-95",
            "text-sm font-bold text-white/60"
          )}
        >
          <div className="flex items-center gap-2">
            {icon}
            <span className="tracking-tight">{selectedOption?.label || label}</span>
          </div>
          {showArrow && (
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 200 }}
              className="flex-shrink-0"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="opacity-40"
              >
                <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </motion.div>
          )}
        </button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -15 }}
              animate={{ opacity: 1, scale: 1, y: 8 }}
              exit={{ opacity: 0, scale: 0.9, y: -15 }}
              transition={ANIMATION.easing.spring}
              className={cn(
                "absolute right-0 top-full w-48 mt-2 z-50",
                "rounded-[24px] overflow-hidden",
                "bg-[#1a1a1a]/80 backdrop-blur-[30px] border border-white/[0.08]",
                "shadow-lg"
              )}
            >
              <div className="p-1.5 flex flex-col gap-0.5">
                {options.map((option) => {
                  const isSelected = value === option.value;
                  return (
                    <button
                      key={option.value}
                      onClick={() => handleSelect(option.value)}
                      className="relative w-full px-4 py-3 text-left group"
                    >
                      {isSelected && (
                        <motion.div
                          layoutId="dropdown-bg"
                          className={cn(
                            "absolute inset-0 rounded-[18px]",
                            "bg-white/10 backdrop-blur-xl z-0"
                          )}
                        />
                      )}
                      <span
                        className={cn(
                          "relative z-10 text-sm font-bold tracking-tight",
                          "transition-colors duration-200",
                          isSelected
                            ? "text-white"
                            : "text-white/40 group-active:text-white/60"
                        )}
                      >
                        {option.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown";
