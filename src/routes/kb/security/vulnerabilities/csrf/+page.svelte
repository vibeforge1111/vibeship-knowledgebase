<script lang="ts">
	import { Header } from '$lib/components/layout';

	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'CSRF' }
	];

	let showFixPrompt = $state(false);
	let copySuccess = $state(false);

	const pageData = {
		title: "CSRF: Why AI Tools Skip This Critical Protection",
		description: "CSRF lets attackers trick users into performing unwanted actions. Learn why Next.js Server Actions have built-in protection but custom API routes don't.",
		slug: "csrf",
		cwe: "CWE-352",
		cweUrl: "https://cwe.mitre.org/data/definitions/352.html",
		owasp: "CSRF Prevention",
		owaspName: "CSRF Prevention Cheat Sheet",
		owaspUrl: "https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html",
		severity: "High",
		publishedAt: "2025-12-17",
		updatedAt: "2025-12-17"
	};

	const faqs = [
		{
			question: "What is CSRF and how does it work?",
			answer: "CSRF (Cross-Site Request Forgery) tricks your browser into making requests you didn't intend. An attacker creates a malicious page with a hidden form that submits to a legitimate site where you're logged in. Your browser automatically includes your cookies, so the request appears to come from you. Per <a href=\"https://owasp.org/www-community/attacks/csrf\" target=\"_blank\" rel=\"noopener noreferrer\">OWASP</a>, this allows attackers to perform actions using your authenticated session."
		},
		{
			question: "Do Next.js Server Actions need CSRF protection?",
			answer: "No, Server Actions have built-in CSRF protection. According to <a href=\"https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#security\" target=\"_blank\" rel=\"noopener noreferrer\">Next.js documentation</a>, they enforce POST-only requests, validate Origin headers, use encrypted action IDs, and rely on SameSite cookies. You don't need to add CSRF tokens to Server Actions. However, custom Route Handlers (/api routes) do NOT have this protection and need manual implementation."
		},
		{
			question: "How do I add CSRF protection to my API routes?",
			answer: "For Next.js Route Handlers, you have three options: 1) Validate the Origin header against an allowlist, 2) Implement CSRF tokens using a library like csrf-csrf, or 3) Convert to Server Actions which have built-in protection. Origin validation is simplest for most cases. The <a href=\"https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html\" target=\"_blank\" rel=\"noopener noreferrer\">OWASP CSRF Prevention Cheat Sheet</a> recommends the Synchronizer Token Pattern for complex apps."
		},
		{
			question: "Does React protect against CSRF?",
			answer: "React itself doesn't protect against CSRF - that's a server-side concern. However, if you're using Next.js Server Actions, they have built-in CSRF protection. For custom API endpoints or other frameworks, you need to implement protection manually. Modern browsers' SameSite cookie defaults provide partial protection but aren't a complete solution."
		},
		{
			question: "Is SameSite cookie enough for CSRF protection?",
			answer: "SameSite=Lax (the browser default since 2020) provides partial CSRF protection by blocking cross-site POST requests that include cookies. However, it's not complete: GET requests can still leak data, subdomains may be trusted, and some scenarios bypass it. For sensitive operations like financial transactions, add explicit CSRF protection using tokens or Origin validation."
		}
	];

	const aiFixPrompt = `Review my Next.js code for CSRF vulnerabilities:

1. IDENTIFY ROUTE HANDLERS WITH MUTATIONS: Find all app/api/**/route.ts files with POST, PUT, DELETE, or PATCH handlers that modify data.
   - Pattern: export async function POST/PUT/DELETE/PATCH
   - These routes need CSRF protection if they're not Server Actions

2. CHECK FOR CSRF PROTECTION: For each mutating Route Handler, verify one of:
   - Origin header validation against allowlist
   - CSRF token validation via middleware
   - The route is read-only (GET) and doesn't mutate data

3. SERVER ACTIONS ARE SAFE: Files with 'use server' at the top have built-in CSRF protection from Next.js - no changes needed.

4. CHECK COOKIE SETTINGS: Verify authentication cookies use secure settings:
   - SameSite: 'Strict' or 'Lax' (not 'None' without good reason)
   - Secure: true (required for HTTPS)
   - HttpOnly: true (prevents JS access)

5. FORM SUBMISSIONS: Check that forms either:
   - Use Server Actions (action={serverAction})
   - Send requests to CSRF-protected Route Handlers
   - Include CSRF tokens in headers

For each vulnerable Route Handler found:
- Show the current code with file path
- Explain why it's vulnerable to CSRF
- Recommend: Origin validation (simplest), CSRF tokens, or conversion to Server Action
- Provide secure implementation code`;

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
	<title>{pageData.title} | vibeship</title>
	<meta name="description" content={pageData.description} />
	<meta name="keywords" content="CSRF protection, cross-site request forgery, Next.js CSRF, Server Actions security, CSRF token, SameSite cookies" />
	<link rel="canonical" href="https://vibeship.co/kb/security/vulnerabilities/csrf/" />

	<meta property="og:title" content={pageData.title} />
	<meta property="og:description" content={pageData.description} />
	<meta property="og:type" content="article" />
	<meta property="og:url" content="https://vibeship.co/kb/security/vulnerabilities/csrf/" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={pageData.title} />
	<meta name="twitter:description" content={pageData.description} />

	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@type": "TechArticle",
		"headline": pageData.title,
		"description": pageData.description,
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
		"datePublished": pageData.publishedAt,
		"dateModified": pageData.updatedAt,
		"mainEntityOfPage": {
			"@type": "WebPage",
			"@id": "https://vibeship.co/kb/security/vulnerabilities/csrf/"
		},
		"about": {
			"@type": "Thing",
			"name": "Cross-Site Request Forgery",
			"description": "CSRF vulnerability and protection patterns"
		}
	})}</script>`}

	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@type": "FAQPage",
		"mainEntity": faqs.map(item => ({
			"@type": "Question",
			"name": item.question,
			"acceptedAnswer": {
				"@type": "Answer",
				"text": item.answer.replace(/<[^>]*>/g, '')
			}
		}))
	})}</script>`}

	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"itemListElement": [
			{
				"@type": "ListItem",
				"position": 1,
				"name": "Home",
				"item": "https://vibeship.co"
			},
			{
				"@type": "ListItem",
				"position": 2,
				"name": "Knowledge Base",
				"item": "https://vibeship.co/kb/"
			},
			{
				"@type": "ListItem",
				"position": 3,
				"name": "Security",
				"item": "https://vibeship.co/kb/security/"
			},
			{
				"@type": "ListItem",
				"position": 4,
				"name": "Vulnerabilities",
				"item": "https://vibeship.co/kb/security/vulnerabilities/"
			},
			{
				"@type": "ListItem",
				"position": 5,
				"name": "CSRF",
				"item": "https://vibeship.co/kb/security/vulnerabilities/csrf/"
			}
		]
	})}</script>`}
</svelte:head>

<Header {breadcrumbs} />

<div class="content-wrapper">
	<article class="content-main content-wide">
		<header class="article-header">
			<div class="badge-row">
				<a href={pageData.cweUrl} target="_blank" rel="noopener noreferrer" class="badge badge-violet">{pageData.cwe}</a>
				<a href={pageData.owaspUrl} target="_blank" rel="noopener noreferrer" class="badge badge-orange">{pageData.owasp}</a>
				<span class="badge badge-high">{pageData.severity}</span>
			</div>
			<h1>{pageData.title}</h1>
			<p class="subtitle">
				CSRF tricks your browser into making requests you didn't intend. Next.js Server Actions are protected, but AI-generated Route Handlers typically aren't.
			</p>
		</header>

		<div class="quick-answer">
			<strong>Quick Answer:</strong> CSRF (Cross-Site Request Forgery) tricks users into performing unwanted actions on sites where they're logged in. Next.js Server Actions have built-in protection, but custom API routes don't. AI tools typically generate vulnerable Route Handlers because CSRF protection isn't needed for code to "work."
		</div>

		<section>
			<h2>What is CSRF?</h2>
			<p>
				CSRF (Cross-Site Request Forgery) is an attack where a malicious website tricks your browser into making requests to a legitimate site where you're authenticated. Your browser automatically includes your session cookies, so the target site thinks the request came from you.
			</p>
			<p>
				Think of it like someone forging your signature on a check while you're logged into your bank. The bank sees your valid credentials and processes the transaction - even though you never intended to make it.
			</p>
			<p>
				According to <a href="https://owasp.org/Top10/A01_2021-Broken_Access_Control/" target="_blank" rel="noopener noreferrer">OWASP's A01:2021 Broken Access Control</a>, CSRF falls under this category because it allows attackers to bypass access controls by exploiting authenticated user sessions.
			</p>
		</section>

		<section>
			<h2>How Do CSRF Attacks Work?</h2>
			<p>Here's a typical CSRF attack scenario:</p>
			<ol>
				<li><strong>User logs into</strong> legitimate-bank.com and gets a session cookie</li>
				<li><strong>User visits</strong> malicious-site.com (via phishing email or ad)</li>
				<li><strong>Malicious site contains</strong> a hidden form that POSTs to legitimate-bank.com/transfer</li>
				<li><strong>Form auto-submits</strong> when the page loads</li>
				<li><strong>Browser includes</strong> the user's bank session cookies automatically</li>
				<li><strong>Bank processes</strong> the transfer - user never knew it happened</li>
			</ol>
			<p>
				The attack works because browsers automatically include cookies for any request to a domain, regardless of which site initiated the request. Per the <a href="https://owasp.org/www-community/attacks/csrf" target="_blank" rel="noopener noreferrer">OWASP CSRF attack documentation</a>, this is why cookie-based authentication needs additional protection.
			</p>
		</section>

		<section>
			<h2>What Are Modern Browser Protections?</h2>
			<p>
				Modern browsers provide partial CSRF protection through SameSite cookies. According to <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#samesitesamesite-value" target="_blank" rel="noopener noreferrer">MDN's SameSite documentation</a>, here's how the settings work:
			</p>
			<ul>
				<li><strong>SameSite=Lax</strong> (browser default since 2020): Blocks cross-site POST requests with cookies. Allows GET requests for navigation.</li>
				<li><strong>SameSite=Strict</strong>: Blocks ALL cross-site requests with cookies. Most secure but can break legitimate flows.</li>
				<li><strong>SameSite=None</strong>: No protection. Must be paired with Secure flag (HTTPS only).</li>
			</ul>
			<p>
				<strong>Important:</strong> SameSite=Lax helps but isn't complete protection. GET requests can still leak sensitive data, and subdomains may bypass restrictions. For sensitive operations in vibe coded apps, add explicit CSRF protection.
			</p>
		</section>

		<section>
			<h2>How Do Next.js Server Actions Handle CSRF?</h2>
			<p>
				According to <a href="https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#security" target="_blank" rel="noopener noreferrer">Next.js documentation</a>, Server Actions have built-in CSRF protection through multiple mechanisms:
			</p>
			<ul>
				<li><strong>POST-only:</strong> Server Actions only accept POST requests, preventing GET-based attacks</li>
				<li><strong>Origin validation:</strong> Validates the Origin header matches your domain</li>
				<li><strong>Encrypted action IDs:</strong> Action endpoints aren't enumerable or guessable</li>
				<li><strong>SameSite cookies:</strong> Works with default browser protections</li>
			</ul>

			<div class="info-box safe">
				<h4>Server Actions Are Safe</h4>
				<p>If you're using <code>'use server'</code> functions in Next.js App Router, you don't need to add CSRF tokens. The framework handles it.</p>
			</div>

			<div class="code-block secure">
				<div class="code-header">
					<span class="status-badge">SECURE</span>
					<span>Server Action with built-in CSRF protection</span>
				</div>
				<pre><code>{`// app/actions/transfer.ts
'use server'

import { auth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function transferMoney(formData: FormData) {
  const session = await auth()
  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  const amount = formData.get('amount') as string
  const toAccount = formData.get('toAccount') as string

  // Server Action has built-in CSRF protection
  // No additional tokens needed!
  await executeTransfer(session.user.id, toAccount, parseFloat(amount))

  revalidatePath('/account')
  return { success: true }
}

// Usage in component:
// <form action={transferMoney}>
//   <input name="amount" />
//   <input name="toAccount" />
//   <button type="submit">Transfer</button>
// </form>`}</code></pre>
			</div>
		</section>

		<section>
			<h2>Why Do AI Tools Generate Vulnerable Routes?</h2>
			<p>
				When you ask <a href="/kb/vibe-coding-tools/cursor/">Cursor</a>, <a href="/kb/vibe-coding-tools/claude-code/">Claude Code</a>, or <a href="/kb/vibe-coding-tools/bolt/">Bolt</a> to "create an API endpoint," they generate Route Handlers, not Server Actions. Route Handlers are more flexible and familiar from Express.js patterns, but they lack Server Actions' built-in CSRF protection.
			</p>
			<p>
				The problem: AI-generated code works without CSRF protection. You can test it, deploy it, and it functions correctly - until an attacker exploits it. Vibe coders often don't realize the gap because CSRF attacks don't surface during normal development.
			</p>
			<p>
				This is different from <a href="/kb/security/vulnerabilities/missing-auth/">missing authentication</a> which fails obviously. CSRF vulnerabilities are silent - the code works, it just works for attackers too.
			</p>
		</section>

		<section>
			<h2>Vulnerable vs Secure: Route Handler Examples</h2>

			<div class="code-block vulnerable">
				<div class="code-header">
					<span class="status-badge">VULNERABLE</span>
					<span>AI-generated Route Handler - no CSRF protection</span>
				</div>
				<pre><code>{`// app/api/transfer/route.ts
// VULNERABLE: AI generates this without CSRF protection
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

export async function POST(request: Request) {
  const session = await getServerSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { amount, toAccount } = await request.json()

  // Attacker can trigger this from malicious-site.com!
  // Browser will include session cookies automatically
  await transferMoney(session.user.id, toAccount, amount)

  return NextResponse.json({ success: true })
}`}</code></pre>
			</div>

			<div class="code-block secure">
				<div class="code-header">
					<span class="status-badge">SECURE</span>
					<span>Route Handler with Origin validation</span>
				</div>
				<pre><code>{`// app/api/transfer/route.ts
// SECURE: Validate Origin header
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { getServerSession } from 'next-auth'

const ALLOWED_ORIGINS = [
  process.env.NEXT_PUBLIC_APP_URL,
  'https://yourdomain.com'
].filter(Boolean)

export async function POST(request: Request) {
  const headersList = headers()
  const origin = headersList.get('origin')

  // CSRF Protection: Reject requests from unknown origins
  if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const session = await getServerSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { amount, toAccount } = await request.json()
  await transferMoney(session.user.id, toAccount, amount)

  return NextResponse.json({ success: true })
}`}</code></pre>
			</div>
		</section>

		<section>
			<h2>Option: CSRF Tokens with Middleware</h2>
			<p>
				For complex applications requiring stricter protection, implement CSRF tokens using middleware. The <a href="https://www.npmjs.com/package/csrf-csrf" target="_blank" rel="noopener noreferrer">csrf-csrf</a> library (not the deprecated csurf) provides a double-submit cookie pattern.
			</p>

			<div class="code-block secure">
				<div class="code-header">
					<span class="status-badge">SECURE</span>
					<span>CSRF token middleware implementation</span>
				</div>
				<pre><code>{`// middleware.ts
import { doubleCsrf } from 'csrf-csrf'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const { generateToken, validateRequest } = doubleCsrf({
  getSecret: () => process.env.CSRF_SECRET!,
  cookieName: '__Host-csrf',
  cookieOptions: {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    secure: true,
  },
})

export async function middleware(request: NextRequest) {
  // Skip CSRF for Server Actions (built-in protection)
  if (request.headers.get('next-action')) {
    return NextResponse.next()
  }

  // Validate CSRF for mutating requests to API routes
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
    if (request.nextUrl.pathname.startsWith('/api/')) {
      const isValid = await validateRequest(request)
      if (!isValid) {
        return NextResponse.json(
          { error: 'Invalid CSRF token' },
          { status: 403 }
        )
      }
    }
  }

  return NextResponse.next()
}

// app/api/csrf/route.ts - Token endpoint
export async function GET() {
  const token = generateToken()
  return NextResponse.json({ token })
}`}</code></pre>
			</div>

			<p>
				<strong>When to use tokens:</strong> Financial transactions, account deletion, admin operations, or any action with irreversible consequences. For most CRUD operations in vibe coded apps, Origin validation is sufficient.
			</p>
		</section>

		<section>
			<h2>When Should You Use Each Approach?</h2>
			<div class="comparison-table">
				<table>
					<thead>
						<tr>
							<th>Approach</th>
							<th>Complexity</th>
							<th>Use Case</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><strong>Server Actions</strong></td>
							<td class="cell-safe">Low</td>
							<td>Most mutations - forms, data updates. Built-in protection.</td>
						</tr>
						<tr>
							<td><strong>Origin Validation</strong></td>
							<td class="cell-safe">Low</td>
							<td>Route Handlers that must remain as APIs. Simple to add.</td>
						</tr>
						<tr>
							<td><strong>CSRF Tokens</strong></td>
							<td class="cell-warning">Medium</td>
							<td>High-value operations, financial apps, compliance requirements.</td>
						</tr>
					</tbody>
				</table>
			</div>

			<p>
				<strong>Best practice for vibe coders:</strong> Use Server Actions for mutations whenever possible. They're simpler, safer, and optimized for Next.js. Only use Route Handlers when you need streaming, webhooks, or third-party integrations - and add Origin validation.
			</p>
		</section>

		<section>
			<h2>AI Fix Prompt for CSRF Vulnerabilities</h2>
			<p>
				Copy this prompt into <a href="/kb/vibe-coding-tools/cursor/">Cursor</a> or <a href="/kb/vibe-coding-tools/claude-code/">Claude Code</a> to scan for CSRF vulnerabilities:
			</p>

			<button class="expand-button" onclick={() => showFixPrompt = !showFixPrompt}>
				{showFixPrompt ? 'Hide' : 'Show'} AI Fix Prompt
			</button>

			{#if showFixPrompt}
				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span>AI Security Audit Prompt - CSRF</span>
						<button class="copy-button" onclick={copyPrompt}>
							{copySuccess ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre><code>{aiFixPrompt}</code></pre>
				</div>
			{/if}
		</section>

		<section>
			<h2>Frequently Asked Questions</h2>
			<div class="faq-list">
				{#each faqs as faq}
					<div class="faq-item">
						<h3>{faq.question}</h3>
						<p>{@html faq.answer}</p>
					</div>
				{/each}
			</div>
		</section>

		<section>
			<h2>Related Vulnerabilities</h2>
			<div class="related-grid">
				<a href="/kb/security/vulnerabilities/missing-auth/" class="card card-interactive">
					<h3>Missing Authentication</h3>
					<p>Routes without any auth checks</p>
				</a>
				<a href="/kb/security/vulnerabilities/xss/" class="card card-interactive">
					<h3>XSS</h3>
					<p>Often paired with CSRF in attack chains</p>
				</a>
				<a href="/kb/security/vulnerabilities/idor/" class="card card-interactive">
					<h3>IDOR</h3>
					<p>Related authorization vulnerability</p>
				</a>
				<a href="/kb/security/vulnerabilities/hardcoded-secrets/" class="card card-interactive">
					<h3>Hardcoded Secrets</h3>
					<p>CSRF secrets exposed in code</p>
				</a>
			</div>
		</section>

		<section>
			<h2>External Resources</h2>
			<ul class="resource-list">
				<li>
					<a href="https://cwe.mitre.org/data/definitions/352.html" target="_blank" rel="noopener noreferrer">CWE-352: Cross-Site Request Forgery</a>
				</li>
				<li>
					<a href="https://owasp.org/www-community/attacks/csrf" target="_blank" rel="noopener noreferrer">OWASP CSRF Attack Description</a>
				</li>
				<li>
					<a href="https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html" target="_blank" rel="noopener noreferrer">OWASP CSRF Prevention Cheat Sheet</a>
				</li>
				<li>
					<a href="https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#security" target="_blank" rel="noopener noreferrer">Next.js Server Actions Security</a>
				</li>
				<li>
					<a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#samesitesamesite-value" target="_blank" rel="noopener noreferrer">MDN SameSite Cookies</a>
				</li>
				<li>
					<a href="https://www.npmjs.com/package/csrf-csrf" target="_blank" rel="noopener noreferrer">csrf-csrf npm package</a>
				</li>
				<li>
					<a href="https://expressjs.com/en/advanced/best-practice-security.html" target="_blank" rel="noopener noreferrer">Express Security Best Practices</a>
				</li>
			</ul>
		</section>

		<section class="final-cta">
			<h2>Scan Your Code for CSRF Vulnerabilities</h2>
			<p>
				vibeship scanner identifies Route Handlers without CSRF protection and recommends whether to add Origin validation, CSRF tokens, or convert to Server Actions. Get a security report in minutes.
			</p>
			<a href="https://scanner.vibeship.co" class="cta-button">
				Try vibeship scanner Free
			</a>
		</section>
	</article>
</div>

<style>
	.article-header {
		margin-bottom: 2rem;
	}

	.badge-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.badge-violet {
		background: color-mix(in srgb, var(--violet) 20%, transparent);
		color: var(--violet);
		border: 1px solid color-mix(in srgb, var(--violet) 30%, transparent);
	}

	.badge-orange {
		background: color-mix(in srgb, var(--orange) 20%, transparent);
		color: var(--orange);
		border: 1px solid color-mix(in srgb, var(--orange) 30%, transparent);
	}

	.badge-high {
		background: color-mix(in srgb, var(--orange) 20%, transparent);
		color: var(--orange);
		border: 1px solid color-mix(in srgb, var(--orange) 30%, transparent);
	}

	.subtitle {
		font-size: 1.125rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.info-box {
		padding: 1rem 1.25rem;
		margin: 1rem 0;
	}

	.info-box.safe {
		background: color-mix(in srgb, var(--green) 10%, transparent);
		border: 1px solid color-mix(in srgb, var(--green) 20%, transparent);
	}

	.info-box h4 {
		font-size: 0.9375rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
		color: var(--green);
	}

	.info-box p {
		margin: 0;
		font-size: 0.9375rem;
		line-height: 1.5;
	}

	.code-block {
		margin: 1.5rem 0;
		border: 1px solid var(--border);
		overflow: hidden;
	}

	.code-block.vulnerable {
		border-color: var(--red);
	}

	.code-block.secure {
		border-color: var(--green);
	}

	.code-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 1rem;
		font-size: 0.875rem;
		font-weight: 500;
	}

	.code-block.vulnerable .code-header {
		background: color-mix(in srgb, var(--red) 10%, transparent);
		border-bottom: 1px solid color-mix(in srgb, var(--red) 20%, transparent);
		color: var(--red);
	}

	.code-block.secure .code-header {
		background: color-mix(in srgb, var(--green) 10%, transparent);
		border-bottom: 1px solid color-mix(in srgb, var(--green) 20%, transparent);
		color: var(--green);
	}

	.status-badge {
		padding: 0.25rem 0.5rem;
		font-size: 0.75rem;
		font-weight: 600;
	}

	.code-block.vulnerable .status-badge {
		background: color-mix(in srgb, var(--red) 20%, transparent);
		color: var(--red);
	}

	.code-block.secure .status-badge {
		background: color-mix(in srgb, var(--green) 20%, transparent);
		color: var(--green);
	}

	.code-block pre {
		margin: 0;
		padding: 1rem;
		background: var(--bg-secondary);
		overflow-x: auto;
	}

	.code-block code {
		background: none;
		padding: 0;
		color: var(--text-secondary);
		font-size: 0.875rem;
		line-height: 1.6;
	}

	.comparison-table {
		overflow-x: auto;
		margin: 1.5rem 0;
	}

	.comparison-table table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.875rem;
	}

	.comparison-table th,
	.comparison-table td {
		padding: 0.75rem 1rem;
		text-align: left;
		border: 1px solid var(--border);
	}

	.comparison-table th {
		background: var(--bg-tertiary);
		font-weight: 600;
		color: var(--text-primary);
	}

	.comparison-table td {
		background: var(--bg-secondary);
	}

	.cell-safe {
		color: var(--green);
	}

	.cell-warning {
		color: var(--orange);
	}

	.expand-button {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		background: var(--bg-tertiary);
		color: var(--text-primary);
		border: 1px solid var(--border);
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
	}

	.expand-button:hover {
		background: var(--bg-secondary);
		border-color: var(--green-dim);
	}

	.resource-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.resource-list li {
		padding: 0.75rem 0;
		border-bottom: 1px solid var(--border);
	}

	.resource-list li:last-child {
		border-bottom: none;
	}

	.resource-list a {
		color: var(--green-dim);
		text-decoration: none;
		font-size: 0.9375rem;
	}

	.resource-list a:hover {
		color: var(--green);
	}

	@media (max-width: 640px) {
		.comparison-table th,
		.comparison-table td {
			padding: 0.5rem;
			font-size: 0.8125rem;
		}
	}
</style>
