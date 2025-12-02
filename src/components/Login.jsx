import { useState } from 'react';
import { loginWithGoogle } from '../services/authService';

export default function Login() {
	const [error, setError] = useState('');

	const handleGoogleLogin = async () => {
		try {
			await loginWithGoogle();
		} catch (error) {
			console.error('Login error:', error);
			setError('Failed to sign in. Please try again.');
		}
	};

	return (
		<div className='min-h-screen bg-gray-900 flex items-center justify-center p-4'>
			<div className='bg-gray-800 rounded-lg p-8 max-w-md w-full border border-gray-700'>
				<h1 className='text-3xl font-bold text-white mb-2 text-center'>
					AlgoRecall
				</h1>
				<p className='text-gray-400 text-center mb-8'>
					Track your LeetCode spaced repetition learning
				</p>

				<button
					onClick={handleGoogleLogin}
					className='w-full bg-white hover:bg-gray-100 text-gray-900 font-medium py-3 px-4 rounded-lg cursor-pointer flex items-center justify-center gap-3 transition-colors'
				>
					Sign in with Google
				</button>

				{error && (
					<p className='mt-4 text-red-400 text-sm text-center'>
						{error}
					</p>
				)}
			</div>
		</div>
	);
}
