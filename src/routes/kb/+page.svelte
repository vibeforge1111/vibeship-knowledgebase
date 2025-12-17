<script lang="ts">
	import { Header } from '$lib/components/layout';
	import { Terminal } from '$lib/components/ui';
	import { goto } from '$app/navigation';

	let searchQuery = $state('');

	function handleSearch(e: Event) {
		e.preventDefault();
		if (searchQuery.trim()) {
			goto(`/kb/search?q=${encodeURIComponent(searchQuery.trim())}`);
		}
	}

	const categories = [
		{
			href: '/kb/vulnerabilities',
			title: 'Vulnerabilities',
			description: 'Deep dives into SQL injection, XSS, hardcoded secrets, and 20+ security vulnerabilities common in AI-generated code.',
			count: '25+ articles'
		},
		{
			href: '/kb/ai-patterns',
			title: 'AI Patterns',
			description: 'Security patterns specific to Cursor, Claude Code, Bolt, v0, and other AI coding tools. Our unique moat.',
			count: '7 tools'
		},
		{
			href: '/kb/stacks',
			title: 'Stack Guides',
			description: 'Security guides for Next.js + Supabase, Express + PostgreSQL, SvelteKit, and other popular stacks.',
			count: '6 stacks'
		},
		{
			href: '/kb/fixes',
			title: 'Fix Prompts',
			description: 'Copy-paste AI prompts to fix vulnerabilities. Framework-specific, battle-tested, ready to use.',
			count: '50+ prompts'
		},
		{
			href: '/kb/glossary',
			title: 'Glossary',
			description: 'Plain English definitions of security terms. No jargon, no gatekeeping.',
			count: '100+ terms'
		},
		{
			href: '/kb/checklists',
			title: 'Checklists',
			description: 'Interactive security checklists for pre-launch, API security, authentication, and more.',
			count: '10+ checklists'
		}
	];

	const icons: Record<string, string> = {
		'/kb/vulnerabilities': 'lock',
		'/kb/ai-patterns': 'cpu',
		'/kb/stacks': 'layers',
		'/kb/fixes': 'tool',
		'/kb/glossary': 'book',
		'/kb/checklists': 'check-square'
	};
</script>

<svelte:head>
	<title>Knowledge Base | Vibeship</title>
	<meta name="description" content="The definitive knowledge base for AI-generated code security. Learn about vulnerabilities, AI coding patterns, and how to fix security issues.">
</svelte:head>

<Header breadcrumbs={[{ label: 'Knowledge Base' }]} />

<div class="content-wrapper">
	<div class="content-main content-wide">
		<div class="article-header">
			<h1>Knowledge Base</h1>
			<p class="text-secondary" style="font-size: 1.2rem; max-width: 600px;">
				Everything you need to know about security in AI-generated code. Written for vibe coders, backed by data.
			</p>
		</div>

		<!-- Prominent Search Bar -->
		<form class="kb-search-form" onsubmit={handleSearch}>
			<div class="kb-search-container">
				<svg class="kb-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="11" cy="11" r="8"/>
					<path d="M21 21l-4.35-4.35"/>
				</svg>
				<input
					type="text"
					class="kb-search-input"
					placeholder="Search vulnerabilities, fixes, AI patterns..."
					bind:value={searchQuery}
				/>
				<kbd class="kb-search-shortcut">/</kbd>
			</div>
		</form>

		<div class="terminal-section">
			<Terminal />
		</div>

		<div class="hub-grid">
			{#each categories as cat}
				<a href={cat.href} class="card card-interactive">
					<div class="category-icon">
						{#if cat.href === '/kb/vulnerabilities'}
							<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
								<rect x="3" y="11" width="18" height="11" rx="2"/>
								<path d="M7 11V7a5 5 0 0 1 10 0v4"/>
							</svg>
						{:else if cat.href === '/kb/ai-patterns'}
							<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
								<rect x="4" y="4" width="16" height="16" rx="2"/>
								<rect x="9" y="9" width="6" height="6"/>
								<path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/>
							</svg>
						{:else if cat.href === '/kb/stacks'}
							<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
								<path d="M12 2L2 7l10 5 10-5-10-5z"/>
								<path d="M2 17l10 5 10-5"/>
								<path d="M2 12l10 5 10-5"/>
							</svg>
						{:else if cat.href === '/kb/fixes'}
							<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
								<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
							</svg>
						{:else if cat.href === '/kb/glossary'}
							<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
								<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
								<path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
							</svg>
						{:else if cat.href === '/kb/checklists'}
							<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
								<path d="M9 11l3 3L22 4"/>
								<path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
							</svg>
						{/if}
					</div>
					<h3 style="margin-top: 0; margin-bottom: 0.5rem;">{cat.title}</h3>
					<p style="margin-bottom: 0.75rem; color: var(--text-secondary);">{cat.description}</p>
					<span class="badge">{cat.count}</span>
				</a>
			{/each}
		</div>

		<div class="divider"></div>

		<section class="article-section">
			<h2>Why This Knowledge Base?</h2>
			<p>
				AI coding tools like Cursor, Claude Code, and Bolt are transforming how we build software. But they're also introducing new security patterns, and new vulnerabilities.
			</p>
			<p>
				When you're vibe coding, AI tools prioritize working code over secure code. They generate template literals instead of parameterized queries. They hardcode API keys to make examples run immediately. They skip authentication because you didn't ask for it.
			</p>
			<p>
				This knowledge base exists to help you understand these vulnerabilities, why AI tools create them, and how to fix them. We provide copy-paste prompts you can use directly in your AI coding tool.
			</p>
		</section>

		<section class="article-section">
			<h2>What Makes Us Different</h2>
			<div class="features-grid">
				<div class="feature-item">
					<div class="feature-icon">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
							<rect x="4" y="4" width="16" height="16"/>
							<rect x="9" y="9" width="6" height="6"/>
							<path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/>
						</svg>
					</div>
					<h3>Vibe Coding Friendly</h3>
					<p>Cursor, Claude Code, Bolt, v0, Lovable, Replit, Windsurf, Copilot, Gemini, and more</p>
				</div>
				<div class="feature-item">
					<div class="feature-icon">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
							<rect x="9" y="9" width="13" height="13"/>
							<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
						</svg>
					</div>
					<h3>Copy-Paste Fixes</h3>
					<p>AI prompts you can paste directly into your coding tool to fix vulnerabilities</p>
				</div>
				<div class="feature-item">
					<div class="feature-icon">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
							<path d="M12 2L2 7l10 5 10-5-10-5z"/>
							<path d="M2 17l10 5 10-5"/>
							<path d="M2 12l10 5 10-5"/>
						</svg>
					</div>
					<h3>Stack-Specific</h3>
					<p>Guides for Next.js + Supabase, Express + PostgreSQL, SvelteKit, and more</p>
				</div>
				<div class="feature-item">
					<div class="feature-icon">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
							<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
							<path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
						</svg>
					</div>
					<h3>Plain English</h3>
					<p>Every term explained. SQL injection = "attackers type code into your forms"</p>
				</div>
			</div>
		</section>
	</div>
</div>

<style>
	/* Prominent Search Bar */
	.kb-search-form {
		margin-bottom: 2rem;
	}

	.kb-search-container {
		position: relative;
		display: flex;
		align-items: center;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		transition: border-color 0.15s ease, box-shadow 0.15s ease;
	}

	.kb-search-container:focus-within {
		border-color: var(--green);
		box-shadow: 0 0 0 3px var(--green-dim);
	}

	.kb-search-icon {
		position: absolute;
		left: 1.25rem;
		color: var(--text-tertiary);
		pointer-events: none;
	}

	.kb-search-input {
		flex: 1;
		background: transparent;
		border: none;
		padding: 1.125rem 1rem 1.125rem 3.5rem;
		font-size: 1.125rem;
		color: var(--text-primary);
		outline: none;
	}

	.kb-search-input::placeholder {
		color: var(--text-tertiary);
	}

	.kb-search-shortcut {
		margin-right: 1rem;
		padding: 0.25rem 0.5rem;
		background: var(--bg-tertiary);
		border: 1px solid var(--border);
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--text-tertiary);
	}

	.terminal-section {
		margin-bottom: 2.5rem;
	}

	.category-icon {
		margin-bottom: 1rem;
		color: var(--text-primary);
	}

	.category-icon svg {
		display: block;
	}

	/* Features Grid */
	.features-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5rem;
		margin-top: 1.5rem;
	}

	.feature-item {
		padding: 1.5rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
	}

	.feature-icon {
		margin-bottom: 1rem;
		color: var(--green);
	}

	.feature-item h3 {
		margin: 0 0 0.5rem;
		font-size: 1rem;
		font-weight: 600;
	}

	.feature-item p {
		margin: 0;
		font-size: 0.875rem;
		color: var(--text-secondary);
		line-height: 1.5;
	}

	@media (max-width: 640px) {
		.features-grid {
			grid-template-columns: 1fr;
		}

		.kb-search-input {
			font-size: 1rem;
			padding: 1rem 1rem 1rem 3rem;
		}

		.kb-search-shortcut {
			display: none;
		}
	}
</style>
