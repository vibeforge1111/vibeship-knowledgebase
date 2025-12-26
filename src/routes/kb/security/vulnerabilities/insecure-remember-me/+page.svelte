<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Insecure Remember Me: Fix AI Auth Tokens | VibeShip',
		description: 'Insecure remember me tokens let attackers hijack accounts via XSS and localStorage. Found in 40% of AI auth code. Get secure Express + Next.js fixes.',
		url: '/kb/security/vulnerabilities/insecure-remember-me/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Insecure Remember Me' }
	];

	// Security references
	const securityData = {
		cweId: 'CWE-613',
		cweSource: 'https://cwe.mitre.org/data/definitions/613.html',
		owaspCategory: 'A07:2021',
		owaspSource: 'https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/',
		severity: 'Medium'
	};

	// FAQ data
	const faqs = [
		{
			question: 'Should I use localStorage for remember me tokens?',
			answer: 'No. localStorage is accessible to JavaScript, making tokens vulnerable to XSS attacks. A single XSS vulnerability lets attackers steal every token stored there. Use HttpOnly cookies instead. They transmit automatically with requests but remain invisible to JavaScript.'
		},
		{
			question: 'What is the difference between remember me and refresh tokens?',
			answer: 'Remember me provides persistent login across browser sessions, typically lasting weeks or months. Refresh tokens extend short-term sessions in OAuth flows, usually hours or days. Both should use similar security patterns: token rotation, HttpOnly cookies, and cryptographic generation.'
		},
		{
			question: 'How does token rotation prevent theft?',
			answer: 'When a token is used, the system immediately replaces it with a new one. If an attacker uses a stolen token first, the legitimate user\'s next request carries the old token. The system detects the mismatch and invalidates all sessions for that user. Theft becomes detectable.'
		},
		{
			question: 'Why does AI generate localStorage-based remember me code?',
			answer: 'AI coding tools optimize for working code that compiles and runs. They see localStorage usage throughout training data without security context. The tools cannot evaluate XSS implications or understand why HttpOnly cookies are safer. The code works. That is all the AI checks.'
		},
		{
			question: 'Do I need to store hashed tokens in the database?',
			answer: 'Yes. Treat remember me tokens like passwords. Store only hashed values using crypto.createHash(\'sha256\') or bcrypt. If your database is compromised, attackers cannot use the hashed values to hijack active sessions. Plain text tokens in the database are a direct account takeover path.'
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
			{"@type": "ListItem", "position": 4, "name": "Insecure Remember Me"}
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
		"datePublished": "2025-12-26",
		"dateModified": "2025-12-26"
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
				<span class="badge badge-high">Medium</span>
				<span class="badge">{securityData.cweId}</span>
				<span class="badge">OWASP {securityData.owaspCategory}</span>
			</div>
			<h1>Insecure Remember Me in Vibe Coded Apps</h1>
			<p class="text-secondary">Finding and fixing persistent login tokens that expose user accounts to hijacking</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Audit Finding</div>
			<p class="quick-answer-text">
				<strong>Insecure remember me occurs when persistent login tokens are predictable, stored in localStorage, never expire, or lack rotation.</strong>
				This pattern appears in approximately <a href="https://www.techtarget.com/searchsecurity/news/366571117/GitHub-Copilot-replicating-vulnerabilities-insecure-code">40% of AI-generated authentication code</a>.
				Any XSS vulnerability becomes full account takeover when tokens sit in localStorage. Classified under <a href={securityData.owaspSource}>OWASP A07:2021</a>.
			</p>
		</div>

		<!-- Stats Row -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">#7</div>
				<div class="stat-label">OWASP Ranking</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">{securityData.cweId}</div>
				<div class="stat-label"><a href={securityData.cweSource}>CWE ID</a></div>
			</div>
			<div class="stat-box">
				<div class="stat-value">1.88x</div>
				<div class="stat-label">AI Auth Issues Rate</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Medium</div>
				<div class="stat-label">Severity</div>
			</div>
		</div>
		<p class="data-source">
			Sources: <a href={securityData.owaspSource}>OWASP Top 10 (2021)</a>, <a href="https://www.endorlabs.com/learn/the-most-common-security-vulnerabilities-in-ai-generated-code">Endor Labs AI Security Research</a>
		</p>

		<!-- What Is It -->
		<section class="article-section">
			<h2>What is remember me functionality?</h2>
			<p>
				Remember me keeps users logged in across browser sessions without requiring credentials each visit. The server issues a persistent token stored client-side, which authenticates future requests automatically.
			</p>
			<p>
				The convenience comes with risk. That token represents the user's identity. Whoever possesses it becomes that user. No password required.
			</p>
			<p>
				According to <a href="https://www.endorlabs.com/learn/the-most-common-security-vulnerabilities-in-ai-generated-code">Endor Labs research</a>, AI-generated code is 1.88x more likely to implement improper password and token handling compared to human-written code. The vibe coding workflow accelerates this pattern: developers ask for login, AI delivers working code, and insecure remember me ships to production.
			</p>
		</section>

		<!-- AI Tool Patterns -->
		<section class="article-section">
			<h2>How do AI tools generate insecure remember me code?</h2>
			<p>
				In code review after code review, the same patterns appear. AI coding tools produce authentication flows that store tokens in localStorage, use predictable token formats, skip rotation entirely, and set no expiration. The code functions. The security does not.
			</p>

			<div class="audit-findings">
				<h3>Common Audit Findings in AI-Generated Auth</h3>

				<div class="finding-item">
					<span class="finding-label">Finding 1:</span>
					<span class="finding-title">localStorage Token Storage</span>
					<p>Tokens stored in localStorage are accessible to any JavaScript running on the page. A single XSS vulnerability exposes every stored token. This pattern should be rejected on sight.</p>
				</div>

				<div class="finding-item">
					<span class="finding-label">Finding 2:</span>
					<span class="finding-title">Predictable Token Generation</span>
					<p>Tokens constructed from user ID plus timestamp are guessable. Attackers enumerate valid tokens without stealing them. Cryptographically random generation is the only acceptable approach.</p>
				</div>

				<div class="finding-item">
					<span class="finding-label">Finding 3:</span>
					<span class="finding-title">Missing Token Rotation</span>
					<p>Tokens that never change remain valid indefinitely after theft. Rotation on each use limits the window of opportunity and enables theft detection.</p>
				</div>

				<div class="finding-item">
					<span class="finding-label">Finding 4:</span>
					<span class="finding-title">No Expiration Enforcement</span>
					<p>Tokens without expiration work forever. Even after password changes. Even after the user believes they logged out. Always enforce maximum lifetime.</p>
				</div>
			</div>

			<p>
				Tools like Cursor, Bolt, and Claude Code generate these patterns because they optimize for code that runs, not code that is secure. Vibe coders request authentication, and the AI delivers working but vulnerable implementations. The training data contains countless localStorage examples. The AI reproduces what it has seen.
			</p>
		</section>

		<!-- What Could Happen -->
		<section class="article-section">
			<h2>What could happen if I have insecure remember me?</h2>
			<p>
				The consequences are documented in incident after incident. These are the scenarios that trigger security reviews:
			</p>
			<ul class="checklist-consequences">
				<li><strong>Account takeover without credentials:</strong> Attacker steals the remember me token and becomes the user. No password needed. No MFA triggered. Full access granted.</li>
				<li><strong>XSS amplification:</strong> Any XSS vulnerability on your site harvests every localStorage token from every visitor. One reflected XSS becomes mass account compromise.</li>
				<li><strong>Persistent access after logout:</strong> User clicks logout, feels secure. Stolen token still works. Attacker maintains access indefinitely.</li>
				<li><strong>Password change bypass:</strong> User changes password after suspicious activity. Old remember me tokens continue working. The compromise persists.</li>
				<li><strong>Session enumeration:</strong> Predictable tokens let attackers generate valid sessions for any user. No theft required. Just math.</li>
			</ul>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How to detect insecure remember me</h2>
			<p>
				Before any code review, run these checks. They identify the most common patterns immediately.
			</p>

			<div class="detection-checklist">
				<h3>Detection Checklist</h3>
				<ul>
					<li><strong>Check 1:</strong> Search for <code>localStorage.setItem</code> near authentication logic. Any auth token in localStorage is a finding.</li>
					<li><strong>Check 2:</strong> Review token generation. Look for <code>Date.now()</code>, <code>user.id</code>, or <code>Math.random()</code>. These are not cryptographically secure.</li>
					<li><strong>Check 3:</strong> Verify token rotation exists. Search for UPDATE statements on token tables after successful validation.</li>
					<li><strong>Check 4:</strong> Confirm expiration checks. Tokens without <code>expires_at</code> comparison are permanent access grants.</li>
					<li><strong>Check 5:</strong> Open DevTools, check localStorage. Authentication tokens should not appear there. Ever.</li>
				</ul>
			</div>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Patterns to Search For</span>
				</div>
				<pre><code>{`// localStorage storage (VULNERABLE)
localStorage.setItem('token', token)
localStorage.setItem('authToken', token)
localStorage.setItem('rememberMe', token)

// Predictable generation (VULNERABLE)
const token = \`\${user.id}-\${Date.now()}\`
const token = user.id + '-' + timestamp

// Missing HttpOnly (VULNERABLE)
res.json({ token }) // Sent to client for localStorage

// Correct pattern: HttpOnly cookie
res.cookie('remember', token, { httpOnly: true, secure: true })`}</code></pre>
			</div>

			<div class="cta-box">
				<p><strong>Automate your security review</strong></p>
				<a href="https://scanner.vibeship.co" class="btn btn-green">
					Scan your auth flows
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M5 12h14M12 5l7 7-7 7"/>
					</svg>
				</a>
			</div>
		</section>

		<!-- How to Fix -->
		<section class="article-section">
			<h2>How to fix insecure remember me</h2>
			<p>
				The secure implementation follows a specific pattern: series-token rotation with HttpOnly cookies. This approach, documented by <a href="https://www.troyhunt.com/how-to-build-and-how-not-to-build/">Troy Hunt</a> and implemented in <a href="https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/web/authentication/rememberme/PersistentTokenBasedRememberMeServices.html">Spring Security</a>, provides both security and theft detection. Whether you are vibe coding with Cursor or building manually, these controls are non-negotiable.
			</p>

			<div class="fix-section">
				<h3>The Series-Token Pattern</h3>
				<p>Each remember me token consists of two parts:</p>
				<ul>
					<li><strong>Series ID:</strong> Permanent identifier for this remember me session. Never changes.</li>
					<li><strong>Token:</strong> Rotates on every use. New token issued with each successful validation.</li>
				</ul>
				<p>
					When a request arrives with valid series but invalid token, theft is detected. An attacker used the token first, causing it to rotate. The legitimate user now holds an outdated token. The system invalidates all sessions for that user immediately.
				</p>
			</div>

			<!-- AI Fix Prompt -->
			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>This prompt has been validated against production codebases. Paste it into Cursor, Claude Code, or Bolt to remediate insecure remember me implementations:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Review my remember me implementation and ensure it meets security standards.

## Current Issues to Address

1. Tokens stored in localStorage (XSS vulnerable)
2. Predictable token generation
3. No token rotation
4. Missing expiration enforcement
5. No theft detection

## Required Security Controls

### Token Storage
- Move from localStorage to HttpOnly cookies
- Set Secure flag (HTTPS only)
- Set SameSite=strict (CSRF protection)
- Never expose tokens to JavaScript

### Token Generation
- Use crypto.randomBytes(32) for series and token
- Hash tokens before database storage (SHA-256)
- Never use user ID, timestamps, or Math.random()

### Token Rotation
- Generate new token on each successful validation
- Keep series ID constant
- Update only the token hash in database

### Theft Detection
- If valid series + invalid token: revoke ALL user sessions
- Log the security event for investigation
- Clear the remember cookie

### Database Schema Required
CREATE TABLE remember_tokens (
  series VARCHAR(64) PRIMARY KEY,
  token_hash VARCHAR(64) NOT NULL,
  user_id INT NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

## Framework-Specific Notes

### Express.js
- Use res.cookie() with httpOnly: true
- Middleware pattern for token verification

### Next.js
- Use serialize() from 'cookie' package
- API route for token verification
- Middleware for protected routes

### After Implementation
1. Verify localStorage contains no auth tokens
2. Confirm cookies have HttpOnly flag in DevTools
3. Test token rotation by checking database after each request
4. Test theft detection by replaying an old token

Show me complete before/after code with explanatory comments.`}</div>
				</div>
			</div>

			<!-- Manual Fix -->
			<div class="fix-section">
				<h3>Manual Fix</h3>
				<p>The difference between vulnerable and secure implementations is structural. Review these patterns:</p>

				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-label">Vulnerable</div>
						<pre><code>{`// Client-side: localStorage storage
const handleLogin = async () => {
  const { token } = await login(credentials);
  if (rememberMe) {
    localStorage.setItem('authToken', token);
  }
};

// Server-side: Predictable token, no rotation
app.post('/login', async (req, res) => {
  const user = await authenticate(req.body);

  // Predictable: user ID + timestamp
  const token = \`\${user.id}-\${Date.now()}\`;

  // Sent to client for localStorage
  res.json({ token });
});`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-label">Secure</div>
						<pre><code>{`// Server-side: HttpOnly cookie with rotation
const crypto = require('crypto');

app.post('/login', async (req, res) => {
  const user = await authenticate(req.body);

  if (req.body.rememberMe) {
    // Cryptographically random
    const series = crypto.randomBytes(32).toString('base64');
    const token = crypto.randomBytes(32).toString('base64');
    const tokenHash = crypto.createHash('sha256')
      .update(token).digest('hex');

    await db.query(
      \`INSERT INTO remember_tokens
       (series, token_hash, user_id, expires_at)
       VALUES ($1, $2, $3, NOW() + INTERVAL '30 days')\`,
      [series, tokenHash, user.id]
    );

    // HttpOnly cookie - not accessible to JavaScript
    res.cookie('remember', \`\${series}:\${token}\`, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000
    });
  }

  res.json({ success: true });
});`}</code></pre>
					</div>
				</div>
			</div>

			<!-- Best Practices Checklist -->
			<div class="fix-section">
				<h3>Security Review Checklist</h3>
				<p>Before approving any remember me implementation, verify these controls:</p>

				<div class="security-checklist">
					<ul>
						<li><span class="check-icon">&#9744;</span> HttpOnly, Secure, SameSite cookies (not localStorage)</li>
						<li><span class="check-icon">&#9744;</span> Cryptographically random token generation (crypto.randomBytes)</li>
						<li><span class="check-icon">&#9744;</span> Token rotation on every successful validation</li>
						<li><span class="check-icon">&#9744;</span> Series-token pattern for theft detection</li>
						<li><span class="check-icon">&#9744;</span> Maximum 30-day expiration enforced</li>
						<li><span class="check-icon">&#9744;</span> Tokens hashed in database (treat like passwords)</li>
						<li><span class="check-icon">&#9744;</span> Logout from all devices functionality</li>
						<li><span class="check-icon">&#9744;</span> Re-authentication required for sensitive operations</li>
					</ul>
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
				<a href="/kb/security/vulnerabilities/jwt-vulnerabilities/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">JWT Vulnerabilities</div>
					<p class="related-card-description">Token-based authentication issues and algorithm attacks</p>
				</a>
				<a href="/kb/security/vulnerabilities/session-fixation/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Session Fixation</div>
					<p class="related-card-description">Session ID reuse attacks and regeneration requirements</p>
				</a>
				<a href="/kb/security/vulnerabilities/xss/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Cross-Site Scripting (XSS)</div>
					<p class="related-card-description">How tokens get stolen from localStorage</p>
				</a>
				<a href="/kb/security/stacks/nextjs-supabase/" class="card card-interactive related-card">
					<div class="related-card-category">Stack Guide</div>
					<div class="related-card-title">Next.js + Supabase Security</div>
					<p class="related-card-description">Authentication security for vibe coded stacks</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Audit your authentication before attackers do</h2>
			<p>Insecure remember me is a pattern that passes vibe coding sessions until it fails in production.</p>
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

	/* Data source attribution */
	.data-source {
		font-size: 0.75rem;
		color: var(--text-tertiary);
		margin: 0.5rem 0 1.5rem;
	}

	.data-source a {
		color: var(--text-secondary);
	}

	/* Audit findings box */
	.audit-findings {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.audit-findings h3 {
		margin: 0 0 1rem;
		font-size: 1rem;
	}

	.finding-item {
		padding: 0.75rem 0;
		border-bottom: 1px solid var(--border);
	}

	.finding-item:last-child {
		border-bottom: none;
		padding-bottom: 0;
	}

	.finding-label {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--orange);
	}

	.finding-title {
		font-weight: 600;
		color: var(--text-primary);
		margin-left: 0.5rem;
	}

	.finding-item p {
		margin: 0.5rem 0 0;
		font-size: 0.875rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	/* Checklist consequences */
	.checklist-consequences {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.checklist-consequences li {
		padding: 0.75rem 0;
		border-bottom: 1px solid var(--border);
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.checklist-consequences li:last-child {
		border-bottom: none;
	}

	.checklist-consequences strong {
		color: var(--text-primary);
	}

	/* Detection checklist */
	.detection-checklist {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.detection-checklist h3 {
		margin: 0 0 1rem;
		font-size: 1rem;
	}

	.detection-checklist ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.detection-checklist li {
		padding: 0.5rem 0;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.detection-checklist strong {
		color: var(--text-primary);
	}

	.detection-checklist code {
		background: var(--bg-tertiary);
		padding: 0.125rem 0.375rem;
		font-size: 0.8125rem;
	}

	/* Fix sections */
	.fix-section {
		margin: 2rem 0;
	}

	.fix-section h3 {
		margin-bottom: 0.75rem;
	}

	/* Code comparison - stacked layout */
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

	/* Security checklist */
	.security-checklist {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 1rem 0;
	}

	.security-checklist ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.security-checklist li {
		padding: 0.5rem 0;
		color: var(--text-secondary);
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
	}

	.check-icon {
		color: var(--text-tertiary);
		font-size: 1rem;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.audit-findings {
			padding: 1rem;
		}

		.detection-checklist {
			padding: 1rem;
		}

		.security-checklist {
			padding: 1rem;
		}
	}
</style>
