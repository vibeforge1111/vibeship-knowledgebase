<script lang="ts">
	import { onMount } from 'svelte';

	// FAQ accordion state using Svelte 5 runes
	let openFaq = $state<number | null>(null);

	function toggleFaq(index: number) {
		openFaq = openFaq === index ? null : index;
	}

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
				'AI tools like <a href="/kb/vibe-coding-tools/cursor/">Cursor</a> and <a href="/kb/vibe-coding-tools/claude-code/">Claude Code</a> are trained on tutorials that demonstrate authentication patterns but rarely cover authorization. When you prompt "create a user API," the AI generates routes with login checks but no ownership verification. Studies show 40-48% of AI-generated code contains security vulnerabilities, with access control being a top category.'
		}
	];

	// Schema.org structured data
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
						name: 'VibeShip',
						url: 'https://vibeship.co'
					},
					publisher: {
						'@type': 'Organization',
						name: 'VibeShip',
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

		const script = document.createElement('script');
		script.type = 'application/ld+json';
		script.textContent = JSON.stringify(schemaData);
		document.head.appendChild(script);

		return () => {
			script.remove();
		};
	});
</script>

<svelte:head>
	<title>Broken Access Control: The #1 Web Vulnerability AI Tools Get Wrong | VibeShip</title>
	<meta
		name="description"
		content="Broken Access Control is OWASP's #1 vulnerability. AI tools generate code that checks authentication but forgets authorization. Learn patterns and fixes for Node.js, Python, and React."
	/>
	<meta
		name="keywords"
		content="broken access control, OWASP A01, access control vulnerability, authorization vulnerability, IDOR, privilege escalation, vibe coding"
	/>
	<link rel="canonical" href="https://vibeship.co/kb/security/vulnerabilities/broken-access-control/" />

	<!-- Open Graph -->
	<meta property="og:title" content="Broken Access Control: The #1 Web Vulnerability AI Tools Get Wrong" />
	<meta
		property="og:description"
		content="Broken Access Control is OWASP's #1 vulnerability. AI tools check authentication but forget authorization. Learn how to fix it."
	/>
	<meta property="og:url" content="https://vibeship.co/kb/security/vulnerabilities/broken-access-control/" />
	<meta property="og:type" content="article" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Broken Access Control: The #1 Web Vulnerability AI Tools Get Wrong" />
	<meta
		name="twitter:description"
		content="OWASP's #1 vulnerability. AI tools check authentication but forget authorization."
	/>
</svelte:head>

<div class="article-container">
	<!-- Breadcrumb Navigation -->
	<nav class="breadcrumb" aria-label="Breadcrumb">
		<ol>
			<li><a href="/">Home</a></li>
			<li><a href="/kb/">Knowledge Base</a></li>
			<li><a href="/kb/security/">Security</a></li>
			<li><a href="/kb/security/vulnerabilities/">Vulnerabilities</a></li>
			<li><span aria-current="page">Broken Access Control</span></li>
		</ol>
	</nav>

	<article class="vulnerability-article">
		<!-- Article Header -->
		<header class="article-header">
			<div class="meta-badges">
				<span class="badge badge-critical">Critical</span>
				<span class="badge badge-owasp"
					><a
						href="https://owasp.org/Top10/A01_2021-Broken_Access_Control/"
						target="_blank"
						rel="noopener">OWASP #1</a
					></span
				>
				<span class="badge badge-cwe"
					><a href="https://cwe.mitre.org/data/definitions/284.html" target="_blank" rel="noopener"
						>CWE-284</a
					></span
				>
			</div>

			<h1>Broken Access Control: The #1 Web Vulnerability AI Tools Get Wrong</h1>

			<p class="subtitle">
				AI tools generate code that checks "are you logged in?" but forget "are you allowed to do this?"
			</p>

			<!-- Quick Answer Box -->
			<div class="quick-answer">
				<strong>Quick Answer:</strong>
				Broken Access Control happens when users can access data or perform actions beyond their permissions. It's
				<a href="https://owasp.org/Top10/A01_2021-Broken_Access_Control/" target="_blank" rel="noopener">OWASP's #1 vulnerability</a>
				because AI tools generate code that checks "are you logged in?" but forget "are you allowed to do this?" Always verify both authentication AND authorization on every request.
			</div>
		</header>

		<!-- Stats Box -->
		<div class="stats-box">
			<div class="stat-item">
				<span class="stat-value">#1</span>
				<span class="stat-label">OWASP Ranking</span>
			</div>
			<div class="stat-item">
				<span class="stat-value">94%</span>
				<span class="stat-label">Apps Affected</span>
			</div>
			<div class="stat-item">
				<span class="stat-value">318K+</span>
				<span class="stat-label">CWE Occurrences</span>
			</div>
			<div class="stat-item">
				<span class="stat-value">40-48%</span>
				<span class="stat-label">AI Code Vuln Rate</span>
			</div>
		</div>

		<!-- Table of Contents -->
		<nav class="toc">
			<h2>Contents</h2>
			<ol>
				<li><a href="#what-is-broken-access-control">What is Broken Access Control?</a></li>
				<li><a href="#why-ai-tools-fail">Why AI Tools Get This Wrong</a></li>
				<li><a href="#attack-patterns">Common Attack Patterns</a></li>
				<li><a href="#code-patterns">Code Patterns to Find</a></li>
				<li><a href="#how-to-fix">How to Fix</a></li>
				<li><a href="#framework-guidance">Framework-Specific Guidance</a></li>
				<li><a href="#ai-fix-prompt">AI Fix Prompt</a></li>
				<li><a href="#faq">FAQ</a></li>
			</ol>
		</nav>

		<!-- Section 1: What is Broken Access Control? -->
		<section id="what-is-broken-access-control">
			<h2>What is Broken Access Control?</h2>

			<p>
				Broken Access Control is when users can act outside their intended permissions. Think of it like a nightclub: the bouncer checks your ID (authentication), but your VIP pass determines which areas you can access (authorization). Broken Access Control is when anyone with an ID can walk into the VIP section.
			</p>

			<p>
				According to <a href="https://owasp.org/Top10/A01_2021-Broken_Access_Control/" target="_blank" rel="noopener">OWASP's 2021 analysis</a>, 94% of applications tested had some form of broken access control. It moved from #5 in 2017 to #1 in 2021, with over 318,000 CWE occurrences mapped to this category.
			</p>

			<p>
				For vibe coders using AI tools, this is critical: AI-generated code reliably implements authentication but consistently misses authorization. The result? Your app knows WHO is logged in but doesn't verify WHAT they're allowed to do.
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

		<!-- Section 2: Why AI Tools Fail -->
		<section id="why-ai-tools-fail">
			<h2>Why AI Tools Get This Wrong</h2>

			<p>
				AI coding tools like <a href="/kb/vibe-coding-tools/cursor/">Cursor</a>, <a href="/kb/vibe-coding-tools/claude-code/">Claude Code</a>, and <a href="/kb/vibe-coding-tools/bolt/">Bolt</a> are trained on tutorials and documentation that demonstrate authentication patterns extensively. Authorization? Not so much.
			</p>

			<p>Here's what AI typically generates when you ask for "a user API":</p>

			<div class="code-block">
				<div class="code-header">
					<span class="code-lang">JavaScript - What AI Generates (VULNERABLE)</span>
				</div>
				<pre><code>{`// AI generates this - checks authentication only
app.get('/api/users/:id', requireAuth, async (req, res) => {
  const user = await db.users.findById(req.params.id)
  res.json(user) // Any authenticated user can access ANY user's data!
})`}</code></pre>
			</div>

			<p>What's missing? The authorization check:</p>

			<div class="code-block">
				<div class="code-header">
					<span class="code-lang">JavaScript - What You Need (SECURE)</span>
				</div>
				<pre><code>{`// What you need - authorization check added
app.get('/api/users/:id', requireAuth, async (req, res) => {
  // Authorization: Can this user access this resource?
  if (req.user.id !== req.params.id && !req.user.isAdmin) {
    return res.status(403).json({ error: 'Forbidden' })
  }
  const user = await db.users.findById(req.params.id)
  res.json(user)
})`}</code></pre>
			</div>

			<h3>Why This Happens</h3>

			<ol>
				<li><strong>Training data bias:</strong> Most tutorials show authentication, not authorization</li>
				<li><strong>Prompt ambiguity:</strong> "Create a user API" doesn't specify access rules</li>
				<li><strong>Functional focus:</strong> AI optimizes for "does it work?" not "is it secure?"</li>
				<li><strong>Context limitations:</strong> AI can't infer your business rules from code structure</li>
			</ol>

			<p>
				According to <a href="https://www.endorlabs.com/learn/the-most-common-security-vulnerabilities-in-ai-generated-code" target="_blank" rel="noopener">Endor Labs research</a>, 40-48% of AI-generated code contains security vulnerabilities, with access control issues being a leading category.
			</p>
		</section>

		<!-- Section 3: Attack Patterns -->
		<section id="attack-patterns">
			<h2>Common Attack Patterns</h2>

			<h3>1. Vertical Privilege Escalation</h3>

			<p>A regular user performs admin-only actions. This happens when admin routes exist but don't verify the user's role.</p>

			<div class="code-block">
				<div class="code-header">
					<span class="code-lang">JavaScript - VULNERABLE</span>
				</div>
				<pre><code>{`// No role check - any authenticated user can delete anyone
app.delete('/api/users/:id', requireAuth, async (req, res) => {
  await db.users.delete(req.params.id)
  res.json({ success: true })
})`}</code></pre>
			</div>

			<h3>2. Horizontal Privilege Escalation (<a href="/kb/security/vulnerabilities/idor/">IDOR</a>)</h3>

			<p>User A accesses User B's data by changing an ID in the URL. This is the most common form of broken access control in vibe coded applications.</p>

			<div class="code-block">
				<div class="code-header">
					<span class="code-lang">HTTP Request</span>
				</div>
				<pre><code>{`GET /api/orders/1001  ← Your order
GET /api/orders/1002  ← Someone else's order (attacker just changes the number)`}</code></pre>
			</div>

			<h3>3. Missing Function-Level Access Control</h3>

			<p>Sensitive routes exist without any protection. AI sometimes generates admin routes accessible to anyone.</p>

			<div class="code-block">
				<div class="code-header">
					<span class="code-lang">JavaScript - VULNERABLE</span>
				</div>
				<pre><code>{`// Route exists but has no authentication or authorization
app.post('/api/admin/reset-database', async (req, res) => {
  await db.reset() // Anyone can hit this endpoint!
  res.json({ success: true })
})`}</code></pre>
			</div>

			<h3>4. Metadata Manipulation</h3>

			<p>Attackers modify hidden fields or JWT claims to escalate privileges. Never trust role information from client input.</p>

			<div class="code-block">
				<div class="code-header">
					<span class="code-lang">JavaScript - VULNERABLE</span>
				</div>
				<pre><code>{`// Trusting client-sent role - attacker sends { role: 'admin' }
const { userId, role } = req.body
if (role === 'admin') {
  // Grant admin access - but attacker controls this value!
}`}</code></pre>
			</div>
		</section>

		<!-- Section 4: Code Patterns to Find -->
		<section id="code-patterns">
			<h2>Code Patterns to Find</h2>

			<p>Search your vibe coded project for these vulnerable patterns:</p>

			<h3>Node.js/Express</h3>

			<div class="code-block">
				<div class="code-header">
					<span class="code-lang">Patterns to Search For</span>
				</div>
				<pre><code>{`// RED FLAG: requireAuth middleware but no ownership check
app.get('/api/resource/:id', requireAuth, handler)

// RED FLAG: User-supplied ID used directly
const item = await db.items.findById(req.params.id)

// RED FLAG: No filter by authenticated user
const orders = await db.orders.findMany() // Returns ALL orders`}</code></pre>
			</div>

			<h3>Next.js Server Actions</h3>

			<div class="code-block">
				<div class="code-header">
					<span class="code-lang">TypeScript - VULNERABLE</span>
				</div>
				<pre><code>{`// RED FLAG: Server Action without authorization
export async function deleteUser(userId: string) {
  // No check who's calling this!
  await db.users.delete({ where: { id: userId }})
}`}</code></pre>
			</div>

			<h3>Python/FastAPI</h3>

			<div class="code-block">
				<div class="code-header">
					<span class="code-lang">Python - VULNERABLE</span>
				</div>
				<pre><code>{`# RED FLAG: No ownership verification
@app.get("/orders/{order_id}")
async def get_order(order_id: int, user: User = Depends(get_current_user)):
    return await Order.get(order_id)  # Returns ANY order`}</code></pre>
			</div>

			<div class="warning-box">
				<strong>Key Pattern:</strong> If you see <code>findById(req.params.id)</code> or similar without a <code>userId</code> filter, that's almost certainly an <a href="/kb/security/vulnerabilities/idor/">IDOR vulnerability</a>.
			</div>
		</section>

		<!-- Section 5: How to Fix -->
		<section id="how-to-fix">
			<h2>How to Fix</h2>

			<h3>Principle 1: Deny by Default</h3>

			<p>Every route should deny access unless explicitly authorized. Never assume neutrality.</p>

			<div class="code-block">
				<div class="code-header">
					<span class="code-lang">JavaScript - SECURE</span>
				</div>
				<pre><code>{`// Deny by default - explicit role check
app.delete('/api/users/:id', requireAuth, requireAdmin, async (req, res) => {
  await db.users.delete(req.params.id)
  res.json({ success: true })
})`}</code></pre>
			</div>

			<h3>Principle 2: Verify Ownership on Every Request</h3>

			<p>Always filter database queries by the authenticated user's ID.</p>

			<div class="code-block">
				<div class="code-header">
					<span class="code-lang">JavaScript - SECURE</span>
				</div>
				<pre><code>{`// SECURE: Always filter by user
app.get('/api/orders/:id', requireAuth, async (req, res) => {
  const order = await db.orders.findFirst({
    where: {
      id: req.params.id,
      userId: req.user.id  // Ownership check - critical!
    }
  })

  if (!order) {
    return res.status(404).json({ error: 'Not found' })
  }

  res.json(order)
})`}</code></pre>
			</div>

			<h3>Principle 3: Server-Side Validation Only</h3>

			<p>Never trust client-sent role or permission data. Always verify against server-side session.</p>

			<div class="code-block">
				<div class="code-header">
					<span class="code-lang">JavaScript - SECURE</span>
				</div>
				<pre><code>{`// SECURE: Get role from server session, not request body
app.post('/api/admin/action', requireAuth, async (req, res) => {
  // Role from session (server-controlled), NOT req.body
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' })
  }
  // Proceed with admin action
})`}</code></pre>
			</div>

			<h3>Principle 4: Use Framework Security Features</h3>

			<p>
				Modern frameworks provide built-in access control. Use them instead of rolling your own.
			</p>

			<ul>
				<li><strong><a href="/kb/security/stacks/nextjs-supabase/">Supabase RLS</a>:</strong> Row Level Security enforces access at the database level</li>
				<li><strong>Next.js Middleware:</strong> Centralized route protection</li>
				<li><strong>Express middleware:</strong> Reusable authorization checks</li>
			</ul>
		</section>

		<!-- Section 6: Framework-Specific Guidance -->
		<section id="framework-guidance">
			<h2>Framework-Specific Guidance</h2>

			<h3>Next.js</h3>

			<p>
				Use <a href="https://nextjs.org/docs/app/building-your-application/routing/middleware" target="_blank" rel="noopener">Next.js middleware</a> for route protection and always verify authorization in Server Actions.
			</p>

			<div class="code-block">
				<div class="code-header">
					<span class="code-lang">TypeScript - middleware.ts</span>
				</div>
				<pre><code>{`import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session')

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    // Additional role check needed in the actual route
  }

  return NextResponse.next()
}`}</code></pre>
			</div>

			<h3>Supabase RLS</h3>

			<p>
				<a href="https://supabase.com/docs/guides/auth/row-level-security" target="_blank" rel="noopener">Row Level Security</a> is your best defense. Enable it on every table and use <code>auth.uid()</code> in policies.
			</p>

			<div class="code-block">
				<div class="code-header">
					<span class="code-lang">SQL - Supabase RLS Policy</span>
				</div>
				<pre><code>{`-- Enable RLS on the orders table
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Users can only see their own orders
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can only update their own orders
CREATE POLICY "Users can update own orders" ON orders
  FOR UPDATE
  USING (auth.uid() = user_id);`}</code></pre>
			</div>

			<div class="warning-box">
				<strong>Critical:</strong> Supabase RLS is disabled by default on new tables. Always enable it and create policies before storing user data. See our <a href="/kb/security/stacks/nextjs-supabase/">Next.js + Supabase security guide</a> for complete setup.
			</div>

			<h3>Express Middleware Pattern</h3>

			<div class="code-block">
				<div class="code-header">
					<span class="code-lang">JavaScript - Authorization Middleware</span>
				</div>
				<pre><code>{`// Reusable authorization middleware
const requireOwnership = (resourceGetter) => async (req, res, next) => {
  const resource = await resourceGetter(req.params.id)

  if (!resource) {
    return res.status(404).json({ error: 'Not found' })
  }

  if (resource.userId !== req.user.id && !req.user.isAdmin) {
    return res.status(403).json({ error: 'Forbidden' })
  }

  req.resource = resource
  next()
}

// Usage
app.get('/api/orders/:id',
  requireAuth,
  requireOwnership((id) => db.orders.findById(id)),
  (req, res) => res.json(req.resource)
)`}</code></pre>
			</div>
		</section>

		<!-- Section 7: AI Fix Prompt -->
		<section id="ai-fix-prompt">
			<h2>AI Fix Prompt: Audit for Broken Access Control</h2>

			<p>
				Copy this prompt into <a href="/kb/vibe-coding-tools/cursor/">Cursor</a>, <a href="/kb/vibe-coding-tools/claude-code/">Claude Code</a>, or any AI assistant to audit your codebase:
			</p>

			<div class="code-block">
				<div class="code-header">
					<span class="code-lang">AI Security Audit Prompt</span>
					<button
						class="copy-btn"
						onclick={(e) =>
							navigator.clipboard.writeText(
								e.currentTarget.parentElement?.nextElementSibling?.textContent || ''
							)}
					>
						Copy
					</button>
				</div>
				<pre><code>{`Review my codebase for Broken Access Control vulnerabilities (OWASP A01:2021):

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
- findUnique({ where: { id } }) without userId check
- SELECT * WHERE id = $1 without AND user_id = $2
- Database queries using user-supplied IDs directly

For each one found, recommend adding:
- where: { userId: req.user.id } for Prisma
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

Prioritize by severity and provide copy-paste fixes.`}</code></pre>
			</div>
		</section>

		<!-- FAQ Section -->
		<section id="faq" class="faq-section">
			<h2>Frequently Asked Questions</h2>

			<div class="faq-list">
				{#each faqs as faq, index}
					<div class="faq-item" class:open={openFaq === index}>
						<button
							class="faq-question"
							onclick={() => toggleFaq(index)}
							aria-expanded={openFaq === index}
						>
							<span>{faq.question}</span>
							<svg
								class="faq-icon"
								width="20"
								height="20"
								viewBox="0 0 20 20"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M5 7.5L10 12.5L15 7.5"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</button>
						{#if openFaq === index}
							<div class="faq-answer">
								<p>{@html faq.answer}</p>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</section>

		<!-- Related Content -->
		<section class="related-content">
			<h2>Related Articles</h2>

			<div class="related-grid">
				<a href="/kb/security/vulnerabilities/idor/" class="related-card">
					<h3>IDOR Vulnerabilities</h3>
					<p>The most common form of broken access control. Learn how to prevent users from accessing each other's data.</p>
				</a>
				<a href="/kb/security/vulnerabilities/missing-auth/" class="related-card">
					<h3>Missing Authentication</h3>
					<p>When API routes have no protection at all. A related but distinct vulnerability.</p>
				</a>
				<a href="/kb/security/vulnerabilities/csrf/" class="related-card">
					<h3>CSRF Protection</h3>
					<p>Cross-Site Request Forgery can bypass access controls. Understand the relationship.</p>
				</a>
				<a href="/kb/security/stacks/nextjs-supabase/" class="related-card">
					<h3>Next.js + Supabase Security</h3>
					<p>Complete guide to implementing proper access control with RLS and middleware.</p>
				</a>
			</div>
		</section>

		<!-- CTA Section -->
		<section class="cta-section">
			<div class="cta-box">
				<h2>Scan Your Vibe Coded Project</h2>
				<p>
					VibeShip Scanner automatically detects broken access control patterns in AI-generated code, including IDOR, missing authorization, and unprotected admin routes.
				</p>
				<a href="https://scanner.vibeship.co" class="cta-button">Try VibeShip Scanner Free →</a>
			</div>
		</section>
	</article>
</div>

<style>
	/* Article Container */
	.article-container {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	/* Breadcrumb */
	.breadcrumb ol {
		display: flex;
		flex-wrap: wrap;
		list-style: none;
		padding: 0;
		margin: 0 0 2rem 0;
		font-size: 0.875rem;
	}

	.breadcrumb li:not(:last-child)::after {
		content: '/';
		margin: 0 0.5rem;
		color: #6b7280;
	}

	.breadcrumb a {
		color: #3b82f6;
		text-decoration: none;
	}

	.breadcrumb a:hover {
		text-decoration: underline;
	}

	.breadcrumb span[aria-current] {
		color: #6b7280;
	}

	/* Article Header */
	.article-header {
		margin-bottom: 2rem;
	}

	.meta-badges {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.badge {
		display: inline-block;
		padding: 0.25rem 0.75rem;
		border-radius: 9999px;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
	}

	.badge a {
		color: inherit;
		text-decoration: none;
	}

	.badge a:hover {
		text-decoration: underline;
	}

	.badge-critical {
		background-color: #fef2f2;
		color: #dc2626;
		border: 1px solid #fecaca;
	}

	.badge-owasp {
		background-color: #fefce8;
		color: #ca8a04;
		border: 1px solid #fef08a;
	}

	.badge-cwe {
		background-color: #f0f9ff;
		color: #0284c7;
		border: 1px solid #bae6fd;
	}

	h1 {
		font-size: 2.25rem;
		font-weight: 800;
		line-height: 1.2;
		margin: 0 0 1rem 0;
		color: #111827;
	}

	.subtitle {
		font-size: 1.25rem;
		color: #4b5563;
		margin: 0 0 1.5rem 0;
	}

	/* Quick Answer Box */
	.quick-answer {
		background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
		border: 1px solid #93c5fd;
		border-radius: 0.75rem;
		padding: 1.25rem;
		margin-bottom: 2rem;
	}

	.quick-answer strong {
		color: #1e40af;
	}

	.quick-answer a {
		color: #2563eb;
	}

	/* Stats Box */
	.stats-box {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
		background-color: #f9fafb;
		border: 1px solid #e5e7eb;
		border-radius: 0.75rem;
		padding: 1.5rem;
		margin-bottom: 2rem;
	}

	.stat-item {
		text-align: center;
	}

	.stat-value {
		display: block;
		font-size: 1.5rem;
		font-weight: 800;
		color: #dc2626;
	}

	.stat-label {
		display: block;
		font-size: 0.75rem;
		color: #6b7280;
		text-transform: uppercase;
		margin-top: 0.25rem;
	}

	/* Table of Contents */
	.toc {
		background-color: #f9fafb;
		border: 1px solid #e5e7eb;
		border-radius: 0.75rem;
		padding: 1.5rem;
		margin-bottom: 2rem;
	}

	.toc h2 {
		font-size: 1rem;
		font-weight: 600;
		margin: 0 0 1rem 0;
		color: #374151;
	}

	.toc ol {
		margin: 0;
		padding-left: 1.25rem;
	}

	.toc li {
		margin-bottom: 0.5rem;
	}

	.toc a {
		color: #3b82f6;
		text-decoration: none;
	}

	.toc a:hover {
		text-decoration: underline;
	}

	/* Sections */
	section {
		margin-bottom: 3rem;
	}

	section h2 {
		font-size: 1.5rem;
		font-weight: 700;
		margin: 0 0 1rem 0;
		color: #111827;
		padding-top: 1rem;
	}

	section h3 {
		font-size: 1.25rem;
		font-weight: 600;
		margin: 1.5rem 0 0.75rem 0;
		color: #1f2937;
	}

	section h4 {
		font-size: 1.1rem;
		font-weight: 600;
		margin: 1.25rem 0 0.5rem 0;
		color: #374151;
	}

	section p {
		color: #374151;
		line-height: 1.75;
		margin-bottom: 1rem;
	}

	section ul,
	section ol {
		color: #374151;
		line-height: 1.75;
		margin-bottom: 1rem;
		padding-left: 1.5rem;
	}

	section li {
		margin-bottom: 0.5rem;
	}

	section a {
		color: #2563eb;
		text-decoration: none;
	}

	section a:hover {
		text-decoration: underline;
	}

	section code {
		background-color: #f3f4f6;
		padding: 0.125rem 0.375rem;
		border-radius: 0.25rem;
		font-size: 0.875em;
		font-family: 'Fira Code', 'Consolas', monospace;
	}

	/* Key Concept Box */
	.key-concept {
		background-color: #f0fdf4;
		border: 1px solid #86efac;
		border-left: 4px solid #22c55e;
		border-radius: 0.5rem;
		padding: 1rem 1.25rem;
		margin: 1.5rem 0;
	}

	.key-concept h4 {
		color: #166534;
		margin-top: 0;
	}

	.key-concept ul {
		margin-bottom: 0.5rem;
	}

	.key-concept p {
		margin-bottom: 0;
		font-weight: 600;
		color: #166534;
	}

	/* Warning Box */
	.warning-box {
		background-color: #fef3c7;
		border: 1px solid #f59e0b;
		border-left: 4px solid #f59e0b;
		border-radius: 0.5rem;
		padding: 1rem 1.25rem;
		margin: 1.5rem 0;
	}

	.warning-box strong {
		color: #92400e;
	}

	.warning-box a {
		color: #b45309;
	}

	/* Code Block */
	.code-block {
		margin: 1.5rem 0;
		border-radius: 0.75rem;
		overflow: hidden;
		background-color: #1f2937;
	}

	.code-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem 1rem;
		background-color: #374151;
	}

	.code-lang {
		font-size: 0.75rem;
		font-weight: 600;
		color: #9ca3af;
		text-transform: uppercase;
	}

	.copy-btn {
		padding: 0.25rem 0.75rem;
		font-size: 0.75rem;
		font-weight: 500;
		color: #d1d5db;
		background-color: #4b5563;
		border: none;
		border-radius: 0.375rem;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	.copy-btn:hover {
		background-color: #6b7280;
	}

	.code-block pre {
		margin: 0;
		padding: 1.25rem;
		overflow-x: auto;
	}

	.code-block code {
		font-family: 'Fira Code', 'Consolas', monospace;
		font-size: 0.875rem;
		line-height: 1.6;
		color: #e5e7eb;
		background: none;
		padding: 0;
	}

	/* FAQ Section */
	.faq-section {
		margin-top: 3rem;
	}

	.faq-list {
		border: 1px solid #e5e7eb;
		border-radius: 0.75rem;
		overflow: hidden;
	}

	.faq-item {
		border-bottom: 1px solid #e5e7eb;
	}

	.faq-item:last-child {
		border-bottom: none;
	}

	.faq-question {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 1.25rem;
		background: none;
		border: none;
		cursor: pointer;
		text-align: left;
		font-size: 1rem;
		font-weight: 600;
		color: #111827;
		transition: background-color 0.2s;
	}

	.faq-question:hover {
		background-color: #f9fafb;
	}

	.faq-icon {
		flex-shrink: 0;
		transition: transform 0.2s;
		color: #6b7280;
	}

	.faq-item.open .faq-icon {
		transform: rotate(180deg);
	}

	.faq-answer {
		padding: 0 1.25rem 1.25rem;
		color: #4b5563;
		line-height: 1.75;
	}

	.faq-answer p {
		margin: 0;
	}

	.faq-answer a {
		color: #2563eb;
	}

	.faq-answer code {
		background-color: #f3f4f6;
		padding: 0.125rem 0.375rem;
		border-radius: 0.25rem;
		font-size: 0.875em;
	}

	/* Related Content */
	.related-content {
		margin-top: 3rem;
		padding-top: 2rem;
		border-top: 1px solid #e5e7eb;
	}

	.related-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1rem;
		margin-top: 1rem;
	}

	.related-card {
		display: block;
		padding: 1.25rem;
		background-color: #f9fafb;
		border: 1px solid #e5e7eb;
		border-radius: 0.75rem;
		text-decoration: none;
		transition:
			border-color 0.2s,
			box-shadow 0.2s;
	}

	.related-card:hover {
		border-color: #3b82f6;
		box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
	}

	.related-card h3 {
		font-size: 1rem;
		font-weight: 600;
		color: #111827;
		margin: 0 0 0.5rem 0;
	}

	.related-card p {
		font-size: 0.875rem;
		color: #6b7280;
		margin: 0;
		line-height: 1.5;
	}

	/* CTA Section */
	.cta-section {
		margin-top: 3rem;
	}

	.cta-box {
		background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
		border-radius: 1rem;
		padding: 2rem;
		text-align: center;
		color: white;
	}

	.cta-box h2 {
		color: white;
		margin: 0 0 0.75rem 0;
		padding-top: 0;
	}

	.cta-box p {
		color: rgba(255, 255, 255, 0.9);
		margin-bottom: 1.5rem;
	}

	.cta-button {
		display: inline-block;
		padding: 0.875rem 2rem;
		background-color: white;
		color: #1e40af;
		font-weight: 600;
		text-decoration: none;
		border-radius: 0.5rem;
		transition:
			transform 0.2s,
			box-shadow 0.2s;
	}

	.cta-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
	}

	/* Responsive */
	@media (max-width: 640px) {
		.article-container {
			padding: 1rem;
		}

		h1 {
			font-size: 1.75rem;
		}

		.subtitle {
			font-size: 1.1rem;
		}

		.meta-badges {
			gap: 0.375rem;
		}

		.badge {
			font-size: 0.7rem;
			padding: 0.2rem 0.5rem;
		}

		.stats-box {
			grid-template-columns: repeat(2, 1fr);
		}

		.code-block pre {
			padding: 1rem;
		}

		.code-block code {
			font-size: 0.75rem;
		}

		.related-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
