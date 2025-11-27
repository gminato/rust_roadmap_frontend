import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { MarkdownRenderer } from '../atoms/MarkdownRenderer.jsx';
import { Badge } from '../atoms/Badge.jsx';

// Cache for question data to prevent duplicate API calls
const questionCache = {};
const loadingCache = {};

const ExerciseModal = ({ exercise, onClose }) => {
    const [questionData, setQuestionData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!exercise) return;

        const cacheKey = `${exercise.id}-${exercise.slug || exercise.id}`;

        // If already cached, use cached data
        if (questionCache[cacheKey]) {
            setQuestionData(questionCache[cacheKey]);
            setIsLoading(false);
            return;
        }

        // If already loading, skip
        if (loadingCache[cacheKey]) {
            return;
        }

        const fetchQuestionData = async () => {
            loadingCache[cacheKey] = true;
            setIsLoading(true);
            try {
                const response = await fetch(
                    `https://us-central1-rustpractice-84f71.cloudfunctions.net/getQuestionById?id=${exercise.id}&slug=${exercise.slug || exercise.id}`
                );
                if (response.ok) {
                    const data = await response.json();
                    questionCache[cacheKey] = data;
                    setQuestionData(data);
                } else {
                    console.error('Failed to fetch question data');
                    setQuestionData(null);
                }
            } catch (error) {
                console.error('Error fetching question data:', error);
                setQuestionData(null);
            } finally {
                setIsLoading(false);
                delete loadingCache[cacheKey];
            }
        };

        fetchQuestionData();
    }, [exercise]);

    if (!exercise) return null;

    const displayData = questionData || exercise;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-zinc-900 rounded-2xl border border-zinc-700 w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-zinc-800">
                    <div className="flex items-center gap-4">
                        <h2 className="text-2xl font-bold text-zinc-100 font-mono">
                            <span className="text-rust-500">fn</span> {displayData.title}
                        </h2>
                        <Badge variant={displayData.difficulty}>
                            {displayData.difficulty}
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
                    {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <p className="text-zinc-500">Loading question details...</p>
                        </div>
                    ) : (
                        <div className="space-y-6">

                            {/* Description - only show basic description if no detailed data available */}
                            {!questionData && (
                                <div>
                                    <h3 className="text-sm font-mono text-zinc-400 mb-3 uppercase tracking-widest">Description</h3>
                                    <p className="text-zinc-300 leading-relaxed">{displayData.description}</p>
                                </div>
                            )}

                            {/* Content Markdown - show detailed description and content from API */}
                            {questionData && (
                                <>
                                    {questionData.detailed_description && (
                                        <div>
                                            <h3 className="text-sm font-mono text-zinc-400 mb-3 uppercase tracking-widest">Description</h3>
                                            <p className="text-zinc-300 leading-relaxed">{questionData.detailed_description}</p>
                                        </div>
                                    )}
                                </>
                            )}

                            {/* Tags */}
                            {displayData.tags && displayData.tags.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-mono text-zinc-400 mb-3 uppercase tracking-widest">Topics</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {displayData.tags.map((tag, idx) => (
                                            <Badge key={idx} variant="topic">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Hint */}
                            {displayData.hint && (
                                <div>
                                    <h3 className="text-sm font-mono text-zinc-400 mb-3 uppercase tracking-widest">Hint</h3>
                                    <p className="text-zinc-400">{displayData.hint}</p>
                                </div>
                            )}

                            {/* Stats */}
                            {questionData && (
                                <div className="flex gap-6 text-sm text-zinc-500">
                                    <div>
                                        <span className="font-mono">People Solved:</span> <span className="text-zinc-300">{questionData.people_solved || 0}</span>
                                    </div>
                                    <div>
                                        <span className="font-mono">Likes:</span> <span className="text-zinc-300">{questionData.likes || 0}</span>
                                    </div>
                                </div>
                            )}

                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default ExerciseModal;
