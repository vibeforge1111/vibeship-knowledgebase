# Content Brief: Cursor Rules - The Security-Focused Complete Guide

## Status

```yaml
status: READY
created_at: 2025-12-31T12:00:00Z
created_by: Research Agent (Terminal 1)
claimed_by: null
claimed_at: null
completed_at: null
```

---

## Article Metadata

```yaml
type: guide
slug: cursor-rules-security-guide
url: /kb/prompts/cursor-rules-security-guide/
title: "Cursor Rules for Secure AI Code: The Complete Guide"
meta_description: "Create Cursor rules that generate secure code. Copy-paste security templates with R.A.I.L.G.U.A.R.D patterns to prevent SQL injection, XSS, and auth bypasses."
```

---

## Context: Existing Cursor Rules Content

**IMPORTANT:** VibeShip already has several cursor rules articles. This new guide fills a specific gap:

| Existing Article | URL | Focus |
|------------------|-----|-------|
| Cursor Rules (Main) | /kb/prompts/cursor-rules/ | General guide, setup, stack examples |
| Cursor Rules Examples | /kb/prompts/cursor-rules-examples/ | 20+ templates by stack |
| How to Use Cursor Rules | /kb/prompts/how-to-use-cursor-rules/ | Beginner tutorial |
| Cursor Rules File | /kb/prompts/cursor-rules-file/ | File format deep-dive |

**THIS GUIDE'S UNIQUE ANGLE:** Security-first cursor rules using the R.A.I.L.G.U.A.R.D framework + specific vulnerability prevention patterns. This is the ONLY guide that:
1. Uses the Cloud Security Alliance's R.A.I.L.G.U.A.R.D framework
2. Maps rules to specific CVEs and OWASP categories
3. Addresses "cursor rule poisoning" attacks
4. Provides stack-specific security rules (not generic ones)

---

## Core Data

### Primary References
| Reference | ID | Link |
|-----------|-----|------|
| CSA R.A.I.L.G.U.A.R.D | Framework | https://cloudsecurityalliance.org/blog/2025/05/06/secure-vibe-coding-level-up-with-cursor-rules-and-the-r-a-i-l-g-u-a-r-d-framework |
| OWASP Top 10 | 2021 | https://owasp.org/Top10/ |
| CWE-89 | SQL Injection | https://cwe.mitre.org/data/definitions/89.html |
| CWE-79 | XSS | https://cwe.mitre.org/data/definitions/79.html |
| CWE-798 | Hardcoded Credentials | https://cwe.mitre.org/data/definitions/798.html |
| CWE-862 | Missing Authorization | https://cwe.mitre.org/data/definitions/862.html |

### External Sources (for outbound links)
| Source | URL | Key Finding | Tier |
|--------|-----|-------------|------|
| CSA R.A.I.L.G.U.A.R.D Framework | https://cloudsecurityalliance.org/blog/2025/05/06/secure-vibe-coding-level-up-with-cursor-rules-and-the-r-a-i-l-g-u-a-r-d-framework | Comprehensive security reasoning framework for AI rules | 1 |
| Cursor Security Rules GitHub | https://github.com/matank001/cursor-security-rules | 18 security-focused .mdc files covering SQL, SSRF, XXE, path traversal | 4 |
| Cursor Official Docs | https://cursor.com/docs/context/rules | Official rule format, activation modes, precedence | 7 |
| StackHawk Secure Cursor Guide | https://www.stackhawk.com/blog/secure-code-with-cursor/ | Best practices for code review of AI output | 2 |
| Backslash Cursor Security | https://www.backslash.security/blog/cursor-ide-security-best-practices | Privacy mode, context sanitization, audit requirements | 2 |
| Reco Cursor Security | https://www.reco.ai/learn/cursor-security | Prompt injection risks, rule file validation | 2 |
| awesome-cursorrules | https://github.com/PatrickJS/awesome-cursorrules | 36k+ stars, 150+ community rules (lacks security focus) | 4 |
| Trigger.dev Cursor Rules | https://trigger.dev/blog/cursor-rules | Token economy, rule structure best practices | 7 |

### Key Facts to Include
- **R.A.I.L.G.U.A.R.D**: "Robust AI-Instructional Layer Guiding Uniform Agent Reasoning & Development" - CSA framework for secure AI rules
- **Rule Poisoning Risk**: Malicious actors can inject hidden code using invisible Unicode characters (Zero Width Joiner, bidirectional text markers)
- **awesome-cursorrules**: 36,000+ stars, 150+ templates, but minimal security focus
- **Rule Precedence**: Team Rules → Project Rules → User Rules (higher levels override)
- **Token Economy**: Rules in "Always Apply" mode consume context in every conversation - brevity matters
- **Security Rules Repository**: matank001/cursor-security-rules provides 18 language-specific security rule files

---

## SEO Strategy

### Target Keywords
| Keyword | Search Intent | Priority | Notes |
|---------|---------------|----------|-------|
| cursor rules security | Informational | Primary | Gap: no existing guides focus on security |
| secure cursor rules | Informational | Primary | Users searching for security-specific rules |
| cursor rules best practices security | Informational | Secondary | Long-tail, high intent |
| .cursorrules security template | Informational/Transactional | Secondary | Copy-paste seekers |
| cursor ai security rules | Informational | Secondary | Tool + security combo |
| prevent sql injection cursor | Informational | Tertiary | Specific vulnerability + tool |
| cursor rules owasp | Informational | Tertiary | Security + compliance angle |

**Estimated Combined Volume:** 2,000-3,500/month (based on existing "cursor rules" volume of ~5,300 and security subset)

### People Also Ask (FAQs)
1. How do I make Cursor generate secure code?
2. Can cursor rules prevent SQL injection?
3. What security rules should I add to .cursorrules?
4. Are cursor rules safe from attacks?
5. How do I secure my cursor rules file?
6. What is cursor rule poisoning?
7. Should I review AI-generated code for security?

### Competitive Gap
**What competitors miss:**
- **Cursor Official Docs**: Basic format info, no security content
- **awesome-cursorrules**: Massive collection but security rules buried/absent
- **Medium articles**: General best practices, no vulnerability mapping
- **StackHawk/Backslash**: Focus on reviewing output, not preventing issues via rules

**Our opportunity:**
1. **R.A.I.L.G.U.A.R.D Implementation**: First guide to apply CSA framework to cursor rules
2. **Vulnerability-Mapped Rules**: Rules tied to specific CWEs (CWE-89, CWE-79, etc.)
3. **Rule Poisoning Awareness**: Address the security OF rules, not just FROM rules
4. **Stack-Specific Security**: Next.js + Supabase, React + Firebase, Python + FastAPI patterns
5. **Integration with VibeShip Scanner**: Connect rules to automated verification

---

## Content Outline

### Quick Answer (50 words max)
Cursor rules can generate secure code when designed with security-first patterns. Add explicit vulnerability prevention rules (SQL injection, XSS, auth checks), use the R.A.I.L.G.U.A.R.D framework for structured security reasoning, and validate rule files for poisoning attacks. This guide provides copy-paste security templates.

### Section 1: Why Default Cursor Rules Fail Security
- AI generates working code, not secure code
- Training data includes vulnerable patterns from Stack Overflow
- Without explicit rules, AI uses string concatenation, skips auth checks
- Real-world analogy: AI is a junior dev who needs security guardrails
- Word count: 150-200

### Section 2: The R.A.I.L.G.U.A.R.D Framework
- Full breakdown of 8 components (Risk First, Attached Constraints, etc.)
- How each component maps to cursor rule sections
- Template showing framework applied to .cursorrules
- Source: Cloud Security Alliance (cite directly)
- Word count: 300-400

### Section 3: Security Rules by Vulnerability Category
Subsections for each major vulnerability:

#### 3.1 SQL Injection Prevention (CWE-89)
- Rule template with parameterized query requirements
- Before/after code examples
- Framework-specific patterns (Prisma, raw SQL, Supabase)

#### 3.2 XSS Prevention (CWE-79)
- dangerouslySetInnerHTML rules
- Output encoding requirements
- React/Next.js specific sanitization

#### 3.3 Hardcoded Secrets (CWE-798)
- Environment variable enforcement
- Pattern detection rules
- .gitignore integration

#### 3.4 Missing Authentication (CWE-306)
- Middleware-first patterns
- Server Action auth checks
- Route protection rules

#### 3.5 Authorization Bypass (CWE-862)
- Ownership verification rules
- WHERE clause requirements
- Resource access patterns

Word count: 500-600 (this is the major section)

### Section 4: Protecting Your Cursor Rules from Attacks
- Rule poisoning explained (Unicode injection, hidden payloads)
- Validation techniques (text editors that show invisible chars)
- Code review requirements for rule changes
- Access control for team rules
- Word count: 200-250

### Section 5: Stack-Specific Security Rule Templates
- **Next.js + Supabase**: Server Actions, RLS, session validation
- **React + Firebase**: Auth state, Firestore rules, client-side safety
- **Python + FastAPI**: Pydantic validation, SQLAlchemy patterns
- Each template: 100-150 lines, copy-paste ready
- Word count: 300-400 (intro + template descriptions)

### Section 6: Integrating with VibeShip Scanner
- Rules reduce but don't eliminate vulnerabilities
- Automated scanning catches what rules miss
- Workflow: Rules → Code → Scan → Fix
- CTA to VibeShip Scanner
- Word count: 100-150

### FAQ Section
- Use PAA questions above
- Each answer: 50-100 words
- Include citable facts in each

### Related Content
- Links to vulnerability pages (SQL injection, XSS, etc.)
- Links to existing cursor rules guides
- Links to scanner and fixes

---

## Internal Links (10+ required)

| Anchor Text | URL | Context/Placement |
|-------------|-----|-------------------|
| SQL injection vulnerabilities | /kb/security/vulnerabilities/sql-injection/ | Section 3.1 |
| XSS attacks | /kb/security/vulnerabilities/xss/ | Section 3.2 |
| hardcoded secrets | /kb/security/vulnerabilities/hardcoded-secrets/ | Section 3.3 |
| missing authentication | /kb/security/vulnerabilities/missing-auth/ | Section 3.4 |
| IDOR vulnerabilities | /kb/security/vulnerabilities/idor/ | Section 3.5 |
| main cursor rules guide | /kb/prompts/cursor-rules/ | Intro, cross-reference |
| cursor rules examples | /kb/prompts/cursor-rules-examples/ | Section 5 |
| secure vibe coding guide | /kb/vibe-coding/secure-vibe-coding-guide/ | Section 6 |
| Next.js + Supabase security | /kb/security/stacks/nextjs-supabase/ | Section 5 |
| VibeShip Scanner | https://scanner.vibeship.co | Section 6, Final CTA |
| path traversal | /kb/security/vulnerabilities/path-traversal/ | Section 3 additional |
| SSRF prevention | /kb/security/vulnerabilities/ssrf/ | Section 3 additional |

---

## External Links (7+ required)

| Anchor Text | URL | Tier | Placement |
|-------------|-----|------|-----------|
| R.A.I.L.G.U.A.R.D framework from Cloud Security Alliance | https://cloudsecurityalliance.org/blog/2025/05/06/secure-vibe-coding-level-up-with-cursor-rules-and-the-r-a-i-l-g-u-a-r-d-framework | 1 | Section 2 |
| CWE-89: SQL Injection | https://cwe.mitre.org/data/definitions/89.html | 1 | Section 3.1 |
| CWE-79: Cross-Site Scripting | https://cwe.mitre.org/data/definitions/79.html | 1 | Section 3.2 |
| OWASP Top 10 | https://owasp.org/Top10/ | 1 | Intro, Section 3 |
| cursor-security-rules repository | https://github.com/matank001/cursor-security-rules | 4 | Section 3, Resources |
| Cursor official rules documentation | https://cursor.com/docs/context/rules | 7 | Section 1, Setup |
| awesome-cursorrules community collection | https://github.com/PatrickJS/awesome-cursorrules | 4 | Section 5, Resources |

---

## Code Examples Needed

### Pattern 1: R.A.I.L.G.U.A.R.D Framework Template
```markdown
# Security Rules (R.A.I.L.G.U.A.R.D Framework)

## R: Risk First
Security is the primary objective. Prioritize secure patterns over convenience.
Ask yourself before generating: "What could go wrong if this input is malicious?"

## A: Attached Constraints (NEVER do these)
- NEVER use string concatenation/template literals in SQL
- NEVER hardcode API keys, passwords, or secrets
- NEVER use eval(), exec(), or dynamic code execution
- NEVER trust client-side authentication state alone
- NEVER log sensitive data or include in error messages

## I: Interpretative Framing
When developer asks for "quick" or "simple" solutions, still apply security.
"Fast" does not mean "insecure."

## L: Local Defaults
- All secrets via environment variables: process.env.SECRET_NAME
- HTTPS for all external API calls
- Parameterized queries for all database operations
- Input validation with Zod/Pydantic before processing

## G: Generative Path Checks
Before generating code:
1. Is user input involved? → Validate first
2. Is database access involved? → Use parameterized queries
3. Is authentication required? → Check session/token
4. Is file system involved? → Validate paths, prevent traversal

## U: Uncertainty Disclosure
If unsure about security implications, add a comment:
// SECURITY REVIEW: [reason for uncertainty]

## A: Auditability
Add comments marking security-critical code:
// SECURITY: Input validated with [method]
// SECURITY: Auth checked via [mechanism]

## R+D: Revision + Dialogue
Suggest security improvements even if not explicitly asked.
```

### Pattern 2: SQL Injection Prevention Rules
```markdown
## Database Security (CWE-89 Prevention)

### Required Patterns
- ALWAYS use parameterized queries or ORM methods
- NEVER use template literals or string concatenation

### Examples

SECURE (Parameterized):
```javascript
const result = await db.query(
  'SELECT * FROM users WHERE id = $1 AND status = $2',
  [userId, 'active']
);
```

SECURE (ORM):
```javascript
const user = await prisma.user.findUnique({
  where: { id: userId, status: 'active' }
});
```

VULNERABLE (String concatenation):
```javascript
// NEVER DO THIS
const result = await db.query(
  `SELECT * FROM users WHERE id = ${userId}`
);
```

### Dynamic Table/Column Names
Use allowlists, never raw input:
```javascript
const ALLOWED_COLUMNS = ['name', 'email', 'created_at'];
if (!ALLOWED_COLUMNS.includes(sortColumn)) {
  throw new Error('Invalid sort column');
}
```
```

### Pattern 3: Authentication Middleware Rule
```markdown
## Authentication Rules (CWE-306 Prevention)

### Server Action Pattern (Next.js)
```typescript
'use server'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export async function protectedAction(formData: FormData) {
  // SECURITY: Auth check FIRST
  const session = await auth()
  if (!session?.user) {
    redirect('/login')
  }

  // Now process the action
  const userId = session.user.id
  // ... rest of action
}
```

### API Route Pattern
```typescript
export async function GET(request: Request) {
  // SECURITY: Auth check FIRST
  const session = await auth()
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Process request
}
```

### Anti-Pattern to Flag
```typescript
// VULNERABLE: No auth check
export async function deleteUser(userId: string) {
  await db.user.delete({ where: { id: userId } })
}
```
```

### Pattern 4: Rule Poisoning Detection
```markdown
## Validating Cursor Rules for Attacks

### Hidden Character Detection
Before using any cursor rules from external sources:

1. Open in an editor that reveals invisible characters
2. Look for: Zero Width Joiner (U+200D), Zero Width Space (U+200B),
   Bidirectional text markers (U+202A-U+202E)
3. Use this regex to detect suspicious patterns:
   /[\u200B-\u200F\u202A-\u202E\u2060-\u206F\uFEFF]/g

### Safe Rule Import Process
1. Copy rule text to plain text editor (not Word/rich text)
2. Run character detection script
3. Review in diff tool before adding to project
4. Require PR review for any rule changes
```

---

## Notes for Writer Agent

### Tone Guidance
- Security-focused but not fear-mongering
- Practical, not theoretical
- Copy-paste first, explanation second
- Assume reader has basic cursor rules knowledge (link to beginner guide)

### Technical Accuracy
- All CWE references must be verified against cwe.mitre.org
- Code examples must actually compile/run
- R.A.I.L.G.U.A.R.D components must match CSA source exactly
- Test that rule examples work in actual Cursor

### Things to Avoid
- Don't repeat content from existing cursor-rules guide (link instead)
- Don't include generic "best practices" - be specific to security
- Don't suggest rules are a complete solution (emphasize scanning too)
- Don't use fear language ("hackers will destroy you")

### Vibe Coding Terms
Use these 3-5 times naturally:
- vibe coding
- vibe coders
- vibe coded
- AI-generated code

### Differentiation from Existing Content
This guide is SPECIFICALLY about:
1. Security-focused rules (not general rules)
2. R.A.I.L.G.U.A.R.D framework application
3. Vulnerability-mapped patterns (CWE references)
4. Rule file security (poisoning attacks)

Cross-link to existing guides for:
- Basic setup and file locations
- General stack templates
- Beginner tutorials

---

## Checklist Before Marking READY

- [x] All external links verified working
- [x] CWE/OWASP references correct and linked
- [x] 10+ internal links identified
- [x] 7 PAA questions included
- [x] Competitive gap is specific and actionable
- [x] Code examples drafted with secure/vulnerable patterns
- [x] R.A.I.L.G.U.A.R.D framework components sourced from CSA
- [x] No placeholder text (TBD, TODO)
- [x] Differentiation from existing cursor-rules content clear

---

**Brief Status:** Ready for Writer Agent

---

## Additional Research Notes

### Unique Angles Discovered in Research

1. **Rule Poisoning is Underreported**: Only CSA and a few security blogs mention it. Major opportunity to be the definitive source.

2. **cursor-security-rules Repository**: 18 language-specific security rule files (Python, Node, Java, Go, Ruby, PHP, Rust, C, C#) - can reference for patterns.

3. **Token Economy**: Rules in "Always Apply" mode are loaded into EVERY conversation. This matters for security rules - they need to be concise but complete.

4. **Context Window Decay**: "As the context window moves, the AI forgets" - periodic reinforcement needed. Security rules should include reminder prompts.

5. **Team Rules Override**: On Team/Enterprise plans, security teams can enforce rules that individual users cannot override. This is compliance-relevant.

### Sources for Additional Depth

- StackHawk article on reviewing AI output: https://www.stackhawk.com/blog/secure-code-with-cursor/
- Backslash article on Cursor IDE security: https://www.backslash.security/blog/cursor-ide-security-best-practices
- MintMCP comprehensive security guide: https://www.mintmcp.com/blog/cursor-security
- ToTheNew developer checklist: https://www.tothenew.com/blog/the-developers-cursor-checklist-secure-and-smart-practices-for-using-cursor-ai/
