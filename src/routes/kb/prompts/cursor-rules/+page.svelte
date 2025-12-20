<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Cursor Rules: Complete .cursorrules Guide 2025',
		description: 'Learn how to create Cursor rules with our complete guide. Get copy-paste .cursorrules examples including security rules to prevent vulnerabilities.',
		url: '/kb/prompts/cursor-rules/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Prompts', href: '/kb/prompts' },
		{ label: 'Cursor Rules' }
	];

	// FAQ data
	const faqs = [
		{
			question: 'What is a .cursorrules file?',
			answer: 'A .cursorrules file is a project-specific configuration file that tells Cursor AI how to write code for your project. It contains instructions about your tech stack, coding conventions, and security requirements. Cursor reads these rules before generating code, making output more consistent and secure.'
		},
		{
			question: 'Where do I put my cursor rules?',
			answer: 'You have two options: create a .cursorrules file in your project root (legacy but still works), or use the newer .cursor/rules/ folder with separate .md files for different rule sets. The folder approach lets you organize rules by category (security.md, typescript.md, etc.) and supports frontmatter for activation modes.'
		},
		{
			question: 'What should I include in cursor rules?',
			answer: 'Include: your tech stack (Next.js, TypeScript, etc.), code style preferences, security rules (parameterized queries, auth checks), framework conventions, and project-specific patterns. The most important are security rules that prevent vulnerabilities AI tools commonly generate.'
		},
		{
			question: 'Do cursor rules work with all models?',
			answer: 'Yes. Cursor rules work regardless of which underlying model you use (Claude, GPT-4, etc.). The rules are injected into the system context before your prompts, so all models receive the same instructions. Different models may follow rules with varying precision, but all respect the configuration.'
		},
		{
			question: 'How long should cursor rules be?',
			answer: 'Keep rules under 500 lines total. Shorter, focused rules work better than long documents. Split into multiple files in .cursor/rules/ if you have many rules. Each rule should be specific and actionable - "use parameterized queries" is better than "write secure code".'
		},
		{
			question: 'What is the difference between .cursorrules and system prompts?',
			answer: '.cursorrules are project-specific and live in your codebase (version controlled, shared with team). System prompts are user-level and apply globally. Use .cursorrules for project conventions and security rules; use system prompts for personal preferences like response format.'
		},
		{
			question: 'Can cursor rules prevent security issues?',
			answer: 'Yes, but they reduce rather than eliminate risk. Rules like "always use parameterized queries" and "check authentication on every route" guide Cursor toward secure patterns. However, always review generated code - rules are guidance, not guarantees. Combine with scanning tools for defense in depth.'
		}
	];

	// Stack-specific rule examples
	const stackExamples = [
		{
			name: 'Next.js + TypeScript',
			description: 'App Router with Server Components',
			rules: `# Next.js + TypeScript Project

## Tech Stack
- Next.js 14 with App Router
- TypeScript in strict mode
- Tailwind CSS for styling
- Supabase for backend

## Code Patterns
- Use Server Components by default
- Client Components only when needed (interactivity, hooks)
- Use Server Actions for mutations
- Prefer named exports over default exports

## Security Rules
- NEVER use template literals for database queries
- ALWAYS validate input with Zod on server
- Check authentication in every Server Action
- Use parameterized queries: \`$1, $2\` not \`\${var}\`
- Never expose server secrets in client code

## File Organization
- \`/app\` - Routes and layouts
- \`/components\` - Reusable UI components
- \`/lib\` - Utilities and helpers
- \`/types\` - TypeScript interfaces`
		},
		{
			name: 'React + Supabase',
			description: 'Vite-based SPA with Supabase backend',
			rules: `# React + Supabase Project

## Tech Stack
- React 18 with Vite
- TypeScript strict mode
- Supabase for auth and database
- React Query for data fetching

## Auth Patterns
- Use Supabase auth helpers
- Check session in protected routes
- Handle auth state with context
- Refresh tokens automatically

## Database Security
- Enable RLS on ALL tables
- Use auth.uid() in RLS policies
- Never expose service_role key
- Validate all inputs before queries

## Code Style
- Functional components only
- Custom hooks for reusable logic
- Collocate related files
- Use TypeScript interfaces for props`
		},
		{
			name: 'Python + FastAPI',
			description: 'Modern Python API with type hints',
			rules: `# Python + FastAPI Project

## Tech Stack
- Python 3.11+
- FastAPI for API framework
- SQLAlchemy with async support
- Pydantic for validation

## Security Rules
- Use Pydantic models for ALL input validation
- NEVER use f-strings for SQL queries
- Use SQLAlchemy ORM or parameterized queries
- Implement rate limiting on auth endpoints
- Hash passwords with bcrypt

## Code Patterns
- Type hints on all functions
- Async/await for database operations
- Dependency injection for auth
- Separate routes, services, and models

## Error Handling
- Return proper HTTP status codes
- Never expose stack traces in production
- Log errors with context, not user input`
		}
	];

	let copied = $state(false);
	let copiedSection = $state('');

	function copyCode(code: string, section: string) {
		navigator.clipboard.writeText(code);
		copied = true;
		copiedSection = section;
		setTimeout(() => {
			copied = false;
			copiedSection = '';
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
			{"@type": "ListItem", "position": 2, "name": "Prompts", "item": "https://vibeship.co/kb/prompts"},
			{"@type": "ListItem", "position": 3, "name": "Cursor Rules"}
		]
	}
	</script>`}

	<!-- TechArticle Schema -->
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
				<span class="badge badge-green">Prompts Guide</span>
				<span class="badge">Cursor</span>
				<span class="badge">Configuration</span>
			</div>
			<h1>Cursor Rules: The Complete Guide to .cursorrules</h1>
			<p class="text-secondary">Configure Cursor AI to write better, more secure code for your projects</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Cursor rules are project-specific instructions that guide Cursor AI's behavior.</strong>
				Create a <code>.cursorrules</code> file in your project root (or use <code>.cursor/rules/</code>) with your tech stack, coding standards, and security rules. This guide includes copy-paste templates with security rules that prevent common vulnerabilities.
			</p>
		</div>

		<!-- What Are Cursor Rules -->
		<section>
			<h2>What are Cursor rules?</h2>
			<p>
				Cursor rules are configuration files that tell <a href="/kb/vibe-coding-tools/cursor/">Cursor AI</a> how to generate code for your specific project. Instead of explaining your tech stack and preferences in every prompt, you write them once in a rules file. Cursor reads these rules before responding, making output more consistent, secure, and aligned with your coding standards.
			</p>
			<p>
				Think of cursor rules as a persistent system prompt for your project. They're especially valuable for vibe coders because AI tools tend to generate working code without considering security. Rules like "always use parameterized queries" guide Cursor toward secure patterns from the start.
			</p>
			<p>
				The community has embraced cursor rules - the <a href="https://github.com/PatrickJS/awesome-cursorrules" target="_blank" rel="noopener">awesome-cursorrules</a> repository has over 36,000 stars with 150+ community-contributed rule sets for different frameworks and use cases.
			</p>
		</section>

		<!-- How to Create -->
		<section>
			<h2>How to create a .cursorrules file</h2>
			<p>
				Create a file named <code>.cursorrules</code> in your project root. Cursor automatically detects and applies these rules to all AI interactions in that project. Here's the basic structure:
			</p>

			<div class="file-structure">
				<div class="file-header">Project Structure</div>
				<pre><code>your-project/
├── .cursorrules          # Legacy location (still works)
├── .cursor/
│   └── rules/            # New recommended location
│       ├── core.md       # Always-on rules
│       ├── security.md   # Security patterns
│       └── testing.md    # Test conventions
├── src/
└── package.json</code></pre>
			</div>

			<p>
				The newer <code>.cursor/rules/</code> folder approach offers more flexibility: organize rules into separate files, use frontmatter for activation modes, and keep rules focused. Cursor merges all applicable rules into the context.
			</p>

			<h3>Rule file format (with frontmatter)</h3>
			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">.cursor/rules/security.md</span>
					<button class="copy-btn" onclick={() => copyCode(`---
description: "Security rules for database and auth patterns"
alwaysApply: true
globs: ["**/*.ts", "**/*.tsx", "**/*.js"]
---

# Security Rules

## Database Security
- NEVER use template literals for SQL queries
- ALWAYS use parameterized queries or ORM methods
- Validate input types before database operations

## Authentication
- Check auth on EVERY API route
- Use middleware for auth, not inline checks
- Never trust client-side auth state alone`, 'frontmatter')}>
						{copied && copiedSection === 'frontmatter' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code>{`---
description: "Security rules for database and auth patterns"
alwaysApply: true
globs: ["**/*.ts", "**/*.tsx", "**/*.js"]
---

# Security Rules

## Database Security
- NEVER use template literals for SQL queries
- ALWAYS use parameterized queries or ORM methods
- Validate input types before database operations

## Authentication
- Check auth on EVERY API route
- Use middleware for auth, not inline checks
- Never trust client-side auth state alone`}</code></pre>
			</div>
		</section>

		<!-- Rule Types -->
		<section>
			<h2>Cursor rules activation modes</h2>
			<p>
				Rules can be applied in different ways depending on your needs. Use frontmatter to control when rules activate:
			</p>

			<div class="mode-grid">
				<div class="card mode-card">
					<h4>Always Apply</h4>
					<code>alwaysApply: true</code>
					<p>Active in every conversation. Use for core project rules, security requirements, and tech stack definitions.</p>
				</div>
				<div class="card mode-card">
					<h4>Intelligent (AI Decides)</h4>
					<code>alwaysApply: false</code>
					<p>AI reads the description and decides if relevant. Good for specialized rules like testing or deployment.</p>
				</div>
				<div class="card mode-card">
					<h4>File-Specific</h4>
					<code>globs: ["*.ts"]</code>
					<p>Triggered when working with matching files. Use for language-specific conventions (TypeScript vs Python).</p>
				</div>
				<div class="card mode-card">
					<h4>Manual</h4>
					<code>@rule-name</code>
					<p>Activated by mentioning in chat. Good for optional workflows or specialized tasks.</p>
				</div>
			</div>

			<p>
				<strong>Rule precedence:</strong> Team Rules → Project Rules → User Rules. Higher levels override lower ones, so team-wide security rules take priority over individual preferences.
			</p>
		</section>

		<!-- Essential Categories -->
		<section>
			<h2>Essential cursor rules categories</h2>
			<p>
				Every project should include rules in these categories. Security rules are especially critical for vibe coders since AI tools often generate vulnerable patterns by default.
			</p>

			<div class="category-list">
				<div class="card category-item">
					<h4>1. Project Context</h4>
					<p>Tech stack, framework versions, key architectural decisions. Helps Cursor understand what libraries and patterns to use.</p>
				</div>
				<div class="card category-item">
					<h4>2. Code Style</h4>
					<p>Naming conventions, formatting preferences, component patterns. Keeps generated code consistent with your existing codebase.</p>
				</div>
				<div class="card category-item">
					<h4>3. Framework Rules</h4>
					<p>Next.js App Router patterns, React hooks conventions, API structure. Framework-specific best practices.</p>
				</div>
				<div class="card category-item category-highlight">
					<h4>4. Security Rules (Critical!)</h4>
					<p>Database query patterns, authentication requirements, input validation. <strong>This is where most vibe coders fall short.</strong> See our <a href="#security-rules">security rules library</a> below.</p>
				</div>
				<div class="card category-item">
					<h4>5. Response Format</h4>
					<p>How Cursor should structure responses, comment style, explanation level. Customize the AI's communication style.</p>
				</div>
			</div>
		</section>

		<!-- Security Rules Library (Key Section) -->
		<section id="security-rules" class="security-section">
			<h2>Security rules for Cursor (copy-paste ready)</h2>
			<p>
				These security rules prevent the most common vulnerabilities in vibe coded projects. Copy the entire block into your <code>.cursorrules</code> file or create a dedicated <code>.cursor/rules/security.md</code>.
			</p>

			<div class="security-rules-block">
				<div class="code-block-header">
					<span class="code-block-lang">Complete Security Rules</span>
					<button class="copy-btn" onclick={() => copyCode(`# Security Rules

## Database Security
- NEVER use template literals for SQL queries
- ALWAYS use parameterized queries or ORM methods
- Validate input types before any database operation
- Use allowlists for dynamic table/column names

Patterns:
- SECURE: db.query('SELECT * FROM users WHERE id = $1', [userId])
- SECURE: prisma.user.findUnique({ where: { id: userId } })
- VULNERABLE: db.query(\`SELECT * FROM users WHERE id = \${userId}\`)

## Authentication
- Check authentication on EVERY API route and Server Action
- Use middleware for auth checks, not inline code
- Never trust client-side auth state for server decisions
- Implement proper session validation

Pattern for protected routes:
1. Get session/token
2. Validate session exists and is valid
3. Check user permissions if needed
4. THEN process the request

## Input Validation
- Validate ALL user input on the server
- Use Zod or similar for schema validation
- Never pass raw user input to:
  - Database queries
  - File system operations
  - Shell commands
  - URL redirects
  - HTML rendering (dangerouslySetInnerHTML)

Pattern:
const schema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100)
})
const result = schema.safeParse(input)
if (!result.success) return error(400, 'Invalid input')

## Secret Handling
- NEVER hardcode API keys, passwords, or tokens
- Use environment variables: process.env.SECRET_NAME
- Never log secrets or include in error messages
- Never commit .env files (add to .gitignore)
- Use different secrets for dev/staging/prod

Pattern:
- SECURE: const apiKey = process.env.STRIPE_SECRET_KEY
- VULNERABLE: const apiKey = "sk_live_abc123..."

## Path Traversal Prevention
- Validate file paths before any file operation
- Use allowlists for permitted directories
- Sanitize user-provided filenames
- Never construct paths with user input directly

Pattern:
- SECURE: const safePath = path.join(UPLOAD_DIR, path.basename(userFile))
- VULNERABLE: const unsafePath = path.join('/uploads', userProvidedPath)

## Authorization (Beyond Auth)
- Check resource OWNERSHIP, not just authentication
- Verify user can access the specific resource requested
- Use WHERE clauses that include user ID
- Never expose internal IDs without ownership check

Pattern:
- SECURE: where: { id: resourceId, userId: session.user.id }
- VULNERABLE: where: { id: resourceId } // Missing ownership check`, 'security-full')}>
						{copied && copiedSection === 'security-full' ? 'Copied!' : 'Copy All'}
					</button>
				</div>
				<pre class="security-code"><code>{`# Security Rules

## Database Security
- NEVER use template literals for SQL queries
- ALWAYS use parameterized queries or ORM methods
- Validate input types before any database operation
- Use allowlists for dynamic table/column names

Patterns:
- SECURE: db.query('SELECT * FROM users WHERE id = $1', [userId])
- SECURE: prisma.user.findUnique({ where: { id: userId } })
- VULNERABLE: db.query(\`SELECT * FROM users WHERE id = \${userId}\`)

## Authentication
- Check authentication on EVERY API route and Server Action
- Use middleware for auth checks, not inline code
- Never trust client-side auth state for server decisions
- Implement proper session validation

Pattern for protected routes:
1. Get session/token
2. Validate session exists and is valid
3. Check user permissions if needed
4. THEN process the request

## Input Validation
- Validate ALL user input on the server
- Use Zod or similar for schema validation
- Never pass raw user input to:
  - Database queries
  - File system operations
  - Shell commands
  - URL redirects
  - HTML rendering (dangerouslySetInnerHTML)

Pattern:
const schema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100)
})
const result = schema.safeParse(input)
if (!result.success) return error(400, 'Invalid input')

## Secret Handling
- NEVER hardcode API keys, passwords, or tokens
- Use environment variables: process.env.SECRET_NAME
- Never log secrets or include in error messages
- Never commit .env files (add to .gitignore)
- Use different secrets for dev/staging/prod

Pattern:
- SECURE: const apiKey = process.env.STRIPE_SECRET_KEY
- VULNERABLE: const apiKey = "sk_live_abc123..."

## Path Traversal Prevention
- Validate file paths before any file operation
- Use allowlists for permitted directories
- Sanitize user-provided filenames
- Never construct paths with user input directly

Pattern:
- SECURE: const safePath = path.join(UPLOAD_DIR, path.basename(userFile))
- VULNERABLE: const unsafePath = path.join('/uploads', userProvidedPath)

## Authorization (Beyond Auth)
- Check resource OWNERSHIP, not just authentication
- Verify user can access the specific resource requested
- Use WHERE clauses that include user ID
- Never expose internal IDs without ownership check

Pattern:
- SECURE: where: { id: resourceId, userId: session.user.id }
- VULNERABLE: where: { id: resourceId } // Missing ownership check`}</code></pre>
			</div>

			<p class="security-note">
				These rules address the vulnerabilities we cover in our security guides: <a href="/kb/security/vulnerabilities/sql-injection/">SQL injection</a>, <a href="/kb/security/vulnerabilities/hardcoded-secrets/">hardcoded secrets</a>, <a href="/kb/security/vulnerabilities/missing-auth/">missing authentication</a>, <a href="/kb/security/vulnerabilities/idor/">IDOR</a>, and <a href="/kb/security/vulnerabilities/path-traversal/">path traversal</a>.
			</p>
		</section>

		<!-- Stack Examples -->
		<section>
			<h2>Cursor rules examples by stack</h2>
			<p>
				Complete cursor rules templates for popular vibe coding stacks. Copy the one that matches your project and customize as needed.
			</p>

			<div class="stack-examples">
				{#each stackExamples as stack, i}
					<div class="card stack-card">
						<div class="stack-header">
							<div>
								<h3>{stack.name}</h3>
								<p class="stack-desc">{stack.description}</p>
							</div>
							<button class="copy-btn" onclick={() => copyCode(stack.rules, `stack-${i}`)}>
								{copied && copiedSection === `stack-${i}` ? 'Copied!' : 'Copy'}
							</button>
						</div>
						<pre><code>{stack.rules}</code></pre>
					</div>
				{/each}
			</div>
		</section>

		<!-- Best Practices -->
		<section>
			<h2>Cursor rules best practices</h2>

			<div class="practices-grid">
				<div class="practice do">
					<h4>Do</h4>
					<ul>
						<li>Keep rules under 500 lines total</li>
						<li>Be specific with examples</li>
						<li>Include anti-patterns (what NOT to do)</li>
						<li>Update rules as project evolves</li>
						<li>Split into focused modules</li>
						<li>Use file references <code>@filename</code></li>
						<li>Version control your rules</li>
					</ul>
				</div>
				<div class="practice dont">
					<h4>Don't</h4>
					<ul>
						<li>Write novel-length rules</li>
						<li>Use vague language ("write good code")</li>
						<li>Only show happy paths</li>
						<li>Set and forget (review quarterly)</li>
						<li>Put everything in one giant file</li>
						<li>Copy-paste code instead of referencing</li>
						<li>Include sensitive information</li>
					</ul>
				</div>
			</div>
		</section>

		<!-- Cursor vs CLAUDE.md -->
		<section>
			<h2>Cursor rules vs CLAUDE.md</h2>
			<p>
				If you use both <a href="/kb/vibe-coding-tools/cursor/">Cursor</a> and <a href="/kb/vibe-coding-tools/claude-code/">Claude Code</a>, you might wonder which configuration to use. Here's the breakdown:
			</p>

			<div class="comparison-table">
				<table>
					<thead>
						<tr>
							<th>Feature</th>
							<th>.cursorrules</th>
							<th>CLAUDE.md</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Tool</td>
							<td>Cursor IDE</td>
							<td>Claude Code (CLI)</td>
						</tr>
						<tr>
							<td>Location</td>
							<td>.cursor/rules/ or root</td>
							<td>4-tier hierarchy</td>
						</tr>
						<tr>
							<td>Format</td>
							<td>Markdown + frontmatter</td>
							<td>Markdown with imports</td>
						</tr>
						<tr>
							<td>Activation</td>
							<td>4 modes (always, intelligent, glob, manual)</td>
							<td>Path-specific rules</td>
						</tr>
						<tr>
							<td>Best for</td>
							<td>IDE workflows, team rules</td>
							<td>CLI workflows, complex projects</td>
						</tr>
					</tbody>
				</table>
			</div>

			<p>
				For teams using both tools, create an <code>AGENTS.md</code> file with shared rules - it's supported by both Cursor and Claude Code as a universal fallback. See our <a href="/kb/prompts/claude-md/">CLAUDE.md guide</a> for more details.
			</p>
		</section>

		<!-- FAQ -->
		<section>
			<h2>Frequently asked questions</h2>
			{#each faqs as faq}
				<div class="faq-item">
					<h3>{faq.question}</h3>
					<p>{faq.answer}</p>
				</div>
			{/each}
		</section>

		<!-- Scanner CTA -->
		<section class="cta-box">
			<h2>Scan Your Cursor Projects for Vulnerabilities</h2>
			<p>
				Rules help prevent vulnerabilities, but they can't catch everything. <a href="https://scanner.vibeship.co">VibeShip Scanner</a> automatically detects SQL injection, XSS, hardcoded secrets, and more in your vibe coded projects.
			</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">Scan Your Code Free →</a>
		</section>

		<!-- Related Content -->
		<section class="article-section">
			<h2>Related content</h2>
			<div class="related-grid">
				<a href="/kb/vibe-coding-tools/cursor/" class="card card-interactive related-card">
					<div class="related-card-category">Tool Guide</div>
					<div class="related-card-title">Cursor Security Patterns</div>
					<p class="related-card-description">How to use Cursor safely with security-focused prompts</p>
				</a>
				<a href="/kb/prompts/claude-md/" class="card card-interactive related-card">
					<div class="related-card-category">Config Guide</div>
					<div class="related-card-title">CLAUDE.md Guide</div>
					<p class="related-card-description">Project instructions for Claude Code CLI tool</p>
				</a>
				<a href="/kb/vibe-coding/secure-vibe-coding-guide/" class="card card-interactive related-card">
					<div class="related-card-category">Pillar Guide</div>
					<div class="related-card-title">Secure Vibe Coding Guide</div>
					<p class="related-card-description">Complete guide to shipping fast without getting hacked</p>
				</a>
				<a href="/kb/security/vulnerabilities/sql-injection/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">SQL Injection</div>
					<p class="related-card-description">AI loves string concatenation in queries</p>
				</a>
				<a href="/kb/security/vulnerabilities/hardcoded-secrets/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Hardcoded Secrets</div>
					<p class="related-card-description">The most common AI code vulnerability</p>
				</a>
				<a href="/kb/security/vulnerabilities/missing-auth/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Missing Authentication</div>
					<p class="related-card-description">When AI forgets to check who's calling</p>
				</a>
			</div>
		</section>

		<!-- External Resources -->
		<section>
			<h2>External resources</h2>
			<ul class="external-links">
				<li><a href="https://cursor.com/docs/context/rules" target="_blank" rel="noopener">Cursor Official Documentation</a></li>
				<li><a href="https://github.com/PatrickJS/awesome-cursorrules" target="_blank" rel="noopener">awesome-cursorrules (36k+ stars)</a> - Community rule collection</li>
				<li><a href="https://owasp.org/Top10/" target="_blank" rel="noopener">OWASP Top 10</a> - Security vulnerability reference</li>
			</ul>
		</section>
	</article>
</div>

<style>
	/* Page Layout */
	.content-wrapper {
		max-width: 900px;
		margin: 0 auto;
		padding: 2rem;
	}

	.article-header {
		margin-bottom: 2rem;
	}

	.badge-row {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		margin-bottom: 1rem;
	}

	h1 {
		font-size: 2.5rem;
		margin-bottom: 0.5rem;
	}

	.text-secondary {
		color: var(--text-secondary);
		font-size: 1.1rem;
	}

	section {
		margin-bottom: 3rem;
	}

	h2 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--border);
	}

	h3 {
		font-size: 1.1rem;
		margin-top: 1.5rem;
		margin-bottom: 0.75rem;
	}

	h4 {
		font-size: 1rem;
		margin-bottom: 0.5rem;
	}

	p {
		line-height: 1.7;
		margin-bottom: 1rem;
	}

	a {
		color: var(--green-dim);
	}

	a:hover {
		text-decoration: underline;
	}

	code {
		font-family: 'JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', monospace;
		background: rgba(0,0,0,0.3);
		padding: 0.125rem 0.375rem;
		font-size: 0.9em;
	}

	pre {
		margin: 0;
		padding: 1rem;
		overflow-x: auto;
		font-size: 0.8rem;
		line-height: 1.5;
	}

	pre code {
		background: transparent;
		padding: 0;
	}

	/* File Structure */
	.file-structure {
		background: #0d0d0d;
		overflow: hidden;
		margin: 1rem 0;
		border: 1px solid var(--border);
	}

	.file-header {
		padding: 0.75rem 1rem;
		background: rgba(0, 196, 154, 0.1);
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--green-dim);
	}

	.file-structure pre {
		margin: 0;
		padding: 1rem;
	}

	/* Mode Grid */
	.mode-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.mode-card h4 {
		margin-top: 0;
		color: var(--green-dim);
	}

	.mode-card code {
		display: block;
		margin-bottom: 0.5rem;
		font-size: 0.75rem;
	}

	.mode-card p {
		font-size: 0.875rem;
		margin: 0;
		color: var(--text-secondary);
	}

	/* Category List */
	.category-list {
		display: grid;
		gap: 1rem;
		margin: 1rem 0;
	}

	.category-item h4 {
		margin-top: 0;
	}

	.category-item p {
		margin: 0;
		font-size: 0.9rem;
		color: var(--text-secondary);
	}

	.category-highlight {
		border-color: rgba(239, 68, 68, 0.5);
		background: rgba(239, 68, 68, 0.05);
	}

	.category-highlight h4 {
		color: #f87171;
	}

	/* Security Section */
	.security-section {
		background: var(--bg-secondary);
		padding: 2rem;
		border: 1px solid rgba(34, 197, 94, 0.3);
	}

	.security-rules-block {
		background: #0d0d0d;
		overflow: hidden;
		margin: 1rem 0;
		border: 1px solid var(--border);
	}

	.security-code {
		max-height: 500px;
		overflow-y: auto;
	}

	.security-note {
		margin-top: 1rem;
		padding: 1rem;
		background: rgba(34, 197, 94, 0.1);
		font-size: 0.9rem;
		border: 1px solid rgba(34, 197, 94, 0.2);
	}

	/* Stack Examples */
	.stack-examples {
		display: grid;
		gap: 1.5rem;
		margin: 1rem 0;
	}

	.stack-card {
		overflow: hidden;
	}

	.stack-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		padding: 1rem;
		background: rgba(255,255,255,0.02);
	}

	.stack-header h3 {
		margin: 0 0 0.25rem 0;
	}

	.stack-desc {
		margin: 0;
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.stack-card pre {
		max-height: 300px;
		overflow-y: auto;
		border-top: 1px solid var(--border);
	}

	/* Best Practices Grid */
	.practices-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
		margin: 1rem 0;
	}

	@media (max-width: 768px) {
		.practices-grid {
			grid-template-columns: 1fr;
		}
	}

	.practice {
		padding: 1.5rem;
	}

	.practice.do {
		background: rgba(34, 197, 94, 0.1);
		border: 1px solid rgba(34, 197, 94, 0.3);
	}

	.practice.do h4 {
		color: #22c55e;
		margin-top: 0;
	}

	.practice.dont {
		background: rgba(239, 68, 68, 0.1);
		border: 1px solid rgba(239, 68, 68, 0.3);
	}

	.practice.dont h4 {
		color: #ef4444;
		margin-top: 0;
	}

	.practice ul {
		margin: 0;
		padding-left: 1.25rem;
	}

	.practice li {
		margin-bottom: 0.5rem;
		font-size: 0.9rem;
	}

	/* Comparison Table */
	.comparison-table {
		overflow-x: auto;
		margin: 1rem 0;
	}

	.comparison-table table {
		width: 100%;
		border-collapse: collapse;
	}

	.comparison-table th,
	.comparison-table td {
		padding: 0.75rem 1rem;
		text-align: left;
		border: 1px solid var(--border);
	}

	.comparison-table th {
		background: var(--bg-secondary);
		font-weight: 600;
	}

	.comparison-table tr:nth-child(even) {
		background: rgba(255,255,255,0.02);
	}

	/* FAQ */
	.faq-item {
		margin-bottom: 1.5rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid var(--border);
	}

	.faq-item:last-child {
		border-bottom: none;
	}

	.faq-item h3 {
		font-size: 1.1rem;
		margin-bottom: 0.5rem;
		margin-top: 0;
	}

	.faq-item p {
		margin: 0;
		color: var(--text-secondary);
	}

	/* CTA Box */
	.cta-box {
		background: rgba(0, 196, 154, 0.05);
		border: 1px solid rgba(0, 196, 154, 0.3);
		padding: 2rem;
		text-align: center;
	}

	.cta-box h2 {
		border-bottom: none;
		padding-bottom: 0;
	}

	/* External Links */
	.external-links {
		list-style: none;
		padding: 0;
	}

	.external-links li {
		margin-bottom: 0.75rem;
	}

	.external-links a {
		color: var(--green-dim);
		text-decoration: none;
	}

	.external-links a:hover {
		text-decoration: underline;
	}
</style>
