<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Credential Stuffing: Prevent Automated Account Takeover',
		description: 'Credential stuffing uses stolen passwords to hijack user accounts. 5,800+ monthly searches. Learn detection and prevention for vibe coded apps.',
		url: '/kb/security/vulnerabilities/credential-stuffing/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Credential Stuffing' }
	];

	// Real external data sources
	const owaspData = {
		ranking: '#7',
		category: 'A07:2021 - Identification and Authentication Failures',
		source: 'https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/',
		cweId: 'CWE-307',
		cweSource: 'https://cwe.mitre.org/data/definitions/307.html'
	};

	// FAQ data for schema
	const faqs = [
		{
			question: 'What is credential stuffing?',
			answer: 'Credential stuffing is an automated attack where hackers use stolen username/password combinations from data breaches to log into other websites. Since people reuse passwords across sites, attackers can often access accounts on sites that were never breached. It differs from brute force because they use known-valid credentials, not random guesses.'
		},
		{
			question: 'How do attackers get the stolen credentials?',
			answer: 'Credentials come from data breaches at other companies. Major breaches like LinkedIn (700M records), Facebook (533M), and Collection #1 (773M emails) are sold on dark web forums. Attackers buy these lists and run them against login pages. If your users reused their LinkedIn password on your app, attackers can access their account on your site.'
		},
		{
			question: 'Why is credential stuffing hard to detect?',
			answer: 'Each login attempt uses real credentials that might be valid. Unlike brute force with random passwords, credential stuffing looks like legitimate users logging in. Attackers rotate IP addresses, use residential proxies, and space out attempts to avoid detection. Many apps have no visibility into these patterns until accounts are compromised.'
		},
		{
			question: 'Does rate limiting stop credential stuffing?',
			answer: 'Basic rate limiting helps but does not stop sophisticated attacks. Attackers distribute attacks across thousands of IP addresses, staying under per-IP limits. You need multiple layers: rate limiting by user, IP, fingerprint, and behavioral analysis. CAPTCHA after failed attempts adds friction that bots cannot easily bypass.'
		},
		{
			question: 'How do I protect my vibe coded app from credential stuffing?',
			answer: 'Implement defense in depth: rate limiting on login endpoints, CAPTCHA after failed attempts, account lockout with notification, and breach password checking (Have I Been Pwned API). Encourage or require MFA. Monitor for unusual login patterns like multiple failed attempts across different usernames from similar IP ranges.'
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
			{"@type": "ListItem", "position": 4, "name": "Credential Stuffing"}
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
		"datePublished": "2025-12-20",
		"dateModified": "2025-12-20"
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
				<span class="badge badge-critical">High</span>
				<span class="badge">CWE-307</span>
				<span class="badge">OWASP A07:2021</span>
			</div>
			<h1>Credential Stuffing in Vibe Coded Apps</h1>
			<p class="text-secondary">How attackers use stolen passwords to hijack your users' accounts</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Credential stuffing is when attackers use username/password combinations stolen from other data breaches to log into your app.</strong>
				Since most people reuse passwords, breached credentials from LinkedIn or Facebook often work on your site.
				It's automated, hard to detect, and leads to mass <a href="/kb/security/vulnerabilities/account-takeover/">account takeover</a>.
				Prevention requires rate limiting, CAPTCHA, breach password checking, and MFA.
			</p>
		</div>

		<!-- Stats Box -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">{owaspData.ranking}</div>
				<div class="stat-label">OWASP Ranking</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">{owaspData.cweId}</div>
				<div class="stat-label"><a href={owaspData.cweSource}>CWE ID</a></div>
			</div>
			<div class="stat-box">
				<div class="stat-value">65%</div>
				<div class="stat-label">Password Reuse Rate</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">High</div>
				<div class="stat-label">Severity</div>
			</div>
		</div>
		<p class="data-source">
			Source: <a href={owaspData.source}>OWASP Top 10 (2021)</a>, <a href="https://www.security.org/digital-safety/password-manager-annual-report/">Security.org Password Reuse Study</a>
		</p>

		<!-- What Is It -->
		<section class="article-section">
			<h2>What is credential stuffing?</h2>
			<p>
				Credential stuffing exploits a simple human behavior: password reuse. When a major site gets breached - LinkedIn, Adobe, Dropbox - millions of email/password combinations end up for sale on dark web forums. Attackers buy these lists and run them against other websites.
			</p>
			<p>
				If your user had the same password on LinkedIn and your app, their account is now compromised on your site - even though you were never breached. The attacker didn't guess the password. They knew it.
			</p>
			<p>
				This isn't theoretical. Billions of credentials are circulating from past breaches. According to <a href="https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/">OWASP</a>, authentication failures including credential stuffing rank #7 in the Top 10 web application security risks.
			</p>
		</section>

		<!-- Why AI Tools Don't Help -->
		<section class="article-section">
			<h2>Why AI coding tools don't prevent credential stuffing</h2>
			<p>
				When you ask <a href="/kb/vibe-coding-tools/cursor/">Cursor</a> or <a href="/kb/vibe-coding-tools/bolt/">Bolt</a> to "build a login page," you get a working login page. What you don't get: rate limiting, account lockout, CAPTCHA integration, breach password checking, or login anomaly detection.
			</p>
			<p>
				AI tools generate the happy path. Authentication that works for legitimate users. They don't generate the defensive layers that stop automated attacks. That's the gap vibe coders need to close manually.
			</p>

			<div class="code-comparison">
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-label bad">What AI generates</span>
					</div>
					<pre><code class="language-typescript">{`// Simple login - no protection against stuffing
async function login(email: string, password: string) {
  const user = await db.user.findUnique({ where: { email } })
  if (!user) return { error: 'Invalid credentials' }

  const valid = await bcrypt.compare(password, user.passwordHash)
  if (!valid) return { error: 'Invalid credentials' }

  return { success: true, user }
}`}</code></pre>
				</div>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-label good">What you need</span>
					</div>
					<pre><code class="language-typescript">{`// Login with credential stuffing protection
async function login(email: string, password: string, ip: string) {
  // Check rate limits by IP and email
  const ipAttempts = await rateLimiter.get(\`login:ip:\${ip}\`)
  const emailAttempts = await rateLimiter.get(\`login:email:\${email}\`)

  if (ipAttempts > 10) return { error: 'Too many attempts', requireCaptcha: true }
  if (emailAttempts > 5) return { error: 'Account locked', notifyUser: true }

  const user = await db.user.findUnique({ where: { email } })
  if (!user) {
    await rateLimiter.increment(\`login:ip:\${ip}\`)
    return { error: 'Invalid credentials' }
  }

  const valid = await bcrypt.compare(password, user.passwordHash)
  if (!valid) {
    await rateLimiter.increment(\`login:email:\${email}\`)
    await rateLimiter.increment(\`login:ip:\${ip}\`)
    await logFailedAttempt(email, ip) // For anomaly detection
    return { error: 'Invalid credentials' }
  }

  // Clear rate limits on successful login
  await rateLimiter.reset(\`login:email:\${email}\`)
  return { success: true, user }
}`}</code></pre>
				</div>
			</div>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How to detect credential stuffing attacks</h2>
			<p>
				Credential stuffing is harder to detect than brute force because attackers use real credentials. Look for these patterns:
			</p>

			<div class="detection-list">
				<div class="detection-item">
					<h4>High volume of failed logins</h4>
					<p>Multiple failed attempts across different usernames from similar IP ranges or time windows.</p>
				</div>
				<div class="detection-item">
					<h4>Successful logins from new locations</h4>
					<p>User suddenly logs in from a different country or IP that doesn't match their history.</p>
				</div>
				<div class="detection-item">
					<h4>Login attempts outside normal hours</h4>
					<p>Attacks often run during off-hours when they're less likely to be noticed.</p>
				</div>
				<div class="detection-item">
					<h4>Similar user-agent strings</h4>
					<p>Bot traffic often uses identical or rotating patterns of user-agents.</p>
				</div>
			</div>

			<p>
				Without logging and monitoring, you won't see these patterns. Most vibe coded apps have no visibility into login attempts until users report compromised accounts.
			</p>
		</section>

		<!-- Prevention -->
		<section class="article-section">
			<h2>How to prevent credential stuffing</h2>
			<p>
				Defense in depth is the only effective strategy. No single control stops credential stuffing.
			</p>

			<h3>1. Rate limiting</h3>
			<p>
				Limit login attempts by IP address, email/username, and device fingerprint. Be careful not to lock out legitimate users who forgot their password.
			</p>

			<h3>2. CAPTCHA on failed attempts</h3>
			<p>
				Show CAPTCHA after 2-3 failed login attempts. This adds friction that automated tools can't easily bypass. Use hCaptcha or reCAPTCHA v3 for better UX.
			</p>

			<h3>3. Breach password checking</h3>
			<p>
				Check passwords against known breach databases on signup and login. The <a href="https://haveibeenpwned.com/API/v3" target="_blank" rel="noopener">Have I Been Pwned API</a> is free and privacy-preserving (uses k-anonymity).
			</p>

			<h3>4. Multi-factor authentication</h3>
			<p>
				MFA stops credential stuffing cold. Even with the right password, attackers can't access accounts without the second factor. Strongly encourage or require MFA for sensitive apps.
			</p>

			<h3>5. Account lockout with notification</h3>
			<p>
				Lock accounts after repeated failures and email the user. They'll know something is wrong and can change their password.
			</p>
		</section>

		<!-- AI Fix Prompt -->
		<section class="article-section">
			<h2>AI fix prompt for credential stuffing protection</h2>
			<p>
				Copy this prompt into <a href="/kb/vibe-coding-tools/cursor/">Cursor</a>, <a href="/kb/vibe-coding-tools/claude-code/">Claude Code</a>, or your AI tool:
			</p>

			<div class="fix-prompt">
				<div class="fix-prompt-header">
					<span>Copy this prompt</span>
					<button class="copy-btn" onclick={copyPrompt}>
						{copied ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre id="ai-fix-prompt"><code>{`Add credential stuffing protection to my login endpoint:

REQUIREMENTS:
1. Rate limiting by IP (10 attempts per 15 minutes)
2. Rate limiting by email (5 attempts per hour)
3. Account lockout after 5 failed attempts with email notification
4. CAPTCHA trigger after 3 failed attempts
5. Check password against Have I Been Pwned API on signup
6. Log all failed attempts with IP, user-agent, timestamp

IMPLEMENTATION:
- Use Redis or in-memory store for rate limiting
- Use upstash/ratelimit or similar library
- Integrate hCaptcha or reCAPTCHA v3
- Use k-anonymity for HIBP API calls (privacy-preserving)
- Send notification email on account lockout
- Include unlock mechanism via email link

Return middleware/function that wraps the login handler.
Do not modify the core authentication logic.`}</code></pre>
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

		<!-- Scanner CTA -->
		<section class="cta-box">
			<h2>Check Your Login Security</h2>
			<p>
				<a href="https://scanner.vibeship.co">VibeShip Scanner</a> analyzes your authentication code for missing rate limiting, weak lockout policies, and other credential stuffing vulnerabilities.
			</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">Scan Your Code Free</a>
		</section>

		<!-- Related Content -->
		<section class="article-section">
			<h2>Related vulnerabilities</h2>
			<div class="related-grid">
				<a href="/kb/security/vulnerabilities/account-takeover/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Account Takeover</div>
					<p class="related-card-description">The end result of credential stuffing</p>
				</a>
				<a href="/kb/security/vulnerabilities/missing-rate-limiting/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Missing Rate Limiting</div>
					<p class="related-card-description">First line of defense against automation</p>
				</a>
				<a href="/kb/security/vulnerabilities/missing-auth/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Missing Authentication</div>
					<p class="related-card-description">When auth checks are skipped entirely</p>
				</a>
				<a href="/kb/security/vulnerabilities/hardcoded-secrets/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Hardcoded Secrets</div>
					<p class="related-card-description">API keys exposed in source code</p>
				</a>
			</div>
		</section>

		<!-- External Resources -->
		<section class="article-section">
			<h2>External resources</h2>
			<ul class="external-links">
				<li><a href="https://owasp.org/www-community/attacks/Credential_stuffing" target="_blank" rel="noopener">OWASP Credential Stuffing</a></li>
				<li><a href="https://cwe.mitre.org/data/definitions/307.html" target="_blank" rel="noopener">CWE-307: Improper Restriction of Excessive Authentication Attempts</a></li>
				<li><a href="https://haveibeenpwned.com/" target="_blank" rel="noopener">Have I Been Pwned</a> - Check if credentials are in breaches</li>
				<li><a href="https://cheatsheetseries.owasp.org/cheatsheets/Credential_Stuffing_Prevention_Cheat_Sheet.html" target="_blank" rel="noopener">OWASP Credential Stuffing Prevention Cheat Sheet</a></li>
			</ul>
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

	h1 {
		font-size: 2.5rem;
		margin-bottom: 0.5rem;
	}

	.text-secondary {
		color: var(--text-secondary);
		font-size: 1.1rem;
	}

	h2 {
		font-size: 1.5rem;
		margin-top: 2rem;
		margin-bottom: 1rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--border);
	}

	h3 {
		font-size: 1.2rem;
		margin-top: 1.5rem;
		margin-bottom: 0.5rem;
	}

	h4 {
		font-size: 1rem;
		margin-top: 0;
		margin-bottom: 0.25rem;
		color: var(--green-dim);
	}

	p {
		line-height: 1.7;
		margin-bottom: 1rem;
	}

	a {
		color: var(--green-dim);
	}

	a:hover {
		color: var(--green);
	}

	.article-section {
		margin-bottom: 2.5rem;
	}

	/* Stats Row */
	.stats-row {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
		margin: 1.5rem 0;
	}

	@media (max-width: 768px) {
		.stats-row {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.stat-box {
		background: var(--bg-secondary);
		padding: 1rem;
		text-align: center;
		border: 1px solid var(--border);
	}

	.stat-value {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--green-dim);
	}

	.stat-label {
		font-size: 0.875rem;
		color: var(--text-secondary);
		margin-top: 0.25rem;
	}

	.data-source {
		font-size: 0.875rem;
		color: var(--text-secondary);
		margin-top: 0.5rem;
	}

	/* Code Comparison */
	.code-comparison {
		display: grid;
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.code-block {
		border: 1px solid var(--border);
		overflow: hidden;
	}

	.code-block-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem 1rem;
		background: var(--bg-secondary);
		border-bottom: 1px solid var(--border);
	}

	.code-label {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.code-label.bad {
		color: #ef4444;
	}

	.code-label.good {
		color: #22c55e;
	}

	.code-block pre {
		margin: 0;
		padding: 1rem;
		overflow-x: auto;
		background: #0d0d0d;
	}

	.code-block code {
		font-family: 'JetBrains Mono', 'Fira Code', monospace;
		font-size: 0.8rem;
		line-height: 1.6;
	}

	/* Detection List */
	.detection-list {
		display: grid;
		gap: 1rem;
		margin: 1rem 0;
	}

	.detection-item {
		background: var(--bg-secondary);
		padding: 1rem;
		border: 1px solid var(--border);
	}

	.detection-item p {
		margin: 0;
		font-size: 0.9rem;
		color: var(--text-secondary);
	}

	/* Fix Prompt */
	.fix-prompt {
		background: var(--bg-secondary);
		border: 1px solid var(--green-dim);
		margin: 1rem 0;
	}

	.fix-prompt-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem 1rem;
		background: rgba(34, 197, 94, 0.1);
		border-bottom: 1px solid var(--border);
	}

	.fix-prompt pre {
		margin: 0;
		padding: 1rem;
		background: #0d0d0d;
		white-space: pre-wrap;
		word-wrap: break-word;
	}

	.fix-prompt code {
		font-family: 'JetBrains Mono', 'Fira Code', monospace;
		font-size: 0.8rem;
		line-height: 1.6;
	}

	/* FAQ */
	.faq-list {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.faq-item {
		padding-bottom: 1.5rem;
		border-bottom: 1px solid var(--border);
	}

	.faq-item:last-child {
		border-bottom: none;
	}

	.faq-item h3 {
		font-size: 1.1rem;
		margin-top: 0;
		margin-bottom: 0.5rem;
	}

	.faq-item p {
		margin: 0;
		color: var(--text-secondary);
	}

	/* CTA Box */
	.cta-box {
		background: rgba(0, 196, 154, 0.05);
		border: 1px solid rgba(0, 196, 154, 0.3);
		padding: 2rem;
		text-align: center;
		margin: 2rem 0;
	}

	.cta-box h2 {
		border-bottom: none;
		padding-bottom: 0;
		margin-top: 0;
	}

	/* Related Grid */
	.related-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		margin-top: 1rem;
	}

	@media (max-width: 768px) {
		.related-grid {
			grid-template-columns: 1fr;
		}
	}

	.related-card {
		padding: 1rem;
	}

	.related-card-category {
		font-size: 0.75rem;
		color: var(--green-dim);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 0.25rem;
	}

	.related-card-title {
		font-weight: 600;
		margin-bottom: 0.25rem;
	}

	.related-card-description {
		font-size: 0.875rem;
		color: var(--text-secondary);
		margin: 0;
	}

	/* External Links */
	.external-links {
		list-style: none;
		padding: 0;
	}

	.external-links li {
		margin-bottom: 0.75rem;
	}

	/* Mobile */
	@media (max-width: 768px) {
		.content-wrapper {
			padding: 1rem;
		}

		h1 {
			font-size: 1.75rem;
		}
	}
</style>
