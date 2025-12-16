# Vibeship Design System - Complete Design Tokens

**Source:** Extracted from [vibeship-scanner repository](https://github.com/vibeforge1111/vibeship-scanner)

This document contains all CSS variables, design tokens, spacing values, colors, typography, and component patterns from the vibeship-scanner codebase for reuse in the vibeship-knowledgebase project.

---

## Table of Contents

1. [Color System](#color-system)
2. [Typography](#typography)
3. [Spacing & Layout](#spacing--layout)
4. [Component Patterns](#component-patterns)
5. [CSS Variables Reference](#css-variables-reference)
6. [Utility Classes](#utility-classes)

---

## Color System

### Light Theme (Default)

**Backgrounds - Pure Monochrome**
```css
--bg-primary: #ffffff;
--bg-secondary: #f8f8f8;
--bg-tertiary: #f0f0f0;
--bg-inverse: #000000;
```

**Text - High Contrast Monochrome**
```css
--text-primary: #000000;
--text-secondary: #4a4a4a;
--text-tertiary: #6b6b6b;
--text-inverse: #ffffff;
--text-inverse-secondary: #b0b0b0;
```

**Borders**
```css
--border: #e0e0e0;
--border-strong: #c0c0c0;
```

**Accent Colors - Vibeship Palette**
```css
--green: #2ECC71;        /* Terminal Green - success/fixed */
--green-dim: #00C49A;    /* Vibe Teal - primary accent */
--orange: #FFB020;       /* Compile Amber - warning/running */
--orange-dim: #d97706;
--red: #FF4D4D;          /* Debug Red - error/critical */
--blue: #3399FF;         /* Docker Blue - general */
--violet: #9D8CFF;       /* Syntax Violet - analytics */
--pink: #FF66C4;         /* Hot Pink - high priority */
```

**Gray Scale**
```css
--gray-100: #f8f8f8;
--gray-200: #f0f0f0;
--gray-300: #e0e0e0;
--gray-400: #c0c0c0;
--gray-500: #9a9a9a;
--gray-600: #6b6b6b;
--gray-700: #4a4a4a;
--gray-800: #2a2a2a;
--gray-900: #1a1a1a;
```

**Logo**
```css
--logo-invert: 0;
```

---

### Dark Theme

**Backgrounds - Bluish Black Tones**
```css
--bg-primary: #0e1016;
--bg-secondary: #151820;
--bg-tertiary: #1c202a;
--bg-inverse: #ffffff;
```

**Text - Softer, Easier on Eyes**
```css
--text-primary: #e2e4e9;
--text-secondary: #9aa3b5;
--text-tertiary: #6b7489;
--text-inverse: #0c0e14;
--text-inverse-secondary: #4a4a4a;
```

**Borders - More Visible**
```css
--border: #2a3042;
--border-strong: #3d4558;
```

**Accent Colors - Vibeship Palette** (Same as Light Theme)
```css
--green: #2ECC71;
--green-dim: #00C49A;
--orange: #FFB020;
--orange-dim: #d97706;
--red: #FF4D4D;
--blue: #3399FF;
--violet: #9D8CFF;
--pink: #FF66C4;
```

**Gray Scale - Bluish Tints**
```css
--gray-100: #0f1218;
--gray-200: #181c25;
--gray-300: #2a3142;
--gray-400: #3d4559;
--gray-500: #5a6478;
--gray-600: #8892a6;
--gray-700: #b8c0d0;
--gray-800: #dce1eb;
--gray-900: #f0f2f5;
```

**Logo**
```css
--logo-invert: 1;
```

---

## Typography

### Font Families

**Primary Fonts**
```css
/* Serif for headings */
font-family: 'Instrument Serif', Georgia, serif;

/* Sans-serif for body */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Monospace for code */
font-family: 'JetBrains Mono', 'SF Mono', monospace;
```

**Font Import (Google Fonts)**
```
JetBrains Mono: weights 400, 500, 600
Instrument Serif: italic variations
Inter: weights 400, 500, 600
```

**Preconnect URLs:**
- `https://fonts.googleapis.com`
- `https://fonts.gstatic.com`

### Font Sizes

**Base Size**
```css
html {
  font-size: 14px;
}
```

**Component Sizes**
- Page title: `2rem` (28px)
- Header title: `1.35rem` (18.9px)
- Sidebar title: `0.9rem` (12.6px)
- Section labels: `0.7rem` (9.8px, uppercase)
- Code inline: `0.85em`

### Typography Utilities

```css
.font-serif {
  font-family: 'Instrument Serif', Georgia, serif;
}

.font-mono {
  font-family: 'JetBrains Mono', 'SF Mono', monospace;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Instrument Serif', Georgia, serif;
  font-weight: 400;
}

code {
  font-family: 'JetBrains Mono', monospace;
  background: var(--bg-tertiary);
  padding: 0.1rem 0.3rem;
  font-size: 0.85em;
}
```

---

## Spacing & Layout

### Layout Structure

**Master Layout Pattern: Fixed Sidebar + Flexible Main Content**

**Sidebar Configuration**
```css
width: 260px;
position: fixed;
left: 0;
height: 100vh;
z-index: 100;
background: var(--bg-secondary);
```

**Main Content Area**
```css
margin-left: 260px;
width: calc(100% - 260px);
display: flex;
flex-direction: column;
min-height: 100vh;
```

**Container Widths**
```css
max-width: 1400px;
margin: 0 auto;
```

### Spacing Tokens

**Vertical Spacing**
- Sidebar logo area: `80px`
- Header bar: `60px`
- Section margins: `2rem`
- Content padding: `2rem`
- Item padding: `0.75rem`

**Gaps & Intervals**
- Logo gap: `0.25rem`
- Navigation gap: `0.75rem`
- Header actions gap: `1rem`
- Section spacing: `2rem`

### Responsive Behavior

**Mobile (≤768px)**
```css
/* Sidebar transforms to off-canvas drawer */
transform: translateX(-100%);
transition: transform 0.3s;

/* Main content expands to full width */
margin-left: 0;
width: 100%;
```

---

## Component Patterns

### Buttons

**Base Button**
```css
.btn {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid var(--border);
  background: var(--bg-primary);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s;
}
```

**Button Variants**
- `.btn-outline` - Outlined button
- `.btn-green` - Green accent button
- `.btn-glow` - Button with glow effect

**Button Sizes**
- `.btn-sm` - Small button
- `.btn-lg` - Large button

### Cards & Panels

**Card**
```css
.card {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1.5rem;
}
```

**Card Variants**
- `.card-interactive` - Hoverable card
- `.card-dark` - Dark background card

**Panel**
```css
.panel {
  background: var(--bg-primary);
  border: 1px solid var(--border);
}
```

**Panel Components**
- `.panel-header` - Panel header section
- `.panel-dark` - Dark panel variant

### Status Badges

**Badge Variants**
- **Agent Active** - Pulsing green indicator
- **Human Assigned** - Yellow indicator
- **Ready for Review** - Primary color
- **Error/Escalation** - Red indicator

```css
.status {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.85rem;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 0.5rem;
}
```

### Forms

**Form Group**
```css
.form-group {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.form-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: var(--bg-primary);
  color: var(--text-primary);
}
```

**Form Elements**
- `.form-select` - Dropdown selectors
- `.form-textarea` - Multi-line input
- `.form-hint` - Help text

### Modals & Overlays

**Modal Overlay**
```css
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}
```

**Modal Types**
- `.drawer` - Side panel drawer
- `.modal-center` - Centered modal dialog

**Modal Components**
- `.modal-header` - Modal header
- `.modal-body` - Modal content
- `.modal-footer` - Modal actions

### Toast Notifications

```css
.toast {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  transform: translateY(100px);
  opacity: 0;
  transition: all 0.3s;
}

.toast.active {
  transform: translateY(0);
  opacity: 1;
}
```

### Agent UI Components

**Terminal-style Log Display**
```css
.agent-log {
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 1rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
}

.log-entry {
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
}
```

**Typing Indicator**
```css
.typing {
  display: inline-flex;
  gap: 4px;
}

@keyframes typing-dot {
  0%, 60%, 100% { opacity: 0.3; }
  30% { opacity: 1; }
}
```

### Avatars

**Avatar Sizes**
- `.avatar-sm` - Small avatar
- `.avatar-md` - Medium avatar (default)
- `.avatar-lg` - Large avatar
- `.avatar-xl` - Extra large avatar

**Avatar Gradient Colors**
- `.avatar-violet` - Violet gradient
- `.avatar-blue` - Blue gradient
- `.avatar-teal` - Teal gradient
- `.avatar-pink` - Pink gradient
- `.avatar-amber` - Amber gradient
- `.avatar-green` - Green gradient

---

## CSS Variables Reference

### Complete Variable List

```css
/* Light Theme */
:root, [data-theme="light"] {
  /* Backgrounds */
  --bg-primary: #ffffff;
  --bg-secondary: #f8f8f8;
  --bg-tertiary: #f0f0f0;
  --bg-inverse: #000000;

  /* Text */
  --text-primary: #000000;
  --text-secondary: #4a4a4a;
  --text-tertiary: #6b6b6b;
  --text-inverse: #ffffff;
  --text-inverse-secondary: #b0b0b0;

  /* Borders */
  --border: #e0e0e0;
  --border-strong: #c0c0c0;

  /* Accents */
  --green: #2ECC71;
  --green-dim: #00C49A;
  --orange: #FFB020;
  --orange-dim: #d97706;
  --red: #FF4D4D;
  --blue: #3399FF;
  --violet: #9D8CFF;
  --pink: #FF66C4;

  /* Grays */
  --gray-100: #f8f8f8;
  --gray-200: #f0f0f0;
  --gray-300: #e0e0e0;
  --gray-400: #c0c0c0;
  --gray-500: #9a9a9a;
  --gray-600: #6b6b6b;
  --gray-700: #4a4a4a;
  --gray-800: #2a2a2a;
  --gray-900: #1a1a1a;

  /* Logo */
  --logo-invert: 0;
}

/* Dark Theme */
[data-theme="dark"] {
  /* Backgrounds */
  --bg-primary: #0e1016;
  --bg-secondary: #151820;
  --bg-tertiary: #1c202a;
  --bg-inverse: #ffffff;

  /* Text */
  --text-primary: #e2e4e9;
  --text-secondary: #9aa3b5;
  --text-tertiary: #6b7489;
  --text-inverse: #0c0e14;
  --text-inverse-secondary: #4a4a4a;

  /* Borders */
  --border: #2a3042;
  --border-strong: #3d4558;

  /* Accents (same as light) */
  --green: #2ECC71;
  --green-dim: #00C49A;
  --orange: #FFB020;
  --orange-dim: #d97706;
  --red: #FF4D4D;
  --blue: #3399FF;
  --violet: #9D8CFF;
  --pink: #FF66C4;

  /* Grays */
  --gray-100: #0f1218;
  --gray-200: #181c25;
  --gray-300: #2a3142;
  --gray-400: #3d4559;
  --gray-500: #5a6478;
  --gray-600: #8892a6;
  --gray-700: #b8c0d0;
  --gray-800: #dce1eb;
  --gray-900: #f0f2f5;

  /* Logo */
  --logo-invert: 1;
}
```

---

## Utility Classes

### Text Colors

```css
.text-primary { color: var(--text-primary); }
.text-secondary { color: var(--text-secondary); }
.text-tertiary { color: var(--text-tertiary); }
.text-green { color: var(--green); }
.text-red { color: var(--red); }
.text-orange { color: var(--orange); }
.text-blue { color: var(--blue); }
.text-violet { color: var(--violet); }
.text-pink { color: var(--pink); }
```

### Background Colors

```css
.bg-primary { background: var(--bg-primary); }
.bg-secondary { background: var(--bg-secondary); }
.bg-tertiary { background: var(--bg-tertiary); }
.bg-green { background: var(--green); }
.bg-red { background: var(--red); }
.bg-orange { background: var(--orange); }
.bg-blue { background: var(--blue); }
```

### Spacing Utilities

**Gap Utilities**
```css
.gap-1 { gap: 0.25rem; }  /* 3.5px */
.gap-2 { gap: 0.5rem; }   /* 7px */
.gap-3 { gap: 0.75rem; }  /* 10.5px */
.gap-4 { gap: 1rem; }     /* 14px */
.gap-6 { gap: 1.5rem; }   /* 21px */
.gap-8 { gap: 2rem; }     /* 28px */
```

**Padding Utilities**
```css
.p-2 { padding: 0.5rem; }
.p-4 { padding: 1rem; }
.p-6 { padding: 1.5rem; }
.p-8 { padding: 2rem; }
```

**Margin Utilities**
```css
.mt-2 { margin-top: 0.5rem; }
.mt-4 { margin-top: 1rem; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-4 { margin-bottom: 1rem; }
```

### Flexbox Utilities

```css
.flex { display: flex; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.justify-center { justify-content: center; }
```

---

## Animation Keyframes

### Pulsing Animation

```css
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

### Typing Indicator

```css
@keyframes typing-dot {
  0%, 60%, 100% {
    opacity: 0.3;
  }
  30% {
    opacity: 1;
  }
}
```

---

## Scrollbar Styling

```css
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: var(--bg-secondary);
}

::-webkit-scrollbar-thumb {
  background: var(--gray-400);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--gray-500);
}
```

---

## Base Reset Styles

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 14px;
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  transition: background-color 0.3s, color 0.3s;
}

::selection {
  background: var(--text-primary);
  color: var(--bg-primary);
}
```

---

## Semantic Color Meanings

The Vibeship color palette uses semantic meanings for each accent color:

| Color | Hex Code | Semantic Use |
|-------|----------|--------------|
| **Green** | `#2ECC71` | Terminal Green - success/fixed states |
| **Vibe Teal** | `#00C49A` | Primary accent brand color |
| **Orange** | `#FFB020` | Compile Amber - warning/running states |
| **Red** | `#FF4D4D` | Debug Red - error/critical states |
| **Blue** | `#3399FF` | Docker Blue - general information |
| **Violet** | `#9D8CFF` | Syntax Violet - analytics/data |
| **Pink** | `#FF66C4` | Hot Pink - high priority items |

---

## Implementation Notes

### File Structure

The original vibeship-scanner repository uses this CSS file structure:

1. **`static/styles/theme.css`** (4,316 bytes) - CSS variables, color themes, typography, base reset
2. **`static/styles/components.css`** (19,501 bytes) - All component styles, buttons, cards, forms, modals
3. **`static/styles/layout.css`** (4,095 bytes) - Layout system, sidebar, main content, responsive

**Total:** ~27.9 KB of CSS

### Referenced in App Template

```html
<!-- static/styles/theme.css -->
<link rel="stylesheet" href="%sveltekit.assets%/styles/theme.css">

<!-- static/styles/components.css -->
<link rel="stylesheet" href="%sveltekit.assets%/styles/components.css">
```

### Google Fonts Import

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

---

## Usage in Vibeship Knowledge Base

To use these design tokens in the vibeship-knowledgebase project:

1. **Copy the CSS files** from the scanner repository
2. **Place in** `static/styles/` directory
3. **Reference in** `src/app.html`
4. **Use CSS variables** throughout components
5. **Follow component patterns** for consistent UI

### Example Component Using Tokens

```svelte
<script>
  // Component logic
</script>

<div class="card card-interactive">
  <h2 class="font-serif">SQL Injection</h2>
  <p class="text-secondary">
    Learn how SQL injection vulnerabilities work and how to prevent them.
  </p>
  <div class="flex gap-2 mt-4">
    <span class="status">
      <span class="status-dot" style="background: var(--red);"></span>
      Critical
    </span>
    <button class="btn btn-green">Scan for SQL Injection</button>
  </div>
</div>

<style>
  /* Component-specific overrides if needed */
</style>
```

---

## Cross-Reference

**Related Files:**
- Source repository: `https://github.com/vibeforge1111/vibeship-scanner`
- Theme CSS: `static/styles/theme.css`
- Components CSS: `static/styles/components.css`
- Layout CSS: `static/styles/layout.css`
- App template: `src/app.html`

**Implementation Strategy:**
- See: `vibeship scanner/vibeship-knowledge-base-implementation.md`
- See: `CLAUDE.md` in this repository

---

**Last Updated:** 2025-12-16
**Extracted By:** Claude Code
**Source Commit:** Latest from main branch
