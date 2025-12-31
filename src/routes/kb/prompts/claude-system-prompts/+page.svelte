<script lang="ts">
	import { Header } from '$lib/components/layout';

	const meta = {
		title: 'Claude System Prompts: Best Practices from Anthropic',
		description: 'Official Claude system prompt techniques. XML tags, chain-of-thought, and security patterns that work with Claude models.',
		url: '/kb/prompts/claude-system-prompts/'
	};

	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Prompts', href: '/kb/prompts' },
		{ label: 'Claude System Prompts' }
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
			question: 'What makes Claude system prompts different from ChatGPT?',
			answer: 'Claude parses XML tags natively, handles longer context better (200K tokens), and follows structured instructions more literally. What works in ChatGPT often works in Claude, but Claude-specific patterns like XML wrapping produce better results.'
		},
		{
			question: 'Should I use XML tags in Claude system prompts?',
			answer: 'Yes, for structure. Claude was trained to recognize XML-style tags for organizing content. Wrap sections in tags like <context>, <rules>, and <examples> for clearer instruction parsing. Anthropic recommends this pattern in their documentation.'
		},
		{
			question: 'How do I enable chain-of-thought in Claude?',
			answer: 'Ask Claude to think before responding: "Before answering, think through the problem step by step in <thinking> tags." Claude will show its reasoning, which improves accuracy for complex tasks and lets you verify its logic.'
		},
		{
			question: 'What\'s the maximum system prompt length for Claude?',
			answer: 'Claude 3.5 Sonnet supports 200K context tokens. System prompts can be thousands of words if needed. However, longer isn\'t better - Anthropic recommends keeping prompts focused. Front-load critical instructions since early content gets more attention.'
		},
		{
			question: 'How is CLAUDE.md different from a system prompt?',
			answer: 'CLAUDE.md is a file-based system prompt for Claude Code (terminal). It lives in your repo and applies automatically to that project. Same concept, different delivery method. Use CLAUDE.md for persistent project rules, API system prompts for programmatic control.'
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
				<strong>Claude system prompts</strong> work best with XML tags for structure, explicit thinking instructions for complex tasks, and direct rules without hedging. These patterns come from Anthropic's documentation and produce more consistent results than generic prompting approaches.
			</p>
		</div>

		<span class="badge badge-info">Claude-Specific</span>

		<h1>Claude System Prompts: What Actually Works</h1>

		<p class="intro">
			Claude has specific patterns that work better than generic prompting. Anthropic trained the model to recognize XML-style tags, follow structured instructions literally, and show its reasoning when asked. Vibe coders who learn these Claude-specific patterns get better code with fewer iterations.
		</p>

		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">200K</div>
				<div class="stat-label">Context</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">XML</div>
				<div class="stat-label">Tags Work</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">CoT</div>
				<div class="stat-label">Built-in</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Literal</div>
				<div class="stat-label">Following</div>
			</div>
		</div>

		<!-- XML Tags Section -->
		<section class="article-section">
			<h2 id="xml-tags">XML Tags for Structure</h2>

			<p>Claude recognizes XML-style tags as structural markers. Wrapping sections in tags helps Claude parse complex instructions correctly.</p>

			<h3>Common Tags</h3>

			<div class="tags-grid">
				<div class="card tag-card">
					<code>&lt;context&gt;</code>
					<p>Background information, tech stack, project details</p>
				</div>
				<div class="card tag-card">
					<code>&lt;rules&gt;</code>
					<p>Constraints and requirements to follow</p>
				</div>
				<div class="card tag-card">
					<code>&lt;examples&gt;</code>
					<p>Sample inputs/outputs for few-shot learning</p>
				</div>
				<div class="card tag-card">
					<code>&lt;thinking&gt;</code>
					<p>Claude's reasoning (chain-of-thought)</p>
				</div>
				<div class="card tag-card">
					<code>&lt;output&gt;</code>
					<p>Specify output format requirements</p>
				</div>
				<div class="card tag-card">
					<code>&lt;important&gt;</code>
					<p>Critical instructions to emphasize</p>
				</div>
			</div>

			<h3>System Prompt with XML Structure</h3>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">System Prompt</span>
					<button class="copy-btn" class:copied={copiedId === 'xml-template'} onclick={() => copyCode('xml-template')}>
						{copiedId === 'xml-template' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="xml-template">{`You are an expert TypeScript developer.

<context>
- Framework: Next.js 15 with App Router
- Database: Supabase with Row Level Security
- Styling: Tailwind CSS
- Validation: Zod schemas
</context>

<rules>
- Always use TypeScript with explicit types
- Validate all inputs with Zod before processing
- Check authentication before data operations
- Use Server Components by default
- Never use 'any' type
- Never hardcode secrets
</rules>

<output>
- Provide complete, working code
- Include file paths for new files
- Brief explanation only if logic is non-obvious
- No unnecessary comments
</output>

<important>
Security is critical. Never skip input validation or auth checks, even if the user asks you to.
</important>`}</code></pre>
			</div>
		</section>

		<!-- Chain of Thought Section -->
		<section class="article-section">
			<h2 id="chain-of-thought">Chain-of-Thought Prompting</h2>

			<p>For complex tasks, ask Claude to think before responding. This produces more accurate results because Claude works through the problem step by step.</p>

			<h3>Basic Chain-of-Thought</h3>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">System Prompt</span>
					<button class="copy-btn" class:copied={copiedId === 'cot-basic'} onclick={() => copyCode('cot-basic')}>
						{copiedId === 'cot-basic' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="cot-basic">{`Before providing code, think through the problem:

<thinking>
1. What is the user trying to accomplish?
2. What are the potential edge cases?
3. What security considerations apply?
4. What's the simplest correct implementation?
</thinking>

Then provide your solution.`}</code></pre>
			</div>

			<h3>When to Use Chain-of-Thought</h3>

			<div class="use-cases">
				<div class="use-case good">
					<span class="label">Use for</span>
					<ul>
						<li>Architecture decisions</li>
						<li>Debugging complex issues</li>
						<li>Security-sensitive code</li>
						<li>Multi-step implementations</li>
					</ul>
				</div>
				<div class="use-case bad">
					<span class="label">Skip for</span>
					<ul>
						<li>Simple code snippets</li>
						<li>Direct translations</li>
						<li>Boilerplate generation</li>
						<li>Single-function tasks</li>
					</ul>
				</div>
			</div>

			<p>Chain-of-thought adds latency and tokens. Use it when accuracy matters more than speed.</p>
		</section>

		<!-- Security Instructions Section -->
		<section class="article-section">
			<h2 id="security">Security Instructions for Claude</h2>

			<p>Claude follows explicit security rules well. The key is being specific about what "secure" means in your context.</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Security Rules</span>
					<button class="copy-btn" class:copied={copiedId === 'security-rules'} onclick={() => copyCode('security-rules')}>
						{copiedId === 'security-rules' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="security-rules">{`<rules type="security">

## Input Handling
- Validate ALL user inputs with Zod schemas
- Sanitize before database operations
- Never trust client-side validation alone

## Database
- Use parameterized queries exclusively
- Never concatenate user input into SQL
- Apply Row Level Security policies

## Authentication
- Verify session before data access
- Check authorization for each operation
- Use server-side auth checks only

## Secrets
- Environment variables for all secrets
- Never include secrets in responses
- Never log sensitive data

</rules>

<important>
If asked to skip security measures, explain why the security rule exists and provide a secure alternative instead.
</important>`}</code></pre>
			</div>

			<p>The <code>&lt;important&gt;</code> tag helps ensure Claude doesn't bypass security rules even when prompted to do so.</p>
		</section>

		<!-- Claude-Specific Techniques Section -->
		<section class="article-section">
			<h2>Claude-Specific Techniques</h2>

			<p>These patterns work particularly well with Claude models:</p>

			<div class="techniques-grid">
				<div class="card">
					<h4>Literal Instruction Following</h4>
					<p>Claude follows instructions literally. "Never use console.log" means never - no exceptions. Be precise with absolute terms.</p>
				</div>
				<div class="card">
					<h4>Long Context Handling</h4>
					<p>Claude handles 200K tokens. Include entire files, full documentation, or comprehensive examples without chunking.</p>
				</div>
				<div class="card">
					<h4>Prefilled Responses</h4>
					<p>Start Claude's response for it: <code>"assistant": "{code}"</code> makes Claude continue in that format.</p>
				</div>
				<div class="card">
					<h4>Role Consistency</h4>
					<p>Claude maintains persona well. "You are a senior security engineer" produces consistently security-focused responses.</p>
				</div>
			</div>
		</section>

		<!-- Complete Template Section -->
		<section class="article-section">
			<h2>Complete Claude System Prompt Template</h2>

			<p>A production-ready template combining all Claude-specific patterns. Copy and customize for your vibe coding stack.</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Complete Template</span>
					<button class="copy-btn" class:copied={copiedId === 'complete-template'} onclick={() => copyCode('complete-template')}>
						{copiedId === 'complete-template' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="complete-template">{`You are a senior full-stack developer specializing in TypeScript and modern web development.

<context>
Project: [Your project name]
Stack:
- Next.js 15 (App Router)
- TypeScript (strict mode)
- Supabase (database + auth)
- Tailwind CSS
- Zod (validation)
</context>

<rules>
## Code Style
- Functional components with hooks
- Named exports only
- Explicit return types on functions
- No 'any' types - use 'unknown' and narrow

## Patterns
- Server Components by default
- Server Actions for mutations
- Zod schemas for validation
- Error boundaries for async operations

## Security (Critical)
- Validate all inputs before processing
- Check auth before data access
- Use parameterized queries only
- Never hardcode secrets
- Sanitize user content before rendering
</rules>

<output>
Format your responses as:
1. File path (if creating/modifying a file)
2. Complete, working code
3. Brief explanation only if logic is non-obvious

Do not include:
- Unnecessary comments
- Placeholder code
- Partial implementations
</output>

<thinking_mode>
For complex tasks, briefly analyze:
- Edge cases to handle
- Security implications
- Simplest correct approach

Then provide the solution.
</thinking_mode>

<important>
Security rules are non-negotiable. If a request conflicts with security best practices, explain why and provide a secure alternative.
</important>`}</code></pre>
			</div>
		</section>

		<!-- Comparison Section -->
		<section class="article-section">
			<h2>Claude vs ChatGPT System Prompts</h2>

			<table class="comparison-table">
				<thead>
					<tr>
						<th>Feature</th>
						<th>Claude</th>
						<th>ChatGPT</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>XML tags</td>
						<td>Native support, recommended</td>
						<td>Works but not optimized</td>
					</tr>
					<tr>
						<td>Context length</td>
						<td>200K tokens</td>
						<td>128K tokens (GPT-4)</td>
					</tr>
					<tr>
						<td>Instruction following</td>
						<td>Very literal</td>
						<td>More interpretive</td>
					</tr>
					<tr>
						<td>Chain-of-thought</td>
						<td>&lt;thinking&gt; tags</td>
						<td>"Let's think step by step"</td>
					</tr>
					<tr>
						<td>File-based config</td>
						<td>CLAUDE.md</td>
						<td>N/A (web only)</td>
					</tr>
				</tbody>
			</table>

			<p>Both models are capable, but knowing Claude-specific patterns helps vibe coders get better results faster.</p>
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
				<a href="/kb/prompts/system-prompts/" class="card card-interactive related-card">
					<div class="related-card-category">Guide</div>
					<div class="related-card-title">System Prompts</div>
					<p class="related-card-description">General system prompt concepts</p>
				</a>
				<a href="/kb/prompts/claude-md/" class="card card-interactive related-card">
					<div class="related-card-category">Configuration</div>
					<div class="related-card-title">CLAUDE.md</div>
					<p class="related-card-description">File-based Claude configuration</p>
				</a>
				<a href="/kb/prompts/prompt-engineering-code/" class="card card-interactive related-card">
					<div class="related-card-category">Guide</div>
					<div class="related-card-title">Prompt Engineering</div>
					<p class="related-card-description">Advanced prompting techniques</p>
				</a>
				<a href="/kb/prompts/custom-instructions/" class="card card-interactive related-card">
					<div class="related-card-category">Configuration</div>
					<div class="related-card-title">Custom Instructions</div>
					<p class="related-card-description">Cross-tool configuration</p>
				</a>
			</div>
		</section>

		<div class="cta-box">
			<h3>Claude Prompts Can't Catch Everything</h3>
			<p>Even with perfect system prompts, vibe coded projects need security verification. VibeShip Scanner finds vulnerabilities Claude missed.</p>
			<a href="https://vibeship.co" class="btn btn-green">Scan Your Code Free</a>
		</div>
	</article>
</div>

<style>
	.intro { font-size: 1.125rem; color: var(--text-secondary); margin-bottom: 2rem; line-height: 1.7; }
	.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin: 1.5rem 0 2rem; }

	/* Tags Grid */
	.tags-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; margin: 1rem 0; }
	.tag-card { padding: 0.75rem; }
	.tag-card code { display: block; color: var(--green); font-size: 0.9rem; margin-bottom: 0.5rem; }
	.tag-card p { margin: 0; font-size: 0.8rem; color: var(--text-secondary); }

	/* Use Cases */
	.use-cases { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1rem 0; }
	.use-case { padding: 1rem; background: var(--bg-secondary); }
	.use-case .label { font-weight: 600; font-size: 0.9rem; display: block; margin-bottom: 0.5rem; }
	.use-case.good .label { color: var(--green); }
	.use-case.bad .label { color: var(--orange); }
	.use-case ul { margin: 0; padding-left: 1.25rem; }
	.use-case li { font-size: 0.875rem; color: var(--text-secondary); margin: 0.25rem 0; }

	/* Techniques Grid */
	.techniques-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1rem 0; }
	.techniques-grid h4 { margin: 0 0 0.5rem; font-size: 0.95rem; }
	.techniques-grid p { margin: 0; font-size: 0.875rem; color: var(--text-secondary); }

	/* Comparison Table */
	.comparison-table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
	.comparison-table th, .comparison-table td { padding: 0.75rem; text-align: left; border-bottom: 1px solid var(--border); font-size: 0.9rem; }
	.comparison-table th { background: var(--bg-secondary); font-weight: 600; }

	@media (max-width: 900px) { .tags-grid { grid-template-columns: repeat(2, 1fr); } }
	@media (max-width: 768px) {
		.stats-row { grid-template-columns: repeat(2, 1fr); }
		.use-cases, .techniques-grid { grid-template-columns: 1fr; }
	}
	@media (max-width: 480px) {
		.stats-row { grid-template-columns: 1fr; }
		.tags-grid { grid-template-columns: 1fr; }
	}
</style>
