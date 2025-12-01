import { db } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';

export async function saveReviewDate(problemId, reviewDate) {
    const today = new Date();
	const dateString = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
    const docData = {
        problemId,
        reviewDate,
        timestamp: dateString
    }

    const reviewRef = doc(db, 'reviews', problemId);
	await setDoc(reviewRef, docData);
}
