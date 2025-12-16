<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'IDOR: When Users Can Access Each Other\'s Data | VibeShip',
		description: 'IDOR lets authenticated users access other users\' data by changing IDs in URLs. Common in vibe coding. Ranked #1 OWASP Top 10. Learn to fix it.',
		url: '/kb/security/vulnerabilities/idor/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'IDOR' }
	];

	// Real external data sources
	const owaspData = {
		ranking: '#1',
		category: 'A01:2021 - Broken Access Control',
		source: 'https://owasp.org/Top10/A01_2021-Broken_Access_Control/',
		cweId: 'CWE-639',
		cweSource: 'https://cwe.mitre.org/data/definitions/639.html'
	};

	// FAQ data for schema
	const faqs = [
		{
			question: 'What does IDOR stand for?',
			answer: 'IDOR stands for Insecure Direct Object Reference. It occurs when an application exposes internal object references (like database IDs) and fails to verify that the user has permission to access that specific object. The "insecure" part is the missing authorization check.'
		},
		{
			question: 'Is IDOR the same as missing authentication?',
			answer: 'No. Missing authentication means anyone can access the endpoint. IDOR means authenticated users can access resources belonging to other users. You can have proper authentication but still have IDOR. The user is logged in, but they can change /api/orders/123 to /api/orders/456 and see someone else\'s order.'
		},
		{
			question: 'Why is IDOR ranked #1 on OWASP Top 10?',
			answer: 'Broken Access Control (which includes IDOR) is ranked #1 because it is extremely common and has severe impact. Over 94% of applications tested by OWASP had some form of broken access control. IDOR is particularly prevalent in AI-generated code because AI tools focus on functionality, not authorization.'
		},
		{
			question: 'Can UUIDs prevent IDOR?',
			answer: 'UUIDs make IDOR harder to exploit through guessing, but they do not fix the vulnerability. An attacker who obtains a UUID through other means (logs, emails, browser history) can still exploit IDOR. The only real fix is proper authorization checks that verify the user owns or has permission to access the resource.'
		},
		{
			question: 'How do I test for IDOR vulnerabilities?',
			answer: 'Create two test accounts. Log in as User A, note the IDs in URLs and API responses. Log in as User B, try accessing User A\'s resources by using their IDs. If User B can see User A\'s data, you have IDOR. Tools like Burp Suite can automate this by automatically swapping IDs in requests.'
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

	<!-- Schema.org structured data -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "TechArticle",
		"headline": "${meta.title}",
		"description": "${meta.description}",
		"author": {
			"@type": "Organization",
			"name": "VibeShip"
		},
		"publisher": {
			"@type": "Organization",
			"name": "VibeShip",
			"logo": {
				"@type": "ImageObject",
				"url": "https://vibeship.co/logo.png"
			}
		},
		"datePublished": "2024-12-17",
		"dateModified": "2024-12-17"
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
				<span class="badge badge-high">High</span>
				<span class="badge">CWE-639</span>
				<span class="badge">OWASP A01:2021</span>
			</div>
			<h1>IDOR in Vibe Coded Apps</h1>
			<p class="text-secondary">How to find and fix the vulnerability that lets users access each other's data</p>
		</header>

		<!-- Quick Answer - MUST be under 50 words -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>IDOR is when users can access other users' data by changing IDs in URLs or requests.</strong>
				Change /api/orders/123 to /api/orders/456 and see someone else's order. Part of <a href="https://owasp.org/Top10/A01_2021-Broken_Access_Control/">#1 on OWASP Top 10</a>.
				AI tools check auth but skip authorization.
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
				<div class="stat-value">94%</div>
				<div class="stat-label">Apps affected (OWASP)</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">High</div>
				<div class="stat-label">Severity</div>
			</div>
		</div>
		<p class="data-source">
			Source: <a href={owaspData.source}>OWASP Top 10 (2021)</a>
		</p>

		<!-- What Is It -->
		<section class="article-section">
			<h2>What is IDOR?</h2>
			<p>
				IDOR (Insecure Direct Object Reference) is when an application exposes internal references like database IDs and fails to verify that the requesting user has permission to access that specific resource.
			</p>
			<p>
				Think of it like an apartment building where every door has a number but no locks. You live in apartment 203, but nothing stops you from opening door 456 and walking into someone else's home. The building knows who you are (authentication), but it does not check if you should access that specific apartment (authorization).
			</p>
			<p>
				According to <a href="https://owasp.org/Top10/A01_2021-Broken_Access_Control/">OWASP Top 10 (2021)</a>, Broken Access Control (which includes IDOR) ranks #1 in web application security risks.
				OWASP found that 94% of applications tested had some form of broken access control.
				For vibe coders, IDOR is especially dangerous because AI tools typically add authentication but not per-resource authorization.
			</p>
		</section>

		<!-- AI Tool Patterns -->
		<section class="article-section">
			<h2>How do AI tools create IDOR vulnerabilities?</h2>
			<p>
				AI tools create IDOR vulnerabilities by implementing authentication (checking if someone is logged in) but skipping authorization (checking if they should access this specific resource).
			</p>

			<div class="tool-patterns-box">
				<h3>Common AI-generated vulnerable patterns</h3>
				<p>When you ask AI tools for CRUD endpoints, they often generate code like this:</p>
				<div class="code-block">
					<pre><code>{`// AI-generated endpoint - has auth but no authorization
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // VULNERABLE: Returns ANY order, not just user's orders
  const order = await db.order.findUnique({
    where: { id: params.id }
  })

  return Response.json(order)
}

// User A calls: GET /api/orders/order-123 ✓ Gets their order
// User A calls: GET /api/orders/order-456 ✓ Gets User B's order!`}</code></pre>
			</div>
				<p class="pattern-note">
					This code checks authentication (user is logged in) but not authorization
					(user owns this order). Any authenticated user can access any order.
				</p>
			</div>

			<p>
				<strong>Why this happens:</strong> When vibe coding and you ask for "an API to get order details,"
				AI understands you need auth and adds it. But authorization requires understanding your data model,
				specifically which orders belong to which users. AI does not automatically infer this relationship
				from a simple prompt.
			</p>

			<p>
				<strong>All major AI coding tools</strong> (Cursor, Claude Code, Bolt, v0, Windsurf, and GitHub Copilot)
				exhibit this pattern. The fix requires explicitly checking resource ownership in every endpoint.
			</p>
		</section>

		<!-- What Could Happen -->
		<section class="article-section">
			<h2>What could happen if I have IDOR?</h2>
			<p>
				IDOR can result in complete data breach, privacy violations, data manipulation, and financial fraud.
			</p>
			<ul class="consequences-list">
				<li><strong>Mass data theft:</strong> Attackers enumerate IDs (123, 124, 125...) to download all user data, orders, messages, or documents</li>
				<li><strong>Privacy violations:</strong> Access personal information, medical records, financial data, private messages of other users</li>
				<li><strong>Data manipulation:</strong> Modify other users' profiles, change their settings, update their records</li>
				<li><strong>Financial fraud:</strong> View other users' payment info, modify transactions, access invoices with sensitive data</li>
				<li><strong>Account takeover:</strong> Access password reset tokens, session data, or account recovery information for other users</li>
			</ul>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How do I detect IDOR?</h2>
			<p>
				Detect IDOR by reviewing every endpoint that takes an ID parameter and checking if it verifies the user owns or has permission to access that resource.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Red flags to look for</span>
				</div>
				<pre><code>{`// Pattern 1: Direct database lookup with user-provided ID
const order = await db.order.findUnique({
  where: { id: params.id }  // No check that user owns this order
})

// Pattern 2: Auth check but no ownership check
if (!session) return unauthorized()
const document = await getDocument(params.documentId)  // Any user's document

// Pattern 3: Filtering by ID but not by user
const invoice = invoices.find(i => i.id === params.invoiceId)  // Not filtered by userId

// Testing checklist:
// 1. Find all routes with :id, [id], {id} parameters
// 2. For each, check: does it verify user owns/can access this ID?
// 3. Test: can User A access User B's resources by changing the ID?

// Manual test:
// 1. Login as User A, create an order, note the ID
// 2. Login as User B
// 3. Try to access User A's order ID - if it works, you have IDOR`}</code></pre>
			</div>

			<div class="cta-box">
				<p><strong>Scan your endpoints automatically</strong></p>
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
			<h2>How do I fix IDOR?</h2>
			<p>
				Fix IDOR by adding authorization checks that verify the authenticated user owns or has permission to access the requested resource.
				Always filter queries by user ID or check ownership before returning data.
			</p>

			<!-- AI Fix Prompt -->
			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>Copy this prompt into Cursor, Claude Code, or Bolt to automatically fix IDOR in your codebase:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Fix all IDOR (Insecure Direct Object Reference) vulnerabilities in my codebase.

## What to look for

Search for API routes that:
1. Take an ID parameter (params.id, req.params.id, [id], etc.)
2. Fetch a resource using that ID
3. Do NOT verify the current user owns or can access that resource

Common vulnerable patterns:

\`\`\`javascript
// VULNERABLE: No ownership check
const order = await db.order.findUnique({ where: { id: params.id } })

// VULNERABLE: Auth exists but no authorization
if (!session) return unauthorized()
const document = await db.document.findUnique({ where: { id } })
\`\`\`

## How to fix

Add ownership/permission checks to every resource lookup:

### Option 1: Filter by user ID in query (preferred)
\`\`\`typescript
// Before (vulnerable)
const order = await db.order.findUnique({
  where: { id: params.id }
})

// After (secure) - only returns if user owns it
const order = await db.order.findUnique({
  where: {
    id: params.id,
    userId: session.user.id  // Add ownership filter
  }
})

if (!order) {
  return Response.json({ error: 'Not found' }, { status: 404 })
}
\`\`\`

### Option 2: Explicit ownership check
\`\`\`typescript
// Fetch then verify
const order = await db.order.findUnique({
  where: { id: params.id }
})

if (!order) {
  return Response.json({ error: 'Not found' }, { status: 404 })
}

// Check ownership
if (order.userId !== session.user.id) {
  return Response.json({ error: 'Forbidden' }, { status: 403 })
}
\`\`\`

### Option 3: For shared resources, check permissions
\`\`\`typescript
// Document shared with multiple users
const document = await db.document.findUnique({
  where: { id: params.id },
  include: { shares: true }
})

const canAccess =
  document.ownerId === session.user.id ||
  document.shares.some(s => s.userId === session.user.id)

if (!canAccess) {
  return Response.json({ error: 'Forbidden' }, { status: 403 })
}
\`\`\`

## Resource types to check

- User profiles (/api/users/[id])
- Orders (/api/orders/[id])
- Documents (/api/documents/[id])
- Messages (/api/messages/[id])
- Comments (/api/comments/[id])
- Settings (/api/settings/[id])
- Any resource with user-provided ID

## For Supabase with RLS

If using Supabase, also verify RLS policies:
\`\`\`sql
-- Ensure RLS is enabled
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policy: users can only see their own orders
CREATE POLICY "Users can view own orders"
ON orders FOR SELECT
USING (user_id = auth.uid());
\`\`\`

## After fixing

1. Test with two accounts - User A should NOT access User B's resources
2. Return 404 (not 403) to avoid revealing that a resource exists
3. List all endpoints you modified with before/after snippets

Please proceed systematically through my codebase.`}</div>
				</div>
			</div>

			<!-- Manual Fix -->
			<div class="fix-section">
				<h3>Manual Fix</h3>
				<p>The fix is always the same: <strong>verify the user owns or has permission to access the resource</strong> before returning or modifying it.</p>

				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-block-header">
							<span class="code-block-lang status-bad">VULNERABLE</span>
						</div>
						<pre><code>{`// Has authentication, but no authorization
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // IDOR: Returns ANY order, not just user's
  const order = await db.order.findUnique({
    where: { id: params.id }
  })

  return Response.json(order)
}

// Any logged-in user can view any order`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-block-header">
							<span class="code-block-lang status-good">SECURE</span>
						</div>
						<pre><code>{`// With authorization check
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // SECURE: Only returns if user owns this order
  const order = await db.order.findUnique({
    where: {
      id: params.id,
      userId: session.user.id  // Ownership filter
    }
  })

  if (!order) {
    // Return 404, not 403, to not reveal existence
    return Response.json({ error: 'Not found' }, { status: 404 })
  }

  return Response.json(order)
}`}</code></pre>
					</div>
				</div>

				<p>
					<strong>What changed:</strong> The query now includes <code>userId: session.user.id</code> which
					means it only returns an order if both the ID matches AND the user owns it. We return 404
					instead of 403 to avoid revealing that the resource exists to unauthorized users.
				</p>
			</div>

			<!-- Framework-Specific -->
			<div class="fix-section">
				<h3>Framework-specific fixes</h3>
				<div class="framework-links">
					<a href="/kb/security/fixes/idor/nextjs/" class="card card-interactive">
						<span class="framework-name">Next.js</span>
						<span class="framework-desc">App Router patterns</span>
					</a>
					<a href="/kb/security/fixes/idor/express/" class="card card-interactive">
						<span class="framework-name">Express</span>
						<span class="framework-desc">Middleware approach</span>
					</a>
					<a href="/kb/security/fixes/idor/prisma/" class="card card-interactive">
						<span class="framework-name">Prisma</span>
						<span class="framework-desc">Query patterns</span>
					</a>
					<a href="/kb/security/fixes/idor/supabase/" class="card card-interactive">
						<span class="framework-name">Supabase</span>
						<span class="framework-desc">RLS policies</span>
					</a>
				</div>
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
				<a href="/kb/security/vulnerabilities/missing-auth/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Missing Authentication</div>
					<p class="related-card-description">Unprotected API routes anyone can access</p>
				</a>
				<a href="/kb/security/ai-patterns/cursor/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Cursor Security Patterns</div>
					<p class="related-card-description">Common patterns in Cursor-generated code</p>
				</a>
				<a href="/kb/security/stacks/nextjs-supabase/" class="card card-interactive related-card">
					<div class="related-card-category">Stack Guide</div>
					<div class="related-card-title">Next.js + Supabase Security</div>
					<p class="related-card-description">RLS and authorization patterns</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Scan your code for IDOR vulnerabilities</h2>
			<p>Check your API endpoints for authorization issues and other common security vulnerabilities.</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">
				Try VibeShip Scanner
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
