<script lang="ts">
	import { Header } from '$lib/components/layout';

	const tools = [
		{
			slug: 'cursor',
			name: 'Cursor',
			description: 'AI-powered code editor built on VS Code. Popular for its composer and chat features.',
			score: 42,
			vulnRate: '73%',
			topIssue: 'SQL Injection',
			trend: 'stable'
		},
		{
			slug: 'claude-code',
			name: 'Claude Code',
			description: 'Anthropic\'s Claude integrated into terminal and IDE environments.',
			score: 58,
			vulnRate: '61%',
			topIssue: 'Missing Auth',
			trend: 'improving'
		},
		{
			slug: 'bolt',
			name: 'Bolt',
			description: 'StackBlitz\'s AI tool for building full-stack web apps in the browser.',
			score: 35,
			vulnRate: '78%',
			topIssue: 'Hardcoded Secrets',
			trend: 'declining'
		},
		{
			slug: 'v0',
			name: 'v0 by Vercel',
			description: 'Vercel\'s AI tool for generating React and Next.js UI components.',
			score: 52,
			vulnRate: '65%',
			topIssue: 'XSS',
			trend: 'stable'
		},
		{
			slug: 'replit',
			name: 'Replit',
			description: 'Online IDE with AI-powered code generation and hosting.',
			score: 38,
			vulnRate: '71%',
			topIssue: 'Missing Rate Limiting',
			trend: 'stable'
		},
		{
			slug: 'copilot',
			name: 'GitHub Copilot',
			description: 'GitHub\'s AI pair programmer powered by OpenAI Codex.',
			score: 55,
			vulnRate: '58%',
			topIssue: 'SQL Injection',
			trend: 'improving'
		},
		{
			slug: 'windsurf',
			name: 'Windsurf',
			description: 'Codeium\'s AI-powered IDE with agentic capabilities.',
			score: 48,
			vulnRate: '67%',
			topIssue: 'Missing Auth',
			trend: 'new'
		}
	];

	function getScoreClass(score: number): string {
		if (score >= 60) return 'score-good';
		if (score >= 40) return 'score-medium';
		return 'score-poor';
	}

	function getTrendIcon(trend: string): string {
		switch (trend) {
			case 'improving': return '↑';
			case 'declining': return '↓';
			case 'new': return '★';
			default: return '→';
		}
	}
</script>

<svelte:head>
	<title>AI Coding Tool Security Patterns | VibeShip Knowledge Base</title>
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
				Security patterns specific to Cursor, Claude Code, Bolt, v0, and other AI coding tools. Based on analysis of 10,000+ AI-generated repositories.
			</p>
		</div>

		<div class="quick-answer">
			<div class="quick-answer-label">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
					<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
				</svg>
				Our Unique Data
			</div>
			<p class="quick-answer-text">
				This is data no one else has. We scan thousands of AI-generated repositories weekly to identify which tools produce the most secure code, and which vulnerabilities they commonly create.
			</p>
		</div>

		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">7</div>
				<div class="stat-label">AI tools analyzed</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">10K+</div>
				<div class="stat-label">repos scanned</div>
			</div>
			<div class="stat-box">
				<div class="stat-value warning">Cursor</div>
				<div class="stat-label">highest vulnerability rate</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Weekly</div>
				<div class="stat-label">data updates</div>
			</div>
		</div>

		<section class="article-section">
			<h2>All AI Tools</h2>
			<div class="tool-grid">
				{#each tools as tool}
					<a href="/kb/ai-patterns/{tool.slug}" class="card card-interactive tool-card">
						<div class="tool-card-header">
							<h3>{tool.name}</h3>
							<div class="tool-score {getScoreClass(tool.score)}">
								{tool.score}/100
							</div>
						</div>
						<p class="tool-description">{tool.description}</p>
						<div class="tool-stats">
							<div class="tool-stat">
								<span class="tool-stat-label">Vuln Rate</span>
								<span class="tool-stat-value">{tool.vulnRate}</span>
							</div>
							<div class="tool-stat">
								<span class="tool-stat-label">Top Issue</span>
								<span class="tool-stat-value">{tool.topIssue}</span>
							</div>
							<div class="tool-stat">
								<span class="tool-stat-label">Trend</span>
								<span class="tool-stat-value trend-{tool.trend}">{getTrendIcon(tool.trend)}</span>
							</div>
						</div>
					</a>
				{/each}
			</div>
		</section>

		<section class="article-section">
			<h2>Security Score Comparison</h2>
			<p>Higher scores indicate fewer vulnerabilities found in generated code.</p>
			<div class="score-chart">
				{#each tools.sort((a, b) => b.score - a.score) as tool}
					<div class="score-row">
						<div class="score-label">{tool.name}</div>
						<div class="score-bar-wrapper">
							<div class="score-bar {getScoreClass(tool.score)}" style="width: {tool.score}%"></div>
						</div>
						<div class="score-value">{tool.score}</div>
					</div>
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
				<li><strong>Scan before shipping:</strong> Run <a href="https://scanner.vibeship.co">VibeShip Scanner</a> on AI-generated code</li>
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
	}

	.tool-card h3 {
		margin: 0;
		font-size: 1.2rem;
		color: var(--text-primary);
	}

	.tool-score {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.85rem;
		font-weight: 600;
		padding: 0.25rem 0.5rem;
		border: 1px solid;
	}

	.score-good {
		color: var(--green);
		border-color: var(--green);
	}

	.score-medium {
		color: var(--orange);
		border-color: var(--orange);
	}

	.score-poor {
		color: var(--red);
		border-color: var(--red);
	}

	.tool-description {
		margin: 0.75rem 0;
		font-size: 0.85rem;
		color: var(--text-secondary);
		line-height: 1.5;
	}

	.tool-stats {
		display: flex;
		gap: 1rem;
		padding-top: 0.75rem;
		border-top: 1px solid var(--border);
	}

	.tool-stat {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
	}

	.tool-stat-label {
		font-size: 0.65rem;
		font-family: 'JetBrains Mono', monospace;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--text-tertiary);
	}

	.tool-stat-value {
		font-size: 0.85rem;
		font-weight: 500;
		color: var(--text-primary);
	}

	.trend-improving {
		color: var(--green);
	}

	.trend-declining {
		color: var(--red);
	}

	.trend-new {
		color: var(--violet);
	}

	.score-chart {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-top: 1rem;
	}

	.score-row {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.score-label {
		min-width: 120px;
		font-size: 0.85rem;
		color: var(--text-secondary);
	}

	.score-bar-wrapper {
		flex: 1;
		height: 24px;
		background: var(--bg-tertiary);
	}

	.score-bar {
		height: 100%;
		transition: width 0.3s ease;
	}

	.score-value {
		min-width: 40px;
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.85rem;
		color: var(--text-primary);
		text-align: right;
	}
</style>
