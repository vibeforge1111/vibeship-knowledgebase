import type { RequestHandler } from './$types';

// Define all static routes
const staticRoutes = [
	{ path: '/', priority: '1.0', changefreq: 'weekly' },
	{ path: '/kb', priority: '0.9', changefreq: 'weekly' },
	// Vulnerability pages
	{ path: '/kb/vulnerabilities', priority: '0.9', changefreq: 'weekly' },
	{ path: '/kb/vulnerabilities/sql-injection', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/vulnerabilities/hardcoded-secrets', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/vulnerabilities/xss', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/vulnerabilities/missing-auth', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/vulnerabilities/idor', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/vulnerabilities/insecure-cors', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/vulnerabilities/missing-rate-limiting', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/vulnerabilities/sensitive-data-exposure', priority: '0.8', changefreq: 'monthly' },
	// AI Patterns
	{ path: '/kb/ai-patterns', priority: '0.9', changefreq: 'weekly' },
	{ path: '/kb/ai-patterns/cursor', priority: '0.8', changefreq: 'weekly' },
	{ path: '/kb/ai-patterns/claude-code', priority: '0.8', changefreq: 'weekly' },
	{ path: '/kb/ai-patterns/bolt', priority: '0.8', changefreq: 'weekly' },
	{ path: '/kb/ai-patterns/v0', priority: '0.8', changefreq: 'weekly' },
	{ path: '/kb/ai-patterns/replit', priority: '0.8', changefreq: 'weekly' },
	{ path: '/kb/ai-patterns/copilot', priority: '0.8', changefreq: 'weekly' },
	{ path: '/kb/ai-patterns/windsurf', priority: '0.8', changefreq: 'weekly' },
	// Stacks
	{ path: '/kb/stacks', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/stacks/nextjs-supabase', priority: '0.7', changefreq: 'monthly' },
	{ path: '/kb/stacks/sveltekit-supabase', priority: '0.7', changefreq: 'monthly' },
	{ path: '/kb/stacks/remix-prisma', priority: '0.7', changefreq: 'monthly' },
	{ path: '/kb/stacks/express-mongodb', priority: '0.7', changefreq: 'monthly' },
	{ path: '/kb/stacks/fastapi-postgresql', priority: '0.7', changefreq: 'monthly' },
	{ path: '/kb/stacks/django-postgresql', priority: '0.7', changefreq: 'monthly' },
	// Fixes
	{ path: '/kb/fixes', priority: '0.8', changefreq: 'weekly' },
	{ path: '/kb/fixes/sql-injection', priority: '0.7', changefreq: 'monthly' },
	{ path: '/kb/fixes/xss', priority: '0.7', changefreq: 'monthly' },
	{ path: '/kb/fixes/authentication', priority: '0.7', changefreq: 'monthly' },
	{ path: '/kb/fixes/secrets', priority: '0.7', changefreq: 'monthly' },
	{ path: '/kb/fixes/rate-limiting', priority: '0.7', changefreq: 'monthly' },
	{ path: '/kb/fixes/cors', priority: '0.7', changefreq: 'monthly' },
	// Glossary
	{ path: '/kb/glossary', priority: '0.8', changefreq: 'monthly' },
	// Checklists
	{ path: '/kb/checklists', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kb/checklists/pre-launch', priority: '0.7', changefreq: 'monthly' },
	{ path: '/kb/checklists/api-security', priority: '0.7', changefreq: 'monthly' },
	{ path: '/kb/checklists/authentication', priority: '0.7', changefreq: 'monthly' },
	{ path: '/kb/checklists/database-security', priority: '0.7', changefreq: 'monthly' },
	{ path: '/kb/checklists/frontend-security', priority: '0.7', changefreq: 'monthly' },
	{ path: '/kb/checklists/ai-code-review', priority: '0.7', changefreq: 'monthly' },
	// Research
	{ path: '/research/vulnerability-index', priority: '0.8', changefreq: 'weekly' },
	{ path: '/research/ai-tool-comparison', priority: '0.8', changefreq: 'weekly' },
	{ path: '/research/methodology', priority: '0.6', changefreq: 'monthly' },
	// Other
	{ path: '/blog', priority: '0.7', changefreq: 'weekly' },
	{ path: '/tools', priority: '0.7', changefreq: 'monthly' }
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
