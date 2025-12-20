<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Cursor System Prompt: Configure AI Behavior in 2025',
		description: 'Learn how to set up Cursor system prompts for better AI code generation. Get copy-paste examples including security-focused prompts that prevent vulnerabilities.',
		url: '/kb/prompts/cursor-system-prompt/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Prompts', href: '/kb/prompts' },
		{ label: 'Cursor System Prompt' }
	];

	// FAQ data
	const faqs = [
		{
			question: 'What is a Cursor system prompt?',
			answer: 'A Cursor system prompt is a user-level instruction that applies to all your Cursor AI interactions globally. Unlike .cursorrules files which are project-specific, system prompts follow you across all projects. Access it via Cursor Settings > General > Rules for AI. Use it for personal preferences like response format and coding style.'
		},
		{
			question: 'Where do I set the Cursor system prompt?',
			answer: 'Open Cursor Settings (Cmd/Ctrl + ,), go to General tab, find "Rules for AI" section. Enter your system prompt in the text area. Changes apply immediately to all new conversations. For project-specific rules, use .cursorrules files instead.'
		},
		{
			question: 'What is the difference between system prompt and .cursorrules?',
			answer: 'System prompts are user-level and global (follow you everywhere). .cursorrules are project-level and version-controlled (shared with team). Use system prompts for personal preferences. Use .cursorrules for project conventions and security rules that the whole team should follow.'
		},
		{
			question: 'How long can a Cursor system prompt be?',
			answer: 'Cursor system prompts should be kept concise, ideally under 500 words. Longer prompts consume context window space that could be used for code. Focus on high-impact rules that change default behavior. Move detailed rules to .cursorrules files.'
		},
		{
			question: 'Can I use both system prompt and .cursorrules?',
			answer: 'Yes, they stack. Cursor combines your global system prompt with project .cursorrules. Project rules take precedence for conflicts. This layered approach lets you set personal defaults globally while respecting team conventions per project.'
		},
		{
			question: 'What should I put in my Cursor system prompt?',
			answer: 'Include: response format preferences (concise vs detailed), language defaults (TypeScript over JavaScript), universal security rules (parameterized queries, auth checks), and coding style preferences. Avoid project-specific details which belong in .cursorrules.'
		},
		{
			question: 'Does the system prompt affect all Cursor features?',
			answer: 'Yes. The system prompt influences Chat, Composer, and inline completions. It shapes how Cursor generates, explains, and modifies code across all features. Higher-impact in Chat/Composer than autocomplete, but affects everything.'
		}
	];

	// System prompt examples
	const promptExamples = [
		{
			name: 'Security-First Developer',
			description: 'Prevents common vulnerabilities in all generated code',
			prompt: `# Security-First Coding

## Core Rules
- NEVER use template literals for database queries
- ALWAYS use parameterized queries or ORM methods
- Check authentication on every API route
- Validate all user input on the server with Zod
- Never expose secrets in client-side code

## Response Style
- Be concise, skip unnecessary explanations
- Show secure patterns first, explain why after
- Flag security concerns before I ask

## Code Quality
- TypeScript with strict mode
- Prefer named exports
- Handle errors explicitly`
		},
		{
			name: 'Minimal Responses',
			description: 'Code-focused with minimal explanation',
			prompt: `# Response Style
- Code first, explanations only if asked
- No markdown formatting in code blocks
- Skip "here's what I did" summaries
- One solution, not multiple options
- No placeholder comments like "// your logic here"

# Defaults
- TypeScript over JavaScript
- Functional over class-based
- Modern syntax (ES2022+)
- Prefer standard library over dependencies`
		},
		{
			name: 'Vibe Coder Defaults',
			description: 'Balanced for AI-assisted development',
			prompt: `# Vibe Coding Defaults

## Security (Non-Negotiable)
- Parameterized queries only, never string concatenation
- Auth check on every server action and API route
- Input validation with Zod on server
- Never hardcode secrets

## Style
- Concise responses unless I ask for explanation
- Show working code, not pseudocode
- Include imports in examples
- TypeScript strict mode

## When Generating
- Server Components by default (Next.js)
- Handle loading and error states
- Add basic TypeScript types`
		}
	];

	// Comparison data
	const configComparison = [
		{
			feature: 'Scope',
			systemPrompt: 'Global (all projects)',
			cursorrules: 'Per-project'
		},
		{
			feature: 'Location',
			systemPrompt: 'Cursor Settings > General',
			cursorrules: '.cursorrules or .cursor/rules/'
		},
		{
			feature: 'Version Control',
			systemPrompt: 'Not tracked',
			cursorrules: 'Committed to repo'
		},
		{
			feature: 'Team Sharing',
			systemPrompt: 'Manual copy',
			cursorrules: 'Auto via git'
		},
		{
			feature: 'Best For',
			systemPrompt: 'Personal preferences',
			cursorrules: 'Project conventions'
		},
		{
			feature: 'Precedence',
			systemPrompt: 'Lower',
			cursorrules: 'Higher (wins conflicts)'
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
			{"@type": "ListItem", "position": 3, "name": "Cursor System Prompt"}
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
				<span class="badge badge-green">Prompts Guide</span>
				<span class="badge">Cursor</span>
				<span class="badge">Configuration</span>
			</div>
			<h1>Cursor System Prompt: Global AI Configuration</h1>
			<p class="text-secondary">Set once, apply everywhere - configure Cursor AI behavior across all your projects</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>The Cursor system prompt is a global configuration that applies to all your projects.</strong>
				Access it via Cursor Settings > General > Rules for AI. Use it for personal preferences like response style and security defaults. For project-specific rules, use <a href="/kb/prompts/cursor-rules/">.cursorrules files</a> instead.
			</p>
		</div>

		<!-- What Is It -->
		<section>
			<h2>What is a Cursor system prompt?</h2>
			<p>
				A Cursor system prompt is your personal configuration for how <a href="/kb/vibe-coding-tools/cursor/">Cursor AI</a> behaves across all projects. Unlike <a href="/kb/prompts/cursor-rules/">.cursorrules</a> files that live in project folders, the system prompt follows you everywhere. It's your chance to set global defaults without repeating yourself.
			</p>
			<p>
				For vibe coders, this is where you establish baseline security rules. Every project gets your "never use template literals for SQL" rule automatically. You set it once, then every vibe coded project inherits those protections.
			</p>
			<p>
				The system prompt and .cursorrules work together. System prompt sets your personal defaults. Project rules add team conventions. When both exist, project rules take precedence for conflicts - your team's decisions override your preferences.
			</p>
		</section>

		<!-- How to Set Up -->
		<section>
			<h2>How to set up your Cursor system prompt</h2>
			<p>
				Setting up your system prompt takes 30 seconds. Open Cursor, access settings, paste your prompt. All new conversations immediately use your configuration.
			</p>

			<div class="steps-list">
				<div class="step">
					<span class="step-number">1</span>
					<div class="step-content">
						<strong>Open Cursor Settings</strong>
						<p>Press <code>Cmd + ,</code> (Mac) or <code>Ctrl + ,</code> (Windows/Linux). Or click the gear icon in the bottom-left corner.</p>
					</div>
				</div>
				<div class="step">
					<span class="step-number">2</span>
					<div class="step-content">
						<strong>Navigate to General tab</strong>
						<p>The system prompt setting is under General, not in a separate "AI" section.</p>
					</div>
				</div>
				<div class="step">
					<span class="step-number">3</span>
					<div class="step-content">
						<strong>Find "Rules for AI"</strong>
						<p>Scroll to the "Rules for AI" section. This is your system prompt input area.</p>
					</div>
				</div>
				<div class="step">
					<span class="step-number">4</span>
					<div class="step-content">
						<strong>Enter your prompt</strong>
						<p>Paste or type your system prompt. Changes save automatically and apply to new conversations immediately.</p>
					</div>
				</div>
			</div>

			<p>
				No restart needed. Close settings and start a new chat - your system prompt is active. Existing conversations won't pick up changes, but all new ones will.
			</p>
		</section>

		<!-- System Prompt vs .cursorrules -->
		<section>
			<h2>System prompt vs .cursorrules: which to use?</h2>
			<p>
				Both configure Cursor AI, but for different purposes. Use them together for the best setup.
			</p>

			<div class="comparison-stack">
				{#each configComparison as row}
					<div class="comparison-row">
						<div class="comparison-feature"><strong>{row.feature}</strong></div>
						<div class="comparison-details">
							<div class="comparison-item">
								<span class="comparison-label">System Prompt</span>
								<span class="comparison-value">{row.systemPrompt}</span>
							</div>
							<div class="comparison-item">
								<span class="comparison-label">.cursorrules</span>
								<span class="comparison-value">{row.cursorrules}</span>
							</div>
						</div>
					</div>
				{/each}
			</div>

			<h3>The layering pattern</h3>
			<p>
				Smart vibe coders use both. System prompt handles universal preferences: response style, TypeScript defaults, core security rules. .cursorrules handles project specifics: framework patterns, team conventions, API structures.
			</p>
			<p>
				When you clone a new repo with .cursorrules, your system prompt security rules still apply. The project rules add context, your personal rules add protection. Layered configuration.
			</p>
		</section>

		<!-- Copy-Paste Examples -->
		<section>
			<h2>Copy-paste system prompt examples</h2>
			<p>
				Start with one of these templates. Each solves a specific vibe coding problem.
			</p>

			{#each promptExamples as example}
				<div class="code-block">
					<div class="code-block-header">
						<div class="code-block-info">
							<span class="code-block-lang">{example.name}</span>
							<span class="code-block-desc">{example.description}</span>
						</div>
						<button
							class="copy-btn"
							onclick={() => copyCode(example.prompt, example.name)}
						>
							{copied && copiedSection === example.name ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre><code>{example.prompt}</code></pre>
				</div>
			{/each}
		</section>

		<!-- Security Rules Section -->
		<section>
			<h2>Security rules to include</h2>
			<p>
				These security rules belong in every vibe coder's system prompt. They catch the most common AI-generated vulnerabilities before they happen.
			</p>

			<div class="security-rules">
				<div class="rule-card">
					<h4>SQL Injection Prevention</h4>
					<code>NEVER use template literals for SQL queries. ALWAYS use parameterized queries.</code>
					<p class="text-secondary">AI tools default to string concatenation. This rule forces safer patterns.</p>
				</div>
				<div class="rule-card">
					<h4>Authentication Checks</h4>
					<code>Check authentication on EVERY API route and Server Action before processing.</code>
					<p class="text-secondary">Vibe coded apps often ship with unprotected endpoints. This catches them.</p>
				</div>
				<div class="rule-card">
					<h4>Input Validation</h4>
					<code>Validate ALL user input on the server with Zod. Never trust client validation alone.</code>
					<p class="text-secondary">Client-side validation is trivially bypassed. Server validation is mandatory.</p>
				</div>
				<div class="rule-card">
					<h4>Secret Handling</h4>
					<code>Never hardcode secrets. Use environment variables. Never expose server secrets to client.</code>
					<p class="text-secondary">Prevents the <a href="/kb/security/vulnerabilities/hardcoded-secrets/">hardcoded secrets</a> vulnerability common in AI code.</p>
				</div>
			</div>

			<p>
				Combine these into a security block in your system prompt. Even if a project lacks .cursorrules, these protections apply automatically.
			</p>
		</section>

		<!-- Best Practices -->
		<section>
			<h2>System prompt best practices</h2>
			<p>
				Configuration that works in testing often fails in practice. These patterns hold up.
			</p>

			<div class="practices-grid">
				<div class="practice-card do">
					<h4>Do</h4>
					<ul>
						<li>Keep under 500 words</li>
						<li>Focus on behavior changes</li>
						<li>Include security defaults</li>
						<li>Set response format preferences</li>
						<li>Use clear, imperative language</li>
					</ul>
				</div>
				<div class="practice-card dont">
					<h4>Don't</h4>
					<ul>
						<li>Include project-specific details</li>
						<li>Repeat what Cursor does by default</li>
						<li>Add lengthy explanations</li>
						<li>Conflict with common .cursorrules</li>
						<li>Rely on system prompt alone for security</li>
					</ul>
				</div>
			</div>

			<p>
				The system prompt is context that Cursor includes in every request. Shorter prompts leave more room for your actual code and questions. Efficiency matters.
			</p>
		</section>

		<!-- FAQ Section -->
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

		<!-- Related Content -->
		<section>
			<h2>Related guides</h2>
			<div class="related-grid">
				<a href="/kb/prompts/cursor-rules/" class="card card-interactive">
					<h3>Cursor Rules Guide</h3>
					<p>Complete guide to .cursorrules files with copy-paste templates</p>
				</a>
				<a href="/kb/prompts/cursor-rules-examples/" class="card card-interactive">
					<h3>Cursor Rules Examples</h3>
					<p>50+ real-world cursor rules for different frameworks</p>
				</a>
				<a href="/kb/vibe-coding-tools/cursor/" class="card card-interactive">
					<h3>Cursor Security Patterns</h3>
					<p>Security analysis of Cursor-generated code</p>
				</a>
				<a href="/kb/prompts/claude-md/" class="card card-interactive">
					<h3>CLAUDE.md Guide</h3>
					<p>Similar configuration for Claude Code users</p>
				</a>
			</div>
		</section>

		<!-- CTA -->
		<section class="cta-box">
			<h2>Scan your vibe coded project</h2>
			<p>System prompts reduce but don't eliminate security issues. Scan your code to catch what slipped through.</p>
			<a href="https://scanner.vibeship.co" class="cta-button">Scan Your Code Free</a>
		</section>
	</article>
</div>

<style>
	.article-header {
		margin-bottom: 2rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid var(--border);
	}

	.badge-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 0.75rem;
	}

	.badge-green {
		background: var(--green-muted);
		color: var(--green);
	}

	.text-secondary {
		color: var(--text-secondary);
	}

	/* Steps */
	.steps-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.step {
		display: flex;
		gap: 1rem;
		align-items: flex-start;
	}

	.step-number {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		background: var(--green);
		color: var(--bg-primary);
		border-radius: 50%;
		font-weight: 600;
		flex-shrink: 0;
	}

	.step-content {
		flex: 1;
	}

	.step-content p {
		margin: 0.25rem 0 0;
		color: var(--text-secondary);
		font-size: 0.9rem;
	}

	/* Comparison Stack */
	.comparison-stack {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin: 1.5rem 0;
	}

	.comparison-row {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1rem;
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		align-items: center;
	}

	.comparison-feature {
		min-width: 120px;
		font-size: 0.95rem;
	}

	.comparison-details {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem 2rem;
		flex: 1;
	}

	.comparison-item {
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
		min-width: 150px;
	}

	.comparison-label {
		font-size: 0.7rem;
		color: var(--text-tertiary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.comparison-value {
		font-size: 0.875rem;
		color: var(--text-primary);
	}

	/* Code Block Overrides */
	.code-block {
		margin: 1.5rem 0;
	}

	.code-block-info {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.code-block-desc {
		font-size: 0.75rem;
		color: var(--text-secondary);
		font-family: 'Inter', sans-serif;
		text-transform: none;
		letter-spacing: normal;
	}

	.code-block pre {
		margin: 0;
		padding: 1rem;
		font-size: 0.8rem;
		line-height: 1.6;
		white-space: pre-wrap;
		word-wrap: break-word;
	}

	.code-block code {
		background: none;
		padding: 0;
		white-space: pre-wrap;
		word-wrap: break-word;
	}

	/* Security Rules */
	.security-rules {
		display: grid;
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.rule-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-left: 3px solid var(--green);
		padding: 1rem;
	}

	.rule-card h4 {
		margin: 0 0 0.5rem;
		font-size: 0.95rem;
	}

	.rule-card code {
		display: block;
		background: var(--bg-primary);
		padding: 0.75rem;
		font-size: 0.8rem;
		margin-bottom: 0.5rem;
	}

	.rule-card p {
		margin: 0;
		font-size: 0.85rem;
	}

	/* Practices Grid */
	.practices-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.practice-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1rem;
	}

	.practice-card.do {
		border-left: 3px solid var(--green);
	}

	.practice-card.dont {
		border-left: 3px solid var(--red);
	}

	.practice-card h4 {
		margin: 0 0 0.75rem;
		font-size: 0.95rem;
	}

	.practice-card.do h4 {
		color: var(--green);
	}

	.practice-card.dont h4 {
		color: var(--red);
	}

	.practice-card ul {
		margin: 0;
		padding-left: 1.25rem;
	}

	.practice-card li {
		font-size: 0.875rem;
		margin-bottom: 0.35rem;
	}

	/* Mobile */
	@media (max-width: 768px) {
		.comparison-row {
			flex-direction: column;
			align-items: flex-start;
		}

		.comparison-feature {
			width: 100%;
			padding-bottom: 0.5rem;
			border-bottom: 1px solid var(--border);
			margin-bottom: 0.25rem;
		}

		.comparison-details {
			width: 100%;
		}

		.comparison-item {
			min-width: calc(50% - 0.5rem);
		}

		.practices-grid {
			grid-template-columns: 1fr;
		}

		.step {
			flex-direction: column;
			gap: 0.5rem;
		}

		.code-block-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.75rem;
		}
	}
</style>
