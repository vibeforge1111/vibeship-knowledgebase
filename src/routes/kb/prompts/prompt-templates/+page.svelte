<script lang="ts">
	import { Header } from '$lib/components/layout';

	const meta = {
		title: 'AI Prompt Templates: Copy-Paste Formats That Work',
		description: 'Ready-to-use prompt templates for coding. SCRIBE, RISEN, and chain-of-thought formats with fill-in-the-blank examples.',
		url: '/kb/prompts/prompt-templates/'
	};

	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Prompts', href: '/kb/prompts' },
		{ label: 'Prompt Templates' }
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
			question: 'What makes a good prompt template?',
			answer: 'Structure and specificity. Good templates have clear sections (context, task, constraints) and use placeholders that force you to provide necessary details. The SCRIBE and RISEN formats work because they leave no room for vague requests.'
		},
		{
			question: 'Should I use the same template for all AI tools?',
			answer: 'Yes for the core structure. SCRIBE works in ChatGPT, Claude, Cursor, and Copilot Chat. Minor adjustments help - Claude handles longer context, ChatGPT prefers concise prompts. The template stays the same; the detail level varies.'
		},
		{
			question: 'How long should prompt templates be?',
			answer: 'Long enough to be specific, short enough to focus. For code tasks: 50-150 words is the sweet spot. Security audits and architecture prompts can go longer (200-300 words). If your prompt exceeds 400 words, split it into chained prompts.'
		},
		{
			question: 'Why do templates work better than freestyle prompts?',
			answer: 'Templates force completeness. Vibe coders who freestyle often forget to specify constraints, error handling, or security requirements. Templates have those sections built in. The structure is a checklist disguised as a format.'
		},
		{
			question: 'Can I modify these templates?',
			answer: 'Absolutely - these are starting points. Keep the structural elements (context, constraints, output format) but adapt the details to your stack. The best template is one you\'ve customized for your workflow and committed to your repo.'
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
				<strong>Prompt templates</strong> are structured formats that produce consistent, high-quality AI output. The best ones - SCRIBE, RISEN, and chain-of-thought - force you to include context, constraints, and clear objectives. Copy the templates below and customize the bracketed sections.
			</p>
		</div>

		<span class="badge badge-info">Templates</span>

		<h1>AI Prompt Templates for Coding: Formats That Actually Work</h1>

		<p class="intro">
			Random prompts get random results. Template prompts get consistent results. The difference between vibe coders who ship clean code and those who fight with AI all day often comes down to structure. These templates aren't about making prompts longer - they're about making every word count.
		</p>

		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">6</div>
				<div class="stat-label">Templates</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">SCRIBE</div>
				<div class="stat-label">Main Format</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">2x</div>
				<div class="stat-label">Output Quality</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Copy</div>
				<div class="stat-label">& Customize</div>
			</div>
		</div>

		<!-- SCRIBE Format Section -->
		<section class="article-section">
			<h2 id="scribe">The SCRIBE Format</h2>

			<p>SCRIBE stands for Situation, Complication, Resolution, Instructions, Boundaries, Examples. It's the most comprehensive template for complex coding tasks.</p>

			<div class="format-breakdown">
				<div class="format-item">
					<span class="format-letter">S</span>
					<div>
						<strong>Situation</strong> - Current state, tech stack, what exists
					</div>
				</div>
				<div class="format-item">
					<span class="format-letter">C</span>
					<div>
						<strong>Complication</strong> - The problem or gap you're addressing
					</div>
				</div>
				<div class="format-item">
					<span class="format-letter">R</span>
					<div>
						<strong>Resolution</strong> - What success looks like
					</div>
				</div>
				<div class="format-item">
					<span class="format-letter">I</span>
					<div>
						<strong>Instructions</strong> - Specific steps or approach
					</div>
				</div>
				<div class="format-item">
					<span class="format-letter">B</span>
					<div>
						<strong>Boundaries</strong> - Constraints, things to avoid
					</div>
				</div>
				<div class="format-item">
					<span class="format-letter">E</span>
					<div>
						<strong>Examples</strong> - Sample input/output or reference code
					</div>
				</div>
			</div>

			<h3>SCRIBE Template</h3>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Template</span>
					<button class="copy-btn" class:copied={copiedId === 'scribe-template'} onclick={() => copyCode('scribe-template')}>
						{copiedId === 'scribe-template' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="scribe-template">{`**Situation:**
I'm building [type of application] using [tech stack].
Currently, [describe existing relevant code/structure].

**Complication:**
[What's not working / what's missing / what needs to change]

**Resolution:**
I need [specific deliverable] that [success criteria].

**Instructions:**
1. [First step or requirement]
2. [Second step or requirement]
3. [Additional requirements...]

**Boundaries:**
- Do NOT [thing to avoid]
- Must [constraint]
- Security: [security requirements]

**Examples:**
Input: [sample input]
Expected Output: [what it should produce]`}</code></pre>
			</div>

			<h3>SCRIBE Example: API Endpoint</h3>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Example Prompt</span>
					<button class="copy-btn" class:copied={copiedId === 'scribe-example'} onclick={() => copyCode('scribe-example')}>
						{copiedId === 'scribe-example' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="scribe-example">{`**Situation:**
I'm building a task management API using Next.js 15 App Router with Prisma and PostgreSQL.
Currently, I have a Task model and basic CRUD operations working.

**Complication:**
Users can update any task, even ones they don't own. No authorization check exists.

**Resolution:**
I need middleware or a utility function that verifies task ownership before any update/delete operation.

**Instructions:**
1. Create a checkTaskOwnership utility function
2. Return 403 if user doesn't own the task
3. Integrate with existing route handlers
4. Add TypeScript types

**Boundaries:**
- Do NOT modify the Prisma schema
- Must use the existing auth session from next-auth
- Security: Never expose whether a task exists if user doesn't own it

**Examples:**
Input: PUT /api/tasks/123 with userId "user_abc" (task owned by "user_xyz")
Expected Output: 403 Forbidden with generic error message`}</code></pre>
			</div>
		</section>

		<!-- RISEN Format Section -->
		<section class="article-section">
			<h2 id="risen">The RISEN Format</h2>

			<p>RISEN is faster than SCRIBE - good for straightforward tasks where you don't need extensive context. Role, Instructions, Steps, End-state, Narrowing.</p>

			<div class="format-breakdown">
				<div class="format-item">
					<span class="format-letter">R</span>
					<div>
						<strong>Role</strong> - What expertise the AI should apply
					</div>
				</div>
				<div class="format-item">
					<span class="format-letter">I</span>
					<div>
						<strong>Instructions</strong> - The main task
					</div>
				</div>
				<div class="format-item">
					<span class="format-letter">S</span>
					<div>
						<strong>Steps</strong> - Specific approach or sequence
					</div>
				</div>
				<div class="format-item">
					<span class="format-letter">E</span>
					<div>
						<strong>End-state</strong> - What done looks like
					</div>
				</div>
				<div class="format-item">
					<span class="format-letter">N</span>
					<div>
						<strong>Narrowing</strong> - Constraints and exclusions
					</div>
				</div>
			</div>

			<h3>RISEN Template</h3>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Template</span>
					<button class="copy-btn" class:copied={copiedId === 'risen-template'} onclick={() => copyCode('risen-template')}>
						{copiedId === 'risen-template' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="risen-template">{`**Role:** Act as a [type of expert] specializing in [specific domain].

**Instructions:** [Main task in one sentence]

**Steps:**
1. [First action]
2. [Second action]
3. [Third action]

**End-state:** The result should be [specific deliverable] that [quality criteria].

**Narrowing:**
- Only [scope limitation]
- Avoid [thing to skip]
- Use [specific approach/tool/pattern]`}</code></pre>
			</div>

			<h3>RISEN Example: Component Refactor</h3>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Example Prompt</span>
					<button class="copy-btn" class:copied={copiedId === 'risen-example'} onclick={() => copyCode('risen-example')}>
						{copiedId === 'risen-example' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="risen-example">{`**Role:** Act as a React performance expert specializing in component optimization.

**Instructions:** Refactor this component to eliminate unnecessary re-renders.

**Steps:**
1. Identify what causes re-renders (use React DevTools profiler logic)
2. Apply useMemo/useCallback where beneficial
3. Split into smaller components if needed
4. Document what changed and why

**End-state:** The result should be an optimized component that only re-renders when its own props change, with clear comments explaining each optimization.

**Narrowing:**
- Only optimize render performance (not network/bundle size)
- Avoid over-memoizing simple values
- Use React 18 patterns (no class components)`}</code></pre>
			</div>
		</section>

		<!-- Chain of Thought Section -->
		<section class="article-section">
			<h2 id="chain-of-thought">Chain-of-Thought Template</h2>

			<p>For complex problems, ask the AI to think through steps before coding. This reduces errors by making reasoning visible. Especially useful for debugging and architecture decisions.</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Template</span>
					<button class="copy-btn" class:copied={copiedId === 'cot-template'} onclick={() => copyCode('cot-template')}>
						{copiedId === 'cot-template' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="cot-template">{`I need to [goal]. Before writing code:

1. First, analyze the problem:
   - What are the inputs and expected outputs?
   - What edge cases should we handle?
   - What could go wrong?

2. Then, outline your approach:
   - What pattern or algorithm fits this problem?
   - What dependencies or utilities do we need?
   - How does this integrate with [existing system]?

3. Finally, implement the solution with:
   - [specific requirements]
   - Error handling for [scenarios]
   - Tests for [critical paths]

Show your reasoning at each step before providing the final code.`}</code></pre>
			</div>

			<h3>Chain-of-Thought Example: Database Query</h3>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Example Prompt</span>
					<button class="copy-btn" class:copied={copiedId === 'cot-example'} onclick={() => copyCode('cot-example')}>
						{copiedId === 'cot-example' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="cot-example">{`I need to build a search feature that queries users by name, email, or role with pagination. Before writing code:

1. First, analyze the problem:
   - What are the inputs and expected outputs?
   - What edge cases should we handle?
   - What could go wrong?

2. Then, outline your approach:
   - What pattern or algorithm fits this problem?
   - What dependencies or utilities do we need?
   - How does this integrate with our existing Prisma setup?

3. Finally, implement the solution with:
   - TypeScript types for search params and results
   - SQL injection protection (parameterized queries)
   - Tests for empty results, special characters, and large datasets

Show your reasoning at each step before providing the final code.`}</code></pre>
			</div>
		</section>

		<!-- Security Audit Template -->
		<section class="article-section">
			<h2 id="security">Security Audit Template</h2>

			<p>Vibe coded projects need security review. This template catches the most common vulnerabilities in AI-generated code - the ones vibe coders miss because they trusted the output.</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Template</span>
					<button class="copy-btn" class:copied={copiedId === 'security-template'} onclick={() => copyCode('security-template')}>
						{copiedId === 'security-template' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="security-template">{`Review this code for security vulnerabilities. Check for:

**Authentication & Authorization:**
- [ ] Are all routes protected that should be?
- [ ] Is authorization checked before data access?
- [ ] Are admin routes properly restricted?

**Input Validation:**
- [ ] Is user input validated before processing?
- [ ] Are file uploads restricted by type and size?
- [ ] Are query parameters sanitized?

**Data Exposure:**
- [ ] Are sensitive fields excluded from API responses?
- [ ] Are error messages generic (no stack traces)?
- [ ] Are secrets hardcoded anywhere?

**Injection Risks:**
- [ ] SQL: Using parameterized queries?
- [ ] XSS: Is user content sanitized before rendering?
- [ ] Command injection: Any shell execution with user input?

For each issue found, provide:
1. Line number and code snippet
2. Severity (Critical/High/Medium/Low)
3. Specific fix with code example

Code to review:
[paste code here]`}</code></pre>
			</div>
		</section>

		<!-- Quick Templates Section -->
		<section class="article-section">
			<h2>Quick Templates for Common Tasks</h2>

			<p>Not every task needs SCRIBE. Here are minimal templates for frequent vibe coding operations.</p>

			<div class="quick-templates">
				<div class="card template-card">
					<h3>Bug Fix</h3>
					<div class="code-block">
						<div class="code-block-header">
							<span class="code-block-lang">Template</span>
							<button class="copy-btn" class:copied={copiedId === 'quick-bugfix'} onclick={() => copyCode('quick-bugfix')}>
								{copiedId === 'quick-bugfix' ? 'Copied!' : 'Copy'}
							</button>
						</div>
						<pre><code id="quick-bugfix">{`Bug: [describe the behavior]
Expected: [what should happen]
Stack: [framework/language]

Find and fix this issue. Show the problematic code and the corrected version with explanation.`}</code></pre>
					</div>
				</div>

				<div class="card template-card">
					<h3>Add Feature</h3>
					<div class="code-block">
						<div class="code-block-header">
							<span class="code-block-lang">Template</span>
							<button class="copy-btn" class:copied={copiedId === 'quick-feature'} onclick={() => copyCode('quick-feature')}>
								{copiedId === 'quick-feature' ? 'Copied!' : 'Copy'}
							</button>
						</div>
						<pre><code id="quick-feature">{`Add [feature] to [component/file].

Requirements:
- [requirement 1]
- [requirement 2]

Must NOT break existing [functionality].
Use [pattern/library] for implementation.`}</code></pre>
					</div>
				</div>

				<div class="card template-card">
					<h3>Write Tests</h3>
					<div class="code-block">
						<div class="code-block-header">
							<span class="code-block-lang">Template</span>
							<button class="copy-btn" class:copied={copiedId === 'quick-tests'} onclick={() => copyCode('quick-tests')}>
								{copiedId === 'quick-tests' ? 'Copied!' : 'Copy'}
							</button>
						</div>
						<pre><code id="quick-tests">{`Write tests for [function/component].

Test framework: [Jest/Vitest/Playwright]
Cover:
- Happy path with valid inputs
- Edge cases: [list specific ones]
- Error cases: [list error scenarios]

Include setup/teardown if needed.`}</code></pre>
					</div>
				</div>

				<div class="card template-card">
					<h3>Code Review</h3>
					<div class="code-block">
						<div class="code-block-header">
							<span class="code-block-lang">Template</span>
							<button class="copy-btn" class:copied={copiedId === 'quick-review'} onclick={() => copyCode('quick-review')}>
								{copiedId === 'quick-review' ? 'Copied!' : 'Copy'}
							</button>
						</div>
						<pre><code id="quick-review">{`Review this code for:
1. Bugs or logic errors
2. Performance issues
3. Security vulnerabilities
4. Readability improvements

Be specific: line numbers, concrete suggestions, example fixes.

[paste code]`}</code></pre>
					</div>
				</div>
			</div>
		</section>

		<!-- When to Use Which Section -->
		<section class="article-section">
			<h2>When to Use Which Template</h2>

			<table class="comparison-table">
				<thead>
					<tr>
						<th>Task Type</th>
						<th>Template</th>
						<th>Why</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>New feature with edge cases</td>
						<td>SCRIBE</td>
						<td>Needs full context and boundaries</td>
					</tr>
					<tr>
						<td>Quick refactor</td>
						<td>RISEN</td>
						<td>Clear end-state, simple scope</td>
					</tr>
					<tr>
						<td>Debug complex issue</td>
						<td>Chain-of-Thought</td>
						<td>Reasoning prevents wrong assumptions</td>
					</tr>
					<tr>
						<td>Pre-ship security check</td>
						<td>Security Audit</td>
						<td>Structured checklist catches more</td>
					</tr>
					<tr>
						<td>Simple fix/addition</td>
						<td>Quick Templates</td>
						<td>Overhead not worth it for small tasks</td>
					</tr>
				</tbody>
			</table>
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
				<a href="/kb/prompts/prompt-engineering-code/" class="card card-interactive related-card">
					<div class="related-card-category">Guide</div>
					<div class="related-card-title">Prompt Engineering</div>
					<p class="related-card-description">Core techniques for better prompts</p>
				</a>
				<a href="/kb/prompts/chatgpt-prompt-examples/" class="card card-interactive related-card">
					<div class="related-card-category">Examples</div>
					<div class="related-card-title">ChatGPT Prompts</div>
					<p class="related-card-description">40+ prompts for developers</p>
				</a>
				<a href="/kb/prompts/custom-instructions/" class="card card-interactive related-card">
					<div class="related-card-category">Configuration</div>
					<div class="related-card-title">Custom Instructions</div>
					<p class="related-card-description">Persistent settings for AI tools</p>
				</a>
				<a href="/kb/prompts/ai-coding-prompts/" class="card card-interactive related-card">
					<div class="related-card-category">Collection</div>
					<div class="related-card-title">AI Coding Prompts</div>
					<p class="related-card-description">50+ prompts for shipping faster</p>
				</a>
			</div>
		</section>

		<div class="cta-box">
			<h3>Templates Can't Catch Everything</h3>
			<p>Even with perfect prompts, AI-generated code has security blind spots. VibeShip Scanner finds what templates miss.</p>
			<a href="https://vibeship.co" class="btn btn-green">Scan Your Code Free</a>
		</div>
	</article>
</div>

<style>
	.intro { font-size: 1.125rem; color: var(--text-secondary); margin-bottom: 2rem; line-height: 1.7; }
	.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin: 1.5rem 0 2rem; }

	/* Format Breakdown */
	.format-breakdown { display: flex; flex-direction: column; gap: 0.5rem; margin: 1.5rem 0; }
	.format-item { display: flex; align-items: flex-start; gap: 1rem; padding: 0.75rem; background: var(--bg-secondary); }
	.format-letter { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; background: var(--green); color: var(--bg-primary); font-weight: 700; flex-shrink: 0; }
	.format-item strong { color: var(--text-primary); }

	/* Quick Templates Grid */
	.quick-templates { display: grid; gap: 1rem; margin: 1.5rem 0; }
	.template-card h3 { margin: 0 0 0.75rem; font-size: 1rem; }

	/* Comparison Table */
	.comparison-table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
	.comparison-table th, .comparison-table td { padding: 0.75rem; text-align: left; border-bottom: 1px solid var(--border); }
	.comparison-table th { background: var(--bg-secondary); font-weight: 600; }
	.comparison-table td:nth-child(2) { font-weight: 500; color: var(--green); }

	@media (max-width: 768px) { .stats-row { grid-template-columns: repeat(2, 1fr); } }
	@media (max-width: 480px) { .stats-row { grid-template-columns: 1fr; } }
</style>
