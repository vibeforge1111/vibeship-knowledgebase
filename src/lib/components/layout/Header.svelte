<script lang="ts">
	let { breadcrumbs = [] }: { breadcrumbs?: Array<{ label: string; href?: string }> } = $props();

	function toggleTheme() {
		const current = document.documentElement.getAttribute('data-theme');
		const next = current === 'dark' ? 'light' : 'dark';
		document.documentElement.setAttribute('data-theme', next);
		localStorage.setItem('theme', next);
	}
</script>

<header class="top-header">
	<div class="top-header-left">
		<button class="mobile-menu-btn" aria-label="Open menu">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
				<line x1="3" y1="12" x2="21" y2="12"/>
				<line x1="3" y1="6" x2="21" y2="6"/>
				<line x1="3" y1="18" x2="21" y2="18"/>
			</svg>
		</button>

		{#if breadcrumbs.length > 0}
			<nav class="breadcrumbs">
				<a href="/">Home</a>
				{#each breadcrumbs as crumb, i}
					<span class="breadcrumbs-separator">/</span>
					{#if crumb.href && i < breadcrumbs.length - 1}
						<a href={crumb.href}>{crumb.label}</a>
					{:else}
						<span class="breadcrumbs-current">{crumb.label}</span>
					{/if}
				{/each}
			</nav>
		{/if}
	</div>

	<div class="top-header-right">
		<a href="https://github.com/vibeforge1111" class="btn btn-sm btn-outline" target="_blank" rel="noopener">
			GitHub
		</a>
		<button class="theme-toggle" onclick={toggleTheme} aria-label="Toggle theme">
			<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
				<circle cx="12" cy="12" r="5"/>
				<line x1="12" y1="1" x2="12" y2="3"/>
				<line x1="12" y1="21" x2="12" y2="23"/>
				<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
				<line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
				<line x1="1" y1="12" x2="3" y2="12"/>
				<line x1="21" y1="12" x2="23" y2="12"/>
				<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
				<line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
			</svg>
		</button>
	</div>
</header>

<style>
	.breadcrumbs {
		margin-bottom: 0;
	}
</style>
