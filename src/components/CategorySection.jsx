import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import ProblemCard from './ProblemCard';

export default function CategorySection({ category, user }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className='bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 mb-4 transition-colors'>

            <div 
                className="bg-gray-50 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600 flex justify-between items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors select-none"
                onClick={() => setIsCollapsed(!isCollapsed)}
            >
                <h3 className="font-semibold text-gray-900 dark:text-white">{category.category}</h3>
                <span className="text-gray-600 dark:text-gray-300">
                    {isCollapsed ? <ChevronRight size={24} /> : <ChevronDown size={24} />}
                </span>
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