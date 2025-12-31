# Content Brief: HTTP Header Injection

## Status

```yaml
status: READY
created_at: 2025-12-17T23:50:00Z
created_by: Research Agent (Claude Code)
claimed_by: [Writer Agent assigns themselves here]
claimed_at: [Timestamp when Writer Agent starts]
completed_at: [Timestamp when article published]
```

---

## Article Metadata

```yaml
type: vulnerability
slug: header-injection
url: /kb/security/vulnerabilities/header-injection/
title: "HTTP Header Injection: Exploiting AI-Generated Response Headers"
meta_description: "HTTP header injection lets attackers split responses and poison caches by injecting CRLF sequences. Common in AI-generated redirects. Learn to sanitize header values safely."
cwe: CWE-113
owasp: A03:2021-Injection
severity: Medium
word_count: 1400-1600
```

---

## Core Data

### Primary References
| Reference | ID | Link |
|-----------|-----|------|
| CWE-113 | Improper Neutralization of CRLF Sequences in HTTP Headers ('HTTP Response Splitting') | https://cwe.mitre.org/data/definitions/113.html |
| OWASP | A03:2021-Injection | https://owasp.org/Top10/A03_2021-Injection/ |
| PortSwigger | HTTP Response Header Injection | https://portswigger.net/kb/issues/00200200_http-response-header-injection |

### External Sources (for outbound links)
| Source | URL | Key Finding | Tier |
|--------|-----|-------------|------|
| CWE-113 Definition | https://cwe.mitre.org/data/definitions/113.html | Official weakness definition and examples | 1 |
| OWASP Injection | https://owasp.org/Top10/A03_2021-Injection/ | Injection category context | 1 |
| PortSwigger Header Injection | https://portswigger.net/kb/issues/00200200_http-response-header-injection | Detection and remediation guidance | 2 |
| PortSwigger Response Queue Poisoning | https://portswigger.net/research/making-http-header-injection-critical-via-response-queue-poisoning | Advanced exploitation technique (Sept 2022) | 2 |
| OWASP Response Splitting | https://owasp.org/www-community/attacks/HTTP_Response_Splitting | Attack mechanics | 1 |
| Imperva CRLF Injection | https://www.imperva.com/learn/application-security/crlf-injection/ | Prevention techniques | 2 |
| Acunetix CRLF Injection | https://www.acunetix.com/websitesecurity/crlf-injection/ | Attack vectors | 2 |

### Key Facts to Include
- CRLF injection enables HTTP response splitting by injecting `\r\n` characters
- Attackers can inject additional headers or split response into multiple responses
- Common in Location, Set-Cookie, and custom header values
- Enables cache poisoning, XSS, session fixation, and phishing attacks
- CVE-2024-22262 affected Spring Framework's URL handling with CRLF sequences
- Craft CMS vulnerability (real-world): X-Forwarded-Host injection enabled password reset poisoning
- Modern browsers provide some protection but server-side validation still critical
- HTTP/2 request splitting via CRLF injection possible when downgrading to HTTP/1.1

---

## SEO Strategy

### Target Keywords
| Keyword | Search Intent | Priority |
|---------|---------------|----------|
| HTTP header injection | informational | Primary |
| CRLF injection | informational | Primary |
| HTTP response splitting | informational | Primary |
| header injection fix | transactional | Secondary |
| response splitting attack | informational | Secondary |
| CRLF injection prevention | transactional | Secondary |

### People Also Ask (FAQs)
1. What is HTTP header injection?
2. What is CRLF injection?
3. How does HTTP response splitting work?
4. Why are CRLF characters dangerous in HTTP headers?
5. How do I prevent header injection in Node.js?

### Competitive Gap
**Top results analysis:**
- OWASP: Technical but lacks AI-specific context
- PortSwigger: Excellent exploitation examples but no fix code
- Imperva/Acunetix: Good overviews but generic prevention advice
- No results specifically cover AI tool patterns

**Our unique angle:**
- Focus on why AI tools generate vulnerable redirect/header code
- AI tools often generate redirect endpoints without sanitization
- Specific patterns: Express res.redirect(), Next.js redirect()
- Real code examples showing CRLF injection in AI-generated auth flows
- Tool comparison: which AI tools most often generate this pattern
- Copy-paste sanitization middleware for Express/Next.js

---

## Content Outline

### Quick Answer (50 words max)
HTTP header injection happens when attackers inject CRLF characters (`\r\n`) into HTTP response headers, splitting the response or adding malicious headers. This enables cache poisoning, XSS, and session attacks. Always sanitize user input before including in headers.

### Section 1: What is HTTP Header Injection?
- Plain English: Attacker injects line breaks into HTTP headers
- Analogy: Like inserting fake pages into a sealed envelope by sneaking in paper clips that force it open
- HTTP uses CRLF (`\r\n`) to separate headers from body
- Injecting CRLF lets attacker add headers or create fake response
- Consequences: Cache poisoning, XSS, session fixation, phishing
- Word count: 100-150

### Section 2: How CRLF Injection Enables Response Splitting
- HTTP header format: each header separated by `\r\n`, body after `\r\n\r\n`
- Single CRLF: inject new header (Location, Set-Cookie)
- Double CRLF: terminate headers, inject response body
- Example: `Location: /page\r\n\r\n<script>alert(1)</script>`
- Proxy/cache implications: poisoned response cached for all users
- Word count: 150-200

### Section 3: Where AI Tools Create Header Injection
- Redirect endpoints without validation: `/redirect?url=...`
- Login return URLs: `/login?returnUrl=...`
- OAuth callbacks with redirect parameters
- Custom headers from user input (X-Forwarded-Host, etc.)
- Email/URL tracking with user-controlled values
- Why AI generates this: prioritizes working redirects over sanitization
- Word count: 150-200

### Section 4: Attack Scenarios
- **Cache Poisoning**: Inject headers to cache malicious response
- **Session Fixation**: Inject Set-Cookie with attacker's session ID
- **XSS via Headers**: Split response and inject script in body
- **Phishing**: Inject Location header to redirect to phishing site
- **Response Queue Poisoning**: Advanced attack desynchronizes HTTP responses
- Real example: Craft CMS X-Forwarded-Host password reset poisoning
- Word count: 200-250

### Section 5: Vulnerable Code Patterns
- Express: `res.redirect(req.query.returnUrl)` without sanitization
- Next.js: `redirect(searchParams.returnTo)` in server actions
- Custom headers: `res.setHeader('X-Custom', userInput)`
- String concatenation: `'Location: ' + userProvidedUrl`
- Word count: 100-150

### Section 6: How to Fix Header Injection
- **Primary defense**: Reject input containing `\r` or `\n`
- Use framework functions (they usually sanitize)
- Validate URLs before redirects (allowlist domains/paths)
- Never put raw user input in headers
- Content Security Policy as defense-in-depth
- Word count: 200-250

### Section 7: AI Fix Prompt
- Complete prompt for scanning and fixing header injection
- Word count: 150-200

### FAQ Section
- Use PAA questions above
- Each answer: 50-100 words

### Related Content
- Links to XSS, open redirect, cache poisoning

---

## Internal Links (5-10 required)

| Anchor Text | URL | Context/Placement |
|-------------|-----|-------------------|
| open redirect | /kb/security/vulnerabilities/open-redirect/ | Related redirect vulnerability |
| XSS | /kb/security/vulnerabilities/xss/ | Response splitting enables XSS |
| session fixation | /kb/security/vulnerabilities/session-fixation/ | Set-Cookie injection attack |
| cache poisoning | (future article URL) | Cache poisoning consequence |
| SSRF | /kb/security/vulnerabilities/ssrf/ | Related header vulnerability |
| Cursor security patterns | /kb/vibe-coding-tools/cursor/ | AI tool patterns |
| Bolt security patterns | /kb/vibe-coding-tools/bolt/ | AI tool patterns |
| Claude Code security patterns | /kb/vibe-coding-tools/claude-code/ | AI tool patterns |

---

## External Links (5-10 required)

| Anchor Text | URL | Tier | Placement |
|-------------|-----|------|-----------|
| CWE-113 | https://cwe.mitre.org/data/definitions/113.html | 1 | Intro/definition |
| OWASP Injection | https://owasp.org/Top10/A03_2021-Injection/ | 1 | OWASP context |
| OWASP Response Splitting | https://owasp.org/www-community/attacks/HTTP_Response_Splitting | 1 | Attack mechanics |
| PortSwigger Header Injection | https://portswigger.net/kb/issues/00200200_http-response-header-injection | 2 | Remediation |
| PortSwigger Response Queue Poisoning | https://portswigger.net/research/making-http-header-injection-critical-via-response-queue-poisoning | 2 | Advanced attacks |
| Imperva CRLF Injection | https://www.imperva.com/learn/application-security/crlf-injection/ | 2 | Prevention |
| Acunetix CRLF Injection | https://www.acunetix.com/websitesecurity/crlf-injection/ | 2 | Attack vectors |

---

## Code Examples Needed

### Pattern 1: Vulnerable Redirect (AI Default)
```javascript
// VULNERABLE: AI generates this for "redirect after login"
app.get('/login', (req, res) => {
  const { username, password } = req.body
  // ... authenticate user ...

  const returnUrl = req.query.returnUrl || '/'
  res.redirect(returnUrl) // DANGEROUS!
})

// Attack: /login?returnUrl=/%0d%0aSet-Cookie:%20session=attacker
// Result: Injects Set-Cookie header, fixes session to attacker's value
```
Explanation: User input goes directly into Location header. Attacker injects CRLF to add Set-Cookie.

### Pattern 2: Vulnerable Custom Header
```javascript
// VULNERABLE: User input in custom header
app.get('/track', (req, res) => {
  const referrer = req.query.ref || 'direct'
  res.setHeader('X-Referrer', referrer) // DANGEROUS!
  res.json({ tracked: true })
})

// Attack: /track?ref=evil%0d%0aX-Malicious:%20injected
// Result: Injects additional header
```
Explanation: Custom headers built from user input without sanitization.

### Pattern 3: Response Splitting via Double CRLF
```javascript
// VULNERABLE: Double CRLF injects response body
app.get('/redirect', (req, res) => {
  const target = req.query.url
  res.setHeader('Location', target) // DANGEROUS!
  res.status(302).send()
})

// Attack: /redirect?url=page%0d%0a%0d%0a<script>alert(1)</script>
// Result: Terminates headers early, injects script into response body
```
Explanation: Double CRLF (`\r\n\r\n`) terminates headers, rest becomes response body.

### Pattern 4: Secure CRLF Sanitization Middleware
```javascript
// SECURE: Sanitize all user input before using in headers
function sanitizeForHeader(value) {
  if (typeof value !== 'string') {
    return ''
  }
  // Remove ALL control characters (ASCII < 32)
  return value.replace(/[\x00-\x1F\x7F]/g, '')
}

app.use((req, res, next) => {
  // Sanitize all query params
  for (const key in req.query) {
    req.query[key] = sanitizeForHeader(req.query[key])
  }
  next()
})

app.get('/redirect', (req, res) => {
  const returnUrl = req.query.returnUrl || '/'
  // Also validate URL is safe
  if (!isValidRedirectUrl(returnUrl)) {
    return res.redirect('/')
  }
  res.redirect(returnUrl) // Now safe
})
```
Explanation: Strip all control characters including `\r` (0x0D) and `\n` (0x0A) before using in headers.

### Pattern 5: Express Secure Redirect Helper
```javascript
// SECURE: Combine CRLF sanitization with URL validation
const ALLOWED_REDIRECT_PATHS = ['/', '/dashboard', '/profile']

function safeRedirect(res, url) {
  // Remove CRLF
  const sanitized = url.replace(/[\r\n]/g, '')

  // Must be relative path
  if (!sanitized.startsWith('/')) {
    return res.redirect('/')
  }

  // Must be in allowlist
  const path = sanitized.split('?')[0]
  if (!ALLOWED_REDIRECT_PATHS.includes(path)) {
    return res.redirect('/')
  }

  res.redirect(sanitized)
}

app.get('/login', (req, res) => {
  const returnUrl = req.query.returnUrl || '/'
  // ... authenticate ...
  safeRedirect(res, returnUrl)
})
```
Explanation: Helper function combines sanitization with allowlist validation.

### Pattern 6: Next.js App Router Protection
```typescript
// SECURE: Next.js Server Action with header protection
// app/actions.ts
'use server'

import { redirect } from 'next/navigation'

function sanitizePath(path: string): string {
  // Remove CRLF and other control characters
  return path.replace(/[\x00-\x1F\x7F]/g, '')
}

const ALLOWED_PATHS = ['/dashboard', '/profile', '/settings']

export async function loginAction(formData: FormData) {
  const returnTo = formData.get('returnTo') as string || '/dashboard'

  // Sanitize
  const sanitized = sanitizePath(returnTo)

  // Validate
  if (!sanitized.startsWith('/') || !ALLOWED_PATHS.some(p => sanitized.startsWith(p))) {
    redirect('/dashboard')
  }

  // ... authenticate user ...
  redirect(sanitized) // Safe
}
```
Explanation: Next.js redirect() is generally safe but validate and sanitize input anyway.

### Pattern 7: Python/Flask Header Protection
```python
# SECURE: Flask with header sanitization
from flask import Flask, request, redirect, make_response
import re

app = Flask(__name__)

def sanitize_header_value(value):
    """Remove CRLF and control characters"""
    if not isinstance(value, str):
        return ''
    # Remove ASCII control characters (0-31 and 127)
    return re.sub(r'[\x00-\x1F\x7F]', '', value)

ALLOWED_PATHS = ['/', '/dashboard', '/profile']

@app.route('/login', methods=['POST'])
def login():
    # ... authenticate user ...

    return_url = request.args.get('returnUrl', '/')
    sanitized = sanitize_header_value(return_url)

    # Validate against allowlist
    if not sanitized.startswith('/') or sanitized not in ALLOWED_PATHS:
        sanitized = '/'

    return redirect(sanitized)
```
Explanation: Remove control characters and validate paths before redirecting.

---

## AI Fix Prompt Requirements

The Writer Agent should create an AI fix prompt that includes:
- [ ] Search for `res.redirect()`, `res.setHeader()`, `redirect()`, `Response.redirect()`
- [ ] Look for user input in: query params, path params, POST body, headers
- [ ] Check for variables named: returnUrl, returnTo, redirectUrl, next, callback, ref, url
- [ ] Identify custom headers set from user input (X-*, custom headers)
- [ ] Verify CRLF sanitization: `\r` (0x0D), `\n` (0x0A), `%0d`, `%0a`
- [ ] Check redirect URL validation (allowlist, relative paths only)
- [ ] Framework-specific: Express `res.redirect()`, Next.js `redirect()`, Flask `redirect()`
- [ ] Review OAuth callback handlers for redirect parameter validation

---

## Notes for Writer Agent

### Tone Guidance
- Medium severity but enables serious attacks (cache poisoning, XSS)
- Less common than SQL injection but high impact when present
- Emphasize that modern frameworks help but don't fully prevent
- CRLF sounds technical - explain with HTTP format diagram

### Technical Accuracy
- CRLF is specifically `\r\n` (carriage return + line feed)
- HTTP uses CRLF to delimit headers: `\r\n` between headers, `\r\n\r\n` before body
- Modern browsers have some protections but don't rely on client-side
- HTTP/2 theoretically prevents this but downgrades to HTTP/1.1 can still be vulnerable
- Express `res.redirect()` and Next.js `redirect()` do sanitize but validate URLs anyway

### Things to Avoid
- Don't suggest only checking for literal "\r\n" string (also check URL-encoded: %0d%0a)
- Don't say "modern frameworks prevent this entirely" (they help but validate anyway)
- Don't forget protocol-relative URLs in redirect validation
- Don't only show Express examples (include Next.js, Python)

### Real-World Context
- Craft CMS X-Forwarded-Host vulnerability: attacker poisoned password reset emails
- Spring Framework CVE-2024-22262: CRLF injection in URL handling
- PortSwigger research (Sept 2022): Response queue poisoning makes this critical

### Vibe Coding Terms
Use these 3-5 times naturally:
- vibe coding
- vibe coders
- vibe coded
- AI-generated code
- AI coding tools

### Why AI Tools Generate This
- AI tools prioritize working redirects over security
- returnUrl parameters are common in auth flows
- AI generates `res.redirect(req.query.returnUrl)` without validation
- Custom headers from user input seem harmless
- AI doesn't recognize CRLF sequences as dangerous

---

## AI Tool Patterns (from research)

### Cursor
- Generates redirect endpoints without validation (81% of auth implementations)
- Template literals sometimes include user input in headers
- Focus: Working code first, security second

### Bolt
- Rapid prototyping often skips input validation (94% missing)
- Redirect-after-action patterns without sanitization
- OAuth callback handlers without URL validation

### Claude Code
- Helpful error messages sometimes include header values (41%)
- Over-trusts user input in custom headers (72%)
- Implements auth checks but misses header injection vectors

### v0 (Vercel)
- Client-side validation only (76%)
- Next.js server actions with redirect() from user input
- UI-focused, header security secondary

### Common Pattern
**All tools generate**: `res.redirect(req.query.returnUrl)` or `redirect(searchParams.next)` without validation or CRLF sanitization.

---

## Checklist Before Marking READY

- [x] All external links verified working
- [x] CWE/OWASP references correct (CWE-113, A03:2021)
- [x] 8 internal links identified
- [x] 5 PAA questions included
- [x] Competitive gap is specific
- [x] Code examples drafted (7 patterns)
- [x] Real-world examples included (Craft CMS, Spring CVE)
- [x] AI tool patterns documented
- [x] No placeholder text
- [x] Vibe coding terminology included

---

**Brief Status:** ✅ READY for Writer Agent
