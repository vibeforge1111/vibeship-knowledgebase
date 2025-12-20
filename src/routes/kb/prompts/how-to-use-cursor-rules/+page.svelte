<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'How to Use Cursor Rules: Complete Beginner Tutorial',
		description: 'Learn how to set up Cursor rules step by step. Create your first .cursorrules file, test it works, and iterate on your configuration with this beginner-friendly guide.',
		url: '/kb/prompts/how-to-use-cursor-rules/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Prompts', href: '/kb/prompts' },
		{ label: 'How to Use Cursor Rules' }
	];

	// FAQ data
	const faqs = [
		{
			question: 'Why are my cursor rules not working?',
			answer: 'Check three things: 1) The file is named exactly .cursorrules (with the dot) or placed in .cursor/rules/ folder, 2) The file is in your project root directory, 3) You have restarted Cursor or opened a new chat after creating the file. If using frontmatter, ensure the YAML syntax is valid with proper indentation.'
		},
		{
			question: 'Do I need to restart Cursor after changing rules?',
			answer: 'For the legacy .cursorrules file, changes apply to new chat sessions automatically. For .cursor/rules/ files, Cursor watches for changes and applies them immediately. If rules seem ignored, start a new chat to ensure fresh context.'
		},
		{
			question: 'Should I use .cursorrules or .cursor/rules/ folder?',
			answer: 'Use .cursor/rules/ folder for new projects. It offers better organization (split by category), activation modes (always, intelligent, file-specific), and is the officially recommended approach. The legacy .cursorrules file still works but lacks these features.'
		},
		{
			question: 'How do I know if Cursor is reading my rules?',
			answer: 'Ask Cursor directly: "What rules are you following for this project?" or "Summarize my cursor rules." Cursor will list the active rules it found. You can also check by asking it to generate code that should follow your rules - if it follows them, they are working.'
		},
		{
			question: 'Can I use cursor rules with any AI model?',
			answer: 'Yes. Cursor rules work with all supported models (Claude, GPT-4, etc.). Rules are injected into the system context before your prompts, so every model receives the same instructions. Different models may follow rules with varying precision.'
		},
		{
			question: 'How long should my cursor rules be?',
			answer: 'Keep total rules under 500 lines. Shorter, focused rules work better than long documents. If you have many rules, split them into separate files in .cursor/rules/ (security.md, typescript.md, etc.). Each rule should be specific and actionable.'
		},
		{
			question: 'Do cursor rules work in Cursor Composer?',
			answer: 'Yes. Cursor rules apply to both regular chat and Cursor Composer. The rules are loaded into context for any AI interaction in your project, including multi-file editing sessions in Composer.'
		}
	];

	// Step by step tutorial data
	const steps = [
		{
			number: 1,
			title: 'Open your project in Cursor',
			description: 'Open the folder containing your project in Cursor. Rules are project-specific, so each project can have its own configuration.',
			tip: 'Make sure you open the root folder of your project, not a subfolder.'
		},
		{
			number: 2,
			title: 'Create the rules file',
			description: 'Create a new file named .cursorrules in your project root. The dot at the beginning is required - this makes it a hidden file on macOS/Linux.',
			tip: 'On Windows, you can create the file from Cursor directly. Some file explorers hide dot-files by default.'
		},
		{
			number: 3,
			title: 'Add your first rule',
			description: 'Start simple with your tech stack and one security rule. You can expand later.',
			tip: 'Begin with what makes your project unique - the framework, language, and coding patterns.'
		},
		{
			number: 4,
			title: 'Test the rules',
			description: 'Open a new chat in Cursor and ask it to generate some code. Check if the output follows your rules.',
			tip: 'Ask Cursor: "What rules are you following?" to verify it loaded your configuration.'
		},
		{
			number: 5,
			title: 'Iterate and expand',
			description: 'Add more rules as you notice patterns. When Cursor generates something you correct often, add a rule for it.',
			tip: 'Review your rules monthly. Remove ones that are no longer relevant and add new patterns.'
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

	const starterTemplate = `# Project Configuration

## Tech Stack
- [Your framework: Next.js / React / SvelteKit / etc.]
- [Your language: TypeScript / JavaScript / Python]
- [Your database: Supabase / Prisma / MongoDB]
- [Your styling: Tailwind / CSS Modules / styled-components]

## Code Style
- Use functional components
- Prefer named exports over default exports
- Use TypeScript interfaces for props

## Security Rules
- NEVER use template literals for database queries
- ALWAYS validate user input on the server
- Check authentication on every API route
- Use environment variables for secrets, never hardcode`;

	const advancedTemplate = `---
description: "Core project rules - tech stack and conventions"
alwaysApply: true
---

# Project: [Your App Name]

## Tech Stack
- Next.js 14 with App Router
- TypeScript in strict mode
- Supabase for auth and database
- Tailwind CSS for styling

## Architecture Patterns
- Use Server Components by default
- Client Components only for interactivity
- Server Actions for mutations
- Zod for input validation

## Naming Conventions
- Components: PascalCase (UserCard.tsx)
- Utilities: camelCase (formatDate.ts)
- Constants: SCREAMING_SNAKE_CASE
- Types/Interfaces: PascalCase with 'I' or 'T' prefix optional

## Security (Critical)
- Parameterized queries only: $1, $2 - never template literals
- Validate ALL input with Zod before database operations
- Check auth in every Server Action and API route
- Never expose SUPABASE_SERVICE_ROLE_KEY to client`;
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
			{"@type": "ListItem", "position": 3, "name": "How to Use Cursor Rules"}
		]
	}
	</script>`}

	<!-- HowTo Schema -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "HowTo",
		"name": "How to Set Up Cursor Rules",
		"description": "Step-by-step guide to creating and using Cursor rules for better AI-generated code",
		"step": [
			{
				"@type": "HowToStep",
				"position": 1,
				"name": "Open your project in Cursor",
				"text": "Open the folder containing your project in Cursor. Rules are project-specific."
			},
			{
				"@type": "HowToStep",
				"position": 2,
				"name": "Create the rules file",
				"text": "Create a file named .cursorrules in your project root directory."
			},
			{
				"@type": "HowToStep",
				"position": 3,
				"name": "Add your first rule",
				"text": "Start with your tech stack and one security rule."
			},
			{
				"@type": "HowToStep",
				"position": 4,
				"name": "Test the rules",
				"text": "Open a new chat and verify Cursor follows your rules."
			},
			{
				"@type": "HowToStep",
				"position": 5,
				"name": "Iterate and expand",
				"text": "Add more rules as you notice patterns in your corrections."
			}
		]
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
				<span class="badge badge-green">Tutorial</span>
				<span class="badge">Cursor</span>
				<span class="badge">Beginner</span>
			</div>
			<h1>How to Use Cursor Rules: Step-by-Step Tutorial</h1>
			<p class="text-secondary">Set up your first .cursorrules file in 5 minutes</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Create a file named <code>.cursorrules</code> in your project root.</strong>
				Add your tech stack, coding conventions, and security rules. Cursor reads this file before every response, making AI output more consistent and secure. This tutorial walks through each step with copy-paste templates.
			</p>
		</div>

		<!-- What You'll Learn -->
		<section>
			<h2>What you'll learn</h2>
			<p>
				This tutorial shows you how to set up <a href="/kb/prompts/cursor-rules/">Cursor rules</a> from scratch. By the end, you'll have a working configuration that makes <a href="/kb/vibe-coding-tools/cursor/">Cursor</a> generate better, more secure code for your vibe coding projects.
			</p>
			<div class="learn-grid">
				<div class="learn-item">
					<span class="learn-icon">1</span>
					<span>Create your first rules file</span>
				</div>
				<div class="learn-item">
					<span class="learn-icon">2</span>
					<span>Add essential rules for your stack</span>
				</div>
				<div class="learn-item">
					<span class="learn-icon">3</span>
					<span>Test and verify rules are working</span>
				</div>
				<div class="learn-item">
					<span class="learn-icon">4</span>
					<span>Troubleshoot common issues</span>
				</div>
			</div>
			<p>
				<strong>Time required:</strong> 5-10 minutes for basic setup. No prior configuration experience needed.
			</p>
		</section>

		<!-- Prerequisites -->
		<section>
			<h2>Before you start</h2>
			<ul class="checklist">
				<li><span class="check">&#10003;</span> <a href="https://cursor.com" target="_blank" rel="noopener">Cursor</a> installed on your computer</li>
				<li><span class="check">&#10003;</span> A project folder open in Cursor</li>
				<li><span class="check">&#10003;</span> Basic understanding of your project's tech stack</li>
			</ul>
		</section>

		<!-- Step by Step Tutorial -->
		<section>
			<h2>How to add cursor rules (step by step)</h2>

			{#each steps as step}
				<div class="step-card">
					<div class="step-header">
						<span class="step-number">{step.number}</span>
						<h3>{step.title}</h3>
					</div>
					<p>{step.description}</p>

					{#if step.number === 2}
						<div class="file-visual">
							<div class="file-tree">
								<div class="tree-item root">your-project/</div>
								<div class="tree-item file highlight">.cursorrules</div>
								<div class="tree-item folder">src/</div>
								<div class="tree-item file">package.json</div>
							</div>
						</div>
					{/if}

					{#if step.number === 3}
						<div class="code-block">
							<div class="code-block-header">
								<span class="code-block-lang">.cursorrules (starter template)</span>
								<button class="copy-btn" onclick={() => copyCode(starterTemplate, 'starter')}>
									{copied && copiedSection === 'starter' ? 'Copied!' : 'Copy'}
								</button>
							</div>
							<pre><code>{starterTemplate}</code></pre>
						</div>
					{/if}

					{#if step.number === 4}
						<div class="test-prompts">
							<p><strong>Try these test prompts:</strong></p>
							<ul>
								<li>"What rules are you following for this project?"</li>
								<li>"Create a simple API route" (check if it matches your stack)</li>
								<li>"Show me a database query" (verify security rules apply)</li>
							</ul>
						</div>
					{/if}

					<div class="step-tip">
						<strong>Tip:</strong> {step.tip}
					</div>
				</div>
			{/each}
		</section>

		<!-- Popular Cursor Rules Resources -->
		<section>
			<h2>Popular cursor rules to copy</h2>
			<p>
				Don't start from scratch. These popular repos and sites have battle-tested cursor rules you can copy and adapt for your projects.
			</p>
			<div class="resource-grid">
				<a href="https://github.com/PatrickJS/awesome-cursorrules" target="_blank" rel="noopener" class="resource-card">
					<div class="resource-header">
						<span class="resource-icon">★</span>
						<span class="resource-stars">36k+ stars</span>
					</div>
					<span class="resource-title">awesome-cursorrules</span>
					<span class="resource-desc">The definitive collection. Rules for Next.js, React, Python, Go, Rust, and 50+ frameworks. Start here.</span>
				</a>
				<a href="https://cursor.directory" target="_blank" rel="noopener" class="resource-card">
					<div class="resource-header">
						<span class="resource-icon">📁</span>
						<span class="resource-stars">Community site</span>
					</div>
					<span class="resource-title">cursor.directory</span>
					<span class="resource-desc">Searchable directory of cursor rules by framework, language, and use case. One-click copy.</span>
				</a>
				<a href="https://github.com/pontusab/cursor.directory" target="_blank" rel="noopener" class="resource-card">
					<div class="resource-header">
						<span class="resource-icon">★</span>
						<span class="resource-stars">10k+ stars</span>
					</div>
					<span class="resource-title">cursor.directory (GitHub)</span>
					<span class="resource-desc">Open source repo behind cursor.directory. Submit your own rules or browse raw files.</span>
				</a>
				<a href="https://github.com/Mawla/cursor-rules" target="_blank" rel="noopener" class="resource-card">
					<div class="resource-header">
						<span class="resource-icon">★</span>
						<span class="resource-stars">Popular</span>
					</div>
					<span class="resource-title">cursor-rules by Mawla</span>
					<span class="resource-desc">Well-organized rules with TypeScript, testing, and architecture patterns. Great for serious projects.</span>
				</a>
			</div>
			<div class="resource-tip">
				<strong>Pro tip:</strong> Copy a base template from these repos, then customize for your specific stack. Don't use generic rules - add your database (Supabase, Prisma), your framework version (Next.js 14 App Router), and your security requirements.
			</div>
		</section>

		<!-- Modern Approach -->
		<section>
			<h2>Modern approach: .cursor/rules/ folder</h2>
			<p>
				For larger projects, use the <code>.cursor/rules/</code> folder instead of a single file. This lets you organize rules by category and control when each rule applies.
			</p>

			<div class="file-structure">
				<div class="file-header">Recommended Project Structure</div>
				<pre><code>your-project/
├── .cursor/
│   └── rules/
│       ├── core.md           # Always-on: tech stack, conventions
│       ├── security.md       # Always-on: security patterns
│       ├── typescript.md     # File-specific: *.ts, *.tsx
│       └── testing.md        # Manual: @testing when needed
├── src/
└── package.json</code></pre>
			</div>

			<h3>Using frontmatter for activation modes</h3>
			<p>
				Add YAML frontmatter to control when rules activate. This is more powerful than the legacy approach.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">.cursor/rules/core.md</span>
					<button class="copy-btn" onclick={() => copyCode(advancedTemplate, 'advanced')}>
						{copied && copiedSection === 'advanced' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code>{advancedTemplate}</code></pre>
			</div>

			<div class="mode-explanation">
				<h4>Activation mode options:</h4>
				<div class="mode-grid">
					<div class="mode-item">
						<code>alwaysApply: true</code>
						<p>Active in every chat. Use for core rules.</p>
					</div>
					<div class="mode-item">
						<code>alwaysApply: false</code>
						<p>AI decides based on description. Use for specialized rules.</p>
					</div>
					<div class="mode-item">
						<code>globs: ["*.ts"]</code>
						<p>Only when working with matching files.</p>
					</div>
					<div class="mode-item">
						<code>@rule-name</code>
						<p>Manual activation by mentioning in chat.</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Troubleshooting -->
		<section class="troubleshooting-section">
			<h2>Troubleshooting cursor rules</h2>
			<p>
				If your rules aren't working, check these common issues:
			</p>

			<div class="trouble-grid">
				<div class="trouble-item">
					<h4>Rules completely ignored</h4>
					<ul>
						<li>File must be named exactly <code>.cursorrules</code> (with the dot)</li>
						<li>File must be in project root, not a subfolder</li>
						<li>Try starting a new chat session</li>
						<li>Check for syntax errors in YAML frontmatter</li>
					</ul>
				</div>
				<div class="trouble-item">
					<h4>Rules partially working</h4>
					<ul>
						<li>Some rules may conflict - simplify and test one at a time</li>
						<li>Long rules may get truncated - keep under 500 lines</li>
						<li>Vague rules are interpreted loosely - be specific</li>
						<li>Check <code>alwaysApply</code> settings in frontmatter</li>
					</ul>
				</div>
				<div class="trouble-item">
					<h4>File not found</h4>
					<ul>
						<li>Enable "Show hidden files" in your file explorer</li>
						<li>On Windows, create via Cursor's file menu</li>
						<li>Verify you opened the correct project folder</li>
						<li>Check if <code>.cursor/</code> folder exists for modern approach</li>
					</ul>
				</div>
				<div class="trouble-item">
					<h4>Changes not applying</h4>
					<ul>
						<li>Start a new chat after editing rules</li>
						<li>Changes apply to new sessions, not current ones</li>
						<li>Check the file saved successfully</li>
						<li>Verify YAML frontmatter syntax is correct</li>
					</ul>
				</div>
			</div>

			<div class="debug-tip">
				<h4>Debug command</h4>
				<p>Ask Cursor: <code>"List all the cursor rules you're currently following for this project"</code></p>
				<p>This reveals which rules Cursor detected and helps identify missing or ignored rules.</p>
			</div>
		</section>

		<!-- Security Rules -->
		<section class="security-callout">
			<h2>Don't forget security rules</h2>
			<p>
				The most important cursor rules for vibe coders prevent security vulnerabilities. AI tools often generate working code without considering security. Add these rules to catch common issues:
			</p>
			<div class="security-list">
				<div class="security-item">
					<strong>Database queries:</strong> "NEVER use template literals for SQL - use parameterized queries"
				</div>
				<div class="security-item">
					<strong>Authentication:</strong> "Check auth on EVERY API route and Server Action"
				</div>
				<div class="security-item">
					<strong>Input validation:</strong> "Validate ALL user input with Zod before processing"
				</div>
				<div class="security-item">
					<strong>Secrets:</strong> "NEVER hardcode API keys - use environment variables"
				</div>
			</div>
			<p>
				See our <a href="/kb/prompts/cursor-rules/#security-rules">complete security rules template</a> for copy-paste rules that prevent <a href="/kb/security/vulnerabilities/sql-injection/">SQL injection</a>, <a href="/kb/security/vulnerabilities/hardcoded-secrets/">hardcoded secrets</a>, and other common vulnerabilities.
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

		<!-- Next Steps -->
		<section>
			<h2>Next steps</h2>
			<div class="next-steps-grid">
				<a href="/kb/prompts/cursor-rules/" class="next-step-card">
					<span class="next-step-type">Complete Guide</span>
					<span class="next-step-title">Cursor Rules Reference</span>
					<span class="next-step-desc">Deep dive into all features, activation modes, and best practices</span>
				</a>
				<a href="/kb/prompts/cursor-rules-examples/" class="next-step-card">
					<span class="next-step-type">Examples</span>
					<span class="next-step-title">20+ Cursor Rules Templates</span>
					<span class="next-step-desc">Copy-paste templates for Next.js, React, Python, and more</span>
				</a>
				<a href="/kb/vibe-coding/secure-vibe-coding-guide/" class="next-step-card">
					<span class="next-step-type">Pillar Guide</span>
					<span class="next-step-title">Secure Vibe Coding</span>
					<span class="next-step-desc">Complete security guide for AI-assisted development</span>
				</a>
			</div>
		</section>

		<!-- Scanner CTA -->
		<section class="cta-box">
			<h2>Verify Your Rules Are Working</h2>
			<p>
				Cursor rules reduce vulnerabilities but can't catch everything. <a href="https://scanner.vibeship.co">VibeShip Scanner</a> automatically detects security issues in your vibe coded projects - even ones that slip past your rules.
			</p>
			<a href="https://scanner.vibeship.co" class="cta-button">Scan Your Code Free</a>
		</section>

		<!-- Related Content -->
		<section class="article-section">
			<h2>Related content</h2>
			<div class="related-grid">
				<a href="/kb/prompts/cursor-rules/" class="card card-interactive related-card">
					<div class="related-card-category">Config Guide</div>
					<div class="related-card-title">Cursor Rules Complete Guide</div>
					<p class="related-card-description">Deep dive into .cursorrules file structure</p>
				</a>
				<a href="/kb/prompts/cursor-rules-examples/" class="card card-interactive related-card">
					<div class="related-card-category">Examples</div>
					<div class="related-card-title">Cursor Rules Examples</div>
					<p class="related-card-description">20+ copy-paste templates with security patterns</p>
				</a>
				<a href="/kb/prompts/claude-md/" class="card card-interactive related-card">
					<div class="related-card-category">Config Guide</div>
					<div class="related-card-title">CLAUDE.md Guide</div>
					<p class="related-card-description">Project instructions for Claude Code CLI</p>
				</a>
				<a href="/kb/vibe-coding-tools/cursor/" class="card card-interactive related-card">
					<div class="related-card-category">Tool Guide</div>
					<div class="related-card-title">Cursor Security Patterns</div>
					<p class="related-card-description">How to use Cursor safely with AI</p>
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
			</div>
		</section>

		<!-- External Resources -->
		<section>
			<h2>Official documentation</h2>
			<ul class="external-links">
				<li><a href="https://cursor.com/docs/context/rules" target="_blank" rel="noopener">Cursor Rules Documentation</a> - Official docs from Cursor</li>
				<li><a href="https://docs.cursor.com/context/rules-for-ai" target="_blank" rel="noopener">Rules for AI</a> - Advanced configuration options</li>
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


	h1 {
		font-size: 2.5rem;
		margin-bottom: 0.5rem;
	}

	.text-secondary {
		color: var(--text-secondary);
		font-size: 1.1rem;
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
		font-family: 'JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', monospace;
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

	/* What You'll Learn */
	.learn-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.learn-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
	}

	.learn-icon {
		width: 28px;
		height: 28px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--green-dim);
		color: white;
		font-weight: 600;
		font-size: 0.875rem;
		flex-shrink: 0;
	}

	/* Checklist */
	.checklist {
		list-style: none;
		padding: 0;
		margin: 1rem 0;
	}

	.checklist li {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 0;
		border-bottom: 1px solid var(--border);
	}

	.checklist li:last-child {
		border-bottom: none;
	}

	.check {
		color: var(--green-dim);
		font-weight: bold;
	}

	/* Step Cards */
	.step-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
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

	.step-tip {
		background: rgba(0, 196, 154, 0.1);
		border-left: 3px solid var(--green-dim);
		padding: 0.75rem 1rem;
		margin-top: 1rem;
		font-size: 0.9rem;
	}

	/* File Visual */
	.file-visual {
		background: #0d0d0d;
		padding: 1rem;
		margin: 1rem 0;
		border: 1px solid var(--border);
	}

	.file-tree {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.875rem;
	}

	.tree-item {
		padding: 0.25rem 0;
		padding-left: 1rem;
	}

	.tree-item.root {
		padding-left: 0;
		color: var(--text-primary);
	}

	.tree-item.folder {
		color: var(--text-secondary);
	}

	.tree-item.file {
		color: var(--text-secondary);
	}

	.tree-item.highlight {
		color: var(--green-dim);
		font-weight: 600;
	}

	/* Code Blocks */
	.code-block {
		background: #0d0d0d;
		overflow: hidden;
		margin: 1rem 0;
		border: 1px solid var(--border);
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
		background: var(--green-dim);
		color: white;
		border: none;
		font-size: 0.75rem;
		font-weight: 600;
		cursor: pointer;
		font-family: 'JetBrains Mono', monospace;
	}

	.copy-btn:hover {
		background: var(--green);
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

	/* Test Prompts */
	.test-prompts {
		background: var(--bg-primary);
		padding: 1rem;
		margin: 1rem 0;
		border: 1px solid var(--border);
	}

	.test-prompts p {
		margin-bottom: 0.5rem;
	}

	.test-prompts ul {
		margin: 0;
		padding-left: 1.25rem;
	}

	.test-prompts li {
		margin-bottom: 0.5rem;
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.875rem;
		color: var(--text-secondary);
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

	/* Mode Grid */
	.mode-explanation h4 {
		margin-top: 1.5rem;
	}

	.mode-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: 1rem;
		margin: 1rem 0;
	}

	.mode-item {
		padding: 1rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
	}

	.mode-item code {
		display: block;
		margin-bottom: 0.5rem;
		font-size: 0.75rem;
		color: var(--green-dim);
	}

	.mode-item p {
		margin: 0;
		font-size: 0.85rem;
		color: var(--text-secondary);
	}

	/* Troubleshooting */
	.troubleshooting-section {
		background: var(--bg-secondary);
		padding: 2rem;
		border: 1px solid var(--border);
	}

	.trouble-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1.5rem;
		margin: 1.5rem 0;
	}

	.trouble-item {
		padding: 1rem;
		background: var(--bg-primary);
		border: 1px solid var(--border);
	}

	.trouble-item h4 {
		margin-top: 0;
		color: var(--orange);
	}

	.trouble-item ul {
		margin: 0;
		padding-left: 1.25rem;
	}

	.trouble-item li {
		margin-bottom: 0.5rem;
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.debug-tip {
		background: rgba(0, 196, 154, 0.1);
		border: 1px solid rgba(0, 196, 154, 0.3);
		padding: 1rem;
		margin-top: 1rem;
	}

	.debug-tip h4 {
		margin-top: 0;
		color: var(--green-dim);
	}

	.debug-tip code {
		display: block;
		margin: 0.5rem 0;
		padding: 0.5rem;
		background: rgba(0, 0, 0, 0.3);
	}

	.debug-tip p {
		margin: 0;
		font-size: 0.9rem;
	}

	.debug-tip p:last-child {
		margin-top: 0.5rem;
		color: var(--text-secondary);
	}

	/* Security Callout */
	.security-callout {
		background: rgba(239, 68, 68, 0.05);
		border: 1px solid rgba(239, 68, 68, 0.3);
		padding: 2rem;
	}

	.security-callout h2 {
		color: #f87171;
		border-bottom-color: rgba(239, 68, 68, 0.3);
	}

	.security-list {
		display: grid;
		gap: 0.75rem;
		margin: 1rem 0;
	}

	.security-item {
		padding: 0.75rem 1rem;
		background: var(--bg-primary);
		border-left: 3px solid #f87171;
		font-size: 0.9rem;
	}

	/* Next Steps */
	.next-steps-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1rem;
	}

	.next-step-card {
		display: block;
		padding: 1.25rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		text-decoration: none;
		transition: border-color 0.2s;
	}

	.next-step-card:hover {
		border-color: var(--green-dim);
		text-decoration: none;
	}

	.next-step-type {
		display: block;
		font-size: 0.7rem;
		color: var(--green-dim);
		text-transform: uppercase;
		font-family: 'JetBrains Mono', monospace;
		margin-bottom: 0.25rem;
	}

	.next-step-title {
		display: block;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 0.5rem;
	}

	.next-step-desc {
		display: block;
		font-size: 0.85rem;
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

	.cta-button {
		display: inline-block;
		padding: 0.75rem 1.5rem;
		background: var(--green-dim);
		color: white;
		text-decoration: none;
		font-weight: 600;
		margin-top: 1rem;
		transition: background 0.2s;
	}

	.cta-button:hover {
		background: var(--green);
		text-decoration: none;
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

	/* Resource Grid */
	.resource-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.resource-card {
		display: block;
		padding: 1.25rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		text-decoration: none;
		transition: border-color 0.2s, transform 0.2s;
	}

	.resource-card:hover {
		border-color: var(--green-dim);
		transform: translateY(-2px);
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
		color: var(--orange);
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

	.resource-tip {
		background: rgba(0, 196, 154, 0.1);
		border-left: 3px solid var(--green-dim);
		padding: 1rem;
		margin-top: 1rem;
		font-size: 0.9rem;
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

	/* Responsive */
	@media (max-width: 768px) {
		.content-wrapper {
			padding: 1rem;
		}

		h1 {
			font-size: 1.75rem;
		}

		.step-header {
			flex-direction: column;
			align-items: flex-start;
		}

		.trouble-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
