import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import ProblemCard from './ProblemCard';

export default function CategorySection({ category, user }) {
	const [isCollapsed, setIsCollapsed] = useState(false);

	return (
		<div className='bg-gray-800/30 rounded-xl overflow-hidden border border-gray-700/50 mb-4'>

			<div 
				className="bg-gray-800/80 px-4 py-3 border-b border-gray-700 flex justify-between items-center cursor-pointer hover:bg-gray-800/90 transition-colors select-none"
				onClick={() => setIsCollapsed(!isCollapsed)}
			>
				<h3 className="font-semibold text-white">{category.category}</h3>
				{isCollapsed ? <ChevronRight size={24} /> : <ChevronDown size={24} />}
			</div>

			{!isCollapsed && (
				<div className='space-y-2 p-4'>
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
