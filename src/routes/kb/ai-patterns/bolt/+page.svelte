<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Is Bolt.new Safe? Security Risks & Fixes',
		description: 'Bolt.new generates apps fast but often includes hardcoded secrets and missing auth. Learn 5 security patterns and how to fix them before deploying.',
		url: '/kb/ai-patterns/bolt/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'AI Patterns', href: '/kb/ai-patterns' },
		{ label: 'Bolt.new' }
	];

	// Security patterns specific to Bolt.new
	const patterns = [
		{
			name: 'Hardcoded API Keys',
			severity: 'High',
			description: 'Bolt.new often embeds API keys and database connection strings directly in code. This happens because beginners don\'t know about environment variables, and Bolt optimizes for "ready to run" code that works immediately in the browser.',
			example: `// Bolt.new often generates this:
const supabase = createClient(
  'https://abc123.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiYzEyMyIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjQ0MjI2NDAwLCJleHAiOjE5NTk4MDI0MDB9.secretkey123'
);

// Database URL exposed
const db = new Client({
  connectionString: 'postgresql://user:password@host:5432/database'
});`,
			fix: `// Secure version with environment variables:
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// .env file (never commit this):
VITE_SUPABASE_URL=https://abc123.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

// Database URL from env
const db = new Client({
  connectionString: process.env.DATABASE_URL
});`,
			link: '/kb/security/vulnerabilities/hardcoded-secrets/',
			cweLink: 'https://cwe.mitre.org/data/definitions/798.html'
		},
		{
			name: 'Missing Authentication',
			severity: 'Critical',
			description: 'Bolt.new creates API endpoints and database queries without checking if a user is logged in. This happens because prompts rarely specify auth requirements, and authentication adds complexity that prevents code from running immediately.',
			example: `// Bolt.new generates functional but unprotected APIs:
export async function POST({ request }) {
  const { userId, title, content } = await request.json();

  const post = await db.posts.create({
    data: { userId, title, content }
  });

  return json({ success: true, post });
}

// Anyone can create posts for any userId`,
			fix: `// Secure version with authentication:
export async function POST({ request, locals }) {
  // Verify user is authenticated
  if (!locals.user) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { title, content } = await request.json();

  // Use authenticated user ID, not client-provided
  const post = await db.posts.create({
    data: {
      userId: locals.user.id,
      title,
      content
    }
  });

  return json({ success: true, post });
}`,
			link: '/kb/security/vulnerabilities/missing-auth/',
			cweLink: 'https://cwe.mitre.org/data/definitions/306.html'
		},
		{
			name: 'Missing Input Validation',
			severity: 'High',
			description: 'Bolt.new generates APIs that accept any input without validating types, formats, or lengths. Tutorial code and examples in training data typically skip validation to keep examples simple and focused on core functionality.',
			example: `// Bolt.new accepts input without validation:
app.post('/api/user', async (req, res) => {
  const { email, name, age, bio } = req.body;

  await db.users.create({
    data: { email, name, age, bio }
  });

  res.json({ success: true });
});

// Accepts malformed emails, 999-character names, negative ages`,
			fix: `// Secure version with Zod validation:
import { z } from 'zod';

const userSchema = z.object({
  email: z.string().email().max(255),
  name: z.string().min(1).max(100),
  age: z.number().int().min(13).max(120),
  bio: z.string().max(500).optional()
});

app.post('/api/user', async (req, res) => {
  const result = userSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: 'Invalid input',
      details: result.error.issues
    });
  }

  await db.users.create({ data: result.data });
  res.json({ success: true });
});`,
			link: '/kb/security/vulnerabilities/xss/',
			cweLink: 'https://cwe.mitre.org/data/definitions/20.html'
		},
		{
			name: 'IDOR - Insecure Direct Object References',
			severity: 'High',
			description: 'Bolt.new creates APIs that trust client-provided IDs without verifying ownership. AI models don\'t inherently understand multi-tenant security or the concept that users should only access their own data.',
			example: `// Bolt.new trusts the ID from the client:
app.get('/api/invoice/:id', async (req, res) => {
  const invoice = await db.invoices.findUnique({
    where: { id: req.params.id }
  });

  res.json(invoice);
});

// User can view ANY invoice by changing the ID in URL`,
			fix: `// Secure version with ownership check:
app.get('/api/invoice/:id', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const invoice = await db.invoices.findFirst({
    where: {
      id: req.params.id,
      userId: req.user.id  // Only return if user owns it
    }
  });

  if (!invoice) {
    return res.status(404).json({ error: 'Invoice not found' });
  }

  res.json(invoice);
});`,
			link: '/kb/security/vulnerabilities/idor/',
			cweLink: 'https://cwe.mitre.org/data/definitions/639.html'
		},
		{
			name: 'Overly Permissive CORS',
			severity: 'Medium',
			description: 'Bolt.new configures CORS to allow all origins so the frontend works immediately. This is the fastest path to a working app but exposes APIs to cross-origin attacks and CSRF vulnerabilities.',
			example: `// Bolt.new makes the API accessible from anywhere:
import cors from 'cors';

app.use(cors({
  origin: '*',
  credentials: true
}));

// Now any website can call your API and steal user data`,
			fix: `// Secure version with origin allowlist:
import cors from 'cors';

const allowedOrigins = [
  'https://yourdomain.com',
  'https://www.yourdomain.com',
  'http://localhost:5173'  // For development
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));`,
			link: '/kb/security/vulnerabilities/xss/',
			cweLink: 'https://cwe.mitre.org/data/definitions/942.html'
		}
	];

	// Tool comparison data
	const toolComparison = [
		{ tool: 'Bolt.new', securityPosture: 'Lowest by default', targetUser: 'Beginners, founders', topIssue: 'Hardcoded secrets', deploySpeed: 'Fastest (one-click)', bestFor: 'Rapid prototyping' },
		{ tool: 'v0', securityPosture: 'Low-Medium', targetUser: 'Designers, frontend devs', topIssue: 'Client-side validation', deploySpeed: 'Fast (export code)', bestFor: 'UI prototyping' },
		{ tool: 'Cursor', securityPosture: 'Medium', targetUser: 'Experienced devs', topIssue: 'Missing validation', deploySpeed: 'Medium (you deploy)', bestFor: 'Production development' },
		{ tool: 'Claude Code', securityPosture: 'Medium-High', targetUser: 'Terminal-native devs', topIssue: 'Rate limiting', deploySpeed: 'Medium (you deploy)', bestFor: 'Refactoring, backend' }
	];

	// AI Fix Prompt
	const aiFixPrompt = `Review my codebase for these security issues and fix them:

1. **Hardcoded Secrets**: Move all API keys, database URLs, and credentials to environment variables using .env files. Search for patterns like:
   - \`const supabase = createClient('https://...',\`
   - \`connectionString: 'postgresql://...\`
   - Any string containing 'key', 'secret', 'password', 'token'

2. **Missing Authentication**: Add authentication checks to all API routes that access user data. Return 401 if not authenticated.
   - Check for routes using \`async function POST\` or \`app.post\` without auth checks
   - Look for \`await db.\` queries without \`locals.user\` or \`req.user\` verification

3. **Missing Input Validation**: Add Zod validation to all API endpoints that accept user input. Validate types, formats, and constraints.
   - Install Zod: \`npm install zod\`
   - Add schemas for all request bodies

4. **IDOR Vulnerabilities**: In API routes that fetch data by ID, verify the current user owns that resource before returning it.
   - Change \`findUnique({ where: { id } })\` to \`findFirst({ where: { id, userId: user.id } })\`

5. **Overly Permissive CORS**: Replace \`origin: '*'\` with an allowlist of your actual frontend domains.

For each fix:
- Show me the vulnerable code
- Show me the secure version
- Explain what changed and why

After fixing, search for remaining patterns:
- \`origin: '*'\`
- \`createClient(..., '...')\` (hardcoded keys)
- Routes without \`if (!locals.user)\` or \`if (!req.user)\`

Please proceed systematically through my codebase.`;

	// FAQ data
	const faqs = [
		{
			question: 'Is Bolt.new safe to use?',
			answer: 'Bolt.new is safe for prototyping and learning, but code generated by Bolt requires security review before production deployment. Bolt optimizes for speed and beginners, which means it generates functional code that often lacks authentication, input validation, and secure configuration. These patterns are fixable but must be addressed before going live.'
		},
		{
			question: 'What are the security risks of Bolt.new?',
			answer: 'The main security risks are hardcoded API keys, missing authentication on APIs, lack of input validation, IDOR vulnerabilities where users can access other users\' data, and overly permissive CORS. These patterns appear because Bolt prioritizes "ready to run" code that works immediately for beginners who may not understand security concepts.'
		},
		{
			question: 'Is Bolt.new safe for production?',
			answer: 'No. Bolt.new is designed for rapid prototyping and MVP development, not production-ready applications. Code generated by Bolt typically requires significant security hardening before deployment. You should add authentication, input validation, rate limiting, and proper environment variable handling before launching.'
		},
		{
			question: 'Bolt.new vs Cursor - which is more secure?',
			answer: 'Cursor generates slightly more secure code in some areas, particularly for developers who are already familiar with security patterns. Bolt is optimized for complete beginners and speed, which means it takes more shortcuts. However, both tools require manual security review before production deployment.'
		},
		{
			question: 'Should I use Bolt.new for my startup?',
			answer: 'Yes for prototyping and MVPs to validate ideas quickly. No for production applications without security review. Bolt is excellent for vibe coders who want to ship fast with vibe coding, but you need to address the security patterns listed above before handling real user data or going public.'
		}
	];

	let copied = $state(false);
	let copiedIndex = $state(-1);
	let promptCopied = $state(false);

	function copyCode(code: string, index: number) {
		navigator.clipboard.writeText(code);
		copied = true;
		copiedIndex = index;
		setTimeout(() => {
			copied = false;
			copiedIndex = -1;
		}, 2000);
	}

	function copyPrompt() {
		navigator.clipboard.writeText(aiFixPrompt);
		promptCopied = true;
		setTimeout(() => {
			promptCopied = false;
		}, 2000);
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
			{"@type": "ListItem", "position": 2, "name": "AI Patterns", "item": "https://vibeship.co/kb/ai-patterns"},
			{"@type": "ListItem", "position": 3, "name": "Bolt.new"}
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
			"name": "Vibeship"
		},
		"publisher": {
			"@type": "Organization",
			"name": "Vibeship",
			"logo": {
				"@type": "ImageObject",
				"url": "https://vibeship.co/logo.png"
			}
		},
		"datePublished": "2025-12-17",
		"dateModified": "2025-12-17"
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
				<span class="badge">AI Tool</span>
				<span class="badge">Web App</span>
			</div>
			<h1>Bolt.new Security Patterns</h1>
			<p class="text-secondary">Common security vulnerabilities in apps generated by Bolt.new</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Bolt.new's biggest security issue is hardcoded API keys and database credentials embedded directly in vibe coded apps.</strong>
				It also generates apps without authentication (<a href="https://cwe.mitre.org/data/definitions/306.html" target="_blank" rel="noopener">CWE-306</a>), input validation, or ownership checks. Great for vibe coding prototypes, but requires security review before production.
			</p>
		</div>

		<!-- Stats Box -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">Hardcoded Keys</div>
				<div class="stat-label">Top Issue</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Speed First</div>
				<div class="stat-label">Design Philosophy</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">5</div>
				<div class="stat-label">Key Patterns</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Beginners</div>
				<div class="stat-label">Target Users</div>
			</div>
		</div>

		<!-- About Bolt.new -->
		<section class="article-section">
			<h2>About Bolt.new</h2>
			<p>
				<a href="https://bolt.new/" target="_blank" rel="noopener">Bolt.new</a> is a web-based AI app builder created by StackBlitz that went from $0 to $4M ARR within four weeks of launching with Claude, eventually reaching $20M ARR. It uses <a href="https://bolt.new/blog/we-ve-partnered-with-anthropic-to-bring-claude-sonnet-4-to-all-bolt-users" target="_blank" rel="noopener">Claude Sonnet 4.5</a> (with Opus and Haiku options) to generate full-stack applications that run entirely in the browser using <a href="https://blog.stackblitz.com/posts/introducing-webcontainers/" target="_blank" rel="noopener">WebContainers</a>, a Node.js runtime built with WebAssembly.
			</p>
			<p>
				Bolt is designed for complete beginners, vibe coders, and non-technical founders who want to ship apps fast. Its philosophy is "ready to run" - vibe code that works immediately without configuration, environment setup, or security hardening. This makes it excellent for vibe coding and rapid prototyping, but vibe coded apps typically require security hardening before production deployment. The vulnerabilities commonly generated align with several categories in the <a href="https://owasp.org/Top10/" target="_blank" rel="noopener">OWASP Top 10</a>.
			</p>
		</section>

		<!-- Security Patterns -->
		<section class="article-section">
			<h2>What security issues does Bolt.new have?</h2>
			<p>These are the most common security patterns in Bolt.new-generated apps:</p>

			{#each patterns as pattern, i}
				<div class="pattern-card">
					<div class="pattern-header">
						<h3>{pattern.name}</h3>
						<span class="badge badge-{pattern.severity.toLowerCase()}">{pattern.severity}</span>
					</div>
					<p class="pattern-description">
						{pattern.description}
						Reference: <a href={pattern.cweLink} target="_blank" rel="noopener">{pattern.cweLink.match(/(\d+)\.html/)?.[1] ? `CWE-${pattern.cweLink.match(/(\d+)\.html/)[1]}` : 'CWE'}</a>
					</p>

					<div class="code-comparison">
						<div class="code-block vulnerable">
							<div class="code-block-header">
								<span class="code-block-lang status-bad">VULNERABLE</span>
							</div>
							<pre><code>{pattern.example}</code></pre>
						</div>

						<div class="code-block secure">
							<div class="code-block-header">
								<span class="code-block-lang status-good">SECURE</span>
								<button class="copy-btn small" onclick={() => copyCode(pattern.fix, i)}>
									{copied && copiedIndex === i ? 'Copied!' : 'Copy'}
								</button>
							</div>
							<pre><code>{pattern.fix}</code></pre>
						</div>
					</div>

					<a href={pattern.link} class="pattern-link">
						Learn more about this vulnerability
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M5 12h14M12 5l7 7-7 7"/>
						</svg>
					</a>
				</div>
			{/each}
		</section>

		<!-- Why This Happens -->
		<section class="article-section">
			<h2>Why Bolt.new generates these patterns</h2>
			<p>Bolt.new generates insecure vibe code patterns because of its design philosophy and target audience:</p>
			<ul>
				<li><strong>Designed for beginners:</strong> Bolt's vibe coder users often don't know what environment variables are, how authentication works, or why input validation matters. According to research from <a href="https://www.endorlabs.com/learn/the-most-common-security-vulnerabilities-in-ai-generated-code" target="_blank" rel="noopener">Endor Labs</a>, AI-generated code commonly includes hardcoded secrets and missing security controls</li>
				<li><strong>"Ready to run" philosophy:</strong> Bolt optimizes for vibe code that works immediately in the browser without any configuration. Adding environment variables, auth middleware, or validation would prevent the app from running instantly</li>
				<li><strong>Training data patterns:</strong> AI models learn from tutorials and example code that prioritize simplicity. According to <a href="https://snyk.io/blog/ai-code-security-risks/" target="_blank" rel="noopener">Snyk's security research</a>, most tutorials skip security to keep examples focused and understandable</li>
				<li><strong>Speed over security:</strong> Bolt's value proposition is shipping MVPs in minutes. Security features add complexity and development time, which conflicts with the core vibe coding use case</li>
			</ul>
			<p>
				Research from <a href="https://www.crowdstrike.com/en-us/blog/crowdstrike-researchers-identify-hidden-vulnerabilities-ai-coded-software/" target="_blank" rel="noopener">CrowdStrike</a> found that AI-generated code frequently contains security vulnerabilities that require manual review. For vibe coders using Bolt, this means the vibe coded app might work perfectly in your browser but be completely insecure when deployed publicly.
			</p>
		</section>

		<!-- Tool Comparison -->
		<section class="article-section">
			<h2>How does Bolt.new compare to other AI tools?</h2>
			<p>Bolt.new optimizes for speed and beginner accessibility, which means it generates less secure code by default compared to tools like <a href="/kb/ai-patterns/cursor/">Cursor</a> or <a href="/kb/ai-patterns/claude-code/">Claude Code</a> that give developers more control over the generation process.</p>

			<div class="comparison-table-wrapper">
				<table class="comparison-table">
					<thead>
						<tr>
							<th>Tool</th>
							<th>Security Posture</th>
							<th>Target User</th>
							<th>Top Issue</th>
							<th>Deploy Speed</th>
							<th>Best For</th>
						</tr>
					</thead>
					<tbody>
						{#each toolComparison as row}
							<tr class:highlight={row.tool === 'Bolt.new'}>
								<td class="tool-name">{row.tool}</td>
								<td>{row.securityPosture}</td>
								<td>{row.targetUser}</td>
								<td>{row.topIssue}</td>
								<td>{row.deploySpeed}</td>
								<td>{row.bestFor}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<p class="table-note">
				<strong>Key takeaway:</strong> Bolt optimizes for speed. Cursor and Claude Code give you more control, which typically results in more secure outcomes because you're reviewing more decisions. For production vibe coded apps, expect to spend more time on security review with Bolt than with other tools.
			</p>
		</section>

		<!-- AI Fix Prompt -->
		<section class="article-section">
			<h2>AI fix prompt for Bolt.new security issues</h2>
			<p>Copy this prompt and paste it into Bolt.new, <a href="/kb/ai-patterns/cursor/">Cursor</a>, or <a href="/kb/ai-patterns/claude-code/">Claude Code</a> to automatically find and fix security vulnerabilities in your vibe coded project:</p>

			<div class="prompt-box">
				<div class="prompt-header">
					<span class="prompt-label">AI Security Fix Prompt</span>
					<button class="copy-btn" onclick={copyPrompt}>
						{promptCopied ? 'Copied!' : 'Copy prompt'}
					</button>
				</div>
				<pre class="prompt-content">{aiFixPrompt}</pre>
			</div>

			<p class="prompt-note">This prompt works with any AI coding tool. It systematically searches for the five most common vulnerabilities in Bolt-generated vibe code and provides secure alternatives.</p>
		</section>

		<!-- How to Use Bolt Securely -->
		<section class="article-section">
			<h2>How to use Bolt.new securely</h2>
			<ol class="numbered-list">
				<li>
					<strong>Use for prototyping, not production:</strong>
					<p>Bolt is excellent for validating ideas, building MVPs, and learning how apps work. Plan for a security review phase before going live with real users.</p>
				</li>
				<li>
					<strong>Move secrets to environment variables:</strong>
					<p>Before deploying, move all API keys, database URLs, and credentials to .env files. Most hosting platforms (Vercel, Netlify, Railway) provide environment variable management in their dashboards.</p>
				</li>
				<li>
					<strong>Add authentication to every API:</strong>
					<p>Use Supabase Auth, Clerk, or Auth.js to add authentication. Verify the user is logged in before allowing any database operations.</p>
				</li>
				<li>
					<strong>Add input validation with Zod:</strong>
					<p>Install Zod (<code>npm install zod</code>) and validate all user input. Define schemas that match your database columns with proper types and constraints.</p>
				</li>
				<li>
					<strong>Add ownership checks:</strong>
					<p>For any endpoint that accesses user data by ID, verify the authenticated user owns that data. Never trust IDs sent from the client.</p>
				</li>
				<li>
					<strong>Configure CORS properly:</strong>
					<p>Replace <code>origin: '*'</code> with an allowlist of your actual domains. Include localhost for development.</p>
				</li>
				<li>
					<strong>Scan before deploying:</strong>
					<p>Run <a href="https://scanner.vibeship.co">Vibeship Scanner</a> to catch hardcoded secrets, missing auth, and other vulnerabilities automatically.</p>
				</li>
			</ol>
		</section>

		<!-- CTA Box -->
		<div class="cta-box">
			<p><strong>Scan your Bolt.new apps</strong></p>
			<p class="cta-subtext">Find hardcoded secrets, missing auth, and other security issues before deployment</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green">
				Scan your code free
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M5 12h14M12 5l7 7-7 7"/>
				</svg>
			</a>
		</div>

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
				<a href="/kb/ai-patterns/cursor/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Cursor</div>
					<p class="related-card-description">Security patterns in Cursor generated code</p>
				</a>
				<a href="/kb/ai-patterns/claude-code/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Claude Code</div>
					<p class="related-card-description">Security patterns in Claude Code generated apps</p>
				</a>
				<a href="/kb/security/vulnerabilities/hardcoded-secrets/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Hardcoded Secrets</div>
					<p class="related-card-description">API keys and credentials in source code</p>
				</a>
				<a href="/kb/security/vulnerabilities/missing-auth/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Missing Authentication</div>
					<p class="related-card-description">APIs without authentication checks</p>
				</a>
				<a href="/kb/security/vulnerabilities/idor/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">IDOR</div>
					<p class="related-card-description">Insecure Direct Object References</p>
				</a>
				<a href="/kb/security/vulnerabilities/sql-injection/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">SQL Injection</div>
					<p class="related-card-description">Database query manipulation vulnerabilities</p>
				</a>
			</div>
		</section>
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

	/* Pattern Card */
	.pattern-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.pattern-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
		margin-bottom: 0.75rem;
	}

	.pattern-header h3 {
		margin: 0;
		font-size: 1.1rem;
	}

	.pattern-description {
		color: var(--text-secondary);
		margin-bottom: 1rem;
	}

	.pattern-description a {
		color: var(--green-dim);
		text-decoration: none;
	}

	.pattern-description a:hover {
		color: var(--green);
	}

	.pattern-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--green-dim);
		font-size: 0.875rem;
		text-decoration: none;
		margin-top: 1rem;
	}

	.pattern-link:hover {
		color: var(--green);
	}

	/* Code Comparison */
	.code-comparison {
		display: grid;
		gap: 1rem;
		margin: 1rem 0;
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

	.copy-btn.small {
		font-size: 0.7rem;
		padding: 0.25rem 0.5rem;
	}

	/* CTA Box */
	.cta-box {
		background: var(--bg-secondary);
		border: 1px solid var(--green-dim);
		padding: 2rem;
		text-align: center;
		margin: 2rem 0;
	}

	.cta-box p {
		margin: 0 0 0.5rem;
		color: var(--text-primary);
	}

	.cta-subtext {
		color: var(--text-secondary) !important;
		font-size: 0.9rem;
		margin-bottom: 1.5rem !important;
	}

	/* Numbered List */
	.numbered-list {
		counter-reset: step;
		list-style: none;
		padding: 0;
	}

	.numbered-list li {
		position: relative;
		padding-left: 2.5rem;
		margin-bottom: 1.5rem;
	}

	.numbered-list li::before {
		counter-increment: step;
		content: counter(step);
		position: absolute;
		left: 0;
		top: 0;
		width: 1.75rem;
		height: 1.75rem;
		background: var(--bg-tertiary);
		border: 1px solid var(--border);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.numbered-list li strong {
		display: block;
		margin-bottom: 0.25rem;
	}

	.numbered-list li p {
		margin: 0;
		color: var(--text-secondary);
		font-size: 0.9rem;
	}

	.numbered-list li code {
		background: var(--bg-tertiary);
		padding: 0.125rem 0.375rem;
		border-radius: 0.25rem;
		font-size: 0.85rem;
		font-family: 'JetBrains Mono', monospace;
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

	/* Severity badges */
	.badge-critical {
		background: var(--red);
		color: white;
	}

	.badge-high {
		background: var(--orange, #f97316);
		color: white;
	}

	.badge-medium {
		background: var(--yellow, #eab308);
		color: black;
	}

	@media (max-width: 768px) {
		.pattern-header {
			flex-direction: column;
			gap: 0.5rem;
		}
	}

	/* Comparison Table */
	.comparison-table-wrapper {
		overflow-x: auto;
		margin: 1.5rem 0;
	}

	.comparison-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.875rem;
	}

	.comparison-table th,
	.comparison-table td {
		padding: 0.75rem 1rem;
		text-align: left;
		border-bottom: 1px solid var(--border);
	}

	.comparison-table th {
		background: var(--bg-tertiary);
		font-weight: 600;
		color: var(--text-primary);
		white-space: nowrap;
	}

	.comparison-table td {
		color: var(--text-secondary);
	}

	.comparison-table tr.highlight {
		background: var(--bg-secondary);
	}

	.comparison-table tr.highlight td {
		color: var(--text-primary);
	}

	.comparison-table .tool-name {
		font-weight: 600;
		color: var(--text-primary);
	}

	.table-note {
		font-size: 0.9rem;
		color: var(--text-secondary);
		margin-top: 1rem;
	}

	/* Prompt Box */
	.prompt-box {
		background: var(--bg-tertiary);
		border: 1px solid var(--border);
		margin: 1.5rem 0;
	}

	.prompt-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem 1rem;
		background: var(--bg-secondary);
		border-bottom: 1px solid var(--border);
	}

	.prompt-label {
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--green);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.prompt-content {
		padding: 1rem;
		margin: 0;
		font-size: 0.85rem;
		line-height: 1.6;
		color: var(--text-secondary);
		white-space: pre-wrap;
		font-family: 'JetBrains Mono', monospace;
		overflow-x: auto;
	}

	.prompt-note {
		font-size: 0.875rem;
		color: var(--text-secondary);
		margin-top: 0.75rem;
	}

	@media (max-width: 768px) {
		.comparison-table {
			font-size: 0.8rem;
		}

		.comparison-table th,
		.comparison-table td {
			padding: 0.5rem 0.75rem;
		}
	}
</style>
