<script lang="ts">
	import CopyButton from './CopyButton.svelte';

	let { language = '', code, title = '' }: { language?: string; code: string; title?: string } = $props();
</script>

<div class="code-block">
	<div class="code-block-header">
		<span class="code-block-lang">{title || language}</span>
		<CopyButton text={code} />
	</div>
	<pre><code>{code}</code></pre>
</div>
