# Content Brief: Open Redirect Vulnerability

## Status

```yaml
status: DONE
created_at: 2025-12-17T15:30:00Z
created_by: Research Agent Terminal 1B
claimed_by: Writer Agent Terminal 1B
claimed_at: 2025-12-17T17:30:00Z
completed_at: 2025-12-17T18:00:00Z
```

---

## Article Metadata

```yaml
type: vulnerability
slug: open-redirect
url: /kb/security/vulnerabilities/open-redirect/
title: "Open Redirect: How Attackers Hijack Your Login Flow"
meta_description: "Open redirects let attackers send users to phishing sites using your trusted domain. Common in OAuth and login flows. Learn to validate redirect URLs safely."
cwe: CWE-601
owasp: A01:2021-Broken Access Control
severity: Medium
word_count: 1200-1500
```

---

## Core Data

### Primary References
| Reference | ID | Link |
|-----------|-----|------|
| CWE-601 | URL Redirection to Untrusted Site ('Open Redirect') | https://cwe.mitre.org/data/definitions/601.html |
| OWASP | A01:2021-Broken Access Control | https://owasp.org/Top10/A01_2021-Broken_Access_Control/ |
| OWASP Cheat Sheet | Unvalidated Redirects and Forwards | https://cheatsheetseries.owasp.org/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.html |

### External Sources (for outbound links)
| Source | URL | Key Finding | Tier |
|--------|-----|-------------|------|
| CWE-601 Definition | https://cwe.mitre.org/data/definitions/601.html | Comprehensive vulnerability definition | 1 |
| OWASP Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.html | Prevention recommendations | 1 |
| PortSwigger Open Redirect | https://portswigger.net/kb/issues/00500100_open-redirection-reflected | Detection and exploitation | 2 |
| Snyk Open Redirect | https://learn.snyk.io/lesson/open-redirect/ | Practical examples | 2 |
| Veracode CWE-601 | https://www.veracode.com/security/java/cwe-601/ | Java-specific guidance | 2 |

### Key Facts to Include
- Open redirects enable convincing phishing attacks using trusted domains
- Users see your legitimate domain in the URL, building false trust
- Common in OAuth callbacks, login returnUrl parameters, email links
- Drive-by downloads: attackers redirect to malware-hosting sites
- CVE-2024-22262 affected Spring Framework URL handling
- Can chain with other vulnerabilities (SSRF, XSS)
- Many bug bounty programs specifically accept open redirect reports

---

## SEO Strategy

### Target Keywords
| Keyword | Search Intent | Priority |
|---------|---------------|----------|
| open redirect vulnerability | informational | Primary |
| unvalidated redirect | informational | Primary |
| open redirect fix | transactional | Secondary |
| redirect URL validation | transactional | Secondary |
| OAuth redirect security | informational | Tertiary |

### People Also Ask (FAQs)
1. What is an open redirect vulnerability?
2. Why are open redirects dangerous?
3. How do I validate redirect URLs?
4. Can open redirects lead to account takeover?
5. How do I fix open redirect in Next.js?

### Competitive Gap
**Top results analysis:**
- OWASP: Comprehensive but very technical
- PortSwigger: Good exploitation examples but no code fixes
- Blog posts: Often miss OAuth/auth flow context

**Our unique angle:**
- Focus on login/OAuth flows where this is most dangerous
- AI tools generate vulnerable returnUrl handling
- Copy-paste validation code for Next.js
- Phishing attack chain explanation

---

## Content Outline

### Quick Answer (50 words max)
Open redirect happens when your app redirects users to any URL they specify in a parameter. Attackers craft links using your trusted domain that redirect to phishing sites. Always validate redirect URLs against an allowlist of trusted destinations.

### Section 1: What is Open Redirect?
- Plain English: Your app blindly redirects to any URL in the request
- Analogy: Like a receptionist at a trusted company giving directions to a scam office because someone asked nicely
- Why users trust your domain (SSL cert, familiar URL)
- Consequences: Phishing, malware downloads, credential theft
- Word count: 100-150

### Section 2: Why Open Redirects Are Dangerous
- Phishing with trusted domains
- OAuth callback hijacking
- Drive-by malware downloads
- Chain with other vulns (SSRF, token theft)
- Word count: 150-200

### Section 3: Where AI Tools Create Open Redirects
- returnUrl parameter after login
- OAuth callback handling
- "Redirect after action" features
- Email link tracking
- Word count: 100-150

### Section 4: Common Open Redirect Patterns
- Query parameter: /redirect?url=evil.com
- Path parameter: /goto/evil.com
- Header-based: Location header from user input
- Protocol bypass: javascript:, data:
- Subdomain tricks: trusted.com.evil.com
- Word count: 150-200

### Section 5: How to Fix Open Redirects
- Allowlist approach (preferred)
- Relative URLs only
- Mapping IDs to URLs
- Warning/confirmation pages
- Word count: 200-300

### Section 6: AI Fix Prompt
- Complete prompt for scanning codebase
- Word count: 150-200

### FAQ Section
- Use PAA questions above
- Each answer: 50-100 words

### Related Content
- Links to other vulnerability articles

---

## Internal Links (5-10 required)

| Anchor Text | URL | Context/Placement |
|-------------|-----|-------------------|
| SSRF | /kb/security/vulnerabilities/ssrf/ | Chaining vulnerabilities |
| XSS | /kb/security/vulnerabilities/xss/ | javascript: protocol |
| missing authentication | /kb/security/vulnerabilities/missing-auth/ | OAuth context |
| IDOR | /kb/security/vulnerabilities/idor/ | Access control |
| Cursor security patterns | /kb/vibe-coding-tools/cursor/ | AI tool context |
| Bolt security patterns | /kb/vibe-coding-tools/bolt/ | AI tool context |
| Claude Code security patterns | /kb/vibe-coding-tools/claude-code/ | AI tool context |

---

## External Links (5-10 required)

| Anchor Text | URL | Tier | Placement |
|-------------|-----|------|-----------|
| CWE-601: Open Redirect | https://cwe.mitre.org/data/definitions/601.html | 1 | Intro |
| OWASP Redirect Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.html | 1 | Fix section |
| PortSwigger Open Redirect | https://portswigger.net/kb/issues/00500100_open-redirection-reflected | 2 | Attack patterns |
| Snyk Open Redirect | https://learn.snyk.io/lesson/open-redirect/ | 2 | Examples |
| OWASP Broken Access Control | https://owasp.org/Top10/A01_2021-Broken_Access_Control/ | 1 | Intro |

---

## Code Examples Needed

### Pattern 1: Vulnerable Return URL (AI Default)
```javascript
// VULNERABLE: AI generates this for "return after login"
app.get('/login', (req, res) => {
  const returnUrl = req.query.returnUrl || '/'
  // ... authenticate user ...
  res.redirect(returnUrl) // DANGEROUS!
})

// Attacker: /login?returnUrl=https://evil-phishing-site.com
// User sees your trusted login page, then gets redirected to phishing
```
Explanation: Any URL accepted as redirect target. Attacker crafts link with your domain that redirects to phishing.

### Pattern 2: Vulnerable OAuth Callback
```javascript
// VULNERABLE: OAuth callback without validation
app.get('/auth/callback', async (req, res) => {
  const { code, state } = req.query
  // ... exchange code for token ...

  const redirectTo = req.query.redirect || '/dashboard'
  res.redirect(redirectTo) // DANGEROUS!
})

// Attacker: /auth/callback?code=xxx&redirect=https://evil.com
```
Explanation: OAuth flows commonly have redirect parameters. Without validation, attackers steal tokens via redirect.

### Pattern 3: Secure Allowlist Validation
```javascript
// SECURE: Validate against allowlist of paths
const ALLOWED_REDIRECTS = ['/', '/dashboard', '/profile', '/settings']

function isValidRedirect(url) {
  // Only allow relative paths from allowlist
  if (!url.startsWith('/')) {
    return false
  }

  // Remove query string for comparison
  const path = url.split('?')[0]

  return ALLOWED_REDIRECTS.includes(path)
}

app.get('/login', (req, res) => {
  const returnUrl = req.query.returnUrl || '/'

  if (!isValidRedirect(returnUrl)) {
    return res.redirect('/') // Default to safe page
  }

  // ... authenticate ...
  res.redirect(returnUrl)
})
```
Explanation: Only allow specific, known paths. Reject external URLs and unexpected paths.

### Pattern 4: Secure Domain Validation
```javascript
// SECURE: Validate URL is on trusted domain
const TRUSTED_DOMAINS = ['myapp.com', 'app.myapp.com']

function isValidRedirectUrl(urlString) {
  try {
    const url = new URL(urlString, 'https://myapp.com')

    // Must be same origin or trusted domain
    if (!TRUSTED_DOMAINS.includes(url.hostname)) {
      return false
    }

    // Block javascript: and data: protocols
    if (!['http:', 'https:'].includes(url.protocol)) {
      return false
    }

    return true
  } catch {
    return false
  }
}

app.get('/redirect', (req, res) => {
  const target = req.query.url

  if (!isValidRedirectUrl(target)) {
    return res.status(400).send('Invalid redirect URL')
  }

  res.redirect(target)
})
```
Explanation: Parse URL properly and validate hostname against trusted list. Block dangerous protocols.

### Pattern 5: Next.js Redirect Protection
```typescript
// SECURE: Next.js API route with redirect validation
// pages/api/auth/callback.ts
import type { NextApiRequest, NextApiResponse } from 'next'

const ALLOWED_PATHS = ['/dashboard', '/profile', '/settings']

function isAllowedRedirect(path: string): boolean {
  // Must start with /
  if (!path.startsWith('/')) return false

  // Must not be protocol-relative (//evil.com)
  if (path.startsWith('//')) return false

  // Check against allowlist
  const basePath = path.split('?')[0]
  return ALLOWED_PATHS.some(allowed => basePath.startsWith(allowed))
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { returnTo } = req.query
  const redirectPath = typeof returnTo === 'string' ? returnTo : '/dashboard'

  if (!isAllowedRedirect(redirectPath)) {
    return res.redirect('/dashboard')
  }

  res.redirect(redirectPath)
}
```
Explanation: Validate redirect is relative path starting with / and on allowlist. Block protocol-relative URLs.

### Pattern 6: Mapping Approach (Most Secure)
```javascript
// MOST SECURE: Map IDs to URLs instead of accepting URLs
const REDIRECT_MAP = {
  'dashboard': '/dashboard',
  'profile': '/profile',
  'settings': '/settings',
  'home': '/',
}

app.get('/goto', (req, res) => {
  const target = req.query.target
  const redirectUrl = REDIRECT_MAP[target] || '/'
  res.redirect(redirectUrl)
})

// Usage: /goto?target=dashboard
// Attacker cannot inject arbitrary URLs
```
Explanation: Never accept URLs directly. Map safe identifiers to hardcoded URLs.

---

## AI Fix Prompt Requirements

The Writer Agent should create an AI fix prompt that includes:
- [ ] Search for res.redirect(), redirect(), Response.redirect() with user input
- [ ] Look for returnUrl, returnTo, redirectUrl, next, callback parameters
- [ ] Check OAuth callback handlers for redirect validation
- [ ] Verify URLs are validated against allowlist before redirect
- [ ] Check for protocol validation (block javascript:, data:, //)
- [ ] Framework-specific: Next.js redirect(), Express res.redirect()

---

## Notes for Writer Agent

### Tone Guidance
- Open redirect is "low severity" but high impact for phishing
- Emphasize the trust users place in your domain
- OAuth context is most critical - token theft possible

### Technical Accuracy
- Protocol-relative URLs (//evil.com) bypass some checks
- javascript: URLs can execute code
- Subdomain tricks: evil.com/redirect?url=//trusted.com.evil.com
- URL parser handles relative URLs correctly with base URL

### Things to Avoid
- Don't suggest blacklisting bad domains (impossible to maintain)
- Don't forget protocol-relative URLs
- Don't suggest only checking for "http" (misses javascript:, data:)
- Don't suggest warning pages as only defense (users click through)

### Vibe Coding Terms
Use these 3-5 times naturally:
- vibe coding
- vibe coders
- vibe coded
- AI-generated code

---

## Checklist Before Marking READY

- [x] All external links verified working
- [x] CWE/OWASP references correct (CWE-601, A01:2021)
- [x] 7 internal links identified
- [x] 5 PAA questions included
- [x] Competitive gap is specific
- [x] Code examples drafted (6 patterns)
- [x] No placeholder text

---

**Brief Status:** READY for Writer Agent
