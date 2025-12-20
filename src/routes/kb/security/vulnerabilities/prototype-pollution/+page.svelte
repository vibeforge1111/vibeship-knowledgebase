<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Prototype Pollution: Find & Fix in AI-Generated JavaScript',
		description: 'Prototype pollution lets attackers modify JavaScript object prototypes. Common in vibe coding. CWE-1321. Fix prompts for Cursor, Bolt & Claude.',
		url: '/kb/security/vulnerabilities/prototype-pollution/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Prototype Pollution' }
	];

	// Real external data sources
	const securityData = {
		cweId: 'CWE-1321',
		cweSource: 'https://cwe.mitre.org/data/definitions/1321.html',
		category: 'Improperly Controlled Modification of Object Prototype Attributes',
		snykSource: 'https://learn.snyk.io/lesson/prototype-pollution/'
	};

	// FAQ data for schema
	const faqs = [
		{
			question: 'What is prototype pollution in JavaScript?',
			answer: 'Prototype pollution is when an attacker modifies the prototype of a base object like Object.prototype. Every object in JavaScript inherits from Object.prototype, so any property added there automatically appears on every object in your application. Attackers exploit this to inject malicious properties that bypass security checks or trigger code execution.'
		},
		{
			question: 'How does prototype pollution lead to remote code execution?',
			answer: 'When polluted properties reach template engines, module loaders, or eval-like functions, they can execute arbitrary code. For example, polluting Object.prototype with a "constructor" or "shell" property can trigger code execution in vulnerable libraries. Multiple Node.js libraries have had RCE vulnerabilities through prototype pollution, including lodash and express-fileupload.'
		},
		{
			question: 'Why do AI coding tools generate prototype pollution vulnerabilities?',
			answer: 'AI tools generate convenient object merging patterns like Object.assign with spread operators or recursive merge functions without prototype guards. These patterns work fine for trusted data but become dangerous when processing user input. The AI optimizes for clean, working code without considering that user-controlled keys like __proto__ need to be blocked.'
		},
		{
			question: 'Does Object.freeze prevent prototype pollution?',
			answer: 'Object.freeze(Object.prototype) prevents modifications to Object.prototype and is an effective defense. However, it must be called early in application startup before any untrusted input is processed. Some libraries may not work correctly with frozen prototypes. A better approach is to block dangerous keys at the input validation layer.'
		},
		{
			question: 'Which npm packages are vulnerable to prototype pollution?',
			answer: 'Many popular packages have had prototype pollution vulnerabilities, including lodash (before 4.17.12), jQuery (before 3.4.0), hoek, merge, and express-fileupload. Always keep dependencies updated and audit with npm audit. Libraries that recursively merge objects without key filtering are the most common source of these vulnerabilities.'
		}
	];

	// Attack vectors
	const attackVectors = [
		{
			name: 'Property Injection',
			description: 'Setting __proto__ or constructor.prototype through user input',
			example: '{"__proto__": {"isAdmin": true}}'
		},
		{
			name: 'Recursive Merge',
			description: 'Deep merge functions that traverse __proto__ properties',
			example: 'merge(target, maliciousPayload)'
		},
		{
			name: 'Query Parameter',
			description: 'URL query strings parsed into objects without sanitization',
			example: '?__proto__[admin]=true'
		},
		{
			name: 'JSON Payload',
			description: 'API endpoints accepting JSON with prototype keys',
			example: 'POST body with nested __proto__'
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
			{"@type": "ListItem", "position": 4, "name": "Prototype Pollution"}
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
		"datePublished": "2025-12-20",
		"dateModified": "2025-12-20"
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
				<span class="badge">CWE-1321</span>
				<span class="badge">JavaScript</span>
			</div>
			<h1>Prototype Pollution in Vibe Coded Apps</h1>
			<p class="text-secondary">How to find and fix the JavaScript vulnerability that poisons every object in your application</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Think of JavaScript's Object.prototype as a master DNA template that every object copies from. Prototype pollution is when attackers inject malicious genes into that DNA - and suddenly every object in your app inherits the corruption.</strong>
				By setting <code>__proto__.isAdmin = true</code>, attackers can bypass authentication, trigger remote code execution, or crash your server.
				It's classified as <a href="https://cwe.mitre.org/data/definitions/1321.html">CWE-1321</a>.
				AI coding tools generate vulnerable merge patterns by default, making vibe coded apps especially susceptible.
			</p>
		</div>

		<!-- Stats Box -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">{securityData.cweId}</div>
				<div class="stat-label"><a href={securityData.cweSource}>CWE ID</a></div>
			</div>
			<div class="stat-box">
				<div class="stat-value">High</div>
				<div class="stat-label">Severity</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">RCE</div>
				<div class="stat-label">Can Lead To</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">JS/Node</div>
				<div class="stat-label">Affected Runtime</div>
			</div>
		</div>
		<p class="data-source">
			Learn more: <a href={securityData.snykSource}>Snyk Learn - Prototype Pollution</a>
		</p>

		<!-- What Is It -->
		<section class="article-section">
			<h2>What is prototype pollution?</h2>
			<p>
				Let's break this down step by step. JavaScript has a unique inheritance system - every object you create inherits properties from <code>Object.prototype</code>. Picture it like a blueprint that every house in your neighborhood copies from.
			</p>
			<p>
				Now imagine someone sneaks into the city planning office and adds "has swimming pool: yes" to the master blueprint. Suddenly, every house - past, present, and future - now has a swimming pool according to the records. That's prototype pollution.
			</p>
			<p>
				When attackers add <code>isAdmin: true</code> to <code>Object.prototype</code>, your user object suddenly has admin privileges - even though you never set that property. Your security checks pass because they're checking a property that now exists on every object.
			</p>
			<p>
				According to <a href="https://cwe.mitre.org/data/definitions/1321.html">CWE-1321</a>, this vulnerability occurs when applications let untrusted input modify object prototypes. The attack surface is particularly large in vibe coded Node.js apps that process JSON through those convenient-but-dangerous merge functions AI loves to generate.
			</p>
		</section>

		<!-- Attack Vectors -->
		<section class="article-section">
			<h2>How does prototype pollution happen?</h2>
			<p>
				Think of it like this: any time your code takes user input and uses it to set object properties, there's a potential entry point. The attacker's goal is to sneak a special key - <code>__proto__</code> - into your data and have your code process it without realizing what it's doing.
			</p>
			<p>
				Here are the most common ways it happens:
			</p>

			<div class="vectors-grid">
				{#each attackVectors as vector}
					<div class="vector-card">
						<h3>{vector.name}</h3>
						<p>{vector.description}</p>
						<code>{vector.example}</code>
					</div>
				{/each}
			</div>
		</section>

		<!-- AI Tool Patterns -->
		<section class="article-section">
			<h2>How do AI tools cause prototype pollution?</h2>
			<p>
				Here's where it gets interesting. When you ask <a href="/kb/vibe-coding-tools/cursor/">Cursor</a> or <a href="/kb/vibe-coding-tools/bolt/">Bolt</a> for a "deep merge utility," they give you something that looks helpful. And it is helpful - until someone sends malicious data.
			</p>
			<p>
				The AI learned these patterns from millions of code examples. Most of those examples didn't handle the edge case of malicious keys because they were written for trusted data. Now you understand why the same pattern shows up everywhere.
			</p>

			<div class="tool-patterns-box">
				<h3>The pattern behind prototype pollution</h3>
				<p>Ask any AI for a deep merge function. This is what you get:</p>
				<div class="code-block">
					<pre><code>{`// Cursor, Bolt, Claude Code - all generate this pattern
function deepMerge(target, source) {
  for (const key in source) {
    if (typeof source[key] === 'object') {
      target[key] = deepMerge(target[key] || {}, source[key])
    } else {
      target[key] = source[key]
    }
  }
  return target
}

// Attacker sends: {"__proto__": {"isAdmin": true}}
// Now: ({}).isAdmin === true for ALL objects`}</code></pre>
				</div>
				<p class="pattern-note">
					The function iterates over all keys including <code>__proto__</code>.
					When it encounters <code>__proto__</code>, it modifies <code>Object.prototype</code> instead of a normal property.
				</p>
			</div>

			<p>
				<strong>Why AI does this:</strong> Recursive merge functions are everywhere in training data.
				They solve a real problem (combining nested objects) but the dangerous edge cases around <code>__proto__</code> and <code>constructor</code> aren't represented in the patterns AI learns from.
			</p>
		</section>

		<!-- What Could Happen -->
		<section class="article-section">
			<h2>What could happen if I have prototype pollution?</h2>
			<p>
				Let me walk you through the possible outcomes. The impact ranges from "your server crashes" to "attackers run any code they want on your server." Neither is good, but understanding the range helps you prioritize fixes.
			</p>
			<ul class="consequences-list">
				<li><strong>Authentication bypass:</strong> Inject <code>isAdmin: true</code> or <code>role: 'admin'</code> into the prototype. Every user object now has admin privileges. Your role checks pass for everyone.</li>
				<li><strong>Remote code execution:</strong> When polluted properties reach template engines like Handlebars or EJS, or module loaders, they can trigger arbitrary code execution. CVE-2019-10744 in lodash enabled RCE through prototype pollution.</li>
				<li><strong>Denial of service:</strong> Pollute <code>Object.prototype.toString</code> or other built-in methods. The entire application crashes because fundamental operations stop working.</li>
				<li><strong>Data exfiltration:</strong> Inject properties that change how data is serialized or logged. Sensitive data ends up in unexpected places like error messages or analytics.</li>
				<li><strong>Security control bypass:</strong> Pollute properties checked in security middleware. Rate limiting, CORS, and input validation can all be bypassed if they check properties that exist on the polluted prototype.</li>
			</ul>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How do I detect prototype pollution?</h2>
			<p>
				Search your codebase for patterns that set object properties based on user input without filtering dangerous keys.
				Any code that recursively copies properties is suspect.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Patterns to search for</span>
				</div>
				<pre><code>{`// Recursive merge without key filtering (DANGEROUS)
for (const key in source) {
  target[key] = source[key]
}

// Object.assign with user input (DANGEROUS if source is untrusted)
Object.assign(config, userInput)

// Spread operator with untrusted data (DANGEROUS)
const merged = { ...defaults, ...userInput }

// Bracket notation with dynamic keys (DANGEROUS)
obj[userControlledKey] = value

// Regex patterns to find these:
// for\\s*\\(.*\\s+in\\s+.*\\)\\s*\\{[^}]*\\[.*\\]\\s*=
// Object\\.assign\\s*\\(.*,.*\\)
// \\.\\.\\.\\w+Input`}</code></pre>
			</div>

			<div class="cta-box">
				<p><strong>Scan for prototype pollution automatically</strong></p>
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
			<h2>How do I fix prototype pollution?</h2>
			<p>
				Now for the good news: once you understand the problem, the fix is straightforward. You need to block three dangerous keys - <code>__proto__</code>, <code>constructor</code>, and <code>prototype</code> - from being processed as normal properties.
			</p>
			<p>
				Think of it like a security checkpoint at an airport. These three "keys" are banned items - you check for them and refuse to let them through.
			</p>

			<!-- AI Fix Prompt -->
			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>Copy this prompt into Cursor, Claude Code, or Bolt to find and fix prototype pollution vulnerabilities:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Fix all prototype pollution vulnerabilities in my codebase.

## What to look for

Search for these dangerous patterns:

1. Recursive object merge functions:
   - for (const key in source) { target[key] = source[key] }
   - Deep clone/merge utilities without key filtering

2. Dynamic property access with user input:
   - obj[userInput] = value
   - config[req.body.key] = req.body.value

3. Object.assign with untrusted sources:
   - Object.assign(config, req.body)
   - Object.assign({}, ...sources)

4. Spread operators with user data:
   - { ...defaults, ...userInput }
   - { ...req.body }

## How to fix

### Option 1: Filter dangerous keys in merge functions
\`\`\`javascript
// Before (vulnerable)
function deepMerge(target, source) {
  for (const key in source) {
    target[key] = source[key]
  }
  return target
}

// After (secure)
const DANGEROUS_KEYS = ['__proto__', 'constructor', 'prototype']

function deepMerge(target, source) {
  for (const key in source) {
    if (DANGEROUS_KEYS.includes(key)) continue
    if (!Object.hasOwn(source, key)) continue

    if (typeof source[key] === 'object' && source[key] !== null) {
      target[key] = deepMerge(target[key] || {}, source[key])
    } else {
      target[key] = source[key]
    }
  }
  return target
}
\`\`\`

### Option 2: Use Object.create(null) for dictionaries
\`\`\`javascript
// Before (inherits from Object.prototype)
const cache = {}

// After (no prototype chain)
const cache = Object.create(null)
\`\`\`

### Option 3: Freeze Object.prototype at startup
\`\`\`javascript
// Add to application entry point (main.js or index.js)
Object.freeze(Object.prototype)
Object.freeze(Array.prototype)
Object.freeze(Function.prototype)
\`\`\`

### Option 4: Use Map instead of objects for dynamic keys
\`\`\`javascript
// Before (vulnerable to prototype pollution)
const settings = {}
settings[userKey] = userValue

// After (Map doesn't have prototype pollution issues)
const settings = new Map()
settings.set(userKey, userValue)
\`\`\`

## Validation layer
Add this validation to all API endpoints:
\`\`\`javascript
function sanitizeObject(obj) {
  if (typeof obj !== 'object' || obj === null) return obj

  const clean = Object.create(null)
  for (const key of Object.keys(obj)) {
    if (['__proto__', 'constructor', 'prototype'].includes(key)) continue
    clean[key] = typeof obj[key] === 'object'
      ? sanitizeObject(obj[key])
      : obj[key]
  }
  return clean
}

// Use in Express middleware
app.use(express.json())
app.use((req, res, next) => {
  if (req.body) req.body = sanitizeObject(req.body)
  next()
})
\`\`\`

## After fixing

1. Run npm audit to check for vulnerable dependencies
2. Update lodash, merge, and similar packages to latest versions
3. Add tests that verify __proto__ keys are rejected
4. List all files you modified with before/after snippets

Please proceed systematically through my codebase.`}</div>
				</div>
			</div>

			<!-- Manual Fix -->
			<div class="fix-section">
				<h3>Manual Fix</h3>
				<p>The core fix is filtering dangerous keys before they can modify prototypes. Here's the pattern:</p>

				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-block-header">
							<span class="code-block-lang status-bad">VULNERABLE</span>
						</div>
						<pre><code>{`// Recursive merge without protection
function merge(target, source) {
  for (const key in source) {
    if (typeof source[key] === 'object') {
      target[key] = merge(target[key] || {}, source[key])
    } else {
      target[key] = source[key]
    }
  }
  return target
}

// Attacker sends: {"__proto__": {"admin": true}}
merge({}, JSON.parse(userInput))
// Now: ({}).admin === true globally!`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-block-header">
							<span class="code-block-lang status-good">SECURE</span>
						</div>
						<pre><code>{`// Recursive merge with prototype protection
const BLOCKED = new Set(['__proto__', 'constructor', 'prototype'])

function merge(target, source) {
  for (const key of Object.keys(source)) {
    if (BLOCKED.has(key)) continue

    if (typeof source[key] === 'object' && source[key] !== null) {
      target[key] = merge(target[key] || {}, source[key])
    } else {
      target[key] = source[key]
    }
  }
  return target
}

// Attacker sends: {"__proto__": {"admin": true}}
merge({}, JSON.parse(userInput))
// __proto__ key is skipped, prototype is safe`}</code></pre>
					</div>
				</div>

				<p>
					<strong>Key changes:</strong> Using <code>Object.keys()</code> instead of <code>for...in</code> to only iterate own properties,
					and explicitly blocking the dangerous keys <code>__proto__</code>, <code>constructor</code>, and <code>prototype</code>.
				</p>
			</div>

			<!-- Defense Layers -->
			<div class="fix-section">
				<h3>Defense in depth</h3>
				<div class="defense-layers">
					<div class="layer">
						<span class="layer-num">1</span>
						<div class="layer-content">
							<strong>Input validation</strong>
							<p>Reject any JSON containing __proto__, constructor, or prototype keys at API boundary</p>
						</div>
					</div>
					<div class="layer">
						<span class="layer-num">2</span>
						<div class="layer-content">
							<strong>Safe merge functions</strong>
							<p>Use Object.keys() and filter dangerous keys in all object merging utilities</p>
						</div>
					</div>
					<div class="layer">
						<span class="layer-num">3</span>
						<div class="layer-content">
							<strong>Prototype-less objects</strong>
							<p>Use Object.create(null) for dictionaries and Maps for dynamic key-value storage</p>
						</div>
					</div>
					<div class="layer">
						<span class="layer-num">4</span>
						<div class="layer-content">
							<strong>Freeze prototypes</strong>
							<p>Call Object.freeze(Object.prototype) at application startup as a last defense</p>
						</div>
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
				<a href="/kb/security/vulnerabilities/xss/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Cross-Site Scripting (XSS)</div>
					<p class="related-card-description">Inject malicious scripts into web pages</p>
				</a>
				<a href="/kb/security/vulnerabilities/sql-injection/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">SQL Injection</div>
					<p class="related-card-description">Database attacks in AI-generated code</p>
				</a>
				<a href="/kb/vibe-coding-tools/cursor/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Cursor Security Patterns</div>
					<p class="related-card-description">Common vulnerabilities in Cursor-generated code</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Find prototype pollution before attackers do</h2>
			<p>One polluted prototype can compromise your entire application.</p>
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

	.badge-high {
		background: var(--orange);
		color: var(--bg-primary);
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

	/* Vectors Grid */
	.vectors-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.vector-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.25rem;
	}

	.vector-card h3 {
		margin: 0 0 0.5rem;
		font-size: 0.9375rem;
		color: var(--text-primary);
	}

	.vector-card p {
		margin: 0 0 0.75rem;
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.vector-card code {
		display: block;
		background: var(--bg-tertiary);
		padding: 0.5rem;
		font-size: 0.75rem;
		color: var(--orange);
		word-break: break-all;
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

	/* Code Comparison - stacked layout (vulnerable on top, secure below) */
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

	/* Defense Layers */
	.defense-layers {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-top: 1rem;
	}

	.layer {
		display: flex;
		gap: 1rem;
		align-items: flex-start;
		padding: 1rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
	}

	.layer-num {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		background: var(--green-dim);
		color: var(--bg-primary);
		font-weight: 600;
		font-size: 0.875rem;
		flex-shrink: 0;
	}

	.layer-content strong {
		display: block;
		margin-bottom: 0.25rem;
		color: var(--text-primary);
	}

	.layer-content p {
		margin: 0;
		font-size: 0.875rem;
		color: var(--text-secondary);
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
		letter-spacing: -0.01em;
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
		.vectors-grid {
			grid-template-columns: 1fr;
		}

		.faq-item h3 {
			font-size: 1rem;
		}
	}
</style>
