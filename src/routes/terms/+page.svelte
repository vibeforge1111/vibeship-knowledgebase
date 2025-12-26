<script lang="ts">
	import { Header } from '$lib/components/layout';

	const breadcrumbs = [
		{ label: 'Terms of Service' }
	];
</script>

<svelte:head>
	<title>Terms of Service | VibeShip</title>
	<meta name="description" content="VibeShip terms of service. Rules and guidelines for using our platform." />
	<meta property="og:title" content="Terms of Service | VibeShip" />
	<meta property="og:description" content="VibeShip terms of service. Rules and guidelines for using our platform." />
	<meta property="og:url" content="/terms/" />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Terms of Service | VibeShip" />
	<meta name="twitter:description" content="VibeShip terms of service. Rules and guidelines for using our platform." />
	<link rel="canonical" href="https://vibeship.co/terms/" />
</svelte:head>

<Header {breadcrumbs} />

<div class="content-wrapper">
	<article class="content-main content-narrow">
		<h1>Terms of Service</h1>
		<p class="last-updated">Last updated: December 2024</p>

		<section>
			<h2>Acceptance of Terms</h2>
			<p>By using VibeShip services, you agree to these terms. If you disagree, please don't use our services.</p>
		</section>

		<section>
			<h2>Services</h2>
			<p>VibeShip provides:</p>
			<ul>
				<li><strong>Knowledge Base:</strong> Educational content about security and vibe coding</li>
				<li><strong>VibeShip Scanner:</strong> Automated security scanning for code</li>
			</ul>
		</section>

		<section>
			<h2>Acceptable Use</h2>
			<p>You agree not to:</p>
			<ul>
				<li>Use our services for illegal purposes</li>
				<li>Attempt to disrupt or overload our services</li>
				<li>Scrape content without permission</li>
				<li>Submit malicious code to the scanner with intent to harm</li>
			</ul>
		</section>

		<section>
			<h2>Disclaimer</h2>
			<p>VibeShip provides security information and scanning as educational tools. We do not guarantee that following our guidance will prevent all security issues. Security is your responsibility.</p>
			<p>The scanner identifies common vulnerabilities but may not catch all issues. Always conduct thorough security reviews before deploying code to production.</p>
		</section>

		<section>
			<h2>Limitation of Liability</h2>
			<p>VibeShip is not liable for any damages arising from use of our services. Our tools are provided "as is" without warranty.</p>
		</section>

		<section>
			<h2>Changes to Terms</h2>
			<p>We may update these terms. Continued use after changes constitutes acceptance.</p>
		</section>

		<section>
			<h2>Contact</h2>
			<p>Questions? Email legal@vibeship.co</p>
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
