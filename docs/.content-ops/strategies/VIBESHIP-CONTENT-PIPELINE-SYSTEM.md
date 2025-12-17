# VibeShip Security Content Pipeline
## Two-Agent System for World-Class KB Content

**Version:** 1.0  
**Last Updated:** December 2024  

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Agent 1: Research & Strategy](#agent-1-research--strategy)
3. [Agent 2: Content Writer](#agent-2-content-writer)
4. [Handoff Protocol](#handoff-protocol)
5. [Content Brief Templates](#content-brief-templates)
6. [Workflow Examples](#workflow-examples)
7. [Quality Assurance](#quality-assurance)
8. [Batch Processing](#batch-processing)
9. [Troubleshooting](#troubleshooting)

---

## System Overview

### Why Two Agents?

| Single Agent Problems | Two-Agent Solution |
|-----------------------|-------------------|
| Skill prompt consumes context needed for research | Research agent has full context for data gathering |
| Quality degrades mixing research + writing | Each agent optimized for its task |
| Hard to iterate on sections | Clear handoff points for review |
| Inconsistent output | Standardized briefs ensure consistency |

### The Pipeline

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         CONTENT PIPELINE                                │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐          │
│  │   INPUTS     │      │   AGENT 1    │      │   AGENT 2    │          │
│  │              │      │   Research   │      │   Writer     │          │
│  │ • Topic      │ ───▶ │              │ ───▶ │              │ ───▶ OUTPUT
│  │ • Scanner DB │      │ • Data       │      │ • Full Skill │          │
│  │ • Keywords   │      │ • Strategy   │      │ • Templates  │          │
│  │ • Competitors│      │ • Brief      │      │ • Voice      │          │
│  └──────────────┘      └──────────────┘      └──────────────┘          │
│                               │                     │                   │
│                               ▼                     ▼                   │
│                        Content Brief          Final Article             │
│                        (Structured)           (Publication-Ready)       │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### When to Use Each Agent

| Task | Agent |
|------|-------|
| Pull Scanner statistics | Agent 1 |
| Research competitor content | Agent 1 |
| Identify keyword opportunities | Agent 1 |
| Create content structure | Agent 1 |
| Write article sections | Agent 2 |
| Create AI fix prompts | Agent 2 |
| Generate FAQ content | Agent 2 |
| Format for publication | Agent 2 |

---

## Agent 1: Research & Strategy

### Role Definition

Agent 1 is a security research analyst who:
- Gathers and validates data
- Analyzes competitor content
- Identifies content opportunities
- Creates structured briefs for Agent 2

### System Prompt for Agent 1

```markdown
# VibeShip Research Agent

You are a security research analyst for VibeShip, specializing in AI-generated 
code vulnerabilities. Your job is to prepare comprehensive content briefs that 
will be handed to a content writer.

## Your Responsibilities

1. **Data Gathering**
   - Extract statistics from Scanner data
   - Validate numbers and trends
   - Identify tool-specific patterns

2. **Competitive Analysis**
   - Review top-ranking content for target keywords
   - Identify content gaps and opportunities
   - Note what competitors miss

3. **Keyword Research**
   - Identify primary and secondary keywords
   - Find "People Also Ask" questions
   - Map search intent

4. **Content Strategy**
   - Determine optimal content structure
   - Identify internal linking opportunities
   - Suggest unique angles based on our data

## Output Format

Always output a structured Content Brief using the provided template.
Never write the actual article content - that's for the Content Writer.

## Quality Standards

- All statistics must have sources
- All claims must be verifiable
- All keywords must have search intent identified
- All competitor gaps must be specific and actionable
```

### Agent 1 Capabilities

```
┌─────────────────────────────────────────────────────────────────┐
│ AGENT 1 CAN DO                    │ AGENT 1 DOES NOT DO        │
├───────────────────────────────────┼────────────────────────────┤
│ ✓ Query Scanner database          │ ✗ Write article prose      │
│ ✓ Analyze competitor articles     │ ✗ Create AI fix prompts    │
│ ✓ Research keywords               │ ✗ Write FAQ answers        │
│ ✓ Identify content gaps           │ ✗ Format for publication   │
│ ✓ Structure content briefs        │ ✗ Apply brand voice        │
│ ✓ Validate security accuracy      │ ✗ Optimize for readability │
│ ✓ Find internal link targets      │ ✗ Create code examples     │
│ ✓ Suggest unique angles           │ ✗ Write meta descriptions  │
└───────────────────────────────────┴────────────────────────────┘
```

### Agent 1 Task Prompts

#### Task: Research a Vulnerability Topic

```markdown
## Research Task: [VULNERABILITY NAME]

Please prepare a complete content brief for an article about [VULNERABILITY].

### Data to Gather

1. **Scanner Statistics**
   - What's the prevalence rate?
   - Which AI tool is most affected?
   - What's the week-over-week trend?
   - How does this compare to other vulnerabilities?

2. **Security Reference**
   - What's the CWE ID?
   - What OWASP category does this fall under?
   - What are the official severity ratings?

3. **Keyword Research**
   - What's the primary keyword and monthly search volume?
   - What are 3-5 secondary keywords?
   - What questions appear in "People Also Ask"?
   - What's the search intent (informational/transactional)?

4. **Competitive Analysis**
   - What currently ranks #1-3 for the primary keyword?
   - What do competitors cover well?
   - What do competitors miss that we can cover?
   - What unique angle does our Scanner data enable?

5. **Internal Linking**
   - What existing KB pages should this link to?
   - What pages should link back to this one?

### Output

Provide a complete Content Brief using the standard template.
```

#### Task: Research an AI Tool Topic

```markdown
## Research Task: [TOOL NAME] Security Analysis

Please prepare a content brief for a security analysis of [TOOL].

### Data to Gather

1. **Scanner Statistics**
   - Overall vulnerability rate for this tool
   - Top 10 vulnerabilities by prevalence
   - Comparison with other tools
   - Security score calculation

2. **Tool Profile**
   - What company makes it?
   - What's its primary use case?
   - What models does it use?
   - What's its market position?

3. **Pattern Analysis**
   - What specific code patterns does this tool generate?
   - Why does it generate insecure code?
   - What prompts lead to better security?

4. **Keyword Research**
   - "[tool] security" search volume
   - "is [tool] safe" search volume
   - Related questions people ask

5. **Competitive Analysis**
   - Has anyone written about this tool's security?
   - What angle is untapped?

### Output

Provide a complete Content Brief using the AI Tool template.
```

#### Task: Research a Stack Guide Topic

```markdown
## Research Task: [FRAMEWORK] + [DATABASE] Security Guide

Please prepare a content brief for a stack security guide.

### Data to Gather

1. **Scanner Statistics**
   - How many repos use this stack?
   - What's the vulnerability rate?
   - Top 5 vulnerabilities for this stack
   - Which AI tools generate this stack most often?

2. **Stack Analysis**
   - What security features does [FRAMEWORK] provide?
   - What security features does [DATABASE] provide?
   - What are the default security settings?
   - What are common misconfigurations?

3. **Keyword Research**
   - "[framework] [database] security" volume
   - "[framework] authentication" volume
   - Related tutorials and guides ranking

4. **Checklist Research**
   - What security checks are essential for this stack?
   - What do official docs recommend?
   - What do security auditors check?

### Output

Provide a complete Content Brief using the Stack Guide template.
```

---

## Agent 2: Content Writer

### Role Definition

Agent 2 is a world-class security content writer who:
- Transforms briefs into publication-ready content
- Applies VibeShip brand voice
- Optimizes for SEO and LLM citation
- Creates actionable, copy-paste solutions

### System Prompt for Agent 2

Use the complete prompt from **VIBESHIP-SECURITY-WRITER-AGENT-PROMPT.md**

This includes:
- Full skill definition
- Writing guidelines
- Content templates
- SEO requirements
- LLM optimization rules
- Quality checklist

### Agent 2 Capabilities

```
┌─────────────────────────────────────────────────────────────────┐
│ AGENT 2 CAN DO                    │ AGENT 2 DOES NOT DO        │
├───────────────────────────────────┼────────────────────────────┤
│ ✓ Write compelling prose          │ ✗ Research new data        │
│ ✓ Apply brand voice               │ ✗ Validate statistics      │
│ ✓ Create AI fix prompts           │ ✗ Analyze competitors      │
│ ✓ Write FAQ with schema           │ ✗ Identify keywords        │
│ ✓ Generate code examples          │ ✗ Query databases          │
│ ✓ Optimize for SEO                │ ✗ Find internal links      │
│ ✓ Structure for LLM extraction    │ ✗ Determine content strategy│
│ ✓ Format for publication          │ ✗ Verify security claims   │
└───────────────────────────────────┴────────────────────────────┘
```

### Agent 2 Task Prompts

#### Task: Write Full Article from Brief

```markdown
## Writing Task: Create Article from Brief

Using the VibeShip security writing guidelines, create a complete article 
based on this Content Brief:

[PASTE CONTENT BRIEF FROM AGENT 1]

### Requirements

1. Follow the exact structure from the guidelines
2. Use all data points provided in the brief
3. Include all internal links specified
4. Target the primary keyword naturally
5. Create a complete AI fix prompt (200-400 words)
6. Write 5 FAQ entries targeting the PAA questions

### Output Format

Provide:
1. Complete markdown article
2. JSON frontmatter for CMS
3. Meta title and description
4. FAQ schema markup
```

#### Task: Write Specific Section

```markdown
## Writing Task: [SECTION NAME]

Using the VibeShip security writing guidelines, write ONLY the 
[SECTION NAME] section for [TOPIC].

### Data to Use
[Paste relevant data from brief]

### Requirements
- Length: [X-Y words]
- Must include: [specific elements]
- Tone: [specific guidance]

### Context
This section comes after: [previous section summary]
This section comes before: [next section summary]
```

#### Task: Create AI Fix Prompt

```markdown
## Writing Task: AI Fix Prompt

Create a complete AI fix prompt for [VULNERABILITY] in [FRAMEWORK].

### Requirements

The prompt must:
1. Work in Cursor, Claude Code, AND Bolt
2. Include specific patterns to search for (with examples)
3. Show before/after code for each fix pattern
4. Include framework-specific considerations
5. Have a verification/testing step
6. Be 200-400 words

### Context from Brief
[Paste relevant vulnerability patterns and framework info]

### Output

Provide the complete prompt in a copyable code block.
```

#### Task: Write FAQ Section

```markdown
## Writing Task: FAQ Section

Write 5 FAQ entries for [TOPIC].

### Questions to Answer (from PAA research)
1. [Question 1]
2. [Question 2]
3. [Question 3]
4. [Question 4]
5. [Question 5]

### Requirements per Answer
- First sentence directly answers the question
- Include one citable fact with attribution
- 50-100 words
- Link to related content where relevant

### Data Available
[Paste stats and facts from brief]

### Output

Provide:
1. FAQ in markdown format
2. FAQPage schema markup in JSON-LD
```

---

## Handoff Protocol

### From Agent 1 to Agent 2

Agent 1 outputs a **Content Brief** that Agent 2 consumes.

```
┌─────────────────────────────────────────────────────────────────┐
│                     HANDOFF DOCUMENT                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  CONTENT BRIEF: [Topic Name]                                    │
│  Generated: [Date]                                              │
│  Status: Ready for Writing                                      │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ SECTION 1: Core Data                                    │   │
│  │ All statistics, numbers, sources                        │   │
│  └─────────────────────────────────────────────────────────┘   │
│                         ↓                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ SECTION 2: SEO Strategy                                 │   │
│  │ Keywords, intent, competitor gaps                       │   │
│  └─────────────────────────────────────────────────────────┘   │
│                         ↓                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ SECTION 3: Content Structure                            │   │
│  │ Outline, sections, requirements                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                         ↓                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ SECTION 4: Internal Linking                             │   │
│  │ Pages to link to, anchor text suggestions               │   │
│  └─────────────────────────────────────────────────────────┘   │
│                         ↓                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ SECTION 5: Unique Angle                                 │   │
│  │ What makes this different from competitors              │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Review Checkpoints

After each agent completes work, review before proceeding:

```
CHECKPOINT 1: After Agent 1 (Research)
├── □ All statistics have sources
├── □ Keywords have search volume estimates
├── □ Competitor analysis is specific
├── □ Unique angle is clear
├── □ Internal links are valid URLs
└── □ Brief is complete (no TBDs)

CHECKPOINT 2: After Agent 2 Section Draft
├── □ Section matches brief requirements
├── □ Data is used correctly
├── □ Word count is in range
├── □ Tone matches brand voice
└── □ Ready for next section

CHECKPOINT 3: After Agent 2 Full Draft
├── □ All sections complete
├── □ AI fix prompt is testable
├── □ FAQ answers are direct
├── □ Internal links included
├── □ Meta tags optimized
└── □ Ready for QA
```

---

## Content Brief Templates

### Template 1: Vulnerability Article Brief

```markdown
# Content Brief: [Vulnerability Name]

**Generated:** [Date]
**Target Publish:** [Date]
**Priority:** P0/P1/P2

---

## 1. Core Data

### Scanner Statistics
| Metric | Value | Source |
|--------|-------|--------|
| Prevalence | X.X% | Scanner DB, [date] |
| Repos Scanned | N | Scanner DB, [date] |
| Week-over-Week | +/-X.X% | Scanner DB, [date] |
| Most Affected Tool | [Tool] (X%) | Scanner DB, [date] |

### Tool Breakdown
| Tool | Vulnerability Rate | Sample Size |
|------|-------------------|-------------|
| Cursor | X% | N repos |
| Bolt | X% | N repos |
| Claude Code | X% | N repos |
| v0 | X% | N repos |

### Security References
- **CWE ID:** CWE-XXX
- **CWE Name:** [Official Name]
- **OWASP Category:** AXX:2021 - [Category Name]
- **Severity:** Critical/High/Medium/Low
- **CVSS Range:** X.X - X.X

---

## 2. SEO Strategy

### Target Keywords
| Keyword | Volume | Difficulty | Intent |
|---------|--------|------------|--------|
| [primary] | X,XXX | XX | Informational |
| [secondary 1] | XXX | XX | Informational |
| [secondary 2] | XXX | XX | Transactional |

### People Also Ask
1. "[Question 1]?"
2. "[Question 2]?"
3. "[Question 3]?"
4. "[Question 4]?"
5. "[Question 5]?"

### Search Intent Analysis
- **Primary intent:** [Informational/Transactional/Navigational]
- **User goal:** [What they want to accomplish]
- **Content need:** [What content will satisfy them]

---

## 3. Competitive Analysis

### Current Top 3 Results
1. **[URL]** - [Title]
   - Word count: ~X,XXX
   - Strengths: [What they do well]
   - Weaknesses: [What they miss]

2. **[URL]** - [Title]
   - Word count: ~X,XXX
   - Strengths: [What they do well]
   - Weaknesses: [What they miss]

3. **[URL]** - [Title]
   - Word count: ~X,XXX
   - Strengths: [What they do well]
   - Weaknesses: [What they miss]

### Content Gaps (Our Opportunities)
1. **[Gap 1]:** No competitor covers [specific aspect]
2. **[Gap 2]:** All competitors miss [AI-specific angle]
3. **[Gap 3]:** None have [unique data we have]

---

## 4. Content Structure

### Recommended Outline
```
H1: [Title with Primary Keyword]

H2: What is [Vulnerability]?
    - Definition in plain English
    - Real-world analogy
    - Consequences
    Length: 100-150 words

H2: How AI Tools Cause [Vulnerability]
    - Why AI generates this pattern
    - Tool comparison chart
    - Specific code patterns
    Length: 150-200 words

H2: What Could Happen
    - Bullet list of consequences
    - Real-world examples
    Length: 75-100 words

H2: How to Detect [Vulnerability]
    - Code patterns to search
    - Quick check methods
    - Scanner CTA
    Length: 100-150 words

H2: How to Fix [Vulnerability]
    H3: AI Fix Prompt
        - Complete prompt
        Length: 200-400 words
    H3: Manual Fix
        - Before/after code
        - Explanation
        Length: 150-200 words
    H3: Framework-Specific Fixes
        - Links to fix pages
        Length: 50 words

H2: FAQ
    - 5 questions from PAA
    Length: 50-100 words each

H2: Related
    - Links to related content
    Length: 50 words
```

### Required Elements
- [ ] Quick answer in first 50 words
- [ ] Stats box with live data
- [ ] Tool comparison chart
- [ ] Complete AI fix prompt
- [ ] Before/after code examples
- [ ] 5 FAQ entries
- [ ] Scanner CTA
- [ ] Internal links (5-10)

---

## 5. Internal Linking

### Must Link TO (Higher Authority)
| Page | Suggested Anchor Text |
|------|----------------------|
| /kb/security/vulnerabilities/ | "security vulnerabilities" |
| /kb/security/ai-patterns/[tool]/ | "[Tool] security patterns" |
| /kb/security/stacks/[stack]/ | "[Stack] security guide" |

### Should Link TO (Related)
| Page | Suggested Anchor Text |
|------|----------------------|
| /kb/security/vulnerabilities/[related]/ | "[Related vuln]" |
| /kb/security/fixes/[vuln]/[framework]/ | "fix in [Framework]" |
| /kb/glossary/security/[term]/ | "[term]" |

### External Links (Authority Sources)
| Source | Link For |
|--------|----------|
| OWASP | Official vulnerability description |
| CWE | Technical reference |
| [Framework docs] | Security documentation |

---

## 6. Unique Angle

### Our Differentiator
[What makes our content unique - usually our Scanner data]

### Key Message
[The one thing readers should remember]

### Data-Driven Claims to Highlight
1. "[Specific stat that only we have]"
2. "[Comparison that only we can make]"
3. "[Trend that only we track]"

---

## 7. Meta Information

### Suggested Title Tag (under 60 chars)
`[Vulnerability]: Find & Fix in AI-Generated Code | VibeShip`

### Suggested Meta Description (150-160 chars)
`[Vulnerability] lets attackers [consequence]. Found in [X]% of AI-generated code. Get copy-paste fixes for Cursor, Bolt & Claude Code.`

### Target URL
`/kb/security/vulnerabilities/[slug]/`

---

## 8. Writer Notes

### Tone Guidance
[Any specific tone notes for this topic]

### Technical Accuracy Notes
[Any gotchas or things to verify]

### Things to Avoid
[Common mistakes for this topic]

---

**Brief Status:** ✅ Complete - Ready for Agent 2
```

### Template 2: AI Tool Analysis Brief

```markdown
# Content Brief: [Tool Name] Security Analysis

**Generated:** [Date]
**Target Publish:** [Date]
**Priority:** P0/P1/P2

---

## 1. Tool Profile

### Basic Information
| Attribute | Value |
|-----------|-------|
| Tool Name | [Name] |
| Company | [Company] |
| Type | [IDE Extension/Web App/CLI] |
| Primary Model | [GPT-4/Claude/etc.] |
| Launch Date | [Date] |
| Pricing | [Free/Paid/Freemium] |

### Market Position
- **Target Users:** [Who uses this tool]
- **Primary Use Case:** [What it's mainly used for]
- **Competitors:** [Direct competitors]

---

## 2. Scanner Statistics

### Overall Security Score
| Metric | Value | Calculation |
|--------|-------|-------------|
| Security Score | XX/100 | [How calculated] |
| Vulnerability Rate | XX.X% | Repos with ≥1 vuln |
| Avg Vulns per Repo | X.X | Total vulns / repos |
| Repos Analyzed | N | Scanner DB |

### Top 10 Vulnerabilities
| Rank | Vulnerability | Rate | Trend |
|------|--------------|------|-------|
| 1 | [Vuln 1] | XX% | ↑/↓/→ |
| 2 | [Vuln 2] | XX% | ↑/↓/→ |
| 3 | [Vuln 3] | XX% | ↑/↓/→ |
| 4 | [Vuln 4] | XX% | ↑/↓/→ |
| 5 | [Vuln 5] | XX% | ↑/↓/→ |
| 6 | [Vuln 6] | XX% | ↑/↓/→ |
| 7 | [Vuln 7] | XX% | ↑/↓/→ |
| 8 | [Vuln 8] | XX% | ↑/↓/→ |
| 9 | [Vuln 9] | XX% | ↑/↓/→ |
| 10 | [Vuln 10] | XX% | ↑/↓/→ |

### Comparison with Other Tools
| Tool | Score | Vuln Rate | Top Issue |
|------|-------|-----------|-----------|
| [This Tool] | XX/100 | XX% | [Issue] |
| [Competitor 1] | XX/100 | XX% | [Issue] |
| [Competitor 2] | XX/100 | XX% | [Issue] |
| [Competitor 3] | XX/100 | XX% | [Issue] |

---

## 3. Pattern Analysis

### Why This Tool Generates Vulnerabilities

**Pattern 1: [Pattern Name]**
- What happens: [Description]
- Why it happens: [Root cause]
- Example code generated: [Code snippet]

**Pattern 2: [Pattern Name]**
- What happens: [Description]
- Why it happens: [Root cause]
- Example code generated: [Code snippet]

**Pattern 3: [Pattern Name]**
- What happens: [Description]
- Why it happens: [Root cause]
- Example code generated: [Code snippet]

### Prompts That Improve Security
| Bad Prompt | Better Prompt | Why |
|------------|---------------|-----|
| "[Bad]" | "[Good]" | [Explanation] |
| "[Bad]" | "[Good]" | [Explanation] |
| "[Bad]" | "[Good]" | [Explanation] |

---

## 4. SEO Strategy

### Target Keywords
| Keyword | Volume | Intent |
|---------|--------|--------|
| "[tool] security" | X,XXX | Informational |
| "is [tool] safe" | XXX | Informational |
| "[tool] vulnerabilities" | XXX | Informational |

### People Also Ask
1. "Is [tool] safe to use?"
2. "What are the security risks of [tool]?"
3. "[Tool] vs [competitor] security?"
4. "Should I use [tool] for production?"

---

## 5. Content Structure

### Recommended Outline
```
H1: Security in [Tool]-Generated Code

H2: [Tool] Security Score: XX/100
    - Score visualization
    - What it means
    - Comparison context

H2: Top 10 Vulnerabilities in [Tool] Projects
    - Ranked table
    - Brief explanation of top 3

H2: Why [Tool] Generates These Issues
    - Pattern 1 with code
    - Pattern 2 with code
    - Pattern 3 with code

H2: How [Tool] Compares to Other AI Tools
    - Comparison table
    - Analysis

H2: Using [Tool] More Securely
    - Prompt improvements
    - What to check after
    - Scanner CTA

H2: FAQ
    - 4-5 questions

H2: Related
    - Links
```

---

## 6. Internal Linking

### Must Link TO
| Page | Anchor Text |
|------|-------------|
| /kb/security/ai-patterns/ | "AI tool security patterns" |
| /kb/security/vulnerabilities/[top-vuln]/ | "[Top vulnerability]" |

### Create Sub-Pages For
- /kb/security/ai-patterns/[tool]/sql-injection/
- /kb/security/ai-patterns/[tool]/hardcoded-secrets/
- /kb/security/ai-patterns/[tool]/missing-auth/

---

**Brief Status:** ✅ Complete - Ready for Agent 2
```

### Template 3: Stack Guide Brief

```markdown
# Content Brief: [Framework] + [Database] Security Guide

**Generated:** [Date]
**Target Publish:** [Date]
**Priority:** P0/P1/P2

---

## 1. Stack Profile

### Components
| Component | Version | Role |
|-----------|---------|------|
| Framework | [Framework vX] | [Frontend/Backend/Full-stack] |
| Database | [Database] | [Data storage] |
| Auth | [Auth solution] | [Optional common pairing] |
| Hosting | [Common hosts] | [Where usually deployed] |

### Popularity with Vibe Coders
- **Why popular:** [Reasons this stack is common]
- **AI tools that generate it:** [Which tools default to this]
- **Common project types:** [What people build with it]

---

## 2. Scanner Statistics

### Overall Stack Security
| Metric | Value |
|--------|-------|
| Repos with this stack | N |
| Vulnerability rate | XX% |
| Avg issues per repo | X.X |
| Most common vuln | [Vuln] |

### Top 5 Vulnerabilities
| Rank | Vulnerability | Rate | Stack-Specific Cause |
|------|--------------|------|---------------------|
| 1 | [Vuln] | XX% | [Why in this stack] |
| 2 | [Vuln] | XX% | [Why in this stack] |
| 3 | [Vuln] | XX% | [Why in this stack] |
| 4 | [Vuln] | XX% | [Why in this stack] |
| 5 | [Vuln] | XX% | [Why in this stack] |

---

## 3. Framework Security Analysis

### Security Features
| Feature | Default | Recommendation |
|---------|---------|----------------|
| [Feature 1] | On/Off | [What to do] |
| [Feature 2] | On/Off | [What to do] |

### Common Misconfigurations
1. **[Misconfig 1]:** [Description and fix]
2. **[Misconfig 2]:** [Description and fix]

### Files to Secure
- `[file1]` - [What to check]
- `[file2]` - [What to check]

---

## 4. Database Security Analysis

### Security Features
| Feature | Default | Recommendation |
|---------|---------|----------------|
| [RLS/Auth/etc.] | On/Off | [What to do] |

### Common Misconfigurations
1. **[Misconfig 1]:** [Description and fix]
2. **[Misconfig 2]:** [Description and fix]

---

## 5. Security Checklist Items

### Authentication (Critical)
- [ ] [Check 1]
- [ ] [Check 2]
- [ ] [Check 3]

### Authorization (Critical)
- [ ] [Check 1]
- [ ] [Check 2]

### Data Protection (High)
- [ ] [Check 1]
- [ ] [Check 2]

### Infrastructure (Medium)
- [ ] [Check 1]
- [ ] [Check 2]

---

## 6. SEO Strategy

### Target Keywords
| Keyword | Volume | Intent |
|---------|--------|--------|
| "[framework] [database] security" | XXX | Informational |
| "secure [framework] app" | XXX | Informational |
| "[framework] authentication" | X,XXX | Informational |

---

## 7. Content Structure

### Recommended Outline
```
H1: [Framework] + [Database] Security Guide

H2: Security Checklist
    - Interactive checklist by category
    - Download option

H2: Top 5 Vulnerabilities in [Stack] Projects
    - Each with quick fix
    - Links to full guides

H2: [Framework] Security
    - Key features
    - Common mistakes
    - Files to check

H2: [Database] Security
    - Key features (RLS, etc.)
    - Common mistakes

H2: Common AI Mistakes with [Stack]
    - Pattern 1 with fix
    - Pattern 2 with fix

H2: Environment Setup
    - Required env vars
    - Security config

H2: Recommended Packages
    - Table of security packages

H2: FAQ
    - 4-5 questions
```

---

**Brief Status:** ✅ Complete - Ready for Agent 2
```

---

## Workflow Examples

### Example 1: Creating a Vulnerability Article

#### Step 1: Start Agent 1 Session

```
You are the VibeShip Research Agent. Your job is to prepare content briefs.

I need a complete content brief for an article about SQL Injection.

Here's our Scanner data:
- 23.4% prevalence across 10,847 repos
- Cursor: 81%, Bolt: 74%, Claude Code: 67%, v0: 52%
- Trending up 2.3% week-over-week

Please create a full content brief using the vulnerability template.
Include keyword research, competitive analysis, and internal linking strategy.
```

#### Step 2: Review Agent 1 Output

Check the Content Brief for:
- [ ] All data points included with sources
- [ ] Keywords have estimated volumes
- [ ] Competitor gaps are specific
- [ ] Internal links are valid
- [ ] Unique angle is clear

#### Step 3: Start Agent 2 Session

```
[Paste full Security Writer Agent prompt]

---

I have a content brief for you to write. Create a complete article following 
all VibeShip guidelines.

[Paste Content Brief from Agent 1]

Start with:
1. Complete markdown article
2. JSON frontmatter
3. Meta title and description
```

#### Step 4: Review Agent 2 Output

Use the Quality Checklist (see Section 7).

#### Step 5: Iterate if Needed

```
The AI fix prompt needs work. Please rewrite it to:
1. Be more specific about patterns to search for
2. Include Prisma-specific fixes
3. Add a verification step at the end
```

---

### Example 2: Batch Processing Multiple Articles

#### Step 1: Agent 1 Creates Multiple Briefs

```
You are the VibeShip Research Agent.

I need content briefs for our P0 vulnerabilities. Create briefs for:
1. SQL Injection
2. Hardcoded Secrets
3. Missing Authentication
4. XSS
5. IDOR

Here's our Scanner data:
[Paste data table]

Create a summary brief for each (can be shorter than full template).
Focus on: data, keywords, unique angle, internal links.
```

#### Step 2: Agent 2 Processes Each Brief

```
[Security Writer Agent prompt]

---

I have 5 content briefs to process. For each, create:
1. Quick Answer (50 words)
2. Stats Box
3. What Is It section
4. AI Fix Prompt

Start with Brief 1: SQL Injection

[Paste Brief 1]
```

Continue for each brief, or do multiple in one session if context allows.

---

### Example 3: Section-by-Section Quality Build

#### Step 1: Agent 1 Full Research

```
[Research Agent prompt]

Create a comprehensive brief for "Cursor Security Analysis".

Include:
- Full Scanner data for Cursor
- Top 10 vulnerabilities with patterns
- Comparison with all other tools
- Keyword research
- Why Cursor generates these patterns (technical analysis)
```

#### Step 2: Agent 2 - Section 1

```
[Writer Agent prompt]

Using this brief, write ONLY:
1. Quick Answer (30-50 words)
2. Security Score section with score explanation

[Paste Brief]
```

**Review and approve before continuing.**

#### Step 3: Agent 2 - Section 2

```
Good. Now write the "Top 10 Vulnerabilities" section.
- Include ranked table
- Add 2-3 sentences explaining top 3
- Link to each vulnerability's KB page
```

**Review and approve.**

#### Step 4: Agent 2 - Section 3

```
Now write "Why Cursor Generates These Issues".
- Cover the 3 main patterns from the brief
- Include code examples for each
- Explain the root cause (training data, defaults, etc.)
```

**Continue until complete.**

---

## Quality Assurance

### QA Checklist: After Agent 2

```markdown
## Content QA Checklist

### Structure & Format
- [ ] Title under 60 characters
- [ ] Meta description 150-160 characters
- [ ] H1 matches title intent
- [ ] H2s are question-based where appropriate
- [ ] Proper heading hierarchy (no skipped levels)
- [ ] Code blocks have language specified

### Content Quality
- [ ] First 50 words directly answer main query
- [ ] All statistics have attribution
- [ ] All jargon explained on first use
- [ ] Code examples show before AND after
- [ ] Analogies are clear and accurate

### AI Fix Prompt
- [ ] 200-400 words
- [ ] Specific patterns to search for
- [ ] Framework-specific notes included
- [ ] Before/after code for each fix
- [ ] Verification step at end
- [ ] Works in Cursor, Claude Code, AND Bolt

### FAQ Section
- [ ] 5 questions included
- [ ] Each answer 50-100 words
- [ ] First sentence directly answers question
- [ ] Citable fact in each answer
- [ ] Links to deeper content

### SEO
- [ ] Primary keyword in title
- [ ] Primary keyword in first 100 words
- [ ] Primary keyword in at least one H2
- [ ] 5-10 internal links
- [ ] 1-2 external authority links
- [ ] Alt text for any images

### LLM Optimization
- [ ] Each section 75-225 words
- [ ] Sections are self-contained
- [ ] Facts are citable with attribution
- [ ] FAQ matches PAA questions

### Technical Accuracy
- [ ] CWE ID is correct
- [ ] OWASP category is correct
- [ ] Code examples are accurate
- [ ] Security advice is current best practice
- [ ] No dangerous recommendations

### Links
- [ ] All internal links are valid URLs
- [ ] All external links work
- [ ] Anchor text is descriptive
- [ ] No orphaned content

### Final Review
- [ ] Read aloud - does it flow?
- [ ] Vibe coder would understand this
- [ ] Would rank higher than competitors
- [ ] Would get cited by LLMs
- [ ] Clear CTA for Scanner
```

### QA Prompts for Agent 2

#### Accuracy Check
```
Review this article for technical accuracy:

[Paste article]

Check:
1. Is the CWE ID correct?
2. Are the code examples accurate and working?
3. Does the fix actually prevent the vulnerability?
4. Is any security advice outdated?

List any issues found.
```

#### LLM Citation Test
```
Pretend you're ChatGPT. A user asks: "[Main query this article answers]"

Using ONLY this article as your source:
1. Write your response
2. What facts would you cite?
3. What attribution would you give?
4. What's missing that would make this more citable?

[Paste article]
```

#### Readability Check
```
Review this article for vibe coder readability:

[Paste article]

Check:
1. Any unexplained jargon?
2. Any sections that assume security knowledge?
3. Any walls of text that need breaking up?
4. Any missing analogies that would help?
5. Overall: would a non-technical founder understand this?

Suggest specific improvements.
```

---

## Batch Processing

### Batch Workflow for 10+ Articles

```
┌─────────────────────────────────────────────────────────────────┐
│                    BATCH PROCESSING FLOW                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Day 1: Research (Agent 1)                                      │
│  ├── Morning: Create briefs 1-5                                 │
│  ├── Afternoon: Create briefs 6-10                              │
│  └── Evening: Review all briefs, fix gaps                       │
│                                                                 │
│  Day 2: Core Content (Agent 2)                                  │
│  ├── Morning: Quick Answers + Stats for all 10                  │
│  ├── Afternoon: "What Is It" sections for all 10                │
│  └── Evening: Review, iterate on weak sections                  │
│                                                                 │
│  Day 3: Solutions (Agent 2)                                     │
│  ├── Morning: AI Fix Prompts for all 10                         │
│  ├── Afternoon: Manual Fix sections for all 10                  │
│  └── Evening: Test fix prompts on real code                     │
│                                                                 │
│  Day 4: FAQs + Polish (Agent 2)                                 │
│  ├── Morning: FAQ sections for all 10                           │
│  ├── Afternoon: Internal linking pass                           │
│  └── Evening: Final QA checklist                                │
│                                                                 │
│  Day 5: Publication                                             │
│  ├── Morning: Format for CMS                                    │
│  ├── Afternoon: Create schema markup                            │
│  └── Evening: Publish + submit to Search Console                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Batch Prompts

#### Agent 1: Multiple Briefs
```
Create summary briefs for these 5 vulnerabilities:
1. [Vuln 1] - Data: [stats]
2. [Vuln 2] - Data: [stats]
3. [Vuln 3] - Data: [stats]
4. [Vuln 4] - Data: [stats]
5. [Vuln 5] - Data: [stats]

For each, provide:
- Primary keyword + estimated volume
- Top 3 competitor gaps
- Unique angle from our data
- 3 internal links to include
- 3 PAA questions to answer

Format as a table or structured list for easy reference.
```

#### Agent 2: Batch Section Generation
```
Generate the "What Is It" section for these 5 vulnerabilities.

For each:
- 100-150 words
- Plain English definition
- Real-world analogy
- Consequences in concrete terms

Vulnerabilities:
1. SQL Injection: [paste brief excerpt]
2. XSS: [paste brief excerpt]
3. IDOR: [paste brief excerpt]
4. Missing Auth: [paste brief excerpt]
5. Hardcoded Secrets: [paste brief excerpt]
```

---

## Troubleshooting

### Common Issues & Solutions

#### Issue: Agent 2 ignores brief data
```
Problem: Writer uses different statistics than provided in brief.

Solution prompt:
"You MUST use these exact statistics from the brief:
- Prevalence: [X]%
- Repos: [N]
- Tool breakdown: [list]

Do not make up or estimate any numbers. If data is missing, note it 
and I will provide."
```

#### Issue: Content too technical
```
Problem: Article uses unexplained jargon.

Solution prompt:
"Rewrite this section for a vibe coder audience:
- They know JavaScript basics
- They have ZERO security background
- Every technical term needs explanation on first use
- Use analogies for complex concepts

Current section:
[paste section]"
```

#### Issue: AI fix prompt doesn't work
```
Problem: Generated fix prompt is too vague.

Solution prompt:
"This fix prompt is too vague. Rewrite with:
1. EXACT regex patterns to search for
2. SPECIFIC file paths to check (e.g., /app/api/, /pages/api/)
3. REAL code examples, not pseudocode
4. Step-by-step verification process

Current prompt:
[paste prompt]"
```

#### Issue: FAQ answers aren't citable
```
Problem: FAQ answers are hedged or vague.

Solution prompt:
"These FAQ answers won't get cited by LLMs. Rewrite each to:
1. Start with direct answer (YES/NO/[FACT])
2. Include specific number or statistic
3. Add attribution: 'According to VibeShip Scanner...'
4. Be 50-100 words exactly

Current FAQs:
[paste FAQs]"
```

#### Issue: Missing internal links
```
Problem: Article has fewer than 5 internal links.

Solution prompt:
"Add internal links to this article. Requirements:
- Minimum 5 internal links
- Use descriptive anchor text (not 'click here')
- Link to these pages: [list from brief]
- Links should feel natural, not forced

Current article:
[paste article]"
```

---

## Quick Reference

### Agent 1 Starter Prompt
```
You are the VibeShip Research Agent. Create comprehensive content briefs 
for security articles. Output structured briefs with data, keywords, 
competitor analysis, and content strategy. Never write article prose.
```

### Agent 2 Starter Prompt
```
[Paste VIBESHIP-SECURITY-WRITER-AGENT-PROMPT.md in full]
```

### Handoff Template
```
## Handoff: [Topic]

**Brief Status:** Complete
**Agent 1 Work:** [Summary of research done]
**Ready for Agent 2:** Yes

### Content Brief
[Paste full brief]

### Agent 2 Instructions
Please create [specific deliverable] following all VibeShip guidelines.
```

### QA Checklist Summary
```
□ Title <60 chars with keyword
□ Meta 150-160 chars with CTA
□ First 50 words answer query
□ All stats attributed
□ All jargon explained
□ AI fix prompt 200-400 words
□ FAQ has 5 questions, 50-100 words each
□ 5-10 internal links
□ Passes technical accuracy check
□ Passes vibe coder readability check
```

---

**End of Pipeline Document**

Use this system to consistently produce world-class security content that ranks, gets cited, and converts.
