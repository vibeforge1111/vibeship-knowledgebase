<script lang="ts">
	import { Header, SearchModal } from '$lib/components/layout';
	import { Terminal } from '$lib/components/ui';

	let searchOpen = $state(false);

	const categories = [
		{
			href: '/kb/security/vulnerabilities',
			title: 'Vulnerabilities',
			description: 'Deep dives into SQL injection, XSS, hardcoded secrets, and 18+ security vulnerabilities common in AI-generated code.',
			count: '18 articles'
		},
		{
			href: '/kb/vibe-coding-tools',
			title: 'AI Tool Patterns',
			description: 'Security patterns specific to Cursor, Claude Code, Bolt, v0, and other AI coding tools.',
			count: '8 tools'
		},
		{
			href: '/kb/security/stacks',
			title: 'Stack Guides',
			description: 'Security guides for Next.js + Supabase, Next.js + Prisma, SvelteKit + Supabase, and more.',
			count: '3 stacks'
		},
		{
			href: '/kb/security/checklists',
			title: 'Checklists',
			description: 'Security checklists for pre-launch review and deployment verification.',
			count: '1 checklist'
		}
	];

	const icons: Record<string, string> = {
		'/kb/security/vulnerabilities': 'lock',
		'/kb/vibe-coding-tools': 'cpu',
		'/kb/security/stacks': 'layers',
		'/kb/security/checklists': 'check-square'
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
		<button class="kb-search-trigger" onclick={() => searchOpen = true}>
			<svg class="kb-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<circle cx="11" cy="11" r="8"/>
				<path d="M21 21l-4.35-4.35"/>
			</svg>
			<span class="kb-search-placeholder">Search vulnerabilities, tools, guides...</span>
			<kbd class="kb-search-shortcut">⌘K</kbd>
		</button>

		<SearchModal isOpen={searchOpen} onClose={() => searchOpen = false} />

		<div class="terminal-section">
			<Terminal />
		</div>

		<div class="hub-grid">
			{#each categories as cat}
				<a href={cat.href} class="card card-interactive">
					<div class="category-icon">
						{#if cat.href === '/kb/security/vulnerabilities'}
							<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
								<rect x="3" y="11" width="18" height="11" rx="2"/>
								<path d="M7 11V7a5 5 0 0 1 10 0v4"/>
							</svg>
						{:else if cat.href === '/kb/vibe-coding-tools'}
							<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
								<rect x="4" y="4" width="16" height="16" rx="2"/>
								<rect x="9" y="9" width="6" height="6"/>
								<path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/>
							</svg>
						{:else if cat.href === '/kb/security/stacks'}
							<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
								<path d="M12 2L2 7l10 5 10-5-10-5z"/>
								<path d="M2 17l10 5 10-5"/>
								<path d="M2 12l10 5 10-5"/>
							</svg>
						{:else if cat.href === '/kb/security/checklists'}
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
	.kb-search-trigger {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem 1.25rem;
		margin-bottom: 2rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		cursor: pointer;
		transition: border-color 0.15s ease, box-shadow 0.15s ease;
	}

	.kb-search-trigger:hover {
		border-color: var(--text-tertiary);
	}

	.kb-search-icon {
		color: var(--text-tertiary);
		flex-shrink: 0;
	}

	.kb-search-placeholder {
		flex: 1;
		text-align: left;
		font-size: 1.125rem;
		color: var(--text-tertiary);
	}

	.kb-search-shortcut {
		padding: 0.25rem 0.5rem;
		background: var(--bg-primary);
		border: 1px solid var(--border);
		font-family: 'JetBrains Mono', monospace;
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

		.kb-search-placeholder {
			font-size: 1rem;
		}

		.kb-search-shortcut {
			display: none;
		}
	}
</style>
