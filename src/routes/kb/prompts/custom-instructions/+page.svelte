<script lang="ts">
	import { Header } from '$lib/components/layout';

	const meta = {
		title: 'Custom Instructions for AI Coding: Setup Guide',
		description: 'Set up custom instructions for ChatGPT, Claude, and Copilot. Skip the bloat - just the settings that actually improve code output.',
		url: '/kb/prompts/custom-instructions/'
	};

	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Prompts', href: '/kb/prompts' },
		{ label: 'Custom Instructions' }
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
			question: 'What are custom instructions?',
			answer: 'Custom instructions are persistent settings that apply to every conversation with an AI tool. Instead of repeating your tech stack and preferences in every prompt, you set them once. ChatGPT, Claude, and Copilot all support some form of persistent configuration.'
		},
		{
			question: 'How long should custom instructions be?',
			answer: 'Short. ChatGPT limits you to ~1500 characters per field. Claude Projects allows more but loses focus past ~2000 words. The most effective instructions are under 500 words total. Focus on what changes default behavior - skip obvious stuff the model already knows.'
		},
		{
			question: 'Should I include my entire style guide?',
			answer: 'No. Custom instructions aren\'t a style guide dump. Include: (1) Your stack, (2) 3-5 critical conventions the model would otherwise violate, (3) Security requirements. Everything else is noise that dilutes the important stuff.'
		},
		{
			question: 'Do custom instructions work with code generation?',
			answer: 'Yes, but they work better for constraints than positive instructions. "Never use any types" works better than "Use precise TypeScript." Negative constraints are harder to ignore. Think of instructions as guardrails, not guides.'
		},
		{
			question: 'What about project-specific vs global instructions?',
			answer: 'Use global instructions for universal preferences (TypeScript, security basics). Use project-specific configs (CLAUDE.md, .cursorrules) for stack-specific patterns. Global = who you are. Project = what you\'re building.'
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
				<strong>Custom instructions</strong> let AI tools remember your preferences. Most vibe coders over-stuff them. The effective approach: state your stack, list 5 constraints, add security basics. Under 500 words total.
			</p>
		</div>

		<span class="badge badge-info">Configuration Guide</span>

		<h1>Custom Instructions for AI Coding: What Actually Matters</h1>

		<p class="intro">
			Custom instructions are powerful. They're also where most vibe coders go wrong. Pasting your entire style guide doesn't make AI follow it - it makes AI ignore half of it. The instructions that work are short, specific, and focused on changing default behavior. This guide covers what to include, what to skip, and copy-paste templates that don't waste your character limit.
		</p>

		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">&lt;500</div>
				<div class="stat-label">Words Max</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">3</div>
				<div class="stat-label">Platforms</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">5-7</div>
				<div class="stat-label">Key Constraints</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">100%</div>
				<div class="stat-label">Security Focus</div>
			</div>
		</div>

		<!-- What to Include Section -->
		<section class="article-section">
			<h2>What Custom Instructions Should Include</h2>

			<p>Three things. That's it.</p>

			<div class="rules-grid">
				<div class="card rule-card">
					<h3>1. Your Stack</h3>
					<p>Framework, language, database. One line each. The model uses this to give framework-specific answers instead of generic ones.</p>
					<div class="example-text">
						"I use Next.js 15 (App Router), TypeScript, Supabase, Tailwind."
					</div>
				</div>

				<div class="card rule-card">
					<h3>2. Critical Constraints</h3>
					<p>5-7 rules the model would otherwise violate. Negative constraints work better than positive ones.</p>
					<div class="example-text">
						"Never use 'any' type. Never use var. Always use async/await."
					</div>
				</div>

				<div class="card rule-card">
					<h3>3. Security Basics</h3>
					<p>AI-generated code has a 45% security flaw rate. Explicit security instructions cut this significantly.</p>
					<div class="example-text">
						"Always validate inputs. Use parameterized queries. Never hardcode secrets."
					</div>
				</div>
			</div>
		</section>

		<!-- What to Skip Section -->
		<section class="article-section">
			<h2>What to Skip</h2>

			<p>If it doesn't change default behavior, delete it.</p>

			<div class="skip-list">
				<div class="skip-item">
					<span class="skip-icon">Skip</span>
					<span>"Write clean, readable code"</span>
					<span class="skip-reason">- Model already tries to do this</span>
				</div>
				<div class="skip-item">
					<span class="skip-icon">Skip</span>
					<span>"Use best practices"</span>
					<span class="skip-reason">- Too vague to be actionable</span>
				</div>
				<div class="skip-item">
					<span class="skip-icon">Skip</span>
					<span>"Be helpful and thorough"</span>
					<span class="skip-reason">- Already in the system prompt</span>
				</div>
				<div class="skip-item">
					<span class="skip-icon">Skip</span>
					<span>Your entire ESLint config</span>
					<span class="skip-reason">- Too long, dilutes important rules</span>
				</div>
				<div class="skip-item">
					<span class="skip-icon">Skip</span>
					<span>Obvious language features</span>
					<span class="skip-reason">- "Use functions" doesn't need saying</span>
				</div>
			</div>
		</section>

		<!-- ChatGPT Section -->
		<section class="article-section">
			<h2 id="chatgpt">ChatGPT Custom Instructions</h2>

			<p>Settings → Personalization → Custom Instructions. Two fields, ~1500 chars each.</p>

			<h3>Field 1: "What would you like ChatGPT to know about you?"</h3>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Custom Instructions</span>
					<button class="copy-btn" class:copied={copiedId === 'gpt-1'} onclick={() => copyCode('gpt-1')}>
						{copiedId === 'gpt-1' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="gpt-1">{`I'm a [fullstack/frontend/backend] developer building [type of app].

Stack: [Next.js 15 App Router / React / etc.], TypeScript, [Supabase / Prisma / etc.], [Tailwind / etc.]

I prefer:
- Concise answers with code examples
- Modern patterns (App Router over Pages, async/await over .then)
- Security-conscious defaults

When I share code, I want fixes and improvements, not explanations of what I already know.`}</code></pre>
			</div>

			<h3>Field 2: "How would you like ChatGPT to respond?"</h3>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Custom Instructions</span>
					<button class="copy-btn" class:copied={copiedId === 'gpt-2'} onclick={() => copyCode('gpt-2')}>
						{copiedId === 'gpt-2' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="gpt-2">{`Code output rules:
- TypeScript with strict types (no 'any')
- Functional components with hooks
- Named exports
- Error handling on all async operations
- No inline styles (use Tailwind)

Security (always):
- Validate inputs with Zod
- Parameterized queries only
- No secrets in code
- Check auth before data access

Format:
- Show file paths above code blocks
- Complete files, not snippets
- Brief explanation only if logic is non-obvious`}</code></pre>
			</div>
		</section>

		<!-- Claude Section -->
		<section class="article-section">
			<h2 id="claude">Claude Custom Instructions</h2>

			<p>Claude offers two levels: Account Settings (global) and Projects (per-project). For coding, Projects are more powerful because you can include files.</p>

			<h3>Claude Projects Setup</h3>
			<ol>
				<li>Create a Project for your codebase</li>
				<li>Add project instructions (up to ~4000 words)</li>
				<li>Upload key files: types, patterns, configs</li>
				<li>Claude references these in every conversation</li>
			</ol>

			<h3>Claude Project Instructions Template</h3>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Project Instructions</span>
					<button class="copy-btn" class:copied={copiedId === 'claude-proj'} onclick={() => copyCode('claude-proj')}>
						{copiedId === 'claude-proj' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="claude-proj">{`# Project: [App Name]

## Stack
- Framework: Next.js 15 (App Router)
- Language: TypeScript (strict mode)
- Database: Supabase with RLS
- Styling: Tailwind CSS
- Validation: Zod

## Code Standards

### Required
- Explicit return types on functions
- Named exports (no default exports)
- Error boundaries for async operations
- Zod validation on all API inputs

### Forbidden
- 'any' type
- console.log in production code
- Hardcoded URLs or secrets
- String concatenation in queries

## Security Rules
1. Validate all user input before processing
2. Check authentication before data access
3. Use Row Level Security policies
4. Never expose internal error details to clients
5. Hash passwords with bcrypt (cost 12+)

## File Structure
src/
  app/          # Next.js App Router pages
  components/   # React components
  lib/          # Utilities and helpers
  types/        # TypeScript types`}</code></pre>
			</div>

			<p>For terminal-based development, use <a href="/kb/prompts/claude-md/">CLAUDE.md</a> instead - it persists in your repo.</p>
		</section>

		<!-- Copilot Section -->
		<section class="article-section">
			<h2 id="copilot">GitHub Copilot Instructions</h2>

			<p>Copilot uses a <code>.github/copilot-instructions.md</code> file in your repo. Keep it short - Copilot's context window is limited.</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">.github/copilot-instructions.md</span>
					<button class="copy-btn" class:copied={copiedId === 'copilot'} onclick={() => copyCode('copilot')}>
						{copiedId === 'copilot' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="copilot">{`# Copilot Instructions

## Project
Next.js 15 App Router, TypeScript, Supabase, Tailwind

## Conventions
- Functional components only
- Named exports
- Zod for validation
- Server actions for mutations

## TypeScript
- Strict mode, no 'any'
- Explicit return types
- Interface over type for objects

## Security
- Validate all inputs
- Parameterized queries
- No hardcoded secrets`}</code></pre>
			</div>

			<p>See <a href="/kb/prompts/copilot-instructions/">Copilot Instructions Guide</a> for path-specific configurations.</p>
		</section>

		<!-- Role Templates Section -->
		<section class="article-section">
			<h2>Templates by Role</h2>

			<p>Copy the template that matches your work. These are tuned for vibe coding workflows - customize the stack specifics.</p>

			<div class="role-grid">
				<div class="card role-card">
					<h3>Frontend Developer</h3>
					<div class="code-block">
						<div class="code-block-header">
							<span class="code-block-lang">Instructions</span>
							<button class="copy-btn" class:copied={copiedId === 'frontend'} onclick={() => copyCode('frontend')}>
								{copiedId === 'frontend' ? 'Copied!' : 'Copy'}
							</button>
						</div>
						<pre><code id="frontend">{`Stack: React/Next.js, TypeScript, Tailwind

Rules:
- Functional components with hooks
- Named exports, no default
- No 'any' types
- Accessible by default (ARIA labels, keyboard nav)
- No inline styles
- Server Components when possible

Security:
- Sanitize user-generated content
- No dangerouslySetInnerHTML
- Validate form inputs client AND server`}</code></pre>
					</div>
				</div>

				<div class="card role-card">
					<h3>Backend Developer</h3>
					<div class="code-block">
						<div class="code-block-header">
							<span class="code-block-lang">Instructions</span>
							<button class="copy-btn" class:copied={copiedId === 'backend'} onclick={() => copyCode('backend')}>
								{copiedId === 'backend' ? 'Copied!' : 'Copy'}
							</button>
						</div>
						<pre><code id="backend">{`Stack: Node.js/Python, PostgreSQL, REST/GraphQL

Rules:
- Explicit types on all functions
- Structured error handling
- Environment variables for config
- Logging without sensitive data

Security:
- Parameterized queries (no string concat)
- Validate all inputs with schema
- Auth check before data access
- Rate limiting on public endpoints
- Never expose stack traces`}</code></pre>
					</div>
				</div>

				<div class="card role-card">
					<h3>Fullstack (Vibe Coding Style)</h3>
					<div class="code-block">
						<div class="code-block-header">
							<span class="code-block-lang">Instructions</span>
							<button class="copy-btn" class:copied={copiedId === 'fullstack'} onclick={() => copyCode('fullstack')}>
								{copiedId === 'fullstack' ? 'Copied!' : 'Copy'}
							</button>
						</div>
						<pre><code id="fullstack">{`Stack: Next.js 15, TypeScript, Supabase, Tailwind

Rules:
- App Router patterns (not Pages)
- Server actions for mutations
- Zod validation everywhere
- No 'any' types
- Named exports

Security (critical):
- Validate inputs before database
- Use RLS policies
- Never trust client data
- No hardcoded secrets
- Auth check before data access

I'm shipping fast - give me working code, not theory.`}</code></pre>
					</div>
				</div>
			</div>
		</section>

		<!-- Anti-Patterns Section -->
		<section class="article-section">
			<h2>Common Mistakes</h2>

			<div class="mistakes-grid">
				<div class="card mistake-card">
					<h4>Too Long</h4>
					<p>2000+ word instructions get ignored. Models lose focus. Cut until it hurts, then cut more.</p>
				</div>
				<div class="card mistake-card">
					<h4>Too Vague</h4>
					<p>"Write good code" means nothing. "No any types, explicit return types" is actionable.</p>
				</div>
				<div class="card mistake-card">
					<h4>Conflicting Rules</h4>
					<p>"Be concise" + "explain everything thoroughly" = model picks one. Prioritize.</p>
				</div>
				<div class="card mistake-card">
					<h4>Obvious Statements</h4>
					<p>"Be helpful" wastes characters. Every instruction should change behavior.</p>
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
				<a href="/kb/prompts/cursor-rules/" class="card card-interactive related-card">
					<div class="related-card-category">Configuration</div>
					<div class="related-card-title">Cursor Rules</div>
					<p class="related-card-description">Project-level config for Cursor</p>
				</a>
				<a href="/kb/prompts/claude-md/" class="card card-interactive related-card">
					<div class="related-card-category">Configuration</div>
					<div class="related-card-title">CLAUDE.md</div>
					<p class="related-card-description">Claude Code project config</p>
				</a>
				<a href="/kb/prompts/copilot-instructions/" class="card card-interactive related-card">
					<div class="related-card-category">Configuration</div>
					<div class="related-card-title">Copilot Instructions</div>
					<p class="related-card-description">GitHub Copilot setup guide</p>
				</a>
				<a href="/kb/prompts/prompt-engineering-code/" class="card card-interactive related-card">
					<div class="related-card-category">Guide</div>
					<div class="related-card-title">Prompt Engineering</div>
					<p class="related-card-description">Master AI prompting techniques</p>
				</a>
			</div>
		</section>

		<div class="cta-box">
			<h3>Custom Instructions Don't Catch Everything</h3>
			<p>Even with perfect instructions, AI generates insecure code. VibeShip Scanner finds what slips through.</p>
			<a href="https://vibeship.co" class="btn btn-green">Scan Your Code Free</a>
		</div>
	</article>
</div>

<style>
	.intro { font-size: 1.125rem; color: var(--text-secondary); margin-bottom: 2rem; line-height: 1.7; }
	.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin: 1.5rem 0 2rem; }

	/* Rules Grid */
	.rules-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin: 1.5rem 0; }
	.rule-card h3 { margin: 0 0 0.5rem; font-size: 1rem; color: var(--green); }
	.rule-card p { margin: 0 0 0.75rem; font-size: 0.9rem; color: var(--text-secondary); }
	.example-text { padding: 0.5rem; background: var(--bg-tertiary); font-size: 0.8rem; font-style: italic; color: var(--text-secondary); }

	/* Skip List */
	.skip-list { margin: 1rem 0; }
	.skip-item { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0; border-bottom: 1px solid var(--border); font-size: 0.9rem; flex-wrap: wrap; }
	.skip-icon { padding: 0.25rem 0.5rem; background: var(--red); color: white; font-size: 0.75rem; font-weight: 600; }
	.skip-reason { color: var(--text-tertiary); font-size: 0.8rem; }

	/* Role Grid */
	.role-grid { display: grid; gap: 1rem; margin: 1.5rem 0; }
	.role-card h3 { margin: 0 0 0.75rem; font-size: 1rem; }

	/* Mistakes Grid */
	.mistakes-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1rem 0; }
	.mistake-card h4 { margin: 0 0 0.5rem; font-size: 0.95rem; color: var(--red); }
	.mistake-card p { margin: 0; font-size: 0.875rem; color: var(--text-secondary); }

	@media (max-width: 900px) { .rules-grid { grid-template-columns: 1fr; } }
	@media (max-width: 768px) {
		.stats-row { grid-template-columns: repeat(2, 1fr); }
		.mistakes-grid { grid-template-columns: 1fr; }
	}
	@media (max-width: 480px) { .stats-row { grid-template-columns: 1fr; } }
</style>
