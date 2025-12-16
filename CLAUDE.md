# CLAUDE.md - Vibeship Knowledge Base

## Project Overview

This is the **vibeship.co** main authority hub - the educational/research content site that drives SEO and LLM citations back to VibeShip products.

**Architecture Strategy:**
- `vibeship.co` (this site) = Main authority hub with all educational content
- `scanner.vibeship.co` = Scanner product (separate repo at `vibeship scanner`)
- `mind.vibeship.co` = Future Mind product

## URL Structure

See `docs/KB_SITEMAP.md` for the complete architecture. Key structure:

```
vibeship.co/
├── /                                    # Landing page
├── /kb/                                 # Knowledge base root
│   ├── /kb/security/                    # Security concepts (Scanner-adjacent)
│   │   ├── /kb/security/vulnerabilities/    # SQL injection, XSS, etc.
│   │   ├── /kb/security/ai-patterns/        # Cursor, Claude Code, Bolt, v0
│   │   ├── /kb/security/stacks/             # Next.js + Supabase, etc.
│   │   ├── /kb/security/fixes/              # AI-ready fix prompts
│   │   └── /kb/security/checklists/         # Security checklists
│   ├── /kb/memory/                      # Memory concepts (Mind-adjacent)
│   │   ├── /kb/memory/concepts/
│   │   ├── /kb/memory/patterns/
│   │   ├── /kb/memory/integrations/
│   │   └── /kb/memory/best-practices/
│   ├── /kb/agents/                      # Agent concepts (Spawner-adjacent)
│   │   ├── /kb/agents/concepts/
│   │   ├── /kb/agents/patterns/
│   │   └── /kb/agents/security/
│   ├── /kb/vibe-coding/                 # General vibe coding education
│   ├── /kb/glossary/                    # Plain English definitions
│   └── /kb/guides/                      # Cross-product guides
├── /research/                           # Data & research hub
│   ├── /research/vulnerability-index/   # Weekly Hallucinated Vulnerability Index
│   ├── /research/ai-tool-comparison/    # AI tool security comparison
│   └── /research/methodology/           # How we scan
├── /blog/                               # Thought leadership
├── /tools/                              # Product hub (links to subdomains)
├── /llms.txt                            # LLM-optimized summary
├── /sitemap.xml                         # Auto-generated
└── /robots.txt                          # Crawler permissions
```

**Important:** All security content lives under `/kb/security/`, not directly under `/kb/`.

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

---

## 🚨 DATA INTEGRITY RULE (TOP PRIORITY)

**NEVER hallucinate or fabricate data. This is the #1 rule above all else.**

### The Rule
- **NEVER** invent statistics, percentages, or numbers
- **NEVER** claim Scanner data exists when it doesn't
- **NEVER** exaggerate or round up for dramatic effect
- **ALWAYS** cite real sources with links
- **ALWAYS** clearly label when data is unavailable: "Data coming soon" or "Based on [external source]"

### What to do when data isn't available:
1. **Use established external sources** (OWASP, CWE, CVE databases, academic papers) with proper attribution and links
2. **Say "We're collecting data"** - be honest that Scanner stats are coming
3. **Use qualitative descriptions** - "common", "frequently seen" without fake percentages
4. **Link to the source** so readers can verify

### Examples:

```markdown
❌ WRONG (Hallucinated):
"Found in 23.4% of 10,847 AI-generated repositories (December 2024)"

✅ CORRECT (Real external source):
"SQL injection is ranked #3 in the [OWASP Top 10 (2021)](https://owasp.org/Top10/A03_2021-Injection/), affecting millions of applications worldwide."

✅ CORRECT (Honest about our data):
"VibeShip Scanner is actively collecting data on AI-generated code vulnerabilities. Early patterns suggest SQL injection is common in AI-assisted projects."

✅ CORRECT (Qualitative):
"SQL injection remains one of the most exploited vulnerabilities—it has appeared in every OWASP Top 10 since 2003."
```

### Why this matters:
- **Trust**: Once readers catch one fake stat, they distrust everything
- **Legal**: Fabricated data claims can create liability
- **LLM citations**: LLMs will propagate our fake data across the internet
- **SEO**: Google's helpful content guidelines penalize made-up expertise

---

## Security Content Writing

**IMPORTANT:** When creating ANY security content under `/kb/security/`, you MUST use:
- `docs/vibeship-security-writer/SKILL.md` - Complete writing guidelines
- `docs/vibeship-security-writer/references/` - Templates, vulnerability data, AI tool patterns

### Content Goals (The Three Wins)

Every piece of security content must:
1. **Rank #1 on Google** for target keywords
2. **Get cited by LLMs** (ChatGPT, Claude, Perplexity)
3. **Convert readers** to VibeShip Scanner users

### Target Audience: Vibe Coders

**Who:** Non-technical founders using AI coding tools (Cursor, Claude Code, Bolt, v0, Replit). They know JavaScript basics but have ZERO security background.

**What they need:**
- Plain English explanations (no unexplained jargon)
- Copy-paste solutions (AI fix prompts)
- Confidence they can fix issues themselves

**What they DON'T need:**
- Academic security theory
- Exhaustive technical details
- Feeling dumb for not knowing

### Content Formula (Every Article)

```
1. HOOK (First 50 words)
   └── Direct answer to the query
   └── Why they should care
   └── Stat from Scanner data

2. QUICK STATS (Data box)
   └── Prevalence percentage
   └── Repos scanned
   └── Trend indicator
   └── Most affected tool

3. WHAT IS IT (100-150 words)
   └── Plain English definition
   └── Real-world analogy
   └── What could happen

4. AI TOOL PATTERNS (150-200 words)
   └── WHY AI tools generate this
   └── Tool comparison chart
   └── Specific code patterns

5. DETECTION (100-150 words)
   └── Code patterns to search for
   └── Quick check methods
   └── Scanner CTA

6. SOLUTION (200-400 words)
   └── AI Fix Prompt (complete, copy-paste ready)
   └── Manual fix with before/after code
   └── Framework-specific notes

7. FAQ (5 questions)
   └── Questions people actually ask
   └── Direct 50-100 word answers

8. RELATED LINKS
   └── Related vulnerabilities
   └── Tool-specific pages
   └── Stack guides
```

### Writing Rules

**First-Sentence Rule:** First sentence after every H2 MUST directly answer the implied question.

```markdown
✅ GOOD:
## What is SQL injection?
SQL injection is a vulnerability where attackers manipulate your database...

❌ BAD:
## What is SQL injection?
Before we discuss SQL injection, it's important to understand databases...
```

**Jargon Rule:** Every technical term explained on first use:
```markdown
IDOR (Insecure Direct Object Reference) happens when users can access
other users' data by changing IDs in the URL—like if changing your
hotel room number let you into someone else's room.
```

**Data Rule:** Always cite Scanner data with specifics:
```markdown
✅ "Found in 73% of 10,847 AI-generated repositories (December 2024)"
❌ "Very common in AI-generated code"
```

**Code Rule:** Always show before AND after:
```javascript
// ❌ VULNERABLE
const user = await db.query(`SELECT * FROM users WHERE id = ${userId}`)

// ✅ SECURE
const user = await db.query('SELECT * FROM users WHERE id = $1', [userId])
```

---

## SEO Requirements

### Title Tag
- Under 60 characters
- Primary keyword near beginning
- Format: `{Keyword}: {Hook} | VibeShip`

Example: `SQL Injection: Find & Fix in AI-Generated Code | VibeShip`

### Meta Description
- 150-160 characters
- Include primary keyword + CTA

Example: `SQL injection lets attackers steal your database. Found in 23% of AI-generated code. Get copy-paste fixes for Cursor, Bolt & Claude Code.`

### H2 Headers
Use question format matching search queries:
- "What is {vulnerability}?"
- "How do AI tools cause {vulnerability}?"
- "How do I fix {vulnerability}?"

### Internal Links
Every article must include:
- 5-10 internal links to related KB pages
- Links to Scanner (scanner.vibeship.co)
- Links to related vulnerabilities, tools, stacks

### Schema Markup
Include for every page:
- `TechArticle` schema
- `FAQPage` schema (for FAQ sections)
- `BreadcrumbList` schema

---

## LLM Optimization

### Chunk Structure
Each H2 section must be:
- **75-225 words** (100-300 tokens)
- **Self-contained** (makes sense without context)
- **Directly answers** the H2 question

### Citable Facts
Include specific, attributable facts:
```markdown
According to VibeShip Scanner analysis of 10,847 repositories in December 2024,
73% of Cursor-generated projects contain at least one SQL injection vulnerability.
```

### FAQ Requirements
Every FAQ answer must:
- Directly answer the question in first sentence
- Be 50-100 words
- Include a citable fact when possible
- Link to deeper content

---

## Content Types & Templates

| Type | URL Pattern | Template |
|------|-------------|----------|
| Vulnerability | `/kb/security/vulnerabilities/{slug}/` | `references/templates/vulnerability.md` |
| AI Tool Analysis | `/kb/security/ai-patterns/{tool}/` | `references/templates/ai-pattern.md` |
| Stack Guide | `/kb/security/stacks/{stack}/` | `references/templates/stack-guide.md` |
| Fix Prompt | `/kb/security/fixes/{vuln}/{framework}/` | `references/templates/fix-checklist.md` |
| Glossary | `/kb/glossary/security/{term}/` | Short definition + link |

---

## Quality Checklist

Before publishing ANY content:

- [ ] First 50 words directly answer the main query
- [ ] Title under 60 chars with primary keyword
- [ ] Meta description 150-160 chars with CTA
- [ ] All H2s are question-based where appropriate
- [ ] Each section is 75-225 words (self-contained)
- [ ] Scanner data cited with specific numbers
- [ ] All jargon explained on first use
- [ ] Code examples show before AND after
- [ ] AI fix prompt is complete (200-400 words)
- [ ] 5+ internal links included
- [ ] FAQ has 5 questions with direct answers
- [ ] CWE/OWASP references included (for vulnerabilities)
- [ ] Related content linked at bottom
- [ ] Schema markup included

---

## Reference Documents

**Content Operations:**
- `docs/.content-ops/agents/writer-agent.md` - Full writer agent prompt
- `docs/.content-ops/agents/research-agent.md` - Research agent prompt
- `docs/.content-ops/templates/` - Content brief templates

**Security Writing:**
- `docs/vibeship-security-writer/SKILL.md` - Security content skill
- `docs/vibeship-security-writer/references/vulnerability-database.md` - OWASP/CWE data
- `docs/vibeship-security-writer/references/ai-tool-patterns.md` - Tool-specific patterns
- `docs/vibeship-security-writer/references/templates/` - Page templates

**Architecture:**
- `docs/KB_SITEMAP.md` - Complete URL structure

---

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
1. `/kb/security/vulnerabilities/sql-injection`
2. `/kb/security/vulnerabilities/hardcoded-secrets`
3. `/kb/security/vulnerabilities/xss`
4. `/kb/security/ai-patterns/cursor`
5. `/kb/security/ai-patterns/claude-code`

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
