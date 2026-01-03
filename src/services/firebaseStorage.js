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
			
			// Get existing data to preserve notes
			const existingDoc = await getDoc(docRef);
			const existingNotes = existingDoc.exists() ? (existingDoc.data().notes || '') : '';
			
			const docData = {
				problemId: problem.id,
				problemTitle: problem.title,
				nextReviewDate,
				lastAttempted: Date.now(),
				completed: false,
				notes: existingNotes,
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
			
			// Get existing data to preserve notes
			const existingDoc = await getDoc(docRef);
			const existingNotes = existingDoc.exists() ? (existingDoc.data().notes || '') : '';
			
			const docData = {
				problemId,
				nextReviewDate: 'N/A',
				lastAttempted: Date.now(),
				completed: true,
				notes: existingNotes,
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
			return null;
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
				where('nextReviewDate', '<=', today.getTime())
			);

			const problemSnapshot = await getDocs(problemQuery);
			return problemSnapshot.docs.map(doc => doc.data());

		} catch (error) {
			console.error('Failed to get problems from Firebase:', error);
			throw new Error('getDueProblems Failed to get problems from Firebase');
		}
	}

	async saveNotes(problemId, notes) {
		const user = auth.currentUser;
		if (!user) {
			throw new Error('User is not logged in');
		}

		try {
			const docRef = doc(db, 'users', user.uid, 'problems', problemId);
			const docSnap = await getDoc(docRef);
			
			if (docSnap.exists()) {
				// Update existing document
				await setDoc(docRef, { notes }, { merge: true });
			} else {
				// Create new document with notes only
				await setDoc(docRef, {
					problemId,
					notes,
					lastAttempted: Date.now(),
				});
			}
		} catch (error) {
			console.error('Failed to save notes to Firebase:', error);
			throw new Error('Failed to save notes to Firebase');
		}
	}
}
