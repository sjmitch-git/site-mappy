import { APP_DESCRIPTION, APP_TITLE } from '@/lib/constants'
import Crawl from './crawl'

export default function Home() {
	return (
		<div className='mx-auto max-w-2xl p-4'>
			<h1 className='sr-only mb-8 text-center font-mono text-6xl'>{APP_TITLE}</h1>
			<h2 className='mb-8 text-center font-mono text-2xl'>{APP_DESCRIPTION}</h2>
			<Crawl />
		</div>
	)
}
