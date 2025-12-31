# Content Brief: Pre-Launch Security Checklist

## Status

```yaml
status: DONE
created_at: 2025-12-17T14:30:00Z
created_by: Research Agent (Terminal 1)
claimed_by: Writer Agent
claimed_at: 2025-12-17T14:45:00Z
completed_at: 2025-12-17T15:30:00Z
```

---

## Article Metadata

```yaml
type: checklist
slug: pre-launch
url: /kb/security/checklists/pre-launch/
title: "Pre-Launch Security Checklist for Vibe Coders"
meta_description: "15-minute security audit for AI-generated apps. Check authentication, secrets, injection, and more before you ship. Copy-paste AI fix prompts included."
word_count: 800-1200
```

---

## Core Data

### Primary References
| Reference | ID | Link |
|-----------|-----|------|
| OWASP ASVS | Application Security Verification Standard | https://owasp.org/www-project-application-security-verification-standard/ |
| OWASP Top 10 | 2021 | https://owasp.org/Top10/ |
| OWASP Cheat Sheets | Various | https://cheatsheetseries.owasp.org/ |

### External Sources (for outbound links)
| Source | URL | Key Finding | Tier |
|--------|-----|-------------|------|
| OWASP ASVS | https://owasp.org/www-project-application-security-verification-standard/ | Standardized security verification framework with 3 levels | 1 |
| OWASP Authentication Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html | Password requirements, MFA, secure error messages | 1 |
| OWASP Input Validation Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html | Server-side validation requirements | 1 |
| OWASP Session Management Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html | Cookie security, session handling | 1 |
| OWASP ASVS Index | https://cheatsheetseries.owasp.org/IndexASVS.html | Maps ASVS requirements to cheat sheets | 1 |

### Checklist Categories (from QUEUE.md)
1. **Authentication** - Login, password, sessions
2. **Authorization** - Access control, ownership checks
3. **Data Protection** - Secrets, encryption, exposure
4. **Input/Output** - Validation, injection, XSS
5. **Infrastructure** - CORS, rate limiting, headers

---

## SEO Strategy

### Target Keywords
| Keyword | Search Intent | Priority |
|---------|---------------|----------|
| security checklist before launch | transactional | Primary |
| web app security checklist | informational | Primary |
| vibe coding security checklist | informational | Primary |
| pre-launch security audit | informational | Secondary |
| MVP security checklist | informational | Secondary |

### People Also Ask (FAQs)
1. What security checks should I do before launching?
2. How do I secure my AI-generated app?
3. What are the minimum security requirements for a web app?
4. How long does a security audit take?
5. Can I automate security checks?

### Competitive Gap
**Top results analysis:**
- Enterprise checklists: Too comprehensive for MVPs
- OWASP ASVS: 300+ requirements, overwhelming for vibe coders
- Generic lists: Not specific to AI-generated code patterns

**Our unique angle:**
- Vibe coder focused: 15 essential checks, not 300
- AI-generated code specific: Targets what AI tools miss
- Links to detailed articles: Each item links to deep-dive vulnerability page
- Copy-paste AI prompts: Automate the checks with your AI tool
- Fast: 15-minute audit, not multi-day assessment

---

## Content Outline

### Quick Answer (50 words max)
Before launching your vibe coded app, check these 5 areas: authentication (login, passwords, sessions), authorization (who can access what), data protection (no hardcoded secrets), input/output (SQL injection, XSS), and infrastructure (CORS, rate limiting). This 15-minute checklist catches what AI tools miss.

### Section 1: Why This Checklist Exists
- AI tools generate working code, not secure code
- OWASP ASVS has 300+ requirements - too much for MVP launch
- This checklist covers the critical 15 items AI commonly misses
- 15-minute security audit before you ship
- Word count: 75-100

### Section 2: How to Use This Checklist
- Go through each category
- For each item: Yes (secure), No (needs fix), N/A (not applicable)
- Use the AI fix prompts to automatically scan and fix
- Link to detailed article for each vulnerability
- Word count: 75-100

---

## Checklist Items by Category

### Category 1: Authentication (4 items)

| # | Check | AI Common Miss | Link |
|---|-------|----------------|------|
| 1 | **Login endpoints require authentication** - API routes that should be protected are protected | AI creates functional routes without auth middleware | /kb/security/vulnerabilities/missing-auth/ |
| 2 | **Passwords are hashed with bcrypt/Argon2** - Not stored in plain text, not using MD5/SHA1 | AI sometimes uses weak hashing or stores plain text | /kb/security/vulnerabilities/hardcoded-secrets/ |
| 3 | **Sessions use httpOnly, secure cookies** - Session tokens not accessible via JavaScript | AI often uses localStorage or insecure cookies | External: OWASP Session Cheat Sheet |
| 4 | **Rate limiting on login endpoints** - Brute force attacks are prevented | AI never adds rate limiting unless asked | /kb/security/vulnerabilities/missing-rate-limiting/ |

### Category 2: Authorization (3 items)

| # | Check | AI Common Miss | Link |
|---|-------|----------------|------|
| 5 | **Users can only access their own data** - Changing IDs in URLs doesn't expose other users' data | AI checks if logged in, but not if authorized for THIS resource | /kb/security/vulnerabilities/idor/ |
| 6 | **Admin routes are protected** - Admin-only functionality requires admin role check | AI creates admin features without role verification | /kb/security/vulnerabilities/missing-auth/ |
| 7 | **Database queries include ownership checks** - RLS enabled (Supabase) or WHERE user_id added (SQL) | AI fetches by ID without verifying ownership | /kb/security/stacks/nextjs-supabase/ |

### Category 3: Data Protection (3 items)

| # | Check | AI Common Miss | Link |
|---|-------|----------------|------|
| 8 | **No hardcoded secrets in code** - API keys, database URLs in environment variables | AI generates example keys that get committed | /kb/security/vulnerabilities/hardcoded-secrets/ |
| 9 | **.env files are gitignored** - Secrets not committed to version control | AI sometimes puts secrets in committed files | /kb/security/vulnerabilities/hardcoded-secrets/ |
| 10 | **Service keys not exposed to client** - NEXT_PUBLIC_ not used for secrets, service_role key server-only | AI confuses client and server contexts | /kb/security/stacks/nextjs-supabase/ |

### Category 4: Input/Output (3 items)

| # | Check | AI Common Miss | Link |
|---|-------|----------------|------|
| 11 | **Database queries use parameterized statements** - No template literals with user input in SQL | AI uses template literals because they're readable | /kb/security/vulnerabilities/sql-injection/ |
| 12 | **User input is validated server-side** - Not just client-side validation | AI validates in frontend, forgets backend | /kb/security/vulnerabilities/sql-injection/ |
| 13 | **No dangerouslySetInnerHTML with user content** - XSS vectors are sanitized | AI uses innerHTML for flexibility | /kb/security/vulnerabilities/xss/ |

### Category 5: Infrastructure (2 items)

| # | Check | AI Common Miss | Link |
|---|-------|----------------|------|
| 14 | **CORS is configured with specific origins** - Not origin: '*' with credentials | AI uses wildcard to "fix" CORS errors | /kb/security/vulnerabilities/insecure-cors/ |
| 15 | **Rate limiting on API endpoints** - Protection against DoS and abuse | AI never adds rate limiting | /kb/security/vulnerabilities/missing-rate-limiting/ |

---

## AI Fix Prompt (for scanning existing code)

The Writer Agent should create a comprehensive AI fix prompt that covers all 15 items. Structure:

```
## Authentication Checks
- Search for API routes without auth middleware
- Search for password storage patterns
- Check cookie configuration
- Verify rate limiting on /auth/* routes

## Authorization Checks
- Search for database queries by ID without ownership check
- Find admin routes and verify role checks
- Check Supabase RLS is enabled / SQL has user_id WHERE clauses

## Data Protection Checks
- Search for hardcoded API keys, secrets, tokens
- Check .gitignore includes .env*
- Verify NEXT_PUBLIC_ not used for secrets

## Input/Output Checks
- Search for template literals in SQL queries
- Find server endpoints without input validation
- Search for dangerouslySetInnerHTML, v-html, @html

## Infrastructure Checks
- Check CORS configuration for origin: '*'
- Verify rate limiting middleware exists
```

---

## Internal Links (All vulnerability articles)

| Anchor Text | URL | Context |
|-------------|-----|---------|
| SQL injection | /kb/security/vulnerabilities/sql-injection/ | Input validation item |
| hardcoded secrets | /kb/security/vulnerabilities/hardcoded-secrets/ | Data protection items |
| XSS | /kb/security/vulnerabilities/xss/ | Input/output item |
| missing authentication | /kb/security/vulnerabilities/missing-auth/ | Auth items |
| IDOR | /kb/security/vulnerabilities/idor/ | Authorization item |
| missing rate limiting | /kb/security/vulnerabilities/missing-rate-limiting/ | Auth + infra items |
| insecure CORS | /kb/security/vulnerabilities/insecure-cors/ | Infrastructure item |
| Next.js + Supabase security | /kb/security/stacks/nextjs-supabase/ | RLS, key management |
| Next.js + Prisma security | /kb/security/stacks/nextjs-prisma/ | Query security |
| Cursor patterns | /kb/vibe-coding-tools/cursor/ | AI context |
| Bolt patterns | /kb/vibe-coding-tools/bolt/ | AI context |
| Claude Code patterns | /kb/vibe-coding-tools/claude-code/ | AI context |

---

## External Links (5-8 required)

| Anchor Text | URL | Tier | Placement |
|-------------|-----|------|-----------|
| OWASP ASVS | https://owasp.org/www-project-application-security-verification-standard/ | 1 | Intro |
| OWASP Top 10 | https://owasp.org/Top10/ | 1 | Intro |
| OWASP Authentication Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html | 1 | Auth section |
| OWASP Session Management Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html | 1 | Session item |
| OWASP Input Validation Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html | 1 | Input section |

---

## Content Format Notes

### Checklist Format
- Use checkboxes for each item: `- [ ]` in markdown
- Group by category with clear headers
- Each item should be scannable (one line description)
- Include "Quick Fix" hint for each item

### Visual Design Suggestions
- Severity indicators (Critical, High, Medium)
- Progress indicator (X of 15 complete)
- Expandable sections for AI fix prompts
- Print-friendly version option

### Example Item Format
```markdown
### 1. Login endpoints require authentication
**Severity:** Critical
**AI Pattern:** Creates functional routes without auth middleware

**Quick Check:**
- [ ] All `/api/*` routes that need protection have auth middleware
- [ ] `getServerSession()` or equivalent called before sensitive operations

**AI Fix Prompt:**
"Search for all API routes in `/app/api/` and `/pages/api/`. For each route, verify there's an authentication check at the start. Flag any routes that handle sensitive operations without checking `session` or `auth`."

**Learn more:** [Missing Authentication →](/kb/security/vulnerabilities/missing-auth/)
```

---

## Notes for Writer Agent

### Tone Guidance
- This is a QUICK checklist - keep it scannable
- Don't overwhelm - 15 items is the limit
- Each item links to detailed article for those who want more
- Emphasize the 15-minute time investment
- Make it feel achievable, not scary

### Technical Accuracy
- Items are prioritized by what AI tools commonly miss
- All items map to specific OWASP Top 10 or ASVS requirements
- Each item should have clear pass/fail criteria
- AI fix prompts should be copy-paste ready

### Things to Avoid
- Don't make the checklist too comprehensive (this isn't ASVS)
- Don't require security expertise to use
- Don't make items vague ("ensure security")
- Don't forget the AI fix prompts - they're key differentiator

### Vibe Coding Terms
Use these 3-5 times naturally:
- vibe coding
- vibe coders
- vibe coded
- AI-generated code

---

## Checklist Summary

| Category | Items | Severity |
|----------|-------|----------|
| Authentication | 4 | 2 Critical, 2 High |
| Authorization | 3 | 2 Critical, 1 High |
| Data Protection | 3 | 3 Critical |
| Input/Output | 3 | 2 Critical, 1 High |
| Infrastructure | 2 | 1 High, 1 Medium |
| **Total** | **15** | |

---

## Checklist Before Marking READY

- [x] All external links verified working
- [x] OWASP references included
- [x] All 12 internal KB links included (all vulnerability + stack + tool articles)
- [x] 5 PAA questions included
- [x] Competitive gap is specific
- [x] 15 checklist items defined with categories
- [x] AI fix prompt structure defined
- [x] No placeholder text

---

**Brief Status:** READY for Writer Agent
