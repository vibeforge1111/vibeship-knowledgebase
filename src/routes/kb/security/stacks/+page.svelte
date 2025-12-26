<script lang="ts">
	import { Header } from '$lib/components/layout';

	const stacks = [
		{
			slug: 'nextjs-supabase',
			name: 'Next.js + Supabase',
			description: 'Full-stack React framework with Postgres backend. Popular for MVPs and rapid prototyping.',
			topIssues: ['RLS disabled', 'Service key exposed', 'Missing auth checks']
		},
		{
			slug: 'nextjs-prisma',
			name: 'Next.js + Prisma',
			description: 'Type-safe ORM with Next.js. Great for complex data models and migrations.',
			topIssues: ['Raw query injection', 'Missing input validation', 'N+1 queries']
		},
		{
			slug: 'sveltekit-supabase',
			name: 'SvelteKit + Supabase',
			description: 'Lightweight framework with Supabase backend. Fast builds and excellent DX.',
			topIssues: ['Client-side auth bypass', 'RLS misconfiguration', 'Exposed API routes']
		}
	];
</script>

<svelte:head>
	<title>Stack Security Guides | VibeShip</title>
	<meta name="description" content="Security guides for popular tech stacks. Next.js + Supabase, Next.js + Prisma, SvelteKit + Supabase with security checklists and fixes." />
	<meta property="og:title" content="Stack Security Guides | VibeShip" />
	<meta property="og:description" content="Security guides for popular tech stacks. Next.js + Supabase, Next.js + Prisma, SvelteKit + Supabase with security checklists and fixes." />
	<meta property="og:url" content="/kb/security/stacks/" />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Stack Security Guides | VibeShip" />
	<meta name="twitter:description" content="Security guides for popular tech stacks. Next.js + Supabase, Next.js + Prisma, SvelteKit + Supabase." />
	<link rel="canonical" href="https://vibeship.co/kb/security/stacks/" />
</svelte:head>

<Header breadcrumbs={[
	{ label: 'Knowledge Base', href: '/kb' },
	{ label: 'Security' },
	{ label: 'Stack Guides' }
]} />

<div class="content-wrapper">
	<div class="content-main content-wide">
		<div class="article-header">
			<h1>Stack Security Guides</h1>
			<p class="text-secondary" style="font-size: 1.1rem; max-width: 650px;">
				Security guides for popular tech stacks used in vibe coding. Each guide covers common vulnerabilities and how to fix them.
			</p>
		</div>

		<div class="quick-answer">
			<div class="quick-answer-label">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
					<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
				</svg>
				Quick Answer
			</div>
			<p class="quick-answer-text">
				Each tech stack has its own security gotchas. These guides help you secure the specific framework + database combination you're using, with copy-paste fixes and checklists.
			</p>
		</div>

		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">3</div>
				<div class="stat-label">stacks covered</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Next.js</div>
				<div class="stat-label">most popular framework</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Supabase</div>
				<div class="stat-label">most popular backend</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Checklists</div>
				<div class="stat-label">included for each</div>
			</div>
		</div>

		<section class="article-section">
			<h2>All Stack Guides</h2>
			<div class="stack-grid">
				{#each stacks as stack}
					<a href="/kb/security/stacks/{stack.slug}" class="card card-interactive stack-card">
						<div class="stack-card-header">
							<h3>{stack.name}</h3>
						</div>
						<p class="stack-description">{stack.description}</p>
						<div class="stack-issues">
							<span class="stack-issues-label">Top issues:</span>
							<ul class="stack-issues-list">
								{#each stack.topIssues as issue}
									<li>{issue}</li>
								{/each}
							</ul>
						</div>
					</a>
				{/each}
			</div>
		</section>

		<section class="article-section">
			<h2>What's in Each Guide</h2>
			<ul>
				<li><strong>Security checklist:</strong> Essential settings to configure before launch</li>
				<li><strong>Common vulnerabilities:</strong> Issues specific to the stack</li>
				<li><strong>Code examples:</strong> Before/after fixes for each issue</li>
				<li><strong>AI patterns:</strong> What AI tools get wrong with this stack</li>
			</ul>
		</section>
	</div>
</div>

<style>
	.stack-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
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
		gap: 0.75rem;
	}

	.stack-card h3 {
		margin: 0;
		font-size: 1.2rem;
		color: var(--text-primary);
	}

	.stack-description {
		margin: 0.75rem 0;
		font-size: 0.85rem;
		color: var(--text-secondary);
		line-height: 1.5;
	}

	.stack-issues {
		padding-top: 0.75rem;
		border-top: 1px solid var(--border);
	}

	.stack-issues-label {
		font-size: 0.7rem;
		font-family: 'JetBrains Mono', monospace;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--text-tertiary);
	}

	.stack-issues-list {
		margin: 0.5rem 0 0;
		padding-left: 1rem;
	}

	.stack-issues-list li {
		font-size: 0.8rem;
		color: var(--text-secondary);
		line-height: 1.5;
	}
</style>
