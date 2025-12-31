# Content Brief: Next.js + Supabase Security Guide

## Status

```yaml
status: DONE
created_at: 2025-12-17T13:00:00Z
created_by: Research Agent (Terminal 1)
claimed_by: Writer Agent Terminal 2
claimed_at: 2025-12-17T13:15:00Z
completed_at: 2025-12-17T13:30:00Z
```

---

## Article Metadata

```yaml
type: stack
slug: nextjs-supabase
url: /kb/security/stacks/nextjs-supabase/
title: "Next.js + Supabase Security: 5 Critical Patterns"
meta_description: "Secure your Next.js + Supabase vibe coded app. Learn RLS setup, key management, and Server Component security. Copy-paste fixes included."
```

---

## Core Data

### Primary References
| Reference | ID | Link |
|-----------|-----|------|
| OWASP Broken Access Control | A01:2021 | https://owasp.org/Top10/A01_2021-Broken_Access_Control/ |
| OWASP Security Misconfiguration | A05:2021 | https://owasp.org/Top10/A05_2021-Security_Misconfiguration/ |
| OWASP Auth Failures | A07:2021 | https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/ |
| CWE-639 (IDOR) | CWE-639 | https://cwe.mitre.org/data/definitions/639.html |
| CWE-862 (Missing Auth) | CWE-862 | https://cwe.mitre.org/data/definitions/862.html |
| CWE-284 (Improper Access Control) | CWE-284 | https://cwe.mitre.org/data/definitions/284.html |

### External Sources (for outbound links)
| Source | URL | Key Finding | Tier |
|--------|-----|-------------|------|
| Supabase RLS Docs | https://supabase.com/docs/guides/database/postgres/row-level-security | RLS must be enabled on all public schema tables - tables without RLS are accessible to anyone | 6 |
| Supabase Securing API | https://supabase.com/docs/guides/api/securing-your-api | Pre-request functions for custom API validation, key management best practices | 6 |
| Next.js Security Blog | https://nextjs.org/blog/security-nextjs-server-components-actions | Data Access Layer pattern, Server Actions security, CSRF protection built-in | 6 |
| OWASP Serverless Top 10 | https://owasp.org/www-project-serverless-top-10/ | Serverless security risks: over-permissioned functions, event injection | 1 |
| OWASP API Security Top 10 | https://owasp.org/www-project-api-security/ | BOLA (Broken Object Level Authorization) is #1 API risk since 2019 | 1 |
| MakerKit Security Guide | https://makerkit.dev/docs/next-supabase-turbo/security/nextjs-best-practices | Practical Next.js + Supabase security patterns, server-only imports | 2 |
| Supabase Production Checklist | https://supabase.com/docs/guides/deployment/going-into-prod | Production security checklist including RLS verification | 6 |
| Supabase Security Advisor | https://supabase.com/docs/guides/database/database-advisors | Built-in tool to detect RLS misconfigurations | 6 |
| OWASP Serverless Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Serverless_FaaS_Security_Cheat_Sheet.html | Function security, secrets management, event validation | 1 |
| PortSwigger Access Control | https://portswigger.net/web-security/access-control | Comprehensive access control testing guide | 2 |

### Key Facts to Include
- RLS must be enabled on ALL tables in the public schema - without it, data is accessible to anyone via anon key (Supabase Docs)
- Views bypass RLS by default in Postgres - use `security_invoker = true` in Postgres 15+ (Supabase Docs)
- BOLA (Broken Object Level Authorization) has been the #1 API security risk since 2019 (OWASP API Top 10)
- `auth.uid()` returns null when unauthenticated - policies using `auth.uid() = user_id` without null checks may fail open (Supabase Docs)
- Server Actions in Next.js use POST-only and compare Origin to Host for built-in CSRF protection (Next.js Blog)
- Variables without `NEXT_PUBLIC_` prefix are server-only in Next.js (Next.js Docs)
- Pre-request functions in Supabase only work with Data API - Realtime/Storage need RLS policies (Supabase Docs)
- Wrapping `auth.uid()` in SELECT improves RLS performance by up to 99% (Supabase Docs)

---

## SEO Strategy

### Target Keywords
| Keyword | Search Intent | Priority |
|---------|---------------|----------|
| next.js supabase security | informational | Primary |
| supabase rls best practices | informational | Primary |
| supabase row level security | informational | Secondary |
| next.js supabase authentication | informational | Secondary |
| supabase anon key vs service key | informational | Secondary |
| next.js server components security | informational | Secondary |
| vibe coding security stack | informational | Tertiary |

### People Also Ask (FAQs)
1. Is Supabase anon key safe to expose?
2. How do I enable Row Level Security in Supabase?
3. What's the difference between anon key and service role key?
4. Do Server Components in Next.js protect my secrets?
5. How do I secure Next.js API routes with Supabase?

### Competitive Gap
**Top results analysis:**
- Supabase docs: Comprehensive but technical, lacks vibe coder perspective
- Blog posts: Focus on auth setup, rarely cover RLS deeply
- Tutorials: Show "how to build" but not "how to secure"

**Our unique angle:**
- Vibe coder-focused: Plain English explanations with copy-paste RLS policies
- AI tool context: Why AI generates insecure Supabase patterns
- Complete security checklist: 5 critical patterns with before/after code
- Scanner integration: CTA to automated detection

---

## Content Outline

### Quick Answer (50 words max)
Next.js + Supabase apps need five security patterns: enable RLS on every table, use policies for each operation, protect service keys, validate in Server Components, and secure Server Actions. AI tools often skip these - especially RLS - leaving your database exposed.

### Section 1: Why This Stack Needs Special Attention
- Most popular vibe coding stack for full-stack apps
- Supabase exposes database directly via API - RLS is your only protection
- AI tools generate working code, not secure code
- Without RLS, anyone with your anon key can read/write everything
- Word count: 100-150

### Section 2: What is Row Level Security (RLS)?
- Plain English definition: Database firewall that checks every query
- Analogy: Hotel room keys - your key only opens YOUR room, even if you know other room numbers
- Consequences: Without RLS, attackers can read/modify any row in your database
- How it works: Postgres evaluates a policy (boolean expression) for every row
- Word count: 150-200

### Section 3: Pattern 1 - Enable RLS on Every Table
- Default state: RLS is OFF (AI tools never enable it)
- Code: How to enable RLS
- Warning: Tables without RLS are publicly accessible
- Supabase Dashboard vs SQL approach
- Word count: 150-200

### Section 4: Pattern 2 - Write Policies for Each Operation
- Why separate policies: SELECT, INSERT, UPDATE, DELETE have different needs
- Common AI mistake: Using `FOR ALL` with overly permissive conditions
- WITH CHECK vs USING explained
- Code examples for each operation type
- Word count: 200-250

### Section 5: Pattern 3 - Protect Your Keys
- anon key vs service_role key explained
- anon key: Safe for client, but only with RLS enabled
- service_role key: NEVER expose to client - bypasses ALL RLS
- Environment variable patterns for Next.js
- NEXT_PUBLIC_ prefix danger
- Word count: 150-200

### Section 6: Pattern 4 - Server Component Security
- What Server Components can access (secrets, database)
- What can leak to client (props passed to Client Components)
- Using `import 'server-only'`
- Data Access Layer pattern
- Word count: 150-200

### Section 7: Pattern 5 - Secure Server Actions
- Built-in CSRF protection (POST only, Origin check)
- Always re-verify authentication in actions
- Validate all arguments (TypeScript types aren't runtime checks)
- Never trust closures contain what you expect
- Word count: 150-200

### Section 8: The 5-Minute Security Audit
- Step-by-step checklist to verify your app
- Using Supabase Security Advisor
- What to check in your codebase
- Scanner CTA for automated detection
- Word count: 200-300

### FAQ Section
- Use PAA questions above
- Each answer: 50-100 words
- Include citable fact in each

### Related Content
- Links to vulnerability articles
- Links to AI tool patterns

---

## Internal Links (5-10 required)

| Anchor Text | URL | Context/Placement |
|-------------|-----|-------------------|
| SQL injection | /kb/security/vulnerabilities/sql-injection/ | Section on database queries |
| hardcoded secrets | /kb/security/vulnerabilities/hardcoded-secrets/ | Key management section |
| missing authentication | /kb/security/vulnerabilities/missing-auth/ | Server Actions section |
| IDOR | /kb/security/vulnerabilities/idor/ | RLS policies explanation |
| Cursor security patterns | /kb/vibe-coding-tools/cursor/ | AI tool context |
| Bolt security patterns | /kb/vibe-coding-tools/bolt/ | AI tool context |
| Claude Code security patterns | /kb/vibe-coding-tools/claude-code/ | AI tool context |
| XSS | /kb/security/vulnerabilities/xss/ | Server Component section |

---

## External Links (8-12 required)

| Anchor Text | URL | Tier | Placement |
|-------------|-----|------|-----------|
| Supabase Row Level Security | https://supabase.com/docs/guides/database/postgres/row-level-security | 6 | Section 2-3 |
| Supabase Securing Your API | https://supabase.com/docs/guides/api/securing-your-api | 6 | Key management section |
| Next.js Security Blog | https://nextjs.org/blog/security-nextjs-server-components-actions | 6 | Server Components section |
| OWASP Broken Access Control | https://owasp.org/Top10/A01_2021-Broken_Access_Control/ | 1 | Intro or FAQ |
| CWE-639 IDOR | https://cwe.mitre.org/data/definitions/639.html | 1 | RLS section |
| OWASP API Security Top 10 | https://owasp.org/www-project-api-security/ | 1 | Why this matters section |
| Supabase Production Checklist | https://supabase.com/docs/guides/deployment/going-into-prod | 6 | Security audit section |
| Supabase Security Advisor | https://supabase.com/docs/guides/database/database-advisors | 6 | Security audit section |
| OWASP Serverless Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Serverless_FaaS_Security_Cheat_Sheet.html | 1 | Server Actions or FAQ |
| PortSwigger Access Control | https://portswigger.net/web-security/access-control | 2 | IDOR/authorization section |

**Tier Reference:**
1. OWASP, CWE, NIST, MDN
2. PortSwigger, Snyk Learn, HackerOne
3. Verizon DBIR, IBM Reports
4. Opengrep, Semgrep, Trivy, Gitleaks
5. IEEE, USENIX, ACM, arXiv
6. Framework docs (Next.js, Supabase, etc.)
7. Tool official sites

---

## Code Examples Needed

### Pattern 1: RLS Not Enabled (Most Critical)
```sql
-- VULNERABLE: AI generates tables without RLS
CREATE TABLE profiles (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  full_name TEXT,
  avatar_url TEXT
);
-- No RLS = anyone can read/write all profiles

-- SECURE: Enable RLS and add policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
ON profiles FOR SELECT
TO authenticated
USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can update their own profile"
ON profiles FOR UPDATE
TO authenticated
USING ((SELECT auth.uid()) = user_id)
WITH CHECK ((SELECT auth.uid()) = user_id);
```
Explanation: Without RLS, the Supabase anon key can access every row. AI tools create tables but never enable RLS or write policies.

### Pattern 2: Overly Permissive Policy
```sql
-- VULNERABLE: AI might generate this for "allow authenticated users"
CREATE POLICY "Authenticated users can do anything"
ON profiles FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- SECURE: Separate policies with proper checks
CREATE POLICY "Users view own profile"
ON profiles FOR SELECT
TO authenticated
USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users insert own profile"
ON profiles FOR INSERT
TO authenticated
WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users update own profile"
ON profiles FOR UPDATE
TO authenticated
USING ((SELECT auth.uid()) = user_id)
WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users delete own profile"
ON profiles FOR DELETE
TO authenticated
USING ((SELECT auth.uid()) = user_id);
```
Explanation: `USING (true)` means ANY authenticated user can access ANY row. Separate policies per operation with user_id checks.

### Pattern 3: Service Key Exposed to Client
```typescript
// VULNERABLE: Service key in client component
// components/AdminPanel.tsx (Client Component)
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY! // EXPOSED!
)

// SECURE: Use anon key on client, service key only on server
// lib/supabase/client.ts (for client components)
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // Safe with RLS
)

// lib/supabase/server.ts (for server components/actions only)
import { createClient } from '@supabase/supabase-js'
import 'server-only' // Prevents accidental client import

export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!, // No NEXT_PUBLIC_ prefix
  process.env.SUPABASE_SERVICE_KEY! // Never exposed
)
```
Explanation: Service key bypasses RLS completely. Anyone with this key has full database access. Use `import 'server-only'` to prevent leaking.

### Pattern 4: Missing Auth Check in Server Action
```typescript
// VULNERABLE: Server Action without auth verification
'use server'

export async function deletePost(postId: string) {
  // AI generates this - no auth check!
  await supabase.from('posts').delete().eq('id', postId)
}

// SECURE: Always verify auth in Server Actions
'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function deletePost(postId: string) {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (name) => cookieStore.get(name)?.value } }
  )

  // Verify user is authenticated
  const { data: { user }, error } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  // Verify user owns this post (RLS also checks, but defense in depth)
  const { data: post } = await supabase
    .from('posts')
    .select('user_id')
    .eq('id', postId)
    .single()

  if (post?.user_id !== user.id) throw new Error('Not authorized')

  await supabase.from('posts').delete().eq('id', postId)
}
```
Explanation: Server Actions are callable from client. Always verify authentication and authorization, even with RLS enabled (defense in depth).

### Pattern 5: Secrets Passed to Client Component
```typescript
// VULNERABLE: Server Component passes secrets to Client
// app/page.tsx (Server Component)
import ClientDashboard from './ClientDashboard'

export default async function Page() {
  const config = {
    apiKey: process.env.STRIPE_SECRET_KEY, // Will be exposed!
    dbUrl: process.env.DATABASE_URL
  }
  return <ClientDashboard config={config} />
}

// SECURE: Never pass secrets to client, fetch on server
// app/page.tsx (Server Component)
import ClientDashboard from './ClientDashboard'
import { getPublicDashboardData } from '@/lib/data'

export default async function Page() {
  // Fetch data on server using secrets
  const dashboardData = await getPublicDashboardData()
  // Only pass sanitized, public data to client
  return <ClientDashboard data={dashboardData} />
}

// lib/data.ts
import 'server-only'

export async function getPublicDashboardData() {
  // Use secrets here, return only public data
  const response = await fetch(process.env.ANALYTICS_API_URL!, {
    headers: { 'Authorization': `Bearer ${process.env.ANALYTICS_KEY}` }
  })
  const data = await response.json()
  // Return only what client needs
  return { visitCount: data.visits, pageViews: data.pageViews }
}
```
Explanation: Props passed to Client Components are serialized and visible in browser. Use `import 'server-only'` and Data Access Layer pattern.

---

## AI Fix Prompt Requirements (for vulnerabilities)

The Writer Agent should create an AI fix prompt that includes:
- [ ] Specific file patterns to search: `*.sql`, `supabase/migrations/*`, `lib/supabase/*`, `app/api/*`, `*.server.ts`
- [ ] RLS verification command: Check `ALTER TABLE ... ENABLE ROW LEVEL SECURITY` exists for each table
- [ ] Policy audit: Ensure no `USING (true)` or `WITH CHECK (true)` without proper conditions
- [ ] Key exposure check: Search for `SUPABASE_SERVICE` in files without `server-only` import
- [ ] NEXT_PUBLIC_ audit: Ensure no secrets use this prefix
- [ ] Server Action verification: Check `auth.getUser()` is called before mutations
- [ ] Framework-specific notes: Next.js App Router patterns, Supabase SSR package usage
- [ ] Verification: Use Supabase Security Advisor dashboard tool

---

## Notes for Writer Agent

### Tone Guidance
- This is the most popular vibe coding stack - readers are likely building real projects
- Be practical and specific - they need copy-paste solutions
- Acknowledge that AI tools make this stack LOOK easy but hide security complexity
- RLS is the hero of this article - make it clear this is THE critical security feature

### Technical Accuracy
- Supabase anon key IS safe to expose IF RLS is properly configured
- Service role key bypasses ALL RLS - this is by design for admin operations
- `auth.uid()` returns null for unauthenticated requests - this is a common gotcha
- Views bypass RLS by default in Postgres (security definer) - mention this
- Wrapping auth functions in SELECT is a real performance optimization

### Things to Avoid
- Don't suggest disabling RLS "for development" - this is how it ships to production
- Don't confuse authentication (who you are) with authorization (what you can access)
- Don't imply RLS is optional - for Supabase, it's mandatory security
- Don't oversimplify key differences - anon vs service role is critical

### Vibe Coding Terms
Use these 3-5 times naturally:
- vibe coding
- vibe coders
- vibe coded
- AI-generated code

---

## Checklist Before Marking READY

- [x] All external links verified working
- [x] CWE/OWASP references correct
- [x] 8 internal links identified
- [x] 5 PAA questions included
- [x] Competitive gap is specific
- [x] Code examples drafted (5 patterns)
- [x] No placeholder text (TBD, TODO)

---

**Brief Status:** READY for Writer Agent
