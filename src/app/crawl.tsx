'use client'

import React, { useState, useEffect } from 'react'
import format from 'xml-formatter'
import { FaPlay, FaDownload, FaClipboard } from 'react-icons/fa'

import { Button, Input, Spinner } from '@/components'

export default function Crawl() {
	const [baseUrl, setBaseUrl] = useState('')
	const [feedback, setFeedback] = useState('')
	const [loading, setLoading] = useState(false)
	const [sitemap, setSitemap] = useState('')
	const [isFormValid, setIsFormValid] = useState(false)

	useEffect(() => {
		const urlPattern = /^https:\/\/.+/
		setIsFormValid(urlPattern.test(baseUrl))
	}, [baseUrl])

	const handleClick = async () => {
		setSitemap('')
		setFeedback('Crawling...')
		setLoading(true)
		try {
			const response = await fetch(`/crawl?baseURL=${encodeURIComponent(baseUrl)}`)
			const data = await response.json()
			const formattedXml = format(data.sitemap)
			setSitemap(formattedXml)
			setFeedback('sitemap.xml generated!')
			setLoading(false)
		} catch (error) {
			setFeedback('An error occurred while crawling.')
			setLoading(false)
		}
	}

	const handleDownload = () => {
		const blob = new Blob([sitemap], { type: 'text/xml' })
		const url = URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = url
		a.download = 'sitemap.xml'
		document.body.appendChild(a)
		a.click()
		document.body.removeChild(a)
		URL.revokeObjectURL(url)
		setFeedback('Downloaded sitemap.xml!')
	}

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(sitemap)
			setFeedback('Copied to clipboard!')
		} catch (error) {
			setFeedback('Failed to copy to clipboard.')
		}
	}

	return (
		<div>
			<div className='flex flex-grow'>
				<Input
					className='form-input flex-grow text-xl text-dark'
					type='text'
					value={baseUrl}
					onChange={(e) => setBaseUrl(e.target.value)}
					placeholder='https://example.com'
					pattern='https://.+'
				/>
				<Button
					className='w-12 bg-primary disabled:bg-slate-400'
					onClick={handleClick}
					disabled={!isFormValid}
				>
					<FaPlay /> <span className='sr-only'>Start Crawling</span>
				</Button>
			</div>

			{loading && (
				<div className='flex justify-center p-8'>
					<Spinner />
				</div>
			)}

			<div className='p-8 text-center text-lg'>{feedback}</div>
			{sitemap && (
				<>
					<div className='mb-2 flex justify-between'>
						<Button
							onClick={handleDownload}
							title='Download sitemap.xml'
						>
							<FaDownload size={40} /> <span className='sr-only'>Download</span>
						</Button>
						<Button
							onClick={handleCopy}
							title='Copy to clipboard'
						>
							<FaClipboard size={40} /> <span className='sr-only'>Copy</span>
						</Button>
					</div>
					<div className='max-h-screen overflow-auto bg-light p-2 text-dark'>
						<pre>{sitemap}</pre>
					</div>
				</>
			)}
		</div>
	)
}
