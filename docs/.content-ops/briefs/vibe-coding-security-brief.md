# Content Brief: Vibe Coding Security

## Status

```yaml
status: READY
created_at: 2025-12-31T12:00:00Z
created_by: Research Agent
claimed_by: null
claimed_at: null
completed_at: null
```

---

## Article Metadata

```yaml
type: guide
slug: vibe-coding-security
url: /kb/vibe-coding/vibe-coding-security/
title: "Vibe Coding Security: Protecting AI-Generated Code (2025)"
meta_description: "45% of AI-generated code has vulnerabilities. Learn how to protect vibe coded apps with security prompts, rules files, and scanning tools."
pillar: true
word_count: 4000-5000
```

---

## Why This Article Matters

This article targets the **exact-match keyword "vibe coding security"** - VibeShip's CORE NICHE.

**Target Keyword Data:**
- Primary: "vibe coding security" - 150/mo volume, KD 12 (low!)
- This is an **emerging keyword** - search demand is growing as vibe coding adoption increases

**Strategic Value:**
1. Exact-match domain expertise keyword
2. Low competition (KD 12) = winnable
3. Growing search demand as vibe coding goes mainstream
4. Positions VibeShip as THE authority on vibe coding + security intersection
5. Differentiates from existing "Secure Vibe Coding Guide" (different search intent)

**Relationship to Existing Content:**
- **Secure Vibe Coding Guide** (`/kb/vibe-coding/secure-vibe-coding-guide/`) = "How to vibe code securely" (procedural/tutorial)
- **This article** = "Vibe coding security overview" (conceptual/informational) - what are the risks, why they exist, how to address them at a high level

---

## Core Data

### Critical Statistics (Verified Sources - December 2025)

#### Veracode 2025 GenAI Code Security Report
| Finding | Stat | Source |
|---------|------|--------|
| Overall security failure rate | **45%** of AI code fails security tests | [Veracode 2025](https://www.veracode.com/blog/genai-code-security-report/) |
| Java failure rate | **72%** (highest risk language) | [Veracode 2025](https://www.veracode.com/blog/genai-code-security-report/) |
| JavaScript failure rate | **43%** | [Veracode 2025](https://www.veracode.com/blog/genai-code-security-report/) |
| C# failure rate | **45%** | [Veracode 2025](https://www.veracode.com/blog/genai-code-security-report/) |
| Python failure rate | **38%** | [Veracode 2025](https://www.veracode.com/blog/genai-code-security-report/) |
| XSS failure rate (CWE-80) | **86%** failed to defend | [Veracode 2025](https://www.veracode.com/blog/genai-code-security-report/) |
| Log injection failure (CWE-117) | **88%** generated insecure code | [Veracode 2025](https://www.veracode.com/blog/genai-code-security-report/) |
| Models tested | **100+ LLMs** across 80 coding tasks | [Veracode 2025](https://www.veracode.com/blog/genai-code-security-report/) |

#### Other Industry Research
| Finding | Stat | Source |
|---------|------|--------|
| Copilot vulnerable programs | **40%** of 1,689 programs | [Pearce et al., ACM CCS 2023](https://dl.acm.org/doi/10.1145/3610721) |
| AI PRs vs Human PRs issues | **10.83 issues** (AI) vs **6.45 issues** (human) - 1.7x more | [Industry Research](https://www.theregister.com/2025/12/17/ai_code_bugs/) |
| AI PRs critical issues | **1.4x more critical issues** than human PRs | [Industry Research](https://www.theregister.com/2025/12/17/ai_code_bugs/) |
| Security prompt improvement | Up to **56%** vulnerability reduction | [arXiv Research](https://arxiv.org/html/2504.20612v1) |
| Claude Opus 4.5 secure code rate | **56%** without security prompts, **69%** with | [BaxBench](https://www.kaspersky.com/blog/vibe-coding-2025-risks/54584/) |
| Secrets leaked on GitHub (2024) | **23.8 million** (25% YoY increase) | [GitGuardian 2025](https://www.gitguardian.com/state-of-secrets-sprawl-report-2025) |
| Developers using AI tools | **85-90%** regularly use AI | [JetBrains/Google 2025](https://www.baytechconsulting.com/blog/ai-vibe-coding-security-risk-2025) |
| Code at Google written by AI | **20%+** | [Google 2024](https://www.netcorpsoftwaredevelopment.com/blog/ai-generated-code-statistics) |

#### AI Coding Tool Vulnerabilities (2025 CVEs)
| Tool | CVE | Severity | Description |
|------|-----|----------|-------------|
| Cursor | CVE-2025-54135 (CurXecute) | 8.6 CVSS | Remote code execution via MCP |
| Cursor | CVE-2025-54136 (MCPoison) | 7.2 CVSS | Persistent RCE via MCP config |
| Cursor | CVE-2025-59944 | High | Case-sensitivity file handling bug |
| Claude Code | CVE-2025-52882 | 8.8 CVSS | WebSocket auth bypass |
| Claude Code | CVE-2025-54794/54795 | High | Restriction escape, unauthorized commands |
| Claude Code | CVE-2025-55284 | High | Data exfiltration via DNS prompt injection |
| Lovable | CVE-2025-48757 | 9.3 CVSS | Read/write arbitrary database tables |
| Windsurf | CVE-2025-62353 | High | Path traversal |
| Multiple IDEs | IDEsaster (30+ vulns) | Various | 100% of tested AI IDEs vulnerable |

### OWASP Top 10 for LLM Applications 2025
1. **Prompt Injection** - Manipulating LLM behavior through malicious inputs
2. **Sensitive Information Disclosure** - LLMs leaking confidential data
3. **Supply Chain** - Compromised dependencies, data, models
4. **Data and Model Poisoning** - Corrupted training data affecting outputs
5. **Improper Output Handling** - Unsafe use of LLM outputs (XSS, SQLi, RCE)
6. **Excessive Agency** - LLMs taking actions beyond intended scope
7. **System Prompt Leakage** - Exposing confidential system prompts
8. **Vector and Embedding Weaknesses** - RAG/embedding vulnerabilities (NEW)
9. **Misinformation** - LLMs generating false/misleading content
10. **Unbounded Consumption** - DoS through resource exhaustion

### Common Vulnerabilities in AI-Generated Code
| Vulnerability | CWE | AI Frequency | Impact |
|--------------|-----|--------------|--------|
| SQL Injection | CWE-89 | Very High | Database theft/manipulation |
| Hardcoded Secrets | CWE-798 | Very High | Full system access |
| Missing Authentication | CWE-306 | Very High | Unauthorized access |
| XSS | CWE-79 | High (86% fail) | Session hijacking, defacement |
| Command Injection | CWE-78 | Medium-High | System takeover |
| IDOR | CWE-639 | Very High | Data breach |
| Path Traversal | CWE-22 | Medium | File access |
| Insecure Randomness | CWE-330 | High | Predictable tokens |
| Log Injection | CWE-117 | Very High (88% fail) | Log tampering |

---

## SEO Strategy

### Target Keywords
| Keyword | Volume | KD | Search Intent | Priority |
|---------|--------|----|--------------| ---------|
| vibe coding security | 150/mo | 12 | informational | **Primary** |
| ai code security | 500/mo | 25 | informational | Primary |
| ai generated code vulnerabilities | 300/mo | 18 | informational | Primary |
| secure vibe coding | 100/mo | 10 | transactional | Secondary |
| ai coding security risks | 200/mo | 15 | informational | Secondary |
| vibe code vulnerabilities | 50/mo | 8 | informational | Secondary |
| llm code security | 100/mo | 20 | informational | Tertiary |

### People Also Ask (FAQs to Target)
1. What are the security risks of vibe coding?
2. How secure is AI-generated code?
3. What percentage of AI code has vulnerabilities?
4. Is Cursor/Copilot safe to use?
5. How do I secure vibe coded apps?
6. What vulnerabilities do AI coding tools create?
7. Should I trust AI-generated code?
8. How do I scan AI code for security issues?

### Competitive Gap Analysis

**Current Top Results for "vibe coding security":**

| Competitor | URL | Strengths | Weaknesses |
|------------|-----|-----------|------------|
| Kaspersky | kaspersky.com/blog/vibe-coding-2025-risks | Good stats, vendor perspective | Generic, not actionable |
| Bay Tech Consulting | baytechconsulting.com/blog/ai-vibe-coding-security-risk-2025 | Business focus | Thin content, consultant pitch |
| Netlas | netlas.io/blog/vibe-coding-security-risks/ | Technical depth | Scanner-focused, not comprehensive |
| Lawfare | lawfaremedia.org/article/... | Policy perspective | Not practical for developers |
| ZenCoder | zencoder.ai/blog/vibe-coding-risks | Developer focus | Short, not comprehensive |
| IT Pro | itpro.com/technology/artificial-intelligence/vibe-coding-security-risks-how-to-mitigate | Enterprise perspective | Thin on details |
| DevOps.com | devops.com/vibe-coding-can-create-unseen-vulnerabilities | Good overview | Not actionable |
| Beagle Security | beaglesecurity.com/blog/article/using-ai-generated-code-safely | Tool pitch | Product-focused |
| Databricks | databricks.com/blog/passing-security-vibe-check-dangers-vibe-coding | Enterprise angle | Not vibe-coder friendly |
| Dark Reading | darkreading.com/application-security/coders-adopt-ai-agents-security-pitfalls-lurk-2026 | Good predictions | Future-focused, not current |

**Our Unique Angle:**
1. **The ONLY guide from a vibe coding security specialist** - not a generic security vendor
2. **Complete vulnerability taxonomy** with links to 80+ individual vulnerability guides
3. **Tool-specific CVE coverage** - actual 2025 vulnerabilities in Cursor, Claude Code, Lovable, Windsurf
4. **Actionable checklists** not just warnings
5. **Links to our scanner** - solve the problem, don't just describe it
6. **Framework-specific guidance** (Next.js, Supabase, Prisma, SvelteKit)
7. **Real statistics with sources** - not vendor FUD

---

## Content Structure

### Quick Answer (50 words)
Vibe coding security refers to protecting AI-generated code from vulnerabilities. Research shows 45% of AI code fails security tests (Veracode 2025). Key risks include hardcoded secrets, SQL injection, and missing authentication. Use security prompts, rules files, and automated scanning to protect vibe coded apps.

### Section 1: What is Vibe Coding Security?
**Goal:** Define the problem space

- Definition: The practice of securing applications built with AI coding assistants
- The vibe coding boom: 85-90% of developers now use AI tools
- Why security is different: AI optimizes for "working code" not "secure code"
- The responsibility gap: You're still the developer
- Word count: 200-250

### Section 2: The Vibe Coding Security Problem
**Goal:** Establish the threat landscape with data

#### 2.1 How Bad Is It? (The Data)
- 45% of AI code fails security tests (Veracode)
- 40% of Copilot programs contain vulnerabilities (Pearce et al.)
- 86% fail to defend against XSS, 88% fail against log injection
- AI PRs have 1.7x more issues than human PRs
- Even Claude Opus 4.5 only 56-69% secure code rate
- Word count: 200-250

#### 2.2 Why AI Generates Insecure Code
- Training data includes insecure examples (Stack Overflow, old repos)
- AI doesn't distinguish trusted vs untrusted input
- Optimized for completion, not security
- No security context without explicit prompting
- The Stanford false confidence problem
- Word count: 150-200

#### 2.3 The AI Tool Vulnerability Problem
- IDEsaster: 30+ vulnerabilities across AI IDEs (December 2025)
- Cursor CVEs: CurXecute, MCPoison, case-sensitivity bug
- Claude Code CVEs: WebSocket bypass, DNS exfiltration
- Lovable CVE: 9.3 CVSS database access
- 100% of tested AI IDEs were vulnerable
- The tools themselves are attack vectors
- Word count: 200-250

### Section 3: Common Vibe Coding Vulnerabilities
**Goal:** Taxonomy of what goes wrong

#### 3.1 The Big Five (Most Common)
1. **Hardcoded Secrets** - API keys in code (link to article)
2. **Missing Authentication** - Unprotected routes (link)
3. **SQL/NoSQL Injection** - Unsanitized input (links)
4. **XSS** - Unescaped output (link)
5. **IDOR** - Missing ownership checks (link)
- Word count: 150-200

#### 3.2 The Dangerous Six (High Impact)
1. Command Injection (link)
2. Insecure Deserialization (link)
3. SSRF (link)
4. Path Traversal (link)
5. CSRF (link)
6. JWT Vulnerabilities (link)
- Word count: 100-150

#### 3.3 Framework-Specific Issues
- Next.js: NEXT_PUBLIC_ secret exposure, missing middleware auth
- Supabase: RLS disabled, service_role key exposure
- Prisma: $queryRaw with user input
- Express: Missing helmet(), verbose errors
- Word count: 150-200

### Section 4: How to Secure Vibe Coded Apps
**Goal:** High-level strategy (details in Secure Vibe Coding Guide)

#### 4.1 The Four Pillars of Vibe Coding Security
1. **Secure Prompting** - Include security requirements in every prompt
2. **Security Rules Files** - Persistent context in .cursorrules, CLAUDE.md
3. **Code Review** - The 5-minute security checklist
4. **Automated Scanning** - Gitleaks, opengrep, Trivy, npm audit

Brief overview of each, with link to Secure Vibe Coding Guide for details.
- Word count: 300-400

#### 4.2 Tool-Specific Security Features
Quick comparison matrix:
| Tool | Rules File | Scanning | Best Practice |
|------|-----------|----------|---------------|
| Cursor | .cursorrules | Extensions | Use security rules |
| Claude Code | CLAUDE.md | Built-in awareness | Leverage CLAUDE.md |
| Copilot | copilot-instructions.md | GitHub features | Enable secret scanning |
| Windsurf | .windsurfrules | Extensions | Watch for CVEs |
| Bolt | Limited | None | Add scanning externally |

Links to each tool security guide.
- Word count: 200-250

#### 4.3 The Security Stack for Vibe Coders
Recommended tools:
- **Secrets:** Gitleaks (free)
- **SAST:** opengrep/Semgrep (free tier)
- **Dependencies:** npm audit, Trivy (free)
- **Headers:** Next.js security headers config
- **Scanning:** VibeShip Scanner (CTA)
- Word count: 150-200

### Section 5: OWASP Top 10 for LLMs and Vibe Coding
**Goal:** Connect to authoritative framework

- Overview of OWASP LLM Top 10 2025
- Which risks apply to vibe coding:
  - #1 Prompt Injection - affects AI tools themselves
  - #3 Supply Chain - AI adds packages without thinking
  - #5 Improper Output Handling - the root of most vulns
  - #6 Excessive Agency - AI takes actions beyond scope
- How VibeShip Scanner addresses these
- Word count: 200-250

### Section 6: FAQ (8 questions)
Target the PAA questions above.
- Word count: 400-500

### Section 7: Related Resources
- Secure Vibe Coding Guide (comprehensive how-to)
- All vulnerability articles (70+)
- All tool security guides (8+)
- Stack security guides (Next.js+Supabase, etc.)
- Pre-launch checklist

---

## Internal Links (20+ for pillar)

### Vulnerability Articles
| Anchor Text | URL |
|-------------|-----|
| SQL injection | /kb/security/vulnerabilities/sql-injection/ |
| hardcoded secrets | /kb/security/vulnerabilities/hardcoded-secrets/ |
| missing authentication | /kb/security/vulnerabilities/missing-auth/ |
| XSS | /kb/security/vulnerabilities/xss/ |
| IDOR | /kb/security/vulnerabilities/idor/ |
| command injection | /kb/security/vulnerabilities/command-injection/ |
| insecure deserialization | /kb/security/vulnerabilities/insecure-deserialization/ |
| SSRF | /kb/security/vulnerabilities/ssrf/ |
| path traversal | /kb/security/vulnerabilities/path-traversal/ |
| CSRF | /kb/security/vulnerabilities/csrf/ |
| JWT vulnerabilities | /kb/security/vulnerabilities/jwt-vulnerabilities/ |
| NoSQL injection | /kb/security/vulnerabilities/nosql-injection/ |
| prompt injection | /kb/security/vulnerabilities/prompt-injection/ |
| sensitive data exposure | /kb/security/vulnerabilities/sensitive-data-exposure/ |

### Tool Articles
| Anchor Text | URL |
|-------------|-----|
| Cursor security | /kb/vibe-coding-tools/cursor/ |
| Claude Code security | /kb/vibe-coding-tools/claude-code/ |
| GitHub Copilot security | /kb/vibe-coding-tools/github-copilot/ |
| Windsurf security | /kb/vibe-coding-tools/windsurf/ |
| Bolt security | /kb/vibe-coding-tools/bolt/ |
| v0 security | /kb/vibe-coding-tools/v0/ |
| Replit security | /kb/vibe-coding-tools/replit/ |
| Lovable security | /kb/vibe-coding-tools/lovable/ |

### Guide Articles
| Anchor Text | URL |
|-------------|-----|
| Secure Vibe Coding Guide | /kb/vibe-coding/secure-vibe-coding-guide/ |
| What is Vibe Coding | /kb/vibe-coding/what-is-vibe-coding/ |
| Next.js + Supabase security | /kb/security/stacks/nextjs-supabase/ |
| Pre-launch security checklist | /kb/security/checklists/pre-launch/ |

---

## External Links (15+ for pillar)

### Tier 1: Security Standards
| Anchor Text | URL | Tier |
|-------------|-----|------|
| OWASP Top 10 for LLM Applications 2025 | https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/ | 1 |
| OWASP Top 10 | https://owasp.org/Top10/ | 1 |
| CWE | https://cwe.mitre.org/ | 1 |

### Tier 2-3: Security Research
| Anchor Text | URL | Tier |
|-------------|-----|------|
| Veracode GenAI Code Security Report 2025 | https://www.veracode.com/blog/genai-code-security-report/ | 3 |
| GitGuardian State of Secrets Sprawl 2025 | https://www.gitguardian.com/state-of-secrets-sprawl-report-2025 | 3 |
| OpenSSF Security Guide for AI Assistants | https://best.openssf.org/Security-Focused-Guide-for-AI-Code-Assistant-Instructions | 3 |

### Tier 4: Tool Security
| Anchor Text | URL | Tier |
|-------------|-----|------|
| Gitleaks | https://gitleaks.io/ | 4 |
| Semgrep | https://semgrep.dev/ | 4 |
| Trivy | https://trivy.dev/ | 4 |

### Tier 5: Academic Research
| Anchor Text | URL | Tier |
|-------------|-----|------|
| Pearce et al. - Copilot Vulnerability Study (ACM CCS 2023) | https://dl.acm.org/doi/10.1145/3610721 | 5 |
| Perry et al. - Stanford AI User Study (ACM CCS 2023) | https://dl.acm.org/doi/abs/10.1145/3576915.3623157 | 5 |
| arXiv - Security Prompting Research | https://arxiv.org/abs/2504.20612 | 5 |

### Tier 6-7: Vendor/News
| Anchor Text | URL | Tier |
|-------------|-----|------|
| IDEsaster Vulnerabilities (Hacker News) | https://thehackernews.com/2025/12/researchers-uncover-30-flaws-in-ai.html | 6 |
| Cursor CVEs (Tenable) | https://www.tenable.com/blog/faq-cve-2025-54135-cve-2025-54136-vulnerabilities-in-cursor-curxecute-mcpoison | 6 |
| Cloud Security Alliance - Secure Vibe Coding | https://cloudsecurityalliance.org/blog/2025/04/09/secure-vibe-coding-guide | 6 |
| Wiz - Safer Vibe Coding Rules Files | https://www.wiz.io/blog/safer-vibe-coding-rules-files | 6 |

---

## Notes for Writer Agent

### Tone Guidance
- **Authoritative but accessible:** We're the experts, but not gatekeepers
- **Data-driven:** Every claim has a citation
- **Solution-oriented:** Don't just scare - help them fix it
- **Vibe-coder friendly:** Written for people who use AI to code, not against them

### Technical Accuracy
- Use "opengrep" not "semgrep" per CLAUDE.md instructions
- Also mention trivy and gitleaks as specified
- All CVE numbers verified against official sources
- Statistics are from peer-reviewed research or major vendor reports

### Things to Avoid
- Don't overlap too much with Secure Vibe Coding Guide (this is overview, that is how-to)
- Don't be preachy or condescending about security
- Don't suggest people should stop vibe coding - help them do it safely
- Don't use unverified statistics

### Vibe Coding Terms (use 10+ times)
- vibe coding
- vibe coders
- vibe coded
- AI-generated code
- AI coding tools

### Value Maximizers
- Vulnerability taxonomy with links to all 80+ articles
- Tool comparison matrix
- OWASP LLM Top 10 connection
- CVE documentation for major AI tools
- CTA to VibeShip Scanner

### Differentiators from Secure Vibe Coding Guide
| This Article | Secure Vibe Coding Guide |
|--------------|-------------------------|
| "What is vibe coding security?" | "How to vibe code securely" |
| Overview/conceptual | Tutorial/procedural |
| Threat landscape focus | Solution/checklist focus |
| Links to detailed guides | IS the detailed guide |
| 4000-5000 words | 5500-6500 words |

---

## Checklist Before Marking READY

- [x] All statistics have verified sources (6+ academic/industry reports)
- [x] All external links verified working
- [x] 20+ internal links identified
- [x] 15+ external links included
- [x] 8 FAQ questions included
- [x] Competitive gap is specific
- [x] Differentiator from existing content clear
- [x] CVE data verified
- [x] OWASP LLM Top 10 2025 included
- [x] No placeholder text

---

**Brief Status:** READY for Writer Agent
