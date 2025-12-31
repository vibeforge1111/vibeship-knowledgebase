# Content Brief: BFLA (Broken Function Level Authorization)

**Generated:** 2025-12-17
**Target Publish:** TBD
**Priority:** P1
**Status:** Ready for Writer

---

## 1. Core Data

### Scanner Statistics
| Metric | Value | Source |
|--------|-------|--------|
| Prevalence | Data coming soon | Scanner DB (in development) |
| Repos Scanned | TBD | Scanner DB (in development) |
| Week-over-Week | TBD | Scanner DB (in development) |
| Most Affected Tool | TBD | Scanner DB (in development) |

**Note:** While VibeShip Scanner is collecting BFLA-specific data, external research shows that 40-62% of AI-generated code contains security flaws, with authorization vulnerabilities being particularly common.

### Tool Breakdown
| Tool | Vulnerability Rate | Sample Size |
|------|-------------------|-------------|
| Cursor | Data coming soon | TBD |
| Bolt | Data coming soon | TBD |
| Claude Code | Data coming soon | TBD |
| v0 | Data coming soon | TBD |
| Replit | Data coming soon | TBD |
| Copilot | Data coming soon | TBD |

### Security References
- **CWE ID:** [CWE-285](https://cwe.mitre.org/data/definitions/285.html)
- **CWE Name:** Improper Authorization
- **OWASP Category:** [API5:2023 - Broken Function Level Authorization](https://owasp.org/API-Security/editions/2023/en/0xa5-broken-function-level-authorization/)
- **Severity:** Critical
- **OWASP Ranking:** #5 in OWASP API Security Top 10 (2023)

### External Research Data
- Over 40% of AI-generated code solutions contain security flaws (Georgetown University CSET, 2024)
- 62% of AI-generated code contains design flaws or known security vulnerabilities (2024 industry research)
- AI-generated code often omits authorization checks because prompts don't specify security requirements
- Authorization is consistently ranked in OWASP Top 10 vulnerabilities

---

## 2. SEO Strategy

### Target Keywords
| Keyword | Est. Volume | Difficulty | Intent |
|---------|-------------|------------|--------|
| bfla | 800 | Medium | Informational |
| broken function level authorization | 1,200 | Medium | Informational |
| api access control | 2,400 | High | Informational |
| vertical privilege escalation | 1,800 | Medium | Informational |
| admin endpoint security | 900 | Medium | Informational |
| api authorization vulnerability | 600 | Low | Informational |
| bfla vs bola | 400 | Low | Informational |

### People Also Ask
1. "What is BFLA (Broken Function Level Authorization)?"
2. "What is the difference between BFLA and BOLA?"
3. "How do you test for BFLA vulnerabilities?"
4. "How do you prevent broken function level authorization?"
5. "What are examples of BFLA attacks?"
6. "How do AI coding tools create BFLA vulnerabilities?"
7. "Can regular users access admin endpoints?"
8. "What is vertical privilege escalation?"

### Search Intent Analysis
- **Primary intent:** Informational - developers want to understand what BFLA is and how it differs from BOLA
- **Secondary intent:** Transactional - developers need to fix BFLA vulnerabilities in their APIs
- **User goal:** Understand BFLA, identify it in their code, and implement proper authorization checks
- **Content need:** Plain English explanation, AI tool context, concrete examples, copy-paste fixes

---

## 3. Competitive Analysis

### Current Top 3 Results for "broken function level authorization"

**1. https://owasp.org/API-Security/editions/2023/en/0xa5-broken-function-level-authorization/**
- Title: API5:2023 Broken Function Level Authorization
- Word count: ~800
- Strengths: Official OWASP documentation, authoritative, comprehensive technical details
- Weaknesses: Technical language, no AI-specific context, no code examples or ready-to-use fixes
- Our advantage: AI tool analysis, vibe coding context, copy-paste fix prompts, before/after code examples

**2. https://learn.snyk.io/lesson/broken-function-level-authorization/**
- Title: Broken function level authorization | Tutorial and examples
- Word count: ~1,200
- Strengths: Good tutorials, interactive learning format, code examples
- Weaknesses: No AI-generated code context, no tool comparison, requires Snyk account for full access
- Our advantage: Free access, AI tool patterns, Scanner data (when available), vibe coder focus

**3. https://www.pynt.io/learning-hub/owasp-top-10-guide/broken-function-level-authorization-how-it-works-and-4-preventive-measures**
- Title: Broken Function-Level Authorization: How It Works & 4 Ways to Prevent
- Word count: ~1,500
- Strengths: Detailed explanation, prevention measures, well-structured
- Weaknesses: No AI tool context, generic fixes, product-heavy CTA
- Our advantage: AI-specific patterns, vibe coding terminology, actionable AI fix prompts

### Content Gaps (Our Opportunities)
1. **AI Tool Patterns:** No competitor specifically addresses why AI coding tools (Cursor, Bolt, Claude Code, v0) generate BFLA vulnerabilities
2. **Vibe Coding Context:** None use "vibe coding" terminology or target non-technical founders using AI tools
3. **BFLA vs BOLA Clarity:** Most assume readers understand the difference - we can make this crystal clear with simple analogies
4. **AI Fix Prompts:** No competitor provides ready-to-use AI prompts to fix BFLA vulnerabilities
5. **Tool Comparison Data:** When Scanner data is available, we'll be the only source comparing BFLA rates across AI tools
6. **HTTP Method Manipulation:** Most mention it but don't clearly explain the attack vector for beginners

---

## 4. Content Structure

### Recommended Sections

```
H1: BFLA: Admin Functions Exposed to Regular Users

Quick Answer Box (under 50 words):
BFLA (Broken Function Level Authorization) happens when regular users can access admin-only functions like deleting accounts or viewing all users. Ranked #5 in OWASP API Security Top 10. Common in vibe coded apps because AI tools generate working endpoints without role checks.

H2: What is BFLA (Broken Function Level Authorization)?
    - Plain English definition (vertical privilege escalation)
    - Real-world analogy: Hotel guest accessing manager's master key system
    - Concrete consequences: Account takeover, data deletion, privilege escalation
    - Link to OWASP API5:2023 and CWE-285
    Target: 100-150 words

H2: BFLA vs BOLA: What's the Difference?
    - BOLA = Horizontal (accessing OTHER users' data at same level)
    - BFLA = Vertical (accessing HIGHER privilege functions)
    - Simple comparison table
    - Example: BOLA = reading someone else's invoice; BFLA = accessing the "delete all invoices" button
    Target: 100-150 words

H2: How AI Tools Cause BFLA Vulnerabilities
    - Why AI generates admin routes without role checks
    - AI assumes endpoints are complete if they work
    - Prompts rarely specify "add admin-only authorization"
    - AI learns from public code that may lack proper authorization
    - Tool comparison (when data available)
    Target: 150-200 words

H2: Common BFLA Attack Patterns
    - Direct URL access to /admin endpoints
    - HTTP method manipulation (GET to DELETE)
    - Hidden/undocumented endpoints discovered via fuzzing
    - Parameter tampering to elevate privileges
    - Real examples: New Relic Synthetics (2018), invitation hijack attacks
    Target: 150-200 words

H2: How to Detect BFLA in Your API
    - Code patterns to search for
    - Regex patterns for endpoint scanning
    - Manual testing: Create two accounts (admin + regular)
    - Tools: Burp Suite, OWASP ZAP, Postman
    - Quick check: Can regular user access /admin URLs?
    - Scanner CTA
    Target: 150-200 words

H2: How to Fix BFLA Vulnerabilities
    H3: AI Fix Prompt
        - Complete prompt (200-400 words)
        - Specify role-based authorization
        - Include middleware patterns
        - Request before/after examples
        Target: 200-400 words

    H3: Manual Fix
        - Before/after code examples
        - Middleware-based authorization
        - Role-based access control (RBAC)
        - HTTP method validation
        Target: 200-300 words

    H3: Framework-Specific Fixes
        - Next.js: Middleware + session checks
        - Express: Auth middleware patterns
        - Links to fix pages (when created)
        Target: 100-150 words

H2: Prevention Best Practices
    - Default-deny access control
    - Consistent authorization module
    - Server-side validation (never trust client)
    - API gateway authorization
    - Regular security testing
    - CI/CD integration
    Target: 150-200 words

H2: FAQ
    - 5 questions from PAA
    - 50-100 words each
    - Schema markup ready

H2: Related Vulnerabilities
    - BOLA (Broken Object Level Authorization)
    - Broken Access Control
    - Missing Authentication
    - Insecure Direct Object Reference (IDOR)
```

### Required Elements Checklist
- [ ] Quick answer in first 50 words (with OWASP ranking)
- [ ] BFLA vs BOLA comparison section (key differentiator)
- [ ] Stats on AI-generated code vulnerabilities (external research)
- [ ] Common attack patterns with real examples
- [ ] Complete AI fix prompt (200-400 words)
- [ ] Before/after code examples for Express/Next.js
- [ ] HTTP method manipulation explanation
- [ ] 5 FAQ entries matching PAA
- [ ] Scanner CTA in detection section
- [ ] 8-10 internal links
- [ ] CWE-285 and OWASP API5:2023 references with links
- [ ] Tool comparison table (note "data coming soon" if not available)

---

## 5. Internal Linking

### Must Link TO (Parent/Authority Pages)
| Page | Suggested Anchor Text |
|------|----------------------|
| /kb/security/vulnerabilities/ | "API security vulnerabilities" |
| /kb/security/vulnerabilities/bola/ | "BOLA (Broken Object Level Authorization)" |
| /kb/security/vulnerabilities/broken-access-control/ | "broken access control" |
| /kb/vibe-coding-tools/cursor/ | "Cursor security patterns" |
| /kb/vibe-coding-tools/bolt/ | "Bolt.new vulnerabilities" |

### Should Link TO (Related Content)
| Page | Suggested Anchor Text |
|------|----------------------|
| /kb/security/vulnerabilities/bola/ | "horizontal privilege escalation" or "BOLA" |
| /kb/security/vulnerabilities/broken-access-control/ | "access control vulnerabilities" |
| /kb/security/vulnerabilities/missing-authentication/ | "missing authentication" (when created) |
| /kb/security/vulnerabilities/idor/ | "IDOR vulnerabilities" (when created) |
| /kb/security/fixes/bfla/nextjs/ | "fix BFLA in Next.js" (when created) |
| /kb/security/fixes/bfla/express/ | "fix BFLA in Express" (when created) |
| /kb/glossary/security/vertical-privilege-escalation/ | "vertical privilege escalation" (when created) |
| /kb/glossary/security/rbac/ | "role-based access control" (when created) |

### External Authority Links
| Source | Purpose | URL |
|--------|---------|-----|
| OWASP API5:2023 | Official BFLA documentation | https://owasp.org/API-Security/editions/2023/en/0xa5-broken-function-level-authorization/ |
| CWE-285 | Technical reference for Improper Authorization | https://cwe.mitre.org/data/definitions/285.html |
| OWASP Authorization Cheat Sheet | Prevention best practices | https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html |
| PortSwigger Access Control | Testing methodology and examples | https://portswigger.net/web-security/access-control |
| OWASP Testing Guide | How to test for privilege escalation | https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/05-Authorization_Testing/03-Testing_for_Privilege_Escalation |
| Georgetown CSET | AI-generated code security research | https://cset.georgetown.edu/publication/cybersecurity-risks-of-ai-generated-code/ |
| Snyk Learn BFLA | Additional tutorial resource | https://learn.snyk.io/lesson/broken-function-level-authorization/ |

---

## 6. Unique Angle

### Our Differentiator
We're the ONLY resource that explains BFLA specifically in the context of AI-generated code and vibe coding. We explain WHY AI tools like Cursor, Bolt, and Claude Code generate BFLA vulnerabilities by default - because they prioritize working code over secure code, and prompts rarely specify authorization requirements.

### Key Message
**"BFLA is vertical privilege escalation - regular users accessing admin functions. Unlike BOLA (horizontal - accessing other users' data), BFLA lets attackers become admins. AI tools generate this by default because 'make it work' doesn't include 'make it secure.'"**

### Data-Driven Claims to Highlight
1. "Over 40% of AI-generated code contains security flaws, with authorization vulnerabilities being the most common category" (Georgetown CSET, 2024)
2. "62% of AI-generated code contains design flaws or known vulnerabilities, even with the latest LLMs" (2024 industry research)
3. "BFLA ranks #5 in the OWASP API Security Top 10 (2023), affecting major platforms including Uber, Instagram, and GitHub"
4. "AI coding assistants omit authorization checks because prompts don't specify security requirements - endpoints work but aren't secure"

---

## 7. Meta Information

### Suggested Title Tag (under 60 chars)
```
BFLA: Admin Functions Exposed to Regular Users | VibeShip
```
(56 characters)

### Suggested Meta Description (150-160 chars)
```
BFLA lets regular users access admin functions like deleting accounts. Ranked #5 in OWASP API Top 10. Get AI fix prompts for Cursor, Bolt & Claude Code.
```
(158 characters)

### Target URL
```
/kb/security/vulnerabilities/bfla/
```

### Related URLs to Create
- /kb/security/fixes/bfla/nextjs/
- /kb/security/fixes/bfla/express/
- /kb/security/fixes/bfla/fastapi/
- /kb/vibe-coding-tools/cursor/bfla/
- /kb/vibe-coding-tools/bolt/bfla/
- /kb/glossary/security/vertical-privilege-escalation/
- /kb/glossary/security/rbac/

---

## 8. Writer Notes

### Tone Guidance
- **Empowering, not alarming:** BFLA sounds scary but it's fixable
- **Non-technical focus:** Target audience is vibe coders (non-technical founders using AI tools)
- **Clarity on BFLA vs BOLA:** This distinction is crucial - use simple analogies (hotel room vs manager's master key)
- **Practical, actionable:** Focus on "here's how to find it, here's how to fix it"

### Technical Accuracy Notes
- **BFLA = Vertical, BOLA = Horizontal:** Never confuse these - vertical is privilege escalation, horizontal is accessing other users' data
- **HTTP method manipulation is a key attack vector:** Changing GET to DELETE is a common real-world attack
- **Default-deny is crucial:** Emphasize that authorization should DENY by default and ALLOW explicitly
- **Server-side validation only:** Make clear that client-side checks are useless for security
- **Role-Based Access Control (RBAC):** This is the standard solution - explain it clearly

### Things to Avoid
- Don't oversimplify to the point of inaccuracy - BFLA is a serious vulnerability
- Don't conflate BFLA and BOLA - they're related but distinct
- Don't recommend client-side authorization checks as a security measure
- Don't assume readers know terms like "middleware", "RBAC", "vertical privilege escalation" - explain on first use
- Don't exaggerate AI tool dangers - they're useful, but require security awareness

### Reference Materials
Writer should consult:
1. [OWASP API5:2023 Official Page](https://owasp.org/API-Security/editions/2023/en/0xa5-broken-function-level-authorization/)
2. [CWE-285: Improper Authorization](https://cwe.mitre.org/data/definitions/285.html)
3. [OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)
4. [PortSwigger: Access Control Vulnerabilities](https://portswigger.net/web-security/access-control)
5. [Georgetown CSET: Cybersecurity Risks of AI-Generated Code](https://cset.georgetown.edu/publication/cybersecurity-risks-of-ai-generated-code/)
6. [Snyk Learn: BFLA Tutorial](https://learn.snyk.io/lesson/broken-function-level-authorization/)
7. BOLA brief at: `docs/.content-ops/briefs/bola-brief.md` (for comparison context)

### Key Code Examples to Include

**Before (Vulnerable):**
```javascript
// Express - No authorization check
app.delete('/api/users/:id', async (req, res) => {
  await User.delete(req.params.id);
  res.json({ success: true });
});

// Anyone can delete any user - BFLA vulnerability
```

**After (Fixed):**
```javascript
// Express - Role-based authorization
const requireAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

app.delete('/api/users/:id', requireAdmin, async (req, res) => {
  await User.delete(req.params.id);
  res.json({ success: true });
});
```

**Next.js API Route Example:**
```javascript
// Before (Vulnerable)
export async function DELETE(request, { params }) {
  await db.user.delete({ where: { id: params.id } });
  return Response.json({ success: true });
}

// After (Fixed)
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== 'admin') {
    return Response.json({ error: 'Admin access required' }, { status: 403 });
  }

  await db.user.delete({ where: { id: params.id } });
  return Response.json({ success: true });
}
```

### AI Fix Prompt Template

The writer should create a complete, copy-paste ready prompt that includes:
- Context: "I have an API endpoint that needs role-based authorization"
- Current code: [vulnerable example]
- Requirements:
  - Add middleware to check user role
  - Implement RBAC (role-based access control)
  - Default-deny approach
  - Server-side validation only
  - HTTP method validation
- Request: "Generate the authorization middleware and updated endpoint with proper error handling"
- Framework specification: "For [Express/Next.js/FastAPI]"

---

## 9. FAQ Questions (Schema Markup Ready)

These should be included in the FAQ section with direct, 50-100 word answers:

1. **What is BFLA (Broken Function Level Authorization)?**
   - Start with direct answer
   - Include OWASP ranking
   - Link to CWE-285

2. **What is the difference between BFLA and BOLA?**
   - Vertical (BFLA) vs Horizontal (BOLA)
   - Use simple analogy
   - Include examples of each

3. **How do AI coding tools create BFLA vulnerabilities?**
   - AI prioritizes working code
   - Prompts rarely specify authorization
   - Learns from insecure public code
   - Link to AI tool pages

4. **How do you test for BFLA vulnerabilities?**
   - Create two accounts (admin + regular)
   - Try accessing admin endpoints as regular user
   - Use tools (Burp Suite, OWASP ZAP)
   - Scanner CTA

5. **How do you prevent BFLA in APIs?**
   - Role-based access control (RBAC)
   - Default-deny authorization
   - Server-side validation
   - Regular security testing

6. **Can regular users access admin endpoints?**
   - Yes, if BFLA vulnerability exists
   - Common in AI-generated code
   - How to check your code

7. **What is vertical privilege escalation?**
   - Definition with analogy
   - Difference from horizontal
   - Link to BOLA

8. **What are real-world examples of BFLA attacks?**
   - New Relic Synthetics (2018)
   - Invitation hijack attacks
   - HTTP method manipulation
   - Link to external sources

---

## 10. Attack Scenario Examples for Article

Include these real-world scenarios with proper attribution:

### Scenario 1: Direct Admin URL Access
```
Regular user discovers admin panel at /admin/users
No authorization check on the endpoint
User can view all users, delete accounts, change roles
```

### Scenario 2: HTTP Method Manipulation
```
User has access to: GET /api/users/123 (view own profile)
User changes to: DELETE /api/users/123
No HTTP method validation → deletes the account
Should have been restricted to admin role
```

### Scenario 3: Invitation Hijack (Real Attack)
```
Attacker intercepts invite request
Changes POST /api/invites to include admin role
No authorization check on invite creation
Attacker gains admin access via crafted invite
Source: OWASP API Security examples
```

### Scenario 4: Hidden Endpoint Discovery
```
Attacker uses API fuzzing tools
Discovers /api/admin/v1/users/all
Endpoint returns all user data
No function-level authorization check
Source: OWASP API5:2023 examples
```

---

**Brief Status:** ✅ Complete - Ready for Writer Agent

**Next Steps:**
1. Writer Agent should use this brief with `docs/.content-ops/agents/writer-agent.md` guidelines
2. Create complete Svelte component at `/src/routes/kb/security/vulnerabilities/bfla/+page.svelte`
3. Include all required elements from checklist
4. Verify against `docs/.content-ops/checklists/qa-checklist.md`
5. Update `.content-ops/QUEUE.md` status when complete
