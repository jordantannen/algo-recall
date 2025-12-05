import React from 'react';
import { Brain, LogOut, LogIn } from 'lucide-react';
import { logout, loginWithGoogle } from '../services/authService';

export default function NavBar({ user, currentView, setCurrentView }) {
	const handleGoogleLogin = async () => {
		try {
			await loginWithGoogle();
		} catch (error) {
			console.error('Login error:', error);
		}
	};

	return (
		<nav className='bg-gray-800 border-b border-gray-700 sticky top-0 z-50'>
			<div className='max-w-5xl mx-auto h-16 flex items-center justify-between'>
				<div className='flex items-center gap-6'>
					<span className='text-xl font-bold text-white'>
						Algo Recall
					</span>
					<div className='flex gap-2'>
						<button
							onClick={() => setCurrentView('dashboard')}
							className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
								currentView === 'dashboard'
									? 'bg-blue-600 text-white'
									: 'text-gray-300 hover:text-white hover:bg-gray-700'
							}`}
						>
							Dashboard
						</button>
						<button
							onClick={() => setCurrentView('problemList')}
							className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
								currentView === 'problemList'
									? 'bg-blue-600 text-white'
									: 'text-gray-300 hover:text-white hover:bg-gray-700'
							}`}
						>
							Problem List
						</button>
					</div>
				</div>

				<div className='flex items-center gap-3'>
					{user ? (
						<>
							<span className='text-white text-sm'>Sign Out</span>
							<button
								onClick={logout}
								className='p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-colors cursor-pointer'
							>
								<LogOut size={18} />
							</button>
						</>
					) : (
						<button
							onClick={handleGoogleLogin}
							className='flex items-center gap-2 text-sm text-gray-300 hover:text-white cursor-pointer'
						>
							<LogIn size={18} /> Sign In
						</button>
					)}
				</div>
			</div>
		</nav>
	);
}
