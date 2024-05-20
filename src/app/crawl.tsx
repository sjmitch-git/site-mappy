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
	const [isInputValid, setIsInputValid] = useState(false)
	const [eventSource, setEventSource] = useState<EventSource | null>(null)

	useEffect(() => {
		const urlPattern = /^https:\/\/.+/
		setIsInputValid(urlPattern.test(baseUrl))
	}, [baseUrl])

	useEffect(() => {
		if (eventSource) {
			eventSource.onmessage = (event) => {
				if (event.data === 'Done') {
					eventSource.close()
					setLoading(false)
					return
				}

				try {
					const data = JSON.parse(event.data)
					const formattedXml = format(data.sitemap)
					setSitemap(formattedXml)
				} catch (error) {
					setFeedback(event.data)
				}
			}

			eventSource.onerror = (error) => {
				setFeedback('An error occurred while crawling.')
				eventSource.close()
				setLoading(false)
			}

			return () => {
				eventSource.close()
			}
		}
	}, [eventSource])

	const handleClick = () => {
		setSitemap('')
		setFeedback('Crawling...')
		setLoading(true)
		const newEventSource = new EventSource(`/crawl?baseURL=${encodeURIComponent(baseUrl)}`)
		setEventSource(newEventSource)
	}

	const handleCancel = () => {
		if (eventSource) {
			setFeedback('Cancelled!')
			setLoading(false)
			eventSource.close()
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
					disabled={!isInputValid || loading}
				>
					{loading ? (
						<Spinner />
					) : (
						<>
							<FaPlay /> <span className='sr-only'>Start Crawling</span>
						</>
					)}
				</Button>
			</div>

			<div className='p-8 text-center text-lg'>{feedback}</div>

			{loading && (
				<div className='p-4 text-center'>
					<Button
						className='text-large rounded bg-danger text-light'
						onClick={handleCancel}
						title='Cancel Stream'
					>
						Cancel
					</Button>
				</div>
			)}

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
					<div className='max-h-[30rem] overflow-auto bg-light p-2 text-dark md:max-h-screen'>
						<pre>{sitemap}</pre>
					</div>
				</>
			)}
		</div>
	)
}
