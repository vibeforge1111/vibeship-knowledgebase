<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'XSS: Find & Fix Cross-Site Scripting',
		description: 'Cross-Site Scripting (XSS) lets attackers inject scripts. Common when vibe coding. OWASP Top 10. Fix prompts for React, Vue & Svelte.',
		url: '/kb/security/vulnerabilities/xss/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'XSS' }
	];

	// Real external data sources
	const owaspData = {
		category: 'A03:2021 - Injection',
		source: 'https://owasp.org/Top10/A03_2021-Injection/',
		cweId: 'CWE-79',
		cweSource: 'https://cwe.mitre.org/data/definitions/79.html'
	};

	// FAQ data for schema
	const faqs = [
		{
			question: 'Does React protect me from XSS automatically?',
			answer: 'Mostly yes. React escapes all values embedded in JSX by default, which prevents most XSS attacks. However, you can still create vulnerabilities by using dangerouslySetInnerHTML, passing user input to href attributes with javascript: URLs, or using refs to directly manipulate the DOM. The protection only works when you let React handle rendering.'
		},
		{
			question: 'What is the difference between stored and reflected XSS?',
			answer: 'Stored XSS saves the malicious script in your database (like a comment or profile field) and serves it to every user who views that content. Reflected XSS bounces the script off your server via URL parameters or form submissions, typically through phishing links. Stored XSS is more dangerous because it affects all users automatically.'
		},
		{
			question: 'Can XSS steal passwords and credit cards?',
			answer: 'Yes. XSS scripts run with full access to the page, so they can read form inputs as users type, steal session cookies, redirect users to fake login pages, modify page content to show fake payment forms, and send all captured data to attacker-controlled servers. This is why XSS is considered high severity.'
		},
		{
			question: 'Why do AI coding tools generate XSS vulnerabilities?',
			answer: 'When vibe coding, AI tools generate XSS vulnerabilities whenever asked to render dynamic HTML. Requests like "display user-generated HTML" or "render markdown" lead to dangerouslySetInnerHTML in React, v-html in Vue, or @html in Svelte. The AI provides what works for vibe coders without considering malicious content.'
		},
		{
			question: 'Is sanitizing HTML enough to prevent XSS?',
			answer: 'Sanitization helps but is not foolproof. Libraries like DOMPurify are well-tested, but sanitizers can have bypasses, and you must configure them correctly. The safest approach is to avoid rendering raw HTML entirely. If you must render HTML, use a trusted sanitizer AND set a Content Security Policy as defense in depth.'
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
			{"@type": "ListItem", "position": 4, "name": "XSS"}
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
			"name": "Vibeship"
		},
		"publisher": {
			"@type": "Organization",
			"name": "Vibeship",
			"logo": {
				"@type": "ImageObject",
				"url": "https://vibeship.co/logo.png"
			}
		},
		"datePublished": "2025-12-17",
		"dateModified": "2025-12-17"
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
				<span class="badge badge-high">High</span>
				<span class="badge">{owaspData.cweId}</span>
				<span class="badge">OWASP A03:2021</span>
			</div>
			<h1>XSS (Cross-Site Scripting) in Vibe Coded Apps</h1>
			<p class="text-secondary">How to find and fix script injection vulnerabilities in your web application</p>
		</header>

		<!-- Quick Answer - MUST be under 50 words -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>XSS lets attackers inject malicious scripts into your web pages.</strong>
				Scripts steal cookies, capture keystrokes, and hijack sessions. Classified under
				<a href={owaspData.source}>OWASP A03:2021</a>. AI tools cause this with <code>dangerouslySetInnerHTML</code> and <code>v-html</code>.
			</p>
		</div>

		<!-- Stats Box - Real OWASP Data -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">A03:2021</div>
				<div class="stat-label">OWASP Category</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">{owaspData.cweId}</div>
				<div class="stat-label"><a href={owaspData.cweSource}>CWE ID</a></div>
			</div>
			<div class="stat-box">
				<div class="stat-value">3 Types</div>
				<div class="stat-label">Stored, Reflected, DOM</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">High</div>
				<div class="stat-label">Severity</div>
			</div>
		</div>
		<p class="data-source">
			Source: <a href={owaspData.source}>OWASP Top 10 (2021)</a>
		</p>

		<!-- What Is It -->
		<section class="article-section">
			<h2>What is Cross-Site Scripting (XSS)?</h2>
			<p>
				Cross-Site Scripting (XSS) is a vulnerability where attackers inject malicious JavaScript into web pages viewed by other users.
				When a user visits the page, the script runs in their browser and can steal cookies, capture keystrokes, or redirect to phishing sites.
			</p>
			<p>
				There are three types of XSS. <strong>Stored XSS</strong> saves the malicious script in your database
				(comments, profiles, posts) and serves it to everyone. <strong>Reflected XSS</strong> bounces the script
				off your server through URL parameters. <strong>DOM-based XSS</strong> happens entirely in the browser
				when JavaScript processes untrusted data.
			</p>
			<p>
				According to <a href="https://owasp.org/Top10/A03_2021-Injection/">OWASP</a>, injection attacks
				(including XSS) rank #3 in the Top 10 Web Application Security Risks. Vibe coders are especially vulnerable when building features that display user content.
			</p>
		</section>

		<!-- AI Tool Patterns -->
		<section class="article-section">
			<h2>How do AI tools cause XSS?</h2>
			<p>
				AI tools cause XSS by generating code that bypasses framework escaping with <code>dangerouslySetInnerHTML</code>, <code>v-html</code>, or <code>@html</code>.
				When you ask to "render HTML content" or "display rich text," AI reaches for these escape hatches because they work, not because they're safe.
			</p>

			<div class="tool-patterns-box">
				<h3>Common AI-generated vulnerable patterns</h3>
				<p>When you ask AI tools to display dynamic HTML, they generate code like this:</p>
				<div class="code-block">
					<pre><code>{`// React - AI generates this for "render user content as HTML"
function Comment({ content }) {
  return <div dangerouslySetInnerHTML={{ __html: content }} />
}

// Vue - AI generates this for "display markdown"
<template>
  <div v-html="userContent"></div>
</template>

// Svelte - AI generates this for "show formatted text"
{@html userInput}`}</code></pre>
				</div>
				<p class="pattern-note">
					These patterns work for rendering HTML, which is why AI suggests them. But if <code>content</code>,
					<code>userContent</code>, or <code>userInput</code> comes from users, attackers can inject scripts.
				</p>
			</div>

			<p>
				<strong>Why this happens:</strong> When you prompt "display user-generated HTML" or "render markdown,"
				the AI interprets this literally. It provides a working solution without considering that
				"user-generated" might include malicious scripts. The AI optimizes for functionality, not security.
			</p>

			<p>
				<strong>All major AI coding tools</strong> (Cursor, Claude Code, Bolt, v0, and Copilot) can
				generate these patterns. Whether you're vibe coding a blog, comment system, or rich text editor,
				watch for these dangerous HTML rendering patterns in your AI-generated code.
			</p>
		</section>

		<!-- What Could Happen -->
		<section class="article-section">
			<h2>What could happen if I have XSS?</h2>
			<p>
				XSS can result in session hijacking, credential theft, malware distribution, and complete account takeover for every user who visits the affected page.
			</p>
			<ul class="consequences-list">
				<li><strong>Session hijacking:</strong> Attackers steal session cookies and impersonate users, accessing their accounts without passwords</li>
				<li><strong>Credential theft:</strong> Injected scripts capture login forms, sending usernames and passwords to attacker servers</li>
				<li><strong>Malware distribution:</strong> XSS redirects users to malicious downloads or exploit kits</li>
				<li><strong>Defacement:</strong> Attackers modify page content, displaying fake information or damaging your brand</li>
				<li><strong>Keylogging:</strong> Scripts record everything users type, including credit cards, messages, and sensitive data</li>
			</ul>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How do I detect XSS vulnerabilities?</h2>
			<p>
				Detect XSS vulnerabilities by searching for <code>dangerouslySetInnerHTML</code>, <code>v-html</code>, <code>@html</code>, <code>innerHTML</code>, and <code>document.write</code> in your codebase.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Patterns to search for</span>
				</div>
				<pre><code>{`# React
dangerouslySetInnerHTML
__html

# Vue
v-html

# Svelte
{@html

# Angular
[innerHTML]
bypassSecurityTrust

# Vanilla JS
innerHTML =
outerHTML =
document.write(
insertAdjacentHTML

# jQuery
.html(
.append( (with user input)

# URL-based XSS
href={userInput}
src={userInput}
javascript:`}</code></pre>
			</div>

			<p>
				<strong>Test for XSS:</strong> Try entering <code>&lt;script&gt;alert('XSS')&lt;/script&gt;</code>
				or <code>&lt;img src=x onerror=alert('XSS')&gt;</code> in input fields. If an alert appears,
				you have an XSS vulnerability.
			</p>

			<div class="cta-box">
				<p><strong>Want to find XSS vulnerabilities automatically?</strong></p>
				<a href="https://scanner.vibeship.co" class="btn btn-green">
					Try Vibeship Scanner
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M5 12h14M12 5l7 7-7 7"/>
					</svg>
				</a>
			</div>
		</section>

		<!-- How to Fix -->
		<section class="article-section">
			<h2>How do I fix XSS vulnerabilities?</h2>
			<p>
				Fix XSS by removing dangerous HTML rendering patterns and letting your framework escape content, or sanitize with DOMPurify if you must render HTML.
			</p>

			<!-- AI Fix Prompt -->
			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>Copy this prompt into Cursor, Claude Code, or Bolt to automatically fix XSS vulnerabilities:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Fix all XSS (Cross-Site Scripting) vulnerabilities in my codebase.

## What to look for

Search for these dangerous patterns:

1. React:
   - dangerouslySetInnerHTML={{ __html: userInput }}
   - Any use of dangerouslySetInnerHTML with untrusted data

2. Vue:
   - v-html="userInput"
   - v-html with any data that could come from users

3. Svelte:
   - {@html userInput}
   - @html with any user-controlled content

4. Vanilla JavaScript:
   - element.innerHTML = userInput
   - document.write(userInput)
   - insertAdjacentHTML with user data

5. URL-based XSS:
   - href={userInput} (could be javascript:)
   - src={userInput}
   - Dynamic URLs without validation

## How to fix

Option 1: Remove dangerous patterns (preferred)
\`\`\`javascript
// Before (vulnerable)
<div dangerouslySetInnerHTML={{ __html: userComment }} />

// After (safe - let React escape it)
<div>{userComment}</div>
\`\`\`

Option 2: Sanitize if HTML rendering is required
\`\`\`javascript
import DOMPurify from 'dompurify';

// Before (vulnerable)
<div dangerouslySetInnerHTML={{ __html: userContent }} />

// After (sanitized)
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userContent) }} />
\`\`\`

Option 3: Use safe markdown libraries
\`\`\`javascript
// Instead of rendering raw HTML for markdown
import ReactMarkdown from 'react-markdown';

// Safe markdown rendering (no raw HTML by default)
<ReactMarkdown>{userMarkdown}</ReactMarkdown>
\`\`\`

## URL validation
\`\`\`javascript
// Before (vulnerable to javascript: URLs)
<a href={userUrl}>Link</a>

// After (validated)
const safeUrl = userUrl.startsWith('http://') || userUrl.startsWith('https://')
  ? userUrl
  : '#';
<a href={safeUrl}>Link</a>
\`\`\`

## After fixing

1. Search for remaining patterns: dangerouslySetInnerHTML, v-html, @html, innerHTML
2. Verify all user input is either escaped or sanitized
3. Test with: <script>alert('XSS')</script> and <img src=x onerror=alert('XSS')>
4. Add Content Security Policy headers as defense in depth
5. List all files modified with before/after examples

Please proceed systematically through my codebase.`}</div>
				</div>
			</div>

			<!-- Manual Fix -->
			<div class="fix-section">
				<h3>Manual Fix</h3>
				<p>The safest fix is to <strong>avoid rendering raw HTML</strong>. Let your framework escape content.</p>

				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-block-header">
							<span class="code-block-lang status-bad">VULNERABLE</span>
						</div>
						<pre><code>{`// React - Renders raw HTML, XSS possible
function Comment({ content }) {
  return (
    <div dangerouslySetInnerHTML={{ __html: content }} />
  )
}

// Vue - Same problem
<div v-html="userContent"></div>

// Svelte - Same problem
{@html userInput}`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-block-header">
							<span class="code-block-lang status-good">SECURE</span>
						</div>
						<pre><code>{`// React - Let React escape content
function Comment({ content }) {
  return (
    <div>{content}</div>
  )
}

// Vue - Use text interpolation
<div>{{ userContent }}</div>

// Svelte - Use normal interpolation
{userInput}`}</code></pre>
					</div>
				</div>

				<p>
					<strong>If you must render HTML</strong> (like a rich text editor), sanitize it first:
				</p>
				<div class="code-block">
					<pre><code>{`import DOMPurify from 'dompurify';

// Sanitize before rendering
const cleanHTML = DOMPurify.sanitize(untrustedHTML);

// React
<div dangerouslySetInnerHTML={{ __html: cleanHTML }} />

// Vue
<div v-html="cleanHTML"></div>

// Svelte
{@html cleanHTML}`}</code></pre>
				</div>
			</div>

			<!-- Framework-Specific -->
			<div class="fix-section">
				<h3>Framework-specific guides</h3>
				<div class="framework-links">
					<a href="/kb/security/fixes/xss/react/" class="card card-interactive">
						<span class="framework-name">React</span>
						<span class="framework-desc">dangerouslySetInnerHTML alternatives</span>
					</a>
					<a href="/kb/security/fixes/xss/vue/" class="card card-interactive">
						<span class="framework-name">Vue</span>
						<span class="framework-desc">v-html and v-text</span>
					</a>
					<a href="/kb/security/fixes/xss/svelte/" class="card card-interactive">
						<span class="framework-name">Svelte</span>
						<span class="framework-desc">@html directive safety</span>
					</a>
					<a href="/kb/security/fixes/xss/nextjs/" class="card card-interactive">
						<span class="framework-name">Next.js</span>
						<span class="framework-desc">SSR considerations</span>
					</a>
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
				<a href="/kb/security/vulnerabilities/sql-injection/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">SQL Injection</div>
					<p class="related-card-description">Another injection vulnerability in the OWASP Top 10</p>
				</a>
				<a href="/kb/security/vulnerabilities/hardcoded-secrets/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Hardcoded Secrets</div>
					<p class="related-card-description">API keys and credentials in your code</p>
				</a>
				<a href="/kb/vibe-coding-tools/cursor/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Cursor Security Patterns</div>
					<p class="related-card-description">Common vulnerabilities in Cursor-generated code</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Scan your code for XSS vulnerabilities</h2>
			<p>Check your codebase for dangerous HTML rendering patterns and other security issues.</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">
				Try Vibeship Scanner
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

	.badge-high {
		background: var(--orange-dim);
		color: var(--orange);
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

	/* CTA Box */
	.cta-box {
		background: var(--bg-secondary);
		border: 1px solid var(--green-dim);
		padding: 1.5rem;
		text-align: center;
		margin: 2rem 0;
	}

	.cta-box p {
		margin: 0 0 1rem;
		color: var(--text-primary);
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

	/* Framework Links */
	.framework-links {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}

	.framework-links a {
		text-decoration: none;
	}

	.framework-name {
		display: block;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 0.25rem;
	}

	.framework-desc {
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	/* FAQ */
	.faq-list {
		margin-top: 1rem;
	}

	.faq-item {
		padding: 1.5rem 0;
		border-bottom: 1px solid var(--border);
	}

	.faq-item:last-child {
		border-bottom: none;
	}

	.faq-item h3 {
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
		font-size: 1.0625rem;
		font-weight: 600;
		margin: 0 0 0.5rem;
		color: var(--text-primary);
		line-height: 1.5;
		letter-spacing: -0.01em;
	}

	.faq-item p {
		margin: 0;
		font-size: 0.9375rem;
		line-height: 1.7;
		color: var(--text-secondary);
	}

	/* Final CTA */
	.final-cta {
		text-align: center;
		padding: 3rem 2rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		margin-top: 3rem;
	}

	.final-cta h2 {
		margin-bottom: 0.75rem;
	}

	.final-cta p {
		color: var(--text-secondary);
		margin-bottom: 1.5rem;
		max-width: 500px;
		margin-left: auto;
		margin-right: auto;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.framework-links {
			grid-template-columns: 1fr;
		}

		.faq-item h3 {
			font-size: 1rem;
		}
	}
</style>
