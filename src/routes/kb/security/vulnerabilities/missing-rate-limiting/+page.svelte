<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Missing Rate Limiting: Why AI Forgets This Critical Security',
		description: 'AI tools never add rate limiting. Learn why this leaves your login and API endpoints open to brute force attacks. Copy-paste fixes for Next.js and Express.',
		url: '/kb/security/vulnerabilities/missing-rate-limiting/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Missing Rate Limiting' }
	];

	// Real external data sources
	const owaspData = {
		ranking: 'API4:2023',
		category: 'Unrestricted Resource Consumption',
		source: 'https://owasp.org/API-Security/editions/2023/en/0xa4-unrestricted-resource-consumption/',
		cweId: 'CWE-799',
		cweSource: 'https://cwe.mitre.org/data/definitions/799.html',
		owaspTopTen: 'A04:2021',
		owaspTopTenSource: 'https://owasp.org/Top10/A04_2021-Insecure_Design/'
	};

	// FAQ data for schema
	const faqs = [
		{
			question: 'What happens without rate limiting?',
			answer: 'Without rate limiting, attackers can make unlimited requests to your API. On login endpoints, this means trying millions of passwords per second. According to Snyk, brute force attacks can test "hundreds of millions" of passwords without rate limiting. Your server also becomes vulnerable to denial-of-service attacks.'
		},
		{
			question: 'How do I add rate limiting to Next.js?',
			answer: 'For Next.js App Router, use middleware with Upstash Rate Limit for serverless-friendly limiting that persists across function instances. For Pages Router, use express-rate-limit but define the limiter OUTSIDE the handler function. Otherwise, each request creates a fresh limiter with no memory of previous requests.'
		},
		{
			question: 'Is rate limiting enough to prevent brute force attacks?',
			answer: 'No, rate limiting alone is not enough. OWASP recommends combining rate limiting with CAPTCHA after failed attempts, account lockout policies, exponential backoff, and multi-factor authentication. Rate limiting slows attacks; these additional measures stop automated attacks entirely.'
		},
		{
			question: 'What is a good rate limit for login endpoints?',
			answer: 'For login endpoints, 5 attempts per 15 minutes is a common starting point. This allows legitimate users who mistype passwords while making brute force attacks impractical. Adjust based on your user base - corporate networks with shared IPs may need higher limits with additional verification like CAPTCHA.'
		},
		{
			question: 'Does Vercel have built-in rate limiting?',
			answer: 'Vercel does not have built-in rate limiting for your API routes. Since Vercel functions are serverless and stateless, you need an external store like Upstash Redis to track request counts across function instances. The Upstash Rate Limit SDK is designed specifically for this use case.'
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
			{"@type": "ListItem", "position": 4, "name": "Missing Rate Limiting"}
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
				<span class="badge badge-medium">Medium</span>
				<span class="badge">CWE-799</span>
				<span class="badge">OWASP A04:2021</span>
			</div>
			<h1>Missing Rate Limiting in Vibe Coded Apps</h1>
			<p class="text-secondary">Why AI tools never add rate limiting and how to protect your login endpoints from brute force attacks</p>
		</header>

		<!-- Quick Answer - MUST be under 50 words -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Rate limiting caps how many requests a user can make in a timeframe.</strong>
				Without it, attackers can try millions of passwords per second on your login page. AI tools never add rate limiting because it is not required for code to "work."
			</p>
		</div>

		<!-- Stats Box - Real OWASP Data -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">{owaspData.ranking}</div>
				<div class="stat-label">OWASP API Risk</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">{owaspData.cweId}</div>
				<div class="stat-label"><a href={owaspData.cweSource}>CWE ID</a></div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Millions/sec</div>
				<div class="stat-label">Attack Speed</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Medium</div>
				<div class="stat-label">Severity</div>
			</div>
		</div>
		<p class="data-source">
			Sources: <a href={owaspData.source}>OWASP API Security 2023</a>, <a href={owaspData.owaspTopTenSource}>OWASP Top 10 (2021)</a>
		</p>

		<!-- What Is It -->
		<section class="article-section">
			<h2>What is rate limiting?</h2>
			<p>
				Rate limiting is a security control that restricts how many requests a user or IP address can make to your API within a specific timeframe. Think of it like a bouncer at a club who only lets five people in per minute - even if a crowd rushes the door, the flow stays controlled.
			</p>
			<p>
				Without rate limiting, your API endpoints are completely open. According to <a href="https://learn.snyk.io/lesson/no-rate-limiting/">Snyk Learn</a>, brute force attacks can test "tens of thousands of passwords per second, all the way up to hundreds of millions" against unprotected login endpoints.
			</p>
			<p>
				This vulnerability is classified as <a href="https://cwe.mitre.org/data/definitions/799.html">CWE-799: Improper Control of Interaction Frequency</a> and appears in <a href="https://owasp.org/API-Security/editions/2023/en/0xa4-unrestricted-resource-consumption/">OWASP API Security Top 10</a> as API4:2023 (Unrestricted Resource Consumption). For vibe coders using AI tools, this is especially critical because AI never adds rate limiting unless you explicitly ask for it.
			</p>
		</section>

		<!-- The Brute Force Attack Scenario -->
		<section class="article-section">
			<h2>How do attackers exploit missing rate limiting?</h2>
			<p>
				Attackers exploit missing rate limiting through brute force attacks, credential stuffing, and denial of service. Without limits, your server will happily process every single request.
			</p>

			<div class="attack-scenario">
				<h3>The brute force attack</h3>
				<ol>
					<li><strong>Attacker finds your login endpoint</strong> - usually <code>/api/auth/login</code> or similar</li>
					<li><strong>Runs automated script</strong> - tries common passwords against known usernames</li>
					<li><strong>Millions of attempts per hour</strong> - without rate limiting, nothing stops them</li>
					<li><strong>Eventually succeeds</strong> - weak passwords fall quickly to dictionary attacks</li>
				</ol>
				<p class="attack-note">
					With rate limiting at 5 attempts per 15 minutes, this attack would take years. Without it, it takes hours or minutes.
				</p>
			</div>

			<p>
				According to <a href="https://owasp.org/www-community/controls/Blocking_Brute_Force_Attacks">OWASP</a>, brute force attacks remain one of the most common attack vectors because they work. The solution is defense in depth: rate limiting combined with CAPTCHA, account lockout, and multi-factor authentication.
			</p>
		</section>

		<!-- Where Rate Limiting Matters -->
		<section class="article-section">
			<h2>Where does rate limiting matter most?</h2>
			<p>
				Rate limiting is critical on any endpoint that could be abused through repeated requests. Some endpoints need strict limits while others can be more permissive.
			</p>

			<div class="priority-list">
				<div class="priority-item critical">
					<span class="priority-label">Critical</span>
					<div class="priority-content">
						<strong>Login endpoints</strong> - brute force password attacks
					</div>
				</div>
				<div class="priority-item critical">
					<span class="priority-label">Critical</span>
					<div class="priority-content">
						<strong>Password reset</strong> - account takeover via email flooding
					</div>
				</div>
				<div class="priority-item critical">
					<span class="priority-label">Critical</span>
					<div class="priority-content">
						<strong>Registration</strong> - spam account creation
					</div>
				</div>
				<div class="priority-item high">
					<span class="priority-label">High</span>
					<div class="priority-content">
						<strong>API endpoints</strong> - resource exhaustion, cost attacks
					</div>
				</div>
				<div class="priority-item high">
					<span class="priority-label">High</span>
					<div class="priority-content">
						<strong>File uploads</strong> - storage exhaustion
					</div>
				</div>
				<div class="priority-item medium">
					<span class="priority-label">Medium</span>
					<div class="priority-content">
						<strong>Search/filtering</strong> - database load attacks
					</div>
				</div>
			</div>
		</section>

		<!-- AI Tool Patterns -->
		<section class="article-section">
			<h2>How do AI tools create vulnerable code?</h2>
			<p>
				AI tools create vulnerable code because rate limiting is not required for functionality. When you ask for a login endpoint, AI generates code that authenticates users - that is the complete request. Security features like rate limiting are "extra."
			</p>

			<div class="tool-patterns-box">
				<h3>Common AI-generated vulnerable pattern</h3>
				<p>When you ask vibe coding tools like <a href="/kb/ai-patterns/cursor/">Cursor</a>, <a href="/kb/ai-patterns/bolt/">Bolt</a>, or <a href="/kb/ai-patterns/claude-code/">Claude Code</a> for a login endpoint, they generate this:</p>
				<div class="code-block">
					<pre><code>{`// AI-generated login - no rate limiting
// app/api/auth/login/route.ts
import { NextResponse } from 'next/server'
import { verifyCredentials } from '@/lib/auth'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  // Attacker can call this endpoint millions of times!
  const user = await verifyCredentials(email, password)

  if (!user) {
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    )
  }

  return NextResponse.json({ user })
}`}</code></pre>
				</div>
				<p class="pattern-note">
					This code <em>works perfectly</em> for legitimate users. But there is nothing stopping an attacker from calling it millions of times per second with different passwords.
				</p>
			</div>

			<p>
				<strong>Why this happens:</strong> AI tools are trained to fulfill your request efficiently. When vibe coding and you ask for "a login API," it builds exactly that. Rate limiting is a security concern that requires explicit prompting: "Add rate limiting to prevent brute force attacks."
			</p>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How do I detect missing rate limiting?</h2>
			<p>
				Detect missing rate limiting by reviewing your authentication endpoints and checking for rate limit middleware. Routes without <code>rateLimit</code> imports or middleware are vulnerable.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Red flags to look for</span>
				</div>
				<pre><code>{`// Check these files for rate limiting:
// - app/api/auth/*/route.ts (Next.js App Router)
// - pages/api/auth/*.ts (Next.js Pages Router)
// - routes/auth.ts (Express)
// - middleware.ts (global middleware)

// Red flags:
// 1. No "rateLimit" or "Ratelimit" imports
// 2. No middleware wrapping auth routes
// 3. Direct database/auth calls without limits

// Quick test: Can you call the endpoint 100 times in 1 second?
// If yes, you need rate limiting.

for (let i = 0; i < 100; i++) {
  fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: 'test@test.com', password: 'wrong' })
  })
}
// If all 100 requests complete, you're vulnerable`}</code></pre>
			</div>

			<div class="cta-box">
				<p><strong>Scan your endpoints automatically</strong></p>
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
			<h2>How do I add rate limiting?</h2>
			<p>
				Add rate limiting using middleware that tracks request counts per IP address or user. The approach differs between traditional servers and serverless environments.
			</p>

			<!-- AI Fix Prompt -->
			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>Copy this prompt into Cursor, Claude Code, or Bolt to automatically add rate limiting to your endpoints:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Add rate limiting to all authentication and sensitive API endpoints in my codebase.

## What to look for

Search for endpoints that need rate limiting:

1. Authentication endpoints:
   - app/api/auth/**/route.ts (Next.js App Router)
   - pages/api/auth/*.ts (Next.js Pages Router)
   - Login, register, password reset, magic link routes

2. Sensitive API endpoints:
   - Any route that modifies data
   - Search or filter endpoints (database load)
   - File upload endpoints

3. Check for existing rate limiting:
   - Look for "rateLimit" or "Ratelimit" imports
   - Check middleware.ts for global rate limiting

## How to fix

### For Next.js App Router (Serverless - use Upstash):

\`\`\`typescript
// middleware.ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '15 m'), // 5 requests per 15 minutes
  analytics: true,
})

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/auth')) {
    const ip = request.ip ?? request.headers.get('x-forwarded-for') ?? '127.0.0.1'
    const { success, limit, reset, remaining } = await ratelimit.limit(ip)

    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': reset.toString(),
          },
        }
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*',
}
\`\`\`

### For Express:

\`\`\`typescript
import rateLimit from 'express-rate-limit'

// IMPORTANT: Define OUTSIDE handler functions!
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: { error: 'Too many login attempts. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
})

const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // 100 requests per minute
  message: { error: 'Rate limit exceeded.' },
})

// Apply to routes
app.use('/api/auth', authLimiter)
app.use('/api', apiLimiter)
\`\`\`

### For Next.js Pages Router:

\`\`\`typescript
import rateLimit from 'express-rate-limit'

// Define OUTSIDE the handler
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
})

export default function handler(req, res) {
  return new Promise((resolve) => {
    limiter(req, res, () => {
      // Your login logic here
      resolve()
    })
  })
}
\`\`\`

## Rate limit recommendations

- Login/auth endpoints: 5 requests per 15 minutes
- Password reset: 3 requests per hour
- API endpoints: 100 requests per minute
- File uploads: 10 per hour

## After fixing

1. Test by making rapid requests - should get 429 after limit
2. Verify rate limit headers are returned (X-RateLimit-*)
3. Install dependencies: npm install @upstash/ratelimit @upstash/redis (serverless) or npm install express-rate-limit (Express)
4. For Upstash, add UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN to .env
5. List all routes you modified

Please proceed systematically through my codebase.`}</div>
				</div>
			</div>

			<!-- Manual Fix -->
			<div class="fix-section">
				<h3>Manual Fix: Next.js with Upstash (Serverless)</h3>
				<p>For Vercel and other serverless platforms, use <a href="https://upstash.com/docs/oss/sdks/ts/ratelimit/overview">Upstash Rate Limit</a> because it stores state in Redis across function instances.</p>

				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-block-header">
							<span class="code-block-lang status-bad">VULNERABLE</span>
						</div>
						<pre><code>{`// No rate limiting - anyone can spam
export async function POST(request: Request) {
  const { email, password } = await request.json()

  // Can be called millions of times
  const user = await verifyCredentials(email, password)

  if (!user) {
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    )
  }

  return NextResponse.json({ user })
}`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-block-header">
							<span class="code-block-lang status-good">SECURE</span>
						</div>
						<pre><code>{`// middleware.ts - rate limits all auth routes
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '15 m'),
})

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/auth')) {
    const ip = request.ip ?? '127.0.0.1'
    const { success } = await ratelimit.limit(ip)

    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      )
    }
  }
  return NextResponse.next()
}`}</code></pre>
					</div>
				</div>
			</div>

			<!-- Express Fix -->
			<div class="fix-section">
				<h3>Manual Fix: Express with express-rate-limit</h3>
				<p>For traditional Node.js servers, use <a href="https://www.npmjs.com/package/express-rate-limit">express-rate-limit</a>. Critical: define the limiter OUTSIDE handler functions.</p>

				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-block-header">
							<span class="code-block-lang status-bad">WRONG - Limiter inside handler</span>
						</div>
						<pre><code>{`// BAD: Creates new limiter per request!
app.post('/api/login', async (req, res) => {
  // This limiter resets every request
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
  })

  limiter(req, res, async () => {
    // Login logic
  })
})`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-block-header">
							<span class="code-block-lang status-good">CORRECT - Limiter outside handler</span>
						</div>
						<pre><code>{`import rateLimit from 'express-rate-limit'

// Define ONCE, outside any handler
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts
  message: { error: 'Too many attempts' },
  standardHeaders: true,
})

// Use as middleware
app.post('/api/login', loginLimiter, async (req, res) => {
  // Login logic - only runs if under limit
  const user = await verifyCredentials(req.body)
  res.json({ user })
})`}</code></pre>
					</div>
				</div>
			</div>
		</section>

		<!-- Defense in Depth -->
		<section class="article-section">
			<h2>Beyond rate limiting: defense in depth</h2>
			<p>
				Rate limiting slows attacks but does not stop determined attackers. According to <a href="https://owasp.org/www-community/controls/Blocking_Brute_Force_Attacks">OWASP</a>, combine rate limiting with additional measures for robust protection.
			</p>

			<ul class="defense-list">
				<li>
					<strong>CAPTCHA after failed attempts:</strong> Show CAPTCHA after 3 failed logins. This stops automated attacks while allowing legitimate users to retry.
				</li>
				<li>
					<strong>Account lockout (with caution):</strong> Lock accounts after 10 failed attempts. Caution: this can be used for denial-of-service against specific users.
				</li>
				<li>
					<strong>Exponential backoff:</strong> Increase wait time after each failure: 1s, 2s, 4s, 8s... Makes brute force exponentially slower.
				</li>
				<li>
					<strong>Multi-factor authentication:</strong> Even if password is guessed, attacker needs the second factor. This is the strongest protection.
				</li>
				<li>
					<strong>Breach password checking:</strong> Check passwords against known breach databases (haveibeenpwned.com API) to reject commonly compromised passwords.
				</li>
			</ul>
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
				<a href="/kb/security/vulnerabilities/missing-auth/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Missing Authentication</div>
					<p class="related-card-description">Unprotected API routes anyone can access</p>
				</a>
				<a href="/kb/security/vulnerabilities/hardcoded-secrets/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Hardcoded Secrets</div>
					<p class="related-card-description">API keys exposed in source code</p>
				</a>
				<a href="/kb/ai-patterns/bolt/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Bolt Security Patterns</div>
					<p class="related-card-description">Common patterns in Bolt generated apps</p>
				</a>
				<a href="/kb/ai-patterns/cursor/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Cursor Security Patterns</div>
					<p class="related-card-description">Common patterns in Cursor generated code</p>
				</a>
				<a href="/kb/security/vulnerabilities/idor/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">IDOR</div>
					<p class="related-card-description">When users can access each other's data</p>
				</a>
				<a href="/kb/ai-patterns/claude-code/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Claude Code Security Patterns</div>
					<p class="related-card-description">Common patterns in Claude Code apps</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Scan your code for missing rate limiting</h2>
			<p>Check your authentication endpoints for rate limiting and other common security vulnerabilities.</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">
				Try VibeShip Scanner
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

	.badge-medium {
		background: var(--yellow, #eab308);
		color: black;
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

	/* Attack Scenario */
	.attack-scenario {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.attack-scenario h3 {
		margin: 0 0 1rem;
		font-size: 1rem;
	}

	.attack-scenario ol {
		margin: 0;
		padding-left: 1.5rem;
	}

	.attack-scenario li {
		margin-bottom: 0.5rem;
		color: var(--text-secondary);
	}

	.attack-scenario li strong {
		color: var(--text-primary);
	}

	.attack-scenario code {
		background: var(--bg-tertiary);
		padding: 0.125rem 0.375rem;
		font-size: 0.85rem;
	}

	.attack-note {
		margin: 1rem 0 0 !important;
		padding: 0.75rem;
		background: var(--bg-tertiary);
		border-left: 3px solid var(--green);
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	/* Priority List */
	.priority-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin: 1.5rem 0;
	}

	.priority-item {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0.75rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
	}

	.priority-label {
		font-size: 0.75rem;
		font-weight: 600;
		padding: 0.25rem 0.5rem;
		text-transform: uppercase;
	}

	.priority-item.critical .priority-label {
		background: var(--red);
		color: white;
	}

	.priority-item.high .priority-label {
		background: var(--orange, #f97316);
		color: white;
	}

	.priority-item.medium .priority-label {
		background: var(--yellow, #eab308);
		color: black;
	}

	.priority-content {
		color: var(--text-secondary);
	}

	.priority-content strong {
		color: var(--text-primary);
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

	/* Defense List */
	.defense-list {
		list-style: none;
		padding: 0;
		margin: 1.5rem 0;
	}

	.defense-list li {
		padding: 1rem;
		margin-bottom: 0.75rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		color: var(--text-secondary);
	}

	.defense-list li strong {
		color: var(--text-primary);
		display: block;
		margin-bottom: 0.25rem;
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
		.priority-item {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.5rem;
		}

		.faq-item h3 {
			font-size: 1rem;
		}
	}
</style>
