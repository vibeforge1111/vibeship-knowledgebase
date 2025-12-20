<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Insecure CORS: When origin: \'*\' Exposes Your API',
		description: 'AI tools default to origin: \'*\' for CORS - the most dangerous setting. Learn why this exposes sensitive data and how to configure CORS securely in Next.js.',
		url: '/kb/security/vulnerabilities/insecure-cors/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Insecure CORS' }
	];

	// Real external data sources
	const owaspData = {
		category: 'A05:2021 - Security Misconfiguration',
		source: 'https://owasp.org/Top10/A05_2021-Security_Misconfiguration/',
		cweId: 'CWE-942',
		cweSource: 'https://cwe.mitre.org/data/definitions/942.html'
	};

	// Common CORS misconfigurations
	const patterns = [
		{
			name: 'Wildcard Origin',
			severity: 'High',
			description: 'Setting Access-Control-Allow-Origin: * allows ANY website to read your API responses. AI tools generate this because it immediately fixes CORS errors.',
			vulnerableCode: `// VULNERABLE: AI generates this when you say "enable CORS"
// Express
import cors from 'cors'
app.use(cors()) // Defaults to origin: '*'

// Or explicitly
app.use(cors({
  origin: '*', // ANY website can access your API!
}))

// Next.js API route
export async function GET(request: Request) {
  return new Response(JSON.stringify({ secret: 'data' }), {
    headers: {
      'Access-Control-Allow-Origin': '*', // DANGEROUS
    },
  })
}`,
			secureCode: `// SECURE: Whitelist specific origins
const allowedOrigins = [
  'https://myapp.com',
  'https://app.myapp.com',
  process.env.NODE_ENV === 'development' && 'http://localhost:3000',
].filter(Boolean)

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin)) {
      callback(null, origin)
    } else {
      callback(new Error('CORS not allowed'))
    }
  },
  credentials: true,
}))`,
			link: '/kb/security/vulnerabilities/xss/',
			cweLink: 'https://cwe.mitre.org/data/definitions/942.html'
		},
		{
			name: 'Origin Reflection',
			severity: 'Critical',
			description: 'Reflecting the Origin header back is as dangerous as wildcard, but bypasses the browser restriction against wildcard + credentials. Attacker site sends their origin, server reflects it, attack succeeds.',
			vulnerableCode: `// VULNERABLE: Reflecting Origin header is just as dangerous
app.use(cors({
  origin: (origin, callback) => {
    // This reflects ANY origin - same as wildcard!
    callback(null, origin)
  },
  credentials: true,
}))

// Or in Next.js
export async function GET(request: Request) {
  const origin = request.headers.get('origin')
  return new Response(JSON.stringify({ data: 'sensitive' }), {
    headers: {
      'Access-Control-Allow-Origin': origin || '*', // DANGEROUS
      'Access-Control-Allow-Credentials': 'true',
    },
  })
}`,
			secureCode: `// SECURE: Validate origin against whitelist before reflecting
const allowedOrigins = ['https://myapp.com', 'https://app.myapp.com']

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin)) {
      callback(null, origin) // Only reflect TRUSTED origins
    } else {
      callback(new Error('Not allowed'))
    }
  },
  credentials: true,
}))`,
			link: '/kb/security/vulnerabilities/missing-auth/',
			cweLink: 'https://portswigger.net/kb/issues/00200601_cross-origin-resource-sharing-arbitrary-origin-trusted'
		},
		{
			name: 'Weak Regex Validation',
			severity: 'High',
			description: 'Using regex to validate origins without proper anchoring allows attackers to bypass validation. The pattern "example.com" matches "evilexample.com" and "example.com.evil.com".',
			vulnerableCode: `// VULNERABLE: Regex without proper anchoring
const allowedPattern = /example\\.com/

app.use(cors({
  origin: (origin, callback) => {
    if (allowedPattern.test(origin)) {
      callback(null, origin) // DANGEROUS!
    } else {
      callback(new Error('Not allowed'))
    }
  },
}))

// Attacker uses: https://evilexample.com - matches!
// Attacker uses: https://example.com.evil.com - matches!`,
			secureCode: `// SECURE: Use exact string matching or properly anchored regex
const allowedOrigins = ['https://example.com', 'https://app.example.com']

// BEST: Exact string matching
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin || true)
    } else {
      callback(new Error('Not allowed'))
    }
  },
}))

// OR: Properly anchored regex
const safePattern = /^https:\\/\\/(app\\.)?example\\.com$/
// ^ = start, $ = end, \\. = literal dot`,
			link: '/kb/security/vulnerabilities/sql-injection/',
			cweLink: 'https://cwe.mitre.org/data/definitions/942.html'
		},
		{
			name: 'Null Origin Trust',
			severity: 'Medium',
			description: 'Accepting null as a valid origin is exploitable. Attackers can trigger null origin using sandboxed iframes. Many vibe coded APIs accept null "just in case".',
			vulnerableCode: `// VULNERABLE: Trusting null origin
app.use(cors({
  origin: (origin, callback) => {
    // "null" can be triggered by attackers via sandboxed iframes
    if (!origin || origin === 'null') {
      callback(null, true) // DANGEROUS
    } else if (allowedOrigins.includes(origin)) {
      callback(null, origin)
    }
  },
}))

// Attacker page:
// <iframe sandbox="allow-scripts" src="https://your-api.com/data">
// This sends Origin: null`,
			secureCode: `// SECURE: Don't accept null origin
app.use(cors({
  origin: (origin, callback) => {
    // Reject null origin - only accept known origins
    if (origin && allowedOrigins.includes(origin)) {
      callback(null, origin)
    } else if (!origin) {
      // No origin = same-origin request or non-browser client
      // This is safe because there's no cross-origin context
      callback(null, true)
    } else {
      callback(new Error('Not allowed'))
    }
  },
}))`,
			link: '/kb/security/vulnerabilities/xss/',
			cweLink: 'https://portswigger.net/web-security/cors'
		},
		{
			name: 'Missing Preflight Handling',
			severity: 'Medium',
			description: 'Forgetting to handle OPTIONS preflight requests causes CORS to fail for non-simple requests. AI tools often generate incomplete CORS that works for GET but fails for POST with JSON.',
			vulnerableCode: `// VULNERABLE: Missing OPTIONS handler
// Next.js API route - only handles GET/POST
export async function GET(request: Request) {
  return corsResponse({ data: 'works' })
}

export async function POST(request: Request) {
  // POST with JSON triggers preflight
  // But OPTIONS is not handled - CORS fails!
  const body = await request.json()
  return corsResponse({ result: 'saved' })
}

// Browser sends OPTIONS first, gets 405 Method Not Allowed`,
			secureCode: `// SECURE: Handle OPTIONS preflight explicitly
export async function OPTIONS(request: Request) {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': 'https://myapp.com',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400', // Cache preflight 24 hours
    },
  })
}

export async function POST(request: Request) {
  const body = await request.json()
  return new Response(JSON.stringify({ result: 'saved' }), {
    headers: {
      'Access-Control-Allow-Origin': 'https://myapp.com',
      'Content-Type': 'application/json',
    },
  })
}`,
			link: '/kb/security/stacks/nextjs-supabase/',
			cweLink: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS'
		}
	];

	// AI Fix Prompt
	const aiFixPrompt = `Review my codebase for CORS security issues and fix them:

1. **Audit CORS Configuration**
   - Search for "Access-Control-Allow-Origin" header settings
   - Search for cors() middleware usage and configuration
   - Find any origin: '*' or origin: true patterns
   - Check for origin reflection (using request.headers.origin directly in response)

2. **Check for Wildcard Origin**
   - Replace origin: '*' with explicit whitelist of allowed origins
   - Never use wildcard with credentials: true (browsers block this anyway)
   - Exception: Wildcard IS okay for truly public, read-only APIs with no auth

3. **Check for Origin Reflection**
   - Find patterns where Origin header is echoed back without validation
   - Replace with whitelist validation before reflecting origin
   - This is especially dangerous with credentials: true

4. **Validate Regex Patterns**
   - Check any regex used for origin validation
   - Ensure regex has ^ (start) and $ (end) anchors
   - Test that "example.com" doesn't match "evilexample.com"
   - Prefer exact string matching over regex when possible

5. **Check Null Origin Handling**
   - Don't explicitly accept "null" as a valid origin
   - Null origin can be triggered by attackers via sandboxed iframes
   - Treat null origin same as unknown origin (reject for authenticated APIs)

6. **Verify Preflight Handling**
   - Ensure OPTIONS requests are handled for all API routes
   - Return proper CORS headers in preflight response
   - Set Access-Control-Max-Age to cache preflight (e.g., 86400 for 24h)

7. **Framework-Specific Checks**
   - Next.js: Check next.config.js headers AND middleware.ts
   - Express: Check cors() package configuration
   - Check that all API routes apply CORS consistently

8. **Environment-Specific Origins**
   - Use environment variables for allowed origins
   - Include localhost only in development mode
   - Don't hardcode production URLs in code

Here's the secure pattern to implement:

\`\`\`typescript
// Secure CORS whitelist implementation
const allowedOrigins = [
  process.env.FRONTEND_URL, // e.g., 'https://myapp.com'
  process.env.NODE_ENV === 'development' && 'http://localhost:3000',
].filter(Boolean) as string[]

function validateOrigin(origin: string | null): string | null {
  if (!origin) return null // Same-origin or non-browser
  if (allowedOrigins.includes(origin)) return origin
  return null // Reject unknown origins
}
\`\`\`

**Test your fixes:**
\`\`\`bash
# Test wildcard (should fail for authenticated APIs)
curl -H "Origin: https://evil.com" https://your-api.com/protected

# Test preflight
curl -X OPTIONS -H "Origin: https://your-app.com" \\
  -H "Access-Control-Request-Method: POST" \\
  https://your-api.com/endpoint

# Verify response headers
# Should see Access-Control-Allow-Origin: https://your-app.com
# NOT Access-Control-Allow-Origin: *
\`\`\``;

	// FAQ data for schema
	const faqs = [
		{
			question: 'Is Access-Control-Allow-Origin: * dangerous?',
			answer: 'Yes, for APIs that handle sensitive data or require authentication. Wildcard (*) allows ANY website to read your API responses. If your API returns user data, attackers can create a malicious page that steals it. However, wildcard IS acceptable for truly public APIs that have no authentication and return only public data.'
		},
		{
			question: 'Can I use CORS with credentials and wildcard origin?',
			answer: 'No. Browsers explicitly block this combination - it\'s not allowed by the CORS specification. If you set Access-Control-Allow-Credentials: true, you cannot use wildcard (*) for Access-Control-Allow-Origin. This is why attackers use origin reflection attacks as a workaround.'
		},
		{
			question: 'How do I fix CORS errors securely?',
			answer: 'Instead of using origin: \'*\', create a whitelist of allowed origins and check incoming requests against it. Only reflect the Origin header back if it matches your whitelist. For development, add localhost to the whitelist conditionally. Use environment variables for production origins.'
		},
		{
			question: 'What is CORS origin reflection vulnerability?',
			answer: 'Origin reflection is when your server echoes back whatever Origin header the browser sends, without checking if it\'s trusted. This is as dangerous as wildcard because attackers can send their malicious origin, get it reflected back, and bypass CORS protection. According to PortSwigger, this is one of the most common CORS misconfigurations.'
		},
		{
			question: 'How do I configure CORS in Next.js?',
			answer: 'Next.js offers two approaches: use next.config.js headers for static CORS settings, or use middleware.ts for dynamic origin validation. For APIs that need to support multiple origins or credentials, middleware is more flexible. Always handle OPTIONS preflight requests explicitly in your route handlers.'
		}
	];

	let copied = $state(false);

	function copyPrompt() {
		navigator.clipboard.writeText(aiFixPrompt);
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
			{"@type": "ListItem", "position": 4, "name": "Insecure CORS"}
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
		"datePublished": "2024-12-17",
		"dateModified": "2024-12-17"
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
		<!-- Article Header -->
		<header class="article-header">
			<div class="badge badge-warning">Medium-High Severity</div>
			<h1>Insecure CORS: When <code>origin: '*'</code> Exposes Your API</h1>
			<p class="subtitle">The "fix CORS errors" prompt creates the most permissive - and dangerous - configuration</p>
		</header>

		<!-- Quick Answer Box -->
		<div class="quick-answer">
			<h2>Quick Answer</h2>
			<p>
				<strong>CORS controls which websites can access your API.</strong> Setting <code>Access-Control-Allow-Origin: *</code> allows ANY website to read your API responses - including attacker sites. AI tools use this because it "fixes" CORS errors. Always whitelist specific origins instead. Classified as <a href={owaspData.source}>#5 Security Misconfiguration</a> in OWASP Top 10.
			</p>
		</div>

		<!-- OWASP/CWE Reference -->
		<section class="article-section">
			<h3>Security Classification</h3>
			<div class="stats-row">
				<div class="stat-card">
					<span class="stat-label">OWASP</span>
					<a href={owaspData.source} target="_blank" rel="noopener">{owaspData.category}</a>
				</div>
				<div class="stat-card">
					<span class="stat-label">CWE</span>
					<a href={owaspData.cweSource} target="_blank" rel="noopener">{owaspData.cweId}</a>
				</div>
			</div>
		</section>

		<!-- What is CORS -->
		<section class="article-section" id="what-is-cors">
			<h2>What is CORS?</h2>
			<p>
				Cross-Origin Resource Sharing (CORS) is browser security that controls which websites can access your API. Think of it like a VIP list for your backend - only websites you approve can read responses from your API endpoints.
			</p>
			<p>
				Browsers enforce the <a href="https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy">Same-Origin Policy</a> by default, blocking cross-site requests. CORS headers tell browsers to make exceptions for trusted origins. The problem starts when vibe coders tell AI tools to "fix CORS errors" - the AI responds with <code>origin: '*'</code>, which lets everyone in.
			</p>
			<p>
				According to <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS">MDN's CORS documentation</a>, the <code>Access-Control-Allow-Origin</code> header must specify either a single origin or the <code>*</code> wildcard. The wildcard means your API is effectively public to any website on the internet.
			</p>
		</section>

		<!-- Why AI Tools Generate This -->
		<section class="article-section" id="ai-tools">
			<h2>How Do AI Tools Generate Insecure CORS?</h2>
			<p>
				When vibe coding, the typical pattern is: you build a frontend, try to call your API, and get a CORS error. You ask the AI to "fix CORS" or "enable CORS", and it immediately generates <code>origin: '*'</code> because that makes the error disappear.
			</p>
			<p>
				Insecure CORS defaults are commonly found in AI-generated code. The AI optimizes for "working code" without considering that wildcard CORS + authenticated APIs = anyone can steal your users' data. See our <a href="/kb/vibe-coding-tools/claude-code/">Claude Code security patterns</a> guide for more details.
			</p>
			<p>
				This is part of <a href="https://owasp.org/Top10/A05_2021-Security_Misconfiguration/">OWASP's Security Misconfiguration</a> category - insecure defaults that "work" but create vulnerabilities.
			</p>
		</section>

		<!-- Common Patterns -->
		<section class="article-section" id="patterns">
			<h2>What Are the Common CORS Misconfigurations?</h2>
			<p>
				<a href="https://portswigger.net/web-security/cors">PortSwigger's CORS research</a> documents several misconfiguration patterns, all of which appear in vibe coded applications:
			</p>

			<div class="patterns-list">
				{#each patterns as pattern}
					<div class="pattern-card">
						<div class="pattern-header">
							<h3>{pattern.name}</h3>
							<span class="badge badge-{pattern.severity.toLowerCase()}">{pattern.severity}</span>
						</div>
						<p class="pattern-description">{pattern.description}</p>

						<div class="code-comparison">
							<div class="code-block vulnerable">
								<div class="code-label">Vulnerable</div>
								<pre><code>{pattern.vulnerableCode}</code></pre>
							</div>
							<div class="code-block secure">
								<div class="code-label">Secure</div>
								<pre><code>{pattern.secureCode}</code></pre>
							</div>
						</div>

						<div class="pattern-links">
							<a href={pattern.cweLink} target="_blank" rel="noopener">Reference</a>
							<a href={pattern.link}>Related vulnerability</a>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- Next.js Specific -->
		<section class="article-section" id="nextjs">
			<h2>How Do I Configure CORS Securely in Next.js?</h2>
			<p>
				Next.js offers two approaches for CORS configuration. For simple cases with a single allowed origin, use <a href="https://nextjs.org/docs/pages/api-reference/config/next-config-js/headers">next.config.js headers</a>:
			</p>

			<div class="code-block">
				<div class="code-label">next.config.js - Static CORS</div>
				<pre><code>{`// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://myapp.com', // Specific origin, not *
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ]
  },
}`}</code></pre>
			</div>

			<p>
				For dynamic origin validation (multiple allowed origins or credentials), use middleware:
			</p>

			<div class="code-block">
				<div class="code-label">middleware.ts - Dynamic CORS</div>
				<pre><code>{`// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const allowedOrigins = [
  'https://myapp.com',
  'https://app.myapp.com',
  process.env.NODE_ENV === 'development' && 'http://localhost:3000',
].filter(Boolean) as string[]

export function middleware(request: NextRequest) {
  const origin = request.headers.get('origin')
  const response = NextResponse.next()

  // Handle preflight
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': allowedOrigins.includes(origin || '')
          ? origin!
          : allowedOrigins[0],
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Max-Age': '86400',
      },
    })
  }

  // Validate and set origin for actual requests
  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin)
    response.headers.set('Access-Control-Allow-Credentials', 'true')
  }

  return response
}

export const config = {
  matcher: '/api/:path*',
}`}</code></pre>
			</div>
		</section>

		<!-- When Wildcard is OK -->
		<section class="article-section" id="when-ok">
			<h2>When Is Wildcard CORS Actually OK?</h2>
			<p>
				Wildcard (<code>*</code>) IS acceptable in specific situations. Use it only when ALL of these are true:
			</p>
			<ul class="checklist">
				<li>API returns only public data (no user-specific information)</li>
				<li>No authentication or session cookies required</li>
				<li>Read-only operations (GET requests only)</li>
				<li>No sensitive business logic exposed</li>
			</ul>
			<p>
				Examples where wildcard is fine: public status endpoints, public CDN resources, open APIs like weather data. If you're building an authenticated app with user data, wildcard is never appropriate.
			</p>
		</section>

		<!-- Testing Section -->
		<section class="article-section" id="testing">
			<h2>How Do I Test My CORS Configuration?</h2>
			<p>
				According to <a href="https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/11-Client-side_Testing/07-Testing_Cross_Origin_Resource_Sharing">OWASP's CORS testing guide</a>, you should test both what's allowed and what's rejected:
			</p>

			<div class="code-block">
				<div class="code-label">Testing Commands</div>
				<pre><code>{`# Test with malicious origin (should be rejected)
curl -i -H "Origin: https://evil.com" https://your-api.com/api/protected
# Look for: NO Access-Control-Allow-Origin header, or 403

# Test with allowed origin (should work)
curl -i -H "Origin: https://your-app.com" https://your-api.com/api/protected
# Look for: Access-Control-Allow-Origin: https://your-app.com

# Test preflight request
curl -X OPTIONS -i \\
  -H "Origin: https://your-app.com" \\
  -H "Access-Control-Request-Method: POST" \\
  -H "Access-Control-Request-Headers: Content-Type" \\
  https://your-api.com/api/data
# Look for: 204 status, proper CORS headers

# Test null origin (should be rejected for auth APIs)
curl -i -H "Origin: null" https://your-api.com/api/protected
# Look for: NO Access-Control-Allow-Origin header`}</code></pre>
			</div>
			<p>
				Remember: CORS is browser-enforced. Tools like curl and Postman ignore CORS entirely, so your API "working" in Postman doesn't mean CORS is configured correctly.
			</p>
		</section>

		<!-- AI Fix Prompt -->
		<section class="article-section" id="ai-fix">
			<h2>AI Fix Prompt for CORS Security</h2>
			<p>Copy this prompt to your AI coding tool to audit and fix CORS misconfigurations:</p>

			<div class="fix-prompt">
				<button class="copy-btn" onclick={copyPrompt}>
					{copied ? 'Copied!' : 'Copy Prompt'}
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
				<a href="/kb/security/vulnerabilities/xss/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Cross-Site Scripting (XSS)</div>
					<p class="related-card-description">CORS misconfiguration combined with XSS in trusted subdomains enables attacks</p>
				</a>
				<a href="/kb/security/vulnerabilities/hardcoded-secrets/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Hardcoded Secrets</div>
					<p class="related-card-description">Exposed API keys combined with CORS issues leak to attackers</p>
				</a>
				<a href="/kb/security/vulnerabilities/missing-auth/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Missing Authentication</div>
					<p class="related-card-description">CORS without auth means anyone can access your API anyway</p>
				</a>
				<a href="/kb/vibe-coding-tools/cursor/" class="card card-interactive related-card">
					<div class="related-card-category">Tool</div>
					<div class="related-card-title">Cursor Security Patterns</div>
					<p class="related-card-description">How Cursor generates CORS configurations and common pitfalls</p>
				</a>
				<a href="/kb/vibe-coding-tools/bolt/" class="card card-interactive related-card">
					<div class="related-card-category">Tool</div>
					<div class="related-card-title">Bolt.new Security Patterns</div>
					<p class="related-card-description">CORS defaults in Bolt-generated full-stack applications</p>
				</a>
				<a href="/kb/security/stacks/nextjs-supabase/" class="card card-interactive related-card">
					<div class="related-card-category">Stack</div>
					<div class="related-card-title">Next.js + Supabase Security</div>
					<p class="related-card-description">CORS configuration in the context of Supabase APIs</p>
				</a>
			</div>
		</section>

		<!-- CTA -->
		<div class="cta-box">
			<h2>Scan Your Vibe Coded App for CORS Issues</h2>
			<p>VibeShip Scanner detects insecure CORS configurations, origin reflection vulnerabilities, and missing preflight handlers in your codebase.</p>
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

	.article-header h1 code {
		background: var(--bg-tertiary);
		padding: 0.125rem 0.5rem;
		font-size: 0.9em;
	}

	.subtitle {
		color: var(--text-secondary);
		font-size: 1.125rem;
		margin: 0;
	}

	.badge-warning {
		background: var(--bg-tertiary);
		color: var(--orange);
		border: 1px solid var(--orange);
	}

	.badge-critical {
		background: var(--bg-tertiary);
		color: var(--red);
		border: 1px solid var(--red);
	}

	.badge-high {
		background: var(--bg-tertiary);
		color: var(--orange);
		border: 1px solid var(--orange);
	}

	.badge-medium {
		background: var(--bg-tertiary);
		color: var(--blue);
		border: 1px solid var(--blue);
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
		margin-bottom: 0.75rem;
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

	.article-section code {
		background: var(--bg-tertiary);
		padding: 0.125rem 0.375rem;
		font-size: 0.9em;
	}

	.stats-row {
		display: flex;
		gap: 1.5rem;
		flex-wrap: wrap;
	}

	.stat-card {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.stat-label {
		font-size: 0.75rem;
		color: var(--text-tertiary);
		text-transform: uppercase;
	}

	.stat-card a {
		color: var(--green-dim);
	}

	.stat-card a:hover {
		color: var(--green);
	}

	.patterns-list {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		margin-top: 1.5rem;
	}

	.pattern-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
	}

	.pattern-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.pattern-header h3 {
		font-size: 1.125rem;
		font-weight: 600;
		margin: 0;
	}

	.pattern-description {
		color: var(--text-secondary);
		margin-bottom: 1.5rem;
		line-height: 1.6;
	}

	.code-comparison {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.code-block {
		background: var(--bg-tertiary);
		border: 1px solid var(--border);
		overflow: hidden;
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
		background: var(--bg-secondary);
		color: var(--text-secondary);
	}

	.vulnerable .code-label {
		color: var(--red);
	}

	.secure .code-label {
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
		background: none;
		padding: 0;
	}

	.pattern-links {
		display: flex;
		gap: 1.5rem;
		font-size: 0.875rem;
	}

	.pattern-links a {
		color: var(--green-dim);
	}

	.pattern-links a:hover {
		color: var(--green);
	}

	.checklist {
		list-style: none;
		padding: 0;
		margin: 1rem 0;
	}

	.checklist li {
		padding: 0.5rem 0 0.5rem 1.75rem;
		position: relative;
		color: var(--text-secondary);
	}

	.checklist li::before {
		content: '';
		position: absolute;
		left: 0;
		color: var(--green-dim);
		font-weight: 600;
	}

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
	}

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
		margin-bottom: 0.5rem;
		color: var(--text-primary);
	}

	.faq-item p {
		margin: 0;
		color: var(--text-secondary);
		line-height: 1.6;
	}

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

		.pattern-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.5rem;
		}

		.stats-row {
			flex-direction: column;
			gap: 1rem;
		}
	}
</style>
