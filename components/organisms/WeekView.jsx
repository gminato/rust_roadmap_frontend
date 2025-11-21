import React from 'react';
import { MarkdownRenderer } from '../atoms/MarkdownRenderer.jsx';
import { Badge } from '../atoms/Badge.jsx';
import { ExerciseCard } from '../molecules/ExerciseCard.jsx';
import { FolderTree, Terminal } from 'lucide-react';

export const WeekView = ({ week, onOpenExercise, completedExercises = new Set(), onToggleExercise }) => {
  if (!week) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center text-zinc-600">
        <Terminal size={64} className="mb-4 opacity-20" />
        <p className="text-xl">Select a week to view content.</p>
      </div>
    );
  }

  const completedCount = week.exercises.filter(ex => completedExercises.has(ex.id)).length;
  const totalCount = week.exercises.length;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-zinc-100 mb-4">{week.title}</h2>

        <div className="prose prose-invert max-w-3xl prose-p:text-zinc-400 prose-p:leading-relaxed mb-6">
          <MarkdownRenderer content={week.description} />
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
          {week.topics.map((topic, idx) => (
            <Badge key={idx} variant="topic">
              {topic}
            </Badge>
          ))}
        </div>
      </div>

      {week.folderStructure && (
        <div className="mb-12 bg-black rounded-xl border border-zinc-800 p-6 overflow-hidden relative group">
          <div className="absolute top-4 right-4 text-zinc-600">
            <FolderTree size={20} />
          </div>
          <h3 className="text-sm font-mono text-zinc-400 mb-4 uppercase tracking-widest">Suggested Structure</h3>
          <pre className="font-mono text-sm text-rust-300 overflow-x-auto">
            {week.folderStructure}
          </pre>
        </div>
      )}

      <div className="mb-8 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
          <Terminal className="text-rust-500" size={20} />
          Practice Exercises
        </h3>
        <span className="text-sm text-zinc-500">{week.exercises.length} Challenges</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {week.exercises.map((ex) => (
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