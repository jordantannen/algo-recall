import { Play, Check } from 'lucide-react';

export default function ProblemActions({
	showButtons,
	onStartProblem,
	onMarkComplete,
	onReviewDate,
}) {
	if (showButtons) {
		return (
			<div
				key='review-options'
				className='flex gap-2 mt-4 pt-4 border-t border-gray-100'
			>
				<button
					onClick={() => onReviewDate(0)}
					className='flex-1 bg-red-50 hover:bg-red-100 text-red-700 py-2 rounded text-sm transition-colors cursor-pointer'
				>
					Again
					<span className='block text-xs opacity-70'>1d</span>
				</button>
				<button
					onClick={() => onReviewDate(3, true)}
					className='flex-1 bg-orange-50 hover:bg-orange-100 text-orange-700 py-2 rounded text-sm transition-colors cursor-pointer'
				>
					Hard
					<span className='block text-xs opacity-70'>3d</span>
				</button>
				<button
					onClick={() => onReviewDate(7, true)}
					className='flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 rounded text-sm transition-colors cursor-pointer'
				>
					Good
					<span className='block text-xs opacity-70'>7d</span>
				</button>
				<button
					onClick={() => onReviewDate(14, true)}
					className='flex-1 bg-green-50 hover:bg-green-100 text-green-700 py-2 rounded text-sm transition-colors cursor-pointer'
				>
					Easy
					<span className='block text-xs opacity-70'>14d</span>
				</button>
			</div>
		);
	}

	return (
		<div
			key='action-buttons'
			className='mt-4 pt-3 border-t border-gray-100 flex justify-end gap-2'
		>
			<button
				onClick={onStartProblem}
				className='flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors shadow-sm cursor-pointer'
			>
				<Play size={14} fill='currentColor' />
				Open Problem
			</button>
			<button
				onClick={onMarkComplete}
				className='flex items-center gap-2 text-sm bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors shadow-sm cursor-pointer'
			>
				<Check size={14} />
				Mark Complete
			</button>
		</div>
	);
}
