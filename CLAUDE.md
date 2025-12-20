# CLAUDE.md - Vibeship Knowledge Base

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

### 1. Vibe Coding Terms (SEO)
Use "vibe coding", "vibe coders", "vibe coded" 3-5x per article.

### 2. Data Integrity
NEVER invent stats. Cite real sources with links. Use "Data coming soon" if unavailable.

### 3. Scanning Tools
Use **opengrep** (not semgrep), also trivy and gitleaks.

### 4. Design System (NON-NEGOTIABLE)
- **Sharp edges** - No `border-radius: 8px` on containers
- **CSS variables only** - Never hardcode colors
- **Use global classes** - Don't recreate `.badge`, `.quick-answer`, `.faq-list`, `.card`
- **Neutral comparison articles** - No tool brand colors (blue, violet, pink)
- **Under 150 lines** of scoped CSS per article

---

## Workflow

### Starting from Zero
```
1. Read ENHANCED-PIPELINE.md
2. Check QUEUE.md for next article
3. Follow Phase 1 → 2 → 3
4. Read KB-UI-DESIGN-STANDARDS.md before Phase 3 styling
5. QA against all checklists
```

### Editing Existing Article
```
1. Read KB-UI-DESIGN-STANDARDS.md
2. Check components.css for global classes
3. Make changes using CSS variables only
4. Verify mobile responsive
```

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
