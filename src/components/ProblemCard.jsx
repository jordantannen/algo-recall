import { useState, useEffect } from 'react';
import { saveProblem, completeProblem, getProblem } from '../services/storageService';
import { calculateReviewDate, calculateDaysUntilReview } from '../utils/dates';
import ProblemHeader from './ProblemHeader';
import ProblemNotes from './ProblemNotes';
import ProblemActions from './ProblemActions';

export default function ProblemCard({ problem, user, onProblemAttempt }) {
	const [daysUntilReview, setDaysUntilReview] = useState(null);
	const [completed, setCompleted] = useState(false);
	const [showButtons, setShowButtons] = useState(false);
	const [notes, setNotes] = useState('');

	const handleReviewDate = async (daysInterval, hasNewDueDate) => {
		setShowButtons(false);
		setCompleted(false);

		if (onProblemAttempt && hasNewDueDate) {
			onProblemAttempt();
		}

		try {
			const reviewDate = calculateReviewDate(daysInterval);
			setDaysUntilReview(daysInterval);
			await saveProblem(problem, reviewDate);
		} catch (error) {
			console.error('Failed to save review date:', error);
		}
	};

	const handleMarkComplete = async () => {
		try {
			await completeProblem(problem.id);
			setCompleted(true);
			setDaysUntilReview(null);
			setShowButtons(false);

			if (onProblemAttempt) {
				onProblemAttempt();
			}
		} catch (error) {
			console.error('Failed to mark complete:', error);
		}
	};

	const handleStartProblem = () => {
		// window.open(problem.link, '_blank');
		setShowButtons(true);
	};

	useEffect(() => {
		async function loadReviewData() {
			const data = await getProblem(problem.id);
			if (data) {
				if (data.completed) {
					setCompleted(true);
					setDaysUntilReview(null);
				} else {
					setCompleted(false);
					const days = calculateDaysUntilReview(data.nextReviewDate);
					setDaysUntilReview(days);
				}
				// Load notes if they exist
				if (data.notes) {
					setNotes(data.notes);
				}
			} else {
				setCompleted(false);
				setDaysUntilReview(null);
				setNotes('');
			}
		}

		loadReviewData();
	}, [user, problem.id]);

	return (
		<div className='bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:border-gray-300 transition-colors'>
			<ProblemHeader
				problem={problem}
				completed={completed}
				daysUntilReview={daysUntilReview}
			/>

			<ProblemNotes
				key={problem.id}
				problemId={problem.id}
				initialNotes={notes}
				user={user}
			/>

			<ProblemActions
				showButtons={showButtons}
				onStartProblem={handleStartProblem}
				onMarkComplete={handleMarkComplete}
				onReviewDate={handleReviewDate}
			/>
		</div>
	);
}
