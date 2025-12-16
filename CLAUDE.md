# CLAUDE.md - Vibeship Knowledge Base

## Project Overview

This is the **vibeship.co** main authority hub - the educational/research content site that drives SEO and LLM citations back to VibeShip products.

**Architecture Strategy:**
- `vibeship.co` (this site) = Main authority hub with all educational content
- `scanner.vibeship.co` = Scanner product (separate repo at `vibeship scanner`)
- `mind.vibeship.co` = Future Mind product

## URL Structure

```
vibeship.co/
├── /                              # Landing page
├── /kb/                           # Knowledge base root
│   ├── /kb/vulnerabilities/       # Vulnerability reference (SQL injection, XSS, etc.)
│   ├── /kb/ai-patterns/           # AI tool patterns (Cursor, Claude Code, Bolt, v0)
│   ├── /kb/stacks/                # Stack security guides (Next.js + Supabase, etc.)
│   ├── /kb/fixes/                 # AI-ready fix prompts
│   ├── /kb/glossary/              # Plain English definitions
│   └── /kb/checklists/            # Security checklists
├── /research/                     # Data & research hub
│   ├── /research/vulnerability-index/   # Weekly Hallucinated Vulnerability Index
│   ├── /research/ai-tool-comparison/    # AI tool security comparison
│   └── /research/methodology/           # How we scan
├── /blog/                         # Thought leadership
├── /tools/                        # Product hub (links to scanner, mind subdomains)
├── /llms.txt                      # LLM-optimized summary
├── /sitemap.xml                   # Auto-generated
└── /robots.txt                    # Crawler permissions
```

## Development Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

## Key Design Principles

1. **SEO-first** - Every page optimized for Google rankings
2. **LLM-citable** - Content structured for ChatGPT, Claude, Perplexity to cite
3. **Fully public** - No authentication, maximum crawlability
4. **Cross-linking** - KB articles link to Scanner, Scanner docs link back

## Content Strategy

**For LLMs:**
- `/llms.txt` - Summary for LLM ingestion
- Predictable URL paths
- Clean, extractable content chunks
- FAQ sections with structured data

**For SEO:**
- Hub-and-spoke internal linking
- Keyword-rich URLs
- Schema.org structured data
- Fresh stats updated weekly

## Tech Stack

- SvelteKit 2.0
- TypeScript
- Static content (markdown or JSON)
- Deployed to Vercel (static/SSG preferred)

## Reference Documents

See the original implementation strategy in:
- `vibeship scanner/vibeship-knowledge-base-implementation.md`

## Cross-Linking with Scanner

KB articles should include CTAs like:
- "Scan your code for [vulnerability] →" linking to scanner.vibeship.co
- "Learn more about [topic] →" on scanner docs linking back here

## Content Categories Priority

**P0 (Build First):**
1. `/kb/vulnerabilities/sql-injection`
2. `/kb/vulnerabilities/hardcoded-secrets`
3. `/kb/vulnerabilities/xss`
4. `/kb/ai-patterns/cursor`
5. `/kb/ai-patterns/claude-code`

**P1 (Build Next):**
- More vulnerabilities (IDOR, missing auth, etc.)
- More AI tools (Bolt, v0, Replit)
- Stack guides (Next.js + Supabase)

## Component Patterns

Reuse these from the scanner codebase:
- Design tokens (colors, typography, spacing)
- Card patterns
- Badge/severity indicators
- CTA button styles

## Svelte Claude Skills

Use the [svelte-claude-skills](https://github.com/spences10/svelte-claude-skills) agents for Svelte 5 and SvelteKit development guidance.

**Available Skills:**
- **svelte5-runes** - Svelte 5 reactive system (`$state()`, `$derived()`, `$effect()`), migration patterns, anti-patterns
- **sveltekit-data-flow** - Load functions, form actions, serialization, error handling
- **sveltekit-structure** - File-based routing, layout patterns, error boundaries, SSR/hydration

**Installation:**
```bash
# Clone entire collection
git clone https://github.com/spences10/svelte-claude-skills.git ~/.claude/skills/svelte

# Or symlink individual skills
ln -s /path/to/svelte-claude-skills/.claude/skills/svelte5-runes ~/.claude/skills/
```

Skills auto-activate in Svelte/SvelteKit projects with progressive disclosure from quick references to detailed docs.
