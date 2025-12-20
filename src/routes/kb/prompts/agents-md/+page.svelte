<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'AGENTS.md: The Universal AI Configuration Standard',
		description: 'Learn how to use AGENTS.md to configure AI coding tools. Works with Cursor, Cline, Claude Code, and more. Copy-paste templates with security rules included.',
		url: '/kb/prompts/agents-md/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Prompts', href: '/kb/prompts' },
		{ label: 'AGENTS.md' }
	];

	// FAQ data
	const faqs = [
		{
			question: 'What is AGENTS.md?',
			answer: 'AGENTS.md is a universal configuration file for AI coding assistants. Place it in your project root to give AI tools context about your codebase, coding standards, and security requirements. It works as a cross-tool standard supported by Cursor, Cline, Claude Code, and other AI assistants.'
		},
		{
			question: 'Which AI tools support AGENTS.md?',
			answer: 'Cursor reads AGENTS.md from your project root. Cline auto-detects it as a fallback configuration. Claude Code supports it alongside CLAUDE.md. OpenAI Codex and other emerging tools are adopting it as a standard. It serves as a universal fallback when tool-specific configs are not present.'
		},
		{
			question: 'What is the difference between AGENTS.md and CLAUDE.md?',
			answer: 'CLAUDE.md is specific to Claude Code with features like imports and path-specific rules. AGENTS.md is a simpler, universal format that works across multiple tools. Use AGENTS.md for cross-tool compatibility, or CLAUDE.md when working primarily with Claude Code and need advanced features.'
		},
		{
			question: 'What is the difference between AGENTS.md and .cursorrules?',
			answer: 'The .cursorrules file (now .cursor/rules/) is Cursor-specific with frontmatter for activation modes. AGENTS.md is tool-agnostic and works across multiple AI assistants. If you use multiple AI tools, AGENTS.md provides consistent behavior. For Cursor-only projects, .cursor/rules/ offers more granular control.'
		},
		{
			question: 'Where should I put my AGENTS.md file?',
			answer: 'Place AGENTS.md in your project root directory (same level as package.json or pyproject.toml). AI tools scan from the current working directory upward to find it. For monorepos, you can have a root AGENTS.md plus subdirectory-specific files.'
		},
		{
			question: 'How long should AGENTS.md be?',
			answer: 'Keep AGENTS.md under 2000 words for optimal AI context usage. Focus on project-specific information the AI needs to know. Generic coding advice wastes context tokens since AI models already know standard patterns. Prioritize security rules, project conventions, and common gotchas.'
		},
		{
			question: 'Should I commit AGENTS.md to version control?',
			answer: 'Yes. AGENTS.md contains project context that benefits the whole team. Commit it alongside your code. If you have personal preferences that differ from team standards, use tool-specific user configs instead (like ~/.claude/CLAUDE.md for Claude Code).'
		}
	];

	// Template sections
	const templateSections = [
		{
			name: 'Project Context',
			description: 'Tell the AI what this project does',
			content: `## Project Context

This is [PROJECT NAME], a [TYPE] application that [MAIN PURPOSE].

**Tech Stack:**
- Framework: [Next.js 14 / SvelteKit / etc.]
- Language: [TypeScript / Python / etc.]
- Database: [Supabase / Prisma / MongoDB]
- Styling: [Tailwind / CSS Modules]

**Key Features:**
- [Feature 1]
- [Feature 2]
- [Feature 3]`
		},
		{
			name: 'Development Commands',
			description: 'Commands the AI should know about',
			content: `## Development Commands

\`\`\`bash
npm run dev      # Start development server
npm run build    # Build for production
npm run test     # Run tests
npm run lint     # Run linter
npm run db:push  # Push database schema
\`\`\``
		},
		{
			name: 'Code Conventions',
			description: 'Your team standards and patterns',
			content: `## Code Conventions

- Use functional components with hooks
- Prefer named exports over default exports
- Use TypeScript strict mode
- Write tests for business logic
- Use early returns to reduce nesting
- Prefer composition over inheritance`
		},
		{
			name: 'Security Rules',
			description: 'Critical security patterns to enforce',
			content: `## Security Rules (CRITICAL)

### Database Queries
- ALWAYS use parameterized queries or ORM
- NEVER concatenate user input into SQL
- Validate input types before queries

### Authentication
- Check auth on EVERY API route
- Use middleware for consistent enforcement
- Never trust client-side auth state alone

### Secrets
- Use environment variables for ALL secrets
- Never hardcode API keys or passwords
- Never log or expose secrets in errors

### Input Validation
- Validate ALL user input on the server
- Use Zod or similar for schema validation
- Sanitize before database or HTML output`
		},
		{
			name: 'Architecture',
			description: 'How the codebase is organized',
			content: `## Architecture

\`\`\`
src/
├── app/           # Next.js app router pages
├── components/    # Reusable UI components
├── lib/           # Utilities and helpers
├── server/        # Server-only code
│   ├── db/        # Database queries
│   └── auth/      # Authentication logic
└── types/         # TypeScript type definitions
\`\`\`

**Key Files:**
- \`src/lib/db.ts\` - Database connection
- \`src/server/auth/session.ts\` - Session management
- \`src/middleware.ts\` - Auth middleware`
		},
		{
			name: 'Common Gotchas',
			description: 'Things that trip people up',
			content: `## Common Gotchas

1. **Auth Check Order**: Always check authentication BEFORE authorization
2. **RLS Policies**: Supabase RLS is disabled by default on new tables
3. **Environment Variables**: Use NEXT_PUBLIC_ prefix for client-side env vars
4. **Type Imports**: Use \`import type\` for type-only imports
5. **Server Components**: Don't use useState/useEffect in server components`
		}
	];

	// Full template
	const fullTemplate = `# AGENTS.md

## Project Context

This is [PROJECT NAME], a [TYPE] application that [MAIN PURPOSE].

**Tech Stack:**
- Framework: [Next.js 14 / SvelteKit / etc.]
- Language: [TypeScript / Python / etc.]
- Database: [Supabase / Prisma / MongoDB]
- Styling: [Tailwind / CSS Modules]

## Development Commands

\`\`\`bash
npm run dev      # Start development server
npm run build    # Build for production
npm run test     # Run tests
npm run lint     # Run linter
\`\`\`

## Code Conventions

- Use functional components with hooks
- Prefer named exports over default exports
- Use TypeScript strict mode
- Write tests for business logic
- Use early returns to reduce nesting

## Security Rules (CRITICAL)

### Database Queries
- ALWAYS use parameterized queries or ORM
- NEVER concatenate user input into SQL
- Validate input types before queries

### Authentication
- Check auth on EVERY API route
- Use middleware for consistent enforcement
- Never trust client-side auth state alone

### Secrets
- Use environment variables for ALL secrets
- Never hardcode API keys or passwords
- Never log or expose secrets in errors

### Input Validation
- Validate ALL user input on the server
- Use Zod or similar for schema validation
- Sanitize before database or HTML output

## Architecture

\`\`\`
src/
├── app/           # Pages and routes
├── components/    # Reusable UI components
├── lib/           # Utilities and helpers
└── server/        # Server-only code
\`\`\`

## Common Gotchas

1. **RLS Policies**: Enable RLS on all Supabase tables
2. **Environment Variables**: Use NEXT_PUBLIC_ for client-side vars
3. **Type Imports**: Use \`import type\` for type-only imports`;

	// Tool compatibility
	const toolCompatibility = [
		{
			tool: 'Cursor',
			support: 'Full',
			notes: 'Reads from project root, fallback to .cursorrules',
			link: '/kb/prompts/cursor-rules/'
		},
		{
			tool: 'Cline',
			support: 'Full',
			notes: 'Auto-detects as fallback when .clinerules missing',
			link: '/kb/prompts/cline-rules/'
		},
		{
			tool: 'Claude Code',
			support: 'Supported',
			notes: 'Works alongside CLAUDE.md (CLAUDE.md takes priority)',
			link: '/kb/prompts/claude-md/'
		},
		{
			tool: 'Windsurf',
			support: 'Partial',
			notes: 'May read if .windsurf/rules/ not present',
			link: '/kb/prompts/windsurf-rules/'
		},
		{
			tool: 'GitHub Copilot',
			support: 'No',
			notes: 'Uses .github/copilot-instructions.md instead',
			link: '/kb/prompts/copilot-instructions/'
		}
	];

	// Comparison with other configs
	const configComparison = [
		{
			feature: 'Cross-tool support',
			agentsMd: 'Yes (universal)',
			claudeMd: 'Claude Code only',
			cursorrules: 'Cursor only'
		},
		{
			feature: 'Imports/includes',
			agentsMd: 'No',
			claudeMd: 'Yes (@path/to/file)',
			cursorrules: 'No'
		},
		{
			feature: 'Path-specific rules',
			agentsMd: 'No',
			claudeMd: 'Yes (frontmatter)',
			cursorrules: 'Yes (globs)'
		},
		{
			feature: 'Activation modes',
			agentsMd: 'Always on',
			claudeMd: 'Always on + path',
			cursorrules: '4 modes'
		},
		{
			feature: 'Character limit',
			agentsMd: 'None (but keep short)',
			claudeMd: 'None',
			cursorrules: 'None'
		},
		{
			feature: 'Best for',
			agentsMd: 'Multi-tool teams',
			claudeMd: 'Claude Code power users',
			cursorrules: 'Cursor-focused projects'
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
			{"@type": "ListItem", "position": 3, "name": "AGENTS.md"}
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
				<span class="badge badge-green">Universal Standard</span>
				<span class="badge">AI Config</span>
				<span class="badge">Cross-Tool</span>
			</div>
			<h1>AGENTS.md: Universal AI Configuration</h1>
			<p class="text-secondary">One config file that works with Cursor, Cline, Claude Code, and more</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>AGENTS.md is a universal configuration file for AI coding assistants.</strong>
				Place it in your project root to give AI tools context about your codebase. Unlike tool-specific configs (.cursorrules, CLAUDE.md), AGENTS.md works across multiple AI tools - making it ideal for teams using different editors or switching between tools.
			</p>
		</div>

		<!-- What is AGENTS.md -->
		<section>
			<h2>What is AGENTS.md?</h2>
			<p>
				AGENTS.md is an emerging standard for configuring AI coding assistants. Created to solve the fragmentation of tool-specific configuration files, it provides a single source of truth about your project that any AI tool can read.
			</p>
			<p>
				Think of it like a README for AI. While README.md tells human developers about your project, AGENTS.md tells AI assistants how to work with your codebase - your conventions, security requirements, architecture patterns, and common pitfalls.
			</p>
			<p>
				The format is simple Markdown with clear sections. No special syntax, no frontmatter required, no tool-specific features. This simplicity is intentional - it maximizes compatibility across different AI tools while keeping the file easy to read and maintain.
			</p>
		</section>

		<!-- Tool Compatibility -->
		<section>
			<h2>Which AI tools support AGENTS.md?</h2>
			<p>
				AGENTS.md is gaining adoption as a cross-tool standard. Here's the current support status:
			</p>

			<div class="compatibility-table">
				<table>
					<thead>
						<tr>
							<th>Tool</th>
							<th>Support</th>
							<th>Notes</th>
						</tr>
					</thead>
					<tbody>
						{#each toolCompatibility as tool}
							<tr>
								<td><a href={tool.link}>{tool.tool}</a></td>
								<td>
									<span class="support-badge" class:full={tool.support === 'Full'} class:partial={tool.support === 'Partial' || tool.support === 'Supported'} class:none={tool.support === 'No'}>
										{tool.support}
									</span>
								</td>
								<td>{tool.notes}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<p>
				For tools that don't natively support AGENTS.md, you can often reference it in their config. For example, in GitHub Copilot's instructions: "Follow the conventions in AGENTS.md in the project root."
			</p>
		</section>

		<!-- Full Template -->
		<section class="template-section">
			<h2>Complete AGENTS.md template</h2>
			<p>
				Copy this template and customize for your project. It includes the essential sections that give AI tools the context they need.
			</p>

			<div class="card template-card">
				<div class="template-header">
					<div>
						<h3>Full Template</h3>
						<p class="template-desc">Copy, customize, and place in your project root</p>
					</div>
					<button class="copy-btn" onclick={() => copyCode(fullTemplate, 'full')}>
						{copied && copiedSection === 'full' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code>{fullTemplate}</code></pre>
			</div>
		</section>

		<!-- Section Breakdown -->
		<section>
			<h2>AGENTS.md sections explained</h2>
			<p>
				Each section serves a specific purpose. Include what's relevant to your project - you don't need every section.
			</p>

			<div class="sections-grid">
				{#each templateSections as section, i}
					<div class="card section-card">
						<div class="section-header">
							<div>
								<h3>{section.name}</h3>
								<p class="section-desc">{section.description}</p>
							</div>
							<button class="copy-btn" onclick={() => copyCode(section.content, `section-${i}`)}>
								{copied && copiedSection === `section-${i}` ? 'Copied!' : 'Copy'}
							</button>
						</div>
						<pre><code>{section.content}</code></pre>
					</div>
				{/each}
			</div>
		</section>

		<!-- Comparison -->
		<section>
			<h2>AGENTS.md vs CLAUDE.md vs .cursorrules</h2>
			<p>
				Each configuration format has trade-offs. Choose based on your team's tools and needs.
			</p>

			<div class="comparison-table">
				<table>
					<thead>
						<tr>
							<th>Feature</th>
							<th>AGENTS.md</th>
							<th>CLAUDE.md</th>
							<th>.cursor/rules/</th>
						</tr>
					</thead>
					<tbody>
						{#each configComparison as row}
							<tr>
								<td>{row.feature}</td>
								<td>{row.agentsMd}</td>
								<td>{row.claudeMd}</td>
								<td>{row.cursorrules}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<p>
				<strong>Recommendation:</strong> Use AGENTS.md as your baseline for cross-tool compatibility. Add tool-specific configs (CLAUDE.md, .cursor/rules/) when you need advanced features like imports or activation modes.
			</p>
		</section>

		<!-- Security Section -->
		<section class="security-section">
			<h2>Security rules in AGENTS.md</h2>
			<p>
				The Security Rules section is the most important for vibe coders. AI tools follow these patterns when generating code, preventing vulnerabilities before they happen.
			</p>

			<div class="security-rules">
				<div class="security-rule">
					<h4>SQL Injection Prevention</h4>
					<pre><code>### Database Queries
- ALWAYS use parameterized queries or ORM
- NEVER concatenate user input into SQL strings
- Validate input types before queries

Example:
// Good: parameterized
db.query('SELECT * FROM users WHERE id = $1', [userId])

// Bad: concatenation
db.query(`SELECT * FROM users WHERE id = ${userId}`)</code></pre>
				</div>

				<div class="security-rule">
					<h4>Authentication Checks</h4>
					<pre><code>### Authentication
- Check auth on EVERY API route and server action
- Use middleware for consistent enforcement
- Never trust client-side auth state alone
- Verify permissions, not just authentication

Example:
// Every route must start with:
const session = await getSession()
if (!session) return unauthorized()</code></pre>
				</div>

				<div class="security-rule">
					<h4>Secret Management</h4>
					<pre><code>### Secrets
- Use environment variables for ALL secrets
- Never hardcode API keys, passwords, or tokens
- Never log secrets or include in error messages
- Add .env to .gitignore

Example:
// Good
const apiKey = process.env.STRIPE_SECRET_KEY

// Bad
const apiKey = "sk_live_abc123..."</code></pre>
				</div>
			</div>
		</section>

		<!-- Best Practices -->
		<section>
			<h2>AGENTS.md best practices</h2>

			<div class="practices-grid">
				<div class="practice-card do">
					<h4>Do</h4>
					<ul>
						<li>Keep it under 2000 words</li>
						<li>Focus on project-specific info</li>
						<li>Include security rules prominently</li>
						<li>Update as your project evolves</li>
						<li>Commit to version control</li>
						<li>Use clear, direct language</li>
					</ul>
				</div>
				<div class="practice-card dont">
					<h4>Don't</h4>
					<ul>
						<li>Include generic coding advice</li>
						<li>Repeat what's in README.md</li>
						<li>Add secrets or credentials</li>
						<li>Write novel-length explanations</li>
						<li>Use tool-specific syntax</li>
						<li>Forget to test with AI tools</li>
					</ul>
				</div>
			</div>
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

		<!-- CTA -->
		<section class="cta-box">
			<h2>Verify Your AI-Generated Code</h2>
			<p>
				AGENTS.md helps AI generate better code, but it's not foolproof. <a href="https://scanner.vibeship.co">VibeShip Scanner</a> catches security issues that slip through - hardcoded secrets, SQL injection, missing auth checks.
			</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">Scan Your Code Free</a>
		</section>

		<!-- Related Content -->
		<section class="article-section">
			<h2>Related guides</h2>
			<div class="related-grid">
				<a href="/kb/prompts/claude-md/" class="card card-interactive related-card">
					<div class="related-card-category">Config Guide</div>
					<div class="related-card-title">CLAUDE.md Guide</div>
					<p class="related-card-description">Claude Code-specific configuration with advanced features</p>
				</a>
				<a href="/kb/prompts/cursor-rules/" class="card card-interactive related-card">
					<div class="related-card-category">Config Guide</div>
					<div class="related-card-title">Cursor Rules</div>
					<p class="related-card-description">Cursor-specific rules with activation modes</p>
				</a>
				<a href="/kb/prompts/cline-rules/" class="card card-interactive related-card">
					<div class="related-card-category">Config Guide</div>
					<div class="related-card-title">Cline Rules</div>
					<p class="related-card-description">Configure Cline with custom rules</p>
				</a>
				<a href="/kb/prompts/copilot-instructions/" class="card card-interactive related-card">
					<div class="related-card-category">Config Guide</div>
					<div class="related-card-title">Copilot Instructions</div>
					<p class="related-card-description">GitHub Copilot custom instructions</p>
				</a>
				<a href="/kb/security/vulnerabilities/sql-injection/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">SQL Injection</div>
					<p class="related-card-description">Prevent injection attacks in AI code</p>
				</a>
				<a href="/kb/vibe-coding/secure-vibe-coding-guide/" class="card card-interactive related-card">
					<div class="related-card-category">Pillar Guide</div>
					<div class="related-card-title">Secure Vibe Coding</div>
					<p class="related-card-description">Complete security guide for AI development</p>
				</a>
			</div>
		</section>

		<!-- External Resources -->
		<section>
			<h2>External resources</h2>
			<ul class="external-links">
				<li><a href="https://cursor.com/docs/context/rules" target="_blank" rel="noopener">Cursor Rules Documentation</a></li>
				<li><a href="https://docs.cline.bot/features/cline-rules" target="_blank" rel="noopener">Cline Rules Documentation</a></li>
				<li><a href="https://docs.anthropic.com/en/docs/claude-code/memory" target="_blank" rel="noopener">Claude Code Memory (CLAUDE.md)</a></li>
				<li><a href="https://github.com/PatrickJS/awesome-cursorrules" target="_blank" rel="noopener">Awesome Cursor Rules</a> - 36k+ stars</li>
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
		margin-top: 0;
		margin-bottom: 0.5rem;
	}

	h4 {
		font-size: 1rem;
		margin-top: 0;
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
		color: var(--green);
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
		font-size: 0.8rem;
		line-height: 1.6;
		background: #0d0d0d;
		border-top: 1px solid var(--border);
		white-space: pre-wrap;
		word-wrap: break-word;
	}

	pre code {
		background: transparent;
		padding: 0;
		white-space: pre-wrap;
		word-wrap: break-word;
	}

	/* Compatibility Table */
	.compatibility-table,
	.comparison-table {
		overflow-x: auto;
		margin: 1.5rem 0;
	}

	.compatibility-table table,
	.comparison-table table {
		width: 100%;
		border-collapse: collapse;
	}

	.compatibility-table th,
	.compatibility-table td,
	.comparison-table th,
	.comparison-table td {
		padding: 0.75rem 1rem;
		text-align: left;
		border: 1px solid var(--border);
	}

	.compatibility-table th,
	.comparison-table th {
		background: var(--bg-secondary);
		font-weight: 600;
	}

	.compatibility-table tr:nth-child(even),
	.comparison-table tr:nth-child(even) {
		background: rgba(255,255,255,0.02);
	}

	.support-badge {
		display: inline-block;
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		font-size: 0.75rem;
		font-weight: 600;
	}

	.support-badge.full {
		background: rgba(34, 197, 94, 0.2);
		color: #22c55e;
	}

	.support-badge.partial {
		background: rgba(234, 179, 8, 0.2);
		color: #eab308;
	}

	.support-badge.none {
		background: rgba(107, 114, 128, 0.2);
		color: #9ca3af;
	}

	/* Template Section */
	.template-section {
		background: var(--bg-secondary);
		padding: 2rem;
		border: 1px solid var(--border);
		margin: 2rem 0;
	}

	.template-section h2 {
		border-bottom: none;
		padding-bottom: 0;
	}

	.template-card {
		overflow: hidden;
	}

	.template-header,
	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		padding: 1rem;
		background: rgba(255,255,255,0.02);
	}

	.template-desc,
	.section-desc {
		margin: 0;
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.template-card pre {
		max-height: 400px;
		overflow-y: auto;
	}

	/* Sections Grid */
	.sections-grid {
		display: grid;
		gap: 1.5rem;
		margin: 1.5rem 0;
	}

	.section-card {
		overflow: hidden;
	}

	.section-card pre {
		max-height: 250px;
		overflow-y: auto;
	}

	/* Security Section */
	.security-section {
		background: var(--bg-secondary);
		padding: 2rem;
		border: 1px solid rgba(34, 197, 94, 0.3);
	}

	.security-rules {
		display: grid;
		gap: 1.5rem;
		margin: 1rem 0;
	}

	.security-rule {
		background: var(--bg-primary);
		border: 1px solid var(--border);
		padding: 1rem;
	}

	.security-rule h4 {
		color: var(--green-dim);
		margin-bottom: 0.75rem;
	}

	.security-rule pre {
		background: #0d0d0d;
		border: none;
		border-radius: 4px;
	}

	/* Practices Grid */
	.practices-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5rem;
		margin: 1rem 0;
	}

	@media (max-width: 768px) {
		.practices-grid {
			grid-template-columns: 1fr;
		}
	}

	.practice-card {
		padding: 1.5rem;
		border: 1px solid var(--border);
	}

	.practice-card.do {
		background: rgba(34, 197, 94, 0.05);
		border-color: rgba(34, 197, 94, 0.3);
	}

	.practice-card.dont {
		background: rgba(239, 68, 68, 0.05);
		border-color: rgba(239, 68, 68, 0.3);
	}

	.practice-card h4 {
		margin-bottom: 1rem;
	}

	.practice-card.do h4 {
		color: #22c55e;
	}

	.practice-card.dont h4 {
		color: #ef4444;
	}

	.practice-card ul {
		margin: 0;
		padding-left: 1.25rem;
	}

	.practice-card li {
		margin-bottom: 0.5rem;
		font-size: 0.9rem;
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
		color: var(--green);
	}

	/* Mobile adjustments */
	@media (max-width: 768px) {
		.content-wrapper {
			padding: 1rem;
		}

		h1 {
			font-size: 1.75rem;
		}

		.template-section,
		.security-section {
			padding: 1rem;
		}
	}
</style>
