<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'BOLA: The API Vulnerability That Exposed Millions | VibeShip',
		description: 'BOLA lets users access other users\' data by changing API IDs. Ranked #1 OWASP API Security risk. Learn to fix it in AI-generated REST and GraphQL APIs.',
		url: '/kb/security/vulnerabilities/bola/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'BOLA' }
	];

	// OWASP data
	const owaspData = {
		ranking: '#1',
		category: 'API1:2023',
		source: 'https://owasp.org/API-Security/editions/2023/en/0xa1-broken-object-level-authorization/',
		cweId: 'CWE-639',
		cweSource: 'https://cwe.mitre.org/data/definitions/639.html'
	};

	// FAQ data for schema
	const faqs = [
		{
			question: 'What is BOLA in API security?',
			answer: 'BOLA (Broken Object Level Authorization) happens when APIs let users access other users\' data by changing IDs in requests. It\'s ranked #1 in the OWASP API Security Top 10 (both 2019 and 2023). According to Salt Security, roughly 40% of API attacks involve BOLA vulnerabilities. Your API checks if someone is logged in (authentication) but doesn\'t check if they own the resource they\'re requesting (authorization).'
		},
		{
			question: 'What is the difference between BOLA and IDOR?',
			answer: 'BOLA and IDOR are the same vulnerability class with different names. IDOR (Insecure Direct Object Reference) is the older term from the OWASP Web Application Top 10. BOLA is the API-specific terminology from the OWASP API Security Top 10. Use BOLA when talking about REST/GraphQL APIs, use IDOR when talking about web applications in general. The fix is identical: check object ownership before allowing access.'
		},
		{
			question: 'How do you prevent BOLA vulnerabilities?',
			answer: 'Always check if the authenticated user owns the resource before returning or modifying it. In database queries, add AND user_id = {session.user.id} to your WHERE clause. In GraphQL resolvers, compare context.user.id to the resource\'s owner ID. In Next.js Server Actions, use getServerSession() to get the user ID and filter Prisma queries. Never trust IDs from the client. Always verify ownership server-side.'
		},
		{
			question: 'Is BOLA the same as broken access control?',
			answer: 'BOLA is a specific type of broken access control. Broken Access Control (OWASP A01:2021) is the broader category covering all authorization failures. BOLA specifically refers to object-level authorization in APIs - when User A can access User B\'s specific resources (orders, documents, profiles) by changing IDs. Other access control issues include missing function-level authorization, privilege escalation, and CORS misconfigurations.'
		},
		{
			question: 'Why do AI tools generate BOLA vulnerabilities?',
			answer: 'AI coding tools understand authentication but not authorization. When you ask for "a user dashboard API," the AI generates code that checks if someone is logged in, then returns whatever data they request. It doesn\'t add ownership checks because the training data rarely shows them. Vibe coders ship CRUD APIs where every endpoint authenticates but none authorize. The code works perfectly - until someone changes a URL parameter and sees another user\'s data.'
		}
	];

	let copied = $state(false);
	let copiedStates = $state<Record<string, boolean>>({});

	function copyPrompt() {
		const prompt = document.getElementById('ai-fix-prompt')?.textContent || '';
		navigator.clipboard.writeText(prompt);
		copied = true;
		setTimeout(() => copied = false, 2000);
	}

	function copyCode(id: string) {
		const el = document.getElementById(id);
		if (el) {
			navigator.clipboard.writeText(el.textContent || '');
			copiedStates[id] = true;
			setTimeout(() => copiedStates[id] = false, 2000);
		}
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
			{"@type": "ListItem", "position": 4, "name": "BOLA"}
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
		"datePublished": "2025-12-25",
		"dateModified": "2025-12-25"
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
				<span class="badge badge-critical">Critical</span>
				<span class="badge">CWE-639</span>
				<span class="badge">OWASP API1:2023</span>
			</div>
			<h1>BOLA: The API Vulnerability That Exposed Millions</h1>
			<p class="text-secondary">How attackers access other users' data by changing IDs in API requests</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>BOLA (Broken Object Level Authorization) happens when APIs let users access other users' data by changing IDs in requests.</strong>
				Ranked <a href="https://owasp.org/API-Security/editions/2023/en/0xa1-broken-object-level-authorization/">#1 in OWASP API Security Top 10</a> (both 2019 and 2023).
				According to <a href="https://salt.security/blog/api1-2023-broken-object-level-authentication">Salt Security</a>, roughly 40% of API attacks involve BOLA vulnerabilities.
				AI-generated APIs authenticate users but rarely check if they own the resources they're accessing.
			</p>
		</div>

		<!-- Stats Box -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value critical">{owaspData.ranking}</div>
				<div class="stat-label">OWASP API Ranking</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">{owaspData.cweId}</div>
				<div class="stat-label"><a href={owaspData.cweSource}>CWE ID</a></div>
			</div>
			<div class="stat-box">
				<div class="stat-value critical">~40%</div>
				<div class="stat-label">API Attack Share</div>
			</div>
			<div class="stat-box">
				<div class="stat-value critical">Critical</div>
				<div class="stat-label">Severity</div>
			</div>
		</div>
		<p class="data-source">
			Source: <a href={owaspData.source}>OWASP API Security Top 10 (2023)</a> and <a href="https://salt.security/blog/api1-2023-broken-object-level-authentication">Salt Security (2024)</a>
		</p>

		<!-- What Is BOLA -->
		<section class="article-section">
			<h2>What is BOLA?</h2>
			<p>
				BOLA (Broken Object Level Authorization) is what happens when your API checks if someone is logged in but doesn't check if they own the resource they're requesting.
				User A sends GET /api/orders/123, your API verifies they're authenticated, then returns the order. Problem: they don't own order 123. User B does.
			</p>
			<p>
				Think of it like a hotel key card that works on any room, not just yours. You're a verified guest (authenticated), but there's no check that you belong in room 456 specifically (authorized).
				Change the room number, walk right in.
			</p>
			<p>
				According to <a href="https://owasp.org/API-Security/editions/2023/en/0xa1-broken-object-level-authorization/">OWASP API Security Top 10 (2023)</a>, BOLA has been the #1 API security risk for five years straight.
				It's in the <a href="https://cwe.mitre.org/data/definitions/639.html">CWE database as CWE-639</a> (Authorization Bypass Through User-Controlled Key).
				<a href="https://salt.security/blog/api1-2023-broken-object-level-authentication">Salt Security reports</a> that roughly 40% of all API attacks exploit BOLA vulnerabilities.
				Vibe coding makes it worse because AI tools generate authentication without authorization by default.
			</p>
		</section>

		<!-- BOLA vs IDOR -->
		<section class="article-section">
			<h2>BOLA vs IDOR: What's the difference?</h2>
			<p>
				BOLA and IDOR are the same vulnerability with different names. IDOR (Insecure Direct Object Reference) is the older term from the OWASP Web Application Top 10.
				BOLA is the API-specific terminology introduced in the OWASP API Security Top 10.
			</p>
			<p>
				Use BOLA when talking about REST APIs, GraphQL endpoints, or Server Actions. Use IDOR when talking about web applications in general.
				Both mean: "user can access objects they don't own by manipulating references."
				The fix is identical: verify ownership before returning data.
			</p>
			<p>
				OWASP created the separate API Security Top 10 in 2019 because API attack patterns differ from traditional web app attacks.
				BOLA became the top category because APIs expose more direct object access than rendered web pages ever did.
				Every CRUD endpoint is a potential BOLA vector if you skip the ownership check.
			</p>
		</section>

		<!-- Real-World Breaches -->
		<section class="article-section">
			<h2>Real-world BOLA breaches</h2>
			<p>
				BOLA isn't theoretical. Major companies have lost customer data and money to this exact pattern.
			</p>
			<ul class="breach-list">
				<li>
					<strong>Uber (2019):</strong> Account takeover vulnerability allowed attackers to access any user's ride history and personal information by enumerating user IDs in API requests.
					Discovered through HackerOne bug bounty. Uber paid out for the report. The pattern: authenticated API, no ownership check.
				</li>
				<li>
					<strong>Russia Central Bank (2016):</strong> Attackers exploited BOLA in the Fast Payments System API to steal 2 billion rubles by changing account IDs in transfer requests.
					The API verified authentication but never checked if the authenticated user owned the source account. They just changed IDs and moved money.
				</li>
			</ul>
			<p>
				Both incidents happened at scale because of APIs. Web forms have rate limits and CSRF tokens. APIs designed for mobile apps and integrations have fewer protections.
				Attackers enumerate IDs, batch requests, exfiltrate everything. BOLA is the vulnerability that enables it.
			</p>
		</section>

		<!-- Why AI Tools Generate BOLA -->
		<section class="article-section">
			<h2>Why AI tools generate BOLA</h2>
			<p>
				Every major AI coding tool generates BOLA vulnerabilities by default. Not because the tools are broken, but because they optimize for "working code" not "secure code."
				When you ask for a user dashboard API, the AI generates authentication (is this person logged in?) but skips authorization (does this person own this resource?).
			</p>

			<div class="tool-patterns-box">
				<h3>The pattern all AI tools generate</h3>
				<p>Ask Cursor, Bolt, Claude Code, or v0 for a "GET user order by ID" endpoint. This is what you get:</p>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">JavaScript</span>
						<button class="copy-btn" class:copied={copiedStates['ai-pattern']} onclick={() => copyCode('ai-pattern')}>
							{copiedStates['ai-pattern'] ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre><code id="ai-pattern">{`// Cursor, Bolt, Claude Code - identical pattern
app.get('/api/orders/:id', authenticateUser, async (req, res) => {
  const order = await db.query(
    'SELECT * FROM orders WHERE id = $1',
    [req.params.id]
  )
  res.json(order)
})`}</code></pre>
				</div>
				<p class="pattern-note">
					The <code>authenticateUser</code> middleware verifies the JWT token. The query returns the order.
					Missing: Any check that <code>req.user.id</code> matches <code>order.user_id</code>.
					User A can see User B's order by changing the ID in the URL.
				</p>
			</div>

			<p>
				<strong>Why this happens:</strong> AI models are trained on public code repositories. Most public code prioritizes functionality over security.
				The pattern "authenticate, then return whatever they request" appears thousands of times in training data.
				Authorization checks appear far less frequently because they're application-specific business logic, not boilerplate.
			</p>

			<div class="table-wrapper">
				<table>
					<thead>
						<tr>
							<th>AI Tool</th>
							<th>BOLA Pattern</th>
							<th>Likelihood</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Cursor</td>
							<td>Generates RESTful CRUD with authentication but no object-level authorization</td>
							<td><span class="badge badge-critical">Very High</span></td>
						</tr>
						<tr>
							<td>Bolt</td>
							<td>Creates functional endpoints prioritizing speed over security checks</td>
							<td><span class="badge badge-critical">Very High</span></td>
						</tr>
						<tr>
							<td>Claude Code</td>
							<td>More security-conscious but still generates APIs without ownership verification</td>
							<td><span class="badge badge-high">High</span></td>
						</tr>
						<tr>
							<td>v0</td>
							<td>UI-focused, Server Actions often lack object authorization</td>
							<td><span class="badge badge-high">High</span></td>
						</tr>
						<tr>
							<td>GitHub Copilot</td>
							<td>Academic research shows authorization checks frequently omitted</td>
							<td><span class="badge badge-critical">Very High</span></td>
						</tr>
					</tbody>
				</table>
			</div>

			<p>
				This is the gap between vibe coding and production security. The AI gives you working endpoints. You're responsible for adding the ownership checks it doesn't know to include.
			</p>
		</section>

		<!-- How BOLA Works -->
		<section class="article-section">
			<h2>How BOLA works (attack patterns)</h2>

			<h3>REST API pattern</h3>
			<p>
				The classic BOLA attack: change the ID in the URL. If the API doesn't verify ownership, you get the resource.
			</p>
			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">HTTP</span>
					<button class="copy-btn" class:copied={copiedStates['rest-pattern']} onclick={() => copyCode('rest-pattern')}>
						{copiedStates['rest-pattern'] ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="rest-pattern">{`// Attacker is authenticated as User 124
GET /api/users/123         // User 123's profile - shouldn't work
GET /api/orders/456        // User X's order - shouldn't work
PUT /api/documents/789     // Update someone else's doc - shouldn't work
DELETE /api/posts/101      // Delete someone else's post - shouldn't work

// But if the API only checks authentication, not authorization:
// All of these succeed. Attacker enumerates IDs, accesses everything.`}</code></pre>
			</div>

			<h3>GraphQL pattern</h3>
			<p>
				GraphQL BOLA is worse because attackers can batch requests and exploit nested queries.
			</p>
			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">GraphQL</span>
					<button class="copy-btn" class:copied={copiedStates['graphql-pattern']} onclick={() => copyCode('graphql-pattern')}>
						{copiedStates['graphql-pattern'] ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="graphql-pattern">{`# Single query accessing multiple users' data
query {
  user1: user(id: 123) { email, orders { total } }
  user2: user(id: 124) { email, orders { total } }
  user3: user(id: 125) { email, orders { total } }
  # ... repeat 100 times in one request
}

# Nested query exposing related objects
query {
  order(id: 456) {
    id
    user { email, phone, address }  # Exposes another user's data
    items { productId, price }
  }
}`}</code></pre>
			</div>
			<p>
				GraphQL batching means attackers enumerate hundreds of IDs per request. Rate limiting doesn't help if one query returns 100 users' data.
			</p>

			<h3>UUID "protection" myth</h3>
			<p>
				Using UUIDs instead of sequential IDs makes guessing harder. It doesn't fix BOLA.
			</p>
			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">HTTP</span>
					<button class="copy-btn" class:copied={copiedStates['uuid-pattern']} onclick={() => copyCode('uuid-pattern')}>
						{copiedStates['uuid-pattern'] ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="uuid-pattern">{`// UUIDs are harder to guess
GET /api/orders/550e8400-e29b-41d4-a716-446655440000

// But they leak everywhere:
// - Browser history and bookmarks
// - Server logs and error messages
// - Email notifications ("Your order abc-123-def is ready")
// - GraphQL introspection and autocomplete
// - Webhook payloads and API responses

// Once an attacker has ANY UUID, they can access that resource
// if there's no authorization check.`}</code></pre>
			</div>
			<p>
				UUIDs are security through obscurity. They reduce automated enumeration but don't prevent exploitation once an ID leaks.
				The fix is authorization, not harder-to-guess IDs.
			</p>
		</section>

		<!-- What Could Happen -->
		<section class="article-section">
			<h2>What could happen</h2>
			<ul class="consequences-list">
				<li><strong>Horizontal privilege escalation:</strong> User A accesses User B's data by changing IDs. No special permissions needed. Every user is a potential attacker targeting every other user.</li>
				<li><strong>Data exfiltration at scale:</strong> Attackers enumerate IDs (1 to 100000) and dump the entire database through the API. No SQL injection needed. Your own endpoints do the work.</li>
				<li><strong>Account takeover:</strong> If BOLA exposes email addresses, phone numbers, or password reset tokens, attackers chain vulnerabilities for full account takeover.</li>
				<li><strong>Financial fraud:</strong> Russia Central Bank lost 2 billion rubles when attackers changed account IDs in transfer requests. Your payment API has the same vulnerability if you skip ownership checks.</li>
			</ul>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How to detect BOLA</h2>
			<p>
				The fastest way to find BOLA: the two-account test. Create two accounts, get a resource ID from Account A, try to access it from Account B.
				If you can, you have BOLA.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Manual testing pattern</span>
					<button class="copy-btn" class:copied={copiedStates['manual-test']} onclick={() => copyCode('manual-test')}>
						{copiedStates['manual-test'] ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="manual-test">{`1. Log in as User A
2. Create/view a resource, note the ID (order 123, document 456, etc.)
3. Copy the API request (use browser DevTools Network tab)
4. Log out, log in as User B
5. Make the same API request with User A's resource ID
6. If you see User A's data: BOLA vulnerability confirmed

Repeat for:
- GET (reading data)
- PUT/PATCH (updating data)
- DELETE (deleting data)
- All API endpoints that accept IDs`}</code></pre>
			</div>

			<p>
				In code reviews, search for these patterns:
			</p>
			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Dangerous patterns</span>
					<button class="copy-btn" class:copied={copiedStates['dangerous-patterns']} onclick={() => copyCode('dangerous-patterns')}>
						{copiedStates['dangerous-patterns'] ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="dangerous-patterns">{`// Dangerous: No ownership check
app.get('/api/orders/:id', auth, async (req, res) => {
  const order = await Order.findById(req.params.id)
  return res.json(order)
})

// Dangerous: GraphQL resolver without authorization
const resolvers = {
  Query: {
    order: (_, { id }, context) => {
      if (!context.user) throw new Error('Unauthorized')
      return Order.findById(id)  // Missing: check context.user.id owns this
    }
  }
}

// Dangerous: Next.js Server Action without ownership check
export async function getOrder(orderId: string) {
  const session = await getServerSession()
  if (!session) throw new Error('Unauthorized')
  return prisma.order.findUnique({ where: { id: orderId } })
  // Missing: check session.user.id matches order.userId
}`}</code></pre>
			</div>

			<div class="cta-box">
				<p><strong>Audit all API endpoints automatically</strong></p>
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
			<h2>How to fix BOLA</h2>
			<p>
				The fix is simple: always verify the authenticated user owns the resource before returning or modifying it.
				Add one condition to your queries. That's the entire defense.
			</p>

			<!-- AI Fix Prompt -->
			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>Copy this prompt into Cursor, Claude Code, or Bolt. It systematically adds ownership checks to every API endpoint:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Review all API endpoints, GraphQL resolvers, and Server Actions in this codebase for BOLA (Broken Object Level Authorization) vulnerabilities. For each endpoint that returns or modifies user-specific resources:

## 1. IDENTIFY
Find all routes/resolvers that accept object IDs as parameters:
- User IDs, order IDs, document IDs, post IDs, etc.
- Path parameters (/api/orders/:id)
- Query parameters (?userId=123)
- Request body fields ({ orderId: "abc" })
- GraphQL query variables

## 2. CHECK AUTHORIZATION
Verify that the code checks if the authenticated user has permission to access that specific object:
- Compare the resource's owner ID to the authenticated user's ID
- Apply this check BEFORE querying the database when possible
- Return 404 (not 403) when authorization fails to avoid leaking resource existence

## 3. PATTERN TO FIX

DON'T do this:
\`\`\`
db.query('SELECT * FROM orders WHERE id = $1', [params.id])
\`\`\`

DO this instead:
\`\`\`
db.query('SELECT * FROM orders WHERE id = $1 AND user_id = $2', [params.id, user.id])
\`\`\`

## 4. APPLY TO ALL OPERATIONS

- GET/Read: Check ownership before returning
- PUT/PATCH/Update: Check ownership before modifying
- DELETE: Check ownership before deleting
- POST/Create: Assign authenticated user as owner automatically

## 5. FRAMEWORK-SPECIFIC PATTERNS

Next.js:
\`\`\`typescript
export async function getOrder(orderId: string) {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Unauthorized')

  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      userId: session.user.id  // Ownership check
    }
  })

  if (!order) throw new Error('Order not found')
  return order
}
\`\`\`

Express:
\`\`\`javascript
app.get('/api/orders/:id', authenticateUser, async (req, res) => {
  const order = await db.query(
    'SELECT * FROM orders WHERE id = $1 AND user_id = $2',
    [req.params.id, req.user.id]  // Ownership check
  )
  if (!order) return res.status(404).json({ error: 'Order not found' })
  res.json(order)
})
\`\`\`

GraphQL:
\`\`\`typescript
const resolvers = {
  Query: {
    order: async (_, { id }, context) => {
      if (!context.user) throw new Error('Unauthorized')

      const order = await Order.findOne({
        _id: id,
        userId: context.user.id  // Ownership check
      })

      if (!order) throw new Error('Order not found')
      return order
    }
  }
}
\`\`\`

Supabase (use RLS policies):
\`\`\`sql
CREATE POLICY "Users can only access their own orders"
ON orders FOR SELECT
USING (auth.uid() = user_id);
\`\`\`

## 6. DON'T RELY ON

- Client-side checks (easily bypassed)
- UUIDs instead of authorization (IDs leak via logs, emails, errors)
- Frontend hiding elements (security must be server-side)
- Rate limiting as the only defense (batch queries bypass it)

## 7. TEST

For each fixed endpoint, verify:
- User A cannot access User B's resources by changing IDs
- Proper 404 response when resource doesn't exist or user lacks access
- Error messages don't leak information about whether resource exists
- GraphQL nested queries don't expose related objects without authorization

## 8. AFTER FIXING

1. List all files you modified with before/after code snippets
2. Note any endpoints that need manual review (complex permission logic)
3. Suggest integration tests to prevent regression

Please proceed systematically through my codebase.`}</div>
				</div>
			</div>

			<!-- Manual Fix - REST -->
			<div class="fix-section">
				<h3>Manual fix: REST API</h3>
				<p>Add ownership verification to every query that returns user-specific resources.</p>

				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-block-header">
							<span class="code-block-lang">Vulnerable</span>
						</div>
						<pre><code>{`// Express.js - BOLA vulnerability
app.get('/api/orders/:id', authenticateUser, async (req, res) => {
  const order = await db.query(
    'SELECT * FROM orders WHERE id = $1',
    [req.params.id]
  )

  if (!order) {
    return res.status(404).json({ error: 'Not found' })
  }

  res.json(order)
})

// Problem: Any authenticated user can access any order
// by changing the ID in the URL`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-block-header">
							<span class="code-block-lang">Secure</span>
						</div>
						<pre><code>{`// Express.js - Fixed with authorization check
app.get('/api/orders/:id', authenticateUser, async (req, res) => {
  const order = await db.query(
    'SELECT * FROM orders WHERE id = $1 AND user_id = $2',
    [req.params.id, req.user.id]
  )

  if (!order) {
    return res.status(404).json({ error: 'Not found' })
  }

  res.json(order)
})

// Fixed: Query filters by BOTH id AND user_id
// Users can only access their own orders`}</code></pre>
					</div>
				</div>
			</div>

			<!-- Manual Fix - GraphQL -->
			<div class="fix-section">
				<h3>Manual fix: GraphQL resolver</h3>
				<p>GraphQL resolvers need the same ownership checks. Use context.user.id from your auth middleware.</p>

				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-block-header">
							<span class="code-block-lang">Vulnerable</span>
						</div>
						<pre><code>{`// GraphQL - BOLA vulnerability
const resolvers = {
  Query: {
    order: async (_, { id }, context) => {
      if (!context.user) {
        throw new Error('Unauthorized')
      }

      return await Order.findById(id)
      // Problem: Returns any order regardless of who owns it
    }
  }
}

// Attacker can query any order:
// query { order(id: "someone-elses-order-id") { total items } }`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-block-header">
							<span class="code-block-lang">Secure</span>
						</div>
						<pre><code>{`// GraphQL - Fixed with authorization check
const resolvers = {
  Query: {
    order: async (_, { id }, context) => {
      if (!context.user) {
        throw new Error('Unauthorized')
      }

      const order = await Order.findOne({
        _id: id,
        userId: context.user.id  // Ownership check
      })

      if (!order) {
        throw new Error('Order not found')
      }

      return order
    }
  }
}

// Fixed: Filters by both id AND userId from auth context`}</code></pre>
					</div>
				</div>
			</div>

			<!-- Manual Fix - Next.js -->
			<div class="fix-section">
				<h3>Manual fix: Next.js Server Action</h3>
				<p>Server Actions in Next.js App Router need ownership checks just like API routes.</p>

				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-block-header">
							<span class="code-block-lang">Vulnerable</span>
						</div>
						<pre><code>{`// Next.js Server Action - BOLA vulnerability
'use server'

export async function getOrder(orderId: string) {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error('Unauthorized')
  }

  return await prisma.order.findUnique({
    where: { id: orderId }
  })
  // Problem: Returns any order, doesn't check ownership
}

// Component can call getOrder() with any orderId`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-block-header">
							<span class="code-block-lang">Secure</span>
						</div>
						<pre><code>{`// Next.js Server Action - Fixed with authorization
'use server'

export async function getOrder(orderId: string) {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error('Unauthorized')
  }

  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      userId: session.user.id  // Ownership check
    }
  })

  if (!order) {
    throw new Error('Order not found')
  }

  return order
}

// Fixed: findFirst with BOTH id and userId filters`}</code></pre>
					</div>
				</div>
			</div>

			<!-- Framework-Specific Notes -->
			<div class="fix-section">
				<h3>Framework-specific patterns</h3>
				<p>
					<strong>Next.js:</strong> Use <code>getServerSession()</code> or <code>auth()</code> from NextAuth to get <code>session.user.id</code>.
					Filter all Prisma queries with <code>userId: session.user.id</code>. Use <code>findFirst</code> instead of <code>findUnique</code> when adding userId to the query.
				</p>
				<p>
					<strong>Express:</strong> Your auth middleware should set <code>req.user.id</code>.
					Add <code>AND user_id = $2</code> to WHERE clauses, pass <code>req.user.id</code> as a parameter.
				</p>
				<p>
					<strong>GraphQL:</strong> Auth middleware should populate <code>context.user.id</code>.
					Every resolver that returns user data needs <code>userId: context.user.id</code> in the query filter.
				</p>
				<p>
					<strong>Supabase:</strong> Use Row Level Security (RLS) policies to enforce ownership at the database level.
					Example: <code>CREATE POLICY "Users see only their data" ON table_name USING (auth.uid() = user_id)</code>.
					See our <a href="/kb/security/stacks/nextjs-supabase/">Next.js + Supabase security guide</a> for complete RLS patterns.
				</p>
			</div>
		</section>

		<!-- Testing -->
		<section class="article-section">
			<h2>Testing for BOLA</h2>
			<p>
				The two-account test is the gold standard. Create two users, try to access User A's resources while authenticated as User B.
				If you can, you have BOLA.
			</p>
			<p>
				<strong>Automated testing:</strong> Use tools like Postman or Bruno to save requests from User A, then replay them with User B's auth token.
				If the responses contain User A's data, you've found the vulnerability.
			</p>
			<p>
				<strong>Security scanners:</strong> OWASP ZAP and Burp Suite can test for BOLA by fuzzing ID parameters.
				They authenticate as different users and attempt to access resources across accounts.
				VibeShip Scanner checks for missing authorization patterns in API code.
			</p>
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
				<a href="/kb/security/vulnerabilities/idor/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">IDOR (Insecure Direct Object Reference)</div>
					<p class="related-card-description">The broader term for BOLA - same vulnerability, different context</p>
				</a>
				<a href="/kb/security/vulnerabilities/broken-access-control/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Broken Access Control</div>
					<p class="related-card-description">Parent category covering all authorization failures</p>
				</a>
				<a href="/kb/security/vulnerabilities/missing-auth/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Missing Authentication</div>
					<p class="related-card-description">Different issue - no login required at all</p>
				</a>
				<a href="/kb/security/stacks/nextjs-supabase/" class="card card-interactive related-card">
					<div class="related-card-category">Stack Guide</div>
					<div class="related-card-title">Next.js + Supabase Security</div>
					<p class="related-card-description">How to use RLS policies to prevent BOLA</p>
				</a>
				<a href="/kb/vibe-coding-tools/cursor/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Cursor Security Patterns</div>
					<p class="related-card-description">Common vulnerabilities in Cursor-generated APIs</p>
				</a>
				<a href="/kb/vibe-coding-tools/bolt/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Bolt.new Security</div>
					<p class="related-card-description">Authorization gaps in Bolt-generated code</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Find BOLA vulnerabilities before users do</h2>
			<p>Every vibe coded API needs an authorization audit. Most have none.</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">
				Scan your code now
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

	.pattern-note code {
		background: var(--bg-tertiary);
		padding: 0.125rem 0.375rem;
		font-size: 0.8125rem;
	}

	/* Breach List */
	.breach-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.breach-list li {
		padding: 0.75rem 0;
		border-bottom: 1px solid var(--border);
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.breach-list li:last-child {
		border-bottom: none;
	}

	.breach-list strong {
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

	/* Code Comparison - Stacked vertically */
	.code-comparison {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.code-block.vulnerable {
		border-left: 3px solid var(--red);
	}

	.code-block.secure {
		border-left: 3px solid var(--green);
	}

	.code-block.vulnerable .code-block-lang,
	.code-block.secure .code-block-lang {
		font-weight: 600;
	}

	/* Mobile responsive */
	@media (max-width: 768px) {
		.badge-row {
			gap: 0.35rem;
		}
	}
</style>
