import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyBdGgqYIcqpnlLc3_88qzsuInh0IZZGX-8',
	authDomain: 'algo-recall.firebaseapp.com',
	projectId: 'algo-recall',
	storageBucket: 'algo-recall.firebasestorage.app',
	messagingSenderId: '501910309076',
	appId: '1:501910309076:web:c23e17ec5410ac0f191341',
	measurementId: 'G-W9P6J31PB7',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
