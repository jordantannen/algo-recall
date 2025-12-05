import { db, auth } from '../config/firebase';
import {
	doc,
	setDoc,
	getDoc,
	getDocs,
	query,
	collection,
	where,
} from 'firebase/firestore';
import { Storage } from './storage';

export class FirebaseStorage extends Storage {
	async saveProblem(problem, nextReviewDate) {
		const user = auth.currentUser;
		if (!user) {
			throw new Error('User is not logged in');
		}

		try {
			const docRef = doc(db, 'users', user.uid, 'problems', problem.id);
			const docData = {
				problemId: problem.id,
				problemTitle: problem.title,
				nextReviewDate,
				lastAttempted: Date.now(),
				completed: false,
			};

			await setDoc(docRef, docData);
		} catch (error) {
			console.error('Failed to save problem to Firebase:', error);
			throw new Error('Failed to save to Firebase');
		}
	}

	async completeProblem(problemId) {
		const user = auth.currentUser;
		if (!user) {
			throw new Error('User is not logged in');
		}

		try {
			const docRef = doc(db, 'users', user.uid, 'problems', problemId);
			const docData = {
				problemId,
				nextReviewDate: 'N/A',
				lastAttempted: Date.now(),
				completed: true,
			};

			await setDoc(docRef, docData);
		} catch (error) {
			console.error('Failed to get problem from Firebase:', error);
			throw new Error('Failed to get problem from Firebase');
		}
	}

	async getProblem(problemId) {
		const user = auth.currentUser;
		if (!user) {
			throw new Error('User is not logged in');
		}

		try {
			const docRef = doc(db, 'users', user.uid, 'problems', problemId);
			const docSnap = await getDoc(docRef);
			return docSnap.exists() ? docSnap.data() : null;
		} catch (error) {
			console.error('Failed to get problem from Firebase:', error);
			throw new Error('Failed to get problem from Firebase');
		}
	}

	async getDueProblems() {
		const user = auth.currentUser;
		if (!user) {
			return [];
		}

		try {
			const today = new Date();
			today.setHours(0, 0, 0, 0);

			const problemQuery = query(
				collection(db, 'users', user.uid, 'problems'),
				where('nextReviewDate', '>=', today.getTime())
			);

			const problemSnapshot = await getDocs(problemQuery);
			return problemSnapshot.docs.map(doc => doc.data());

		} catch (error) {
			console.error('Failed to get problems from Firebase:', error);
			throw new Error('getDueProblems Failed to get problems from Firebase');
		}
	}
}
