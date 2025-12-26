<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'XPath Injection: Find & Fix in AI-Generated Code',
		description: 'XPath injection lets attackers query your XML data like they own it. Common in vibe coded apps using XML configs. Copy-paste AI fixes for Cursor, Bolt & Claude.',
		url: '/kb/security/vulnerabilities/xpath-injection/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'XPath Injection' }
	];

	// Real external data sources
	const owaspData = {
		ranking: '#3',
		category: 'A03:2021 - Injection',
		source: 'https://owasp.org/Top10/A03_2021-Injection/',
		cweId: 'CWE-643',
		cweSource: 'https://cwe.mitre.org/data/definitions/643.html'
	};

	// FAQ data for schema
	const faqs = [
		{
			question: 'What is XPath and why should vibe coders care?',
			answer: 'XPath is a query language for XML documents, similar to how SQL queries databases. If your app uses XML for configuration, data storage, SOAP APIs, or legacy integrations, you probably use XPath under the hood. AI tools often generate XPath queries when working with XML, and those queries are frequently vulnerable to injection.'
		},
		{
			question: 'Is XPath injection as dangerous as SQL injection?',
			answer: 'The attack principle is identical: user input gets concatenated into a query string. The damage depends on what your XML stores. If it contains user credentials, API keys, or sensitive config data, XPath injection can expose all of it. Authentication bypasses through XPath are well-documented and straightforward to execute.'
		},
		{
			question: 'Do modern frameworks protect against XPath injection?',
			answer: 'Most modern frameworks have no built-in XPath protection because XML parsing is considered a lower-level operation. Libraries like lxml, xml.etree, and javax.xml provide the tools but not the guardrails. Parameterized XPath exists in some libraries but AI tools rarely generate it correctly.'
		},
		{
			question: 'Why do AI coding tools generate vulnerable XPath?',
			answer: 'AI models learn from public code, and most XPath examples online use string concatenation because it looks cleaner. The training data is full of tutorials showing vulnerable patterns. When you ask an AI tool for XML parsing, you get readable code that works and also opens a backdoor.'
		},
		{
			question: 'How do I check if my app uses XPath at all?',
			answer: 'Search your codebase for xpath, selectNodes, evaluate, XPathExpression, or document.evaluate. Check if you parse any XML files, consume SOAP services, or use XML-based configuration. Many vibe coded projects import XML libraries without the developer realizing XPath is involved.'
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
			{"@type": "ListItem", "position": 4, "name": "XPath Injection"}
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
				<span class="badge">CWE-643</span>
				<span class="badge">OWASP A03:2021</span>
			</div>
			<h1>XPath Injection in Vibe Coded Apps</h1>
			<p class="text-secondary">How attackers query your XML data like they own the place, and how to stop them</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>XPath injection happens when user input gets mixed into XML queries without protection.</strong>
				Think of it like SQL injection, but for XML documents instead of databases. Attackers can bypass authentication, extract sensitive data from config files, or read credentials stored in XML.
				AI tools generate vulnerable XPath patterns because the training data is full of them. If your vibe coded app touches XML anywhere, this matters to you.
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
				<div class="stat-value">XML</div>
				<div class="stat-label">Target Format</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">High</div>
				<div class="stat-label">Severity</div>
			</div>
		</div>
		<p class="data-source">
			Source: <a href={owaspData.source}>OWASP Top 10 (2021)</a> - Injection category includes XPath
		</p>

		<!-- What Is It - @eli5sec voice (analogies, warm, patient) -->
		<section class="article-section">
			<h2>What is XPath injection?</h2>
			<p>
				Picture a library with a very helpful librarian. You walk up and say "I need the book by Smith in the mystery section." The librarian finds it for you. That query you made? That's essentially XPath: a way to ask for specific items within a structured XML document.
			</p>
			<p>
				Now imagine a malicious visitor walks up and says: "I need the book by Smith <em>or just give me everything in the vault</em>." If the librarian isn't careful, they might hand over restricted materials that should never leave the back room. That's XPath injection. The attacker adds extra instructions to your query, and if your code blindly trusts that input, it executes whatever they asked for.
			</p>
			<p>
				According to <a href="https://cwe.mitre.org/data/definitions/643.html">CWE-643</a>, this vulnerability occurs when applications construct XPath queries from user-controllable input without proper neutralization. The <a href="https://owasp.org/Top10/A03_2021-Injection/">OWASP Top 10</a> groups it under Injection (A03:2021) alongside SQL injection because the attack principle is identical: untrusted input becomes part of a trusted query.
			</p>
		</section>

		<!-- AI Tool Patterns - @eli5sec voice -->
		<section class="article-section">
			<h2>How do AI tools cause XPath injection?</h2>
			<p>
				When you ask an AI coding tool to parse XML or find data in a config file, it reaches for XPath because that's the standard way to query XML. The problem is how it builds those queries. AI models optimize for code that works and reads cleanly. String concatenation looks clean. It also creates injection points.
			</p>

			<div class="tool-patterns-box">
				<h3>The pattern behind most XPath vulnerabilities</h3>
				<p>Ask any AI tool to find a user in an XML document. This is what appears:</p>
				<div class="code-block">
					<pre><code>{`// Cursor, Bolt, Claude Code - common pattern
function findUser(username, password) {
  const xpath = \`//users/user[name='\${username}' and pass='\${password}']\`;
  return xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
}`}</code></pre>
				</div>
				<p class="pattern-note">
					Looks like a simple user lookup. The <code>username</code> and <code>password</code> get dropped straight into the query string. An attacker can type <code>' or '1'='1</code> as the username and walk right past authentication.
				</p>
			</div>

			<p>
				The AI generates this pattern because the training data contains countless XML tutorials that do exactly this. The code works. It compiles. It returns the right user when given honest input. The AI doesn't know the difference between "working" and "secure."
			</p>

			<p>
				Cursor, Claude Code, Bolt, GitHub Copilot: they all generate string concatenation for XPath queries. Not because these tools are broken, but because that's how most public XPath code is written. The pattern is everywhere. AI just repeats what it learned.
			</p>
		</section>

		<!-- What Could Happen -->
		<section class="article-section">
			<h2>What could happen if my app has XPath injection?</h2>
			<p>
				Let's walk through this step by step, because understanding the progression helps you grasp why this matters.
			</p>
			<ul class="consequences-list">
				<li><strong>Authentication bypass:</strong> Many legacy systems store user credentials in XML files. An attacker inputs <code>' or '1'='1</code> and the XPath query returns the first user in the file. They're logged in as that user, no password needed. If the first user happens to be admin, they have full access.</li>
				<li><strong>Complete data extraction:</strong> XPath can navigate entire document trees. An attacker uses boolean-based or error-based techniques to extract the full XML contents character by character. If your XML contains API keys, database credentials, or customer records, all of it becomes visible.</li>
				<li><strong>Configuration exposure:</strong> Many vibe coded apps use XML for settings. Environment values, third-party service credentials, internal URLs: if it's in the XML, XPath injection can pull it out. Attackers love configuration files because they're roadmaps to deeper access.</li>
				<li><strong>Business logic manipulation:</strong> XML documents often control application behavior. Pricing rules, feature flags, access permissions. Manipulating XPath queries can reveal or alter how the application makes decisions.</li>
			</ul>
			<p>
				The severity depends on what your XML stores. A product catalog? Limited damage. User credentials and API keys? Critical breach territory.
			</p>
		</section>

		<!-- Detection - @eli5sec voice -->
		<section class="article-section">
			<h2>How do I detect XPath injection?</h2>
			<p>
				First question: does your app even use XPath? Many vibe coders don't realize they're using it because the AI added XML parsing behind the scenes. Let's find out.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Patterns to search for</span>
				</div>
				<pre><code>{`// JavaScript/Node.js
document.evaluate(    // Browser DOM XPath
xpath.select(         // xpath npm package
xmlDoc.evaluate(      // XML document evaluation

// Python
tree.xpath(           // lxml library
root.findall(         // ElementTree (XPath subset)

// Java
xpath.evaluate(       // javax.xml.xpath
document.selectNodes( // DOM4J

// Common vulnerable patterns (any language)
\`//users/user[name='\${username}'\`
"//config/setting[@name='" + settingName
'/items/item[id="' + itemId + '"]'

// Regex to find string concatenation in XPath:
// \\.(xpath|evaluate|selectNodes)\\s*\\([^)]*['"]\s*\\+
// \\.(xpath|evaluate)\\s*\\(\\s*\`[^}]*\\$\\{`}</code></pre>
			</div>

			<p>
				Found matches? Each one needs examination. The question to ask: does user input ever reach that query string? Trace the data flow backwards. If a form field, URL parameter, or API request body can influence that XPath string, you have a vulnerability.
			</p>

			<div class="cta-box">
				<p><strong>Need automated detection?</strong></p>
				<a href="https://scanner.vibeship.co" class="btn btn-green">
					Scan your code free
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M5 12h14M12 5l7 7-7 7"/>
					</svg>
				</a>
			</div>
		</section>

		<!-- How to Fix - @eli5sec voice -->
		<section class="article-section">
			<h2>How do I fix XPath injection?</h2>
			<p>
				The fix follows the same principle as SQL injection: never let user input become part of the query structure. You have a few approaches, and the best one depends on your language and library.
			</p>

			<!-- AI Fix Prompt -->
			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>Copy this into Cursor, Claude Code, or Bolt. It guides the AI to find and fix XPath vulnerabilities systematically:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Fix all XPath injection vulnerabilities in my codebase.

## What to look for

Search for these dangerous patterns:

1. Template literals in XPath queries:
   - \`//users/user[name='\${username}']\`
   - \`//config[@key='\${key}']\`

2. String concatenation in XPath:
   - "//items/item[id='" + itemId + "']"
   - '//data/entry[@name="' + name + '"]'

3. XPath query methods with dynamic strings:
   - document.evaluate(dynamicXPath, ...)
   - tree.xpath(f"//user[name='{name}']")
   - xpath.select(query + userInput)

## How to fix

### Option 1: Parameterized XPath (preferred when available)

Some libraries support variable binding:

\`\`\`python
# Python lxml - use variables
from lxml import etree
tree.xpath("//user[@name=$name]", name=username)
\`\`\`

\`\`\`java
// Java - use XPathVariableResolver
xpath.setXPathVariableResolver(new MapVariableResolver(Map.of("user", username)));
xpath.evaluate("//user[@name=$user]", doc);
\`\`\`

### Option 2: Strict input validation

If parameterization isn't available, validate inputs strictly:

\`\`\`javascript
// Whitelist allowed characters (alphanumeric only)
function sanitizeForXPath(input) {
  if (!/^[a-zA-Z0-9_-]+$/.test(input)) {
    throw new Error('Invalid characters in input');
  }
  return input;
}

const xpath = \`//users/user[name='\${sanitizeForXPath(username)}']\`;
\`\`\`

### Option 3: Escape special XPath characters

\`\`\`javascript
function escapeXPathString(str) {
  if (str.includes("'") && str.includes('"')) {
    // Use concat() for strings with both quote types
    return "concat('" + str.replace(/'/g, "',\"'\",'" ) + "')";
  }
  if (str.includes("'")) {
    return '"' + str + '"';
  }
  return "'" + str + "'";
}

// Usage
const xpath = \`//users/user[name=\${escapeXPathString(username)}]\`;
\`\`\`

## Framework-specific notes

- Node.js (xpath package): No native parameterization, use validation/escaping
- Python (lxml): Supports variables via keyword arguments
- Java (javax.xml.xpath): Use XPathVariableResolver for parameterization
- Browser DOM: No native parameterization, validate inputs strictly

## After fixing

1. Search for remaining patterns: string concatenation near xpath/evaluate calls
2. Add input validation layer before any XML query construction
3. List all files you modified with before/after snippets

Please proceed systematically through my codebase.`}</div>
				</div>
			</div>

			<!-- Manual Fix -->
			<div class="fix-section">
				<h3>Manual Fix</h3>
				<p>Let's look at the vulnerable pattern and its secure replacement side by side. Once you see the difference, you'll recognize it everywhere.</p>

				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-block-header">
							<span class="code-block-lang status-bad">VULNERABLE</span>
						</div>
						<pre><code>{`// String concatenation - DANGEROUS
function authenticateUser(username, password) {
  const xpath = \`//users/user[name='\${username}' and pass='\${password}']\`;
  const result = xmlDoc.evaluate(
    xpath,
    xmlDoc,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  );
  return result.singleNodeValue !== null;
}

// Attacker inputs: username = "' or '1'='1" password = "anything"
// XPath becomes: //users/user[name='' or '1'='1' and pass='anything']
// Result: Returns first user, authentication bypassed`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-block-header">
							<span class="code-block-lang status-good">SECURE</span>
						</div>
						<pre><code>{`// Input validation + safe construction - SECURE
function authenticateUser(username, password) {
  // Strict validation: alphanumeric only
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    throw new Error('Invalid username format');
  }

  // Find user first, then verify password in code
  const xpath = \`//users/user[name='\${username}']\`;
  const result = xmlDoc.evaluate(
    xpath,
    xmlDoc,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  );

  const user = result.singleNodeValue;
  if (!user) return false;

  // Compare password outside XPath
  const storedPass = user.querySelector('pass')?.textContent;
  return storedPass === password;
}

// Attacker inputs: username = "' or '1'='1"
// Validation throws error before XPath ever runs
// Result: Attack blocked`}</code></pre>
					</div>
				</div>

				<p>
					<strong>What changed:</strong> The secure version does two things differently. First, it validates the username against a strict pattern before using it. Second, it separates the user lookup from the password comparison. Even if an attacker found a way past the regex, comparing passwords in application code (not in the query) adds another layer of protection.
				</p>
			</div>

			<!-- Framework-Specific -->
			<div class="fix-section">
				<h3>Language-specific approaches</h3>
				<div class="framework-links">
					<a href="/kb/security/vulnerabilities/sql-injection/" class="card card-interactive">
						<span class="framework-name">SQL Injection Guide</span>
						<span class="framework-desc">Same injection principles apply</span>
					</a>
					<a href="/kb/security/vulnerabilities/nosql-injection/" class="card card-interactive">
						<span class="framework-name">NoSQL Injection</span>
						<span class="framework-desc">Related injection in MongoDB</span>
					</a>
					<a href="/kb/security/stacks/nextjs-supabase/" class="card card-interactive">
						<span class="framework-name">Next.js + Supabase</span>
						<span class="framework-desc">Modern stack security guide</span>
					</a>
					<a href="/kb/security/stacks/express/" class="card card-interactive">
						<span class="framework-name">Express Security</span>
						<span class="framework-desc">Node.js API security</span>
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
				<a href="/kb/security/vulnerabilities/sql-injection/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">SQL Injection</div>
					<p class="related-card-description">The database equivalent of XPath injection</p>
				</a>
				<a href="/kb/security/vulnerabilities/nosql-injection/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">NoSQL Injection</div>
					<p class="related-card-description">Injection attacks in MongoDB and similar</p>
				</a>
				<a href="/kb/security/vulnerabilities/ldap-injection/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">LDAP Injection</div>
					<p class="related-card-description">Injection in directory service queries</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Find injection vulnerabilities before attackers do</h2>
			<p>XPath injection hides in XML parsing code that AI tools generate without warning.</p>
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
