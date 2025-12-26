<script lang="ts">
	import { Header } from '$lib/components/layout';

	const checklists = [
		{
			slug: 'pre-launch',
			name: 'Pre-Launch Security Checklist',
			description: 'Essential security checks before deploying your vibe coded app to production.',
			items: 15
		}
	];
</script>

<svelte:head>
	<title>Security Checklists | VibeShip</title>
	<meta name="description" content="Security checklists for vibe coders. Pre-launch checks, API security, authentication, and more." />
	<meta property="og:title" content="Security Checklists | VibeShip" />
	<meta property="og:description" content="Security checklists for vibe coders. Pre-launch checks, API security, authentication, and more." />
	<meta property="og:url" content="/kb/security/checklists/" />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Security Checklists | VibeShip" />
	<meta name="twitter:description" content="Security checklists for vibe coders. Pre-launch checks, API security, authentication, and more." />
	<link rel="canonical" href="https://vibeship.co/kb/security/checklists/" />
</svelte:head>

<Header breadcrumbs={[
	{ label: 'Knowledge Base', href: '/kb' },
	{ label: 'Security' },
	{ label: 'Checklists' }
]} />

<div class="content-wrapper">
	<div class="content-main content-wide">
		<div class="article-header">
			<h1>Security Checklists</h1>
			<p class="text-secondary" style="font-size: 1.1rem; max-width: 650px;">
				Quick security checklists to verify your AI-generated code before shipping.
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
				Use these checklists as a final check before deploying. They cover the most critical security items that AI tools often miss.
			</p>
		</div>

		<section class="article-section">
			<h2>Available Checklists</h2>
			<div class="checklist-grid">
				{#each checklists as checklist}
					<a href="/kb/security/checklists/{checklist.slug}" class="card card-interactive checklist-card">
						<div class="checklist-card-header">
							<h3>{checklist.name}</h3>
							<span class="badge">{checklist.items} items</span>
						</div>
						<p class="checklist-description">{checklist.description}</p>
					</a>
				{/each}
			</div>
		</section>

		<section class="article-section">
			<h2>Coming Soon</h2>
			<ul>
				<li>API Security Checklist</li>
				<li>Authentication Checklist</li>
				<li>Database Security Checklist</li>
				<li>Frontend Security Checklist</li>
			</ul>
		</section>
	</div>
</div>

<style>
	.checklist-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: 1rem;
		margin-top: 1.5rem;
	}

	.checklist-card {
		text-decoration: none;
		color: inherit;
	}

	.checklist-card:hover {
		text-decoration: none;
	}

	.checklist-card-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 0.75rem;
	}

	.checklist-card h3 {
		margin: 0;
		font-size: 1.1rem;
		color: var(--text-primary);
	}

	.checklist-description {
		margin: 0.75rem 0 0;
		font-size: 0.85rem;
		color: var(--text-secondary);
		line-height: 1.5;
	}
</style>
