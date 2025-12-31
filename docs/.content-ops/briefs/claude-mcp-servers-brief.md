# Content Brief: Best Claude MCP Servers Guide

## Status

```yaml
status: READY
created_at: 2025-12-31T16:00:00Z
created_by: Research Agent
claimed_by: null
claimed_at: null
completed_at: null
```

---

## Article Metadata

```yaml
type: guide
slug: best-mcp-servers
url: /kb/agents/tools/best-mcp-servers/
title: "Best MCP Servers for Claude Code, Cursor & AI Coding (2025)"
meta_description: "The 20+ best MCP servers ranked by category. Complete setup guide for Claude Code, Cursor, Windsurf with security best practices. 41K monthly searches."
word_count: 3500-4500
```

---

## Executive Summary

MCP (Model Context Protocol) is Anthropic's open standard that lets AI tools like Claude Code and Cursor connect to external services - databases, APIs, browsers, files, and hundreds of other tools. This is a HIGH VOLUME opportunity: "mcp server" has 41,000 monthly searches with 75 KD, and the total MCP ecosystem gets 6.8-7 million monthly downloads. This article will be the definitive guide to the best MCP servers, organized by category, with setup instructions and security warnings for each.

**Key Stats:**
- 41,000/mo searches for "mcp server" (Ahrefs)
- 7,800/mo for "playwright mcp" at 13 KD
- 4,500/mo for "claude mcp" at 57 KD
- 23,000/mo for "model context protocol" at 77 KD
- 6.8-7 million monthly MCP server downloads
- 5,500+ servers listed on PulseMCP registry
- 40% fewer tool switches for developers using MCP (Anthropic data)

---

## Core Data

### Primary References
| Reference | Source | Link |
|-----------|--------|------|
| Official MCP Servers | Anthropic GitHub | https://github.com/modelcontextprotocol/servers |
| MCP Protocol Spec | Anthropic | https://modelcontextprotocol.io/ |
| MCP Examples | Anthropic | https://modelcontextprotocol.io/examples |
| Awesome MCP Servers | punkpeye | https://github.com/punkpeye/awesome-mcp-servers |
| MCP Server Directory | PulseMCP | https://www.pulsemcp.com/servers |

### External Sources (for outbound links)
| Source | URL | Key Finding | Tier |
|--------|-----|-------------|------|
| Official MCP Servers Repo | https://github.com/modelcontextprotocol/servers | Reference implementations | Official |
| MCP Protocol | https://modelcontextprotocol.io/ | Protocol specification | Official |
| Anthropic MCP Announcement | https://www.anthropic.com/news/model-context-protocol | Launch context | Official |
| PulseMCP Registry | https://www.pulsemcp.com/servers | 5,500+ servers listed | 7 |
| MCP Manager Stats | https://mcpmanager.ai/blog/mcp-adoption-statistics/ | 180K+ monthly searches for top 20 servers | Blog |
| Firecrawl Blog | https://www.firecrawl.dev/blog/best-mcp-servers-for-cursor | Best servers for Cursor | Blog |
| Apidog Guide | https://apidog.com/blog/top-10-mcp-servers-for-claude-code/ | Top 10 for Claude Code | Blog |
| Supabase MCP Docs | https://supabase.com/docs/guides/getting-started/mcp | Official Supabase MCP | 6 |
| Sentry MCP Docs | https://docs.sentry.io/product/sentry-mcp/ | Error monitoring integration | 6 |
| Desktop Commander | https://desktopcommander.app/blog/2025/11/25/best-mcp-servers/ | 22 best servers list | Blog |
| Semgrep MCP Guide | https://semgrep.dev/blog/2025/a-security-engineers-guide-to-mcp/ | Security engineer perspective | 2 |
| Wiz MCP Security | https://www.wiz.io/blog/mcp-security-research-briefing | Security vulnerabilities | 2 |
| Invariant Labs | https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks | Tool poisoning attacks | 2 |
| Claude Code MCP Docs | https://code.claude.com/docs/en/mcp | Official Claude Code docs | Official |

### Key Facts to Include
- 41K monthly searches for "mcp server" (Ahrefs, 2025)
- 6.8-7 million monthly MCP server downloads (MCP Manager)
- 5,500+ MCP servers on PulseMCP registry
- 40% fewer tool switches for developers using MCP (Anthropic 2025)
- 80% of top 20 most searched MCP servers provide remote servers
- Over 1,470 MCP servers have tool name collisions (e.g., "search" appears in 32 servers)
- Launched by Anthropic November 2024
- ~1,000 MCP servers exposed without authorization (Bitsight)

---

## SEO Strategy

### Target Keywords
| Keyword | Volume | KD | Search Intent | Priority |
|---------|--------|-----|---------------|----------|
| mcp server | 41,000 | 75 | informational | Primary |
| best mcp servers | 2,000+ | - | commercial | Primary |
| claude mcp | 4,500 | 57 | informational | Primary |
| model context protocol | 23,000 | 77 | informational | Secondary |
| mcp servers list | 1,000+ | - | informational | Secondary |
| claude code mcp | 3,000 | 47 | informational | Secondary |
| cursor mcp server | 500 | - | informational | Secondary |
| playwright mcp | 7,800 | 13 | informational | Tertiary |
| github mcp server | 500+ | - | navigational | Tertiary |

### Related High-Volume Keywords (Context)
| Keyword | Volume | Notes |
|---------|--------|-------|
| claude code | 12,000 | Parent topic for tools |
| cursor ai | 33,000 | Related AI tool |
| ai coding assistant | 8,100 | Broader category |

### People Also Ask (FAQs)
1. What are the best MCP servers for Claude Code?
2. How do I set up MCP servers in Cursor?
3. What is the Model Context Protocol (MCP)?
4. Are MCP servers safe to use?
5. Which MCP servers work with Windsurf?
6. How do I connect Claude to databases via MCP?
7. What are the most popular MCP servers in 2025?
8. Can I create my own MCP server?

### Competitive Gap
**Top results analysis:**
- Desktop Commander blog: Good list but lacks security focus
- Apidog: Top 10 only, Claude Code focused
- Firecrawl: Cursor-focused, misses many servers
- Medium articles: Scattered, inconsistent quality
- GitHub READMEs: Technical, no curation or security guidance

**Our unique angle:**
- COMPREHENSIVE: 20+ servers organized by category
- SECURITY-FIRST: Security rating and warnings for each server
- MULTI-PLATFORM: Setup for Claude Code, Cursor, Windsurf, VS Code
- PRACTICAL: Real config examples with copy buttons
- LINKED: Cross-references to our MCP Security article and tool guides

---

## Content Outline

### Quick Answer (50 words max)
The best MCP servers for Claude Code and Cursor include GitHub (version control), Filesystem (local files), PostgreSQL (databases), Context7 (documentation), and Playwright (browser automation). Install with `npx -y @modelcontextprotocol/server-{name}` and add to your IDE's MCP config file.

### Section 1: What is MCP and Why It Matters (150-200 words)
- Plain English: "USB-C for AI" - universal connector for AI tools
- Launched by Anthropic November 2024
- Key benefit: AI can access real data - files, databases, APIs, browsers
- Market size: 41K searches/mo, 7M downloads/mo, 5,500+ servers
- Who uses it: Claude Code, Cursor, Windsurf, Cline, VS Code
- Security tradeoff: More power = more attack surface
- Link to: /kb/agents/security/mcp-servers/

### Section 2: Quick Start - How to Install MCP Servers (300-400 words)

**Prerequisites:**
- Node.js 18+ installed
- One of: Claude Code, Cursor, Windsurf, VS Code

**Claude Code Setup:**
```bash
# Add via CLI
claude mcp add filesystem -s user -- npx -y @modelcontextprotocol/server-filesystem ~/Documents ~/Projects

# Or edit ~/.config/claude-code/mcp.json
```

**Cursor Setup:**
```json
// ~/.cursor/mcp.json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/files"]
    }
  }
}
```

**Windsurf Setup:**
- Similar config file location
- Include specific path

**VS Code Setup:**
```bash
code --add-mcp '{"name":"filesystem","command":"npx","args":["-y","@modelcontextprotocol/server-filesystem","/path"]}'
```

**Windows-Specific:**
- Use full path: `C:\\Program Files\\nodejs\\npx.cmd`
- Backslash escaping in JSON

### Section 3: Essential MCP Servers (Core Tools) (400-500 words)

**3.1 GitHub MCP Server**
- What: Version control integration - commits, PRs, issues, branches
- Install: `npx -y @modelcontextprotocol/server-github`
- Requires: `GITHUB_PERSONAL_ACCESS_TOKEN` env var
- Security: OAuth scope should be minimal; don't grant full repo access
- Best for: Code review, PR management, issue tracking
- Link: https://github.com/modelcontextprotocol/servers/tree/main/src/github

**3.2 Filesystem MCP Server**
- What: Secure local file operations with access controls
- Install: `npx -y @modelcontextprotocol/server-filesystem /allowed/paths`
- Security: Only grant access to specific directories, never root
- Best for: Editing code, managing project files
- Link: Official reference server

**3.3 Memory MCP Server**
- What: Knowledge graph-based persistent memory
- Install: `npx -y @modelcontextprotocol/server-memory`
- Best for: Long-term context, cross-session memory
- Use case: "Remember my coding preferences"

**3.4 Git MCP Server**
- What: Local Git repo operations (distinct from GitHub API)
- Install: `uvx mcp-server-git --repository path/to/repo`
- Best for: Local commits, diffs, history without GitHub

**3.5 PostgreSQL MCP Server**
- What: Natural language database queries
- Install: `npx -y @modelcontextprotocol/server-postgres postgresql://localhost/db`
- Security: Use read-only credentials, never production write access
- Best for: Data analysis, report generation

### Section 4: Productivity & Documentation MCP Servers (300-400 words)

**4.1 Context7 MCP**
- What: Fetches real documentation for exact library versions
- Install: `npx -y @upstash/context7-mcp` or remote URL
- Why it matters: No hallucinated APIs, working code first try
- Supports: 20+ clients including all major IDEs
- Best for: Framework/library questions

**4.2 Notion MCP Server**
- What: Direct Notion API integration
- Best for: Documentation management, note access
- Use case: "Update my project notes"

**4.3 Slack MCP Server**
- What: Team communication automation
- Best for: Drafting replies, summarizing threads
- Security: Be careful with OAuth scopes

**4.4 Linear MCP Server**
- What: Issue tracking and project management
- Best for: Ticket verification, sprint management
- Note: Linear runs popular public MCP servers

### Section 5: Web & Browser MCP Servers (300-400 words)

**5.1 Playwright MCP Server**
- What: AI-powered browser automation via accessibility tree
- Install: `npx @playwright/mcp@latest`
- By: Microsoft (not Anthropic!)
- Best for: Testing, scraping, form automation
- Security: Use `--isolated` mode, `--allowed-origins` restrictions
- Volume: 7,800/mo searches at 13 KD
- Link to: /kb/agents/tools/playwright-mcp/

**5.2 Puppeteer MCP Server**
- What: Browser automation with full JavaScript control
- Install: `npx -y @modelcontextprotocol/server-puppeteer`
- Best for: Screenshots, JS execution, console monitoring

**5.3 Firecrawl MCP Server**
- What: Web scraping with JavaScript rendering
- Requires: `FIRECRAWL_API_KEY`
- Best for: Data extraction, content aggregation

**5.4 Browserbase MCP Server**
- What: Cloud browser automation
- Best for: Headless workflows, CI/CD pipelines

**5.5 Fetch MCP Server**
- What: Web content fetching and markdown conversion
- Official reference server
- Best for: Simple page retrieval

### Section 6: Development & DevOps MCP Servers (300-400 words)

**6.1 Sentry MCP Server**
- What: Error monitoring and debugging integration
- Official: https://docs.sentry.io/product/sentry-mcp/
- Best for: Troubleshooting issues, creating fix plans
- Quote: "Give Cursor a Sentry issue link and ask it to troubleshoot"

**6.2 Supabase MCP Server**
- What: Create tables, query data, deploy edge functions
- Official: https://supabase.com/docs/guides/getting-started/mcp
- Auth: Dynamic client registration (no PAT needed)
- Best for: Full-stack Supabase development

**6.3 Docker MCP Server**
- What: Container management and operations
- Best for: DevOps automation

**6.4 Kubernetes MCP Server**
- What: K8s cluster interaction
- Best for: Cloud-native development

**6.5 AWS/GCP/Azure MCP Servers**
- Various community servers for cloud integration
- Security warning: Be extremely careful with cloud credentials

### Section 7: AI & Search MCP Servers (200-300 words)

**7.1 Qdrant MCP Server**
- What: Vector search and semantic memory
- Official: https://github.com/qdrant/mcp-server-qdrant
- Best for: Code search, documentation retrieval

**7.2 Exa MCP Server**
- What: Real-time web search
- Best for: Current information retrieval

**7.3 Sequential Thinking MCP Server**
- What: Structured problem-solving through thought sequences
- Official reference server
- Best for: Breaking down complex tasks

**7.4 Ahrefs MCP Server**
- What: SEO data and keyword research
- Official: https://www.pulsemcp.com/servers/ahrefs
- Best for: Content strategy, competitor analysis

### Section 8: Design & Creative MCP Servers (150-200 words)

**8.1 Figma MCP Server**
- What: Design-to-code workflows
- Best for: Implementing designs accurately, generating style guides
- Use case: "Code this Figma component"

**8.2 Apidog MCP Server**
- What: API specification integration
- Best for: Working with OpenAPI/Swagger docs

### Section 9: Security Considerations (300-400 words)

**Must Read:** Link to /kb/agents/security/mcp-servers/

**Key Risks:**
- MCP servers run with YOUR local permissions
- Can access filesystem, credentials, SSH keys
- No central vetting - anyone can publish servers
- ~1,000 servers exposed without authorization (Bitsight)

**Attack Vectors (Summary):**
1. Tool Poisoning: Hidden malicious instructions in tool descriptions
2. Supply Chain: Typosquatting, dependency confusion
3. Credential Theft: OAuth token storage and exfiltration
4. Rug Pulls: Post-approval definition changes

**Security Checklist:**
- [ ] Only install from verified publishers
- [ ] Review source code for open-source servers
- [ ] Use minimal OAuth scopes
- [ ] Prefer local (stdio) over remote (HTTP) servers
- [ ] Pin server versions - no auto-updates
- [ ] Grant minimal filesystem access
- [ ] Never use production database credentials
- [ ] Regularly audit installed servers

**Safe Configuration Example:**
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem@1.0.0",
        "/allowed/path/only"
      ]
    }
  }
}
```
Note: Version pinned, restricted path.

### Section 10: MCP Server Comparison Table (Full Width)

| Server | Category | Official | Security Risk | Setup Complexity |
|--------|----------|----------|---------------|------------------|
| GitHub | Development | Yes | Medium (OAuth) | Easy |
| Filesystem | Core | Yes | High (file access) | Easy |
| PostgreSQL | Database | Yes | High (DB access) | Medium |
| Context7 | Documentation | Community | Low | Easy |
| Playwright | Browser | Microsoft | Medium | Easy |
| Firecrawl | Scraping | Community | Medium (API key) | Easy |
| Supabase | Database | Official | Medium | Easy |
| Sentry | Monitoring | Official | Low | Easy |
| Notion | Productivity | Community | Medium (OAuth) | Medium |
| Memory | Core | Yes | Low | Easy |

### Section 11: Troubleshooting Common Issues (200-250 words)

**"Cannot connect to MCP server" (Windows)**
- Solution: Use full path `C:\\Program Files\\nodejs\\npx.cmd`

**"Tool browser_navigate: undefined" (Playwright)**
- Solution: Run `npx playwright install`

**"MCP server has tools with invalid parameters"**
- Solution: `npm cache clean --force && npx @...`

**Too many servers causing issues**
- Best practice: Limit to 5 active servers
- Tool name collisions possible (32 servers use "search")

### FAQ Section (8 questions, 75-100 words each)
Use PAA questions above

### Related Content
- MCP Server Security (critical companion)
- Playwright MCP Server (detailed guide)
- Claude Code patterns
- Cursor setup guide
- Windsurf patterns

---

## Internal Links (10-15 required)

| Anchor Text | URL | Context/Placement |
|-------------|-----|-------------------|
| MCP Server Security | /kb/agents/security/mcp-servers/ | Security section (CRITICAL) |
| Playwright MCP Server | /kb/agents/tools/playwright-mcp/ | Browser section |
| Claude Code | /kb/vibe-coding-tools/claude-code/ | Setup section |
| Cursor | /kb/vibe-coding-tools/cursor/ | Setup section |
| Windsurf | /kb/vibe-coding-tools/windsurf/ | Setup section |
| CLAUDE.md file | /kb/prompts/claude-md/ | Configuration context |
| Cursor rules | /kb/prompts/cursor-rules/ | Configuration context |
| hardcoded secrets | /kb/security/vulnerabilities/hardcoded-secrets/ | Security section |
| command injection | /kb/security/vulnerabilities/command-injection/ | Security risks |
| prompt injection | /kb/security/vulnerabilities/prompt-injection/ | Security risks |
| dependency confusion | /kb/security/vulnerabilities/dependency-confusion/ | Supply chain risks |
| pre-launch security checklist | /kb/security/checklists/pre-launch/ | Security best practices |
| what is vibe coding | /kb/vibe-coding/what-is-vibe-coding/ | Intro context |

---

## External Links (15-20 required)

| Anchor Text | URL | Tier | Placement |
|-------------|-----|------|-----------|
| Model Context Protocol | https://modelcontextprotocol.io/ | Official | Intro |
| Official MCP Servers | https://github.com/modelcontextprotocol/servers | Official | Throughout |
| MCP Examples | https://modelcontextprotocol.io/examples | Official | Setup |
| Anthropic MCP Announcement | https://www.anthropic.com/news/model-context-protocol | Official | Background |
| Claude Code MCP Docs | https://code.claude.com/docs/en/mcp | Official | Claude setup |
| PulseMCP Registry | https://www.pulsemcp.com/servers | 7 | Discovery |
| Awesome MCP Servers | https://github.com/punkpeye/awesome-mcp-servers | Community | Discovery |
| Supabase MCP Docs | https://supabase.com/docs/guides/getting-started/mcp | 6 | Supabase section |
| Sentry MCP Docs | https://docs.sentry.io/product/sentry-mcp/ | 6 | Sentry section |
| Context7 | https://github.com/upstash/context7 | Community | Docs section |
| Playwright MCP | https://github.com/microsoft/playwright-mcp | 7 | Browser section |
| Firecrawl MCP | https://github.com/firecrawl/firecrawl-mcp-server | Community | Scraping section |
| Qdrant MCP | https://github.com/qdrant/mcp-server-qdrant | 7 | AI section |
| Wiz MCP Security | https://www.wiz.io/blog/mcp-security-research-briefing | 2 | Security section |
| Invariant Labs | https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks | 2 | Security section |
| Semgrep MCP Guide | https://semgrep.dev/blog/2025/a-security-engineers-guide-to-mcp/ | 2 | Security section |

---

## Code Examples Needed

### Example 1: Basic Claude Code MCP Config
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "~/Documents", "~/Projects"]
    },
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    }
  }
}
```
Explanation: Minimal secure setup with file access and memory

### Example 2: Full Stack Developer Config
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "~/code"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://readonly:pass@localhost/devdb"]
    },
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    }
  }
}
```
Explanation: Common setup for web developers with version control, database, and docs

### Example 3: Windows Configuration
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "C:\\Program Files\\nodejs\\npx.cmd",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "C:\\Users\\dev\\Documents",
        "C:\\Users\\dev\\Projects"
      ]
    }
  }
}
```
Explanation: Windows requires full path to npx.cmd

### Example 4: Cursor with Playwright
```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest", "--isolated", "--allowed-origins", "localhost"]
    }
  }
}
```
Explanation: Secure browser automation with origin restrictions

### Example 5: CLI Installation (Claude Code)
```bash
# Filesystem
claude mcp add filesystem -s user -- npx -y @modelcontextprotocol/server-filesystem ~/Documents ~/Projects

# GitHub
claude mcp add github -s user -e GITHUB_TOKEN=ghp_xxx -- npx -y @modelcontextprotocol/server-github

# PostgreSQL
claude mcp add postgres -s user -e DATABASE_URL=postgresql://... -- npx -y @modelcontextprotocol/server-postgres
```
Explanation: CLI approach for Claude Code users

---

## Notes for Writer Agent

### Tone Guidance
- **Practical and comprehensive:** This is THE definitive guide
- **Security-conscious but not paranoid:** Balance utility with safety
- **Vibe coder focused:** Assume readers use Cursor/Claude Code
- **Curated, not exhaustive:** Quality over quantity in recommendations
- **Action-oriented:** Every section should have clear next steps

### Technical Accuracy
- MCP is by Anthropic, but many servers are community/third-party
- Playwright MCP is by Microsoft, not Anthropic
- Context7 is by Upstash
- "Official" in MCP context means in modelcontextprotocol/servers repo
- Windows requires full npx.cmd path - this is critical
- Node.js 18+ required for all servers

### Things to Avoid
- Don't list every MCP server - curate the best
- Don't skip security warnings for each category
- Don't forget Windows-specific instructions
- Don't confuse GitHub API server with local Git server
- Don't oversell - some servers are experimental
- Don't forget to link heavily to MCP Security article

### Vibe Coding Terms
Use these 3-5 times naturally:
- vibe coding / vibe coders
- vibe coded apps
- AI-generated code
- AI coding assistants

### Value Maximizers
- Comparison table is essential for skimming
- Security ratings for each server category
- Real config examples with copy buttons
- Troubleshooting section for common errors
- Cross-link to MCP Security article multiple times
- Include market stats (41K searches, 7M downloads)

---

## Checklist Before Marking READY

- [x] All external links verified working
- [x] Official MCP repo linked multiple times
- [x] 13 internal links identified
- [x] 8 PAA questions included
- [x] Competitive gap is specific
- [x] Code examples for all major IDEs (5 examples)
- [x] Security section comprehensive
- [x] Windows-specific instructions included
- [x] 20+ MCP servers covered by category
- [x] Volume data from Ahrefs included
- [x] Comparison table structure defined
- [x] Troubleshooting section outlined
- [x] No placeholder text

---

**Brief Status:** READY for Writer Agent

---

## Research Sources Summary

### Web Search Sources (December 2025)
- [Desktop Commander - 22 Best MCP Servers](https://desktopcommander.app/blog/2025/11/25/best-mcp-servers/)
- [Apidog - Top 10 MCP Servers for Claude Code](https://apidog.com/blog/top-10-mcp-servers-for-claude-code/)
- [Firecrawl - 15 Best MCP Servers for Cursor](https://www.firecrawl.dev/blog/best-mcp-servers-for-cursor)
- [Medium - MCP Servers Guide 2025](https://medium.com/@tam.tamanna18/a-comprehensive-guide-to-the-best-mcp-servers-for-2025-5ee541b2b00f)
- [Official MCP Servers GitHub](https://github.com/modelcontextprotocol/servers)
- [Awesome MCP Servers](https://github.com/punkpeye/awesome-mcp-servers)
- [MCP Examples](https://modelcontextprotocol.io/examples)
- [PulseMCP Registry](https://www.pulsemcp.com/servers)
- [MCP Manager Adoption Statistics](https://mcpmanager.ai/blog/mcp-adoption-statistics/)
- [Supabase MCP Docs](https://supabase.com/docs/guides/getting-started/mcp)
- [Sentry MCP Docs](https://docs.sentry.io/product/sentry-mcp/)
- [Context7 GitHub](https://github.com/upstash/context7)
- [Semgrep MCP Security Guide](https://semgrep.dev/blog/2025/a-security-engineers-guide-to-mcp/)
- [Claude Code MCP Docs](https://code.claude.com/docs/en/mcp)
- [Windows MCP Guide Gist](https://gist.github.com/feveromo/7a340d7795fca1ccd535a5802b976e1f)

### Keyword Data (From Ahrefs and Web Research)
| Keyword | Volume | KD | Global Volume |
|---------|--------|-----|---------------|
| mcp server | 41,000 | 75 | 160,000 |
| model context protocol | 23,000 | 77 | 78,000 |
| playwright mcp | 7,800 | 13 | 5,200 |
| claude mcp | 4,500 | 57 | 22,000 |
| playwright mcp server | 3,900 | 15 | 9,300 |
| claude code mcp | 3,000 | 47 | - |
| cursor mcp server | 500 | - | 2,000 |

### Market Statistics (MCP Ecosystem)
- 6.8-7 million monthly MCP server downloads
- 5,500+ servers on PulseMCP registry (October 2025)
- 180K+ monthly searches for top 20 MCP servers combined
- 40% fewer tool switches for MCP users (Anthropic)
- 80% of top 20 servers provide remote MCP servers
- 1,470+ servers have tool name collisions
- ~1,000 servers exposed without authorization (Bitsight)

### Security Research Sources
- [Wiz MCP Security Research](https://www.wiz.io/blog/mcp-security-research-briefing)
- [Invariant Labs Tool Poisoning](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [Pillar Security MCP Analysis](https://www.pillar.security/blog/the-security-risks-of-model-context-protocol-mcp)
- [InfraCloud Securing MCP Servers](https://www.infracloud.io/blogs/securing-mcp-servers/)
- [Backslash Claude Code Security](https://www.backslash.security/blog/claude-code-security-best-practices)

### Official Reference Servers (from modelcontextprotocol/servers)
1. Everything - Reference/test server
2. Fetch - Web content fetching
3. Filesystem - Secure file operations
4. Git - Local Git operations
5. GitHub - GitHub API integration
6. Memory - Knowledge graph memory
7. PostgreSQL - Database queries
8. Puppeteer - Browser automation
9. Sequential Thinking - Problem-solving
10. Slack - Team communication
11. SQLite - Lightweight database
