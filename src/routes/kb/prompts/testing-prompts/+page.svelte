<script lang="ts">
	import { Header } from '$lib/components/layout';

	const meta = {
		title: 'Testing Prompts: AI-Generated Unit & Integration Tests',
		description: 'Prompts to generate tests for vibe coded projects. Unit tests, integration tests, edge cases, and security testing with Jest and Vitest.',
		url: '/kb/prompts/testing-prompts/'
	};

	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Prompts', href: '/kb/prompts' },
		{ label: 'Testing Prompts' }
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
			question: 'Should I use AI to write all my tests?',
			answer: 'Use AI for the first draft, then review and adjust. AI generates good coverage for happy paths and common edge cases. You add tests for business logic edge cases AI doesn\'t know about. AI writes 80% of the boilerplate; you write the 20% that matters.'
		},
		{
			question: 'Jest or Vitest for AI-generated tests?',
			answer: 'Both work well with AI prompts. Vitest is faster for Vite projects. Jest has more examples in AI training data so slightly better generation. Specify your framework in the prompt - AI adapts syntax (describe/it vs test) accordingly.'
		},
		{
			question: 'How do I test AI-generated code I don\'t fully understand?',
			answer: 'Start with behavior tests, not implementation tests. Test what the code does, not how it does it. "Given this input, expect this output." You don\'t need to understand internals to verify behavior. Add tests as you learn the code.'
		},
		{
			question: 'What\'s the minimum test coverage for vibe coded projects?',
			answer: 'Focus on critical paths first: auth, payments, data mutations. For vibe coders, 100% coverage is a waste of time. Cover code that would cause real damage if it broke. Auth bypass? Test it. Button color? Skip it. Use AI to generate tests for the 20% that matters most.'
		},
		{
			question: 'How do I test async code with AI prompts?',
			answer: 'Specify async in your prompt and ask for both success and failure cases. "Test this async function: success case, network error, timeout, and invalid response." AI handles await/async syntax well. Include mock setup instructions for external services.'
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
				<strong>AI generates tests fast</strong> - but not always the right tests. These prompts focus AI on what matters: edge cases, error handling, and the critical paths that break production. Copy the prompts, paste your code, get tests that actually catch bugs.
			</p>
		</div>

		<span class="badge badge-info">Testing</span>

		<h1>Testing Prompts: Tests That Catch Real Bugs</h1>

		<p class="intro">
			Vibe coded projects ship fast, often without tests. When tests exist, they cover happy paths and miss the edge cases that cause 3am incidents. These prompts generate tests that actually matter - the ones that would have caught the bug before users did.
		</p>

		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">6</div>
				<div class="stat-label">Prompts</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Jest</div>
				<div class="stat-label">Vitest</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Edge</div>
				<div class="stat-label">Cases</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Copy</div>
				<div class="stat-label">Paste</div>
			</div>
		</div>

		<!-- Complete Test Generation Section -->
		<section class="article-section">
			<h2 id="complete">Complete Test Generation Prompt</h2>

			<p>Start here for comprehensive test coverage of any function or component.</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Complete Testing</span>
					<button class="copy-btn" class:copied={copiedId === 'complete-test'} onclick={() => copyCode('complete-test')}>
						{copiedId === 'complete-test' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="complete-test">{`Write tests for this code using [Jest/Vitest].

Generate tests for:

## 1. Happy Path
- Normal inputs produce expected outputs
- All main use cases covered

## 2. Edge Cases
- Empty inputs (null, undefined, [], {}, "")
- Boundary values (0, -1, MAX_INT)
- Large inputs (performance)
- Unicode and special characters

## 3. Error Cases
- Invalid inputs (wrong types)
- Network failures (if applicable)
- Missing required fields
- Permission/auth failures

## 4. Async Behavior (if applicable)
- Successful async operations
- Timeouts
- Race conditions
- Cleanup on unmount

For each test:
- Descriptive test name explaining what's tested
- Arrange/Act/Assert structure
- One assertion per test (when possible)

Include any necessary mocks/setup.

Code to test:
[paste code here]`}</code></pre>
			</div>
		</section>

		<!-- Unit Test Section -->
		<section class="article-section">
			<h2 id="unit">Unit Test Prompts</h2>

			<p>For pure functions and isolated logic - the foundation of a test suite.</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Unit Tests</span>
					<button class="copy-btn" class:copied={copiedId === 'unit-test'} onclick={() => copyCode('unit-test')}>
						{copiedId === 'unit-test' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="unit-test">{`Write unit tests for this function using [Jest/Vitest].

Focus on:
1. Input validation (what happens with bad inputs?)
2. Return value correctness
3. Edge cases specific to this function's logic
4. Error throwing (when should it throw?)

Structure:
- describe block with function name
- it/test blocks with clear descriptions
- beforeEach for common setup if needed

No external dependencies - mock everything.

Function:
[paste function]`}</code></pre>
			</div>
		</section>

		<!-- React Component Testing Section -->
		<section class="article-section">
			<h2 id="react">React Component Test Prompt</h2>

			<p>For testing React components with React Testing Library patterns.</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">React Component Tests</span>
					<button class="copy-btn" class:copied={copiedId === 'react-test'} onclick={() => copyCode('react-test')}>
						{copiedId === 'react-test' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="react-test">{`Write React component tests using Testing Library + [Jest/Vitest].

Test:
1. Renders without crashing
2. Renders correct initial state
3. User interactions work (clicks, typing)
4. Conditional rendering logic
5. Props affect output correctly
6. Error states display properly

Rules:
- Use getByRole, getByLabelText, getByText (not getByTestId)
- Test user behavior, not implementation
- userEvent for interactions (not fireEvent)
- await for async operations

Mock external dependencies (API calls, context).

Component:
[paste component]`}</code></pre>
			</div>
		</section>

		<!-- Focused Test Prompts Section -->
		<section class="article-section">
			<h2>Focused Test Prompts</h2>

			<p>When you need specific types of tests.</p>

			<div class="focused-grid">
				<div class="card prompt-card">
					<h3>API Endpoint Tests</h3>
					<div class="code-block">
						<div class="code-block-header">
							<span class="code-block-lang">Prompt</span>
							<button class="copy-btn" class:copied={copiedId === 'api-test'} onclick={() => copyCode('api-test')}>
								{copiedId === 'api-test' ? 'Copied!' : 'Copy'}
							</button>
						</div>
						<pre><code id="api-test">{`Write API endpoint tests:

1. Success responses (200, 201)
2. Validation errors (400)
3. Auth failures (401, 403)
4. Not found (404)
5. Server errors (500)

Mock database calls.
Test request body validation.
Verify response structure.

[paste endpoint]`}</code></pre>
					</div>
				</div>

				<div class="card prompt-card">
					<h3>Edge Case Discovery</h3>
					<div class="code-block">
						<div class="code-block-header">
							<span class="code-block-lang">Prompt</span>
							<button class="copy-btn" class:copied={copiedId === 'edge-test'} onclick={() => copyCode('edge-test')}>
								{copiedId === 'edge-test' ? 'Copied!' : 'Copy'}
							</button>
						</div>
						<pre><code id="edge-test">{`Identify edge cases for this code and write tests for each:

Think about:
- What inputs would break this?
- What assumptions does this make?
- What happens at boundaries?
- What if dependencies fail?

List each edge case, then write a test.

[paste code]`}</code></pre>
					</div>
				</div>

				<div class="card prompt-card">
					<h3>Security Tests</h3>
					<div class="code-block">
						<div class="code-block-header">
							<span class="code-block-lang">Prompt</span>
							<button class="copy-btn" class:copied={copiedId === 'security-test'} onclick={() => copyCode('security-test')}>
								{copiedId === 'security-test' ? 'Copied!' : 'Copy'}
							</button>
						</div>
						<pre><code id="security-test">{`Write security-focused tests:

1. SQL injection attempts rejected
2. XSS payloads sanitized
3. Auth required for protected routes
4. Users can't access other users' data
5. Rate limiting works

Each test should verify the attack fails.

[paste code]`}</code></pre>
					</div>
				</div>

				<div class="card prompt-card">
					<h3>Integration Tests</h3>
					<div class="code-block">
						<div class="code-block-header">
							<span class="code-block-lang">Prompt</span>
							<button class="copy-btn" class:copied={copiedId === 'integration-test'} onclick={() => copyCode('integration-test')}>
								{copiedId === 'integration-test' ? 'Copied!' : 'Copy'}
							</button>
						</div>
						<pre><code id="integration-test">{`Write integration tests for this flow:

Test the complete user journey:
1. Setup (create test data)
2. Action (user interaction)
3. Verification (expected outcome)
4. Cleanup (reset state)

Mock external services only.
Use real database (test DB).

[describe flow]`}</code></pre>
					</div>
				</div>
			</div>
		</section>

		<!-- Test Improvement Section -->
		<section class="article-section">
			<h2>Improve Existing Tests</h2>

			<p>When you have tests but they're not catching bugs.</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Improve Tests</span>
					<button class="copy-btn" class:copied={copiedId === 'improve-tests'} onclick={() => copyCode('improve-tests')}>
						{copiedId === 'improve-tests' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="improve-tests">{`Review these tests and identify gaps:

1. What edge cases are missing?
2. What error conditions aren't tested?
3. Are assertions specific enough?
4. Any flaky test patterns?
5. Missing cleanup/teardown?

Then write the missing tests.

Current tests:
[paste existing tests]

Code being tested:
[paste source code]`}</code></pre>
			</div>
		</section>

		<!-- Test Priority Section -->
		<section class="article-section">
			<h2>What to Test First</h2>

			<p>Not all code deserves tests. Vibe coding moves fast - focus on what would hurt most if it broke.</p>

			<div class="priority-grid">
				<div class="priority high">
					<h4>Test Immediately</h4>
					<ul>
						<li>Authentication logic</li>
						<li>Payment processing</li>
						<li>Data mutations (create, update, delete)</li>
						<li>Authorization checks</li>
						<li>Input validation</li>
					</ul>
				</div>
				<div class="priority medium">
					<h4>Test When Stable</h4>
					<ul>
						<li>Business logic functions</li>
						<li>API endpoints</li>
						<li>Form submissions</li>
						<li>Data transformations</li>
						<li>Error handling</li>
					</ul>
				</div>
				<div class="priority low">
					<h4>Test If Time Permits</h4>
					<ul>
						<li>UI rendering</li>
						<li>Styling logic</li>
						<li>Third-party integrations</li>
						<li>Utility functions</li>
						<li>Configuration</li>
					</ul>
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
					<p class="related-card-description">Review before testing</p>
				</a>
				<a href="/kb/prompts/debugging-prompts/" class="card card-interactive related-card">
					<div class="related-card-category">Debug</div>
					<div class="related-card-title">Debugging Prompts</div>
					<p class="related-card-description">Fix failing tests</p>
				</a>
				<a href="/kb/prompts/security-prompts/" class="card card-interactive related-card">
					<div class="related-card-category">Security</div>
					<div class="related-card-title">Security Prompts</div>
					<p class="related-card-description">Security test generation</p>
				</a>
				<a href="/kb/prompts/refactoring-prompts/" class="card card-interactive related-card">
					<div class="related-card-category">Refactor</div>
					<div class="related-card-title">Refactoring Prompts</div>
					<p class="related-card-description">Refactor with test safety</p>
				</a>
			</div>
		</section>

		<div class="cta-box">
			<h3>Tests Don't Catch Every Vulnerability</h3>
			<p>Even well-tested vibe coded projects have security gaps. VibeShip Scanner finds what unit tests miss.</p>
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

	/* Priority Grid */
	.priority-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin: 1rem 0; }
	.priority { padding: 1rem; background: var(--bg-secondary); }
	.priority h4 { margin: 0 0 0.75rem; font-size: 0.95rem; }
	.priority.high h4 { color: var(--red); }
	.priority.medium h4 { color: var(--orange); }
	.priority.low h4 { color: var(--text-secondary); }
	.priority ul { margin: 0; padding-left: 1.25rem; }
	.priority li { font-size: 0.85rem; margin: 0.3rem 0; color: var(--text-secondary); }

	@media (max-width: 900px) { .priority-grid { grid-template-columns: 1fr; } }
	@media (max-width: 768px) {
		.stats-row { grid-template-columns: repeat(2, 1fr); }
		.focused-grid { grid-template-columns: 1fr; }
	}
	@media (max-width: 480px) { .stats-row { grid-template-columns: 1fr; } }
</style>
