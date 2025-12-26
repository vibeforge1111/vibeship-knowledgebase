<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'HTTP Request Smuggling: Detect & Fix Guide',
		description: 'HTTP request smuggling lets attackers hijack sessions and bypass security. Learn to detect CL.TE/TE.CL vulnerabilities and fix them with copy-paste configs.',
		url: '/kb/security/vulnerabilities/http-request-smuggling/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'HTTP Request Smuggling' }
	];

	// Security references
	const securityData = {
		cweId: 'CWE-444',
		cweName: 'HTTP Request/Response Smuggling',
		cweSource: 'https://cwe.mitre.org/data/definitions/444.html',
		owaspCategory: 'A04:2021 - Insecure Design',
		owaspSource: 'https://owasp.org/Top10/A04_2021-Insecure_Design/',
		severity: 'Critical',
		cvssRange: '7.3 - 8.7'
	};

	// FAQ data for schema
	const faqs = [
		{
			question: 'What is HTTP request smuggling?',
			answer: 'HTTP request smuggling exploits differences in how front-end servers (proxies, load balancers) and back-end servers interpret HTTP request boundaries. When they disagree about where one request ends and another begins, attackers can "smuggle" hidden requests that bypass security controls. It requires a multi-server architecture to exploit.'
		},
		{
			question: 'How do I prevent HTTP request smuggling?',
			answer: 'Use HTTP/2 end-to-end between all servers. HTTP/2 has a single, unambiguous mechanism for determining request length, making smuggling impossible. If you must use HTTP/1.1, ensure all servers in your chain interpret Content-Length and Transfer-Encoding headers identically. Disable connection reuse on back-end servers as a fallback measure.'
		},
		{
			question: 'What is CL.TE and TE.CL?',
			answer: 'CL.TE means the front-end uses Content-Length while the back-end uses Transfer-Encoding. TE.CL is the reverse. These mismatches let attackers craft requests that one server sees as complete while the other sees leftover data that becomes part of the next request. Both variants enable smuggling attacks.'
		},
		{
			question: 'Is HTTP/2 vulnerable to request smuggling?',
			answer: 'Pure HTTP/2 end-to-end is immune to classic smuggling because it uses binary framing instead of text-based headers. However, HTTP/2-to-HTTP/1.1 downgrading at proxies can reintroduce vulnerabilities. If your CDN speaks HTTP/2 to browsers but HTTP/1.1 to your origin server, you may still be at risk.'
		},
		{
			question: 'Are Vercel, Netlify, and Cloudflare protected?',
			answer: 'Major managed platforms handle request parsing internally and are generally protected against smuggling between their edge and your code. However, if you run your own proxy in front of a managed platform, or use custom server configurations, you could still introduce vulnerabilities. The risk depends on your specific architecture.'
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
			{"@type": "ListItem", "position": 4, "name": "HTTP Request Smuggling"}
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
		"datePublished": "2024-12-26",
		"dateModified": "2024-12-26"
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
				<span class="badge">{securityData.cweId}</span>
				<span class="badge">OWASP A04:2021</span>
			</div>
			<h1>HTTP Request Smuggling in Vibe Coded Apps</h1>
			<p class="text-secondary">When your servers disagree about where requests end, attackers slip through the cracks</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>HTTP request smuggling happens when your front-end server (proxy/CDN) and back-end server disagree about where one HTTP request ends and another begins.</strong>
				Attackers exploit this confusion to "smuggle" hidden requests that bypass security, hijack sessions, or poison caches.
				The fix is straightforward: use HTTP/2 end-to-end, or ensure all servers parse headers identically.
			</p>
		</div>

		<!-- Stats Box -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">{securityData.cweId}</div>
				<div class="stat-label"><a href={securityData.cweSource}>CWE ID</a></div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Critical</div>
				<div class="stat-label">Severity</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">7.3-8.7</div>
				<div class="stat-label">CVSS Score</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">2005</div>
				<div class="stat-label">First Documented</div>
			</div>
		</div>
		<p class="data-source">
			Source: <a href={securityData.cweSource}>MITRE CWE-444</a>, <a href="https://portswigger.net/web-security/request-smuggling">PortSwigger Research</a>
		</p>

		<!-- What Is It - @eli5sec voice (translator, analogies) -->
		<section class="article-section">
			<h2>What is HTTP request smuggling?</h2>
			<p>
				Picture two security guards at different checkpoints. You hand them the same ID card, but one guard reads it as "VIP access" while the other reads it as "access the VIP's account." Request smuggling exploits exactly this kind of confusion between servers.
			</p>
			<p>
				In technical terms: HTTP/1.1 has two ways to say where a request ends. The <code>Content-Length</code> header says "this request is 150 bytes." The <code>Transfer-Encoding: chunked</code> header says "I'll tell you when I'm done." When your front-end proxy uses one method and your back-end server uses the other, they can disagree about request boundaries.
			</p>
			<p>
				An attacker crafts a single HTTP request that your proxy sees as one request but your back-end sees as two. The "smuggled" second request bypasses the proxy's security checks entirely. According to <a href="https://cwe.mitre.org/data/definitions/444.html">CWE-444</a>, this inconsistent interpretation enables attackers to bypass firewalls, hijack sessions, and poison web caches.
			</p>
		</section>

		<!-- Variants Explained -->
		<section class="article-section">
			<h2>Understanding CL.TE and TE.CL variants</h2>
			<p>
				The two main attack variants are named after which server uses which header:
			</p>

			<div class="variants-grid">
				<div class="variant-box">
					<h3>CL.TE (Content-Length / Transfer-Encoding)</h3>
					<p>Front-end trusts Content-Length. Back-end trusts Transfer-Encoding. The attacker sets Content-Length to cover the whole payload, but includes a chunked body that the back-end parses differently.</p>
				</div>
				<div class="variant-box">
					<h3>TE.CL (Transfer-Encoding / Content-Length)</h3>
					<p>Front-end trusts Transfer-Encoding. Back-end trusts Content-Length. The attacker uses chunked encoding that the front-end follows, but the back-end stops reading based on Content-Length.</p>
				</div>
			</div>

			<p>
				There's also TE.TE where both servers support Transfer-Encoding but can be tricked with obfuscated headers like <code>Transfer-Encoding: xchunked</code> or extra whitespace. One server processes it, the other ignores it.
			</p>
		</section>

		<!-- Why AI Tools Generate This -->
		<section class="article-section">
			<h2>Why AI tools generate vulnerable configurations</h2>
			<p>
				AI coding tools generate proxy and infrastructure configurations that can create smuggling vulnerabilities. They copy patterns from tutorials without understanding the security implications of mixed server architectures.
			</p>

			<div class="tool-patterns-box">
				<h3>Common AI-generated patterns that cause problems</h3>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">nginx.conf</span>
					</div>
					<pre><code>{`# AI often generates basic proxy configs without security hardening
upstream backend {
    server app:3000;
}

server {
    location / {
        proxy_pass http://backend;
        # Missing: proxy_http_version 1.1;
        # Missing: proxy_set_header Connection "";
    }
}`}</code></pre>
				</div>
				<p class="pattern-note">
					This config works but doesn't enforce consistent HTTP handling. If Nginx and your app server parse headers differently, smuggling becomes possible.
				</p>
			</div>

			<p>
				<strong>The core issue:</strong> AI generates "works on my machine" configs, not production-hardened ones. Microservices architectures with multiple proxy layers are especially risky. Each hop is another chance for parsing disagreements.
			</p>
		</section>

		<!-- What Could Happen -->
		<section class="article-section">
			<h2>What could happen if I have this vulnerability?</h2>
			<p>
				In 2022, researchers found Apple's core web applications vulnerable to HTTP request smuggling via CL.TE discrepancies. The attack enabled session hijacking and sensitive data exposure. Request smuggling isn't theoretical.
			</p>
			<ul class="consequences-list">
				<li><strong>Security bypass:</strong> Smuggled requests skip the front-end proxy entirely. WAF rules, authentication checks, rate limiting. None of it applies to the hidden request.</li>
				<li><strong>Session hijacking:</strong> Poison the connection so the next legitimate user's request gets your smuggled prefix. Their session cookie goes to your callback URL.</li>
				<li><strong>Web cache poisoning:</strong> Smuggle a request that poisons cached responses. Every user who hits that cache gets your malicious content.</li>
				<li><strong>Internal system access:</strong> Reach internal endpoints that the proxy was supposed to block. Admin panels, debugging interfaces, internal APIs.</li>
			</ul>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How do I detect HTTP request smuggling?</h2>
			<p>
				Request smuggling requires a specific architecture: at least one front-end server (proxy, load balancer, CDN) and a back-end server that might parse HTTP differently. If your app runs on a single server with no proxy, you're not vulnerable to this specific attack.
			</p>

			<div class="detection-checklist">
				<h3>First, check if you're even at risk</h3>
				<ul>
					<li>Using Nginx, Apache, or HAProxy in front of your app server?</li>
					<li>Running behind a custom CDN configuration?</li>
					<li>Multiple proxy layers (CDN → load balancer → app)?</li>
					<li>Mixing HTTP/2 at the edge with HTTP/1.1 to origin?</li>
				</ul>
				<p>If you answered yes to any of these, continue testing. If your app runs directly on Vercel, Netlify, or similar managed platforms without custom proxies, you're likely protected by their internal handling.</p>
			</div>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Manual test approach</span>
				</div>
				<pre><code>{`# Timing-based detection: if vulnerable, this causes a delay
# because the back-end waits for more chunked data

POST / HTTP/1.1
Host: vulnerable-website.com
Content-Length: 4
Transfer-Encoding: chunked

1
Z
Q

# If the response is delayed ~5-10 seconds, CL.TE may be present
# The front-end forwards 4 bytes, back-end expects more chunks`}</code></pre>
			</div>

			<div class="cta-box">
				<p><strong>Automated scanning catches these faster.</strong></p>
				<a href="https://scanner.vibeship.co" class="btn btn-green">
					Scan your infrastructure
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M5 12h14M12 5l7 7-7 7"/>
					</svg>
				</a>
			</div>
		</section>

		<!-- How to Fix -->
		<section class="article-section">
			<h2>How do I fix HTTP request smuggling?</h2>
			<p>
				The definitive fix is using HTTP/2 end-to-end. HTTP/2's binary framing eliminates the ambiguity that makes smuggling possible. No Content-Length vs Transfer-Encoding confusion, no smuggling.
			</p>

			<!-- AI Fix Prompt -->
			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>Copy this into your AI coding tool to audit and fix proxy configurations:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Audit my proxy/server configuration for HTTP request smuggling vulnerabilities.

## What to look for

1. Multiple servers in the request chain (proxy → app, CDN → origin)
2. HTTP/1.1 connections between servers (vulnerable to CL/TE confusion)
3. Missing or inconsistent header handling configuration
4. Connection reuse enabled on back-end connections

## Files to check

- nginx.conf, nginx/*.conf
- Caddyfile
- haproxy.cfg
- Apache httpd.conf, sites-available/*
- Docker Compose proxy service definitions
- Kubernetes Ingress configurations
- Any reverse proxy configuration files

## How to fix

### Nginx - enforce consistent behavior:
\`\`\`nginx
upstream backend {
    server app:3000;
    keepalive 32;
}

server {
    # Use HTTP/1.1 with explicit connection handling
    proxy_http_version 1.1;
    proxy_set_header Connection "";

    # Normalize ambiguous requests
    proxy_request_buffering on;

    # Or better - use HTTP/2 to backend if supported
    # proxy_http_version 2;
}
\`\`\`

### Caddy - already safe by default:
\`\`\`
# Caddy handles this correctly out of the box
# Just ensure you're on a recent version (2.x)
\`\`\`

### Node.js/Express - if running behind proxy:
\`\`\`javascript
// Trust proxy headers only from known sources
app.set('trust proxy', 'loopback');

// Reject ambiguous requests at app level
app.use((req, res, next) => {
  if (req.headers['transfer-encoding'] && req.headers['content-length']) {
    return res.status(400).send('Ambiguous request');
  }
  next();
});
\`\`\`

## After fixing

1. Test with timing-based detection to verify fix
2. Ensure all servers in chain are updated
3. Consider enabling HTTP/2 end-to-end if possible
4. List all configuration files you modified`}</div>
				</div>
			</div>

			<!-- Manual Fix -->
			<div class="fix-section">
				<h3>Quick fixes by platform</h3>

				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-block-header">
							<span class="code-block-lang status-bad">VULNERABLE (Nginx)</span>
						</div>
						<pre><code>{`# Default proxy config - parsing inconsistencies possible
location / {
    proxy_pass http://backend;
}`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-block-header">
							<span class="code-block-lang status-good">SECURE (Nginx)</span>
						</div>
						<pre><code>{`# Hardened proxy config - consistent HTTP handling
location / {
    proxy_pass http://backend;
    proxy_http_version 1.1;
    proxy_set_header Connection "";
    proxy_request_buffering on;

    # Reject requests with both CL and TE
    if ($http_transfer_encoding ~* "chunked" ) {
        set $ambiguous "${"$"}{ambiguous}TE";
    }
    if ($content_length) {
        set $ambiguous "${"$"}{ambiguous}CL";
    }
    if ($ambiguous = "TECL") {
        return 400;
    }
}`}</code></pre>
					</div>
				</div>

				<div class="platform-note">
					<strong>Best fix:</strong> Enable HTTP/2 between your CDN/proxy and origin server. Cloudflare, AWS ALB, and most modern load balancers support this. HTTP/2 end-to-end eliminates the vulnerability class entirely.
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
					<p class="related-card-description">Poison CDN caches to serve malicious content</p>
				</a>
				<a href="/kb/security/vulnerabilities/ssrf/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Server-Side Request Forgery</div>
					<p class="related-card-description">Trick servers into making internal requests</p>
				</a>
				<a href="/kb/security/vulnerabilities/missing-security-headers/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Missing Security Headers</div>
					<p class="related-card-description">Essential HTTP headers for protection</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Complex infrastructure needs comprehensive scanning</h2>
			<p>Request smuggling hides in proxy configurations. Catch it before attackers do.</p>
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

	/* Variants Grid */
	.variants-grid {
		display: grid;
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.variant-box {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.25rem;
	}

	.variant-box h3 {
		font-size: 0.9375rem;
		margin: 0 0 0.5rem;
		color: var(--text-primary);
	}

	.variant-box p {
		margin: 0;
		font-size: 0.875rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

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

	.pattern-note {
		margin: 1rem 0 0 !important;
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	/* Consequences List */
	.consequences-list {
		list-style: none;
		padding: 0;
		margin: 1rem 0 0;
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

	/* Detection Checklist */
	.detection-checklist {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.detection-checklist h3 {
		margin: 0 0 0.75rem;
		font-size: 1rem;
	}

	.detection-checklist ul {
		margin: 0 0 1rem;
		padding-left: 1.25rem;
	}

	.detection-checklist li {
		margin-bottom: 0.5rem;
		color: var(--text-secondary);
	}

	.detection-checklist > p {
		margin: 0;
		font-size: 0.875rem;
		color: var(--text-tertiary);
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

	/* Code Comparison */
	.code-comparison {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.code-block.vulnerable .code-block-header {
		border-left: 3px solid var(--red);
	}

	.code-block.secure .code-block-header {
		border-left: 3px solid var(--green);
	}

	.status-bad {
		color: var(--red);
	}

	.status-good {
		color: var(--green);
	}

	/* Platform Note */
	.platform-note {
		background: var(--bg-secondary);
		border-left: 3px solid var(--green);
		padding: 1rem 1.25rem;
		margin: 1.5rem 0;
		font-size: 0.9375rem;
		color: var(--text-secondary);
	}

	.platform-note strong {
		color: var(--text-primary);
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

	/* Responsive */
	@media (max-width: 768px) {
		.variants-grid {
			grid-template-columns: 1fr;
		}

		.faq-item h3 {
			font-size: 1rem;
		}
	}
</style>
