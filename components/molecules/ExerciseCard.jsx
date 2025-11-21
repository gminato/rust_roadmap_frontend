import React from 'react';
import { Code, ArrowRight, CheckCircle, Circle } from 'lucide-react';
import { Badge } from '../atoms/Badge.jsx';

export const ExerciseCard = ({ exercise, onClick, isCompleted, onToggle }) => {
  return (
    <div
      onClick={() => onClick(exercise)}
      className={`border rounded-xl p-5 transition-all group relative overflow-hidden cursor-pointer
          ${isCompleted
          ? 'bg-zinc-900/30 border-green-900/30 hover:bg-zinc-900/50 hover:border-green-800/50'
          : 'bg-zinc-800/50 border-zinc-700/50 hover:border-rust-500/50 hover:bg-zinc-800'
        }`}
    >
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Code size={48} />
      </div>

      <div className="flex justify-between items-start mb-3 relative z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            className={`transition-colors ${isCompleted ? 'text-green-500' : 'text-zinc-600 hover:text-zinc-400'}`}
            title={isCompleted ? "Mark as incomplete" : "Mark as complete"}
          >
            {isCompleted ? <CheckCircle size={22} className="fill-green-900/20" /> : <Circle size={22} />}
          </button>
          <h3 className={`text-lg font-semibold font-mono flex items-center gap-2 ${isCompleted ? 'text-zinc-400 line-through decoration-zinc-600' : 'text-zinc-100'}`}>
            {!isCompleted && <span className="text-rust-500">fn</span>} {exercise.title}
          </h3>
        </div>
        <Badge variant={exercise.difficulty}>
          {exercise.difficulty}
        </Badge>
      </div>

      <p className={`text-sm mb-4 leading-relaxed line-clamp-2 ${isCompleted ? 'text-zinc-500' : 'text-zinc-400'}`}>
        {exercise.description}
      </p>

      <div className="flex items-center justify-end gap-1 text-xs text-zinc-500 group-hover:text-rust-400 transition-colors">
        <span>View Problem</span>
        <ArrowRight size={12} />
      </div>
    </div>
  );
};