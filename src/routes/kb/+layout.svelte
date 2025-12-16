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
			<a href="/" class="mobile-logo">
				<img src="/logo.png" alt="vibeship" class="mobile-logo-img" />
				<span class="mobile-logo-text">vibeship</span>
				<span class="mobile-logo-product">kb</span>
			</a>
			<div class="mobile-header-spacer"></div>
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

	.mobile-header-spacer {
		width: 36px;
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
