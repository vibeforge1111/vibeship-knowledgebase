<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Credential Stuffing: Why AI Login Code Gets Breached',
		description: 'Credential stuffing lets attackers test billions of leaked passwords on your login. Learn why rate limiting fails and how to layer real protection.',
		url: '/kb/security/vulnerabilities/credential-stuffing/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Credential Stuffing' }
	];

	// Security references
	const securityData = {
		cweId: 'CWE-307',
		cweSource: 'https://cwe.mitre.org/data/definitions/307.html',
		owaspCategory: 'A07:2021',
		owaspSource: 'https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/',
		severity: 'High'
	};

	// FAQ data for schema
	const faqs = [
		{
			question: 'What is the difference between credential stuffing and password spraying?',
			answer: 'Credential stuffing uses stolen username/password pairs from data breaches to test across many sites, exploiting password reuse. Password spraying tries common passwords (like "Password123") against many accounts on one site. According to OWASP, credential stuffing has ~1-2% success rate because attackers use real credentials; password spraying has ~1% success rate but targets more accounts. The key difference: credential stuffing knows your password from a breach, password spraying guesses.'
		},
		{
			question: 'How do you protect against credential stuffing attacks?',
			answer: 'Protection requires multiple layers according to OWASP Credential Stuffing Prevention Cheat Sheet: (1) Multi-factor authentication is most effective, (2) Check passwords against HaveIBeenPwned database to block breached passwords, (3) Rate limiting per-IP and per-account, (4) Device fingerprinting to detect bots, (5) Progressive CAPTCHA after failed attempts, (6) Anomaly detection for distributed attacks. Rate limiting alone fails because botnets use thousands of IPs.'
		},
		{
			question: 'Can rate limiting stop credential stuffing?',
			answer: 'No, rate limiting alone cannot stop sophisticated credential stuffing attacks. Modern attacks use distributed botnets with thousands of residential proxy IPs. Each IP stays under rate limits while collectively testing millions of credentials. According to OWASP, rate limiting is necessary but must be combined with anomaly detection (tracking attempts per-account across IPs), CAPTCHA, device fingerprinting, and multi-factor authentication for effective protection.'
		},
		{
			question: 'What is HaveIBeenPwned and how does it help prevent credential stuffing?',
			answer: 'HaveIBeenPwned (HIBP) is a free service by security researcher Troy Hunt containing over 12 billion breached account records. Its Pwned Passwords API lets you check if a password appears in known data breaches during registration. Using k-Anonymity model, you send only the first 5 characters of the password\'s SHA-1 hash, never exposing the actual password. This prevents users from choosing passwords already in attackers\' credential stuffing combo lists, eliminating the attack vector at signup.'
		},
		{
			question: 'How effective is CAPTCHA against credential stuffing?',
			answer: 'CAPTCHA is highly effective when implemented progressively according to OWASP. Trigger CAPTCHA after 2-3 failed login attempts rather than on every login to balance security and UX. reCAPTCHA v3 invisibly scores requests 0.0-1.0 (1.0 = likely human) without user interaction. Requiring scores >= 0.5 blocks most bots. However, CAPTCHA-solving services exist, so combine with rate limiting, anomaly detection, and multi-factor authentication for comprehensive protection.'
		}
	];

	let copiedPrompt = $state(false);
	let copiedCode = $state<Record<string, boolean>>({});

	function copyPrompt() {
		const prompt = document.getElementById('ai-fix-prompt')?.textContent || '';
		navigator.clipboard.writeText(prompt);
		copiedPrompt = true;
		setTimeout(() => copiedPrompt = false, 2000);
	}

	function copyCode(id: string) {
		const code = document.getElementById(id)?.textContent || '';
		navigator.clipboard.writeText(code);
		copiedCode[id] = true;
		setTimeout(() => copiedCode[id] = false, 2000);
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
			{"@type": "ListItem", "position": 4, "name": "Credential Stuffing"}
		]
	}
	</script>`}

	<!-- Article Schema -->
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
				<span class="badge">{securityData.cweId}</span>
				<span class="badge">OWASP {securityData.owaspCategory}</span>
			</div>
			<h1>Credential Stuffing: Why AI Login Code Gets Breached</h1>
			<p class="text-secondary">Rate limiting stops amateurs. Learn how to layer protections that actually work against distributed botnet attacks.</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Credential stuffing lets attackers test billions of leaked passwords from data breaches against your login system.</strong>
				They use botnets with thousands of IPs to bypass simple rate limits. According to <a href="https://cheatsheetseries.owasp.org/cheatsheets/Credential_Stuffing_Prevention_Cheat_Sheet.html">OWASP</a>, these attacks have a 1-2% success rate—meaning 1 million stolen credentials can compromise 10,000-20,000 accounts. AI tools generate vulnerable login code with zero protection layers.
			</p>
		</div>

		<!-- Stats Box -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">26B</div>
				<div class="stat-label">Monthly Attempts</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">1-2%</div>
				<div class="stat-label">Success Rate</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">12B+</div>
				<div class="stat-label">Breached Records</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">64%</div>
				<div class="stat-label">Reuse Passwords</div>
			</div>
		</div>
		<p class="data-source">
			Sources: <a href="https://cheatsheetseries.owasp.org/cheatsheets/Credential_Stuffing_Prevention_Cheat_Sheet.html">OWASP Credential Stuffing Prevention</a>, <a href="https://haveibeenpwned.com/Passwords">HaveIBeenPwned</a>
		</p>

		<!-- What Is It -->
		<section class="article-section">
			<h2>What is credential stuffing?</h2>
			<p>
				Credential stuffing is what happens when attackers take billions of username/password pairs from data breaches and test them across different websites. It exploits one simple truth: people reuse passwords. Your email and password leaked in the LinkedIn breach? Attackers test that exact combination on your bank, your startup's admin panel, every SaaS tool you've ever built.
			</p>
			<p>
				Think of it like having a master key from one building and trying it on every other lock in the city. Most won't work. But with a billion keys and automated testing, the 1-2% that do work is catastrophic.
			</p>
			<p>
				This vulnerability is classified as <a href={securityData.cweSource}>{securityData.cweId}: Improper Restriction of Excessive Authentication Attempts</a> and falls under <a href={securityData.owaspSource}>OWASP {securityData.owaspCategory} - Identification and Authentication Failures</a>. According to <a href="https://cheatsheetseries.owasp.org/cheatsheets/Credential_Stuffing_Prevention_Cheat_Sheet.html">OWASP's Credential Stuffing Prevention Cheat Sheet</a>, security firm Akamai reported approximately 26 billion credential stuffing attempts per month in 2024.
			</p>
		</section>

		<!-- Credential Stuffing vs Password Spraying -->
		<section class="article-section">
			<h2>Credential Stuffing vs Password Spraying</h2>
			<p>
				These attacks sound similar but use completely different strategies. Understanding the difference matters for detection and prevention.
			</p>

			<div class="table-wrapper">
				<table>
					<thead>
						<tr>
							<th>Aspect</th>
							<th>Credential Stuffing</th>
							<th>Password Spraying</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><strong>Attack Method</strong></td>
							<td>Test stolen username/password pairs from breaches</td>
							<td>Try common passwords against many accounts</td>
						</tr>
						<tr>
							<td><strong>Data Source</strong></td>
							<td>Real credentials from data breaches</td>
							<td>Common password lists (Password123, Welcome2024)</td>
						</tr>
						<tr>
							<td><strong>Success Rate</strong></td>
							<td>~1-2% (known credentials)</td>
							<td>~1% (guessing)</td>
						</tr>
						<tr>
							<td><strong>Attack Pattern</strong></td>
							<td>One user, many passwords from their breaches</td>
							<td>Many users, same common password</td>
						</tr>
						<tr>
							<td><strong>Detection Signature</strong></td>
							<td>Multiple IPs targeting same account</td>
							<td>Same IP trying many accounts with few passwords</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- The Scale of the Problem -->
		<section class="article-section">
			<h2>The scale of the credential stuffing problem</h2>
			<p>
				<a href="https://haveibeenpwned.com/Passwords">HaveIBeenPwned</a> contains over 12 billion breached account records as of 2025. These aren't theoretical. They're real username/password combinations available in underground markets for pennies. Combo lists—files containing millions of credentials—get traded constantly.
			</p>
			<p>
				Attackers use residential proxy networks (thousands of real home IPs) to distribute attacks. Each IP makes just 2-3 login attempts per hour, staying under basic rate limits. Meanwhile, the botnet collectively tests millions of credentials. Your server sees normal traffic patterns from legitimate-looking IPs. The attack is invisible until accounts start getting taken over.
			</p>
			<p>
				According to <a href="https://cheatsheetseries.owasp.org/cheatsheets/Credential_Stuffing_Prevention_Cheat_Sheet.html">OWASP</a>, 64% of people reuse passwords across accounts. This is why credential stuffing works. One breach cascades across the entire internet.
			</p>
			<div class="alert alert-warning">
				<div class="alert-title">Why Rate Limiting Alone Fails</div>
				<p>
					Basic rate limiting blocks 10 attempts from one IP. A botnet uses 10,000 IPs making 1 attempt each. Every IP stays under your rate limit. The attack succeeds anyway. This is why multi-layered defense is required.
				</p>
			</div>
		</section>

		<!-- AI Tool Patterns -->
		<section class="article-section">
			<h2>How AI tools generate vulnerable login code</h2>
			<p>
				Ask Cursor, Bolt, or Claude Code to build authentication. You'll get working login code with zero credential stuffing protection. The AI creates functional authentication—username field, password field, database check. Mission complete from the AI's perspective.
			</p>
			<p>
				What's missing? Detection. Blocking. Monitoring. Breach checking. Rate limiting by account. Anomaly detection. Progressive CAPTCHA. Everything that makes login actually secure against automated attacks.
			</p>

			<div class="code-block vulnerable">
				<div class="code-block-header">
					<span class="code-block-lang">Vulnerable Pattern - AI Generated</span>
					<button class="copy-btn" class:copied={copiedCode['vulnerable-login']} onclick={() => copyCode('vulnerable-login')}>
						{copiedCode['vulnerable-login'] ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="vulnerable-login">{`// VULNERABLE: AI generates working login, no credential stuffing protection
// app/api/auth/login/route.ts
import { NextResponse } from 'next/server'
import { verifyPassword } from '@/lib/auth'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  // Attackers can test billions of leaked credentials!
  const user = await verifyPassword(email, password)

  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  return NextResponse.json({ user })
}`}</code></pre>
			</div>

			<p class="pattern-note">
				<strong>What's wrong here:</strong> This code works perfectly. It also has zero protection against bots testing stolen credentials. No rate limiting, no breach checking, no anomaly detection, no CAPTCHA. An attacker with a combo list can test thousands of credentials per minute across a distributed botnet. The vibe coded app never notices.
			</p>

			<p>
				<strong>Why AI does this:</strong> The training data contains working authentication patterns. "It works" is the optimization target. Security layers aren't required for functionality, so they get skipped. The AI gives you what was most common in its training: vulnerable patterns that billions of real apps shipped.
			</p>
		</section>

		<!-- Multi-Layered Protection -->
		<section class="article-section">
			<h2>Multi-layered credential stuffing protection</h2>
			<p>
				Stopping credential stuffing requires stacking multiple defensive layers. Each layer catches what the previous one misses. Here's the architecture that actually works against distributed attacks.
			</p>

			<!-- Layer 1: Rate Limiting -->
			<div class="layer-section">
				<h3>Layer 1: Rate Limiting (Foundation)</h3>
				<p>
					Rate limiting is necessary but not sufficient. You need <strong>both per-IP and per-account</strong> limits. Per-IP stops single-source attacks. Per-account stops distributed botnet attacks targeting specific accounts.
				</p>

				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">TypeScript - Next.js Middleware</span>
						<button class="copy-btn" class:copied={copiedCode['rate-limit']} onclick={() => copyCode('rate-limit')}>
							{copiedCode['rate-limit'] ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre><code id="rate-limit">{`// middleware.ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '15 m'), // 5 attempts per 15 min
})

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/auth/login')) {
    const ip = request.ip ?? '127.0.0.1'
    const { success } = await ratelimit.limit(ip)

    if (!success) {
      return NextResponse.json(
        { error: 'Too many attempts' },
        { status: 429 }
      )
    }
  }

  return NextResponse.next()
}`}</code></pre>
				</div>
				<p class="implementation-note">
					<strong>Limitation:</strong> This stops single-IP attacks but fails against botnets using thousands of residential proxies. Each IP stays under the limit. You need additional layers.
				</p>
			</div>

			<!-- Layer 2: Anomaly Detection -->
			<div class="layer-section">
				<h3>Layer 2: Anomaly Detection (Account-Level)</h3>
				<p>
					Track failed attempts <strong>per account across all IPs</strong>. Botnet attacks show up as the same account being targeted from many different IPs. This signature is impossible for legitimate users but standard for credential stuffing.
				</p>

				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">TypeScript - Anomaly Detection</span>
						<button class="copy-btn" class:copied={copiedCode['anomaly-detection']} onclick={() => copyCode('anomaly-detection')}>
							{copiedCode['anomaly-detection'] ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre><code id="anomaly-detection">{`// app/api/auth/login/route.ts
import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

async function detectAnomalies(email: string, ip: string) {
  // Track failed attempts per account (across all IPs)
  const accountKey = \`account_failures:\${email}\`
  const accountFailures = (await redis.get<number>(accountKey)) ?? 0

  // Track unique IPs attempting this account
  const ipSetKey = \`account_ips:\${email}\`
  await redis.sadd(ipSetKey, ip)
  await redis.expire(ipSetKey, 3600) // 1 hour
  const uniqueIPs = await redis.scard(ipSetKey)

  // ANOMALY 1: 10+ failed attempts in 1 hour (botnet signature)
  if (accountFailures >= 10) {
    return {
      blocked: true,
      reason: 'Too many failed attempts on this account'
    }
  }

  // ANOMALY 2: 5+ different IPs attempting same account (distributed attack)
  if (uniqueIPs >= 5) {
    return {
      blocked: true,
      reason: 'Suspicious activity detected on this account'
    }
  }

  return { blocked: false }
}`}</code></pre>
				</div>
			</div>

			<!-- Layer 3: Progressive CAPTCHA -->
			<div class="layer-section">
				<h3>Layer 3: Progressive CAPTCHA</h3>
				<p>
					Don't annoy legitimate users with CAPTCHA on every login. Trigger it <strong>only after suspicious patterns</strong> are detected. Use reCAPTCHA v3 which scores requests invisibly (0.0-1.0, where 1.0 = likely human).
				</p>

				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">TypeScript - Progressive CAPTCHA</span>
						<button class="copy-btn" class:copied={copiedCode['captcha']} onclick={() => copyCode('captcha')}>
							{copiedCode['captcha'] ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre><code id="captcha">{`// app/api/auth/login/route.ts
export async function POST(request: Request) {
  const { email, password, captchaToken } = await request.json()
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown'

  // Track failed attempts per IP
  const failedKey = \`failed:\${ip}\`
  const failedCount = (await redis.get<number>(failedKey)) ?? 0

  // Require CAPTCHA after 3 failed attempts
  if (failedCount >= 3) {
    if (!captchaToken) {
      return NextResponse.json(
        { error: 'CAPTCHA required', requireCaptcha: true },
        { status: 400 }
      )
    }

    // Verify CAPTCHA with Google reCAPTCHA v3
    const captchaResponse = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: \`secret=\${process.env.RECAPTCHA_SECRET}&response=\${captchaToken}\`,
      }
    )
    const captchaData = await captchaResponse.json()

    // reCAPTCHA v3 returns score 0.0-1.0 (1.0 = likely human)
    if (!captchaData.success || captchaData.score < 0.5) {
      return NextResponse.json(
        { error: 'CAPTCHA verification failed' },
        { status: 400 }
      )
    }
  }

  const user = await verifyPassword(email, password)

  if (!user) {
    // Increment failed counter, expire after 1 hour
    await redis.set(failedKey, failedCount + 1, { ex: 3600 })
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  // Reset on success
  await redis.del(failedKey)
  return NextResponse.json({ user })
}`}</code></pre>
				</div>
			</div>

			<!-- Layer 4: Breached Password Checking -->
			<div class="layer-section">
				<h3>Layer 4: Breached Password Checking (HaveIBeenPwned)</h3>
				<p>
					The most effective layer: prevent users from choosing passwords that already exist in attackers' combo lists. Check every password during registration against the <a href="https://haveibeenpwned.com/Passwords">HaveIBeenPwned Pwned Passwords API</a>. Using k-Anonymity model, you send only the first 5 characters of the password's SHA-1 hash—never the actual password.
				</p>

				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">TypeScript - Breached Password Check</span>
						<button class="copy-btn" class:copied={copiedCode['hibp']} onclick={() => copyCode('hibp')}>
							{copiedCode['hibp'] ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre><code id="hibp">{`// lib/check-pwned-password.ts
import crypto from 'crypto'

export async function isPasswordPwned(password: string): Promise<boolean> {
  // 1. Hash password with SHA-1
  const hash = crypto.createHash('sha1').update(password).digest('hex').toUpperCase()

  // 2. Send only first 5 chars (k-Anonymity model)
  const prefix = hash.substring(0, 5)
  const suffix = hash.substring(5)

  // 3. Query HIBP API
  const response = await fetch(
    \`https://api.pwnedpasswords.com/range/\${prefix}\`
  )
  const text = await response.text()

  // 4. Check if our hash suffix appears in results
  const hashes = text.split('\\n')
  return hashes.some(line => line.startsWith(suffix))
}

// Usage in registration endpoint
export async function POST(request: Request) {
  const { email, password } = await request.json()

  // Check if password has been breached
  if (await isPasswordPwned(password)) {
    return NextResponse.json(
      {
        error: 'This password has appeared in a data breach. Please choose a different password.',
        code: 'PASSWORD_BREACHED'
      },
      { status: 400 }
    )
  }

  // Continue with registration...
}`}</code></pre>
				</div>
				<p class="implementation-note">
					<strong>Privacy guarantee:</strong> Only the first 5 characters of the hash are sent. The HaveIBeenPwned API returns all hashes matching that prefix. Your server compares locally. The actual password never leaves your system.
				</p>
			</div>
		</section>

		<!-- Detection Patterns -->
		<section class="article-section">
			<h2>Detection patterns to monitor</h2>
			<p>
				Even with protections in place, monitor for these credential stuffing signatures:
			</p>
			<ul class="detection-list">
				<li><strong>Multiple failed logins across different accounts from same IP:</strong> Single attacker testing many credentials</li>
				<li><strong>Same account targeted from many IPs:</strong> Distributed botnet signature—this is the big one</li>
				<li><strong>Login velocity anomalies:</strong> 100+ login attempts per second is not human behavior</li>
				<li><strong>Geographic impossibility:</strong> Account logs in from US then China within 5 minutes</li>
				<li><strong>User-agent patterns:</strong> Headless browsers, automation tools (Selenium, Puppeteer signatures)</li>
				<li><strong>Time-based patterns:</strong> Attacks often happen off-peak hours (2-6 AM local time)</li>
			</ul>
			<p>
				Set up alerts in your monitoring system (Sentry, Datadog, New Relic) for these patterns. Track metrics: failed login rate, unique IPs per account, CAPTCHA trigger frequency.
			</p>
		</section>

		<!-- How to Fix -->
		<section class="article-section">
			<h2>How do I fix credential stuffing vulnerabilities?</h2>

			<!-- AI Fix Prompt -->
			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>Copy this prompt into Cursor, Claude Code, or Bolt to implement multi-layered credential stuffing protection:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">AI Fix Prompt</span>
						<button class="copy-btn" class:copied={copiedPrompt} onclick={copyPrompt}>
							{copiedPrompt ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`You are a security expert. Analyze this codebase for credential stuffing vulnerabilities and implement multi-layered protection.

SEARCH FOR:
1. Authentication endpoints:
   - Search: "login", "signin", "authenticate", "/api/auth"
   - Files: app/api/auth/*, pages/api/auth/*, src/routes/auth/*

2. Check current protections:
   - Rate limiting: Search for "rateLimit", "Ratelimit", "express-rate-limit"
   - CAPTCHA: Search for "captcha", "recaptcha"
   - Breach checking: Search for "haveibeenpwned", "pwned"

IMPLEMENT THESE LAYERS:

Layer 1 - Rate Limiting:
- Add Upstash Rate Limit for serverless (Vercel/Netlify)
- Per-IP: 10 attempts per 15 minutes
- Per-account: 5 attempts per 15 minutes
- Return 429 status with clear error message

Layer 2 - Anomaly Detection:
- Track failed attempts per account (across all IPs)
- Track unique IPs attempting each account
- Alert when 5+ different IPs target same account (botnet signature)
- Block account temporarily after 10 failures in 1 hour

Layer 3 - Progressive CAPTCHA:
- Trigger CAPTCHA requirement after 3 failed attempts
- Use reCAPTCHA v3 (invisible, scores 0.0-1.0)
- Require score >= 0.5 for login
- Add "requireCaptcha: true" to error response

Layer 4 - Breached Password Check:
- Integrate HaveIBeenPwned Pwned Passwords API
- Check on registration AND password change
- Use k-Anonymity model (send only first 5 SHA-1 hash chars)
- Force different password if breached

Layer 5 - Exponential Backoff:
- Add delay after each failed attempt: min(1000 * 2^failures, 30000)ms
- Slows automated attacks without hard lockout
- Clears on successful login

Layer 6 - Security Monitoring:
- Log suspicious patterns to monitoring service (Sentry, Datadog)
- Alert on: 10+ failures per account, 5+ IPs per account
- Track metrics: total attempts, success rate, CAPTCHA triggers

VERIFICATION:
After implementing, test:
1. Rapid login attempts from same IP → Should rate limit
2. Same account from 5+ IPs → Should alert and block
3. 3 failed attempts → Should require CAPTCHA
4. Breached password on registration → Should reject

Use Next.js App Router with Upstash Redis for state storage.`}</div>
				</div>
			</div>

			<!-- Manual Fix Steps -->
			<div class="fix-section">
				<h3>Manual implementation steps</h3>
				<ol class="fix-steps">
					<li>
						<strong>Add rate limiting (per-IP and per-account)</strong>
						<p>Install Upstash Rate Limit. Add middleware to limit login attempts by IP and track per-account failures.</p>
					</li>
					<li>
						<strong>Integrate HaveIBeenPwned for registration</strong>
						<p>Create a function to check passwords against HIBP API using k-Anonymity. Reject breached passwords during signup and password changes.</p>
					</li>
					<li>
						<strong>Add CAPTCHA after 3 failed attempts</strong>
						<p>Set up reCAPTCHA v3. Trigger requirement after detecting suspicious activity. Verify scores server-side.</p>
					</li>
					<li>
						<strong>Implement anomaly monitoring</strong>
						<p>Track unique IPs per account using Redis sets. Alert when 5+ IPs attempt same account within 1 hour.</p>
					</li>
					<li>
						<strong>Set up alerts for suspicious patterns</strong>
						<p>Configure monitoring (Sentry, Datadog) to alert on distributed attack signatures. Track failed login rates and CAPTCHA trigger frequency.</p>
					</li>
				</ol>
			</div>

			<!-- Framework-Specific -->
			<div class="fix-section">
				<h3>Framework-specific guides</h3>
				<div class="framework-links">
					<a href="/kb/security/stacks/nextjs-supabase/" class="card card-interactive">
						<span class="framework-name">Next.js + Supabase</span>
						<span class="framework-desc">Complete stack security guide</span>
					</a>
					<a href="/kb/security/stacks/sveltekit-supabase/" class="card card-interactive">
						<span class="framework-name">SvelteKit + Supabase</span>
						<span class="framework-desc">Authentication security checklist</span>
					</a>
					<a href="/kb/security/vulnerabilities/missing-rate-limiting/" class="card card-interactive">
						<span class="framework-name">Missing Rate Limiting</span>
						<span class="framework-desc">Deep dive on rate limiting patterns</span>
					</a>
					<a href="/kb/security/vulnerabilities/jwt-vulnerabilities/" class="card card-interactive">
						<span class="framework-name">JWT Vulnerabilities</span>
						<span class="framework-desc">Session security best practices</span>
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
				<a href="/kb/security/vulnerabilities/missing-rate-limiting/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Missing Rate Limiting</div>
					<p class="related-card-description">Why your API needs request throttling and how to implement it</p>
				</a>
				<a href="/kb/security/vulnerabilities/jwt-vulnerabilities/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">JWT Vulnerabilities</div>
					<p class="related-card-description">Common authentication token security issues</p>
				</a>
				<a href="/kb/security/vulnerabilities/broken-access-control/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Broken Access Control</div>
					<p class="related-card-description">Authorization failures that let users access others' data</p>
				</a>
				<a href="/kb/vibe-coding-tools/cursor/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Cursor Security Patterns</div>
					<p class="related-card-description">Common vulnerabilities in Cursor-generated code</p>
				</a>
				<a href="/kb/security/stacks/nextjs-supabase/" class="card card-interactive related-card">
					<div class="related-card-category">Stack Guide</div>
					<div class="related-card-title">Next.js + Supabase Security</div>
					<p class="related-card-description">Complete security checklist for this popular vibe coding stack</p>
				</a>
				<a href="/kb/security/stacks/sveltekit-supabase/" class="card card-interactive related-card">
					<div class="related-card-category">Stack Guide</div>
					<div class="related-card-title">SvelteKit + Supabase Security</div>
					<p class="related-card-description">Authentication and authorization best practices</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Find credential stuffing vulnerabilities before attackers do</h2>
			<p>VibeShip Scanner detects authentication weaknesses in AI-generated code. Free scan, instant results.</p>
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

	/* Layer Section */
	.layer-section {
		margin: 2rem 0;
		padding: 1.5rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-left: 3px solid var(--green-dim);
	}

	.layer-section h3 {
		margin: 0 0 0.75rem;
		font-size: 1.25rem;
		color: var(--text-primary);
	}

	.layer-section p {
		color: var(--text-secondary);
		line-height: 1.7;
		margin: 0.75rem 0;
	}

	.layer-section .code-block {
		margin: 1rem 0;
	}

	.implementation-note {
		margin: 1rem 0 0;
		padding: 1rem;
		background: var(--bg-tertiary);
		border-left: 3px solid var(--orange);
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.implementation-note strong {
		color: var(--text-primary);
	}

	.pattern-note {
		margin: 1rem 0 0;
		font-size: 0.875rem;
		color: var(--text-secondary);
		padding: 1rem;
		background: var(--bg-tertiary);
		border-left: 3px solid var(--red);
	}

	.pattern-note strong {
		color: var(--text-primary);
	}

	/* Detection List */
	.detection-list {
		list-style: none;
		padding: 0;
		margin: 1rem 0;
	}

	.detection-list li {
		padding: 0.75rem 0 0.75rem 1.5rem;
		border-bottom: 1px solid var(--border);
		color: var(--text-secondary);
		line-height: 1.6;
		position: relative;
	}

	.detection-list li::before {
		content: '→';
		position: absolute;
		left: 0;
		color: var(--green-dim);
		font-weight: bold;
	}

	.detection-list li:last-child {
		border-bottom: none;
	}

	.detection-list strong {
		color: var(--text-primary);
	}

	/* Fix Section */
	.fix-section {
		margin: 2rem 0;
	}

	.fix-section h3 {
		margin-bottom: 0.75rem;
	}

	/* Fix Steps */
	.fix-steps {
		padding-left: 1.5rem;
		margin: 1rem 0;
	}

	.fix-steps li {
		margin-bottom: 1.5rem;
		color: var(--text-secondary);
		line-height: 1.7;
	}

	.fix-steps strong {
		color: var(--text-primary);
		display: block;
		margin-bottom: 0.25rem;
	}

	.fix-steps p {
		margin: 0.5rem 0 0;
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
		display: block;
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	/* Vulnerable code block */
	.code-block.vulnerable {
		border-left: 3px solid var(--red);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.framework-links {
			grid-template-columns: 1fr;
		}

		.layer-section {
			padding: 1rem;
		}

		.stats-row {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
