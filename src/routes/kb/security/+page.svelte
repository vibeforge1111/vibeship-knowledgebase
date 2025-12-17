<script lang="ts">
	import { Header } from '$lib/components/layout';
</script>

<svelte:head>
	<title>Security Knowledge Base | Vibeship</title>
	<meta name="description" content="Security guides for vibe coders. Vulnerabilities, stack guides, checklists, and AI fix prompts for AI-generated code.">
</svelte:head>

<Header breadcrumbs={[
	{ label: 'Knowledge Base', href: '/kb' },
	{ label: 'Security' }
]} />

<div class="content-wrapper">
	<div class="content-main content-wide">
		<div class="article-header">
			<h1>Security Knowledge Base</h1>
			<p class="text-secondary" style="font-size: 1.1rem; max-width: 650px;">
				Everything you need to secure your AI-generated code. Vulnerabilities, stack guides, and checklists for vibe coders.
			</p>
		</div>

		<div class="section-grid">
			<a href="/kb/security/vulnerabilities" class="card card-interactive section-card">
				<div class="section-icon">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<path d="M12 9v4m0 4h.01M5.07 19H19a2 2 0 001.75-2.95L13.75 4a2 2 0 00-3.5 0L3.25 16.05A2 2 0 005.07 19z"/>
					</svg>
				</div>
				<h3>Vulnerabilities</h3>
				<p>18 common security issues in AI-generated code with detection methods and AI fix prompts.</p>
				<span class="section-link">View all vulnerabilities</span>
			</a>

			<a href="/kb/security/stacks" class="card card-interactive section-card">
				<div class="section-icon">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
					</svg>
				</div>
				<h3>Stack Guides</h3>
				<p>Security guides for Next.js + Supabase, Next.js + Prisma, and SvelteKit + Supabase.</p>
				<span class="section-link">View stack guides</span>
			</a>

			<a href="/kb/security/checklists" class="card card-interactive section-card">
				<div class="section-icon">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
					</svg>
				</div>
				<h3>Checklists</h3>
				<p>Quick security checklists to verify your code before shipping to production.</p>
				<span class="section-link">View checklists</span>
			</a>
		</div>
	</div>
</div>

<style>
	.section-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1.5rem;
		margin-top: 2rem;
	}

	.section-card {
		text-decoration: none;
		color: inherit;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.section-card:hover {
		text-decoration: none;
	}

	.section-icon {
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--bg-primary);
		border: 1px solid var(--border);
		color: var(--green-dim);
	}

	.section-card h3 {
		margin: 0;
		font-size: 1.2rem;
		color: var(--text-primary);
	}

	.section-card p {
		margin: 0;
		font-size: 0.9rem;
		color: var(--text-secondary);
		line-height: 1.5;
	}

	.section-link {
		font-size: 0.85rem;
		color: var(--green-dim);
		margin-top: auto;
	}

	.section-card:hover .section-link {
		text-decoration: underline;
	}
</style>
