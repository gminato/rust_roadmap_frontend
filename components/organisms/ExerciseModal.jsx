import React from 'react';
import { X } from 'lucide-react';
import { MarkdownRenderer } from '../atoms/MarkdownRenderer.jsx';
import { Badge } from '../atoms/Badge.jsx';

const ExerciseModal = ({ exercise, onClose }) => {
    if (!exercise) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-zinc-900 rounded-2xl border border-zinc-700 w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-zinc-800">
                    <div className="flex items-center gap-4">
                        <h2 className="text-2xl font-bold text-zinc-100 font-mono">
                            <span className="text-rust-500">fn</span> {exercise.title}
                        </h2>
                        <Badge variant={exercise.difficulty}>
                            {exercise.difficulty}
                        </Badge>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-zinc-400 hover:text-zinc-100 transition-colors p-2 hover:bg-zinc-800 rounded-lg"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-6">

                        {/* Description */}
                        <div>
                            <h3 className="text-sm font-mono text-zinc-400 mb-3 uppercase tracking-widest">Description</h3>
                            <p className="text-zinc-300 leading-relaxed">{exercise.description}</p>
                        </div>

                        {/* Problem Statement */}
                        {exercise.problem && (
                            <div>
                                <h3 className="text-sm font-mono text-zinc-400 mb-3 uppercase tracking-widest">Problem</h3>
                                <div className="prose prose-invert max-w-none prose-p:text-zinc-300 prose-code:text-rust-400 prose-pre:bg-black prose-pre:border prose-pre:border-zinc-800">
                                    <MarkdownRenderer content={exercise.problem} />
                                </div>
                            </div>
                        )}

                        {/* Hints */}
                        {exercise.hints && exercise.hints.length > 0 && (
                            <div>
                                <h3 className="text-sm font-mono text-zinc-400 mb-3 uppercase tracking-widest">Hints</h3>
                                <ul className="space-y-2">
                                    {exercise.hints.map((hint, idx) => (
                                        <li key={idx} className="text-zinc-400 flex gap-2">
                                            <span className="text-rust-500 font-mono">•</span>
                                            <span>{hint}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Solution */}
                        {exercise.solution && (
                            <div>
                                <h3 className="text-sm font-mono text-zinc-400 mb-3 uppercase tracking-widest">Solution</h3>
                                <div className="prose prose-invert max-w-none prose-p:text-zinc-300 prose-code:text-rust-400 prose-pre:bg-black prose-pre:border prose-pre:border-zinc-800">
                                    <MarkdownRenderer content={exercise.solution} />
                                </div>
                            </div>
                        )}

                    </div>
                </div>

            </div>
        </div>
    );
};

export default ExerciseModal;
