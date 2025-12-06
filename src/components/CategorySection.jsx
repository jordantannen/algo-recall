import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import ProblemCard from './ProblemCard';

export default function CategorySection({ category, user }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className='bg-white rounded-xl overflow-hidden border border-gray-200 mb-4'>

            <div 
                className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors select-none"
                onClick={() => setIsCollapsed(!isCollapsed)}
            >
                <h3 className="font-semibold text-gray-900">{category.category}</h3>
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