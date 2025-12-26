<script lang="ts">
	import { Header } from '$lib/components/layout';

	const meta = {
		title: 'Privilege Escalation: Detect & Fix Guide',
		description: 'Privilege escalation lets users gain admin access or view other users\' data. Learn to detect RBAC gaps in AI-generated code and implement proper access control.',
		url: '/kb/security/vulnerabilities/privilege-escalation/'
	};

	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Privilege Escalation' }
	];

	const securityData = {
		cweId: 'CWE-269',
		cweName: 'Improper Privilege Management',
		cweSource: 'https://cwe.mitre.org/data/definitions/269.html',
		owaspCategory: 'A01:2021 - Broken Access Control',
		owaspSource: 'https://owasp.org/Top10/A01_2021-Broken_Access_Control/',
		cweRanking: '#22 CWE Top 25 (2024)',
		severity: 'High/Critical',
		cvssScore: '7.0-9.8'
	};

	const faqs = [
		{
			question: 'What is privilege escalation?',
			answer: 'Privilege escalation occurs when a user gains access levels beyond what they\'re authorized for. Vertical escalation means a regular user gains admin privileges. Horizontal escalation means a user accesses another user\'s data without authorization. Both exploit gaps in access control implementation.'
		},
		{
			question: 'How do I prevent privilege escalation?',
			answer: 'Apply the principle of least privilege—give users only the access they need. Check authorization on every request, not just at login. Validate roles server-side, never trust client-side claims. Use a centralized authorization layer rather than scattered checks. Re-authenticate users before sensitive operations like role changes.'
		},
		{
			question: 'What is the difference between horizontal and vertical escalation?',
			answer: 'Vertical escalation is moving UP the privilege ladder: user becomes admin. Horizontal escalation is moving SIDEWAYS: user accesses peer accounts. Example: accessing /admin when you\'re a user is vertical. Accessing /users/456/data when you\'re user 123 is horizontal. Both are broken access control, but require different defenses.'
		},
		{
			question: 'How do hackers escalate privileges?',
			answer: 'Common techniques: modifying role claims in JWTs or cookies, accessing admin endpoints directly, manipulating user IDs in requests (IDOR), exploiting race conditions during permission checks, abusing default accounts, or finding unprotected admin functionality. Most web app privilege escalation exploits missing or incomplete authorization checks.'
		},
		{
			question: 'Is privilege escalation always a vulnerability?',
			answer: 'In web applications, unintended privilege escalation is always a vulnerability. Legitimate privilege changes (like admin promoting a user) are features, not vulnerabilities. The vulnerability is when users can escalate their own privileges or access what they shouldn\'t. Even "low severity" escalation can chain with other issues for full compromise.'
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

	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"itemListElement": [
			{"@type": "ListItem", "position": 1, "name": "Knowledge Base", "item": "https://vibeship.co/kb"},
			{"@type": "ListItem", "position": 2, "name": "Security", "item": "https://vibeship.co/kb/security"},
			{"@type": "ListItem", "position": 3, "name": "Vulnerabilities", "item": "https://vibeship.co/kb/security/vulnerabilities"},
			{"@type": "ListItem", "position": 4, "name": "Privilege Escalation"}
		]
	}
	</script>`}

	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "TechArticle",
		"headline": "${meta.title}",
		"description": "${meta.description}",
		"author": {"@type": "Organization", "name": "VibeShip"},
		"publisher": {"@type": "Organization", "name": "VibeShip"},
		"datePublished": "2024-12-26",
		"dateModified": "2024-12-26"
	}
	</script>`}

	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "FAQPage",
		"mainEntity": ${JSON.stringify(faqs.map(faq => ({
			"@type": "Question",
			"name": faq.question,
			"acceptedAnswer": {"@type": "Answer", "text": faq.answer}
		})))}
	}
	</script>`}
</svelte:head>

<Header {breadcrumbs} />

<div class="content-wrapper">
	<article class="content-main content-wide">
		<header class="article-header">
			<div class="badge-row">
				<span class="badge badge-high">High/Critical</span>
				<span class="badge">{securityData.cweId}</span>
				<span class="badge">OWASP #1 (2021)</span>
			</div>
			<h1>Privilege Escalation in Vibe Coded Apps</h1>
			<p class="text-secondary">When users become admins without permission</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Privilege escalation happens when users gain access they shouldn't have.</strong>
				Vertical: regular user becomes admin. Horizontal: user accesses other users' data.
				Broken Access Control is #1 on the OWASP Top 10 (2021). The fix: check authorization on every request, apply least privilege, and use a centralized access control layer.
			</p>
		</div>

		<!-- Stats Box -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">#1</div>
				<div class="stat-label">OWASP Top 10 (2021)</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">94%</div>
				<div class="stat-label">Apps with access control issues</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Vertical</div>
				<div class="stat-label">User → Admin</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Horizontal</div>
				<div class="stat-label">User → Other User</div>
			</div>
		</div>
		<p class="data-source">
			Source: <a href="https://owasp.org/Top10/A01_2021-Broken_Access_Control/">OWASP Top 10 2021</a>
		</p>

		<!-- What Is It - @ninascales voice (architect, big picture) -->
		<section class="article-section">
			<h2>What is privilege escalation?</h2>
			<p>
				Privilege escalation is like a hotel guest finding the master key. Suddenly they can open any room, not just their own. In web apps, it's when users break out of their intended access level.
			</p>

			<div class="escalation-types">
				<div class="escalation-type">
					<div class="escalation-icon vertical-icon">↑</div>
					<div class="escalation-content">
						<h3>Vertical Escalation</h3>
						<p>Regular user → Admin. A standard user accesses admin-only functions like user management, billing settings, or system configuration.</p>
						<div class="escalation-example">Example: User navigates to /admin/users and can delete accounts</div>
					</div>
				</div>
				<div class="escalation-type">
					<div class="escalation-icon horizontal-icon">↔</div>
					<div class="escalation-content">
						<h3>Horizontal Escalation</h3>
						<p>User 123 → User 456. A user accesses another user's data or functions at the same privilege level.</p>
						<div class="escalation-example">Example: User changes ID in /profile/123 to /profile/456 and sees another user's data</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Why Vibe Coded Apps -->
		<section class="article-section">
			<h2>Why vibe coded apps are vulnerable</h2>
			<p>
				AI generates role checks, but often misses edge cases. The architecture looks complete until you probe the gaps.
			</p>

			<div class="code-comparison">
				<div class="code-block code-bad">
					<div class="code-block-header">
						<span class="code-block-lang">Vulnerable - AI-generated admin check</span>
						<span class="code-label-bad">Incomplete protection</span>
					</div>
					<pre><code>{`// AI generates this pattern repeatedly
// Problem 1: Only checks on some routes
app.get('/admin/dashboard', requireAdmin, (req, res) => {
  // Protected
});

app.get('/admin/users', (req, res) => {
  // Oops - no requireAdmin! Anyone can access
  const users = await User.findAll();
  res.json(users);
});

// Problem 2: Role from client-side JWT
app.use((req, res, next) => {
  const token = req.headers.authorization;
  const decoded = jwt.decode(token); // Just decodes, doesn't verify!
  req.user = decoded;
  next();
});

// Problem 3: Missing ownership check
app.delete('/users/:id', requireAuth, (req, res) => {
  // Any logged-in user can delete any user!
  await User.destroy({ where: { id: req.params.id }});
});`}</code></pre>
				</div>
				<div class="code-block code-good">
					<div class="code-block-header">
						<span class="code-block-lang">Secure - Centralized access control</span>
						<span class="code-label-good">Fixed</span>
					</div>
					<pre><code>{`// Centralized authorization layer
const authorize = (requiredRole: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Always verify JWT, don't just decode
    const token = req.headers.authorization?.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check role from verified token
    if (!hasRole(decoded.roles, requiredRole)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    req.user = decoded;
    next();
  };
};

// Apply to ALL admin routes
app.use('/admin/*', authorize('admin'));

// Ownership check for user-specific resources
const authorizeOwner = async (req: Request, res: Response, next: NextFunction) => {
  const resource = await Resource.findById(req.params.id);
  if (resource.userId !== req.user.id && !hasRole(req.user.roles, 'admin')) {
    return res.status(403).json({ error: 'Not your resource' });
  }
  next();
};

app.delete('/users/:id', authorize('user'), authorizeOwner, deleteUser);`}</code></pre>
				</div>
			</div>

			<p>
				The pattern: AI generates point checks instead of a complete access control architecture. Routes get added without protection. JWT claims are trusted without verification.
			</p>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How to detect privilege escalation</h2>
			<p>
				Test what happens when users try to access resources beyond their role.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Testing Approach</span>
				</div>
				<pre><code>{`# Test 1: Direct admin URL access
# Login as regular user, then try admin routes
curl -H "Authorization: Bearer $USER_TOKEN" https://api.target.com/admin/users
# Should return 403, not 200

# Test 2: Modify role in JWT (if client-side checked)
# Decode your JWT, change role to "admin", re-encode
# If it works, the app only decodes, doesn't verify

# Test 3: Horizontal escalation (IDOR)
# Access another user's resources
curl -H "Authorization: Bearer $USER_TOKEN" https://api.target.com/users/OTHER_ID/profile
# Should return 403 if not your resource

# Test 4: Privilege after role downgrade
# Get demoted from admin to user, try admin routes
# Session should be invalidated, not just role updated

# Test 5: Missing function-level checks
# Map all endpoints, test each with different role tokens
for endpoint in $(cat endpoints.txt); do
  curl -s -o /dev/null -w "%{http_code} $endpoint\n" \
    -H "Authorization: Bearer $USER_TOKEN" "$endpoint"
done`}</code></pre>
			</div>

			<div class="check-list">
				<h3>Architecture review checklist</h3>
				<ul>
					<li>Is there a centralized authorization layer?</li>
					<li>Are ALL routes protected, including new ones?</li>
					<li>Are JWTs verified (not just decoded)?</li>
					<li>Are ownership checks performed for user resources?</li>
					<li>Is re-authentication required for sensitive operations?</li>
				</ul>
			</div>

			<div class="cta-box">
				<p><strong>Access control gaps hide in plain sight.</strong></p>
				<a href="https://scanner.vibeship.co" class="btn btn-green">
					Scan your authorization
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M5 12h14M12 5l7 7-7 7"/>
					</svg>
				</a>
			</div>
		</section>

		<!-- How to Fix -->
		<section class="article-section">
			<h2>How to fix privilege escalation</h2>
			<p>
				Build authorization into your architecture, not as scattered checks.
			</p>

			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>Copy this into your AI coding tool to find and fix privilege escalation vulnerabilities:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Audit my codebase for privilege escalation vulnerabilities.

## What to search for

1. Route definitions without auth middleware:
   \`\`\`
   app.get('/admin
   app.post('/admin
   router.get('/admin
   @Get('admin
   @Post('admin
   \`\`\`

2. JWT handling:
   \`\`\`
   jwt.decode(  // Should be jwt.verify
   decode(token  // Check if it's just decoding
   \`\`\`

3. Missing ownership checks:
   \`\`\`
   findById(req.params.id)
   findOne({ id: req.params
   where: { id: req.params
   \`\`\`
   Without subsequent user ownership validation.

4. Role checks:
   \`\`\`
   if (user.role
   req.user.role
   isAdmin
   hasPermission
   \`\`\`

## Detection steps

For each protected resource:
1. Is there an auth check?
2. Is there a role/permission check?
3. Is there an ownership check (for user-specific resources)?
4. Are JWT claims verified, not just decoded?
5. Is re-auth required for privilege changes?

## Fixes to apply

### Option A: Centralized middleware layer
\`\`\`typescript
// middleware/authorize.ts
export const authorize = (...allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // 1. Verify token (not just decode)
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'No token' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;
      req.user = decoded;

      // 2. Check roles
      const hasRole = allowedRoles.some(role =>
        decoded.roles.includes(role)
      );
      if (!hasRole) {
        return res.status(403).json({ error: 'Insufficient permissions' });
      }

      next();
    } catch (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
};

// Apply to route groups
app.use('/admin/*', authorize('admin'));
app.use('/api/users/*', authorize('user', 'admin'));
\`\`\`

### Option B: Resource ownership check
\`\`\`typescript
export const authorizeOwner = (resourceType: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const resource = await getResource(resourceType, req.params.id);

    if (!resource) {
      return res.status(404).json({ error: 'Not found' });
    }

    // Allow if owner OR admin
    if (resource.userId !== req.user.id &&
        !req.user.roles.includes('admin')) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    req.resource = resource;
    next();
  };
};
\`\`\`

### Option C: Default-deny policy
\`\`\`typescript
// All routes require auth by default
app.use(requireAuth);

// Explicitly allow public routes
const publicRoutes = ['/login', '/register', '/health'];
app.use((req, res, next) => {
  if (publicRoutes.includes(req.path)) {
    return next();
  }
  // All other routes require auth (already applied above)
  next();
});
\`\`\`

## Principle of least privilege checklist

- [ ] Default role is most restrictive
- [ ] Admins can't be created via registration
- [ ] Role changes require admin + re-authentication
- [ ] Session invalidated on role downgrade
- [ ] No wildcard permissions in production
- [ ] Audit log for privilege changes

## After fixing

1. Implement centralized authorization middleware
2. Add ownership checks for all user resources
3. Ensure JWT is verified, not just decoded
4. Re-authenticate for sensitive operations
5. Test all endpoints with different role tokens
6. Add logging for authorization failures`}</div>
				</div>
			</div>

			<div class="fix-section">
				<h3>Architectural principles</h3>
				<div class="principle-cards">
					<div class="principle-card">
						<h4>Least Privilege</h4>
						<p>Give users minimum access required. Start restrictive, grant access as needed. Never start permissive and try to restrict.</p>
					</div>
					<div class="principle-card">
						<h4>Default Deny</h4>
						<p>All routes require auth by default. Explicitly allowlist public routes. Missing middleware = denied, not allowed.</p>
					</div>
					<div class="principle-card">
						<h4>Centralized Checks</h4>
						<p>One authorization layer, not scattered checks. Route groups with shared middleware. Audit one place, not hundreds.</p>
					</div>
				</div>
			</div>
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
				<a href="/kb/security/vulnerabilities/bola/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">BOLA/IDOR</div>
					<p class="related-card-description">Horizontal escalation via object references</p>
				</a>
				<a href="/kb/security/vulnerabilities/bfla/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">BFLA</div>
					<p class="related-card-description">Broken function level authorization</p>
				</a>
				<a href="/kb/security/vulnerabilities/jwt-vulnerabilities/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">JWT Vulnerabilities</div>
					<p class="related-card-description">Token security issues</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Regular users shouldn't become admins</h2>
			<p>Find the gaps in your access control.</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">
				Scan for escalation
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M5 12h14M12 5l7 7-7 7"/>
				</svg>
			</a>
		</div>
	</article>
</div>

<style>
	.badge-row {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1rem;
		flex-wrap: wrap;
	}

	.data-source {
		font-size: 0.75rem;
		color: var(--text-tertiary);
		margin: 0.5rem 0 1.5rem;
	}

	.data-source a {
		color: var(--text-secondary);
	}

	/* Escalation Types */
	.escalation-types {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.escalation-type {
		display: flex;
		gap: 1.25rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.25rem;
	}

	.escalation-icon {
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.25rem;
		font-weight: bold;
		flex-shrink: 0;
	}

	.vertical-icon {
		background: rgba(255, 107, 107, 0.15);
		color: var(--red);
	}

	.horizontal-icon {
		background: rgba(255, 178, 55, 0.15);
		color: var(--orange);
	}

	.escalation-content h3 {
		margin: 0 0 0.5rem;
		font-size: 1rem;
	}

	.escalation-content p {
		margin: 0 0 0.75rem;
		font-size: 0.9375rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.escalation-example {
		font-size: 0.8125rem;
		color: var(--text-tertiary);
		font-family: 'JetBrains Mono', monospace;
		background: var(--bg-tertiary);
		padding: 0.5rem 0.75rem;
	}

	/* Code Comparison */
	.code-comparison {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.code-bad {
		border-left: 3px solid var(--red);
	}

	.code-good {
		border-left: 3px solid var(--green);
	}

	.code-label-bad,
	.code-label-good {
		font-size: 0.6875rem;
		padding: 0.125rem 0.5rem;
		text-transform: uppercase;
		font-weight: 600;
	}

	.code-label-bad {
		color: var(--red);
		background: rgba(255, 107, 107, 0.1);
	}

	.code-label-good {
		color: var(--green);
		background: rgba(0, 255, 136, 0.1);
	}

	/* Check List */
	.check-list {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.check-list h3 {
		margin: 0 0 1rem;
		font-size: 1rem;
	}

	.check-list ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.check-list li {
		padding: 0.5rem 0;
		border-bottom: 1px solid var(--border);
		font-size: 0.9375rem;
		color: var(--text-secondary);
	}

	.check-list li:last-child {
		border-bottom: none;
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

	/* Principle Cards */
	.principle-cards {
		display: grid;
		gap: 1rem;
		margin-top: 1rem;
	}

	.principle-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1rem 1.25rem;
	}

	.principle-card h4 {
		margin: 0 0 0.5rem;
		font-size: 0.9375rem;
		color: var(--text-primary);
	}

	.principle-card p {
		margin: 0;
		font-size: 0.875rem;
		color: var(--text-secondary);
		line-height: 1.6;
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

	@media (max-width: 768px) {
		.faq-item h3 {
			font-size: 1rem;
		}

		.escalation-type {
			flex-direction: column;
			gap: 0.75rem;
		}
	}
</style>
