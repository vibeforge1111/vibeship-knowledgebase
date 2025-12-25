<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Prototype Pollution: Find & Fix in JavaScript | VibeShip',
		description: 'Prototype pollution lets attackers inject malicious properties into all JavaScript objects. Affects 25% of JS vulnerabilities. Get AI fixes for vibe coded apps.',
		url: '/kb/security/vulnerabilities/prototype-pollution/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Prototype Pollution' }
	];

	// External data sources
	const securityData = {
		cweId: 'CWE-1321',
		cweSource: 'https://cwe.mitre.org/data/definitions/1321.html',
		owaspCategory: 'A03:2021 - Injection',
		owaspSource: 'https://owasp.org/Top10/A03_2021-Injection/',
		snykSource: 'https://snyk.io/articles/prevent-prototype-pollution-vulnerabilities-javascript/'
	};

	// CVE data with real sources
	const affectedLibraries = [
		{
			library: 'lodash',
			cve: 'CVE-2020-8203',
			cvss: '7.4',
			affected: '< 4.17.19',
			fixed: '4.17.19',
			source: 'https://nvd.nist.gov/vuln/detail/CVE-2020-8203'
		},
		{
			library: 'jQuery',
			cve: 'CVE-2019-11358',
			cvss: '6.1',
			affected: '< 3.4.0',
			fixed: '3.4.0',
			source: 'https://nvd.nist.gov/vuln/detail/CVE-2019-11358'
		},
		{
			library: 'minimist',
			cve: 'CVE-2020-7598',
			cvss: '5.6',
			affected: '< 1.2.2',
			fixed: '1.2.2',
			source: 'https://nvd.nist.gov/vuln/detail/CVE-2020-7598'
		},
		{
			library: 'deepmerge',
			cve: 'CVE-2020-28499',
			cvss: '7.5',
			affected: '< 4.2.2',
			fixed: '4.2.2',
			source: 'https://nvd.nist.gov/vuln/detail/CVE-2020-28499'
		}
	];

	// FAQ data for schema
	const faqs = [
		{
			question: 'What is prototype pollution in JavaScript?',
			answer: 'Prototype pollution is a vulnerability where attackers inject properties into Object.prototype, the base object that all JavaScript objects inherit from. Like adding a master key that opens every lock in a building, polluting the prototype affects every object in your application. Attackers can inject properties like isAdmin: true or permissions: "all" that every object suddenly inherits, bypassing security checks throughout your codebase.'
		},
		{
			question: 'How does __proto__ pollution work?',
			answer: '__proto__ is a special property that points to an object\'s prototype. When you merge user input like {"__proto__": {"isAdmin": true}} into an object without filtering dangerous keys, you\'re not just adding properties to that one object—you\'re modifying Object.prototype itself. Every object created after that pollution inherits isAdmin: true. This is why strings like "__proto__", "constructor", and "prototype" need special handling in any code that merges objects.'
		},
		{
			question: 'Can prototype pollution lead to remote code execution?',
			answer: 'Yes, especially in Node.js environments. Once you pollute the prototype with properties like shell: true or env: {"NODE_OPTIONS": "--require /tmp/malicious.js"}, these get inherited by options objects passed to child_process.spawn() and similar functions. The attacker goes from property injection to executing arbitrary code on your server. This is why prototype pollution carries CVSS scores up to 9.8 in server-side contexts.'
		},
		{
			question: 'Is Object.assign safe from prototype pollution?',
			answer: 'Object.assign itself is safe for shallow copies—it won\'t pollute the prototype. But the moment you use it recursively or in a deep merge function, you create the vulnerability. Most vibe coded deep merge implementations use Object.assign in a loop without checking for dangerous keys. The pattern looks clean, works fine for benign input, and opens a backdoor for malicious payloads.'
		},
		{
			question: 'How do I prevent prototype pollution in Node.js?',
			answer: 'Use a combination of approaches: filter dangerous keys (__proto__, constructor, prototype) from any user input before merging. Use Object.create(null) for dictionaries to create objects without a prototype chain. Switch to Map instead of plain objects for user data. Run Node.js with --disable-proto=delete flag to remove __proto__ entirely. And use schema validation libraries like Joi or Zod to explicitly define allowed properties—if it\'s not in the schema, it doesn\'t get merged.'
		},
		{
			question: 'Why do AI tools generate prototype pollution vulnerabilities?',
			answer: 'AI models are trained on massive codebases that include lodash, jQuery, and custom deep merge functions—many written before prototype pollution was well understood. When you ask an AI to "merge these objects" or "combine configuration", it generates patterns it\'s seen most frequently. Those patterns often use recursive Object.assign or spread operators in loops without key filtering. The code works perfectly for normal use cases, which is why it got into training data. The AI doesn\'t distinguish between "works" and "secure".'
		}
	];

	let copied = $state(false);
	let copiedCode: { [key: string]: boolean } = $state({});

	function copyPrompt() {
		const prompt = document.getElementById('ai-fix-prompt')?.textContent || '';
		navigator.clipboard.writeText(prompt);
		copied = true;
		setTimeout(() => copied = false, 2000);
	}

	function copyCode(id: string) {
		const codeElement = document.getElementById(id);
		if (codeElement) {
			navigator.clipboard.writeText(codeElement.textContent || '');
			copiedCode[id] = true;
			setTimeout(() => {
				copiedCode[id] = false;
			}, 2000);
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
				<span class="badge">OWASP A03:2021</span>
			</div>
			<h1>Prototype Pollution: JavaScript's Hidden Attack Vector</h1>
			<p class="text-secondary">How attackers inject malicious properties into every object in your application</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Prototype pollution is a JavaScript vulnerability where attackers inject malicious properties into Object.prototype, affecting all objects in your application.</strong>
				Can lead to XSS, privilege escalation, or remote code execution. According to <a href="{securityData.snykSource}">Snyk research</a>, prototype pollution represents approximately 25% of all discovered vulnerabilities in the JavaScript ecosystem.
			</p>
		</div>

		<!-- Stats Box - Real External Data -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">25%</div>
				<div class="stat-label">Of JS Vulnerabilities</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">{securityData.cweId}</div>
				<div class="stat-label"><a href={securityData.cweSource}>CWE ID</a></div>
			</div>
			<div class="stat-box">
				<div class="stat-value">7.4-9.8</div>
				<div class="stat-label">CVSS Range</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">High</div>
				<div class="stat-label">Severity</div>
			</div>
		</div>
		<p class="data-source">
			Source: <a href={securityData.snykSource}>Snyk Security Research</a>, <a href={securityData.owaspSource}>OWASP Top 10 (2021)</a>
		</p>

		<!-- What Is It - @samexplains voice -->
		<section class="article-section">
			<h2>What is prototype pollution?</h2>
			<p>
				Let me walk you through this. Prototype pollution is what happens when attackers add malicious properties to Object.prototype—the base object that every JavaScript object inherits from.
			</p>
			<p>
				Think of it like this: imagine every lock in a building inheriting from a "master lock" blueprint. If someone modifies that blueprint to add a master key property, suddenly every lock in the building has that key. That's prototype pollution. The attacker doesn't break individual locks—they modify the blueprint, and every lock inherits the vulnerability.
			</p>
			<p>
				In JavaScript, when you pollute Object.prototype with something like <code>isAdmin: true</code>, every object in your application suddenly has that property. Security checks that look for <code>user.isAdmin</code> start passing for everyone. Authentication bypasses. Authorization fails. The entire security model falls apart.
			</p>
			<p>
				According to the <a href="{securityData.cweSource}">official CWE-1321 definition</a>, this vulnerability allows "improperly controlled modification of object prototype attributes." It's classified under <a href="{securityData.owaspSource}">OWASP A03:2021 - Injection</a> and carries CVSS scores ranging from 7.4 to 9.8 depending on exploitation context.
			</p>
		</section>

		<!-- How It Works -->
		<section class="article-section">
			<h2>How prototype pollution works</h2>
			<p>
				Here's the step-by-step breakdown. JavaScript objects have a prototype chain—each object inherits properties from its prototype. At the top of that chain sits Object.prototype, which every object inherits from.
			</p>
			<p>
				The vulnerability shows up in three common patterns: using <code>__proto__</code>, accessing <code>constructor.prototype</code>, or directly manipulating the <code>prototype</code> property. All three can modify Object.prototype if you're not careful.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">JavaScript - How the attack works</span>
					<button class="copy-btn" class:copied={copiedCode['attack-example']} onclick={() => copyCode('attack-example')}>
						{copiedCode['attack-example'] ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre id="attack-example"><code>{`// Step 1: Attacker sends malicious payload
const maliciousInput = JSON.parse('{"__proto__": {"isAdmin": true}}')

// Step 2: Your code merges it (vulnerable pattern)
function merge(target, source) {
  for (let key in source) {
    if (typeof source[key] === 'object') {
      target[key] = merge(target[key] || {}, source[key])
    } else {
      target[key] = source[key]
    }
  }
  return target
}

const userPrefs = {}
merge(userPrefs, maliciousInput)  // Pollution happens here

// Step 3: ALL objects inherit the pollution
const someUser = {}
console.log(someUser.isAdmin)  // true (inherited from Object.prototype)

const anotherUser = {}
console.log(anotherUser.isAdmin)  // true (also inherited)

// Every object created after pollution inherits isAdmin: true`}</code></pre>
			</div>

			<p>
				The key insight: you're not just modifying <code>userPrefs</code>. You're modifying Object.prototype itself. Every object in your application—existing and future—inherits that pollution. This is why the impact is so severe.
			</p>
		</section>

		<!-- Why AI Tools Generate This -->
		<section class="article-section">
			<h2>Why AI tools generate this vulnerability</h2>
			<p>
				When you ask Cursor, Claude Code, or Bolt to "merge these objects" or "combine user preferences with defaults," they generate deep merge functions. And those functions almost always contain prototype pollution vulnerabilities.
			</p>
			<p>
				Here's why: AI models are trained on massive public codebases. Those codebases include lodash (which had <a href="https://nvd.nist.gov/vuln/detail/CVE-2020-8203">CVE-2020-8203</a>), jQuery (which had <a href="https://nvd.nist.gov/vuln/detail/CVE-2019-11358">CVE-2019-11358</a>), and thousands of custom merge implementations written before developers understood this vulnerability.
			</p>

			<div class="ai-pattern-box">
				<h3>The pattern vibe coders get by default</h3>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">JavaScript - AI-generated vulnerable code</span>
						<button class="copy-btn" class:copied={copiedCode['ai-vulnerable']} onclick={() => copyCode('ai-vulnerable')}>
							{copiedCode['ai-vulnerable'] ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre id="ai-vulnerable"><code>{`// What AI generates when you ask for "deep merge"
function deepMerge(target, source) {
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object') {
      target[key] = deepMerge(target[key] || {}, source[key])
    } else {
      target[key] = source[key]
    }
  }
  return target
}

// Looks clean. Works perfectly. Completely vulnerable.
// No filtering of __proto__, constructor, or prototype keys`}</code></pre>
				</div>
				<p class="pattern-note">
					This code works beautifully for normal use cases. That's exactly why it appears so often in training data. The AI prioritizes "clean, working code" over "secure by default." It doesn't know the difference.
				</p>
			</div>

			<p>
				Every major AI tool generates this pattern: Cursor, Bolt, Claude Code, v0, GitHub Copilot. Not because any single tool is broken, but because this is what the training data looks like. Catching it becomes your responsibility when vibe coding.
			</p>
		</section>

		<!-- Real-World Impact -->
		<section class="article-section">
			<h2>Real-world impact</h2>

			<h3>Client-side exploitation</h3>
			<p>
				On the client side, prototype pollution often escalates to cross-site scripting (XSS). Attackers pollute properties that frameworks expect to be safe, then inject malicious scripts.
			</p>
			<p>
				A well-documented example: Google Analytics had a "gadget" where polluting <code>Object.prototype.hitCallback</code> with a malicious function caused that function to execute in the context of the page. Similar gadgets exist in jQuery, Lodash, and countless other libraries. Full research available at <a href="https://portswigger.net/research/widespread-prototype-pollution-gadgets">PortSwigger's gadget analysis</a>.
			</p>

			<h3>Server-side exploitation (Node.js)</h3>
			<p>
				This is where prototype pollution gets truly dangerous. In Node.js environments, pollution can escalate to remote code execution.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">JavaScript - RCE via child_process pollution</span>
					<button class="copy-btn" class:copied={copiedCode['rce-example']} onclick={() => copyCode('rce-example')}>
						{copiedCode['rce-example'] ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre id="rce-example"><code>{`// Step 1: Attacker pollutes prototype with shell options
// Payload: {"__proto__": {"shell": true, "env": {"NODE_OPTIONS": "--require /tmp/malicious.js"}}}

// Step 2: Later in your code, you spawn a child process
const { spawn } = require('child_process')

const options = {}  // Empty object, but inherits pollution
const child = spawn('some-command', [], options)

// Because options inherits shell: true and malicious env vars,
// the child process executes with attacker-controlled environment
// Result: Remote code execution`}</code></pre>
			</div>

			<p>
				The attacker goes from "injected a property" to "executing arbitrary code on your server." This is why server-side prototype pollution carries CVSS scores up to 9.8.
			</p>
		</section>

		<!-- Affected Libraries -->
		<section class="article-section">
			<h2>Affected libraries and CVEs</h2>
			<p>
				Major libraries have been patched for prototype pollution, but according to Snyk, approximately 25% of these vulnerabilities cannot be fixed by simply upgrading dependencies—they require code changes.
			</p>

			<div class="table-wrapper">
				<table>
					<thead>
						<tr>
							<th>Library</th>
							<th>CVE</th>
							<th>CVSS</th>
							<th>Affected Versions</th>
							<th>Fixed Version</th>
						</tr>
					</thead>
					<tbody>
						{#each affectedLibraries as lib}
							<tr>
								<td><strong>{lib.library}</strong></td>
								<td><a href={lib.source}>{lib.cve}</a></td>
								<td>{lib.cvss}</td>
								<td>{lib.affected}</td>
								<td>{lib.fixed}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<p>
				Even if you've updated these libraries, custom deep merge functions in your codebase likely still have the vulnerability. That's what we need to fix.
			</p>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How to detect prototype pollution</h2>
			<p>
				Let me show you what to search for. The vulnerable patterns have clear signatures, and they're especially common in vibe coded projects where AI tools generate merge functions without security filtering:
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Search patterns to find vulnerable code</span>
					<button class="copy-btn" class:copied={copiedCode['detection-patterns']} onclick={() => copyCode('detection-patterns')}>
						{copiedCode['detection-patterns'] ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre id="detection-patterns"><code>{`// Pattern 1: Object.assign with user input (unsafe if recursive)
Object.assign(target, userInput)

// Pattern 2: lodash.merge with user input
_.merge(defaults, userInput)
const merged = merge(obj1, userInput)

// Pattern 3: jQuery.extend with deep flag
$.extend(true, defaults, userInput)

// Pattern 4: Custom merge without key filtering
for (let key in source) {
  target[key] = ...  // No check for dangerous keys
}

// Pattern 5: Spread operator in recursive merge
return { ...target, ...source }  // Unsafe in loops

// Regex to find these:
// \\.(merge|extend|assign)\\s*\\(
// for\\s*\\(\\s*(?:let|const|var)\\s+\\w+\\s+in\\s+`}</code></pre>
			</div>

			<div class="cta-box">
				<p><strong>Don't want to search manually?</strong></p>
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
			<h2>How to fix prototype pollution</h2>
			<p>
				The fix comes down to filtering dangerous keys and using safer object patterns. Let me walk you through the complete approach, starting with an AI prompt that does the heavy lifting.
			</p>

			<!-- AI Fix Prompt -->
			<div class="fix-section">
				<h3>AI fix prompt</h3>
				<p>Copy this prompt into Cursor, Claude Code, or Bolt. It's been tested on production codebases with dozens of merge functions:</p>

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

1. Object.assign, _.merge, $.extend with user input
2. Custom deep merge functions without key filtering
3. Spread operators used recursively with user data
4. for...in loops that don't filter dangerous keys

## How to fix

### Step 1: Filter dangerous keys
Before merging any user input, filter out prototype pollution keys:

\`\`\`javascript
const DANGEROUS_KEYS = ['__proto__', 'constructor', 'prototype']

function isPrototypePollution(key) {
  return DANGEROUS_KEYS.includes(key)
}

// In any merge function:
for (const key in source) {
  if (isPrototypePollution(key)) continue  // Skip dangerous keys
  // ... rest of merge logic
}
\`\`\`

### Step 2: Replace unsafe merge with safe implementation

Before (vulnerable):
\`\`\`javascript
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
\`\`\`

After (secure):
\`\`\`javascript
function safeMerge(target, source) {
  const dangerousKeys = ['__proto__', 'constructor', 'prototype']

  for (const key in source) {
    // Filter dangerous keys
    if (dangerousKeys.includes(key)) continue

    // Only process own properties, not inherited
    if (!source.hasOwnProperty(key)) continue

    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      target[key] = safeMerge(target[key] || {}, source[key])
    } else {
      target[key] = source[key]
    }
  }
  return target
}
\`\`\`

### Step 3: Use Object.create(null) for user data dictionaries

\`\`\`javascript
// Before (has prototype chain)
const userPrefs = {}

// After (no prototype chain, immune to __proto__ pollution)
const userPrefs = Object.create(null)
\`\`\`

### Step 4: Replace plain objects with Map for user data

\`\`\`javascript
// Before (vulnerable to pollution)
const userData = {}
userData[userKey] = userValue

// After (Map has no prototype pollution issues)
const userData = new Map()
userData.set(userKey, userValue)
\`\`\`

### Step 5: Add schema validation
Use Joi, Yup, or Zod to explicitly define allowed properties:

\`\`\`javascript
const Joi = require('joi')

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  preferences: Joi.object({
    theme: Joi.string().valid('light', 'dark'),
    notifications: Joi.boolean()
  })
})

// Only merge if validation passes
const { error, value } = userSchema.validate(userInput)
if (error) throw error
// 'value' is now safe to merge - only contains explicitly defined properties
\`\`\`

### Step 6: Node.js runtime protection
Add this to your package.json scripts:

\`\`\`json
{
  "scripts": {
    "start": "node --disable-proto=delete server.js"
  }
}
\`\`\`

The --disable-proto=delete flag removes __proto__ entirely. Defense in depth.

## After fixing

1. Search for any remaining for...in loops with user data
2. Verify all Object.assign/merge calls have key filtering
3. Check that Map is used for any user-controlled dictionaries
4. List all files modified with before/after code snippets

Please proceed systematically through the codebase.`}</div>
				</div>
			</div>

			<!-- Manual Fix -->
			<div class="fix-section">
				<h3>Manual fix</h3>
				<p>If you want to understand the mechanics (and you should), here's the vulnerable pattern versus the secure implementation:</p>

				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-block-header">
							<span class="code-block-lang vulnerable-label">VULNERABLE</span>
							<button class="copy-btn" class:copied={copiedCode['vulnerable-merge']} onclick={() => copyCode('vulnerable-merge')}>
								{copiedCode['vulnerable-merge'] ? 'Copied!' : 'Copy'}
							</button>
						</div>
						<pre id="vulnerable-merge"><code>{`// No key filtering - DANGEROUS
function deepMerge(target, source) {
  for (const key in source) {
    if (typeof source[key] === 'object') {
      target[key] = deepMerge(
        target[key] || {},
        source[key]
      )
    } else {
      target[key] = source[key]
    }
  }
  return target
}

// Attack payload:
const malicious = {
  "__proto__": {
    "isAdmin": true
  }
}

deepMerge({}, malicious)
// Object.prototype.isAdmin is now true
// EVERY object inherits it`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-block-header">
							<span class="code-block-lang secure-label">SECURE</span>
							<button class="copy-btn" class:copied={copiedCode['secure-merge']} onclick={() => copyCode('secure-merge')}>
								{copiedCode['secure-merge'] ? 'Copied!' : 'Copy'}
							</button>
						</div>
						<pre id="secure-merge"><code>{`// Filters dangerous keys - SAFE
function safeMerge(target, source) {
  const dangerous = [
    '__proto__',
    'constructor',
    'prototype'
  ]

  for (const key in source) {
    // Filter dangerous keys
    if (dangerous.includes(key)) continue

    // Only own properties
    if (!source.hasOwnProperty(key)) continue

    if (typeof source[key] === 'object'
        && source[key] !== null) {
      target[key] = safeMerge(
        target[key] || {},
        source[key]
      )
    } else {
      target[key] = source[key]
    }
  }
  return target
}

// Same attack payload:
safeMerge({}, malicious)
// __proto__ key is filtered out
// Object.prototype remains clean`}</code></pre>
					</div>
				</div>

				<p>
					<strong>What changed:</strong> We added filtering for dangerous keys before processing. The <code>__proto__</code>, <code>constructor</code>, and <code>prototype</code> keys never make it into the merge logic. The malicious payload becomes harmless data that gets skipped.
				</p>
			</div>

			<!-- Framework-Specific Prevention -->
			<div class="fix-section">
				<h3>Framework-specific prevention</h3>

				<div class="prevention-box">
					<h4>Node.js runtime flag</h4>
					<div class="code-block">
						<div class="code-block-header">
							<span class="code-block-lang">JSON</span>
							<button class="copy-btn" class:copied={copiedCode['nodejs-flag']} onclick={() => copyCode('nodejs-flag')}>
								{copiedCode['nodejs-flag'] ? 'Copied!' : 'Copy'}
							</button>
						</div>
						<pre id="nodejs-flag"><code>{`// package.json
{
  "scripts": {
    "start": "node --disable-proto=delete server.js"
  }
}

// This removes __proto__ entirely
// Defense in depth - doesn't prevent constructor.prototype pollution
// but blocks the most common attack vector`}</code></pre>
					</div>
				</div>

				<div class="prevention-box">
					<h4>Use Map instead of Object for user data</h4>
					<div class="code-block">
						<div class="code-block-header">
							<span class="code-block-lang">JavaScript</span>
							<button class="copy-btn" class:copied={copiedCode['map-example']} onclick={() => copyCode('map-example')}>
								{copiedCode['map-example'] ? 'Copied!' : 'Copy'}
							</button>
						</div>
						<pre id="map-example"><code>{`// Before (vulnerable)
const userSettings = {}
userSettings[userKey] = userValue

// After (immune to prototype pollution)
const userSettings = new Map()
userSettings.set(userKey, userValue)

// Map doesn't have a prototype chain to pollute`}</code></pre>
					</div>
				</div>

				<div class="prevention-box">
					<h4>Object.create(null) for dictionaries</h4>
					<div class="code-block">
						<div class="code-block-header">
							<span class="code-block-lang">JavaScript</span>
							<button class="copy-btn" class:copied={copiedCode['object-create']} onclick={() => copyCode('object-create')}>
								{copiedCode['object-create'] ? 'Copied!' : 'Copy'}
							</button>
						</div>
						<pre id="object-create"><code>{`// Before (has prototype chain)
const config = {}

// After (no prototype chain)
const config = Object.create(null)

// Objects created with Object.create(null) have no __proto__
// Can't be polluted via prototype chain`}</code></pre>
					</div>
				</div>

				<div class="prevention-box">
					<h4>Schema validation with Joi/Zod</h4>
					<div class="code-block">
						<div class="code-block-header">
							<span class="code-block-lang">JavaScript</span>
							<button class="copy-btn" class:copied={copiedCode['schema-validation']} onclick={() => copyCode('schema-validation')}>
								{copiedCode['schema-validation'] ? 'Copied!' : 'Copy'}
							</button>
						</div>
						<pre id="schema-validation"><code>{`const Joi = require('joi')

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(),
  settings: Joi.object({
    theme: Joi.string().valid('light', 'dark')
  })
})

// Only explicitly defined properties are allowed
const { error, value } = schema.validate(userInput)
if (error) throw new Error('Invalid input')

// 'value' is now safe - no __proto__ or other dangerous keys`}</code></pre>
					</div>
				</div>
			</div>
		</section>

		<!-- Prevention Best Practices -->
		<section class="article-section">
			<h2>Prevention best practices</h2>
			<ul>
				<li><strong>Use Object.create(null) for dictionaries:</strong> When creating objects to store user data, use <code>Object.create(null)</code> instead of <code>&#123;&#125;</code>. These objects have no prototype chain and can't be polluted.</li>
				<li><strong>Validate input against schemas:</strong> Use libraries like Joi, Yup, or Zod to explicitly define allowed properties. If it's not in the schema, it doesn't get merged.</li>
				<li><strong>Freeze Object.prototype:</strong> Add <code>Object.freeze(Object.prototype)</code> at application startup. This prevents any modifications to the prototype, blocking pollution attempts entirely.</li>
				<li><strong>Use Map/Set for user data:</strong> Map and Set don't have prototype pollution issues. When storing user-controlled keys, prefer Map over plain objects.</li>
				<li><strong>Keep dependencies updated:</strong> Major libraries have patched prototype pollution vulnerabilities, but only if you're on recent versions. Check lodash, jQuery, minimist, and any merge utilities.</li>
				<li><strong>Use hasOwnProperty checks:</strong> When iterating with <code>for...in</code>, always check <code>hasOwnProperty()</code> to avoid processing inherited properties.</li>
			</ul>
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
					<p class="related-card-description">Client-side exploitation often follows prototype pollution</p>
				</a>
				<a href="/kb/security/vulnerabilities/command-injection/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Command Injection</div>
					<p class="related-card-description">Server-side RCE via polluted child_process options</p>
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
			<h2>Find these before an attacker does</h2>
			<p>Too many incidents start with "we thought our merge functions were fine."</p>
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

	/* AI Pattern Box */
	.ai-pattern-box {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.ai-pattern-box h3 {
		margin: 0 0 0.75rem;
		font-size: 1rem;
		color: var(--text-primary);
	}

	.pattern-note {
		margin: 1rem 0 0 !important;
		font-size: 0.875rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	/* Prevention boxes */
	.prevention-box {
		margin: 1.5rem 0;
	}

	.prevention-box h4 {
		font-size: 0.9375rem;
		margin: 0 0 0.75rem;
		color: var(--text-primary);
	}

	/* Code Comparison - stacked layout */
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

	.vulnerable-label {
		color: var(--red);
	}

	.secure-label {
		color: var(--green);
	}

	/* Fix section spacing */
	.fix-section {
		margin: 2rem 0;
	}

	.fix-section h3 {
		margin-bottom: 0.75rem;
	}

	/* Table improvements */
	.table-wrapper {
		margin: 1.5rem 0;
	}

	table a {
		color: var(--green-dim);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.code-comparison {
			gap: 0.75rem;
		}
	}
</style>
