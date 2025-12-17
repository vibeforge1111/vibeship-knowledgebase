<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Pre-Launch Security Checklist for Vibe Coders',
		description: '15-minute security audit for AI-generated apps. Check authentication, secrets, injection, and more before you ship. Copy-paste AI fix prompts included.',
		url: '/kb/security/checklists/pre-launch/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Checklists', href: '/kb/security/checklists' },
		{ label: 'Pre-Launch' }
	];

	// Checklist categories with items
	const categories = [
		{
			name: 'Authentication',
			description: 'Login, passwords, and sessions',
			items: [
				{
					id: 1,
					title: 'Protected endpoints require authentication',
					severity: 'Critical',
					aiMiss: 'AI creates functional routes without auth middleware',
					quickCheck: 'All /api/* routes that need protection have auth middleware',
					fixPrompt: 'Search for all API routes in /app/api/ and /pages/api/. For each route, verify there\'s an authentication check (getServerSession, auth, or middleware). Flag any routes handling sensitive operations without session verification.',
					link: '/kb/security/vulnerabilities/missing-auth/',
					linkText: 'Missing Authentication'
				},
				{
					id: 2,
					title: 'Passwords are hashed with bcrypt or Argon2',
					severity: 'Critical',
					aiMiss: 'AI sometimes uses weak hashing or stores plain text',
					quickCheck: 'No plain text passwords, no MD5/SHA1 for passwords',
					fixPrompt: 'Search for password storage patterns. Find any bcrypt.hash, argon2.hash, or raw password storage. Verify bcrypt uses at least 10 rounds or argon2 with proper memory settings. Flag any MD5, SHA1, or plain text storage.',
					link: '/kb/security/vulnerabilities/hardcoded-secrets/',
					linkText: 'Credential Security'
				},
				{
					id: 3,
					title: 'Sessions use httpOnly, secure cookies',
					severity: 'High',
					aiMiss: 'AI often uses localStorage or insecure cookies',
					quickCheck: 'Session cookies have httpOnly and secure flags',
					fixPrompt: 'Search for cookie configuration, session setup, and localStorage usage for tokens. Verify session cookies set httpOnly: true and secure: true. Flag any session tokens stored in localStorage or cookies without these flags.',
					link: 'https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html',
					linkText: 'OWASP Session Management',
					external: true
				},
				{
					id: 4,
					title: 'Rate limiting on login endpoints',
					severity: 'High',
					aiMiss: 'AI never adds rate limiting unless explicitly asked',
					quickCheck: 'Login and registration endpoints have rate limiting',
					fixPrompt: 'Find all authentication endpoints (/login, /register, /auth/*). Verify rate limiting middleware is applied. Look for upstash/ratelimit, express-rate-limit, or similar. Flag any auth endpoints without rate limiting.',
					link: '/kb/security/vulnerabilities/missing-rate-limiting/',
					linkText: 'Rate Limiting'
				}
			]
		},
		{
			name: 'Authorization',
			description: 'Access control and ownership',
			items: [
				{
					id: 5,
					title: 'Users can only access their own data',
					severity: 'Critical',
					aiMiss: 'AI checks if logged in, but not if authorized for THIS resource',
					quickCheck: 'Changing IDs in URLs doesn\'t expose other users\' data',
					fixPrompt: 'Search for database queries that fetch by ID (findById, findUnique, where: { id }). Verify each query also checks ownership (user_id, userId, ownerId). Flag queries that fetch by ID without ownership verification.',
					link: '/kb/security/vulnerabilities/idor/',
					linkText: 'IDOR Vulnerabilities'
				},
				{
					id: 6,
					title: 'Admin routes are protected with role checks',
					severity: 'Critical',
					aiMiss: 'AI creates admin features without role verification',
					quickCheck: 'Admin-only functionality requires admin role check',
					fixPrompt: 'Find all admin routes and dashboard pages. Verify each checks user role (isAdmin, role === "admin", hasRole("admin")). Flag any admin functionality accessible without explicit role verification.',
					link: '/kb/security/vulnerabilities/missing-auth/',
					linkText: 'Role-Based Access'
				},
				{
					id: 7,
					title: 'Database queries include ownership checks',
					severity: 'High',
					aiMiss: 'AI fetches by ID without verifying ownership',
					quickCheck: 'RLS enabled (Supabase) or WHERE user_id added (SQL/Prisma)',
					fixPrompt: 'Check Supabase tables for RLS policies. For Prisma/SQL, search for SELECT/UPDATE/DELETE queries and verify they include user_id or ownership WHERE clause. Flag tables without RLS or queries without ownership filters.',
					link: '/kb/security/stacks/nextjs-supabase/',
					linkText: 'Row Level Security'
				}
			]
		},
		{
			name: 'Data Protection',
			description: 'Secrets and sensitive data',
			items: [
				{
					id: 8,
					title: 'No hardcoded secrets in code',
					severity: 'Critical',
					aiMiss: 'AI generates example keys that get committed',
					quickCheck: 'API keys, database URLs in environment variables only',
					fixPrompt: 'Search for patterns: sk-, pk-, api_key, secret, password, DATABASE_URL, SUPABASE_, STRIPE_ in all source files (not .env). Flag any hardcoded credentials, API keys, or connection strings in code.',
					link: '/kb/security/vulnerabilities/hardcoded-secrets/',
					linkText: 'Hardcoded Secrets'
				},
				{
					id: 9,
					title: '.env files are gitignored',
					severity: 'Critical',
					aiMiss: 'AI sometimes puts secrets in committed files',
					quickCheck: '.gitignore includes .env, .env.local, .env.*.local',
					fixPrompt: 'Check .gitignore for .env entries. Run git log to check if any .env files were ever committed. Search git history for sensitive patterns. Flag missing gitignore entries or previously committed secrets.',
					link: '/kb/security/vulnerabilities/hardcoded-secrets/',
					linkText: 'Secret Management'
				},
				{
					id: 10,
					title: 'Service keys not exposed to client',
					severity: 'Critical',
					aiMiss: 'AI confuses client and server contexts',
					quickCheck: 'NEXT_PUBLIC_ not used for secrets, service_role server-only',
					fixPrompt: 'Search for NEXT_PUBLIC_ environment variables. Verify none contain secrets, API keys, or service tokens. Check Supabase service_role key is only used in server components/API routes. Flag any secrets exposed via NEXT_PUBLIC_ or in client bundles.',
					link: '/kb/security/stacks/nextjs-supabase/',
					linkText: 'Client vs Server Keys'
				}
			]
		},
		{
			name: 'Input/Output',
			description: 'Validation, injection, and XSS',
			items: [
				{
					id: 11,
					title: 'Database queries use parameterized statements',
					severity: 'Critical',
					aiMiss: 'AI uses template literals because they\'re readable',
					quickCheck: 'No template literals with user input in SQL',
					fixPrompt: 'Search for SQL patterns: $queryRawUnsafe, template literals in queries, string concatenation with user input. Verify Prisma uses tagged templates ($queryRaw``) not string interpolation. Flag any query building with template literals or concatenation.',
					link: '/kb/security/vulnerabilities/sql-injection/',
					linkText: 'SQL Injection'
				},
				{
					id: 12,
					title: 'User input is validated server-side',
					severity: 'High',
					aiMiss: 'AI validates in frontend, forgets backend',
					quickCheck: 'Zod, yup, or manual validation in API routes',
					fixPrompt: 'Find all API routes that accept user input (req.body, request.json()). Verify each has server-side validation (Zod schema, yup validation, or explicit type checking). Flag any endpoint that passes input directly to database without validation.',
					link: '/kb/security/vulnerabilities/sql-injection/',
					linkText: 'Input Validation'
				},
				{
					id: 13,
					title: 'No raw HTML rendering with user content',
					severity: 'Critical',
					aiMiss: 'AI uses innerHTML for flexibility',
					quickCheck: 'No dangerouslySetInnerHTML, v-html, or @html with user data',
					fixPrompt: 'Search for dangerouslySetInnerHTML, v-html, @html, innerHTML assignments. For each found, trace the source - if it includes user input, flag it. Verify DOMPurify or similar sanitizer is used if raw HTML rendering is necessary.',
					link: '/kb/security/vulnerabilities/xss/',
					linkText: 'XSS Prevention'
				}
			]
		},
		{
			name: 'Infrastructure',
			description: 'CORS, headers, and rate limiting',
			items: [
				{
					id: 14,
					title: 'CORS configured with specific origins',
					severity: 'High',
					aiMiss: 'AI uses wildcard to "fix" CORS errors',
					quickCheck: 'Not using origin: \'*\' with credentials',
					fixPrompt: 'Search for Access-Control-Allow-Origin, cors(), and CORS configuration. Flag any wildcard (*) origins combined with credentials. Verify allowed origins are explicitly whitelisted, not reflected from request.',
					link: '/kb/security/vulnerabilities/insecure-cors/',
					linkText: 'Insecure CORS'
				},
				{
					id: 15,
					title: 'Rate limiting on API endpoints',
					severity: 'Medium',
					aiMiss: 'AI never adds rate limiting to general APIs',
					quickCheck: 'Protection against DoS and API abuse',
					fixPrompt: 'Find all public API endpoints. Verify rate limiting middleware is applied globally or per-route. Check for upstash/ratelimit, express-rate-limit, next-rate-limit, or similar. Flag any high-volume endpoints without rate limiting.',
					link: '/kb/security/vulnerabilities/missing-rate-limiting/',
					linkText: 'API Rate Limiting'
				}
			]
		}
	];

	// Comprehensive AI Fix Prompt
	const masterAiPrompt = `Perform a security audit of my codebase using this checklist:

## 1. Authentication Checks
- Search for all API routes. Verify protected routes have auth middleware (getServerSession, auth checks)
- Find password storage patterns. Verify bcrypt (10+ rounds) or argon2 is used
- Check session/cookie configuration for httpOnly: true and secure: true flags
- Find auth endpoints (/login, /register). Verify rate limiting is applied

## 2. Authorization Checks
- Search for queries by ID (findById, where: {id}). Verify ownership checks exist
- Find admin routes/pages. Verify role checks (isAdmin, role === "admin")
- Check Supabase RLS policies. For Prisma, verify user_id in WHERE clauses

## 3. Data Protection Checks
- Search for hardcoded patterns: sk-, pk-, api_key, secret, password in source files
- Verify .gitignore includes .env* patterns
- Check git history for committed secrets: git log -p | grep -i "password\\|secret\\|api_key"
- Find NEXT_PUBLIC_ variables. Verify none contain secrets

## 4. Input/Output Checks
- Search for $queryRawUnsafe, template literals in SQL, string concatenation
- Find API routes accepting user input. Verify Zod/yup validation exists
- Search for dangerouslySetInnerHTML, v-html, @html. Verify user input is sanitized

## 5. Infrastructure Checks
- Search for CORS configuration. Flag origin: '*' with credentials
- Find public API endpoints. Verify rate limiting middleware exists

For each issue found:
1. Show the file and line number
2. Explain the vulnerability
3. Provide the fixed code

Output a summary table:
| Check | Status | File | Issue |
|-------|--------|------|-------|`;

	// FAQ data
	const faqs = [
		{
			question: 'What security checks should I do before launching?',
			answer: 'Focus on the critical 15: authentication on protected routes, password hashing, secure sessions, rate limiting on login, IDOR prevention, admin role checks, database ownership filters, no hardcoded secrets, gitignored env files, server-only secrets, parameterized queries, server-side validation, XSS prevention, CORS configuration, and API rate limiting.'
		},
		{
			question: 'How do I secure my AI-generated app?',
			answer: 'Use the AI fix prompt in this checklist to scan your vibe coded app automatically. AI tools prioritize working code over secure code, so they commonly miss authentication on routes, ownership checks in queries, and use insecure defaults like CORS wildcards. This checklist catches the top 15 issues AI tools miss.'
		},
		{
			question: 'What are the minimum security requirements for a web app?',
			answer: 'At minimum: authentication on protected routes, hashed passwords, ownership checks on data access, no hardcoded secrets, parameterized database queries, and input validation. The OWASP Application Security Verification Standard (ASVS) defines three levels - this checklist covers Level 1 essentials that every app needs.'
		},
		{
			question: 'How long does a security audit take?',
			answer: 'This pre-launch checklist takes about 15 minutes with the AI fix prompts. A full professional penetration test takes days or weeks. For vibe coded MVPs, this checklist catches the critical issues that would make you an easy target. Run it before every launch, then consider professional testing as you scale.'
		},
		{
			question: 'Can I automate security checks?',
			answer: 'Yes. Copy the AI fix prompt to your AI coding tool (Cursor, Claude Code) to automatically scan your codebase. For CI/CD, use tools like Semgrep, Snyk, or GitHub CodeQL. VibeShip Scanner is specifically designed for AI-generated code patterns that generic tools miss.'
		}
	];

	// State for checklist
	let checklistState = $state<Record<number, 'yes' | 'no' | 'na' | null>>({});
	let copied = $state(false);

	function toggleItem(id: number, status: 'yes' | 'no' | 'na') {
		if (checklistState[id] === status) {
			checklistState[id] = null;
		} else {
			checklistState[id] = status;
		}
	}

	function copyPrompt() {
		navigator.clipboard.writeText(masterAiPrompt);
		copied = true;
		setTimeout(() => copied = false, 2000);
	}

	function getCompletedCount() {
		return Object.values(checklistState).filter(v => v === 'yes' || v === 'na').length;
	}

	function getIssueCount() {
		return Object.values(checklistState).filter(v => v === 'no').length;
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
			{"@type": "ListItem", "position": 3, "name": "Checklists", "item": "https://vibeship.co/kb/security/checklists"},
			{"@type": "ListItem", "position": 4, "name": "Pre-Launch"}
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
			<div class="time-badge">15-Minute Audit</div>
			<h1>Pre-Launch Security Checklist for Vibe Coders</h1>
			<p class="subtitle">15 essential security checks AI coding tools miss - with copy-paste fix prompts</p>
		</header>

		<!-- Quick Answer Box -->
		<section class="quick-answer">
			<h2>Quick Answer</h2>
			<p>
				<strong>Before launching your vibe coded app, check 5 areas:</strong> authentication (login, passwords, sessions), authorization (who can access what), data protection (no hardcoded secrets), input/output (SQL injection, XSS), and infrastructure (CORS, rate limiting). This checklist catches what AI tools miss - based on <a href="https://owasp.org/www-project-application-security-verification-standard/">OWASP ASVS</a> essentials.
			</p>
		</section>

		<!-- Progress Indicator -->
		<section class="progress-section">
			<div class="progress-stats">
				<div class="stat">
					<span class="stat-value">{getCompletedCount()}</span>
					<span class="stat-label">/ 15 Checked</span>
				</div>
				<div class="stat issues">
					<span class="stat-value">{getIssueCount()}</span>
					<span class="stat-label">Issues Found</span>
				</div>
			</div>
			<div class="progress-bar">
				<div class="progress-fill" style="width: {(getCompletedCount() / 15) * 100}%"></div>
			</div>
		</section>

		<!-- Why This Checklist -->
		<section class="content-section">
			<h2>Why This Checklist Exists</h2>
			<p>
				AI coding tools generate working code, not secure code. The <a href="https://owasp.org/www-project-application-security-verification-standard/">OWASP ASVS</a> has 300+ security requirements - overwhelming for a quick launch. This checklist covers the critical 15 items that <a href="/kb/ai-patterns/cursor/">Cursor</a>, <a href="/kb/ai-patterns/bolt/">Bolt</a>, and <a href="/kb/ai-patterns/claude-code/">Claude Code</a> commonly miss.
			</p>
			<p>
				Think of this as a 15-minute security gut-check before you ship your vibe coded MVP. Each item links to a detailed article if you need to dig deeper.
			</p>
		</section>

		<!-- How to Use -->
		<section class="content-section">
			<h2>How to Use This Checklist</h2>
			<p>
				Go through each item and mark it: <strong>Yes</strong> (secure), <strong>No</strong> (needs fix), or <strong>N/A</strong> (not applicable). For any "No" items, use the AI fix prompt to automatically find and fix the issue. The master prompt at the bottom runs all checks at once.
			</p>
		</section>

		<!-- Checklist Categories -->
		{#each categories as category}
			<section class="checklist-category">
				<div class="category-header">
					<h2>{category.name}</h2>
					<p class="category-description">{category.description}</p>
				</div>

				<div class="checklist-items">
					{#each category.items as item}
						<div class="checklist-item" class:checked={checklistState[item.id] === 'yes'} class:issue={checklistState[item.id] === 'no'} class:na={checklistState[item.id] === 'na'}>
							<div class="item-header">
								<span class="item-number">{item.id}</span>
								<h3>{item.title}</h3>
								<span class="severity-tag {item.severity.toLowerCase()}">{item.severity}</span>
							</div>

							<div class="item-content">
								<div class="ai-miss">
									<strong>AI Pattern:</strong> {item.aiMiss}
								</div>
								<div class="quick-check">
									<strong>Quick Check:</strong> {item.quickCheck}
								</div>
							</div>

							<div class="item-actions">
								<div class="status-buttons">
									<button
										class="status-btn yes"
										class:active={checklistState[item.id] === 'yes'}
										onclick={() => toggleItem(item.id, 'yes')}
									>
										✓ Yes
									</button>
									<button
										class="status-btn no"
										class:active={checklistState[item.id] === 'no'}
										onclick={() => toggleItem(item.id, 'no')}
									>
										✗ No
									</button>
									<button
										class="status-btn na"
										class:active={checklistState[item.id] === 'na'}
										onclick={() => toggleItem(item.id, 'na')}
									>
										N/A
									</button>
								</div>
								{#if item.external}
									<a href={item.link} target="_blank" rel="noopener" class="learn-more">
										{item.linkText} →
									</a>
								{:else}
									<a href={item.link} class="learn-more">{item.linkText} →</a>
								{/if}
							</div>

							{#if checklistState[item.id] === 'no'}
								<div class="fix-prompt">
									<strong>AI Fix Prompt:</strong>
									<pre>{item.fixPrompt}</pre>
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</section>
		{/each}

		<!-- Master AI Fix Prompt -->
		<section class="content-section ai-fix-section">
			<h2>Complete AI Security Audit Prompt</h2>
			<p>Copy this prompt to run all 15 checks at once in your AI coding tool:</p>

			<div class="prompt-container">
				<button class="copy-button" onclick={copyPrompt}>
					{copied ? '✓ Copied!' : 'Copy Full Prompt'}
				</button>
				<pre class="ai-prompt">{masterAiPrompt}</pre>
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
			<h2>Deep-Dive Security Guides</h2>

			<div class="related-grid">
				<a href="/kb/security/vulnerabilities/sql-injection/" class="related-card">
					<h3>SQL Injection</h3>
					<p>The #1 database vulnerability in AI-generated code</p>
				</a>
				<a href="/kb/security/vulnerabilities/xss/" class="related-card">
					<h3>Cross-Site Scripting (XSS)</h3>
					<p>When AI uses dangerouslySetInnerHTML without sanitization</p>
				</a>
				<a href="/kb/security/vulnerabilities/hardcoded-secrets/" class="related-card">
					<h3>Hardcoded Secrets</h3>
					<p>API keys and credentials committed to git</p>
				</a>
				<a href="/kb/security/stacks/nextjs-supabase/" class="related-card">
					<h3>Next.js + Supabase Security</h3>
					<p>RLS, service keys, and authentication patterns</p>
				</a>
				<a href="/kb/security/stacks/nextjs-prisma/" class="related-card">
					<h3>Next.js + Prisma Security</h3>
					<p>ORM injection and query security</p>
				</a>
				<a href="/kb/security/vulnerabilities/insecure-cors/" class="related-card">
					<h3>Insecure CORS</h3>
					<p>Why origin: '*' is dangerous and how to fix it</p>
				</a>
			</div>
		</section>

		<!-- CTA -->
		<section class="cta-section">
			<h2>Automated Security Scanning for Vibe Coded Apps</h2>
			<p>VibeShip Scanner runs these checks automatically and catches patterns specific to AI-generated code.</p>
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

	.time-badge {
		display: inline-block;
		padding: 0.25rem 0.75rem;
		border-radius: 4px;
		font-size: 0.75rem;
		font-weight: 600;
		background: rgba(34, 197, 94, 0.2);
		color: #22c55e;
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

	.progress-section {
		background: var(--bg-tertiary);
		padding: 1.5rem;
		border-radius: 8px;
		margin-bottom: 2rem;
	}

	.progress-stats {
		display: flex;
		justify-content: space-between;
		margin-bottom: 1rem;
	}

	.stat {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
	}

	.stat-value {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--green);
	}

	.stat.issues .stat-value {
		color: #ef4444;
	}

	.stat-label {
		color: var(--text-secondary);
		font-size: 0.875rem;
	}

	.progress-bar {
		height: 8px;
		background: var(--bg-primary);
		border-radius: 4px;
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		background: var(--green);
		border-radius: 4px;
		transition: width 0.3s ease;
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

	.checklist-category {
		margin-bottom: 3rem;
	}

	.category-header {
		margin-bottom: 1.5rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--border-color);
	}

	.category-header h2 {
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: 0.25rem;
	}

	.category-description {
		color: var(--text-secondary);
		margin: 0;
		font-size: 0.9375rem;
	}

	.checklist-items {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.checklist-item {
		background: var(--bg-tertiary);
		border: 1px solid var(--border-color);
		border-radius: 8px;
		padding: 1.25rem;
		transition: border-color 0.2s;
	}

	.checklist-item.checked {
		border-color: rgba(34, 197, 94, 0.5);
	}

	.checklist-item.issue {
		border-color: rgba(239, 68, 68, 0.5);
	}

	.checklist-item.na {
		opacity: 0.7;
	}

	.item-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 1rem;
	}

	.item-number {
		width: 28px;
		height: 28px;
		background: var(--bg-primary);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--text-secondary);
		flex-shrink: 0;
	}

	.item-header h3 {
		font-size: 1rem;
		font-weight: 600;
		margin: 0;
		flex: 1;
	}

	.severity-tag {
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		font-size: 0.75rem;
		font-weight: 600;
		flex-shrink: 0;
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

	.item-content {
		margin-bottom: 1rem;
		font-size: 0.9375rem;
	}

	.ai-miss, .quick-check {
		margin-bottom: 0.5rem;
		color: var(--text-secondary);
		line-height: 1.5;
	}

	.item-actions {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.status-buttons {
		display: flex;
		gap: 0.5rem;
	}

	.status-btn {
		padding: 0.5rem 1rem;
		border: 1px solid var(--border-color);
		background: var(--bg-primary);
		border-radius: 6px;
		font-size: 0.875rem;
		cursor: pointer;
		transition: all 0.2s;
	}

	.status-btn:hover {
		border-color: var(--text-secondary);
	}

	.status-btn.yes.active {
		background: rgba(34, 197, 94, 0.2);
		border-color: #22c55e;
		color: #22c55e;
	}

	.status-btn.no.active {
		background: rgba(239, 68, 68, 0.2);
		border-color: #ef4444;
		color: #ef4444;
	}

	.status-btn.na.active {
		background: rgba(156, 163, 175, 0.2);
		border-color: #9ca3af;
		color: #9ca3af;
	}

	.learn-more {
		color: var(--green-dim);
		text-decoration: none;
		font-size: 0.875rem;
	}

	.learn-more:hover {
		text-decoration: underline;
	}

	.fix-prompt {
		margin-top: 1rem;
		padding-top: 1rem;
		border-top: 1px solid var(--border-color);
	}

	.fix-prompt strong {
		display: block;
		margin-bottom: 0.5rem;
		color: #ef4444;
		font-size: 0.875rem;
	}

	.fix-prompt pre {
		background: var(--bg-primary);
		padding: 1rem;
		border-radius: 6px;
		font-size: 0.8125rem;
		line-height: 1.5;
		overflow-x: auto;
		white-space: pre-wrap;
		margin: 0;
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
