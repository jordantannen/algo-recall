import { auth } from '../config/firebase';
import {
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth';

const googleProvider = new GoogleAuthProvider();

/**
 * Sign in with Google popup
 */
export async function loginWithGoogle() {
	return await signInWithPopup(auth, googleProvider);
}

/**
 * Sign out current user
 */
export async function logout() {
	return await signOut(auth);
}

/**
 * Subscribe to auth state changes
 * Returns an unsubscribe function
 */
export function onAuthChange(callback) {
	return onAuthStateChanged(auth, callback);
}
