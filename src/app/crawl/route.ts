import { NextResponse } from 'next/server'
import generateSitemap from '@/lib//generate-sitemap'

export async function GET(request: Request) {
	const url = new URL(request.url)
	const baseURL = url.searchParams.get('baseURL')
	console.log('GET baseURL', baseURL)

	if (!baseURL) {
		return new Response('Base URL is missing in the query parameters.', { status: 400 })
	}

	const sitemap = await generateSitemap(baseURL)
	return NextResponse.json({ sitemap })
}
