# CLAUDE.md - VibeShip Knowledge Base

## Memory (Mind)

**ALWAYS call `mind_recall()` before first response.**

Log during work: `decision`, `learning`, `problem`, `progress` → MEMORY.md | `experience`, `blocker`, `rejected` → SESSION.md

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

**Stack:** SvelteKit 2.0, TypeScript, Vercel

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
- **Sharp edges** - No `border-radius: 8px` on containers
- **CSS variables only** - Never hardcode colors
- **Use global classes** - Don't recreate `.badge`, `.quick-answer`, `.faq-list`, `.card`
- **Neutral comparison articles** - No tool brand colors (blue, violet, pink)
- **No hover underlines** - Links/buttons use color/opacity changes, not `text-decoration: underline`
- **Under 150 lines** of scoped CSS per article

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

**REMEMBER: If you're about to write content without reading ENHANCED-PIPELINE.md and KB-UI-DESIGN-STANDARDS.md first, STOP and read them.**
