<script lang="ts">
	import { Header } from '$lib/components/layout';

	const meta = {
		title: 'Insufficient Logging & Monitoring: Detection Guide',
		description: 'Insufficient logging lets attackers operate undetected for months. Learn what to log, what to never log, and how to set up security monitoring.',
		url: '/kb/security/vulnerabilities/insufficient-logging/'
	};

	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Insufficient Logging' }
	];

	const faqs = [
		{
			question: 'What should security logs capture?',
			answer: 'Authentication events (login, logout, failures), authorization failures, input validation failures, application errors, and privilege changes. Each log should include timestamp, user ID, IP address, action attempted, and success/failure status.'
		},
		{
			question: 'What should never be logged?',
			answer: 'Passwords, API keys, tokens, credit card numbers, SSNs, and other PII. If you must log request bodies, sanitize sensitive fields first. Logging secrets creates a second attack surface and may violate compliance requirements.'
		},
		{
			question: 'How long do attackers stay undetected?',
			answer: 'Industry reports show attackers remain in systems for 200+ days on average before detection. Proper logging and monitoring can reduce this to hours or days. The faster you detect, the less damage occurs.'
		},
		{
			question: 'What is structured logging?',
			answer: 'Structured logging outputs logs in a parseable format (JSON) instead of plain text. This enables automated analysis, searching, and alerting. Tools like Datadog, Splunk, and ELK stack require structured logs for effective monitoring.'
		},
		{
			question: 'How do I set up security alerting?',
			answer: 'Start with high-confidence alerts: multiple auth failures from one IP, admin actions from new IPs, access to sensitive endpoints. Use log aggregation tools to correlate events and set thresholds. Avoid alert fatigue by starting strict and loosening as needed.'
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
	<link rel="canonical" href="https://vibeship.co{meta.url}" />
</svelte:head>

<Header {breadcrumbs} />

<div class="content-wrapper">
	<article class="content-main content-wide">
		<header class="article-header">
			<div class="badge-row">
				<span class="badge badge-medium">Medium Severity</span>
				<span class="badge">CWE-778</span>
				<span class="badge">OWASP A09</span>
			</div>
			<h1>Insufficient Logging & Monitoring</h1>
			<p class="text-secondary">When attackers operate in your system for months undetected</p>
		</header>

		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Insufficient logging means attackers can breach, exfiltrate, and leave without a trace.</strong>
				If you're not logging auth failures, privilege changes, and sensitive actions—you won't know you've been compromised until it's too late. Fix: log security events in structured format, aggregate centrally, alert on anomalies.
			</p>
		</div>

		<section class="article-section">
			<h2>What is insufficient logging?</h2>
			<p>
				Most vibe coded apps have some logging—console.log sprinkled around for debugging. But security logging is different. It's the audit trail that tells you who did what, when, and whether they should have been able to.
			</p>

			<div class="audit-checklist">
				<h3>Security events you must log</h3>
				<div class="checklist-grid">
					<div class="checklist-item">
						<span class="check-icon">✓</span>
						<span>Login attempts (success and failure)</span>
					</div>
					<div class="checklist-item">
						<span class="check-icon">✓</span>
						<span>Password resets and changes</span>
					</div>
					<div class="checklist-item">
						<span class="check-icon">✓</span>
						<span>Privilege escalation attempts</span>
					</div>
					<div class="checklist-item">
						<span class="check-icon">✓</span>
						<span>Access to sensitive resources</span>
					</div>
					<div class="checklist-item">
						<span class="check-icon">✓</span>
						<span>Input validation failures</span>
					</div>
					<div class="checklist-item">
						<span class="check-icon">✓</span>
						<span>API rate limit triggers</span>
					</div>
				</div>
			</div>

			<div class="code-comparison">
				<div class="code-block code-bad">
					<div class="code-block-header">
						<span class="code-block-lang">Vulnerable - No security logging</span>
						<span class="code-label-bad">Blind spot</span>
					</div>
					<pre><code>{`// Auth endpoint with zero logging
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await db.users.findByEmail(email);

  if (!user || !await bcrypt.compare(password, user.hash)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // No record of successful login
  // No record of failed attempts
  // Attacker can brute force silently
  req.session.userId = user.id;
  res.json({ success: true });
});`}</code></pre>
				</div>
				<div class="code-block code-good">
					<div class="code-block-header">
						<span class="code-block-lang">Secure - Comprehensive logging</span>
						<span class="code-label-good">Auditable</span>
					</div>
					<pre><code>{`import { logger } from './lib/logger';

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await db.users.findByEmail(email);

  if (!user || !await bcrypt.compare(password, user.hash)) {
    logger.warn('auth.login.failed', {
      email,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
      reason: !user ? 'user_not_found' : 'invalid_password'
    });
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  logger.info('auth.login.success', {
    userId: user.id,
    email,
    ip: req.ip
  });

  req.session.userId = user.id;
  res.json({ success: true });
});`}</code></pre>
				</div>
			</div>
		</section>

		<section class="article-section">
			<h2>What to never log</h2>
			<p>
				Over-logging is as dangerous as under-logging. Logging sensitive data creates a second attack surface and compliance nightmares.
			</p>

			<div class="danger-list">
				<div class="danger-item">
					<span class="danger-icon">✗</span>
					<div>
						<strong>Passwords</strong> - Not even hashed ones
					</div>
				</div>
				<div class="danger-item">
					<span class="danger-icon">✗</span>
					<div>
						<strong>API keys and tokens</strong> - Log key ID, not the secret
					</div>
				</div>
				<div class="danger-item">
					<span class="danger-icon">✗</span>
					<div>
						<strong>Credit card numbers</strong> - PCI-DSS violation
					</div>
				</div>
				<div class="danger-item">
					<span class="danger-icon">✗</span>
					<div>
						<strong>SSN/Government IDs</strong> - Privacy law violations
					</div>
				</div>
				<div class="danger-item">
					<span class="danger-icon">✗</span>
					<div>
						<strong>Session tokens</strong> - Enables session hijacking from logs
					</div>
				</div>
			</div>
		</section>

		<section class="article-section">
			<h2>How to fix logging gaps</h2>

			<div class="fix-prompt">
				<div class="fix-prompt-header">
					<span class="fix-prompt-label">AI Fix Prompt</span>
					<button class="copy-btn" class:copied onclick={copyPrompt}>
						{copied ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<div class="fix-prompt-content" id="ai-fix-prompt">{`Add comprehensive security logging to this application.

## Requirements

### 1. Create a structured logger
\`\`\`typescript
// lib/logger.ts
import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label) => ({ level: label })
  },
  redact: ['password', 'token', 'apiKey', 'secret']
});
\`\`\`

### 2. Log these security events
- auth.login.success / auth.login.failed
- auth.logout
- auth.password.changed / auth.password.reset
- authz.denied (authorization failures)
- admin.action.* (all admin operations)
- rate.limit.exceeded

### 3. Include context in every log
\`\`\`typescript
logger.info('event.name', {
  userId: user?.id,
  ip: req.ip,
  userAgent: req.headers['user-agent'],
  requestId: req.id,
  timestamp: new Date().toISOString()
});
\`\`\`

### 4. Never log
- Passwords, tokens, API keys
- Full credit card numbers
- SSN or government IDs
- Personal health information`}</div>
			</div>
		</section>

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

		<section class="article-section">
			<h2>Related content</h2>
			<div class="related-grid">
				<a href="/kb/security/vulnerabilities/verbose-errors/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Verbose Errors</div>
					<p class="related-card-description">Information disclosure in errors</p>
				</a>
				<a href="/kb/security/vulnerabilities/missing-security-headers/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Missing Security Headers</div>
					<p class="related-card-description">Security configuration gaps</p>
				</a>
				<a href="/kb/security/vulnerabilities/session-fixation/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Session Fixation</div>
					<p class="related-card-description">Session security</p>
				</a>
			</div>
		</section>

		<div class="final-cta">
			<h2>You can't detect what you don't log</h2>
			<p>Proper logging is your security camera system.</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">Scan for logging gaps</a>
		</div>
	</article>
</div>

<style>
	.badge-row { display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap; }

	.audit-checklist { background: var(--bg-secondary); border: 1px solid var(--border); padding: 1.5rem; margin: 1.5rem 0; }
	.audit-checklist h3 { margin: 0 0 1rem; font-size: 1rem; }
	.checklist-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem; }
	.checklist-item { display: flex; align-items: center; gap: 0.5rem; font-size: 0.9375rem; }
	.check-icon { color: var(--green); font-weight: bold; }

	.danger-list { display: flex; flex-direction: column; gap: 0.75rem; margin: 1.5rem 0; }
	.danger-item { display: flex; align-items: flex-start; gap: 0.75rem; padding: 0.75rem; background: rgba(255, 107, 107, 0.05); border-left: 3px solid var(--red); }
	.danger-icon { color: var(--red); font-weight: bold; }

	.code-comparison { display: flex; flex-direction: column; gap: 1rem; margin: 1.5rem 0; }
	.code-bad { border-left: 3px solid var(--red); }
	.code-good { border-left: 3px solid var(--green); }
	.code-label-bad, .code-label-good { font-size: 0.6875rem; padding: 0.125rem 0.5rem; text-transform: uppercase; font-weight: 600; }
	.code-label-bad { color: var(--red); background: rgba(255, 107, 107, 0.1); }
	.code-label-good { color: var(--green); background: rgba(0, 255, 136, 0.1); }

	.faq-list { margin-top: 1rem; }
	.faq-item { padding: 1.5rem 0; border-bottom: 1px solid var(--border); }
	.faq-item:last-child { border-bottom: none; }
	.faq-item h3 { font-size: 1.0625rem; font-weight: 600; margin: 0 0 0.5rem; }
	.faq-item p { margin: 0; font-size: 0.9375rem; line-height: 1.7; color: var(--text-secondary); }

	.final-cta { text-align: center; padding: 3rem 2rem; background: var(--bg-secondary); border: 1px solid var(--border); margin-top: 3rem; }
	.final-cta h2 { margin-bottom: 0.75rem; }
	.final-cta p { color: var(--text-secondary); margin-bottom: 1.5rem; }
</style>
