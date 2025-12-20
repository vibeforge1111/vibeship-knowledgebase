<script lang="ts">
	import { Header } from '$lib/components/layout';

	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'AI Patterns', href: '/kb/vibe-coding-tools' },
		{ label: 'v0' }
	];

	const meta = {
		title: 'v0 Security Patterns: When Fast UI Meets Vulnerable Code',
		description: 'v0 generates beautiful UI fast but often exposes secrets via NEXT_PUBLIC_ and skips server-side validation. Learn 5 patterns to fix before deploying.',
		url: '/kb/vibe-coding-tools/v0/'
	};

	const stats = [
		{ value: '100,000+', label: 'Insecure deployments blocked', source: 'Vercel Blog' },
		{ value: '17,000+', label: 'Deployments blocked for exposed secrets (one month)', source: 'Vercel Blog' },
		{ value: '1,000+', label: 'Developers nearly exposed Supabase credentials', source: 'Vercel Blog' }
	];

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
			prevalence: 'Very Common',
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
			prevalence: 'Very Common',
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
			prevalence: 'Common',
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
			prevalence: 'Common',
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

	const toolComparison = [
		{ tool: 'v0', securityPosture: 'Low-Medium', targetUser: 'Designers, frontend', topIssue: 'NEXT_PUBLIC_ secrets', bestFor: 'UI prototyping' },
		{ tool: 'Bolt.new', securityPosture: 'Low', targetUser: 'Beginners, founders', topIssue: 'Hardcoded secrets', bestFor: 'Full-stack prototypes' },
		{ tool: 'Cursor', securityPosture: 'Medium', targetUser: 'Experienced devs', topIssue: 'Missing validation', bestFor: 'Production dev' },
		{ tool: 'Claude Code', securityPosture: 'Medium-High', targetUser: 'Terminal users', topIssue: 'Missing rate limiting', bestFor: 'Backend, refactoring' },
		{ tool: 'Replit', securityPosture: 'Low', targetUser: 'Beginners', topIssue: 'Debug mode, DB exposure', bestFor: 'Learning, quick demos' }
	];

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

	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"itemListElement": [
			{"@type": "ListItem", "position": 1, "name": "Knowledge Base", "item": "https://vibeship.co/kb"},
			{"@type": "ListItem", "position": 2, "name": "AI Patterns", "item": "https://vibeship.co/kb/vibe-coding-tools"},
			{"@type": "ListItem", "position": 3, "name": "v0"}
		]
	}
	</script>`}

	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "TechArticle",
		"headline": "${meta.title}",
		"description": "${meta.description}",
		"author": { "@type": "Organization", "name": "Vibeship" },
		"publisher": { "@type": "Organization", "name": "Vibeship" },
		"datePublished": "2024-12-17",
		"dateModified": "2024-12-20"
	}
	</script>`}

	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "FAQPage",
		"mainEntity": ${JSON.stringify(faqs.map(faq => ({
			"@type": "Question",
			"name": faq.question,
			"acceptedAnswer": { "@type": "Answer", "text": faq.answer }
		})))}
	}
	</script>`}
</svelte:head>

<Header {breadcrumbs} />

<div class="content-wrapper">
	<article class="content-main content-wide">
		<header class="article-header">
			<span class="badge">AI Tool Analysis</span>
			<h1>v0 Security Patterns: When Fast UI Meets Vulnerable Code</h1>
			<p class="subtitle">v0 generates beautiful UI, but NEXT_PUBLIC_ secrets and missing auth slip through</p>
		</header>

		<section class="quick-answer">
			<h2>Quick Answer</h2>
			<p>
				<strong><a href="https://v0.dev">v0</a> is Vercel's AI UI generation tool that creates beautiful Next.js components from prompts.</strong> It excels at UI but commonly exposes secrets via NEXT_PUBLIC_ environment variables. According to <a href="https://vercel.com/blog/v0-vibe-coding-securely">Vercel's blog</a>, they've blocked 17,000+ deployments in a single month for exposed secrets. Check environment variables and add auth to Server Actions before production.
			</p>
		</section>

		<section>
			<h2>v0 Security Statistics</h2>
			<div class="stats-row">
				{#each stats as stat}
					<div class="stat-box">
						<span class="stat-value">{stat.value}</span>
						<span class="stat-label">{stat.label}</span>
						<span class="stat-source">Source: {stat.source}</span>
					</div>
				{/each}
			</div>
			<p class="source-note">
				Data from <a href="https://vercel.com/blog/v0-vibe-coding-securely">Vercel's official blog post</a> on secure vibe coding.
			</p>
		</section>

		<section>
			<h2>What is v0?</h2>
			<p>
				v0 is Vercel's AI-powered UI generation tool that creates React and Next.js components from text prompts or images. It's designed for rapid prototyping - describe what you want, and v0 generates production-ready components using <a href="https://ui.shadcn.com/">shadcn/ui</a>.
			</p>
			<div class="tool-profile">
				<div class="profile-row">
					<span class="profile-label">Company</span>
					<span class="profile-value">{toolInfo.company}</span>
				</div>
				<div class="profile-row">
					<span class="profile-label">Type</span>
					<span class="profile-value">{toolInfo.type}</span>
				</div>
				<div class="profile-row">
					<span class="profile-label">Target Users</span>
					<span class="profile-value">{toolInfo.targetUser}</span>
				</div>
				<div class="profile-row">
					<span class="profile-label">Security Posture</span>
					<span class="profile-value">{toolInfo.securityPosture}</span>
				</div>
				<div class="profile-row">
					<span class="profile-label">Top Issue</span>
					<span class="profile-value">{toolInfo.topIssue}</span>
				</div>
			</div>
		</section>

		<section>
			<h2>Why Does v0 Generate Vulnerable Code?</h2>
			<p>
				v0 optimizes for beautiful, functional UI components. Its strength is generating pixel-perfect React components from prompts or images. However, security features like authentication and server-side validation add complexity that slows down the "prompt to preview" experience.
			</p>
			<p>
				Additionally, v0 generates Next.js code which has confusing environment variable rules. The <code>NEXT_PUBLIC_</code> prefix exposes variables to the browser - many vibe coders don't understand this, and v0 doesn't always get it right when you ask it to "add Supabase" or "integrate OpenAI".
			</p>
			<p>
				Unlike <a href="/kb/vibe-coding-tools/bolt/">Bolt</a> which focuses on full-stack apps, v0's UI-first approach means backend security is secondary. It generates what looks right in the browser, not what's secure on the server.
			</p>
		</section>

		<section>
			<h2>What Security Issues Does v0 Generate?</h2>
			<p>
				Based on <a href="https://vercel.com/blog/v0-vibe-coding-securely">Vercel's security research</a> and our analysis, here are the 5 most common security patterns in v0-generated code:
			</p>

			{#each patterns as pattern}
				<div class="pattern-card">
					<div class="pattern-header">
						<h3>{pattern.name}</h3>
						<span class="badge badge-{pattern.severity.toLowerCase()}">{pattern.severity}</span>
					</div>
					<p>{pattern.description}</p>
					<p><strong>Why it happens:</strong> {pattern.whyHappens}</p>
					<p><strong>Prevalence:</strong> {pattern.prevalence}</p>

					<div class="code-comparison">
						<div class="code-panel vulnerable">
							<div class="code-panel-header">Vulnerable (v0 generates)</div>
							<pre><code>{pattern.vulnerableCode}</code></pre>
						</div>
						<div class="code-panel secure">
							<div class="code-panel-header">Secure (you should use)</div>
							<pre><code>{pattern.secureCode}</code></pre>
						</div>
					</div>

					<div class="pattern-links">
						<a href={pattern.cweLink} target="_blank" rel="noopener">{pattern.cweId}</a>
						<a href={pattern.link}>Related vulnerability</a>
					</div>
				</div>
			{/each}
		</section>

		<section>
			<h2>How Does v0 Compare to Other AI Tools?</h2>
			<p>
				Each AI coding tool has different security characteristics. v0's UI-first approach means its vulnerabilities differ from full-stack tools like <a href="/kb/vibe-coding-tools/bolt/">Bolt</a> or code-completion tools like <a href="/kb/vibe-coding-tools/cursor/">Cursor</a>:
			</p>

			<div class="comparison-stack">
				{#each toolComparison as row}
					<div class="comparison-row" class:highlight={row.tool === 'v0'}>
						<div class="comparison-tool"><strong>{row.tool}</strong></div>
						<div class="comparison-details">
							<div class="comparison-item">
								<span class="comparison-label">Security</span>
								<span class="comparison-value">{row.securityPosture}</span>
							</div>
							<div class="comparison-item">
								<span class="comparison-label">Target User</span>
								<span class="comparison-value">{row.targetUser}</span>
							</div>
							<div class="comparison-item">
								<span class="comparison-label">Top Issue</span>
								<span class="comparison-value">{row.topIssue}</span>
							</div>
							<div class="comparison-item">
								<span class="comparison-label">Best For</span>
								<span class="comparison-value">{row.bestFor}</span>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<section>
			<h2>What Security Measures Has Vercel Implemented?</h2>
			<p>
				Credit where due: Vercel has implemented several security measures for v0 and their platform:
			</p>
			<ul>
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

		<section class="fix-prompt">
			<h2>AI Fix Prompt for v0 Code</h2>
			<p>Copy this prompt to audit your v0-generated code for security issues:</p>

			<div class="prompt-box">
				<button class="copy-btn" onclick={copyPrompt}>
					{copied ? 'Copied!' : 'Copy'}
				</button>
				<pre>{aiFixPrompt}</pre>
			</div>
		</section>

		<section>
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

		<section>
			<h2>Related Security Guides</h2>
			<div class="related-grid">
				<a href="/kb/vibe-coding-tools/bolt/" class="card card-interactive">
					<h3>Bolt.new Security</h3>
					<p>Full-stack AI tool with similar security patterns</p>
				</a>
				<a href="/kb/vibe-coding-tools/cursor/" class="card card-interactive">
					<h3>Cursor Security</h3>
					<p>Code completion tool for experienced developers</p>
				</a>
				<a href="/kb/vibe-coding-tools/claude-code/" class="card card-interactive">
					<h3>Claude Code Security</h3>
					<p>Terminal-based AI with higher security awareness</p>
				</a>
				<a href="/kb/security/vulnerabilities/hardcoded-secrets/" class="card card-interactive">
					<h3>Hardcoded Secrets</h3>
					<p>Deep dive into NEXT_PUBLIC_ and secret exposure</p>
				</a>
				<a href="/kb/security/vulnerabilities/missing-auth/" class="card card-interactive">
					<h3>Missing Authentication</h3>
					<p>Protecting Server Actions and API routes</p>
				</a>
				<a href="/kb/security/stacks/nextjs-supabase/" class="card card-interactive">
					<h3>Next.js + Supabase Security</h3>
					<p>Secure patterns for v0's most common stack</p>
				</a>
			</div>
		</section>

		<section class="final-cta">
			<h2>Scan Your v0 Project for Security Issues</h2>
			<p>vibeship scanner detects NEXT_PUBLIC_ exposure, missing auth, and other patterns specific to AI-generated Next.js code.</p>
			<a href="https://scanner.vibeship.co" class="cta-button">Scan Your Code Free</a>
		</section>
	</article>
</div>

<style>
	.article-header {
		margin-bottom: 2rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid var(--border);
	}

	.article-header h1 {
		margin: 0.75rem 0 0.5rem;
	}

	.subtitle {
		color: var(--text-secondary);
		font-size: 1.125rem;
		margin: 0;
	}

	.stats-row {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.stat-source {
		display: block;
		font-size: 0.75rem;
		color: var(--text-tertiary);
		margin-top: 0.25rem;
	}

	.source-note {
		font-size: 0.875rem;
		color: var(--text-tertiary);
	}

	.tool-profile {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1rem;
		margin-top: 1rem;
	}

	.profile-row {
		display: flex;
		justify-content: space-between;
		padding: 0.5rem 0;
		border-bottom: 1px solid var(--border);
	}

	.profile-row:last-child {
		border-bottom: none;
	}

	.profile-label {
		color: var(--text-tertiary);
		font-size: 0.875rem;
	}

	.profile-value {
		font-weight: 500;
	}

	.pattern-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.pattern-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.pattern-header h3 {
		margin: 0;
		font-size: 1.125rem;
	}

	.pattern-links {
		display: flex;
		gap: 1.5rem;
		font-size: 0.875rem;
		margin-top: 1rem;
	}

	.code-comparison {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		margin: 1rem 0;
	}

	.code-panel {
		background: var(--bg-primary);
		border: 1px solid var(--border);
		overflow: hidden;
	}

	.code-panel.vulnerable {
		border-color: var(--red);
	}

	.code-panel.secure {
		border-color: var(--green);
	}

	.code-panel-header {
		padding: 0.5rem 1rem;
		font-size: 0.75rem;
		font-weight: 600;
		background: var(--bg-tertiary);
	}

	.vulnerable .code-panel-header {
		color: var(--red);
	}

	.secure .code-panel-header {
		color: var(--green);
	}

	.code-panel pre {
		margin: 0;
		padding: 1rem;
		font-size: 0.75rem;
		line-height: 1.5;
		overflow-x: auto;
	}

	.code-panel code {
		background: none;
		padding: 0;
	}

	/* Comparison Stack - mobile-friendly tool comparison */
	.comparison-stack {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin: 1rem 0;
	}

	.comparison-row {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1rem;
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		align-items: center;
	}

	.comparison-row.highlight {
		background: var(--green-muted);
		border-color: var(--green-dim);
	}

	.comparison-tool {
		min-width: 100px;
		font-size: 1rem;
	}

	.comparison-details {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem 2rem;
		flex: 1;
	}

	.comparison-item {
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
		min-width: 120px;
	}

	.comparison-label {
		font-size: 0.7rem;
		color: var(--text-tertiary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.comparison-value {
		font-size: 0.875rem;
		color: var(--text-primary);
	}

	@media (max-width: 600px) {
		.comparison-row {
			flex-direction: column;
			align-items: flex-start;
		}

		.comparison-tool {
			width: 100%;
			padding-bottom: 0.5rem;
			border-bottom: 1px solid var(--border);
			margin-bottom: 0.25rem;
		}

		.comparison-details {
			width: 100%;
		}

		.comparison-item {
			min-width: calc(50% - 0.5rem);
		}
	}

	.prompt-box {
		position: relative;
		margin-top: 1rem;
	}

	.copy-btn {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		padding: 0.5rem 1rem;
		background: var(--green);
		color: var(--bg-primary);
		border: none;
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
	}

	.prompt-box pre {
		background: var(--bg-primary);
		border: 1px solid var(--border);
		padding: 1rem;
		padding-top: 3rem;
		font-size: 0.8rem;
		line-height: 1.6;
		overflow-x: auto;
		white-space: pre-wrap;
	}

	@media (max-width: 768px) {
		.stats-row {
			grid-template-columns: 1fr;
		}

		.code-comparison {
			grid-template-columns: 1fr;
		}

		.pattern-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.5rem;
		}
	}
</style>
