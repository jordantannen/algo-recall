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
        <nav className='bg-white border-b border-gray-200 sticky top-0 z-50'>
            <div className='max-w-5xl mx-auto h-16 flex items-center justify-between'>
                <div className='flex items-center gap-6'>
                    <span className='text-xl font-bold text-gray-900'>
                        Algo Recall
                    </span>
                    <div className='flex gap-2'>
                        <button
                            onClick={() => setCurrentView('dashboard')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                                currentView === 'dashboard'
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                            }`}
                        >
                            Dashboard
                        </button>
                        <button
                            onClick={() => setCurrentView('problemList')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                                currentView === 'problemList'
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                            }`}
                        >
                            Problem List
                        </button>
                    </div>
                </div>

                <div className='flex items-center gap-3'>
                    {user ? (
                        <button
                            onClick={logout}
                            className='flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer'
                        >
                            <LogOut size={18} />
                            Sign Out
                        </button>
                    ) : (
                        <button
                            onClick={handleGoogleLogin}
                            className='flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer'
                        >
                            <LogIn size={18} /> 
                            Sign In
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}