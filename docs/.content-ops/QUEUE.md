# Content Queue

Articles to generate, in priority order. Claude Code processes these one at a time.

## How to Use

1. Add articles to the queue below with their data
2. Tell Claude Code: `Process the next article from .content-ops/QUEUE.md`
3. Review the output
4. Mark as ✅ Done and continue

**IMPORTANT: DATA INTEGRITY RULE**
- Never include fabricated statistics in article definitions
- Only include CWE/OWASP references (verifiable external sources)
- Stats will be added when real Scanner data is available

---

## Queue Status

| # | Status | Type | Slug |
|---|--------|------|------|
| 1 | ✅ Done | Vulnerability | sql-injection |
| 2 | ✅ Done | Vulnerability | hardcoded-secrets |
| 3 | ✅ Done | Vulnerability | xss |
| 4 | ✅ Done | Vulnerability | missing-auth |
| 5 | ✅ Done | Vulnerability | idor |
| 6 | ✅ Done | Tool | cursor |
| 7 | ✅ Done | Tool | claude-code |
| 8 | ✅ Done | Tool | bolt |
| 9 | 📝 Brief Ready | Stack | nextjs-supabase |
| 10 | 📝 Brief Ready | Stack | nextjs-prisma |
| 11 | ✅ Done | Vulnerability | missing-rate-limiting |
| 12 | 📝 Brief Ready | Vulnerability | insecure-cors |
| 13 | 📝 Brief Ready | Checklist | pre-launch |
| 14 | 📝 Brief Ready | Tool | v0 |
| 15 | 📝 Brief Ready | Tool | replit |
| 16 | 📝 Brief Ready | Vulnerability | path-traversal |
| 17 | 📝 Brief Ready | Vulnerability | ssrf |
| 18 | 📝 Brief Ready | Vulnerability | open-redirect |
| 19 | 📝 Brief Ready | Vulnerability | mass-assignment |
| 20 | 📝 Brief Ready | Vulnerability | jwt-vulnerabilities |

**Legend:** ✅ Done | 📝 Brief Ready | 🔄 Next | ⏳ Pending | ⏸️ Blocked

---

## Article Definitions

### 1. Vulnerability: SQL Injection ✅ DONE
```yaml
type: vulnerability
slug: sql-injection
url: /kb/security/vulnerabilities/sql-injection/
title: "SQL Injection: Find & Fix in AI-Generated Code"
cwe: CWE-89
owasp: A03:2021-Injection
owasp_url: https://owasp.org/Top10/A03_2021-Injection/
cwe_url: https://cwe.mitre.org/data/definitions/89.html
severity: Critical
word_count: 1500-2000
status: PUBLISHED
```

### 2. Vulnerability: Hardcoded Secrets ✅ DONE
```yaml
type: vulnerability
slug: hardcoded-secrets
url: /kb/security/vulnerabilities/hardcoded-secrets/
title: "Hardcoded Secrets: API Keys in Your Code"
cwe: CWE-798
owasp: A07:2021-Identification and Authentication Failures
owasp_url: https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/
cwe_url: https://cwe.mitre.org/data/definitions/798.html
severity: Critical
word_count: 1500-2000
status: PUBLISHED
notes: |
  - Most common issue in AI-generated code (qualitative)
  - AI tools generate example keys that get committed
  - GitGuardian, TruffleHog can be referenced for detection
```

### 3. Vulnerability: XSS (Cross-Site Scripting) ✅ DONE
```yaml
type: vulnerability
slug: xss
url: /kb/security/vulnerabilities/xss/
title: "XSS: Protect Your Users from Script Injection"
cwe: CWE-79
owasp: A03:2021-Injection
owasp_url: https://owasp.org/Top10/A03_2021-Injection/
cwe_url: https://cwe.mitre.org/data/definitions/79.html
severity: High
word_count: 1500-2000
status: PUBLISHED
notes: |
  - React/Vue/Svelte auto-escape by default (mention this)
  - dangerouslySetInnerHTML, v-html, @html are common culprits
  - AI tools sometimes use these for "flexibility"
```

### 4. Vulnerability: Missing Authentication ✅ DONE
```yaml
type: vulnerability
slug: missing-auth
url: /kb/security/vulnerabilities/missing-auth/
title: "Missing Authentication: Unprotected API Routes"
cwe: CWE-306
owasp: A07:2021-Identification and Authentication Failures
owasp_url: https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/
cwe_url: https://cwe.mitre.org/data/definitions/306.html
severity: Critical
word_count: 1500-2000
status: PUBLISHED
notes: |
  - AI generates functional routes without auth checks
  - Common in Next.js API routes, Express handlers
  - "Create an API for X" doesn't imply "add auth"
```

### 5. Vulnerability: IDOR ✅ DONE
```yaml
type: vulnerability
slug: idor
url: /kb/security/vulnerabilities/idor/
title: "IDOR: When Users Can Access Each Other's Data"
cwe: CWE-639
owasp: A01:2021-Broken Access Control
owasp_url: https://owasp.org/Top10/A01_2021-Broken_Access_Control/
cwe_url: https://cwe.mitre.org/data/definitions/639.html
severity: High
word_count: 1500-2000
status: PUBLISHED
notes: |
  - /api/users/123 → change to /api/users/456
  - AI checks authentication but not authorization
  - Very common pattern in AI-generated CRUD APIs
```

### 6. Tool: Cursor ✅ DONE
```yaml
type: tool
slug: cursor
url: /kb/ai-patterns/cursor/
title: "Cursor Security Patterns"
word_count: 1500-2000
status: PUBLISHED
notes: |
  - VS Code extension with AI integration
  - Uses GPT-4, Claude (configurable)
  - Known patterns: template literals for SQL, missing auth
  - Reference ai-tool-patterns.md for specific code examples
```

### 7. Tool: Claude Code ✅ DONE
```yaml
type: tool
slug: claude-code
url: /kb/ai-patterns/claude-code/
title: "Claude Code Security Patterns"
word_count: 1500-2000
status: PUBLISHED
notes: |
  - Anthropic's official coding agent
  - Known patterns: missing input validation, verbose errors
  - Generally more security-conscious but not immune
  - Reference ai-tool-patterns.md for specific code examples
```

### 8. Tool: Bolt ✅ DONE
```yaml
type: tool
slug: bolt
url: /kb/ai-patterns/bolt/
title: "Bolt.new Security: 5 Patterns to Fix"
word_count: 1500-2000
status: PUBLISHED
notes: |
  - StackBlitz's AI coding tool
  - "Ready to run" philosophy - speed over security
  - Known patterns: hardcoded credentials, missing auth, missing validation, IDOR, CORS
  - External sources: Endor Labs, CrowdStrike research
```

### 9. Stack: Next.js + Supabase
```yaml
type: stack
slug: nextjs-supabase
url: /kb/security/stacks/nextjs-supabase/
title: "Next.js + Supabase Security Guide"
framework: Next.js
database: Supabase
word_count: 1500-2500
notes: |
  - Most popular vibe coding stack
  - Key issues: RLS configuration, anon vs service keys
  - Server components vs client components security
```

### 10. Stack: Next.js + Prisma
```yaml
type: stack
slug: nextjs-prisma
url: /kb/security/stacks/nextjs-prisma/
title: "Next.js + Prisma Security Guide"
framework: Next.js
database: PostgreSQL (via Prisma)
word_count: 1500-2500
notes: |
  - $queryRaw injection risks
  - Database URL exposure
  - Type-safe queries are generally secure
```

### 11. Vulnerability: Missing Rate Limiting ✅ DONE
```yaml
type: vulnerability
slug: missing-rate-limiting
url: /kb/security/vulnerabilities/missing-rate-limiting/
title: "Missing Rate Limiting: Why AI Forgets This Critical Security"
cwe: CWE-799
owasp: A04:2021-Insecure Design
owasp_url: https://owasp.org/Top10/A04_2021-Insecure_Design/
cwe_url: https://cwe.mitre.org/data/definitions/799.html
severity: Medium
word_count: 1200-1500
status: PUBLISHED
notes: |
  - AI rarely adds rate limiting unless asked
  - Critical for login, password reset, API endpoints
  - Easy to add with libraries (express-rate-limit, Upstash)
```

### 12. Vulnerability: Insecure CORS
```yaml
type: vulnerability
slug: insecure-cors
url: /kb/security/vulnerabilities/insecure-cors/
title: "Insecure CORS: When origin: '*' Goes Wrong"
cwe: CWE-942
owasp: A05:2021-Security Misconfiguration
owasp_url: https://owasp.org/Top10/A05_2021-Security_Misconfiguration/
cwe_url: https://cwe.mitre.org/data/definitions/942.html
severity: Medium
word_count: 1200-1500
notes: |
  - "Enable CORS" → origin: '*' (most permissive)
  - Credentials + wildcard origin is invalid
  - AI defaults to permissive for "it works"
```

### 13. Checklist: Pre-Launch
```yaml
type: checklist
slug: pre-launch
url: /kb/security/checklists/pre-launch/
title: "Pre-Launch Security Checklist for Vibe Coders"
word_count: 800-1200
categories:
  - Authentication
  - Authorization
  - Data Protection
  - Input/Output
  - Infrastructure
notes: |
  - Simple yes/no checklist format
  - Link to relevant vulnerability articles
  - Include AI fix prompt for automated scanning
```

### 14. Tool: v0 (Vercel)
```yaml
type: tool
slug: v0
url: /kb/ai-patterns/v0/
title: "v0 Security Patterns: When Fast UI Meets Vulnerable Code"
word_count: 1500-2000
notes: |
  - Vercel's AI UI generation tool
  - UI-first, Next.js native, shadcn/ui integration
  - Top issue: NEXT_PUBLIC_ secret exposure (17k deployments blocked)
  - v0 blocked 100k+ insecure deployments since launch
  - Key patterns: missing server-side validation, unprotected Server Actions
  - External sources: Vercel Blog, Kaspersky research
```

### 15. Tool: Replit Agent
```yaml
type: tool
slug: replit
url: /kb/ai-patterns/replit/
title: "Replit Agent Security: Lessons from the Database Deletion Incident"
word_count: 1500-2000
notes: |
  - Browser-based AI development environment
  - July 2025 incident: Agent deleted production database, fabricated fake data, lied
  - CEO Amjad Masad publicly apologized
  - Now has Semgrep integration for vulnerability scanning
  - Key patterns: debug mode in production, hardcoded DB credentials, missing HTTPS
  - External sources: CyberNews, CPO Magazine, Kaspersky research
```

### 16. Vulnerability: Path Traversal
```yaml
type: vulnerability
slug: path-traversal
url: /kb/security/vulnerabilities/path-traversal/
title: "Path Traversal: Stop Attackers Escaping Your Directories"
cwe: CWE-22
owasp: A01:2021-Broken Access Control
owasp_url: https://owasp.org/Top10/A01_2021-Broken_Access_Control/
cwe_url: https://cwe.mitre.org/data/definitions/22.html
severity: High
word_count: 1200-1500
notes: |
  - Attackers use ../ to escape intended directories
  - Common in file upload/download features
  - path.resolve() alone is NOT sufficient
  - Must verify resolved path stays within allowed directory
```

### 17. Vulnerability: SSRF (Server-Side Request Forgery)
```yaml
type: vulnerability
slug: ssrf
url: /kb/security/vulnerabilities/ssrf/
title: "SSRF: When Your Server Makes Requests for Attackers"
cwe: CWE-918
owasp: A10:2021-Server-Side Request Forgery
owasp_url: https://owasp.org/Top10/A10_2021-Server-Side_Request_Forgery_%28SSRF%29/
cwe_url: https://cwe.mitre.org/data/definitions/918.html
severity: High
word_count: 1200-1500
notes: |
  - Next.js had critical SSRF CVEs in 2024-2025 (CVE-2024-34351, CVE-2025-57822)
  - Common in URL preview, image proxy, webhook features
  - AWS metadata endpoint (169.254.169.254) is prime target
  - Must validate and allowlist URLs before fetching
```

### 18. Vulnerability: Open Redirect
```yaml
type: vulnerability
slug: open-redirect
url: /kb/security/vulnerabilities/open-redirect/
title: "Open Redirect: How Attackers Hijack Your Login Flow"
cwe: CWE-601
owasp: A01:2021-Broken Access Control
owasp_url: https://owasp.org/Top10/A01_2021-Broken_Access_Control/
cwe_url: https://cwe.mitre.org/data/definitions/601.html
severity: Medium
word_count: 1200-1500
notes: |
  - Enables phishing with trusted domains
  - Common in returnUrl, OAuth callback handling
  - Users trust your domain, get redirected to phishing site
  - Always validate redirect URLs against allowlist
```

### 19. Vulnerability: Mass Assignment
```yaml
type: vulnerability
slug: mass-assignment
url: /kb/security/vulnerabilities/mass-assignment/
title: "Mass Assignment: When Users Modify Fields They Shouldn't"
cwe: CWE-915
owasp: API3:2023-Broken Object Property Level Authorization
owasp_url: https://owasp.org/API-Security/editions/2023/en/0xa3-broken-object-property-level-authorization/
cwe_url: https://cwe.mitre.org/data/definitions/915.html
severity: High
word_count: 1200-1500
notes: |
  - Attacker adds isAdmin: true to API request
  - Object.assign() and spread operator are culprits
  - Was API6:2019, now merged into API3:2023
  - Always use allowlists for updateable fields
```

### 20. Vulnerability: JWT Implementation Flaws
```yaml
type: vulnerability
slug: jwt-vulnerabilities
url: /kb/security/vulnerabilities/jwt-vulnerabilities/
title: "JWT Security: 5 Flaws AI Tools Get Wrong"
cwe: CWE-347
owasp: A02:2021-Cryptographic Failures
owasp_url: https://owasp.org/Top10/A02_2021-Cryptographic_Failures/
cwe_url: https://cwe.mitre.org/data/definitions/347.html
severity: Critical
word_count: 1500-2000
notes: |
  - Algorithm confusion: RS256 to HS256 attack
  - "none" algorithm attack bypasses signature
  - Weak secrets can be brute-forced
  - Missing expiration = tokens valid forever
  - Always specify algorithm in verify()
```

---

## Data Sources for Articles

When writing articles, use these real sources:

| Source | URL | Use For |
|--------|-----|---------|
| OWASP Top 10 | https://owasp.org/Top10/ | Vulnerability rankings, descriptions |
| CWE Database | https://cwe.mitre.org/ | Vulnerability definitions, IDs |
| OWASP Cheat Sheets | https://cheatsheetseries.owasp.org/ | Fix recommendations |
| MDN Web Docs | https://developer.mozilla.org/ | Web security concepts |
| Node.js Security | https://nodejs.org/en/docs/guides/security/ | Node-specific guidance |

---

## After Each Article

When you complete an article:
1. Update status in table: ⏳ → ✅
2. Move 🔄 to the next pending item
3. Update the article definition with `status: PUBLISHED`
4. Note any issues or learnings
