import { useState, useEffect } from 'react';
import { ExternalLink, Play, Check } from 'lucide-react';
import {
	saveReviewDate,
	getReviewDate,
	calculateDaysUntilReview,
	markProblemComplete,
} from '../services/firebaseService';

function getDifficultyColor(difficulty) {
	switch (difficulty.toLowerCase()) {
		case 'easy':
			return 'text-green-500 bg-green-500/10 border-green-500/20';
		case 'medium':
			return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
		case 'hard':
			return 'text-red-500 bg-red-500/10 border-red-500/20';
		default:
			return 'text-gray-500';
	}
}

export default function ProblemCard({ problem, user }) {
	const [daysUntilReview, setDaysUntilReview] = useState(null);
	const [completed, setCompleted] = useState(false);

	const handleReviewDate = async (date) => {
		setShowButtons(false);
		setCompleted(false);
		try {
			await saveReviewDate(problem.id, date);
			const days = calculateDaysUntilReview(Date.now(), date);
			setDaysUntilReview(days);

			console.log('SUCCESS: Saved');
		} catch (error) {
			console.error('ERROR: ', error);
		}
	};

	const handleMarkComplete = async () => {
		try {
			await markProblemComplete(problem.id);
			setCompleted(true);
			setDaysUntilReview(null);
			setShowButtons(false);
			console.log('SUCCESS: Marked complete');
		} catch (error) {
			console.error('ERROR: ', error);
		}
	};

	useEffect(() => {
		async function loadReviewData() {
			if (!user) {
				setDaysUntilReview(null);
				setCompleted(false);
				return;
			}
			const data = await getReviewDate(problem.id);
			if (data) {
				if (data.completed) {
					setCompleted(true);
					setDaysUntilReview(null);
				} else {
					setCompleted(false);
					const days = calculateDaysUntilReview(data.savedOn, data.reviewDate);
					setDaysUntilReview(days);
				}
			} else {
				setCompleted(false);
				setDaysUntilReview(null);
			}
		}
		loadReviewData();
	}, [user, problem.id]);

	const [showButtons, setShowButtons] = useState(false);
	const handleStartProblem = () => {
		window.open(problem.link, '_blank');
		setShowButtons(true);
	};

	let buttonSection;
	if (showButtons) {
		buttonSection = (
			<div className='flex gap-2 mt-4 pt-4 border-t border-gray-700'>
				<button
					onClick={() => handleReviewDate('Now')}
					className='flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 py-2 rounded text-sm transition-colors cursor-pointer'
				>
					Again
					<span className='block text-xs opacity-70'>1d</span>
				</button>
				<button
					onClick={() => handleReviewDate('3 Days')}
					className='flex-1 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 py-2 rounded text-sm transition-colors cursor-pointer'
				>
					Hard
					<span className='block text-xs opacity-70'>3d</span>
				</button>
				<button
					onClick={() => handleReviewDate('7 Days')}
					className='flex-1 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 py-2 rounded text-sm transition-colors cursor-pointer'
				>
					Good
					<span className='block text-xs opacity-70'>7d</span>
				</button>
				<button
					onClick={() => handleReviewDate('14 Days')}
					className='flex-1 bg-green-500/10 hover:bg-green-500/20 text-green-400 py-2 rounded text-sm transition-colors cursor-pointer'
				>
					Easy
					<span className='block text-xs opacity-70'>14d</span>
				</button>
			</div>
		);
	} else {
		buttonSection = (
			<div className='mt-4 pt-3 border-t border-gray-700 flex justify-end gap-2'>
				<button
					onClick={handleStartProblem}
					className='flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md font-medium transition-colors shadow-lg shadow-blue-900/20 cursor-pointer'
				>
					<Play size={14} fill='currentColor' />
					Open Problem
				</button>
				<button
					onClick={handleMarkComplete}
					className='flex items-center gap-2 text-sm bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md font-medium transition-colors shadow-lg shadow-blue-900/20 cursor-pointer'
				>
					<Check size={14} />
					Mark Complete
				</button>
			</div>
		);
	}

	return (
		<div className='bg-gray-800 rounded-lg p-4 border border-gray-700 shadow-sm hover:border-gray-600 transition-colors'>
			<div className='flex justify-between items-start mb-2'>
				<div>
					<span className='text-xs text-gray-400 uppercase tracking-wider font-semibold'>
						{problem.category}
					</span>
					<h3 className='text-lg font-medium text-white flex items-center gap-2'>
						<a
							href={problem.link}
							target='_blank'
							rel='noreferrer'
							className='hover:underline flex items-center gap-1'
						>
							{problem.title}
							<ExternalLink size={14} className='text-gray-500' />
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
							<span className='text-xs uppercase tracking-wider font-semibold text-green-400'>
								Completed ✓
							</span>
						</div>
					) : (
						daysUntilReview !== null && (
							<div className='mt-2'>
								<span
									className={`text-xs uppercase tracking-wider font-semibold ${
										daysUntilReview <= 0 ? 'text-red-400' : 'text-gray-400'
									}`}
								>
									Due: {daysUntilReview <= 0 ? 'Now' : `${daysUntilReview}d`}
								</span>
							</div>
						)
					)}
				</div>
			</div>
			{buttonSection}
		</div>
	);
}
