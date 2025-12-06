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
    }, [user]);

    const updateDueProblemsList = (problemId) => {
        setDueProblems((prev) => prev.filter((p) => p.problemId !== problemId));
    };

    const problemCards = dueProblems
        .map((dueProblem) => {
            const fullProblem = PROBLEM_MAP.get(dueProblem.problemId);
            if (!fullProblem) {
                console.log('not found:', dueProblem.problemId);
                return null;
            }

            return (
                <ProblemCard
                    key={dueProblem.problemId}
                    problem={fullProblem}
                    user={user}
                    onProblemAttempt={() =>
                        updateDueProblemsList(dueProblem.problemId)
                    }
                />
            );
        })
        .filter(Boolean);

    return (
        <div>
            <h2 className='text-xl font-bold text-gray-900 mb-4'>
                Problems Due Today
                <span className='inline-flex items-center text-sm text-gray-600 bg-gray-200 px-2 py-0.5 ml-2 rounded-md'>
                    {dueProblems.length}
                </span>
            </h2>
            <div className='p-4 rounded-xl mb-8 border-2 border-dotted border-gray-300'>
                {dueProblems.length === 0 ? (
                    <div className='flex flex-col items-center justify-center min-h-40 text-gray-500'>
                        <CircleCheckBig size={50} className='text-green-600 mb-2' />
                        <h1>All caught up - go touch grass!</h1>
                    </div>
                ) : (
                    <div className='space-y-2'>{problemCards}</div>
                )}
            </div>
        </div>
    );
}