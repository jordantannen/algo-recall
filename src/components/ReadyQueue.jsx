import { CircleCheckBig } from 'lucide-react';
import { PROBLEM_MAP } from '../data/neetcode';
import ProblemCard from './ProblemCard';
import { getDueProblems } from '../services/storageService';
import { useEffect, useState } from 'react';

export default function ReadyQueue({ user }) {
    const [dueProblems, setDueProblems] = useState([]);

    useEffect(() => {
        if (!user) return;

        async function load() {
            const problems = await getDueProblems();
            setDueProblems(problems);
            console.log(problems);
        }

        load();
    }, [user])

    // Remove a problem from the queue
    const updateDueProblemsList = (problemId) => {
        setDueProblems(prev => prev.filter(p => p.problemId !== problemId));
    };

    // If no due problems, show success message
    if (dueProblems.length === 0) {
        return (
            <div className='p-4 rounded-xl mb-8 border-2 border-dotted flex flex-col items-center justify-center border-gray-700 min-h-40'>
                <CircleCheckBig size={50} className='text-green-500/90 mb-2' />
                <h1>All caught up - go touch grass!</h1>
            </div>
        );
    }

    // Map problem IDs to full problem data and render cards
    const problemCards = dueProblems.map(dueProblem => {
        const fullProblem = PROBLEM_MAP.get(dueProblem.problemId);
        if (!fullProblem) {
            console.log('not found:', dueProblem.problemId)
            return null
        };
        
        return (
            <ProblemCard
                key={dueProblem.problemId}
                problem={fullProblem}
                user={user}
                onProblemAttempt={() => updateDueProblemsList(dueProblem.problemId)}
            />
        );
    }).filter(Boolean); // Remove any null entries

    return (
        <div>
            <h2 className='text-xl font-bold text-gray-900 dark:text-white mb-4'>
                Problems Due Today 
                <span className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-800 px-2 py-0.5 ml-2 rounded-md">{dueProblems.length}</span>
            </h2>
            <div className='p-4 rounded-xl mb-8 border-2 border-dotted border-gray-700'>
                <div className='space-y-2'>
                    {problemCards}
                </div>
            </div>
        </div>
        
    );
}