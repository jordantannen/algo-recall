import { useState, useEffect, useRef } from 'react';
import { Notebook, NotebookPen } from 'lucide-react';
import { saveNotes } from '../services/storageService';

export default function ProblemNotes({ problemId, initialNotes = '', user }) {
	const [localNotes, setLocalNotes] = useState('');
	const [hasUserEdited, setHasUserEdited] = useState(false);
	const [isNotesExpanded, setIsNotesExpanded] = useState(false);
	const saveTimeoutRef = useRef(null);

	// Use initialNotes if user hasn't edited, otherwise use local state
	const notes = hasUserEdited ? localNotes : (initialNotes || '');

	const handleNotesChange = (e) => {
		const newNotes = e.target.value;
		setLocalNotes(newNotes);
		setHasUserEdited(true);

		// Clear existing timeout
		if (saveTimeoutRef.current) {
			clearTimeout(saveTimeoutRef.current);
		}

		// Set new timeout to save after 1 second of no typing
		const timeout = setTimeout(async () => {
			try {
				await saveNotes(problemId, newNotes);
			} catch (error) {
				console.error('Failed to save notes:', error);
			}
		}, 1000);

		saveTimeoutRef.current = timeout;
	};

	// Cleanup timeout on unmount
	useEffect(() => {
		return () => {
			if (saveTimeoutRef.current) {
				clearTimeout(saveTimeoutRef.current);
			}
		};
	}, []);

	return (
		<div>
			<button
				onClick={() => setIsNotesExpanded(!isNotesExpanded)}
				className='flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors'
			>
				{isNotesExpanded ? (
					<NotebookPen size={14} />
				) : (
					<Notebook size={14} />
				)}
				Notes
			</button>
			{isNotesExpanded && (
				<textarea
					value={notes}
					onChange={handleNotesChange}
					placeholder='Write down your notes. Remember to include Big-O time complexities.'
					className='w-full mt-2 p-2 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded-md text-sm resize-y min-h-20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
				/>
			)}
		</div>
	);
}
