import axios from 'axios'
import * as cheerio from 'cheerio'

// type SetFeedback = (message: string) => void

async function fetchHTML(url: string): Promise<string | null> {
	try {
		const response = await axios.get(url)
		return response.data
	} catch (error) {
		console.error(`Error fetching ${url}: ${error}`)
		return null
	}
}

function extractLinks(html: string, baseURL: string): string[] {
	const $ = cheerio.load(html)
	const links: string[] = []
	$('a').each((index, element) => {
		const href = $(element).attr('href')
		if (
			href &&
			!href.startsWith('https://') &&
			!href.startsWith('http://') &&
			!href.startsWith('#') &&
			!href.includes('?') &&
			!href.startsWith('mailto:')
		) {
			links.push(baseURL + href)
		}
	})
	return links
}

async function crawl(url: string, baseURL: string, visitedLinks = new Set()) {
	url = url.endsWith('/') ? url.slice(0, -1) : url

	if (visitedLinks.has(url)) {
		return
	}
	console.log(`Crawling ${url}`)
	visitedLinks.add(url)
	const html = await fetchHTML(url)
	if (!html) {
		return
	}
	const links = extractLinks(html, baseURL)
	for (const link of links) {
		await crawl(link, baseURL, visitedLinks)
	}
}

async function generateSitemap(baseURL: string): Promise<string> {
	const visitedLinks = new Set<string>()

	baseURL = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL

	await crawl(baseURL, baseURL, visitedLinks)
	const sitemapContent =
		'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
		Array.from(visitedLinks)
			.map((link) => `  <url><loc>${link}</loc></url>`)
			.join('\n') +
		'\n</urlset>'
	return sitemapContent
}

export default generateSitemap
