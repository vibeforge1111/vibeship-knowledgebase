import type { RequestHandler } from './$types';

const staticRoutes = [
	// Core pages
	{ path: '/', priority: '1.0', changefreq: 'weekly' },
	{ path: '/kb', priority: '0.9', changefreq: 'weekly' },

	// Security Vulnerabilities (27 pages)
	{ path: '/kb/security/vulnerabilities', priority: '0.9', changefreq: 'weekly' },
	{ path: '/kb/security/vulnerabilities/sql-injection', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/security/vulnerabilities/nosql-injection', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/security/vulnerabilities/graphql-injection', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/security/vulnerabilities/ldap-injection', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/security/vulnerabilities/header-injection', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/security/vulnerabilities/command-injection', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/security/vulnerabilities/hardcoded-secrets', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/security/vulnerabilities/xss', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/security/vulnerabilities/missing-auth', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/security/vulnerabilities/idor', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/security/vulnerabilities/broken-access-control', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/security/vulnerabilities/csrf', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/security/vulnerabilities/insecure-cors', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/security/vulnerabilities/missing-rate-limiting', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/security/vulnerabilities/sensitive-data-exposure', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/security/vulnerabilities/insecure-deserialization', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/security/vulnerabilities/insecure-file-upload', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/security/vulnerabilities/jwt-vulnerabilities', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/security/vulnerabilities/mass-assignment', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/security/vulnerabilities/open-redirect', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/security/vulnerabilities/path-traversal', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/security/vulnerabilities/ssrf', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/security/vulnerabilities/ssti', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/security/vulnerabilities/xxe', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/security/vulnerabilities/race-conditions', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/security/vulnerabilities/prompt-injection', priority: '0.8', changefreq: 'monthly' },

	// Vibe Coding Tools (8 pages)
	{ path: '/kb/vibe-coding-tools', priority: '0.9', changefreq: 'weekly' },
	{ path: '/kb/vibe-coding-tools/cursor', priority: '0.8', changefreq: 'weekly' },
	{ path: '/kb/vibe-coding-tools/claude-code', priority: '0.8', changefreq: 'weekly' },
	{ path: '/kb/vibe-coding-tools/bolt', priority: '0.8', changefreq: 'weekly' },
	{ path: '/kb/vibe-coding-tools/v0', priority: '0.8', changefreq: 'weekly' },
	{ path: '/kb/vibe-coding-tools/replit', priority: '0.8', changefreq: 'weekly' },
	{ path: '/kb/vibe-coding-tools/github-copilot', priority: '0.8', changefreq: 'weekly' },
	{ path: '/kb/vibe-coding-tools/windsurf', priority: '0.8', changefreq: 'weekly' },
	{ path: '/kb/vibe-coding-tools/lovable', priority: '0.8', changefreq: 'weekly' },

	// Tool Comparisons (6 pages)
	{ path: '/kb/vibe-coding-tools/cursor-vs-copilot', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/vibe-coding-tools/claude-code-vs-cursor', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/vibe-coding-tools/windsurf-vs-cursor', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/vibe-coding-tools/cline-vs-cursor', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/vibe-coding-tools/replit-vs-cursor', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/vibe-coding-tools/lovable-vs-bolt', priority: '0.8', changefreq: 'monthly' },

	// Prompts & Rules (15 pages)
	{ path: '/kb/prompts', priority: '0.9', changefreq: 'weekly' },
	{ path: '/kb/prompts/cursor-rules', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/prompts/cursor-rules-file', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/prompts/cursor-rules-examples', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/prompts/how-to-use-cursor-rules', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/prompts/claude-md', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/prompts/cline-rules', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/prompts/copilot-instructions', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/prompts/windsurf-rules', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/prompts/best-ai-coding-tools-2025', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/prompts/ai-coding-prompts', priority: '0.7', changefreq: 'monthly' },
	{ path: '/kb/prompts/ai-prompt-library', priority: '0.7', changefreq: 'monthly' },
	{ path: '/kb/prompts/debugging-prompts', priority: '0.7', changefreq: 'monthly' },
	{ path: '/kb/prompts/replit-prompts', priority: '0.7', changefreq: 'monthly' },
	{ path: '/kb/prompts/security-prompts', priority: '0.7', changefreq: 'monthly' },

	// Stack Guides (4 pages)
	{ path: '/kb/security/stacks', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/security/stacks/nextjs-supabase', priority: '0.7', changefreq: 'monthly' },
	{ path: '/kb/security/stacks/nextjs-prisma', priority: '0.7', changefreq: 'monthly' },
	{ path: '/kb/security/stacks/sveltekit-supabase', priority: '0.7', changefreq: 'monthly' },

	// Checklists (2 pages)
	{ path: '/kb/security/checklists', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/security/checklists/pre-launch', priority: '0.7', changefreq: 'monthly' },

	// Vibe Coding Guides (2 pages)
	{ path: '/kb/vibe-coding/what-is-vibe-coding', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/vibe-coding/secure-vibe-coding-guide', priority: '0.8', changefreq: 'monthly' },

	// Agents (1 page)
	{ path: '/kb/agents/security/mcp-servers', priority: '0.8', changefreq: 'monthly' },

	// Security landing
	{ path: '/kb/security', priority: '0.8', changefreq: 'weekly' }
];

export const GET: RequestHandler = async ({ url }) => {
	const baseUrl = url.origin;
	const today = new Date().toISOString().split('T')[0];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes
	.map(
		(route) => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};
