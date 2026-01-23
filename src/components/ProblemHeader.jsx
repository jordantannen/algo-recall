import { ExternalLink } from 'lucide-react';

function getDifficultyColor(difficulty) {
	switch (difficulty.toLowerCase()) {
		case 'easy':
			return 'text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800';
		case 'medium':
			return 'text-yellow-700 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800';
		case 'hard':
			return 'text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800';
		default:
			return 'text-gray-500 dark:text-gray-400';
	}
}

export default function ProblemHeader({
	problem,
	completed,
	daysUntilReview,
}) {
	return (
		<div className='flex justify-between items-start'>
			<div>
				<span className='text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold'>
					{problem.category}
				</span>
				<h3 className='text-lg font-medium text-gray-900 dark:text-white flex items-center gap-2'>
					<a
						href={problem.link}
						target='_blank'
						rel='noreferrer'
						className='hover:underline flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400'
					>
						{problem.title}
						<ExternalLink size={14} className='text-gray-400 dark:text-gray-500' />
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
				<div className='mt-2 h-[20px]'>
					{completed ? (
						<span className='text-xs uppercase tracking-wider font-semibold text-green-600 dark:text-green-400'>
							Completed ✓
						</span>
					) : (
						daysUntilReview !== null && (
							<span
								className={`text-xs uppercase tracking-wider font-semibold ${
									daysUntilReview <= 0
										? 'text-red-600 dark:text-red-400'
										: 'text-gray-500 dark:text-gray-400'
								}`}
							>
								Due:{' '}
								{daysUntilReview <= 0
									? 'Now'
									: `${daysUntilReview}d`}
							</span>
						)
					)}
				</div>
			</div>
		</div>
	);
}
