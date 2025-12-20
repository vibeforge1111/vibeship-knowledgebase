<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'DOM XSS: Find & Fix in AI-Generated Code',
		description: 'DOM-based XSS executes malicious scripts through client-side JavaScript. Common in vibe coding. OWASP A03:2021. Fix prompts for Cursor, Bolt & Claude.',
		url: '/kb/security/vulnerabilities/dom-xss/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'DOM XSS' }
	];

	// Real external data sources
	const securityData = {
		ranking: 'A03:2021',
		category: 'Injection',
		owaspSource: 'https://owasp.org/Top10/A03_2021-Injection/',
		cweId: 'CWE-79',
		cweSource: 'https://cwe.mitre.org/data/definitions/79.html',
		portswiggerSource: 'https://portswigger.net/web-security/cross-site-scripting/dom-based'
	};

	// Dangerous sources and sinks
	const sources = [
		{ name: 'location.hash', example: 'location.hash.slice(1)' },
		{ name: 'location.search', example: 'new URLSearchParams(location.search)' },
		{ name: 'document.referrer', example: 'document.referrer' },
		{ name: 'window.name', example: 'window.name' },
		{ name: 'postMessage data', example: 'event.data' }
	];

	const sinks = [
		{ name: 'innerHTML', danger: 'Critical', example: 'element.innerHTML = userInput' },
		{ name: 'outerHTML', danger: 'Critical', example: 'element.outerHTML = userInput' },
		{ name: 'document.write', danger: 'Critical', example: 'document.write(userInput)' },
		{ name: 'eval()', danger: 'Critical', example: 'eval(userInput)' },
		{ name: 'location.href', danger: 'High', example: 'location.href = userInput' }
	];

	// FAQ data for schema
	const faqs = [
		{
			question: 'What is DOM-based XSS and how is it different from other XSS?',
			answer: 'DOM-based XSS (DOM XSS) executes entirely in the browser without the payload touching the server. Unlike reflected or stored XSS where the server returns malicious content, DOM XSS exploits client-side JavaScript that unsafely processes user-controlled data. The attack happens when dangerous sources like location.hash flow into dangerous sinks like innerHTML without proper sanitization.'
		},
		{
			question: 'Why is DOM XSS harder to detect than server-side XSS?',
			answer: 'DOM XSS never appears in server logs or responses because the vulnerability exists purely in client-side JavaScript. Server-side security tools and WAFs cannot detect it. The payload flows from URL fragments or other browser-controlled data directly into the DOM through JavaScript, making it invisible to traditional security monitoring.'
		},
		{
			question: 'How do AI coding tools introduce DOM XSS vulnerabilities?',
			answer: 'AI tools generate convenient patterns like element.innerHTML = data without considering the security implications. They use innerHTML for performance and simplicity, parse URL parameters directly, and build dynamic HTML through string concatenation. These patterns work fine for trusted data but become attack vectors when processing anything from the URL, referrer, or postMessage.'
		},
		{
			question: 'Does React or Vue prevent DOM XSS?',
			answer: 'Modern frameworks like React, Vue, and Svelte escape content by default, preventing most XSS. However, they all provide escape hatches that re-enable the vulnerability: React\'s dangerouslySetInnerHTML, Vue\'s v-html, and Svelte\'s @html. AI tools frequently suggest these escape hatches when rendering HTML content, reintroducing DOM XSS risks.'
		},
		{
			question: 'What is the best way to sanitize HTML to prevent DOM XSS?',
			answer: 'Use DOMPurify for sanitizing HTML content. It\'s well-maintained, handles edge cases, and is used by major applications. Call DOMPurify.sanitize(untrustedHTML) before any innerHTML assignment. For URLs, validate the protocol is http: or https: before assignment to href or src attributes. Never roll your own HTML sanitizer - the edge cases are too complex.'
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
			{"@type": "ListItem", "position": 4, "name": "DOM XSS"}
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
		"datePublished": "2025-12-20",
		"dateModified": "2025-12-20"
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
				<span class="badge badge-critical">Critical</span>
				<span class="badge">CWE-79</span>
				<span class="badge">OWASP A03:2021</span>
			</div>
			<h1>DOM XSS in Vibe Coded Apps</h1>
			<p class="text-secondary">The exact pattern I reject in every code review - and how to fix it before it ships</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>I flag this pattern in every code review: <code>element.innerHTML = urlData</code>. That's DOM XSS waiting to happen.</strong>
				When your code takes data from the URL (like <code>location.hash</code>) and puts it directly into <code>innerHTML</code>, attackers can inject scripts that steal cookies, hijack sessions, or deface your app.
				It's classified under <a href="https://owasp.org/Top10/A03_2021-Injection/">OWASP A03:2021</a> and <a href="https://cwe.mitre.org/data/definitions/79.html">CWE-79</a>.
				Never ship code with unsanitized innerHTML from URL data.
			</p>
		</div>

		<!-- Stats Box -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">{securityData.ranking}</div>
				<div class="stat-label"><a href={securityData.owaspSource}>OWASP Category</a></div>
			</div>
			<div class="stat-box">
				<div class="stat-value">{securityData.cweId}</div>
				<div class="stat-label"><a href={securityData.cweSource}>CWE ID</a></div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Client-Side</div>
				<div class="stat-label">Attack Vector</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Critical</div>
				<div class="stat-label">Severity</div>
			</div>
		</div>
		<p class="data-source">
			Learn more: <a href={securityData.portswiggerSource}>PortSwigger Web Security - DOM-based XSS</a>
		</p>

		<!-- What Is It -->
		<section class="article-section">
			<h2>What is DOM-based XSS?</h2>
			<p>
				DOM-based XSS is a type of cross-site scripting where the attack payload is executed as a result of modifying the DOM environment in the victim's browser.
				Unlike reflected or stored XSS, the malicious script never touches the server.
				Everything happens in client-side JavaScript.
			</p>
			<p>
				The vulnerability exists when user-controlled data flows from a "source" (like <code>location.hash</code>) to a dangerous "sink" (like <code>innerHTML</code>) without sanitization.
				An attacker crafts a URL containing JavaScript, shares it with a victim, and when the victim clicks, their browser executes the attacker's code in the context of your application.
			</p>
			<p>
				According to <a href="https://portswigger.net/web-security/cross-site-scripting/dom-based">PortSwigger</a>, DOM XSS is particularly dangerous because it's invisible to server-side security controls.
				WAFs, CSP headers, and server logs won't detect it because the attack happens entirely in the browser.
			</p>
		</section>

		<!-- Sources and Sinks -->
		<section class="article-section">
			<h2>What are DOM XSS sources and sinks?</h2>
			<p>
				Before I review any client-side code, I verify these two things: where data comes from (sources) and where it ends up (sinks). DOM XSS happens when attacker-controlled data flows from source to sink without sanitization.
			</p>

			<div class="source-sink-grid">
				<div class="source-sink-box">
					<h3>Dangerous Sources</h3>
					<p>Where attacker-controlled data enters your JavaScript:</p>
					<ul>
						{#each sources as source}
							<li>
								<code>{source.name}</code>
								<span class="source-example">{source.example}</span>
							</li>
						{/each}
					</ul>
				</div>

				<div class="source-sink-box">
					<h3>Dangerous Sinks</h3>
					<p>Where data becomes executable or renders HTML:</p>
					<ul>
						{#each sinks as sink}
							<li>
								<code>{sink.name}</code>
								<span class="sink-danger badge-{sink.danger.toLowerCase()}">{sink.danger}</span>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</section>

		<!-- AI Tool Patterns -->
		<section class="article-section">
			<h2>How do AI tools cause DOM XSS?</h2>
			<p>
				AI coding tools generate innerHTML assignments because they're fast and simple.
				They parse URL parameters with naive string operations.
				The resulting code works perfectly - until an attacker sends a malicious URL.
			</p>

			<div class="tool-patterns-box">
				<h3>The pattern behind DOM XSS</h3>
				<p>Ask an AI to display URL content or build dynamic HTML. This is what you get:</p>
				<div class="code-block">
					<pre><code>{`// AI generates this when you ask for URL-based routing or tabs
const hash = location.hash.slice(1)
document.getElementById('content').innerHTML = decodeURIComponent(hash)

// Or when rendering user-generated content
function renderPost(postHtml) {
  document.querySelector('.post-body').innerHTML = postHtml
}

// Or when building dynamic elements
const searchTerm = new URLSearchParams(location.search).get('q')
resultsDiv.innerHTML = '<p>Results for: ' + searchTerm + '</p>'

// Attacker URL: yoursite.com#<img src=x onerror=alert(document.cookie)>
// Result: Cookie stolen, session hijacked`}</code></pre>
				</div>
				<p class="pattern-note">
					In each case, untrusted data flows directly into innerHTML without sanitization.
					The browser parses the HTML and executes any embedded scripts.
				</p>
			</div>

			<p>
				<strong>Why AI does this:</strong> innerHTML is the most common way to render dynamic content in training data.
				It's concise and works. The security implications aren't represented in code comments or variable names, so AI has no signal that this pattern is dangerous.
			</p>

			<p>
				<strong>Framework escape hatches make it worse:</strong> When using React, Vue, or Svelte, AI tools suggest <code>dangerouslySetInnerHTML</code>, <code>v-html</code>, or <code>@html</code> whenever you need to render HTML content.
				These intentionally bypass the framework's built-in XSS protection.
			</p>
		</section>

		<!-- What Could Happen -->
		<section class="article-section">
			<h2>What could happen if I have DOM XSS?</h2>
			<p>
				DOM XSS gives attackers the ability to execute arbitrary JavaScript in your users' browsers.
				The impact is severe and immediate.
			</p>
			<ul class="consequences-list">
				<li><strong>Session hijacking:</strong> Attacker's script reads <code>document.cookie</code> and sends it to their server. They now have your user's session and can act as that user on your platform.</li>
				<li><strong>Credential theft:</strong> Inject a fake login form that overlays your real one. Users type their passwords directly into the attacker's phishing form, believing it's legitimate.</li>
				<li><strong>Keylogging:</strong> The injected script captures every keystroke on the page. Passwords, credit card numbers, personal messages - all exfiltrated in real-time.</li>
				<li><strong>Account takeover:</strong> Script triggers password reset flow, changes email address, or modifies account settings. User loses control of their account permanently.</li>
				<li><strong>Malware distribution:</strong> Redirect users to malicious download pages or trigger drive-by downloads. Your trusted domain becomes a malware vector.</li>
				<li><strong>Cryptomining:</strong> Inject cryptomining scripts that run in your users' browsers. They experience slowdowns and battery drain while attackers profit.</li>
			</ul>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How do I detect DOM XSS?</h2>
			<p>
				Here's my code review checklist. Search your codebase for these patterns - any code path from URL data to innerHTML, document.write, or eval is an automatic flag.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Patterns to search for</span>
				</div>
				<pre><code>{`// Direct innerHTML with URL data (DANGEROUS)
element.innerHTML = location.hash
element.innerHTML = location.search
element.innerHTML = document.referrer

// String concatenation into innerHTML (DANGEROUS)
innerHTML = '<div>' + userInput + '</div>'
innerHTML = \`<span>\${userData}</span>\`

// Framework escape hatches (DANGEROUS without sanitization)
dangerouslySetInnerHTML={{ __html: userContent }}  // React
v-html="userContent"  // Vue
{@html userContent}  // Svelte

// URL manipulation sinks (DANGEROUS)
location.href = userInput
location.replace(userInput)
window.open(userInput)

// eval-like sinks (CRITICAL)
eval(userInput)
new Function(userInput)
setTimeout(userInput, 0)
setInterval(userInput, 1000)

// Regex patterns to find these:
// \\.innerHTML\\s*=
// dangerouslySetInnerHTML
// v-html=
// \\{@html
// eval\\s*\\(
// location\\.(href|replace)\\s*=`}</code></pre>
			</div>

			<div class="cta-box">
				<p><strong>Scan for DOM XSS automatically</strong></p>
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
			<h2>How do I fix DOM XSS?</h2>
			<p>
				The fix is straightforward once you know the pattern. Before you ship, verify these three things:
			</p>
			<ol>
				<li><strong>Text only?</strong> Use <code>textContent</code> instead of <code>innerHTML</code></li>
				<li><strong>Need HTML?</strong> Always sanitize with DOMPurify first</li>
				<li><strong>Setting URLs?</strong> Validate the protocol is http: or https:</li>
			</ol>

			<!-- AI Fix Prompt -->
			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>Copy this prompt into Cursor, Claude Code, or Bolt to find and fix DOM XSS vulnerabilities:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Fix all DOM XSS vulnerabilities in my codebase.

## What to look for

Search for these dangerous patterns:

1. innerHTML with user-controlled data:
   - element.innerHTML = location.hash
   - element.innerHTML = location.search
   - innerHTML = '<div>' + userInput + '</div>'
   - innerHTML = \`<span>\${userData}</span>\`

2. Framework escape hatches without sanitization:
   - dangerouslySetInnerHTML={{ __html: data }}
   - v-html="data"
   - {@html data}

3. URL manipulation with user input:
   - location.href = userInput
   - location.replace(userInput)
   - window.open(userInput)
   - anchor.href = userInput

4. eval-like functions:
   - eval(userInput)
   - new Function(userInput)
   - setTimeout(userInput, delay)

## How to fix

### For text content (no HTML needed):
\`\`\`javascript
// Before (vulnerable)
element.innerHTML = userName

// After (secure)
element.textContent = userName
\`\`\`

### For HTML content (requires sanitization):
First, install DOMPurify:
\`\`\`bash
npm install dompurify
\`\`\`

Then sanitize before rendering:
\`\`\`javascript
import DOMPurify from 'dompurify'

// Before (vulnerable)
element.innerHTML = userHtml

// After (secure)
element.innerHTML = DOMPurify.sanitize(userHtml)

// For React
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userHtml) }} />

// For Vue
<div v-html="DOMPurify.sanitize(userHtml)"></div>

// For Svelte
{@html DOMPurify.sanitize(userHtml)}
\`\`\`

### For URL assignments:
\`\`\`javascript
// Before (vulnerable)
location.href = userUrl

// After (secure)
function isValidUrl(url) {
  try {
    const parsed = new URL(url, window.location.origin)
    return ['http:', 'https:'].includes(parsed.protocol)
  } catch {
    return false
  }
}

if (isValidUrl(userUrl)) {
  location.href = userUrl
}
\`\`\`

### For anchor href attributes:
\`\`\`javascript
// Before (vulnerable - allows javascript: URLs)
link.href = userInput

// After (secure)
const url = new URL(userInput, window.location.origin)
if (['http:', 'https:'].includes(url.protocol)) {
  link.href = url.href
}
\`\`\`

### Remove eval-like patterns entirely:
\`\`\`javascript
// Before (vulnerable)
eval(userCode)
new Function('return ' + userExpression)()
setTimeout(userCallback, 1000)

// After (secure - restructure to avoid eval)
// Use a proper parser, a sandboxed iframe, or redesign the feature
\`\`\`

## Additional defenses

Add Content Security Policy headers:
\`\`\`javascript
// In your server response headers or meta tag
Content-Security-Policy: default-src 'self'; script-src 'self'
\`\`\`

## After fixing

1. Search for remaining innerHTML, dangerouslySetInnerHTML, v-html, @html
2. Verify all URL assignments validate protocol
3. Remove or sandbox any eval() usage
4. Add CSP headers to block inline script execution
5. List all files you modified with before/after snippets

Please proceed systematically through my codebase.`}</div>
				</div>
			</div>

			<!-- Manual Fix -->
			<div class="fix-section">
				<h3>Manual Fix</h3>
				<p>The core fix is either using textContent instead of innerHTML, or sanitizing with DOMPurify:</p>

				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-block-header">
							<span class="code-block-lang status-bad">VULNERABLE</span>
						</div>
						<pre><code>{`// Reading from URL and rendering as HTML
const tab = location.hash.slice(1)
document.getElementById('tab-content').innerHTML = tab

// Rendering user-provided HTML content
function renderMarkdown(html) {
  preview.innerHTML = html
}

// Building HTML with string concatenation
const search = new URLSearchParams(location.search).get('q')
results.innerHTML = '<p>Searching for: ' + search + '</p>'

// Attacker crafts: site.com#<img src=x onerror=steal(cookie)>
// Result: Arbitrary JavaScript execution`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-block-header">
							<span class="code-block-lang status-good">SECURE</span>
						</div>
						<pre><code>{`import DOMPurify from 'dompurify'

// For text only - use textContent
const tab = location.hash.slice(1)
document.getElementById('tab-content').textContent = tab

// For HTML content - sanitize first
function renderMarkdown(html) {
  preview.innerHTML = DOMPurify.sanitize(html)
}

// For dynamic HTML - build with DOM methods
const search = new URLSearchParams(location.search).get('q')
const p = document.createElement('p')
p.textContent = 'Searching for: ' + search
results.appendChild(p)

// Attacker's payload is now escaped or stripped
// No JavaScript execution possible`}</code></pre>
					</div>
				</div>

				<p>
					<strong>Key changes:</strong> Use <code>textContent</code> when you only need text.
					Use <code>DOMPurify.sanitize()</code> when you need HTML rendering.
					Build dynamic elements with DOM APIs instead of string concatenation.
				</p>
			</div>

			<!-- Framework Fixes -->
			<div class="fix-section">
				<h3>Framework-specific fixes</h3>
				<div class="framework-fixes">
					<div class="framework-fix">
						<h4>React</h4>
						<div class="code-block">
							<pre><code>{`import DOMPurify from 'dompurify'

// Before (vulnerable)
<div dangerouslySetInnerHTML={{ __html: userHtml }} />

// After (secure)
<div dangerouslySetInnerHTML={{
  __html: DOMPurify.sanitize(userHtml)
}} />`}</code></pre>
						</div>
					</div>
					<div class="framework-fix">
						<h4>Vue</h4>
						<div class="code-block">
							<pre><code>{`import DOMPurify from 'dompurify'

// Before (vulnerable)
<div v-html="userHtml"></div>

// After (secure)
<div v-html="sanitizedHtml"></div>

computed: {
  sanitizedHtml() {
    return DOMPurify.sanitize(this.userHtml)
  }
}`}</code></pre>
						</div>
					</div>
					<div class="framework-fix">
						<h4>Svelte</h4>
						<div class="code-block">
							<pre><code>{`import DOMPurify from 'dompurify'

// Before (vulnerable)
{@html userHtml}

// After (secure)
{@html DOMPurify.sanitize(userHtml)}`}</code></pre>
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
				<a href="/kb/security/vulnerabilities/xss/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Cross-Site Scripting (XSS)</div>
					<p class="related-card-description">The complete guide to XSS types and prevention</p>
				</a>
				<a href="/kb/security/vulnerabilities/prototype-pollution/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Prototype Pollution</div>
					<p class="related-card-description">JavaScript prototype attacks in AI code</p>
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
			<h2>Find DOM XSS before attackers do</h2>
			<p>One vulnerable innerHTML can compromise every user who clicks a malicious link.</p>
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

	/* Source/Sink Grid */
	.source-sink-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5rem;
		margin: 1.5rem 0;
	}

	.source-sink-box {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.25rem;
	}

	.source-sink-box h3 {
		margin: 0 0 0.5rem;
		font-size: 1rem;
		color: var(--text-primary);
	}

	.source-sink-box > p {
		margin: 0 0 1rem;
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.source-sink-box ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.source-sink-box li {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.5rem 0;
		border-bottom: 1px solid var(--border);
		font-size: 0.875rem;
	}

	.source-sink-box li:last-child {
		border-bottom: none;
	}

	.source-sink-box code {
		background: var(--bg-tertiary);
		padding: 0.125rem 0.375rem;
		font-size: 0.8125rem;
	}

	.source-example {
		font-size: 0.75rem;
		color: var(--text-tertiary);
	}

	.sink-danger {
		font-size: 0.6875rem;
		padding: 0.125rem 0.375rem;
		font-weight: 500;
	}

	.badge-critical {
		background: var(--red);
		color: var(--bg-primary);
	}

	.badge-high {
		background: var(--orange);
		color: var(--bg-primary);
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

	/* Code Comparison - stacked layout (vulnerable on top, secure below) */
	.code-comparison {
		display: flex;
		flex-direction: column;
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

	/* Framework Fixes */
	.framework-fixes {
		display: grid;
		gap: 1.5rem;
		margin-top: 1rem;
	}

	.framework-fix h4 {
		margin: 0 0 0.5rem;
		font-size: 0.9375rem;
		color: var(--text-primary);
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
		.source-sink-grid {
			grid-template-columns: 1fr;
		}

		.faq-item h3 {
			font-size: 1rem;
		}
	}
</style>
