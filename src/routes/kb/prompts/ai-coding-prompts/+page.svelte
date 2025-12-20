<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'AI Coding Prompts: 50+ Copy-Paste Templates for Developers',
		description: 'Production-ready AI coding prompts for Claude, ChatGPT, and Cursor. Copy-paste templates for features, refactoring, testing, documentation, and debugging.',
		url: '/kb/prompts/ai-coding-prompts/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Prompts', href: '/kb/prompts' },
		{ label: 'AI Coding Prompts' }
	];

	// FAQ data
	const faqs = [
		{
			question: 'What makes a good AI coding prompt?',
			answer: 'Good AI coding prompts have four elements: (1) Clear context about your codebase, (2) Specific task description, (3) Constraints and requirements, (4) Expected output format. Vague prompts get vague results. The templates in this guide include all four elements.'
		},
		{
			question: 'Should I use different prompts for Claude vs ChatGPT?',
			answer: 'The core prompts work across models, but Claude handles longer context and structured outputs better, while ChatGPT excels at creative solutions. Claude prefers XML tags for structure. ChatGPT responds well to role-playing ("Act as a senior developer"). Adjust based on results.'
		},
		{
			question: 'How do I get AI to follow my coding standards?',
			answer: 'Include your standards directly in the prompt or reference a style guide. Show examples of your preferred patterns. For Cursor, use .cursorrules to enforce standards automatically. For Claude Code, use CLAUDE.md. The prompt templates include placeholders for your conventions.'
		},
		{
			question: 'Why does AI sometimes ignore my prompt instructions?',
			answer: 'Three common causes: (1) Prompt is too long - models lose focus after ~2000 words, (2) Conflicting instructions - simplify and prioritize, (3) Asking for too much at once - break into smaller prompts. Use the focused templates in this guide to avoid these issues.'
		},
		{
			question: 'How do I prompt AI to write secure code?',
			answer: 'Explicitly state security requirements: "Use parameterized queries, validate all inputs, never hardcode secrets." Include security constraints in every prompt. Better yet, use our security-prompts library which has pre-built security-focused templates.'
		},
		{
			question: 'Can I chain multiple AI prompts together?',
			answer: 'Yes, prompt chaining is powerful for complex tasks. Example flow: (1) Analyze existing code, (2) Plan the changes, (3) Implement changes, (4) Write tests, (5) Review for issues. Each prompt builds on the previous output. The templates include chaining suggestions.'
		}
	];

	// Prompt categories
	const categories = [
		{ name: 'Feature Development', count: 12, icon: '🚀' },
		{ name: 'Refactoring', count: 8, icon: '🔧' },
		{ name: 'Testing', count: 8, icon: '🧪' },
		{ name: 'Documentation', count: 6, icon: '📝' },
		{ name: 'Code Review', count: 6, icon: '👀' },
		{ name: 'Debugging', count: 6, icon: '🐛' },
		{ name: 'Performance', count: 4, icon: '⚡' }
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
				<strong>AI coding prompts</strong> work best when they include context, specific requirements, and output format. This library contains 50+ battle-tested prompts for feature development, refactoring, testing, and more - ready to copy into Claude, ChatGPT, or Cursor.
			</p>
		</div>

		<!-- Badge -->
		<span class="badge badge-library">Prompt Library</span>

		<h1>AI Coding Prompts: 50+ Copy-Paste Templates for Developers</h1>

		<p class="intro">
			Stop writing prompts from scratch. This library contains production-ready AI coding prompts organized by task type. Each template includes context placeholders, clear instructions, and output format specifications. Copy, customize with your details, and get better results immediately.
		</p>

		<!-- Stats Row -->
		<div class="stats-row">
			<div class="stat-card">
				<div class="stat-number">50+</div>
				<div class="stat-label">Prompts</div>
			</div>
			<div class="stat-card">
				<div class="stat-number">7</div>
				<div class="stat-label">Categories</div>
			</div>
			<div class="stat-card">
				<div class="stat-number">100%</div>
				<div class="stat-label">Copy-Paste Ready</div>
			</div>
			<div class="stat-card">
				<div class="stat-number">All</div>
				<div class="stat-label">AI Models</div>
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

		<!-- Feature Development Section -->
		<section class="prompt-section">
			<h2 id="feature-development">Feature Development Prompts</h2>

			<p>Prompts for building new features from scratch or extending existing functionality.</p>

			<div class="prompt-card">
				<h3>New Feature Implementation</h3>
				<div class="prompt-meta">
					<span class="prompt-tag">Foundation</span>
					<span class="prompt-tag">Any Stack</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`I need to implement [FEATURE_NAME] in my [FRAMEWORK] application.

## Current Setup
- Framework: [Next.js 15 / React / SvelteKit / etc.]
- Language: [TypeScript / JavaScript]
- Database: [Supabase / Prisma / MongoDB / etc.]
- Relevant files: [list key files]

## Feature Requirements
[Describe what the feature should do in 2-3 sentences]

## Acceptance Criteria
1. [Specific requirement 1]
2. [Specific requirement 2]
3. [Specific requirement 3]

## Constraints
- Must follow existing code patterns in the project
- Must include proper error handling
- Must validate user input
- No hardcoded secrets or API keys

## Expected Output
Provide the implementation with:
1. File path for each code block
2. Complete, runnable code (not snippets)
3. Brief explanation of key decisions`}</code></pre>
				</div>
			</div>

			<div class="prompt-card">
				<h3>API Endpoint Creation</h3>
				<div class="prompt-meta">
					<span class="prompt-tag">Backend</span>
					<span class="prompt-tag">REST/GraphQL</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Create a [REST/GraphQL] API endpoint for [RESOURCE_NAME].

## Endpoint Details
- Method: [GET/POST/PATCH/DELETE]
- Path: /api/[path]
- Authentication: [Required/Optional/None]

## Request
- Body/Params: [describe expected input]
- Validation rules: [list validation requirements]

## Response
- Success: [describe success response shape]
- Errors: [list error cases and response codes]

## Security Requirements
- Validate all input with Zod
- Check authentication before processing
- Use parameterized queries (no SQL injection)
- Rate limit: [X requests per minute]

## Framework
[Next.js App Router / Express / FastAPI / etc.]

Provide complete implementation with error handling and types.`}</code></pre>
				</div>
			</div>

			<div class="prompt-card">
				<h3>React Component with State</h3>
				<div class="prompt-meta">
					<span class="prompt-tag">Frontend</span>
					<span class="prompt-tag">React</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Create a React component for [COMPONENT_PURPOSE].

## Component Requirements
- Name: [ComponentName]
- Props: [list props with types]
- State: [list state variables needed]
- Events: [list events to handle]

## Behavior
[Describe how the component should behave]

## Styling
- Use [Tailwind CSS / CSS Modules / styled-components]
- Follow existing design system patterns
- Must be responsive

## Code Standards
- TypeScript with strict types
- Props interface exported
- Use functional component with hooks
- Accessible (proper ARIA labels, keyboard navigation)

## Output Format
Provide:
1. Component file with full implementation
2. Types/interfaces
3. Usage example`}</code></pre>
				</div>
			</div>

			<div class="prompt-card">
				<h3>Form with Validation</h3>
				<div class="prompt-meta">
					<span class="prompt-tag">Frontend</span>
					<span class="prompt-tag">Forms</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Create a form for [FORM_PURPOSE] with client and server validation.

## Form Fields
| Field | Type | Validation |
|-------|------|------------|
| [field1] | [text/email/number] | [required, min length, etc.] |
| [field2] | [select/checkbox] | [validation rules] |

## Behavior
- Show inline validation errors
- Disable submit while processing
- Show success/error toast on completion
- Clear form on success (optional)

## Tech Stack
- Framework: [Next.js / React / SvelteKit]
- Validation: [Zod / React Hook Form / native]
- Form library: [React Hook Form / native / etc.]

## Security
- Validate on client AND server
- CSRF protection if needed
- Sanitize inputs before database

Provide complete form component with validation schema.`}</code></pre>
				</div>
			</div>

			<div class="prompt-card">
				<h3>Database Schema Design</h3>
				<div class="prompt-meta">
					<span class="prompt-tag">Backend</span>
					<span class="prompt-tag">Database</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Design a database schema for [FEATURE/DOMAIN].

## Requirements
[Describe what data needs to be stored and relationships]

## Entities
1. [Entity1]: [brief description]
2. [Entity2]: [brief description]

## Relationships
- [Entity1] has many [Entity2]
- [etc.]

## Constraints
- Soft deletes required: [yes/no]
- Audit fields (created_at, updated_at): [yes/no]
- Multi-tenant: [yes/no]

## ORM/Database
- [Prisma / Drizzle / raw SQL]
- Database: [PostgreSQL / MySQL / MongoDB]

## Output
Provide:
1. Schema definition in [Prisma schema / SQL / etc.]
2. Indexes for common queries
3. Migration file if applicable`}</code></pre>
				</div>
			</div>
		</section>

		<!-- Refactoring Section -->
		<section class="prompt-section">
			<h2 id="refactoring">Refactoring Prompts</h2>

			<p>Prompts for improving existing code without changing functionality.</p>

			<div class="prompt-card">
				<h3>Extract Reusable Function</h3>
				<div class="prompt-meta">
					<span class="prompt-tag">DRY</span>
					<span class="prompt-tag">Any Language</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Refactor this code to extract reusable functions:

\`\`\`[language]
[paste your code here]
\`\`\`

## Goals
- Identify repeated patterns
- Extract into well-named functions
- Maintain exact same behavior
- Improve readability

## Constraints
- Keep functions small (under 20 lines)
- Use descriptive names that explain purpose
- Add JSDoc/docstring comments
- Preserve all error handling

## Output
1. Refactored code with extracted functions
2. Brief explanation of what was extracted and why`}</code></pre>
				</div>
			</div>

			<div class="prompt-card">
				<h3>Improve Code Readability</h3>
				<div class="prompt-meta">
					<span class="prompt-tag">Clean Code</span>
					<span class="prompt-tag">Maintainability</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Improve the readability of this code without changing functionality:

\`\`\`[language]
[paste your code here]
\`\`\`

## Focus Areas
- Variable and function naming
- Code structure and flow
- Comment where logic is complex
- Remove unnecessary complexity
- Use early returns to reduce nesting

## Style Guide
[Link to your style guide or describe preferences]

## Constraints
- Must maintain exact same behavior
- Must pass existing tests
- No new dependencies

Show before/after for each change with explanation.`}</code></pre>
				</div>
			</div>

			<div class="prompt-card">
				<h3>Convert to TypeScript</h3>
				<div class="prompt-meta">
					<span class="prompt-tag">TypeScript</span>
					<span class="prompt-tag">Migration</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Convert this JavaScript code to TypeScript with strict types:

\`\`\`javascript
[paste your JavaScript code here]
\`\`\`

## Requirements
- Add proper types for all variables and functions
- Create interfaces for object shapes
- Use strict mode compatible types
- No 'any' types - use 'unknown' and type guards if needed
- Export types that might be reused

## Output
1. TypeScript code with full type annotations
2. Separate types/interfaces file if complex
3. Note any type decisions that need review`}</code></pre>
				</div>
			</div>

			<div class="prompt-card">
				<h3>Modernize Legacy Code</h3>
				<div class="prompt-meta">
					<span class="prompt-tag">Modernization</span>
					<span class="prompt-tag">Best Practices</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Modernize this code using current best practices:

\`\`\`[language]
[paste legacy code here]
\`\`\`

## Current Version
- Language/Runtime: [Node 20 / Python 3.12 / etc.]
- Framework: [if applicable]

## Modernization Goals
- Use modern syntax (async/await, optional chaining, etc.)
- Replace deprecated APIs
- Improve error handling
- Add proper typing if applicable

## Constraints
- Maintain backward compatibility with: [list any constraints]
- Must work with: [list dependencies/systems]

Provide modernized code with comments explaining major changes.`}</code></pre>
				</div>
			</div>
		</section>

		<!-- Testing Section -->
		<section class="prompt-section">
			<h2 id="testing">Testing Prompts</h2>

			<p>Prompts for writing comprehensive tests. See also: <a href="/kb/prompts/testing-prompts/">Testing Prompts Library</a></p>

			<div class="prompt-card">
				<h3>Unit Tests for Function</h3>
				<div class="prompt-meta">
					<span class="prompt-tag">Unit Testing</span>
					<span class="prompt-tag">Jest/Vitest</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Write comprehensive unit tests for this function:

\`\`\`[language]
[paste function code here]
\`\`\`

## Test Framework
[Jest / Vitest / pytest / etc.]

## Test Coverage Requirements
- Happy path (normal inputs)
- Edge cases (empty, null, undefined)
- Error cases (invalid inputs)
- Boundary conditions

## Mocking
- External dependencies to mock: [list them]
- Database calls: [mock/use test DB]

## Output Format
\`\`\`typescript
describe('[FunctionName]', () => {
  describe('when [scenario]', () => {
    it('should [expected behavior]', () => {
      // Arrange, Act, Assert
    })
  })
})
\`\`\``}</code></pre>
				</div>
			</div>

			<div class="prompt-card">
				<h3>Integration Test for API</h3>
				<div class="prompt-meta">
					<span class="prompt-tag">Integration</span>
					<span class="prompt-tag">API Testing</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Write integration tests for this API endpoint:

## Endpoint
- Method: [GET/POST/etc.]
- Path: [/api/...]
- Auth: [required/optional]

## Code
\`\`\`[language]
[paste endpoint code here]
\`\`\`

## Test Cases
1. Successful request with valid data
2. Authentication failure (401)
3. Validation errors (400)
4. Not found cases (404)
5. Server errors (500)

## Test Framework
[Supertest / httpx / etc.]

## Database
- Use test database or mock
- Clean up after tests

Provide complete test file with setup and teardown.`}</code></pre>
				</div>
			</div>

			<div class="prompt-card">
				<h3>E2E Test for User Flow</h3>
				<div class="prompt-meta">
					<span class="prompt-tag">E2E</span>
					<span class="prompt-tag">Playwright</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Write E2E tests for this user flow:

## User Flow
1. [Step 1: User action]
2. [Step 2: Expected result]
3. [Step 3: Next action]
...

## Test Framework
[Playwright / Cypress]

## Page Elements
- Login form: [selectors if known]
- Key buttons: [selectors]

## Test Scenarios
- Happy path (complete flow)
- Error handling (invalid inputs)
- Edge cases (network errors, timeouts)

## Best Practices
- Use page object pattern
- Wait for elements properly (no arbitrary sleeps)
- Clean test data after each test

Provide complete test file with page objects if complex.`}</code></pre>
				</div>
			</div>
		</section>

		<!-- Documentation Section -->
		<section class="prompt-section">
			<h2 id="documentation">Documentation Prompts</h2>

			<p>Prompts for generating documentation, comments, and README files.</p>

			<div class="prompt-card">
				<h3>Function Documentation</h3>
				<div class="prompt-meta">
					<span class="prompt-tag">JSDoc/Docstring</span>
					<span class="prompt-tag">API Docs</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Add comprehensive documentation to this code:

\`\`\`[language]
[paste code here]
\`\`\`

## Documentation Style
[JSDoc / TSDoc / Python docstrings / etc.]

## Include
- Function/method description
- Parameter descriptions with types
- Return value description
- Throws/raises documentation
- Example usage
- Edge cases or gotchas

## Output
Code with inline documentation added.`}</code></pre>
				</div>
			</div>

			<div class="prompt-card">
				<h3>README Generator</h3>
				<div class="prompt-meta">
					<span class="prompt-tag">README</span>
					<span class="prompt-tag">Project Docs</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Generate a README.md for this project:

## Project Info
- Name: [project name]
- Purpose: [one sentence description]
- Tech Stack: [list technologies]

## Key Features
1. [Feature 1]
2. [Feature 2]
3. [Feature 3]

## Include Sections
- Project description
- Installation instructions
- Environment variables needed
- Usage examples
- API documentation (if applicable)
- Contributing guidelines
- License

## Tone
[Professional / Casual / Technical]

Generate complete README in markdown format.`}</code></pre>
				</div>
			</div>

			<div class="prompt-card">
				<h3>API Documentation</h3>
				<div class="prompt-meta">
					<span class="prompt-tag">API Docs</span>
					<span class="prompt-tag">OpenAPI</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Generate API documentation for these endpoints:

\`\`\`[language]
[paste API route code here]
\`\`\`

## Format
[OpenAPI/Swagger / Markdown / etc.]

## Include
- Endpoint path and method
- Request parameters/body with types
- Response schemas for success and errors
- Authentication requirements
- Example requests and responses
- Rate limiting info

## Output
Complete API documentation in specified format.`}</code></pre>
				</div>
			</div>
		</section>

		<!-- Code Review Section -->
		<section class="prompt-section">
			<h2 id="code-review">Code Review Prompts</h2>

			<p>Prompts for reviewing code quality, security, and best practices.</p>

			<div class="prompt-card">
				<h3>Security Review</h3>
				<div class="prompt-meta">
					<span class="prompt-tag">Security</span>
					<span class="prompt-tag">Critical</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Review this code for security vulnerabilities:

\`\`\`[language]
[paste code here]
\`\`\`

## Check For
- SQL/NoSQL injection
- XSS vulnerabilities
- Missing authentication/authorization
- Hardcoded secrets
- Input validation issues
- CSRF vulnerabilities
- Insecure direct object references
- Path traversal
- Command injection

## Output Format
For each issue found:
1. Severity (Critical/High/Medium/Low)
2. Location (line number)
3. Description of vulnerability
4. Recommended fix with code example

Also note: "No issues found" for categories that pass.`}</code></pre>
				</div>
			</div>

			<div class="prompt-card">
				<h3>Performance Review</h3>
				<div class="prompt-meta">
					<span class="prompt-tag">Performance</span>
					<span class="prompt-tag">Optimization</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Review this code for performance issues:

\`\`\`[language]
[paste code here]
\`\`\`

## Context
- Expected load: [requests per second / data volume]
- Current issues: [if any known]

## Check For
- N+1 queries
- Missing indexes
- Unnecessary re-renders (React)
- Memory leaks
- Inefficient algorithms
- Missing caching opportunities
- Blocking operations
- Large bundle sizes

## Output
For each issue:
1. Impact (High/Medium/Low)
2. Location and description
3. Recommended optimization with code`}</code></pre>
				</div>
			</div>

			<div class="prompt-card">
				<h3>General Code Review</h3>
				<div class="prompt-meta">
					<span class="prompt-tag">Quality</span>
					<span class="prompt-tag">Best Practices</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Review this code as a senior developer would:

\`\`\`[language]
[paste code here]
\`\`\`

## Review Areas
- Code correctness
- Error handling
- Edge cases
- Naming and readability
- DRY violations
- SOLID principles
- Testing considerations
- Documentation needs

## Style Guide
[Link or describe your conventions]

## Output
Structured review with:
1. Summary (approve / request changes)
2. Critical issues (must fix)
3. Suggestions (nice to have)
4. Positive observations (what's done well)`}</code></pre>
				</div>
			</div>
		</section>

		<!-- Debugging Section -->
		<section class="prompt-section">
			<h2 id="debugging">Debugging Prompts</h2>

			<p>Prompts for diagnosing and fixing bugs. See also: <a href="/kb/prompts/debugging-prompts/">Debugging Prompts Library</a></p>

			<div class="prompt-card">
				<h3>Debug Error Message</h3>
				<div class="prompt-meta">
					<span class="prompt-tag">Error Analysis</span>
					<span class="prompt-tag">Quick Fix</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Help me debug this error:

## Error Message
\`\`\`
[paste full error message and stack trace]
\`\`\`

## Code That Caused It
\`\`\`[language]
[paste relevant code]
\`\`\`

## Context
- When it happens: [always / sometimes / specific conditions]
- Recent changes: [what changed before error started]
- Environment: [dev / prod / specific browser]

## What I've Tried
1. [attempt 1]
2. [attempt 2]

Explain the root cause and provide a fix.`}</code></pre>
				</div>
			</div>

			<div class="prompt-card">
				<h3>Fix Failing Test</h3>
				<div class="prompt-meta">
					<span class="prompt-tag">Testing</span>
					<span class="prompt-tag">Debug</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Help me fix this failing test:

## Test Code
\`\`\`[language]
[paste test code]
\`\`\`

## Code Being Tested
\`\`\`[language]
[paste implementation code]
\`\`\`

## Test Output
\`\`\`
[paste test failure output]
\`\`\`

## Question
Is the test wrong or the implementation wrong?
Provide the fix for whichever needs to change.`}</code></pre>
				</div>
			</div>
		</section>

		<!-- Performance Section -->
		<section class="prompt-section">
			<h2 id="performance">Performance Prompts</h2>

			<p>Prompts for optimizing code performance.</p>

			<div class="prompt-card">
				<h3>Optimize Database Query</h3>
				<div class="prompt-meta">
					<span class="prompt-tag">Database</span>
					<span class="prompt-tag">SQL</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Optimize this database query:

## Current Query
\`\`\`sql
[paste query or ORM code]
\`\`\`

## Schema (relevant tables)
\`\`\`sql
[paste table definitions]
\`\`\`

## Current Performance
- Execution time: [X ms]
- Rows scanned: [if known]

## Expected Load
- Frequency: [X queries per second]
- Data size: [X rows in table]

## Provide
1. Optimized query
2. Suggested indexes
3. Explanation of improvements`}</code></pre>
				</div>
			</div>

			<div class="prompt-card">
				<h3>Reduce Bundle Size</h3>
				<div class="prompt-meta">
					<span class="prompt-tag">Frontend</span>
					<span class="prompt-tag">Build</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Help reduce the bundle size of this component/page:

## Code
\`\`\`[language]
[paste component code]
\`\`\`

## Current Bundle Analysis
[paste output from bundle analyzer if available]

## Framework
[Next.js / Vite / webpack]

## Optimization Goals
- Current size: [X KB]
- Target size: [Y KB]

## Provide
1. Code changes for smaller bundle
2. Dynamic import opportunities
3. Dependencies to replace or remove
4. Tree-shaking improvements`}</code></pre>
				</div>
			</div>
		</section>

		<!-- How to Use Section -->
		<section class="article-section">
			<h2>How to Use These Prompts</h2>

			<div class="usage-steps">
				<div class="step">
					<div class="step-number">1</div>
					<div class="step-content">
						<h4>Copy the template</h4>
						<p>Find the prompt that matches your task and copy it to your clipboard.</p>
					</div>
				</div>
				<div class="step">
					<div class="step-number">2</div>
					<div class="step-content">
						<h4>Fill in the brackets</h4>
						<p>Replace all [PLACEHOLDER] text with your specific details. Include actual code, file paths, and requirements.</p>
					</div>
				</div>
				<div class="step">
					<div class="step-number">3</div>
					<div class="step-content">
						<h4>Add context</h4>
						<p>If your codebase has specific patterns or constraints, mention them. More context = better results.</p>
					</div>
				</div>
				<div class="step">
					<div class="step-number">4</div>
					<div class="step-content">
						<h4>Iterate as needed</h4>
						<p>If the output isn't right, ask for specific changes rather than starting over. Chain prompts for complex tasks.</p>
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
				<a href="/kb/prompts/security-prompts/" class="card card-interactive related-card">
					<div class="related-card-category">Prompt Library</div>
					<div class="related-card-title">Security Prompts</div>
					<p class="related-card-description">Prompts for secure code generation</p>
				</a>
				<a href="/kb/prompts/debugging-prompts/" class="card card-interactive related-card">
					<div class="related-card-category">Prompt Library</div>
					<div class="related-card-title">Debugging Prompts</div>
					<p class="related-card-description">Advanced debugging templates</p>
				</a>
				<a href="/kb/prompts/prompt-engineering-code/" class="card card-interactive related-card">
					<div class="related-card-category">Pillar Guide</div>
					<div class="related-card-title">Prompt Engineering for Code</div>
					<p class="related-card-description">Master the techniques behind great prompts</p>
				</a>
				<a href="/kb/prompts/cursor-rules/" class="card card-interactive related-card">
					<div class="related-card-category">Guide</div>
					<div class="related-card-title">Cursor Rules</div>
					<p class="related-card-description">Automate prompts with .cursorrules</p>
				</a>
				<a href="/kb/vibe-coding-tools/cursor/" class="card card-interactive related-card">
					<div class="related-card-category">Tool</div>
					<div class="related-card-title">Cursor AI Guide</div>
					<p class="related-card-description">Get the most from Cursor</p>
				</a>
				<a href="/kb/prompts/best-ai-coding-tools-2025/" class="card card-interactive related-card">
					<div class="related-card-category">Comparison</div>
					<div class="related-card-title">Best AI Coding Tools 2025</div>
					<p class="related-card-description">Find the right tool for your workflow</p>
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

	.badge-library {
		background: linear-gradient(135deg, var(--violet), var(--pink));
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
		grid-template-columns: repeat(4, 1fr);
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
	}

	.prompt-tag {
		font-size: 0.7rem;
		padding: 0.25rem 0.5rem;
		background: var(--bg-tertiary);
		border-radius: 4px;
		color: var(--text-secondary);
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
		background: var(--green);
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
