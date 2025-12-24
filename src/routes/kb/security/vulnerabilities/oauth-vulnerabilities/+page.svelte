<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'OAuth Vulnerabilities: Redirect URI & PKCE Failures',
		description: 'OAuth flaws let attackers steal accounts through redirect URI manipulation, missing state, and PKCE bypass. RFC 9700 (2025) now requires PKCE. Fix prompts for NextAuth, Auth0, Supabase.',
		url: '/kb/security/vulnerabilities/oauth-vulnerabilities/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'OAuth Vulnerabilities' }
	];

	// Real external data sources
	const owaspData = {
		category: 'A07:2021 - Identification and Authentication Failures',
		source: 'https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/',
		cweCSRF: 'CWE-352',
		cweCSRFSource: 'https://cwe.mitre.org/data/definitions/352.html',
		cweRedirect: 'CWE-601',
		cweRedirectSource: 'https://cwe.mitre.org/data/definitions/601.html',
		rfc9700: 'https://datatracker.ietf.org/doc/html/rfc9700'
	};

	// FAQ data for schema
	const faqs = [
		{
			question: 'Is OAuth 2.0 inherently insecure?',
			answer: 'No, but it\'s very easy to implement insecurely. OAuth 2.0 gives you the building blocks for secure authentication, but it doesn\'t force you to use them correctly. The spec includes critical security features like state parameters and PKCE, but until RFC 9700 (January 2025), many were optional. Now PKCE is mandatory for all OAuth clients, but developers still skip redirect URI validation or state checks. Secure OAuth requires understanding what each parameter protects against.'
		},
		{
			question: 'What is PKCE and why is it now mandatory?',
			answer: 'PKCE (Proof Key for Code Exchange) prevents authorization code interception attacks. Before PKCE, attackers could intercept the authorization code during redirect and exchange it for an access token. PKCE adds a cryptographic challenge that only the original client can solve. RFC 9700 (published January 2025) now requires PKCE for ALL OAuth 2.0 clients - public and confidential. If your OAuth implementation doesn\'t use PKCE, it\'s non-compliant and vulnerable.'
		},
		{
			question: 'Can attackers really steal accounts through redirect URI manipulation?',
			answer: 'Yes, and it happens regularly. If your redirect URI validation is loose, attackers redirect the OAuth callback to their own domain. They get the authorization code or access token meant for your app. Now they can log in as the victim. Companies have lost entire user accounts to this. The fix is strict, exact-match redirect URI validation - no wildcards, no partial matches.'
		},
		{
			question: 'Why do AI coding tools generate insecure OAuth flows?',
			answer: 'Because most OAuth examples online skip the security parameters. AI tools are trained on public code, and developers often omit state parameters or PKCE to "simplify" tutorials. The AI sees these patterns more often than secure implementations. When you ask for "OAuth login," it gives you working code that authenticates users - but without CSRF protection or code interception defenses. You get account takeover vulnerabilities shipped on day one.'
		},
		{
			question: 'Do I need to worry about OAuth if I use NextAuth.js or Auth0?',
			answer: 'Yes. Libraries reduce some risk but don\'t eliminate it. NextAuth.js handles state and PKCE automatically, but developers often misconfigure redirect URI validation or disable security features for development and forget to re-enable them. Auth0 has secure defaults, but custom implementations bypass them. Supabase and Firebase have similar patterns. Using a library is better than rolling your own OAuth, but configuration mistakes still cause breaches.'
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
			{"@type": "ListItem", "position": 4, "name": "OAuth Vulnerabilities"}
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
				<span class="badge">CWE-352</span>
				<span class="badge">CWE-601</span>
				<span class="badge">OWASP A07:2021</span>
			</div>
			<h1>OAuth Vulnerabilities in Vibe Coded Apps</h1>
			<p class="text-secondary">How redirect URI manipulation, missing state, and PKCE failures let attackers steal user accounts</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>OAuth vulnerabilities let attackers hijack the authentication flow to steal user accounts.</strong>
				The most common failures: redirect URI manipulation, missing state parameters (CSRF), and missing PKCE (code interception).
				<a href="https://datatracker.ietf.org/doc/html/rfc9700">RFC 9700</a> (published January 2025) now requires PKCE for ALL OAuth clients.
				AI coding tools generate OAuth flows without these protections, shipping account takeover bugs by default.
			</p>
		</div>

		<!-- Stats Box -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">A07</div>
				<div class="stat-label">OWASP 2021</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Jan 2025</div>
				<div class="stat-label"><a href={owaspData.rfc9700}>PKCE Mandatory</a></div>
			</div>
			<div class="stat-box">
				<div class="stat-value">6 Types</div>
				<div class="stat-label">Common Failures</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">High</div>
				<div class="stat-label">Severity</div>
			</div>
		</div>
		<p class="data-source">
			Source: <a href={owaspData.source}>OWASP A07:2021</a>, <a href={owaspData.rfc9700}>RFC 9700</a>
		</p>

		<!-- What Is It -->
		<section class="article-section">
			<h2>What are OAuth vulnerabilities?</h2>
			<p>
				OAuth vulnerabilities are flaws in how applications implement OAuth 2.0 authentication flows.
				OAuth is the protocol that powers "Sign in with Google," "Sign in with GitHub," and similar third-party login systems.
				When implemented incorrectly, attackers can intercept authorization codes, manipulate redirect URIs, or bypass CSRF protections to take over user accounts.
			</p>
			<p>
				According to <a href="https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/">OWASP A07:2021</a>, identification and authentication failures are among the most critical web application security risks.
				OAuth flaws fall directly into this category. The specification itself is secure, but the implementation is where everything breaks.
			</p>
			<p>
				<strong>Major change in 2025:</strong> <a href="https://datatracker.ietf.org/doc/html/rfc9700">RFC 9700</a>, published January 2025, now mandates PKCE (Proof Key for Code Exchange) for ALL OAuth 2.0 clients - both public and confidential.
				Before this, PKCE was recommended but optional. Now it's required. If your OAuth implementation lacks PKCE, it's non-compliant and vulnerable to authorization code interception attacks.
			</p>
		</section>

		<!-- Six Main Vulnerabilities -->
		<section class="article-section">
			<h2>The 6 OAuth vulnerabilities that cause breaches</h2>

			<div class="card-grid">
				<div class="feature-card">
					<h3>1. Redirect URI Manipulation</h3>
					<p>
						<strong>The attack:</strong> Attacker manipulates the OAuth callback redirect to point to their own domain. Authorization code or token gets sent to attacker instead of legitimate app.
					</p>
					<p>
						<strong>Why it happens:</strong> Loose redirect URI validation. Apps use wildcards (<code>*.example.com</code>) or substring matching instead of exact matches.
					</p>
					<p>
						<strong>Impact:</strong> Complete account takeover. Attacker logs in as victim.
					</p>
				</div>

				<div class="feature-card">
					<h3>2. Missing State Parameter (CSRF)</h3>
					<p>
						<strong>The attack:</strong> Attacker initiates OAuth flow with victim's browser, then tricks victim into completing it. Victim's account gets linked to attacker's social login.
					</p>
					<p>
						<strong>Why it happens:</strong> OAuth flow doesn't include state parameter to prevent CSRF. AI tools often omit this to "simplify" code.
					</p>
					<p>
						<strong>Impact:</strong> Account linking attacks, unauthorized access.
					</p>
				</div>

				<div class="feature-card">
					<h3>3. Missing PKCE (Code Interception)</h3>
					<p>
						<strong>The attack:</strong> Attacker intercepts authorization code during redirect (via network sniffing or malware), exchanges it for access token before legitimate client can.
					</p>
					<p>
						<strong>Why it happens:</strong> Implementation predates RFC 9700 or developer skipped PKCE thinking it was optional.
					</p>
					<p>
						<strong>Impact:</strong> Authorization code theft, account takeover. <strong>Now violates RFC 9700.</strong>
					</p>
				</div>

				<div class="feature-card">
					<h3>4. Open Redirect Chaining</h3>
					<p>
						<strong>The attack:</strong> App has separate open redirect vulnerability. Attacker chains it with OAuth to redirect authorization code to attacker domain while appearing to stay on legitimate domain.
					</p>
					<p>
						<strong>Why it happens:</strong> Apps validate redirect URI but have unrelated open redirect bugs elsewhere.
					</p>
					<p>
						<strong>Impact:</strong> Bypasses redirect URI validation, enables account takeover.
					</p>
				</div>

				<div class="feature-card">
					<h3>5. Token Leakage via Referrer/Logs</h3>
					<p>
						<strong>The attack:</strong> OAuth tokens appear in URL fragments or query parameters. Leaked via HTTP Referer header when user clicks external link, or logged in server access logs.
					</p>
					<p>
						<strong>Why it happens:</strong> Using implicit flow (deprecated) or improperly handling authorization codes in URLs.
					</p>
					<p>
						<strong>Impact:</strong> Token exposure, session hijacking.
					</p>
				</div>

				<div class="feature-card">
					<h3>6. Overly Permissive Redirect URI Validation</h3>
					<p>
						<strong>The attack:</strong> App validates redirect URI but accepts any subdomain, path, or uses regex with bypasses. Attacker finds combination that passes validation but redirects to their server.
					</p>
					<p>
						<strong>Why it happens:</strong> Developer wants flexibility for staging/production environments, uses loose validation patterns.
					</p>
					<p>
						<strong>Impact:</strong> Same as redirect URI manipulation - account takeover.
					</p>
				</div>
			</div>
		</section>

		<!-- How AI Tools Cause This -->
		<section class="article-section">
			<h2>How do AI tools generate insecure OAuth flows?</h2>
			<p>
				Every major AI coding tool generates OAuth implementations that skip critical security parameters.
				The code works. Users can log in. The vulnerabilities are invisible until an attacker exploits them.
			</p>

			<div class="tool-patterns-box">
				<h3>The pattern AI tools generate</h3>
				<p>Ask any AI for "OAuth login with Google" and you get this:</p>
				<div class="code-block">
					<pre><code>{`// Cursor, Bolt, Claude Code - all generate this
app.get('/auth/google', (req, res) => {
  const authUrl = \`https://accounts.google.com/o/oauth2/v2/auth?
    client_id=\${process.env.GOOGLE_CLIENT_ID}&
    redirect_uri=\${encodeURIComponent(process.env.REDIRECT_URI)}&
    response_type=code&
    scope=openid email profile\`

  res.redirect(authUrl)
})

app.get('/auth/callback', async (req, res) => {
  const { code } = req.query

  // Exchange code for tokens
  const tokens = await getTokens(code)

  // Log user in
  req.session.userId = tokens.sub
  res.redirect('/dashboard')
})`}</code></pre>
				</div>
				<p class="pattern-note">
					<strong>Missing:</strong> No state parameter (CSRF vulnerable). No PKCE (code interception vulnerable). No strict redirect URI validation. Works perfectly. Completely insecure.
				</p>
			</div>

			<p>
				<strong>Why AI does this:</strong> Training data is full of simplified OAuth examples that prioritize "getting it working" over security.
				Developers write tutorials without state or PKCE to reduce complexity. AI learns this pattern. The secure implementations with all parameters are less common in training data.
			</p>

			<p>
				This isn't a bug in Cursor or Claude Code or Bolt. It's how these models work. They generate what they've seen most often.
				Catching OAuth vulnerabilities before production is your responsibility.
			</p>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How do I detect OAuth vulnerabilities?</h2>
			<p>
				Security audits check for these patterns first. Search your OAuth implementation code for missing security parameters.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Patterns to search for</span>
				</div>
				<pre><code>{`// Missing state parameter (CSRF vulnerable)
const authUrl = \`https://provider.com/oauth/authorize?client_id=...\`
// ❌ No state= parameter

// Missing PKCE (code interception vulnerable)
const authUrl = \`https://provider.com/oauth/authorize?...\`
// ❌ No code_challenge= or code_challenge_method= parameters

// Loose redirect URI validation
if (redirectUri.includes(ALLOWED_DOMAIN)) { ... }
// ❌ Substring match instead of exact match

// Wildcard redirect URIs in OAuth provider config
redirect_uris: ['*.example.com']
// ❌ Accepts any subdomain

// Tokens in URL fragments (deprecated implicit flow)
const token = window.location.hash.match(/access_token=([^&]*)/)[1]
// ❌ Token exposed in URL, leaks via Referer

// No redirect URI validation at all
app.get('/callback', async (req, res) => {
  const { code, redirect } = req.query
  // ...
  res.redirect(redirect) // ❌ Open redirect
})`}</code></pre>
			</div>

			<div class="cta-box">
				<p><strong>Scan your OAuth implementation for these vulnerabilities</strong></p>
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
			<h2>How do I fix OAuth vulnerabilities?</h2>
			<p>
				The fix requires adding three critical security parameters: state (CSRF protection), PKCE (code interception protection), and strict redirect URI validation.
				Here's how to secure your OAuth implementation across all major frameworks.
			</p>

			<!-- AI Fix Prompt -->
			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>This prompt covers all six OAuth vulnerabilities. Copy it into Cursor, Claude Code, or Bolt:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Fix all OAuth 2.0 security vulnerabilities in my authentication implementation.

## Critical OAuth Security Requirements

Search for and fix these six vulnerability patterns:

### 1. Missing State Parameter (CSRF Protection)

**What to look for:**
- OAuth authorization URLs without state parameter
- Callback handlers that don't verify state

**How to fix:**
\`\`\`javascript
// BEFORE (vulnerable to CSRF)
const authUrl = \`https://provider.com/oauth/authorize?
  client_id=\${CLIENT_ID}&
  redirect_uri=\${REDIRECT_URI}&
  response_type=code\`

// AFTER (CSRF protected)
const state = crypto.randomBytes(32).toString('hex')
req.session.oauthState = state // Store in session

const authUrl = \`https://provider.com/oauth/authorize?
  client_id=\${CLIENT_ID}&
  redirect_uri=\${REDIRECT_URI}&
  response_type=code&
  state=\${state}\`

// In callback handler:
if (req.query.state !== req.session.oauthState) {
  throw new Error('Invalid state parameter')
}
\`\`\`

### 2. Missing PKCE (Required by RFC 9700, Jan 2025)

**What to look for:**
- OAuth flows without code_challenge parameter
- Token exchange without code_verifier

**How to fix:**
\`\`\`javascript
// BEFORE (vulnerable to code interception)
const authUrl = \`https://provider.com/oauth/authorize?
  client_id=\${CLIENT_ID}&
  redirect_uri=\${REDIRECT_URI}&
  response_type=code\`

// AFTER (PKCE protected - RFC 9700 compliant)
const codeVerifier = crypto.randomBytes(32).toString('base64url')
req.session.codeVerifier = codeVerifier

const codeChallenge = crypto
  .createHash('sha256')
  .update(codeVerifier)
  .digest('base64url')

const authUrl = \`https://provider.com/oauth/authorize?
  client_id=\${CLIENT_ID}&
  redirect_uri=\${REDIRECT_URI}&
  response_type=code&
  code_challenge=\${codeChallenge}&
  code_challenge_method=S256\`

// In token exchange:
await exchangeCodeForToken(code, {
  code_verifier: req.session.codeVerifier
})
\`\`\`

### 3. Loose Redirect URI Validation

**What to look for:**
- Substring matching: \`redirectUri.includes(domain)\`
- Wildcards in redirect URI config: \`*.example.com\`
- Regex with bypass potential
- No validation at all

**How to fix:**
\`\`\`javascript
// BEFORE (bypassable)
if (redirectUri.includes('example.com')) { ... }
if (redirectUri.startsWith('https://')) { ... }

// AFTER (exact match only)
const ALLOWED_REDIRECT_URIS = [
  'https://example.com/auth/callback',
  'https://app.example.com/auth/callback'
]

if (!ALLOWED_REDIRECT_URIS.includes(redirectUri)) {
  throw new Error('Invalid redirect URI')
}
\`\`\`

### 4. Token Leakage Prevention

**What to look for:**
- Access tokens in URL parameters
- Using deprecated implicit flow (\`response_type=token\`)
- Tokens logged to console or server logs

**How to fix:**
\`\`\`javascript
// BEFORE (token leaks via Referer header)
res.redirect(\`/dashboard?access_token=\${token}\`)

// AFTER (token in secure httpOnly cookie)
res.cookie('access_token', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'lax',
  maxAge: 3600000
})
res.redirect('/dashboard')

// Never use implicit flow
// response_type=token ❌
// response_type=code ✅
\`\`\`

### 5. Open Redirect Chaining Prevention

**What to look for:**
- Any unvalidated redirects elsewhere in the app
- User-controlled redirect parameters

**How to fix:**
\`\`\`javascript
// BEFORE (open redirect)
app.get('/redirect', (req, res) => {
  res.redirect(req.query.url) // ❌
})

// AFTER (validated redirect)
const ALLOWED_REDIRECTS = ['/dashboard', '/profile', '/settings']
const redirect = req.query.url

if (!ALLOWED_REDIRECTS.includes(redirect)) {
  res.redirect('/dashboard') // Safe default
} else {
  res.redirect(redirect)
}
\`\`\`

## Framework-Specific Fixes

### NextAuth.js
- Verify \`NEXTAUTH_URL\` is set correctly
- Don't disable \`state\` or \`pkce\` in provider config
- Use exact redirect URIs in OAuth provider settings

### Auth0
- Enable "Strict Mode" in application settings
- Set "Allowed Callback URLs" to exact matches only
- Verify PKCE is enabled (default in Auth0 Universal Login)

### Supabase Auth
- Set exact \`redirectTo\` URLs in Supabase dashboard
- Use \`{ redirectTo }\` parameter in \`signInWithOAuth()\`
- Verify state parameter in callback

### Firebase Authentication
- Configure authorized domains in Firebase Console
- Use \`getRedirectResult()\` not \`signInWithRedirect()\` alone
- Handle errors properly to prevent token leakage

## Verification Steps

After fixing, verify:

1. State parameter present in authorization URL
2. State verified in callback handler
3. PKCE code_challenge in authorization URL (RFC 9700 compliance)
4. code_verifier sent in token exchange
5. Redirect URI uses exact match validation
6. No tokens in URL parameters or fragments
7. No wildcard redirect URIs in OAuth provider config
8. All redirects throughout app are validated

List all files modified with before/after code snippets showing the security fixes.`}</div>
				</div>
			</div>

			<!-- Manual Fixes -->
			<div class="fix-section">
				<h3>Manual Fixes: Before & After</h3>

				<h4>NextAuth.js Configuration</h4>
				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-label">Vulnerable</div>
						<pre><code>{`// pages/api/auth/[...nextauth].ts
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // ❌ Missing authorization parameters
    })
  ]
})

// .env
NEXTAUTH_URL=http://localhost:3000
// ❌ Insecure for production`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-label">Secure</div>
						<pre><code>{`// pages/api/auth/[...nextauth].ts
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          // ✅ NextAuth handles state + PKCE automatically
        }
      }
    })
  ],
  // ✅ Strict redirect validation
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url
      else if (url.startsWith('/')) return \`\${baseUrl}\${url}\`
      return baseUrl
    }
  }
})

// .env
NEXTAUTH_URL=https://yourdomain.com
// ✅ Production URL, HTTPS only`}</code></pre>
					</div>
				</div>

				<h4>Auth0 Configuration</h4>
				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-label">Vulnerable</div>
						<pre><code>{`// Auth0 Dashboard Settings
Allowed Callback URLs:
https://*.example.com/callback
// ❌ Wildcard allows subdomain takeover

Application Type: Single Page Application
// ❌ Uses implicit flow (deprecated)`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-label">Secure</div>
						<pre><code>{`// Auth0 Dashboard Settings
Allowed Callback URLs:
https://example.com/auth/callback
https://app.example.com/auth/callback
// ✅ Exact matches only

Application Type: Regular Web Application
// ✅ Uses authorization code flow with PKCE

// Enable in Advanced Settings
OIDC Conformant: ON
PKCE: ON (default)
// ✅ RFC 9700 compliant`}</code></pre>
					</div>
				</div>

				<h4>Supabase Auth Implementation</h4>
				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-label">Vulnerable</div>
						<pre><code>{`// Supabase client code
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google'
  // ❌ No redirectTo specified
  // ❌ Supabase uses default redirect
})

// In callback handler
const { data: { session } } = await supabase.auth.getSession()
// ❌ No state verification`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-label">Secure</div>
						<pre><code>{`// Supabase client code
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: 'https://yourdomain.com/auth/callback',
    // ✅ Explicit redirect
    scopes: 'openid email profile',
    queryParams: {
      access_type: 'offline',
      prompt: 'consent'
    }
  }
})

// In Supabase Dashboard > Authentication > URL Configuration
Site URL: https://yourdomain.com
Redirect URLs:
  https://yourdomain.com/auth/callback
  // ✅ Exact matches only

// Supabase handles state + PKCE automatically ✅`}</code></pre>
					</div>
				</div>

				<h4>Firebase Auth Implementation</h4>
				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-label">Vulnerable</div>
						<pre><code>{`// Firebase client code
const provider = new GoogleAuthProvider()

// Sign in with redirect
await signInWithRedirect(auth, provider)
// ❌ No redirect URL validation
// ❌ Token may leak via URL fragment`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-label">Secure</div>
						<pre><code>{`// Firebase client code
const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: 'select_account'
})

// Sign in with popup (more secure than redirect)
try {
  const result = await signInWithPopup(auth, provider)
  // ✅ Credentials in memory, not URL
  const credential = GoogleAuthProvider.credentialFromResult(result)
  const token = credential?.accessToken

  // Store token securely
  // ✅ Never put in URL or localStorage

} catch (error) {
  // ✅ Handle auth errors without leaking tokens
  console.error('Auth failed:', error.code)
}

// Firebase Console > Authentication > Settings
Authorized Domains:
  yourdomain.com
  app.yourdomain.com
  // ✅ Exact domain matches only`}</code></pre>
					</div>
				</div>
			</div>
		</section>

		<!-- Framework Comparison Table -->
		<section class="article-section">
			<h2>OAuth Security by Framework</h2>
			<p>How well do popular frameworks handle OAuth security by default?</p>

			<div class="table-wrapper">
				<table>
					<thead>
						<tr>
							<th>Framework</th>
							<th>State (CSRF)</th>
							<th>PKCE</th>
							<th>Redirect Validation</th>
							<th>Security Grade</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><strong>NextAuth.js</strong></td>
							<td class="check">Automatic</td>
							<td class="check">Automatic</td>
							<td class="warning">Manual config needed</td>
							<td>B+</td>
						</tr>
						<tr>
							<td><strong>Auth0</strong></td>
							<td class="check">Automatic</td>
							<td class="check">Automatic</td>
							<td class="check">Enforced</td>
							<td>A</td>
						</tr>
						<tr>
							<td><strong>Supabase Auth</strong></td>
							<td class="check">Automatic</td>
							<td class="check">Automatic</td>
							<td class="warning">Dashboard config</td>
							<td>B+</td>
						</tr>
						<tr>
							<td><strong>Firebase Auth</strong></td>
							<td class="check">Automatic</td>
							<td class="check">Automatic</td>
							<td class="warning">Console config</td>
							<td>B</td>
						</tr>
						<tr>
							<td><strong>Passport.js</strong></td>
							<td class="warning">Manual</td>
							<td class="cross">Manual</td>
							<td class="cross">Manual</td>
							<td>C</td>
						</tr>
						<tr>
							<td><strong>Custom OAuth</strong></td>
							<td class="cross">Developer's responsibility</td>
							<td class="cross">Developer's responsibility</td>
							<td class="cross">Developer's responsibility</td>
							<td>F (High risk)</td>
						</tr>
					</tbody>
				</table>
			</div>

			<p class="table-note">
				<strong>Key:</strong> Even frameworks with automatic security require correct configuration. NextAuth, Supabase, and Firebase handle state and PKCE automatically but still require strict redirect URI configuration in dashboard/console settings. Auth0 has the most secure defaults but can be misconfigured. Never roll your own OAuth implementation.
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
				<a href="/kb/security/vulnerabilities/open-redirect/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Open Redirect Vulnerabilities</div>
					<p class="related-card-description">How unvalidated redirects enable OAuth bypass and phishing attacks</p>
				</a>
				<a href="/kb/security/vulnerabilities/csrf/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">CSRF (Cross-Site Request Forgery)</div>
					<p class="related-card-description">State parameter failures in OAuth enable CSRF attacks</p>
				</a>
				<a href="/kb/security/stacks/nextjs-supabase/" class="card card-interactive related-card">
					<div class="related-card-category">Stack Guide</div>
					<div class="related-card-title">Next.js + Supabase Security</div>
					<p class="related-card-description">Complete authentication security checklist</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Find OAuth vulnerabilities before attackers do</h2>
			<p>Missing state parameters and PKCE are invisible until exploited.</p>
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

	/* Vulnerability Grid - uses global .card-grid and .feature-card from components.css */

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

	.pattern-note strong {
		color: var(--text-primary);
	}

	/* CTA Box - uses global .cta-box from components.css (lines 1173-1187) */

	/* Fix Sections */
	.fix-section {
		margin: 2rem 0;
	}

	.fix-section h3 {
		margin-bottom: 0.75rem;
	}

	.fix-section h4 {
		margin: 2rem 0 1rem;
		color: var(--text-primary);
	}

	/* Code Comparison - uses global .code-block from components.css */

	/* Table Styling - uses global table styles from components.css (lines 909-945) */
	.check {
		color: var(--green-muted);
		font-weight: 500;
	}

	.cross {
		color: var(--red);
		font-weight: 500;
	}

	.warning {
		color: var(--orange);
		font-weight: 500;
	}

	.table-note {
		font-size: 0.875rem;
		color: var(--text-secondary);
		margin-top: 1rem;
		line-height: 1.6;
	}

	.table-note strong {
		color: var(--text-primary);
	}

	/* Responsive - .card-grid handles its own responsive layout via components.css */
	@media (max-width: 768px) {
		table {
			min-width: 600px;
		}
	}
</style>
