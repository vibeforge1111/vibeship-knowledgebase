<script lang="ts">
	import { Header } from '$lib/components/layout';
	import { onMount } from 'svelte';

	function copyPrompt(event: MouseEvent) {
		const button = event.currentTarget as HTMLButtonElement;
		const pre = button.closest('.fix-prompt')?.querySelector('pre');
		if (pre) {
			navigator.clipboard.writeText(pre.textContent || '');
			const originalText = button.textContent;
			button.textContent = 'Copied!';
			setTimeout(() => button.textContent = originalText, 2000);
		}
	}

	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Broken Access Control' }
	];

	const faqs = [
		{
			question: 'What is broken access control?',
			answer:
				'Broken Access Control happens when users can access data or perform actions beyond their permissions. It includes viewing other users\' data (horizontal escalation), performing admin actions as a regular user (vertical escalation), or accessing unprotected functions. According to <a href="https://owasp.org/Top10/A01_2021-Broken_Access_Control/">OWASP</a>, 94% of applications tested had some form of broken access control, making it the #1 web vulnerability.'
		},
		{
			question: 'Why is broken access control OWASP #1?',
			answer:
				'Broken Access Control moved from #5 (2017) to #1 (2021) because it appears in nearly every application and is often critical when exploited. OWASP mapped over 318,000 CWE occurrences to this category. The rise of API-first development and AI-generated code has made it worse - AI tools reliably generate authentication but consistently miss authorization checks.'
		},
		{
			question: "What's the difference between authentication and authorization?",
			answer:
				'<strong>Authentication</strong> verifies who you are (login, password, token). <strong>Authorization</strong> verifies what you can do (permissions, roles, ownership). AI tools excel at authentication (middleware, session checks) but fail at authorization because they can\'t infer your business rules. A bouncer checks your ID (authentication), but a VIP pass determines which areas you can access (authorization).'
		},
		{
			question: 'How do I prevent IDOR vulnerabilities?',
			answer:
				'<a href="/kb/security/vulnerabilities/idor/">IDOR (Insecure Direct Object Reference)</a> is the most common form of broken access control. Prevent it by: 1) Always filtering database queries by the authenticated user\'s ID, 2) Using indirect references (UUIDs) instead of sequential IDs, 3) Implementing ownership checks before returning data, 4) Using framework features like Supabase RLS that enforce access at the database level.'
		},
		{
			question: 'How do AI tools cause access control issues?',
			answer:
				'AI tools like <a href="/kb/vibe-coding-tools/cursor/">Cursor</a> and <a href="/kb/vibe-coding-tools/claude-code/">Claude Code</a> are trained on tutorials that demonstrate authentication patterns but rarely cover authorization. When you prompt "create a user API," the AI generates routes with login checks but no ownership verification. According to <a href="https://www.endorlabs.com/learn/the-most-common-security-vulnerabilities-in-ai-generated-code">Endor Labs research</a>, access control issues are among the top vulnerabilities in AI-generated code.'
		}
	];

	let schemaData: object;

	onMount(() => {
		schemaData = {
			'@context': 'https://schema.org',
			'@graph': [
				{
					'@type': 'TechArticle',
					headline: "Broken Access Control: The #1 Web Vulnerability AI Tools Get Wrong",
					description:
						"Broken Access Control is OWASP's #1 vulnerability. AI tools generate code that checks authentication but forgets authorization. Learn patterns and fixes for Node.js, Python, and React.",
					author: {
						'@type': 'Organization',
						name: 'vibeship',
						url: 'https://vibeship.co'
					},
					publisher: {
						'@type': 'Organization',
						name: 'vibeship',
						url: 'https://vibeship.co'
					},
					datePublished: '2025-12-17',
					dateModified: '2025-12-17',
					mainEntityOfPage: {
						'@type': 'WebPage',
						'@id': 'https://vibeship.co/kb/security/vulnerabilities/broken-access-control/'
					},
					about: [
						{
							'@type': 'Thing',
							name: 'Broken Access Control',
							sameAs: 'https://cwe.mitre.org/data/definitions/284.html'
						},
						{
							'@type': 'Thing',
							name: 'OWASP A01:2021',
							sameAs: 'https://owasp.org/Top10/A01_2021-Broken_Access_Control/'
						}
					],
					keywords:
						'broken access control, OWASP A01, access control vulnerability, authorization vulnerability, IDOR, privilege escalation, vibe coding security'
				},
				{
					'@type': 'FAQPage',
					mainEntity: faqs.map((faq) => ({
						'@type': 'Question',
						name: faq.question,
						acceptedAnswer: {
							'@type': 'Answer',
							text: faq.answer.replace(/<[^>]*>/g, '')
						}
					}))
				},
				{
					'@type': 'BreadcrumbList',
					itemListElement: [
						{
							'@type': 'ListItem',
							position: 1,
							name: 'Home',
							item: 'https://vibeship.co'
						},
						{
							'@type': 'ListItem',
							position: 2,
							name: 'Knowledge Base',
							item: 'https://vibeship.co/kb/'
						},
						{
							'@type': 'ListItem',
							position: 3,
							name: 'Security',
							item: 'https://vibeship.co/kb/security/'
						},
						{
							'@type': 'ListItem',
							position: 4,
							name: 'Vulnerabilities',
							item: 'https://vibeship.co/kb/security/vulnerabilities/'
						},
						{
							'@type': 'ListItem',
							position: 5,
							name: 'Broken Access Control',
							item: 'https://vibeship.co/kb/security/vulnerabilities/broken-access-control/'
						}
					]
				}
			]
		};
	});
</script>

<svelte:head>
	<title>Broken Access Control in AI Code | VibeShip</title>
	<meta
		name="description"
		content="Broken Access Control is OWASP's #1 vulnerability. AI tools generate code that checks authentication but forgets authorization. Learn patterns and fixes for Node.js, Python, and React."
	/>
	<meta
		name="keywords"
		content="broken access control, OWASP A01, access control vulnerability, authorization vulnerability, IDOR, privilege escalation, vibe coding"
	/>
	<link rel="canonical" href="https://vibeship.co/kb/security/vulnerabilities/broken-access-control/" />
	<meta property="og:title" content="Broken Access Control: The #1 Web Vulnerability AI Tools Get Wrong" />
	<meta
		property="og:description"
		content="Broken Access Control is OWASP's #1 vulnerability. AI tools check authentication but forget authorization. Learn how to fix it."
	/>
	<meta property="og:url" content="https://vibeship.co/kb/security/vulnerabilities/broken-access-control/" />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Broken Access Control: The #1 Web Vulnerability AI Tools Get Wrong" />
	<meta
		name="twitter:description"
		content="OWASP's #1 vulnerability. AI tools check authentication but forget authorization."
	/>
	{#if schemaData}
		{@html `<script type="application/ld+json">${JSON.stringify(schemaData)}</script>`}
	{/if}
</svelte:head>

<Header {breadcrumbs} />

<div class="content-wrapper">
	<article class="content-main content-wide">
		<header class="article-header">
			<div class="meta-badges">
				<span class="badge badge-critical">Critical</span>
				<span class="badge badge-owasp">OWASP #1</span>
				<span class="badge badge-cwe">CWE-284</span>
			</div>
			<h1>Broken Access Control: The #1 Web Vulnerability AI Tools Get Wrong</h1>

			<div class="quick-answer">
				<strong>Quick Answer:</strong> Broken Access Control happens when users can access data or
				perform actions beyond their permissions. It's
				<a href="https://owasp.org/Top10/A01_2021-Broken_Access_Control/">OWASP's #1 vulnerability</a>
				because AI tools generate code that checks "are you logged in?" but forget "are you allowed to
				do this?" Always verify both authentication AND authorization on every request.
			</div>
		</header>

		<div class="stats-row">
			<div class="stat-card">
				<span class="stat-value">#1</span>
				<span class="stat-label">OWASP Ranking</span>
			</div>
			<div class="stat-card">
				<span class="stat-value">94%</span>
				<span class="stat-label">Apps Affected</span>
			</div>
			<div class="stat-card">
				<span class="stat-value">318K+</span>
				<span class="stat-label">CWE Occurrences</span>
			</div>
			<div class="stat-card">
				<span class="stat-value">40-48%</span>
				<span class="stat-label">AI Code Vuln Rate</span>
			</div>
		</div>

		<section class="content-section">
			<h2>What is Broken Access Control?</h2>

			<p>
				Broken Access Control is when users can act outside their intended permissions. Think of it
				like a nightclub: the bouncer checks your ID (authentication), but your VIP pass determines
				which areas you can access (authorization). Broken Access Control is when anyone with an ID
				can walk into the VIP section.
			</p>

			<p>
				According to <a href="https://owasp.org/Top10/A01_2021-Broken_Access_Control/">OWASP's 2021 analysis</a>,
				94% of applications tested had some form of broken access control. It moved from #5 in 2017
				to #1 in 2021, with over 318,000 CWE occurrences mapped to this category.
			</p>

			<p>
				For vibe coders using AI tools, this is critical: AI-generated code reliably implements
				authentication but consistently misses authorization. The result? Your app knows WHO is
				logged in but doesn't verify WHAT they're allowed to do.
			</p>

			<div class="key-concept">
				<h4>The Critical Distinction</h4>
				<ul>
					<li><strong>Authentication:</strong> Verifying who you are (login, password, token)</li>
					<li><strong>Authorization:</strong> Verifying what you can do (permissions, roles, ownership)</li>
				</ul>
				<p>AI tools excel at authentication. They fail at authorization.</p>
			</div>
		</section>

		<section class="content-section">
			<h2>Why AI Tools Get This Wrong</h2>

			<p>
				AI coding tools like <a href="/kb/vibe-coding-tools/cursor/">Cursor</a>,
				<a href="/kb/vibe-coding-tools/claude-code/">Claude Code</a>, and
				<a href="/kb/vibe-coding-tools/bolt/">Bolt</a> are trained on tutorials and documentation that
				demonstrate authentication patterns extensively. Authorization? Not so much.
			</p>

			<p>Here's what AI typically generates when you ask for "a user API":</p>

			<div class="code-block vulnerable">
				<div class="code-label">JavaScript - What AI Generates (VULNERABLE)</div>
				<pre><code>// AI generates this - checks authentication only
app.get('/api/users/:id', requireAuth, async (req, res) => &#123;
  const user = await db.users.findById(req.params.id)
  res.json(user) // Any authenticated user can access ANY user's data!
&#125;)</code></pre>
			</div>

			<p>What's missing? The authorization check:</p>

			<div class="code-block secure">
				<div class="code-label">JavaScript - What You Need (SECURE)</div>
				<pre><code>// What you need - authorization check added
app.get('/api/users/:id', requireAuth, async (req, res) => &#123;
  // Authorization: Can this user access this resource?
  if (req.user.id !== req.params.id && !req.user.isAdmin) &#123;
    return res.status(403).json(&#123; error: 'Forbidden' &#125;)
  &#125;
  const user = await db.users.findById(req.params.id)
  res.json(user)
&#125;)</code></pre>
			</div>

			<h3>Why This Happens</h3>

			<ol>
				<li><strong>Training data bias:</strong> Most tutorials show authentication, not authorization</li>
				<li><strong>Prompt ambiguity:</strong> "Create a user API" doesn't specify access rules</li>
				<li><strong>Functional focus:</strong> AI optimizes for "does it work?" not "is it secure?"</li>
				<li><strong>Context limitations:</strong> AI can't infer your business rules from code structure</li>
			</ol>

			<p>
				According to <a href="https://www.endorlabs.com/learn/the-most-common-security-vulnerabilities-in-ai-generated-code">Endor Labs research</a>,
				40-48% of AI-generated code contains security vulnerabilities, with access control issues
				being a leading category.
			</p>
		</section>

		<section class="content-section">
			<h2>Common Attack Patterns</h2>

			<h3>1. Vertical Privilege Escalation</h3>

			<p>
				A regular user performs admin-only actions. This happens when admin routes exist but don't
				verify the user's role.
			</p>

			<div class="code-block vulnerable">
				<div class="code-label">JavaScript - VULNERABLE</div>
				<pre><code>// No role check - any authenticated user can delete anyone
app.delete('/api/users/:id', requireAuth, async (req, res) => &#123;
  await db.users.delete(req.params.id)
  res.json(&#123; success: true &#125;)
&#125;)</code></pre>
			</div>

			<h3>2. Horizontal Privilege Escalation (<a href="/kb/security/vulnerabilities/idor/">IDOR</a>)</h3>

			<p>
				User A accesses User B's data by changing an ID in the URL. This is the most common form of
				broken access control in vibe coded applications.
			</p>

			<div class="code-block">
				<div class="code-label">HTTP Request</div>
				<pre><code>GET /api/orders/1001  ← Your order
GET /api/orders/1002  ← Someone else's order (attacker just changes the number)</code></pre>
			</div>

			<h3>3. Missing Function-Level Access Control</h3>

			<p>
				Sensitive routes exist without any protection. AI sometimes generates admin routes accessible
				to anyone.
			</p>

			<div class="code-block vulnerable">
				<div class="code-label">JavaScript - VULNERABLE</div>
				<pre><code>// Route exists but has no authentication or authorization
app.post('/api/admin/reset-database', async (req, res) => &#123;
  await db.reset() // Anyone can hit this endpoint!
  res.json(&#123; success: true &#125;)
&#125;)</code></pre>
			</div>

			<h3>4. Metadata Manipulation</h3>

			<p>
				Attackers modify hidden fields or JWT claims to escalate privileges. Never trust role
				information from client input.
			</p>

			<div class="code-block vulnerable">
				<div class="code-label">JavaScript - VULNERABLE</div>
				<pre><code>// Trusting client-sent role - attacker sends &#123; role: 'admin' &#125;
const &#123; userId, role &#125; = req.body
if (role === 'admin') &#123;
  // Grant admin access - but attacker controls this value!
&#125;</code></pre>
			</div>
		</section>

		<section class="content-section">
			<h2>Code Patterns to Find</h2>

			<p>Search your vibe coded project for these vulnerable patterns:</p>

			<h3>Node.js/Express</h3>

			<div class="code-block">
				<div class="code-label">Patterns to Search For</div>
				<pre><code>// RED FLAG: requireAuth middleware but no ownership check
app.get('/api/resource/:id', requireAuth, handler)

// RED FLAG: User-supplied ID used directly
const item = await db.items.findById(req.params.id)

// RED FLAG: No filter by authenticated user
const orders = await db.orders.findMany() // Returns ALL orders</code></pre>
			</div>

			<h3>Next.js Server Actions</h3>

			<div class="code-block vulnerable">
				<div class="code-label">TypeScript - VULNERABLE</div>
				<pre><code>// RED FLAG: Server Action without authorization
export async function deleteUser(userId: string) &#123;
  // No check who's calling this!
  await db.users.delete(&#123; where: &#123; id: userId &#125;&#125;)
&#125;</code></pre>
			</div>

			<h3>Python/FastAPI</h3>

			<div class="code-block vulnerable">
				<div class="code-label">Python - VULNERABLE</div>
				<pre><code># RED FLAG: No ownership verification
@app.get("/orders/&#123;order_id&#125;")
async def get_order(order_id: int, user: User = Depends(get_current_user)):
    return await Order.get(order_id)  # Returns ANY order</code></pre>
			</div>

			<div class="warning-box">
				<strong>Key Pattern:</strong> If you see <code>findById(req.params.id)</code> or similar
				without a <code>userId</code> filter, that's almost certainly an
				<a href="/kb/security/vulnerabilities/idor/">IDOR vulnerability</a>.
			</div>
		</section>

		<section class="content-section">
			<h2>How to Fix</h2>

			<h3>Principle 1: Deny by Default</h3>

			<p>Every route should deny access unless explicitly authorized. Never assume neutrality.</p>

			<div class="code-block secure">
				<div class="code-label">JavaScript - SECURE</div>
				<pre><code>// Deny by default - explicit role check
app.delete('/api/users/:id', requireAuth, requireAdmin, async (req, res) => &#123;
  await db.users.delete(req.params.id)
  res.json(&#123; success: true &#125;)
&#125;)</code></pre>
			</div>

			<h3>Principle 2: Verify Ownership on Every Request</h3>

			<p>Always filter database queries by the authenticated user's ID.</p>

			<div class="code-block secure">
				<div class="code-label">JavaScript - SECURE</div>
				<pre><code>// SECURE: Always filter by user
app.get('/api/orders/:id', requireAuth, async (req, res) => &#123;
  const order = await db.orders.findFirst(&#123;
    where: &#123;
      id: req.params.id,
      userId: req.user.id  // Ownership check - critical!
    &#125;
  &#125;)

  if (!order) &#123;
    return res.status(404).json(&#123; error: 'Not found' &#125;)
  &#125;

  res.json(order)
&#125;)</code></pre>
			</div>

			<h3>Principle 3: Server-Side Validation Only</h3>

			<p>Never trust client-sent role or permission data. Always verify against server-side session.</p>

			<div class="code-block secure">
				<div class="code-label">JavaScript - SECURE</div>
				<pre><code>// SECURE: Get role from server session, not request body
app.post('/api/admin/action', requireAuth, async (req, res) => &#123;
  // Role from session (server-controlled), NOT req.body
  if (req.user.role !== 'admin') &#123;
    return res.status(403).json(&#123; error: 'Admin access required' &#125;)
  &#125;
  // Proceed with admin action
&#125;)</code></pre>
			</div>

			<h3>Principle 4: Use Framework Security Features</h3>

			<p>Modern frameworks provide built-in access control. Use them instead of rolling your own.</p>

			<ul>
				<li>
					<strong><a href="/kb/security/stacks/nextjs-supabase/">Supabase RLS</a>:</strong> Row Level
					Security enforces access at the database level
				</li>
				<li><strong>Next.js Middleware:</strong> Centralized route protection</li>
				<li><strong>Express middleware:</strong> Reusable authorization checks</li>
			</ul>
		</section>

		<section class="content-section">
			<h2>Framework-Specific Guidance</h2>

			<h3>Next.js</h3>

			<p>
				Use <a href="https://nextjs.org/docs/app/building-your-application/routing/middleware">Next.js middleware</a>
				for route protection and always verify authorization in Server Actions.
			</p>

			<div class="code-block secure">
				<div class="code-label">TypeScript - middleware.ts</div>
				<pre><code>import &#123; NextResponse &#125; from 'next/server'
import type &#123; NextRequest &#125; from 'next/server'

export function middleware(request: NextRequest) &#123;
  const session = request.cookies.get('session')

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) &#123;
    if (!session) &#123;
      return NextResponse.redirect(new URL('/login', request.url))
    &#125;
    // Additional role check needed in the actual route
  &#125;

  return NextResponse.next()
&#125;</code></pre>
			</div>

			<h3>Supabase RLS</h3>

			<p>
				<a href="https://supabase.com/docs/guides/auth/row-level-security">Row Level Security</a> is
				your best defense. Enable it on every table and use <code>auth.uid()</code> in policies.
			</p>

			<div class="code-block secure">
				<div class="code-label">SQL - Supabase RLS Policy</div>
				<pre><code>-- Enable RLS on the orders table
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Users can only see their own orders
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can only update their own orders
CREATE POLICY "Users can update own orders" ON orders
  FOR UPDATE
  USING (auth.uid() = user_id);</code></pre>
			</div>

			<div class="warning-box">
				<strong>Critical:</strong> Supabase RLS is disabled by default on new tables. Always enable it
				and create policies before storing user data. See our
				<a href="/kb/security/stacks/nextjs-supabase/">Next.js + Supabase security guide</a> for complete
				setup.
			</div>

			<h3>Express Middleware Pattern</h3>

			<div class="code-block secure">
				<div class="code-label">JavaScript - Authorization Middleware</div>
				<pre><code>// Reusable authorization middleware
const requireOwnership = (resourceGetter) => async (req, res, next) => &#123;
  const resource = await resourceGetter(req.params.id)

  if (!resource) &#123;
    return res.status(404).json(&#123; error: 'Not found' &#125;)
  &#125;

  if (resource.userId !== req.user.id && !req.user.isAdmin) &#123;
    return res.status(403).json(&#123; error: 'Forbidden' &#125;)
  &#125;

  req.resource = resource
  next()
&#125;

// Usage
app.get('/api/orders/:id',
  requireAuth,
  requireOwnership((id) => db.orders.findById(id)),
  (req, res) => res.json(req.resource)
)</code></pre>
			</div>
		</section>

		<section class="content-section">
			<h2>AI Fix Prompt: Audit for Broken Access Control</h2>

			<p>
				Copy this prompt into <a href="/kb/vibe-coding-tools/cursor/">Cursor</a>,
				<a href="/kb/vibe-coding-tools/claude-code/">Claude Code</a>, or any AI assistant to audit your
				codebase:
			</p>

			<div class="fix-prompt">
				<div class="fix-prompt-header">
					<span>AI Security Audit Prompt</span>
					<button class="copy-btn" onclick={copyPrompt}>Copy</button>
				</div>
				<pre>Review my codebase for Broken Access Control vulnerabilities (OWASP A01:2021):

## Check 1: Authentication vs Authorization
For every protected route, verify:
- Is authentication required? (who are you?)
- Is authorization checked? (what can you do?)
- Flag routes with auth middleware but no authorization logic

Look for patterns like:
- requireAuth middleware followed by direct database access
- getServerSession() without ownership checks
- Depends(get_current_user) without permission verification

## Check 2: Direct Object References (IDOR)
Search for these vulnerable patterns:
- findById(req.params.id) without ownership filter
- findUnique(&#123; where: &#123; id &#125; &#125;) without userId check
- SELECT * WHERE id = $1 without AND user_id = $2
- Database queries using user-supplied IDs directly

For each one found, recommend adding:
- where: &#123; userId: req.user.id &#125; for Prisma
- .eq('user_id', user.id) for Supabase
- AND user_id = $user_id for raw SQL

## Check 3: Role-Based Access Control
For admin routes (/admin/*, /api/admin/*), verify:
- Role check exists (req.user.role === 'admin')
- Role is from server-side session, NOT client input
- Flag any role checks using req.body, req.query, or cookies

## Check 4: Server Actions (Next.js)
For each Server Action, verify:
- Uses getServerSession() or equivalent
- Checks user ownership before mutations
- Doesn't trust client-sent user IDs

## Check 5: Supabase/Database RLS
If using Supabase:
- List all tables with RLS disabled
- Check if policies use auth.uid()
- Flag any use of service_role key in client code

## Output Format
For each vulnerability found:
1. File path and line number
2. The vulnerable code pattern
3. Attack scenario (how an attacker exploits it)
4. Secure replacement code
5. Severity: Critical/High/Medium

Prioritize by severity and provide copy-paste fixes.</pre>
			</div>
		</section>

		<section class="content-section">
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

		<section class="content-section">
			<h2>Related Security Topics</h2>
			<div class="related-grid">
				<a href="/kb/security/vulnerabilities/idor/" class="card card-interactive">
					<h3>IDOR Vulnerabilities</h3>
					<p>The most common form of broken access control. Learn how to prevent users from accessing each other's data.</p>
				</a>
				<a href="/kb/security/vulnerabilities/missing-auth/" class="card card-interactive">
					<h3>Missing Authentication</h3>
					<p>When API routes have no protection at all. A related but distinct vulnerability.</p>
				</a>
				<a href="/kb/security/vulnerabilities/csrf/" class="card card-interactive">
					<h3>CSRF Protection</h3>
					<p>Cross-Site Request Forgery can bypass access controls. Understand the relationship.</p>
				</a>
				<a href="/kb/security/stacks/nextjs-supabase/" class="card card-interactive">
					<h3>Next.js + Supabase Security</h3>
					<p>Complete guide to implementing proper access control with RLS and middleware.</p>
				</a>
			</div>
		</section>

		<section class="final-cta">
			<h2>Scan Your Vibe Coded Project</h2>
			<p>
				vibeship scanner automatically detects broken access control patterns in AI-generated code,
				including IDOR, missing authorization, and unprotected admin routes.
			</p>
			<a href="https://scanner.vibeship.co" class="cta-button">Try vibeship scanner Free</a>
		</section>
	</article>
</div>

<style>
	.article-header {
		margin-bottom: 2rem;
	}

	.meta-badges {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1rem;
		flex-wrap: wrap;
	}

	.badge-critical {
		background: var(--red);
		color: var(--bg-primary);
	}

	.badge-owasp {
		background: var(--orange);
		color: var(--bg-primary);
	}

	.badge-cwe {
		background: var(--blue);
		color: var(--bg-primary);
	}

	.stats-row {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
		margin-bottom: 2rem;
	}

	@media (max-width: 640px) {
		.stats-row {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.stat-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1rem;
		text-align: center;
	}

	.stat-value {
		display: block;
		font-size: 1.5rem;
		font-weight: 800;
		color: var(--red);
	}

	.stat-label {
		display: block;
		font-size: 0.75rem;
		color: var(--text-secondary);
		text-transform: uppercase;
		margin-top: 0.25rem;
	}

	.content-section {
		margin-bottom: 2.5rem;
	}

	.key-concept {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-left: 3px solid var(--green);
		padding: 1rem 1.25rem;
		margin: 1.5rem 0;
	}

	.key-concept h4 {
		color: var(--text-primary);
		margin-top: 0;
	}

	.key-concept ul {
		margin-bottom: 0.5rem;
	}

	.key-concept > p:last-child {
		margin-bottom: 0;
		font-weight: 600;
		color: var(--green-dim);
	}

	.warning-box {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-left: 3px solid var(--orange);
		padding: 1rem 1.25rem;
		margin: 1.5rem 0;
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

	.code-label {
		padding: 0.5rem 1rem;
		font-size: 0.875rem;
		font-weight: 600;
		background: var(--bg-secondary);
		color: var(--text-primary);
	}

	.code-block.vulnerable .code-label {
		color: var(--red);
	}

	.code-block.secure .code-label {
		color: var(--green);
	}

	.code-block pre {
		margin: 0;
		padding: 1rem;
		background: var(--bg-tertiary);
		overflow-x: auto;
	}

	.code-block code {
		font-size: 0.8125rem;
		line-height: 1.6;
	}

	.fix-prompt {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		margin: 1.5rem 0;
	}

	.fix-prompt-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem 1rem;
		background: var(--bg-tertiary);
		border-bottom: 1px solid var(--border);
	}

	.fix-prompt-header span {
		font-weight: 600;
		color: var(--text-primary);
	}

	.copy-btn {
		padding: 0.25rem 0.75rem;
		background: var(--green-dim);
		color: var(--bg-primary);
		border: none;
		font-size: 0.75rem;
		cursor: pointer;
	}

	.copy-btn:hover {
		background: var(--green);
	}

	.fix-prompt pre {
		margin: 0;
		padding: 1rem;
		background: var(--bg-tertiary);
		font-size: 0.8125rem;
		line-height: 1.6;
		overflow-x: auto;
		white-space: pre-wrap;
	}
</style>
