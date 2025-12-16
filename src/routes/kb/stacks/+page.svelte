<script lang="ts">
	import { Header } from '$lib/components/layout';

	const stacks = [
		{
			slug: 'nextjs-supabase',
			name: 'Next.js + Supabase',
			description: 'Full-stack React framework with PostgreSQL backend. Popular for vibe-coded MVPs.',
			popularity: 'Very High',
			securityScore: 62,
			topVulnerabilities: ['RLS Bypass', 'Missing Auth', 'SQL Injection']
		},
		{
			slug: 'sveltekit-supabase',
			name: 'SvelteKit + Supabase',
			description: 'Lightweight full-stack framework with PostgreSQL. Growing in popularity.',
			popularity: 'High',
			securityScore: 65,
			topVulnerabilities: ['RLS Bypass', 'XSS', 'Missing Auth']
		},
		{
			slug: 'remix-prisma',
			name: 'Remix + Prisma',
			description: 'Server-rendered React with type-safe database access.',
			popularity: 'Medium',
			securityScore: 71,
			topVulnerabilities: ['SQL Injection', 'CSRF', 'Missing Auth']
		},
		{
			slug: 'express-mongodb',
			name: 'Express + MongoDB',
			description: 'Classic Node.js backend with NoSQL database. Still widely used.',
			popularity: 'High',
			securityScore: 48,
			topVulnerabilities: ['NoSQL Injection', 'Missing Rate Limiting', 'Hardcoded Secrets']
		},
		{
			slug: 'fastapi-postgresql',
			name: 'FastAPI + PostgreSQL',
			description: 'Python async framework with SQL database. Popular for APIs.',
			popularity: 'High',
			securityScore: 68,
			topVulnerabilities: ['SQL Injection', 'Missing Auth', 'CORS Issues']
		},
		{
			slug: 'django-postgresql',
			name: 'Django + PostgreSQL',
			description: 'Batteries-included Python framework with built-in security features.',
			popularity: 'High',
			securityScore: 75,
			topVulnerabilities: ['CSRF', 'XSS', 'Missing Rate Limiting']
		}
	];

	function getScoreClass(score: number): string {
		if (score >= 70) return 'score-good';
		if (score >= 50) return 'score-medium';
		return 'score-poor';
	}
</script>

<svelte:head>
	<title>Stack Security Guides | VibeShip Knowledge Base</title>
	<meta name="description" content="Security guides for popular tech stacks including Next.js + Supabase, Express + MongoDB, FastAPI, and more. Learn common vulnerabilities by stack.">
</svelte:head>

<Header breadcrumbs={[
	{ label: 'Knowledge Base', href: '/kb' },
	{ label: 'Stacks' }
]} />

<div class="content-wrapper">
	<div class="content-main content-wide">
		<div class="article-header">
			<h1>Stack Security Guides</h1>
			<p class="text-secondary" style="font-size: 1.1rem; max-width: 650px;">
				Security guides for popular tech stacks. Each guide covers common vulnerabilities, secure patterns, and AI fix prompts specific to your stack.
			</p>
		</div>

		<div class="quick-answer">
			<div class="quick-answer-label">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
					<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
				</svg>
				Key Insight
			</div>
			<p class="quick-answer-text">
				Your tech stack determines which vulnerabilities you're most likely to encounter. A Next.js + Supabase app has different security patterns than Express + MongoDB.
			</p>
		</div>

		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">6</div>
				<div class="stat-label">stacks analyzed</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Django</div>
				<div class="stat-label">most secure by default</div>
			</div>
			<div class="stat-box">
				<div class="stat-value warning">Express</div>
				<div class="stat-label">needs most attention</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Weekly</div>
				<div class="stat-label">data updates</div>
			</div>
		</div>

		<section class="article-section">
			<h2>All Stacks</h2>
			<div class="stack-grid">
				{#each stacks as stack}
					<a href="/kb/stacks/{stack.slug}" class="card card-interactive stack-card">
						<div class="stack-card-header">
							<h3>{stack.name}</h3>
							<div class="stack-score {getScoreClass(stack.securityScore)}">
								{stack.securityScore}/100
							</div>
						</div>
						<p class="stack-description">{stack.description}</p>
						<div class="stack-meta">
							<div class="stack-popularity">
								<span class="meta-label">Popularity</span>
								<span class="meta-value">{stack.popularity}</span>
							</div>
						</div>
						<div class="stack-vulnerabilities">
							<span class="meta-label">Top Issues</span>
							<div class="vuln-tags">
								{#each stack.topVulnerabilities as vuln}
									<span class="vuln-tag">{vuln}</span>
								{/each}
							</div>
						</div>
					</a>
				{/each}
			</div>
		</section>

		<section class="article-section">
			<h2>Security Score Comparison</h2>
			<p>Higher scores indicate fewer vulnerabilities found in generated code for this stack.</p>
			<div class="score-chart">
				{#each stacks.sort((a, b) => b.securityScore - a.securityScore) as stack}
					<div class="score-row">
						<div class="score-label">{stack.name}</div>
						<div class="score-bar-wrapper">
							<div class="score-bar {getScoreClass(stack.securityScore)}" style="width: {stack.securityScore}%"></div>
						</div>
						<div class="score-value">{stack.securityScore}</div>
					</div>
				{/each}
			</div>
		</section>

		<section class="article-section">
			<h2>Choosing a Secure Stack</h2>
			<p>When starting a new project, consider these security factors:</p>
			<ul>
				<li><strong>Built-in protections:</strong> Django and Rails have CSRF protection by default; Express doesn't</li>
				<li><strong>Type safety:</strong> TypeScript and Prisma catch errors before runtime</li>
				<li><strong>Authentication:</strong> Supabase includes auth; Express requires manual implementation</li>
				<li><strong>AI familiarity:</strong> AI tools generate more secure code for popular stacks they've seen more of</li>
			</ul>
		</section>
	</div>
</div>

<style>
	.stack-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
		gap: 1rem;
		margin-top: 1.5rem;
	}

	.stack-card {
		text-decoration: none;
		color: inherit;
	}

	.stack-card:hover {
		text-decoration: none;
	}

	.stack-card-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}

	.stack-card h3 {
		margin: 0;
		font-size: 1.15rem;
		color: var(--text-primary);
	}

	.stack-score {
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

	.stack-description {
		margin: 0.75rem 0;
		font-size: 0.85rem;
		color: var(--text-secondary);
		line-height: 1.5;
	}

	.stack-meta {
		display: flex;
		gap: 1.5rem;
		margin-bottom: 0.75rem;
	}

	.stack-popularity {
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

	.stack-vulnerabilities {
		padding-top: 0.75rem;
		border-top: 1px solid var(--border);
	}

	.vuln-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
		margin-top: 0.35rem;
	}

	.vuln-tag {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.7rem;
		padding: 0.2rem 0.4rem;
		background: var(--bg-tertiary);
		color: var(--text-secondary);
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
		min-width: 160px;
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
