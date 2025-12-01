import { db } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';

export async function saveReviewDate(problemId, reviewDate) {
	const reviewRef = doc(db, 'reviews', problemId);

	await setDoc(reviewRef, {
		reviewDate,
		timestamp: Date.now(),
		problemId,
	});
}
