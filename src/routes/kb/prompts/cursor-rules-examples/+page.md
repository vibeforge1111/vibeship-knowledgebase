# Cursor Rules Examples: 20+ Templates for Every Stack

<div class="quick-answer">
<strong>Copy-paste Cursor rules for your stack.</strong> Each template includes security rules, coding standards, and best practices. Works with <code>.cursor/rules/</code> or legacy <code>.cursorrules</code> file. Choose your stack, customize, and start building securely.
</div>

## What Makes a Great Cursor Rule?

A great Cursor rule is **specific, actionable, and security-aware**. Instead of vague instructions like "write clean code," effective rules specify exact patterns: "Use parameterized queries for all database operations" or "Never store tokens in localStorage."

The best Cursor rules combine three elements: **framework patterns** (how to structure code in your stack), **security defaults** (preventing vulnerabilities before they happen), and **code quality standards** (TypeScript strict mode, error handling, testing). Each template below follows this formula, giving you production-ready rules you can paste and customize immediately.

For complete guidance on creating and organizing Cursor rules, see our [Complete Cursor Rules Guide](/kb/prompts/cursor-rules/).

## Next.js Cursor Rules (Complete Template)

This template covers **Next.js 14+ with App Router, Server Components, and Server Actions**. It includes authentication patterns, database security, and production best practices.

```markdown
---
description: "Next.js 14+ App Router with security defaults"
alwaysApply: true
globs:
  - "app/**/*.tsx"
  - "app/**/*.ts"
---

# Next.js App Router Rules

## Component Patterns

- Use Server Components by default. Only add 'use client' when needed for interactivity, hooks, or browser APIs.
- File naming: page.tsx (routes), layout.tsx (layouts), loading.tsx (suspense), error.tsx (boundaries).
- Organize by feature: app/(auth)/login/page.tsx, app/(dashboard)/settings/page.tsx.

## Server Actions Security

- ✅ ALWAYS validate inputs in Server Actions using Zod schemas.
- ✅ ALWAYS check authentication/authorization at the START of Server Actions.
- ❌ NEVER trust client-provided IDs—verify ownership before mutations.
- ❌ NEVER expose sensitive data in Server Action return values.

Example:
```typescript
// ✅ SECURE Server Action
'use server'

import { z } from 'zod'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

const updateProfileSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email()
})

export async function updateProfile(formData: FormData) {
  // 1. Check auth FIRST
  const session = await auth()
  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  // 2. Validate input
  const data = updateProfileSchema.parse({
    name: formData.get('name'),
    email: formData.get('email')
  })

  // 3. Use parameterized query
  await db.execute(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [data.name, data.email, session.user.id]
  )

  return { success: true }
}
```

## Database Security

- ✅ ALWAYS use parameterized queries or ORM methods (Prisma, Drizzle).
- ❌ NEVER concatenate user input into SQL strings.
- Use Prisma for type safety: `db.user.findUnique({ where: { id: userId } })`.

## Authentication Patterns

- Use NextAuth.js or Clerk for authentication.
- Store sessions in httpOnly cookies, never localStorage.
- Protect API routes: Check `await auth()` at route start.
- Use middleware for route protection:

```typescript
// middleware.ts
import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
```

## Environment Variables

- Prefix public vars with `NEXT_PUBLIC_`.
- Never commit `.env.local` to git.
- Use `process.env.VAR_NAME` in Server Components only.
- Validate env vars at startup:

```typescript
// lib/env.ts
import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  NEXTAUTH_URL: z.string().url()
})

export const env = envSchema.parse(process.env)
```

## Error Handling

- Use error boundaries for client errors.
- Return user-friendly messages, never stack traces.
- Log errors server-side with structured logging.

## TypeScript

- Use strict mode in tsconfig.json.
- Prefer interfaces over types for object shapes.
- Use React.FC sparingly—explicit props types preferred.
```

## React Cursor Rules (Complete Template)

This template focuses on **React component patterns, hooks best practices, and XSS prevention**. Use with Create React App, Vite, or any React setup.

```markdown
---
description: "React component patterns with security defaults"
alwaysApply: true
globs:
  - "src/**/*.tsx"
  - "src/**/*.jsx"
---

# React Component Rules

## Component Patterns

- Functional components only. No class components.
- One component per file. Export default at bottom.
- Props interfaces at top: `interface ButtonProps { ... }`.
- Organize by feature: `src/features/auth/LoginForm.tsx`.

## Hooks Best Practices

- Custom hooks start with `use`: `useUserProfile()`.
- Dependencies arrays must be exhaustive—fix ESLint warnings.
- Avoid inline object/array dependencies:

```typescript
// ❌ BAD: Creates new object every render
useEffect(() => {
  fetchData({ id: userId })
}, [{ id: userId }]) // New object every time

// ✅ GOOD: Primitive dependency
useEffect(() => {
  fetchData({ id: userId })
}, [userId]) // Stable primitive
```

## XSS Prevention

- ✅ React escapes values by default. Use `{variable}` safely.
- ❌ NEVER use `dangerouslySetInnerHTML` without sanitization.
- If you MUST render HTML, use DOMPurify:

```typescript
import DOMPurify from 'dompurify'

// ✅ SAFE: Sanitized HTML
function RichContent({ html }: { html: string }) {
  const clean = DOMPurify.sanitize(html)
  return <div dangerouslySetInnerHTML={{ __html: clean }} />
}

// ❌ UNSAFE: Direct injection
function UnsafeContent({ html }: { html: string }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} /> // XSS!
}
```

## State Management

- Use `useState` for local component state.
- Use `useContext` for shared state across 2-3 components.
- Use Zustand/Redux for global app state.
- Never mutate state directly:

```typescript
// ❌ BAD: Direct mutation
const addItem = () => {
  items.push(newItem) // Mutates array
  setItems(items)
}

// ✅ GOOD: Immutable update
const addItem = () => {
  setItems([...items, newItem])
}
```

## API Calls

- Use React Query for server state.
- Handle loading, error, success states.
- Validate API responses with Zod:

```typescript
import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email()
})

function useUser(userId: string) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const res = await fetch(`/api/users/${userId}`)
      const data = await res.json()
      return userSchema.parse(data) // Validates response
    }
  })
}
```

## Form Handling

- Use React Hook Form for forms.
- Integrate with Zod for validation.
- Never trust client-side validation alone—validate server-side too.

## TypeScript

- Props interfaces, not inline types.
- Explicit return types for complex functions.
- No `any` types. Use `unknown` if truly dynamic.

## Performance

- Memoize expensive computations with `useMemo`.
- Memoize callback props with `useCallback`.
- Use React.lazy for code splitting.
```

## TypeScript Cursor Rules (Complete Template)

This template enforces **strict TypeScript with no escape hatches**. Use for any TypeScript project.

```markdown
---
description: "Strict TypeScript with Zod validation"
alwaysApply: true
globs:
  - "**/*.ts"
  - "**/*.tsx"
---

# TypeScript Strict Rules

## tsconfig.json Requirements

Your tsconfig.json MUST include:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "exactOptionalPropertyTypes": true
  }
}
```

## Type Safety Rules

- ❌ NEVER use `any`. Ban it in ESLint.
- ❌ NEVER use `as any` or `as unknown as T`.
- ❌ NEVER use `@ts-ignore` or `@ts-expect-error` without a ticket reference.
- ✅ Use `unknown` for truly dynamic data, then validate.

## Zod Schema Patterns

Use Zod for all external data: API responses, user input, environment variables.

```typescript
// Schema definition
const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  role: z.enum(['admin', 'user']),
  createdAt: z.coerce.date() // Coerce string to Date
})

type User = z.infer<typeof userSchema> // Derive type from schema

// API handler
async function getUser(id: string): Promise<User> {
  const res = await fetch(`/api/users/${id}`)
  const data = await res.json()
  return userSchema.parse(data) // Runtime validation
}
```

## Type Inference

Let TypeScript infer when obvious:

```typescript
// ✅ GOOD: Inferred
const count = 0 // number
const users = [] // never[] - needs type if empty!
const users: User[] = [] // Better

// ❌ BAD: Redundant
const count: number = 0
```

## Function Types

Always type function parameters. Infer return types unless complex:

```typescript
// ✅ GOOD: Parameters typed
function greet(name: string) {
  return `Hello, ${name}` // Return type inferred
}

// ✅ GOOD: Complex return typed
function fetchUsers(): Promise<User[]> {
  return api.get('/users').then(userSchema.array().parse)
}
```

## Null Handling

- Use `?.` optional chaining.
- Use `??` nullish coalescing.
- Never assume non-null without checking:

```typescript
// ❌ BAD: Assumes user exists
function getEmail(user: User | null) {
  return user.email // Error if null
}

// ✅ GOOD: Safe access
function getEmail(user: User | null) {
  return user?.email ?? 'No email'
}
```

## Generic Constraints

Constrain generics when possible:

```typescript
// ❌ TOO LOOSE
function getId<T>(item: T) {
  return item.id // Error: T might not have id
}

// ✅ CONSTRAINED
function getId<T extends { id: string }>(item: T) {
  return item.id // Safe
}
```

## Import Organization

```typescript
// 1. External dependencies
import { useState } from 'react'
import { z } from 'zod'

// 2. Internal modules
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'

// 3. Types
import type { User } from '@/types'
```
```

## Python Cursor Rules (Complete Template)

This template covers **modern Python with type hints, FastAPI/Django patterns, and SQL injection prevention**.

```markdown
---
description: "Python with type hints and security defaults"
alwaysApply: true
globs:
  - "**/*.py"
---

# Python Best Practices

## Type Hints (Required)

- Type hint ALL function signatures.
- Type hint complex variables.
- Use modern syntax: `list[str]` not `List[str]` (Python 3.9+).

```python
# ✅ GOOD: Fully typed
def get_user(user_id: int) -> dict[str, str | int]:
    return {"id": user_id, "name": "Alice"}

# ❌ BAD: No types
def get_user(user_id):
    return {"id": user_id, "name": "Alice"}
```

## SQL Injection Prevention

- ✅ ALWAYS use parameterized queries.
- ❌ NEVER use f-strings or `.format()` for SQL.

```python
import psycopg2

# ❌ VULNERABLE: f-string injection
def get_user_unsafe(user_id: str) -> dict:
    cursor.execute(f"SELECT * FROM users WHERE id = {user_id}")
    return cursor.fetchone()

# ✅ SECURE: Parameterized query
def get_user_safe(user_id: str) -> dict:
    cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
    return cursor.fetchone()
```

## FastAPI Patterns

```python
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from typing import Annotated

app = FastAPI()

# Pydantic models for validation
class User(BaseModel):
    email: EmailStr
    name: str

class CreateUser(BaseModel):
    email: EmailStr
    name: str
    password: str  # Will be hashed

# Dependency for auth
async def get_current_user(token: str) -> User:
    # Validate token, return user
    pass

# Route with validation and auth
@app.post("/users")
async def create_user(
    user: CreateUser,
    current_user: Annotated[User, Depends(get_current_user)]
) -> User:
    # Pydantic validates input automatically
    # Hash password before storing
    hashed_pw = hash_password(user.password)
    # Store in DB with parameterized query
    return created_user
```

## Django Patterns

```python
from django.db import models
from django.contrib.auth.models import AbstractUser

# ✅ Use ORM, never raw SQL
class User(AbstractUser):
    email = models.EmailField(unique=True)

    class Meta:
        db_table = 'users'

# ✅ SECURE: ORM prevents injection
def get_user(user_id: int) -> User | None:
    return User.objects.filter(id=user_id).first()

# ❌ AVOID: Raw SQL unless absolutely necessary
def get_user_raw(user_id: int) -> User | None:
    return User.objects.raw(
        "SELECT * FROM users WHERE id = %s",
        [user_id]
    )[0]
```

## Environment Variables

```python
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str
    secret_key: str
    debug: bool = False

    class Config:
        env_file = ".env"

settings = Settings()  # Validates on import
```

## Error Handling

```python
# Specific exceptions
try:
    user = get_user(user_id)
except UserNotFoundError as e:
    logger.error(f"User {user_id} not found", exc_info=True)
    raise HTTPException(status_code=404, detail="User not found")
except Exception as e:
    logger.error(f"Unexpected error", exc_info=True)
    raise HTTPException(status_code=500, detail="Internal error")
```

## Virtual Environment

- ALWAYS use venv or poetry.
- Pin exact versions in requirements.txt.
- Use `python -m pip` not `pip` directly.

## Code Quality

- Use Black for formatting.
- Use Ruff for linting.
- Use mypy for type checking.
- Max line length: 88 (Black default).
```

## Security-First Cursor Rules (Universal)

This **universal security template** works with any language or framework. Use it alongside stack-specific rules.

```markdown
---
description: "Universal security rules for all code"
alwaysApply: true
---

# Security-First Rules

## SQL Injection Prevention

- ✅ ALWAYS use parameterized queries or ORM methods.
- ❌ NEVER concatenate user input into SQL strings.

```javascript
// ❌ VULNERABLE
const query = `SELECT * FROM users WHERE email = '${userEmail}'`

// ✅ SECURE
const query = 'SELECT * FROM users WHERE email = $1'
db.query(query, [userEmail])
```

## Authentication & Authorization

- ✅ Check authentication at the START of protected endpoints.
- ✅ Verify ownership before mutations: "Does this user own this resource?"
- ❌ NEVER trust client-provided IDs for authorization.

```typescript
// ❌ VULNERABLE: Trusts client ID
async function deletePost(postId: string) {
  await db.delete('posts', postId) // Anyone can delete any post!
}

// ✅ SECURE: Verifies ownership
async function deletePost(postId: string, userId: string) {
  const post = await db.findOne('posts', { id: postId })
  if (post.authorId !== userId) {
    throw new Error('Unauthorized')
  }
  await db.delete('posts', postId)
}
```

## Input Validation

- ✅ Use Zod (TypeScript) or Pydantic (Python) for validation.
- ✅ Validate types, length, format, allowed values.
- ❌ NEVER trust client-side validation alone.

```typescript
import { z } from 'zod'

const emailSchema = z.string().email().max(255)
const passwordSchema = z.string().min(12).max(128)

const signupSchema = z.object({
  email: emailSchema,
  password: passwordSchema
})

// Validate all inputs
const data = signupSchema.parse(req.body) // Throws on invalid
```

## Secret Handling

- ❌ NEVER hardcode secrets in code.
- ❌ NEVER commit `.env` files to git.
- ✅ Use environment variables for secrets.
- ✅ Validate secrets at startup:

```typescript
// .env (gitignored)
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-here

// Validate at startup
import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32)
})

export const env = envSchema.parse(process.env)
```

## Path Traversal Prevention

- ✅ Validate file paths before accessing filesystem.
- ❌ NEVER concatenate user input directly into paths.

```typescript
import path from 'path'

// ❌ VULNERABLE: User can access ../../../etc/passwd
function readFile(filename: string) {
  return fs.readFileSync(`./uploads/${filename}`)
}

// ✅ SECURE: Resolves to absolute path and validates
function readFile(filename: string) {
  const uploadsDir = path.resolve('./uploads')
  const filePath = path.resolve(uploadsDir, filename)

  // Ensure resolved path is still inside uploadsDir
  if (!filePath.startsWith(uploadsDir)) {
    throw new Error('Invalid path')
  }

  return fs.readFileSync(filePath)
}
```

## XSS Prevention

- ✅ React/Vue escape by default—use `{variable}` safely.
- ❌ NEVER use `dangerouslySetInnerHTML` / `v-html` without sanitization.
- ✅ Use DOMPurify when rendering user HTML.

## Session Management

- ✅ Use httpOnly, secure cookies for session tokens.
- ❌ NEVER store tokens in localStorage (XSS risk).
- ✅ Set SameSite=Lax or Strict.

```typescript
// ✅ SECURE: httpOnly cookie
res.cookie('session', token, {
  httpOnly: true,
  secure: true, // HTTPS only
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
})

// ❌ INSECURE: localStorage
localStorage.setItem('token', token) // XSS can steal this!
```

## Error Messages

- ✅ Return generic errors to users.
- ❌ NEVER expose stack traces, database errors, or internal paths.
- ✅ Log detailed errors server-side.

```typescript
try {
  await db.query(...)
} catch (error) {
  logger.error('Database error', { error, userId }) // Server log
  return { error: 'Something went wrong' } // User sees this
}
```
```

## Supabase Cursor Rules (Backend Template)

This template covers **Supabase auth, Row Level Security (RLS), and Edge Functions**.

```markdown
---
description: "Supabase patterns with RLS enforcement"
alwaysApply: true
globs:
  - "**/*.ts"
  - "supabase/**/*.sql"
---

# Supabase Best Practices

## Row Level Security (RLS)

- ✅ ENABLE RLS on ALL tables.
- ✅ Create policies for every operation (SELECT, INSERT, UPDATE, DELETE).
- ❌ NEVER use service_role key in client code.

```sql
-- Enable RLS on table
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only read their own posts
CREATE POLICY "Users can view own posts"
ON posts FOR SELECT
USING (auth.uid() = user_id);

-- Policy: Users can only insert posts as themselves
CREATE POLICY "Users can create own posts"
ON posts FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Policy: Users can only update their own posts
CREATE POLICY "Users can update own posts"
ON posts FOR UPDATE
USING (auth.uid() = user_id);
```

## Auth Helpers

Use `@supabase/ssr` for server-side auth:

```typescript
// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        }
      }
    }
  )
}

// Server Action or API route
export async function getUser() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  return user
}
```

## Database Types

Generate TypeScript types from your schema:

```bash
# Generate types
npx supabase gen types typescript --project-id your-project > types/database.ts
```

```typescript
// Use generated types
import type { Database } from '@/types/database'

type Post = Database['public']['Tables']['posts']['Row']
type PostInsert = Database['public']['Tables']['posts']['Insert']
type PostUpdate = Database['public']['Tables']['posts']['Update']

// Type-safe query
const { data, error } = await supabase
  .from('posts')
  .select('*')
  .returns<Post[]>()
```

## Query Patterns

```typescript
// ✅ GOOD: RLS enforced automatically
const { data: posts } = await supabase
  .from('posts')
  .select('*')
  .eq('user_id', userId) // RLS policy checks this

// ❌ BAD: Bypassing RLS with service_role
const { data: posts } = await supabaseAdmin // Uses service_role key
  .from('posts')
  .select('*') // Returns ALL posts, ignoring RLS!
```

## Edge Functions Security

```typescript
// supabase/functions/create-post/index.ts
import { createClient } from '@supabase/supabase-js'

Deno.serve(async (req) => {
  // Get JWT from Authorization header
  const authHeader = req.headers.get('Authorization')!
  const token = authHeader.replace('Bearer ', '')

  // Create client with user's token
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!, // Use anon key
    { global: { headers: { Authorization: authHeader } } }
  )

  // Verify user
  const { data: { user }, error: authError } = await supabase.auth.getUser(token)
  if (authError || !user) {
    return new Response('Unauthorized', { status: 401 })
  }

  // Validate input
  const { title, content } = await req.json()
  if (!title || !content) {
    return new Response('Invalid input', { status: 400 })
  }

  // Insert - RLS enforces user_id matches auth.uid()
  const { data, error } = await supabase
    .from('posts')
    .insert({ title, content, user_id: user.id })
    .select()
    .single()

  if (error) {
    return new Response('Error creating post', { status: 500 })
  }

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  })
})
```

## Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Server-only (NEVER expose)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key # Admin tasks only
```

## Real-time Subscriptions

```typescript
// Only subscribe to authorized data
const channel = supabase
  .channel('posts')
  .on('postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'posts',
      filter: `user_id=eq.${userId}` // Only user's posts
    },
    (payload) => {
      console.log('New post:', payload.new)
    }
  )
  .subscribe()
```
```

## Testing Cursor Rules (Quality Template)

This template enforces **test structure, mocking best practices, and coverage requirements**.

```markdown
---
description: "Testing patterns and quality standards"
alwaysApply: true
globs:
  - "**/*.test.ts"
  - "**/*.spec.ts"
  - "**/__tests__/**"
---

# Testing Best Practices

## Test File Structure

- Co-locate tests with source: `Button.tsx` → `Button.test.tsx`.
- Or use `__tests__` folder: `components/__tests__/Button.test.tsx`.
- One test file per source file.

## Test Organization

```typescript
import { render, screen } from '@testing-library/react'
import { Button } from './Button'

// Describe block per component/function
describe('Button', () => {
  // Nested describe for specific features
  describe('onClick handler', () => {
    it('calls handler when clicked', () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>Click me</Button>)

      screen.getByRole('button').click()

      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('disabled state', () => {
    it('does not call handler when disabled', () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick} disabled>Click me</Button>)

      screen.getByRole('button').click()

      expect(handleClick).not.toHaveBeenCalled()
    })
  })
})
```

## Mocking Patterns

```typescript
// ✅ GOOD: Mock external dependencies
import { vi } from 'vitest'
import { fetchUser } from '@/lib/api'

vi.mock('@/lib/api', () => ({
  fetchUser: vi.fn()
}))

test('displays user data', async () => {
  // Type-safe mock
  const mockFetchUser = vi.mocked(fetchUser)
  mockFetchUser.mockResolvedValue({
    id: '1',
    name: 'Alice'
  })

  render(<UserProfile userId="1" />)

  await screen.findByText('Alice')
})

// ❌ BAD: Mocking internals
vi.mock('./UserProfile', () => ({ ... })) // Don't mock what you're testing!
```

## API Mocking

Use MSW for HTTP mocking:

```typescript
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'

const server = setupServer(
  http.get('/api/users/:id', ({ params }) => {
    return HttpResponse.json({
      id: params.id,
      name: 'Alice'
    })
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('fetches user', async () => {
  const user = await fetchUser('1')
  expect(user.name).toBe('Alice')
})
```

## Database Mocking

For database tests, use test database or transactions:

```typescript
import { db } from '@/lib/db'

beforeEach(async () => {
  // Start transaction
  await db.query('BEGIN')
})

afterEach(async () => {
  // Rollback after each test
  await db.query('ROLLBACK')
})

test('creates user', async () => {
  const user = await createUser({ email: 'test@example.com' })
  expect(user.email).toBe('test@example.com')

  // Verify in DB
  const found = await db.query('SELECT * FROM users WHERE id = $1', [user.id])
  expect(found.rows[0].email).toBe('test@example.com')
})
// Transaction rolls back - no cleanup needed
```

## Coverage Requirements

```json
// vitest.config.ts or jest.config.js
{
  "coverage": {
    "provider": "v8",
    "thresholds": {
      "lines": 80,
      "functions": 80,
      "branches": 75,
      "statements": 80
    },
    "exclude": [
      "**/*.test.ts",
      "**/__tests__/**",
      "**/types/**"
    ]
  }
}
```

## Assertions

- Use specific matchers: `toHaveBeenCalledWith()` not `toBeCalled()`.
- Test user behavior, not implementation details.
- Avoid snapshot tests for logic (use for UI components sparingly).

```typescript
// ❌ BAD: Testing implementation
expect(component.state.count).toBe(1)

// ✅ GOOD: Testing user-visible behavior
expect(screen.getByText('Count: 1')).toBeInTheDocument()
```
```

## Full-Stack Template (Next.js + Supabase + TypeScript)

This **complete production-ready template** combines Next.js App Router, Supabase backend, TypeScript strict mode, and all security rules.

```markdown
---
description: "Complete Next.js + Supabase + TypeScript stack"
alwaysApply: true
globs:
  - "**/*.ts"
  - "**/*.tsx"
  - "**/*.sql"
---

# Full-Stack Next.js + Supabase Rules

This combines Next.js App Router, Supabase RLS, TypeScript strict mode, and security-first defaults.

## TypeScript Config

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "target": "ES2022",
    "lib": ["ES2022", "dom"],
    "jsx": "preserve",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## Next.js Patterns

- Server Components by default.
- Server Actions for mutations with Zod validation.
- Client components ONLY for interactivity.
- Middleware for auth protection.

## Supabase Integration

```typescript
// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/types/database'

export function createClient() {
  const cookieStore = cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        }
      }
    }
  )
}
```

## Server Action Pattern

```typescript
'use server'

import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

const createPostSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1).max(10000)
})

export async function createPost(formData: FormData) {
  // 1. Auth check
  const supabase = createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { error: 'Unauthorized' }
  }

  // 2. Validate input
  const result = createPostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content')
  })

  if (!result.success) {
    return { error: 'Invalid input', issues: result.error.issues }
  }

  // 3. Insert with RLS
  const { data, error } = await supabase
    .from('posts')
    .insert({
      ...result.data,
      user_id: user.id
    })
    .select()
    .single()

  if (error) {
    console.error('Insert error:', error)
    return { error: 'Failed to create post' }
  }

  // 4. Revalidate
  revalidatePath('/posts')

  return { data }
}
```

## Database Schema

```sql
-- Enable RLS on all tables
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- SELECT policy
CREATE POLICY "Users can view all posts"
ON posts FOR SELECT
USING (true);

-- INSERT policy
CREATE POLICY "Users can create own posts"
ON posts FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- UPDATE policy
CREATE POLICY "Users can update own posts"
ON posts FOR UPDATE
USING (auth.uid() = user_id);

-- DELETE policy
CREATE POLICY "Users can delete own posts"
ON posts FOR DELETE
USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
```

## Environment Variables

```typescript
// lib/env.ts
import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(), // Server only
  DATABASE_URL: z.string().url().optional() // Direct DB access
})

export const env = envSchema.parse(process.env)
```

## Auth Middleware

```typescript
// middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({ request })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({ request })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // Protected routes
  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Auth routes when logged in
  if (user && ['/login', '/signup'].includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

## Error Handling

```typescript
// Global error handling
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  // Never expose error details to users
  console.error('Global error:', error)

  return (
    <html>
      <body>
        <h2>Something went wrong</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}
```

## Security Checklist

- [x] RLS enabled on all tables
- [x] Auth checked in Server Actions
- [x] Input validated with Zod
- [x] Errors logged server-side, generic messages to users
- [x] Environment variables validated at startup
- [x] httpOnly cookies for sessions
- [x] TypeScript strict mode
- [x] No service_role key in client code
```

## FAQ

### How many rules should I have?

Start with **one focused rule file** for your stack (e.g., `next-js.md`). If you find yourself adding unrelated rules, split them: create `security.md` for universal security patterns, `testing.md` for test-specific rules. Most projects need 2-4 rule files maximum. More files mean more context for Cursor to process, which can slow suggestions.

### Can I combine multiple templates?

Yes. Copy sections from multiple templates into a single rule file. For example, combine the **Next.js template + Security template + Testing template** into one comprehensive `cursor-rules.md`. Just ensure rules don't conflict—if both templates define the same pattern differently, pick the stricter version.

### How do I test if rules are working?

Ask Cursor to generate code that would violate your rules. For example, if your rules say "use parameterized queries," ask Cursor to create a database query function. Check if it uses parameterized queries or vulnerable string concatenation. If it violates your rules, make them more specific or add examples.

### Should I use .cursor/rules/ or .cursorrules?

Use **`.cursor/rules/`** (the new format). It supports multiple rule files, glob patterns, and conditional activation. The legacy `.cursorrules` file still works but only allows one file with no organization. Migrate by creating `.cursor/rules/` and moving your existing rules into organized files like `security.md`, `stack.md`, `testing.md`.

### Where can I find more examples?

Check [awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules) on GitHub (36.2k+ stars) for community-contributed templates. For comprehensive guidance on creating and organizing Cursor rules, see our [Complete Cursor Rules Guide](/kb/prompts/cursor-rules/). For security-specific patterns, browse our [security vulnerability guides](/kb/security/vulnerabilities/).

## Related Resources

**Cursor Rules:**
- [Complete Cursor Rules Guide](/kb/prompts/cursor-rules/) - How to create, organize, and optimize Cursor rules
- [awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules) - 36.2k+ star repository of community templates

**Security Guides:**
- [SQL Injection Prevention](/kb/security/vulnerabilities/sql-injection/) - Parameterized query patterns
- [XSS Prevention](/kb/security/vulnerabilities/xss/) - Safe HTML rendering in React/Vue
- [Hardcoded Secrets](/kb/security/vulnerabilities/hardcoded-secrets/) - Environment variable patterns
- [Insecure Authentication](/kb/security/vulnerabilities/insecure-authentication/) - Session and JWT security

**AI Tool Guides:**
- [Cursor Security Patterns](/kb/vibe-coding-tools/cursor/) - Cursor-specific security considerations
- [Claude Code Security](/kb/vibe-coding-tools/claude-code/) - Server Action and API security
- [Bolt Security](/kb/vibe-coding-tools/bolt/) - Real-time preview security

**Stack Guides:**
- [Next.js + Supabase Security](/kb/security/stacks/nextjs-supabase/) - Full-stack security checklist
- [React Security Best Practices](/kb/security/stacks/react/) - Component and XSS patterns
- [TypeScript Security](/kb/security/stacks/typescript/) - Type safety for security
