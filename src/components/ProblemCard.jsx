import { useState, useEffect } from 'react';
import { ExternalLink, Play, Check } from 'lucide-react';
import {
    saveProblem,
    completeProblem,
    getProblem,
} from '../services/storageService';
import { calculateReviewDate, calculateDaysUntilReview } from '../utils/dates';

// TODO: Remove magic numbers

function getDifficultyColor(difficulty) {
    switch (difficulty.toLowerCase()) {
        case 'easy':
            return 'text-green-700 bg-green-50 border-green-200';
        case 'medium':
            return 'text-yellow-700 bg-yellow-50 border-yellow-200';
        case 'hard':
            return 'text-red-700 bg-red-50 border-red-200';
        default:
            return 'text-gray-500';
    }
}

export default function ProblemCard({ problem, user, onProblemAttempt }) {
    const [daysUntilReview, setDaysUntilReview] = useState(null);
    const [completed, setCompleted] = useState(false);
    const [showButtons, setShowButtons] = useState(false);

    const handleReviewDate = async (daysInterval, hasNewDueDate) => {
        setShowButtons(false);
        setCompleted(false);

        // Notify parent component (if callback provided)
        if (onProblemAttempt && hasNewDueDate) {
            onProblemAttempt();
        }

        try {
            const reviewDate = calculateReviewDate(daysInterval);
            setDaysUntilReview(daysInterval);
            await saveProblem(problem, reviewDate);
        } catch (error) {
            console.error('Failed to save review date:', error);
        }
    };

    const handleMarkComplete = async () => {
        try {
            await completeProblem(problem.id);
            setCompleted(true);
            setDaysUntilReview(null);
            setShowButtons(false);
            
            // Notify parent component (if callback provided)
            if (onProblemAttempt) {
                onProblemAttempt();
            }
        } catch (error) {
            console.error('Failed to mark complete:', error);
        }
    };

    const handleStartProblem = () => {
        // window.open(problem.link, '_blank');
        setShowButtons(true);
    };

    useEffect(() => {
        async function loadReviewData() {
            if (!user) {
                setDaysUntilReview(null);
                setCompleted(false);
                return;
            }

            const data = await getProblem(problem.id);
            if (data) {
                if (data.completed) {
                    setCompleted(true);
                    setDaysUntilReview(null);
                } else {
                    setCompleted(false);
                    const days = calculateDaysUntilReview(data.nextReviewDate);
                    setDaysUntilReview(days);
                }
            } else {
                setCompleted(false);
                setDaysUntilReview(null);
            }
        }

        loadReviewData();
    }, [user, problem.id]);

    return (
        <div className='bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:border-gray-300 transition-colors'>
            <div className='flex justify-between items-start mb-2'>
                <div>
                    <span className='text-xs text-gray-500 uppercase tracking-wider font-semibold'>
                        {problem.category}
                    </span>
                    <h3 className='text-lg font-medium text-gray-900 flex items-center gap-2'>
                        <a
                            href={problem.link}
                            target='_blank'
                            rel='noreferrer'
                            className='hover:underline flex items-center gap-1 hover:text-blue-600'
                        >
                            {problem.title}
                            <ExternalLink size={14} className='text-gray-400' />
                        </a>
                    </h3>
                </div>
                <div className='text-right'>
                    <span
                        className={`px-2 py-1 rounded text-xs font-medium border ${getDifficultyColor(
                            problem.difficulty
                        )}`}
                    >
                        {problem.difficulty}
                    </span>
                    {completed ? (
                        <div className='mt-2'>
                            <span className='text-xs uppercase tracking-wider font-semibold text-green-600'>
                                Completed ✓
                            </span>
                        </div>
                    ) : (
                        daysUntilReview !== null && (
                            <div className='mt-2'>
                                <span
                                    className={`text-xs uppercase tracking-wider font-semibold ${
                                        daysUntilReview <= 0
                                            ? 'text-red-600'
                                            : 'text-gray-500'
                                    }`}
                                >
                                    Due:{' '}
                                    {daysUntilReview <= 0
                                        ? 'Now'
                                        : `${daysUntilReview}d`}
                                </span>
                            </div>
                        )
                    )}
                </div>
            </div>
            
            {showButtons ? (
                <div key="review-options" className='flex gap-2 mt-4 pt-4 border-t border-gray-100'>
                    <button
                        onClick={() => handleReviewDate(0)}
                        className='flex-1 bg-red-50 hover:bg-red-100 text-red-700 py-2 rounded text-sm transition-colors cursor-pointer'
                    >
                        Again
                        <span className='block text-xs opacity-70'>1d</span>
                    </button>
                    <button
                        onClick={() => handleReviewDate(3, true)}
                        className='flex-1 bg-orange-50 hover:bg-orange-100 text-orange-700 py-2 rounded text-sm transition-colors cursor-pointer'
                    >
                        Hard
                        <span className='block text-xs opacity-70'>3d</span>
                    </button>
                    <button
                        onClick={() => handleReviewDate(7, true)}
                        className='flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 rounded text-sm transition-colors cursor-pointer'
                    >
                        Good
                        <span className='block text-xs opacity-70'>7d</span>
                    </button>
                    <button
                        onClick={() => handleReviewDate(14, true)}
                        className='flex-1 bg-green-50 hover:bg-green-100 text-green-700 py-2 rounded text-sm transition-colors cursor-pointer'
                    >
                        Easy
                        <span className='block text-xs opacity-70'>14d</span>
                    </button>
                </div>
            ) : (
                <div key="action-buttons" className='mt-4 pt-3 border-t border-gray-100 flex justify-end gap-2'>
                    <button
                        onClick={handleStartProblem}
                        className='flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors shadow-sm cursor-pointer'
                    >
                        <Play size={14} fill='currentColor' />
                        Open Problem
                    </button>
                    <button
                        onClick={handleMarkComplete}
                        className='flex items-center gap-2 text-sm bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors shadow-sm cursor-pointer'
                    >
                        <Check size={14} />
                        Mark Complete
                    </button>
                </div>
            )}
        </div>
    );
}