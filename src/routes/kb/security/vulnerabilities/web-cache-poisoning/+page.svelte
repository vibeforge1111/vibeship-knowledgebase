<script lang="ts">
	import { Header } from '$lib/components/layout';

	const meta = {
		title: 'Web Cache Poisoning: Detect & Fix Guide',
		description: 'Web cache poisoning lets attackers inject malicious content served to all users. Learn to detect unkeyed headers and fix cache configurations in your app.',
		url: '/kb/security/vulnerabilities/web-cache-poisoning/'
	};

	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Web Cache Poisoning' }
	];

	const securityData = {
		cweId: 'CWE-525',
		cweName: 'Use of Web Browser Cache Containing Sensitive Information',
		cweSource: 'https://cwe.mitre.org/data/definitions/525.html',
		owaspCategory: 'A04:2021 - Insecure Design',
		owaspSource: 'https://owasp.org/Top10/A04_2021-Insecure_Design/',
		severity: 'High',
		cvssScore: '7.5-9.1'
	};

	const faqs = [
		{
			question: 'What is web cache poisoning?',
			answer: 'Web cache poisoning is an attack where an attacker tricks a cache into storing a malicious response that gets served to other users. The attacker manipulates unkeyed inputs (like certain HTTP headers) to inject harmful content. When the cache stores this poisoned response, every subsequent user requesting that resource receives the attacker\'s payload.'
		},
		{
			question: 'How do I prevent cache poisoning?',
			answer: 'Include all user-controllable inputs in your cache key using the Vary header. Avoid reflecting unkeyed headers in responses. Validate and sanitize any header values before including them in HTML. Use strict Cache-Control directives. Consider using cache-control: private for any response that varies based on user input beyond the URL.'
		},
		{
			question: 'What is the difference between cache poisoning and cache deception?',
			answer: 'Cache poisoning affects ALL users by storing malicious content in a shared cache. Cache deception tricks a SINGLE user into caching their own sensitive data under a predictable URL, which the attacker then retrieves. Poisoning is attacker → cache → all victims. Deception is victim → cache → attacker.'
		},
		{
			question: 'How do I detect cache poisoning vulnerabilities?',
			answer: 'Fuzz unkeyed headers (X-Forwarded-Host, X-Forwarded-Proto, X-Original-URL) and check if their values appear in cached responses. Use cache busters (unique query parameters) to isolate test responses. Tools like Param Miner can automate discovery. Look for any header value that gets reflected without being part of the cache key.'
		},
		{
			question: 'Is cache poisoning the same as DNS cache poisoning?',
			answer: 'No. Web cache poisoning targets HTTP caches (CDNs, reverse proxies, browser caches) by manipulating HTTP responses. DNS cache poisoning targets DNS resolvers by injecting fake DNS records. They are completely different attacks with different targets, techniques, and mitigations.'
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
			{"@type": "ListItem", "position": 4, "name": "Web Cache Poisoning"}
		]
	}
	</script>`}

	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "TechArticle",
		"headline": "${meta.title}",
		"description": "${meta.description}",
		"author": {"@type": "Organization", "name": "VibeShip"},
		"publisher": {"@type": "Organization", "name": "VibeShip"},
		"datePublished": "2024-12-26",
		"dateModified": "2024-12-26"
	}
	</script>`}

	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "FAQPage",
		"mainEntity": ${JSON.stringify(faqs.map(faq => ({
			"@type": "Question",
			"name": faq.question,
			"acceptedAnswer": {"@type": "Answer", "text": faq.answer}
		})))}
	}
	</script>`}
</svelte:head>

<Header {breadcrumbs} />

<div class="content-wrapper">
	<article class="content-main content-wide">
		<header class="article-header">
			<div class="badge-row">
				<span class="badge badge-high">High</span>
				<span class="badge">{securityData.cweId}</span>
				<span class="badge">OWASP A04:2021</span>
			</div>
			<h1>Web Cache Poisoning in Vibe Coded Apps</h1>
			<p class="text-secondary">When your CDN serves XSS to every user at once</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Web cache poisoning happens when an attacker tricks your cache into storing malicious content, then serving it to everyone.</strong>
				The attacker manipulates headers your cache ignores but your app reflects. Your CDN stores the poisoned response.
				Every user who hits that cached page gets the payload. One request, thousands of victims. Fix it by including all reflected inputs in your cache key.
			</p>
		</div>

		<!-- Stats Box -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">1→All</div>
				<div class="stat-label">One poison, all users</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">~40%</div>
				<div class="stat-label">Sites with unkeyed headers</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">XSS</div>
				<div class="stat-label">Most common payload</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">{securityData.cvssScore}</div>
				<div class="stat-label">CVSS Score Range</div>
			</div>
		</div>
		<p class="data-source">
			Source: <a href="https://portswigger.net/research/practical-web-cache-poisoning">PortSwigger Research 2018</a>, <a href={securityData.owaspSource}>OWASP</a>
		</p>

		<!-- What Is It - @pager_duty voice (firefighter urgency) -->
		<section class="article-section">
			<h2>What is web cache poisoning?</h2>
			<p>
				Web cache poisoning is like tampering with a shared drink pitcher at a party. You poison one glass, pour it back, and everyone who drinks from that pitcher gets the poison. The cache is your pitcher.
			</p>
			<p>
				Here's what happens: your cache decides what to store based on a "cache key" (usually the URL). But your app might use other inputs—like HTTP headers—to build the response. If a header isn't in the cache key but IS reflected in the response, an attacker can inject malicious content that gets cached and served to everyone.
			</p>
			<p>
				The dangerous headers are called "unkeyed inputs." Common culprits: <code>X-Forwarded-Host</code>, <code>X-Forwarded-Proto</code>, <code>X-Original-URL</code>. If your app reflects these in links or scripts, and your cache ignores them, you're vulnerable.
			</p>
		</section>

		<!-- Urgency / Impact -->
		<section class="article-section">
			<h2>This is worse than regular XSS</h2>
			<p>
				Regular XSS requires tricking each victim individually. Cache poisoning is a force multiplier. One malicious request poisons the cache. Then your own infrastructure serves the payload to every user who requests that page. Your CDN becomes the attack vector.
			</p>

			<div class="incident-list">
				<div class="incident-item incident-critical">
					<div class="incident-company">PayPal (2021)</div>
					<div class="incident-details">
						Cache poisoning via unkeyed <code>Accept-Language</code> header allowed XSS on payment pages. Bounty: $9,000.
					</div>
				</div>
				<div class="incident-item incident-high">
					<div class="incident-company">GitLab (2020)</div>
					<div class="incident-details">
						Password reset emails poisoned via <code>X-Forwarded-Host</code>. Attackers could steal password reset tokens at scale.
					</div>
				</div>
				<div class="incident-item incident-high">
					<div class="incident-company">Red Hat (2019)</div>
					<div class="incident-details">
						Multiple subdomains vulnerable to cache poisoning via unkeyed headers. Could serve malicious downloads.
					</div>
				</div>
			</div>

			<p>
				The pattern: a company adds caching for performance. AI tools configure aggressive caching. Nobody audits which headers affect the response. Months later, a researcher (or attacker) finds it.
			</p>
		</section>

		<!-- Why Vibe Coded Apps -->
		<section class="article-section">
			<h2>Why vibe coded apps are vulnerable</h2>
			<p>
				AI coding tools love performance optimizations. "Add caching" is a common request. The AI generates CDN configs, sets Cache-Control headers, and suddenly your app is fast. But did it check which inputs affect the response?
			</p>

			<div class="code-comparison">
				<div class="code-block code-bad">
					<div class="code-block-header">
						<span class="code-block-lang">Vulnerable - Next.js API route</span>
						<span class="code-label-bad">AI-generated</span>
					</div>
					<pre><code>{`// AI adds caching for performance
export async function GET(request: Request) {
  const host = request.headers.get('x-forwarded-host')
    || request.headers.get('host');

  return new Response(\`
    <html>
      <script src="https://\${host}/analytics.js"></script>
    </html>
  \`, {
    headers: {
      'Content-Type': 'text/html',
      'Cache-Control': 'public, max-age=3600' // Cached!
    }
  });
}
// x-forwarded-host is unkeyed but reflected = poisonable`}</code></pre>
				</div>
				<div class="code-block code-good">
					<div class="code-block-header">
						<span class="code-block-lang">Secure - Hardcoded or keyed</span>
						<span class="code-label-good">Fixed</span>
					</div>
					<pre><code>{`// Option 1: Hardcode the host (safest)
export async function GET(request: Request) {
  const host = 'yourapp.com'; // Never from headers

  return new Response(\`
    <html>
      <script src="https://\${host}/analytics.js"></script>
    </html>
  \`, {
    headers: {
      'Content-Type': 'text/html',
      'Cache-Control': 'public, max-age=3600',
      'Vary': 'X-Forwarded-Host' // Or include in cache key
    }
  });
}
// If you must use headers, add them to Vary`}</code></pre>
				</div>
			</div>

			<p>
				The AI optimizes for speed, not security. Vibe coders copy the config without understanding cache keys. The vulnerability ships to production.
			</p>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How to detect cache poisoning vulnerabilities</h2>
			<p>
				The process: find unkeyed inputs, check if they're reflected, confirm they get cached.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Bash</span>
				</div>
				<pre><code>{`# Step 1: Add a cache buster to isolate your test
# Use a unique query param so you don't poison real cache
curl -I "https://target.com/page?cachebuster=$(date +%s)"

# Step 2: Test common unkeyed headers
curl -H "X-Forwarded-Host: evil.com" \
     "https://target.com/page?cb=test1" | grep "evil.com"

curl -H "X-Forwarded-Proto: https" \
     "https://target.com/page?cb=test2"

curl -H "X-Original-URL: /admin" \
     "https://target.com/page?cb=test3"

# Step 3: If header value appears in response, check caching
# Request without the header - does evil.com still appear?
curl "https://target.com/page?cb=test1" | grep "evil.com"

# If yes = VULNERABLE (cached the poisoned response)`}</code></pre>
			</div>

			<div class="tool-box">
				<h3>Automated Detection</h3>
				<p>
					<strong>Param Miner</strong> (Burp extension) automates unkeyed header discovery.
					<strong>nuclei</strong> has cache poisoning templates.
					These tools systematically fuzz headers and detect reflections.
				</p>
			</div>

			<div class="cta-box">
				<p><strong>Don't wait for researchers to find your cache issues.</strong></p>
				<a href="https://scanner.vibeship.co" class="btn btn-green">
					Scan your app now
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M5 12h14M12 5l7 7-7 7"/>
					</svg>
				</a>
			</div>
		</section>

		<!-- How to Fix -->
		<section class="article-section">
			<h2>How to fix web cache poisoning</h2>
			<p>
				Three options: don't reflect headers, add reflected headers to cache key, or don't cache responses that reflect user input.
			</p>

			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>Copy this into your AI coding tool to audit and fix cache configurations:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Audit my application for web cache poisoning vulnerabilities.

## What to search for

1. Any use of these headers in response generation:
   - X-Forwarded-Host
   - X-Forwarded-Proto
   - X-Forwarded-For
   - X-Original-URL
   - X-Rewrite-URL
   - Accept-Language
   - Accept-Encoding (if reflected in body)
   - Any custom X- headers

2. Search patterns:
   \`\`\`
   request.headers.get('x-forwarded
   req.headers['x-forwarded
   getHeader('X-Forwarded
   $_SERVER['HTTP_X_FORWARDED
   \`\`\`

3. Cache configuration files:
   - next.config.js (headers, rewrites)
   - vercel.json (headers)
   - _headers (Netlify/Cloudflare)
   - nginx.conf, varnish vcl
   - CDN dashboard configurations

## Detection steps

For each reflected header found:
1. Is the header value used in the response body? (links, scripts, meta tags)
2. Is the response cacheable? (Cache-Control: public or s-maxage)
3. Is the header in the Vary response header?

If YES to 1 and 2, but NO to 3 = VULNERABLE

## Fixes to apply

### Option A: Hardcode values (preferred)
\`\`\`javascript
// Instead of
const host = req.headers['x-forwarded-host'];
// Use
const host = process.env.APP_HOST || 'yourapp.com';
\`\`\`

### Option B: Add to Vary header
\`\`\`javascript
// Include reflected headers in cache key
headers: {
  'Vary': 'X-Forwarded-Host, Accept-Language',
  'Cache-Control': 'public, max-age=3600'
}
\`\`\`

### Option C: Don't cache dynamic responses
\`\`\`javascript
// If response varies by user input, don't cache publicly
headers: {
  'Cache-Control': 'private, no-store'
}
\`\`\`

### Option D: Validate header values
\`\`\`javascript
// If you must use headers, validate strictly
const allowedHosts = ['yourapp.com', 'www.yourapp.com'];
const host = req.headers['x-forwarded-host'];
if (!allowedHosts.includes(host)) {
  host = 'yourapp.com'; // Fallback to known good
}
\`\`\`

## Platform-specific configs

### Vercel (vercel.json)
\`\`\`json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Vary", "value": "Accept-Encoding" }
      ]
    }
  ]
}
\`\`\`

### Cloudflare (Page Rules or _headers)
Set cache key to include relevant headers in Cloudflare dashboard,
or use Cache Rules to exclude pages that reflect user input.

### Nginx
\`\`\`nginx
# Add reflected headers to cache key
proxy_cache_key "$scheme$request_method$host$request_uri$http_x_forwarded_host";
\`\`\`

## After fixing

1. Purge all cached content (CDN cache, edge caches)
2. Test that header injection no longer appears in cached responses
3. Document which headers are safe to cache and which aren't`}</div>
				</div>
			</div>

			<div class="fix-section">
				<h3>Quick fixes by platform</h3>
				<div class="platform-fixes">
					<div class="platform-fix">
						<h4>Vercel / Next.js</h4>
						<p>Vercel handles most caching securely by default. Risk is in custom API routes that reflect headers. Add <code>Vary</code> header for any reflected input, or use <code>Cache-Control: private</code>.</p>
					</div>
					<div class="platform-fix">
						<h4>Cloudflare</h4>
						<p>Use Cache Rules to exclude dynamic pages. For static pages, ensure no headers are reflected. Cloudflare's default cache key includes URL only—add headers via API if needed.</p>
					</div>
					<div class="platform-fix">
						<h4>Nginx + Varnish</h4>
						<p>Include reflected headers in <code>proxy_cache_key</code>. For Varnish, use <code>hash_data()</code> in vcl_hash to add headers to cache key. Strip dangerous headers at edge if not needed.</p>
					</div>
					<div class="platform-fix">
						<h4>AWS CloudFront</h4>
						<p>Configure Origin Request Policy to forward only needed headers. Add headers to Cache Policy key if they affect response. Default behavior caches based on URL only.</p>
					</div>
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
				<a href="/kb/security/vulnerabilities/http-request-smuggling/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">HTTP Request Smuggling</div>
					<p class="related-card-description">When proxies disagree on request boundaries</p>
				</a>
				<a href="/kb/security/vulnerabilities/xss/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Cross-Site Scripting (XSS)</div>
					<p class="related-card-description">The classic payload cache poisoning delivers</p>
				</a>
				<a href="/kb/security/vulnerabilities/missing-security-headers/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Missing Security Headers</div>
					<p class="related-card-description">Headers that protect against attacks</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Your cache is a force multiplier</h2>
			<p>Make sure it's multiplying performance, not attacks.</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">
				Scan for cache issues
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M5 12h14M12 5l7 7-7 7"/>
				</svg>
			</a>
		</div>
	</article>
</div>

<style>
	.badge-row {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1rem;
		flex-wrap: wrap;
	}

	.data-source {
		font-size: 0.75rem;
		color: var(--text-tertiary);
		margin: 0.5rem 0 1.5rem;
	}

	.data-source a {
		color: var(--text-secondary);
	}

	/* Code Comparison */
	.code-comparison {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.code-bad {
		border-left: 3px solid var(--red);
	}

	.code-good {
		border-left: 3px solid var(--green);
	}

	.code-label-bad,
	.code-label-good {
		font-size: 0.6875rem;
		padding: 0.125rem 0.5rem;
		text-transform: uppercase;
		font-weight: 600;
	}

	.code-label-bad {
		color: var(--red);
		background: rgba(255, 107, 107, 0.1);
	}

	.code-label-good {
		color: var(--green);
		background: rgba(0, 255, 136, 0.1);
	}

	/* Incident List */
	.incident-list {
		margin: 1.5rem 0;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.incident-item {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1rem 1.25rem;
		border-left: 3px solid var(--border);
	}

	.incident-critical {
		border-left-color: var(--red);
	}

	.incident-high {
		border-left-color: var(--orange);
	}

	.incident-company {
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 0.25rem;
	}

	.incident-details {
		font-size: 0.875rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.incident-details code {
		background: var(--bg-tertiary);
		padding: 0.125rem 0.375rem;
		font-size: 0.8125rem;
	}

	/* Tool Box */
	.tool-box {
		background: var(--bg-secondary);
		border-left: 3px solid var(--green);
		padding: 1rem 1.25rem;
		margin: 1.5rem 0;
	}

	.tool-box h3 {
		margin: 0 0 0.5rem;
		font-size: 0.9375rem;
	}

	.tool-box p {
		margin: 0;
		font-size: 0.875rem;
		color: var(--text-secondary);
		line-height: 1.6;
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

	/* Platform Fixes */
	.platform-fixes {
		display: grid;
		gap: 1rem;
		margin-top: 1rem;
	}

	.platform-fix {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1rem 1.25rem;
	}

	.platform-fix h4 {
		margin: 0 0 0.5rem;
		font-size: 0.9375rem;
		color: var(--text-primary);
	}

	.platform-fix p {
		margin: 0;
		font-size: 0.875rem;
		color: var(--text-secondary);
		line-height: 1.6;
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
	}

	.faq-item p {
		margin: 0;
		font-size: 0.9375rem;
		line-height: 1.7;
		color: var(--text-secondary);
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

	@media (max-width: 768px) {
		.faq-item h3 {
			font-size: 1rem;
		}

		.platform-fixes {
			grid-template-columns: 1fr;
		}
	}
</style>
