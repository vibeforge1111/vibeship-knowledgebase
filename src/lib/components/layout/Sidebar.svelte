<script lang="ts">
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import SearchModal from './SearchModal.svelte';

	interface Counts {
		vulnerabilities: number;
		vibeTools: number;
		stacks: number;
		checklists: number;
		prompts: number;
	}

	interface Props {
		isOpen?: boolean;
		onClose?: () => void;
		counts?: Counts;
	}

	let { isOpen = false, onClose, counts }: Props = $props();
	let searchOpen = $state(false);

	// Global keyboard shortcut for Cmd+K / Ctrl+K
	$effect(() => {
		if (!browser) return;

		function handleKeydown(e: KeyboardEvent) {
			if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
				e.preventDefault();
				searchOpen = true;
			}
		}

		document.addEventListener('keydown', handleKeydown);
		return () => document.removeEventListener('keydown', handleKeydown);
	});

	const navSections = $derived([
		{
			title: 'Knowledge Base',
			items: [
				{ href: '/kb', label: 'Overview' },
				{ href: '/kb/security/vulnerabilities', label: 'Vulnerabilities', badge: counts?.vulnerabilities?.toString() || '0' },
				{ href: '/kb/vibe-coding-tools', label: 'Vibe Coding Tools', badge: counts?.vibeTools?.toString() || '0' },
				{ href: '/kb/security/stacks', label: 'Stack Guides', badge: counts?.stacks?.toString() || '0' },
				{ href: '/kb/security/checklists', label: 'Checklists', badge: counts?.checklists?.toString() || '0' },
				{ href: '/kb/prompts', label: 'Prompts', badge: counts?.prompts?.toString() || '0' }
			]
		},
		{
			title: 'Guides',
			items: [
				{ href: '/kb/vibe-coding/secure-vibe-coding-guide', label: 'Secure Vibe Coding' },
				{ href: '/kb/agents/security/mcp-servers', label: 'MCP Server Security' }
			]
		}
	]);

	function isActive(href: string, currentPath: string): boolean {
		if (href === '/kb') {
			return currentPath === '/kb';
		}
		return currentPath.startsWith(href);
	}
</script>

<aside class="app-sidebar" class:open={isOpen}>
	<div class="sidebar-logo">
		<a href="/kb" class="sidebar-logo-link">
			<img src="/logo.png" alt="vibeship" class="sidebar-logo-img" />
			<span class="sidebar-logo-text">vibeship</span>
			<span class="sidebar-logo-product">kb</span>
		</a>
	</div>

	<div class="sidebar-search">
		<button class="search-trigger" onclick={() => searchOpen = true}>
			<svg class="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
				<circle cx="11" cy="11" r="8"/>
				<path d="m21 21-4.35-4.35"/>
			</svg>
			<span class="search-placeholder">Search...</span>
			<span class="search-shortcut">⌘K</span>
		</button>
	</div>

	<SearchModal isOpen={searchOpen} onClose={() => searchOpen = false} />

	<nav class="sidebar-nav">
		{#each navSections as section}
			<div class="sidebar-section">
				<div class="sidebar-section-title">{section.title}</div>
				{#each section.items as item}
					<a
						href={item.href}
						class="sidebar-link"
						class:active={isActive(item.href, $page.url.pathname)}
						onclick={onClose}
					>
						<span>{item.label}</span>
						{#if item.badge}
							<span class="sidebar-badge">{item.badge}</span>
						{/if}
					</a>
				{/each}
			</div>
		{/each}
	</nav>

	<div class="sidebar-footer">
		<a href="https://scanner.vibeship.co" target="_blank" class="scan-btn">
			<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
				<path d="M9 12l2 2 4-4"/>
			</svg>
			Scan Your Code
		</a>
	</div>
</aside>

<style>
	.app-sidebar {
		width: 260px;
		background: var(--bg-secondary);
		border-right: 1px solid var(--border);
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		display: flex;
		flex-direction: column;
		z-index: 100;
	}

	.sidebar-logo {
		height: 60px;
		padding: 0 1.5rem;
		border-bottom: 1px solid var(--border);
		display: flex;
		align-items: center;
	}

	.sidebar-logo-link {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		text-decoration: none;
	}

	.sidebar-logo-img {
		height: 28px;
		width: auto;
		filter: invert(var(--logo-invert));
	}

	.sidebar-logo-text {
		font-family: 'Instrument Serif', serif;
		font-size: 1.35rem;
		font-weight: 400;
		color: var(--text-primary);
		line-height: 1;
		letter-spacing: -0.02em;
	}

	.sidebar-logo-product {
		font-family: 'Instrument Serif', serif;
		font-size: 1.35rem;
		font-weight: 400;
		color: var(--green-dim);
		line-height: 1;
		letter-spacing: -0.02em;
		margin-left: -0.15rem;
	}

	.sidebar-search {
		padding: 1rem 1rem;
		border-bottom: 1px solid var(--border);
	}

	.search-trigger {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 0.75rem;
		background: var(--bg-primary);
		border: 1px solid var(--border);
		cursor: pointer;
		transition: border-color 0.15s;
	}

	.search-trigger:hover {
		border-color: var(--text-tertiary);
	}

	.search-icon {
		color: var(--text-tertiary);
		flex-shrink: 0;
	}

	.search-placeholder {
		flex: 1;
		text-align: left;
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.8rem;
		color: var(--text-tertiary);
	}

	.search-shortcut {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.65rem;
		color: var(--text-tertiary);
		background: var(--bg-secondary);
		padding: 0.15rem 0.35rem;
		border: 1px solid var(--border);
	}

	.sidebar-nav {
		flex: 1;
		padding: 1rem 0;
		overflow-y: auto;
	}

	.sidebar-section {
		margin-bottom: 1.5rem;
	}

	.sidebar-section-title {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.65rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--text-tertiary);
		padding: 0 1.5rem;
		margin-bottom: 0.5rem;
	}

	.sidebar-link {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.6rem 1.5rem;
		color: var(--text-secondary);
		text-decoration: none;
		font-size: 0.85rem;
		transition: all 0.15s;
		position: relative;
	}

	.sidebar-link:hover {
		background: var(--bg-primary);
		color: var(--text-primary);
	}

	.sidebar-link.active {
		background: var(--bg-primary);
		color: var(--green-dim);
		font-weight: 500;
	}

	.sidebar-link.active::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 3px;
		background: var(--green-dim);
	}

	.sidebar-badge {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.6rem;
		font-weight: 600;
		padding: 0.1rem 0.35rem;
		background: transparent;
		border: 1px solid var(--border);
		color: var(--text-tertiary);
		text-transform: uppercase;
		letter-spacing: 0.02em;
	}

	.sidebar-link.active .sidebar-badge {
		border-color: var(--green-dim);
		color: var(--green-dim);
	}

	.sidebar-footer {
		padding: 1rem 1rem;
	}

	.scan-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		width: 100%;
		padding: 0.5rem 0.75rem;
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--text-primary);
		text-decoration: none;
		border: 1px solid var(--text-primary);
		transition: all 0.15s;
	}

	.scan-btn:hover {
		background: var(--text-primary);
		color: var(--bg-primary);
	}

	/* Mobile responsive */
	@media (max-width: 768px) {
		.app-sidebar {
			transform: translateX(-100%);
			transition: transform 0.3s;
		}

		.app-sidebar.open {
			transform: translateX(0);
		}
	}
</style>
