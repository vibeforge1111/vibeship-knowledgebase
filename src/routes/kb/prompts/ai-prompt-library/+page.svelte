<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'AI Prompt Library: Copy-Paste Prompts for Secure Code',
		description: 'Curated collection of AI coding prompts for security, debugging, refactoring, and testing. Works with Claude, ChatGPT, Cursor, and more.',
		url: '/kb/prompts/ai-prompt-library/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Prompts', href: '/kb/prompts' },
		{ label: 'AI Prompt Library' }
	];

	// FAQ data
	const faqs = [
		{
			question: 'What makes a good AI coding prompt?',
			answer: 'Good prompts are specific, structured, and include context. Instead of "fix this code," describe the problem, include the relevant code, specify the expected behavior, and mention any constraints. Include security requirements for code that handles user input or sensitive data.'
		},
		{
			question: 'Do these prompts work with all AI coding tools?',
			answer: 'Yes. These prompts work with ChatGPT, Claude, Cursor, Copilot, Cline, Windsurf, and other AI assistants. The principles are universal - clear instructions, structured format, and specific context. Tool-specific features like @file references are noted where applicable.'
		},
		{
			question: 'How do I customize prompts for my project?',
			answer: 'Replace bracketed placeholders like [LANGUAGE] and [FRAMEWORK] with your specifics. Add project-specific context like your coding standards or security requirements. For Cursor or Claude Code, save customized prompts in .cursor/rules/ or CLAUDE.md for consistent use.'
		},
		{
			question: 'Should I include security requirements in every prompt?',
			answer: 'Yes, for any code that handles user input, database queries, authentication, or file operations. AI tools generate functional code by default, not secure code. Explicit security requirements like "use parameterized queries" prevent vulnerabilities in the generated code.'
		},
		{
			question: 'How long should my prompts be?',
			answer: 'Long enough to be clear, short enough to be focused. Include necessary context but avoid redundant information. A typical coding prompt is 50-200 words. For complex tasks, use structured sections (Context, Task, Constraints, Examples) to organize longer prompts.'
		},
		{
			question: 'What is prompt chaining?',
			answer: 'Breaking complex tasks into sequential prompts where each builds on the previous output. Instead of "build a complete auth system," first prompt for the database schema, then the signup flow, then login, then session management. Each step can be reviewed before proceeding.'
		},
		{
			question: 'How do I make AI follow my coding style?',
			answer: 'Include examples of your preferred style in the prompt, or reference existing files. In Cursor, use @file to reference examples. In Claude Code, add style preferences to CLAUDE.md. Phrases like "match the style of existing code" work when the AI has context about your codebase.'
		}
	];

	// Prompt categories
	const categories = [
		{
			name: 'Security',
			icon: '🔒',
			description: 'Prompts for finding and fixing vulnerabilities',
			prompts: [
				{
					name: 'Security Audit',
					description: 'Comprehensive security review',
					prompt: `Review this code for security vulnerabilities:

[PASTE CODE HERE]

Check for:
1. SQL injection (string concatenation in queries)
2. Hardcoded secrets (API keys, passwords, tokens)
3. Missing input validation
4. Missing authentication/authorization checks
5. XSS vulnerabilities (unsanitized output)
6. Path traversal (user input in file paths)

For each issue found:
- Describe the vulnerability
- Show the vulnerable line
- Explain the risk
- Provide the fixed code`
				},
				{
					name: 'Fix SQL Injection',
					description: 'Convert vulnerable queries to safe ones',
					prompt: `Convert this SQL query to use parameterized queries:

[PASTE QUERY HERE]

Requirements:
- Use parameterized queries, not string concatenation
- Show both the query and the parameter array
- Use the [LANGUAGE/FRAMEWORK] syntax (e.g., pg for Node, prisma, etc.)
- Explain why the original was vulnerable

Return the safe version ready to use.`
				},
				{
					name: 'Add Input Validation',
					description: 'Generate Zod schemas for validation',
					prompt: `Create input validation for this data structure:

[DESCRIBE DATA OR PASTE INTERFACE/TYPE]

Requirements:
- Use Zod for TypeScript (or [PREFERRED LIBRARY])
- Validate all fields with appropriate constraints
- Include error messages for each validation
- Add .transform() for data sanitization where needed
- Show usage example with error handling

Generate both the schema and a validation function.`
				},
				{
					name: 'Auth Middleware Check',
					description: 'Verify auth on all routes',
					prompt: `Review these API routes for authentication issues:

[PASTE ROUTE CODE]

Check for:
1. Routes missing authentication checks
2. Authentication checked but authorization (permissions) missing
3. IDOR vulnerabilities (accessing resources without ownership check)
4. Session/token validation issues

For each issue:
- Identify the vulnerable route
- Explain what's missing
- Provide the secure implementation

Use [FRAMEWORK] patterns (Express, Next.js, etc.).`
				}
			]
		},
		{
			name: 'Debugging',
			icon: '🐛',
			description: 'Prompts for finding and fixing bugs',
			prompts: [
				{
					name: 'Debug Error',
					description: 'Analyze and fix error messages',
					prompt: `I'm getting this error:

[PASTE ERROR MESSAGE]

Here's the relevant code:

[PASTE CODE]

Context:
- Language/Framework: [e.g., TypeScript, Next.js]
- What I was trying to do: [DESCRIBE ACTION]
- What I expected: [EXPECTED BEHAVIOR]

Please:
1. Explain what's causing the error
2. Show the fix
3. Explain why the fix works`
				},
				{
					name: 'Fix Race Condition',
					description: 'Identify and fix async timing issues',
					prompt: `This code has a race condition or timing issue:

[PASTE CODE]

Symptoms: [DESCRIBE INTERMITTENT BEHAVIOR]

Please:
1. Identify where the race condition occurs
2. Explain the timing problem
3. Provide a fixed version using:
   - Proper async/await
   - Locks/mutexes if needed
   - Or restructured logic

Show the complete fixed code.`
				},
				{
					name: 'Explain Code Behavior',
					description: 'Understand complex or unfamiliar code',
					prompt: `Explain what this code does step by step:

[PASTE CODE]

I need to understand:
1. What each section does
2. The overall purpose
3. Any side effects
4. Potential edge cases or bugs

Use simple language. Highlight any security concerns.`
				}
			]
		},
		{
			name: 'Refactoring',
			icon: '🔧',
			description: 'Prompts for improving code quality',
			prompts: [
				{
					name: 'Refactor for Readability',
					description: 'Improve code structure and clarity',
					prompt: `Refactor this code for better readability:

[PASTE CODE]

Improvements to make:
- Extract functions for repeated logic
- Use descriptive variable names
- Add early returns to reduce nesting
- Break up long functions (max 20-30 lines)
- Remove dead code

Keep the same behavior. Show the refactored version with brief comments explaining changes.`
				},
				{
					name: 'Convert to TypeScript',
					description: 'Add type safety to JavaScript',
					prompt: `Convert this JavaScript to TypeScript:

[PASTE JAVASCRIPT CODE]

Requirements:
- Add proper type annotations
- Create interfaces for objects
- Use strict mode compatible types
- Handle nullable values properly
- Keep the same functionality

Show the complete TypeScript version.`
				},
				{
					name: 'Extract Reusable Component',
					description: 'DRY up repeated UI patterns',
					prompt: `Extract a reusable component from this code:

[PASTE COMPONENT CODE]

The repeated pattern is: [DESCRIBE PATTERN]

Requirements:
- Create a configurable component
- Use props for variable parts
- Add TypeScript types for props
- Keep styles scoped or use CSS variables
- Show usage example

Framework: [React/Vue/Svelte/etc.]`
				}
			]
		},
		{
			name: 'Testing',
			icon: '✅',
			description: 'Prompts for writing tests',
			prompts: [
				{
					name: 'Generate Unit Tests',
					description: 'Create comprehensive test coverage',
					prompt: `Write unit tests for this function:

[PASTE FUNCTION CODE]

Requirements:
- Test happy path (expected inputs)
- Test edge cases (empty, null, boundary values)
- Test error conditions
- Use [TESTING FRAMEWORK] (Jest, Vitest, etc.)
- Mock external dependencies
- Follow AAA pattern (Arrange, Act, Assert)

Generate complete test file with good coverage.`
				},
				{
					name: 'Write Integration Test',
					description: 'Test API endpoints end-to-end',
					prompt: `Write integration tests for this API endpoint:

[PASTE ENDPOINT CODE]

Test scenarios:
1. Successful request with valid data
2. Request with missing required fields
3. Request with invalid data types
4. Unauthenticated request (should 401)
5. Unauthorized request (should 403)

Use [TESTING FRAMEWORK] with [HTTP CLIENT] (supertest, etc.).
Include setup and teardown for test data.`
				},
				{
					name: 'Add Test for Bug Fix',
					description: 'Prevent regression with targeted test',
					prompt: `Write a regression test for this bug:

Bug description: [DESCRIBE THE BUG]
Fixed code:

[PASTE FIXED CODE]

Create a test that:
1. Would have caught this bug before the fix
2. Verifies the fix works
3. Documents the edge case for future developers

Include a comment explaining the bug scenario.`
				}
			]
		},
		{
			name: 'Documentation',
			icon: '📝',
			description: 'Prompts for documentation',
			prompts: [
				{
					name: 'Document Function',
					description: 'Generate JSDoc or docstrings',
					prompt: `Add documentation to this function:

[PASTE FUNCTION]

Include:
- Brief description of purpose
- @param for each parameter with types
- @returns description of return value
- @throws for any errors thrown
- @example with realistic usage

Use [JSDoc/TSDoc/Python docstring/etc.] format.`
				},
				{
					name: 'Write README Section',
					description: 'Document a feature or component',
					prompt: `Write README documentation for this feature:

[DESCRIBE FEATURE OR PASTE CODE]

Include:
- What it does (1-2 sentences)
- Installation/setup if needed
- Basic usage example
- Configuration options
- Common issues/troubleshooting

Keep it concise and scannable.`
				},
				{
					name: 'Generate API Docs',
					description: 'Document REST endpoints',
					prompt: `Generate API documentation for this endpoint:

[PASTE ENDPOINT CODE]

Include for each endpoint:
- HTTP method and path
- Description of purpose
- Request body schema (with types)
- Response schema (success and error)
- Authentication requirements
- Example request and response

Format as Markdown.`
				}
			]
		},
		{
			name: 'Performance',
			icon: '⚡',
			description: 'Prompts for optimization',
			prompts: [
				{
					name: 'Optimize Database Query',
					description: 'Improve slow queries',
					prompt: `Optimize this database query:

[PASTE QUERY]

Current performance issue: [DESCRIBE - slow, N+1, etc.]
Database: [PostgreSQL/MySQL/MongoDB/etc.]
Table size: [APPROXIMATE ROWS]

Suggest:
1. Query optimizations
2. Recommended indexes
3. Alternative query structure if needed
4. Explain why each change helps`
				},
				{
					name: 'Reduce Bundle Size',
					description: 'Identify and fix bloat',
					prompt: `Help reduce the bundle size for this code:

[PASTE IMPORTS AND RELEVANT CODE]

Current bundle includes: [LIST LARGE DEPENDENCIES]

Suggest:
1. Dynamic imports for code splitting
2. Lighter alternatives to heavy packages
3. Tree-shaking improvements
4. Unused code to remove

Framework: [React/Vue/Next.js/etc.]`
				},
				{
					name: 'Add Caching',
					description: 'Implement caching strategy',
					prompt: `Add caching to this function/endpoint:

[PASTE CODE]

Context:
- Data changes: [FREQUENCY - real-time, hourly, daily]
- Request volume: [HIGH/MEDIUM/LOW]
- Cache location: [Redis, in-memory, CDN, etc.]

Implement:
1. Cache key strategy
2. TTL settings
3. Cache invalidation logic
4. Fallback when cache misses`
				}
			]
		}
	];

	// Prompt engineering tips
	const promptTips = [
		{
			title: 'Be Specific',
			description: 'Replace "fix this" with "fix the null pointer exception on line 42 when user.name is undefined"',
			example: '❌ "Make this better"\n✅ "Refactor to use early returns and extract validation logic into a separate function"'
		},
		{
			title: 'Include Context',
			description: 'Tell the AI what framework, language version, and constraints you are working with',
			example: '❌ "Add authentication"\n✅ "Add JWT authentication to this Next.js 14 API route using jose library"'
		},
		{
			title: 'Use Examples',
			description: 'Show input/output pairs or reference existing code patterns',
			example: '❌ "Format like our codebase"\n✅ "Format like this existing component: [paste example]"'
		},
		{
			title: 'Structure Complex Prompts',
			description: 'Use sections for Context, Task, Constraints, and Examples',
			example: '## Context\n[Background info]\n## Task\n[What to do]\n## Constraints\n[Limitations]\n## Example\n[Sample]'
		}
	];

	let copied = $state(false);
	let copiedSection = $state('');
	let selectedCategory = $state(categories[0].name);

	// Derived value for currently selected category
	let currentCategory = $derived(categories.find(c => c.name === selectedCategory) || categories[0]);

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
			{"@type": "ListItem", "position": 3, "name": "AI Prompt Library"}
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
				<span class="badge badge-green">Prompt Library</span>
				<span class="badge">AI Coding</span>
				<span class="badge">Templates</span>
			</div>
			<h1>AI Prompt Library for Secure Coding</h1>
			<p class="text-secondary">Copy-paste prompts for security, debugging, refactoring, and testing</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Better prompts produce better code.</strong>
				This library contains copy-paste prompts organized by task - security audits, debugging, refactoring, testing, and documentation. Each prompt is structured to get useful results from any AI tool (ChatGPT, Claude, Cursor, Copilot).
			</p>
		</div>

		<!-- Introduction -->
		<section>
			<h2>How to use this prompt library</h2>
			<p>
				These prompts are templates. Copy one, replace the bracketed placeholders with your code and context, and paste into your AI tool. The structured format helps AI understand exactly what you need.
			</p>
			<p>
				Security prompts are first for a reason - vibe coders ship fast, and security often gets skipped. Run a security audit prompt on any code that handles user input, authentication, or database queries before deploying.
			</p>
			<p>
				All prompts work with ChatGPT, Claude, <a href="/kb/vibe-coding-tools/cursor/">Cursor</a>, <a href="/kb/vibe-coding-tools/claude-code/">Claude Code</a>, GitHub Copilot, and other AI assistants. Tool-specific features like @file references are noted.
			</p>
		</section>

		<!-- Category Navigation -->
		<section class="category-section">
			<h2>Prompts by category</h2>

			<div class="category-nav">
				{#each categories as category}
					<button
						class="category-btn"
						class:active={selectedCategory === category.name}
						onclick={() => selectedCategory = category.name}
					>
						<span class="category-icon">{category.icon}</span>
						<span>{category.name}</span>
					</button>
				{/each}
			</div>

			<div class="category-content">
				<div class="category-header">
					<span class="category-icon-large">{currentCategory.icon}</span>
					<div>
						<h3>{currentCategory.name} Prompts</h3>
						<p>{currentCategory.description}</p>
					</div>
				</div>

				<div class="prompts-grid">
					{#each currentCategory.prompts as prompt, i}
						<div class="card prompt-card">
							<div class="prompt-header">
								<div>
									<h4>{prompt.name}</h4>
									<p class="prompt-desc">{prompt.description}</p>
								</div>
								<button class="copy-btn" onclick={() => copyCode(prompt.prompt, `${currentCategory.name}-${i}`)}>
									{copied && copiedSection === `${currentCategory.name}-${i}` ? 'Copied!' : 'Copy'}
								</button>
							</div>
							<pre><code>{prompt.prompt}</code></pre>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- Prompt Engineering Tips -->
		<section class="tips-section">
			<h2>Prompt engineering tips</h2>
			<p>
				These principles make any prompt more effective. Apply them when customizing templates or writing your own.
			</p>

			<div class="tips-grid">
				{#each promptTips as tip}
					<div class="card tip-card">
						<h4>{tip.title}</h4>
						<p>{tip.description}</p>
						<pre><code>{tip.example}</code></pre>
					</div>
				{/each}
			</div>
		</section>

		<!-- Tool-Specific Usage -->
		<section>
			<h2>Tool-specific usage</h2>
			<p>
				Each AI tool has features that enhance these prompts.
			</p>

			<div class="tool-tips">
				<div class="card tool-tip">
					<h4>Cursor</h4>
					<p>Use <code>@file</code> to reference specific files. Save frequently-used prompts as custom rules in <code>.cursor/rules/</code></p>
					<a href="/kb/prompts/cursor-rules/">Cursor Rules Guide</a>
				</div>
				<div class="card tool-tip">
					<h4>Claude Code</h4>
					<p>Add project context to <code>CLAUDE.md</code>. Claude Code has full codebase context automatically.</p>
					<a href="/kb/prompts/claude-md/">CLAUDE.md Guide</a>
				</div>
				<div class="card tool-tip">
					<h4>ChatGPT/Claude</h4>
					<p>Include all relevant code in the prompt since there is no file access. Use code blocks with language tags.</p>
					<a href="/kb/prompts/agents-md/">AGENTS.md Guide</a>
				</div>
				<div class="card tool-tip">
					<h4>GitHub Copilot</h4>
					<p>Use comments as inline prompts. Configure via <code>.github/copilot-instructions.md</code></p>
					<a href="/kb/prompts/copilot-instructions/">Copilot Instructions Guide</a>
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
			<h2>Scan Your AI-Generated Code</h2>
			<p>
				Prompts help generate better code, but they don't catch everything. <a href="https://scanner.vibeship.co">VibeShip Scanner</a> automatically detects hardcoded secrets, SQL injection, and missing auth.
			</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">Scan Your Code Free</a>
		</section>

		<!-- Related Content -->
		<section class="article-section">
			<h2>Related guides</h2>
			<div class="related-grid">
				<a href="/kb/prompts/cursor-rules/" class="card card-interactive related-card">
					<div class="related-card-category">Config Guide</div>
					<div class="related-card-title">Cursor Rules</div>
					<p class="related-card-description">Project-level AI configuration</p>
				</a>
				<a href="/kb/prompts/claude-md/" class="card card-interactive related-card">
					<div class="related-card-category">Config Guide</div>
					<div class="related-card-title">CLAUDE.md</div>
					<p class="related-card-description">Claude Code memory system</p>
				</a>
				<a href="/kb/prompts/agents-md/" class="card card-interactive related-card">
					<div class="related-card-category">Config Guide</div>
					<div class="related-card-title">AGENTS.md</div>
					<p class="related-card-description">Universal AI configuration</p>
				</a>
				<a href="/kb/prompts/bolt-prompts/" class="card card-interactive related-card">
					<div class="related-card-category">Prompts</div>
					<div class="related-card-title">Bolt.new Prompts</div>
					<p class="related-card-description">Templates for Bolt.new</p>
				</a>
				<a href="/kb/security/vulnerabilities/sql-injection/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">SQL Injection</div>
					<p class="related-card-description">The classic database attack</p>
				</a>
				<a href="/kb/vibe-coding/secure-vibe-coding-guide/" class="card card-interactive related-card">
					<div class="related-card-category">Pillar Guide</div>
					<div class="related-card-title">Secure Vibe Coding</div>
					<p class="related-card-description">Ship fast without getting hacked</p>
				</a>
			</div>
		</section>

		<!-- External Resources -->
		<section>
			<h2>External resources</h2>
			<ul class="external-links">
				<li><a href="https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview" target="_blank" rel="noopener">Anthropic Prompt Engineering Guide</a></li>
				<li><a href="https://platform.openai.com/docs/guides/prompt-engineering" target="_blank" rel="noopener">OpenAI Prompt Engineering Guide</a></li>
				<li><a href="https://www.promptingguide.ai/" target="_blank" rel="noopener">Prompting Guide</a> - Community resource</li>
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
		font-size: 1.2rem;
		margin-top: 0;
		margin-bottom: 0.25rem;
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

	/* Category Section */
	.category-section {
		background: var(--bg-secondary);
		padding: 2rem;
		border: 1px solid var(--border);
	}

	.category-section h2 {
		border-bottom: none;
		padding-bottom: 0;
	}

	.category-nav {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		margin: 1.5rem 0;
	}

	.category-btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		background: var(--bg-primary);
		border: 1px solid var(--border);
		color: var(--text-secondary);
		cursor: pointer;
		transition: all 0.2s;
	}

	.category-btn:hover {
		border-color: var(--green-dim);
		color: var(--text-primary);
	}

	.category-btn.active {
		background: var(--green-dim);
		color: var(--bg-primary);
		border-color: var(--green-dim);
	}

	.category-icon {
		font-size: 1rem;
	}

	.category-content {
		margin-top: 1.5rem;
	}

	.category-header {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.category-icon-large {
		font-size: 2rem;
	}

	.category-header p {
		margin: 0;
		color: var(--text-secondary);
	}

	/* Prompts Grid */
	.prompts-grid {
		display: grid;
		gap: 1.5rem;
	}

	.prompt-card {
		overflow: hidden;
	}

	.prompt-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		padding: 1rem;
		background: rgba(255,255,255,0.02);
	}

	.prompt-desc {
		margin: 0;
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.prompt-card pre {
		max-height: 250px;
		overflow-y: auto;
	}

	/* Tips Section */
	.tips-section h2 {
		border-bottom: 1px solid var(--border);
	}

	.tips-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		margin: 1rem 0;
	}

	@media (max-width: 768px) {
		.tips-grid {
			grid-template-columns: 1fr;
		}
	}

	.tip-card {
		padding: 1rem;
	}

	.tip-card h4 {
		color: var(--green-dim);
	}

	.tip-card p {
		margin: 0.5rem 0;
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.tip-card pre {
		font-size: 0.75rem;
		margin-top: 0.75rem;
		border: none;
		border-radius: 4px;
	}

	/* Tool Tips */
	.tool-tips {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		margin: 1rem 0;
	}

	@media (max-width: 768px) {
		.tool-tips {
			grid-template-columns: 1fr;
		}
	}

	.tool-tip {
		padding: 1rem;
	}

	.tool-tip h4 {
		color: var(--green-dim);
		margin-bottom: 0.5rem;
	}

	.tool-tip p {
		margin: 0 0 0.75rem 0;
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.tool-tip a {
		font-size: 0.875rem;
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

		.category-section {
			padding: 1rem;
		}

		.category-nav {
			gap: 0.25rem;
		}

		.category-btn {
			padding: 0.375rem 0.75rem;
			font-size: 0.875rem;
		}
	}
</style>
