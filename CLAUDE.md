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

## 🎯 VIBE CODING TERMINOLOGY (SEO CRITICAL)

**Use "vibe coding" terminology throughout all content.** This is how our audience describes what they do.

### Required Terms (Use Interchangeably)
- **vibe coding** - The practice of building with AI tools
- **vibe code** - Code generated this way
- **vibe coded** - Past tense ("vibe coded apps")
- **vibe coders** - The people doing it (our audience)
- **AI-generated code** - More technical term (use alongside vibe coding)

### Usage Requirements
- **Every article must use "vibe coding" terms at least 3-5 times**
- Mix with "AI-generated code" for variety
- Use in titles, H2s, and body text where natural
- Include in Quick Answer boxes when relevant

### Example Usage
```markdown
✅ GOOD:
"Vibe coding makes building apps fast, but AI tools often generate insecure patterns."
"This vulnerability is common in vibe coded projects because AI prioritizes working code."
"As a vibe coder, you need to check for SQL injection in AI-generated code."

❌ BAD:
"AI-assisted development..." (too formal, not how audience searches)
"Code written with AI tools..." (misses the keyword)
```

### Search Intent
People search for:
- "vibe coding security"
- "vibe code vulnerabilities"
- "is vibe coding safe"
- "vibe coding best practices"

We want to rank for ALL of these.

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

**No Em Dashes:** Never use em dashes (—) in content. Use regular hyphens (-) or rewrite the sentence.

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

---

## Content System

Read `.content-ops/` for templates, queue, and detailed guidelines:
- `QUEUE.md` - Articles to generate with data
- `agents/writer-agent.md` - Full writing guidelines
- `checklists/qa-checklist.md` - Pre-publish checklist

---

## Top 10 Rules for SEO + LLM Optimization

**MANDATORY CHECKLIST: Every article MUST pass all 10 rules before publishing.**

### SEO Rules (Get Ranked)

| # | Rule | Requirement | Example |
|---|------|-------------|---------|
| 1 | **Answer in first 50 words** | Quick Answer box must be under 50 words and directly answer the query | "SQL injection is a vulnerability where attackers insert malicious code into database queries through user input, potentially stealing your entire database." (25 words) |
| 2 | **Question-based H2s** | Every H2 should be a question matching search intent | "What is SQL injection?" not "SQL Injection Overview" |
| 3 | **Title under 60 chars, keyword first** | Primary keyword at start, total under 60 characters | "SQL Injection: Find & Fix..." (47 chars) ✅ not "How to Find & Fix SQL Injection..." (65 chars) ❌ |
| 4 | **5-10 internal links per page** | Link to related vulns, tools, stacks, fixes | Links to XSS, Cursor patterns, Next.js stack guide |
| 5 | **One topic = one page** | Don't dilute. Each page targets one keyword cluster | SQL injection page only covers SQL injection |

### LLM Rules (Get Cited)

| # | Rule | Requirement | Example |
|---|------|-------------|---------|
| 6 | **Self-contained sections (75-225 words)** | Each H2 section must standalone without context | Each section readable by an LLM in isolation |
| 7 | **Citable facts with attribution** | Stats must have source and date. If no Scanner data, use external sources with links | "According to [OWASP Top 10 (2021)](url), injection ranks #3..." |
| 8 | **First sentence answers the H2** | First sentence after H2 MUST directly answer the question | "## What is XSS?" → "XSS (Cross-Site Scripting) is a vulnerability where..." |
| 9 | **FAQ with direct answers** | FAQ answers start with YES/NO or the direct fact, then explain | "Does React protect from XSS?" → "Yes, React escapes values by default..." |
| 10 | **Specific numbers, not vague claims** | Use exact figures. No "many", "about", "roughly" | "ranked #3" not "one of the top" |

### The Golden Formula (H2 Section Template)

```markdown
## What is SQL injection?

SQL injection is a vulnerability where attackers manipulate database queries by
inserting malicious code through user input fields. [DIRECT ANSWER - first sentence]

It allows attackers to read, modify, or delete your entire database. Think of it
like a hotel where guests write their own room keys. [PLAIN ENGLISH + ANALOGY]

According to [OWASP Top 10 (2021)](https://owasp.org/Top10/A03_2021-Injection/),
injection attacks rank #3 in web application security risks. [CITABLE FACT]
```

Word count: ~70 words. Self-contained. Citable. Direct answer first.

### Quick Answer Box Rules

The Quick Answer at the top of every article MUST:
- Be **under 50 words** (hard limit)
- **Directly answer** the implied query
- Include **one key fact** (OWASP ranking, CWE ID, or severity)
- Link to **authoritative source**

```html
<!-- GOOD: 45 words -->
<strong>SQL injection happens when user input is placed directly into database queries.</strong>
Attackers can manipulate queries to steal or delete your database. Ranked
<a href="https://owasp.org/Top10/A03_2021-Injection/">#3 on OWASP Top 10</a>.

<!-- BAD: 72 words - TOO LONG -->
<strong>SQL injection is one of the most dangerous...</strong> [continues for 70+ words]
```

### Pre-Publish Checklist

Before publishing, verify EVERY item:

```
SEO RULES
□ Rule 1: Quick Answer under 50 words
□ Rule 2: All H2s are questions
□ Rule 3: Title under 60 chars, keyword first
□ Rule 4: 5-10 internal links present
□ Rule 5: Single topic focus

LLM RULES
□ Rule 6: Each H2 section is 75-225 words
□ Rule 7: All stats have attribution + links
□ Rule 8: First sentence after each H2 directly answers it
□ Rule 9: FAQ answers start with direct answer
□ Rule 10: No vague claims ("many", "about", "roughly")
```

If ANY rule fails, fix it before publishing.

---

## Detailed Data Integrity Rules

### Internal Data (Scanner)
Always cite with this format:
```
According to VibeShip Scanner analysis of [N] repositories ([Month Year]), [finding].
```

Example:
```
According to VibeShip Scanner analysis of 10,847 repositories (December 2024),
23.4% of Cursor-generated projects contain SQL injection vulnerabilities.
```

Rules:
- Include exact sample size
- Include date/month of data
- Never round percentages (23.4% not ~25%)
- Always specify which tool if tool-specific

### External Data (Research & Standards)
Link to authoritative sources. Prefer:

| Source | Use For | Link Format |
|--------|---------|-------------|
| OWASP | Vulnerability categories, Top 10 | [OWASP Top 10](https://owasp.org/Top10/) |
| CWE/MITRE | Vulnerability definitions, IDs | [CWE-89](https://cwe.mitre.org/data/definitions/89.html) |
| NVD/NIST | CVE data, severity scores | [NVD](https://nvd.nist.gov/) |
| Snyk | Vulnerability research | [Snyk Learn](https://learn.snyk.io/) |
| PortSwigger | Technical deep-dives | [PortSwigger Web Security](https://portswigger.net/web-security) |
| HackerOne | Real-world reports, stats | [HackerOne Reports](https://hackerone.com/hacktivity) |
| Verizon DBIR | Breach statistics | [Verizon DBIR](https://www.verizon.com/business/resources/reports/dbir/) |
| IBM Cost of Breach | Financial impact stats | [IBM Security](https://www.ibm.com/security/data-breach) |

Citation format for external research:
```
According to the [Verizon 2024 Data Breach Investigations Report](https://www.verizon.com/business/resources/reports/dbir/),
injection attacks account for 23% of web application breaches.
```

Rules:
- Always link to the source
- Include year/version of the report
- Use official URLs, not summaries
- Verify the stat exists at the source

### Combining Sources
When using multiple sources:
```
SQL injection remains the #3 vulnerability in the [OWASP Top 10 (2021)](https://owasp.org/Top10/A03_2021-Injection/).
Our Scanner data shows it affects 23.4% of AI-generated codebases, higher than the
[15% industry average reported by Snyk](https://snyk.io/reports/open-source-security/).
```

---

## Required Citations by Content Type

### Vulnerability Articles
Must include:
- [ ] CWE link: `[CWE-89](https://cwe.mitre.org/data/definitions/89.html)`
- [ ] OWASP link: `[OWASP A03:2021](https://owasp.org/Top10/A03_2021-Injection/)`
- [ ] Scanner stat with sample size and date (when available)
- [ ] At least 1 external research citation (Verizon, HackerOne, etc.)

### AI Tool Articles
Must include:
- [ ] Scanner stats for this tool vs others
- [ ] Link to tool's official site
- [ ] Link to any existing security research about the tool

### Stack Guides
Must include:
- [ ] Framework security docs: `[Next.js Security](https://nextjs.org/docs/security)`
- [ ] Database security docs: `[Supabase RLS](https://supabase.com/docs/guides/auth/row-level-security)`
- [ ] Scanner stats for this stack (when available)

---

## Section Template

Every H2 section should follow this pattern:

```markdown
## What is SQL injection?

[DIRECT ANSWER - 1 sentence with key stat]
SQL injection affects 23.4% of AI-generated codebases according to VibeShip Scanner
analysis of 10,847 repositories (December 2024).

[PLAIN ENGLISH - 2-3 sentences]
It happens when user input is placed directly into database queries. Attackers can
manipulate these queries to read, modify, or delete your entire database.

[AUTHORITY REFERENCE - 1 sentence with link]
It has remained in the [OWASP Top 10](https://owasp.org/Top10/) since the list began
in 2003, currently ranked #3 under Injection attacks.

[CONTEXT/IMPACT - 1-2 sentences]
For vibe coders, this is critical because AI tools like Cursor generate vulnerable
patterns by default.
```

- Word count: 75-150 words
- Links: 1-2 per section minimum

---

## Outbound Link Guidelines

### Do Link To
- Official documentation (OWASP, CWE, framework docs)
- Peer-reviewed research and reports
- Authoritative security sources (NIST, SANS, PortSwigger)
- Original research with methodology
- Official tool/framework websites

### Don't Link To
- Random blog posts without sources
- SEO content farms
- Outdated resources (>3 years for stats)
- Paywalled content (unless essential)
- Competitors' content

### Link Formatting
```markdown
<!-- Inline for flow -->
...according to [OWASP](https://owasp.org/Top10/)...

<!-- Reference style for multiple uses -->
SQL injection is [CWE-89][cwe-89] in the MITRE database.

[cwe-89]: https://cwe.mitre.org/data/definitions/89.html
```

---

## Fact-Checking Checklist

Before including any statistic:
- [ ] Is the source authoritative?
- [ ] Is the data current (within 2 years for stats)?
- [ ] Can I link directly to the source?
- [ ] Is the methodology sound?
- [ ] Am I representing it accurately (not cherry-picking)?

If you can't verify a stat, don't use it. Say "commonly cited" or find a better source.

---

## Quality Signals

### Strong Content Has
- Scanner data + external research (dual validation)
- Links to CWE/OWASP for every vulnerability
- Framework docs linked for every code recommendation
- Specific numbers with dates
- 2-3 outbound links per 500 words

### Weak Content Has
- Vague claims ("many projects have this issue")
- No external validation of our data
- Missing CWE/OWASP references
- Outdated statistics
- No links to authoritative sources

---

## Quick Reference: Key Sources

```
OWASP Top 10:     https://owasp.org/Top10/
CWE Database:     https://cwe.mitre.org/data/definitions/
NIST NVD:         https://nvd.nist.gov/
Snyk Learn:       https://learn.snyk.io/
PortSwigger:      https://portswigger.net/web-security
HackerOne:        https://hackerone.com/hacktivity
Verizon DBIR:     https://www.verizon.com/business/resources/reports/dbir/
SANS:             https://www.sans.org/
Next.js Security: https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy
Supabase RLS:     https://supabase.com/docs/guides/auth/row-level-security
Prisma Security:  https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access
```

---

## Two-Agent Content Pipeline (MANDATORY)

**All KB content MUST be created using the two-agent system.** This ensures consistent quality, proper research, and SEO/LLM optimization.

### The Pipeline

```
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│   AGENT 1    │      │   HANDOFF    │      │   AGENT 2    │
│   Research   │ ───▶ │   Content    │ ───▶ │   Writer     │ ───▶ OUTPUT
│              │      │   Brief      │      │              │
└──────────────┘      └──────────────┘      └──────────────┘
```

### Agent 1: Research Agent

**Role:** Security research analyst who gathers data and creates structured briefs.

**What Agent 1 Does:**
- Query and analyze Scanner database (when available)
- Research competitors via web search
- Identify keyword opportunities and PAA questions
- Validate CWE/OWASP references
- Create structured Content Briefs
- Map internal linking opportunities

**What Agent 1 Does NOT Do:**
- Write article prose
- Create AI fix prompts
- Write FAQ answers
- Apply brand voice
- Create code examples

**Agent 1 Prompt Template:**
```
You are the VibeShip Research Agent. Create a comprehensive content brief for:

Topic: [TOPIC NAME]
Type: [vulnerability/tool/stack]

Include:
1. Core data (CWE, OWASP, external sources)
2. SEO strategy (keywords, search intent, PAA questions)
3. Competitive analysis (top 3 results, gaps)
4. Content structure (outline with word counts)
5. Internal linking targets
6. Unique angle

Use the template from docs/.content-ops/templates/
Output a complete Content Brief - do NOT write the article.
```

### Agent 2: Writer Agent

**Role:** World-class security content writer using VIBESHIP-SECURITY-WRITER-AGENT-PROMPT.

**What Agent 2 Does:**
- Transform briefs into publication-ready content
- Apply VibeShip brand voice
- Create AI fix prompts (200-400 words)
- Write FAQ sections with schema
- Generate before/after code examples
- Optimize for SEO and LLM citation

**What Agent 2 Does NOT Do:**
- Research new data
- Validate statistics
- Analyze competitors
- Query databases

**Agent 2 Prompt Template:**
```
You are the VibeShip Security Writer. Using the guidelines from
docs/.content-ops/strategies/VIBESHIP-SECURITY-WRITER-AGENT-PROMPT.md,
create a complete article from this Content Brief:

[PASTE CONTENT BRIEF FROM AGENT 1]

Requirements:
- Follow exact content formula
- Use all data points from brief
- Create complete AI fix prompt
- Write 5 FAQ entries
- Include all internal links specified
```

### How to Execute (Using Claude Code Task Tool)

**Step 1: Dispatch Research Agent(s) in Parallel**
```
Use Task tool with subagent_type='general-purpose':
- "Research Claude Code security patterns for KB article. Create Content Brief using docs/.content-ops/templates/tool-brief.md"
- "Research Bolt security patterns for KB article..."
- "Research Next.js + Supabase security for KB stack guide..."
```

**Step 2: Review Briefs**
Check each brief for:
- [ ] All data points have sources
- [ ] Keywords identified
- [ ] Competitor gaps specific
- [ ] Internal links valid

**Step 3: Dispatch Writer Agent(s) with Briefs**
```
Use Task tool with subagent_type='general-purpose':
- Include full VIBESHIP-SECURITY-WRITER-AGENT-PROMPT.md
- Include the Content Brief from Step 1
- Request complete Svelte component output
```

**Step 4: QA and Publish**
- Verify against qa-checklist.md
- Create Svelte file
- Commit and update QUEUE.md

### Key Documents

| Document | Location | Purpose |
|----------|----------|---------|
| Research Agent | `docs/.content-ops/agents/research-agent.md` | Agent 1 system prompt |
| Writer Agent | `docs/.content-ops/agents/writer-agent.md` | Agent 2 system prompt |
| Full Writer Skill | `docs/.content-ops/strategies/VIBESHIP-SECURITY-WRITER-AGENT-PROMPT.md` | Complete writer guidelines |
| Pipeline Guide | `docs/.content-ops/PIPELINE.md` | Full two-agent workflow |
| Vulnerability Brief | `docs/.content-ops/templates/vulnerability-brief.md` | Template for vuln research |
| Tool Brief | `docs/.content-ops/templates/tool-brief.md` | Template for AI tool research |
| Stack Brief | `docs/.content-ops/templates/stack-brief.md` | Template for stack guide research |

### Why Two Agents?

| Single Agent Problems | Two-Agent Solution |
|-----------------------|-------------------|
| Research + writing consumes too much context | Each agent focused on its task |
| Quality degrades mixing research + writing | Clear separation of concerns |
| Hard to iterate | Review briefs before writing |
| Inconsistent output | Standardized briefs ensure consistency |

---

## Processing Queue Articles

When processing from `.content-ops/QUEUE.md`:

1. **Agent 1:** Create Content Brief using appropriate template
2. **Review:** Verify brief completeness
3. **Agent 2:** Write article using VIBESHIP-SECURITY-WRITER-AGENT-PROMPT.md
4. **Apply:** CLAUDE.md rules for SEO/LLM/citations
5. **Output:** Svelte component
6. **Verify:** Against qa-checklist.md
7. **Update:** QUEUE.md status

**For parallel processing, dispatch multiple Agent 1 tasks simultaneously, then multiple Agent 2 tasks.**

**Start prompt:**
```
Process the next article from .content-ops/QUEUE.md using the two-agent pipeline
```
