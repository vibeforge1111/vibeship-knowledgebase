import type { RequestHandler } from './$types';

// Only include routes that actually exist
const staticRoutes = [
	{ path: '/', priority: '1.0', changefreq: 'weekly' },
	{ path: '/kb', priority: '0.9', changefreq: 'weekly' },

	// Security Vulnerabilities (18 pages)
	{ path: '/kb/security/vulnerabilities', priority: '0.9', changefreq: 'weekly' },
	{ path: '/kb/security/vulnerabilities/sql-injection', priority: '0.8', changefreq: 'monthly' },
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
	{ path: '/kb/security/vulnerabilities/jwt-vulnerabilities', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/security/vulnerabilities/mass-assignment', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/security/vulnerabilities/open-redirect', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/security/vulnerabilities/path-traversal', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/security/vulnerabilities/ssrf', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/security/vulnerabilities/ssti', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/security/vulnerabilities/xxe', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/security/vulnerabilities/command-injection', priority: '0.8', changefreq: 'monthly' },

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

	// Stack Guides (3 pages)
	{ path: '/kb/security/stacks', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/security/stacks/nextjs-supabase', priority: '0.7', changefreq: 'monthly' },
	{ path: '/kb/security/stacks/nextjs-prisma', priority: '0.7', changefreq: 'monthly' },
	{ path: '/kb/security/stacks/sveltekit-supabase', priority: '0.7', changefreq: 'monthly' },

	// Checklists (1 page)
	{ path: '/kb/security/checklists', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/security/checklists/pre-launch', priority: '0.7', changefreq: 'monthly' },

	// Guides
	{ path: '/kb/vibe-coding/secure-vibe-coding-guide', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/agents/security/mcp-servers', priority: '0.8', changefreq: 'monthly' }
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
