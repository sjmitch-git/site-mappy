import Container from './container'
import { APP_AUTHOR, APP_AUTHOR_URL } from '@/lib/constants'

export default function Footer() {
	return (
		<footer className='mt-auto px-4 pb-8'>
			<Container className='text-right'>
				<a
					href={APP_AUTHOR_URL}
					target='_blank'
					className='rounded bg-light'
				>
					Made by {APP_AUTHOR}
				</a>
			</Container>
		</footer>
	)
}
