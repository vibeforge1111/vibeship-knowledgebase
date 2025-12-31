# Content Brief: Missing Rate Limiting

## Status

```yaml
status: DONE
created_at: 2025-12-17T14:00:00Z
created_by: Research Agent (Terminal 1)
claimed_by: Writer Agent Terminal 3
claimed_at: 2025-12-17T14:30:00Z
completed_at: 2025-12-17T15:00:00Z
```

---

## Article Metadata

```yaml
type: vulnerability
slug: missing-rate-limiting
url: /kb/security/vulnerabilities/missing-rate-limiting/
title: "Missing Rate Limiting: Why AI Forgets This Critical Security"
meta_description: "AI tools never add rate limiting. Learn why this leaves your login and API endpoints open to brute force attacks. Copy-paste fixes for Next.js and Express."
cwe: CWE-799
owasp: A04:2021-Insecure Design
severity: Medium
```

---

## Core Data

### Primary References
| Reference | ID | Link |
|-----------|-----|------|
| CWE-799 | Improper Control of Interaction Frequency | https://cwe.mitre.org/data/definitions/799.html |
| CWE-307 | Improper Restriction of Excessive Authentication Attempts | https://cwe.mitre.org/data/definitions/307.html |
| OWASP Insecure Design | A04:2021 | https://owasp.org/Top10/A04_2021-Insecure_Design/ |
| OWASP API4:2023 | Unrestricted Resource Consumption | https://owasp.org/API-Security/editions/2023/en/0xa4-unrestricted-resource-consumption/ |
| OWASP API2:2023 | Broken Authentication | https://owasp.org/API-Security/editions/2023/en/0xa2-broken-authentication/ |

### External Sources (for outbound links)
| Source | URL | Key Finding | Tier |
|--------|-----|-------------|------|
| OWASP Blocking Brute Force | https://owasp.org/www-community/controls/Blocking_Brute_Force_Attacks | Account lockout, CAPTCHA, timeouts, and other countermeasures | 1 |
| OWASP API Security 2023 | https://owasp.org/API-Security/editions/2023/en/0xa4-unrestricted-resource-consumption/ | API4:2023 - missing rate limiting enables DoS and brute force | 1 |
| Snyk Learn - No Rate Limiting | https://learn.snyk.io/lesson/no-rate-limiting/ | Brute force can test "hundreds of millions" of passwords per second | 2 |
| HackerOne Rate Limiting Guide | https://www.pullrequest.com/blog/rate-limiting-strategies-protecting-your-api-from-ddos-and-brute-force-attacks/ | Tiered limits, algorithm choices, multi-layered approach | 2 |
| PortSwigger Brute Force | https://portswigger.net/web-security/authentication/password-based | Authentication vulnerability testing and prevention | 2 |
| Red Hat API Rate Limiting | https://www.redhat.com/en/blog/api-security-importance-rate-limiting-policies-safeguarding-your-apis | Rate limiting as extra line of protection even with strong auth | 3 |
| express-rate-limit npm | https://www.npmjs.com/package/express-rate-limit | Most popular Node.js rate limiting middleware | 6 |
| Upstash Rate Limit | https://upstash.com/docs/oss/sdks/ts/ratelimit/overview | Serverless-friendly rate limiting for Vercel/Next.js | 6 |

### Key Facts to Include
- A computer can guess "tens of thousands of passwords per second, all the way up to hundreds of millions" without rate limiting (Snyk Learn)
- OWASP API4:2023 "Unrestricted Resource Consumption" specifically calls out missing rate limiting as enabling DoS and brute force (OWASP)
- CWE-307 (Excessive Authentication Attempts) and CWE-799 (Interaction Frequency) are both related to this vulnerability
- Rate limiting alone isn't enough - combine with CAPTCHA, account lockout, and exponential backoff (OWASP)
- AI tools generate functional login endpoints but NEVER add rate limiting unless explicitly asked
- 94% of Bolt-generated projects lack rate limiting (from ai-tool-patterns.md reference)
- Serverless environments like Vercel need special handling - traditional middleware doesn't persist state

---

## SEO Strategy

### Target Keywords
| Keyword | Search Intent | Priority |
|---------|---------------|----------|
| rate limiting API security | informational | Primary |
| missing rate limiting vulnerability | informational | Primary |
| brute force attack prevention | informational | Secondary |
| express-rate-limit next.js | transactional | Secondary |
| API rate limiting best practices | informational | Secondary |
| login rate limiting | informational | Tertiary |

### People Also Ask (FAQs)
1. What happens without rate limiting?
2. How do I add rate limiting to Next.js?
3. Is rate limiting enough to prevent brute force attacks?
4. What is a good rate limit for login endpoints?
5. Does Vercel have built-in rate limiting?

### Competitive Gap
**Top results analysis:**
- Technical blogs: Focus on implementation, miss "why AI doesn't do this"
- OWASP: Comprehensive but dense, not vibe coder friendly
- npm docs: Code focused, no security context

**Our unique angle:**
- AI tool context: Explain WHY AI never adds rate limiting (it's not required for "working" code)
- Plain English: Explain the attack scenario in simple terms
- Framework-specific: Next.js App Router, Express, serverless considerations
- Copy-paste ready: Complete middleware code that actually works

---

## Content Outline

### Quick Answer (50 words max)
Rate limiting caps how many requests a user can make in a timeframe. Without it, attackers can try millions of passwords per second on your login page. AI tools never add rate limiting because it's not required for code to "work" - it's a security feature you must add yourself.

### Section 1: What is Rate Limiting?
- Plain English definition: Speed limit for API requests
- Analogy: Like a bouncer who only lets 5 people in per minute
- What happens without it: Unlimited login attempts, DoS attacks, resource exhaustion
- Why AI tools skip it: Not required for functionality
- Word count: 100-150

### Section 2: The Brute Force Attack Scenario
- How attackers exploit missing rate limiting
- The numbers: Millions of password attempts per second
- Real-world impact: Account takeover, credential stuffing
- Why authentication alone isn't enough
- Word count: 150-200

### Section 3: Where Rate Limiting Matters Most
- Login endpoints (critical)
- Password reset (critical)
- API endpoints (important)
- Form submissions (important)
- File uploads (important)
- Word count: 100-150

### Section 4: How AI Tools Generate Vulnerable Code
- AI creates functional login - mission accomplished
- No security layer added unless asked
- Bolt pattern: 94% of projects missing rate limiting
- The "it works" trap
- Word count: 150-200

### Section 5: Adding Rate Limiting to Next.js
- express-rate-limit for API routes
- Middleware approach for App Router
- Upstash for serverless (Vercel)
- Important: Define middleware OUTSIDE handler
- Word count: 200-300

### Section 6: Adding Rate Limiting to Express
- Basic express-rate-limit setup
- Different limits for different endpoints
- Tiered approach (free vs premium users)
- Word count: 150-200

### Section 7: Beyond Rate Limiting (Defense in Depth)
- CAPTCHA after failed attempts
- Account lockout (with caveats)
- Exponential backoff
- Multi-factor authentication
- Word count: 150-200

### Section 8: AI Fix Prompt
- Complete prompt for adding rate limiting
- What to check for in existing code
- Scanner CTA
- Word count: 200-300

### FAQ Section
- Use PAA questions above
- Each answer: 50-100 words
- Include citable fact in each

### Related Content
- Links to other vulnerability articles
- Links to AI tool patterns

---

## Internal Links (5-10 required)

| Anchor Text | URL | Context/Placement |
|-------------|-----|-------------------|
| missing authentication | /kb/security/vulnerabilities/missing-auth/ | Section on login endpoints |
| hardcoded secrets | /kb/security/vulnerabilities/hardcoded-secrets/ | API key security context |
| IDOR | /kb/security/vulnerabilities/idor/ | Authorization context |
| Cursor security patterns | /kb/vibe-coding-tools/cursor/ | AI tool patterns section |
| Bolt security patterns | /kb/vibe-coding-tools/bolt/ | AI tool patterns section |
| Claude Code security patterns | /kb/vibe-coding-tools/claude-code/ | AI tool patterns section |
| Next.js + Supabase security | /kb/security/stacks/nextjs-supabase/ | Framework context |

---

## External Links (8-12 required)

| Anchor Text | URL | Tier | Placement |
|-------------|-----|------|-----------|
| CWE-799: Improper Control of Interaction Frequency | https://cwe.mitre.org/data/definitions/799.html | 1 | Intro |
| OWASP Blocking Brute Force Attacks | https://owasp.org/www-community/controls/Blocking_Brute_Force_Attacks | 1 | Defense in depth section |
| OWASP API4:2023 Unrestricted Resource Consumption | https://owasp.org/API-Security/editions/2023/en/0xa4-unrestricted-resource-consumption/ | 1 | Attack scenario |
| Snyk Learn - No Rate Limiting | https://learn.snyk.io/lesson/no-rate-limiting/ | 2 | Brute force numbers |
| PortSwigger Authentication Vulnerabilities | https://portswigger.net/web-security/authentication/password-based | 2 | Attack context |
| express-rate-limit npm | https://www.npmjs.com/package/express-rate-limit | 6 | Implementation section |
| Upstash Rate Limit | https://upstash.com/docs/oss/sdks/ts/ratelimit/overview | 6 | Serverless section |
| OWASP Insecure Design | https://owasp.org/Top10/A04_2021-Insecure_Design/ | 1 | Intro or FAQ |

---

## Code Examples Needed

### Pattern 1: Vulnerable Login (No Rate Limiting)
```typescript
// VULNERABLE: AI generates this - no rate limiting
// app/api/auth/login/route.ts (Next.js App Router)
import { NextResponse } from 'next/server'
import { verifyCredentials } from '@/lib/auth'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  // Attacker can try millions of passwords!
  const user = await verifyCredentials(email, password)

  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  return NextResponse.json({ user })
}
```
Explanation: AI creates functional login endpoints but never adds rate limiting. Attackers can attempt unlimited password guesses.

### Pattern 2: Basic Rate Limiting with express-rate-limit
```typescript
// SECURE: Add rate limiting to Express/Next.js API routes
import rateLimit from 'express-rate-limit'

// IMPORTANT: Define OUTSIDE the handler!
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: { error: 'Too many login attempts, please try again later' },
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false,
})

// For Next.js Pages Router API routes
export default function handler(req, res) {
  return new Promise((resolve) => {
    loginLimiter(req, res, () => {
      // Your login logic here
      resolve()
    })
  })
}
```
Explanation: `express-rate-limit` must be defined outside the handler function. If defined inside, each request creates a new limiter with fresh state.

### Pattern 3: Next.js App Router with Upstash
```typescript
// SECURE: Serverless-friendly rate limiting for Vercel
// middleware.ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '15 m'), // 5 requests per 15 minutes
  analytics: true,
})

export async function middleware(request: NextRequest) {
  // Only rate limit auth endpoints
  if (request.nextUrl.pathname.startsWith('/api/auth')) {
    const ip = request.ip ?? '127.0.0.1'
    const { success, limit, reset, remaining } = await ratelimit.limit(ip)

    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': reset.toString(),
          },
        }
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*',
}
```
Explanation: Upstash stores rate limit state in Redis, making it work across serverless function instances on Vercel.

### Pattern 4: Tiered Rate Limiting
```typescript
// SECURE: Different limits for different endpoints
import rateLimit from 'express-rate-limit'

// Strict limit for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Only 5 attempts
  message: { error: 'Too many login attempts' },
})

// Moderate limit for API endpoints
const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // 100 requests per minute
  message: { error: 'Rate limit exceeded' },
})

// Apply to routes
app.use('/api/auth', authLimiter)
app.use('/api', apiLimiter)
```
Explanation: Login endpoints need stricter limits than general API endpoints. Apply different rate limiters to different route groups.

### Pattern 5: Defense in Depth (Rate Limit + CAPTCHA)
```typescript
// SECURE: Combine rate limiting with CAPTCHA after failures
let failedAttempts = new Map<string, number>() // In production, use Redis

export async function POST(request: Request) {
  const { email, password, captcha } = await request.json()
  const ip = request.headers.get('x-forwarded-for') || 'unknown'

  // Check if CAPTCHA is required
  const attempts = failedAttempts.get(ip) || 0
  if (attempts >= 3 && !captcha) {
    return NextResponse.json(
      { error: 'CAPTCHA required', requireCaptcha: true },
      { status: 400 }
    )
  }

  // Verify CAPTCHA if provided
  if (captcha && !(await verifyCaptcha(captcha))) {
    return NextResponse.json({ error: 'Invalid CAPTCHA' }, { status: 400 })
  }

  const user = await verifyCredentials(email, password)

  if (!user) {
    failedAttempts.set(ip, attempts + 1)
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  // Reset on success
  failedAttempts.delete(ip)
  return NextResponse.json({ user })
}
```
Explanation: Rate limiting slows attacks, CAPTCHA stops automated attacks. Combine both for stronger protection.

---

## AI Fix Prompt Requirements

The Writer Agent should create an AI fix prompt that includes:
- [ ] Search for login/auth endpoints: `app/api/auth/*`, `pages/api/auth/*`, `/login`, `/signin`
- [ ] Search for password reset endpoints
- [ ] Check for `rateLimit` or `Ratelimit` imports
- [ ] Verify rate limiters are defined OUTSIDE handler functions
- [ ] Check for tiered limits (auth vs general API)
- [ ] Framework-specific: Next.js App Router middleware, Express middleware
- [ ] Verification: Test with rapid requests to confirm 429 responses

---

## Notes for Writer Agent

### Tone Guidance
- This is a vulnerability AI tools NEVER add - emphasize that strongly
- Make the attack scenario vivid - millions of password attempts per second
- Be practical about serverless challenges (Vercel, stateless functions)
- Acknowledge rate limiting alone isn't perfect - defense in depth

### Technical Accuracy
- `express-rate-limit` MUST be defined outside handler function
- Serverless functions don't share state - need external store (Redis/Upstash)
- 429 Too Many Requests is the correct status code
- Rate limit headers (X-RateLimit-*) help legitimate users understand limits

### Things to Avoid
- Don't suggest overly strict limits that hurt UX (1 request per minute for login)
- Don't imply rate limiting alone stops all attacks
- Don't forget about legitimate users behind shared IPs (corporate networks)
- Don't recommend account lockout without explaining DoS risk

### Vibe Coding Terms
Use these 3-5 times naturally:
- vibe coding
- vibe coders
- vibe coded
- AI-generated code

---

## Checklist Before Marking READY

- [x] All external links verified working
- [x] CWE/OWASP references correct (CWE-799, CWE-307, A04:2021)
- [x] 7 internal links identified
- [x] 5 PAA questions included
- [x] Competitive gap is specific
- [x] Code examples drafted (5 patterns)
- [x] No placeholder text

---

**Brief Status:** READY for Writer Agent
