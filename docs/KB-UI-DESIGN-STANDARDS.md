# VibeShip Knowledge Base UI/Design Standards

> **This is the canonical styling guide for all KB articles.**
> When in doubt, reference `src/routes/kb/security/vulnerabilities/sql-injection/+page.svelte` as the gold standard.

---

## Core Design Principles

### 1. Sharp Edges, Not Rounded

VibeShip uses **sharp, terminal-inspired edges** throughout. This is non-negotiable.

```css
/* WRONG - Never use rounded corners on structural elements */
border-radius: 8px;
border-radius: 6px;

/* RIGHT - Sharp edges or minimal rounding on specific elements only */
border-radius: 0;
border-radius: 4px; /* Only for inline code, small badges */
```

**Exception:** Only `<code>` inline elements and small UI elements use minimal 4px radius.

### 2. CSS Variables Only - Never Hardcode Colors

All colors MUST use CSS variables from `static/styles/theme.css`.

```css
/* WRONG - Never hardcode colors */
background: #1a1a1a;
color: #888;
border: 1px solid #333;
background: rgba(34, 197, 94, 0.1);

/* RIGHT - Always use CSS variables */
background: var(--bg-secondary);
color: var(--text-secondary);
border: 1px solid var(--border);
background: var(--bg-secondary); /* For tinted backgrounds, use component classes */
```

### 3. Use Global Component Classes

Use existing classes from `static/styles/components.css` and `static/styles/layout.css` instead of recreating them.

### 4. No Hover Underlines

Links and interactive elements should NEVER use `text-decoration: underline` on hover. Use color or opacity changes instead.

```css
/* WRONG - Never underline on hover */
a:hover {
  text-decoration: underline;
}

/* RIGHT - Use color transitions */
a:hover {
  color: var(--green);
}

/* RIGHT - Cards use border transitions */
.card-interactive:hover {
  border-color: var(--green-dim);
}
```

### 5. Branding Consistency

Always use correct brand capitalization:
- **VibeShip** - Capital V, capital S (never "Vibeship", "vibeship", "VIBESHIP")
- **VibeShip Scanner** - Product name, always capitalized
- **vibe coding** / **vibe coders** - lowercase when describing the practice/people

---

## Available CSS Variables

### Backgrounds
| Variable | Light Mode | Dark Mode | Usage |
|----------|------------|-----------|-------|
| `--bg-primary` | #e8e8e8 | #0e1016 | Page background |
| `--bg-secondary` | #dedede | #151820 | Cards, sections |
| `--bg-tertiary` | #d4d4d4 | #1c202a | Elevated elements |
| `--bg-inverse` | #0e1016 | #ffffff | Inverted backgrounds |

### Text
| Variable | Light Mode | Dark Mode | Usage |
|----------|------------|-----------|-------|
| `--text-primary` | #1a1a1a | #e2e4e9 | Headlines, important text |
| `--text-secondary` | #3d3d3d | #9aa3b5 | Body text, paragraphs |
| `--text-tertiary` | #5a5a5a | #6b7489 | Labels, meta info |

### Borders
| Variable | Light Mode | Dark Mode | Usage |
|----------|------------|-----------|-------|
| `--border` | #c8c8c8 | #2a3042 | Standard borders |
| `--border-strong` | #a8a8a8 | #3d4558 | Emphasized borders |

### Accent Colors
| Variable | Value | Usage |
|----------|-------|-------|
| `--green` | #2ECC71 | Success, fixed, terminal green |
| `--green-dim` | varies | Links, accents (readable on both themes) |
| `--green-muted` | #5a8a6e / #6b9b7a | Table highlights, non-link green accents |
| `--orange` | varies | Warnings, pending |
| `--red` | #FF4D4D | Errors, critical, vulnerabilities |
| `--blue` | #3399FF | Info, general (avoid for tool brand colors) |
| `--violet` | #9D8CFF | Analytics, special (avoid for tool brand colors) |
| `--pink` | #FF66C4 | High priority (avoid for tool brand colors) |

---

## Required Article Structure

Every KB article MUST follow this structure:

```svelte
<script lang="ts">
  import { Header } from '$lib/components/layout';

  const breadcrumbs = [
    { label: 'Knowledge Base', href: '/kb' },
    { label: 'Category', href: '/kb/category' },
    { label: 'Article Title' }
  ];
</script>

<Header {breadcrumbs} />

<div class="content-wrapper">
  <article class="content-main content-wide">
    <!-- Article content here -->
  </article>
</div>
```

### Layout Classes

| Class | Width | Usage |
|-------|-------|-------|
| `.content-wrapper` | max-width: 1400px | Outer container |
| `.content-main` | max-width: 800px | Standard articles |
| `.content-wide` | max-width: 1000px | Wide articles (add to content-main) |

**IMPORTANT:** Never override `.content-wrapper` in scoped styles. Use the global layout classes.

---

## Component Patterns

### 1. Article Header

```svelte
<header class="article-header">
  <div class="badge-row">
    <span class="badge badge-critical">Critical</span>
    <span class="badge">CWE-89</span>
  </div>
  <h1>Article Title</h1>
  <p class="text-secondary">Subtitle/description</p>
</header>
```

**Scoped styles needed:**
```css
.badge-row {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}
```

### 2. Quick Answer Box

Use the global `.quick-answer` class:

```svelte
<div class="quick-answer">
  <div class="quick-answer-label">Quick Answer</div>
  <p class="quick-answer-text">
    <strong>Direct answer here.</strong>
    Additional context with <a href="#">links</a>.
  </p>
</div>
```

**DO NOT** recreate with scoped styles like:
```css
/* WRONG - Don't do this */
.quick-answer {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, ...);
  border-radius: 8px;
}
```

### 3. Stats Row

```svelte
<div class="stats-row">
  <div class="stat-box">
    <div class="stat-value">#3</div>
    <div class="stat-label">OWASP Ranking</div>
  </div>
  <!-- More stat-box items -->
</div>
```

### 4. Badges

Use existing badge classes from components.css:

```svelte
<span class="badge">Default</span>
<span class="badge badge-critical">Critical</span>
<span class="badge badge-high">High</span>
<span class="badge badge-medium">Medium</span>
<span class="badge badge-low">Low</span>
<span class="badge badge-info">Info</span>
```

**For custom badge colors (like "Comparison" or "Stack Guide"):**
```css
.badge-comparison {
  border-color: var(--blue);
  color: var(--blue);
  background: transparent;
}

.badge-stack {
  border-color: var(--violet);
  color: var(--violet);
  background: transparent;
}
```

### 5. Code Blocks

Use the global `.code-block` class:

```svelte
<div class="code-block">
  <div class="code-block-header">
    <span class="code-block-lang">javascript</span>
    <button class="copy-btn">Copy</button>
  </div>
  <pre><code>// Your code here</code></pre>
</div>
```

### 6. Code Comparison (Before/After)

```svelte
<div class="code-comparison">
  <div class="code-block vulnerable">
    <div class="code-label">Vulnerable</div>
    <pre><code>// Bad code</code></pre>
  </div>
  <div class="code-block secure">
    <div class="code-label">Secure</div>
    <pre><code>// Good code</code></pre>
  </div>
</div>
```

**Scoped styles needed:**
```css
/* IMPORTANT: Always use stacked layout, NEVER side-by-side columns */
/* Side-by-side makes code hard to read with scrollbars */
.code-comparison {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1.5rem 0;
}

.code-block.vulnerable {
  border-left: 3px solid var(--red);
}

.code-block.secure {
  border-left: 3px solid var(--green);
}

.code-label {
  padding: 0.5rem 1rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border);
}

.vulnerable .code-label {
  color: var(--red);
}

.secure .code-label {
  color: var(--green);
}
```

### 7. FAQ Section

Use the global `.faq-list` and `.faq-item` classes from `components.css`:

```svelte
<section class="article-section">
  <h2>Frequently Asked Questions</h2>
  <div class="faq-list">
    {#each faqs as faq}
      <div class="faq-item">
        <h3>{faq.question}</h3>
        <p>{faq.answer}</p>
      </div>
    {/each}
  </div>
</section>
```

**No scoped styles needed** - this is now a global component.

**Reference:** See `src/routes/kb/security/vulnerabilities/sql-injection/+page.svelte` for the canonical FAQ pattern.

### 8. Final CTA / Scanner Promo

Use the global `.final-cta` class from `components.css`:

```svelte
<div class="final-cta">
  <h2>Find these before an attacker does</h2>
  <p>Too many incidents start with "we thought our code was fine."</p>
  <a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">
    Scan your code now
  </a>
</div>
```

**No scoped styles needed** - this is now a global component.

### 9. Related Content Grid

Use the global `.related-grid` and `.related-card` classes from `components.css`:

```svelte
<section class="article-section">
  <h2>Related content</h2>
  <div class="related-grid">
    <a href="/kb/..." class="card card-interactive related-card">
      <div class="related-card-category">Category</div>
      <div class="related-card-title">Article Title</div>
      <p class="related-card-description">Brief description of the linked content.</p>
    </a>
  </div>
</section>
```

**IMPORTANT structure rules:**
- Use `<div>` for category and title (NOT `<span>` or `<h3>`)
- Use `<p>` for description
- Always include `card card-interactive related-card` classes on the anchor
- Always include a description paragraph
- Wrap in `<section class="article-section">`

**No scoped styles needed** - these are now global components in `components.css`.

### 10. Comparison Article Pattern

For tool comparison articles (e.g., "Cursor vs Copilot"), use a **neutral color palette**. Avoid tool brand colors entirely - they create visual noise and can be inaccurate (many tools don't use the colors we assume).

```svelte
<div class="agent-card">
  <h3>Tool A</h3>
  <p>Description...</p>
</div>

<div class="agent-card">
  <h3>Tool B</h3>
  <p>Description...</p>
</div>
```

**Scoped styles for comparison cards (NEUTRAL):**
```css
.agent-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  padding: 1.5rem;
}

.agent-card h3 {
  color: var(--text-primary);  /* NOT tool brand colors */
}

/* Recommendations - subtle, text only */
.recommendation {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  background: var(--bg-tertiary);
  color: var(--text-secondary);
}

/* Winner highlights - use muted green, not link green */
.comparison-table td.highlight-win {
  color: var(--green-muted);  /* NOT var(--green) */
  font-weight: 500;
}
```

**Key rules for comparison articles:**
- **NO tool brand colors** - Most tools use blue anyway, and we were using wrong colors
- Use `var(--text-primary)` for all headings
- Use `var(--bg-secondary)` and `var(--bg-tertiary)` for backgrounds
- Use `var(--border-strong)` for callout left-borders (not colored accents)
- Use `var(--green-muted)` for table winner highlights (not bright `var(--green)`)
- Recommendation badges use `var(--bg-tertiary)` background, `var(--text-secondary)` text
- Keep the focus on content, not color-coding

**Exception: Warning/Security sections may use `var(--orange)` left-border (it's a semantic warning color, not a brand color)**

### 11. Tables

Wrap tables in `.table-wrapper` for mobile scroll:

```svelte
<div class="table-wrapper">
  <table>
    <thead>
      <tr>
        <th>Header 1</th>
        <th>Header 2</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Data 1</td>
        <td>Data 2</td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## Typography

### Fonts
- **Headings:** 'Instrument Serif', Georgia, serif
- **Body:** 'Inter', system-ui, sans-serif
- **Code/Labels:** 'JetBrains Mono', 'SF Mono', Consolas, monospace

### Heading Sizes (Desktop)
| Element | Size | Weight |
|---------|------|--------|
| h1 | 2.5rem | 400 |
| h2 | 1.875rem | 400 |
| h3 | 1.5rem | 400 |
| h4 | 1.25rem | 400 |

### Text Colors
- **Primary text (headings, important):** `var(--text-primary)`
- **Body text (paragraphs):** `var(--text-secondary)`
- **Meta/labels:** `var(--text-tertiary)`
- **Links:** `var(--green-dim)`

---

## What NOT to Do

### 1. Don't Override Global Layout

```css
/* WRONG */
.content-wrapper {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
}
```

Use the global classes instead.

### 2. Don't Use Gradients for Backgrounds

```css
/* WRONG */
background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, ...);

/* RIGHT */
background: var(--bg-secondary);
```

### 3. Don't Use Rounded Corners on Cards/Sections

```css
/* WRONG */
border-radius: 8px;

/* RIGHT - Sharp edges */
/* No border-radius property, or 0 */
```

### 4. Don't Create Fallback Variables

```css
/* WRONG */
color: var(--text-secondary, #888);
background: var(--surface-1, #1a1a1a);

/* RIGHT - Trust the theme variables */
color: var(--text-secondary);
background: var(--bg-secondary);
```

The fallbacks indicate you're not using our design system.

### 5. Don't Recreate Component Styles

If components.css has a class, use it. Don't redefine:
- `.badge`
- `.quick-answer`
- `.code-block`
- `.card`
- `.stat-box`
- `.related-grid`
- `.faq-list`, `.faq-item`

### 6. Don't Use Hardcoded Brand Colors

```css
/* WRONG - Hardcoded hex values */
color: #06b6d4;  /* cyan */
color: #ec4899;  /* pink */
color: #f97316;  /* orange */
border: 1px solid rgba(236, 72, 153, 0.3);

/* RIGHT - Use CSS variables */
color: var(--blue);
color: var(--pink);
color: var(--orange);
border-left: 3px solid var(--pink);
```

Even for tool-specific branding (Lovable pink, Bolt orange), use CSS variables.

---

## Scoped Styles Budget

**Target: Under 150 lines of scoped styles per article.**

Only add scoped styles for:
1. **Custom badge variants** (e.g., `.badge-comparison`, `.badge-stack`)
2. **Article-specific layouts** (e.g., security comparison cards)
3. **Code comparison styles** if not using global patterns
4. **FAQ list styling**

Everything else should use global classes.

---

## Mobile Responsiveness

All components have mobile styles in the global CSS. Don't override unless necessary.

Key breakpoints:
- **768px:** Mobile breakpoint (sidebar hides, grids stack)
- **480px:** Small mobile (further typography reduction)
- **1200px:** TOC sidebar hides

---

## Checklist Before Publishing

### Structure
- [ ] Uses `Header` component with proper breadcrumbs
- [ ] Uses `.content-wrapper > article.content-main.content-wide` structure
- [ ] Scoped styles under 150 lines
- [ ] No recreated component classes

### Branding
- [ ] "VibeShip" capitalized correctly (capital V, capital S)
- [ ] No instances of "Vibeship" or "vibeship" for brand name

### Colors & Styling
- [ ] All colors use CSS variables (no hex codes)
- [ ] No `border-radius: 8px` or rounded corners on containers
- [ ] No hover underlines on any interactive elements

### Components
- [ ] Quick answer uses global `.quick-answer` class
- [ ] Stats use global `.stat-box` within `.stats-row`
- [ ] Code blocks use global `.code-block` patterns
- [ ] Tables wrapped in `.table-wrapper`
- [ ] FAQs use `.faq-list` and `.faq-item` classes
- [ ] Related content uses exact structure:
  - `<section class="article-section">`
  - `<div class="related-grid">`
  - `<a class="card card-interactive related-card">`
  - `<div class="related-card-category">` (not `<span>`)
  - `<div class="related-card-title">` (not `<h3>`)
  - `<p class="related-card-description">`

### Responsive
- [ ] Mobile responsive (test at 768px and 480px)
- [ ] No horizontal overflow on mobile
- [ ] Touch targets at least 44x44px

---

## Reference Articles

### Gold Standard (Copy This Pattern)
- `src/routes/kb/security/vulnerabilities/sql-injection/+page.svelte` - Security article template
- `src/routes/kb/security/stacks/nextjs-supabase/+page.svelte` - **Best example for related content pattern**
- `src/routes/kb/prompts/cursor-rules-examples/+page.svelte` - Prompts article template

### Comparison Articles (Copy This Pattern)
- `src/routes/kb/vibe-coding-tools/windsurf-vs-cursor/+page.svelte` - Tool comparison with pricing grids
- `src/routes/kb/vibe-coding-tools/lovable-vs-bolt/+page.svelte` - Tool comparison with integration cards
- `src/routes/kb/vibe-coding-tools/cursor-vs-copilot/+page.svelte` - Tool comparison with security focus

### Previously Fixed (Now Compliant)
- `src/routes/kb/security/stacks/sveltekit-supabase/+page.svelte` - Fixed: removed rounded corners, gradients, hardcoded colors

---

## Quick Reference Card

```
BRANDING:
  VibeShip (capital V, capital S) - never "Vibeship"
  VibeShip Scanner - product name
  vibe coding / vibe coders - lowercase

COLORS:
  Background: var(--bg-primary), var(--bg-secondary), var(--bg-tertiary)
  Text: var(--text-primary), var(--text-secondary), var(--text-tertiary)
  Borders: var(--border), var(--border-strong)
  Accents: var(--green), var(--green-dim), var(--red), var(--orange), var(--blue)

STRUCTURE:
  <Header {breadcrumbs} />
  <div class="content-wrapper">
    <article class="content-main content-wide">
      ...
    </article>
  </div>

COMPONENTS:
  .quick-answer (with .quick-answer-label, .quick-answer-text)
  .stats-row > .stat-box > .stat-value + .stat-label
  .badge, .badge-critical, .badge-high, etc.
  .code-block > .code-block-header + pre > code
  .related-grid > a.card.card-interactive.related-card
  .faq-list > .faq-item
  .table-wrapper > table

RELATED CONTENT (exact structure):
  <section class="article-section">
    <h2>Related content</h2>
    <div class="related-grid">
      <a href="..." class="card card-interactive related-card">
        <div class="related-card-category">Category</div>
        <div class="related-card-title">Title</div>
        <p class="related-card-description">Description</p>
      </a>
    </div>
  </section>

HOVER STATES:
  NO text-decoration: underline
  Links: color transitions only
  Cards: border-color transitions via .card-interactive

SHARP EDGES:
  border-radius: 0; (or omit property)
  Only code elements get border-radius: 4px;
```
