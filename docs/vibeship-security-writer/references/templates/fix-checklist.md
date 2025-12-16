# Fix Prompt Template

Use for pages at `/kb/security/fixes/{vulnerability}/{framework}/`

## JSON Content Structure

```json
{
  "title": "Fix {Vulnerability} in {Framework}",
  "slug": "{vulnerability}/{framework}",
  "description": "Copy-paste AI prompt to fix {vulnerability} in {framework}. Works with Cursor, Claude Code, and Bolt.",
  
  "vulnerability": "{vulnerability-slug}",
  "framework": "{framework-slug}",
  
  "quickAnswer": "{30-50 words. What this prompt does and why it works.}",
  
  "fixPrompt": "{Complete AI fix prompt - see structure below}",
  
  "manualFix": {
    "before": "{Vulnerable code example}",
    "after": "{Fixed code example}",
    "explanation": "{What changed and why}"
  },
  
  "verification": "{How to verify the fix worked}",
  
  "relatedFixes": ["same-vuln-other-framework", "same-framework-other-vuln"],
  
  "publishedAt": "2024-12-01T00:00:00Z",
  "updatedAt": "2024-12-15T00:00:00Z"
}
```

## AI Fix Prompt Structure

Every fix prompt must include these sections:

```
Fix all {vulnerability} vulnerabilities in my {framework} codebase.

## What to look for

{Specific patterns to search for - be concrete}

1. Pattern 1: {description}
   - Example: `{code pattern}`
   
2. Pattern 2: {description}
   - Example: `{code pattern}`

## How to fix

{Framework-specific fix approach}

### For {pattern 1}:
```{language}
// Before (vulnerable)
{vulnerable code}

// After (secure)
{fixed code}
```

### For {pattern 2}:
{Same structure}

## {Framework}-specific considerations

- {Framework-specific note 1}
- {Framework-specific note 2}
- {Recommended package or approach}

## After fixing

1. Search the entire codebase for remaining patterns: `{regex or search term}`
2. {Additional verification step}
3. List all files you modified with before/after code snippets

Please proceed systematically, starting with {priority files/directories}.
```

## Example: SQL Injection in Next.js

### Fix Prompt

```
Fix all SQL injection vulnerabilities in my Next.js codebase.

## What to look for

1. Template literals in database queries:
   - `db.query(\`SELECT * FROM users WHERE id = ${userId}\`)`
   - `prisma.$queryRaw\`SELECT * FROM ${table}\``
   - Any `${}` inside SQL strings

2. String concatenation in queries:
   - `'SELECT * FROM users WHERE id = ' + userId`
   - `"SELECT * FROM users WHERE name = '" + name + "'"`

3. Dynamic table/column names from user input:
   - `db.query(\`SELECT * FROM ${req.query.table}\`)`

## How to fix

### For PostgreSQL (pg library):
```javascript
// Before (vulnerable)
const result = await db.query(`SELECT * FROM users WHERE id = ${userId}`)

// After (secure)
const result = await db.query('SELECT * FROM users WHERE id = $1', [userId])
```

### For Prisma:
```javascript
// Before (vulnerable)
const users = await prisma.$queryRaw`SELECT * FROM users WHERE id = ${userId}`

// After (secure - use Prisma client)
const users = await prisma.user.findUnique({ where: { id: userId } })

// Or if raw SQL is necessary:
const users = await prisma.$queryRaw`SELECT * FROM users WHERE id = ${Prisma.sql`${userId}`}`
```

### For Supabase:
```javascript
// Before (potentially vulnerable in RPC)
const { data } = await supabase.rpc('get_user', { user_id: userId })

// After (safe - use client methods)
const { data } = await supabase
  .from('users')
  .select('*')
  .eq('id', userId)
  .single()
```

## Next.js-specific considerations

- Check all files in `/app/api/` and `/pages/api/`
- Server components (`page.tsx`, `layout.tsx`) may have database access
- Server actions in `'use server'` files
- Look for direct `pg`, `mysql2`, or database driver usage
- Prisma is safe by default EXCEPT for `$queryRaw` and `$executeRaw`

## After fixing

1. Search for remaining patterns: `\$\{.*\}.*(?:SELECT|INSERT|UPDATE|DELETE|FROM|WHERE)`
2. Add input validation with Zod for all user inputs
3. List all files you modified with before/after snippets

Please start with `/app/api/` routes, then check server components.
```

### Manual Fix

**Before (Vulnerable):**
```typescript
// app/api/users/[id]/route.ts
import { db } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const result = await db.query(
    `SELECT * FROM users WHERE id = ${params.id}`
  )
  return Response.json(result.rows[0])
}
```

**After (Secure):**
```typescript
// app/api/users/[id]/route.ts
import { db } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Validate input
  const id = parseInt(params.id, 10)
  if (isNaN(id)) {
    return Response.json({ error: 'Invalid ID' }, { status: 400 })
  }
  
  // Use parameterized query
  const result = await db.query(
    'SELECT id, name, email FROM users WHERE id = $1',
    [id]
  )
  
  if (result.rows.length === 0) {
    return Response.json({ error: 'Not found' }, { status: 404 })
  }
  
  return Response.json(result.rows[0])
}
```

**What changed:**
1. Input validation - parse and validate the ID before use
2. Parameterized query - `$1` placeholder instead of template literal
3. Explicit column selection - don't use `SELECT *`
4. Proper error handling - 400 for bad input, 404 for not found

---

# Checklist Template

Use for pages at `/kb/security/checklists/{checklist}/`

## JSON Content Structure

```json
{
  "title": "{Checklist Name}",
  "slug": "{checklist-slug}",
  "description": "{N}-point security checklist for {context}. Interactive, downloadable, AI-scannable.",
  
  "quickAnswer": "{30-50 words. Who this is for and what it covers.}",
  
  "categories": [
    {
      "name": "Authentication",
      "priority": "critical",
      "items": [
        {
          "id": "auth-1",
          "label": "All API routes require authentication",
          "description": "Every endpoint should verify the user session before processing requests",
          "howToCheck": "Search for API route files without session/auth checks",
          "howToFix": "Add authentication middleware to all routes",
          "learnMore": "/kb/security/vulnerabilities/missing-auth/"
        }
      ]
    }
  ],
  
  "aiScanPrompt": "{Prompt to have AI check these items}",
  
  "downloadFormats": ["pdf", "markdown"],
  
  "relatedChecklists": ["related-checklist-1"],
  "relatedGuides": ["/kb/security/stacks/nextjs-supabase/"],
  
  "publishedAt": "2024-12-01T00:00:00Z",
  "updatedAt": "2024-12-15T00:00:00Z"
}
```

## Checklist Item Structure

Each item should have:

- **id**: Unique identifier for progress tracking
- **label**: Short, action-oriented statement (what to check)
- **description**: Why this matters (1-2 sentences)
- **howToCheck**: Concrete steps to verify
- **howToFix**: Brief fix guidance or link
- **priority**: critical | high | medium | low
- **learnMore**: Link to detailed KB article

## Example: Pre-Launch Security Checklist

### Categories and Items

#### Authentication (Critical)

1. **All API routes require authentication**
   - Why: Unauthenticated endpoints expose data to anyone
   - Check: Search `/api/` for routes without auth middleware
   - Fix: Add session checks to every route
   - Learn: /kb/security/vulnerabilities/missing-auth/

2. **Passwords are hashed with bcrypt (cost 12+)**
   - Why: Plain or weakly hashed passwords are trivially cracked
   - Check: Search for password storage code
   - Fix: Use bcrypt with minimum cost factor 12
   - Learn: /kb/glossary/security/password-hashing/

3. **Session tokens are HTTP-only cookies**
   - Why: JavaScript-accessible tokens can be stolen via XSS
   - Check: Inspect Set-Cookie headers
   - Fix: Add httpOnly: true to cookie config
   - Learn: /kb/security/vulnerabilities/xss/

4. **Rate limiting on login endpoint**
   - Why: Without limits, attackers can brute-force passwords
   - Check: Attempt multiple failed logins rapidly
   - Fix: Add rate limiting (e.g., 5 attempts per 15 min)
   - Learn: /kb/security/vulnerabilities/missing-rate-limiting/

#### Authorization (Critical)

5. **Users can only access their own data**
   - Why: IDOR lets users access others' data by changing IDs
   - Check: Try accessing another user's resource
   - Fix: Add user ownership check to all queries
   - Learn: /kb/security/vulnerabilities/idor/

6. **Row Level Security enabled (if using Supabase)**
   - Why: Without RLS, anyone with anon key can read all data
   - Check: Run `SELECT * FROM pg_policies`
   - Fix: Enable RLS and create policies
   - Learn: /kb/security/stacks/nextjs-supabase/

#### Data Protection (High)

7. **No hardcoded secrets in code**
   - Why: Secrets in git are exposed forever
   - Check: Search for API keys, passwords in code
   - Fix: Move to environment variables
   - Learn: /kb/security/vulnerabilities/hardcoded-secrets/

8. **Environment variables configured in production**
   - Why: Missing env vars cause app failures or insecure defaults
   - Check: Verify all required vars in Vercel/hosting dashboard
   - Fix: Set all variables before deploying

9. **Sensitive data not in error messages**
   - Why: Detailed errors help attackers
   - Check: Trigger errors and inspect responses
   - Fix: Return generic errors to clients
   - Learn: /kb/security/vulnerabilities/sensitive-data-exposure/

#### Input/Output (High)

10. **All user input validated server-side**
    - Why: Client validation can be bypassed
    - Check: Submit malformed data directly to API
    - Fix: Use Zod or similar for server validation

11. **Output properly escaped/sanitized**
    - Why: Unescaped output enables XSS
    - Check: Input `<script>alert(1)</script>` and see if it executes
    - Fix: Use framework's built-in escaping, sanitize HTML
    - Learn: /kb/security/vulnerabilities/xss/

#### Infrastructure (Medium)

12. **HTTPS enforced in production**
    - Why: HTTP exposes all data to network attackers
    - Check: Visit http:// version of site
    - Fix: Configure redirect to HTTPS

13. **Security headers configured**
    - Why: Headers prevent many attack classes
    - Check: Use securityheaders.com
    - Fix: Add Content-Security-Policy, X-Frame-Options, etc.

14. **Dependencies up to date**
    - Why: Known vulnerabilities in old packages
    - Check: Run `npm audit`
    - Fix: Update packages, review changelogs

15. **Error monitoring configured**
    - Why: You need to know when attacks happen
    - Check: Verify Sentry/similar is working
    - Fix: Set up error tracking and alerting

### AI Scan Prompt

```
Review my codebase against this pre-launch security checklist. For each item, 
tell me if it PASSES, FAILS, or NEEDS REVIEW:

1. All API routes require authentication
2. Passwords are hashed with bcrypt (cost 12+)
3. Session tokens are HTTP-only cookies
4. Rate limiting on login endpoint
5. Users can only access their own data (IDOR protection)
6. Row Level Security enabled (if Supabase)
7. No hardcoded secrets in code
8. Environment variables not committed to git
9. Sensitive data not in error messages
10. All user input validated server-side
11. Output properly escaped/sanitized
12. HTTPS enforced
13. Security headers configured
14. Dependencies have no known vulnerabilities
15. Error monitoring configured

For each FAIL, show me the specific file and code that needs fixing.
```
