<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Debugging Prompts: 35+ Templates for Fixing Bugs with AI',
		description: 'Copy-paste debugging prompts for Claude, ChatGPT, and Cursor. Templates for error analysis, stack traces, performance issues, and systematic bug hunting.',
		url: '/kb/prompts/debugging-prompts/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Prompts', href: '/kb/prompts' },
		{ label: 'Debugging Prompts' }
	];

	// FAQ data
	const faqs = [
		{
			question: 'How do I get AI to fix my bug instead of just explaining it?',
			answer: 'Be explicit: "Provide the fixed code, not just an explanation." Include the full error, relevant code, and what you have tried. Ask for the complete corrected code block with file path. The prompts in this library include these instructions by default.'
		},
		{
			question: 'What information should I include when asking AI to debug?',
			answer: 'Four things: (1) Full error message and stack trace, (2) Relevant code that triggered it, (3) What you expected to happen, (4) What you have already tried. More context means faster, more accurate fixes.'
		},
		{
			question: 'Can AI debug production issues?',
			answer: 'Yes, but sanitize data first. Remove real user data, API keys, and internal URLs from logs before pasting. Use the production debugging prompts in this library which remind you to sanitize and focus on patterns rather than specific data.'
		},
		{
			question: 'How do I debug intermittent or race condition bugs with AI?',
			answer: 'Describe the conditions: "This fails about 30% of the time, usually under load." Include timing information, concurrent operations, and any patterns you have noticed. AI can identify race conditions, deadlocks, and timing issues from descriptions.'
		},
		{
			question: 'Should I paste my entire file when debugging?',
			answer: 'No, AI loses focus on long contexts. Paste: (1) The specific function with the bug, (2) Related functions it calls, (3) Type definitions if relevant. Keep it under 200 lines. Use the focused debugging prompts in this library.'
		},
		{
			question: 'How do I debug TypeScript type errors with AI?',
			answer: 'Include: (1) The exact type error message, (2) The code causing it, (3) The type definitions involved. TypeScript errors often need the surrounding type context. Ask AI to explain the type mismatch and provide the corrected types.'
		}
	];

	// Prompt categories
	const categories = [
		{ name: 'Error Analysis', count: 8, icon: '🔴' },
		{ name: 'Stack Traces', count: 5, icon: '📚' },
		{ name: 'Performance', count: 6, icon: '⚡' },
		{ name: 'Type Errors', count: 5, icon: '📝' },
		{ name: 'Runtime Issues', count: 6, icon: '🏃' },
		{ name: 'Testing', count: 5, icon: '🧪' }
	];
</script>

<svelte:head>
	<title>{meta.title} | VibeShip</title>
	<meta name="description" content={meta.description} />
	<link rel="canonical" href="https://vibeship.co{meta.url}" />
</svelte:head>

<Header {breadcrumbs} />

<div class="content-wrapper">
	<article class="content-main content-wide">
		<!-- Quick Answer -->
		<div class="quick-answer">
			<p>
				<strong>Debugging prompts</strong> work best when they include the full error, relevant code, expected behavior, and what you have tried. This library contains 35+ battle-tested prompts for error analysis, stack traces, performance issues, and systematic bug hunting - ready to copy into any AI coding assistant.
			</p>
		</div>

		<!-- Badge -->
		<span class="badge badge-debug">Debug Library</span>

		<h1>Debugging Prompts: 35+ Templates for Fixing Bugs with AI</h1>

		<p class="intro">
			Stop pasting error messages and hoping for the best. These debugging prompts are structured to give AI the context it needs to actually fix your bugs - not just explain them. Each template guides you to include the right information: error messages, code context, expected behavior, and what you have tried.
		</p>

		<!-- Stats Row -->
		<div class="stats-row">
			<div class="stat-card">
				<div class="stat-number">35+</div>
				<div class="stat-label">Prompts</div>
			</div>
			<div class="stat-card">
				<div class="stat-number">6</div>
				<div class="stat-label">Categories</div>
			</div>
			<div class="stat-card">
				<div class="stat-number">Fix-First</div>
				<div class="stat-label">Approach</div>
			</div>
			<div class="stat-card">
				<div class="stat-number">100%</div>
				<div class="stat-label">Copy-Paste Ready</div>
			</div>
		</div>

		<!-- Categories Grid -->
		<div class="categories-grid">
			{#each categories as category}
				<div class="category-card">
					<span class="category-icon">{category.icon}</span>
					<span class="category-name">{category.name}</span>
					<span class="category-count">{category.count} prompts</span>
				</div>
			{/each}
		</div>

		<!-- Error Analysis Section -->
		<section class="prompt-section">
			<h2 id="error-analysis">Error Analysis Prompts</h2>

			<p>Prompts for understanding and fixing error messages.</p>

			<div class="prompt-card">
				<h3>Quick Error Fix</h3>
				<div class="prompt-meta">
					<span class="prompt-tag urgent">Fast Fix</span>
					<span class="prompt-tag">Any Error</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Fix this error:

## Error
\`\`\`
[paste full error message here]
\`\`\`

## Code That Caused It
\`\`\`[language]
[paste the relevant code - function or file section]
\`\`\`

## Expected Behavior
[what should happen instead]

## Provide
1. Root cause explanation (1-2 sentences)
2. The fixed code (complete, runnable)
3. How to prevent this in the future`}</code></pre>
				</div>
			</div>

			<div class="prompt-card">
				<h3>Comprehensive Error Analysis</h3>
				<div class="prompt-meta">
					<span class="prompt-tag">Deep Analysis</span>
					<span class="prompt-tag">Complex Bugs</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Analyze and fix this error comprehensively:

## Error Message
\`\`\`
[paste full error with stack trace]
\`\`\`

## Code Context
\`\`\`[language]
[paste relevant code - 50-150 lines max]
\`\`\`

## Environment
- Framework: [Next.js 15 / React 19 / Node 20 / etc.]
- Language: [TypeScript / JavaScript / Python]
- Running in: [development / production / test]

## When It Happens
- Frequency: [always / sometimes / once]
- Trigger: [specific action that causes it]
- Started after: [recent change if known]

## What I've Tried
1. [attempt 1 and result]
2. [attempt 2 and result]

## Analysis Required
1. What is the root cause?
2. Why did my attempted fixes not work?
3. What is the correct fix?
4. Are there related issues I should check?

Provide the fixed code with comments explaining the changes.`}</code></pre>
				</div>
			</div>

			<div class="prompt-card">
				<h3>Cryptic Error Message</h3>
				<div class="prompt-meta">
					<span class="prompt-tag">Unclear Errors</span>
					<span class="prompt-tag">Interpretation</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Help me understand this cryptic error message:

## Error
\`\`\`
[paste the confusing error]
\`\`\`

## Context
- Where: [file/function where it occurs]
- When: [what action triggered it]
- Framework: [relevant framework]

## My Code
\`\`\`[language]
[paste relevant section]
\`\`\`

## Questions
1. What does this error actually mean in plain English?
2. What are the common causes?
3. How do I fix it in my specific case?

Be specific to my code, not generic documentation.`}</code></pre>
				</div>
			</div>

			<div class="prompt-card">
				<h3>Build/Compile Error</h3>
				<div class="prompt-meta">
					<span class="prompt-tag">Build</span>
					<span class="prompt-tag">Compile</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Fix this build/compile error:

## Build Output
\`\`\`
[paste complete build error output]
\`\`\`

## Build Command
[npm run build / tsc / vite build / etc.]

## Relevant Files
\`\`\`[language]
// [filename]
[paste the file mentioned in error]
\`\`\`

## Config Files (if relevant)
\`\`\`json
// tsconfig.json or similar
[paste config]
\`\`\`

## Recent Changes
[what changed before build started failing]

Provide:
1. What's causing the build to fail
2. The fix (code changes or config changes)
3. Build command to verify the fix`}</code></pre>
				</div>
			</div>

			<div class="prompt-card">
				<h3>Multiple Errors Cascade</h3>
				<div class="prompt-meta">
					<span class="prompt-tag">Multiple Errors</span>
					<span class="prompt-tag">Root Cause</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`I'm getting multiple errors. Help me find and fix the root cause.

## All Errors
\`\`\`
[paste all error messages]
\`\`\`

## My Hypothesis
[what I think might be wrong, if any]

## Code
\`\`\`[language]
[paste relevant code]
\`\`\`

## Analysis Needed
1. Which error is the root cause (likely first)?
2. Which errors are cascading from the root cause?
3. What single fix will resolve all of them?

Focus on the root cause - don't fix symptoms.`}</code></pre>
				</div>
			</div>
		</section>

		<!-- Stack Traces Section -->
		<section class="prompt-section">
			<h2 id="stack-traces">Stack Trace Prompts</h2>

			<p>Prompts for analyzing stack traces and call chains.</p>

			<div class="prompt-card">
				<h3>Stack Trace Analysis</h3>
				<div class="prompt-meta">
					<span class="prompt-tag">Stack Trace</span>
					<span class="prompt-tag">Deep Dive</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Analyze this stack trace and help me fix the bug:

## Stack Trace
\`\`\`
[paste complete stack trace]
\`\`\`

## Code at Error Location
\`\`\`[language]
// [file and line from stack trace]
[paste code around the error location]
\`\`\`

## Code That Called It
\`\`\`[language]
// [calling function from stack trace]
[paste the calling code]
\`\`\`

## Analysis Required
1. Walk through the call chain
2. Identify where things went wrong
3. Explain why the error occurred
4. Provide the fix

Show me exactly which function to change and how.`}</code></pre>
				</div>
			</div>

			<div class="prompt-card">
				<h3>Async Stack Trace</h3>
				<div class="prompt-meta">
					<span class="prompt-tag">Async</span>
					<span class="prompt-tag">Promises</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Debug this async error - the stack trace is incomplete:

## Error
\`\`\`
[paste error and partial stack trace]
\`\`\`

## Async Code
\`\`\`[language]
[paste async functions involved]
\`\`\`

## Call Flow (what I know)
1. [function A] calls
2. [function B] which awaits
3. [function C] where error might originate

## Context
- Using: [async/await / Promises / callbacks]
- Framework: [Next.js server actions / API routes / etc.]

## Help Needed
1. Where in the async chain is the error originating?
2. What's causing it (missing await, unhandled rejection, etc.)?
3. How do I add proper error handling?
4. Fixed code with proper async error handling`}</code></pre>
				</div>
			</div>

			<div class="prompt-card">
				<h3>React/Next.js Component Stack</h3>
				<div class="prompt-meta">
					<span class="prompt-tag">React</span>
					<span class="prompt-tag">Component Tree</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Debug this React component error:

## Error Message
\`\`\`
[paste error - often shows component stack]
\`\`\`

## Component Tree (from error or React DevTools)
\`\`\`
[paste component hierarchy]
\`\`\`

## Component Code
\`\`\`tsx
// [Component that errored]
[paste component code]
\`\`\`

## Parent Component
\`\`\`tsx
// [Parent that renders this component]
[paste parent code]
\`\`\`

## Error Occurs
- On: [mount / update / unmount / interaction]
- After: [specific user action]

Identify which component in the tree has the bug and provide the fix.`}</code></pre>
				</div>
			</div>
		</section>

		<!-- Performance Section -->
		<section class="prompt-section">
			<h2 id="performance">Performance Debugging Prompts</h2>

			<p>Prompts for diagnosing and fixing performance issues.</p>

			<div class="prompt-card">
				<h3>Slow Function/Query</h3>
				<div class="prompt-meta">
					<span class="prompt-tag urgent">Performance</span>
					<span class="prompt-tag">Optimization</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`This code is slow. Help me optimize it:

## Slow Code
\`\`\`[language]
[paste the slow function/query]
\`\`\`

## Performance Data
- Current execution time: [X ms/seconds]
- Target execution time: [Y ms/seconds]
- Data size: [N records/items]

## Where It Runs
[API route / database query / client-side / etc.]

## Analysis Needed
1. What's making it slow? (N+1, missing index, algorithm, etc.)
2. What optimizations are possible?
3. Which optimization gives biggest improvement?
4. Provide optimized code

Prioritize fixes by impact. Show before/after code.`}</code></pre>
				</div>
			</div>

			<div class="prompt-card">
				<h3>Memory Leak Investigation</h3>
				<div class="prompt-meta">
					<span class="prompt-tag critical">Memory</span>
					<span class="prompt-tag">Leak</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`I suspect a memory leak in this code:

## Symptoms
- Memory usage: [grows over time / spikes / never freed]
- When it happens: [specific action / continuous]
- App behavior: [slows down / crashes / OOM errors]

## Suspicious Code
\`\`\`[language]
[paste code you suspect is leaking]
\`\`\`

## Environment
- Runtime: [Node.js / Browser / React Native]
- Framework: [React / Next.js / Express / etc.]

## Common Leak Patterns to Check
- [ ] Event listeners not removed
- [ ] setInterval/setTimeout not cleared
- [ ] Closures holding references
- [ ] Caches growing unbounded
- [ ] Subscriptions not unsubscribed

## Provide
1. Identify the leak source
2. Explain why memory isn't being freed
3. Fixed code with proper cleanup
4. How to verify the fix worked`}</code></pre>
				</div>
			</div>

			<div class="prompt-card">
				<h3>React Re-render Debugging</h3>
				<div class="prompt-meta">
					<span class="prompt-tag">React</span>
					<span class="prompt-tag">Re-renders</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`This React component re-renders too often:

## Component
\`\`\`tsx
[paste component code]
\`\`\`

## Parent Component
\`\`\`tsx
[paste parent that passes props]
\`\`\`

## Symptoms
- Re-renders on: [every keystroke / parent update / unrelated state change]
- React DevTools shows: [highlight updates info]

## State/Context Used
- Local state: [list useState hooks]
- Context: [which contexts consumed]
- Props: [what props received]

## Analyze and Fix
1. Why is it re-rendering unnecessarily?
2. Which props/state changes are triggering it?
3. What's the optimal solution? (useMemo, useCallback, memo, restructure)
4. Provide optimized code

Don't over-optimize - focus on the actual performance problem.`}</code></pre>
				</div>
			</div>

			<div class="prompt-card">
				<h3>Database Query Performance</h3>
				<div class="prompt-meta">
					<span class="prompt-tag">Database</span>
					<span class="prompt-tag">Query</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`This database query is slow:

## Query
\`\`\`sql
[paste query - SQL or ORM code]
\`\`\`

## Explain/Execution Plan (if available)
\`\`\`
[paste EXPLAIN output]
\`\`\`

## Schema (relevant tables)
\`\`\`sql
[paste table definitions and existing indexes]
\`\`\`

## Performance
- Current: [X seconds]
- Table sizes: [N rows]
- Called: [X times per minute/hour]

## Optimize For
1. Query rewrite opportunities
2. Missing indexes
3. N+1 query issues (if ORM)
4. Caching opportunities

Provide optimized query AND any schema changes (indexes).`}</code></pre>
				</div>
			</div>
		</section>

		<!-- Type Errors Section -->
		<section class="prompt-section">
			<h2 id="type-errors">TypeScript Type Error Prompts</h2>

			<p>Prompts for fixing TypeScript and type-related errors.</p>

			<div class="prompt-card">
				<h3>Type Mismatch Error</h3>
				<div class="prompt-meta">
					<span class="prompt-tag">TypeScript</span>
					<span class="prompt-tag">Types</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Fix this TypeScript type error:

## Error
\`\`\`
[paste full TypeScript error message]
\`\`\`

## Code
\`\`\`typescript
[paste code with error]
\`\`\`

## Type Definitions
\`\`\`typescript
[paste relevant type/interface definitions]
\`\`\`

## What I'm Trying to Do
[explain the intended behavior]

## Provide
1. Explain the type mismatch in plain terms
2. The correct fix (don't use 'any' unless necessary)
3. If types need to change, show the new types
4. Explain why the fix is correct`}</code></pre>
				</div>
			</div>

			<div class="prompt-card">
				<h3>Generic Type Error</h3>
				<div class="prompt-meta">
					<span class="prompt-tag">Generics</span>
					<span class="prompt-tag">Advanced</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Fix this generic type error:

## Error
\`\`\`
[paste TypeScript error - often mentions type parameters]
\`\`\`

## Generic Function/Type
\`\`\`typescript
[paste the generic code]
\`\`\`

## How I'm Using It
\`\`\`typescript
[paste the usage that errors]
\`\`\`

## Intent
I want this generic to: [describe desired behavior]

## Provide
1. Explain what's wrong with the generic constraints
2. Fixed generic definition
3. Correct usage example
4. Explain the type flow`}</code></pre>
				</div>
			</div>

			<div class="prompt-card">
				<h3>Third-Party Library Types</h3>
				<div class="prompt-meta">
					<span class="prompt-tag">Library</span>
					<span class="prompt-tag">@types</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Fix this type error with a third-party library:

## Error
\`\`\`
[paste TypeScript error]
\`\`\`

## My Code
\`\`\`typescript
[paste code using the library]
\`\`\`

## Library
- Package: [package name]
- Version: [version number]
- Types: [built-in / @types/package / none]

## What I'm Trying to Do
[explain intended usage]

## Options to Consider
1. Am I using the library API correctly?
2. Are the types outdated?
3. Do I need to extend/override types?
4. Should I create a declaration file?

Provide the least hacky solution first.`}</code></pre>
				</div>
			</div>
		</section>

		<!-- Runtime Issues Section -->
		<section class="prompt-section">
			<h2 id="runtime-issues">Runtime Issues Prompts</h2>

			<p>Prompts for debugging runtime behavior issues.</p>

			<div class="prompt-card">
				<h3>Undefined/Null Error</h3>
				<div class="prompt-meta">
					<span class="prompt-tag urgent">Common</span>
					<span class="prompt-tag">Null Safety</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Fix this undefined/null error:

## Error
\`\`\`
[TypeError: Cannot read property 'X' of undefined]
[or similar null/undefined error]
\`\`\`

## Code
\`\`\`[language]
[paste the code with error]
\`\`\`

## Data Source
The variable comes from: [API call / prop / state / database / etc.]

## When It Fails
- Works when: [describe working case]
- Fails when: [describe failing case]

## Fix Requirements
1. Identify where null/undefined enters
2. Proper null handling (not just || defaultValue)
3. Consider: optional chaining, nullish coalescing, guards
4. TypeScript: proper type narrowing

Provide defensive code that handles the edge case properly.`}</code></pre>
				</div>
			</div>

			<div class="prompt-card">
				<h3>Race Condition / Timing Bug</h3>
				<div class="prompt-meta">
					<span class="prompt-tag critical">Async</span>
					<span class="prompt-tag">Race Condition</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`I have a race condition or timing bug:

## Symptoms
- Fails: [X% of the time / under load / randomly]
- Behavior: [describe inconsistent behavior]
- Related to: [concurrent operations / async code / state updates]

## Code
\`\`\`[language]
[paste async/concurrent code]
\`\`\`

## Operations Involved
1. [Operation A - what it does]
2. [Operation B - what it does]
These can happen [simultaneously / in either order]

## What Should Happen
[describe correct ordering/behavior]

## Debug This
1. Identify the race condition
2. What operations are competing?
3. How to ensure correct ordering?
4. Provide fixed code with proper synchronization

Consider: locks, queues, state machines, or restructuring.`}</code></pre>
				</div>
			</div>

			<div class="prompt-card">
				<h3>Infinite Loop / Recursion</h3>
				<div class="prompt-meta">
					<span class="prompt-tag critical">Loop</span>
					<span class="prompt-tag">Hang</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`My code is stuck in an infinite loop or recursion:

## Symptoms
- Browser tab: [freezes / crashes]
- Console shows: [maximum call stack / no output]
- Happens when: [specific trigger]

## Suspicious Code
\`\`\`[language]
[paste loop or recursive function]
\`\`\`

## React Specific (if applicable)
\`\`\`tsx
// useEffect or component code
[paste the component]
\`\`\`

## Analyze
1. What condition should stop the loop/recursion?
2. Why is that condition never met?
3. Is there a dependency loop (useEffect deps)?
4. Fixed code with proper termination`}</code></pre>
				</div>
			</div>

			<div class="prompt-card">
				<h3>Unexpected Behavior (No Error)</h3>
				<div class="prompt-meta">
					<span class="prompt-tag">Logic Bug</span>
					<span class="prompt-tag">Silent Failure</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`This code runs without errors but produces wrong results:

## Code
\`\`\`[language]
[paste the code]
\`\`\`

## Input
\`\`\`
[example input data]
\`\`\`

## Expected Output
\`\`\`
[what I expect to get]
\`\`\`

## Actual Output
\`\`\`
[what I actually get]
\`\`\`

## My Debugging So Far
- I've checked: [list what you verified]
- I suspect: [your hypothesis if any]

## Analysis Needed
1. Walk through the code step by step with my input
2. Where does the logic diverge from expectation?
3. What's the bug?
4. Fixed code`}</code></pre>
				</div>
			</div>
		</section>

		<!-- Testing Section -->
		<section class="prompt-section">
			<h2 id="testing">Test Debugging Prompts</h2>

			<p>Prompts for fixing failing tests.</p>

			<div class="prompt-card">
				<h3>Failing Unit Test</h3>
				<div class="prompt-meta">
					<span class="prompt-tag">Unit Test</span>
					<span class="prompt-tag">Jest/Vitest</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Help me fix this failing test:

## Test Output
\`\`\`
[paste test failure output - expected vs received]
\`\`\`

## Test Code
\`\`\`typescript
[paste the failing test]
\`\`\`

## Implementation
\`\`\`typescript
[paste the code being tested]
\`\`\`

## Question
Is the test wrong or the implementation wrong?

## Provide
1. Which one is incorrect and why
2. The corrected code
3. If test was wrong: what was it actually testing vs. what it should test
4. If implementation was wrong: what was the bug`}</code></pre>
				</div>
			</div>

			<div class="prompt-card">
				<h3>Flaky Test</h3>
				<div class="prompt-meta">
					<span class="prompt-tag critical">Flaky</span>
					<span class="prompt-tag">Intermittent</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`This test passes sometimes and fails sometimes:

## Test
\`\`\`typescript
[paste the flaky test]
\`\`\`

## Pass Rate
Passes: [X%] of runs

## Failure Output (when it fails)
\`\`\`
[paste failure message]
\`\`\`

## Common Flakiness Causes to Check
- [ ] Timing/race conditions
- [ ] Order-dependent tests
- [ ] Shared state between tests
- [ ] External service dependencies
- [ ] Date/time dependent
- [ ] Random data without seeding

## Fix Requirements
1. Identify the source of flakiness
2. Make the test deterministic
3. No arbitrary sleeps/timeouts as solution
4. Provide stabilized test code`}</code></pre>
				</div>
			</div>

			<div class="prompt-card">
				<h3>Mock Not Working</h3>
				<div class="prompt-meta">
					<span class="prompt-tag">Mocking</span>
					<span class="prompt-tag">Jest</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`My mock isn't working as expected:

## Test with Mock
\`\`\`typescript
[paste test code with mock setup]
\`\`\`

## Module Being Mocked
\`\`\`typescript
[paste the actual module/function]
\`\`\`

## Problem
- Mock should return: [expected mock behavior]
- Actually does: [actual behavior - calling real implementation?]

## Mock Setup
- Using: [jest.mock / vi.mock / manual mock]
- Mock location: [same file / __mocks__ / etc.]

## Diagnose
1. Is the mock being applied correctly?
2. Is it a module/hoisting issue?
3. Is the import path correct?
4. Provide working mock setup`}</code></pre>
				</div>
			</div>
		</section>

		<!-- Systematic Debugging Section -->
		<section class="article-section">
			<h2>Systematic Debugging Process</h2>

			<p>When AI can't immediately solve your bug, follow this systematic approach:</p>

			<div class="usage-steps">
				<div class="step">
					<div class="step-number">1</div>
					<div class="step-content">
						<h4>Isolate the problem</h4>
						<p>Create the smallest code sample that reproduces the bug. Remove unrelated code until only the bug remains.</p>
					</div>
				</div>
				<div class="step">
					<div class="step-number">2</div>
					<div class="step-content">
						<h4>Add logging</h4>
						<p>Ask AI: "Add console.log statements to trace the data flow through this function." Follow the data to find where it goes wrong.</p>
					</div>
				</div>
				<div class="step">
					<div class="step-number">3</div>
					<div class="step-content">
						<h4>Test assumptions</h4>
						<p>Ask AI: "What assumptions does this code make? How can I verify each one?" Often bugs are broken assumptions.</p>
					</div>
				</div>
				<div class="step">
					<div class="step-number">4</div>
					<div class="step-content">
						<h4>Binary search</h4>
						<p>If you know it worked before, use git bisect or ask AI to help identify what change introduced the bug.</p>
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
			<h2>Related Content</h2>
			<div class="related-grid">
				<a href="/kb/prompts/ai-coding-prompts/" class="card card-interactive related-card">
					<div class="related-card-category">Prompt Library</div>
					<div class="related-card-title">AI Coding Prompts</div>
					<p class="related-card-description">50+ general coding prompts</p>
				</a>
				<a href="/kb/prompts/security-prompts/" class="card card-interactive related-card">
					<div class="related-card-category">Prompt Library</div>
					<div class="related-card-title">Security Prompts</div>
					<p class="related-card-description">Security-focused code generation</p>
				</a>
				<a href="/kb/prompts/prompt-engineering-code/" class="card card-interactive related-card">
					<div class="related-card-category">Pillar Guide</div>
					<div class="related-card-title">Prompt Engineering for Code</div>
					<p class="related-card-description">Master prompting techniques</p>
				</a>
				<a href="/kb/vibe-coding-tools/cursor/" class="card card-interactive related-card">
					<div class="related-card-category">Tool</div>
					<div class="related-card-title">Cursor AI Guide</div>
					<p class="related-card-description">Debug faster with Cursor</p>
				</a>
				<a href="/kb/vibe-coding-tools/claude-code/" class="card card-interactive related-card">
					<div class="related-card-category">Tool</div>
					<div class="related-card-title">Claude Code</div>
					<p class="related-card-description">Terminal debugging with Claude</p>
				</a>
				<a href="/kb/prompts/best-ai-coding-tools-2025/" class="card card-interactive related-card">
					<div class="related-card-category">Comparison</div>
					<div class="related-card-title">Best AI Coding Tools 2025</div>
					<p class="related-card-description">Find the right debugging assistant</p>
				</a>
			</div>
		</section>
	</article>
</div>

<style>
	.intro {
		font-size: 1.125rem;
		color: var(--text-secondary);
		margin-bottom: 2rem;
		line-height: 1.7;
	}

	.badge-debug {
		background: linear-gradient(135deg, var(--orange), var(--red));
		color: white;
		font-weight: 600;
	}

	.stats-row {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.stat-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-radius: 8px;
		padding: 1.25rem;
		text-align: center;
	}

	.stat-number {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--green);
	}

	.stat-label {
		font-size: 0.875rem;
		color: var(--text-secondary);
		margin-top: 0.25rem;
	}

	/* Categories Grid */
	.categories-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
		margin: 1.5rem 0 2rem;
	}

	.category-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-radius: 8px;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.category-icon {
		font-size: 1.5rem;
	}

	.category-name {
		font-weight: 600;
		font-size: 0.9rem;
	}

	.category-count {
		font-size: 0.75rem;
		color: var(--text-tertiary);
	}

	/* Prompt Sections */
	.prompt-section {
		margin: 3rem 0;
	}

	.prompt-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-radius: 8px;
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.prompt-card h3 {
		margin: 0 0 0.75rem;
		font-size: 1.1rem;
	}

	.prompt-meta {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1rem;
		flex-wrap: wrap;
	}

	.prompt-tag {
		font-size: 0.7rem;
		padding: 0.25rem 0.5rem;
		background: var(--bg-tertiary);
		border-radius: 4px;
		color: var(--text-secondary);
	}

	.prompt-tag.urgent {
		background: rgba(249, 115, 22, 0.1);
		color: var(--orange);
		border: 1px solid var(--orange);
	}

	.prompt-tag.critical {
		background: rgba(239, 68, 68, 0.1);
		color: var(--red);
		border: 1px solid var(--red);
	}

	/* Usage Steps */
	.usage-steps {
		display: grid;
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.step {
		display: flex;
		gap: 1rem;
		align-items: flex-start;
	}

	.step-number {
		width: 32px;
		height: 32px;
		background: var(--orange);
		color: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		flex-shrink: 0;
	}

	.step-content h4 {
		margin: 0 0 0.25rem;
	}

	.step-content p {
		margin: 0;
		color: var(--text-secondary);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.stats-row {
			grid-template-columns: repeat(2, 1fr);
		}

		.categories-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 480px) {
		.categories-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
