# Content Brief: Server-Side Request Forgery (SSRF)

## Status

```yaml
status: DONE
created_at: 2025-12-17T15:15:00Z
created_by: Research Agent Terminal 1B
claimed_by: Writer Agent Terminal 1B
claimed_at: 2025-12-17T17:15:00Z
completed_at: 2025-12-17T18:00:00Z
```

---

## Article Metadata

```yaml
type: vulnerability
slug: ssrf
url: /kb/security/vulnerabilities/ssrf/
title: "SSRF: When Your Server Makes Requests for Attackers"
meta_description: "SSRF lets attackers use your server to access internal systems. Next.js had critical SSRF CVEs in 2024-2025. Learn to validate URLs and protect your APIs."
cwe: CWE-918
owasp: A10:2021-Server-Side Request Forgery
severity: High
word_count: 1200-1500
```

---

## Core Data

### Primary References
| Reference | ID | Link |
|-----------|-----|------|
| CWE-918 | Server-Side Request Forgery (SSRF) | https://cwe.mitre.org/data/definitions/918.html |
| OWASP | A10:2021-Server-Side Request Forgery | https://owasp.org/Top10/A10_2021-Server-Side_Request_Forgery_%28SSRF%29/ |
| CVE-2024-34351 | Next.js SSRF in Server Actions | https://github.com/vercel/next.js/security/advisories/GHSA-fr5h-rqp8-mj6g |

### External Sources (for outbound links)
| Source | URL | Key Finding | Tier |
|--------|-----|-------------|------|
| CWE-918 Definition | https://cwe.mitre.org/data/definitions/918.html | Comprehensive SSRF definition | 1 |
| OWASP SSRF | https://owasp.org/Top10/A10_2021-Server-Side_Request_Forgery_%28SSRF%29/ | Top 10 category dedicated to SSRF | 1 |
| PortSwigger SSRF | https://portswigger.net/web-security/ssrf | Detailed exploitation techniques | 2 |
| Next.js CVE-2024-34351 | https://github.com/vercel/next.js/security/advisories/GHSA-fr5h-rqp8-mj6g | Critical Next.js SSRF vulnerability | 6 |
| Snyk Next.js SSRF | https://security.snyk.io/vuln/SNYK-JS-NEXT-6828457 | CVE-2024-34351 details | 2 |
| Next.js CVE-2025-57822 | https://security.snyk.io/vuln/SNYK-JS-NEXT-12299318 | Latest Next.js SSRF vulnerability | 2 |
| Invicti Next.js SSRF | https://www.invicti.com/web-application-vulnerabilities/next-js-server-side-request-forgery-ssrf-vulnerability-cve-2024-34351 | Exploitation conditions explained | 2 |

### Key Facts to Include
- SSRF is OWASP Top 10 #10 (A10:2021) - has its own dedicated category
- Next.js had critical SSRF vulnerabilities: CVE-2024-34351 (versions < 14.1.1) and CVE-2025-57822
- CVE-2024-34351 affected Next.js 13.4.0 - 14.1.0 with Server Actions
- Attackers can access internal services (localhost, cloud metadata endpoints)
- AWS metadata endpoint 169.254.169.254 is a common SSRF target for stealing credentials
- SSRF can bypass firewalls since requests originate from trusted server
- Can use file://, gopher://, dict:// protocols for additional attacks

---

## SEO Strategy

### Target Keywords
| Keyword | Search Intent | Priority |
|---------|---------------|----------|
| SSRF vulnerability | informational | Primary |
| server-side request forgery | informational | Primary |
| Next.js SSRF | informational | Secondary |
| SSRF prevention Node.js | transactional | Secondary |
| what is SSRF attack | informational | Tertiary |

### People Also Ask (FAQs)
1. What is SSRF vulnerability?
2. How do attackers exploit SSRF?
3. Is my Next.js app vulnerable to SSRF?
4. How do I prevent SSRF in Node.js?
5. What can attackers access with SSRF?

### Competitive Gap
**Top results analysis:**
- PortSwigger: Excellent but generic web security focus
- OWASP: Definition-heavy, lacks practical code examples
- Blog posts: Often outdated, miss recent Next.js CVEs

**Our unique angle:**
- Recent Next.js CVEs (2024-2025) - highly relevant to vibe coders
- Server Actions vulnerability context
- Cloud metadata endpoint attacks (AWS, GCP, Azure)
- Copy-paste URL validation code for Next.js

---

## Content Outline

### Quick Answer (50 words max)
SSRF (Server-Side Request Forgery) lets attackers make your server send requests to internal systems they can't reach directly. Next.js had critical SSRF vulnerabilities in 2024-2025. Always validate and allowlist URLs before your server fetches them.

### Section 1: What is SSRF?
- Plain English: Attacker tricks your server into making requests on their behalf
- Analogy: Like convincing a security guard to open a door for you because you know his name
- Consequences: Access internal APIs, steal cloud credentials, port scan internal network
- Why it has its own OWASP Top 10 category
- Word count: 100-150

### Section 2: Real Next.js SSRF Vulnerabilities
- CVE-2024-34351: Server Actions redirect vulnerability
- Conditions: Self-hosted, using Server Actions, redirect to relative path
- CVE-2025-57822: Middleware next() function issue
- How to check your Next.js version
- Word count: 150-200

### Section 3: Common SSRF Attack Patterns
- Internal service access: http://localhost:3000/admin
- Cloud metadata: http://169.254.169.254/latest/meta-data/
- File protocol: file:///etc/passwd
- DNS rebinding attacks
- Bypasses: IP representations, URL encoding, redirects
- Word count: 150-200

### Section 4: Why AI Tools Generate SSRF-Vulnerable Code
- "Fetch this URL" features
- Image/URL preview functionality
- Webhook implementations
- No URL validation by default
- Word count: 100-150

### Section 5: How to Fix SSRF
- URL allowlisting (domains and protocols)
- Block internal IP ranges
- Disable dangerous protocols (file://, gopher://)
- Use network segmentation
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
| hardcoded secrets | /kb/security/vulnerabilities/hardcoded-secrets/ | Cloud credential theft |
| missing authentication | /kb/security/vulnerabilities/missing-auth/ | Internal API access |
| path traversal | /kb/security/vulnerabilities/path-traversal/ | file:// protocol attacks |
| Cursor security patterns | /kb/vibe-coding-tools/cursor/ | AI tool context |
| Bolt security patterns | /kb/vibe-coding-tools/bolt/ | AI tool context |
| Claude Code security patterns | /kb/vibe-coding-tools/claude-code/ | AI tool context |
| Next.js + Supabase security | /kb/security/stacks/nextjs-supabase/ | Framework context |

---

## External Links (5-10 required)

| Anchor Text | URL | Tier | Placement |
|-------------|-----|------|-----------|
| CWE-918: SSRF | https://cwe.mitre.org/data/definitions/918.html | 1 | Intro |
| OWASP SSRF | https://owasp.org/Top10/A10_2021-Server-Side_Request_Forgery_%28SSRF%29/ | 1 | Intro |
| PortSwigger SSRF | https://portswigger.net/web-security/ssrf | 2 | Attack patterns |
| Next.js CVE-2024-34351 | https://github.com/vercel/next.js/security/advisories/GHSA-fr5h-rqp8-mj6g | 6 | Next.js section |
| Snyk SSRF Advisory | https://security.snyk.io/vuln/SNYK-JS-NEXT-6828457 | 2 | Next.js section |
| OWASP SSRF Prevention | https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html | 1 | Fix section |

---

## Code Examples Needed

### Pattern 1: Vulnerable URL Fetch (AI Default)
```javascript
// VULNERABLE: AI generates this for "fetch URL" features
app.get('/preview', async (req, res) => {
  const url = req.query.url
  const response = await fetch(url) // DANGEROUS!
  const data = await response.text()
  res.send(data)
})

// Attacker uses: /preview?url=http://localhost:3000/admin
// Or: /preview?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/
```
Explanation: Any URL accepted, including internal services and cloud metadata endpoints.

### Pattern 2: Vulnerable Image Proxy
```javascript
// VULNERABLE: Image proxy without validation
app.get('/image-proxy', async (req, res) => {
  const imageUrl = req.query.src
  const response = await fetch(imageUrl)
  const buffer = await response.arrayBuffer()
  res.set('Content-Type', response.headers.get('content-type'))
  res.send(Buffer.from(buffer))
})

// Attacker: /image-proxy?src=file:///etc/passwd
```
Explanation: Image proxies are common SSRF vectors. No protocol or domain validation.

### Pattern 3: Secure URL Validation
```javascript
// SECURE: Allowlist domains and validate URL
const ALLOWED_DOMAINS = ['api.example.com', 'cdn.example.com']
const ALLOWED_PROTOCOLS = ['https:']

function isUrlAllowed(urlString) {
  try {
    const url = new URL(urlString)

    // Check protocol
    if (!ALLOWED_PROTOCOLS.includes(url.protocol)) {
      return false
    }

    // Check domain against allowlist
    if (!ALLOWED_DOMAINS.includes(url.hostname)) {
      return false
    }

    // Block internal IPs
    const blockedPatterns = [
      /^localhost$/i,
      /^127\./,
      /^10\./,
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
      /^192\.168\./,
      /^169\.254\./, // AWS metadata
      /^0\.0\.0\.0$/,
    ]

    if (blockedPatterns.some(pattern => pattern.test(url.hostname))) {
      return false
    }

    return true
  } catch {
    return false
  }
}

app.get('/preview', async (req, res) => {
  const url = req.query.url

  if (!isUrlAllowed(url)) {
    return res.status(403).json({ error: 'URL not allowed' })
  }

  const response = await fetch(url)
  const data = await response.text()
  res.send(data)
})
```
Explanation: Validate protocol, allowlist domains, block internal IP ranges including cloud metadata endpoints.

### Pattern 4: Next.js Server Action Protection
```typescript
// SECURE: Next.js Server Action with URL validation
'use server'

import { redirect } from 'next/navigation'

const ALLOWED_REDIRECT_PATHS = ['/dashboard', '/profile', '/settings']

export async function safeRedirect(path: string) {
  // Validate it's a relative path
  if (path.startsWith('http://') || path.startsWith('https://')) {
    throw new Error('External redirects not allowed')
  }

  // Validate against allowlist
  if (!ALLOWED_REDIRECT_PATHS.some(allowed => path.startsWith(allowed))) {
    throw new Error('Invalid redirect path')
  }

  redirect(path)
}
```
Explanation: Server Actions should validate redirect paths. CVE-2024-34351 exploited unvalidated redirects.

### Pattern 5: Webhook URL Validation
```javascript
// SECURE: Webhook endpoint with strict validation
async function validateWebhookUrl(url) {
  const parsed = new URL(url)

  // Must be HTTPS
  if (parsed.protocol !== 'https:') {
    throw new Error('Webhook must use HTTPS')
  }

  // Resolve DNS and check for internal IPs
  const dns = require('dns').promises
  const addresses = await dns.resolve4(parsed.hostname)

  const internalRanges = [
    /^127\./,
    /^10\./,
    /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
    /^192\.168\./,
    /^169\.254\./,
  ]

  for (const ip of addresses) {
    if (internalRanges.some(range => range.test(ip))) {
      throw new Error('Webhook cannot point to internal addresses')
    }
  }

  return true
}
```
Explanation: DNS resolution check catches domain rebinding attacks where external domains resolve to internal IPs.

---

## AI Fix Prompt Requirements

The Writer Agent should create an AI fix prompt that includes:
- [ ] Search for fetch(), axios, got, node-fetch with user-supplied URLs
- [ ] Search for image proxy, URL preview, webhook features
- [ ] Check for URL validation before any HTTP request
- [ ] Look for redirect handling in Server Actions (Next.js)
- [ ] Verify internal IP ranges are blocked (127.x, 10.x, 172.16-31.x, 192.168.x, 169.254.x)
- [ ] Check that only https:// protocol is allowed (or explicit allowlist)
- [ ] Framework-specific: Next.js Server Actions, middleware

---

## Notes for Writer Agent

### Tone Guidance
- SSRF is less known than SQLi/XSS - explain it clearly
- The Next.js CVEs make this very relevant and timely
- Cloud metadata theft is high-impact - emphasize this

### Technical Accuracy
- Next.js CVE-2024-34351 affects versions 13.4.0 - 14.1.0
- CVE-2025-57822 affects versions < 14.2.32 and < 15.4.7
- AWS metadata endpoint is 169.254.169.254
- DNS rebinding can bypass hostname checks - need IP validation

### Things to Avoid
- Don't suggest only blocking localhost (insufficient)
- Don't forget about IPv6 addresses
- Don't suggest regex on URLs (use URL parser)
- Don't ignore DNS rebinding attacks

### Vibe Coding Terms
Use these 3-5 times naturally:
- vibe coding
- vibe coders
- vibe coded
- AI-generated code

---

## Checklist Before Marking READY

- [x] All external links verified working
- [x] CWE/OWASP references correct (CWE-918, A10:2021)
- [x] 7 internal links identified
- [x] 5 PAA questions included
- [x] Competitive gap is specific
- [x] Code examples drafted (5 patterns)
- [x] No placeholder text

---

**Brief Status:** READY for Writer Agent
