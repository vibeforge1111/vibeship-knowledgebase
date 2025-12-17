<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: "JWT Security: 5 Flaws AI Tools Get Wrong",
		description: "JWT vulnerabilities like algorithm confusion and weak secrets let attackers forge tokens. AI tools often misconfigure JWT. Learn secure implementation patterns.",
		url: '/kb/security/vulnerabilities/jwt-vulnerabilities/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'JWT Vulnerabilities' }
	];

	// Real external data sources
	const owaspData = {
		ranking: '#2',
		category: 'A02:2021 - Cryptographic Failures',
		source: 'https://owasp.org/Top10/A02_2021-Cryptographic_Failures/',
		cweId: 'CWE-347',
		cweSource: 'https://cwe.mitre.org/data/definitions/347.html'
	};

	// FAQ data for schema
	const faqs = [
		{
			question: 'What are common JWT vulnerabilities?',
			answer: 'The most common JWT vulnerabilities are: algorithm confusion (changing RS256 to HS256), accepting the "none" algorithm, weak/guessable secrets, missing expiration claims, and insecure token storage. AI tools often generate code with weak secrets and no algorithm specification, making tokens easy to forge.'
		},
		{
			question: 'How do I secure JWT tokens?',
			answer: 'Always specify the expected algorithm in verify() - never let the token dictate the algorithm. Use cryptographically random secrets at least 256 bits (32 bytes) long. Set reasonable expiration times with the "exp" claim. Store tokens in HttpOnly cookies, not localStorage. Verify issuer and audience claims.'
		},
		{
			question: 'What is JWT algorithm confusion attack?',
			answer: 'Algorithm confusion happens when you use RS256 (asymmetric) but your code accepts HS256 (symmetric). Attackers change the token\'s algorithm to HS256 and sign with your public key. Since the server uses the same public key to verify and HS256 uses symmetric signing, the forged token validates successfully.'
		},
		{
			question: 'Should I use JWT for authentication?',
			answer: 'JWTs are fine for authentication when implemented correctly - the problem is most implementations are not correct. If you need simple session management, server-side sessions may be safer. If you need stateless auth across services, JWTs work well but require careful implementation of algorithm pinning, strong secrets, and proper expiration.'
		},
		{
			question: 'How long should JWT secrets be?',
			answer: 'JWT secrets should be at least 256 bits (32 bytes) of cryptographically random data. Short or predictable secrets can be brute-forced using tools like hashcat. Generate secrets using crypto.randomBytes(32).toString("base64") and store them securely in environment variables, never in code.'
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
			{"@type": "ListItem", "position": 4, "name": "JWT Vulnerabilities"}
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
		"datePublished": "2025-12-17",
		"dateModified": "2025-12-17"
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
				<span class="badge">CWE-347</span>
				<span class="badge">OWASP A02:2021</span>
			</div>
			<h1>JWT Vulnerabilities in Vibe Coded Apps</h1>
			<p class="text-secondary">How AI tools misconfigure JWT authentication, letting attackers forge tokens</p>
		</header>

		<!-- Quick Answer - MUST be under 50 words -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>JWT authentication is often misconfigured by AI tools - weak secrets, missing algorithm validation, and no expiration.</strong>
				These flaws let attackers forge tokens and impersonate any user. Always specify the algorithm explicitly and use strong, random secrets.
			</p>
		</div>

		<!-- Stats Box - Real OWASP Data -->
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
				<div class="stat-value">Crypto</div>
				<div class="stat-label">OWASP Category</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Critical</div>
				<div class="stat-label">Severity</div>
			</div>
		</div>
		<p class="data-source">
			Source: <a href={owaspData.source}>OWASP Top 10 (2021)</a> - JWT issues fall under Cryptographic Failures
		</p>

		<!-- What Is JWT -->
		<section class="article-section">
			<h2>What is JWT and why does it matter?</h2>
			<p>
				JWT (JSON Web Token) is a compact, URL-safe way to represent claims between two parties. It's widely used for authentication in APIs and single-page applications.
				A JWT has three parts separated by dots: header.payload.signature. The signature proves the token hasn't been tampered with.
			</p>
			<p>
				JWTs are ubiquitous in vibe coded applications. When you ask AI for "user authentication" or "API auth," you often get JWT implementation.
				The problem is AI tools generate the simplest working code - which is usually insecure.
			</p>
			<p>
				According to <a href="https://auth0.com/blog/critical-vulnerabilities-in-json-web-token-libraries/">Auth0's 2015 disclosure</a>, critical vulnerabilities in JWT libraries allowed attackers to forge tokens.
				These same patterns still appear in AI-generated code today. <a href="https://cwe.mitre.org/data/definitions/347.html">CWE-347</a> describes improper signature verification, which is exactly what happens when AI generates JWT code without algorithm specification.
			</p>
		</section>

		<!-- The 5 Vulnerabilities -->
		<section class="article-section">
			<h2>The 5 JWT flaws AI tools get wrong</h2>
			<p>
				These five vulnerabilities appear consistently in vibe coded JWT implementations:
			</p>

			<div class="vuln-list">
				<div class="vuln-item">
					<div class="vuln-number">1</div>
					<div class="vuln-content">
						<h4>Algorithm confusion</h4>
						<p>Using RS256 without specifying the algorithm in verify(), allowing attackers to switch to HS256 and sign with the public key.</p>
					</div>
				</div>
				<div class="vuln-item">
					<div class="vuln-number">2</div>
					<div class="vuln-content">
						<h4>None algorithm</h4>
						<p>Libraries that accept tokens with <code>alg: "none"</code>, requiring no signature at all.</p>
					</div>
				</div>
				<div class="vuln-item">
					<div class="vuln-number">3</div>
					<div class="vuln-content">
						<h4>Weak secrets</h4>
						<p>AI generates short or predictable secrets like <code>'secret'</code> or <code>'myapp-key'</code> that can be brute-forced.</p>
					</div>
				</div>
				<div class="vuln-item">
					<div class="vuln-number">4</div>
					<div class="vuln-content">
						<h4>Missing expiration</h4>
						<p>Tokens without <code>exp</code> claim work forever. Stolen tokens remain valid indefinitely.</p>
					</div>
				</div>
				<div class="vuln-item">
					<div class="vuln-number">5</div>
					<div class="vuln-content">
						<h4>Insecure storage</h4>
						<p>Storing JWTs in localStorage makes them vulnerable to <a href="/kb/security/vulnerabilities/xss/">XSS</a> attacks.</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Algorithm Confusion -->
		<section class="article-section">
			<h2>How does algorithm confusion work?</h2>
			<p>
				Algorithm confusion is the most dangerous JWT vulnerability. It exploits the difference between symmetric (HS256) and asymmetric (RS256) algorithms.
			</p>

			<div class="algo-comparison">
				<div class="algo-box">
					<h4>RS256 (Asymmetric)</h4>
					<ul>
						<li>Sign with <strong>private key</strong></li>
						<li>Verify with <strong>public key</strong></li>
						<li>Public key is... public</li>
					</ul>
				</div>
				<div class="algo-box">
					<h4>HS256 (Symmetric)</h4>
					<ul>
						<li>Sign with <strong>secret</strong></li>
						<li>Verify with <strong>same secret</strong></li>
						<li>Secret must stay private</li>
					</ul>
				</div>
			</div>

			<div class="attack-box">
				<h4>The attack</h4>
				<ol>
					<li>Server uses RS256, verifies with public key</li>
					<li>Attacker changes token header to <code>&#123;"alg": "HS256"&#125;</code></li>
					<li>Attacker signs token with the public key (which is public!)</li>
					<li>Server calls <code>jwt.verify(token, publicKey)</code></li>
					<li>Since algorithm isn't specified, library treats publicKey as HS256 secret</li>
					<li>Signature validates - attack succeeds!</li>
				</ol>
			</div>

			<p>
				According to <a href="https://portswigger.net/web-security/jwt/algorithm-confusion">PortSwigger</a>, this attack works because developers don't specify which algorithm to accept during verification. The library trusts whatever algorithm is in the token header.
			</p>
		</section>

		<!-- AI Tool Patterns -->
		<section class="article-section">
			<h2>Why do AI tools misconfigure JWT?</h2>
			<p>
				AI tools generate the simplest working JWT code. "Simple" and "working" don't mean "secure."
			</p>

			<div class="tool-patterns-box">
				<h3>Dangerous pattern: AI-generated JWT verification</h3>
				<p>When you ask AI for JWT authentication, it often generates this:</p>
				<div class="code-block">
					<pre><code>{`// VULNERABLE: AI generates this without algorithm specification
const jwt = require('jsonwebtoken')

app.get('/protected', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) // DANGEROUS!
    req.user = decoded
    // ... protected logic
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' })
  }
})

// Without specifying algorithms, attacker can use algorithm confusion!`}</code></pre>
				</div>
				<p class="pattern-note">
					The code works for legitimate tokens. But without <code>algorithms: ['HS256']</code>, it accepts any algorithm the attacker specifies.
				</p>
			</div>

			<div class="tool-patterns-box">
				<h3>Dangerous pattern: Weak secrets</h3>
				<div class="code-block">
					<pre><code>{`// VULNERABLE: Weak secrets AI tools generate
const JWT_SECRET = 'secret'              // Cracked in seconds
const JWT_SECRET = 'myapp-secret-key'    // Dictionary words
const JWT_SECRET = '12345678'            // Numeric, very weak
const JWT_SECRET = process.env.JWT_SECRET || 'fallback' // Fallback in prod!

// Attacker uses hashcat or jwt_tool to crack:
// hashcat -m 16500 jwt.txt wordlist.txt
// jwt_tool -C -d wordlist.txt jwt_token`}</code></pre>
				</div>
			</div>

			<p>
				Tools like <a href="/kb/vibe-coding-tools/cursor/">Cursor</a>, <a href="/kb/vibe-coding-tools/bolt/">Bolt</a>, and <a href="/kb/vibe-coding-tools/claude-code/">Claude Code</a> all generate these patterns because you didn't explicitly ask for secure JWT handling.
			</p>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How do I detect JWT vulnerabilities?</h2>
			<p>
				Search for JWT verification without algorithm specification and weak/hardcoded secrets.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Patterns to search for</span>
				</div>
				<pre><code>{`// jwt.verify() without algorithms option (DANGEROUS)
jwt.verify(token, secret)
jwt.verify(token, publicKey)

// jwt.sign() without expiresIn (DANGEROUS)
jwt.sign(payload, secret)
jwt.sign({ userId }, process.env.JWT_SECRET)

// Hardcoded or weak secrets (DANGEROUS)
const JWT_SECRET = 'secret'
const secret = 'my-jwt-secret'
JWT_SECRET || 'fallback'

// localStorage JWT storage (DANGEROUS)
localStorage.setItem('token', jwt)
localStorage.getItem('token')

// Regex to find vulnerable patterns:
// jwt\\.verify\\s*\\([^)]+\\)\\s*(?!.*algorithms)
// jwt\\.sign\\s*\\([^)]+\\)\\s*(?!.*expiresIn)`}</code></pre>
			</div>

			<div class="cta-box">
				<p><strong>Don't want to search manually?</strong></p>
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
			<h2>How do I fix JWT vulnerabilities?</h2>
			<p>
				Fix JWT vulnerabilities by always specifying the algorithm, using strong secrets, and setting proper expiration.
			</p>

			<!-- AI Fix Prompt -->
			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>Copy this prompt into Cursor, Claude Code, or Bolt to automatically fix JWT issues in your codebase:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Fix all JWT vulnerabilities in my codebase.

## What to look for

Search for these dangerous patterns:

1. jwt.verify() without algorithms option:
   - jwt.verify(token, secret)
   - jwt.verify(token, publicKey)
   - Any verify() call without { algorithms: [...] }

2. jwt.sign() without expiresIn:
   - jwt.sign(payload, secret)
   - Missing expiresIn or exp claim

3. Weak or hardcoded secrets:
   - JWT_SECRET = 'secret'
   - Short secrets (< 32 chars)
   - process.env.JWT_SECRET || 'fallback'

4. Insecure token storage:
   - localStorage.setItem('token', ...)
   - sessionStorage (also XSS vulnerable)

## How to fix

### Fix 1: Always specify algorithm
\`\`\`javascript
// Before (vulnerable)
const decoded = jwt.verify(token, JWT_SECRET)

// After (secure)
const decoded = jwt.verify(token, JWT_SECRET, {
  algorithms: ['HS256'], // ONLY accept HS256
  issuer: 'myapp',
  audience: 'myapp-users',
})

// For RS256:
const decoded = jwt.verify(token, publicKey, {
  algorithms: ['RS256'], // ONLY accept RS256
})
\`\`\`

### Fix 2: Use strong secrets
\`\`\`javascript
// Generate a secure secret (run once, save to .env)
const crypto = require('crypto')
const secret = crypto.randomBytes(32).toString('base64')
console.log(\`JWT_SECRET=\${secret}\`) // Add to .env

// In your app
const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET || JWT_SECRET.length < 32) {
  throw new Error('JWT_SECRET must be at least 32 characters')
}
\`\`\`

### Fix 3: Always set expiration
\`\`\`javascript
// Before (vulnerable - never expires)
const token = jwt.sign({ userId: user.id }, JWT_SECRET)

// After (secure - expires in 1 hour)
const token = jwt.sign(
  {
    sub: user.id,
    email: user.email,
    role: user.role,
  },
  JWT_SECRET,
  {
    algorithm: 'HS256',
    expiresIn: '1h',     // Short-lived
    issuer: 'myapp',
    audience: 'myapp-api',
    jwtid: crypto.randomUUID(), // For revocation
  }
)
\`\`\`

### Fix 4: Secure token storage (frontend)
\`\`\`javascript
// Before (vulnerable to XSS)
localStorage.setItem('token', jwtToken)

// After (HttpOnly cookie - not accessible to JS)
// Server-side:
res.cookie('token', jwtToken, {
  httpOnly: true,    // JavaScript can't access
  secure: true,      // HTTPS only
  sameSite: 'strict', // CSRF protection
  maxAge: 3600000,   // 1 hour
})

// Client-side:
fetch('/api/protected', {
  credentials: 'include', // Send cookies
})
\`\`\`

## Complete secure JWT implementation
\`\`\`javascript
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const JWT_SECRET = process.env.JWT_SECRET
const JWT_OPTIONS = {
  algorithm: 'HS256',
  expiresIn: '1h',
  issuer: 'myapp',
  audience: 'myapp-api',
}
const VERIFY_OPTIONS = {
  algorithms: ['HS256'],
  issuer: 'myapp',
  audience: 'myapp-api',
}

function generateToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    {
      ...JWT_OPTIONS,
      jwtid: crypto.randomUUID(),
    }
  )
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET, VERIFY_OPTIONS)
}
\`\`\`

## After fixing

1. Search for remaining jwt.verify/jwt.sign calls
2. Verify all have algorithms specified
3. Check all secrets are strong (32+ chars)
4. Verify all tokens have expiresIn
5. Move any localStorage tokens to HttpOnly cookies
6. List all files you modified with before/after snippets

Please proceed systematically through my codebase.`}</div>
				</div>
			</div>

			<!-- Manual Fix -->
			<div class="fix-section">
				<h3>Manual Fix</h3>
				<p>The fix is: <strong>always specify algorithms, use strong secrets, and set expiration</strong>.</p>

				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-block-header">
							<span class="code-block-lang status-bad">VULNERABLE</span>
						</div>
						<pre><code>{`// No algorithm, weak secret, no expiration
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'secret'

const token = jwt.sign({ userId: user.id }, JWT_SECRET)

const decoded = jwt.verify(token, JWT_SECRET)

// Attacker can:
// 1. Brute-force 'secret' in seconds
// 2. Use algorithm confusion if RS256
// 3. Use stolen token forever`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-block-header">
							<span class="code-block-lang status-good">SECURE</span>
						</div>
						<pre><code>{`// Algorithm specified, strong secret, expiration set
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET // 32+ byte random

const token = jwt.sign(
  { sub: user.id, email: user.email },
  JWT_SECRET,
  {
    algorithm: 'HS256',
    expiresIn: '1h',
    issuer: 'myapp',
  }
)

const decoded = jwt.verify(token, JWT_SECRET, {
  algorithms: ['HS256'], // Only accept HS256
  issuer: 'myapp',
})

// Now attacker cannot:
// 1. Brute-force strong secret
// 2. Use algorithm confusion (pinned to HS256)
// 3. Use expired tokens`}</code></pre>
					</div>
				</div>
			</div>

			<!-- Generate Secret -->
			<div class="fix-section">
				<h3>Generate a secure secret</h3>
				<p>Run this once to generate a proper JWT secret:</p>
				<div class="code-block secure">
					<div class="code-block-header">
						<span class="code-block-lang">Terminal</span>
					</div>
					<pre><code>{`# Node.js
node -e "console.log('JWT_SECRET=' + require('crypto').randomBytes(32).toString('base64'))"

# OpenSSL
openssl rand -base64 32

# Output example:
# JWT_SECRET=K8Hy5+9cLj3xR2mN0pQwVbGfTdZaYuXkIo1hEs7C4nM=

# Add to your .env file and NEVER commit it`}</code></pre>
				</div>
			</div>

			<!-- Framework-Specific -->
			<div class="fix-section">
				<h3>Related security topics</h3>
				<div class="framework-links">
					<a href="/kb/security/vulnerabilities/hardcoded-secrets/" class="card card-interactive">
						<span class="framework-name">Hardcoded Secrets</span>
						<span class="framework-desc">Where JWT secrets get exposed</span>
					</a>
					<a href="/kb/security/vulnerabilities/xss/" class="card card-interactive">
						<span class="framework-name">XSS</span>
						<span class="framework-desc">How attackers steal localStorage tokens</span>
					</a>
					<a href="/kb/security/vulnerabilities/missing-auth/" class="card card-interactive">
						<span class="framework-name">Missing Auth</span>
						<span class="framework-desc">JWT isn't the only auth issue</span>
					</a>
					<a href="/kb/security/stacks/nextjs-supabase/" class="card card-interactive">
						<span class="framework-name">Next.js + Supabase</span>
						<span class="framework-desc">Auth patterns for this stack</span>
					</a>
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
					<div class="related-card-title">Hardcoded Secrets</div>
					<p class="related-card-description">JWT secrets shouldn't be in code</p>
				</a>
				<a href="/kb/security/vulnerabilities/xss/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">XSS</div>
					<p class="related-card-description">Steals tokens from localStorage</p>
				</a>
				<a href="/kb/vibe-coding-tools/cursor/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Cursor Security Patterns</div>
					<p class="related-card-description">Common vulnerabilities in Cursor-generated code</p>
				</a>
			</div>
		</section>

		<!-- External Resources -->
		<section class="article-section">
			<h2>External resources</h2>
			<ul class="resources-list">
				<li><a href="https://portswigger.net/web-security/jwt">PortSwigger JWT Attacks</a> - Comprehensive JWT security guide</li>
				<li><a href="https://auth0.com/blog/critical-vulnerabilities-in-json-web-token-libraries/">Auth0 JWT Vulnerabilities</a> - Original library vulnerability disclosure</li>
				<li><a href="https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html">OWASP JWT Cheat Sheet</a> - Best practices guide</li>
				<li><a href="https://datatracker.ietf.org/doc/html/rfc7519">RFC 7519</a> - Official JWT specification</li>
				<li><a href="https://cwe.mitre.org/top25/archive/2024/2024_cwe_top25.html">CWE Top 25</a> - Most dangerous software weaknesses</li>
				<li><a href="https://jwt.io/">jwt.io</a> - JWT debugger tool</li>
			</ul>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Scan your code for JWT vulnerabilities</h2>
			<p>Check your codebase for JWT misconfigurations and other authentication vulnerabilities in AI-generated code.</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">
				Try Vibeship Scanner
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

	/* Badge Critical severity */
	.badge-critical {
		background: var(--red-dim, rgba(239, 68, 68, 0.15));
		color: var(--red, #ef4444);
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

	/* Vulnerability List */
	.vuln-list {
		display: grid;
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.vuln-item {
		display: flex;
		gap: 1rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1rem;
	}

	.vuln-number {
		flex-shrink: 0;
		width: 2rem;
		height: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--red-dim);
		color: var(--red);
		font-weight: 700;
		border-radius: 50%;
	}

	.vuln-content h4 {
		margin: 0 0 0.25rem;
		font-size: 0.9375rem;
		color: var(--text-primary);
	}

	.vuln-content p {
		margin: 0;
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	/* Algorithm Comparison */
	.algo-comparison {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.algo-box {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1rem;
	}

	.algo-box h4 {
		margin: 0 0 0.75rem;
		font-size: 0.9375rem;
		color: var(--text-primary);
	}

	.algo-box ul {
		margin: 0;
		padding-left: 1.25rem;
	}

	.algo-box li {
		margin: 0.25rem 0;
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	/* Attack Box */
	.attack-box {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-left: 3px solid var(--red);
		padding: 1.25rem;
		margin: 1.5rem 0;
	}

	.attack-box h4 {
		margin: 0 0 0.75rem;
		color: var(--red);
	}

	.attack-box ol {
		margin: 0;
		padding-left: 1.25rem;
	}

	.attack-box li {
		margin: 0.5rem 0;
		font-size: 0.875rem;
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

	/* Resources List */
	.resources-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.resources-list li {
		padding: 0.75rem 0;
		border-bottom: 1px solid var(--border);
	}

	.resources-list li:last-child {
		border-bottom: none;
	}

	.resources-list a {
		color: var(--green);
		font-weight: 500;
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
		letter-spacing: -0.01em;
	}

	.faq-item p {
		margin: 0;
		font-size: 0.9375rem;
		line-height: 1.7;
		color: var(--text-secondary);
	}

	@media (max-width: 768px) {
		.faq-item h3 {
			font-size: 1rem;
		}
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

	/* Responsive */
	@media (max-width: 768px) {
		.framework-links {
			grid-template-columns: 1fr;
		}

		.algo-comparison {
			grid-template-columns: 1fr;
		}
	}
</style>
