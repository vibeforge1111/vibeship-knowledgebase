<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'v0 Security Patterns: When Fast UI Meets Vulnerable Code',
		description: 'v0 generates beautiful UI fast but often exposes secrets via NEXT_PUBLIC_ and skips server-side validation. Learn 5 patterns to fix before deploying.',
		url: '/kb/ai-patterns/v0/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'AI Patterns', href: '/kb/ai-patterns' },
		{ label: 'v0' }
	];

	// Tool info
	const toolInfo = {
		name: 'v0',
		company: 'Vercel',
		type: 'AI UI Generation Tool',
		model: 'GPT-4',
		website: 'https://v0.dev',
		securityPosture: 'Low-Medium',
		targetUser: 'Designers, frontend developers',
		topIssue: 'NEXT_PUBLIC_ secret exposure'
	};

	// Key statistics from Vercel
	const stats = [
		{ value: '100,000+', label: 'Insecure deployments blocked', source: 'Vercel Blog' },
		{ value: '17,000+', label: 'Deployments blocked for exposed secrets (one month)', source: 'Vercel Blog' },
		{ value: '1,000+', label: 'Developers nearly exposed Supabase credentials', source: 'Vercel Blog' }
	];

	// Security patterns
	const patterns = [
		{
			name: 'NEXT_PUBLIC_ Secret Exposure',
			severity: 'Critical',
			prevalence: '17,000+ deployments blocked',
			description: 'v0 places sensitive API keys in NEXT_PUBLIC_ prefixed environment variables, exposing them to the browser. This is v0\'s most common security issue.',
			whyHappens: 'NEXT_PUBLIC_ makes variables work in client components immediately. v0 prioritizes "it works" over "it\'s secure".',
			vulnerableCode: `// VULNERABLE: v0 generates this for "add Supabase"
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY! // Service key exposed!
)

// Also common with AI service keys:
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY // Exposed to browser!
})`,
			secureCode: `// SECURE: Service keys should only be server-side
// lib/supabase-server.ts (server only)
import { createClient } from '@supabase/supabase-js'

export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!, // No NEXT_PUBLIC_ = server only
  process.env.SUPABASE_SERVICE_KEY!
)

// lib/supabase-client.ts (client)
import { createBrowserClient } from '@supabase/ssr'

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // Only anon key to client
)`,
			link: '/kb/security/vulnerabilities/hardcoded-secrets/',
			cweLink: 'https://cwe.mitre.org/data/definitions/200.html',
			cweId: 'CWE-200'
		},
		{
			name: 'Missing Server-Side Validation',
			severity: 'High',
			prevalence: 'Expected 76% of projects',
			description: 'v0 generates client-side form validation only, with no server-side checks. Attackers can bypass client validation trivially.',
			whyHappens: 'v0 focuses on UI/UX where validation is visible. Client-side validation provides instant user feedback, which looks better in demos.',
			vulnerableCode: `// VULNERABLE: v0 generates client-only validation
'use client'

export function ContactForm() {
  const [email, setEmail] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    // Client-side validation - easily bypassed with DevTools!
    if (!email.includes('@')) {
      return alert('Invalid email')
    }
    await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify({ email })
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" required /> {/* HTML validation also client-only */}
    </form>
  )
}`,
			secureCode: `// SECURE: Server-side validation with Zod
// app/api/contact/route.ts
import { z } from 'zod'
import { NextResponse } from 'next/server'

const schema = z.object({
  email: z.string().email().max(255),
})

export async function POST(request: Request) {
  const body = await request.json()

  // Server-side validation - cannot be bypassed
  const result = schema.safeParse(body)
  if (!result.success) {
    return NextResponse.json(
      { error: 'Invalid input' },
      { status: 400 }
    )
  }

  await saveContact(result.data.email)
  return NextResponse.json({ success: true })
}`,
			link: '/kb/security/vulnerabilities/sql-injection/',
			cweLink: 'https://cwe.mitre.org/data/definitions/20.html',
			cweId: 'CWE-20'
		},
		{
			name: 'Unprotected Server Actions',
			severity: 'Critical',
			prevalence: 'Expected 63% of projects',
			description: 'v0 uses Next.js Server Actions without authentication or authorization checks. Any client can call these functions directly.',
			whyHappens: 'Server Actions are convenient for form handling. Auth checks add boilerplate that slows down the "prompt to preview" experience.',
			vulnerableCode: `// VULNERABLE: v0 generates Server Actions without auth
'use server'

export async function deleteUser(userId: string) {
  // No auth check - any client can call this!
  await db.user.delete({ where: { id: userId } })
  return { success: true }
}

export async function updateProfile(formData: FormData) {
  const name = formData.get('name') as string
  const userId = formData.get('userId') as string

  // No check if current user === userId (IDOR!)
  await db.user.update({
    where: { id: userId },
    data: { name }
  })
}`,
			secureCode: `// SECURE: Server Actions with auth + authorization
'use server'

import { auth } from '@/lib/auth'
import { z } from 'zod'

export async function deleteUser(userId: string) {
  const session = await auth()

  // Auth check
  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  // Authorization: only admins can delete users
  if (session.user.role !== 'admin') {
    throw new Error('Forbidden')
  }

  await db.user.delete({ where: { id: userId } })
  return { success: true }
}

export async function updateProfile(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error('Unauthorized')

  // Only update the current user's profile (prevents IDOR)
  await db.user.update({
    where: { id: session.user.id }, // Use session, not form input
    data: { name: formData.get('name') as string }
  })
}`,
			link: '/kb/security/vulnerabilities/missing-auth/',
			cweLink: 'https://cwe.mitre.org/data/definitions/306.html',
			cweId: 'CWE-306'
		},
		{
			name: 'Client-Side Data Fetching Without Auth',
			severity: 'High',
			prevalence: 'Expected 40-50% of projects',
			description: 'v0 generates useEffect data fetching that exposes API endpoints without protection. Any user can fetch any other user\'s data.',
			whyHappens: 'Client components are the default mental model. useEffect + fetch is a common pattern that v0 replicates without adding auth.',
			vulnerableCode: `// VULNERABLE: v0 generates unprotected client data fetching
'use client'

export function UserDashboard({ userId }: { userId: string }) {
  const [data, setData] = useState(null)

  useEffect(() => {
    // Fetches any user's data - no auth check on API!
    // Attacker: change userId to access other users
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(setData)
  }, [userId])

  return <div>{/* render data */}</div>
}`,
			secureCode: `// SECURE: Server Component with auth
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export async function UserDashboard() {
  const session = await auth()

  if (!session?.user) {
    redirect('/login')
  }

  // Fetch only the current user's data - no IDOR possible
  const data = await db.user.findUnique({
    where: { id: session.user.id }
  })

  return <div>{/* render data */}</div>
}`,
			link: '/kb/security/vulnerabilities/idor/',
			cweLink: 'https://cwe.mitre.org/data/definitions/862.html',
			cweId: 'CWE-862'
		},
		{
			name: 'Sensitive Data in Logs/Errors',
			severity: 'Medium',
			prevalence: 'Expected 35-45% of projects',
			description: 'v0 logs user data, tokens, or API responses to console. In production, these logs may expose sensitive information.',
			whyHappens: 'console.log is helpful during development. v0 generates code that works, including debug statements that should be removed for production.',
			vulnerableCode: `// VULNERABLE: v0 generates debug logs with sensitive data
export async function POST(request: Request) {
  const body = await request.json()
  console.log('Request body:', body) // May contain passwords!

  try {
    const user = await authenticateUser(body.email, body.password)
    console.log('Authenticated user:', user) // Logs user object
    return NextResponse.json({ token: user.token })
  } catch (error) {
    console.error('Auth error:', error) // May expose internals
    return NextResponse.json(
      { error: error.message, stack: error.stack }, // Stack trace!
      { status: 500 }
    )
  }
}`,
			secureCode: `// SECURE: Production-safe error handling
export async function POST(request: Request) {
  const body = await request.json()

  try {
    const user = await authenticateUser(body.email, body.password)
    return NextResponse.json({ token: user.token })
  } catch (error) {
    // Log sanitized info internally
    console.error('Auth failed for:', body.email?.substring(0, 3) + '***')

    // Return generic error to client - no details
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 401 }
    )
  }
}`,
			link: '/kb/security/vulnerabilities/hardcoded-secrets/',
			cweLink: 'https://cwe.mitre.org/data/definitions/532.html',
			cweId: 'CWE-532'
		}
	];

	// Tool comparison
	const toolComparison = [
		{ tool: 'v0', securityPosture: 'Low-Medium', targetUser: 'Designers, frontend', topIssue: 'NEXT_PUBLIC_ secrets', bestFor: 'UI prototyping' },
		{ tool: 'Bolt.new', securityPosture: 'Low', targetUser: 'Beginners, founders', topIssue: 'Hardcoded secrets', bestFor: 'Full-stack prototypes' },
		{ tool: 'Cursor', securityPosture: 'Medium', targetUser: 'Experienced devs', topIssue: 'Missing validation', bestFor: 'Production dev' },
		{ tool: 'Claude Code', securityPosture: 'Medium-High', targetUser: 'Terminal users', topIssue: 'Missing rate limiting', bestFor: 'Backend, refactoring' },
		{ tool: 'Replit', securityPosture: 'Low', targetUser: 'Beginners', topIssue: 'Debug mode, DB exposure', bestFor: 'Learning, quick demos' }
	];

	// AI Fix Prompt
	const aiFixPrompt = `Review my v0-generated Next.js code for these security issues:

1. **NEXT_PUBLIC_ Secret Exposure**
   Search for any NEXT_PUBLIC_ prefixed variables containing:
   - Service keys (SUPABASE_SERVICE_KEY, not anon key)
   - Database credentials (DATABASE_URL)
   - API secrets (OPENAI_API_KEY, STRIPE_SECRET_KEY)
   Move these to server-only environment variables (remove NEXT_PUBLIC_ prefix).

2. **Missing Server-Side Validation**
   Find forms that only validate on the client (useState + client checks).
   Add Zod validation in the API route or Server Action:
   \`\`\`typescript
   const schema = z.object({ email: z.string().email() })
   const result = schema.safeParse(body)
   \`\`\`

3. **Unprotected Server Actions**
   Find 'use server' functions without authentication checks.
   Add auth() at the start:
   \`\`\`typescript
   const session = await auth()
   if (!session?.user) throw new Error('Unauthorized')
   \`\`\`

4. **IDOR in Server Actions**
   Find Server Actions that accept userId as a parameter.
   Replace with session.user.id from auth() - never trust client-provided IDs.

5. **Debug Logs**
   Find console.log statements that might expose:
   - Request bodies (may contain passwords)
   - User objects (may contain tokens)
   - Full error objects with stack traces
   Remove or sanitize for production.

For each issue found:
- Show the file and line number
- Show the vulnerable code
- Show the secure replacement
- Explain the risk`;

	// FAQ data
	const faqs = [
		{
			question: 'Is v0 safe to use?',
			answer: 'v0\'s platform is safe and Vercel actively blocks insecure deployments - they\'ve blocked over 100,000 insecure deploys since launch. However, the generated code may expose secrets via NEXT_PUBLIC_ or skip server-side validation. Always review generated code before production deployment.'
		},
		{
			question: 'What security issues does v0 have?',
			answer: 'Top issues are NEXT_PUBLIC_ secret exposure (17,000+ deployments blocked in one month), missing server-side validation, unprotected Server Actions, and debug logs in production. These stem from v0\'s UI-first approach where security features add complexity that slows prototyping.'
		},
		{
			question: 'Is v0 safe for production?',
			answer: 'Yes, with review. v0 generates beautiful UI fast and is excellent for prototyping, but requires security hardening before handling real user data. Check environment variables for exposed secrets, add auth to Server Actions, and implement server-side validation.'
		},
		{
			question: 'v0 vs Bolt - which is more secure?',
			answer: 'Similar security posture - both prioritize speed over security. Key difference: v0 focuses on UI/frontend and its #1 issue is NEXT_PUBLIC_ secret exposure. Bolt focuses on full-stack and its #1 issue is hardcoded secrets in code. Both require security review before production.'
		},
		{
			question: 'Does v0 protect against vulnerabilities?',
			answer: 'Yes, v0 has built-in security measures: it blocks deployments with exposed secrets, auto-patches critical CVEs like React2Shell, and supports preview password protection. However, it can\'t catch all issues in generated code - manual review is still needed.'
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
			{"@type": "ListItem", "position": 2, "name": "AI Patterns", "item": "https://vibeship.co/kb/ai-patterns"},
			{"@type": "ListItem", "position": 3, "name": "v0"}
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

<Header />

<main class="article-container">
	<!-- Breadcrumbs -->
	<nav class="breadcrumbs" aria-label="Breadcrumb">
		{#each breadcrumbs as crumb, i}
			{#if i < breadcrumbs.length - 1}
				<a href={crumb.href}>{crumb.label}</a>
				<span class="separator">/</span>
			{:else}
				<span class="current">{crumb.label}</span>
			{/if}
		{/each}
	</nav>

	<article class="security-article">
		<header class="article-header">
			<div class="tool-badge">AI Tool Analysis</div>
			<h1>v0 Security Patterns: When Fast UI Meets Vulnerable Code</h1>
			<p class="subtitle">v0 generates beautiful UI, but NEXT_PUBLIC_ secrets and missing auth slip through</p>
		</header>

		<!-- Quick Answer Box -->
		<section class="quick-answer">
			<h2>Quick Answer</h2>
			<p>
				<strong><a href="https://v0.dev">v0</a> is Vercel's AI UI generation tool that creates beautiful Next.js components from prompts.</strong> It excels at UI but commonly exposes secrets via NEXT_PUBLIC_ environment variables. According to <a href="https://vercel.com/blog/v0-vibe-coding-securely">Vercel's blog</a>, they've blocked 17,000+ deployments in a single month for exposed secrets. Check environment variables and add auth to Server Actions before production.
			</p>
		</section>

		<!-- Stats Section -->
		<section class="stats-section">
			<h2>v0 Security Statistics</h2>
			<div class="stats-grid">
				{#each stats as stat}
					<div class="stat-card">
						<div class="stat-value">{stat.value}</div>
						<div class="stat-label">{stat.label}</div>
						<div class="stat-source">Source: {stat.source}</div>
					</div>
				{/each}
			</div>
			<p class="stats-note">
				Data from <a href="https://vercel.com/blog/v0-vibe-coding-securely">Vercel's official blog post</a> on secure vibe coding. Vercel actively monitors and blocks insecure deployments.
			</p>
		</section>

		<!-- Tool Profile -->
		<section class="content-section">
			<h2>What is v0?</h2>
			<p>
				v0 is Vercel's AI-powered UI generation tool that creates React and Next.js components from text prompts or images. It's designed for rapid prototyping - describe what you want, and v0 generates production-ready components using <a href="https://ui.shadcn.com/">shadcn/ui</a>.
			</p>
			<div class="tool-profile">
				<div class="profile-item">
					<span class="label">Company</span>
					<span class="value">{toolInfo.company}</span>
				</div>
				<div class="profile-item">
					<span class="label">Type</span>
					<span class="value">{toolInfo.type}</span>
				</div>
				<div class="profile-item">
					<span class="label">Target Users</span>
					<span class="value">{toolInfo.targetUser}</span>
				</div>
				<div class="profile-item">
					<span class="label">Security Posture</span>
					<span class="value">{toolInfo.securityPosture}</span>
				</div>
				<div class="profile-item">
					<span class="label">Top Issue</span>
					<span class="value">{toolInfo.topIssue}</span>
				</div>
			</div>
		</section>

		<!-- Why v0 generates vulnerabilities -->
		<section class="content-section">
			<h2>Why Does v0 Generate Vulnerable Code?</h2>
			<p>
				v0 optimizes for beautiful, functional UI components. Its strength is generating pixel-perfect React components from prompts or images. However, security features like authentication and server-side validation add complexity that slows down the "prompt to preview" experience.
			</p>
			<p>
				Additionally, v0 generates Next.js code which has confusing environment variable rules. The <code>NEXT_PUBLIC_</code> prefix exposes variables to the browser - many vibe coders don't understand this, and v0 doesn't always get it right when you ask it to "add Supabase" or "integrate OpenAI".
			</p>
			<p>
				Unlike <a href="/kb/ai-patterns/bolt/">Bolt</a> which focuses on full-stack apps, v0's UI-first approach means backend security is secondary. It generates what looks right in the browser, not what's secure on the server.
			</p>
		</section>

		<!-- Security Patterns -->
		<section class="content-section">
			<h2>What Security Issues Does v0 Generate?</h2>
			<p>
				Based on <a href="https://vercel.com/blog/v0-vibe-coding-securely">Vercel's security research</a> and our analysis, here are the 5 most common security patterns in v0-generated code:
			</p>

			<div class="patterns-grid">
				{#each patterns as pattern}
					<div class="pattern-card">
						<div class="pattern-header">
							<h3>{pattern.name}</h3>
							<span class="severity-tag {pattern.severity.toLowerCase()}">{pattern.severity}</span>
						</div>
						<p class="pattern-description">{pattern.description}</p>
						<p class="pattern-why"><strong>Why it happens:</strong> {pattern.whyHappens}</p>
						<p class="pattern-prevalence"><strong>Prevalence:</strong> {pattern.prevalence}</p>

						<div class="code-comparison">
							<div class="code-block vulnerable">
								<div class="code-label">❌ Vulnerable (v0 generates)</div>
								<pre><code>{pattern.vulnerableCode}</code></pre>
							</div>
							<div class="code-block secure">
								<div class="code-label">✅ Secure (you should use)</div>
								<pre><code>{pattern.secureCode}</code></pre>
							</div>
						</div>

						<div class="pattern-links">
							<a href={pattern.cweLink} target="_blank" rel="noopener">{pattern.cweId} →</a>
							<a href={pattern.link}>Related vulnerability →</a>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- Tool Comparison -->
		<section class="content-section">
			<h2>How Does v0 Compare to Other AI Tools?</h2>
			<p>
				Each AI coding tool has different security characteristics. v0's UI-first approach means its vulnerabilities differ from full-stack tools like <a href="/kb/ai-patterns/bolt/">Bolt</a> or code-completion tools like <a href="/kb/ai-patterns/cursor/">Cursor</a>:
			</p>

			<div class="comparison-table-wrapper">
				<table class="comparison-table">
					<thead>
						<tr>
							<th>Tool</th>
							<th>Security Posture</th>
							<th>Target User</th>
							<th>Top Issue</th>
							<th>Best For</th>
						</tr>
					</thead>
					<tbody>
						{#each toolComparison as tool}
							<tr class:current={tool.tool === 'v0'}>
								<td class="tool-name">{tool.tool}</td>
								<td>{tool.securityPosture}</td>
								<td>{tool.targetUser}</td>
								<td>{tool.topIssue}</td>
								<td>{tool.bestFor}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</section>

		<!-- Vercel's Security Measures -->
		<section class="content-section">
			<h2>What Security Measures Has Vercel Implemented?</h2>
			<p>
				Credit where due: Vercel has implemented several security measures for v0 and their platform:
			</p>
			<ul class="feature-list">
				<li><strong>Real-time vulnerability detection</strong> - Scans generated code during creation</li>
				<li><strong>Deploy blocks</strong> - Blocks deployments with exposed secrets (100,000+ blocked)</li>
				<li><strong>Automatic CVE patches</strong> - Auto-patched React2Shell vulnerability</li>
				<li><strong>Preview protection</strong> - Password/SSO protection for preview deployments</li>
				<li><strong>Vercel AI Gateway</strong> - Credential management for AI services</li>
			</ul>
			<p>
				These measures catch many issues before deployment, but they can't catch everything in generated code. You still need to review authentication patterns and input validation.
			</p>
		</section>

		<!-- AI Fix Prompt -->
		<section class="content-section ai-fix-section">
			<h2>AI Fix Prompt for v0 Code</h2>
			<p>Copy this prompt to audit your v0-generated code for security issues:</p>

			<div class="prompt-container">
				<button class="copy-button" onclick={copyPrompt}>
					{copied ? '✓ Copied!' : 'Copy Prompt'}
				</button>
				<pre class="ai-prompt">{aiFixPrompt}</pre>
			</div>
		</section>

		<!-- FAQ Section -->
		<section class="content-section faq-section">
			<h2>Frequently Asked Questions</h2>

			{#each faqs as faq}
				<div class="faq-item">
					<h3>{faq.question}</h3>
					<p>{faq.answer}</p>
				</div>
			{/each}
		</section>

		<!-- Related Content -->
		<section class="content-section related-section">
			<h2>Related Security Guides</h2>

			<div class="related-grid">
				<a href="/kb/ai-patterns/bolt/" class="related-card">
					<h3>Bolt.new Security</h3>
					<p>Full-stack AI tool with similar security patterns</p>
				</a>
				<a href="/kb/ai-patterns/cursor/" class="related-card">
					<h3>Cursor Security</h3>
					<p>Code completion tool for experienced developers</p>
				</a>
				<a href="/kb/ai-patterns/claude-code/" class="related-card">
					<h3>Claude Code Security</h3>
					<p>Terminal-based AI with higher security awareness</p>
				</a>
				<a href="/kb/security/vulnerabilities/hardcoded-secrets/" class="related-card">
					<h3>Hardcoded Secrets</h3>
					<p>Deep dive into NEXT_PUBLIC_ and secret exposure</p>
				</a>
				<a href="/kb/security/vulnerabilities/missing-auth/" class="related-card">
					<h3>Missing Authentication</h3>
					<p>Protecting Server Actions and API routes</p>
				</a>
				<a href="/kb/security/stacks/nextjs-supabase/" class="related-card">
					<h3>Next.js + Supabase Security</h3>
					<p>Secure patterns for v0's most common stack</p>
				</a>
			</div>
		</section>

		<!-- CTA -->
		<section class="cta-section">
			<h2>Scan Your v0 Project for Security Issues</h2>
			<p>VibeShip Scanner detects NEXT_PUBLIC_ exposure, missing auth, and other patterns specific to AI-generated Next.js code.</p>
			<a href="https://scanner.vibeship.co" class="cta-button">Scan Your Code Free →</a>
		</section>
	</article>
</main>

<style>
	.article-container {
		max-width: 900px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	.breadcrumbs {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.875rem;
		margin-bottom: 2rem;
		color: var(--text-secondary);
	}

	.breadcrumbs a {
		color: var(--green-dim);
		text-decoration: none;
	}

	.breadcrumbs a:hover {
		text-decoration: underline;
	}

	.breadcrumbs .separator {
		color: var(--text-muted);
	}

	.breadcrumbs .current {
		color: var(--text-primary);
	}

	.security-article {
		background: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: 12px;
		padding: 2rem;
	}

	.article-header {
		margin-bottom: 2rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid var(--border-color);
	}

	.tool-badge {
		display: inline-block;
		padding: 0.25rem 0.75rem;
		border-radius: 4px;
		font-size: 0.75rem;
		font-weight: 600;
		background: rgba(59, 130, 246, 0.2);
		color: #3b82f6;
		margin-bottom: 1rem;
	}

	.article-header h1 {
		font-size: 2rem;
		font-weight: 700;
		margin-bottom: 0.5rem;
		line-height: 1.2;
	}

	.subtitle {
		color: var(--text-secondary);
		font-size: 1.125rem;
	}

	.quick-answer {
		background: var(--bg-tertiary);
		border-left: 4px solid var(--green);
		padding: 1.5rem;
		margin-bottom: 2rem;
		border-radius: 0 8px 8px 0;
	}

	.quick-answer h2 {
		font-size: 1rem;
		color: var(--green);
		margin-bottom: 0.75rem;
	}

	.quick-answer p {
		margin: 0;
		line-height: 1.6;
	}

	.quick-answer a {
		color: var(--green-dim);
	}

	.stats-section {
		margin-bottom: 2.5rem;
	}

	.stats-section h2 {
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: 1rem;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.stat-card {
		background: var(--bg-tertiary);
		border: 1px solid var(--border-color);
		border-radius: 8px;
		padding: 1.25rem;
		text-align: center;
	}

	.stat-value {
		font-size: 1.75rem;
		font-weight: 700;
		color: var(--green);
		margin-bottom: 0.25rem;
	}

	.stat-label {
		font-size: 0.875rem;
		color: var(--text-secondary);
		margin-bottom: 0.5rem;
	}

	.stat-source {
		font-size: 0.75rem;
		color: var(--text-muted);
	}

	.stats-note {
		font-size: 0.875rem;
		color: var(--text-secondary);
		margin: 0;
	}

	.stats-note a {
		color: var(--green-dim);
	}

	.content-section {
		margin-bottom: 2.5rem;
	}

	.content-section h2 {
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: 1rem;
		color: var(--text-primary);
	}

	.content-section p {
		line-height: 1.7;
		margin-bottom: 1rem;
		color: var(--text-secondary);
	}

	.content-section a {
		color: var(--green-dim);
		text-decoration: none;
	}

	.content-section a:hover {
		text-decoration: underline;
	}

	.content-section code {
		background: var(--bg-tertiary);
		padding: 0.125rem 0.375rem;
		border-radius: 3px;
		font-size: 0.9em;
	}

	.tool-profile {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
		gap: 1rem;
		background: var(--bg-tertiary);
		padding: 1.25rem;
		border-radius: 8px;
		margin-top: 1rem;
	}

	.profile-item {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.profile-item .label {
		font-size: 0.75rem;
		color: var(--text-muted);
		text-transform: uppercase;
	}

	.profile-item .value {
		font-weight: 500;
		color: var(--text-primary);
	}

	.feature-list {
		list-style: none;
		padding: 0;
		margin: 1rem 0;
	}

	.feature-list li {
		padding: 0.5rem 0 0.5rem 1.75rem;
		position: relative;
		color: var(--text-secondary);
		line-height: 1.5;
	}

	.feature-list li::before {
		content: '✓';
		position: absolute;
		left: 0;
		color: var(--green);
		font-weight: 600;
	}

	.patterns-grid {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		margin-top: 1.5rem;
	}

	.pattern-card {
		background: var(--bg-tertiary);
		border: 1px solid var(--border-color);
		border-radius: 8px;
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

	.severity-tag {
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		font-size: 0.75rem;
		font-weight: 600;
	}

	.severity-tag.critical {
		background: rgba(239, 68, 68, 0.2);
		color: #ef4444;
	}

	.severity-tag.high {
		background: rgba(245, 158, 11, 0.2);
		color: #f59e0b;
	}

	.severity-tag.medium {
		background: rgba(59, 130, 246, 0.2);
		color: #3b82f6;
	}

	.pattern-description,
	.pattern-why,
	.pattern-prevalence {
		color: var(--text-secondary);
		margin-bottom: 0.75rem;
		line-height: 1.6;
		font-size: 0.9375rem;
	}

	.code-comparison {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		margin: 1.5rem 0 1rem;
	}

	@media (max-width: 768px) {
		.code-comparison {
			grid-template-columns: 1fr;
		}
	}

	.code-block {
		background: var(--bg-primary);
		border-radius: 6px;
		overflow: hidden;
	}

	.code-block.vulnerable {
		border: 1px solid rgba(239, 68, 68, 0.3);
	}

	.code-block.secure {
		border: 1px solid rgba(34, 197, 94, 0.3);
	}

	.code-label {
		padding: 0.5rem 1rem;
		font-size: 0.75rem;
		font-weight: 600;
		background: var(--bg-tertiary);
	}

	.vulnerable .code-label {
		color: #ef4444;
	}

	.secure .code-label {
		color: #22c55e;
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
		text-decoration: none;
	}

	.pattern-links a:hover {
		text-decoration: underline;
	}

	.comparison-table-wrapper {
		overflow-x: auto;
		margin-top: 1rem;
	}

	.comparison-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.875rem;
	}

	.comparison-table th,
	.comparison-table td {
		padding: 0.75rem 1rem;
		text-align: left;
		border-bottom: 1px solid var(--border-color);
	}

	.comparison-table th {
		background: var(--bg-tertiary);
		font-weight: 600;
		color: var(--text-primary);
	}

	.comparison-table td {
		color: var(--text-secondary);
	}

	.comparison-table tr.current {
		background: rgba(34, 197, 94, 0.1);
	}

	.comparison-table tr.current td {
		color: var(--text-primary);
	}

	.tool-name {
		font-weight: 600;
		color: var(--text-primary);
	}

	.ai-fix-section {
		background: var(--bg-tertiary);
		padding: 1.5rem;
		border-radius: 8px;
	}

	.prompt-container {
		position: relative;
		margin-top: 1rem;
	}

	.copy-button {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		padding: 0.5rem 1rem;
		background: var(--green);
		color: var(--bg-primary);
		border: none;
		border-radius: 4px;
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		z-index: 1;
	}

	.copy-button:hover {
		opacity: 0.9;
	}

	.ai-prompt {
		background: var(--bg-primary);
		padding: 1.5rem;
		padding-top: 3rem;
		border-radius: 6px;
		font-size: 0.8125rem;
		line-height: 1.6;
		overflow-x: auto;
		white-space: pre-wrap;
		border: 1px solid var(--border-color);
	}

	.faq-section {
		background: var(--bg-tertiary);
		padding: 1.5rem;
		border-radius: 8px;
	}

	.faq-item {
		padding: 1rem 0;
		border-bottom: 1px solid var(--border-color);
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

	.related-section {
		margin-top: 3rem;
	}

	.related-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 1rem;
		margin-top: 1rem;
	}

	.related-card {
		background: var(--bg-tertiary);
		border: 1px solid var(--border-color);
		border-radius: 8px;
		padding: 1.25rem;
		text-decoration: none;
		transition: border-color 0.2s;
	}

	.related-card:hover {
		border-color: var(--green-dim);
		text-decoration: none;
	}

	.related-card h3 {
		font-size: 1rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
		color: var(--text-primary);
	}

	.related-card p {
		font-size: 0.875rem;
		color: var(--text-secondary);
		margin: 0;
		line-height: 1.5;
	}

	.cta-section {
		background: linear-gradient(135deg, var(--green-dim) 0%, var(--green) 100%);
		padding: 2rem;
		border-radius: 8px;
		text-align: center;
		margin-top: 2rem;
	}

	.cta-section h2 {
		color: var(--bg-primary);
		margin-bottom: 0.75rem;
	}

	.cta-section p {
		color: var(--bg-secondary);
		margin-bottom: 1.5rem;
		max-width: 500px;
		margin-left: auto;
		margin-right: auto;
	}

	.cta-button {
		display: inline-block;
		background: var(--bg-primary);
		color: var(--green);
		padding: 0.75rem 1.5rem;
		border-radius: 6px;
		font-weight: 600;
		text-decoration: none;
		transition: opacity 0.2s;
	}

	.cta-button:hover {
		opacity: 0.9;
		text-decoration: none;
	}
</style>
