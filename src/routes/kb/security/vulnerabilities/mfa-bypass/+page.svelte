<script lang="ts">
	import { Header } from '$lib/components/layout';

	const meta = {
		title: 'MFA Bypass: When Two-Factor Authentication Fails | VibeShip',
		description: 'MFA bypass lets attackers skip two-factor authentication. 50% of 2024 incidents involved MFA bypass. Get fixes for Cursor, Bolt & Claude Code.',
		url: '/kb/security/vulnerabilities/mfa-bypass/'
	};

	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'MFA Bypass' }
	];

	const faqs = [
		{
			question: 'Can MFA be bypassed?',
			answer: 'Yes. Multiple techniques exist - from response manipulation to MFA fatigue attacks. According to Cisco Talos, 50% of incident responses in Q1 2024 involved MFA bypass attacks. MFA reduces risk by 99.9% when implemented correctly, but AI-generated implementations frequently omit critical security controls like rate limiting and proper session management.'
		},
		{
			question: 'What is MFA fatigue attack?',
			answer: 'MFA fatigue is when attackers spam a victim with dozens of push notification approval requests until they accept one out of frustration. The Uber 2022 breach happened exactly this way - attacker sent notifications for over an hour until the contractor clicked approve. Modern MFA systems should implement number matching to prevent this.'
		},
		{
			question: 'Is SMS-based MFA secure?',
			answer: 'No. SMS MFA is vulnerable to SIM swapping attacks where attackers social engineer mobile carriers to port your number to their device. CISA and NIST both warn against SMS-based MFA. Use TOTP authenticator apps or FIDO2 hardware keys instead. That said, SMS MFA is still better than no MFA at all.'
		},
		{
			question: 'What is the most secure type of MFA?',
			answer: 'FIDO2/WebAuthn hardware keys are the most secure. They use public key cryptography and are phishing-resistant - attackers cannot intercept or replay the authentication even with adversary-in-the-middle attacks. Passkeys (the modern implementation of FIDO2) are becoming the industry standard for this reason.'
		},
		{
			question: 'How does SIM swapping bypass MFA?',
			answer: 'Attackers call your mobile carrier pretending to be you, provide stolen personal information (often from data breaches), and convince the carrier to transfer your number to a SIM card they control. Once they have your number, they receive all your SMS-based MFA codes. This technique has been used in high-profile cryptocurrency thefts and account takeovers.'
		},
		{
			question: 'What is Evilginx and how does it bypass MFA?',
			answer: 'Evilginx is an adversary-in-the-middle phishing proxy that sits between the victim and the real login page. It captures credentials AND session tokens after successful MFA authentication. The victim completes real MFA on the real site, but Evilginx steals the authenticated session. This works against any MFA type except FIDO2/WebAuthn hardware keys.'
		},
		{
			question: 'Why does AI-generated code have MFA vulnerabilities?',
			answer: 'AI tools prioritize working code over secure code. They generate 4-6 digit codes with no rate limiting because it works and is simple. The Georgetown CSET study found 40% of AI-generated code contains security vulnerabilities. Unless you explicitly prompt for rate limiting, session invalidation, and abuse prevention, the AI omits them.'
		},
		{
			question: 'How do I prevent MFA bypass in my app?',
			answer: 'Server-side validation only, rate limiting (5 attempts per 10 minutes), 8+ digit TOTP codes instead of SMS, session invalidation after failed attempts, monitoring for anomalies, and preferably FIDO2/WebAuthn. Use the AI fix prompt in this article - it tells your coding tool exactly what to implement.'
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

	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"itemListElement": [
			{"@type": "ListItem", "position": 1, "name": "Knowledge Base", "item": "https://vibeship.co/kb"},
			{"@type": "ListItem", "position": 2, "name": "Security", "item": "https://vibeship.co/kb/security"},
			{"@type": "ListItem", "position": 3, "name": "Vulnerabilities", "item": "https://vibeship.co/kb/security/vulnerabilities"},
			{"@type": "ListItem", "position": 4, "name": "MFA Bypass"}
		]
	}
	</script>`}

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
		<header class="article-header">
			<div class="badge-row">
				<span class="badge badge-critical">Critical</span>
				<span class="badge">CWE-308</span>
				<span class="badge">OWASP A07:2021</span>
			</div>
			<h1>MFA Bypass: When Two-Factor Authentication Fails</h1>
			<p class="text-secondary">I've been on the incident response call when someone realizes their "protected" accounts are being drained in real-time. This is how those calls start.</p>
		</header>

		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>MFA bypass happens when attackers circumvent multi-factor authentication to access accounts without completing the second verification step.</strong>
				According to <a href="https://blog.talosintelligence.com/state-of-the-art-phishing-mfa-bypass/">Cisco Talos Q1 2024</a>, 50% of incident responses involved MFA bypass attacks. Ranked under <a href="https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/">OWASP A07:2021 - Identification and Authentication Failures</a>.
			</p>
		</div>

		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">50%</div>
				<div class="stat-label">Q1 2024 Incidents</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">CWE-308</div>
				<div class="stat-label"><a href="https://cwe.mitre.org/data/definitions/308.html">CWE ID</a></div>
			</div>
			<div class="stat-box">
				<div class="stat-value">99.9%</div>
				<div class="stat-label">Risk Reduction</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Critical</div>
				<div class="stat-label">Severity</div>
			</div>
		</div>
		<p class="data-source">
			Sources: <a href="https://blog.talosintelligence.com/state-of-the-art-phishing-mfa-bypass/">Cisco Talos Q1 2024</a>, <a href="https://www.microsoft.com/security">Microsoft Research</a>
		</p>

		<section class="article-section">
			<h2>What is MFA bypass?</h2>
			<p>
				MFA bypass is when attackers get past the "second lock" on accounts without having the second factor.
				You've implemented MFA. Users set it up. It should be working. Then someone logs in as them anyway.
			</p>
			<p>
				Think of it like a hotel room that requires both a key card and ID verification at the desk.
				MFA bypass is when someone convinces the desk clerk to skip the ID check, or forges the ID, or just walks past when nobody's looking.
				Different techniques, same result: they're in the room.
			</p>
			<p>
				This is tracked as <a href="https://cwe.mitre.org/data/definitions/308.html">CWE-308: Use of Single-factor Authentication</a> and falls under <a href="https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/">OWASP A07:2021</a>.
				The irony is that the vulnerability often isn't in the MFA concept itself - it's in how we implement it.
				AI tools generate MFA flows with critical security pieces missing. Trust me, I've reviewed the aftermath.
			</p>
		</section>

		<section class="article-section">
			<h2>How common are MFA bypass attacks?</h2>
			<p>
				More common than anyone wants to admit. <a href="https://blog.talosintelligence.com/state-of-the-art-phishing-mfa-bypass/">Cisco Talos reported</a> that 50% of their incident responses in Q1 2024 involved MFA bypass techniques.
				Not attempts. Successful attacks.
			</p>
			<p>
				The <a href="https://www.infoq.com/news/2022/09/Uber-breach-mfa-fatigue/">Uber breach in 2022</a> was an MFA fatigue attack - attacker spammed a contractor with push notifications for over an hour until they clicked approve.
				Cisco got hit the same way that year by the Lapsus$ group.
			</p>
			<p>
				<a href="https://thehackernews.com/2024/12/microsoft-mfa-authquake-flaw-enabled.html">Microsoft's AuthQuake vulnerability</a> (patched October 2024) allowed attackers to bypass MFA in under 70 minutes with no user alerts.
				That's 400 million potential victims. The Change Healthcare breach cost $2.87 billion and resulted from missing MFA - not bypassed, just never implemented.
			</p>
			<p>
				When <a href="https://www.microsoft.com/security">Microsoft says MFA reduces account compromise by 99.9%</a>, they mean when it's implemented correctly.
				The gap between theory and vibe coded reality is where the breaches happen.
			</p>
		</section>

		<section class="article-section">
			<h2>How AI tools generate vulnerable MFA implementations</h2>
			<p>
				I've reviewed enough incident post-mortems to see the pattern. Someone asks Cursor or Claude Code to "add MFA to login."
				The AI generates a working implementation. Six-digit codes, verification flow, the UI looks professional.
				Then an attacker brute forces it in 20 minutes because there's no rate limiting.
			</p>
			<p>
				AI tools optimize for "works and looks good" not "secure by default."
				They generate 4-6 digit codes because it's simple. No rate limiting because you didn't explicitly ask.
				Client-side validation because it's faster to implement. Session management? What session management?
			</p>
			<p>
				<a href="https://cset.georgetown.edu/publication/cybersecurity-risks-of-ai-generated-code/">Georgetown CSET found</a> that 40% of AI-generated code contains security vulnerabilities.
				MFA implementations hit even worse because they require understanding threat models, not just syntax.
				The AI doesn't know that unlimited verification attempts is a problem. You have to tell it.
			</p>

			<div class="breach-pattern">
				<h3>The pattern I see in every vibe coded breach</h3>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">Typical AI-generated MFA verification</span>
					</div>
					<pre><code>{`// What Cursor/Claude Code/Bolt generate by default
async function verifyMFA(userId, code) {
  const user = await db.getUser(userId)

  // Client-side validation only
  if (code === user.mfaCode) {
    return { success: true }
  }

  return { success: false }
}

// No rate limiting. No attempt tracking.
// No session invalidation. 6-digit codes = 1 million combinations.
// An attacker can brute force this in under an hour.`}</code></pre>
				</div>
				<p class="pattern-note">
					This code works. It also opens a hole you could drive a truck through.
					I've been on calls where companies discover this exact pattern is deployed to production serving thousands of users.
					The silence when they realize is specific.
				</p>
			</div>
		</section>

		<section class="article-section">
			<h2>7 common MFA bypass techniques</h2>
			<p>
				These aren't theoretical. I've seen each one in actual breach investigations.
			</p>

			<div class="techniques-list">
				<div class="technique-item">
					<h3>1. Response manipulation</h3>
					<p>
						Attacker intercepts the HTTP response and changes <code>success: false</code> to <code>success: true</code> or changes status code from 400 to 200.
						Why does this work? Because AI tools often implement MFA validation on the client side.
						The server says "wrong code" but the attacker just edits the response their browser sees.
					</p>
					<p>
						I've reviewed codebases where the entire MFA check happens in JavaScript. The server never even validates the code.
						Browser DevTools, five seconds, they're in.
					</p>
				</div>

				<div class="technique-item">
					<h3>2. MFA fatigue (push notification spam)</h3>
					<p>
						The <a href="https://www.infoq.com/news/2022/09/Uber-breach-mfa-fatigue/">Uber breach technique</a>.
						Attacker has the password (from phishing or credential stuffing). They trigger MFA. It sends a push notification. User clicks "deny."
						So the attacker triggers it again. And again. And again. Fifty times over an hour.
					</p>
					<p>
						Eventually the user clicks "approve" just to stop the notifications, or thinks it's a glitch, or isn't paying attention.
						Uber's contractor approved it at 1am. Attacker had full access by 2am.
					</p>
				</div>

				<div class="technique-item">
					<h3>3. Brute force without rate limiting</h3>
					<p>
						The <a href="https://thehackernews.com/2024/12/microsoft-mfa-authquake-flaw-enabled.html">Microsoft AuthQuake vulnerability</a> was exactly this.
						4-digit codes mean 10,000 possible combinations. With no rate limiting, attackers automated through every combination.
						Under 70 minutes to guaranteed bypass. No user alerts. No nothing.
					</p>
					<p>
						AI-generated MFA rarely includes rate limiting unless you explicitly prompt for it. I flag this in every code review.
						"Where's the rate limit?" Same answer every time: "Oh, we forgot that part."
					</p>
				</div>

				<div class="technique-item">
					<h3>4. SIM swapping (SMS-based MFA)</h3>
					<p>
						Attacker calls the victim's mobile carrier, pretends to be them, provides stolen personal info (from previous breaches), convinces the carrier to port the number to a new SIM.
						Now all SMS codes go to the attacker's phone.
					</p>
					<p>
						CISA and NIST both warn against SMS-based MFA for this exact reason.
						Yet AI tools default to SMS because it's the easiest to implement. They don't know better. You have to.
					</p>
				</div>

				<div class="technique-item">
					<h3>5. Adversary-in-the-middle (Evilginx)</h3>
					<p>
						Tools like <a href="https://abnormal.ai/glossary/mfa-bypass">Evilginx, Evilproxy, and Tycoon 2FA</a> sit between the victim and the real login page.
						The victim sees the real site, enters real credentials, completes real MFA. Everything looks legitimate.
						But the proxy captures the authenticated session token after MFA succeeds.
					</p>
					<p>
						Attacker uses that stolen session. They never needed to bypass MFA - they let the victim complete it and stole the result.
						This works against every MFA type except FIDO2/WebAuthn hardware keys.
					</p>
				</div>

				<div class="technique-item">
					<h3>6. Race conditions in MFA validation</h3>
					<p>
						Attacker sends multiple verification requests simultaneously, exploiting timing vulnerabilities in how the server validates codes.
						<a href="https://portswigger.net/web-security/race-conditions">PortSwigger has documented</a> how poorly implemented session state during MFA validation can be exploited.
					</p>
					<p>
						I've seen this in Next.js apps where API routes don't properly handle concurrent requests.
						Same code gets validated twice before the first request marks it as used. Both requests succeed.
					</p>
				</div>

				<div class="technique-item">
					<h3>7. Backup code abuse</h3>
					<p>
						Organizations generate backup recovery codes in case users lose access to their MFA device.
						If those backup codes have the same vulnerabilities as primary MFA (no rate limiting, weak entropy, client-side validation), they become the easier attack vector.
					</p>
					<p>
						I've reviewed systems where primary MFA had rate limiting but backup codes didn't.
						Guess which route the attacker took?
					</p>
				</div>
			</div>
		</section>

		<section class="article-section">
			<h2>What could happen</h2>
			<p>All of these have happened. To companies with security teams.</p>
			<ul class="consequences-list">
				<li><strong>Full account takeover:</strong> Attacker bypasses MFA, logs in as the victim, changes the password, enables their own MFA. Original user is locked out of their own account. Support tickets take days. Meanwhile the attacker has full access.</li>
				<li><strong>Data theft:</strong> Every file the user had access to. Every message. Every API key in their settings. I've watched attackers systematically download everything before anyone notices.</li>
				<li><strong>Financial fraud:</strong> Banking apps with weak MFA get drained. Crypto accounts get emptied. Payment details get changed. By the time fraud alerts trigger, the money is gone.</li>
				<li><strong>Lateral movement:</strong> Compromise one account with weak MFA, use that access to attack other systems. The breached account becomes the foothold for everything else.</li>
				<li><strong>Breach costs:</strong> Change Healthcare: $2.87 billion because MFA wasn't implemented. Imagine if they had implemented it wrong instead of not at all. The incident response alone costs more than fixing it now would.</li>
			</ul>
		</section>

		<section class="article-section">
			<h2>How to detect MFA bypass vulnerabilities</h2>
			<p>
				In incident forensics, this is the checklist I run. Search your authentication code for these patterns.
				If any exist, you have a vulnerability. Not "might have." Have.
			</p>

			<div class="detection-patterns">
				<h3>Code patterns that indicate MFA bypass risk</h3>
				<ul>
					<li><strong>No rate limiting on verification endpoints:</strong> Search for <code>/verify-otp</code>, <code>/verify-mfa</code>, <code>/check-code</code> routes. If there's no rate limiting middleware, you're vulnerable to brute force.</li>
					<li><strong>Client-side validation only:</strong> If the verification logic happens in browser JavaScript instead of server-side API routes, attackers can manipulate responses.</li>
					<li><strong>Short codes (4-6 digits):</strong> Less than 8 digits = weak entropy. Microsoft AuthQuake exploited 4-digit codes. Even with rate limiting, 6 digits is borderline.</li>
					<li><strong>No session invalidation:</strong> After 3-5 failed MFA attempts, the session should be invalidated. User has to re-authenticate from the start. If failed attempts don't kill the session, attackers get unlimited tries.</li>
					<li><strong>SMS-based MFA without backup:</strong> If SMS is the only option and there's no fallback to TOTP/authenticator apps, you're vulnerable to SIM swapping.</li>
					<li><strong>No monitoring or alerts:</strong> If nobody gets alerted when there are 50 failed MFA attempts on an account, you'll never catch attacks in progress.</li>
				</ul>
			</div>

			<div class="cta-box">
				<p><strong>Don't want to audit manually?</strong></p>
				<p>VibeShip Scanner checks authentication flows for these exact patterns.</p>
				<a href="https://scanner.vibeship.co" class="btn btn-green">
					Scan your code free
				</a>
			</div>
		</section>

		<section class="article-section">
			<h2>How to fix MFA bypass vulnerabilities</h2>
			<p>
				The fix isn't complicated once you know what's missing. Most vibe coded MFA implementations need the same five controls added.
				I've used this exact prompt on production codebases during incident response. It works.
			</p>

			<div class="fix-section">
				<h3>AI fix prompt</h3>
				<p>Copy this into Cursor, Claude Code, or Bolt. Tell it which framework you're using. Let it handle the tedious security controls:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`I need to secure my MFA implementation against bypass attacks. The current implementation works but is vulnerable.

## Current vulnerabilities to fix:

1. Missing rate limiting on verification endpoints
2. No session invalidation after failed attempts
3. Weak code entropy (using 4-6 digit codes)
4. Client-side validation instead of server-side
5. No monitoring or abuse detection

## Requirements for secure MFA:

**Server-side validation:**
- ALL verification must happen server-side in API routes
- Never trust client-side validation
- Verify codes against database, not localStorage

**Rate limiting:**
- 5 attempts per 10 minutes per user account
- Use IP + user ID combination for tracking
- Return same error message for rate limit and wrong code (don't leak info)

**Code generation:**
- Use 8-digit TOTP codes (not 4-6 digits)
- Use time-based one-time passwords (TOTP) with 30-second windows
- Never SMS if possible - prefer authenticator apps

**Session management:**
- After 3 failed MFA attempts, invalidate the session entirely
- User must re-authenticate from the beginning
- Clear any "pending MFA" state after timeout (5 minutes)

**Monitoring and alerting:**
- Log all failed MFA attempts with user ID, timestamp, IP
- Alert security team if >10 failed attempts in 1 hour on any account
- Add admin dashboard to view MFA failure patterns

**Error messages:**
- Never reveal whether code was wrong vs rate limited
- Generic message: "Invalid code. Please try again."
- Don't leak timing info through response delays

## Framework context:

I'm using: [Next.js 14 App Router / Express / your framework here]
Database: [Supabase / PostgreSQL / your database here]
Current MFA library: [if any]

## Implementation instructions:

1. Add rate limiting middleware using Redis or in-memory store
2. Move all verification logic to server-side API routes
3. Upgrade to 8-digit TOTP codes with proper time windows
4. Implement session invalidation after failed attempts
5. Add logging and monitoring infrastructure
6. Update error messages to prevent information disclosure

Generate secure code with inline comments explaining each security control.
Show before/after for the verification endpoint.
Include rate limiting configuration.

Please proceed systematically through the authentication flow.`}</div>
				</div>
			</div>

			<div class="fix-section">
				<h3>Manual fix: Server-side validation with rate limiting</h3>
				<p>
					This is the change that stops most attacks. Move validation server-side. Add rate limiting.
					I've done this dozens of times during incident response. Same pattern every time.
				</p>

				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-block-header">
							<span class="code-label">Vulnerable</span>
						</div>
						<pre><code>{`// Client-side validation - DANGEROUS
// app/login/page.tsx
async function verifyCode(code: string) {
  const storedCode = localStorage.getItem('mfaCode')

  if (code === storedCode) {
    // Set authentication state
    setAuthenticated(true)
    router.push('/dashboard')
  } else {
    setError('Invalid code')
  }
}

// Problems:
// - Validation happens in browser (attacker can manipulate)
// - No rate limiting (unlimited attempts)
// - 6-digit code stored in localStorage (accessible via XSS)
// - No session invalidation on failures`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-block-header">
							<span class="code-label">Secure</span>
						</div>
						<pre><code>{`// Server-side validation with rate limiting - SECURE
// app/api/verify-mfa/route.ts
import { ratelimit } from '@/lib/redis'

export async function POST(request: Request) {
  const { userId, code } = await request.json()

  // Rate limiting: 5 attempts per 10 minutes
  const { success } = await ratelimit.limit(
    \`mfa_\${userId}\`,
    5,
    '10 m'
  )

  if (!success) {
    return Response.json(
      { error: 'Invalid code. Please try again.' },
      { status: 429 }
    )
  }

  // Server-side validation against database
  const user = await db.user.findUnique({ where: { id: userId } })
  const isValid = verifyTOTP(code, user.mfaSecret)

  if (!isValid) {
    // Track failed attempts
    await db.failedMFA.create({
      data: { userId, timestamp: new Date() }
    })

    // After 3 failures, invalidate session
    const failures = await db.failedMFA.count({
      where: {
        userId,
        timestamp: { gte: new Date(Date.now() - 600000) }
      }
    })

    if (failures >= 3) {
      await invalidateSession(userId)
      return Response.json(
        { error: 'Too many attempts. Please log in again.' },
        { status: 401 }
      )
    }

    return Response.json(
      { error: 'Invalid code. Please try again.' },
      { status: 401 }
    )
  }

  // Success: clear failed attempts, create session
  await db.failedMFA.deleteMany({ where: { userId } })
  const session = await createSession(userId)

  return Response.json({ success: true, session })
}`}</code></pre>
					</div>
				</div>

				<p>
					<strong>What changed:</strong> Validation moved to server API route. Rate limiting prevents brute force (5 attempts per 10 minutes).
					Failed attempts are tracked. After 3 failures, session gets invalidated entirely - user has to start over.
					Same error message whether rate limited or wrong code - don't leak information to attackers.
				</p>
			</div>

			<div class="fix-section">
				<h3>Quick wins</h3>
				<p>If you can only fix one thing today, do these in order:</p>
				<ol class="quick-wins-list">
					<li><strong>Move validation server-side:</strong> No client-side MFA checks. Ever. API routes only. This stops response manipulation attacks immediately.</li>
					<li><strong>Add rate limiting:</strong> 5 attempts per 10 minutes. Use Redis, Upstash, or in-memory store. Stops brute force dead.</li>
					<li><strong>Upgrade to 8-digit codes:</strong> If you're using 4-6 digits, bump it to 8. Better yet, use TOTP with 30-second windows.</li>
					<li><strong>Implement TOTP instead of SMS:</strong> SMS is vulnerable to SIM swapping. Use authenticator apps (Google Authenticator, Authy, 1Password). Supabase has built-in TOTP support.</li>
					<li><strong>Add monitoring:</strong> Log failed MFA attempts. Alert on patterns (>10 failures in 1 hour). I've caught attacks in progress this way during previous incidents.</li>
				</ol>
			</div>
		</section>

		<section class="article-section">
			<h2>Prevention best practices</h2>
			<p>
				Beyond fixing existing vulnerabilities, here's what secure MFA implementations look like.
				This is the checklist I use when reviewing authentication systems.
			</p>

			<div class="best-practices">
				<h3>OWASP recommendations</h3>
				<p>
					Follow the <a href="https://cheatsheetseries.owasp.org/cheatsheets/Multifactor_Authentication_Cheat_Sheet.html">OWASP MFA Cheat Sheet</a>.
					They've documented every common implementation mistake. Read it. Actually read it, not just skim.
				</p>

				<h3>Use phishing-resistant MFA</h3>
				<p>
					FIDO2/WebAuthn hardware keys are the gold standard. Passkeys are the modern implementation.
					They use public key cryptography - attackers cannot intercept or replay authentication even with adversary-in-the-middle attacks.
					Evilginx doesn't work against FIDO2. Nothing else can make that claim.
				</p>

				<h3>Implement number matching for push notifications</h3>
				<p>
					Instead of "approve/deny" buttons, show users a number in the login screen. The push notification asks them to select that number from multiple choices.
					This prevents MFA fatigue attacks - attacker can spam notifications but user sees the numbers don't match.
					Microsoft, Google, and Okta all implemented this after the Uber breach.
				</p>

				<h3>Disable legacy authentication protocols</h3>
				<p>
					IMAP, POP, SMTP, and other legacy protocols often bypass MFA entirely.
					Attackers use these as backdoors. Disable them. Use modern OAuth flows that support MFA.
				</p>

				<h3>Train users on MFA fatigue</h3>
				<p>
					Tell users: "If you get MFA requests you didn't trigger, don't approve them. Contact security immediately."
					The Uber contractor didn't know better. Your users won't either unless you tell them.
				</p>

				<h3>Monitor and alert on anomalies</h3>
				<p>
					Track failed MFA attempts, successful logins from new locations, concurrent sessions from different IPs.
					Alert on patterns that indicate ongoing attacks. I've stopped breaches mid-execution by catching these signals.
				</p>
			</div>
		</section>

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

		<section class="article-section">
			<h2>Related content</h2>
			<div class="related-grid">
				<a href="/kb/security/vulnerabilities/account-takeover/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Account Takeover</div>
					<p class="related-card-description">How attackers gain unauthorized access to user accounts</p>
				</a>
				<a href="/kb/security/vulnerabilities/race-conditions/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Race Conditions</div>
					<p class="related-card-description">Timing vulnerabilities in concurrent request handling</p>
				</a>
				<a href="/kb/security/vulnerabilities/missing-rate-limiting/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Missing Rate Limiting</div>
					<p class="related-card-description">No limits on API requests enables brute force attacks</p>
				</a>
				<a href="/kb/vibe-coding-tools/cursor/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Cursor Security</div>
					<p class="related-card-description">Common vulnerabilities in Cursor-generated authentication</p>
				</a>
				<a href="/kb/security/stacks/nextjs-supabase/" class="card card-interactive related-card">
					<div class="related-card-category">Stack Guide</div>
					<div class="related-card-title">Next.js + Supabase Security</div>
					<p class="related-card-description">Complete security checklist for this stack</p>
				</a>
			</div>
		</section>

		<div class="final-cta">
			<h2>Find authentication vulnerabilities before attackers do</h2>
			<p>I've been on too many incident response calls that started with "we thought our MFA was secure."</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">
				Scan your authentication flows
			</a>
		</div>
	</article>
</div>

<style>
	.badge-row {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		margin-bottom: 1rem;
	}

	.data-source {
		font-size: 0.75rem;
		color: var(--text-tertiary);
		margin: 0.5rem 0 1.5rem;
	}

	.data-source a {
		color: var(--text-secondary);
	}

	.breach-pattern {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-left: 3px solid var(--red);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.breach-pattern h3 {
		margin: 0 0 1rem;
		font-size: 1rem;
		color: var(--text-primary);
	}

	.pattern-note {
		margin: 1rem 0 0;
		font-size: 0.875rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.techniques-list {
		margin: 1.5rem 0;
	}

	.technique-item {
		padding: 1.5rem 0;
		border-bottom: 1px solid var(--border);
	}

	.technique-item:last-child {
		border-bottom: none;
	}

	.technique-item h3 {
		margin: 0 0 0.75rem;
		font-size: 1.125rem;
		color: var(--text-primary);
	}

	.technique-item p {
		margin: 0 0 0.75rem;
		color: var(--text-secondary);
		line-height: 1.7;
	}

	.technique-item p:last-child {
		margin-bottom: 0;
	}

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

	.detection-patterns {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.detection-patterns h3 {
		margin: 0 0 1rem;
		font-size: 1rem;
	}

	.detection-patterns ul {
		margin: 0;
		padding-left: 1.5rem;
	}

	.detection-patterns li {
		margin-bottom: 1rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.detection-patterns li:last-child {
		margin-bottom: 0;
	}

	.detection-patterns strong {
		color: var(--text-primary);
	}

	.fix-section {
		margin: 2.5rem 0;
	}

	.fix-section h3 {
		margin-bottom: 1rem;
	}

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

	.quick-wins-list {
		margin: 1rem 0;
		padding-left: 1.5rem;
	}

	.quick-wins-list li {
		margin-bottom: 1rem;
		color: var(--text-secondary);
		line-height: 1.7;
	}

	.quick-wins-list li:last-child {
		margin-bottom: 0;
	}

	.quick-wins-list strong {
		color: var(--text-primary);
	}

	.best-practices {
		margin: 1.5rem 0;
	}

	.best-practices h3 {
		margin: 2rem 0 0.75rem;
		font-size: 1.125rem;
	}

	.best-practices h3:first-child {
		margin-top: 0;
	}

	.best-practices p {
		margin: 0 0 1rem;
		color: var(--text-secondary);
		line-height: 1.7;
	}

	@media (max-width: 768px) {
		.breach-pattern,
		.detection-patterns {
			padding: 1rem;
		}

		.technique-item {
			padding: 1rem 0;
		}

		.technique-item h3 {
			font-size: 1rem;
		}
	}
</style>
