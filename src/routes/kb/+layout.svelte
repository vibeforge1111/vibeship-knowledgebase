<script lang="ts">
	import { Sidebar, Header, Footer } from '$lib/components/layout';

	let { children } = $props();
</script>

<div class="app-layout">
	<Sidebar />

	<main class="main-content">
		{@render children()}
		<Footer />
	</main>
</div>
