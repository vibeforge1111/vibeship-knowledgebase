<script lang="ts">
	import { Header } from '$lib/components/layout';

	const meta = {
		title: 'HTTP Parameter Pollution (HPP): Fix Guide',
		description: 'HTTP parameter pollution bypasses WAFs and security controls by exploiting duplicate parameter handling. Learn to detect and fix HPP in your applications.',
		url: '/kb/security/vulnerabilities/http-parameter-pollution/'
	};

	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'HTTP Parameter Pollution' }
	];

	const securityData = {
		cweId: 'CWE-235',
		cweName: 'Improper Handling of Extra Parameters',
		cweSource: 'https://cwe.mitre.org/data/definitions/235.html',
		owaspCategory: 'A03:2021 - Injection',
		owaspSource: 'https://owasp.org/Top10/A03_2021-Injection/',
		testingGuide: 'WSTG-INPV-04',
		severity: 'Medium',
		cvssScore: '5.3-6.5'
	};

	const faqs = [
		{
			question: 'What is HTTP parameter pollution?',
			answer: 'HTTP Parameter Pollution (HPP) exploits the way applications handle duplicate URL parameters. When you send ?id=1&id=2, different technologies take different values: PHP uses the last (2), ASP.NET joins them (1,2), and Express creates an array. Attackers exploit these differences to bypass security controls, WAFs, or manipulate business logic.'
		},
		{
			question: 'How do I prevent HPP attacks?',
			answer: 'Normalize parameter handling in your application. Always take the first occurrence, or reject requests with duplicate parameters entirely. Validate parameters at the earliest point (before routing). Use strict input validation that checks for arrays where singles are expected. Ensure your WAF and application handle duplicates the same way.'
		},
		{
			question: 'Can HPP bypass WAF?',
			answer: 'Yes. If your WAF checks the first occurrence of a parameter but your app uses the last, attackers can sneak malicious payloads past the WAF. They send ?id=safe&id=malicious. The WAF sees "safe" and allows it. The PHP app sees "malicious" and processes it. This desync is the core HPP vulnerability.'
		},
		{
			question: 'How do different servers handle duplicate parameters?',
			answer: 'PHP: last value wins. ASP.NET: comma-concatenates all values. Express/Node: creates array. Python Flask: first value wins. Java Servlet: first value wins (getValue) or array (getValues). Ruby/Rails: last value wins. Apache/Tomcat: first value wins. This inconsistency is what makes HPP exploitable.'
		},
		{
			question: 'How do I test for HPP vulnerabilities?',
			answer: 'Send duplicate parameters and observe behavior: ?param=value1&param=value2. Check if validation is bypassed. Test if WAF can be evaded by splitting payloads across duplicates. Look for business logic issues when arrays are processed where single values are expected. Tools like Burp Suite can automate parameter fuzzing.'
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
			{"@type": "ListItem", "position": 4, "name": "HTTP Parameter Pollution"}
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
				<span class="badge badge-medium">Medium</span>
				<span class="badge">{securityData.cweId}</span>
				<span class="badge">OWASP A03:2021</span>
			</div>
			<h1>HTTP Parameter Pollution in Vibe Coded Apps</h1>
			<p class="text-secondary">When duplicate parameters break your security assumptions</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>HTTP Parameter Pollution (HPP) exploits how different technologies handle duplicate URL parameters.</strong>
				Send <code>?id=1&id=2</code>—PHP takes the last, Express makes an array, ASP.NET concatenates.
				Attackers use this to bypass WAFs, break validation, and manipulate business logic. The fix: normalize how your stack handles duplicates, and validate at the earliest point.
			</p>
		</div>

		<!-- Stats Box -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">WAF</div>
				<div class="stat-label">Bypass technique</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">~7</div>
				<div class="stat-label">Different server behaviors</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Desync</div>
				<div class="stat-label">Core vulnerability type</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">{securityData.cvssScore}</div>
				<div class="stat-label">CVSS Score Range</div>
			</div>
		</div>
		<p class="data-source">
			Source: <a href="https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Input_Validation_Testing/04-Testing_for_HTTP_Parameter_Pollution">OWASP WSTG</a>, <a href={securityData.owaspSource}>OWASP</a>
		</p>

		<!-- What Is It - @tryhard_tk voice (tinkerer, curious) -->
		<section class="article-section">
			<h2>What is HTTP parameter pollution?</h2>
			<p>
				Here's something interesting: different servers handle duplicate URL parameters differently. Send <code>?color=red&color=blue</code> and watch what happens.
			</p>

			<div class="server-behavior">
				<h3>How servers parse ?color=red&color=blue</h3>
				<div class="behavior-grid">
					<div class="behavior-item">
						<div class="behavior-tech">PHP</div>
						<div class="behavior-result">blue (last wins)</div>
					</div>
					<div class="behavior-item">
						<div class="behavior-tech">ASP.NET</div>
						<div class="behavior-result">"red,blue" (concatenated)</div>
					</div>
					<div class="behavior-item">
						<div class="behavior-tech">Express/Node</div>
						<div class="behavior-result">["red","blue"] (array)</div>
					</div>
					<div class="behavior-item">
						<div class="behavior-tech">Flask</div>
						<div class="behavior-result">red (first wins)</div>
					</div>
					<div class="behavior-item">
						<div class="behavior-tech">Rails</div>
						<div class="behavior-result">blue (last wins)</div>
					</div>
					<div class="behavior-item">
						<div class="behavior-tech">Java Servlet</div>
						<div class="behavior-result">red (first wins)</div>
					</div>
				</div>
			</div>

			<p>
				HPP exploits these inconsistencies. When your WAF checks one value but your app uses another, attackers slip through the gap.
			</p>
		</section>

		<!-- The Attack -->
		<section class="article-section">
			<h2>The WAF bypass that shouldn't work</h2>
			<p>
				Here's a real attack scenario. Your WAF blocks SQL injection. But what if the WAF and your app see different values?
			</p>

			<div class="attack-scenario">
				<div class="scenario-step">
					<div class="step-label">Attacker sends:</div>
					<code>?id=1&id=1' OR '1'='1</code>
				</div>
				<div class="scenario-step">
					<div class="step-label">WAF (checks first):</div>
					<span class="safe">Sees "1" → Allows request</span>
				</div>
				<div class="scenario-step">
					<div class="step-label">PHP app (uses last):</div>
					<span class="danger">Sees "1' OR '1'='1" → SQL injection</span>
				</div>
			</div>

			<p>
				The WAF did its job—it checked the parameter and found nothing malicious. But the app sees a completely different value. This desync is the heart of HPP.
			</p>
		</section>

		<!-- Why Vibe Coded Apps -->
		<section class="article-section">
			<h2>Why vibe coded apps are vulnerable</h2>
			<p>
				AI generates code that "works" with parameters. But it doesn't consider what happens when the same parameter appears twice. And it doesn't know how your WAF handles duplicates.
			</p>

			<div class="code-comparison">
				<div class="code-block code-bad">
					<div class="code-block-header">
						<span class="code-block-lang">Vulnerable - Express endpoint</span>
						<span class="code-label-bad">Array not handled</span>
					</div>
					<pre><code>{`// AI-generated endpoint
app.get('/user', (req, res) => {
  const id = req.query.id; // Could be string OR array!

  // If attacker sends ?id=1&id=DROP TABLE users
  // id becomes ["1", "DROP TABLE users"]

  // String concatenation with array = unexpected behavior
  const query = \`SELECT * FROM users WHERE id = '\${id}'\`;
  // Result: WHERE id = '1,DROP TABLE users'

  db.query(query); // Broken query, potential injection
});`}</code></pre>
				</div>
				<div class="code-block code-good">
					<div class="code-block-header">
						<span class="code-block-lang">Secure - Handle duplicates explicitly</span>
						<span class="code-label-good">Fixed</span>
					</div>
					<pre><code>{`// Secure endpoint with explicit handling
app.get('/user', (req, res) => {
  let id = req.query.id;

  // Normalize: always take first value
  if (Array.isArray(id)) {
    id = id[0]; // Or reject: return res.status(400).send('Invalid')
  }

  // Now id is always a string
  // Plus: use parameterized queries!
  const query = 'SELECT * FROM users WHERE id = ?';
  db.query(query, [id]);
});

// Even better: reject duplicates entirely
function rejectDuplicates(req, res, next) {
  const url = new URL(req.url, \`http://\${req.headers.host}\`);
  const seen = new Set();
  for (const key of url.searchParams.keys()) {
    if (seen.has(key)) {
      return res.status(400).send('Duplicate parameters not allowed');
    }
    seen.add(key);
  }
  next();
}`}</code></pre>
				</div>
			</div>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How to detect HPP vulnerabilities</h2>
			<p>
				Test how your application handles duplicate parameters.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Testing Commands</span>
				</div>
				<pre><code>{`# Test 1: Send duplicate parameters
curl "https://target.com/api?id=first&id=second"
# Check which value is reflected/used

# Test 2: Try to bypass validation
curl "https://target.com/search?q=safe&q=<script>alert(1)</script>"
# If WAF blocks second, but app uses first? Or vice versa?

# Test 3: Business logic manipulation
curl "https://target.com/transfer?amount=1&amount=1000000"
# Does it transfer 1 or 1000000?

# Test 4: Array injection in Express
curl "https://target.com/user?role=user&role=admin"
# If role becomes ["user","admin"], does auth check fail?

# Automated with ffuf
echo -e "id=1\nid=1&id=2\nid=1&id=1" > params.txt
ffuf -u "https://target.com/api?FUZZ" -w params.txt -mc all`}</code></pre>
			</div>

			<div class="check-list">
				<h3>Code audit checklist</h3>
				<ul>
					<li>Does the app check <code>Array.isArray()</code> on query params?</li>
					<li>Do WAF and app use the same parameter parsing?</li>
					<li>Are validation checks before or after parsing?</li>
					<li>What happens when arrays are passed to string functions?</li>
				</ul>
			</div>

			<div class="cta-box">
				<p><strong>Duplicate parameters cause unexpected behavior.</strong></p>
				<a href="https://scanner.vibeship.co" class="btn btn-green">
					Scan for HPP issues
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M5 12h14M12 5l7 7-7 7"/>
					</svg>
				</a>
			</div>
		</section>

		<!-- How to Fix -->
		<section class="article-section">
			<h2>How to fix HTTP parameter pollution</h2>
			<p>
				Normalize parameter handling across your entire stack.
			</p>

			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>Copy this into your AI coding tool to find and fix HPP vulnerabilities:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Audit my codebase for HTTP Parameter Pollution (HPP) vulnerabilities.

## What to search for

1. Query parameter access without array checks:
   \`\`\`
   req.query.
   req.params.
   request.args.get
   $_GET[
   $_POST[
   $_REQUEST[
   \`\`\`

2. Parameters used in security decisions:
   - Authentication/authorization checks
   - Access control decisions
   - Price/quantity calculations
   - Redirect targets
   - Email recipients

## Detection steps

For each parameter access:
1. Could this be an array if user sends duplicates?
2. Is there explicit array handling?
3. What happens if the value is ["safe", "malicious"]?
4. Do WAF and app see the same value?

## Fixes to apply

### Option A: Normalize to first value
\`\`\`typescript
function getParam(req: Request, name: string): string | undefined {
  const value = req.query[name];
  if (Array.isArray(value)) {
    return value[0]; // Always take first
  }
  return value;
}

// Usage
const id = getParam(req, 'id');
\`\`\`

### Option B: Reject duplicates
\`\`\`typescript
function rejectDuplicates(req: Request, res: Response, next: NextFunction) {
  const params = new URL(req.url, \`http://\${req.headers.host}\`).searchParams;
  const keys = [...params.keys()];
  const uniqueKeys = new Set(keys);

  if (keys.length !== uniqueKeys.size) {
    return res.status(400).json({ error: 'Duplicate parameters not allowed' });
  }
  next();
}

app.use(rejectDuplicates);
\`\`\`

### Option C: Validate type explicitly
\`\`\`typescript
import { z } from 'zod';

const querySchema = z.object({
  id: z.string(), // Will reject arrays
  limit: z.coerce.number().int().positive().max(100),
});

app.get('/users', (req, res) => {
  const result = querySchema.safeParse(req.query);
  if (!result.success) {
    return res.status(400).json({ error: 'Invalid parameters' });
  }
  const { id, limit } = result.data;
  // id is guaranteed to be a string
});
\`\`\`

### Option D: Configure express to parse first only
\`\`\`typescript
// Custom query parser that takes first value only
app.set('query parser', (str: string) => {
  const params = new URLSearchParams(str);
  const result: Record<string, string> = {};
  for (const [key, value] of params) {
    if (!(key in result)) {
      result[key] = value; // First value only
    }
  }
  return result;
});
\`\`\`

## Server behavior reference

| Technology | Behavior |
|------------|----------|
| PHP | Last value |
| ASP.NET | Comma-joined |
| Express | Array |
| Flask | First value |
| Rails | Last value |
| Java Servlet | First (single) / Array (multi) |

## After fixing

1. Add middleware to reject or normalize duplicates
2. Use schema validation (Zod, Joi) for all query params
3. Ensure WAF and app have same parsing behavior
4. Test with duplicate parameter attacks
5. Log duplicate parameter attempts for monitoring`}</div>
				</div>
			</div>

			<div class="fix-section">
				<h3>Framework-specific solutions</h3>
				<div class="framework-fixes">
					<div class="framework-fix">
						<h4>Express.js</h4>
						<p>Use custom query parser or middleware to normalize to first value. Express returns arrays by default for duplicates.</p>
					</div>
					<div class="framework-fix">
						<h4>Next.js</h4>
						<p>API routes receive arrays for duplicates. Use Zod or similar to validate and reject array types where strings are expected.</p>
					</div>
					<div class="framework-fix">
						<h4>PHP</h4>
						<p>PHP uses last value by default. If you use <code>$_REQUEST</code>, behavior may vary. Use explicit parameter handling.</p>
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
					<p class="related-card-description">Another desync vulnerability</p>
				</a>
				<a href="/kb/security/vulnerabilities/sql-injection/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">SQL Injection</div>
					<p class="related-card-description">What HPP often enables</p>
				</a>
				<a href="/kb/security/vulnerabilities/xss/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Cross-Site Scripting</div>
					<p class="related-card-description">Bypass via HPP</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Your WAF and app should agree</h2>
			<p>Find desync issues before attackers exploit them.</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">
				Scan for HPP
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

	/* Server Behavior */
	.server-behavior {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.server-behavior h3 {
		margin: 0 0 1rem;
		font-size: 1rem;
	}

	.behavior-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 0.75rem;
	}

	.behavior-item {
		background: var(--bg-tertiary);
		padding: 0.75rem 1rem;
	}

	.behavior-tech {
		font-weight: 600;
		color: var(--text-primary);
		font-size: 0.875rem;
		margin-bottom: 0.25rem;
	}

	.behavior-result {
		font-size: 0.8125rem;
		color: var(--green);
		font-family: 'JetBrains Mono', monospace;
	}

	/* Attack Scenario */
	.attack-scenario {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.scenario-step {
		padding: 0.75rem 0;
		border-bottom: 1px solid var(--border);
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		align-items: center;
	}

	.scenario-step:last-child {
		border-bottom: none;
	}

	.step-label {
		font-weight: 600;
		color: var(--text-primary);
		font-size: 0.875rem;
		min-width: 140px;
	}

	.scenario-step code {
		background: var(--bg-tertiary);
		padding: 0.25rem 0.625rem;
		font-size: 0.8125rem;
	}

	.scenario-step .safe {
		color: var(--green);
		font-size: 0.875rem;
	}

	.scenario-step .danger {
		color: var(--red);
		font-size: 0.875rem;
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

	.check-list code {
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

	/* Framework Fixes */
	.framework-fixes {
		display: grid;
		gap: 1rem;
		margin-top: 1rem;
	}

	.framework-fix {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1rem 1.25rem;
	}

	.framework-fix h4 {
		margin: 0 0 0.5rem;
		font-size: 0.9375rem;
		color: var(--text-primary);
	}

	.framework-fix p {
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

		.behavior-grid {
			grid-template-columns: 1fr 1fr;
		}

		.scenario-step {
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>
