<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Open Redirect: How Attackers Hijack Your Login Flow',
		description: 'Open redirects let attackers send users to phishing sites using your trusted domain. Common in OAuth and login flows. Learn to validate redirect URLs safely.',
		url: '/kb/security/vulnerabilities/open-redirect/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Open Redirect' }
	];

	// Real external data sources
	const owaspData = {
		ranking: '#1',
		category: 'A01:2021 - Broken Access Control',
		source: 'https://owasp.org/Top10/A01_2021-Broken_Access_Control/',
		cweId: 'CWE-601',
		cweSource: 'https://cwe.mitre.org/data/definitions/601.html'
	};

	// FAQ data for schema
	const faqs = [
		{
			question: 'What is an open redirect vulnerability?',
			answer: 'Open redirect (CWE-601) happens when your application redirects users to any URL specified in a parameter without validation. Attackers craft malicious links using your trusted domain that redirect victims to phishing sites. Because the link starts with your legitimate domain, users trust it and click.'
		},
		{
			question: 'Why are open redirects dangerous?',
			answer: 'Open redirects enable sophisticated phishing attacks. Users see your trusted domain and SSL certificate, so they click the link and enter credentials. They are then redirected to a fake site that looks like yours. Attackers can also use open redirects to deliver malware or chain with other vulnerabilities like SSRF.'
		},
		{
			question: 'How do I validate redirect URLs?',
			answer: 'Use an allowlist of permitted redirect destinations. Only allow relative paths that start with "/" and match known routes in your app. Parse URLs properly using the URL constructor to prevent protocol tricks. Never accept arbitrary external URLs. For OAuth callbacks, validate the redirect_uri against registered values.'
		},
		{
			question: 'Can open redirects lead to account takeover?',
			answer: 'Yes, especially in OAuth flows. If an attacker can control the redirect_uri or post-login redirect, they may be able to steal authorization codes or tokens. The victim authenticates on your real site, then gets redirected to the attacker who captures the token in the URL. Always validate OAuth callbacks.'
		},
		{
			question: 'How do I fix open redirect in Next.js?',
			answer: 'In Next.js, validate the redirect path before using redirect() or res.redirect(). Check that the path starts with "/" but not "//". Validate against an allowlist of permitted paths. For API routes handling OAuth callbacks, strictly validate the redirect destination matches your configured callback URLs.'
		}
	];

	// State
	let showAIPrompt = $state(false);
	let copySuccess = $state(false);
	let expandedFaq = $state<string | null>(null);

	// AI Fix prompt
	const aiFixPrompt = `You are a security auditor. Scan this codebase for Open Redirect vulnerabilities (CWE-601).

## What to Search For

### 1. Redirect Functions with User Input
Search for redirect operations that use request parameters:
- res.redirect(req.query.url)
- redirect(userInput)
- Response.redirect(urlFromRequest)
- window.location = userUrl
- router.push(userPath)

### 2. Common Parameter Names
Search for these parameter names in redirect context:
- returnUrl, returnTo, return_to, return
- redirectUrl, redirectTo, redirect_to, redirect
- next, nextUrl, next_url
- url, target, destination, dest
- callback, callbackUrl, callback_url
- goto, go, forward, continue

### 3. OAuth/Auth Callback Handlers
Look for OAuth callback endpoints:
- /auth/callback
- /api/auth/callback
- /oauth/callback
- /login/callback
- OAuth state parameter handling

### 4. Framework-Specific Patterns

**Express:**
\`\`\`javascript
app.get('/login', (req, res) => {
  res.redirect(req.query.returnUrl) // VULNERABLE if unvalidated
})
\`\`\`

**Next.js:**
\`\`\`typescript
// pages/api/redirect.ts
export default function handler(req, res) {
  res.redirect(req.query.url) // VULNERABLE
}

// app/redirect/route.ts
import { redirect } from 'next/navigation'
export function GET(request) {
  const url = request.nextUrl.searchParams.get('url')
  redirect(url) // VULNERABLE
}
\`\`\`

**React Router:**
\`\`\`javascript
const { search } = useLocation()
const params = new URLSearchParams(search)
navigate(params.get('next')) // VULNERABLE
\`\`\`

## Validation Requirements

For any redirect, verify ALL of these checks exist:

\`\`\`javascript
function isValidRedirect(url) {
  // 1. Must start with / (relative path)
  if (!url.startsWith('/')) return false

  // 2. Must NOT be protocol-relative (//evil.com)
  if (url.startsWith('//')) return false

  // 3. Block dangerous protocols if full URL
  try {
    const parsed = new URL(url, 'https://example.com')
    if (!['http:', 'https:'].includes(parsed.protocol)) return false
  } catch {}

  // 4. Allowlist check (preferred)
  const basePath = url.split('?')[0]
  const ALLOWED = ['/dashboard', '/profile', '/settings']
  if (!ALLOWED.some(p => basePath.startsWith(p))) return false

  return true
}
\`\`\`

## Bypass Attempts to Check

Verify validation cannot be bypassed by:
- Protocol-relative: //evil.com
- javascript: URLs: javascript:alert(1)
- data: URLs: data:text/html,<script>...
- URL encoding: %2f%2fevil.com
- Backslash: /\\evil.com
- Subdomain tricks: https://trusted.com.evil.com
- Open redirect chaining through allowed domains

## Report Format

For each finding, report:
1. File and line number
2. The vulnerable code pattern
3. What parameter controls the redirect
4. What validation exists (if any)
5. Whether it's in auth/login flow (higher severity)
6. Specific fix with code

## Fix Template

\`\`\`javascript
// Option 1: Path allowlist (preferred)
const ALLOWED_PATHS = ['/dashboard', '/profile', '/settings', '/']

function validateRedirect(path) {
  if (!path || typeof path !== 'string') return '/'
  if (!path.startsWith('/')) return '/'
  if (path.startsWith('//')) return '/'

  const basePath = path.split('?')[0]
  if (!ALLOWED_PATHS.some(p => basePath === p || basePath.startsWith(p + '/'))) {
    return '/'
  }

  return path
}

// Option 2: Mapping (most secure)
const REDIRECT_MAP = {
  'dashboard': '/dashboard',
  'profile': '/profile',
  'home': '/',
}

function getRedirect(key) {
  return REDIRECT_MAP[key] || '/'
}
\`\`\`

Begin your audit. Find all redirect operations, trace what controls the destination, and verify proper validation exists.`;

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
	<title>{meta.title} | VibeShip</title>
	<meta name="description" content={meta.description} />
	<meta name="keywords" content="open redirect vulnerability, unvalidated redirect, CWE-601, phishing attack, OAuth security, login redirect" />
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
		"keywords": ["open redirect", "unvalidated redirect", "CWE-601", "phishing", "OAuth security"],
		"about": {
			"@type": "Thing",
			"name": "Open Redirect Vulnerability",
			"sameAs": "https://cwe.mitre.org/data/definitions/601.html"
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
			<span class="badge severity-medium">Medium Severity</span>
			<a href={owaspData.cweSource} target="_blank" rel="noopener noreferrer" class="badge cwe-badge">{owaspData.cweId}</a>
			<a href={owaspData.source} target="_blank" rel="noopener noreferrer" class="badge owasp-badge">OWASP A01:2021</a>
		</div>
		<h1>{meta.title}</h1>
		<p class="subtitle">Attackers use your trusted domain to send users to phishing sites</p>
	</header>

	<!-- Quick Answer Box -->
	<div class="quick-answer">
		<div class="quick-answer-icon">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
		</div>
		<div class="quick-answer-content">
			<strong>Open redirect happens when your app redirects users to any URL they specify in a parameter.</strong> Attackers craft links using your trusted domain that redirect to phishing sites. Always validate redirect URLs against an allowlist of trusted destinations.
		</div>
	</div>

	<!-- Main Content -->
	<article class="content">
		<section class="section" id="what-is">
			<h2>What is Open Redirect?</h2>
			<p>
				Open redirect (<a href="https://cwe.mitre.org/data/definitions/601.html" target="_blank" rel="noopener noreferrer">CWE-601</a>) happens when your application blindly redirects users to any URL specified in a request parameter. Users see your familiar domain and trust the link, but after clicking, they end up on an attacker's phishing site.
			</p>
			<p>
				Think of it like a receptionist at a trusted company who gives visitors directions to wherever someone asks - including to a scam office down the street. The receptionist (your app) doesn't verify the destination, just redirects.
			</p>
			<p>
				Why is this dangerous? Users trust your domain. They see the SSL lock, recognize the URL, and click. By the time they realize they're on a fake site that looks just like yours, they've already entered their credentials.
			</p>
		</section>

		<section class="section" id="why-dangerous">
			<h2>Why Open Redirects Are Dangerous</h2>

			<div class="danger-list">
				<div class="danger-item">
					<h4>Phishing with Trusted Domains</h4>
					<p>
						A link like <code>https://yourapp.com/login?returnUrl=https://evil-clone.com</code> looks legitimate. Users trust it because it starts with your domain. After logging in on your real site, they're redirected to the attacker's identical-looking phishing page.
					</p>
				</div>

				<div class="danger-item">
					<h4>OAuth Token Theft</h4>
					<p>
						In OAuth flows, if attackers control the redirect destination, they can steal authorization codes or tokens. The victim authenticates legitimately, then the token lands in the attacker's hands.
					</p>
				</div>

				<div class="danger-item">
					<h4>Malware Distribution</h4>
					<p>
						Open redirects can send users to malware-hosting sites. Drive-by downloads become more effective when the initial link appears to come from a trusted source.
					</p>
				</div>

				<div class="danger-item">
					<h4>Vulnerability Chaining</h4>
					<p>
						Open redirects can enhance <a href="/kb/security/vulnerabilities/ssrf/">SSRF attacks</a> by providing redirects to internal URLs, or enable <a href="/kb/security/vulnerabilities/xss/">XSS</a> via javascript: protocol URLs.
					</p>
				</div>
			</div>
		</section>

		<section class="section" id="ai-patterns">
			<h2>Where AI Tools Create Open Redirects</h2>
			<p>
				When you ask AI tools to "redirect after login" or "add a return URL," they generate the simplest working code without validation. This is a classic vibe coding trap - the code works perfectly until an attacker finds it.
			</p>
			<p>
				Common vibe coded patterns that create open redirects:
			</p>
			<ul>
				<li><strong>Login flows</strong> - "Return to original page after login"</li>
				<li><strong>OAuth callbacks</strong> - "Redirect after successful authentication"</li>
				<li><strong>Action completions</strong> - "Redirect after form submission"</li>
				<li><strong>Email links</strong> - "Track clicks and redirect to destination"</li>
				<li><strong>Short URLs</strong> - "Create redirect service"</li>
			</ul>
		</section>

		<section class="section" id="attack-patterns">
			<h2>Common Open Redirect Patterns</h2>
			<p>
				Attackers have various techniques to exploit and bypass weak validation:
			</p>

			<div class="pattern-list">
				<div class="pattern">
					<h4>Query Parameter</h4>
					<code>/redirect?url=https://evil.com</code>
					<p>The classic pattern. URL in query string is used directly.</p>
				</div>

				<div class="pattern">
					<h4>Protocol-Relative</h4>
					<code>/redirect?url=//evil.com</code>
					<p>Bypasses checks for "http" because it starts with //.</p>
				</div>

				<div class="pattern">
					<h4>JavaScript Protocol</h4>
					<code>/redirect?url=javascript:alert(1)</code>
					<p>Can execute code if the redirect becomes href.</p>
				</div>

				<div class="pattern">
					<h4>URL Encoding</h4>
					<code>/redirect?url=%2f%2fevil.com</code>
					<p>Encoded // bypasses simple string checks.</p>
				</div>

				<div class="pattern">
					<h4>Subdomain Tricks</h4>
					<code>/redirect?url=https://trusted.com.evil.com</code>
					<p>Looks like your domain but isn't.</p>
				</div>

				<div class="pattern">
					<h4>Backslash Confusion</h4>
					<code>/redirect?url=/\evil.com</code>
					<p>Some parsers treat backslash as path separator.</p>
				</div>
			</div>

			<p>
				For detailed exploitation techniques, see the <a href="https://portswigger.net/kb/issues/00500100_open-redirection-reflected" target="_blank" rel="noopener noreferrer">PortSwigger Open Redirect Guide</a>.
			</p>
		</section>

		<section class="section" id="vulnerable-code">
			<h2>Vulnerable Code Examples</h2>

			<h3>Pattern 1: Vulnerable Return URL (AI Default)</h3>
			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-label">
						<span class="status-icon">&#10060;</span> VULNERABLE
					</div>
					<pre><code>// AI generates this for "return after login"
app.get('/login', (req, res) =&gt; &#123;
  const returnUrl = req.query.returnUrl || '/'
  // ... authenticate user ...
  res.redirect(returnUrl) // DANGEROUS!
&#125;)

// Attacker: /login?returnUrl=https://evil-phishing-site.com
// User sees your trusted login, then lands on phishing page</code></pre>
				</div>
			</div>
			<p class="code-explanation">
				Any URL accepted as redirect target. The attacker crafts links that look legitimate but redirect to phishing.
			</p>

			<h3>Pattern 2: Vulnerable OAuth Callback</h3>
			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-label">
						<span class="status-icon">&#10060;</span> VULNERABLE
					</div>
					<pre><code>// OAuth callback without validation
app.get('/auth/callback', async (req, res) =&gt; &#123;
  const &#123; code, state &#125; = req.query
  // ... exchange code for token ...

  const redirectTo = req.query.redirect || '/dashboard'
  res.redirect(redirectTo) // DANGEROUS!
&#125;)

// Attacker: /auth/callback?code=xxx&redirect=https://evil.com
// Token ends up exposed in attacker-controlled destination</code></pre>
				</div>
			</div>
			<p class="code-explanation">
				OAuth flows are high-value targets. Without validation, attackers can steal tokens by controlling the redirect.
			</p>
		</section>

		<section class="section" id="secure-patterns">
			<h2>How to Fix Open Redirects</h2>

			<h3>Secure Pattern: Path Allowlist (Recommended)</h3>
			<div class="code-comparison">
				<div class="code-block secure">
					<div class="code-label">
						<span class="status-icon">&#9989;</span> SECURE
					</div>
					<pre><code>// Validate against allowlist of paths
const ALLOWED_REDIRECTS = ['/', '/dashboard', '/profile', '/settings']

function isValidRedirect(url) &#123;
  // Must be a string
  if (!url || typeof url !== 'string') return false

  // Must start with / (relative path)
  if (!url.startsWith('/')) return false

  // Must NOT be protocol-relative (//evil.com)
  if (url.startsWith('//')) return false

  // Remove query string for comparison
  const path = url.split('?')[0]

  // Check against allowlist
  return ALLOWED_REDIRECTS.some(allowed =&gt;
    path === allowed || path.startsWith(allowed + '/')
  )
&#125;

app.get('/login', (req, res) =&gt; &#123;
  const returnUrl = req.query.returnUrl || '/'

  if (!isValidRedirect(returnUrl)) &#123;
    return res.redirect('/') // Default to safe page
  &#125;

  // ... authenticate ...
  res.redirect(returnUrl)
&#125;)</code></pre>
				</div>
			</div>
			<p class="code-explanation">
				Only allow specific, known paths. Reject external URLs, protocol-relative URLs, and unexpected paths.
			</p>

			<h3>Secure Pattern: Domain Validation</h3>
			<div class="code-comparison">
				<div class="code-block secure">
					<div class="code-label">
						<span class="status-icon">&#9989;</span> SECURE
					</div>
					<pre><code>// Validate URL is on trusted domain
const TRUSTED_DOMAINS = ['myapp.com', 'app.myapp.com']

function isValidRedirectUrl(urlString) &#123;
  try &#123;
    // Parse with base URL to handle relative paths
    const url = new URL(urlString, 'https://myapp.com')

    // Must be trusted domain
    if (!TRUSTED_DOMAINS.includes(url.hostname)) &#123;
      return false
    &#125;

    // Block dangerous protocols
    if (!['http:', 'https:'].includes(url.protocol)) &#123;
      return false
    &#125;

    return true
  &#125; catch &#123;
    return false
  &#125;
&#125;</code></pre>
				</div>
			</div>
			<p class="code-explanation">
				Parse URLs properly using the URL constructor. Validate hostname and protocol explicitly.
			</p>

			<h3>Next.js Redirect Protection</h3>
			<div class="code-comparison">
				<div class="code-block secure">
					<div class="code-label">
						<span class="status-icon">&#9989;</span> SECURE
					</div>
					<pre><code>// Next.js API route with redirect validation
// pages/api/auth/callback.ts
import type &#123; NextApiRequest, NextApiResponse &#125; from 'next'

const ALLOWED_PATHS = ['/dashboard', '/profile', '/settings']

function isAllowedRedirect(path: string): boolean &#123;
  if (!path || typeof path !== 'string') return false
  if (!path.startsWith('/')) return false
  if (path.startsWith('//')) return false

  const basePath = path.split('?')[0]
  return ALLOWED_PATHS.some(allowed =&gt;
    basePath === allowed || basePath.startsWith(allowed + '/')
  )
&#125;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) &#123;
  const &#123; returnTo &#125; = req.query
  const redirectPath = typeof returnTo === 'string'
    ? returnTo
    : '/dashboard'

  if (!isAllowedRedirect(redirectPath)) &#123;
    return res.redirect('/dashboard')
  &#125;

  res.redirect(redirectPath)
&#125;</code></pre>
				</div>
			</div>
			<p class="code-explanation">
				Same pattern for Next.js. Validate before calling redirect(). Block protocol-relative URLs.
			</p>

			<h3>Most Secure: Mapping Approach</h3>
			<div class="code-comparison">
				<div class="code-block secure">
					<div class="code-label">
						<span class="status-icon">&#9989;</span> MOST SECURE
					</div>
					<pre><code>// Map IDs to URLs instead of accepting URLs directly
const REDIRECT_MAP = &#123;
  'dashboard': '/dashboard',
  'profile': '/profile',
  'settings': '/settings',
  'home': '/',
&#125;

app.get('/goto', (req, res) =&gt; &#123;
  const target = req.query.target
  const redirectUrl = REDIRECT_MAP[target] || '/'
  res.redirect(redirectUrl)
&#125;)

// Usage: /goto?target=dashboard
// Attacker cannot inject arbitrary URLs</code></pre>
				</div>
			</div>
			<p class="code-explanation">
				Never accept URLs directly. Map safe identifiers to hardcoded URLs. Impossible to exploit.
			</p>

			<h3>Key Security Points</h3>
			<ul>
				<li><strong>Allowlist, don't blocklist</strong> - specify exactly what's allowed</li>
				<li><strong>Check for //</strong> - protocol-relative URLs bypass http checks</li>
				<li><strong>Block javascript: and data:</strong> - can execute code</li>
				<li><strong>Use URL parser</strong> - don't regex match URLs manually</li>
				<li><strong>Consider mapping</strong> - IDs are more secure than URLs</li>
			</ul>
		</section>

		<section class="section" id="ai-fix">
			<h2>AI Fix Prompt</h2>
			<p>
				Copy this prompt to your AI tool to scan your codebase for open redirect vulnerabilities:
			</p>

			<div class="ai-prompt-container">
				<div class="ai-prompt-header">
					<span class="ai-prompt-title">Open Redirect Audit Prompt</span>
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
				<a href="/kb/security/vulnerabilities/ssrf/" class="related-card">
					<h4>SSRF</h4>
					<p>Open redirects can chain with SSRF to redirect to internal URLs</p>
				</a>
				<a href="/kb/security/vulnerabilities/xss/" class="related-card">
					<h4>XSS</h4>
					<p>javascript: protocol URLs in redirects can execute code</p>
				</a>
				<a href="/kb/security/vulnerabilities/missing-auth/" class="related-card">
					<h4>Missing Authentication</h4>
					<p>OAuth flows need both auth and redirect validation</p>
				</a>
				<a href="/kb/security/vulnerabilities/idor/" class="related-card">
					<h4>IDOR</h4>
					<p>Related access control vulnerability in authorization</p>
				</a>
				<a href="/kb/ai-patterns/cursor/" class="related-card">
					<h4>Cursor Security Patterns</h4>
					<p>Login flow vulnerabilities in Cursor-generated code</p>
				</a>
				<a href="/kb/ai-patterns/bolt/" class="related-card">
					<h4>Bolt.new Security</h4>
					<p>Authentication redirect patterns from Bolt</p>
				</a>
			</div>
		</section>

		<section class="section" id="resources">
			<h2>External Resources</h2>
			<ul class="resource-list">
				<li>
					<a href="https://cwe.mitre.org/data/definitions/601.html" target="_blank" rel="noopener noreferrer">CWE-601: Open Redirect</a> - Official vulnerability definition
				</li>
				<li>
					<a href="https://cheatsheetseries.owasp.org/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.html" target="_blank" rel="noopener noreferrer">OWASP Redirect Cheat Sheet</a> - Prevention recommendations
				</li>
				<li>
					<a href="https://portswigger.net/kb/issues/00500100_open-redirection-reflected" target="_blank" rel="noopener noreferrer">PortSwigger Open Redirect</a> - Detection and exploitation
				</li>
				<li>
					<a href="https://learn.snyk.io/lesson/open-redirect/" target="_blank" rel="noopener noreferrer">Snyk Open Redirect</a> - Practical examples
				</li>
				<li>
					<a href="https://owasp.org/Top10/A01_2021-Broken_Access_Control/" target="_blank" rel="noopener noreferrer">OWASP Broken Access Control</a> - Top 10 category
				</li>
			</ul>
		</section>
	</article>

	<!-- CTA Section -->
	<section class="cta-section">
		<div class="cta-content">
			<h2>Find Open Redirects in Your Code</h2>
			<p>VibeShip Scanner automatically detects unvalidated redirects in your codebase, including OAuth callback handlers and login return URLs.</p>
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

	.severity-medium {
		background: #fff7ed;
		color: #ea580c;
		border: 1px solid #fed7aa;
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

	/* Danger List */
	.danger-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.danger-item {
		padding: 1rem;
		background: #fef2f2;
		border-radius: 8px;
		border-left: 3px solid #ef4444;
	}

	.danger-item h4 {
		color: #dc2626;
		margin-bottom: 0.5rem;
	}

	.danger-item p {
		margin: 0;
		font-size: 0.9375rem;
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
