import { NEETCODE_150 } from './data/neetcode';
import CategorySection from './components/CategorySection';

export default function App() {
	return (
		<div className='min-h-screen bg-gray-900 text-white p-8'>
			<div className='max-w-5xl mx-auto'>
				<h1 className='text-3xl font-bold mb-4'>AlgoRecall</h1>
				{NEETCODE_150.map((category) => (
					<CategorySection
						key={category.category}
						category={category}
					/>
				))}
			</div>
		</div>
	);
}
