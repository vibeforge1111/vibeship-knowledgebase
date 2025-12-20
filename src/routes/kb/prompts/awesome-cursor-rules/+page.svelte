<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Awesome Cursor Rules: 150+ Community Templates',
		description: 'Curated collection of cursor rules from the community. Get production-ready .cursorrules for React, Next.js, Python, and more - plus security rules others miss.',
		url: '/kb/prompts/awesome-cursor-rules/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Prompts', href: '/kb/prompts' },
		{ label: 'Awesome Cursor Rules' }
	];

	// FAQ data
	const faqs = [
		{
			question: 'What is the awesome-cursorrules repository?',
			answer: 'The awesome-cursorrules repository (github.com/PatrickJS/awesome-cursorrules) is a community-curated collection of cursor rules with over 36,000 GitHub stars. It contains 150+ templates organized by framework, language, and use case. Anyone can contribute their own rules to help other vibe coders work more efficiently.'
		},
		{
			question: 'How do I use rules from awesome-cursorrules?',
			answer: 'Copy the rule content from the repository and paste it into your .cursorrules file or .cursor/rules/ folder. Most rules are designed to be used as-is, but you should customize them for your specific project. Add security rules separately since the community templates often lack them.'
		},
		{
			question: 'What is the difference between cursor.directory and awesome-cursorrules?',
			answer: 'cursor.directory is a searchable website with a clean interface for browsing rules. awesome-cursorrules is a GitHub repository with raw markdown files. Both have community-contributed content. cursor.directory is easier to browse; awesome-cursorrules is easier to contribute to and offers more technical depth.'
		},
		{
			question: 'Which cursor rules should I start with?',
			answer: 'Start with rules matching your primary tech stack (Next.js, React, Python, etc.). Then add security rules for database operations and authentication. Finally, add code style rules for consistency. The order matters - framework rules first, security second, style third.'
		},
		{
			question: 'Do community cursor rules include security patterns?',
			answer: 'Most community rules focus on code style and framework patterns, not security. This is the biggest gap in collections like awesome-cursorrules. Always add security rules for SQL injection prevention, authentication checks, and input validation. VibeShip provides security-focused rules that complement community templates.'
		},
		{
			question: 'How often is awesome-cursorrules updated?',
			answer: 'The repository receives regular community contributions. New frameworks and tools get rules within weeks of release. However, quality varies by contributor - always review rules before using in production. Check the commit history to see recent updates and contributor activity.'
		}
	];

	// Top rule categories with counts
	const categories = [
		{ name: 'Frontend Frameworks', count: 45, examples: ['Next.js', 'React', 'Vue', 'Svelte', 'Angular'] },
		{ name: 'Backend & APIs', count: 32, examples: ['Node.js', 'Python', 'Go', 'Rust', 'FastAPI'] },
		{ name: 'Mobile Development', count: 18, examples: ['React Native', 'Flutter', 'Swift', 'Kotlin'] },
		{ name: 'Databases', count: 15, examples: ['Supabase', 'Prisma', 'MongoDB', 'PostgreSQL'] },
		{ name: 'DevOps & Testing', count: 12, examples: ['Docker', 'Vitest', 'Jest', 'Playwright'] },
		{ name: 'AI & ML', count: 8, examples: ['LangChain', 'OpenAI', 'Vercel AI SDK'] }
	];

	// Featured rules from the community
	const featuredRules = [
		{
			name: 'Next.js 15 + Supabase',
			source: 'awesome-cursorrules',
			stars: '2.1k',
			description: 'App Router patterns, Server Actions, Supabase auth'
		},
		{
			name: 'TypeScript Strict',
			source: 'cursor.directory',
			stars: '1.8k',
			description: 'No any types, proper generics, exhaustive checks'
		},
		{
			name: 'Python FastAPI',
			source: 'awesome-cursorrules',
			stars: '1.5k',
			description: 'Async patterns, Pydantic validation, dependency injection'
		},
		{
			name: 'React + TanStack Query',
			source: 'cursor.directory',
			stars: '1.2k',
			description: 'Query patterns, optimistic updates, cache management'
		}
	];
</script>

<svelte:head>
	<title>{meta.title} | VibeShip</title>
	<meta name="description" content={meta.description} />
	<link rel="canonical" href="https://vibeship.co{meta.url}" />
</svelte:head>

<Header {breadcrumbs} />

<div class="content-wrapper">
	<article class="content-main content-wide">
		<!-- Quick Answer -->
		<div class="quick-answer">
			<p>
				<strong>Awesome cursor rules</strong> is a community collection of 150+ cursor rules templates with 36,000+ GitHub stars. Get production-ready .cursorrules for any stack - but add security rules separately, since most community templates miss them. Here's where to find the best rules and how to use them safely.
			</p>
		</div>

		<!-- Badge -->
		<span class="badge badge-prompts">Prompts Collection</span>

		<h1>Awesome Cursor Rules: 150+ Community Templates for Vibe Coders</h1>

		<p class="intro">
			The vibe coding community has built an incredible library of cursor rules. Instead of writing rules from scratch, you can grab battle-tested templates for your exact tech stack. But there's a catch - almost none include security patterns. Here's how to get the best of both worlds.
		</p>

		<!-- Stats Row -->
		<div class="stats-row">
			<div class="stat-card">
				<div class="stat-number">36K+</div>
				<div class="stat-label">GitHub Stars</div>
			</div>
			<div class="stat-card">
				<div class="stat-number">150+</div>
				<div class="stat-label">Rule Templates</div>
			</div>
			<div class="stat-card">
				<div class="stat-number">6</div>
				<div class="stat-label">Categories</div>
			</div>
			<div class="stat-card">
				<div class="stat-number">0</div>
				<div class="stat-label">Security Rules*</div>
			</div>
		</div>
		<p class="stat-note">*Most community templates lack security patterns - we'll fix that below.</p>

		<h2>Where to Find Cursor Rules</h2>

		<p>
			Two main sources dominate the cursor rules ecosystem. Each has strengths for different vibe coders.
		</p>

		<div class="source-comparison">
			<div class="source-card">
				<h3>awesome-cursorrules (GitHub)</h3>
				<p class="source-link">github.com/PatrickJS/awesome-cursorrules</p>
				<ul>
					<li>36,200+ stars, 150+ templates</li>
					<li>Raw markdown files you can fork</li>
					<li>Easy to contribute your own rules</li>
					<li>Organized by framework/language</li>
					<li>Technical depth, more examples</li>
				</ul>
				<p class="source-best-for"><strong>Best for:</strong> Developers who want full control and Git integration</p>
			</div>

			<div class="source-card">
				<h3>cursor.directory</h3>
				<p class="source-link">cursor.directory</p>
				<ul>
					<li>Searchable web interface</li>
					<li>One-click copy to clipboard</li>
					<li>Community ratings and comments</li>
					<li>MCP server templates included</li>
					<li>Clean, browseable categories</li>
				</ul>
				<p class="source-best-for"><strong>Best for:</strong> Quick browsing and discovery</p>
			</div>
		</div>

		<h2>What Categories Are Available?</h2>

		<p>
			The community has built rules for virtually every tech stack. Here's what you'll find organized by category.
		</p>

		<div class="category-grid">
			{#each categories as category}
				<div class="category-card">
					<div class="category-header">
						<span class="category-name">{category.name}</span>
						<span class="category-count">{category.count} rules</span>
					</div>
					<div class="category-examples">
						{#each category.examples as example}
							<span class="example-tag">{example}</span>
						{/each}
					</div>
				</div>
			{/each}
		</div>

		<h2>Most Popular Community Rules</h2>

		<p>
			These templates get the most stars and forks. They're battle-tested by thousands of vibe coders.
		</p>

		<div class="featured-grid">
			{#each featuredRules as rule}
				<div class="featured-card">
					<div class="featured-header">
						<span class="featured-name">{rule.name}</span>
						<span class="featured-stars">{rule.stars} stars</span>
					</div>
					<p class="featured-description">{rule.description}</p>
					<span class="featured-source">via {rule.source}</span>
				</div>
			{/each}
		</div>

		<h2>The Security Gap in Community Rules</h2>

		<p>
			Here's the uncomfortable truth: <strong>most community cursor rules focus on code style, not security</strong>. Browse awesome-cursorrules and you'll find excellent patterns for React hooks, TypeScript generics, and framework conventions. What you won't find are rules preventing <a href="/kb/security/vulnerabilities/sql-injection/">SQL injection</a>, enforcing <a href="/kb/security/vulnerabilities/missing-auth/">authentication checks</a>, or blocking <a href="/kb/security/vulnerabilities/hardcoded-secrets/">hardcoded secrets</a>.
		</p>

		<p>
			This matters because AI tools generate vulnerable code <a href="/kb/vibe-coding/secure-vibe-coding-guide/">45% of the time</a>. Style rules make your code consistent. Security rules keep your users safe.
		</p>

		<h3>Security Rules to Add (Copy-Paste Ready)</h3>

		<p>
			Add these to any community template. They catch the vulnerabilities that style rules miss.
		</p>

		<div class="code-block">
			<div class="code-header">
				<span class="code-title">Security Rules - Add to Any .cursorrules</span>
				<span class="code-lang">markdown</span>
			</div>
			<pre><code>{`## Security Rules (CRITICAL)

### Database Security
- NEVER use template literals for SQL queries
- ALWAYS use parameterized queries with $1, $2 placeholders
- NEVER trust user input in queries, even from authenticated users

✅ SECURE:
db.query('SELECT * FROM users WHERE id = $1', [userId])

❌ VULNERABLE:
db.query(\`SELECT * FROM users WHERE id = \${userId}\`)

### Authentication Checks
- EVERY API route must verify authentication FIRST
- Use middleware for auth, not inline checks in handlers
- Never trust client-side auth state for server decisions

Pattern for protected routes:
1. Check session/token exists
2. Validate session/token is not expired
3. Verify user has permission for this action
4. THEN process the request

### Input Validation
- Validate ALL user input on the server with Zod
- Never pass raw user input to:
  - Database queries
  - File system operations
  - Shell commands
  - URL redirects
  - HTML output (XSS)

### Secret Handling
- NEVER hardcode API keys, passwords, or tokens
- ALWAYS use environment variables: process.env.SECRET_NAME
- Never log secrets or include them in error messages
- Never commit .env files to version control`}</code></pre>
		</div>

		<h2>How to Combine Community + Security Rules</h2>

		<p>
			The ideal setup uses community rules for style and framework patterns, plus security rules for protection. Here's how to structure it.
		</p>

		<h3>Option 1: Single .cursorrules File</h3>

		<div class="code-block">
			<div class="code-header">
				<span class="code-title">.cursorrules (Combined)</span>
				<span class="code-lang">markdown</span>
			</div>
			<pre><code>{`# Project: My Next.js App

## Tech Stack (from community template)
- Next.js 15 with App Router
- TypeScript strict mode
- Supabase for backend
- Tailwind CSS

## Code Patterns (from community template)
- Server Components by default
- 'use client' only for interactivity
- Named exports preferred
... (paste community rules here)

## Security Rules (from VibeShip)
- NEVER use template literals for database queries
- ALWAYS check authentication in Server Actions
... (paste security rules here)`}</code></pre>
		</div>

		<h3>Option 2: Folder Structure (Recommended)</h3>

		<p>
			For larger projects, split rules into separate files. Cursor merges them automatically.
		</p>

		<div class="code-block">
			<div class="code-header">
				<span class="code-title">Project Structure</span>
				<span class="code-lang">shell</span>
			</div>
			<pre><code>{`project/
├── .cursor/
│   └── rules/
│       ├── framework.md     # Next.js patterns (from community)
│       ├── typescript.md    # TS strict rules (from community)
│       ├── security.md      # Security rules (from VibeShip)
│       └── project.md       # Project-specific context
└── ...`}</code></pre>
		</div>

		<h2>5 Best Practices for Using Community Rules</h2>

		<ol class="best-practices">
			<li>
				<strong>Review before copying.</strong> Not all community rules are high quality. Read through and remove anything that doesn't apply to your project.
			</li>
			<li>
				<strong>Start minimal, add as needed.</strong> A 500-line .cursorrules file hurts more than helps. AI has limited context - keep rules focused.
			</li>
			<li>
				<strong>Add security rules yourself.</strong> Community templates almost never include them. Use the security rules above.
			</li>
			<li>
				<strong>Version control your rules.</strong> Commit .cursorrules or .cursor/rules/ to Git. Your rules are project documentation.
			</li>
			<li>
				<strong>Update when you see patterns.</strong> If Cursor keeps making the same mistake, add a rule to prevent it. Your rules should grow with your project.
			</li>
		</ol>

		<h2>Quick Start: Get Productive in 5 Minutes</h2>

		<ol class="quick-start">
			<li>
				<strong>Find your stack</strong> on <a href="https://github.com/PatrickJS/awesome-cursorrules" target="_blank" rel="noopener">awesome-cursorrules</a> or <a href="https://cursor.directory" target="_blank" rel="noopener">cursor.directory</a>
			</li>
			<li>
				<strong>Copy the template</strong> to a new `.cursorrules` file in your project root
			</li>
			<li>
				<strong>Add security rules</strong> from the section above
			</li>
			<li>
				<strong>Customize</strong> for your project specifics (file structure, naming, conventions)
			</li>
			<li>
				<strong>Commit to Git</strong> so your team uses the same rules
			</li>
		</ol>

		<p>
			For more detailed setup instructions, see our complete <a href="/kb/prompts/cursor-rules/">Cursor Rules Guide</a> or check out <a href="/kb/prompts/cursor-rules-examples/">Cursor Rules Examples</a> with 20+ templates.
		</p>

		<!-- FAQ Section -->
		<h2>Frequently Asked Questions</h2>

		<div class="faq-list">
			{#each faqs as faq}
				<div class="faq-item">
					<h3>{faq.question}</h3>
					<p>{faq.answer}</p>
				</div>
			{/each}
		</div>

		<!-- Related Content -->
		<section class="article-section">
			<h2>Related content</h2>
			<div class="related-grid">
				<a href="/kb/prompts/cursor-rules/" class="card card-interactive related-card">
					<div class="related-card-category">Guide</div>
					<div class="related-card-title">Cursor Rules: Complete Guide</div>
					<p class="related-card-description">How to create and structure .cursorrules files</p>
				</a>
				<a href="/kb/prompts/cursor-rules-examples/" class="card card-interactive related-card">
					<div class="related-card-category">Examples</div>
					<div class="related-card-title">Cursor Rules Examples</div>
					<p class="related-card-description">20+ copy-paste templates with security patterns</p>
				</a>
				<a href="/kb/prompts/claude-md/" class="card card-interactive related-card">
					<div class="related-card-category">Guide</div>
					<div class="related-card-title">CLAUDE.md Guide</div>
					<p class="related-card-description">Configure Claude Code with project instructions</p>
				</a>
				<a href="/kb/vibe-coding/secure-vibe-coding-guide/" class="card card-interactive related-card">
					<div class="related-card-category">Pillar Guide</div>
					<div class="related-card-title">Secure Vibe Coding Guide</div>
					<p class="related-card-description">Ship fast without security nightmares</p>
				</a>
			</div>
		</section>
	</article>
</div>

<style>
	.intro {
		font-size: 1.125rem;
		color: var(--text-secondary);
		margin-bottom: 2rem;
		line-height: 1.7;
	}

	.badge-prompts {
		background: var(--violet);
		color: white;
	}

	.stats-row {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
		margin: 1.5rem 0 0.5rem;
	}

	.stat-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-radius: 8px;
		padding: 1.25rem;
		text-align: center;
	}

	.stat-number {
		font-size: 1.75rem;
		font-weight: 700;
		color: var(--green);
	}

	.stat-label {
		font-size: 0.875rem;
		color: var(--text-secondary);
		margin-top: 0.25rem;
	}

	.stat-note {
		font-size: 0.875rem;
		color: var(--text-tertiary);
		text-align: center;
		margin-bottom: 2rem;
	}

	.source-comparison {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5rem;
		margin: 1.5rem 0;
	}

	.source-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-radius: 8px;
		padding: 1.5rem;
	}

	.source-card h3 {
		margin: 0 0 0.25rem;
		font-size: 1.125rem;
	}

	.source-link {
		color: var(--text-tertiary);
		font-size: 0.875rem;
		margin-bottom: 1rem;
	}

	.source-card ul {
		margin: 0;
		padding-left: 1.25rem;
	}

	.source-card li {
		margin-bottom: 0.5rem;
		color: var(--text-secondary);
	}

	.source-best-for {
		margin-top: 1rem;
		padding-top: 1rem;
		border-top: 1px solid var(--border);
		font-size: 0.9rem;
	}

	.category-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.category-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-radius: 8px;
		padding: 1rem;
	}

	.category-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.75rem;
	}

	.category-name {
		font-weight: 600;
	}

	.category-count {
		font-size: 0.75rem;
		color: var(--text-tertiary);
		background: var(--bg-tertiary);
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
	}

	.category-examples {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
	}

	.example-tag {
		font-size: 0.75rem;
		color: var(--text-secondary);
		background: var(--bg-tertiary);
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
	}

	.featured-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.featured-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-radius: 8px;
		padding: 1.25rem;
	}

	.featured-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.5rem;
	}

	.featured-name {
		font-weight: 600;
	}

	.featured-stars {
		font-size: 0.75rem;
		color: var(--green);
	}

	.featured-description {
		color: var(--text-secondary);
		font-size: 0.9rem;
		margin: 0 0 0.75rem;
	}

	.featured-source {
		font-size: 0.75rem;
		color: var(--text-tertiary);
	}

	.best-practices,
	.quick-start {
		padding-left: 1.5rem;
	}

	.best-practices li,
	.quick-start li {
		margin-bottom: 1rem;
		line-height: 1.6;
	}

	@media (max-width: 768px) {
		.stats-row {
			grid-template-columns: repeat(2, 1fr);
		}

		.source-comparison,
		.featured-grid {
			grid-template-columns: 1fr;
		}

		.category-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 480px) {
		.category-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
