<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Cursor Rules Examples: 20+ Templates for Every Stack',
		description: 'Get copy-paste cursor rules for Next.js, React, TypeScript, Python, and more. Security-focused templates with before/after patterns for vibe coders.',
		url: '/kb/prompts/cursor-rules-examples/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Prompts', href: '/kb/prompts' },
		{ label: 'Cursor Rules Examples' }
	];

	// FAQ data
	const faqs = [
		{
			question: 'Where do I copy these cursor rules to?',
			answer: 'Create a .cursorrules file in your project root, or use the newer .cursor/rules/ folder with separate .md files. Both approaches work - the folder structure offers more organization for larger projects. Cursor automatically detects and applies these rules to all AI interactions.'
		},
		{
			question: 'Can I combine multiple cursor rule templates?',
			answer: 'Yes. Copy sections from multiple templates into one file, or split them into separate files in .cursor/rules/ (e.g., security.md, typescript.md, nextjs.md). Cursor merges all applicable rules. Just remove duplicate sections if you combine templates.'
		},
		{
			question: 'How do I know if my cursor rules are working?',
			answer: 'Ask Cursor to generate code that your rules should affect. For example, if you have SQL security rules, ask it to write a database query. Check if it uses parameterized queries instead of template literals. You can also ask "what rules are you following?" to verify.'
		},
		{
			question: 'Should I include both Do and Dont patterns in cursor rules?',
			answer: 'Yes, absolutely. Showing anti-patterns helps AI avoid common mistakes. Use clear markers like "SECURE" and "VULNERABLE" or checkmarks and X marks. The contrast makes the correct pattern more memorable for the AI and helps catch errors during code review.'
		},
		{
			question: 'How often should I update my cursor rules?',
			answer: 'Review quarterly or when you adopt new technologies. Update immediately if you discover a security pattern the AI keeps getting wrong. Version control your rules alongside your code so changes are tracked and the team stays aligned.'
		},
		{
			question: 'What is the awesome-cursorrules repository?',
			answer: 'The awesome-cursorrules GitHub repository (github.com/PatrickJS/awesome-cursorrules) is a community collection with over 36,000 stars and 150+ rule templates. It includes rules for various frameworks, languages, and use cases. Our examples here include security rules that the community collection often lacks.'
		}
	];

	// Template categories with examples
	const templates = {
		frontend: [
			{
				name: 'Next.js 14 App Router',
				description: 'Server Components, Server Actions, TypeScript strict mode',
				slug: 'nextjs-14',
				rules: `# Next.js 14 App Router Project

## Tech Stack
- Next.js 14 with App Router
- TypeScript in strict mode
- React 18 Server Components
- Tailwind CSS
- Supabase for backend

## Architecture Patterns
- Server Components by default
- Client Components only for interactivity (hooks, events)
- Server Actions for mutations (use 'use server')
- Route handlers in app/api/ for external integrations

## File Organization
\`\`\`
app/
├── (auth)/           # Route group for auth pages
├── (dashboard)/      # Protected routes
├── api/              # Route handlers
├── layout.tsx        # Root layout
└── page.tsx          # Home page
components/
├── ui/               # Reusable UI
└── features/         # Feature-specific
lib/
├── db.ts             # Database client
├── auth.ts           # Auth helpers
└── utils.ts          # Utilities
\`\`\`

## Security Rules
- NEVER use template literals in database queries
- ALWAYS validate input with Zod in Server Actions
- Check authentication before processing any Server Action
- Use parameterized queries: \`$1, $2\` not \`\${var}\`
- Never expose server secrets in Client Components
- Always use HTTPS for external API calls

## Code Patterns

### Server Component (Default)
\`\`\`tsx
// No 'use client' = Server Component
export default async function Page() {
  const data = await getData() // Direct server call
  return <div>{data}</div>
}
\`\`\`

### Client Component (When Needed)
\`\`\`tsx
'use client'
import { useState } from 'react'
export function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
\`\`\`

### Server Action Pattern
\`\`\`tsx
'use server'
import { auth } from '@/lib/auth'
import { z } from 'zod'

const schema = z.object({ title: z.string().min(1) })

export async function createPost(formData: FormData) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')

  const input = schema.parse(Object.fromEntries(formData))
  // Database operation here
}
\`\`\``
			},
			{
				name: 'React + Vite SPA',
				description: 'Client-side React with modern tooling',
				slug: 'react-vite',
				rules: `# React + Vite SPA Project

## Tech Stack
- React 18 with Vite
- TypeScript strict mode
- React Router v6
- TanStack Query for data fetching
- Tailwind CSS

## Code Conventions
- Functional components only
- Custom hooks for reusable logic
- Named exports (not default exports)
- Collocate related files
- Props interfaces in same file

## Component Structure
\`\`\`tsx
// components/Button/Button.tsx
interface ButtonProps {
  variant: 'primary' | 'secondary'
  children: React.ReactNode
  onClick?: () => void
}

export function Button({ variant, children, onClick }: ButtonProps) {
  return (
    <button className={styles[variant]} onClick={onClick}>
      {children}
    </button>
  )
}
\`\`\`

## Security Rules
- Sanitize ALL user input before rendering
- Never use dangerouslySetInnerHTML with user data
- Validate API responses before use
- Store tokens in httpOnly cookies (not localStorage)
- Use Content Security Policy headers

## Data Fetching Pattern
\`\`\`tsx
// hooks/useUser.ts
export function useUser(id: string) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id),
    staleTime: 5 * 60 * 1000,
  })
}
\`\`\`

## Anti-Patterns to Avoid
- Don't store sensitive data in localStorage
- Don't use inline event handlers in JSX
- Don't use array index as key for dynamic lists
- Don't mutate props or state directly`
			},
			{
				name: 'SvelteKit',
				description: 'Full-stack Svelte with SSR and API routes',
				slug: 'sveltekit',
				rules: `# SvelteKit Project

## Tech Stack
- SvelteKit 2.x with Svelte 5
- TypeScript
- Supabase / Prisma for database
- Tailwind CSS

## Svelte 5 Runes (Required)
- Use $state() for reactive state
- Use $derived() for computed values
- Use $effect() for side effects
- NO let for reactive declarations

## File Structure
\`\`\`
src/
├── routes/
│   ├── +page.svelte      # Pages
│   ├── +page.server.ts   # Server load/actions
│   ├── +layout.svelte    # Layouts
│   └── api/              # API routes
├── lib/
│   ├── components/       # Reusable components
│   ├── server/           # Server-only code
│   └── utils/            # Shared utilities
└── app.d.ts              # Type definitions
\`\`\`

## Security Rules
- Validate ALL form data in +page.server.ts actions
- Use parameterized queries in database operations
- Check authentication in load functions
- Never expose secrets in +page.ts (client-accessible)
- Use locals.user from hooks for auth state

## Load Function Pattern
\`\`\`typescript
// +page.server.ts
export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) {
    redirect(303, '/login')
  }
  const data = await db.query('SELECT * FROM posts WHERE user_id = $1', [locals.user.id])
  return { posts: data }
}
\`\`\`

## Form Action Pattern
\`\`\`typescript
// +page.server.ts
export const actions = {
  create: async ({ request, locals }) => {
    if (!locals.user) return fail(401)

    const form = await request.formData()
    const schema = z.object({ title: z.string().min(1) })
    const result = schema.safeParse(Object.fromEntries(form))

    if (!result.success) return fail(400, { errors: result.error.flatten() })

    await db.insert(posts).values({ ...result.data, userId: locals.user.id })
    return { success: true }
  }
}
\`\`\`

## Svelte 5 Component Pattern
See svelte.dev/docs for component syntax. Key patterns:
- Use $state() for reactive variables
- Use $derived() for computed values
- Use $effect() for side effects
- Event handlers: onclick={() => action()}
- Two-way binding: bind:value={variable}`
			}
		],
		backend: [
			{
				name: 'Python + FastAPI',
				description: 'Modern async Python API with type hints',
				slug: 'python-fastapi',
				rules: `# Python + FastAPI Project

## Tech Stack
- Python 3.11+
- FastAPI for API framework
- SQLAlchemy 2.0 with async support
- Pydantic v2 for validation
- Alembic for migrations

## Code Standards
- Type hints on ALL functions
- Async/await for I/O operations
- Pydantic models for request/response
- Dependency injection for services

## Project Structure
\`\`\`
app/
├── api/
│   ├── routes/       # Route handlers
│   └── deps.py       # Dependencies
├── core/
│   ├── config.py     # Settings
│   └── security.py   # Auth utilities
├── models/           # SQLAlchemy models
├── schemas/          # Pydantic schemas
├── services/         # Business logic
└── main.py           # App entry
\`\`\`

## Security Rules
- Use Pydantic for ALL input validation
- NEVER use f-strings for SQL queries
- Use SQLAlchemy ORM or text() with parameters
- Hash passwords with bcrypt (passlib)
- Implement rate limiting on auth endpoints
- Never log passwords or tokens

## Database Pattern
\`\`\`python
# SECURE: Parameterized query
async def get_user(db: AsyncSession, user_id: int) -> User | None:
    result = await db.execute(
        select(User).where(User.id == user_id)
    )
    return result.scalar_one_or_none()

# VULNERABLE: Never do this
# f"SELECT * FROM users WHERE id = {user_id}"
\`\`\`

## Authentication Pattern
\`\`\`python
async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_db)
) -> User:
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials"
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = await get_user(db, user_id)
    if user is None:
        raise credentials_exception
    return user
\`\`\`

## Response Model Pattern
\`\`\`python
class UserResponse(BaseModel):
    id: int
    email: str
    name: str
    # Never include: password_hash, tokens, etc.

    model_config = ConfigDict(from_attributes=True)
\`\`\``
			},
			{
				name: 'Node.js + Express',
				description: 'Classic Node.js REST API',
				slug: 'node-express',
				rules: `# Node.js + Express API

## Tech Stack
- Node.js 20+
- Express 4.x
- TypeScript
- PostgreSQL with pg
- Zod for validation

## Project Structure
\`\`\`
src/
├── routes/           # Route definitions
├── controllers/      # Request handlers
├── services/         # Business logic
├── middleware/       # Express middleware
├── models/           # Database types
├── utils/            # Helpers
├── db.ts             # Database client
└── app.ts            # Express setup
\`\`\`

## Security Rules
- Validate ALL request bodies with Zod
- Use parameterized queries (pg placeholders)
- Implement rate limiting with express-rate-limit
- Use helmet for security headers
- Sanitize error messages (no stack traces)
- Never trust req.params or req.query directly

## Database Query Pattern
\`\`\`typescript
// SECURE
async function getUser(id: number): Promise<User | null> {
  const result = await db.query(
    'SELECT id, email, name FROM users WHERE id = $1',
    [id]
  )
  return result.rows[0] || null
}

// VULNERABLE - NEVER DO THIS
// db.query(\`SELECT * FROM users WHERE id = \${id}\`)
\`\`\`

## Route Handler Pattern
\`\`\`typescript
// routes/users.ts
import { z } from 'zod'

const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  password: z.string().min(8)
})

router.post('/users', async (req, res) => {
  const result = createUserSchema.safeParse(req.body)
  if (!result.success) {
    return res.status(400).json({ errors: result.error.flatten() })
  }

  // Process validated data
  const user = await userService.create(result.data)
  res.status(201).json(user)
})
\`\`\`

## Authentication Middleware
\`\`\`typescript
async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(401).json({ error: 'No token provided' })
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!)
    req.user = payload
    next()
  } catch {
    res.status(401).json({ error: 'Invalid token' })
  }
}
\`\`\``
			},
			{
				name: 'Go + Chi',
				description: 'Idiomatic Go HTTP API',
				slug: 'go-chi',
				rules: `# Go + Chi API Project

## Tech Stack
- Go 1.21+
- Chi router
- pgx for PostgreSQL
- sqlc for type-safe queries
- slog for structured logging

## Project Structure
\`\`\`
cmd/
└── server/
    └── main.go       # Entry point
internal/
├── api/              # HTTP handlers
├── db/               # Database (sqlc generated)
├── domain/           # Business logic
└── middleware/       # HTTP middleware
pkg/
└── validator/        # Input validation
\`\`\`

## Code Conventions
- Use context.Context for cancellation
- Return errors, don't panic
- Wrap errors with %w for context
- Use interfaces for dependencies
- Table-driven tests

## Security Rules
- Use sqlc or prepared statements - NO string concatenation
- Validate all input with validator package
- Use crypto/rand for random values (not math/rand)
- Hash passwords with bcrypt
- Set timeouts on all HTTP operations

## Database Pattern
\`\`\`go
// SECURE: sqlc generates type-safe queries
func (q *Queries) GetUser(ctx context.Context, id int64) (User, error) {
  // Generated from: SELECT id, email, name FROM users WHERE id = $1
}

// VULNERABLE: Never do this
// fmt.Sprintf("SELECT * FROM users WHERE id = %d", id)
\`\`\`

## Handler Pattern
\`\`\`go
func (h *Handler) CreateUser(w http.ResponseWriter, r *http.Request) {
  var req CreateUserRequest
  if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
    http.Error(w, "Invalid JSON", http.StatusBadRequest)
    return
  }

  if err := h.validator.Struct(req); err != nil {
    http.Error(w, "Validation failed", http.StatusBadRequest)
    return
  }

  user, err := h.service.CreateUser(r.Context(), req)
  if err != nil {
    slog.Error("failed to create user", "error", err)
    http.Error(w, "Internal error", http.StatusInternalServerError)
    return
  }

  w.Header().Set("Content-Type", "application/json")
  json.NewEncoder(w).Encode(user)
}
\`\`\`

## Middleware Pattern
\`\`\`go
func RequireAuth(next http.Handler) http.Handler {
  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    token := r.Header.Get("Authorization")
    if token == "" {
      http.Error(w, "Unauthorized", http.StatusUnauthorized)
      return
    }

    user, err := validateToken(token)
    if err != nil {
      http.Error(w, "Invalid token", http.StatusUnauthorized)
      return
    }

    ctx := context.WithValue(r.Context(), userKey, user)
    next.ServeHTTP(w, r.WithContext(ctx))
  })
}
\`\`\``
			}
		],
		security: [
			{
				name: 'Security Rules - Universal',
				description: 'Essential security rules for any project',
				slug: 'security-universal',
				rules: `# Universal Security Rules

## Database Security
- NEVER use string concatenation or template literals for queries
- ALWAYS use parameterized queries or ORM methods
- Validate input types before database operations
- Use allowlists for dynamic table/column names

### Patterns
\`\`\`
SECURE:   db.query('SELECT * FROM users WHERE id = $1', [id])
SECURE:   prisma.user.findUnique({ where: { id } })
VULNERABLE: db.query(\`SELECT * FROM users WHERE id = \${id}\`)
VULNERABLE: db.query('SELECT * FROM ' + tableName)
\`\`\`

## Authentication
- Check authentication on EVERY protected endpoint
- Use middleware/guards, not inline checks
- Never trust client-side auth state for server decisions
- Implement proper session validation and expiry
- Use secure, httpOnly cookies for tokens

### Pattern
1. Extract token/session
2. Validate token is not expired
3. Verify token signature
4. Load user from database
5. Check user is active/not banned
6. THEN process request

## Input Validation
- Validate ALL user input on the server
- Use schema validation (Zod, Pydantic, Joi)
- Never pass raw user input to:
  - Database queries
  - File system operations
  - Shell commands
  - URL redirects
  - HTML rendering
  - Email headers

## Secret Handling
- NEVER hardcode secrets, keys, or passwords
- Use environment variables for all secrets
- Never log secrets or include in error responses
- Never commit .env files (use .env.example)
- Use different secrets per environment

## Authorization (Beyond Auth)
- Check resource OWNERSHIP, not just authentication
- Use WHERE clauses with user ID
- Never expose internal IDs without ownership check
- Implement proper RBAC for admin features

### Pattern
\`\`\`
SECURE:   where: { id: resourceId, userId: session.user.id }
VULNERABLE: where: { id: resourceId } // No ownership check
\`\`\`

## Error Handling
- Never expose stack traces to users
- Use generic error messages externally
- Log detailed errors internally
- Don't reveal system internals in errors`
			},
			{
				name: 'Security Rules - API',
				description: 'API-specific security patterns',
				slug: 'security-api',
				rules: `# API Security Rules

## Rate Limiting
- Implement rate limiting on ALL public endpoints
- Stricter limits on auth endpoints (login, register, reset)
- Use sliding window or token bucket algorithms
- Return 429 with Retry-After header

### Recommended Limits
- Login: 5 attempts per 15 minutes per IP
- API general: 100 requests per minute
- Sensitive operations: 10 per hour

## CORS Configuration
- Never use \`Access-Control-Allow-Origin: *\` with credentials
- Whitelist specific origins in production
- Be explicit about allowed methods and headers
- Set appropriate Max-Age for preflight caching

### Pattern
\`\`\`
SECURE: origin: ['https://app.example.com']
VULNERABLE: origin: '*'
VULNERABLE: origin: true // Reflects any origin
\`\`\`

## Request Validation
- Validate Content-Type header
- Set maximum request body size
- Validate all path parameters
- Sanitize query parameters
- Check required headers

## Response Security
- Remove sensitive headers (X-Powered-By)
- Set security headers (Helmet.js)
- Never return passwords, even hashed
- Redact sensitive fields in logs
- Use consistent error response format

### Required Headers
\`\`\`
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Strict-Transport-Security: max-age=31536000
Content-Security-Policy: default-src 'self'
\`\`\`

## JWT Security
- Use strong secrets (256+ bits)
- Set reasonable expiration (15 min access, 7 day refresh)
- Validate all claims (iss, aud, exp)
- Use RS256 for distributed systems
- Store refresh tokens securely (httpOnly cookie)

## API Versioning
- Version your API (v1, v2)
- Deprecate old versions gracefully
- Document breaking changes
- Support migration paths`
			},
			{
				name: 'Security Rules - NoSQL',
				description: 'MongoDB, Firestore, DynamoDB patterns',
				slug: 'security-nosql',
				rules: `# NoSQL Security Rules

## MongoDB Security
- Validate input is string/number, NOT object
- Reject queries containing $ operators from user input
- Use mongo-sanitize or similar library
- Enable authentication on all deployments

### Pattern
\`\`\`javascript
// SECURE: Type validation
if (typeof username !== 'string') {
  throw new Error('Invalid input type')
}
await db.collection('users').findOne({ username })

// VULNERABLE: Object injection
// User sends: { "$ne": "" }
await db.collection('users').findOne({ username: req.body.username })
\`\`\`

### Operator Injection Prevention
\`\`\`javascript
// SECURE: Strip operators
import mongoSanitize from 'mongo-sanitize'
const clean = mongoSanitize(req.body)

// SECURE: Zod validation
const schema = z.object({
  username: z.string(),
  password: z.string()
})
\`\`\`

## Firestore Security
- Always use Security Rules (not just client-side)
- Validate document paths
- Check authentication in rules
- Limit query results

### Firestore Rules Pattern
\`\`\`
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null
        && request.auth.uid == userId;
    }
  }
}
\`\`\`

## DynamoDB Security
- Never use user input directly in key conditions
- Validate partition and sort key formats
- Use IAM roles with least privilege
- Enable encryption at rest

## General NoSQL Rules
- Schema validation even for schemaless DBs
- Rate limit queries to prevent DoS
- Monitor for injection patterns in logs
- Use connection pooling with limits`
			}
		],
		testing: [
			{
				name: 'Testing - Jest/Vitest',
				description: 'JavaScript/TypeScript testing patterns',
				slug: 'testing-jest',
				rules: `# Testing Rules - Jest/Vitest

## Test Structure
- One test file per module
- Descriptive test names (what, when, expected)
- Arrange-Act-Assert pattern
- No shared mutable state between tests

## Naming Convention
\`\`\`typescript
describe('UserService', () => {
  describe('createUser', () => {
    it('should create a user when valid data provided', async () => {
      // Arrange
      const input = { email: 'test@example.com', name: 'Test' }

      // Act
      const result = await userService.createUser(input)

      // Assert
      expect(result.email).toBe(input.email)
    })

    it('should throw error when email already exists', async () => {
      // ...
    })
  })
})
\`\`\`

## Mocking Rules
- Mock external services (API, database in unit tests)
- Use real database in integration tests
- Reset mocks between tests
- Don't mock what you don't own

## Security Testing
- Test authentication failures
- Test authorization (user A can't access user B's data)
- Test input validation (SQL injection, XSS)
- Test rate limiting

### Security Test Example
\`\`\`typescript
describe('Security', () => {
  it('should reject SQL injection attempts', async () => {
    const maliciousInput = "'; DROP TABLE users; --"
    const response = await api.post('/users/search', { query: maliciousInput })
    expect(response.status).toBe(400)
    // Verify table still exists
  })

  it('should prevent IDOR access', async () => {
    const userA = await createUser()
    const userB = await createUser()

    const response = await api
      .get(\`/users/\${userB.id}/profile\`)
      .set('Authorization', \`Bearer \${userA.token}\`)

    expect(response.status).toBe(403)
  })
})
\`\`\`

## Coverage Guidelines
- Aim for 80%+ line coverage
- 100% coverage on security-critical code
- Don't test implementation details
- Focus on behavior, not internals`
			},
			{
				name: 'Testing - Playwright',
				description: 'End-to-end testing patterns',
				slug: 'testing-playwright',
				rules: `# Testing Rules - Playwright E2E

## Test Organization
- Group by user flow, not page
- Use Page Object Model for reusability
- Keep tests independent (no order dependency)
- Clean up test data after each test

## Selectors Priority
1. data-testid (most stable)
2. role (accessibility)
3. text content
4. CSS class (least stable)

### Pattern
\`\`\`typescript
// GOOD: Stable selectors
await page.getByTestId('submit-button').click()
await page.getByRole('button', { name: 'Submit' }).click()

// AVOID: Brittle selectors
await page.click('.btn-primary')
await page.click('button:nth-child(3)')
\`\`\`

## Page Object Pattern
\`\`\`typescript
// pages/LoginPage.ts
export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/login')
  }

  async login(email: string, password: string) {
    await this.page.getByLabel('Email').fill(email)
    await this.page.getByLabel('Password').fill(password)
    await this.page.getByRole('button', { name: 'Sign in' }).click()
  }
}
\`\`\`

## Authentication Testing
- Test login success/failure
- Test session expiration
- Test logout clears session
- Test protected route redirects

## Security E2E Tests
\`\`\`typescript
test('should not expose sensitive data in DOM', async ({ page }) => {
  await loginPage.login('user@test.com', 'password')

  const pageContent = await page.content()
  expect(pageContent).not.toContain('password')
  expect(pageContent).not.toContain('secret')
  expect(pageContent).not.toContain('api_key')
})

test('should prevent XSS in user input', async ({ page }) => {
  // Test with XSS payload (script tags)
  const xssPayload = '<' + 'script>alert("xss")</' + 'script>'
  await page.getByLabel('Name').fill(xssPayload)
  await page.getByRole('button', { name: 'Save' }).click()

  // Verify script is escaped, not executed
  const savedName = await page.getByTestId('user-name').textContent()
  expect(savedName).toBe(xssPayload) // Displayed as text
})
\`\`\`

## Best Practices
- Use realistic test data
- Test on multiple viewports
- Record videos for failures
- Run in CI with retries`
			}
		],
		language: [
			{
				name: 'TypeScript Strict',
				description: 'Strict TypeScript configuration',
				slug: 'typescript-strict',
				rules: `# TypeScript Strict Rules

## Compiler Configuration
Enable all strict checks in tsconfig.json:
\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "exactOptionalPropertyTypes": true
  }
}
\`\`\`

## Type Safety Rules
- NO 'any' type - use 'unknown' and narrow
- NO non-null assertions (!) - use proper checks
- NO type casting without validation
- Always define return types for functions
- Use strict null checks

### Patterns
\`\`\`typescript
// GOOD: Type narrowing
function process(input: unknown): string {
  if (typeof input !== 'string') {
    throw new Error('Expected string')
  }
  return input.toUpperCase()
}

// BAD: Using any
function process(input: any): string {
  return input.toUpperCase() // Will crash if not string
}
\`\`\`

## Type Definitions
- Define interfaces for all object shapes
- Use type aliases for unions/intersections
- Export types from module boundary
- Use generics for reusable types

### Interface Pattern
\`\`\`typescript
interface User {
  id: number
  email: string
  name: string
  createdAt: Date
}

interface CreateUserInput {
  email: string
  name: string
  password: string // Not in User - never return
}

type UserResponse = Omit<User, 'createdAt'> & {
  createdAt: string // Serialized
}
\`\`\`

## Security Types
\`\`\`typescript
// Branded types for sensitive values
type UserId = number & { readonly __brand: 'UserId' }
type SessionToken = string & { readonly __brand: 'SessionToken' }

function validateUserId(id: number): UserId {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error('Invalid user ID')
  }
  return id as UserId
}
\`\`\`

## Error Handling
- Use Result types or throw typed errors
- Define error classes for different cases
- Type catch blocks properly

### Error Pattern
\`\`\`typescript
class ValidationError extends Error {
  constructor(public field: string, message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

try {
  // operation
} catch (error) {
  if (error instanceof ValidationError) {
    console.log(error.field)
  }
  throw error
}
\`\`\``
			},
			{
				name: 'Python Type Hints',
				description: 'Modern Python with full type coverage',
				slug: 'python-types',
				rules: `# Python Type Hints Rules

## Configuration (pyproject.toml)
\`\`\`toml
[tool.mypy]
python_version = "3.11"
strict = true
warn_return_any = true
warn_unused_ignores = true
\`\`\`

## Type Annotation Rules
- Annotate ALL function parameters
- Annotate ALL return types
- Use Optional[T] for nullable values
- Use TypedDict for dict shapes
- Use Literal for specific values

### Function Annotations
\`\`\`python
# GOOD: Full annotations
async def get_user(user_id: int) -> User | None:
    result = await db.execute(
        select(User).where(User.id == user_id)
    )
    return result.scalar_one_or_none()

# BAD: Missing annotations
async def get_user(user_id):
    result = await db.execute(...)
    return result.scalar_one_or_none()
\`\`\`

## TypedDict for API Responses
\`\`\`python
from typing import TypedDict

class UserResponse(TypedDict):
    id: int
    email: str
    name: str

class CreateUserRequest(TypedDict):
    email: str
    name: str
    password: str
\`\`\`

## Generic Types
\`\`\`python
from typing import TypeVar, Generic

T = TypeVar('T')

class Repository(Generic[T]):
    async def get(self, id: int) -> T | None: ...
    async def create(self, data: dict) -> T: ...
    async def delete(self, id: int) -> bool: ...

class UserRepository(Repository[User]):
    pass
\`\`\`

## Pydantic Models (v2)
\`\`\`python
from pydantic import BaseModel, EmailStr, Field

class UserCreate(BaseModel):
    email: EmailStr
    name: str = Field(min_length=1, max_length=100)
    password: str = Field(min_length=8)

class UserResponse(BaseModel):
    id: int
    email: str
    name: str

    model_config = ConfigDict(from_attributes=True)
\`\`\`

## Security Type Patterns
\`\`\`python
from typing import NewType

UserId = NewType('UserId', int)
SessionToken = NewType('SessionToken', str)
HashedPassword = NewType('HashedPassword', str)

def validate_user_id(id: int) -> UserId:
    if id <= 0:
        raise ValueError("Invalid user ID")
    return UserId(id)
\`\`\``
			}
		]
	};

	let copied = $state(false);
	let copiedSlug = $state('');
	let activeCategory = $state('frontend');

	function copyRules(rules: string, slug: string) {
		navigator.clipboard.writeText(rules);
		copied = true;
		copiedSlug = slug;
		setTimeout(() => {
			copied = false;
			copiedSlug = '';
		}, 2000);
	}
</script>

<svelte:head>
	<title>{meta.title}</title>
	<meta name="description" content={meta.description} />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:url" content={meta.url} />
	<meta property="og:type" content="article" />
	<link rel="canonical" href="https://vibeship.co{meta.url}" />

	<!-- BreadcrumbList Schema -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"itemListElement": [
			{"@type": "ListItem", "position": 1, "name": "Knowledge Base", "item": "https://vibeship.co/kb"},
			{"@type": "ListItem", "position": 2, "name": "Prompts", "item": "https://vibeship.co/kb/prompts"},
			{"@type": "ListItem", "position": 3, "name": "Cursor Rules Examples"}
		]
	}
	</script>`}

	<!-- TechArticle Schema -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "TechArticle",
		"headline": "${meta.title}",
		"description": "${meta.description}",
		"author": {
			"@type": "Organization",
			"name": "Vibeship"
		},
		"publisher": {
			"@type": "Organization",
			"name": "Vibeship",
			"logo": {
				"@type": "ImageObject",
				"url": "https://vibeship.co/logo.png"
			}
		},
		"datePublished": "2025-12-18",
		"dateModified": "2025-12-18"
	}
	</script>`}

	<!-- FAQ Schema -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "FAQPage",
		"mainEntity": ${JSON.stringify(faqs.map(faq => ({
			"@type": "Question",
			"name": faq.question,
			"acceptedAnswer": {
				"@type": "Answer",
				"text": faq.answer
			}
		})))}
	}
	</script>`}
</svelte:head>

<Header {breadcrumbs} />

<div class="content-wrapper">
	<article class="content-main content-wide">
		<!-- Header -->
		<header class="article-header">
			<div class="badge-row">
				<span class="badge badge-green">Prompts Guide</span>
				<span class="badge">Templates</span>
				<span class="badge">Copy-Paste</span>
			</div>
			<h1>Cursor Rules Examples: 20+ Templates for Every Stack</h1>
			<p class="text-secondary">Copy-paste cursor rules with security patterns built in. Ready for Next.js, React, Python, Go, and more.</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Below are 20+ ready-to-use cursor rules templates organized by stack and use case.</strong>
				Each template includes security rules that prevent common vulnerabilities in vibe coded projects. Copy the template that matches your stack, customize for your project, and paste into <code>.cursorrules</code> or <code>.cursor/rules/</code>.
			</p>
		</div>

		<!-- Category Navigation -->
		<section>
			<h2>Browse templates by category</h2>
			<p>
				Select a category to browse templates. Each includes security patterns from our <a href="/kb/security/vulnerabilities/">vulnerability guides</a> - SQL injection prevention, authentication checks, input validation, and more.
			</p>

			<div class="category-nav">
				<button
					class="category-btn"
					class:active={activeCategory === 'frontend'}
					onclick={() => activeCategory = 'frontend'}
				>
					Frontend
					<span class="count">{templates.frontend.length}</span>
				</button>
				<button
					class="category-btn"
					class:active={activeCategory === 'backend'}
					onclick={() => activeCategory = 'backend'}
				>
					Backend
					<span class="count">{templates.backend.length}</span>
				</button>
				<button
					class="category-btn"
					class:active={activeCategory === 'security'}
					onclick={() => activeCategory = 'security'}
				>
					Security
					<span class="count">{templates.security.length}</span>
				</button>
				<button
					class="category-btn"
					class:active={activeCategory === 'testing'}
					onclick={() => activeCategory = 'testing'}
				>
					Testing
					<span class="count">{templates.testing.length}</span>
				</button>
				<button
					class="category-btn"
					class:active={activeCategory === 'language'}
					onclick={() => activeCategory = 'language'}
				>
					Language
					<span class="count">{templates.language.length}</span>
				</button>
			</div>
		</section>

		<!-- Template Display -->
		<section>
			<h2>
				{activeCategory === 'frontend' && 'Frontend Framework Templates'}
				{activeCategory === 'backend' && 'Backend API Templates'}
				{activeCategory === 'security' && 'Security Rules Templates'}
				{activeCategory === 'testing' && 'Testing Framework Templates'}
				{activeCategory === 'language' && 'Language-Specific Templates'}
			</h2>

			<div class="templates-grid">
				{#each templates[activeCategory] as template}
					<div class="template-card">
						<div class="template-header">
							<div>
								<h3>{template.name}</h3>
								<p class="template-desc">{template.description}</p>
							</div>
							<button
								class="copy-btn"
								onclick={() => copyRules(template.rules, template.slug)}
							>
								{copied && copiedSlug === template.slug ? 'Copied!' : 'Copy'}
							</button>
						</div>
						<pre class="template-code"><code>{template.rules}</code></pre>
					</div>
				{/each}
			</div>
		</section>

		<!-- How to Use -->
		<section>
			<h2>How to use these cursor rules templates</h2>

			<div class="steps-grid">
				<div class="step">
					<div class="step-number">1</div>
					<h4>Choose Your Template</h4>
					<p>Find the template that matches your tech stack. Most projects need one frontend template plus the universal security rules.</p>
				</div>
				<div class="step">
					<div class="step-number">2</div>
					<h4>Copy and Customize</h4>
					<p>Click "Copy" and paste into <code>.cursorrules</code> in your project root. Update the tech stack section to match your specific versions and libraries.</p>
				</div>
				<div class="step">
					<div class="step-number">3</div>
					<h4>Add Security Rules</h4>
					<p>Combine with a security template. Create <code>.cursor/rules/security.md</code> with the Universal Security Rules template for comprehensive protection.</p>
				</div>
				<div class="step">
					<div class="step-number">4</div>
					<h4>Test and Iterate</h4>
					<p>Ask Cursor to generate code and verify it follows your rules. Refine rules based on what patterns the AI keeps missing.</p>
				</div>
			</div>
		</section>

		<!-- Why Security Rules Matter -->
		<section class="security-callout">
			<h2>Why every template includes security rules</h2>
			<p>
				AI coding tools generate functional code quickly, but they often skip security patterns. The <a href="https://github.com/PatrickJS/awesome-cursorrules" target="_blank" rel="noopener">awesome-cursorrules</a> community repository (36k+ stars) provides excellent framework templates, but many lack security guidance.
			</p>
			<p>
				Our templates are security-first because vibe coders need protection from the start. Each template includes rules that prevent:
			</p>
			<ul class="security-list">
				<li><a href="/kb/security/vulnerabilities/sql-injection/">SQL Injection</a> - Parameterized query patterns</li>
				<li><a href="/kb/security/vulnerabilities/hardcoded-secrets/">Hardcoded Secrets</a> - Environment variable patterns</li>
				<li><a href="/kb/security/vulnerabilities/missing-auth/">Missing Authentication</a> - Auth check patterns</li>
				<li><a href="/kb/security/vulnerabilities/idor/">IDOR</a> - Ownership verification patterns</li>
				<li><a href="/kb/security/vulnerabilities/xss/">XSS</a> - Input sanitization patterns</li>
			</ul>
		</section>

		<!-- Combining Templates -->
		<section>
			<h2>Combining multiple cursor rules templates</h2>
			<p>
				Most projects benefit from combining templates. Use the <code>.cursor/rules/</code> folder structure to organize multiple rule files:
			</p>

			<div class="file-structure">
				<div class="file-header">Recommended Structure</div>
				<pre><code>{`project/
├── .cursor/
│   └── rules/
│       ├── core.md           # Framework template (Next.js, etc.)
│       ├── security.md       # Universal security rules
│       ├── typescript.md     # TypeScript strict rules
│       └── testing.md        # Testing patterns
├── src/
└── package.json`}</code></pre>
			</div>

			<p>
				Cursor merges all rules in the folder. Use frontmatter to control when each rule file applies:
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Frontmatter Example</span>
				</div>
				<pre><code>{`---
description: "TypeScript patterns for all .ts and .tsx files"
alwaysApply: false
globs: ["**/*.ts", "**/*.tsx"]
---

# TypeScript Rules
...`}</code></pre>
			</div>
		</section>

		<!-- FAQ -->
		<section>
			<h2>Frequently asked questions</h2>
			{#each faqs as faq}
				<div class="faq-item">
					<h3>{faq.question}</h3>
					<p>{faq.answer}</p>
				</div>
			{/each}
		</section>

		<!-- Related Content -->
		<section>
			<h2>Related resources</h2>
			<div class="related-grid">
				<a href="/kb/prompts/cursor-rules/" class="related-card">
					<span class="related-card-category">Guide</span>
					<span class="related-card-title">Cursor Rules Complete Guide</span>
				</a>
				<a href="/kb/prompts/how-to-use-cursor-rules/" class="related-card">
					<span class="related-card-category">Tutorial</span>
					<span class="related-card-title">How to Use Cursor Rules</span>
				</a>
				<a href="/kb/prompts/claude-md/" class="related-card">
					<span class="related-card-category">Config Guide</span>
					<span class="related-card-title">CLAUDE.md Guide</span>
				</a>
				<a href="/kb/vibe-coding-tools/cursor/" class="related-card">
					<span class="related-card-category">Tool Guide</span>
					<span class="related-card-title">Cursor Security Patterns</span>
				</a>
				<a href="/kb/vibe-coding/secure-vibe-coding-guide/" class="related-card">
					<span class="related-card-category">Pillar Guide</span>
					<span class="related-card-title">Secure Vibe Coding Guide</span>
				</a>
				<a href="/kb/security/vulnerabilities/sql-injection/" class="related-card">
					<span class="related-card-category">Vulnerability</span>
					<span class="related-card-title">SQL Injection Prevention</span>
				</a>
			</div>
		</section>

		<!-- External Resources -->
		<section>
			<h2>External resources</h2>
			<ul class="external-links">
				<li><a href="https://cursor.com/docs/context/rules" target="_blank" rel="noopener">Cursor Official Documentation</a></li>
				<li><a href="https://github.com/PatrickJS/awesome-cursorrules" target="_blank" rel="noopener">awesome-cursorrules (36k+ stars)</a> - Community collection</li>
				<li><a href="https://owasp.org/Top10/" target="_blank" rel="noopener">OWASP Top 10</a> - Security vulnerability reference</li>
			</ul>
		</section>
	</article>
</div>

<style>
	/* Page-specific styles only - global styles from components.css and layout.css */

	.article-header {
		margin-bottom: 2rem;
	}

	.badge-row {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		margin-bottom: 1rem;
	}

	h1 {
		font-size: 2.25rem;
		margin-bottom: 0.5rem;
	}

	.text-secondary {
		color: var(--text-secondary);
		font-size: 1.1rem;
	}

	section {
		margin-bottom: 3rem;
	}

	h2 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--border);
	}

	h3 {
		font-size: 1.1rem;
		margin-top: 0;
		margin-bottom: 0.5rem;
	}

	h4 {
		font-size: 1rem;
		margin-bottom: 0.5rem;
	}

	p {
		line-height: 1.7;
		margin-bottom: 1rem;
	}

	code {
		font-family: 'JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', monospace;
		background: rgba(0,0,0,0.3);
		padding: 0.125rem 0.375rem;
		font-size: 0.9em;
	}

	/* Category Navigation */
	.category-nav {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		margin: 1.5rem 0;
	}

	.category-btn {
		padding: 0.75rem 1.25rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		color: var(--text-primary);
		font-size: 0.9rem;
		font-weight: 500;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		transition: all 0.2s;
	}

	.category-btn:hover {
		border-color: var(--green-dim);
	}

	.category-btn.active {
		background: rgba(0, 196, 154, 0.1);
		border-color: var(--green-dim);
		color: var(--green-dim);
	}

	.category-btn .count {
		background: rgba(255,255,255,0.1);
		padding: 0.125rem 0.5rem;
		font-size: 0.75rem;
	}

	.category-btn.active .count {
		background: rgba(0, 196, 154, 0.2);
	}

	/* Template Grid */
	.templates-grid {
		display: grid;
		gap: 1.5rem;
	}

	.template-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		overflow: hidden;
	}

	.template-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		padding: 1rem 1.25rem;
		background: rgba(255,255,255,0.02);
		border-bottom: 1px solid var(--border);
	}

	.template-desc {
		margin: 0;
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.template-code {
		max-height: 400px;
		overflow-y: auto;
		margin: 0;
		padding: 1rem 1.25rem;
		font-size: 0.75rem;
		line-height: 1.5;
	}

	.template-code code {
		background: transparent;
		padding: 0;
		font-size: inherit;
	}

	/* Steps Grid */
	.steps-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.step {
		padding: 1.25rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
	}

	.step-number {
		width: 28px;
		height: 28px;
		background: var(--green-dim);
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		font-size: 0.875rem;
		margin-bottom: 0.75rem;
	}

	.step h4 {
		margin-top: 0;
	}

	.step p {
		margin: 0;
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	/* Security Callout */
	.security-callout {
		background: var(--bg-secondary);
		border: 1px solid rgba(34, 197, 94, 0.3);
		padding: 2rem;
	}

	.security-list {
		margin: 0;
		padding-left: 1.5rem;
	}

	.security-list li {
		margin-bottom: 0.5rem;
	}

	/* File Structure */
	.file-structure {
		background: #0d0d0d;
		overflow: hidden;
		margin: 1rem 0;
		border: 1px solid var(--border);
	}

	.file-header {
		padding: 0.75rem 1rem;
		background: rgba(0, 196, 154, 0.1);
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--green-dim);
	}

	.file-structure pre {
		margin: 0;
		padding: 1rem;
	}

	pre {
		margin: 0;
		padding: 1rem;
		overflow-x: auto;
		font-size: 0.8rem;
		line-height: 1.5;
	}

	pre code {
		background: transparent;
		padding: 0;
	}

	/* External Links */
	.external-links {
		list-style: none;
		padding: 0;
	}

	.external-links li {
		margin-bottom: 0.75rem;
	}

	.external-links a {
		color: var(--green-dim);
		text-decoration: none;
	}

	.external-links a:hover {
		color: var(--green);
	}

	a {
		color: var(--green-dim);
	}

	a:hover {
		color: var(--green);
	}

	@media (max-width: 768px) {
		h1 {
			font-size: 1.75rem;
		}

		.steps-grid {
			grid-template-columns: 1fr;
		}

		.category-nav {
			gap: 0.375rem;
		}

		.category-btn {
			padding: 0.5rem 0.75rem;
			font-size: 0.8rem;
		}
	}
</style>
