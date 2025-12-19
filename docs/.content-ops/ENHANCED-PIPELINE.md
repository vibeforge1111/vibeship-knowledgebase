# Enhanced Content Pipeline with Spawner Skills

**Version:** 3.0
**Last Updated:** December 2024
**Purpose:** World-class vibe coding content using skill-based automation

---

## Overview

This pipeline enhances the existing 3-agent system with Spawner skills, creating a skill-combo approach for each content type. The goal: **useful, shareable, educational, viral, SEO/LLM friendly content**.

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                         ENHANCED PIPELINE v3.0                                   │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│  PHASE 1: DISCOVERY + RESEARCH                                                  │
│  ┌────────────────────────────────────────────────────────────────────────────┐ │
│  │ Ahrefs MCP → Content Strategy → SEO → Domain Skill                         │ │
│  │                                                                             │ │
│  │ Output: Content Brief with real keyword data, competitor gaps, strategy    │ │
│  └────────────────────────────────────────────────────────────────────────────┘ │
│                                        ↓                                         │
│  PHASE 2: PERSONALITY + WRITING                                                 │
│  ┌────────────────────────────────────────────────────────────────────────────┐ │
│  │ Persona Selection → Blog Writing → Copywriting → Domain Skill              │ │
│  │                                                                             │ │
│  │ Output: Human-feeling content with assigned persona voice                  │ │
│  └────────────────────────────────────────────────────────────────────────────┘ │
│                                        ↓                                         │
│  PHASE 3: QA + POLISH                                                           │
│  ┌────────────────────────────────────────────────────────────────────────────┐ │
│  │ SEO Validation → LLM Citation Check → Technical Accuracy → Humanizer       │ │
│  │                                                                             │ │
│  │ Output: Publication-ready content passing all quality gates                │ │
│  └────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## Phase 1: Discovery + Research

### Purpose
Gather real data, understand the opportunity, create a comprehensive brief.

### Skill Combos by Content Type

| Content Type | Primary Skills | Supporting Skills | MCP Tools |
|--------------|---------------|-------------------|-----------|
| **Security/Vulnerabilities** | Cybersecurity, Security | Content Strategy, SEO | Ahrefs (keywords, SERP) |
| **Tool Comparisons** | Content Strategy, SEO | Developer Communications | Ahrefs (competitor analysis) |
| **Prompts/Rules** | Developer Communications | Copywriting | Ahrefs (keywords) |
| **Guides/Tutorials** | Developer Communications | Content Strategy | Ahrefs (keywords, SERP) |
| **Vibe Coding (general)** | Vibe Coding Skill (local) | Content Strategy, SEO | Ahrefs (full suite) |

### Ahrefs MCP Integration

**Always use these tools in Phase 1:**

```
1. keywords-explorer-overview
   - Get search volume, difficulty, intent for target keywords
   - Input: keywords, country="us"

2. keywords-explorer-matching-terms
   - Find related keywords and long-tail opportunities
   - Input: keywords, country="us", limit=20

3. serp-overview-serp-overview
   - Analyze current top 10 results
   - Input: keyword, country="us"

4. site-explorer-organic-competitors
   - Find who ranks for similar content
   - Input: target domain, country="us"
```

### Phase 1 Output: Enhanced Brief

```markdown
# Content Brief: [Topic]

## Keyword Data (Ahrefs)
| Keyword | Volume | KD | Intent | Our Angle |
|---------|--------|-----|--------|-----------|
| [primary] | X,XXX | XX | Info | [unique angle] |
| [secondary] | XXX | XX | Info | [supporting] |

## SERP Analysis
- **Current #1:** [URL] - [what they do well/miss]
- **Current #2:** [URL] - [what they do well/miss]
- **Gap Opportunity:** [what we can do better]

## Content Strategy
- **Hook:** [first 50 words approach]
- **Unique Data:** [what only we have]
- **CTA:** [what we want readers to do]

## Domain-Specific Requirements
[From Cybersecurity/Vibe Coding/other domain skill]
```

---

## Phase 2: Personality + Writing

### Purpose
Transform briefs into human-feeling content with consistent voice.

### The 14 Personas (From PIPELINE.md)

| Category | Personas | Best For |
|----------|----------|----------|
| **Vulnerabilities** | @pager_duty, @flaggedthis, @eli5sec, @breachlore | Security content |
| **Prompts & Tools** | @keystrokecounts, @tryhard_tk, @deletedmost | Optimization content |
| **Guides & Stacks** | @ninascales, @pat_ships, @danawhy, @samexplains | Educational content |
| **Vibe Coding** | @vibecheckpassed, @waitwhat_, @buildermagic | Vibe coding content |

### Skill Combos by Content Type

| Content Type | Writing Skills | Voice Skills | Domain Skill |
|--------------|---------------|--------------|--------------|
| **Security** | Blog Writing | Copywriting | Cybersecurity + Vibe Coding |
| **Tools** | Blog Writing, Developer Communications | Copywriting | Vibe Coding |
| **Prompts** | Developer Communications | Copywriting | Vibe Coding |
| **Guides** | Blog Writing, Developer Communications | Copywriting, UX Design | Vibe Coding |

### Persona Selection Matrix

```
IF topic.urgency == HIGH:
    → @pager_duty (Firefighter)
IF topic.needs_simplification:
    → @eli5sec (Translator)
IF topic.is_comparison:
    → @keystrokecounts (Optimizer)
IF topic.is_tutorial:
    → @buildermagic (Builder)
IF topic.needs_skepticism:
    → @waitwhat_ (Skeptic)
IF topic.is_architecture:
    → @ninascales (Architect)
DEFAULT:
    → @samexplains (Mentor)
```

### Phase 2 Output: Persona Packet

```markdown
# Persona Packet: [Topic]

## Selected Persona: @[handle]
**Voice:** [description]
**Signature Moves:** [3 techniques]

## Opening Hook (Ready to Use)
[50-word hook in persona voice]

## Section Voice Notes
- **What Is It:** [voice guidance]
- **Why It Matters:** [voice guidance]
- **How to Fix:** [voice guidance]

## Signature Move Moments
1. [Section] → Use [technique]
2. [Section] → Use [technique]
```

---

## Phase 3: QA + Polish

### Purpose
Validate content meets all quality standards before publication.

### QA Checklist (Skill-Based)

#### SEO Validation (SEO Skill)
```
□ Title under 60 chars with primary keyword
□ Meta description 150-160 chars with CTA
□ Primary keyword in first 100 words
□ Primary keyword in at least one H2
□ 5-10 internal links with descriptive anchors
□ 1-2 external authority links (OWASP, CWE, etc.)
□ FAQ targets PAA questions from Ahrefs
```

#### LLM Citation Check (Content Strategy Skill)
```
□ Each section 75-225 words (extractable)
□ Sections are self-contained (can be quoted alone)
□ Facts have attribution + links
□ FAQ answers start with direct answer
□ Specific numbers, not vague claims
□ First sentence of each section answers implied question
```

#### Technical Accuracy (Domain Skill)
```
□ CWE/OWASP references correct
□ Code examples compile/run
□ Security advice is current best practice
□ Links are valid
□ Statistics have sources
```

#### Humanizer Check (content-humanizer-guide.md)
```
□ No AI tells (Furthermore, It's important to note, etc.)
□ Varied sentence structure
□ Persona voice consistent throughout
□ Signature moves used at key moments
□ Opening hook lands in first 50 words
```

### Automated Validation Prompts

#### SEO Check Prompt
```
Review this article for SEO compliance:

[PASTE ARTICLE]

Check against these requirements:
1. Title under 60 chars?
2. Meta description 150-160 chars?
3. Primary keyword "[KEYWORD]" in first 100 words?
4. Internal links count (need 5-10)?
5. External authority links present?

Output: Pass/Fail for each with specific fixes needed.
```

#### LLM Citation Test Prompt
```
Pretend you are an AI assistant. A user asks: "[MAIN QUERY]"

Using ONLY this article as your source, write your response:
[PASTE ARTICLE]

Then answer:
1. What facts would you cite?
2. What attribution would you give?
3. Is any section NOT quotable on its own? Which?
4. What's missing that would make this more citable?
```

#### Humanizer Check Prompt
```
Check this article for AI writing patterns:

[PASTE ARTICLE]

Look for:
1. Overused transitions (Furthermore, Moreover, Additionally)
2. Hedge words (It's worth noting, One might argue)
3. Redundant phrases (In order to, Due to the fact that)
4. Missing personality/voice
5. Walls of text without breaks

Output specific fixes for each issue found.
```

---

## Content Type Workflows

### Workflow A: Security Vulnerability Article

```
PHASE 1: Discovery
├── Ahrefs: keywords-explorer-overview("[vuln] in ai code")
├── Ahrefs: serp-overview-serp-overview("[vuln]")
├── Skills: Cybersecurity + Content Strategy + SEO
├── Check: docs/.content-ops/briefs/[vuln]-brief.md exists?
└── Output: Enhanced brief with keyword data

PHASE 2: Writing
├── Persona: Select from Vulnerabilities category
├── Skills: Blog Writing + Copywriting + Vibe Coding
├── Template: Use vulnerability-brief.md structure
├── Include: AI fix prompt (200-400 words)
└── Output: Full article with persona voice

PHASE 3: QA
├── SEO: Run SEO validation prompt
├── LLM: Run citation test prompt
├── Technical: Verify CWE/OWASP accuracy
├── Humanizer: Check for AI patterns
└── Output: Publication-ready Svelte component
```

### Workflow B: Tool Comparison Article

```
PHASE 1: Discovery
├── Ahrefs: keywords-explorer-overview("[tool1] vs [tool2]")
├── Ahrefs: site-explorer-organic-competitors
├── Skills: Content Strategy + SEO + Developer Communications
├── Check: docs/.content-ops/briefs/[comparison]-brief.md
└── Output: Brief with feature matrix data

PHASE 2: Writing
├── Persona: @keystrokecounts (Optimizer) or @tryhard_tk (Tinkerer)
├── Skills: Blog Writing + Developer Communications + Vibe Coding
├── Include: Decision matrix, recommendation
└── Output: Comparison article with clear winner

PHASE 3: QA
├── SEO: Validate comparison keywords
├── LLM: Test "which is better" query citation
├── Technical: Verify tool features are accurate
├── Humanizer: Check for bland comparison language
└── Output: Publication-ready component
```

### Workflow C: Prompt/Rules Article

```
PHASE 1: Discovery
├── Ahrefs: keywords-explorer-overview("[tool] rules")
├── Skills: Developer Communications + Vibe Coding
├── Research: Best practices from tool docs
└── Output: Brief with prompt examples

PHASE 2: Writing
├── Persona: @deletedmost (Minimalist) or @keystrokecounts (Optimizer)
├── Skills: Developer Communications + Copywriting + Vibe Coding
├── Include: Copy-paste ready prompts
└── Output: Practical prompts article

PHASE 3: QA
├── SEO: Validate prompt keywords
├── Technical: Test prompts actually work
├── Format: Ensure code blocks are copy-pasteable
└── Output: Publication-ready component
```

### Workflow D: Guide/Tutorial Article

```
PHASE 1: Discovery
├── Ahrefs: keywords-explorer-matching-terms("how to [topic]")
├── Skills: Content Strategy + Developer Communications + Vibe Coding
├── Research: Step-by-step requirements
└── Output: Tutorial brief with learning objectives

PHASE 2: Writing
├── Persona: @samexplains (Mentor) or @buildermagic (Builder)
├── Skills: Blog Writing + Developer Communications + Vibe Coding
├── Include: Screenshots/code at each step
└── Output: Complete tutorial

PHASE 3: QA
├── SEO: Validate tutorial keywords
├── Technical: Follow tutorial yourself - does it work?
├── Beginner test: Would a non-coder understand?
└── Output: Publication-ready component
```

---

## Skill Loading Protocol

### At Session Start

```
1. Load domain skill(s) needed:
   - Security content → Cybersecurity + Vibe Coding Skill
   - Tools content → Vibe Coding Skill + Developer Communications
   - Prompts content → Developer Communications + Vibe Coding Skill
   - General vibe coding → Vibe Coding Skill

2. Load writing skills:
   - Always: Blog Writing, Copywriting
   - Tutorials: + Developer Communications

3. Load QA references:
   - docs/.content-ops/guides/content-humanizer-guide.md
   - docs/.content-ops/references/seo-llm-guide.md
   - docs/.content-ops/checklists/qa-checklist.md
```

### Spawner Skill Loading

```python
# Load skill combo for security content
spawner_skills(action="get", name="Cybersecurity")
spawner_skills(action="get", name="Blog Writing")
spawner_skills(action="get", name="Copywriting")
spawner_skills(action="get", name="SEO")

# Load local skill
Read("docs/.content-ops/skills/vibe-coding-skill.md")
```

---

## Ahrefs Integration Quick Reference

### Most Used Tools

| Task | Ahrefs Tool | Key Parameters |
|------|------------|----------------|
| Get keyword data | `keywords-explorer-overview` | keywords, country |
| Find related keywords | `keywords-explorer-matching-terms` | keywords, country, limit |
| Analyze SERP | `serp-overview-serp-overview` | keyword, country |
| Find competitors | `site-explorer-organic-competitors` | target, country |
| Check our rankings | `site-explorer-organic-keywords` | target, country |

### Example: Full Keyword Research

```
1. Primary keyword volume:
   mcp__ahrefs__keywords-explorer-overview
   keywords="vibe coding security"
   country="us"

2. Related opportunities:
   mcp__ahrefs__keywords-explorer-matching-terms
   keywords="vibe coding"
   country="us"
   limit=20

3. SERP analysis:
   mcp__ahrefs__serp-overview-serp-overview
   keyword="vibe coding security"
   country="us"
```

---

## Quality Gates

### Gate 1: Brief Complete
- [ ] Has real Ahrefs keyword data
- [ ] Competitor gaps identified
- [ ] Unique angle defined
- [ ] Internal links mapped

### Gate 2: Draft Complete
- [ ] Persona voice consistent
- [ ] All sections complete
- [ ] AI fix prompts tested
- [ ] FAQ answers PAA questions

### Gate 3: QA Passed
- [ ] SEO checklist passed
- [ ] LLM citation test passed
- [ ] Technical accuracy verified
- [ ] Humanizer check passed

### Gate 4: Ready for Publish
- [ ] Svelte component formatted
- [ ] Meta tags set
- [ ] Schema markup added
- [ ] Internal links working

---

## File Locations

| Resource | Path |
|----------|------|
| **Skills** | `docs/.content-ops/skills/` |
| **Briefs** | `docs/.content-ops/briefs/` |
| **Templates** | `docs/.content-ops/templates/` |
| **Guides** | `docs/.content-ops/guides/` |
| **Checklists** | `docs/.content-ops/checklists/` |
| **Queue** | `docs/.content-ops/QUEUE.md` |
| **Original Pipeline** | `docs/.content-ops/PIPELINE.md` |

---

## Quick Start

### Starting a New Article

```
1. Check QUEUE.md for next priority article
2. Run Phase 1:
   - Load domain skills
   - Query Ahrefs for keyword data
   - Create/update brief
3. Run Phase 2:
   - Select persona
   - Load writing skills
   - Write with persona voice
4. Run Phase 3:
   - Run all QA checks
   - Fix issues found
   - Format as Svelte component
5. Commit and push
```

### Prompt to Start

```
I need to create content for [TOPIC] in the vibeship-knowledgebase.

Please:
1. Load the appropriate skills (Vibe Coding Skill + domain skills)
2. Check Ahrefs for keyword data
3. Review or create the content brief
4. Follow the enhanced pipeline for Phase 1 → 2 → 3
5. Output the final Svelte component

Content type: [security/tool/prompt/guide]
```

---

**Pipeline Status:** Production Ready
**Works With:** PIPELINE.md (original 3-agent system), all Spawner skills
