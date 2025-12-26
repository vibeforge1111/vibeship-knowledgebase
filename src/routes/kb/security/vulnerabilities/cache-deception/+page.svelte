<script lang="ts">
	import { Header } from '$lib/components/layout';

	const meta = {
		title: 'Web Cache Deception: Detect & Fix Guide',
		description: 'Web cache deception tricks caches into storing sensitive user data. Learn how path confusion attacks work and how to prevent them in your applications.',
		url: '/kb/security/vulnerabilities/cache-deception/'
	};

	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Cache Deception' }
	];

	const securityData = {
		cweId: 'CWE-525',
		cweName: 'Use of Web Browser Cache Containing Sensitive Information',
		cweSource: 'https://cwe.mitre.org/data/definitions/525.html',
		owaspCategory: 'A05:2021 - Security Misconfiguration',
		owaspSource: 'https://owasp.org/Top10/A05_2021-Security_Misconfiguration/',
		severity: 'High',
		cvssScore: '7.5-8.5'
	};

	const faqs = [
		{
			question: 'What is web cache deception?',
			answer: 'Web cache deception tricks a cache (CDN, reverse proxy) into storing sensitive user data under a URL that looks like a static file. The attacker crafts a URL like /account/profile.css—your app serves the account page, but the cache stores it as a "static file." Anyone requesting that URL gets the victim\'s private data from cache.'
		},
		{
			question: 'How is cache deception different from cache poisoning?',
			answer: 'Cache poisoning injects malicious content INTO the cache that gets served to victims. Cache deception tricks the cache into storing legitimate private content that shouldn\'t be cached. Poisoning = attacker adds bad stuff. Deception = attacker exposes your private stuff. Different attack, different fixes.'
		},
		{
			question: 'How do I prevent cache deception?',
			answer: 'Set Cache-Control: no-store on all authenticated/dynamic pages. Configure your cache to only cache explicit paths, not by file extension. Normalize paths before routing. Reject requests with path confusion patterns like /account/anything.css. Validate that cached URLs match expected static asset patterns.'
		},
		{
			question: 'What causes cache deception vulnerabilities?',
			answer: 'The root cause is path interpretation differences. Your app sees /account/x.css and routes to /account (ignoring the suffix). Your cache sees .css and thinks "static file, cache it." This gap between how origin and cache interpret the same URL creates the vulnerability.'
		},
		{
			question: 'Can CDNs prevent cache deception?',
			answer: 'CDNs can help but aren\'t automatic protection. Configure cache rules to only cache explicit paths, not extensions. Use origin Cache-Control headers as the source of truth. Enable "cache by header" to respect no-store directives. Some CDNs offer path normalization—enable it. But ultimately, your app must send correct caching headers.'
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
			{"@type": "ListItem", "position": 4, "name": "Cache Deception"}
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
				<span class="badge badge-high">High Severity</span>
				<span class="badge">{securityData.cweId}</span>
				<span class="badge">OWASP A05</span>
			</div>
			<h1>Web Cache Deception in Vibe Coded Apps</h1>
			<p class="text-secondary">When your cache stores secrets it shouldn't</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Cache deception tricks your cache into storing private data under public URLs.</strong>
				Attacker sends victim to <code>/account/x.css</code>. Your app serves the account page. Your cache sees ".css" and stores it. Now anyone can fetch the victim's private data from cache. Fix: Set <code>Cache-Control: no-store</code> on all authenticated pages and configure cache rules by path, not extension.
			</p>
		</div>

		<!-- Stats Box -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">Path</div>
				<div class="stat-label">Confusion attack</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">CDN</div>
				<div class="stat-label">Misconfig exploited</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Private</div>
				<div class="stat-label">Data exposed publicly</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Headers</div>
				<div class="stat-label">Cache-Control missing</div>
			</div>
		</div>

		<!-- What Is It - @danawhy voice (debugger, investigative) -->
		<section class="article-section">
			<h2>What is web cache deception?</h2>
			<p>
				Cache deception is like tricking a filing clerk into putting your private medical records in the "public documents" folder by labeling them with a .pdf extension. The clerk sees the extension and files it publicly. Anyone can now access your private records.
			</p>

			<div class="attack-flow">
				<div class="attack-step">
					<div class="step-number">1</div>
					<div class="step-content">
						<h3>Attacker crafts URL</h3>
						<code>/account/profile.css</code>
						<p>Appends static file extension to authenticated page</p>
					</div>
				</div>
				<div class="attack-arrow">→</div>
				<div class="attack-step">
					<div class="step-number">2</div>
					<div class="step-content">
						<h3>Victim visits link</h3>
						<p>Logged in user clicks the crafted URL</p>
					</div>
				</div>
				<div class="attack-arrow">→</div>
				<div class="attack-step">
					<div class="step-number">3</div>
					<div class="step-content">
						<h3>App serves private page</h3>
						<p>Ignores <code>.css</code> suffix, serves <code>/account</code></p>
					</div>
				</div>
				<div class="attack-arrow">→</div>
				<div class="attack-step">
					<div class="step-number">4</div>
					<div class="step-content">
						<h3>Cache stores response</h3>
						<p>Sees <code>.css</code> → "static file" → cached</p>
					</div>
				</div>
				<div class="attack-arrow">→</div>
				<div class="attack-step">
					<div class="step-number">5</div>
					<div class="step-content">
						<h3>Attacker fetches cached data</h3>
						<p>Gets victim's private account page from cache</p>
					</div>
				</div>
			</div>

			<div class="root-cause">
				<strong>Root cause:</strong> Your app and your cache interpret the same URL differently. The app sees the route. The cache sees the extension. This interpretation gap is the vulnerability.
			</div>
		</section>

		<!-- Why Vibe Coded Apps -->
		<section class="article-section">
			<h2>Why vibe coded apps are vulnerable</h2>
			<p>
				AI generates routes and CDN configs separately. It doesn't think about how they interact. The path handling works. The caching works. But together, they create a vulnerability.
			</p>

			<div class="code-comparison">
				<div class="code-block code-bad">
					<div class="code-block-header">
						<span class="code-block-lang">Vulnerable - Missing cache headers + permissive routing</span>
						<span class="code-label-bad">Exploitable</span>
					</div>
					<pre><code>{`// Express route - handles /account and /account/anything
app.get('/account*', requireAuth, (req, res) => {
  // No Cache-Control header set!
  res.render('account', { user: req.user });
});

// CDN config (Cloudflare, Fastly, etc.)
// "Cache static files by extension"
// *.css, *.js, *.png → Cache for 1 day

// Attack: /account/x.css
// App: serves /account page with user data
// CDN: sees .css, caches for 1 day
// Result: private data publicly cached`}</code></pre>
				</div>
				<div class="code-block code-good">
					<div class="code-block-header">
						<span class="code-block-lang">Secure - Explicit cache headers + strict routing</span>
						<span class="code-label-good">Fixed</span>
					</div>
					<pre><code>{`// Middleware: Set cache headers for authenticated routes
const noCacheAuth = (req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
};

// Strict route - exact match only
app.get('/account', requireAuth, noCacheAuth, (req, res) => {
  res.render('account', { user: req.user });
});

// Reject path confusion attempts
app.use((req, res, next) => {
  const staticExtensions = /\\.(css|js|png|jpg|gif|ico|woff|svg)$/i;
  if (staticExtensions.test(req.path) && !req.path.startsWith('/static/')) {
    return res.status(404).send('Not found');
  }
  next();
});

// CDN: Only cache /static/* paths, ignore extensions elsewhere`}</code></pre>
				</div>
			</div>

			<p>
				The vulnerability exists in the gap. Vibe coders ask AI to "add caching" and "create routes" as separate tasks. The AI doesn't see how they interact—that's where cache deception lives.
			</p>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How to detect cache deception</h2>
			<p>
				Test whether authenticated pages can be cached by appending static extensions.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Testing for Cache Deception</span>
				</div>
				<pre><code>{`# Step 1: Login and get session cookie
# Visit /account normally, confirm you see private data

# Step 2: Visit path-confused URL
curl -I "https://target.com/account/test.css" -H "Cookie: session=YOUR_SESSION"
# Check response headers:
# - Is there Cache-Control: no-store? (GOOD)
# - Is there a cache header like X-Cache: HIT? (BAD)
# - Does it return your private account page? (BAD if cached)

# Step 3: Fetch without auth
curl -I "https://target.com/account/test.css"
# If you get the private page content: VULNERABLE

# Step 4: Try different extensions
for ext in css js png jpg gif ico woff svg; do
  echo "Testing .$ext"
  curl -s "https://target.com/account/x.$ext" | grep -i "private\\|email\\|account"
done

# Step 5: Try path variations
/account/..%2ftest.css
/account;test.css
/account%00.css
/account/.css`}</code></pre>
			</div>

			<div class="check-list">
				<h3>Cache deception audit checklist</h3>
				<ul>
					<li>Do authenticated pages return Cache-Control: no-store?</li>
					<li>Does CDN cache by path prefix, not extension?</li>
					<li>Are path confusion patterns rejected (404)?</li>
					<li>Is Vary: Cookie set for personalized pages?</li>
					<li>Can you fetch another user's cached data?</li>
				</ul>
			</div>

			<div class="cta-box">
				<p><strong>Cache configs often hide vulnerabilities.</strong></p>
				<a href="https://scanner.vibeship.co" class="btn btn-green">
					Scan your cache headers
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M5 12h14M12 5l7 7-7 7"/>
					</svg>
				</a>
			</div>
		</section>

		<!-- How to Fix -->
		<section class="article-section">
			<h2>How to fix cache deception</h2>
			<p>
				Defense in depth: correct headers, strict routing, and proper CDN config.
			</p>

			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>Copy this into your AI coding tool to find and fix cache deception vulnerabilities:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Audit my codebase for web cache deception vulnerabilities.

## What to search for

1. Routes without Cache-Control headers:
   \`\`\`
   app.get('/account
   app.get('/profile
   app.get('/dashboard
   app.get('/settings
   app.get('/api/me
   \`\`\`
   Any authenticated route missing explicit cache headers.

2. Wildcard routes that could match static extensions:
   \`\`\`
   app.get('/account*'
   app.get('/user/:id*'
   router.get('/*'
   \`\`\`

3. CDN/cache configurations:
   \`\`\`
   # Cloudflare Page Rules
   # Nginx proxy_cache
   # Varnish VCL
   # Fastly configs
   \`\`\`
   Look for "cache by extension" rules.

## Required fixes

### Fix 1: Add no-cache headers to all authenticated routes
\`\`\`typescript
// middleware/noCache.ts
export const noCache = (req: Request, res: Response, next: NextFunction) => {
  res.set({
    'Cache-Control': 'no-store, no-cache, must-revalidate, private',
    'Pragma': 'no-cache',
    'Expires': '0',
    'Surrogate-Control': 'no-store'  // For CDNs
  });
  next();
};

// Apply to all authenticated routes
app.use('/account', requireAuth, noCache);
app.use('/profile', requireAuth, noCache);
app.use('/dashboard', requireAuth, noCache);
app.use('/api/me', requireAuth, noCache);
\`\`\`

### Fix 2: Reject path confusion patterns
\`\`\`typescript
// middleware/pathValidation.ts
const STATIC_EXTENSIONS = /\\.(css|js|png|jpg|jpeg|gif|ico|woff|woff2|ttf|svg|map)$/i;
const STATIC_PATHS = ['/static/', '/assets/', '/public/', '/_next/static/'];

export const rejectPathConfusion = (req: Request, res: Response, next: NextFunction) => {
  // If URL looks like static file but isn't in static paths
  if (STATIC_EXTENSIONS.test(req.path)) {
    const isStaticPath = STATIC_PATHS.some(p => req.path.startsWith(p));
    if (!isStaticPath) {
      return res.status(404).json({ error: 'Not found' });
    }
  }
  next();
};

// Apply early in middleware chain
app.use(rejectPathConfusion);
\`\`\`

### Fix 3: Use exact route matching
\`\`\`typescript
// Instead of wildcard
app.get('/account*', handler);  // BAD

// Use exact matches
app.get('/account', handler);           // GOOD
app.get('/account/settings', handler);  // GOOD
app.get('/account/security', handler);  // GOOD
\`\`\`

### Fix 4: Configure CDN correctly
\`\`\`
# Cloudflare: Cache by path, not extension
# Only cache /static/* paths
# Respect origin Cache-Control headers

# Nginx example
location /static/ {
    expires 1d;
    add_header Cache-Control "public, max-age=86400";
}

location / {
    # Don't cache by default - respect origin headers
    proxy_pass http://backend;
    proxy_cache_bypass $http_cache_control;
}
\`\`\`

### Fix 5: Add Vary header for personalized content
\`\`\`typescript
// For pages that vary by user
res.set('Vary', 'Cookie, Authorization');
\`\`\`

## After fixing

1. Test authenticated pages with static extensions appended
2. Verify Cache-Control: no-store is present
3. Confirm CDN doesn't cache authenticated responses
4. Check path confusion patterns return 404
5. Test from different sessions to ensure no cross-user caching`}</div>
				</div>
			</div>

			<div class="fix-section">
				<h3>Cache deception vs cache poisoning</h3>
				<div class="comparison-table">
					<div class="comparison-row header">
						<div class="comparison-cell">Aspect</div>
						<div class="comparison-cell">Cache Deception</div>
						<div class="comparison-cell">Cache Poisoning</div>
					</div>
					<div class="comparison-row">
						<div class="comparison-cell">Attack goal</div>
						<div class="comparison-cell">Expose victim's private data</div>
						<div class="comparison-cell">Serve malicious content to victims</div>
					</div>
					<div class="comparison-row">
						<div class="comparison-cell">What's cached</div>
						<div class="comparison-cell">Legitimate private data</div>
						<div class="comparison-cell">Attacker-controlled content</div>
					</div>
					<div class="comparison-row">
						<div class="comparison-cell">Victim action</div>
						<div class="comparison-cell">Visits attacker's URL</div>
						<div class="comparison-cell">Visits normal URL</div>
					</div>
					<div class="comparison-row">
						<div class="comparison-cell">Primary fix</div>
						<div class="comparison-cell">Cache-Control: no-store</div>
						<div class="comparison-cell">Cache key includes all inputs</div>
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
				<a href="/kb/security/vulnerabilities/web-cache-poisoning/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Web Cache Poisoning</div>
					<p class="related-card-description">Injecting malicious content into cache</p>
				</a>
				<a href="/kb/security/vulnerabilities/sensitive-data-exposure/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Sensitive Data Exposure</div>
					<p class="related-card-description">Protecting private information</p>
				</a>
				<a href="/kb/security/vulnerabilities/missing-security-headers/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Missing Security Headers</div>
					<p class="related-card-description">HTTP header configuration</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Your private pages should stay private</h2>
			<p>Don't let your cache expose sensitive data.</p>
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

	/* Attack Flow */
	.attack-flow {
		display: flex;
		align-items: flex-start;
		gap: 0.5rem;
		margin: 1.5rem 0;
		overflow-x: auto;
		padding: 1rem 0;
	}

	.attack-step {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1rem;
		min-width: 140px;
		flex-shrink: 0;
	}

	.step-number {
		width: 24px;
		height: 24px;
		background: var(--green-dim);
		color: var(--green);
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		font-size: 0.75rem;
		margin-bottom: 0.5rem;
	}

	.step-content h3 {
		font-size: 0.8125rem;
		margin: 0 0 0.25rem;
	}

	.step-content code {
		font-size: 0.75rem;
		background: var(--bg-tertiary);
		padding: 0.125rem 0.25rem;
		display: block;
		margin-bottom: 0.25rem;
	}

	.step-content p {
		font-size: 0.75rem;
		color: var(--text-tertiary);
		margin: 0;
		line-height: 1.4;
	}

	.attack-arrow {
		color: var(--text-tertiary);
		font-size: 1.25rem;
		flex-shrink: 0;
		align-self: center;
	}

	/* Root Cause Box */
	.root-cause {
		background: var(--bg-tertiary);
		border-left: 3px solid var(--orange);
		padding: 1rem 1.25rem;
		margin: 1.5rem 0;
		font-size: 0.9375rem;
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

	/* Check List */
	.check-list {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.check-list h3 {
		margin: 0 0 1rem;
		font-size: 1rem;
	}

	.check-list ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.check-list li {
		padding: 0.5rem 0;
		border-bottom: 1px solid var(--border);
		font-size: 0.9375rem;
		color: var(--text-secondary);
	}

	.check-list li:last-child {
		border-bottom: none;
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

	/* Comparison Table */
	.comparison-table {
		border: 1px solid var(--border);
		margin: 1rem 0;
	}

	.comparison-row {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
	}

	.comparison-row.header {
		background: var(--bg-tertiary);
		font-weight: 600;
	}

	.comparison-row:not(:last-child) {
		border-bottom: 1px solid var(--border);
	}

	.comparison-cell {
		padding: 0.75rem 1rem;
		font-size: 0.875rem;
		border-right: 1px solid var(--border);
	}

	.comparison-cell:last-child {
		border-right: none;
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
		.attack-flow {
			flex-direction: column;
		}

		.attack-arrow {
			transform: rotate(90deg);
		}

		.comparison-row {
			grid-template-columns: 1fr;
		}

		.comparison-cell {
			border-right: none;
			border-bottom: 1px solid var(--border);
		}

		.faq-item h3 {
			font-size: 1rem;
		}
	}
</style>
