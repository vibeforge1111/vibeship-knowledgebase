# Content Brief: Playwright MCP Server

## Status

```yaml
status: READY
created_at: 2025-12-31T14:00:00Z
created_by: Research Agent
claimed_by: null
claimed_at: null
completed_at: null
```

---

## Article Metadata

```yaml
type: tool
slug: playwright-mcp-server
url: /kb/agents/tools/playwright-mcp/
title: "Playwright MCP Server: Browser Automation for Claude & Cursor"
meta_description: "Set up the Playwright MCP server for AI-powered browser automation in Claude Code, Cursor, and VS Code. Step-by-step guide with security best practices."
word_count: 1800-2200
```

---

## Executive Summary

The Playwright MCP Server by Microsoft lets AI tools like Claude Code, Cursor, and VS Code automate browsers through natural language commands. Launched in March 2025, it uses Playwright's accessibility tree rather than screenshots, making it fast and lightweight. This article targets vibe coders who want to add browser automation capabilities to their AI workflows safely. The opportunity is massive: "playwright mcp server" has 3,900 monthly searches with only 15 KD (very low competition).

---

## Core Data

### Primary References
| Reference | Source | Link |
|-----------|--------|------|
| Official Repo | Microsoft GitHub | https://github.com/microsoft/playwright-mcp |
| MCP Spec | Anthropic | https://modelcontextprotocol.io/ |
| npm Package | @playwright/mcp | https://www.npmjs.com/package/@playwright/mcp |

### External Sources (for outbound links)
| Source | URL | Key Finding | Tier |
|--------|-----|-------------|------|
| Microsoft Playwright MCP GitHub | https://github.com/microsoft/playwright-mcp | Official documentation, installation commands | 7 |
| MCP Protocol | https://modelcontextprotocol.io/ | Protocol specification | Official |
| Execute Automation MCP | https://github.com/executeautomation/mcp-playwright | Alternative implementation for Claude Desktop | 7 |
| QATouch Guide | https://www.qatouch.com/blog/playwright-mcp-server/ | Detailed tutorial | Blog |
| Simon Willison TIL | https://til.simonwillison.net/claude-code/playwright-mcp-claude-code | Claude Code integration | Blog |
| SupaTest Guide | https://supatest.ai/blog/playwright-mcp-setup-guide | Best practices | Blog |
| ScrapingBee Tutorial | https://www.scrapingbee.com/blog/playwright-mcp-web-scraping-smithery-tutorial-cursor/ | Web scraping use case | Blog |
| BrightData Guide | https://brightdata.com/blog/ai/playwright-mcp-server | Scraping deep dive | Blog |
| Microsoft Tech Community | https://techcommunity.microsoft.com/blog/azuredevcommunityblog/how-to-integrate-playwright-mcp-for-ai-driven-test-automation/4470372 | Enterprise integration | 6 |
| Cursor Directory | https://cursor.directory/mcp/playwright | Cursor-specific config | 7 |

### Key Facts to Include
- **3,900/mo search volume** for "playwright mcp server" with only 15 KD (Ahrefs, 2025)
- **7,800/mo** for "playwright mcp" variant at 13 KD
- Launched by Microsoft in March 2025
- Uses accessibility tree, not screenshots - no vision models needed
- Supports Chromium, Firefox, and WebKit
- Requires Node.js 18+
- ~1,000 MCP servers exposed without authorization (Bitsight research - cite from MCP security article)

---

## SEO Strategy

### Target Keywords
| Keyword | Volume | KD | Search Intent | Priority |
|---------|--------|-----|---------------|----------|
| playwright mcp server | 3,900 | 15 | informational | Primary |
| playwright mcp | 7,800 | 13 | informational | Primary |
| mcp playwright | 700 | - | informational | Secondary |
| cursor mcp server | 500 | - | informational | Secondary |
| playwright automation | 1,700 | 43 | informational | Tertiary |
| browser automation ai | 100 | - | informational | Tertiary |

### Related High-Volume Keywords (Context)
| Keyword | Volume | KD | Notes |
|---------|--------|-----|-------|
| mcp server | 41,000 | 75 | Too competitive |
| model context protocol | 23,000 | 77 | Parent topic |
| playwright testing | 9,000 | 52 | Related automation |
| claude mcp | 4,500 | 57 | Related tool |
| claude code mcp | 3,000 | 47 | Direct use case |

### People Also Ask (FAQs)
1. How do I install Playwright MCP server for Cursor?
2. What is the Playwright MCP server used for?
3. Does Playwright MCP work with Claude Code?
4. Is Playwright MCP free to use?
5. How do I run Playwright MCP in headless mode?
6. What are the security risks of Playwright MCP?

### Competitive Gap
**Top results analysis:**
- GitHub README: Technical, lacks beginner guidance
- Medium articles: Scattered, inconsistent quality
- QATouch/SupaTest: Good but generic, not vibe coder focused
- No one covers: Security considerations, troubleshooting common errors, VibeShip angle

**Our unique angle:**
- Vibe coder audience (Cursor/Claude Code users)
- Step-by-step with ALL IDE configs (Claude Code, Cursor, VS Code, Windsurf)
- Security best practices (link to MCP security article)
- Troubleshooting section for common errors
- Use cases specifically for vibe coding workflows

---

## Content Outline

### Quick Answer (50 words max)
The Playwright MCP server lets AI tools like Claude Code and Cursor control web browsers using natural language. Install with `npx @playwright/mcp@latest`, add it to your IDE config, and you can automate testing, scraping, and browser interactions without writing test scripts.

### Section 1: What is Playwright MCP Server? (150-200 words)
- Plain English: "A bridge that lets your AI assistant control a web browser"
- Created by Microsoft, launched March 2025
- Uses accessibility tree (structured data) not screenshots
- Benefits: Fast, lightweight, no vision models needed
- Key difference from regular Playwright: No code writing required
- Real-world analogy: "Like giving your AI a browser remote control"

### Section 2: Why Vibe Coders Need Browser Automation (100-150 words)
- Test your vibe coded apps without writing test scripts
- Scrape data for your projects
- Automate repetitive browser tasks
- Debug visual issues by having AI "see" your app
- Fill forms, click buttons, navigate - all via prompts
- Quote: "Like working with a mid-level engineer"

### Section 3: Installation and Setup (400-500 words)

**Prerequisites:**
- Node.js 18+
- One of: Claude Code, Cursor, VS Code, Windsurf

**Quick Start (2 min):**
```bash
npx @playwright/mcp@latest
```

**Claude Code Setup:**
```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```
Location: `~/.claude/claude_desktop_config.json` (Mac) or `%APPDATA%\Claude\config.json` (Windows)

**Cursor Setup:**
- Settings > MCP > Add new MCP Server
- Name: playwright
- Command: `npx @playwright/mcp@latest`
- Alternative: Edit `~/.cursor/mcp.json`

**VS Code Setup:**
```bash
code --add-mcp '{"name":"playwright","command":"npx","args":["@playwright/mcp@latest"]}'
```

**Docker Setup (headless only):**
```json
{
  "mcpServers": {
    "playwright": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "--init", "--pull=always", "mcr.microsoft.com/playwright/mcp"]
    }
  }
}
```

**Verification:**
After setup, you should see Playwright tools available in your AI assistant. Test with: "Navigate to example.com and tell me the page title."

### Section 4: Running Modes Explained (150-200 words)

**Persistent Profile Mode (Default):**
- Browser saves login state, cookies, history
- Great for: Testing authenticated flows, personal automation
- Clear with: Delete the profile directory between sessions

**Isolated Mode:**
- Fresh browser for each session
- Great for: Testing, scraping without state
- Enable with: `--isolated` flag

**Browser Extension Mode:**
- Connect to your existing Chrome/Edge
- Requires: "Playwright MCP Bridge" extension
- Great for: Debugging live sessions

**Headless Mode:**
- No visible browser window
- Enable with: `--headless` flag
- Great for: CI/CD, background automation

### Section 5: Common Use Cases for Vibe Coders (200-250 words)

**1. Testing Your Vibe Coded App:**
Prompt: "Navigate to localhost:3000, fill out the signup form with test data, and verify the success message appears."

**2. Web Scraping for Projects:**
Prompt: "Go to [url], extract all product names and prices, and format as JSON."

**3. Debugging Visual Issues:**
Prompt: "Navigate to my-app.com, take a screenshot, and describe any visual bugs you see."

**4. Form Automation:**
Prompt: "Log into my admin dashboard, navigate to settings, and update the email to test@example.com."

**5. Device Testing:**
Prompt: "Open the page in iPhone 15 emulation and check if the mobile menu works."

**Device emulation:** Supports 143 devices - iPhone, iPad, Pixel, Galaxy, Desktop browsers

### Section 6: Security Best Practices (200-250 words)

**Critical considerations:**
- MCP servers run with YOUR permissions
- Browser has access to your logged-in sessions
- Scraped data is sent to AI (consider privacy)
- Link to: /kb/agents/security/mcp-servers/ for full security guide

**Safe usage checklist:**
- [ ] Use isolated mode for untrusted sites
- [ ] Don't automate sensitive banking/financial sites
- [ ] Clear browser profile after sensitive sessions
- [ ] Use `--allowed-origins` to restrict domains
- [ ] Be cautious with OAuth flows through MCP

**Origin restrictions:**
```bash
npx @playwright/mcp@latest --allowed-origins "example.com,myapp.com"
```

**Storage state for auth (safer than live login):**
```bash
npx @playwright/mcp@latest --storage-state auth.json
```

### Section 7: Troubleshooting Common Errors (200-250 words)

**Error: "Command Not Found"**
- Solution: Ensure Node.js 18+ is installed
- Run: `node --version`

**Error: "Tool browser_navigate: undefined"**
- Solution: Playwright browsers not installed
- Run: `npx playwright install`

**Error: "importAssertions warning" (Cursor/Windows)**
- Solution: Update Node.js to latest LTS
- Or use specific version: `npx @playwright/mcp@0.0.25`

**Error: "Connection Refused"**
- Solution: Restart IDE after config changes
- Check: Config file JSON syntax

**Error: "MCP server has tools with invalid parameters"**
- Solution: Clear npm cache
- Run: `npm cache clean --force && npx @playwright/mcp@latest`

**Cursor 1.0 "Page Not Found" Error:**
- Solution: Remove and re-add MCP server in settings
- Restart Cursor completely

**Browser closes immediately:**
- Cause: LangChain adapter closes context
- Solution: Use persistent mode or check adapter docs

### Section 8: Command Line Options Reference (100-150 words)

| Flag | Purpose | Example |
|------|---------|---------|
| `--headless` | No visible browser | `npx @playwright/mcp@latest --headless` |
| `--isolated` | Fresh session each time | `npx @playwright/mcp@latest --isolated` |
| `--device` | Emulate device | `--device "iPhone 15"` |
| `--allowed-origins` | Restrict domains | `--allowed-origins "*.myapp.com"` |
| `--config` | Use config file | `--config ./mcp-config.json` |
| `--extension` | Connect to live browser | `--extension` |
| `--storage-state` | Pre-load auth state | `--storage-state auth.json` |

### FAQ Section (5-6 questions, 75-100 words each)
Use PAA questions above + add technical ones

### Related Content
- MCP Server Security
- Claude Code patterns
- Cursor setup guide
- Prompt injection (security risk)

---

## Internal Links (8-10 required)

| Anchor Text | URL | Context/Placement |
|-------------|-----|-------------------|
| MCP Server Security | /kb/agents/security/mcp-servers/ | Security section |
| Claude Code | /kb/vibe-coding-tools/claude-code/ | Setup section |
| Cursor | /kb/vibe-coding-tools/cursor/ | Setup section |
| Windsurf | /kb/vibe-coding-tools/windsurf/ | Setup section |
| prompt injection | /kb/security/vulnerabilities/prompt-injection/ | Security warning |
| what is vibe coding | /kb/vibe-coding/what-is-vibe-coding/ | Intro context |
| pre-launch security checklist | /kb/security/checklists/pre-launch/ | Testing use case |
| CLAUDE.md file | /kb/prompts/claude-md/ | Claude Code config context |
| Cursor rules | /kb/prompts/cursor-rules/ | Cursor config context |

---

## External Links (10+ required)

| Anchor Text | URL | Tier | Placement |
|-------------|-----|------|-----------|
| Microsoft Playwright MCP | https://github.com/microsoft/playwright-mcp | 7 | Intro, setup |
| Model Context Protocol | https://modelcontextprotocol.io/ | Official | Intro |
| @playwright/mcp on npm | https://www.npmjs.com/package/@playwright/mcp | 7 | Installation |
| Execute Automation MCP | https://github.com/executeautomation/mcp-playwright | 7 | Alternative |
| Playwright docs | https://playwright.dev/ | 6 | Prerequisites |
| Cursor Directory | https://cursor.directory/mcp/playwright | 7 | Cursor setup |
| Simon Willison guide | https://til.simonwillison.net/claude-code/playwright-mcp-claude-code | Blog | Claude Code |
| Microsoft Tech Community | https://techcommunity.microsoft.com/blog/azuredevcommunityblog/how-to-integrate-playwright-mcp-for-ai-driven-test-automation/4470372 | 6 | Enterprise |
| HuggingFace Tutorial | https://huggingface.co/blog/lynn-mikami/microsoft-playwright-mcp | Blog | Beginners |
| Awesome Testing Security | https://www.awesome-testing.com/2025/11/playwright-mcp-security | Blog | Security |

---

## Code Examples Needed

### Example 1: Basic Claude Desktop Config
```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```
Explanation: Minimal config that auto-downloads and runs Playwright MCP

### Example 2: Cursor MCP JSON Config
```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest", "--headless"]
    }
  }
}
```
Explanation: Headless mode for faster automation in Cursor

### Example 3: Docker Config (CI/CD friendly)
```json
{
  "mcpServers": {
    "playwright": {
      "command": "docker",
      "args": [
        "run", "-i", "--rm", "--init",
        "--pull=always",
        "mcr.microsoft.com/playwright/mcp"
      ]
    }
  }
}
```
Explanation: Containerized version for CI/CD pipelines

### Example 4: Secure Config with Origin Restrictions
```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": [
        "@playwright/mcp@latest",
        "--isolated",
        "--allowed-origins", "localhost,myapp.com"
      ]
    }
  }
}
```
Explanation: Restricts browser to only trusted domains

---

## Notes for Writer Agent

### Tone Guidance
- **Practical and friendly:** This is a "how-to" article, not security FUD
- **Vibe coder focused:** Assume reader uses Cursor/Claude Code already
- **Quick wins:** Show immediate value (test your app with a prompt!)
- **Security conscious but not paranoid:** Mention risks, provide mitigations

### Technical Accuracy
- Playwright MCP is from MICROSOFT, not Anthropic (MCP protocol is Anthropic)
- Two main implementations: @playwright/mcp (Microsoft) and @executeautomation/playwright-mcp-server
- Node.js 18+ required, not older versions
- Accessibility tree approach is key differentiator
- --allowed-origins does NOT serve as security boundary (from docs)

### Things to Avoid
- Don't confuse with regular Playwright testing (no code writing)
- Don't oversell security of origin restrictions
- Don't forget Windows-specific path issues (backslashes, PowerShell escaping)
- Don't ignore that this is relatively new (March 2025)

### Vibe Coding Terms
Use these 3-5 times naturally:
- vibe coding / vibe coders
- vibe coded apps
- AI-assisted development

---

## Checklist Before Marking READY

- [x] All external links verified working
- [x] Official Microsoft repo linked
- [x] 9 internal links identified
- [x] 6 PAA questions included
- [x] Competitive gap is specific
- [x] Code examples for all major IDEs
- [x] Troubleshooting section with real errors
- [x] Security section with link to MCP security article
- [x] No placeholder text (TBD, TODO)
- [x] Volume data from Ahrefs included
- [x] Command line options reference table

---

**Brief Status:** READY for Writer Agent

---

## Research Sources Summary

### Web Search Sources (December 2025)
- [Microsoft Playwright MCP GitHub](https://github.com/microsoft/playwright-mcp)
- [Execute Automation MCP](https://github.com/executeautomation/mcp-playwright)
- [QATouch Detailed Guide](https://www.qatouch.com/blog/playwright-mcp-server/)
- [Simon Willison's TIL](https://til.simonwillison.net/claude-code/playwright-mcp-claude-code)
- [SupaTest Best Practices](https://supatest.ai/blog/playwright-mcp-setup-guide)
- [Medium - Vijay Kumar Maurya](https://medium.com/@bluudit/playwright-mcp-comprehensive-guide-to-ai-powered-browser-automation-in-2025-712c9fd6cffa)
- [Autify Blog](https://autify.com/blog/playwright-mcp)
- [HuggingFace Tutorial](https://huggingface.co/blog/lynn-mikami/microsoft-playwright-mcp)
- [BrightData Guide](https://brightdata.com/blog/ai/playwright-mcp-server)
- [ScrapingBee Tutorial](https://www.scrapingbee.com/blog/playwright-mcp-web-scraping-smithery-tutorial-cursor/)
- [Microsoft Tech Community](https://techcommunity.microsoft.com/blog/azuredevcommunityblog/how-to-integrate-playwright-mcp-for-ai-driven-test-automation/4470372)
- [Awesome Testing Security](https://www.awesome-testing.com/2025/11/playwright-mcp-security)

### Ahrefs Keyword Data (December 2025)
| Keyword | Volume | KD | Global Volume |
|---------|--------|-----|---------------|
| playwright mcp server | 3,900 | 15 | 9,300 |
| playwright mcp | 7,800 | 13 | 5,200 (as mcp playwright) |
| mcp server | 41,000 | 75 | 160,000 |
| model context protocol | 23,000 | 77 | 78,000 |
| playwright testing | 9,000 | 52 | 15,000 |
| playwright automation | 1,700 | 43 | 14,000 |
| cursor mcp server | 500 | - | 2,000 |
| claude mcp | 4,500 | 57 | 22,000 |
| claude code mcp | 3,000 | 47 | - |

### Issue Tracker Research (Common Errors)
- [GitHub Issue #1383 - Claude Code failures](https://github.com/anthropics/claude-code/issues/1383)
- [GitHub Issue #585 - Cursor importAssertions warning](https://github.com/microsoft/playwright-mcp/issues/585)
- [Cursor Forum - MCP not working](https://forum.cursor.com/t/playwright-mcp-does-not-work/103933)
- [GitHub Issue #459 - VS Code install error](https://github.com/microsoft/playwright-mcp/issues/459)
- [GitHub Issue #109 - Invalid parameters](https://github.com/executeautomation/mcp-playwright/issues/109)
