<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Session Fixation: Fix AI Auth Code | VibeShip',
		description: 'Session fixation lets attackers hijack accounts by reusing session IDs. Found in 40% of vibe coded auth systems. Get Express + Next.js fixes.',
		url: '/kb/security/vulnerabilities/session-fixation/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Session Fixation' }
	];

	// Real external data sources
	const securityData = {
		cweId: 'CWE-384',
		cweSource: 'https://cwe.mitre.org/data/definitions/384.html',
		owaspCategory: 'A07:2021',
		owaspSource: 'https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/',
		severity: 'High',
		copilotRate: '~40%',
		copilotSource: 'https://www.techtarget.com/searchsecurity/news/366571117/GitHub-Copilot-replicating-vulnerabilities-insecure-code'
	};

	// FAQ data for schema
	const faqs = [
		{
			question: "What's the difference between session fixation and session hijacking?",
			answer: "Session fixation is when an attacker SETS your session ID before you log in, then waits for you to authenticate. Session hijacking is when they STEAL your session ID after you're already logged in. Fixation is premeditated—they plant the session ID like planting evidence. Hijacking is opportunistic theft. Different attack vectors, same end result: they control your authenticated session."
		},
		{
			question: "Does regenerating the session ID log users out?",
			answer: "No. Session regeneration creates a new session ID but preserves all session data. The user stays logged in—they just get a new session cookie. It's like getting a new hotel room key that opens the same room. The old key stops working, but everything inside (user data, cart items, preferences) stays intact. Most users never notice it happened."
		},
		{
			question: "Can HttpOnly cookies prevent session fixation?",
			answer: "No. HttpOnly prevents JavaScript from reading cookies (stops XSS attacks), but it doesn't prevent session fixation. An attacker can still set a session ID through URL parameters or other vectors, and HttpOnly won't stop that. You MUST regenerate the session ID after login—HttpOnly alone isn't enough. They solve different problems."
		},
		{
			question: "Why does GitHub Copilot generate vulnerable session code?",
			answer: "AI tools complete code patterns but don't understand security lifecycles. Copilot sees 'set session after login' in training data and completes that pattern. It misses 'regenerate session BEFORE setting user data' because that's a security requirement, not a syntax pattern. When Invicti analyzed Copilot's output, they found it sets session names to usernames (predictable and exploitable). The AI optimizes for 'code that runs' not 'code that's secure.'"
		},
		{
			question: "How do I test if my app is vulnerable?",
			answer: "Open DevTools, go to Application > Cookies, and note your session cookie value BEFORE logging in. Log in successfully. Check the cookie value again. If it's identical, you're vulnerable to session fixation. The session ID should change after authentication. This test takes 30 seconds and definitively tells you if session regeneration is working."
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
			{"@type": "ListItem", "position": 4, "name": "Session Fixation"}
		]
	}
	</script>`}

	<!-- TechArticle Schema -->
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
				<span class="badge">CWE-384</span>
				<span class="badge">OWASP A07:2021</span>
			</div>
			<h1>Session Fixation: When AI Auth Code Reuses Session IDs</h1>
			<p class="text-secondary">The hotel room key that works before AND after you check in</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Session fixation happens when an attacker sets a session ID before a user logs in, and the application doesn't generate a new session ID after authentication.</strong>
				The attacker creates a session, tricks the victim into using it, then waits for the victim to log in. Once authenticated, the attacker uses that same session ID to hijack the account.
				Classified under <a href="{securityData.owaspSource}">OWASP A07:2021</a> (Identification and Authentication Failures).
			</p>
		</div>

		<!-- Stats Box -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">{securityData.cweId}</div>
				<div class="stat-label"><a href={securityData.cweSource}>CWE ID</a></div>
			</div>
			<div class="stat-box">
				<div class="stat-value">#7</div>
				<div class="stat-label">OWASP Ranking</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">{securityData.copilotRate}</div>
				<div class="stat-label">AI Code Affected</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">{securityData.severity}</div>
				<div class="stat-label">Severity</div>
			</div>
		</div>
		<p class="data-source">
			Sources: <a href={securityData.owaspSource}>OWASP Top 10</a>,
			<a href={securityData.copilotSource}>NYU Research</a>
		</p>

		<!-- What Is It - @danawhy voice -->
		<section class="article-section">
			<h2>What is session fixation?</h2>
			<p>
				Let me trace this backwards. You know how you log in and get a session cookie? Session fixation is when that cookie already existed <em>before</em> you logged in. An attacker planted it.
			</p>
			<p>
				Think of it like a hotel. Normal flow: you check in, they hand you a room key. Session fixation: someone hands you a room key in the parking lot, you check in with that key, and now both you AND the person who gave it to you can access the room.
			</p>
			<p>
				Here's how it happens step by step:
			</p>
			<ol class="attack-flow">
				<li><strong>Attacker creates a session</strong> on your website (just by visiting it)</li>
				<li><strong>Attacker sends you a link</strong> with that session ID embedded (often via phishing)</li>
				<li><strong>You click the link</strong> and log in normally—everything looks fine</li>
				<li><strong>Your app doesn't regenerate the session ID</strong> after login (this is the vulnerability)</li>
				<li><strong>Attacker reuses that same session ID</strong> and now they're logged in as you</li>
			</ol>
			<p>
				The attack works because your application trusted a session ID that came from outside the authentication process. According to <a href="https://owasp.org/www-community/attacks/Session_fixation">OWASP's session fixation documentation</a>, this vulnerability has been exploitable for over two decades, yet it still appears in modern vibe coded applications.
			</p>
		</section>

		<!-- How AI Tools Cause This -->
		<section class="article-section">
			<h2>How AI tools cause session fixation</h2>
			<p>
				When vibe coders ask Cursor or Copilot to build login functionality, they complete the authentication logic perfectly. They verify credentials, check passwords, set session data. What they don't understand is the <em>lifecycle</em> of a session across the authentication boundary.
			</p>

			<div class="ai-pattern-box">
				<h3>The pattern AI generates</h3>
				<p>Every AI tool makes this mistake. Watch the flow:</p>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">JavaScript - What AI generates</span>
					</div>
					<pre><code>{`app.post('/login', (req, res) => {
  passport.authenticate('local', (err, user) => {
    if (err) return res.status(500).json({ error: err });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    // ❌ AI sets user data but keeps the same session ID
    req.session.userId = user.id;
    res.json({ success: true });
  })(req, res);
});`}</code></pre>
				</div>
				<p class="pattern-explanation">
					The code <em>works</em>. User logs in, session stores their ID, everything functions. But the session ID that existed before login is still the same session ID after login. If an attacker set that ID beforehand, they now have access to an authenticated session.
				</p>
			</div>

			<p>
				<strong>Why this happens:</strong> AI tools are trained on patterns that prioritize "working code." They see thousands of examples where <code>req.session.userId = user.id</code> successfully logs someone in. What they don't see is the security requirement to call <code>req.session.regenerate()</code> first—because that's a defensive pattern, not a functional requirement.
			</p>

			<p>
				According to <a href="https://www.invicti.com/blog/web-security/analyzing-security-github-copilot-suggestions">Invicti's analysis of GitHub Copilot</a>, the tool generates predictable session patterns like setting the session name to the username. When combined with missing regeneration, this creates trivially exploitable session fixation vulnerabilities.
			</p>

			<div class="tool-comparison">
				<h3>AI tool vulnerability patterns</h3>
				<table>
					<thead>
						<tr>
							<th>Tool</th>
							<th>Common Pattern</th>
							<th>Why It's Vulnerable</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>GitHub Copilot</td>
							<td>Sets session name to username</td>
							<td>Predictable session IDs + no regeneration</td>
						</tr>
						<tr>
							<td>Cursor</td>
							<td>Completes login without regeneration</td>
							<td>Reuses pre-existing session across auth boundary</td>
						</tr>
						<tr>
							<td>Claude Code</td>
							<td>Sets session data after passport.authenticate</td>
							<td>Missing regeneration step before setting user data</td>
						</tr>
						<tr>
							<td>Bolt / v0 / Replit</td>
							<td>Generic Express auth patterns</td>
							<td>Copy training data patterns that skip session lifecycle</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- What Could Happen -->
		<section class="article-section">
			<h2>What could happen</h2>
			<p>
				Let's trace the attack path. This is what actually happens when session fixation is exploited:
			</p>
			<ul class="consequences-list">
				<li><strong>Account takeover without stealing credentials:</strong> Attacker never needs your password. They set a session, you log in with it, they reuse it. Clean authentication logs. No brute force attempts. Just a session ID they already had.</li>
				<li><strong>2FA/MFA bypass:</strong> This is the scary part. You enable two-factor authentication thinking you're protected. But session fixation happens <em>before</em> authentication completes. The attacker's session gets authenticated through your 2FA, then they use it. Your second factor just authenticated them.</li>
				<li><strong>Persistent backdoor access:</strong> Even if you change your password later, that fixed session ID might still be valid (depending on session expiry). Attackers can maintain access long after the initial compromise.</li>
				<li><strong>Phishing at scale:</strong> Send emails with pre-set session IDs embedded in "password reset" or "verify account" links. Users click, log in, attackers collect authenticated sessions in bulk.</li>
			</ul>
			<p>
				Real-world scenario: Attacker sends a legitimate-looking email from "support@yourapp.com" (spoofed) with a link like <code>https://yourapp.com/?sessionid=ATTACKER_CONTROLLED_ID</code>. User clicks, sees the normal login page, enters credentials. If your app accepts session IDs from URL parameters and doesn't regenerate after auth, the attacker now owns that session.
			</p>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How to detect session fixation</h2>
			<p>
				Walk through your authentication flow step by step. Here's what I look for when debugging session issues:
			</p>

			<div class="detection-steps">
				<h3>Code-level detection</h3>
				<p>Search your codebase for authentication handlers. Look for this pattern:</p>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">Search patterns</span>
					</div>
					<pre><code>{`// VULNERABLE: Setting session data without regeneration
req.session.userId = user.id
req.session.user = user
req.session.save()

// Missing this before setting user data:
req.session.regenerate()

// Grep patterns to find vulnerable code:
grep -r "req.session\\.save" --include="*.js"
grep -r "passport.authenticate" --include="*.js"

// Look for routes that:
// 1. Authenticate users (passport, bcrypt.compare, JWT decode)
// 2. Set session variables
// 3. DON'T call session.regenerate() between those steps`}</code></pre>
				</div>
			</div>

			<div class="detection-steps">
				<h3>Browser DevTools test</h3>
				<p>This is the fastest way to confirm if your app is vulnerable:</p>
				<ol class="devtools-test">
					<li>Open your app in Chrome/Firefox</li>
					<li>Open DevTools → Application → Cookies</li>
					<li>Note your session cookie value (usually named <code>connect.sid</code>, <code>sessionid</code>, or similar)</li>
					<li>Log in to your application</li>
					<li>Check the session cookie value again</li>
					<li><strong>If the value is IDENTICAL before and after login, you're vulnerable</strong></li>
				</ol>
				<p>
					The session ID should change after authentication. If it doesn't, session fixation is possible.
				</p>
			</div>

			<div class="cta-box">
				<p><strong>Want automated detection across your entire codebase?</strong></p>
				<a href="https://scanner.vibeship.co" class="btn btn-green">
					Scan for session vulnerabilities
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M5 12h14M12 5l7 7-7 7"/>
					</svg>
				</a>
			</div>
		</section>

		<!-- How to Fix -->
		<section class="article-section">
			<h2>How to fix session fixation</h2>
			<p>
				The fix is straightforward once you understand the session lifecycle: regenerate the session ID <em>after</em> authentication succeeds but <em>before</em> storing user data. One function call. Let me show you exactly where it goes.
			</p>

			<!-- AI Fix Prompt -->
			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>Copy this prompt into your AI coding tool. It includes the complete context needed to fix session fixation across your authentication flows:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">AI Fix Prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`I need you to review my authentication code and fix session fixation vulnerabilities.

## The Problem

My login endpoint authenticates users but doesn't regenerate the session ID after successful authentication. This allows attackers to set a session ID before login and hijack the session afterward.

## What I Need

1. Add session regeneration AFTER authentication succeeds but BEFORE storing user data
2. Ensure session cookies use HttpOnly and Secure flags
3. Verify session IDs are never accepted from URL parameters or POST body
4. Add logout endpoint that properly destroys sessions

## My Stack

- Framework: Express.js
- Session library: express-session
- Auth middleware: Passport.js (local strategy)
- Session store: (specify: Redis, MongoDB, memory, etc.)

## Current Code

[PASTE YOUR LOGIN ROUTE CODE HERE]

## Requirements

Show me before/after code with comments explaining each change:

1. **Session Configuration:**
   - HttpOnly flag prevents JavaScript cookie access
   - Secure flag ensures HTTPS-only transmission
   - SameSite attribute prevents CSRF attacks
   - Proper session store configured

2. **Login Route:**
   - Call req.session.regenerate() after authentication
   - Handle regenerate() callback with error checking
   - Set user data ONLY after regeneration completes
   - Return appropriate errors if regeneration fails

3. **Logout Route:**
   - Call req.session.destroy() to invalidate session
   - Clear session cookie from response
   - Handle destroy callback errors

4. **Session ID Handling:**
   - Never accept session IDs from URL parameters
   - Never accept session IDs from request body
   - Only use session IDs from secure HttpOnly cookies

## Expected Output

1. Updated session middleware configuration with security flags
2. Fixed login route with session regeneration
3. Logout route that properly destroys sessions
4. Code comments explaining security improvements
5. List any additional security concerns found

## Security Checklist

After fixing, verify:
✓ Session ID regenerated after successful authentication
✓ HttpOnly flag prevents JavaScript cookie access
✓ Secure flag ensures HTTPS-only transmission
✓ Session destroyed on logout
✓ No session IDs accepted from URL or POST body
✓ Session configuration includes proper store (not MemoryStore in production)

Please proceed systematically through my authentication code.`}</div>
				</div>
			</div>

			<!-- Manual Fix - Express + Passport -->
			<div class="fix-section">
				<h3>Manual Fix: Express with Passport.js</h3>
				<p>Here's the exact change. Watch where <code>regenerate()</code> gets called:</p>

				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-label">Vulnerable</div>
						<pre><code>{`app.post('/login', (req, res) => {
  passport.authenticate('local', (err, user) => {
    if (err) return res.status(500).json({ error: err });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    // ❌ Session ID not regenerated
    // Pre-authentication session ID still valid
    req.session.userId = user.id;
    res.json({ success: true, user });
  })(req, res);
});`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-label">Secure</div>
						<pre><code>{`app.post('/login', (req, res) => {
  passport.authenticate('local', (err, user) => {
    if (err) return res.status(500).json({ error: err });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    // ✅ Regenerate session ID after authentication
    // Old session ID becomes invalid
    req.session.regenerate((err) => {
      if (err) return res.status(500).json({ error: err });

      // Set user data in NEW session
      req.session.userId = user.id;
      res.json({ success: true, user });
    });
  })(req, res);
});`}</code></pre>
					</div>
				</div>

				<p>
					<strong>What changed:</strong> Added <code>req.session.regenerate()</code> between authentication and setting user data. This creates a new session ID, invalidates the old one, and ensures any attacker-controlled session ID becomes useless. The user gets a fresh session that only they control.
				</p>
			</div>

			<!-- Manual Fix - Next.js -->
			<div class="fix-section">
				<h3>Manual Fix: Next.js API Route</h3>
				<p>For Next.js with iron-session, the pattern is slightly different but the principle is the same:</p>

				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-label">Vulnerable</div>
						<pre><code>{`// pages/api/auth/login.js
import { withIronSessionApiRoute } from 'iron-session/next';

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req, res) {
  const { username, password } = req.body;
  const user = await validateCredentials(username, password);

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // ❌ Session not regenerated - reuses existing session
  req.session.user = { id: user.id, username };
  await req.session.save();
  res.json({ success: true });
}`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-label">Secure</div>
						<pre><code>{`// pages/api/auth/login.js
import { withIronSessionApiRoute } from 'iron-session/next';

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req, res) {
  const { username, password } = req.body;
  const user = await validateCredentials(username, password);

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // ✅ Destroy old session and create new one
  req.session.destroy();
  req.session.user = { id: user.id, username };
  await req.session.save();
  res.json({ success: true });
}`}</code></pre>
					</div>
				</div>

				<p>
					<strong>Note:</strong> Iron-session uses <code>destroy()</code> instead of <code>regenerate()</code>. Both achieve the same goal: invalidate the old session ID and create a new one.
				</p>
			</div>

			<!-- Framework-Specific Guidance -->
			<div class="fix-section">
				<h3>Framework-specific fixes</h3>
				<div class="framework-notes">
					<h4>Passport.js 0.6.0+ (Auto-Regeneration)</h4>
					<p>
						Good news: <a href="https://medium.com/passportjs/fixing-session-fixation-b2b68619c51d">Passport.js 0.6.0</a> automatically regenerates sessions after login—but ONLY if you're using <code>express-session</code>.
					</p>
					<div class="alert alert-warning">
						<div class="alert-title">Important Compatibility Note</div>
						<p>
							Passport 0.6.0 auto-regeneration does NOT work with <code>cookie-session</code> (it has no <code>regenerate()</code> method). If you're using cookie-session, you must manually destroy and recreate the session or switch to express-session.
						</p>
					</div>

					<h4>Express Session Configuration</h4>
					<p>Ensure your session middleware has proper security flags:</p>
					<div class="code-block">
						<pre><code>{`app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,      // Prevents JavaScript access
    secure: true,        // HTTPS only
    sameSite: 'strict',  // CSRF protection
    maxAge: 3600000      // 1 hour expiry
  },
  store: new RedisStore({ client: redisClient }) // Use persistent store
}));`}</code></pre>
					</div>

					<h4>Additional Resources</h4>
					<ul class="resource-links">
						<li><a href="https://www.passportjs.org/concepts/authentication/sessions/">Passport.js Session Authentication Guide</a></li>
						<li><a href="https://www.npmjs.com/package/express-session">express-session Documentation</a></li>
						<li><a href="https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html">OWASP Session Management Cheat Sheet</a></li>
					</ul>
				</div>
			</div>
		</section>

		<!-- Session Security Best Practices -->
		<section class="article-section">
			<h2>Session security best practices</h2>
			<p>
				Beyond fixing session fixation, here's how to build a secure session management system:
			</p>
			<ul class="best-practices-list">
				<li><strong>HttpOnly and Secure flags:</strong> Always set both. HttpOnly prevents XSS from stealing cookies, Secure ensures they're only sent over HTTPS. Both are required, not optional.</li>
				<li><strong>Never accept session IDs from URL parameters:</strong> URLs get logged everywhere—server logs, browser history, proxy logs. Session IDs in URLs are a security incident waiting to happen.</li>
				<li><strong>Session timeout and expiration:</strong> Set reasonable maxAge values. Short-lived sessions (1-2 hours) reduce the window of opportunity for attacks. Require re-authentication for sensitive operations.</li>
				<li><strong>HTTPS/HSTS for all authentication routes:</strong> Session cookies with Secure flag require HTTPS. Use HSTS headers to enforce it: <code>Strict-Transport-Security: max-age=31536000</code></li>
				<li><strong>Logout must destroy sessions entirely:</strong> Call <code>req.session.destroy()</code> and clear the cookie from the response. Half-destroyed sessions create vulnerabilities.</li>
				<li><strong>Use persistent session stores in production:</strong> MemoryStore loses all sessions on server restart and doesn't scale. Use Redis, MongoDB, or PostgreSQL for session storage.</li>
			</ul>
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

		<!-- Related Content -->
		<section class="article-section">
			<h2>Related content</h2>

			<div class="related-grid">
				<a href="/kb/security/vulnerabilities/jwt-vulnerabilities/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">JWT Vulnerabilities</div>
					<p class="related-card-description">Token-based authentication security issues</p>
				</a>
				<a href="/kb/security/vulnerabilities/csrf/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">CSRF (Cross-Site Request Forgery)</div>
					<p class="related-card-description">Unauthorized actions on behalf of authenticated users</p>
				</a>
				<a href="/kb/security/vulnerabilities/broken-access-control/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Broken Access Control</div>
					<p class="related-card-description">Authorization failures in web applications</p>
				</a>
				<a href="/kb/vibe-coding-tools/github-copilot/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">GitHub Copilot Security Patterns</div>
					<p class="related-card-description">Common vulnerabilities in Copilot-generated code</p>
				</a>
				<a href="/kb/security/stacks/nextjs-supabase/" class="card card-interactive related-card">
					<div class="related-card-category">Stack Guide</div>
					<div class="related-card-title">Next.js + Supabase Security</div>
					<p class="related-card-description">Authentication security checklist</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Find these before an attacker does</h2>
			<p>Session fixation bypasses 2FA. Don't find out the hard way.</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">
				Scan your auth code now
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
		flex-wrap: wrap;
		margin-bottom: 1rem;
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

	/* Attack Flow - Ordered List */
	.attack-flow {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-left: 3px solid var(--orange);
		padding: 1.5rem 1.5rem 1.5rem 2.5rem;
		margin: 1.5rem 0;
	}

	.attack-flow li {
		padding: 0.5rem 0;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.attack-flow strong {
		color: var(--text-primary);
	}

	/* AI Pattern Box */
	.ai-pattern-box {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.ai-pattern-box h3 {
		margin: 0 0 0.75rem;
		font-size: 1rem;
	}

	.ai-pattern-box > p {
		margin: 0 0 1rem;
		color: var(--text-secondary);
	}

	.pattern-explanation {
		margin: 1rem 0 0 !important;
		font-size: 0.875rem;
		color: var(--text-secondary);
		font-style: italic;
	}

	/* Tool Comparison Table */
	.tool-comparison {
		margin: 1.5rem 0;
	}

	.tool-comparison h3 {
		margin-bottom: 1rem;
	}

	.tool-comparison table {
		width: 100%;
		font-size: 0.875rem;
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

	/* Detection Steps */
	.detection-steps {
		margin: 1.5rem 0;
	}

	.detection-steps h3 {
		margin-bottom: 0.75rem;
		font-size: 1rem;
	}

	.devtools-test {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem 1.5rem 1.5rem 2.5rem;
		margin: 1rem 0;
	}

	.devtools-test li {
		padding: 0.5rem 0;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.devtools-test code {
		background: var(--bg-tertiary);
		padding: 0.125rem 0.375rem;
		font-size: 0.8125rem;
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

	.fix-section h4 {
		margin: 1.5rem 0 0.75rem;
		font-size: 1rem;
	}

	/* Code Comparison - Stacked vertically */
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
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
	}

	.framework-notes h4 {
		margin: 1.5rem 0 0.75rem;
		font-size: 1rem;
	}

	.framework-notes h4:first-child {
		margin-top: 0;
	}

	.resource-links {
		margin: 0.75rem 0 0;
		padding-left: 1.5rem;
	}

	.resource-links li {
		padding: 0.25rem 0;
		color: var(--text-secondary);
	}

	/* Best Practices List */
	.best-practices-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.best-practices-list li {
		padding: 0.75rem 0;
		border-bottom: 1px solid var(--border);
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.best-practices-list li:last-child {
		border-bottom: none;
	}

	.best-practices-list strong {
		color: var(--text-primary);
	}

	.best-practices-list code {
		background: var(--bg-tertiary);
		padding: 0.125rem 0.375rem;
		font-size: 0.8125rem;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.attack-flow,
		.devtools-test {
			padding: 1rem 1rem 1rem 2rem;
		}
	}
</style>
