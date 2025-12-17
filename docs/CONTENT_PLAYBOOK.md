# VibeShip Content Machine
## The Complete Playbook for Knowledge Base Domination

---

## Table of Contents

1. [The Strategy](#part-1-the-strategy)
2. [Content Architecture](#part-2-content-architecture)
3. [Writing Guidelines](#part-3-writing-guidelines)
4. [SEO Optimization](#part-4-seo-optimization)
5. [LLM Optimization](#part-5-llm-optimization)
6. [Content Templates](#part-6-content-templates)
7. [Do's and Don'ts](#part-7-dos-and-donts)
8. [The Content Flywheel](#part-8-the-content-flywheel)
9. [Scaling with Programmatic Content](#part-9-scaling-with-programmatic-content)
10. [Content Calendar](#part-10-content-calendar)
11. [Quality Checklist](#part-11-quality-checklist)

---

# Part 1: The Strategy

## 1.1 The Vision

**Goal:** Make VibeShip the Wikipedia of AI-generated code security.

When anyone—human or AI—asks about:
- "Is AI-generated code secure?"
- "What vulnerabilities does Cursor create?"
- "How do I secure my Supabase app?"
- "What is SQL injection?"

**VibeShip should be the answer.**

## 1.2 The Three Pillars

### Pillar 1: Topical Authority

Google and LLMs don't just rank individual pages—they evaluate whether you're an **authority** on a topic. You become an authority by:

1. **Covering a topic comprehensively** — Every angle, every subtopic
2. **Internal linking** — Creating a web of related content
3. **Depth + Breadth** — Both pillar pages AND supporting content
4. **Freshness** — Regular updates with new data

### Pillar 2: Unique Data Moat

Your Scanner generates data no one else has. This is your unfair advantage:

- "73% of Cursor projects have SQL injection" — Only you can say this
- "Bolt generates 2.3x more auth bypasses than Claude Code" — Only you know this
- Weekly Vulnerability Index — Only you publish this

**Data = Citations = Authority**

### Pillar 3: Answer Engine Optimization

The web is shifting from "search engines" to "answer engines" (ChatGPT, Perplexity, Claude). Optimize for:

- Direct answers that can be extracted
- Citable facts with attribution
- Structured content that chunks well
- FAQ format that matches query patterns

## 1.3 Content Tiers

### Tier 1: Pillar Content (10-20 pages)
Comprehensive, authoritative pages that own major topics.
- 2,500-4,000 words
- Target high-volume keywords
- Link TO all related Tier 2/3 content
- Update monthly

**Examples:**
- "The Complete Guide to AI-Generated Code Security"
- "SQL Injection: Everything Vibe Coders Need to Know"
- "Cursor Security: Full Analysis of 10,000 Projects"

### Tier 2: Hub Content (50-100 pages)
Focused pages on specific topics within pillars.
- 1,500-2,500 words
- Target medium-volume keywords
- Link UP to pillars, DOWN to Tier 3
- Update quarterly

**Examples:**
- "SQL Injection in Next.js + Supabase"
- "Cursor's Top 10 Security Mistakes"
- "Pre-Launch Security Checklist"

### Tier 3: Supporting Content (200-500 pages)
Granular pages that capture long-tail queries.
- 500-1,500 words
- Target long-tail keywords
- Link UP to Tier 2
- Can be programmatically generated

**Examples:**
- "How to Fix SQL Injection in Express"
- "What is IDOR?"
- "Stripe API Key Exposed: What to Do"

### Tier 4: Data Pages (Unlimited)
Auto-generated from Scanner data.
- 300-800 words
- Highly specific
- Template-based
- Update automatically

**Examples:**
- "Vulnerability Index: Week of Dec 16, 2024"
- "Cursor + Next.js + Supabase Security Analysis"
- "SQL Injection Fix Prompt for SvelteKit"

---

# Part 2: Content Architecture

## 2.1 Topic Clusters

Organize content into clusters where one pillar links to many supporting pages:

```
                         ┌─────────────────────────────┐
                         │     PILLAR PAGE            │
                         │ "AI-Generated Code         │
                         │  Security Guide"           │
                         └────────────┬───────────────┘
                                      │
           ┌──────────────────────────┼──────────────────────────┐
           │                          │                          │
           ▼                          ▼                          ▼
    ┌──────────────┐          ┌──────────────┐          ┌──────────────┐
    │ CLUSTER:     │          │ CLUSTER:     │          │ CLUSTER:     │
    │ Vulnerabilities│         │ AI Tools     │          │ Stacks       │
    └──────┬───────┘          └──────┬───────┘          └──────┬───────┘
           │                          │                          │
     ┌─────┼─────┐              ┌─────┼─────┐              ┌─────┼─────┐
     ▼     ▼     ▼              ▼     ▼     ▼              ▼     ▼     ▼
   SQL   XSS   IDOR         Cursor  Bolt  v0          Next.js Express Svelte
     │     │     │              │     │     │              │     │     │
     ▼     ▼     ▼              ▼     ▼     ▼              ▼     ▼     ▼
  [Fix]  [Fix] [Fix]        [Stats] [Stats] [Stats]   [Guide] [Guide] [Guide]
  pages  pages pages        pages   pages   pages     pages   pages   pages
```

## 2.2 The Content Matrix

Create content at the intersection of dimensions:

| | SQL Injection | XSS | Hardcoded Secrets | Missing Auth | IDOR |
|---|---|---|---|---|---|
| **Cursor** | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Claude Code** | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Bolt** | ✓ | ✓ | ✓ | ✓ | ✓ |
| **v0** | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Next.js** | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Express** | ✓ | ✓ | ✓ | ✓ | ✓ |
| **SvelteKit** | ✓ | ✓ | ✓ | ✓ | ✓ |

Each ✓ = a potential page. 7 tools × 15 vulnerabilities × 6 frameworks = **630 potential pages** just from combinations.

## 2.3 Entity Relationships

Build a knowledge graph in your content:

```
ENTITIES:
- Vulnerabilities (SQL Injection, XSS, IDOR...)
- AI Tools (Cursor, Bolt, Claude Code...)
- Frameworks (Next.js, Express, SvelteKit...)
- Databases (Supabase, PostgreSQL, MongoDB...)
- Security Concepts (Authentication, Authorization, Encryption...)

RELATIONSHIPS:
- Cursor GENERATES SQL Injection
- SQL Injection AFFECTS Next.js
- Next.js USES Supabase
- Supabase PREVENTS SQL Injection WITH RLS
- RLS IS_A Authentication mechanism
```

Every page should reference related entities and link to their pages.

---

# Part 3: Writing Guidelines

## 3.1 Voice & Tone

### The VibeShip Voice

**We are:**
- A knowledgeable friend, not a textbook
- Direct and actionable, not vague
- Occasionally playful, never unprofessional
- Confident but not arrogant
- Empathetic to vibe coders' journey

**We sound like:**
> "SQL injection sounds scary, but here's the thing—it's actually pretty easy to fix once you know what to look for. Let's break it down."

**We don't sound like:**
> "SQL injection is a code injection technique that exploits security vulnerabilities in an application's database layer."

### Tone by Content Type

| Content Type | Tone |
|--------------|------|
| Vulnerability explanations | Educational, reassuring |
| Fix prompts | Precise, instructional |
| Data/research | Authoritative, factual |
| Checklists | Action-oriented, encouraging |
| Glossary | Clear, concise |

## 3.2 Writing for Vibe Coders

### Assume:
- They know JavaScript/TypeScript basics
- They've used AI coding tools
- They DON'T have security background
- They want to ship, not become security experts
- They learn by doing, not reading theory

### Always:
- Explain jargon in parentheses first time: "IDOR (when users can access other users' data by changing IDs)"
- Use analogies: "RLS is like a bouncer at a club—it checks IDs before letting anyone in"
- Show code: Always include before/after examples
- Give them the fix: AI prompts they can copy-paste

### Never:
- Assume they know security acronyms
- Write walls of text without code
- Explain theory without application
- Make them feel dumb for not knowing

## 3.3 The VibeShip Content Formula

Every piece of content follows this structure:

```
1. HOOK (First 50 words)
   - Direct answer to the query
   - Why they should care
   - What they'll learn

2. CONTEXT (100-200 words)
   - Plain English explanation
   - Real-world analogy
   - Why this matters for vibe coders

3. DATA (50-100 words)
   - Stats from Scanner
   - Comparison data
   - Trend information

4. DETECTION (100-200 words)
   - How to find this in your code
   - Code patterns to look for
   - Quick check methods

5. SOLUTION (200-400 words)
   - AI Fix Prompt (copy-paste ready)
   - Manual fix with code examples
   - Framework-specific notes

6. FAQ (3-5 questions)
   - Questions people actually ask
   - Direct answers
   - Links to deeper content

7. RELATED (links)
   - Related vulnerabilities
   - Related tools
   - Related guides
```

## 3.4 Formatting Rules

### Headings
- H1: One per page, includes primary keyword
- H2: Main sections, can be questions
- H3: Subsections within H2
- Never skip levels (H1 → H3)

### Paragraphs
- 2-4 sentences max
- One idea per paragraph
- White space is your friend

### Lists
- Use bullets for unordered items
- Use numbers for sequences/rankings
- Keep items parallel in structure
- 3-7 items per list

### Code Blocks
- Always specify language
- Include comments explaining key lines
- Show before AND after for fixes
- Keep under 20 lines when possible

### Emphasis
- **Bold** for key terms (first occurrence)
- `code` for inline code, file names, commands
- *Italic* sparingly for emphasis
- Never underline (looks like links)

---

# Part 4: SEO Optimization

## 4.1 Keyword Strategy

### Keyword Research Process

1. **Seed keywords:** Start with obvious terms
   - "ai generated code security"
   - "cursor vulnerabilities"
   - "vibe coding"

2. **Expand with tools:**
   - Google Autocomplete
   - People Also Ask
   - Related Searches
   - Ahrefs/Semrush (if available)

3. **Map search intent:**
   - Informational: "what is sql injection"
   - Navigational: "vibeship scanner"
   - Transactional: "ai code security scanner"
   - Commercial: "best ai code security tool"

4. **Assign to content:**
   - High volume → Pillar pages
   - Medium volume → Hub pages
   - Long-tail → Supporting pages

### Keyword Placement

| Location | Priority | Notes |
|----------|----------|-------|
| Title tag | Critical | Include primary keyword |
| H1 | Critical | Natural inclusion |
| URL | High | Use slug form |
| First 100 words | High | Early mention |
| H2s | Medium | Include variations |
| Image alt text | Medium | Describe + keyword |
| Meta description | Medium | For CTR, not ranking |

### Keyword Examples by Page Type

**Vulnerability Page:**
- Primary: "sql injection"
- Secondary: "sql injection fix", "sql injection example"
- Long-tail: "sql injection ai generated code", "fix sql injection nextjs"

**AI Tool Page:**
- Primary: "cursor security"
- Secondary: "cursor vulnerabilities", "is cursor safe"
- Long-tail: "cursor security issues 2024", "cursor generated code security"

**Stack Page:**
- Primary: "nextjs supabase security"
- Secondary: "secure nextjs supabase app", "supabase rls nextjs"
- Long-tail: "nextjs supabase authentication best practices"

## 4.2 On-Page SEO Checklist

### Title Tag
- [ ] Under 60 characters
- [ ] Primary keyword near beginning
- [ ] Compelling (would you click?)
- [ ] Unique across site
- [ ] Brand at end: "| VibeShip"

**Formula:** `{Primary Keyword}: {Benefit/Hook} | VibeShip`

**Examples:**
- "SQL Injection: Find and Fix It in AI-Generated Code | VibeShip"
- "Cursor Security Analysis: 10,000 Projects Scanned | VibeShip"

### Meta Description
- [ ] 150-160 characters
- [ ] Includes primary keyword
- [ ] Has call-to-action
- [ ] Unique across site
- [ ] Matches search intent

**Formula:** `{What it is}. {Why it matters}. {CTA}.`

**Example:**
"SQL injection lets attackers steal your database. Learn how AI tools cause it and get copy-paste fixes. Free Scanner included."

### URL Structure
- [ ] Lowercase
- [ ] Hyphens between words
- [ ] No special characters
- [ ] Under 75 characters
- [ ] Descriptive but concise

**Good:** `/kb/vulnerabilities/sql-injection`
**Bad:** `/kb/vuln/SQLInjection_Guide_2024`

### Content Optimization
- [ ] Primary keyword in first 100 words
- [ ] Keyword variations throughout (not stuffing)
- [ ] Related terms and entities mentioned
- [ ] Questions as H2s (matches PAA)
- [ ] Internal links (5-10 per page)
- [ ] External links to authoritative sources (1-3)
- [ ] Images with descriptive alt text
- [ ] Schema markup implemented

## 4.3 Internal Linking Strategy

### Link Types

1. **Contextual Links:** Within body content
   - "Learn more about [SQL injection](/kb/vulnerabilities/sql-injection)"
   - Most valuable for SEO

2. **Navigation Links:** Sidebar, breadcrumbs
   - Helps crawlers understand structure
   - Less SEO value but important

3. **Related Content:** End of page
   - "Related vulnerabilities: XSS, IDOR"
   - Keeps users engaged

### Linking Rules

- Every page links to its parent hub
- Every hub links to all children
- Every page links to 3-5 related pages
- Pillar pages get the most inbound links
- Use descriptive anchor text (not "click here")
- New pages link TO existing authority pages
- Update old pages to link TO new pages

### Anchor Text Distribution

| Type | Example | Usage |
|------|---------|-------|
| Exact match | "SQL injection" | 20% |
| Partial match | "SQL injection vulnerability" | 30% |
| Related | "database security issues" | 20% |
| Branded | "VibeShip Scanner" | 15% |
| Natural | "this guide", "learn more" | 15% |

## 4.4 Technical SEO

### Page Speed
- Aim for < 3s load time
- Optimize images (WebP, lazy loading)
- Minimize JavaScript
- Use CDN for assets

### Mobile Optimization
- Responsive design
- Touch-friendly (44px tap targets)
- Readable fonts (16px+)
- No horizontal scrolling

### Crawlability
- XML sitemap submitted to GSC
- robots.txt allows crawling
- Clean URL structure
- No orphan pages (everything linked)
- Proper canonical tags

### Schema Markup
Every page should have:
- Organization schema (site-wide)
- BreadcrumbList schema
- Article or TechArticle schema
- FAQPage schema (if FAQ section exists)
- HowTo schema (if step-by-step content)

---

# Part 5: LLM Optimization

## 5.1 How LLMs Consume Content

Understanding this is crucial:

1. **LLMs extract chunks**, not whole pages
   - Ideal chunk: 75-225 words (100-300 tokens)
   - Each section should make sense standalone

2. **LLMs look for direct answers**
   - First sentence should answer the query
   - No burying the lede

3. **LLMs cite facts, not opinions**
   - "73% of projects have this" → Citable
   - "This is really important" → Not citable

4. **LLMs follow structure**
   - Clear H2s help them find information
   - FAQ format matches query patterns

5. **LLMs prefer primary sources**
   - Original research > aggregated content
   - Your Scanner data = primary source

## 5.2 Writing for LLM Extraction

### The FACT Framework

Every citable claim should be a **FACT**:

- **F**actual: A verifiable statement, not opinion
- **A**ttributed: Clear source ("According to VibeShip Scanner...")
- **C**oncise: One sentence, one fact
- **T**imestamped: Include date or "as of [date]"

**Good:**
> According to VibeShip Scanner analysis of 10,000 repositories in December 2024, 73% of Cursor-generated projects contain at least one SQL injection vulnerability.

**Bad:**
> SQL injection is really common in AI-generated code and you should definitely fix it because it's a big security problem.

### Question-Based H2s

Use H2s that match how people (and LLMs) ask questions:

**Good H2s:**
- "What is SQL injection?"
- "How do AI tools cause SQL injection?"
- "How do I fix SQL injection in Next.js?"
- "Is Prisma safe from SQL injection?"

**Bad H2s:**
- "Overview"
- "Details"
- "More Information"
- "Section 2"

### First-Sentence Rule

The first sentence after every H2 should directly answer the implied question:

```markdown
## What is SQL injection?

SQL injection is a vulnerability where attackers insert malicious code into your 
database queries through user input, potentially accessing or destroying your 
entire database.
```

Not:

```markdown
## What is SQL injection?

Before we dive into SQL injection, it's important to understand how databases 
work and why security matters...
```

## 5.3 Structured Data for LLMs

### FAQ Schema (Critical)

Every page with an FAQ section MUST have FAQPage schema:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is SQL injection still a threat in 2024?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. SQL injection remains in the OWASP Top 10 and is found in 23% of AI-generated codebases according to VibeShip Scanner data."
      }
    }
  ]
}
```

### Speakable Schema (Emerging)

Mark content as suitable for voice/audio:

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [".quick-answer", ".faq-answer"]
  }
}
```

### Dataset Schema (For Research Pages)

Mark your data as a citable dataset:

```json
{
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "VibeShip Vulnerability Index",
  "description": "Weekly analysis of security vulnerabilities in AI-generated code",
  "url": "https://vibeship.co/research/vulnerability-index",
  "creator": {
    "@type": "Organization",
    "name": "VibeShip"
  },
  "dateModified": "2024-12-16",
  "distribution": {
    "@type": "DataDownload",
    "encodingFormat": "text/plain",
    "contentUrl": "https://vibeship.co/llms-full.txt"
  }
}
```

## 5.4 The llms.txt Standard

Create machine-readable summaries:

### /llms.txt (Summary)
- ~2,000 words
- Key facts from each category
- Links to full content
- Updated automatically

### /llms-full.txt (Complete)
- Full text of all articles
- No HTML, just text
- Structured with clear delimiters
- For deep ingestion

### Category-Specific
- `/kb/vulnerabilities/llms.txt` — All vulnerability content
- `/kb/vibe-coding-tools/llms.txt` — All AI tool content
- `/research/llms.txt` — All research/data

## 5.5 Citation Optimization

Make it easy to cite you:

### Include Pre-Written Citations

At the bottom of data-heavy pages:

```markdown
## How to Cite This Data

> According to VibeShip's analysis of [X] repositories, [finding].
> Source: vibeship.co/research/vulnerability-index

For academic citations:
VibeShip. (2024). Hallucinated Vulnerability Index. 
Retrieved from https://vibeship.co/research/vulnerability-index
```

### Unique Data Callouts

Make your unique data stand out:

```markdown
<aside class="data-callout">
📊 **VibeShip Scanner Data**
Based on analysis of 10,847 AI-generated repositories, December 2024.
[Methodology](/research/methodology) | [Full Dataset](/llms-full.txt)
</aside>
```

---

# Part 6: Content Templates

## 6.1 Vulnerability Page Template

```markdown
---
title: "{Vulnerability Name}"
description: "{150-160 char description with keyword}"
keywords: ["{vuln}", "{vuln} fix", "{vuln} ai code"]
---

# {Vulnerability Name}

{Direct answer in 30-50 words explaining what this is and why it matters to 
vibe coders. Include that it affects X% of AI-generated code.}

## Quick Stats

| Metric | Value |
|--------|-------|
| Prevalence | {X}% of AI-generated codebases |
| Most Affected Tool | {Tool} ({Y}%) |
| Trend | {↑/↓/→} {Z}% vs last month |
| Severity | {Critical/High/Medium/Low} |

*Data from VibeShip Scanner, updated {date}.*

## What is {Vulnerability Name}?

{2-3 paragraphs explaining in plain English. Use an analogy. Explain what could 
happen in real-world terms.}

## How AI Tools Cause This

{Explain WHY Cursor/Bolt/Claude Code generate this. Be specific about patterns.}

### By AI Tool

{Chart or table showing vulnerability rate per tool}

| Tool | Vulnerability Rate |
|------|-------------------|
| Cursor | {X}% |
| Bolt | {Y}% |
| Claude Code | {Z}% |

{1-2 paragraphs explaining the differences}

## What Could Happen

If you ship code with {vulnerability name}, attackers could:

- {Consequence 1 - specific and scary}
- {Consequence 2}
- {Consequence 3}
- {Consequence 4}

{Real-world example or analogy}

## How to Detect It

Look for these patterns in your code:

```javascript
// ❌ VULNERABLE: {explanation}
{vulnerable code example}

// ❌ ALSO VULNERABLE: {explanation}  
{another vulnerable pattern}
```

### Quick Check

{Simple command or method to check if they have this issue}

> 💡 **Fastest way:** Run VibeShip Scanner on your codebase for automatic 
> detection. [Scan Now →](https://scanner.vibeship.co)

## How to Fix It

### AI Fix Prompt

Copy this into Claude Code or Cursor:

```
{Complete AI fix prompt that will find and fix this vulnerability.
Include context, what to look for, how to fix it, and what to check after.}
```

### Manual Fix

Change this:

```javascript
// ❌ Before (vulnerable)
{vulnerable code}
```

To this:

```javascript
// ✅ After (secure)
{fixed code}
```

**Key changes:**
1. {What changed and why}
2. {Second change}
3. {Third change}

### Framework-Specific Fixes

- [Fix in Next.js](/kb/fixes/{slug}/nextjs)
- [Fix in Express](/kb/fixes/{slug}/express)
- [Fix in SvelteKit](/kb/fixes/{slug}/sveltekit)

## Prevention

To prevent {vulnerability} in future code:

1. {Prevention tip 1}
2. {Prevention tip 2}
3. {Prevention tip 3}

## FAQ

### Is {vulnerability} still a real threat in {year}?

{Direct answer with data}

### Does {common tool/framework} protect against this?

{Direct answer with nuance}

### How do I know if my app is vulnerable?

{Direct answer with actionable steps}

### Can AI tools generate secure code?

{Balanced answer acknowledging the issue and solution}

### What if I already shipped vulnerable code?

{Reassuring answer with steps to take}

## Related

- **Similar vulnerabilities:** [XSS](/kb/vulnerabilities/xss), [IDOR](/kb/vulnerabilities/idor)
- **Tool-specific:** [Cursor patterns](/kb/vibe-coding-tools/cursor/{slug})
- **Stack guides:** [Next.js security](/kb/stacks/nextjs-supabase)

---

*Last updated: {date}*
*Data source: VibeShip Scanner analysis of {N} repositories*
```

## 6.2 AI Tool Page Template

```markdown
---
title: "Security in {Tool}-Generated Code"
description: "Analysis of {N} {Tool} projects reveals top vulnerabilities. Security score: {X}/100."
keywords: ["{tool} security", "{tool} vulnerabilities", "is {tool} safe"]
---

# Security in {Tool}-Generated Code

{Tool} is {brief description}. Our analysis of {N} {Tool}-generated projects 
found that {X}% contain security vulnerabilities, with an average of {Y} issues 
per project.

## {Tool} Security Score: {Score}/100

{Visual score indicator}

**What this means:** {Interpretation of score}

## Key Findings

| Metric | Value | vs. Average |
|--------|-------|-------------|
| Projects with vulnerabilities | {X}% | {+/-Y}% |
| Avg vulnerabilities per project | {Z} | {+/-W}% |
| Most common issue | {Issue} | — |
| Critical issues rate | {A}% | {+/-B}% |

## Top 10 Vulnerabilities in {Tool} Projects

{Ranked list with percentages and links}

| Rank | Vulnerability | Rate | Trend |
|------|--------------|------|-------|
| 1 | [SQL Injection](/kb/vulnerabilities/sql-injection) | {X}% | {↑/↓} |
| 2 | [Missing Auth](/kb/vulnerabilities/missing-auth) | {Y}% | {↑/↓} |
| ... | ... | ... | ... |

## Why {Tool} Generates These Issues

{2-3 paragraphs explaining the patterns, training data, common prompts that 
lead to these vulnerabilities}

### Pattern 1: {Pattern Name}

{Explanation with code example}

### Pattern 2: {Pattern Name}

{Explanation with code example}

## How {Tool} Compares

{Comparison chart/table with other tools}

| Tool | Security Score | Vuln Rate | Top Issue |
|------|---------------|-----------|-----------|
| {Tool} | {X}/100 | {Y}% | {Issue} |
| Cursor | {A}/100 | {B}% | {Issue} |
| Bolt | {C}/100 | {D}% | {Issue} |

## Using {Tool} Securely

### Before You Generate

1. {Pre-generation tip}
2. {Pre-generation tip}

### After You Generate

1. {Post-generation tip}
2. {Post-generation tip}

### Prompts That Help

{Examples of security-conscious prompts}

## Scan Your {Tool} Code

VibeShip Scanner checks for all {N} vulnerability types common in {Tool} 
projects. Get results in 60 seconds.

[Free Security Scan →](https://scanner.vibeship.co)

## FAQ

### Is {Tool} safe to use?

{Balanced answer}

### Should I stop using {Tool}?

{Practical answer}

### What should I check after using {Tool}?

{Actionable checklist}

---

*Analysis based on {N} {Tool}-generated projects scanned by VibeShip Scanner.*
*Last updated: {date}*
```

## 6.3 Stack Security Guide Template

```markdown
---
title: "{Stack} Security Guide for Vibe Coders"
description: "Complete security checklist for {Stack}. Covers {N} common vulnerabilities and how to fix them."
keywords: ["{stack} security", "{stack} authentication", "secure {stack} app"]
---

# {Stack} Security Guide

{Stack} is {why it's popular with vibe coders}. This guide covers everything 
you need to secure your {Stack} application before launch.

## Security Checklist

{Interactive checklist component}

- [ ] **Authentication:** User sessions are secure
- [ ] **Authorization:** Users can only access their own data
- [ ] **Input Validation:** All user input is sanitized
- [ ] **Secrets Management:** No hardcoded API keys
- [ ] **Database Security:** RLS enabled (if Supabase)
- [ ] **API Security:** Rate limiting in place
- [ ] **HTTPS:** Enforced in production

[Download Checklist PDF →]

## Top 5 Vulnerabilities in {Stack} Projects

Based on VibeShip Scanner data from {N} {Stack} projects:

### 1. {Vulnerability 1} ({X}% of projects)

{Brief explanation}

**Quick fix:**
```javascript
// Fix code
```

[Full guide →](/kb/vulnerabilities/{slug})

{Repeat for top 5}

## {Stack}-Specific Security

### {Component 1} Security

{Security considerations specific to this component}

### {Component 2} Security

{Security considerations}

### Environment Variables

```bash
# Required security-related env vars for {Stack}
{ENV_VAR_1}=your_value_here  # {explanation}
{ENV_VAR_2}=your_value_here  # {explanation}
```

## Common AI-Generated Mistakes

When using AI tools to build {Stack} apps, watch for:

1. **{Mistake 1}**
   {Explanation and fix}

2. **{Mistake 2}**
   {Explanation and fix}

## Pre-Launch Security Audit

Before launching your {Stack} app:

### 1. Run VibeShip Scanner

```bash
npx vibeship-scanner
```

### 2. Check These Files

- `{file1}` — {what to check}
- `{file2}` — {what to check}

### 3. Test These Scenarios

- {Test scenario 1}
- {Test scenario 2}

## Resources

- [{Stack} Official Security Docs](external-link)
- [VibeShip {Framework} Checklist](/kb/checklists/{framework})
- [VibeShip {Database} Checklist](/kb/checklists/{database})

---

*Last updated: {date}*
```

## 6.4 Glossary Entry Template

```markdown
---
title: "{Term}"
description: "What is {term}? Simple explanation for vibe coders, plus how it affects AI-generated code."
keywords: ["what is {term}", "{term} definition", "{term} explained"]
---

# What is {Term}?

**{Term}** is {one-sentence definition in plain English}.

{2-3 sentence expansion with analogy or real-world example.}

## Why Vibe Coders Should Care

{1-2 paragraphs on relevance to AI-generated code and shipping apps}

## Example

{Code example or scenario showing the concept}

## Related Terms

- [{Related Term 1}](/kb/glossary/{slug})
- [{Related Term 2}](/kb/glossary/{slug})
- [{Related Term 3}](/kb/glossary/{slug})

## Learn More

- [Full {Term} Guide](/kb/vulnerabilities/{slug}) — Deep dive with fixes
- [{Term} in {Tool}](/kb/vibe-coding-tools/{tool}/{slug}) — Tool-specific patterns

---

*Simple definition for vibe coders. Technical accuracy verified.*
```

## 6.5 Fix Prompt Template

```markdown
---
title: "Fix {Vulnerability} in {Framework}"
description: "Copy-paste AI prompt to fix {vulnerability} in {framework}. Works with Cursor, Claude Code, and Bolt."
keywords: ["fix {vuln} {framework}", "{framework} {vuln} solution"]
---

# Fix {Vulnerability} in {Framework}

This prompt will find and fix all {vulnerability} vulnerabilities in your 
{Framework} codebase.

## AI Fix Prompt

Copy this into Claude Code, Cursor, or your AI coding tool:

```
I need you to find and fix all {vulnerability} vulnerabilities in my {Framework} codebase.

## What to look for

{Specific patterns to search for in {Framework}}

## How to fix

{Framework-specific fix approach}

## {Framework}-specific considerations

{Any framework-specific security features to use}

## After fixing

1. Search for similar patterns I might have missed
2. Add input validation to prevent future issues
3. List all files you modified

Please proceed systematically through my codebase.
```

## What This Prompt Does

1. **Finds:** {What it searches for}
2. **Fixes:** {How it fixes it}
3. **Prevents:** {Future prevention measures}

## Manual Fix

If you prefer to fix manually:

### Before (Vulnerable)

```{language}
// {Framework} code with vulnerability
{vulnerable code}
```

### After (Secure)

```{language}
// {Framework} code, fixed
{secure code}
```

### Key Changes

1. {Change 1 explanation}
2. {Change 2 explanation}

## Verify the Fix

After applying fixes:

```bash
# Run scanner to verify
npx vibeship-scanner --check {vuln}
```

## Related Fixes

- [{Vuln} in {Other Framework}](/kb/fixes/{vuln}/{other-framework})
- [{Related Vuln} in {Framework}](/kb/fixes/{related-vuln}/{framework})

---

*Prompt tested with Claude Code, Cursor, and Bolt.*
```

---

# Part 7: Do's and Don'ts

## 7.1 Content Do's ✅

### Structure

- ✅ **DO** start with the answer — First 50 words should answer the query
- ✅ **DO** use question-based H2s — "What is X?" "How do I fix Y?"
- ✅ **DO** keep sections self-contained — Each should make sense alone
- ✅ **DO** include code examples — Before/after for every fix
- ✅ **DO** add FAQ sections — Match how people ask questions
- ✅ **DO** update timestamps — Show when content was last reviewed

### Data & Credibility

- ✅ **DO** cite your Scanner data — It's your unique advantage
- ✅ **DO** include specific numbers — "73%" not "most"
- ✅ **DO** attribute claims — "According to VibeShip Scanner..."
- ✅ **DO** show methodology — Link to how you gathered data
- ✅ **DO** compare tools/frameworks — People want to know which is better
- ✅ **DO** update stats regularly — Stale data loses trust

### Writing

- ✅ **DO** write in plain English — No unexplained jargon
- ✅ **DO** use analogies — "RLS is like a bouncer..."
- ✅ **DO** be direct — Say what you mean
- ✅ **DO** be actionable — Tell them what to DO
- ✅ **DO** be empathetic — They're learning, not experts
- ✅ **DO** use "you" — Talk TO the reader

### SEO

- ✅ **DO** research keywords — Know what people search
- ✅ **DO** optimize titles/descriptions — They're your ad copy
- ✅ **DO** internal link generously — 5-10 links per page
- ✅ **DO** use schema markup — FAQ, Article, HowTo
- ✅ **DO** submit sitemap — Keep Google informed
- ✅ **DO** monitor rankings — Know what's working

### LLM Optimization

- ✅ **DO** create llms.txt — Machine-readable summary
- ✅ **DO** allow AI crawlers — GPTBot, ClaudeBot, etc.
- ✅ **DO** structure for extraction — Chunked, labeled content
- ✅ **DO** include citable facts — Numbers, dates, sources
- ✅ **DO** answer directly — No burying the lede

## 7.2 Content Don'ts ❌

### Structure

- ❌ **DON'T** bury the answer — No long intros before the point
- ❌ **DON'T** use vague headings — "Overview" tells readers nothing
- ❌ **DON'T** write walls of text — Break up with subheads, code, lists
- ❌ **DON'T** skip the fix — Always show how to solve it
- ❌ **DON'T** forget mobile — Test on phone
- ❌ **DON'T** orphan pages — Everything should be linked

### Data & Credibility

- ❌ **DON'T** make claims without data — Back it up or remove it
- ❌ **DON'T** use vague quantifiers — "Many" "some" "often" = weak
- ❌ **DON'T** hide the source — Always attribute
- ❌ **DON'T** let stats go stale — Outdated data hurts trust
- ❌ **DON'T** copy competitor data — Use your own

### Writing

- ❌ **DON'T** use jargon without explaining — First use must be defined
- ❌ **DON'T** be preachy — They know security matters
- ❌ **DON'T** be scary without solutions — Always offer the fix
- ❌ **DON'T** talk down — They're smart, just not security experts
- ❌ **DON'T** use passive voice — "The vulnerability was found" → "We found"
- ❌ **DON'T** be wordy — Edit ruthlessly

### SEO

- ❌ **DON'T** keyword stuff — Natural inclusion only
- ❌ **DON'T** duplicate content — Each page unique
- ❌ **DON'T** ignore meta descriptions — They affect click-through
- ❌ **DON'T** forget canonical tags — Avoid duplicate content issues
- ❌ **DON'T** block crawlers — Let search engines in
- ❌ **DON'T** neglect page speed — Slow = lower rankings

### LLM Optimization

- ❌ **DON'T** write opinion pieces — LLMs cite facts, not opinions
- ❌ **DON'T** require clicking to get answer — Answer on the page
- ❌ **DON'T** use images for key info — LLMs can't read images well
- ❌ **DON'T** bury facts in PDFs — Keep info in HTML
- ❌ **DON'T** use complex layouts — Simple structure extracts better

## 7.3 Specific Anti-Patterns

### ❌ The Preamble Problem

**Bad:**
> Before we dive into SQL injection, it's important to understand the history 
> of databases and why security became important. In the early days of the web...

**Good:**
> SQL injection lets attackers manipulate your database queries. It's found in 
> 23% of AI-generated codebases. Here's how to find and fix it.

### ❌ The Jargon Dump

**Bad:**
> IDOR vulnerabilities occur when BOLA (Broken Object Level Authorization) 
> allows horizontal privilege escalation through predictable resource identifiers.

**Good:**
> IDOR (Insecure Direct Object Reference) happens when users can access other 
> users' data by changing IDs in the URL. It's like if changing your hotel room 
> number let you into someone else's room.

### ❌ The Missing Fix

**Bad:**
> SQL injection is a serious vulnerability that can compromise your entire 
> database. Make sure to fix it before launching your application.

**Good:**
> SQL injection is a serious vulnerability. Here's the exact fix:
> ```javascript
> // Before (vulnerable)
> db.query(`SELECT * FROM users WHERE id = ${userId}`)
> 
> // After (safe)
> db.query('SELECT * FROM users WHERE id = $1', [userId])
> ```

### ❌ The Opinion Without Data

**Bad:**
> Cursor seems to generate a lot of security issues based on what we've seen.

**Good:**
> Cursor projects have a 73% vulnerability rate based on VibeShip Scanner 
> analysis of 10,000 repositories (December 2024).

### ❌ The Abandoned Page

**Bad:**
> *Last updated: March 2023*
> Statistics from our analysis of 500 projects show...

**Good:**
> *Last updated: December 2024*
> Statistics from our analysis of 10,847 projects show...
> [How we calculate these stats →](/research/methodology)

---

# Part 8: The Content Flywheel

## 8.1 The Virtuous Cycle

```
                    ┌─────────────────────────────┐
                    │     SCANNER RUNS           │
                    │  (User scans their code)   │
                    └─────────────┬───────────────┘
                                  │
                                  ▼
                    ┌─────────────────────────────┐
                    │      DATA GENERATED        │
                    │  (Vulnerabilities found,   │
                    │   tools detected, etc.)    │
                    └─────────────┬───────────────┘
                                  │
                                  ▼
                    ┌─────────────────────────────┐
                    │     CONTENT CREATED        │
                    │  (Stats updated, new pages │
                    │   generated, index updated)│
                    └─────────────┬───────────────┘
                                  │
                                  ▼
                    ┌─────────────────────────────┐
                    │    TRAFFIC GENERATED       │
                    │  (SEO rankings, LLM cites, │
                    │   social shares)           │
                    └─────────────┬───────────────┘
                                  │
                                  ▼
                    ┌─────────────────────────────┐
                    │     MORE SCANNER RUNS      │
                    │  (New users discover via   │
                    │   content → scan their code)│
                    └─────────────┬───────────────┘
                                  │
                                  └───────────────────┐
                                                      │
                    ┌─────────────────────────────────┘
                    │
                    ▼
              (Cycle repeats with more data)
```

## 8.2 Flywheel Components

### Component 1: Scanner → Data

Every scan generates data:
- Which vulnerabilities were found
- Which AI tool was detected
- Which stack was detected
- Severity distribution
- Fix success rate

### Component 2: Data → Content

Data automatically updates:
- Stats on vulnerability pages
- AI tool security scores
- Weekly Vulnerability Index
- Comparison charts
- Trend indicators

Data enables new content:
- "New vulnerability pattern discovered"
- "Cursor security score drops 5 points"
- "XSS surpasses SQL injection as #1 issue"

### Component 3: Content → Traffic

Content ranks and gets cited:
- Google organic traffic
- LLM citations → referral traffic
- Social sharing → viral potential
- Backlinks → domain authority

### Component 4: Traffic → Scans

Traffic converts to users:
- KB visitors → try Scanner
- Scanner users → generate more data
- Cycle accelerates

## 8.3 Acceleration Tactics

### Make Data More Valuable

1. **Segment deeper:** Not just "Cursor" but "Cursor + Next.js + Supabase"
2. **Track trends:** Week-over-week, month-over-month changes
3. **Benchmark:** "Your score vs. average"
4. **Predict:** "Projects with X have 3x higher risk of Y"

### Make Content More Discoverable

1. **Programmatic pages:** Auto-generate intersection pages
2. **Update signals:** Change dates, add new data
3. **Internal links:** Every new page links to 10 existing pages
4. **External links:** Guest posts, PR, partnerships

### Make Traffic More Convertible

1. **CTAs everywhere:** Scanner promo on every page
2. **Relevant CTAs:** SQL injection page → "Scan for SQL injection"
3. **Friction removal:** One-click scan, no signup required
4. **Value demonstration:** Show sample vulnerability found

---

# Part 9: Scaling with Programmatic Content

## 9.1 What is Programmatic Content?

Programmatic content = template + data = hundreds of pages.

Instead of manually writing 600 pages, you:
1. Create 1 template
2. Feed it data variations
3. Generate hundreds of pages automatically

## 9.2 Programmatic Opportunities

### Matrix Pages

Create pages for every combination:

**Template:** `{Vulnerability} in {Framework}`
**Variations:** 15 vulns × 6 frameworks = **90 pages**

**Template:** `{Vulnerability} patterns in {AI Tool}`
**Variations:** 15 vulns × 7 tools = **105 pages**

**Template:** `{AI Tool} + {Stack} Security Guide`
**Variations:** 7 tools × 10 stacks = **70 pages**

### Data-Driven Pages

**Weekly Index Pages:**
- Auto-generated every week
- Template + that week's data
- Infinite pages over time

**Comparison Pages:**
- `{Tool A} vs {Tool B} Security`
- 7 tools = 21 comparison pages

### Long-Tail Fix Pages

**Template:** `How to Fix {Vulnerability} in {Framework} with {AI Tool}`
**Example:** "How to Fix SQL Injection in Next.js with Cursor"
**Variations:** 15 × 6 × 7 = **630 pages**

## 9.3 Programmatic Content Rules

### Must-Haves for Quality

1. **Unique data per page** — Not just template text swap
2. **Real value** — Would a human find this useful?
3. **Differentiated content** — At least 50% unique per page
4. **Internal linking** — Connect to related programmatic pages
5. **Schema markup** — Even programmatic pages need it

### Red Flags (Avoid)

- ❌ Pages with only 1-2 words changed
- ❌ Thin content (under 300 words)
- ❌ No unique data on the page
- ❌ Duplicate meta descriptions
- ❌ No internal links

### Google's Stance

Google is fine with programmatic content IF:
- It provides genuine value
- It's not trying to manipulate rankings
- Each page has unique, useful content

Google penalizes programmatic content IF:
- It's just template spam
- Pages are too similar
- No real value added

## 9.4 Implementation Example

### Template: Vulnerability + Framework Page

```javascript
// scripts/generate-vuln-framework-pages.ts

const vulnerabilities = [
  { slug: 'sql-injection', name: 'SQL Injection' },
  { slug: 'xss', name: 'Cross-Site Scripting' },
  // ...
]

const frameworks = [
  { slug: 'nextjs', name: 'Next.js' },
  { slug: 'express', name: 'Express' },
  // ...
]

for (const vuln of vulnerabilities) {
  for (const framework of frameworks) {
    // Get unique data for this combination
    const stats = await getStats(vuln.slug, framework.slug)
    
    // Skip if not enough data (quality gate)
    if (stats.sampleSize < 100) continue
    
    const content = {
      title: `${vuln.name} in ${framework.name}: Detection and Fixes`,
      slug: `${vuln.slug}-${framework.slug}`,
      
      description: `Found in ${stats.percentage}% of ${framework.name} projects. ` +
        `Learn how AI tools cause ${vuln.name} in ${framework.name} and get copy-paste fixes.`,
      
      // Unique data section
      stats: {
        percentage: stats.percentage,
        sampleSize: stats.sampleSize,
        trend: stats.trend,
        topCause: stats.topAiTool
      },
      
      // Framework-specific content (pre-written per framework)
      frameworkContext: getFrameworkContext(framework.slug, vuln.slug),
      
      // Framework-specific fix (pre-written per combination)
      fixPrompt: getFixPrompt(framework.slug, vuln.slug),
      
      // Dynamic code examples
      codeExamples: getCodeExamples(framework.slug, vuln.slug),
      
      // Related pages (auto-generated)
      related: {
        sameVuln: frameworks.filter(f => f.slug !== framework.slug)
          .map(f => `/kb/fixes/${vuln.slug}/${f.slug}`),
        sameFramework: vulnerabilities.filter(v => v.slug !== vuln.slug)
          .map(v => `/kb/fixes/${v.slug}/${framework.slug}`)
      }
    }
    
    await saveContent(content)
  }
}
```

### Quality Gates

Before generating, check:

```javascript
function shouldGeneratePage(vuln, framework, stats) {
  // Minimum data threshold
  if (stats.sampleSize < 100) return false
  
  // Must have meaningful occurrence
  if (stats.percentage < 1) return false
  
  // Must have fix available
  if (!hasFixPrompt(vuln, framework)) return false
  
  // Must have code examples
  if (!hasCodeExamples(vuln, framework)) return false
  
  return true
}
```

---

# Part 10: Content Calendar

## 10.1 Weekly Rhythm

| Day | Content Activity |
|-----|------------------|
| **Monday** | Publish Weekly Vulnerability Index |
| **Tuesday** | Update stats on all pages (automated) |
| **Wednesday** | Publish 1 new vulnerability/AI pattern page |
| **Thursday** | Publish 1 blog post (thought leadership) |
| **Friday** | Update/refresh 2-3 existing pages |
| **Weekend** | Generate programmatic pages (automated) |

## 10.2 Launch Content Plan (First 8 Weeks)

### Week 1: Foundation

- [ ] Homepage copy (what is VibeShip KB)
- [ ] KB index page
- [ ] Scanner onboarding guide
- [ ] "What is Vibe Coding?" glossary
- [ ] First Vulnerability Index

### Week 2: Core Vulnerabilities

- [ ] SQL Injection (pillar page)
- [ ] Hardcoded Secrets (pillar page)
- [ ] Missing Authentication (pillar page)
- [ ] XSS (pillar page)
- [ ] IDOR (pillar page)

### Week 3: AI Tool Pages

- [ ] Cursor Security Analysis
- [ ] Claude Code Security Analysis
- [ ] Bolt Security Analysis
- [ ] AI Tool Comparison page
- [ ] Blog: "We Scanned 10,000 AI-Generated Projects"

### Week 4: Stack Guides

- [ ] Next.js + Supabase Security Guide
- [ ] Express + PostgreSQL Security Guide
- [ ] SvelteKit + Supabase Security Guide
- [ ] Pre-Launch Security Checklist
- [ ] Supabase Security Checklist

### Week 5: Fix Prompts

- [ ] SQL Injection fixes (all frameworks)
- [ ] Hardcoded Secrets fixes (all frameworks)
- [ ] Missing Auth fixes (all frameworks)
- [ ] Blog: "AI Fix Prompts That Actually Work"

### Week 6: Programmatic Launch

- [ ] Generate vulnerability × framework pages
- [ ] Generate vulnerability × AI tool pages
- [ ] Generate comparison pages
- [ ] Internal linking audit
- [ ] Schema markup audit

### Week 7: Glossary & Education

- [ ] 20 glossary entries
- [ ] "Security for Vibe Coders" guide (pillar)
- [ ] API Security Checklist
- [ ] Blog: "The Vibe Coding Security Playbook"

### Week 8: Optimization & Launch

- [ ] SEO audit (titles, descriptions, schema)
- [ ] Page speed optimization
- [ ] Mobile testing
- [ ] Submit sitemap to Google
- [ ] Test LLM citations
- [ ] Public launch announcement

## 10.3 Ongoing Content Cadence

### Weekly (Automated)
- Vulnerability Index update
- Stats refresh on all pages
- llms.txt regeneration

### Weekly (Manual)
- 1 new vulnerability or AI pattern page
- 1 blog post
- 2-3 page updates/refreshes

### Monthly
- 1 new pillar page
- Content gap analysis
- Keyword ranking review
- Competitor content analysis
- Schema markup audit

### Quarterly
- Comprehensive content audit
- URL structure review
- Internal linking optimization
- Historical content refresh

## 10.4 Content Ideas Pipeline

### Blog Post Ideas (Thought Leadership)

1. "We Scanned 10,000 AI-Generated Projects. Here's What We Found."
2. "The Vibe Coding Security Crisis No One's Talking About"
3. "Why AI Tools Keep Making the Same Security Mistakes"
4. "Cursor vs Claude Code vs Bolt: Security Showdown"
5. "The Hidden Cost of AI-Generated Code"
6. "How to Ship AI-Generated Code Without Getting Hacked"
7. "The Security Checklist Every Vibe Coder Needs"
8. "Why Your Supabase RLS Probably Doesn't Work"
9. "The Most Dangerous Patterns AI Tools Generate"
10. "I Let an AI Build My Entire Backend. Here's What Went Wrong."

### Data Story Ideas (Research)

1. "Which AI Tool Generates the Most Secure Code?"
2. "The Most Common Vulnerability By Framework"
3. "Security Trends in AI-Generated Code: 2024 Report"
4. "The Correlation Between Project Size and Vulnerability Count"
5. "How Prompt Patterns Affect Security Outcomes"

### Guide Ideas (Education)

1. "Complete Guide to Securing AI-Generated APIs"
2. "Supabase RLS: The Complete Security Guide"
3. "Authentication Patterns for Vibe Coders"
4. "From AI-Generated to Production-Ready: The Security Path"
5. "The Vibe Coder's Security Handbook"

---

# Part 11: Quality Checklist

Use this checklist before publishing ANY content.

## Pre-Writing

- [ ] Keyword research completed
- [ ] Search intent understood (informational/transactional)
- [ ] Competitor content analyzed
- [ ] Unique angle identified
- [ ] Target word count determined
- [ ] Template selected

## Writing

- [ ] Hook in first 50 words (direct answer)
- [ ] Primary keyword in title
- [ ] Primary keyword in first 100 words
- [ ] H2s are question-based where appropriate
- [ ] Sections are self-contained (75-225 words)
- [ ] Code examples included (before/after)
- [ ] AI fix prompt included (if applicable)
- [ ] FAQ section with 3-5 questions
- [ ] Scanner data cited with specific numbers
- [ ] Analogies used for complex concepts
- [ ] No unexplained jargon

## SEO

- [ ] Title under 60 characters
- [ ] Meta description 150-160 characters
- [ ] URL is clean and descriptive
- [ ] H1 matches title tag
- [ ] Images have alt text
- [ ] Internal links added (5-10)
- [ ] External links to authoritative sources (1-3)
- [ ] Canonical tag set

## Schema

- [ ] Article/TechArticle schema
- [ ] FAQPage schema (if FAQ section)
- [ ] BreadcrumbList schema
- [ ] HowTo schema (if step-by-step)

## LLM Optimization

- [ ] Direct answer in first paragraph
- [ ] Citable facts with attribution
- [ ] Question-based H2s
- [ ] Self-contained sections
- [ ] No critical info in images only

## Quality

- [ ] Proofread for typos
- [ ] Links tested (no 404s)
- [ ] Code examples tested
- [ ] Mobile rendering checked
- [ ] Page speed acceptable (<3s)
- [ ] Related content linked

## Post-Publish

- [ ] Sitemap updated (automatic)
- [ ] Internal links from existing pages added
- [ ] Social sharing (if blog)
- [ ] Track rankings after 1 week

---

# Appendix A: Quick Reference Card

## The Formula

```
Every Page = Hook + Context + Data + Detection + Solution + FAQ + Related
```

## Word Counts

| Content Type | Words |
|--------------|-------|
| Pillar | 2,500-4,000 |
| Hub | 1,500-2,500 |
| Supporting | 500-1,500 |
| Programmatic | 500-1,000 |
| Glossary | 200-400 |

## Key Metrics

| Metric | Target |
|--------|--------|
| Title length | <60 chars |
| Meta description | 150-160 chars |
| First answer | <50 words |
| Section length | 75-225 words |
| Internal links | 5-10 per page |
| FAQ questions | 3-5 per page |
| Update frequency | Monthly stats, quarterly content |

## Must-Have Schema

1. BreadcrumbList (all pages)
2. Article/TechArticle (content pages)
3. FAQPage (pages with FAQ)
4. HowTo (step-by-step guides)
5. Organization (site-wide)

## LLM Crawler Allow List

```
GPTBot
ChatGPT-User
ClaudeBot
Claude-Web
PerplexityBot
Google-Extended
Amazonbot
anthropic-ai
cohere-ai
CCBot
```

---

# Appendix B: Content Quality Rubric

Score each piece of content 1-5 on these dimensions:

| Dimension | 1 (Poor) | 3 (Adequate) | 5 (Excellent) |
|-----------|----------|--------------|---------------|
| **Clarity** | Confusing, jargon-heavy | Clear but dry | Crystal clear, engaging |
| **Actionability** | Theory only | Some actions | Specific, copyable actions |
| **Data** | No data | Generic stats | Unique Scanner data |
| **Structure** | Wall of text | Basic structure | Perfect for scanning/LLMs |
| **SEO** | No optimization | Basic optimization | Fully optimized |
| **Uniqueness** | Commodity content | Some unique angle | Only we could write this |

**Minimum score to publish:** 3.5 average (21/30 total)
**Target score:** 4.0+ average (24/30 total)

---

**End of Content Machine Playbook**

This document should be the reference for anyone creating content for the VibeShip Knowledge Base. Review quarterly and update based on what's working.
