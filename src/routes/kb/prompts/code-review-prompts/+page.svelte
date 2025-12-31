<script lang="ts">
	import { Header } from '$lib/components/layout';

	const meta = {
		title: 'Code Review Prompts: AI-Assisted Pull Request Reviews',
		description: 'Prompts for AI-powered code review. Security checks, performance analysis, and PR review checklists for solo developers and teams.',
		url: '/kb/prompts/code-review-prompts/'
	};

	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Prompts', href: '/kb/prompts' },
		{ label: 'Code Review Prompts' }
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
			question: 'Can AI replace human code review?',
			answer: 'No, but it can augment it. AI catches syntax issues, common vulnerabilities, and style problems quickly. Humans catch architectural flaws, business logic errors, and maintainability issues. Use AI for the first pass, humans for the final decision.'
		},
		{
			question: 'Which AI tool is best for code review?',
			answer: 'Claude and GPT-4 both work well for reviewing code. Claude handles larger files (200K context). For GitHub integration, Copilot reviews code in PRs directly. For manual review, paste code into any chat interface with a review prompt.'
		},
		{
			question: 'How do I review my own code with AI?',
			answer: 'Solo developers can use AI as a "second pair of eyes." Paste your code with a review prompt asking for bugs, security issues, and improvements. Wait at least an hour between writing and reviewing - fresh context helps you catch issues the AI flags.'
		},
		{
			question: 'What should AI code review focus on?',
			answer: 'Prioritize: security vulnerabilities, logic errors, edge cases, and performance issues. Deprioritize: style preferences, minor naming suggestions, and formatting (let linters handle those). Focus AI review on things that could break production.'
		},
		{
			question: 'How do I integrate AI review into my workflow?',
			answer: 'Three options: (1) Pre-commit review with a prompt before pushing, (2) PR review using GitHub Copilot or manual paste, (3) Scheduled audits of critical code paths. Start with manual prompts, automate when you find consistent value.'
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
				<strong>AI code review prompts</strong> help catch bugs, security issues, and logic errors before they ship. The prompts below are structured checklists that focus AI attention on what matters: vulnerabilities, edge cases, and performance problems - not style nitpicks.
			</p>
		</div>

		<span class="badge badge-info">Workflow</span>

		<h1>Code Review Prompts: Get a Second Opinion from AI</h1>

		<p class="intro">
			Vibe coders often ship solo, which means no one reviews the code before it goes live. AI can fill that gap - not as a replacement for human judgment, but as a first-pass filter that catches the obvious stuff. These prompts are designed to find real problems, not generate busywork.
		</p>

		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">6</div>
				<div class="stat-label">Prompts</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Security</div>
				<div class="stat-label">First</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Solo</div>
				<div class="stat-label">Dev Ready</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Copy</div>
				<div class="stat-label">Paste Ready</div>
			</div>
		</div>

		<!-- Complete Review Prompt Section -->
		<section class="article-section">
			<h2 id="complete-review">Complete Code Review Prompt</h2>

			<p>Start with this comprehensive prompt. It covers security, logic, and quality in one pass.</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Complete Review</span>
					<button class="copy-btn" class:copied={copiedId === 'complete-review'} onclick={() => copyCode('complete-review')}>
						{copiedId === 'complete-review' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="complete-review">{`Review this code for issues. Check each category and report findings:

## 1. Security Vulnerabilities
- SQL injection, XSS, or command injection risks
- Missing input validation
- Authentication/authorization gaps
- Hardcoded secrets or sensitive data exposure
- Insecure data handling

## 2. Logic Errors
- Off-by-one errors
- Incorrect conditionals
- Missing null/undefined checks
- Race conditions in async code
- Incorrect error handling

## 3. Edge Cases
- Empty arrays/objects
- Large inputs (performance)
- Unicode/special characters
- Network failures
- Concurrent access

## 4. Code Quality
- Unused variables or dead code
- Overly complex functions (break down)
- Missing TypeScript types
- Inconsistent patterns

For each issue found:
1. Location (line number or function name)
2. Problem description
3. Severity (Critical/High/Medium/Low)
4. Suggested fix with code

If no issues in a category, say "None found" - don't invent problems.

Code to review:
[paste code here]`}</code></pre>
			</div>
		</section>

		<!-- Security-Focused Review Section -->
		<section class="article-section">
			<h2 id="security-review">Security-Focused Review</h2>

			<p>When security is the priority, use this deeper security-specific prompt. Good for auth code, API handlers, and anything touching user data.</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Security Review</span>
					<button class="copy-btn" class:copied={copiedId === 'security-review'} onclick={() => copyCode('security-review')}>
						{copiedId === 'security-review' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="security-review">{`You are a security auditor reviewing code for vulnerabilities. Be thorough and paranoid.

Check for these specific issues:

### Injection Attacks
- SQL: Is user input ever concatenated into queries?
- XSS: Is user content rendered without sanitization?
- Command: Does user input reach shell/exec functions?
- Path: Can user input manipulate file paths?

### Authentication
- Can routes be accessed without valid session?
- Are passwords hashed with bcrypt/argon2?
- Is session token generation cryptographically secure?
- Can session fixation attacks succeed?

### Authorization
- Can user A access user B's data?
- Are admin routes properly protected?
- Is authorization checked server-side (not just UI)?
- IDOR: Can IDs be guessed/enumerated?

### Data Exposure
- Are API responses exposing sensitive fields?
- Do error messages leak implementation details?
- Are secrets in environment variables (not code)?
- Is sensitive data logged?

### Rate Limiting & DoS
- Can expensive operations be triggered repeatedly?
- Are file uploads size-limited?
- Can attackers enumerate users/resources?

Report ONLY confirmed issues, not theoretical concerns. For each:
- Exact location
- Attack scenario
- Severity (Critical/High/Medium/Low)
- Fix with code example

Code:
[paste code here]`}</code></pre>
			</div>
		</section>

		<!-- Quick Review Prompts Section -->
		<section class="article-section">
			<h2>Quick Review Prompts</h2>

			<p>When you need fast, focused reviews on specific aspects.</p>

			<div class="quick-prompts">
				<div class="card prompt-card">
					<h3>Performance Review</h3>
					<div class="code-block">
						<div class="code-block-header">
							<span class="code-block-lang">Prompt</span>
							<button class="copy-btn" class:copied={copiedId === 'perf-review'} onclick={() => copyCode('perf-review')}>
								{copiedId === 'perf-review' ? 'Copied!' : 'Copy'}
							</button>
						</div>
						<pre><code id="perf-review">{`Review for performance issues:

1. N+1 query problems
2. Missing memoization/caching
3. Unnecessary re-renders (React)
4. Large bundle imports
5. Unoptimized loops or algorithms
6. Missing database indexes (if schema shown)

For each issue: location, impact estimate, and fix.

Code:
[paste code]`}</code></pre>
					</div>
				</div>

				<div class="card prompt-card">
					<h3>TypeScript Review</h3>
					<div class="code-block">
						<div class="code-block-header">
							<span class="code-block-lang">Prompt</span>
							<button class="copy-btn" class:copied={copiedId === 'ts-review'} onclick={() => copyCode('ts-review')}>
								{copiedId === 'ts-review' ? 'Copied!' : 'Copy'}
							</button>
						</div>
						<pre><code id="ts-review">{`Review TypeScript code for type safety:

1. Any 'any' types that should be specific
2. Missing return type annotations
3. Incorrect type assertions (as X)
4. Nullable values not checked
5. Generic types that could be narrower

Suggest improved types for each issue.

Code:
[paste code]`}</code></pre>
					</div>
				</div>

				<div class="card prompt-card">
					<h3>React Review</h3>
					<div class="code-block">
						<div class="code-block-header">
							<span class="code-block-lang">Prompt</span>
							<button class="copy-btn" class:copied={copiedId === 'react-review'} onclick={() => copyCode('react-review')}>
								{copiedId === 'react-review' ? 'Copied!' : 'Copy'}
							</button>
						</div>
						<pre><code id="react-review">{`Review React code for:

1. Missing useEffect dependencies
2. State that should be derived (useMemo)
3. Props drilling (should use context)
4. Missing key props in lists
5. Unnecessary re-renders
6. Memory leaks (missing cleanup)

Show the fix for each issue.

Code:
[paste code]`}</code></pre>
					</div>
				</div>

				<div class="card prompt-card">
					<h3>API Review</h3>
					<div class="code-block">
						<div class="code-block-header">
							<span class="code-block-lang">Prompt</span>
							<button class="copy-btn" class:copied={copiedId === 'api-review'} onclick={() => copyCode('api-review')}>
								{copiedId === 'api-review' ? 'Copied!' : 'Copy'}
							</button>
						</div>
						<pre><code id="api-review">{`Review this API endpoint for:

1. Missing input validation
2. Authentication check before data access
3. Authorization (user can access this data?)
4. Proper error responses (no stack traces)
5. SQL injection via query params
6. Rate limiting needed?

Provide secure version for any issues.

Code:
[paste code]`}</code></pre>
					</div>
				</div>
			</div>
		</section>

		<!-- PR Review Checklist Section -->
		<section class="article-section">
			<h2 id="pr-checklist">Pull Request Review Checklist</h2>

			<p>Use this structured checklist for reviewing PRs, whether you're reviewing your own code or a teammate's.</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">PR Checklist</span>
					<button class="copy-btn" class:copied={copiedId === 'pr-checklist'} onclick={() => copyCode('pr-checklist')}>
						{copiedId === 'pr-checklist' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="pr-checklist">{`Review this PR against each checklist item. Mark as ✅ Pass, ⚠️ Warning, or ❌ Fail.

## Functionality
- [ ] Code does what the PR description says
- [ ] Edge cases are handled
- [ ] Error states handled gracefully

## Security
- [ ] No new vulnerabilities introduced
- [ ] Input validation present
- [ ] Auth/authz checked where needed
- [ ] No secrets in code

## Code Quality
- [ ] Clear naming and organization
- [ ] No unnecessary complexity
- [ ] Types are specific (no 'any')
- [ ] Tests added for new code

## Performance
- [ ] No obvious performance issues
- [ ] Database queries are efficient
- [ ] No memory leaks

## Breaking Changes
- [ ] API changes documented
- [ ] Database migrations included
- [ ] Backward compatibility maintained (or noted)

Provide specific feedback for any ⚠️ or ❌ items.

PR diff:
[paste diff or code]`}</code></pre>
			</div>
		</section>

		<!-- Solo Developer Section -->
		<section class="article-section">
			<h2>Self-Review for Solo Developers</h2>

			<p>Vibe coding often means shipping solo. These tips help get maximum value from AI self-review:</p>

			<div class="tips-grid">
				<div class="card tip-card">
					<h4>Wait before reviewing</h4>
					<p>Review code at least an hour after writing. Fresh eyes (even AI eyes) catch more when you're not in "just wrote this" mode.</p>
				</div>
				<div class="card tip-card">
					<h4>Review in chunks</h4>
					<p>Don't dump your entire codebase. Review file by file or feature by feature. Focused reviews catch more than broad sweeps.</p>
				</div>
				<div class="card tip-card">
					<h4>Focus on critical paths</h4>
					<p>Auth code, payment handling, data mutations. Spend review time where bugs cost the most.</p>
				</div>
				<div class="card tip-card">
					<h4>Question the AI</h4>
					<p>When AI flags an issue, ask "why is this a problem?" and "what's the attack scenario?" Understand issues, don't just fix them.</p>
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
				<a href="/kb/prompts/security-prompts/" class="card card-interactive related-card">
					<div class="related-card-category">Prompts</div>
					<div class="related-card-title">Security Prompts</div>
					<p class="related-card-description">Dedicated security review prompts</p>
				</a>
				<a href="/kb/prompts/debugging-prompts/" class="card card-interactive related-card">
					<div class="related-card-category">Prompts</div>
					<div class="related-card-title">Debugging Prompts</div>
					<p class="related-card-description">Fix bugs with AI assistance</p>
				</a>
				<a href="/kb/prompts/testing-prompts/" class="card card-interactive related-card">
					<div class="related-card-category">Prompts</div>
					<div class="related-card-title">Testing Prompts</div>
					<p class="related-card-description">Generate tests with AI</p>
				</a>
				<a href="/kb/prompts/refactoring-prompts/" class="card card-interactive related-card">
					<div class="related-card-category">Prompts</div>
					<div class="related-card-title">Refactoring Prompts</div>
					<p class="related-card-description">Clean up AI-generated code</p>
				</a>
			</div>
		</section>

		<div class="cta-box">
			<h3>AI Review Is Just the Start</h3>
			<p>Prompts catch obvious issues, but automated scanners catch more. VibeShip Scanner runs continuous security analysis on your vibe coded projects.</p>
			<a href="https://vibeship.co" class="btn btn-green">Scan Your Code Free</a>
		</div>
	</article>
</div>

<style>
	.intro { font-size: 1.125rem; color: var(--text-secondary); margin-bottom: 2rem; line-height: 1.7; }
	.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin: 1.5rem 0 2rem; }

	/* Quick Prompts Grid */
	.quick-prompts { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1rem 0; }
	.prompt-card h3 { margin: 0 0 0.75rem; font-size: 1rem; }

	/* Tips Grid */
	.tips-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1rem 0; }
	.tip-card h4 { margin: 0 0 0.5rem; font-size: 0.95rem; color: var(--green); }
	.tip-card p { margin: 0; font-size: 0.875rem; color: var(--text-secondary); }

	@media (max-width: 768px) {
		.stats-row { grid-template-columns: repeat(2, 1fr); }
		.quick-prompts, .tips-grid { grid-template-columns: 1fr; }
	}
	@media (max-width: 480px) { .stats-row { grid-template-columns: 1fr; } }
</style>
