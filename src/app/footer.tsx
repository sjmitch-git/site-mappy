import Container from './container'
import { APP_AUTHOR_SHORT, APP_AUTHOR_URL } from '@/lib/constants'

export default function Footer() {
	return (
		<footer className='mt-auto px-4 pb-2'>
			<Container className='text-right'>
				<a
					href={APP_AUTHOR_URL}
					target='_blank'
					className='btn rounded bg-light text-sm text-dark'
				>
					Made by {APP_AUTHOR_SHORT}
				</a>
			</Container>
		</footer>
	)
}
