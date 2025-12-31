<script lang="ts">
	import { Header } from '$lib/components/layout';

	const meta = {
		title: 'AI Prompt Cheat Sheet: Quick Reference for Developers',
		description: 'One-page prompt cheat sheet. Techniques, do\'s and don\'ts, and quick-copy prompts for vibe coders who ship fast.',
		url: '/kb/prompts/prompt-cheat-sheet/'
	};

	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Prompts', href: '/kb/prompts' },
		{ label: 'Cheat Sheet' }
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
			question: 'What\'s the most important prompting technique?',
			answer: 'Context. Tell the AI your tech stack, what you\'re building, and constraints before asking for code. "I\'m using Next.js 15 with TypeScript and Supabase. Create a user registration form with Zod validation" beats "create a registration form" every time.'
		},
		{
			question: 'How do I get more consistent AI output?',
			answer: 'Specify the output format. "Return only code, no explanation" or "Format as: 1. File path 2. Code 3. Brief explanation." When AI knows what format you expect, responses are more predictable.'
		},
		{
			question: 'Should I use chain-of-thought for everything?',
			answer: 'No. Chain-of-thought adds latency and tokens. Use it for complex logic, debugging, or architecture decisions. Skip it for straightforward code generation like "add a button" or "format this date."'
		},
		{
			question: 'How long should prompts be?',
			answer: 'Long enough to be specific, short enough to focus. For code tasks: 50-150 words is ideal. Complex prompts can go to 300 words. If you exceed 400 words, consider breaking into chained prompts or using system-level configuration.'
		},
		{
			question: 'What\'s the biggest prompting mistake?',
			answer: 'Being vague. "Make it better" or "fix this" produces inconsistent results. "Reduce this function to under 20 lines, extract repeated logic into a helper, and add error handling for the API call" produces consistent results.'
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
				<strong>Prompt cheat sheet:</strong> Context first, constraints second, examples third. Use chain-of-thought for complex logic, few-shot for consistent formatting. Always include your tech stack. Never be vague about what you want.
			</p>
		</div>

		<span class="badge badge-info">Quick Reference</span>

		<h1>AI Prompt Cheat Sheet for Vibe Coders</h1>

		<p class="intro">
			Bookmark this page. Everything you need to write effective prompts for AI coding tools - techniques, patterns, and copy-paste templates. No fluff, just the reference.
		</p>

		<!-- Core Techniques Section -->
		<section class="article-section">
			<h2>Core Techniques</h2>

			<table class="technique-table">
				<thead>
					<tr>
						<th>Technique</th>
						<th>What It Does</th>
						<th>When to Use</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><strong>Context Setting</strong></td>
						<td>Tell AI your stack, project type, constraints</td>
						<td>Every prompt (most important)</td>
					</tr>
					<tr>
						<td><strong>Chain-of-Thought</strong></td>
						<td>"Think step by step before answering"</td>
						<td>Complex logic, debugging, architecture</td>
					</tr>
					<tr>
						<td><strong>Few-Shot Examples</strong></td>
						<td>Show 2-3 examples of desired output</td>
						<td>Consistent formatting, specific patterns</td>
					</tr>
					<tr>
						<td><strong>Constraints</strong></td>
						<td>"Never use X", "Always include Y"</td>
						<td>Enforce rules AI would otherwise ignore</td>
					</tr>
					<tr>
						<td><strong>Output Specification</strong></td>
						<td>Define exact response format</td>
						<td>Predictable, parseable responses</td>
					</tr>
					<tr>
						<td><strong>Role Assignment</strong></td>
						<td>"Act as a senior TypeScript developer"</td>
						<td>Better quality, specialized knowledge</td>
					</tr>
				</tbody>
			</table>
		</section>

		<!-- Do's and Don'ts Section -->
		<section class="article-section">
			<h2>Do's and Don'ts</h2>

			<div class="dos-donts-grid">
				<div class="dos-column">
					<h3>Do</h3>
					<ul>
						<li>Include your tech stack in every prompt</li>
						<li>Be specific about what you want</li>
						<li>Ask for error handling explicitly</li>
						<li>Request TypeScript types when relevant</li>
						<li>Specify output format</li>
						<li>Include security requirements</li>
						<li>Give examples when format matters</li>
						<li>Use "never" and "always" for hard rules</li>
					</ul>
				</div>
				<div class="donts-column">
					<h3>Don't</h3>
					<ul>
						<li>Say "make it better" (too vague)</li>
						<li>Assume AI knows your project</li>
						<li>Skip error handling requirements</li>
						<li>Trust AI-generated security code blindly</li>
						<li>Use overly long prompts (400+ words)</li>
						<li>Combine unrelated tasks in one prompt</li>
						<li>Forget to mention breaking constraints</li>
						<li>Accept first output without review</li>
					</ul>
				</div>
			</div>
		</section>

		<!-- Prompt Templates Section -->
		<section class="article-section">
			<h2>Quick-Copy Templates</h2>

			<div class="templates-grid">
				<div class="card template-card">
					<h4>New Feature</h4>
					<div class="code-block compact">
						<button class="copy-btn mini" class:copied={copiedId === 'tpl-feature'} onclick={() => copyCode('tpl-feature')}>
							{copiedId === 'tpl-feature' ? '✓' : 'Copy'}
						</button>
						<pre><code id="tpl-feature">{`Stack: [Next.js/React/etc], TypeScript
Add: [feature description]
Requirements:
- [requirement 1]
- [requirement 2]
Include error handling and types.`}</code></pre>
					</div>
				</div>

				<div class="card template-card">
					<h4>Fix Bug</h4>
					<div class="code-block compact">
						<button class="copy-btn mini" class:copied={copiedId === 'tpl-bug'} onclick={() => copyCode('tpl-bug')}>
							{copiedId === 'tpl-bug' ? '✓' : 'Copy'}
						</button>
						<pre><code id="tpl-bug">{`Bug: [what's happening]
Expected: [what should happen]
Stack: [framework]

Find and fix this issue.
Show problematic code and fix.`}</code></pre>
					</div>
				</div>

				<div class="card template-card">
					<h4>Refactor</h4>
					<div class="code-block compact">
						<button class="copy-btn mini" class:copied={copiedId === 'tpl-refactor'} onclick={() => copyCode('tpl-refactor')}>
							{copiedId === 'tpl-refactor' ? '✓' : 'Copy'}
						</button>
						<pre><code id="tpl-refactor">{`Refactor this code:
- [goal 1: reduce complexity]
- [goal 2: improve readability]
Keep functionality identical.
Explain major changes.

[paste code]`}</code></pre>
					</div>
				</div>

				<div class="card template-card">
					<h4>Code Review</h4>
					<div class="code-block compact">
						<button class="copy-btn mini" class:copied={copiedId === 'tpl-review'} onclick={() => copyCode('tpl-review')}>
							{copiedId === 'tpl-review' ? '✓' : 'Copy'}
						</button>
						<pre><code id="tpl-review">{`Review for:
1. Security vulnerabilities
2. Logic errors
3. Performance issues

Be specific: line, problem, fix.

[paste code]`}</code></pre>
					</div>
				</div>

				<div class="card template-card">
					<h4>Write Tests</h4>
					<div class="code-block compact">
						<button class="copy-btn mini" class:copied={copiedId === 'tpl-tests'} onclick={() => copyCode('tpl-tests')}>
							{copiedId === 'tpl-tests' ? '✓' : 'Copy'}
						</button>
						<pre><code id="tpl-tests">{`Write tests for [function/component].
Framework: [Jest/Vitest/etc]
Cover:
- Happy path
- Edge cases: [list]
- Error cases

[paste code]`}</code></pre>
					</div>
				</div>

				<div class="card template-card">
					<h4>Security Check</h4>
					<div class="code-block compact">
						<button class="copy-btn mini" class:copied={copiedId === 'tpl-security'} onclick={() => copyCode('tpl-security')}>
							{copiedId === 'tpl-security' ? '✓' : 'Copy'}
						</button>
						<pre><code id="tpl-security">{`Check for vulnerabilities:
- SQL/XSS injection
- Missing auth checks
- Input validation gaps
- Hardcoded secrets

Report: location, severity, fix.

[paste code]`}</code></pre>
					</div>
				</div>
			</div>
		</section>

		<!-- Context Snippets Section -->
		<section class="article-section">
			<h2>Context Snippets</h2>

			<p>Copy the relevant context snippet to start any prompt:</p>

			<div class="context-grid">
				<div class="card context-card">
					<h4>Next.js + Supabase</h4>
					<button class="copy-btn mini" class:copied={copiedId === 'ctx-nextjs'} onclick={() => copyCode('ctx-nextjs')}>
						{copiedId === 'ctx-nextjs' ? '✓' : 'Copy'}
					</button>
					<code id="ctx-nextjs">Stack: Next.js 15 App Router, TypeScript strict, Supabase, Tailwind. Server Components default.</code>
				</div>

				<div class="card context-card">
					<h4>React + Vite</h4>
					<button class="copy-btn mini" class:copied={copiedId === 'ctx-react'} onclick={() => copyCode('ctx-react')}>
						{copiedId === 'ctx-react' ? '✓' : 'Copy'}
					</button>
					<code id="ctx-react">Stack: React 18, Vite, TypeScript, React Query for data, Tailwind. Functional components only.</code>
				</div>

				<div class="card context-card">
					<h4>Node.js API</h4>
					<button class="copy-btn mini" class:copied={copiedId === 'ctx-node'} onclick={() => copyCode('ctx-node')}>
						{copiedId === 'ctx-node' ? '✓' : 'Copy'}
					</button>
					<code id="ctx-node">Stack: Node.js, Express/Fastify, TypeScript, Prisma ORM, PostgreSQL. REST API patterns.</code>
				</div>

				<div class="card context-card">
					<h4>Security Context</h4>
					<button class="copy-btn mini" class:copied={copiedId === 'ctx-security'} onclick={() => copyCode('ctx-security')}>
						{copiedId === 'ctx-security' ? '✓' : 'Copy'}
					</button>
					<code id="ctx-security">Always: validate inputs with Zod, check auth before data, parameterized queries, no hardcoded secrets.</code>
				</div>
			</div>
		</section>

		<!-- Common Mistakes Section -->
		<section class="article-section">
			<h2>Common Mistakes → Fixes</h2>

			<table class="mistakes-table">
				<thead>
					<tr>
						<th>Instead of...</th>
						<th>Try...</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>"Fix this code"</td>
						<td>"Fix the null reference error on line 23. User might not have an address."</td>
					</tr>
					<tr>
						<td>"Make it better"</td>
						<td>"Reduce to &lt;20 lines, extract the validation logic, add TypeScript types."</td>
					</tr>
					<tr>
						<td>"Write a login form"</td>
						<td>"Next.js 15 login form: email/password, Zod validation, show errors inline, call /api/auth."</td>
					</tr>
					<tr>
						<td>"Add authentication"</td>
						<td>"Add Supabase auth: login, logout, session check, protected route wrapper."</td>
					</tr>
					<tr>
						<td>"Is this secure?"</td>
						<td>"Check for: SQL injection, XSS, missing auth, hardcoded secrets. Report each with fix."</td>
					</tr>
				</tbody>
			</table>
		</section>

		<!-- Quick Tips Section -->
		<section class="article-section">
			<h2>Quick Tips</h2>

			<div class="tips-grid">
				<div class="tip">
					<span class="tip-icon">1</span>
					<span><strong>Start with stack.</strong> Always. First line of every coding prompt.</span>
				</div>
				<div class="tip">
					<span class="tip-icon">2</span>
					<span><strong>Negative constraints work better.</strong> "Never use any" beats "use explicit types."</span>
				</div>
				<div class="tip">
					<span class="tip-icon">3</span>
					<span><strong>One task per prompt.</strong> Split complex work into chained prompts.</span>
				</div>
				<div class="tip">
					<span class="tip-icon">4</span>
					<span><strong>Review everything.</strong> AI outputs are drafts. You're the editor.</span>
				</div>
				<div class="tip">
					<span class="tip-icon">5</span>
					<span><strong>Save working prompts.</strong> Build a library. Reuse what works.</span>
				</div>
				<div class="tip">
					<span class="tip-icon">6</span>
					<span><strong>Ask for reasoning.</strong> "Explain your approach" catches bad assumptions.</span>
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
			<h2>Deep Dives</h2>
			<div class="related-grid">
				<a href="/kb/prompts/prompt-engineering-code/" class="card card-interactive related-card">
					<div class="related-card-category">Guide</div>
					<div class="related-card-title">Prompt Engineering</div>
					<p class="related-card-description">Complete techniques guide</p>
				</a>
				<a href="/kb/prompts/prompt-templates/" class="card card-interactive related-card">
					<div class="related-card-category">Templates</div>
					<div class="related-card-title">Prompt Templates</div>
					<p class="related-card-description">SCRIBE, RISEN, and more</p>
				</a>
				<a href="/kb/prompts/security-prompts/" class="card card-interactive related-card">
					<div class="related-card-category">Security</div>
					<div class="related-card-title">Security Prompts</div>
					<p class="related-card-description">Vulnerability detection prompts</p>
				</a>
				<a href="/kb/prompts/chatgpt-prompt-examples/" class="card card-interactive related-card">
					<div class="related-card-category">Examples</div>
					<div class="related-card-title">ChatGPT Prompts</div>
					<p class="related-card-description">40+ ready-to-use prompts</p>
				</a>
			</div>
		</section>

		<div class="cta-box">
			<h3>Prompts Don't Replace Security Scans</h3>
			<p>Even perfect prompts produce vulnerable code. VibeShip Scanner catches what vibe coding misses.</p>
			<a href="https://vibeship.co" class="btn btn-green">Scan Your Code Free</a>
		</div>
	</article>
</div>

<style>
	.intro { font-size: 1.125rem; color: var(--text-secondary); margin-bottom: 2rem; line-height: 1.7; }

	/* Tables */
	.technique-table, .mistakes-table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
	.technique-table th, .technique-table td, .mistakes-table th, .mistakes-table td { padding: 0.75rem; text-align: left; border-bottom: 1px solid var(--border); font-size: 0.9rem; }
	.technique-table th, .mistakes-table th { background: var(--bg-secondary); font-weight: 600; }

	/* Do's Don'ts */
	.dos-donts-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin: 1rem 0; }
	.dos-column, .donts-column { padding: 1rem; background: var(--bg-secondary); }
	.dos-column h3 { color: var(--green); margin: 0 0 0.75rem; }
	.donts-column h3 { color: var(--red); margin: 0 0 0.75rem; }
	.dos-column ul, .donts-column ul { margin: 0; padding-left: 1.25rem; }
	.dos-column li, .donts-column li { font-size: 0.875rem; margin: 0.5rem 0; color: var(--text-secondary); }

	/* Templates Grid */
	.templates-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; margin: 1rem 0; }
	.template-card { padding: 0.75rem; }
	.template-card h4 { margin: 0 0 0.5rem; font-size: 0.9rem; }
	.code-block.compact { padding: 0.5rem; position: relative; }
	.code-block.compact pre { margin: 0; font-size: 0.75rem; }
	.copy-btn.mini { position: absolute; top: 0.25rem; right: 0.25rem; padding: 0.2rem 0.4rem; font-size: 0.7rem; }

	/* Context Grid */
	.context-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; margin: 1rem 0; }
	.context-card { padding: 0.75rem; position: relative; }
	.context-card h4 { margin: 0 0 0.5rem; font-size: 0.9rem; }
	.context-card code { font-size: 0.8rem; color: var(--text-secondary); display: block; }
	.context-card .copy-btn.mini { position: absolute; top: 0.5rem; right: 0.5rem; }

	/* Tips Grid */
	.tips-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; margin: 1rem 0; }
	.tip { display: flex; align-items: flex-start; gap: 0.75rem; padding: 0.75rem; background: var(--bg-secondary); }
	.tip-icon { width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; background: var(--green); color: var(--bg-primary); font-weight: 700; font-size: 0.8rem; flex-shrink: 0; }
	.tip span:last-child { font-size: 0.875rem; color: var(--text-secondary); }

	@media (max-width: 900px) { .templates-grid { grid-template-columns: repeat(2, 1fr); } }
	@media (max-width: 768px) {
		.dos-donts-grid, .context-grid, .tips-grid { grid-template-columns: 1fr; }
		.templates-grid { grid-template-columns: 1fr; }
	}
</style>
