<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Hardcoded Crypto Keys: Find & Fix AI Example Keys | VibeShip',
		description: 'Hardcoded crypto keys let attackers forge JWTs and decrypt data. Common in AI-generated code. Get detection patterns and fixes for Cursor, Bolt & Claude Code.',
		url: '/kb/security/vulnerabilities/hardcoded-crypto-keys/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Hardcoded Crypto Keys' }
	];

	// Real external data sources
	const securityData = {
		cweId: 'CWE-321',
		cweSource: 'https://cwe.mitre.org/data/definitions/321.html',
		owaspCategory: 'A02:2021',
		owaspSource: 'https://owasp.org/Top10/A02_2021-Cryptographic_Failures/'
	};

	// FAQ data for schema
	const faqs = [
		{
			question: 'What is a hardcoded encryption key?',
			answer: 'A cryptographic key embedded directly in source code instead of stored securely in environment variables or a secrets manager. If your source code contains JWT_SECRET = "secret" or const ENCRYPTION_KEY = "your-256-bit-secret", that\'s hardcoded. When code leaks (public GitHub repos, exposed .git folders, decompiled apps), attackers have your keys immediately.'
		},
		{
			question: 'Why is hardcoding JWT secrets dangerous?',
			answer: 'JWT secrets are how your app verifies authentication tokens. If an attacker discovers your hardcoded JWT secret through leaked source code or reverse engineering, they can forge valid authentication tokens and impersonate any user. According to Semgrep\'s JWT analysis, this is the "most basic mistake" that allows attackers to forge tokens if source code is exposed.'
		},
		{
			question: 'How do I detect hardcoded keys in my code?',
			answer: 'Use secret scanning tools like GitLeaks, TruffleHog, or Opengrep. Search for patterns like JWT_SECRET = "...", ENCRYPTION_KEY = "...", or static initialization vectors. VibeShip Scanner auto-detects these patterns across your entire codebase in seconds. Manual detection: grep for "SECRET.*=" or "KEY.*=" in your codebase and check if values are hardcoded strings instead of environment variables.'
		},
		{
			question: 'What\'s the difference between hardcoded secrets and hardcoded crypto keys?',
			answer: 'Hardcoded secrets are third-party credentials like API keys for Stripe, OpenAI, or database passwords. Hardcoded crypto keys are keys YOUR app uses for encryption, signing, or authentication—JWT secrets for tokens, AES keys for data encryption, HMAC keys for API signing. Both are critical, but crypto keys control your app\'s core security. If a JWT secret leaks, every user account is compromised. If an AES key leaks, all encrypted data can be decrypted.'
		},
		{
			question: 'Should initialization vectors be hardcoded?',
			answer: 'No. IVs must be unique for each encryption operation. Reusing an IV with the same key allows attackers to perform pattern analysis and potentially recover plaintext. According to SecureFlag\'s vulnerability research, IV reuse in CTR mode is catastrophic—full plaintext recovery is possible. Even in CBC mode, reused IVs leak patterns that weaken encryption. Generate a new random IV for each encryption, then prepend it to the ciphertext (IVs don\'t need to be secret).'
		},
		{
			question: 'Can environment variables be compromised?',
			answer: 'Yes. Environment variables are better than hardcoding but not foolproof. Server logs can expose them. Container orchestration tools display them. Process listings reveal them. For sensitive production apps, use a dedicated secrets manager like AWS Secrets Manager, HashiCorp Vault, or Google Secret Manager. These tools provide rotation, audit logs, and access control that environment variables can\'t.'
		},
		{
			question: 'How do I store JWT secrets securely?',
			answer: 'Minimum: use environment variables with strong random values (not "secret" or "your-jwt-secret-here"). Better: use a secrets manager that handles rotation and access control. Best: use Hardware Security Modules (HSMs) for high-security applications. Always rotate keys regularly. According to the Wallarm ThreatStats Report Q1 2025, hardcoded secrets contributed to the majority of API security breaches in AI and healthcare sectors—don\'t be part of that statistic.'
		},
		{
			question: 'What happens if my hardcoded JWT secret leaks?',
			answer: 'An attacker can forge JWTs for any user, bypass authentication entirely, and access all protected resources. They can impersonate admins, access sensitive data, modify records. You must rotate the secret immediately and invalidate all existing tokens (forcing all users to re-authenticate). CVE-2023-27172 shows how a hardcoded JWT secret was cracked in 160ms using a dictionary attack. The breach window is measured in minutes, not hours.'
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
			{"@type": "ListItem", "position": 4, "name": "Hardcoded Crypto Keys"}
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
				<span class="badge badge-critical">Critical</span>
				<span class="badge">CWE-321</span>
				<span class="badge">OWASP A02:2021</span>
			</div>
			<h1>Hardcoded Crypto Keys: When AI Example Code Goes Production</h1>
			<p class="text-secondary">The placeholder keys in vibe coded apps that let attackers forge JWTs and decrypt everything</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Hardcoded cryptographic keys are encryption keys, JWT secrets, or signing keys embedded directly in source code instead of stored securely.</strong>
				When vibe coders copy AI-generated examples with placeholder keys like <code>JWT_SECRET = "secret"</code>, those keys ship to production unchanged.
				If source code leaks—and it does, constantly—attackers can forge authentication tokens, decrypt sensitive data, and bypass every security control that relied on those keys.
				According to <a href="https://owasp.org/Top10/A02_2021-Cryptographic_Failures/">OWASP Top 10 (2021)</a>, cryptographic failures rank #2, with hardcoded keys specifically called out as a common weakness.
			</p>
		</div>

		<!-- Stats Box - Real Data -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">#2</div>
				<div class="stat-label">OWASP Ranking</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">{securityData.cweId}</div>
				<div class="stat-label"><a href={securityData.cweSource}>CWE ID</a></div>
			</div>
			<div class="stat-box">
				<div class="stat-value">160ms</div>
				<div class="stat-label">CVE-2023-27172 Crack Time</div>
			</div>
			<div class="stat-box">
				<div class="stat-value critical">Critical</div>
				<div class="stat-label">Severity</div>
			</div>
		</div>
		<p class="data-source">
			Sources: <a href={securityData.owaspSource}>OWASP A02:2021</a>, <a href="https://balwurk.com/cve-2023-27172-weak-jwt-secret/">CVE-2023-27172 Analysis</a>
		</p>

		<!-- What Is It -->
		<section class="article-section">
			<h2>What are hardcoded cryptographic keys?</h2>
			<p>
				Hardcoded cryptographic keys are the secrets your app uses to protect data and verify identity, written directly into source code.
				Not third-party API keys. YOUR keys. The JWT secret that verifies user tokens. The AES key that encrypts customer data. The HMAC key that signs API requests.
			</p>
			<p>
				Think of it like writing your hotel's master key code on the front desk—in permanent marker, visible to anyone who walks by.
				Except worse, because source code doesn't just sit there. It gets committed to Git. Pushed to GitHub (sometimes public by accident). Bundled into apps that get decompiled. Leaked in data breaches.
			</p>
			<p>
				This is different from <a href="/kb/security/vulnerabilities/hardcoded-secrets/">hardcoded API secrets</a>.
				API keys authenticate to external services (Stripe, OpenAI, databases). Crypto keys control your app's own security mechanisms.
				If a Stripe key leaks, you rotate it and move on. If a JWT secret leaks, every user account is compromised. If an AES encryption key leaks, all encrypted data can be decrypted—past, present, and future unless you re-encrypt everything with a new key.
			</p>
		</section>

		<!-- How AI Tools Cause This -->
		<section class="article-section">
			<h2>How AI tools cause hardcoded crypto key vulnerabilities</h2>
			<p>
				Every AI coding tool generates placeholder keys because the training data is full of tutorial code that prioritizes "working immediately" over "secure in production."
				Ask Cursor, Bolt, or Claude Code for JWT authentication, and you'll get working code with <code>JWT_SECRET = "secret"</code>.
				Ask for encryption, you'll get <code>const ENCRYPTION_KEY = "your-256-bit-secret"</code>.
			</p>

			<div class="incident-box">
				<h3>The pattern that causes breaches</h3>
				<p>This is what AI tools generate when you ask for "JWT authentication setup":</p>

				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">JavaScript</span>
					</div>
					<pre><code>{`// Generated by Cursor, Bolt, Claude Code, Copilot—all of them
const jwt = require('jsonwebtoken');

const JWT_SECRET = "secret"; // ← Placeholder from example code

function generateToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}`}</code></pre>
				</div>

				<p class="incident-note">
					This code works perfectly in local development. Tests pass. Users can log in. The app ships.
					Six months later, someone finds your GitHub repo (it was set to public for a week during launch). Now they have your JWT secret.
					Now they can forge tokens for any user. Now you have a breach.
				</p>
			</div>

			<p>
				<strong>Why AI does this:</strong> Tutorial code and Stack Overflow answers use simple, hardcoded values to teach concepts clearly.
				<code>const SECRET = "secret"</code> is easier to understand than "pull from AWS Secrets Manager with IAM role authentication."
				AI tools are trained on these tutorials. When vibe coders ask for authentication code, the AI generates what it's seen most: working examples with placeholder keys.
			</p>

			<p>
				The AI doesn't know you're about to ship this to production. It doesn't know those placeholders need to be replaced.
				That's on you. And if you don't know to look for it, it doesn't happen.
			</p>
		</section>

		<!-- Types of Hardcoded Keys -->
		<section class="article-section">
			<h2>Types of hardcoded cryptographic keys</h2>
			<p>Not all hardcoded keys are the same. Each type has specific attack scenarios and consequences:</p>

			<div class="key-types-grid">
				<div class="key-type-card">
					<h3>JWT Secrets (HS256)</h3>
					<p>Used to sign authentication tokens. If leaked, attackers forge valid JWTs and impersonate any user without knowing passwords.</p>
					<div class="code-block">
						<pre><code>{`// Vulnerable
const JWT_SECRET = "secret";
jwt.sign({ userId: 1 }, JWT_SECRET);

// Common in: auth.js, middleware/auth.js`}</code></pre>
					</div>
				</div>

				<div class="key-type-card">
					<h3>AES Encryption Keys</h3>
					<p>Used to encrypt sensitive data. If leaked, all encrypted data (customer info, credit cards, health records) can be decrypted.</p>
					<div class="code-block">
						<pre><code>{`// Vulnerable
const KEY = "your-256-bit-secret-key-here!!";
crypto.createCipheriv('aes-256-cbc', KEY, iv);

// Common in: utils/encryption.js, lib/crypto.js`}</code></pre>
					</div>
				</div>

				<div class="key-type-card">
					<h3>Initialization Vector (IV) Reuse</h3>
					<p>IVs must be unique per encryption. Static IVs allow pattern analysis. In CTR mode, full plaintext recovery is possible.</p>
					<div class="code-block">
						<pre><code>{`// Vulnerable
const IV = Buffer.from('0000000000000000');
// Reused for every encryption operation

// Common in: Same files as AES keys`}</code></pre>
					</div>
				</div>

				<div class="key-type-card">
					<h3>API Signing Keys (HMAC)</h3>
					<p>Used to verify API requests haven't been tampered with. If leaked, attackers forge valid request signatures and bypass API security.</p>
					<div class="code-block">
						<pre><code>{`// Vulnerable
const SIGNING_KEY = "my-api-signing-secret";
crypto.createHmac('sha256', SIGNING_KEY);

// Common in: api/middleware.js, lib/signing.js`}</code></pre>
					</div>
				</div>
			</div>
		</section>

		<!-- What Could Happen -->
		<section class="article-section">
			<h2>What could happen if I have hardcoded crypto keys</h2>
			<p>
				These aren't theoretical. Every scenario below has happened to real companies, some within the last 12 months:
			</p>
			<ul class="consequences-list">
				<li><strong>Account takeover via forged JWTs:</strong> Attacker finds your hardcoded JWT secret in leaked source code. They generate valid tokens for any user ID—including admin accounts. Full access without knowing a single password. CVE-2025-20188 (Cisco IOS XE) allowed root access through a hardcoded JWT secret.</li>
				<li><strong>Mass data decryption:</strong> Customer data encrypted with AES-256. Sounds secure. Until someone finds <code>const ENCRYPTION_KEY = "..."</code> in your GitHub history. Now every encrypted record—past and present—can be decrypted. Yealink (2024-2025) leaked their AES key and RSA private key on GitHub. All encrypted device data was compromised.</li>
				<li><strong>Pattern analysis from IV reuse:</strong> Reusing initialization vectors with the same key leaks patterns. Attackers analyze encrypted traffic, identify repeated patterns, recover plaintext. In CTR mode, IV reuse allows XOR-based plaintext recovery. According to SecureFlag research, this is "one of the most critical cryptographic failures."</li>
				<li><strong>API request forgery:</strong> Hardcoded HMAC signing keys mean attackers can craft valid signatures for malicious API requests. They bypass rate limiting, authentication checks, and request validation. Mercedes-Benz (January 2024) exposed authentication tokens in a public GitHub repo—full API access.</li>
				<li><strong>No key rotation possible:</strong> Hardcoded keys can't be rotated without redeploying code. That means if you suspect a compromise, you're looking at emergency deploys to production during incident response. Environment variables and secrets managers allow instant rotation with zero code changes.</li>
			</ul>
			<p>
				According to the <a href="https://securityboulevard.com/2025/05/the-ongoing-risks-of-hardcoded-jwt-keys/">Wallarm ThreatStats Report Q1 2025</a>, hardcoded secrets contributed to the majority of API security breaches in AI and healthcare sectors.
				Not "some breaches." The majority. This is the #1 operational mistake leading to real incidents.
			</p>
		</section>

		<!-- How to Detect -->
		<section class="article-section">
			<h2>How to detect hardcoded crypto keys</h2>
			<p>
				After a breach, forensics teams grep the codebase for these exact patterns. You can do this before the breach.
				Search for variable names containing "SECRET", "KEY", "TOKEN", or "IV" that are assigned string literals instead of pulled from environment variables.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Patterns to search for</span>
				</div>
				<pre><code>{`// JWT secrets (DANGEROUS)
JWT_SECRET = "secret"
const jwtSecret = 'your-secret-key'
secretOrPrivateKey: 'shhhhh'

// Encryption keys (DANGEROUS)
ENCRYPTION_KEY = "your-256-bit-secret"
const aesKey = Buffer.from('mySecretKey12345')
crypto.createCipher('aes192', 'password')

// Static IVs (DANGEROUS)
const IV = Buffer.from('0000000000000000')
iv = b'0000000000000000'

// Signing keys (DANGEROUS)
SIGNING_KEY = "my-api-signing-secret"
const hmacSecret = 'hardcoded-signing-key'

// Regex patterns for automated detection:
// (?i)(jwt_secret|encryption_key|signing_key)\\s*=\\s*['"][^'"]+['"]
// (?i)iv\\s*=\\s*(Buffer\\.from\\(['"]0+['"]\\)|b['"]\\\\x00+['"])
`}</code></pre>
			</div>

			<p>
				<strong>Secret scanning tools:</strong> GitLeaks, TruffleHog, and Opengrep can detect these patterns automatically.
				GitLeaks has specific rules for JWT secrets and encryption keys. TruffleHog scans Git history (important—deleted keys are still in commit history).
				Opengrep rules can catch framework-specific patterns like <code>jwt.sign(..., "string", ...)</code>.
			</p>

			<div class="cta-box">
				<p><strong>Don't want to configure scanning tools manually?</strong></p>
				<a href="https://scanner.vibeship.co" class="btn btn-green">
					Scan your code free
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M5 12h14M12 5l7 7-7 7"/>
					</svg>
				</a>
				<p class="cta-note">VibeShip Scanner uses GitLeaks, TruffleHog, and Opengrep to detect hardcoded keys across your entire codebase in seconds.</p>
			</div>
		</section>

		<!-- How to Fix -->
		<section class="article-section">
			<h2>How to fix hardcoded crypto keys</h2>
			<p>
				The fix is mechanical once you know what to look for: move every hardcoded key to environment variables (minimum) or a secrets manager (production standard).
				Generate strong random keys. Never commit keys to Git. Here's how to do it systematically across your vibe coded codebase.
			</p>

			<!-- AI Fix Prompt -->
			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>Copy this prompt into Cursor, Claude Code, or Bolt. It covers JWT secrets, AES keys, IV generation, and signing keys:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">AI Fix Prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Fix all hardcoded cryptographic key vulnerabilities in my codebase.

## What to look for

Search for these dangerous patterns:

1. Hardcoded JWT secrets:
   - JWT_SECRET = "secret"
   - const jwtSecret = 'your-secret-key'
   - jwt.sign(..., "string-literal", ...)

2. Hardcoded encryption keys:
   - ENCRYPTION_KEY = "your-256-bit-secret"
   - const key = Buffer.from('hardcoded-key')
   - crypto.createCipher('aes192', 'password')

3. Static initialization vectors (IVs):
   - const IV = Buffer.from('0000000000000000')
   - iv = b'\\x00' * 16
   - Any IV declared once and reused

4. Hardcoded signing keys:
   - SIGNING_KEY = "my-api-signing-secret"
   - crypto.createHmac('sha256', 'hardcoded-secret')

## How to fix

### For JWT secrets:

\`\`\`javascript
// Before (vulnerable)
const JWT_SECRET = "secret";
const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });

// After (secure)
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable must be set');
}
const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
\`\`\`

### For AES encryption keys:

\`\`\`javascript
// Before (vulnerable)
const ENCRYPTION_KEY = "your-256-bit-secret-key-here!!";
const IV = Buffer.from('0000000000000000');
const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, IV);

// After (secure)
const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_KEY, 'base64');
const IV = crypto.randomBytes(16); // New IV for each encryption
const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, IV);
// Prepend IV to ciphertext: return IV.toString('hex') + ':' + encrypted
\`\`\`

### For API signing keys:

\`\`\`javascript
// Before (vulnerable)
const SIGNING_KEY = "my-api-signing-secret";
const signature = crypto.createHmac('sha256', SIGNING_KEY)
  .update(payload)
  .digest('hex');

// After (secure)
const SIGNING_KEY = process.env.API_SIGNING_KEY;
if (!SIGNING_KEY) {
  throw new Error('API_SIGNING_KEY environment variable must be set');
}
const signature = crypto.createHmac('sha256', SIGNING_KEY)
  .update(payload)
  .digest('hex');
\`\`\`

## Generate strong keys

Replace placeholder keys with cryptographically random values:

\`\`\`bash
# JWT secret (256 bits = 32 bytes)
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# AES-256 key (256 bits = 32 bytes)
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# HMAC signing key (256 bits recommended)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
\`\`\`

## Framework-specific fixes

- **Next.js:** Use process.env.JWT_SECRET. Never use NEXT_PUBLIC_ prefix for secrets (exposes to client).
- **Express:** Use dotenv package. Load secrets in app.js before routes.
- **Django:** Use django-environ. Never commit .env to Git.
- **Prisma:** Store database encryption keys in environment variables, not in schema.prisma.

## After fixing

1. Generate new strong random keys using the commands above
2. Add keys to .env file (add .env to .gitignore)
3. Deploy new environment variables to production (Vercel, Railway, AWS, etc.)
4. Search codebase for remaining hardcoded patterns
5. Scan Git history for previously committed keys (use git-secrets or BFG Repo-Cleaner to remove)
6. Consider rotating to a secrets manager (AWS Secrets Manager, HashiCorp Vault)

## Verification

After fixing, these should ALL fail (throw errors):
- Starting the app without environment variables set
- Running tests without .env.test file

List all files you modified with before/after snippets.`}</div>
				</div>
			</div>

			<!-- Manual Fix Examples -->
			<div class="fix-section">
				<h3>Manual Fix: Before/After Examples</h3>
				<p>If you want to understand what's happening (and you should), here are the exact changes for each key type:</p>

				<h4>Example 1: JWT Secret (HS256)</h4>
				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-label">Vulnerable</div>
						<pre><code>{`// ❌ Hardcoded JWT secret
const jwt = require('jsonwebtoken');

const JWT_SECRET = "secret"; // Placeholder from AI

function generateToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: '1h'
  });
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-label">Secure</div>
						<pre><code>{`// ✅ JWT secret from environment
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET must be set');
}

function generateToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: '1h'
  });
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}`}</code></pre>
					</div>
				</div>

				<h4>Example 2: AES Encryption Key + IV Reuse</h4>
				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-label">Vulnerable</div>
						<pre><code>{`// ❌ Hardcoded key + static IV
const crypto = require('crypto');

const KEY = "your-256-bit-secret-key-here!!";
const IV = Buffer.from('0000000000000000');

function encrypt(text) {
  const cipher = crypto.createCipheriv(
    'aes-256-cbc', KEY, IV
  );
  return cipher.update(text, 'utf8', 'hex')
    + cipher.final('hex');
}

// IV reused for every encryption
// Pattern analysis possible`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-label">Secure</div>
						<pre><code>{`// ✅ Key from env + unique IV per encryption
const crypto = require('crypto');

const KEY = Buffer.from(
  process.env.ENCRYPTION_KEY, 'base64'
);

function encrypt(text) {
  const iv = crypto.randomBytes(16); // New IV
  const cipher = crypto.createCipheriv(
    'aes-256-cbc', KEY, iv
  );
  const encrypted = cipher.update(text, 'utf8', 'hex')
    + cipher.final('hex');

  // Return IV + ciphertext (IV doesn't need secrecy)
  return iv.toString('hex') + ':' + encrypted;
}`}</code></pre>
					</div>
				</div>

				<h4>Example 3: API Signing Key (HMAC)</h4>
				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-label">Vulnerable</div>
						<pre><code>{`// ❌ Hardcoded signing key
const crypto = require('crypto');

const SIGNING_KEY = "my-api-signing-secret";

function signRequest(payload) {
  const hmac = crypto.createHmac(
    'sha256', SIGNING_KEY
  );
  hmac.update(JSON.stringify(payload));
  return hmac.digest('hex');
}

// If key leaks, attackers forge signatures`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-label">Secure</div>
						<pre><code>{`// ✅ Signing key from environment
const crypto = require('crypto');

async function getSigningKey() {
  const key = process.env.API_SIGNING_KEY;
  if (!key) {
    throw new Error('API_SIGNING_KEY must be set');
  }
  return key;
}

async function signRequest(payload) {
  const signingKey = await getSigningKey();
  const hmac = crypto.createHmac('sha256', signingKey);
  hmac.update(JSON.stringify(payload));
  return hmac.digest('hex');
}`}</code></pre>
					</div>
				</div>
			</div>

			<!-- Secrets Manager Upgrade -->
			<div class="fix-section">
				<h3>Production upgrade: Secrets Manager</h3>
				<p>
					Environment variables are better than hardcoding, but they're not the end goal.
					For production apps handling sensitive data, use a dedicated secrets manager.
					They provide rotation, audit logs, access control, and automatic key distribution that environment variables can't match.
				</p>

				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">JavaScript - AWS Secrets Manager</span>
					</div>
					<pre><code>{`// Production-grade key management
const { SecretsManagerClient, GetSecretValueCommand } =
  require('@aws-sdk/client-secrets-manager');

const client = new SecretsManagerClient({ region: 'us-east-1' });

async function getEncryptionKey() {
  const response = await client.send(
    new GetSecretValueCommand({
      SecretId: 'myapp/encryption-key'
    })
  );
  return Buffer.from(response.SecretString, 'base64');
}

async function encrypt(text) {
  const key = await getEncryptionKey();
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  const encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

// Benefits: Key rotation without code changes, audit logs, IAM access control`}</code></pre>
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
				<a href="/kb/security/vulnerabilities/hardcoded-secrets/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Hardcoded Secrets (API Keys)</div>
					<p class="related-card-description">How hardcoded crypto keys differ from API secrets and why both matter</p>
				</a>
				<a href="/kb/security/vulnerabilities/jwt-vulnerabilities/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">JWT Vulnerabilities</div>
					<p class="related-card-description">Algorithm confusion, weak secrets, and missing validation in JWTs</p>
				</a>
				<a href="/kb/security/vulnerabilities/sensitive-data-exposure/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Sensitive Data Exposure</div>
					<p class="related-card-description">What happens when encryption fails or keys leak</p>
				</a>
				<a href="/kb/vibe-coding-tools/cursor/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Cursor Security Patterns</div>
					<p class="related-card-description">Common vulnerabilities in Cursor-generated code</p>
				</a>
				<a href="/kb/vibe-coding-tools/bolt/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Bolt Security Analysis</div>
					<p class="related-card-description">Why Bolt projects often ship with example keys</p>
				</a>
				<a href="/kb/security/stacks/nextjs-supabase/" class="card card-interactive related-card">
					<div class="related-card-category">Stack Guide</div>
					<div class="related-card-title">Next.js + Supabase Security</div>
					<p class="related-card-description">Complete security checklist including key management</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Find hardcoded keys before attackers do</h2>
			<p>GitLeaks, TruffleHog, and Opengrep in one scan. Catch JWT secrets, encryption keys, and static IVs across your entire codebase.</p>
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

	/* Incident Box (like tool-patterns-box in SQL injection) */
	.incident-box {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-left: 3px solid var(--red);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.incident-box h3 {
		margin: 0 0 0.75rem;
		font-size: 1rem;
		color: var(--text-primary);
	}

	.incident-box > p {
		margin: 0 0 1rem;
		color: var(--text-secondary);
	}

	.incident-note {
		margin: 1rem 0 0 !important;
		font-size: 0.875rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	/* Key Types Grid */
	.key-types-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.key-type-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.25rem;
	}

	.key-type-card h3 {
		margin: 0 0 0.5rem;
		font-size: 1rem;
		color: var(--text-primary);
	}

	.key-type-card > p {
		margin: 0 0 1rem;
		font-size: 0.875rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.key-type-card .code-block {
		margin-bottom: 0;
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
		border: 1px solid var(--green-dim);
		padding: 1.5rem;
		text-align: center;
		margin: 2rem 0;
	}

	.cta-box p {
		margin: 0 0 1rem;
		color: var(--text-primary);
	}

	.cta-note {
		margin-top: 0.75rem !important;
		font-size: 0.8125rem;
		color: var(--text-secondary);
	}

	/* Fix Sections */
	.fix-section {
		margin: 2rem 0;
	}

	.fix-section h3 {
		margin-bottom: 0.75rem;
	}

	.fix-section h4 {
		margin-top: 1.5rem;
		margin-bottom: 0.75rem;
		font-size: 1.125rem;
	}

	/* Code Comparison - Stacked (NEVER side-by-side) */
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

	/* Responsive: Key types grid to single column on mobile */
	@media (max-width: 768px) {
		.key-types-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
