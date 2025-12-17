<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Next.js + Supabase Security: 5 Critical Patterns',
		description: 'Secure your Next.js + Supabase vibe coded app. Learn RLS setup, key management, and Server Component security. Copy-paste fixes included.',
		url: '/kb/security/stacks/nextjs-supabase/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Stacks', href: '/kb/security/stacks' },
		{ label: 'Next.js + Supabase' }
	];

	// Security patterns
	const patterns = [
		{
			name: 'Missing Row Level Security (RLS)',
			severity: 'Critical',
			description: 'AI tools create database tables without enabling RLS. Without RLS, anyone with your Supabase anon key can read, write, and delete ALL data in your tables.',
			vulnerableCode: `-- AI generates tables without RLS
CREATE TABLE profiles (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  full_name TEXT,
  avatar_url TEXT
);
-- No RLS = anyone can read/write all profiles`,
			secureCode: `-- Enable RLS and add policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
ON profiles FOR SELECT
TO authenticated
USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can update their own profile"
ON profiles FOR UPDATE
TO authenticated
USING ((SELECT auth.uid()) = user_id)
WITH CHECK ((SELECT auth.uid()) = user_id);`,
			link: '/kb/security/vulnerabilities/idor/',
			cweLink: 'https://cwe.mitre.org/data/definitions/639.html'
		},
		{
			name: 'Overly Permissive RLS Policies',
			severity: 'High',
			description: 'When AI tools do add RLS, they often create overly permissive policies with USING (true) that allow any authenticated user to access any row.',
			vulnerableCode: `-- AI might generate this for "allow authenticated users"
CREATE POLICY "Authenticated users can do anything"
ON profiles FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);
-- Any logged-in user can access ANY profile`,
			secureCode: `-- Separate policies with proper ownership checks
CREATE POLICY "Users view own profile"
ON profiles FOR SELECT
TO authenticated
USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users insert own profile"
ON profiles FOR INSERT
TO authenticated
WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users update own profile"
ON profiles FOR UPDATE
TO authenticated
USING ((SELECT auth.uid()) = user_id)
WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users delete own profile"
ON profiles FOR DELETE
TO authenticated
USING ((SELECT auth.uid()) = user_id);`,
			link: '/kb/security/vulnerabilities/missing-auth/',
			cweLink: 'https://cwe.mitre.org/data/definitions/862.html'
		},
		{
			name: 'Service Key Exposed to Client',
			severity: 'Critical',
			description: 'AI tools sometimes use the service_role key in client-side code. This key bypasses ALL RLS policies, giving full database access to anyone who views your source.',
			vulnerableCode: `// VULNERABLE: Service key in client component
// components/AdminPanel.tsx (Client Component)
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY! // EXPOSED!
)
// Anyone can see this key in browser devtools`,
			secureCode: `// lib/supabase/client.ts (for client components)
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // Safe with RLS
)

// lib/supabase/server.ts (for server only)
import { createClient } from '@supabase/supabase-js'
import 'server-only' // Prevents accidental client import

export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!, // No NEXT_PUBLIC_ prefix
  process.env.SUPABASE_SERVICE_KEY! // Never exposed
)`,
			link: '/kb/security/vulnerabilities/hardcoded-secrets/',
			cweLink: 'https://cwe.mitre.org/data/definitions/798.html'
		},
		{
			name: 'Missing Auth in Server Actions',
			severity: 'High',
			description: 'Server Actions are callable from the client. AI tools generate actions without verifying the user is authenticated or authorized to perform the operation.',
			vulnerableCode: `// VULNERABLE: Server Action without auth
'use server'

export async function deletePost(postId: string) {
  // AI generates this - no auth check!
  await supabase.from('posts').delete().eq('id', postId)
}
// Anyone can delete any post by calling this action`,
			secureCode: `// SECURE: Always verify auth in Server Actions
'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function deletePost(postId: string) {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (name) => cookieStore.get(name)?.value } }
  )

  // Verify user is authenticated
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  // Verify user owns this post (defense in depth)
  const { data: post } = await supabase
    .from('posts')
    .select('user_id')
    .eq('id', postId)
    .single()

  if (post?.user_id !== user.id) throw new Error('Not authorized')

  await supabase.from('posts').delete().eq('id', postId)
}`,
			link: '/kb/security/vulnerabilities/missing-auth/',
			cweLink: 'https://cwe.mitre.org/data/definitions/306.html'
		},
		{
			name: 'Secrets Leaked via Props',
			severity: 'High',
			description: 'Server Components can access secrets, but props passed to Client Components are serialized and visible in the browser. AI tools often pass sensitive data directly.',
			vulnerableCode: `// VULNERABLE: Passing secrets to Client Component
// app/page.tsx (Server Component)
import ClientDashboard from './ClientDashboard'

export default async function Page() {
  const config = {
    apiKey: process.env.STRIPE_SECRET_KEY, // Will be exposed!
    dbUrl: process.env.DATABASE_URL
  }
  return <ClientDashboard config={config} />
}
// Secrets visible in browser devtools/source`,
			secureCode: `// SECURE: Fetch data on server, pass only public data
// app/page.tsx (Server Component)
import ClientDashboard from './ClientDashboard'
import { getPublicDashboardData } from '@/lib/data'

export default async function Page() {
  // Fetch data on server using secrets
  const dashboardData = await getPublicDashboardData()
  // Only pass sanitized, public data to client
  return <ClientDashboard data={dashboardData} />
}

// lib/data.ts
import 'server-only'

export async function getPublicDashboardData() {
  // Use secrets here, return only public data
  const response = await fetch(process.env.ANALYTICS_API_URL!, {
    headers: { 'Authorization': \`Bearer \${process.env.ANALYTICS_KEY}\` }
  })
  const data = await response.json()
  return { visitCount: data.visits, pageViews: data.pageViews }
}`,
			link: '/kb/security/vulnerabilities/hardcoded-secrets/',
			cweLink: 'https://cwe.mitre.org/data/definitions/200.html'
		}
	];

	// FAQ data
	const faqs = [
		{
			question: 'Is Supabase anon key safe to expose?',
			answer: 'Yes, but ONLY if Row Level Security (RLS) is enabled on every table. The anon key is designed to be public - it\'s meant for client-side code. RLS policies control what data the anon key can access. Without RLS, the anon key grants full read/write access to all tables.'
		},
		{
			question: 'How do I enable Row Level Security in Supabase?',
			answer: 'Run ALTER TABLE your_table ENABLE ROW LEVEL SECURITY; for each table. Then create policies using CREATE POLICY. You can also enable RLS in the Supabase Dashboard under Table Editor > RLS. Remember: enabling RLS without policies blocks ALL access by default.'
		},
		{
			question: 'What\'s the difference between anon key and service role key?',
			answer: 'The anon key respects RLS policies and is safe for client-side use. The service_role key BYPASSES all RLS policies and has full database access. Never expose the service role key to the client. Use it only in server-side code with import \'server-only\'.'
		},
		{
			question: 'Do Server Components in Next.js protect my secrets?',
			answer: 'Server Components can safely access secrets through environment variables without NEXT_PUBLIC_ prefix. However, any data you pass as props to Client Components gets serialized and sent to the browser. Use a Data Access Layer pattern and import \'server-only\' to prevent leaks.'
		},
		{
			question: 'How do I secure Next.js API routes with Supabase?',
			answer: 'Use the @supabase/ssr package with cookies() from next/headers to get the authenticated user. Always call supabase.auth.getUser() at the start of every route and return 401 if no user. Add RLS as a second layer of defense in case auth checks are bypassed.'
		}
	];

	// AI Fix Prompt
	const aiFixPrompt = `Review my Next.js + Supabase codebase for these security issues and fix them:

## 1. Row Level Security (RLS) Audit
- Check all tables in supabase/migrations/*.sql for \`ENABLE ROW LEVEL SECURITY\`
- For any table without RLS, add: \`ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;\`
- Check for overly permissive policies with \`USING (true)\` or \`WITH CHECK (true)\`
- Replace with ownership checks: \`USING ((SELECT auth.uid()) = user_id)\`

## 2. Key Exposure Check
- Search for \`SUPABASE_SERVICE\` or \`service_role\` in client-side files
- Ensure service key is ONLY in files with \`import 'server-only'\`
- Verify no secrets use \`NEXT_PUBLIC_\` prefix (except SUPABASE_URL and SUPABASE_ANON_KEY)

## 3. Server Action Security
- Check all files with \`'use server'\` directive
- Ensure each action calls \`supabase.auth.getUser()\` before mutations
- Add authorization checks (verify user owns the resource)
- Validate all input parameters

## 4. Server Component Props
- Search for \`process.env.\` in Server Components that pass props to Client Components
- Move secret usage into separate server-only data fetching functions
- Add \`import 'server-only'\` to files that access secrets

## 5. Create Missing RLS Policies
For each table, create policies for SELECT, INSERT, UPDATE, DELETE:
\`\`\`sql
CREATE POLICY "Users can view own rows"
ON table_name FOR SELECT
TO authenticated
USING ((SELECT auth.uid()) = user_id);
\`\`\`

After fixing, verify with Supabase Dashboard > Database > Security Advisor.

List all files you modified with before/after snippets.`;

	// Checklist items
	const checklistItems = [
		{ category: 'RLS', item: 'RLS enabled on ALL tables in public schema', critical: true },
		{ category: 'RLS', item: 'Each table has policies for SELECT, INSERT, UPDATE, DELETE', critical: true },
		{ category: 'RLS', item: 'No policies use USING (true) without conditions', critical: true },
		{ category: 'RLS', item: 'Policies check (SELECT auth.uid()) = user_id for ownership', critical: false },
		{ category: 'Keys', item: 'service_role key never in client code', critical: true },
		{ category: 'Keys', item: 'No secrets use NEXT_PUBLIC_ prefix', critical: true },
		{ category: 'Keys', item: 'Server-only files use import \'server-only\'', critical: false },
		{ category: 'Actions', item: 'Server Actions verify auth.getUser() before mutations', critical: true },
		{ category: 'Actions', item: 'Server Actions check resource ownership', critical: false },
		{ category: 'Components', item: 'No secrets passed as props to Client Components', critical: true },
		{ category: 'Components', item: 'Data Access Layer pattern used for secret access', critical: false }
	];

	let copied = $state(false);
	let copiedIndex = $state(-1);
	let promptCopied = $state(false);

	function copyCode(code: string, index: number) {
		navigator.clipboard.writeText(code);
		copied = true;
		copiedIndex = index;
		setTimeout(() => {
			copied = false;
			copiedIndex = -1;
		}, 2000);
	}

	function copyPrompt() {
		navigator.clipboard.writeText(aiFixPrompt);
		promptCopied = true;
		setTimeout(() => {
			promptCopied = false;
		}, 2000);
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

	<!-- Schema.org structured data -->
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

	<!-- Breadcrumb Schema -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"itemListElement": [
			{ "@type": "ListItem", "position": 1, "name": "Knowledge Base", "item": "https://vibeship.co/kb" },
			{ "@type": "ListItem", "position": 2, "name": "Security", "item": "https://vibeship.co/kb/security" },
			{ "@type": "ListItem", "position": 3, "name": "Stacks", "item": "https://vibeship.co/kb/security/stacks" },
			{ "@type": "ListItem", "position": 4, "name": "Next.js + Supabase" }
		]
	}
	</script>`}
</svelte:head>

<Header {breadcrumbs} />

<div class="content-wrapper">
	<article class="content-main content-wide">
		<!-- Header -->
		<header class="article-header">
			<div class="badge-row">
				<span class="badge">Stack Guide</span>
				<span class="badge">Next.js</span>
				<span class="badge">Supabase</span>
			</div>
			<h1>Next.js + Supabase Security</h1>
			<p class="text-secondary">5 critical security patterns for the most popular vibe coding stack</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Next.js + Supabase apps need five security patterns: enable RLS on every table, use policies for each operation, protect service keys, validate in Server Components, and secure Server Actions.</strong>
				AI tools often skip these - especially <a href="https://supabase.com/docs/guides/database/postgres/row-level-security" target="_blank" rel="noopener">Row Level Security</a> - leaving your database exposed.
			</p>
		</div>

		<!-- Stats Box -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">RLS</div>
				<div class="stat-label">Critical Feature</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">5</div>
				<div class="stat-label">Key Patterns</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">#1 Stack</div>
				<div class="stat-label">Vibe Coders</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Copy-Paste</div>
				<div class="stat-label">Fixes Included</div>
			</div>
		</div>

		<!-- Why This Stack -->
		<section class="article-section">
			<h2>Why does this stack need special attention?</h2>
			<p>
				Next.js + Supabase is the most popular stack for vibe coding full-stack apps. It's fast to set up, has great DX, and AI tools like <a href="/kb/vibe-coding-tools/cursor/">Cursor</a>, <a href="/kb/vibe-coding-tools/bolt/">Bolt</a>, and <a href="/kb/vibe-coding-tools/claude-code/">Claude Code</a> generate working code quickly.
			</p>
			<p>
				But there's a critical difference from traditional stacks: <strong>Supabase exposes your database directly via API</strong>. Your frontend talks directly to Postgres through Supabase's REST API. The ONLY thing protecting your data is Row Level Security (RLS).
			</p>
			<p>
				According to the <a href="https://owasp.org/www-project-api-security/" target="_blank" rel="noopener">OWASP API Security Top 10</a>, Broken Object Level Authorization (BOLA) has been the #1 API security risk since 2019. In Supabase terms, that means missing or misconfigured RLS policies. AI-generated vibe code almost never sets this up correctly.
			</p>
		</section>

		<!-- What is RLS -->
		<section class="article-section">
			<h2>What is Row Level Security?</h2>
			<p>
				Row Level Security (RLS) is a database-level firewall that checks every query against a policy you define. Think of it like hotel room keys: your key only opens YOUR room, even if you know other room numbers exist.
			</p>
			<p>
				Without RLS, anyone with your Supabase anon key (which is public in your frontend code) can query any row in any table. With RLS enabled and proper policies, each user can only access their own data - even if they try to manipulate queries.
			</p>
			<p>
				According to <a href="https://supabase.com/docs/guides/database/postgres/row-level-security" target="_blank" rel="noopener">Supabase documentation</a>, RLS must be enabled on ALL tables in the public schema. Tables without RLS are accessible to anyone with the anon key.
			</p>
		</section>

		<!-- Security Patterns -->
		<section class="article-section">
			<h2>What are the 5 critical security patterns?</h2>
			<p>These patterns address the most common security issues in vibe coded Next.js + Supabase apps:</p>

			{#each patterns as pattern, i}
				<div class="pattern-card">
					<div class="pattern-header">
						<h3>{pattern.name}</h3>
						<span class="badge badge-{pattern.severity.toLowerCase()}">{pattern.severity}</span>
					</div>
					<p class="pattern-description">
						{pattern.description}
						Reference: <a href={pattern.cweLink} target="_blank" rel="noopener">{pattern.cweLink.match(/(\d+)\.html/)?.[1] ? `CWE-${pattern.cweLink.match(/(\d+)\.html/)[1]}` : 'CWE'}</a>
					</p>

					<div class="code-comparison">
						<div class="code-block vulnerable">
							<div class="code-block-header">
								<span class="code-block-lang status-bad">VULNERABLE</span>
							</div>
							<pre><code>{pattern.vulnerableCode}</code></pre>
						</div>

						<div class="code-block secure">
							<div class="code-block-header">
								<span class="code-block-lang status-good">SECURE</span>
								<button class="copy-btn small" onclick={() => copyCode(pattern.secureCode, i)}>
									{copied && copiedIndex === i ? 'Copied!' : 'Copy'}
								</button>
							</div>
							<pre><code>{pattern.secureCode}</code></pre>
						</div>
					</div>

					<a href={pattern.link} class="pattern-link">
						Learn more about this vulnerability
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M5 12h14M12 5l7 7-7 7"/>
						</svg>
					</a>
				</div>
			{/each}
		</section>

		<!-- AI Fix Prompt -->
		<section class="article-section">
			<h2>AI fix prompt for Next.js + Supabase security</h2>
			<p>Copy this prompt and paste it into <a href="/kb/vibe-coding-tools/cursor/">Cursor</a>, <a href="/kb/vibe-coding-tools/claude-code/">Claude Code</a>, or <a href="/kb/vibe-coding-tools/bolt/">Bolt</a> to automatically find and fix security vulnerabilities in your vibe coded project:</p>

			<div class="prompt-box">
				<div class="prompt-header">
					<span class="prompt-label">AI Security Fix Prompt</span>
					<button class="copy-btn" onclick={copyPrompt}>
						{promptCopied ? 'Copied!' : 'Copy prompt'}
					</button>
				</div>
				<pre class="prompt-content">{aiFixPrompt}</pre>
			</div>

			<p class="prompt-note">After running this prompt, verify fixes using the <a href="https://supabase.com/docs/guides/database/database-advisors" target="_blank" rel="noopener">Supabase Security Advisor</a> in your dashboard.</p>
		</section>

		<!-- Security Checklist -->
		<section class="article-section">
			<h2>5-minute security audit checklist</h2>
			<p>Use this checklist before deploying your vibe coded Next.js + Supabase app to production:</p>

			<div class="checklist">
				{#each ['RLS', 'Keys', 'Actions', 'Components'] as category}
					<div class="checklist-category">
						<h4>{category}</h4>
						{#each checklistItems.filter(item => item.category === category) as item}
							<label class="checklist-item" class:critical={item.critical}>
								<input type="checkbox" />
								<span>{item.item}</span>
								{#if item.critical}
									<span class="critical-badge">Critical</span>
								{/if}
							</label>
						{/each}
					</div>
				{/each}
			</div>

			<p class="checklist-note">
				For automated detection, use <a href="https://supabase.com/docs/guides/deployment/going-into-prod" target="_blank" rel="noopener">Supabase's Production Checklist</a> and run <a href="https://scanner.vibeship.co">Vibeship Scanner</a> to catch issues in your codebase.
			</p>
		</section>

		<!-- CTA Box -->
		<div class="cta-box">
			<p><strong>Scan your Next.js + Supabase app</strong></p>
			<p class="cta-subtext">Find RLS issues, exposed keys, and missing auth checks automatically</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green">
				Scan your code free
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M5 12h14M12 5l7 7-7 7"/>
				</svg>
			</a>
		</div>

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
				<a href="/kb/security/vulnerabilities/idor/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">IDOR</div>
					<p class="related-card-description">When users can access each other's data</p>
				</a>
				<a href="/kb/security/vulnerabilities/missing-auth/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Missing Authentication</div>
					<p class="related-card-description">Unprotected API routes and endpoints</p>
				</a>
				<a href="/kb/security/vulnerabilities/hardcoded-secrets/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Hardcoded Secrets</div>
					<p class="related-card-description">API keys exposed in source code</p>
				</a>
				<a href="/kb/vibe-coding-tools/cursor/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Cursor</div>
					<p class="related-card-description">Security patterns in Cursor generated code</p>
				</a>
				<a href="/kb/vibe-coding-tools/bolt/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Bolt.new</div>
					<p class="related-card-description">Security patterns in Bolt generated apps</p>
				</a>
				<a href="/kb/security/vulnerabilities/sql-injection/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">SQL Injection</div>
					<p class="related-card-description">Database query manipulation</p>
				</a>
			</div>
		</section>
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

	/* Pattern Card */
	.pattern-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.pattern-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
		margin-bottom: 0.75rem;
	}

	.pattern-header h3 {
		margin: 0;
		font-size: 1.1rem;
	}

	.pattern-description {
		color: var(--text-secondary);
		margin-bottom: 1rem;
	}

	.pattern-description a {
		color: var(--green-dim);
		text-decoration: none;
	}

	.pattern-description a:hover {
		color: var(--green);
	}

	.pattern-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--green-dim);
		font-size: 0.875rem;
		text-decoration: none;
		margin-top: 1rem;
	}

	.pattern-link:hover {
		color: var(--green);
	}

	/* Code Comparison */
	.code-comparison {
		display: grid;
		gap: 1rem;
		margin: 1rem 0;
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

	.copy-btn.small {
		font-size: 0.7rem;
		padding: 0.25rem 0.5rem;
	}

	/* Prompt Box */
	.prompt-box {
		background: var(--bg-tertiary);
		border: 1px solid var(--border);
		margin: 1.5rem 0;
	}

	.prompt-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem 1rem;
		background: var(--bg-secondary);
		border-bottom: 1px solid var(--border);
	}

	.prompt-label {
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--green);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.prompt-content {
		padding: 1rem;
		margin: 0;
		font-size: 0.85rem;
		line-height: 1.6;
		color: var(--text-secondary);
		white-space: pre-wrap;
		font-family: 'JetBrains Mono', monospace;
		overflow-x: auto;
	}

	.prompt-note {
		font-size: 0.875rem;
		color: var(--text-secondary);
		margin-top: 0.75rem;
	}

	/* Checklist */
	.checklist {
		display: grid;
		gap: 1.5rem;
		margin: 1.5rem 0;
	}

	.checklist-category h4 {
		margin: 0 0 0.75rem;
		font-size: 0.9rem;
		color: var(--text-primary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.checklist-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.5rem 0;
		cursor: pointer;
		color: var(--text-secondary);
		font-size: 0.9rem;
	}

	.checklist-item input[type="checkbox"] {
		width: 1.25rem;
		height: 1.25rem;
		accent-color: var(--green);
	}

	.checklist-item span:not(.critical-badge) {
		flex: 1;
	}

	.critical-badge {
		flex: none;
		font-size: 0.7rem;
		padding: 0.125rem 0.5rem;
		background: var(--red);
		color: white;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.checklist-note {
		font-size: 0.875rem;
		color: var(--text-secondary);
		margin-top: 1rem;
	}

	/* CTA Box */
	.cta-box {
		background: var(--bg-secondary);
		border: 1px solid var(--green-dim);
		padding: 2rem;
		text-align: center;
		margin: 2rem 0;
	}

	.cta-box p {
		margin: 0 0 0.5rem;
		color: var(--text-primary);
	}

	.cta-subtext {
		color: var(--text-secondary) !important;
		font-size: 0.9rem;
		margin-bottom: 1.5rem !important;
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

	/* Severity badges */
	.badge-critical {
		background: var(--red);
		color: white;
	}

	.badge-high {
		background: var(--orange, #f97316);
		color: white;
	}

	.badge-medium {
		background: var(--yellow, #eab308);
		color: black;
	}

	@media (max-width: 768px) {
		.pattern-header {
			flex-direction: column;
			gap: 0.5rem;
		}
	}
</style>
