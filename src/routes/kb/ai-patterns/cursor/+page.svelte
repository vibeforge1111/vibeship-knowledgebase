<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Cursor Security Patterns: Common Vulnerabilities in Cursor-Generated Code | VibeShip',
		description: 'Security patterns in Cursor AI-generated code. Learn about SQL injection, template literals, and other vulnerabilities Cursor commonly generates.',
		url: '/kb/ai-patterns/cursor/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'AI Patterns', href: '/kb/ai-patterns' },
		{ label: 'Cursor' }
	];

	// Security patterns specific to Cursor
	const patterns = [
		{
			name: 'SQL Injection via Template Literals',
			severity: 'Critical',
			description: 'Cursor generates template literals for database queries because they are readable. This creates SQL injection vulnerabilities.',
			example: `// Cursor often generates this:
const getUser = async (userId) => {
  const result = await db.query(\`
    SELECT * FROM users WHERE id = \${userId}
  \`)
  return result.rows[0]
}`,
			fix: `// Secure version:
const getUser = async (userId) => {
  const result = await db.query(
    'SELECT * FROM users WHERE id = $1',
    [userId]
  )
  return result.rows[0]
}`,
			link: '/kb/security/vulnerabilities/sql-injection/'
		},
		{
			name: 'Inline Database Credentials',
			severity: 'Critical',
			description: 'Cursor sometimes hardcodes database connection strings directly in code for quick setup.',
			example: `// Cursor might generate:
const pool = new Pool({
  connectionString: 'postgresql://admin:password123@localhost:5432/mydb'
})`,
			fix: `// Secure version:
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})`,
			link: '/kb/security/vulnerabilities/hardcoded-secrets/'
		},
		{
			name: 'Missing Authentication on Routes',
			severity: 'Critical',
			description: 'When you ask Cursor for an API endpoint, it builds the functionality without auth checks unless you explicitly request them.',
			example: `// Cursor generates functional but unprotected routes:
export async function GET(request, { params }) {
  const order = await db.order.findUnique({
    where: { id: params.id }
  })
  return Response.json(order)
}`,
			fix: `// With auth check:
export async function GET(request, { params }) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  // ... rest of handler
}`,
			link: '/kb/security/vulnerabilities/missing-auth/'
		},
		{
			name: 'IDOR in CRUD Operations',
			severity: 'High',
			description: 'Cursor adds authentication but often skips authorization checks, allowing users to access each other\'s resources.',
			example: `// Auth exists but no ownership check:
if (!session) return unauthorized()

const document = await db.document.findUnique({
  where: { id: params.id }  // Any document, not user's
})`,
			fix: `// With ownership check:
const document = await db.document.findUnique({
  where: {
    id: params.id,
    userId: session.user.id  // Only user's documents
  }
})`,
			link: '/kb/security/vulnerabilities/idor/'
		},
		{
			name: 'Client-Side Only Validation',
			severity: 'Medium',
			description: 'Cursor may add form validation only on the client side, which attackers can bypass by calling the API directly.',
			example: `// Client validation only:
const handleSubmit = (e) => {
  if (!email.includes('@')) {
    setError('Invalid email')
    return
  }
  // Submits to API that has no validation
  fetch('/api/users', { body: JSON.stringify({ email }) })
}`,
			fix: `// Add server-side validation:
export async function POST(request) {
  const { email } = await request.json()

  // Server-side validation
  if (!email || !email.includes('@')) {
    return Response.json({ error: 'Invalid email' }, { status: 400 })
  }
  // ... proceed
}`,
			link: '/kb/security/vulnerabilities/xss/'
		}
	];

	// FAQ data
	const faqs = [
		{
			question: 'Is Cursor less secure than other AI coding tools?',
			answer: 'No. Cursor exhibits the same security patterns as other AI coding tools like Claude Code, Copilot, and Bolt. All AI tools prioritize generating working code over secure code. The specific vulnerabilities vary slightly, but the root cause is the same: AI optimizes for functionality, not security.'
		},
		{
			question: 'How do I make Cursor generate more secure code?',
			answer: 'Be explicit in your prompts. Instead of "create an API to get user orders," say "create an authenticated API to get orders that belong to the logged-in user only." Mention security requirements explicitly: parameterized queries, authentication, authorization, input validation.'
		},
		{
			question: 'Should I stop using Cursor for security-sensitive code?',
			answer: 'No. Cursor is a powerful tool that significantly speeds up development. The key is to review generated code for security issues before committing. Use VibeShip Scanner or manual review to catch vulnerabilities. AI-generated code needs the same security review as human-written code.'
		},
		{
			question: 'Does Cursor\'s model choice affect security?',
			answer: 'Cursor supports multiple models (Claude, GPT-4, etc.). While some models may have slightly different tendencies, all models exhibit similar security blind spots. The vulnerabilities come from training data patterns and the nature of code generation, not from a specific model.'
		},
		{
			question: 'Can Cursor fix its own security issues?',
			answer: 'Yes. You can paste our AI fix prompts directly into Cursor and ask it to fix vulnerabilities. Cursor is good at refactoring code once you tell it what to look for. The challenge is knowing what to ask, which is why this knowledge base exists.'
		}
	];

	let copied = $state(false);
	let copiedIndex = $state(-1);

	function copyCode(code: string, index: number) {
		navigator.clipboard.writeText(code);
		copied = true;
		copiedIndex = index;
		setTimeout(() => {
			copied = false;
			copiedIndex = -1;
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
				<span class="badge">AI Tool</span>
				<span class="badge">VS Code</span>
			</div>
			<h1>Cursor Security Patterns</h1>
			<p class="text-secondary">Common security vulnerabilities in code generated by Cursor AI</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Cursor's top security issue is SQL injection via template literals.</strong>
				It also commonly generates routes without authentication, CRUD operations without authorization checks, and sometimes hardcodes credentials for quick setup.
			</p>
		</div>

		<!-- Stats Box -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">SQL Injection</div>
				<div class="stat-label">Top Issue</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Template Literals</div>
				<div class="stat-label">Common Pattern</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">5</div>
				<div class="stat-label">Key Patterns</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Fixable</div>
				<div class="stat-label">With Prompts</div>
			</div>
		</div>

		<!-- About Cursor -->
		<section class="article-section">
			<h2>About Cursor</h2>
			<p>
				<a href="https://cursor.sh" target="_blank" rel="noopener">Cursor</a> is an AI-powered code editor built on VS Code.
				It is one of the most popular tools for vibe coding, offering composer and chat features that let developers describe what they want and have AI generate the code.
			</p>
			<p>
				Cursor supports multiple AI models including Claude, GPT-4, and others.
				While it is a powerful productivity tool, like all AI coding assistants, it generates code patterns that prioritize functionality over security.
			</p>
		</section>

		<!-- Security Patterns -->
		<section class="article-section">
			<h2>Security Patterns</h2>
			<p>These are the most common security issues we see in Cursor-generated code:</p>

			{#each patterns as pattern, i}
				<div class="pattern-card">
					<div class="pattern-header">
						<h3>{pattern.name}</h3>
						<span class="badge badge-{pattern.severity.toLowerCase()}">{pattern.severity}</span>
					</div>
					<p class="pattern-description">{pattern.description}</p>

					<div class="code-comparison">
						<div class="code-block vulnerable">
							<div class="code-block-header">
								<span class="code-block-lang status-bad">VULNERABLE</span>
							</div>
							<pre><code>{pattern.example}</code></pre>
						</div>

						<div class="code-block secure">
							<div class="code-block-header">
								<span class="code-block-lang status-good">SECURE</span>
								<button class="copy-btn small" onclick={() => copyCode(pattern.fix, i)}>
									{copied && copiedIndex === i ? 'Copied!' : 'Copy'}
								</button>
							</div>
							<pre><code>{pattern.fix}</code></pre>
						</div>
					</div>

					<a href={pattern.link} class="pattern-link">
						Learn more about this vulnerability
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M5 12h14M12 5l7 7-7 7"/>
						</svg>
					</a>
				</div>
			{/each}
		</section>

		<!-- Why This Happens -->
		<section class="article-section">
			<h2>Why Cursor generates these patterns</h2>
			<p>Cursor generates insecure code patterns for the same reasons all AI coding tools do:</p>
			<ul>
				<li><strong>Training data:</strong> AI models learn from millions of code examples, many of which contain insecure patterns that are common in tutorials and Stack Overflow answers</li>
				<li><strong>Readability optimization:</strong> Template literals are more readable than parameterized queries, so AI tends to generate them</li>
				<li><strong>Prompt interpretation:</strong> "Create an API" does not imply "add authentication" to an AI model</li>
				<li><strong>Functionality focus:</strong> AI optimizes for code that works, not code that is secure</li>
			</ul>
		</section>

		<!-- How to Use Cursor Securely -->
		<section class="article-section">
			<h2>How to use Cursor securely</h2>
			<ol class="numbered-list">
				<li>
					<strong>Be explicit about security in prompts:</strong>
					<p>Instead of "create a user API," say "create an authenticated API endpoint that only returns the logged-in user's data using parameterized queries."</p>
				</li>
				<li>
					<strong>Review generated code before committing:</strong>
					<p>Look for template literals in database queries, missing auth checks, and hardcoded values.</p>
				</li>
				<li>
					<strong>Use AI fix prompts to refactor:</strong>
					<p>Paste our fix prompts into Cursor to have it fix its own security issues.</p>
				</li>
				<li>
					<strong>Scan before shipping:</strong>
					<p>Run <a href="https://scanner.vibeship.co">VibeShip Scanner</a> on your codebase to catch vulnerabilities.</p>
				</li>
			</ol>
		</section>

		<!-- CTA Box -->
		<div class="cta-box">
			<p><strong>Scan your Cursor-generated code</strong></p>
			<p class="cta-subtext">Find SQL injection, missing auth, and other issues in your codebase</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green">
				Scan your code free
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M5 12h14M12 5l7 7-7 7"/>
				</svg>
			</a>
		</div>

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
				<a href="/kb/ai-patterns/claude-code/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Claude Code</div>
					<p class="related-card-description">Security patterns in Claude Code generated apps</p>
				</a>
				<a href="/kb/ai-patterns/bolt/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Bolt</div>
					<p class="related-card-description">Security patterns in Bolt generated apps</p>
				</a>
				<a href="/kb/security/vulnerabilities/sql-injection/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">SQL Injection</div>
					<p class="related-card-description">Cursor's most common security issue</p>
				</a>
			</div>
		</section>
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

	/* Pattern Card */
	.pattern-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.pattern-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
		margin-bottom: 0.75rem;
	}

	.pattern-header h3 {
		margin: 0;
		font-size: 1.1rem;
	}

	.pattern-description {
		color: var(--text-secondary);
		margin-bottom: 1rem;
	}

	.pattern-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--green-dim);
		font-size: 0.875rem;
		text-decoration: none;
		margin-top: 1rem;
	}

	.pattern-link:hover {
		color: var(--green);
	}

	/* Code Comparison */
	.code-comparison {
		display: grid;
		gap: 1rem;
		margin: 1rem 0;
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

	.copy-btn.small {
		font-size: 0.7rem;
		padding: 0.25rem 0.5rem;
	}

	/* CTA Box */
	.cta-box {
		background: var(--bg-secondary);
		border: 1px solid var(--green-dim);
		padding: 2rem;
		text-align: center;
		margin: 2rem 0;
	}

	.cta-box p {
		margin: 0 0 0.5rem;
		color: var(--text-primary);
	}

	.cta-subtext {
		color: var(--text-secondary) !important;
		font-size: 0.9rem;
		margin-bottom: 1.5rem !important;
	}

	/* Numbered List */
	.numbered-list {
		counter-reset: step;
		list-style: none;
		padding: 0;
	}

	.numbered-list li {
		position: relative;
		padding-left: 2.5rem;
		margin-bottom: 1.5rem;
	}

	.numbered-list li::before {
		counter-increment: step;
		content: counter(step);
		position: absolute;
		left: 0;
		top: 0;
		width: 1.75rem;
		height: 1.75rem;
		background: var(--bg-tertiary);
		border: 1px solid var(--border);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.numbered-list li strong {
		display: block;
		margin-bottom: 0.25rem;
	}

	.numbered-list li p {
		margin: 0;
		color: var(--text-secondary);
		font-size: 0.9rem;
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

	/* Severity badges */
	.badge-critical {
		background: var(--red);
		color: white;
	}

	.badge-high {
		background: var(--orange, #f97316);
		color: white;
	}

	.badge-medium {
		background: var(--yellow, #eab308);
		color: black;
	}

	@media (max-width: 768px) {
		.pattern-header {
			flex-direction: column;
			gap: 0.5rem;
		}
	}
</style>
