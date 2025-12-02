import React from 'react';
import { Brain, LogOut, LogIn } from 'lucide-react';
import { logout, loginWithGoogle } from '../services/authService';

export default function NavBar({ user }) {
	const handleGoogleLogin = async () => {
		try {
			await loginWithGoogle();
		} catch (error) {
			console.error('Login error:', error);
		}
	};

	return (
		<nav className='bg-gray-800 border-b border-gray-700 sticky top-0 z-50'>
			<div className='max-w-6xl mx-auto px-4 h-16 flex items-center justify-between'>
				<div className='flex items-center gap-2'>
					<span className='text-xl font-bold text-white'>
						Algo Recall
					</span>
				</div>

				<div className='flex items-center gap-3'>
					{user ? (
						<>
							<span className='text-white text-sm'>{user.displayName}</span>
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
