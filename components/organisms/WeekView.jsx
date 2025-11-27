import React, { useState, useEffect, useMemo } from 'react';
import { MarkdownRenderer } from '../atoms/MarkdownRenderer.jsx';
import { Badge } from '../atoms/Badge.jsx';
import { ExerciseCard } from '../molecules/ExerciseCard.jsx';
import { FolderTree, Terminal } from 'lucide-react';

// Cache outside component to persist across re-renders
const weekDataCache = {};

const WeekViewComponent = ({ monthId, weekId, onOpenExercise, completedExercises = new Set(), onToggleExercise }) => {
  const [weekData, setWeekData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch week data from API with caching
  useEffect(() => {
    const cacheKey = `${monthId}-${weekId}`;
    
    // Check if data is already cached
    if (weekDataCache[cacheKey]) {
      setWeekData(weekDataCache[cacheKey]);
      return;
    }

    const fetchWeekData = async () => {
      console.log("render")
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://us-central1-rustpractice-84f71.cloudfunctions.net/getWeekProblems?month=${monthId}&week=${weekId}`
        );
        if (response.ok) {
          const data = await response.json();
          // Map API response to match our component structure
          const mappedData = {
            ...data,
            exercises: data.problems?.map(problem => ({
              id: problem.id,
              title: problem.title,
              description: problem.short_description,
              difficulty: problem.difficulty,
              hint: problem.hint || '',
              problem: problem.problem || ''
            })) || []
          };
          
          // Cache the data
          weekDataCache[cacheKey] = mappedData;
          setWeekData(mappedData);
        } else {
          console.error('Failed to fetch week data');
          setWeekData(null);
        }
      } catch (error) {
        console.error('Error fetching week data:', error);
        setWeekData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeekData();
  }, [monthId, weekId]);

  if (isLoading || !weekData) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center text-zinc-600">
        <Terminal size={64} className="mb-4 opacity-20" />
        <p className="text-xl">{isLoading ? 'Loading...' : 'Select a week to view content.'}</p>
      </div>
    );
  }

  const exercises = weekData.exercises || [];
  const completedCount = exercises.filter(ex => completedExercises.has(ex.id)).length;
  const totalCount = exercises.length;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-zinc-100 mb-4">{weekData.title}</h2>

        <div className="prose prose-invert max-w-3xl prose-p:text-zinc-400 prose-p:leading-relaxed mb-6">
          <MarkdownRenderer content={weekData.description} />
        </div>

        {totalCount > 0 && (
          <div className="mb-8 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/50">
            <div className="flex justify-between text-xs font-mono text-zinc-400 mb-2 uppercase tracking-wider">
              <span>Progress</span>
              <span>{progress}% Complete ({completedCount}/{totalCount})</span>
            </div>
            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {weekData.topics && weekData.topics.map((topic, idx) => (
            <Badge key={idx} variant="topic">
              {topic}
            </Badge>
          ))}
        </div>
      </div>

      {weekData.folderStructure && (
        <div className="mb-12 bg-black rounded-xl border border-zinc-800 p-6 overflow-hidden relative group">
          <div className="absolute top-4 right-4 text-zinc-600">
            <FolderTree size={20} />
          </div>
          <h3 className="text-sm font-mono text-zinc-400 mb-4 uppercase tracking-widest">Suggested Structure</h3>
          <pre className="font-mono text-sm text-rust-300 overflow-x-auto">
            {weekData.folderStructure}
          </pre>
        </div>
      )}

      <div className="mb-8 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
          <Terminal className="text-rust-500" size={20} />
          Practice Exercises
        </h3>
        <span className="text-sm text-zinc-500">{exercises.length} Challenges</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {exercises.map((ex) => (
          <ExerciseCard
            key={ex.id}
            exercise={ex}
            onClick={onOpenExercise}
            isCompleted={completedExercises.has(ex.id)}
            onToggle={() => onToggleExercise(ex.id)}
          />
        ))}
      </div>

      <div className="h-20"></div> {/* Bottom Spacer */}
    </div>
  );
};

export const WeekView = React.memo(WeekViewComponent);