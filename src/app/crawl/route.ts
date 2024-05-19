import { NextResponse } from 'next/server'
import generateSitemap from '@/lib/generate-sitemap'

export async function GET(request: Request) {
	const url = new URL(request.url)
	const baseURL = url.searchParams.get('baseURL')

	if (!baseURL) {
		return new Response('Base URL is missing in the query parameters.', { status: 400 })
	}

	const response = new NextResponse(
		new ReadableStream({
			async start(controller) {
				const encoder = new TextEncoder()

				try {
					const setFeedback = (message: string) => {
						controller.enqueue(encoder.encode(`data: ${message}\n\n`))
					}

					const data = await generateSitemap(baseURL, setFeedback)
					controller.enqueue(
						encoder.encode(`data: ${JSON.stringify({ sitemap: data })}\n\n`)
					)
					controller.enqueue(encoder.encode(`data: Done\n\n`))
					controller.close()
				} catch (error) {
					controller.enqueue(encoder.encode(`data: An error occurred: ${error}\n\n`))
					controller.close()
				}
			},
		}),
		{
			headers: {
				'Content-Type': 'text/event-stream',
				'Cache-Control': 'no-cache',
				Connection: 'keep-alive',
			},
		}
	)

	return response
}
