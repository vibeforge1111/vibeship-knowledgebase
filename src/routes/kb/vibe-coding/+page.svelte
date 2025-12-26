<script lang="ts">
	import { Header } from '$lib/components/layout';

	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Vibe Coding' }
	];
</script>

<svelte:head>
	<title>Vibe Coding Guides | VibeShip</title>
	<meta name="description" content="Learn what vibe coding is, how to do it safely, and best practices for building with AI coding assistants." />
	<meta property="og:title" content="Vibe Coding Guides | VibeShip" />
	<meta property="og:description" content="Learn what vibe coding is, how to do it safely, and best practices for building with AI coding assistants." />
	<meta property="og:url" content="/kb/vibe-coding/" />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Vibe Coding Guides | VibeShip" />
	<meta name="twitter:description" content="Learn what vibe coding is, how to do it safely, and best practices for building with AI coding assistants." />
	<link rel="canonical" href="https://vibeship.co/kb/vibe-coding/" />
</svelte:head>

<Header {breadcrumbs} />

<div class="content-wrapper">
	<article class="content-main content-wide">
		<header class="page-header">
			<h1>Vibe Coding</h1>
			<p class="text-secondary">Build software by describing what you want to AI</p>
		</header>

		<div class="guides-grid">
			<a href="/kb/vibe-coding/what-is-vibe-coding/" class="guide-card">
				<div class="guide-icon">?</div>
				<h2>What is Vibe Coding?</h2>
				<p>The term coined by Andrej Karpathy in 2025. Learn what it means and how it's changing software development.</p>
			</a>

			<a href="/kb/vibe-coding/secure-vibe-coding-guide/" class="guide-card featured">
				<div class="guide-icon">*</div>
				<h2>Secure Vibe Coding Guide</h2>
				<p>Complete guide to building safely with AI. Security prompts, review checklists, and pre-launch verification.</p>
			</a>
		</div>

		<section class="more-resources">
			<h2>Related Resources</h2>
			<div class="resource-links">
				<a href="/kb/vibe-coding-tools/">Vibe Coding Tools</a>
				<a href="/kb/prompts/cursor-rules/">Cursor Rules Guide</a>
				<a href="/kb/security/vulnerabilities/">Common Vulnerabilities</a>
			</div>
		</section>
	</article>
</div>

<style>
	.page-header { margin-bottom: 2rem; }
	.page-header h1 { margin-bottom: 0.5rem; }

	.guides-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1.5rem;
		margin-bottom: 3rem;
	}

	.guide-card {
		display: block;
		padding: 2rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		text-decoration: none;
		transition: border-color 0.2s;
	}

	.guide-card:hover {
		border-color: var(--green);
	}

	.guide-card.featured {
		border-color: var(--green-dim);
	}

	.guide-icon {
		font-size: 2rem;
		margin-bottom: 1rem;
		color: var(--green);
	}

	.guide-card h2 {
		font-size: 1.25rem;
		margin: 0 0 0.75rem;
		color: var(--text-primary);
	}

	.guide-card p {
		margin: 0;
		color: var(--text-secondary);
		font-size: 0.9375rem;
		line-height: 1.6;
	}

	.more-resources h2 {
		font-size: 1.125rem;
		margin-bottom: 1rem;
	}

	.resource-links {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.resource-links a {
		padding: 0.5rem 1rem;
		background: var(--bg-tertiary);
		border: 1px solid var(--border);
		color: var(--text-secondary);
		text-decoration: none;
		font-size: 0.875rem;
	}

	.resource-links a:hover {
		color: var(--green);
		border-color: var(--green);
	}
</style>
