# Content Brief: Broken Access Control

## Status

```yaml
status: READY
created_at: 2025-12-17T21:00:00Z
created_by: Research Agent
claimed_by: null
claimed_at: null
completed_at: null
```

---

## Article Metadata

```yaml
type: vulnerability
slug: broken-access-control
url: /kb/security/vulnerabilities/broken-access-control/
title: "Broken Access Control: The #1 Web Vulnerability AI Tools Get Wrong"
meta_description: "Broken Access Control is OWASP's #1 vulnerability. AI tools generate code that checks authentication but forgets authorization. Learn patterns and fixes for Node.js, Python, and React."
cwe: CWE-284
cwe_children: CWE-639, CWE-862, CWE-863, CWE-306
owasp: A01:2021-Broken Access Control
owasp_url: https://owasp.org/Top10/A01_2021-Broken_Access_Control/
cwe_url: https://cwe.mitre.org/data/definitions/284.html
severity: Critical
word_count: 1600-2000
```

---

## Executive Summary

Broken Access Control moved from #5 to #1 in OWASP Top 10 2021. It encompasses failures where users can act outside their intended permissions - accessing other users' data, performing admin actions, or bypassing authentication entirely. AI tools commonly generate code that checks "are you logged in?" but forget "are you allowed to do THIS?" This article shows vibe coders how to identify and fix access control issues in AI-generated code.

---

## Core Data

### Security References
- **CWE ID:** CWE-284 (Improper Access Control) - Pillar weakness
- **Child CWEs:** CWE-639 (IDOR), CWE-862 (Missing Authorization), CWE-863 (Incorrect Authorization), CWE-306 (Missing Authentication)
- **OWASP Category:** A01:2021 - Broken Access Control (moved from #5 to #1)
- **OWASP Prevalence:** 94% of applications tested had some form of broken access control
- **CVSS Range:** 4.0-9.8 depending on impact

### Key Statistics

| Statistic | Value | Source |
|-----------|-------|--------|
| OWASP Ranking | #1 (2021) | OWASP Top 10 |
| Applications Affected | 94% | OWASP Testing Data |
| Average Incidence Rate | 3.81% | OWASP CWE Mapping |
| CWE Occurrences Mapped | 318,000+ | OWASP Analysis |
| AI Code Vulnerability Rate | 40-48% | Multiple 2024-2025 Studies |

### Common CWEs Under Broken Access Control

| CWE | Name | AI Pattern |
|-----|------|------------|
| CWE-200 | Exposure of Sensitive Information | API returns full objects |
| CWE-201 | Insertion of Sensitive Information | Verbose error messages |
| CWE-352 | CSRF | Missing token validation |
| CWE-306 | Missing Authentication | Unprotected API routes |
| CWE-639 | Authorization Bypass via User-Controlled Key | IDOR - changing IDs in URLs |
| CWE-862 | Missing Authorization | Auth check but no authz check |
| CWE-863 | Incorrect Authorization | Flawed permission logic |

---

## Why AI Tools Fail at Access Control

### The Authentication vs Authorization Gap

AI tools understand **authentication** (who are you?) but struggle with **authorization** (what can you do?).

**Common AI Pattern:**
```javascript
// AI generates this - checks authentication only
app.get('/api/users/:id', requireAuth, async (req, res) => {
  const user = await db.users.findById(req.params.id) // Any authenticated user can access ANY user
  res.json(user)
})
```

**What's missing:**
```javascript
// AI rarely generates this - authorization check
app.get('/api/users/:id', requireAuth, async (req, res) => {
  if (req.user.id !== req.params.id && !req.user.isAdmin) {
    return res.status(403).json({ error: 'Forbidden' })
  }
  const user = await db.users.findById(req.params.id)
  res.json(user)
})
```

### Why This Happens

1. **Training data bias:** Most tutorials show authentication, not authorization
2. **Prompt ambiguity:** "Create a user API" doesn't specify access rules
3. **Functional focus:** AI optimizes for "does it work?" not "is it secure?"
4. **Context limitations:** AI can't infer business logic from code structure

---

## Attack Vectors

### 1. Vertical Privilege Escalation
Non-admin user performs admin actions.

```javascript
// VULNERABLE: No role check
app.delete('/api/users/:id', requireAuth, async (req, res) => {
  await db.users.delete(req.params.id) // Any user can delete anyone
})
```

### 2. Horizontal Privilege Escalation (IDOR)
User A accesses User B's data.

```javascript
// VULNERABLE: No ownership check
app.get('/api/orders/:id', requireAuth, async (req, res) => {
  const order = await db.orders.findById(req.params.id)
  res.json(order) // Can view anyone's order by changing ID
})
```

### 3. Missing Function-Level Access Control
Sensitive operations unprotected.

```javascript
// VULNERABLE: Route exists but no protection
app.post('/api/admin/reset-database', async (req, res) => {
  await db.reset() // No auth check at all!
})
```

### 4. Insecure Direct Object References
Predictable identifiers expose data.

```
GET /api/invoices/INV-0001  // Attacker enumerates
GET /api/invoices/INV-0002
GET /api/invoices/INV-0003
```

### 5. Metadata Manipulation
Hidden fields or JWT claims tampered.

```javascript
// VULNERABLE: Trusting client-sent role
const { userId, role } = req.body
if (role === 'admin') { // Attacker sends role: 'admin'
  // Grant admin access
}
```

---

## SEO Strategy

### Target Keywords

| Keyword | Search Intent | Priority |
|---------|---------------|----------|
| broken access control | informational | Primary |
| OWASP broken access control | informational | Primary |
| access control vulnerability | informational | Secondary |
| authorization vulnerability | informational | Secondary |
| privilege escalation web | informational | Tertiary |
| IDOR vulnerability | informational | Tertiary |

### People Also Ask (FAQs)

1. What is broken access control?
2. Why is broken access control OWASP #1?
3. What's the difference between authentication and authorization?
4. How do I prevent IDOR vulnerabilities?
5. How do AI tools cause access control issues?

### Competitive Gap

**Top results analysis:**
- OWASP: Comprehensive but enterprise-focused, heavy jargon
- PortSwigger: Technical deep-dives for pentesters
- Snyk: Package-focused, less on architectural patterns
- HackTricks: Attack-focused, less on prevention

**Our unique angle:**
- AI tool context: Why Cursor/Claude Code/Bolt generate vulnerable patterns
- Vibe coder audience: Plain English, copy-paste fixes
- Modern stacks: Next.js, Express, Supabase RLS examples
- The authentication vs authorization gap explanation
- AI fix prompt for automated review

---

## Content Outline

### Quick Answer (50 words max)
Broken Access Control happens when users can access data or perform actions beyond their permissions. It's OWASP's #1 vulnerability because AI tools generate code that checks "are you logged in?" but forget "are you allowed to do this?" Always verify both authentication AND authorization.

### Section 1: What is Broken Access Control? (150-200 words)
- Plain English: The bouncer lets you in, but doesn't check your VIP pass
- Authentication = proving who you are
- Authorization = proving what you can do
- #1 OWASP vulnerability (moved up from #5 in 2017)
- 94% of applications have some form of this vulnerability
- Examples: viewing other users' data, admin actions without admin role

### Section 2: Why AI Tools Get This Wrong (150-200 words)
- AI understands authentication (requireAuth middleware)
- AI doesn't understand your business rules
- Training data shows auth patterns, not authz patterns
- "Create an API" doesn't specify who can access what
- The authentication != authorization confusion
- Code comparison: what AI generates vs what you need

### Section 3: Common Attack Patterns (200-250 words)

**Vertical Escalation:**
- Regular user → Admin actions
- Example: Deleting other users

**Horizontal Escalation (IDOR):**
- User A → User B's data
- Example: Changing order ID in URL

**Function-Level Bypass:**
- Hidden admin routes without protection
- Example: /api/admin/* endpoints

**Metadata Manipulation:**
- Tampered JWT claims
- Hidden form fields with role info

### Section 4: Code Patterns to Find (200-250 words)

**Node.js/Express:**
```javascript
// VULNERABLE: Check for these patterns
app.get('/api/resource/:id', requireAuth, handler) // No ownership check after requireAuth
req.params.id // Used directly without authorization
findById(req.params.id) // No filter by req.user
```

**Next.js:**
```javascript
// VULNERABLE: Server Action without authorization
export async function deleteUser(userId: string) {
  await db.users.delete({ where: { id: userId }}) // No check who's calling
}
```

**Python/FastAPI:**
```python
# VULNERABLE: No ownership verification
@app.get("/orders/{order_id}")
async def get_order(order_id: int, current_user: User = Depends(get_current_user)):
    return await Order.get(order_id)  # Returns any order
```

### Section 5: How to Fix (300-400 words)

**Principle 1: Deny by Default**
- Explicitly allow, never assume neutrality
- Every route should deny unless authorized

**Principle 2: Check on Every Request**
- Don't cache authorization decisions
- Use middleware for centralized checks

**Principle 3: Verify Ownership**
```javascript
// SECURE: Always filter by user
const order = await db.orders.findFirst({
  where: {
    id: req.params.id,
    userId: req.user.id // Ownership check
  }
})
if (!order) return res.status(404).json({ error: 'Not found' })
```

**Principle 4: Use Framework Features**
- Supabase RLS policies
- Next.js middleware
- Express authorization middleware

**AI Fix Prompt:**
```
Review my codebase for Broken Access Control vulnerabilities (OWASP A01:2021):

## Check 1: Authentication vs Authorization
For every protected route, verify:
- Is authentication required? (who are you?)
- Is authorization checked? (what can you do?)
- Flag routes with auth middleware but no authorization logic

## Check 2: Direct Object References
Search for patterns like:
- findById(req.params.id) without ownership filter
- Database queries using user-supplied IDs directly
- Recommend adding: where: { userId: req.user.id }

## Check 3: Role-Based Access
For admin routes, verify:
- Role check exists (req.user.role === 'admin')
- Role is from server-side session, not client input
- Flag any role checks using req.body or req.query

## Check 4: Supabase/Database RLS
If using Supabase:
- Are RLS policies enabled on all tables?
- Do policies filter by auth.uid()?
- Flag tables with RLS disabled

For each issue found:
- Show the vulnerable code
- Explain the attack scenario
- Provide secure replacement
```

### Section 6: Framework-Specific Guidance (150-200 words)

**Next.js:**
- Use middleware.ts for route protection
- Server Actions need authorization too
- getServerSession() for auth state

**Express:**
- Authorization middleware pattern
- Avoid putting role in JWT payload alone
- Use database lookup for permissions

**Supabase:**
- Enable RLS on every table
- auth.uid() in policies
- Service role bypasses RLS - never expose

### Section 7: FAQ (5 questions, 50-100 words each)
- Use PAA questions above
- Direct answers first
- Include citable facts

### Section 8: Related Content
- Link to IDOR article
- Link to Missing Auth article
- Link to CSRF article
- Link to Supabase stack guide

---

## Internal Links (8-10 required)

| Anchor Text | URL | Context/Placement |
|-------------|-----|-------------------|
| IDOR | /kb/security/vulnerabilities/idor/ | Attack patterns section |
| missing authentication | /kb/security/vulnerabilities/missing-auth/ | Related vulnerabilities |
| CSRF | /kb/security/vulnerabilities/csrf/ | Access control bypass |
| SQL injection | /kb/security/vulnerabilities/sql-injection/ | Related injection |
| Next.js + Supabase security | /kb/security/stacks/nextjs-supabase/ | Framework guidance |
| SvelteKit + Supabase security | /kb/security/stacks/sveltekit-supabase/ | Framework guidance |
| Cursor security patterns | /kb/vibe-coding-tools/cursor/ | AI tool context |
| Claude Code security patterns | /kb/vibe-coding-tools/claude-code/ | AI tool context |
| sensitive data exposure | /kb/security/vulnerabilities/sensitive-data-exposure/ | Related |

---

## External Links (10-12 required)

| Anchor Text | URL | Tier | Placement |
|-------------|-----|------|-----------|
| OWASP A01:2021 Broken Access Control | https://owasp.org/Top10/A01_2021-Broken_Access_Control/ | 1 | Intro |
| CWE-284: Improper Access Control | https://cwe.mitre.org/data/definitions/284.html | 1 | Intro |
| OWASP Authorization Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html | 1 | Fix section |
| CWE-639: Authorization Bypass | https://cwe.mitre.org/data/definitions/639.html | 1 | IDOR section |
| CWE-862: Missing Authorization | https://cwe.mitre.org/data/definitions/862.html | 1 | Patterns section |
| PortSwigger Access Control | https://portswigger.net/web-security/access-control | 2 | Attack vectors |
| Supabase Row Level Security | https://supabase.com/docs/guides/auth/row-level-security | 6 | Framework section |
| Next.js Middleware | https://nextjs.org/docs/app/building-your-application/routing/middleware | 6 | Framework section |
| Veracode AI Code Security | https://www.veracode.com/blog/ai-generated-code-security-risks/ | 4 | AI section |
| Endor Labs AI Vulnerabilities | https://www.endorlabs.com/learn/the-most-common-security-vulnerabilities-in-ai-generated-code | 4 | AI section |

---

## Notes for Writer Agent

### Tone Guidance
- **Critical importance:** This is OWASP #1 - emphasize severity
- **Practical focus:** Vibe coders need concrete patterns to search for
- **Empowering:** Show them exactly what to add to their code
- **Clear distinction:** Authentication vs authorization is key concept

### Technical Accuracy
- CWE-284 is a pillar weakness (abstract) - use child CWEs for specific issues
- IDOR (CWE-639) is a SUBSET of broken access control
- 94% statistic is from OWASP testing data
- Supabase RLS is excellent but must be enabled manually
- JWTs alone don't solve authorization - still need checks

### Things to Avoid
- Don't conflate authentication and authorization
- Don't suggest JWTs solve access control (they don't)
- Don't forget server-side validation (client checks are bypassable)
- Don't overcomplicate - show simple patterns first

### Vibe Coding Terms
Use these 3-5 times naturally:
- vibe coding / vibe coders
- AI-generated code
- AI tools / AI assistants

### Value Maximizers
- Authentication vs Authorization explanation (key insight)
- Code patterns to grep for (actionable)
- Framework-specific examples (Next.js, Express, Supabase)
- Complete AI fix prompt
- Connection to existing IDOR and Missing Auth articles

---

## Checklist Before Marking READY

- [x] All external links verified working
- [x] CWE/OWASP references correct (A01:2021, CWE-284)
- [x] 9 internal links identified
- [x] 5 PAA questions included
- [x] Competitive gap is specific
- [x] Code examples drafted (4 patterns + fixes)
- [x] No placeholder text
- [x] Both authentication vs authorization explained
- [x] Framework-specific guidance included

---

**Brief Status:** READY for Writer Agent
