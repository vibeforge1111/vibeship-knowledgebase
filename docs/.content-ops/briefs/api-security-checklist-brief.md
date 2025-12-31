# Content Brief: API Security Checklist - Pre-Production Audit

## Status

```yaml
status: READY
created_at: 2025-12-31T10:00:00Z
created_by: Research Agent (Claude Code)
claimed_by: null
claimed_at: null
completed_at: null
```

---

## Article Metadata

```yaml
type: checklist
slug: api-security-checklist
url: /kb/security/checklists/api-security-checklist/
title: "API Security Checklist: Pre-Production Audit for 2025"
meta_description: "20-point API security checklist for vibe coders. Covers OWASP API Top 10, auth, rate limiting, input validation. Scan before you ship."
word_count: 1500-2000
```

---

## Keyword Research (Ahrefs Data)

### Primary Keywords
| Keyword | Volume | KD | CPC | Traffic Potential |
|---------|--------|-----|-----|-------------------|
| api security checklist | 300 | 1 | $9.00 | 150 |
| api security testing checklist | 150 | 1 | $10.00 | 80 |
| api management security | 350 | 1 | $4.50 | 60 |

### Secondary Keywords
| Keyword | Volume | KD | CPC | Traffic Potential |
|---------|--------|-----|-----|-------------------|
| api security best practices | 1,000 | 17 | $1.40 | 1,700 |
| api security testing | 1,000 | 5 | $5.00 | 1,400 |
| api security tools | 800 | 11 | $25.00 | 800 |
| owasp api security top 10 | 500 | 33 | $4.00 | 2,900 |
| rest api security | 350 | 15 | $0.30 | 150 |
| api security risks | 350 | 9 | $5.00 | 400 |
| api gateway security | 300 | 9 | $12.00 | 300 |
| api authentication best practices | 100 | 12 | $3.50 | 500 |

### Long-Tail Opportunities
| Keyword | Volume | KD |
|---------|--------|-----|
| best api security testing tools | 250 | 1 |
| cloud api security | 400 | 12 |
| what is api security | 450 | 31 |

### Semantic Keywords (Also Rank For / Also Talk About)
- authentication, authorization, access control
- rate limiting, throttling
- input validation, sanitization
- OAuth 2.0, JWT, API keys
- CORS, security headers
- CI/CD pipeline, shift-left testing
- brute force, injection attacks
- zero trust, third-party APIs

---

## Core Data

### Primary References
| Reference | ID | Link |
|-----------|-----|------|
| OWASP API Security Top 10 | 2023 | https://owasp.org/API-Security/editions/2023/en/0x11-t10/ |
| OWASP API Security Project | - | https://owasp.org/www-project-api-security/ |
| CWE-639 | Authorization Bypass | https://cwe.mitre.org/data/definitions/639.html |
| CWE-799 | Rate Limiting | https://cwe.mitre.org/data/definitions/799.html |

### OWASP API Security Top 10 (2023) - Key Items
1. **API1:2023 - BOLA** (Broken Object Level Authorization) - 40% of all API attacks
2. **API2:2023 - Broken Authentication** - JWT, OAuth flaws
3. **API3:2023 - Broken Object Property Level Authorization** - Mass assignment + excessive data exposure
4. **API4:2023 - Unrestricted Resource Consumption** - Rate limiting, DoS
5. **API5:2023 - BFLA** (Broken Function Level Authorization) - Admin bypass
6. **API6:2023 - Unrestricted Access to Sensitive Business Flows** - Bot abuse
7. **API7:2023 - SSRF** - Server-side request forgery
8. **API8:2023 - Security Misconfiguration** - Headers, CORS, debug modes
9. **API9:2023 - Improper Inventory Management** - Shadow APIs, deprecated endpoints
10. **API10:2023 - Unsafe Consumption of APIs** - Third-party API trust

### External Sources (for outbound links)
| Source | URL | Key Finding | Tier |
|--------|-----|-------------|------|
| OWASP API Top 10 2023 | https://owasp.org/API-Security/editions/2023/en/0x11-t10/ | Official vulnerability ranking | 1 |
| Salt Security Blog | https://salt.security/blog/owasp-api-security-top-10-explained | BOLA represents 40% of API attacks | 2 |
| Ahrefs API Checklist | https://www.globaldots.com/resources/blog/api-security-checklist/ | 84% reported API security issues in 2024 | 3 |
| Wiz API Checklist | https://www.wiz.io/academy/api-security-checklist | API breaches cost $4.88M average in 2024 | 3 |
| GitHub API Security Checklist | https://github.com/shieldfy/API-Security-Checklist | Community checklist with 23k+ stars | 7 |
| Snyk DAST | https://snyk.io/product/dast-api-web/ | 0.08% false positive rate | 4 |
| OWASP Cheat Sheet - Input Validation | https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html | Server-side validation requirements | 1 |
| OWASP Cheat Sheet - REST Security | https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html | API-specific security guidance | 1 |

### Key Stats to Include (All Verified)
- **84%** of organizations reported at least one API security issue in 2024 (GlobalDots/Salt Security)
- **$4.88M** average cost of API breaches in 2024 (Wiz)
- **BOLA (API1)** accounts for ~40% of all API attacks (Salt Security)
- APIs are now the **#1 attack vector** in enterprise apps
- Third year in a row that API incidents have increased

---

## SEO Strategy

### Target Search Intent
- **Primary:** Informational (people researching before launch)
- **Secondary:** Transactional (ready to implement security measures)

### People Also Ask (FAQs)
1. What should I check before deploying an API to production?
2. How do I secure a REST API?
3. What is the OWASP API Security Top 10?
4. How do I prevent API authentication attacks?
5. What tools can I use to test API security?
6. How do I implement rate limiting on APIs?
7. What is BOLA in API security?

### Competitive Gap Analysis

**What exists (competitors):**
- GlobalDots: Comprehensive but enterprise-focused, 30+ items
- Wiz: Technical but not actionable, no code examples
- Shieldfy GitHub: Good structure but outdated (2019), no OWASP 2023
- Generic security checklists: Not API-specific, miss modern patterns

**What's missing (our opportunity):**
1. **Vibe coder focus** - Specifically for AI-generated APIs (Cursor, Bolt, Claude)
2. **OWASP 2023 alignment** - Most checklists still reference 2019 list
3. **Actionable items** - Not just "implement authentication" but specific checks
4. **AI fix prompts** - Copy-paste prompts to scan and fix with AI tools
5. **Modern stack examples** - Next.js API routes, Express, Fastify
6. **Internal linking** - We have 70+ vulnerability articles to cross-reference
7. **Pre-production timing** - Catch issues before they become breaches

### Unique Angle
**"The 20-Point API Security Audit for Vibe Coders Shipping to Production"**

Position as THE checklist for:
- AI-generated backends about to go live
- Vibe coders who want security without becoming security experts
- Fast (30-minute) pre-production audit
- OWASP 2023-aligned (not outdated)

---

## Content Outline

### Quick Answer (50 words max)
Before deploying your API, verify: authentication on all endpoints, authorization checks for each resource, rate limiting configured, input validation server-side, no secrets in code, CORS properly scoped, security headers set, and logging enabled. This 20-point checklist covers the OWASP API Security Top 10 in 30 minutes.

### Section 1: Why API Security Matters for Vibe Coders
- APIs are now #1 attack vector (stat: 84% had issues in 2024)
- AI tools generate functional APIs, not secure APIs
- Cost of API breaches ($4.88M average)
- This checklist = 30-minute pre-production audit
- Word count: 100-150

### Section 2: The 20-Point API Security Checklist

**Category 1: Authentication (5 items)**
1. Every endpoint requires authentication (except public ones)
2. JWT tokens are validated properly (signature, expiry, issuer)
3. API keys are not exposed in client-side code
4. OAuth flows use PKCE for public clients
5. Session tokens use httpOnly, secure, sameSite cookies

**Category 2: Authorization (4 items)**
6. Object-level authorization on every request (BOLA check)
7. Function-level authorization for admin operations (BFLA check)
8. No sensitive data in JWT payload
9. Rate limiting per user/API key (not just IP)

**Category 3: Input Validation (4 items)**
10. All inputs validated server-side (not just client)
11. Parameterized queries for all database operations
12. Request body schema validation (JSON Schema, Zod, Yup)
13. File upload restrictions (type, size, filename)

**Category 4: Data Protection (3 items)**
14. No sensitive data in URLs (query params, path)
15. Response filtering (don't return internal IDs, passwords, etc.)
16. TLS 1.2+ required (no HTTP, no TLS 1.0/1.1)

**Category 5: Infrastructure (4 items)**
17. CORS configured with specific origins (not *)
18. Security headers set (CSP, X-Frame-Options, etc.)
19. Rate limiting on all endpoints
20. Error messages don't leak internal details

### Section 3: OWASP API Top 10 Mapping
Show which checklist items map to which OWASP API vulnerabilities:
- API1 (BOLA) -> Items 6, 14, 15
- API2 (Broken Auth) -> Items 1-5
- API3 (Property Authorization) -> Items 12, 15
- API4 (Resource Consumption) -> Items 9, 19
- etc.

### Section 4: AI Fix Prompt for Automated Scanning
Comprehensive prompt that checks all 20 items using AI tools

### Section 5: Recommended Tools
- **Scanning:** VibeShip Scanner, Snyk API, ZAP
- **Validation:** Zod, Yup, Joi, AJV
- **Rate Limiting:** Upstash Rate Limit, express-rate-limit
- **Headers:** Helmet.js, next-secure-headers

### FAQ Section
Use PAA questions from above

---

## Internal Links (15+ required - we have the articles)

| Anchor Text | URL | Context/Placement |
|-------------|-----|-------------------|
| BOLA vulnerabilities | /kb/security/vulnerabilities/bola/ | Item 6, OWASP mapping |
| BFLA vulnerabilities | /kb/security/vulnerabilities/bfla/ | Item 7, OWASP mapping |
| broken authentication | /kb/security/vulnerabilities/missing-auth/ | Item 1, auth section |
| JWT vulnerabilities | /kb/security/vulnerabilities/jwt-vulnerabilities/ | Items 2, 8 |
| OAuth vulnerabilities | /kb/security/vulnerabilities/oauth-vulnerabilities/ | Item 4 |
| rate limiting | /kb/security/vulnerabilities/missing-rate-limiting/ | Items 9, 19 |
| SQL injection | /kb/security/vulnerabilities/sql-injection/ | Item 11 |
| NoSQL injection | /kb/security/vulnerabilities/nosql-injection/ | Item 11 |
| mass assignment | /kb/security/vulnerabilities/mass-assignment/ | Item 12 |
| insecure CORS | /kb/security/vulnerabilities/insecure-cors/ | Item 17 |
| security headers | /kb/security/vulnerabilities/missing-security-headers/ | Item 18 |
| verbose errors | /kb/security/vulnerabilities/verbose-errors/ | Item 20 |
| excessive data exposure | /kb/security/vulnerabilities/excessive-data-exposure/ | Item 15 |
| SSRF | /kb/security/vulnerabilities/ssrf/ | OWASP mapping |
| insecure file upload | /kb/security/vulnerabilities/insecure-file-upload/ | Item 13 |
| hardcoded secrets | /kb/security/vulnerabilities/hardcoded-secrets/ | Item 3 |
| session fixation | /kb/security/vulnerabilities/session-fixation/ | Item 5 |
| credential stuffing | /kb/security/vulnerabilities/credential-stuffing/ | Auth section |
| pre-launch checklist | /kb/security/checklists/pre-launch/ | Related content |
| Next.js + Supabase security | /kb/security/stacks/nextjs-supabase/ | Stack examples |
| Next.js + Prisma security | /kb/security/stacks/nextjs-prisma/ | Stack examples |

---

## External Links (8-10 required)

| Anchor Text | URL | Tier | Placement |
|-------------|-----|------|-----------|
| OWASP API Security Top 10 2023 | https://owasp.org/API-Security/editions/2023/en/0x11-t10/ | 1 | Intro, OWASP section |
| OWASP API Security Project | https://owasp.org/www-project-api-security/ | 1 | Intro |
| REST Security Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html | 1 | Best practices |
| Input Validation Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html | 1 | Input section |
| JWT Security Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html | 1 | Auth section |
| Snyk API Security | https://snyk.io/product/dast-api-web/ | 4 | Tools section |
| Shieldfy API Checklist (GitHub) | https://github.com/shieldfy/API-Security-Checklist | 7 | Reference |
| Cloudflare API Top 10 | https://www.cloudflare.com/learning/security/api/owasp-api-security-top-10/ | 3 | OWASP section |

---

## Code Examples Needed

### Pattern 1: Authentication Middleware (Next.js)
```typescript
// Vulnerable - No auth check
export async function GET(req: Request) {
  const users = await prisma.user.findMany();
  return Response.json(users);
}

// Secure - Auth required
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  // Only return user's own data
  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  });
  return Response.json(user);
}
```

### Pattern 2: Object-Level Authorization (BOLA Prevention)
```typescript
// Vulnerable - No ownership check
app.get('/api/orders/:id', async (req, res) => {
  const order = await db.order.findById(req.params.id);
  res.json(order);
});

// Secure - Ownership verified
app.get('/api/orders/:id', async (req, res) => {
  const order = await db.order.findFirst({
    where: {
      id: req.params.id,
      userId: req.user.id // CRITICAL: ownership check
    }
  });
  if (!order) return res.status(404).json({ error: 'Not found' });
  res.json(order);
});
```

### Pattern 3: Rate Limiting (Express)
```typescript
// Missing rate limiting
app.post('/api/login', async (req, res) => {
  // No protection against brute force
});

// With rate limiting
import rateLimit from 'express-rate-limit';

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts
  message: { error: 'Too many login attempts' }
});

app.post('/api/login', loginLimiter, async (req, res) => {
  // Protected
});
```

### Pattern 4: Input Validation (Zod)
```typescript
// Vulnerable - No validation
app.post('/api/users', async (req, res) => {
  const user = await db.user.create({ data: req.body });
});

// Secure - Schema validation
import { z } from 'zod';

const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  role: z.enum(['user', 'admin']).default('user')
});

app.post('/api/users', async (req, res) => {
  const result = createUserSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.flatten() });
  }
  const user = await db.user.create({ data: result.data });
});
```

---

## AI Fix Prompt (Comprehensive Scanner)

```
## API Security Pre-Production Audit

Scan my API codebase for security issues. Check each category and report findings:

### 1. Authentication (Check all API routes)
- Find routes missing authentication middleware
- Search for: getServerSession, auth(), verifyToken, jwt.verify
- Flag: Any /api/* route without auth check at the start
- Exception: Public routes like /api/health, /api/auth/*

### 2. Authorization (BOLA/BFLA Prevention)
- Find database queries with user-supplied IDs
- Search for: findById, findUnique, where: { id }
- Flag: Queries missing ownership check (userId, ownerId, user_id)
- Check: Admin routes have role verification

### 3. JWT Security
- Search for: jwt.verify, jose.jwtVerify
- Flag: Missing signature verification, no expiry check
- Check: JWT secrets not hardcoded (should be env vars)

### 4. Rate Limiting
- Search for: rateLimit, RateLimiter, Upstash
- Flag: Login endpoints without rate limiting
- Flag: Any /api/* route without rate limiting

### 5. Input Validation
- Search for: z.object, Joi.object, yup.object, ajv
- Flag: POST/PUT routes without request body validation
- Flag: Query params used directly without validation

### 6. SQL/NoSQL Injection
- Search for: template literals with ${} in queries
- Search for: $where, $regex with user input
- Flag: Non-parameterized database queries

### 7. CORS Configuration
- Search for: cors, Access-Control-Allow-Origin
- Flag: origin: '*' with credentials
- Flag: Overly permissive origins

### 8. Security Headers
- Search for: helmet, next-secure-headers
- Flag: Missing X-Frame-Options, CSP, X-Content-Type-Options

### 9. Error Handling
- Search for: console.error, stack traces in responses
- Flag: Detailed error messages sent to client
- Flag: Internal paths or database details in errors

### 10. Secrets Management
- Search for: API keys, tokens, passwords in code
- Flag: Secrets not using environment variables
- Flag: .env files missing from .gitignore

For each finding, provide:
1. File and line number
2. Severity (Critical/High/Medium)
3. The vulnerable code
4. The secure replacement
```

---

## Notes for Writer Agent

### Tone Guidance
- Authoritative but not condescending
- "Here's what to check before launch" not "You're probably doing this wrong"
- Acknowledge that vibe coders move fast - this checklist helps them stay safe
- Make it feel achievable: 30 minutes, 20 items, then you ship

### Technical Accuracy
- All items map to OWASP API Top 10 2023
- Use correct terminology (BOLA not "authorization bypass")
- Code examples must actually work (test them)
- Stats are from 2024 sources

### Things to Avoid
- Don't make it enterprise-heavy (keep it startup/indie focused)
- Don't assume security expertise
- Don't make it feel like a burden ("you have to do all this")
- Don't forget the AI fix prompt - key differentiator
- Don't use outdated OWASP 2019 references

### Vibe Coding Terms
Use these 3-5 times naturally:
- vibe coding / vibe coders
- AI-generated API / AI-generated backend
- ship with confidence
- "AI tools generate... but miss..."

### Design Notes
- Checklist format with severity badges (Critical, High, Medium)
- Collapsible sections for code examples
- Progress indicator optional
- Mobile-friendly (many will check on phone before deploy)

---

## Differentiation from Pre-Launch Checklist

| Pre-Launch Checklist | API Security Checklist |
|---------------------|------------------------|
| General web app security | API-specific security |
| 15 items covering all areas | 20 items deep on APIs |
| Frontend + backend + infra | Backend API focus |
| Links to vulnerability articles | OWASP API Top 10 alignment |
| Quick 15-minute check | Thorough 30-minute audit |

**Cross-link strategy:** Pre-launch checklist links to this for API-heavy apps. This links to pre-launch for broader coverage.

---

## Checklist Before Marking READY

- [x] All external links verified working
- [x] OWASP API 2023 references correct
- [x] 15+ internal links identified (vulnerability articles)
- [x] 7 PAA questions included
- [x] Competitive gap is specific and actionable
- [x] 4 code examples drafted with vulnerable/secure patterns
- [x] AI fix prompt is comprehensive
- [x] Keywords with volumes documented
- [x] No placeholder text (TBD, TODO)

---

**Brief Status:** READY for Writer Agent
