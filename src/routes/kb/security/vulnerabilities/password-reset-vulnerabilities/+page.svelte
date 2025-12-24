<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Password Reset Vulnerabilities: 7 Flaws in AI-Generated Flows',
		description: 'Password reset vulnerabilities let attackers hijack accounts. CVE-2023-7028 scored 10.0 CVSS. Common in vibe coded apps. Fix prompts for secure token generation.',
		url: '/kb/security/vulnerabilities/password-reset-vulnerabilities/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Password Reset Vulnerabilities' }
	];

	// Real external data sources
	const owaspData = {
		category: 'A07:2021 - Identification and Authentication Failures',
		source: 'https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/',
		cweId: 'CWE-640',
		cweSource: 'https://cwe.mitre.org/data/definitions/640.html'
	};

	// Real CVEs
	const cves = [
		{
			id: 'CVE-2023-7028',
			cvss: '10.0',
			description: 'GitLab password reset to unverified email (actively exploited)',
			source: 'https://nvd.nist.gov/vuln/detail/CVE-2023-7028'
		},
		{
			id: 'CVE-2024-20419',
			cvss: '9.1',
			description: 'Cisco SSM unverified password change',
			source: 'https://nvd.nist.gov/vuln/detail/CVE-2024-20419'
		},
		{
			id: 'CVE-2024-48887',
			cvss: '9.8',
			description: 'FortiSwitch unauthenticated admin reset',
			source: 'https://nvd.nist.gov/vuln/detail/CVE-2024-48887'
		},
		{
			id: 'CVE-2024-45979',
			cvss: '7.5',
			description: 'Lines Police CAD host header injection',
			source: 'https://nvd.nist.gov/vuln/detail/CVE-2024-45979'
		}
	];

	// FAQ data for schema
	const faqs = [
		{
			question: 'Why is Math.random() insecure for password reset tokens?',
			answer: 'Math.random() is not cryptographically secure. It uses a predictable algorithm that attackers can reverse-engineer. Given enough observed tokens, they can predict future ones. Node\'s crypto.randomBytes() uses system entropy and is designed for security-critical operations. OWASP requires 128+ bits of entropy for reset tokens. Math.random() provides nowhere near that.'
		},
		{
			question: 'How long should password reset tokens be valid?',
			answer: 'OWASP recommends 20 minutes maximum. Some systems use 15 minutes. AI tools often generate tokens with no expiration or 24+ hour validity. The longer a token lives, the more time an attacker has to find and exploit it. Short expiration creates friction for legitimate users but massively reduces attack surface.'
		},
		{
			question: 'What is password reset poisoning?',
			answer: 'Also called Host Header Injection. Attackers manipulate the Host header in the password reset request, causing your server to generate reset URLs pointing to their domain instead of yours. When the victim clicks the link in the email, their valid reset token goes straight to the attacker. CVE-2024-45979 was this exact flaw. Fix: hardcode your domain in reset URLs, never trust the Host header.'
		},
		{
			question: 'Can password reset flows leak user enumeration?',
			answer: 'Yes, constantly. If "Email sent" appears for valid users but "User not found" for invalid emails, attackers can map your entire user database. The fix: return identical responses regardless. Always show "If that email exists, we sent a reset link" even when it doesn\'t. Takes discipline because developers want helpful error messages. Security requires lying to users sometimes.'
		},
		{
			question: 'Why do AI tools generate insecure password reset flows?',
			answer: 'Because functional beats secure in training data. A working reset flow that uses Math.random() and never expires looks clean, ships fast, and has no obvious bugs. AI optimizes for that. The security flaws only show up under adversarial testing, which isn\'t in the training data. Same pattern across Cursor, Bolt, Claude Code. Not a bug in any tool, just how code generation works. Catching it is on you.'
		},
		{
			question: 'Should I allow multiple password reset requests?',
			answer: 'Not without rate limiting. Unlimited requests enable brute force attacks and token flooding (sending hundreds of reset emails to annoy users). OWASP recommends maximum 3 requests per 15 minutes per email address. Implement this at the application level, not just web server level. Track by email address, not IP (attackers rotate IPs constantly).'
		},
		{
			question: 'Is it safe to send reset tokens in URL parameters?',
			answer: 'Risky but common. The token appears in browser history, server logs, and referrer headers if users click external links. More secure: use POST with the token in the request body, or send a short code via SMS as secondary verification. If you must use URL parameters, ensure tokens are single-use and short-lived. GitLab\'s CVE-2023-7028 exploited poor token handling. Company valuation dropped $260M after disclosure.'
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
			{"@type": "ListItem", "position": 4, "name": "Password Reset Vulnerabilities"}
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
				<span class="badge badge-high">High</span>
				<span class="badge">CWE-640</span>
				<span class="badge">OWASP A07:2021</span>
			</div>
			<h1>Password Reset Vulnerabilities in Vibe Coded Apps</h1>
			<p class="text-secondary">How AI tools generate the 7 authentication flaws that let attackers hijack user accounts</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Password reset vulnerabilities let attackers take over user accounts by exploiting weak token generation, missing expiration, or insecure URL handling.</strong>
				GitLab's <a href="https://nvd.nist.gov/vuln/detail/CVE-2023-7028">CVE-2023-7028</a> scored a perfect 10.0 CVSS and was actively exploited. AI coding tools generate 7 common flaws by default: predictable tokens, no expiration, token reuse, user enumeration, host header injection, missing rate limiting, and insecure transmission. Vibe coded apps ship with these vulnerabilities built in.
			</p>
		</div>

		<!-- Stats Box - Real CVE Data -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value critical">10.0</div>
				<div class="stat-label">GitLab CVE CVSS</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">{owaspData.cweId}</div>
				<div class="stat-label"><a href={owaspData.cweSource}>CWE ID</a></div>
			</div>
			<div class="stat-box">
				<div class="stat-value">20 min</div>
				<div class="stat-label">OWASP Token TTL</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">128+ bits</div>
				<div class="stat-label">Required Entropy</div>
			</div>
		</div>
		<p class="data-source">
			Sources: <a href={owaspData.source}>OWASP Top 10 (2021)</a>, <a href="https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html">OWASP Password Reset Cheat Sheet</a>
		</p>

		<!-- What Is It -->
		<section class="article-section">
			<h2>What are password reset vulnerabilities?</h2>
			<p>
				Password reset vulnerabilities are authentication flaws in the "forgot password" flow that let attackers reset other users' passwords without authorization. The reset mechanism becomes a backdoor into accounts. No password cracking needed. Just exploit the reset process itself.
			</p>
			<p>
				Think of it like a bank's safe deposit box system. You lose your key, so the bank has a recovery process. Password reset vulnerabilities are when that recovery process has weaker security than the original key. Attackers skip picking the lock entirely. They just walk in through the recovery door.
			</p>
			<p>
				According to <a href="https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/">OWASP Top 10 (2021)</a>, authentication failures rank #7 in web application security risks. The <a href="https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html">OWASP Password Reset Cheat Sheet</a> documents specific requirements that most AI-generated code completely ignores. <a href="https://nvd.nist.gov/vuln/detail/CVE-2023-7028">CVE-2023-7028</a> (GitLab) scored a perfect 10.0 CVSS. Attackers could reset any user's password to an unverified email address. Company valuation dropped $260M after disclosure.
			</p>
		</section>

		<!-- The 7 Flaws -->
		<section class="article-section">
			<h2>The 7 password reset flaws AI tools generate</h2>
			<p>
				Every major AI coding tool generates the same vulnerable patterns. Not because the tools are broken. Because the training data is full of insecure implementations, and functional code beats secure code in what gets shipped (and thus trained on). Here are the 7 flaws that show up in production vibe coded apps.
			</p>

			<div class="flaws-grid">
				<div class="flaw-card">
					<div class="flaw-number">1</div>
					<h3>Predictable Tokens</h3>
					<p>AI tools use <code>Math.random()</code> or <code>Date.now()</code> to generate reset tokens. Both are completely predictable. Attackers can brute force or calculate future tokens. OWASP requires <code>crypto.randomBytes(32)</code> for 128+ bits of entropy.</p>
				</div>

				<div class="flaw-card">
					<div class="flaw-number">2</div>
					<h3>No Token Expiration</h3>
					<p>Generated tokens are valid forever. Or for 24+ hours. OWASP recommends 20 minutes maximum. The longer a token lives, the more time attackers have to intercept and exploit it. Short expiration windows massively reduce attack surface.</p>
				</div>

				<div class="flaw-card">
					<div class="flaw-number">3</div>
					<h3>Token Reuse</h3>
					<p>Same token can be used multiple times. After a password reset succeeds, the token should be immediately invalidated. Otherwise attackers can reuse intercepted tokens even after the user has already reset their password.</p>
				</div>

				<div class="flaw-card">
					<div class="flaw-number">4</div>
					<h3>User Enumeration</h3>
					<p>Different error messages for valid vs invalid email addresses. "User not found" vs "Email sent" lets attackers map your entire user database. Correct implementation: identical response regardless of email validity.</p>
				</div>

				<div class="flaw-card">
					<div class="flaw-number">5</div>
					<h3>Host Header Injection</h3>
					<p>Reset URL uses the <code>Host</code> header from the request. Attackers manipulate it to point reset links to their domain. When users click the email link, their valid token goes to the attacker. <a href="https://nvd.nist.gov/vuln/detail/CVE-2024-45979">CVE-2024-45979</a> was exactly this.</p>
				</div>

				<div class="flaw-card">
					<div class="flaw-number">6</div>
					<h3>Missing Rate Limiting</h3>
					<p>Unlimited reset requests. Enables brute force attacks and email flooding. OWASP recommends maximum 3 requests per 15 minutes per email address. AI-generated code has zero rate limiting by default.</p>
				</div>

				<div class="flaw-card">
					<div class="flaw-number">7</div>
					<h3>Insecure Token Transmission</h3>
					<p>Tokens in URL parameters appear in browser history, server logs, and referrer headers. Combined with long expiration and no single-use enforcement, this creates persistent exposure. Tokens should be short-lived and immediately invalidated after use.</p>
				</div>
			</div>
		</section>

		<!-- Real CVEs -->
		<section class="article-section">
			<h2>Real-world password reset vulnerabilities (2024)</h2>
			<p>
				These aren't theoretical. Companies bigger than yours shipped these exact flaws to production. CVSS scores don't lie.
			</p>

			<div class="cve-grid">
				{#each cves as cve}
					<div class="cve-card">
						<div class="cve-header">
							<a href={cve.source} class="cve-id">{cve.id}</a>
							<span class="cvss-badge" class:critical={parseFloat(cve.cvss) >= 9.0} class:high={parseFloat(cve.cvss) >= 7.0 && parseFloat(cve.cvss) < 9.0}>
								CVSS {cve.cvss}
							</span>
						</div>
						<p>{cve.description}</p>
					</div>
				{/each}
			</div>

			<p class="cve-note">
				Source: <a href="https://nvd.nist.gov/">National Vulnerability Database</a>. All CVEs from 2024 except CVE-2023-7028 (GitLab), which was disclosed in January 2024 and actively exploited in the wild.
			</p>
		</section>

		<!-- AI Tool Patterns -->
		<section class="article-section">
			<h2>How AI tools generate vulnerable password reset flows</h2>
			<p>
				Ask Cursor, Bolt, or Claude Code to implement password reset. This is what you get. Every single time.
			</p>

			<div class="code-block vulnerable">
				<div class="code-block-header">
					<span class="code-block-lang">Vulnerable Pattern (All AI Tools)</span>
				</div>
				<pre><code>{`// Express.js password reset - AI generated
app.post('/api/password-reset', async (req, res) => {
  const { email } = req.body;

  // Flaw #4: User enumeration
  const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Flaw #1: Predictable token (Math.random)
  const resetToken = Math.random().toString(36).substring(2, 15);

  // Flaw #2: No expiration
  await db.query(
    'UPDATE users SET reset_token = $1 WHERE email = $2',
    [resetToken, email]
  );

  // Flaw #5: Host header injection
  const resetUrl = \`\${req.headers.host}/reset-password?token=\${resetToken}\`;

  // Flaw #6: No rate limiting
  await sendEmail(email, \`Reset your password: \${resetUrl}\`);

  res.json({ message: 'Reset email sent' });
});

// Flaw #3: Token reuse allowed
app.post('/api/password-reset/confirm', async (req, res) => {
  const { token, newPassword } = req.body;

  const user = await db.query('SELECT * FROM users WHERE reset_token = $1', [token]);
  if (!user) {
    return res.status(400).json({ error: 'Invalid token' });
  }

  await db.query(
    'UPDATE users SET password = $1 WHERE reset_token = $2',
    [await hash(newPassword), token]
  );

  // Token NOT invalidated - can be reused
  res.json({ message: 'Password reset successful' });
});`}</code></pre>
			</div>

			<p class="pattern-note">
				<strong>All 7 flaws in under 50 lines of code.</strong> This exact pattern ships to production in vibe coded apps every day. Cursor, Bolt, Claude Code, GitHub Copilot. Not a bug in any specific tool. This is what "working code" looks like when security isn't explicitly required.
			</p>
		</section>

		<!-- What Could Happen -->
		<section class="article-section">
			<h2>What could happen if I have password reset vulnerabilities?</h2>
			<p>
				All of this has happened. To companies with security teams.
			</p>
			<ul class="consequences-list">
				<li><strong>Mass account takeover:</strong> Attackers automate password resets for thousands of users. Predictable tokens or missing rate limiting make this trivial. By the time monitoring alerts fire, they control admin accounts. GitLab's CVE-2023-7028 enabled exactly this.</li>
				<li><strong>Data exfiltration:</strong> Reset admin passwords, access production databases, dump everything. No need to crack passwords when you can just reset them. Incident response teams find the breach weeks later through unrelated monitoring.</li>
				<li><strong>Email flooding:</strong> Attackers trigger thousands of reset requests to annoy users or mask real attacks. Support tickets flood in. Users lose trust. Some unsubscribe from all emails, missing legitimate security notifications later.</li>
				<li><strong>Persistent backdoors:</strong> Long-lived tokens with no expiration create time bombs. Attacker intercepts a token in January, exploits it in March. Logs have rolled over. Nobody knows how they got in.</li>
				<li><strong>Competitive intelligence:</strong> User enumeration reveals your customer list. Competitors scrape email addresses by testing password reset with known corporate domains. You're building their sales leads database.</li>
			</ul>
			<p>
				The cost of incident response, customer notification, and reputation damage far exceeds the afternoon it takes to implement secure password reset.
			</p>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How do I detect password reset vulnerabilities?</h2>
			<p>
				Security audits check password reset flows first. These patterns appear in every vulnerable implementation.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Vulnerable Patterns to Search For</span>
				</div>
				<pre><code>{`// 1. Predictable token generation
Math.random()
Date.now()
uuid() // v1 is timestamp-based, predictable

// 2. Missing expiration checks
// Search for token validation WITHOUT timestamp comparison
WHERE reset_token = $1  // Missing: AND reset_expires > NOW()

// 3. Token not invalidated after use
// Password update WITHOUT setting reset_token = NULL

// 4. User enumeration
if (!user) return res.status(404).json({ error: 'User not found' })
// Different responses for valid vs invalid emails

// 5. Host header usage in URLs
req.headers.host
req.get('host')
\`https://\${req.headers.host}/reset\`

// 6. No rate limiting
// Password reset endpoints WITHOUT rate limit middleware

// 7. Tokens in URL parameters
/reset-password?token=  // Should use POST body or separate verification`}</code></pre>
			</div>

			<div class="cta-box">
				<p><strong>Find password reset flaws automatically</strong></p>
				<p>VibeShip Scanner detects all 7 patterns using opengrep rules.</p>
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
			<h2>How do I fix password reset vulnerabilities?</h2>
			<p>
				Secure password reset requires fixing all 7 flaws systematically. OWASP provides specific requirements. Here's how to implement them.
			</p>

			<!-- AI Fix Prompt -->
			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>Copy this into Cursor, Claude Code, or Bolt. The AI will systematically fix all 7 flaws:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Fix all 7 password reset vulnerabilities in my codebase according to OWASP requirements.

## The 7 Flaws to Fix

### 1. Predictable Tokens
**Problem:** Using Math.random(), Date.now(), or timestamp-based UUIDs
**Fix:** Use crypto.randomBytes(32) for 128+ bits entropy

\`\`\`javascript
// Before (INSECURE)
const token = Math.random().toString(36).substring(2, 15);

// After (SECURE)
const crypto = require('crypto');
const token = crypto.randomBytes(32).toString('hex'); // 256 bits
\`\`\`

### 2. No Token Expiration
**Problem:** Tokens valid forever or 24+ hours
**Fix:** 20-minute maximum expiration per OWASP

\`\`\`javascript
// Before (INSECURE)
UPDATE users SET reset_token = $1 WHERE email = $2

// After (SECURE)
const expiresAt = new Date(Date.now() + 20 * 60 * 1000); // 20 minutes
UPDATE users SET reset_token = $1, reset_expires = $2 WHERE email = $3
\`\`\`

### 3. Token Reuse
**Problem:** Same token works multiple times
**Fix:** Invalidate immediately after use

\`\`\`javascript
// Before (INSECURE)
UPDATE users SET password = $1 WHERE reset_token = $2

// After (SECURE)
UPDATE users SET password = $1, reset_token = NULL, reset_expires = NULL
WHERE reset_token = $2 AND reset_expires > NOW()
\`\`\`

### 4. User Enumeration
**Problem:** Different responses for valid vs invalid emails
**Fix:** Identical response always

\`\`\`javascript
// Before (INSECURE)
if (!user) {
  return res.status(404).json({ error: 'User not found' });
}

// After (SECURE)
// Always return success, send email only if user exists
if (user) {
  await sendResetEmail(user.email, token);
}
return res.json({ message: 'If that email exists, we sent a reset link' });
\`\`\`

### 5. Host Header Injection
**Problem:** Using req.headers.host in reset URLs
**Fix:** Hardcoded domain, never trust Host header

\`\`\`javascript
// Before (INSECURE)
const resetUrl = \`https://\${req.headers.host}/reset?token=\${token}\`;

// After (SECURE)
const DOMAIN = process.env.APP_DOMAIN || 'https://example.com';
const resetUrl = \`\${DOMAIN}/reset?token=\${token}\`;
\`\`\`

### 6. Missing Rate Limiting
**Problem:** Unlimited reset requests
**Fix:** Maximum 3 requests per 15 minutes per email

\`\`\`javascript
// Add rate limiting middleware
const rateLimit = require('express-rate-limit');

const resetLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // 3 requests per window
  keyGenerator: (req) => req.body.email, // Track by email, not IP
  message: 'Too many reset requests. Try again in 15 minutes.'
});

app.post('/api/password-reset', resetLimiter, async (req, res) => {
  // ... reset logic
});
\`\`\`

### 7. Insecure Token Transmission
**Problem:** Tokens in URL parameters (appear in logs/history)
**Fix:** Short-lived tokens + immediate invalidation after use

\`\`\`javascript
// Current implementation with URL params is acceptable IF:
// 1. Token expires in 20 minutes (from fix #2)
// 2. Token is single-use (from fix #3)
// 3. Token has high entropy (from fix #1)

// Optional enhancement: Use POST instead of GET
// Send token in request body, not URL
\`\`\`

## Requirements

1. **Hash tokens before storing:**
\`\`\`javascript
const crypto = require('crypto');
const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
// Store hashedToken in database, send unhashed token via email
\`\`\`

2. **Verify expiration on every check:**
\`\`\`javascript
WHERE reset_token = $1 AND reset_expires > NOW()
\`\`\`

3. **Clear token after successful reset:**
\`\`\`javascript
UPDATE users SET password = $1, reset_token = NULL, reset_expires = NULL
\`\`\`

4. **Always return same response:**
\`\`\`javascript
return res.json({ message: 'If that email exists, we sent a reset link' });
\`\`\`

## After Fixing

1. Test all 7 scenarios:
   - Generate 100 tokens, verify randomness
   - Wait 21 minutes, verify token expired
   - Use token twice, verify second fails
   - Try invalid email, verify response identical
   - Manipulate Host header, verify URL unchanged
   - Send 4 requests, verify 4th blocked
   - Check logs/history for token exposure

2. Add database migration for reset_expires column if missing

3. List all modified files with before/after code snippets

Please proceed systematically through the codebase.`}</div>
				</div>
			</div>

			<!-- Manual Fix -->
			<div class="fix-section">
				<h3>Manual Fix: Complete Secure Implementation</h3>
				<p>If you want to understand what changes, here's a complete before/after. One implementation ships vulnerabilities, the other doesn't.</p>

				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-block-header">
							<span class="code-block-lang status-bad">VULNERABLE</span>
						</div>
						<pre><code>{`// AI-generated password reset
const express = require('express');
const app = express();

app.post('/api/password-reset', async (req, res) => {
  const { email } = req.body;

  // Flaw #4: User enumeration
  const user = await db.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  if (!user) {
    return res.status(404).json({
      error: 'User not found'
    });
  }

  // Flaw #1: Math.random (predictable)
  const token = Math.random()
    .toString(36).substring(2, 15);

  // Flaw #2: No expiration
  await db.query(
    'UPDATE users SET reset_token = $1 WHERE email = $2',
    [token, email]
  );

  // Flaw #5: Host header injection
  const resetUrl = \`https://\${req.headers.host}/reset?token=\${token}\`;

  // Flaw #6: No rate limiting
  await sendEmail(email, resetUrl);

  res.json({ message: 'Reset email sent' });
});

app.post('/api/password-reset/confirm', async (req, res) => {
  const { token, newPassword } = req.body;

  const user = await db.query(
    'SELECT * FROM users WHERE reset_token = $1',
    [token]
  );

  if (!user) {
    return res.status(400).json({
      error: 'Invalid token'
    });
  }

  await db.query(
    'UPDATE users SET password = $1 WHERE reset_token = $2',
    [await hash(newPassword), token]
  );

  // Flaw #3: Token NOT invalidated
  res.json({ message: 'Password reset' });
});`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-block-header">
							<span class="code-block-lang status-good">SECURE</span>
						</div>
						<pre><code>{`// OWASP-compliant password reset
const express = require('express');
const crypto = require('crypto');
const rateLimit = require('express-rate-limit');
const app = express();

// Fix #6: Rate limiting (3 per 15 min)
const resetLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  keyGenerator: (req) => req.body.email,
  message: 'Too many requests'
});

app.post('/api/password-reset',
  resetLimiter,
  async (req, res) => {
  const { email } = req.body;

  const user = await db.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );

  if (user) {
    // Fix #1: crypto.randomBytes (secure)
    const token = crypto.randomBytes(32)
      .toString('hex');

    // Fix #1: Hash before storing
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    // Fix #2: 20-minute expiration
    const expiresAt = new Date(
      Date.now() + 20 * 60 * 1000
    );

    await db.query(
      \`UPDATE users
       SET reset_token = $1,
           reset_expires = $2
       WHERE email = $3\`,
      [hashedToken, expiresAt, email]
    );

    // Fix #5: Hardcoded domain
    const DOMAIN = process.env.APP_DOMAIN;
    const resetUrl =
      \`\${DOMAIN}/reset?token=\${token}\`;

    await sendEmail(email, resetUrl);
  }

  // Fix #4: Same response always
  res.json({
    message: 'If that email exists, we sent a link'
  });
});

app.post('/api/password-reset/confirm', async (req, res) => {
  const { token, newPassword } = req.body;

  // Hash incoming token to compare
  const hashedToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  const user = await db.query(
    \`SELECT * FROM users
     WHERE reset_token = $1
     AND reset_expires > NOW()\`,
    [hashedToken]
  );

  if (!user) {
    return res.status(400).json({
      error: 'Invalid or expired token'
    });
  }

  // Fix #3: Invalidate token after use
  await db.query(
    \`UPDATE users
     SET password = $1,
         reset_token = NULL,
         reset_expires = NULL
     WHERE id = $2\`,
    [await hash(newPassword), user.id]
  );

  res.json({ message: 'Password reset successful' });
});`}</code></pre>
					</div>
				</div>

				<p class="comparison-note">
					<strong>What changed:</strong> Secure random generation with <code>crypto.randomBytes(32)</code>, hashed tokens using SHA-256, 20-minute expiration enforced in SQL, immediate invalidation after use, hardcoded domain (no Host header), rate limiting by email address, and identical responses for valid/invalid emails. All 7 flaws fixed.
				</p>
			</div>

			<!-- Database Schema -->
			<div class="fix-section">
				<h3>Required Database Schema</h3>
				<p>Your users table needs these columns for secure password reset:</p>

				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">SQL Migration</span>
					</div>
					<pre><code>{`-- Add password reset columns
ALTER TABLE users
  ADD COLUMN reset_token VARCHAR(64),
  ADD COLUMN reset_expires TIMESTAMP;

-- Index for fast token lookups
CREATE INDEX idx_users_reset_token
  ON users(reset_token);

-- Optional: Track reset attempts for rate limiting
CREATE TABLE password_reset_attempts (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  attempted_at TIMESTAMP DEFAULT NOW(),
  ip_address VARCHAR(45)
);

CREATE INDEX idx_reset_attempts_email
  ON password_reset_attempts(email, attempted_at);`}</code></pre>
				</div>
			</div>
		</section>

		<!-- Testing -->
		<section class="article-section">
			<h2>How to test password reset security</h2>
			<p>
				Don't trust that the fix worked. Test all 7 scenarios. Here's the security audit checklist:
			</p>

			<div class="testing-checklist">
				<div class="checklist-item">
					<div class="checklist-number">1</div>
					<div class="checklist-content">
						<h3>Token Randomness</h3>
						<p>Generate 100 reset tokens. Check for patterns. No sequential values, no timestamp correlation, no predictable strings. Calculate entropy: should be 128+ bits.</p>
					</div>
				</div>

				<div class="checklist-item">
					<div class="checklist-number">2</div>
					<div class="checklist-content">
						<h3>Expiration Enforcement</h3>
						<p>Generate token, wait 21 minutes, attempt reset. Should fail with "expired" error. Check database: expired tokens should not work even if manually queried.</p>
					</div>
				</div>

				<div class="checklist-item">
					<div class="checklist-number">3</div>
					<div class="checklist-content">
						<h3>Single-Use Validation</h3>
						<p>Complete password reset successfully. Attempt to reuse the same token. Should fail immediately. Database should show token cleared after first use.</p>
					</div>
				</div>

				<div class="checklist-item">
					<div class="checklist-number">4</div>
					<div class="checklist-content">
						<h3>No User Enumeration</h3>
						<p>Request reset for valid email. Request reset for invalid email. Compare HTTP status codes, response bodies, response timing. Must be identical.</p>
					</div>
				</div>

				<div class="checklist-item">
					<div class="checklist-number">5</div>
					<div class="checklist-content">
						<h3>Host Header Injection</h3>
						<p>Send reset request with <code>Host: attacker.com</code> header. Check email: reset URL should point to your hardcoded domain, not attacker.com.</p>
					</div>
				</div>

				<div class="checklist-item">
					<div class="checklist-number">6</div>
					<div class="checklist-content">
						<h3>Rate Limiting</h3>
						<p>Send 4 reset requests within 15 minutes using same email. Fourth request should fail with 429 Too Many Requests. Wait 15 minutes, verify limit resets.</p>
					</div>
				</div>

				<div class="checklist-item">
					<div class="checklist-number">7</div>
					<div class="checklist-content">
						<h3>Token Storage</h3>
						<p>Check database directly. Tokens should be hashed (SHA-256), not plaintext. Check server logs: tokens should not appear in logs. Check browser history: acceptable if tokens are short-lived and single-use.</p>
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
				<a href="/kb/security/vulnerabilities/jwt-vulnerabilities/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">JWT Vulnerabilities</div>
					<p class="related-card-description">Token-based authentication security flaws</p>
				</a>
				<a href="/kb/security/vulnerabilities/insecure-file-upload/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Insecure File Upload</div>
					<p class="related-card-description">File upload vulnerabilities in vibe coded apps</p>
				</a>
				<a href="/kb/security/stacks/nextjs-supabase/" class="card card-interactive related-card">
					<div class="related-card-category">Stack Guide</div>
					<div class="related-card-title">Next.js + Supabase Security</div>
					<p class="related-card-description">Complete authentication security checklist</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Find password reset flaws before attackers do</h2>
			<p>One vulnerable flow can compromise thousands of user accounts.</p>
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

	/* Flaws Grid */
	.flaws-grid {
		display: grid;
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.flaw-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		position: relative;
	}

	.flaw-number {
		position: absolute;
		top: 1rem;
		right: 1rem;
		width: 2rem;
		height: 2rem;
		background: var(--bg-primary);
		border: 1px solid var(--border);
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: 'JetBrains Mono', monospace;
		font-weight: 600;
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.flaw-card h3 {
		margin: 0 0 0.5rem;
		font-size: 1.125rem;
		color: var(--text-primary);
	}

	.flaw-card p {
		margin: 0;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.flaw-card code {
		background: var(--bg-tertiary);
		padding: 0.125rem 0.375rem;
		font-size: 0.8125rem;
	}

	/* CVE Grid */
	.cve-grid {
		display: grid;
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.cve-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-left: 3px solid var(--red);
		padding: 1.5rem;
	}

	.cve-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 0.75rem;
	}

	.cve-id {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.cvss-badge {
		padding: 0.25rem 0.5rem;
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		background: var(--bg-primary);
		border: 1px solid var(--border);
	}

	.cvss-badge.critical {
		border-color: var(--red);
		color: var(--red);
	}

	.cvss-badge.high {
		border-color: var(--orange);
		color: var(--orange);
	}

	.cve-card p {
		margin: 0;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.cve-note {
		font-size: 0.75rem;
		color: var(--text-tertiary);
		margin-top: 1rem;
	}

	/* Pattern Note */
	.pattern-note {
		margin: 1rem 0 0;
		font-size: 0.875rem;
		color: var(--text-secondary);
		padding: 1rem;
		background: var(--bg-tertiary);
		border-left: 3px solid var(--orange);
	}

	.pattern-note code {
		background: var(--bg-primary);
		padding: 0.125rem 0.375rem;
		font-size: 0.8125rem;
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
		border: 1px solid var(--border);
		border-left: 3px solid var(--green-dim);
		padding: 1.5rem;
		text-align: center;
		margin: 2rem 0;
	}

	.cta-box p {
		margin: 0 0 1rem;
		color: var(--text-primary);
	}

	.cta-box p:last-of-type {
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

	.status-bad {
		color: var(--red);
	}

	.status-good {
		color: var(--green);
	}

	.comparison-note {
		margin: 1rem 0 0;
		font-size: 0.875rem;
		color: var(--text-secondary);
		padding: 1rem;
		background: var(--bg-tertiary);
		border-left: 3px solid var(--green);
	}

	.comparison-note code {
		background: var(--bg-primary);
		padding: 0.125rem 0.375rem;
		font-size: 0.8125rem;
	}

	/* Testing Checklist */
	.testing-checklist {
		margin: 1.5rem 0;
	}

	.checklist-item {
		display: flex;
		gap: 1rem;
		padding: 1.5rem 0;
		border-bottom: 1px solid var(--border);
	}

	.checklist-item:last-child {
		border-bottom: none;
	}

	.checklist-number {
		flex-shrink: 0;
		width: 2.5rem;
		height: 2.5rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: 'JetBrains Mono', monospace;
		font-weight: 600;
		font-size: 1rem;
		color: var(--text-primary);
	}

	.checklist-content h3 {
		margin: 0 0 0.5rem;
		font-size: 1.0625rem;
		color: var(--text-primary);
	}

	.checklist-content p {
		margin: 0;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.checklist-content code {
		background: var(--bg-tertiary);
		padding: 0.125rem 0.375rem;
		font-size: 0.8125rem;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.flaw-number {
			position: static;
			margin-bottom: 0.75rem;
		}

		.checklist-item {
			flex-direction: column;
		}

		.checklist-number {
			align-self: flex-start;
		}
	}
</style>
