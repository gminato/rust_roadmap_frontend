import React from 'react';

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyle = "transition-colors flex items-center justify-center gap-2 font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed relative";
  
  const variants = {
    primary: "bg-rust-600 hover:bg-rust-500 text-white",
    secondary: "bg-zinc-700 hover:bg-zinc-600 text-zinc-200",
    ghost: "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50",
    icon: "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-full"
  };

  const sizes = {
    sm: "text-xs px-3 py-2",
    md: "text-sm px-4 py-2",
    lg: "text-base px-6 py-3",
    icon: "p-2",
  };

  const activeSize = variant === 'icon' ? sizes.icon : sizes[size];
  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${activeSize} ${widthClass} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};