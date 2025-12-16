<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'SQL Injection: Find & Fix in AI-Generated Code | VibeShip',
		description: 'SQL injection lets attackers steal your database. Ranked #3 on OWASP Top 10. Get copy-paste fixes for Cursor, Bolt & Claude Code.',
		url: '/kb/security/vulnerabilities/sql-injection/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'SQL Injection' }
	];

	// Real external data sources
	const owaspData = {
		ranking: '#3',
		category: 'A03:2021 - Injection',
		source: 'https://owasp.org/Top10/A03_2021-Injection/',
		cweId: 'CWE-89',
		cweSource: 'https://cwe.mitre.org/data/definitions/89.html'
	};

	// FAQ data for schema
	const faqs = [
		{
			question: 'Is SQL injection still a real threat in 2024?',
			answer: 'Yes. SQL injection remains one of the most exploited vulnerabilities worldwide. It has been in the OWASP Top 10 every year since the list began in 2003 and is currently ranked #3 (A03:2021 - Injection). AI coding tools can generate vulnerable patterns because they prioritize readable code over secure code.'
		},
		{
			question: 'Does using Prisma protect me from SQL injection?',
			answer: 'Partially. Prisma\'s standard query methods like findMany(), create(), and update() are safe from SQL injection because they use parameterized queries internally. However, you can still create vulnerabilities using $queryRaw and $executeRaw if you use string interpolation instead of parameterized queries. Always use Prisma.sql template tags for raw queries.'
		},
		{
			question: 'Can SQL injection happen in NoSQL databases like MongoDB?',
			answer: 'Yes. NoSQL databases have their own injection vulnerabilities called NoSQL injection. While the syntax differs, the concept is identical: unsanitized user input manipulating database queries. MongoDB queries using $where clauses or string-built queries are particularly vulnerable. The fix is the same: never concatenate user input into queries.'
		},
		{
			question: 'Why do AI coding tools generate SQL injection vulnerabilities?',
			answer: 'AI tools prioritize readable, working code over secure code. Template literals like `SELECT * FROM users WHERE id = ${userId}` are cleaner to read than parameterized queries. Since most training data contains insecure patterns, and AI optimizes for developer experience rather than security, vulnerable code is often the default output.'
		},
		{
			question: 'How quickly can an attacker exploit SQL injection?',
			answer: 'Within seconds. Automated tools like sqlmap can detect and exploit SQL injection vulnerabilities almost instantly. Once found, an attacker can dump your entire database, modify data, or even gain server access, all before you notice anything unusual. This is why prevention is critical: there\'s no time to react once you\'re targeted.'
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
				<span class="badge badge-critical">Critical</span>
				<span class="badge">CWE-89</span>
				<span class="badge">OWASP A03:2021</span>
			</div>
			<h1>SQL Injection in AI-Generated Code</h1>
			<p class="text-secondary">How to find and fix the vulnerability that lets attackers steal your entire database</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>SQL injection happens when user input is placed directly into database queries.</strong>
				An attacker can type special characters that manipulate your queries, potentially reading,
				modifying, or deleting your entire database. Ranked <strong>#3 on the
				<a href="https://owasp.org/Top10/A03_2021-Injection/">OWASP Top 10</a></strong>, it's one of the
				most exploited vulnerabilities, and AI coding tools frequently generate vulnerable patterns.
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
				<div class="stat-value">20+ years</div>
				<div class="stat-label">In OWASP Top 10</div>
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
			<h2>What is SQL injection?</h2>
			<p>
				SQL injection is a vulnerability where attackers manipulate your database queries by inserting
				malicious code through user input fields. Think of it like a hotel where guests write their own
				room keys. Instead of getting key #203, a malicious guest writes "all rooms" and suddenly has
				access to everything.
			</p>
			<p>
				When your code builds database queries by concatenating user input directly into SQL strings,
				attackers can inject their own SQL commands. The consequences are severe: complete database theft,
				data modification, account takeovers, and in some cases, full server compromise.
			</p>
			<p>
				SQL injection has been in the <a href="https://owasp.org/Top10/">OWASP Top 10</a> every year since
				the list began in 2003. It's currently ranked #3 under "Injection" (<a href="https://owasp.org/Top10/A03_2021-Injection/">A03:2021</a>).
				AI coding tools often generate vulnerable patterns because template literals are more readable than
				parameterized queries, prioritizing developer experience over security.
			</p>
		</section>

		<!-- AI Tool Patterns -->
		<section class="article-section">
			<h2>How do AI tools cause SQL injection?</h2>
			<p>
				AI coding tools generate SQL injection vulnerabilities because they prioritize readable,
				working code over secure code. Template literals (JavaScript's backtick strings) are cleaner
				to read than parameterized queries, so AI defaults to them even though they're dangerous.
			</p>

			<div class="tool-patterns-box">
				<h3>Common AI-generated vulnerable patterns</h3>
				<p>When you ask AI tools for database queries, they often generate code like this:</p>
				<div class="code-block">
					<pre><code>{`// Cursor, Bolt, Claude Code all generate this pattern
const getUser = async (userId) => {
  const result = await db.query(\`
    SELECT * FROM users WHERE id = \${userId}
  \`)
  return result.rows[0]
}`}</code></pre>
				</div>
				<p class="pattern-note">
					This code <em>works</em>, which is why AI generates it. But it's injectable because
					<code>userId</code> is concatenated directly into the query string.
				</p>
			</div>

			<p>
				<strong>Why this happens:</strong> AI models are trained on millions of code examples, many of
				which contain insecure patterns. Template literals are common in JavaScript codebases because
				they're readable. When you ask for "a database query," AI produces what it's seen most often, which
				isn't always secure.
			</p>

			<p>
				<strong>All major AI coding tools</strong> (Cursor, Claude Code, Bolt, v0, and GitHub Copilot) can
				generate this pattern. The solution is the same regardless of which tool you use: always use
				parameterized queries.
			</p>
		</section>

		<!-- What Could Happen -->
		<section class="article-section">
			<h2>What could happen?</h2>
			<ul class="consequences-list">
				<li><strong>Complete database theft:</strong> Attackers can dump every table, including user credentials, payment info, and private data</li>
				<li><strong>Data manipulation:</strong> Change prices to $0, grant admin privileges, modify records</li>
				<li><strong>Authentication bypass:</strong> Log in as any user without knowing their password</li>
				<li><strong>Data destruction:</strong> DROP TABLE commands can delete your entire database</li>
				<li><strong>Server compromise:</strong> Some databases allow command execution, giving attackers shell access</li>
			</ul>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How do I detect SQL injection?</h2>
			<p>
				Search your codebase for these dangerous patterns. If you find any, you likely have SQL
				injection vulnerabilities.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Patterns to search for</span>
				</div>
				<pre><code>{`// Template literals in queries (DANGEROUS)
db.query(\`SELECT * FROM users WHERE id = \${userId}\`)

// String concatenation (DANGEROUS)
db.query("SELECT * FROM users WHERE id = " + userId)

// Raw queries with interpolation (DANGEROUS)
prisma.$queryRaw(\`SELECT * FROM users WHERE email = '\${email}'\`)

// Regex to find these patterns:
// \\.(query|execute)\\s*\\(\\s*\`[^}]*\\$\\{
// \\$queryRaw\\s*\\(\\s*\`[^}]*\\$\\{`}</code></pre>
			</div>

			<div class="cta-box">
				<p><strong>Don't want to search manually?</strong></p>
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
			<h2>How do I fix SQL injection?</h2>

			<!-- AI Fix Prompt -->
			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>Copy this prompt into Cursor, Claude Code, or Bolt to automatically fix SQL injection in your codebase:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Fix all SQL injection vulnerabilities in my codebase.

## What to look for

Search for these dangerous patterns:

1. Template literals in database queries:
   - \`SELECT * FROM table WHERE column = \${variable}\`
   - \`INSERT INTO table VALUES ('\${value}')\`

2. String concatenation in queries:
   - "SELECT * FROM users WHERE id = " + userId
   - 'DELETE FROM posts WHERE id = ' + postId

3. Raw query methods with interpolation:
   - prisma.$queryRaw(\`...\${var}...\`)
   - sequelize.query(\`...\${var}...\`)
   - knex.raw(\`...\${var}...\`)

## How to fix

Replace all string interpolation with parameterized queries:

### For raw SQL (pg, mysql2, better-sqlite3):
\`\`\`javascript
// Before (vulnerable)
const user = await db.query(\`SELECT * FROM users WHERE id = \${userId}\`)

// After (secure)
const user = await db.query('SELECT * FROM users WHERE id = $1', [userId])
\`\`\`

### For Prisma:
\`\`\`javascript
// Before (vulnerable)
const users = await prisma.$queryRaw(\`SELECT * FROM users WHERE email = '\${email}'\`)

// After (secure)
const users = await prisma.$queryRaw(Prisma.sql\`SELECT * FROM users WHERE email = \${email}\`)
// Or better - use Prisma's built-in methods:
const users = await prisma.user.findMany({ where: { email } })
\`\`\`

### For Knex:
\`\`\`javascript
// Before (vulnerable)
const results = await knex.raw(\`SELECT * FROM orders WHERE user_id = \${userId}\`)

// After (secure)
const results = await knex.raw('SELECT * FROM orders WHERE user_id = ?', [userId])
\`\`\`

## Framework-specific notes

- Next.js API routes: Check all /app/api/ and /pages/api/ files
- Express: Check all route handlers that interact with databases
- Prisma: Prefer findMany/findUnique over $queryRaw when possible
- Supabase: The JS client methods are safe; check any custom SQL functions

## After fixing

1. Search for remaining patterns: \`\\$\\{.*\\}\` inside any query-related code
2. Add input validation before queries as defense in depth
3. List all files you modified with before/after snippets

Please proceed systematically through my codebase.`}</div>
				</div>
			</div>

			<!-- Manual Fix -->
			<div class="fix-section">
				<h3>Manual Fix</h3>
				<p>The fix is always the same: <strong>never concatenate user input into queries</strong>. Use parameterized queries instead.</p>

				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-block-header">
							<span class="code-block-lang status-bad">VULNERABLE</span>
						</div>
						<pre><code>{`// Template literal - DANGEROUS
const getUser = async (userId) => {
  const result = await db.query(\`
    SELECT * FROM users WHERE id = \${userId}
  \`)
  return result.rows[0]
}

// An attacker inputs: 1 OR 1=1
// Query becomes: SELECT * FROM users WHERE id = 1 OR 1=1
// Result: Returns ALL users`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-block-header">
							<span class="code-block-lang status-good">SECURE</span>
						</div>
						<pre><code>{`// Parameterized query - SAFE
const getUser = async (userId) => {
  const result = await db.query(
    'SELECT * FROM users WHERE id = $1',
    [userId]
  )
  return result.rows[0]
}

// An attacker inputs: 1 OR 1=1
// Query becomes: SELECT * FROM users WHERE id = '1 OR 1=1'
// Result: No match found (treated as literal string)`}</code></pre>
					</div>
				</div>

				<p>
					<strong>What changed:</strong> The variable is now passed as a parameter (<code>$1</code>) instead of
					being concatenated into the query string. The database treats it as data, not as SQL code, so
					malicious input becomes harmless text.
				</p>
			</div>

			<!-- Framework-Specific -->
			<div class="fix-section">
				<h3>Framework-specific fixes</h3>
				<div class="framework-links">
					<a href="/kb/security/fixes/sql-injection/nextjs/" class="card card-interactive">
						<span class="framework-name">Next.js</span>
						<span class="framework-desc">API routes & server actions</span>
					</a>
					<a href="/kb/security/fixes/sql-injection/express/" class="card card-interactive">
						<span class="framework-name">Express</span>
						<span class="framework-desc">Route handlers & middleware</span>
					</a>
					<a href="/kb/security/fixes/sql-injection/prisma/" class="card card-interactive">
						<span class="framework-name">Prisma</span>
						<span class="framework-desc">$queryRaw & $executeRaw</span>
					</a>
					<a href="/kb/security/fixes/sql-injection/supabase/" class="card card-interactive">
						<span class="framework-name">Supabase</span>
						<span class="framework-desc">RPC & custom SQL</span>
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
				<a href="/kb/security/vulnerabilities/xss/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Cross-Site Scripting (XSS)</div>
					<p class="related-card-description">Inject malicious scripts into web pages</p>
				</a>
				<a href="/kb/security/ai-patterns/cursor/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Cursor Security Patterns</div>
					<p class="related-card-description">Common vulnerabilities in Cursor-generated code</p>
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
			<h2>Scan your code for SQL injection</h2>
			<p>Check your codebase for SQL injection and other common security vulnerabilities.</p>
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
