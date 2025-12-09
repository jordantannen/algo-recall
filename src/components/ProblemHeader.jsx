import { ExternalLink } from 'lucide-react';

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

export default function ProblemHeader({
	problem,
	completed,
	daysUntilReview,
}) {
	return (
		<div className='flex justify-between items-start'>
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
				<div className='mt-2 h-[20px]'>
					{completed ? (
						<span className='text-xs uppercase tracking-wider font-semibold text-green-600'>
							Completed ✓
						</span>
					) : (
						daysUntilReview !== null && (
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
						)
					)}
				</div>
			</div>
		</div>
	);
}
