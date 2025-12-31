<script lang="ts">
	import { Header } from '$lib/components/layout';

	const meta = {
		title: 'Documentation Prompts: AI-Generated Docs & Comments',
		description: 'Prompts to generate documentation for vibe coded projects. READMEs, JSDoc, API docs, and architecture documentation with AI.',
		url: '/kb/prompts/documentation-prompts/'
	};

	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Prompts', href: '/kb/prompts' },
		{ label: 'Documentation Prompts' }
	];

	let copiedId: string | null = $state(null);

	function copyCode(id: string) {
		const el = document.getElementById(id);
		if (el) {
			navigator.clipboard.writeText(el.textContent || '').then(() => {
				copiedId = id;
				setTimeout(() => { copiedId = null; }, 2000);
			});
		}
	}

	const faqs = [
		{
			question: 'When should I document AI-generated code?',
			answer: 'Document after the code is stable, not while vibe coding. Documentation during rapid iteration becomes outdated immediately. Wait until a feature is complete, then document. Exception: document complex logic as you figure it out, or you\'ll forget.'
		},
		{
			question: 'Should AI add comments to all my code?',
			answer: 'No. Good code is self-documenting. Comments explain why, not what. Don\'t ask AI to comment obvious operations. Ask for comments on: non-obvious business logic, workarounds for bugs, security decisions, and complex algorithms.'
		},
		{
			question: 'What makes a good README for vibe coded projects?',
			answer: 'Quick start first. Vibe coders want to run the project in 60 seconds. Lead with: 1) What it does (one sentence), 2) How to run it (copy-paste commands), 3) Environment setup. Save architecture details for later in the doc.'
		},
		{
			question: 'How do I keep documentation in sync with code?',
			answer: 'Regenerate docs when code changes significantly. Keep prompts saved so you can re-run them. For API docs, use tools that generate from code (TypeDoc, Swagger). For READMEs, review monthly and update or regenerate.'
		},
		{
			question: 'Is JSDoc worth it for small projects?',
			answer: 'Yes, but only for exports and public functions. JSDoc gives IDE autocomplete and type hints even in JavaScript. Don\'t document internal implementation details. Focus on: function purpose, parameter expectations, return values, and thrown errors.'
		}
	];
</script>

<svelte:head>
	<title>{meta.title} | VibeShip</title>
	<meta name="description" content={meta.description} />
	<link rel="canonical" href="https://vibeship.co{meta.url}" />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:url" content="https://vibeship.co{meta.url}" />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<Header {breadcrumbs} />

<div class="content-wrapper">
	<article class="content-main content-wide">
		<div class="quick-answer">
			<p>
				<strong>AI writes docs faster than you.</strong> But it writes too much of the wrong stuff without guidance. These prompts generate useful documentation: READMEs that help people run your code, JSDoc that improves IDE experience, and architecture docs that explain the why.
			</p>
		</div>

		<span class="badge badge-info">Documentation</span>

		<h1>Documentation Prompts: Docs That Actually Help</h1>

		<p class="intro">
			Vibe coders skip documentation because writing docs is slow and boring. AI removes that excuse. These prompts generate the documentation your future self will thank you for - the README that explains setup, the comments that explain why, the API docs that save Slack questions.
		</p>

		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">6</div>
				<div class="stat-label">Prompts</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">README</div>
				<div class="stat-label">JSDoc</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">API</div>
				<div class="stat-label">Docs</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Copy</div>
				<div class="stat-label">Paste</div>
			</div>
		</div>

		<!-- README Generation Section -->
		<section class="article-section">
			<h2 id="readme">README Generation Prompt</h2>

			<p>A README that gets someone running your project in under 2 minutes.</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">README Generator</span>
					<button class="copy-btn" class:copied={copiedId === 'readme-gen'} onclick={() => copyCode('readme-gen')}>
						{copiedId === 'readme-gen' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="readme-gen">{`Generate a README.md for this project.

Structure (in this order):
1. **Title** - Project name
2. **One-liner** - What it does in one sentence
3. **Quick Start** - Get running in 3 commands or less
4. **Prerequisites** - What they need installed
5. **Environment Setup** - .env variables needed
6. **Available Scripts** - npm commands
7. **Tech Stack** - Brief list of main technologies
8. **Project Structure** - Key folders/files explained

Keep it scannable:
- Use code blocks for all commands
- Bullet points over paragraphs
- No walls of text
- Skip obvious sections (license, contributing)

Project info:
- Name: [project name]
- Stack: [Next.js, Supabase, etc.]
- Main features: [list features]

Package.json:
[paste package.json]`}</code></pre>
			</div>
		</section>

		<!-- JSDoc Section -->
		<section class="article-section">
			<h2 id="jsdoc">JSDoc/TSDoc Generation Prompt</h2>

			<p>Documentation that improves IDE autocomplete and catches errors at dev time.</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">JSDoc Generator</span>
					<button class="copy-btn" class:copied={copiedId === 'jsdoc-gen'} onclick={() => copyCode('jsdoc-gen')}>
						{copiedId === 'jsdoc-gen' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="jsdoc-gen">{`Add JSDoc/TSDoc comments to this code.

Document:
1. Exported functions and classes
2. Complex internal functions (>20 lines or non-obvious logic)
3. Type definitions that need explanation

Include for functions:
- @description - What it does (one line)
- @param - Each parameter with type and purpose
- @returns - Return type and what it represents
- @throws - Errors that can be thrown
- @example - Usage example (for public APIs)

Skip:
- Obvious getters/setters
- Simple one-liners
- Internal implementation details

Format:
\`\`\`typescript
/**
 * Validates user input and returns sanitized data.
 * @param input - Raw user input from form
 * @returns Validated and sanitized user data
 * @throws {ValidationError} If input fails validation
 */
\`\`\`

Code:
[paste code]`}</code></pre>
			</div>
		</section>

		<!-- API Documentation Section -->
		<section class="article-section">
			<h2 id="api">API Documentation Prompt</h2>

			<p>Document your API endpoints so others (and future you) can use them.</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">API Docs Generator</span>
					<button class="copy-btn" class:copied={copiedId === 'api-docs'} onclick={() => copyCode('api-docs')}>
						{copiedId === 'api-docs' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="api-docs">{`Generate API documentation for this endpoint.

Format for each endpoint:

## [METHOD] [path]

**Description:** What it does

**Authentication:** Required/Optional/None

**Request:**
\`\`\`json
{
  "field": "type - description"
}
\`\`\`

**Response (200):**
\`\`\`json
{
  "field": "type - description"
}
\`\`\`

**Error Responses:**
- 400: Validation error
- 401: Not authenticated
- 403: Not authorized
- 404: Not found

**Example:**
\`\`\`bash
curl -X POST https://api.example.com/endpoint \\
  -H "Authorization: Bearer token" \\
  -d '{"field": "value"}'
\`\`\`

Endpoint code:
[paste route handler]`}</code></pre>
			</div>
		</section>

		<!-- Focused Documentation Prompts -->
		<section class="article-section">
			<h2>Focused Documentation Prompts</h2>

			<div class="focused-grid">
				<div class="card prompt-card">
					<h3>Code Comments</h3>
					<div class="code-block">
						<div class="code-block-header">
							<span class="code-block-lang">Prompt</span>
							<button class="copy-btn" class:copied={copiedId === 'comments'} onclick={() => copyCode('comments')}>
								{copiedId === 'comments' ? 'Copied!' : 'Copy'}
							</button>
						</div>
						<pre><code id="comments">{`Add comments to explain WHY, not WHAT.

Comment these things:
- Non-obvious business logic
- Workarounds or hacks (with ticket/issue refs)
- Security-related decisions
- Performance optimizations
- Regex patterns

Don't comment:
- Variable assignments
- Standard operations
- Self-explanatory code

[paste code]`}</code></pre>
					</div>
				</div>

				<div class="card prompt-card">
					<h3>Architecture Doc</h3>
					<div class="code-block">
						<div class="code-block-header">
							<span class="code-block-lang">Prompt</span>
							<button class="copy-btn" class:copied={copiedId === 'architecture'} onclick={() => copyCode('architecture')}>
								{copiedId === 'architecture' ? 'Copied!' : 'Copy'}
							</button>
						</div>
						<pre><code id="architecture">{`Write architecture documentation:

1. System Overview (diagram description)
2. Key Components and responsibilities
3. Data Flow for main operations
4. External Dependencies
5. Key Decisions and trade-offs

Keep it high-level. Link to code for details.

Project structure:
[paste directory tree]

Main files:
[paste key files]`}</code></pre>
					</div>
				</div>

				<div class="card prompt-card">
					<h3>Changelog Entry</h3>
					<div class="code-block">
						<div class="code-block-header">
							<span class="code-block-lang">Prompt</span>
							<button class="copy-btn" class:copied={copiedId === 'changelog'} onclick={() => copyCode('changelog')}>
								{copiedId === 'changelog' ? 'Copied!' : 'Copy'}
							</button>
						</div>
						<pre><code id="changelog">{`Write a changelog entry for this release.

Format:
## [Version] - YYYY-MM-DD

### Added
- New features

### Changed
- Modifications

### Fixed
- Bug fixes

### Security
- Security updates

Keep entries brief. User perspective.

Changes since last release:
[paste git log or commit list]`}</code></pre>
					</div>
				</div>

				<div class="card prompt-card">
					<h3>Onboarding Doc</h3>
					<div class="code-block">
						<div class="code-block-header">
							<span class="code-block-lang">Prompt</span>
							<button class="copy-btn" class:copied={copiedId === 'onboarding'} onclick={() => copyCode('onboarding')}>
								{copiedId === 'onboarding' ? 'Copied!' : 'Copy'}
							</button>
						</div>
						<pre><code id="onboarding">{`Write a developer onboarding guide:

1. First Day Setup
   - Clone, install, run
   - Environment variables
   - Test the setup works

2. Codebase Tour
   - Where things live
   - Key patterns to know
   - Common tasks

3. Making Changes
   - Branch strategy
   - Testing requirements
   - Deployment process

Keep it actionable.

[describe project]`}</code></pre>
					</div>
				</div>
			</div>
		</section>

		<!-- Documentation Tips Section -->
		<section class="article-section">
			<h2>Documentation Best Practices</h2>

			<div class="tips-grid">
				<div class="card tip-card">
					<h4>Lead with Quick Start</h4>
					<p>First thing in every README: how to run it. Setup details come later.</p>
				</div>
				<div class="card tip-card">
					<h4>Document the Why</h4>
					<p>Code shows what. Comments explain why. "Using X because Y has bug Z."</p>
				</div>
				<div class="card tip-card">
					<h4>Keep it Current</h4>
					<p>Outdated docs are worse than no docs. Regenerate when code changes.</p>
				</div>
				<div class="card tip-card">
					<h4>One Source of Truth</h4>
					<p>Don't duplicate. Link to code for implementation details.</p>
				</div>
			</div>
		</section>

		<!-- FAQ Section -->
		<section class="article-section">
			<h2>Frequently Asked Questions</h2>
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
		<section class="article-section">
			<h2>Related Guides</h2>
			<div class="related-grid">
				<a href="/kb/prompts/code-review-prompts/" class="card card-interactive related-card">
					<div class="related-card-category">Review</div>
					<div class="related-card-title">Code Review Prompts</div>
					<p class="related-card-description">Review before documenting</p>
				</a>
				<a href="/kb/prompts/refactoring-prompts/" class="card card-interactive related-card">
					<div class="related-card-category">Refactor</div>
					<div class="related-card-title">Refactoring Prompts</div>
					<p class="related-card-description">Clean code needs less docs</p>
				</a>
				<a href="/kb/prompts/prompt-templates/" class="card card-interactive related-card">
					<div class="related-card-category">Templates</div>
					<div class="related-card-title">Prompt Templates</div>
					<p class="related-card-description">Structured prompting formats</p>
				</a>
				<a href="/kb/prompts/chatgpt-prompt-examples/" class="card card-interactive related-card">
					<div class="related-card-category">Examples</div>
					<div class="related-card-title">ChatGPT Prompts</div>
					<p class="related-card-description">More prompts for developers</p>
				</a>
			</div>
		</section>

		<div class="cta-box">
			<h3>Documentation Doesn't Replace Security</h3>
			<p>Well-documented vibe coded projects still have vulnerabilities. VibeShip Scanner finds security issues your docs won't mention.</p>
			<a href="https://vibeship.co" class="btn btn-green">Scan Your Code Free</a>
		</div>
	</article>
</div>

<style>
	.intro { font-size: 1.125rem; color: var(--text-secondary); margin-bottom: 2rem; line-height: 1.7; }
	.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin: 1.5rem 0 2rem; }

	/* Focused Grid */
	.focused-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1rem 0; }
	.prompt-card h3 { margin: 0 0 0.75rem; font-size: 1rem; }

	/* Tips Grid */
	.tips-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1rem 0; }
	.tip-card h4 { margin: 0 0 0.5rem; font-size: 0.95rem; color: var(--green); }
	.tip-card p { margin: 0; font-size: 0.875rem; color: var(--text-secondary); }

	@media (max-width: 768px) {
		.stats-row { grid-template-columns: repeat(2, 1fr); }
		.focused-grid, .tips-grid { grid-template-columns: 1fr; }
	}
	@media (max-width: 480px) { .stats-row { grid-template-columns: 1fr; } }
</style>
