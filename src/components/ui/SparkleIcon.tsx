"use client";

import React from 'react';

interface SparkleProps {
  className?: string;
}

export const SparkleIcon = ({ className = "" }: SparkleProps) => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    style={{ color: 'white' }}
  >
    {/* Основные лучи */}
    <path d="M12 3v18M3 12h18" />
    {/* Диагональные лучи для эффекта искры */}
    <path d="M7 7l10 10M7 17l10-10" />
  </svg>
);
