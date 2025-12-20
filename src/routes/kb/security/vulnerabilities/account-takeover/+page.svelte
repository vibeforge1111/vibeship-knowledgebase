<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Account Takeover (ATO): Protect Your Users from Hijacking',
		description: 'Account takeover lets attackers access user accounts through credential stuffing, session hijacking, or password reset flaws. Prevention guide for vibe coded apps.',
		url: '/kb/security/vulnerabilities/account-takeover/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Account Takeover' }
	];

	// Real external data sources
	const owaspData = {
		ranking: '#7',
		category: 'A07:2021 - Identification and Authentication Failures',
		source: 'https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/',
		cweId: 'CWE-287',
		cweSource: 'https://cwe.mitre.org/data/definitions/287.html'
	};

	// FAQ data for schema
	const faqs = [
		{
			question: 'What is account takeover (ATO)?',
			answer: 'Account takeover is when an attacker gains unauthorized access to a user account. This can happen through credential stuffing (using stolen passwords), session hijacking (stealing active sessions), password reset exploits, or social engineering. Once in, attackers can steal data, make fraudulent transactions, or use the account for further attacks.'
		},
		{
			question: 'What are the most common account takeover methods?',
			answer: 'Credential stuffing is the most common, using stolen password lists from breaches. Session hijacking steals active login sessions through XSS or network attacks. Password reset exploits abuse weak reset flows. Phishing tricks users into giving up credentials. SIM swapping intercepts SMS-based 2FA codes by taking control of the victim phone number.'
		},
		{
			question: 'How do I detect account takeover attempts?',
			answer: 'Monitor for unusual patterns: logins from new locations or devices, multiple failed login attempts, password changes followed by suspicious activity, session usage from different IP addresses simultaneously, and API access patterns that differ from the user normal behavior. Alert users to new logins and let them report unauthorized access.'
		},
		{
			question: 'Does MFA prevent account takeover?',
			answer: 'MFA significantly reduces account takeover risk but does not eliminate it. SMS-based MFA can be bypassed via SIM swapping. Real-time phishing kits can capture TOTP codes. Push notification fatigue can lead users to approve fraudulent requests. Hardware security keys (FIDO2/WebAuthn) provide the strongest protection against most ATO methods.'
		},
		{
			question: 'What should I do if a user account is compromised?',
			answer: 'Immediately invalidate all sessions for that user, force a password reset, and notify the user through a verified channel (not just email, which may be compromised). Review recent account activity for unauthorized changes. If financial data is involved, work with the user on fraud reporting. Document the incident for pattern analysis.'
		}
	];

	// Attack vectors
	const attackVectors = [
		{
			name: 'Credential Stuffing',
			description: 'Using username/password combinations stolen from other breaches',
			prevention: 'Rate limiting, breach password checking, MFA',
			link: '/kb/security/vulnerabilities/credential-stuffing/'
		},
		{
			name: 'Session Hijacking',
			description: 'Stealing active session tokens through XSS or network interception',
			prevention: 'HttpOnly cookies, HTTPS, secure session handling',
			link: '/kb/security/vulnerabilities/xss/'
		},
		{
			name: 'Password Reset Exploits',
			description: 'Abusing weak password reset flows to gain access',
			prevention: 'Secure reset tokens, rate limiting, verification',
			link: null
		},
		{
			name: 'Phishing',
			description: 'Tricking users into entering credentials on fake login pages',
			prevention: 'User education, phishing-resistant MFA (FIDO2)',
			link: null
		},
		{
			name: 'Session Fixation',
			description: 'Forcing a user to use an attacker-controlled session ID',
			prevention: 'Regenerate session ID after login',
			link: null
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
			{"@type": "ListItem", "position": 4, "name": "Account Takeover"}
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
				<span class="badge badge-critical">Critical</span>
				<span class="badge">CWE-287</span>
				<span class="badge">OWASP A07:2021</span>
			</div>
			<h1>Account Takeover (ATO) Prevention</h1>
			<p class="text-secondary">I've been on these calls. The silence when you realize it's happening to your users.</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Account takeover is the call at 3am you don't want to get. Attackers inside your users' accounts. Transactions happening. Data leaving. Support flooded with "I didn't do that."</strong>
				It happens through <a href="/kb/security/vulnerabilities/credential-stuffing/">credential stuffing</a>, session hijacking, password reset exploits, or phishing.
				Prevention requires multiple layers: strong authentication, session security, anomaly detection, and - trust me - a rehearsed incident response plan.
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
				<div class="stat-value">$4.45M</div>
				<div class="stat-label">Avg Breach Cost</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Critical</div>
				<div class="stat-label">Severity</div>
			</div>
		</div>
		<p class="data-source">
			Source: <a href={owaspData.source}>OWASP Top 10 (2021)</a>, <a href="https://www.ibm.com/reports/data-breach" target="_blank" rel="noopener">IBM Cost of a Data Breach 2023</a>
		</p>

		<!-- What Is It -->
		<section class="article-section">
			<h2>What is account takeover?</h2>
			<p>
				Account takeover is the end state attackers want. Not to break your authentication - to use it. To become your user. Once inside, they do whatever that user can do. And your logs show it as legitimate activity.
			</p>
			<p>
				I've worked incidents where attackers had full access for weeks before anyone noticed. For e-commerce: unauthorized purchases. For SaaS: data exfiltration. For financial apps: direct fraud. The damage compounds every hour you don't catch it.
			</p>
			<p>
				ATO is not a single vulnerability but an outcome. Attackers find the weakest path in: weak passwords, missing MFA, session flaws, vulnerable password resets. One gap is all they need.
			</p>
		</section>

		<!-- Attack Vectors -->
		<section class="article-section">
			<h2>Account takeover attack methods</h2>
			<p>
				Understanding how attackers compromise accounts helps you build better defenses. These are the primary vectors:
			</p>

			<div class="vectors-grid">
				{#each attackVectors as vector}
					<div class="card vector-card">
						<h4>{vector.name}</h4>
						<p class="vector-desc">{vector.description}</p>
						<p class="vector-prevention"><strong>Prevention:</strong> {vector.prevention}</p>
						{#if vector.link}
							<a href={vector.link} class="vector-link">Learn more</a>
						{/if}
					</div>
				{/each}
			</div>
		</section>

		<!-- Why AI Tools Don't Help -->
		<section class="article-section">
			<h2>Why AI-generated auth is vulnerable to ATO</h2>
			<p>
				Here's what I see in incident after incident. When you ask <a href="/kb/vibe-coding-tools/cursor/">Cursor</a> or <a href="/kb/vibe-coding-tools/bolt/">Bolt</a> to add authentication, you get login and logout. You don't get the defensive layers that would have caught the attack 6 hours ago.
			</p>

			<div class="missing-controls">
				<div class="control">
					<span class="control-icon">&#10007;</span>
					<span>No session invalidation on password change</span>
				</div>
				<div class="control">
					<span class="control-icon">&#10007;</span>
					<span>No login anomaly detection</span>
				</div>
				<div class="control">
					<span class="control-icon">&#10007;</span>
					<span>No concurrent session limits</span>
				</div>
				<div class="control">
					<span class="control-icon">&#10007;</span>
					<span>No notification on new device login</span>
				</div>
				<div class="control">
					<span class="control-icon">&#10007;</span>
					<span>No activity logging for forensics</span>
				</div>
				<div class="control">
					<span class="control-icon">&#10007;</span>
					<span>No account recovery verification</span>
				</div>
			</div>

			<p>
				These are the controls that detect and respond to account takeover. AI generates functional auth. You add the security layers. Don't learn this at 3am.
			</p>
		</section>

		<!-- Prevention -->
		<section class="article-section">
			<h2>How to prevent account takeover</h2>

			<h3>1. Require strong authentication</h3>
			<p>
				Enforce password complexity, check against breach databases (<a href="https://haveibeenpwned.com/API/v3" target="_blank" rel="noopener">Have I Been Pwned</a>), and strongly encourage or require MFA. FIDO2/WebAuthn provides phishing-resistant authentication.
			</p>

			<h3>2. Secure session management</h3>
			<p>
				Regenerate session IDs after login. Use HttpOnly, Secure, and SameSite cookie flags. Invalidate all sessions when password changes. Limit concurrent sessions per user.
			</p>

			<h3>3. Detect anomalies</h3>
			<p>
				Track login locations, devices, and times. Alert on unusual patterns: new country, impossible travel, different device fingerprint. Let users see and manage their active sessions.
			</p>

			<h3>4. Protect password reset</h3>
			<p>
				Use time-limited, single-use reset tokens. Send to verified email only. Require current password for email/phone changes. Rate limit reset requests.
			</p>

			<h3>5. Enable user control</h3>
			<p>
				Notify users on new logins. Let them view active sessions and revoke access. Provide "log out everywhere" option. Make it easy to report unauthorized access.
			</p>
		</section>

		<!-- AI Fix Prompt -->
		<section class="article-section">
			<h2>AI fix prompt for ATO prevention</h2>
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
				<pre id="ai-fix-prompt"><code>{`Add account takeover prevention to my authentication system:

REQUIREMENTS:
1. Session security:
   - Regenerate session ID after login
   - HttpOnly, Secure, SameSite=Strict cookies
   - Invalidate all sessions on password change
   - Limit to 5 concurrent sessions per user

2. Login monitoring:
   - Log all login attempts with IP, user-agent, timestamp
   - Track device fingerprint
   - Detect and flag: new location, new device, unusual time
   - Send email notification on new device login

3. Password reset security:
   - 1-hour expiry on reset tokens
   - Single-use tokens (invalidate after use)
   - Rate limit: 3 reset requests per hour
   - Require re-auth for email/phone changes

4. User controls:
   - Show active sessions with location/device
   - "Log out everywhere" button
   - Email notification preferences

Return the implementation with database schema changes if needed.
Use [MY_FRAMEWORK] patterns and session library.`}</code></pre>
			</div>
		</section>

		<!-- Response Checklist -->
		<section class="article-section">
			<h2>Account takeover response checklist</h2>
			<p>When that call comes in - and it will - here's what you do. Speed matters. Every minute the attacker has access, they're doing damage.</p>

			<ol class="response-list">
				<li><strong>Invalidate all sessions</strong> - Force logout everywhere immediately</li>
				<li><strong>Force password reset</strong> - Generate secure reset token, notify via verified channel</li>
				<li><strong>Review activity</strong> - Check for unauthorized changes, data access, transactions</li>
				<li><strong>Notify the user</strong> - Explain what happened, what you're doing, what they should do</li>
				<li><strong>Preserve evidence</strong> - Log all forensic data for investigation</li>
				<li><strong>Check for lateral movement</strong> - Did attacker access other accounts or systems?</li>
				<li><strong>Document and learn</strong> - How did they get in? What can you improve?</li>
			</ol>
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
			<h2>Check Your Authentication Security</h2>
			<p>
				<a href="https://scanner.vibeship.co">VibeShip Scanner</a> analyzes your authentication code for session vulnerabilities, missing controls, and ATO risk factors.
			</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">Scan Your Code Free</a>
		</section>

		<!-- Related Content -->
		<section class="article-section">
			<h2>Related vulnerabilities</h2>
			<div class="related-grid">
				<a href="/kb/security/vulnerabilities/credential-stuffing/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Credential Stuffing</div>
					<p class="related-card-description">The most common path to account takeover</p>
				</a>
				<a href="/kb/security/vulnerabilities/xss/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Cross-Site Scripting (XSS)</div>
					<p class="related-card-description">Enables session hijacking attacks</p>
				</a>
				<a href="/kb/security/vulnerabilities/csrf/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">CSRF</div>
					<p class="related-card-description">Tricks users into performing actions</p>
				</a>
				<a href="/kb/security/vulnerabilities/missing-auth/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Missing Authentication</div>
					<p class="related-card-description">When auth checks are skipped entirely</p>
				</a>
			</div>
		</section>

		<!-- External Resources -->
		<section class="article-section">
			<h2>External resources</h2>
			<ul class="external-links">
				<li><a href="https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/" target="_blank" rel="noopener">OWASP A07:2021 - Authentication Failures</a></li>
				<li><a href="https://cwe.mitre.org/data/definitions/287.html" target="_blank" rel="noopener">CWE-287: Improper Authentication</a></li>
				<li><a href="https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html" target="_blank" rel="noopener">OWASP Session Management Cheat Sheet</a></li>
				<li><a href="https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html" target="_blank" rel="noopener">OWASP Authentication Cheat Sheet</a></li>
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
		margin-bottom: 0.5rem;
		color: var(--text-primary);
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

	/* Vectors Grid */
	.vectors-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		margin: 1.5rem 0;
	}

	@media (max-width: 768px) {
		.vectors-grid {
			grid-template-columns: 1fr;
		}
	}

	.vector-card {
		padding: 1rem;
	}

	.vector-desc {
		font-size: 0.9rem;
		color: var(--text-secondary);
		margin: 0.5rem 0;
	}

	.vector-prevention {
		font-size: 0.85rem;
		margin: 0.5rem 0;
	}

	.vector-link {
		font-size: 0.85rem;
	}

	/* Missing Controls */
	.missing-controls {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.75rem;
		margin: 1.5rem 0;
		padding: 1rem;
		background: color-mix(in srgb, var(--red) 5%, transparent);
		border: 1px solid color-mix(in srgb, var(--red) 30%, transparent);
	}

	@media (max-width: 768px) {
		.missing-controls {
			grid-template-columns: 1fr;
		}
	}

	.control {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.9rem;
	}

	.control-icon {
		color: var(--red);
		font-weight: bold;
	}

	/* Response List */
	.response-list {
		margin: 1rem 0;
		padding-left: 1.5rem;
	}

	.response-list li {
		margin-bottom: 0.75rem;
		line-height: 1.6;
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
		background: var(--bg-tertiary);
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
