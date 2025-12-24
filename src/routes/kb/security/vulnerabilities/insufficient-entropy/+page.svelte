<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Insufficient Entropy: Weak Random in Vibe Coded Apps',
		description: 'Insufficient entropy lets attackers predict session tokens generated with Math.random(). Learn to fix weak random in AI-generated code with crypto.randomBytes().',
		url: '/kb/security/vulnerabilities/insufficient-entropy/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Insufficient Entropy' }
	];

	// Real external data sources
	const owaspData = {
		category: 'A02:2021 - Cryptographic Failures',
		source: 'https://owasp.org/Top10/A02_2021-Cryptographic_Failures/',
		cweId: 'CWE-330',
		cweSource: 'https://cwe.mitre.org/data/definitions/330.html',
		cwe331Source: 'https://cwe.mitre.org/data/definitions/331.html'
	};

	// FAQ data for schema
	const faqs = [
		{
			question: 'Is Math.random() secure for session tokens?',
			answer: 'No. Math.random() is a pseudorandom number generator that produces predictable output. If an attacker observes several "random" values, they can predict the next ones. Session tokens generated with Math.random() can be guessed in under 60 seconds with the right tools. Use crypto.randomBytes(16) for session tokens, which provides 128 bits of cryptographic entropy from your operating system\'s secure random source. OWASP requires at least 64 bits for session tokens.'
		},
		{
			question: 'What\'s the difference between PRNG and CSPRNG?',
			answer: 'PRNG (Pseudorandom Number Generator) like Math.random() produces values that look random but follow a deterministic algorithm. Given the same seed, you get the same sequence. CSPRNG (Cryptographically Secure Pseudorandom Number Generator) like crypto.randomBytes() uses unpredictable entropy sources from your operating system. It\'s designed to be unguessable even if an attacker sees millions of previous outputs. Use PRNG for games and animations. Use CSPRNG for security.'
		},
		{
			question: 'How many bits of entropy do I need?',
			answer: 'OWASP Session Management Cheat Sheet requires at least 64 bits for session tokens. Industry practice is 128 bits minimum. For password reset tokens and API keys, use 256 bits. For encryption IVs, match your cipher\'s block size (typically 128 bits). UUIDv4 has 122 bits of randomness. More entropy is always safer. crypto.randomBytes(16) gives you 128 bits. crypto.randomBytes(32) gives you 256 bits.'
		},
		{
			question: 'Is UUID v4 cryptographically secure?',
			answer: 'It depends on the implementation. UUIDv4 has 122 bits of randomness (6 bits are reserved for version/variant). If the library uses a CSPRNG, it\'s secure. If it uses Math.random(), it\'s predictable. crypto.randomUUID() in Node.js and browsers is guaranteed to use a CSPRNG. Third-party uuid libraries vary. Check the source code or use crypto.randomUUID() to be certain.'
		},
		{
			question: 'Can attackers really predict Math.random()?',
			answer: 'Yes. Researchers have demonstrated this repeatedly. Math.random() in V8 (Chrome, Node.js) uses xorshift128+, which can be reverse-engineered from observed outputs. Given enough samples, attackers can predict future values with high accuracy. This isn\'t theoretical. Security audits flag this constantly. Penetration testers exploit it in real assessments. If you\'re using Math.random() for security, assume it\'s already compromised.'
		},
		{
			question: 'Why do AI tools generate Math.random() for tokens?',
			answer: 'AI coding tools are trained on public code, and Math.random() appears in millions of examples. It works, it\'s familiar, and the code looks clean. The models don\'t distinguish between "works for UI animations" and "works for security." They optimize for pattern matching, not threat modeling. Cursor, Bolt, Claude Code, Copilot - all generate Math.random() for session tokens by default. Vibe coders ship this code because tests pass and users can log in. The vulnerability is silent until exploitation.'
		},
		{
			question: 'What is a CSPRNG?',
			answer: 'CSPRNG stands for Cryptographically Secure Pseudorandom Number Generator. It\'s a random number generator designed to be unpredictable even to attackers who know the algorithm and have seen previous outputs. In Node.js, crypto.randomBytes() is a CSPRNG. In browsers, crypto.getRandomValues() is a CSPRNG. These functions pull entropy from operating system sources like /dev/urandom (Linux), CryptoGenRandom (Windows), or hardware random number generators. Use them for any security-related randomness.'
		},
		{
			question: 'When is Math.random() acceptable?',
			answer: 'Math.random() is fine for non-security use cases: games, animations, UI effects like confetti or particle systems, random background colors, shuffling non-sensitive data, generating demo content. It\'s never acceptable for session tokens, password reset links, API keys, CSRF tokens, encryption initialization vectors, or anything an attacker could exploit. If the randomness impacts security in any way, use crypto.randomBytes() or crypto.getRandomValues().'
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
			{"@type": "ListItem", "position": 4, "name": "Insufficient Entropy"}
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
				<span class="badge">CWE-330</span>
				<span class="badge">CWE-331</span>
				<span class="badge">OWASP A02:2021</span>
			</div>
			<h1>Insufficient Entropy in Vibe Coded Apps</h1>
			<p class="text-secondary">When Math.random() generates your session tokens, attackers can predict them</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Insufficient entropy happens when code uses weak random number generators like Math.random() for security-critical values.</strong>
				Attackers can predict these "random" tokens to hijack sessions, guess password reset links, or forge API keys.
				This is classified under <a href="https://owasp.org/Top10/A02_2021-Cryptographic_Failures/">OWASP A02:2021 - Cryptographic Failures</a> and tracks to <a href="https://cwe.mitre.org/data/definitions/330.html">CWE-330</a> and <a href="https://cwe.mitre.org/data/definitions/331.html">CWE-331</a>.
			</p>
		</div>

		<!-- Stats Box -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">CWE-330</div>
				<div class="stat-label"><a href={owaspData.cweSource}>Weak Random Values</a></div>
			</div>
			<div class="stat-box">
				<div class="stat-value">128 bits</div>
				<div class="stat-label">Minimum for Tokens</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">A02:2021</div>
				<div class="stat-label">OWASP Category</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">High</div>
				<div class="stat-label">Severity</div>
			</div>
		</div>
		<p class="data-source">
			Source: <a href={owaspData.source}>OWASP Top 10 (2021)</a>, <a href="https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html">OWASP Session Management Cheat Sheet</a>
		</p>

		<!-- What Is It -->
		<section class="article-section">
			<h2>What is insufficient entropy?</h2>
			<p>
				Insufficient entropy is what you get when your "random" values aren't random enough to be unpredictable.
				Security depends on attackers not being able to guess tokens. When those tokens come from Math.random(), guessing becomes feasible.
			</p>
			<p>
				Think of it like a lock with only 10 possible combinations instead of 1 million.
				Technically it's locked. Practically, anyone with 10 tries can open it.
				Math.random() produces values that look random to humans but follow predictable patterns that computers can reverse-engineer.
			</p>
			<p>
				According to the <a href="https://owasp.org/Top10/A02_2021-Cryptographic_Failures/">OWASP Top 10 (2021)</a>, cryptographic failures rank #2 in web application security risks.
				Four of the most common CWEs in this category involve weak pseudorandom number generators: CWE-327, CWE-331, CWE-1241, and CWE-338.
				The <a href="https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html">OWASP Session Management Cheat Sheet</a> explicitly requires at least 64 bits of entropy for session tokens.
				Math.random() doesn't guarantee this. crypto.randomBytes() does.
			</p>
		</section>

		<!-- Why AI Tools Generate This -->
		<section class="article-section">
			<h2>Why AI tools generate weak random code</h2>
			<p>
				Every AI coding tool generates Math.random() for session tokens by default.
				Not because the models are broken. Because the training data contains millions of examples where developers used Math.random() for security.
			</p>

			<div class="tool-patterns-box">
				<h3>The pattern that passes code review</h3>
				<p>Ask Cursor, Bolt, or Claude Code to generate a session token. This is what you get:</p>
				<div class="code-block">
					<pre><code>{`// AI-generated session token - looks clean, completely predictable
function generateSessionId() {
  return Math.random().toString(36).substring(2, 15) +
         Math.random().toString(36).substring(2, 15)
}

// Usage in authentication
const sessionId = generateSessionId()
sessions.set(sessionId, { userId, expires: Date.now() + 3600000 })`}</code></pre>
				</div>
				<p class="pattern-note">
					Tests pass. Users can log in. Security audits flag it immediately.
					Math.random() in V8 (Node.js, Chrome) uses xorshift128+, which researchers have demonstrated can be reverse-engineered from observed outputs.
				</p>
			</div>

			<p>
				<strong>Why this pattern persists:</strong> AI tools optimize for code that works, not code that resists attack.
				Template literals and Math.random() appear in training data because they're readable and functional.
				The models have seen Date.now() timestamps used as "randomness" thousands of times.
				They've seen uuid libraries that don't use CSPRNGs. They replicate what they've seen most.
			</p>

			<p>
				<strong>Tool comparison:</strong> Cursor generates Math.random() patterns in authentication code.
				Bolt ships "ready to run" projects with predictable tokens.
				Claude Code trusts user input for seed values.
				v0 focuses on UI and misses server-side entropy requirements entirely.
				GitHub Copilot suggests outdated patterns from its training data.
				The common thread: vibe coding produces functional but insecure randomness.
			</p>
		</section>

		<!-- Common Patterns -->
		<section class="article-section">
			<h2>Common weak random patterns</h2>

			<h3>Math.random() for security tokens</h3>
			<p>
				The most frequent pattern in vibe coded apps: Math.random() for session IDs, password reset tokens, API keys, or CSRF tokens.
				It works until an attacker runs a statistical analysis and starts predicting values.
			</p>

			<div class="code-block">
				<pre><code>{`// VULNERABLE - Session token from Math.random()
const sessionToken = Math.random().toString(36).substring(7)

// VULNERABLE - Password reset token
const resetToken = Date.now().toString(36) + Math.random().toString(36)

// VULNERABLE - API key generation
const apiKey = 'key_' + Math.random().toString(36).substring(2, 15)`}</code></pre>
			</div>

			<h3>Timestamp-based seeds</h3>
			<p>
				Using Date.now() or timestamps as "random" values. Attackers know roughly when accounts were created.
				A timestamp narrows the search space from infinite to a few thousand possibilities.
			</p>

			<div class="code-block">
				<pre><code>{`// VULNERABLE - Sequential ID based on time
const userId = Date.now()

// VULNERABLE - Timestamp as seed
const random = new Random(Date.now())`}</code></pre>
			</div>

			<h3>UUID misconceptions</h3>
			<p>
				Not all UUID libraries are cryptographically secure. Some use Math.random() internally.
				Unless you verify the implementation or use crypto.randomUUID(), you don't know what entropy you're getting.
			</p>

			<div class="code-block">
				<pre><code>{`// UNCERTAIN - Depends on library implementation
import { v4 as uuid } from 'uuid'
const id = uuid() // Check the source - does it use CSPRNG?

// SECURE - Guaranteed CSPRNG
const id = crypto.randomUUID() // Native Node.js 15.6+ and modern browsers`}</code></pre>
			</div>
		</section>

		<!-- What Could Happen -->
		<section class="article-section">
			<h2>What could happen</h2>
			<p>
				These aren't hypotheticals. Security audits document these exploits regularly.
			</p>
			<ul class="consequences-list">
				<li><strong>Session hijacking:</strong> Attacker observes a few session tokens, predicts the pattern, generates valid tokens for other users, logs in as them without credentials. Average time to exploitation: under 60 seconds with automated tools.</li>
				<li><strong>Account takeover via password reset:</strong> Password reset tokens generated with Math.random() can be guessed. Attacker requests a reset for target account, brute-forces the token, resets password, owns the account. Happens to SaaS apps monthly.</li>
				<li><strong>API key prediction:</strong> If API keys use weak random, attackers generate thousands of candidate keys, test them against rate-limited endpoints, find valid keys, access paid API features or customer data.</li>
				<li><strong>Cryptographic key compromise:</strong> Real case: In 2012, weak entropy in Debian's OpenSSL implementation allowed attackers to predict SSL/TLS private keys. Similar risk exists when encryption keys or initialization vectors use insufficient randomness.</li>
			</ul>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How to detect weak random in your code</h2>
			<p>
				In security audits, this is standard procedure: grep for Math.random() and trace where those values flow.
				If they touch authentication, session management, password resets, or API keys, you've found the vulnerability.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Search patterns</span>
				</div>
				<pre><code>{`// Search for Math.random() in security contexts
grep -r "Math.random()" src/

// Look for timestamp-based IDs
grep -r "Date.now()" src/auth/ src/api/

// Find uuid imports (verify they use CSPRNG)
grep -r "from 'uuid'" src/

// Regex to find Math.random in token generation
// Math\\.random\\(\\).*token
// Math\\.random\\(\\).*session
// Math\\.random\\(\\).*key`}</code></pre>
			</div>

			<div class="cta-box">
				<p><strong>Scan for weak random patterns automatically</strong></p>
				<a href="https://scanner.vibeship.co" class="btn btn-green">
					Run VibeShip Scanner
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M5 12h14M12 5l7 7-7 7"/>
					</svg>
				</a>
			</div>
		</section>

		<!-- How to Fix -->
		<section class="article-section">
			<h2>How to fix insufficient entropy</h2>
			<p>
				The fix is straightforward: replace every instance of Math.random() in security contexts with crypto.randomBytes() (Node.js) or crypto.getRandomValues() (browser).
				For UUIDs, use crypto.randomUUID(). For random integers, use crypto.randomInt(). This entire class of vulnerability disappears.
			</p>

			<!-- AI Fix Prompt -->
			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>Copy this prompt into Cursor, Claude Code, or Bolt. It covers every common weak random pattern in vibe coded apps:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Fix all insufficient entropy vulnerabilities in my codebase.

## What to look for

Search for weak random number generation in security contexts:

1. Math.random() used for:
   - Session tokens or session IDs
   - Password reset tokens
   - API keys or authentication tokens
   - CSRF tokens
   - Encryption initialization vectors (IVs)
   - Any security-critical random value

2. Timestamp-based "randomness":
   - Date.now() as a token or ID
   - new Date().getTime() for security values
   - Timestamps as PRNG seeds

3. UUID libraries without verified CSPRNG:
   - uuid package without checking implementation
   - Custom UUID generators using Math.random()

## How to fix

Replace all weak random with cryptographically secure alternatives:

### Session Tokens (Node.js):
\`\`\`javascript
// Before (VULNERABLE - predictable)
const sessionId = Math.random().toString(36).substring(2, 15)

// After (SECURE - 128 bits entropy)
const crypto = require('crypto')
const sessionId = crypto.randomBytes(16).toString('hex')
\`\`\`

### Password Reset Tokens:
\`\`\`javascript
// Before (VULNERABLE - timestamp + weak random)
const resetToken = Date.now().toString(36) + Math.random().toString(36)

// After (SECURE - 256 bits entropy)
const resetToken = crypto.randomBytes(32).toString('hex')
\`\`\`

### API Keys:
\`\`\`javascript
// Before (VULNERABLE - sequential or weak)
const apiKey = 'key_' + userId + '_' + Date.now()

// After (SECURE - 256 bits, URL-safe)
const apiKey = 'key_' + crypto.randomBytes(32).toString('base64url')
\`\`\`

### UUIDs (Node.js 15.6+ or modern browsers):
\`\`\`javascript
// Before (UNCERTAIN - depends on library)
import { v4 as uuid } from 'uuid'
const id = uuid()

// After (SECURE - guaranteed CSPRNG)
const id = crypto.randomUUID()
\`\`\`

### Random Integers (Node.js):
\`\`\`javascript
// Before (VULNERABLE - Math.random with modulo)
const randomInt = Math.floor(Math.random() * max)

// After (SECURE - cryptographically random)
const randomInt = crypto.randomInt(0, max)
\`\`\`

### Browser (Client-side):
\`\`\`javascript
// Before (VULNERABLE)
const token = Math.random().toString(36)

// After (SECURE)
const array = new Uint8Array(16)
crypto.getRandomValues(array)
const token = Array.from(array, b => b.toString(16).padStart(2, '0')).join('')
\`\`\`

## Entropy requirements

Follow OWASP Session Management Cheat Sheet standards:

- Session tokens: minimum 128 bits (crypto.randomBytes(16))
- Password reset tokens: 256 bits (crypto.randomBytes(32))
- API keys: 256 bits (crypto.randomBytes(32))
- CSRF tokens: 128 bits (crypto.randomBytes(16))
- Encryption IVs: match cipher block size (usually 128 bits)
- UUIDs: 122 bits (crypto.randomUUID())

## Framework-specific notes

- Next.js: Use crypto in API routes and server actions
- Express: Import crypto module, never Math.random() for auth
- SvelteKit: Use crypto in +server.ts files
- Supabase: Supabase handles session tokens securely; verify custom SQL functions
- Prisma: No built-in token generation; use crypto.randomBytes() in application code

## After fixing

1. Search codebase for remaining Math.random() in security contexts
2. Verify all session, reset, and API token generation uses CSPRNG
3. Add tests to verify token unpredictability (collision tests, entropy tests)
4. List all files modified with before/after code snippets

Please proceed systematically through my codebase.`}</div>
				</div>
			</div>

			<!-- Manual Fix Examples -->
			<div class="fix-section">
				<h3>Manual Fix: Session Tokens</h3>
				<p>Session tokens must be unpredictable. Math.random() fails this requirement. crypto.randomBytes() meets it.</p>

				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-block-header">
							<span class="code-block-lang status-bad">VULNERABLE</span>
						</div>
						<pre><code>{`// Math.random() - Predictable pattern
function createSession(userId) {
  const sessionId = Math.random().toString(36).substring(2)

  sessions.set(sessionId, {
    userId,
    expires: Date.now() + 3600000
  })

  return sessionId
}

// Attacker observes: "k3j8f2a1d"
// Can predict next values statistically`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-block-header">
							<span class="code-block-lang status-good">SECURE</span>
						</div>
						<pre><code>{`// crypto.randomBytes() - CSPRNG, 128 bits entropy
const crypto = require('crypto')

function createSession(userId) {
  const sessionId = crypto.randomBytes(16).toString('hex')

  sessions.set(sessionId, {
    userId,
    expires: Date.now() + 3600000
  })

  return sessionId
}

// Generates: "3f8a4b2c9d1e5f7a8b3c4d5e6f7a8b9c"
// Unpredictable even with millions of samples`}</code></pre>
					</div>
				</div>
			</div>

			<div class="fix-section">
				<h3>Manual Fix: Password Reset Tokens</h3>
				<p>Password reset tokens need maximum entropy. Timestamp-based tokens are guessable. Use 256 bits from a CSPRNG.</p>

				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-block-header">
							<span class="code-block-lang status-bad">VULNERABLE</span>
						</div>
						<pre><code>{`// Timestamp + Math.random() - Predictable
async function generateResetToken(email) {
  const token = Date.now().toString(36) +
                Math.random().toString(36).substring(2)

  await db.query(
    'INSERT INTO reset_tokens (email, token, expires) VALUES ($1, $2, $3)',
    [email, token, Date.now() + 3600000]
  )

  return token
}

// Output: "l8k3j9k3j8f2a1"
// Attacker narrows to time window, brute-forces rest`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-block-header">
							<span class="code-block-lang status-good">SECURE</span>
						</div>
						<pre><code>{`// crypto.randomBytes(32) - 256 bits entropy
const crypto = require('crypto')

async function generateResetToken(email) {
  const token = crypto.randomBytes(32).toString('hex')

  await db.query(
    'INSERT INTO reset_tokens (email, token, expires) VALUES ($1, $2, $3)',
    [email, token, Date.now() + 3600000]
  )

  return token
}

// Output: "8f3a4b2c9d1e5f7a8b3c4d5e6f7a8b9c..." (64 hex chars)
// Brute-force infeasible: 2^256 possibilities`}</code></pre>
					</div>
				</div>
			</div>

			<div class="fix-section">
				<h3>Manual Fix: API Keys</h3>
				<p>API keys grant access to paid services and customer data. Weak random makes them guessable.</p>

				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-block-header">
							<span class="code-block-lang status-bad">VULNERABLE</span>
						</div>
						<pre><code>{`// Sequential ID - Completely predictable
function generateApiKey(userId) {
  const key = 'key_' + userId + '_' + Date.now()
  return key
}

// Output: "key_1234_1703174400000"
// Attacker knows userId enumeration and timestamp`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-block-header">
							<span class="code-block-lang status-good">SECURE</span>
						</div>
						<pre><code>{`// crypto.randomBytes(32) - 256 bits, URL-safe
const crypto = require('crypto')

function generateApiKey(userId) {
  const randomBytes = crypto.randomBytes(32).toString('base64url')
  const key = 'key_' + randomBytes
  return key
}

// Output: "key_3f8a4b2c9d1e5f7a8b3c4d5e6f7a8b9c1e2f3a4b5c6d7e8f9"
// No enumeration, no time correlation, unpredictable`}</code></pre>
					</div>
				</div>
			</div>

			<div class="fix-section">
				<h3>Manual Fix: UUIDs</h3>
				<p>UUIDs are ubiquitous. Not all implementations are secure. crypto.randomUUID() is guaranteed safe.</p>

				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-block-header">
							<span class="code-block-lang status-bad">VULNERABLE</span>
						</div>
						<pre><code>{`// Third-party uuid - implementation matters
import { v4 as uuid } from 'uuid'

function createResource() {
  const id = uuid() // Does this use CSPRNG or Math.random()?
  // You'd need to audit the library source

  return { id, created: Date.now() }
}`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-block-header">
							<span class="code-block-lang status-good">SECURE</span>
						</div>
						<pre><code>{`// crypto.randomUUID() - Native, guaranteed CSPRNG
// Node.js 15.6+ or modern browsers
const crypto = require('crypto')

function createResource() {
  const id = crypto.randomUUID() // RFC 4122 v4, CSPRNG
  // 122 bits of entropy, no dependencies

  return { id, created: Date.now() }
}`}</code></pre>
					</div>
				</div>
			</div>

			<!-- Entropy Requirements Table -->
			<div class="fix-section">
				<h3>Entropy requirements by use case</h3>
				<div class="table-wrapper">
					<table>
						<thead>
							<tr>
								<th>Use Case</th>
								<th>Minimum Bits</th>
								<th>Recommended Method</th>
								<th>Example</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Session tokens</td>
								<td>128 bits</td>
								<td>crypto.randomBytes(16)</td>
								<td><code>.toString('hex')</code> → 32 hex chars</td>
							</tr>
							<tr>
								<td>Password reset</td>
								<td>256 bits</td>
								<td>crypto.randomBytes(32)</td>
								<td><code>.toString('hex')</code> → 64 hex chars</td>
							</tr>
							<tr>
								<td>API keys</td>
								<td>256 bits</td>
								<td>crypto.randomBytes(32)</td>
								<td><code>.toString('base64url')</code> → 43 chars</td>
							</tr>
							<tr>
								<td>CSRF tokens</td>
								<td>128 bits</td>
								<td>crypto.randomBytes(16)</td>
								<td><code>.toString('hex')</code> → 32 hex chars</td>
							</tr>
							<tr>
								<td>Encryption IVs</td>
								<td>128 bits</td>
								<td>crypto.randomBytes(16)</td>
								<td>Match cipher block size (AES-128/256)</td>
							</tr>
							<tr>
								<td>UUIDs</td>
								<td>122 bits</td>
								<td>crypto.randomUUID()</td>
								<td>RFC 4122 v4 format</td>
							</tr>
						</tbody>
					</table>
				</div>
				<p class="table-note">
					Source: <a href="https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html">OWASP Session Management Cheat Sheet</a>,
					<a href="https://nodejs.org/api/crypto.html">Node.js Crypto Documentation</a>
				</p>
			</div>

			<!-- When Math.random() is OK -->
			<div class="fix-section">
				<h3>When Math.random() is acceptable</h3>
				<p>
					Math.random() is fine when security isn't a factor. Use it for:
				</p>
				<ul class="ok-uses-list">
					<li>Games and simulations (dice rolls, card shuffling in single-player games)</li>
					<li>UI animations (particle effects, confetti, random background colors)</li>
					<li>Generating demo or placeholder data for development</li>
					<li>Non-security shuffling or sampling (A/B test assignment if not privacy-sensitive)</li>
				</ul>
				<p>
					<strong>Never use Math.random() for:</strong> session tokens, password reset links, API keys, CSRF tokens, encryption keys or IVs, authentication codes, lottery or raffle selection (fraud risk), or anything an attacker could exploit.
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
				<a href="/kb/security/vulnerabilities/hardcoded-secrets/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Hardcoded Secrets</div>
					<p class="related-card-description">Another OWASP A02:2021 cryptographic failure that AI tools generate</p>
				</a>
				<a href="/kb/security/vulnerabilities/session-fixation/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Session Fixation</div>
					<p class="related-card-description">Session security vulnerability related to weak token handling</p>
				</a>
				<a href="/kb/security/vulnerabilities/missing-authentication/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Missing Authentication</div>
					<p class="related-card-description">When endpoints lack proper authentication checks</p>
				</a>
				<a href="/kb/vibe-coding-tools/cursor/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Cursor Security Patterns</div>
					<p class="related-card-description">Common security issues in Cursor-generated code</p>
				</a>
				<a href="/kb/vibe-coding-tools/bolt/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Bolt Security Issues</div>
					<p class="related-card-description">Why Bolt ships with predictable tokens by default</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Find weak random before it becomes a breach</h2>
			<p>Security audits flag this constantly. Catch it before production.</p>
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

	/* OK Uses List */
	.ok-uses-list {
		padding-left: 1.5rem;
		margin: 1rem 0;
	}

	.ok-uses-list li {
		color: var(--text-secondary);
		line-height: 1.6;
		margin-bottom: 0.5rem;
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

	/* Table Note */
	.table-note {
		font-size: 0.75rem;
		color: var(--text-tertiary);
		margin-top: 0.5rem;
	}

	.table-note a {
		color: var(--text-secondary);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.badge-row {
			gap: 0.375rem;
		}
	}
</style>
