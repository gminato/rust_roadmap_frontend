import React from 'react';
import { Github, BookOpen, Cpu, Terminal, Check } from 'lucide-react';

export const Sidebar = ({ 
  months, 
  selectedMonthId, 
  selectedWeekId, 
  isOpen, 
  onSelectMonth, 
  onSelectWeek,
  completedExercises = new Set()
}) => {
  const MonthIcons = {
    1: BookOpen, // Fundamentals
    2: Cpu,      // Intermediate
    3: Terminal  // Systems
  };

  return (
    <aside 
      className={`${isOpen ? 'w-72' : 'w-0'} 
      flex-shrink-0 bg-zinc-900 border-r border-zinc-800 transition-all duration-300 overflow-hidden flex flex-col fixed md:relative h-full z-30`}
    >
      <div className="p-6 border-b border-zinc-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-rust-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
          </div>
          <h1 className="font-bold text-zinc-100 tracking-tight">Rust Roadmap</h1>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        {months.map((month) => {
          const Icon = MonthIcons[month.id] || Terminal;
          return (
            <div key={month.id}>
              <button
                onClick={() => onSelectMonth(month.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors mb-2
                  ${selectedMonthId === month.id ? 'text-rust-400 font-semibold' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                <Icon size={18} />
                <span className="text-sm uppercase tracking-wider">{month.title}</span>
              </button>

              {selectedMonthId === month.id && (
                <div className="ml-4 border-l border-zinc-800 pl-4 space-y-1">
                  {month.weeks.length > 0 ? (
                      month.weeks.map((week) => {
                        const isCompleted = week.exercises.length > 0 && week.exercises.every(ex => completedExercises.has(ex.id));
                        
                        return (
                          <button
                              key={week.id}
                              onClick={() => onSelectWeek(week.id)}
                              className={`w-full text-left px-3 py-2 rounded text-sm transition-all flex items-center justify-between group
                              ${selectedWeekId === week.id 
                                  ? 'bg-rust-900/20 text-rust-200 border-l-2 border-rust-500' 
                                  : 'text-zinc-500 hover:text-zinc-300 border-l-2 border-transparent'}`}
                          >
                              <span>{week.title}</span>
                              {isCompleted && (
                                <Check size={14} className="text-green-500" />
                              )}
                          </button>
                        );
                      })
                  ) : (
                      <p className="text-xs text-zinc-600 px-3 py-2 italic">Content coming soon</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="p-4 border-t border-zinc-800">
          <a href="#" className="flex items-center gap-2 text-xs text-zinc-500 hover:text-rust-400 transition-colors">
              <Github size={14} />
              <span>View on GitHub</span>
          </a>
      </div>
    </aside>
  );
};