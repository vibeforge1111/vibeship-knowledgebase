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
	let copySuccess = $state(false);

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
7. Specific fix with code`;

	async function copyPrompt() {
		try {
			await navigator.clipboard.writeText(aiFixPrompt);
			copySuccess = true;
			setTimeout(() => copySuccess = false, 2000);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	}
</script>

<svelte:head>
	<title>{meta.title} | VibeShip</title>
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
			"name": "VibeShip",
			"url": "https://vibeship.co"
		},
		"publisher": {
			"@type": "Organization",
			"name": "VibeShip",
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

<Header {breadcrumbs} />

<div class="content-wrapper">
	<article class="content-main content-wide">
		<!-- Header Section -->
		<header class="article-header">
			<div class="badge-row">
				<span class="badge badge-high">High Severity</span>
				<a href={owaspData.cweSource} target="_blank" rel="noopener noreferrer" class="badge badge-info">{owaspData.cweId}</a>
				<a href={owaspData.source} target="_blank" rel="noopener noreferrer" class="badge badge-success">OWASP A10:2021</a>
			</div>
			<h1>{meta.title}</h1>
			<p class="subtitle">Attackers use your server to access internal systems they can't reach directly</p>
		</header>

		<!-- Quick Answer Box -->
		<div class="quick-answer">
			<h2>Quick Answer</h2>
			<p>
				<strong>SSRF (Server-Side Request Forgery) lets attackers make your server send requests to internal systems they can't reach directly.</strong> Next.js had critical SSRF vulnerabilities in 2024-2025. Always validate and allowlist URLs before your server fetches them.
			</p>
		</div>

		<!-- What is SSRF -->
		<section class="article-section" id="what-is">
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

		<!-- Real CVEs -->
		<section class="article-section" id="nextjs-cves">
			<h2>Real Next.js SSRF Vulnerabilities</h2>
			<p>
				This isn't theoretical - Next.js had critical SSRF vulnerabilities that affected real applications:
			</p>

			<div class="cve-list">
				<div class="cve-item cve-critical">
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

				<div class="cve-item cve-high">
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

		<!-- Attack Patterns -->
		<section class="article-section" id="attack-patterns">
			<h2>Common SSRF Attack Patterns</h2>
			<p>
				Attackers have many targets once they can control server-side requests:
			</p>

			<div class="pattern-list">
				<div class="pattern-item">
					<h4>Internal Service Access</h4>
					<code class="pattern-code">http://localhost:3000/admin</code>
					<p>Access admin panels and internal APIs running on the same server.</p>
				</div>

				<div class="pattern-item">
					<h4>Cloud Metadata Theft</h4>
					<code class="pattern-code">http://169.254.169.254/latest/meta-data/</code>
					<p>AWS, GCP, and Azure expose IAM credentials at this endpoint. SSRF can steal them.</p>
				</div>

				<div class="pattern-item">
					<h4>File Protocol</h4>
					<code class="pattern-code">file:///etc/passwd</code>
					<p>Read local files if the HTTP library supports file:// protocol.</p>
				</div>

				<div class="pattern-item">
					<h4>Internal Network Scanning</h4>
					<code class="pattern-code">http://192.168.1.1:22/</code>
					<p>Port scan internal hosts to discover services.</p>
				</div>

				<div class="pattern-item">
					<h4>DNS Rebinding</h4>
					<code class="pattern-code">http://attacker-domain.com/</code>
					<p>External domain that resolves to internal IP after initial check.</p>
				</div>
			</div>

			<p>
				For detailed exploitation techniques, see the <a href="https://portswigger.net/web-security/ssrf" target="_blank" rel="noopener noreferrer">PortSwigger SSRF Guide</a>.
			</p>
		</section>

		<!-- Why AI Generates This -->
		<section class="article-section" id="ai-patterns">
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

		<!-- Vulnerable Code -->
		<section class="article-section" id="vulnerable-code">
			<h2>Vulnerable Code Examples</h2>

			<h3>Pattern 1: Vulnerable URL Fetch (AI Default)</h3>
			<div class="code-block vulnerable">
				<div class="code-label">Vulnerable</div>
				<pre><code>{`// AI generates this for "fetch URL" features
app.get('/preview', async (req, res) => {
  const url = req.query.url
  const response = await fetch(url) // DANGEROUS!
  const data = await response.text()
  res.send(data)
})

// Attacker uses: /preview?url=http://localhost:3000/admin
// Or: /preview?url=http://169.254.169.254/latest/meta-data/`}</code></pre>
			</div>
			<p class="code-explanation">
				Any URL accepted, including internal services and cloud metadata endpoints. The attacker steals IAM credentials from AWS.
			</p>

			<h3>Pattern 2: Vulnerable Image Proxy</h3>
			<div class="code-block vulnerable">
				<div class="code-label">Vulnerable</div>
				<pre><code>{`// Image proxy without validation
app.get('/image-proxy', async (req, res) => {
  const imageUrl = req.query.src
  const response = await fetch(imageUrl)
  const buffer = await response.arrayBuffer()
  res.set('Content-Type', response.headers.get('content-type'))
  res.send(Buffer.from(buffer))
})

// Attacker: /image-proxy?src=file:///etc/passwd`}</code></pre>
			</div>
			<p class="code-explanation">
				Image proxies are common SSRF vectors. No protocol or domain validation allows file:// and internal URL access.
			</p>
		</section>

		<!-- Secure Patterns -->
		<section class="article-section" id="secure-patterns">
			<h2>How to Fix SSRF</h2>

			<h3>Secure Pattern: Complete URL Validation</h3>
			<div class="code-block secure">
				<div class="code-label">Secure</div>
				<pre><code>{`const dns = require('dns').promises

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

async function validateUrl(urlString) {
  // Parse URL safely
  let parsed
  try {
    parsed = new URL(urlString)
  } catch {
    throw new Error('Invalid URL')
  }

  // Check protocol
  if (!ALLOWED_PROTOCOLS.includes(parsed.protocol)) {
    throw new Error('Only HTTPS allowed')
  }

  // Check domain allowlist
  if (!ALLOWED_DOMAINS.includes(parsed.hostname)) {
    throw new Error('Domain not allowed')
  }

  // Check hostname isn't internal
  if (BLOCKED_IP_PATTERNS.some(p => p.test(parsed.hostname))) {
    throw new Error('Internal address blocked')
  }

  // DNS resolution check - prevents rebinding
  const ips = await dns.resolve4(parsed.hostname)
  for (const ip of ips) {
    if (BLOCKED_IP_PATTERNS.some(p => p.test(ip))) {
      throw new Error('Internal address blocked')
    }
  }

  return parsed.href
}

app.get('/preview', async (req, res) => {
  try {
    const safeUrl = await validateUrl(req.query.url)
    const response = await fetch(safeUrl)
    const data = await response.text()
    res.send(data)
  } catch (err) {
    res.status(403).json({ error: err.message })
  }
})`}</code></pre>
			</div>
			<p class="code-explanation">
				Complete validation: protocol allowlist, domain allowlist, IP blocking, and DNS resolution check to catch rebinding attacks.
			</p>

			<h3>Next.js Server Action Protection</h3>
			<div class="code-block secure">
				<div class="code-label">Secure</div>
				<pre><code>{`// Secure Next.js Server Action
'use server'

import { redirect } from 'next/navigation'

const ALLOWED_PATHS = ['/dashboard', '/profile', '/settings']

export async function safeRedirect(path: string) {
  // Block external redirects
  if (path.startsWith('http://') || path.startsWith('https://')) {
    throw new Error('External redirects not allowed')
  }

  // Block protocol-relative URLs
  if (path.startsWith('//')) {
    throw new Error('Protocol-relative URLs not allowed')
  }

  // Allowlist internal paths
  if (!ALLOWED_PATHS.some(allowed => path.startsWith(allowed))) {
    throw new Error('Invalid redirect path')
  }

  redirect(path)
}`}</code></pre>
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

		<!-- AI Fix Prompt -->
		<section class="article-section" id="ai-fix">
			<h2>AI Fix Prompt</h2>
			<p>
				Copy this prompt to your AI tool to scan your codebase for SSRF vulnerabilities:
			</p>

			<div class="fix-prompt">
				<button class="copy-btn" onclick={copyPrompt}>
					{copySuccess ? 'Copied!' : 'Copy Prompt'}
				</button>
				<pre>{aiFixPrompt}</pre>
			</div>
		</section>

		<!-- FAQ Section -->
		<section class="article-section" id="faq">
			<h2>Frequently Asked Questions</h2>

			<div class="faq-list">
				{#each faqs as faq}
					<div class="faq-item">
						<h3>{faq.question}</h3>
						<p>{faq.answer}</p>
					</div>
				{/each}
			</div>
		</section>

		<!-- Related Content -->
		<section class="article-section" id="related">
			<h2>Related Security Topics</h2>

			<div class="related-grid">
				<a href="/kb/security/vulnerabilities/hardcoded-secrets/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Hardcoded Secrets</div>
					<p class="related-card-description">SSRF to cloud metadata endpoints steals credentials - don't hardcode them either</p>
				</a>
				<a href="/kb/security/vulnerabilities/missing-auth/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Missing Authentication</div>
					<p class="related-card-description">SSRF targets unprotected internal APIs - secure them</p>
				</a>
				<a href="/kb/security/vulnerabilities/path-traversal/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Path Traversal</div>
					<p class="related-card-description">file:// protocol in SSRF enables similar file access attacks</p>
				</a>
				<a href="/kb/vibe-coding-tools/cursor/" class="card card-interactive related-card">
					<div class="related-card-category">Tool</div>
					<div class="related-card-title">Cursor Security Patterns</div>
					<p class="related-card-description">How Cursor generates URL-fetching code</p>
				</a>
				<a href="/kb/vibe-coding-tools/bolt/" class="card card-interactive related-card">
					<div class="related-card-category">Tool</div>
					<div class="related-card-title">Bolt.new Security</div>
					<p class="related-card-description">Webhook and API patterns from Bolt</p>
				</a>
				<a href="/kb/security/stacks/nextjs-supabase/" class="card card-interactive related-card">
					<div class="related-card-category">Stack</div>
					<div class="related-card-title">Next.js + Supabase Security</div>
					<p class="related-card-description">Secure patterns for the popular vibe coding stack</p>
				</a>
			</div>
		</section>

		<!-- External Resources -->
		<section class="article-section" id="resources">
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

		<!-- CTA Section -->
		<div class="cta-box">
			<h2>Find SSRF Vulnerabilities in Your Code</h2>
			<p>VibeShip Scanner automatically detects SSRF patterns in your codebase, including unvalidated URL fetching and missing internal IP blocks.</p>
			<a href="https://scanner.vibeship.co" class="cta-button">Scan Your Code Free</a>
		</div>
	</article>
</div>

<style>
	.article-header {
		margin-bottom: 2rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid var(--border);
	}

	.article-header h1 {
		font-size: 2rem;
		font-weight: 700;
		margin: 1rem 0 0.5rem 0;
		line-height: 1.2;
	}

	.subtitle {
		color: var(--text-secondary);
		font-size: 1.125rem;
		margin: 0;
	}

	.badge-row {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.badge-high {
		background: var(--bg-tertiary);
		color: var(--red);
		border: 1px solid var(--red);
	}

	.badge-info {
		background: var(--bg-tertiary);
		color: var(--blue);
		border: 1px solid var(--blue);
	}

	.badge-success {
		background: var(--bg-tertiary);
		color: var(--green-dim);
		border: 1px solid var(--green-dim);
	}

	.article-section {
		margin-bottom: 2.5rem;
	}

	.article-section h2 {
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: 1rem;
		color: var(--text-primary);
	}

	.article-section h3 {
		font-size: 1.125rem;
		font-weight: 600;
		margin: 1.5rem 0 0.75rem 0;
		color: var(--text-primary);
	}

	.article-section h4 {
		font-size: 1rem;
		font-weight: 600;
		margin: 0 0 0.5rem 0;
		color: var(--text-primary);
	}

	.article-section p {
		line-height: 1.7;
		margin-bottom: 1rem;
		color: var(--text-secondary);
	}

	.article-section a {
		color: var(--green-dim);
	}

	.article-section a:hover {
		color: var(--green);
	}

	.article-section ul {
		margin: 0 0 1rem 0;
		padding-left: 1.5rem;
	}

	.article-section li {
		margin-bottom: 0.5rem;
		color: var(--text-secondary);
	}

	.article-section code {
		background: var(--bg-tertiary);
		padding: 0.125rem 0.375rem;
		font-size: 0.9em;
	}

	/* CVE List */
	.cve-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin: 1rem 0;
	}

	.cve-item {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		overflow: hidden;
	}

	.cve-item.cve-critical {
		border-color: var(--red);
	}

	.cve-item.cve-high {
		border-color: var(--orange);
	}

	.cve-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem 1rem;
		background: var(--bg-tertiary);
	}

	.cve-id {
		font-weight: 600;
		font-family: monospace;
		color: var(--text-primary);
	}

	.cve-severity {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		padding: 0.25rem 0.5rem;
	}

	.cve-item.cve-critical .cve-severity {
		background: var(--bg-primary);
		color: var(--red);
	}

	.cve-item.cve-high .cve-severity {
		background: var(--bg-primary);
		color: var(--orange);
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
		color: var(--green-dim);
		font-size: 0.875rem;
	}

	/* Pattern List */
	.pattern-list {
		display: grid;
		gap: 1rem;
	}

	.pattern-item {
		background: var(--bg-secondary);
		padding: 1rem;
		border: 1px solid var(--border);
	}

	.pattern-item h4 {
		color: var(--text-primary);
		margin-bottom: 0.25rem;
	}

	.pattern-code {
		display: block;
		background: var(--bg-tertiary);
		color: var(--green-dim);
		padding: 0.5rem 0.75rem;
		margin-bottom: 0.5rem;
		font-size: 0.875rem;
	}

	.pattern-item p {
		font-size: 0.875rem;
		color: var(--text-tertiary);
		margin: 0;
	}

	/* Code Blocks */
	.code-block {
		background: var(--bg-tertiary);
		border: 1px solid var(--border);
		overflow: hidden;
		margin: 1rem 0;
	}

	.code-block.vulnerable {
		border-color: var(--red);
	}

	.code-block.secure {
		border-color: var(--green-dim);
	}

	.code-label {
		padding: 0.5rem 1rem;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		background: var(--bg-secondary);
		color: var(--text-secondary);
	}

	.code-block.vulnerable .code-label {
		color: var(--red);
	}

	.code-block.secure .code-label {
		color: var(--green-dim);
	}

	.code-block pre {
		margin: 0;
		padding: 1rem;
		overflow-x: auto;
		font-size: 0.8125rem;
		line-height: 1.5;
	}

	.code-block code {
		display: block;
		background: transparent;
		padding: 0;
		color: var(--text-primary);
		white-space: pre;
	}

	.code-explanation {
		font-size: 0.875rem;
		color: var(--text-tertiary);
		font-style: italic;
		margin-top: 0.5rem;
	}

	/* Fix Prompt */
	.fix-prompt {
		position: relative;
		background: var(--bg-tertiary);
		border: 1px solid var(--border);
		margin-top: 1rem;
	}

	.copy-btn {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		padding: 0.5rem 1rem;
		background: var(--green-dim);
		color: var(--bg-primary);
		border: none;
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		z-index: 1;
	}

	.copy-btn:hover {
		background: var(--green);
	}

	.fix-prompt pre {
		padding: 1.5rem;
		padding-top: 3rem;
		font-size: 0.8125rem;
		line-height: 1.6;
		overflow-x: auto;
		white-space: pre-wrap;
		margin: 0;
		max-height: 400px;
		overflow-y: auto;
	}

	/* FAQ */
	.faq-list {
		display: flex;
		flex-direction: column;
	}

	.faq-item {
		padding: 1rem 0;
		border-bottom: 1px solid var(--border);
	}

	.faq-item:last-child {
		border-bottom: none;
	}

	.faq-item h3 {
		font-size: 1rem;
		font-weight: 600;
		margin: 0 0 0.5rem 0;
		color: var(--text-primary);
	}

	.faq-item p {
		margin: 0;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	/* Resource List */
	.resource-list {
		list-style: none;
		padding: 0;
	}

	.resource-list li {
		padding: 0.75rem 0;
		border-bottom: 1px solid var(--border);
	}

	.resource-list li:last-child {
		border-bottom: none;
	}

	.resource-list a {
		font-weight: 500;
	}

	/* CTA Box */
	.cta-box {
		background: var(--bg-secondary);
		border: 1px solid var(--green-dim);
		padding: 2rem;
		text-align: center;
		margin-top: 2rem;
	}

	.cta-box h2 {
		color: var(--text-primary);
		margin-bottom: 0.75rem;
		font-size: 1.25rem;
	}

	.cta-box p {
		color: var(--text-secondary);
		margin-bottom: 1.5rem;
		max-width: 500px;
		margin-left: auto;
		margin-right: auto;
	}

	.cta-button {
		display: inline-block;
		background: var(--green-dim);
		color: var(--bg-primary);
		padding: 0.75rem 1.5rem;
		font-weight: 600;
		transition: background 0.2s;
	}

	.cta-button:hover {
		background: var(--green);
	}

	@media (max-width: 768px) {
		.article-header h1 {
			font-size: 1.5rem;
		}

		.cve-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.5rem;
		}
	}
</style>
