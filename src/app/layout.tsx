import type { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Inter } from 'next/font/google'
import '@/styles/index.css'

import {
	APP_TITLE,
	APP_DESCRIPTION,
	APP_BASE_URL,
	APP_AUTHOR,
	APP_AUTHOR_URL,
	GA_TAG,
	GOOGLE_VERIFICATION,
} from '@/lib/constants'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: {
		default: APP_TITLE,
		template: `%s | ${APP_TITLE}`,
	},
	description: APP_DESCRIPTION,
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
		/* images: [
			{
				url: '/icon.png',
				width: 512,
				height: 512,
			},
		], */
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
				{children}
			</body>
		</html>
	)
}
