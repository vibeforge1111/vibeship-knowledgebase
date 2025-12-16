<script lang="ts">
	import { Header } from '$lib/components/layout';
	import { FixPrompt, CodeBlock, TableOfContents } from '$lib/components/content';

	const tocSections = [
		{ id: 'what-is-it', label: 'What is SQL Injection?' },
		{ id: 'why-ai-causes-it', label: 'Why AI Tools Cause It' },
		{ id: 'real-consequences', label: 'Real Consequences' },
		{ id: 'how-to-detect', label: 'How to Detect It' },
		{ id: 'how-to-fix', label: 'How to Fix It', children: [
			{ id: 'fix-nextjs', label: 'Next.js' },
			{ id: 'fix-express', label: 'Express' },
			{ id: 'fix-sveltekit', label: 'SvelteKit' }
		]},
		{ id: 'ai-fix-prompts', label: 'AI Fix Prompts' },
		{ id: 'faq', label: 'FAQ' }
	];

	const vulnerableCode = `// ❌ VULNERABLE - AI often generates this
const userId = req.query.id;
const result = await db.query(
  \`SELECT * FROM users WHERE id = '\${userId}'\`
);`;

	const secureCode = `// ✅ SECURE - Use parameterized queries
const userId = req.query.id;
const result = await db.query(
  'SELECT * FROM users WHERE id = $1',
  [userId]
);`;

	const fixPromptNextjs = `Review my Next.js API routes for SQL injection vulnerabilities.

For each database query:
1. Check if user input is concatenated directly into SQL strings
2. Replace string concatenation with parameterized queries
3. Use prepared statements with ? or $1, $2 placeholders
4. Validate and sanitize all user inputs before use

Show me the before/after for each fix.`;

	const fixPromptExpress = `Scan my Express routes for SQL injection vulnerabilities.

Fix any queries where user input (req.body, req.query, req.params) is:
- Concatenated into SQL strings using template literals
- Interpolated without proper escaping

Replace with parameterized queries using the appropriate syntax for my database driver (pg, mysql2, etc).`;
</script>

<svelte:head>
	<title>SQL Injection in AI-Generated Code | VibeShip Knowledge Base</title>
	<meta name="description" content="Learn how SQL injection vulnerabilities occur in AI-generated code, why tools like Cursor and Claude Code create them, and how to fix them with copy-paste prompts.">
</svelte:head>

<Header breadcrumbs={[
	{ label: 'Knowledge Base', href: '/kb' },
	{ label: 'Vulnerabilities', href: '/kb/vulnerabilities' },
	{ label: 'SQL Injection' }
]} />

<div class="content-wrapper">
	<article class="content-main">
		<div class="article-header">
			<div class="flex gap-2 mb-2">
				<span class="badge badge-critical">Critical</span>
				<span class="badge badge-info">CWE-89</span>
			</div>
			<h1>SQL Injection</h1>
			<div class="article-meta">
				<span class="article-meta-item">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<circle cx="12" cy="12" r="10"/>
						<polyline points="12 6 12 12 16 14"/>
					</svg>
					8 min read
				</span>
				<span class="article-meta-item">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
						<line x1="16" y1="2" x2="16" y2="6"/>
						<line x1="8" y1="2" x2="8" y2="6"/>
						<line x1="3" y1="10" x2="21" y2="10"/>
					</svg>
					Updated Dec 2024
				</span>
			</div>
		</div>

		<div class="quick-answer">
			<div class="quick-answer-label">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
					<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
				</svg>
				Quick Answer
			</div>
			<p class="quick-answer-text">
				SQL injection lets attackers run arbitrary database commands through your app. AI tools frequently generate vulnerable code by concatenating user input directly into SQL strings. <strong>Fix: Always use parameterized queries.</strong>
			</p>
		</div>

		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value critical">68%</div>
				<div class="stat-label">of AI repos affected</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">#1</div>
				<div class="stat-label">most common vulnerability</div>
			</div>
			<div class="stat-box">
				<div class="stat-value warning">Cursor</div>
				<div class="stat-label">highest occurrence</div>
			</div>
		</div>

		<section id="what-is-it" class="article-section">
			<h2>What is SQL Injection?</h2>
			<p>
				SQL injection is a code vulnerability that allows attackers to interfere with the queries your application makes to its database. It happens when user input is inserted directly into SQL statements without proper sanitization.
			</p>
			<p>
				In plain English: imagine your app has a search box. Instead of searching for "John", an attacker types <code>' OR '1'='1</code>. If your code isn't protected, this could return every user in your database — or worse.
			</p>

			<div class="alert alert-danger">
				<div class="alert-title">Why It's Critical</div>
				<p>SQL injection can lead to complete database compromise. Attackers can read, modify, or delete any data, and in some cases gain shell access to your server.</p>
			</div>
		</section>

		<section id="why-ai-causes-it" class="article-section">
			<h2>Why AI Tools Cause It</h2>
			<p>
				AI coding assistants like Cursor, Claude Code, and Bolt often generate SQL injection vulnerabilities because:
			</p>
			<ul>
				<li><strong>Training data bias</strong> — Many code examples online use string concatenation for simplicity</li>
				<li><strong>Context limitations</strong> — The AI may not realize the variable contains user input</li>
				<li><strong>"Make it work" priority</strong> — AI optimizes for functional code, not necessarily secure code</li>
				<li><strong>Legacy patterns</strong> — Older tutorials and Stack Overflow answers often show vulnerable patterns</li>
			</ul>

			<CodeBlock
				title="What AI Often Generates"
				language="javascript"
				code={vulnerableCode}
			/>

			<p>The AI sees this as "working code" because it <em>does</em> work — until someone exploits it.</p>
		</section>

		<section id="real-consequences" class="article-section">
			<h2>Real Consequences</h2>
			<p>Here's what can happen if SQL injection exists in your production app:</p>
			<ul>
				<li><strong>Data breach</strong> — All user data (emails, passwords, payment info) exposed</li>
				<li><strong>Data manipulation</strong> — Attackers modify prices, permissions, or account balances</li>
				<li><strong>Authentication bypass</strong> — Log in as any user, including admins</li>
				<li><strong>Denial of service</strong> — Drop tables, corrupt data, crash your database</li>
				<li><strong>Server compromise</strong> — In some databases, execute system commands</li>
			</ul>

			<div class="alert alert-warning">
				<div class="alert-title">Real-World Example</div>
				<p>In 2023, a vibe-coded SaaS had its entire user database (50,000 accounts) leaked due to a SQL injection vulnerability in a single API endpoint that AI had generated.</p>
			</div>
		</section>

		<section id="how-to-detect" class="article-section">
			<h2>How to Detect It</h2>
			<p>Look for these patterns in your codebase:</p>

			<h4>Red Flags</h4>
			<ul>
				<li>Template literals containing SQL with <code>${'{'}variable{'}'}</code></li>
				<li>String concatenation with <code>+</code> in SQL queries</li>
				<li><code>.query()</code> calls with dynamic strings</li>
				<li>Raw SQL without parameterized placeholders (<code>$1</code>, <code>?</code>)</li>
			</ul>

			<h4>Automated Detection</h4>
			<p>
				<a href="https://scanner.vibeship.co">VibeShip Scanner</a> automatically detects SQL injection vulnerabilities in your codebase. It understands AI-generated code patterns and catches vulnerabilities that generic scanners miss.
			</p>
		</section>

		<section id="how-to-fix" class="article-section">
			<h2>How to Fix It</h2>
			<p>
				The fix is straightforward: <strong>never concatenate user input into SQL strings</strong>. Use parameterized queries instead.
			</p>

			<CodeBlock
				title="Secure Pattern"
				language="javascript"
				code={secureCode}
			/>

			<h3 id="fix-nextjs">Next.js (with Prisma)</h3>
			<p>If you're using Prisma (common in Next.js), you're mostly protected by default:</p>
			<CodeBlock
				language="typescript"
				code={`// Prisma uses parameterized queries automatically
const user = await prisma.user.findUnique({
  where: { id: userId }
});`}
			/>

			<h3 id="fix-express">Express (with pg)</h3>
			<CodeBlock
				language="javascript"
				code={`// Use $1, $2, etc. for parameters
const result = await pool.query(
  'SELECT * FROM users WHERE email = $1 AND status = $2',
  [email, status]
);`}
			/>

			<h3 id="fix-sveltekit">SvelteKit (with Supabase)</h3>
			<CodeBlock
				language="typescript"
				code={`// Supabase client handles parameterization
const { data } = await supabase
  .from('users')
  .select('*')
  .eq('id', userId);`}
			/>
		</section>

		<section id="ai-fix-prompts" class="article-section">
			<h2>AI Fix Prompts</h2>
			<p>Copy these prompts into your AI coding tool to fix SQL injection vulnerabilities:</p>

			<FixPrompt
				label="Next.js Fix Prompt"
				prompt={fixPromptNextjs}
			/>

			<div class="mt-6">
				<FixPrompt
					label="Express Fix Prompt"
					prompt={fixPromptExpress}
				/>
			</div>
		</section>

		<section id="faq" class="article-section">
			<h2>Frequently Asked Questions</h2>

			<h4>Does Prisma protect against SQL injection?</h4>
			<p>
				Yes, Prisma uses parameterized queries by default. However, if you use <code>prisma.$queryRaw</code> with string interpolation, you can still introduce vulnerabilities. Use <code>Prisma.sql</code> template tag instead.
			</p>

			<h4>Is this only a backend problem?</h4>
			<p>
				SQL injection happens on the backend, but the vulnerability is often introduced through API endpoints that accept user input. Both frontend and backend code should be reviewed.
			</p>

			<h4>What about NoSQL databases?</h4>
			<p>
				NoSQL databases like MongoDB have their own injection vulnerabilities (NoSQL injection). The same principle applies: never trust user input, always use the database driver's parameterization features.
			</p>

			<h4>How do I test for SQL injection?</h4>
			<p>
				Try entering <code>' OR '1'='1</code> or <code>'; DROP TABLE users; --</code> in input fields. Better yet, use <a href="https://scanner.vibeship.co">automated scanning</a> to catch all instances.
			</p>
		</section>

		<div class="article-footer">
			<h3>Related Articles</h3>
			<div class="related-grid">
				<a href="/kb/vulnerabilities/hardcoded-secrets" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Hardcoded Secrets</div>
					<p class="related-card-description">API keys and passwords committed to code</p>
				</a>
				<a href="/kb/vulnerabilities/missing-auth" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Missing Authentication</div>
					<p class="related-card-description">API routes without proper auth checks</p>
				</a>
				<a href="/kb/ai-patterns/cursor" class="card card-interactive related-card">
					<div class="related-card-category">AI Pattern</div>
					<div class="related-card-title">Cursor Security Patterns</div>
					<p class="related-card-description">Common vulnerabilities in Cursor-generated code</p>
				</a>
			</div>
		</div>
	</article>

	<aside class="content-toc">
		<TableOfContents sections={tocSections} />
	</aside>
</div>
