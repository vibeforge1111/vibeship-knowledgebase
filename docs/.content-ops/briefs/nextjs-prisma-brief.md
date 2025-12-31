# Content Brief: Next.js + Prisma Security Guide

## Status

```yaml
status: DONE
created_at: 2025-12-17T13:30:00Z
created_by: Research Agent (Terminal 1)
claimed_by: Writer Agent Terminal 2
claimed_at: 2025-12-17T13:45:00Z
completed_at: 2025-12-17T14:30:00Z
```

---

## Article Metadata

```yaml
type: stack
slug: nextjs-prisma
url: /kb/security/stacks/nextjs-prisma/
title: "Next.js + Prisma Security: 5 Hidden Risks"
meta_description: "Secure your Next.js + Prisma vibe coded app. Learn $queryRaw injection risks, operator injection, and connection string security. Copy-paste fixes included."
```

---

## Core Data

### Primary References
| Reference | ID | Link |
|-----------|-----|------|
| OWASP Injection | A03:2021 | https://owasp.org/Top10/A03_2021-Injection/ |
| CWE-89 (SQL Injection) | CWE-89 | https://cwe.mitre.org/data/definitions/89.html |
| CWE-564 (SQL Injection via ORM) | CWE-564 | https://cwe.mitre.org/data/definitions/564.html |
| OWASP Insecure Design | A04:2021 | https://owasp.org/Top10/A04_2021-Insecure_Design/ |
| CWE-20 (Improper Input Validation) | CWE-20 | https://cwe.mitre.org/data/definitions/20.html |

### External Sources (for outbound links)
| Source | URL | Key Finding | Tier |
|--------|-----|-------------|------|
| Prisma Raw Queries Docs | https://www.prisma.io/docs/orm/prisma-client/using-raw-sql/raw-queries | `$queryRaw` with tagged templates is safe; `$queryRawUnsafe` requires manual escaping | 6 |
| OWASP SQL Injection Prevention | https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html | Parameterized queries are primary defense; ORMs shift but don't eliminate risk | 1 |
| OWASP Query Parameterization | https://cheatsheetseries.owasp.org/cheatsheets/Query_Parameterization_Cheat_Sheet.html | Code samples for parameterized queries across languages | 1 |
| Node.js Security Blog - Prisma SQL Injection | https://www.nodejs-security.com/blog/prisma-raw-query-sql-injection | `$queryRaw` is safe, `$queryRawUnsafe` is dangerous - confusing naming explained | 2 |
| Aikido - Prisma Operator Injection | https://www.aikido.dev/blog/prisma-and-postgresql-vulnerable-to-nosql-injection | Operator injection in findFirst, findMany - cast inputs to primitives | 2 |
| Elttam - Prisma ORM Leak | https://www.elttam.com/blog/plorming-your-primsa-orm/ | Time-based attacks via relational filtering, don't pass req.body directly to queries | 2 |
| Snyk Prisma Vulnerabilities | https://security.snyk.io/package/npm/prisma | CVE tracking for Prisma package | 4 |
| Prisma Next.js Guide | https://www.prisma.io/docs/guides/nextjs | Official Prisma + Next.js integration patterns | 6 |
| Cerbos Next.js Prisma Auth | https://www.cerbos.dev/blog/accessing-protected-resources-in-nextjs-with-prisma | Authorization layer integration with Prisma | 2 |
| PortSwigger SQL Injection | https://portswigger.net/web-security/sql-injection | Comprehensive SQL injection testing guide | 2 |

### Key Facts to Include
- Prisma's `$queryRaw` with tagged templates is SAFE - it uses prepared statements automatically (Prisma Docs)
- `$queryRawUnsafe` and `$executeRawUnsafe` are explicitly dangerous - names warn developers (Prisma Docs)
- Using `Prisma.raw(userInput)` inside `$queryRaw` defeats all escaping protections (Node.js Security)
- Operator injection affects `findFirst`, `findMany`, `updateMany`, `deleteMany` - not `findUnique` (Aikido Security)
- Attackers can bypass authentication with `password = { "not": "" }` if input isn't type-cast (Aikido Security)
- ORM Leak vulnerabilities enable time-based data extraction through relational filtering (Elttam Research)
- ORMs generate SQL queries - they shift SQL injection risk but don't eliminate it (OWASP, CWE-564)
- Template variables in Prisma cannot substitute identifiers (table/column names, SQL keywords) (Prisma Docs)
- Hot reloading in Next.js dev mode can create multiple Prisma Client instances (Prisma Docs)

---

## SEO Strategy

### Target Keywords
| Keyword | Search Intent | Priority |
|---------|---------------|----------|
| next.js prisma security | informational | Primary |
| prisma sql injection | informational | Primary |
| prisma queryRaw security | informational | Secondary |
| prisma raw query vulnerability | informational | Secondary |
| prisma operator injection | informational | Secondary |
| next.js database security | informational | Secondary |
| vibe coding prisma | informational | Tertiary |

### People Also Ask (FAQs)
1. Is Prisma safe from SQL injection?
2. What is the difference between $queryRaw and $queryRawUnsafe?
3. How do I secure my DATABASE_URL in Next.js?
4. Can Prisma be hacked?
5. Should I use raw SQL queries with Prisma?

### Competitive Gap
**Top results analysis:**
- Prisma docs: Focus on features, security buried in details
- Blog posts: Cover basic auth setup, miss raw query dangers
- Security research: Technical but no vibe coder perspective

**Our unique angle:**
- AI tool context: Why AI generates unsafe Prisma patterns (uses $queryRawUnsafe, passes req.body directly)
- Plain English: Explain why `$queryRaw` LOOKS dangerous but isn't, and vice versa
- Operator injection: A vulnerability most tutorials completely miss
- Copy-paste patterns: Safe vs unsafe code with clear explanations

---

## Content Outline

### Quick Answer (50 words max)
Prisma is type-safe by default, but has hidden risks: `$queryRawUnsafe` enables SQL injection, operator injection bypasses auth in `findMany` queries, and passing `req.body` directly to queries leaks data. AI tools often generate these patterns. Use tagged templates and type-cast all inputs.

### Section 1: Why Prisma Security Matters
- Most popular ORM for Next.js/TypeScript projects
- AI tools love Prisma - generates type-safe code quickly
- Type safety creates FALSE sense of security
- ORM doesn't eliminate injection risks - shifts them (CWE-564)
- Word count: 100-150

### Section 2: What Makes Prisma Different?
- Plain English: Query builder vs raw SQL
- Analogy: Prisma is like a translator - mostly safe, but you can force it to say dangerous things
- Two attack surfaces: raw queries AND operator injection
- Word count: 150-200

### Section 3: Pattern 1 - The $queryRaw Confusion
- `$queryRaw` with tagged templates = SAFE (prepared statements)
- `$queryRawUnsafe` = DANGEROUS (no escaping)
- The naming is confusing by design - warning developers
- `Prisma.raw()` inside `$queryRaw` = DANGEROUS
- When you actually need raw queries (dynamic table names, complex SQL)
- Word count: 200-250

### Section 4: Pattern 2 - Operator Injection
- What it is: Passing objects instead of primitives to queries
- The auth bypass attack: `{ "not": "" }`
- Affected methods: findFirst, findMany, updateMany, deleteMany
- Safe methods: findUnique (rejects objects)
- Fix: Always type-cast to primitives
- Word count: 200-250

### Section 5: Pattern 3 - ORM Leak via Relational Filtering
- Passing req.body/req.query directly to Prisma queries
- How attackers use startsWith to extract data
- Time-based attacks through query manipulation
- Fix: Whitelist allowed filter fields explicitly
- Word count: 150-200

### Section 6: Pattern 4 - Database URL Exposure
- CONNECTION_STRING in source code
- .env file committed to git
- NEXT_PUBLIC_ prefix danger (doesn't apply to DB but common mistake)
- Proper environment variable handling
- Word count: 150-200

### Section 7: Pattern 5 - Missing Authorization in Server Actions
- Prisma handles query building, not access control
- Common AI pattern: query without ownership check
- Defense in depth: check ownership even with Prisma
- Word count: 150-200

### Section 8: The 5-Minute Prisma Security Audit
- Search for `$queryRawUnsafe` and `$executeRawUnsafe`
- Search for `Prisma.raw(`
- Check all `req.body` passed to queries
- Verify DATABASE_URL not in committed files
- Authorization checks in Server Actions
- Scanner CTA
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
| SQL injection | /kb/security/vulnerabilities/sql-injection/ | Raw query section |
| hardcoded secrets | /kb/security/vulnerabilities/hardcoded-secrets/ | DATABASE_URL section |
| missing authentication | /kb/security/vulnerabilities/missing-auth/ | Authorization section |
| IDOR | /kb/security/vulnerabilities/idor/ | Authorization/ownership section |
| Cursor security patterns | /kb/vibe-coding-tools/cursor/ | AI tool context |
| Bolt security patterns | /kb/vibe-coding-tools/bolt/ | AI tool context |
| Claude Code security patterns | /kb/vibe-coding-tools/claude-code/ | AI tool context |
| Next.js + Supabase security | /kb/security/stacks/nextjs-supabase/ | Related stacks |

---

## External Links (8-12 required)

| Anchor Text | URL | Tier | Placement |
|-------------|-----|------|-----------|
| Prisma Raw Queries Documentation | https://www.prisma.io/docs/orm/prisma-client/using-raw-sql/raw-queries | 6 | Pattern 1 |
| OWASP SQL Injection Prevention | https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html | 1 | Intro or Pattern 1 |
| OWASP Query Parameterization Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Query_Parameterization_Cheat_Sheet.html | 1 | Pattern 1 |
| CWE-89: SQL Injection | https://cwe.mitre.org/data/definitions/89.html | 1 | Pattern 1 |
| Prisma Operator Injection Research | https://www.aikido.dev/blog/prisma-and-postgresql-vulnerable-to-nosql-injection | 2 | Pattern 2 |
| Prisma ORM Leak Research | https://www.elttam.com/blog/plorming-your-primsa-orm/ | 2 | Pattern 3 |
| Node.js Security - Prisma Raw Query | https://www.nodejs-security.com/blog/prisma-raw-query-sql-injection | 2 | Pattern 1 |
| Prisma Next.js Guide | https://www.prisma.io/docs/guides/nextjs | 6 | Intro |
| PortSwigger SQL Injection | https://portswigger.net/web-security/sql-injection | 2 | FAQ or Pattern 1 |
| OWASP Injection (Top 10) | https://owasp.org/Top10/A03_2021-Injection/ | 1 | Intro |

**Tier Reference:**
1. OWASP, CWE, NIST, MDN
2. PortSwigger, Snyk Learn, HackerOne
3. Verizon DBIR, IBM Reports
4. Opengrep, Semgrep, Trivy, Gitleaks
5. IEEE, USENIX, ACM, arXiv
6. Framework docs (Next.js, Prisma, etc.)
7. Tool official sites

---

## Code Examples Needed

### Pattern 1a: Safe $queryRaw with Tagged Template
```typescript
// SAFE: Tagged template literal creates prepared statement
const email = req.body.email

const users = await prisma.$queryRaw`
  SELECT * FROM "User" WHERE email = ${email}
`
// Prisma automatically escapes ${email} - this is NOT string interpolation!
```
Explanation: Despite looking like string interpolation, tagged template literals in `$queryRaw` create prepared statements. Prisma handles escaping automatically.

### Pattern 1b: Dangerous $queryRawUnsafe
```typescript
// VULNERABLE: String concatenation with untrusted input
const email = req.body.email

// This is SQL injection waiting to happen
const users = await prisma.$queryRawUnsafe(
  `SELECT * FROM "User" WHERE email = '${email}'`
)

// SECURE: Use parameterized version if you must use $queryRawUnsafe
const users = await prisma.$queryRawUnsafe(
  'SELECT * FROM "User" WHERE email = $1',
  email
)
```
Explanation: The "Unsafe" suffix is a warning. If you must use it, use parameterized placeholders ($1, $2 for PostgreSQL).

### Pattern 1c: Prisma.raw() Defeats Protection
```typescript
// VULNERABLE: Prisma.raw() bypasses all escaping
const email = req.body.email

const users = await prisma.$queryRaw`
  SELECT * FROM "User" WHERE email = ${Prisma.raw(email)}
`
// Prisma.raw() tells Prisma to NOT escape - attacker controls raw SQL

// SECURE: Never use Prisma.raw() with user input
// Only use for trusted, static SQL fragments like table names
const tableName = 'User' // Hardcoded, not from user
const users = await prisma.$queryRaw`
  SELECT * FROM ${Prisma.raw(`"${tableName}"`)} WHERE email = ${email}
`
```
Explanation: `Prisma.raw()` is for dynamic identifiers you control (table/column names), NEVER for user input.

### Pattern 2: Operator Injection Auth Bypass
```typescript
// VULNERABLE: Passing req.body directly allows operator injection
const { email, password } = req.body

// Attacker sends: { email: "victim@example.com", password: { "not": "" } }
const user = await prisma.user.findFirst({
  where: { email, password } // password becomes { not: "" } - always matches!
})

if (user) {
  // Attacker bypasses password check!
}

// SECURE: Type-cast inputs to primitives
const user = await prisma.user.findFirst({
  where: {
    email: String(email),
    password: String(password) // Forces string, rejects objects
  }
})

// BETTER: Use Zod for input validation
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

const validated = loginSchema.parse(req.body)
const user = await prisma.user.findFirst({
  where: { email: validated.email, password: validated.password }
})
```
Explanation: Prisma query operators like `not`, `contains`, `startsWith` can be injected through object inputs. Always cast to primitives or use validation libraries.

### Pattern 3: ORM Leak via Filter Passthrough
```typescript
// VULNERABLE: Passing query params directly to Prisma
// Attacker: GET /api/posts?filter[author][resetToken][startsWith]=abc
const { filter } = req.query

const posts = await prisma.post.findMany({
  where: filter // Attacker controls entire filter!
})
// Can leak resetToken values through response timing/content

// SECURE: Whitelist allowed filter fields
const { title, published } = req.query

const posts = await prisma.post.findMany({
  where: {
    ...(title && { title: { contains: String(title) } }),
    ...(published && { published: published === 'true' })
  }
})
```
Explanation: Never pass `req.body.filter` or `req.query` directly. Attackers can access related model fields through Prisma's relational filtering.

### Pattern 4: Database URL Exposed
```typescript
// VULNERABLE: DATABASE_URL in source code
// lib/prisma.ts
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://user:password123@db.example.com:5432/mydb'
    }
  }
})

// VULNERABLE: Committed to git in .env
// .env (checked into repo)
DATABASE_URL="postgresql://user:password123@db.example.com:5432/mydb"

// SECURE: Use environment variables, never commit .env
// .env.local (gitignored)
DATABASE_URL="postgresql://user:password123@db.example.com:5432/mydb"

// .gitignore
.env.local
.env*.local

// lib/prisma.ts - uses environment variable automatically
const prisma = new PrismaClient()
// Prisma reads DATABASE_URL from environment by default
```
Explanation: DATABASE_URL contains credentials. Never commit to source control. Use `.env.local` (gitignored) for development.

### Pattern 5: Missing Authorization Check
```typescript
// VULNERABLE: AI-generated pattern - no ownership check
'use server'

export async function updatePost(postId: string, content: string) {
  // Anyone can update any post!
  await prisma.post.update({
    where: { id: postId },
    data: { content }
  })
}

// SECURE: Always verify ownership
'use server'

import { auth } from '@/lib/auth'

export async function updatePost(postId: string, content: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error('Not authenticated')

  // Verify user owns this post
  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { authorId: true }
  })

  if (post?.authorId !== session.user.id) {
    throw new Error('Not authorized')
  }

  await prisma.post.update({
    where: { id: postId },
    data: { content }
  })
}
```
Explanation: Prisma handles query building, not authorization. Always check that the current user owns the resource they're modifying.

---

## AI Fix Prompt Requirements (for vulnerabilities)

The Writer Agent should create an AI fix prompt that includes:
- [ ] Search for `$queryRawUnsafe` and `$executeRawUnsafe` in all `.ts` and `.js` files
- [ ] Search for `Prisma.raw(` with user input
- [ ] Find patterns where `req.body` or `req.query` is passed directly to Prisma queries
- [ ] Check for `findFirst`, `findMany` without type-casting inputs
- [ ] Verify DATABASE_URL is not in any committed file
- [ ] Check Server Actions for authentication/authorization before mutations
- [ ] Framework-specific: Next.js Server Actions, API routes
- [ ] Verification: Run `grep -r "queryRawUnsafe" .` and `grep -r "Prisma.raw" .`

---

## Notes for Writer Agent

### Tone Guidance
- This stack is deceptively safe-looking - the danger is in the edges
- Emphasize that Prisma IS secure by default, but specific patterns break that safety
- The naming confusion ($queryRaw vs $queryRawUnsafe) is intentional but confusing
- Operator injection is a lesser-known attack vector - treat it as a "hidden danger"

### Technical Accuracy
- `$queryRaw` with tagged templates IS safe - don't spread fear about it
- The danger is `$queryRawUnsafe`, `Prisma.raw()`, and operator injection
- `findUnique` is safer than `findFirst` because it rejects object inputs
- Hot reloading creating multiple Prisma instances is a dev-mode issue, not production

### Things to Avoid
- Don't suggest avoiding all raw queries - sometimes they're necessary
- Don't conflate type safety with security - TypeScript types aren't runtime checks
- Don't imply Prisma is insecure - it's secure when used correctly
- Don't forget operator injection - it's the lesser-known but real risk

### Vibe Coding Terms
Use these 3-5 times naturally:
- vibe coding
- vibe coders
- vibe coded
- AI-generated code

---

## Checklist Before Marking READY

- [x] All external links verified working
- [x] CWE/OWASP references correct (CWE-89, CWE-564, A03:2021)
- [x] 8 internal links identified
- [x] 5 PAA questions included
- [x] Competitive gap is specific (operator injection rarely covered)
- [x] Code examples drafted (5 patterns with 7 code blocks)
- [x] No placeholder text (TBD, TODO)

---

**Brief Status:** READY for Writer Agent
