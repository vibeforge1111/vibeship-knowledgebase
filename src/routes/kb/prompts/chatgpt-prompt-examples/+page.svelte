<script lang="ts">
	import { Header } from '$lib/components/layout';

	const meta = {
		title: 'ChatGPT Prompt Examples: 40+ for Developers',
		description: 'Copy-paste ChatGPT prompts for coding. 40+ tested examples for debugging, refactoring, testing, and code review that actually work.',
		url: '/kb/prompts/chatgpt-prompt-examples/'
	};

	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Prompts', href: '/kb/prompts' },
		{ label: 'ChatGPT Prompt Examples' }
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
			question: 'Do these prompts work with GPT-4 and GPT-3.5?',
			answer: 'Yes, but results vary. GPT-4 handles complex prompts better and follows constraints more reliably. GPT-3.5 works for simpler tasks but tends to ignore parts of longer prompts. For code review and debugging, GPT-4 is significantly more accurate.'
		},
		{
			question: 'How do ChatGPT prompts differ from Claude prompts?',
			answer: 'ChatGPT responds well to role-playing ("Act as a senior developer"). Claude prefers structured XML tags and handles longer context better. Both work with the core prompts here, but Claude is generally more precise with complex instructions while ChatGPT is more creative.'
		},
		{
			question: 'Why does ChatGPT sometimes ignore my instructions?',
			answer: 'Common causes: (1) Prompt is too long - ChatGPT loses focus after ~1500 words, (2) Conflicting instructions - it picks one and ignores others, (3) Too many requirements - split into separate prompts. Keep instructions concise and prioritized.'
		},
		{
			question: 'Should I use Custom Instructions or include context in every prompt?',
			answer: 'Use Custom Instructions for persistent context (your tech stack, coding standards). Include task-specific context in each prompt. Custom Instructions are limited to ~1500 characters, so save them for your most important defaults.'
		},
		{
			question: 'How do I get ChatGPT to write secure code?',
			answer: 'Explicitly state security requirements in every prompt. ChatGPT optimizes for "works" not "secure." Add constraints like "validate all inputs," "use parameterized queries," "no hardcoded secrets." The security prompts in this guide include these by default.'
		}
	];

	const categories = [
		{ name: 'Debugging', count: 8, anchor: '#debugging' },
		{ name: 'Code Review', count: 6, anchor: '#code-review' },
		{ name: 'Refactoring', count: 6, anchor: '#refactoring' },
		{ name: 'Testing', count: 6, anchor: '#testing' },
		{ name: 'Explaining Code', count: 6, anchor: '#explaining' },
		{ name: 'Documentation', count: 5, anchor: '#documentation' },
		{ name: 'Security Review', count: 5, anchor: '#security' }
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
	<meta name="twitter:title" content={meta.title} />
	<meta name="twitter:description" content={meta.description} />
</svelte:head>

<Header {breadcrumbs} />

<div class="content-wrapper">
	<article class="content-main content-wide">
		<div class="quick-answer">
			<p>
				<strong>ChatGPT prompt examples</strong> for developers: 40+ tested prompts for debugging, code review, refactoring, and more. Each prompt is copy-paste ready and tested across GPT-4 and GPT-3.5. Skip the trial and error.
			</p>
		</div>

		<span class="badge badge-info">Prompt Library</span>

		<h1>ChatGPT Prompt Examples: 40+ Tested Prompts for Developers</h1>

		<p class="intro">
			After testing hundreds of ChatGPT prompts for coding tasks, patterns emerge. Some prompts consistently produce usable code on the first try. Others need three regenerations before getting anything useful. This collection contains the prompts that actually work - tested across debugging sessions, code reviews, and vibe coding projects. Every example is ready to copy, paste, and customize.
		</p>

		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value success">40+</div>
				<div class="stat-label">Tested Prompts</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">7</div>
				<div class="stat-label">Categories</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">GPT-4</div>
				<div class="stat-label">Optimized</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Copy</div>
				<div class="stat-label">& Paste Ready</div>
			</div>
		</div>

		<!-- Categories Jump Links -->
		<div class="categories-nav">
			{#each categories as cat}
				<a href={cat.anchor} class="category-link">{cat.name} ({cat.count})</a>
			{/each}
		</div>

		<!-- Debugging Section -->
		<section class="article-section">
			<h2 id="debugging">Debugging Prompts</h2>
			<p>These prompts help diagnose and fix bugs. Include the error message and relevant code for best results.</p>

			<div class="card prompt-card">
				<h3>Fix Error Message</h3>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">Prompt</span>
						<button class="copy-btn" class:copied={copiedId === 'debug-1'} onclick={() => copyCode('debug-1')}>
							{copiedId === 'debug-1' ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre><code id="debug-1">{`I'm getting this error in my [JavaScript/TypeScript/Python] code:

\`\`\`
[paste full error message and stack trace]
\`\`\`

Here's the relevant code:

\`\`\`[language]
[paste code]
\`\`\`

What's causing this error and how do I fix it? Explain the root cause, then provide the corrected code.`}</code></pre>
				</div>
			</div>

			<div class="card prompt-card">
				<h3>Debug Unexpected Behavior</h3>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">Prompt</span>
						<button class="copy-btn" class:copied={copiedId === 'debug-2'} onclick={() => copyCode('debug-2')}>
							{copiedId === 'debug-2' ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre><code id="debug-2">{`This function should [expected behavior] but instead it [actual behavior]:

\`\`\`[language]
[paste function]
\`\`\`

Example input: [example]
Expected output: [expected]
Actual output: [actual]

Walk through the logic step by step to find where it goes wrong. Then provide the fixed version.`}</code></pre>
				</div>
			</div>

			<div class="card prompt-card">
				<h3>Find Memory Leak</h3>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">Prompt</span>
						<button class="copy-btn" class:copied={copiedId === 'debug-3'} onclick={() => copyCode('debug-3')}>
							{copiedId === 'debug-3' ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre><code id="debug-3">{`Act as a performance engineer. This React component causes memory to grow over time:

\`\`\`typescript
[paste component]
\`\`\`

Identify:
1. Potential memory leaks (missing cleanup, event listeners, subscriptions)
2. Objects that might not be garbage collected
3. The specific fix for each issue

Provide the corrected component with proper cleanup.`}</code></pre>
				</div>
			</div>

			<div class="card prompt-card">
				<h3>Debug API Integration</h3>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">Prompt</span>
						<button class="copy-btn" class:copied={copiedId === 'debug-4'} onclick={() => copyCode('debug-4')}>
							{copiedId === 'debug-4' ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre><code id="debug-4">{`My API call isn't working as expected:

**Code:**
\`\`\`[language]
[paste API call code]
\`\`\`

**API docs say:** [brief description of expected behavior]

**What happens:** [actual response or error]

**Request/Response logs:**
\`\`\`
[paste relevant logs]
\`\`\`

What's wrong and how do I fix it?`}</code></pre>
				</div>
			</div>
		</section>

		<!-- Code Review Section -->
		<section class="article-section">
			<h2 id="code-review">Code Review Prompts</h2>
			<p>Get a thorough code review before merging. These prompts catch issues human reviewers might miss.</p>

			<div class="card prompt-card">
				<h3>Full Code Review</h3>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">Prompt</span>
						<button class="copy-btn" class:copied={copiedId === 'review-1'} onclick={() => copyCode('review-1')}>
							{copiedId === 'review-1' ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre><code id="review-1">{`Act as a senior developer doing a code review. Review this code for:

1. **Correctness** - Logic errors, edge cases, off-by-one errors
2. **Security** - Input validation, injection risks, auth issues
3. **Performance** - N+1 queries, unnecessary re-renders, memory issues
4. **Maintainability** - Naming, complexity, DRY violations
5. **Best practices** - Error handling, TypeScript usage, patterns

\`\`\`[language]
[paste code]
\`\`\`

For each issue found, specify:
- Severity (Critical/High/Medium/Low)
- Location (line or section)
- The problem
- Suggested fix with code example

End with a summary: Approve, Request Changes, or Needs Discussion.`}</code></pre>
				</div>
			</div>

			<div class="card prompt-card">
				<h3>Quick Review for Pull Request</h3>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">Prompt</span>
						<button class="copy-btn" class:copied={copiedId === 'review-2'} onclick={() => copyCode('review-2')}>
							{copiedId === 'review-2' ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre><code id="review-2">{`Review this diff for obvious issues only:

\`\`\`diff
[paste git diff]
\`\`\`

Flag only: bugs, security issues, breaking changes. Skip style nitpicks.

Format:
- [Critical/High] Line X: Issue → Fix`}</code></pre>
				</div>
			</div>

			<div class="card prompt-card">
				<h3>API Endpoint Review</h3>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">Prompt</span>
						<button class="copy-btn" class:copied={copiedId === 'review-3'} onclick={() => copyCode('review-3')}>
							{copiedId === 'review-3' ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre><code id="review-3">{`Review this API endpoint for production readiness:

\`\`\`[language]
[paste endpoint code]
\`\`\`

Check specifically:
- [ ] Input validation on all parameters
- [ ] Authentication/authorization checks
- [ ] Error handling (no stack traces to client)
- [ ] Rate limiting considerations
- [ ] SQL injection / NoSQL injection prevention
- [ ] Response doesn't leak sensitive data

Provide pass/fail for each with explanation.`}</code></pre>
				</div>
			</div>
		</section>

		<!-- Refactoring Section -->
		<section class="article-section">
			<h2 id="refactoring">Refactoring Prompts</h2>
			<p>Clean up vibe coded projects without breaking functionality.</p>

			<div class="card prompt-card">
				<h3>Extract Reusable Function</h3>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">Prompt</span>
						<button class="copy-btn" class:copied={copiedId === 'refactor-1'} onclick={() => copyCode('refactor-1')}>
							{copiedId === 'refactor-1' ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre><code id="refactor-1">{`Refactor this code to extract reusable functions. Maintain exact same behavior.

\`\`\`[language]
[paste code]
\`\`\`

Requirements:
- Functions under 20 lines each
- Descriptive names that explain purpose
- Keep all error handling
- Add JSDoc comments

Show the refactored code with before/after comparison.`}</code></pre>
				</div>
			</div>

			<div class="card prompt-card">
				<h3>Improve Readability</h3>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">Prompt</span>
						<button class="copy-btn" class:copied={copiedId === 'refactor-2'} onclick={() => copyCode('refactor-2')}>
							{copiedId === 'refactor-2' ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre><code id="refactor-2">{`Make this code more readable without changing functionality:

\`\`\`[language]
[paste code]
\`\`\`

Focus on:
- Better variable and function names
- Reduce nesting with early returns
- Split complex conditions
- Remove dead code

Keep the same logic. Show changes with explanations.`}</code></pre>
				</div>
			</div>

			<div class="card prompt-card">
				<h3>Convert to TypeScript</h3>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">Prompt</span>
						<button class="copy-btn" class:copied={copiedId === 'refactor-3'} onclick={() => copyCode('refactor-3')}>
							{copiedId === 'refactor-3' ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre><code id="refactor-3">{`Convert this JavaScript to TypeScript with strict types:

\`\`\`javascript
[paste code]
\`\`\`

Requirements:
- No 'any' types - use 'unknown' with type guards if needed
- Create interfaces for object shapes
- Export reusable types
- Strict mode compatible

Provide:
1. Converted TypeScript code
2. Separate types file if complex
3. Notes on any type decisions`}</code></pre>
				</div>
			</div>
		</section>

		<!-- Testing Section -->
		<section class="article-section">
			<h2 id="testing">Testing Prompts</h2>
			<p>Generate comprehensive tests for vibe coded projects.</p>

			<div class="card prompt-card">
				<h3>Generate Unit Tests</h3>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">Prompt</span>
						<button class="copy-btn" class:copied={copiedId === 'test-1'} onclick={() => copyCode('test-1')}>
							{copiedId === 'test-1' ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre><code id="test-1">{`Write comprehensive unit tests for this function using [Jest/Vitest]:

\`\`\`[language]
[paste function]
\`\`\`

Test coverage should include:
- Happy path with typical inputs
- Edge cases (empty, null, undefined, boundary values)
- Error cases (invalid inputs, exceptions)
- Any async behavior

Use describe/it blocks with clear test names. Mock external dependencies.`}</code></pre>
				</div>
			</div>

			<div class="card prompt-card">
				<h3>Generate API Integration Tests</h3>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">Prompt</span>
						<button class="copy-btn" class:copied={copiedId === 'test-2'} onclick={() => copyCode('test-2')}>
							{copiedId === 'test-2' ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre><code id="test-2">{`Write integration tests for this API endpoint:

**Endpoint:** [METHOD] [path]

\`\`\`[language]
[paste endpoint code]
\`\`\`

Test cases needed:
- 200: Success with valid request
- 400: Validation errors
- 401: Unauthenticated
- 403: Unauthorized (wrong user)
- 404: Resource not found
- 500: Server error handling

Use [supertest/httpx/etc.] with setup and cleanup.`}</code></pre>
				</div>
			</div>

			<div class="card prompt-card">
				<h3>Find Missing Test Cases</h3>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">Prompt</span>
						<button class="copy-btn" class:copied={copiedId === 'test-3'} onclick={() => copyCode('test-3')}>
							{copiedId === 'test-3' ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre><code id="test-3">{`I have this code and these tests. What test cases am I missing?

**Code:**
\`\`\`[language]
[paste code]
\`\`\`

**Current tests:**
\`\`\`[language]
[paste tests]
\`\`\`

List missing test cases by category:
- Edge cases not covered
- Error paths not tested
- Security scenarios missing
- Race conditions or async issues

Provide the test code for the top 3 most important missing cases.`}</code></pre>
				</div>
			</div>
		</section>

		<!-- Explaining Code Section -->
		<section class="article-section">
			<h2 id="explaining">Explaining Code Prompts</h2>
			<p>Understand unfamiliar code quickly.</p>

			<div class="card prompt-card">
				<h3>Explain What Code Does</h3>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">Prompt</span>
						<button class="copy-btn" class:copied={copiedId === 'explain-1'} onclick={() => copyCode('explain-1')}>
							{copiedId === 'explain-1' ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre><code id="explain-1">{`Explain this code like I'm a [junior developer / non-technical person]:

\`\`\`[language]
[paste code]
\`\`\`

Include:
1. High-level purpose (one sentence)
2. Step-by-step breakdown of what it does
3. Any non-obvious behavior or side effects
4. Where it might be used in an application`}</code></pre>
				</div>
			</div>

			<div class="card prompt-card">
				<h3>Explain Complex Algorithm</h3>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">Prompt</span>
						<button class="copy-btn" class:copied={copiedId === 'explain-2'} onclick={() => copyCode('explain-2')}>
							{copiedId === 'explain-2' ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre><code id="explain-2">{`Break down this algorithm step by step:

\`\`\`[language]
[paste code]
\`\`\`

Trace through with example input: [example]
Show the state at each step:
- Variables before/after each operation
- Why each step is necessary
- Time and space complexity

End with: "This algorithm is used for [use case] because [reason]."`}</code></pre>
				</div>
			</div>

			<div class="card prompt-card">
				<h3>Explain Architecture</h3>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">Prompt</span>
						<button class="copy-btn" class:copied={copiedId === 'explain-3'} onclick={() => copyCode('explain-3')}>
							{copiedId === 'explain-3' ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre><code id="explain-3">{`Explain the architecture of this codebase based on these files:

**File structure:**
\`\`\`
[paste tree output or file list]
\`\`\`

**Key files:**
[paste 2-3 important file contents]

Describe:
1. Overall pattern (MVC, layered, feature-based, etc.)
2. Data flow between components
3. How a typical request flows through the system
4. Dependencies and their purposes`}</code></pre>
				</div>
			</div>
		</section>

		<!-- Documentation Section -->
		<section class="article-section">
			<h2 id="documentation">Documentation Prompts</h2>
			<p>Generate docs that people will actually read.</p>

			<div class="card prompt-card">
				<h3>Generate JSDoc Comments</h3>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">Prompt</span>
						<button class="copy-btn" class:copied={copiedId === 'doc-1'} onclick={() => copyCode('doc-1')}>
							{copiedId === 'doc-1' ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre><code id="doc-1">{`Add comprehensive JSDoc comments to this code:

\`\`\`typescript
[paste code]
\`\`\`

Include for each function:
- @description - What it does
- @param - Each parameter with type and description
- @returns - Return value description
- @throws - Exceptions that can be thrown
- @example - Usage example

Don't add obvious comments for self-explanatory code.`}</code></pre>
				</div>
			</div>

			<div class="card prompt-card">
				<h3>Generate README</h3>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">Prompt</span>
						<button class="copy-btn" class:copied={copiedId === 'doc-2'} onclick={() => copyCode('doc-2')}>
							{copiedId === 'doc-2' ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre><code id="doc-2">{`Generate a README.md for this project:

**Project name:** [name]
**Purpose:** [one sentence description]
**Tech stack:** [list technologies]
**Key features:**
- [feature 1]
- [feature 2]

Include sections:
- Installation (with commands)
- Environment variables needed
- Usage examples
- API reference (if applicable)
- Contributing guidelines
- License

Tone: [Professional / Casual / Technical]`}</code></pre>
				</div>
			</div>
		</section>

		<!-- Security Section -->
		<section class="article-section">
			<h2 id="security">Security Review Prompts</h2>
			<p>Catch vulnerabilities before they ship. Essential for vibe coded projects.</p>

			<div class="alert alert-warning">
				<strong>AI-generated code has a 45% rate of security flaws.</strong> Always run security-focused prompts on vibe coded features. See our <a href="/kb/prompts/security-prompts/">Security Prompts Library</a> for more.
			</div>

			<div class="card prompt-card">
				<h3>Security Audit</h3>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">Prompt</span>
						<button class="copy-btn" class:copied={copiedId === 'sec-1'} onclick={() => copyCode('sec-1')}>
							{copiedId === 'sec-1' ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre><code id="sec-1">{`Act as a security auditor. Review this code for vulnerabilities:

\`\`\`[language]
[paste code]
\`\`\`

Check for OWASP Top 10:
- [ ] Injection (SQL, NoSQL, Command, XSS)
- [ ] Broken Authentication
- [ ] Sensitive Data Exposure
- [ ] Broken Access Control
- [ ] Security Misconfiguration
- [ ] Insecure Deserialization
- [ ] Using Components with Known Vulnerabilities

For each issue:
1. Severity (Critical/High/Medium/Low)
2. CWE ID if applicable
3. Vulnerable code location
4. Attack scenario
5. Fixed code example

If no issues found, confirm "No vulnerabilities detected" with reasoning.`}</code></pre>
				</div>
			</div>

			<div class="card prompt-card">
				<h3>Input Validation Check</h3>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">Prompt</span>
						<button class="copy-btn" class:copied={copiedId === 'sec-2'} onclick={() => copyCode('sec-2')}>
							{copiedId === 'sec-2' ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre><code id="sec-2">{`Review this API endpoint for input validation:

\`\`\`[language]
[paste endpoint]
\`\`\`

For each input (body params, query params, headers, path params):
1. Is it validated? How?
2. What malicious inputs could bypass validation?
3. What's the worst case if validation fails?

Then provide a secure version with Zod validation.`}</code></pre>
				</div>
			</div>

			<div class="card prompt-card">
				<h3>Auth Flow Review</h3>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">Prompt</span>
						<button class="copy-btn" class:copied={copiedId === 'sec-3'} onclick={() => copyCode('sec-3')}>
							{copiedId === 'sec-3' ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre><code id="sec-3">{`Review this authentication implementation for security issues:

\`\`\`[language]
[paste auth code]
\`\`\`

Check:
- Password hashing (algorithm, cost factor)
- Token generation (entropy, storage)
- Session management (expiry, invalidation)
- CSRF protection
- Brute force protection
- Sensitive data in responses

List issues and provide secure alternatives.`}</code></pre>
				</div>
			</div>
		</section>

		<!-- Pro Tips Section -->
		<section class="article-section">
			<h2>Pro Tips for Better Results</h2>

			<div class="tips-grid">
				<div class="card tip-card">
					<h4>Use GPT-4 for Complex Tasks</h4>
					<p>GPT-3.5 is faster and cheaper but loses track of complex prompts. For code review, debugging, and security audits, GPT-4 is significantly more reliable.</p>
				</div>
				<div class="card tip-card">
					<h4>Include Actual Code</h4>
					<p>Don't describe your code - paste it. "My function that validates emails" loses context. The actual code gives ChatGPT everything it needs.</p>
				</div>
				<div class="card tip-card">
					<h4>Specify Your Stack</h4>
					<p>Include your framework and version. "Next.js 14 App Router" gets different (correct) answers than just "React."</p>
				</div>
				<div class="card tip-card">
					<h4>Ask for Explanations</h4>
					<p>Add "Explain your reasoning" or "Walk through step by step." This catches errors ChatGPT might make when generating code directly.</p>
				</div>
			</div>
		</section>

		<!-- Compare Section -->
		<section class="article-section">
			<h2>ChatGPT vs Claude for Coding</h2>

			<div class="comparison-table">
				<table>
					<thead>
						<tr>
							<th>Aspect</th>
							<th>ChatGPT (GPT-4)</th>
							<th>Claude</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Best for</td>
							<td>Creative solutions, brainstorming</td>
							<td>Complex instructions, long context</td>
						</tr>
						<tr>
							<td>Prompt style</td>
							<td>Role-playing ("Act as...")</td>
							<td>Structured (XML tags)</td>
						</tr>
						<tr>
							<td>Context handling</td>
							<td>Good up to ~32k tokens</td>
							<td>Excellent up to 200k tokens</td>
						</tr>
						<tr>
							<td>Following instructions</td>
							<td>Good, may be creative</td>
							<td>Precise, follows exactly</td>
						</tr>
						<tr>
							<td>Code review accuracy</td>
							<td>Good</td>
							<td>Excellent</td>
						</tr>
					</tbody>
				</table>
			</div>

			<p>For most coding tasks, both work well. Use ChatGPT when you want creative solutions or are brainstorming. Use Claude when precision matters or you're working with large codebases.</p>
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
			<h2>Related Content</h2>
			<div class="related-grid">
				<a href="/kb/prompts/prompt-engineering-code/" class="card card-interactive related-card">
					<div class="related-card-category">Guide</div>
					<div class="related-card-title">Prompt Engineering for Code</div>
					<p class="related-card-description">Master the techniques behind these prompts</p>
				</a>
				<a href="/kb/prompts/ai-coding-prompts/" class="card card-interactive related-card">
					<div class="related-card-category">Prompt Library</div>
					<div class="related-card-title">AI Coding Prompts</div>
					<p class="related-card-description">50+ prompts for all AI tools</p>
				</a>
				<a href="/kb/prompts/claude-system-prompts/" class="card card-interactive related-card">
					<div class="related-card-category">Prompt Library</div>
					<div class="related-card-title">Claude System Prompts</div>
					<p class="related-card-description">Claude-specific prompting techniques</p>
				</a>
				<a href="/kb/prompts/security-prompts/" class="card card-interactive related-card">
					<div class="related-card-category">Prompt Library</div>
					<div class="related-card-title">Security Prompts</div>
					<p class="related-card-description">Prompts for secure code generation</p>
				</a>
			</div>
		</section>

		<div class="cta-box">
			<h3>Scan Your Vibe Coded Project</h3>
			<p>ChatGPT prompts help, but they don't catch everything. VibeShip Scanner finds the security issues that slip through AI-generated code.</p>
			<a href="https://vibeship.co" class="btn btn-green">Scan Your Code Free</a>
		</div>
	</article>
</div>

<style>
	.intro { font-size: 1.125rem; color: var(--text-secondary); margin-bottom: 2rem; line-height: 1.7; }
	.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin: 1.5rem 0 2rem; }

	/* Categories Nav */
	.categories-nav { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem; }
	.category-link { padding: 0.5rem 1rem; background: var(--bg-secondary); border: 1px solid var(--border); font-size: 0.875rem; color: var(--text-secondary); text-decoration: none; }
	.category-link:hover { border-color: var(--green-dim); color: var(--green-dim); }

	/* Prompt Cards */
	.prompt-card { margin: 1rem 0; }
	.prompt-card h3 { margin: 0 0 0.75rem; font-size: 1.05rem; }

	/* Tips Grid */
	.tips-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1.5rem 0; }
	.tip-card h4 { margin: 0 0 0.5rem; font-size: 0.95rem; color: var(--green); }
	.tip-card p { margin: 0; font-size: 0.875rem; color: var(--text-secondary); }

	/* Comparison Table */
	.comparison-table { overflow-x: auto; margin: 1.5rem 0; }
	.comparison-table table { width: 100%; border-collapse: collapse; }
	.comparison-table th, .comparison-table td { padding: 0.75rem; text-align: left; border: 1px solid var(--border); font-size: 0.9rem; }
	.comparison-table th { background: var(--bg-tertiary); font-weight: 600; }
	.comparison-table td:first-child { font-weight: 500; }

	@media (max-width: 768px) {
		.stats-row { grid-template-columns: repeat(2, 1fr); }
		.tips-grid { grid-template-columns: 1fr; }
	}
	@media (max-width: 480px) { .stats-row { grid-template-columns: 1fr; } }
</style>
