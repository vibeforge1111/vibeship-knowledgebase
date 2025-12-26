<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'NoSQL Injection: MongoDB & Firestore Security',
		description: 'NoSQL injection lets attackers bypass auth with query operators like $ne. Learn how to protect MongoDB and Firestore apps with validation and sanitization.',
		url: '/kb/security/vulnerabilities/nosql-injection/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'NoSQL Injection' }
	];

	// Real external data sources
	const owaspData = {
		ranking: '#3',
		category: 'A03:2021 - Injection',
		source: 'https://owasp.org/Top10/A03_2021-Injection/',
		cweId: 'CWE-943',
		cweSource: 'https://cwe.mitre.org/data/definitions/943.html'
	};

	// FAQ data for schema
	const faqs = [
		{
			question: 'What is NoSQL injection?',
			answer: 'NoSQL injection is a vulnerability where attackers manipulate NoSQL database queries by injecting operators or objects instead of expected string values. Instead of SQL syntax, attackers use JSON operators like {"$ne": ""} or {"$gt": ""} to bypass authentication or extract data. It exploits the same fundamental weakness as SQL injection: trusting user input in database queries.'
		},
		{
			question: 'Is MongoDB vulnerable to injection?',
			answer: 'Yes. MongoDB is vulnerable when queries accept user input without type validation. The most common attack uses operator injection, where attackers send {"$ne": ""} instead of a string password, matching any non-empty value. MongoDB\'s $where clause is also dangerous because it executes JavaScript. The fix is always validating that user input is the expected type before using it in queries.'
		},
		{
			question: 'How do I prevent NoSQL injection?',
			answer: 'Prevent NoSQL injection by validating input types before queries. Use schema validation libraries like Zod to ensure user input is a string, not an object. Use query sanitization libraries like mongo-sanitize to strip dangerous operators. Never use $where with user input. For Firestore, validate document IDs match expected patterns before using them in paths.'
		},
		{
			question: 'What is the difference between SQL and NoSQL injection?',
			answer: 'SQL injection exploits SQL syntax by injecting commands like OR 1=1 into queries. NoSQL injection exploits JSON operators and query syntax specific to each database. In MongoDB, attackers inject objects like {"$ne": ""} instead of strings. The concept is identical, trusting user input in queries, but the attack syntax differs. Both are prevented by parameterization and input validation.'
		},
		{
			question: 'Can Firestore be injected?',
			answer: 'Firestore has different injection risks than MongoDB. The main threat is path traversal, where attackers manipulate document IDs to access other collections. If you use db.collection("users").doc(userId).get() without validating userId, an attacker could input "../secrets/apikeys" to traverse paths. Always validate document IDs match expected patterns like alphanumeric characters only.'
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
			{"@type": "ListItem", "position": 4, "name": "NoSQL Injection"}
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
		"datePublished": "2025-12-18",
		"dateModified": "2025-12-18"
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
				<span class="badge badge-critical">High</span>
				<span class="badge">CWE-943</span>
				<span class="badge">OWASP A03:2021</span>
			</div>
			<h1>NoSQL Injection in Vibe Coded Apps</h1>
			<p class="text-secondary">How to find and fix operator injection in MongoDB, Firestore, and other NoSQL databases</p>
		</header>

		<!-- Quick Answer - MUST be under 50 words -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>NoSQL injection exploits query operators in MongoDB, Firestore, and other NoSQL databases.</strong>
				Attackers pass objects like <code>{`{"$ne": ""}`}</code> instead of strings to bypass authentication.
				Ranked under <a href="https://owasp.org/Top10/A03_2021-Injection/">OWASP A03:2021 Injection</a>.
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
				<div class="stat-value">MongoDB</div>
				<div class="stat-label">Most Affected</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">High</div>
				<div class="stat-label">Severity</div>
			</div>
		</div>
		<p class="data-source">
			Source: <a href={owaspData.source}>OWASP Top 10 (2021)</a> |
			<a href="https://cwe.mitre.org/data/definitions/943.html">CWE-943</a>
		</p>

		<!-- What Is It -->
		<section class="article-section">
			<h2>What is NoSQL injection?</h2>
			<p>
				NoSQL injection is a vulnerability where attackers manipulate database queries by injecting operators or objects instead of expected string values.
				Unlike SQL injection which uses SQL syntax, NoSQL injection exploits JSON-based query operators like <code>$ne</code>, <code>$gt</code>, and <code>$where</code>.
			</p>
			<p>
				Think of it like a hotel keycard system that accepts commands instead of just room numbers. Instead of entering "Room 203," an attacker types "all rooms where room number is not nothing" and gains access to every room.
			</p>
			<p>
				According to <a href="https://owasp.org/Top10/A03_2021-Injection/">OWASP Top 10 (2021)</a>, injection attacks rank #3 in web application security risks.
				<a href="https://cwe.mitre.org/data/definitions/943.html">CWE-943</a> specifically covers improper neutralization of special elements in data query logic.
				Many vibe coders assume "NoSQL means no injection," but this is a dangerous myth. The attack vector differs from SQL injection, but the consequences are equally severe.
			</p>
		</section>

		<!-- How It Works -->
		<section class="article-section">
			<h2>How does NoSQL injection work?</h2>
			<p>
				NoSQL injection works by sending objects where strings are expected, exploiting query operators that databases interpret as commands.
				The most common attack targets authentication systems using MongoDB's comparison operators.
			</p>

			<div class="attack-example">
				<h3>MongoDB Operator Injection</h3>
				<p>The classic NoSQL injection bypasses password checks using the <code>$ne</code> (not equal) operator:</p>
				<div class="code-block">
					<pre><code>{`// Vulnerable code
const user = await db.collection('users').findOne({
  username: req.body.username,
  password: req.body.password
})

// Normal request
{ "username": "admin", "password": "secret123" }

// Attack payload
{ "username": "admin", "password": { "$ne": "" } }
// This matches any password that is not empty - bypasses auth!`}</code></pre>
				</div>
			</div>

			<div class="attack-example">
				<h3>MongoDB $where Injection</h3>
				<p>The <code>$where</code> clause executes JavaScript, enabling code injection:</p>
				<div class="code-block">
					<pre><code>{`// Vulnerable code
db.collection('users').find({
  $where: \`this.username == '\${username}'\`
})

// Attack payload
username = "'; return true; //"
// Executes: this.username == ''; return true; //'
// Returns ALL users in the database!`}</code></pre>
				</div>
			</div>

			<div class="attack-example">
				<h3>Firestore Path Injection</h3>
				<p>Firestore is vulnerable to path traversal when document IDs aren't validated:</p>
				<div class="code-block">
					<pre><code>{`// Vulnerable code
const doc = await db.collection('users').doc(userId).get()

// Normal request
userId = "user123"

// Attack payload
userId = "../secrets/apikeys"
// Could traverse to other collections depending on implementation`}</code></pre>
				</div>
			</div>
		</section>

		<!-- AI Tool Patterns -->
		<section class="article-section">
			<h2>Why do AI tools generate vulnerable NoSQL code?</h2>
			<p>
				AI tools generate vulnerable NoSQL code because their training data includes insecure patterns, and NoSQL syntax looks deceptively safe compared to SQL.
			</p>

			<div class="tool-patterns-box">
				<h3>Common AI-generated vulnerable patterns</h3>
				<p>When you ask AI tools for MongoDB authentication, they often generate code like this:</p>
				<div class="code-block">
					<pre><code>{`// Cursor, Bolt, Claude Code all generate this pattern
app.post('/login', async (req, res) => {
  const user = await db.collection('users').findOne({
    email: req.body.email,
    password: req.body.password  // No type checking!
  })
  if (user) {
    res.json({ token: generateToken(user) })
  }
})`}</code></pre>
				</div>
				<p class="pattern-note">
					This code <em>works</em> with normal requests but accepts objects like <code>{`{"$ne": ""}`}</code> in place of strings.
				</p>
			</div>

			<p>
				<strong>Why this happens:</strong>
			</p>
			<ul class="reason-list">
				<li><strong>Training data bias:</strong> AI models learn from codebases where NoSQL validation is often missing</li>
				<li><strong>No SQL keywords:</strong> Without obvious SQL syntax like SELECT or WHERE, the code looks safe</li>
				<li><strong>Working over secure:</strong> AI prioritizes code that runs without errors, not code that's secure</li>
				<li><strong>Operator injection is obscure:</strong> Less documentation exists compared to SQL injection</li>
			</ul>
		</section>

		<!-- What Could Happen -->
		<section class="article-section">
			<h2>What could happen if I have NoSQL injection?</h2>
			<p>
				NoSQL injection can result in authentication bypass, data theft, denial of service, and in some cases server compromise through JavaScript execution.
			</p>
			<ul class="consequences-list">
				<li><strong>Authentication bypass:</strong> Log in as any user without knowing their password using <code>$ne</code> operators</li>
				<li><strong>Data extraction:</strong> Use <code>$regex</code> operators to extract data character by character</li>
				<li><strong>Privilege escalation:</strong> Modify your own user document to grant admin privileges</li>
				<li><strong>Denial of service:</strong> Craft queries that consume excessive resources or crash the database</li>
				<li><strong>Server-side JavaScript execution:</strong> MongoDB's <code>$where</code> can execute arbitrary JavaScript</li>
			</ul>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How do I detect NoSQL injection?</h2>
			<p>
				Detect NoSQL injection by searching for database queries that use user input without type validation.
				Any <code>findOne()</code>, <code>find()</code>, or <code>updateOne()</code> that directly uses <code>req.body</code> or <code>req.query</code> is suspicious.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Patterns to search for</span>
				</div>
				<pre><code>{`// Direct use of req.body in queries (DANGEROUS)
.findOne({ email: req.body.email, password: req.body.password })

// No type checking before query (DANGEROUS)
const { username, password } = req.body
await collection.findOne({ username, password })

// $where with user input (DANGEROUS)
.find({ $where: \`this.field == '\${userInput}'\` })

// Regex patterns to find these:
// \\.find(One)?\\s*\\(\\s*\\{[^}]*req\\.(body|query|params)
// \\$where:\\s*[\`'"]`}</code></pre>
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
			<h2>How do I fix NoSQL injection?</h2>
			<p>
				Fix NoSQL injection by validating input types before queries.
				Ensure user input is a string (not an object), and never use <code>$where</code> with any user-influenced data.
			</p>

			<!-- AI Fix Prompt -->
			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>Copy this prompt into Cursor, Claude Code, or Bolt to automatically fix NoSQL injection in your codebase:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Fix all NoSQL injection vulnerabilities in my codebase.

## What to look for

Search for these dangerous patterns in MongoDB/Firestore code:

1. User input passed directly to queries without type validation:
   - findOne({ field: req.body.value })
   - find({ field: req.query.param })
   - updateOne({ _id: req.params.id }, { $set: req.body })

2. Use of $where with any user-influenced data:
   - $where: \`this.field == '\${userInput}'\`
   - $where: function() { return this.field == variable }

3. Unvalidated document IDs or paths:
   - db.collection('users').doc(userId) without ID validation
   - Dynamic collection names from user input

4. Missing type checking on query parameters:
   - Accepting objects where strings expected
   - No validation before database operations

## How to fix

### For MongoDB - Add type validation:
\`\`\`typescript
// Before (vulnerable)
const user = await db.collection('users').findOne({
  email: req.body.email,
  password: req.body.password
})

// After (secure) - Validate types first
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

const { email, password } = loginSchema.parse(req.body)
const user = await db.collection('users').findOne({ email, password })
\`\`\`

### For MongoDB - Use sanitization:
\`\`\`typescript
// Alternative: Use mongo-sanitize
import sanitize from 'mongo-sanitize'

const cleanEmail = sanitize(req.body.email)
const cleanPassword = sanitize(req.body.password)
const user = await db.collection('users').findOne({
  email: cleanEmail,
  password: cleanPassword
})
\`\`\`

### For Firestore - Validate document IDs:
\`\`\`typescript
// Before (vulnerable)
const doc = await db.collection('users').doc(userId).get()

// After (secure)
function isValidDocId(id: string): boolean {
  return typeof id === 'string' && /^[a-zA-Z0-9_-]+$/.test(id)
}

if (!isValidDocId(userId)) {
  throw new Error('Invalid document ID')
}
const doc = await db.collection('users').doc(userId).get()
\`\`\`

### Remove $where completely:
\`\`\`javascript
// Before (vulnerable)
db.find({ $where: \`this.name == '\${name}'\` })

// After (secure) - Use standard operators
db.find({ name: name })
\`\`\`

## Framework-specific notes

- Express: Add validation middleware before route handlers
- Next.js API routes: Validate in each route before database calls
- Mongoose: Use schema validation, but still validate input types
- Prisma with MongoDB: Use Prisma's type system, avoid raw queries

## After fixing

1. Search for remaining patterns: \\$where|findOne.*req\\.(body|query)
2. Add Zod or similar validation at API boundaries
3. List all files you modified with before/after snippets

Please proceed systematically through my codebase.`}</div>
				</div>
			</div>

			<!-- Manual Fix -->
			<div class="fix-section">
				<h3>Manual Fix</h3>
				<p>The key defense is <strong>type validation</strong>. Ensure user input is the expected type (string) before using it in queries.</p>

				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-block-header">
							<span class="code-block-lang status-bad">VULNERABLE</span>
						</div>
						<pre><code>{`// Direct use of req.body - DANGEROUS
app.post('/login', async (req, res) => {
  const user = await db.collection('users').findOne({
    username: req.body.username,
    password: req.body.password
  })
  // ...
})

// Attacker sends:
// { "username": "admin", "password": { "$ne": "" } }
// Result: Logs in as admin without knowing password`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-block-header">
							<span class="code-block-lang status-good">SECURE</span>
						</div>
						<pre><code>{`// Type validation with Zod - SAFE
import { z } from 'zod'

const loginSchema = z.object({
  username: z.string().min(1).max(50),
  password: z.string().min(8)
})

app.post('/login', async (req, res) => {
  // This throws if input isn't a string
  const { username, password } = loginSchema.parse(req.body)

  const user = await db.collection('users').findOne({
    username,
    password
  })
  // ...
})

// Attacker sends { "$ne": "" } for password
// Result: Zod throws "Expected string, received object"`}</code></pre>
					</div>
				</div>

				<p>
					<strong>What changed:</strong> Zod validation ensures <code>password</code> must be a string.
					When an attacker sends an object like <code>{`{"$ne": ""}`}</code>, Zod rejects it before it reaches the database query.
					The malicious operator never gets a chance to execute.
				</p>
			</div>

			<!-- Prevention Methods -->
			<div class="fix-section">
				<h3>Prevention methods by priority</h3>
				<div class="prevention-grid">
					<div class="prevention-card">
						<div class="prevention-priority">1</div>
						<h4>Schema Validation (Zod)</h4>
						<p>Validate all input at API boundaries. Zod rejects objects where strings are expected.</p>
						<div class="code-block mini">
							<pre><code>{`const schema = z.object({
  email: z.string().email(),
  password: z.string()
})`}</code></pre>
						</div>
					</div>
					<div class="prevention-card">
						<div class="prevention-priority">2</div>
						<h4>Input Sanitization</h4>
						<p>Strip MongoDB operators from user input using mongo-sanitize or similar.</p>
						<div class="code-block mini">
							<pre><code>{`import sanitize from 'mongo-sanitize'
const clean = sanitize(req.body.email)`}</code></pre>
						</div>
					</div>
					<div class="prevention-card">
						<div class="prevention-priority">3</div>
						<h4>Avoid $where</h4>
						<p>Never use $where with user input. Use standard query operators instead.</p>
						<div class="code-block mini">
							<pre><code>{`// Use this instead of $where
db.find({ name: { $eq: name } })`}</code></pre>
						</div>
					</div>
					<div class="prevention-card">
						<div class="prevention-priority">4</div>
						<h4>Path Validation</h4>
						<p>For Firestore/document DBs, validate document IDs match expected patterns.</p>
						<div class="code-block mini">
							<pre><code>{`const isValid = /^[a-zA-Z0-9_-]+$/.test(id)`}</code></pre>
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
				<a href="/kb/security/vulnerabilities/sql-injection/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">SQL Injection</div>
					<p class="related-card-description">The classic database injection attack and how to prevent it</p>
				</a>
				<a href="/kb/vibe-coding-tools/cursor/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Cursor Security Patterns</div>
					<p class="related-card-description">Common vulnerabilities in Cursor-generated code</p>
				</a>
				<a href="/kb/vibe-coding-tools/bolt/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Bolt Security Patterns</div>
					<p class="related-card-description">Security issues in Bolt-generated projects</p>
				</a>
				<a href="/kb/security/stacks/nextjs-supabase/" class="card card-interactive related-card">
					<div class="related-card-category">Stack Guide</div>
					<div class="related-card-title">Next.js + Supabase Security</div>
					<p class="related-card-description">Complete security checklist for this stack</p>
				</a>
				<a href="/kb/vibe-coding/secure-vibe-coding-guide/" class="card card-interactive related-card">
					<div class="related-card-category">Guide</div>
					<div class="related-card-title">Secure Vibe Coding Guide</div>
					<p class="related-card-description">Comprehensive security for AI-assisted development</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Scan your code for NoSQL injection</h2>
			<p>Check your MongoDB and Firestore code for injection vulnerabilities and other security issues.</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">
				Try Vibeship Scanner
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

	/* Attack Examples */
	.attack-example {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.attack-example h3 {
		margin: 0 0 0.75rem;
		font-size: 1rem;
		color: var(--text-primary);
	}

	.attack-example > p {
		margin: 0 0 1rem;
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

	/* Reason List */
	.reason-list {
		list-style: none;
		padding: 0;
		margin: 1rem 0 0;
	}

	.reason-list li {
		padding: 0.5rem 0;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.reason-list strong {
		color: var(--text-primary);
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

	/* Prevention Grid */
	.prevention-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		margin-top: 1rem;
	}

	.prevention-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.25rem;
		position: relative;
	}

	.prevention-priority {
		position: absolute;
		top: -0.5rem;
		left: -0.5rem;
		width: 1.5rem;
		height: 1.5rem;
		background: var(--purple);
		color: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.75rem;
		font-weight: 600;
	}

	.prevention-card h4 {
		margin: 0 0 0.5rem;
		font-size: 0.9375rem;
		color: var(--text-primary);
	}

	.prevention-card p {
		margin: 0 0 0.75rem;
		font-size: 0.8125rem;
		color: var(--text-secondary);
		line-height: 1.5;
	}

	.code-block.mini {
		margin: 0;
	}

	.code-block.mini pre {
		padding: 0.75rem;
		font-size: 0.75rem;
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
		.prevention-grid {
			grid-template-columns: 1fr;
		}

		.faq-item h3 {
			font-size: 1rem;
		}
	}
</style>
