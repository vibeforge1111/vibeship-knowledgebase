<script lang="ts">
	import CopyButton from './CopyButton.svelte';

	let { label = 'AI Fix Prompt', prompt }: { label?: string; prompt: string } = $props();
</script>

<div class="fix-prompt">
	<div class="fix-prompt-header">
		<span class="fix-prompt-label">{label}</span>
		<CopyButton text={prompt} />
	</div>
	<div class="fix-prompt-content">{prompt}</div>
</div>
