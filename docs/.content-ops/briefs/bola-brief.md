# Content Brief: BOLA (Broken Object Level Authorization)

**Generated:** 2025-12-17
**Target Publish:** TBD
**Priority:** P0
**Status:** Ready for Writer

---

## 1. Core Data

### Scanner Statistics
| Metric | Value | Source |
|--------|-------|--------|
| Prevalence | Data coming soon | Scanner DB (planned) |
| Repos Scanned | TBD | Scanner DB (planned) |
| Week-over-Week | TBD | Scanner DB (planned) |
| Most Affected Tool | TBD | Scanner DB (planned) |

**Note:** VibeShip Scanner is actively collecting data on BOLA in AI-generated API code. Until our data is available, we use established external sources with proper attribution.

### Tool Breakdown
| Tool | Pattern Description | Likelihood |
|------|---------------------|------------|
| Cursor | Generates RESTful CRUD APIs with authentication but without object-level authorization | Very High |
| Bolt | Creates functional API endpoints prioritizing speed over security | Very High |
| Claude Code | More security-conscious but still generates APIs without ownership checks | High |
| v0 | UI-focused, but Server Actions often lack object authorization | High |
| Replit | Complete apps with auth but missing granular authorization | High |
| Copilot | Academic research shows authorization checks frequently omitted | Very High |

### Security References
- **CWE ID:** CWE-639
- **CWE Name:** Authorization Bypass Through User-Controlled Key
- **CWE URL:** https://cwe.mitre.org/data/definitions/639.html
- **OWASP Category:** API1:2023 - Broken Object Level Authorization
- **OWASP URL:** https://owasp.org/API-Security/editions/2023/en/0xa1-broken-object-level-authorization/
- **OWASP Rank:** #1 in API Security Top 10 (2019 and 2023)
- **Severity:** Critical
- **CVSS Range:** 7.5-9.1 (High to Critical)

### Industry Data (External Sources)
- **Prevalence:** ~40% of all API attacks involve BOLA vulnerabilities ([Salt Security](https://salt.security/blog/api1-2023-broken-object-level-authentication))
- **OWASP Ranking:** #1 API Security Risk (both 2019 and 2023 editions)
- **Detection Difficulty:** Easy to exploit, hard to detect with automated tools

---

## 2. SEO Strategy

### Target Keywords
| Keyword | Est. Volume | Difficulty | Intent |
|---------|-------------|------------|--------|
| bola api | 500 | 35 | Informational |
| broken object level authorization | 1,200 | 38 | Informational |
| bola vulnerability | 300 | 32 | Informational |
| api security bola | 200 | 30 | Informational |
| what is bola security | 150 | 28 | Informational |
| bola vs idor | 100 | 25 | Informational |

### People Also Ask
1. "What is BOLA in API security?"
2. "What is the difference between BOLA and IDOR?"
3. "How do you prevent BOLA vulnerabilities?"
4. "Is BOLA the same as broken access control?"
5. "What is broken object level authorization OWASP?"

### Search Intent Analysis
- **Primary intent:** Informational - developers trying to understand BOLA in context of APIs
- **User goal:** Learn what BOLA is, how it differs from IDOR, and how to fix it in REST/GraphQL APIs
- **Content need:** Clear explanation of API-specific authorization issues, real examples, practical fixes

---

## 3. Competitive Analysis

### Current Top 3 Results for "broken object level authorization"

**1. https://owasp.org/API-Security/editions/2023/en/0xa1-broken-object-level-authorization/**
- Title: "API1:2023 Broken Object Level Authorization - OWASP"
- Word count: ~1,200
- Strengths: Official OWASP source, technical depth, example scenarios
- Weaknesses: Too technical for beginners, no AI tool angle, no copy-paste fixes
- Our advantage: Vibe coding focus, AI-generated code patterns, ready-to-use prompts

**2. https://www.imperva.com/learn/application-security/broken-object-level-authorization-bola/**
- Title: "What is Broken Object Level Authorization (BOLA) | Imperva"
- Word count: ~800
- Strengths: Clear definition, real-world examples (Uber 2019)
- Weaknesses: Enterprise security product focus, no code examples, no AI angle
- Our advantage: Practical code examples, AI tool comparison, founder-friendly language

**3. https://escape.tech/blog/understanding-broken-object-level-authorization/**
- Title: "Broken Object Level Authorization (BOLA) Vulnerability"
- Word count: ~1,500
- Strengths: Technical depth, GraphQL examples, prevention strategies
- Weaknesses: No AI tool patterns, enterprise focus, missing practical prompts
- Our advantage: AI-generated code focus, tool-by-tool breakdown, copy-paste fixes

### Content Gaps (Our Opportunities)
1. **AI Tool Patterns:** No competitor shows WHY AI tools generate BOLA vulnerabilities or which tools are most affected
2. **BOLA vs IDOR:** Most conflate the terms - we can clearly explain the API-specific context
3. **GraphQL BOLA:** Competitors mention it but don't show concrete patterns (batching attacks, nested queries)
4. **AI Fix Prompts:** No competitor provides ready-to-use prompts for AI tools to fix BOLA
5. **Real Breaches:** We can reference Uber 2019, Russia Central Bank 2016 with better context

---

## 4. Content Structure

### Recommended Sections

```
H1: BOLA: The API Vulnerability That Exposed Millions

Quick Answer Box (under 50 words):
BOLA (Broken Object Level Authorization) happens when APIs let users access
other users' data by changing IDs in requests. Ranked #1 in OWASP API Security
Top 10. Found in ~40% of API attacks.

H2: What is BOLA?
    - Plain English definition
    - API-specific context (vs web apps)
    - Real-world analogy (hotel room keys)
    - How it differs from IDOR (terminology context)
    Target: 100-150 words

H2: BOLA vs IDOR: What's the Difference?
    - IDOR = general term (any direct object reference issue)
    - BOLA = API-specific terminology (OWASP API Security)
    - Same vulnerability class, different contexts
    - When to use each term
    Target: 100-150 words

H2: Real-World BOLA Breaches
    - Uber 2019: Account takeover via userId enumeration
    - Russia Central Bank 2016: 2 billion rubles stolen via Fast Payments API
    - Key insight: These happened at scale because of APIs
    Target: 100-150 words

H2: Why AI Tools Generate BOLA
    - AI focuses on functionality: "create user API" → CRUD endpoints
    - Authentication != Authorization (common AI confusion)
    - Table: Tool comparison with patterns
    Target: 150-200 words

H2: How BOLA Works (Attack Patterns)
    H3: REST API Pattern
        - GET /api/users/123 → change to /api/users/124
        - PUT /api/orders/456 with different user's ID
    H3: GraphQL Pattern
        - Query with user IDs in variables
        - Batching/aliasing to enumerate IDs
        - Nested queries exposing related objects
    H3: UUID "Protection" Myth
        - UUIDs reduce guessing but don't fix authorization
        - UUIDs leak via logs, emails, browser history
    Target: 200-250 words

H2: What Could Happen
    - Horizontal privilege escalation (access other users' data)
    - Data exfiltration at scale via enumeration
    - Account takeover if sensitive data exposed
    - Financial fraud (Russia Central Bank example)
    Target: 75-100 words

H2: How to Detect BOLA
    - Manual testing: Two-account test
    - Code patterns to search:
      * API routes without ownership checks
      * Direct database queries using request parameters
      * GraphQL resolvers without authorization
    - Regex patterns for common frameworks
    - Scanner CTA
    Target: 100-150 words

H2: How to Fix BOLA
    H3: AI Fix Prompt
        - Complete prompt (200-400 words) covering:
          * Check object ownership before returning
          * Never trust IDs from client
          * Use session/JWT user ID to filter
          * Apply to ALL object operations
    H3: Manual Fix with Code Examples
        - Before/after for REST API
        - Before/after for GraphQL resolver
        - Before/after for Next.js Server Action
        Target: 200-250 words
    H3: Framework-Specific Patterns
        - Next.js: getServerSession() + ownership check
        - Express: req.user.id compared to resource.userId
        - GraphQL: context.user.id in resolver
        - Supabase: RLS policies (mention but link to stack guide)
        Target: 100-150 words

H2: Testing for BOLA
    - Two-account methodology
    - Burp Suite parameter manipulation
    - Automated tools (Postman, OWASP ZAP)
    Target: 75-100 words

H2: FAQ
    - 5 questions from PAA
    - 50-100 words each

H2: Related Resources
    - IDOR article (broader context)
    - Broken Access Control (parent vulnerability)
    - Missing Authentication (different issue)
    - Next.js + Supabase stack guide
    - API security checklist
```

### Required Elements Checklist
- [x] Quick answer in first 50 words with OWASP ranking
- [x] BOLA vs IDOR distinction explained clearly
- [x] Real breach examples (Uber, Russia Central Bank)
- [x] REST and GraphQL attack patterns
- [x] Tool comparison table
- [x] Complete AI fix prompt (200-400 words)
- [x] Before/after code examples for REST, GraphQL, Next.js
- [x] 5 FAQ entries matching PAA
- [x] Scanner CTA
- [x] 5-10 internal links
- [x] CWE/OWASP references with links

---

## 5. Internal Linking

### Must Link TO (Parent/Authority Pages)
| Page | Suggested Anchor Text |
|------|----------------------|
| /kb/security/vulnerabilities/ | "API security vulnerabilities" |
| /kb/security/vulnerabilities/idor/ | "IDOR (Insecure Direct Object Reference)" |
| /kb/security/vulnerabilities/broken-access-control/ | "Broken Access Control" |
| /kb/security/vulnerabilities/missing-auth/ | "Missing Authentication" |

### Should Link TO (Related Content)
| Page | Suggested Anchor Text |
|------|----------------------|
| /kb/security/vulnerabilities/mass-assignment/ | "Mass Assignment" (API3:2023) |
| /kb/security/stacks/nextjs-supabase/ | "Next.js + Supabase security guide" |
| /kb/vibe-coding-tools/cursor/ | "Cursor security patterns" |
| /kb/vibe-coding-tools/bolt/ | "Bolt.new security" |
| /kb/vibe-coding-tools/github-copilot/ | "GitHub Copilot vulnerabilities" |
| /kb/security/checklists/pre-launch/ | "pre-launch security checklist" |

### External Authority Links
| Source | Purpose | URL |
|--------|---------|-----|
| OWASP API Security | Official BOLA definition | https://owasp.org/API-Security/editions/2023/en/0xa1-broken-object-level-authorization/ |
| CWE-639 | Technical reference | https://cwe.mitre.org/data/definitions/639.html |
| OWASP API Testing | Testing methodology | https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/12-API_Testing/02-API_Broken_Object_Level_Authorization |
| PortSwigger IDOR | Technical deep-dive | https://portswigger.net/web-security/access-control/idor |
| Salt Security | BOLA statistics | https://salt.security/blog/api1-2023-broken-object-level-authentication |

---

## 6. Unique Angle

### Our Differentiator
**We're the only resource that explains BOLA through the lens of AI-generated code.** Competitors cover BOLA generically. We show:
1. Which AI tools generate BOLA vulnerabilities and why
2. Specific code patterns each tool produces
3. Ready-to-use AI prompts that generate secure authorization checks
4. The distinction between BOLA (API-specific) and IDOR (general term)

### Key Message
**BOLA is the #1 API security risk because AI tools understand authentication but not authorization.** They generate working CRUD endpoints that authenticate users but never check if User A should access User B's data. This is not a tool failure - it's a gap between "make it work" and "make it secure."

### Data-Driven Claims to Highlight
1. "BOLA is #1 in OWASP API Security Top 10 (both 2019 and 2023)"
2. "~40% of API attacks involve BOLA vulnerabilities (Salt Security)"
3. "Uber 2019 breach: BOLA vulnerability allowed account takeover via userId enumeration"
4. "Russia Central Bank 2016: Attackers changed account IDs to steal 2 billion rubles"
5. "AI tools generate authentication (user is logged in) but not authorization (user owns this resource)"

---

## 7. Meta Information

### Suggested Title Tag (under 60 chars)
```
BOLA: The API Vulnerability That Exposed Millions | VibeShip
```
(57 characters)

### Suggested Meta Description (150-160 chars)
```
BOLA lets users access other users' data by changing API IDs. Ranked #1 OWASP API Security risk. Learn to fix it in AI-generated REST and GraphQL APIs.
```
(159 characters)

### Target URL
```
/kb/security/vulnerabilities/bola/
```

### Related URLs to Create
- /kb/security/fixes/bola/nextjs/
- /kb/security/fixes/bola/express/
- /kb/security/fixes/bola/graphql/
- /kb/vibe-coding-tools/cursor/bola/

---

## 8. Writer Notes

### Tone Guidance
**Clarity over fear.** BOLA sounds complex but the concept is simple: checking if User A owns Resource X before letting them access it. Use the hotel room analogy early. This is about authorization logic that AI tools skip by default.

### Technical Accuracy Notes
- **BOLA ≠ IDOR in context:** BOLA is API-specific terminology from OWASP API Security Top 10. IDOR is the older, more general term from OWASP Web Top 10. Same vulnerability class, different naming conventions. Explain this clearly to avoid confusion.
- **UUIDs are NOT a fix:** Emphasize that UUIDs only make guessing harder but don't prevent exploitation if IDs leak through other means (logs, emails, error messages, GraphQL introspection)
- **Authentication ≠ Authorization:** This is THE key insight AI tools miss. User is logged in (authentication) but API doesn't check if user owns the resource (authorization)
- **GraphQL batching:** Modern attack pattern - attackers send 100 queries in one request to enumerate IDs faster
- **Supabase RLS:** Mention as a solution but link to the stack guide - don't duplicate that content here

### Things to Avoid
- Don't say "just use UUIDs" - this is cargo cult security
- Don't conflate BOLA and IDOR without explaining the API vs web context
- Don't make this sound like an AI tool failure - it's a prompting/workflow gap
- Don't skip GraphQL examples - many vibe coders use GraphQL (Hasura, Apollo, etc.)
- Don't recommend client-side authorization checks (easily bypassed)

### Reference Materials
**Must Read Before Writing:**
1. [OWASP API1:2023 - BOLA](https://owasp.org/API-Security/editions/2023/en/0xa1-broken-object-level-authorization/) - Official definition
2. [CWE-639](https://cwe.mitre.org/data/definitions/639.html) - Authorization Bypass Through User-Controlled Key
3. [PortSwigger IDOR](https://portswigger.net/web-security/access-control/idor) - Attack patterns
4. [OWASP API Testing Guide](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/12-API_Testing/02-API_Broken_Object_Level_Authorization) - Testing methodology
5. [Shoutrange BOLA vs IDOR](https://shoutrange.com/insights/bola-vs-idor-what-is-the-difference) - Terminology distinction
6. [Medium: Deep Dive on BOLA](https://inonst.medium.com/a-deep-dive-on-the-most-critical-api-vulnerability-bola-1342224ec3f2) - Technical depth

**Real Breach References:**
- Uber 2019 BOLA vulnerability (HackerOne reports - search public disclosures)
- Russia Central Bank 2016 Fast Payments System breach (2 billion rubles stolen)

**Key Distinction to Emphasize:**
Our existing IDOR article covers the general concept. This BOLA article should focus on:
- API-specific context (REST, GraphQL, Server Actions)
- Why OWASP created a separate API Top 10 category
- Modern attack patterns (batching, enumeration at scale)
- API authorization middleware patterns

---

## 9. Code Examples to Include

### REST API - Express.js
```javascript
// ❌ VULNERABLE (BOLA)
app.get('/api/orders/:id', authenticateUser, async (req, res) => {
  const order = await db.query('SELECT * FROM orders WHERE id = $1', [req.params.id])
  res.json(order)
})

// ✅ SECURE (Authorization Check)
app.get('/api/orders/:id', authenticateUser, async (req, res) => {
  const order = await db.query(
    'SELECT * FROM orders WHERE id = $1 AND user_id = $2',
    [req.params.id, req.user.id]
  )
  if (!order) return res.status(404).json({ error: 'Order not found' })
  res.json(order)
})
```

### Next.js Server Action
```typescript
// ❌ VULNERABLE (BOLA)
export async function getOrder(orderId: string) {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Unauthorized')

  return await prisma.order.findUnique({ where: { id: orderId } })
}

// ✅ SECURE (Authorization Check)
export async function getOrder(orderId: string) {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Unauthorized')

  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      userId: session.user.id // Check ownership
    }
  })

  if (!order) throw new Error('Order not found')
  return order
}
```

### GraphQL Resolver
```typescript
// ❌ VULNERABLE (BOLA)
const resolvers = {
  Query: {
    order: async (_, { id }, context) => {
      if (!context.user) throw new Error('Unauthorized')
      return await Order.findById(id)
    }
  }
}

// ✅ SECURE (Authorization Check)
const resolvers = {
  Query: {
    order: async (_, { id }, context) => {
      if (!context.user) throw new Error('Unauthorized')

      const order = await Order.findOne({
        _id: id,
        userId: context.user.id // Check ownership
      })

      if (!order) throw new Error('Order not found')
      return order
    }
  }
}
```

---

## 10. AI Fix Prompt (200-400 words)

**Include this complete prompt in the article:**

```
Review all API endpoints, GraphQL resolvers, and Server Actions in this codebase for BOLA (Broken Object Level Authorization) vulnerabilities. For each endpoint that returns or modifies user-specific resources:

1. IDENTIFY: Find all routes/resolvers that accept object IDs as parameters (user IDs, order IDs, document IDs, etc.)

2. CHECK AUTHORIZATION: Verify that the code checks if the authenticated user has permission to access that specific object. This means:
   - Compare the resource's owner ID to the authenticated user's ID
   - Apply this check BEFORE querying the database when possible
   - Return 404 (not 403) when authorization fails to avoid leaking resource existence

3. PATTERN TO FIX:
   - DON'T: db.query('SELECT * FROM orders WHERE id = $1', [params.id])
   - DO: db.query('SELECT * FROM orders WHERE id = $1 AND user_id = $2', [params.id, user.id])

4. APPLY TO ALL OPERATIONS:
   - GET/Read: Check ownership before returning
   - PUT/PATCH/Update: Check ownership before modifying
   - DELETE: Check ownership before deleting
   - POST/Create: Assign authenticated user as owner

5. FRAMEWORK-SPECIFIC PATTERNS:
   - Next.js: Use getServerSession() or auth() to get user.id, filter Prisma queries
   - Express: Use req.user.id from auth middleware, add to WHERE clause
   - GraphQL: Use context.user.id in resolver, filter by userId
   - Supabase: Rely on RLS policies for table-level enforcement

6. DON'T RELY ON:
   - Client-side checks (easily bypassed)
   - UUIDs instead of authorization (IDs leak via logs, emails, errors)
   - Frontend hiding elements (security must be server-side)

7. TEST: For each fixed endpoint, verify:
   - User A cannot access User B's resources by changing IDs
   - Proper 404 response when resource doesn't exist or user lacks access
   - Error messages don't leak information about whether resource exists

Generate secure code with authorization checks on ALL object operations. Add comments explaining the ownership verification for future developers.
```

---

**Brief Status:** ✅ Complete - Ready for Writer Agent

---

## Sources

Research conducted using:
- [OWASP API Security Top 10 2023](https://owasp.org/API-Security/editions/2023/en/0xa1-broken-object-level-authorization/)
- [CWE-639: Authorization Bypass Through User-Controlled Key](https://cwe.mitre.org/data/definitions/639.html)
- [Shoutrange: BOLA vs IDOR - What is the Difference](https://shoutrange.com/insights/bola-vs-idor-what-is-the-difference)
- [Aptori: API Security Essentials - BOLA, IDOR, SSRF](https://www.aptori.com/blog/api-security-essentials-mitigating-bola-idor-and-ssrf-vulnerabilities)
- [Medium: Deep Dive on BOLA](https://inonst.medium.com/a-deep-dive-on-the-most-critical-api-vulnerability-bola-1342224ec3f2)
- [Salt Security: API1:2023 BOLA](https://salt.security/blog/api1-2023-broken-object-level-authentication)
- [Imperva: What is BOLA](https://www.imperva.com/learn/application-security/broken-object-level-authorization-bola/)
- [Escape.tech: Understanding BOLA](https://escape.tech/blog/understanding-broken-object-level-authorization/)
