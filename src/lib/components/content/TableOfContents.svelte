<script lang="ts">
	let { sections }: { sections: Array<{ id: string; label: string; children?: Array<{ id: string; label: string }> }> } = $props();
</script>

<div class="toc">
	<div class="toc-title">On this page</div>
	<ul class="toc-list">
		{#each sections as section}
			<li>
				<a href="#{section.id}">{section.label}</a>
				{#if section.children && section.children.length > 0}
					<ul class="toc-list">
						{#each section.children as child}
							<li><a href="#{child.id}">{child.label}</a></li>
						{/each}
					</ul>
				{/if}
			</li>
		{/each}
	</ul>
</div>
