<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Sensitive Data Exposure: When AI Leaks Your Secrets',
		description: 'AI tools expose secrets in error messages, logs, and API responses. Learn CWE-200, CWE-209 patterns and how to prevent sensitive data from leaking to attackers.',
		url: '/kb/security/vulnerabilities/sensitive-data-exposure/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Sensitive Data Exposure' }
	];

	// Real external data sources
	const owaspData = {
		ranking: '#2',
		category: 'A02:2021 - Cryptographic Failures',
		source: 'https://owasp.org/Top10/A02_2021-Cryptographic_Failures/',
		cweId: 'CWE-200',
		cweSource: 'https://cwe.mitre.org/data/definitions/200.html'
	};

	// FAQ data for schema
	const faqs = [
		{
			question: 'What is sensitive data exposure?',
			answer: 'Sensitive data exposure happens when your app accidentally reveals secrets, user data, or system info through error messages, logs, or API responses. It includes exposing passwords, tokens, PII, stack traces, and internal system details to unauthorized parties.'
		},
		{
			question: 'How do I prevent stack traces in production?',
			answer: 'Configure your framework to hide stack traces in production. In Next.js, set productionBrowserSourceMaps: false. In Express, use custom error handlers that log details server-side but return generic messages to clients. Never expose error.stack to users.'
		},
		{
			question: 'What data should never be in error messages?',
			answer: 'Never include passwords, API keys, tokens, session IDs, database queries, file paths, user PII, or stack traces in error messages. Return generic messages like "An error occurred" to clients and log detailed info server-side.'
		},
		{
			question: 'How do I filter API responses to prevent data leakage?',
			answer: 'Always use explicit field selection in database queries (select: {id: true, name: true}) instead of select(*). Create DTOs (Data Transfer Objects) to transform database objects to public-safe versions. Never return raw database objects directly.'
		},
		{
			question: 'Is console.log a security risk?',
			answer: 'Yes. Console.log statements persist in cloud logging services like Vercel, AWS CloudWatch, and Datadog. Logging passwords, tokens, or full user objects exposes sensitive data. Sanitize or remove console.log before production deployment.'
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
			{"@type": "ListItem", "position": 4, "name": "Sensitive Data Exposure"}
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
				<span class="badge badge-high">High</span>
				<span class="badge">CWE-200</span>
				<span class="badge">CWE-209</span>
				<span class="badge">OWASP A02:2021</span>
			</div>
			<h1>Sensitive Data Exposure in Vibe Coded Apps</h1>
			<p class="text-secondary">How AI tools accidentally leak secrets through error messages, logs, and API responses</p>
		</header>

		<!-- Quick Answer - MUST be under 50 words -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Sensitive data exposure happens when your app reveals secrets, user data, or system info through error messages, logs, or API responses.</strong>
				AI tools generate verbose debugging code that leaks this data. Sanitize errors, filter responses, and remove console.log before production.
			</p>
		</div>

		<!-- Stats Box - Real OWASP Data -->
		<div class="stats-box">
			<h3>OWASP & CWE Classification</h3>
			<div class="stats-grid">
				<div class="stat-item">
					<span class="stat-value">{owaspData.ranking}</span>
					<span class="stat-label">OWASP Top 10</span>
					<span class="stat-source"><a href={owaspData.source} target="_blank" rel="noopener">{owaspData.category}</a></span>
				</div>
				<div class="stat-item">
					<span class="stat-value">CWE-200</span>
					<span class="stat-label">Information Exposure</span>
					<span class="stat-source"><a href={owaspData.cweSource} target="_blank" rel="noopener">CWE Top 25</a></span>
				</div>
				<div class="stat-item">
					<span class="stat-value">CWE-209</span>
					<span class="stat-label">Error Messages</span>
					<span class="stat-source"><a href="https://cwe.mitre.org/data/definitions/209.html" target="_blank" rel="noopener">Definition</a></span>
				</div>
				<div class="stat-item">
					<span class="stat-value">CWE-532</span>
					<span class="stat-label">Log Files</span>
					<span class="stat-source"><a href="https://cwe.mitre.org/data/definitions/532.html" target="_blank" rel="noopener">Definition</a></span>
				</div>
			</div>
			<p class="stats-note">
				Note: OWASP renamed "Sensitive Data Exposure" to "Cryptographic Failures" in 2021 to focus on root causes rather than symptoms.
			</p>
		</div>

		<!-- What is it -->
		<section>
			<h2>What is Sensitive Data Exposure?</h2>
			<p>
				Sensitive data exposure is when your application accidentally tells attackers things it shouldn't. This includes user credentials, API keys, database queries, stack traces, internal file paths, and personal information (PII).
			</p>
			<p>
				Unlike <a href="/kb/security/vulnerabilities/hardcoded-secrets/">hardcoded secrets</a> which are embedded in code, sensitive data exposure happens at runtime through error messages, logs, and API responses.
			</p>

			<h3>Three Ways Data Gets Exposed</h3>
			<ul>
				<li><strong>Error Messages:</strong> Stack traces and verbose errors reveal internal structure, file paths, and database schemas</li>
				<li><strong>Logs:</strong> Console.log with passwords, tokens, and user data persists in cloud logging services</li>
				<li><strong>API Responses:</strong> Full database objects returned instead of filtered, public-safe fields</li>
			</ul>
		</section>

		<!-- Why AI Tools Generate Leaky Code -->
		<section>
			<h2>Why AI Tools Generate Leaky Code</h2>
			<p>
				AI-generated code prioritizes debugging and development convenience over production security. When you ask <a href="/kb/vibe-coding-tools/cursor/">Cursor</a>, <a href="/kb/vibe-coding-tools/claude-code/">Claude Code</a>, or <a href="/kb/vibe-coding-tools/bolt/">Bolt</a> to "make it work," they generate code that helps you debug - which also helps attackers.
			</p>

			<ul>
				<li><strong>Helpful debugging code:</strong> AI adds console.log everywhere to help you understand what's happening</li>
				<li><strong>Complete error messages:</strong> AI returns full error objects to make debugging easier</li>
				<li><strong>Flexible API responses:</strong> AI returns entire database objects for "completeness"</li>
				<li><strong>Development-first thinking:</strong> Code that works in development isn't production-safe</li>
			</ul>
		</section>

		<!-- Pattern 1: Verbose Error Messages -->
		<section>
			<h2>Pattern 1: Verbose Error Messages</h2>
			<p>
				AI tools generate error handlers that expose internal details to help with debugging. These details are goldmines for attackers.
			</p>

			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-label">Vulnerable (AI Default)</div>
					<pre><code>{`// VULNERABLE: AI generates helpful error messages
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const user = await db.user.findUnique({
      where: { email: body.email }
    })
  } catch (error) {
    // Exposes internal details to attackers!
    return NextResponse.json({
      error: error.message,
      stack: error.stack,
      query: \`SELECT * FROM users WHERE email = '\${body.email}'\`
    }, { status: 500 })
  }
}`}</code></pre>
				</div>
				<div class="code-block secure">
					<div class="code-label">Secure Version</div>
					<pre><code>{`// SECURE: Generic error to client, detailed log server-side
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const user = await db.user.findUnique({
      where: { email: body.email }
    })
  } catch (error) {
    // Log detailed error server-side only
    console.error('User lookup failed:', {
      error: error.message,
      timestamp: new Date().toISOString(),
      emailPrefix: body.email?.substring(0, 3) + '***'
    })

    // Return generic error to client
    return NextResponse.json({
      error: 'An error occurred. Please try again.'
    }, { status: 500 })
  }
}`}</code></pre>
				</div>
			</div>

			<p>
				<strong>What attackers learn from verbose errors:</strong> Database type and version, table and column names, internal file paths, component versions, and sometimes even SQL queries they can use for <a href="/kb/security/vulnerabilities/sql-injection/">SQL injection</a>.
			</p>
		</section>

		<!-- Pattern 2: Console.log with Sensitive Data -->
		<section>
			<h2>Pattern 2: Console.log with Sensitive Data</h2>
			<p>
				AI tools liberally add console.log to help you understand the code. In production, these logs persist in cloud services like Vercel, AWS CloudWatch, and Datadog - visible to anyone with log access.
			</p>

			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-label">Vulnerable (AI Default)</div>
					<pre><code>{`// VULNERABLE: AI adds console.log for debugging
export async function login(email: string, password: string) {
  console.log('Login attempt:', { email, password }) // PASSWORD IN LOGS!

  const user = await authenticate(email, password)
  console.log('User authenticated:', user) // Full user object!

  const token = generateToken(user)
  console.log('Generated token:', token) // TOKEN IN LOGS!

  return token
}`}</code></pre>
				</div>
				<div class="code-block secure">
					<div class="code-label">Secure Version</div>
					<pre><code>{`// SECURE: Never log sensitive data
export async function login(email: string, password: string) {
  // Log only non-sensitive identifiers
  console.log('Login attempt for:', email.substring(0, 3) + '***')

  const user = await authenticate(email, password)
  console.log('User authenticated:', user.id) // Only ID, not full object

  const token = generateToken(user)
  // Never log tokens - log success/failure only
  console.log('Token generated successfully for user:', user.id)

  return token
}`}</code></pre>
				</div>
			</div>

			<p>
				<strong>Remember:</strong> Logs persist forever. Anyone with log access (DevOps, support, compromised accounts) can see everything you logged.
			</p>
		</section>

		<!-- Pattern 3: Over-Exposed API Responses -->
		<section>
			<h2>Pattern 3: Over-Exposed API Responses</h2>
			<p>
				AI tools return full database objects because it's easier and more "flexible." This leaks password hashes, internal flags, and data users shouldn't see.
			</p>

			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-label">Vulnerable (AI Default)</div>
					<pre><code>{`// VULNERABLE: AI returns full database object
export async function GET(request: Request) {
  const { userId } = await request.json()

  // Returns EVERYTHING including password hash!
  const user = await db.user.findUnique({
    where: { id: userId }
  })

  return NextResponse.json(user)
}

// Response includes:
// { id, email, password_hash, internal_role,
//   stripe_customer_id, phone, address, ... }`}</code></pre>
				</div>
				<div class="code-block secure">
					<div class="code-label">Secure Version</div>
					<pre><code>{`// SECURE: Return only needed fields
export async function GET(request: Request) {
  const { userId } = await request.json()

  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      avatarUrl: true,
      // Explicitly exclude: password, tokens, internal flags
    }
  })

  return NextResponse.json(user)
}

// Or use a DTO (Data Transfer Object)
function toPublicUser(user: User): PublicUser {
  return { id: user.id, name: user.name, email: user.email }
}`}</code></pre>
				</div>
			</div>
		</section>

		<!-- Pattern 4: Query Strings with Sensitive Data -->
		<section>
			<h2>Pattern 4: Sensitive Data in URLs</h2>
			<p>
				AI tools sometimes put tokens, emails, and other sensitive data in URL query strings. This data ends up in server logs, browser history, proxy logs, and referrer headers.
			</p>

			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-label">Vulnerable</div>
					<pre><code>{`// VULNERABLE: Sensitive data in URL
// GET /api/reset?token=abc123&email=user@example.com

export async function GET(request: Request) {
  const url = new URL(request.url)
  const token = url.searchParams.get('token')
  const email = url.searchParams.get('email')

  // These get logged in:
  // - Server access logs
  // - Browser history
  // - Proxy logs
  // - Referrer headers (if user clicks a link)
}`}</code></pre>
				</div>
				<div class="code-block secure">
					<div class="code-label">Secure Version</div>
					<pre><code>{`// SECURE: Use POST body for sensitive data
// POST /api/reset
// Body: { token: "abc123", email: "user@example.com" }

export async function POST(request: Request) {
  const { token, email } = await request.json()

  // Body data not logged by default
  // Not in browser history
  // Not in referrer headers
}`}</code></pre>
				</div>
			</div>

			<p>
				Per <a href="https://owasp.org/www-community/vulnerabilities/Information_exposure_through_query_strings_in_url" target="_blank" rel="noopener">OWASP guidelines</a>, never put tokens, passwords, session IDs, or PII in URL query strings.
				The <a href="https://portswigger.net/kb/issues/00600100_information-disclosure-in-error-messages" target="_blank" rel="noopener">PortSwigger Information Disclosure Guide</a> provides detailed exploitation techniques attackers use.
			</p>
		</section>

		<!-- Framework Error Configuration -->
		<section>
			<h2>Framework Error Configuration</h2>
			<p>
				Most frameworks have settings to hide detailed errors in production. Make sure these are configured correctly.
			</p>

			<div class="code-block">
				<div class="code-label">Next.js Configuration</div>
				<pre><code>{`// next.config.js
module.exports = {
  // Disable source maps in production (don't expose code)
  productionBrowserSourceMaps: false,
}`}</code></pre>
			</div>

			<div class="code-block">
				<div class="code-label">Express Custom Error Handler</div>
				<pre><code>{`// Custom error handler for Express
app.use((err, req, res, next) => {
  // Log detailed error server-side
  console.error(err.stack)

  // Return generic error based on environment
  res.status(500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message // Only in development
  })
})`}</code></pre>
			</div>
		</section>

		<!-- AI Fix Prompt -->
		<section class="fix-section">
			<h2>AI Fix Prompt</h2>
			<p>Copy this prompt into any AI tool to scan your code for sensitive data exposure:</p>

			<div class="prompt-box">
				<button class="copy-button" onclick={copyPrompt}>
					{copied ? 'Copied!' : 'Copy Prompt'}
				</button>
				<pre id="ai-fix-prompt">{`Review my code for sensitive data exposure vulnerabilities:

1. **Error Messages (CWE-209)**: Find try/catch blocks that return error.message, error.stack, or detailed error info to clients. Replace with generic messages and log details server-side only.

2. **Console.log Statements (CWE-532)**: Find console.log that includes:
   - Passwords, tokens, API keys
   - Full user objects
   - Database queries
   - Session data
   Remove or sanitize before production.

3. **API Responses (CWE-200)**: Find endpoints that return full database objects. Add explicit field selection (select: {id: true, name: true}) or use DTOs to return only public fields.

4. **Query Strings**: Find sensitive data passed in URL parameters (tokens, emails, session IDs). Move to request body for POST requests.

5. **Stack Traces**: Ensure production error pages don't expose stack traces. Configure framework error handling appropriately.

For each issue:
- Show the vulnerable code
- Show the secure replacement
- Note the CWE reference (CWE-200, CWE-209, CWE-532)`}</pre>
			</div>
		</section>

		<!-- FAQs -->
		<section>
			<h2>Frequently Asked Questions</h2>
			{#each faqs as faq}
				<div class="faq-item">
					<h3>{faq.question}</h3>
					<p>{faq.answer}</p>
				</div>
			{/each}
		</section>

		<!-- Related Content -->
		<section>
			<h2>Related Content</h2>
			<div class="related-grid">
				<a href="/kb/security/vulnerabilities/hardcoded-secrets/" class="related-card">
					<span class="related-type">Vulnerability</span>
					<span class="related-title">Hardcoded Secrets</span>
				</a>
				<a href="/kb/security/vulnerabilities/missing-auth/" class="related-card">
					<span class="related-type">Vulnerability</span>
					<span class="related-title">Missing Authentication</span>
				</a>
				<a href="/kb/security/vulnerabilities/idor/" class="related-card">
					<span class="related-type">Vulnerability</span>
					<span class="related-title">IDOR</span>
				</a>
				<a href="/kb/vibe-coding-tools/cursor/" class="related-card">
					<span class="related-type">AI Tool</span>
					<span class="related-title">Cursor Security Patterns</span>
				</a>
			</div>
		</section>
	</article>
</div>

<style>
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

	.badge {
		display: inline-block;
		padding: 0.25rem 0.75rem;
		border-radius: 4px;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		background: var(--surface-2, #333);
		color: var(--text-secondary, #aaa);
	}

	.badge-critical {
		background: #dc2626;
		color: white;
	}

	.badge-high {
		background: #ea580c;
		color: white;
	}

	.badge-medium {
		background: #ca8a04;
		color: white;
	}

	h1 {
		font-size: 2.5rem;
		margin-bottom: 0.5rem;
	}

	.text-secondary {
		color: var(--text-secondary, #888);
		font-size: 1.1rem;
	}

	.quick-answer {
		background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%);
		border: 1px solid rgba(34, 197, 94, 0.3);
		border-radius: 8px;
		padding: 1.5rem;
		margin-bottom: 2rem;
	}

	.quick-answer-label {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		color: #22c55e;
		margin-bottom: 0.5rem;
	}

	.quick-answer-text {
		margin: 0;
		line-height: 1.6;
	}

	.stats-box {
		background: var(--surface-1, #1a1a1a);
		border: 1px solid var(--border, #333);
		border-radius: 8px;
		padding: 1.5rem;
		margin-bottom: 2rem;
	}

	.stats-box h3 {
		margin-top: 0;
		margin-bottom: 1rem;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 1rem;
	}

	.stat-item {
		text-align: center;
	}

	.stat-value {
		display: block;
		font-size: 1.5rem;
		font-weight: 700;
		color: #22c55e;
	}

	.stat-label {
		display: block;
		font-size: 0.875rem;
		color: var(--text-primary, #fff);
	}

	.stat-source {
		display: block;
		font-size: 0.75rem;
		color: var(--text-secondary, #888);
	}

	.stats-note {
		margin-top: 1rem;
		font-size: 0.875rem;
		color: var(--text-secondary, #888);
	}

	section {
		margin-bottom: 3rem;
	}

	h2 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--border, #333);
	}

	h3 {
		font-size: 1.2rem;
		margin-top: 1.5rem;
		margin-bottom: 0.75rem;
	}

	.code-comparison {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		margin: 1rem 0;
	}

	@media (max-width: 768px) {
		.code-comparison {
			grid-template-columns: 1fr;
		}
	}

	.code-block {
		background: #0d0d0d;
		border: 1px solid var(--border, #333);
		border-radius: 6px;
		overflow: hidden;
		margin: 1rem 0;
	}

	.code-block.vulnerable {
		border-color: rgba(220, 38, 38, 0.3);
	}

	.code-block.secure {
		border-color: rgba(34, 197, 94, 0.3);
	}

	.code-label {
		padding: 0.5rem 1rem;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		background: var(--surface-1, #1a1a1a);
	}

	.vulnerable .code-label {
		background: rgba(220, 38, 38, 0.1);
		color: #f87171;
	}

	.secure .code-label {
		background: rgba(34, 197, 94, 0.1);
		color: #4ade80;
	}

	pre {
		margin: 0;
		padding: 1rem;
		overflow-x: auto;
		font-size: 0.8rem;
		line-height: 1.5;
	}

	code {
		font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
	}

	.fix-section {
		background: var(--surface-1, #1a1a1a);
		border-radius: 8px;
		padding: 1.5rem;
	}

	.prompt-box {
		position: relative;
		background: #0d0d0d;
		border-radius: 6px;
		overflow: hidden;
	}

	.copy-button {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		padding: 0.5rem 1rem;
		background: #22c55e;
		color: black;
		border: none;
		border-radius: 4px;
		font-size: 0.75rem;
		font-weight: 600;
		cursor: pointer;
	}

	.copy-button:hover {
		background: #16a34a;
	}

	.faq-item {
		margin-bottom: 1.5rem;
	}

	.faq-item h3 {
		font-size: 1.1rem;
		margin-bottom: 0.5rem;
		margin-top: 0;
	}

	.related-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
	}

	.related-card {
		display: block;
		padding: 1rem;
		background: var(--surface-1, #1a1a1a);
		border: 1px solid var(--border, #333);
		border-radius: 8px;
		text-decoration: none;
		transition: border-color 0.2s;
	}

	.related-card:hover {
		border-color: #22c55e;
	}

	.related-type {
		display: block;
		font-size: 0.75rem;
		color: var(--text-secondary, #888);
		text-transform: uppercase;
		margin-bottom: 0.25rem;
	}

	.related-title {
		display: block;
		font-weight: 600;
		color: var(--text-primary, #fff);
	}

	a {
		color: #22c55e;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
