<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'AI Coding Prompts & Configuration Guides | VibeShip',
		description: 'Master AI coding tools with our prompts and configuration guides. Learn Cursor rules, CLAUDE.md, system prompts, and security-focused configurations.',
		url: '/kb/prompts/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Prompts & Config' }
	];

	// Content categories
	const categories = [
		{
			title: 'Tool Configuration',
			description: 'Set up your AI coding tools for better, more secure output',
			articles: [
				{
					title: 'Cursor Rules',
					description: 'Complete guide to .cursorrules with security templates',
					href: '/kb/prompts/cursor-rules/',
					badge: 'Guide'
				},
				{
					title: 'Cursor Rules Examples',
					description: '20+ copy-paste templates for every stack',
					href: '/kb/prompts/cursor-rules-examples/',
					badge: 'Templates'
				},
				{
					title: 'CLAUDE.md',
					description: 'Configure Claude Code with memory and rules',
					href: '/kb/prompts/claude-md/',
					badge: 'Guide'
				}
			]
		}
	];
</script>

<svelte:head>
	<title>{meta.title}</title>
	<meta name="description" content={meta.description} />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:url" content={meta.url} />
	<meta property="og:type" content="website" />
	<link rel="canonical" href="https://vibeship.co{meta.url}" />
</svelte:head>

<Header {breadcrumbs} />

<div class="content-wrapper">
	<div class="content-main content-wide">
		<div class="article-header">
			<h1>AI Prompts & Configuration</h1>
			<p class="text-secondary" style="font-size: 1.1rem; max-width: 650px;">
				Configure your AI coding tools for better, more secure code generation
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
				Proper configuration of AI coding tools dramatically improves output quality and security. Start with <a href="/kb/prompts/cursor-rules/">Cursor Rules</a> for Cursor IDE or <a href="/kb/prompts/claude-md/">CLAUDE.md</a> for Claude Code.
			</p>
		</div>

		{#each categories as category}
			<section class="article-section">
				<h2>{category.title}</h2>
				<p class="category-desc">{category.description}</p>

				<div class="article-grid">
					{#each category.articles as article}
						<a href={article.href} class="card card-interactive article-card" class:coming-soon={article.badge === 'Coming Soon'}>
							<div class="article-card-header">
								<h3>{article.title}</h3>
								<span class="badge">{article.badge}</span>
							</div>
							<p class="article-description">{article.description}</p>
						</a>
					{/each}
				</div>
			</section>
		{/each}
	</div>
</div>

<style>
	.category-desc {
		color: var(--text-secondary);
		margin-bottom: 1.5rem;
	}

	.article-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1rem;
	}

	.article-card {
		text-decoration: none;
		color: inherit;
	}

	.article-card:hover {
		text-decoration: none;
	}

	.article-card-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 0.75rem;
	}

	.article-card h3 {
		margin: 0;
		font-size: 1.1rem;
		color: var(--text-primary);
	}

	.article-description {
		margin: 0.75rem 0 0 0;
		font-size: 0.85rem;
		color: var(--text-secondary);
		line-height: 1.5;
	}

	.article-card.coming-soon {
		opacity: 0.6;
		pointer-events: none;
	}
</style>
