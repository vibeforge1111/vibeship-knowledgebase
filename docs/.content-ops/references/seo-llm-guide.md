# SEO & LLM Optimization Guide

Detailed guide for optimizing VibeShip KB content for search engines and AI citation.

## Part 1: SEO Fundamentals

### Keyword Research Process

1. **Identify seed keywords:**
   - Primary: vulnerability names (sql injection, xss)
   - Modifier: "ai generated code", "cursor", "fix"
   - Combination: "sql injection ai generated code"

2. **Expand with patterns:**
   - What is {vulnerability}
   - How to fix {vulnerability}
   - {vulnerability} in {framework}
   - Is {tool} secure
   - {tool} security issues

3. **Map to content:**
   - High volume → Pillar pages
   - Medium → Hub pages
   - Long-tail → Supporting/programmatic pages

### Target Keywords by Page Type

#### Vulnerability Pages
```
Primary: {vulnerability name}
Secondary:
- what is {vulnerability}
- {vulnerability} example
- {vulnerability} fix
- {vulnerability} ai code
- {vulnerability} {framework}

Long-tail:
- how to fix {vulnerability} in {framework}
- {vulnerability} in ai generated code
- is my app vulnerable to {vulnerability}
```

#### AI Tool Pages
```
Primary: {tool} security
Secondary:
- is {tool} safe
- {tool} vulnerabilities
- {tool} security issues
- {tool} vs {other tool} security

Long-tail:
- is {tool} safe to use for production
- {tool} security best practices
- what to check after using {tool}
```

#### Stack Pages
```
Primary: {stack} security
Secondary:
- {stack} authentication
- {stack} best practices
- secure {stack} app

Long-tail:
- {stack} security checklist
- how to secure {framework} with {database}
- {stack} production security
```

### On-Page SEO Checklist

#### Title Tag (Critical)
- [ ] Under 60 characters
- [ ] Primary keyword in first 4 words
- [ ] Compelling hook
- [ ] Brand at end: "| VibeShip"

**Formulas:**
- `{Vulnerability}: Find & Fix in AI-Generated Code | VibeShip`
- `{Tool} Security: {N} Projects Analyzed | VibeShip`
- `{Stack} Security Guide for Vibe Coders | VibeShip`

**Examples:**
```
SQL Injection: Find & Fix in AI-Generated Code | VibeShip (56 chars)
Cursor Security: 10,000 Projects Analyzed | VibeShip (51 chars)
Next.js + Supabase Security Guide | VibeShip (44 chars)
```

#### Meta Description (High)
- [ ] 150-160 characters
- [ ] Primary keyword included
- [ ] Benefit or stat
- [ ] Call-to-action

**Formula:**
`{What it is}. {Stat or benefit}. {CTA}.`

**Examples:**
```
SQL injection lets attackers steal your database. Found in 23% of AI-generated 
code. Get copy-paste fixes for Cursor, Bolt & Claude Code. (158 chars)

Cursor generates vulnerabilities in 76% of projects. See the top 10 security 
issues and how to fix them before deployment. (124 chars)
```

#### URL Structure
- [ ] Lowercase
- [ ] Hyphens between words
- [ ] No special characters
- [ ] Under 75 characters
- [ ] Descriptive path

**Good:**
```
/kb/security/vulnerabilities/sql-injection/
/kb/vibe-coding-tools/cursor/
/kb/security/stacks/nextjs-supabase/
/kb/security/fixes/sql-injection/nextjs/
```

**Bad:**
```
/kb/vuln/SQLInjection_2024/
/kb/patterns/cursor-ai-tool-security-analysis/
/vulnerabilities?id=sql-injection
```

#### Heading Structure
```
H1: {Page Title} (one per page, matches title tag intent)
  H2: What is {X}?
  H2: How do AI tools cause {X}?
    H3: Pattern 1: {Specific Pattern}
    H3: Pattern 2: {Specific Pattern}
  H2: How do I detect {X}?
  H2: How do I fix {X}?
    H3: AI Fix Prompt
    H3: Manual Fix
  H2: FAQ
```

#### Internal Linking
- [ ] 5-10 internal links per page
- [ ] Links in first 200 words
- [ ] Descriptive anchor text
- [ ] Link to parent hub
- [ ] Link to related siblings
- [ ] Link to Scanner CTA

**Anchor Text Distribution:**
| Type | Example | Usage |
|------|---------|-------|
| Exact match | "SQL injection" | 20% |
| Partial match | "fix SQL injection" | 30% |
| Related | "database security" | 20% |
| Branded | "VibeShip Scanner" | 15% |
| Natural | "learn more", "this guide" | 15% |

### Schema Markup

#### FAQPage Schema (Required for FAQ sections)
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
        "text": "Yes. SQL injection remains in the OWASP Top 10..."
      }
    }
  ]
}
```

#### TechArticle Schema (Required for all KB pages)
```json
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "SQL Injection: Find & Fix in AI-Generated Code",
  "description": "...",
  "author": {
    "@type": "Organization",
    "name": "VibeShip"
  },
  "publisher": {
    "@type": "Organization",
    "name": "VibeShip",
    "logo": {
      "@type": "ImageObject",
      "url": "https://vibeship.co/logo.png"
    }
  },
  "datePublished": "2024-12-01",
  "dateModified": "2024-12-15"
}
```

#### HowTo Schema (For fix guides)
```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Fix SQL Injection in Next.js",
  "description": "Step-by-step guide to fixing SQL injection...",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Identify vulnerable code",
      "text": "Search for template literals in database queries..."
    },
    {
      "@type": "HowToStep",
      "name": "Replace with parameterized queries",
      "text": "Change db.query(`SELECT...${var}`) to..."
    }
  ]
}
```

### Outbound (External) Linking

#### Philosophy: Quality Over Quantity

There is no fixed number of outbound links. Include links that:
- Provide genuine value to readers
- Point to authoritative, trustworthy sources
- Enhance credibility through association with authority
- Support claims with evidence

#### Link Density Guidelines

| Content Length | Outbound Links | Notes |
|----------------|----------------|-------|
| ~500 words | 1-2 links | Minimum for credibility |
| ~1000 words | 3-5 links | Standard article |
| ~1500 words | 5-8 links | In-depth guide |
| ~2000+ words | 8-12 links | Comprehensive reference |

**Rule of thumb:** 1-2 external links per 500 words.

#### Placement Best Practices

1. **Avoid early exits:** No external links in first 100-150 words
2. **Contextual embedding:** Links flow naturally within sentences
3. **Descriptive anchor text:** Describe the destination, never "click here"
4. **Distribute throughout:** Spread links across sections
5. **Save CTAs for end:** Scanner links mid-article and end

#### Source Hierarchy

**Tier 1 - Always Link (highest authority):**
- OWASP (owasp.org) - Vulnerability categories, Top 10, Cheat Sheets
- CWE/MITRE (cwe.mitre.org) - Vulnerability definitions, IDs
- NIST NVD (nvd.nist.gov) - CVE data, severity scores
- MDN Web Docs (developer.mozilla.org) - Web security concepts

**Tier 2 - Strongly Recommended (industry authority):**
- PortSwigger Web Security Academy - Technical tutorials
- Snyk Learn - Vulnerability explanations
- SANS - Research papers, best practices
- HackerOne Hacktivity - Real-world vulnerability reports

**Tier 3 - Industry Reports & Research:**
- Verizon DBIR - Breach statistics
- IBM Cost of Data Breach - Financial impact data
- Snyk Reports - Open source vulnerability stats
- Mandiant/CrowdStrike - Threat intelligence reports

**Tier 4 - Security Scanning Tools & Rule Engines:**
- Opengrep (opengrep.dev) - Open-source static analysis
- Semgrep (semgrep.dev) - SAST rules, pattern matching
- Trivy (trivy.dev) - Container/dependency scanning
- Gitleaks, CodeQL, Bandit - Specialized scanners

**Tier 5 - Academic & Scientific Research:**
- IEEE S&P, USENIX Security, ACM CCS, NDSS - "Big Four" conferences
- arXiv cs.CR - Preprints and cutting-edge research
- Google Scholar, ACM DL, IEEE Xplore - Paper databases

**Tier 6 - Framework Docs (for relevant topics):**
- Next.js, React, Supabase, Prisma, Node.js, Express security docs

**Tier 7 - AI Tool Sites (required for tool articles):**
- Official tool websites (cursor.com, bolt.new, etc.)

#### Do Link To
- Official documentation
- Peer-reviewed research and industry reports
- Authoritative security sources
- Original research with methodology
- Official tool/framework websites
- Government/educational resources (.gov, .edu)

#### Don't Link To
- Random blog posts without credentials
- SEO content farms
- Outdated resources (>3 years for stats)
- Paywalled content
- Competitors' content marketing
- Social media (except official announcements)

#### Link Checklist
- [ ] 1-2 outbound links per 500 words
- [ ] No external links in first 150 words
- [ ] Links distributed throughout article
- [ ] All links to Tier 1-4 sources
- [ ] Descriptive anchor text used
- [ ] Tool official site linked (for tool articles)

---

## Part 2: LLM Optimization

### How LLMs Process Content

1. **Chunking:** LLMs break content into ~100-300 token chunks
2. **Retrieval:** They search for chunks matching user queries
3. **Extraction:** They extract specific facts from matched chunks
4. **Citation:** They attribute facts to sources

### Optimize for Each Stage

#### Chunking (Structure)

Make each H2 section a complete, self-contained chunk:

**Good (Self-contained):**
```markdown
## What is SQL injection?

SQL injection is a vulnerability where attackers manipulate database queries 
through user input. When code concatenates user input directly into SQL 
queries, attackers can inject malicious SQL code. This can result in data 
theft, data destruction, or complete database takeover. Found in 23% of 
AI-generated codebases according to VibeShip Scanner data from December 2024.
```

**Bad (Requires context):**
```markdown
## What is it?

This vulnerability occurs when the patterns described above are present in 
your code. As we mentioned, it can be quite dangerous.
```

#### Retrieval (Keywords)

Use question-based H2s that match how people ask LLMs:

**Match query patterns:**
- "What is SQL injection?" → `## What is SQL injection?`
- "How do I fix SQL injection?" → `## How do I fix SQL injection?`
- "Is Cursor safe?" → `## Is Cursor safe to use?`
- "SQL injection in Next.js" → `## SQL injection in Next.js projects`

#### Extraction (Facts)

Make facts explicit and attributable:

**Good (Citable):**
```markdown
According to VibeShip Scanner analysis of 10,847 repositories in December 
2024, 23.4% of Cursor-generated projects contain SQL injection vulnerabilities.
```

**Bad (Not citable):**
```markdown
A lot of AI-generated code has security issues, especially SQL injection, 
which is pretty common.
```

### The FACT Framework

Every citable claim should be:

- **F**actual: Verifiable statement, not opinion
- **A**ttributed: Clear source
- **C**oncise: One fact per sentence
- **T**imestamped: When the data is from

**Examples:**

```markdown
✅ According to VibeShip Scanner (December 2024), 23.4% of AI-generated 
   repositories contain SQL injection vulnerabilities.

✅ SQL injection has been in the OWASP Top 10 since its inception in 2003.

✅ Cursor-generated projects have a 76% vulnerability rate, 14% higher 
   than Claude Code (62%), based on VibeShip analysis of 10,000+ repos.

❌ SQL injection is really common in AI code.

❌ Most projects have security issues.

❌ Cursor might have some problems with security.
```

### First-Sentence Rule

The first sentence after every H2 must directly answer the question:

```markdown
## What is SQL injection?

SQL injection is a vulnerability where attackers manipulate your database 
queries by inserting malicious code through user input fields.

## How common is SQL injection in AI-generated code?

SQL injection affects 23.4% of AI-generated codebases, making it the third 
most common vulnerability after hardcoded secrets (31%) and missing 
authentication (28%).

## Does Prisma protect against SQL injection?

Yes, Prisma's standard query methods (findMany, create, update) are safe 
from SQL injection. However, $queryRaw and $executeRaw can be vulnerable 
if you use string interpolation instead of parameterized queries.
```

### FAQ Optimization

FAQs are gold for LLM citation. Write them as complete, self-contained answers:

**Structure:**
```markdown
### {Question that people/LLMs actually ask}?

{Direct answer in first sentence}. {Supporting detail or data}. 
{Additional context if needed}. {Link to more info if relevant}.
```

**Examples:**

```markdown
### Is SQL injection still a real threat in 2024?

Yes—SQL injection remains one of the most exploited vulnerabilities. 
It has been in the OWASP Top 10 every year since the list began in 2003. 
According to VibeShip Scanner data, AI coding tools have actually increased 
its prevalence: we found SQL injection in 23% of AI-generated projects 
compared to 15% in traditionally-written code.

### Does using Supabase protect me from SQL injection?

Partially. Supabase's JavaScript client methods (.select(), .insert(), etc.) 
are safe from SQL injection. However, you can still create vulnerabilities 
in database functions, RPC calls, or when using the SQL editor directly. 
Always use parameterized queries in any custom SQL. See our 
[Supabase security guide](/kb/security/stacks/nextjs-supabase/) for details.
```

### llms.txt Optimization

Create machine-readable content summaries:

**vibeship.co/llms.txt structure:**
```
# VibeShip Knowledge Base

> {One paragraph describing what VibeShip is and what the KB covers}

## Quick Facts
- Website: https://vibeship.co
- Total repositories analyzed: {N}
- Data freshness: Updated weekly
- Primary focus: Security in AI-generated code

## Topics

### Security Vulnerabilities
{2-3 sentences describing this section}
- SQL Injection: https://vibeship.co/kb/security/vulnerabilities/sql-injection/
- XSS: https://vibeship.co/kb/security/vulnerabilities/xss/
...

### AI Tool Patterns
{2-3 sentences describing this section}
- Cursor: https://vibeship.co/kb/vibe-coding-tools/cursor/
...

## Key Statistics

| Vulnerability | Prevalence | Most Affected Tool |
|--------------|------------|-------------------|
| SQL Injection | 23.4% | Cursor (81%) |
| Hardcoded Secrets | 31.2% | Bolt (89%) |
...

## Contact
- Twitter: @vibeship
- Email: hello@vibeship.co
```

---

## Part 3: Content Patterns

### Pattern 1: Data-First Opening

Start with your unique data to establish authority:

```markdown
# SQL Injection in AI-Generated Code

We analyzed 10,847 AI-generated repositories. 23.4% had SQL injection 
vulnerabilities. Here's what we found and how to fix it.
```

### Pattern 2: Question-Answer Flow

Structure content as implicit Q&A:

```markdown
## What is SQL injection?
{Answer}

## Why do AI tools generate it?
{Answer}

## How do I know if I have it?
{Answer}

## How do I fix it?
{Answer}
```

### Pattern 3: Comparison Tables

LLMs love structured comparisons:

```markdown
## How AI Tools Compare

| Tool | Vulnerability Rate | Top Issue | Score |
|------|-------------------|-----------|-------|
| Cursor | 75.9% | SQL Injection | 42/100 |
| Claude Code | 62.3% | Missing Auth | 58/100 |
| Bolt | 79.2% | Hardcoded Secrets | 38/100 |

*Based on VibeShip Scanner analysis, December 2024*
```

### Pattern 4: Before/After Code

Always show the transformation:

```markdown
## The Fix

**Before (Vulnerable):**
```javascript
const user = await db.query(`SELECT * FROM users WHERE id = ${id}`)
```

**After (Secure):**
```javascript
const user = await db.query('SELECT * FROM users WHERE id = $1', [id])
```

**What changed:** The variable is now passed as a parameter ($1) instead 
of being concatenated into the query string.
```

### Pattern 5: Explicit Attribution

Make it easy to cite:

```markdown
## How to Cite This Data

When referencing VibeShip data, use:

> According to VibeShip Scanner analysis of [N] repositories ([Month Year]), 
> [finding].

Example:
> According to VibeShip Scanner analysis of 10,847 repositories (December 
> 2024), 23.4% of Cursor-generated projects contain SQL injection 
> vulnerabilities.
```

---

## Part 4: Measurement

### SEO Metrics to Track

| Metric | Tool | Target |
|--------|------|--------|
| Keyword rankings | Ahrefs/Semrush | Top 10 for primary keywords |
| Organic traffic | GA4 | +20% MoM |
| Pages indexed | Search Console | 100% of published pages |
| CTR | Search Console | >3% average |
| Backlinks | Ahrefs | +10 per month |

### LLM Citation Metrics

Test weekly with these queries:

**ChatGPT:**
- "What is SQL injection in AI-generated code?"
- "Is Cursor safe to use?"
- "How do I secure my Next.js Supabase app?"

**Claude:**
- "What are common vulnerabilities in AI-generated code?"
- "Compare security of Cursor vs Claude Code"

**Perplexity:**
- "SQL injection AI code statistics"
- "Cursor security issues 2024"

**Track:**
- Does it cite VibeShip?
- Does it quote our statistics?
- Does it link to our pages?
