<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'HTTP Header Injection: CRLF & Response Splitting',
		description: 'HTTP header injection lets attackers split responses and poison caches by injecting CRLF sequences. Common in AI-generated redirects. Learn to sanitize header values safely.',
		url: '/kb/security/vulnerabilities/header-injection/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Header Injection' }
	];

	// Security references
	const securityData = {
		severity: 'Medium',
		cweId: 'CWE-113',
		cweSource: 'https://cwe.mitre.org/data/definitions/113.html',
		owaspCategory: 'A03:2021',
		owaspSource: 'https://owasp.org/Top10/A03_2021-Injection/'
	};

	// FAQ data for schema
	const faqs = [
		{
			question: 'What is HTTP header injection?',
			answer: 'HTTP header injection is a vulnerability where attackers inject CRLF characters (carriage return and line feed: \\r\\n) into HTTP response headers. This allows them to add malicious headers, split responses, or inject content into the response body. Classified as CWE-113, it enables cache poisoning, XSS, session fixation, and phishing attacks when user input is included in response headers without sanitization.'
		},
		{
			question: 'What is CRLF injection?',
			answer: 'CRLF injection exploits the way HTTP uses carriage return (\\r) and line feed (\\n) characters to separate headers. By injecting %0d%0a (URL-encoded CRLF), attackers can terminate one header and start another. A double CRLF (%0d%0a%0d%0a) terminates all headers and starts the response body, enabling script injection. Always strip control characters from user input before using in headers.'
		},
		{
			question: 'How does HTTP response splitting work?',
			answer: 'HTTP response splitting works by injecting two CRLF sequences (\\r\\n\\r\\n) to prematurely end the HTTP headers and start the response body. An attacker sends: /redirect?url=page%0d%0a%0d%0a<script>alert(1)</script>. The server creates a Location header that terminates early, and the script becomes part of the response body that executes in the browser.'
		},
		{
			question: 'Why are CRLF characters dangerous in HTTP headers?',
			answer: 'HTTP protocol uses CRLF (\\r\\n) to delimit headers and a double CRLF to separate headers from the body. If attackers inject these characters, they can add arbitrary headers like Set-Cookie to hijack sessions, or inject JavaScript into the response body. Modern browsers provide some protection, but server-side sanitization is still required to prevent cache poisoning and other server-side attacks.'
		},
		{
			question: 'How do I prevent header injection in Node.js?',
			answer: 'Prevent header injection in Node.js by sanitizing all user input before including in headers. Remove control characters: value.replace(/[\\x00-\\x1F\\x7F]/g, \"\"). For redirects, validate URLs against an allowlist of paths and ensure they start with \"/\". Express res.redirect() provides some sanitization, but always validate redirect URLs to prevent open redirects combined with header injection.'
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
			{"@type": "ListItem", "position": 4, "name": "Header Injection"}
		]
	}
	</script>`}

	<!-- TechArticle Schema -->
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
		"datePublished": "2025-12-18",
		"dateModified": "2025-12-18"
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
				<span class="badge badge-warning">Medium</span>
				<span class="badge">CWE-113</span>
				<span class="badge">OWASP A03:2021</span>
			</div>
			<h1>HTTP Header Injection in Vibe Coded Apps</h1>
			<p class="text-secondary">How to find and fix CRLF injection and response splitting in redirect endpoints</p>
		</header>

		<!-- Quick Answer - Under 50 words -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>HTTP header injection happens when attackers inject CRLF characters (<code>\r\n</code>) into HTTP response headers.</strong>
				This enables cache poisoning, <a href="/kb/security/vulnerabilities/xss/">XSS</a>, and session attacks.
				Classified as <a href="https://cwe.mitre.org/data/definitions/113.html">CWE-113</a>. Always sanitize user input before including in headers.
			</p>
		</div>

		<!-- Stats Box -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">#3</div>
				<div class="stat-label">OWASP Ranking</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">CWE-113</div>
				<div class="stat-label"><a href={securityData.cweSource}>CWE ID</a></div>
			</div>
			<div class="stat-box">
				<div class="stat-value">CRLF</div>
				<div class="stat-label">Attack Vector</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Medium</div>
				<div class="stat-label">Severity</div>
			</div>
		</div>
		<p class="data-source">
			Source: <a href={securityData.owaspSource}>OWASP Top 10 (2021)</a> |
			<a href={securityData.cweSource}>CWE-113</a> |
			<a href="https://portswigger.net/kb/issues/00200200_http-response-header-injection">PortSwigger</a>
		</p>

		<!-- What Is It -->
		<section class="article-section">
			<h2>What is HTTP header injection?</h2>
			<p>
				HTTP header injection is a vulnerability where attackers insert CRLF characters (carriage return <code>\r</code> and line feed <code>\n</code>) into HTTP response headers.
				Since HTTP uses these characters to separate headers, injecting them lets attackers add malicious headers or split the response entirely.
			</p>
			<p>
				Think of it like inserting fake pages into a sealed envelope by sneaking in paper clips that force it open.
				The envelope (HTTP response) has a specific structure, and CRLF injection breaks that structure to insert attacker-controlled content.
			</p>
			<p>
				According to <a href="https://owasp.org/Top10/A03_2021-Injection/">OWASP A03:2021 Injection</a>, this vulnerability enables cache poisoning, <a href="/kb/security/vulnerabilities/xss/">XSS</a>, session fixation, and phishing attacks.
				It's particularly common in vibe coded redirect endpoints where AI tools generate <code>res.redirect(req.query.returnUrl)</code> without sanitization.
			</p>
		</section>

		<!-- How CRLF Works -->
		<section class="article-section">
			<h2>How does CRLF injection enable response splitting?</h2>
			<p>
				HTTP headers follow a strict format: each header is separated by <code>\r\n</code>, and the body starts after <code>\r\n\r\n</code>.
				When attackers inject these sequences, they manipulate the response structure.
			</p>

			<div class="http-format-box">
				<h3>HTTP Response Format</h3>
				<div class="code-block">
					<pre><code>{`HTTP/1.1 302 Found\\r\\n
Location: /dashboard\\r\\n
Set-Cookie: session=abc123\\r\\n
\\r\\n
<body starts here>`}</code></pre>
				</div>
				<ul class="format-notes">
					<li><code>\r\n</code> separates each header</li>
					<li><code>\r\n\r\n</code> (double CRLF) separates headers from body</li>
					<li>Injecting these characters breaks the structure</li>
				</ul>
			</div>

			<div class="attack-example">
				<h3>Single CRLF: Header Injection</h3>
				<p>Inject one CRLF to add a new header:</p>
				<div class="code-block">
					<pre><code>{`// Attack URL:
/redirect?url=/page%0d%0aSet-Cookie:%20session=attacker

// Results in:
Location: /page\\r\\n
Set-Cookie: session=attacker\\r\\n  // INJECTED!
...rest of response`}</code></pre>
				</div>
				<p>The attacker injects a Set-Cookie header to fix the session to their value.</p>
			</div>

			<div class="attack-example">
				<h3>Double CRLF: Response Splitting</h3>
				<p>Inject two CRLFs to start the response body early:</p>
				<div class="code-block">
					<pre><code>{`// Attack URL:
/redirect?url=/page%0d%0a%0d%0a<script>alert(document.cookie)</script>

// Results in:
Location: /page\\r\\n
\\r\\n
<script>alert(document.cookie)</script>  // INJECTED BODY!`}</code></pre>
				</div>
				<p>The double CRLF terminates headers, and the script executes in the browser.</p>
			</div>
		</section>

		<!-- AI Tool Patterns -->
		<section class="article-section">
			<h2>Why do AI tools generate vulnerable header code?</h2>
			<p>
				AI tools generate header injection vulnerabilities because they prioritize working redirects over security.
				When you ask for "redirect after login," the AI generates the simplest solution.
			</p>

			<div class="tool-patterns-box">
				<h3>Common AI-generated vulnerable patterns</h3>
				<div class="code-block">
					<pre><code>{`// What Cursor typically generates (VULNERABLE)
app.get('/login', (req, res) => {
  const { username, password } = req.body
  // ... authenticate user ...

  const returnUrl = req.query.returnUrl || '/'
  res.redirect(returnUrl)  // DANGEROUS! No validation
})

// What Bolt generates for quick auth (VULNERABLE)
app.get('/callback', (req, res) => {
  const next = req.query.next || '/dashboard'
  res.redirect(next)  // DANGEROUS! Direct user input
})

// What Claude Code generates for custom headers (VULNERABLE)
app.get('/track', (req, res) => {
  const referrer = req.query.ref || 'direct'
  res.setHeader('X-Referrer', referrer)  // DANGEROUS!
  res.json({ tracked: true })
})`}</code></pre>
				</div>
			</div>

			<p><strong>Where AI creates these vulnerabilities:</strong></p>
			<ul class="reason-list">
				<li><strong>Redirect endpoints:</strong> <code>/redirect?url=...</code> patterns without URL validation</li>
				<li><strong>Login return URLs:</strong> <code>/login?returnUrl=...</code> after authentication</li>
				<li><strong>OAuth callbacks:</strong> Redirect parameters in auth flows</li>
				<li><strong>Custom headers:</strong> X-Forwarded-Host, X-Referrer from user input</li>
				<li><strong>Tracking pixels:</strong> URL/email tracking with user-controlled values</li>
			</ul>
		</section>

		<!-- Attack Scenarios -->
		<section class="article-section">
			<h2>What could happen with header injection?</h2>
			<p>
				Header injection enables several serious attacks, from session hijacking to cache poisoning that affects all users.
			</p>
			<ul class="consequences-list">
				<li>
					<strong>Cache Poisoning:</strong> Inject headers to cache a malicious response for all users.
					<a href="https://portswigger.net/research/making-http-header-injection-critical-via-response-queue-poisoning">Response queue poisoning</a> can make this critical.
				</li>
				<li>
					<strong>Session Fixation:</strong> Inject <code>Set-Cookie</code> with attacker's session ID, then log in as the victim.
				</li>
				<li>
					<strong>XSS via Response Splitting:</strong> Terminate headers early and inject JavaScript that executes in browsers.
				</li>
				<li>
					<strong>Phishing:</strong> Inject <code>Location</code> header to redirect users to phishing sites.
				</li>
				<li>
					<strong>Real-world example:</strong> Craft CMS X-Forwarded-Host injection enabled password reset email poisoning.
				</li>
			</ul>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How do I detect header injection?</h2>
			<p>
				Detect header injection by searching for code that includes user input in redirect URLs or custom headers without sanitization.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Patterns to search for</span>
				</div>
				<pre><code>{`// Direct redirect from query params (DANGEROUS)
res.redirect(req.query.returnUrl)
res.redirect(req.query.next)
redirect(searchParams.get('returnTo'))

// Custom headers from user input (DANGEROUS)
res.setHeader('X-Custom', req.query.value)
res.setHeader('Location', userProvidedUrl)

// String concatenation in headers (DANGEROUS)
'Location: ' + userInput
\`X-Referrer: \${req.query.ref}\`

// Regex patterns to find these:
// res\\.redirect\\s*\\(\\s*req\\.(query|params|body)
// res\\.setHeader\\s*\\([^,]+,\\s*req\\.(query|params|body)
// redirect\\s*\\(\\s*searchParams`}</code></pre>
			</div>

			<p><strong>Quick manual test:</strong> Send <code>%0d%0aX-Injected:%20test</code> in a redirect parameter. If the response includes <code>X-Injected: test</code> as a header, you have header injection.</p>

			<div class="cta-box">
				<p><strong>Don't want to test manually?</strong></p>
				<a href="https://scanner.vibeship.co" class="btn btn-green">
					Scan your redirect endpoints
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M5 12h14M12 5l7 7-7 7"/>
					</svg>
				</a>
			</div>
		</section>

		<!-- How to Fix -->
		<section class="article-section">
			<h2>How do I fix header injection?</h2>
			<p>
				Fix header injection by sanitizing all user input before including in headers.
				Remove control characters and validate redirect URLs against an allowlist.
			</p>

			<!-- AI Fix Prompt -->
			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>Copy this prompt into Cursor, Claude Code, or Bolt to automatically fix header injection in your codebase:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Fix all HTTP header injection vulnerabilities in my codebase.

## What to look for

Search for these vulnerable patterns:

1. Redirect from user input:
   - res.redirect(req.query.returnUrl)
   - res.redirect(req.query.next)
   - redirect(searchParams.get('returnTo'))
   - Response.redirect(url) in Next.js

2. Custom headers from user input:
   - res.setHeader('X-Custom', userInput)
   - res.setHeader('Location', untrustedValue)
   - Headers set from req.query, req.params, or req.body

3. Variables to check:
   - returnUrl, returnTo, redirectUrl, next, callback, ref, url
   - Any query parameter used in redirect() or setHeader()

4. String concatenation in headers:
   - 'Location: ' + variable
   - \`X-Header: \${value}\`

## How to fix

### CRLF Sanitization Function:
\`\`\`javascript
function sanitizeForHeader(value) {
  if (typeof value !== 'string') return ''
  // Remove ALL control characters (ASCII 0-31 and 127)
  return value.replace(/[\\x00-\\x1F\\x7F]/g, '')
}
\`\`\`

### Safe Redirect Helper:
\`\`\`javascript
const ALLOWED_PATHS = ['/', '/dashboard', '/profile', '/settings']

function safeRedirect(res, url) {
  // Remove CRLF and control characters
  const sanitized = url.replace(/[\\r\\n\\x00-\\x1F\\x7F]/g, '')

  // Must be relative path starting with /
  if (!sanitized.startsWith('/')) {
    return res.redirect('/')
  }

  // Must be in allowlist (or match pattern)
  const path = sanitized.split('?')[0]
  if (!ALLOWED_PATHS.some(p => path === p || path.startsWith(p + '/'))) {
    return res.redirect('/')
  }

  res.redirect(sanitized)
}
\`\`\`

### Apply to redirect endpoints:
\`\`\`javascript
// Before (vulnerable)
app.get('/login', (req, res) => {
  res.redirect(req.query.returnUrl || '/')
})

// After (secure)
app.get('/login', (req, res) => {
  safeRedirect(res, req.query.returnUrl || '/')
})
\`\`\`

### Fix custom headers:
\`\`\`javascript
// Before (vulnerable)
res.setHeader('X-Referrer', req.query.ref)

// After (secure)
res.setHeader('X-Referrer', sanitizeForHeader(req.query.ref))
\`\`\`

### Next.js Server Actions:
\`\`\`typescript
'use server'
import { redirect } from 'next/navigation'

function sanitizePath(path: string): string {
  return path.replace(/[\\x00-\\x1F\\x7F]/g, '')
}

const ALLOWED_PATHS = ['/dashboard', '/profile']

export async function loginAction(formData: FormData) {
  const returnTo = formData.get('returnTo') as string || '/dashboard'
  const sanitized = sanitizePath(returnTo)

  if (!sanitized.startsWith('/') || !ALLOWED_PATHS.some(p => sanitized.startsWith(p))) {
    redirect('/dashboard')
  }

  redirect(sanitized)
}
\`\`\`

## After fixing

1. Test with: ?returnUrl=/%0d%0aX-Injected:%20test
2. Verify no X-Injected header appears in response
3. Check redirect stays within allowed paths
4. List all files modified with before/after snippets

Please proceed systematically through my codebase.`}</div>
				</div>
			</div>

			<!-- Manual Fix -->
			<div class="fix-section">
				<h3>Manual Fix - Express</h3>
				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-block-header">
							<span class="code-block-lang status-bad">VULNERABLE</span>
						</div>
						<pre><code>{`// Direct redirect from query - DANGEROUS
app.get('/login', (req, res) => {
  const { username, password } = req.body
  // ... authenticate user ...

  const returnUrl = req.query.returnUrl || '/'
  res.redirect(returnUrl)  // No validation!
})

// Attack: /login?returnUrl=/%0d%0aSet-Cookie:%20session=evil
// Result: Injects Set-Cookie header`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-block-header">
							<span class="code-block-lang status-good">SECURE</span>
						</div>
						<pre><code>{`// Safe redirect with validation - SECURE
const ALLOWED_PATHS = ['/', '/dashboard', '/profile']

function safeRedirect(res, url) {
  // Remove control characters
  const sanitized = (url || '/').replace(/[\\x00-\\x1F\\x7F]/g, '')

  // Validate: relative path in allowlist
  if (!sanitized.startsWith('/')) return res.redirect('/')
  const path = sanitized.split('?')[0]
  if (!ALLOWED_PATHS.includes(path)) return res.redirect('/')

  res.redirect(sanitized)
}

app.get('/login', (req, res) => {
  // ... authenticate ...
  safeRedirect(res, req.query.returnUrl)
})`}</code></pre>
					</div>
				</div>

				<h3>Manual Fix - Next.js</h3>
				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-block-header">
							<span class="code-block-lang status-bad">VULNERABLE</span>
						</div>
						<pre><code>{`// Server action with unsanitized redirect
'use server'
import { redirect } from 'next/navigation'

export async function loginAction(formData: FormData) {
  const returnTo = formData.get('returnTo') as string
  // ... authenticate ...
  redirect(returnTo)  // No validation!
}`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-block-header">
							<span class="code-block-lang status-good">SECURE</span>
						</div>
						<pre><code>{`// Server action with sanitization - SECURE
'use server'
import { redirect } from 'next/navigation'

const ALLOWED = ['/dashboard', '/profile', '/settings']

function sanitize(path: string): string {
  return path.replace(/[\\x00-\\x1F\\x7F]/g, '')
}

export async function loginAction(formData: FormData) {
  const returnTo = formData.get('returnTo') as string || '/dashboard'
  const safe = sanitize(returnTo)

  if (!safe.startsWith('/') || !ALLOWED.some(p => safe.startsWith(p))) {
    redirect('/dashboard')
  }

  redirect(safe)
}`}</code></pre>
					</div>
				</div>

				<h3>Manual Fix - Python/Flask</h3>
				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-block-header">
							<span class="code-block-lang status-bad">VULNERABLE</span>
						</div>
						<pre><code>{`# Direct redirect from args - DANGEROUS
from flask import request, redirect

@app.route('/login', methods=['POST'])
def login():
    # ... authenticate ...
    return_url = request.args.get('returnUrl', '/')
    return redirect(return_url)  # No validation!`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-block-header">
							<span class="code-block-lang status-good">SECURE</span>
						</div>
						<pre><code>{`# Sanitized redirect - SECURE
import re
from flask import request, redirect

ALLOWED_PATHS = ['/', '/dashboard', '/profile']

def sanitize_header(value):
    if not isinstance(value, str):
        return ''
    return re.sub(r'[\\x00-\\x1F\\x7F]', '', value)

@app.route('/login', methods=['POST'])
def login():
    # ... authenticate ...
    return_url = request.args.get('returnUrl', '/')
    safe_url = sanitize_header(return_url)

    if not safe_url.startswith('/') or safe_url not in ALLOWED_PATHS:
        safe_url = '/'

    return redirect(safe_url)`}</code></pre>
					</div>
				</div>
			</div>

			<!-- Prevention Methods -->
			<div class="fix-section">
				<h3>Prevention methods by priority</h3>
				<div class="prevention-grid">
					<div class="prevention-card">
						<div class="prevention-priority">1</div>
						<h4>Strip Control Characters</h4>
						<p>Remove all ASCII control characters (0-31, 127) from user input before using in headers.</p>
						<div class="code-block mini">
							<pre><code>{`value.replace(/[\\x00-\\x1F\\x7F]/g, '')`}</code></pre>
						</div>
					</div>
					<div class="prevention-card">
						<div class="prevention-priority">2</div>
						<h4>Allowlist Redirect Paths</h4>
						<p>Only allow redirects to a predefined list of safe paths. Reject anything else.</p>
						<div class="code-block mini">
							<pre><code>{`ALLOWED_PATHS.includes(path)`}</code></pre>
						</div>
					</div>
					<div class="prevention-card">
						<div class="prevention-priority">3</div>
						<h4>Require Relative Paths</h4>
						<p>Ensure redirect URLs start with "/" to prevent <a href="/kb/security/vulnerabilities/open-redirect/">open redirects</a>.</p>
						<div class="code-block mini">
							<pre><code>{`url.startsWith('/')`}</code></pre>
						</div>
					</div>
					<div class="prevention-card">
						<div class="prevention-priority">4</div>
						<h4>Use Framework Functions</h4>
						<p>Express res.redirect() and Next.js redirect() provide some sanitization, but still validate input.</p>
						<div class="code-block mini">
							<pre><code>{`// Still validate even with framework`}</code></pre>
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
				<a href="/kb/security/vulnerabilities/open-redirect/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Open Redirect</div>
					<p class="related-card-description">Unvalidated redirects that enable phishing attacks</p>
				</a>
				<a href="/kb/security/vulnerabilities/xss/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Cross-Site Scripting (XSS)</div>
					<p class="related-card-description">Response splitting can enable XSS attacks</p>
				</a>
				<a href="/kb/security/vulnerabilities/ssrf/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Server-Side Request Forgery</div>
					<p class="related-card-description">Another vulnerability involving URL handling</p>
				</a>
				<a href="/kb/vibe-coding-tools/cursor/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Cursor Security Patterns</div>
					<p class="related-card-description">Common vulnerabilities in Cursor-generated code</p>
				</a>
				<a href="/kb/vibe-coding-tools/bolt/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Bolt Security Patterns</div>
					<p class="related-card-description">Security issues in Bolt-generated projects</p>
				</a>
				<a href="/kb/vibe-coding/secure-vibe-coding-guide/" class="card card-interactive related-card">
					<div class="related-card-category">Guide</div>
					<div class="related-card-title">Secure Vibe Coding Guide</div>
					<p class="related-card-description">Comprehensive security for AI-assisted development</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Scan your code for header injection</h2>
			<p>Check your redirect endpoints and custom headers for CRLF injection vulnerabilities.</p>
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

	/* Data Source Attribution */
	.data-source {
		font-size: 0.75rem;
		color: var(--text-tertiary);
		margin: 0.5rem 0 1.5rem;
	}

	.data-source a {
		color: var(--text-secondary);
	}

	/* HTTP Format Box */
	.http-format-box {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.http-format-box h3 {
		margin: 0 0 0.75rem;
		font-size: 1rem;
	}

	.format-notes {
		margin: 1rem 0 0;
		padding-left: 1.25rem;
	}

	.format-notes li {
		color: var(--text-secondary);
		font-size: 0.875rem;
		margin: 0.5rem 0;
	}

	.format-notes code {
		background: var(--bg-tertiary);
		padding: 0.125rem 0.375rem;
		font-size: 0.8125rem;
	}

	/* Attack Examples */
	.attack-example {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.attack-example h3 {
		margin: 0 0 0.75rem;
		font-size: 1.0625rem;
		color: var(--text-primary);
	}

	.attack-example > p {
		margin: 0 0 1rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.attack-example > p:last-of-type {
		margin-bottom: 0;
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

	/* Reason List */
	.reason-list {
		list-style: none;
		padding: 0;
		margin: 1rem 0 0;
	}

	.reason-list li {
		padding: 0.5rem 0;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.reason-list strong {
		color: var(--text-primary);
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

	.consequences-list a {
		color: var(--green);
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

	/* Prevention Grid */
	.prevention-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		margin-top: 1rem;
	}

	.prevention-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.25rem;
		position: relative;
	}

	.prevention-priority {
		position: absolute;
		top: -0.5rem;
		left: -0.5rem;
		width: 1.5rem;
		height: 1.5rem;
		background: var(--purple);
		color: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.75rem;
		font-weight: 600;
	}

	.prevention-card h4 {
		margin: 0 0 0.5rem;
		font-size: 0.9375rem;
		color: var(--text-primary);
	}

	.prevention-card p {
		margin: 0 0 0.75rem;
		font-size: 0.8125rem;
		color: var(--text-secondary);
		line-height: 1.5;
	}

	.prevention-card a {
		color: var(--green);
	}

	.code-block.mini {
		margin: 0;
	}

	.code-block.mini pre {
		padding: 0.75rem;
		font-size: 0.75rem;
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

	/* Related Grid */
	.related-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1rem;
		margin-top: 1rem;
	}

	.related-card {
		padding: 1.25rem;
	}

	.related-card-category {
		font-size: 0.75rem;
		color: var(--text-tertiary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 0.25rem;
	}

	.related-card-title {
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 0.5rem;
	}

	.related-card-description {
		font-size: 0.875rem;
		color: var(--text-secondary);
		margin: 0;
		line-height: 1.5;
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
		.prevention-grid {
			grid-template-columns: 1fr;
		}

		.related-grid {
			grid-template-columns: 1fr;
		}

		.faq-item h3 {
			font-size: 1rem;
		}
	}
</style>
