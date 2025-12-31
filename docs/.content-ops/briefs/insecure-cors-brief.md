# Content Brief: Insecure CORS Configuration

## Status

```yaml
status: DONE
created_at: 2025-12-17T14:15:00Z
created_by: Research Agent (Terminal 1)
claimed_by: Writer Agent Terminal 2
claimed_at: 2025-12-17T15:00:00Z
completed_at: 2025-12-17T15:10:00Z
```

---

## Article Metadata

```yaml
type: vulnerability
slug: insecure-cors
url: /kb/security/vulnerabilities/insecure-cors/
title: "Insecure CORS: When origin: '*' Exposes Your API"
meta_description: "AI tools default to origin: '*' for CORS - the most dangerous setting. Learn why this exposes sensitive data and how to configure CORS securely in Next.js."
cwe: CWE-942
owasp: A05:2021-Security Misconfiguration
severity: Medium
```

---

## Core Data

### Primary References
| Reference | ID | Link |
|-----------|-----|------|
| CWE-942 | Permissive Cross-domain Policy with Untrusted Domains | https://cwe.mitre.org/data/definitions/942.html |
| OWASP Security Misconfiguration | A05:2021 | https://owasp.org/Top10/A05_2021-Security_Misconfiguration/ |
| OWASP API8:2023 | Security Misconfiguration | https://owasp.org/API-Security/editions/2023/en/0xa8-security-misconfiguration/ |

### External Sources (for outbound links)
| Source | URL | Key Finding | Tier |
|--------|-----|-------------|------|
| PortSwigger CORS | https://portswigger.net/web-security/cors | Origin reflection, null origin, regex bypass attacks | 2 |
| OWASP Testing CORS | https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/11-Client-side_Testing/07-Testing_Cross_Origin_Resource_Sharing | How to test for CORS misconfigurations | 1 |
| MDN CORS | https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS | Authoritative CORS documentation and how it works | 1 |
| Acunetix CORS Misconfiguration | https://www.acunetix.com/vulnerabilities/web/misconfigured-access-control-allow-origin-header/ | Origin reflection vulnerability explained | 2 |
| Next.js Headers Config | https://nextjs.org/docs/pages/api-reference/config/next-config-js/headers | Official Next.js CORS configuration | 6 |
| Vercel CORS Guide | https://vercel.com/kb/guide/how-to-enable-cors | How to enable CORS on Vercel | 6 |
| PortSwigger Arbitrary Origin | https://portswigger.net/kb/issues/00200601_cross-origin-resource-sharing-arbitrary-origin-trusted | Why reflecting arbitrary origins is dangerous | 2 |

### Key Facts to Include
- Browsers FORBID combining `Access-Control-Allow-Origin: *` with `Access-Control-Allow-Credentials: true` (MDN CORS spec)
- Origin reflection (echoing the Origin header back) is as dangerous as wildcard - any site can access your API (PortSwigger)
- Accepting `null` origin is dangerous - attackers can trigger this via sandboxed iframes (PortSwigger)
- CORS is part of OWASP's Security Misconfiguration category (#5 in Top 10)
- AI tools default to `origin: '*'` because it makes CORS errors disappear - "it works" mindset
- 38% of Claude Code-generated projects have insecure CORS defaults (from ai-tool-patterns.md)
- CORS misconfigurations can expose API keys, CSRF tokens, and user data to attackers

---

## SEO Strategy

### Target Keywords
| Keyword | Search Intent | Priority |
|---------|---------------|----------|
| CORS security vulnerability | informational | Primary |
| insecure CORS configuration | informational | Primary |
| CORS origin wildcard security | informational | Secondary |
| next.js CORS configuration | transactional | Secondary |
| access-control-allow-origin security | informational | Secondary |
| CORS credentials security | informational | Tertiary |

### People Also Ask (FAQs)
1. Is Access-Control-Allow-Origin: * dangerous?
2. Can I use CORS with credentials and wildcard origin?
3. How do I fix CORS errors securely?
4. What is CORS origin reflection vulnerability?
5. How do I configure CORS in Next.js?

### Competitive Gap
**Top results analysis:**
- MDN: Comprehensive but dense, technical documentation
- Stack Overflow: Solutions to "fix CORS errors" that introduce vulnerabilities
- Blog posts: Show how to enable CORS, rarely discuss security implications

**Our unique angle:**
- AI tool context: Why "enable CORS" prompts create insecure configurations
- Attack scenarios: What attackers can actually do with misconfigured CORS
- The wildcard trap: Why `*` "works" but is dangerous
- Secure alternatives: Specific origin whitelisting with code examples

---

## Content Outline

### Quick Answer (50 words max)
CORS controls which websites can access your API. Setting `Access-Control-Allow-Origin: *` allows ANY website to read your API responses - including attacker sites. AI tools use this setting because it "fixes" CORS errors, but it exposes sensitive data. Always whitelist specific origins instead.

### Section 1: What is CORS?
- Plain English definition: Browser security that controls cross-site requests
- Analogy: Like a VIP list for websites allowed to access your API
- Why browsers enforce it: Prevent malicious sites from stealing data
- The Same-Origin Policy foundation
- Word count: 100-150

### Section 2: The `origin: '*'` Problem
- What wildcard actually means: ANY website can access your API
- Why AI tools use it: Makes CORS errors disappear immediately
- The attack scenario: Attacker's site reads your user's data
- Why credentials + wildcard doesn't work (browser blocks it)
- Word count: 150-200

### Section 3: Common CORS Misconfigurations
- **Wildcard origin** (`*`): Allows any site
- **Origin reflection**: Echoing Origin header back (just as dangerous)
- **Null origin trust**: Exploitable via sandboxed iframes
- **Regex bypass**: `example.com` matching `evilexample.com`
- **Subdomain trust**: XSS in trusted subdomain exploits CORS
- Word count: 200-250

### Section 4: How AI Tools Generate Vulnerable CORS
- "Enable CORS" prompt → `origin: '*'`
- Claude Code pattern: Permissive defaults for "it works"
- The fix-it-now mentality
- Word count: 150-200

### Section 5: Secure CORS Configuration
- Whitelist specific origins
- Dynamic origin validation (with safe implementation)
- Handling multiple environments (dev, staging, prod)
- When you actually CAN use `*` (public APIs with no auth)
- Word count: 200-300

### Section 6: Next.js CORS Configuration
- Using next.config.js headers
- Middleware approach for dynamic origins
- Handling OPTIONS preflight requests
- App Router vs Pages Router differences
- Word count: 200-300

### Section 7: Express CORS Configuration
- Using the `cors` package securely
- Whitelist vs dynamic origin function
- Credentials handling
- Word count: 150-200

### Section 8: Testing Your CORS Configuration
- Using browser DevTools
- curl commands for testing
- What to look for in responses
- Scanner CTA
- Word count: 150-200

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
| XSS | /kb/security/vulnerabilities/xss/ | Subdomain XSS exploiting CORS |
| hardcoded secrets | /kb/security/vulnerabilities/hardcoded-secrets/ | API key exposure context |
| missing authentication | /kb/security/vulnerabilities/missing-auth/ | Auth + CORS relationship |
| Cursor security patterns | /kb/vibe-coding-tools/cursor/ | AI tool patterns |
| Bolt security patterns | /kb/vibe-coding-tools/bolt/ | AI tool patterns |
| Claude Code security patterns | /kb/vibe-coding-tools/claude-code/ | AI tool patterns (38% stat) |
| Next.js + Supabase security | /kb/security/stacks/nextjs-supabase/ | Framework context |

---

## External Links (8-12 required)

| Anchor Text | URL | Tier | Placement |
|-------------|-----|------|-----------|
| CWE-942: Permissive Cross-domain Policy | https://cwe.mitre.org/data/definitions/942.html | 1 | Intro |
| MDN CORS Documentation | https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS | 1 | What is CORS section |
| PortSwigger CORS Security | https://portswigger.net/web-security/cors | 2 | Attack scenarios |
| OWASP Testing CORS | https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/11-Client-side_Testing/07-Testing_Cross_Origin_Resource_Sharing | 1 | Testing section |
| OWASP Security Misconfiguration | https://owasp.org/Top10/A05_2021-Security_Misconfiguration/ | 1 | Intro or FAQ |
| Next.js Headers Configuration | https://nextjs.org/docs/pages/api-reference/config/next-config-js/headers | 6 | Next.js section |
| Vercel CORS Guide | https://vercel.com/kb/guide/how-to-enable-cors | 6 | Next.js section |
| PortSwigger Arbitrary Origin | https://portswigger.net/kb/issues/00200601_cross-origin-resource-sharing-arbitrary-origin-trusted | 2 | Origin reflection |

---

## Code Examples Needed

### Pattern 1: Vulnerable Wildcard CORS (AI Default)
```typescript
// VULNERABLE: AI generates this when you say "enable CORS"
// Express
import cors from 'cors'
app.use(cors()) // Defaults to origin: '*'

// Or explicitly
app.use(cors({
  origin: '*', // ANY website can access your API!
}))

// Next.js API route
export async function GET(request: Request) {
  return new Response(JSON.stringify({ secret: 'data' }), {
    headers: {
      'Access-Control-Allow-Origin': '*', // DANGEROUS
    },
  })
}
```
Explanation: `origin: '*'` means ANY website can read API responses. If your API returns user data, attackers can steal it.

### Pattern 2: Vulnerable Origin Reflection
```typescript
// VULNERABLE: Reflecting Origin header is just as dangerous
app.use(cors({
  origin: (origin, callback) => {
    // This reflects ANY origin - same as wildcard!
    callback(null, origin)
  },
  credentials: true,
}))

// Or in Next.js
export async function GET(request: Request) {
  const origin = request.headers.get('origin')
  return new Response(JSON.stringify({ data: 'sensitive' }), {
    headers: {
      'Access-Control-Allow-Origin': origin || '*', // DANGEROUS
      'Access-Control-Allow-Credentials': 'true',
    },
  })
}
```
Explanation: Origin reflection bypasses browser's wildcard + credentials restriction. Attacker sends their origin, server reflects it back, attack succeeds.

### Pattern 3: Vulnerable Regex Validation
```typescript
// VULNERABLE: Regex without proper anchoring
const allowedPattern = /example\.com/

app.use(cors({
  origin: (origin, callback) => {
    if (allowedPattern.test(origin)) {
      callback(null, origin) // DANGEROUS!
    } else {
      callback(new Error('Not allowed'))
    }
  },
}))

// Attacker uses: https://evilexample.com - matches!
// Attacker uses: https://example.com.evil.com - matches!
```
Explanation: Regex without `^` and `$` anchors matches substrings. `example.com` matches `evilexample.com`.

### Pattern 4: Secure Origin Whitelist
```typescript
// SECURE: Explicit whitelist of allowed origins
const allowedOrigins = [
  'https://myapp.com',
  'https://app.myapp.com',
  process.env.NODE_ENV === 'development' && 'http://localhost:3000',
].filter(Boolean)

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl)
    if (!origin) return callback(null, true)

    if (allowedOrigins.includes(origin)) {
      callback(null, origin)
    } else {
      callback(new Error('CORS not allowed'))
    }
  },
  credentials: true,
}))
```
Explanation: Whitelist specific, trusted origins. Check for exact match, not substring or regex.

### Pattern 5: Secure Next.js CORS Configuration
```typescript
// SECURE: next.config.js headers approach
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://myapp.com', // Specific origin, not *
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ]
  },
}
```
Explanation: Static headers in next.config.js for simple cases. Use middleware for dynamic origin handling.

### Pattern 6: Next.js Middleware for Dynamic Origins
```typescript
// SECURE: Middleware for dynamic CORS with whitelist
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const allowedOrigins = [
  'https://myapp.com',
  'https://app.myapp.com',
]

export function middleware(request: NextRequest) {
  const origin = request.headers.get('origin')
  const response = NextResponse.next()

  // Handle preflight
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': allowedOrigins.includes(origin || '')
          ? origin!
          : allowedOrigins[0],
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Max-Age': '86400',
      },
    })
  }

  // Handle actual request
  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin)
    response.headers.set('Access-Control-Allow-Credentials', 'true')
  }

  return response
}

export const config = {
  matcher: '/api/:path*',
}
```
Explanation: Middleware handles both preflight OPTIONS and actual requests. Validates origin against whitelist before reflecting.

### Pattern 7: When Wildcard IS Acceptable
```typescript
// ACCEPTABLE: Wildcard for truly public, read-only APIs
// Only use when ALL of these are true:
// 1. API returns only public data
// 2. No authentication required
// 3. No user-specific data
// 4. No sensitive operations

app.use('/api/public', cors({
  origin: '*', // OK for public data
  methods: ['GET'], // Read-only
  // NO credentials: true - this would be blocked anyway
}))

// Example: Public status endpoint
app.get('/api/public/status', (req, res) => {
  res.json({ status: 'operational', version: '1.0.0' })
})
```
Explanation: Wildcard is acceptable for truly public APIs with no authentication. Never combine with credentials or sensitive data.

---

## AI Fix Prompt Requirements

The Writer Agent should create an AI fix prompt that includes:
- [ ] Search for `Access-Control-Allow-Origin` header settings
- [ ] Search for `cors()` middleware usage and configuration
- [ ] Check for `origin: '*'` or `origin: true` patterns
- [ ] Check for origin reflection patterns (using request.headers.origin directly)
- [ ] Verify credentials aren't combined with wildcard
- [ ] Check regex patterns for proper anchoring
- [ ] Framework-specific: Next.js headers, middleware, API routes
- [ ] Verification: Test with curl from different origins

---

## Notes for Writer Agent

### Tone Guidance
- CORS is confusing - be extra clear with analogies
- The "fix CORS error" mindset is the problem - address it directly
- Acknowledge that `origin: '*'` DOES fix the error, but creates a vulnerability
- Be specific about when wildcard IS acceptable (public APIs)

### Technical Accuracy
- Browsers BLOCK wildcard + credentials (spec requirement)
- Origin reflection is the workaround attackers exploit
- `null` origin is a real value (not missing) - comes from sandboxed contexts
- Preflight (OPTIONS) requests need CORS headers too
- CORS is browser-enforced - curl/Postman ignore it

### Things to Avoid
- Don't just say "don't use wildcard" without explaining when it's okay
- Don't ignore the legitimate need to fix CORS errors during development
- Don't forget about preflight OPTIONS requests
- Don't suggest overly complex solutions when simple whitelist works

### Vibe Coding Terms
Use these 3-5 times naturally:
- vibe coding
- vibe coders
- vibe coded
- AI-generated code

---

## Checklist Before Marking READY

- [x] All external links verified working
- [x] CWE/OWASP references correct (CWE-942, A05:2021)
- [x] 7 internal links identified
- [x] 5 PAA questions included
- [x] Competitive gap is specific
- [x] Code examples drafted (7 patterns)
- [x] No placeholder text

---

**Brief Status:** READY for Writer Agent
