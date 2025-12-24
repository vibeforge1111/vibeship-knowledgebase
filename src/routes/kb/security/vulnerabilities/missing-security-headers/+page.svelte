<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Missing Security Headers: 5-Minute Fix Guide | VibeShip',
		description: '90% of apps lack security headers. Add HSTS, CSP, X-Frame-Options in 5 minutes. Copy-paste configs for Next.js, Express, Vercel & Netlify.',
		url: '/kb/security/vulnerabilities/missing-security-headers/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Missing Security Headers' }
	];

	// Real external data sources
	const owaspData = {
		category: 'A05:2021',
		prevalence: '90%',
		occurrences: '208,387+',
		source: 'https://owasp.org/Top10/A05_2021-Security_Misconfiguration/'
	};

	// FAQ data for schema
	const faqs = [
		{
			question: 'What are HTTP security headers and why do I need them?',
			answer: 'HTTP security headers are instructions your server sends to browsers telling them how to handle your site safely. They prevent clickjacking, XSS attacks, and data theft. Think of them like safety labels on a package. Without them, browsers make their own assumptions about security, and those defaults aren\'t strict enough. According to OWASP, 90% of applications have security misconfigurations, and missing headers are one of the most common gaps.'
		},
		{
			question: 'What happens if security headers are missing from my site?',
			answer: 'Your site becomes vulnerable to several attacks. Without X-Frame-Options or CSP frame-ancestors, attackers can embed your site in an invisible iframe and trick users into clicking things they didn\'t mean to (clickjacking). Without CSP, malicious scripts can run on your pages. Without HSTS, users can be redirected to fake HTTP versions of your site. The attacks are real, common, and often automated by bots scanning the web.'
		},
		{
			question: 'How do I check if my website has security headers?',
			answer: 'The fastest way is SecurityHeaders.com. Paste your URL and you\'ll get a grade (A+ is perfect, F means you\'re missing most headers). You can also open browser DevTools, go to the Network tab, click any request, and look at Response Headers. If you don\'t see Strict-Transport-Security, Content-Security-Policy, or X-Frame-Options, they\'re missing. Mozilla Observatory is another good scanner that gives detailed recommendations.'
		},
		{
			question: 'Should I use X-Frame-Options or CSP frame-ancestors?',
			answer: 'Use both for maximum compatibility. CSP frame-ancestors is the modern standard and more flexible, but X-Frame-Options still works on older browsers like IE11. Most production sites send both headers. If you only pick one, choose CSP frame-ancestors and accept that legacy browsers won\'t get the protection. The good news: modern browsers (Chrome, Firefox, Safari, Edge) all support CSP, which covers 95%+ of users.'
		},
		{
			question: 'Can security headers break my website functionality?',
			answer: 'Yes, if you set them too strict without testing. Content-Security-Policy is the main culprit. A strict CSP can block inline scripts, third-party analytics, and CDN resources your site relies on. That\'s why you should test CSP in Report-Only mode first. The other headers (HSTS, X-Frame-Options, X-Content-Type-Options) are much safer and rarely break anything. Start with those, then carefully tune CSP based on what your site actually needs.'
		},
		{
			question: 'Do security headers improve SEO rankings?',
			answer: 'Indirectly, yes. Google doesn\'t explicitly rank sites higher for having security headers, but they do factor "site security" into rankings. HTTPS is a confirmed ranking signal, and HSTS enforces HTTPS. Sites flagged as insecure lose traffic and rankings. Security headers also improve user trust, which affects bounce rate and engagement metrics that do impact SEO. Think of them as table stakes for modern web apps, not SEO hacks.'
		},
		{
			question: 'What is HSTS and why is it important?',
			answer: 'HSTS (HTTP Strict Transport Security) forces browsers to only connect to your site over HTTPS, never HTTP. Without it, attackers can downgrade users to unencrypted HTTP connections and intercept data. HSTS also prevents SSL certificate warnings from being bypassed. Once you set HSTS with a long max-age (like 1 year), browsers remember and automatically upgrade all HTTP requests to HTTPS for that duration. It\'s a one-line header that closes a major security gap.'
		},
		{
			question: 'How do I implement CSP without breaking inline scripts?',
			answer: 'Start with a permissive CSP that allows inline scripts, then tighten it over time. Use Content-Security-Policy-Report-Only mode first to see what would break without actually blocking anything. For inline scripts, you have three options: (1) allow them temporarily with unsafe-inline while you refactor, (2) use nonces (random tokens) on each script tag, or (3) move all scripts to external files. Most vibe coded apps use unsafe-inline in production because refactoring takes time. That\'s okay—having some CSP is better than none.'
		}
	];

	let copied = $state(false);

	function copyCode(id: string) {
		const element = document.getElementById(id);
		if (element) {
			navigator.clipboard.writeText(element.textContent || '');
			copied = true;
			setTimeout(() => copied = false, 2000);
		}
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
			{"@type": "ListItem", "position": 4, "name": "Missing Security Headers"}
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
				<span class="badge badge-medium">Medium</span>
				<span class="badge">CWE-16</span>
				<span class="badge">OWASP A05:2021</span>
			</div>
			<h1>Missing Security Headers: The 5-Minute Hardening Guide</h1>
			<p class="text-secondary">How to protect your vibe coded app from clickjacking, XSS, and man-in-the-middle attacks with six copy-paste configurations</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Security headers are HTTP response headers that tell browsers how to handle your site's content safely.</strong>
				Missing headers leave sites vulnerable to clickjacking, XSS, and man-in-the-middle attacks. According to <a href="https://owasp.org/Top10/A05_2021-Security_Misconfiguration/">OWASP Top 10:2021</a>, 90% of applications have security misconfigurations. The fix takes 5 minutes with the right config.
			</p>
		</div>

		<!-- Stats Box -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">{owaspData.prevalence}</div>
				<div class="stat-label">Apps with misconfiguration</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">{owaspData.occurrences}</div>
				<div class="stat-label">Documented instances</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">{owaspData.category}</div>
				<div class="stat-label">OWASP Category</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">5 min</div>
				<div class="stat-label">Fix time</div>
			</div>
		</div>
		<p class="data-source">
			Source: <a href={owaspData.source}>OWASP Top 10 (2021)</a>
		</p>

		<!-- What Are Security Headers -->
		<section class="article-section">
			<h2>What are security headers?</h2>
			<p>
				Security headers are instructions your server sends to browsers along with every page. They're not part of your HTML—they're invisible metadata that tells the browser, "Here's how to safely handle this content."
			</p>
			<p>
				Think of them like handling instructions on a package. Without labels saying "Fragile" or "Keep Refrigerated," the delivery person makes their own assumptions. Security headers work the same way. They tell browsers: "Don't let this page load in an iframe," "Only load scripts from these sources," "Always use HTTPS."
			</p>
			<p>
				When headers are missing, browsers fall back to permissive defaults that prioritize compatibility over security. That's how clickjacking happens. How malicious scripts run on your pages. How users get redirected to fake HTTP clones of your site. The attacks aren't theoretical—they're automated, constant, and successful.
			</p>
		</section>

		<!-- Why AI Tools Deploy Without Headers -->
		<section class="article-section">
			<h2>Why AI tools deploy without security headers</h2>
			<p>
				Here's the gap: AI coding tools focus on application code—the features that make your app work. Security headers are infrastructure-level configuration, not application logic. They live in deployment files, server configs, and framework settings that most vibe coders never touch.
			</p>
			<p>
				When you prompt Cursor or Bolt to "build a login page" or "create an API endpoint," the AI delivers functional code. It doesn't know what platform you're deploying to, what headers your reverse proxy sends, or what your production security requirements are. Those details are out of scope for code generation.
			</p>
			<p>
				The default framework configs don't help either. Create-next-app, Vite, Express—all optimized for developer experience, not production hardening. They get your app running fast. Security headers require an extra step that most tutorials skip.
			</p>
			<p>
				This is where the deployment security gap lives. You vibe code a working app, deploy it to Vercel or Netlify, and it just works. No errors, no warnings. But SecurityHeaders.com gives you an F grade. The app functions fine while being structurally vulnerable.
			</p>
		</section>

		<!-- The 6 Essential Headers -->
		<section class="article-section">
			<h2>The 6 essential security headers you need</h2>
			<p>
				Let's walk through each header, what it does, and why it matters. These six headers address the most common browser-based attacks that affect modern web apps.
			</p>

			<div class="header-explanation">
				<h3>1. Strict-Transport-Security (HSTS)</h3>
				<p><strong>What it does:</strong> Forces browsers to only connect over HTTPS, never HTTP.</p>
				<p><strong>Attack prevented:</strong> Man-in-the-middle attacks, protocol downgrade attacks.</p>
				<p><strong>Why you need it:</strong> Without HSTS, attackers can intercept the first HTTP request before your redirect to HTTPS happens. They sit in the middle and steal session tokens, passwords, anything transmitted. HSTS tells browsers to skip HTTP entirely and always upgrade to HTTPS automatically.</p>
				<div class="code-block">
					<pre><code>Strict-Transport-Security: max-age=31536000; includeSubDomains; preload</code></pre>
				</div>
				<p class="config-note"><code>max-age=31536000</code> = 1 year. <code>includeSubDomains</code> applies to all subdomains. <code>preload</code> lets you submit to the HSTS preload list (requires separate submission).</p>
			</div>

			<div class="header-explanation">
				<h3>2. Content-Security-Policy (CSP)</h3>
				<p><strong>What it does:</strong> Controls which resources (scripts, styles, images) can load on your pages.</p>
				<p><strong>Attack prevented:</strong> Cross-site scripting (XSS), data injection, unauthorized third-party scripts.</p>
				<p><strong>Why you need it:</strong> CSP is your defense against XSS attacks. Without it, if an attacker injects a script tag into your page, the browser runs it. CSP whitelists trusted sources. If a script isn't from an allowed origin, the browser blocks it. This stops most XSS exploits cold.</p>
				<div class="code-block">
					<pre><code>Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'</code></pre>
				</div>
				<p class="config-note">Start permissive with <code>'unsafe-inline'</code> and <code>'unsafe-eval'</code>, then tighten over time. Use <code>Content-Security-Policy-Report-Only</code> to test without breaking your site.</p>
			</div>

			<div class="header-explanation">
				<h3>3. X-Frame-Options / CSP frame-ancestors</h3>
				<p><strong>What it does:</strong> Prevents your site from being embedded in iframes.</p>
				<p><strong>Attack prevented:</strong> Clickjacking (tricking users into clicking invisible buttons).</p>
				<p><strong>Why you need it:</strong> Clickjacking works by loading your site in a transparent iframe over a fake page. Users think they're clicking "Win a Prize!" but they're actually clicking "Transfer All Funds" on your real site underneath. X-Frame-Options and CSP frame-ancestors block iframe embedding entirely.</p>
				<div class="code-block">
					<pre><code>X-Frame-Options: DENY
Content-Security-Policy: frame-ancestors 'none'</code></pre>
				</div>
				<p class="config-note">Send both for compatibility. Modern browsers use CSP <code>frame-ancestors</code>, older browsers use <code>X-Frame-Options</code>.</p>
			</div>

			<div class="header-explanation">
				<h3>4. X-Content-Type-Options</h3>
				<p><strong>What it does:</strong> Stops browsers from guessing (sniffing) content types.</p>
				<p><strong>Attack prevented:</strong> MIME confusion attacks where browsers execute files as scripts when they shouldn't.</p>
				<p><strong>Why you need it:</strong> Browsers used to "helpfully" guess file types if servers didn't specify. An attacker uploads a file disguised as an image, but the browser sniffs it and executes it as JavaScript. <code>nosniff</code> tells browsers to trust the declared content type and nothing else.</p>
				<div class="code-block">
					<pre><code>X-Content-Type-Options: nosniff</code></pre>
				</div>
				<p class="config-note">This is a one-word header with zero configuration. Just set it.</p>
			</div>

			<div class="header-explanation">
				<h3>5. Referrer-Policy</h3>
				<p><strong>What it does:</strong> Controls how much referrer information gets sent when users navigate away from your site.</p>
				<p><strong>Attack prevented:</strong> Information leakage (URLs containing tokens, session IDs, or sensitive data being leaked to third parties).</p>
				<p><strong>Why you need it:</strong> By default, browsers send the full URL in the Referer header when users click external links. If your URL contains sensitive data (<code>/reset-password?token=abc123</code>), that token gets sent to third-party sites. Referrer-Policy limits what gets shared.</p>
				<div class="code-block">
					<pre><code>Referrer-Policy: strict-origin-when-cross-origin</code></pre>
				</div>
				<p class="config-note">This sends the origin only (not full URL) for cross-origin requests, and the full URL for same-origin requests. Balanced privacy without breaking analytics.</p>
			</div>

			<div class="header-explanation">
				<h3>6. Permissions-Policy</h3>
				<p><strong>What it does:</strong> Controls which browser features (camera, microphone, geolocation) your site can access.</p>
				<p><strong>Attack prevented:</strong> Unauthorized access to device sensors and APIs.</p>
				<p><strong>Why you need it:</strong> If an attacker injects a script or embeds your page in an iframe, they could potentially access the camera or microphone without explicit permission. Permissions-Policy disables these features by default unless you explicitly allow them.</p>
				<div class="code-block">
					<pre><code>Permissions-Policy: camera=(), microphone=(), geolocation=()</code></pre>
				</div>
				<p class="config-note">The <code>()</code> syntax denies access to all origins. If you need camera access, specify allowed origins: <code>camera=(self)</code>.</p>
			</div>
		</section>

		<!-- How to Check Headers -->
		<section class="article-section">
			<h2>How to check if your headers are missing</h2>
			<p>
				Before you fix headers, let's see what's actually missing. Here are three fast ways to check:
			</p>

			<div class="check-method">
				<h3>SecurityHeaders.com (fastest)</h3>
				<p>Open <a href="https://securityheaders.com/">securityheaders.com</a>, paste your URL, hit Enter. You'll get a letter grade (A+ to F) and a breakdown of which headers are missing. If you see F or D, headers are missing. A+ means you're fully protected.</p>
			</div>

			<div class="check-method">
				<h3>Browser DevTools (most detailed)</h3>
				<p>Open your site, press F12 to open DevTools, go to the Network tab, refresh the page, click the first request, scroll to Response Headers. Look for <code>Strict-Transport-Security</code>, <code>Content-Security-Policy</code>, <code>X-Frame-Options</code>. If you don't see them, they're not being sent.</p>
			</div>

			<div class="check-method">
				<h3>curl command (for command-line fans)</h3>
				<div class="code-block">
					<pre><code>curl -I https://yoursite.com</code></pre>
				</div>
				<p>This prints all response headers. Search the output for the headers listed above.</p>
			</div>
		</section>

		<!-- How to Add Headers (5-Minute Fixes) -->
		<section class="article-section">
			<h2>How to add security headers (5-minute fixes)</h2>
			<p>
				Now let's add the headers. I'll show you exactly where to put the config for the most common vibe coding stacks. Pick your framework or deployment platform, copy the config, deploy, done.
			</p>

			<div class="framework-config">
				<h3>Next.js (next.config.js)</h3>
				<p>Add a <code>headers()</code> function to your Next.js config. This applies headers to all routes automatically.</p>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">javascript</span>
						<button class="copy-btn" class:copied onclick={() => copyCode('nextjs-headers')}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre id="nextjs-headers"><code>{`// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'"
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ]
  }
}`}</code></pre>
				</div>
			</div>

			<div class="framework-config">
				<h3>Express.js (Helmet.js)</h3>
				<p>Helmet is an Express middleware that sets secure headers automatically. Install it, add one line to your app, and you're protected.</p>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">javascript</span>
						<button class="copy-btn" class:copied onclick={() => copyCode('express-helmet')}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre id="express-helmet"><code>{`// Install: npm install helmet
import helmet from 'helmet';
import express from 'express';

const app = express();

// Use default secure headers (easiest)
app.use(helmet());

// Or customize specific headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"]
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));`}</code></pre>
				</div>
				<p class="config-note">Helmet sets secure defaults automatically. Most vibe coded Express apps can just use <code>app.use(helmet())</code> and be done.</p>
			</div>

			<div class="framework-config">
				<h3>SvelteKit (hooks.server.ts)</h3>
				<p>SvelteKit lets you add headers globally through the <code>handle</code> hook. This runs on every request.</p>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">typescript</span>
						<button class="copy-btn" class:copied onclick={() => copyCode('sveltekit-headers')}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre id="sveltekit-headers"><code>{`// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const response = await resolve(event);

  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'");
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  return response;
};`}</code></pre>
				</div>
			</div>

			<div class="framework-config">
				<h3>Vercel Deployment (vercel.json)</h3>
				<p>If you deploy to Vercel, add a <code>vercel.json</code> file in your project root with this config. Vercel injects these headers at the edge.</p>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">json</span>
						<button class="copy-btn" class:copied onclick={() => copyCode('vercel-headers')}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre id="vercel-headers"><code>{`{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains; preload"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        }
      ]
    }
  ]
}`}</code></pre>
				</div>
				<p class="config-note">Vercel headers only apply to static assets and routes served by Vercel. For serverless functions, set headers in your function code as well.</p>
			</div>

			<div class="framework-config">
				<h3>Netlify Deployment (netlify.toml)</h3>
				<p>Netlify uses a <code>netlify.toml</code> file for headers. Add this to your project root.</p>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">toml</span>
						<button class="copy-btn" class:copied onclick={() => copyCode('netlify-toml')}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre id="netlify-toml"><code>{`[[headers]]
  for = "/*"
  [headers.values]
    Strict-Transport-Security = "max-age=31536000; includeSubDomains; preload"
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"`}</code></pre>
				</div>
				<p class="config-note">Alternatively, create a <code>_headers</code> file in your publish directory with the same headers in plain text format (see <a href="https://docs.netlify.com/routing/headers/">Netlify docs</a>).</p>
			</div>
		</section>

		<!-- Common Mistakes -->
		<section class="article-section">
			<h2>Common mistakes to avoid</h2>
			<p>
				Here's where people trip up when adding headers for the first time. Learn from these mistakes before making them yourself.
			</p>

			<ul class="mistakes-list">
				<li>
					<strong>Short HSTS max-age values:</strong> Don't use <code>max-age=86400</code> (1 day). Browsers forget the rule too quickly. Use <code>max-age=31536000</code> (1 year) minimum. Once you're confident, increase it to 2 years.
				</li>
				<li>
					<strong>Overly permissive CSP:</strong> Yes, <code>'unsafe-inline'</code> and <code>'unsafe-eval'</code> weaken CSP. But they're pragmatic starting points for vibe coded apps with inline scripts. Start permissive, tighten over time. Test changes in Report-Only mode first.
				</li>
				<li>
					<strong>Setting headers in two places:</strong> If your framework sets headers AND your deployment platform sets headers, you'll get duplicates or conflicts. Pick one approach. Usually framework-level is better because it applies to all responses, including serverless functions.
				</li>
				<li>
					<strong>Using X-Frame-Options without CSP frame-ancestors:</strong> Modern browsers ignore X-Frame-Options if CSP frame-ancestors is present. Set both for compatibility with older browsers.
				</li>
				<li>
					<strong>Not testing CSP before deploying:</strong> A strict CSP can break your site instantly. Use <code>Content-Security-Policy-Report-Only</code> to test without blocking. Check browser console for CSP violations, fix them, then switch to enforcement mode.
				</li>
				<li>
					<strong>Forgetting includeSubDomains in HSTS:</strong> Without <code>includeSubDomains</code>, only your root domain gets HSTS protection. Attackers can target <code>api.yoursite.com</code> or <code>admin.yoursite.com</code> with HTTP downgrade attacks. Include all subdomains.
				</li>
			</ul>
		</section>

		<!-- Testing -->
		<section class="article-section">
			<h2>Testing your headers</h2>
			<p>
				After deploying your header config, verify it actually works. Here's how to confirm browsers are receiving the headers.
			</p>

			<div class="test-method">
				<h3>SecurityHeaders.com: Paste URL, get grade</h3>
				<p>Open <a href="https://securityheaders.com/">securityheaders.com</a>, paste your production URL, hit Enter. An A+ grade means all headers are present with secure values. Anything less shows what's missing.</p>
			</div>

			<div class="test-method">
				<h3>Mozilla Observatory: Comprehensive scan</h3>
				<p><a href="https://observatory.mozilla.org/">Mozilla Observatory</a> runs deeper checks including TLS config, cookie security, and subresource integrity. It's slower but catches more edge cases.</p>
			</div>

			<div class="test-method">
				<h3>Browser DevTools: Manual verification</h3>
				<p>Open your site in Chrome or Firefox, press F12, go to Network tab, refresh, click the document request, scroll to Response Headers. You should see all six headers listed. If any are missing, your config didn't apply.</p>
			</div>

			<div class="test-method">
				<h3>Expected result</h3>
				<p>You should see these exact headers in your responses:</p>
				<div class="code-block">
					<pre><code>strict-transport-security: max-age=31536000; includeSubDomains; preload
x-frame-options: DENY
x-content-type-options: nosniff
referrer-policy: strict-origin-when-cross-origin
content-security-policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'
permissions-policy: camera=(), microphone=(), geolocation=()</code></pre>
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
				<a href="/kb/security/vulnerabilities/xss/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Cross-Site Scripting (XSS)</div>
					<p class="related-card-description">Inject malicious scripts into web pages viewed by other users</p>
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
				<a href="/kb/vibe-coding-tools/bolt/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Bolt Deployment Security</div>
					<p class="related-card-description">Security gaps in Bolt-generated deployments</p>
				</a>
				<a href="/kb/security/vulnerabilities/sql-injection/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">SQL Injection</div>
					<p class="related-card-description">How attackers manipulate database queries in vibe coded apps</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Secure your deployment in 5 minutes</h2>
			<p>Copy the config for your stack, paste it into your project, deploy. That's the whole process.</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">
				Scan for missing headers
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

	/* Data Source */
	.data-source {
		font-size: 0.75rem;
		color: var(--text-tertiary);
		margin: 0.5rem 0 1.5rem;
	}

	.data-source a {
		color: var(--text-secondary);
	}

	/* Header Explanation Cards */
	.header-explanation {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.header-explanation h3 {
		margin: 0 0 0.75rem;
		font-size: 1.125rem;
		color: var(--text-primary);
	}

	.header-explanation p {
		margin: 0.5rem 0;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.header-explanation strong {
		color: var(--text-primary);
	}

	.config-note {
		margin: 1rem 0 0 !important;
		font-size: 0.875rem;
		color: var(--text-tertiary);
	}

	.config-note code {
		background: var(--bg-tertiary);
		padding: 0.125rem 0.375rem;
		font-size: 0.8125rem;
		color: var(--text-secondary);
	}

	/* Check/Test Method (consolidated) */
	.check-method,
	.test-method {
		margin: 1.5rem 0;
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--border);
	}

	.check-method:last-child,
	.test-method:last-child { border-bottom: none; }

	.check-method h3,
	.test-method h3 {
		margin: 0 0 0.5rem;
		font-size: 1rem;
		color: var(--text-primary);
	}

	.check-method p,
	.test-method p {
		margin: 0.5rem 0;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	/* Framework Config */
	.framework-config {
		margin: 2rem 0;
		padding-bottom: 2rem;
		border-bottom: 1px solid var(--border);
	}

	.framework-config:last-child {
		border-bottom: none;
	}

	.framework-config h3 {
		margin: 0 0 0.75rem;
		font-size: 1.25rem;
		color: var(--text-primary);
	}

	.framework-config > p {
		margin: 0.5rem 0 1rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	/* Mistakes List */
	.mistakes-list {
		list-style: none;
		padding: 0;
		margin: 1rem 0 0;
	}

	.mistakes-list li {
		padding: 1rem 0;
		border-bottom: 1px solid var(--border);
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.mistakes-list li:last-child {
		border-bottom: none;
	}

	.mistakes-list strong {
		color: var(--text-primary);
		display: block;
		margin-bottom: 0.25rem;
	}

	.mistakes-list code {
		background: var(--bg-tertiary);
		padding: 0.125rem 0.375rem;
		font-size: 0.8125rem;
	}

	/* Mobile Responsive */
	@media (max-width: 768px) {
		.header-explanation,
		.framework-config {
			padding: 1rem;
		}

		.code-block pre {
			font-size: 0.75rem;
		}
	}
</style>
