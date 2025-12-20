<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Security Prompts: 40+ Templates for Writing Secure Code with AI',
		description: 'Copy-paste security prompts for Claude, ChatGPT, and Cursor. Generate secure code, review for vulnerabilities, and implement authentication patterns safely.',
		url: '/kb/prompts/security-prompts/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Prompts', href: '/kb/prompts' },
		{ label: 'Security Prompts' }
	];

	// FAQ data
	const faqs = [
		{
			question: 'Why do I need security-specific prompts for AI coding?',
			answer: 'AI models generate code patterns from training data, which often includes insecure examples from tutorials and Stack Overflow. Without explicit security instructions, AI will produce functional but vulnerable code - SQL injection, XSS, and hardcoded secrets are common. Security prompts force the model to prioritize security.'
		},
		{
			question: 'Should I trust AI-generated security code?',
			answer: 'Never trust AI security code blindly. Always verify: (1) Run security scanners like opengrep, (2) Check inputs are validated, (3) Confirm auth is checked on every route, (4) Review for hardcoded secrets. Use these prompts as a starting point, then validate the output.'
		},
		{
			question: 'How do I prompt AI to avoid SQL injection?',
			answer: 'Explicitly state: "Use parameterized queries only. Never use template literals or string concatenation for SQL. Validate input types before queries." Include an example of the pattern you expect. The prompts in this library include these constraints by default.'
		},
		{
			question: 'What security vulnerabilities does AI code most often have?',
			answer: 'Based on scanning AI-generated code: (1) Missing authentication checks, (2) SQL/NoSQL injection from template literals, (3) Hardcoded API keys and secrets, (4) Missing input validation, (5) XSS from unescaped output. These prompts address all five.'
		},
		{
			question: 'Can I use these prompts with any AI coding tool?',
			answer: 'Yes. These prompts work with Claude, ChatGPT, Cursor, Copilot, and other AI coding assistants. Claude and Cursor handle longer prompts best. For Cursor, consider converting these into .cursorrules for automatic enforcement.'
		},
		{
			question: 'How do I review existing code for security issues?',
			answer: 'Use the Security Audit prompts in this library. Paste your code and specify what to check (auth, injection, secrets, etc.). For comprehensive reviews, use multiple focused prompts rather than one large prompt. Combine with automated scanning using opengrep.'
		}
	];

	// Prompt categories
	const categories = [
		{ name: 'Secure Code Generation', count: 10, icon: '🛡️' },
		{ name: 'Authentication', count: 8, icon: '🔐' },
		{ name: 'Input Validation', count: 6, icon: '✅' },
		{ name: 'Security Audits', count: 6, icon: '🔍' },
		{ name: 'Database Security', count: 5, icon: '🗃️' },
		{ name: 'API Security', count: 5, icon: '🔌' }
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
				<strong>Security prompts</strong> force AI models to generate secure code by explicitly requiring input validation, parameterized queries, and authentication checks. This library contains 40+ battle-tested prompts for writing secure code, reviewing for vulnerabilities, and implementing auth patterns safely.
			</p>
		</div>

		<!-- Badge -->
		<span class="badge badge-security">Security Library</span>

		<h1>Security Prompts: 40+ Templates for Writing Secure Code with AI</h1>

		<p class="intro">
			AI coding assistants default to generating functional code - not secure code. Without explicit security constraints, you get SQL injection, missing auth checks, and hardcoded secrets. This library contains security-first prompts that produce code you can actually ship. Copy, customize, and generate secure code from the start.
		</p>

		<!-- Stats Row -->
		<div class="stats-row">
			<div class="stat-card">
				<div class="stat-number">40+</div>
				<div class="stat-label">Prompts</div>
			</div>
			<div class="stat-card">
				<div class="stat-number">6</div>
				<div class="stat-label">Categories</div>
			</div>
			<div class="stat-card stat-card-critical">
				<div class="stat-number">OWASP</div>
				<div class="stat-label">Top 10 Covered</div>
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

		<!-- Secure Code Generation Section -->
		<section class="prompt-section">
			<h2 id="secure-code-generation">Secure Code Generation Prompts</h2>

			<p>Prompts for generating new code with security built in from the start.</p>

			<div class="prompt-card">
				<h3>Security-First Feature Implementation</h3>
				<div class="prompt-meta">
					<span class="prompt-tag critical">Foundation</span>
					<span class="prompt-tag">Any Stack</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Implement [FEATURE_NAME] with security as the top priority.

## Requirements
[Describe the feature in 2-3 sentences]

## Tech Stack
- Framework: [Next.js / React / SvelteKit / etc.]
- Database: [Supabase / Prisma / MongoDB]
- Auth: [NextAuth / Supabase Auth / etc.]

## Security Requirements (MANDATORY)
1. Authentication: Check auth on every entry point
2. Authorization: Verify user can access this resource
3. Input Validation: Validate ALL inputs with Zod before processing
4. Database: Use parameterized queries only (no template literals)
5. Secrets: Use environment variables (never hardcode)
6. Output: Escape/sanitize any user content before rendering
7. Errors: Never expose stack traces or internal details

## Anti-patterns to AVOID
- Never: db.query(\`SELECT * FROM ... \${userId}\`)
- Never: if (req.body.isAdmin) // trust client input
- Never: const apiKey = "sk_live_..."
- Never: dangerouslySetInnerHTML with user content

## Output Format
Provide complete implementation with:
1. File path for each code block
2. Comments explaining security decisions
3. Note any security trade-offs`}</code></pre>
				</div>
			</div>

			<div class="prompt-card">
				<h3>Secure API Endpoint</h3>
				<div class="prompt-meta">
					<span class="prompt-tag critical">Critical</span>
					<span class="prompt-tag">Backend</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Create a secure API endpoint for [RESOURCE/ACTION].

## Endpoint
- Method: [GET/POST/PATCH/DELETE]
- Path: /api/[path]
- Auth: Required

## Security Checklist (ALL REQUIRED)
1. [ ] Authentication: Verify valid session/token
2. [ ] Authorization: Check user owns/can access resource
3. [ ] Rate Limiting: [X requests per minute]
4. [ ] Input Validation: Zod schema for all inputs
5. [ ] SQL Safety: Parameterized queries only
6. [ ] Error Handling: Generic errors to client, details to logs

## Request
- Body/Params: [describe expected input]
- Validation: [list validation rules]

## Framework
[Next.js App Router / Express / FastAPI]

## Implementation Pattern Required
\`\`\`typescript
// Pattern to follow:
export async function POST(req: Request) {
  // 1. Authenticate
  const session = await getServerSession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  // 2. Validate input
  const body = await req.json()
  const result = schema.safeParse(body)
  if (!result.success) return Response.json({ error: 'Invalid input' }, { status: 400 })

  // 3. Authorize
  const canAccess = await checkPermission(session.user.id, result.data.resourceId)
  if (!canAccess) return Response.json({ error: 'Forbidden' }, { status: 403 })

  // 4. Process (with parameterized queries)
  const data = await db.query('SELECT * FROM items WHERE id = $1', [result.data.id])

  // 5. Return sanitized response
  return Response.json({ data: sanitize(data) })
}
\`\`\`

Provide complete endpoint following this exact pattern.`}</code></pre>
				</div>
			</div>

			<div class="prompt-card">
				<h3>Secure Form Handler</h3>
				<div class="prompt-meta">
					<span class="prompt-tag">Frontend + Backend</span>
					<span class="prompt-tag">Forms</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Create a secure form for [FORM_PURPOSE].

## Form Fields
| Field | Type | Validation |
|-------|------|------------|
| [field1] | [text/email] | [required, format] |
| [field2] | [select] | [allowed values] |

## Security Requirements
1. Client-side: Immediate feedback, NOT for security
2. Server-side: ALL validation happens here (source of truth)
3. CSRF: Include protection if using cookies
4. XSS: Sanitize before display, escape in HTML

## Validation Schema (Zod)
Define strict schemas:
- String fields: max length, allowed characters
- Email: .email() validation
- Numbers: .int(), .positive(), min/max
- Enums: .enum([allowed values])

## Error Handling
- Show generic validation errors to user
- Log detailed errors server-side
- Never expose: stack traces, SQL errors, internal paths

## Framework
[Next.js Server Actions / SvelteKit form actions / etc.]

Provide:
1. Form component with client validation
2. Server action/handler with full validation
3. Zod schema (shared between client/server)
4. Error display component`}</code></pre>
				</div>
			</div>

			<div class="prompt-card">
				<h3>Secure File Upload Handler</h3>
				<div class="prompt-meta">
					<span class="prompt-tag critical">High Risk</span>
					<span class="prompt-tag">Files</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Implement secure file upload for [PURPOSE].

## Requirements
- Allowed types: [image/png, image/jpeg, application/pdf]
- Max size: [5MB]
- Storage: [S3 / Supabase Storage / local]

## Security Checklist (ALL REQUIRED)
1. [ ] Validate file type by magic bytes (not just extension)
2. [ ] Enforce max file size
3. [ ] Generate random filename (never use user input)
4. [ ] Store outside web root OR use signed URLs
5. [ ] Scan for malware if accepting from public
6. [ ] Set correct Content-Type and Content-Disposition headers

## Path Security
- NEVER use user input in file paths
- NEVER: path.join(uploadDir, req.body.filename)
- ALWAYS: Generate UUID filename server-side

## Implementation
\`\`\`typescript
// Required pattern for filename
const safeFilename = \`\${crypto.randomUUID()}.\${validatedExtension}\`
const safePath = path.join(UPLOAD_DIR, safeFilename)
\`\`\`

## Framework
[Next.js / Express / etc.]

Provide complete upload handler with all security checks.`}</code></pre>
				</div>
			</div>
		</section>

		<!-- Authentication Section -->
		<section class="prompt-section">
			<h2 id="authentication">Authentication Prompts</h2>

			<p>Prompts for implementing secure authentication and session management.</p>

			<div class="prompt-card">
				<h3>Protected Route/Page</h3>
				<div class="prompt-meta">
					<span class="prompt-tag critical">Critical</span>
					<span class="prompt-tag">Auth</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Create a protected [page/route] that requires authentication.

## Page Details
- Path: [/dashboard, /settings, etc.]
- Required role: [any authenticated / admin / specific role]

## Auth Provider
[NextAuth / Supabase Auth / Clerk / etc.]

## Security Requirements
1. Check auth BEFORE any data fetching
2. Redirect unauthenticated users to login
3. For sensitive pages: Re-validate session server-side
4. Never show protected content during loading state

## Pattern for Server Components (Next.js)
\`\`\`typescript
// Server Component - check auth first
export default async function ProtectedPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  // Auth verified - safe to fetch data
  const data = await fetchUserData(session.user.id)

  return <Dashboard data={data} />
}
\`\`\`

## Pattern for Supabase
\`\`\`typescript
// Use getUser(), not getSession() for security
const { data: { user }, error } = await supabase.auth.getUser()
if (!user) redirect('/login')
\`\`\`

## Anti-patterns to AVOID
- Never: Check auth only on client side
- Never: Fetch data then check auth
- Never: Show protected UI while loading auth state

Provide complete protected page with proper auth flow.`}</code></pre>
				</div>
			</div>

			<div class="prompt-card">
				<h3>Role-Based Access Control</h3>
				<div class="prompt-meta">
					<span class="prompt-tag">Authorization</span>
					<span class="prompt-tag">RBAC</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Implement role-based access control for [FEATURE/RESOURCE].

## Roles
- [admin]: [can do everything]
- [editor]: [can create/edit, not delete]
- [viewer]: [read only]

## Resources to Protect
- [Resource 1]: [who can access]
- [Resource 2]: [who can access]

## Security Requirements
1. Check permissions server-side (never trust client)
2. Fail closed (deny by default if role unknown)
3. Log access attempts for audit trail
4. Permission check must happen AFTER auth check

## Implementation Pattern
\`\`\`typescript
// Permission check helper
function canAccess(user: User, resource: string, action: string): boolean {
  const permissions = ROLE_PERMISSIONS[user.role]
  if (!permissions) return false // Fail closed

  return permissions[resource]?.includes(action) ?? false
}

// Usage in API route
if (!canAccess(user, 'posts', 'delete')) {
  return Response.json({ error: 'Forbidden' }, { status: 403 })
}
\`\`\`

## Anti-patterns
- Never: if (user.role === 'admin') // string comparison only
- Never: Trust role from client/JWT without verification
- Never: Check role but not auth first

Provide complete RBAC implementation with middleware/helper.`}</code></pre>
				</div>
			</div>

			<div class="prompt-card">
				<h3>Secure Password Reset Flow</h3>
				<div class="prompt-meta">
					<span class="prompt-tag critical">Critical</span>
					<span class="prompt-tag">Auth Flow</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Implement a secure password reset flow.

## Components Needed
1. Request reset form (email input)
2. Email with reset link
3. Reset password form
4. Token validation

## Security Requirements (ALL MANDATORY)
1. Token: Cryptographically random, 32+ bytes
2. Expiry: 1 hour maximum
3. Single use: Invalidate after use
4. Rate limit: 3 requests per email per hour
5. Timing safe: Same response whether email exists or not
6. HTTPS only: Reset link must use https

## Token Generation
\`\`\`typescript
import crypto from 'crypto'

// Generate secure token
const token = crypto.randomBytes(32).toString('hex')
const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

// Store HASH in database, send RAW token to user
await db.insert({
  email,
  token: hashedToken, // Store hash
  expiresAt: new Date(Date.now() + 3600000) // 1 hour
})

// Send raw token in email (not the hash)
const resetUrl = \`\${baseUrl}/reset-password?token=\${token}\`
\`\`\`

## Token Validation
\`\`\`typescript
// Hash incoming token before comparing
const hashedToken = crypto.createHash('sha256').update(token).digest('hex')
const record = await db.findOne({
  token: hashedToken,
  expiresAt: { $gt: new Date() }
})
\`\`\`

## Anti-patterns
- Never: Use predictable tokens (UUID alone is not enough)
- Never: Store raw token in database
- Never: "Email not found" vs "Reset email sent" (info leak)

Provide complete password reset implementation.`}</code></pre>
				</div>
			</div>

			<div class="prompt-card">
				<h3>Session Management</h3>
				<div class="prompt-meta">
					<span class="prompt-tag">Sessions</span>
					<span class="prompt-tag">Security</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Implement secure session management for [APPLICATION TYPE].

## Session Type
[Cookie-based / JWT / Database sessions]

## Security Requirements
1. Session ID: Cryptographically random, 128+ bits
2. Cookie flags: HttpOnly, Secure, SameSite=Strict
3. Expiry: [Sliding window / Fixed duration]
4. Rotation: New session ID on privilege change
5. Revocation: Ability to invalidate all user sessions

## Cookie Security Settings
\`\`\`typescript
const sessionCookie = {
  httpOnly: true,     // No JavaScript access
  secure: true,       // HTTPS only
  sameSite: 'strict', // CSRF protection
  maxAge: 86400,      // 1 day
  path: '/'
}
\`\`\`

## Sensitive Operations
Require re-authentication for:
- Password changes
- Email changes
- Payment methods
- Account deletion

## Logout Security
\`\`\`typescript
async function logout(sessionId: string) {
  // 1. Invalidate in database
  await db.sessions.delete({ id: sessionId })

  // 2. Clear cookie
  cookies().delete('session')

  // 3. Clear client-side state
  redirect('/login')
}
\`\`\`

Provide complete session management implementation.`}</code></pre>
				</div>
			</div>
		</section>

		<!-- Input Validation Section -->
		<section class="prompt-section">
			<h2 id="input-validation">Input Validation Prompts</h2>

			<p>Prompts for implementing comprehensive input validation.</p>

			<div class="prompt-card">
				<h3>Zod Validation Schema</h3>
				<div class="prompt-meta">
					<span class="prompt-tag">Validation</span>
					<span class="prompt-tag">Zod</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Create a comprehensive Zod validation schema for [DATA TYPE/FORM].

## Fields to Validate
| Field | Type | Rules |
|-------|------|-------|
| [field1] | string | [required, min 1, max 100] |
| [field2] | email | [required, valid format] |
| [field3] | number | [optional, positive, max 1000] |

## Security Considerations
1. Strings: Always set max length (prevent DoS)
2. Numbers: Set reasonable min/max ranges
3. Arrays: Set max items limit
4. Objects: No additional properties
5. Enums: Explicit allowed values

## Schema Pattern
\`\`\`typescript
import { z } from 'zod'

export const userInputSchema = z.object({
  // Strings: always max length
  name: z.string().min(1).max(100).trim(),

  // Email: built-in validation
  email: z.string().email().max(254),

  // Numbers: explicit ranges
  age: z.number().int().positive().max(150).optional(),

  // Enums: explicit allowed values
  role: z.enum(['user', 'editor', 'admin']),

  // Arrays: limit size
  tags: z.array(z.string().max(50)).max(10),

  // Nested objects
  profile: z.object({
    bio: z.string().max(500).optional()
  }).optional()
}).strict() // No additional properties

export type UserInput = z.infer<typeof userInputSchema>
\`\`\`

## Error Handling
\`\`\`typescript
const result = schema.safeParse(input)
if (!result.success) {
  // Log detailed errors server-side
  console.error('Validation failed:', result.error.issues)
  // Return generic error to client
  return { error: 'Invalid input' }
}
\`\`\`

Generate complete schema with all security constraints.`}</code></pre>
				</div>
			</div>

			<div class="prompt-card">
				<h3>Sanitize User Content for Display</h3>
				<div class="prompt-meta">
					<span class="prompt-tag critical">XSS Prevention</span>
					<span class="prompt-tag">Output</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Implement secure rendering of user-generated content.

## Content Type
[Plain text / Markdown / HTML subset]

## Display Context
[In HTML / In attribute / In JavaScript / In URL]

## Security Requirements
1. Escape HTML entities in plain text
2. Use allowlist for permitted HTML tags/attributes
3. Never use dangerouslySetInnerHTML with user content
4. Sanitize URLs (only http/https protocols)

## For Plain Text (Most Common)
\`\`\`typescript
// React/Next.js - Already escaped by default
<p>{userContent}</p> // Safe

// DANGER - Never do this
<div dangerouslySetInnerHTML={{__html: userContent}} /> // XSS!
\`\`\`

## For Markdown with HTML
\`\`\`typescript
import DOMPurify from 'dompurify'
import { marked } from 'marked'

// Render markdown then sanitize
const html = marked.parse(userMarkdown)
const clean = DOMPurify.sanitize(html, {
  ALLOWED_TAGS: ['p', 'b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li', 'code', 'pre'],
  ALLOWED_ATTR: ['href', 'target', 'rel'],
  ALLOW_DATA_ATTR: false
})

// Add security attributes to links
const safeHtml = clean.replace(
  /<a /g,
  '<a rel="noopener noreferrer" target="_blank" '
)
\`\`\`

## URL Sanitization
\`\`\`typescript
function sanitizeUrl(url: string): string | null {
  try {
    const parsed = new URL(url)
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return null // Block javascript:, data:, etc.
    }
    return parsed.href
  } catch {
    return null
  }
}
\`\`\`

Provide implementation for my specific use case.`}</code></pre>
				</div>
			</div>

			<div class="prompt-card">
				<h3>API Request Validation Middleware</h3>
				<div class="prompt-meta">
					<span class="prompt-tag">Middleware</span>
					<span class="prompt-tag">API</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Create validation middleware for API requests.

## Framework
[Next.js App Router / Express / Hono / etc.]

## Validation Points
1. Request body (JSON payload)
2. Query parameters
3. Path parameters
4. Headers (Content-Type, Authorization)

## Middleware Pattern
\`\`\`typescript
import { z } from 'zod'
import { NextRequest, NextResponse } from 'next/server'

type ValidatedHandler<T> = (
  req: NextRequest,
  validated: T
) => Promise<NextResponse>

function withValidation<T>(
  schema: z.ZodSchema<T>,
  handler: ValidatedHandler<T>
) {
  return async (req: NextRequest) => {
    try {
      const body = await req.json()
      const result = schema.safeParse(body)

      if (!result.success) {
        return NextResponse.json(
          { error: 'Invalid request', details: result.error.flatten() },
          { status: 400 }
        )
      }

      return handler(req, result.data)
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON' },
        { status: 400 }
      )
    }
  }
}

// Usage
const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100)
})

export const POST = withValidation(createUserSchema, async (req, data) => {
  // data is typed and validated
  const user = await createUser(data)
  return NextResponse.json(user)
})
\`\`\`

Provide complete middleware implementation.`}</code></pre>
				</div>
			</div>
		</section>

		<!-- Security Audits Section -->
		<section class="prompt-section">
			<h2 id="security-audits">Security Audit Prompts</h2>

			<p>Prompts for reviewing existing code for security vulnerabilities.</p>

			<div class="prompt-card">
				<h3>Comprehensive Security Audit</h3>
				<div class="prompt-meta">
					<span class="prompt-tag critical">Full Audit</span>
					<span class="prompt-tag">Review</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Perform a comprehensive security audit of this code:

\`\`\`[language]
[paste code here]
\`\`\`

## Check for These Vulnerabilities

### Injection (OWASP A03)
- [ ] SQL injection (template literals in queries)
- [ ] NoSQL injection (unsanitized operators)
- [ ] Command injection (exec, spawn with user input)
- [ ] LDAP injection
- [ ] XPath injection

### Broken Authentication (OWASP A07)
- [ ] Missing auth checks on routes
- [ ] Weak session management
- [ ] Credential exposure in logs/errors

### Sensitive Data Exposure (OWASP A02)
- [ ] Hardcoded secrets/API keys
- [ ] Sensitive data in URLs
- [ ] Missing encryption for sensitive data

### XSS (OWASP A03)
- [ ] Unescaped output
- [ ] dangerouslySetInnerHTML usage
- [ ] DOM manipulation with user input

### Access Control (OWASP A01)
- [ ] Missing authorization checks
- [ ] IDOR (Insecure Direct Object Reference)
- [ ] Path traversal

### Security Misconfiguration (OWASP A05)
- [ ] Debug mode in production
- [ ] Default credentials
- [ ] Verbose error messages

## Output Format
For each issue found:

| Severity | Location | Issue | Fix |
|----------|----------|-------|-----|
| CRITICAL/HIGH/MEDIUM/LOW | Line # | Description | Recommended fix |

Also list: "Areas reviewed with no issues found"`}</code></pre>
				</div>
			</div>

			<div class="prompt-card">
				<h3>SQL/NoSQL Injection Audit</h3>
				<div class="prompt-meta">
					<span class="prompt-tag critical">Injection</span>
					<span class="prompt-tag">Database</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Audit this code for SQL and NoSQL injection vulnerabilities:

\`\`\`[language]
[paste code here]
\`\`\`

## SQL Injection Patterns to Find
\`\`\`typescript
// VULNERABLE - template literal
db.query(\`SELECT * FROM users WHERE id = \${userId}\`)

// VULNERABLE - string concatenation
db.query("SELECT * FROM " + tableName + " WHERE id = " + id)

// SAFE - parameterized query
db.query('SELECT * FROM users WHERE id = $1', [userId])
\`\`\`

## NoSQL Injection Patterns to Find
\`\`\`typescript
// VULNERABLE - direct object insertion
db.users.find({ username: req.body.username })
// Attack: { username: { $ne: "" } } returns all users

// SAFE - validate type first
if (typeof req.body.username !== 'string') throw new Error()
db.users.find({ username: req.body.username })
\`\`\`

## Audit Checklist
- [ ] All database queries use parameters/prepared statements
- [ ] No string concatenation in SQL
- [ ] NoSQL inputs validated as correct type
- [ ] Dynamic table/column names use allowlist
- [ ] ORM .raw() calls use parameters

For each vulnerability:
1. Line number and code snippet
2. Attack scenario (how it could be exploited)
3. Fixed code example`}</code></pre>
				</div>
			</div>

			<div class="prompt-card">
				<h3>Authentication/Authorization Audit</h3>
				<div class="prompt-meta">
					<span class="prompt-tag critical">Auth</span>
					<span class="prompt-tag">Access Control</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Audit this code for authentication and authorization issues:

\`\`\`[language]
[paste code here]
\`\`\`

## Authentication Checks
- [ ] Every API route checks authentication
- [ ] Auth check happens BEFORE data access
- [ ] Session validation is done server-side
- [ ] Token validation checks expiry and signature

## Authorization Checks
- [ ] User can only access their own resources
- [ ] Admin functions check admin role
- [ ] No IDOR (e.g., /api/users/123 doesn't expose all users)
- [ ] Permission checks cannot be bypassed

## Session Security
- [ ] Session IDs are random and sufficient length
- [ ] Cookies have HttpOnly, Secure, SameSite flags
- [ ] Sessions expire appropriately
- [ ] Logout actually invalidates session

## Credential Handling
- [ ] Passwords properly hashed (bcrypt, argon2)
- [ ] No credentials in URLs
- [ ] No credentials in logs
- [ ] Rate limiting on login attempts

## Common Vulnerabilities to Find
\`\`\`typescript
// VULNERABLE - Missing auth
export async function GET(req) {
  const userId = req.params.id
  return db.users.find(userId) // No auth check!
}

// VULNERABLE - IDOR
export async function GET(req) {
  const session = await getSession() // Auth only
  const userId = req.params.id // Uses param, not session
  return db.users.find(userId) // Can access any user!
}

// SAFE
export async function GET(req) {
  const session = await getSession()
  if (!session) return unauthorized()
  return db.users.find(session.user.id) // Uses session user
}
\`\`\`

List all authentication/authorization issues found with fixes.`}</code></pre>
				</div>
			</div>

			<div class="prompt-card">
				<h3>Secrets and Environment Variables Audit</h3>
				<div class="prompt-meta">
					<span class="prompt-tag critical">Secrets</span>
					<span class="prompt-tag">Config</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Audit this code for hardcoded secrets and configuration issues:

\`\`\`[language]
[paste code here]
\`\`\`

## Patterns to Find

### Hardcoded Secrets (CRITICAL)
- API keys: "sk_live_", "pk_", "api_key"
- Database URLs with credentials
- JWT secrets
- OAuth client secrets
- Webhook secrets
- Encryption keys

### Exposed Secrets
- Secrets in error messages
- Secrets in logs
- Secrets in URLs/query params
- Secrets in client-side code

### Environment Security
- [ ] All secrets use process.env
- [ ] No default values for production secrets
- [ ] Client-side env vars are properly prefixed (NEXT_PUBLIC_)
- [ ] .env files are gitignored

## Example Issues
\`\`\`typescript
// CRITICAL - hardcoded secret
const stripe = new Stripe('sk_live_abc123...')

// HIGH - secret in error message
console.error(\`DB connection failed: \${DATABASE_URL}\`)

// MEDIUM - default that might reach production
const secret = process.env.SECRET || 'default-secret'

// SAFE
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
\`\`\`

For each issue:
1. Severity (CRITICAL/HIGH/MEDIUM)
2. Line and code snippet
3. Risk explanation
4. Remediation`}</code></pre>
				</div>
			</div>
		</section>

		<!-- Database Security Section -->
		<section class="prompt-section">
			<h2 id="database-security">Database Security Prompts</h2>

			<p>Prompts for secure database operations.</p>

			<div class="prompt-card">
				<h3>Secure Database Query Helper</h3>
				<div class="prompt-meta">
					<span class="prompt-tag">Database</span>
					<span class="prompt-tag">Query Builder</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Create secure database query helpers for [ORM/Database].

## ORM/Database
[Prisma / Drizzle / raw pg / Supabase / MongoDB]

## Operations Needed
- Find by ID (with ownership check)
- List with pagination
- Create with validation
- Update with ownership check
- Soft delete with ownership check

## Security Requirements
1. All queries parameterized (no template literals)
2. Ownership verified before update/delete
3. Pagination enforced (no unlimited queries)
4. Soft delete instead of hard delete
5. Audit logging for sensitive operations

## Pattern for Ownership Checks
\`\`\`typescript
// Helper that enforces ownership
async function findUserResource<T>(
  userId: string,
  resourceId: string,
  table: string
): Promise<T | null> {
  const result = await db.query(
    'SELECT * FROM $1 WHERE id = $2 AND user_id = $3',
    [table, resourceId, userId]
  )
  return result[0] || null
}

// Usage - automatically checks ownership
const post = await findUserResource(session.user.id, postId, 'posts')
if (!post) return notFound() // Either doesn't exist or not theirs
\`\`\`

## Supabase RLS Pattern
\`\`\`sql
-- Row Level Security policy
CREATE POLICY "Users can only access own data"
ON posts FOR ALL
USING (auth.uid() = user_id);
\`\`\`

Provide complete secure query helper implementations.`}</code></pre>
				</div>
			</div>

			<div class="prompt-card">
				<h3>Database Migration Security Review</h3>
				<div class="prompt-meta">
					<span class="prompt-tag">Migrations</span>
					<span class="prompt-tag">Schema</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Review this database migration for security issues:

\`\`\`sql
[paste migration here]
\`\`\`

## Check For

### Data Protection
- [ ] Sensitive columns encrypted (PII, credentials)
- [ ] Appropriate column constraints (NOT NULL, CHECK)
- [ ] No overly permissive defaults

### Access Control
- [ ] RLS policies if using Supabase/Postgres
- [ ] Proper foreign key constraints
- [ ] Audit columns (created_at, updated_at, created_by)

### Indexing
- [ ] Indexes on foreign keys
- [ ] Indexes on commonly queried columns
- [ ] No unnecessary indexes (write performance)

### Naming Security
- [ ] No sensitive info in column names
- [ ] Clear distinction between public/private data

## Common Issues
\`\`\`sql
-- BAD: Password stored as plain text
ALTER TABLE users ADD COLUMN password VARCHAR(255);

-- GOOD: Password stored as hash
ALTER TABLE users ADD COLUMN password_hash VARCHAR(255);

-- BAD: No RLS on sensitive table
CREATE TABLE user_data (...);

-- GOOD: RLS enabled
CREATE TABLE user_data (...);
ALTER TABLE user_data ENABLE ROW LEVEL SECURITY;
\`\`\`

Provide security review with recommendations.`}</code></pre>
				</div>
			</div>
		</section>

		<!-- API Security Section -->
		<section class="prompt-section">
			<h2 id="api-security">API Security Prompts</h2>

			<p>Prompts for securing API endpoints and external integrations.</p>

			<div class="prompt-card">
				<h3>Rate Limiting Implementation</h3>
				<div class="prompt-meta">
					<span class="prompt-tag">API</span>
					<span class="prompt-tag">Rate Limit</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Implement rate limiting for [API/Feature].

## Requirements
- Limit: [X requests] per [time window]
- Scope: [per IP / per user / per API key]
- Response: 429 Too Many Requests

## Framework
[Next.js / Express / Vercel Edge]

## Storage
[Redis / In-memory / Upstash]

## Implementation Pattern
\`\`\`typescript
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '60 s'), // 10 requests per minute
  analytics: true
})

export async function middleware(req: NextRequest) {
  const ip = req.ip ?? '127.0.0.1'
  const { success, limit, reset, remaining } = await ratelimit.limit(ip)

  if (!success) {
    return new Response('Too Many Requests', {
      status: 429,
      headers: {
        'X-RateLimit-Limit': limit.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': reset.toString()
      }
    })
  }

  return NextResponse.next()
}
\`\`\`

## Different Limits by Endpoint
\`\`\`typescript
const limits = {
  '/api/auth/login': { requests: 5, window: '15 m' }, // Strict
  '/api/posts': { requests: 100, window: '1 m' },      // Normal
  '/api/search': { requests: 30, window: '1 m' }       // Moderate
}
\`\`\`

Provide complete rate limiting implementation.`}</code></pre>
				</div>
			</div>

			<div class="prompt-card">
				<h3>Webhook Security</h3>
				<div class="prompt-meta">
					<span class="prompt-tag">Webhooks</span>
					<span class="prompt-tag">Verification</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Implement secure webhook handler for [SERVICE].

## Service
[Stripe / GitHub / Twilio / Custom]

## Security Requirements
1. Verify webhook signature
2. Validate event timestamp (prevent replay)
3. Idempotency handling
4. Error handling without leaking info

## Stripe Webhook Pattern
\`\`\`typescript
import Stripe from 'stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed')
    return new Response('Invalid signature', { status: 400 })
  }

  // Check for replay attacks (optional but recommended)
  const eventAge = Date.now() - event.created * 1000
  if (eventAge > 300000) { // 5 minutes
    return new Response('Event too old', { status: 400 })
  }

  // Idempotency check
  const processed = await db.webhookEvents.findUnique({
    where: { eventId: event.id }
  })
  if (processed) {
    return new Response('Already processed', { status: 200 })
  }

  // Process event...

  // Mark as processed
  await db.webhookEvents.create({ data: { eventId: event.id } })

  return new Response('OK', { status: 200 })
}
\`\`\`

Provide complete webhook handler for my service.`}</code></pre>
				</div>
			</div>

			<div class="prompt-card">
				<h3>CORS Configuration</h3>
				<div class="prompt-meta">
					<span class="prompt-tag">API</span>
					<span class="prompt-tag">CORS</span>
				</div>
				<div class="code-block">
					<div class="code-header">
						<span class="code-title">Prompt Template</span>
						<span class="code-lang">text</span>
					</div>
					<pre><code>{`Configure secure CORS for my API.

## Allowed Origins
- Production: [https://myapp.com]
- Staging: [https://staging.myapp.com]
- Local dev: [http://localhost:3000]

## Framework
[Next.js / Express / Vercel Edge]

## Security Requirements
1. Explicit origin allowlist (never Access-Control-Allow-Origin: *)
2. Credentials only if needed
3. Specific methods allowed
4. Limited headers exposed

## Secure CORS Configuration
\`\`\`typescript
const ALLOWED_ORIGINS = [
  'https://myapp.com',
  'https://staging.myapp.com',
  ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : [])
]

function getCorsHeaders(origin: string | null) {
  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400'
  }

  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin
    headers['Access-Control-Allow-Credentials'] = 'true'
  }

  return headers
}
\`\`\`

## Anti-patterns
\`\`\`typescript
// VULNERABLE - allows any origin
res.setHeader('Access-Control-Allow-Origin', '*')

// VULNERABLE - reflects any origin
res.setHeader('Access-Control-Allow-Origin', req.headers.origin)

// SAFE - explicit allowlist
if (ALLOWED_ORIGINS.includes(origin)) {
  res.setHeader('Access-Control-Allow-Origin', origin)
}
\`\`\`

Provide complete CORS middleware.`}</code></pre>
				</div>
			</div>
		</section>

		<!-- How to Use Section -->
		<section class="article-section">
			<h2>How to Use Security Prompts Effectively</h2>

			<div class="usage-steps">
				<div class="step">
					<div class="step-number">1</div>
					<div class="step-content">
						<h4>Start with security constraints</h4>
						<p>Don't add security after the fact. Use these prompts from the beginning to generate secure code.</p>
					</div>
				</div>
				<div class="step">
					<div class="step-number">2</div>
					<div class="step-content">
						<h4>Be explicit about requirements</h4>
						<p>List specific security requirements (parameterized queries, auth checks, input validation). AI follows explicit instructions.</p>
					</div>
				</div>
				<div class="step">
					<div class="step-number">3</div>
					<div class="step-content">
						<h4>Include anti-patterns</h4>
						<p>Show the AI what NOT to do. "Never use template literals for SQL" is more effective than "write secure queries."</p>
					</div>
				</div>
				<div class="step">
					<div class="step-number">4</div>
					<div class="step-content">
						<h4>Always verify output</h4>
						<p>Run security scanners (opengrep, trivy) on generated code. Review auth checks manually. Test for injection.</p>
					</div>
				</div>
			</div>

			<div class="warning-box">
				<strong>Never Trust, Always Verify</strong>
				<p>AI-generated security code is a starting point, not a guarantee. Always review for: missing auth checks, parameterized queries, input validation, and hardcoded secrets.</p>
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
				<a href="/kb/prompts/debugging-prompts/" class="card card-interactive related-card">
					<div class="related-card-category">Prompt Library</div>
					<div class="related-card-title">Debugging Prompts</div>
					<p class="related-card-description">Advanced debugging templates</p>
				</a>
				<a href="/kb/security/vulnerabilities/sql-injection/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">SQL Injection</div>
					<p class="related-card-description">Deep dive into SQL injection</p>
				</a>
				<a href="/kb/security/vulnerabilities/xss/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Cross-Site Scripting</div>
					<p class="related-card-description">Understanding and preventing XSS</p>
				</a>
				<a href="/kb/prompts/cursor-rules/" class="card card-interactive related-card">
					<div class="related-card-category">Guide</div>
					<div class="related-card-title">Cursor Rules</div>
					<p class="related-card-description">Automate security with .cursorrules</p>
				</a>
				<a href="/kb/prompts/best-ai-coding-tools-2025/" class="card card-interactive related-card">
					<div class="related-card-category">Comparison</div>
					<div class="related-card-title">Best AI Coding Tools 2025</div>
					<p class="related-card-description">Find the right secure coding tool</p>
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

	.badge-security {
		background: linear-gradient(135deg, var(--red), var(--orange));
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

	.stat-card-critical {
		border-color: var(--red);
	}

	.stat-number {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--green);
	}

	.stat-card-critical .stat-number {
		color: var(--red);
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

	.prompt-tag.critical {
		background: rgba(239, 68, 68, 0.1);
		color: var(--red);
		border: 1px solid var(--red);
	}

	/* Warning Box */
	.warning-box {
		background: rgba(239, 68, 68, 0.05);
		border: 1px solid var(--red);
		border-left: 4px solid var(--red);
		border-radius: 8px;
		padding: 1.25rem;
		margin: 1.5rem 0;
	}

	.warning-box strong {
		color: var(--red);
		display: block;
		margin-bottom: 0.5rem;
	}

	.warning-box p {
		margin: 0;
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
		background: var(--red);
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
