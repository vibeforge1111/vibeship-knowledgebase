<script lang="ts">
	import { Header } from '$lib/components/layout';

	const meta = {
		title: 'Windsurf Rules: Configure Cascade for Better Code',
		description: 'Learn how to set up Windsurf rules to control Cascade AI code generation. Configure .windsurf/rules/, activation modes, and security patterns for your vibe coding projects.',
		url: '/kb/prompts/windsurf-rules/'
	};

	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Prompts', href: '/kb/prompts' },
		{ label: 'Windsurf Rules' }
	];

	const faqs = [
		{
			question: 'Do Windsurf rules cost credits to use?',
			answer: 'No. Both Memories and Rules cost zero credits. You can create unlimited rule files without affecting your Windsurf subscription - rules only guide how Cascade uses its existing context window.'
		},
		{
			question: 'How many rule files can I create in .windsurf/rules/?',
			answer: 'Unlimited. Each file has a 12,000 character limit, but you can create as many files as needed. Use Glob or Model Decision activation to prevent loading unnecessary rules into every conversation.'
		},
		{
			question: 'Can I use Windsurf rules with other AI coding tools?',
			answer: 'No. Windsurf rules only work with Cascade in the Windsurf editor. However, the security patterns work with any tool - copy relevant sections to .cursorrules or CLAUDE.md for other editors.'
		},
		{
			question: "What's the difference between .windsurf/rules/ and global_rules.md?",
			answer: 'Files in .windsurf/rules/ apply only to that workspace and are version-controlled with your project. The global_rules.md file (in ~/.windsurf/) applies to ALL workspaces - use it for personal preferences or company-wide standards.'
		},
		{
			question: 'Should I use Always On activation for security rules?',
			answer: 'Yes for critical patterns like SQL injection and auth checks. Use Glob activation for framework-specific security to reduce context pollution. Avoid Always On for style preferences - use linters instead.'
		},
		{
			question: 'Why are my Windsurf rules not working?',
			answer: 'Check three things: 1) File is in .windsurf/rules/ directory (not project root), 2) Activation mode matches your use case, 3) Description field is clear for Model Decision mode. Test by asking Cascade to generate code that should trigger the rule.'
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

	const securityTemplate = `---
activation: always_on
---

# Security Standards

## SQL Injection Prevention
- ALWAYS use parameterized queries
- NEVER concatenate user input into SQL strings
- Use Prisma, Drizzle, or native parameterization

## Authentication & Authorization
- Check auth on EVERY server action and API route
- Use middleware for route protection
- Session tokens in HttpOnly cookies only

## Input Validation
- Validate ALL user input with Zod schemas
- Validate in server actions AND API routes
- Sanitize HTML input with DOMPurify

## Secret Management
- Secrets in .env files only, never commit to git
- Use process.env.VARIABLE_NAME server-side only
- Verify .env is in .gitignore`;

	const nextjsTemplate = `---
activation: always_on
---

# Next.js 14 + Supabase Standards

## Framework Patterns
- Use App Router, not Pages Router
- Server Components by default
- 'use client' only for hooks, event handlers, browser APIs

## Database & Auth
- All queries through Supabase client
- Row Level Security (RLS) policies required on all tables
- Auth checks in middleware: middleware.ts
- Use Supabase Auth, not custom JWT

## API Routes
- Use Server Actions for mutations
- API routes only for webhooks and third-party integrations
- Validate webhook signatures (Stripe, etc.)`;
</script>

<svelte:head>
	<title>{meta.title}</title>
	<meta name="description" content={meta.description} />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:url" content={meta.url} />
	<meta property="og:type" content="article" />
	<link rel="canonical" href="https://vibeship.co{meta.url}" />

	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"itemListElement": [
			{"@type": "ListItem", "position": 1, "name": "Knowledge Base", "item": "https://vibeship.co/kb"},
			{"@type": "ListItem", "position": 2, "name": "Prompts", "item": "https://vibeship.co/kb/prompts"},
			{"@type": "ListItem", "position": 3, "name": "Windsurf Rules"}
		]
	}
	</script>`}

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
		<header class="article-header">
			<div class="badge-row">
				<span class="badge badge-green">Config Guide</span>
				<span class="badge">Windsurf</span>
				<span class="badge">Cascade</span>
			</div>
			<h1>Windsurf Rules: Configure Cascade for Better Code</h1>
			<p class="text-secondary">Control how Cascade generates code with .windsurf/rules/</p>
		</header>

		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Windsurf rules are configuration files that control how Cascade generates code.</strong>
				Create them in <code>.windsurf/rules/</code> for workspace rules or <code>global_rules.md</code> for cross-project standards. Unlike auto-generated Memories, rules give you permanent control over security and coding patterns.
			</p>
		</div>

		<!-- What Are Windsurf Rules -->
		<section>
			<h2>What are Windsurf rules?</h2>
			<p>
				Windsurf rules are manually-defined configuration files that tell <a href="/kb/vibe-coding-tools/windsurf/">Cascade</a> - Codeium's AI agent - exactly how to write code for your project. They're the Windsurf equivalent of <a href="/kb/prompts/cursor-rules/">Cursor rules</a> or <a href="/kb/prompts/claude-md/">CLAUDE.md</a>.
			</p>
			<p>
				Unlike <strong>Memories</strong> (which Cascade auto-generates as it learns your codebase), rules are permanent instructions you write yourself. For vibe coders building fast with AI tools, rules are critical - they let you enforce security patterns, coding standards, and framework preferences that Cascade wouldn't otherwise know about.
			</p>
			<div class="alert alert-info">
				<strong>Key specs:</strong> Each rule file can contain up to 12,000 characters. Four activation modes control when rules apply: Manual, Always On, Model Decision, or Glob pattern matching.
			</div>
		</section>

		<!-- Popular Resources -->
		<section>
			<h2>Popular Windsurf rules resources</h2>
			<p>
				Get started faster with community-tested configurations:
			</p>
			<div class="resource-grid">
				<a href="https://docs.windsurf.com/windsurf/cascade/memories" target="_blank" rel="noopener" class="card card-interactive">
					<div class="resource-header">
						<span class="resource-icon">📖</span>
						<span class="resource-stars">Official Docs</span>
					</div>
					<span class="resource-title">Windsurf Documentation</span>
					<span class="resource-desc">Official guide to Memories and Rules from Codeium.</span>
				</a>
				<a href="https://cursor.directory" target="_blank" rel="noopener" class="card card-interactive">
					<div class="resource-header">
						<span class="resource-icon">📁</span>
						<span class="resource-stars">Community</span>
					</div>
					<span class="resource-title">cursor.directory</span>
					<span class="resource-desc">Rules templates that work in Windsurf with minor syntax changes.</span>
				</a>
			</div>
		</section>

		<!-- How to Set Up -->
		<section>
			<h2>How to set up Windsurf rules</h2>
			<p>Setting up Windsurf rules takes less than 5 minutes:</p>

			<div class="card step-card">
				<div class="step-header">
					<span class="step-number">1</span>
					<h3>Create your rules directory</h3>
				</div>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">Terminal</span>
					</div>
					<pre><code>mkdir -p .windsurf/rules</code></pre>
				</div>
			</div>

			<div class="card step-card">
				<div class="step-header">
					<span class="step-number">2</span>
					<h3>Create your first rule file</h3>
				</div>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">Terminal</span>
					</div>
					<pre><code># Workspace rule (project-specific)
touch .windsurf/rules/security.md

# Global rule (all workspaces)
touch ~/.windsurf/global_rules.md</code></pre>
				</div>
			</div>

			<div class="card step-card">
				<div class="step-header">
					<span class="step-number">3</span>
					<h3>Define activation mode and content</h3>
				</div>
				<p>Each rule file starts with YAML frontmatter specifying when to activate:</p>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">.windsurf/rules/security.md</span>
						<button class="copy-btn" onclick={() => copyCode(securityTemplate, 'security')}>
							{copied && copiedSection === 'security' ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre><code>{securityTemplate}</code></pre>
				</div>
			</div>

			<div class="card step-card">
				<div class="step-header">
					<span class="step-number">4</span>
					<h3>Test your rules</h3>
				</div>
				<p>Cascade reads rule files automatically - no restart needed. Test by asking Cascade to generate database code and verify it uses parameterized queries.</p>
			</div>
		</section>

		<!-- Memories vs Rules -->
		<section>
			<h2>Memories vs Rules: understanding the difference</h2>
			<p>
				Windsurf uses two systems to customize Cascade's behavior - understanding when to use each is critical for effective vibe coding.
			</p>

			<div class="comparison-table">
				<table>
					<thead>
						<tr>
							<th>Feature</th>
							<th>Memories</th>
							<th>Rules</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><strong>Created by</strong></td>
							<td>Cascade (auto)</td>
							<td>You (manual)</td>
						</tr>
						<tr>
							<td><strong>Scope</strong></td>
							<td>Workspace-specific</td>
							<td>Workspace or global</td>
						</tr>
						<tr>
							<td><strong>Credit cost</strong></td>
							<td>Zero</td>
							<td>Zero</td>
						</tr>
						<tr>
							<td><strong>Version control</strong></td>
							<td>No</td>
							<td>Yes (.windsurf/rules/)</td>
						</tr>
						<tr>
							<td><strong>Use for</strong></td>
							<td>Learning codebase patterns</td>
							<td>Enforcing standards</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="two-col">
				<div class="card">
					<h4>When to use Memories</h4>
					<p>Let Cascade discover your API structure, component patterns, and existing conventions automatically.</p>
				</div>
				<div class="card">
					<h4>When to use Rules</h4>
					<p>Enforce security requirements, coding standards that differ from model training, and framework-specific patterns AI tools commonly get wrong.</p>
				</div>
			</div>
		</section>

		<!-- Activation Modes -->
		<section>
			<h2>Rule activation modes</h2>
			<p>
				Windsurf provides four activation modes that control when Cascade applies your rules. Choosing the right mode prevents context pollution while ensuring critical rules always fire.
			</p>

			<div class="mode-grid">
				<div class="card mode-card">
					<div class="mode-header">
						<code>activation: manual</code>
					</div>
					<h4>Manual</h4>
					<p>Cascade only uses the rule when you <code>@mention</code> it by name. Use for specialized guidance that applies to specific tasks only.</p>
					<div class="mode-example">
						<span>Activate with:</span> "Update schema @database-migration-guide"
					</div>
				</div>

				<div class="card mode-card">
					<div class="mode-header">
						<code>activation: always_on</code>
					</div>
					<h4>Always On</h4>
					<p>Active in every conversation. Use sparingly for critical security or coding standards - too many slow down responses.</p>
					<div class="mode-example">
						<span>Best for:</span> Security rules, auth checks
					</div>
				</div>

				<div class="card mode-card">
					<div class="mode-header">
						<code>activation: model_decision</code>
					</div>
					<h4>Model Decision</h4>
					<p>Cascade activates based on natural language matching. Describe when to use the rule, and the model decides relevance.</p>
					<div class="mode-example">
						<span>Requires:</span> Clear description field
					</div>
				</div>

				<div class="card mode-card">
					<div class="mode-header">
						<code>activation: glob</code>
					</div>
					<h4>Glob Pattern</h4>
					<p>Activate automatically when working with files matching the pattern. Most precise option for framework-specific rules.</p>
					<div class="mode-example">
						<span>Example:</span> <code>patterns: ["*.test.ts"]</code>
					</div>
				</div>
			</div>

			<div class="alert alert-success">
				<strong>Best practice:</strong> Start with Manual or Glob, promote to Always On only for security-critical patterns.
			</div>
		</section>

		<!-- Security Rules -->
		<section class="security-section">
			<h2>Security rules for Windsurf</h2>
			<p>
				Security is where Windsurf rules deliver the most value. AI tools generate working code fast, but they prioritize functionality over security. Copy this template to <code>.windsurf/rules/security.md</code>:
			</p>

			<div class="security-categories">
				<div class="security-item">
					<h4>SQL Injection Prevention</h4>
					<div class="code-comparison">
						<div class="code-bad">
							<span class="label">❌ Vulnerable</span>
							<pre><code>const user = await db.query(
  `SELECT * FROM users WHERE email = '$&#123;email&#125;'`
)</code></pre>
						</div>
						<div class="code-good">
							<span class="label">✅ Secure</span>
							<pre><code>const user = await db.user.findUnique(&#123;
  where: &#123; email: userEmail &#125;
&#125;)</code></pre>
						</div>
					</div>
				</div>

				<div class="security-item">
					<h4>Authentication Checks</h4>
					<div class="code-comparison">
						<div class="code-bad">
							<span class="label">❌ Missing auth</span>
							<pre><code>export async function updateProfile(data) &#123;
  return await db.profile.update(&#123;
    where: &#123; id: data.id &#125;, data
  &#125;)
&#125;</code></pre>
						</div>
						<div class="code-good">
							<span class="label">✅ Auth verified</span>
							<pre><code>export async function updateProfile(data) &#123;
  const session = await getSession()
  if (!session) throw new Error('Unauthorized')
  // Verify ownership before update
  return await db.profile.update(...)
&#125;</code></pre>
						</div>
					</div>
				</div>

				<div class="security-item">
					<h4>Input Validation</h4>
					<div class="code-comparison">
						<div class="code-bad">
							<span class="label">❌ No validation</span>
							<pre><code>export async function createPost(title, content) &#123;
  return await db.post.create(&#123;
    data: &#123; title, content &#125;
  &#125;)
&#125;</code></pre>
						</div>
						<div class="code-good">
							<span class="label">✅ Zod validation</span>
							<pre><code>const PostSchema = z.object(&#123;
  title: z.string().min(1).max(200),
  content: z.string().max(5000)
&#125;)

export async function createPost(input) &#123;
  const data = PostSchema.parse(input)
  return await db.post.create(&#123; data &#125;)
&#125;</code></pre>
						</div>
					</div>
				</div>
			</div>

			<p>
				See our guides on <a href="/kb/security/vulnerabilities/sql-injection/">SQL injection</a>, <a href="/kb/security/vulnerabilities/missing-auth/">missing authentication</a>, and <a href="/kb/security/vulnerabilities/hardcoded-secrets/">hardcoded secrets</a> for more patterns.
			</p>
		</section>

		<!-- Stack Templates -->
		<section>
			<h2>Windsurf rules templates by stack</h2>
			<p>
				Different tech stacks need different patterns. Here's a copy-paste template for the most popular vibe coding stack:
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">.windsurf/rules/nextjs-supabase.md</span>
					<button class="copy-btn" onclick={() => copyCode(nextjsTemplate, 'nextjs')}>
						{copied && copiedSection === 'nextjs' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code>{nextjsTemplate}</code></pre>
			</div>

			<p>
				For more stack-specific templates, see our <a href="/kb/security/stacks/nextjs-supabase/">Next.js + Supabase security guide</a>.
			</p>
		</section>

		<!-- Windsurf vs Cursor -->
		<section>
			<h2>Windsurf rules vs Cursor rules</h2>
			<p>
				Both tools serve the same purpose but differ in implementation:
			</p>

			<div class="comparison-table">
				<table>
					<thead>
						<tr>
							<th>Feature</th>
							<th>Windsurf</th>
							<th>Cursor</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><strong>File location</strong></td>
							<td><code>.windsurf/rules/</code></td>
							<td><code>.cursor/rules/</code></td>
						</tr>
						<tr>
							<td><strong>Global rules</strong></td>
							<td><code>~/.windsurf/global_rules.md</code></td>
							<td><code>~/.cursor/rules/</code></td>
						</tr>
						<tr>
							<td><strong>Activation control</strong></td>
							<td>4 modes (Manual, Always On, Model Decision, Glob)</td>
							<td>4 modes (similar)</td>
						</tr>
						<tr>
							<td><strong>File size limit</strong></td>
							<td>12k characters per file</td>
							<td>No hard limit</td>
						</tr>
						<tr>
							<td><strong>Multiple files</strong></td>
							<td>Unlimited in rules/ directory</td>
							<td>Unlimited in rules/ directory</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="alert alert-success">
				<strong>Migration tip:</strong> If switching from Cursor to Windsurf, copy your <code>.cursor/rules/</code> content to <code>.windsurf/rules/</code> and update the frontmatter syntax.
			</div>
		</section>

		<!-- Best Practices -->
		<section>
			<h2>Best practices</h2>

			<div class="do-dont-grid">
				<div class="card do-box">
					<h4>✅ Do</h4>
					<ul>
						<li>Keep rules "simple, concise, and specific"</li>
						<li>Use bullet points for scannability</li>
						<li>Show before/after code examples</li>
						<li>Use Glob activation for framework-specific rules</li>
						<li>Test rules by generating relevant code</li>
						<li>Version control rules with your project</li>
					</ul>
				</div>
				<div class="card dont-box">
					<h4>❌ Don't</h4>
					<ul>
						<li>Write generic guidance already in model training</li>
						<li>Use Always On for everything (context pollution)</li>
						<li>Mix unrelated topics in one file</li>
						<li>Rely on descriptions alone - show code</li>
						<li>Store sensitive data in rules files</li>
						<li>Leave outdated framework patterns</li>
					</ul>
				</div>
			</div>

			<h3>Handling the 12k character limit</h3>
			<p>If you hit the limit, split by concern:</p>
			<ul>
				<li><code>security.md</code> - Auth, SQL injection, input validation</li>
				<li><code>react-patterns.md</code> - Component standards, hooks usage</li>
				<li><code>database.md</code> - Query patterns, migrations</li>
			</ul>
		</section>

		<!-- FAQ -->
		<section>
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

		<!-- Scanner CTA -->
		<section class="cta-box">
			<h2>Verify Your Rules Are Working</h2>
			<p>
				Windsurf rules help prevent vulnerabilities, but can't catch everything. <a href="https://scanner.vibeship.co">VibeShip Scanner</a> automatically detects security issues in your vibe coded projects - even ones that slip past your rules.
			</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">Scan Your Code Free</a>
		</section>

		<!-- Related Content -->
		<section>
			<h2>Related resources</h2>
			<div class="related-grid">
				<a href="/kb/prompts/cursor-rules/" class="related-card">
					<span class="related-card-category">Config Guide</span>
					<span class="related-card-title">Cursor Rules Complete Guide</span>
				</a>
				<a href="/kb/prompts/claude-md/" class="related-card">
					<span class="related-card-category">Config Guide</span>
					<span class="related-card-title">CLAUDE.md Guide</span>
				</a>
				<a href="/kb/vibe-coding-tools/windsurf/" class="related-card">
					<span class="related-card-category">Tool Guide</span>
					<span class="related-card-title">Windsurf Overview</span>
				</a>
				<a href="/kb/security/vulnerabilities/sql-injection/" class="related-card">
					<span class="related-card-category">Vulnerability</span>
					<span class="related-card-title">SQL Injection</span>
				</a>
				<a href="/kb/security/vulnerabilities/missing-auth/" class="related-card">
					<span class="related-card-category">Vulnerability</span>
					<span class="related-card-title">Missing Authentication</span>
				</a>
				<a href="/kb/security/stacks/nextjs-supabase/" class="related-card">
					<span class="related-card-category">Stack Guide</span>
					<span class="related-card-title">Next.js + Supabase Security</span>
				</a>
			</div>
		</section>

		<!-- External Resources -->
		<section>
			<h2>Official documentation</h2>
			<ul class="external-links">
				<li><a href="https://docs.windsurf.com/windsurf/cascade/memories" target="_blank" rel="noopener">Windsurf Memories & Rules Documentation</a> - Official Codeium docs</li>
				<li><a href="https://codeium.com/windsurf" target="_blank" rel="noopener">Windsurf by Codeium</a> - Download and getting started</li>
			</ul>
		</section>
	</article>
</div>

<style>
	/* Page-specific layout */
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

	code {
		font-family: 'JetBrains Mono', monospace;
		background: rgba(0,0,0,0.3);
		padding: 0.125rem 0.375rem;
		font-size: 0.9em;
	}

	a {
		color: var(--green-dim);
	}

	a:hover {
		text-decoration: underline;
	}

	/* Resource Grid */
	.resource-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.resource-grid .card {
		text-decoration: none;
	}

	.resource-grid .card:hover {
		text-decoration: none;
	}

	.resource-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
	}

	.resource-icon {
		font-size: 1rem;
	}

	.resource-stars {
		font-size: 0.7rem;
		color: var(--text-secondary);
		font-family: 'JetBrains Mono', monospace;
		text-transform: uppercase;
	}

	.resource-title {
		display: block;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 0.5rem;
	}

	.resource-desc {
		display: block;
		font-size: 0.85rem;
		color: var(--text-secondary);
		line-height: 1.5;
	}

	/* Step Cards */
	.step-card {
		margin-bottom: 1.5rem;
	}

	.step-header {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.step-number {
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--green-dim);
		color: white;
		font-weight: 700;
		font-size: 1.1rem;
		flex-shrink: 0;
	}

	.step-header h3 {
		margin: 0;
		font-size: 1.25rem;
	}

	/* Comparison Table */
	.comparison-table {
		overflow-x: auto;
		margin: 1.5rem 0;
	}

	/* Two Column Layout */
	.two-col {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.two-col h4 {
		margin-top: 0;
		color: var(--green-dim);
	}

	.two-col p {
		margin: 0;
		font-size: 0.9rem;
		color: var(--text-secondary);
	}

	/* Mode Grid */
	.mode-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.mode-header {
		margin-bottom: 0.5rem;
	}

	.mode-header code {
		font-size: 0.75rem;
		color: var(--green-dim);
		background: rgba(0, 196, 154, 0.1);
	}

	.mode-card h4 {
		margin: 0.5rem 0;
	}

	.mode-card p {
		font-size: 0.85rem;
		color: var(--text-secondary);
		margin-bottom: 0.75rem;
	}

	.mode-example {
		font-size: 0.8rem;
		padding: 0.5rem;
		background: var(--bg-primary);
		border: 1px solid var(--border);
	}

	.mode-example span {
		color: var(--text-secondary);
	}

	/* Security Section */
	.security-section {
		background: rgba(239, 68, 68, 0.05);
		border: 1px solid rgba(239, 68, 68, 0.2);
		padding: 2rem;
		margin: 2rem 0;
	}

	.security-section h2 {
		color: #f87171;
		border-bottom-color: rgba(239, 68, 68, 0.3);
	}

	.security-categories {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		margin: 1.5rem 0;
	}

	.security-item h4 {
		margin-bottom: 1rem;
		color: var(--text-primary);
	}

	.code-comparison {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1rem;
	}

	.code-bad, .code-good {
		background: #0d0d0d;
		border: 1px solid var(--border);
		overflow: hidden;
	}

	.code-bad .label, .code-good .label {
		display: block;
		padding: 0.5rem 1rem;
		font-size: 0.75rem;
		font-weight: 600;
	}

	.code-bad .label {
		background: rgba(239, 68, 68, 0.2);
		color: #f87171;
	}

	.code-good .label {
		background: rgba(0, 196, 154, 0.2);
		color: var(--green-dim);
	}

	.code-bad pre, .code-good pre {
		padding: 1rem;
		font-size: 0.75rem;
	}

	/* Do/Don't Grid */
	.do-dont-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.do-box {
		background: rgba(0, 196, 154, 0.05);
		border-color: rgba(0, 196, 154, 0.3);
	}

	.dont-box {
		background: rgba(239, 68, 68, 0.05);
		border-color: rgba(239, 68, 68, 0.3);
	}

	.do-box h4 {
		color: var(--green-dim);
		margin-top: 0;
	}

	.dont-box h4 {
		color: #f87171;
		margin-top: 0;
	}

	.do-box ul, .dont-box ul {
		margin: 0;
		padding-left: 1.25rem;
	}

	.do-box li, .dont-box li {
		margin-bottom: 0.5rem;
		font-size: 0.9rem;
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

	/* Responsive */
	@media (max-width: 768px) {
		h1 {
			font-size: 1.75rem;
		}

		.step-header {
			flex-direction: column;
			align-items: flex-start;
		}

		.code-comparison {
			grid-template-columns: 1fr;
		}
	}
</style>
