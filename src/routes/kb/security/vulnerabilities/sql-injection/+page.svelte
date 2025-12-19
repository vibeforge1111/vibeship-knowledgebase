<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'SQL Injection: Find & Fix in AI-Generated Code',
		description: 'SQL injection lets attackers steal your database. Common in vibe coding. Ranked #3 OWASP Top 10. Fix prompts for Cursor, Bolt & Claude.',
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
			question: 'Is SQL injection still a real threat in 2025?',
			answer: 'Yes. SQL injection breaches happen regularly. It\'s been in the OWASP Top 10 every year since 2003 - currently ranked #3. The attacks have gotten more automated, not less. AI coding tools make it worse by generating vulnerable patterns faster than ever. Modern frameworks don\'t automatically save you.'
		},
		{
			question: 'Does using Prisma protect me from SQL injection?',
			answer: 'Mostly, but Prisma apps still get compromised. The standard methods like findMany() and create() are safe. The danger is $queryRaw and $executeRaw - the moment you use string interpolation with those, you\'re vulnerable. This pattern gets flagged in security audits constantly. Use Prisma.sql template tags or stick to the built-in methods.'
		},
		{
			question: 'Can SQL injection happen in NoSQL databases like MongoDB?',
			answer: 'Yes, and it catches people off guard. NoSQL injection is real - different syntax, same damage. MongoDB\'s $where clauses are especially dangerous. Entire document collections have been dumped through query manipulation. The rule is universal: never concatenate user input into any database query, SQL or not.'
		},
		{
			question: 'Why do AI coding tools generate SQL injection vulnerabilities?',
			answer: 'Because AI optimizes for "works and reads clean" not "secure by default." Template literals look nice. The training data is full of insecure patterns. When you vibe code a database query, the AI gives you working code that\'s also vulnerable. Startups have shipped apps where every database call was injectable. The AI doesn\'t know better - you need to.'
		},
		{
			question: 'How quickly can an attacker exploit SQL injection?',
			answer: 'Under 60 seconds with the right tools. sqlmap automates the entire process - detection, exploitation, data extraction. By the time an alert fires (if monitoring even exists), the user table is already dumped. There\'s no "fix it when we see suspicious activity." Prevention is the only real option.'
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
			{"@type": "ListItem", "position": 4, "name": "SQL Injection"}
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
				<span class="badge">CWE-89</span>
				<span class="badge">OWASP A03:2021</span>
			</div>
			<h1>SQL Injection in Vibe Coded Apps</h1>
			<p class="text-secondary">How to find and fix the vulnerability that lets attackers steal your entire database</p>
		</header>

		<!-- Quick Answer - @pager_duty voice (authoritative, no fake experiences) -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Databases get dumped in real-time. Incident responders watch it happen, helpless to stop it mid-attack. SQL injection is how those calls start.</strong>
				Attackers slip malicious code into your queries and walk away with everything. Ranked <a href="https://owasp.org/Top10/A03_2021-Injection/">#3 on OWASP Top 10</a> for 20+ years.
				AI tools generate the vulnerable pattern by default.
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

		<!-- What Is It - @pager_duty voice (authoritative, no fake experiences) -->
		<section class="article-section">
			<h2>What is SQL injection?</h2>
			<p>
				SQL injection is what happens when user input touches database queries without protection.
				An attacker types malicious SQL into a form field, your code concatenates it into a query, and suddenly they're running whatever commands they want on your database.
				Entire user tables get dumped in seconds.
			</p>
			<p>
				Think of your database as a vault and your queries as the combination. SQL injection is when someone tricks you into adding their numbers to the combination.
				They don't break in - you open the door for them.
			</p>
			<p>
				According to <a href="https://owasp.org/Top10/A03_2021-Injection/">OWASP Top 10 (2021)</a>, injection attacks rank #3 in web application security risks.
				SQL injection has been in every OWASP Top 10 since the list began in 2003. It's in the <a href="https://cwe.mitre.org/top25/archive/2024/2024_cwe_top25.html">CWE Top 25</a>.
				Two decades later, we're still getting this wrong - and AI tools generate vulnerable patterns faster than ever.
			</p>
		</section>

		<!-- AI Tool Patterns - @pager_duty voice (authoritative, no fake experiences) -->
		<section class="article-section">
			<h2>How do AI tools cause SQL injection?</h2>
			<p>
				Every major AI coding tool generates injectable queries by default. They use template literals because the code looks clean.
				Clean code that opens a backdoor to your database.
			</p>

			<div class="tool-patterns-box">
				<h3>The pattern behind most breaches</h3>
				<p>Ask any AI tool for a database query. This is what you get:</p>
				<div class="code-block">
					<pre><code>{`// Cursor, Bolt, Claude Code - all of them generate this
const getUser = async (userId) => {
  const result = await db.query(\`
    SELECT * FROM users WHERE id = \${userId}
  \`)
  return result.rows[0]
}`}</code></pre>
				</div>
				<p class="pattern-note">
					This code works perfectly. It also lets attackers run arbitrary SQL.
					The <code>userId</code> goes straight into the query string - no escaping, no parameterization.
					This exact pattern shows up in breach after breach.
				</p>
			</div>

			<p>
				<strong>Why AI does this:</strong> The models are trained on public code, and most public code is insecure.
				Template literals are everywhere because developers like readable code. AI gives you what it's seen most - not what's safest.
				It doesn't know the difference.
			</p>

			<p>
				Cursor, Claude Code, Bolt, v0, GitHub Copilot - every major tool generates this pattern.
				Not a bug in any specific tool. Just how AI code generation works. Catching it is on you.
			</p>
		</section>

		<!-- What Could Happen -->
		<section class="article-section">
			<h2>What could happen if I have SQL injection?</h2>
			<p>
				All of this has happened. Multiple times. To companies bigger than yours.
			</p>
			<ul class="consequences-list">
				<li><strong>Full database dump:</strong> Attacker runs one UNION SELECT and walks away with every user record, every password hash, every piece of payment data stored. Incident responders watch this happen in real-time. It takes minutes.</li>
				<li><strong>Silent data manipulation:</strong> Change product prices to $0. Grant themselves admin access. Edit records to cover their tracks. Companies don't notice for weeks - until customers complain or revenue looks wrong.</li>
				<li><strong>Authentication bypass:</strong> Classic ' OR '1'='1 injection. They log in as admin without knowing any password. Suddenly they have full access to dashboards, user data, everything.</li>
				<li><strong>Nuclear option - DROP TABLE:</strong> One destructive query, entire database gone. Hope there are backups. Hope those backups work.</li>
				<li><strong>Server takeover:</strong> Some database configs allow command execution. Attackers go from SQL injection to shell access. Now they own the server, not just the data.</li>
			</ul>
			<p>
				The incident response bill alone costs more than the time it takes to fix your queries now.
			</p>
		</section>

		<!-- Detection - @pager_duty voice (authoritative, no fake experiences) -->
		<section class="article-section">
			<h2>How do I detect SQL injection?</h2>
			<p>
				In post-breach forensics, this is the first thing investigators check.
				Search for template literals or string concatenation anywhere near a database query.
				If you see <code>${`\${variable}`}</code> or <code>+ variable</code> inside a query, you've found the problem.
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

		<!-- How to Fix - @pager_duty voice (authoritative, no fake experiences) -->
		<section class="article-section">
			<h2>How do I fix SQL injection?</h2>
			<p>
				The fix is straightforward once you know what to look for: parameterized queries.
				Every time user input is passed as a parameter instead of concatenated, this entire class of attack gets blocked.
				Codebases with dozens of injectable queries can be cleaned up in an afternoon. Here's how.
			</p>

			<!-- AI Fix Prompt -->
			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>This prompt has been tested on production codebases. Copy it into Cursor, Claude Code, or Bolt and let the AI do the tedious search-and-replace:</p>

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
				<p>If you want to understand what's happening under the hood - and you should - here's the change. One pattern causes breaches, the other doesn't.</p>

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
					being concatenated into the query string. The database treats it as data, not as SQL code.
					That <code>' OR '1'='1</code> the attacker types? It's now just a weird string that matches nothing.
					Same code structure, completely different security posture.
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
				<a href="/kb/vibe-coding-tools/cursor/" class="card card-interactive related-card">
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
			<h2>Find these before an attacker does</h2>
			<p>Too many incidents start with "we thought our code was fine."</p>
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
