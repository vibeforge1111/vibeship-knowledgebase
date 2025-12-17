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
| 29 | 📝 Brief Ready | Concept (Agent Security) | mcp-server-security |
| 30 | 📝 Brief Ready | Vulnerability | broken-access-control |
| 31 | 📝 Brief Ready | Vulnerability | insecure-file-upload |
| 32 | 📝 Brief Ready | Tool | lovable |
| 33 | 📝 Brief Ready | Vulnerability | xxe |
| 34 | 📝 Brief Ready | Vulnerability | ssti |
| 35 | 📝 Brief Ready | Vulnerability | race-conditions |

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
status: BRIEF_READY
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
status: BRIEF_READY
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
status: BRIEF_READY
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
status: BRIEF_READY
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
status: BRIEF_READY
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
status: BRIEF_READY
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
