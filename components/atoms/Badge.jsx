import React from 'react';
import { Difficulty } from '../../types.js';

export const Badge = ({ children, variant = 'neutral', className = '' }) => {
  const styles = {
    [Difficulty.Easy]: 'text-green-400 border-green-900/50 bg-green-900/10',
    [Difficulty.Medium]: 'text-yellow-400 border-yellow-900/50 bg-yellow-900/10',
    [Difficulty.Hard]: 'text-red-400 border-red-900/50 bg-red-900/10',
    'easy': 'text-green-400 border-green-900/50 bg-green-900/10',
    'medium': 'text-yellow-400 border-yellow-900/50 bg-yellow-900/10',
    'hard': 'text-red-400 border-red-900/50 bg-red-900/10',
    'neutral': 'text-zinc-500 border-zinc-700 bg-zinc-800/50',
    'topic': 'bg-zinc-800 text-zinc-300 border-zinc-700'
  };

  const baseClasses = (variant === 'topic')
    ? "px-3 py-1 rounded-full text-xs border"
    : "text-xs font-mono px-2 py-1 rounded border";

  const variantClass = styles[variant] || styles['neutral'];

  return (
    <span className={`${baseClasses} ${variantClass} ${className}`}>
      {children}
    </span>
  );
};