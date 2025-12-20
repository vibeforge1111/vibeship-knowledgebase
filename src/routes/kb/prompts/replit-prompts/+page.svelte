<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Replit Prompts: Build Secure Apps with AI Agent',
		description: 'Copy-paste Replit AI prompts that generate secure code. Includes full-stack templates, security patterns, and post-generation checklists for vibe coders.',
		url: '/kb/prompts/replit-prompts/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Prompts', href: '/kb/prompts' },
		{ label: 'Replit Prompts' }
	];

	// FAQ data
	const faqs = [
		{
			question: 'What prompts work best with Replit Agent?',
			answer: 'Detailed, structured prompts work best. Describe your app functionality, tech stack preferences, and security requirements upfront. Replit Agent builds iteratively, so include success criteria it can verify. Prompts like "build a todo app with auth" work, but adding "use parameterized queries" and "validate all input" prevents security gaps.'
		},
		{
			question: 'How do I make Replit generate secure code?',
			answer: 'Include security requirements directly in your prompt. Replit Agent follows instructions, so phrases like "never hardcode secrets," "use environment variables," and "validate input with Zod" guide it toward secure patterns. Always review the generated .replit and secrets configuration before deploying.'
		},
		{
			question: 'Can I use Replit for production apps?',
			answer: 'Yes, Replit supports production deployments with their Deployments feature. However, review security before going live: check for hardcoded secrets, verify auth middleware is on all routes, and ensure database queries use parameterized queries. The speed is real - just add a security review step.'
		},
		{
			question: 'What is Replit Agent vs Replit Ghostwriter?',
			answer: 'Replit Agent is the newer AI that builds complete apps from prompts, similar to Bolt.new or Lovable. Ghostwriter is the inline code completion assistant that works as you type. Use Agent for new projects and Ghostwriter for editing existing code. Both benefit from clear, security-focused instructions.'
		},
		{
			question: 'How do I use secrets in Replit?',
			answer: 'Use the Secrets tab in Replit (lock icon in the sidebar). Add your API keys and credentials there, then access them via process.env.SECRET_NAME in your code. Never hardcode secrets in files. Prompt Replit with "use Replit Secrets for all API keys" to ensure proper handling.'
		},
		{
			question: 'What is the difference between Replit and Bolt.new?',
			answer: 'Replit is a full development environment with hosting, databases, and collaboration features. Bolt.new is focused on rapid app generation. Use Replit when you need an IDE, want to iterate extensively, or need built-in hosting. Use Bolt.new for quick prototypes you will export elsewhere.'
		},
		{
			question: 'Does Replit Agent support databases?',
			answer: 'Yes. Replit has built-in PostgreSQL and key-value storage. You can also connect external databases. When prompting, specify "use Replit PostgreSQL" or "connect to Supabase" depending on your needs. Always include "use parameterized queries" in your prompt to prevent SQL injection.'
		}
	];

	// Prompt templates
	const promptTemplates = [
		{
			name: 'Secure Full-Stack App',
			category: 'Full Stack',
			description: 'Complete app with auth and database',
			prompt: `Build a full-stack web app for [PURPOSE]:

FEATURES:
- User authentication (signup, login, logout)
- Protected dashboard showing user data
- CRUD operations for [RESOURCE]
- Responsive design with Tailwind

SECURITY REQUIREMENTS:
- Use Replit Secrets for all API keys and credentials
- Hash passwords before storing (use bcrypt)
- Validate all user input on the server with Zod
- Use parameterized queries for all database operations
- Check authentication on every protected route
- Use httpOnly cookies for sessions

STACK:
- Next.js or Express backend
- Replit PostgreSQL for database
- Tailwind CSS for styling

Generate secure code following these patterns.`
		},
		{
			name: 'API with Auth Middleware',
			category: 'Backend',
			description: 'REST API with consistent auth checks',
			prompt: `Create a REST API with authentication:

ENDPOINTS:
- POST /api/auth/register - Create account
- POST /api/auth/login - Get session
- GET /api/me - Get current user (protected)
- GET /api/[resource] - List resources (protected)
- POST /api/[resource] - Create resource (protected)
- PUT /api/[resource]/:id - Update resource (protected)
- DELETE /api/[resource]/:id - Delete resource (protected)

SECURITY:
- Create auth middleware that runs on ALL protected routes
- Verify session token validity
- Check resource ownership before update/delete (prevent IDOR)
- Use parameterized queries with Replit PostgreSQL
- Validate request body with Zod schemas
- Rate limit auth endpoints (5 per minute)
- Store secrets in Replit Secrets, never in code

Return proper HTTP status codes (401 unauthorized, 403 forbidden, 404 not found).`
		},
		{
			name: 'Secure Form Handler',
			category: 'Components',
			description: 'Form with validation and CSRF protection',
			prompt: `Build a contact form with full security:

FORM FIELDS:
- Name (required, 2-100 characters)
- Email (required, valid email format)
- Message (required, 10-2000 characters)
- Honeypot field (hidden, must be empty)

SECURITY FEATURES:
- Client-side validation for UX feedback
- Server-side validation (never trust client)
- Sanitize all input before storing
- Rate limit: 3 submissions per minute per IP
- CSRF token validation
- No sensitive data in error messages

STACK:
- React with form handling
- Express API route
- Zod for validation
- Store submissions in Replit Database

Include both validation layers.`
		},
		{
			name: 'File Upload Service',
			category: 'Features',
			description: 'Secure file uploads with validation',
			prompt: `Create a file upload feature with security:

ALLOWED FILES:
- Images: jpg, png, gif, webp (max 5MB)
- Documents: pdf (max 10MB)

SECURITY REQUIREMENTS:
- Validate file type by magic bytes, not just extension
- Reject files larger than limits on both client and server
- Generate random filenames (UUID), never use user input
- Store outside public directory or use signed URLs
- Scan uploaded content for common attack patterns
- No path traversal - sanitize all file paths
- Log all upload attempts

IMPLEMENTATION:
- Multer or similar for handling multipart
- Store in Replit Object Storage or external S3
- Return signed URLs for download

Validate properly, not just by extension.`
		},
		{
			name: 'Real-time Chat App',
			category: 'Full Stack',
			description: 'WebSocket chat with message validation',
			prompt: `Build a real-time chat application:

FEATURES:
- User authentication required to chat
- Multiple chat rooms
- Real-time message delivery
- Message history (last 100 messages)

SECURITY:
- Authenticate WebSocket connections
- Validate message content (max 1000 chars)
- Sanitize messages before broadcasting (prevent XSS)
- Rate limit messages (10 per minute per user)
- Store messages with parameterized queries
- Don't expose user data in room lists

STACK:
- Socket.io or ws for WebSocket
- Express for auth endpoints
- Replit PostgreSQL for storage
- React frontend

Validate all messages server-side.`
		}
	];

	// Security checklist for Replit
	const securityChecklist = [
		{
			item: 'Check Secrets tab',
			description: 'All API keys should be in Replit Secrets, not in code files',
			search: 'sk_, api_key, secret, password, token'
		},
		{
			item: 'Verify .replit config',
			description: 'Ensure .replit file does not expose secrets in run command',
			search: 'run =, entrypoint'
		},
		{
			item: 'Review database queries',
			description: 'Look for string concatenation in SQL queries',
			search: '${, + userId, template literal in query'
		},
		{
			item: 'Check auth middleware',
			description: 'Every protected route should use auth middleware',
			search: 'authenticate, requireAuth, session'
		},
		{
			item: 'Validate input handling',
			description: 'User input should be validated with Zod or similar',
			search: 'z.object, schema.parse, validate'
		},
		{
			item: 'Review CORS settings',
			description: 'CORS should not be * in production',
			search: "cors, origin: '*', Access-Control"
		}
	];

	// Replit-specific tips
	const replitTips = [
		{
			title: 'Use Replit Secrets',
			description: 'Click the lock icon in sidebar. Add API keys there, access via process.env.SECRET_NAME',
			code: 'const apiKey = process.env.STRIPE_SECRET_KEY'
		},
		{
			title: 'Enable Always On',
			description: 'For production apps, enable "Always On" in deployment settings to prevent sleep',
			code: '// No code needed - configure in Replit dashboard'
		},
		{
			title: 'Use Replit Database',
			description: 'Built-in PostgreSQL is secure by default. Connect via DATABASE_URL secret',
			code: 'const pool = new Pool({ connectionString: process.env.DATABASE_URL })'
		},
		{
			title: 'Configure .replit properly',
			description: 'Set run command without exposing secrets',
			code: 'run = "npm start"  # Good\n# run = "API_KEY=xxx npm start"  # Bad - exposes secret'
		}
	];

	// Tool comparison
	const toolComparison = [
		{
			feature: 'Best for',
			replit: 'Full development + hosting',
			bolt: 'Quick app generation',
			lovable: 'UI-focused apps'
		},
		{
			feature: 'IDE included',
			replit: 'Yes (full browser IDE)',
			bolt: 'No (generates code)',
			lovable: 'Minimal editor'
		},
		{
			feature: 'Built-in hosting',
			replit: 'Yes (free + paid tiers)',
			bolt: 'Yes (Netlify)',
			lovable: 'Yes (Netlify)'
		},
		{
			feature: 'Database support',
			replit: 'PostgreSQL built-in',
			bolt: 'External only',
			lovable: 'Supabase focus'
		},
		{
			feature: 'Collaboration',
			replit: 'Real-time multiplayer',
			bolt: 'Export to GitHub',
			lovable: 'GitHub sync'
		},
		{
			feature: 'AI model',
			replit: 'Replit Agent + Ghostwriter',
			bolt: 'Claude',
			lovable: 'Claude'
		}
	];

	let copied = $state(false);
	let copiedSection = $state('');

	function copyCode(code: string, section: string) {
		navigator.clipboard.writeText(code);
		copied = true;
		copiedSection = section;
		setTimeout(() => {
			copied = false;
			copiedSection = '';
		}, 2000);
	}
</script>

<svelte:head>
	<title>{meta.title}</title>
	<meta name="description" content={meta.description} />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:url" content={meta.url} />
	<meta property="og:type" content="article" />
	<link rel="canonical" href="https://vibeship.co{meta.url}" />

	<!-- BreadcrumbList Schema -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"itemListElement": [
			{"@type": "ListItem", "position": 1, "name": "Knowledge Base", "item": "https://vibeship.co/kb"},
			{"@type": "ListItem", "position": 2, "name": "Prompts", "item": "https://vibeship.co/kb/prompts"},
			{"@type": "ListItem", "position": 3, "name": "Replit Prompts"}
		]
	}
	</script>`}

	<!-- TechArticle Schema -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "TechArticle",
		"headline": "${meta.title}",
		"description": "${meta.description}",
		"author": {
			"@type": "Organization",
			"name": "Vibeship"
		},
		"publisher": {
			"@type": "Organization",
			"name": "Vibeship",
			"logo": {
				"@type": "ImageObject",
				"url": "https://vibeship.co/logo.png"
			}
		},
		"datePublished": "2025-12-20",
		"dateModified": "2025-12-20"
	}
	</script>`}

	<!-- FAQ Schema -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "FAQPage",
		"mainEntity": ${JSON.stringify(faqs.map(faq => ({
			"@type": "Question",
			"name": faq.question,
			"acceptedAnswer": {
				"@type": "Answer",
				"text": faq.answer
			}
		})))}
	}
	</script>`}
</svelte:head>

<Header {breadcrumbs} />

<div class="content-wrapper">
	<article class="content-main content-wide">
		<!-- Header -->
		<header class="article-header">
			<div class="badge-row">
				<span class="badge badge-green">Prompts Guide</span>
				<span class="badge">Replit</span>
				<span class="badge">Templates</span>
			</div>
			<h1>Replit Prompts: Build Secure Apps Fast</h1>
			<p class="text-secondary">Templates for Replit Agent that generate production-ready code</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Replit Agent builds complete apps from natural language prompts.</strong>
				These templates include security requirements that prevent hardcoded secrets, SQL injection, and missing auth. Copy the prompt, customize for your use case, and let Replit build - then review before deploying.
			</p>
		</div>

		<!-- Why Prompts Matter -->
		<section>
			<h2>Why Replit prompts matter for security</h2>
			<p>
				<a href="/kb/vibe-coding-tools/replit/">Replit Agent</a> transforms natural language into working applications. It handles file structure, dependencies, and deployment configuration automatically. But like all AI tools, it optimizes for functionality - not security.
			</p>
			<p>
				A prompt like "build me a user dashboard" generates working code. But that code might hardcode API keys, skip input validation, or use string concatenation in database queries. The fix: include security requirements in your prompt.
			</p>
			<p>
				These templates address the vulnerabilities most common in vibe coded apps: <a href="/kb/security/vulnerabilities/hardcoded-secrets/">hardcoded secrets</a>, <a href="/kb/security/vulnerabilities/missing-auth/">missing authentication</a>, and <a href="/kb/security/vulnerabilities/sql-injection/">SQL injection</a>. Use them as starting points, then review the generated code.
			</p>
		</section>

		<!-- Prompt Templates -->
		<section id="templates">
			<h2>Replit prompt templates (copy-paste ready)</h2>
			<p>
				Each template includes security requirements tailored to Replit's environment. Copy, customize the bracketed sections, and paste into Replit Agent.
			</p>

			<div class="templates-grid">
				{#each promptTemplates as template, i}
					<div class="card template-card">
						<div class="template-header">
							<div>
								<span class="template-category">{template.category}</span>
								<h3>{template.name}</h3>
								<p class="template-desc">{template.description}</p>
							</div>
							<button class="copy-btn" onclick={() => copyCode(template.prompt, `template-${i}`)}>
								{copied && copiedSection === `template-${i}` ? 'Copied!' : 'Copy'}
							</button>
						</div>
						<pre><code>{template.prompt}</code></pre>
					</div>
				{/each}
			</div>
		</section>

		<!-- Replit-Specific Tips -->
		<section class="tips-section">
			<h2>Replit-specific security tips</h2>
			<p>
				Replit has unique features for security. Use these patterns in your prompts and code.
			</p>

			<div class="tips-grid">
				{#each replitTips as tip, i}
					<div class="card tip-card">
						<h4>{tip.title}</h4>
						<p>{tip.description}</p>
						<pre><code>{tip.code}</code></pre>
					</div>
				{/each}
			</div>
		</section>

		<!-- Post-Generation Checklist -->
		<section>
			<h2>Post-generation security checklist</h2>
			<p>
				After Replit Agent generates your app, verify these security points before deploying.
			</p>

			<div class="checklist">
				{#each securityChecklist as check, i}
					<div class="check-item">
						<div class="check-header">
							<span class="check-number">{i + 1}</span>
							<span class="check-title">{check.item}</span>
						</div>
						<p class="check-description">{check.description}</p>
						<div class="check-search">
							<span class="search-label">Search for:</span>
							<code>{check.search}</code>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- Tool Comparison -->
		<section>
			<h2>Replit vs Bolt.new vs Lovable</h2>
			<p>
				Each AI app builder has different strengths. Choose based on your workflow.
			</p>

			<div class="comparison-table">
				<table>
					<thead>
						<tr>
							<th>Feature</th>
							<th>Replit</th>
							<th>Bolt.new</th>
							<th>Lovable</th>
						</tr>
					</thead>
					<tbody>
						{#each toolComparison as row}
							<tr>
								<td>{row.feature}</td>
								<td>{row.replit}</td>
								<td>{row.bolt}</td>
								<td>{row.lovable}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<p>
				<strong>Use Replit when:</strong> You want a full IDE, need collaboration, or want built-in PostgreSQL. Replit is the most complete environment for iterating on AI-generated code.
			</p>
		</section>

		<!-- FAQ -->
		<section>
			<h2>Frequently asked questions</h2>
			{#each faqs as faq}
				<div class="faq-item">
					<h3>{faq.question}</h3>
					<p>{faq.answer}</p>
				</div>
			{/each}
		</section>

		<!-- Scanner CTA -->
		<section class="cta-box">
			<h2>Scan Your Replit Projects</h2>
			<p>
				Prompts help, but they don't catch everything. <a href="https://scanner.vibeship.co">VibeShip Scanner</a> automatically detects hardcoded secrets, SQL injection, and missing auth in your Replit-generated code.
			</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">Scan Your Code Free</a>
		</section>

		<!-- Related Content -->
		<section class="article-section">
			<h2>Related guides</h2>
			<div class="related-grid">
				<a href="/kb/vibe-coding-tools/replit/" class="card card-interactive related-card">
					<div class="related-card-category">Tool Guide</div>
					<div class="related-card-title">Replit Security Guide</div>
					<p class="related-card-description">Complete guide to using Replit safely</p>
				</a>
				<a href="/kb/prompts/bolt-prompts/" class="card card-interactive related-card">
					<div class="related-card-category">Prompts</div>
					<div class="related-card-title">Bolt.new Prompts</div>
					<p class="related-card-description">Secure prompts for Bolt.new</p>
				</a>
				<a href="/kb/prompts/agents-md/" class="card card-interactive related-card">
					<div class="related-card-category">Config Guide</div>
					<div class="related-card-title">AGENTS.md</div>
					<p class="related-card-description">Universal AI configuration file</p>
				</a>
				<a href="/kb/security/vulnerabilities/hardcoded-secrets/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Hardcoded Secrets</div>
					<p class="related-card-description">The most common AI code vulnerability</p>
				</a>
				<a href="/kb/security/vulnerabilities/sql-injection/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">SQL Injection</div>
					<p class="related-card-description">AI loves string concatenation in queries</p>
				</a>
				<a href="/kb/vibe-coding/secure-vibe-coding-guide/" class="card card-interactive related-card">
					<div class="related-card-category">Pillar Guide</div>
					<div class="related-card-title">Secure Vibe Coding</div>
					<p class="related-card-description">Ship fast without getting hacked</p>
				</a>
			</div>
		</section>

		<!-- External Resources -->
		<section>
			<h2>External resources</h2>
			<ul class="external-links">
				<li><a href="https://replit.com" target="_blank" rel="noopener">Replit</a> - Official site</li>
				<li><a href="https://docs.replit.com" target="_blank" rel="noopener">Replit Documentation</a></li>
				<li><a href="https://docs.replit.com/replit-agent/overview" target="_blank" rel="noopener">Replit Agent Docs</a></li>
				<li><a href="https://owasp.org/Top10/" target="_blank" rel="noopener">OWASP Top 10</a> - Security reference</li>
			</ul>
		</section>
	</article>
</div>

<style>
	/* Page Layout */
	.content-wrapper {
		max-width: 900px;
		margin: 0 auto;
		padding: 2rem;
	}

	.article-header {
		margin-bottom: 2rem;
	}

	.badge-row {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		margin-bottom: 1rem;
	}

	h1 {
		font-size: 2.5rem;
		margin-bottom: 0.5rem;
	}

	.text-secondary {
		color: var(--text-secondary);
		font-size: 1.1rem;
	}

	section {
		margin-bottom: 3rem;
	}

	h2 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--border);
	}

	h3 {
		font-size: 1.1rem;
		margin-top: 0;
		margin-bottom: 0.5rem;
	}

	h4 {
		font-size: 1rem;
		margin-top: 0;
		margin-bottom: 0.5rem;
		color: var(--green-dim);
	}

	p {
		line-height: 1.7;
		margin-bottom: 1rem;
	}

	a {
		color: var(--green-dim);
	}

	a:hover {
		color: var(--green);
	}

	code {
		font-family: 'JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', monospace;
		background: rgba(0,0,0,0.3);
		padding: 0.125rem 0.375rem;
		font-size: 0.9em;
	}

	pre {
		margin: 0;
		padding: 1rem;
		font-size: 0.8rem;
		line-height: 1.6;
		background: #0d0d0d;
		border-top: 1px solid var(--border);
		white-space: pre-wrap;
		word-wrap: break-word;
	}

	pre code {
		background: transparent;
		padding: 0;
		white-space: pre-wrap;
		word-wrap: break-word;
	}

	/* Template Cards */
	.templates-grid {
		display: grid;
		gap: 1.5rem;
		margin: 1.5rem 0;
	}

	.template-card {
		overflow: hidden;
	}

	.template-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		padding: 1rem;
		background: rgba(255,255,255,0.02);
	}

	.template-category {
		font-size: 0.75rem;
		color: var(--green-dim);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.template-desc {
		margin: 0;
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.template-card pre {
		max-height: 300px;
		overflow-y: auto;
	}

	/* Tips Section */
	.tips-section {
		background: var(--bg-secondary);
		padding: 2rem;
		border: 1px solid var(--border);
	}

	.tips-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		margin: 1rem 0;
	}

	@media (max-width: 768px) {
		.tips-grid {
			grid-template-columns: 1fr;
		}
	}

	.tip-card {
		padding: 1rem;
	}

	.tip-card p {
		margin: 0.5rem 0;
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.tip-card pre {
		font-size: 0.75rem;
		margin-top: 0.75rem;
		border: none;
		border-radius: 4px;
	}

	/* Checklist */
	.checklist {
		display: grid;
		gap: 1rem;
		margin: 1rem 0;
	}

	.check-item {
		background: var(--bg-secondary);
		padding: 1rem;
		border: 1px solid var(--border);
	}

	.check-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 0.5rem;
	}

	.check-number {
		width: 24px;
		height: 24px;
		background: var(--green-dim);
		color: var(--bg-primary);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.75rem;
		font-weight: 600;
	}

	.check-title {
		font-weight: 600;
	}

	.check-description {
		margin: 0 0 0.75rem 0;
		font-size: 0.875rem;
		color: var(--text-secondary);
		padding-left: 2rem;
	}

	.check-search {
		padding-left: 2rem;
		font-size: 0.875rem;
	}

	.search-label {
		color: var(--text-secondary);
		margin-right: 0.5rem;
	}

	/* Comparison Table */
	.comparison-table {
		overflow-x: auto;
		margin: 1rem 0;
	}

	.comparison-table table {
		width: 100%;
		border-collapse: collapse;
	}

	.comparison-table th,
	.comparison-table td {
		padding: 0.75rem 1rem;
		text-align: left;
		border: 1px solid var(--border);
	}

	.comparison-table th {
		background: var(--bg-secondary);
		font-weight: 600;
	}

	.comparison-table tr:nth-child(even) {
		background: rgba(255,255,255,0.02);
	}

	/* FAQ */
	.faq-item {
		margin-bottom: 1.5rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid var(--border);
	}

	.faq-item:last-child {
		border-bottom: none;
	}

	.faq-item h3 {
		font-size: 1.1rem;
		margin-bottom: 0.5rem;
	}

	.faq-item p {
		margin: 0;
		color: var(--text-secondary);
	}

	/* CTA Box */
	.cta-box {
		background: rgba(0, 196, 154, 0.05);
		border: 1px solid rgba(0, 196, 154, 0.3);
		padding: 2rem;
		text-align: center;
	}

	.cta-box h2 {
		border-bottom: none;
		padding-bottom: 0;
	}

	/* External Links */
	.external-links {
		list-style: none;
		padding: 0;
	}

	.external-links li {
		margin-bottom: 0.75rem;
	}

	.external-links a {
		color: var(--green-dim);
		text-decoration: none;
	}

	.external-links a:hover {
		color: var(--green);
	}

	/* Mobile adjustments */
	@media (max-width: 768px) {
		.content-wrapper {
			padding: 1rem;
		}

		h1 {
			font-size: 1.75rem;
		}

		.tips-section {
			padding: 1rem;
		}
	}
</style>
