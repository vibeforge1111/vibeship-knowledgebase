<script lang="ts">
	import { Header } from '$lib/components/layout';

	const meta = {
		title: 'Host Header Injection: Detect & Fix Guide',
		description: 'Host header injection lets attackers steal password reset tokens and hijack accounts. Learn to detect and fix this vulnerability in your app\'s URL generation.',
		url: '/kb/security/vulnerabilities/host-header-injection/'
	};

	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Host Header Injection' }
	];

	const securityData = {
		cweId: 'CWE-20',
		cweName: 'Improper Input Validation',
		cweSource: 'https://cwe.mitre.org/data/definitions/20.html',
		owaspCategory: 'A05:2021 - Security Misconfiguration',
		owaspSource: 'https://owasp.org/Top10/A05_2021-Security_Misconfiguration/',
		testingGuide: 'WSTG-INPV-17',
		severity: 'Medium-High',
		cvssScore: '5.4-7.5'
	};

	const faqs = [
		{
			question: 'What is host header injection?',
			answer: 'Host header injection occurs when an application uses the HTTP Host header to generate URLs without validation. Attackers send requests with a forged Host header, and the app includes it in links, redirects, or emails. The most dangerous scenario: password reset emails contain attacker-controlled domains, letting them steal reset tokens and hijack accounts.'
		},
		{
			question: 'How do I prevent host header injection?',
			answer: 'Never trust the Host header for generating security-sensitive URLs. Configure your allowed hosts explicitly in your application. Use environment variables for your domain name. Validate the Host header against an allowlist before using it. Most frameworks have built-in HOST_ALLOWLIST or ALLOWED_HOSTS settings—enable them.'
		},
		{
			question: 'What is password reset poisoning?',
			answer: 'Password reset poisoning is when an attacker triggers a password reset for a victim, but manipulates the Host header so the reset link points to their server. When the victim clicks the link in their email, their reset token is sent to the attacker. The attacker then uses that token on the real site to reset the password and take over the account.'
		},
		{
			question: 'Is the Host header safe to use?',
			answer: 'No, the Host header is user-controlled and should never be trusted blindly. Attackers can set it to any value. For cosmetic uses (like displaying the domain name), it\'s low risk. For security-sensitive operations like password resets, email links, or OAuth callbacks, always use a hardcoded or environment-configured domain instead.'
		},
		{
			question: 'How do I test for host header injection?',
			answer: 'Send a request with a modified Host header (e.g., Host: evil.com) and check if that value appears in the response—in links, redirects, or headers. For password reset testing: trigger a reset with a forged Host and check if the email contains your evil domain. Tools like Burp Suite can automatically inject Host header payloads.'
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
			{"@type": "ListItem", "position": 4, "name": "Host Header Injection"}
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
				<span class="badge badge-medium">Medium-High</span>
				<span class="badge">{securityData.cweId}</span>
				<span class="badge">OWASP A05:2021</span>
			</div>
			<h1>Host Header Injection in Vibe Coded Apps</h1>
			<p class="text-secondary">The password reset vulnerability hiding in your URLs</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Host header injection happens when your app uses the HTTP Host header to build URLs without validation.</strong>
				Attackers send a forged Host header. Your password reset email contains their domain. They steal the reset token.
				The fix: never trust the Host header for security-sensitive URLs. Use environment-configured domains instead.
			</p>
		</div>

		<!-- Stats Box -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">ATO</div>
				<div class="stat-label">Account Takeover risk</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">1 req</div>
				<div class="stat-label">To poison reset link</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Common</div>
				<div class="stat-label">In AI-generated auth</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">{securityData.cvssScore}</div>
				<div class="stat-label">CVSS Score Range</div>
			</div>
		</div>
		<p class="data-source">
			Source: <a href="https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Input_Validation_Testing/17-Testing_for_HTTP_Incoming_Requests">OWASP WSTG</a>, <a href={securityData.owaspSource}>OWASP Top 10</a>
		</p>

		<!-- What Is It - @flaggedthis voice (auditor, methodical) -->
		<section class="article-section">
			<h2>What is host header injection?</h2>
			<p>
				The Host header tells a server which domain the request is for. Your app might use it to generate links: "Here's your password reset link at {`${host}`}/reset?token=abc123."
			</p>
			<p>
				The problem: the Host header is attacker-controlled. Anyone can send a request with <code>Host: evil.com</code>. If your app trusts it, that reset email now says "Click here: evil.com/reset?token=abc123." The attacker's server receives the token.
			</p>
			<p>
				Think of it like changing the return address on someone else's mail. When they reply, the response goes to you, not the intended recipient. Password reset poisoning works exactly the same way.
			</p>
		</section>

		<!-- Attack Flow -->
		<section class="article-section">
			<h2>How the attack works</h2>
			<p>
				This is a step-by-step account takeover:
			</p>

			<div class="attack-flow">
				<div class="attack-step">
					<div class="step-number">1</div>
					<div class="step-content">
						<strong>Attacker triggers password reset</strong> for victim@target.com, but with <code>Host: evil.com</code>
					</div>
				</div>
				<div class="attack-step">
					<div class="step-number">2</div>
					<div class="step-content">
						<strong>Server generates reset email</strong> with link: evil.com/reset?token=secret123
					</div>
				</div>
				<div class="attack-step">
					<div class="step-number">3</div>
					<div class="step-content">
						<strong>Victim receives email</strong> and clicks the link (it looks legitimate in email body)
					</div>
				</div>
				<div class="attack-step">
					<div class="step-number">4</div>
					<div class="step-content">
						<strong>Token sent to attacker's server</strong> at evil.com. Attacker logs the token.
					</div>
				</div>
				<div class="attack-step">
					<div class="step-number">5</div>
					<div class="step-content">
						<strong>Attacker uses token</strong> on target.com/reset?token=secret123 to reset password
					</div>
				</div>
			</div>

			<p>
				The victim clicked a link. That's all it took. Their account is now owned.
			</p>
		</section>

		<!-- Why Vibe Coded Apps -->
		<section class="article-section">
			<h2>Why vibe coded apps are vulnerable</h2>
			<p>
				AI generates password reset flows that "just work." The code uses the Host header because it's convenient—no hardcoding required.
			</p>

			<div class="code-comparison">
				<div class="code-block code-bad">
					<div class="code-block-header">
						<span class="code-block-lang">Vulnerable - AI-generated password reset</span>
						<span class="code-label-bad">Host header trusted</span>
					</div>
					<pre><code>{`// AI-generated reset email logic
app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const user = await User.findByEmail(email);

  if (user) {
    const token = generateResetToken();
    const host = req.headers.host; // VULNERABLE!

    await sendEmail({
      to: email,
      subject: 'Password Reset',
      body: \`Click here to reset: https://\${host}/reset?token=\${token}\`
    });
  }

  res.json({ message: 'If account exists, email sent' });
});

// Attacker sends: Host: evil.com
// Email contains: https://evil.com/reset?token=secret`}</code></pre>
				</div>
				<div class="code-block code-good">
					<div class="code-block-header">
						<span class="code-block-lang">Secure - Environment-configured domain</span>
						<span class="code-label-good">Fixed</span>
					</div>
					<pre><code>{`// Secure reset email logic
const APP_DOMAIN = process.env.APP_DOMAIN || 'myapp.com';

app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const user = await User.findByEmail(email);

  if (user) {
    const token = generateResetToken();

    // Use configured domain, NEVER Host header
    await sendEmail({
      to: email,
      subject: 'Password Reset',
      body: \`Click here to reset: https://\${APP_DOMAIN}/reset?token=\${token}\`
    });
  }

  res.json({ message: 'If account exists, email sent' });
});

// Attacker's Host header is ignored
// Email always contains: https://myapp.com/reset?token=secret`}</code></pre>
				</div>
			</div>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How to detect host header injection</h2>
			<p>
				The audit process: find where Host header is used, test if forged values appear in output.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Testing Commands</span>
				</div>
				<pre><code>{`# Test 1: Check if Host header is reflected in response
curl -H "Host: evil.com" https://target.com/ | grep "evil.com"

# Test 2: Check X-Forwarded-Host (also exploitable)
curl -H "X-Forwarded-Host: evil.com" https://target.com/ | grep "evil.com"

# Test 3: Password reset test (requires email access)
# 1. Intercept reset request with Burp/proxy
# 2. Change Host header to your server
# 3. Check if email contains your domain

# Test 4: Check for reflection in Location header (redirects)
curl -I -H "Host: evil.com" https://target.com/login
# Look for: Location: https://evil.com/dashboard`}</code></pre>
			</div>

			<div class="audit-checklist">
				<h3>Code Audit Checklist</h3>
				<ul>
					<li>Search for <code>req.headers.host</code> or <code>request.host</code></li>
					<li>Search for <code>X-Forwarded-Host</code> usage</li>
					<li>Check password reset, email verification, magic link flows</li>
					<li>Check OAuth callback URL generation</li>
					<li>Check any redirect URL construction</li>
				</ul>
			</div>

			<div class="cta-box">
				<p><strong>Don't let reset tokens leak to attackers.</strong></p>
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
			<h2>How to fix host header injection</h2>
			<p>
				Three approaches: hardcode the domain, use environment config, or validate against an allowlist.
			</p>

			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>Copy this into your AI coding tool to find and fix Host header vulnerabilities:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Audit my codebase for Host header injection vulnerabilities.

## What to search for

1. Host header usage:
   \`\`\`
   req.headers.host
   req.headers['host']
   request.host
   req.get('host')
   req.hostname
   X-Forwarded-Host
   X-Forwarded-Proto
   \`\`\`

2. URL generation contexts:
   - Password reset emails
   - Email verification links
   - Magic link authentication
   - OAuth callback URLs
   - Redirect URLs after login
   - Any "absolute URL" generation

## Detection steps

For each Host header usage:
1. Is it used to construct a URL?
2. Is that URL sent in an email or redirect?
3. Is the Host validated against allowed values?

If used in URL without validation = VULNERABLE

## Fixes to apply

### Option A: Environment-configured domain (recommended)
\`\`\`typescript
// In .env
APP_DOMAIN=myapp.com

// In code
const domain = process.env.APP_DOMAIN;
const resetUrl = \`https://\${domain}/reset?token=\${token}\`;
\`\`\`

### Option B: Allowlist validation
\`\`\`typescript
const ALLOWED_HOSTS = ['myapp.com', 'www.myapp.com', 'staging.myapp.com'];

function getValidHost(req: Request): string {
  const host = req.headers.host || '';
  if (ALLOWED_HOSTS.includes(host)) {
    return host;
  }
  return ALLOWED_HOSTS[0]; // Fallback to primary domain
}
\`\`\`

### Option C: Framework-level protection

**Next.js (next.config.js):**
\`\`\`javascript
module.exports = {
  async headers() {
    return []; // Next.js validates Host by default in production
  }
}
// Use NEXTAUTH_URL env var for auth URLs
\`\`\`

**Django (settings.py):**
\`\`\`python
ALLOWED_HOSTS = ['myapp.com', 'www.myapp.com']
# Django rejects requests with invalid Host headers
\`\`\`

**Express middleware:**
\`\`\`javascript
const allowedHosts = ['myapp.com', 'www.myapp.com'];

app.use((req, res, next) => {
  if (!allowedHosts.includes(req.hostname)) {
    return res.status(400).send('Invalid host');
  }
  next();
});
\`\`\`

## Common vulnerable patterns and fixes

| Pattern | Risk | Fix |
|---------|------|-----|
| \`\${req.host}/reset\` | Password theft | Use env var |
| \`redirect=\${host}/dashboard\` | Open redirect | Validate or hardcode |
| \`callback=\${host}/oauth\` | OAuth hijack | Configure in provider |
| \`<base href="\${host}">\` | XSS via base tag | Hardcode or omit |

## After fixing

1. Set APP_DOMAIN or equivalent in all environments
2. Test password reset with forged Host header
3. Verify emails contain correct domain
4. Add Host header validation middleware
5. Document allowed hosts in deployment config`}</div>
				</div>
			</div>

			<div class="fix-section">
				<h3>Framework-specific solutions</h3>
				<div class="framework-fixes">
					<div class="framework-fix">
						<h4>Next.js / Vercel</h4>
						<p>Use <code>NEXTAUTH_URL</code> environment variable for auth flows. Next.js validates Host headers in production by default.</p>
					</div>
					<div class="framework-fix">
						<h4>Express.js</h4>
						<p>Add hostname validation middleware. Never use <code>req.headers.host</code> directly for URL generation.</p>
					</div>
					<div class="framework-fix">
						<h4>Django</h4>
						<p>Configure <code>ALLOWED_HOSTS</code> in settings. Django rejects requests with invalid Host headers.</p>
					</div>
					<div class="framework-fix">
						<h4>Rails</h4>
						<p>Use <code>config.hosts</code> to allowlist domains. Use <code>root_url</code> helper with configured host.</p>
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
				<a href="/kb/security/vulnerabilities/open-redirect/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Open Redirect</div>
					<p class="related-card-description">Unvalidated redirect targets</p>
				</a>
				<a href="/kb/security/vulnerabilities/password-reset/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Password Reset Flaws</div>
					<p class="related-card-description">Weak reset implementations</p>
				</a>
				<a href="/kb/security/vulnerabilities/web-cache-poisoning/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Web Cache Poisoning</div>
					<p class="related-card-description">Cache exploitation via headers</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>The Host header is attacker-controlled</h2>
			<p>Find where your app trusts it.</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">
				Scan for Host injection
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

	/* Attack Flow */
	.attack-flow {
		margin: 1.5rem 0;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.attack-step {
		display: flex;
		gap: 1rem;
		align-items: flex-start;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1rem 1.25rem;
	}

	.step-number {
		width: 28px;
		height: 28px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--bg-tertiary);
		color: var(--green);
		font-weight: 600;
		font-size: 0.875rem;
		flex-shrink: 0;
	}

	.step-content {
		font-size: 0.9375rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.step-content strong {
		color: var(--text-primary);
	}

	.step-content code {
		background: var(--bg-tertiary);
		padding: 0.125rem 0.375rem;
		font-size: 0.8125rem;
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

	/* Audit Checklist */
	.audit-checklist {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.audit-checklist h3 {
		margin: 0 0 1rem;
		font-size: 1rem;
	}

	.audit-checklist ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.audit-checklist li {
		padding: 0.5rem 0;
		border-bottom: 1px solid var(--border);
		font-size: 0.9375rem;
		color: var(--text-secondary);
	}

	.audit-checklist li:last-child {
		border-bottom: none;
	}

	.audit-checklist code {
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

	/* Fix Sections */
	.fix-section {
		margin: 2rem 0;
	}

	.fix-section h3 {
		margin-bottom: 0.75rem;
	}

	/* Framework Fixes */
	.framework-fixes {
		display: grid;
		gap: 1rem;
		margin-top: 1rem;
	}

	.framework-fix {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1rem 1.25rem;
	}

	.framework-fix h4 {
		margin: 0 0 0.5rem;
		font-size: 0.9375rem;
		color: var(--text-primary);
	}

	.framework-fix p {
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
	}
</style>
