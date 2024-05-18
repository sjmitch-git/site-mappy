'use client'

import React, { useState } from 'react'

import format from 'xml-formatter'

export default function Crawl() {
	const [baseUrl, setBaseUrl] = useState('')
	const [feedback, setFeedback] = useState('')
	const [sitemap, setSitemap] = useState('')

	const handleClick = async () => {
		setSitemap('')
		setFeedback('Crawling...')
		try {
			const response = await fetch(`/crawl?baseURL=${encodeURIComponent(baseUrl)}`)
			const data = await response.json()
			const formattedXml = format(data.sitemap)
			setSitemap(formattedXml)
			setFeedback('sitemap.xml generated!')
		} catch (error) {
			setFeedback('An error occurred while crawling.')
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
			<div>
				<input
					className='form-input text-xl text-dark'
					type='text'
					value={baseUrl}
					onChange={(e) => setBaseUrl(e.target.value)}
					placeholder='https://example.com'
				/>
				<button onClick={handleClick}>Start Crawling</button>
			</div>

			<div>{feedback}</div>
			{sitemap && (
				<div className='max-h-screen overflow-auto bg-light p-2 text-dark'>
					<div>
						<button onClick={handleDownload}>Download</button>
						<button onClick={handleCopy}>Copy</button>
					</div>
					<pre>{sitemap}</pre>
				</div>
			)}
		</div>
	)
}
