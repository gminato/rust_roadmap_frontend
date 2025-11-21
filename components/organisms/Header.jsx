import React from 'react';
import { Menu, ChevronRight, LogOut, User as UserIcon } from 'lucide-react';
import { Button } from '../atoms/Button.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { GoogleLoginButton } from '../atoms/GoogleLoginButton.jsx';

export const Header = ({ monthTitle, weekTitle, onToggleSidebar }) => {
  const { user, logout } = useAuth();

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

         <div className="h-6 w-px bg-zinc-800 hidden md:block"></div>

         {user ? (
           <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm">
                 <span className="hidden sm:block text-zinc-300">{user.name}</span>
                 <img 
                    src={user.picture} 
                    alt={user.name} 
                    className="w-8 h-8 rounded-full border border-zinc-700"
                 />
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={logout}
                title="Sign Out"
                className="text-zinc-500 hover:text-red-400"
              >
                 <LogOut size={18} />
              </Button>
           </div>
         ) : (
           <GoogleLoginButton />
         )}
      </div>
    </header>
  );
};