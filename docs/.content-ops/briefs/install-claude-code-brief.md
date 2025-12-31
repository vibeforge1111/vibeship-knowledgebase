# Content Brief: Install Claude Code - Complete Setup Guide

## Status

```yaml
status: READY
created_at: 2025-12-31T00:00:00Z
created_by: Research Agent (Claude)
claimed_by: null
claimed_at: null
completed_at: null
```

---

## Article Metadata

```yaml
type: guide
slug: install-claude-code
url: /kb/guides/install-claude-code/
title: "Install Claude Code: Complete Setup Guide 2025"
meta_description: "Install Claude Code on Mac, Windows, Linux. Step-by-step setup, authentication, troubleshooting common errors. Get coding in 5 minutes."
```

---

## Core Data

### Keyword Research (Estimated - Ahrefs API Unavailable)

| Keyword | Volume (Est.) | Difficulty | Intent |
|---------|---------------|------------|--------|
| install claude code | 5,200 | 26 | Transactional |
| claude code setup | 1,500 | 20 | Transactional |
| claude code download | 900 | 15 | Transactional |
| claude code cli | 800 | 22 | Informational |
| how to install claude code | 600 | 18 | Transactional |
| claude code npm | 400 | 15 | Transactional |
| claude code windows | 350 | 20 | Transactional |
| claude code mac | 300 | 18 | Transactional |

**Total Addressable Volume:** ~10,000/month
**Combined Difficulty:** Moderate (high volume opportunity!)

### External Sources (for outbound links)

| Source | URL | Key Finding | Tier |
|--------|-----|-------------|------|
| Claude Code Official Docs | https://code.claude.com/docs/en/setup | Official installation instructions | 7 |
| npm Package | https://www.npmjs.com/package/@anthropic-ai/claude-code | Package details, version | 7 |
| Homebrew Formulae | https://formulae.brew.sh/cask/claude-code | macOS installation via Homebrew | 7 |
| Anthropic Support | https://support.claude.com/en/articles/12304248-managing-api-key-environment-variables-in-claude-code | API key best practices | 7 |
| VS Code Integration Docs | https://docs.anthropic.com/en/docs/claude-code/ide-integrations | IDE setup instructions | 7 |

### Key Facts to Include

- Claude Code native installer does NOT require Node.js
- npm installation requires Node.js 18+
- macOS requires 10.15+ (Catalina or later)
- Windows native support released in 2025 (no longer requires WSL)
- Three installation methods: native installer, Homebrew (Mac), npm
- Authentication via OAuth (Claude Console) or API key environment variable
- `claude doctor` command diagnoses common issues
- VS Code extension available in beta for GUI integration

---

## SEO Strategy

### Target Keywords

| Keyword | Search Intent | Priority |
|---------|---------------|----------|
| install claude code | Transactional | Primary |
| claude code setup | Transactional | Primary |
| claude code download | Transactional | Secondary |
| how to install claude code | Transactional | Secondary |
| claude code windows | Transactional | Secondary |
| claude code mac | Transactional | Secondary |
| claude code npm | Transactional | Secondary |
| claude code command not found | Troubleshooting | Long-tail |
| claude code permission denied | Troubleshooting | Long-tail |

### People Also Ask (FAQs)

1. How do I install Claude Code?
2. Does Claude Code require Node.js?
3. How do I install Claude Code on Windows?
4. How do I fix "command not found" after installing Claude Code?
5. Is Claude Code free to use?
6. How do I authenticate Claude Code with my API key?
7. Can I use Claude Code in VS Code?
8. How do I update Claude Code to the latest version?

### Competitive Gap

Current installation guides are fragmented across multiple sources. Most are outdated (pre-Windows native support) or missing:
- **Platform-specific troubleshooting** - No guide covers ALL platforms with specific fixes
- **Security best practices** for API key management
- **Post-installation configuration** (CLAUDE.md, MCP servers)
- **IDE integration** instructions beyond terminal use
- **Vibe coder context** - None explain Claude Code as a vibe coding tool

**Our Unique Angle:** The most complete Claude Code installation guide with platform-specific troubleshooting AND security best practices for vibe coders.

---

## Content Outline

### Quick Answer (50 words max)

Install Claude Code in under 5 minutes: On Mac/Linux, run `curl -fsSL https://claude.ai/install.sh | bash`. On Windows, use `irm https://claude.ai/install.ps1 | iex` in PowerShell. No Node.js required. Authenticate via OAuth or API key environment variable. Run `claude doctor` if you hit issues.

### Section 1: What is Claude Code?

- Anthropic's agentic CLI coding tool
- Lives in your terminal, understands entire codebase
- Handles multi-file edits, git workflows, natural language commands
- Different from Claude desktop app (this is the CLI tool)
- Word count: 100-150

### Section 2: System Requirements

- **macOS:** 10.15+ (Catalina or later)
- **Windows:** Windows 10+ (native support or WSL 1/2)
- **Linux:** Ubuntu 20.04+, Debian 10+
- Node.js 18+ only required for npm installation (not native installer)
- Stable internet connection for authentication
- Word count: 100-150

### Section 3: Installation Methods (by Platform)

#### macOS Installation

**Method 1: Native Installer (Recommended)**
```bash
curl -fsSL https://claude.ai/install.sh | bash
source ~/.zshrc  # or ~/.bashrc for bash users
claude --version
```

**Method 2: Homebrew**
```bash
brew install --cask claude-code
```

**Method 3: npm (requires Node.js 18+)**
```bash
npm install -g @anthropic-ai/claude-code
```

#### Windows Installation

**Method 1: PowerShell Native (Recommended)**
```powershell
irm https://claude.ai/install.ps1 | iex
```

Note: Installs to `C:\Users\YourName\.local\bin\claude.exe`

**Method 2: WSL (Fallback)**
```bash
# In Ubuntu/WSL terminal
curl -fsSL https://claude.ai/install.sh | bash
```

#### Linux Installation

```bash
curl -fsSL https://claude.ai/install.sh | bash
source ~/.bashrc
claude --version
```

- Word count: 300-400

### Section 4: Authentication Setup

Two authentication methods:

**Option 1: OAuth via Claude Console (Recommended)**
```bash
claude
# Follow the OAuth prompts in your browser
```

**Option 2: API Key Environment Variable**
```bash
# Add to ~/.bashrc or ~/.zshrc
export ANTHROPIC_API_KEY="your-api-key-here"
source ~/.bashrc
```

**Security Best Practices:**
- Never hardcode API keys in source code
- Use environment variables, not config files
- Add `.env` files to `.gitignore`
- Rotate keys every 90 days
- Use different keys for dev/prod environments
- Run `chmod 600 ~/.claude.json` to protect credentials

- Word count: 200-250

### Section 5: Troubleshooting Common Issues

#### "command not found: claude"

**Cause:** PATH not configured correctly

**Fix for macOS/Linux:**
```bash
echo 'export PATH="$(npm config get prefix)/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

**Fix for Windows:** Add `C:\Users\YourName\.local\bin` to PATH

#### "Permission denied" (EACCES Error)

**Cause:** npm global prefix not user-writable

**Fix:**
```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

**Important:** Never use `sudo npm install -g` - this causes permission issues

#### WSL "exec: node: not found"

**Cause:** WSL using Windows Node instead of Linux Node

**Fix:**
```bash
# Verify paths point to Linux
which npm  # Should show /usr/... not /mnt/c/...
which node

# If wrong, install nvm in WSL
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install --lts
```

#### Windows PowerShell Silent Failure

**Known Issue:** Some PowerShell versions fail silently with the native installer

**Workaround:** Use CMD instead:
```cmd
# In CMD (not PowerShell)
# Follow instructions from claude.ai/install
```

#### Nuclear Reset (Fixes Most Issues)

```bash
npm uninstall -g @anthropic-ai/claude-code
rm -rf ~/.claude ~/.npm/_cacache
npm cache clean --force
npm install -g @anthropic-ai/claude-code
```

#### Diagnostic Command

```bash
claude doctor
```

This command checks installation, PATH, and configuration issues.

- Word count: 400-500

### Section 6: Post-Installation Configuration

#### Verify Installation
```bash
claude --version
claude doctor
```

#### Create CLAUDE.md (Project Configuration)

Create `CLAUDE.md` in your project root:
```markdown
# CLAUDE.md

## Project Overview
[Brief description of your project]

## Tech Stack
- [Framework]
- [Database]
- [Other tools]

## Commands
- npm run dev: Start development server
- npm run build: Build for production

## Security Rules
- Validate all input with Zod
- Use parameterized queries
- Never expose API keys in client code
```

#### Configure MCP Servers (Optional)

```bash
# Add an MCP server
claude mcp add github --scope user

# List configured servers
claude mcp list

# Check server status inside Claude Code
/mcp
```

#### IDE Integration (VS Code)

The VS Code extension (beta) enables:
- Real-time view of Claude's changes
- Selection context sharing
- Diff viewing in IDE

Install from VS Code marketplace or run:
```bash
claude extension install vscode
```

- Word count: 300-400

### Section 7: Verify Everything Works

```bash
# 1. Check version
claude --version

# 2. Run diagnostics
claude doctor

# 3. Start Claude Code in a project
cd your-project
claude

# 4. Test a simple command
"List all files in this directory"
```

- Word count: 100-150

### FAQ Section

1. **How do I install Claude Code?**
   Run `curl -fsSL https://claude.ai/install.sh | bash` on Mac/Linux or `irm https://claude.ai/install.ps1 | iex` on Windows PowerShell. The native installer is recommended over npm.

2. **Does Claude Code require Node.js?**
   No. The native installer works without Node.js. Only the npm installation method (`npm install -g @anthropic-ai/claude-code`) requires Node.js 18+.

3. **How do I install Claude Code on Windows?**
   Windows native support was added in 2025. Run `irm https://claude.ai/install.ps1 | iex` in PowerShell. If this fails, use WSL with the Linux installer as a fallback.

4. **How do I fix "command not found" after installing Claude Code?**
   Add the npm global bin to your PATH: `echo 'export PATH="$(npm config get prefix)/bin:$PATH"' >> ~/.zshrc && source ~/.zshrc`. For Windows, add `C:\Users\YourName\.local\bin` to your system PATH.

5. **Is Claude Code free to use?**
   Claude Code requires a Claude Pro subscription ($20/month), Claude Max 5x ($100/month), or Max 20x ($200/month) plan. Alternatively, you can use an Anthropic API key with pay-as-you-go billing.

6. **How do I authenticate Claude Code with my API key?**
   Set the environment variable: `export ANTHROPIC_API_KEY="your-key"`. Add this to your shell profile (~/.bashrc or ~/.zshrc) for persistence. Claude Code prioritizes environment variable keys over OAuth authentication.

7. **Can I use Claude Code in VS Code?**
   Yes. A VS Code extension (beta) integrates Claude Code with visual diff viewing and IDE features. The extension also works with Cursor and potentially Windsurf.

8. **How do I update Claude Code to the latest version?**
   For native installations: re-run the installer script. For Homebrew: `brew upgrade claude-code`. For npm: `npm update -g @anthropic-ai/claude-code`.

---

## Internal Links (8 required)

| Anchor Text | URL | Context/Placement |
|-------------|-----|-------------------|
| Claude Code security patterns | /kb/vibe-coding-tools/claude-code/ | After installation section |
| CLAUDE.md configuration guide | /kb/prompts/claude-md/ | Post-installation section |
| MCP server security | /kb/vibe-coding/mcp-server-security/ | MCP configuration section |
| secure vibe coding guide | /kb/vibe-coding/secure-vibe-coding-guide/ | Security best practices |
| hardcoded secrets | /kb/security/vulnerabilities/hardcoded-secrets/ | API key security section |
| Cursor | /kb/vibe-coding-tools/cursor/ | IDE integration section |
| Claude Code vs Cursor | /kb/vibe-coding-tools/claude-code-vs-cursor/ | Introduction section |
| best vibe coding tools | /kb/vibe-coding-tools/ | Introduction section |

---

## External Links (7 required)

| Anchor Text | URL | Tier | Placement |
|-------------|-----|------|-----------|
| Official Claude Code Docs | https://code.claude.com/docs/en/setup | 7 | Installation section |
| @anthropic-ai/claude-code npm package | https://www.npmjs.com/package/@anthropic-ai/claude-code | 7 | npm installation |
| Homebrew Formulae | https://formulae.brew.sh/cask/claude-code | 7 | Homebrew installation |
| Anthropic Console | https://console.anthropic.com | 7 | Authentication section |
| API Key Best Practices (Anthropic) | https://support.claude.com/en/articles/9767949-api-key-best-practices | 7 | Security section |
| VS Code Integration Docs | https://docs.anthropic.com/en/docs/claude-code/ide-integrations | 7 | IDE section |
| Claude Code Troubleshooting | https://code.claude.com/docs/en/troubleshooting | 7 | Troubleshooting section |

---

## Code Examples Needed

### Pattern 1: Native Installation (Mac/Linux)
```bash
# Install Claude Code
curl -fsSL https://claude.ai/install.sh | bash

# Reload shell
source ~/.zshrc  # or ~/.bashrc

# Verify installation
claude --version
```

### Pattern 2: Windows PowerShell Installation
```powershell
# Install Claude Code (stable)
irm https://claude.ai/install.ps1 | iex

# Or specific version
& ([scriptblock]::Create((irm https://claude.ai/install.ps1))) 1.0.58

# Verify
claude --version
```

### Pattern 3: npm Installation
```bash
# Requires Node.js 18+
npm install -g @anthropic-ai/claude-code

# If permission issues, fix npm prefix first
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc

# Then install
npm install -g @anthropic-ai/claude-code
```

### Pattern 4: API Key Configuration (Secure)
```bash
# Add to shell profile (NOT in code)
echo 'export ANTHROPIC_API_KEY="sk-ant-..."' >> ~/.bashrc
source ~/.bashrc

# Verify
echo $ANTHROPIC_API_KEY

# In Claude Code, check authentication
/status
```

### Pattern 5: Troubleshooting PATH Issues
```bash
# Find where npm installs globally
npm config get prefix

# Check if Claude is installed
npm list -g @anthropic-ai/claude-code

# Add to PATH
echo 'export PATH="$(npm config get prefix)/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Verify
which claude
```

---

## Notes for Writer Agent

### Recommended Persona

**@buildermagic (The Builder)** - This is a hands-on tutorial. Demo-oriented, code-first, practical outcomes. Start with the end result and show the steps.

Alternative: **@pat_ships (The Pragmatist)** - Action-oriented, "here's what to do" energy. Good for getting readers installing quickly.

### Tone Guidance

- Direct and practical - readers want to install and go
- No unnecessary preamble - get to the commands quickly
- Platform-specific clarity - don't mix Mac/Windows/Linux instructions
- Troubleshooting should feel helpful, not intimidating
- Quick Answer should enable installation in <2 minutes for readers who just want commands

### Technical Accuracy

- Native installer does NOT require Node.js
- npm installation DOES require Node.js 18+
- Windows native support is REAL in 2025 (not just WSL)
- `claude doctor` is the first troubleshooting command
- Never use `sudo npm install -g` - causes permission issues
- API key environment variable takes priority over OAuth

### Things to Avoid

- Don't make this feel like documentation - it should feel like a helpful guide
- Don't overexplain what Claude Code is (readers already want it)
- Don't forget Windows users - they're a significant portion
- Don't skip the security section - API key mismanagement is common
- Don't assume readers know their shell (zsh vs bash)

### Vibe Coding Terms

Use these 3-5 times naturally:
- vibe coding
- vibe coders
- vibe coded
- AI coding assistant
- Claude Code

Good placement: Introduction, post-installation, security section

---

## Checklist Before Marking READY

- [x] All external links verified working
- [x] Platform-specific commands accurate
- [x] 8 internal links identified
- [x] 8 PAA questions included
- [x] Competitive gap is specific (platform coverage + security)
- [x] Code examples for all platforms
- [x] Troubleshooting section comprehensive
- [x] No placeholder text (TBD, TODO)
- [x] Security best practices included
- [x] Post-installation configuration covered

---

**Brief Status:** READY for Writer Agent
