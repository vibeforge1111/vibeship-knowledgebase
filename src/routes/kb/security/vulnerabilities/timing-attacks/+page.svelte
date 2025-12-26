<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Timing Attacks: Find & Fix in AI-Generated Code',
		description: 'Timing attacks leak secrets through response time differences. Common in vibe coded auth. CWE-208. Fix prompts for Cursor, Bolt & Claude Code.',
		url: '/kb/security/vulnerabilities/timing-attacks/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Timing Attacks' }
	];

	// CWE/OWASP references
	const securityData = {
		cweId: 'CWE-208',
		cweName: 'Observable Timing Discrepancy',
		cweSource: 'https://cwe.mitre.org/data/definitions/208.html',
		owaspCategory: 'A01:2021 - Broken Access Control',
		owaspSource: 'https://owasp.org/Top10/A01_2021-Broken_Access_Control/',
		severity: 'Medium'
	};

	// FAQ data for schema
	const faqs = [
		{
			question: 'Can timing attacks really crack passwords remotely?',
			answer: 'Yes. Statistical analysis of response times can reveal password characters one by one. An attacker sends thousands of requests, measuring microsecond differences. If checking "password1" takes 0.3ms longer than "password2", the first character of the real password is likely "p". Repeat for each position. Network jitter adds noise, but enough samples average it out. Research has demonstrated this works over the internet, not just local networks.'
		},
		{
			question: 'Does HTTPS protect against timing attacks?',
			answer: 'No. HTTPS encrypts the content of requests and responses, but timing is still visible. An attacker can measure how long your server takes to respond regardless of encryption. The attack happens at the application layer, not the transport layer. TLS does not mask response time differences. Your authentication logic is still exposed.'
		},
		{
			question: 'Why do AI coding tools generate timing-vulnerable code?',
			answer: 'Because they optimize for correct functionality, not constant-time execution. String comparison with === is correct for comparing passwords against hashes. It also returns early on first mismatch, creating timing differences. AI models see millions of examples using standard comparison operators. Constant-time comparison is a niche security pattern that rarely appears in training data. The generated code works. It also leaks information.'
		},
		{
			question: 'Is my framework already protected against timing attacks?',
			answer: 'Probably not by default. bcrypt.compare() in Node.js is constant-time. But direct string comparisons for API keys, tokens, or HMAC signatures are not. Most frameworks provide secure comparison functions, but AI tools rarely use them. Check every place you compare secrets. One vulnerable comparison is enough.'
		},
		{
			question: 'How many requests does an attacker need for a timing attack?',
			answer: 'Depends on the timing difference and network conditions. Large differences (milliseconds) might need only hundreds of requests per character. Smaller differences (microseconds) can require tens of thousands. Modern tools automate this entirely. An attacker runs the script overnight and wakes up with your API key. The attack is slow but requires zero interaction once started.'
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
			{"@type": "ListItem", "position": 4, "name": "Timing Attacks"}
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
				<span class="badge badge-medium">Medium</span>
				<span class="badge">{securityData.cweId}</span>
				<span class="badge">OWASP A01:2021</span>
			</div>
			<h1>Timing Attacks in Vibe Coded Apps</h1>
			<p class="text-secondary">How response time differences leak your secrets one character at a time</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Timing attacks extract secrets by measuring how long your code takes to respond.</strong>
				Comparing passwords character-by-character creates measurable time differences. Wrong first character? Fast rejection. Wrong last character? Slower rejection. Attackers exploit this to guess secrets one position at a time.
				AI coding tools generate this pattern constantly because standard string comparison is timing-unsafe.
			</p>
		</div>

		<!-- Stats Box -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">{securityData.cweId}</div>
				<div class="stat-label"><a href={securityData.cweSource}>CWE ID</a></div>
			</div>
			<div class="stat-box">
				<div class="stat-value">A01</div>
				<div class="stat-label"><a href={securityData.owaspSource}>OWASP 2021</a></div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Microseconds</div>
				<div class="stat-label">Attack Precision</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Medium</div>
				<div class="stat-label">Severity</div>
			</div>
		</div>
		<p class="data-source">
			Source: <a href={securityData.cweSource}>CWE-208</a>, <a href={securityData.owaspSource}>OWASP Top 10 (2021)</a>
		</p>

		<!-- What Is It -->
		<section class="article-section">
			<h2>What is a timing attack?</h2>
			<p>
				A timing attack exploits measurable differences in how long your code takes to execute. When comparing a user-supplied password against a stored hash, standard comparison operators check character by character and return false on the first mismatch. That early return creates a timing difference an attacker can measure.
			</p>
			<p>
				Think of it like a combination lock that clicks differently for each correct digit. An attacker doesn't need to guess the whole combination. They try each digit, listen for the click, and move on. Timing attacks work the same way. Instead of listening, they measure response times in microseconds.
			</p>
			<p>
				The <a href="https://cwe.mitre.org/data/definitions/208.html">CWE-208 (Observable Timing Discrepancy)</a> classification covers this vulnerability class. It appears in authentication systems, API key validation, HMAC signature checks, and anywhere secrets are compared against user input. Vibe coders building auth with AI tools are generating this pattern in every login endpoint.
			</p>
		</section>

		<!-- AI Tool Patterns -->
		<section class="article-section">
			<h2>How do AI tools cause timing vulnerabilities?</h2>
			<p>
				Every major AI coding tool generates timing-vulnerable comparison code by default. Ask for a login system, and you get standard equality checks. The code is functionally correct. It also broadcasts your password policy to anyone with a stopwatch.
			</p>

			<div class="tool-patterns-box">
				<h3>The pattern behind the problem</h3>
				<p>Ask any AI tool to validate an API key. This is what you get:</p>
				<div class="code-block">
					<pre><code>{`// Cursor, Bolt, Claude Code - all generate this
function validateApiKey(providedKey, storedKey) {
  return providedKey === storedKey;
}

// Or in authentication:
if (inputPassword === storedPassword) {
  return { success: true };
}`}</code></pre>
				</div>
				<p class="pattern-note">
					Looks fine. Works correctly. Leaks timing information with every request.
					The <code>===</code> operator returns on first character mismatch, creating measurable differences between a completely wrong key and an almost-correct one.
				</p>
			</div>

			<p>
				<strong>Why AI does this:</strong> Training data is full of standard comparison operators. Constant-time comparison is a specialized security pattern that rarely appears in tutorials or Stack Overflow answers. AI gives you the common pattern, not the secure one. It doesn't know the difference between comparing display names and comparing secrets.
			</p>

			<p>
				The problem compounds in vibe coding. You prompt for "secure login," and the AI uses bcrypt for hashing (good) but then compares tokens, API keys, and session IDs with standard operators (vulnerable). The auth looks secure. The side channels are wide open.
			</p>
		</section>

		<!-- What Could Happen -->
		<section class="article-section">
			<h2>What could happen if I have timing vulnerabilities?</h2>
			<p>
				Timing attacks are patient. They don't crash your server or trip rate limits. They just quietly extract information, one microsecond at a time.
			</p>
			<ul class="consequences-list">
				<li><strong>API key extraction:</strong> An attacker measures response times for different key guesses. After enough samples, statistical analysis reveals the correct key character by character. They never need to see your database. Your authentication endpoint tells them everything.</li>
				<li><strong>Password oracle:</strong> Even with hashed passwords, timing differences in comparison reveal password length and character positions. Combined with common password lists, this accelerates brute force attacks dramatically. The timing data narrows the search space.</li>
				<li><strong>HMAC bypass:</strong> Webhook signatures, JWT validation, and API authentication often use HMAC. Standard comparison on HMAC outputs lets attackers forge valid signatures by guessing one byte at a time. They can eventually create valid tokens without knowing your secret key.</li>
				<li><strong>Token enumeration:</strong> Session tokens, password reset tokens, and API tokens compared with standard operators leak their values. An attacker can claim any session, reset any password, or impersonate any API client.</li>
				<li><strong>Cryptographic downgrade:</strong> Timing data about which cryptographic operations succeed or fail can reveal implementation details. Attackers use this to identify the weakest acceptable algorithm and force its use.</li>
			</ul>
			<p>
				The attack requires no special access. Just an endpoint that compares secrets and a lot of patience. Automated tools handle the rest.
			</p>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How do I detect timing vulnerabilities?</h2>
			<p>
				Search your codebase for secret comparison. Anywhere you compare passwords, API keys, tokens, HMAC values, or cryptographic outputs using standard operators, you have a potential timing vulnerability.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Patterns to search for</span>
				</div>
				<pre><code>{`// Direct comparison of secrets (VULNERABLE)
if (apiKey === storedApiKey)
if (token === expectedToken)
if (signature === computedSignature)

// String comparison on crypto outputs (VULNERABLE)
if (hmac === expectedHmac)
if (hash === storedHash)

// Manual character comparison (VULNERABLE)
providedKey.split('').every((char, i) => char === storedKey[i])

// Regex to find these patterns:
// (apiKey|token|secret|password|hmac|signature)\\s*===
// \\.compare\\s*\\([^)]*\\)\\s*===`}</code></pre>
			</div>

			<p>
				<strong>What to look for:</strong> Any <code>===</code> or <code>==</code> comparison where one side is user-controlled and the other is a secret. This includes passwords (even hashed), API keys, session tokens, HMAC signatures, and cryptographic nonces.
			</p>

			<div class="cta-box">
				<p><strong>Want automated detection?</strong></p>
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
			<h2>How do I fix timing vulnerabilities?</h2>
			<p>
				The fix is constant-time comparison. Instead of returning early on first mismatch, constant-time functions compare every character regardless of match status. Same execution time whether the input is completely wrong or almost correct. No timing signal to exploit.
			</p>

			<!-- AI Fix Prompt -->
			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>This prompt has been tested on production codebases. Copy it into Cursor, Claude Code, or Bolt:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Fix all timing attack vulnerabilities in my codebase.

## What to look for

Search for these dangerous patterns:

1. Direct comparison of secrets:
   - apiKey === storedApiKey
   - token === expectedToken
   - password === storedPassword
   - signature === computedSignature

2. Comparison of cryptographic outputs:
   - hmac === expectedHmac
   - hash === storedHash
   - digest === expectedDigest

3. Early return patterns:
   - if (input[i] !== secret[i]) return false

## How to fix

Replace standard comparison with constant-time functions:

### For Node.js (crypto.timingSafeEqual):
\`\`\`javascript
// Before (vulnerable)
if (apiKey === storedApiKey) { ... }

// After (secure)
import { timingSafeEqual } from 'crypto';

function safeCompare(a, b) {
  if (a.length !== b.length) {
    // Compare against dummy to maintain constant time
    const dummy = Buffer.alloc(a.length);
    timingSafeEqual(Buffer.from(a), dummy);
    return false;
  }
  return timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

if (safeCompare(apiKey, storedApiKey)) { ... }
\`\`\`

### For bcrypt password comparison (already safe):
\`\`\`javascript
// bcrypt.compare is already constant-time
import bcrypt from 'bcrypt';
const isValid = await bcrypt.compare(inputPassword, storedHash);
\`\`\`

### For HMAC verification:
\`\`\`javascript
// Before (vulnerable)
const signature = computeHmac(payload, secret);
if (signature === providedSignature) { ... }

// After (secure)
import { timingSafeEqual, createHmac } from 'crypto';

function verifyHmac(payload, providedSignature, secret) {
  const computed = createHmac('sha256', secret)
    .update(payload)
    .digest();
  const provided = Buffer.from(providedSignature, 'hex');

  if (computed.length !== provided.length) return false;
  return timingSafeEqual(computed, provided);
}
\`\`\`

## Framework-specific notes

- Express: Check all middleware that validates API keys or tokens
- Next.js: Check API routes and middleware for auth comparisons
- Supabase: RLS policies handle this, but check custom auth logic
- JWT: Use library verify functions, don't compare signatures manually

## After fixing

1. Search for remaining === comparisons near secret-related variable names
2. Verify all HMAC, signature, and token comparisons use timingSafeEqual
3. List all files you modified with before/after snippets

Please proceed systematically through my codebase.`}</div>
				</div>
			</div>

			<!-- Manual Fix -->
			<div class="fix-section">
				<h3>Manual Fix</h3>
				<p>The critical change is replacing standard comparison with constant-time comparison. Here's the difference:</p>

				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-block-header">
							<span class="code-block-lang status-bad">VULNERABLE</span>
						</div>
						<pre><code>{`// Standard comparison - DANGEROUS
function validateToken(provided, stored) {
  return provided === stored;
}

// Early return on mismatch
// If first char differs: ~0.1ms
// If last char differs: ~0.8ms
// Attacker measures this difference`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-block-header">
							<span class="code-block-lang status-good">SECURE</span>
						</div>
						<pre><code>{`// Constant-time comparison - SAFE
import { timingSafeEqual } from 'crypto';

function validateToken(provided, stored) {
  const a = Buffer.from(provided);
  const b = Buffer.from(stored);

  if (a.length !== b.length) {
    // Still constant time for length check
    timingSafeEqual(a, Buffer.alloc(a.length));
    return false;
  }

  return timingSafeEqual(a, b);
}

// Same execution time regardless of
// which character differs`}</code></pre>
					</div>
				</div>

				<p>
					<strong>What changed:</strong> The <code>timingSafeEqual</code> function compares all bytes regardless of match status. It doesn't return early. Whether the attacker's guess is completely wrong or one character off, the comparison takes the same time. The timing signal disappears.
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
				<a href="/kb/security/vulnerabilities/weak-password-hashing/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Weak Password Hashing</div>
					<p class="related-card-description">Insecure hashing that accelerates brute force attacks</p>
				</a>
				<a href="/kb/security/vulnerabilities/jwt-vulnerabilities/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">JWT Vulnerabilities</div>
					<p class="related-card-description">Token signing and verification issues</p>
				</a>
				<a href="/kb/security/stacks/nextjs-supabase/" class="card card-interactive related-card">
					<div class="related-card-category">Stack Guide</div>
					<div class="related-card-title">Next.js + Supabase Security</div>
					<p class="related-card-description">Complete security checklist for the popular stack</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Timing vulnerabilities are invisible until exploited</h2>
			<p>Your logs show nothing. Your tests pass. Attackers measure what you can't see.</p>
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

	/* Framework Links */
	.framework-links {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}

	.framework-links a {
		text-decoration: none;
	}

	.framework-name {
		display: block;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 0.25rem;
	}

	.framework-desc {
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.framework-links {
			grid-template-columns: 1fr;
		}
	}
</style>
