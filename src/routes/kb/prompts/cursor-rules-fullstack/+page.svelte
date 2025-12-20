<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Cursor Rules for Full-Stack Development: Complete 2025 Guide',
		description: 'Master cursor rules for full-stack development. Get copy-paste .cursorrules for Next.js, React, Node.js, Python, databases, and security. 20+ production-ready templates with best practices.',
		url: '/kb/prompts/cursor-rules-fullstack/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Prompts', href: '/kb/prompts' },
		{ label: 'Cursor Rules Full-Stack' }
	];

	// FAQ data
	const faqs = [
		{
			question: 'What cursor rules do I need for full-stack development?',
			answer: 'Full-stack cursor rules should cover: (1) Frontend framework patterns (React, Vue, Svelte), (2) Backend API conventions (REST, GraphQL), (3) Database security rules, (4) Authentication patterns, (5) TypeScript/typing standards, and (6) Testing requirements. Start with your primary stack, then layer security rules on top.'
		},
		{
			question: 'Should I use one .cursorrules file or multiple files in .cursor/rules/?',
			answer: 'For full-stack projects, use the .cursor/rules/ folder with separate files. This keeps frontend rules separate from backend rules, makes security rules explicit, and helps Cursor load only relevant context. A typical setup: frontend.md, backend.md, database.md, security.md, and testing.md.'
		},
		{
			question: 'How do I prevent Cursor from generating insecure database queries?',
			answer: 'Add explicit database security rules that ban template literals and require parameterized queries. Include before/after examples showing the vulnerable pattern and secure alternative. Cursor follows examples better than abstract rules, so always show concrete code.'
		},
		{
			question: 'What is the ideal length for cursor rules?',
			answer: 'Each rule file should stay under 500 lines. For full-stack projects, this means 5-7 focused files rather than one massive file. Cursor has limited context, so concise, specific rules perform better than comprehensive but vague ones. Quality over quantity.'
		},
		{
			question: 'How do cursor rules work with monorepos?',
			answer: 'Place shared rules in the monorepo root .cursor/rules/ folder, then add package-specific rules in each package directory. Cursor merges rules from parent directories with local rules, so common security patterns apply everywhere while package rules add specifics.'
		},
		{
			question: 'Should I include error handling patterns in cursor rules?',
			answer: 'Yes, error handling is critical for full-stack apps. Include rules for: consistent error response formats, proper error logging (without leaking secrets), user-friendly error messages, and error boundary patterns for React. Show examples of both good and bad error handling.'
		},
		{
			question: 'How often should I update my cursor rules?',
			answer: 'Update cursor rules when: (1) You notice Cursor repeatedly making the same mistake, (2) You add new libraries or patterns to your stack, (3) You discover a security vulnerability, (4) Team conventions change. Review quarterly at minimum for active projects.'
		},
		{
			question: 'Can cursor rules replace code review for security?',
			answer: 'No. Cursor rules reduce common vulnerabilities but cannot replace human code review or security scanning. Use cursor rules as the first line of defense, then layer on automated scanning (like VibeShip Scanner), and finally human review for critical paths. Defense in depth.'
		}
	];

	// Stack templates
	const stackTemplates = [
		{
			name: 'Next.js 15 + Supabase',
			icon: 'nextjs',
			description: 'App Router, Server Components, Supabase auth and RLS',
			fileCount: 5
		},
		{
			name: 'React + Node.js + PostgreSQL',
			icon: 'react',
			description: 'Express/Fastify API, Prisma ORM, JWT auth',
			fileCount: 6
		},
		{
			name: 'SvelteKit + Prisma',
			icon: 'svelte',
			description: 'Server-side rendering, form actions, type-safe queries',
			fileCount: 4
		},
		{
			name: 'Python FastAPI + SQLAlchemy',
			icon: 'python',
			description: 'Async API, Pydantic validation, SQLAlchemy ORM',
			fileCount: 5
		}
	];

	// Rule categories with priorities
	const ruleCategories = [
		{
			name: 'Security Rules',
			priority: 'Critical',
			description: 'SQL injection, auth, input validation, secrets',
			examples: ['Parameterized queries', 'Auth middleware', 'Zod validation']
		},
		{
			name: 'Frontend Patterns',
			priority: 'High',
			description: 'Component structure, state management, styling',
			examples: ['Server vs Client Components', 'State patterns', 'CSS conventions']
		},
		{
			name: 'Backend Patterns',
			priority: 'High',
			description: 'API structure, middleware, error handling',
			examples: ['Route handlers', 'Middleware chains', 'Error responses']
		},
		{
			name: 'Database Rules',
			priority: 'Critical',
			description: 'ORM patterns, migrations, query optimization',
			examples: ['Prisma patterns', 'N+1 prevention', 'Transaction handling']
		},
		{
			name: 'Testing Rules',
			priority: 'Medium',
			description: 'Test structure, mocking, coverage expectations',
			examples: ['Test naming', 'Mock patterns', 'Integration tests']
		},
		{
			name: 'Code Style',
			priority: 'Low',
			description: 'Formatting, naming, file organization',
			examples: ['Naming conventions', 'File structure', 'Import ordering']
		}
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
				<strong>Cursor rules for full-stack development</strong> should cover frontend patterns, backend conventions, database security, and authentication - organized in separate files under .cursor/rules/. Most developers miss security rules entirely. This guide provides 20+ production-ready templates you can copy today.
			</p>
		</div>

		<!-- Badge -->
		<span class="badge badge-pillar">PILLAR GUIDE</span>

		<h1>Cursor Rules for Full-Stack Development: The Complete 2025 Guide</h1>

		<p class="intro">
			Vibe coding full-stack applications means coordinating AI across frontend, backend, database, and infrastructure. Without proper cursor rules, you get inconsistent patterns, security gaps, and constant context-switching overhead. This comprehensive guide shows exactly how to structure cursor rules for full-stack projects - with copy-paste templates for every major stack.
		</p>

		<!-- Stats Row -->
		<div class="stats-row">
			<div class="stat-card">
				<div class="stat-number">20+</div>
				<div class="stat-label">Templates Included</div>
			</div>
			<div class="stat-card">
				<div class="stat-number">6</div>
				<div class="stat-label">Rule Categories</div>
			</div>
			<div class="stat-card">
				<div class="stat-number">4</div>
				<div class="stat-label">Full-Stack Stacks</div>
			</div>
			<div class="stat-card">
				<div class="stat-number">45%</div>
				<div class="stat-label">AI Code Has Vulnerabilities*</div>
			</div>
		</div>
		<p class="stat-note">*Stanford research on AI-generated code security. Security rules reduce this significantly.</p>

		<!-- Table of Contents -->
		<nav class="toc">
			<h2>Table of Contents</h2>
			<ol>
				<li><a href="#why-fullstack">Why Full-Stack Projects Need Different Rules</a></li>
				<li><a href="#file-structure">The Optimal File Structure</a></li>
				<li><a href="#security-rules">Security Rules (Most Important)</a></li>
				<li><a href="#frontend-rules">Frontend Rules by Framework</a></li>
				<li><a href="#backend-rules">Backend Rules by Framework</a></li>
				<li><a href="#database-rules">Database Rules</a></li>
				<li><a href="#auth-rules">Authentication Rules</a></li>
				<li><a href="#testing-rules">Testing Rules</a></li>
				<li><a href="#complete-templates">Complete Stack Templates</a></li>
				<li><a href="#monorepo-patterns">Monorepo Patterns</a></li>
				<li><a href="#best-practices">Best Practices</a></li>
				<li><a href="#common-mistakes">Common Mistakes to Avoid</a></li>
				<li><a href="#faq">FAQ</a></li>
			</ol>
		</nav>

		<!-- Section 1: Why Full-Stack Needs Different Rules -->
		<section id="why-fullstack" class="article-section">
			<h2>Why Full-Stack Projects Need Different Rules</h2>

			<p>
				Single-purpose projects need simple rules. A frontend-only React app needs component patterns and styling conventions. A backend-only API needs route structure and validation rules. Full-stack projects need both - plus the complex interplay between them.
			</p>

			<p>
				The challenge is <strong>context switching</strong>. When you're editing a React component, Cursor needs frontend patterns. When you switch to an API route, it needs backend conventions. When you touch the database layer, security becomes critical. A monolithic .cursorrules file either includes everything (wasting context) or misses crucial patterns (causing bugs).
			</p>

			<h3>What Makes Full-Stack Rules Different</h3>

			<div class="difference-grid">
				<div class="difference-card">
					<h4>Single-Purpose Projects</h4>
					<ul>
						<li>One .cursorrules file works fine</li>
						<li>All code follows same patterns</li>
						<li>Limited security surface</li>
						<li>Consistent tooling throughout</li>
					</ul>
				</div>
				<div class="difference-card highlight">
					<h4>Full-Stack Projects</h4>
					<ul>
						<li>Multiple rule files by layer</li>
						<li>Different patterns per layer</li>
						<li>Multiple security boundaries</li>
						<li>Mixed tooling (frontend vs backend)</li>
					</ul>
				</div>
			</div>

			<p>
				Full-stack cursor rules need to handle: frontend component patterns, backend API conventions, database access security, authentication flows, shared types between layers, and deployment considerations. Get this wrong and you'll spend more time fixing AI mistakes than writing code yourself.
			</p>
		</section>

		<!-- Section 2: Optimal File Structure -->
		<section id="file-structure" class="article-section">
			<h2>The Optimal File Structure</h2>

			<p>
				For full-stack projects, use the <code>.cursor/rules/</code> folder with separate files for each concern. Cursor automatically loads rules from this folder based on file patterns and the <code>alwaysApply</code> setting. This gives you precision without context waste.
			</p>

			<div class="code-block">
				<div class="code-header">
					<span class="code-title">Recommended Folder Structure</span>
					<span class="code-lang">shell</span>
				</div>
				<pre><code>{`project/
├── .cursor/
│   └── rules/
│       ├── 00-project.md          # Always on: project context
│       ├── 01-security.md         # Always on: security patterns
│       ├── 10-frontend.md         # Globs: **/*.tsx, **/*.jsx
│       ├── 11-components.md       # Globs: **/components/**
│       ├── 20-backend.md          # Globs: **/api/**, **/server/**
│       ├── 21-database.md         # Globs: **/db/**, **/prisma/**
│       ├── 30-testing.md          # Globs: **/*.test.*, **/*.spec.*
│       └── 40-deployment.md       # Manual activation only
├── src/
│   ├── app/                       # Next.js app directory
│   ├── components/                # React components
│   ├── lib/                       # Shared utilities
│   └── server/                    # Backend code
└── ...`}</code></pre>
			</div>

			<h3>Naming Convention</h3>

			<p>
				The numeric prefixes (00, 01, 10, etc.) establish priority ordering. Lower numbers have higher priority when rules conflict. This ensures:
			</p>

			<ul>
				<li><strong>00-09:</strong> Core rules that always apply (project context, security)</li>
				<li><strong>10-19:</strong> Frontend rules (components, styling, state)</li>
				<li><strong>20-29:</strong> Backend rules (API, database, services)</li>
				<li><strong>30-39:</strong> Testing rules (test patterns, mocking)</li>
				<li><strong>40+:</strong> Optional rules (deployment, docs)</li>
			</ul>

			<h3>Rule File Format</h3>

			<p>
				Each rule file should use YAML frontmatter to control when it activates:
			</p>

			<div class="code-block">
				<div class="code-header">
					<span class="code-title">.cursor/rules/10-frontend.md</span>
					<span class="code-lang">markdown</span>
				</div>
				<pre><code>{`---
description: "Frontend React/Next.js component patterns"
alwaysApply: false
globs: ["**/*.tsx", "**/*.jsx", "**/components/**"]
---

# Frontend Rules

## Component Structure
- Use Server Components by default (Next.js 13+)
- Add 'use client' only when needed for:
  - useState, useEffect, or other hooks
  - Event handlers (onClick, onChange)
  - Browser-only APIs

## State Management
- Prefer server state (fetch in Server Components)
- Use React Query/TanStack Query for client caching
- Avoid global state unless truly global

## TypeScript
- Define prop types as interfaces
- Export types alongside components
- No 'any' types - use 'unknown' and narrow`}</code></pre>
			</div>
		</section>

		<!-- Section 3: Security Rules -->
		<section id="security-rules" class="article-section">
			<h2>Security Rules (Most Important)</h2>

			<p>
				Security rules should <strong>always apply</strong> - they're too important to be conditional. Research shows <a href="/kb/vibe-coding/secure-vibe-coding-guide/">AI-generated code contains vulnerabilities 45% of the time</a>. Your security rules are the first line of defense against <a href="/kb/security/vulnerabilities/sql-injection/">SQL injection</a>, <a href="/kb/security/vulnerabilities/missing-auth/">missing authentication</a>, and <a href="/kb/security/vulnerabilities/hardcoded-secrets/">hardcoded secrets</a>.
			</p>

			<div class="code-block">
				<div class="code-header">
					<span class="code-title">.cursor/rules/01-security.md (Copy-Paste Ready)</span>
					<span class="code-lang">markdown</span>
				</div>
				<pre><code>{`---
description: "Security patterns - ALWAYS enforced"
alwaysApply: true
---

# Security Rules (CRITICAL)

These rules prevent the most common vulnerabilities in AI-generated code.

## Database Security

### SQL Injection Prevention
NEVER use template literals or string concatenation for SQL queries.
ALWAYS use parameterized queries or ORM methods.

SECURE - Parameterized query:
\`\`\`typescript
const user = await db.query(
  'SELECT * FROM users WHERE id = $1 AND status = $2',
  [userId, 'active']
)
\`\`\`

VULNERABLE - Template literal (NEVER DO THIS):
\`\`\`typescript
// This allows SQL injection attacks
const user = await db.query(
  \`SELECT * FROM users WHERE id = \${userId}\`
)
\`\`\`

### ORM Best Practices
Use your ORM's built-in methods instead of raw queries when possible:

\`\`\`typescript
// Prisma - safe by default
const user = await prisma.user.findUnique({
  where: { id: userId }
})

// Drizzle - parameterized
const user = await db.select()
  .from(users)
  .where(eq(users.id, userId))
\`\`\`

## Authentication

### Route Protection
EVERY API route and Server Action must verify authentication FIRST.

Pattern for protected routes:
1. Get session/token from request
2. Validate session exists and is not expired
3. Verify user has permission for this action
4. THEN process the request

Example (Next.js App Router):
\`\`\`typescript
export async function POST(request: Request) {
  // Step 1: Get session
  const session = await getServerSession(authOptions)

  // Step 2: Validate session
  if (!session?.user) {
    return Response.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  // Step 3: Check permissions (if needed)
  if (!session.user.isAdmin) {
    return Response.json(
      { error: 'Forbidden' },
      { status: 403 }
    )
  }

  // Step 4: Process request
  // ... your logic here
}
\`\`\`

### Never Trust Client State
Authentication state from the client can be spoofed.
Always re-validate on the server.

## Input Validation

### Validate Everything Server-Side
Use Zod or similar for schema validation:

\`\`\`typescript
import { z } from 'zod'

const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  age: z.number().int().positive().optional()
})

export async function createUser(input: unknown) {
  const result = createUserSchema.safeParse(input)

  if (!result.success) {
    return { error: result.error.flatten() }
  }

  // Safe to use result.data
  return await db.user.create({ data: result.data })
}
\`\`\`

### Never Pass Raw Input To
- Database queries (SQL injection)
- File system operations (path traversal)
- Shell commands (command injection)
- URL redirects (open redirect)
- HTML output without escaping (XSS)

## Secret Handling

### Environment Variables Only
NEVER hardcode secrets in code:

\`\`\`typescript
// SECURE
const apiKey = process.env.STRIPE_SECRET_KEY

// VULNERABLE - Never do this
const apiKey = 'sk_live_abc123...'
\`\`\`

### What Counts as a Secret
- API keys (Stripe, OpenAI, etc.)
- Database connection strings
- JWT secrets
- OAuth client secrets
- Encryption keys
- Admin passwords

### .env Rules
- Never commit .env files (add to .gitignore)
- Use .env.example for documentation
- Different secrets per environment (dev/staging/prod)`}</code></pre>
			</div>

			<div class="warning-box">
				<strong>Important:</strong> These security rules catch common issues but don't replace proper security scanning. Use <a href="/">VibeShip Scanner</a> for comprehensive vulnerability detection across your entire codebase.
			</div>
		</section>

		<!-- Section 4: Frontend Rules -->
		<section id="frontend-rules" class="article-section">
			<h2>Frontend Rules by Framework</h2>

			<p>
				Frontend rules should activate only when editing frontend files. Use <code>globs</code> to target specific patterns like <code>**/*.tsx</code> or <code>**/components/**</code>.
			</p>

			<h3>Next.js 15 App Router</h3>

			<div class="code-block">
				<div class="code-header">
					<span class="code-title">.cursor/rules/10-nextjs.md</span>
					<span class="code-lang">markdown</span>
				</div>
				<pre><code>{`---
description: "Next.js 15 App Router patterns"
alwaysApply: false
globs: ["app/**", "src/app/**", "**/components/**/*.tsx"]
---

# Next.js 15 Rules

## Server vs Client Components

### Default to Server Components
Components are Server Components by default. Only add 'use client' when you need:
- React hooks (useState, useEffect, useContext)
- Event handlers (onClick, onChange, onSubmit)
- Browser-only APIs (window, localStorage)
- Third-party client libraries

### 'use client' Placement
Add 'use client' at the very top of the file, before imports:

\`\`\`tsx
'use client'

import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
\`\`\`

### Data Fetching
Fetch data in Server Components, not Client Components:

\`\`\`tsx
// Server Component - data fetched on server
async function UserProfile({ userId }: { userId: string }) {
  const user = await db.user.findUnique({ where: { id: userId } })
  return <div>{user.name}</div>
}

// NOT this - fetching in client is slower
'use client'
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState(null)
  useEffect(() => {
    fetch(\`/api/users/\${userId}\`).then(r => r.json()).then(setUser)
  }, [userId])
  return <div>{user?.name}</div>
}
\`\`\`

## Server Actions

### Form Handling
Use Server Actions for form submissions:

\`\`\`tsx
async function createPost(formData: FormData) {
  'use server'

  const session = await getServerSession()
  if (!session) throw new Error('Unauthorized')

  const title = formData.get('title') as string
  const content = formData.get('content') as string

  await db.post.create({
    data: { title, content, authorId: session.user.id }
  })

  revalidatePath('/posts')
}

export function NewPostForm() {
  return (
    <form action={createPost}>
      <input name="title" required />
      <textarea name="content" required />
      <button type="submit">Create Post</button>
    </form>
  )
}
\`\`\`

### Always Authenticate Server Actions
Server Actions can be called directly - always verify auth:

\`\`\`typescript
async function deletePost(postId: string) {
  'use server'

  // ALWAYS check auth in Server Actions
  const session = await getServerSession()
  if (!session) throw new Error('Unauthorized')

  // Verify ownership
  const post = await db.post.findUnique({ where: { id: postId } })
  if (post?.authorId !== session.user.id) {
    throw new Error('Forbidden')
  }

  await db.post.delete({ where: { id: postId } })
}
\`\`\`

## File Organization

### Route Structure
\`\`\`
app/
├── layout.tsx           # Root layout
├── page.tsx             # Home page
├── (auth)/              # Auth group (no URL segment)
│   ├── login/page.tsx
│   └── signup/page.tsx
├── dashboard/
│   ├── layout.tsx       # Dashboard layout
│   ├── page.tsx         # /dashboard
│   └── settings/page.tsx
└── api/
    └── [...]/route.ts   # API routes
\`\`\`

### Component Organization
\`\`\`
components/
├── ui/                  # Reusable UI components
│   ├── button.tsx
│   └── input.tsx
├── forms/               # Form components
│   └── post-form.tsx
└── layout/              # Layout components
    ├── header.tsx
    └── footer.tsx
\`\`\``}</code></pre>
			</div>

			<h3>React (Vite/CRA)</h3>

			<div class="code-block">
				<div class="code-header">
					<span class="code-title">.cursor/rules/10-react.md</span>
					<span class="code-lang">markdown</span>
				</div>
				<pre><code>{`---
description: "React patterns for client-side apps"
alwaysApply: false
globs: ["**/*.tsx", "**/*.jsx", "**/components/**"]
---

# React Rules

## Component Patterns

### Functional Components Only
Use function declarations for components:

\`\`\`tsx
// Preferred
function UserCard({ user }: { user: User }) {
  return <div>{user.name}</div>
}

// Also acceptable
const UserCard = ({ user }: { user: User }) => {
  return <div>{user.name}</div>
}

// Never use class components
class UserCard extends React.Component {} // NO
\`\`\`

### Props Interface Pattern
Define prop types as interfaces, export when reusable:

\`\`\`tsx
interface UserCardProps {
  user: User
  onSelect?: (user: User) => void
  variant?: 'compact' | 'full'
}

export function UserCard({ user, onSelect, variant = 'full' }: UserCardProps) {
  // ...
}
\`\`\`

## State Management

### Local State First
Use useState for component-local state:

\`\`\`tsx
function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
\`\`\`

### Server State with TanStack Query
Use TanStack Query for API data:

\`\`\`tsx
function UserList() {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then(r => r.json())
  })

  if (isLoading) return <Loading />
  if (error) return <Error message={error.message} />

  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>
}
\`\`\`

### Avoid Global State
Only use global state (Zustand, Redux) for truly global concerns:
- User session
- Theme preferences
- Feature flags

NOT for:
- Form state (use local state)
- Server data (use TanStack Query)
- URL state (use router)

## Hooks

### Custom Hooks for Reusable Logic
Extract repeated logic into custom hooks:

\`\`\`tsx
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}
\`\`\`

### Hook Rules
- Only call hooks at the top level
- Only call hooks from React functions
- Name custom hooks with 'use' prefix`}</code></pre>
			</div>

			<h3>Svelte/SvelteKit</h3>

			<div class="code-block">
				<div class="code-header">
					<span class="code-title">.cursor/rules/10-sveltekit.md</span>
					<span class="code-lang">markdown</span>
				</div>
				<pre><code>{`---
description: "SvelteKit patterns and conventions"
alwaysApply: false
globs: ["**/*.svelte", "**/routes/**", "src/**"]
---

# SvelteKit Rules

## Svelte 5 Runes

### State with $state
Use $state for reactive state:

\`\`\`svelte
<script lang="ts">
  let count = $state(0)
  let user = $state<User | null>(null)
</script>

<button onclick={() => count++}>{count}</button>
\`\`\`

### Derived State with $derived
Use $derived for computed values:

\`\`\`svelte
<script lang="ts">
  let items = $state<Item[]>([])
  let total = $derived(items.reduce((sum, i) => sum + i.price, 0))
</script>
\`\`\`

### Effects with $effect
Use $effect for side effects:

\`\`\`svelte
<script lang="ts">
  let searchQuery = $state('')

  $effect(() => {
    // Runs when searchQuery changes
    console.log('Searching for:', searchQuery)
  })
</script>
\`\`\`

## Data Loading

### Load Functions
Use +page.server.ts for server-side data:

\`\`\`typescript
// src/routes/users/+page.server.ts
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.getSession()
  if (!session) throw redirect(303, '/login')

  const users = await db.user.findMany()
  return { users }
}
\`\`\`

### Form Actions
Use form actions for mutations:

\`\`\`typescript
// src/routes/users/+page.server.ts
import type { Actions } from './$types'

export const actions: Actions = {
  create: async ({ request, locals }) => {
    const session = await locals.getSession()
    if (!session) throw error(401, 'Unauthorized')

    const formData = await request.formData()
    const name = formData.get('name') as string

    await db.user.create({ data: { name } })
    return { success: true }
  }
}
\`\`\`

## Component Structure

### Props with $props
Declare props using $props:

\`\`\`svelte
<script lang="ts">
  interface Props {
    user: User
    onSelect?: (user: User) => void
  }

  let { user, onSelect }: Props = $props()
</script>
\`\`\``}</code></pre>
			</div>
		</section>

		<!-- Section 5: Backend Rules -->
		<section id="backend-rules" class="article-section">
			<h2>Backend Rules by Framework</h2>

			<p>
				Backend rules focus on API structure, middleware patterns, and error handling. These rules should activate for server-side files only.
			</p>

			<h3>Node.js (Express/Fastify)</h3>

			<div class="code-block">
				<div class="code-header">
					<span class="code-title">.cursor/rules/20-nodejs-api.md</span>
					<span class="code-lang">markdown</span>
				</div>
				<pre><code>{`---
description: "Node.js API patterns for Express/Fastify"
alwaysApply: false
globs: ["**/api/**", "**/server/**", "**/routes/**/*.ts"]
---

# Node.js API Rules

## Route Structure

### RESTful Conventions
Follow REST conventions for routes:

\`\`\`typescript
// Resources use plural nouns
GET    /api/users          // List users
POST   /api/users          // Create user
GET    /api/users/:id      // Get single user
PATCH  /api/users/:id      // Update user
DELETE /api/users/:id      // Delete user

// Nested resources
GET    /api/users/:id/posts   // User's posts
POST   /api/users/:id/posts   // Create post for user
\`\`\`

### Route Handler Pattern
Structure handlers consistently:

\`\`\`typescript
export async function getUsers(req: Request, res: Response) {
  try {
    // 1. Validate input
    const { page, limit } = paginationSchema.parse(req.query)

    // 2. Execute business logic
    const users = await userService.findMany({ page, limit })

    // 3. Return response
    return res.json({ users, page, limit })
  } catch (error) {
    // 4. Handle errors
    return handleError(error, res)
  }
}
\`\`\`

## Middleware

### Authentication Middleware
Create reusable auth middleware:

\`\`\`typescript
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'No token provided' })
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!)
    req.user = payload as User
    next()
  } catch {
    return res.status(401).json({ error: 'Invalid token' })
  }
}

// Usage
app.get('/api/profile', requireAuth, getProfile)
\`\`\`

### Error Handling Middleware
Centralize error handling:

\`\`\`typescript
export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(error)

  if (error instanceof ValidationError) {
    return res.status(400).json({
      error: 'Validation failed',
      details: error.errors
    })
  }

  if (error instanceof UnauthorizedError) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  // Don't leak error details in production
  return res.status(500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : error.message
  })
}
\`\`\`

## Response Format

### Consistent Response Structure
Use consistent response shapes:

\`\`\`typescript
// Success responses
{ data: T }                          // Single item
{ data: T[], total: number }         // List
{ success: true }                    // Mutation

// Error responses
{ error: string, code?: string }     // Simple error
{ error: string, details: object }   // Validation error
\`\`\`

## Input Validation

### Validate All Endpoints
Use Zod for request validation:

\`\`\`typescript
const createUserSchema = z.object({
  body: z.object({
    email: z.string().email(),
    name: z.string().min(1).max(100),
    password: z.string().min(8)
  })
})

export async function createUser(req: Request, res: Response) {
  const { body } = createUserSchema.parse(req)

  const user = await userService.create(body)
  return res.status(201).json({ data: user })
}
\`\`\``}</code></pre>
			</div>

			<h3>Python FastAPI</h3>

			<div class="code-block">
				<div class="code-header">
					<span class="code-title">.cursor/rules/20-fastapi.md</span>
					<span class="code-lang">markdown</span>
				</div>
				<pre><code>{`---
description: "FastAPI patterns and conventions"
alwaysApply: false
globs: ["**/*.py", "**/api/**", "**/routers/**"]
---

# FastAPI Rules

## Route Structure

### Router Organization
Organize routes by resource:

\`\`\`python
# app/routers/users.py
from fastapi import APIRouter, Depends, HTTPException
from app.dependencies import get_current_user

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/")
async def list_users(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_user)
):
    users = await user_service.get_all(skip=skip, limit=limit)
    return {"users": users}

@router.get("/{user_id}")
async def get_user(user_id: int):
    user = await user_service.get(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
\`\`\`

## Pydantic Models

### Request/Response Models
Define explicit models for validation:

\`\`\`python
from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    email: EmailStr
    name: str
    password: str

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    name: str

    class Config:
        from_attributes = True

class UserUpdate(BaseModel):
    email: EmailStr | None = None
    name: str | None = None
\`\`\`

## Dependencies

### Database Sessions
Use dependencies for database sessions:

\`\`\`python
from fastapi import Depends
from sqlalchemy.orm import Session
from app.database import get_db

@router.post("/users")
async def create_user(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    db_user = User(**user.model_dump())
    db.add(db_user)
    db.commit()
    return db_user
\`\`\`

### Authentication Dependencies
Create reusable auth dependencies:

\`\`\`python
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def get_current_user(token: str = Depends(oauth2_scheme)):
    user = await verify_token(token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    return user

async def get_admin_user(user: User = Depends(get_current_user)):
    if not user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
    return user
\`\`\`

## Async Best Practices

### Always Use Async for I/O
Use async for database and external API calls:

\`\`\`python
# Good - async database call
@router.get("/users")
async def list_users(db: AsyncSession = Depends(get_async_db)):
    result = await db.execute(select(User))
    return result.scalars().all()

# Bad - blocking call in async function
@router.get("/users")
async def list_users():
    users = sync_db.query(User).all()  # Blocks event loop!
    return users
\`\`\``}</code></pre>
			</div>
		</section>

		<!-- Section 6: Database Rules -->
		<section id="database-rules" class="article-section">
			<h2>Database Rules</h2>

			<p>
				Database rules are critical for security and performance. They should cover ORM patterns, query optimization, and migration best practices.
			</p>

			<div class="code-block">
				<div class="code-header">
					<span class="code-title">.cursor/rules/21-database.md</span>
					<span class="code-lang">markdown</span>
				</div>
				<pre><code>{`---
description: "Database patterns for Prisma, Drizzle, SQLAlchemy"
alwaysApply: false
globs: ["**/prisma/**", "**/db/**", "**/database/**", "**/models/**"]
---

# Database Rules

## Prisma Patterns

### Query Optimization
Prevent N+1 queries with includes:

\`\`\`typescript
// BAD - N+1 query
const users = await prisma.user.findMany()
for (const user of users) {
  user.posts = await prisma.post.findMany({ where: { authorId: user.id } })
}

// GOOD - Single query with include
const users = await prisma.user.findMany({
  include: { posts: true }
})

// BETTER - Select only needed fields
const users = await prisma.user.findMany({
  select: {
    id: true,
    name: true,
    posts: {
      select: { id: true, title: true }
    }
  }
})
\`\`\`

### Transaction Handling
Use transactions for related operations:

\`\`\`typescript
// Transfer between accounts
await prisma.$transaction(async (tx) => {
  await tx.account.update({
    where: { id: fromId },
    data: { balance: { decrement: amount } }
  })

  await tx.account.update({
    where: { id: toId },
    data: { balance: { increment: amount } }
  })
})
\`\`\`

### Soft Deletes
Implement soft deletes for auditable data:

\`\`\`typescript
// Schema
model User {
  id        Int       @id @default(autoincrement())
  email     String    @unique
  deletedAt DateTime?
}

// Query - exclude deleted
const users = await prisma.user.findMany({
  where: { deletedAt: null }
})

// Soft delete
await prisma.user.update({
  where: { id },
  data: { deletedAt: new Date() }
})
\`\`\`

## Drizzle Patterns

### Type-Safe Queries
Use Drizzle's type-safe query builder:

\`\`\`typescript
import { eq, and, or, like } from 'drizzle-orm'

// Simple query
const user = await db.select()
  .from(users)
  .where(eq(users.id, userId))

// Complex query
const results = await db.select()
  .from(users)
  .where(
    and(
      eq(users.status, 'active'),
      or(
        like(users.name, \`%\${search}%\`),
        like(users.email, \`%\${search}%\`)
      )
    )
  )
\`\`\`

### Joins
Use proper joins for related data:

\`\`\`typescript
const usersWithPosts = await db.select()
  .from(users)
  .leftJoin(posts, eq(users.id, posts.authorId))
\`\`\`

## Migration Best Practices

### Never Edit Deployed Migrations
Once a migration is deployed, create a new one to modify.

### Test Migrations Down
Always test rollback before deploying:

\`\`\`bash
npx prisma migrate reset --skip-seed
npx prisma migrate deploy
\`\`\`

### Include Seed Data
Provide seed scripts for development:

\`\`\`typescript
// prisma/seed.ts
async function main() {
  await prisma.user.createMany({
    data: [
      { email: 'admin@example.com', name: 'Admin' },
      { email: 'user@example.com', name: 'User' }
    ]
  })
}
\`\`\`

## Security Reminders

### Row-Level Security (Supabase)
Always enable RLS on tables:

\`\`\`sql
-- Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Users can only see their own posts
CREATE POLICY "Users see own posts" ON posts
  FOR SELECT USING (auth.uid() = user_id);

-- Users can only update their own posts
CREATE POLICY "Users update own posts" ON posts
  FOR UPDATE USING (auth.uid() = user_id);
\`\`\`

### Never Trust User Input in Queries
Even with ORMs, be careful with dynamic values:

\`\`\`typescript
// DANGEROUS - dynamic field selection
const field = req.query.orderBy // Could be malicious
await prisma.user.findMany({
  orderBy: { [field]: 'asc' } // SQL injection possible!
})

// SAFE - allowlist fields
const allowedFields = ['name', 'email', 'createdAt']
const field = allowedFields.includes(req.query.orderBy)
  ? req.query.orderBy
  : 'createdAt'
\`\`\``}</code></pre>
			</div>
		</section>

		<!-- Section 7: Authentication Rules -->
		<section id="auth-rules" class="article-section">
			<h2>Authentication Rules</h2>

			<p>
				Authentication is the most security-critical part of any full-stack app. These rules ensure consistent auth patterns across your codebase.
			</p>

			<div class="code-block">
				<div class="code-header">
					<span class="code-title">.cursor/rules/22-auth.md</span>
					<span class="code-lang">markdown</span>
				</div>
				<pre><code>{`---
description: "Authentication patterns"
alwaysApply: false
globs: ["**/auth/**", "**/middleware/**", "**/api/**"]
---

# Authentication Rules

## Session-Based Auth (Recommended for Web)

### Next.js with NextAuth.js
\`\`\`typescript
// lib/auth.ts
import { getServerSession } from 'next-auth'
import { authOptions } from './auth-options'

export async function getSession() {
  return await getServerSession(authOptions)
}

export async function requireAuth() {
  const session = await getSession()
  if (!session) {
    redirect('/login')
  }
  return session
}
\`\`\`

### Protecting Server Components
\`\`\`tsx
// app/dashboard/page.tsx
import { requireAuth } from '@/lib/auth'

export default async function DashboardPage() {
  const session = await requireAuth()

  // User is guaranteed to be authenticated here
  return <Dashboard user={session.user} />
}
\`\`\`

### Protecting API Routes
\`\`\`typescript
// app/api/protected/route.ts
import { getSession } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await getSession()

  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  // Process authenticated request
  return NextResponse.json({ user: session.user })
}
\`\`\`

## Token-Based Auth (APIs, Mobile)

### JWT Best Practices
\`\`\`typescript
// Token creation
const token = jwt.sign(
  { userId: user.id, email: user.email },
  process.env.JWT_SECRET!,
  { expiresIn: '1h' } // Short-lived tokens
)

// Token verification
function verifyToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!)
  } catch {
    return null
  }
}
\`\`\`

### Refresh Token Pattern
\`\`\`typescript
// Issue both access and refresh tokens
const accessToken = jwt.sign(payload, ACCESS_SECRET, { expiresIn: '15m' })
const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' })

// Store refresh token in DB for revocation
await db.refreshToken.create({
  data: {
    token: hash(refreshToken),
    userId: user.id,
    expiresAt: addDays(new Date(), 7)
  }
})
\`\`\`

## Authorization

### Role-Based Access Control
\`\`\`typescript
type Role = 'user' | 'admin' | 'superadmin'

const permissions: Record<Role, string[]> = {
  user: ['read:own', 'write:own'],
  admin: ['read:all', 'write:all', 'delete:own'],
  superadmin: ['read:all', 'write:all', 'delete:all', 'manage:users']
}

function hasPermission(user: User, permission: string): boolean {
  return permissions[user.role]?.includes(permission) ?? false
}

// Usage in route
if (!hasPermission(user, 'delete:all')) {
  throw new ForbiddenError()
}
\`\`\`

### Resource-Based Authorization
\`\`\`typescript
// Check ownership before operations
async function canEditPost(userId: string, postId: string) {
  const post = await db.post.findUnique({ where: { id: postId } })

  if (!post) return false
  if (post.authorId === userId) return true

  // Check if user is admin
  const user = await db.user.findUnique({ where: { id: userId } })
  return user?.role === 'admin'
}
\`\`\`

## Common Auth Mistakes to Prevent

### Never Store Passwords in Plain Text
\`\`\`typescript
// SECURE - Hash passwords
import { hash, verify } from '@node-rs/argon2'

const hashedPassword = await hash(password, {
  memoryCost: 19456,
  timeCost: 2,
  parallelism: 1
})

// INSECURE - Never do this
await db.user.create({
  data: { password: plainPassword } // NO!
})
\`\`\`

### Never Expose Sensitive Data in Tokens
\`\`\`typescript
// BAD - Sensitive data in JWT
const token = jwt.sign({
  password: user.password,  // Never!
  ssn: user.ssn            // Never!
}, secret)

// GOOD - Minimal claims
const token = jwt.sign({
  sub: user.id,
  email: user.email
}, secret)
\`\`\``}</code></pre>
			</div>
		</section>

		<!-- Section 8: Testing Rules -->
		<section id="testing-rules" class="article-section">
			<h2>Testing Rules</h2>

			<p>
				Testing rules ensure consistent test structure and prevent common testing anti-patterns. These activate for test files only.
			</p>

			<div class="code-block">
				<div class="code-header">
					<span class="code-title">.cursor/rules/30-testing.md</span>
					<span class="code-lang">markdown</span>
				</div>
				<pre><code>{`---
description: "Testing patterns for Vitest, Jest, Playwright"
alwaysApply: false
globs: ["**/*.test.*", "**/*.spec.*", "**/tests/**", "**/__tests__/**"]
---

# Testing Rules

## Test Structure

### Describe-It Pattern
Use descriptive nested describes:

\`\`\`typescript
describe('UserService', () => {
  describe('createUser', () => {
    it('creates user with valid data', async () => {
      const user = await userService.create(validData)
      expect(user.email).toBe(validData.email)
    })

    it('throws error for duplicate email', async () => {
      await userService.create(validData)
      await expect(userService.create(validData))
        .rejects.toThrow('Email already exists')
    })
  })
})
\`\`\`

### Test Naming
Use clear, behavior-focused names:

\`\`\`typescript
// GOOD - Describes behavior
it('returns 401 when token is expired', ...)
it('sends welcome email after registration', ...)
it('prevents duplicate submissions within 1 second', ...)

// BAD - Vague or implementation-focused
it('works correctly', ...)
it('calls the API', ...)
it('test1', ...)
\`\`\`

## Mocking

### Mock External Services, Not Internal Logic
\`\`\`typescript
// GOOD - Mock external API
vi.mock('../services/stripe', () => ({
  createCharge: vi.fn().mockResolvedValue({ id: 'ch_123' })
}))

// BAD - Mock internal implementation details
vi.mock('../utils/validate', () => ({
  validateEmail: vi.fn().mockReturnValue(true) // Over-mocking
}))
\`\`\`

### Database Mocking Strategies
\`\`\`typescript
// Option 1: In-memory database (recommended for integration)
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  datasources: { db: { url: 'file:./test.db' } }
})

// Option 2: Mock specific queries (unit tests)
vi.mock('../db', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn()
    }
  }
}))
\`\`\`

## Assertions

### Use Specific Matchers
\`\`\`typescript
// GOOD - Specific assertions
expect(user).toHaveProperty('id')
expect(users).toHaveLength(5)
expect(result).toMatchObject({ name: 'Test', status: 'active' })

// BAD - Vague assertions
expect(user).toBeTruthy()
expect(users.length > 0).toBe(true)
\`\`\`

### Assert Error Cases
\`\`\`typescript
// Always test error paths
it('throws on invalid input', async () => {
  await expect(service.process(null))
    .rejects.toThrow('Input is required')
})

it('returns error for unauthorized access', async () => {
  const response = await request(app)
    .get('/api/admin')
    .set('Authorization', 'Bearer invalid')

  expect(response.status).toBe(401)
  expect(response.body.error).toBe('Unauthorized')
})
\`\`\`

## E2E Testing (Playwright)

### Page Object Pattern
\`\`\`typescript
// tests/pages/login-page.ts
export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/login')
  }

  async login(email: string, password: string) {
    await this.page.fill('[name="email"]', email)
    await this.page.fill('[name="password"]', password)
    await this.page.click('button[type="submit"]')
  }

  async expectError(message: string) {
    await expect(this.page.locator('.error')).toHaveText(message)
  }
}

// tests/auth.spec.ts
test('user can log in', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.goto()
  await loginPage.login('user@example.com', 'password')

  await expect(page).toHaveURL('/dashboard')
})
\`\`\`

## Test Data

### Use Factories
\`\`\`typescript
// tests/factories/user.ts
export function createUser(overrides = {}) {
  return {
    id: crypto.randomUUID(),
    email: \`test-\${Date.now()}@example.com\`,
    name: 'Test User',
    createdAt: new Date(),
    ...overrides
  }
}

// Usage
const admin = createUser({ role: 'admin' })
const inactiveUser = createUser({ status: 'inactive' })
\`\`\``}</code></pre>
			</div>
		</section>

		<!-- Section 9: Complete Stack Templates -->
		<section id="complete-templates" class="article-section">
			<h2>Complete Stack Templates</h2>

			<p>
				Here are production-ready cursor rules for the most popular full-stack combinations. Copy the entire set for your stack.
			</p>

			<div class="stack-grid">
				{#each stackTemplates as stack}
					<div class="stack-card">
						<div class="stack-header">
							<span class="stack-name">{stack.name}</span>
							<span class="stack-count">{stack.fileCount} files</span>
						</div>
						<p class="stack-description">{stack.description}</p>
					</div>
				{/each}
			</div>

			<h3>Next.js 15 + Supabase Complete Template</h3>

			<div class="code-block">
				<div class="code-header">
					<span class="code-title">.cursor/rules/00-project.md</span>
					<span class="code-lang">markdown</span>
				</div>
				<pre><code>{`---
description: "Project context - always applied"
alwaysApply: true
---

# Project: [Your App Name]

## Tech Stack
- Next.js 15 with App Router
- TypeScript strict mode
- Supabase for auth and database
- Tailwind CSS for styling
- Zod for validation

## Key Directories
- app/ - Next.js app router pages
- components/ - React components (ui/, forms/, layout/)
- lib/ - Utilities (supabase client, auth helpers)
- types/ - TypeScript type definitions

## Development Commands
- npm run dev - Start development server
- npm run build - Build for production
- npm run test - Run tests
- npm run lint - Run ESLint

## Important Patterns
- Use Server Components by default
- All database access through Supabase RLS
- Form handling with Server Actions
- Error boundaries for graceful failures`}</code></pre>
			</div>

			<div class="code-block">
				<div class="code-header">
					<span class="code-title">.cursor/rules/01-security.md</span>
					<span class="code-lang">markdown</span>
				</div>
				<pre><code>{`---
description: "Security rules - always enforced"
alwaysApply: true
---

# Security Rules

## Supabase Security

### Row-Level Security (RLS)
Every table MUST have RLS enabled. Never bypass RLS with service key in client code.

### Client-Side Queries
Use the anon key client for all browser queries:
\`\`\`typescript
import { createClient } from '@/lib/supabase/client'
const supabase = createClient() // Uses anon key
\`\`\`

### Server-Side with RLS
Server Components still respect RLS:
\`\`\`typescript
import { createClient } from '@/lib/supabase/server'
const supabase = await createClient()
// RLS still applies based on user session
\`\`\`

### Service Role (Admin Only)
Only use service role in trusted server contexts:
\`\`\`typescript
// ONLY in secure server code, never in components
import { createServiceClient } from '@/lib/supabase/admin'
const supabase = createServiceClient() // Bypasses RLS
\`\`\`

## Authentication
- Verify auth in every Server Action
- Never trust client-provided user IDs
- Use supabase.auth.getUser() not getSession()

## Input Validation
- Validate all inputs with Zod
- Sanitize before database operations
- Never construct SQL from user input`}</code></pre>
			</div>

			<h3>React + Node.js + PostgreSQL Template</h3>

			<div class="code-block">
				<div class="code-header">
					<span class="code-title">.cursor/rules/00-project.md (MERN-style)</span>
					<span class="code-lang">markdown</span>
				</div>
				<pre><code>{`---
description: "Full-stack React + Node.js project"
alwaysApply: true
---

# Project: [Your App Name]

## Architecture
- Frontend: React with Vite
- Backend: Express.js API
- Database: PostgreSQL with Prisma
- Auth: JWT tokens

## Directory Structure
\`\`\`
/
├── client/           # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── api/      # API client functions
│   └── ...
├── server/           # Express backend
│   ├── src/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── services/
│   │   └── db/
│   └── ...
└── shared/           # Shared types
\`\`\`

## API Conventions
- REST endpoints at /api/v1/*
- Consistent error responses
- JWT auth header: Bearer <token>

## Development
- npm run dev:client - Frontend dev server
- npm run dev:server - Backend dev server
- npm run dev - Both concurrently`}</code></pre>
			</div>
		</section>

		<!-- Section 10: Monorepo Patterns -->
		<section id="monorepo-patterns" class="article-section">
			<h2>Monorepo Patterns</h2>

			<p>
				Monorepos require careful rule organization to share common patterns while allowing package-specific overrides.
			</p>

			<div class="code-block">
				<div class="code-header">
					<span class="code-title">Monorepo Rule Structure</span>
					<span class="code-lang">shell</span>
				</div>
				<pre><code>{`monorepo/
├── .cursor/
│   └── rules/
│       ├── 00-monorepo.md         # Shared context
│       ├── 01-security.md         # Shared security rules
│       └── 02-typescript.md       # Shared TS config
├── packages/
│   ├── web/                       # Next.js app
│   │   └── .cursor/
│   │       └── rules/
│   │           └── 10-nextjs.md   # Package-specific
│   ├── api/                       # Express API
│   │   └── .cursor/
│   │       └── rules/
│   │           └── 10-express.md  # Package-specific
│   └── shared/                    # Shared utilities
│       └── .cursor/
│           └── rules/
│               └── 10-library.md  # Library patterns
└── ...`}</code></pre>
			</div>

			<h3>Root Monorepo Rules</h3>

			<div class="code-block">
				<div class="code-header">
					<span class="code-title">.cursor/rules/00-monorepo.md</span>
					<span class="code-lang">markdown</span>
				</div>
				<pre><code>{`---
description: "Monorepo-wide patterns"
alwaysApply: true
---

# Monorepo Rules

## Package Structure
- packages/web - Next.js frontend
- packages/api - Express API
- packages/shared - Shared types and utilities

## Import Rules
- Use workspace imports: @repo/shared
- Never relative imports across packages
- Shared types MUST be in packages/shared

## Dependencies
- Shared deps in root package.json
- Package-specific deps in package.json
- Use workspace:* for internal deps

## Commands
- npm run dev - Start all packages
- npm run build - Build all packages
- npm run test - Test all packages
- npm run lint - Lint all packages

## CI/CD
- Changes to shared/ trigger all package tests
- Package-specific changes only test that package`}</code></pre>
			</div>
		</section>

		<!-- Section 11: Best Practices -->
		<section id="best-practices" class="article-section">
			<h2>Best Practices</h2>

			<div class="priority-grid">
				{#each ruleCategories as category}
					<div class="priority-card" class:critical={category.priority === 'Critical'} class:high={category.priority === 'High'}>
						<div class="priority-header">
							<span class="priority-name">{category.name}</span>
							<span class="priority-badge" class:badge-critical={category.priority === 'Critical'} class:badge-high={category.priority === 'High'} class:badge-medium={category.priority === 'Medium'} class:badge-low={category.priority === 'Low'}>
								{category.priority}
							</span>
						</div>
						<p class="priority-description">{category.description}</p>
						<div class="priority-examples">
							{#each category.examples as example}
								<span class="example-item">{example}</span>
							{/each}
						</div>
					</div>
				{/each}
			</div>

			<h3>Rule Writing Guidelines</h3>

			<ol class="guidelines-list">
				<li>
					<strong>Show, don't tell.</strong> Include code examples for every rule. Cursor follows examples better than descriptions.
				</li>
				<li>
					<strong>Be specific.</strong> "Use parameterized queries" is better than "Write secure code."
				</li>
				<li>
					<strong>Include anti-patterns.</strong> Show what NOT to do alongside correct patterns.
				</li>
				<li>
					<strong>Keep rules focused.</strong> One file per concern, under 500 lines each.
				</li>
				<li>
					<strong>Use globs wisely.</strong> Only load rules when relevant to current files.
				</li>
				<li>
					<strong>Update incrementally.</strong> Add rules when you see repeated mistakes.
				</li>
				<li>
					<strong>Version control rules.</strong> Commit .cursor/rules/ to Git for team consistency.
				</li>
				<li>
					<strong>Prioritize security.</strong> Security rules should always apply.
				</li>
			</ol>
		</section>

		<!-- Section 12: Common Mistakes -->
		<section id="common-mistakes" class="article-section">
			<h2>Common Mistakes to Avoid</h2>

			<div class="mistakes-grid">
				<div class="mistake-card">
					<h4>One Giant File</h4>
					<p>A 2000-line .cursorrules file wastes context and confuses Cursor. Split into focused files.</p>
				</div>
				<div class="mistake-card">
					<h4>No Security Rules</h4>
					<p>Style rules without security rules leads to consistent but vulnerable code. Always include security.</p>
				</div>
				<div class="mistake-card">
					<h4>Too Abstract</h4>
					<p>"Write clean code" means nothing. Show specific patterns with before/after examples.</p>
				</div>
				<div class="mistake-card">
					<h4>Never Updating</h4>
					<p>Set-and-forget rules become stale. Update when you see repeated AI mistakes.</p>
				</div>
				<div class="mistake-card">
					<h4>Wrong alwaysApply</h4>
					<p>Everything on alwaysApply wastes context. Only security and project context should always apply.</p>
				</div>
				<div class="mistake-card">
					<h4>No Examples</h4>
					<p>Rules without code examples are ignored. Always show the exact pattern you want.</p>
				</div>
			</div>
		</section>

		<!-- FAQ Section -->
		<section id="faq" class="article-section">
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
				<a href="/kb/prompts/cursor-rules/" class="card card-interactive related-card">
					<div class="related-card-category">Guide</div>
					<div class="related-card-title">Cursor Rules: Complete Guide</div>
					<p class="related-card-description">Fundamentals of .cursorrules configuration</p>
				</a>
				<a href="/kb/prompts/awesome-cursor-rules/" class="card card-interactive related-card">
					<div class="related-card-category">Collection</div>
					<div class="related-card-title">Awesome Cursor Rules</div>
					<p class="related-card-description">150+ community templates with security additions</p>
				</a>
				<a href="/kb/prompts/claude-md/" class="card card-interactive related-card">
					<div class="related-card-category">Guide</div>
					<div class="related-card-title">CLAUDE.md Guide</div>
					<p class="related-card-description">Configure Claude Code with project instructions</p>
				</a>
				<a href="/kb/prompts/best-ai-coding-tools-2025/" class="card card-interactive related-card">
					<div class="related-card-category">Comparison</div>
					<div class="related-card-title">Best AI Coding Tools 2025</div>
					<p class="related-card-description">Claude Code + Cursor combo workflow</p>
				</a>
				<a href="/kb/vibe-coding/secure-vibe-coding-guide/" class="card card-interactive related-card">
					<div class="related-card-category">Pillar Guide</div>
					<div class="related-card-title">Secure Vibe Coding Guide</div>
					<p class="related-card-description">Ship fast without security nightmares</p>
				</a>
				<a href="/kb/security/vulnerabilities/sql-injection/" class="card card-interactive related-card">
					<div class="related-card-category">Security</div>
					<div class="related-card-title">SQL Injection Prevention</div>
					<p class="related-card-description">Detailed patterns for database security</p>
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

	.badge-pillar {
		background: linear-gradient(135deg, var(--green), var(--blue));
		color: white;
		font-weight: 600;
	}

	.stats-row {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
		margin: 1.5rem 0 0.5rem;
	}

	.stat-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-radius: 8px;
		padding: 1.25rem;
		text-align: center;
	}

	.stat-number {
		font-size: 1.75rem;
		font-weight: 700;
		color: var(--green);
	}

	.stat-label {
		font-size: 0.875rem;
		color: var(--text-secondary);
		margin-top: 0.25rem;
	}

	.stat-note {
		font-size: 0.875rem;
		color: var(--text-tertiary);
		text-align: center;
		margin-bottom: 2rem;
	}

	/* Table of Contents */
	.toc {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-radius: 8px;
		padding: 1.5rem;
		margin: 2rem 0;
	}

	.toc h2 {
		font-size: 1rem;
		margin: 0 0 1rem;
		color: var(--text-secondary);
	}

	.toc ol {
		margin: 0;
		padding-left: 1.25rem;
		columns: 2;
		column-gap: 2rem;
	}

	.toc li {
		margin-bottom: 0.5rem;
		break-inside: avoid;
	}

	.toc a {
		color: var(--text-primary);
		text-decoration: none;
	}

	.toc a:hover {
		color: var(--green);
	}

	/* Difference Grid */
	.difference-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5rem;
		margin: 1.5rem 0;
	}

	.difference-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-radius: 8px;
		padding: 1.5rem;
	}

	.difference-card.highlight {
		border-color: var(--green);
		background: linear-gradient(135deg, var(--bg-secondary), rgba(16, 185, 129, 0.05));
	}

	.difference-card h4 {
		margin: 0 0 1rem;
		font-size: 1.1rem;
	}

	.difference-card ul {
		margin: 0;
		padding-left: 1.25rem;
	}

	.difference-card li {
		margin-bottom: 0.5rem;
		color: var(--text-secondary);
	}

	/* Warning Box */
	.warning-box {
		background: rgba(245, 158, 11, 0.1);
		border: 1px solid var(--orange);
		border-radius: 8px;
		padding: 1rem 1.25rem;
		margin: 1.5rem 0;
	}

	.warning-box strong {
		color: var(--orange);
	}

	/* Stack Grid */
	.stack-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.stack-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-radius: 8px;
		padding: 1.25rem;
	}

	.stack-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.5rem;
	}

	.stack-name {
		font-weight: 600;
	}

	.stack-count {
		font-size: 0.75rem;
		color: var(--text-tertiary);
		background: var(--bg-tertiary);
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
	}

	.stack-description {
		color: var(--text-secondary);
		font-size: 0.9rem;
		margin: 0;
	}

	/* Priority Grid */
	.priority-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.priority-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-radius: 8px;
		padding: 1.25rem;
	}

	.priority-card.critical {
		border-left: 3px solid var(--red);
	}

	.priority-card.high {
		border-left: 3px solid var(--orange);
	}

	.priority-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.5rem;
	}

	.priority-name {
		font-weight: 600;
	}

	.priority-badge {
		font-size: 0.7rem;
		padding: 0.2rem 0.5rem;
		border-radius: 4px;
		text-transform: uppercase;
	}

	.badge-critical {
		background: var(--red);
		color: white;
	}

	.badge-high {
		background: var(--orange);
		color: white;
	}

	.badge-medium {
		background: var(--blue);
		color: white;
	}

	.badge-low {
		background: var(--gray-500);
		color: white;
	}

	.priority-description {
		color: var(--text-secondary);
		font-size: 0.9rem;
		margin: 0 0 0.75rem;
	}

	.priority-examples {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
	}

	.example-item {
		font-size: 0.75rem;
		color: var(--text-secondary);
		background: var(--bg-tertiary);
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
	}

	/* Guidelines List */
	.guidelines-list {
		padding-left: 1.5rem;
	}

	.guidelines-list li {
		margin-bottom: 1rem;
		line-height: 1.6;
	}

	/* Mistakes Grid */
	.mistakes-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.mistake-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-left: 3px solid var(--red);
		border-radius: 8px;
		padding: 1rem;
	}

	.mistake-card h4 {
		margin: 0 0 0.5rem;
		font-size: 0.95rem;
		color: var(--red);
	}

	.mistake-card p {
		margin: 0;
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.toc ol {
			columns: 1;
		}

		.mistakes-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 768px) {
		.stats-row {
			grid-template-columns: repeat(2, 1fr);
		}

		.difference-grid,
		.stack-grid,
		.priority-grid {
			grid-template-columns: 1fr;
		}

		.mistakes-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
