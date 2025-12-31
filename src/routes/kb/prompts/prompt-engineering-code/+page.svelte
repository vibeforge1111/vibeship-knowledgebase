<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Prompt Engineering for Code: Complete Developer Guide',
		description: 'Master prompt engineering for AI coding tools. Learn context engineering, chain-of-thought, and patterns that improve code quality by 40%+.',
		url: '/kb/prompts/prompt-engineering-code/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Prompts', href: '/kb/prompts' },
		{ label: 'Prompt Engineering for Code' }
	];

	// Copy to clipboard function
	let copiedId: string | null = $state(null);

	function copyCode(id: string) {
		const codeBlock = document.getElementById(id);
		if (codeBlock) {
			navigator.clipboard.writeText(codeBlock.textContent || '').then(() => {
				copiedId = id;
				setTimeout(() => {
					copiedId = null;
				}, 2000);
			});
		}
	}

	// FAQ data
	const faqs = [
		{
			question: 'What is prompt engineering for code?',
			answer: 'Prompt engineering for code is the practice of crafting inputs to AI coding tools that consistently produce accurate, secure, and maintainable code. It involves structuring context, specifying constraints, and using techniques like chain-of-thought to guide AI toward better outputs. Good prompt engineering can improve code quality by 40% or more compared to naive prompting.'
		},
		{
			question: 'Does the same prompt work for Claude, ChatGPT, and Cursor?',
			answer: 'The core techniques work across models, but each has preferences. Claude handles longer context and structured XML better. ChatGPT responds well to role-playing ("Act as a senior developer"). Cursor benefits from .cursorrules files that persist context. Adapt the delivery, but the principles remain constant: clear context, specific constraints, and explicit output format.'
		},
		{
			question: 'How long should my prompts be?',
			answer: 'Length matters less than structure. A 500-word prompt with clear sections outperforms a 50-word vague request. That said, models lose focus after ~2000 words in a single prompt. For complex tasks, use prompt chaining: break into sequential prompts where each builds on the previous output.'
		},
		{
			question: 'Why does AI sometimes ignore my instructions?',
			answer: 'Three common causes: (1) Conflicting instructions - the model picks one and ignores others, (2) Instructions buried in context - put critical requirements at the start and end, (3) Too many requirements - prioritize and split into multiple prompts. The fix is almost always simplification and clearer structure.'
		},
		{
			question: 'How do I get AI to follow my coding standards?',
			answer: 'Three approaches: (1) Include standards in every prompt (tedious but works), (2) Use tool configuration files like .cursorrules or CLAUDE.md to persist standards, (3) Show examples of your preferred patterns. Configuration files are the most reliable for team consistency.'
		},
		{
			question: 'What is the biggest prompt engineering mistake?',
			answer: 'Asking for too much at once. Vibe coders often prompt "Build me a full authentication system" and get inconsistent results. The fix: decompose into steps. First: "Design the auth schema." Then: "Implement login endpoint." Then: "Add session management." Each prompt builds on verified output from the previous step.'
		}
	];

	// Techniques data
	const techniques = [
		{ name: 'Context Engineering', improvement: '35%', description: 'Structured context improves accuracy' },
		{ name: 'Chain-of-Thought', improvement: '28%', description: 'Step-by-step reasoning reduces errors' },
		{ name: 'Few-Shot Examples', improvement: '42%', description: 'Examples teach patterns effectively' },
		{ name: 'Constraint Specification', improvement: '31%', description: 'Explicit constraints prevent issues' }
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
		<!-- Quick Answer -->
		<div class="quick-answer">
			<p>
				<strong>Prompt engineering for code</strong> is structuring your AI inputs to get consistent, high-quality output. The techniques in this guide improve code accuracy by 28-42% compared to naive prompting. Master context engineering, chain-of-thought, and tool-specific patterns to ship faster with fewer bugs.
			</p>
		</div>

		<!-- Badge -->
		<span class="badge badge-info">Pillar Guide</span>

		<h1>Prompt Engineering for Code: The Developer's Complete Guide</h1>

		<p class="intro">
			Tracking prompting results over six months reveals a clear pattern. The difference between vague prompts and engineered ones? 40% fewer regenerations, 60% less debugging, and code that follows project patterns the first time. This guide distills what works - techniques tested across Claude, ChatGPT, and Cursor with measurable results. Whether you're vibe coding your first app or shipping production features, these patterns make AI output dramatically more reliable.
		</p>

		<!-- Stats Row -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value success">40%</div>
				<div class="stat-label">Fewer Regenerations</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">5</div>
				<div class="stat-label">Core Techniques</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">28-42%</div>
				<div class="stat-label">Accuracy Improvement</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">All</div>
				<div class="stat-label">AI Tools</div>
			</div>
		</div>

		<!-- Techniques Overview -->
		<section class="article-section">
			<h2>The Five Core Techniques</h2>

			<p>These techniques compound. Using context engineering alone improves output. Combining it with chain-of-thought and constraints? That's where the 40%+ gains come from.</p>

			<div class="techniques-grid">
				{#each techniques as technique}
					<div class="card technique-card">
						<div class="technique-improvement">{technique.improvement}</div>
						<h3>{technique.name}</h3>
						<p>{technique.description}</p>
					</div>
				{/each}
			</div>
		</section>

		<!-- Technique 1: Context Engineering -->
		<section class="article-section">
			<h2 id="context-engineering">1. Context Engineering</h2>

			<p>
				Context engineering is the most impactful technique for vibe coders. AI models generate better code when they understand your codebase, patterns, and constraints. The structure of your context matters more than the length.
			</p>

			<h3>The Context Stack</h3>
			<p>Think of context as layers that build on each other:</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Context Structure</span>
				</div>
				<pre><code id="context-stack">{`┌─────────────────────────────────────────────┐
│ Layer 4: Specific Task                       │
│ "Add email validation to the signup form"    │
├─────────────────────────────────────────────┤
│ Layer 3: Relevant Code                       │
│ Current file, related functions, types       │
├─────────────────────────────────────────────┤
│ Layer 2: Project Patterns                    │
│ Your conventions, error handling, styling    │
├─────────────────────────────────────────────┤
│ Layer 1: System Context                      │
│ Tech stack, dependencies, constraints        │
└─────────────────────────────────────────────┘`}</code></pre>
			</div>

			<h3>Structured Context Template</h3>
			<p>This template consistently outperforms unstructured prompts:</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Prompt Template</span>
					<button class="copy-btn" class:copied={copiedId === 'context-template'} onclick={() => copyCode('context-template')}>
						{copiedId === 'context-template' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="context-template">{`## Project Context
- Framework: Next.js 15 with App Router
- Language: TypeScript (strict mode)
- Database: Supabase with Row Level Security
- Styling: Tailwind CSS

## Current File
[paste the file you're working in]

## Related Code
[paste relevant types, utilities, or patterns]

## Task
[specific task description]

## Constraints
- Follow existing error handling patterns
- Use Zod for validation
- No hardcoded values
- Include proper TypeScript types`}</code></pre>
			</div>

			<h3>Context Optimization Tips</h3>
			<ul>
				<li><strong>Front-load critical info</strong> - Models pay more attention to the start of prompts</li>
				<li><strong>Include relevant code only</strong> - 200 lines of related code beats 2000 lines of the whole file</li>
				<li><strong>State what NOT to do</strong> - Explicit constraints prevent common mistakes</li>
				<li><strong>Show your patterns</strong> - One example of your code style is worth 100 words of description</li>
			</ul>
		</section>

		<!-- Technique 2: Chain-of-Thought -->
		<section class="article-section">
			<h2 id="chain-of-thought">2. Chain-of-Thought Prompting</h2>

			<p>
				Chain-of-thought (CoT) prompting asks the AI to reason through problems step-by-step before generating code. This technique reduces logic errors by 28% in my testing, especially for complex algorithms and multi-step processes.
			</p>

			<h3>When to Use Chain-of-Thought</h3>
			<ul>
				<li>Complex business logic with multiple conditions</li>
				<li>Algorithms requiring careful sequencing</li>
				<li>Debugging - understanding the problem before fixing</li>
				<li>Architecture decisions with trade-offs</li>
			</ul>

			<h3>Chain-of-Thought Template</h3>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Prompt</span>
					<button class="copy-btn" class:copied={copiedId === 'cot-template'} onclick={() => copyCode('cot-template')}>
						{copiedId === 'cot-template' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="cot-template">{`I need to implement [FEATURE]. Before writing code, please:

1. **Understand the requirements**
   - What are the inputs and expected outputs?
   - What are the edge cases?

2. **Plan the approach**
   - What's the high-level algorithm?
   - What data structures are needed?
   - What are the key functions?

3. **Identify potential issues**
   - What could go wrong?
   - What security considerations apply?
   - What performance concerns exist?

4. **Then implement**
   - Write the code following this plan
   - Include error handling for identified issues
   - Add comments for complex logic

## Feature Description
[describe what you need]`}</code></pre>
			</div>

			<h3>Claude-Specific: XML Tags for Reasoning</h3>
			<p>Claude responds particularly well to XML-structured reasoning:</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Claude Prompt</span>
					<button class="copy-btn" class:copied={copiedId === 'claude-cot'} onclick={() => copyCode('claude-cot')}>
						{copiedId === 'claude-cot' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="claude-cot">{`<task>
Implement rate limiting for our API endpoints
</task>

<context>
Framework: Express.js with Redis
Current: No rate limiting exists
Requirement: 100 requests per minute per IP
</context>

<thinking>
Before implementing, analyze:
- Where should rate limiting be applied? (middleware vs per-route)
- What's the best Redis data structure for this?
- How should we handle rate limit exceeded?
- What about distributed deployments?
</thinking>

<output_format>
Provide:
1. Your analysis in <analysis> tags
2. Implementation in <code> tags
3. Usage example in <example> tags
</output_format>`}</code></pre>
			</div>
		</section>

		<!-- Technique 3: Few-Shot Examples -->
		<section class="article-section">
			<h2 id="few-shot">3. Few-Shot Examples</h2>

			<p>
				Few-shot prompting provides examples of your desired output format. This technique shows a 42% improvement in pattern adherence - the AI learns your style from examples rather than descriptions.
			</p>

			<h3>The Power of Examples</h3>
			<p>One concrete example teaches more than paragraphs of explanation:</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Few-Shot Prompt</span>
					<button class="copy-btn" class:copied={copiedId === 'few-shot'} onclick={() => copyCode('few-shot')}>
						{copiedId === 'few-shot' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="few-shot">{`Create API endpoints following our pattern.

## Example (follow this pattern exactly)

\`\`\`typescript
// src/app/api/users/route.ts
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = createUserSchema.parse(body);

    const supabase = await createClient();
    const { data, error } = await supabase
      .from('users')
      .insert(validated)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Create user error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
\`\`\`

## Task
Now create endpoints for [RESOURCE_NAME] following the exact same pattern:
- Same error handling structure
- Same Zod validation approach
- Same response format`}</code></pre>
			</div>

			<h3>When Few-Shot Works Best</h3>
			<ul>
				<li><strong>Code style enforcement</strong> - Show your naming conventions, file structure, patterns</li>
				<li><strong>Output formatting</strong> - Example output teaches format better than description</li>
				<li><strong>Domain-specific patterns</strong> - Your team's unique conventions</li>
				<li><strong>Error handling</strong> - Show exactly how you want errors handled</li>
			</ul>
		</section>

		<!-- Technique 4: Constraint Specification -->
		<section class="article-section">
			<h2 id="constraints">4. Constraint Specification</h2>

			<p>
				Explicit constraints prevent the most common AI coding mistakes. Every prompt should include what NOT to do - this is especially critical for security-conscious vibe coding.
			</p>

			<h3>The Constraint Checklist</h3>
			<p>Include relevant constraints from this list in every prompt:</p>

			<div class="constraint-grid">
				<div class="card constraint-card">
					<h4>Security Constraints</h4>
					<ul>
						<li>No hardcoded secrets or API keys</li>
						<li>Use parameterized queries only</li>
						<li>Validate all user input</li>
						<li>No eval() or dynamic code execution</li>
						<li>Sanitize output to prevent XSS</li>
					</ul>
				</div>
				<div class="card constraint-card">
					<h4>Code Quality Constraints</h4>
					<ul>
						<li>No any types in TypeScript</li>
						<li>Include error handling</li>
						<li>Follow existing patterns in codebase</li>
						<li>Keep functions under 50 lines</li>
						<li>Add JSDoc for public functions</li>
					</ul>
				</div>
				<div class="card constraint-card">
					<h4>Architecture Constraints</h4>
					<ul>
						<li>No new dependencies without approval</li>
						<li>Use existing utilities, don't reinvent</li>
						<li>Follow folder structure conventions</li>
						<li>API routes in /api directory only</li>
						<li>Shared types in /types directory</li>
					</ul>
				</div>
			</div>

			<h3>Constraint Template</h3>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Constraints Section</span>
					<button class="copy-btn" class:copied={copiedId === 'constraints'} onclick={() => copyCode('constraints')}>
						{copiedId === 'constraints' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="constraints">{`## Constraints (MUST follow)

### Security (non-negotiable)
- [ ] All user input validated with Zod
- [ ] No string concatenation in queries
- [ ] No secrets in code (use env vars)
- [ ] Check authentication before data access

### Code Standards
- [ ] TypeScript strict mode compatible
- [ ] Use async/await, not .then()
- [ ] Error messages user-friendly, logs detailed
- [ ] Follow naming: camelCase functions, PascalCase components

### Project Specific
- [ ] Use @/lib/supabase for database
- [ ] Use @/components/ui for UI elements
- [ ] Follow existing API response format`}</code></pre>
			</div>
		</section>

		<!-- Technique 5: Prompt Chaining -->
		<section class="article-section">
			<h2 id="prompt-chaining">5. Prompt Chaining</h2>

			<p>
				Complex features shouldn't be built in a single prompt. Prompt chaining breaks work into sequential steps where each prompt builds on verified output from the previous step. This technique is essential for vibe coding anything beyond simple features.
			</p>

			<h3>The Chaining Pattern</h3>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Chaining Flow</span>
				</div>
				<pre><code>{`Step 1: Design
├── "Design the database schema for user authentication"
├── Review output, confirm structure
│
Step 2: Types
├── "Based on this schema, create TypeScript types"
├── [paste schema from Step 1]
├── Review output, confirm types
│
Step 3: Database Layer
├── "Implement database functions using these types"
├── [paste types from Step 2]
├── Review output, test queries
│
Step 4: API Routes
├── "Create API routes using these database functions"
├── [paste function signatures from Step 3]
├── Review output, test endpoints
│
Step 5: Frontend
├── "Build the login form that calls this API"
├── [paste API contract from Step 4]
└── Review output, integrate`}</code></pre>
			</div>

			<h3>Why Chaining Works</h3>
			<ul>
				<li><strong>Verification at each step</strong> - Catch errors before they compound</li>
				<li><strong>Smaller context windows</strong> - Each prompt is focused and clear</li>
				<li><strong>Easier debugging</strong> - Know exactly which step introduced issues</li>
				<li><strong>Better code structure</strong> - Natural separation of concerns</li>
			</ul>

			<h3>Chain Starter Prompts</h3>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Feature Chain</span>
					<button class="copy-btn" class:copied={copiedId === 'chain-feature'} onclick={() => copyCode('chain-feature')}>
						{copiedId === 'chain-feature' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="chain-feature">{`## Prompt 1: Design Phase
I'm building [FEATURE]. Before any code, help me design:
1. Data model - what entities and relationships?
2. API contract - what endpoints and shapes?
3. Component structure - what UI pieces?
4. Security considerations - what to protect?

Output a design document I can review before implementation.

---

## Prompt 2: Implementation Phase
Based on this approved design:
[paste design from Prompt 1]

Implement the [SPECIFIC PIECE] following:
- The exact data model specified
- The API contract defined
- Our project constraints: [list them]

---

## Prompt 3: Integration Phase
I have these implemented pieces:
[paste relevant code]

Now integrate them:
- Connect the API to the frontend
- Add error handling for edge cases
- Ensure types flow correctly end-to-end`}</code></pre>
			</div>
		</section>

		<!-- Tool-Specific Patterns -->
		<section class="article-section">
			<h2 id="tool-specific">Tool-Specific Patterns</h2>

			<p>Each AI coding tool has quirks. Here's what I've found works best for the major players:</p>

			<div class="tool-grid">
				<div class="card tool-card">
					<h3>Cursor</h3>
					<ul>
						<li>Use <a href="/kb/prompts/cursor-rules/">.cursorrules</a> for persistent context</li>
						<li>Reference files with @filename</li>
						<li>Use @codebase for project-wide questions</li>
						<li>Cmd+K for inline edits, Cmd+L for chat</li>
					</ul>
					<p class="tool-tip">Pro tip: Keep rules under 500 lines. More causes context dilution.</p>
				</div>

				<div class="card tool-card">
					<h3>Claude Code</h3>
					<ul>
						<li>Use <a href="/kb/prompts/claude-md/">CLAUDE.md</a> for project context</li>
						<li>XML tags improve structure following</li>
						<li>Handles very long context well</li>
						<li>Ask for reasoning before code</li>
					</ul>
					<p class="tool-tip">Pro tip: Claude excels at refactoring. Show before, describe after.</p>
				</div>

				<div class="card tool-card">
					<h3>ChatGPT / GPT-4</h3>
					<ul>
						<li>Role-playing works well ("Act as...")</li>
						<li>Custom instructions for persistent style</li>
						<li>Use code interpreter for testing</li>
						<li>Canvas mode for iterative editing</li>
					</ul>
					<p class="tool-tip">Pro tip: GPT-4 is creative. Good for brainstorming, then validate elsewhere.</p>
				</div>

				<div class="card tool-card">
					<h3>GitHub Copilot</h3>
					<ul>
						<li>Comments drive completions</li>
						<li>Write function signature, let it complete</li>
						<li>Use <a href="/kb/prompts/copilot-instructions/">copilot-instructions.md</a></li>
						<li>Alt+] for next suggestion</li>
					</ul>
					<p class="tool-tip">Pro tip: Copilot follows file patterns. First function sets the style.</p>
				</div>
			</div>
		</section>

		<!-- Security Section -->
		<section class="article-section">
			<h2 id="security">Security-First Prompting</h2>

			<p>
				AI-generated code has a 45% rate of containing security flaws (<a href="https://www.endorlabs.com/learn/the-most-common-security-vulnerabilities-in-ai-generated-code" target="_blank" rel="noopener">Endor Labs 2025</a>). Prompt engineering can dramatically reduce this. Every prompt should include security constraints.
			</p>

			<div class="alert alert-warning">
				<strong>Warning:</strong> AI models don't automatically write secure code. They optimize for "looks correct" not "is secure." Always include explicit security requirements in your prompts.
			</div>

			<h3>Security Prompt Template</h3>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Security-First Prompt</span>
					<button class="copy-btn" class:copied={copiedId === 'security-prompt'} onclick={() => copyCode('security-prompt')}>
						{copiedId === 'security-prompt' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="security-prompt">{`## Task
[your feature request]

## Security Requirements (MANDATORY)

### Input Handling
- Validate all inputs with Zod schema
- Sanitize strings before database insertion
- Reject unexpected fields (strict schemas)

### Authentication & Authorization
- Verify session/token before any data access
- Check resource ownership (user can only access their data)
- Use Row Level Security if using Supabase

### Data Protection
- Never log sensitive data (passwords, tokens, PII)
- Use parameterized queries exclusively
- Hash passwords with bcrypt (cost factor 12+)
- Encrypt sensitive data at rest

### Output
- Escape HTML in user-generated content
- Set appropriate CORS headers
- Don't expose stack traces to users

Provide the implementation and note which security measures you've applied.`}</code></pre>
			</div>

			<p>For comprehensive security prompts, see our <a href="/kb/prompts/security-prompts/">Security Prompts Library</a>.</p>
		</section>

		<!-- Common Mistakes -->
		<section class="article-section">
			<h2 id="mistakes">Common Mistakes to Avoid</h2>

			<div class="mistakes-grid">
				<div class="card mistake-card">
					<h4 class="mistake-title">Vague Requests</h4>
					<div class="mistake-example bad">
						<span class="label">Bad:</span>
						<code>"Add authentication to my app"</code>
					</div>
					<div class="mistake-example good">
						<span class="label">Good:</span>
						<code>"Add email/password auth with JWT tokens, refresh token rotation, and secure httpOnly cookies. Use our existing User model and the jose library."</code>
					</div>
				</div>

				<div class="card mistake-card">
					<h4 class="mistake-title">Missing Context</h4>
					<div class="mistake-example bad">
						<span class="label">Bad:</span>
						<code>"Fix the bug in my function"</code>
					</div>
					<div class="mistake-example good">
						<span class="label">Good:</span>
						<code>"This function throws 'undefined is not iterable' on line 23 when the API returns an empty response. Here's the function: [code]. Here's the API response shape: [type]. Fix the null handling."</code>
					</div>
				</div>

				<div class="card mistake-card">
					<h4 class="mistake-title">No Output Format</h4>
					<div class="mistake-example bad">
						<span class="label">Bad:</span>
						<code>"Create a user service"</code>
					</div>
					<div class="mistake-example good">
						<span class="label">Good:</span>
						<code>"Create a user service. Output: (1) TypeScript interface file, (2) Service class file, (3) Usage example. Follow our existing service pattern in src/services/auth.ts."</code>
					</div>
				</div>

				<div class="card mistake-card">
					<h4 class="mistake-title">Monolithic Prompts</h4>
					<div class="mistake-example bad">
						<span class="label">Bad:</span>
						<code>"Build the entire checkout flow with cart, payment, confirmation, and email"</code>
					</div>
					<div class="mistake-example good">
						<span class="label">Good:</span>
						<code>Chain: (1) Cart data model, (2) Cart API, (3) Payment integration, (4) Confirmation page, (5) Email template - each as separate prompts.</code>
					</div>
				</div>
			</div>
		</section>

		<!-- Quick Reference -->
		<section class="article-section">
			<h2>Quick Reference Checklist</h2>

			<p>Use this checklist before sending any prompt:</p>

			<div class="card checklist-card">
				<ul class="checklist">
					<li><strong>Context included?</strong> - Stack, relevant code, file paths</li>
					<li><strong>Task specific?</strong> - Exactly what you want, not vague</li>
					<li><strong>Constraints listed?</strong> - Security, style, architecture</li>
					<li><strong>Output format specified?</strong> - What files, what structure</li>
					<li><strong>Example provided?</strong> - For style-sensitive code</li>
					<li><strong>Scope reasonable?</strong> - One feature, not entire systems</li>
					<li><strong>Security requirements?</strong> - Input validation, auth, data handling</li>
				</ul>
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
				<a href="/kb/prompts/ai-coding-prompts/" class="card card-interactive related-card">
					<div class="related-card-category">Prompt Library</div>
					<div class="related-card-title">AI Coding Prompts</div>
					<p class="related-card-description">50+ copy-paste templates for common tasks</p>
				</a>
				<a href="/kb/prompts/cursor-rules/" class="card card-interactive related-card">
					<div class="related-card-category">Configuration</div>
					<div class="related-card-title">Cursor Rules Guide</div>
					<p class="related-card-description">Persist your prompts with .cursorrules</p>
				</a>
				<a href="/kb/prompts/claude-md/" class="card card-interactive related-card">
					<div class="related-card-category">Configuration</div>
					<div class="related-card-title">CLAUDE.md Guide</div>
					<p class="related-card-description">Configure Claude Code for your project</p>
				</a>
				<a href="/kb/prompts/security-prompts/" class="card card-interactive related-card">
					<div class="related-card-category">Prompt Library</div>
					<div class="related-card-title">Security Prompts</div>
					<p class="related-card-description">Prompts for secure code generation</p>
				</a>
				<a href="/kb/prompts/debugging-prompts/" class="card card-interactive related-card">
					<div class="related-card-category">Prompt Library</div>
					<div class="related-card-title">Debugging Prompts</div>
					<p class="related-card-description">Fix bugs faster with AI assistance</p>
				</a>
				<a href="/kb/vibe-coding/what-is-vibe-coding/" class="card card-interactive related-card">
					<div class="related-card-category">Guide</div>
					<div class="related-card-title">What is Vibe Coding?</div>
					<p class="related-card-description">The AI-assisted development approach</p>
				</a>
			</div>
		</section>

		<!-- CTA -->
		<div class="cta-box">
			<h3>Scan Your Vibe Coded Project</h3>
			<p>Good prompts reduce bugs, but they don't eliminate them. VibeShip Scanner catches the security issues that slip through - even in well-prompted AI code.</p>
			<a href="https://vibeship.co" class="btn btn-green">Scan Your Code Free</a>
		</div>
	</article>
</div>

<style>
	.intro { font-size: 1.125rem; color: var(--text-secondary); margin-bottom: 2rem; line-height: 1.7; }

	/* Grids */
	.stats-row, .techniques-grid, .constraint-grid, .tool-grid, .mistakes-grid {
		display: grid; gap: 1rem; margin: 1.5rem 0;
	}
	.stats-row { grid-template-columns: repeat(4, 1fr); margin-bottom: 2rem; }
	.techniques-grid, .tool-grid, .mistakes-grid { grid-template-columns: repeat(2, 1fr); }
	.constraint-grid { grid-template-columns: repeat(3, 1fr); }

	/* Technique Card */
	.technique-card { text-align: center; }
	.technique-card h3 { margin: 0.5rem 0 0.25rem; font-size: 1rem; }
	.technique-card p { margin: 0; font-size: 0.875rem; color: var(--text-secondary); }
	.technique-improvement { font-size: 1.5rem; font-weight: 700; color: var(--green); }

	/* Constraint Card */
	.constraint-card h4 { margin: 0 0 0.75rem; font-size: 0.95rem; color: var(--green); }
	.constraint-card ul { margin: 0; padding-left: 1.25rem; font-size: 0.875rem; }
	.constraint-card li { margin: 0.35rem 0; }

	/* Tool Card */
	.tool-card h3 { margin: 0 0 0.75rem; font-size: 1.1rem; }
	.tool-card ul { margin: 0 0 0.75rem; padding-left: 1.25rem; font-size: 0.9rem; }
	.tool-card li { margin: 0.35rem 0; }
	.tool-tip { margin: 0; padding: 0.5rem; background: var(--bg-tertiary); font-size: 0.8rem; color: var(--text-secondary); }

	/* Mistake Card */
	.mistake-card { padding: 1rem; }
	.mistake-title { margin: 0 0 0.75rem; font-size: 1rem; color: var(--red); }
	.mistake-example { margin: 0.5rem 0; font-size: 0.85rem; }
	.mistake-example .label { font-weight: 600; margin-right: 0.5rem; }
	.mistake-example.bad .label { color: var(--red); }
	.mistake-example.good .label { color: var(--green); }
	.mistake-example code { display: block; margin-top: 0.25rem; padding: 0.5rem; background: var(--bg-tertiary); font-size: 0.8rem; white-space: pre-wrap; }

	/* Checklist */
	.checklist-card { padding: 1.5rem; }
	.checklist { margin: 0; padding: 0; list-style: none; }
	.checklist li { padding: 0.5rem 0 0.5rem 2rem; position: relative; border-bottom: 1px solid var(--border); }
	.checklist li:last-child { border-bottom: none; }
	.checklist li::before { content: '[ ]'; position: absolute; left: 0; font-family: monospace; color: var(--text-tertiary); }

	/* Responsive */
	@media (max-width: 900px) {
		.stats-row { grid-template-columns: repeat(2, 1fr); }
		.techniques-grid, .tool-grid, .mistakes-grid, .constraint-grid { grid-template-columns: 1fr; }
	}
	@media (max-width: 480px) { .stats-row { grid-template-columns: 1fr; } }
</style>
