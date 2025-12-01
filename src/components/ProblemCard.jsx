import { useState } from 'react';
import { ExternalLink, Brain, Clock, Play } from 'lucide-react';

const getDifficultyColor = (difficulty) => {
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
};

export default function ProblemCard({ problem, userData }) {
	const [showButtons, setShowButtons] = useState(false);

	const handleStartProblem = () => {
		window.open(problem.link, '_blank');
		setShowButtons(true);
	};

	const isDue = userData && userData.nextReview <= Date.now();

	let buttonSection;
	if (showButtons) {
		buttonSection = (
			<div className='flex gap-2 mt-4 pt-4 border-t border-gray-700'>
				<button className='flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 py-2 rounded text-sm transition-colors'>
					Again
					<span className='block text-xs opacity-70'>1d</span>
				</button>
				<button className='flex-1 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 py-2 rounded text-sm transition-colors'>
					Hard
					<span className='block text-xs opacity-70'>3d</span>
				</button>
				<button className='flex-1 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 py-2 rounded text-sm transition-colors'>
					Good
					<span className='block text-xs opacity-70'>7d</span>
				</button>
				<button className='flex-1 bg-green-500/10 hover:bg-green-500/20 text-green-400 py-2 rounded text-sm transition-colors'>
					Easy
					<span className='block text-xs opacity-70'>14d</span>
				</button>
			</div>
		);
	} else {
		buttonSection = (
			<div className='mt-4 pt-3 border-t border-gray-700 flex justify-end'>
				<button
					onClick={handleStartProblem}
					className='flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md font-medium transition-colors shadow-lg shadow-blue-900/20'
				>
					<Play size={14} fill='currentColor' />
					Open Problem
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
				<span
					className={`px-2 py-1 rounded text-xs font-medium border ${getDifficultyColor(
						problem.difficulty
					)}`}
				>
					{problem.difficulty}
				</span>
			</div>

			{buttonSection}
		</div>
	);
}
