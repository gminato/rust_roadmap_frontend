import React from 'react';
import { Github, BookOpen, Cpu, Terminal, Check, ChevronLeft } from 'lucide-react';

const SidebarComponent = ({
  months,
  selectedMonthId,
  selectedWeekId,
  isOpen,
  onSelectMonth,
  onSelectWeek,
  completedExercises = new Set(),
  onClose
}) => {
  const MonthIcons = {
    1: BookOpen, // Fundamentals
    2: Cpu,      // Intermediate
    3: Terminal  // Systems
  };

  // Generate week numbers for selected month (assuming 4 weeks per month)
  const weeksForMonth = selectedMonthId ? Array.from({ length: 4 }, (_, i) => ({
    id: i + 1,
    title: `Week ${i + 1}`
  })) : [];

  return (
    <aside
      className={`${isOpen ? 'w-72' : 'w-0'} 
      flex-shrink-0 bg-zinc-900 border-r border-zinc-800 transition-all duration-300 overflow-hidden flex flex-col fixed md:relative h-full z-30`}
    >
      <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-rust-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">R</span>
          </div>
          <h1 className="font-bold text-zinc-100 tracking-tight">Rust Roadmap</h1>
        </div>
        <button
          onClick={onClose}
          className="text-zinc-500 hover:text-zinc-300 p-1 rounded-md hover:bg-zinc-800 transition-colors"
          title="Minimize Sidebar"
        >
          <ChevronLeft size={20} />
        </button>
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
                  {weeksForMonth.map((week) => {
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
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export const Sidebar = React.memo(SidebarComponent);