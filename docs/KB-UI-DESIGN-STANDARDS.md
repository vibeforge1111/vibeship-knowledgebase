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
| `--orange` | varies | Warnings, pending |
| `--red` | #FF4D4D | Errors, critical, vulnerabilities |
| `--blue` | #3399FF | Info, general |
| `--violet` | #9D8CFF | Analytics, special |
| `--pink` | #FF66C4 | High priority |

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
.code-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 1.5rem 0;
}

@media (max-width: 768px) {
  .code-comparison {
    grid-template-columns: 1fr;
  }
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

```svelte
<section class="faq-section">
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

**Scoped styles needed:**
```css
.faq-list {
  margin-top: 1rem;
}

.faq-item {
  padding: 1rem 0;
  border-bottom: 1px solid var(--border);
}

.faq-item:last-child {
  border-bottom: none;
}

.faq-item h3 {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.faq-item p {
  margin-bottom: 0;
  color: var(--text-secondary);
}
```

### 8. Related Content Grid

```svelte
<section>
  <h2>Related Content</h2>
  <div class="related-grid">
    <a href="/kb/..." class="card card-interactive">
      <span class="related-card-category">Category</span>
      <h3 class="related-card-title">Article Title</h3>
      <p class="related-card-description">Brief description</p>
    </a>
  </div>
</section>
```

### 9. Tables

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

- [ ] Uses `Header` component with proper breadcrumbs
- [ ] Uses `.content-wrapper > article.content-main.content-wide` structure
- [ ] All colors use CSS variables (no hex codes)
- [ ] No `border-radius: 8px` or rounded corners on containers
- [ ] Quick answer uses global `.quick-answer` class
- [ ] Stats use global `.stat-box` within `.stats-row`
- [ ] Code blocks use global `.code-block` patterns
- [ ] Tables wrapped in `.table-wrapper`
- [ ] Related content uses `.related-grid` with `.card.card-interactive`
- [ ] Scoped styles under 150 lines
- [ ] No recreated component classes
- [ ] Mobile responsive (test at 768px and 480px)

---

## Reference Articles

### Gold Standard (Copy This Pattern)
- `src/routes/kb/security/vulnerabilities/sql-injection/+page.svelte`
- `src/routes/kb/prompts/cursor-rules-examples/+page.svelte`

### Articles Needing Fixes
- `src/routes/kb/vibe-coding-tools/cursor-vs-copilot/+page.svelte` - Uses rounded corners, gradient backgrounds, hardcoded colors
- `src/routes/kb/security/stacks/sveltekit-supabase/+page.svelte` - Uses rounded corners, gradient backgrounds, hardcoded colors

---

## Quick Reference Card

```
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
  .related-grid > a.card.card-interactive
  .table-wrapper > table

SHARP EDGES:
  border-radius: 0; (or omit property)
  Only code elements get border-radius: 4px;
```
