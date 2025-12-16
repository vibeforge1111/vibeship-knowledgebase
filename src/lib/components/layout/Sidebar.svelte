<script lang="ts">
	import { page } from '$app/stores';

	const navSections = [
		{
			title: 'Knowledge Base',
			items: [
				{ href: '/kb', label: 'Overview', icon: '📚' },
				{ href: '/kb/vulnerabilities', label: 'Vulnerabilities', icon: '🔓' },
				{ href: '/kb/ai-patterns', label: 'AI Patterns', icon: '🤖' },
				{ href: '/kb/stacks', label: 'Stacks', icon: '📦' },
				{ href: '/kb/fixes', label: 'Fix Prompts', icon: '🔧' },
				{ href: '/kb/glossary', label: 'Glossary', icon: '📖' },
				{ href: '/kb/checklists', label: 'Checklists', icon: '✅' }
			]
		},
		{
			title: 'Research',
			items: [
				{ href: '/research/vulnerability-index', label: 'Vulnerability Index', icon: '📊' },
				{ href: '/research/ai-tool-comparison', label: 'AI Tool Comparison', icon: '⚖️' },
				{ href: '/research/methodology', label: 'Methodology', icon: '🔬' }
			]
		},
		{
			title: 'Resources',
			items: [
				{ href: '/blog', label: 'Blog', icon: '✍️' },
				{ href: '/tools', label: 'Tools', icon: '🛠️' }
			]
		}
	];

	function isActive(href: string, currentPath: string): boolean {
		if (href === '/kb') {
			return currentPath === '/kb';
		}
		return currentPath.startsWith(href);
	}
</script>

<aside class="sidebar">
	<div class="sidebar-header">
		<a href="/" class="sidebar-logo">
			<span class="sidebar-logo-text">VibeShip KB</span>
		</a>
	</div>

	<div class="sidebar-search">
		<svg class="sidebar-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
			<circle cx="11" cy="11" r="8"></circle>
			<path d="m21 21-4.35-4.35"></path>
		</svg>
		<input type="text" class="search-input" placeholder="Search docs..." />
	</div>

	<nav class="sidebar-nav">
		{#each navSections as section}
			<div class="nav-section">
				<div class="nav-section-title">{section.title}</div>
				{#each section.items as item}
					<a
						href={item.href}
						class="nav-link"
						class:active={isActive(item.href, $page.url.pathname)}
					>
						<span>{item.icon}</span>
						<span>{item.label}</span>
					</a>
				{/each}
			</div>
		{/each}
	</nav>

	<div class="sidebar-footer">
		<a href="https://scanner.vibeship.co" class="btn btn-primary" style="width: 100%; justify-content: center;">
			Scan Your Code
		</a>
	</div>
</aside>
