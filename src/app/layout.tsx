import type { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Inter } from 'next/font/google'
import '@/styles/index.css'

import {
	APP_TITLE,
	APP_DESCRIPTION,
	APP_KEYWORDS,
	APP_BASE_URL,
	APP_AUTHOR,
	APP_AUTHOR_URL,
	GA_TAG,
	GOOGLE_VERIFICATION,
} from '@/lib/constants'

import Header from './header'
import Footer from './footer'
import Container from './container'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: {
		default: APP_TITLE,
		template: `%s | ${APP_TITLE}`,
	},
	description: APP_DESCRIPTION,
	keywords: APP_KEYWORDS,
	metadataBase: new URL(APP_BASE_URL),
	alternates: {
		canonical: '/',
	},
	authors: [{ name: APP_AUTHOR, url: APP_AUTHOR_URL }],
	verification: {
		google: GOOGLE_VERIFICATION,
	},
	openGraph: {
		title: APP_TITLE,
		description: APP_DESCRIPTION,
		url: new URL(APP_BASE_URL),
		siteName: APP_TITLE,
		images: [
			{
				url: '/icon.png',
				width: 560,
				height: 560,
			},
		],
		locale: 'en_GB',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<GoogleAnalytics gaId={GA_TAG} />
				<Header />
				<Container className='flex-grow'>{children}</Container>
				<Footer />
			</body>
		</html>
	)
}
