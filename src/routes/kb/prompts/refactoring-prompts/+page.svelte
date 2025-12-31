<script lang="ts">
	import { Header } from '$lib/components/layout';

	const meta = {
		title: 'Refactoring Prompts: Clean Up AI-Generated Code',
		description: 'Prompts to refactor vibe coded projects. Reduce complexity, extract functions, improve readability, and fix security issues in AI-generated code.',
		url: '/kb/prompts/refactoring-prompts/'
	};

	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Prompts', href: '/kb/prompts' },
		{ label: 'Refactoring Prompts' }
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
			question: 'When should I refactor AI-generated code?',
			answer: 'Immediately after it works but before you ship. Vibe coded projects accumulate debt fast because AI generates "good enough" code without considering the whole codebase. Refactor while context is fresh - waiting makes it harder.'
		},
		{
			question: 'What\'s the biggest problem with AI-generated code?',
			answer: 'Duplication. AI doesn\'t know what code already exists in your project, so it generates similar solutions repeatedly. After a vibe coding session, you often have 3 functions that do almost the same thing. Consolidation is the first refactoring priority.'
		},
		{
			question: 'Should I refactor and add features at the same time?',
			answer: 'No. Refactor first, then add features. Mixing them makes bugs hard to track - did the bug come from the refactor or the new code? Commit the refactor, verify it works, then add new functionality.'
		},
		{
			question: 'How do I refactor without breaking things?',
			answer: 'Tests first (even basic ones), then small changes. If you don\'t have tests, add them before refactoring. Each refactoring step should be small enough that you can verify nothing broke. Big-bang refactors are how bugs hide.'
		},
		{
			question: 'Can AI help with refactoring safely?',
			answer: 'Yes, if you constrain it. "Refactor this code, keep functionality identical" works better than "improve this code." Ask AI to explain what it changed and why. Verify the diff carefully - AI sometimes "improves" by changing behavior.'
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
				<strong>AI-generated code needs refactoring.</strong> It works, but it's often longer than necessary, duplicates existing logic, and misses optimization opportunities. These prompts help clean up vibe coded projects without breaking functionality.
			</p>
		</div>

		<span class="badge badge-info">Cleanup</span>

		<h1>Refactoring Prompts: Less Code, Same Function</h1>

		<p class="intro">
			Vibe coding is fast. The code it produces is... verbose. AI doesn't know what's already in your codebase, so it generates everything from scratch. After a session, you've got working code buried in duplication and missed opportunities. These prompts extract the signal from the noise.
		</p>

		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">6</div>
				<div class="stat-label">Prompts</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Less</div>
				<div class="stat-label">Code</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Same</div>
				<div class="stat-label">Function</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Better</div>
				<div class="stat-label">Quality</div>
			</div>
		</div>

		<!-- General Refactor Section -->
		<section class="article-section">
			<h2 id="general">General Refactoring Prompt</h2>

			<p>Start here. This prompt covers the most common refactoring needs.</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Refactoring Prompt</span>
					<button class="copy-btn" class:copied={copiedId === 'general-refactor'} onclick={() => copyCode('general-refactor')}>
						{copiedId === 'general-refactor' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="general-refactor">{`Refactor this code. Goals:

1. Reduce complexity
   - Break functions over 30 lines into smaller pieces
   - Reduce nesting depth to max 3 levels
   - Simplify conditionals

2. Remove duplication
   - Extract repeated logic into shared functions
   - Consolidate similar code paths
   - Create reusable utilities

3. Improve readability
   - Better variable/function names
   - Add types where missing
   - Remove dead code

Constraints:
- Functionality must remain IDENTICAL
- Don't add new features
- Don't change public APIs/interfaces
- Keep performance the same or better

Show: original line count vs refactored count.
Explain each major change briefly.

Code:
[paste code here]`}</code></pre>
			</div>
		</section>

		<!-- Extract Functions Section -->
		<section class="article-section">
			<h2 id="extract">Extract Functions Prompt</h2>

			<p>AI generates monolithic functions. This prompt breaks them into focused, testable pieces.</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Extract Functions</span>
					<button class="copy-btn" class:copied={copiedId === 'extract-functions'} onclick={() => copyCode('extract-functions')}>
						{copiedId === 'extract-functions' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="extract-functions">{`This function is too long. Break it into smaller functions.

Rules:
1. Each extracted function does ONE thing
2. Function names describe what they do
3. Keep related logic together
4. Minimize parameters (max 3-4 per function)
5. Return early to reduce nesting

After extraction, the main function should be:
- Under 20 lines
- Read like a summary of steps
- Easy to test in isolation

Show the refactored main function first, then helper functions.

Code:
[paste long function]`}</code></pre>
			</div>
		</section>

		<!-- Remove Duplication Section -->
		<section class="article-section">
			<h2 id="duplication">Remove Duplication Prompt</h2>

			<p>The most common problem in vibe coded projects. AI regenerates similar logic instead of reusing existing code.</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Remove Duplication</span>
					<button class="copy-btn" class:copied={copiedId === 'remove-duplication'} onclick={() => copyCode('remove-duplication')}>
						{copiedId === 'remove-duplication' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="remove-duplication">{`These files/functions have duplicated logic. Consolidate them.

Steps:
1. Identify the common patterns
2. Create a shared utility/function
3. Replace duplicates with calls to shared code
4. Handle variations with parameters (not copy-paste)

Output:
1. The new shared utility (with TypeScript types)
2. Refactored versions of each original
3. List of what was consolidated

The total line count should decrease significantly.

Files to consolidate:
[paste multiple files/functions]`}</code></pre>
			</div>
		</section>

		<!-- Focused Refactoring Prompts -->
		<section class="article-section">
			<h2>Focused Refactoring Prompts</h2>

			<p>When you know the specific problem, use these targeted prompts.</p>

			<div class="focused-grid">
				<div class="card prompt-card">
					<h3>Reduce Complexity</h3>
					<div class="code-block">
						<div class="code-block-header">
							<span class="code-block-lang">Prompt</span>
							<button class="copy-btn" class:copied={copiedId === 'reduce-complexity'} onclick={() => copyCode('reduce-complexity')}>
								{copiedId === 'reduce-complexity' ? 'Copied!' : 'Copy'}
							</button>
						</div>
						<pre><code id="reduce-complexity">{`Simplify this code:

1. Flatten nested conditionals (use early returns)
2. Replace complex conditionals with named functions
3. Simplify boolean expressions
4. Remove unnecessary else blocks

Max nesting: 2 levels.
Keep behavior identical.

[paste code]`}</code></pre>
					</div>
				</div>

				<div class="card prompt-card">
					<h3>Improve Performance</h3>
					<div class="code-block">
						<div class="code-block-header">
							<span class="code-block-lang">Prompt</span>
							<button class="copy-btn" class:copied={copiedId === 'improve-perf'} onclick={() => copyCode('improve-perf')}>
								{copiedId === 'improve-perf' ? 'Copied!' : 'Copy'}
							</button>
						</div>
						<pre><code id="improve-perf">{`Optimize this code for performance:

Check for:
1. N+1 queries (database)
2. Unnecessary re-renders (React)
3. Missing memoization
4. Inefficient algorithms
5. Redundant computations

For each issue: what it is, why it's slow, and the fix.

[paste code]`}</code></pre>
					</div>
				</div>

				<div class="card prompt-card">
					<h3>Add Types</h3>
					<div class="code-block">
						<div class="code-block-header">
							<span class="code-block-lang">Prompt</span>
							<button class="copy-btn" class:copied={copiedId === 'add-types'} onclick={() => copyCode('add-types')}>
								{copiedId === 'add-types' ? 'Copied!' : 'Copy'}
							</button>
						</div>
						<pre><code id="add-types">{`Add TypeScript types to this code:

1. Explicit return types on functions
2. Interface for object parameters
3. No 'any' - use specific types
4. Union types where appropriate

Output:
1. Type definitions (interfaces/types)
2. Typed version of the code

[paste untyped code]`}</code></pre>
					</div>
				</div>

				<div class="card prompt-card">
					<h3>Security Refactor</h3>
					<div class="code-block">
						<div class="code-block-header">
							<span class="code-block-lang">Prompt</span>
							<button class="copy-btn" class:copied={copiedId === 'security-refactor'} onclick={() => copyCode('security-refactor')}>
								{copiedId === 'security-refactor' ? 'Copied!' : 'Copy'}
							</button>
						</div>
						<pre><code id="security-refactor">{`Refactor for security:

1. Add input validation (Zod)
2. Parameterize any SQL queries
3. Add auth checks before data access
4. Sanitize user content
5. Remove hardcoded secrets

Show before/after for each fix.

[paste code]`}</code></pre>
					</div>
				</div>
			</div>
		</section>

		<!-- Refactoring Workflow Section -->
		<section class="article-section">
			<h2>Refactoring Workflow</h2>

			<p>The order matters. Follow this sequence for vibe coded projects:</p>

			<div class="workflow-steps">
				<div class="step">
					<span class="step-num">1</span>
					<div>
						<strong>Make it work</strong>
						<p>Get functionality correct first. Don't refactor broken code.</p>
					</div>
				</div>
				<div class="step">
					<span class="step-num">2</span>
					<div>
						<strong>Add basic tests</strong>
						<p>Cover critical paths. You need these to verify refactoring doesn't break things.</p>
					</div>
				</div>
				<div class="step">
					<span class="step-num">3</span>
					<div>
						<strong>Remove duplication</strong>
						<p>Consolidate repeated logic first. This often reveals the real structure.</p>
					</div>
				</div>
				<div class="step">
					<span class="step-num">4</span>
					<div>
						<strong>Extract functions</strong>
						<p>Break down long functions. Aim for functions that fit on one screen.</p>
					</div>
				</div>
				<div class="step">
					<span class="step-num">5</span>
					<div>
						<strong>Add types</strong>
						<p>Now that structure is clean, add explicit TypeScript types.</p>
					</div>
				</div>
				<div class="step">
					<span class="step-num">6</span>
					<div>
						<strong>Security pass</strong>
						<p>Check for vulnerabilities introduced during fast vibe coding.</p>
					</div>
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
					<p class="related-card-description">Find issues before refactoring</p>
				</a>
				<a href="/kb/prompts/testing-prompts/" class="card card-interactive related-card">
					<div class="related-card-category">Testing</div>
					<div class="related-card-title">Testing Prompts</div>
					<p class="related-card-description">Add tests before refactoring</p>
				</a>
				<a href="/kb/prompts/debugging-prompts/" class="card card-interactive related-card">
					<div class="related-card-category">Debug</div>
					<div class="related-card-title">Debugging Prompts</div>
					<p class="related-card-description">Fix bugs during refactor</p>
				</a>
				<a href="/kb/prompts/security-prompts/" class="card card-interactive related-card">
					<div class="related-card-category">Security</div>
					<div class="related-card-title">Security Prompts</div>
					<p class="related-card-description">Security-focused refactoring</p>
				</a>
			</div>
		</section>

		<div class="cta-box">
			<h3>Refactoring Doesn't Catch Everything</h3>
			<p>Clean code can still be vulnerable. VibeShip Scanner finds security issues that refactoring prompts miss in vibe coded projects.</p>
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

	/* Workflow Steps */
	.workflow-steps { display: flex; flex-direction: column; gap: 0.75rem; margin: 1rem 0; }
	.step { display: flex; align-items: flex-start; gap: 1rem; padding: 0.75rem; background: var(--bg-secondary); }
	.step-num { width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; background: var(--green); color: var(--bg-primary); font-weight: 700; flex-shrink: 0; }
	.step strong { display: block; margin-bottom: 0.25rem; }
	.step p { margin: 0; font-size: 0.875rem; color: var(--text-secondary); }

	@media (max-width: 768px) {
		.stats-row { grid-template-columns: repeat(2, 1fr); }
		.focused-grid { grid-template-columns: 1fr; }
	}
	@media (max-width: 480px) { .stats-row { grid-template-columns: 1fr; } }
</style>
