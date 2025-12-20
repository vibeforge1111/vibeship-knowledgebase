# Vibeship Design System

> **The canonical reference for all UI, design, and styling decisions across Vibeship properties.**
> This document is referenced by CLAUDE.md and must be followed for all frontend work.

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Breakpoints](#breakpoints)
6. [Component Library](#component-library)
7. [Code Patterns](#code-patterns)
8. [Anti-Patterns](#anti-patterns)
9. [Article Templates](#article-templates)
10. [Responsive Design](#responsive-design)
11. [Accessibility](#accessibility)
12. [SEO Requirements](#seo-requirements)
13. [Checklist](#checklist)

---

## Design Philosophy

### Core Principles

1. **Sharp Edges** - Terminal-inspired, brutalist aesthetic. No rounded corners on structural elements.
2. **Monochrome with Accent** - Primarily grayscale with strategic green accents.
3. **Information Density** - Dense, scannable content. No excessive whitespace.
4. **Developer-First** - Feels like a tool, not a marketing site.
5. **Consistency Across Properties** - vibeship.co, scanner.vibeship.co, mind.vibeship.co share the same system.

### Visual Identity

| Attribute | Description |
|-----------|-------------|
| **Mood** | Professional, technical, trustworthy |
| **Style** | Terminal/CLI inspired, sharp edges |
| **Density** | High information density |
| **Animation** | Minimal, functional (hover states only) |
| **Icons** | Monoline, geometric |

### What We Are NOT

- Not bubbly or playful (no rounded corners, bouncy animations)
- Not gradient-heavy (solid colors only)
- Not cluttered (structured information hierarchy)
- Not generic SaaS (distinctive terminal aesthetic)

---

## Color System

### Theme Variables

All colors are defined in `static/styles/theme.css`. Never use hex codes directly.

#### Backgrounds

| Variable | Light Mode | Dark Mode | Usage |
|----------|------------|-----------|-------|
| `--bg-primary` | #e8e8e8 | #0e1016 | Page background |
| `--bg-secondary` | #dedede | #151820 | Cards, sections, elevated surfaces |
| `--bg-tertiary` | #d4d4d4 | #1c202a | Nested elements, code blocks |
| `--bg-inverse` | #0e1016 | #ffffff | Inverted sections |

#### Text

| Variable | Light Mode | Dark Mode | Usage |
|----------|------------|-----------|-------|
| `--text-primary` | #1a1a1a | #e2e4e9 | Headlines, important text |
| `--text-secondary` | #3d3d3d | #9aa3b5 | Body text, paragraphs |
| `--text-tertiary` | #5a5a5a | #6b7489 | Labels, meta info, captions |
| `--text-inverse` | #e8e8e8 | #0c0e14 | Text on inverse backgrounds |

#### Borders

| Variable | Light Mode | Dark Mode | Usage |
|----------|------------|-----------|-------|
| `--border` | #c8c8c8 | #2a3042 | Standard borders |
| `--border-strong` | #a8a8a8 | #3d4558 | Emphasized borders, focus states |

#### Semantic/Accent Colors

| Variable | Value | Usage |
|----------|-------|-------|
| `--green` | #2ECC71 | Success, terminal green, positive states |
| `--green-dim` | varies by theme | Links, accents (readable on both themes) |
| `--red` | #FF4D4D | Errors, critical severity, vulnerabilities |
| `--orange` | varies by theme | Warnings, high severity, pending states |
| `--blue` | #3399FF | Info, general highlights |
| `--violet` | #9D8CFF | Analytics, special features, stack guides |
| `--pink` | #FF66C4 | High priority, attention |

#### Gray Scale

| Variable | Light Mode | Dark Mode |
|----------|------------|-----------|
| `--gray-100` | #e0e0e0 | #0f1218 |
| `--gray-200` | #d4d4d4 | #181c25 |
| `--gray-300` | #c8c8c8 | #2a3142 |
| `--gray-400` | #a8a8a8 | #3d4559 |
| `--gray-500` | #888888 | #5a6478 |
| `--gray-600` | #5a5a5a | #8892a6 |
| `--gray-700` | #3d3d3d | #b8c0d0 |
| `--gray-800` | #2a2a2a | #dce1eb |
| `--gray-900` | #1a1a1a | #f0f2f5 |

### Color Usage Rules

```css
/* ✅ CORRECT - Always use variables */
background: var(--bg-secondary);
color: var(--text-primary);
border: 1px solid var(--border);
color: var(--green-dim);

/* ❌ WRONG - Never hardcode */
background: #1a1a1a;
color: #888;
border: 1px solid #333;
color: #22c55e;

/* ❌ WRONG - No fallback values */
color: var(--text-secondary, #888);
background: var(--surface-1, #1a1a1a);

/* ❌ WRONG - No rgba with hardcoded colors */
border: 1px solid rgba(59, 130, 246, 0.3);
background: rgba(34, 197, 94, 0.1);
```

---

## Typography

### Font Stack

```css
/* Headings - Serif */
font-family: 'Instrument Serif', Georgia, serif;

/* Body - Sans */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Code, Labels, Monospace */
font-family: 'JetBrains Mono', 'SF Mono', Consolas, monospace;
```

### Type Scale

| Element | Size (Desktop) | Size (Mobile) | Weight | Line Height |
|---------|----------------|---------------|--------|-------------|
| h1 | 2.5rem | 1.65rem | 400 | 1.3 |
| h2 | 1.875rem | 1.35rem | 400 | 1.3 |
| h3 | 1.5rem | 1.15rem | 400 | 1.3 |
| h4 | 1.25rem | 1.1rem | 400 | 1.3 |
| body | 1rem | 0.95rem | 400 | 1.7 |
| small | 0.875rem | 0.8rem | 400 | 1.5 |
| label | 0.7rem | 0.65rem | 600 | 1.4 |

### Typography Patterns

```css
/* Labels and badges */
.label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Code inline */
code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9em;
  background: var(--bg-tertiary);
  padding: 0.15rem 0.4rem;
  border-radius: 4px; /* Only exception for border-radius */
}

/* Stat values */
.stat-value {
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.75rem;
  font-weight: 600;
}
```

---

## Spacing & Layout

### Spacing Scale

Based on 4px increments:

| Token | Value | Usage |
|-------|-------|-------|
| xs | 0.25rem (4px) | Tight gaps, icon margins |
| sm | 0.5rem (8px) | Related elements |
| md | 1rem (16px) | Standard spacing |
| lg | 1.5rem (24px) | Section gaps |
| xl | 2rem (32px) | Major sections |
| 2xl | 3rem (48px) | Page sections |

### Layout Classes

```css
/* Main content wrapper */
.content-wrapper {
  max-width: 1400px;
  margin: 0 auto;
}

/* Article content */
.content-main {
  max-width: 800px;  /* Standard width */
  padding: 2.5rem;
}

.content-wide {
  max-width: 1000px;  /* Wide articles */
}
```

### Grid Patterns

```css
/* Stats row */
.stats-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
}

/* Related content */
.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}

/* Code comparison - ALWAYS stacked, NEVER side-by-side */
/* Side-by-side columns make code hard to read with scrollbars */
.code-comparison {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
```

---

## Breakpoints

### Standard Breakpoints (MANDATORY)

Use these breakpoints consistently across all pages. **Do not create custom breakpoints.**

| Breakpoint | Width | Target Devices | Usage |
|------------|-------|----------------|-------|
| Mobile | 480px | Small phones | Typography reduction, single columns |
| Tablet | 768px | Phones, small tablets | Sidebar hides, grids stack, navigation changes |
| Desktop | 1024px | Tablets, small laptops | 4-column → 2-column grids |
| Wide | 1200px | Desktops | TOC sidebar shows, full layouts |

### Implementation

```css
/* Mobile-first approach - base styles are mobile */

/* Tablet and up */
@media (min-width: 768px) {
  .sidebar { display: block; }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .stats-grid { grid-template-columns: repeat(4, 1fr); }
}

/* OR: Desktop-first with max-width */
@media (max-width: 1024px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .sidebar { display: none; }
}

@media (max-width: 480px) {
  body { font-size: 14px; }
}
```

### Common Patterns by Breakpoint

**At 1024px (tablet landscape):**
- 4-column grids → 2-column grids
- Wide comparison tables → scrollable

**At 768px (tablet portrait/mobile):**
- Sidebar hides, mobile menu appears
- 2-column grids → single column
- Code comparisons stack vertically
- Stats row: 4 → 2 columns

**At 480px (small mobile):**
- Base font size reduces (16px → 14px)
- Heading sizes reduce
- Code block font size minimum 12px
- Stats row: 2 → 1 column

### Anti-Pattern: Non-Standard Breakpoints

```css
/* ❌ WRONG - Non-standard breakpoints */
@media (max-width: 640px) { }  /* Use 768px */
@media (max-width: 600px) { }  /* Use 480px */
@media (max-width: 900px) { }  /* Use 1024px */

/* ✅ RIGHT - Standard breakpoints only */
@media (max-width: 480px) { }
@media (max-width: 768px) { }
@media (max-width: 1024px) { }
@media (max-width: 1200px) { }
```

---

## Component Library

### Location

Global styles: `static/styles/`
- `theme.css` - CSS variables, base styles
- `components.css` - Reusable component classes
- `layout.css` - Layout and structure

### Available Components

#### Badges

```html
<span class="badge">Default</span>
<span class="badge badge-critical">Critical</span>
<span class="badge badge-high">High</span>
<span class="badge badge-medium">Medium</span>
<span class="badge badge-low">Low</span>
<span class="badge badge-info">Info</span>
```

Custom badge variants (add in scoped styles):
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

#### Quick Answer Box

```html
<div class="quick-answer">
  <div class="quick-answer-label">Quick Answer</div>
  <p class="quick-answer-text">
    <strong>Direct answer here.</strong>
    Additional context with <a href="#">links</a>.
  </p>
</div>
```

#### Stats Row

```html
<div class="stats-row">
  <div class="stat-box">
    <div class="stat-value">#3</div>
    <div class="stat-label">OWASP Ranking</div>
  </div>
  <div class="stat-box">
    <div class="stat-value critical">Critical</div>
    <div class="stat-label">Severity</div>
  </div>
</div>
```

#### Code Block

```html
<div class="code-block">
  <div class="code-block-header">
    <span class="code-block-lang">javascript</span>
    <button class="copy-btn">Copy</button>
  </div>
  <pre><code>// Your code here</code></pre>
</div>
```

#### Code Comparison (Before/After)

```html
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

Scoped styles needed:
```css
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

.vulnerable .code-label { color: var(--red); }
.secure .code-label { color: var(--green); }
```

#### Alerts

```html
<div class="alert alert-warning">
  <div class="alert-title">Warning</div>
  <p>Alert message here.</p>
</div>
```

Variants: `.alert-warning`, `.alert-danger`, `.alert-success`, `.alert-info`

#### Cards

```html
<a href="/link" class="card card-interactive">
  <span class="related-card-category">Category</span>
  <h3 class="related-card-title">Title</h3>
  <p class="related-card-description">Description</p>
</a>
```

#### Tables

```html
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

#### FAQ Section

Use the global `.faq-list` and `.faq-item` classes. **No scoped styles needed.**

```html
<section class="article-section">
  <h2>Frequently Asked Questions</h2>
  <div class="faq-list">
    <div class="faq-item">
      <h3>Question text here?</h3>
      <p>Answer text here.</p>
    </div>
    <!-- More faq-items -->
  </div>
</section>
```

Reference: `src/routes/kb/security/vulnerabilities/sql-injection/+page.svelte`

#### Final CTA / Scanner Promo

Use the global `.final-cta` class. **No scoped styles needed.**

```html
<div class="final-cta">
  <h2>Find these before an attacker does</h2>
  <p>Too many incidents start with "we thought our code was fine."</p>
  <a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">
    Scan your code now
  </a>
</div>
```

#### Code Comparison (Before/After)

Use the global `.code-comparison` class with `.vulnerable` and `.secure` modifiers.

```html
<div class="code-comparison">
  <div class="code-block vulnerable">
    <div class="code-label">Vulnerable</div>
    <pre><code>// Bad code here</code></pre>
  </div>
  <div class="code-block secure">
    <div class="code-label">Secure</div>
    <pre><code>// Good code here</code></pre>
  </div>
</div>
```

#### Stats Section (4-column grid)

Use `.stats-section` with `.stats-grid` for homepage/hub stats.

```html
<section class="stats-section">
  <div class="stats-grid">
    <div class="stat-box">
      <div class="stat-value">10,000+</div>
      <div class="stat-label">Repos Scanned</div>
    </div>
    <!-- More stat-boxes -->
  </div>
</section>
```

#### Feature Cards Grid

Use `.card-grid` with `.feature-card` for feature/persona grids.

```html
<div class="card-grid">
  <div class="feature-card">
    <div class="feature-card-icon">🔒</div>
    <h3 class="feature-card-title">Security First</h3>
    <p class="feature-card-description">Built with security in mind.</p>
  </div>
  <!-- More feature-cards -->
</div>
```

#### Security Warning Box

Use `.security-box` for security warnings in articles.

```html
<div class="security-box">
  <div class="security-box-title">Security Warning</div>
  <p>This vulnerability can lead to complete database compromise.</p>
</div>
```

#### CTA Box (In-Article)

Use `.cta-box` for in-article call-to-actions.

```html
<div class="cta-box">
  <p><strong>Want to check your code?</strong></p>
  <p>Run our scanner to find these issues automatically.</p>
</div>
```

#### Article Header

Use `.article-header` with `.badge-row` for consistent article headers.

```html
<header class="article-header">
  <div class="badge-row">
    <span class="badge badge-critical">Critical</span>
    <span class="badge">CWE-89</span>
  </div>
  <h1>SQL Injection in Vibe Coded Apps</h1>
  <p class="subtitle">Common in AI-generated code. Here's how to fix it.</p>
</header>
```

#### Article Section

Use `.article-section` for semantic content sections.

```html
<section class="article-section">
  <h2>What is SQL Injection?</h2>
  <p>Content here...</p>
</section>
```

#### Collapsible FAQ

Alternative to `.faq-list` for expandable FAQs:

```html
<div class="faq-collapsible">
  <details>
    <summary>Is SQL injection still a threat in 2025?</summary>
    <div class="faq-answer">
      Yes, it remains in the OWASP Top 10...
    </div>
  </details>
</div>
```

---

## Code Patterns

### Article Page Structure

```svelte
<script lang="ts">
  import { Header } from '$lib/components/layout';

  const breadcrumbs = [
    { label: 'Knowledge Base', href: '/kb' },
    { label: 'Category', href: '/kb/category' },
    { label: 'Article Title' }
  ];
</script>

<svelte:head>
  <title>Page Title | vibeship</title>
  <meta name="description" content="..." />
</svelte:head>

<Header {breadcrumbs} />

<div class="content-wrapper">
  <article class="content-main content-wide">
    <header class="article-header">
      <div class="badge-row">
        <span class="badge badge-critical">Critical</span>
      </div>
      <h1>Article Title</h1>
      <p class="text-secondary">Subtitle</p>
    </header>

    <div class="quick-answer">...</div>
    <div class="stats-row">...</div>

    <section class="article-section">
      <h2>Section Title</h2>
      <p>Content...</p>
    </section>

    <!-- More sections -->

    <section>
      <h2>Related Content</h2>
      <div class="related-grid">...</div>
    </section>
  </article>
</div>

<style>
  /* Only page-specific styles - under 150 lines */
  .badge-row {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-bottom: 1rem;
  }
</style>
```

### Scoped Style Budget

**Target: Under 150 lines of scoped styles per page.**

Only add scoped styles for:
- Custom badge variants
- Article-specific layouts (e.g., comparison grids)
- Page-specific components not in global CSS

---

## Anti-Patterns

### DO NOT DO THESE

#### 1. Rounded Corners on Containers

```css
/* ❌ WRONG */
border-radius: 8px;
border-radius: 6px;

/* ✅ RIGHT - Sharp edges */
/* No border-radius property */
```

**Exception:** Only `<code>` inline elements get `border-radius: 4px`.

#### 2. Hardcoded Colors

```css
/* ❌ WRONG */
background: #1a1a1a;
color: #888;
border-color: #22c55e;

/* ✅ RIGHT */
background: var(--bg-secondary);
color: var(--text-secondary);
border-color: var(--green-dim);
```

#### 3. Gradient Backgrounds

```css
/* ❌ WRONG */
background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, ...);

/* ✅ RIGHT */
background: var(--bg-secondary);
border-left: 3px solid var(--green-dim); /* Use accent borders instead */
```

#### 4. Fallback Variable Values

```css
/* ❌ WRONG - Indicates you're not using the design system */
color: var(--text-secondary, #888);
background: var(--surface-1, #1a1a1a);

/* ✅ RIGHT - Trust the theme variables */
color: var(--text-secondary);
background: var(--bg-secondary);
```

#### 5. Overriding Global Layout

```css
/* ❌ WRONG - Don't override .content-wrapper */
.content-wrapper {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
}

/* ✅ RIGHT - Use existing layout classes */
/* Just use class="content-wrapper" in HTML */
```

#### 6. Recreating Component Styles

```css
/* ❌ WRONG - Don't recreate .badge, .quick-answer, etc. */
.my-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.75rem;
  ...
}

/* ✅ RIGHT - Use existing class */
/* <span class="badge">Text</span> */
```

#### 7. RGBA with Hardcoded Colors

```css
/* ❌ WRONG */
border: 1px solid rgba(59, 130, 246, 0.3);
background: rgba(34, 197, 94, 0.2);

/* ✅ RIGHT */
border: 1px solid var(--border);
border-left: 3px solid var(--green);
background: var(--bg-secondary);
```

---

## Article Templates

### Vulnerability Article

See: `src/routes/kb/security/vulnerabilities/sql-injection/+page.svelte`

Structure:
1. Header with badges (severity, CWE, OWASP)
2. Quick answer box
3. Stats row (OWASP ranking, CWE ID, severity)
4. "What is [vulnerability]?" section
5. "How do AI tools cause [vulnerability]?" section
6. Code comparison (vulnerable vs secure)
7. AI Fix Prompt
8. FAQ section
9. Related content

### Stack Guide Article

See: `src/routes/kb/security/stacks/sveltekit-supabase/+page.svelte`

Structure:
1. Header with badges (Stack Guide, tech names)
2. Quick answer box
3. Stack overview box
4. Known CVEs section
5. Numbered issue sections with code comparisons
6. Security checklist
7. AI Fix Prompt
8. FAQ section
9. Related content

### Comparison Article

See: `src/routes/kb/vibe-coding-tools/cursor-vs-copilot/+page.svelte`

Structure:
1. Header with badges (Comparison, year)
2. Quick answer box
3. Quick comparison table
4. "What is [Tool A]?" section
5. "What is [Tool B]?" section
6. Feature comparison table
7. Pricing comparison table
8. Security comparison (side-by-side cards)
9. "When to choose [Tool A/B]?" sections
10. FAQ section
11. Related content

---

## Responsive Design

### Breakpoints

| Breakpoint | Width | Description |
|------------|-------|-------------|
| Mobile | < 480px | Small phones |
| Mobile | < 768px | Phones, small tablets |
| Tablet | < 1024px | Tablets |
| Desktop | < 1200px | Small desktops |
| Wide | > 1200px | Large desktops |

### Mobile Patterns

```css
@media (max-width: 768px) {
  /* Sidebar hides */
  .main-content { margin-left: 0; }

  /* Grids stack */
  /* Note: .code-comparison uses flex-direction: column always (not grid) */
  .stats-row { grid-template-columns: repeat(2, 1fr); }
  .related-grid { grid-template-columns: 1fr; }

  /* Content tighter */
  .content-main { padding: 1.5rem; }

  /* Typography smaller */
  h1 { font-size: 1.65rem; }
  h2 { font-size: 1.35rem; }
}
```

### Mobile-First Approach

Global CSS is mobile-first. Desktop enhancements added via media queries.

---

## Accessibility

### Requirements

1. **Color contrast** - All text meets WCAG AA (4.5:1 for body, 3:1 for large text)
2. **Focus states** - All interactive elements have visible focus indicators
3. **Keyboard navigation** - All functionality accessible via keyboard
4. **Semantic HTML** - Proper heading hierarchy, landmark regions
5. **Alt text** - All images have descriptive alt text
6. **Touch targets** - Minimum 44x44px for all interactive elements (WCAG 2.1)

### Focus States

```css
/* All interactive elements */
:focus-visible {
  outline: 2px solid var(--green-dim);
  outline-offset: 2px;
}
```

### Touch Target Sizes

All buttons, links, and interactive elements must have minimum 44x44px touch area:

```css
/* ✅ RIGHT - 44px minimum */
.copy-btn {
  min-height: 44px;
  min-width: 44px;
}

.checklist-checkbox {
  min-width: 44px;
  min-height: 44px;
}

/* ❌ WRONG - Too small */
.copy-btn {
  padding: 0.2rem 0.4rem;  /* ~10x20px - too small */
}
```

### Breadcrumb Accessibility

```html
<!-- ✅ RIGHT - Proper ARIA -->
<nav aria-label="Breadcrumb">
  <a href="/kb">Knowledge Base</a>
  <span aria-hidden="true">/</span>
  <span aria-current="page">SQL Injection</span>
</nav>

<!-- ❌ WRONG - Missing ARIA -->
<nav>
  <a href="/kb">Knowledge Base</a>
  <span>/</span>
  <span>SQL Injection</span>
</nav>
```

---

## SEO Requirements

### Meta Tags (Required for All Pages)

Every page MUST have these meta tags in `<svelte:head>`:

```svelte
<svelte:head>
  <!-- Required -->
  <title>Page Title | Vibeship</title>
  <meta name="description" content="Description under 160 chars" />

  <!-- Open Graph (for social sharing) -->
  <meta property="og:title" content="Page Title" />
  <meta property="og:description" content="Description" />
  <meta property="og:url" content="https://vibeship.co{url}" />
  <meta property="og:type" content="article" />
  <meta property="og:image" content="https://vibeship.co/og/{slug}.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content="https://vibeship.co/og/{slug}.png" />

  <!-- Canonical -->
  <link rel="canonical" href="https://vibeship.co{url}" />
</svelte:head>
```

### Title Tag Rules

- **Length**: Under 60 characters (mobile-friendly)
- **Format**: `Keyword First: Descriptive Phrase | Vibeship`
- **Examples**:
  - ✅ "SQL Injection: Find & Fix in AI-Generated Code | Vibeship" (59 chars)
  - ❌ "How to Find and Fix SQL Injection Vulnerabilities in Your AI-Generated Code" (too long)

### Heading Hierarchy (MANDATORY)

Every page must follow strict H1 > H2 > H3 structure:

```html
<!-- ✅ RIGHT - Proper hierarchy -->
<h1>SQL Injection in Vibe Coded Apps</h1>
  <h2>What is SQL injection?</h2>
  <h2>How do AI tools cause this?</h2>
    <h3>The pattern behind most breaches</h3>
  <h2>How do I fix it?</h2>
    <h3>AI Fix Prompt</h3>
    <h3>Manual Fix</h3>

<!-- ❌ WRONG - Skipped levels -->
<h1>Title</h1>
  <h3>Subtitle</h3>  <!-- Skipped h2! -->
```

### Structured Data (JSON-LD)

All article pages must include structured data:

```svelte
{@html `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "${meta.title}",
  "description": "${meta.description}",
  "author": {"@type": "Organization", "name": "Vibeship"},
  "publisher": {"@type": "Organization", "name": "Vibeship"},
  "datePublished": "${meta.datePublished}",
  "dateModified": "${meta.dateModified}"
}
</script>`}
```

### FAQ Schema (for pages with FAQs)

```svelte
{@html `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Question text?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Answer text."
      }
    }
  ]
}
</script>`}
```

### Internal Linking

- **Minimum**: 5-10 internal links per article
- **Anchor text**: Descriptive (not "click here")
- **Link types**: Related vulnerabilities, tools, stack guides
- **External links**: Use authority sources (OWASP, CWE, NVD)

### SEO Checklist

- [ ] Title under 60 chars, keyword first
- [ ] Meta description under 160 chars
- [ ] All OG tags present (og:title, og:description, og:image, og:url)
- [ ] Canonical URL set
- [ ] Single H1 per page
- [ ] No skipped heading levels
- [ ] BreadcrumbList schema
- [ ] TechArticle or appropriate schema
- [ ] FAQPage schema if FAQs present
- [ ] 5+ internal links
- [ ] Alt text on all images

---

## Checklist

### Before Publishing Any Page

- [ ] Uses `Header` component with proper breadcrumbs
- [ ] Uses `.content-wrapper > article.content-main.content-wide` structure
- [ ] All colors use CSS variables (no hex codes)
- [ ] No `border-radius` on containers (only on `<code>`)
- [ ] No gradient backgrounds
- [ ] No fallback values in CSS variables
- [ ] Quick answer uses global `.quick-answer` class
- [ ] Stats use global `.stat-box` within `.stats-row`
- [ ] Code blocks use global `.code-block` patterns
- [ ] Tables wrapped in `.table-wrapper`
- [ ] FAQ sections use global `.faq-list` and `.faq-item` classes
- [ ] Scanner CTA uses global `.final-cta` class
- [ ] Related content uses `.related-grid`
- [ ] Scoped styles under 150 lines
- [ ] No recreated component classes
- [ ] Mobile responsive (test at 768px and 480px)
- [ ] Dark/light theme both work
- [ ] Focus states visible
- [ ] Semantic HTML structure

---

## Quick Reference Card

```
COLORS:
  var(--bg-primary)     var(--bg-secondary)    var(--bg-tertiary)
  var(--text-primary)   var(--text-secondary)  var(--text-tertiary)
  var(--border)         var(--border-strong)
  var(--green)          var(--green-dim)       var(--red)
  var(--orange)         var(--blue)            var(--violet)

STRUCTURE:
  <Header {breadcrumbs} />
  <div class="content-wrapper">
    <article class="content-main content-wide">
      ...
    </article>
  </div>

COMPONENTS:
  .badge .badge-critical .badge-high .badge-medium .badge-low
  .quick-answer > .quick-answer-label + .quick-answer-text
  .stats-row > .stat-box > .stat-value + .stat-label
  .stats-section > .stats-grid (4-column grid)
  .code-block > .code-block-header + pre > code
  .code-comparison > .code-block.vulnerable + .code-block.secure
  .alert .alert-warning .alert-danger .alert-success
  .card .card-interactive
  .card-grid > .feature-card
  .related-grid
  .table-wrapper > table
  .faq-list > .faq-item > h3 + p
  .faq-collapsible > details > summary + .faq-answer
  .final-cta > h2 + p + a.btn
  .article-header > .badge-row + h1 + .subtitle
  .article-section > h2 + content
  .security-box > .security-box-title + p
  .cta-box > p + p

BREAKPOINTS:
  480px  - Small mobile (typography reduction)
  768px  - Tablet (sidebar hides, grids stack)
  1024px - Desktop (4-col grids collapse)
  1200px - Wide (TOC sidebar shows)

TOUCH TARGETS:
  All interactive elements: min 44x44px

FONTS:
  'Instrument Serif' - Headings
  'Inter' - Body
  'JetBrains Mono' - Code, labels

RULES:
  1. Sharp edges (no border-radius on containers)
  2. CSS variables only (no hex colors)
  3. Use global classes (don't recreate)
  4. Under 150 lines scoped styles
  5. No gradients, no rgba with hex
  6. Standard breakpoints only (480, 768, 1024, 1200)
  7. 44px minimum touch targets
```

---

## Version History

| Date | Change |
|------|--------|
| 2025-12-20 | Initial design system documentation |
| 2025-12-20 | Added Breakpoints section with standard 480/768/1024/1200px values |
| 2025-12-20 | Added SEO Requirements section with meta tags, structured data, heading rules |
| 2025-12-20 | Added touch target requirements (44px minimum) to Accessibility |
| 2025-12-20 | Added new global components: code-comparison, stats-section, stats-grid, card-grid, feature-card, article-header, article-section, security-box, cta-box, faq-collapsible |
| 2025-12-20 | Fixed touch target sizes in components.css for copy-btn, checklist-checkbox |

---

## Related Documents

- `docs/KB-UI-DESIGN-STANDARDS.md` - KB-specific article styling
- `static/styles/theme.css` - CSS variables and base styles
- `static/styles/components.css` - Global component classes
- `static/styles/layout.css` - Layout structure
- `src/routes/kb/security/vulnerabilities/sql-injection/+page.svelte` - Gold standard reference
