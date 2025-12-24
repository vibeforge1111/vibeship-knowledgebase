<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Clickjacking: Find & Fix in AI-Generated Code | VibeShip',
		description: 'Clickjacking tricks users into clicking invisible UI elements. Found in 80%+ of web apps. Get copy-paste fixes for Next.js, Express & SvelteKit.',
		url: '/kb/security/vulnerabilities/clickjacking/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Clickjacking' }
	];

	// Real external data sources
	const securityData = {
		cweId: 'CWE-1021',
		cweSource: 'https://cwe.mitre.org/data/definitions/1021.html',
		owaspCategory: 'A01:2021 - Broken Access Control',
		owaspSource: 'https://owasp.org/Top10/A01_2021-Broken_Access_Control/',
		severity: 'Medium'
	};

	// Industry statistics
	const stats = {
		prevalence: '80%+',
		instances: '1,226',
		sampleSize: '~500',
		source: 'Claranet 2024',
		sourceUrl: 'https://www.claranet.com/uk/blog/claranets-top-10-web-application-vulnerabilities-found-2024/'
	};

	// FAQ data for schema
	const faqs = [
		{
			question: 'What is clickjacking?',
			answer: 'Clickjacking (UI redressing) tricks users into clicking invisible UI elements by overlaying transparent iframes over legitimate pages. Think of it like a transparent sheet of glass placed over your screen with different buttons underneath - you click where you see, but activate what\'s hidden. It\'s ranked under OWASP A01:2021 - Broken Access Control.'
		},
		{
			question: 'How do I protect my website from clickjacking?',
			answer: 'Use the X-Frame-Options header (set to DENY or SAMEORIGIN) and CSP frame-ancestors directive. Modern approach: Configure Content-Security-Policy: frame-ancestors \'self\' in your response headers. For Express, use Helmet.js. For Next.js, configure in next.config.js. Both headers provide defense in depth.'
		},
		{
			question: 'What\'s the difference between X-Frame-Options and CSP frame-ancestors?',
			answer: 'X-Frame-Options is the older header (DENY/SAMEORIGIN/ALLOW-FROM) supported by legacy browsers. CSP frame-ancestors is the modern replacement with more flexibility (allows multiple trusted domains). Browsers that support frame-ancestors ignore X-Frame-Options. Best practice: use both for maximum compatibility. OWASP recommends frame-ancestors as primary defense.'
		},
		{
			question: 'Can clickjacking steal my data?',
			answer: 'Yes, but indirectly. Clickjacking tricks you into performing actions you didn\'t intend - like granting OAuth permissions, clicking "Confirm Payment," or changing account settings. It can also enable cookiejacking (drag-and-drop cookie theft) or credential theft through fake overlays. Claranet found it in 80%+ of applications tested in 2024.'
		},
		{
			question: 'Is clickjacking still a threat in 2025?',
			answer: 'Yes. Despite modern browser protections, clickjacking remains prevalent. Claranet documented 1,226 instances in 2024 penetration tests. New variants like DoubleClickjacking (exploiting mousedown/onclick timing) emerged in 2024. The threat persists because many applications still don\'t implement proper frame-ancestors or X-Frame-Options headers.'
		},
		{
			question: 'What is likejacking on social media?',
			answer: 'Likejacking is a specific clickjacking attack that hijacks social media "like" or "follow" buttons. Users think they\'re clicking a normal button, but they\'re actually clicking an invisible Facebook Like or Twitter Follow button. This makes users unknowingly endorse malicious pages or spread scam content through their social networks.'
		},
		{
			question: 'How do I test if my site is vulnerable to clickjacking?',
			answer: 'Quick browser test: Create an HTML file with an iframe pointing to your site. If your site loads in the iframe, you\'re vulnerable. Better: Check HTTP headers in browser DevTools Network tab. Look for X-Frame-Options or Content-Security-Policy with frame-ancestors. If missing, your site can be framed. Online tools like securityheaders.com also check this automatically.'
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
			{"@type": "ListItem", "position": 4, "name": "Clickjacking"}
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
				<span class="badge badge-medium">Medium</span>
				<span class="badge">{securityData.cweId}</span>
				<span class="badge">OWASP A01:2021</span>
			</div>
			<h1>Clickjacking in AI-Generated Web Apps</h1>
			<p class="text-secondary">When invisible UI layers trick users into unwanted actions - and why AI tools skip the protection by default</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Clickjacking tricks users into clicking invisible UI elements by layering transparent iframes over legitimate pages.</strong>
				Found in <a href="{stats.sourceUrl}">{stats.prevalence} of web applications tested in 2024</a> (Claranet research). Prevent it with X-Frame-Options or CSP frame-ancestors headers - but AI coding tools don't add these by default, leaving vibe coded apps exposed.
			</p>
		</div>

		<!-- Stats Box -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">{stats.prevalence}</div>
				<div class="stat-label">Apps Affected</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">{stats.instances}</div>
				<div class="stat-label">Instances Found</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">{securityData.severity}</div>
				<div class="stat-label">Severity</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">{securityData.cweId}</div>
				<div class="stat-label"><a href={securityData.cweSource}>CWE ID</a></div>
			</div>
		</div>
		<p class="data-source">
			Source: <a href={stats.sourceUrl}>{stats.source} Web Application Security Testing</a>
		</p>

		<!-- What Is It (@samexplains - patient teacher) -->
		<section class="article-section">
			<h2>What is clickjacking?</h2>
			<p>
				Let me walk you through this step by step. Clickjacking is when an attacker overlays your website with an invisible iframe containing a different site entirely. You see one thing, but you're actually clicking on something else hidden beneath.
			</p>
			<p>
				Here's the analogy that makes it click: imagine a transparent sheet of glass placed over your computer screen, with different buttons printed on it. You think you're clicking "Download Free eBook," but you're actually clicking "Grant Camera Access" on the invisible layer underneath. Your eyes see the decoy, your mouse clicks the real target.
			</p>
			<p>
				According to <a href="{securityData.owaspSource}">OWASP's classification</a>, clickjacking falls under <a href="{securityData.cweSource}">CWE-1021: Improper Restriction of Rendered UI Layers or Frames</a>. The technical name is "UI redressing" - attackers literally redress your interface in invisible clothing.
			</p>
			<p>
				The consequences? Users unknowingly grant OAuth permissions, "like" malicious Facebook pages, confirm payments, change account settings, or enable device access. All because they clicked what they saw instead of what was actually there.
			</p>
		</section>

		<!-- How It Works (@samexplains - clear explanation) -->
		<section class="article-section">
			<h2>How clickjacking works</h2>
			<p>
				The attack is surprisingly simple once you see the mechanics. Let me break it down into the four steps attackers use:
			</p>

			<div class="attack-steps">
				<div class="attack-step">
					<div class="step-number">1</div>
					<div class="step-content">
						<h3>Create the decoy site</h3>
						<p>Attacker builds a fake page that looks legitimate - "Win a Free iPhone!" or "Download This PDF." Something users want to click.</p>
					</div>
				</div>

				<div class="attack-step">
					<div class="step-number">2</div>
					<div class="step-content">
						<h3>Embed the target in an iframe</h3>
						<p>Your legitimate site (the one with the real action button) gets loaded in an iframe positioned exactly where users will click.</p>
					</div>
				</div>

				<div class="attack-step">
					<div class="step-number">3</div>
					<div class="step-content">
						<h3>Hide the iframe with CSS</h3>
						<p>The iframe is made invisible using <code>opacity: 0</code> and positioned above the decoy button using <code>z-index</code>. Users see the decoy, click the hidden iframe.</p>
					</div>
				</div>

				<div class="attack-step">
					<div class="step-number">4</div>
					<div class="step-content">
						<h3>User performs unwanted action</h3>
						<p>Click registers on the hidden iframe. User thinks they downloaded an eBook. They actually granted camera permissions or confirmed a payment.</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Attack Variants (@samexplains - categorizing types) -->
		<section class="article-section">
			<h2>Types of clickjacking attacks</h2>
			<p>
				Clickjacking comes in several flavors. Each exploits the same invisible iframe technique, but targets different user actions. Let me show you the most common variants you'll encounter:
			</p>

			<div class="attack-types">
				<div class="attack-type-card">
					<h3>Likejacking (Social Media)</h3>
					<p>
						Users think they're clicking a normal button, but they're actually clicking an invisible Facebook "Like" or Twitter "Follow" button. In 2011, this spread across Italy when users unknowingly liked malicious pages. In 2015, a CBC journalist accidentally "liked" the Conservative Party page this way. The damage? Your social credibility endorses scams.
					</p>
				</div>

				<div class="attack-type-card">
					<h3>Cursorjacking</h3>
					<p>
						Attacker offsets the cursor position so what users see doesn't match where they're actually clicking. The fake cursor shows you clicking "Cancel," but your real cursor clicks "Allow." Firefox on Mac OS X had this vulnerability until v37.0. Less common than classic clickjacking, but absolutely devastating when it works.
					</p>
				</div>

				<div class="attack-type-card">
					<h3>Cookiejacking</h3>
					<p>
						Exploits drag-and-drop features to steal session cookies. User drags what they think is a file or image, but they're actually dragging their cookie data into an attacker-controlled text field. Once cookies are stolen, account takeover follows immediately.
					</p>
				</div>

				<div class="attack-type-card">
					<h3>DoubleClickjacking (New 2024)</h3>
					<p>
						The newest variant exploits the timing gap between <code>mousedown</code> and <code>onclick</code> events. Attackers swap the iframe content between these events, bypassing traditional frame-busting protections. Discovered in 2024, this shows clickjacking is still evolving.
					</p>
				</div>
			</div>
		</section>

		<!-- AI Tool Patterns (@samexplains - explaining the gap) -->
		<section class="article-section">
			<h2>Why AI tools generate clickjacking vulnerabilities</h2>
			<p>
				Here's what I see constantly with AI-generated code: the app works perfectly, users can log in and use features, everything functions as expected. But security headers? Completely missing.
			</p>
			<p>
				AI tools optimize for "functional code that runs." They generate Express servers without Helmet, Next.js configs without security headers, SvelteKit hooks with no frame protection. The default behavior is vulnerable.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">What Cursor/Bolt/Claude Code generate by default</span>
				</div>
				<pre><code>{`// Express server - no security headers
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000);

// This app is fully functional AND fully frameable
// Attacker can embed it in an iframe immediately`}</code></pre>
			</div>

			<p>
				The AI doesn't know this is wrong. Its training data is full of tutorial code that skips security for simplicity. When you ask for "a basic Express server," you get basic Express - which means no X-Frame-Options, no CSP, no protection.
			</p>
			<p>
				VibeShip Scanner data shows this pattern across all major AI tools: functional code ships without security headers. The fix takes 5 lines. The oversight costs real attacks.
			</p>
		</section>

		<!-- What Could Happen (@samexplains - explaining consequences) -->
		<section class="article-section">
			<h2>What could happen if I have clickjacking vulnerabilities?</h2>
			<p>
				Let me be clear about the realistic threats here. Clickjacking isn't as immediately devastating as SQL injection, but the consequences are real and documented:
			</p>

			<ul class="consequences-list">
				<li><strong>Unauthorized account actions:</strong> Users unknowingly like pages, follow accounts, share posts, or send messages. Social media platforms saw waves of this in 2009-2015. Your users' reputations get weaponized to spread malicious content.</li>
				<li><strong>OAuth permission hijacking:</strong> "Grant this app access to your photos" - except users think they're clicking "Download PDF." Suddenly attackers have API access to user data through legitimate OAuth tokens. No password needed.</li>
				<li><strong>Payment confirmation manipulation:</strong> One-click purchase buttons are prime targets. Users think they're closing a pop-up, they're actually confirming a $500 transaction. Payment processors have documented this attack pattern.</li>
				<li><strong>Device permission theft:</strong> Camera, microphone, location access - all granted through invisible permission prompts. Adobe Flash settings were compromised this way in 2008. Modern browser APIs face the same risk.</li>
				<li><strong>Credential theft through overlays:</strong> Fake login forms layered over real ones. User enters credentials, attacker captures everything. Combines clickjacking with phishing for maximum damage.</li>
			</ul>
		</section>

		<!-- Detection (@samexplains - teaching how to check) -->
		<section class="article-section">
			<h2>How to detect clickjacking vulnerabilities</h2>
			<p>
				Let me show you three ways to check if your site is vulnerable. Start with the quick browser test, then verify with headers, then search your code.
			</p>

			<h3>Quick browser test</h3>
			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">test.html</span>
				</div>
				<pre><code>{`<!-- Save this as test.html and open in browser -->
<!DOCTYPE html>
<html>
<body>
  <iframe src="https://yoursite.com" width="500" height="500"></iframe>
</body>
</html>

<!-- If your site loads in the iframe, you're vulnerable -->
<!-- If you see "refused to connect" or blank iframe, you're protected -->`}</code></pre>
			</div>

			<h3>Check HTTP headers</h3>
			<p>
				Open your site in Chrome DevTools (F12), go to Network tab, reload the page, click the document request, look at Response Headers. You need to see either:
			</p>
			<ul>
				<li><code>X-Frame-Options: DENY</code> or <code>X-Frame-Options: SAMEORIGIN</code></li>
				<li><code>Content-Security-Policy: frame-ancestors 'self'</code> (or 'none')</li>
			</ul>
			<p>
				Missing both? Your site can be framed by attackers. Online tools like <a href="https://securityheaders.com">securityheaders.com</a> automate this check.
			</p>

			<h3>Code patterns to search</h3>
			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Search your codebase for these patterns</span>
				</div>
				<pre><code>{`// Express - missing helmet()
app.use(helmet())  // Good if present, bad if missing

// Next.js - no headers() in config
async headers() {  // Good if present, bad if missing

// SvelteKit - no handle hook
export const handle  // Good if present, bad if missing

// Look for setHeader calls
response.setHeader('X-Frame-Options')  // Good
response.setHeader('Content-Security-Policy')  // Good`}</code></pre>
			</div>

			<div class="cta-box">
				<p><strong>Don't want to search manually?</strong></p>
				<p>VibeShip Scanner automatically detects missing X-Frame-Options and CSP frame-ancestors headers.</p>
				<a href="https://scanner.vibeship.co" class="btn btn-green">
					Scan your code free
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M5 12h14M12 5l7 7-7 7"/>
					</svg>
				</a>
			</div>
		</section>

		<!-- How to Fix (@samexplains - teaching the solution) -->
		<section class="article-section">
			<h2>How to fix clickjacking vulnerabilities</h2>
			<p>
				The fix is straightforward: add security headers that tell browsers "don't let other sites frame my content." Here's how to do it for your stack, starting with an AI prompt that handles the tedious parts for you.
			</p>

			<!-- AI Fix Prompt -->
			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>Copy this prompt into Cursor, Claude Code, or Bolt. It's been tested on production codebases and handles framework-specific configurations correctly:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Add clickjacking protection to my application by implementing proper security headers.

## What I need

1. X-Frame-Options header set to SAMEORIGIN (or DENY if no framing needed)
2. Content-Security-Policy with frame-ancestors directive
3. Implementation that works with my current stack

## My stack

[Insert: Next.js / Express / SvelteKit / other]

## Requirements

- Use modern CSP frame-ancestors as primary defense
- Include X-Frame-Options for legacy browser support (IE11, older Safari)
- Configure headers in the right place for my framework:
  * Next.js: next.config.js headers() function
  * Express: app.use() middleware or helmet()
  * SvelteKit: src/hooks.server.ts handle function
- Set frame-ancestors to 'self' (allow same-origin framing only)
- Add comments explaining what each header does and why both are needed

## Expected output

Provide complete, working code that I can copy-paste into my project. Show me:
- Exact file path where code should be added
- Full code snippet with all necessary imports
- Explanation of DENY vs SAMEORIGIN vs frame-ancestors values
- How to verify the headers are working after deployment

Please implement this now.`}</div>
				</div>
			</div>

			<!-- Manual Fixes -->
			<div class="fix-section">
				<h3>Manual fix - Express + Helmet</h3>
				<p>For Express apps, Helmet middleware handles all common security headers in one line. Here's the before and after:</p>

				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-label">Vulnerable</div>
						<pre><code>{`const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000);

// No security headers
// Site can be framed by any attacker`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-label">Secure</div>
						<pre><code>{`const express = require('express');
const helmet = require('helmet');
const app = express();

// Add helmet for security headers
app.use(helmet({
  frameguard: {
    action: 'sameorigin'  // or 'deny'
  },
  contentSecurityPolicy: {
    directives: {
      frameAncestors: ["'self'"],  // Modern CSP
    },
  },
}));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000);`}</code></pre>
					</div>
				</div>
			</div>

			<div class="fix-section">
				<h3>Manual fix - Next.js</h3>
				<p>Next.js requires configuration in next.config.js. This applies headers to all routes automatically:</p>

				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-label">Vulnerable (no configuration)</div>
						<pre><code>{`// next.config.js
module.exports = {
  // No headers configuration
  // Default Next.js allows framing
};`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-label">Secure (next.config.js)</div>
						<pre><code>{`// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',  // Apply to all routes
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',  // or 'DENY'
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self'",
          },
        ],
      },
    ];
  },
};`}</code></pre>
					</div>
				</div>
			</div>

			<div class="fix-section">
				<h3>Manual fix - SvelteKit</h3>
				<p>SvelteKit uses server hooks to modify responses. Add this to src/hooks.server.ts:</p>

				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-label">Vulnerable (no hooks)</div>
						<pre><code>{`// src/hooks.server.ts doesn't exist
// OR exists but has no header configuration

// Default SvelteKit allows framing`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-label">Secure (src/hooks.server.ts)</div>
						<pre><code>{`import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const response = await resolve(event);

  // Clickjacking protection
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set(
    'Content-Security-Policy',
    "frame-ancestors 'self'"
  );

  return response;
};`}</code></pre>
					</div>
				</div>
			</div>

			<!-- Choosing Defense Level -->
			<div class="fix-section">
				<h3>Choosing your defense level</h3>
				<p>You have three options for frame protection. Let me explain when to use each:</p>

				<div class="defense-options">
					<div class="defense-option">
						<div class="defense-name">DENY</div>
						<p><strong>Blocks all framing.</strong> Most secure option. Use this if your site should never appear in an iframe, even on your own domain. Breaks embedded widgets and iframe-based integrations.</p>
					</div>

					<div class="defense-option">
						<div class="defense-name">SAMEORIGIN</div>
						<p><strong>Allows same-origin framing.</strong> Balanced option. Your site can be framed by pages on the same domain, but not by external attackers. Good for most applications. Equivalent to <code>frame-ancestors 'self'</code> in CSP.</p>
					</div>

					<div class="defense-option">
						<div class="defense-name">frame-ancestors 'self' https://trusted.com</div>
						<p><strong>Allows specific domains.</strong> CSP-only option (X-Frame-Options doesn't support multiple domains reliably). Use when you need to allow trusted third-party sites to embed your content. List each trusted domain explicitly.</p>
					</div>
				</div>
			</div>

			<!-- Defense in Depth -->
			<div class="fix-section">
				<h3>Defense in depth</h3>
				<p>
					Here's the security principle I want you to remember: use <strong>both</strong> X-Frame-Options and CSP frame-ancestors. Here's why:
				</p>
				<ul>
					<li><strong>X-Frame-Options:</strong> Supported by older browsers (IE11, Safari pre-10). Simple syntax, limited features.</li>
					<li><strong>CSP frame-ancestors:</strong> Modern browsers ignore X-Frame-Options when this is present. More flexible (multiple domains), better future-proofing.</li>
					<li><strong>Together:</strong> Browsers use whichever they support. Old browsers get X-Frame-Options protection, new browsers use frame-ancestors. Maximum coverage.</li>
				</ul>
				<p>
					Additional layers you can add:
				</p>
				<ul>
					<li><strong>SameSite cookies:</strong> Set <code>SameSite=Lax</code> or <code>Strict</code> on session cookies. Prevents authenticated clickjacking (attacker can't use victim's session in the iframe).</li>
					<li><strong>JavaScript frame-busting:</strong> Legacy technique - detect if page is framed and break out. Can be bypassed with <code>sandbox</code> attribute, so don't rely on this alone. Use as supplementary defense only.</li>
				</ul>
			</div>
		</section>

		<!-- Testing Your Fix (@samexplains - verification) -->
		<section class="article-section">
			<h2>Testing your fix</h2>
			<p>
				After implementing the headers, verify they're actually working. Here's how I check:
			</p>

			<h3>1. Browser DevTools check</h3>
			<p>
				Open DevTools (F12), Network tab, reload your site, click the document request, check Response Headers. You should see both <code>X-Frame-Options</code> and <code>Content-Security-Policy</code> with <code>frame-ancestors</code>.
			</p>

			<h3>2. Online header checker</h3>
			<p>
				Use <a href="https://securityheaders.com">securityheaders.com</a> - enter your domain, get instant grade. Should see A+ or A rating if headers are configured correctly. Free tool, no signup required.
			</p>

			<h3>3. Manual iframe test (same as detection)</h3>
			<div class="code-block">
				<pre><code>{`<!-- test.html -->
<iframe src="https://yoursite.com"></iframe>

<!-- Should see: refused to connect
     OR: blank iframe with browser error in console -->`}</code></pre>
			</div>

			<h3>4. Penetration testing tools</h3>
			<p>
				Tools like <a href="https://portswigger.net/burp">Burp Suite</a> and <a href="https://www.zaproxy.org/">OWASP ZAP</a> automatically test for missing frame protection during security scans. Add these to your CI/CD pipeline for continuous verification.
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
				<a href="/kb/security/vulnerabilities/csrf/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Cross-Site Request Forgery (CSRF)</div>
					<p class="related-card-description">Trick users into performing unwanted actions on authenticated sites</p>
				</a>
				<a href="/kb/security/vulnerabilities/oauth-misconfiguration/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">OAuth Misconfiguration</div>
					<p class="related-card-description">Insecure OAuth flows that leak tokens and permissions</p>
				</a>
				<a href="/kb/security/vulnerabilities/missing-security-headers/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Missing Security Headers</div>
					<p class="related-card-description">Complete guide to HTTP security headers</p>
				</a>
				<a href="/kb/security/stacks/nextjs-supabase/" class="card card-interactive related-card">
					<div class="related-card-category">Stack Guide</div>
					<div class="related-card-title">Next.js + Supabase Security</div>
					<p class="related-card-description">Complete security checklist for this popular stack</p>
				</a>
				<a href="/kb/vibe-coding-tools/cursor/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Cursor Security Patterns</div>
					<p class="related-card-description">Common vulnerabilities in Cursor-generated code</p>
				</a>
				<a href="/kb/security/stacks/express/" class="card card-interactive related-card">
					<div class="related-card-category">Stack Guide</div>
					<div class="related-card-title">Express.js Security Guide</div>
					<p class="related-card-description">Secure your Express apps with proper middleware</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Find missing headers before attackers do</h2>
			<p>Security headers take 5 lines of code. The absence costs real attacks.</p>
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

	/* Attack Steps */
	.attack-steps {
		margin: 1.5rem 0;
	}

	.attack-step {
		display: flex;
		gap: 1rem;
		padding: 1rem 0;
		border-bottom: 1px solid var(--border);
	}

	.attack-step:last-child {
		border-bottom: none;
	}

	.step-number {
		flex-shrink: 0;
		width: 2rem;
		height: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		font-family: 'JetBrains Mono', monospace;
		font-weight: 600;
		color: var(--text-primary);
	}

	.step-content h3 {
		margin: 0 0 0.5rem;
		font-size: 1rem;
		color: var(--text-primary);
	}

	.step-content p {
		margin: 0;
		font-size: 0.9rem;
		color: var(--text-secondary);
	}

	/* Attack Types */
	.attack-types {
		display: grid;
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.attack-type-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.25rem;
	}

	.attack-type-card h3 {
		margin: 0 0 0.75rem;
		font-size: 1rem;
		color: var(--text-primary);
	}

	.attack-type-card p {
		margin: 0;
		font-size: 0.9rem;
		color: var(--text-secondary);
		line-height: 1.6;
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
		border-left: 3px solid var(--green-dim);
		border-top: 1px solid var(--border);
		border-right: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
		padding: 1.5rem;
		text-align: center;
		margin: 2rem 0;
	}

	.cta-box p {
		margin: 0 0 1rem;
		color: var(--text-secondary);
	}

	.cta-box p:last-of-type {
		margin-bottom: 1.5rem;
	}

	/* Fix Sections */
	.fix-section {
		margin: 2rem 0;
	}

	.fix-section h3 {
		margin-bottom: 0.75rem;
	}

	/* Code Comparison - STACKED vertically */
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

	/* Defense Options */
	.defense-options {
		display: grid;
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.defense-option {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.25rem;
	}

	.defense-name {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 0.5rem;
	}

	.defense-option p {
		margin: 0;
		font-size: 0.9rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.attack-step {
			flex-direction: column;
			gap: 0.5rem;
		}
	}
</style>
