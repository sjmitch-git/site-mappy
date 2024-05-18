import { APP_DESCRIPTION, APP_TITLE } from '@/lib/constants'

export default function Home() {
	return (
		<div className='px-4'>
			<h1>{APP_TITLE}</h1>
			<h2>{APP_DESCRIPTION}</h2>
		</div>
	)
}
