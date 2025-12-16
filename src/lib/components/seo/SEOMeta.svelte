<script lang="ts">
	interface Props {
		title: string;
		description: string;
		canonical?: string;
		ogImage?: string;
		ogType?: 'website' | 'article';
		twitterCard?: 'summary' | 'summary_large_image';
		noindex?: boolean;
	}

	let {
		title,
		description,
		canonical,
		ogImage = 'https://vibeship.co/og-image.png',
		ogType = 'website',
		twitterCard = 'summary_large_image',
		noindex = false
	}: Props = $props();

	const fullTitle = title.includes('VibeShip') ? title : `${title} | VibeShip`;
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{fullTitle}</title>
	<meta name="title" content={fullTitle} />
	<meta name="description" content={description} />

	{#if noindex}
		<meta name="robots" content="noindex, nofollow" />
	{:else}
		<meta name="robots" content="index, follow" />
	{/if}

	{#if canonical}
		<link rel="canonical" href={canonical} />
	{/if}

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content={ogType} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:site_name" content="VibeShip Knowledge Base" />

	<!-- Twitter -->
	<meta property="twitter:card" content={twitterCard} />
	<meta property="twitter:title" content={fullTitle} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content={ogImage} />

	<!-- Additional SEO -->
	<meta name="author" content="VibeShip" />
	<meta name="theme-color" content="#0a0a0a" />
</svelte:head>
