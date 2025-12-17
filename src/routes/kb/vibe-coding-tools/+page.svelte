<script lang="ts">
	import { Header } from '$lib/components/layout';

	const tools = [
		{
			slug: 'cursor',
			name: 'Cursor',
			description: 'AI-powered code editor built on VS Code. Popular for its composer and chat features.',
			topIssue: 'SQL Injection',
			knownPatterns: ['Template literals in queries', 'Inline database credentials']
		},
		{
			slug: 'claude-code',
			name: 'Claude Code',
			description: 'Anthropic\'s Claude integrated into terminal and IDE environments.',
			topIssue: 'Missing Auth',
			knownPatterns: ['Trusts user input', 'Verbose error messages']
		},
		{
			slug: 'bolt',
			name: 'Bolt',
			description: 'StackBlitz\'s AI tool for building full-stack web apps in the browser.',
			topIssue: 'Hardcoded Secrets',
			knownPatterns: ['Inline API keys for "ready to run"', 'Missing .gitignore']
		},
		{
			slug: 'v0',
			name: 'v0 by Vercel',
			description: 'Vercel\'s AI tool for generating React and Next.js UI components.',
			topIssue: 'XSS',
			knownPatterns: ['Client-side validation only', 'dangerouslySetInnerHTML']
		},
		{
			slug: 'replit',
			name: 'Replit',
			description: 'Online IDE with AI-powered code generation and hosting.',
			topIssue: 'Missing Rate Limiting',
			knownPatterns: ['Open endpoints', 'No auth middleware']
		},
		{
			slug: 'github-copilot',
			name: 'GitHub Copilot',
			description: 'GitHub\'s AI pair programmer powered by OpenAI models.',
			topIssue: 'SQL Injection',
			knownPatterns: ['String concatenation in queries', 'Legacy code patterns']
		},
		{
			slug: 'windsurf',
			name: 'Windsurf',
			description: 'Codeium\'s AI-powered IDE with agentic capabilities.',
			topIssue: 'Missing Auth',
			knownPatterns: ['Skips authentication setup', 'Open API routes']
		},
		{
			slug: 'lovable',
			name: 'Lovable',
			description: 'AI-powered app builder for creating full-stack applications from prompts.',
			topIssue: 'Missing Auth',
			knownPatterns: ['Open API endpoints', 'Client-side only validation']
		}
	];

</script>

<svelte:head>
	<title>AI Coding Tool Security Patterns | Vibeship Knowledge Base</title>
	<meta name="description" content="Security analysis of AI coding tools including Cursor, Claude Code, Bolt, v0, and more. Compare vulnerability rates and common issues.">
</svelte:head>

<Header breadcrumbs={[
	{ label: 'Knowledge Base', href: '/kb' },
	{ label: 'AI Patterns' }
]} />

<div class="content-wrapper">
	<div class="content-main content-wide">
		<div class="article-header">
			<h1>AI Tool Patterns</h1>
			<p class="text-secondary" style="font-size: 1.1rem; max-width: 650px;">
				Security patterns specific to Cursor, Claude Code, Bolt, v0, and other AI coding tools. Learn what each tool gets wrong and how to fix it.
			</p>
		</div>

		<div class="quick-answer">
			<div class="quick-answer-label">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
					<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
				</svg>
				Why This Matters
			</div>
			<p class="quick-answer-text">
				Each AI coding tool has its own patterns and blind spots. Understanding these patterns helps you catch vulnerabilities before they ship. When vibe coding, knowing your tool's weaknesses is half the battle.
			</p>
		</div>

		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">8</div>
				<div class="stat-label">AI tools covered</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">SQL Injection</div>
				<div class="stat-label">most common issue</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Hardcoded Secrets</div>
				<div class="stat-label">fastest to exploit</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">All Tools</div>
				<div class="stat-label">share similar patterns</div>
			</div>
		</div>

		<section class="article-section">
			<h2>All AI Tools</h2>
			<div class="tool-grid">
				{#each tools as tool}
					<a href="/kb/vibe-coding-tools/{tool.slug}" class="card card-interactive tool-card">
						<div class="tool-card-header">
							<h3>{tool.name}</h3>
							<span class="badge">{tool.topIssue}</span>
						</div>
						<p class="tool-description">{tool.description}</p>
						<div class="tool-patterns">
							<span class="tool-patterns-label">Common patterns:</span>
							<ul class="tool-patterns-list">
								{#each tool.knownPatterns as pattern}
									<li>{pattern}</li>
								{/each}
							</ul>
						</div>
					</a>
				{/each}
			</div>
		</section>

		<section class="article-section">
			<h2>Why AI Tools Create Vulnerabilities</h2>
			<p>AI coding assistants generate security issues because of:</p>
			<ul>
				<li><strong>Training data bias:</strong> Many online examples prioritize simplicity over security</li>
				<li><strong>Context limitations:</strong> AI may not understand that a variable contains untrusted user input</li>
				<li><strong>Pattern matching:</strong> AI optimizes for "working code" not necessarily secure code</li>
				<li><strong>Legacy patterns:</strong> Training on older code that predates modern security practices</li>
			</ul>
		</section>

		<section class="article-section">
			<h2>Using AI Tools Securely</h2>
			<ol>
				<li><strong>Always review generated code:</strong> Don't blindly accept AI suggestions</li>
				<li><strong>Use security-focused prompts:</strong> Ask for secure, parameterized queries explicitly</li>
				<li><strong>Scan before shipping:</strong> Run <a href="https://scanner.vibeship.co">Vibeship Scanner</a> on AI-generated code</li>
				<li><strong>Learn the patterns:</strong> Understand what each tool gets wrong</li>
			</ol>
		</section>
	</div>
</div>

<style>
	.tool-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: 1rem;
		margin-top: 1.5rem;
	}

	.tool-card {
		text-decoration: none;
		color: inherit;
	}

	.tool-card:hover {
		text-decoration: none;
	}

	.tool-card-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 0.75rem;
	}

	.tool-card h3 {
		margin: 0;
		font-size: 1.2rem;
		color: var(--text-primary);
	}

	.tool-description {
		margin: 0.75rem 0;
		font-size: 0.85rem;
		color: var(--text-secondary);
		line-height: 1.5;
	}

	.tool-patterns {
		padding-top: 0.75rem;
		border-top: 1px solid var(--border);
	}

	.tool-patterns-label {
		font-size: 0.7rem;
		font-family: 'JetBrains Mono', monospace;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--text-tertiary);
	}

	.tool-patterns-list {
		margin: 0.5rem 0 0;
		padding-left: 1rem;
	}

	.tool-patterns-list li {
		font-size: 0.8rem;
		color: var(--text-secondary);
		line-height: 1.5;
	}
</style>
