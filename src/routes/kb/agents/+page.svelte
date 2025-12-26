<script lang="ts">
	import { Header } from '$lib/components/layout';

	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Agents' }
	];
</script>

<svelte:head>
	<title>AI Agent Security | VibeShip</title>
	<meta name="description" content="Security guides for AI agents, MCP servers, and autonomous coding tools." />
	<meta property="og:title" content="AI Agent Security | VibeShip" />
	<meta property="og:description" content="Security guides for AI agents, MCP servers, and autonomous coding tools." />
	<meta property="og:url" content="/kb/agents/" />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="AI Agent Security | VibeShip" />
	<meta name="twitter:description" content="Security guides for AI agents, MCP servers, and autonomous coding tools." />
	<link rel="canonical" href="https://vibeship.co/kb/agents/" />
</svelte:head>

<Header {breadcrumbs} />

<div class="content-wrapper">
	<article class="content-main content-wide">
		<header class="page-header">
			<h1>AI Agent Security</h1>
			<p class="text-secondary">Securing autonomous AI coding tools and plugins</p>
		</header>

		<div class="guides-grid">
			<a href="/kb/agents/security/mcp-servers/" class="guide-card">
				<div class="guide-icon">+</div>
				<h2>MCP Server Security</h2>
				<p>Model Context Protocol servers extend AI capabilities. Learn how to use them safely and avoid prompt injection through plugins.</p>
			</a>
		</div>

		<section class="more-resources">
			<h2>Related Resources</h2>
			<div class="resource-links">
				<a href="/kb/security/vulnerabilities/prompt-injection/">Prompt Injection</a>
				<a href="/kb/vibe-coding-tools/">Vibe Coding Tools</a>
				<a href="/kb/vibe-coding/secure-vibe-coding-guide/">Secure Vibe Coding</a>
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
