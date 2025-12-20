<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Cursor Rules for Next.js 15: Complete App Router Guide',
		description: 'Production-ready cursor rules for Next.js 15 App Router. Copy-paste .cursorrules for Server Components, Server Actions, route handlers, and security patterns.',
		url: '/kb/prompts/cursor-rules-nextjs/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Prompts', href: '/kb/prompts' },
		{ label: 'Cursor Rules Next.js' }
	];

	// FAQ data
	const faqs = [
		{
			question: 'What cursor rules do I need for Next.js 15?',
			answer: 'At minimum: Server Component vs Client Component patterns, Server Action security rules, route handler authentication, and data fetching conventions. The complete template in this guide covers all essential patterns for App Router development.'
		},
		{
			question: 'Should I use one .cursorrules file or multiple files for Next.js?',
			answer: 'For most Next.js projects, a single .cursorrules file works well. For larger projects or monorepos, split into .cursor/rules/ folder with separate files for components, api routes, and security. The folder approach lets Cursor load only relevant rules per file.'
		},
		{
			question: 'How do I prevent Cursor from adding use client everywhere?',
			answer: 'Add explicit rules stating Server Components are the default and list the specific cases requiring use client: useState, useEffect, event handlers, and browser APIs. Include examples of both patterns so Cursor understands the distinction.'
		},
		{
			question: 'What security rules are essential for Next.js cursor rules?',
			answer: 'Three critical rules: (1) Always authenticate Server Actions before processing, (2) Validate all inputs with Zod on the server, (3) Never expose sensitive data in client components. These prevent the most common vulnerabilities in AI-generated Next.js code.'
		},
		{
			question: 'Do cursor rules work with Next.js 14 or only 15?',
			answer: 'These rules work with Next.js 13, 14, and 15 since they all use App Router. The patterns are the same - Server Components, Server Actions, and route handlers. Adjust version-specific features like the new Form component in Next.js 15 as needed.'
		},
		{
			question: 'How do I handle environment variables in cursor rules?',
			answer: 'Add rules specifying: server-only secrets use process.env.SECRET, client-accessible values use NEXT_PUBLIC_ prefix, and never hardcode secrets. Include examples showing the correct pattern for database URLs, API keys, and public configuration.'
		}
	];

	// Rule sections for navigation
	const ruleSections = [
		{ name: 'Project Context', description: 'Tech stack, directory structure' },
		{ name: 'Server vs Client', description: 'Component rendering patterns' },
		{ name: 'Server Actions', description: 'Form handling and mutations' },
		{ name: 'Route Handlers', description: 'API routes and middleware' },
		{ name: 'Data Fetching', description: 'Loading and caching patterns' },
		{ name: 'Security Rules', description: 'Auth, validation, secrets' }
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
				<strong>Cursor rules for Next.js 15</strong> should enforce Server Components by default, secure Server Actions with authentication, and validate all inputs server-side. Copy the complete template below - it covers App Router patterns, security rules, and common pitfalls that trip up AI-generated code.
			</p>
		</div>

		<!-- Badge -->
		<span class="badge badge-nextjs">Next.js 15</span>

		<h1>Cursor Rules for Next.js 15: Complete App Router Guide</h1>

		<p class="intro">
			Next.js 15 with App Router is powerful but has specific patterns that AI tools often get wrong. Without proper cursor rules, you'll get Client Components everywhere, unsecured Server Actions, and data fetching in the wrong places. This guide provides production-ready rules you can copy directly into your project.
		</p>

		<!-- Stats Row -->
		<div class="stats-row">
			<div class="stat-card">
				<div class="stat-number">6</div>
				<div class="stat-label">Rule Sections</div>
			</div>
			<div class="stat-card">
				<div class="stat-number">100%</div>
				<div class="stat-label">Copy-Paste Ready</div>
			</div>
			<div class="stat-card">
				<div class="stat-number">15+</div>
				<div class="stat-label">Code Examples</div>
			</div>
			<div class="stat-card">
				<div class="stat-number">App Router</div>
				<div class="stat-label">Next.js 13-15</div>
			</div>
		</div>

		<!-- Rule Sections Overview -->
		<div class="sections-grid">
			{#each ruleSections as section}
				<div class="section-card">
					<div class="section-name">{section.name}</div>
					<div class="section-desc">{section.description}</div>
				</div>
			{/each}
		</div>

		<h2>Quick Start: Complete .cursorrules Template</h2>

		<p>
			Copy this entire template into your project root as <code>.cursorrules</code> or save as <code>.cursor/rules/nextjs.md</code>. It's ready to use immediately.
		</p>

		<div class="code-block">
			<div class="code-header">
				<span class="code-title">.cursorrules (Complete Next.js 15 Template)</span>
				<span class="code-lang">markdown</span>
			</div>
			<pre><code>{`# Next.js 15 Cursor Rules

## Project Context

This is a Next.js 15 project using App Router with TypeScript.

### Tech Stack
- Next.js 15 with App Router
- TypeScript (strict mode)
- React 19
- Tailwind CSS

### Directory Structure
\`\`\`
app/
├── layout.tsx           # Root layout
├── page.tsx             # Home page (/)
├── (auth)/              # Route group for auth pages
│   ├── login/page.tsx   # /login
│   └── signup/page.tsx  # /signup
├── dashboard/
│   ├── layout.tsx       # Dashboard layout
│   ├── page.tsx         # /dashboard
│   └── settings/page.tsx
├── api/                 # API route handlers
│   └── [...]/route.ts
components/
├── ui/                  # Reusable UI components
└── forms/               # Form components
lib/
├── db.ts                # Database client
├── auth.ts              # Auth utilities
└── utils.ts             # Helper functions
\`\`\`

---

## Server Components vs Client Components

### Default to Server Components
Components are Server Components by default. Do NOT add 'use client' unless required.

Server Components CAN:
- Fetch data directly (async/await)
- Access backend resources (database, file system)
- Keep sensitive logic server-side
- Reduce client bundle size

### Only Use 'use client' When Needed
Add 'use client' ONLY for these specific cases:
- useState, useEffect, useContext, or other React hooks
- Event handlers (onClick, onChange, onSubmit)
- Browser-only APIs (window, localStorage, navigator)
- Third-party client libraries that use hooks

### Correct Placement
'use client' goes at the VERY TOP of the file, before imports:

\`\`\`tsx
'use client'

import { useState } from 'react'
// ... rest of imports
\`\`\`

### Examples

SERVER COMPONENT (default - no directive needed):
\`\`\`tsx
// app/users/page.tsx
import { db } from '@/lib/db'

export default async function UsersPage() {
  const users = await db.user.findMany()

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}
\`\`\`

CLIENT COMPONENT (only when hooks/events needed):
\`\`\`tsx
'use client'

import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  )
}
\`\`\`

### Common Mistakes to Avoid
- Do NOT add 'use client' just because a parent is a Client Component
- Do NOT add 'use client' for components that only receive and display props
- Do NOT fetch data in Client Components - fetch in Server Components and pass as props

---

## Server Actions

### Always Authenticate First
EVERY Server Action must verify authentication BEFORE processing.

\`\`\`tsx
async function createPost(formData: FormData) {
  'use server'

  // Step 1: ALWAYS authenticate first
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  // Step 2: Validate input
  const title = formData.get('title')
  const content = formData.get('content')

  const validated = postSchema.safeParse({ title, content })
  if (!validated.success) {
    return { error: validated.error.flatten() }
  }

  // Step 3: Process the action
  await db.post.create({
    data: {
      ...validated.data,
      authorId: session.user.id
    }
  })

  revalidatePath('/posts')
}
\`\`\`

### Inline vs Module Server Actions
Prefer inline 'use server' for form-specific actions:
\`\`\`tsx
export default function NewPostForm() {
  async function handleSubmit(formData: FormData) {
    'use server'
    // Action logic here
  }

  return <form action={handleSubmit}>...</form>
}
\`\`\`

Use separate files for reusable actions:
\`\`\`tsx
// lib/actions/posts.ts
'use server'

export async function createPost(formData: FormData) { ... }
export async function updatePost(id: string, formData: FormData) { ... }
export async function deletePost(id: string) { ... }
\`\`\`

### Input Validation with Zod
ALWAYS validate Server Action inputs:

\`\`\`tsx
import { z } from 'zod'

const postSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1).max(10000),
})

async function createPost(formData: FormData) {
  'use server'

  const result = postSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
  })

  if (!result.success) {
    return { error: result.error.flatten() }
  }

  // Safe to use result.data
}
\`\`\`

---

## Route Handlers (API Routes)

### File Convention
API routes live in app/api/ with route.ts files:
\`\`\`
app/api/
├── users/
│   ├── route.ts           # GET /api/users, POST /api/users
│   └── [id]/
│       └── route.ts       # GET/PATCH/DELETE /api/users/:id
└── posts/
    └── route.ts
\`\`\`

### HTTP Methods
Export named functions matching HTTP methods:

\`\`\`tsx
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const users = await db.user.findMany()
  return NextResponse.json(users)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const user = await db.user.create({ data: body })
  return NextResponse.json(user, { status: 201 })
}
\`\`\`

### Always Authenticate Route Handlers
\`\`\`tsx
export async function GET(request: NextRequest) {
  // Check auth first
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  // Process authenticated request
  const data = await db.user.findUnique({
    where: { id: session.user.id }
  })

  return NextResponse.json(data)
}
\`\`\`

### Dynamic Route Parameters
Access params via the second argument:

\`\`\`tsx
// app/api/users/[id]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const user = await db.user.findUnique({ where: { id } })

  if (!user) {
    return NextResponse.json(
      { error: 'Not found' },
      { status: 404 }
    )
  }

  return NextResponse.json(user)
}
\`\`\`

---

## Data Fetching

### Fetch in Server Components
Data fetching belongs in Server Components, NOT Client Components:

\`\`\`tsx
// CORRECT - Server Component fetches data
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await db.product.findUnique({ where: { id } })

  return <ProductDisplay product={product} />
}

// WRONG - Don't fetch in Client Components
'use client'
export function ProductPage({ id }: { id: string }) {
  const [product, setProduct] = useState(null)

  useEffect(() => {
    fetch(\`/api/products/\${id}\`).then(r => r.json()).then(setProduct)
  }, [id])

  return <ProductDisplay product={product} />
}
\`\`\`

### Parallel Data Fetching
Fetch multiple resources in parallel:

\`\`\`tsx
export default async function DashboardPage() {
  // Parallel fetching - both start immediately
  const [user, posts, notifications] = await Promise.all([
    db.user.findUnique({ where: { id: userId } }),
    db.post.findMany({ where: { authorId: userId } }),
    db.notification.findMany({ where: { userId, read: false } })
  ])

  return (
    <Dashboard
      user={user}
      posts={posts}
      notifications={notifications}
    />
  )
}
\`\`\`

### Loading States
Use loading.tsx for Suspense boundaries:

\`\`\`tsx
// app/dashboard/loading.tsx
export default function Loading() {
  return <DashboardSkeleton />
}
\`\`\`

### Error Handling
Use error.tsx for error boundaries:

\`\`\`tsx
// app/dashboard/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong</h2>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
\`\`\`

---

## Security Rules (CRITICAL)

### Authentication Pattern
Check auth at the start of EVERY protected operation:

\`\`\`tsx
// lib/auth.ts
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export async function requireAuth() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    redirect('/login')
  }
  return session
}

// Usage in Server Component
export default async function ProtectedPage() {
  const session = await requireAuth()
  // User is guaranteed authenticated here
}
\`\`\`

### Input Validation
NEVER trust user input. Always validate server-side:

\`\`\`tsx
import { z } from 'zod'

// Define schema
const updateProfileSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  bio: z.string().max(500).optional(),
})

// Validate in Server Action
async function updateProfile(formData: FormData) {
  'use server'

  const session = await requireAuth()

  const result = updateProfileSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    bio: formData.get('bio'),
  })

  if (!result.success) {
    return { error: 'Invalid input', details: result.error.flatten() }
  }

  await db.user.update({
    where: { id: session.user.id },
    data: result.data
  })
}
\`\`\`

### Environment Variables
- Server secrets: \`process.env.DATABASE_URL\`
- Client-safe values: \`process.env.NEXT_PUBLIC_API_URL\`
- NEVER hardcode secrets
- NEVER expose server env vars to client

\`\`\`tsx
// CORRECT
const dbUrl = process.env.DATABASE_URL // Server only

// CORRECT - for client-accessible values
const apiUrl = process.env.NEXT_PUBLIC_API_URL

// WRONG - Never do this
const secret = 'sk_live_abc123' // Hardcoded secret
\`\`\`

### Authorization (Beyond Authentication)
Check permissions, not just login status:

\`\`\`tsx
async function deletePost(postId: string) {
  'use server'

  const session = await requireAuth()

  // Verify ownership
  const post = await db.post.findUnique({ where: { id: postId } })

  if (!post) {
    throw new Error('Post not found')
  }

  if (post.authorId !== session.user.id) {
    throw new Error('Forbidden')
  }

  await db.post.delete({ where: { id: postId } })
}
\`\`\`

---

## TypeScript Patterns

### Strict Mode Required
Enable strict TypeScript in tsconfig.json:
\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true
  }
}
\`\`\`

### Component Props
Use interfaces for props:
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

### No 'any' Types
Never use 'any'. Use 'unknown' and narrow:
\`\`\`tsx
// WRONG
function process(data: any) { ... }

// CORRECT
function process(data: unknown) {
  if (typeof data === 'string') {
    // data is string here
  }
}
\`\`\`

---

## Common Patterns

### Revalidation
Use revalidatePath or revalidateTag after mutations:
\`\`\`tsx
import { revalidatePath } from 'next/cache'

async function createPost(formData: FormData) {
  'use server'

  await db.post.create({ ... })

  revalidatePath('/posts')  // Revalidate the posts page
}
\`\`\`

### Redirects
Use redirect() for navigation in Server Components/Actions:
\`\`\`tsx
import { redirect } from 'next/navigation'

async function handleLogin(formData: FormData) {
  'use server'

  const success = await authenticate(formData)

  if (success) {
    redirect('/dashboard')
  }

  return { error: 'Invalid credentials' }
}
\`\`\`

### Metadata
Define metadata in page.tsx or layout.tsx:
\`\`\`tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your personal dashboard',
}

export default function DashboardPage() { ... }
\`\`\``}</code></pre>
		</div>

		<h2>Section-by-Section Breakdown</h2>

		<p>
			Let's examine each section of the cursor rules and why it matters for AI-generated code quality.
		</p>

		<h3>Project Context Rules</h3>

		<p>
			The project context section tells Cursor what you're building. Without it, AI makes assumptions that may not match your architecture. Include your tech stack, directory structure, and key patterns.
		</p>

		<div class="tip-box">
			<strong>Pro tip:</strong> Update project context when you add major dependencies or change architecture. Stale context leads to outdated patterns.
		</div>

		<h3>Server vs Client Component Rules</h3>

		<p>
			This is the most common source of errors in AI-generated Next.js code. Without explicit rules, Cursor tends to add <code>'use client'</code> everywhere because it's "safer." The rules above establish Server Components as the default and list the specific cases requiring Client Components.
		</p>

		<p>
			The examples section is critical - Cursor follows examples better than descriptions. By showing both patterns side-by-side, you establish the correct mental model.
		</p>

		<h3>Server Action Security</h3>

		<p>
			Server Actions are direct database access points. If you don't authenticate them, anyone can call them directly. The three-step pattern (authenticate → validate → process) catches the most common vulnerabilities in <a href="/kb/vibe-coding/secure-vibe-coding-guide/">AI-generated Next.js code</a>.
		</p>

		<h3>Route Handler Patterns</h3>

		<p>
			API routes in App Router use a different convention than Pages Router. The rules cover the new file-based routing, HTTP method exports, and parameter handling in Next.js 15 where params are now a Promise.
		</p>

		<h3>Data Fetching Placement</h3>

		<p>
			AI tools often generate data fetching in Client Components using useEffect, which defeats the purpose of Server Components. The rules explicitly state that data fetching belongs in Server Components, with examples showing the correct pattern.
		</p>

		<h3>Security Fundamentals</h3>

		<p>
			The security section covers the patterns that prevent <a href="/kb/security/vulnerabilities/missing-auth/">missing authentication</a>, <a href="/kb/security/vulnerabilities/sql-injection/">injection attacks</a>, and <a href="/kb/security/vulnerabilities/hardcoded-secrets/">hardcoded secrets</a>. These rules should be non-negotiable in every Next.js project. For deeper security patterns, see our <a href="/kb/prompts/cursor-rules-fullstack/">Full-Stack Cursor Rules Guide</a>.
		</p>

		<h2>Folder-Based Setup (Alternative)</h2>

		<p>
			For larger projects, split rules into separate files in <code>.cursor/rules/</code>:
		</p>

		<div class="code-block">
			<div class="code-header">
				<span class="code-title">Folder Structure</span>
				<span class="code-lang">shell</span>
			</div>
			<pre><code>{`project/
├── .cursor/
│   └── rules/
│       ├── 00-project.md        # Always on: project context
│       ├── 01-security.md       # Always on: security rules
│       ├── 10-components.md     # Globs: **/*.tsx
│       ├── 20-api.md            # Globs: **/api/**
│       └── 30-actions.md        # Globs: **/actions/**
└── ...`}</code></pre>
		</div>

		<p>
			Each file uses frontmatter to control when it activates:
		</p>

		<div class="code-block">
			<div class="code-header">
				<span class="code-title">.cursor/rules/10-components.md</span>
				<span class="code-lang">markdown</span>
			</div>
			<pre><code>{`---
description: "Next.js component patterns"
alwaysApply: false
globs: ["**/*.tsx", "**/components/**"]
---

# Component Rules

[Component-specific rules here...]`}</code></pre>
		</div>

		<h2>Common Issues This Template Fixes</h2>

		<div class="issues-grid">
			<div class="issue-card">
				<div class="issue-problem">Cursor adds 'use client' everywhere</div>
				<div class="issue-solution">Explicit rules establish Server Components as default with specific Client Component triggers</div>
			</div>
			<div class="issue-card">
				<div class="issue-problem">Server Actions without auth</div>
				<div class="issue-solution">Three-step pattern enforces authenticate → validate → process</div>
			</div>
			<div class="issue-card">
				<div class="issue-problem">Data fetching in useEffect</div>
				<div class="issue-solution">Examples show Server Component data fetching as the correct pattern</div>
			</div>
			<div class="issue-card">
				<div class="issue-problem">Wrong API route format</div>
				<div class="issue-solution">File convention and HTTP method exports match App Router patterns</div>
			</div>
			<div class="issue-card">
				<div class="issue-problem">Missing input validation</div>
				<div class="issue-solution">Zod patterns shown for every data entry point</div>
			</div>
			<div class="issue-card">
				<div class="issue-problem">Hardcoded environment values</div>
				<div class="issue-solution">Clear rules for server vs client env vars</div>
			</div>
		</div>

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
				<a href="/kb/prompts/cursor-rules-fullstack/" class="card card-interactive related-card">
					<div class="related-card-category">Pillar Guide</div>
					<div class="related-card-title">Full-Stack Cursor Rules</div>
					<p class="related-card-description">Complete rules for multi-layer applications</p>
				</a>
				<a href="/kb/prompts/supabase-cursor-rules/" class="card card-interactive related-card">
					<div class="related-card-category">Stack Guide</div>
					<div class="related-card-title">Supabase Cursor Rules</div>
					<p class="related-card-description">Database and auth patterns for Supabase</p>
				</a>
				<a href="/kb/prompts/cursor-rules/" class="card card-interactive related-card">
					<div class="related-card-category">Guide</div>
					<div class="related-card-title">Cursor Rules Basics</div>
					<p class="related-card-description">Fundamentals of .cursorrules configuration</p>
				</a>
				<a href="/kb/security/stacks/nextjs-supabase/" class="card card-interactive related-card">
					<div class="related-card-category">Security</div>
					<div class="related-card-title">Next.js + Supabase Security</div>
					<p class="related-card-description">Stack-specific security patterns</p>
				</a>
				<a href="/kb/vibe-coding-tools/cursor/" class="card card-interactive related-card">
					<div class="related-card-category">Tool</div>
					<div class="related-card-title">Cursor AI Guide</div>
					<p class="related-card-description">Complete guide to using Cursor</p>
				</a>
				<a href="/kb/prompts/best-ai-coding-tools-2025/" class="card card-interactive related-card">
					<div class="related-card-category">Comparison</div>
					<div class="related-card-title">Best AI Coding Tools 2025</div>
					<p class="related-card-description">Compare Cursor, Claude Code, and more</p>
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

	.badge-nextjs {
		background: linear-gradient(135deg, #000000, #333333);
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

	/* Sections Grid */
	.sections-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
		margin: 1.5rem 0 2rem;
	}

	.section-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-radius: 8px;
		padding: 1rem;
	}

	.section-name {
		font-weight: 600;
		margin-bottom: 0.25rem;
	}

	.section-desc {
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	/* Tip Box */
	.tip-box {
		background: rgba(16, 185, 129, 0.1);
		border: 1px solid var(--green);
		border-radius: 8px;
		padding: 1rem 1.25rem;
		margin: 1.5rem 0;
	}

	.tip-box strong {
		color: var(--green);
	}

	/* Issues Grid */
	.issues-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.issue-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-radius: 8px;
		padding: 1.25rem;
	}

	.issue-problem {
		font-weight: 600;
		color: var(--red);
		margin-bottom: 0.5rem;
		font-size: 0.95rem;
	}

	.issue-solution {
		color: var(--text-secondary);
		font-size: 0.9rem;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.stats-row {
			grid-template-columns: repeat(2, 1fr);
		}

		.sections-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.issues-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 480px) {
		.sections-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
