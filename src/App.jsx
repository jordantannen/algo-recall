import { useState, useEffect } from 'react';
import { NEETCODE_150 } from './data/neetcode';
import CategorySection from './components/CategorySection';
import NavBar from './components/Navbar';
import { onAuthChange } from './services/authService';

export default function App() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = onAuthChange((currentUser) => {
			setUser(currentUser);
		});

		return () => unsubscribe();
	}, []);

	return (
		<div>
			<NavBar user={user} />

			<div className='min-h-screen bg-gray-900 text-white p-8'>
				<div className='max-w-5xl mx-auto'>
					{NEETCODE_150.map((category) => (
						<CategorySection
							key={category.category}
							category={category}
							user={user}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
