import { useState, useEffect } from 'react';
import { NEETCODE_150 } from './data/neetcode';
import CategorySection from './components/CategorySection';
import { onAuthChange, logout, loginWithGoogle } from './services/authService';

export default function App() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthChange((currentUser) => {
			setUser(currentUser);
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	const handleGoogleLogin = async () => {
		try {
			await loginWithGoogle();
		} catch (error) {
			console.error('Login error:', error);
		}
	};

	if (loading) {
		return (
			<div className='min-h-screen bg-gray-900 flex items-center justify-center'>
				<p className='text-white text-lg'>Loading...</p>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-gray-900 text-white p-8'>
			<div className='max-w-5xl mx-auto'>
				<div className='flex justify-between items-center mb-4'>
					<h1 className='text-3xl font-bold'>AlgoRecall</h1>
					{user ? (
						<div className='flex items-center gap-4'>
							<span className='text-gray-400'>{user.email}</span>
							<button
								onClick={logout}
								className='bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors cursor-pointer'
							>
								Logout
							</button>
						</div>
					) : (
						<button
							onClick={handleGoogleLogin}
							className='bg-white hover:bg-gray-100 text-gray-900 cursor-pointer font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors'
						>
							<svg className='w-5 h-5' viewBox='0 0 24 24'>
								<path
									fill='currentColor'
									d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
								/>
								<path
									fill='currentColor'
									d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
								/>
								<path
									fill='currentColor'
									d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
								/>
								<path
									fill='currentColor'
									d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
								/>
							</svg>
							Sign in with Google
						</button>
					)}
				</div>
				{NEETCODE_150.map((category) => (
					<CategorySection
						key={category.category}
						category={category}
						user={user}
					/>
				))}
			</div>
		</div>
	);
}
