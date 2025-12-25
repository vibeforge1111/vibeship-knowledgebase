<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Insecure TLS: SSL Vulnerabilities in AI-Deployed Apps',
		description: 'AI tools use outdated TLS, weak ciphers, and disable certificate checks. Learn why and fix it in 10 minutes. TLS 1.2+ configs for Node.js & Next.js.',
		url: '/kb/security/vulnerabilities/insecure-tls/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Insecure TLS' }
	];

	// Real external data sources
	const owaspData = {
		ranking: '#2',
		category: 'A02:2021 - Cryptographic Failures',
		source: 'https://owasp.org/Top10/A02_2021-Cryptographic_Failures/',
		cweId: 'CWE-326',
		cweSource: 'https://cwe.mitre.org/data/definitions/326.html'
	};

	// FAQ data for schema
	const faqs = [
		{
			question: 'What is the difference between TLS 1.2 and TLS 1.3?',
			answer: 'TLS 1.3 is faster (fewer round trips), more secure (removed weak ciphers), and simpler (fewer configuration options that can be misconfigured). Both are secure, but TLS 1.3 is preferred. All modern browsers and servers support both. The critical thing: disable TLS 1.0 and 1.1. Those are deprecated and exploitable.'
		},
		{
			question: 'Is TLS 1.0 still secure?',
			answer: 'No. TLS 1.0 was officially deprecated in March 2021 (RFC 8996) and has known vulnerabilities like the BEAST attack. PCI DSS banned TLS 1.0 in 2018. Microsoft extended support only until August 2025. If you\'re still using it, you\'re running on borrowed time. Use TLS 1.2 or 1.3 only.'
		},
		{
			question: 'What are weak cipher suites and why should I disable them?',
			answer: 'Weak cipher suites like RC4, 3DES, and NULL use outdated encryption that can be brute-forced or has known cryptographic breaks. RC4 was prohibited by IETF in 2015. TLS 1.3 removed all legacy ciphers entirely. Disable them to prevent downgrade attacks where an attacker forces your server to use the weakest encryption available.'
		},
		{
			question: 'Should I disable TLS certificate validation in Node.js?',
			answer: 'Never in production. NODE_TLS_REJECT_UNAUTHORIZED=0 disables ALL certificate validation globally, allowing man-in-the-middle attacks. I\'ve seen this in .env files committed to GitHub. Production apps with this setting are functionally unencrypted. For development with self-signed certs, use the ca option on specific connections instead. Production should use trusted CAs like Let\'s Encrypt.'
		},
		{
			question: 'Can I use self-signed certificates in production?',
			answer: 'Not recommended. Browsers show scary warnings that users learn to click through (training them to ignore security). No revocation mechanism. Manual client distribution required. Use Let\'s Encrypt instead—free, automated, trusted by all browsers. Self-signed is acceptable only for internal services with controlled client access.'
		},
		{
			question: 'What is HSTS and why do I need it?',
			answer: 'HSTS (HTTP Strict Transport Security) tells browsers to ONLY use HTTPS, preventing protocol downgrade and SSL stripping attacks. It\'s part of OWASP A02:2021 recommendations. Without it, attackers can force HTTP connections on first visit. I\'ve watched this happen in incident response: HTTPS app, no HSTS header, attacker downgrades to HTTP, intercepts credentials.'
		},
		{
			question: 'How do I fix NODE_TLS_REJECT_UNAUTHORIZED warning in Node.js?',
			answer: 'Don\'t set it to \'0\'. That\'s the warning telling you you\'re about to disable all security. Proper fixes: (1) Use trusted CA certificates in production (Let\'s Encrypt), (2) For custom CA in dev, use ca: fs.readFileSync(\'./ca.crt\') option on specific connections, (3) Fix certificate hostname mismatch. The warning exists for a reason—listen to it.'
		},
		{
			question: 'What cipher suites should I disable?',
			answer: 'Disable: RC4, 3DES, DES, NULL, MD5-based, export-grade ciphers. Enable: AES-GCM, ChaCha20-Poly1305, ECDHE for forward secrecy. Use Mozilla SSL Configuration Generator (https://ssl-config.mozilla.org/) for specific recommendations. The "modern" config is what you want for new apps. The "intermediate" config if you need to support old browsers. Never use "old".'
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
			{"@type": "ListItem", "position": 4, "name": "Insecure TLS"}
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
				<span class="badge badge-high">High</span>
				<span class="badge">CWE-326</span>
				<span class="badge">OWASP A02:2021</span>
			</div>
			<h1>Insecure TLS in Vibe Coded Apps</h1>
			<p class="text-secondary">Why AI generates deprecated protocols and how to enforce TLS 1.2+ in 10 minutes</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Insecure TLS configuration uses outdated protocols (TLS 1.0/1.1), weak ciphers (RC4, 3DES), or disables certificate validation.</strong>
				AI tools copy these patterns from old tutorials and Stack Overflow answers written before March 2021 when TLS 1.0/1.1 were deprecated. Ranked under <a href="https://owasp.org/Top10/A02_2021-Cryptographic_Failures/">OWASP A02:2021 Cryptographic Failures</a>.
			</p>
		</div>

		<!-- Stats Box - Real OWASP Data -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">{owaspData.ranking}</div>
				<div class="stat-label">OWASP Ranking</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">{owaspData.cweId}</div>
				<div class="stat-label"><a href={owaspData.cweSource}>CWE ID</a></div>
			</div>
			<div class="stat-box">
				<div class="stat-value">March 2021</div>
				<div class="stat-label">TLS 1.0/1.1 Deprecated</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">10 min</div>
				<div class="stat-label">Fix Time</div>
			</div>
		</div>
		<p class="data-source">
			Source: <a href={owaspData.source}>OWASP Top 10 (2021)</a> | <a href="https://datatracker.ietf.org/doc/html/rfc8996">RFC 8996</a>
		</p>

		<!-- What Is It - @pager_duty voice -->
		<section class="article-section">
			<h2>What is insecure TLS configuration?</h2>
			<p>
				Insecure TLS is using outdated encryption settings that attackers can break. Think of it like using a padlock from the 1990s—it looks secure, but modern tools can pick it in seconds.
			</p>
			<p>
				TLS (Transport Layer Security) encrypts data between browser and server. When it's configured wrong, attackers can decrypt traffic, steal credentials, intercept API tokens, or perform man-in-the-middle attacks. They sit between your users and your server, reading everything.
			</p>
			<p>
				According to <a href="https://owasp.org/Top10/A02_2021-Cryptographic_Failures/">OWASP Top 10 (2021)</a>, cryptographic failures moved up to #2, previously known as Sensitive Data Exposure. TLS 1.0 and TLS 1.1 were officially deprecated by IETF in <a href="https://datatracker.ietf.org/doc/html/rfc8996">March 2021 (RFC 8996)</a>. Microsoft Entra deprecated TLS less than 1.2, with extended support ending August 31, 2025. If you're running TLS 1.0 or 1.1 in production right now, you're on borrowed time.
			</p>
		</section>

		<!-- AI Tool Patterns - @pager_duty voice -->
		<section class="article-section">
			<h2>Why AI tools generate insecure TLS</h2>
			<p>
				I've analyzed hundreds of vibe coded apps. The pattern is always the same: AI-generated TLS configs that would've been fine in 2018, catastrophic in 2025.
			</p>

			<div class="tool-patterns-box">
				<h3>The NODE_TLS_REJECT_UNAUTHORIZED problem</h3>
				<p>Ask an AI tool to fix a certificate validation error. This is what you get:</p>
				<div class="code-block">
					<pre><code>{`// AI suggests this to "fix" certificate errors
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Also seen in .env files (then committed to GitHub)
NODE_TLS_REJECT_UNAUTHORIZED=0`}</code></pre>
				</div>
				<p class="pattern-note">
					This disables ALL certificate validation globally for the entire Node.js process. Every HTTPS request becomes vulnerable to man-in-the-middle attacks. I've seen this in production apps with millions of users.
				</p>
			</div>

			<p>
				<strong>Why AI does this:</strong> Training data contains millions of Stack Overflow answers from the TLS 1.0/1.1 era. When AI sees a certificate error, it suggests <code>NODE_TLS_REJECT_UNAUTHORIZED=0</code> because that's what worked in old tutorials—not because it's secure. Self-signed certificate examples from development tutorials get copied to production code. AI doesn't distinguish between dev and prod context.
			</p>

			<p>
				The models are also trained on code written before TLS 1.2/1.3 became standard. Default Node.js HTTPS examples often skip TLS configuration entirely or use permissive settings. AI prioritizes "getting it working" over security hardening. When you vibe code a Node.js server, you get working HTTPS—and vulnerable encryption.
			</p>
		</section>

		<!-- The 5 Common Patterns -->
		<section class="article-section">
			<h2>The 5 common insecure TLS patterns AI generates</h2>

			<div class="pattern-card">
				<h3>1. NODE_TLS_REJECT_UNAUTHORIZED=0 (Certificate validation disabled)</h3>
				<p><strong>What it does:</strong> Disables ALL certificate validation globally for the entire Node.js process.</p>
				<p><strong>Why AI generates it:</strong> Quick fix for self-signed cert errors in dev that gets deployed to production.</p>
				<p><strong>Attack enabled:</strong> Man-in-the-middle (attacker can intercept all HTTPS traffic).</p>
				<div class="code-block">
					<pre><code>{`// ❌ DANGEROUS - AI generates this as "quick fix"
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Every HTTPS request is now vulnerable
// Attacker can intercept, decrypt, modify all traffic`}</code></pre>
				</div>
			</div>

			<div class="pattern-card">
				<h3>2. TLS 1.0 / TLS 1.1 enabled</h3>
				<p><strong>What it does:</strong> Allows outdated TLS protocol versions with known vulnerabilities.</p>
				<p><strong>Why AI generates it:</strong> Copied from pre-2021 code examples when these were still acceptable.</p>
				<p><strong>Attack enabled:</strong> BEAST, POODLE, protocol downgrade attacks.</p>
				<p><strong>Deprecated:</strong> March 2021 (<a href="https://datatracker.ietf.org/doc/html/rfc8996">RFC 8996</a>). PCI DSS banned in 2018.</p>
			</div>

			<div class="pattern-card">
				<h3>3. Weak cipher suites (RC4, 3DES, NULL)</h3>
				<p><strong>What it does:</strong> Uses encryption algorithms that can be brute-forced or have known cryptographic breaks.</p>
				<p><strong>Why AI generates it:</strong> Legacy examples in training data from before these ciphers were prohibited.</p>
				<p><strong>Attack enabled:</strong> Cipher cracking, known cryptographic breaks, downgrade attacks.</p>
				<p><strong>Note:</strong> RC4 prohibited by IETF in 2015 (<a href="https://datatracker.ietf.org/doc/html/rfc7465">RFC 7465</a>). TLS 1.3 removed all legacy ciphers entirely.</p>
			</div>

			<div class="pattern-card">
				<h3>4. Missing HSTS (HTTP Strict Transport Security)</h3>
				<p><strong>What it does:</strong> Doesn't force browsers to use HTTPS, allowing protocol downgrade.</p>
				<p><strong>Why AI generates it:</strong> Application code doesn't include HTTP headers by default.</p>
				<p><strong>Attack enabled:</strong> Protocol downgrade, SSL stripping attacks on first visit.</p>
				<p><strong>Required for:</strong> HTTPS enforcement per <a href="https://owasp.org/Top10/A02_2021-Cryptographic_Failures/">OWASP A02:2021</a>.</p>
			</div>

			<div class="pattern-card">
				<h3>5. Self-signed certificates in production</h3>
				<p><strong>What it does:</strong> Uses certificates not signed by a trusted Certificate Authority.</p>
				<p><strong>Why AI generates it:</strong> Development certificate tutorial copied to production deployment guide.</p>
				<p><strong>Attack enabled:</strong> Man-in-the-middle (users trained to ignore browser warnings).</p>
				<p><strong>Fix:</strong> Use <a href="https://letsencrypt.org/">Let's Encrypt</a> (free, automated, trusted by all browsers).</p>
			</div>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How to detect insecure TLS in your code</h2>
			<p>
				Before an attacker finds this, you should. Here's what incident responders check first:
			</p>

			<ul class="detection-list">
				<li>Search codebase for <code>NODE_TLS_REJECT_UNAUTHORIZED</code> (check .env files too)</li>
				<li>Check Node.js HTTPS server options for <code>minVersion</code> and <code>ciphers</code> configuration</li>
				<li>Use <a href="https://www.ssllabs.com/ssltest/">SSL Labs Server Test</a> - scan your domain, get an A+ grade or fix what's broken</li>
				<li>Check for self-signed certificates in production (.pem, .crt files committed to repo)</li>
				<li>curl command: <code>curl -I https://yoursite.com</code> (check for HSTS header)</li>
				<li>Use <a href="https://observatory.mozilla.org/">Mozilla Observatory</a> scan for comprehensive TLS + header check</li>
			</ul>

			<div class="cta-box">
				<p><strong>Don't want to check manually?</strong></p>
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
			<h2>How to fix insecure TLS configuration</h2>

			<!-- AI Fix Prompt -->
			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>Copy this into Cursor, Claude Code, or Bolt. Same AI that created the problem can fix it—if you give it the right instructions. This prompt works for vibe coders deploying to Vercel, Railway, or custom VPS:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Fix all insecure TLS configurations in my Node.js/Next.js app.

## Critical fixes (check these first)

1. **Remove NODE_TLS_REJECT_UNAUTHORIZED**
   - Search for: NODE_TLS_REJECT_UNAUTHORIZED
   - Check: .env, .env.local, .env.production files
   - Action: DELETE these lines entirely
   - NEVER set to '0' in any environment

2. **Enforce TLS 1.2 minimum**
   - For Node.js HTTPS servers: add minVersion: 'TLSv1.2'
   - For Node.js HTTPS clients: add minVersion: 'TLSv1.2' to https.Agent options
   - Prefer TLS 1.3 where possible (maxVersion: 'TLSv1.3')

3. **Use strong cipher suites only**
   - Include: TLS_AES_128_GCM_SHA256, TLS_AES_256_GCM_SHA384, TLS_CHACHA20_POLY1305_SHA256
   - Include: ECDHE-RSA-AES128-GCM-SHA256, ECDHE-RSA-AES256-GCM-SHA384
   - Exclude: RC4, 3DES, DES, NULL, MD5-based, export-grade ciphers

4. **Add HSTS header**
   - Express/Node.js: Use helmet.hsts({ maxAge: 31536000, includeSubDomains: true, preload: true })
   - Next.js: Add to next.config.js headers() function
   - Value: max-age=31536000; includeSubDomains; preload

## Code examples to implement

### Node.js HTTPS server (secure config):
\`\`\`javascript
import https from 'https';
import fs from 'fs';

const options = {
  key: fs.readFileSync('private-key.pem'),
  cert: fs.readFileSync('certificate.pem'),

  // Enforce TLS 1.2 minimum (1.3 preferred)
  minVersion: 'TLSv1.2',
  maxVersion: 'TLSv1.3',

  // Use only strong cipher suites
  ciphers: [
    'TLS_AES_128_GCM_SHA256',
    'TLS_AES_256_GCM_SHA384',
    'TLS_CHACHA20_POLY1305_SHA256',
    'ECDHE-RSA-AES128-GCM-SHA256',
    'ECDHE-RSA-AES256-GCM-SHA384'
  ].join(':'),

  // Prefer server cipher order
  honorCipherOrder: true
};

https.createServer(options, app).listen(443);
\`\`\`

### Express HSTS (using Helmet):
\`\`\`javascript
import helmet from 'helmet';

app.use(helmet.hsts({
  maxAge: 31536000,        // 1 year
  includeSubDomains: true,
  preload: true
}));
\`\`\`

### Next.js HSTS (next.config.js):
\`\`\`javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          }
        ]
      }
    ];
  }
};
\`\`\`

## Platform-specific notes

- **Vercel/Netlify/Railway:** Automatic HTTPS + TLS 1.2+, no server config needed
- **Custom VPS:** Configure Nginx/Apache TLS settings (see docs)
- **Docker:** Ensure base images use OpenSSL 1.1.1+ for TLS 1.3 support

## After fixing

1. Test with SSL Labs Server Test: https://www.ssslabs.com/ssltest/
2. Target grade: A or A+
3. Verify: TLS 1.2+ only, strong ciphers, valid certificate, HSTS enabled
4. List all files you modified with before/after snippets

Please proceed systematically through my codebase.`}</div>
				</div>
			</div>

			<!-- Manual Fixes -->
			<div class="fix-section">
				<h3>Fix #1: Remove NODE_TLS_REJECT_UNAUTHORIZED</h3>

				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-block-header">
							<span class="code-block-lang status-bad">NEVER DO THIS</span>
						</div>
						<pre><code>{`// ❌ Disables ALL certificate validation globally
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Every HTTPS request in your entire app is now vulnerable
fetch('https://api.stripe.com/...')  // Vulnerable
axios.get('https://api.github.com/...')  // Vulnerable
db.connect('postgresql://...')  // Vulnerable`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-block-header">
							<span class="code-block-lang status-good">PROPER SOLUTION</span>
						</div>
						<pre><code>{`// ✅ For custom CA in development only
import https from 'https';
import fs from 'fs';

const agent = new https.Agent({
  ca: fs.readFileSync('./custom-ca.crt')
});

// Apply to specific request only
fetch('https://internal-api.company.local', { agent });

// ✅ For production: Use certificates from trusted CAs
// Let's Encrypt, DigiCert, etc.`}</code></pre>
					</div>
				</div>
			</div>

			<div class="fix-section">
				<h3>Fix #2: Enforce TLS 1.2+ with secure ciphers</h3>

				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">Node.js HTTPS Server</span>
					</div>
					<pre><code>{`import https from 'https';
import fs from 'fs';

const options = {
  key: fs.readFileSync('private-key.pem'),
  cert: fs.readFileSync('certificate.pem'),

  // ✅ Enforce TLS 1.2 minimum (1.3 preferred)
  minVersion: 'TLSv1.2',
  maxVersion: 'TLSv1.3',

  // ✅ Use only strong cipher suites
  ciphers: [
    'TLS_AES_128_GCM_SHA256',
    'TLS_AES_256_GCM_SHA384',
    'TLS_CHACHA20_POLY1305_SHA256',
    'ECDHE-RSA-AES128-GCM-SHA256',
    'ECDHE-RSA-AES256-GCM-SHA384'
  ].join(':'),

  // ✅ Prefer server cipher order
  honorCipherOrder: true
};

https.createServer(options, app).listen(443);`}</code></pre>
				</div>
			</div>

			<div class="fix-section">
				<h3>Fix #3: Add HSTS header</h3>

				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">Express / Node.js (using Helmet)</span>
					</div>
					<pre><code>{`import helmet from 'helmet';

app.use(helmet.hsts({
  maxAge: 31536000,        // 1 year
  includeSubDomains: true,
  preload: true
}));

// Or manually:
app.use((req, res, next) => {
  res.setHeader(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  );
  next();
});`}</code></pre>
				</div>

				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">Next.js (next.config.js)</span>
					</div>
					<pre><code>{`module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          }
        ]
      }
    ];
  }
};`}</code></pre>
				</div>
			</div>

			<div class="fix-section">
				<h3>Fix #4: Use trusted certificates (Let's Encrypt)</h3>

				<p><strong>For Vercel/Netlify:</strong> Automatic SSL certificates (no configuration needed)</p>

				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">For VPS/Docker (Certbot)</span>
					</div>
					<pre><code>{`# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate (interactive)
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal (already configured by Certbot)
sudo certbot renew --dry-run`}</code></pre>
				</div>

				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">Node.js with Let's Encrypt</span>
					</div>
					<pre><code>{`const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/fullchain.pem'),
  minVersion: 'TLSv1.2'
};`}</code></pre>
				</div>
			</div>
		</section>

		<!-- Testing -->
		<section class="article-section">
			<h2>Testing your TLS configuration</h2>
			<p>
				After fixing TLS config, verify it actually works. These are the tools incident responders use:
			</p>

			<ul class="testing-list">
				<li><strong><a href="https://www.ssllabs.com/ssltest/">SSL Labs Server Test</a>:</strong> Paste your domain, get A+ grade. Industry standard test. If you don't get A or A+, fix what it flags.</li>
				<li><strong><a href="https://observatory.mozilla.org/">Mozilla Observatory</a>:</strong> Comprehensive security scan including TLS, headers, and more.</li>
				<li><strong>curl command:</strong> <code>curl -I https://yoursite.com | grep -i strict</code> (check HSTS header present)</li>
				<li><strong>OpenSSL test:</strong> <code>openssl s_client -connect yoursite.com:443 -tls1</code> (should fail if TLS 1.0 disabled)</li>
				<li><strong>Browser DevTools:</strong> Security tab shows TLS version and cipher suite in use</li>
			</ul>

			<p>
				<strong>Expected result:</strong> TLS 1.2+ only, strong ciphers (AES-GCM or ChaCha20), valid certificate from trusted CA, HSTS enabled with max-age 31536000.
			</p>
		</section>

		<!-- Common Mistakes -->
		<section class="article-section">
			<h2>Common mistakes vibe coders make</h2>

			<ol class="mistakes-list">
				<li><strong>Using rejectUnauthorized: false globally</strong> - Only use for specific dev connections, never production. I've seen this in vibe coded apps processing payment data. The "quick fix" becomes the production config.</li>
				<li><strong>Short HSTS max-age</strong> - Use 1 year minimum (31536000 seconds). Short values don't provide real protection.</li>
				<li><strong>Allowing TLS 1.1 "for compatibility"</strong> - Deprecated since 2021, no modern clients need it. Old Android phones that can't do TLS 1.2 can't run modern apps anyway.</li>
				<li><strong>Not testing after TLS hardening</strong> - Verify no functionality broken. Check SSL Labs. Check real browsers.</li>
				<li><strong>Self-signed certs with "ignore warnings"</strong> - Trains users to bypass security. Then a real attacker shows up with a self-signed cert and users click through.</li>
				<li><strong>Hardcoding certificates in code</strong> - Use environment variables or secret management. Committed certs in git repos are a breach waiting to happen.</li>
				<li><strong>Forgetting to renew certificates</strong> - Use auto-renewal (Certbot, cloud platforms). Certificate expiry incidents are embarrassing and preventable.</li>
			</ol>
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
				<a href="/kb/security/vulnerabilities/missing-security-headers/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Missing Security Headers</div>
					<p class="related-card-description">HSTS, CSP, and other critical HTTP headers</p>
				</a>
				<a href="/kb/security/vulnerabilities/sensitive-data-exposure/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Sensitive Data Exposure</div>
					<p class="related-card-description">What happens when encryption fails</p>
				</a>
				<a href="/kb/security/stacks/nextjs-supabase/" class="card card-interactive related-card">
					<div class="related-card-category">Stack Guide</div>
					<div class="related-card-title">Next.js + Supabase Security</div>
					<p class="related-card-description">Complete security checklist for this stack</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Find these before an attacker does</h2>
			<p>Too many incidents start with "we thought our TLS was configured correctly."</p>
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
	/* Data Source Attribution */
	.data-source {
		font-size: 0.75rem;
		color: var(--text-tertiary);
		margin: 0.5rem 0 1.5rem;
	}

	.data-source a {
		color: var(--text-secondary);
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

	.tool-patterns-box > p {
		margin: 0 0 1rem;
		color: var(--text-secondary);
	}

	.pattern-note {
		margin: 1rem 0 0 !important;
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.pattern-note code {
		background: var(--bg-tertiary);
		padding: 0.125rem 0.375rem;
		font-size: 0.8125rem;
	}

	/* Pattern Cards */
	.pattern-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-left: 3px solid var(--orange);
		padding: 1.25rem;
		margin-bottom: 1rem;
	}

	.pattern-card h3 {
		margin: 0 0 0.75rem;
		font-size: 1rem;
		color: var(--text-primary);
	}

	.pattern-card p {
		margin: 0.5rem 0;
		color: var(--text-secondary);
		font-size: 0.9rem;
	}

	.pattern-card strong {
		color: var(--text-primary);
	}

	/* Unified List Style - detection, testing, and mistakes */
	.detection-list,
	.testing-list {
		list-style: none;
		padding: 0;
		margin: 1rem 0;
	}

	.detection-list li,
	.testing-list li {
		padding: 0.75rem 0;
		border-bottom: 1px solid var(--border);
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.detection-list li:last-child,
	.testing-list li:last-child {
		border-bottom: none;
	}

	.detection-list code,
	.testing-list code {
		background: var(--bg-tertiary);
		padding: 0.125rem 0.375rem;
		font-size: 0.8125rem;
	}

	.testing-list strong {
		color: var(--text-primary);
	}

	/* Mistakes List */
	.mistakes-list {
		padding-left: 1.5rem;
		margin: 1rem 0;
	}

	.mistakes-list li {
		padding: 0.5rem 0;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.mistakes-list strong {
		color: var(--text-primary);
	}

	.mistakes-list code {
		background: var(--bg-tertiary);
		padding: 0.125rem 0.375rem;
		font-size: 0.8125rem;
	}

	/* Code Comparison - Stacked Layout */
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

	/* Responsive */
	@media (max-width: 768px) {
		.pattern-card {
			padding: 1rem;
		}
	}
</style>
