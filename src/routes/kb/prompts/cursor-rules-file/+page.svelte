<script lang="ts">
	import { Header } from '$lib/components/layout';

	const meta = {
		title: 'Cursor Rules File: .cursorrules Syntax Reference',
		description: 'Complete .cursorrules file syntax guide. Frontmatter options, file locations, rule precedence, glob patterns, and character limits for Cursor AI.',
		url: '/kb/prompts/cursor-rules-file/'
	};

	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Prompts', href: '/kb/prompts' },
		{ label: 'Cursor Rules File' }
	];

	const faqs = [
		{
			question: 'What is a .cursorrules file?',
			answer: 'A .cursorrules file is a markdown configuration file that teaches Cursor AI your project\'s coding standards, architecture, and security rules. Place it in your project root or use the newer .cursor/rules/ folder for modular organization.'
		},
		{
			question: 'Where should I put my cursor rules file?',
			answer: 'Use .cursor/rules/ folder for new projects (recommended) or .cursorrules in project root for legacy setups. Both work. The folder approach allows multiple focused rule files instead of one large file.'
		},
		{
			question: 'What is the character limit for cursor rules?',
			answer: 'Cursor rules have no hard character limit, but keep individual rule files under 500 lines for best performance. Split large configurations into multiple files in .cursor/rules/ folder.'
		},
		{
			question: 'How do I make rules apply only to specific files?',
			answer: 'Use the globs frontmatter option. Add globs: ["**/*.ts", "**/*.tsx"] at the top of your rule file to apply rules only when working with TypeScript files.'
		},
		{
			question: 'What is rule precedence in Cursor?',
			answer: 'Team Rules override Project Rules, which override User Rules. Within a project, rules with alwaysApply: true load first, then glob-matched rules, then manually-triggered rules via @mention.'
		},
		{
			question: 'Can I reference other files in cursor rules?',
			answer: 'Yes. Use @filename syntax to reference other files in your project. For example, @src/types/user.ts shows Cursor your type definitions without copying code into rules.'
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

	const basicRuleTemplate = `---
description: "Project coding standards and patterns"
alwaysApply: true
---

# Project Rules

## Tech Stack
- Framework: Next.js 14 (App Router)
- Language: TypeScript (strict mode)
- Database: Supabase with RLS
- Styling: Tailwind CSS

## Code Patterns
- Use server components by default
- Client components only when needed (interactivity)
- Validate all inputs with Zod schemas

## Security
- NEVER hardcode API keys or secrets
- ALWAYS use parameterized queries
- Check authentication on every API route`;

	const globRuleTemplate = `---
description: "TypeScript-specific rules for type safety"
alwaysApply: false
globs: ["**/*.ts", "**/*.tsx"]
---

# TypeScript Rules

## Type Safety
- No \`any\` types - use \`unknown\` and narrow
- Export types from dedicated /types folder
- Use Zod for runtime validation

## Patterns
\`\`\`typescript
// Good: Explicit return types
function getUser(id: string): Promise<User | null> {
  return db.user.findUnique({ where: { id } })
}

// Bad: Implicit any
function getUser(id) {
  return db.user.findUnique({ where: { id } })
}
\`\`\``;

	const securityRuleTemplate = `---
description: "Security patterns to prevent common vulnerabilities"
alwaysApply: true
---

# Security Rules

## Database Queries
NEVER use string concatenation for SQL:
\`\`\`typescript
// WRONG - SQL injection risk
db.query(\`SELECT * FROM users WHERE id = \${userId}\`)

// CORRECT - parameterized query
db.query('SELECT * FROM users WHERE id = $1', [userId])
\`\`\`

## Authentication
Check auth on EVERY API route:
\`\`\`typescript
export async function POST(request: Request) {
  const session = await getServerSession()
  if (!session) {
    return new Response('Unauthorized', { status: 401 })
  }
  // Process request...
}
\`\`\`

## Input Validation
Validate ALL user input:
\`\`\`typescript
const schema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100)
})

const result = schema.safeParse(input)
if (!result.success) {
  return new Response('Invalid input', { status: 400 })
}
\`\`\``;
</script>

<svelte:head>
	<title>{meta.title}</title>
	<meta name="description" content={meta.description} />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:url" content={meta.url} />
	<link rel="canonical" href="https://vibeship.co{meta.url}" />

	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: breadcrumbs.map((crumb, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: crumb.label,
			item: crumb.href ? `https://vibeship.co${crumb.href}` : undefined
		}))
	})}</script>`}

	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqs.map((faq) => ({
			'@type': 'Question',
			name: faq.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: faq.answer
			}
		}))
	})}</script>`}
</svelte:head>

<Header {breadcrumbs} />

<div class="content-wrapper">
	<article class="content-main content-wide">
		<header class="article-header">
			<div class="badge-row">
				<span class="badge">Prompts</span>
				<span class="badge badge-low">Cursor</span>
			</div>
			<h1>Cursor Rules File: Complete .cursorrules Syntax Reference</h1>
			<p class="subtitle">
				Technical reference for Cursor AI configuration files - frontmatter options, file locations, rule precedence, and syntax patterns.
			</p>
		</header>

		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>A Cursor rules file (.cursorrules or .cursor/rules/*.md) is a markdown file that teaches Cursor AI your project's patterns.</strong>
				Use YAML frontmatter for options: <code>description</code> (AI relevance), <code>alwaysApply</code> (auto-load), and <code>globs</code> (file patterns). Team rules override project rules, which override user rules.
			</p>
		</div>

		<!-- What Is a Cursor Rules File -->
		<section class="article-section">
			<h2>What is a cursor rules file?</h2>
			<p>
				A cursor rules file is a markdown configuration that customizes how Cursor AI generates code for your project. It contains your coding standards, architecture patterns, and security requirements in a format Cursor reads before every suggestion.
			</p>
			<p>
				When you're <a href="/kb/vibe-coding/">vibe coding</a> with Cursor, these rules transform generic AI suggestions into project-specific code. Instead of getting boilerplate React patterns, Cursor learns your exact stack: your ORM, auth library, and folder structure.
			</p>
			<div class="alert alert-info">
				<div class="alert-title">Two file formats</div>
				<p><code>.cursorrules</code> - Legacy single-file format (still works)<br>
				<code>.cursor/rules/*.md</code> - Modern multi-file format (recommended)</p>
			</div>
		</section>

		<!-- File Locations -->
		<section class="article-section">
			<h2>Where do cursor rules files go?</h2>
			<p>
				Cursor reads rules from multiple locations with a clear precedence hierarchy. Understanding this lets you set organization-wide standards while allowing project-specific overrides.
			</p>

			<div class="location-grid">
				<div class="card">
					<span class="priority-label">Highest Priority</span>
					<h3>Team Rules</h3>
					<code>.cursor/rules/*.md</code> (shared via git)
					<p>Committed to repo, shared with all team members. Overrides everything else.</p>
				</div>

				<div class="card">
					<span class="priority-label">Medium Priority</span>
					<h3>Project Rules</h3>
					<code>.cursorrules</code> (project root)
					<p>Legacy format. Works but prefer .cursor/rules/ for new projects.</p>
				</div>

				<div class="card">
					<span class="priority-label">Lowest Priority</span>
					<h3>User Rules</h3>
					<code>~/.cursor/rules/*.md</code>
					<p>Personal preferences. Applied to all projects but overridden by project/team rules.</p>
				</div>
			</div>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Folder Structure</span>
				</div>
				<pre><code>project/
├── .cursor/
│   └── rules/
│       ├── core.md          # Always-on project rules
│       ├── security.md      # Security patterns (alwaysApply: true)
│       ├── typescript.md    # TS rules (globs: ["**/*.ts"])
│       └── testing.md       # Test patterns (globs: ["**/*.test.*"])
├── .cursorrules             # Legacy (optional, deprecated)
└── AGENTS.md                # Cross-tool fallback</code></pre>
			</div>
		</section>

		<!-- Frontmatter Syntax -->
		<section class="article-section">
			<h2>What frontmatter options are available?</h2>
			<p>
				Frontmatter is YAML metadata at the top of rule files that controls when and how rules apply. These three options give you precise control over rule activation.
			</p>

			<div class="table-wrapper">
				<table>
					<thead>
						<tr>
							<th>Option</th>
							<th>Type</th>
							<th>Description</th>
							<th>Example</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>description</code></td>
							<td>string</td>
							<td>Helps AI decide if rule is relevant to current task</td>
							<td><code>"TypeScript type safety patterns"</code></td>
						</tr>
						<tr>
							<td><code>alwaysApply</code></td>
							<td>boolean</td>
							<td>Load this rule in every conversation</td>
							<td><code>true</code> or <code>false</code></td>
						</tr>
						<tr>
							<td><code>globs</code></td>
							<td>array</td>
							<td>Apply only when working with matching files</td>
							<td><code>["**/*.ts", "**/*.tsx"]</code></td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">YAML</span>
					<button class="copy-btn" class:copied={copied && copiedSection === 'frontmatter'} onclick={() => copyCode(`---
description: "React component patterns for Next.js App Router"
alwaysApply: false
globs: ["app/**/*.tsx", "components/**/*.tsx"]
---

# React Component Rules
...`, 'frontmatter')}>
						{copied && copiedSection === 'frontmatter' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code>---
description: "React component patterns for Next.js App Router"
alwaysApply: false
globs: ["app/**/*.tsx", "components/**/*.tsx"]
---

# React Component Rules
...</code></pre>
			</div>
		</section>

		<!-- Rule Application Types -->
		<section class="article-section">
			<h2>How do rule activation modes work?</h2>
			<p>
				Cursor supports four activation modes that determine when rules are loaded into context. Choose based on how universally the rule should apply.
			</p>

			<div class="mode-grid">
				<div class="card">
					<h3>Always Apply</h3>
					<code>alwaysApply: true</code>
					<p>Active in every chat. Use for security rules, core standards.</p>
					<span class="mode-use">Best for: Auth, validation, secrets</span>
				</div>

				<div class="card">
					<h3>Apply Intelligently</h3>
					<code>alwaysApply: false</code> + description
					<p>AI decides relevance from description. Reduces context noise.</p>
					<span class="mode-use">Best for: Framework patterns, style guides</span>
				</div>

				<div class="card">
					<h3>File-Specific</h3>
					<code>globs: ["*.ts"]</code>
					<p>Triggered only when working with matching file patterns.</p>
					<span class="mode-use">Best for: Language rules, test patterns</span>
				</div>

				<div class="card">
					<h3>Manual</h3>
					<code>@rule-name</code> in chat
					<p>User explicitly activates via @mention. Lowest overhead.</p>
					<span class="mode-use">Best for: Rarely-used, specialized rules</span>
				</div>
			</div>
		</section>

		<!-- Glob Patterns -->
		<section class="article-section">
			<h2>What glob patterns can I use?</h2>
			<p>
				Glob patterns filter which files trigger rule activation. Cursor uses standard glob syntax, the same patterns you'd use in .gitignore or tsconfig.
			</p>

			<div class="table-wrapper">
				<table>
					<thead>
						<tr>
							<th>Pattern</th>
							<th>Matches</th>
							<th>Use Case</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>**/*.ts</code></td>
							<td>All TypeScript files, any depth</td>
							<td>TypeScript rules</td>
						</tr>
						<tr>
							<td><code>**/*.tsx</code></td>
							<td>All React TSX files</td>
							<td>Component rules</td>
						</tr>
						<tr>
							<td><code>app/**/*</code></td>
							<td>Everything in app/ folder</td>
							<td>Next.js App Router rules</td>
						</tr>
						<tr>
							<td><code>**/*.test.*</code></td>
							<td>All test files</td>
							<td>Testing rules</td>
						</tr>
						<tr>
							<td><code>src/lib/**/*.ts</code></td>
							<td>TypeScript in src/lib/</td>
							<td>Library code rules</td>
						</tr>
						<tr>
							<td><code>*.config.*</code></td>
							<td>Config files in root</td>
							<td>Config file patterns</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">YAML</span>
				</div>
				<pre><code>---
description: "Frontend component rules"
globs: ["**/*.tsx", "**/*.jsx", "components/**/*"]
---</code></pre>
			</div>
		</section>

		<!-- File References -->
		<section class="article-section">
			<h2>How do I reference other files in rules?</h2>
			<p>
				Use <code>@filename</code> syntax to include context from other project files without copy-pasting code. Cursor reads the referenced file and includes it in context.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Markdown</span>
					<button class="copy-btn" class:copied={copied && copiedSection === 'fileref'} onclick={() => copyCode(`# API Route Patterns

Follow the patterns in our existing routes:
@src/app/api/users/route.ts
@src/app/api/posts/route.ts

## Type Definitions
Use types from our schema:
@src/types/user.ts
@src/types/post.ts

## Validation
Follow Zod schema patterns:
@src/lib/validations/user.ts`, 'fileref')}>
						{copied && copiedSection === 'fileref' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code># API Route Patterns

Follow the patterns in our existing routes:
@src/app/api/users/route.ts
@src/app/api/posts/route.ts

## Type Definitions
Use types from our schema:
@src/types/user.ts
@src/types/post.ts

## Validation
Follow Zod schema patterns:
@src/lib/validations/user.ts</code></pre>
			</div>

			<div class="alert alert-success">
				<div class="alert-title">Pro tip</div>
				<p>Reference your best code as examples. @filename is more maintainable than copying code into rules because updates to the source file automatically update the rule context.</p>
			</div>
		</section>

		<!-- Rule Templates -->
		<section class="article-section templates-section">
			<h2>What should I include in a cursor rules file?</h2>
			<p>
				Every cursor rules file should cover your stack, patterns, and security requirements. Here are copy-paste templates for common setups.
			</p>

			<div class="template-card">
				<div class="code-block-header">
					<span class="code-block-lang">Basic Project Rules</span>
					<button class="copy-btn" class:copied={copied && copiedSection === 'basic'} onclick={() => copyCode(basicRuleTemplate, 'basic')}>
						{copied && copiedSection === 'basic' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code>{basicRuleTemplate}</code></pre>
			</div>

			<div class="template-card">
				<div class="code-block-header">
					<span class="code-block-lang">TypeScript-Specific Rules (with globs)</span>
					<button class="copy-btn" class:copied={copied && copiedSection === 'glob'} onclick={() => copyCode(globRuleTemplate, 'glob')}>
						{copied && copiedSection === 'glob' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code>{globRuleTemplate}</code></pre>
			</div>

			<div class="template-card">
				<div class="code-block-header">
					<span class="code-block-lang">Security Rules (Always Apply)</span>
					<button class="copy-btn" class:copied={copied && copiedSection === 'security'} onclick={() => copyCode(securityRuleTemplate, 'security')}>
						{copied && copiedSection === 'security' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code>{securityRuleTemplate}</code></pre>
			</div>
		</section>

		<!-- Best Practices -->
		<section class="article-section">
			<h2>What are cursor rules file best practices?</h2>
			<p>
				Follow these patterns from the <a href="https://github.com/PatrickJS/awesome-cursorrules" target="_blank" rel="noopener">awesome-cursorrules</a> community (36k+ stars) and official Cursor documentation.
			</p>

			<div class="practices-grid">
				<div class="card practice-do">
					<h3>Do</h3>
					<ul>
						<li>Keep individual rule files under 500 lines</li>
						<li>Use specific examples, not vague guidance</li>
						<li>Include anti-patterns (what NOT to do)</li>
						<li>Split rules into focused modules</li>
						<li>Use @filename references for code examples</li>
						<li>Set <a href="/kb/security/">security rules</a> to <code>alwaysApply: true</code></li>
					</ul>
				</div>
				<div class="card practice-dont">
					<h3>Don't</h3>
					<ul>
						<li>Create one massive rules file</li>
						<li>Use vague language ("format properly")</li>
						<li>Only show happy path examples</li>
						<li>Set and forget - update as project evolves</li>
						<li>Copy-paste large code blocks (use @filename)</li>
						<li>Duplicate rules across multiple files</li>
					</ul>
				</div>
			</div>
		</section>

		<!-- Comparison -->
		<section class="article-section">
			<h2>How does .cursorrules compare to other AI tools?</h2>
			<p>
				Each vibe coding tool has its own configuration format. Here's how Cursor compares to alternatives.
			</p>

			<div class="table-wrapper">
				<table>
					<thead>
						<tr>
							<th>Feature</th>
							<th>Cursor</th>
							<th>Claude Code</th>
							<th>Windsurf</th>
							<th>Cline</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Config File</td>
							<td><code>.cursor/rules/</code></td>
							<td><code>CLAUDE.md</code></td>
							<td><code>.windsurf/rules/</code></td>
							<td><code>.clinerules/</code></td>
						</tr>
						<tr>
							<td>Frontmatter</td>
							<td>Yes (YAML)</td>
							<td>Yes (YAML)</td>
							<td>No</td>
							<td>No</td>
						</tr>
						<tr>
							<td>Glob Patterns</td>
							<td>Yes</td>
							<td>Yes (paths:)</td>
							<td>Yes</td>
							<td>No</td>
						</tr>
						<tr>
							<td>File References</td>
							<td>@filename</td>
							<td>@import</td>
							<td>No</td>
							<td>No</td>
						</tr>
						<tr>
							<td>Rule Precedence</td>
							<td>Team &gt; Project &gt; User</td>
							<td>Enterprise &gt; Project &gt; User</td>
							<td>Workspace &gt; Global</td>
							<td>Project &gt; Global</td>
						</tr>
					</tbody>
				</table>
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

		<!-- CTA -->
		<section class="cta-box">
			<h2>Verify Your Cursor Rules Are Working</h2>
			<p>
				After setting up cursor rules, test if Cursor follows your security patterns. Ask it to "create an API route" and check if it includes auth, validation, and parameterized queries.
			</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg" target="_blank" rel="noopener">
				Scan Your Cursor-Generated Code
			</a>
		</section>

		<!-- Related -->
		<section class="article-section">
			<h2>Related resources</h2>
			<div class="related-grid">
				<a href="/kb/prompts/cursor-rules/" class="card card-interactive related-card">
					<span class="related-card-category">Guide</span>
					<h3 class="related-card-title">Cursor Rules</h3>
					<p class="related-card-description">Complete guide to writing effective cursor rules</p>
				</a>
				<a href="/kb/prompts/cursor-rules-examples/" class="card card-interactive related-card">
					<span class="related-card-category">Examples</span>
					<h3 class="related-card-title">Cursor Rules Examples</h3>
					<p class="related-card-description">20+ ready-to-use templates for every stack</p>
				</a>
				<a href="/kb/prompts/claude-md/" class="card card-interactive related-card">
					<span class="related-card-category">Guide</span>
					<h3 class="related-card-title">CLAUDE.md Guide</h3>
					<p class="related-card-description">Claude Code configuration reference</p>
				</a>
				<a href="/kb/vibe-coding-tools/cursor/" class="card card-interactive related-card">
					<span class="related-card-category">Tool</span>
					<h3 class="related-card-title">Cursor</h3>
					<p class="related-card-description">Security patterns in Cursor AI</p>
				</a>
			</div>
		</section>

		<!-- External Docs -->
		<section class="article-section">
			<h2>Official documentation</h2>
			<div class="external-links">
				<a href="https://cursor.com/docs/context/rules" target="_blank" rel="noopener" class="card card-interactive external-link">
					Cursor Rules Documentation
					<span class="external-icon">↗</span>
				</a>
				<a href="https://github.com/PatrickJS/awesome-cursorrules" target="_blank" rel="noopener" class="card card-interactive external-link">
					awesome-cursorrules (36k+ stars)
					<span class="external-icon">↗</span>
				</a>
			</div>
		</section>
	</article>
</div>

<style>
	/* Page-specific styles only - using global CSS classes */

	.badge-row {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.subtitle {
		font-size: 1.125rem;
		color: var(--text-secondary);
		margin-top: 0.5rem;
	}

	/* Location/Mode grids */
	.location-grid,
	.mode-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.location-grid .card,
	.mode-grid .card {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.priority-label {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.65rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--green-dim);
	}

	.mode-use {
		font-size: 0.75rem;
		color: var(--green-dim);
		font-style: italic;
		margin-top: auto;
	}

	/* Templates section */
	.templates-section {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 2rem;
		margin: 2rem 0;
	}

	.template-card {
		background: var(--bg-primary);
		border: 1px solid var(--border);
		margin: 1.5rem 0;
		overflow: hidden;
	}

	.template-card pre {
		margin: 0;
		padding: 1rem;
		overflow-x: auto;
		background: var(--bg-primary);
	}

	.template-card code {
		background: none;
		padding: 0;
		color: var(--text-primary);
		font-size: 0.8125rem;
		line-height: 1.6;
	}

	/* Practices grid */
	.practices-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1.5rem;
		margin: 1.5rem 0;
	}

	.practice-do {
		border-top: 3px solid var(--green);
	}

	.practice-dont {
		border-top: 3px solid var(--red);
	}

	.practice-do h3 {
		color: var(--green);
	}

	.practice-dont h3 {
		color: var(--red);
	}

	.practices-grid ul {
		margin: 0.75rem 0 0 1.25rem;
		padding: 0;
	}

	.practices-grid li {
		color: var(--text-secondary);
		margin: 0.5rem 0;
		font-size: 0.9375rem;
	}

	/* FAQ list */
	.faq-list {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		margin-top: 1.5rem;
	}

	.faq-item {
		padding-bottom: 1.5rem;
		border-bottom: 1px solid var(--border);
	}

	.faq-item:last-child {
		border-bottom: none;
		padding-bottom: 0;
	}

	.faq-item h3 {
		font-size: 1rem;
		margin-bottom: 0.5rem;
	}

	.faq-item p {
		margin: 0;
		font-size: 0.9375rem;
	}

	/* CTA Box */
	.cta-box {
		background: var(--bg-secondary);
		border: 1px solid var(--green-dim);
		border-left: 3px solid var(--green-dim);
		padding: 2rem;
		text-align: center;
		margin: 2rem 0;
	}

	.cta-box h2 {
		margin-bottom: 0.75rem;
	}

	.cta-box p {
		margin-bottom: 1.5rem;
	}

	/* External Links */
	.external-links {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-top: 1rem;
	}

	.external-link {
		display: flex;
		justify-content: space-between;
		align-items: center;
		text-decoration: none;
		color: var(--text-primary);
	}

	.external-icon {
		color: var(--text-secondary);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.location-grid,
		.mode-grid,
		.practices-grid {
			grid-template-columns: 1fr;
		}

		.templates-section {
			padding: 1.5rem;
		}
	}
</style>
