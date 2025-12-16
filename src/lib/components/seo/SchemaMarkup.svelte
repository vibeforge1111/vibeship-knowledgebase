<script lang="ts">
	interface Props {
		type: 'Article' | 'FAQPage' | 'HowTo' | 'WebPage' | 'Organization';
		data: Record<string, unknown>;
	}

	let { type, data }: Props = $props();

	const baseSchema = {
		'@context': 'https://schema.org',
		'@type': type,
		publisher: {
			'@type': 'Organization',
			name: 'VibeShip',
			url: 'https://vibeship.co',
			logo: {
				'@type': 'ImageObject',
				url: 'https://vibeship.co/logo.png'
			}
		},
		...data
	};

	const jsonLd = JSON.stringify(baseSchema);
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>
