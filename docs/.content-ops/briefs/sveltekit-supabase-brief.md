# Content Brief: SvelteKit + Supabase Security

## Status

```yaml
status: DONE
created_at: 2025-12-17T18:30:00Z
created_by: Research Agent (Terminal 1)
claimed_by: Writer Agent
claimed_at: 2025-12-17T18:45:00Z
completed_at: 2025-12-17T19:30:00Z
```

---

## Article Metadata

```yaml
type: stack-guide
slug: sveltekit-supabase
url: /kb/security/stacks/sveltekit-supabase/
title: "SvelteKit + Supabase Security: Complete Checklist for Vibe Coders"
meta_description: "Secure your SvelteKit + Supabase app. Learn RLS policies, hooks.server.ts auth, getUser() vs getSession(), and common AI-generated security mistakes."
severity: High
word_count: 1800-2200
```

---

## Core Data

### Stack Overview
| Component | Technology | Security Focus |
|-----------|------------|----------------|
| Framework | SvelteKit 2.x | hooks.server.ts, form actions, load functions |
| Database | Supabase (PostgreSQL) | RLS policies, service role key |
| Auth | Supabase Auth / Auth.js | JWT validation, session management |
| Hosting | Vercel/Netlify/Cloudflare | Environment variables, edge functions |

### Primary References
| Reference | Description | Link |
|-----------|-------------|------|
| SvelteKit Hooks | Server hooks documentation | https://svelte.dev/docs/kit/hooks |
| SvelteKit Form Actions | Form security | https://svelte.dev/docs/kit/form-actions |
| Supabase RLS | Row Level Security guide | https://supabase.com/docs/guides/database/postgres/row-level-security |
| Supabase SSR | Server-side rendering guide | https://supabase.com/docs/guides/auth/server-side/advanced-guide |
| Supabase API Keys | Key management | https://supabase.com/docs/guides/api/api-keys |

### Known CVEs
| CVE | Description | Fixed In |
|-----|-------------|----------|
| CVE-2023-29003 | CSRF bypass via Content-Type: text/plain | SvelteKit 1.15.1 |
| CVE-2024-53262 | XSS via error.html template | SvelteKit 2.x |
| CVE-2024-45047 | XSS in Svelte SSR via custom toString() | Svelte 3.49.0+ |

---

## SEO Strategy

### Target Keywords
| Keyword | Search Intent | Priority |
|---------|---------------|----------|
| sveltekit supabase security | informational | Primary |
| sveltekit authentication | transactional | Primary |
| supabase rls sveltekit | informational | Secondary |
| sveltekit hooks.server.ts auth | transactional | Secondary |
| supabase getSession vs getUser | informational | Secondary |
| sveltekit csrf protection | informational | Tertiary |

### People Also Ask (FAQs)
1. How do I add authentication to SvelteKit with Supabase?
2. What is the difference between getSession and getUser in Supabase?
3. Do I need RLS if I'm using server-side auth?
4. How do I protect routes in SvelteKit?
5. Is the Supabase anon key safe to expose?

### Competitive Gap
**Top results analysis:**
- Supabase docs: Good quickstart but doesn't cover security pitfalls
- SvelteKit docs: Security section minimal, focused on CSRF config
- Blog posts: Often use insecure patterns (getSession on server)
- YouTube tutorials: Speed-focused, skip RLS entirely

**Our unique angle:**
- AI-generated SvelteKit + Supabase code patterns
- The getSession vs getUser trap (most AI tools use getSession incorrectly)
- Complete security checklist specific to this stack
- hooks.server.ts security patterns
- RLS policy templates for common scenarios

---

## Top 10 Security Issues (SvelteKit + Supabase)

### 1. Using getSession() Instead of getUser() on Server
**Severity: Critical**

The #1 mistake in SvelteKit + Supabase apps. AI tools generate this constantly.

```typescript
// VULNERABLE: AI generates this
// +page.server.ts
export async function load({ locals }) {
  const { data: { session } } = await locals.supabase.auth.getSession()

  if (!session) {
    throw redirect(303, '/login')
  }

  // DANGER: session data comes from cookies - can be spoofed!
  const userId = session.user.id
  // ... use userId for database queries
}
```

```typescript
// SECURE: Always use getUser() on server
export async function load({ locals }) {
  const { data: { user }, error } = await locals.supabase.auth.getUser()

  if (error || !user) {
    throw redirect(303, '/login')
  }

  // SAFE: user data validated against Supabase Auth server
  const userId = user.id
  // ... use userId for database queries
}
```

**Why AI gets this wrong:** getSession() is faster (no network call), so tutorials optimize for speed over security.

### 2. Missing RLS Policies
**Severity: Critical**

Tables without RLS = public to anyone with your anon key.

```sql
-- VULNERABLE: Table created without RLS
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  full_name TEXT,
  avatar_url TEXT
);
-- Anyone can read/write ALL profiles!

-- SECURE: Enable RLS and add policies
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);
```

### 3. Service Role Key in Client Code
**Severity: Critical**

The service role key bypasses ALL RLS. Exposing it = full database access.

```typescript
// VULNERABLE: Service role in environment
// .env (accidentally bundled into client)
PUBLIC_SUPABASE_SERVICE_ROLE_KEY=eyJhbGc... // CATASTROPHIC

// SECURE: Only use in server-side code
// .env
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc... // No PUBLIC_ prefix
```

```typescript
// SECURE: Use service role only in +page.server.ts or API routes
import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private'

export async function load() {
  const adminClient = createClient(
    PUBLIC_SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY
  )
  // Use for admin operations only
}
```

### 4. Missing Auth Check in hooks.server.ts
**Severity: High**

Without proper hooks setup, auth state is unreliable.

```typescript
// VULNERABLE: No auth validation in hooks
// src/hooks.server.ts
export const handle: Handle = async ({ event, resolve }) => {
  return resolve(event) // No auth setup!
}
```

```typescript
// SECURE: Proper auth setup in hooks
// src/hooks.server.ts
import { createServerClient } from '@supabase/ssr'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createServerClient(
    PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get: (key) => event.cookies.get(key),
        set: (key, value, options) => {
          event.cookies.set(key, value, { ...options, path: '/' })
        },
        remove: (key, options) => {
          event.cookies.delete(key, { ...options, path: '/' })
        },
      },
    }
  )

  // IMPORTANT: Use getUser() not getSession() for server-side validation
  event.locals.getUser = async () => {
    const { data: { user }, error } = await event.locals.supabase.auth.getUser()
    if (error) return null
    return user
  }

  return resolve(event)
}
```

### 5. Authorization in +layout.server.ts Only
**Severity: High**

Layout auth checks don't propagate to all child routes reliably.

```typescript
// VULNERABLE: Auth only in layout
// +layout.server.ts
export async function load({ locals }) {
  const user = await locals.getUser()
  if (!user) throw redirect(303, '/login')
  return { user }
}

// Child +page.server.ts assumes auth happened - DANGEROUS
export async function load({ parent }) {
  const { user } = await parent() // Layout might be bypassed!
}
```

```typescript
// SECURE: Check auth in each +page.server.ts
// +page.server.ts
export async function load({ locals }) {
  const user = await locals.getUser()
  if (!user) throw redirect(303, '/login')

  // Now safe to use user.id
  const { data } = await locals.supabase
    .from('profiles')
    .select()
    .eq('user_id', user.id)
    .single()

  return { profile: data }
}
```

### 6. Missing Server-Side Validation in Form Actions
**Severity: High**

Client-side validation is UX, not security.

```typescript
// VULNERABLE: Trusting client data
// +page.server.ts
export const actions = {
  updateProfile: async ({ request, locals }) => {
    const data = await request.formData()
    const name = data.get('name') // No validation!

    await locals.supabase
      .from('profiles')
      .update({ name })
      .eq('id', locals.user.id)
  }
}
```

```typescript
// SECURE: Validate with Zod
import { z } from 'zod'
import { fail } from '@sveltejs/kit'

const profileSchema = z.object({
  name: z.string().min(1).max(100),
  bio: z.string().max(500).optional()
})

export const actions = {
  updateProfile: async ({ request, locals }) => {
    const user = await locals.getUser()
    if (!user) return fail(401, { error: 'Unauthorized' })

    const data = await request.formData()
    const result = profileSchema.safeParse({
      name: data.get('name'),
      bio: data.get('bio')
    })

    if (!result.success) {
      return fail(400, { errors: result.error.flatten() })
    }

    await locals.supabase
      .from('profiles')
      .update(result.data)
      .eq('user_id', user.id)
  }
}
```

### 7. Views Bypassing RLS
**Severity: Medium**

PostgreSQL views run as the creator (postgres) by default, ignoring RLS.

```sql
-- VULNERABLE: View bypasses RLS
CREATE VIEW public_user_data AS
  SELECT id, email, created_at FROM auth.users;
-- This view exposes ALL users to anyone!

-- SECURE: Use security_invoker (Postgres 15+)
CREATE VIEW public_user_data
WITH (security_invoker = true) AS
  SELECT id, email, created_at FROM auth.users;
-- Now respects RLS of the calling user
```

### 8. RLS Policy Using user_metadata
**Severity: Medium**

Users can modify their own metadata - don't use it for authorization.

```sql
-- VULNERABLE: Using user_metadata for auth decisions
CREATE POLICY "Admins can delete"
  ON posts FOR DELETE
  USING ((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin');
-- Users can potentially set their own role!

-- SECURE: Use app_metadata (only settable server-side) or separate table
CREATE POLICY "Admins can delete"
  ON posts FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM admin_users WHERE user_id = auth.uid()
    )
  );
```

### 9. Exposing Sensitive Data in Load Functions
**Severity: Medium**

Data returned from load() is serialized and sent to the client.

```typescript
// VULNERABLE: Returning sensitive data
// +page.server.ts
export async function load({ locals }) {
  const { data: user } = await locals.supabase
    .from('users')
    .select('*') // Returns password_hash, internal_notes, etc.
    .single()

  return { user } // All fields sent to client!
}
```

```typescript
// SECURE: Select only needed fields
export async function load({ locals }) {
  const { data: user } = await locals.supabase
    .from('users')
    .select('id, name, email, avatar_url') // Only public fields
    .single()

  return { user }
}
```

### 10. Missing CSRF Configuration Check
**Severity: Medium**

SvelteKit has CSRF protection, but ensure it's not accidentally disabled.

```typescript
// VULNERABLE: CSRF disabled (sometimes done for API routes)
// svelte.config.js
export default {
  kit: {
    csrf: {
      checkOrigin: false // DANGEROUS!
    }
  }
}
```

```typescript
// SECURE: Keep CSRF enabled (default)
// svelte.config.js
export default {
  kit: {
    csrf: {
      checkOrigin: true // Default - don't change
    }
  }
}
```

---

## Content Outline

### Quick Answer (50 words max)
SvelteKit + Supabase is powerful but has security traps AI tools fall into. The biggest: using getSession() instead of getUser() on the server, missing RLS policies, and exposed service role keys. This guide covers all 10 common vulnerabilities with copy-paste fixes.

### Section 1: Why This Stack Needs Extra Care
- Popular with vibe coders (fast to ship)
- AI tools generate insecure patterns by default
- Supabase's power (direct DB access) = more attack surface
- SvelteKit's flexibility (hooks, actions, load) = more places to mess up
- Word count: 100-150

### Section 2: The getSession() vs getUser() Trap
- getSession() reads from cookies - can be spoofed
- getUser() validates with Supabase Auth server
- AI tools use getSession() because it's faster
- Always use getUser() on the server
- Include code example
- Word count: 150-200

### Section 3: RLS - Your Database's Bodyguard
- What RLS does (row-level access control)
- Why AI skips it (code "works" without it)
- Template policies for common patterns
- Testing RLS policies
- Word count: 200-250

### Section 4: The Service Role Key Disaster
- What it does (bypasses ALL security)
- Common exposure vectors
- Checking if you've exposed it
- What to do if compromised
- Word count: 100-150

### Section 5: hooks.server.ts Security Setup
- Complete secure setup
- Why it matters
- Common mistakes
- Testing your hooks
- Word count: 150-200

### Section 6: Form Actions Security
- Server-side validation with Zod
- Auth checks in every action
- Error handling patterns
- Word count: 150-200

### Section 7: Security Checklist (Interactive)
- Pre-deployment checklist by category
- RLS policies
- Auth configuration
- Environment variables
- hooks.server.ts
- Form actions
- Word count: 100 (checklist format)

### Section 8: AI Fix Prompt
Complete prompt for fixing SvelteKit + Supabase security issues

### FAQ Section
- Use PAA questions above
- Each answer 50-100 words

### Related Content
- Links to RLS article (if exists)
- Links to Next.js + Supabase guide
- Links to auth vulnerabilities

---

## Internal Links (7-10 required)

| Anchor Text | URL | Context/Placement |
|-------------|-----|-------------------|
| SQL injection | /kb/security/vulnerabilities/sql-injection/ | RLS section |
| missing authentication | /kb/security/vulnerabilities/missing-auth/ | Auth section |
| IDOR | /kb/security/vulnerabilities/idor/ | RLS section |
| hardcoded secrets | /kb/security/vulnerabilities/hardcoded-secrets/ | Service key section |
| XSS | /kb/security/vulnerabilities/xss/ | Output encoding |
| CSRF | /kb/security/vulnerabilities/csrf/ | Form actions section |
| Next.js + Supabase security | /kb/security/stacks/nextjs-supabase/ | Related stacks |
| Cursor security patterns | /kb/vibe-coding-tools/cursor/ | AI tool context |
| Claude Code security patterns | /kb/vibe-coding-tools/claude-code/ | AI tool context |
| sensitive data exposure | /kb/security/vulnerabilities/sensitive-data-exposure/ | Load function section |

---

## External Links (8-12 required)

| Anchor Text | URL | Tier | Placement |
|-------------|-----|------|-----------|
| SvelteKit Hooks Documentation | https://svelte.dev/docs/kit/hooks | 6 | Hooks section |
| SvelteKit Form Actions | https://svelte.dev/docs/kit/form-actions | 6 | Form section |
| Supabase Row Level Security | https://supabase.com/docs/guides/database/postgres/row-level-security | 6 | RLS section |
| Supabase SSR Guide | https://supabase.com/docs/guides/auth/server-side/advanced-guide | 6 | Auth section |
| Supabase API Keys | https://supabase.com/docs/guides/api/api-keys | 6 | Service key section |
| CVE-2023-29003 (SvelteKit CSRF) | https://github.com/advisories/GHSA-5p75-vc5g-8rv2 | 6 | CSRF context |
| Snyk SvelteKit Vulnerabilities | https://security.snyk.io/vuln/SNYK-JS-SVELTEJSKIT-5411362 | 4 | CVE context |
| OWASP A01:2021 Broken Access Control | https://owasp.org/Top10/A01_2021-Broken_Access_Control/ | 1 | Auth section |
| Zod Validation Library | https://zod.dev/ | 6 | Validation section |

---

## AI Fix Prompt (Draft)

```
Review my SvelteKit + Supabase codebase for security vulnerabilities:

## 1. getSession() vs getUser() Check

Search for `getSession()` calls in server-side code (+page.server.ts, +layout.server.ts, hooks.server.ts, API routes).

**Pattern to find:**
- `auth.getSession()` in any server file
- Using session.user for authorization decisions

**Fix:** Replace with `auth.getUser()` for any server-side auth checks.

## 2. RLS Policy Audit

For each table in supabase/migrations or schema.sql:
- Check if RLS is enabled: `ALTER TABLE ... ENABLE ROW LEVEL SECURITY`
- Check for SELECT/INSERT/UPDATE/DELETE policies
- Verify policies use `auth.uid()` not `user_metadata`

**Pattern to find:**
- Tables without `ENABLE ROW LEVEL SECURITY`
- Policies using `jwt() -> 'user_metadata'`

## 3. Service Role Key Exposure

Search for service role key usage:
- Any file importing `SUPABASE_SERVICE_ROLE_KEY`
- Environment variables with `PUBLIC_` prefix containing service role
- `createClient()` calls with service role in client-accessible code

**Pattern to find:**
- `PUBLIC_SUPABASE_SERVICE_ROLE` anywhere
- Service role in any +page.svelte or +layout.svelte

## 4. hooks.server.ts Auth Setup

Check src/hooks.server.ts for:
- Proper Supabase client creation with cookies
- `getUser()` helper on event.locals (not getSession)
- Auth validation before protected routes

## 5. Form Actions Validation

For each form action in +page.server.ts:
- Auth check using getUser() at start
- Input validation (Zod or similar)
- Proper error handling with fail()

**Pattern to find:**
- Form actions without `getUser()` check
- Direct use of `formData.get()` without validation

## 6. Load Function Data Exposure

Check +page.server.ts and +layout.server.ts load functions:
- Are you selecting specific fields or using `select('*')`?
- Is sensitive data being returned to client?

For each vulnerability found:
- Show the file and line
- Explain the risk
- Provide the secure replacement code
```

---

## Notes for Writer Agent

### Tone Guidance
- **Empowering:** This stack is great, just needs these fixes
- **Practical:** Every section has copy-paste code
- **Non-judgmental:** AI tools generate this - it's not the vibe coder's fault
- **Urgent for critical issues:** Service role exposure = immediate action

### Technical Accuracy
- getSession() reads from cookies without validation
- getUser() makes network call to Supabase Auth
- RLS is disabled by default on new tables
- Views bypass RLS unless security_invoker is set (Postgres 15+)
- service_role key bypasses ALL RLS - complete database access
- SvelteKit CSRF was vulnerable until 1.15.1 (check version)

### Things to Avoid
- Don't suggest disabling CSRF for any reason
- Don't show service role key patterns without huge warnings
- Don't imply getSession is "safe enough" on server
- Don't skip RLS testing instructions

### Vibe Coding Terms
Use these 3-5 times naturally:
- vibe coding
- vibe coders
- vibe coded
- AI-generated code

### Value Maximizers
- Include complete hooks.server.ts setup (copy-paste ready)
- Include RLS policy templates for users, posts, comments patterns
- Include Zod schema examples for common forms
- Make the checklist actually interactive/checkable

---

## Checklist Before Marking READY

- [x] All external links verified working
- [x] CVE references included (2023-29003, 2024-53262, 2024-45047)
- [x] 10 internal links identified
- [x] 5 PAA questions included
- [x] Competitive gap is specific (getSession trap not covered elsewhere)
- [x] Code examples drafted (10 vulnerability patterns)
- [x] No placeholder text
- [x] AI fix prompt comprehensive
- [x] Stack-specific (not generic security advice)

---

**Brief Status:** READY for Writer Agent
