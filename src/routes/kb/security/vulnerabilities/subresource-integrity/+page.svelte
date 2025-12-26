<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Missing Subresource Integrity (SRI): CDN Security Audit Guide',
		description: 'Missing SRI lets attackers hijack CDN scripts to steal user data. Check your external resources. Fix with integrity attributes in 5 minutes.',
		url: '/kb/security/vulnerabilities/subresource-integrity/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Missing SRI' }
	];

	// External data sources
	const securityData = {
		cweId: 'CWE-353',
		cweSource: 'https://cwe.mitre.org/data/definitions/353.html',
		owaspCategory: 'A08:2021 - Software and Data Integrity Failures',
		owaspSource: 'https://owasp.org/Top10/A08_2021-Software_and_Data_Integrity_Failures/'
	};

	// FAQ data for schema
	const faqs = [
		{
			question: 'What is Subresource Integrity (SRI)?',
			answer: 'SRI is a security feature that lets browsers verify external scripts and stylesheets have not been tampered with. You add a cryptographic hash to your script tags. The browser computes the hash of the downloaded file and compares it. If they do not match, the browser blocks execution. This protects against CDN compromises, man-in-the-middle attacks, and supply chain tampering.'
		},
		{
			question: 'Why do AI coding tools skip SRI attributes?',
			answer: 'AI tools optimize for working code, not hardened code. Adding a CDN link without the integrity attribute works perfectly in development. The AI does not flag what it cannot see. Since missing SRI causes no errors and no visible problems, the pattern propagates through training data. Every major AI coding tool generates script tags without SRI by default.'
		},
		{
			question: 'How do I generate SRI hashes for my scripts?',
			answer: 'Use the srihash.org generator or run openssl in terminal: openssl dgst -sha384 -binary your-file.js | openssl base64 -A. Most CDNs like cdnjs and jsDelivr show the SRI hash on their website. Copy the full integrity attribute including the sha384 prefix. Always include crossorigin="anonymous" alongside the integrity attribute.'
		},
		{
			question: 'Does SRI work with scripts from the same origin?',
			answer: 'SRI works with any script regardless of origin, but provides the most protection for external resources. For same-origin scripts, you control the server, so the risk is lower. For CDN-hosted scripts, SRI is essential because you do not control that infrastructure. Third-party scripts are the primary attack vector SRI defends against.'
		},
		{
			question: 'What happens if a CDN updates a library and breaks my SRI hash?',
			answer: 'The browser blocks the script from running, which breaks functionality but protects users from potentially malicious code. This is the intended behavior. Pin your CDN URLs to specific versions to avoid unexpected updates. When you intentionally upgrade, generate a new hash for the new version. Never use latest or unversioned CDN URLs with SRI.'
		}
	];

	let copied = $state(false);

	function copyPrompt() {
		const prompt = document.getElementById('ai-fix-prompt')?.textContent || '';
		navigator.clipboard.writeText(prompt);
		copied = true;
		setTimeout(() => copied = false, 2000);
	}
</script>

<svelte:head>
	<title>{meta.title}</title>
	<meta name="description" content={meta.description} />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:url" content={meta.url} />
	<meta property="og:type" content="article" />
	<link rel="canonical" href="https://vibeship.co{meta.url}" />

	<!-- BreadcrumbList Schema -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"itemListElement": [
			{"@type": "ListItem", "position": 1, "name": "Knowledge Base", "item": "https://vibeship.co/kb"},
			{"@type": "ListItem", "position": 2, "name": "Security", "item": "https://vibeship.co/kb/security"},
			{"@type": "ListItem", "position": 3, "name": "Vulnerabilities", "item": "https://vibeship.co/kb/security/vulnerabilities"},
			{"@type": "ListItem", "position": 4, "name": "Missing SRI"}
		]
	}
	</script>`}

	<!-- Schema.org structured data -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "TechArticle",
		"headline": "${meta.title}",
		"description": "${meta.description}",
		"author": {
			"@type": "Organization",
			"name": "VibeShip"
		},
		"publisher": {
			"@type": "Organization",
			"name": "VibeShip",
			"logo": {
				"@type": "ImageObject",
				"url": "https://vibeship.co/logo.png"
			}
		},
		"datePublished": "2025-12-26",
		"dateModified": "2025-12-26"
	}
	</script>`}

	<!-- FAQ Schema -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "FAQPage",
		"mainEntity": ${JSON.stringify(faqs.map(faq => ({
			"@type": "Question",
			"name": faq.question,
			"acceptedAnswer": {
				"@type": "Answer",
				"text": faq.answer
			}
		})))}
	}
	</script>`}
</svelte:head>

<Header {breadcrumbs} />

<div class="content-wrapper">
	<article class="content-main content-wide">
		<!-- Header -->
		<header class="article-header">
			<div class="badge-row">
				<span class="badge badge-medium">Medium</span>
				<span class="badge">CWE-353</span>
				<span class="badge">OWASP A08:2021</span>
			</div>
			<h1>Missing Subresource Integrity in Vibe Coded Apps</h1>
			<p class="text-secondary">How to audit CDN dependencies and protect against supply chain attacks</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Missing Subresource Integrity (SRI) means your external scripts have no tamper protection.</strong>
				If a CDN gets compromised or an attacker intercepts the request, malicious code runs in your users' browsers with full access to cookies, forms, and session data.
				The fix takes 5 minutes: add <code>integrity</code> and <code>crossorigin</code> attributes to every external script and stylesheet.
			</p>
		</div>

		<!-- Stats Box -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">{securityData.cweId}</div>
				<div class="stat-label"><a href={securityData.cweSource}>CWE ID</a></div>
			</div>
			<div class="stat-box">
				<div class="stat-value">A08</div>
				<div class="stat-label"><a href={securityData.owaspSource}>OWASP 2021</a></div>
			</div>
			<div class="stat-box">
				<div class="stat-value">5 min</div>
				<div class="stat-label">Time to Fix</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Medium</div>
				<div class="stat-label">Severity</div>
			</div>
		</div>
		<p class="data-source">
			Source: <a href={securityData.owaspSource}>OWASP Top 10 (2021)</a>, <a href={securityData.cweSource}>MITRE CWE</a>
		</p>

		<!-- What Is It -->
		<section class="article-section">
			<h2>What is missing Subresource Integrity?</h2>
			<p>
				Subresource Integrity (SRI) is a browser security feature that verifies external files have not been modified.
				When you load a script from a CDN, SRI lets you specify the exact cryptographic hash of the expected file.
				The browser downloads the script, computes its hash, and compares. If they match, the script runs. If not, the browser blocks it.
			</p>
			<p>
				Missing SRI means your external resources have no verification. The browser fetches the file and executes whatever comes back, no questions asked.
				A compromised CDN, a malicious proxy, or a man-in-the-middle attacker can inject arbitrary JavaScript into your application.
				That code runs with full access to your DOM, cookies, localStorage, and everything your users type into forms.
			</p>
			<p>
				According to <a href="https://owasp.org/Top10/A08_2021-Software_and_Data_Integrity_Failures/">OWASP Top 10 (2021)</a>, software and data integrity failures rank #8 in web application security risks.
				<a href="https://cwe.mitre.org/data/definitions/353.html">CWE-353</a> specifically addresses missing support for integrity checking.
				Supply chain attacks have increased dramatically. The 2021 ua-parser-js npm compromise affected millions of downloads before detection.
				SRI is one of the simplest defenses against this class of attack.
			</p>
		</section>

		<!-- AI Tool Patterns -->
		<section class="article-section">
			<h2>How do AI tools cause missing SRI?</h2>
			<p>
				Every AI coding tool generates CDN script tags without integrity attributes. The pattern is universal because the training data is full of these shortcuts.
				Copy a CDN link, paste it into your HTML, ship it. Works perfectly in development.
			</p>

			<div class="tool-patterns-box">
				<h3>The pattern in every vibe coded project</h3>
				<p>Ask any AI tool to add Bootstrap, jQuery, or any CDN library. This is what you get:</p>
				<div class="code-block">
					<pre><code>{`<!-- AI-generated CDN includes - No SRI -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
<link href="https://cdn.jsdelivr.net/npm/tailwindcss@3.3.0/dist/tailwind.min.css" rel="stylesheet">`}</code></pre>
				</div>
				<p class="pattern-note">
					Looks normal. Works fine. But if any of those CDNs get compromised, attackers can inject code that runs on every page load.
					The browser has no way to detect tampering without the <code>integrity</code> attribute.
				</p>
			</div>

			<p>
				<strong>Why this happens:</strong> AI tools optimize for functional code. Missing SRI causes no errors, no warnings, no visible problems.
				The model has seen millions of script tags without integrity attributes because that is how most developers write them.
				Vibe coders copy-paste these patterns without knowing what is missing. The vulnerability ships to production invisible.
			</p>

			<p>
				Cursor, Claude Code, Bolt, v0, GitHub Copilot. Every major tool generates this pattern.
				Security audits flag missing SRI constantly in vibe coded projects. The fix is straightforward once you know to look for it.
			</p>
		</section>

		<!-- What Could Happen -->
		<section class="article-section">
			<h2>What could happen if SRI is missing?</h2>
			<p>
				CDN compromises are not theoretical. They have happened and will happen again.
			</p>
			<ul class="consequences-list">
				<li><strong>Session hijacking:</strong> Injected JavaScript reads session cookies and sends them to an attacker-controlled server. Every user who loads the page while the CDN is compromised has their session stolen. Mass account takeover follows.</li>
				<li><strong>Credential theft:</strong> Malicious code attaches keyloggers to login forms. Users type their passwords directly into the attacker's collection system. The forms look normal. The URL is your domain. Nothing visible indicates compromise.</li>
				<li><strong>Cryptomining injection:</strong> Attackers replace legitimate scripts with versions that mine cryptocurrency using your users' browsers. Performance degrades. Battery drains. Users blame your application.</li>
				<li><strong>Supply chain propagation:</strong> If your site loads compromised code, it might serve that code to your users' browsers. Those browsers make requests to other sites. The attack spreads through shared infrastructure.</li>
				<li><strong>Data exfiltration:</strong> Any data visible in the DOM can be scraped and sent elsewhere. Customer information, internal dashboards, payment forms. The injected script has the same access as your own code.</li>
			</ul>
			<p>
				The 2021 ua-parser-js incident affected a package with 7 million weekly downloads. Compromised versions ran for days before detection.
				SRI would have blocked the malicious code immediately on any site that used it.
			</p>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How do I detect missing SRI?</h2>
			<p>
				Security audits check every external resource for integrity attributes. The audit process is methodical: find all external scripts and stylesheets, verify each has both <code>integrity</code> and <code>crossorigin</code> attributes.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Audit Checklist</span>
				</div>
				<pre><code>{`# Find all external resources without SRI

# In your HTML files, search for:
<script src="https://
<script src="//
<link href="https://
<link href="//

# Each external resource MUST have:
# 1. integrity="sha384-..." or integrity="sha512-..."
# 2. crossorigin="anonymous"

# Red flags (missing SRI):
<script src="https://cdn.example.com/lib.js"></script>
<link href="https://cdn.example.com/style.css" rel="stylesheet">

# Green flags (has SRI):
<script src="https://cdn.example.com/lib.js"
  integrity="sha384-abc123..."
  crossorigin="anonymous"></script>`}</code></pre>
			</div>

			<div class="checklist-box">
				<h3>SRI Audit Checklist</h3>
				<ul class="audit-checklist">
					<li><span class="check-box"></span> All external scripts have <code>integrity</code> attribute</li>
					<li><span class="check-box"></span> All external stylesheets have <code>integrity</code> attribute</li>
					<li><span class="check-box"></span> All resources with <code>integrity</code> also have <code>crossorigin="anonymous"</code></li>
					<li><span class="check-box"></span> CDN URLs are pinned to specific versions (not <code>latest</code>)</li>
					<li><span class="check-box"></span> Hash algorithm is SHA-384 or SHA-512 (not SHA-256)</li>
				</ul>
			</div>

			<div class="cta-box">
				<p><strong>Automate your security audit</strong></p>
				<a href="https://scanner.vibeship.co" class="btn btn-green">
					Scan your code free
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M5 12h14M12 5l7 7-7 7"/>
					</svg>
				</a>
			</div>
		</section>

		<!-- How to Fix -->
		<section class="article-section">
			<h2>How do I fix missing SRI?</h2>
			<p>
				The fix is straightforward: add <code>integrity</code> and <code>crossorigin</code> attributes to every external script and stylesheet.
				Generate the hash once, paste it into your HTML. The audit passes. Your users are protected.
			</p>

			<!-- AI Fix Prompt -->
			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>This prompt has been tested on production codebases. Copy it into Cursor, Claude Code, or Bolt to add SRI to all external resources:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Add Subresource Integrity (SRI) to all external scripts and stylesheets.

## What to look for

Search for these patterns in HTML, JSX, and template files:

1. External scripts without integrity:
   - <script src="https://..."></script>
   - <script src="//..."></script>

2. External stylesheets without integrity:
   - <link href="https://..." rel="stylesheet">
   - <link href="//..." rel="stylesheet">

3. Dynamic script loading without integrity:
   - document.createElement('script')
   - new URL() with external CDN

## How to fix

For each external resource:

1. Get the SRI hash from the CDN provider (most show it on their site)
   - Or generate with: openssl dgst -sha384 -binary file.js | openssl base64 -A
   - Or use https://www.srihash.org/

2. Add integrity and crossorigin attributes:

\`\`\`html
<!-- Before (vulnerable) -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

<!-- After (secure) -->
<script
  src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
  integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz"
  crossorigin="anonymous"></script>
\`\`\`

\`\`\`html
<!-- Before (vulnerable) -->
<link href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css" rel="stylesheet">

<!-- After (secure) -->
<link
  href="https://cdn.jsdelivr.net/npm/tailwindcss@3.3.0/dist/tailwind.min.css"
  rel="stylesheet"
  integrity="sha384-..."
  crossorigin="anonymous">
\`\`\`

## Framework-specific notes

- Next.js: Add integrity to next/script components or use next.config.js headers
- React/Vite: Add to index.html, ensure CDN links in public/ have SRI
- SvelteKit: Add to app.html and any component-level script imports
- Astro: Add to Layout components and astro.config.mjs integrations

## After fixing

1. Verify all external resources now have integrity attributes
2. Test that pages load correctly (hash mismatch blocks scripts)
3. Pin CDN URLs to specific versions (never use /latest/)
4. List all files modified with before/after examples

Please proceed systematically through my codebase.`}</div>
				</div>
			</div>

			<!-- Manual Fix -->
			<div class="fix-section">
				<h3>Manual Fix</h3>
				<p>The transformation is the same for every resource. Vulnerable tags become secure by adding two attributes.</p>

				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-block-header">
							<span class="code-block-lang status-bad">VULNERABLE</span>
						</div>
						<pre><code>{`<!-- No SRI - CDN compromise affects your users -->
<script
  src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js">
</script>

<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
  rel="stylesheet">

<!-- If these CDNs get compromised:
     - Attackers inject malicious JavaScript
     - Your users' browsers execute it
     - No warning, no error, full access -->`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-block-header">
							<span class="code-block-lang status-good">SECURE</span>
						</div>
						<pre><code>{`<!-- With SRI - Browser verifies file integrity -->
<script
  src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
  integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz"
  crossorigin="anonymous">
</script>

<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
  rel="stylesheet"
  integrity="sha384-..."
  crossorigin="anonymous">

<!-- If CDN is compromised:
     - Browser computes hash of downloaded file
     - Hash doesn't match integrity attribute
     - Browser blocks execution, protects users -->`}</code></pre>
					</div>
				</div>

				<p>
					<strong>What changed:</strong> The <code>integrity</code> attribute contains a cryptographic hash of the expected file content.
					The <code>crossorigin="anonymous"</code> attribute enables CORS for the integrity check.
					Both attributes are required. Without <code>crossorigin</code>, the browser cannot compute the hash for cross-origin resources.
				</p>
			</div>

			<!-- Generate SRI Hash -->
			<div class="fix-section">
				<h3>How to generate SRI hashes</h3>
				<div class="hash-methods">
					<div class="hash-method">
						<h4>Option 1: Use CDN provider</h4>
						<p>Most CDNs show the SRI hash on their website. jsDelivr, cdnjs, and unpkg all provide copy-paste integrity attributes.</p>
					</div>
					<div class="hash-method">
						<h4>Option 2: Online generator</h4>
						<p>Paste the CDN URL into <a href="https://www.srihash.org/">srihash.org</a> to generate the complete script tag with integrity.</p>
					</div>
					<div class="hash-method">
						<h4>Option 3: Command line</h4>
						<div class="code-block">
							<pre><code>{`# Download the file and generate hash
curl -s https://cdn.example.com/lib.js | \\
  openssl dgst -sha384 -binary | \\
  openssl base64 -A

# Output: sha384-abc123...
# Prefix with "sha384-" in your integrity attribute`}</code></pre>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- FAQ -->
		<section class="article-section">
			<h2>Frequently asked questions</h2>

			<div class="faq-list">
				{#each faqs as faq}
					<div class="faq-item">
						<h3>{faq.question}</h3>
						<p>{faq.answer}</p>
					</div>
				{/each}
			</div>
		</section>

		<!-- Related -->
		<section class="article-section">
			<h2>Related content</h2>

			<div class="related-grid">
				<a href="/kb/security/vulnerabilities/missing-security-headers/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Missing Security Headers</div>
					<p class="related-card-description">CSP, HSTS, X-Frame-Options and other browser security headers</p>
				</a>
				<a href="/kb/security/vulnerabilities/xss/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Cross-Site Scripting (XSS)</div>
					<p class="related-card-description">Inject malicious scripts into web pages</p>
				</a>
				<a href="/kb/security/vulnerabilities/vulnerable-dependencies/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Vulnerable Dependencies</div>
					<p class="related-card-description">Outdated packages with known security flaws</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Audit your CDN dependencies now</h2>
			<p>Missing SRI is easy to miss and easy to fix. Do not wait for a supply chain attack.</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">
				Scan your code now
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M5 12h14M12 5l7 7-7 7"/>
				</svg>
			</a>
		</div>
	</article>
</div>

<style>
	/* Badge row */
	.badge-row {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1rem;
		flex-wrap: wrap;
	}

	/* Data Source Attribution */
	.data-source {
		font-size: 0.75rem;
		color: var(--text-tertiary);
		margin: 0.5rem 0 1.5rem;
	}

	.data-source a {
		color: var(--text-secondary);
	}

	/* Tool Patterns Box */
	.tool-patterns-box {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.tool-patterns-box h3 {
		margin: 0 0 0.75rem;
		font-size: 1rem;
	}

	.tool-patterns-box > p {
		margin: 0 0 1rem;
		color: var(--text-secondary);
	}

	.pattern-note {
		margin: 1rem 0 0 !important;
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.pattern-note code {
		background: var(--bg-tertiary);
		padding: 0.125rem 0.375rem;
		font-size: 0.8125rem;
	}

	/* Consequences List */
	.consequences-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.consequences-list li {
		padding: 0.75rem 0;
		border-bottom: 1px solid var(--border);
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.consequences-list li:last-child {
		border-bottom: none;
	}

	.consequences-list strong {
		color: var(--text-primary);
	}

	/* Checklist Box */
	.checklist-box {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.checklist-box h3 {
		margin: 0 0 1rem;
		font-size: 1rem;
	}

	.audit-checklist {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.audit-checklist li {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		padding: 0.5rem 0;
		color: var(--text-secondary);
		font-size: 0.9rem;
	}

	.check-box {
		width: 18px;
		height: 18px;
		border: 2px solid var(--border-strong);
		flex-shrink: 0;
		margin-top: 2px;
	}

	.audit-checklist code {
		background: var(--bg-tertiary);
		padding: 0.125rem 0.375rem;
		font-size: 0.8rem;
	}

	/* Fix Sections */
	.fix-section {
		margin: 2rem 0;
	}

	.fix-section h3 {
		margin-bottom: 0.75rem;
	}

	/* Code Comparison */
	.code-comparison {
		display: grid;
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.code-block.vulnerable .code-block-header {
		border-left: 3px solid var(--red);
	}

	.code-block.secure .code-block-header {
		border-left: 3px solid var(--green);
	}

	.status-bad {
		color: var(--red);
	}

	.status-good {
		color: var(--green);
	}

	/* Hash Methods */
	.hash-methods {
		display: grid;
		gap: 1rem;
		margin-top: 1rem;
	}

	.hash-method {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.25rem;
	}

	.hash-method h4 {
		margin: 0 0 0.5rem;
		font-size: 0.9rem;
		color: var(--text-primary);
	}

	.hash-method p {
		margin: 0;
		color: var(--text-secondary);
		font-size: 0.875rem;
	}

	.hash-method a {
		color: var(--green-dim);
	}

	.hash-method .code-block {
		margin: 0.75rem 0 0;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.hash-methods {
			grid-template-columns: 1fr;
		}
	}
</style>
