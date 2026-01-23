import React from 'react';
import { LogOut, LogIn, Moon, Sun } from 'lucide-react';
import { logout, loginWithGoogle } from '../services/authService';
import { useTheme } from '../context/ThemeContext';

export default function NavBar({ user, currentView, setCurrentView }) {
    const { darkMode, toggleDarkMode } = useTheme();

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <nav className='bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors'>
            <div className='max-w-5xl mx-auto h-16 flex items-center justify-between'>
                <div className='flex items-center gap-6'>
                    <span className='text-xl font-bold text-gray-900 dark:text-white'>
                        Algo Recall
                    </span>
                    <div className='flex gap-2'>
                        <button
                            onClick={() => setCurrentView('dashboard')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                                currentView === 'dashboard'
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                        >
                            Dashboard
                        </button>
                        <button
                            onClick={() => setCurrentView('problemList')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                                currentView === 'problemList'
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                        >
                            Problem List
                        </button>
                    </div>
                </div>

                <div className='flex items-center gap-3'>
                    <button
                        onClick={toggleDarkMode}
                        className='p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer'
                        aria-label='Toggle dark mode'
                    >
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    {user ? (
                        <button
                            onClick={logout}
                            className='flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer'
                        >
                            <LogOut size={18} />
                            Sign Out
                        </button>
                    ) : (
                        <button
                            onClick={handleGoogleLogin}
                            className='flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer'
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