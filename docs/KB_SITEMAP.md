# VibeShip Multi-Product Knowledge Base Architecture
## File Structure for Maximum SEO & LLM Optimization

**Version:** 1.0  
**Last Updated:** December 2024  
**Domain:** vibeship.co  

---

## Table of Contents

1. [Core Principle](#core-principle)
2. [Why This Structure Wins](#why-this-structure-wins)
3. [Complete Architecture](#complete-architecture)
4. [Content Type Distribution](#content-type-distribution)
5. [Cross-Linking Strategy](#cross-linking-strategy)
6. [URL Examples by Query Type](#url-examples-by-query-type)
7. [llms.txt Strategy](#llmstxt-strategy)
8. [SvelteKit Implementation](#sveltekit-implementation)
9. [Navigation Structure](#navigation-structure)
10. [Summary](#summary)

---

## Core Principle

**One Knowledge Base, Multiple Topics, Product Docs on Subdomains**

```
vibeship.co/kb/           ← ALL educational content (centralized authority)
├── security/             ← Scanner-related learning
├── memory/               ← Mind-related learning
├── agents/               ← Spawner-related learning
├── [shared topics]/      ← Cross-product concepts

scanner.vibeship.co/docs/ ← Scanner HOW-TO (product-specific)
mind.vibeship.co/docs/    ← Mind HOW-TO (product-specific)
spawner.vibeship.co/docs/ ← Spawner HOW-TO (product-specific)
```

---

## Why This Structure Wins

| Approach | SEO Impact | LLM Impact | User Experience |
|----------|------------|------------|-----------------|
| ❌ Separate KBs per subdomain | Authority split across domains | Multiple weak citations | Confusing - "where do I learn?" |
| ❌ Everything on subdomains | No central authority | Fragmented citations | Product-siloed learning |
| ✅ Central KB + subdomain docs | All authority on vibeship.co | "According to VibeShip..." | One place to learn, product docs where you use them |

### SEO Benefits

1. **Consolidated Domain Authority** — All backlinks benefit vibeship.co
2. **Topical Authority** — Google sees comprehensive coverage of security + memory + agents
3. **Internal Linking Power** — Cross-topic links strengthen all pages
4. **Single Sitemap** — Easier for crawlers to understand structure

### LLM Benefits

1. **Single Citation Source** — "According to VibeShip..." not fragmented citations
2. **Clear Topic Clusters** — LLMs can extract relevant chunks by topic
3. **Comprehensive Coverage** — Becomes THE authority on vibe coding ecosystem
4. **Predictable URLs** — LLMs learn URL patterns for citations

### User Experience Benefits

1. **One Place to Learn** — vibeship.co/kb/ for all concepts
2. **Product Docs Where You Use Them** — scanner.vibeship.co/docs/ when using Scanner
3. **Clear Mental Model** — "Learn" vs "Use" distinction
4. **Easy Navigation** — Cross-topic exploration in one place

---

## Complete Architecture

```
vibeship.co/
│
├── /kb/                                    # KNOWLEDGE BASE (all learning)
│   │
│   ├── /kb/security/                       # Security concepts (Scanner-adjacent)
│   │   ├── /kb/security/vulnerabilities/
│   │   │   ├── sql-injection/
│   │   │   ├── xss/
│   │   │   ├── hardcoded-secrets/
│   │   │   ├── missing-auth/
│   │   │   ├── idor/
│   │   │   ├── insecure-cors/
│   │   │   ├── missing-rate-limiting/
│   │   │   ├── sensitive-data-exposure/
│   │   │   └── ...
│   │   ├── /kb/security/ai-patterns/
│   │   │   ├── cursor/
│   │   │   │   ├── index (overview)
│   │   │   │   ├── sql-injection/
│   │   │   │   ├── missing-auth/
│   │   │   │   └── ...
│   │   │   ├── claude-code/
│   │   │   ├── bolt/
│   │   │   ├── v0/
│   │   │   ├── replit/
│   │   │   ├── copilot/
│   │   │   └── windsurf/
│   │   ├── /kb/security/stacks/
│   │   │   ├── nextjs-supabase/
│   │   │   ├── nextjs-prisma/
│   │   │   ├── sveltekit-supabase/
│   │   │   ├── express-postgres/
│   │   │   ├── remix-supabase/
│   │   │   └── nuxt-supabase/
│   │   ├── /kb/security/fixes/
│   │   │   ├── sql-injection/
│   │   │   │   ├── nextjs/
│   │   │   │   ├── express/
│   │   │   │   └── sveltekit/
│   │   │   ├── hardcoded-secrets/
│   │   │   │   ├── stripe/
│   │   │   │   ├── openai/
│   │   │   │   └── supabase/
│   │   │   └── ...
│   │   └── /kb/security/checklists/
│   │       ├── pre-launch/
│   │       ├── supabase/
│   │       ├── nextjs/
│   │       ├── api-security/
│   │       └── vibe-coder/
│   │
│   ├── /kb/memory/                         # Memory concepts (Mind-adjacent)
│   │   ├── /kb/memory/concepts/
│   │   │   ├── context-persistence/
│   │   │   ├── memory-layers/
│   │   │   ├── retrieval-patterns/
│   │   │   ├── semantic-search/
│   │   │   ├── memory-decay/
│   │   │   └── context-windows/
│   │   ├── /kb/memory/patterns/
│   │   │   ├── coding-sessions/
│   │   │   ├── project-context/
│   │   │   ├── user-preferences/
│   │   │   ├── codebase-knowledge/
│   │   │   ├── conversation-history/
│   │   │   └── task-continuity/
│   │   ├── /kb/memory/integrations/
│   │   │   ├── claude-code/
│   │   │   ├── cursor/
│   │   │   ├── windsurf/
│   │   │   └── vs-code/
│   │   ├── /kb/memory/architectures/
│   │   │   ├── mcp-based/
│   │   │   ├── vector-stores/
│   │   │   ├── graph-memory/
│   │   │   └── hybrid-approaches/
│   │   └── /kb/memory/best-practices/
│   │       ├── what-to-remember/
│   │       ├── privacy-considerations/
│   │       ├── memory-hygiene/
│   │       └── scaling-memory/
│   │
│   ├── /kb/agents/                         # Agent concepts (Spawner-adjacent)
│   │   ├── /kb/agents/concepts/
│   │   │   ├── orchestration/
│   │   │   ├── task-decomposition/
│   │   │   ├── agent-communication/
│   │   │   ├── tool-use/
│   │   │   ├── planning/
│   │   │   └── reflection/
│   │   ├── /kb/agents/patterns/
│   │   │   ├── code-review-agent/
│   │   │   ├── testing-agent/
│   │   │   ├── deployment-agent/
│   │   │   ├── documentation-agent/
│   │   │   ├── security-audit-agent/
│   │   │   └── refactoring-agent/
│   │   ├── /kb/agents/architectures/
│   │   │   ├── single-agent/
│   │   │   ├── multi-agent/
│   │   │   ├── hierarchical/
│   │   │   ├── collaborative/
│   │   │   └── competitive/
│   │   ├── /kb/agents/security/            # Cross-links to /kb/security/
│   │   │   ├── agent-permissions/
│   │   │   ├── sandboxing/
│   │   │   ├── credential-management/
│   │   │   ├── audit-logging/
│   │   │   └── human-in-the-loop/
│   │   └── /kb/agents/best-practices/
│   │       ├── error-handling/
│   │       ├── graceful-degradation/
│   │       ├── cost-management/
│   │       └── testing-agents/
│   │
│   ├── /kb/vibe-coding/                    # General vibe coding education
│   │   ├── /kb/vibe-coding/getting-started/
│   │   │   ├── what-is-vibe-coding/
│   │   │   ├── choosing-your-tools/
│   │   │   └── first-project/
│   │   ├── /kb/vibe-coding/workflows/
│   │   │   ├── prompt-engineering/
│   │   │   ├── iterative-development/
│   │   │   ├── debugging-ai-code/
│   │   │   └── code-review/
│   │   ├── /kb/vibe-coding/tools/
│   │   │   ├── cursor/
│   │   │   ├── claude-code/
│   │   │   ├── bolt/
│   │   │   ├── v0/
│   │   │   ├── replit/
│   │   │   └── comparison/
│   │   └── /kb/vibe-coding/shipping/
│   │       ├── mvp-to-production/
│   │       ├── deployment-guides/
│   │       └── monitoring/
│   │
│   ├── /kb/glossary/                       # Shared definitions
│   │   ├── /kb/glossary/security/
│   │   │   ├── sql-injection/
│   │   │   ├── xss/
│   │   │   ├── authentication/
│   │   │   ├── authorization/
│   │   │   └── ...
│   │   ├── /kb/glossary/memory/
│   │   │   ├── context-window/
│   │   │   ├── embedding/
│   │   │   ├── vector-store/
│   │   │   └── ...
│   │   ├── /kb/glossary/agents/
│   │   │   ├── orchestration/
│   │   │   ├── tool-use/
│   │   │   ├── chain-of-thought/
│   │   │   └── ...
│   │   └── /kb/glossary/general/
│   │       ├── vibe-coding/
│   │       ├── ai-native/
│   │       ├── prompt/
│   │       └── ...
│   │
│   └── /kb/guides/                         # Cross-product guides
│       ├── /kb/guides/secure-agent-development/
│       ├── /kb/guides/memory-for-secure-coding/
│       ├── /kb/guides/production-ready-ai-apps/
│       ├── /kb/guides/vibe-coder-to-production/
│       └── /kb/guides/building-with-vibeship/
│
├── /research/                              # Data & research (all products)
│   ├── /research/vulnerability-index/      # Scanner data
│   │   ├── latest/
│   │   ├── 2024-12-16/
│   │   └── archive/
│   ├── /research/memory-patterns/          # Mind data
│   │   ├── adoption-trends/
│   │   └── effectiveness-studies/
│   ├── /research/agent-benchmarks/         # Spawner data
│   │   ├── task-completion/
│   │   └── reliability-metrics/
│   ├── /research/ai-tool-comparison/       # Cross-product
│   └── /research/methodology/
│
├── /blog/                                  # Thought leadership (all products)
│   └── /blog/[slug]/
│
├── /tools/                                 # Product directory
│   ├── scanner/                            # Links to scanner.vibeship.co
│   ├── mind/                               # Links to mind.vibeship.co
│   └── spawner/                            # Links to spawner.vibeship.co
│
├── /llms.txt                               # Full KB summary
├── /llms-full.txt                          # Complete content export
├── /sitemap.xml                            # Auto-generated
└── /robots.txt                             # Crawler permissions


# ══════════════════════════════════════════════════════════════════════════════
# PRODUCT SUBDOMAINS (How-To Docs Only)
# ══════════════════════════════════════════════════════════════════════════════

scanner.vibeship.co/
├── /                                       # Scanner app/landing
├── /docs/                                  # Scanner-specific docs
│   ├── /docs/getting-started/
│   │   ├── installation/
│   │   ├── first-scan/
│   │   └── understanding-results/
│   ├── /docs/cli/
│   │   ├── commands/
│   │   ├── options/
│   │   └── output-formats/
│   ├── /docs/integrations/
│   │   ├── github-actions/
│   │   ├── gitlab-ci/
│   │   ├── vercel/
│   │   ├── netlify/
│   │   └── docker/
│   ├── /docs/api/
│   │   ├── authentication/
│   │   ├── endpoints/
│   │   └── webhooks/
│   ├── /docs/configuration/
│   │   ├── config-file/
│   │   ├── ignore-rules/
│   │   └── custom-rules/
│   └── /docs/troubleshooting/
├── /changelog/
├── /llms.txt                               # Scanner docs summary
└── /sitemap.xml

mind.vibeship.co/
├── /                                       # Mind app/landing
├── /docs/                                  # Mind-specific docs
│   ├── /docs/getting-started/
│   │   ├── installation/
│   │   ├── first-setup/
│   │   └── quick-start/
│   ├── /docs/mcp-setup/
│   │   ├── claude-desktop/
│   │   ├── claude-code/
│   │   └── cursor/
│   ├── /docs/integrations/
│   │   ├── claude-code/
│   │   ├── cursor/
│   │   ├── windsurf/
│   │   └── vs-code/
│   ├── /docs/api/
│   │   ├── authentication/
│   │   ├── endpoints/
│   │   └── memory-operations/
│   ├── /docs/configuration/
│   │   ├── memory-settings/
│   │   ├── retention-policies/
│   │   └── privacy-controls/
│   └── /docs/troubleshooting/
├── /changelog/
├── /llms.txt                               # Mind docs summary
└── /sitemap.xml

spawner.vibeship.co/
├── /                                       # Spawner app/landing
├── /docs/                                  # Spawner-specific docs
│   ├── /docs/getting-started/
│   │   ├── installation/
│   │   ├── first-agent/
│   │   └── quick-start/
│   ├── /docs/agent-config/
│   │   ├── defining-agents/
│   │   ├── tools/
│   │   └── permissions/
│   ├── /docs/orchestration/
│   │   ├── single-agent/
│   │   ├── multi-agent/
│   │   └── workflows/
│   ├── /docs/templates/
│   │   ├── code-review/
│   │   ├── testing/
│   │   ├── deployment/
│   │   └── custom/
│   ├── /docs/api/
│   │   ├── authentication/
│   │   ├── endpoints/
│   │   └── webhooks/
│   ├── /docs/configuration/
│   └── /docs/troubleshooting/
├── /changelog/
├── /llms.txt                               # Spawner docs summary
└── /sitemap.xml
```

---

## Content Type Distribution

| Content Type | Location | Example |
|--------------|----------|---------|
| **What is X?** (concepts) | vibeship.co/kb/ | "What is context persistence?" |
| **Why does X matter?** (education) | vibeship.co/kb/ | "Why AI agents need memory" |
| **How does X work?** (theory) | vibeship.co/kb/ | "Memory retrieval patterns" |
| **Best practices for X** | vibeship.co/kb/ | "Memory hygiene best practices" |
| **X patterns/examples** | vibeship.co/kb/ | "Code review agent pattern" |
| **How do I set up X?** (how-to) | [product].vibeship.co/docs/ | "Setting up Mind with Claude Code" |
| **X API reference** | [product].vibeship.co/docs/api/ | "Mind API endpoints" |
| **X configuration** | [product].vibeship.co/docs/ | "Scanner config options" |
| **X CLI reference** | [product].vibeship.co/docs/ | "Scanner CLI commands" |
| **X troubleshooting** | [product].vibeship.co/docs/ | "Common Scanner errors" |
| **Research/Data** | vibeship.co/research/ | "Vulnerability Index" |
| **Thought leadership** | vibeship.co/blog/ | "The Future of AI Agents" |
| **Definitions** | vibeship.co/kb/glossary/ | "What is SQL injection?" |

### The Key Distinction

**Educational Content (vibeship.co/kb/):**
- Timeless concepts
- Platform-agnostic where possible
- "What" and "Why" focused
- Links TO product docs when relevant

**Product Documentation ([product].vibeship.co/docs/):**
- Product-specific setup
- Version-specific instructions
- "How" focused (step-by-step)
- Links TO knowledge base for deeper understanding

---

## Cross-Linking Strategy

### From Knowledge Base to Product Docs

```markdown
<!-- In vibeship.co/kb/security/vulnerabilities/sql-injection/ -->

## Scan Your Code

VibeShip Scanner automatically detects SQL injection in AI-generated code.

[Get Started with Scanner →](https://scanner.vibeship.co/docs/getting-started/)
```

### From Product Docs to Knowledge Base

```markdown
<!-- In scanner.vibeship.co/docs/getting-started/ -->

## Understanding Your Results

Scanner identifies vulnerabilities like SQL injection, XSS, and hardcoded secrets.

[Learn about SQL Injection →](https://vibeship.co/kb/security/vulnerabilities/sql-injection/)
[Learn about XSS →](https://vibeship.co/kb/security/vulnerabilities/xss/)
```

### Cross-Topic Links Within KB

```markdown
<!-- In vibeship.co/kb/agents/security/sandboxing/ -->

## Related Security Concepts

Agent sandboxing prevents many common vulnerabilities:

- [SQL Injection](/kb/security/vulnerabilities/sql-injection/) — Why agents need parameterized queries
- [Hardcoded Secrets](/kb/security/vulnerabilities/hardcoded-secrets/) — Credential management for agents

## Agent Memory Considerations

Secure agents also need secure memory:

- [Memory Privacy](/kb/memory/best-practices/privacy-considerations/) — What agents should remember
```

### Link Map Example

```
vibeship.co/kb/security/vulnerabilities/sql-injection/
    │
    ├── Links to: scanner.vibeship.co/docs/getting-started/
    │             "Scan your code for SQL injection →"
    │
    ├── Links to: /kb/security/ai-patterns/cursor/sql-injection/
    │             "Cursor-specific SQL injection patterns →"
    │
    ├── Links to: /kb/security/fixes/sql-injection/nextjs/
    │             "Fix SQL injection in Next.js →"
    │
    ├── Links to: /kb/agents/security/sandboxing/
    │             "How agents should handle database access →"
    │
    └── Links to: /kb/memory/patterns/secure-context/
                  "Remembering security fixes across sessions →"


mind.vibeship.co/docs/getting-started/
    │
    ├── Links to: vibeship.co/kb/memory/concepts/context-persistence/
    │             "Learn more about context persistence →"
    │
    ├── Links to: vibeship.co/kb/memory/integrations/claude-code/
    │             "Deep dive: Memory with Claude Code →"
    │
    └── Links to: vibeship.co/kb/memory/best-practices/what-to-remember/
                  "Best practices for memory configuration →"
```

---

## URL Examples by Query Type

| User Query | Best URL | Why |
|------------|----------|-----|
| "What is SQL injection" | vibeship.co/kb/security/vulnerabilities/sql-injection/ | Educational concept |
| "How to set up VibeShip Scanner" | scanner.vibeship.co/docs/getting-started/ | Product how-to |
| "Scanner CLI commands" | scanner.vibeship.co/docs/cli/ | Product reference |
| "What is AI memory persistence" | vibeship.co/kb/memory/concepts/context-persistence/ | Educational concept |
| "Mind MCP configuration" | mind.vibeship.co/docs/mcp-setup/ | Product how-to |
| "Mind API reference" | mind.vibeship.co/docs/api/ | Product reference |
| "Agent orchestration patterns" | vibeship.co/kb/agents/patterns/ | Educational patterns |
| "Spawner agent templates" | spawner.vibeship.co/docs/templates/ | Product templates |
| "Secure AI agent development" | vibeship.co/kb/guides/secure-agent-development/ | Cross-product guide |
| "Cursor security issues" | vibeship.co/kb/security/ai-patterns/cursor/ | Educational analysis |
| "What is vibe coding" | vibeship.co/kb/glossary/general/vibe-coding/ | Definition |
| "VibeShip vulnerability index" | vibeship.co/research/vulnerability-index/ | Research/data |

---

## llms.txt Strategy

### Main Knowledge Base (vibeship.co/llms.txt)

```
# VibeShip Knowledge Base

> VibeShip builds tools for vibe coders — non-technical founders who use AI 
> coding assistants. This knowledge base covers security, memory, and agent 
> patterns for AI-assisted development.

## Website
https://vibeship.co

## Knowledge Base Topics

### Security
Learn about vulnerabilities in AI-generated code, AI tool patterns, and fixes.
- Vulnerabilities: https://vibeship.co/kb/security/vulnerabilities/
- AI Patterns: https://vibeship.co/kb/security/ai-patterns/
- Stack Guides: https://vibeship.co/kb/security/stacks/
- Fix Prompts: https://vibeship.co/kb/security/fixes/
- Checklists: https://vibeship.co/kb/security/checklists/

### Memory
Learn about persistent context for AI coding tools and memory architectures.
- Concepts: https://vibeship.co/kb/memory/concepts/
- Patterns: https://vibeship.co/kb/memory/patterns/
- Integrations: https://vibeship.co/kb/memory/integrations/
- Best Practices: https://vibeship.co/kb/memory/best-practices/

### Agents
Learn about AI agent orchestration, patterns, and security considerations.
- Concepts: https://vibeship.co/kb/agents/concepts/
- Patterns: https://vibeship.co/kb/agents/patterns/
- Agent Security: https://vibeship.co/kb/agents/security/
- Best Practices: https://vibeship.co/kb/agents/best-practices/

### Vibe Coding
General education for AI-assisted development.
- Getting Started: https://vibeship.co/kb/vibe-coding/getting-started/
- Workflows: https://vibeship.co/kb/vibe-coding/workflows/
- Tools: https://vibeship.co/kb/vibe-coding/tools/

### Glossary
Plain English definitions for vibe coders.
https://vibeship.co/kb/glossary/

### Cross-Product Guides
https://vibeship.co/kb/guides/

## Products

### VibeShip Scanner
Security scanner for AI-generated code.
- Product: https://scanner.vibeship.co
- Documentation: https://scanner.vibeship.co/docs/

### VibeShip Mind
Persistent memory for AI coding agents.
- Product: https://mind.vibeship.co
- Documentation: https://mind.vibeship.co/docs/

### VibeShip Spawner
AI agent orchestration platform.
- Product: https://spawner.vibeship.co
- Documentation: https://spawner.vibeship.co/docs/

## Research & Data
- Vulnerability Index (Weekly): https://vibeship.co/research/vulnerability-index/
- Memory Patterns Research: https://vibeship.co/research/memory-patterns/
- Agent Benchmarks: https://vibeship.co/research/agent-benchmarks/
- Methodology: https://vibeship.co/research/methodology/

## Blog
https://vibeship.co/blog/

## Contact
- Twitter: @vibeship
- Discord: discord.gg/vibeship
- Email: hello@vibeship.co
```

### Product Docs (scanner.vibeship.co/llms.txt)

```
# VibeShip Scanner Documentation

> Product documentation for VibeShip Scanner — a security scanner 
> for AI-generated code.

## Product
https://scanner.vibeship.co

## Documentation

### Getting Started
- Installation: https://scanner.vibeship.co/docs/getting-started/installation/
- First Scan: https://scanner.vibeship.co/docs/getting-started/first-scan/
- Understanding Results: https://scanner.vibeship.co/docs/getting-started/understanding-results/

### CLI Reference
- Commands: https://scanner.vibeship.co/docs/cli/commands/
- Options: https://scanner.vibeship.co/docs/cli/options/
- Output Formats: https://scanner.vibeship.co/docs/cli/output-formats/

### Integrations
- GitHub Actions: https://scanner.vibeship.co/docs/integrations/github-actions/
- GitLab CI: https://scanner.vibeship.co/docs/integrations/gitlab-ci/
- Vercel: https://scanner.vibeship.co/docs/integrations/vercel/

### API Reference
- Authentication: https://scanner.vibeship.co/docs/api/authentication/
- Endpoints: https://scanner.vibeship.co/docs/api/endpoints/
- Webhooks: https://scanner.vibeship.co/docs/api/webhooks/

### Configuration
- Config File: https://scanner.vibeship.co/docs/configuration/config-file/
- Ignore Rules: https://scanner.vibeship.co/docs/configuration/ignore-rules/

## Learn More About Security

For educational content about vulnerabilities and security concepts, 
visit the main VibeShip Knowledge Base:

- Security Knowledge Base: https://vibeship.co/kb/security/
- Vulnerabilities: https://vibeship.co/kb/security/vulnerabilities/
- AI Tool Patterns: https://vibeship.co/kb/security/ai-patterns/

## Parent Organization
VibeShip: https://vibeship.co
Knowledge Base: https://vibeship.co/kb/
```

### Product Docs (mind.vibeship.co/llms.txt)

```
# VibeShip Mind Documentation

> Product documentation for VibeShip Mind — persistent memory 
> for AI coding agents.

## Product
https://mind.vibeship.co

## Documentation

### Getting Started
- Installation: https://mind.vibeship.co/docs/getting-started/installation/
- First Setup: https://mind.vibeship.co/docs/getting-started/first-setup/
- Quick Start: https://mind.vibeship.co/docs/getting-started/quick-start/

### MCP Setup
- Claude Desktop: https://mind.vibeship.co/docs/mcp-setup/claude-desktop/
- Claude Code: https://mind.vibeship.co/docs/mcp-setup/claude-code/
- Cursor: https://mind.vibeship.co/docs/mcp-setup/cursor/

### Integrations
- Claude Code: https://mind.vibeship.co/docs/integrations/claude-code/
- Cursor: https://mind.vibeship.co/docs/integrations/cursor/
- Windsurf: https://mind.vibeship.co/docs/integrations/windsurf/

### API Reference
- Authentication: https://mind.vibeship.co/docs/api/authentication/
- Endpoints: https://mind.vibeship.co/docs/api/endpoints/
- Memory Operations: https://mind.vibeship.co/docs/api/memory-operations/

### Configuration
- Memory Settings: https://mind.vibeship.co/docs/configuration/memory-settings/
- Retention Policies: https://mind.vibeship.co/docs/configuration/retention-policies/
- Privacy Controls: https://mind.vibeship.co/docs/configuration/privacy-controls/

## Learn More About Memory

For educational content about memory concepts and patterns,
visit the main VibeShip Knowledge Base:

- Memory Knowledge Base: https://vibeship.co/kb/memory/
- Memory Concepts: https://vibeship.co/kb/memory/concepts/
- Memory Patterns: https://vibeship.co/kb/memory/patterns/
- Memory Best Practices: https://vibeship.co/kb/memory/best-practices/

## Parent Organization
VibeShip: https://vibeship.co
Knowledge Base: https://vibeship.co/kb/
```

---

## SvelteKit Implementation

### Project Structure

```
src/routes/
├── +layout.svelte                      # Root layout
├── +page.svelte                        # Homepage
│
├── kb/
│   ├── +layout.svelte                  # KB layout with cross-topic nav
│   ├── +layout.server.ts               # Load KB navigation data
│   ├── +page.svelte                    # KB index
│   │
│   ├── security/
│   │   ├── +layout.svelte              # Security section layout
│   │   ├── +layout.server.ts           # Security nav data
│   │   ├── +page.svelte                # Security index
│   │   │
│   │   ├── vulnerabilities/
│   │   │   ├── +page.svelte            # Vulnerabilities hub
│   │   │   ├── +page.server.ts
│   │   │   └── [slug]/
│   │   │       ├── +page.svelte
│   │   │       └── +page.server.ts
│   │   │
│   │   ├── ai-patterns/
│   │   │   ├── +page.svelte            # AI patterns hub
│   │   │   ├── +page.server.ts
│   │   │   └── [tool]/
│   │   │       ├── +page.svelte        # Tool overview
│   │   │       ├── +page.server.ts
│   │   │       └── [vulnerability]/
│   │   │           ├── +page.svelte    # Tool + vuln specific
│   │   │           └── +page.server.ts
│   │   │
│   │   ├── stacks/
│   │   │   ├── +page.svelte
│   │   │   └── [stack]/
│   │   │       ├── +page.svelte
│   │   │       └── +page.server.ts
│   │   │
│   │   ├── fixes/
│   │   │   ├── +page.svelte
│   │   │   └── [vulnerability]/
│   │   │       ├── +page.svelte
│   │   │       └── [framework]/
│   │   │           ├── +page.svelte
│   │   │           └── +page.server.ts
│   │   │
│   │   └── checklists/
│   │       ├── +page.svelte
│   │       └── [checklist]/
│   │           ├── +page.svelte
│   │           └── +page.server.ts
│   │
│   ├── memory/
│   │   ├── +layout.svelte              # Memory section layout
│   │   ├── +layout.server.ts
│   │   ├── +page.svelte                # Memory index
│   │   │
│   │   ├── concepts/
│   │   │   ├── +page.svelte
│   │   │   └── [concept]/
│   │   │       ├── +page.svelte
│   │   │       └── +page.server.ts
│   │   │
│   │   ├── patterns/
│   │   │   ├── +page.svelte
│   │   │   └── [pattern]/
│   │   │       ├── +page.svelte
│   │   │       └── +page.server.ts
│   │   │
│   │   ├── integrations/
│   │   │   ├── +page.svelte
│   │   │   └── [tool]/
│   │   │       ├── +page.svelte
│   │   │       └── +page.server.ts
│   │   │
│   │   ├── architectures/
│   │   │   ├── +page.svelte
│   │   │   └── [architecture]/
│   │   │       ├── +page.svelte
│   │   │       └── +page.server.ts
│   │   │
│   │   └── best-practices/
│   │       ├── +page.svelte
│   │       └── [topic]/
│   │           ├── +page.svelte
│   │           └── +page.server.ts
│   │
│   ├── agents/
│   │   ├── +layout.svelte              # Agents section layout
│   │   ├── +layout.server.ts
│   │   ├── +page.svelte                # Agents index
│   │   │
│   │   ├── concepts/
│   │   │   ├── +page.svelte
│   │   │   └── [concept]/
│   │   │       ├── +page.svelte
│   │   │       └── +page.server.ts
│   │   │
│   │   ├── patterns/
│   │   │   ├── +page.svelte
│   │   │   └── [pattern]/
│   │   │       ├── +page.svelte
│   │   │       └── +page.server.ts
│   │   │
│   │   ├── architectures/
│   │   │   ├── +page.svelte
│   │   │   └── [architecture]/
│   │   │       ├── +page.svelte
│   │   │       └── +page.server.ts
│   │   │
│   │   ├── security/
│   │   │   ├── +page.svelte
│   │   │   └── [topic]/
│   │   │       ├── +page.svelte
│   │   │       └── +page.server.ts
│   │   │
│   │   └── best-practices/
│   │       ├── +page.svelte
│   │       └── [topic]/
│   │           ├── +page.svelte
│   │           └── +page.server.ts
│   │
│   ├── vibe-coding/
│   │   ├── +layout.svelte
│   │   ├── +page.svelte
│   │   ├── getting-started/
│   │   ├── workflows/
│   │   ├── tools/
│   │   └── shipping/
│   │
│   ├── glossary/
│   │   ├── +page.svelte                # All terms
│   │   └── [category]/
│   │       ├── +page.svelte            # Category terms
│   │       └── [term]/
│   │           ├── +page.svelte
│   │           └── +page.server.ts
│   │
│   └── guides/
│       ├── +page.svelte
│       └── [guide]/
│           ├── +page.svelte
│           └── +page.server.ts
│
├── research/
│   ├── +page.svelte                    # Research index
│   ├── vulnerability-index/
│   │   ├── +page.svelte
│   │   ├── +page.server.ts
│   │   └── [date]/
│   │       ├── +page.svelte
│   │       └── +page.server.ts
│   ├── memory-patterns/
│   ├── agent-benchmarks/
│   └── methodology/
│
├── blog/
│   ├── +page.svelte
│   └── [slug]/
│       ├── +page.svelte
│       └── +page.server.ts
│
├── tools/
│   └── +page.svelte                    # Product directory
│
├── llms.txt/
│   └── +server.ts
├── llms-full.txt/
│   └── +server.ts
├── sitemap.xml/
│   └── +server.ts
└── robots.txt/
    └── +server.ts
```

### Content Directory Structure

```
src/lib/content/
├── security/
│   ├── vulnerabilities/
│   │   ├── sql-injection.json
│   │   ├── xss.json
│   │   └── ...
│   ├── ai-patterns/
│   │   ├── cursor.json
│   │   └── ...
│   ├── stacks/
│   ├── fixes/
│   └── checklists/
│
├── memory/
│   ├── concepts/
│   │   ├── context-persistence.json
│   │   └── ...
│   ├── patterns/
│   ├── integrations/
│   ├── architectures/
│   └── best-practices/
│
├── agents/
│   ├── concepts/
│   ├── patterns/
│   ├── architectures/
│   ├── security/
│   └── best-practices/
│
├── vibe-coding/
│   ├── getting-started/
│   ├── workflows/
│   ├── tools/
│   └── shipping/
│
├── glossary/
│   ├── security/
│   ├── memory/
│   ├── agents/
│   └── general/
│
└── guides/
```

---

## Navigation Structure

### Main KB Navigation

```svelte
<!-- src/lib/components/layout/KBNav.svelte -->
<script lang="ts">
  import { page } from '$app/stores'
</script>

<nav class="kb-nav">
  <!-- Primary Topics -->
  <div class="nav-section">
    <h3>Topics</h3>
    <a 
      href="/kb/security" 
      class:active={$page.url.pathname.startsWith('/kb/security')}
    >
      🔒 Security
    </a>
    <a 
      href="/kb/memory" 
      class:active={$page.url.pathname.startsWith('/kb/memory')}
    >
      🧠 Memory
    </a>
    <a 
      href="/kb/agents" 
      class:active={$page.url.pathname.startsWith('/kb/agents')}
    >
      🤖 Agents
    </a>
    <a 
      href="/kb/vibe-coding" 
      class:active={$page.url.pathname.startsWith('/kb/vibe-coding')}
    >
      ⚡ Vibe Coding
    </a>
  </div>
  
  <!-- Resources -->
  <div class="nav-section">
    <h3>Resources</h3>
    <a href="/kb/glossary">📖 Glossary</a>
    <a href="/kb/guides">📚 Guides</a>
    <a href="/research">📊 Research</a>
    <a href="/blog">✍️ Blog</a>
  </div>
  
  <!-- Products -->
  <div class="nav-section">
    <h3>Products</h3>
    <a href="https://scanner.vibeship.co" target="_blank">
      Scanner ↗
    </a>
    <a href="https://mind.vibeship.co" target="_blank">
      Mind ↗
    </a>
    <a href="https://spawner.vibeship.co" target="_blank">
      Spawner ↗
    </a>
  </div>
</nav>
```

### Section-Specific Navigation

```svelte
<!-- src/routes/kb/security/+layout.svelte -->
<script lang="ts">
  import { page } from '$app/stores'
  import KBNav from '$lib/components/layout/KBNav.svelte'
</script>

<div class="kb-layout">
  <aside class="sidebar">
    <KBNav />
    
    <!-- Security-specific subnav -->
    <nav class="section-nav">
      <h4>Security</h4>
      <a href="/kb/security/vulnerabilities"
         class:active={$page.url.pathname.includes('/vulnerabilities')}>
        Vulnerabilities
      </a>
      <a href="/kb/security/ai-patterns"
         class:active={$page.url.pathname.includes('/ai-patterns')}>
        AI Patterns
      </a>
      <a href="/kb/security/stacks"
         class:active={$page.url.pathname.includes('/stacks')}>
        Stack Guides
      </a>
      <a href="/kb/security/fixes"
         class:active={$page.url.pathname.includes('/fixes')}>
        Fix Prompts
      </a>
      <a href="/kb/security/checklists"
         class:active={$page.url.pathname.includes('/checklists')}>
        Checklists
      </a>
    </nav>
  </aside>
  
  <main>
    <slot />
  </main>
</div>
```

---

## Summary

| Domain | Purpose | Content Type |
|--------|---------|--------------|
| **vibeship.co/kb/** | Learn concepts | Educational, evergreen |
| **vibeship.co/kb/security/** | Security education | Vulnerabilities, patterns, fixes |
| **vibeship.co/kb/memory/** | Memory education | Concepts, patterns, integrations |
| **vibeship.co/kb/agents/** | Agent education | Orchestration, patterns, security |
| **vibeship.co/kb/vibe-coding/** | General education | Getting started, workflows, tools |
| **vibeship.co/kb/glossary/** | Definitions | Plain English terms |
| **vibeship.co/kb/guides/** | Cross-product guides | Multi-topic walkthroughs |
| **vibeship.co/research/** | Data & research | Indexes, benchmarks, reports |
| **vibeship.co/blog/** | Thought leadership | Timely, shareable |
| **scanner.vibeship.co/docs/** | Use Scanner | Setup, config, API |
| **mind.vibeship.co/docs/** | Use Mind | Setup, config, API |
| **spawner.vibeship.co/docs/** | Use Spawner | Setup, config, API |

### Key Principles

1. **One Knowledge Base** — All educational content on vibeship.co/kb/
2. **Product Docs on Subdomains** — How-to docs where users use products
3. **Clear Cross-Links** — KB → Product Docs, Product Docs → KB
4. **Topic Clusters** — Security, Memory, Agents as main branches
5. **Shared Resources** — Glossary, Guides, Research serve all topics
6. **LLM-Friendly** — Each domain has llms.txt pointing to main authority

### SEO/LLM Benefits

- **Consolidated Authority** — All backlinks benefit vibeship.co
- **Single Citation Source** — LLMs cite "According to VibeShip..."
- **Comprehensive Coverage** — Topical authority across security + memory + agents
- **Clear URL Patterns** — Predictable structure for citations
- **Cross-Linking Power** — Internal links strengthen all pages

---

**End of Document**

This architecture scales with your product lineup while maintaining SEO authority and LLM discoverability on the main vibeship.co domain.
