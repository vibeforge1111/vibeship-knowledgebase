<script lang="ts">
	import { Header } from '$lib/components/layout';

	const fixCategories = [
		{
			slug: 'sql-injection',
			title: 'SQL Injection Fixes',
			description: 'Parameterized queries, prepared statements, and ORM patterns.',
			prompts: 12,
			languages: ['JavaScript', 'Python', 'Go']
		},
		{
			slug: 'xss',
			title: 'XSS Prevention',
			description: 'Output encoding, CSP headers, and sanitization patterns.',
			prompts: 8,
			languages: ['JavaScript', 'React', 'Svelte']
		},
		{
			slug: 'authentication',
			title: 'Authentication Fixes',
			description: 'Adding auth middleware, session validation, and JWT handling.',
			prompts: 15,
			languages: ['JavaScript', 'Python', 'TypeScript']
		},
		{
			slug: 'secrets',
			title: 'Secrets Management',
			description: 'Environment variables, secret rotation, and vault patterns.',
			prompts: 6,
			languages: ['All Languages']
		},
		{
			slug: 'rate-limiting',
			title: 'Rate Limiting',
			description: 'API throttling, brute force protection, and DDoS mitigation.',
			prompts: 5,
			languages: ['JavaScript', 'Python', 'Go']
		},
		{
			slug: 'cors',
			title: 'CORS Configuration',
			description: 'Proper origin validation and header configuration.',
			prompts: 4,
			languages: ['JavaScript', 'Python']
		}
	];

	const featuredPrompts = [
		{
			title: 'Fix SQL Injection in Node.js',
			vulnerability: 'SQL Injection',
			prompt: 'Rewrite this database query to use parameterized queries instead of string concatenation. Use the pg library\'s built-in parameterization.',
			example: true
		},
		{
			title: 'Add Authentication Middleware',
			vulnerability: 'Missing Auth',
			prompt: 'Add authentication middleware to this Express route. Check for a valid JWT in the Authorization header and reject requests without valid tokens.',
			example: true
		},
		{
			title: 'Sanitize User Input for XSS',
			vulnerability: 'XSS',
			prompt: 'This React component renders user input. Add proper sanitization using DOMPurify and ensure all dynamic content is escaped.',
			example: true
		}
	];
</script>

<svelte:head>
	<title>AI Fix Prompts for Security Vulnerabilities | Vibeship Knowledge Base</title>
	<meta name="description" content="Copy-paste prompts to fix security vulnerabilities with AI coding tools. SQL injection, XSS, authentication, and more.">
</svelte:head>

<Header breadcrumbs={[
	{ label: 'Knowledge Base', href: '/kb' },
	{ label: 'Fix Prompts' }
]} />

<div class="content-wrapper">
	<div class="content-main content-wide">
		<div class="article-header">
			<h1>AI Fix Prompts</h1>
			<p class="text-secondary" style="font-size: 1.1rem; max-width: 650px;">
				Copy-paste prompts designed to help AI tools fix security vulnerabilities correctly. Each prompt is tested with Cursor, Claude Code, and Copilot.
			</p>
		</div>

		<div class="quick-answer">
			<div class="quick-answer-label">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
					<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
				</svg>
				How to Use
			</div>
			<p class="quick-answer-text">
				Found a vulnerability? Copy the relevant fix prompt, paste it into your AI tool along with the vulnerable code, and review the suggested fix before applying.
			</p>
		</div>

		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">50+</div>
				<div class="stat-label">fix prompts</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">6</div>
				<div class="stat-label">categories</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">3</div>
				<div class="stat-label">AI tools tested</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">92%</div>
				<div class="stat-label">fix success rate</div>
			</div>
		</div>

		<section class="article-section">
			<h2>Featured Prompts</h2>
			<div class="featured-prompts">
				{#each featuredPrompts as prompt}
					<div class="card prompt-card">
						<div class="prompt-header">
							<h3>{prompt.title}</h3>
							<span class="badge badge-info">{prompt.vulnerability}</span>
						</div>
						<div class="prompt-content">
							<code>{prompt.prompt}</code>
						</div>
						<button class="btn btn-secondary copy-btn">
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
								<rect x="9" y="9" width="13" height="13" rx="2"/>
								<path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
							</svg>
							Copy Prompt
						</button>
					</div>
				{/each}
			</div>
		</section>

		<section class="article-section">
			<h2>All Categories</h2>
			<div class="category-grid">
				{#each fixCategories as category}
					<a href="/kb/fixes/{category.slug}" class="card card-interactive category-card">
						<h3>{category.title}</h3>
						<p>{category.description}</p>
						<div class="category-meta">
							<div class="category-stat">
								<span class="meta-label">Prompts</span>
								<span class="meta-value">{category.prompts}</span>
							</div>
							<div class="category-stat">
								<span class="meta-label">Languages</span>
								<span class="meta-value">{category.languages.join(', ')}</span>
							</div>
						</div>
					</a>
				{/each}
			</div>
		</section>

		<section class="article-section">
			<h2>Writing Effective Fix Prompts</h2>
			<p>When asking AI to fix security issues, be specific:</p>
			<ol>
				<li><strong>Name the vulnerability:</strong> "This has a SQL injection vulnerability" not "fix this"</li>
				<li><strong>Specify the fix pattern:</strong> "Use parameterized queries" not "make it secure"</li>
				<li><strong>Mention the library:</strong> "Use the pg library's $1 syntax" for concrete guidance</li>
				<li><strong>Ask for explanation:</strong> "Explain why the original code was vulnerable"</li>
			</ol>
		</section>

		<section class="article-section">
			<h2>Verify Your Fixes</h2>
			<p>AI-generated fixes should always be verified:</p>
			<ul>
				<li>Run <a href="https://scanner.vibeship.co">Vibeship Scanner</a> on the fixed code</li>
				<li>Test with malicious inputs manually</li>
				<li>Review the fix logic. Does it make sense?</li>
				<li>Check for regressions in functionality</li>
			</ul>
		</section>
	</div>
</div>

<style>
	.featured-prompts {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-top: 1.5rem;
	}

	.prompt-card {
		padding: 1.25rem;
	}

	.prompt-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 1rem;
	}

	.prompt-header h3 {
		margin: 0;
		font-size: 1rem;
		color: var(--text-primary);
	}

	.prompt-content {
		background: var(--bg-tertiary);
		padding: 1rem;
		margin-bottom: 1rem;
		overflow-x: auto;
	}

	.prompt-content code {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.85rem;
		color: var(--text-secondary);
		white-space: pre-wrap;
		word-break: break-word;
	}

	.copy-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.85rem;
	}

	.category-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1rem;
		margin-top: 1.5rem;
	}

	.category-card {
		text-decoration: none;
		color: inherit;
	}

	.category-card:hover {
		text-decoration: none;
	}

	.category-card h3 {
		margin: 0 0 0.5rem;
		font-size: 1.1rem;
		color: var(--text-primary);
	}

	.category-card p {
		margin: 0 0 1rem;
		font-size: 0.85rem;
		color: var(--text-secondary);
		line-height: 1.5;
	}

	.category-meta {
		display: flex;
		gap: 1.5rem;
		padding-top: 0.75rem;
		border-top: 1px solid var(--border);
	}

	.category-stat {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
	}

	.meta-label {
		font-size: 0.65rem;
		font-family: 'JetBrains Mono', monospace;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--text-tertiary);
	}

	.meta-value {
		font-size: 0.85rem;
		color: var(--text-primary);
	}
</style>
