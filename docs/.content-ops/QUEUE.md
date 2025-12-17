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
| 9 | ✅ Done | Stack | nextjs-supabase |
| 10 | ✅ Done | Stack | nextjs-prisma |
| 11 | ✅ Done | Vulnerability | missing-rate-limiting |
| 12 | ✅ Done | Vulnerability | insecure-cors |
| 13 | ✅ Done | Checklist | pre-launch |
| 14 | ✅ Done | Tool | v0 |
| 15 | ✅ Done | Tool | replit |
| 16 | ✅ Done | Vulnerability | path-traversal |
| 17 | ✅ Done | Vulnerability | ssrf |
| 18 | ✅ Done | Vulnerability | open-redirect |
| 19 | ✅ Done | Vulnerability | mass-assignment |
| 20 | ✅ Done | Vulnerability | jwt-vulnerabilities |
| 21 | ✅ Done | Tool | github-copilot |
| 22 | ✅ Done | Vulnerability | csrf |
| 23 | ✅ Done | Tool | windsurf |
| 24 | ✅ Done | Vulnerability | sensitive-data-exposure |
| 25 | ✅ Done | Vulnerability | command-injection |
| 26 | ✅ Done | Stack | sveltekit-supabase |
| 27 | ✅ Done | Vulnerability | insecure-deserialization |
| 28 | ✅ Done | Guide (PILLAR) | secure-vibe-coding-guide |
| 29 | ✅ Done | Concept (Agent Security) | mcp-server-security |
| 30 | ✅ Done | Vulnerability | broken-access-control |
| 31 | ✅ Done | Vulnerability | insecure-file-upload |
| 32 | ✅ Done | Tool | lovable |
| 33 | ✅ Done | Vulnerability | xxe |
| 34 | ✅ Done | Vulnerability | ssti |
| 35 | ✅ Done | Vulnerability | race-conditions |
| | | **--- NEW: Ahrefs-Driven Quick Wins ---** | |
| 36 | ✅ Done | Hub (P0) | best-vibe-coding-tools |
| 37 | ✅ Done | Comparison (P0) | claude-code-vs-cursor |
| 38 | ✅ Done | Comparison (P0) | windsurf-vs-cursor |
| 39 | ✅ Done | Vulnerability (P1) | prompt-injection |
| 40 | ✅ Done | Pillar (P1) | what-is-vibe-coding |
| 41 | ✅ Done | Comparison (P0) | cursor-vs-copilot |
| 42 | ✅ Done | Comparison (P0) | cline-vs-cursor |
| 43 | ✅ Done | Comparison (P0) | replit-vs-cursor |
| 44 | ✅ Done | Comparison (P1) | lovable-vs-bolt |
| | | **--- NEW: Prompts Series ---** | |
| 45 | 📝 Brief Ready | Prompts (P0) | cursor-rules |
| 46 | 📝 Brief Ready | Prompts (P0) | claude-md |
| | | **--- Additional Vulnerabilities ---** | |
| 47 | 📝 Brief Ready | Vulnerability (P0) | nosql-injection |
| | | **--- Prompts Series Expansion (40 articles) ---** | |
| | | *Batch 1: Tool Configuration Guides* | |
| 48 | 📝 Brief Ready | Prompts (P0) | cursor-rules-examples |
| 49 | 📝 Brief Ready | Prompts (P0) | how-to-use-cursor-rules |
| 50 | 📝 Brief Ready | Prompts (P1) | windsurf-rules |
| 51 | 📝 Brief Ready | Prompts (P1) | cline-rules |
| 52 | 📝 Brief Ready | Prompts (P1) | copilot-instructions |
| 53 | 📝 Brief Ready | Prompts (P1) | cursor-rules-file |
| 54 | 📝 Brief Ready | Prompts (P1) | awesome-cursor-rules |
| 55 | 📝 Brief Ready | Prompts (P1) | cursor-system-prompt |
| 56 | 📝 Brief Ready | Prompts (P2) | v0-prompts |
| 57 | 📝 Brief Ready | Prompts (P2) | bolt-prompts |
| 58 | 📝 Brief Ready | Prompts (P1) | replit-prompts |
| 59 | 📝 Brief Ready | Prompts (P1) | agents-md |
| | | *Batch 2: Prompt Libraries* | |
| 60 | 📝 Brief Ready | Prompts (P1) | ai-prompt-library |
| 61 | 📝 Brief Ready | Prompts (P1) | prompt-templates |
| 62 | 📝 Brief Ready | Prompts (P0) | ai-coding-prompts |
| 63 | 📝 Brief Ready | Prompts (P1) | chatgpt-prompt-examples |
| 64 | 📝 Brief Ready | Prompts (P1) | custom-instructions |
| 65 | 📝 Brief Ready | Prompts (P1) | system-prompts |
| 66 | 📝 Brief Ready | Prompts (P1) | prompt-cheat-sheet |
| 67 | 📝 Brief Ready | Prompts (P1) | claude-system-prompts |
| | | *Batch 3: Use Case Guides* | |
| 68 | 📝 Brief Ready | Prompts (P0) | security-prompts |
| 69 | 📝 Brief Ready | Prompts (P0) | debugging-prompts |
| 70 | 📝 Brief Ready | Prompts (P1) | refactoring-prompts |
| 71 | 📝 Brief Ready | Prompts (P1) | code-review-prompts |
| 72 | 📝 Brief Ready | Prompts (P1) | testing-prompts |
| 73 | 📝 Brief Ready | Prompts (P1) | documentation-prompts |
| 74 | 📝 Brief Ready | Prompts (P1) | ai-prompts-founders |
| 75 | 📝 Brief Ready | Prompts (P0) PILLAR | prompt-engineering-code |
| | | *Batch 4: Comparisons* | |
| 76 | 📝 Brief Ready | Prompts (P1) | cursor-vs-windsurf-rules |
| 77 | 📝 Brief Ready | Prompts (P1) | cursor-vs-claude-code-config |
| 78 | 📝 Brief Ready | Prompts (P0) | best-ai-coding-tools-2025 |
| 79 | 📝 Brief Ready | Prompts (P1) | cline-vs-cursor-config |
| 80 | 📝 Brief Ready | Prompts (P1) | copilot-vs-cursor-config |
| 81 | 📝 Brief Ready | Prompts (P1) | ai-tool-config-matrix |
| | | *Batch 5: Framework/Language Specific* | |
| 82 | 📝 Brief Ready | Prompts (P0) | cursor-rules-nextjs |
| 83 | 📝 Brief Ready | Prompts (P1) | cursor-rules-react |
| 84 | 📝 Brief Ready | Prompts (P1) | cursor-rules-typescript |
| 85 | 📝 Brief Ready | Prompts (P1) | ai-python-coding |
| 86 | 📝 Brief Ready | Prompts (P0) | supabase-cursor-rules |
| 87 | 📝 Brief Ready | Prompts (P0) PILLAR | cursor-rules-fullstack |

**Legend:** ✅ Done | 📝 Brief Ready | 🔄 Next | ⏳ Pending | ⏸️ Blocked

---

## Ahrefs Keyword Research (December 2025)

### Quick Win Opportunities (Low Difficulty, High Volume)
Based on Ahrefs keyword research conducted 2025-12-17:

| Priority | Keyword | Volume | Difficulty | Article |
|----------|---------|--------|------------|---------|
| P0 | vibe coding tools | 2,300 | 20 | best-vibe-coding-tools |
| P0 | best vibe coding tools | 1,100 | 7 | best-vibe-coding-tools |
| P0 | claude code vs cursor | 3,000 | 3 | claude-code-vs-cursor |
| P0 | cursor vs claude code | 1,500 | 1 | claude-code-vs-cursor |
| P0 | windsurf vs cursor | 4,500 | 25 | windsurf-vs-cursor |
| P0 | cursor vs windsurf | 2,800 | 24 | windsurf-vs-cursor |
| P1 | prompt injection | 1,600 | 43 | prompt-injection |
| P1 | what is vibe coding | 29,000 | 43 | what-is-vibe-coding |
| P1 | vibe coding | 57,000 | 65 | what-is-vibe-coding |

### Future Comparison Articles (High Volume)
| Keyword | Volume | Difficulty | Notes |
|---------|--------|------------|-------|
| cursor vs copilot | 2,800 | 3 | Quick win |
| cline vs cursor | 1,300 | 2 | Quick win |
| replit vs cursor | 1,000 | 0 | Very easy |
| github copilot vs cursor | 1,000 | 1 | Quick win |
| lovable vs cursor | 400 | - | Emerging |

### High-Volume Tools (Already Covered)
| Tool | Volume | Our Article |
|------|--------|-------------|
| claude code | 114,000 | ✅ Published |
| lovable ai | 41,000 | ✅ Published |
| windsurf ai | 19,000 | ✅ Published |
| cursor | 1,200,000+ | ✅ Published |

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
url: /kb/vibe-coding-tools/cursor/
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
url: /kb/vibe-coding-tools/claude-code/
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
url: /kb/vibe-coding-tools/bolt/
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
url: /kb/vibe-coding-tools/v0/
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
url: /kb/vibe-coding-tools/replit/
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

### 21. Tool: GitHub Copilot
```yaml
type: tool
slug: github-copilot
url: /kb/vibe-coding-tools/github-copilot/
title: "GitHub Copilot Security: The Most Popular AI Tool Has Known Vulnerabilities"
word_count: 1500-2000
notes: |
  - Most popular AI coding tool (millions of users)
  - CVE-2025-62449: Path traversal via malicious codebase files (CVSS 6.8)
  - CVE-2025-62453: AI output validation bypass (CVSS 5.0)
  - "Rules File Backdoor" attack via hidden unicode in rule files
  - Academic study: 27.3% of generated code contains vulnerabilities
  - Top CWEs: CWE-330 (weak random, 18%), CWE-94 (code injection, 10%), CWE-79 (XSS, 9.5%)
  - External sources: NVD, Pillar Security, academic research
```

### 22. Vulnerability: CSRF
```yaml
type: vulnerability
slug: csrf
url: /kb/security/vulnerabilities/csrf/
title: "CSRF: Why AI Tools Skip This Critical Protection"
cwe: CWE-352
owasp: A01:2021-Broken Access Control
owasp_url: https://owasp.org/Top10/A01_2021-Broken_Access_Control/
cwe_url: https://cwe.mitre.org/data/definitions/352.html
severity: High
word_count: 1200-1500
notes: |
  - Next.js Server Actions have built-in CSRF protection (POST-only, Origin validation)
  - Custom Route Handlers require manual CSRF protection
  - AI tools generate Route Handlers without CSRF protection
  - SameSite cookies (browser default) provide partial protection
  - Key distinction: Server Actions vs Route Handlers
```

### 23. Tool: Windsurf
```yaml
type: tool
slug: windsurf
url: /kb/vibe-coding-tools/windsurf/
title: "Windsurf Security: CVEs, Prompt Injection, and How to Stay Safe"
word_count: 1500-2000
notes: |
  - Codeium's AI-native IDE with autonomous "Cascade" agent
  - CVE-2025-62353: Path traversal in codebase_search/write_to_file (CVSS 8.1)
  - Prompt injection can exfiltrate .env files via hidden instructions
  - Inherited Electron/Chromium vulnerabilities (94+ CVEs)
  - Key patterns: path traversal, secret exfiltration, hardcoded credentials
  - External sources: NVD, Pillar Security, Kaspersky research
```

### 24. Vulnerability: Sensitive Data Exposure
```yaml
type: vulnerability
slug: sensitive-data-exposure
url: /kb/security/vulnerabilities/sensitive-data-exposure/
title: "Sensitive Data Exposure: When AI Leaks Your Secrets"
cwe: CWE-200
cwe_secondary: CWE-209, CWE-532
owasp: A02:2021-Cryptographic Failures
owasp_url: https://owasp.org/Top10/A02_2021-Cryptographic_Failures/
cwe_url: https://cwe.mitre.org/data/definitions/200.html
severity: High
word_count: 1200-1500
notes: |
  - CWE-200 in CWE Top 25 Most Dangerous Weaknesses (2024)
  - OWASP renamed from "Sensitive Data Exposure" to "Cryptographic Failures"
  - AI generates verbose error messages, console.log with sensitive data
  - API responses return full database objects instead of filtered fields
  - Stack traces reveal internal structure, file paths, component versions
  - Query strings with tokens/emails logged by servers and proxies
```

### 25. Vulnerability: Command Injection
```yaml
type: vulnerability
slug: command-injection
url: /kb/security/vulnerabilities/command-injection/
title: "Command Injection: When AI Gives Attackers Shell Access"
cwe: CWE-78
cwe_parent: CWE-77
owasp: A03:2021-Injection
owasp_url: https://owasp.org/Top10/A03_2021-Injection/
cwe_url: https://cwe.mitre.org/data/definitions/78.html
severity: Critical
word_count: 1200-1500
notes: |
  - CVSS 8.8-9.9 (Critical) - complete system takeover
  - 6.21% prevalence in Copilot-generated code (academic research)
  - AI generates exec() with template literals for "run command" requests
  - child_process.exec() spawns shell, interprets metacharacters (; | && $())
  - Fix: Use execFile() or spawn() with array arguments
  - CVE-2024-27980: Node.js spawn vulnerability with .bat/.cmd on Windows
  - CISA added multiple command injection CVEs to KEV in 2024
```

### 26. Stack: SvelteKit + Supabase
```yaml
type: stack
slug: sveltekit-supabase
url: /kb/security/stacks/sveltekit-supabase/
title: "SvelteKit + Supabase Security: Complete Checklist for Vibe Coders"
framework: SvelteKit
database: Supabase
word_count: 1800-2200
notes: |
  - The #1 mistake: Using getSession() instead of getUser() on server
  - getSession() reads from cookies (can be spoofed), getUser() validates with Auth server
  - RLS (Row Level Security) disabled by default on new tables
  - Service role key bypasses ALL RLS - never expose client-side
  - CVE-2023-29003: SvelteKit CSRF bypass via Content-Type: text/plain
  - CVE-2024-53262: XSS via error.html template
  - hooks.server.ts auth setup critical for security
  - Authorization in +layout.server.ts doesn't propagate reliably
  - Views bypass RLS by default (security_invoker in Postgres 15+)
  - External sources: Supabase Docs, SvelteKit Docs, Snyk CVE database
```

### 27. Vulnerability: Insecure Deserialization
```yaml
type: vulnerability
slug: insecure-deserialization
url: /kb/security/vulnerabilities/insecure-deserialization/
title: "Insecure Deserialization: When AI Code Lets Attackers Execute Commands"
cwe: CWE-502
cwe_parent: CWE-913
owasp: A08:2021-Software and Data Integrity Failures
owasp_url: https://owasp.org/Top10/A08_2021-Software_and_Data_Integrity_Failures/
cwe_url: https://cwe.mitre.org/data/definitions/502.html
severity: Critical
word_count: 1400-1800
notes: |
  - CWE-502 in 2024 CWE Top 25 Most Dangerous Weaknesses
  - CVE-2025-55182: Critical React Server Components RCE (December 2024)
  - Affects React 19.0.0-19.2.0, Next.js, React Router, Expo, and more
  - Python: yaml.load() without SafeLoader enables RCE (fixed PyYAML 5.4)
  - JavaScript: eval(), node-serialize, Function() constructor
  - JSON.parse() is SAFE - custom deserializers are the problem
  - Prototype pollution is related but different vulnerability
  - OWASP merged into A08 (was standalone A8:2017)
  - External sources: OWASP, Snyk, PortSwigger, HackTricks
```

### 28. Guide: The Complete Secure Vibe Coding Guide (PILLAR)
```yaml
type: guide
slug: secure-vibe-coding-guide
url: /kb/vibe-coding/secure-vibe-coding-guide/
title: "The Complete Secure Vibe Coding Guide: Ship Fast Without Getting Hacked"
pillar: true
word_count: 4000-5000
notes: |
  - FLAGSHIP PILLAR CONTENT - links to ALL other KB articles
  - Covers full workflow: prompting → generating → reviewing → scanning → deploying
  - 25-70% of AI code contains vulnerabilities (BaxBench, multiple studies)
  - 45% failed security tests (Veracode 2025)
  - Includes complete .cursorrules security file (copy-paste ready)
  - Secure prompt formula with before/after examples
  - 5-minute security review checklist
  - Tool-specific guidance (Cursor, Copilot, Claude Code, Bolt, etc.)
  - Pre-deployment checklist
  - OWASP Top 10 LLM Applications 2025 coverage
  - External sources: OpenSSF, CSA, Wiz, Veracode, Endor Labs, OWASP
  - Links to all 10+ vulnerability articles and 7+ tool articles
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

### 29. Concept: MCP Server Security
```yaml
type: concept
slug: mcp-server-security
url: /kb/agents/security/mcp-servers/
title: "MCP Server Security: The Hidden Risks in AI Tool Integrations"
owasp: A08:2021-Software and Data Integrity Failures
owasp_url: https://owasp.org/Top10/A08_2021-Software_and_Data_Integrity_Failures/
severity: Critical
word_count: 1800-2200
status: PUBLISHED
notes: |
  - MCP = Model Context Protocol, Anthropic's open standard (Nov 2024)
  - "USB-C for AI applications" - connects AI tools to external services
  - Used by Claude Code, Cursor, Windsurf, Cline
  - CVE-2025-6514: Critical RCE in mcp-remote (CVSS 9.6)
  - Tool Poisoning Attacks (TPA): Hidden malicious instructions in tool descriptions
  - Tool Shadowing: Override trusted tools via malicious servers
  - Rug Pull Attacks: Change tool definitions post-approval
  - ~1000 exposed MCP servers with no authorization (Bitsight)
  - Supply chain risks similar to npm ecosystem
  - OAuth is OPTIONAL in MCP spec (key security gap)
  - External sources: Invariant Labs, Wiz Security, Pillar Security
  - Brief location: docs/.content-ops/briefs/mcp-server-security-brief.md
```

### 30. Vulnerability: Broken Access Control
```yaml
type: vulnerability
slug: broken-access-control
url: /kb/security/vulnerabilities/broken-access-control/
title: "Broken Access Control: The #1 Web Vulnerability AI Tools Get Wrong"
cwe: CWE-284
cwe_children: CWE-639, CWE-862, CWE-863, CWE-306
owasp: A01:2021-Broken Access Control
owasp_url: https://owasp.org/Top10/A01_2021-Broken_Access_Control/
cwe_url: https://cwe.mitre.org/data/definitions/284.html
severity: Critical
word_count: 1600-2000
status: PUBLISHED
notes: |
  - OWASP #1 vulnerability (moved from #5 in 2017)
  - 94% of applications have some form of broken access control
  - AI understands authentication but not authorization
  - Common patterns: IDOR, missing authz checks, vertical/horizontal escalation
  - Framework guidance: Next.js middleware, Express middleware, Supabase RLS
  - Key insight: Authentication != Authorization
  - External sources: OWASP, CWE, Veracode, Endor Labs
  - Brief location: docs/.content-ops/briefs/broken-access-control-brief.md
```

### 31. Vulnerability: Insecure File Upload
```yaml
type: vulnerability
slug: insecure-file-upload
url: /kb/security/vulnerabilities/insecure-file-upload/
title: "Insecure File Upload: How AI Code Lets Attackers Upload Web Shells"
cwe: CWE-434
cwe_parent: CWE-669
owasp: A04:2021-Insecure Design
owasp_url: https://owasp.org/Top10/A04_2021-Insecure_Design/
cwe_url: https://cwe.mitre.org/data/definitions/434.html
severity: Critical
word_count: 1500-1800
status: BRIEF_READY
notes: |
  - Web shell upload = complete server takeover
  - AI generates uploads with user-controlled filenames (path traversal risk)
  - 10+ extension bypass techniques documented
  - Key patterns: trusting originalname, blacklists vs allowlists, Content-Type spoofing
  - Secure implementation: random filenames, content validation, store outside webroot
  - Uses file-type library for magic byte validation
  - External sources: OWASP, PortSwigger, CWE, JFrog
  - Brief location: docs/.content-ops/briefs/insecure-file-upload-brief.md
```

### 32. Tool: Lovable
```yaml
type: tool
slug: lovable
url: /kb/vibe-coding-tools/lovable/
title: "Lovable Security: CVE-2025-48757, RLS Failures, and VibeScamming Risks"
severity: Critical
word_count: 1800-2200
status: PUBLISHED
notes: |
  - $1.8B valuation AI app builder
  - CVE-2025-48757: Missing RLS exposed 170+ apps (CVSS 8.26)
  - 303 vulnerable endpoints, 10.3% of analyzed projects affected
  - Exposed data: emails, addresses, API keys, financial records
  - VibeScamming benchmark: Scored 1.8/10 (worst tested, vs ChatGPT 8/10)
  - Can generate pixel-perfect phishing pages auto-deployed to lovable.app
  - Security scanner added but only checks if RLS exists, not correctness
  - Stack: React, TypeScript, Tailwind, Supabase
  - External sources: Superblocks, Hacker News, Semafor, Guardio Labs
  - Brief location: docs/.content-ops/briefs/lovable-brief.md
```

### 33. Vulnerability: XXE (XML External Entity)
```yaml
type: vulnerability
slug: xxe
url: /kb/security/vulnerabilities/xxe/
title: "XXE: How AI Code Lets Attackers Read Your Server Files"
cwe: CWE-611
cwe_parent: CWE-610
owasp: A05:2021-Security Misconfiguration
owasp_url: https://owasp.org/Top10/A05_2021-Security_Misconfiguration/
cwe_url: https://cwe.mitre.org/data/definitions/611.html
severity: High
word_count: 1400-1700
status: PUBLISHED
notes: |
  - Was OWASP A4:2017, now part of A05:2021
  - Exploits XML parsers that process external entities
  - Attack capabilities: file disclosure, SSRF, DoS (Billion Laughs), RCE (rare)
  - Java DocumentBuilder vulnerable by default
  - Python: use defusedxml library
  - PHP 8.0+ safe by default
  - .NET 4.5.2+ XmlReader safe by default
  - libxml2 2.9+ disables external entities by default
  - Key message: "disable DTD processing"
  - External sources: OWASP, CWE, PortSwigger
  - Brief location: docs/.content-ops/briefs/xxe-brief.md
```

### 34. Vulnerability: SSTI (Server-Side Template Injection)
```yaml
type: vulnerability
slug: ssti
url: /kb/security/vulnerabilities/ssti/
title: "SSTI: When AI Template Code Becomes Remote Code Execution"
cwe: CWE-1336
cwe_parent: CWE-94
owasp: A03:2021-Injection
owasp_url: https://owasp.org/Top10/A03_2021-Injection/
cwe_url: https://cwe.mitre.org/data/definitions/1336.html
severity: Critical
word_count: 1500-1800
status: PUBLISHED
notes: |
  - User input embedded in template strings → code execution
  - Affects Jinja2, EJS, Pug, Twig, FreeMarker, Velocity
  - AI generates vulnerable patterns: f-strings, template concatenation
  - Detection: {{7*7}} or ${7*7} returns 49
  - CVE-2024-34359: Jinja2 SSTI in Python LLM bindings
  - Key insight: "data vs template" - pass data as variables
  - Different from XSS (server-side vs client-side)
  - External sources: PortSwigger, OWASP, CWE
  - Brief location: docs/.content-ops/briefs/ssti-brief.md
```

### 35. Vulnerability: Race Conditions
```yaml
type: vulnerability
slug: race-conditions
url: /kb/security/vulnerabilities/race-conditions/
title: "Race Conditions: How Async Code Creates Security Holes AI Misses"
cwe: CWE-362
cwe_children: CWE-367
owasp: A04:2021-Insecure Design
owasp_url: https://owasp.org/Top10/A04_2021-Insecure_Design/
cwe_url: https://cwe.mitre.org/data/definitions/362.html
severity: High
word_count: 1500-1800
status: PUBLISHED
notes: |
  - Exploits timing gaps in async code (CHECK-USE gap)
  - Attacks: redeem gift cards multiple times, bypass rate limits, duplicate transactions
  - AI generates async code without transactions or atomic operations
  - TOCTOU (Time-of-check Time-of-use) is common variant
  - CVE-2024-50379: Apache Tomcat TOCTOU RCE
  - CVE-2025-68146: Python filelock TOCTOU symlink attack
  - Fixes: database transactions, atomic operations, optimistic/pessimistic locking
  - Prisma, MongoDB $inc, PostgreSQL FOR UPDATE examples
  - External sources: PortSwigger, CWE, academic research
  - Brief location: docs/.content-ops/briefs/race-conditions-brief.md
```

---

## Ahrefs-Driven Articles (December 2024)

The following articles are based on Ahrefs keyword research conducted December 2024.
Focus: High-volume opportunities with achievable keyword difficulty.

### 36. Hub: Best Vibe Coding Tools (Security Comparison)
```yaml
type: hub
slug: vibe-coding-tools
url: /kb/vibe-coding-tools/
title: "Best Vibe Coding Tools 2025: Complete Security Comparison"
word_count: 3000-3500
status: 📝 Brief Ready
priority: P0 (Quick Win)
keywords:
  - "best vibe coding tools" (1,100 volume, KD 7)
  - "vibe coding tools" (2,300 volume, KD 20)
  - "ai coding tools" (11,000 volume, KD 64)
  - "ai code generator" (43,000 volume, KD 52)
notes: |
  - Hub page comparing 8 tools: Cursor, Claude Code, Windsurf, Lovable, GitHub Copilot, Bolt.new, v0, Replit
  - Security comparison table with CVE tracking
  - Unique angle: Only comparison with security analysis
  - Links to all individual tool pages
  - Brief location: docs/.content-ops/briefs/best-vibe-coding-tools-brief.md
```

### 37. Comparison: Claude Code vs Cursor
```yaml
type: comparison
slug: claude-code-vs-cursor
url: /kb/vibe-coding-tools/claude-code-vs-cursor/
title: "Claude Code vs Cursor: Features & Security Compared"
word_count: 1500-1800
status: 📝 Brief Ready
priority: P0 (Quick Win - Very Low KD)
keywords:
  - "claude code vs cursor" (3,000 volume, KD 3)
  - "cursor vs claude code" (1,500 volume, KD 1)
notes: |
  - Very low keyword difficulty (KD 1-3) = fast ranking potential
  - Security-focused comparison (unique angle)
  - Claude Code has no known CVEs; Cursor has CVE-2025-62352
  - Compare: CLI vs IDE, agentic vs autocomplete, pricing
  - Brief location: docs/.content-ops/briefs/claude-code-vs-cursor-brief.md
```

### 38. Comparison: Windsurf vs Cursor
```yaml
type: comparison
slug: windsurf-vs-cursor
url: /kb/vibe-coding-tools/windsurf-vs-cursor/
title: "Windsurf vs Cursor: AI IDE Comparison 2025"
word_count: 1500-1800
status: 📝 Brief Ready
priority: P0 (High Volume)
keywords:
  - "windsurf vs cursor" (4,500 volume, KD 25)
  - "cursor vs windsurf" (2,800 volume, KD 24)
  - "cursor ai vs windsurf" (200 volume)
notes: |
  - 7,500/month total addressable volume
  - Both tools have 2025 CVEs to document
  - CVE-2025-62353 (Windsurf CVSS 8.1) vs CVE-2025-62352 (Cursor)
  - Compare: Cascade vs Composer, autonomy levels, pricing ($15 vs $20)
  - Brief location: docs/.content-ops/briefs/windsurf-vs-cursor-brief.md
```

### 39. Vulnerability: Prompt Injection
```yaml
type: vulnerability
slug: prompt-injection
url: /kb/security/vulnerabilities/prompt-injection/
title: "Prompt Injection: Protect Your AI Apps & Tools"
owasp: LLM01:2025-Prompt Injection
owasp_url: https://owasp.org/www-project-top-10-for-large-language-model-applications/
severity: Critical
word_count: 2000-2500
status: 📝 Brief Ready
priority: P1 (Strategic - Our Niche)
keywords:
  - "prompt injection" (1,600 volume, KD 43)
  - "prompt injection attack" (900 volume, KD 39)
  - "what is prompt injection" (500 volume, KD 47)
  - "prompt injection examples" (450 volume, KD 23)
  - "how to prevent prompt injection" (100 volume, KD 11)
notes: |
  - OWASP LLM Top 10 #1 risk
  - Dual angle: apps vibe coders BUILD + tools they USE
  - Real examples: Windsurf Cascade .env exfiltration, Cursor attacks
  - Prevention code samples in TypeScript
  - Brief location: docs/.content-ops/briefs/prompt-injection-guide-brief.md
```

### 40. Pillar: What is Vibe Coding
```yaml
type: pillar
slug: what-is-vibe-coding
url: /kb/vibe-coding/what-is-vibe-coding/
title: "What is Vibe Coding? The Complete Guide to AI-Assisted Development"
word_count: 2500-3000
status: 📝 Brief Ready
priority: P1 (High Volume - Long Term SEO)
keywords:
  - "vibe coding" (57,000 volume, KD 65)
  - "what is vibe coding" (29,000 volume, KD 43)
  - "vibe coding meaning" (8,200 volume, KD 54)
  - "vibe coding definition" (3,100 volume, KD 61)
notes: |
  - 101,000/month total addressable volume
  - Definition page - must be cited by LLMs
  - Origin: Andrej Karpathy (Feb 2025)
  - Hub linking to all tools and security content
  - Security angle: "Is vibe coding safe?" section
  - Brief location: docs/.content-ops/briefs/what-is-vibe-coding-brief.md
```

### 41. Comparison: Cursor vs GitHub Copilot
```yaml
type: comparison
slug: cursor-vs-copilot
url: /kb/vibe-coding-tools/cursor-vs-copilot/
title: "Cursor vs GitHub Copilot: Complete Comparison 2025"
word_count: 1500-1800
status: 📝 Brief Ready
priority: P0 (Quick Win - Very Low KD)
keywords:
  - "cursor vs copilot" (2,800 volume, KD 3)
  - "copilot vs cursor" (1,100 volume)
  - "github copilot vs cursor" (1,000 volume, KD 1)
notes: |
  - 4,900/month total addressable volume
  - Very low KD (1-3) = fast ranking
  - Compare: IDE vs extension, $20 vs $10 pricing
  - Cursor CVE-2025-62352 vs Copilot training data concerns
  - Brief location: docs/.content-ops/briefs/cursor-vs-copilot-brief.md
```

### 42. Comparison: Cline vs Cursor
```yaml
type: comparison
slug: cline-vs-cursor
url: /kb/vibe-coding-tools/cline-vs-cursor/
title: "Cline vs Cursor: Free vs Paid AI Coding Compared"
word_count: 1500-1800
status: 📝 Brief Ready
priority: P0 (Quick Win - Very Low KD)
keywords:
  - "cline vs cursor" (1,300 volume, KD 2)
  - "cursor vs cline" (450 volume)
notes: |
  - 1,750/month total addressable volume
  - Cline = free open-source, human-in-the-loop
  - Security angle: open-source auditability, approval workflow
  - Brief location: docs/.content-ops/briefs/cline-vs-cursor-brief.md
```

### 43. Comparison: Replit vs Cursor
```yaml
type: comparison
slug: replit-vs-cursor
url: /kb/vibe-coding-tools/replit-vs-cursor/
title: "Replit vs Cursor: Cloud vs Desktop IDE Compared"
word_count: 1500-1800
status: 📝 Brief Ready
priority: P0 (Quick Win - KD 0)
keywords:
  - "replit vs cursor" (1,000 volume, KD 0)
  - "cursor vs replit" (450 volume, KD 2)
notes: |
  - 1,450/month total addressable volume
  - KD 0 = extremely easy ranking
  - Cloud vs local paradigm comparison
  - Data residency and privacy implications
  - Brief location: docs/.content-ops/briefs/replit-vs-cursor-brief.md
```

### 44. Comparison: Lovable vs Bolt
```yaml
type: comparison
slug: lovable-vs-bolt
url: /kb/vibe-coding-tools/lovable-vs-bolt/
title: "Lovable vs Bolt: AI App Builder Comparison 2025"
word_count: 1500-1800
status: 📝 Brief Ready
priority: P1 (Emerging)
keywords:
  - "lovable vs bolt" (450 volume)
  - "bolt vs lovable" (400 volume)
notes: |
  - 850/month total addressable volume
  - Both target non-technical founders
  - Lovable = better UI defaults, Supabase integration
  - Security defaults comparison for app builders
  - Brief location: docs/.content-ops/briefs/lovable-vs-bolt-brief.md
```

---

## Prompts Series (NEW Section)

High-volume prompting and AI configuration content. New category: `/kb/prompts/`

**Required Skill:** Use `docs/.content-ops/skills/master-prompting-skill.md` for research, writing, and QA of all prompting content. This skill covers Anthropic best practices, Cursor Rules (.mdc) format, CLAUDE.md structure, security rules library, and content templates.

### 45. Prompts: Cursor Rules Guide
```yaml
type: prompts
slug: cursor-rules
url: /kb/prompts/cursor-rules/
title: "Cursor Rules: The Complete .cursorrules Guide 2025"
word_count: 2500-3000
status: 📝 Brief Ready
priority: P0 (High Volume)
keywords:
  - "cursor rules" (5,300 volume, KD 26)
  - "cursorrules" (1,200 volume)
  - ".cursorrules" (450 volume)
  - "cursor rules file" (400 volume)
notes: |
  - 7,700/month total addressable volume
  - Complete guide to .cursorrules configuration
  - Security rules library (our differentiator)
  - Copy-paste templates for common stacks
  - Brief location: docs/.content-ops/briefs/cursor-rules-brief.md
```

### 46. Prompts: CLAUDE.md Guide
```yaml
type: prompts
slug: claude-md
url: /kb/prompts/claude-md/
title: "CLAUDE.md: Complete Guide for Claude Code"
word_count: 2000-2500
status: 📝 Brief Ready
priority: P0 (Emerging - First Mover)
keywords:
  - "claude.md" (450 volume)
  - "claude md" (450 volume)
  - "claude code system prompt" (10 volume)
notes: |
  - 900/month total addressable volume
  - Emerging term - first mover advantage
  - Security-focused templates
  - Comparison with .cursorrules
  - Brief location: docs/.content-ops/briefs/claude-md-brief.md
```

---

## Additional Vulnerabilities

### 47. Vulnerability: NoSQL Injection
```yaml
type: vulnerability
slug: nosql-injection
url: /kb/security/vulnerabilities/nosql-injection/
title: "NoSQL Injection: Protect MongoDB & Firestore Apps"
cwe: CWE-943
owasp: A03:2021-Injection
owasp_url: https://owasp.org/Top10/A03_2021-Injection/
cwe_url: https://cwe.mitre.org/data/definitions/943.html
severity: High
word_count: 1500-1800
status: 📝 Brief Ready
priority: P0 (Quick Win - KD 4)
keywords:
  - "nosql injection" (250 volume, KD 4)
  - "mongodb injection" (100 volume, KD 4)
notes: |
  - Very low KD = fast ranking
  - Operator injection attacks ($ne, $gt, etc.)
  - MongoDB, Firestore, DynamoDB coverage
  - Often overlooked "NoSQL is safe" myth
  - Brief location: docs/.content-ops/briefs/nosql-injection-brief.md
```

---

## Prompts Series - Full 40-Article Expansion

**Skill Reference:** `docs/.content-ops/skills/master-prompting-skill.md`
**Brief Files:** `docs/.content-ops/briefs/prompts-series-batch*.md`

### Batch 1: Tool Configuration Guides (Articles 48-59)

### 48. Prompts: Cursor Rules Examples
```yaml
type: prompts
slug: cursor-rules-examples
url: /kb/prompts/cursor-rules-examples/
title: "Cursor Rules Examples: 20+ Templates for Every Stack"
word_count: 2500-3000
status: 📝 Brief Ready
priority: P0
keywords:
  - "cursor rules examples" (300 volume)
  - "best cursor rules" (100 volume)
  - "cursorrules examples"
notes: |
  - High intent: people want copy-paste examples
  - Include: Next.js, React, TypeScript, Python, Security
  - Reference awesome-cursorrules GitHub (36k stars)
  - Brief: prompts-series-batch1-tool-configs.md
```

### 49. Prompts: How to Use Cursor Rules
```yaml
type: prompts
slug: how-to-use-cursor-rules
url: /kb/prompts/how-to-use-cursor-rules/
title: "How to Use Cursor Rules: Complete Beginner Tutorial"
word_count: 1500-1800
status: 📝 Brief Ready
priority: P0
keywords:
  - "how to use cursor rules" (100 volume)
  - "how to add cursor rules" (80 volume)
notes: |
  - Beginner-friendly tutorial format
  - Screenshots/visual steps
  - Troubleshooting section
  - Brief: prompts-series-batch1-tool-configs.md
```

### 50. Prompts: Windsurf Rules
```yaml
type: prompts
slug: windsurf-rules
url: /kb/prompts/windsurf-rules/
title: "Windsurf Rules: Configure Cascade for Better Code"
word_count: 2000-2500
status: 📝 Brief Ready
priority: P1
keywords:
  - "windsurf rules" (500 volume)
  - "windsurf prompts" (30 volume)
notes: |
  - Emerging tool, low competition
  - Cover: .windsurf/rules/, global_rules.md
  - 12k character limit per file
  - Activation modes (Manual, Always On, Model Decision, Glob)
  - Brief: prompts-series-batch1-tool-configs.md
```

### 51. Prompts: Cline Rules
```yaml
type: prompts
slug: cline-rules
url: /kb/prompts/cline-rules/
title: "Cline Rules: The Complete .clinerules Guide"
word_count: 1800-2200
status: 📝 Brief Ready
priority: P1
keywords:
  - "cline rules" (200 volume)
  - "clinerules" (50 volume)
notes: |
  - Free, open-source tool - growing fast
  - Rules bank pattern (active vs available)
  - AGENTS.md fallback support
  - Brief: prompts-series-batch1-tool-configs.md
```

### 52. Prompts: Copilot Instructions
```yaml
type: prompts
slug: copilot-instructions
url: /kb/prompts/copilot-instructions/
title: "GitHub Copilot Instructions: Customize Your AI Pair Programmer"
word_count: 2000-2500
status: 📝 Brief Ready
priority: P1
keywords:
  - "copilot instructions" (500 volume)
  - "copilot prompts" (450 volume)
  - "github copilot prompts" (150 volume)
notes: |
  - Official GitHub tool - huge user base
  - Cover: .github/copilot-instructions.md
  - Path-specific instructions with frontmatter
  - Brief: prompts-series-batch1-tool-configs.md
```

### 53. Prompts: Cursor Rules File
```yaml
type: prompts
slug: cursor-rules-file
url: /kb/prompts/cursor-rules-file/
title: "Cursor Rules File: Complete .cursorrules Syntax Reference"
word_count: 1500-1800
status: 📝 Brief Ready
priority: P1
keywords:
  - "cursor rules file" (400 volume)
  - ".cursorrules file"
notes: |
  - Technical reference guide
  - Frontmatter options (description, alwaysApply, globs)
  - Rule precedence (Team > Project > User)
  - Brief: prompts-series-batch1-tool-configs.md
```

### 54. Prompts: Awesome Cursor Rules
```yaml
type: prompts
slug: awesome-cursor-rules
url: /kb/prompts/awesome-cursor-rules/
title: "Awesome Cursor Rules: 150+ Community Templates"
word_count: 2000-2500
status: 📝 Brief Ready
priority: P1
keywords:
  - "awesome cursor rules" (300 volume)
  - "cursor rules github"
notes: |
  - Reference PatrickJS/awesome-cursorrules (36.2k stars)
  - Categories: Frontend, Backend, Mobile, Testing, Security
  - Brief: prompts-series-batch1-tool-configs.md
```

### 55. Prompts: Cursor System Prompt
```yaml
type: prompts
slug: cursor-system-prompt
url: /kb/prompts/cursor-system-prompt/
title: "Cursor System Prompt: Understanding AI Context"
word_count: 1500-1800
status: 📝 Brief Ready
priority: P1
keywords:
  - "cursor system prompt" (200 volume)
  - "cursor ai rules"
notes: |
  - Technical explainer
  - How Cursor injects rules into context
  - Context window management
  - Brief: prompts-series-batch1-tool-configs.md
```

### 56. Prompts: V0 Prompts
```yaml
type: prompts
slug: v0-prompts
url: /kb/prompts/v0-prompts/
title: "V0 Prompts: Get Better Results from Vercel's AI"
word_count: 1500-1800
status: 📝 Brief Ready
priority: P2
keywords:
  - "v0 prompts" (50 volume)
  - "vercel v0 prompts"
notes: |
  - Emerging tool - Vercel ecosystem
  - Best practices for UI generation prompts
  - Export to Next.js workflow
  - Brief: prompts-series-batch1-tool-configs.md
```

### 57. Prompts: Bolt Prompts
```yaml
type: prompts
slug: bolt-prompts
url: /kb/prompts/bolt-prompts/
title: "Bolt.new Prompts: Optimize Your AI App Building"
word_count: 1500-1800
status: 📝 Brief Ready
priority: P2
keywords:
  - "bolt prompts" (10 volume)
  - "bolt.new prompts"
notes: |
  - Emerging - WebContainers technology
  - Security defaults to check
  - Brief: prompts-series-batch1-tool-configs.md
```

### 58. Prompts: Replit Prompts
```yaml
type: prompts
slug: replit-prompts
url: /kb/prompts/replit-prompts/
title: "Replit Agent Prompts: Build Apps with AI"
word_count: 1500-1800
status: 📝 Brief Ready
priority: P1
keywords:
  - "replit agent" (2,400 volume)
  - "replit prompts"
notes: |
  - Good volume on "replit agent"
  - Cloud vs local implications
  - Security considerations
  - Brief: prompts-series-batch1-tool-configs.md
```

### 59. Prompts: AGENTS.md
```yaml
type: prompts
slug: agents-md
url: /kb/prompts/agents-md/
title: "AGENTS.md: One Config File for All AI Tools"
word_count: 1500-1800
status: 📝 Brief Ready
priority: P1
keywords:
  - "agents.md" (emerging)
  - "agents md file"
notes: |
  - Emerging standard - cross-tool compatibility
  - Supported by: Cursor, Cline, Claude Code
  - When to use vs tool-specific configs
  - Brief: prompts-series-batch1-tool-configs.md
```

---

### Batch 2: Prompt Libraries (Articles 60-67)

### 60. Prompts: AI Prompt Library
```yaml
type: prompts
slug: ai-prompt-library
url: /kb/prompts/ai-prompt-library/
title: "AI Prompt Library: 100+ Prompts for Developers"
word_count: 2500-3000
status: 📝 Brief Ready
priority: P1
keywords:
  - "ai prompt library" (200 volume)
  - "prompt library"
notes: |
  - Comprehensive collection format
  - Categories: debugging, refactoring, security, testing
  - Brief: prompts-series-batch2-libraries.md
```

### 61. Prompts: Prompt Templates
```yaml
type: prompts
slug: prompt-templates
url: /kb/prompts/prompt-templates/
title: "AI Prompt Templates: Copy-Paste Formats That Work"
word_count: 2000-2500
status: 📝 Brief Ready
priority: P1
keywords:
  - "prompt templates" (300 volume)
  - "ai prompt templates"
notes: |
  - SCRIBE format, RISEN format
  - Chain-of-thought templates
  - Brief: prompts-series-batch2-libraries.md
```

### 62. Prompts: AI Coding Prompts
```yaml
type: prompts
slug: ai-coding-prompts
url: /kb/prompts/ai-coding-prompts/
title: "AI Coding Prompts: 50+ Prompts That Ship Faster"
word_count: 2000-2500
status: 📝 Brief Ready
priority: P0
keywords:
  - "ai coding prompts" (100 volume)
  - "ai prompts for coding"
notes: |
  - High intent: people want actionable prompts
  - Security-conscious prompts
  - Brief: prompts-series-batch2-libraries.md
```

### 63. Prompts: ChatGPT Prompt Examples
```yaml
type: prompts
slug: chatgpt-prompt-examples
url: /kb/prompts/chatgpt-prompt-examples/
title: "ChatGPT Prompt Examples: 40+ for Developers"
word_count: 2000-2500
status: 📝 Brief Ready
priority: P1
keywords:
  - "chatgpt prompt examples" (500 volume)
  - "chatgpt prompts for coding"
notes: |
  - ChatGPT still most searched
  - Developer-specific examples
  - Brief: prompts-series-batch2-libraries.md
```

### 64. Prompts: Custom Instructions
```yaml
type: prompts
slug: custom-instructions
url: /kb/prompts/custom-instructions/
title: "Custom Instructions: Set Up Your AI Coding Assistant"
word_count: 1800-2200
status: 📝 Brief Ready
priority: P1
keywords:
  - "custom instructions" (400 volume)
  - "ai custom instructions"
notes: |
  - Cross-tool coverage
  - ChatGPT, Claude, Copilot custom instructions
  - Brief: prompts-series-batch2-libraries.md
```

### 65. Prompts: System Prompts
```yaml
type: prompts
slug: system-prompts
url: /kb/prompts/system-prompts/
title: "System Prompts: Control How AI Writes Your Code"
word_count: 1800-2200
status: 📝 Brief Ready
priority: P1
keywords:
  - "system prompts" (200 volume)
  - "system prompt examples"
notes: |
  - Technical explainer
  - Best practices from OpenAI/Anthropic
  - Brief: prompts-series-batch2-libraries.md
```

### 66. Prompts: Prompt Cheat Sheet
```yaml
type: prompts
slug: prompt-cheat-sheet
url: /kb/prompts/prompt-cheat-sheet/
title: "AI Prompt Cheat Sheet: Quick Reference for Developers"
word_count: 1500-1800
status: 📝 Brief Ready
priority: P1
keywords:
  - "prompt cheat sheet" (100 volume)
  - "ai prompt cheat sheet"
notes: |
  - Quick reference format
  - Techniques: CoT, few-shot, etc.
  - Brief: prompts-series-batch2-libraries.md
```

### 67. Prompts: Claude System Prompts
```yaml
type: prompts
slug: claude-system-prompts
url: /kb/prompts/claude-system-prompts/
title: "Claude System Prompts: Official Best Practices"
word_count: 1800-2200
status: 📝 Brief Ready
priority: P1
keywords:
  - "claude system prompt" (150 volume)
  - "claude prompts"
notes: |
  - Official Anthropic recommendations
  - XML tag usage (<thinking>, etc.)
  - Brief: prompts-series-batch2-libraries.md
```

---

### Batch 3: Use Case Guides (Articles 68-75)

### 68. Prompts: Security Prompts
```yaml
type: prompts
slug: security-prompts
url: /kb/prompts/security-prompts/
title: "Security Prompts: AI Code Review That Catches Vulnerabilities"
word_count: 2500-3000
status: 📝 Brief Ready
priority: P0
keywords:
  - "security prompts" (emerging)
  - "ai security review"
notes: |
  - OUR CORE ANGLE - security focus
  - OWASP Top 10 prompts
  - Brief: prompts-series-batch3-use-cases.md
```

### 69. Prompts: Debugging Prompts
```yaml
type: prompts
slug: debugging-prompts
url: /kb/prompts/debugging-prompts/
title: "Debugging Prompts: Fix Any Bug with AI Assistance"
word_count: 2000-2500
status: 📝 Brief Ready
priority: P0
keywords:
  - "debugging prompts" (50 volume)
  - "ai debugging"
notes: |
  - High utility for vibe coders
  - Error message analysis prompts
  - Brief: prompts-series-batch3-use-cases.md
```

### 70. Prompts: Refactoring Prompts
```yaml
type: prompts
slug: refactoring-prompts
url: /kb/prompts/refactoring-prompts/
title: "Refactoring Prompts: Clean Up AI-Generated Code"
word_count: 2000-2500
status: 📝 Brief Ready
priority: P1
keywords:
  - "refactoring prompts" (50 volume)
  - "ai refactoring"
notes: |
  - Clean up vibe coded projects
  - Before/after code examples
  - Brief: prompts-series-batch3-use-cases.md
```

### 71. Prompts: Code Review Prompts
```yaml
type: prompts
slug: code-review-prompts
url: /kb/prompts/code-review-prompts/
title: "Code Review Prompts: AI-Assisted Pull Request Reviews"
word_count: 2000-2500
status: 📝 Brief Ready
priority: P1
keywords:
  - "code review prompts" (100 volume)
  - "ai code review"
notes: |
  - Team workflow focus
  - Security review section
  - Brief: prompts-series-batch3-use-cases.md
```

### 72. Prompts: Testing Prompts
```yaml
type: prompts
slug: testing-prompts
url: /kb/prompts/testing-prompts/
title: "Testing Prompts: AI-Generated Unit & Integration Tests"
word_count: 2000-2500
status: 📝 Brief Ready
priority: P1
keywords:
  - "testing prompts" (50 volume)
  - "ai testing"
notes: |
  - Critical for vibe coded projects
  - Jest/Vitest focus (JS ecosystem)
  - Brief: prompts-series-batch3-use-cases.md
```

### 73. Prompts: Documentation Prompts
```yaml
type: prompts
slug: documentation-prompts
url: /kb/prompts/documentation-prompts/
title: "Documentation Prompts: AI-Generated Docs & Comments"
word_count: 1800-2200
status: 📝 Brief Ready
priority: P1
keywords:
  - "documentation prompts" (50 volume)
  - "ai documentation"
notes: |
  - README generation
  - JSDoc/TSDoc generation
  - Brief: prompts-series-batch3-use-cases.md
```

### 74. Prompts: AI Prompts for Founders
```yaml
type: prompts
slug: ai-prompts-founders
url: /kb/prompts/ai-prompts-founders/
title: "AI Prompts for Founders: Build Without Coding Experience"
word_count: 2000-2500
status: 📝 Brief Ready
priority: P1
keywords:
  - "ai prompts for non-coders" (emerging)
  - "prompts for founders"
notes: |
  - Vibe coder core audience
  - Non-technical language
  - Brief: prompts-series-batch3-use-cases.md
```

### 75. Prompts: Prompt Engineering for Code (PILLAR)
```yaml
type: prompts
slug: prompt-engineering-code
url: /kb/prompts/prompt-engineering-code/
title: "Prompt Engineering for Code: Developer's Complete Guide"
word_count: 3000-3500
status: 📝 Brief Ready
priority: P0
pillar: true
keywords:
  - "prompt engineering for code" (100 volume)
  - "prompt engineering coding"
notes: |
  - PILLAR CONTENT - comprehensive guide
  - Context engineering approach
  - Links to all other prompt articles
  - Brief: prompts-series-batch3-use-cases.md
```

---

### Batch 4: Comparisons (Articles 76-81)

### 76. Prompts: Cursor vs Windsurf Rules
```yaml
type: prompts
slug: cursor-vs-windsurf-rules
url: /kb/prompts/cursor-vs-windsurf-rules/
title: "Cursor vs Windsurf Rules: Which Config System Wins?"
word_count: 2000-2500
status: 📝 Brief Ready
priority: P1
keywords:
  - "cursor vs windsurf" (200 volume)
  - "windsurf vs cursor"
notes: |
  - Rules syntax differences
  - Migration guide between tools
  - Brief: prompts-series-batch4-comparisons.md
```

### 77. Prompts: Cursor vs Claude Code Config
```yaml
type: prompts
slug: cursor-vs-claude-code-config
url: /kb/prompts/cursor-vs-claude-code-config/
title: "Cursor vs Claude Code: .cursorrules vs CLAUDE.md"
word_count: 2000-2500
status: 📝 Brief Ready
priority: P1
keywords:
  - "cursor vs claude code" (50 volume)
  - "cursorrules vs claude md"
notes: |
  - Config file comparison
  - IDE vs terminal workflow
  - Brief: prompts-series-batch4-comparisons.md
```

### 78. Prompts: Best AI Coding Tools 2025 (Prompts Focus)
```yaml
type: prompts
slug: best-ai-coding-tools-2025
url: /kb/prompts/best-ai-coding-tools-2025/
title: "Best AI Coding Tools 2025: Rules & Configuration Compared"
word_count: 3000-3500
status: 📝 Brief Ready
priority: P0
keywords:
  - "best ai coding tools 2025" (500 volume)
  - "ai coding tools"
notes: |
  - Annual roundup format
  - All tools configuration comparison
  - Brief: prompts-series-batch4-comparisons.md
```

### 79. Prompts: Cline vs Cursor Config
```yaml
type: prompts
slug: cline-vs-cursor-config
url: /kb/prompts/cline-vs-cursor-config/
title: "Cline vs Cursor: Free vs Premium AI Coding"
word_count: 1800-2200
status: 📝 Brief Ready
priority: P1
keywords:
  - "cline vs cursor" (100 volume)
  - "cursor alternative"
notes: |
  - Open source angle
  - Price comparison (free vs paid)
  - Brief: prompts-series-batch4-comparisons.md
```

### 80. Prompts: Copilot vs Cursor Config
```yaml
type: prompts
slug: copilot-vs-cursor-config
url: /kb/prompts/copilot-vs-cursor-config/
title: "GitHub Copilot vs Cursor: Which for Your Team?"
word_count: 2000-2500
status: 📝 Brief Ready
priority: P1
keywords:
  - "copilot vs cursor" (300 volume)
  - "github copilot vs cursor"
notes: |
  - Enterprise decision guide
  - Instructions vs rules comparison
  - Brief: prompts-series-batch4-comparisons.md
```

### 81. Prompts: AI Tool Config Matrix
```yaml
type: prompts
slug: ai-tool-config-matrix
url: /kb/prompts/ai-tool-config-matrix/
title: "AI Tool Config Matrix: Every Config File Compared"
word_count: 2000-2500
status: 📝 Brief Ready
priority: P1
keywords:
  - "ai coding tool comparison"
  - "cursor rules comparison"
notes: |
  - Reference/matrix format
  - All config files in one place
  - Brief: prompts-series-batch4-comparisons.md
```

---

### Batch 5: Framework/Language Specific (Articles 82-87)

### 82. Prompts: Cursor Rules for Next.js
```yaml
type: prompts
slug: cursor-rules-nextjs
url: /kb/prompts/cursor-rules-nextjs/
title: "Cursor Rules for Next.js: App Router & Security Template"
word_count: 2000-2500
status: 📝 Brief Ready
priority: P0
keywords:
  - "cursor rules nextjs" (100 volume)
  - "next js cursor rules"
notes: |
  - Most popular framework
  - App Router focus (Next.js 13+)
  - Server Components rules
  - Brief: prompts-series-batch5-frameworks.md
```

### 83. Prompts: Cursor Rules for React
```yaml
type: prompts
slug: cursor-rules-react
url: /kb/prompts/cursor-rules-react/
title: "Cursor Rules for React: Components, Hooks & Best Practices"
word_count: 2000-2500
status: 📝 Brief Ready
priority: P1
keywords:
  - "cursor rules react" (80 volume)
  - "react cursor rules"
notes: |
  - React 18+ patterns
  - Hooks best practices
  - Brief: prompts-series-batch5-frameworks.md
```

### 84. Prompts: Cursor Rules for TypeScript
```yaml
type: prompts
slug: cursor-rules-typescript
url: /kb/prompts/cursor-rules-typescript/
title: "Cursor Rules for TypeScript: Strict Mode & Best Practices"
word_count: 2000-2500
status: 📝 Brief Ready
priority: P1
keywords:
  - "cursor rules typescript" (80 volume)
  - "typescript cursor rules"
notes: |
  - TypeScript strict mode
  - Zod schema patterns
  - Brief: prompts-series-batch5-frameworks.md
```

### 85. Prompts: AI Python Coding
```yaml
type: prompts
slug: ai-python-coding
url: /kb/prompts/ai-python-coding/
title: "AI Python Coding: Prompts, Rules & Best Practices"
word_count: 2000-2500
status: 📝 Brief Ready
priority: P1
keywords:
  - "ai python coding" (100 volume)
  - "python ai prompts"
notes: |
  - Python-specific coverage
  - FastAPI/Django patterns
  - Brief: prompts-series-batch5-frameworks.md
```

### 86. Prompts: Supabase Cursor Rules
```yaml
type: prompts
slug: supabase-cursor-rules
url: /kb/prompts/supabase-cursor-rules/
title: "Supabase Cursor Rules: RLS, Auth & Security Patterns"
word_count: 2000-2500
status: 📝 Brief Ready
priority: P0
keywords:
  - "supabase cursor rules" (emerging)
  - "cursor supabase"
notes: |
  - Popular vibe coding stack
  - RLS rules enforcement
  - Brief: prompts-series-batch5-frameworks.md
```

### 87. Prompts: Full-Stack Cursor Rules (PILLAR)
```yaml
type: prompts
slug: cursor-rules-fullstack
url: /kb/prompts/cursor-rules-fullstack/
title: "Full-Stack Cursor Rules: Complete Project Template"
word_count: 3000-3500
status: 📝 Brief Ready
priority: P0
pillar: true
keywords:
  - "cursor rules full stack" (50 volume)
  - "full stack cursorrules"
notes: |
  - PILLAR CONTENT - comprehensive template
  - Next.js + Supabase + TypeScript
  - Everything in one file
  - Brief: prompts-series-batch5-frameworks.md
```
