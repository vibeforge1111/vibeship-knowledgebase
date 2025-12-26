<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Unrestricted Resource Consumption: API Rate Limiting Guide',
		description: 'Unrestricted resource consumption lets attackers crash your API or drain your wallet. OWASP API4:2023. Rate limit checklists for vibe coders.',
		url: '/kb/security/vulnerabilities/unrestricted-resource-consumption/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Unrestricted Resource Consumption' }
	];

	// External data sources
	const owaspData = {
		ranking: '#4',
		category: 'API4:2023',
		source: 'https://owasp.org/API-Security/editions/2023/en/0xa4-unrestricted-resource-consumption/',
		cweId: 'CWE-400',
		cweSource: 'https://cwe.mitre.org/data/definitions/400.html'
	};

	// FAQ data for schema
	const faqs = [
		{
			question: 'What is unrestricted resource consumption in APIs?',
			answer: 'Unrestricted resource consumption occurs when an API lacks limits on how many requests a client can make, how much data they can upload, or how many resources they can consume. Attackers exploit this to crash services, inflate cloud bills, or deny legitimate users access. Every public API endpoint needs request limits, payload size caps, and execution timeouts.'
		},
		{
			question: 'Why do AI coding tools skip rate limiting?',
			answer: 'AI tools optimize for working code, not production-ready code. Rate limiting adds complexity that makes demos fail. When vibe coding an API endpoint, the AI delivers functional routes without throttling, pagination limits, or file size checks. The generated code works perfectly until someone sends 10,000 requests per second.'
		},
		{
			question: 'How do I implement rate limiting in Next.js API routes?',
			answer: 'Use middleware-based rate limiting with libraries like rate-limiter-flexible or upstash/ratelimit. Track requests by IP address or authenticated user ID. For Next.js, implement in middleware.ts to catch requests before they hit your API handlers. Set limits like 100 requests per minute for authenticated users, 20 per minute for public endpoints.'
		},
		{
			question: 'What resources should I limit besides request rate?',
			answer: 'Limit file upload sizes, response payload sizes, pagination page sizes, query complexity for GraphQL, execution time for long-running operations, and concurrent connections per user. Each unlimited resource is an attack vector. A missing file size limit can fill your storage. Missing pagination limits can dump your entire database in one request.'
		},
		{
			question: 'How do attackers exploit missing rate limits?',
			answer: 'Attackers run credential stuffing attacks testing millions of password combinations, scrape entire databases through paginated endpoints without limits, trigger massive cloud bills through API abuse, or simply crash services with request floods. Tools like Burp Suite and custom scripts make this trivial. A single attacker with a VPN can cycle through IP addresses to bypass basic rate limits.'
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
			{"@type": "ListItem", "position": 4, "name": "Unrestricted Resource Consumption"}
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
		"datePublished": "2025-12-26",
		"dateModified": "2025-12-26"
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
				<span class="badge">CWE-400</span>
				<span class="badge">OWASP API4:2023</span>
			</div>
			<h1>Unrestricted Resource Consumption in Vibe Coded APIs</h1>
			<p class="text-secondary">The vulnerability that crashes your app or drains your cloud budget</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Unrestricted resource consumption happens when APIs accept unlimited requests, file uploads, or data queries without any throttling.</strong>
				Attackers exploit this to crash services, run credential stuffing attacks, or generate massive cloud bills. Ranked <a href="https://owasp.org/API-Security/editions/2023/en/0xa4-unrestricted-resource-consumption/">#4 in OWASP API Security Top 10 (2023)</a>.
				AI coding tools rarely add rate limiting by default, making vibe coded applications prime targets.
			</p>
		</div>

		<!-- Stats Box -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">{owaspData.ranking}</div>
				<div class="stat-label">OWASP API Ranking</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">{owaspData.cweId}</div>
				<div class="stat-label"><a href={owaspData.cweSource}>CWE ID</a></div>
			</div>
			<div class="stat-box">
				<div class="stat-value">$10K+</div>
				<div class="stat-label">Typical Cloud Bill Impact</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">High</div>
				<div class="stat-label">Severity</div>
			</div>
		</div>
		<p class="data-source">
			Source: <a href={owaspData.source}>OWASP API Security Top 10 (2023)</a>
		</p>

		<!-- What Is It -->
		<section class="article-section">
			<h2>What is unrestricted resource consumption?</h2>
			<p>
				Unrestricted resource consumption is what happens when an API has no limits on how clients can use it.
				No rate limiting. No file size caps. No pagination limits. No execution timeouts.
				Every security review flags this. Every production incident post-mortem mentions it.
			</p>
			<p>
				The <a href="https://owasp.org/API-Security/editions/2023/en/0xa4-unrestricted-resource-consumption/">OWASP API Security project</a> ranks this as the #4 API vulnerability because the impact is immediate and devastating.
				An attacker sends thousands of requests per second. Your database connection pool exhausts. Your serverless functions scale infinitely, generating infinite bills. Legitimate users get locked out.
			</p>
			<p>
				According to <a href="https://cwe.mitre.org/data/definitions/400.html">CWE-400</a>, this weakness allows attackers to consume disproportionate amounts of system resources relative to what the input requires.
				The fix is straightforward: define and enforce limits. The problem is that vibe coding tools skip this entirely.
			</p>
		</section>

		<!-- AI Tool Patterns -->
		<section class="article-section">
			<h2>How do AI tools cause unrestricted resource consumption?</h2>
			<p>
				AI coding tools generate functional endpoints without operational safeguards.
				They optimize for code that works in demos, not code that survives production traffic.
				This pattern appears in every code review of vibe coded APIs.
			</p>

			<div class="review-finding">
				<h3>Review Finding: Missing Rate Limits</h3>
				<p>This pattern gets flagged in every security audit of vibe coded applications:</p>
				<div class="code-block">
					<pre><code>{`// Generated by Cursor, Bolt, Claude Code - all of them
export async function POST(request: Request) {
  const { email, password } = await request.json()

  // No rate limiting
  // No request validation
  // No timeout
  const user = await db.user.findUnique({ where: { email } })

  if (user && await bcrypt.compare(password, user.password)) {
    return Response.json({ token: generateToken(user) })
  }

  return Response.json({ error: 'Invalid credentials' }, { status: 401 })
}`}</code></pre>
				</div>
				<p class="finding-note">
					<strong>Audit note:</strong> This login endpoint allows unlimited authentication attempts.
					An attacker can run credential stuffing attacks testing thousands of password combinations per minute.
					The endpoint should limit attempts to 5 per IP address per 15 minutes.
				</p>
			</div>

			<h3>Resource Consumption Checklist</h3>
			<p>Before shipping any API endpoint, verify these controls exist:</p>
			<ul class="checklist-items">
				<li><strong>Request rate limiting</strong> - Maximum requests per time window per client</li>
				<li><strong>Payload size limits</strong> - Maximum request body size (typically 1-10MB)</li>
				<li><strong>Pagination caps</strong> - Maximum items per page (typically 100)</li>
				<li><strong>Execution timeouts</strong> - Maximum processing time per request</li>
				<li><strong>Concurrent request limits</strong> - Maximum simultaneous requests per user</li>
				<li><strong>File upload restrictions</strong> - Size limits, file type validation, storage quotas</li>
			</ul>
			<p>
				Missing any of these controls violates the principle of resource conservation.
				AI-generated endpoints typically miss all of them.
			</p>
		</section>

		<!-- What Could Happen -->
		<section class="article-section">
			<h2>What happens when resources go unrestricted?</h2>
			<p>
				These scenarios appear in production incident reports regularly. Each represents a different attack surface.
			</p>
			<ul class="consequences-list">
				<li><strong>Denial of Service:</strong> Attacker floods endpoints with requests. Server resources exhaust. Legitimate users get connection timeouts or error pages. Service goes down without any sophisticated attack.</li>
				<li><strong>Credential stuffing:</strong> Login endpoints without rate limits allow millions of password attempts. Attackers use leaked credential lists from other breaches. Accounts get compromised at scale.</li>
				<li><strong>Cloud bill attacks:</strong> Serverless functions without request limits scale indefinitely. API Gateway charges per million requests. One weekend of abuse generates five-figure invoices.</li>
				<li><strong>Database exhaustion:</strong> Endpoints returning large datasets without pagination allow full table dumps. Connection pools exhaust. Query performance degrades for all users.</li>
				<li><strong>Storage filling:</strong> File upload endpoints without size limits let attackers fill disk space. Application crashes when storage capacity reaches zero. Backup processes fail.</li>
			</ul>
			<p>
				The common thread: limits that should exist at the application layer are missing entirely.
				Infrastructure rate limits (Cloudflare, API Gateway) help but don't replace application-level controls.
			</p>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How do I detect missing resource limits?</h2>
			<p>
				In code review, these patterns indicate unrestricted resource consumption.
				Search for API route handlers and verify each one has corresponding rate limiting and validation.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Patterns to flag in review</span>
				</div>
				<pre><code>{`// API routes without rate limiting middleware
export async function POST(request: Request) { ... }
export async function GET(request: Request) { ... }

// Database queries without pagination
const users = await db.user.findMany()  // Returns ALL records
const posts = await prisma.post.findMany({ where: { authorId } })

// File uploads without size validation
const file = formData.get('file')
await writeFile(uploadPath, Buffer.from(await file.arrayBuffer()))

// Search patterns for security review:
// - Route handlers without limit/throttle imports
// - findMany() without take/skip parameters
// - File operations without size checks
// - No timeout wrappers on external API calls`}</code></pre>
			</div>

			<div class="cta-box">
				<p><strong>Want automated detection?</strong></p>
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
			<h2>How do I fix unrestricted resource consumption?</h2>
			<p>
				Implementing proper resource controls requires adding limits at multiple layers.
				The following prompt and manual fixes address the most common gaps found in vibe coded applications.
			</p>

			<!-- AI Fix Prompt -->
			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>This prompt systematically adds resource limits to API endpoints. Copy it into Cursor, Claude Code, or Bolt:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Fix unrestricted resource consumption vulnerabilities in my API.

## What to look for

Search for these unprotected patterns:

1. API route handlers without rate limiting:
   - export async function POST/GET/PUT/DELETE(request: Request)
   - app.post/get/put/delete('/path', handler)
   - No throttle/limit middleware applied

2. Database queries without pagination:
   - findMany() without take/skip
   - Queries returning unbounded result sets
   - No maximum page size enforcement

3. File uploads without restrictions:
   - No file size validation
   - No file type checking
   - No storage quota enforcement

4. External API calls without timeouts:
   - fetch() without AbortController
   - Axios calls without timeout config

## How to fix

### Add rate limiting (Next.js + Upstash):
\`\`\`typescript
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
})

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1'
  const { success, remaining } = await ratelimit.limit(ip)

  if (!success) {
    return Response.json({ error: 'Rate limit exceeded' }, {
      status: 429,
      headers: { 'Retry-After': '10' }
    })
  }
  // ... rest of handler
}
\`\`\`

### Add pagination limits:
\`\`\`typescript
const MAX_PAGE_SIZE = 100
const DEFAULT_PAGE_SIZE = 20

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1'))
  const limit = Math.min(MAX_PAGE_SIZE, parseInt(searchParams.get('limit') ?? String(DEFAULT_PAGE_SIZE)))

  const items = await db.item.findMany({
    skip: (page - 1) * limit,
    take: limit
  })
  // ...
}
\`\`\`

### Add file upload limits:
\`\`\`typescript
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf']

export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get('file') as File

  if (!file) return Response.json({ error: 'No file' }, { status: 400 })
  if (file.size > MAX_FILE_SIZE) return Response.json({ error: 'File too large' }, { status: 413 })
  if (!ALLOWED_TYPES.includes(file.type)) return Response.json({ error: 'Invalid type' }, { status: 415 })
  // ...
}
\`\`\`

### Add request timeouts:
\`\`\`typescript
const controller = new AbortController()
const timeoutId = setTimeout(() => controller.abort(), 5000)

try {
  const response = await fetch(externalUrl, { signal: controller.signal })
} finally {
  clearTimeout(timeoutId)
}
\`\`\`

## After fixing

1. Document rate limits in API documentation
2. Add monitoring for rate limit hits (indicates attacks or undersized limits)
3. Configure infrastructure-level limits as backup (Cloudflare, API Gateway)
4. List all files modified with before/after snippets

Please proceed systematically through my codebase.`}</div>
				</div>
			</div>

			<!-- Manual Fix -->
			<div class="fix-section">
				<h3>Manual Fix: Rate Limiting</h3>
				<p>The core fix is adding rate limiting middleware to every public endpoint. Here is the pattern that should be applied:</p>

				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-block-header">
							<span class="code-block-lang status-bad">VULNERABLE</span>
						</div>
						<pre><code>{`// No rate limiting - unlimited requests allowed
export async function POST(request: Request) {
  const { email, password } = await request.json()

  const user = await db.user.findUnique({
    where: { email }
  })

  if (!user || !await verify(password, user.password)) {
    return Response.json({ error: 'Invalid' }, { status: 401 })
  }

  return Response.json({ token: sign({ id: user.id }) })
}

// An attacker can test millions of passwords
// No throttling, no lockout, no detection`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-block-header">
							<span class="code-block-lang status-good">SECURE</span>
						</div>
						<pre><code>{`import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '15 m'), // 5 attempts per 15 min
})

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1'
  const { success } = await ratelimit.limit(\`login:\${ip}\`)

  if (!success) {
    return Response.json(
      { error: 'Too many attempts. Try again later.' },
      { status: 429, headers: { 'Retry-After': '900' } }
    )
  }

  const { email, password } = await request.json()
  // ... rest of authentication logic
}`}</code></pre>
					</div>
				</div>

				<p>
					<strong>Key changes:</strong> The endpoint now limits login attempts to 5 per IP address per 15-minute window.
					Attackers running credential stuffing attacks get blocked after 5 failures.
					The <code>Retry-After</code> header tells clients when they can try again.
					This is the minimum acceptable configuration for authentication endpoints.
				</p>
			</div>

			<!-- Rate Limit Recommendations -->
			<div class="fix-section">
				<h3>Rate Limit Recommendations by Endpoint Type</h3>
				<div class="table-wrapper">
					<table>
						<thead>
							<tr>
								<th>Endpoint Type</th>
								<th>Recommended Limit</th>
								<th>Rationale</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Login/Auth</td>
								<td>5 per 15 minutes</td>
								<td>Prevents credential stuffing</td>
							</tr>
							<tr>
								<td>Password Reset</td>
								<td>3 per hour</td>
								<td>Prevents email bombing</td>
							</tr>
							<tr>
								<td>API (Authenticated)</td>
								<td>100-1000 per minute</td>
								<td>Depends on use case</td>
							</tr>
							<tr>
								<td>API (Public)</td>
								<td>20-60 per minute</td>
								<td>Stricter for unauthenticated</td>
							</tr>
							<tr>
								<td>File Upload</td>
								<td>10 per hour + size limit</td>
								<td>Prevents storage abuse</td>
							</tr>
							<tr>
								<td>Search/Query</td>
								<td>30 per minute</td>
								<td>Database protection</td>
							</tr>
						</tbody>
					</table>
				</div>
				<p>
					These limits serve as starting points. Monitor actual usage patterns and adjust based on legitimate user behavior.
					Limits that are too strict frustrate users. Limits that are too loose fail to protect.
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
				<a href="/kb/security/vulnerabilities/bola/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Broken Object Level Authorization</div>
					<p class="related-card-description">OWASP API #1 - accessing other users' data</p>
				</a>
				<a href="/kb/security/vulnerabilities/credential-stuffing/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Credential Stuffing</div>
					<p class="related-card-description">Automated login attacks with leaked credentials</p>
				</a>
				<a href="/kb/security/stacks/nextjs-supabase/" class="card card-interactive related-card">
					<div class="related-card-category">Stack Guide</div>
					<div class="related-card-title">Next.js + Supabase Security</div>
					<p class="related-card-description">Complete security checklist for the popular stack</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Find missing rate limits before attackers do</h2>
			<p>Unrestricted endpoints are the easiest targets. Get a complete audit of your API security.</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">
				Scan your code now
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

	/* Review Finding Box */
	.review-finding {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.review-finding h3 {
		margin: 0 0 0.75rem;
		font-size: 1rem;
	}

	.review-finding > p {
		margin: 0 0 1rem;
		color: var(--text-secondary);
	}

	.finding-note {
		margin: 1rem 0 0;
		padding: 1rem;
		background: var(--bg-tertiary);
		border-left: 3px solid var(--orange);
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	/* Checklist Items */
	.checklist-items {
		list-style: none;
		padding: 0;
		margin: 1rem 0;
	}

	.checklist-items li {
		padding: 0.5rem 0 0.5rem 1.5rem;
		position: relative;
		color: var(--text-secondary);
		border-bottom: 1px solid var(--border);
	}

	.checklist-items li:last-child {
		border-bottom: none;
	}

	.checklist-items li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.75rem;
		width: 12px;
		height: 12px;
		border: 2px solid var(--border-strong);
	}

	.checklist-items li strong {
		color: var(--text-primary);
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

	/* Table wrapper */
	.table-wrapper {
		overflow-x: auto;
		margin: 1rem 0;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.checklist-items li {
			padding-left: 1.25rem;
		}
	}
</style>
