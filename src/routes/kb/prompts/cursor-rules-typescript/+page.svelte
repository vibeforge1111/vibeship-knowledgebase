<script lang="ts">
	import { Header } from '$lib/components/layout';

	const meta = {
		title: 'Cursor Rules for TypeScript: Strict Mode & Best Practices',
		description: 'Copy-paste cursor rules for TypeScript projects. Strict mode, Zod validation, generics, and type-safe patterns for vibe coders.',
		url: '/kb/prompts/cursor-rules-typescript/'
	};

	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Prompts', href: '/kb/prompts' },
		{ label: 'Cursor Rules TypeScript' }
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
			question: 'What TypeScript rules matter most for cursor?',
			answer: 'Three rules prevent 80% of type issues: strict mode always on, explicit return types on functions, and no "any" ever. These catch bugs at compile time instead of runtime. Vibe coded projects without these rules ship type errors to production.'
		},
		{
			question: 'How do I stop Cursor from using "any"?',
			answer: 'Add explicit rules: "Never use any. Use unknown and narrow with type guards." Include examples of the pattern. Without examples, AI sometimes uses "as unknown as SomeType" which is just hidden any. Show the proper narrowing pattern.'
		},
		{
			question: 'Should I use interface or type?',
			answer: 'Interface for object shapes, type for everything else (unions, intersections, primitives). Interfaces merge declarations automatically, which can cause subtle bugs. Types are more explicit. The rules should specify when to use each.'
		},
		{
			question: 'How do I handle API response types?',
			answer: 'Use Zod for runtime validation combined with inferred types. API responses are external data - they need validation, not just type assertions. The cursor rules should enforce Zod.parse() or similar for all external data.'
		},
		{
			question: 'Is strict mode necessary?',
			answer: 'Yes. Without strict mode, TypeScript allows nulls everywhere, implicit any, and other unsafe patterns. The whole point of TypeScript is catching errors early. Non-strict mode defeats the purpose. Always enable strict in tsconfig.json.'
		}
	];

	const ruleSections = [
		{ name: 'Strict Mode', description: 'Compiler configuration' },
		{ name: 'Type Patterns', description: 'Interface vs type' },
		{ name: 'Generics', description: 'Reusable type patterns' },
		{ name: 'Validation', description: 'Zod and runtime checks' },
		{ name: 'Error Handling', description: 'Result types, narrowing' },
		{ name: 'API Types', description: 'Request/response typing' }
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
				<strong>TypeScript cursor rules</strong> should enforce strict mode, ban "any", require explicit return types, and use Zod for validation. Without these rules, AI generates code that compiles but fails at runtime. Copy the template below for type-safe vibe coding.
			</p>
		</div>

		<span class="badge badge-info">TypeScript</span>

		<h1>Cursor Rules for TypeScript: Type-Safe Development</h1>

		<p class="intro">
			TypeScript without strict rules is just JavaScript with extra steps. AI tools love to use "any" when types get tricky, skip return types "for brevity," and assert types instead of validating them. Vibe coders who want the actual benefits of TypeScript - catching bugs before runtime - need cursor rules that enforce type safety.
		</p>

		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">6</div>
				<div class="stat-label">Rule Sections</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Strict</div>
				<div class="stat-label">Mode</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Zero</div>
				<div class="stat-label">Any Types</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Zod</div>
				<div class="stat-label">Validated</div>
			</div>
		</div>

		<div class="sections-grid">
			{#each ruleSections as section}
				<div class="card section-card">
					<div class="section-name">{section.name}</div>
					<div class="section-desc">{section.description}</div>
				</div>
			{/each}
		</div>

		<!-- Complete Template Section -->
		<section class="article-section">
			<h2 id="template">Complete .cursorrules Template</h2>

			<p>Copy this into your project root as <code>.cursorrules</code>. These rules ensure AI generates properly typed code that catches errors at compile time, not in production.</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">.cursorrules</span>
					<button class="copy-btn" class:copied={copiedId === 'complete-template'} onclick={() => copyCode('complete-template')}>
						{copiedId === 'complete-template' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="complete-template">{`# TypeScript Cursor Rules

## Project Context

This is a TypeScript project with strict type checking.

### tsconfig.json Requirements
\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "exactOptionalPropertyTypes": true
  }
}
\`\`\`

## Type Rules

### Always
- Explicit return types on all functions
- Interface for object shapes
- Type for unions, intersections, and primitives
- Const assertions for literal types
- Exhaustive switch statements with never

### Never
- The "any" type (use "unknown" instead)
- Type assertions (use type guards)
- Non-null assertions "!" (use proper narrowing)
- "as" casts except for const assertions
- @ts-ignore or @ts-expect-error without explanation

## Patterns

### Function Signatures
\`\`\`typescript
// ✅ Correct - explicit return type
function getUser(id: string): User | null {
  return users.find(u => u.id === id) ?? null;
}

// ✅ Correct - async function
async function fetchUser(id: string): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);
  return response.json();
}

// ❌ Wrong - no return type
function getUser(id: string) {
  return users.find(u => u.id === id);
}
\`\`\`

### Interface vs Type
\`\`\`typescript
// ✅ Interface for object shapes
interface User {
  id: string;
  name: string;
  email: string;
}

// ✅ Type for unions
type Status = 'pending' | 'active' | 'suspended';

// ✅ Type for intersections
type AdminUser = User & { permissions: string[] };

// ✅ Type for function signatures
type UserFormatter = (user: User) => string;

// ❌ Wrong - interface for union (won't work)
// interface Status = 'pending' | 'active';
\`\`\`

### Avoiding "any"
\`\`\`typescript
// ✅ Correct - use unknown and narrow
function processValue(value: unknown): string {
  if (typeof value === 'string') {
    return value.toUpperCase();
  }
  if (typeof value === 'number') {
    return value.toString();
  }
  throw new Error('Unexpected value type');
}

// ✅ Correct - type guard for objects
function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value &&
    'email' in value
  );
}

// ❌ Wrong - using any
function processValue(value: any): string {
  return value.toUpperCase(); // Runtime error if not string
}
\`\`\`

## Generics

### When to Use
- Reusable functions that work with multiple types
- Container types (arrays, maps, promises)
- Factory functions
- Higher-order functions

### Patterns
\`\`\`typescript
// ✅ Generic function with constraint
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// ✅ Generic with default
interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  timestamp: Date;
}

// ✅ Generic conditional
type Nullable<T> = T | null;
type NonNullableFields<T> = {
  [K in keyof T]: NonNullable<T[K]>;
};

// ✅ Generic class
class Result<T, E = Error> {
  private constructor(
    private readonly value: T | null,
    private readonly error: E | null
  ) {}

  static ok<T>(value: T): Result<T, never> {
    return new Result(value, null);
  }

  static err<E>(error: E): Result<never, E> {
    return new Result(null, error);
  }

  isOk(): this is Result<T, never> {
    return this.error === null;
  }
}
\`\`\`

## Validation with Zod

### External Data
- All API responses must be validated
- User input must be validated
- Environment variables must be validated
- Never trust external data

### Patterns
\`\`\`typescript
import { z } from 'zod';

// ✅ Schema definition
const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  email: z.string().email(),
  role: z.enum(['admin', 'user', 'guest']),
  createdAt: z.coerce.date(),
});

// ✅ Infer type from schema
type User = z.infer<typeof UserSchema>;

// ✅ Validate API response
async function fetchUser(id: string): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);
  const data = await response.json();
  return UserSchema.parse(data); // Throws if invalid
}

// ✅ Safe parse for user input
function validateInput(input: unknown): User | null {
  const result = UserSchema.safeParse(input);
  if (result.success) {
    return result.data;
  }
  console.error('Validation failed:', result.error);
  return null;
}

// ✅ Environment validation
const EnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  API_KEY: z.string().min(32),
  NODE_ENV: z.enum(['development', 'production', 'test']),
});

const env = EnvSchema.parse(process.env);
\`\`\`

## Error Handling

### Result Pattern
\`\`\`typescript
// ✅ Type-safe error handling
type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

async function fetchUser(id: string): Promise<Result<User>> {
  try {
    const response = await fetch(\`/api/users/\${id}\`);
    if (!response.ok) {
      return { success: false, error: new Error('User not found') };
    }
    const data = UserSchema.parse(await response.json());
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error as Error };
  }
}

// ✅ Using the result
const result = await fetchUser('123');
if (result.success) {
  console.log(result.data.name); // TypeScript knows data exists
} else {
  console.error(result.error.message); // TypeScript knows error exists
}
\`\`\`

### Never Type for Exhaustive Checks
\`\`\`typescript
type Status = 'pending' | 'active' | 'cancelled';

function handleStatus(status: Status): string {
  switch (status) {
    case 'pending':
      return 'Waiting...';
    case 'active':
      return 'In progress';
    case 'cancelled':
      return 'Stopped';
    default:
      // Compile error if cases are missing
      const _exhaustive: never = status;
      throw new Error(\`Unhandled status: \${_exhaustive}\`);
  }
}
\`\`\`

## API Types

### Request/Response
\`\`\`typescript
// ✅ Typed API endpoints
interface ApiEndpoints {
  'GET /users': {
    response: User[];
  };
  'GET /users/:id': {
    params: { id: string };
    response: User;
  };
  'POST /users': {
    body: CreateUserInput;
    response: User;
  };
  'PUT /users/:id': {
    params: { id: string };
    body: UpdateUserInput;
    response: User;
  };
}

// ✅ Type-safe fetch wrapper
async function api<T extends keyof ApiEndpoints>(
  endpoint: T,
  options: Omit<ApiEndpoints[T], 'response'>
): Promise<ApiEndpoints[T]['response']> {
  // Implementation
}
\`\`\`

### Form Data
\`\`\`typescript
// ✅ Form schemas with Zod
const CreateUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be 8+ characters'),
});

type CreateUserInput = z.infer<typeof CreateUserSchema>;

// ✅ Partial for updates
const UpdateUserSchema = CreateUserSchema.partial();
type UpdateUserInput = z.infer<typeof UpdateUserSchema>;
\`\`\`

## Utility Types

Use built-in utility types instead of manual definitions:

- \`Partial<T>\` - All properties optional
- \`Required<T>\` - All properties required
- \`Pick<T, K>\` - Select properties
- \`Omit<T, K>\` - Exclude properties
- \`Record<K, V>\` - Object with key type K and value type V
- \`Readonly<T>\` - All properties readonly
- \`NonNullable<T>\` - Remove null and undefined`}</code></pre>
			</div>
		</section>

		<!-- Why These Rules Section -->
		<section class="article-section">
			<h2>Why These Rules Matter</h2>

			<p>Understanding the reasoning helps you adapt rules for your project and defend them to teammates who want to "just use any."</p>

			<h3>Why Strict Mode?</h3>
			<p>Non-strict TypeScript catches maybe 30% of type errors. Strict mode catches 90%+. The point of TypeScript is catching bugs before runtime. Vibe coded projects without strict mode have type errors hiding everywhere - they just don't see them until production.</p>

			<h3>Why Ban "any"?</h3>
			<p>"any" disables type checking for everything it touches. It spreads through your codebase like a virus. One "any" can make an entire call chain untyped. Use "unknown" and narrow with type guards - it takes slightly more code but actually provides safety.</p>

			<h3>Why Explicit Return Types?</h3>
			<p>TypeScript can infer return types, but inference can change unexpectedly. Explicit return types are documentation, catch return type bugs early, and make refactoring safer. The few extra characters prevent hours of debugging.</p>

			<h3>Why Zod for Validation?</h3>
			<p>TypeScript types don't exist at runtime. API responses, user input, and environment variables need actual validation, not just type assertions. Zod provides both - runtime validation and inferred types.</p>
		</section>

		<!-- Common Mistakes Section -->
		<section class="article-section">
			<h2>Common TypeScript Mistakes AI Makes</h2>

			<div class="mistakes-grid">
				<div class="card mistake-card">
					<h4>Type Assertions Instead of Guards</h4>
					<div class="code-block">
						<div class="code-block-header">
							<span class="code-block-lang">Wrong vs Right</span>
						</div>
						<pre><code>{`// ❌ AI often generates this
const user = data as User;

// ✅ Should generate this
if (isUser(data)) {
  const user = data; // Properly narrowed
}`}</code></pre>
					</div>
				</div>

				<div class="card mistake-card">
					<h4>Optional Chaining Without Handling</h4>
					<div class="code-block">
						<div class="code-block-header">
							<span class="code-block-lang">Wrong vs Right</span>
						</div>
						<pre><code>{`// ❌ Returns undefined silently
const name = user?.profile?.name;

// ✅ Handle the undefined case
const name = user?.profile?.name ?? 'Anonymous';`}</code></pre>
					</div>
				</div>

				<div class="card mistake-card">
					<h4>Ignoring Promise Rejections</h4>
					<div class="code-block">
						<div class="code-block-header">
							<span class="code-block-lang">Wrong vs Right</span>
						</div>
						<pre><code>{`// ❌ Unhandled rejection
const data = await fetch(url).then(r => r.json());

// ✅ Handle errors
const data = await fetch(url)
  .then(r => r.ok ? r.json() : Promise.reject(r))
  .catch(handleError);`}</code></pre>
					</div>
				</div>

				<div class="card mistake-card">
					<h4>Object Index Access Without Check</h4>
					<div class="code-block">
						<div class="code-block-header">
							<span class="code-block-lang">Wrong vs Right</span>
						</div>
						<pre><code>{`// ❌ Could be undefined (with noUncheckedIndexedAccess)
const value = obj[key];

// ✅ Check before use
const value = obj[key];
if (value !== undefined) {
  // Use value safely
}`}</code></pre>
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
				<a href="/kb/prompts/cursor-rules/" class="card card-interactive related-card">
					<div class="related-card-category">Guide</div>
					<div class="related-card-title">Cursor Rules</div>
					<p class="related-card-description">Complete cursor rules guide</p>
				</a>
				<a href="/kb/prompts/cursor-rules-react/" class="card card-interactive related-card">
					<div class="related-card-category">Framework</div>
					<div class="related-card-title">React Rules</div>
					<p class="related-card-description">Components, hooks, patterns</p>
				</a>
				<a href="/kb/prompts/cursor-rules-nextjs/" class="card card-interactive related-card">
					<div class="related-card-category">Framework</div>
					<div class="related-card-title">Next.js Rules</div>
					<p class="related-card-description">Server Components & App Router</p>
				</a>
				<a href="/kb/security/vulnerabilities/sql-injection/" class="card card-interactive related-card">
					<div class="related-card-category">Security</div>
					<div class="related-card-title">SQL Injection</div>
					<p class="related-card-description">Type-safe database queries</p>
				</a>
			</div>
		</section>

		<div class="cta-box">
			<h3>Types Don't Catch Security Bugs</h3>
			<p>TypeScript catches type errors, not SQL injection or XSS. VibeShip Scanner finds security vulnerabilities in your vibe coded TypeScript projects.</p>
			<a href="https://vibeship.co" class="btn btn-green">Scan Your Code Free</a>
		</div>
	</article>
</div>

<style>
	.intro { font-size: 1.125rem; color: var(--text-secondary); margin-bottom: 2rem; line-height: 1.7; }
	.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin: 1.5rem 0 2rem; }

	/* Sections Grid */
	.sections-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; margin: 1.5rem 0 2rem; }
	.section-card { padding: 0.75rem; }
	.section-name { font-weight: 600; color: var(--green); font-size: 0.9rem; }
	.section-desc { font-size: 0.8rem; color: var(--text-tertiary); }

	/* Mistakes Grid */
	.mistakes-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1rem 0; }
	.mistake-card h4 { margin: 0 0 0.75rem; font-size: 0.95rem; }

	@media (max-width: 900px) { .sections-grid { grid-template-columns: repeat(2, 1fr); } }
	@media (max-width: 768px) {
		.stats-row { grid-template-columns: repeat(2, 1fr); }
		.mistakes-grid { grid-template-columns: 1fr; }
	}
	@media (max-width: 480px) {
		.stats-row { grid-template-columns: 1fr; }
		.sections-grid { grid-template-columns: 1fr; }
	}
</style>
