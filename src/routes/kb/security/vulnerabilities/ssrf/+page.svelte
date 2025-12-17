<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'SSRF: When Your Server Makes Requests for Attackers',
		description: 'SSRF lets attackers use your server to access internal systems. Next.js had critical SSRF CVEs in 2024-2025. Learn to validate URLs and protect your APIs.',
		url: '/kb/security/vulnerabilities/ssrf/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'SSRF' }
	];

	// Real external data sources
	const owaspData = {
		ranking: '#10',
		category: 'A10:2021 - Server-Side Request Forgery',
		source: 'https://owasp.org/Top10/A10_2021-Server-Side_Request_Forgery_%28SSRF%29/',
		cweId: 'CWE-918',
		cweSource: 'https://cwe.mitre.org/data/definitions/918.html'
	};

	// FAQ data for schema
	const faqs = [
		{
			question: 'What is SSRF vulnerability?',
			answer: 'SSRF (Server-Side Request Forgery) is a vulnerability where attackers trick your server into making HTTP requests to internal systems they cannot reach directly. By controlling a URL your server fetches, attackers can access internal APIs, cloud metadata endpoints, or scan internal networks. SSRF has its own category in OWASP Top 10 (A10:2021).'
		},
		{
			question: 'How do attackers exploit SSRF?',
			answer: 'Attackers find features where your server fetches URLs - like image previews, URL metadata extraction, or webhooks. They submit malicious URLs pointing to internal services (http://localhost:3000/admin) or cloud metadata (http://169.254.169.254). Your server, which has network access to these resources, fetches the data and returns it to the attacker.'
		},
		{
			question: 'Is my Next.js app vulnerable to SSRF?',
			answer: 'Possibly. Next.js had critical SSRF vulnerabilities: CVE-2024-34351 (versions 13.4.0-14.1.0) in Server Actions and CVE-2025-57822 in middleware. Update to Next.js 14.1.1+ or 15.4.7+ and audit any code that fetches user-supplied URLs. Self-hosted deployments were more affected than Vercel-hosted apps.'
		},
		{
			question: 'How do I prevent SSRF in Node.js?',
			answer: 'Implement URL allowlisting: only allow requests to approved domains. Block internal IP ranges (127.x.x.x, 10.x.x.x, 172.16-31.x.x, 192.168.x.x, 169.254.x.x). Only allow https:// protocol. Resolve DNS and check the resolved IP is not internal. Never pass user input directly to fetch() or HTTP libraries.'
		},
		{
			question: 'What can attackers access with SSRF?',
			answer: 'Attackers can access: internal APIs and admin panels (localhost services), cloud metadata endpoints to steal IAM credentials (AWS 169.254.169.254), internal databases, configuration services, and can port-scan your internal network. On cloud platforms, SSRF can lead to complete account takeover via stolen credentials.'
		}
	];

	// State
	let showAIPrompt = $state(false);
	let copySuccess = $state(false);
	let expandedFaq = $state<string | null>(null);

	// AI Fix prompt
	const aiFixPrompt = `You are a security auditor. Scan this codebase for SSRF (Server-Side Request Forgery) vulnerabilities (CWE-918).

## What to Search For

### 1. HTTP Requests with User-Controlled URLs
Search for fetch(), axios, got, node-fetch, or http/https modules with dynamic URLs:
- fetch(req.query.url)
- axios.get(userProvidedUrl)
- got(urlFromRequest)
- http.request(userInput)

### 2. Common SSRF-Vulnerable Features
Look for these features that commonly have SSRF:
- URL preview / link unfurling
- Image proxy / image resizer
- Webhook receivers and senders
- PDF generators that fetch URLs
- Import from URL functionality
- RSS feed readers
- OAuth callbacks

### 3. Next.js Specific Patterns

**Server Actions with redirects:**
\`\`\`typescript
// CHECK: Does this validate the redirect target?
'use server'
import { redirect } from 'next/navigation'
export async function action(url: string) {
  redirect(url) // SSRF if url not validated
}
\`\`\`

**API routes fetching URLs:**
\`\`\`typescript
// app/api/proxy/route.ts
export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url')
  const response = await fetch(url) // VULNERABLE!
}
\`\`\`

### 4. URL Validation to Verify

For any URL fetching, verify ALL of these exist:
\`\`\`javascript
// 1. Parse URL safely
const parsed = new URL(userUrl)

// 2. Protocol allowlist
if (!['https:'].includes(parsed.protocol)) reject

// 3. Domain allowlist OR blocklist check
if (!ALLOWED_DOMAINS.includes(parsed.hostname)) reject

// 4. Block internal IPs (including cloud metadata)
const blocked = [
  /^localhost$/i,
  /^127\\./,
  /^10\\./,
  /^172\\.(1[6-9]|2[0-9]|3[0-1])\\./,
  /^192\\.168\\./,
  /^169\\.254\\./, // AWS/Azure metadata
  /^0\\.0\\.0\\.0$/,
  /^\\[::1\\]$/, // IPv6 localhost
]
if (blocked.some(p => p.test(parsed.hostname))) reject

// 5. DNS resolution check (prevents rebinding)
const ips = await dns.resolve4(parsed.hostname)
for (const ip of ips) {
  if (blocked.some(p => p.test(ip))) reject
}
\`\`\`

### 5. Bypass Attempts to Consider

Check if validation can be bypassed:
- IP address representations: 0177.0.0.1 (octal), 0x7f.0.0.1 (hex)
- URL encoding: %31%32%37.0.0.1
- DNS rebinding: external domain resolving to internal IP
- Redirects: allowed domain redirects to internal URL
- IPv6: [::1], [0:0:0:0:0:0:0:1]
- Decimal IP: 2130706433 (= 127.0.0.1)

## Framework Version Checks

For Next.js projects, verify version is patched:
- CVE-2024-34351: Fixed in 14.1.1+
- CVE-2025-57822: Fixed in 14.2.32+ and 15.4.7+

Check package.json for Next.js version.

## Report Format

For each finding, report:
1. File and line number
2. The vulnerable code pattern
3. What user input controls the URL
4. What validation exists (if any)
5. What's missing (protocol check, domain allowlist, IP block, DNS check)
6. Severity (Critical if no validation, High if partial)
7. Specific fix with code

## Fix Template

\`\`\`javascript
const dns = require('dns').promises

const ALLOWED_DOMAINS = ['api.example.com', 'cdn.example.com']

async function validateUrl(urlString) {
  // Parse URL
  let parsed
  try {
    parsed = new URL(urlString)
  } catch {
    throw new Error('Invalid URL')
  }

  // Protocol check
  if (parsed.protocol !== 'https:') {
    throw new Error('Only HTTPS allowed')
  }

  // Domain allowlist
  if (!ALLOWED_DOMAINS.includes(parsed.hostname)) {
    throw new Error('Domain not allowed')
  }

  // Resolve and check IPs
  const ips = await dns.resolve4(parsed.hostname)
  const blocked = [/^127\\./, /^10\\./, /^172\\.(1[6-9]|2[0-9]|3[0-1])\\./, /^192\\.168\\./, /^169\\.254\\./]

  for (const ip of ips) {
    if (blocked.some(p => p.test(ip))) {
      throw new Error('Internal address not allowed')
    }
  }

  return parsed.href
}
\`\`\`

Begin your audit. Find all HTTP request patterns with user input, then verify complete URL validation exists.`;

	async function copyPrompt() {
		try {
			await navigator.clipboard.writeText(aiFixPrompt);
			copySuccess = true;
			setTimeout(() => copySuccess = false, 2000);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	}

	function toggleFaq(id: string) {
		expandedFaq = expandedFaq === id ? null : id;
	}
</script>

<svelte:head>
	<title>{meta.title} | vibeship</title>
	<meta name="description" content={meta.description} />
	<meta name="keywords" content="SSRF vulnerability, server-side request forgery, CWE-918, Next.js SSRF, CVE-2024-34351, cloud metadata attack" />
	<link rel="canonical" href="https://vibeship.co{meta.url}" />

	<!-- Open Graph -->
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:type" content="article" />
	<meta property="og:url" content="https://vibeship.co{meta.url}" />

	<!-- Schema.org TechArticle -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@type": "TechArticle",
		"headline": meta.title,
		"description": meta.description,
		"author": {
			"@type": "Organization",
			"name": "vibeship",
			"url": "https://vibeship.co"
		},
		"publisher": {
			"@type": "Organization",
			"name": "vibeship",
			"url": "https://vibeship.co"
		},
		"datePublished": "2025-01-15",
		"dateModified": "2025-01-15",
		"mainEntityOfPage": "https://vibeship.co" + meta.url,
		"keywords": ["SSRF", "server-side request forgery", "CWE-918", "Next.js security", "cloud metadata"],
		"about": {
			"@type": "Thing",
			"name": "Server-Side Request Forgery",
			"sameAs": "https://cwe.mitre.org/data/definitions/918.html"
		}
	})}</script>`}

	<!-- Schema.org FAQPage -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@type": "FAQPage",
		"mainEntity": faqs.map(faq => ({
			"@type": "Question",
			"name": faq.question,
			"acceptedAnswer": {
				"@type": "Answer",
				"text": faq.answer
			}
		}))
	})}</script>`}

	<!-- Schema.org BreadcrumbList -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"itemListElement": breadcrumbs.map((crumb, index) => ({
			"@type": "ListItem",
			"position": index + 1,
			"name": crumb.label,
			"item": crumb.href ? "https://vibeship.co" + crumb.href : undefined
		}))
	})}</script>`}
</svelte:head>

<Header />

<main class="vulnerability-page">
	<!-- Breadcrumb -->
	<nav class="breadcrumb" aria-label="Breadcrumb">
		{#each breadcrumbs as crumb, i}
			{#if crumb.href}
				<a href={crumb.href}>{crumb.label}</a>
			{:else}
				<span class="current">{crumb.label}</span>
			{/if}
			{#if i < breadcrumbs.length - 1}
				<span class="separator">/</span>
			{/if}
		{/each}
	</nav>

	<!-- Header Section -->
	<header class="vuln-header">
		<div class="vuln-badges">
			<span class="badge severity-high">High Severity</span>
			<a href={owaspData.cweSource} target="_blank" rel="noopener noreferrer" class="badge cwe-badge">{owaspData.cweId}</a>
			<a href={owaspData.source} target="_blank" rel="noopener noreferrer" class="badge owasp-badge">OWASP A10:2021</a>
		</div>
		<h1>{meta.title}</h1>
		<p class="subtitle">Attackers use your server to access internal systems they can't reach directly</p>
	</header>

	<!-- Quick Answer Box -->
	<div class="quick-answer">
		<div class="quick-answer-icon">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
		</div>
		<div class="quick-answer-content">
			<strong>SSRF (Server-Side Request Forgery) lets attackers make your server send requests to internal systems they can't reach directly.</strong> Next.js had critical SSRF vulnerabilities in 2024-2025. Always validate and allowlist URLs before your server fetches them.
		</div>
	</div>

	<!-- Main Content -->
	<article class="content">
		<section class="section" id="what-is">
			<h2>What is SSRF?</h2>
			<p>
				SSRF (Server-Side Request Forgery) happens when attackers trick your server into making HTTP requests on their behalf. Your server has access to internal systems - localhost services, cloud metadata endpoints, private APIs - that attackers can't reach directly from the internet. By controlling a URL your server fetches, they gain access to these protected resources.
			</p>
			<p>
				Think of it like convincing a delivery driver who has access to a secure building to pick up a package for you from inside. The driver (your server) has legitimate access; the attacker just manipulates what they retrieve.
			</p>
			<p>
				SSRF is serious enough to have its own dedicated category in the <a href="https://owasp.org/Top10/A10_2021-Server-Side_Request_Forgery_%28SSRF%29/" target="_blank" rel="noopener noreferrer">OWASP Top 10 (A10:2021)</a>. The consequences include accessing internal APIs, stealing cloud credentials, and scanning internal networks - all from a simple URL parameter.
			</p>
		</section>

		<section class="section" id="nextjs-cves">
			<h2>Real Next.js SSRF Vulnerabilities</h2>
			<p>
				This isn't theoretical - Next.js had critical SSRF vulnerabilities that affected real applications:
			</p>

			<div class="cve-list">
				<div class="cve-item critical">
					<div class="cve-header">
						<span class="cve-id">CVE-2024-34351</span>
						<span class="cve-severity">Critical</span>
					</div>
					<div class="cve-details">
						<p><strong>Affected:</strong> Next.js 13.4.0 - 14.1.0 (Server Actions)</p>
						<p><strong>Condition:</strong> Self-hosted deployments using Server Actions with redirect()</p>
						<p><strong>Attack:</strong> Manipulating the Host header to trigger SSRF via the redirect function</p>
						<p><strong>Fixed:</strong> Next.js 14.1.1+</p>
						<a href="https://github.com/vercel/next.js/security/advisories/GHSA-fr5h-rqp8-mj6g" target="_blank" rel="noopener noreferrer">View Advisory</a>
					</div>
				</div>

				<div class="cve-item high">
					<div class="cve-header">
						<span class="cve-id">CVE-2025-57822</span>
						<span class="cve-severity">High</span>
					</div>
					<div class="cve-details">
						<p><strong>Affected:</strong> Next.js &lt; 14.2.32 and &lt; 15.4.7</p>
						<p><strong>Condition:</strong> Middleware using next() function</p>
						<p><strong>Fixed:</strong> Next.js 14.2.32+ and 15.4.7+</p>
						<a href="https://security.snyk.io/vuln/SNYK-JS-NEXT-12299318" target="_blank" rel="noopener noreferrer">View Advisory</a>
					</div>
				</div>
			</div>

			<p>
				If you're a vibe coder using Next.js, check your <code>package.json</code> version immediately. Run <code>npm show next version</code> to see available updates.
			</p>
		</section>

		<section class="section" id="attack-patterns">
			<h2>Common SSRF Attack Patterns</h2>
			<p>
				Attackers have many targets once they can control server-side requests:
			</p>

			<div class="pattern-list">
				<div class="pattern">
					<h4>Internal Service Access</h4>
					<code>http://localhost:3000/admin</code>
					<p>Access admin panels and internal APIs running on the same server.</p>
				</div>

				<div class="pattern">
					<h4>Cloud Metadata Theft</h4>
					<code>http://169.254.169.254/latest/meta-data/</code>
					<p>AWS, GCP, and Azure expose IAM credentials at this endpoint. SSRF can steal them.</p>
				</div>

				<div class="pattern">
					<h4>File Protocol</h4>
					<code>file:///etc/passwd</code>
					<p>Read local files if the HTTP library supports file:// protocol.</p>
				</div>

				<div class="pattern">
					<h4>Internal Network Scanning</h4>
					<code>http://192.168.1.1:22/</code>
					<p>Port scan internal hosts to discover services.</p>
				</div>

				<div class="pattern">
					<h4>DNS Rebinding</h4>
					<code>http://attacker-domain.com/</code>
					<p>External domain that resolves to internal IP after initial check.</p>
				</div>
			</div>

			<p>
				For detailed exploitation techniques, see the <a href="https://portswigger.net/web-security/ssrf" target="_blank" rel="noopener noreferrer">PortSwigger SSRF Guide</a>.
			</p>
		</section>

		<section class="section" id="ai-patterns">
			<h2>Why AI Tools Generate SSRF-Vulnerable Code</h2>
			<p>
				When you ask AI tools to add features like "preview a URL" or "fetch data from a webhook," they generate the simplest working code without URL validation. This is classic vibe coding risk - the AI gives you functional code that's insecure by default.
			</p>
			<p>
				Features commonly vibe coded with SSRF vulnerabilities:
			</p>
			<ul>
				<li><strong>URL preview/unfurling</strong> - "Add link previews to my chat app"</li>
				<li><strong>Image proxy</strong> - "Resize images from any URL"</li>
				<li><strong>Webhook handlers</strong> - "Add webhook support"</li>
				<li><strong>Import from URL</strong> - "Let users import data from a URL"</li>
				<li><strong>PDF generation</strong> - "Generate PDFs from URLs"</li>
			</ul>
			<p>
				AI-generated code for these features almost never includes URL validation because you didn't explicitly ask for it.
			</p>
		</section>

		<section class="section" id="vulnerable-code">
			<h2>Vulnerable Code Examples</h2>

			<h3>Pattern 1: Vulnerable URL Fetch (AI Default)</h3>
			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-label">
						<span class="status-icon">&#10060;</span> VULNERABLE
					</div>
					<pre><code>// AI generates this for "fetch URL" features
app.get('/preview', async (req, res) =&gt; &#123;
  const url = req.query.url
  const response = await fetch(url) // DANGEROUS!
  const data = await response.text()
  res.send(data)
&#125;)

// Attacker uses: /preview?url=http://localhost:3000/admin
// Or: /preview?url=http://169.254.169.254/latest/meta-data/</code></pre>
				</div>
			</div>
			<p class="code-explanation">
				Any URL accepted, including internal services and cloud metadata endpoints. The attacker steals IAM credentials from AWS.
			</p>

			<h3>Pattern 2: Vulnerable Image Proxy</h3>
			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-label">
						<span class="status-icon">&#10060;</span> VULNERABLE
					</div>
					<pre><code>// Image proxy without validation
app.get('/image-proxy', async (req, res) =&gt; &#123;
  const imageUrl = req.query.src
  const response = await fetch(imageUrl)
  const buffer = await response.arrayBuffer()
  res.set('Content-Type', response.headers.get('content-type'))
  res.send(Buffer.from(buffer))
&#125;)

// Attacker: /image-proxy?src=file:///etc/passwd</code></pre>
				</div>
			</div>
			<p class="code-explanation">
				Image proxies are common SSRF vectors. No protocol or domain validation allows file:// and internal URL access.
			</p>
		</section>

		<section class="section" id="secure-patterns">
			<h2>How to Fix SSRF</h2>

			<h3>Secure Pattern: Complete URL Validation</h3>
			<div class="code-comparison">
				<div class="code-block secure">
					<div class="code-label">
						<span class="status-icon">&#9989;</span> SECURE
					</div>
					<pre><code>const dns = require('dns').promises

const ALLOWED_DOMAINS = ['api.example.com', 'cdn.example.com']
const ALLOWED_PROTOCOLS = ['https:']

// Block internal IP ranges
const BLOCKED_IP_PATTERNS = [
  /^localhost$/i,
  /^127\\./,
  /^10\\./,
  /^172\\.(1[6-9]|2[0-9]|3[0-1])\\./,
  /^192\\.168\\./,
  /^169\\.254\\./, // AWS/Azure metadata
  /^0\\.0\\.0\\.0$/,
]

async function validateUrl(urlString) &#123;
  // Parse URL safely
  let parsed
  try &#123;
    parsed = new URL(urlString)
  &#125; catch &#123;
    throw new Error('Invalid URL')
  &#125;

  // Check protocol
  if (!ALLOWED_PROTOCOLS.includes(parsed.protocol)) &#123;
    throw new Error('Only HTTPS allowed')
  &#125;

  // Check domain allowlist
  if (!ALLOWED_DOMAINS.includes(parsed.hostname)) &#123;
    throw new Error('Domain not allowed')
  &#125;

  // Check hostname isn't internal
  if (BLOCKED_IP_PATTERNS.some(p =&gt; p.test(parsed.hostname))) &#123;
    throw new Error('Internal address blocked')
  &#125;

  // DNS resolution check - prevents rebinding
  const ips = await dns.resolve4(parsed.hostname)
  for (const ip of ips) &#123;
    if (BLOCKED_IP_PATTERNS.some(p =&gt; p.test(ip))) &#123;
      throw new Error('Internal address blocked')
    &#125;
  &#125;

  return parsed.href
&#125;

app.get('/preview', async (req, res) =&gt; &#123;
  try &#123;
    const safeUrl = await validateUrl(req.query.url)
    const response = await fetch(safeUrl)
    const data = await response.text()
    res.send(data)
  &#125; catch (err) &#123;
    res.status(403).json(&#123; error: err.message &#125;)
  &#125;
&#125;)</code></pre>
				</div>
			</div>
			<p class="code-explanation">
				Complete validation: protocol allowlist, domain allowlist, IP blocking, and DNS resolution check to catch rebinding attacks.
			</p>

			<h3>Next.js Server Action Protection</h3>
			<div class="code-comparison">
				<div class="code-block secure">
					<div class="code-label">
						<span class="status-icon">&#9989;</span> SECURE
					</div>
					<pre><code>// Secure Next.js Server Action
'use server'

import &#123; redirect &#125; from 'next/navigation'

const ALLOWED_PATHS = ['/dashboard', '/profile', '/settings']

export async function safeRedirect(path: string) &#123;
  // Block external redirects
  if (path.startsWith('http://') || path.startsWith('https://')) &#123;
    throw new Error('External redirects not allowed')
  &#125;

  // Block protocol-relative URLs
  if (path.startsWith('//')) &#123;
    throw new Error('Protocol-relative URLs not allowed')
  &#125;

  // Allowlist internal paths
  if (!ALLOWED_PATHS.some(allowed =&gt; path.startsWith(allowed))) &#123;
    throw new Error('Invalid redirect path')
  &#125;

  redirect(path)
&#125;</code></pre>
				</div>
			</div>
			<p class="code-explanation">
				Server Actions should validate redirect paths strictly. This prevents CVE-2024-34351-style attacks.
			</p>

			<h3>Key Security Points</h3>
			<ul>
				<li><strong>Always use an allowlist</strong> - specify exactly which domains are allowed</li>
				<li><strong>Block all internal IPs</strong> - 127.x, 10.x, 172.16-31.x, 192.168.x, 169.254.x</li>
				<li><strong>Only allow HTTPS</strong> - block file://, gopher://, and other protocols</li>
				<li><strong>Check DNS resolution</strong> - catch rebinding attacks where domain resolves to internal IP</li>
				<li><strong>Don't trust redirects</strong> - an allowed domain could redirect to internal URL</li>
			</ul>
		</section>

		<section class="section" id="ai-fix">
			<h2>AI Fix Prompt</h2>
			<p>
				Copy this prompt to your AI tool to scan your codebase for SSRF vulnerabilities:
			</p>

			<div class="ai-prompt-container">
				<div class="ai-prompt-header">
					<span class="ai-prompt-title">SSRF Audit Prompt</span>
					<button
						class="copy-button"
						onclick={copyPrompt}
						disabled={copySuccess}
					>
						{#if copySuccess}
							<span class="copy-success">&#10003; Copied!</span>
						{:else}
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
							Copy Prompt
						{/if}
					</button>
				</div>
				<div class="ai-prompt-preview">
					<button
						class="expand-button"
						onclick={() => showAIPrompt = !showAIPrompt}
					>
						{showAIPrompt ? 'Hide' : 'Show'} Full Prompt ({aiFixPrompt.length} characters)
					</button>
					{#if showAIPrompt}
						<pre class="ai-prompt-content">{aiFixPrompt}</pre>
					{/if}
				</div>
			</div>
		</section>

		<section class="section" id="faq">
			<h2>Frequently Asked Questions</h2>

			<div class="faq-list">
				{#each faqs as faq, i}
					<div class="faq-item" class:expanded={expandedFaq === `faq-${i}`}>
						<button
							class="faq-question"
							onclick={() => toggleFaq(`faq-${i}`)}
							aria-expanded={expandedFaq === `faq-${i}`}
						>
							<span>{faq.question}</span>
							<span class="faq-icon">{expandedFaq === `faq-${i}` ? '−' : '+'}</span>
						</button>
						{#if expandedFaq === `faq-${i}`}
							<div class="faq-answer">
								<p>{faq.answer}</p>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</section>

		<section class="section" id="related">
			<h2>Related Security Topics</h2>

			<div class="related-grid">
				<a href="/kb/security/vulnerabilities/hardcoded-secrets/" class="related-card">
					<h4>Hardcoded Secrets</h4>
					<p>SSRF to cloud metadata endpoints steals credentials - don't hardcode them either</p>
				</a>
				<a href="/kb/security/vulnerabilities/missing-auth/" class="related-card">
					<h4>Missing Authentication</h4>
					<p>SSRF targets unprotected internal APIs - secure them</p>
				</a>
				<a href="/kb/security/vulnerabilities/path-traversal/" class="related-card">
					<h4>Path Traversal</h4>
					<p>file:// protocol in SSRF enables similar file access attacks</p>
				</a>
				<a href="/kb/vibe-coding-tools/cursor/" class="related-card">
					<h4>Cursor Security Patterns</h4>
					<p>How Cursor generates URL-fetching code</p>
				</a>
				<a href="/kb/vibe-coding-tools/bolt/" class="related-card">
					<h4>Bolt.new Security</h4>
					<p>Webhook and API patterns from Bolt</p>
				</a>
				<a href="/kb/security/stacks/nextjs-supabase/" class="related-card">
					<h4>Next.js + Supabase Security</h4>
					<p>Secure patterns for the popular vibe coding stack</p>
				</a>
			</div>
		</section>

		<section class="section" id="resources">
			<h2>External Resources</h2>
			<ul class="resource-list">
				<li>
					<a href="https://cwe.mitre.org/data/definitions/918.html" target="_blank" rel="noopener noreferrer">CWE-918: Server-Side Request Forgery</a> - Official vulnerability definition
				</li>
				<li>
					<a href="https://owasp.org/Top10/A10_2021-Server-Side_Request_Forgery_%28SSRF%29/" target="_blank" rel="noopener noreferrer">OWASP SSRF (A10:2021)</a> - Top 10 category explanation
				</li>
				<li>
					<a href="https://portswigger.net/web-security/ssrf" target="_blank" rel="noopener noreferrer">PortSwigger SSRF Guide</a> - Detailed exploitation techniques
				</li>
				<li>
					<a href="https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html" target="_blank" rel="noopener noreferrer">OWASP SSRF Prevention Cheat Sheet</a> - Comprehensive prevention guide
				</li>
				<li>
					<a href="https://github.com/vercel/next.js/security/advisories/GHSA-fr5h-rqp8-mj6g" target="_blank" rel="noopener noreferrer">Next.js CVE-2024-34351 Advisory</a> - Server Actions SSRF
				</li>
			</ul>
		</section>
	</article>

	<!-- CTA Section -->
	<section class="cta-section">
		<div class="cta-content">
			<h2>Find SSRF Vulnerabilities in Your Code</h2>
			<p>vibeship scanner automatically detects SSRF patterns in your codebase, including unvalidated URL fetching and missing internal IP blocks.</p>
			<a href="https://scanner.vibeship.co" class="cta-button">Scan Your Code Free</a>
		</div>
	</section>
</main>

<style>
	.vulnerability-page {
		max-width: 900px;
		margin: 0 auto;
		padding: 2rem 1rem;
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		color: #1a1a2e;
		line-height: 1.7;
	}

	/* Breadcrumb */
	.breadcrumb {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.875rem;
		color: #64748b;
		margin-bottom: 2rem;
		flex-wrap: wrap;
	}

	.breadcrumb a {
		color: #6366f1;
		text-decoration: none;
	}

	.breadcrumb a:hover {
		text-decoration: underline;
	}

	.breadcrumb .separator {
		color: #cbd5e1;
	}

	.breadcrumb .current {
		color: #1a1a2e;
		font-weight: 500;
	}

	/* Header */
	.vuln-header {
		margin-bottom: 2rem;
	}

	.vuln-badges {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1rem;
		flex-wrap: wrap;
	}

	.badge {
		display: inline-flex;
		align-items: center;
		padding: 0.25rem 0.75rem;
		border-radius: 9999px;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		text-decoration: none;
	}

	.severity-high {
		background: #fef2f2;
		color: #dc2626;
		border: 1px solid #fecaca;
	}

	.cwe-badge {
		background: #eff6ff;
		color: #2563eb;
		border: 1px solid #bfdbfe;
	}

	.cwe-badge:hover {
		background: #dbeafe;
	}

	.owasp-badge {
		background: #f0fdf4;
		color: #16a34a;
		border: 1px solid #bbf7d0;
	}

	.owasp-badge:hover {
		background: #dcfce7;
	}

	h1 {
		font-size: 2.25rem;
		font-weight: 800;
		color: #1a1a2e;
		margin: 0 0 0.75rem 0;
		line-height: 1.2;
	}

	.subtitle {
		font-size: 1.125rem;
		color: #64748b;
		margin: 0;
	}

	/* Quick Answer Box */
	.quick-answer {
		display: flex;
		gap: 1rem;
		padding: 1.5rem;
		background: linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%);
		border-radius: 12px;
		border-left: 4px solid #6366f1;
		margin-bottom: 3rem;
	}

	.quick-answer-icon {
		flex-shrink: 0;
		color: #6366f1;
	}

	.quick-answer-content {
		font-size: 1rem;
		color: #1e293b;
	}

	.quick-answer-content strong {
		color: #1a1a2e;
	}

	.quick-answer-content code {
		background: #e2e8f0;
		padding: 0.125rem 0.375rem;
		border-radius: 4px;
		font-size: 0.875rem;
	}

	/* Content Sections */
	.section {
		margin-bottom: 3rem;
	}

	h2 {
		font-size: 1.5rem;
		font-weight: 700;
		color: #1a1a2e;
		margin: 0 0 1rem 0;
		padding-bottom: 0.5rem;
		border-bottom: 2px solid #e2e8f0;
	}

	h3 {
		font-size: 1.125rem;
		font-weight: 600;
		color: #1a1a2e;
		margin: 1.5rem 0 0.75rem 0;
	}

	h4 {
		font-size: 1rem;
		font-weight: 600;
		color: #374151;
		margin: 0 0 0.5rem 0;
	}

	p {
		margin: 0 0 1rem 0;
		color: #374151;
	}

	.content a {
		color: #6366f1;
		text-decoration: none;
	}

	.content a:hover {
		text-decoration: underline;
	}

	ul, ol {
		margin: 0 0 1rem 0;
		padding-left: 1.5rem;
	}

	li {
		margin-bottom: 0.5rem;
		color: #374151;
	}

	code {
		font-family: 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace;
		background: #f1f5f9;
		padding: 0.125rem 0.375rem;
		border-radius: 4px;
		font-size: 0.875em;
	}

	/* CVE List */
	.cve-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin: 1rem 0;
	}

	.cve-item {
		background: #f8fafc;
		border-radius: 8px;
		overflow: hidden;
	}

	.cve-item.critical {
		border: 1px solid #fecaca;
	}

	.cve-item.high {
		border: 1px solid #fed7aa;
	}

	.cve-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem 1rem;
		background: #f1f5f9;
	}

	.cve-id {
		font-weight: 600;
		font-family: monospace;
		color: #1a1a2e;
	}

	.cve-severity {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
	}

	.cve-item.critical .cve-severity {
		background: #fef2f2;
		color: #dc2626;
	}

	.cve-item.high .cve-severity {
		background: #fff7ed;
		color: #ea580c;
	}

	.cve-details {
		padding: 1rem;
	}

	.cve-details p {
		margin: 0.25rem 0;
		font-size: 0.875rem;
	}

	.cve-details a {
		display: inline-block;
		margin-top: 0.5rem;
		color: #6366f1;
		font-size: 0.875rem;
	}

	/* Pattern List */
	.pattern-list {
		display: grid;
		gap: 1rem;
	}

	.pattern {
		background: #f8fafc;
		padding: 1rem;
		border-radius: 8px;
		border: 1px solid #e2e8f0;
	}

	.pattern h4 {
		color: #1a1a2e;
		margin-bottom: 0.25rem;
	}

	.pattern code {
		display: block;
		background: #1a1a2e;
		color: #22c55e;
		padding: 0.5rem 0.75rem;
		border-radius: 4px;
		margin-bottom: 0.5rem;
		font-size: 0.875rem;
	}

	.pattern p {
		font-size: 0.875rem;
		color: #64748b;
		margin: 0;
	}

	/* Code Comparison */
	.code-comparison {
		margin: 1rem 0;
	}

	.code-block {
		border-radius: 8px;
		overflow: hidden;
		margin-bottom: 1rem;
	}

	.code-block.vulnerable {
		border: 1px solid #fecaca;
	}

	.code-block.secure {
		border: 1px solid #bbf7d0;
	}

	.code-label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.code-block.vulnerable .code-label {
		background: #fef2f2;
		color: #dc2626;
	}

	.code-block.secure .code-label {
		background: #f0fdf4;
		color: #16a34a;
	}

	.code-block pre {
		margin: 0;
		padding: 1rem;
		background: #1e1e2e;
		overflow-x: auto;
	}

	.code-block code {
		display: block;
		background: transparent;
		padding: 0;
		color: #e2e8f0;
		font-size: 0.875rem;
		line-height: 1.6;
		white-space: pre;
	}

	.code-explanation {
		font-size: 0.875rem;
		color: #64748b;
		font-style: italic;
		margin-top: 0.5rem;
	}

	/* AI Prompt */
	.ai-prompt-container {
		background: #1e1e2e;
		border-radius: 12px;
		overflow: hidden;
		margin: 1.5rem 0;
	}

	.ai-prompt-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		background: #2d2d3d;
		border-bottom: 1px solid #3d3d4d;
	}

	.ai-prompt-title {
		color: #e2e8f0;
		font-weight: 600;
		font-size: 0.875rem;
	}

	.copy-button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		background: #6366f1;
		color: white;
		border: none;
		border-radius: 6px;
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		transition: background 0.2s;
	}

	.copy-button:hover:not(:disabled) {
		background: #4f46e5;
	}

	.copy-button:disabled {
		background: #22c55e;
	}

	.ai-prompt-preview {
		padding: 1rem;
	}

	.expand-button {
		display: block;
		width: 100%;
		padding: 0.75rem;
		background: #2d2d3d;
		color: #94a3b8;
		border: 1px solid #3d3d4d;
		border-radius: 6px;
		font-size: 0.875rem;
		cursor: pointer;
		transition: all 0.2s;
	}

	.expand-button:hover {
		background: #3d3d4d;
		color: #e2e8f0;
	}

	.ai-prompt-content {
		margin: 1rem 0 0 0;
		padding: 1rem;
		background: #2d2d3d;
		border-radius: 8px;
		color: #e2e8f0;
		font-size: 0.8125rem;
		line-height: 1.6;
		white-space: pre-wrap;
		overflow-x: auto;
		max-height: 400px;
		overflow-y: auto;
	}

	/* FAQ */
	.faq-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.faq-item {
		border: 1px solid #e2e8f0;
		border-radius: 8px;
		overflow: hidden;
	}

	.faq-item.expanded {
		border-color: #6366f1;
	}

	.faq-question {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding: 1rem;
		background: #f8fafc;
		border: none;
		cursor: pointer;
		text-align: left;
		font-size: 1rem;
		font-weight: 500;
		color: #1a1a2e;
		transition: background 0.2s;
	}

	.faq-question:hover {
		background: #f1f5f9;
	}

	.faq-item.expanded .faq-question {
		background: #eff6ff;
	}

	.faq-icon {
		font-size: 1.25rem;
		color: #6366f1;
		font-weight: 300;
	}

	.faq-answer {
		padding: 1rem;
		background: white;
		border-top: 1px solid #e2e8f0;
	}

	.faq-answer p {
		margin: 0;
		color: #374151;
	}

	/* Related Grid */
	.related-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 1rem;
	}

	.related-card {
		display: block;
		padding: 1.25rem;
		background: #f8fafc;
		border: 1px solid #e2e8f0;
		border-radius: 8px;
		text-decoration: none;
		transition: all 0.2s;
	}

	.related-card:hover {
		border-color: #6366f1;
		box-shadow: 0 4px 12px rgba(99, 102, 241, 0.1);
		text-decoration: none;
	}

	.related-card h4 {
		color: #6366f1;
		margin: 0 0 0.5rem 0;
	}

	.related-card p {
		font-size: 0.875rem;
		color: #64748b;
		margin: 0;
	}

	/* Resource List */
	.resource-list {
		list-style: none;
		padding: 0;
	}

	.resource-list li {
		padding: 0.75rem 0;
		border-bottom: 1px solid #e2e8f0;
	}

	.resource-list li:last-child {
		border-bottom: none;
	}

	.resource-list a {
		font-weight: 500;
	}

	/* CTA Section */
	.cta-section {
		margin-top: 4rem;
		padding: 3rem 2rem;
		background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
		border-radius: 16px;
		text-align: center;
	}

	.cta-content h2 {
		color: white;
		border-bottom: none;
		margin-bottom: 1rem;
	}

	.cta-content p {
		color: rgba(255, 255, 255, 0.9);
		font-size: 1.125rem;
		max-width: 600px;
		margin: 0 auto 1.5rem auto;
	}

	.cta-button {
		display: inline-block;
		padding: 1rem 2rem;
		background: white;
		color: #6366f1;
		font-weight: 600;
		font-size: 1.125rem;
		border-radius: 8px;
		text-decoration: none;
		transition: transform 0.2s, box-shadow 0.2s;
	}

	.cta-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
		text-decoration: none;
	}

	/* Responsive */
	@media (max-width: 640px) {
		.vulnerability-page {
			padding: 1rem;
		}

		h1 {
			font-size: 1.75rem;
		}

		.quick-answer {
			flex-direction: column;
			gap: 0.75rem;
		}

		.ai-prompt-header {
			flex-direction: column;
			gap: 1rem;
		}

		.copy-button {
			width: 100%;
			justify-content: center;
		}

		.cta-section {
			padding: 2rem 1rem;
		}
	}
</style>
