<script lang="ts">
	import { Header } from '$lib/components/layout';

	const meta = {
		title: 'GitHub Copilot Instructions: Complete Setup Guide',
		description: 'Set up GitHub Copilot custom instructions with copilot-instructions.md for better AI code generation. Path-specific rules, AGENTS.md, and security patterns.',
		url: '/kb/prompts/copilot-instructions/'
	};

	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Prompts', href: '/kb/prompts' },
		{ label: 'Copilot Instructions' }
	];

	const faqs = [
		{
			question: 'Do GitHub Copilot Instructions work in all editors?',
			answer: 'Yes. GitHub Copilot Instructions work in VS Code, JetBrains IDEs, Visual Studio, Neovim, and GitHub.com. Once you commit .github/copilot-instructions.md to your repository, all team members see suggestions based on those instructions regardless of their editor.'
		},
		{
			question: 'How do I test if Copilot is reading my instructions?',
			answer: 'Write a code comment requesting something specific from your instructions (like "create a validated API route") and check if Copilot follows your patterns. If it suggests Zod validation or your auth patterns, the instructions are working. VS Code also shows which files contributed to context.'
		},
		{
			question: 'Can I have different instructions for different branches?',
			answer: 'Yes. Copilot reads instructions from the current branch, so feature branches can have different instructions than main. This is useful for testing new architectural patterns or security rules before applying them repository-wide.'
		},
		{
			question: 'Do instructions apply to Copilot Chat and inline suggestions?',
			answer: 'Yes. According to GitHub documentation, Copilot uses instructions for both inline suggestions and chat responses. When you ask Copilot Chat to "create an API route," it applies your security rules and framework patterns from your instruction files.'
		},
		{
			question: 'What is the difference between .instructions.md and copilot-instructions.md?',
			answer: 'copilot-instructions.md in .github/ applies to all requests repository-wide. Files ending in .instructions.md in .github/instructions/ use applyTo frontmatter for path-specific rules - different instructions for different parts of your codebase.'
		},
		{
			question: 'Does Copilot support AGENTS.md like other AI tools?',
			answer: 'Yes. Since August 2025, GitHub Copilot coding agent supports AGENTS.md files alongside copilot-instructions.md. It also supports CLAUDE.md and GEMINI.md for cross-tool compatibility. The nearest AGENTS.md file in the directory tree takes precedence.'
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

	const securityTemplate = `# Security Requirements

## Database Queries
ALWAYS use parameterized queries. NEVER concatenate user input into SQL.

## Input Validation
All user input MUST be validated with Zod schemas before processing.

## Authentication
All API routes MUST verify authentication before processing requests.
Check session with getServerSession() or equivalent.

## Authorization
Use Row Level Security (RLS) for data access control.
Never query data without checking user permissions.

## Secrets Management
NEVER hardcode secrets, API keys, or credentials.
Use environment variables: process.env.VARIABLE_NAME

## Error Handling
Log errors internally but return generic messages to users.
Never expose stack traces or internal details.`;

	const nextjsTemplate = `# Next.js Project Instructions

## Overview
- Framework: Next.js 14 (App Router)
- Language: TypeScript (strict mode)
- Database: Supabase (PostgreSQL with RLS)
- Validation: Zod
- Auth: NextAuth.js v5

## Build Commands
- Install: \`npm install\`
- Dev: \`npm run dev\` (localhost:3000)
- Build: \`npm run build\`
- Test: \`npm test\`

## Architecture
- \`/app\` - Pages and API routes
- \`/components\` - React components
- \`/lib/supabase\` - Database client
- \`/lib/validations\` - Zod schemas
- \`/types\` - TypeScript types

## Coding Standards
- Use 'use client' for interactive components
- Use 'use server' for server actions
- All API routes must validate session
- All database queries use Supabase RLS
- All inputs validated with Zod

## Security
- Parameterized queries only (use Supabase client)
- Validate all user input with Zod
- Check authentication in API routes
- Environment variables for secrets
- Generic error messages to users`;

	const pathSpecificExample = `---
applyTo: "app/api/**/*.ts"
excludeAgent: "code-review"
---

# API Route Instructions

All API routes must:
- Validate input with Zod schemas
- Use Supabase RLS for authorization
- Return proper HTTP status codes
- Include error handling with try/catch
- Log errors but return generic messages`;

	const folderStructure = `.github/
├── copilot-instructions.md              # Repository-wide (all requests)
└── instructions/
    ├── api-routes.instructions.md       # API-specific rules
    ├── components.instructions.md       # Component patterns
    ├── database.instructions.md         # Database queries
    └── security.instructions.md         # Security requirements`;
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
			{"@type": "ListItem", "position": 3, "name": "Copilot Instructions"}
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
				<span class="badge badge-low">Config Guide</span>
				<span class="badge">GitHub Copilot</span>
				<span class="badge">Official</span>
			</div>
			<h1>GitHub Copilot Instructions: Customize Your AI Pair Programmer</h1>
			<p class="subtitle">Configure .github/copilot-instructions.md for better AI code generation</p>
		</header>

		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>GitHub Copilot Instructions are markdown files that teach Copilot your project's architecture, build process, and security requirements.</strong>
				Only 55% of AI-generated code meets security standards (<a href="https://cset.georgetown.edu/article/can-ai-write-secure-code/" target="_blank" rel="noopener">Georgetown, 2024</a>). Custom instructions fix this. Create <code>.github/copilot-instructions.md</code> for repository-wide rules or <code>.github/instructions/*.instructions.md</code> for path-specific patterns.
			</p>
		</div>

		<!-- What Are Copilot Instructions -->
		<section class="article-section">
			<h2>What are GitHub Copilot Instructions?</h2>
			<p>
				GitHub Copilot Instructions are configuration files that teach Copilot about your specific project. Think of them as a training manual for your AI pair programmer - instead of getting generic code suggestions, Copilot learns your frameworks, security patterns, and project structure.
			</p>
			<p>
				These instructions live in <code>.github/copilot-instructions.md</code> for repository-wide guidance, or in <code>.github/instructions/*.instructions.md</code> for path-specific rules. When you're vibe coding with Copilot, these files ensure the AI generates code that matches your project's patterns rather than generic examples.
			</p>
			<div class="alert alert-info">
				<div class="alert-title">Key advantage</div>
				<p>Copilot Instructions work across all editors where Copilot is installed - VS Code, JetBrains IDEs, Visual Studio, Neovim, and GitHub.com. One config file, consistent suggestions everywhere.</p>
			</div>
		</section>

		<!-- Popular Resources -->
		<section class="article-section">
			<h2>Where can I find Copilot instruction templates?</h2>
			<p>
				Get started faster with official documentation and community configurations:
			</p>
			<div class="resource-grid">
				<a href="https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot" target="_blank" rel="noopener" class="card card-interactive resource-card">
					<span class="resource-meta">📖 Official Docs</span>
					<span class="resource-title">GitHub Documentation</span>
					<span class="resource-desc">Official guide to custom instructions from GitHub.</span>
				</a>
				<a href="https://github.com/github/awesome-copilot" target="_blank" rel="noopener" class="card card-interactive resource-card">
					<span class="resource-meta">⭐ 14.6k stars</span>
					<span class="resource-title">awesome-copilot</span>
					<span class="resource-desc">Community instructions, prompts, and configurations from GitHub.</span>
				</a>
				<a href="https://code.visualstudio.com/docs/copilot/customization/custom-instructions" target="_blank" rel="noopener" class="card card-interactive resource-card">
					<span class="resource-meta">💻 VS Code</span>
					<span class="resource-title">VS Code Custom Instructions</span>
					<span class="resource-desc">VS Code-specific settings and configuration options.</span>
				</a>
				<a href="https://github.blog/ai-and-ml/github-copilot/5-tips-for-writing-better-custom-instructions-for-copilot/" target="_blank" rel="noopener" class="card card-interactive resource-card">
					<span class="resource-meta">💡 GitHub Blog</span>
					<span class="resource-title">5 Tips for Better Instructions</span>
					<span class="resource-desc">Official best practices from GitHub's AI team.</span>
				</a>
			</div>
		</section>

		<!-- How to Set Up -->
		<section class="article-section">
			<h2>How to set up Copilot Instructions</h2>
			<p>Setting up GitHub Copilot Instructions requires creating a markdown file in your repository's <code>.github</code> folder:</p>

			<div class="step-list">
				<div class="step-item">
					<span class="step-number">1</span>
					<div class="step-content">
						<h3>Create the .github folder</h3>
						<div class="code-block">
							<div class="code-block-header">
								<span class="code-block-lang">Terminal</span>
							</div>
							<pre><code># Create .github folder if it doesn't exist
mkdir -p .github</code></pre>
						</div>
					</div>
				</div>

				<div class="step-item">
					<span class="step-number">2</span>
					<div class="step-content">
						<h3>Create copilot-instructions.md</h3>
						<div class="code-block">
							<div class="code-block-header">
								<span class="code-block-lang">Terminal</span>
							</div>
							<pre><code>touch .github/copilot-instructions.md</code></pre>
						</div>
					</div>
				</div>

				<div class="step-item">
					<span class="step-number">3</span>
					<div class="step-content">
						<h3>Add your project context</h3>
						<p>Include three essential sections: overview, build commands, and architecture:</p>
						<div class="code-block">
							<div class="code-block-header">
								<span class="code-block-lang">.github/copilot-instructions.md</span>
								<button class="copy-btn" class:copied={copied && copiedSection === 'nextjs'} onclick={() => copyCode(nextjsTemplate, 'nextjs')}>
									{copied && copiedSection === 'nextjs' ? 'Copied!' : 'Copy'}
								</button>
							</div>
							<pre><code>{nextjsTemplate}</code></pre>
						</div>
					</div>
				</div>

				<div class="step-item">
					<span class="step-number">4</span>
					<div class="step-content">
						<h3>Enable in your editor</h3>
						<p>VS Code enables instructions by default. For other editors:</p>
						<ul>
							<li><strong>VS Code:</strong> Enabled by default. Check <code>github.copilot.chat.codeGeneration.useInstructionFiles</code></li>
							<li><strong>Visual Studio:</strong> Settings → Copilot → Enable custom instructions</li>
							<li><strong>JetBrains:</strong> Supports <code>.github/copilot-instructions.md</code> automatically</li>
						</ul>
					</div>
				</div>

				<div class="step-item">
					<span class="step-number">5</span>
					<div class="step-content">
						<h3>Commit and test</h3>
						<p>Commit the file to your repository. Copilot automatically reads it. Test by asking Copilot to generate code - it should follow your patterns.</p>
					</div>
				</div>
			</div>
		</section>

		<!-- File Types -->
		<section class="article-section">
			<h2>What are the different Copilot instruction file types?</h2>
			<p>
				GitHub Copilot supports multiple instruction file formats for different use cases. Understanding when to use each is critical for effective vibe coding.
			</p>

			<div class="file-types-grid">
				<div class="card">
					<div class="file-type-header">
						<code>.github/copilot-instructions.md</code>
						<span class="badge">Repository-wide</span>
					</div>
					<p>Single file applying to all Copilot requests in the repository. Best for project overview, build commands, and universal security rules.</p>
					<div class="file-type-use">
						<strong>Use for:</strong> Framework patterns, build setup, team standards
					</div>
				</div>

				<div class="card">
					<div class="file-type-header">
						<code>.github/instructions/*.instructions.md</code>
						<span class="badge">Path-specific</span>
					</div>
					<p>Multiple files with <code>applyTo</code> frontmatter for path-specific rules. Different instructions for different parts of your codebase.</p>
					<div class="file-type-use">
						<strong>Use for:</strong> API security, component patterns, database queries
					</div>
				</div>

				<div class="card">
					<div class="file-type-header">
						<code>AGENTS.md</code>
						<span class="badge">Cross-tool</span>
					</div>
					<p>Universal format supported by Copilot coding agent, Cursor, Claude Code, and Cline. Nearest file in directory tree takes precedence.</p>
					<div class="file-type-use">
						<strong>Use for:</strong> Team using multiple AI tools
					</div>
				</div>
			</div>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Folder Structure</span>
				</div>
				<pre><code>{folderStructure}</code></pre>
			</div>
		</section>

		<!-- Path-Specific Instructions -->
		<section class="article-section">
			<h2>How do I set path-specific instructions with applyTo?</h2>
			<p>
				Path-specific instructions let you customize Copilot behavior for different parts of your codebase. Create these in <code>.github/instructions/</code> with filenames ending in <code>.instructions.md</code>.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">.github/instructions/api-routes.instructions.md</span>
					<button class="copy-btn" class:copied={copied && copiedSection === 'pathspec'} onclick={() => copyCode(pathSpecificExample, 'pathspec')}>
						{copied && copiedSection === 'pathspec' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code>{pathSpecificExample}</code></pre>
			</div>

			<h3>Frontmatter options</h3>
			<div class="table-wrapper">
				<table>
					<thead>
						<tr>
							<th>Option</th>
							<th>Description</th>
							<th>Example</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>applyTo</code></td>
							<td>Glob pattern for files this applies to</td>
							<td><code>"app/api/**/*.ts"</code></td>
						</tr>
						<tr>
							<td><code>excludeAgent</code></td>
							<td>Agent to exclude (code-review or coding-agent)</td>
							<td><code>"code-review"</code></td>
						</tr>
						<tr>
							<td><code>description</code></td>
							<td>Brief description of the instructions</td>
							<td><code>"API route security rules"</code></td>
						</tr>
						<tr>
							<td><code>name</code></td>
							<td>Display name in editor UI</td>
							<td><code>"API Security"</code></td>
						</tr>
					</tbody>
				</table>
			</div>

			<h3>Common applyTo patterns</h3>
			<div class="pattern-grid">
				<div class="pattern-item">
					<code>"**/*.ts"</code>
					<span>All TypeScript files</span>
				</div>
				<div class="pattern-item">
					<code>"app/api/**/*.ts"</code>
					<span>API routes only</span>
				</div>
				<div class="pattern-item">
					<code>"components/**/*.tsx"</code>
					<span>React components</span>
				</div>
				<div class="pattern-item">
					<code>"lib/db/**/*"</code>
					<span>Database layer</span>
				</div>
				<div class="pattern-item">
					<code>"**/*.test.ts,**/*.spec.ts"</code>
					<span>Test files (multiple patterns)</span>
				</div>
			</div>
		</section>

		<!-- Essential Sections -->
		<section class="article-section">
			<h2>What should I include in Copilot instructions?</h2>
			<p>
				According to <a href="https://github.blog/ai-and-ml/github-copilot/5-tips-for-writing-better-custom-instructions-for-copilot/" target="_blank" rel="noopener">GitHub's official guidance</a>, every Copilot instructions file should include these five sections:
			</p>

			<div class="sections-grid">
				<div class="card">
					<h4>1. Project Overview</h4>
					<p>Elevator pitch: what the app does, audience, key features. Include frameworks and runtime.</p>
					<div class="section-example">"Next.js 14 app using TypeScript, Supabase for database, Zod for validation."</div>
				</div>

				<div class="card">
					<h4>2. Tech Stack</h4>
					<p>List backend, frontend, APIs, and testing frameworks. Brief implementation notes.</p>
					<div class="section-example">Backend: Node.js 20, Frontend: React 18, DB: PostgreSQL via Supabase</div>
				</div>

				<div class="card">
					<h4>3. Build Commands</h4>
					<p>Exact commands for install, dev, build, test, lint. Include prerequisites.</p>
					<div class="section-example"><code>npm install</code> (requires Node 20+), <code>npm run dev</code> (port 3000)</div>
				</div>

				<div class="card">
					<h4>4. Project Structure</h4>
					<p>Folder organization with contextual descriptions. Helps Copilot suggest correct imports.</p>
					<div class="section-example">/app - Pages, /components - UI, /lib - Utilities, /types - TypeScript</div>
				</div>

				<div class="card">
					<h4>5. Coding Guidelines</h4>
					<p>Project-wide standards: type hints, testing mandates, security practices.</p>
					<div class="section-example">Strict TypeScript, Zod validation on all inputs, auth check on all API routes</div>
				</div>
			</div>

			<div class="alert alert-success">
				<div class="alert-title">Keep it concise</div>
				<p>GitHub recommends ~2 pages maximum. An imperfect instructions file outperforms nothing at all.</p>
			</div>
		</section>

		<!-- IDE Support -->
		<section class="article-section">
			<h2>Which IDEs support Copilot instructions?</h2>
			<p>
				Copilot Instructions work across multiple editors, but each has specific settings:
			</p>

			<div class="ide-grid">
				<div class="card">
					<h4>VS Code</h4>
					<ul>
						<li>Enabled by default</li>
						<li>Setting: <code>github.copilot.chat.codeGeneration.useInstructionFiles</code></li>
						<li>AGENTS.md: <code>chat.useAgentsMdFile</code></li>
						<li>Nested agents: <code>chat.useNestedAgentsMdFiles</code></li>
					</ul>
				</div>

				<div class="card">
					<h4>Visual Studio</h4>
					<ul>
						<li>Disabled by default</li>
						<li>Enable: Tools → Options → Copilot → Enable custom instructions</li>
						<li>Supports same file format as VS Code</li>
					</ul>
				</div>

				<div class="card">
					<h4>JetBrains IDEs</h4>
					<ul>
						<li>Supports <code>.github/copilot-instructions.md</code></li>
						<li>Global: <code>global-copilot-instructions.md</code> locally</li>
						<li>Path-specific files also supported</li>
					</ul>
				</div>

				<div class="card">
					<h4>GitHub.com</h4>
					<ul>
						<li>Reads instructions from repository</li>
						<li>Works with Copilot in PR reviews</li>
						<li>Coding agent uses instructions</li>
					</ul>
				</div>
			</div>
		</section>

		<!-- Security Rules -->
		<section class="article-section security-section">
			<h2>How do I add security rules to Copilot instructions?</h2>
			<p>
				Security instructions teach Copilot to avoid common vulnerabilities in AI-generated code. According to <a href="https://cset.georgetown.edu/article/can-ai-write-secure-code/" target="_blank" rel="noopener">Georgetown University research (2024)</a>, only 55% of AI-generated code meets security standards. Custom instructions dramatically improve this.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">.github/instructions/security.instructions.md</span>
					<button class="copy-btn" class:copied={copied && copiedSection === 'security'} onclick={() => copyCode(securityTemplate, 'security')}>
						{copied && copiedSection === 'security' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code>{securityTemplate}</code></pre>
			</div>

			<h3>SQL Injection Prevention</h3>
			<div class="code-comparison">
				<div class="code-vulnerable">
					<span class="comparison-label">❌ Vulnerable</span>
					<pre><code>const user = await db.query(
  `SELECT * FROM users WHERE id = $&#123;userId&#125;`
)</code></pre>
				</div>
				<div class="code-secure">
					<span class="comparison-label">✅ Secure</span>
					<pre><code>const user = await db.query(
  'SELECT * FROM users WHERE id = $1',
  [userId]
)</code></pre>
				</div>
			</div>

			<h3>Input Validation with Zod</h3>
			<div class="code-comparison">
				<div class="code-vulnerable">
					<span class="comparison-label">❌ No validation</span>
					<pre><code>export async function POST(req: Request) &#123;
  const data = await req.json()
  return await createUser(data)
&#125;</code></pre>
				</div>
				<div class="code-secure">
					<span class="comparison-label">✅ Zod validation</span>
					<pre><code>const UserSchema = z.object(&#123;
  email: z.string().email(),
  name: z.string().min(1).max(100)
&#125;)

export async function POST(req: Request) &#123;
  const data = UserSchema.parse(await req.json())
  return await createUser(data)
&#125;</code></pre>
				</div>
			</div>

			<p>
				See our guides on <a href="/kb/security/vulnerabilities/sql-injection/">SQL injection</a>, <a href="/kb/security/vulnerabilities/missing-auth/">missing authentication</a>, and <a href="/kb/security/vulnerabilities/hardcoded-secrets/">hardcoded secrets</a> for more patterns.
			</p>
		</section>

		<!-- Copilot vs Other Tools -->
		<section class="article-section">
			<h2>Copilot Instructions vs other AI tools</h2>
			<p>
				Each vibe coding tool handles configuration differently. Here's how Copilot compares:
			</p>

			<div class="table-wrapper">
				<table>
					<thead>
						<tr>
							<th>Feature</th>
							<th>GitHub Copilot</th>
							<th>Cursor</th>
							<th>Windsurf</th>
							<th>Cline</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><strong>Main file</strong></td>
							<td><code>.github/copilot-instructions.md</code></td>
							<td><code>.cursor/rules/</code></td>
							<td><code>.windsurf/rules/</code></td>
							<td><code>.clinerules/</code></td>
						</tr>
						<tr>
							<td><strong>Path-specific</strong></td>
							<td><code>.instructions.md</code> with applyTo</td>
							<td>Glob in frontmatter</td>
							<td>Glob activation</td>
							<td>Numeric prefixes</td>
						</tr>
						<tr>
							<td><strong>AGENTS.md</strong></td>
							<td>Yes (since Aug 2025)</td>
							<td>Yes</td>
							<td>No</td>
							<td>Yes (fallback)</td>
						</tr>
						<tr>
							<td><strong>Cross-editor</strong></td>
							<td>Yes (all major IDEs)</td>
							<td>Cursor only</td>
							<td>Windsurf only</td>
							<td>VS Code only</td>
						</tr>
						<tr>
							<td><strong>Global rules</strong></td>
							<td>User profile settings</td>
							<td><code>~/.cursor/rules/</code></td>
							<td><code>~/.windsurf/global_rules.md</code></td>
							<td><code>~/Documents/Cline/Rules/</code></td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="alert alert-info">
				<div class="alert-title">Cross-tool compatibility</div>
				<p>If your team uses multiple AI tools, maintain both <code>.github/copilot-instructions.md</code> (for Copilot users) and <code>AGENTS.md</code> (for Cursor/Claude Code users) in the same repository.</p>
			</div>
		</section>

		<!-- Best Practices -->
		<section class="article-section">
			<h2>Best practices</h2>

			<div class="practices-grid">
				<div class="card practice-do">
					<h4>✅ Do</h4>
					<ul>
						<li>Keep repository-wide instructions to ~2 pages</li>
						<li>Use imperative language ("ALWAYS validate input")</li>
						<li>Include specific code examples with ❌/✅</li>
						<li>Document build preconditions (Node.js version, env vars)</li>
						<li>Update instructions when architecture changes</li>
						<li>Use path-specific instructions for security-critical code</li>
					</ul>
				</div>
				<div class="card practice-dont">
					<h4>❌ Don't</h4>
					<ul>
						<li>Write 20-page instruction manuals</li>
						<li>Use vague suggestions ("consider validating")</li>
						<li>Describe patterns without code examples</li>
						<li>Let instructions become outdated</li>
						<li>Create conflicting path-specific rules</li>
						<li>Duplicate entire framework documentation</li>
					</ul>
				</div>
			</div>

			<h3>Common mistakes to avoid</h3>
			<div class="mistakes-list">
				<div class="mistake-item">
					<span class="mistake-number">1</span>
					<div class="mistake-content">
						<strong>Conflicting instructions</strong>
						<p>Path-specific rules that contradict repository-wide rules confuse Copilot. Make path rules more specific, not opposite.</p>
					</div>
				</div>
				<div class="mistake-item">
					<span class="mistake-number">2</span>
					<div class="mistake-content">
						<strong>Over-specification</strong>
						<p>Documenting every coding preference creates noise. Focus on architecture, security, and non-obvious patterns.</p>
					</div>
				</div>
				<div class="mistake-item">
					<span class="mistake-number">3</span>
					<div class="mistake-content">
						<strong>No security rules</strong>
						<p>Vibe coders often forget security instructions, relying on code review to catch issues. Add security rules upfront.</p>
					</div>
				</div>
				<div class="mistake-item">
					<span class="mistake-number">4</span>
					<div class="mistake-content">
						<strong>Stale instructions</strong>
						<p>Instructions referencing old frameworks teach incorrect patterns. Review quarterly or when migrating.</p>
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

		<!-- Scanner CTA -->
		<section class="cta-box">
			<h2>Verify Your Instructions Are Working</h2>
			<p>
				Copilot Instructions help prevent vulnerabilities, but can't catch everything. <a href="https://scanner.vibeship.co">VibeShip Scanner</a> automatically detects security issues in your vibe coded projects - even ones that slip past your instructions.
			</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">Scan Your Code Free</a>
		</section>

		<!-- Related Content -->
		<section class="article-section">
			<h2>Related resources</h2>
			<div class="related-grid">
				<a href="/kb/prompts/cursor-rules/" class="card card-interactive related-card">
					<span class="related-card-category">Config Guide</span>
					<h3 class="related-card-title">Cursor Rules Complete Guide</h3>
					<p class="related-card-description">Configure Cursor AI with .cursorrules</p>
				</a>
				<a href="/kb/prompts/windsurf-rules/" class="card card-interactive related-card">
					<span class="related-card-category">Config Guide</span>
					<h3 class="related-card-title">Windsurf Rules Guide</h3>
					<p class="related-card-description">Set up Windsurf cascades and rules</p>
				</a>
				<a href="/kb/prompts/cline-rules/" class="card card-interactive related-card">
					<span class="related-card-category">Config Guide</span>
					<h3 class="related-card-title">Cline Rules Guide</h3>
					<p class="related-card-description">Configure Cline in VS Code</p>
				</a>
				<a href="/kb/prompts/claude-md/" class="card card-interactive related-card">
					<span class="related-card-category">Config Guide</span>
					<h3 class="related-card-title">CLAUDE.md Guide</h3>
					<p class="related-card-description">Configure Claude Code with CLAUDE.md</p>
				</a>
				<a href="/kb/security/vulnerabilities/sql-injection/" class="card card-interactive related-card">
					<span class="related-card-category">Vulnerability</span>
					<h3 class="related-card-title">SQL Injection</h3>
					<p class="related-card-description">Prevent injection in AI-generated code</p>
				</a>
				<a href="/kb/security/stacks/nextjs-supabase/" class="card card-interactive related-card">
					<span class="related-card-category">Stack Guide</span>
					<h3 class="related-card-title">Next.js + Supabase Security</h3>
					<p class="related-card-description">Secure your vibe coded stack</p>
				</a>
			</div>
		</section>

		<!-- External Resources -->
		<section class="article-section">
			<h2>Official documentation</h2>
			<div class="external-links">
				<a href="https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot" target="_blank" rel="noopener" class="card card-interactive external-link">
					GitHub Copilot Custom Instructions
					<span class="external-icon">↗</span>
				</a>
				<a href="https://github.com/github/awesome-copilot" target="_blank" rel="noopener" class="card card-interactive external-link">
					awesome-copilot Repository
					<span class="external-icon">↗</span>
				</a>
				<a href="https://code.visualstudio.com/docs/copilot/customization/custom-instructions" target="_blank" rel="noopener" class="card card-interactive external-link">
					VS Code Custom Instructions
					<span class="external-icon">↗</span>
				</a>
				<a href="https://github.blog/ai-and-ml/github-copilot/5-tips-for-writing-better-custom-instructions-for-copilot/" target="_blank" rel="noopener" class="card card-interactive external-link">
					5 Tips for Better Instructions
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
		flex-wrap: wrap;
		margin-bottom: 1rem;
	}

	.subtitle {
		color: var(--text-secondary);
		font-size: 1.1rem;
	}

	/* Resource Grid */
	.resource-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.resource-card {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		text-decoration: none;
	}

	.resource-meta {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.65rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--text-tertiary);
	}

	.resource-title {
		font-weight: 600;
		color: var(--text-primary);
	}

	.resource-desc {
		font-size: 0.85rem;
		color: var(--text-secondary);
		line-height: 1.5;
	}

	/* Step List */
	.step-list {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		margin: 1.5rem 0;
	}

	.step-item {
		display: flex;
		gap: 1rem;
	}

	.step-number {
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--green-dim);
		color: var(--bg-primary);
		font-weight: 700;
		font-size: 1.1rem;
		flex-shrink: 0;
	}

	.step-content {
		flex: 1;
	}

	.step-content h3 {
		margin: 0 0 0.75rem;
		font-size: 1.1rem;
	}

	/* File Types Grid */
	.file-types-grid {
		display: grid;
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.file-type-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 0.75rem;
	}

	.file-type-header code {
		color: var(--green-dim);
	}

	.file-type-use {
		font-size: 0.8rem;
		padding: 0.5rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		margin-top: 0.75rem;
	}

	/* Pattern Grid */
	.pattern-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 0.75rem;
		margin: 1rem 0;
	}

	.pattern-item {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		padding: 0.75rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
	}

	.pattern-item code {
		color: var(--green-dim);
		font-size: 0.8rem;
	}

	.pattern-item span {
		font-size: 0.8rem;
		color: var(--text-secondary);
	}

	/* Sections Grid */
	.sections-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.sections-grid h4 {
		margin-top: 0;
		color: var(--green-dim);
	}

	.sections-grid p {
		font-size: 0.9rem;
		color: var(--text-secondary);
		margin-bottom: 0.75rem;
	}

	.section-example {
		font-size: 0.8rem;
		padding: 0.5rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
	}

	/* IDE Grid */
	.ide-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.ide-grid h4 {
		margin-top: 0;
		margin-bottom: 0.75rem;
	}

	.ide-grid ul {
		margin: 0;
		padding-left: 1.25rem;
	}

	.ide-grid li {
		font-size: 0.85rem;
		margin-bottom: 0.375rem;
	}

	/* Security Section */
	.security-section {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-left: 3px solid var(--red);
		padding: 2rem;
		margin: 2rem 0;
	}

	/* Code Comparison */
	.code-comparison {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1rem;
		margin: 1rem 0;
	}

	.code-vulnerable,
	.code-secure {
		background: var(--bg-primary);
		border: 1px solid var(--border);
		overflow: hidden;
	}

	.comparison-label {
		display: block;
		padding: 0.5rem 1rem;
		font-size: 0.75rem;
		font-weight: 600;
	}

	.code-vulnerable .comparison-label {
		background: rgba(239, 68, 68, 0.2);
		color: var(--red);
	}

	.code-secure .comparison-label {
		background: rgba(0, 196, 154, 0.2);
		color: var(--green-dim);
	}

	.code-vulnerable pre,
	.code-secure pre {
		padding: 1rem;
		margin: 0;
		font-size: 0.75rem;
	}

	/* Practices Grid */
	.practices-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.practice-do {
		border-top: 3px solid var(--green);
	}

	.practice-dont {
		border-top: 3px solid var(--red);
	}

	.practice-do h4 {
		color: var(--green);
		margin-top: 0;
	}

	.practice-dont h4 {
		color: var(--red);
		margin-top: 0;
	}

	.practices-grid ul {
		margin: 0;
		padding-left: 1.25rem;
	}

	.practices-grid li {
		margin-bottom: 0.5rem;
		font-size: 0.9rem;
	}

	/* Mistakes List */
	.mistakes-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.mistake-item {
		display: flex;
		gap: 1rem;
		padding: 1rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
	}

	.mistake-number {
		width: 28px;
		height: 28px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(239, 68, 68, 0.2);
		color: var(--red);
		font-weight: 700;
		font-size: 0.9rem;
		flex-shrink: 0;
	}

	.mistake-content strong {
		display: block;
		margin-bottom: 0.25rem;
	}

	.mistake-content p {
		margin: 0;
		font-size: 0.9rem;
		color: var(--text-secondary);
	}

	/* FAQ List */
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
		.step-item {
			flex-direction: column;
		}

		.code-comparison {
			grid-template-columns: 1fr;
		}

		.security-section {
			padding: 1.5rem;
		}
	}
</style>
