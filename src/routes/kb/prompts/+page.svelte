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
	<header class="page-header">
		<h1>AI Prompts & Configuration</h1>
		<p class="text-secondary">Configure your AI coding tools for better, more secure code generation</p>
	</header>

	{#each categories as category}
		<section class="category-section">
			<h2>{category.title}</h2>
			<p class="category-desc">{category.description}</p>

			<div class="article-grid">
				{#each category.articles as article}
					<a href={article.href} class="article-card" class:coming-soon={article.badge === 'Coming Soon'}>
						<span class="article-badge">{article.badge}</span>
						<h3>{article.title}</h3>
						<p>{article.description}</p>
					</a>
				{/each}
			</div>
		</section>
	{/each}
</div>

<style>
	.content-wrapper {
		max-width: 900px;
		margin: 0 auto;
		padding: 2rem;
	}

	.page-header {
		margin-bottom: 3rem;
	}

	h1 {
		font-size: 2.5rem;
		margin-bottom: 0.5rem;
	}

	.text-secondary {
		color: var(--text-secondary, #888);
		font-size: 1.1rem;
	}

	.category-section {
		margin-bottom: 3rem;
	}

	h2 {
		font-size: 1.5rem;
		margin-bottom: 0.5rem;
	}

	.category-desc {
		color: var(--text-secondary, #888);
		margin-bottom: 1.5rem;
	}

	.article-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1rem;
	}

	.article-card {
		display: block;
		padding: 1.5rem;
		background: var(--surface-1, #1a1a1a);
		border: 1px solid var(--border, #333);
		border-radius: 8px;
		text-decoration: none;
		transition: border-color 0.2s, transform 0.2s;
	}

	.article-card:hover {
		border-color: #8b5cf6;
		transform: translateY(-2px);
	}

	.article-card.coming-soon {
		opacity: 0.6;
		pointer-events: none;
	}

	.article-badge {
		display: inline-block;
		padding: 0.25rem 0.5rem;
		background: #8b5cf6;
		color: white;
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		border-radius: 4px;
		margin-bottom: 0.75rem;
	}

	.article-card h3 {
		margin: 0 0 0.5rem 0;
		color: var(--text-primary, #fff);
	}

	.article-card p {
		margin: 0;
		font-size: 0.9rem;
		color: var(--text-secondary, #888);
	}
</style>
