import Image from 'next/image'

import Container from './container'
import logo from '../../public/logo.png'

export default function Header() {
	return (
		<header>
			<Container className='flex justify-center p-4'>
				<Image
					src={logo}
					alt='Site Logo'
					width='898'
					height='133'
					priority
				/>
			</Container>
		</header>
	)
}
