<script lang="ts">
	import { Header } from '$lib/components/layout';

	const breadcrumbs = [
		{ label: 'Privacy Policy' }
	];
</script>

<svelte:head>
	<title>Privacy Policy | VibeShip</title>
	<meta name="description" content="VibeShip privacy policy. How we collect, use, and protect your data." />
	<meta property="og:title" content="Privacy Policy | VibeShip" />
	<meta property="og:description" content="VibeShip privacy policy. How we collect, use, and protect your data." />
	<meta property="og:url" content="/privacy/" />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Privacy Policy | VibeShip" />
	<meta name="twitter:description" content="VibeShip privacy policy. How we collect, use, and protect your data." />
	<link rel="canonical" href="https://vibeship.co/privacy/" />
</svelte:head>

<Header {breadcrumbs} />

<div class="content-wrapper">
	<article class="content-main content-narrow">
		<h1>Privacy Policy</h1>
		<p class="last-updated">Last updated: December 2024</p>

		<section>
			<h2>Information We Collect</h2>
			<p>VibeShip collects minimal data necessary to provide our services:</p>
			<ul>
				<li><strong>Usage Data:</strong> Anonymous analytics about page visits and feature usage</li>
				<li><strong>Scanner Data:</strong> Code submitted to VibeShip Scanner is processed but not stored permanently</li>
				<li><strong>Contact Information:</strong> Email address if you sign up for updates</li>
			</ul>
		</section>

		<section>
			<h2>How We Use Your Data</h2>
			<ul>
				<li>To provide and improve our security scanning services</li>
				<li>To send product updates (if subscribed)</li>
				<li>To analyze usage patterns and improve the knowledge base</li>
			</ul>
		</section>

		<section>
			<h2>Data Security</h2>
			<p>We use industry-standard security measures to protect your data. Code submitted to the scanner is processed in memory and not stored after analysis is complete.</p>
		</section>

		<section>
			<h2>Third-Party Services</h2>
			<p>We use:</p>
			<ul>
				<li>Cloudflare for CDN and security</li>
				<li>Railway for hosting</li>
				<li>Anonymous analytics for usage data</li>
			</ul>
		</section>

		<section>
			<h2>Your Rights</h2>
			<p>You can request deletion of any personal data we hold. Contact us at privacy@vibeship.co.</p>
		</section>

		<section>
			<h2>Contact</h2>
			<p>Questions about this policy? Email privacy@vibeship.co</p>
		</section>
	</article>
</div>

<style>
	h1 { margin-bottom: 0.5rem; }
	.last-updated { color: var(--text-tertiary); margin-bottom: 2rem; }
	section { margin-bottom: 2rem; }
	section h2 { font-size: 1.25rem; margin-bottom: 0.75rem; }
	ul { padding-left: 1.5rem; }
	li { margin-bottom: 0.5rem; }
</style>
