<script lang="ts">
	interface Props {
		isOpen: boolean;
		onclick: () => void;
	}

	let { isOpen, onclick }: Props = $props();
</script>

<button
	class="mobile-menu-btn"
	onclick={onclick}
	aria-label={isOpen ? 'Close menu' : 'Open menu'}
	aria-expanded={isOpen}
>
	{#if isOpen}
		<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
			<path d="M18 6L6 18M6 6l12 12"/>
		</svg>
	{:else}
		<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
			<path d="M3 12h18M3 6h18M3 18h18"/>
		</svg>
	{/if}
</button>

<style>
	.mobile-menu-btn {
		display: none;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		background: none;
		border: 1px solid var(--border);
		color: var(--text-primary);
		cursor: pointer;
		transition: border-color 0.15s;
	}

	.mobile-menu-btn:hover {
		border-color: var(--text-primary);
	}

	@media (max-width: 768px) {
		.mobile-menu-btn {
			display: flex;
		}
	}
</style>
