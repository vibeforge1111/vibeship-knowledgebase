<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'CLAUDE.md: Complete Guide for Claude Code 2025',
		description: 'CLAUDE.md complete guide for Claude Code. Learn how to configure your project with copy-paste templates including security rules. Setup instructions + examples.',
		url: '/kb/prompts/claude-md/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Prompts', href: '/kb/prompts' },
		{ label: 'CLAUDE.md' }
	];

	// Four-tier hierarchy
	const hierarchyTiers = [
		{
			tier: 1,
			name: 'Enterprise Policy',
			location: '/Library/Application Support/ClaudeCode/CLAUDE.md',
			locationWin: '%APPDATA%\\ClaudeCode\\CLAUDE.md',
			description: 'Organization-wide rules managed by IT/DevOps. Highest priority.',
			useCase: 'Company security policies, compliance requirements'
		},
		{
			tier: 2,
			name: 'Project Memory',
			location: './CLAUDE.md or ./.claude/CLAUDE.md',
			locationWin: './CLAUDE.md or ./.claude/CLAUDE.md',
			description: 'Team-shared, version controlled project configuration.',
			useCase: 'Tech stack, coding standards, project-specific rules'
		},
		{
			tier: 3,
			name: 'Project Rules',
			location: './.claude/rules/*.md',
			locationWin: './.claude/rules/*.md',
			description: 'Modular, path-specific rules for different contexts.',
			useCase: 'TypeScript rules, testing patterns, security rules'
		},
		{
			tier: 4,
			name: 'User Memory',
			location: '~/.claude/CLAUDE.md',
			locationWin: '%USERPROFILE%\\.claude\\CLAUDE.md',
			description: 'Personal preferences. Lowest priority. Local variant: ./CLAUDE.local.md (auto-gitignored)',
			useCase: 'Personal coding style, response format preferences'
		}
	];

	// FAQ data
	const faqs = [
		{
			question: 'What is CLAUDE.md?',
			answer: 'CLAUDE.md is a configuration file that customizes Claude Code behavior for your project. It contains project context, coding standards, commands, and security rules. Claude Code automatically reads it at session start and uses the instructions to guide code generation.'
		},
		{
			question: 'Where do I put CLAUDE.md?',
			answer: 'Place CLAUDE.md in your project root for project-specific rules. Claude Code supports a 4-tier hierarchy: Enterprise Policy (organization-wide), Project Memory (./CLAUDE.md), Project Rules (./.claude/rules/*.md), and User Memory (~/.claude/CLAUDE.md). Higher tiers override lower ones.'
		},
		{
			question: 'Does Claude Code automatically read CLAUDE.md?',
			answer: 'Yes. Claude Code automatically discovers and loads CLAUDE.md files using recursive discovery - it searches upward to the git root and downward into subtrees. No manual configuration needed. The file is read at session start and when you change directories.'
		},
		{
			question: 'What is the difference between CLAUDE.md and .cursorrules?',
			answer: 'CLAUDE.md is for Claude Code (Anthropic\'s CLI tool) while .cursorrules is for Cursor IDE. CLAUDE.md supports imports (@path syntax), 4-tier hierarchy, and path-specific rules via frontmatter. Both serve similar purposes - project configuration for AI tools. If using both tools, create an AGENTS.md file as a universal fallback.'
		},
		{
			question: 'How long should CLAUDE.md be?',
			answer: 'Keep CLAUDE.md focused and scannable. A good target is 200-500 lines for the main file. For larger projects, split rules into .claude/rules/*.md modules. Each rule should be specific and actionable. Claude Code handles long contexts well, but concise rules are easier to maintain.'
		},
		{
			question: 'Can I have a global CLAUDE.md?',
			answer: 'Yes. Place a CLAUDE.md file at ~/.claude/CLAUDE.md for user-wide preferences that apply to all projects. This is Tier 4 (lowest priority) and gets overridden by project-specific rules. Use it for personal coding style preferences, not project-specific requirements.'
		},
		{
			question: 'How do imports work in CLAUDE.md?',
			answer: 'Use @path/to/file.md syntax to import other markdown files into your CLAUDE.md. This keeps the main file clean while organizing rules into modules. Maximum import depth is 5 hops. Example: @.claude/rules/security.md imports your security rules.'
		}
	];

	// Stack-specific templates
	const stackTemplates = [
		{
			name: 'Next.js + Supabase',
			description: 'Full-stack with App Router and Supabase backend',
			template: `# CLAUDE.md

## Project Overview
E-commerce platform built with Next.js 14 and Supabase.

## Tech Stack
- Next.js 14 (App Router)
- TypeScript (strict mode)
- Supabase (auth + database + storage)
- Tailwind CSS
- Zod for validation

## Development Commands
- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm test\` - Run tests
- \`npm run lint\` - Run ESLint

## Architecture
- /app - Routes and layouts (App Router)
- /components - Reusable UI components
- /lib - Utilities, Supabase client, helpers
- /types - TypeScript interfaces

## Code Conventions
- Use Server Components by default
- Client Components only for interactivity
- Use Server Actions for mutations
- Prefer named exports over default

## Security Rules
@.claude/rules/security.md

## Database Patterns
- Enable RLS on ALL tables
- Use auth.uid() in RLS policies
- Never expose service_role key in client code
- Use getUser() not getSession() for auth checks`
		},
		{
			name: 'SvelteKit + Prisma',
			description: 'SvelteKit with Prisma ORM and PostgreSQL',
			template: `# CLAUDE.md

## Project Overview
SaaS application built with SvelteKit and Prisma.

## Tech Stack
- SvelteKit 2.0
- TypeScript (strict)
- Prisma ORM
- PostgreSQL
- Tailwind CSS

## Development Commands
- \`npm run dev\` - Start dev server
- \`npm run build\` - Build for production
- \`npx prisma studio\` - Database GUI
- \`npx prisma migrate dev\` - Run migrations

## Architecture
- /src/routes - SvelteKit routes
- /src/lib - Shared code, components
- /src/lib/server - Server-only code
- /prisma - Schema and migrations

## Code Conventions
- Use Svelte 5 runes ($state, $derived, $effect)
- Load data in +page.server.ts
- Mutations via form actions
- Use $lib alias for imports

## Security Rules
- NEVER use $queryRaw with template literals
- Always use Prisma's parameterized methods
- Validate input with Zod in form actions
- Check auth in every +page.server.ts load function
- Use hooks.server.ts for session management`
		},
		{
			name: 'Python + FastAPI',
			description: 'Modern Python API with async support',
			template: `# CLAUDE.md

## Project Overview
REST API built with FastAPI and SQLAlchemy.

## Tech Stack
- Python 3.11+
- FastAPI
- SQLAlchemy (async)
- Pydantic v2
- PostgreSQL

## Development Commands
- \`uvicorn main:app --reload\` - Start dev server
- \`pytest\` - Run tests
- \`alembic upgrade head\` - Run migrations
- \`ruff check .\` - Lint code

## Architecture
- /app/api - Route handlers
- /app/models - SQLAlchemy models
- /app/schemas - Pydantic schemas
- /app/services - Business logic
- /app/core - Config, security, deps

## Code Conventions
- Type hints on all functions
- Async/await for database operations
- Dependency injection for auth
- Pydantic models for all request/response

## Security Rules
- Use Pydantic for ALL input validation
- NEVER use f-strings for SQL
- Use SQLAlchemy ORM methods or text() with bindparams
- Hash passwords with bcrypt
- Rate limit auth endpoints
- Never expose stack traces in production`
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
			{"@type": "ListItem", "position": 3, "name": "CLAUDE.md"}
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
				<span class="badge badge-prompts">Prompts Guide</span>
				<span class="badge">Claude Code</span>
				<span class="badge">Configuration</span>
			</div>
			<h1>CLAUDE.md: The Complete Guide for Claude Code</h1>
			<p class="text-secondary">Configure Claude Code with project context, coding standards, and security rules</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>CLAUDE.md is a configuration file that customizes Claude Code's behavior for your project.</strong>
				Place it in your project root with tech stack info, coding standards, and security rules. Claude Code reads it automatically using a 4-tier hierarchy with support for imports (<code>@path</code>) and path-specific rules. This guide includes copy-paste templates.
			</p>
		</div>

		<!-- What Is CLAUDE.md -->
		<section>
			<h2>What is CLAUDE.md?</h2>
			<p>
				CLAUDE.md is the configuration file for <a href="/kb/vibe-coding-tools/claude-code/">Claude Code</a>, Anthropic's official CLI coding assistant. It contains project context, coding standards, development commands, and security rules that guide how Claude Code generates and modifies your code.
			</p>
			<p>
				Think of CLAUDE.md as persistent memory for your project. Instead of repeating "use TypeScript strict mode" or "always validate with Zod" in every conversation, you write it once. Claude Code reads these instructions at session start and applies them to all code generation.
			</p>
			<p>
				For vibe coders, CLAUDE.md is essential because it lets you encode security rules that prevent common vulnerabilities. Rules like "never use template literals for SQL" guide Claude Code toward secure patterns from the start - addressing issues we document across our <a href="/kb/security/vulnerabilities/sql-injection/">vulnerability guides</a>.
			</p>
		</section>

		<!-- Four-Tier Hierarchy -->
		<section>
			<h2>The four-tier memory hierarchy</h2>
			<p>
				Claude Code uses a sophisticated 4-tier system for configuration. Higher tiers override lower ones, so enterprise policies take precedence over personal preferences. Based on the <a href="https://docs.anthropic.com/en/docs/claude-code/memory" target="_blank" rel="noopener">official Claude Code documentation</a>:
			</p>

			<div class="hierarchy-grid">
				{#each hierarchyTiers as tier}
					<div class="hierarchy-card">
						<div class="tier-badge">Tier {tier.tier}</div>
						<h3>{tier.name}</h3>
						<div class="tier-location">
							<code>{tier.location}</code>
						</div>
						<p class="tier-desc">{tier.description}</p>
						<p class="tier-use"><strong>Use for:</strong> {tier.useCase}</p>
					</div>
				{/each}
			</div>

			<p>
				<strong>Recursive discovery:</strong> Claude Code searches upward to the git root and downward into subtrees to find all applicable CLAUDE.md files. You don't need to manually configure paths - just place the files and they're discovered automatically.
			</p>
		</section>

		<!-- How to Create -->
		<section>
			<h2>How to create a CLAUDE.md file</h2>
			<p>
				Create a file named <code>CLAUDE.md</code> in your project root. Claude Code automatically detects and loads it. Here's the recommended structure:
			</p>

			<div class="file-structure">
				<div class="file-header">Project Structure</div>
				<pre><code>your-project/
├── CLAUDE.md                 # Main project config (Tier 2)
├── CLAUDE.local.md           # Personal overrides (auto-gitignored)
├── .claude/
│   ├── CLAUDE.md             # Alternative location
│   └── rules/                # Modular rules (Tier 3)
│       ├── security.md       # Security patterns
│       ├── typescript.md     # TS conventions
│       └── testing.md        # Test patterns
├── src/
└── package.json</code></pre>
			</div>

			<h3>Essential sections</h3>
			<div class="code-block">
				<div class="code-header">
					<span>CLAUDE.md Template</span>
					<button class="copy-btn" onclick={() => copyCode(`# CLAUDE.md

## Project Overview
[What this project does - 2-3 sentences]

## Tech Stack
- Framework: [Next.js 14 / SvelteKit / etc.]
- Language: [TypeScript / Python / etc.]
- Database: [Supabase / Prisma / MongoDB]
- Styling: [Tailwind / CSS Modules]

## Development Commands
- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm test\` - Run tests
- \`npm run lint\` - Run linter

## Architecture
[Key patterns, folder structure, important files]

## Code Conventions
[Naming, formatting, patterns to follow]

## Security Rules
@.claude/rules/security.md

## Common Gotchas
[Things that often trip people up]`, 'template')}>
						{copied && copiedSection === 'template' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code>{`# CLAUDE.md

## Project Overview
[What this project does - 2-3 sentences]

## Tech Stack
- Framework: [Next.js 14 / SvelteKit / etc.]
- Language: [TypeScript / Python / etc.]
- Database: [Supabase / Prisma / MongoDB]
- Styling: [Tailwind / CSS Modules]

## Development Commands
- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm test\` - Run tests
- \`npm run lint\` - Run linter

## Architecture
[Key patterns, folder structure, important files]

## Code Conventions
[Naming, formatting, patterns to follow]

## Security Rules
@.claude/rules/security.md

## Common Gotchas
[Things that often trip people up]`}</code></pre>
			</div>
		</section>

		<!-- Imports and Path Rules -->
		<section>
			<h2>Imports and path-specific rules</h2>
			<p>
				CLAUDE.md supports two powerful features for organizing rules: <strong>imports</strong> and <strong>path-specific rules</strong>.
			</p>

			<h3>Imports (@path syntax)</h3>
			<p>
				Use <code>@path/to/file.md</code> to import other markdown files. This keeps your main CLAUDE.md clean while organizing rules into focused modules. Maximum import depth is 5 hops.
			</p>

			<div class="code-block">
				<div class="code-header">
					<span>Using Imports</span>
				</div>
				<pre><code>{`# CLAUDE.md

## Security Rules
@.claude/rules/security.md

## TypeScript Conventions
@.claude/rules/typescript.md

## Testing Patterns
@.claude/rules/testing.md`}</code></pre>
			</div>

			<h3>Path-specific rules (YAML frontmatter)</h3>
			<p>
				Apply rules only to specific file paths using YAML frontmatter. This is useful for language-specific conventions or different standards for different parts of your codebase.
			</p>

			<div class="code-block">
				<div class="code-header">
					<span>.claude/rules/api-routes.md</span>
				</div>
				<pre><code>{`---
paths: src/app/api/**/*.ts
---

# API Route Rules

These rules apply only to API routes.

## Authentication
- Check auth at the start of every handler
- Return 401 for unauthenticated requests
- Return 403 for unauthorized requests

## Response Format
- Always return JSON
- Include appropriate status codes
- Never expose internal error details`}</code></pre>
			</div>
		</section>

		<!-- Security Rules Library -->
		<section id="security-rules" class="security-section">
			<h2>Security rules for CLAUDE.md (copy-paste ready)</h2>
			<p>
				These security rules prevent the most common vulnerabilities in vibe coded projects. Save this as <code>.claude/rules/security.md</code> and import it in your main CLAUDE.md.
			</p>

			<div class="security-rules-block">
				<div class="code-header">
					<span>.claude/rules/security.md</span>
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
  - HTML rendering

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
- VULNERABLE: where: { id: resourceId } // Missing ownership check

## NoSQL Security (MongoDB, Firestore)
- Validate input is string, not object (prevents operator injection)
- Never pass raw req.body to queries
- Use schema validation (Zod) to reject objects like {"$ne": ""}

Pattern:
- SECURE: if (typeof input !== 'string') throw new Error('Invalid')
- VULNERABLE: db.collection('users').findOne({ username: req.body.username })`, 'security-full')}>
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
  - HTML rendering

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
- VULNERABLE: where: { id: resourceId } // Missing ownership check

## NoSQL Security (MongoDB, Firestore)
- Validate input is string, not object (prevents operator injection)
- Never pass raw req.body to queries
- Use schema validation (Zod) to reject objects like {"$ne": ""}

Pattern:
- SECURE: if (typeof input !== 'string') throw new Error('Invalid')
- VULNERABLE: db.collection('users').findOne({ username: req.body.username })`}</code></pre>
			</div>

			<p class="security-note">
				These rules address vulnerabilities covered in our security guides: <a href="/kb/security/vulnerabilities/sql-injection/">SQL injection</a>, <a href="/kb/security/vulnerabilities/hardcoded-secrets/">hardcoded secrets</a>, <a href="/kb/security/vulnerabilities/missing-auth/">missing authentication</a>, <a href="/kb/security/vulnerabilities/idor/">IDOR</a>, <a href="/kb/security/vulnerabilities/path-traversal/">path traversal</a>, and <a href="/kb/security/vulnerabilities/nosql-injection/">NoSQL injection</a>.
			</p>
		</section>

		<!-- Stack Templates -->
		<section>
			<h2>CLAUDE.md templates by stack</h2>
			<p>
				Complete CLAUDE.md templates for popular vibe coding stacks. Copy the one that matches your project and customize as needed.
			</p>

			<div class="stack-examples">
				{#each stackTemplates as stack, i}
					<div class="stack-card">
						<div class="stack-header">
							<div>
								<h3>{stack.name}</h3>
								<p class="stack-desc">{stack.description}</p>
							</div>
							<button class="copy-btn" onclick={() => copyCode(stack.template, `stack-${i}`)}>
								{copied && copiedSection === `stack-${i}` ? 'Copied!' : 'Copy'}
							</button>
						</div>
						<pre><code>{stack.template}</code></pre>
					</div>
				{/each}
			</div>
		</section>

		<!-- Best Practices -->
		<section>
			<h2>CLAUDE.md best practices</h2>
			<p>
				Based on the <a href="https://docs.anthropic.com/en/docs/claude-code/memory" target="_blank" rel="noopener">official Claude Code documentation</a>:
			</p>

			<div class="practices-grid">
				<div class="practice do">
					<h4>Do</h4>
					<ul>
						<li>Be specific ("Use 2-space indentation" not "Format properly")</li>
						<li>Use markdown structure to organize related rules</li>
						<li>Review and update as project evolves</li>
						<li>Keep rules focused on single topics</li>
						<li>Use imports to organize large rule sets</li>
						<li>Include actual code patterns (secure vs vulnerable)</li>
						<li>Version control your CLAUDE.md</li>
					</ul>
				</div>
				<div class="practice dont">
					<h4>Don't</h4>
					<ul>
						<li>Use vague instructions ("write good code")</li>
						<li>Duplicate rules across multiple files</li>
						<li>Include sensitive information (secrets, credentials)</li>
						<li>Overuse path-specific rules (keep simple)</li>
						<li>Set and forget (review quarterly)</li>
						<li>Make rules conflict with each other</li>
						<li>Put everything in one giant file</li>
					</ul>
				</div>
			</div>
		</section>

		<!-- Comparison with .cursorrules -->
		<section>
			<h2>CLAUDE.md vs .cursorrules</h2>
			<p>
				If you use both <a href="/kb/vibe-coding-tools/claude-code/">Claude Code</a> and <a href="/kb/vibe-coding-tools/cursor/">Cursor</a>, here's how their configuration systems compare:
			</p>

			<div class="comparison-table">
				<table>
					<thead>
						<tr>
							<th>Feature</th>
							<th>CLAUDE.md</th>
							<th>.cursorrules</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Tool</td>
							<td>Claude Code (CLI)</td>
							<td>Cursor IDE</td>
						</tr>
						<tr>
							<td>Hierarchy</td>
							<td>4-tier (Enterprise → Project → Rules → User)</td>
							<td>3-tier (Team → Project → User)</td>
						</tr>
						<tr>
							<td>Imports</td>
							<td>Yes (@path/to/file.md)</td>
							<td>No (file references only)</td>
						</tr>
						<tr>
							<td>Path-specific</td>
							<td>YAML frontmatter</td>
							<td>globs in frontmatter</td>
						</tr>
						<tr>
							<td>Discovery</td>
							<td>Recursive (up to git root, down into subtrees)</td>
							<td>Project root only</td>
						</tr>
						<tr>
							<td>Local override</td>
							<td>CLAUDE.local.md (auto-gitignored)</td>
							<td>User rules folder</td>
						</tr>
					</tbody>
				</table>
			</div>

			<h3>Using both tools?</h3>
			<p>
				Create an <code>AGENTS.md</code> file in your project root. It's supported by both Claude Code and Cursor as a universal fallback, plus Cline and other tools. Put your shared rules there and tool-specific rules in their respective files.
			</p>

			<div class="code-block">
				<div class="code-header">
					<span>AGENTS.md (Cross-tool compatibility)</span>
				</div>
				<pre><code>{`# AGENTS.md

## Project Context
E-commerce platform with Next.js frontend and Supabase backend.

## Coding Standards
- TypeScript strict mode
- Functional components with hooks
- Zod for all input validation

## Security Requirements
- Parameterized queries only
- Auth check on every API route
- Never hardcode secrets`}</code></pre>
			</div>

			<p>
				See our <a href="/kb/prompts/cursor-rules/">Cursor Rules guide</a> for detailed .cursorrules configuration.
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
			<h2>Scan Your Claude Code Projects for Vulnerabilities</h2>
			<p>
				CLAUDE.md rules help prevent vulnerabilities, but they can't catch everything. <a href="https://scanner.vibeship.co">VibeShip Scanner</a> automatically detects SQL injection, XSS, hardcoded secrets, and more in your vibe coded projects.
			</p>
			<a href="https://scanner.vibeship.co" class="cta-button">Scan Your Code Free →</a>
		</section>

		<!-- Related Content -->
		<section>
			<h2>Related resources</h2>
			<div class="related-grid">
				<a href="/kb/vibe-coding-tools/claude-code/" class="related-card">
					<span class="related-type">Tool Guide</span>
					<span class="related-title">Claude Code Security</span>
				</a>
				<a href="/kb/prompts/cursor-rules/" class="related-card">
					<span class="related-type">Config Guide</span>
					<span class="related-title">Cursor Rules Guide</span>
				</a>
				<a href="/kb/vibe-coding/secure-vibe-coding-guide/" class="related-card">
					<span class="related-type">Pillar Guide</span>
					<span class="related-title">Secure Vibe Coding Guide</span>
				</a>
				<a href="/kb/security/stacks/nextjs-supabase/" class="related-card">
					<span class="related-type">Stack Guide</span>
					<span class="related-title">Next.js + Supabase Security</span>
				</a>
				<a href="/kb/security/vulnerabilities/sql-injection/" class="related-card">
					<span class="related-type">Vulnerability</span>
					<span class="related-title">SQL Injection</span>
				</a>
				<a href="/kb/security/vulnerabilities/missing-auth/" class="related-card">
					<span class="related-type">Vulnerability</span>
					<span class="related-title">Missing Authentication</span>
				</a>
			</div>
		</section>

		<!-- External Resources -->
		<section>
			<h2>External resources</h2>
			<ul class="external-links">
				<li><a href="https://docs.anthropic.com/en/docs/claude-code/memory" target="_blank" rel="noopener">Claude Code Memory Documentation</a> - Official Anthropic docs</li>
				<li><a href="https://www.anthropic.com/claude-code" target="_blank" rel="noopener">Claude Code</a> - Anthropic's official CLI tool</li>
				<li><a href="https://owasp.org/Top10/" target="_blank" rel="noopener">OWASP Top 10</a> - Security vulnerability reference</li>
			</ul>
		</section>
	</article>
</div>

<style>
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

	.badge {
		display: inline-block;
		padding: 0.25rem 0.75rem;
		border-radius: 4px;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		background: var(--surface-2, #333);
		color: var(--text-secondary, #aaa);
	}

	.badge-prompts {
		background: #8b5cf6;
		color: white;
	}

	h1 {
		font-size: 2.5rem;
		margin-bottom: 0.5rem;
	}

	.text-secondary {
		color: var(--text-secondary, #888);
		font-size: 1.1rem;
	}

	.quick-answer {
		background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%);
		border: 1px solid rgba(139, 92, 246, 0.3);
		border-radius: 8px;
		padding: 1.5rem;
		margin-bottom: 2rem;
	}

	.quick-answer-label {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		color: #8b5cf6;
		margin-bottom: 0.5rem;
	}

	.quick-answer-text {
		margin: 0;
		line-height: 1.6;
	}

	section {
		margin-bottom: 3rem;
	}

	h2 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--border, #333);
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

	code {
		font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
		background: rgba(0,0,0,0.3);
		padding: 0.125rem 0.375rem;
		border-radius: 3px;
		font-size: 0.9em;
	}

	/* Hierarchy Grid */
	.hierarchy-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.hierarchy-card {
		padding: 1.25rem;
		background: var(--surface-1, #1a1a1a);
		border: 1px solid var(--border, #333);
		border-radius: 8px;
	}

	.tier-badge {
		display: inline-block;
		padding: 0.25rem 0.5rem;
		background: #8b5cf6;
		color: white;
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		border-radius: 4px;
		margin-bottom: 0.75rem;
	}

	.hierarchy-card h3 {
		margin: 0 0 0.5rem 0;
	}

	.tier-location {
		margin-bottom: 0.75rem;
	}

	.tier-location code {
		font-size: 0.75rem;
		word-break: break-all;
	}

	.tier-desc {
		font-size: 0.875rem;
		color: var(--text-secondary, #888);
		margin-bottom: 0.5rem;
	}

	.tier-use {
		font-size: 0.875rem;
		margin: 0;
	}

	/* File Structure */
	.file-structure {
		background: #0d0d0d;
		border-radius: 8px;
		overflow: hidden;
		margin: 1rem 0;
	}

	.file-header {
		padding: 0.75rem 1rem;
		background: rgba(139, 92, 246, 0.1);
		font-size: 0.875rem;
		font-weight: 600;
		color: #a78bfa;
	}

	.file-structure pre {
		margin: 0;
		padding: 1rem;
	}

	/* Code Blocks */
	.code-block {
		background: #0d0d0d;
		border-radius: 8px;
		overflow: hidden;
		margin: 1rem 0;
	}

	.code-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem 1rem;
		background: rgba(255,255,255,0.05);
		font-size: 0.875rem;
	}

	.copy-btn {
		padding: 0.375rem 0.75rem;
		background: #8b5cf6;
		color: white;
		border: none;
		border-radius: 4px;
		font-size: 0.75rem;
		font-weight: 600;
		cursor: pointer;
	}

	.copy-btn:hover {
		background: #7c3aed;
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

	/* Security Section */
	.security-section {
		background: var(--surface-1, #1a1a1a);
		border-radius: 12px;
		padding: 2rem;
		border: 1px solid rgba(34, 197, 94, 0.3);
	}

	.security-rules-block {
		background: #0d0d0d;
		border-radius: 8px;
		overflow: hidden;
		margin: 1rem 0;
	}

	.security-code {
		max-height: 500px;
		overflow-y: auto;
	}

	.security-note {
		margin-top: 1rem;
		padding: 1rem;
		background: rgba(34, 197, 94, 0.1);
		border-radius: 6px;
		font-size: 0.9rem;
	}

	/* Stack Examples */
	.stack-examples {
		display: grid;
		gap: 1.5rem;
		margin: 1rem 0;
	}

	.stack-card {
		background: var(--surface-1, #1a1a1a);
		border: 1px solid var(--border, #333);
		border-radius: 8px;
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
		color: var(--text-secondary, #888);
	}

	.stack-card pre {
		max-height: 350px;
		overflow-y: auto;
		border-top: 1px solid var(--border, #333);
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
		border-radius: 8px;
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
		border: 1px solid var(--border, #333);
	}

	.comparison-table th {
		background: var(--surface-2, #222);
		font-weight: 600;
	}

	.comparison-table tr:nth-child(even) {
		background: rgba(255,255,255,0.02);
	}

	/* FAQ */
	.faq-item {
		margin-bottom: 1.5rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid var(--border, #333);
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
		color: var(--text-secondary, #888);
	}

	/* Related Grid */
	.related-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
	}

	.related-card {
		display: block;
		padding: 1rem;
		background: var(--surface-1, #1a1a1a);
		border: 1px solid var(--border, #333);
		border-radius: 8px;
		text-decoration: none;
		transition: border-color 0.2s;
	}

	.related-card:hover {
		border-color: #8b5cf6;
	}

	.related-type {
		display: block;
		font-size: 0.75rem;
		color: var(--text-secondary, #888);
		text-transform: uppercase;
		margin-bottom: 0.25rem;
	}

	.related-title {
		display: block;
		font-weight: 600;
		color: var(--text-primary, #fff);
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
		color: #8b5cf6;
		text-decoration: none;
	}

	.external-links a:hover {
		text-decoration: underline;
	}

	a {
		color: #8b5cf6;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
