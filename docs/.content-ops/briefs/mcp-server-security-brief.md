# Content Brief: MCP Server Security

## Status

```yaml
status: DONE
created_at: 2025-12-17T20:30:00Z
created_by: Research Agent
claimed_by: Writer Agent
claimed_at: 2025-12-17T21:00:00Z
completed_at: 2025-12-17T21:30:00Z
```

---

## Article Metadata

```yaml
type: concept
slug: mcp-server-security
url: /kb/agents/security/mcp-servers/
title: "MCP Server Security: The Hidden Risks in AI Tool Integrations"
meta_description: "MCP servers connect AI tools to your data but expose you to tool poisoning, credential theft, and RCE. Learn attack vectors and secure your Claude Code, Cursor, and Windsurf setup."
owasp: A08:2021-Software and Data Integrity Failures
owasp_url: https://owasp.org/Top10/A08_2021-Software_and_Data_Integrity_Failures/
severity: Critical
word_count: 1800-2200
```

---

## Executive Summary

MCP (Model Context Protocol) is Anthropic's open standard launched November 2024 that lets AI tools like Claude Code, Cursor, and Windsurf connect to external data sources and tools. Think of it as "USB-C for AI applications." However, security researchers have discovered critical vulnerabilities including tool poisoning attacks, credential theft, and supply chain compromises. This article targets vibe coders using MCP servers who need to understand and mitigate these risks.

---

## Core Data

### Security References
- **Primary Standard:** Model Context Protocol (MCP) Specification
- **Related OWASP:** A08:2021 - Software and Data Integrity Failures
- **Related CWE:** CWE-94 (Code Injection), CWE-522 (Insufficiently Protected Credentials)
- **Severity:** Critical (multiple CVSS 9.0+ vulnerabilities identified)

### Key Research Sources

| Source | Finding | Date |
|--------|---------|------|
| Invariant Labs | Tool Poisoning Attacks (TPA) - malicious instructions in tool descriptions | 2025 |
| Wiz Security | Supply chain risks, RCE via GitHub documentation parser | 2025 |
| Pillar Security | Command injection, ~1000 exposed servers with no auth | 2025 |
| Bitsight Research | ~1000 MCP servers exposed without authorization | 2025 |

### Critical Vulnerabilities Discovered

| Vulnerability | Impact | CVSS | Affected |
|---------------|--------|------|----------|
| CVE-2025-6514 | Critical RCE in mcp-remote | 9.6 | v0.0.5-0.1.15 |
| Tool Poisoning | Data exfiltration, SSH key theft | High | All MCP clients |
| Tool Shadowing | Override trusted tool behavior | High | Multi-server setups |
| Rug Pull Attacks | Post-approval malicious changes | High | All MCP servers |

---

## Attack Vectors (Technical Deep-Dive)

### 1. Tool Poisoning Attack (TPA)

**What:** Malicious instructions embedded in MCP tool descriptions that are invisible to users but visible to AI models.

**How it works:**
1. Attacker creates MCP server with malicious tool
2. Tool description contains hidden instructions (invisible in UI, visible to AI)
3. When AI invokes tool, hidden instructions execute
4. AI extracts sensitive files (SSH keys, configs, tokens) via "legitimate" parameters

**Proof of Concept (Cursor):**
```
A seemingly innocent `add()` function was engineered to:
- Extract ~/.cursor/mcp.json (containing credentials)
- Extract ~/.ssh/id_rsa (SSH private key)
- Disguise extraction as mathematical parameters
- Provide fake mathematical explanations to mask intent
```

**Why vibe coders are vulnerable:** MCP server marketplace has no vetting. UI shows simplified tool descriptions hiding full AI-visible instructions.

### 2. Tool Shadowing

**What:** Malicious server overrides behavior of tools from trusted servers.

**How it works:**
1. User installs trusted email server + malicious "helper" server
2. Malicious server's tool descriptions poison the AI's understanding
3. AI redirects emails to attacker-controlled addresses
4. User sees "Email sent" confirmation without disclosure

**Example:** Email redirection attack where `send_email` appears to work normally but copies all mail to attacker.

### 3. Rug Pull Attacks

**What:** Server changes tool definitions after user has approved it.

**How it works:**
1. Server initially provides safe tool definitions
2. User approves server based on safe behavior
3. Server dynamically updates definitions to include malicious instructions
4. No re-approval required - attack proceeds silently

**Why it works:** MCP specification allows dynamic tool definitions. Most clients don't re-verify definitions after initial approval.

### 4. Supply Chain Attacks

**What:** Compromised or malicious packages in MCP ecosystem.

**Attack patterns:**
- **Typosquatting:** `mcp-github` vs `mcp-gihub`
- **Dependency confusion:** Public package with same name as internal
- **Legitimate compromise:** Trusted maintainer account compromised
- **Rug pulls:** Initially safe package updated with malware

**Wiz finding:** Installation resembles "pipe curl to bash" anti-pattern - no pinning, signing, or package locking.

### 5. Credential/Token Theft

**What:** MCP servers can request and store OAuth tokens for Gmail, Drive, GitHub, etc.

**Risk chain:**
1. User grants MCP server OAuth access to Gmail
2. Server stores refresh tokens
3. If server compromised or malicious, tokens enable:
   - Full email access
   - File exfiltration from Drive
   - Code repository access

**Bitsight research:** ~1000 MCP servers exposed without any authorization mechanism.

### 6. Remote Code Execution

**Real example (Wiz):** RCE achieved through external MCP server designed to parse GitHub documentation. Malicious content in README.md triggered code execution on user's machine.

**Why MCP enables this:** Servers run locally with user permissions. Malicious tool output can instruct AI to execute system commands.

---

## SEO Strategy

### Target Keywords
| Keyword | Search Intent | Priority |
|---------|---------------|----------|
| MCP security | informational | Primary |
| model context protocol security | informational | Primary |
| MCP server vulnerabilities | informational | Secondary |
| claude code MCP security | informational | Secondary |
| cursor MCP security | informational | Secondary |
| MCP tool poisoning | informational | Tertiary |
| AI agent security | informational | Tertiary |

### People Also Ask (FAQs)
1. What is MCP and why should I care about security?
2. Are official MCP servers safe to use?
3. How do I audit MCP servers before installing?
4. Can MCP servers access my files and credentials?
5. What is a tool poisoning attack?
6. How do I secure my Claude Code/Cursor MCP setup?

### Competitive Gap
**Top results analysis:**
- Official MCP docs: Architecture-focused, minimal security guidance
- Invariant Labs: Academic, focuses on tool poisoning only
- Wiz Security: Enterprise audience, comprehensive but technical
- Pillar Security: Good overview but lacks actionable fixes

**Our unique angle:**
- Vibe coder audience (Cursor/Claude Code users)
- Plain English explanations of attack vectors
- Practical security checklist for MCP setup
- AI fix prompt to audit existing configurations
- Tool comparison of MCP client security features

---

## Content Outline

### Quick Answer (50 words max)
MCP servers let AI tools access your files, databases, and APIs - but they also expose you to tool poisoning, credential theft, and code execution attacks. Before installing any MCP server, audit the source, limit permissions, and prefer local servers over remote ones.

### Section 1: What is MCP? (100-150 words)
- Plain English: "USB-C port for AI" - standardized way for AI tools to connect to external services
- Launched by Anthropic November 2024
- Used by Claude Code, Cursor, Windsurf, Cline
- Architecture: Host (AI app) → Client → Server
- Key benefit: Connect AI to Gmail, databases, GitHub, custom tools
- The security tradeoff: More power = more risk

### Section 2: Why Vibe Coders Should Care (100-150 words)
- MCP servers run locally with YOUR permissions
- They can access your filesystem, credentials, SSH keys
- No central vetting - anyone can publish MCP servers
- "Official" label doesn't mean audited (Wiz found unaffiliated "Azure" server)
- Supply chain risks similar to npm packages
- Quote Wiz: "Installation resembles pipe curl to bash anti-pattern"

### Section 3: The Attack Vectors (400-500 words)

**Tool Poisoning (200 words)**
- Definition + how it works
- The invisible instruction problem
- Cursor proof-of-concept (SSH key extraction)
- Why UI can't protect you

**Supply Chain Attacks (100 words)**
- Typosquatting, dependency confusion
- No package signing or locking
- Rug pull pattern

**Credential Theft (100 words)**
- OAuth token storage
- Cross-service attack chains
- ~1000 exposed servers (Bitsight)

**RCE via Tool Output (100 words)**
- GitHub README RCE example
- Why local execution is dangerous

### Section 4: Real-World Examples (150-200 words)
- CVE-2025-6514: mcp-remote critical RCE (CVSS 9.6)
- Cursor SSH key extraction demonstration
- Email redirection via tool shadowing
- "Official" Azure server with no Azure affiliation

### Section 5: Which AI Tools Use MCP? (100-150 words)
| Tool | MCP Support | Security Features |
|------|-------------|-------------------|
| Claude Code | Native | Approval prompts, local preference |
| Cursor | Native | Permission model, tool approval |
| Windsurf | Native | Basic approval |
| Cline | Native | Minimal security controls |
| VS Code + extensions | Via plugins | Varies by extension |

### Section 6: How to Secure Your MCP Setup (300-400 words)

**Before Installing Any Server:**
- [ ] Check source ownership and security track record
- [ ] Review server code if open source
- [ ] Prefer official/verified publishers
- [ ] Check for recent security audits

**During Configuration:**
- [ ] Use minimal OAuth scopes
- [ ] Prefer local servers over remote
- [ ] Enable all approval prompts
- [ ] Review tool descriptions carefully

**Ongoing Maintenance:**
- [ ] Pin server versions (no auto-update)
- [ ] Monitor for CVEs in your servers
- [ ] Audit connected accounts periodically
- [ ] Remove unused servers

**AI Fix Prompt:**
```
Review my MCP server configuration for security issues:

1. List all installed MCP servers from my config
2. For each server, assess:
   - Is the source trustworthy? (official repo, known publisher)
   - What permissions does it request?
   - Is it local or remote?
   - When was it last updated?
   - Are there any known CVEs?
3. Flag high-risk patterns:
   - Remote servers with filesystem access
   - Servers requesting OAuth tokens
   - Unknown/unverified publishers
   - Servers not pinned to specific versions
4. Recommend specific mitigations for each risk found
```

### Section 7: FAQ (5 questions, 50-100 words each)
- Use PAA questions above
- Each answer directly addresses the question first
- Include citable fact where possible

### Section 8: Related Content
- Link to Claude Code article
- Link to Cursor article
- Link to agent security concepts (if exists)
- Link to secure vibe coding guide (pillar)

---

## Internal Links (7-10 required)

| Anchor Text | URL | Context/Placement |
|-------------|-----|-------------------|
| Claude Code security patterns | /kb/vibe-coding-tools/claude-code/ | Tool comparison section |
| Cursor security patterns | /kb/vibe-coding-tools/cursor/ | Tool comparison section |
| Windsurf security patterns | /kb/vibe-coding-tools/windsurf/ | Tool comparison section |
| hardcoded secrets | /kb/security/vulnerabilities/hardcoded-secrets/ | Credential theft section |
| command injection | /kb/security/vulnerabilities/command-injection/ | RCE discussion |
| insecure deserialization | /kb/security/vulnerabilities/insecure-deserialization/ | RCE discussion |
| SQL injection | /kb/security/vulnerabilities/sql-injection/ | Related injections |
| Next.js + Supabase security | /kb/security/stacks/nextjs-supabase/ | Stack context |

---

## External Links (10-15 required)

| Anchor Text | URL | Tier | Placement |
|-------------|-----|------|-----------|
| Model Context Protocol | https://modelcontextprotocol.io/ | Official | Intro |
| MCP Specification | https://modelcontextprotocol.io/specification | Official | Architecture section |
| MCP Authorization | https://modelcontextprotocol.io/specification/2025-03-26/basic/authorization | Official | Security section |
| OWASP A08:2021 | https://owasp.org/Top10/A08_2021-Software_and_Data_Integrity_Failures/ | 1 | Intro |
| Invariant Labs Tool Poisoning | https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks | 2 | Tool poisoning section |
| Wiz MCP Security Research | https://www.wiz.io/blog/mcp-security-research-briefing | 2 | Multiple sections |
| Pillar Security MCP Analysis | https://www.pillar.security/blog/the-security-risks-of-model-context-protocol-mcp | 2 | Overview |
| Anthropic MCP Announcement | https://www.anthropic.com/news/model-context-protocol | Official | Background |
| CWE-94 Code Injection | https://cwe.mitre.org/data/definitions/94.html | 1 | RCE section |
| OAuth 2.1 Draft | https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-07 | 3 | Auth section |
| RFC 8414 OAuth Server Metadata | https://datatracker.ietf.org/doc/html/rfc8414 | 3 | Auth section |
| GitHub MCP Servers | https://github.com/modelcontextprotocol/servers | Official | Server examples |

---

## Notes for Writer Agent

### Tone Guidance
- **Critical but not alarmist:** These are real risks but MCP is also genuinely useful
- **Practical focus:** Vibe coders want to know "should I use this?" and "how do I stay safe?"
- **Emerging topic:** Acknowledge this is new and evolving rapidly
- **Empowering:** Give them agency with checklists and prompts

### Technical Accuracy
- MCP is open source and Anthropic-backed - not inherently malicious
- OAuth is recommended but OPTIONAL in the spec (key security gap)
- Tool poisoning requires malicious server installation first
- Local stdio transport is inherently safer than remote HTTP
- Claude Code and Cursor have approval flows, but they're not foolproof

### Things to Avoid
- Don't suggest MCP is inherently insecure (it's the ecosystem that's risky)
- Don't imply all MCP servers are malicious
- Don't over-complicate OAuth 2.1 explanations
- Don't forget the emerging nature - this is December 2024/early 2025 research

### Vibe Coding Terms
Use these 3-5 times naturally:
- vibe coding / vibe coders
- AI-generated code
- AI tools / AI assistants

### Value Maximizers
- Include CVE-2025-6514 details (shows this is real, not theoretical)
- Cursor SSH key extraction PoC (relatable to audience)
- Tool comparison table (people want to know which tools are safer)
- Complete security checklist (actionable takeaway)
- AI fix prompt for auditing existing setups

---

## Checklist Before Marking READY

- [x] All external links verified working
- [x] OWASP references correct (A08:2021)
- [x] 8 internal links identified
- [x] 6 PAA questions included
- [x] Competitive gap is specific
- [x] Attack vectors documented (5 patterns)
- [x] No placeholder text
- [x] Recent CVE included (CVE-2025-6514)
- [x] Multiple AI tools covered (Claude Code, Cursor, Windsurf, Cline)
- [x] Security checklist drafted
- [x] AI fix prompt included

---

**Brief Status:** READY for Writer Agent
