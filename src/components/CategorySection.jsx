import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import ProblemCard from './ProblemCard';

export default function CategorySection({ category, user }) {
	const [isCollapsed, setIsCollapsed] = useState(false);

	return (
		<div className='p-4 rounded-xl mb-8 border-2 border-gray-700'>
			<h2 
				className='text-2xl font-semibold mb-4 text-blue-400 flex items-center gap-2 cursor-pointer hover:text-blue-300 transition-colors select-none'
				onClick={() => setIsCollapsed(!isCollapsed)}
			>
				{isCollapsed ? <ChevronRight size={24} /> : <ChevronDown size={24} />}
				{category.category}
			</h2>
			{!isCollapsed && (
				<div className='space-y-2'>
					{category.problems.map((problem) => (
						<ProblemCard
							key={problem.id}
							problem={{ ...problem, category: category.category }}
							user={user}
						/>
					))}
				</div>
			)}
		</div>
	);
}
