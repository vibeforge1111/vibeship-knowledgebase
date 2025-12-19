<script lang="ts">
	import { Header } from '$lib/components/layout';

	const meta = {
		title: 'Cline Rules: The Complete .clinerules Guide',
		description: 'Learn how to set up Cline rules to control AI code generation. Configure .clinerules/ folder structure, numeric prefixes, rules bank pattern, and security standards for your vibe coding projects.',
		url: '/kb/prompts/cline-rules/'
	};

	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Prompts', href: '/kb/prompts' },
		{ label: 'Cline Rules' }
	];

	const faqs = [
		{
			question: 'Does Cline cost money to use?',
			answer: 'Cline itself is free and open source. You pay only for the AI model API costs (OpenAI, Anthropic, etc.). This makes it ideal for vibe coders who want full control over their AI spending with no subscription lock-in.'
		},
		{
			question: 'How do numeric prefixes affect rule ordering?',
			answer: 'Files are loaded in alphanumeric order. Use 01-, 02-, 03- prefixes to control which rules Cline sees first. Critical rules like security (01-security.md) should load before coding preferences (05-style.md) to ensure they take priority.'
		},
		{
			question: 'What is the rules bank pattern?',
			answer: 'The rules bank pattern separates rules into "active" (.clinerules/) and "available" (.clinerules-bank/) folders. Move rules between folders to enable/disable them without deleting. This lets you maintain stack-specific rule sets and swap contexts quickly.'
		},
		{
			question: 'Can Cline use AGENTS.md like other tools?',
			answer: 'Yes. Cline supports AGENTS.md as a fallback when no .clinerules/ folder exists. This provides cross-tool compatibility - the same AGENTS.md file works in Cursor, Claude Code, and Cline.'
		},
		{
			question: 'Where should I put global rules that apply to all projects?',
			answer: 'Create rules in ~/Documents/Cline/Rules/ (or the equivalent on your OS). These global rules apply to every workspace, making them ideal for personal coding preferences and company-wide security standards.'
		},
		{
			question: "Why aren't my Cline rules being applied?",
			answer: 'Check three things: 1) Folder is named .clinerules/ (not .cline-rules or clinerules), 2) Files use .md extension, 3) Rules are in project root, not a subdirectory. Restart VS Code if rules still do not apply.'
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

	const securityTemplate = `# Security Standards

## SQL Injection Prevention
- ALWAYS use parameterized queries
- NEVER concatenate user input into SQL strings
- Use Prisma, Drizzle, or native parameterization

## Authentication & Authorization
- Check auth on EVERY server action and API route
- Use middleware for route protection
- Session tokens in HttpOnly cookies only

## Human-in-the-Loop Verification
- Flag any new API endpoints for review before approval
- Highlight all database schema changes
- Mark authentication logic for explicit approval

## Input Validation
- Validate ALL user input with Zod schemas
- Validate in server actions AND API routes
- Sanitize HTML input with DOMPurify

## Secret Management
- Secrets in .env files only, never commit to git
- Use process.env.VARIABLE_NAME server-side only
- Verify .env is in .gitignore`;

	const nextjsTemplate = `# Next.js 14 + Supabase Standards

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
- Validate webhook signatures (Stripe, etc.)

## Type Safety
- Strict TypeScript, no 'any' types
- Generate types from Supabase schema
- Zod validation on all external input`;

	const folderStructure = `.clinerules/
├── 01-security.md       # Critical - always first
├── 02-architecture.md   # Framework patterns
├── 03-database.md       # Query standards
├── 04-testing.md        # Test requirements
└── 05-style.md          # Coding preferences`;

	const bankStructure = `project/
├── .clinerules/              # Active rules (loaded by Cline)
│   ├── 01-security.md
│   └── 02-nextjs.md
│
└── .clinerules-bank/         # Available rules (not loaded)
    ├── react-native.md       # Mobile project rules
    ├── python-backend.md     # Backend rules
    └── testing-e2e.md        # E2E testing rules`;
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
			{"@type": "ListItem", "position": 3, "name": "Cline Rules"}
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
				<span class="badge">Cline</span>
				<span class="badge">VS Code</span>
			</div>
			<h1>Cline Rules: The Complete .clinerules Guide</h1>
			<p class="text-secondary">Control Cline's AI code generation with organized rule files</p>
		</header>

		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Cline rules are markdown configuration files that control how the Cline AI assistant generates code.</strong>
				Create them in <code>.clinerules/</code> with numeric prefixes (01-security.md, 02-coding.md) for ordered loading. Cline is free, open-source, and uses a human-in-the-loop approach - perfect for vibe coders who want AI assistance with manual approval gates.
			</p>
		</div>

		<!-- What Are Cline Rules -->
		<section>
			<h2>What are Cline rules?</h2>
			<p>
				Cline rules are markdown files that tell Cline - the free, open-source VS Code AI assistant - exactly how to write code for your project. They're Cline's equivalent of <a href="/kb/prompts/cursor-rules/">Cursor rules</a> or <a href="/kb/prompts/windsurf-rules/">Windsurf rules</a>.
			</p>
			<p>
				What makes Cline unique is its <strong>human-in-the-loop</strong> philosophy. Unlike other vibe coding tools that execute changes automatically, Cline shows you every file modification and command before running it. Rules help standardize what Cline proposes, while you maintain approval control over what actually gets executed.
			</p>
			<div class="alert alert-info">
				<strong>Key advantage:</strong> Cline is completely free and open source. You only pay for API costs from your chosen model provider (OpenAI, Anthropic, etc.) - no subscription fees or usage limits from the tool itself.
			</div>
		</section>

		<!-- Popular Resources -->
		<section>
			<h2>Popular Cline rules resources</h2>
			<p>
				Get started faster with community configurations and official documentation:
			</p>
			<div class="resource-grid">
				<a href="https://github.com/cline/cline" target="_blank" rel="noopener" class="card card-interactive">
					<div class="resource-header">
						<span class="resource-icon">⭐</span>
						<span class="resource-stars">18k+ stars</span>
					</div>
					<span class="resource-title">Cline GitHub Repository</span>
					<span class="resource-desc">Official source code, documentation, and community discussions.</span>
				</a>
				<a href="https://docs.cline.bot" target="_blank" rel="noopener" class="card card-interactive">
					<div class="resource-header">
						<span class="resource-icon">📖</span>
						<span class="resource-stars">Official Docs</span>
					</div>
					<span class="resource-title">Cline Documentation</span>
					<span class="resource-desc">Official guides for configuration, rules, and best practices.</span>
				</a>
				<a href="https://github.com/PatrickJS/awesome-cursorrules" target="_blank" rel="noopener" class="card card-interactive">
					<div class="resource-header">
						<span class="resource-icon">📖</span>
						<span class="resource-stars">36k+ stars</span>
					</div>
					<span class="resource-title">awesome-cursorrules</span>
					<span class="resource-desc">Rules templates that work in Cline with minor format changes.</span>
				</a>
				<a href="/kb/prompts/claude-md/" class="card card-interactive">
					<div class="resource-header">
						<span class="resource-icon">🔗</span>
						<span class="resource-stars">Cross-tool</span>
					</div>
					<span class="resource-title">CLAUDE.md Guide</span>
					<span class="resource-desc">Claude Code configuration - similar cross-tool config pattern.</span>
				</a>
			</div>
		</section>

		<!-- How to Set Up -->
		<section>
			<h2>How to set up Cline rules</h2>
			<p>Setting up Cline rules takes less than 5 minutes:</p>

			<div class="card step-card">
				<div class="step-header">
					<span class="step-number">1</span>
					<h3>Install Cline extension</h3>
				</div>
				<p>Search for "Cline" in VS Code extensions marketplace or run:</p>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">VS Code Command Palette</span>
					</div>
					<pre><code>ext install saoudrizwan.claude-dev</code></pre>
				</div>
			</div>

			<div class="card step-card">
				<div class="step-header">
					<span class="step-number">2</span>
					<h3>Create your rules directory</h3>
				</div>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">Terminal</span>
					</div>
					<pre><code>mkdir .clinerules</code></pre>
				</div>
			</div>

			<div class="card step-card">
				<div class="step-header">
					<span class="step-number">3</span>
					<h3>Create rule files with numeric prefixes</h3>
				</div>
				<p>Use numeric prefixes to control loading order. Critical rules (like security) should load first:</p>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">Recommended structure</span>
					</div>
					<pre><code>{folderStructure}</code></pre>
				</div>
			</div>

			<div class="card step-card">
				<div class="step-header">
					<span class="step-number">4</span>
					<h3>Add your security rules</h3>
				</div>
				<p>Start with security rules since they're most critical for vibe coding projects:</p>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">.clinerules/01-security.md</span>
						<button class="copy-btn" onclick={() => copyCode(securityTemplate, 'security')}>
							{copied && copiedSection === 'security' ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre><code>{securityTemplate}</code></pre>
				</div>
			</div>

			<div class="card step-card">
				<div class="step-header">
					<span class="step-number">5</span>
					<h3>Test your rules</h3>
				</div>
				<p>Cline reads rule files automatically when you open a conversation. Test by asking Cline to generate database code and verify it proposes parameterized queries for your approval.</p>
			</div>
		</section>

		<!-- Numeric Prefix System -->
		<section>
			<h2>Understanding numeric prefixes</h2>
			<p>
				Cline loads rules in alphanumeric order, making numeric prefixes a powerful organization tool. Rules that load first have the strongest influence on AI behavior.
			</p>

			<div class="prefix-table">
				<table>
					<thead>
						<tr>
							<th>Prefix</th>
							<th>Purpose</th>
							<th>Example Content</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>01-</code></td>
							<td>Critical security</td>
							<td>SQL injection, auth checks, input validation</td>
						</tr>
						<tr>
							<td><code>02-</code></td>
							<td>Architecture</td>
							<td>Framework patterns, component structure</td>
						</tr>
						<tr>
							<td><code>03-</code></td>
							<td>Database</td>
							<td>Query patterns, ORM usage, migrations</td>
						</tr>
						<tr>
							<td><code>04-</code></td>
							<td>Testing</td>
							<td>Test requirements, coverage standards</td>
						</tr>
						<tr>
							<td><code>05-</code></td>
							<td>Style</td>
							<td>Naming conventions, formatting preferences</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="alert alert-success">
				<strong>Best practice:</strong> Keep 01-security.md focused and short (under 500 words). Long security rules get skipped. Be specific and actionable.
			</div>
		</section>

		<!-- Rules Bank Pattern -->
		<section>
			<h2>The rules bank pattern</h2>
			<p>
				The rules bank pattern solves a common vibe coding problem: managing different rule sets for different project types. Instead of deleting and recreating rules, maintain a "bank" of available rules you can swap in and out.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Rules bank structure</span>
				</div>
				<pre><code>{bankStructure}</code></pre>
			</div>

			<h3>How to use the rules bank</h3>
			<div class="two-col">
				<div class="card">
					<h4>Switching to mobile development</h4>
					<div class="code-block code-mini">
						<pre><code># Move web rules to bank
mv .clinerules/02-nextjs.md .clinerules-bank/

# Activate mobile rules
mv .clinerules-bank/react-native.md .clinerules/02-react-native.md</code></pre>
					</div>
				</div>
				<div class="card">
					<h4>Adding E2E testing rules</h4>
					<div class="code-block code-mini">
						<pre><code># Add testing rules to active set
cp .clinerules-bank/testing-e2e.md .clinerules/04-testing-e2e.md</code></pre>
					</div>
				</div>
			</div>

			<p>
				This pattern keeps your rules organized and prevents the "rule overload" problem where too many rules compete for AI attention.
			</p>
		</section>

		<!-- Global vs Project Rules -->
		<section>
			<h2>Global rules vs project rules</h2>
			<p>
				Cline supports both project-specific and global rules. Understanding when to use each is key to effective vibe coding.
			</p>

			<div class="comparison-table">
				<table>
					<thead>
						<tr>
							<th>Feature</th>
							<th>Project Rules</th>
							<th>Global Rules</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><strong>Location</strong></td>
							<td><code>.clinerules/</code> in project root</td>
							<td><code>~/Documents/Cline/Rules/</code></td>
						</tr>
						<tr>
							<td><strong>Scope</strong></td>
							<td>This workspace only</td>
							<td>All workspaces</td>
						</tr>
						<tr>
							<td><strong>Version control</strong></td>
							<td>Yes - commit with project</td>
							<td>No - personal machine only</td>
						</tr>
						<tr>
							<td><strong>Best for</strong></td>
							<td>Stack-specific patterns, team standards</td>
							<td>Personal preferences, company security</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="two-col">
				<div class="card">
					<h4>Use project rules for</h4>
					<ul>
						<li>Framework-specific patterns (Next.js, SvelteKit)</li>
						<li>Database conventions (Prisma, Drizzle)</li>
						<li>Team coding standards</li>
						<li>Project architecture decisions</li>
					</ul>
				</div>
				<div class="card">
					<h4>Use global rules for</h4>
					<ul>
						<li>Personal coding preferences</li>
						<li>Company-wide security requirements</li>
						<li>Cross-project patterns you always want</li>
						<li>API key handling standards</li>
					</ul>
				</div>
			</div>
		</section>

		<!-- AGENTS.md Fallback -->
		<section>
			<h2>AGENTS.md fallback support</h2>
			<p>
				Cline supports AGENTS.md as a fallback when no <code>.clinerules/</code> folder exists. This provides cross-tool compatibility for teams using multiple AI coding assistants.
			</p>

			<div class="alert alert-info">
				<strong>Load order:</strong> Cline checks for rules in this order:
				<ol style="margin: 0.5rem 0 0 1.5rem;">
					<li><code>.clinerules/</code> folder (preferred)</li>
					<li><code>AGENTS.md</code> in project root</li>
					<li>Global rules from <code>~/Documents/Cline/Rules/</code></li>
				</ol>
			</div>

			<p>
				If your team uses Cursor, Claude Code, and Cline across different developers, AGENTS.md provides a single source of truth that all tools respect.
			</p>
		</section>

		<!-- Human in the Loop -->
		<section class="human-section">
			<h2>Human-in-the-loop security advantage</h2>
			<p>
				Cline's human-in-the-loop approach provides an extra security layer that other vibe coding tools lack. Every file change and terminal command requires your explicit approval before execution.
			</p>

			<div class="approval-flow">
				<div class="flow-step">
					<span class="flow-number">1</span>
					<span class="flow-label">AI Proposes</span>
					<span class="flow-desc">Cline shows code changes in diff view</span>
				</div>
				<div class="flow-arrow">→</div>
				<div class="flow-step">
					<span class="flow-number">2</span>
					<span class="flow-label">You Review</span>
					<span class="flow-desc">Check for security issues, logic errors</span>
				</div>
				<div class="flow-arrow">→</div>
				<div class="flow-step">
					<span class="flow-number">3</span>
					<span class="flow-label">Approve/Reject</span>
					<span class="flow-desc">Accept, modify, or reject changes</span>
				</div>
			</div>

			<h3>Rules that leverage human-in-the-loop</h3>
			<p>Write rules that flag specific patterns for extra scrutiny:</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">.clinerules/01-security.md (approval gates)</span>
				</div>
				<pre><code># Human Review Requirements

## Always flag for review:
- New API endpoints (security surface)
- Database schema changes (data integrity)
- Authentication/authorization logic
- Environment variable usage
- Third-party API integrations
- File system operations

## Explain before proposing:
When suggesting changes to these areas, first explain:
1. What security implications exist
2. Why this approach is safe
3. What alternatives were considered</code></pre>
			</div>
		</section>

		<!-- Security Rules -->
		<section class="security-section">
			<h2>Security rules for Cline</h2>
			<p>
				Security rules are where Cline's manual approval flow shines. AI generates fast, but you verify before it executes. Copy this template to <code>.clinerules/01-security.md</code>:
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
			<h2>Cline rules templates by stack</h2>
			<p>
				Different tech stacks need different patterns. Here's a copy-paste template for the most popular vibe coding stack:
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">.clinerules/02-nextjs-supabase.md</span>
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

		<!-- Cline vs Other Tools -->
		<section>
			<h2>Cline rules vs other AI coding tools</h2>
			<p>
				Each vibe coding tool handles configuration differently. Here's how Cline compares:
			</p>

			<div class="comparison-table">
				<table>
					<thead>
						<tr>
							<th>Feature</th>
							<th>Cline</th>
							<th>Cursor</th>
							<th>Windsurf</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><strong>Rules location</strong></td>
							<td><code>.clinerules/</code></td>
							<td><code>.cursor/rules/</code></td>
							<td><code>.windsurf/rules/</code></td>
						</tr>
						<tr>
							<td><strong>Format</strong></td>
							<td>Markdown files</td>
							<td>Markdown + frontmatter</td>
							<td>Markdown + frontmatter</td>
						</tr>
						<tr>
							<td><strong>Ordering</strong></td>
							<td>Numeric prefixes</td>
							<td>Activation modes</td>
							<td>Activation modes</td>
						</tr>
						<tr>
							<td><strong>AGENTS.md support</strong></td>
							<td>Yes (fallback)</td>
							<td>Yes</td>
							<td>No</td>
						</tr>
						<tr>
							<td><strong>Execution model</strong></td>
							<td>Human-in-the-loop</td>
							<td>Auto-execute</td>
							<td>Auto-execute</td>
						</tr>
						<tr>
							<td><strong>Pricing</strong></td>
							<td>Free (pay for API)</td>
							<td>$20/month</td>
							<td>$15/month</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="alert alert-success">
				<strong>Migration tip:</strong> Rules from Cursor or Windsurf work in Cline - just remove the YAML frontmatter and rename files with numeric prefixes.
			</div>
		</section>

		<!-- Best Practices -->
		<section>
			<h2>Best practices</h2>

			<div class="do-dont-grid">
				<div class="card do-box">
					<h4>✅ Do</h4>
					<ul>
						<li>Use numeric prefixes for predictable ordering</li>
						<li>Keep security rules short and specific</li>
						<li>Show before/after code examples</li>
						<li>Use the rules bank pattern for multi-stack work</li>
						<li>Review all proposed changes carefully</li>
						<li>Version control your .clinerules/ folder</li>
					</ul>
				</div>
				<div class="card dont-box">
					<h4>❌ Don't</h4>
					<ul>
						<li>Write essays - be concise</li>
						<li>Mix unrelated topics in one file</li>
						<li>Auto-approve without reviewing</li>
						<li>Store API keys in rules files</li>
						<li>Skip the 01- prefix for security</li>
						<li>Overload with too many rules (context pollution)</li>
					</ul>
				</div>
			</div>

			<h3>Optimal rule file length</h3>
			<p>Keep each rule file focused:</p>
			<ul>
				<li><strong>Security rules:</strong> 200-500 words (critical, loaded first)</li>
				<li><strong>Architecture rules:</strong> 300-600 words (framework patterns)</li>
				<li><strong>Style rules:</strong> 100-300 words (least critical, loaded last)</li>
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
				Cline's human-in-the-loop helps catch issues, but some vulnerabilities slip through manual review. <a href="https://scanner.vibeship.co">VibeShip Scanner</a> automatically detects security issues in your vibe coded projects - a second pair of eyes for your code.
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
				<a href="/kb/prompts/windsurf-rules/" class="related-card">
					<span class="related-card-category">Config Guide</span>
					<span class="related-card-title">Windsurf Rules Guide</span>
				</a>
				<a href="/kb/prompts/claude-md/" class="related-card">
					<span class="related-card-category">Config Guide</span>
					<span class="related-card-title">CLAUDE.md Guide</span>
				</a>
				<a href="/kb/prompts/how-to-use-cursor-rules/" class="related-card">
					<span class="related-card-category">Tutorial</span>
					<span class="related-card-title">How to Use Cursor Rules</span>
				</a>
				<a href="/kb/security/vulnerabilities/sql-injection/" class="related-card">
					<span class="related-card-category">Vulnerability</span>
					<span class="related-card-title">SQL Injection</span>
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
				<li><a href="https://github.com/cline/cline" target="_blank" rel="noopener">Cline GitHub Repository</a> - Official source, issues, and discussions</li>
				<li><a href="https://docs.cline.bot" target="_blank" rel="noopener">Cline Documentation</a> - Official configuration guides</li>
				<li><a href="https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev" target="_blank" rel="noopener">VS Code Marketplace</a> - Install Cline extension</li>
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

	ul {
		padding-left: 1.5rem;
		margin-bottom: 1rem;
	}

	li {
		margin-bottom: 0.5rem;
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

	.step-card p {
		margin-bottom: 0.75rem;
	}

	/* Code Mini (inside cards) */
	.code-mini pre {
		padding: 0.75rem;
		font-size: 0.75rem;
	}

	/* Tables */
	.comparison-table, .prefix-table {
		overflow-x: auto;
		margin: 1.5rem 0;
	}

	/* Two Column Layout */
	.two-col {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.two-col h4 {
		margin-top: 0;
		color: var(--green-dim);
	}

	.two-col ul {
		margin: 0;
		padding-left: 1.25rem;
	}

	.two-col li {
		font-size: 0.9rem;
	}

	/* Human in the Loop Section */
	.human-section {
		background: rgba(99, 102, 241, 0.05);
		border: 1px solid rgba(99, 102, 241, 0.2);
		padding: 2rem;
		margin: 2rem 0;
	}

	.human-section h2 {
		color: #818cf8;
		border-bottom-color: rgba(99, 102, 241, 0.3);
	}

	.approval-flow {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		flex-wrap: wrap;
		margin: 2rem 0;
		padding: 1.5rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
	}

	.flow-step {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		min-width: 120px;
	}

	.flow-number {
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #818cf8;
		color: white;
		font-weight: 700;
		border-radius: 50%;
		margin-bottom: 0.5rem;
	}

	.flow-label {
		font-weight: 600;
		margin-bottom: 0.25rem;
	}

	.flow-desc {
		font-size: 0.8rem;
		color: var(--text-secondary);
	}

	.flow-arrow {
		font-size: 1.5rem;
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

		.approval-flow {
			flex-direction: column;
		}

		.flow-arrow {
			transform: rotate(90deg);
		}
	}
</style>
