import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Sidebar } from './components/organisms/Sidebar.jsx';
import { Header } from './components/organisms/Header.jsx';
import { WeekView } from './components/organisms/WeekView.jsx';
import ExerciseModal from './components/organisms/ExerciseModal.jsx';
import { useMobileView } from './hooks/useMobileView.js';

// Hardcoded months data structure for sidebar
const MONTHS_DATA = [
  { id: 1, title: "Month 1: Fundamentals", focus: "Core syntax, ownership, borrowing, enums, traits" },
  { id: 2, title: "Month 2: Intermediate", focus: "Advanced concepts and patterns" },
  { id: 3, title: "Month 3: Systems", focus: "Systems programming and advanced topics" }
];

const App = () => {
  const isMobile = useMobileView();
  const [selectedMonthId, setSelectedMonthId] = useState(1);
  const [selectedWeekId, setSelectedWeekId] = useState(1);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [completedExercises, setCompletedExercises] = useState(new Set());

  // Sync sidebar state with mobile view
  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  // Load progress from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('rust_progress_guest');
      if (saved) {
        setCompletedExercises(new Set(JSON.parse(saved)));
      } else {
        setCompletedExercises(new Set());
      }
    } catch (e) {
      console.error("Failed to load progress", e);
      setCompletedExercises(new Set());
    }
  }, []);

  const toggleExerciseCompletion = useCallback((id) => {
    setCompletedExercises(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }

      const progressArray = [...newSet];
      localStorage.setItem('rust_progress_guest', JSON.stringify(progressArray));

      return newSet;
    });
  }, []);

  const monthTitle = useMemo(() => {
    const month = MONTHS_DATA.find(m => m.id === selectedMonthId);
    return month?.title || MONTHS_DATA[0].title;
  }, [selectedMonthId]);

  const handleMonthSelect = (id) => {
    setSelectedMonthId(id);
    setSelectedWeekId(1);
  };

  return (
    <div className="min-h-screen flex bg-[#121212] text-zinc-300 font-sans selection:bg-rust-900 selection:text-rust-100">

      <Sidebar
        months={MONTHS_DATA}
        selectedMonthId={selectedMonthId}
        selectedWeekId={selectedWeekId}
        isOpen={isSidebarOpen}
        onSelectMonth={handleMonthSelect}
        onSelectWeek={(id) => {
          setSelectedWeekId(id);
          if (isMobile) {
            setIsSidebarOpen(false);
          }
        }}
        onClose={() => setIsSidebarOpen(false)}
        completedExercises={completedExercises}
      />

      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <Header
          monthTitle={monthTitle}
          weekTitle={`Week ${selectedWeekId}`}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        <div className="flex-1 overflow-y-auto p-6 md:p-10 scroll-smooth">
          <WeekView
            monthId={selectedMonthId}
            weekId={selectedWeekId}
            onOpenExercise={(ex) => setSelectedExercise(ex)}
            completedExercises={completedExercises}
            onToggleExercise={toggleExerciseCompletion}
          />
        </div>
      </main>

      {selectedExercise && (
        <ExerciseModal
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
        />
      )}

    </div>
  );
};

export default App;
