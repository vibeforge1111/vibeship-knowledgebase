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
			answer: 'Yes. Copy the AI fix prompt to your AI coding tool (Cursor, Claude Code) to automatically scan your codebase. For CI/CD, use tools like Semgrep, Snyk, or GitHub CodeQL. vibeship scanner is specifically designed for AI-generated code patterns that generic tools miss.'
		}
	];

	// State for checklist
	let checklistState = $state<Record<number, 'yes' | 'no' | 'na' | null>>({});
	let expandedPrompt = $state<number | null>(null);
	let copied = $state(false);
	let promptCopied = $state(false);

	function toggleItem(id: number, status: 'yes' | 'no' | 'na') {
		if (checklistState[id] === status) {
			checklistState[id] = null;
			if (status === 'no') expandedPrompt = null;
		} else {
			checklistState[id] = status;
			if (status === 'no') {
				expandedPrompt = id;
			} else {
				if (expandedPrompt === id) expandedPrompt = null;
			}
		}
	}

	function copyPrompt() {
		navigator.clipboard.writeText(masterAiPrompt);
		copied = true;
		setTimeout(() => copied = false, 2000);
	}

	function copyItemPrompt(prompt: string) {
		navigator.clipboard.writeText(prompt);
		promptCopied = true;
		setTimeout(() => promptCopied = false, 2000);
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

<Header {breadcrumbs} />

<div class="content-wrapper">
	<article class="content-main content-wide">
		<!-- Header -->
		<header class="article-header">
			<h1>Pre-Launch Security Checklist</h1>
			<p class="subtitle">15 essential checks AI coding tools miss - with copy-paste fix prompts</p>
			<div class="article-meta">
				<span class="article-meta-item">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<circle cx="12" cy="12" r="10"/>
						<path d="M12 6v6l4 2"/>
					</svg>
					15 min audit
				</span>
				<span class="article-meta-item">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M9 11l3 3L22 4"/>
						<path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
					</svg>
					15 checks
				</span>
			</div>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Before launching your vibe coded app, check 5 areas:</strong> authentication (login, passwords, sessions), authorization (who can access what), data protection (no hardcoded secrets), input/output (SQL injection, XSS), and infrastructure (CORS, rate limiting). Based on <a href="https://owasp.org/www-project-application-security-verification-standard/">OWASP ASVS</a> essentials.
			</p>
		</div>

		<!-- Progress -->
		<div class="progress-box">
			<div class="progress-stats">
				<div class="progress-stat">
					<span class="progress-value text-green">{getCompletedCount()}</span>
					<span class="progress-label">/ 15 Checked</span>
				</div>
				<div class="progress-stat">
					<span class="progress-value text-red">{getIssueCount()}</span>
					<span class="progress-label">Issues Found</span>
				</div>
			</div>
			<div class="progress-bar">
				<div class="progress-fill" style="width: {(getCompletedCount() / 15) * 100}%"></div>
			</div>
		</div>

		<!-- Intro -->
		<section class="article-section">
			<h2>Why this checklist?</h2>
			<p>
				AI coding tools generate working code, not secure code. The <a href="https://owasp.org/www-project-application-security-verification-standard/">OWASP ASVS</a> has 300+ requirements - this checklist covers the critical 15 items that <a href="/kb/vibe-coding-tools/cursor/">Cursor</a>, <a href="/kb/vibe-coding-tools/bolt/">Bolt</a>, and <a href="/kb/vibe-coding-tools/claude-code/">Claude Code</a> commonly miss.
			</p>
		</section>

		<!-- Checklist Categories -->
		{#each categories as category}
			<section class="article-section">
				<h2>{category.name}</h2>
				<p class="category-desc">{category.description}</p>

				<div class="checklist-list">
					{#each category.items as item}
						<div class="check-item" class:check-pass={checklistState[item.id] === 'yes'} class:check-fail={checklistState[item.id] === 'no'} class:check-skip={checklistState[item.id] === 'na'}>
							<div class="check-header">
								<span class="check-num">{item.id}</span>
								<div class="check-title-wrap">
									<h3 class="check-title">{item.title}</h3>
									<span class="severity severity-{item.severity.toLowerCase()}">{item.severity}</span>
								</div>
							</div>

							<div class="check-body">
								<p class="check-detail"><strong>AI Pattern:</strong> {item.aiMiss}</p>
								<p class="check-detail"><strong>Quick Check:</strong> {item.quickCheck}</p>
							</div>

							<div class="check-actions">
								<div class="check-buttons">
									<button
										type="button"
										class="check-btn check-btn-yes"
										class:active={checklistState[item.id] === 'yes'}
										onclick={() => toggleItem(item.id, 'yes')}
									>
										Yes
									</button>
									<button
										type="button"
										class="check-btn check-btn-no"
										class:active={checklistState[item.id] === 'no'}
										onclick={() => toggleItem(item.id, 'no')}
									>
										No
									</button>
									<button
										type="button"
										class="check-btn check-btn-na"
										class:active={checklistState[item.id] === 'na'}
										onclick={() => toggleItem(item.id, 'na')}
									>
										N/A
									</button>
								</div>
								{#if item.external}
									<a href={item.link} target="_blank" rel="noopener" class="check-link">{item.linkText}</a>
								{:else}
									<a href={item.link} class="check-link">{item.linkText}</a>
								{/if}
							</div>
						</div>

						<!-- AI Fix Prompt shown below the item when "No" is selected -->
						{#if expandedPrompt === item.id}
							<div class="fix-prompt-box">
								<div class="fix-prompt-header">
									<span class="fix-prompt-label">AI Fix Prompt</span>
									<button type="button" class="copy-btn small" onclick={() => copyItemPrompt(item.fixPrompt)}>
										{promptCopied ? 'Copied!' : 'Copy'}
									</button>
								</div>
								<pre class="fix-prompt-content">{item.fixPrompt}</pre>
							</div>
						{/if}
					{/each}
				</div>
			</section>
		{/each}

		<!-- Master AI Fix Prompt -->
		<section class="article-section">
			<h2>Complete AI security audit prompt</h2>
			<p>Copy this prompt to run all 15 checks at once in your AI coding tool:</p>

			<div class="prompt-box">
				<div class="prompt-header">
					<span class="prompt-label">AI Security Fix Prompt</span>
					<button type="button" class="copy-btn" onclick={copyPrompt}>
						{copied ? 'Copied!' : 'Copy prompt'}
					</button>
				</div>
				<pre class="prompt-content">{masterAiPrompt}</pre>
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
			<h2>Related guides</h2>

			<div class="related-grid">
				<a href="/kb/security/vulnerabilities/sql-injection/" class="card card-interactive">
					<h3>SQL Injection</h3>
					<p>The #1 database vulnerability in AI-generated code</p>
				</a>
				<a href="/kb/security/vulnerabilities/xss/" class="card card-interactive">
					<h3>Cross-Site Scripting</h3>
					<p>When AI uses dangerouslySetInnerHTML without sanitization</p>
				</a>
				<a href="/kb/security/vulnerabilities/hardcoded-secrets/" class="card card-interactive">
					<h3>Hardcoded Secrets</h3>
					<p>API keys and credentials committed to git</p>
				</a>
				<a href="/kb/security/stacks/nextjs-supabase/" class="card card-interactive">
					<h3>Next.js + Supabase</h3>
					<p>RLS, service keys, and authentication patterns</p>
				</a>
			</div>
		</section>

		<!-- CTA -->
		<div class="final-cta">
			<h2>Automated Security Scanning</h2>
			<p>vibeship scanner runs these checks automatically and catches patterns specific to AI-generated code.</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">
				Scan your code free
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M5 12h14M12 5l7 7-7 7"/>
				</svg>
			</a>
		</div>
	</article>
</div>

<style>
	/* Category description */
	.category-desc {
		color: var(--text-tertiary);
		margin-bottom: 1rem;
		font-size: 0.9375rem;
	}

	/* Progress Box */
	.progress-box {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.25rem;
		margin-bottom: 2rem;
	}

	.progress-stats {
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.75rem;
	}

	.progress-stat {
		display: flex;
		align-items: baseline;
		gap: 0.35rem;
	}

	.progress-value {
		font-size: 1.5rem;
		font-weight: 700;
		font-family: 'JetBrains Mono', monospace;
	}

	.progress-label {
		color: var(--text-tertiary);
		font-size: 0.875rem;
	}

	.progress-bar {
		height: 6px;
		background: var(--bg-tertiary);
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		background: var(--green);
		transition: width 0.3s ease;
	}

	/* Checklist */
	.checklist-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.check-item {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.25rem;
		transition: border-color 0.2s;
	}

	.check-item.check-pass {
		border-color: var(--green);
	}

	.check-item.check-fail {
		border-color: var(--red);
	}

	.check-item.check-skip {
		opacity: 0.6;
	}

	.check-header {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		margin-bottom: 0.75rem;
	}

	.check-num {
		width: 24px;
		height: 24px;
		background: var(--bg-tertiary);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--text-secondary);
		flex-shrink: 0;
		font-family: 'JetBrains Mono', monospace;
	}

	.check-title-wrap {
		flex: 1;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
	}

	.check-title {
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
		font-size: 1rem;
		font-weight: 600;
		margin: 0;
		color: var(--text-primary);
		line-height: 1.4;
	}

	.severity {
		font-size: 0.65rem;
		padding: 0.15rem 0.4rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		font-weight: 600;
		flex-shrink: 0;
	}

	.severity-critical {
		background: var(--red);
		color: white;
	}

	.severity-high {
		background: var(--orange);
		color: white;
	}

	.severity-medium {
		background: var(--blue);
		color: white;
	}

	.check-body {
		margin-bottom: 1rem;
		padding-left: calc(24px + 0.75rem);
	}

	.check-detail {
		font-size: 0.875rem;
		color: var(--text-secondary);
		margin: 0 0 0.35rem;
		line-height: 1.5;
	}

	.check-detail strong {
		color: var(--text-primary);
	}

	.check-actions {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.75rem;
		padding-left: calc(24px + 0.75rem);
	}

	.check-buttons {
		display: flex;
		gap: 0.5rem;
	}

	.check-btn {
		padding: 0.4rem 0.75rem;
		border: 1px solid var(--border);
		background: var(--bg-tertiary);
		color: var(--text-secondary);
		font-size: 0.8rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.15s;
	}

	.check-btn:hover {
		border-color: var(--text-tertiary);
		color: var(--text-primary);
	}

	.check-btn-yes.active {
		background: var(--green);
		border-color: var(--green);
		color: white;
	}

	.check-btn-no.active {
		background: var(--red);
		border-color: var(--red);
		color: white;
	}

	.check-btn-na.active {
		background: var(--gray-500);
		border-color: var(--gray-500);
		color: white;
	}

	.check-link {
		font-size: 0.8rem;
		color: var(--green-dim);
		text-decoration: none;
	}

	.check-link:hover {
		color: var(--green);
		color: var(--green);
	}

	/* Fix Prompt Box - shown below item */
	.fix-prompt-box {
		background: var(--bg-tertiary);
		border: 1px solid var(--red);
		border-top: none;
		margin-top: -1px;
		padding: 1rem;
	}

	.fix-prompt-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.75rem;
	}

	.fix-prompt-label {
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--red);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.fix-prompt-content {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1rem;
		font-size: 0.8rem;
		line-height: 1.6;
		color: var(--text-secondary);
		white-space: pre-wrap;
		font-family: 'JetBrains Mono', monospace;
		margin: 0;
		overflow-x: auto;
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
		font-size: 0.8rem;
		line-height: 1.6;
		color: var(--text-secondary);
		white-space: pre-wrap;
		font-family: 'JetBrains Mono', monospace;
		overflow-x: auto;
		max-height: 400px;
		overflow-y: auto;
	}

	/* Copy Button */
	.copy-btn {
		padding: 0.4rem 0.75rem;
		background: var(--green);
		color: white;
		border: none;
		font-size: 0.75rem;
		font-weight: 500;
		cursor: pointer;
		transition: opacity 0.15s;
	}

	.copy-btn:hover {
		opacity: 0.9;
	}

	.copy-btn.small {
		padding: 0.25rem 0.5rem;
		font-size: 0.7rem;
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

	/* Related Grid */
	.related-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		margin-top: 1rem;
	}

	.related-grid .card {
		text-decoration: none;
	}

	.related-grid .card h3 {
		font-size: 1rem;
		margin: 0 0 0.35rem;
		color: var(--text-primary);
	}

	.related-grid .card p {
		font-size: 0.85rem;
		color: var(--text-secondary);
		margin: 0;
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
		margin-top: 0;
	}

	.final-cta p {
		color: var(--text-secondary);
		margin-bottom: 1.5rem;
		max-width: 500px;
		margin-left: auto;
		margin-right: auto;
	}

	/* Text colors */
	.text-green { color: var(--green); }
	.text-red { color: var(--red); }

	/* Mobile */
	@media (max-width: 768px) {
		.check-header {
			flex-wrap: wrap;
		}

		.check-title-wrap {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.35rem;
		}

		.check-body {
			padding-left: 0;
		}

		.check-actions {
			padding-left: 0;
			flex-direction: column;
			align-items: flex-start;
		}

		.check-buttons {
			width: 100%;
		}

		.check-btn {
			flex: 1;
			text-align: center;
		}

		.related-grid {
			grid-template-columns: 1fr;
		}

		.progress-stats {
			flex-direction: column;
			gap: 0.5rem;
		}

		.prompt-content {
			font-size: 0.7rem;
			max-height: 300px;
		}

		.fix-prompt-content {
			font-size: 0.7rem;
		}
	}
</style>
