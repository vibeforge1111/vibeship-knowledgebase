<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Email Header Injection: Find & Fix in AI-Generated Code',
		description: 'Email header injection lets attackers send spam through your servers. Found in CWE-93. Fix prompts for Cursor, Bolt & Claude Code.',
		url: '/kb/security/vulnerabilities/email-header-injection/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Email Header Injection' }
	];

	// Real external data sources
	const securityData = {
		cweId: 'CWE-93',
		cweName: 'Improper Neutralization of CRLF Sequences',
		cweSource: 'https://cwe.mitre.org/data/definitions/93.html',
		owaspCategory: 'A03:2021 - Injection',
		owaspSource: 'https://owasp.org/Top10/A03_2021-Injection/'
	};

	// FAQ data for schema
	const faqs = [
		{
			question: 'What is CRLF and why does it matter for email?',
			answer: 'CRLF stands for Carriage Return Line Feed (\\r\\n). In email protocols, CRLF separates headers from each other and from the body. When attackers inject CRLF sequences into user input, they can add new headers or even rewrite the email body. One line break in the wrong place turns your contact form into a spam relay.'
		},
		{
			question: 'Can email header injection happen with modern email libraries?',
			answer: 'Yes, though some libraries offer protection. Nodemailer validates addresses by default, but custom header manipulation can bypass this. SendGrid and Postmark APIs are generally safer because they handle header construction server-side. The vulnerability appears when developers concatenate user input directly into email fields or headers.'
		},
		{
			question: 'How do attackers discover email header injection vulnerabilities?',
			answer: 'Attackers test contact forms by submitting payloads with CRLF sequences (\\r\\n) in name, email, or subject fields. If the form sends unexpected emails, adds headers, or modifies recipients, the vulnerability is confirmed. Automated scanners can test thousands of forms per hour. The attack is trivial once discovered.'
		},
		{
			question: 'What are the legal consequences of email header injection?',
			answer: 'When your server sends spam, you become legally liable under anti-spam laws like CAN-SPAM (US), CASL (Canada), and GDPR (EU). ISPs will blacklist your domain. Email providers may block all mail from your IP range. Companies have faced fines and lawsuits when attackers used their infrastructure for phishing campaigns.'
		},
		{
			question: 'Why do AI coding tools generate email header injection vulnerabilities?',
			answer: 'AI tools optimize for code that works and reads cleanly. String concatenation in email headers looks elegant. The training data includes countless examples of vulnerable patterns because most open-source code skips input validation. When you ask an AI to build a contact form, it gives you functional code that attackers can abuse within minutes of deployment.'
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
			{"@type": "ListItem", "position": 4, "name": "Email Header Injection"}
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
				<span class="badge badge-high">High</span>
				<span class="badge">CWE-93</span>
				<span class="badge">OWASP A03:2021</span>
			</div>
			<h1>Email Header Injection in Vibe Coded Apps</h1>
			<p class="text-secondary">How attackers turn your contact form into a spam cannon</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Email header injection lets attackers add extra recipients, modify headers, or inject content into emails your application sends.</strong>
				They type malicious data into your contact form, and suddenly your server is sending phishing emails to thousands of people.
				This attack has plagued web applications since the early 2000s. AI coding tools generate vulnerable patterns by default, making vibe coded apps prime targets.
			</p>
		</div>

		<!-- Stats Box -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">{securityData.cweId}</div>
				<div class="stat-label"><a href={securityData.cweSource}>CWE ID</a></div>
			</div>
			<div class="stat-box">
				<div class="stat-value">20+</div>
				<div class="stat-label">Years Known</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">CRLF</div>
				<div class="stat-label">Attack Vector</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">High</div>
				<div class="stat-label">Severity</div>
			</div>
		</div>
		<p class="data-source">
			Source: <a href={securityData.cweSource}>MITRE CWE-93</a>, <a href={securityData.owaspSource}>OWASP Top 10</a>
		</p>

		<!-- What Is It - @breachlore voice (historian, connects past to present) -->
		<section class="article-section">
			<h2>What is email header injection?</h2>
			<p>
				Email header injection is what happens when attackers insert CRLF sequences (carriage return, line feed) into email fields your application controls.
				Every email is structured with headers separated by line breaks. When user input contains those line breaks, attackers can add BCC recipients, change the subject, or inject entirely new email content.
			</p>
			<p>
				The vulnerability traces back to the earliest days of web forms. In 2004, security researchers documented widespread exploitation of PHP's <code>mail()</code> function.
				Spammers discovered they could abuse contact forms to send bulk email through legitimate servers, bypassing spam filters that trusted the sending domain.
				Two decades later, the same attack works on modern stacks. The syntax changed. The underlying flaw did not.
			</p>
			<p>
				According to <a href="https://cwe.mitre.org/data/definitions/93.html">CWE-93</a>, improper neutralization of CRLF sequences enables attackers to "modify the structure of data being processed."
				For email, this means your innocent contact form becomes infrastructure for phishing campaigns, spam operations, or targeted attacks against your users.
			</p>
		</section>

		<!-- AI Tool Patterns - @breachlore voice (historical context, pattern recognition) -->
		<section class="article-section">
			<h2>How do AI tools cause email header injection?</h2>
			<p>
				The pattern repeats itself generation after generation. When vibe coders ask AI tools to build a contact form or email notification system, the generated code prioritizes readability over security.
				String concatenation looks clean. Input validation is invisible work that AI models skip.
			</p>

			<div class="tool-patterns-box">
				<h3>The pattern that enables spam campaigns</h3>
				<p>Ask any AI coding tool to build a contact form. This is what appears:</p>
				<div class="code-block">
					<pre><code>{`// Generated by Cursor, Bolt, Claude Code - all produce this pattern
const sendContactEmail = async (name, email, message) => {
  const mailOptions = {
    from: \`\${name} <\${email}>\`,
    to: 'support@yoursite.com',
    subject: \`Contact from \${name}\`,
    text: message
  };

  await transporter.sendMail(mailOptions);
}`}</code></pre>
				</div>
				<p class="pattern-note">
					Functional. Clean. Exploitable.
					An attacker submits <code>victim@example.com\r\nBcc: spam-list@attacker.com</code> as the email field, and suddenly your server is sending to their entire list.
				</p>
			</div>

			<p>
				<strong>Historical parallel:</strong> In the mid-2000s, PHP applications using <code>mail()</code> were so commonly exploited that hosting providers began blocking the function entirely.
				The training data for modern AI models includes millions of code samples from this era and beyond, many containing the exact vulnerable patterns that caused those problems.
				When you vibe code an email feature, the AI resurrects these patterns.
			</p>

			<p>
				Cursor, Claude Code, Bolt, and other AI tools all generate this pattern.
				The vulnerability is not tool-specific. It emerges from how AI models learn: they reproduce what they have seen most often, and insecure email handling dominates their training data.
			</p>
		</section>

		<!-- What Could Happen -->
		<section class="article-section">
			<h2>What could happen if I have email header injection?</h2>
			<p>
				These scenarios have played out repeatedly across the history of web security. The same attacks that compromised applications in 2005 work against vibe coded apps today.
			</p>
			<ul class="consequences-list">
				<li><strong>Spam relay abuse:</strong> Attackers inject BCC headers with thousands of recipients. Your server sends bulk spam, your domain gets blacklisted, and legitimate email stops reaching customers. Recovery takes weeks.</li>
				<li><strong>Phishing infrastructure:</strong> Attackers send emails that appear to come from your domain. Victims see your trusted sender address and click malicious links. Your reputation absorbs the damage.</li>
				<li><strong>Data exfiltration:</strong> Attackers add themselves as BCC recipients to password reset emails, order confirmations, or any automated message containing sensitive data. Silent surveillance of your users.</li>
				<li><strong>Legal liability:</strong> Anti-spam laws like CAN-SPAM and CASL impose penalties on organizations whose infrastructure sends unsolicited email, regardless of intent. Fines accumulate per message.</li>
				<li><strong>Service termination:</strong> Email providers and hosting companies terminate accounts that send spam. Migrations and reputation rebuilding consume months of engineering time.</li>
			</ul>
			<p>
				In 2006, a vulnerability in a major web application framework allowed attackers to send over 100,000 spam emails through legitimate business domains in a single weekend.
				The technique has not changed. Only the frameworks have.
			</p>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How do I detect email header injection?</h2>
			<p>
				Search your codebase for any place where user input flows into email functions without sanitization.
				The vulnerable patterns are predictable: string interpolation in From, To, Subject, or custom header fields.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Patterns to search for</span>
				</div>
				<pre><code>{`// User input in From header (DANGEROUS)
from: \`\${userInput} <\${userEmail}>\`

// User input in Subject (DANGEROUS)
subject: \`Message from \${userName}\`

// User input in custom headers (DANGEROUS)
headers: { 'Reply-To': userProvidedEmail }

// Direct concatenation (DANGEROUS)
mailOptions.from = name + ' <' + email + '>';

// Regex patterns to find these:
// from:\\s*[\`'"][^}]*\\$\\{
// subject:\\s*[\`'"][^}]*\\$\\{
// headers.*:\\s*[^}]*\\$\\{`}</code></pre>
			</div>

			<div class="cta-box">
				<p><strong>Scan your codebase for email vulnerabilities</strong></p>
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
			<h2>How do I fix email header injection?</h2>
			<p>
				The fix is straightforward: strip or reject CRLF sequences from any user input that touches email headers.
				Validate email addresses against proper patterns. Use allowlists for fields like From addresses.
				The attack surface shrinks to zero when user input cannot contain line breaks.
			</p>

			<!-- AI Fix Prompt -->
			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>This prompt addresses the patterns that have caused email abuse for two decades. Copy it into Cursor, Claude Code, or Bolt:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Fix all email header injection vulnerabilities in my codebase.

## What to look for

Search for these dangerous patterns in email-related code:

1. User input in email headers without sanitization:
   - from: \`\${userInput}\` or from: name + ' <' + email + '>'
   - subject: \`Message from \${userName}\`
   - replyTo: userProvidedEmail
   - Any custom headers built with user data

2. Missing CRLF validation:
   - User input used directly in mail() or sendMail() options
   - Template literals or concatenation in email fields

3. Unvalidated email addresses:
   - Email fields without format validation
   - Missing checks for newline characters

## How to fix

### Step 1: Create a sanitization function

\`\`\`javascript
function sanitizeEmailHeader(input) {
  if (typeof input !== 'string') return '';
  // Remove all CRLF sequences and null bytes
  return input.replace(/[\\r\\n\\x00]/g, '').trim();
}

function isValidEmail(email) {
  // Basic email validation - adjust regex for your needs
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return emailRegex.test(email) && !email.includes('\\r') && !email.includes('\\n');
}
\`\`\`

### Step 2: Apply sanitization to all email inputs

\`\`\`javascript
// Before (vulnerable)
const mailOptions = {
  from: \`\${name} <\${email}>\`,
  to: 'support@yoursite.com',
  subject: \`Contact from \${name}\`,
  text: message
};

// After (secure)
const sanitizedName = sanitizeEmailHeader(name);
const sanitizedEmail = sanitizeEmailHeader(email);

if (!isValidEmail(sanitizedEmail)) {
  throw new Error('Invalid email address');
}

const mailOptions = {
  from: 'noreply@yoursite.com', // Fixed sender
  replyTo: sanitizedEmail,      // Validated user email
  to: 'support@yoursite.com',
  subject: \`Contact from \${sanitizedName}\`,
  text: message
};
\`\`\`

### Step 3: Use library-level protections

\`\`\`javascript
// Nodemailer has built-in validation - enable it
const transporter = nodemailer.createTransport({
  // ... config
});

// SendGrid, Postmark handle this server-side - prefer their APIs
\`\`\`

## Framework-specific notes

- Next.js API routes: Sanitize in the API handler before any email function
- Express: Create middleware to sanitize all email-related fields
- Nodemailer: Use the built-in address validation, avoid raw header manipulation
- SendGrid/Postmark: Prefer their APIs over raw SMTP - they handle sanitization

## After fixing

1. Search for remaining patterns: \\$\\{.*\\} in any mail-related code
2. Add input validation to all form handlers
3. Test with CRLF payloads: "test\\r\\nBcc: attacker@evil.com"
4. List all files you modified with before/after snippets

Please proceed systematically through my codebase.`}</div>
				</div>
			</div>

			<!-- Manual Fix -->
			<div class="fix-section">
				<h3>Manual Fix</h3>
				<p>The difference between vulnerable and secure code is a few lines of validation. The attack that has worked since 2004 stops working:</p>

				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-block-header">
							<span class="code-block-lang status-bad">VULNERABLE</span>
						</div>
						<pre><code>{`// Direct user input in headers - DANGEROUS
const sendContactEmail = async (req, res) => {
  const { name, email, message } = req.body;

  await transporter.sendMail({
    from: \`\${name} <\${email}>\`,
    to: 'support@yoursite.com',
    subject: \`Contact from \${name}\`,
    text: message
  });
};

// Attacker submits:
// email: "attacker@evil.com\\r\\nBcc: victim1@x.com,victim2@x.com"
// Result: Email sent to entire BCC list`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-block-header">
							<span class="code-block-lang status-good">SECURE</span>
						</div>
						<pre><code>{`// Sanitized and validated - SAFE
const sanitize = (str) => str.replace(/[\\r\\n\\x00]/g, '').trim();
const isValidEmail = (e) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(e);

const sendContactEmail = async (req, res) => {
  const { name, email, message } = req.body;

  const safeName = sanitize(name);
  const safeEmail = sanitize(email);

  if (!isValidEmail(safeEmail)) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  await transporter.sendMail({
    from: 'noreply@yoursite.com', // Fixed sender
    replyTo: safeEmail,           // Validated reply-to
    to: 'support@yoursite.com',
    subject: \`Contact from \${safeName}\`,
    text: message
  });
};

// CRLF sequences stripped, attack neutralized`}</code></pre>
					</div>
				</div>

				<p>
					<strong>What changed:</strong> User input is sanitized to remove CRLF sequences before it touches any email header.
					The From address is now fixed (controlled by you, not the attacker).
					Email format is validated before sending.
					The same attack that worked for two decades now fails silently.
				</p>
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
				<a href="/kb/security/vulnerabilities/header-injection/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">HTTP Header Injection</div>
					<p class="related-card-description">CRLF injection in HTTP responses</p>
				</a>
				<a href="/kb/security/vulnerabilities/command-injection/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Command Injection</div>
					<p class="related-card-description">When user input becomes system commands</p>
				</a>
				<a href="/kb/security/vulnerabilities/sql-injection/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">SQL Injection</div>
					<p class="related-card-description">The database attack that never dies</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Find email vulnerabilities before spammers do</h2>
			<p>Your contact form could be sending spam right now. Check your code.</p>
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

	/* Tool Patterns Box */
	.tool-patterns-box {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.tool-patterns-box h3 {
		margin: 0 0 0.75rem;
		font-size: 1rem;
	}

	.tool-patterns-box > p {
		margin: 0 0 1rem;
		color: var(--text-secondary);
	}

	.pattern-note {
		margin: 1rem 0 0 !important;
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.pattern-note code {
		background: var(--bg-tertiary);
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

	/* Fix Sections */
	.fix-section {
		margin: 2rem 0;
	}

	.fix-section h3 {
		margin-bottom: 0.75rem;
	}

	/* Code Comparison */
	.code-comparison {
		display: grid;
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.code-block.vulnerable .code-block-header {
		border-left: 3px solid var(--red);
	}

	.code-block.secure .code-block-header {
		border-left: 3px solid var(--green);
	}

	.status-bad {
		color: var(--red);
	}

	.status-good {
		color: var(--green);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.tool-patterns-box {
			padding: 1rem;
		}
	}
</style>
