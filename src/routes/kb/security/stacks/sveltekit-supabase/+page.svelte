<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'SvelteKit + Supabase Security: Complete Checklist for Vibe Coders',
		description: 'Secure your SvelteKit + Supabase app. Learn RLS policies, hooks.server.ts auth, getUser() vs getSession(), and common AI-generated security mistakes.',
		url: '/kb/security/stacks/sveltekit-supabase/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Stacks', href: '/kb/security/stacks' },
		{ label: 'SvelteKit + Supabase' }
	];

	// Known CVEs
	const cves = [
		{
			id: 'CVE-2023-29003',
			description: 'CSRF bypass via Content-Type: text/plain',
			fixedIn: 'SvelteKit 1.15.1',
			link: 'https://github.com/advisories/GHSA-5p75-vc5g-8rv2'
		},
		{
			id: 'CVE-2024-53262',
			description: 'XSS via error.html template',
			fixedIn: 'SvelteKit 2.x',
			link: 'https://security.snyk.io/vuln/SNYK-JS-SVELTEJSKIT-5411362'
		},
		{
			id: 'CVE-2024-45047',
			description: 'XSS in Svelte SSR via custom toString()',
			fixedIn: 'Svelte 3.49.0+',
			link: 'https://nvd.nist.gov/vuln/detail/CVE-2024-45047'
		}
	];

	// Checklist items
	let checklist = $state([
		{ category: 'Authentication', item: 'Using getUser() instead of getSession() on server', checked: false },
		{ category: 'Authentication', item: 'Auth check in every +page.server.ts (not just layout)', checked: false },
		{ category: 'Authentication', item: 'hooks.server.ts properly configured', checked: false },
		{ category: 'Database', item: 'RLS enabled on all tables', checked: false },
		{ category: 'Database', item: 'RLS policies use auth.uid() not user_metadata', checked: false },
		{ category: 'Database', item: 'Views have security_invoker set', checked: false },
		{ category: 'Secrets', item: 'Service role key NOT in client code', checked: false },
		{ category: 'Secrets', item: 'No PUBLIC_ prefix on sensitive env vars', checked: false },
		{ category: 'Validation', item: 'Form actions validate with Zod', checked: false },
		{ category: 'Validation', item: 'Load functions select specific fields', checked: false },
		{ category: 'Config', item: 'CSRF checkOrigin enabled (default)', checked: false },
		{ category: 'Config', item: 'SvelteKit version >= 1.15.1', checked: false }
	]);

	// FAQ data for schema
	const faqs = [
		{
			question: 'How do I add authentication to SvelteKit with Supabase?',
			answer: 'Set up hooks.server.ts with createServerClient from @supabase/ssr, create a getUser helper on event.locals that uses auth.getUser() (not getSession), then check user in each +page.server.ts load function. See the complete hooks.server.ts example in this guide.'
		},
		{
			question: 'What is the difference between getSession and getUser in Supabase?',
			answer: 'getSession() reads from cookies without validation - attackers can spoof it. getUser() validates against Supabase Auth server. Always use getUser() on the server for auth decisions. getSession() is only safe client-side where you cannot trust data anyway.'
		},
		{
			question: 'Do I need RLS if I\'m using server-side auth?',
			answer: 'Yes. RLS is defense in depth. If your server code has a bug, RLS prevents data leakage. The anon key is in your client bundle - anyone can call Supabase directly. RLS ensures they only access their own data regardless of how they connect.'
		},
		{
			question: 'How do I protect routes in SvelteKit?',
			answer: 'Check auth in every +page.server.ts load function using locals.getUser(). Don\'t rely only on +layout.server.ts - it can be bypassed. Use throw redirect(303, \'/login\') when unauthenticated. Also use RLS as a backup layer.'
		},
		{
			question: 'Is the Supabase anon key safe to expose?',
			answer: 'Yes, the anon key is designed to be public. It only has permissions defined by your RLS policies. The service_role key is the dangerous one - it bypasses ALL RLS. Never expose service_role in client code or PUBLIC_ environment variables.'
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
			{"@type": "ListItem", "position": 3, "name": "Stacks", "item": "https://vibeship.co/kb/security/stacks"},
			{"@type": "ListItem", "position": 4, "name": "SvelteKit + Supabase"}
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
				<span class="badge badge-stack">Stack Guide</span>
				<span class="badge">SvelteKit</span>
				<span class="badge">Supabase</span>
			</div>
			<h1>SvelteKit + Supabase Security</h1>
			<p class="text-secondary">The complete security checklist for vibe coders using this popular stack</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>SvelteKit + Supabase is powerful but has security traps AI tools fall into.</strong>
				The biggest: using getSession() instead of getUser() on the server, missing RLS policies, and exposed service role keys.
				<a href="https://owasp.org/Top10/A01_2021-Broken_Access_Control/" target="_blank" rel="noopener">OWASP A01:2021</a>.
			</p>
		</div>

		<!-- Stack Overview -->
		<div class="stats-box">
			<h3>Stack Security Overview</h3>
			<div class="stack-grid">
				<div class="stack-item">
					<span class="stack-name">SvelteKit 2.x</span>
					<span class="stack-focus">hooks.server.ts, form actions, load functions</span>
				</div>
				<div class="stack-item">
					<span class="stack-name">Supabase</span>
					<span class="stack-focus">RLS policies, service role key</span>
				</div>
				<div class="stack-item">
					<span class="stack-name">Auth</span>
					<span class="stack-focus">JWT validation, session management</span>
				</div>
			</div>
		</div>

		<!-- Known CVEs -->
		<section>
			<h2>Known vulnerabilities in this stack</h2>
			<p>Keep your dependencies updated. These CVEs affected SvelteKit and Svelte:</p>

			<div class="cve-grid">
				{#each cves as cve}
					<div class="cve-card">
						<div class="cve-header">
							<span class="cve-id">{cve.id}</span>
							<span class="cve-fixed">Fixed: {cve.fixedIn}</span>
						</div>
						<p class="cve-desc">{cve.description}</p>
						<a href={cve.link} target="_blank" rel="noopener">View advisory</a>
					</div>
				{/each}
			</div>
		</section>

		<!-- Issue 1: getSession vs getUser -->
		<section>
			<h2>1. The getSession() vs getUser() trap</h2>
			<p>
				This is the #1 mistake in SvelteKit + Supabase vibe coded apps. AI tools like <a href="/kb/vibe-coding-tools/cursor/">Cursor</a> and <a href="/kb/vibe-coding-tools/claude-code/">Claude Code</a> generate this constantly because tutorials optimize for speed, not security.
			</p>

			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-label">Vulnerable - AI generates this</div>
					<pre><code>{`// +page.server.ts
export async function load({ locals }) {
  const { data: { session } } =
    await locals.supabase.auth.getSession()

  if (!session) {
    throw redirect(303, '/login')
  }

  // DANGER: session from cookies - can be spoofed!
  const userId = session.user.id
  // ... use userId for database queries
}`}</code></pre>
				</div>
				<div class="code-block secure">
					<div class="code-label">Secure - Always use getUser()</div>
					<pre><code>{`// +page.server.ts
export async function load({ locals }) {
  const { data: { user }, error } =
    await locals.supabase.auth.getUser()

  if (error || !user) {
    throw redirect(303, '/login')
  }

  // SAFE: validated against Supabase Auth server
  const userId = user.id
  // ... use userId for database queries
}`}</code></pre>
				</div>
			</div>

			<p>
				<strong>Why AI gets this wrong:</strong> <code>getSession()</code> is faster because it reads from cookies without a network call. But cookies can be modified by attackers. <code>getUser()</code> validates the token with Supabase Auth server.
			</p>
		</section>

		<!-- Issue 2: Missing RLS -->
		<section>
			<h2>2. Missing RLS policies</h2>
			<p>
				Tables without Row Level Security are readable by anyone with your anon key (which is in your client bundle). This is an <a href="/kb/security/vulnerabilities/idor/">IDOR vulnerability</a> waiting to happen.
			</p>

			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-label">Vulnerable - No RLS</div>
					<pre><code>{`-- Table created without RLS
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  full_name TEXT,
  avatar_url TEXT
);
-- Anyone can read/write ALL profiles!`}</code></pre>
				</div>
				<div class="code-block secure">
					<div class="code-label">Secure - RLS enabled with policies</div>
					<pre><code>{`-- Enable RLS and add policies
ALTER TABLE user_profiles
  ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);`}</code></pre>
				</div>
			</div>

			<p>
				RLS is defense in depth. Even if your server code has a bug, attackers can only access their own data. Read the <a href="https://supabase.com/docs/guides/database/postgres/row-level-security" target="_blank" rel="noopener">Supabase RLS documentation</a> for more patterns.
			</p>
		</section>

		<!-- Issue 3: Service Role Key -->
		<section>
			<h2>3. Service role key exposure</h2>
			<p>
				The service role key bypasses ALL RLS. Exposing it gives attackers full database access. This is often a <a href="/kb/security/vulnerabilities/hardcoded-secrets/">hardcoded secrets</a> issue.
			</p>

			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-label">Vulnerable - PUBLIC_ prefix</div>
					<pre><code>{`# .env (CATASTROPHIC!)
PUBLIC_SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
# This gets bundled into client code!`}</code></pre>
				</div>
				<div class="code-block secure">
					<div class="code-label">Secure - Server-only import</div>
					<pre><code>{`# .env
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
# No PUBLIC_ prefix = server-only

// +page.server.ts (only place to use it)
import { SUPABASE_SERVICE_ROLE_KEY }
  from '$env/static/private'`}</code></pre>
				</div>
			</div>

			<p>
				If you've exposed your service role key, rotate it immediately in the <a href="https://supabase.com/docs/guides/api/api-keys" target="_blank" rel="noopener">Supabase dashboard</a>. Check your Git history for accidental commits.
			</p>
		</section>

		<!-- Issue 4: hooks.server.ts -->
		<section>
			<h2>4. Proper hooks.server.ts setup</h2>
			<p>
				Your <code>hooks.server.ts</code> is the foundation of server-side auth. Without it, auth state is unreliable. Here's the complete secure setup from the <a href="https://supabase.com/docs/guides/auth/server-side/advanced-guide" target="_blank" rel="noopener">Supabase SSR guide</a>:
			</p>

			<div class="code-block secure">
				<div class="code-label">Complete hooks.server.ts setup</div>
				<pre><code>{`// src/hooks.server.ts
import { createServerClient } from '@supabase/ssr'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY }
  from '$env/static/public'
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createServerClient(
    PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get: (key) => event.cookies.get(key),
        set: (key, value, options) => {
          event.cookies.set(key, value, { ...options, path: '/' })
        },
        remove: (key, options) => {
          event.cookies.delete(key, { ...options, path: '/' })
        },
      },
    }
  )

  // IMPORTANT: Use getUser() not getSession()
  event.locals.getUser = async () => {
    const { data: { user }, error } =
      await event.locals.supabase.auth.getUser()
    if (error) return null
    return user
  }

  return resolve(event)
}`}</code></pre>
			</div>
		</section>

		<!-- Issue 5: Layout-only auth -->
		<section>
			<h2>5. Don't rely on layout-only auth checks</h2>
			<p>
				Auth checks in <code>+layout.server.ts</code> don't reliably protect child routes. SvelteKit can skip layouts in certain scenarios.
			</p>

			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-label">Vulnerable - Layout only</div>
					<pre><code>{`// +layout.server.ts
export async function load({ locals }) {
  const user = await locals.getUser()
  if (!user) throw redirect(303, '/login')
  return { user }
}

// Child +page.server.ts trusts parent
export async function load({ parent }) {
  const { user } = await parent()
  // Layout might be bypassed!
}`}</code></pre>
				</div>
				<div class="code-block secure">
					<div class="code-label">Secure - Check in each page</div>
					<pre><code>{`// +page.server.ts
export async function load({ locals }) {
  const user = await locals.getUser()
  if (!user) throw redirect(303, '/login')

  // Now safe to use user.id
  const { data } = await locals.supabase
    .from('profiles')
    .select('id, name, avatar_url')
    .eq('user_id', user.id)
    .single()

  return { profile: data }
}`}</code></pre>
				</div>
			</div>
		</section>

		<!-- Issue 6: Form Actions -->
		<section>
			<h2>6. Server-side validation in form actions</h2>
			<p>
				Client-side validation is UX, not security. Form actions must validate with <a href="https://zod.dev/" target="_blank" rel="noopener">Zod</a> or similar, and check auth. This prevents <a href="/kb/security/vulnerabilities/missing-auth/">missing auth</a> vulnerabilities.
			</p>

			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-label">Vulnerable - No validation</div>
					<pre><code>{`// +page.server.ts
export const actions = {
  updateProfile: async ({ request, locals }) => {
    const data = await request.formData()
    const name = data.get('name') // No validation!

    await locals.supabase
      .from('profiles')
      .update({ name })
      .eq('id', locals.user.id)
  }
}`}</code></pre>
				</div>
				<div class="code-block secure">
					<div class="code-label">Secure - Zod validation + auth</div>
					<pre><code>{`import { z } from 'zod'
import { fail } from '@sveltejs/kit'

const profileSchema = z.object({
  name: z.string().min(1).max(100),
  bio: z.string().max(500).optional()
})

export const actions = {
  updateProfile: async ({ request, locals }) => {
    const user = await locals.getUser()
    if (!user) return fail(401, { error: 'Unauthorized' })

    const data = await request.formData()
    const result = profileSchema.safeParse({
      name: data.get('name'),
      bio: data.get('bio')
    })

    if (!result.success) {
      return fail(400, { errors: result.error.flatten() })
    }

    await locals.supabase
      .from('profiles')
      .update(result.data)
      .eq('user_id', user.id)
  }
}`}</code></pre>
				</div>
			</div>
		</section>

		<!-- Issue 7: Views bypassing RLS -->
		<section>
			<h2>7. Views bypass RLS by default</h2>
			<p>
				PostgreSQL views run as the creator (postgres) by default, completely ignoring your RLS policies. Use <code>security_invoker</code> (Postgres 15+):
			</p>

			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-label">Vulnerable - View ignores RLS</div>
					<pre><code>{`CREATE VIEW public_user_data AS
  SELECT id, email, created_at
  FROM auth.users;
-- Exposes ALL users!`}</code></pre>
				</div>
				<div class="code-block secure">
					<div class="code-label">Secure - security_invoker</div>
					<pre><code>{`CREATE VIEW public_user_data
WITH (security_invoker = true) AS
  SELECT id, email, created_at
  FROM auth.users;
-- Respects RLS of calling user`}</code></pre>
				</div>
			</div>
		</section>

		<!-- Issue 8: user_metadata -->
		<section>
			<h2>8. Don't use user_metadata for authorization</h2>
			<p>
				Users can modify their own <code>user_metadata</code>. Using it for role checks is an authorization bypass vulnerability.
			</p>

			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-label">Vulnerable - user_metadata</div>
					<pre><code>{`CREATE POLICY "Admins can delete"
  ON posts FOR DELETE
  USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  );
-- Users can set their own role!`}</code></pre>
				</div>
				<div class="code-block secure">
					<div class="code-label">Secure - Separate admin table</div>
					<pre><code>{`CREATE POLICY "Admins can delete"
  ON posts FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid()
    )
  );
-- Only server can add to admin_users`}</code></pre>
				</div>
			</div>
		</section>

		<!-- Issue 9: Data exposure -->
		<section>
			<h2>9. Don't expose sensitive data from load functions</h2>
			<p>
				Everything returned from load() gets serialized and sent to the client. This is a <a href="/kb/security/vulnerabilities/sensitive-data-exposure/">sensitive data exposure</a> risk.
			</p>

			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-label">Vulnerable - select('*')</div>
					<pre><code>{`export async function load({ locals }) {
  const { data: user } = await locals.supabase
    .from('users')
    .select('*') // Returns everything!
    .single()

  return { user } // Sent to client!
}`}</code></pre>
				</div>
				<div class="code-block secure">
					<div class="code-label">Secure - Explicit fields</div>
					<pre><code>{`export async function load({ locals }) {
  const { data: user } = await locals.supabase
    .from('users')
    .select('id, name, email, avatar_url')
    .single()

  return { user } // Only safe fields
}`}</code></pre>
				</div>
			</div>
		</section>

		<!-- Issue 10: CSRF -->
		<section>
			<h2>10. Ensure CSRF protection is enabled</h2>
			<p>
				SvelteKit has built-in <a href="/kb/security/vulnerabilities/csrf/">CSRF protection</a>. Make sure it's not disabled. <a href="https://github.com/advisories/GHSA-5p75-vc5g-8rv2" target="_blank" rel="noopener">CVE-2023-29003</a> was a bypass fixed in 1.15.1.
			</p>

			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-label">Vulnerable - CSRF disabled</div>
					<pre><code>{`// svelte.config.js
export default {
  kit: {
    csrf: {
      checkOrigin: false // DANGEROUS!
    }
  }
}`}</code></pre>
				</div>
				<div class="code-block secure">
					<div class="code-label">Secure - Default (don't change)</div>
					<pre><code>{`// svelte.config.js
export default {
  kit: {
    csrf: {
      checkOrigin: true // Default - keep it
    }
  }
}`}</code></pre>
				</div>
			</div>
		</section>

		<!-- Security Checklist -->
		<section class="checklist-section">
			<h2>Security Checklist</h2>
			<p>Use this checklist before deploying your SvelteKit + Supabase app:</p>

			<div class="checklist-container">
				{#each ['Authentication', 'Database', 'Secrets', 'Validation', 'Config'] as category}
					<div class="checklist-category">
						<h4>{category}</h4>
						{#each checklist.filter(c => c.category === category) as item, i}
							<label class="checklist-item">
								<input type="checkbox" bind:checked={item.checked} />
								<span class:checked={item.checked}>{item.item}</span>
							</label>
						{/each}
					</div>
				{/each}
			</div>

			<p class="checklist-progress">
				{checklist.filter(c => c.checked).length} / {checklist.length} complete
			</p>
		</section>

		<!-- AI Fix Prompt -->
		<section class="fix-section">
			<h2>AI Fix Prompt for SvelteKit + Supabase</h2>
			<p>Copy this prompt to scan your vibe coded project:</p>

			<div class="prompt-box">
				<button class="copy-button" onclick={copyPrompt}>
					{copied ? 'Copied!' : 'Copy Prompt'}
				</button>
				<pre id="ai-fix-prompt">{`Review my SvelteKit + Supabase codebase for security vulnerabilities:

## 1. getSession() vs getUser() Check

Search for getSession() calls in server-side code:
- +page.server.ts, +layout.server.ts, hooks.server.ts, API routes

Pattern to find:
- auth.getSession() in any server file
- Using session.user for authorization decisions

Fix: Replace with auth.getUser() for all server-side auth.

## 2. RLS Policy Audit

For each table in supabase/migrations or schema.sql:
- Check: ALTER TABLE ... ENABLE ROW LEVEL SECURITY
- Verify SELECT/INSERT/UPDATE/DELETE policies exist
- Ensure policies use auth.uid() not user_metadata

## 3. Service Role Key Exposure

Search for service role key usage:
- PUBLIC_SUPABASE_SERVICE_ROLE anywhere
- createClient() with service role in client code
- Service role in +page.svelte or +layout.svelte

## 4. hooks.server.ts Security

Check src/hooks.server.ts for:
- Proper Supabase client with cookie handling
- getUser() helper (not getSession)
- Auth validation in handle function

## 5. Form Actions Validation

For each form action:
- Auth check with getUser() at start
- Input validation (Zod or similar)
- Proper error handling with fail()

## 6. Load Function Data Exposure

Check load functions for:
- select('*') usage (should be specific fields)
- Sensitive data in return statements

For each issue: show file, explain risk, provide fix.`}</pre>
			</div>
		</section>

		<!-- FAQs -->
		<section>
			<h2>Frequently Asked Questions</h2>
			{#each faqs as faq}
				<div class="faq-item">
					<h3>{faq.question}</h3>
					<p>{faq.answer}</p>
				</div>
			{/each}
		</section>

		<!-- Related Content -->
		<section>
			<h2>Related Content</h2>
			<div class="related-grid">
				<a href="/kb/security/stacks/nextjs-supabase/" class="related-card">
					<span class="related-type">Stack Guide</span>
					<span class="related-title">Next.js + Supabase Security</span>
				</a>
				<a href="/kb/security/vulnerabilities/sql-injection/" class="related-card">
					<span class="related-type">Vulnerability</span>
					<span class="related-title">SQL Injection</span>
				</a>
				<a href="/kb/security/vulnerabilities/xss/" class="related-card">
					<span class="related-type">Vulnerability</span>
					<span class="related-title">XSS</span>
				</a>
				<a href="/kb/security/vulnerabilities/missing-auth/" class="related-card">
					<span class="related-type">Vulnerability</span>
					<span class="related-title">Missing Authentication</span>
				</a>
				<a href="/kb/vibe-coding-tools/cursor/" class="related-card">
					<span class="related-type">AI Tool</span>
					<span class="related-title">Cursor Security Patterns</span>
				</a>
				<a href="/kb/vibe-coding-tools/claude-code/" class="related-card">
					<span class="related-type">AI Tool</span>
					<span class="related-title">Claude Code Security</span>
				</a>
			</div>
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
		border-radius: 4px;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		background: var(--surface-2, #333);
		color: var(--text-secondary, #aaa);
	}

	.badge-stack {
		background: #7c3aed;
		color: white;
	}

	h1 {
		font-size: 2.5rem;
		margin-bottom: 0.5rem;
	}

	.text-secondary {
		color: var(--text-secondary, #888);
		font-size: 1.1rem;
	}

	.quick-answer {
		background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%);
		border: 1px solid rgba(34, 197, 94, 0.3);
		border-radius: 8px;
		padding: 1.5rem;
		margin-bottom: 2rem;
	}

	.quick-answer-label {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		color: #22c55e;
		margin-bottom: 0.5rem;
	}

	.quick-answer-text {
		margin: 0;
		line-height: 1.6;
	}

	.stats-box {
		background: var(--surface-1, #1a1a1a);
		border: 1px solid var(--border, #333);
		border-radius: 8px;
		padding: 1.5rem;
		margin-bottom: 2rem;
	}

	.stats-box h3 {
		margin-top: 0;
		margin-bottom: 1rem;
	}

	.stack-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
	}

	.stack-item {
		padding: 1rem;
		background: var(--surface-2, #222);
		border-radius: 6px;
	}

	.stack-name {
		display: block;
		font-weight: 600;
		color: #22c55e;
		margin-bottom: 0.25rem;
	}

	.stack-focus {
		font-size: 0.875rem;
		color: var(--text-secondary, #888);
	}

	section {
		margin-bottom: 3rem;
	}

	h2 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--border, #333);
	}

	h3 {
		font-size: 1.1rem;
		margin-bottom: 0.5rem;
	}

	h4 {
		font-size: 1rem;
		margin-bottom: 0.5rem;
		color: var(--text-secondary, #888);
	}

	p {
		line-height: 1.7;
		margin-bottom: 1rem;
	}

	code {
		font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
		background: rgba(0,0,0,0.3);
		padding: 0.125rem 0.375rem;
		border-radius: 3px;
		font-size: 0.9em;
	}

	/* CVE Grid */
	.cve-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1rem;
		margin: 1rem 0;
	}

	.cve-card {
		background: var(--surface-1, #1a1a1a);
		border: 1px solid var(--border, #333);
		border-radius: 8px;
		padding: 1rem;
	}

	.cve-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.5rem;
	}

	.cve-id {
		font-weight: 600;
		color: #f59e0b;
	}

	.cve-fixed {
		font-size: 0.75rem;
		color: var(--text-secondary, #888);
	}

	.cve-desc {
		font-size: 0.875rem;
		margin-bottom: 0.5rem;
	}

	/* Code Blocks */
	.code-comparison {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		margin: 1rem 0;
	}

	@media (max-width: 768px) {
		.code-comparison {
			grid-template-columns: 1fr;
		}
	}

	.code-block {
		background: #0d0d0d;
		border-radius: 6px;
		overflow: hidden;
	}

	.code-block.vulnerable {
		border: 1px solid rgba(220, 38, 38, 0.3);
	}

	.code-block.secure {
		border: 1px solid rgba(34, 197, 94, 0.3);
	}

	.code-label {
		padding: 0.5rem 1rem;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
	}

	.vulnerable .code-label {
		background: rgba(220, 38, 38, 0.1);
		color: #f87171;
	}

	.secure .code-label {
		background: rgba(34, 197, 94, 0.1);
		color: #4ade80;
	}

	pre {
		margin: 0;
		padding: 1rem;
		overflow-x: auto;
		font-size: 0.8rem;
		line-height: 1.5;
	}

	pre code {
		background: transparent;
		padding: 0;
	}

	/* Checklist */
	.checklist-section {
		background: var(--surface-1, #1a1a1a);
		border-radius: 8px;
		padding: 1.5rem;
	}

	.checklist-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1.5rem;
	}

	.checklist-category {
		background: var(--surface-2, #222);
		border-radius: 6px;
		padding: 1rem;
	}

	.checklist-category h4 {
		margin-top: 0;
		color: #22c55e;
	}

	.checklist-item {
		display: flex;
		align-items: flex-start;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
		cursor: pointer;
	}

	.checklist-item input {
		margin-top: 0.25rem;
	}

	.checklist-item span {
		font-size: 0.875rem;
		line-height: 1.4;
	}

	.checklist-item span.checked {
		text-decoration: line-through;
		color: var(--text-secondary, #888);
	}

	.checklist-progress {
		text-align: center;
		margin-top: 1rem;
		font-weight: 600;
		color: #22c55e;
	}

	/* Fix Section */
	.fix-section {
		background: var(--surface-1, #1a1a1a);
		border-radius: 8px;
		padding: 1.5rem;
	}

	.prompt-box {
		position: relative;
		background: #0d0d0d;
		border-radius: 6px;
		overflow: hidden;
	}

	.copy-button {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		padding: 0.5rem 1rem;
		background: #22c55e;
		color: black;
		border: none;
		border-radius: 4px;
		font-size: 0.75rem;
		font-weight: 600;
		cursor: pointer;
	}

	.copy-button:hover {
		background: #16a34a;
	}

	/* FAQ Section */
	.faq-item {
		margin-bottom: 1.5rem;
	}

	.faq-item h3 {
		font-size: 1.1rem;
		margin-bottom: 0.5rem;
	}

	/* Related Content */
	.related-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
	}

	.related-card {
		display: block;
		padding: 1rem;
		background: var(--surface-1, #1a1a1a);
		border: 1px solid var(--border, #333);
		border-radius: 8px;
		text-decoration: none;
		transition: border-color 0.2s;
	}

	.related-card:hover {
		border-color: #22c55e;
	}

	.related-type {
		display: block;
		font-size: 0.75rem;
		color: var(--text-secondary, #888);
		text-transform: uppercase;
		margin-bottom: 0.25rem;
	}

	.related-title {
		display: block;
		font-weight: 600;
		color: var(--text-primary, #fff);
	}

	a {
		color: #22c55e;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
