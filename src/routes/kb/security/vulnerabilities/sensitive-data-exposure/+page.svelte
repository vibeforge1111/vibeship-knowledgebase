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
	<title>{meta.title} | VibeShip</title>
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
				<a href={owaspData.cweSource} target="_blank" rel="noopener noreferrer" class="badge">CWE-200</a>
				<a href="https://cwe.mitre.org/data/definitions/209.html" target="_blank" rel="noopener noreferrer" class="badge">CWE-209</a>
				<a href={owaspData.source} target="_blank" rel="noopener noreferrer" class="badge">OWASP A02:2021</a>
			</div>
			<h1>Sensitive Data Exposure in Vibe Coded Apps</h1>
			<p class="article-subtitle">How AI tools accidentally leak secrets through error messages, logs, and API responses</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Sensitive data exposure happens when your app reveals secrets, user data, or system info through error messages, logs, or API responses.</strong>
				AI tools generate verbose debugging code that leaks this data. Sanitize errors, filter responses, and remove console.log before production.
			</p>
		</div>

		<!-- Stats Box -->
		<div class="stats-row">
			<div class="stat-card">
				<span class="stat-value">{owaspData.ranking}</span>
				<span class="stat-label">OWASP Top 10</span>
				<span class="stat-source"><a href={owaspData.source} target="_blank" rel="noopener">{owaspData.category}</a></span>
			</div>
			<div class="stat-card">
				<span class="stat-value">CWE-200</span>
				<span class="stat-label">Information Exposure</span>
				<span class="stat-source"><a href={owaspData.cweSource} target="_blank" rel="noopener">CWE Top 25</a></span>
			</div>
			<div class="stat-card">
				<span class="stat-value">CWE-209</span>
				<span class="stat-label">Error Messages</span>
				<span class="stat-source"><a href="https://cwe.mitre.org/data/definitions/209.html" target="_blank" rel="noopener">Definition</a></span>
			</div>
			<div class="stat-card">
				<span class="stat-value">CWE-532</span>
				<span class="stat-label">Log Files</span>
				<span class="stat-source"><a href="https://cwe.mitre.org/data/definitions/532.html" target="_blank" rel="noopener">Definition</a></span>
			</div>
		</div>
		<p class="stats-note">
			Note: OWASP renamed "Sensitive Data Exposure" to "Cryptographic Failures" in 2021 to focus on root causes rather than symptoms.
		</p>

		<!-- What is it -->
		<section class="article-section">
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
		<section class="article-section">
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
		<section class="article-section">
			<h2>Pattern 1: Verbose Error Messages</h2>
			<p>
				AI tools generate error handlers that expose internal details to help with debugging. These details are goldmines for attackers.
			</p>

			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-label">
						<span class="status-icon">&#10060;</span> Vulnerable (AI Default)
					</div>
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
					<div class="code-label">
						<span class="status-icon">&#9989;</span> Secure Version
					</div>
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
		<section class="article-section">
			<h2>Pattern 2: Console.log with Sensitive Data</h2>
			<p>
				AI tools liberally add console.log to help you understand the code. In production, these logs persist in cloud services like Vercel, AWS CloudWatch, and Datadog - visible to anyone with log access.
			</p>

			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-label">
						<span class="status-icon">&#10060;</span> Vulnerable (AI Default)
					</div>
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
					<div class="code-label">
						<span class="status-icon">&#9989;</span> Secure Version
					</div>
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
		<section class="article-section">
			<h2>Pattern 3: Over-Exposed API Responses</h2>
			<p>
				AI tools return full database objects because it's easier and more "flexible." This leaks password hashes, internal flags, and data users shouldn't see.
			</p>

			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-label">
						<span class="status-icon">&#10060;</span> Vulnerable (AI Default)
					</div>
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
					<div class="code-label">
						<span class="status-icon">&#9989;</span> Secure Version
					</div>
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
		<section class="article-section">
			<h2>Pattern 4: Sensitive Data in URLs</h2>
			<p>
				AI tools sometimes put tokens, emails, and other sensitive data in URL query strings. This data ends up in server logs, browser history, proxy logs, and referrer headers.
			</p>

			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-label">
						<span class="status-icon">&#10060;</span> Vulnerable
					</div>
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
					<div class="code-label">
						<span class="status-icon">&#9989;</span> Secure Version
					</div>
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
		<section class="article-section">
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
		<section class="article-section">
			<h2>AI Fix Prompt</h2>
			<p>Copy this prompt into any AI tool to scan your code for sensitive data exposure:</p>

			<div class="fix-prompt">
				<div class="fix-prompt-header">
					<span class="fix-prompt-title">Sensitive Data Exposure Audit Prompt</span>
					<button class="copy-button" onclick={copyPrompt}>
						{copied ? 'Copied!' : 'Copy Prompt'}
					</button>
				</div>
				<pre id="ai-fix-prompt" class="fix-prompt-content">{`Review my code for sensitive data exposure vulnerabilities:

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
		<section class="article-section">
			<h2>Frequently Asked Questions</h2>
			<div class="faq-list">
				{#each faqs as faq}
					<div class="faq-item">
						<h3>{faq.question}</h3>
						<p>{faq.answer}</p>
					</div>
				{/each}
			</div>
		</section>

		<!-- Related Content -->
		<section class="article-section">
			<h2>Related content</h2>
			<div class="related-grid">
				<a href="/kb/security/vulnerabilities/hardcoded-secrets/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Hardcoded Secrets</div>
					<p class="related-card-description">Secrets embedded in code vs exposed at runtime</p>
				</a>
				<a href="/kb/security/vulnerabilities/missing-auth/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Missing Authentication</div>
					<p class="related-card-description">Data exposure is worse without authentication</p>
				</a>
				<a href="/kb/security/vulnerabilities/idor/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">IDOR</div>
					<p class="related-card-description">Accessing other users' data through object references</p>
				</a>
				<a href="/kb/vibe-coding-tools/cursor/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Cursor Security Patterns</div>
					<p class="related-card-description">Common data exposure patterns in Cursor-generated code</p>
				</a>
			</div>
		</section>
	</article>
</div>

<style>
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
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		background: var(--bg-tertiary);
		color: var(--text-secondary);
		border: 1px solid var(--border);
		text-decoration: none;
	}

	.badge:hover {
		color: var(--green);
	}

	.badge-high {
		background: var(--bg-tertiary);
		color: var(--orange);
		border-color: var(--orange);
	}

	h1 {
		font-size: 2.5rem;
		margin-bottom: 0.5rem;
		color: var(--text-primary);
	}

	.article-subtitle {
		color: var(--text-secondary);
		font-size: 1.1rem;
	}

	/* Stats Row */
	.stats-row {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.stat-card {
		text-align: center;
		padding: 1rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
	}

	.stat-value {
		display: block;
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--green-dim);
	}

	.stat-label {
		display: block;
		font-size: 0.875rem;
		color: var(--text-primary);
	}

	.stat-source {
		display: block;
		font-size: 0.75rem;
		color: var(--text-secondary);
	}

	.stat-source a {
		color: var(--text-tertiary);
	}

	.stat-source a:hover {
		color: var(--green);
	}

	.stats-note {
		font-size: 0.875rem;
		color: var(--text-secondary);
		margin-bottom: 2rem;
	}

	h2 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--border);
		color: var(--text-primary);
	}

	h3 {
		font-size: 1.2rem;
		margin-top: 1.5rem;
		margin-bottom: 0.75rem;
		color: var(--text-primary);
	}

	/* Code Comparison */
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
		background: var(--bg-primary);
		border: 1px solid var(--border);
		overflow: hidden;
		margin: 1rem 0;
	}

	.code-block.vulnerable {
		border-color: var(--red);
	}

	.code-block.secure {
		border-color: var(--green-dim);
	}

	.code-label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		background: var(--bg-tertiary);
		color: var(--text-secondary);
	}

	.vulnerable .code-label {
		color: var(--red);
	}

	.secure .code-label {
		color: var(--green-dim);
	}

	pre {
		margin: 0;
		padding: 1rem;
		overflow-x: auto;
		font-size: 0.8rem;
		line-height: 1.5;
	}

	code {
		font-family: 'JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', monospace;
		color: var(--text-primary);
	}

	/* Fix Prompt */
	.fix-prompt {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		overflow: hidden;
	}

	.fix-prompt-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		background: var(--bg-tertiary);
		border-bottom: 1px solid var(--border);
	}

	.fix-prompt-title {
		color: var(--text-primary);
		font-weight: 600;
	}

	.copy-button {
		padding: 0.5rem 1rem;
		background: var(--green-dim);
		color: var(--bg-primary);
		border: none;
		font-size: 0.75rem;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.2s;
	}

	.copy-button:hover {
		background: var(--green);
	}

	.fix-prompt-content {
		padding: 1rem;
		background: var(--bg-primary);
		color: var(--text-primary);
		font-size: 0.8rem;
		line-height: 1.6;
		white-space: pre-wrap;
	}

	/* FAQ */
	.faq-list {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.faq-item {
		padding-bottom: 1.5rem;
		border-bottom: 1px solid var(--border);
	}

	.faq-item:last-child {
		border-bottom: none;
		padding-bottom: 0;
	}

	.faq-item h3 {
		font-size: 1.1rem;
		margin-bottom: 0.5rem;
		margin-top: 0;
		color: var(--text-primary);
	}

	.faq-item p {
		margin: 0;
		color: var(--text-secondary);
	}

	/* Links */
	a {
		color: var(--green-dim);
	}

	a:hover {
		color: var(--green);
	}
</style>
