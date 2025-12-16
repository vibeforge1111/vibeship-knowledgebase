<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Hardcoded Secrets: API Keys in Your Code | VibeShip',
		description: 'Hardcoded API keys let attackers access your services. Ranked in OWASP Top 10. Get copy-paste fixes for Cursor, Bolt & Claude Code.',
		url: '/kb/security/vulnerabilities/hardcoded-secrets/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Hardcoded Secrets' }
	];

	// Real external data sources
	const owaspData = {
		category: 'A07:2021 - Identification and Authentication Failures',
		source: 'https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/',
		cweId: 'CWE-798',
		cweSource: 'https://cwe.mitre.org/data/definitions/798.html'
	};

	// FAQ data for schema
	const faqs = [
		{
			question: 'What counts as a hardcoded secret?',
			answer: 'Any sensitive credential embedded directly in your source code: API keys, database passwords, JWT secrets, OAuth tokens, encryption keys, service account credentials, and webhook URLs with tokens. If it grants access to something and it\'s in your code (not environment variables), it\'s a hardcoded secret.'
		},
		{
			question: 'Can\'t I just use a private GitHub repository?',
			answer: 'Private repos don\'t protect you. Secrets in code can leak through: employees leaving, accidental repo visibility changes, compromised developer machines, CI/CD logs, error messages, and client-side bundles. The only safe approach is to never put secrets in code. Use environment variables and secret managers instead.'
		},
		{
			question: 'How do I know if my secrets are already exposed?',
			answer: 'Check your git history with tools like TruffleHog or GitLeaks. Secrets persist in commits even after deletion. Search GitHub for your organization name plus common key patterns. Check haveibeenpwned.com for credential breaches. If you find exposed secrets, rotate them immediately and assume they\'re compromised.'
		},
		{
			question: 'Why do AI coding tools generate hardcoded secrets?',
			answer: 'AI tools generate working code fast. When you ask for "Stripe integration," the AI produces a complete example, often with placeholder keys that look real. These examples get copied into production code without replacing the credentials. AI prioritizes "it works" over "it\'s secure."'
		},
		{
			question: 'What if I already pushed secrets to GitHub?',
			answer: 'Act fast: 1) Rotate the compromised credentials immediately. This is your priority. 2) Remove secrets from your code and use environment variables. 3) Use git filter-branch or BFG Repo-Cleaner to purge secrets from history. 4) Force push the cleaned history. Note: GitHub caches commits, so always assume exposed secrets are compromised.'
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
				<span class="badge">{owaspData.cweId}</span>
				<span class="badge">OWASP A07:2021</span>
			</div>
			<h1>Hardcoded Secrets in AI-Generated Code</h1>
			<p class="text-secondary">How to find and fix exposed API keys, passwords, and credentials in your codebase</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Hardcoded secrets are credentials embedded directly in your source code</strong>: API keys,
				database passwords, JWT secrets. Once pushed to a repository, they can be extracted by anyone
				with access, including bots that scan GitHub for exposed keys. This is classified under
				<strong><a href={owaspData.source}>OWASP A07:2021</a></strong> and is one of the most
				common issues in AI-generated code.
			</p>
		</div>

		<!-- Stats Box - Real OWASP Data -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">A07:2021</div>
				<div class="stat-label">OWASP Category</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">{owaspData.cweId}</div>
				<div class="stat-label"><a href={owaspData.cweSource}>CWE ID</a></div>
			</div>
			<div class="stat-box">
				<div class="stat-value">&lt;1 min</div>
				<div class="stat-label">To Exploit</div>
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
			<h2>What are hardcoded secrets?</h2>
			<p>
				Hardcoded secrets are sensitive credentials written directly into your source code instead of
				being stored securely in environment variables or secret managers. Think of it like writing
				your house key's code on a sticky note attached to your front door. Anyone who sees it can get in.
			</p>
			<p>
				Common examples include API keys (Stripe, OpenAI, AWS), database connection strings with
				passwords, JWT signing secrets, OAuth client secrets, and encryption keys. When these end up
				in your code, they get committed to version control, where they persist forever, even after
				you "delete" them.
			</p>
			<p>
				According to <a href="https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/">OWASP</a>,
				identification and authentication failures (which includes exposed credentials) ranked #7 in
				the Top 10 Web Application Security Risks. Automated bots continuously scan public repositories
				for exposed secrets and can exploit them within minutes of exposure.
			</p>
		</section>

		<!-- AI Tool Patterns -->
		<section class="article-section">
			<h2>How do AI tools cause this?</h2>
			<p>
				AI coding tools generate hardcoded secrets because they prioritize complete, working examples.
				When you ask for "add Stripe payment integration," the AI produces functional code, often with
				placeholder keys that look real enough to forget to replace.
			</p>

			<div class="tool-patterns-box">
				<h3>Common AI-generated patterns</h3>
				<p>AI tools frequently generate code like this:</p>
				<div class="code-block">
					<pre><code>{`// AI generates this "working" example
const stripe = new Stripe('sk_live_EXAMPLE_KEY_HERE', {
  apiVersion: '2023-10-16'
})

// Or database connections with inline credentials
const db = new Pool({
  connectionString: 'postgresql://user:password123@localhost:5432/mydb'
})

// Or JWT secrets directly in code
const JWT_SECRET = 'super-secret-key-change-me'`}</code></pre>
				</div>
				<p class="pattern-note">
					This code <em>works</em> immediately, which is exactly what AI optimizes for. The security
					problem comes later when developers forget to externalize these values.
				</p>
			</div>

			<p>
				<strong>Why this happens:</strong> AI models are trained on code examples that often include
				placeholder credentials for demonstration. The AI doesn't distinguish between "example code"
				and "production code". It generates what works.
			</p>

			<p>
				<strong>All major AI coding tools</strong> (Cursor, Claude Code, Bolt, v0, and Copilot) can
				generate these patterns. Bolt is particularly prone to this because its "ready to run"
				philosophy prioritizes immediate functionality.
			</p>
		</section>

		<!-- What Could Happen -->
		<section class="article-section">
			<h2>What could happen?</h2>
			<ul class="consequences-list">
				<li><strong>Financial damage:</strong> Attackers use your AWS/GCP/Azure credentials to spin up crypto miners, running up thousands in charges</li>
				<li><strong>Data breach:</strong> Database credentials expose all user data: emails, passwords, payment info, personal details</li>
				<li><strong>Service abuse:</strong> Your OpenAI/Stripe/Twilio API keys get used until rate limits hit or accounts are suspended</li>
				<li><strong>Account takeover:</strong> OAuth and JWT secrets let attackers forge authentication tokens and impersonate any user</li>
				<li><strong>Lateral movement:</strong> One exposed credential often leads to others. Database access reveals more secrets stored in tables</li>
			</ul>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How do I detect hardcoded secrets?</h2>
			<p>
				Search your codebase for these patterns. Any matches need immediate attention.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Patterns to search for</span>
				</div>
				<pre><code>{`# API key patterns
sk_live_    # Stripe live keys
sk_test_    # Stripe test keys (still sensitive!)
AKIA        # AWS access key IDs
ghp_        # GitHub personal access tokens
xoxb-       # Slack bot tokens

# Database connection strings
postgresql://
mongodb+srv://
mysql://

# Common variable names with inline values
const API_KEY = '...'
const SECRET = '...'
const PASSWORD = '...'
const TOKEN = '....'

# Regex for generic secrets
['"](sk|pk|api|key|secret|password|token)[_-]?['"]*[:=]['"]\w{20,}['"]`}</code></pre>
			</div>

			<p>
				<strong>Use automated tools:</strong> <a href="https://github.com/trufflesecurity/trufflehog">TruffleHog</a>,
				<a href="https://github.com/gitleaks/gitleaks">GitLeaks</a>, and
				<a href="https://www.gitguardian.com/">GitGuardian</a> scan your entire git history for exposed secrets.
			</p>

			<div class="cta-box">
				<p><strong>Want to find secrets automatically?</strong></p>
				<a href="https://scanner.vibeship.co" class="btn btn-green">
					Try VibeShip Scanner
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M5 12h14M12 5l7 7-7 7"/>
					</svg>
				</a>
			</div>
		</section>

		<!-- How to Fix -->
		<section class="article-section">
			<h2>How do I fix hardcoded secrets?</h2>

			<!-- AI Fix Prompt -->
			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>Copy this prompt into Cursor, Claude Code, or Bolt to automatically fix hardcoded secrets:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Fix all hardcoded secrets in my codebase.

## What to look for

Search for these patterns that indicate hardcoded secrets:

1. API key assignments:
   - const API_KEY = 'sk_live_...'
   - const OPENAI_KEY = 'sk-...'
   - apiKey: 'hardcoded-value'

2. Database connection strings with credentials:
   - postgresql://user:password@host
   - mongodb+srv://user:password@cluster
   - mysql://root:password@localhost

3. Secret/token/password variables with inline values:
   - JWT_SECRET = 'some-secret'
   - const password = 'admin123'
   - token: 'ghp_...'

4. Service-specific patterns:
   - sk_live_, sk_test_ (Stripe)
   - AKIA (AWS)
   - ghp_, gho_ (GitHub)
   - xoxb-, xoxp- (Slack)

## How to fix

Replace all hardcoded secrets with environment variables:

\`\`\`javascript
// Before (vulnerable)
const stripe = new Stripe('sk_live_abc123')

// After (secure)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
\`\`\`

For each secret found:
1. Move the value to .env (and add .env to .gitignore)
2. Replace the hardcoded value with process.env.VARIABLE_NAME
3. Add the variable to .env.example with a placeholder value
4. Document required environment variables in README

## Framework-specific notes

- **Next.js**: Use NEXT_PUBLIC_ prefix only for client-safe values
- **Vite**: Use VITE_ prefix for client-exposed variables
- **Node.js**: Use dotenv package to load .env files
- **Vercel/Railway**: Use their secrets management UI

## After fixing

1. Search for any remaining patterns: grep -r "sk_live\\|sk_test\\|AKIA\\|password.*=" .
2. Verify .env is in .gitignore
3. Create .env.example with placeholder values
4. List all files modified with before/after examples
5. IMPORTANT: If secrets were ever committed, they need to be rotated. Assume they're compromised

Please proceed systematically through my codebase.`}</div>
				</div>
			</div>

			<!-- Manual Fix -->
			<div class="fix-section">
				<h3>Manual Fix</h3>
				<p>The fix is always the same: <strong>move secrets to environment variables</strong>.</p>

				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-block-header">
							<span class="code-block-lang status-bad">VULNERABLE</span>
						</div>
						<pre><code>{`// Hardcoded API key - DANGEROUS
const openai = new OpenAI({
  apiKey: 'sk-abc123def456...'
})

// Database password in code - DANGEROUS
const pool = new Pool({
  connectionString: 'postgresql://admin:secretpass@db.example.com/prod'
})`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-block-header">
							<span class="code-block-lang status-good">SECURE</span>
						</div>
						<pre><code>{`// Load from environment variable - SAFE
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

// Connection string from env - SAFE
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

// Add to .env (never commit this file!)
// OPENAI_API_KEY=sk-abc123def456...
// DATABASE_URL=postgresql://admin:secretpass@db.example.com/prod`}</code></pre>
					</div>
				</div>

				<p>
					<strong>Critical steps after moving secrets:</strong>
				</p>
				<ol>
					<li>Add <code>.env</code> to <code>.gitignore</code> (before committing!)</li>
					<li>Create <code>.env.example</code> with placeholder values for documentation</li>
					<li>If secrets were ever committed, <strong>rotate them immediately</strong>. Assume they're compromised</li>
					<li>Set up secrets in your deployment platform (Vercel, Railway, AWS, etc.)</li>
				</ol>
			</div>

			<!-- Framework-Specific -->
			<div class="fix-section">
				<h3>Framework-specific guides</h3>
				<div class="framework-links">
					<a href="/kb/security/fixes/hardcoded-secrets/nextjs/" class="card card-interactive">
						<span class="framework-name">Next.js</span>
						<span class="framework-desc">NEXT_PUBLIC_ vs server-only</span>
					</a>
					<a href="/kb/security/fixes/hardcoded-secrets/express/" class="card card-interactive">
						<span class="framework-name">Express</span>
						<span class="framework-desc">dotenv setup</span>
					</a>
					<a href="/kb/security/fixes/hardcoded-secrets/sveltekit/" class="card card-interactive">
						<span class="framework-name">SvelteKit</span>
						<span class="framework-desc">$env modules</span>
					</a>
					<a href="/kb/security/fixes/hardcoded-secrets/supabase/" class="card card-interactive">
						<span class="framework-name">Supabase</span>
						<span class="framework-desc">Anon vs Service keys</span>
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
				<a href="/kb/security/vulnerabilities/sql-injection/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">SQL Injection</div>
					<p class="related-card-description">Another critical vulnerability in AI-generated code</p>
				</a>
				<a href="/kb/security/ai-patterns/bolt/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Bolt Security Patterns</div>
					<p class="related-card-description">Why Bolt generates hardcoded credentials</p>
				</a>
				<a href="/kb/security/stacks/nextjs-supabase/" class="card card-interactive related-card">
					<div class="related-card-category">Stack Guide</div>
					<div class="related-card-title">Next.js + Supabase Security</div>
					<p class="related-card-description">Handling Supabase keys correctly</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Scan your code for hardcoded secrets</h2>
			<p>Check your codebase for exposed API keys, passwords, and other credentials.</p>
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

		.faq-item h3 {
			font-size: 1rem;
		}
	}
</style>
