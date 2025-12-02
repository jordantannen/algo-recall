import ProblemCard from './ProblemCard';

export default function CategorySection({ category, user }) {
	return (
		<div className='p-4 rounded-xl mb-8 border-2 border-gray-700'>
			<h2 className='text-2xl font-semibold mb-4 text-blue-400'>
				{category.category}
			</h2>
			<div className='space-y-2'>
				{category.problems.map((problem) => (
					<ProblemCard
						key={problem.id}
						problem={{ ...problem, category: category.category }}
						user={user}
					/>
				))}
			</div>
		</div>
	);
}
