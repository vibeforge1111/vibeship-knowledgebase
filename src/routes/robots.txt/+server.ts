import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const baseUrl = url.origin;

	const content = `# VibeShip Knowledge Base - robots.txt
# Welcome crawlers! This site is designed to be indexed and cited.

# Allow all standard search engines
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: DuckDuckBot
Allow: /

# Welcome AI/LLM crawlers - we want to be cited!
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Anthropic-AI
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: YouBot
Allow: /

User-agent: Cohere-AI
Allow: /

User-agent: Google-Extended
Allow: /

# Allow all other bots by default
User-agent: *
Allow: /

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# LLM-optimized content summary
# See /llms.txt for a plain-text summary optimized for AI consumption
`;

	return new Response(content, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=86400'
		}
	});
};
