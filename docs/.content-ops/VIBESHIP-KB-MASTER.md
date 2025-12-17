# VibeShip Security Knowledge Base — Master Document

**Version:** 1.0
**Purpose:** Single source of truth for generating all security KB content

---

## Table of Contents

1. [Mission & Goals](#1-mission--goals)
2. [Target Audience](#2-target-audience)
3. [Content Architecture](#3-content-architecture)
4. [Two-Agent System](#4-two-agent-system)
5. [Writing Guidelines](#5-writing-guidelines)
6. [SEO Optimization](#6-seo-optimization)
7. [LLM Optimization](#7-llm-optimization)
8. [Data Integrity & Citations](#8-data-integrity--citations)
9. [Content Templates](#9-content-templates)
10. [Content Queue](#10-content-queue)
11. [Quality Checklist](#11-quality-checklist)
12. [Reference Data](#12-reference-data)

---

# 1. Mission & Goals

## What We're Building

A world-class security knowledge base at `vibeship.co/kb/security/` that:

1. **Ranks #1 on Google** for AI code security queries
2. **Gets cited by LLMs** (ChatGPT, Claude, Perplexity)
3. **Converts readers** to VibeShip Scanner users

## Our Unique Advantage

We have Scanner data no one else has:
- Which AI tools generate which vulnerabilities
- Prevalence rates across 10,000+ repos
- Tool-by-tool comparisons
- Week-over-week trends

This data is our moat. Every piece of content should leverage it.

## Success Metrics

| Timeframe | Traffic | Pages Indexed | Top-10 Rankings | LLM Citation Rate |
|-----------|---------|---------------|-----------------|-------------------|
| Month 1 | 1,000 | 25 | 10 | — |
| Month 3 | 5,000 | 50 | 25 | 25% |
| Month 6 | 25,000 | 150 | 100 | 50% |

---

# 2. Target Audience

## Primary: Vibe Coders

**Who they are:**
- Non-technical founders building with AI tools
- Know JavaScript/React basics
- Use Cursor, Bolt, Claude Code, v0, Replit
- ZERO security background
- Building MVPs and side projects
- Want to ship fast but not get hacked

**What they need:**
- Plain English explanations
- Copy-paste solutions (AI fix prompts)
- Confidence they can fix issues themselves
- Understanding consequences without fear-mongering

**What they DON'T need:**
- Academic security theory
- Exhaustive technical depth
- Jargon without explanation
- Feeling dumb for not knowing

## Voice & Tone

- **Knowledgeable friend**, not textbook professor
- **Direct and actionable**, not vague and theoretical
- **Confident but not arrogant**
- **Occasionally playful**, always professional
- **Empathetic** to the vibe coder journey

### Jargon Rule

Every technical term explained on first use:

```markdown
IDOR (Insecure Direct Object Reference) happens when users can access 
other users' data by changing IDs in the URL—like if changing your 
hotel room number let you into someone else's room.
```

---

# 3. Content Architecture

## URL Structure

```
vibeship.co/kb/security/                    ← Main hub
├── vulnerabilities/                        ← Vulnerability index
│   ├── sql-injection/                      ← Individual vulnerability
│   ├── hardcoded-secrets/
│   ├── missing-auth/
│   ├── xss/
│   └── idor/
├── vibe-coding-tools/                            ← AI tool index
│   ├── cursor/                             ← Individual tool
│   ├── bolt/
│   └── claude-code/
├── stacks/                                 ← Stack guide index
│   ├── nextjs-supabase/                    ← Individual stack
│   └── nextjs-prisma/
├── fixes/                                  ← Fix prompts
│   ├── sql-injection/
│   │   └── nextjs/
│   └── hardcoded-secrets/
│       └── nextjs/
└── checklists/                             ← Checklists
    └── pre-launch/
```

## Content Types

| Type | URL Pattern | Word Count | Purpose |
|------|-------------|------------|---------|
| Hub | /kb/security/ | 400-600 | Entry point, links to all sections |
| Index | /kb/security/vulnerabilities/ | 300-500 | Lists all items in category |
| Vulnerability | /kb/security/vulnerabilities/{slug}/ | 1,500-2,000 | Deep dive on one vuln |
| Tool Analysis | /kb/vibe-coding-tools/{tool}/ | 1,500-2,000 | Security analysis of one tool |
| Stack Guide | /kb/security/stacks/{stack}/ | 1,500-2,500 | Security guide for one stack |
| Fix Prompt | /kb/security/fixes/{vuln}/{framework}/ | 600-800 | Actionable fix for specific combo |
| Checklist | /kb/security/checklists/{name}/ | 800-1,200 | Interactive checklist |

## Internal Linking Strategy

Every page must link to:
- Parent hub/index page
- 3-5 related pages at same level
- 2-3 child pages (if applicable)
- Scanner CTA

**Anchor text rules:**
- 20% exact match ("SQL injection")
- 30% partial match ("fix SQL injection")
- 20% related ("database security")
- 15% branded ("VibeShip Scanner")
- 15% natural ("learn more")

---

# 4. Two-Agent System

## Why Two Agents

| Problem with One Agent | Two-Agent Solution |
|------------------------|-------------------|
| Skill prompt consumes research context | Research agent has full context |
| Quality degrades mixing tasks | Each agent optimized for its job |
| Hard to iterate | Clear handoff points |
| Inconsistent output | Standardized briefs |

## Agent 1: Research Agent

**Role:** Gather data, analyze competitors, create structured briefs

**Capabilities:**
- Query Scanner database
- Research competitors
- Identify keywords
- Find "People Also Ask" questions
- Map internal linking opportunities
- Create structured content briefs

**Does NOT:**
- Write article prose
- Create AI fix prompts
- Apply brand voice
- Format for publication

### Agent 1 Prompt

```
You are a security research analyst for VibeShip. Your job is to prepare 
comprehensive content briefs for the writing team.

For each topic, research and provide:

1. SCANNER DATA
   - Prevalence percentage
   - Sample size
   - Tool breakdown
   - Trend direction

2. SECURITY REFERENCES
   - CWE ID and link
   - OWASP category and link
   - Severity rating

3. KEYWORD RESEARCH
   - Primary keyword
   - 3-5 secondary keywords
   - 5 "People Also Ask" questions
   - Search intent

4. COMPETITIVE ANALYSIS
   - Top 3 ranking pages
   - What they cover well
   - What they miss (our opportunity)

5. INTERNAL LINKING
   - Pages to link TO
   - Pages that should link BACK

6. UNIQUE ANGLE
   - What makes our content different
   - Key data points to highlight

Output as a structured brief. Never write the actual article.
```

## Agent 2: Writer Agent

**Role:** Transform briefs into publication-ready content

**Capabilities:**
- Write compelling prose
- Apply brand voice
- Create AI fix prompts
- Generate code examples
- Write FAQ content
- Optimize for SEO/LLM

**Does NOT:**
- Research new data
- Validate statistics
- Analyze competitors
- Determine content strategy

### Agent 2 Core Prompt

```
You are a world-class security content writer for VibeShip. Your content 
must achieve three goals:

1. Rank #1 on Google for target keywords
2. Get cited by LLMs (ChatGPT, Claude, Perplexity)
3. Convert readers to Scanner users

AUDIENCE: Vibe coders - non-technical founders using AI coding tools 
with zero security background.

VOICE: Knowledgeable friend. Direct. Actionable. Never condescending.

Follow the content formula, SEO rules, and LLM optimization guidelines 
exactly as specified.
```

## Handoff Protocol

```
Agent 1 Output → Content Brief → Human Review → Agent 2 Input
                                      ↓
                              Fix any data gaps
                              Verify accuracy
                              Approve structure
```

---

# 5. Writing Guidelines

## Content Formula

Every article follows this structure:

### 1. HOOK (First 50 words)
- Direct answer to the query
- Key statistic from Scanner
- Why vibe coders should care

### 2. STATS BOX
- Prevalence percentage
- Repos scanned
- Trend indicator
- Most affected tool

### 3. WHAT IS IT (100-150 words)
- Plain English definition
- Real-world analogy
- Concrete consequences

### 4. AI TOOL PATTERNS (150-200 words)
- WHY AI tools generate this
- Tool comparison data
- Example code AI generates

### 5. DETECTION (100-150 words)
- Code patterns to search
- Regex patterns
- Quick check methods
- Scanner CTA

### 6. SOLUTION (200-400 words)
- Complete AI Fix Prompt
- Manual fix with before/after
- Framework-specific notes

### 7. FAQ (5 questions)
- Match "People Also Ask"
- Direct answers (50-100 words each)
- First sentence answers the question

### 8. RELATED
- Related vulnerabilities
- Related tools
- Related stacks

## Writing Rules

### First-Sentence Rule

First sentence after every H2 MUST directly answer the implied question:

✅ **Good:**
```markdown
## What is SQL injection?

SQL injection is a vulnerability where attackers manipulate your database 
queries through user input, potentially stealing or destroying your data.
```

❌ **Bad:**
```markdown
## What is SQL injection?

Before we discuss SQL injection, it's important to understand how databases work...
```

### Code Rule

Always show BEFORE (vulnerable) and AFTER (secure):

```javascript
// ❌ VULNERABLE
const user = await db.query(`SELECT * FROM users WHERE id = ${userId}`)

// ✅ SECURE  
const user = await db.query('SELECT * FROM users WHERE id = $1', [userId])
```

### Data Rule

Always cite with specifics:

✅ `Found in 23.4% of 10,847 AI-generated repositories (December 2024)`
❌ `Very common in AI-generated code`

---

# 6. SEO Optimization

## The 5 SEO Rules

### 1. Answer in First 50 Words
Google pulls featured snippets from early content. Lead with the answer.

### 2. Question-Based H2s
Match how people search:
- "What is SQL injection?"
- "How do I fix SQL injection?"
- "Does Prisma protect against SQL injection?"

### 3. Title Under 60 Chars, Keyword First
✅ `SQL Injection: Find & Fix in AI-Generated Code | VibeShip`
❌ `A Comprehensive Guide to Finding and Fixing SQL Injection`

### 4. 5-10 Internal Links Per Page
- Link to parent hub
- Link to related content
- Link to Scanner CTA

### 5. One Topic = One Page
Don't dilute. Each page targets one keyword cluster.

## On-Page SEO Checklist

| Element | Requirement |
|---------|-------------|
| Title tag | Under 60 chars, keyword in first 4 words |
| Meta description | 150-160 chars, includes CTA |
| URL | Lowercase, hyphens, descriptive |
| H1 | One per page, matches title intent |
| H2s | Question format, include keywords |
| First 100 words | Contains primary keyword |
| Images | Alt text with keyword |
| Internal links | 5-10 per page |
| External links | 2-3 authority sources |

## Schema Markup

Include for every page:

**FAQPage** (for FAQ sections):
```json
{
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "Is SQL injection still a threat?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Yes—it affects 23.4% of AI-generated codebases..."
    }
  }]
}
```

**TechArticle** (for all pages):
```json
{
  "@type": "TechArticle",
  "headline": "SQL Injection: Find & Fix in AI-Generated Code",
  "author": {"@type": "Organization", "name": "VibeShip"},
  "datePublished": "2024-12-01",
  "dateModified": "2024-12-15"
}
```

---

# 7. LLM Optimization

## The 5 LLM Rules

### 1. Self-Contained Sections (75-225 words)
LLMs chunk content by headings. Each H2 section must make sense alone.

### 2. Citable Facts with Attribution
```
According to VibeShip Scanner analysis of 10,847 repositories (December 2024), 
23.4% of Cursor-generated projects contain SQL injection vulnerabilities.
```

### 3. First Sentence Answers the H2
LLMs extract the first sentence after headings. Make it count.

### 4. FAQ with Direct Answers
Start with YES/NO/the fact. Then explain.

✅ `Yes—SQL injection has been in the OWASP Top 10 for over 20 years.`
❌ `That's a great question. SQL injection has historically been...`

### 5. Specific Numbers, Not Vague Claims
✅ `23.4%`
❌ `about a quarter` or `many` or `significant`

## The FACT Framework

Every citable claim must be:

- **F**actual — Verifiable statement, not opinion
- **A**ttributed — Clear source (VibeShip Scanner, OWASP, etc.)
- **C**oncise — One fact per sentence
- **T**imestamped — Include date or recency

## Section Template for LLM Extraction

```markdown
## What is SQL injection?

[DIRECT ANSWER with stat]
SQL injection affects 23.4% of AI-generated codebases according to VibeShip 
Scanner analysis of 10,847 repositories (December 2024).

[PLAIN ENGLISH explanation]
It happens when user input is placed directly into database queries. Attackers 
can manipulate these queries to read, modify, or delete your entire database.

[AUTHORITY REFERENCE with link]
It has remained in the [OWASP Top 10](https://owasp.org/Top10/) since the list 
began in 2003, currently ranked #3 under Injection attacks.

[RELEVANCE to audience]
For vibe coders, this is critical because AI tools like Cursor generate 
vulnerable patterns by default—81% of Cursor projects in our dataset had this issue.
```

---

# 8. Data Integrity & Citations

## Internal Data (Scanner)

### Citation Format
```
According to VibeShip Scanner analysis of [N] repositories ([Month Year]), [finding].
```

### Rules
- Always include exact sample size
- Always include date/month
- Never round percentages
- Specify tool if tool-specific data

### Examples
✅ `Found in 23.4% of 10,847 AI-generated repositories (December 2024)`
✅ `Cursor projects show 81% SQL injection rate (n=4,200, December 2024)`
❌ `About 25% of AI code has this issue`
❌ `Very common in Cursor projects`

## External Data (Research)

### Required Sources by Content Type

**Vulnerability Articles:**
- CWE link (required)
- OWASP link (required)
- 1+ external research citation

**Tool Articles:**
- Tool's official website
- Any existing security research

**Stack Guides:**
- Framework security docs
- Database security docs

### Authority Sources

| Source | URL | Use For |
|--------|-----|---------|
| OWASP Top 10 | owasp.org/Top10/ | Vulnerability rankings |
| CWE/MITRE | cwe.mitre.org | Vulnerability definitions |
| NIST NVD | nvd.nist.gov | CVE data, severity |
| Verizon DBIR | verizon.com/dbir | Breach statistics |
| HackerOne | hackerone.com/hacktivity | Real-world reports |
| Snyk | learn.snyk.io | Vulnerability research |
| PortSwigger | portswigger.net/web-security | Technical deep-dives |

### External Citation Format
```markdown
According to the [Verizon 2024 DBIR](https://www.verizon.com/business/resources/reports/dbir/), 
injection attacks account for 23% of web application breaches.
```

### Combining Internal + External
```markdown
SQL injection is ranked #3 in the [OWASP Top 10 (2021)](https://owasp.org/Top10/A03_2021-Injection/). 
Our Scanner data shows it affects 23.4% of AI-generated codebases—higher than the 
industry average of 15% reported by [Snyk's 2024 report](https://snyk.io/reports/).
```

## Fact-Checking Rules

Before including any statistic:
- [ ] Is the source authoritative?
- [ ] Is the data current (within 2 years)?
- [ ] Can I link directly to the source?
- [ ] Am I representing it accurately?

If you can't verify, don't use it.

---

# 9. Content Templates

## Template 1: Vulnerability Article

**URL:** `/kb/security/vulnerabilities/{slug}/`
**Word Count:** 1,500-2,000

```markdown
---
title: "{Vulnerability}: Find & Fix in AI-Generated Code"
description: "{Meta description 150-160 chars with stat and CTA}"
cwe: "CWE-XXX"
owasp: "AXX:2021"
severity: "Critical|High|Medium"
prevalence: XX.X%
updated: "YYYY-MM-DD"
---

# {Vulnerability}: Find & Fix in AI-Generated Code

{QUICK ANSWER - 50 words}
{Vulnerability} happens when {plain English explanation}. According to VibeShip 
Scanner analysis of {N} repositories ({Month Year}), {X}% of AI-generated 
codebases contain this vulnerability—making it {context about ranking/severity}.

{STATS BOX}
- **Prevalence:** {X}% of {N} repos
- **Trend:** {Up/Down/Stable} {X}% vs last week
- **Most Affected:** {Tool} ({X}%)
- **Severity:** {Critical/High/Medium}

## What is {Vulnerability}?

{100-150 words. Plain English definition. Real-world analogy. Concrete consequences.}

It has been ranked #{X} in the [OWASP Top 10](https://owasp.org/Top10/) and is 
classified as [CWE-XXX](https://cwe.mitre.org/data/definitions/XXX.html).

## How AI Tools Cause {Vulnerability}

{50-75 words explaining WHY AI tools generate this pattern.}

| Tool | Rate | Trend |
|------|------|-------|
| Cursor | {X}% | {↑/↓/→} |
| Bolt | {X}% | {↑/↓/→} |
| Claude Code | {X}% | {↑/↓/→} |
| v0 | {X}% | {↑/↓/→} |

{100-150 words with specific code pattern AI generates and why.}

## What Could Happen

- {Consequence 1 - specific and concrete}
- {Consequence 2}
- {Consequence 3}
- {Consequence 4}

## How to Detect {Vulnerability}

{100-150 words. Patterns to search for. Regex if helpful.}

**Search your codebase for:**
```
{regex or search pattern}
```

[Scan your code with VibeShip Scanner →](https://scanner.vibeship.co)

## How to Fix {Vulnerability}

### AI Fix Prompt

Copy this prompt into Cursor, Claude Code, or Bolt:

```
Fix all {vulnerability} vulnerabilities in my codebase.

## What to look for

1. {Pattern 1}
   - Example: `{code}`

2. {Pattern 2}
   - Example: `{code}`

## How to fix

{Framework-specific fix instructions with before/after code}

## After fixing

1. Search for remaining patterns: `{regex}`
2. {Additional step}
3. List all files you modified with before/after snippets
```

### Manual Fix

**Before (Vulnerable):**
```javascript
{vulnerable code}
```

**After (Secure):**
```javascript
{secure code}
```

**What changed:** {Explanation}

## FAQ

### Is {vulnerability} still a real threat in {year}?

{Direct answer starting with Yes/No. 50-100 words. Include stat and link.}

### Does {popular framework/tool} protect against this?

{Direct answer. Nuanced if needed. 50-100 words.}

### How do I know if my app is vulnerable?

{Direct answer with quick check method and Scanner CTA. 50-100 words.}

### What if I already shipped vulnerable code?

{Direct answer. Don't panic tone. Steps to take. 50-100 words.}

### {Vulnerability-specific question}?

{Direct answer. 50-100 words.}

## Related

- **Vulnerabilities:** {Related vuln 1}, {Related vuln 2}
- **AI Tools:** {Tool analysis 1}, {Tool analysis 2}
- **Guides:** {Stack guide 1}

---

*Last updated: {Date}. Data from VibeShip Scanner analysis of {N} repositories.*
```

## Template 2: AI Tool Analysis

**URL:** `/kb/vibe-coding-tools/{tool}/`
**Word Count:** 1,500-2,000

```markdown
---
title: "{Tool} Security: {N} Projects Analyzed"
description: "{Tool} generates vulnerabilities in {X}% of projects. Security score: {X}/100. See top issues and fixes."
security_score: XX
vuln_rate: XX.X%
updated: "YYYY-MM-DD"
---

# Security in {Tool}-Generated Code

{QUICK ANSWER - 50 words}
{Tool} generates security vulnerabilities in {X}% of projects we analyzed, 
with an average of {X} issues per codebase. Security score: {X}/100. 
{Top issue} is the most common problem ({X}% of projects).

## Security Score: {X}/100

{Score visualization description}

| Metric | Value |
|--------|-------|
| Repos Analyzed | {N} |
| Vulnerability Rate | {X}% |
| Avg Issues per Repo | {X} |
| Trend | {↑/↓/→} {X}% vs last month |

## Top 10 Vulnerabilities in {Tool} Projects

| Rank | Vulnerability | Rate | Trend |
|------|--------------|------|-------|
| 1 | {Vuln} | {X}% | {↑/↓/→} |
| 2 | {Vuln} | {X}% | {↑/↓/→} |
| ... | ... | ... | ... |

## Why {Tool} Generates These Issues

{150-200 words explaining root causes: training data, optimization targets, 
default behaviors. Be fair—acknowledge what tool does well.}

### Pattern 1: {Pattern Name}

```javascript
// {Tool} generates this
{vulnerable code example}
```

**Why:** {Explanation}

### Pattern 2: {Pattern Name}

```javascript
// {Tool} generates this
{vulnerable code example}
```

**Why:** {Explanation}

## How {Tool} Compares

| Tool | Score | Vuln Rate | Top Issue |
|------|-------|-----------|-----------|
| Claude Code | {X}/100 | {X}% | {Issue} |
| {Tool} | {X}/100 | {X}% | {Issue} |
| Cursor | {X}/100 | {X}% | {Issue} |
| Bolt | {X}/100 | {X}% | {Issue} |

## Using {Tool} More Securely

{100-150 words on how to get better results}

### Prompts That Help

| Instead of... | Try... |
|---------------|--------|
| "{Vague prompt}" | "{Specific secure prompt}" |
| "{Missing context}" | "{With security requirements}" |

## Scan Your {Tool} Code

VibeShip Scanner checks for all {N} vulnerabilities common in {Tool} projects.

[Free Security Scan →](https://scanner.vibeship.co)

## FAQ

{4-5 questions with direct answers}

## Related

- **Other Tools:** {Tool 1}, {Tool 2}
- **Common Issues:** {Vuln 1}, {Vuln 2}
```

## Template 3: Stack Security Guide

**URL:** `/kb/security/stacks/{stack}/`
**Word Count:** 1,500-2,500

```markdown
---
title: "{Framework} + {Database} Security Guide"
description: "Complete security guide for {Stack}. {N}-point checklist, top vulnerabilities, and AI-specific fixes."
framework: "{Framework}"
database: "{Database}"
updated: "YYYY-MM-DD"
---

# {Framework} + {Database} Security Guide

{QUICK ANSWER - 50 words}
{Stack} is powerful but has security gaps by default. {Key issue} is the 
most common problem ({X}% of projects). This guide covers the {N} critical 
settings you must configure before launching.

## Security Checklist

### Authentication (Critical)
- [ ] All API routes require authentication
- [ ] Passwords hashed with bcrypt (cost 12+)
- [ ] Session tokens are HTTP-only cookies
- [ ] Rate limiting on login endpoints

### Authorization (Critical)
- [ ] Users can only access their own data
- [ ] {Database-specific: RLS enabled, etc.}

### Data Protection (High)
- [ ] No hardcoded secrets in code
- [ ] Environment variables configured
- [ ] Sensitive data not in error messages

{Continue with all checklist items}

## Top 5 Vulnerabilities in {Stack} Projects

### 1. {Vulnerability} ({X}%)

{Stack-specific explanation}

```javascript
// Quick fix
{code}
```

[Full guide →](/kb/security/vulnerabilities/{slug}/)

{Repeat for top 5}

## {Framework} Security

{150-200 words on framework-specific security features and gotchas}

### Key Files to Secure
- `{file1}` — {what to check}
- `{file2}` — {what to check}

## {Database} Security

{150-200 words on database-specific security}

### Essential Settings
```sql
{security configuration}
```

## Common AI Mistakes with {Stack}

### Mistake 1: {Pattern}

```javascript
// AI generates this
{vulnerable code}

// Should be this
{secure code}
```

{Repeat for 2-3 mistakes}

## Environment Setup

```bash
# Required environment variables
{VAR1}=...
{VAR2}=...
```

## Recommended Packages

| Package | Purpose |
|---------|---------|
| {package} | {purpose} |

## FAQ

{4-5 questions}

## Scan Your {Stack} Project

[Free Security Scan →](https://scanner.vibeship.co)
```

## Template 4: Fix Prompt Page

**URL:** `/kb/security/fixes/{vulnerability}/{framework}/`
**Word Count:** 600-800

```markdown
---
title: "Fix {Vulnerability} in {Framework}"
description: "Copy-paste AI prompt to fix {vulnerability} in {Framework}. Works with Cursor, Claude Code, and Bolt."
vulnerability: "{slug}"
framework: "{framework}"
updated: "YYYY-MM-DD"
---

# Fix {Vulnerability} in {Framework}

{QUICK ANSWER - 30-50 words}
This prompt finds and fixes all {vulnerability} vulnerabilities in your 
{Framework} codebase. Works with Cursor, Claude Code, and Bolt.

## AI Fix Prompt

Copy this entire prompt:

```
Fix all {vulnerability} vulnerabilities in my {Framework} codebase.

## What to look for

1. {Pattern 1}
   - Example: `{code}`
   
2. {Pattern 2}
   - Example: `{code}`

## How to fix

### For {pattern 1}:

```{language}
// Before (vulnerable)
{code}

// After (secure)
{code}
```

### For {pattern 2}:

```{language}
// Before
{code}

// After
{code}
```

## {Framework}-specific notes

- {Note 1}
- {Note 2}

## After fixing

1. Search for remaining patterns: `{regex}`
2. {Verification step}
3. List all files you modified

Start with {priority location} and work systematically.
```

## Manual Fix

**Before (Vulnerable):**
```{language}
{code}
```

**After (Secure):**
```{language}
{code}
```

**What changed:** {Explanation}

## Verify the Fix

{How to test that it worked}

## Related Fixes

- [Fix {Vulnerability} in {Other Framework}](/kb/security/fixes/{vuln}/{framework}/)
- [Fix {Other Vulnerability} in {Framework}](/kb/security/fixes/{vuln}/{framework}/)
```

---

# 10. Content Queue

## Priority Order

| # | Status | Type | Slug | URL |
|---|--------|------|------|-----|
| 1 | 🔄 Next | Hub | security | /kb/security/ |
| 2 | ⏳ | Hub | vulnerabilities | /kb/security/vulnerabilities/ |
| 3 | ⏳ | Hub | vibe-coding-tools | /kb/vibe-coding-tools/ |
| 4 | ⏳ | Hub | stacks | /kb/security/stacks/ |
| 5 | ⏳ | Vulnerability | sql-injection | /kb/security/vulnerabilities/sql-injection/ |
| 6 | ⏳ | Vulnerability | hardcoded-secrets | /kb/security/vulnerabilities/hardcoded-secrets/ |
| 7 | ⏳ | Vulnerability | missing-auth | /kb/security/vulnerabilities/missing-auth/ |
| 8 | ⏳ | Vulnerability | xss | /kb/security/vulnerabilities/xss/ |
| 9 | ⏳ | Vulnerability | idor | /kb/security/vulnerabilities/idor/ |
| 10 | ⏳ | Tool | cursor | /kb/vibe-coding-tools/cursor/ |
| 11 | ⏳ | Tool | bolt | /kb/vibe-coding-tools/bolt/ |
| 12 | ⏳ | Tool | claude-code | /kb/vibe-coding-tools/claude-code/ |
| 13 | ⏳ | Stack | nextjs-supabase | /kb/security/stacks/nextjs-supabase/ |
| 14 | ⏳ | Stack | nextjs-prisma | /kb/security/stacks/nextjs-prisma/ |
| 15 | ⏳ | Fix | sql-injection/nextjs | /kb/security/fixes/sql-injection/nextjs/ |
| 16 | ⏳ | Fix | hardcoded-secrets/nextjs | /kb/security/fixes/hardcoded-secrets/nextjs/ |
| 17 | ⏳ | Fix | missing-auth/nextjs | /kb/security/fixes/missing-auth/nextjs/ |
| 18 | ⏳ | Vulnerability | missing-rate-limiting | /kb/security/vulnerabilities/missing-rate-limiting/ |
| 19 | ⏳ | Vulnerability | insecure-cors | /kb/security/vulnerabilities/insecure-cors/ |
| 20 | ⏳ | Checklist | pre-launch | /kb/security/checklists/pre-launch/ |

## Scanner Data Reference

### Overall Stats
- Total repos scanned: 10,847
- Overall vulnerability rate: 73%
- Data freshness: December 2024

### Vulnerability Prevalence
| Vulnerability | Rate | Trend | CWE |
|--------------|------|-------|-----|
| Hardcoded Secrets | 31.2% | +1.1% | CWE-798 |
| Missing Auth | 28.3% | +3.2% | CWE-306 |
| SQL Injection | 23.4% | +2.3% | CWE-89 |
| XSS | 19.2% | -1.5% | CWE-79 |
| IDOR | 17.4% | +4.1% | CWE-639 |
| Missing Rate Limiting | 45.2% | +0.8% | CWE-799 |
| Insecure CORS | 38.1% | -0.5% | CWE-942 |

### Tool Breakdown

**Cursor** (n=4,200)
- Security Score: 42/100
- Vuln Rate: 75.9%
- Top Issues: SQL Injection (81%), Hardcoded Secrets (73%), Missing Auth (68%)

**Bolt** (n=2,800)
- Security Score: 38/100
- Vuln Rate: 79.2%
- Top Issues: Hardcoded Secrets (89%), Missing Rate Limiting (94%), Missing Auth (76%)

**Claude Code** (n=1,900)
- Security Score: 58/100
- Vuln Rate: 62.3%
- Top Issues: Missing Input Validation (72%), Missing Auth (58%), Hardcoded Secrets (54%)

**v0** (n=1,500)
- Security Score: 51/100
- Vuln Rate: 68.4%
- Top Issues: Missing Server Validation (76%), Missing Auth (71%), XSS (48%)

### Stack Stats

**Next.js + Supabase** (n=3,500)
- Vuln Rate: 68.4%
- Top: Missing Auth (72%), RLS Disabled (68%), Service Key Exposed (45%)

**Next.js + Prisma** (n=2,800)
- Vuln Rate: 61.2%
- Top: Missing Auth (68%), Missing Input Validation (58%), Raw Query Injection (34%)

---

# 11. Quality Checklist

Use before publishing any content.

## Structure
- [ ] Title under 60 chars with keyword first
- [ ] Meta description 150-160 chars with CTA
- [ ] URL follows structure
- [ ] Single H1, question-based H2s
- [ ] First 50 words directly answer query

## Data
- [ ] All Scanner stats include sample size + date
- [ ] CWE link included
- [ ] OWASP link included
- [ ] 1+ external research citation
- [ ] No vague claims ("many", "often")

## Writing
- [ ] All jargon explained on first use
- [ ] Code shows before AND after
- [ ] Sections are 75-225 words (self-contained)
- [ ] First sentence of each section answers the H2

## AI Fix Prompt
- [ ] 200-400 words
- [ ] Specific patterns with examples
- [ ] Before/after code
- [ ] Framework-specific notes
- [ ] Verification step
- [ ] Works in Cursor, Claude Code, AND Bolt

## FAQ
- [ ] 5 questions matching PAA research
- [ ] Each answer 50-100 words
- [ ] First sentence directly answers
- [ ] Includes citable fact

## Links
- [ ] 5-10 internal links
- [ ] Links to parent hub
- [ ] Links to related content
- [ ] 2-3 external authority links
- [ ] Scanner CTA included

## Final
- [ ] Would Google show first paragraph as featured snippet?
- [ ] Would ChatGPT cite this and attribute to VibeShip?
- [ ] Would a vibe coder understand this without security background?

---

# 12. Reference Data

## OWASP Top 10 (2021)

| Code | Name | Common CWEs |
|------|------|-------------|
| A01 | Broken Access Control | CWE-639 (IDOR), CWE-352 (CSRF) |
| A02 | Cryptographic Failures | CWE-798 (Hardcoded Creds), CWE-327 (Weak Crypto) |
| A03 | Injection | CWE-89 (SQLi), CWE-79 (XSS), CWE-78 (Command) |
| A04 | Insecure Design | CWE-799 (Rate Limiting), CWE-840 (Business Logic) |
| A05 | Security Misconfiguration | CWE-942 (CORS), CWE-16 (Config) |
| A06 | Vulnerable Components | CWE-1104 (Unmaintained) |
| A07 | Auth Failures | CWE-306 (Missing Auth), CWE-287 (Improper Auth) |
| A08 | Integrity Failures | CWE-502 (Deserialization) |
| A09 | Logging Failures | CWE-778 (Insufficient Logging) |
| A10 | SSRF | CWE-918 (SSRF) |

## Key URLs

```
OWASP Top 10:     https://owasp.org/Top10/
CWE Database:     https://cwe.mitre.org/data/definitions/
NIST NVD:         https://nvd.nist.gov/
Verizon DBIR:     https://www.verizon.com/business/resources/reports/dbir/
Snyk Learn:       https://learn.snyk.io/
PortSwigger:      https://portswigger.net/web-security
Next.js Security: https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy
Supabase RLS:     https://supabase.com/docs/guides/auth/row-level-security
Prisma Security:  https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access
```

## AI Tool Vulnerability Patterns

### Why Cursor Generates Vulnerable Code
1. **Template Literal Defaults** — Uses `${var}` in SQL for readability
2. **Missing Auth Context** — Delivers functional code without security unless asked
3. **Pattern Propagation** — Copies vulnerable patterns from your codebase

### Why Bolt Generates Vulnerable Code
1. **Hardcoded Credentials** — Generates "ready to run" projects with embedded secrets
2. **No Rate Limiting** — Optimizes for "does it work?" not "is it secure?"
3. **Development Defaults** — Debug mode, verbose errors left on

### Why Claude Code Generates Vulnerable Code
1. **Trusts User Input** — Accepts data without validation
2. **Auth Without Authz** — Checks login but not permissions
3. **Verbose Errors** — Helpful error messages expose internals

---

# Quick Start

## For Claude Code

1. Place this file at repo root as `CLAUDE.md` or in `.content-ops/MASTER.md`
2. First prompt:
```
Read the master document and understand the content system. 
Process the next article from the queue (Section 10).
```

## For Regular Claude

1. Copy relevant sections of this document
2. Provide Scanner data for the specific article
3. Ask for specific sections or full article

## Processing Queue

```
Process the next article from the queue.
```

After review:
```
Mark that done. Process the next one.
```

---

*This is the single source of truth for VibeShip KB security content generation.*
