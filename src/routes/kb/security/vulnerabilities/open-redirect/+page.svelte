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

## Report Format

For each finding, report:
1. File and line number
2. The vulnerable code pattern
3. What parameter controls the redirect
4. What validation exists (if any)
5. Whether it's in auth/login flow (higher severity)
6. Specific fix with code`;
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

<Header {breadcrumbs} />

<div class="content-wrapper">
	<article class="content-main">
		<!-- Header -->
		<header class="article-header">
			<div class="badge-row">
				<span class="badge badge-medium">Medium Severity</span>
				<a href={owaspData.cweSource} target="_blank" rel="noopener noreferrer" class="badge badge-cwe">{owaspData.cweId}</a>
				<a href={owaspData.source} target="_blank" rel="noopener noreferrer" class="badge badge-owasp">OWASP A01:2021</a>
			</div>
			<h1>Open Redirect: How Attackers Hijack Your Login Flow</h1>
			<p class="subtitle">Attackers use your trusted domain to send users to phishing sites</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Open redirect happens when your app redirects users to any URL they specify in a parameter.</strong> Attackers craft links using your trusted domain that redirect to phishing sites. Always validate redirect URLs against an allowlist of trusted destinations.
			</p>
		</div>

		<!-- What Is Open Redirect -->
		<section>
			<h2>What is open redirect?</h2>
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

		<!-- Why Dangerous -->
		<section>
			<h2>Why open redirects are dangerous</h2>

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

		<!-- AI Patterns -->
		<section>
			<h2>Where AI tools create open redirects</h2>
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

		<!-- Attack Patterns -->
		<section>
			<h2>Common open redirect patterns</h2>
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

		<!-- Vulnerable Code -->
		<section>
			<h2>Vulnerable code examples</h2>

			<h3>Pattern 1: Vulnerable Return URL (AI Default)</h3>
			<div class="code-block vulnerable">
				<div class="code-label">VULNERABLE</div>
				<pre><code>{`// AI generates this for "return after login"
app.get('/login', (req, res) => {
  const returnUrl = req.query.returnUrl || '/'
  // ... authenticate user ...
  res.redirect(returnUrl) // DANGEROUS!
})

// Attacker: /login?returnUrl=https://evil-phishing-site.com
// User sees your trusted login, then lands on phishing page`}</code></pre>
			</div>
			<p class="code-explanation">
				Any URL accepted as redirect target. The attacker crafts links that look legitimate but redirect to phishing.
			</p>

			<h3>Pattern 2: Vulnerable OAuth Callback</h3>
			<div class="code-block vulnerable">
				<div class="code-label">VULNERABLE</div>
				<pre><code>{`// OAuth callback without validation
app.get('/auth/callback', async (req, res) => {
  const { code, state } = req.query
  // ... exchange code for token ...

  const redirectTo = req.query.redirect || '/dashboard'
  res.redirect(redirectTo) // DANGEROUS!
})

// Attacker: /auth/callback?code=xxx&redirect=https://evil.com
// Token ends up exposed in attacker-controlled destination`}</code></pre>
			</div>
			<p class="code-explanation">
				OAuth flows are high-value targets. Without validation, attackers can steal tokens by controlling the redirect.
			</p>
		</section>

		<!-- Secure Patterns -->
		<section>
			<h2>How to fix open redirects</h2>

			<h3>Secure Pattern: Path Allowlist (Recommended)</h3>
			<div class="code-block secure">
				<div class="code-label">SECURE</div>
				<pre><code>{`// Validate against allowlist of paths
const ALLOWED_REDIRECTS = ['/', '/dashboard', '/profile', '/settings']

function isValidRedirect(url) {
  // Must be a string
  if (!url || typeof url !== 'string') return false

  // Must start with / (relative path)
  if (!url.startsWith('/')) return false

  // Must NOT be protocol-relative (//evil.com)
  if (url.startsWith('//')) return false

  // Remove query string for comparison
  const path = url.split('?')[0]

  // Check against allowlist
  return ALLOWED_REDIRECTS.some(allowed =>
    path === allowed || path.startsWith(allowed + '/')
  )
}

app.get('/login', (req, res) => {
  const returnUrl = req.query.returnUrl || '/'

  if (!isValidRedirect(returnUrl)) {
    return res.redirect('/') // Default to safe page
  }

  // ... authenticate ...
  res.redirect(returnUrl)
})`}</code></pre>
			</div>
			<p class="code-explanation">
				Only allow specific, known paths. Reject external URLs, protocol-relative URLs, and unexpected paths.
			</p>

			<h3>Secure Pattern: Domain Validation</h3>
			<div class="code-block secure">
				<div class="code-label">SECURE</div>
				<pre><code>{`// Validate URL is on trusted domain
const TRUSTED_DOMAINS = ['myapp.com', 'app.myapp.com']

function isValidRedirectUrl(urlString) {
  try {
    // Parse with base URL to handle relative paths
    const url = new URL(urlString, 'https://myapp.com')

    // Must be trusted domain
    if (!TRUSTED_DOMAINS.includes(url.hostname)) {
      return false
    }

    // Block dangerous protocols
    if (!['http:', 'https:'].includes(url.protocol)) {
      return false
    }

    return true
  } catch {
    return false
  }
}`}</code></pre>
			</div>
			<p class="code-explanation">
				Parse URLs properly using the URL constructor. Validate hostname and protocol explicitly.
			</p>

			<h3>Most Secure: Mapping Approach</h3>
			<div class="code-block secure">
				<div class="code-label">MOST SECURE</div>
				<pre><code>{`// Map IDs to URLs instead of accepting URLs directly
const REDIRECT_MAP = {
  'dashboard': '/dashboard',
  'profile': '/profile',
  'settings': '/settings',
  'home': '/',
}

app.get('/goto', (req, res) => {
  const target = req.query.target
  const redirectUrl = REDIRECT_MAP[target] || '/'
  res.redirect(redirectUrl)
})

// Usage: /goto?target=dashboard
// Attacker cannot inject arbitrary URLs`}</code></pre>
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

		<!-- AI Fix Prompt -->
		<section class="ai-fix-section">
			<h2>AI fix prompt: Open redirect audit</h2>
			<p>
				Copy this prompt to your AI tool to scan your codebase for open redirect vulnerabilities:
			</p>

			<div class="code-block ai-prompt">
				<div class="code-label">Copy-paste into your AI tool</div>
				<pre><code>{aiFixPrompt}</code></pre>
			</div>
		</section>

		<!-- FAQ Section -->
		<section class="faq-section">
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
		<section>
			<h2>Related Security Topics</h2>
			<div class="related-grid">
				<a href="/kb/security/vulnerabilities/ssrf/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">SSRF</div>
					<p class="related-card-description">Open redirects can chain with SSRF to redirect to internal URLs</p>
				</a>
				<a href="/kb/security/vulnerabilities/xss/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">XSS</div>
					<p class="related-card-description">javascript: protocol URLs in redirects can execute code</p>
				</a>
				<a href="/kb/security/vulnerabilities/missing-auth/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Missing Authentication</div>
					<p class="related-card-description">OAuth flows need both auth and redirect validation</p>
				</a>
				<a href="/kb/security/vulnerabilities/idor/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">IDOR</div>
					<p class="related-card-description">Related access control vulnerability in authorization</p>
				</a>
				<a href="/kb/vibe-coding-tools/cursor/" class="card card-interactive related-card">
					<div class="related-card-category">Tool Guide</div>
					<div class="related-card-title">Cursor Security Patterns</div>
					<p class="related-card-description">Login flow vulnerabilities in Cursor-generated code</p>
				</a>
				<a href="/kb/vibe-coding/secure-vibe-coding-guide/" class="card card-interactive related-card">
					<div class="related-card-category">Pillar Guide</div>
					<div class="related-card-title">Secure Vibe Coding Guide</div>
					<p class="related-card-description">Complete security guide for AI-assisted development</p>
				</a>
			</div>
		</section>

		<!-- Resources -->
		<section>
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
			</ul>
		</section>

		<!-- CTA -->
		<section class="cta-box">
			<h3>Find Open Redirects in Your Code</h3>
			<p>VibeShip Scanner automatically detects unvalidated redirects in your codebase, including OAuth callback handlers and login return URLs.</p>
			<a href="https://scanner.vibeship.co" class="cta-button">Scan Your Code Free</a>
		</section>
	</article>
</div>

<style>
	.content-wrapper {
		max-width: 900px;
		margin: 0 auto;
		padding: 2rem;
	}

	.article-header {
		margin-bottom: 2rem;
	}

	.badge-row {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		margin-bottom: 1rem;
	}

	.badge {
		display: inline-block;
		padding: 0.25rem 0.75rem;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		background: var(--bg-tertiary);
		color: var(--text-secondary);
		border: 1px solid var(--border);
		text-decoration: none;
	}

	.badge-medium {
		background: var(--bg-tertiary);
		color: var(--orange);
		border-color: var(--orange);
	}

	.badge-cwe {
		background: var(--bg-tertiary);
		color: var(--blue);
		border-color: var(--blue);
	}

	.badge-cwe:hover {
		color: var(--blue);
	}

	.badge-owasp {
		background: var(--bg-tertiary);
		color: var(--green-dim);
		border-color: var(--green-dim);
	}

	.badge-owasp:hover {
		color: var(--green);
	}

	h1 {
		font-size: 2.25rem;
		margin-bottom: 0.5rem;
		line-height: 1.2;
	}

	.subtitle {
		color: var(--text-secondary);
		font-size: 1.1rem;
	}

	.quick-answer {
		background: var(--bg-secondary);
		border: 1px solid var(--orange);
		border-left-width: 4px;
		padding: 1.5rem;
		margin-bottom: 2rem;
	}

	.quick-answer-label {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		color: var(--orange);
		margin-bottom: 0.5rem;
	}

	.quick-answer-text {
		margin: 0;
		line-height: 1.6;
	}

	section {
		margin-bottom: 2.5rem;
	}

	h2 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--border);
	}

	h3 {
		font-size: 1.1rem;
		margin-bottom: 0.5rem;
		margin-top: 1.5rem;
	}

	h4 {
		font-size: 1rem;
		font-weight: 600;
		margin: 0 0 0.5rem 0;
		color: var(--text-primary);
	}

	p {
		line-height: 1.7;
		margin-bottom: 1rem;
	}

	ul {
		margin-bottom: 1rem;
		padding-left: 1.5rem;
	}

	li {
		margin-bottom: 0.5rem;
		line-height: 1.6;
	}

	a {
		color: var(--green-dim);
	}

	a:hover {
		color: var(--green);
	}

	code {
		font-family: 'Monaco', 'Menlo', monospace;
		background: var(--bg-tertiary);
		padding: 0.125rem 0.375rem;
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
		background: var(--bg-secondary);
		border: 1px solid var(--red);
		border-left-width: 3px;
	}

	.danger-item h4 {
		color: var(--red);
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
		background: var(--bg-secondary);
		padding: 1rem;
		border: 1px solid var(--border);
	}

	.pattern h4 {
		margin-bottom: 0.5rem;
	}

	.pattern code {
		display: block;
		background: var(--bg-tertiary);
		color: var(--green-dim);
		padding: 0.5rem 0.75rem;
		margin-bottom: 0.5rem;
		font-size: 0.875rem;
	}

	.pattern p {
		font-size: 0.875rem;
		color: var(--text-secondary);
		margin: 0;
	}

	/* Code Blocks */
	.code-block {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		margin: 1rem 0;
		overflow: hidden;
	}

	.code-block.vulnerable {
		border-color: var(--red);
	}

	.code-block.secure {
		border-color: var(--green-dim);
	}

	.code-label {
		background: var(--bg-tertiary);
		padding: 0.5rem 1rem;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		color: var(--text-secondary);
		border-bottom: 1px solid var(--border);
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
	}

	.code-block code {
		display: block;
		background: transparent;
		padding: 0;
		font-size: 0.85rem;
		line-height: 1.5;
	}

	.code-explanation {
		font-size: 0.875rem;
		color: var(--text-secondary);
		font-style: italic;
		margin-top: 0.5rem;
	}

	/* AI Fix Section */
	.ai-fix-section {
		background: var(--bg-secondary);
		border: 1px solid var(--green-dim);
		border-left-width: 4px;
		padding: 1.5rem;
		margin: 2rem 0;
	}

	.ai-fix-section h2 {
		border-bottom: none;
		padding-bottom: 0;
		color: var(--green-dim);
	}

	.ai-prompt .code-label {
		color: var(--green-dim);
	}

	/* FAQ Section */
	.faq-section {
		background: var(--bg-secondary);
		padding: 1.5rem;
		border: 1px solid var(--border);
	}

	.faq-list {
		margin-top: 1rem;
	}

	.faq-item {
		padding: 1rem 0;
		border-bottom: 1px solid var(--border);
	}

	.faq-item:last-child {
		border-bottom: none;
		padding-bottom: 0;
	}

	.faq-item h3 {
		margin-top: 0;
		font-size: 1rem;
	}

	.faq-item p {
		margin-bottom: 0;
		color: var(--text-secondary);
		font-size: 0.9rem;
	}

	/* Related Content */
	.related-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1rem;
	}

	.related-card {
		display: block;
		padding: 1rem;
		text-decoration: none;
	}

	.related-card:hover {
		text-decoration: none;
	}

	.related-card-category {
		font-size: 0.7rem;
		color: var(--text-tertiary);
		text-transform: uppercase;
		margin-bottom: 0.25rem;
	}

	.related-card-title {
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 0.25rem;
	}

	.related-card-description {
		font-size: 0.8rem;
		color: var(--text-secondary);
		margin: 0;
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

	/* CTA Box */
	.cta-box {
		background: var(--bg-secondary);
		border: 1px solid var(--green-dim);
		padding: 2rem;
		text-align: center;
		margin-top: 3rem;
	}

	.cta-box h3 {
		color: var(--green-dim);
		margin-top: 0;
	}

	.cta-box p {
		color: var(--text-secondary);
		max-width: 600px;
		margin: 0 auto 1.5rem auto;
	}

	.cta-button {
		display: inline-block;
		padding: 0.75rem 1.5rem;
		background: var(--green-dim);
		color: var(--bg-primary);
		font-weight: 600;
		text-decoration: none;
		transition: background 0.2s;
	}

	.cta-button:hover {
		background: var(--green);
		color: var(--bg-primary);
		text-decoration: none;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.content-wrapper {
			padding: 1rem;
		}

		h1 {
			font-size: 1.75rem;
		}
	}
</style>
