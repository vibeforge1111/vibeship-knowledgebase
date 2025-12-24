# CLAUDE.md - VibeShip Knowledge Base

## Memory (Mind)

**ALWAYS call `mind_recall()` before first response.**

Log during work: `decision`, `learning`, `problem`, `progress` → MEMORY.md | `experience`, `blocker`, `rejected` → SESSION.md

---

## ⛔ STOP: PRE-FLIGHT CHECKLIST

**Before writing ANY KB article, complete ALL items. No exceptions.**

```
☐ 1. Read ENHANCED-PIPELINE.md (3-phase process)
☐ 2. Check/create brief in docs/.content-ops/briefs/
☐ 3. Select persona from content-humanizer-guide.md
☐ 4. Read KB-UI-DESIGN-STANDARDS.md
☐ 5. Review components.css for global classes
☐ 6. Open reference article (sql-injection/+page.svelte)
```

**If you skip ANY step, STOP and go back. Skipping causes rework.**

---

## MANDATORY: Read Before Writing

**Before creating or editing ANY KB content, you MUST read the relevant docs.**

### Content Pipeline (ALWAYS USE)

| Doc | When to Read | Purpose |
|-----|--------------|---------|
| `docs/.content-ops/ENHANCED-PIPELINE.md` | **ALWAYS - START HERE** | Full 3-phase pipeline with skills, personas, QA |
| `docs/.content-ops/QUEUE.md` | Starting new article | What to write next |
| `docs/.content-ops/briefs/` | Before writing | Research data for each article |

### Design & Styling (MANDATORY)

| Doc | When to Read | Purpose |
|-----|--------------|---------|
| `docs/KB-UI-DESIGN-STANDARDS.md` | **ANY article styling** | CSS variables, components, patterns |
| `static/styles/components.css` | Before adding styles | Global classes to USE, not recreate |
| `static/styles/theme.css` | Color questions | All CSS variables defined here |

### Reference Article

**Copy structure from:** `src/routes/kb/security/vulnerabilities/sql-injection/+page.svelte`

---

## Development

```bash
npm run dev    # Start dev server
npm run build  # Production build
```

**Stack:** SvelteKit 2.0, TypeScript, Railway

---

## Critical Rules (Memorize)

### 1. Branding (ALWAYS)
- **VibeShip** - Capital V, capital S (never "Vibeship", "vibeship", "VIBESHIP")
- **VibeShip Scanner** - Product name, always capitalized
- **vibe coding/vibe coders** - lowercase when describing the practice/people

### 2. Vibe Coding Terms (SEO)
Use "vibe coding", "vibe coders", "vibe coded" 3-5x per article.

### 3. Data Integrity
NEVER invent stats. Cite real sources with links. Use "Data coming soon" if unavailable.

### 4. Scanning Tools
Use **opengrep** (not semgrep), also trivy and gitleaks.

### 5. Design System (NON-NEGOTIABLE)

**YOU MUST USE GLOBAL CLASSES. DO NOT RECREATE THEM.**

#### Global Classes to USE (from components.css):
```
.badge, .badge-critical, .badge-high, .badge-medium, .badge-low, .badge-info
.stat-box, .stat-value, .stat-label
.code-block, .code-block-header, .code-block-lang
.copy-btn, .copy-btn.copied
.fix-prompt, .fix-prompt-header, .fix-prompt-label, .fix-prompt-content
.faq-list, .faq-item
.card, .card-interactive
.related-grid, .related-card, .related-card-category, .related-card-title
.alert, .alert-warning, .alert-danger, .alert-success, .alert-info
.cta-box
.final-cta
.btn, .btn-green, .btn-outline
```

#### ❌ FORBIDDEN (Automatic QA Fail):

| Violation | Example | Why It's Wrong |
|-----------|---------|----------------|
| **border-radius: 8px+** | `border-radius: 8px` | Sharp edges only. Max 4px. |
| **Gradient backgrounds** | `background: linear-gradient(...)` | Never on badges/cards. Flat colors only. |
| **Hardcoded colors** | `#1a1a1a`, `#f8fafc` | Use `var(--bg-primary)`, `var(--text-secondary)` |
| **Custom badge styles** | `.badge-library { background: ... }` | Use `.badge` + `.badge-info` or similar |
| **Custom code blocks** | `.code-header { ... }` | Use `.code-block-header` from components.css |
| **Missing copy buttons** | Code blocks without copy | Always include `.copy-btn` |
| **Recreating global classes** | `.my-stat-card { ... }` | Use `.stat-box` instead |
| **Side-by-side code comparison** | `grid-template-columns: 1fr 1fr` | Stack vertically (vulnerable on top, secure below) |

#### ✅ CORRECT Patterns:

**Badge (use global):**
```svelte
<span class="badge badge-info">Category</span>
```

**Stat Box (use global):**
```svelte
<div class="stat-box">
  <div class="stat-value">50+</div>
  <div class="stat-label">Prompts</div>
</div>
```

**Code Block with Copy (use global):**
```svelte
<div class="code-block">
  <div class="code-block-header">
    <span class="code-block-lang">JavaScript</span>
    <button class="copy-btn" on:click={() => copyCode('code-id')}>Copy</button>
  </div>
  <pre><code>// code here</code></pre>
</div>
```

**Fix Prompt (use global):**
```svelte
<div class="fix-prompt">
  <div class="fix-prompt-header">
    <span class="fix-prompt-label">AI Fix Prompt</span>
    <button class="copy-btn">Copy</button>
  </div>
  <div class="fix-prompt-content">Prompt text here</div>
</div>
```

#### Style Budget:
- **Under 100 lines** of scoped CSS per article (aim for 50-75)
- If you need more, you're probably recreating global classes

---

## Workflow

### MANDATORY: Do NOT Skip Steps

**Every article requires these 3 phases. No exceptions.**

```
PHASE 1: RESEARCH (Never skip)
├── Check QUEUE.md for next article
├── Create Content Brief OR verify existing brief in briefs/
├── Get keyword volumes from Ahrefs MCP
├── Identify competitor gaps
└── Define unique angle

PHASE 2: PERSONA (Never skip)
├── Select persona from 14 options (see content-humanizer-guide.md)
├── Check rotation (avoid same persona twice in category)
├── Generate opening hook in their voice
├── Identify 2-3 signature move moments
└── Create voice notes for Phase 3

PHASE 3: WRITE + QA (Never ship without QA)
├── Write with persona lens applied
├── Read KB-UI-DESIGN-STANDARDS.md
├── Use global CSS classes from components.css
├── Run QA checklist (qa-checklist.md)
├── Score Value Assessment (min 20/25 to publish)
└── Verify persona voice consistency throughout
```

### The 14 Personas (Quick Reference)

| Category | Personas |
|----------|----------|
| **Vulnerabilities** | @pager_duty (Firefighter), @flaggedthis (Auditor), @eli5sec (Translator), @breachlore (Historian) |
| **Prompts/Tools** | @keystrokecounts (Optimizer), @tryhard_tk (Tinkerer), @deletedmost (Minimalist) |
| **Guides/Stacks** | @ninascales (Architect), @pat_ships (Pragmatist), @danawhy (Debugger), @samexplains (Mentor) |
| **Vibe Coding** | @vibecheckpassed (Evangelist), @waitwhat_ (Skeptic), @buildermagic (Builder) |

Full profiles: `docs/.content-ops/guides/content-humanizer-guide.md`

### If You're About to Write Without Phase 1 + 2, STOP

Going straight to writing = bland, same-voice articles that don't stand out.

**The persona makes the content feel human. The research makes it authoritative. The QA makes it publishable.**

---

## Quick Reference

### Article Structure
```svelte
<script lang="ts">
  import { Header } from '$lib/components/layout';
  const breadcrumbs = [...];
</script>

<Header {breadcrumbs} />

<div class="content-wrapper">
  <article class="content-main content-wide">
    <!-- content -->
  </article>
</div>
```

### CSS Variables
```css
--bg-primary, --bg-secondary, --bg-tertiary
--text-primary, --text-secondary, --text-tertiary
--border, --border-strong
--green, --green-dim, --green-muted
--red, --orange, --blue, --violet
```

### Global Classes (USE THESE)
`.badge` `.quick-answer` `.stats-row` `.faq-list` `.faq-item` `.card` `.card-interactive` `.related-grid` `.comparison-table`

---

## File Locations

| Type | Path |
|------|------|
| Articles | `src/routes/kb/**/*.svelte` |
| Components | `src/lib/components/` |
| Styles | `static/styles/` |
| Pipeline | `docs/.content-ops/ENHANCED-PIPELINE.md` |
| Design Guide | `docs/KB-UI-DESIGN-STANDARDS.md` |
| Briefs | `docs/.content-ops/briefs/` |

---

## ⛔ MANDATORY QA BEFORE COMMIT

**NEVER commit an article without running QA. This is non-negotiable.**

### Quick Design Audit (Check Every Article)

```
☐ NO border-radius: 8px anywhere (search your CSS)
☐ NO linear-gradient() anywhere (search your CSS)
☐ NO hardcoded hex colors (#xxx) (search your CSS)
☐ NO custom badge/stat/code classes (compare to components.css)
☐ YES copy buttons on all code blocks
☐ YES uses .code-block, .stat-box, .faq-list from global CSS
☐ Under 100 lines scoped CSS
```

### Full QA Checklist

Run `docs/.content-ops/checklists/qa-checklist.md` before publishing.

**Minimum Value Score: 20/25 to publish.**

---

## ⚠️ CRITICAL: QA Agent/Skill Requirements

**When running QA on security content, you MUST use the proper skills and checklists. This is NON-NEGOTIABLE.**

### Required QA Resources

| Resource | Path | Purpose |
|----------|------|---------|
| **Security Writer Skill** | `docs/vibeship-security-writer/SKILL.md` | Full skill for security content QA |
| **Writer Agent Prompt** | `docs/.content-ops/strategies/VIBESHIP-SECURITY-WRITER-AGENT-PROMPT.md` | Complete agent prompt with quality checklist |
| **QA Checklist** | `docs/.content-ops/checklists/qa-checklist.md` | 5-section checklist with Value Score |
| **Enhanced Pipeline** | `docs/.content-ops/ENHANCED-PIPELINE.md` | Phase 3 QA checklists |

### The 5 QA Checks (Phase 3)

```
1. SEO Validation (SEO Skill)
   ├── Title under 60 chars with primary keyword
   ├── Meta description 150-160 chars with CTA
   ├── Primary keyword in first 100 words
   ├── 5-10 internal links with descriptive anchors
   └── FAQ targets PAA questions

2. LLM Citation Check (Content Strategy Skill)
   ├── Each section 75-225 words (extractable)
   ├── Sections are self-contained (can be quoted alone)
   ├── Facts have attribution + links
   └── First sentence answers implied question

3. Technical Accuracy (Domain Skill)
   ├── CWE/OWASP references correct
   ├── Code examples compile/run
   ├── Security advice is current best practice
   └── Statistics have sources

4. Humanizer Check
   ├── No AI tells (Furthermore, It's important to note)
   ├── Varied sentence structure
   ├── Persona voice consistent throughout
   └── Opening hook lands in first 50 words

5. Design System Check (MANDATORY)
   ├── Uses CSS variables only (NO hardcoded colors)
   ├── Sharp edges (NO border-radius: 8px)
   ├── Uses global components (.badge, .faq-list, .card)
   ├── Under 150 lines of scoped CSS
   └── Code comparisons stacked vertically (NOT side-by-side)
```

### ❌ WRONG: Using Just Code Review for Content QA

```
# WRONG - code-reviewer doesn't know content requirements
Task(subagent_type="superpowers:code-reviewer", ...)
```

### ✅ RIGHT: Using Security Writer Skill + QA Checklist

```
# RIGHT - references correct skills and checklists
Task(subagent_type="general-purpose", prompt="""
  Read these files first:
  1. docs/vibeship-security-writer/SKILL.md
  2. docs/.content-ops/checklists/qa-checklist.md
  3. docs/.content-ops/ENHANCED-PIPELINE.md (Phase 3 section)

  Then run all 5 QA checks...
""")
```

### Value Score System (Gate for Publishing)

| Dimension | Score 1-5 | What It Measures |
|-----------|-----------|------------------|
| Actionability | /5 | Can they fix this in 10 mins? |
| Clarity | /5 | Would a non-technical founder get it? |
| Specificity | /5 | Framework-specific, not generic? |
| Completeness | /5 | All they need in one place? |
| Uniqueness | /5 | Better than what's out there? |
| **TOTAL** | **/25** | **Minimum 20 to publish** |

**If score < 20, DO NOT PUBLISH. Fix weak dimensions first.**

---

**REMEMBER: If you're about to write content without reading ENHANCED-PIPELINE.md and KB-UI-DESIGN-STANDARDS.md first, STOP and read them.**
