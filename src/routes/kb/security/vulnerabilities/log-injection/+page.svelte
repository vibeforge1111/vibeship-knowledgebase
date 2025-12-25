<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Log Injection: AI Logging Security Blind Spots | VibeShip',
		description: 'Log injection lets attackers hide their tracks by forging log entries. Found in 88% of AI-generated logging code. Get fixes for Cursor, Bolt & Claude Code.',
		url: '/kb/security/vulnerabilities/log-injection/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Log Injection' }
	];

	// Real external data sources
	const securityRefs = {
		cweId: 'CWE-117',
		cweSource: 'https://cwe.mitre.org/data/definitions/117.html',
		owaspCategory: 'A09:2021',
		owaspSource: 'https://owasp.org/Top10/A09_2021-Security_Logging_and_Monitoring_Failures/',
		georgetownCsetStat: '88%',
		georgetownCsetSource: 'https://cset.georgetown.edu/publication/cybersecurity-risks-of-ai-generated-code/'
	};

	// FAQ data for schema
	const faqs = [
		{
			question: 'What is log injection and how does it work?',
			answer: 'Log injection (also called log forging) is a vulnerability where attackers insert malicious content into application logs by injecting special characters (like \\r\\n) through user input. This allows them to create fake log entries, hide their tracks, or frame other users. For example, an attacker could inject a username like "admin\\n[SUCCESS] User admin logged in" to make logs show a fake successful login.'
		},
		{
			question: 'Why do AI tools like Cursor generate vulnerable logging code?',
			answer: 'AI coding tools generate insecure logging code 88% of the time (Georgetown CSET research, 2024) because they\'re trained on public code repositories where console.log() with unsanitized user input is common. AI models lack the security context to distinguish between development debugging and production logging, so they replicate vulnerable patterns from their training data.'
		},
		{
			question: 'Is console.log() safe to use in production?',
			answer: 'No, console.log() should not be used in production for several reasons: (1) it lacks built-in sanitization to prevent log injection, (2) it can leak sensitive data, (3) it causes performance issues by blocking the event loop, and (4) it produces unstructured logs that are hard to parse. Use structured logging libraries like Winston or Pino instead.'
		},
		{
			question: 'How is log injection related to Log4Shell?',
			answer: 'Log4Shell (CVE-2021-44228) was a critical remote code execution vulnerability in Apache Log4j caused by the library processing JNDI lookups in log messages. While log injection typically involves CRLF injection to forge log entries, Log4Shell showed how logging vulnerabilities can escalate to full system compromise. Both vulnerabilities stem from insufficient input sanitization in logging code.'
		},
		{
			question: 'What\'s the difference between log injection and SQL injection?',
			answer: 'SQL injection targets databases by inserting malicious SQL code, while log injection targets log files by inserting fake log entries using CRLF characters (\\r\\n). SQL injection can steal or delete data, while log injection is typically used to hide attacks, bypass monitoring, or frame innocent users. Both are injection attacks but target different systems.'
		},
		{
			question: 'Can attackers inject code through logs?',
			answer: 'Yes, in two ways. First, CRLF injection allows attackers to create fake log entries to hide their tracks. Second, in severe cases like Log4Shell, log processing systems can execute malicious code embedded in log messages. This is why sanitizing all user input before logging is critical - the log file itself becomes an attack surface.'
		},
		{
			question: 'What are structured logging best practices?',
			answer: 'Structured logging uses libraries like Winston or Pino to output logs in machine-readable JSON format with separate fields for data and metadata. Best practices: (1) use parameterized logging instead of string concatenation, (2) sanitize user input before logging, (3) never log sensitive data like passwords or tokens, (4) use appropriate log levels, and (5) send logs to secure external services for analysis.'
		}
	];

	let copied = $state(false);
	let copied1 = $state(false);
	let copied2 = $state(false);
	let copied3 = $state(false);

	function copyPrompt() {
		const prompt = document.getElementById('ai-fix-prompt')?.textContent || '';
		navigator.clipboard.writeText(prompt);
		copied = true;
		setTimeout(() => copied = false, 2000);
	}

	function copyCode1() {
		const code = document.getElementById('code-1')?.textContent || '';
		navigator.clipboard.writeText(code);
		copied1 = true;
		setTimeout(() => copied1 = false, 2000);
	}

	function copyCode2() {
		const code = document.getElementById('code-2')?.textContent || '';
		navigator.clipboard.writeText(code);
		copied2 = true;
		setTimeout(() => copied2 = false, 2000);
	}

	function copyCode3() {
		const code = document.getElementById('code-3')?.textContent || '';
		navigator.clipboard.writeText(code);
		copied3 = true;
		setTimeout(() => copied3 = false, 2000);
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
			{"@type": "ListItem", "position": 4, "name": "Log Injection"}
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
				<span class="badge badge-medium">Medium</span>
				<span class="badge">CWE-117</span>
				<span class="badge">OWASP A09:2021</span>
			</div>
			<h1>Log Injection: The Vulnerability We Keep Forgetting</h1>
			<p class="text-secondary">How AI-generated logging code creates security blind spots by letting attackers erase their tracks</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Log injection lets attackers manipulate application logs by inserting special characters (like \r\n) through user input.</strong>
				They can create fake log entries to hide attacks, frame innocent users, or bypass security monitoring. According to <a href="{securityRefs.georgetownCsetSource}">Georgetown CSET research</a>, 88% of AI-generated logging code is vulnerable because vibe coding tools replicate insecure patterns from their training data.
			</p>
		</div>

		<!-- Stats Box -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">{securityRefs.georgetownCsetStat}</div>
				<div class="stat-label">AI logging code is insecure</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">{securityRefs.cweId}</div>
				<div class="stat-label"><a href="{securityRefs.cweSource}">CWE ID</a></div>
			</div>
			<div class="stat-box">
				<div class="stat-value">2013</div>
				<div class="stat-label">Log4Shell hidden since</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Medium</div>
				<div class="stat-label">Severity</div>
			</div>
		</div>
		<p class="data-source">
			Sources: <a href="{securityRefs.georgetownCsetSource}">Georgetown CSET (2024)</a>, <a href="{securityRefs.owaspSource}">OWASP A09:2021</a>, <a href="https://nvd.nist.gov/vuln/detail/cve-2021-44228">CVE-2021-44228</a>
		</p>

		<!-- What Is It - @breachlore voice (Historian) -->
		<section class="article-section">
			<h2>What is log injection?</h2>
			<p>
				I've seen this pattern before. Log injection isn't new. We've known about it since at least 2003 when it appeared in early OWASP guidance, but every few years we forget and rediscover it the hard way.
			</p>
			<p>
				Log injection happens when attackers insert carriage return and line feed characters (<code>\r\n</code>) into user input that gets logged. Your application writes their malicious input to log files, and suddenly they control what your logs say. They can add fake "success" entries to cover failed login attempts. They can inject error messages that blame innocent users. They can make entire attack sequences vanish from your audit trail.
			</p>
			<p>
				Think of it like editing security camera footage. The attack happened, but the evidence shows something completely different. Incident responders arrive, check the logs, and see nothing suspicious. Meanwhile, the breach is already complete.
			</p>
			<p>
				This isn't theoretical. <a href="https://nvd.nist.gov/vuln/detail/cve-2021-44228">Log4Shell (CVE-2021-44228)</a> was hiding in Apache Log4j since 2013 - eight years unnoticed. When it was discovered in 2021, 93% of cloud enterprise environments were vulnerable. The pattern was there the whole time. We just weren't looking at our logging code as an attack surface.
			</p>
		</section>

		<!-- How AI Tools Cause This - @breachlore voice -->
		<section class="article-section">
			<h2>Why AI tools generate vulnerable logging code</h2>
			<p>
				This isn't the first time convenience beats security. We saw this with PHP's <code>magic_quotes</code> in the 2000s, with <code>eval()</code> in JavaScript, with MongoDB's <code>$where</code> operator. Every time, developers wanted clean-looking code and didn't think about the security implications until after the breaches.
			</p>
			<p>
				Now it's happening with AI-generated logging. According to <a href="{securityRefs.georgetownCsetSource}">Georgetown CSET research (November 2024)</a>, <strong>88% of AI-generated logging code contains CWE-117 vulnerabilities</strong>. That's not a typo. Nearly nine out of ten times a vibe coder asks an AI tool to add logging, they get insecure code.
			</p>

			<div class="alert alert-info">
				<div class="alert-title">The pattern AI tools learned</div>
				<p>Here's what Cursor, Bolt, Claude Code, and GitHub Copilot all generate when you ask for logging:</p>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">JavaScript</span>
						<button class="copy-btn" class:copied={copied1} onclick={copyCode1}>{copied1 ? 'Copied!' : 'Copy'}</button>
					</div>
					<pre id="code-1"><code>{`// What AI tools generate (looks clean, completely vulnerable)
app.post('/login', (req, res) => {
  console.log('Login attempt: ' + req.body.username)
  // ...
})

app.get('/api/user/:id', (req, res) => {
  logger.info(\`User request from IP: \${req.ip}\`)
  // ...
})`}</code></pre>
				</div>
				<p style="margin-top: 1rem; font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6;">
					This pattern is everywhere in public GitHub repos - the training data for AI models. Clean string interpolation, readable output, perfect for debugging. Also perfect for attackers who want to manipulate your logs.
				</p>
			</div>

			<p>
				<strong>Why this happens:</strong> AI models are trained on billions of lines of code from GitHub. Most of that code was written for development debugging, not production security. Developers use <code>console.log()</code> everywhere during local testing because it's fast and easy to read. That training data doesn't distinguish between "this is a quick debug statement" and "this will run in production for years." The AI just learns: "when humans log things, they concatenate strings."
			</p>
			<p>
				We've seen this movie before. The tools make it easy. The code looks clean. The vulnerabilities pile up. Then something like Log4Shell happens and everyone asks "how did we miss this?" We didn't miss it. We optimized for velocity over security. Again.
			</p>
		</section>

		<!-- How It Works - @breachlore voice with historical context -->
		<section class="article-section">
			<h2>How log injection works: The CRLF attack</h2>
			<p>
				CRLF injection has been a known technique since the early 2000s. It started with HTTP header injection, then log files, then any system that processes line-based text input. Same pattern, different targets.
			</p>
			<p>
				Here's the mechanism: An attacker inputs data containing <code>\r\n</code> (carriage return + line feed) characters. When your application logs this input without sanitization, those characters create new lines in your log file. The attacker can then inject whatever content they want on those new lines.
			</p>

			<div class="alert alert-warning">
				<div class="alert-title">Real attack example</div>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">Attack Input</span>
						<button class="copy-btn" class:copied={copied2} onclick={copyCode2}>{copied2 ? 'Copied!' : 'Copy'}</button>
					</div>
					<pre id="code-2"><code>{`// Attacker enters this as their username:
admin\\n[SUCCESS] User admin logged in\\n[INFO] Password verification passed

// Your vulnerable logging code:
console.log('Login attempt: ' + username)

// What gets written to your log file:
Login attempt: admin
[SUCCESS] User admin logged in
[INFO] Password verification passed`}</code></pre>
				</div>
				<p style="margin-top: 1rem; font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6;">
					The attacker just created fake log entries showing a successful login. Your monitoring system sees "SUCCESS" and moves on. The real failed login attempt is buried. This exact technique has been documented in OWASP guidance since 2004.
				</p>
			</div>
		</section>

		<!-- What Could Happen - @breachlore connecting to real incidents -->
		<section class="article-section">
			<h2>What happens when logs can't be trusted</h2>
			<p>
				Every major incident response starts with log analysis. When those logs are compromised, investigations go blind. I've seen this pattern in breach after breach:
			</p>

			<ul class="consequences-list">
				<li><strong>Attackers hide their tracks:</strong> They inject fake "success" messages over their failed attempts. Monitoring systems see clean logs while the breach continues. By the time someone notices, the attack timeline is corrupted and forensics are nearly impossible.</li>

				<li><strong>Innocent users get framed:</strong> Inject someone else's username into log entries. Make it look like they performed the malicious actions. During incident response, the wrong people get investigated while the real attacker walks away.</li>

				<li><strong>Compliance violations multiply:</strong> SOC 2, PCI DSS, HIPAA all require accurate audit logs. When auditors discover log manipulation was possible, every entry becomes suspect. Compliance failures cascade from a single unpatched logging statement.</li>

				<li><strong>Monitoring systems get bypassed:</strong> Security tools watch for suspicious patterns in logs. Inject fake "normal" entries to reset anomaly detection thresholds. Attackers have been using this technique to evade SIEM systems since the mid-2000s.</li>

				<li><strong>The Log4Shell scenario:</strong> In the worst case, log processing becomes code execution. Log4Shell showed us that logging vulnerabilities can escalate from "they can hide their tracks" to "they own your infrastructure." Remote Code Execution through a logging library. We should have seen it coming.</li>
			</ul>
		</section>

		<!-- Real-World Examples - @breachlore providing historical context -->
		<section class="article-section">
			<h2>Real-world breaches: The pattern repeats</h2>
			<p>
				This isn't new. We keep learning the same lessons:
			</p>

			<div style="display: flex; flex-direction: column; gap: 1rem; margin: 1.5rem 0;">
				<div class="card">
					<h3 style="margin: 0 0 0.75rem; font-size: 1.125rem; color: var(--text-primary);">Log4Shell (CVE-2021-44228) - December 2021</h3>
					<p style="margin: 0 0 0.75rem; color: var(--text-secondary); line-height: 1.6;">
						The big one. Remote Code Execution in Apache Log4j through JNDI lookup processing in log messages. CVSS 10.0 - maximum severity. 93% of cloud enterprise environments were vulnerable. The vulnerability had existed since 2013 - <strong>eight years</strong> hidden in one of the most widely-used logging libraries in existence.
					</p>
					<p style="margin: 0 0 0.75rem; color: var(--text-secondary); line-height: 1.6;">
						Attackers could achieve full system compromise just by getting a specially crafted string into application logs. Minecraft servers were the first wave, then enterprise Java applications across every industry. <a href="https://nvd.nist.gov/vuln/detail/cve-2021-44228">NIST estimates</a> hundreds of millions of devices affected worldwide.
					</p>
					<p style="margin: 0; font-style: italic; color: var(--text-tertiary); border-left: 2px solid var(--border); padding-left: 1rem;">
						This was log injection's worst-case scenario realized. What started as "attackers can forge log entries" escalated to "attackers can execute arbitrary code on your servers." The pattern was there all along - we just weren't treating log processing as an attack surface.
					</p>
				</div>

				<div class="card">
					<h3 style="margin: 0 0 0.75rem; font-size: 1.125rem; color: var(--text-primary);">Spring Security Log Forging - Multiple CVEs</h3>
					<p style="margin: 0; color: var(--text-secondary); line-height: 1.6;">
						Spring Security had several log injection vulnerabilities over the years where authentication logs could be manipulated. Attackers could make failed login attempts appear successful, or vice versa. Security teams investigating breaches would check logs and see nothing wrong - because the logs had been edited in real-time through injection.
					</p>
				</div>

				<div class="card">
					<h3 style="margin: 0 0 0.75rem; font-size: 1.125rem; color: var(--text-primary);">MOVEit (CVE-2023-34362) - May 2023</h3>
					<p style="margin: 0 0 0.75rem; color: var(--text-secondary); line-height: 1.6;">
						While technically a SQL injection vulnerability, the MOVEit breach shows the cascade effect of injection vulnerabilities. Over 3,000 organizations compromised in the first 10 days. When monitoring and logging are compromised, attackers move faster than incident response can track them.
					</p>
					<p style="margin: 0; color: var(--text-secondary); line-height: 1.6;">
						The connection: attackers used the SQL injection to manipulate logs, hiding their data exfiltration. By the time organizations realized they'd been breached, gigabytes of data were already gone. <a href="https://www.cisa.gov/news-events/cybersecurity-advisories/aa23-158a">CISA issued emergency guidance</a>, but the pattern was already set.
					</p>
				</div>
			</div>

			<p>
				Same vulnerability class, different decade. We documented CRLF injection in OWASP guidance in 2003. Log4j has been widely used since 2001. Twenty years later, we're still concatenating unsanitized user input into log messages. Now AI tools are generating this vulnerable pattern thousands of times per day.
			</p>
		</section>

		<!-- Detection - @breachlore voice -->
		<section class="article-section">
			<h2>How to detect log injection in vibe coded apps</h2>
			<p>
				This is easier than you think. The vulnerable pattern is consistent across all AI tools. Search your codebase for these exact patterns - I've seen them in every vibe coded project:
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Patterns to search for</span>
					<button class="copy-btn" class:copied={copied3} onclick={copyCode3}>{copied3 ? 'Copied!' : 'Copy'}</button>
				</div>
				<pre id="code-3"><code>{`// Pattern 1: console.log with string concatenation (DANGEROUS)
console.log('User login: ' + username)
console.log('Request from: ' + req.ip)

// Pattern 2: Template literals with user input (DANGEROUS)
logger.info(\`Login attempt: \${req.body.username}\`)
logger.error(\`Failed request from \${userIP}\`)

// Pattern 3: String interpolation in any logging (DANGEROUS)
winston.log('info', 'User ' + userId + ' performed action')

// Regex patterns that catch these:
// console\\.log.*\\+.*req\\.
// logger\\.(info|error|warn).*\\\`.*\\\$\\{
// \\.log\\(.*\\+`}</code></pre>
			</div>

			<div class="alert alert-info">
				<div class="alert-title">Quick audit steps</div>
				<ol style="margin: 0.5rem 0 0 0; padding-left: 1.5rem; color: var(--text-secondary);">
					<li style="margin-bottom: 0.75rem; line-height: 1.6;">Search for <code>console.log</code> in your production code - if you find any, they're probably vulnerable</li>
					<li style="margin-bottom: 0.75rem; line-height: 1.6;">Search for template literals (<code>${`\${}`}</code>) inside any logger method calls</li>
					<li style="margin-bottom: 0.75rem; line-height: 1.6;">Search for string concatenation (<code>+</code>) near variables like <code>req</code>, <code>user</code>, <code>input</code>, <code>body</code></li>
					<li style="line-height: 1.6;">Check every AI-generated route handler - these almost always have vulnerable logging</li>
				</ol>
			</div>

			<div class="cta-box">
				<p><strong>Scan your codebase automatically</strong></p>
				<p>VibeShip Scanner checks for CWE-117 across your entire project, highlighting every vulnerable logging statement with fix suggestions.</p>
				<a href="https://scanner.vibeship.co" class="btn btn-green">
					Scan your code now
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M5 12h14M12 5l7 7-7 7"/>
					</svg>
				</a>
			</div>
		</section>

		<!-- How to Fix -->
		<section class="article-section">
			<h2>How to fix log injection in AI-generated code</h2>
			<p>
				We've known the fix for twenty years: structured logging with parameterization. The same principle that prevents SQL injection applies here. Separate your data from your message template. Use logging libraries that handle sanitization. Stop concatenating user input into log strings.
			</p>

			<!-- AI Fix Prompt -->
			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>Copy this complete prompt into Cursor, Bolt, or Claude Code to systematically fix all log injection vulnerabilities:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Review all logging statements in this codebase and fix log injection vulnerabilities (CWE-117):

## What to find

Search for ALL instances where user input or external data is logged:
- console.log(), console.error(), console.warn()
- logger.info(), logger.error(), logger.warn(), logger.debug()
- Any logging that includes: req.body, req.query, req.params, req.headers, user input, API responses, URL parameters

Look for these dangerous patterns:
1. String concatenation: console.log('User: ' + username)
2. Template literals: logger.info(\`Request from \${req.ip}\`)
3. Unparameterized logging: any place user data is directly inserted into log messages

## How to fix

Replace ALL unsafe logging with parameterized/structured logging:

### Step 1: Install proper logging library
\`\`\`bash
# For Node.js projects:
npm install winston
# or
npm install pino
\`\`\`

### Step 2: Replace console.log with structured logging

❌ VULNERABLE:
\`\`\`javascript
console.log('User login: ' + username)
logger.info(\`Request from \${req.ip}\`)
console.log('Error processing ' + userInput)
\`\`\`

✅ SECURE:
\`\`\`javascript
// Winston (parameterized logging)
const winston = require('winston')
const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [new winston.transports.File({ filename: 'app.log' })]
})

logger.info('User login', { username: sanitize(username) })
logger.info('Request received', { ip: sanitize(req.ip) })
logger.error('Processing error', { input: sanitize(userInput) })
\`\`\`

### Step 3: Add sanitization function

Add this helper to remove CRLF characters:
\`\`\`javascript
function sanitizeForLog(input) {
  if (typeof input !== 'string') return input
  // Remove carriage return (\\r) and line feed (\\n)
  return input.replace(/[\\r\\n]/g, '_')
}
\`\`\`

Use it everywhere:
\`\`\`javascript
logger.info('Login attempt', {
  username: sanitizeForLog(req.body.username),
  ip: sanitizeForLog(req.ip)
})
\`\`\`

### Step 4: Framework-specific fixes

**Next.js:**
- Replace all console.log in /app/api/ routes with Winston/Pino
- Add sanitization to all server action logging
- Never log user input without sanitization

**Express:**
- Remove console.log from route handlers
- Use Winston or Pino for all logging
- Add sanitization middleware for consistent logging

**Prisma:**
- Don't log raw user input from database queries
- Use structured logging for query errors
- Sanitize any user data before logging

### Step 5: Never log sensitive data

Even with sanitization, NEVER log:
- Passwords (hashed or not)
- API keys, tokens, secrets
- Credit card numbers
- Social security numbers
- Full email addresses (log domain only if needed)

## Validation checklist

After making changes:
1. Search for remaining console.log() in production code
2. Search for template literals in logging: \\\`.*\\\$\\{.*\\}\\\`
3. Verify all user input goes through sanitizeForLog()
4. Confirm Winston/Pino is configured with JSON format
5. Test that logs are machine-readable and parseable

## Expected output

List every file you modified with:
- Before: the vulnerable logging code
- After: the secure parameterized logging
- Confirm: no user input is directly concatenated into log strings

Proceed systematically through the codebase.`}</div>
				</div>
			</div>

			<!-- Manual Fix -->
			<div class="fix-section">
				<h3>Manual fix: Before/after comparison</h3>
				<p>Here's the exact change that closes the vulnerability. Same functionality, completely different security posture:</p>

				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-label">Vulnerable Code</div>
						<pre><code>{`// ❌ VULNERABLE - CRLF injection possible
const express = require('express')
const app = express()

app.post('/login', (req, res) => {
  const { username } = req.body

  // Attacker can inject: "admin\\n[SUCCESS] Login successful"
  console.log('Login attempt: ' + username)

  // Template literals are just as dangerous:
  console.log(\`User \${username} from IP \${req.ip}\`)

  // Logging library doesn't help if you concatenate:
  logger.info('Failed login for ' + username)
})

// What an attacker injects:
// username: "admin\\n[SUCCESS] User admin logged in\\n[INFO] All checks passed"

// What gets written to logs:
// Login attempt: admin
// [SUCCESS] User admin logged in
// [INFO] All checks passed
// ← Fake entries hide the real failed login`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-label">Secure Code</div>
						<pre><code>{`// ✅ SECURE - Parameterized logging with sanitization
const express = require('express')
const winston = require('winston')
const app = express()

const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [new winston.transports.File({ filename: 'app.log' })]
})

// Sanitization helper
function sanitizeForLog(input) {
  if (typeof input !== 'string') return input
  return input.replace(/[\\r\\n]/g, '_')
}

app.post('/login', (req, res) => {
  const { username } = req.body

  // Parameterized logging - data separate from message
  logger.info('Login attempt', {
    username: sanitizeForLog(username),
    ip: sanitizeForLog(req.ip)
  })

  // Output (JSON, machine-readable):
  // {"level":"info","message":"Login attempt","username":"admin","ip":"192.168.1.1"}
})

// What an attacker injects:
// username: "admin\\n[SUCCESS] User admin logged in"

// What gets written to logs (sanitized):
// {"level":"info","message":"Login attempt","username":"admin_[SUCCESS] User admin logged in_","ip":"..."}
// ← CRLF characters replaced, attack neutralized`}</code></pre>
					</div>
				</div>

				<p>
					<strong>What changed:</strong> Three things. First, we switched from <code>console.log</code> to Winston, a structured logging library. Second, we stopped concatenating strings - user data is now passed as object properties. Third, we added a sanitization function that removes <code>\r</code> and <code>\n</code> characters before logging.
				</p>
				<p>
					The attacker's injected CRLF characters get replaced with underscores. No new log lines created. No fake entries. The logs stay reliable.
				</p>
			</div>

			<!-- Framework-Specific -->
			<div class="fix-section">
				<h3>Framework-specific guidance</h3>
				<div class="framework-notes">
					<div class="framework-note">
						<h4>Next.js (App Router & Pages Router)</h4>
						<p>Replace <code>console.log</code> in API routes and Server Actions with Winston or Pino. Next.js runs these on the server, so any logging with user input needs sanitization. The App Router's server components make this especially important - they're easy to vibe code and easy to get wrong.</p>
					</div>

					<div class="framework-note">
						<h4>Express</h4>
						<p>Use Winston or Pino for all route handler logging. Add a middleware that sanitizes request data before logging. Express has been around since 2010 - we have two decades of vulnerable Express logging patterns in GitHub repos. AI tools learned all of them.</p>
					</div>

					<div class="framework-note">
						<h4>Java / Spring Boot</h4>
						<p>After Log4Shell, everyone should be on Log4j 2.16+ minimum. Use parameterized logging: <code>logger.info("User login: {'{}'}", sanitize(username))</code> instead of string concatenation. SLF4J provides the same pattern. This is the lesson we learned in 2021. Don't forget it.</p>
					</div>

					<div class="framework-note">
						<h4>Python / Flask / Django</h4>
						<p>Use <code>structlog</code> for structured logging. Never use f-strings with user input in logging statements. Python's logging module supports parameterization: <code>logger.info("User: %s", sanitize(username))</code>. The pattern is consistent across languages.</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Structured Logging Best Practices - @breachlore connecting to history -->
		<section class="article-section">
			<h2>Structured logging: The pattern that works</h2>
			<p>
				I've seen logging evolve from text files parsed with grep to JSON streams analyzed by machine learning. The security principle hasn't changed: separate your data from your message template. But the tooling got better.
			</p>

			<div class="best-practices-list">
				<h3>Core principles (these don't change)</h3>
				<ul>
					<li><strong>Use parameterized logging:</strong> Pass user data as separate parameters, never concatenate into message strings</li>
					<li><strong>Sanitize before logging:</strong> Remove or encode CRLF characters (<code>\r\n</code>) from all external input</li>
					<li><strong>Never log secrets:</strong> Passwords, API keys, tokens, PII - none of it belongs in logs, ever</li>
					<li><strong>Use appropriate log levels:</strong> ERROR for actual errors, INFO for normal events, DEBUG for troubleshooting only</li>
				</ul>

				<h3>Modern tooling (use these)</h3>
				<ul>
					<li><strong>Winston (Node.js):</strong> JSON output, multiple transports, built-in levels - <a href="https://github.com/winstonjs/winston">GitHub: winstonjs/winston</a></li>
					<li><strong>Pino (Node.js):</strong> High performance, low overhead, JSON by default - <a href="https://getpino.io/">getpino.io</a></li>
					<li><strong>Log4j 2.16+ (Java):</strong> After Log4Shell, you must be on 2.16 minimum. Parameterized logging is built-in.</li>
					<li><strong>structlog (Python):</strong> Structured logging for Python, context binding, processors for sanitization</li>
				</ul>

				<h3>Why structured logging matters for security</h3>
				<ul>
					<li><strong>Machine-readable output:</strong> JSON logs can be parsed and analyzed by SIEM tools automatically</li>
					<li><strong>Built-in separation:</strong> Data lives in separate fields from message templates</li>
					<li><strong>Easier sanitization:</strong> Apply sanitization functions consistently across all log entries</li>
					<li><strong>Better forensics:</strong> When (not if) an incident happens, structured logs make investigation faster</li>
				</ul>
			</div>

			<p>
				The pattern is older than most developers in the field. We figured this out in the early 2000s with database parameterization. Then we forgot to apply it to logging. Now AI tools are generating vulnerable logging faster than security teams can review it. Use the tools that make the secure pattern the default.
			</p>
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
				<a href="/kb/security/vulnerabilities/command-injection/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Command Injection</div>
					<p class="related-card-description">Similar injection vector targeting shell commands instead of logs</p>
				</a>
				<a href="/kb/vibe-coding-tools/cursor/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Cursor Security Patterns</div>
					<p class="related-card-description">Common vulnerabilities in Cursor-generated code</p>
				</a>
				<a href="/kb/vibe-coding-tools/claude-code/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Claude Code Security</div>
					<p class="related-card-description">How Claude Code handles logging and what to watch for</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Find log injection before attackers do</h2>
			<p>88% of AI-generated logging code is vulnerable. Your vibe coded app probably has dozens of these.</p>
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
	/* Data Source Attribution */
	.data-source {
		font-size: 0.75rem;
		color: var(--text-tertiary);
		margin: 0.5rem 0 1.5rem;
	}

	.data-source a {
		color: var(--text-secondary);
	}

	/* Consequences List */
	.consequences-list {
		list-style: none;
		padding: 0;
		margin: 1rem 0;
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

	/* Fix Sections */
	.fix-section {
		margin: 2.5rem 0;
	}

	.fix-section h3 {
		margin-bottom: 0.75rem;
	}

	/* Code Comparison - Stacked vertically (uses global .code-block from components.css) */
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

	/* Framework Notes */
	.framework-notes {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin: 1rem 0;
	}

	.framework-note {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.25rem;
	}

	.framework-note h4 {
		margin: 0 0 0.5rem;
		font-size: 1rem;
		color: var(--text-primary);
	}

	.framework-note p {
		margin: 0;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	/* Best Practices List */
	.best-practices-list {
		margin: 1.5rem 0;
	}

	.best-practices-list h3 {
		margin: 1.5rem 0 0.75rem;
		font-size: 1.125rem;
		color: var(--text-primary);
	}

	.best-practices-list h3:first-child {
		margin-top: 0;
	}

	.best-practices-list ul {
		margin: 0;
		padding-left: 1.5rem;
		color: var(--text-secondary);
	}

	.best-practices-list li {
		margin-bottom: 0.75rem;
		line-height: 1.6;
	}

	.best-practices-list li:last-child {
		margin-bottom: 0;
	}

	.best-practices-list strong {
		color: var(--text-primary);
	}
</style>
