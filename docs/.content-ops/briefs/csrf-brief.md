# Content Brief: CSRF (Cross-Site Request Forgery)

## Status

```yaml
status: DONE
created_at: 2025-12-17T16:45:00Z
created_by: Research Agent (Terminal 1)
claimed_by: Writer Agent
claimed_at: 2025-12-17T17:00:00Z
completed_at: 2025-12-17T18:00:00Z
```

---

## Article Metadata

```yaml
type: vulnerability
slug: csrf
url: /kb/security/vulnerabilities/csrf/
title: "CSRF: Why AI Tools Skip This Critical Protection"
meta_description: "CSRF lets attackers trick users into performing unwanted actions. Learn why Next.js Server Actions have built-in protection but custom API routes don't."
cwe: CWE-352
owasp: A01:2021-Broken Access Control
owasp_url: https://owasp.org/Top10/A01_2021-Broken_Access_Control/
cwe_url: https://cwe.mitre.org/data/definitions/352.html
severity: High
word_count: 1200-1500
```

---

## Core Data

### Primary References
| Reference | ID | Link |
|-----------|-----|------|
| CWE-352 | Cross-Site Request Forgery (CSRF) | https://cwe.mitre.org/data/definitions/352.html |
| OWASP CSRF | Cross-Site Request Forgery | https://owasp.org/www-community/attacks/csrf |
| OWASP A01:2021 | Broken Access Control | https://owasp.org/Top10/A01_2021-Broken_Access_Control/ |

### Framework-Specific CSRF Behavior

**Next.js Server Actions (App Router):**
- ✅ **Built-in CSRF protection** via:
  - POST-only requests (GET cannot mutate)
  - Origin header validation
  - Same-Site cookies by default
  - Encrypted action IDs (non-enumerable endpoints)
- ❌ **No explicit CSRF tokens** - relies on above mechanisms
- **Source:** [Next.js Security - Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#security)

**Next.js Route Handlers (App Router):**
- ❌ **No built-in CSRF protection**
- Must manually validate Origin/Referer headers
- Must implement CSRF tokens for sensitive operations
- **Source:** Next.js documentation

**Express.js:**
- ❌ **No built-in CSRF protection**
- Requires middleware like `csurf` (deprecated) or `csrf-csrf`
- **Source:** [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)

### Key Facts to Include
- CSRF is ranked under A01:2021 Broken Access Control (OWASP)
- Next.js Server Actions provide "closed by default" CSRF protection (Next.js docs)
- Custom Route Handlers and API routes require manual CSRF protection
- AI tools often generate Route Handlers without CSRF protection
- SameSite=Lax cookies (browser default since 2020) provide partial CSRF protection
- Modern browsers block cross-origin POST with credentials by default (helps but not complete)

---

## SEO Strategy

### Target Keywords
| Keyword | Search Intent | Priority |
|---------|---------------|----------|
| csrf protection next.js | transactional | Primary |
| cross-site request forgery | informational | Primary |
| csrf vulnerability | informational | Primary |
| next.js server actions csrf | informational | Secondary |
| csrf token implementation | transactional | Secondary |
| prevent csrf attacks | transactional | Tertiary |

### People Also Ask (FAQs)
1. What is CSRF and how does it work?
2. Do Next.js Server Actions need CSRF protection?
3. How do I add CSRF protection to my API routes?
4. Does React protect against CSRF?
5. Is SameSite cookie enough for CSRF protection?

### Competitive Gap
**Top results analysis:**
- OWASP: Comprehensive but dense, not framework-specific
- Generic tutorials: Outdated (pre-Server Actions era)
- Next.js docs: Minimal, assumes knowledge

**Our unique angle:**
- Next.js Server Actions vs Route Handlers distinction
- Why AI tools generate unprotected routes
- Modern browser protections explained simply
- Copy-paste solutions for each Next.js pattern
- When you need tokens vs when you don't

---

## Content Outline

### Quick Answer (50 words max)
CSRF tricks users into performing unwanted actions on sites where they're logged in. Next.js Server Actions have built-in protection, but custom API routes don't. AI tools typically generate vulnerable Route Handlers because CSRF protection isn't needed for code to "work."

### Section 1: What is CSRF?
- Plain English: Attacker tricks your browser into making requests you didn't intend
- Real-world analogy: Someone forges your signature on a check while you're logged into your bank
- Classic attack: Malicious site with hidden form that POSTs to your bank
- Why it's dangerous: Uses YOUR cookies, YOUR session, YOUR permissions
- Word count: 100-150

### Section 2: How CSRF Attacks Work
- Step-by-step attack scenario:
  1. User logs into legitimate-site.com
  2. User visits malicious-site.com
  3. Malicious site has hidden form pointing to legitimate-site.com/transfer
  4. Form auto-submits using user's cookies
  5. Transfer happens without user's knowledge
- Diagram description: Browser with two tabs, cookies flowing
- Word count: 150-200

### Section 3: Modern Browser Protections
- **SameSite cookies** (default since 2020):
  - Lax: Blocks cross-site POST with cookies
  - Strict: Blocks all cross-site requests with cookies
  - None: No protection (requires Secure flag)
- **CORS** (Cross-Origin Resource Sharing):
  - Doesn't protect forms (forms bypass CORS)
  - Only protects fetch/XHR with credentials
- **Partial protection:** Modern defaults help but aren't complete
- Word count: 150-200

### Section 4: Next.js Server Actions CSRF Protection
- **What Server Actions do automatically:**
  - POST-only (can't be triggered via GET/link)
  - Origin header validation
  - Encrypted action IDs (not enumerable)
  - Same-Site cookies
- **When Server Actions are safe:**
  - Standard form submissions
  - Client-side invocations via useTransition
- **When you need more:**
  - High-value operations (still good practice to add tokens)
  - Custom authentication flows
- Word count: 150-200

### Section 5: Why AI Tools Generate Vulnerable Routes
- AI creates Route Handlers for flexibility
- Route Handlers don't have Server Action protections
- "Create an API endpoint" → Route Handler, not Server Action
- No CSRF middleware added by default
- Code "works" without CSRF protection (problem only surfaces in attacks)
- Word count: 100-150

### Section 6: Adding CSRF Protection to Route Handlers
- **Option 1: Origin/Referer validation**
- **Option 2: CSRF tokens with csrf-csrf library**
- **Option 3: Convert to Server Actions (often best)**
- Complete code examples for each approach
- Word count: 200-300

### Section 7: Code Examples

**Pattern 1: Vulnerable Route Handler**
```typescript
// VULNERABLE: AI generates this - no CSRF protection
// app/api/transfer/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

export async function POST(request: Request) {
  const session = await getServerSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { amount, toAccount } = await request.json()

  // Attacker can trigger this from malicious site!
  await transferMoney(session.user.id, toAccount, amount)

  return NextResponse.json({ success: true })
}
```

**Pattern 2: Secure - Origin Validation**
```typescript
// SECURE: Validate Origin header
// app/api/transfer/route.ts
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

const ALLOWED_ORIGINS = [
  process.env.NEXT_PUBLIC_APP_URL,
  'https://yourdomain.com'
]

export async function POST(request: Request) {
  const headersList = headers()
  const origin = headersList.get('origin')

  // Reject requests from unknown origins
  if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const session = await getServerSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { amount, toAccount } = await request.json()
  await transferMoney(session.user.id, toAccount, amount)

  return NextResponse.json({ success: true })
}
```

**Pattern 3: Secure - Server Action (Preferred)**
```typescript
// SECURE: Use Server Action instead of Route Handler
// app/actions/transfer.ts
'use server'

import { auth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function transferMoney(formData: FormData) {
  const session = await auth()
  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  const amount = formData.get('amount') as string
  const toAccount = formData.get('toAccount') as string

  // Server Action has built-in CSRF protection
  await executeTransfer(session.user.id, toAccount, parseFloat(amount))

  revalidatePath('/account')
  return { success: true }
}

// Client component usage:
// <form action={transferMoney}>
//   <input name="amount" />
//   <input name="toAccount" />
//   <button type="submit">Transfer</button>
// </form>
```

**Pattern 4: CSRF Token for Route Handlers**
```typescript
// SECURE: Using csrf-csrf library
// middleware.ts
import { doubleCsrf } from 'csrf-csrf'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const { generateToken, validateRequest } = doubleCsrf({
  getSecret: () => process.env.CSRF_SECRET!,
  cookieName: '__Host-csrf',
  cookieOptions: {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    secure: true,
  },
})

export async function middleware(request: NextRequest) {
  // Skip CSRF for Server Actions (they have built-in protection)
  if (request.headers.get('next-action')) {
    return NextResponse.next()
  }

  // Validate CSRF for mutating requests to API routes
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
    if (request.nextUrl.pathname.startsWith('/api/')) {
      const isValid = await validateRequest(request)
      if (!isValid) {
        return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 })
      }
    }
  }

  return NextResponse.next()
}

// API route to get CSRF token
// app/api/csrf/route.ts
export async function GET() {
  const token = generateToken()
  return NextResponse.json({ token })
}
```

### Section 8: AI Fix Prompt
```
Review my Next.js code for CSRF vulnerabilities:

1. **Identify Route Handlers with mutations**: Find all app/api/**/route.ts files with POST, PUT, DELETE, or PATCH handlers that modify data.

2. **Check for CSRF protection**: For each mutating Route Handler, verify:
   - Origin header validation, OR
   - CSRF token validation, OR
   - Consider converting to Server Action

3. **Server Actions are safe**: Files with 'use server' have built-in CSRF protection - no changes needed.

4. **Check cookie settings**: Verify authentication cookies use:
   - SameSite: 'Strict' or 'Lax' (not 'None')
   - Secure: true (for HTTPS)
   - HttpOnly: true

For each vulnerable Route Handler:
- Show current code
- Recommend: Origin validation, CSRF token, or conversion to Server Action
- Show secure implementation
```

### FAQ Section
Answer each PAA question in 50-100 words with citable facts.

### Related Content
- Links to other vulnerability articles
- Links to AI tool patterns (especially where CSRF is generated)
- Link to missing-auth (related pattern)

---

## Internal Links (7-10 required)

| Anchor Text | URL | Context/Placement |
|-------------|-----|-------------------|
| missing authentication | /kb/security/vulnerabilities/missing-auth/ | Related protection pattern |
| XSS | /kb/security/vulnerabilities/xss/ | Often paired vulnerability |
| hardcoded secrets | /kb/security/vulnerabilities/hardcoded-secrets/ | Cookie secret management |
| Cursor security patterns | /kb/vibe-coding-tools/cursor/ | AI tool context |
| Claude Code security patterns | /kb/vibe-coding-tools/claude-code/ | AI tool context |
| Bolt security patterns | /kb/vibe-coding-tools/bolt/ | AI tool context |
| Next.js + Supabase security | /kb/security/stacks/nextjs-supabase/ | Stack-specific CSRF |
| IDOR | /kb/security/vulnerabilities/idor/ | Related authorization issue |

---

## External Links (8-12 required)

| Anchor Text | URL | Tier | Placement |
|-------------|-----|------|-----------|
| CWE-352: Cross-Site Request Forgery | https://cwe.mitre.org/data/definitions/352.html | 1 | Intro |
| OWASP CSRF Prevention Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html | 1 | Fix section |
| OWASP CSRF Attack | https://owasp.org/www-community/attacks/csrf | 1 | What is CSRF section |
| OWASP A01:2021 Broken Access Control | https://owasp.org/Top10/A01_2021-Broken_Access_Control/ | 1 | Intro |
| Next.js Server Actions Security | https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#security | 6 | Server Actions section |
| MDN SameSite Cookies | https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#samesitesamesite-value | 1 | Browser protections section |
| csrf-csrf npm | https://www.npmjs.com/package/csrf-csrf | 6 | Implementation section |
| Express Security Best Practices | https://expressjs.com/en/advanced/best-practice-security.html | 6 | Express context |

---

## Notes for Writer Agent

### Tone Guidance
- **Modern context:** CSRF is "mostly solved" by modern browsers and frameworks, but gaps remain
- **Next.js specific:** Most vibe coders use Next.js - focus there
- **Server Actions vs Route Handlers:** This distinction is critical and confusing
- **Don't over-complicate:** SameSite cookies handle most cases; explain when you need more

### Technical Accuracy
- Server Actions DO have built-in CSRF protection (POST-only, Origin validation)
- Route Handlers DO NOT have automatic CSRF protection
- SameSite=Lax (browser default) blocks cross-site POST with cookies
- CORS does NOT protect HTML forms (only fetch/XHR)
- csurf is deprecated; recommend csrf-csrf or Origin validation

### Things to Avoid
- Don't suggest csurf (deprecated, has vulnerabilities)
- Don't imply CORS protects against CSRF (it doesn't for forms)
- Don't say Server Actions need CSRF tokens (they have built-in protection)
- Don't over-engineer - Origin validation is often sufficient

### Vibe Coding Terms
Use these 3-5 times naturally:
- vibe coding
- vibe coders
- vibe coded
- AI-generated code

---

## Checklist Before Marking READY

- [x] All external links verified working
- [x] CWE/OWASP references correct (CWE-352, A01:2021)
- [x] 8 internal links identified
- [x] 5 PAA questions included
- [x] Competitive gap is specific
- [x] Code examples drafted (4 patterns)
- [x] No placeholder text
- [x] Framework-specific (Next.js focus with Server Actions vs Route Handlers)

---

**Brief Status:** READY for Writer Agent
