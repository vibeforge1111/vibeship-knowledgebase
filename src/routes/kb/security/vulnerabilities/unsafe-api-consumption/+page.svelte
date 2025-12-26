<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Unsafe API Consumption: Third-Party Integration Risks in AI-Generated Code',
		description: 'Unsafe API consumption exposes your app through third-party integrations. Ranked #10 OWASP API Top 10. Fix prompts for Cursor, Bolt & Claude Code.',
		url: '/kb/security/vulnerabilities/unsafe-api-consumption/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Unsafe API Consumption' }
	];

	// External data sources
	const owaspData = {
		ranking: '#10',
		category: 'API10:2023',
		source: 'https://owasp.org/API-Security/editions/2023/en/0xaa-unsafe-consumption-of-apis/',
		cweId: 'CWE-918',
		cweSource: 'https://cwe.mitre.org/data/definitions/918.html'
	};

	// FAQ data for schema
	const faqs = [
		{
			question: 'What counts as unsafe API consumption?',
			answer: 'Any time your application trusts data from a third-party API without validation. This includes payment processors, AI services, weather APIs, authentication providers, or any external service. If you use the response without checking it, you are trusting that service completely. Their compromise becomes your compromise.'
		},
		{
			question: 'Why do AI coding tools generate unsafe API consumption patterns?',
			answer: 'AI tools optimize for working code, not paranoid code. They assume APIs return what they claim to return. Training data is full of examples that skip validation because "the API works." When vibe coding an integration, the AI gives you the happy path. Real production code needs the suspicious path.'
		},
		{
			question: 'Can HTTPS protect me from unsafe API consumption?',
			answer: 'HTTPS protects the connection, not the content. A compromised API serves malicious data over HTTPS. A supply chain attack delivers poisoned responses over HTTPS. Encryption verifies you are talking to the right server. It does not verify the server is telling you the truth. Validation is separate from transport security.'
		},
		{
			question: 'How do attackers exploit unsafe API consumption?',
			answer: 'They compromise the third-party API (easier than attacking you directly), inject malicious data into API responses, or exploit trust relationships to pivot into your system. If you blindly render HTML from an API, they get XSS. If you pass API data to SQL queries, they get injection. Your trust is their entry point.'
		},
		{
			question: 'Which third-party APIs are most risky to consume?',
			answer: 'Any API you do not control. Payment processors handle sensitive operations. AI services return unpredictable content. Analytics and tracking scripts execute in user browsers. CDN-hosted libraries can be poisoned. Even major providers have been compromised. The risk is not the provider size but your validation habits.'
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
			{"@type": "ListItem", "position": 4, "name": "Unsafe API Consumption"}
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
		"datePublished": "2025-12-26",
		"dateModified": "2025-12-26"
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
				<span class="badge">CWE-918</span>
				<span class="badge">API10:2023</span>
			</div>
			<h1>Unsafe API Consumption in Vibe Coded Apps</h1>
			<p class="text-secondary">When third-party integrations become your biggest security hole</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Unsafe API consumption happens when your app blindly trusts data from third-party APIs without validation.</strong>
				An attacker compromises one of your integrations, and suddenly they have a direct path into your system. Ranked <a href="https://owasp.org/API-Security/editions/2023/en/0xaa-unsafe-consumption-of-apis/">#10 on OWASP API Security Top 10</a>.
				AI coding tools generate trusting patterns by default, making vibe coded apps particularly vulnerable to supply chain attacks.
			</p>
		</div>

		<!-- Stats Box - Real OWASP Data -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">{owaspData.ranking}</div>
				<div class="stat-label">OWASP API Top 10</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">{owaspData.cweId}</div>
				<div class="stat-label"><a href={owaspData.cweSource}>CWE ID</a></div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Supply Chain</div>
				<div class="stat-label">Attack Vector</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">High</div>
				<div class="stat-label">Severity</div>
			</div>
		</div>
		<p class="data-source">
			Source: <a href={owaspData.source}>OWASP API Security Top 10 (2023)</a>
		</p>

		<!-- What Is It -->
		<section class="article-section">
			<h2>What is unsafe API consumption?</h2>
			<p>
				Unsafe API consumption is what happens when your application trusts third-party data without questioning it.
				Payment processor returns a price? You use it. AI service sends HTML? You render it. Weather API gives coordinates? You plot them on a map.
				Each trust relationship is an attack surface.
			</p>
			<p>
				Think of your third-party integrations as employees. You hire them to do a job, but you verify their work.
				Unsafe API consumption is like giving every contractor full admin access because "they seem trustworthy."
				When one gets compromised, so does everything they touch.
			</p>
			<p>
				According to <a href="https://owasp.org/API-Security/editions/2023/en/0xaa-unsafe-consumption-of-apis/">OWASP API Security Top 10 (2023)</a>, this is the #10 most critical API security risk.
				Supply chain attacks have increased dramatically. The SolarWinds breach, the Codecov incident, the event-stream npm attack all exploited this exact trust model.
				Attackers target your dependencies because it is easier than attacking you directly.
			</p>
		</section>

		<!-- AI Tool Patterns -->
		<section class="article-section">
			<h2>How do AI tools cause unsafe API consumption?</h2>
			<p>
				Every AI coding tool generates integrations that trust external data implicitly. They do not add validation because the code "works" without it.
				Working code that opens your system to supply chain attacks.
			</p>

			<div class="tool-patterns-box">
				<h3>The pattern behind supply chain compromises</h3>
				<p>Ask any AI tool to integrate a third-party API. This is what you get:</p>
				<div class="code-block">
					<pre><code>{`// Cursor, Bolt, Claude Code - all of them generate this
const getPricing = async (productId) => {
  const response = await fetch(\`https://api.partner.com/price/\${productId}\`)
  const data = await response.json()

  // Directly using API response without validation
  return {
    price: data.price,
    currency: data.currency,
    discount: data.discount
  }
}

// Later in checkout...
const total = pricing.price * quantity - pricing.discount`}</code></pre>
				</div>
				<p class="pattern-note">
					Looks clean. Works perfectly. Until the partner API gets compromised and returns <code>{`{"price": 0, "discount": 99999}`}</code>.
					No validation means malicious responses flow straight into your business logic.
				</p>
			</div>

			<p>
				<strong>Why AI does this:</strong> Training data is full of examples where APIs "just work."
				Documentation shows happy paths. Tutorials skip error handling. AI gives you what works in demos, not what survives production.
				It does not think about what happens when the API lies.
			</p>

			<p>
				Cursor, Claude Code, Bolt, v0, GitHub Copilot. They all generate trusting integrations.
				Not because they are broken but because vibe coding optimizes for shipping, not suspicion.
				The paranoia has to come from you.
			</p>
		</section>

		<!-- What Could Happen -->
		<section class="article-section">
			<h2>What could happen if I have unsafe API consumption?</h2>
			<p>
				Supply chain attacks are not theoretical. Major companies have been compromised through their integrations.
			</p>
			<ul class="consequences-list">
				<li><strong>Price manipulation:</strong> Compromised pricing API returns 0 for all products. Checkout completes at attacker-controlled prices. By the time finance notices, hundreds of orders have shipped for free.</li>
				<li><strong>XSS through trusted content:</strong> Your AI service integration renders markdown as HTML. Attacker compromises the API, injects script tags. Now every user viewing AI-generated content runs attacker code in their browser.</li>
				<li><strong>Data exfiltration:</strong> Analytics integration gets compromised. The "tracking pixel" now sends user data to attacker servers. You added the integration yourself. Your security tools trust it.</li>
				<li><strong>Credential theft via redirects:</strong> OAuth provider gets compromised or DNS hijacked. Users authenticate through what they think is your login flow. Credentials go to attackers. Sessions remain valid. Access looks legitimate.</li>
				<li><strong>Server-side request forgery:</strong> URL from API response gets fetched by your server. Attacker controls the URL, points it at internal services. Your server requests internal endpoints on their behalf.</li>
			</ul>
			<p>
				The <a href="https://www.crowdstrike.com/blog/sunburst-technical-analysis/">SolarWinds attack</a> compromised 18,000 organizations through a single trusted software update.
				Same principle. Different scale. Your integrations are your attack surface.
			</p>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How do I detect unsafe API consumption?</h2>
			<p>
				In post-incident analysis, investigators look for places where external data enters your system without checkpoints.
				Every <code>fetch()</code> or <code>axios</code> call to a third-party that flows into business logic without validation is a finding.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Patterns to search for</span>
				</div>
				<pre><code>{`// Direct use of API response in business logic (DANGEROUS)
const data = await response.json()
order.total = data.price * quantity

// Rendering HTML/markdown from external APIs (DANGEROUS)
const content = await aiService.generate(prompt)
element.innerHTML = content

// Using URLs from API responses (DANGEROUS)
const imageUrl = apiResponse.avatar
await downloadImage(imageUrl)

// Trusting authentication claims from third parties (DANGEROUS)
const claims = await oauth.getTokenClaims(token)
user.role = claims.role

// Regex patterns to find these:
// \\.json\\(\\)\\s*[\\s\\S]*?\\.[a-zA-Z]+\\s*[=\\+\\-\\*\\/]
// \\.innerHTML\\s*=\\s*[^;]*(?:api|response|fetch)
// (?:src|href|url)\\s*=\\s*[^;]*(?:api|response|data)\\[`}</code></pre>
			</div>

			<div class="cta-box">
				<p><strong>Audit your third-party integrations</strong></p>
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
			<h2>How do I fix unsafe API consumption?</h2>
			<p>
				The fix is defensive distrust. Validate every field from every external source. Treat third-party APIs like user input because attackers can control both.
				Codebases with dozens of trusting integrations can be hardened systematically. Here is how.
			</p>

			<!-- AI Fix Prompt -->
			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>This prompt systematically hardens third-party integrations. Copy it into Cursor, Claude Code, or Bolt:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Fix all unsafe API consumption vulnerabilities in my codebase.

## What to look for

Search for these dangerous patterns:

1. Direct use of third-party API responses:
   - const data = await response.json(); return data.field;
   - Using API data in calculations without validation
   - Passing API data to SQL/NoSQL queries

2. Rendering external content as HTML:
   - element.innerHTML = apiResponse.content
   - dangerouslySetInnerHTML with API data
   - Markdown-to-HTML conversion of external content

3. Using URLs from API responses:
   - Fetching images/files from API-provided URLs
   - Redirecting users to API-provided URLs
   - Loading scripts from external sources

4. Trusting authentication/authorization claims:
   - Using role/permission data from third parties without verification
   - Trusting JWT claims from external issuers

## How to fix

Add validation layers between external data and your business logic:

### For pricing/financial data:
\`\`\`javascript
// Before (vulnerable)
const pricing = await partnerApi.getPrice(productId)
order.total = pricing.price * quantity

// After (secure)
const pricing = await partnerApi.getPrice(productId)

// Validate types and ranges
if (typeof pricing.price !== 'number' || pricing.price < 0 || pricing.price > MAX_PRICE) {
  throw new Error('Invalid price from partner API')
}
if (!VALID_CURRENCIES.includes(pricing.currency)) {
  throw new Error('Invalid currency from partner API')
}

order.total = pricing.price * quantity
\`\`\`

### For rendered content:
\`\`\`javascript
// Before (vulnerable)
const html = await aiService.generate(prompt)
container.innerHTML = html

// After (secure)
import DOMPurify from 'dompurify'

const html = await aiService.generate(prompt)
container.innerHTML = DOMPurify.sanitize(html, {
  ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li'],
  ALLOWED_ATTR: []
})
\`\`\`

### For URLs from APIs:
\`\`\`javascript
// Before (vulnerable)
const avatarUrl = userProfile.avatar
await downloadAndSave(avatarUrl)

// After (secure)
const avatarUrl = new URL(userProfile.avatar)
const allowedHosts = ['cdn.example.com', 'images.example.com']

if (!allowedHosts.includes(avatarUrl.hostname)) {
  throw new Error('Avatar URL from untrusted host')
}
if (!['https:'].includes(avatarUrl.protocol)) {
  throw new Error('Avatar URL must use HTTPS')
}

await downloadAndSave(avatarUrl.toString())
\`\`\`

### For schema validation (recommended):
\`\`\`javascript
import { z } from 'zod'

const PricingResponseSchema = z.object({
  price: z.number().min(0).max(1000000),
  currency: z.enum(['USD', 'EUR', 'GBP']),
  discount: z.number().min(0).max(100).optional()
})

const rawResponse = await partnerApi.getPrice(productId)
const pricing = PricingResponseSchema.parse(rawResponse)
\`\`\`

## After fixing

1. Add monitoring for validation failures (indicates compromise attempts)
2. Implement circuit breakers for external API failures
3. Document expected response schemas for all integrations
4. List all files you modified with before/after snippets

Please proceed systematically through my codebase.`}</div>
				</div>
			</div>

			<!-- Manual Fix -->
			<div class="fix-section">
				<h3>Manual Fix</h3>
				<p>The core principle: treat every third-party response as potentially malicious. Validate before use.</p>

				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-block-header">
							<span class="code-block-lang status-bad">VULNERABLE</span>
						</div>
						<pre><code>{`// Trusting AI service response
const generateContent = async (prompt) => {
  const response = await fetch('https://api.ai-service.com/generate', {
    method: 'POST',
    body: JSON.stringify({ prompt })
  })
  const data = await response.json()

  // Directly rendering without sanitization
  return data.html
}

// In component
<div innerHTML={await generateContent(userPrompt)} />`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-block-header">
							<span class="code-block-lang status-good">SECURE</span>
						</div>
						<pre><code>{`import DOMPurify from 'dompurify'
import { z } from 'zod'

const AIResponseSchema = z.object({
  html: z.string().max(50000),
  model: z.string(),
  usage: z.object({
    tokens: z.number()
  })
})

const generateContent = async (prompt) => {
  const response = await fetch('https://api.ai-service.com/generate', {
    method: 'POST',
    body: JSON.stringify({ prompt })
  })

  // Validate response structure
  const data = AIResponseSchema.parse(await response.json())

  // Sanitize HTML content
  return DOMPurify.sanitize(data.html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'code', 'pre'],
    ALLOWED_ATTR: ['class']
  })
}`}</code></pre>
					</div>
				</div>

				<p>
					<strong>What changed:</strong> Schema validation with Zod ensures the response structure matches expectations.
					DOMPurify strips any malicious HTML. The combination blocks both malformed responses and XSS payloads.
					A compromised AI service can no longer inject scripts into your users' browsers.
				</p>
			</div>

			<!-- Framework-Specific -->
			<div class="fix-section">
				<h3>Common integration patterns to harden</h3>
				<div class="framework-links">
					<a href="/kb/security/vulnerabilities/ssrf/" class="card card-interactive">
						<span class="framework-name">SSRF Prevention</span>
						<span class="framework-desc">Validating URLs from APIs</span>
					</a>
					<a href="/kb/security/vulnerabilities/xss/" class="card card-interactive">
						<span class="framework-name">XSS Prevention</span>
						<span class="framework-desc">Sanitizing HTML content</span>
					</a>
					<a href="/kb/security/vulnerabilities/price-manipulation/" class="card card-interactive">
						<span class="framework-name">Price Manipulation</span>
						<span class="framework-desc">Validating financial data</span>
					</a>
					<a href="/kb/security/stacks/nextjs-supabase/" class="card card-interactive">
						<span class="framework-name">Next.js + Supabase</span>
						<span class="framework-desc">Full stack security</span>
					</a>
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
				<a href="/kb/security/vulnerabilities/ssrf/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Server-Side Request Forgery (SSRF)</div>
					<p class="related-card-description">When your server fetches attacker-controlled URLs</p>
				</a>
				<a href="/kb/security/vulnerabilities/vulnerable-dependencies/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Vulnerable Dependencies</div>
					<p class="related-card-description">Supply chain risks in your npm packages</p>
				</a>
				<a href="/kb/security/vulnerabilities/xss/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Cross-Site Scripting (XSS)</div>
					<p class="related-card-description">Preventing script injection from external content</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Your integrations are your attack surface</h2>
			<p>Supply chain attacks target the trust relationships you have already established.</p>
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

	/* Fix Sections */
	.fix-section {
		margin: 2rem 0;
	}

	.fix-section h3 {
		margin-bottom: 0.75rem;
	}

	/* Code Comparison */
	.code-comparison {
		display: grid;
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

	/* Framework Links */
	.framework-links {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}

	.framework-links a {
		text-decoration: none;
	}

	.framework-name {
		display: block;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 0.25rem;
	}

	.framework-desc {
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.framework-links {
			grid-template-columns: 1fr;
		}
	}
</style>
