import React from 'react';
import { Menu, ChevronRight } from 'lucide-react';
import { Button } from '../atoms/Button.jsx';

export const Header = ({ monthTitle, weekTitle, onToggleSidebar }) => {
  return (
    <header className="h-16 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur flex items-center px-6 justify-between shrink-0 z-20">
      <div className="flex items-center gap-4">
        <Button 
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
        >
            <Menu size={20} />
        </Button>
        <div className="flex items-center gap-2 text-sm text-zinc-500">
            <span>{monthTitle}</span>
            <ChevronRight size={14} />
            <span className="text-zinc-200 font-medium">{weekTitle}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
         <div className="hidden md:block">
            <div className="text-xs font-mono text-rust-500 bg-rust-900/10 px-3 py-1 rounded-full border border-rust-900/30">
                cargo run --release
            </div>
         </div>
      </div>
    </header>
  );
};
