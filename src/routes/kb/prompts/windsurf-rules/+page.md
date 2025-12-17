# Windsurf Rules: Configure Cascade for Better Code

<div class="quick-answer">
<strong>Windsurf rules are configuration files controlling how Cascade generates code.</strong> Create them in `.windsurf/rules/` or `global_rules.md`. Unlike auto-generated Memories, rules give permanent control over security and coding standards.
</div>

## What Are Windsurf Rules?

Windsurf rules are manually-defined configuration files that tell Cascade - Codeium's AI agent - exactly how to write code for your project. They live in `.windsurf/rules/` for workspace-specific guidance or `global_rules.md` for cross-project standards.

Unlike Memories, which Cascade auto-generates as it learns your codebase, rules are permanent instructions you write yourself. For vibe coders building fast with AI tools, rules are critical - they let you enforce security patterns, coding standards, and framework preferences that Cascade wouldn't otherwise know about.

Each rule file can contain up to 12,000 characters, and you control exactly when Cascade activates them through four different modes: Manual, Always On, Model Decision, or Glob pattern matching.

## How to Set Up Windsurf Rules

Setting up Windsurf rules takes less than 5 minutes. Here's the complete process:

**Step 1: Create your rules directory**
```bash
mkdir -p .windsurf/rules
```

**Step 2: Create your first rule file**
```bash
# Workspace rule (project-specific)
touch .windsurf/rules/security.md

# Global rule (all workspaces)
touch ~/.windsurf/global_rules.md
```

**Step 3: Define activation mode and content**
Each rule file starts with metadata specifying when to activate:

```markdown
---
activation: always_on
---

# Security Standards

- Always use parameterized queries for SQL
- Validate all user input with Zod schemas
- Store secrets in environment variables only
```

**Step 4: Save and test**
Cascade reads rule files automatically - no restart needed. Test by asking Cascade to generate database code and verify it uses parameterized queries.

## Memories vs Rules: Understanding the Difference

Windsurf uses two different systems to customize Cascade's behavior - understanding when to use each is critical for effective vibe coding.

**Memories** are auto-generated context that Cascade creates as it learns your codebase. When you chat with Cascade, it analyzes your code patterns, dependencies, and architecture, then stores this knowledge workspace-by-workspace. Memories cost zero credits and update automatically, but you can't directly control what gets captured.

**Rules** are manual instructions you write yourself in `.windsurf/rules/` or `global_rules.md`. They're permanent, version-controllable, and give you precise control over coding standards, security patterns, and framework usage. Rules override model defaults and persist across sessions.

| Feature | Memories | Rules |
|---------|----------|-------|
| **Created by** | Cascade (auto) | You (manual) |
| **Scope** | Workspace-specific | Workspace or global |
| **Credit cost** | Zero | Zero |
| **Version control** | No | Yes (.windsurf/rules/) |
| **Use for** | Learning codebase patterns | Enforcing standards |

**When to use Memories:** Let Cascade discover your API structure, component patterns, and existing conventions automatically.

**When to use Rules:** Enforce security requirements, coding standards that differ from model training, and framework-specific patterns that AI tools commonly get wrong.

## Rule Activation Modes

Windsurf provides four activation modes that control when Cascade applies your rules - choosing the right mode prevents unnecessary context pollution while ensuring critical rules always fire.

**Manual Activation** (`activation: manual`)
Cascade only uses the rule when you `@mention` it by name. Use for specialized guidance that applies to specific tasks only.

```markdown
---
activation: manual
---

# Database Migration Guide
[extensive migration patterns]
```

Then activate: "Update schema @database-migration-guide"

**Always On** (`activation: always_on`)
Cascade applies this rule to every conversation. Use sparingly for critical security or coding standards - too many always-on rules slow down responses.

```markdown
---
activation: always_on
---

# Security Baseline
- Never use `eval()` or `Function()` constructor
- All API endpoints require authentication
```

**Model Decision** (`activation: model_decision`)
Cascade activates based on natural language matching. Describe when to use the rule, and the model decides relevance.

```markdown
---
activation: model_decision
description: Use when working with React components or UI code
---

# React Standards
[component patterns]
```

**Glob Pattern** (`activation: glob`)
Activate automatically when working with files matching the pattern. Most precise option for framework-specific rules.

```markdown
---
activation: glob
patterns: ["*.test.ts", "*.spec.ts"]
---

# Testing Standards
- Use Vitest, not Jest
- Mock external APIs with MSW
```

**Best practice:** Start with Manual or Glob, promote to Always On only for security-critical patterns.

## Essential Windsurf Rules Sections

Effective Windsurf rules files organize guidance into clear sections that mirror how vibe coders actually work. Here are the three essential categories every project needs.

### Project Context Rules

Tell Cascade what your project does and why design decisions were made. This prevents AI from suggesting architecture changes that break your approach.

```markdown
# Project Context

- This is a SaaS billing dashboard using Next.js 14 App Router
- We chose tRPC over REST for type-safe API calls
- Payments handled by Stripe - never store card data
```

### Coding Standards Rules

Define formatting, naming, and structural patterns that differ from Cascade's defaults. Focus on preferences that affect security or maintainability, not style (use Prettier for that).

```markdown
# Coding Standards

- Use named exports, not default exports
- Async functions must include try/catch blocks
- Database queries go in server actions, not components
- All API routes return standardized { data, error } format
```

### Framework-Specific Rules

AI tools frequently mix framework versions or use deprecated patterns. Explicitly state which version and patterns to use.

```markdown
# Next.js 14 App Router Rules

- Use Server Components by default
- Add 'use client' only when needed (hooks, event handlers)
- Data fetching in Server Components, not useEffect
- Dynamic routes: app/blog/[slug]/page.tsx not pages/blog/[slug].tsx
```

These three sections cover 90% of what Cascade needs to generate code that matches your project. Combine them in a single `coding-standards.md` rule with `activation: always_on`.

## Security Rules for Windsurf

Security is where Windsurf rules deliver the most value for vibe coding - AI tools generate working code fast, but they prioritize functionality over security. Copy this template to `.windsurf/rules/security.md` and customize for your stack.

```markdown
---
activation: always_on
---

# Security Standards

## SQL Injection Prevention

- ALWAYS use parameterized queries
- NEVER concatenate user input into SQL strings
- Use Prisma, Drizzle, or native parameterization

Example:
```typescript
// ❌ VULNERABLE - Never do this
const user = await db.query(`SELECT * FROM users WHERE email = '${userEmail}'`)

// ✅ SECURE - Always use parameterization
const user = await db.user.findUnique({
  where: { email: userEmail }
})
```

## Authentication & Authorization

- Check auth on EVERY server action and API route
- Use middleware for route protection, not per-route checks
- Session tokens in HttpOnly cookies only, never localStorage

Example:
```typescript
// ❌ VULNERABLE - Missing auth check
export async function updateProfile(data: ProfileData) {
  return await db.profile.update({ where: { id: data.id }, data })
}

// ✅ SECURE - Verify user owns resource
export async function updateProfile(data: ProfileData) {
  const session = await getSession()
  if (!session) throw new Error('Unauthorized')

  const profile = await db.profile.findUnique({ where: { id: data.id } })
  if (profile.userId !== session.user.id) throw new Error('Forbidden')

  return await db.profile.update({ where: { id: data.id }, data })
}
```

## Input Validation

- Validate ALL user input with Zod schemas
- Validate in server actions AND API routes
- Sanitize HTML input with DOMPurify

Example:
```typescript
// ❌ VULNERABLE - No validation
export async function createPost(title: string, content: string) {
  return await db.post.create({ data: { title, content } })
}

// ✅ SECURE - Zod validation
import { z } from 'zod'

const PostSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1).max(5000)
})

export async function createPost(input: unknown) {
  const { title, content } = PostSchema.parse(input)
  return await db.post.create({ data: { title, content } })
}
```

## Secret Management

- Secrets in .env files only, never commit to git
- Use process.env.VARIABLE_NAME server-side only
- Prefix public env vars with NEXT_PUBLIC_ for client use
- Verify .env in .gitignore

Example:
```typescript
// ❌ VULNERABLE - Hardcoded secret
const stripe = new Stripe('sk_live_abcd1234')

// ✅ SECURE - Environment variable
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
```

## XSS Prevention

- Escape output by default (React does this automatically)
- Use dangerouslySetInnerHTML only with sanitized input
- Set Content-Security-Policy headers

## Dependencies

- Run `npm audit` before every deploy
- Update dependencies monthly minimum
- Pin major versions in package.json
```

This security rule template covers the most common vulnerabilities in vibe coded projects. The Always On activation ensures Cascade applies these patterns to every code generation request.

## Windsurf Rules Templates by Stack

Different tech stacks need different security and coding patterns. Here are copy-paste templates for popular vibe coding stacks.

### Next.js 14 + TypeScript + Supabase Template

```markdown
---
activation: always_on
---

# Next.js 14 + Supabase Standards

## Framework Patterns
- Use App Router, not Pages Router
- Server Components by default
- 'use client' only for hooks, event handlers, browser APIs

## Database & Auth
- All queries through Supabase client
- Row Level Security (RLS) policies required on all tables
- Auth checks in middleware: middleware.ts
- Use Supabase Auth, not custom JWT

## Security Patterns
```typescript
// ✅ CORRECT - RLS enforces access control
import { createServerClient } from '@supabase/ssr'

export async function getProfile() {
  const supabase = createServerClient()
  const { data } = await supabase.from('profiles').select()
  return data // RLS filters to current user
}
```

## API Routes
- Use Server Actions for mutations
- API routes only for webhooks and third-party integrations
- Validate webhook signatures (Stripe, etc.)
```

### React + TypeScript + Express Template

```markdown
---
activation: always_on
---

# React + Express Standards

## Frontend Security
- API calls through centralized axios instance
- Auth tokens in memory, refresh tokens in HttpOnly cookies
- Validate data with Zod before sending to API

```typescript
// ✅ CORRECT - Centralized API client
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
})

api.interceptors.request.use((config) => {
  const token = getAccessToken() // from memory
  config.headers.Authorization = `Bearer ${token}`
  return config
})
```

## Backend Security
- Helmet.js for security headers
- express-rate-limit on all routes
- CORS configured for specific origins only

```typescript
// ✅ CORRECT - Security middleware
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

app.use(helmet())
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }))
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }))
```

## Database
- Prisma for type-safe queries
- All inputs validated with Zod
- Migrations version-controlled
```

### Python + FastAPI Template

```markdown
---
activation: always_on
---

# FastAPI Security Standards

## Input Validation
- Use Pydantic models for ALL request bodies
- Validate query params with Query() dependencies
- Sanitize file uploads

```python
# ✅ CORRECT - Pydantic validation
from pydantic import BaseModel, EmailStr, constr

class CreateUser(BaseModel):
    email: EmailStr
    username: constr(min_length=3, max_length=20)
    password: constr(min_length=8)
```

## Authentication
- OAuth2 with Password Bearer tokens
- bcrypt for password hashing (12+ rounds)
- JWT tokens with short expiration (15 min access, 7 day refresh)

## Database
- SQLAlchemy ORM required
- Alembic for migrations
- Connection pooling configured

```python
# ✅ CORRECT - Parameterized query
from sqlalchemy import select

stmt = select(User).where(User.email == user_email)
user = await session.execute(stmt)
```
```

Each template includes security patterns that AI tools commonly miss - copy the relevant template to your `.windsurf/rules/` directory and customize.

## Windsurf vs Cursor Rules

Windsurf rules and Cursor rules serve the same purpose - controlling AI code generation - but differ significantly in implementation and capabilities.

| Feature | Windsurf Rules | Cursor Rules |
|---------|----------------|--------------|
| **File location** | `.windsurf/rules/` | `.cursorrules` (single file) |
| **Global rules** | `global_rules.md` | `~/.cursor/rules/` |
| **Activation control** | 4 modes (Manual, Always On, Model Decision, Glob) | Always active |
| **File size limit** | 12k characters per file | 8k characters total |
| **Multiple files** | Unlimited in rules/ directory | One file per project |
| **Pattern matching** | Glob patterns for file types | Manual mentions only |
| **Version control** | Git-friendly (directory) | Git-friendly (single file) |

**Key difference:** Windsurf's activation modes prevent context pollution. Cursor loads all rules into every conversation, which can slow responses and cause conflicting guidance. Windsurf's Glob mode lets you activate React rules only in `.tsx` files, database rules only in `db/` files, etc.

**When to use Cursor rules:** Simple projects where one configuration file covers everything, or when migrating existing `.cursorrules` files.

**When to use Windsurf rules:** Complex projects with multiple frameworks, security requirements that need Always On enforcement, or when you want granular control over when rules activate.

**Migration tip:** If switching from Cursor to Windsurf, split your `.cursorrules` content into multiple focused files in `.windsurf/rules/` with appropriate activation modes.

## Best Practices for Windsurf Rules

Follow these do's and don'ts to create effective rules that improve Cascade's output without slowing it down.

| Do | Don't |
|----|-------|
| Keep rules "simple, concise, and specific" (Windsurf docs) | Write generic guidance already in model training |
| Use bullet points and numbered lists for scannability | Write long paragraphs - Cascade processes lists faster |
| Leverage XML tags to group related rules | Mix unrelated topics in one file |
| Show before/after code examples for security patterns | Rely on descriptions - show actual code |
| Use Glob activation for framework-specific guidance | Use Always On for everything (context pollution) |
| Test rules by asking Cascade to generate relevant code | Assume rules work without verification |
| Version control rules files with your project | Store sensitive data in rules files |
| Update rules when frameworks change (Next.js 14 → 15) | Leave outdated patterns in rules |

**12k Character Limit Strategy**

Each rule file maxes out at 12,000 characters. If you hit this limit:

1. Split by concern: `security.md`, `react-patterns.md`, `database.md`
2. Use Glob activation so only relevant rules load
3. Link between files using relative references

```markdown
<!-- In .windsurf/rules/security.md -->
See database.md for SQL injection prevention patterns
```

**Common Mistakes**

- **Too many Always On rules:** Start with Manual or Glob, promote only critical patterns
- **Conflicting rules:** Don't have both React class components and hooks patterns active
- **Vague descriptions:** "Use best practices" → "Use parameterized queries for SQL"
- **No examples:** Descriptions alone don't work - always show code

**Testing Your Rules**

After creating a rule, verify it works:

1. Ask Cascade to generate code that should trigger the rule
2. Check output matches your pattern
3. If not, try a more specific description or switch activation mode
4. Use Manual activation to test before promoting to Always On

## FAQ

**Do Windsurf rules cost credits to use?**

No. Both Memories and Rules cost zero credits. You can create unlimited rule files without affecting your Windsurf subscription - rules only guide how Cascade uses its existing context window.

**How many rule files can I create in .windsurf/rules/?**

Unlimited. Each file has a 12,000 character limit, but you can create as many files as needed. Use Glob or Model Decision activation to prevent loading unnecessary rules.

**Can I use Windsurf rules with other AI coding tools?**

No. Windsurf rules only work with Cascade in the Windsurf editor. However, the security patterns in these rules work with any vibe coding tool (Cursor, Claude Code, Bolt) - just copy the relevant sections to `.cursorrules` or system prompts.

**What's the difference between .windsurf/rules/ and global_rules.md?**

Files in `.windsurf/rules/` apply only to that workspace and live in your project directory (version-controlled). The `global_rules.md` file (located in `~/.windsurf/`) applies to ALL workspaces - use it for personal coding preferences, company security standards, or language-specific patterns that don't change project-to-project.

**Should I use Always On activation for security rules?**

Yes for critical security patterns (SQL injection, auth checks, secret handling). Use Glob activation for framework-specific security (React XSS, API route auth) to reduce context pollution. Avoid Always On for style preferences - use linters instead.

## Related Resources

**Prompting & AI Tool Guides:**
- [Master Prompting for Vibe Coding](/kb/prompts/)
- [Cursor Rules: Complete Configuration Guide](/kb/prompts/cursor-rules/)
- [Claude Code Patterns for Secure Development](/kb/vibe-coding-tools/claude-code/)

**Security Patterns:**
- [SQL Injection in AI-Generated Code](/kb/security/vulnerabilities/sql-injection/)
- [Hardcoded Secrets Detection & Prevention](/kb/security/vulnerabilities/hardcoded-secrets/)
- [Authentication Bypass in Vibe Coded Apps](/kb/security/vulnerabilities/broken-authentication/)
- [Input Validation with Zod](/kb/security/fixes/input-validation-zod/)

**Framework Security:**
- [Next.js + Supabase Security Checklist](/kb/security/stacks/nextjs-supabase/)
- [React Security Patterns for Vibe Coders](/kb/security/stacks/react/)
- [API Security Best Practices](/kb/security/checklists/api-security/)
