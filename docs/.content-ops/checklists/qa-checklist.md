# Content QA Checklist

Use this checklist before publishing any KB content.

---

## SKILL ROUTING REMINDER

**This checklist is for QA/pre-publish review.** Ensure the content was written using the correct skill:

| Content Type | Correct Writer Skill | Path |
|--------------|---------------------|------|
| **Security** (vulnerabilities, stacks, fixes) | Security Writer Agent | `docs/.content-ops/strategies/VIBESHIP-SECURITY-WRITER-AGENT-PROMPT.md` |
| **Prompts** (cursor rules, CLAUDE.md, AI config) | Master Prompting Skill | `docs/.content-ops/skills/master-prompting-skill.md` |
| **Research** (briefs, data gathering) | Research Agent | `docs/.content-ops/agents/research-agent.md` |

**QA Question:** Was the correct skill used to write this content? If not, rewrite.

---

## Value-Impact Assessment (START HERE)

**This is the most important section.** If an article fails the value test, it doesn't matter if everything else passes.

### The Core Question
After reading this article, will a vibe coder:
- [ ] **Understand** the concept clearly (not just memorize)
- [ ] **Know what to do** within 10 minutes of reading
- [ ] **Feel empowered**, not overwhelmed or dumb
- [ ] **Bookmark it** or share it with other vibe coders

### Value Density Checks

#### Immediate Actionability
- [ ] Copy-paste AI fix prompt that actually works
- [ ] Before/after code they can adapt to their project
- [ ] Detection commands they can run right now
- [ ] Clear "do this first" prioritization

#### Mental Models
- [ ] Real-world analogy that makes it click (hotel key = IDOR, bouncer = auth)
- [ ] "If you remember one thing" summary
- [ ] Clear cause → effect → fix explanation
- [ ] Addresses common misconceptions

#### Time Respect
- [ ] Quick answer in first 50 words (not buried)
- [ ] Can skim headers and get the gist
- [ ] No unnecessary history lessons
- [ ] Practical over theoretical

#### Framework-Specific Value
- [ ] Examples use actual frameworks they use (Next.js, SvelteKit, etc.)
- [ ] Shows the Prisma/Supabase/Drizzle way, not just generic SQL
- [ ] Mentions actual file paths they'd have
- [ ] Calls out framework defaults that help or hurt

### The "Worth Sharing" Test
- [ ] Would a vibe coder share this with a friend building with AI tools?
- [ ] Does this article exist anywhere else? (If yes, what makes ours better?)
- [ ] Would they come back to reference it again?

### Anti-Value Flags (Instant Fail)
- [ ] ❌ Starts with history instead of what they need to know
- [ ] ❌ Unexplained jargon that makes them feel dumb
- [ ] ❌ Generic advice ("always sanitize input") without specific code
- [ ] ❌ Lists every attack variant instead of AI-generated patterns
- [ ] ❌ Academic tone that talks down to them
- [ ] ❌ AI fix prompt that's too vague to actually use

**If any anti-value flag is checked, STOP and fix before continuing.**

---

## Pre-Flight Check

### Content Brief Verified
- [ ] All statistics have sources
- [ ] Keywords have search intent identified
- [ ] Internal links are valid URLs
- [ ] Unique angle is clear
- [ ] No placeholder text (TBD, TODO, etc.)

---

## Structure & Format

### Title & Meta
- [ ] Title under 60 characters
- [ ] Title includes primary keyword in first 4 words
- [ ] Meta description 150-160 characters
- [ ] Meta description includes CTA
- [ ] URL follows structure: `/kb/security/[type]/[slug]/`

### Headings
- [ ] Single H1 matching title intent
- [ ] H2s are question-based where appropriate
- [ ] No skipped heading levels (H1 → H3)
- [ ] Headings create logical outline

### Formatting
- [ ] Code blocks have language specified (```javascript)
- [ ] Tables are properly formatted
- [ ] Lists use consistent formatting
- [ ] No walls of text (max 3-4 sentences per paragraph)

---

## Content Quality

### Opening
- [ ] First 50 words directly answer the main query
- [ ] Quick answer includes key stat
- [ ] Hook makes reader want to continue

### Data & Attribution
- [ ] All statistics have attribution
- [ ] Format: "[X]% of [N] repos (Source, Date)"
- [ ] No made-up or estimated numbers
- [ ] CWE/OWASP references included where applicable

### Writing
- [ ] All jargon explained on first use
- [ ] Real-world analogies for complex concepts
- [ ] No unexplained acronyms
- [ ] Active voice preferred
- [ ] Vibe coder would understand without security background

### Code Examples
- [ ] All examples show BEFORE (vulnerable) and AFTER (secure)
- [ ] Code is syntactically correct
- [ ] Comments explain what's happening
- [ ] Framework-specific where relevant

---

## AI Fix Prompt

- [ ] Length: 200-400 words
- [ ] Specific patterns to search for (not vague)
- [ ] Includes regex or search terms
- [ ] Before/after code for each fix pattern
- [ ] Framework-specific considerations included
- [ ] Verification step at end
- [ ] Works in Cursor, Claude Code, AND Bolt
- [ ] **TESTED on real code** (or marked as untested)

---

## FAQ Section

- [ ] 5 questions included
- [ ] Questions match "People Also Ask" research
- [ ] Each answer 50-100 words
- [ ] First sentence directly answers question (YES/NO/FACT)
- [ ] Each answer includes citable fact with attribution
- [ ] Links to deeper content where relevant
- [ ] No hedging or weasel words

---

## SEO Optimization

### Ahrefs Keyword Verification (MCP)
Before publishing, verify keywords with Ahrefs MCP:
- [ ] Primary keyword has search volume (use `keywords-explorer-overview`)
- [ ] Target keyword volume > 100/month (US)
- [ ] Check related terms for additional H2 opportunities (`keywords-explorer-matching-terms`)
- [ ] Note keyword difficulty if available

**Example Ahrefs check:**
```
mcp__ahrefs__keywords-explorer-overview
  keywords: "your target keyword"
  country: "us"
  select: "keyword,volume,difficulty,traffic_potential"
```

### Keywords
- [ ] Primary keyword in title
- [ ] Primary keyword in first 100 words
- [ ] Primary keyword in at least one H2
- [ ] Secondary keywords appear naturally
- [ ] No keyword stuffing

### Vibe Coding Terminology
- [ ] "Vibe coding/vibe coded/vibe coders" used 3-5 times
- [ ] Mixed with "AI-generated code" for variety
- [ ] Terms appear naturally (not forced)

### Links
- [ ] 5-10 internal links included
- [ ] Links to parent/hub pages
- [ ] Links to related content
- [ ] 1-2 external authority links (OWASP, CWE, docs)
- [ ] All links are valid URLs
- [ ] Anchor text is descriptive (not "click here")

### Technical SEO
- [ ] Alt text for any images
- [ ] Schema markup ready (FAQ, Article, HowTo)
- [ ] Breadcrumb structure defined

---

## LLM Optimization

### Chunk Structure
- [ ] Each H2 section is 75-225 words
- [ ] Sections are self-contained (make sense without context)
- [ ] First sentence of each section answers the H2 question

### Citable Facts
- [ ] Facts are specific, not vague
- [ ] Clear attribution: "According to VibeShip Scanner..."
- [ ] Numbers are precise (23.4%, not "about 25%")
- [ ] Dates included where relevant

### Extraction Test
- [ ] Would ChatGPT cite this for the target query?
- [ ] Facts are easily extractable
- [ ] No important info buried in middle of paragraphs

---

## Design System Compliance (MANDATORY)

**Reference files:**
- `docs/KB-UI-DESIGN-STANDARDS.md` - Full design system documentation
- `static/styles/components.css` - Global component classes
- `static/styles/theme.css` - CSS variables and base styles
- `src/routes/kb/security/stacks/nextjs-supabase/+page.svelte` - Reference implementation

### CSS Variables Only
- [ ] NO hardcoded colors (no `#1a1a1a`, `#f8fafc`, etc.)
- [ ] Uses `var(--bg-primary)`, `var(--bg-secondary)`, `var(--bg-tertiary)` for backgrounds
- [ ] Uses `var(--text-primary)`, `var(--text-secondary)`, `var(--text-tertiary)` for text
- [ ] Uses `var(--border)`, `var(--border-strong)` for borders
- [ ] Uses `var(--green)`, `var(--green-dim)`, `var(--green-muted)` for accents
- [ ] Comparison articles: NO tool brand colors (neutral palette only)

### Global Components (Use These, Don't Reinvent)
- [ ] `.badge` for category/type badges
- [ ] `.quick-answer` for quick answer boxes with green left border
- [ ] `.stats-row` for grid of stats cards
- [ ] `.code-block` for code example containers
- [ ] `.code-comparison` for before/after code
- [ ] `.fix-prompt` for AI fix prompt boxes
- [ ] `.faq-list > .faq-item` for FAQ sections (NOT custom styles)
- [ ] `.related-grid > .card.card-interactive.related-card` for related content

### Related Content Pattern (Exact Structure)
```svelte
<section class="article-section">
  <h2>Related content</h2>
  <div class="related-grid">
    <a href="..." class="card card-interactive related-card">
      <div class="related-card-category">Category</div>
      <div class="related-card-title">Title</div>
      <p class="related-card-description">Description text</p>
    </a>
  </div>
</section>
```
- [ ] Uses `<div>` for category and title (NOT `<span>` or `<h3>`)
- [ ] Has `card card-interactive related-card` classes on anchor
- [ ] Includes description paragraph
- [ ] Section uses `article-section` class

### Layout & Spacing
- [ ] Sharp edges - NO `border-radius: 8px` on containers (0 or 4px max)
- [ ] Consistent spacing using CSS variables or utility classes
- [ ] Under 150 lines of scoped CSS per article
- [ ] No duplicate styles that exist in components.css

### Mobile Responsive
- [ ] Tested at 768px and 480px widths
- [ ] Tables use mobile-friendly stacked layouts OR horizontal scroll
- [ ] No horizontal overflow on mobile
- [ ] Touch targets at least 44x44px
- [ ] `@media (max-width: 768px)` queries for responsive adjustments

### Hover States
- [ ] NO text-decoration: underline on any interactive elements
- [ ] Cards use `.card-interactive` for border-color transition
- [ ] Buttons change background/opacity, not underline

### Branding
- [ ] "VibeShip" always capitalized as "VibeShip" (not "Vibeship", "vibeship", "VIBESHIP")
- [ ] "VibeShip Scanner" - product name, always capitalized
- [ ] "vibe coding" - lowercase when describing the practice
- [ ] "vibe coders" - lowercase when describing people
- [ ] Brand colors only via CSS variables (never hardcoded brand hex codes)

### Typography
- [ ] Headings use `font-family: 'Instrument Serif'` (inherited from theme.css)
- [ ] Body text uses `font-family: 'Inter'` (inherited from theme.css)
- [ ] Code uses `font-family: 'JetBrains Mono'` (inherited from theme.css)
- [ ] NO custom font-family declarations in scoped styles
- [ ] Line heights: headings 1.3, body 1.7 (from theme.css)

### Accessibility
- [ ] Color contrast meets WCAG AA (4.5:1 for text, 3:1 for large text)
- [ ] All images have descriptive alt text
- [ ] Focus states visible on interactive elements
- [ ] Semantic HTML (proper heading hierarchy, landmarks)
- [ ] Links are distinguishable from plain text (color, not just underline)

### Animations & Transitions
- [ ] Transitions use 0.2s-0.3s duration (not too fast, not sluggish)
- [ ] Prefer `transition: border-color 0.2s` for cards
- [ ] Prefer `transition: color 0.2s` for links
- [ ] NO jarring animations (no bouncing, shaking, or excessive movement)
- [ ] Respect `prefers-reduced-motion` if adding custom animations

### Code Block Standards
- [ ] Language specified on all fenced code blocks (```javascript, ```svelte)
- [ ] Uses `.code-block` wrapper for styled code sections
- [ ] Before/after comparisons use `.code-comparison` with `.code-bad` and `.code-good`
- [ ] Syntax highlighting works correctly (check for missing language support)

### Image & Media
- [ ] Images optimized for web (WebP preferred, fallback to PNG/JPG)
- [ ] Images have explicit width/height to prevent layout shift
- [ ] Dark mode compatible (no white backgrounds baked into images)
- [ ] Screenshots use consistent browser chrome or no chrome at all

---

## Technical Accuracy

### Security Claims
- [ ] CWE ID is correct for the vulnerability
- [ ] OWASP category is current (2021 version)
- [ ] Severity rating is appropriate
- [ ] Fix actually prevents the vulnerability
- [ ] No dangerous or outdated recommendations

### Code Accuracy
- [ ] All code examples are syntactically correct
- [ ] Code works with current framework versions
- [ ] Fix patterns match current best practices
- [ ] No deprecated methods recommended

---

## Final Review

### Readability
- [ ] Read aloud - does it flow?
- [ ] Vibe coder audience would understand
- [ ] Not condescending or overly technical
- [ ] Appropriate length for topic complexity

### Completeness
- [ ] All sections from template included
- [ ] No TODO or placeholder text
- [ ] Related content linked
- [ ] Scanner CTA included

### Competitive
- [ ] Better than current top 3 results
- [ ] Unique angle is clear
- [ ] Data advantage highlighted

### Brand Voice
- [ ] Knowledgeable friend, not textbook
- [ ] Direct and actionable
- [ ] Confident but not arrogant
- [ ] Occasionally playful, always professional

---

## Sign-Off

| Check | Initials | Date |
|-------|----------|------|
| Content complete | | |
| Technical review | | |
| SEO review | | |
| Final approval | | |

---

## Quick Reference: Common Issues

### "First 50 words don't answer query"
→ Rewrite opening to lead with the answer, not context

### "Jargon not explained"
→ Add parenthetical: "IDOR (when users access other users' data by changing IDs)"

### "AI fix prompt too vague"
→ Add specific regex patterns, file paths, and real code examples

### "FAQ answers hedged"
→ Start with direct answer: "Yes—" or "No, but—" or the specific fact

### "Missing internal links"
→ Link vulnerability → fixes, tool → vulnerabilities, stack → both

### "Not citable by LLMs"
→ Add "According to VibeShip Scanner (Month Year)..." before key stats

### "Hardcoded colors"
→ Replace `#hex` with CSS variables: `var(--bg-secondary)`, `var(--text-primary)`, etc.

### "Custom related content styles"
→ Delete custom CSS, use global `.related-grid > .card.card-interactive.related-card`

### "Wrong element types in related cards"
→ Use `<div>` for category and title, `<p>` for description - never `<span>` or `<h3>`

### "Hover underlines appearing"
→ Check for inherited styles, add `text-decoration: none` if needed (shouldn't happen with global styles)

### "VibeShip spelled wrong"
→ Always "VibeShip" (capital V, capital S) - not "Vibeship" or "vibeship"

### "Too much scoped CSS"
→ Over 150 lines? Check if global components cover what you need first

---

## Value Score (Final Gate)

Rate each dimension 1-5, then total. **Minimum 20/25 to publish.**

| Dimension | Score (1-5) | Notes |
|-----------|-------------|-------|
| **Actionability** - Can they fix this in 10 mins? | /5 | |
| **Clarity** - Would a non-technical founder get it? | /5 | |
| **Specificity** - Framework-specific, not generic? | /5 | |
| **Completeness** - All they need in one place? | /5 | |
| **Uniqueness** - Better than what's out there? | /5 | |
| **TOTAL** | /25 | Min: 20 |

### Scoring Guide

**5 - Exceptional:** Best resource on the internet for this topic. Vibe coders would pay for this.
**4 - Strong:** Clearly valuable, would bookmark. Minor improvements possible.
**3 - Adequate:** Gets the job done but not remarkable. Likely won't be shared.
**2 - Weak:** Missing key value. Needs significant work before publishing.
**1 - Fail:** Doesn't serve vibe coders. Do not publish.

### Score Interpretation

| Total | Action |
|-------|--------|
| 23-25 | 🟢 Publish immediately |
| 20-22 | 🟢 Publish - minor polish optional |
| 17-19 | 🟡 Revise weak dimensions before publishing |
| 14-16 | 🟠 Major revision needed - don't publish |
| <14 | 🔴 Rewrite from scratch |

### Low Score Recovery

**Actionability low?**
→ Add specific AI fix prompt, grep commands, file paths

**Clarity low?**
→ Add real-world analogy, simplify jargon, test on non-technical reader

**Specificity low?**
→ Add Next.js/SvelteKit/Express code, Prisma/Supabase examples

**Completeness low?**
→ Check competitor content for gaps, add FAQ, related links

**Uniqueness low?**
→ Add Scanner data, AI tool comparison, unique angle from brief
