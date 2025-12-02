import { db } from '../config/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export async function saveReviewDate(problemId, reviewDate) {
	const docData = {
		problemId,
		reviewDate,
		savedOn: Date.now()
	};

	const reviewRef = doc(db, 'problems', problemId);
	await setDoc(reviewRef, docData);
}

export async function getReviewDate(problemId) {
	const reviewRef = doc(db, 'problems', problemId);
	const docSnap = await getDoc(reviewRef);

	if (docSnap.exists()) {
		return docSnap.data();
	}
	return null;
}

/**
 * Calculate days until next review based on saved timestamp and review interval
 * @param {number} savedOn - Timestamp in milliseconds
 * @param {string} reviewInterval - Review interval like "Now", "3 Days", "7 Days", "14 Days"
 * @returns {number} - Days until review (negative if overdue)
 */
export function calculateDaysUntilReview(savedOn, reviewInterval) {
	let daysToAdd = 0;
	if (reviewInterval !== 'Now') {
		daysToAdd = parseInt(reviewInterval);
	}

	// Convert timestamps to dates at midnight
	const savedDate = new Date(savedOn);
	savedDate.setHours(0, 0, 0, 0);

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	// Calculate review date
	const reviewDate = new Date(savedDate);
	reviewDate.setDate(reviewDate.getDate() + daysToAdd);

	// Calculate days difference
	const diffTime = reviewDate - today;
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	return diffDays;
}
