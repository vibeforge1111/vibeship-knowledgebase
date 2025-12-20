<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Bolt.new Prompts: Copy-Paste Templates for Secure AI Apps',
		description: 'Get copy-paste Bolt.new prompt templates that build secure apps. Includes security prompts, component patterns, and post-generation checklists for vibe coders.',
		url: '/kb/prompts/bolt-prompts/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Prompts', href: '/kb/prompts' },
		{ label: 'Bolt.new Prompts' }
	];

	// FAQ data
	const faqs = [
		{
			question: 'What prompts work best with Bolt.new?',
			answer: 'Specific, component-focused prompts work best. Instead of "build me an app," describe the exact UI, data flow, and security requirements. Include your tech stack preferences (React, Tailwind, etc.) and mention security needs upfront. Bolt.new generates complete working code, so detailed prompts prevent security gaps.'
		},
		{
			question: 'How do I make Bolt.new generate secure code?',
			answer: 'Add security requirements directly to your prompt. Phrases like "validate all form inputs," "use environment variables for API keys," and "add authentication checks" guide Bolt toward secure patterns. Always review generated code for hardcoded secrets and missing validation before deploying.'
		},
		{
			question: 'Can I use Bolt.new for production apps?',
			answer: 'Yes, but with review. Bolt.new generates functional code quickly, but AI-generated code often has security gaps. Run a security scan before deploying, check for hardcoded credentials, and verify authentication works correctly. The speed advantage is real - just add a review step before production.'
		},
		{
			question: 'What is the difference between Bolt.new and v0?',
			answer: 'Bolt.new generates full-stack applications with backend logic, while v0 focuses on UI components. Use Bolt.new when you need authentication, database connections, or API routes. Use v0 when you need polished UI components to integrate into existing projects. Both benefit from security-focused prompts.'
		},
		{
			question: 'How do I fix security issues in Bolt.new generated code?',
			answer: 'First, scan the generated code for common issues: hardcoded API keys, missing input validation, exposed environment variables. Then either regenerate with security requirements in your prompt, or manually fix the issues. Our security prompts below include the patterns that prevent most common vulnerabilities.'
		},
		{
			question: 'Does Bolt.new support environment variables?',
			answer: 'Yes. Bolt.new supports .env files for secrets. Always prompt with "use environment variables for API keys and secrets" to ensure credentials are not hardcoded. After generation, verify secrets are in .env and not committed to the repository.'
		},
		{
			question: 'What stack does Bolt.new use by default?',
			answer: 'Bolt.new typically generates React or Next.js applications with Tailwind CSS. You can specify different frameworks in your prompt. For backend, it supports various options including serverless functions, Express, and direct API integrations. Specify your preferred stack for consistent results.'
		}
	];

	// Prompt templates with security baked in
	const promptTemplates = [
		{
			name: 'Secure Auth App Starter',
			category: 'Full Stack',
			description: 'Complete authentication flow with protected routes',
			prompt: `Build a Next.js app with user authentication:

REQUIREMENTS:
- Email/password signup and login
- Protected dashboard route (redirect if not authenticated)
- Session management with secure cookies
- Password hashing (never store plain text)

SECURITY RULES:
- Use environment variables for all secrets
- Validate email format and password strength on server
- Rate limit auth endpoints (5 attempts per minute)
- Hash passwords with bcrypt before storing
- Use httpOnly cookies for session tokens

STACK: Next.js 14, Tailwind CSS, better-auth or lucia

Generate the complete authentication flow with proper security.`
		},
		{
			name: 'Secure API with Database',
			category: 'Backend',
			description: 'REST API with parameterized queries',
			prompt: `Create a REST API for a todo app with database:

ENDPOINTS:
- GET /api/todos - List user's todos
- POST /api/todos - Create todo (title, completed)
- PUT /api/todos/:id - Update todo
- DELETE /api/todos/:id - Delete todo

SECURITY REQUIREMENTS:
- Authenticate every endpoint (check session/token)
- Use parameterized queries, NEVER string concatenation
- Validate input: title max 200 chars, completed is boolean
- Check ownership before update/delete (user can only access their own todos)
- Return 401 for unauthenticated, 403 for unauthorized

STACK: Next.js API routes, Prisma ORM, PostgreSQL

Use parameterized queries and proper auth on every route.`
		},
		{
			name: 'Secure Form Component',
			category: 'Components',
			description: 'Form with validation and CSRF protection',
			prompt: `Build a contact form component with security:

FORM FIELDS:
- Name (required, 1-100 characters)
- Email (required, valid format)
- Message (required, 10-1000 characters)

SECURITY FEATURES:
- Client-side validation for UX
- Server-side validation (never trust client)
- Sanitize message content before storing
- Rate limit submissions (3 per minute per IP)
- CSRF token validation

STACK: React, Tailwind CSS, Zod for validation

Include both client and server validation.`
		},
		{
			name: 'Dashboard with Role-Based Access',
			category: 'Full Stack',
			description: 'Admin dashboard with permission checks',
			prompt: `Create an admin dashboard with role-based access:

PAGES:
- /dashboard - All authenticated users
- /dashboard/users - Admin only (manage users)
- /dashboard/settings - Admin only

ROLES: user, admin

SECURITY REQUIREMENTS:
- Check authentication on every page
- Check role permissions before rendering admin pages
- Server-side role verification (not just UI hiding)
- Audit log for admin actions
- Session timeout after 30 minutes of inactivity

STACK: Next.js App Router, middleware for auth

Implement proper RBAC with server-side checks.`
		},
		{
			name: 'File Upload with Validation',
			category: 'Features',
			description: 'Secure file upload with type checking',
			prompt: `Build a file upload feature with security:

ALLOWED FILES:
- Images: jpg, png, webp (max 5MB)
- Documents: pdf (max 10MB)

SECURITY REQUIREMENTS:
- Validate file type by magic bytes, not just extension
- Limit file size on both client and server
- Generate unique filenames (UUID, not user input)
- Store files outside web root or use signed URLs
- Scan for malware if possible
- No path traversal (sanitize all paths)

STACK: Next.js, AWS S3 or local storage

Validate file types properly, not just by extension.`
		}
	];

	// Security add-ons for any prompt
	const securityAddons = [
		{
			issue: 'Hardcoded Secrets',
			addon: 'Use environment variables for ALL API keys, database URLs, and secrets. Never hardcode credentials.',
			example: 'process.env.DATABASE_URL instead of "postgresql://user:pass@localhost"'
		},
		{
			issue: 'Missing Input Validation',
			addon: 'Validate ALL user input on the server with Zod or similar. Never trust client-side validation alone.',
			example: 'const schema = z.object({ email: z.string().email(), name: z.string().max(100) })'
		},
		{
			issue: 'SQL Injection',
			addon: 'Use parameterized queries or ORM. NEVER concatenate user input into SQL strings.',
			example: 'prisma.user.findUnique({ where: { id } }) instead of raw SQL with template literals'
		},
		{
			issue: 'Missing Auth Checks',
			addon: 'Check authentication on EVERY API route and server action. Use middleware for consistent enforcement.',
			example: 'if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 })'
		},
		{
			issue: 'IDOR Vulnerabilities',
			addon: 'Always verify resource OWNERSHIP, not just authentication. Include user ID in queries.',
			example: 'where: { id: resourceId, userId: session.user.id }'
		}
	];

	// Prompt patterns comparison
	const promptPatterns = [
		{
			bad: 'Build me a login page',
			good: 'Build a login page with email/password. Validate input on server, hash passwords with bcrypt, use httpOnly cookies for sessions, rate limit to 5 attempts per minute.',
			issue: 'Vague prompts generate working but insecure code'
		},
		{
			bad: 'Create a database for users',
			good: 'Create a users table with Prisma. Use parameterized queries, never expose password hashes in API responses, implement soft delete for GDPR compliance.',
			issue: 'Missing security requirements means AI picks defaults (often insecure)'
		},
		{
			bad: 'Add a file upload feature',
			good: 'Add file upload for images (jpg, png, max 5MB). Validate file type by magic bytes, generate UUID filenames, store in S3 with signed URLs, sanitize paths.',
			issue: 'Generic prompts skip critical security validations'
		},
		{
			bad: 'Make an API for my app',
			good: 'Create REST API with auth middleware on all routes. Use Zod for input validation, return proper HTTP status codes, implement rate limiting, log failed auth attempts.',
			issue: 'AI generates functional APIs without security layers'
		}
	];

	// Post-generation checklist
	const postGenChecklist = [
		{
			item: 'Search for hardcoded strings',
			description: 'Look for API keys, passwords, or connection strings in the code',
			search: 'sk_, api_key, password, secret, token'
		},
		{
			item: 'Check .env file usage',
			description: 'Verify secrets are in .env and loaded via process.env',
			search: 'process.env, import.meta.env'
		},
		{
			item: 'Verify auth on routes',
			description: 'Every API route and server action should check authentication',
			search: 'session, auth, getUser'
		},
		{
			item: 'Find raw SQL queries',
			description: 'Look for string concatenation in database queries',
			search: '${, + userId, + id, .query('
		},
		{
			item: 'Check input validation',
			description: 'User input should be validated with Zod or similar',
			search: 'z.object, z.string, schema.parse'
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
			{"@type": "ListItem", "position": 3, "name": "Bolt.new Prompts"}
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
				<span class="badge">Bolt.new</span>
				<span class="badge">Templates</span>
			</div>
			<h1>Bolt.new Prompts: Templates for Secure AI Apps</h1>
			<p class="text-secondary">Ship faster with prompts that build security in from the start</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Bolt.new generates complete apps from prompts - but generic prompts create security gaps.</strong>
				These templates include security requirements that prevent hardcoded secrets, missing auth, and SQL injection. Copy the prompts, customize for your app, and review generated code before deploying.
			</p>
		</div>

		<!-- Why Prompts Matter -->
		<section>
			<h2>Why Bolt.new prompts matter for security</h2>
			<p>
				<a href="/kb/vibe-coding-tools/bolt/">Bolt.new</a> builds working apps in minutes. That speed is the point - vibe coders ship fast. But AI defaults to functional code, not secure code. A prompt like "build me a login page" generates working authentication without rate limiting, proper session management, or input validation.
			</p>
			<p>
				The fix is simple: put security requirements in your prompt. When you tell Bolt.new to "use parameterized queries" or "validate input on the server," it follows those instructions. This guide gives you copy-paste templates with security baked in, plus patterns to add security to any prompt.
			</p>
			<p>
				These templates address the vulnerabilities we see most in vibe coded apps: <a href="/kb/security/vulnerabilities/hardcoded-secrets/">hardcoded secrets</a>, <a href="/kb/security/vulnerabilities/missing-auth/">missing authentication</a>, and <a href="/kb/security/vulnerabilities/sql-injection/">SQL injection</a>.
			</p>
		</section>

		<!-- Prompt Templates -->
		<section id="templates">
			<h2>Bolt.new prompt templates (copy-paste ready)</h2>
			<p>
				Each template includes security requirements that prevent common vulnerabilities. Copy the entire prompt, customize the specifics for your app, and paste into Bolt.new.
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

		<!-- Security Add-ons -->
		<section class="security-section">
			<h2>Security add-ons for any prompt</h2>
			<p>
				Add these phrases to any Bolt.new prompt to prevent specific vulnerabilities. Each addresses a common security gap in AI-generated code.
			</p>

			<div class="addons-list">
				{#each securityAddons as addon, i}
					<div class="card addon-card">
						<div class="addon-header">
							<span class="addon-issue">{addon.issue}</span>
							<button class="copy-btn copy-btn-small" onclick={() => copyCode(addon.addon, `addon-${i}`)}>
								{copied && copiedSection === `addon-${i}` ? 'Copied!' : 'Copy'}
							</button>
						</div>
						<p class="addon-text">{addon.addon}</p>
						<code class="addon-example">{addon.example}</code>
					</div>
				{/each}
			</div>
		</section>

		<!-- Prompt Patterns -->
		<section>
			<h2>Prompt patterns: vague vs secure</h2>
			<p>
				The difference between vulnerable and secure generated code often comes down to prompt specificity. Here are common patterns and how to improve them.
			</p>

			<div class="patterns-list">
				{#each promptPatterns as pattern, i}
					<div class="card pattern-card">
						<div class="comparison-stack">
							<div class="comparison-row">
								<div class="pattern-bad">
									<span class="pattern-label">Vague prompt</span>
									<p>"{pattern.bad}"</p>
								</div>
								<div class="pattern-good">
									<span class="pattern-label">Secure prompt</span>
									<p>"{pattern.good}"</p>
								</div>
							</div>
						</div>
						<div class="pattern-issue">
							<strong>Issue:</strong> {pattern.issue}
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- Post-Generation Checklist -->
		<section>
			<h2>Post-generation security checklist</h2>
			<p>
				Even with security-focused prompts, always review generated code. Use these searches to find common issues in Bolt.new output.
			</p>

			<div class="checklist">
				{#each postGenChecklist as check, i}
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

		<!-- Bolt.new vs Other Tools -->
		<section>
			<h2>Bolt.new vs other AI coding tools</h2>
			<p>
				Each AI tool has different strengths. Understanding when to use Bolt.new helps you choose the right tool for your project.
			</p>

			<div class="comparison-table">
				<table>
					<thead>
						<tr>
							<th>Feature</th>
							<th>Bolt.new</th>
							<th>v0</th>
							<th>Cursor</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Best for</td>
							<td>Full-stack apps</td>
							<td>UI components</td>
							<td>Code editing</td>
						</tr>
						<tr>
							<td>Output</td>
							<td>Complete project</td>
							<td>Component code</td>
							<td>Code changes</td>
						</tr>
						<tr>
							<td>Backend support</td>
							<td>Yes (APIs, DB)</td>
							<td>Limited</td>
							<td>Yes (with context)</td>
						</tr>
						<tr>
							<td>Deployment</td>
							<td>One-click</td>
							<td>Copy to project</td>
							<td>Manual</td>
						</tr>
						<tr>
							<td>Security prompts</td>
							<td>Add to initial prompt</td>
							<td>Add to initial prompt</td>
							<td>.cursorrules file</td>
						</tr>
					</tbody>
				</table>
			</div>

			<p>
				Use Bolt.new when you need a working app quickly. Use <a href="/kb/prompts/v0-prompts/">v0 prompts</a> when you need polished UI components. Use <a href="/kb/prompts/cursor-rules/">Cursor with rules</a> when you're editing existing code.
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
			<h2>Scan Your Bolt.new Projects</h2>
			<p>
				Prompts help, but they don't catch everything. <a href="https://scanner.vibeship.co">VibeShip Scanner</a> automatically detects hardcoded secrets, SQL injection, and missing auth in your Bolt.new generated code.
			</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">Scan Your Code Free →</a>
		</section>

		<!-- Related Content -->
		<section class="article-section">
			<h2>Related guides</h2>
			<div class="related-grid">
				<a href="/kb/vibe-coding-tools/bolt/" class="card card-interactive related-card">
					<div class="related-card-category">Tool Guide</div>
					<div class="related-card-title">Bolt.new Security Guide</div>
					<p class="related-card-description">Complete guide to using Bolt.new safely</p>
				</a>
				<a href="/kb/prompts/v0-prompts/" class="card card-interactive related-card">
					<div class="related-card-category">Prompts</div>
					<div class="related-card-title">v0 Prompts</div>
					<p class="related-card-description">Secure prompts for v0 components</p>
				</a>
				<a href="/kb/prompts/cursor-rules/" class="card card-interactive related-card">
					<div class="related-card-category">Config Guide</div>
					<div class="related-card-title">Cursor Rules</div>
					<p class="related-card-description">Project-level security configuration</p>
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
				<li><a href="https://bolt.new" target="_blank" rel="noopener">Bolt.new</a> - Official site</li>
				<li><a href="https://docs.bolt.new" target="_blank" rel="noopener">Bolt.new Documentation</a></li>
				<li><a href="https://owasp.org/Top10/" target="_blank" rel="noopener">OWASP Top 10</a> - Security vulnerability reference</li>
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

	p {
		line-height: 1.7;
		margin-bottom: 1rem;
	}

	a {
		color: var(--green-dim);
	}

	a:hover {
		text-decoration: underline;
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

	/* Security Section */
	.security-section {
		background: var(--bg-secondary);
		padding: 2rem;
		border: 1px solid rgba(34, 197, 94, 0.3);
	}

	.addons-list {
		display: grid;
		gap: 1rem;
		margin: 1rem 0;
	}

	.addon-card {
		padding: 1rem;
	}

	.addon-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.75rem;
	}

	.addon-issue {
		font-weight: 600;
		color: var(--orange);
	}

	.addon-text {
		margin: 0 0 0.75rem 0;
		font-size: 0.9rem;
	}

	.addon-example {
		display: block;
		font-size: 0.8rem;
		color: var(--text-secondary);
	}

	.copy-btn-small {
		font-size: 0.75rem;
		padding: 0.25rem 0.5rem;
	}

	/* Prompt Patterns */
	.patterns-list {
		display: grid;
		gap: 1.5rem;
		margin: 1.5rem 0;
	}

	.pattern-card {
		padding: 0;
		overflow: hidden;
	}

	.comparison-stack {
		display: flex;
		flex-direction: column;
	}

	.comparison-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0;
	}

	@media (max-width: 768px) {
		.comparison-row {
			grid-template-columns: 1fr;
		}
	}

	.pattern-bad,
	.pattern-good {
		padding: 1rem;
	}

	.pattern-bad {
		background: rgba(239, 68, 68, 0.1);
		border-right: 1px solid var(--border);
	}

	@media (max-width: 768px) {
		.pattern-bad {
			border-right: none;
			border-bottom: 1px solid var(--border);
		}
	}

	.pattern-good {
		background: rgba(34, 197, 94, 0.1);
	}

	.pattern-label {
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 0.5rem;
		display: block;
	}

	.pattern-bad .pattern-label {
		color: #ef4444;
	}

	.pattern-good .pattern-label {
		color: #22c55e;
	}

	.pattern-bad p,
	.pattern-good p {
		margin: 0;
		font-size: 0.9rem;
		font-style: italic;
	}

	.pattern-issue {
		padding: 0.75rem 1rem;
		background: rgba(255,255,255,0.02);
		font-size: 0.875rem;
		border-top: 1px solid var(--border);
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
		text-decoration: underline;
	}

	/* Mobile adjustments */
	@media (max-width: 768px) {
		.content-wrapper {
			padding: 1rem;
		}

		h1 {
			font-size: 1.75rem;
		}

		.security-section {
			padding: 1rem;
		}
	}
</style>
