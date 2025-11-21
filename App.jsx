import React, { useState, useEffect } from 'react';
import { ROADMAP_DATA } from './constants.js';
import { Sidebar } from './components/organisms/Sidebar.jsx';
import { Header } from './components/organisms/Header.jsx';
import { WeekView } from './components/organisms/WeekView.jsx';
import ExerciseModal from './components/organisms/ExerciseModal.jsx';
import { useAuth } from './contexts/AuthContext.jsx';

const App = () => {
  const { user, isLoading, authenticatedFetch } = useAuth();
  const [selectedMonthId, setSelectedMonthId] = useState(1);
  const [selectedWeekId, setSelectedWeekId] = useState(1);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [completedExercises, setCompletedExercises] = useState(new Set());

  // Load progress whenever user changes (Guest vs Logged In)
  useEffect(() => {
    if (isLoading) return;

    if (user) {
      // Logged-in user: use progress from user object (fetched from backend)
      if (user.progress && Array.isArray(user.progress)) {
        setCompletedExercises(new Set(user.progress));
      } else {
        setCompletedExercises(new Set());
      }
    } else {
      // Guest user: use localStorage
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
    }
  }, [user, isLoading]);

  const toggleExerciseCompletion = async (id) => {
    setCompletedExercises(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }

      const progressArray = [...newSet];

      if (user && authenticatedFetch) {
        // Logged-in user: sync with backend using authenticated fetch (auto-refresh)
        const backendUrl = import.meta.env.VITE_BACKEND_API_URL;
        
        authenticatedFetch(`${backendUrl}/user/progress`, {
          method: 'POST',
          body: JSON.stringify({ progress: progressArray })
        })
        .then(res => {
          if (!res.ok) {
            console.error('Failed to sync progress with backend');
          }
        })
        .catch(err => console.error('Backend sync error:', err));
      } else if (!user) {
        // Guest user: save to localStorage only
        localStorage.setItem('rust_progress_guest', JSON.stringify(progressArray));
      }

      return newSet;
    });
  };

  const currentMonth = ROADMAP_DATA.find(m => m.id === selectedMonthId) || ROADMAP_DATA[0];
  const currentWeek = currentMonth.weeks.find(w => w.id === selectedWeekId) ||
    (currentMonth.weeks.length > 0 ? currentMonth.weeks[0] : null);

  const handleMonthSelect = (id) => {
    setSelectedMonthId(id);
    const month = ROADMAP_DATA.find(m => m.id === id);
    if (month && month.weeks.length > 0) {
      setSelectedWeekId(month.weeks[0].id);
    }
  };

  if (isLoading) {
    return <div className="min-h-screen bg-[#121212] flex items-center justify-center text-zinc-500">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex bg-[#121212] text-zinc-300 font-sans selection:bg-rust-900 selection:text-rust-100">

      <Sidebar
        months={ROADMAP_DATA}
        selectedMonthId={selectedMonthId}
        selectedWeekId={selectedWeekId}
        isOpen={isSidebarOpen}
        onSelectMonth={handleMonthSelect}
        onSelectWeek={setSelectedWeekId}
        completedExercises={completedExercises}
      />

      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <Header
          monthTitle={currentMonth.title}
          weekTitle={currentWeek?.title || "Overview"}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        <div className="flex-1 overflow-y-auto p-6 md:p-10 scroll-smooth">
          <WeekView
            week={currentWeek || null}
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