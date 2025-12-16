<script lang="ts">
	import { Sidebar, Footer, MobileMenuButton } from '$lib/components/layout';

	let { children } = $props();

	let mobileMenuOpen = $state(false);

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}

	function toggleTheme() {
		const current = document.documentElement.getAttribute('data-theme');
		const next = current === 'dark' ? 'light' : 'dark';
		document.documentElement.setAttribute('data-theme', next);
		localStorage.setItem('theme', next);
	}
</script>

<div class="app-layout">
	<Sidebar isOpen={mobileMenuOpen} onClose={closeMobileMenu} />

	<!-- Mobile overlay -->
	<button
		class="sidebar-overlay"
		class:active={mobileMenuOpen}
		onclick={closeMobileMenu}
		aria-label="Close menu"
	></button>

	<main class="main-content">
		<!-- Mobile header with menu button -->
		<div class="mobile-header">
			<MobileMenuButton isOpen={mobileMenuOpen} onclick={toggleMobileMenu} />
			<a href="/kb" class="mobile-logo">
				<img src="/logo.png" alt="vibeship" class="mobile-logo-img" />
				<span class="mobile-logo-text">vibeship</span>
				<span class="mobile-logo-product">kb</span>
			</a>
			<button class="mobile-theme-toggle" onclick={toggleTheme} aria-label="Toggle theme">
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

		{@render children()}
		<Footer />
	</main>
</div>

<style>
	.mobile-header {
		display: none;
		align-items: center;
		justify-content: space-between;
		padding: 0.75rem 1rem;
		background: var(--bg-secondary);
		border-bottom: 1px solid var(--border);
		position: sticky;
		top: 0;
		z-index: 50;
	}

	.mobile-logo {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		text-decoration: none;
	}

	.mobile-logo-img {
		height: 24px;
		width: auto;
		filter: invert(var(--logo-invert));
	}

	.mobile-logo-text {
		font-family: 'Instrument Serif', serif;
		font-size: 1.2rem;
		font-weight: 400;
		color: var(--text-primary);
		line-height: 1;
		letter-spacing: -0.02em;
	}

	.mobile-logo-product {
		font-family: 'Instrument Serif', serif;
		font-size: 1.2rem;
		font-weight: 400;
		color: var(--green-dim);
		line-height: 1;
		letter-spacing: -0.02em;
		margin-left: -0.1rem;
	}

	.mobile-theme-toggle {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		background: none;
		border: 1px solid var(--border);
		color: var(--text-secondary);
		cursor: pointer;
		transition: all 0.15s;
	}

	.mobile-theme-toggle:hover {
		border-color: var(--text-primary);
		color: var(--text-primary);
	}

	.sidebar-overlay {
		display: none;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(10, 10, 10, 0.8);
		z-index: 99;
		border: none;
		cursor: pointer;
	}

	.sidebar-overlay.active {
		display: block;
	}

	@media (max-width: 768px) {
		.mobile-header {
			display: flex;
		}
	}
</style>
