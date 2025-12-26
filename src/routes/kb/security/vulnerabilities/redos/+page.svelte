<script lang="ts">
	import { Header } from '$lib/components/layout';

	const meta = {
		title: 'ReDoS: Detect & Fix Regex Attacks',
		description: 'ReDoS attacks freeze servers with malicious regex input. Learn to detect evil patterns in AI-generated code and replace them with safe alternatives.',
		url: '/kb/security/vulnerabilities/redos/'
	};

	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'ReDoS' }
	];

	const securityData = {
		cweId: 'CWE-1333',
		cweName: 'Inefficient Regular Expression Complexity',
		cweSource: 'https://cwe.mitre.org/data/definitions/1333.html',
		owaspCategory: 'A04:2021 - Insecure Design',
		owaspSource: 'https://owasp.org/Top10/A04_2021-Insecure_Design/',
		severity: 'Medium-High',
		cvssScore: '5.3-7.5'
	};

	const faqs = [
		{
			question: 'What is ReDoS?',
			answer: 'ReDoS (Regular Expression Denial of Service) is an attack that exploits poorly written regex patterns. When a regex has certain structures, it can take exponentially longer to process as input length increases. An attacker sends a crafted string that makes the regex engine try billions of combinations, freezing your server. One 30-character string can consume 100% CPU for minutes.'
		},
		{
			question: 'How do I prevent ReDoS attacks?',
			answer: 'Limit input length before regex processing—most ReDoS needs long strings. Avoid nested quantifiers like (a+)+ or ([a-z]+)*. Use regex timeout libraries (re2, safe-regex). Test patterns against known evil inputs. For common tasks like email validation, use well-tested libraries instead of custom regex. When possible, use linear-time regex engines.'
		},
		{
			question: 'How do I check if my regex is vulnerable?',
			answer: 'Use tools like safe-regex (npm), rxxr2, or regex-static-analysis to detect vulnerable patterns. Test manually with progressively longer inputs that hit backtracking paths—if time grows exponentially, it\'s vulnerable. The pattern "aaaaaaaaaaaaaaaaaaaaaaaaaaaa!" is a classic test for (a+)+ patterns. Online tools like regex101 show step counts.'
		},
		{
			question: 'What makes a regex evil?',
			answer: 'Evil patterns have nested quantifiers ((a+)+), overlapping alternatives ((a|a|aa)+), or repeated groups with multiple paths (([a-z]+[0-9]+)+). The key is ambiguity—when the regex engine can match the same input multiple ways, it tries all combinations. More ambiguity = more backtracking = slower matching on failure.'
		},
		{
			question: 'Can ReDoS crash a server?',
			answer: 'Yes. ReDoS consumes CPU, not memory, so it freezes the event loop in Node.js or blocks threads in other languages. A single malicious request can make your server unresponsive to all users. Cloudflare\'s 2019 outage was caused by exactly this—one regex took down their global CDN for 30 minutes.'
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
			{"@type": "ListItem", "position": 4, "name": "ReDoS"}
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
				<span class="badge badge-medium">Medium-High</span>
				<span class="badge">{securityData.cweId}</span>
				<span class="badge">OWASP A04:2021</span>
			</div>
			<h1>ReDoS in Vibe Coded Apps</h1>
			<p class="text-secondary">When one regex freezes your entire server</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>ReDoS (Regular Expression Denial of Service) happens when a regex pattern takes exponentially longer on certain inputs.</strong>
				An attacker sends a crafted string. Your regex engine gets stuck trying trillions of combinations. Your server freezes.
				AI tools copy regex patterns without checking for these "evil" structures. The fix: limit input length, use safe patterns, or switch to linear-time regex engines.
			</p>
		</div>

		<!-- Stats Box -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">30 min</div>
				<div class="stat-label">Cloudflare outage (2019)</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">2^n</div>
				<div class="stat-label">Time complexity (evil regex)</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">1 req</div>
				<div class="stat-label">To freeze a server</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">{securityData.cvssScore}</div>
				<div class="stat-label">CVSS Score Range</div>
			</div>
		</div>
		<p class="data-source">
			Source: <a href="https://blog.cloudflare.com/details-of-the-cloudflare-outage-on-july-2-2019/">Cloudflare Incident Report 2019</a>, <a href={securityData.owaspSource}>OWASP</a>
		</p>

		<!-- What Is It - @eli5sec voice (translator, simplifier) -->
		<section class="article-section">
			<h2>What is ReDoS? (explained simply)</h2>
			<p>
				Imagine giving someone a maze to solve. Most mazes have a few paths—even if you hit dead ends, you eventually find the exit. Now imagine a maze where every step splits into 10 more paths, and each of those splits into 10 more. You'd never finish.
			</p>
			<p>
				That's ReDoS. Regular expressions work by trying paths through your pattern. When a regex has certain structures, the number of paths explodes. On normal input, it's fine. On crafted input, it tries billions of paths. Your server gets stuck.
			</p>
			<p>
				The technical term is "catastrophic backtracking." When the regex engine can't match, it backs up and tries a different path. Evil patterns have so many paths that the engine backtracks forever. A 30-character malicious string can keep your CPU busy for minutes.
			</p>
		</section>

		<!-- Real Impact -->
		<section class="article-section">
			<h2>This took down Cloudflare</h2>
			<p>
				July 2, 2019. Cloudflare pushed a regex update. One pattern had a catastrophic backtracking bug. It didn't just slow down one server—it took down their entire global CDN for 30 minutes. Millions of websites went dark.
			</p>

			<div class="incident-highlight">
				<div class="incident-quote">
					"A regular expression that backtracked enormously and used too much CPU..."
				</div>
				<div class="incident-source">— Cloudflare Incident Report</div>
			</div>

			<p>
				Other notable ReDoS issues:
			</p>
			<ul class="incident-list-simple">
				<li><strong>Stack Overflow (2016)</strong> — Site taken offline by user-submitted regex</li>
				<li><strong>npm validator.js</strong> — Email regex caused DoS, patched in 2018</li>
				<li><strong>ua-parser-js (2021)</strong> — Supply chain attack included ReDoS patterns</li>
			</ul>
		</section>

		<!-- Why Vibe Coded Apps -->
		<section class="article-section">
			<h2>Why AI-generated regex is dangerous</h2>
			<p>
				AI tools learn from code on the internet. A lot of that code contains vulnerable regex patterns. When you ask an AI for "email validation regex," it might give you a pattern that works—but freezes on malicious input.
			</p>

			<div class="code-comparison">
				<div class="code-block code-bad">
					<div class="code-block-header">
						<span class="code-block-lang">Vulnerable - AI-generated email regex</span>
						<span class="code-label-bad">Evil pattern</span>
					</div>
					<pre><code>{`// AI might generate this "comprehensive" email validator
const emailRegex = /^([a-zA-Z0-9_\\-\\.]+)+@([a-zA-Z0-9_\\-\\.]+)+\\.([a-zA-Z]{2,5})$/;

// Test with malicious input:
const evil = 'a'.repeat(30) + '@';
emailRegex.test(evil); // Hangs for seconds/minutes!

// The problem: ([a-zA-Z0-9_\\-\\.]+)+ is nested quantifiers
// Each character can be grouped infinitely many ways`}</code></pre>
				</div>
				<div class="code-block code-good">
					<div class="code-block-header">
						<span class="code-block-lang">Safe - Simple pattern + length limit</span>
						<span class="code-label-good">Fixed</span>
					</div>
					<pre><code>{`// Option 1: Use a simple, linear-time pattern
const safeEmailRegex = /^[^@]+@[^@]+\\.[^@]+$/;

// Option 2: Use a well-tested library
import { isEmail } from 'validator';
if (isEmail(input)) { /* valid */ }

// Option 3: Limit input length BEFORE regex
if (input.length > 254) {
  return false; // Emails can't exceed 254 chars per RFC
}
safeEmailRegex.test(input);`}</code></pre>
				</div>
			</div>

			<p>
				The pattern <code>([a-z]+)+</code> looks innocent. But when input doesn't match, the regex engine tries every possible way to group the characters. For "aaaaaaaaaa!", that's 2^10 combinations. For 30 a's, it's over a billion.
			</p>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How to detect ReDoS vulnerabilities</h2>
			<p>
				Look for these red flag patterns in your regex:
			</p>

			<div class="pattern-box">
				<h3>Evil Pattern Signatures</h3>
				<div class="pattern-list">
					<div class="pattern-item">
						<code>(a+)+</code>
						<span>Nested quantifiers</span>
					</div>
					<div class="pattern-item">
						<code>(a|a)+</code>
						<span>Overlapping alternatives</span>
					</div>
					<div class="pattern-item">
						<code>([a-z]+[0-9]+)+</code>
						<span>Repeated compound groups</span>
					</div>
					<div class="pattern-item">
						<code>(.*a){10}</code>
						<span>Wildcard with repetition</span>
					</div>
				</div>
			</div>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Bash / Node</span>
				</div>
				<pre><code>{`# Install safe-regex for automated detection
npm install safe-regex

# Test patterns in your code
node -e "
const safeRegex = require('safe-regex');
const patterns = [
  /^([a-z]+)+$/,           // false (evil)
  /^[a-z]+$/,              // true (safe)
  /^(a|aa)+$/,             // false (evil)
  /^([^@]+)@([^@]+)$/      // true (safe)
];
patterns.forEach(p => console.log(safeRegex(p), p.source));
"

# Or use regex101.com - check the step count
# If matching failure takes 10000+ steps, it's suspicious`}</code></pre>
			</div>

			<div class="cta-box">
				<p><strong>Regex vulnerabilities hide in validation code.</strong></p>
				<a href="https://scanner.vibeship.co" class="btn btn-green">
					Scan your patterns
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M5 12h14M12 5l7 7-7 7"/>
					</svg>
				</a>
			</div>
		</section>

		<!-- How to Fix -->
		<section class="article-section">
			<h2>How to fix ReDoS</h2>
			<p>
				Four approaches: limit input, fix patterns, use safe engines, or avoid regex entirely.
			</p>

			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>Copy this into your AI coding tool to find and fix ReDoS patterns:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Audit my codebase for ReDoS (Regular Expression Denial of Service) vulnerabilities.

## What to search for

1. Regex patterns with these dangerous structures:
   - Nested quantifiers: \`(a+)+\`, \`(a*)*\`, \`(a+)*\`
   - Overlapping alternations: \`(a|a)+\`, \`(a|aa)+\`
   - Repeated groups with alternatives: \`([a-z]+|\\d+)+\`
   - Wildcards in repetition: \`(.*a)+\`, \`.+.+\`

2. Search patterns:
   \`\`\`
   new RegExp(
   /pattern/
   .match(
   .test(
   .replace(
   .split(
   \`\`\`

3. Common vulnerable contexts:
   - Email validation
   - URL parsing
   - Username/password rules
   - Search/filter inputs
   - Markdown/HTML parsing

## Detection steps

For each regex found:
1. Check for nested quantifiers or overlapping alternatives
2. Test with this payload: 'a'.repeat(30) + '!'
3. If it takes > 100ms on 30 chars, it's vulnerable
4. Use \`safe-regex\` package to automate checks

## Fixes to apply

### Option A: Simplify the pattern
\`\`\`javascript
// Instead of
const email = /^([a-zA-Z0-9_\\-\\.]+)+@([a-zA-Z0-9_\\-\\.]+)+\\.([a-zA-Z]{2,5})$/;
// Use
const email = /^[^@]+@[^@]+\\.[^@]+$/;
\`\`\`

### Option B: Limit input length first
\`\`\`javascript
function validateEmail(input) {
  // Emails can't exceed 254 chars (RFC 5321)
  if (input.length > 254) return false;

  // Now safe to use any regex
  return emailRegex.test(input);
}
\`\`\`

### Option C: Use atomic groups (if supported)
\`\`\`javascript
// Possessive quantifiers prevent backtracking
// Not supported in JavaScript, but in other languages:
// Java/PCRE: (?>a+)@  instead of  (a+)@
\`\`\`

### Option D: Use a linear-time regex engine
\`\`\`javascript
// RE2 doesn't backtrack - always linear time
const RE2 = require('re2');
const safeRegex = new RE2(/^([a-z]+)+$/);
\`\`\`

### Option E: Use libraries instead of regex
\`\`\`javascript
// For email validation
import { isEmail } from 'validator';

// For URL parsing
const url = new URL(input); // Built-in, no regex

// For UUID validation
import { validate as uuidValidate } from 'uuid';
\`\`\`

## Safe pattern replacements

| Use Case | Evil Pattern | Safe Alternative |
|----------|--------------|------------------|
| Email | \`([a-z]+)+@\` | \`[^@]+@[^@]+\\.[^@]+\` |
| Digits | \`(\\d+)+\` | \`\\d+\` |
| Alphanumeric | \`([a-z0-9]+)+\` | \`[a-z0-9]+\` |
| Whitespace split | \`(\\s+)+\` | \`\\s+\` |

## After fixing

1. Run \`safe-regex\` on all patterns in codebase
2. Add input length limits before regex operations
3. Set regex timeout in critical paths
4. Consider RE2 for user-controlled pattern matching`}</div>
				</div>
			</div>

			<div class="fix-section">
				<h3>Safe alternatives for common patterns</h3>
				<div class="pattern-replacements">
					<div class="replacement-item">
						<div class="replacement-label">Email validation</div>
						<code class="replacement-evil">/^([a-zA-Z]+)+@/</code>
						<span class="replacement-arrow">→</span>
						<code class="replacement-safe">/^[^@]+@[^@]+\.[^@]+$/</code>
					</div>
					<div class="replacement-item">
						<div class="replacement-label">URL validation</div>
						<code class="replacement-evil">/^(https?:\/\/(.+)+)/</code>
						<span class="replacement-arrow">→</span>
						<code class="replacement-safe">new URL(input) // built-in</code>
					</div>
					<div class="replacement-item">
						<div class="replacement-label">Repeated words</div>
						<code class="replacement-evil">/(\w+\s+)+/</code>
						<span class="replacement-arrow">→</span>
						<code class="replacement-safe">/[\w\s]+/ + length limit</code>
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
				<a href="/kb/security/vulnerabilities/unrestricted-resource-consumption/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Unrestricted Resource Consumption</div>
					<p class="related-card-description">When inputs exhaust server resources</p>
				</a>
				<a href="/kb/security/vulnerabilities/input-validation/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Input Validation</div>
					<p class="related-card-description">Validating input safely</p>
				</a>
				<a href="/kb/security/vulnerabilities/xss/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Cross-Site Scripting (XSS)</div>
					<p class="related-card-description">When regex fails to sanitize</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>One regex can take down your app</h2>
			<p>Find the evil patterns before attackers do.</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">
				Scan for ReDoS
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

	/* Incident Highlight */
	.incident-highlight {
		background: var(--bg-secondary);
		border-left: 3px solid var(--orange);
		padding: 1.25rem 1.5rem;
		margin: 1.5rem 0;
	}

	.incident-quote {
		font-style: italic;
		color: var(--text-primary);
		font-size: 1.0625rem;
		line-height: 1.6;
	}

	.incident-source {
		margin-top: 0.75rem;
		font-size: 0.8125rem;
		color: var(--text-tertiary);
	}

	.incident-list-simple {
		list-style: none;
		padding: 0;
		margin: 1rem 0;
	}

	.incident-list-simple li {
		padding: 0.5rem 0;
		border-bottom: 1px solid var(--border);
		font-size: 0.9375rem;
		color: var(--text-secondary);
	}

	.incident-list-simple li:last-child {
		border-bottom: none;
	}

	/* Pattern Box */
	.pattern-box {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.pattern-box h3 {
		margin: 0 0 1rem;
		font-size: 1rem;
	}

	.pattern-list {
		display: grid;
		gap: 0.75rem;
	}

	.pattern-item {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.pattern-item code {
		background: var(--bg-tertiary);
		padding: 0.25rem 0.75rem;
		font-size: 0.875rem;
		color: var(--red);
		min-width: 150px;
	}

	.pattern-item span {
		color: var(--text-secondary);
		font-size: 0.875rem;
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

	/* Pattern Replacements */
	.pattern-replacements {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-top: 1rem;
	}

	.replacement-item {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1rem 1.25rem;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.75rem;
	}

	.replacement-label {
		font-weight: 600;
		color: var(--text-primary);
		font-size: 0.875rem;
		min-width: 120px;
	}

	.replacement-evil {
		background: rgba(255, 107, 107, 0.1);
		color: var(--red);
		padding: 0.25rem 0.5rem;
		font-size: 0.8125rem;
	}

	.replacement-arrow {
		color: var(--text-tertiary);
	}

	.replacement-safe {
		background: rgba(0, 255, 136, 0.1);
		color: var(--green);
		padding: 0.25rem 0.5rem;
		font-size: 0.8125rem;
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

		.pattern-item {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.25rem;
		}

		.replacement-item {
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>
