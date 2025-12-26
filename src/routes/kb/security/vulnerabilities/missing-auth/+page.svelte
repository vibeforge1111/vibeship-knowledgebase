<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Broken Authentication: Fix Unprotected APIs',
		description: 'Missing authentication lets anyone access your API endpoints. Common in vibe coding when AI generates routes without auth checks. Learn to fix it.',
		url: '/kb/security/vulnerabilities/missing-auth/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Missing Authentication' }
	];

	// Real external data sources
	const owaspData = {
		ranking: '#7',
		category: 'A07:2021 - Identification and Authentication Failures',
		source: 'https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/',
		cweId: 'CWE-306',
		cweSource: 'https://cwe.mitre.org/data/definitions/306.html'
	};

	// FAQ data for schema
	const faqs = [
		{
			question: 'Why does AI-generated code often lack authentication?',
			answer: 'AI coding tools optimize for working code that fulfills your immediate request. When you ask for "an API to get user data," AI generates the endpoint logic but not the authentication wrapper because you did not explicitly ask for it. AI tools treat auth as a separate concern unless you specify it in your prompt.'
		},
		{
			question: 'Is middleware authentication enough?',
			answer: 'Middleware authentication is a good start but not always sufficient. You need both authentication (who is this user?) and authorization (can this user access this resource?). Middleware typically handles authentication, but you still need per-route authorization checks to prevent IDOR vulnerabilities.'
		},
		{
			question: 'How do I protect Next.js API routes?',
			answer: 'In Next.js App Router, use middleware.ts to protect routes globally, then add session checks in individual route handlers. For Pages Router, create a withAuth higher-order function. Always verify the session server-side, never trust client-side auth state alone.'
		},
		{
			question: 'Should internal APIs have authentication?',
			answer: 'Yes, always. Internal APIs that are "only called by your frontend" are still accessible to anyone who can find the endpoint. Attackers use browser DevTools to discover API routes, then call them directly. Every API route that returns or modifies data needs authentication.'
		},
		{
			question: 'What is the difference between authentication and authorization?',
			answer: 'Authentication verifies identity (who are you?). Authorization verifies permissions (what can you access?). Missing authentication means anyone can access the endpoint. Missing authorization means authenticated users can access resources belonging to other users. Both are critical; having one without the other is still a vulnerability.'
		}
	];

	let copied = $state(false);

	function copyPrompt() {
		const prompt = document.getElementById('ai-fix-prompt')?.textContent || '';
		navigator.clipboard.writeText(prompt);
		copied = true;
		setTimeout(() => copied = false, 2000);
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
			{"@type": "ListItem", "position": 2, "name": "Security", "item": "https://vibeship.co/kb/security"},
			{"@type": "ListItem", "position": 3, "name": "Vulnerabilities", "item": "https://vibeship.co/kb/security/vulnerabilities"},
			{"@type": "ListItem", "position": 4, "name": "Missing Authentication"}
		]
	}
	</script>`}

	<!-- Schema.org structured data -->
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
		"datePublished": "2025-12-17",
		"dateModified": "2025-12-17"
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
				<span class="badge badge-critical">Critical</span>
				<span class="badge">CWE-306</span>
				<span class="badge">OWASP A07:2021</span>
			</div>
			<h1>Missing Authentication in Vibe Coded Apps</h1>
			<p class="text-secondary">How to find and fix unprotected API routes that let anyone access your data</p>
		</header>

		<!-- Quick Answer - MUST be under 50 words -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Missing authentication means your API endpoints have no login check.</strong>
				Anyone can call them directly and access or modify data. Ranked <a href="https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/">#7 on OWASP Top 10</a>.
				AI tools generate functional routes without auth by default.
			</p>
		</div>

		<!-- Stats Box - Real OWASP Data -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">{owaspData.ranking}</div>
				<div class="stat-label">OWASP Ranking</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">{owaspData.cweId}</div>
				<div class="stat-label"><a href={owaspData.cweSource}>CWE ID</a></div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Seconds</div>
				<div class="stat-label">To exploit</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Critical</div>
				<div class="stat-label">Severity</div>
			</div>
		</div>
		<p class="data-source">
			Source: <a href={owaspData.source}>OWASP Top 10 (2021)</a>
		</p>

		<!-- What Is It -->
		<section class="article-section">
			<h2>What is missing authentication?</h2>
			<p>
				Missing authentication is when API endpoints or pages can be accessed without verifying user identity.
				When your route handler processes requests without checking if the user is logged in, anyone who discovers the endpoint can use it.
			</p>
			<p>
				Think of it like a house with no locks. The front door exists, but anyone can walk in. Even if your UI requires login, attackers bypass the frontend entirely and call your API directly.
			</p>
			<p>
				According to <a href="https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/">OWASP Top 10 (2021)</a>, identification and authentication failures rank #7 in web application security risks.
				The <a href="https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html">OWASP Authentication Cheat Sheet</a> provides comprehensive guidelines for implementing proper authentication.
				For vibe coders, this is especially common because AI generates the functionality you ask for without assuming you need authentication.
			</p>
		</section>

		<!-- AI Tool Patterns -->
		<section class="article-section">
			<h2>How do AI tools create unprotected routes?</h2>
			<p>
				AI tools create unprotected routes because they respond literally to your prompts.
				"Create an API to get user data" produces a working endpoint, but authentication is not implied in that request.
			</p>

			<div class="tool-patterns-box">
				<h3>Common AI-generated vulnerable patterns</h3>
				<p>When you ask AI tools for API endpoints, they often generate code like this:</p>
				<div class="code-block">
					<pre><code>{`// AI-generated Next.js API route - no auth check
// src/app/api/users/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await db.user.findUnique({
    where: { id: params.id }
  })
  return Response.json(user)
}

// Anyone can call: GET /api/users/123
// Returns full user data including email, created_at, etc.`}</code></pre>
				</div>
				<p class="pattern-note">
					This code <em>works perfectly</em>, which is why AI generates it. But there is no check for
					who is making the request. Any user, logged in or not, can fetch any user's data.
				</p>
			</div>

			<p>
				<strong>Why this happens:</strong> AI tools are trained to fulfill your request efficiently.
				When vibe coding and you ask for "an API endpoint," it builds exactly that, with no extras.
				Authentication is considered a separate concern that you need to explicitly request.
			</p>

			<p>
				<strong>All major AI coding tools</strong> (Cursor, Claude Code, Bolt, v0, Windsurf, and GitHub Copilot) exhibit
				this pattern. The solution is always the same: add explicit auth checks to every route that accesses protected data.
			</p>
		</section>

		<!-- What Could Happen -->
		<section class="article-section">
			<h2>What could happen if I have missing authentication?</h2>
			<p>
				Missing authentication can result in complete data exposure, unauthorized actions, account takeover, and compliance violations.
			</p>
			<ul class="consequences-list">
				<li><strong>Complete data exposure:</strong> Attackers enumerate your API to download all user data, orders, messages, or any stored information</li>
				<li><strong>Unauthorized actions:</strong> Create, modify, or delete records without permission (post as other users, change settings, delete content)</li>
				<li><strong>Account takeover:</strong> Access password reset endpoints, email change functions, or session management without auth</li>
				<li><strong>Privilege escalation:</strong> Access admin endpoints that were "hidden" but never protected</li>
				<li><strong>Compliance violations:</strong> GDPR, HIPAA, and PCI-DSS all require access controls; missing auth means automatic non-compliance</li>
			</ul>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How do I detect missing authentication?</h2>
			<p>
				Detect missing authentication by reviewing every API route and checking if it verifies user identity before processing.
				Routes without session checks, JWT validation, or auth middleware are vulnerable.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Red flags to look for</span>
				</div>
				<pre><code>{`// Next.js App Router - no auth check
export async function GET(request: Request) {
  // Immediately accesses data without verifying user
  const data = await db.query(...)
  return Response.json(data)
}

// Express - no middleware protection
app.get('/api/users/:id', async (req, res) => {
  // No req.user check, no session validation
  const user = await User.findById(req.params.id)
  res.json(user)
})

// SvelteKit - no hooks protection
export async function GET({ params }) {
  // No locals.user check
  return json(await getUser(params.id))
}

// Questions to ask for each route:
// 1. Does it check session/token before doing anything?
// 2. Is there middleware protecting this route?
// 3. Would this work if called from Postman with no cookies?`}</code></pre>
			</div>

			<div class="cta-box">
				<p><strong>Scan your routes automatically</strong></p>
				<a href="https://scanner.vibeship.co" class="btn btn-green">
					Scan your code free
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M5 12h14M12 5l7 7-7 7"/>
					</svg>
				</a>
			</div>
		</section>

		<!-- How to Fix -->
		<section class="article-section">
			<h2>How do I fix missing authentication?</h2>
			<p>
				Fix missing authentication by adding auth checks to every protected route.
				Verify user identity server-side before processing any request that accesses or modifies data.
			</p>

			<!-- AI Fix Prompt -->
			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>Copy this prompt into Cursor, Claude Code, or Bolt to automatically add authentication to your routes:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Add authentication checks to all unprotected API routes in my codebase.

## What to look for

Search for API routes that access or modify data without verifying user identity:

1. Next.js App Router (app/api/**/route.ts):
   - Routes that don't call getServerSession() or verify JWT
   - Routes that immediately query database without auth check

2. Next.js Pages Router (pages/api/*.ts):
   - Handlers without session validation
   - No getSession() or token verification

3. Express routes:
   - Routes without auth middleware
   - No req.user or req.session checks

4. SvelteKit endpoints:
   - +server.ts files without locals.user checks
   - No hooks.server.ts protection

## How to fix

Add authentication check at the start of every protected route:

### For Next.js App Router (with NextAuth):
\`\`\`typescript
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Now safe to proceed with authenticated user
  const userId = session.user.id
  // ... rest of handler
}
\`\`\`

### For Next.js with Supabase:
\`\`\`typescript
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Proceed with session.user
}
\`\`\`

### For Express:
\`\`\`typescript
// Create auth middleware
const requireAuth = (req, res, next) => {
  if (!req.session?.userId) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  next()
}

// Apply to routes
app.get('/api/users/:id', requireAuth, async (req, res) => {
  // req.session.userId is guaranteed to exist
})
\`\`\`

### For SvelteKit:
\`\`\`typescript
// src/routes/api/users/[id]/+server.ts
import { error, json } from '@sveltejs/kit'

export async function GET({ params, locals }) {
  if (!locals.user) {
    throw error(401, 'Unauthorized')
  }

  // Proceed with locals.user
}
\`\`\`

## Routes that need auth

- Any route that reads user-specific data
- Any route that creates, updates, or deletes records
- Any route that returns sensitive information
- Admin routes (also need role checks)

## Routes that might NOT need auth

- Public content (blog posts, product listings)
- Health check endpoints
- Webhook receivers (use signature verification instead)
- Auth endpoints themselves (login, register, password reset)

## After fixing

1. Test each route without auth cookies - should return 401
2. Test with valid auth - should work normally
3. List all routes you modified with the auth method used
4. Flag any routes you're unsure about for manual review

Please proceed systematically through my codebase.`}</div>
				</div>
			</div>

			<!-- Manual Fix -->
			<div class="fix-section">
				<h3>Manual Fix</h3>
				<p>The fix is always the same: <strong>verify user identity before processing the request</strong>. Return 401 Unauthorized if no valid session exists.</p>

				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-block-header">
							<span class="code-block-lang status-bad">VULNERABLE</span>
						</div>
						<pre><code>{`// No authentication - anyone can access
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await db.user.findUnique({
    where: { id: params.id }
  })
  return Response.json(user)
}

// Attacker opens DevTools, finds endpoint
// Calls: curl /api/users/admin-user-id
// Gets: Full admin user object`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-block-header">
							<span class="code-block-lang status-good">SECURE</span>
						</div>
						<pre><code>{`// With authentication check
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return Response.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  // Only return user's own data (also prevents IDOR)
  if (session.user.id !== params.id) {
    return Response.json(
      { error: 'Forbidden' },
      { status: 403 }
    )
  }

  const user = await db.user.findUnique({
    where: { id: params.id }
  })
  return Response.json(user)
}`}</code></pre>
					</div>
				</div>

				<p>
					<strong>What changed:</strong> The route now checks for a valid session before doing anything.
					It also verifies the user can only access their own data (preventing IDOR).
					Unauthenticated requests get 401, unauthorized requests get 403.
				</p>
			</div>

		</section>

		<!-- FAQ -->
		<section class="article-section">
			<h2>Frequently asked questions</h2>

			<div class="faq-list">
				{#each faqs as faq}
					<div class="faq-item">
						<h3>{faq.question}</h3>
						<p>{faq.answer}</p>
					</div>
				{/each}
			</div>
		</section>

		<!-- Related -->
		<section class="article-section">
			<h2>Related content</h2>

			<div class="related-grid">
				<a href="/kb/security/vulnerabilities/idor/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">IDOR (Insecure Direct Object Reference)</div>
					<p class="related-card-description">When users can access each other's data</p>
				</a>
				<a href="/kb/vibe-coding-tools/claude-code/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Claude Code Security Patterns</div>
					<p class="related-card-description">Common patterns in Claude Code generated apps</p>
				</a>
				<a href="/kb/security/stacks/nextjs-supabase/" class="card card-interactive related-card">
					<div class="related-card-category">Stack Guide</div>
					<div class="related-card-title">Next.js + Supabase Security</div>
					<p class="related-card-description">Complete security checklist</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Scan your code for missing authentication</h2>
			<p>Check your API routes for authentication issues and other common security vulnerabilities.</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">
				Try Vibeship Scanner
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M5 12h14M12 5l7 7-7 7"/>
				</svg>
			</a>
		</div>
	</article>
</div>

<style>
	/* Badge row */
	.badge-row {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1rem;
		flex-wrap: wrap;
	}

	/* Data Source Attribution */
	.data-source {
		font-size: 0.75rem;
		color: var(--text-tertiary);
		margin: 0.5rem 0 1.5rem;
	}

	.data-source a {
		color: var(--text-secondary);
	}

	/* Tool Patterns Box */
	.tool-patterns-box {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.tool-patterns-box h3 {
		margin: 0 0 0.75rem;
		font-size: 1rem;
	}

	.tool-patterns-box > p {
		margin: 0 0 1rem;
		color: var(--text-secondary);
	}

	.pattern-note {
		margin: 1rem 0 0 !important;
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.pattern-note code {
		background: var(--bg-tertiary);
		padding: 0.125rem 0.375rem;
		font-size: 0.8125rem;
	}

	/* Consequences List */
	.consequences-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.consequences-list li {
		padding: 0.75rem 0;
		border-bottom: 1px solid var(--border);
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.consequences-list li:last-child {
		border-bottom: none;
	}

	.consequences-list strong {
		color: var(--text-primary);
	}

	/* CTA Box */
	.cta-box {
		background: var(--bg-secondary);
		border: 1px solid var(--green-dim);
		padding: 1.5rem;
		text-align: center;
		margin: 2rem 0;
	}

	.cta-box p {
		margin: 0 0 1rem;
		color: var(--text-primary);
	}

	/* Fix Sections */
	.fix-section {
		margin: 2rem 0;
	}

	.fix-section h3 {
		margin-bottom: 0.75rem;
	}

	/* Code Comparison */
	.code-comparison {
		display: grid;
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.code-block.vulnerable .code-block-header {
		border-left: 3px solid var(--red);
	}

	.code-block.secure .code-block-header {
		border-left: 3px solid var(--green);
	}

	.status-bad {
		color: var(--red);
	}

	.status-good {
		color: var(--green);
	}

	/* Framework Links */
	.framework-links {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}

	.framework-links a {
		text-decoration: none;
	}

	.framework-name {
		display: block;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 0.25rem;
	}

	.framework-desc {
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	/* FAQ */
	.faq-list {
		margin-top: 1rem;
	}

	.faq-item {
		padding: 1.5rem 0;
		border-bottom: 1px solid var(--border);
	}

	.faq-item:last-child {
		border-bottom: none;
	}

	.faq-item h3 {
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
		font-size: 1.0625rem;
		font-weight: 600;
		margin: 0 0 0.5rem;
		color: var(--text-primary);
		line-height: 1.5;
		letter-spacing: -0.01em;
	}

	.faq-item p {
		margin: 0;
		font-size: 0.9375rem;
		line-height: 1.7;
		color: var(--text-secondary);
	}

	@media (max-width: 768px) {
		.faq-item h3 {
			font-size: 1rem;
		}
	}

	/* Final CTA */
	.final-cta {
		text-align: center;
		padding: 3rem 2rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		margin-top: 3rem;
	}

	.final-cta h2 {
		margin-bottom: 0.75rem;
	}

	.final-cta p {
		color: var(--text-secondary);
		margin-bottom: 1.5rem;
		max-width: 500px;
		margin-left: auto;
		margin-right: auto;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.framework-links {
			grid-template-columns: 1fr;
		}
	}
</style>
