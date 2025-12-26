<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'BFLA: Admin Functions Exposed to Regular Users | VibeShip',
		description: 'BFLA lets regular users access admin functions like deleting accounts. Ranked #5 in OWASP API Top 10. Get AI fix prompts for Cursor, Bolt & Claude Code.',
		url: '/kb/security/vulnerabilities/bfla/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'BFLA' }
	];

	// Real external data sources
	const owaspData = {
		ranking: '#5',
		category: 'API5:2023',
		source: 'https://owasp.org/API-Security/editions/2023/en/0xa5-broken-function-level-authorization/',
		cweId: 'CWE-285',
		cweSource: 'https://cwe.mitre.org/data/definitions/285.html'
	};

	// FAQ data for schema
	const faqs = [
		{
			question: 'What is BFLA (Broken Function Level Authorization)?',
			answer: 'BFLA happens when regular users can access admin-only functions like deleting accounts, viewing all users, or changing system settings. It\'s ranked #5 in the OWASP API Security Top 10 (2023). Think of it like a hotel where guests can access the manager\'s master key system.'
		},
		{
			question: 'What is the difference between BFLA and BOLA?',
			answer: 'BFLA is vertical privilege escalation (regular user becomes admin), while BOLA is horizontal (user accesses another user\'s data at the same level). BOLA example: reading someone else\'s invoice. BFLA example: accessing the "delete all invoices" button. Different attack, different impact.'
		},
		{
			question: 'How do AI coding tools create BFLA vulnerabilities?',
			answer: 'AI tools generate working endpoints without role checks because prompts rarely specify authorization requirements. They optimize for "make it work" not "make it secure." The code runs fine, passes tests, but any logged-in user can hit admin endpoints. This happens in Cursor, Bolt, Claude Code, and v0 generated code regularly.'
		},
		{
			question: 'How do you test for BFLA vulnerabilities?',
			answer: 'Create two accounts: one admin, one regular user. Log in as the regular user and try accessing admin endpoints (/api/admin/*, DELETE requests, user management functions). If they work without authorization errors, you have BFLA. Tools like Burp Suite and OWASP ZAP automate this testing.'
		},
		{
			question: 'How do you prevent BFLA in APIs?',
			answer: 'Implement role-based access control (RBAC) with default-deny authorization. Check user roles on every protected endpoint server-side. Never trust client-side checks. Use authorization middleware that runs before route handlers. Test with different user roles regularly.'
		},
		{
			question: 'Can regular users access admin endpoints?',
			answer: 'Yes, if BFLA exists. This is especially common in AI-generated code where endpoints work but lack authorization checks. Attackers discover admin URLs through fuzzing, documentation leaks, or JavaScript inspection. Without server-side role validation, any authenticated user becomes admin.'
		},
		{
			question: 'What is vertical privilege escalation?',
			answer: 'Vertical privilege escalation means gaining higher-level access (regular user → admin). It\'s different from horizontal escalation (accessing data from other users at your level). BFLA is the most common cause of vertical privilege escalation in APIs.'
		},
		{
			question: 'What are real-world examples of BFLA attacks?',
			answer: 'New Relic Synthetics (2018) had admin functions accessible without proper checks. Invitation hijack attacks manipulate POST requests to grant admin roles. HTTP method manipulation changes GET requests to DELETE. These aren\'t theoretical - they happen to major platforms regularly.'
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
			{"@type": "ListItem", "position": 4, "name": "BFLA"}
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
				<span class="badge">CWE-285</span>
				<span class="badge">OWASP API5:2023</span>
			</div>
			<h1>BFLA: When Regular Users Become Admins</h1>
			<p class="text-secondary">How to fix the authorization gap that lets anyone delete accounts, change prices, or access admin dashboards</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>BFLA (Broken Function Level Authorization) happens when regular users can access admin-only functions like deleting accounts or viewing all users.</strong>
				Ranked <a href="https://owasp.org/API-Security/editions/2023/en/0xa5-broken-function-level-authorization/">#5 in OWASP API Security Top 10</a>.
				Common in vibe coded apps because AI tools generate working endpoints without role checks. Think of it like hotel guests accessing the manager's master key system.
			</p>
		</div>

		<!-- Stats Box - Real OWASP Data -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">{owaspData.ranking}</div>
				<div class="stat-label">OWASP API Ranking</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">{owaspData.cweId}</div>
				<div class="stat-label"><a href={owaspData.cweSource}>CWE ID</a></div>
			</div>
			<div class="stat-box">
				<div class="stat-value">40-62%</div>
				<div class="stat-label">AI Code with Security Flaws</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Critical</div>
				<div class="stat-label">Severity</div>
			</div>
		</div>
		<p class="data-source">
			Sources: <a href={owaspData.source}>OWASP API Security Top 10 (2023)</a> | <a href="https://cset.georgetown.edu/publication/cybersecurity-risks-of-ai-generated-code/">Georgetown CSET (2024)</a>
		</p>

		<!-- What Is It - @eli5sec voice (translator persona) -->
		<section class="article-section">
			<h2>What is BFLA (Broken Function Level Authorization)?</h2>
			<p>
				Think of a hotel. You have a room key that opens room 203. That's horizontal access - you can only access what's at your level.
				Now imagine your room key also opens the manager's office, the safe, and the master control panel that can lock or unlock any room in the building.
				That's vertical access. That's BFLA.
			</p>
			<p>
				BFLA means regular users can access functions meant for admins. Not just viewing data they shouldn't see (that's <a href="/kb/security/vulnerabilities/bola/">BOLA</a>) -
				they can <strong>perform admin actions</strong>. Deleting user accounts. Changing product prices. Granting themselves permissions. Viewing the entire user database.
			</p>
			<p>
				According to <a href="https://owasp.org/API-Security/editions/2023/en/0xa5-broken-function-level-authorization/">OWASP API Security Top 10 (2023)</a>,
				BFLA ranks #5 in API security risks. It's technically listed as <a href="https://cwe.mitre.org/data/definitions/285.html">CWE-285: Improper Authorization</a>.
				The vulnerability is simple: your code checks if someone is logged in, but not if they're allowed to use that specific function.
			</p>
		</section>

		<!-- BFLA vs BOLA - Critical distinction -->
		<section class="article-section">
			<h2>BFLA vs BOLA: What's the Difference?</h2>
			<p>
				This confuses everyone at first. Both are authorization problems. Both show up in vibe coded apps. But they're different attacks:
			</p>

			<div class="comparison-box">
				<div class="comparison-item">
					<div class="comparison-header">
						<span class="comparison-badge badge badge-high">BOLA (Horizontal)</span>
					</div>
					<p><strong>Definition:</strong> Accessing other users' data at the same permission level</p>
					<p><strong>Example:</strong> Changing invoice ID from 123 to 124 lets you see someone else's invoice</p>
					<p><strong>Attack:</strong> User → Another User's Data</p>
					<p><strong>Link:</strong> <a href="/kb/security/vulnerabilities/bola/">Learn about BOLA</a></p>
				</div>

				<div class="comparison-item">
					<div class="comparison-header">
						<span class="comparison-badge badge badge-critical">BFLA (Vertical)</span>
					</div>
					<p><strong>Definition:</strong> Accessing higher privilege functions (regular user becomes admin)</p>
					<p><strong>Example:</strong> Regular user accesses /api/admin/users/delete endpoint</p>
					<p><strong>Attack:</strong> User → Admin Functions</p>
					<p><strong>This article:</strong> You're reading it</p>
				</div>
			</div>

			<p>
				<strong>Simple way to remember:</strong> BOLA is reading someone else's mail. BFLA is accessing the post office's mail sorting system.
				Both bad. Different levels of bad.
			</p>
		</section>

		<!-- AI Tool Patterns -->
		<section class="article-section">
			<h2>How AI Tools Cause BFLA Vulnerabilities</h2>
			<p>
				According to <a href="https://cset.georgetown.edu/publication/cybersecurity-risks-of-ai-generated-code/">Georgetown University CSET research (2024)</a>,
				over 40% of AI-generated code contains security flaws, with authorization vulnerabilities being particularly common.
				Industry research shows 62% of AI-generated code contains design flaws or known vulnerabilities.
			</p>

			<div class="ai-pattern-box">
				<h3>Why AI generates BFLA by default</h3>
				<p>AI coding tools don't understand security context. Here's what happens:</p>

				<ol class="pattern-list">
					<li>
						<strong>You prompt:</strong> "Create an endpoint to delete user accounts"
					</li>
					<li>
						<strong>AI thinks:</strong> "Delete function? Got it. Make it work."
					</li>
					<li>
						<strong>AI generates:</strong> Working delete endpoint with zero authorization checks
					</li>
					<li>
						<strong>You test:</strong> Works perfectly! Ships to production.
					</li>
					<li>
						<strong>Reality:</strong> Any logged-in user can delete any account
					</li>
				</ol>

				<p class="pattern-note">
					The prompt never said "admin-only" so the AI didn't add role checks.
					The training data is full of insecure examples. The AI optimizes for working code, not secure code.
				</p>
			</div>

			<p>
				This happens in Cursor, Bolt, Claude Code, v0, GitHub Copilot - every major vibe coding tool.
				Not because the tools are bad. Because "make it work" doesn't include "make it secure" unless you explicitly say so.
			</p>
		</section>

		<!-- Attack Patterns -->
		<section class="article-section">
			<h2>Common BFLA Attack Patterns</h2>
			<p>
				Attackers don't need sophisticated tools. These attacks are mechanical, repeatable, and work on thousands of vibe coded apps:
			</p>

			<ul class="attack-list">
				<li>
					<strong>Direct URL access:</strong> User navigates to <code>/admin/users</code> or <code>/api/admin/settings</code>.
					No authorization check, so it just works. Admin panel loads. They're in.
				</li>
				<li>
					<strong>HTTP method manipulation:</strong> User has <code>GET /api/users/123</code> (view profile).
					Changes request to <code>DELETE /api/users/123</code>. No method-level authorization, account deleted.
					This pattern from <a href="https://owasp.org/API-Security/editions/2023/en/0xa5-broken-function-level-authorization/">OWASP documentation</a> is shockingly common.
				</li>
				<li>
					<strong>Hidden endpoint discovery:</strong> Attackers use fuzzing tools to discover <code>/api/admin/v1/users/all</code>,
					<code>/api/internal/reports</code>, <code>/debug/users</code>. Endpoints exist, authorization doesn't.
				</li>
				<li>
					<strong>Invitation hijack:</strong> Attacker intercepts invite creation request, adds <code>"role": "admin"</code> to POST body.
					No validation on the backend, they're granted admin access. Real attacks documented in OWASP API Security examples.
				</li>
			</ul>

			<p>
				According to <a href="https://portswigger.net/web-security/access-control">PortSwigger research</a>,
				access control vulnerabilities are among the most frequently exploited in web applications.
			</p>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How to Detect BFLA in Your API</h2>
			<p>
				Manual testing catches most BFLA before attackers do. Here's the systematic approach:
			</p>

			<div class="detection-box">
				<h3>Quick BFLA test (5 minutes)</h3>
				<ol class="detection-steps">
					<li>Create two accounts: one admin, one regular user</li>
					<li>Log in as regular user</li>
					<li>Try accessing admin endpoints:
						<ul>
							<li><code>/admin</code>, <code>/api/admin/*</code></li>
							<li><code>/users</code> (list all users)</li>
							<li><code>DELETE</code> requests on resources</li>
							<li>User management functions</li>
						</ul>
					</li>
					<li>If any work without 403 errors, you have BFLA</li>
				</ol>
			</div>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Code patterns to search for</span>
				</div>
				<pre><code>{`// DANGER: Routes with no authorization middleware
app.delete('/api/users/:id', async (req, res) => {
  // No role check - anyone can delete anyone
  await User.delete(req.params.id);
});

// DANGER: Only checks if logged in, not role
export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  // Logged in = authorized? NO. Need role check.
  await db.user.delete({ where: { id: params.id } });
}`}</code></pre>
			</div>

			<div class="cta-box">
				<p><strong>Scan automatically with VibeShip Scanner</strong></p>
				<p>Detects BFLA patterns across your entire codebase in minutes</p>
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
			<h2>How to Fix BFLA Vulnerabilities</h2>
			<p>
				The fix is implementing role-based access control (RBAC) on every protected endpoint.
				Server-side. Always. Here's how to do it across different frameworks:
			</p>

			<!-- AI Fix Prompt -->
			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>Copy this prompt into Cursor, Bolt, or Claude Code to fix BFLA across your codebase:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">AI Fix Prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Fix all BFLA (Broken Function Level Authorization) vulnerabilities in my codebase.

## What to look for

Search for admin-only or privileged functions that lack role-based authorization:

1. Routes with admin functionality but no role check:
   - User deletion, modification
   - Access to all users/records
   - System settings changes
   - Price/product modifications

2. Endpoints that only check authentication (logged in) but not authorization (allowed):
   - if (!session) return 401 // Not enough!
   - Need: if (session.user.role !== 'admin') return 403

3. HTTP methods without proper validation:
   - DELETE, PUT, PATCH without role checks
   - POST to admin resources

## How to fix

Add role-based authorization middleware that runs before route handlers:

### For Express.js:
\`\`\`javascript
// Create authorization middleware
const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }

  next();
};

// Apply to protected routes
app.delete('/api/users/:id', requireAdmin, async (req, res) => {
  await User.delete(req.params.id);
  res.json({ success: true });
});

app.get('/api/admin/users', requireAdmin, async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});
\`\`\`

### For Next.js App Router:
\`\`\`javascript
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// Helper function for role checking
async function requireAdmin() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { error: 'Authentication required', status: 401 };
  }

  if (session.user?.role !== 'admin') {
    return { error: 'Admin access required', status: 403 };
  }

  return { session };
}

// Use in API routes
export async function DELETE(request, { params }) {
  const auth = await requireAdmin();
  if (auth.error) {
    return Response.json({ error: auth.error }, { status: auth.status });
  }

  await db.user.delete({ where: { id: params.id } });
  return Response.json({ success: true });
}
\`\`\`

### For Next.js Pages Router:
\`\`\`javascript
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  // Check authentication
  if (!session) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  // Check authorization (BFLA fix)
  if (session.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }

  // Now safe to proceed with admin function
  if (req.method === 'DELETE') {
    await deleteUser(req.query.id);
    return res.status(200).json({ success: true });
  }
}
\`\`\`

## Framework-specific notes

- **Next.js:** Check all /app/api/ routes and Server Actions
- **Express:** Create reusable middleware for different roles (requireAdmin, requireModerator)
- **FastAPI:** Use dependency injection with role validators
- **Always:** Check roles server-side, never trust client headers/cookies

## Prevention best practices

1. **Default-deny:** Block everything unless explicitly allowed
2. **Centralized authorization:** Use a single auth module, not scattered checks
3. **HTTP method validation:** DELETE/PUT/PATCH usually need higher privileges
4. **Test with multiple roles:** Create admin, moderator, regular user accounts and test all endpoints

## After fixing

1. Test each protected endpoint with different user roles
2. Search for any remaining unprotected admin routes
3. Add integration tests that verify authorization (not just authentication)
4. List all files modified with before/after code snippets

Please proceed systematically through my codebase.`}</div>
				</div>
			</div>

			<!-- Manual Fix -->
			<div class="fix-section">
				<h3>Manual Fix: Before & After</h3>
				<p>Here's the exact change. One pattern leaves you vulnerable, the other doesn't:</p>

				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-label">Vulnerable - No Role Check</div>
						<pre><code>{`// Express - BFLA vulnerability
app.delete('/api/users/:id', async (req, res) => {
  // Anyone logged in can delete anyone
  await User.delete(req.params.id);
  res.json({ success: true });
});

// Next.js - BFLA vulnerability
export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);

  // Only checks if logged in, not if admin
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Regular users can delete accounts!
  await db.user.delete({ where: { id: params.id } });
  return Response.json({ success: true });
}`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-label">Secure - Role-Based Authorization</div>
						<pre><code>{`// Express - Role check added
const requireAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

app.delete('/api/users/:id', requireAdmin, async (req, res) => {
  await User.delete(req.params.id);
  res.json({ success: true });
});

// Next.js - Role check added
export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check role before allowing deletion
  if (session.user?.role !== 'admin') {
    return Response.json({ error: 'Admin access required' }, { status: 403 });
  }

  await db.user.delete({ where: { id: params.id } });
  return Response.json({ success: true });
}`}</code></pre>
					</div>
				</div>

				<p>
					<strong>What changed:</strong> Added server-side role validation before executing admin functions.
					The check happens on every request - no caching, no client-side trust.
					Regular users get a 403 Forbidden error. Admins proceed as normal.
				</p>
			</div>
		</section>

		<!-- Prevention -->
		<section class="article-section">
			<h2>Prevention Best Practices</h2>
			<p>
				Fixing existing BFLA is step one. Preventing it from coming back requires systematic changes:
			</p>

			<ul class="prevention-list">
				<li>
					<strong>Default-deny access control:</strong> Start with "nobody can access this" then explicitly allow roles.
					Reverse of how most vibe coders build (allow first, restrict later).
				</li>
				<li>
					<strong>Centralized authorization module:</strong> One auth.ts file with <code>requireAdmin()</code>, <code>requireModerator()</code>, <code>requireOwner()</code> functions.
					Don't scatter <code>if (user.role === 'admin')</code> checks across 50 files.
				</li>
				<li>
					<strong>Never trust client-side:</strong> Headers, cookies, localStorage - all client-controlled.
					Validate roles from database session server-side on every request.
				</li>
				<li>
					<strong>API gateway authorization:</strong> For microservices, centralize auth at the gateway level.
					Individual services trust the gateway's decisions. Documented in <a href="https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html">OWASP Authorization Cheat Sheet</a>.
				</li>
				<li>
					<strong>Regular security testing:</strong> Create test accounts with different roles.
					Run through admin functions as regular user monthly. Catches regressions before attackers do.
				</li>
				<li>
					<strong>CI/CD integration:</strong> Automated tests that verify authorization, not just authentication.
					PR fails if new admin endpoint lacks role check.
				</li>
			</ul>

			<p>
				According to <a href="https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/05-Authorization_Testing/03-Testing_for_Privilege_Escalation">OWASP Testing Guide</a>,
				testing for privilege escalation should be part of every security assessment.
			</p>
		</section>

		<!-- FAQ -->
		<section class="article-section">
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

		<!-- Related -->
		<section class="article-section">
			<h2>Related content</h2>

			<div class="related-grid">
				<a href="/kb/security/vulnerabilities/bola/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">BOLA (Broken Object Level Authorization)</div>
					<p class="related-card-description">Horizontal privilege escalation - accessing other users' data at the same level</p>
				</a>
				<a href="/kb/security/vulnerabilities/broken-access-control/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Broken Access Control</div>
					<p class="related-card-description">OWASP #1 vulnerability covering all access control failures</p>
				</a>
				<a href="/kb/vibe-coding-tools/cursor/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Cursor Security Patterns</div>
					<p class="related-card-description">Common authorization vulnerabilities in Cursor-generated code</p>
				</a>
				<a href="/kb/vibe-coding-tools/bolt/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Bolt.new Security Issues</div>
					<p class="related-card-description">Why Bolt apps ship with missing authorization checks</p>
				</a>
				<a href="/kb/security/stacks/nextjs-supabase/" class="card card-interactive related-card">
					<div class="related-card-category">Stack Guide</div>
					<div class="related-card-title">Next.js + Supabase Security</div>
					<p class="related-card-description">Row Level Security combined with API route authorization</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Catch BFLA before attackers do</h2>
			<p>Too many incidents start with "we thought authentication was enough."</p>
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

	/* Comparison Box - BFLA vs BOLA */
	.comparison-box {
		display: grid;
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.comparison-item {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.25rem;
	}

	.comparison-header {
		margin-bottom: 0.75rem;
	}

	.comparison-badge {
		display: inline-flex;
	}

	.comparison-item p {
		margin: 0.5rem 0;
		color: var(--text-secondary);
		font-size: 0.9rem;
	}

	.comparison-item p strong {
		color: var(--text-primary);
	}

	/* AI Pattern Box */
	.ai-pattern-box {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-left: 3px solid var(--orange);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.ai-pattern-box h3 {
		margin: 0 0 0.75rem;
		font-size: 1rem;
		color: var(--text-primary);
	}

	.ai-pattern-box > p {
		margin: 0 0 1rem;
		color: var(--text-secondary);
	}

	.pattern-list {
		margin: 1rem 0;
		padding-left: 1.5rem;
		color: var(--text-secondary);
	}

	.pattern-list li {
		margin-bottom: 0.5rem;
	}

	.pattern-list strong {
		color: var(--text-primary);
	}

	.pattern-note {
		margin: 1rem 0 0;
		font-size: 0.875rem;
		color: var(--text-secondary);
		font-style: italic;
	}

	/* Attack List */
	.attack-list {
		list-style: none;
		padding: 0;
		margin: 1rem 0;
	}

	.attack-list li {
		padding: 0.75rem 0;
		border-bottom: 1px solid var(--border);
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.attack-list li:last-child {
		border-bottom: none;
	}

	.attack-list strong {
		color: var(--text-primary);
	}

	.attack-list code {
		background: var(--bg-tertiary);
		padding: 0.125rem 0.375rem;
		font-size: 0.8125rem;
	}

	/* Detection Box */
	.detection-box {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.detection-box h3 {
		margin: 0 0 0.75rem;
		font-size: 1rem;
	}

	.detection-steps {
		margin: 1rem 0;
		padding-left: 1.5rem;
		color: var(--text-secondary);
	}

	.detection-steps li {
		margin-bottom: 0.5rem;
	}

	.detection-steps ul {
		margin-top: 0.5rem;
		padding-left: 1.5rem;
	}

	.detection-steps code {
		background: var(--bg-tertiary);
		padding: 0.125rem 0.375rem;
		font-size: 0.8125rem;
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

	.cta-box p:last-of-type {
		margin-bottom: 1.25rem;
		color: var(--text-secondary);
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

	.code-block.vulnerable {
		border-left: 3px solid var(--red);
	}

	.code-block.secure {
		border-left: 3px solid var(--green);
	}

	.code-label {
		padding: 0.5rem 1rem;
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		background: var(--bg-secondary);
		border-bottom: 1px solid var(--border);
	}

	.vulnerable .code-label {
		color: var(--red);
	}

	.secure .code-label {
		color: var(--green);
	}

	/* Prevention List */
	.prevention-list {
		list-style: none;
		padding: 0;
		margin: 1rem 0;
	}

	.prevention-list li {
		padding: 0.75rem 0;
		border-bottom: 1px solid var(--border);
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.prevention-list li:last-child {
		border-bottom: none;
	}

	.prevention-list strong {
		color: var(--text-primary);
	}

	.prevention-list code {
		background: var(--bg-tertiary);
		padding: 0.125rem 0.375rem;
		font-size: 0.8125rem;
	}

	/* Framework Links */
	.framework-links {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		margin-top: 1rem;
	}

	.framework-links a {
		text-decoration: none;
		padding: 1rem;
	}

	.framework-name {
		display: block;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 0.25rem;
	}

	.framework-desc {
		display: block;
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.framework-links {
			grid-template-columns: 1fr;
		}
	}
</style>
