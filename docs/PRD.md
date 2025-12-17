# VibeShip Knowledge Base
## Complete PRD & Implementation Guide

**Version:** 1.0  
**Last Updated:** December 2024  
**Domain:** vibeship.co/kb/  
**Stack:** SvelteKit + PostgreSQL + Vercel  

---

## Table of Contents

1. [Vision & Goals](#part-1-vision--goals)
2. [Information Architecture](#part-2-information-architecture)
3. [Technical Architecture](#part-3-technical-architecture)
4. [Database Schema](#part-4-database-schema)
5. [Page Templates & Components](#part-5-page-templates--components)
6. [Content System](#part-6-content-system)
7. [SEO Strategy](#part-7-seo-strategy)
8. [LLM Optimization](#part-8-llm-optimization)
9. [User Experience Design](#part-9-user-experience-design)
10. [Content Generation](#part-10-content-generation)
11. [Implementation Roadmap](#part-11-implementation-roadmap)
12. [Success Metrics](#part-12-success-metrics)

---

# Part 1: Vision & Goals

## 1.1 The Mission

Build the definitive knowledge base for AI-generated code security that:

1. **Dominates search** — Rank #1 on Google for every relevant security query
2. **Gets cited by AI** — Become the source ChatGPT, Claude, and Perplexity reference
3. **Converts visitors** — Drive traffic to VibeShip Scanner and other products
4. **Feels different** — Not another boring docs site; built for the vibe coding era

## 1.2 What Makes This Different

| Traditional Knowledge Base | VibeShip Knowledge Base |
|---------------------------|------------------------|
| Static content | Live data from Scanner |
| Technical jargon | Plain English for vibe coders |
| Walls of text | Visual, scannable, interactive |
| "Here's information" | "Here's what to do" (AI fix prompts) |
| Generic advice | Data-driven ("73% of Cursor projects have this") |
| Boring documentation feel | Modern, engaging, game-like elements |

## 1.3 Target Audience

**Primary:** Vibe coders — non-technical founders using AI coding tools (Cursor, Claude Code, Bolt, v0, Replit) who need security help but don't have a security background.

**Secondary:** 
- CTOs/tech leads evaluating AI-generated code
- Security professionals researching AI code patterns
- Developers transitioning to AI-assisted coding

## 1.4 Core Principles

1. **Answer First** — Every page starts with a direct answer (for LLMs and impatient humans)
2. **Show the Data** — Back claims with real numbers from Scanner
3. **Make It Actionable** — Every problem comes with a copy-paste AI fix prompt
4. **Keep It Fresh** — Stats update automatically; content reviewed monthly
5. **Respect Their Time** — Scannable, skimmable, no fluff

---

# Part 2: Information Architecture

## 2.1 Domain Strategy

```
vibeship.co                    ← Main authority hub (ALL educational content)
├── /kb/                       ← Knowledge base
├── /research/                 ← Data & research
├── /blog/                     ← Thought leadership
└── /tools/                    ← Links to product subdomains

scanner.vibeship.co            ← Scanner product (how-to docs only)
mind.vibeship.co               ← Mind product (how-to docs only)
```

**Why centralized:** 
- Consolidates all SEO authority on vibeship.co
- LLMs cite "vibeship.co" as single authority
- All backlinks benefit the entire domain

## 2.2 URL Structure

```
vibeship.co/
│
├── /kb/                                    # Knowledge base root
│   │
│   ├── /kb/vulnerabilities/                # Hub: All vulnerabilities
│   │   ├── /kb/vulnerabilities/sql-injection/
│   │   ├── /kb/vulnerabilities/xss/
│   │   ├── /kb/vulnerabilities/hardcoded-secrets/
│   │   ├── /kb/vulnerabilities/missing-auth/
│   │   ├── /kb/vulnerabilities/idor/
│   │   ├── /kb/vulnerabilities/insecure-cors/
│   │   ├── /kb/vulnerabilities/missing-rate-limiting/
│   │   ├── /kb/vulnerabilities/sensitive-data-exposure/
│   │   └── ...
│   │
│   ├── /kb/vibe-coding-tools/                    # Hub: AI tool patterns (UNIQUE MOAT)
│   │   ├── /kb/vibe-coding-tools/cursor/
│   │   │   ├── /kb/vibe-coding-tools/cursor/sql-injection/
│   │   │   └── /kb/vibe-coding-tools/cursor/missing-auth/
│   │   ├── /kb/vibe-coding-tools/claude-code/
│   │   ├── /kb/vibe-coding-tools/bolt/
│   │   ├── /kb/vibe-coding-tools/v0/
│   │   ├── /kb/vibe-coding-tools/replit/
│   │   ├── /kb/vibe-coding-tools/copilot/
│   │   └── /kb/vibe-coding-tools/windsurf/
│   │
│   ├── /kb/stacks/                         # Hub: Stack-specific guides
│   │   ├── /kb/stacks/nextjs-supabase/
│   │   ├── /kb/stacks/nextjs-prisma/
│   │   ├── /kb/stacks/sveltekit-supabase/
│   │   ├── /kb/stacks/express-postgres/
│   │   ├── /kb/stacks/remix-supabase/
│   │   └── /kb/stacks/nuxt-supabase/
│   │
│   ├── /kb/fixes/                          # Hub: AI-ready fix prompts
│   │   ├── /kb/fixes/sql-injection/
│   │   │   ├── /kb/fixes/sql-injection/nextjs/
│   │   │   ├── /kb/fixes/sql-injection/express/
│   │   │   └── /kb/fixes/sql-injection/sveltekit/
│   │   ├── /kb/fixes/hardcoded-secrets/
│   │   │   ├── /kb/fixes/hardcoded-secrets/stripe/
│   │   │   ├── /kb/fixes/hardcoded-secrets/openai/
│   │   │   └── /kb/fixes/hardcoded-secrets/supabase/
│   │   └── ...
│   │
│   ├── /kb/glossary/                       # Hub: Plain English definitions
│   │   ├── /kb/glossary/vibe-coding/
│   │   ├── /kb/glossary/sql-injection/
│   │   ├── /kb/glossary/authentication/
│   │   ├── /kb/glossary/authorization/
│   │   └── ...
│   │
│   └── /kb/checklists/                     # Hub: Security checklists
│       ├── /kb/checklists/pre-launch/
│       ├── /kb/checklists/supabase/
│       ├── /kb/checklists/nextjs/
│       ├── /kb/checklists/api-security/
│       └── /kb/checklists/vibe-coder/
│
├── /research/                              # Research & data
│   ├── /research/vulnerability-index/      # Weekly Hallucinated Vulnerability Index
│   │   ├── /research/vulnerability-index/latest/
│   │   ├── /research/vulnerability-index/2024-12-16/
│   │   └── ...
│   ├── /research/ai-tool-comparison/       # Tool security comparison
│   └── /research/methodology/              # How we scan
│
├── /blog/                                  # Thought leadership
│   └── /blog/[slug]/
│
├── /tools/                                 # Product directory
│
├── /llms.txt                               # LLM summary export
├── /llms-full.txt                          # Complete LLM export
├── /sitemap.xml                            # Auto-generated
└── /robots.txt                             # Crawler permissions
```

## 2.3 Content Categories

### Category 1: Vulnerabilities (`/kb/vulnerabilities/`)

**Purpose:** Become the Wikipedia of security vulnerabilities for AI-generated code

**Content Focus:**
- What is this vulnerability (plain English)
- Why AI tools cause it
- What could happen (real consequences)
- How to detect it
- How to fix it (AI prompt + manual)
- Stack-specific notes
- FAQ

**Target Queries:**
- "sql injection ai generated code"
- "what is xss"
- "hardcoded api key security"

**Pages to Create (Priority):**

| P0 (Launch) | P1 (Week 2) | P2 (Month 1) |
|-------------|-------------|--------------|
| SQL Injection | Missing Rate Limiting | Open Redirects |
| Hardcoded Secrets | Insecure CORS | CSRF |
| Missing Authentication | Sensitive Data Exposure | File Upload Vulns |
| XSS | Missing HTTPS | Session Fixation |
| IDOR | Weak Passwords | Path Traversal |

---

### Category 2: AI Patterns (`/kb/vibe-coding-tools/`)

**Purpose:** YOUR UNIQUE MOAT. No competitor has this data.

**Content Focus:**
- Overall security score for this AI tool
- Top 10 vulnerabilities this tool generates
- Why this tool makes these mistakes
- Comparison with other tools
- Tool-specific fix strategies

**Target Queries:**
- "is cursor secure"
- "cursor security issues"
- "claude code vulnerabilities"
- "bolt security problems"

**Pages to Create:**

| Tool | Subdomain Pages |
|------|-----------------|
| Cursor | + /cursor/sql-injection/, /cursor/missing-auth/, etc. |
| Claude Code | + tool-specific vulnerability pages |
| Bolt | + tool-specific vulnerability pages |
| v0 | + tool-specific vulnerability pages |
| Replit | + tool-specific vulnerability pages |
| GitHub Copilot | + tool-specific vulnerability pages |
| Windsurf | + tool-specific vulnerability pages |

---

### Category 3: Stacks (`/kb/stacks/`)

**Purpose:** Stack-specific security guides that match how vibe coders build

**Content Focus:**
- Top 5 vulnerabilities for this stack
- Stack-specific security checklist
- Common AI-generated mistakes for this stack
- Recommended packages/middleware
- Configuration examples

**Target Queries:**
- "nextjs supabase security"
- "express api security best practices"
- "supabase row level security"

**Pages to Create:**

| Priority | Stack |
|----------|-------|
| P0 | Next.js + Supabase |
| P0 | Express + PostgreSQL |
| P1 | SvelteKit + Supabase |
| P1 | Next.js + Prisma |
| P2 | Remix + Supabase |
| P2 | Nuxt + Supabase |

---

### Category 4: Fixes (`/kb/fixes/`)

**Purpose:** AI-ready fix prompts that vibe coders copy-paste

**Content Focus:**
- The vulnerability (brief)
- Framework-specific fix prompt
- Before/after code examples
- Related fixes

**Target Queries:**
- "how to fix sql injection nextjs"
- "fix hardcoded api key"
- "add authentication to api route"

**Structure:**
```
/kb/fixes/sql-injection/           ← Overview + all frameworks
/kb/fixes/sql-injection/nextjs/    ← Next.js specific prompt
/kb/fixes/sql-injection/express/   ← Express specific prompt
/kb/fixes/sql-injection/sveltekit/ ← SvelteKit specific prompt
```

---

### Category 5: Glossary (`/kb/glossary/`)

**Purpose:** Own the definitions that LLMs cite

**Content Focus:**
- Definition (50-100 words, plain English)
- Why vibe coders should care
- Link to full article
- Related terms

**Target Queries:**
- "what is vibe coding"
- "what is sql injection"
- "authentication vs authorization"

**Format:** Short pages optimized for featured snippets and LLM extraction

---

### Category 6: Checklists (`/kb/checklists/`)

**Purpose:** Actionable security checklists that rank for "checklist" queries

**Content Focus:**
- Checkable items (interactive)
- Brief explanation per item
- Links to detailed articles
- Downloadable version

**Target Queries:**
- "security checklist before launch"
- "supabase security checklist"
- "api security checklist"

---

### Category 7: Research (`/research/`)

**Purpose:** Unique data that establishes authority

**Content Types:**

1. **Hallucinated Vulnerability Index (Weekly)**
   - Unique data from Scanner
   - Rankings, trends, charts
   - Shareable, press-worthy

2. **AI Tool Security Comparison**
   - Head-to-head comparison
   - Updated monthly
   - "Which AI tool is most secure?"

3. **Methodology**
   - How we scan
   - Builds trust for citations

---

# Part 3: Technical Architecture

## 3.1 Project Structure

```
vibeship-kb/
├── src/
│   ├── routes/
│   │   ├── +layout.svelte                 # Root layout
│   │   ├── +layout.server.ts              # Global data loading
│   │   ├── +page.svelte                   # Homepage
│   │   │
│   │   ├── kb/
│   │   │   ├── +layout.svelte             # KB layout (sidebar, search)
│   │   │   ├── +layout.server.ts          # KB navigation data
│   │   │   ├── +page.svelte               # KB index
│   │   │   │
│   │   │   ├── vulnerabilities/
│   │   │   │   ├── +page.svelte           # Vulnerabilities hub
│   │   │   │   ├── +page.server.ts
│   │   │   │   └── [slug]/
│   │   │   │       ├── +page.svelte       # Individual vulnerability
│   │   │   │       └── +page.server.ts
│   │   │   │
│   │   │   ├── ai-patterns/
│   │   │   │   ├── +page.svelte           # AI patterns hub
│   │   │   │   ├── +page.server.ts
│   │   │   │   └── [tool]/
│   │   │   │       ├── +page.svelte       # Tool overview
│   │   │   │       ├── +page.server.ts
│   │   │   │       └── [vulnerability]/
│   │   │   │           ├── +page.svelte   # Tool + vuln specific
│   │   │   │           └── +page.server.ts
│   │   │   │
│   │   │   ├── stacks/
│   │   │   │   ├── +page.svelte
│   │   │   │   ├── +page.server.ts
│   │   │   │   └── [stack]/
│   │   │   │       ├── +page.svelte
│   │   │   │       └── +page.server.ts
│   │   │   │
│   │   │   ├── fixes/
│   │   │   │   ├── +page.svelte
│   │   │   │   ├── +page.server.ts
│   │   │   │   └── [vulnerability]/
│   │   │   │       ├── +page.svelte
│   │   │   │       ├── +page.server.ts
│   │   │   │       └── [framework]/
│   │   │   │           ├── +page.svelte
│   │   │   │           └── +page.server.ts
│   │   │   │
│   │   │   ├── glossary/
│   │   │   │   ├── +page.svelte
│   │   │   │   ├── +page.server.ts
│   │   │   │   └── [term]/
│   │   │   │       ├── +page.svelte
│   │   │   │       └── +page.server.ts
│   │   │   │
│   │   │   └── checklists/
│   │   │       ├── +page.svelte
│   │   │       ├── +page.server.ts
│   │   │       └── [checklist]/
│   │   │           ├── +page.svelte
│   │   │           └── +page.server.ts
│   │   │
│   │   ├── research/
│   │   │   ├── +page.svelte
│   │   │   ├── vulnerability-index/
│   │   │   │   ├── +page.svelte
│   │   │   │   ├── +page.server.ts
│   │   │   │   ├── latest/
│   │   │   │   │   └── +page.server.ts    # Redirect to latest
│   │   │   │   └── [date]/
│   │   │   │       ├── +page.svelte
│   │   │   │       └── +page.server.ts
│   │   │   ├── ai-tool-comparison/
│   │   │   │   ├── +page.svelte
│   │   │   │   └── +page.server.ts
│   │   │   └── methodology/
│   │   │       └── +page.svelte
│   │   │
│   │   ├── blog/
│   │   │   ├── +page.svelte
│   │   │   ├── +page.server.ts
│   │   │   └── [slug]/
│   │   │       ├── +page.svelte
│   │   │       └── +page.server.ts
│   │   │
│   │   ├── tools/
│   │   │   └── +page.svelte               # Product directory
│   │   │
│   │   ├── llms.txt/
│   │   │   └── +server.ts
│   │   ├── llms-full.txt/
│   │   │   └── +server.ts
│   │   ├── sitemap.xml/
│   │   │   └── +server.ts
│   │   └── robots.txt/
│   │       └── +server.ts
│   │
│   ├── lib/
│   │   ├── server/
│   │   │   ├── db.ts                      # Database connection
│   │   │   ├── scanner-stats.ts           # Stats from Scanner DB
│   │   │   ├── content.ts                 # Content loading
│   │   │   └── cache.ts                   # Redis/memory cache
│   │   │
│   │   ├── components/
│   │   │   ├── seo/
│   │   │   │   ├── SEOHead.svelte         # Meta tags + schema
│   │   │   │   ├── FAQSchema.svelte
│   │   │   │   ├── BreadcrumbSchema.svelte
│   │   │   │   └── ArticleSchema.svelte
│   │   │   │
│   │   │   ├── layout/
│   │   │   │   ├── Sidebar.svelte
│   │   │   │   ├── Header.svelte
│   │   │   │   ├── Footer.svelte
│   │   │   │   ├── Breadcrumbs.svelte
│   │   │   │   ├── TableOfContents.svelte
│   │   │   │   └── MobileNav.svelte
│   │   │   │
│   │   │   ├── content/
│   │   │   │   ├── StatBox.svelte         # Live stats display
│   │   │   │   ├── ToolChart.svelte       # AI tool comparison
│   │   │   │   ├── TrendIndicator.svelte
│   │   │   │   ├── VulnerabilityCard.svelte
│   │   │   │   ├── StackCard.svelte
│   │   │   │   ├── ChecklistItem.svelte
│   │   │   │   └── RelatedContent.svelte
│   │   │   │
│   │   │   ├── interactive/
│   │   │   │   ├── FixPrompt.svelte       # Copyable AI prompt
│   │   │   │   ├── CodeBlock.svelte       # Syntax highlighted
│   │   │   │   ├── CopyButton.svelte
│   │   │   │   ├── SearchModal.svelte
│   │   │   │   ├── ProgressTracker.svelte # Checklist progress
│   │   │   │   └── FeedbackWidget.svelte
│   │   │   │
│   │   │   └── ui/
│   │   │       ├── Badge.svelte
│   │   │       ├── Button.svelte
│   │   │       ├── Card.svelte
│   │   │       ├── Tabs.svelte
│   │   │       ├── Tooltip.svelte
│   │   │       └── Alert.svelte
│   │   │
│   │   ├── content/                       # Markdown/JSON content files
│   │   │   ├── vulnerabilities/
│   │   │   │   ├── sql-injection.json
│   │   │   │   └── ...
│   │   │   ├── ai-patterns/
│   │   │   │   ├── cursor.json
│   │   │   │   └── ...
│   │   │   ├── stacks/
│   │   │   ├── fixes/
│   │   │   ├── glossary/
│   │   │   └── checklists/
│   │   │
│   │   ├── stores/
│   │   │   ├── search.ts                  # Search state
│   │   │   ├── checklist.ts               # Checklist progress
│   │   │   └── preferences.ts             # User preferences
│   │   │
│   │   └── utils/
│   │       ├── markdown.ts                # Markdown processing
│   │       ├── schema.ts                  # JSON-LD generators
│   │       ├── seo.ts                     # SEO utilities
│   │       └── format.ts                  # Number/date formatting
│   │
│   ├── app.html
│   ├── app.css                            # Global styles (Tailwind)
│   └── hooks.server.ts                    # Server hooks
│
├── static/
│   ├── images/
│   │   ├── og/                            # Open Graph images
│   │   ├── charts/                        # Generated charts
│   │   └── icons/
│   ├── fonts/
│   └── favicon.ico
│
├── scripts/
│   ├── generate-content.ts                # Generate pages with Claude
│   ├── update-stats.ts                    # Update stats from Scanner
│   ├── generate-og-images.ts              # Generate OG images
│   ├── generate-sitemap.ts                # Static sitemap generation
│   └── validate-content.ts                # Content validation
│
├── tests/
│   ├── seo.test.ts                        # SEO validation tests
│   ├── content.test.ts                    # Content structure tests
│   └── components.test.ts
│
├── svelte.config.js
├── vite.config.ts
├── tailwind.config.js
├── package.json
└── tsconfig.json
```

## 3.2 Technology Stack

| Layer | Technology | Why |
|-------|------------|-----|
| Framework | SvelteKit | Your existing stack, great SSR/SSG |
| Styling | Tailwind CSS | Rapid development, consistent design |
| Database | PostgreSQL | Scanner already uses it |
| Hosting | Vercel | Edge functions, great for SSR |
| Search | Algolia or Pagefind | Fast client-side search |
| Cache | Vercel KV or Upstash | Edge caching for stats |
| Analytics | Plausible or Umami | Privacy-focused, lightweight |
| Charts | Chart.js or Recharts | Interactive visualizations |

## 3.3 Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                        SCANNER DATABASE                          │
│                                                                 │
│  scan_results → vulnerability_stats → vulnerability_index       │
│       │                  │                    │                 │
└───────┼──────────────────┼────────────────────┼─────────────────┘
        │                  │                    │
        ▼                  ▼                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                     KNOWLEDGE BASE                               │
│                                                                 │
│  +page.server.ts loads:                                         │
│  ├── Content (JSON/Markdown)                                    │
│  ├── Live stats (from DB via cache)                            │
│  └── Related content (internal linking)                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────────────┐
│                      RENDERED PAGE                               │
│                                                                 │
│  ├── SEO meta tags                                              │
│  ├── Schema markup (FAQ, Article, Breadcrumb)                   │
│  ├── Dynamic stats ("Found in 73% of repos")                    │
│  ├── Static content (explanations, examples)                    │
│  └── Interactive elements (copy prompts, checklists)            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

# Part 4: Database Schema

## 4.1 Scanner Stats Tables

```sql
-- ============================================
-- VULNERABILITY STATISTICS
-- Updated weekly by stats aggregation script
-- ============================================

CREATE TABLE vulnerability_stats (
  id SERIAL PRIMARY KEY,
  vulnerability_slug VARCHAR(100) NOT NULL,
  
  -- Overall stats
  total_repos_scanned INTEGER DEFAULT 0,
  repos_with_vulnerability INTEGER DEFAULT 0,
  percentage DECIMAL(5,2) DEFAULT 0,
  
  -- Severity distribution
  critical_count INTEGER DEFAULT 0,
  high_count INTEGER DEFAULT 0,
  medium_count INTEGER DEFAULT 0,
  low_count INTEGER DEFAULT 0,
  
  -- By AI tool (percentage of that tool's repos affected)
  cursor_count INTEGER DEFAULT 0,
  cursor_percentage DECIMAL(5,2) DEFAULT 0,
  claude_code_count INTEGER DEFAULT 0,
  claude_code_percentage DECIMAL(5,2) DEFAULT 0,
  bolt_count INTEGER DEFAULT 0,
  bolt_percentage DECIMAL(5,2) DEFAULT 0,
  v0_count INTEGER DEFAULT 0,
  v0_percentage DECIMAL(5,2) DEFAULT 0,
  replit_count INTEGER DEFAULT 0,
  replit_percentage DECIMAL(5,2) DEFAULT 0,
  copilot_count INTEGER DEFAULT 0,
  copilot_percentage DECIMAL(5,2) DEFAULT 0,
  windsurf_count INTEGER DEFAULT 0,
  windsurf_percentage DECIMAL(5,2) DEFAULT 0,
  
  -- By stack
  nextjs_supabase_count INTEGER DEFAULT 0,
  nextjs_prisma_count INTEGER DEFAULT 0,
  express_postgres_count INTEGER DEFAULT 0,
  sveltekit_supabase_count INTEGER DEFAULT 0,
  
  -- Time tracking
  week_start DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(vulnerability_slug, week_start)
);

CREATE INDEX idx_vuln_stats_slug ON vulnerability_stats(vulnerability_slug);
CREATE INDEX idx_vuln_stats_week ON vulnerability_stats(week_start DESC);


-- ============================================
-- WEEKLY VULNERABILITY INDEX
-- Powers the Hallucinated Vulnerability Index
-- ============================================

CREATE TABLE vulnerability_index (
  id SERIAL PRIMARY KEY,
  week_start DATE NOT NULL UNIQUE,
  
  -- Summary stats
  total_repos_scanned INTEGER DEFAULT 0,
  total_vulnerabilities_found INTEGER DEFAULT 0,
  repos_with_any_vulnerability INTEGER DEFAULT 0,
  overall_vulnerability_rate DECIMAL(5,2) DEFAULT 0,
  
  -- Top vulnerabilities this week (JSON array)
  -- [{slug, name, count, percentage, change}]
  top_vulnerabilities JSONB,
  
  -- Tool rankings this week (JSON)
  -- [{tool, score, vulnerability_rate, top_issue}]
  tool_rankings JSONB,
  
  -- Week over week changes
  total_scanned_change INTEGER DEFAULT 0,
  vulnerability_rate_change DECIMAL(5,2) DEFAULT 0,
  
  -- Notable findings (for content generation)
  notable_findings TEXT,
  
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_vuln_index_week ON vulnerability_index(week_start DESC);


-- ============================================
-- AI TOOL STATISTICS
-- Per-tool aggregate data
-- ============================================

CREATE TABLE ai_tool_stats (
  id SERIAL PRIMARY KEY,
  tool_slug VARCHAR(50) NOT NULL,
  
  -- Overall for this tool
  total_repos_scanned INTEGER DEFAULT 0,
  repos_with_vulnerability INTEGER DEFAULT 0,
  overall_vulnerability_rate DECIMAL(5,2) DEFAULT 0,
  avg_vulnerabilities_per_repo DECIMAL(5,2) DEFAULT 0,
  
  -- Top vulnerabilities for this tool (JSON)
  -- [{vulnerability_slug, name, percentage}]
  top_vulnerabilities JSONB,
  
  -- Security score (0-100, calculated)
  security_score INTEGER DEFAULT 50,
  
  -- Time tracking
  week_start DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(tool_slug, week_start)
);

CREATE INDEX idx_tool_stats_slug ON ai_tool_stats(tool_slug);


-- ============================================
-- CONTENT METADATA
-- For internal linking and relationships
-- ============================================

CREATE TABLE content_pages (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(200) UNIQUE NOT NULL,
  category VARCHAR(50) NOT NULL,  -- vulnerability, ai-pattern, stack, fix, glossary, checklist
  
  -- Basic metadata
  title VARCHAR(200) NOT NULL,
  description TEXT,
  quick_answer TEXT,  -- For LLM extraction
  
  -- For internal linking
  related_vulnerabilities VARCHAR(100)[],
  related_tools VARCHAR(50)[],
  related_stacks VARCHAR(100)[],
  related_pages VARCHAR(200)[],
  
  -- Content stats
  word_count INTEGER,
  reading_time_minutes INTEGER,
  
  -- Timestamps
  published_at TIMESTAMP,
  updated_at TIMESTAMP,
  
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_content_category ON content_pages(category);
CREATE INDEX idx_content_slug ON content_pages(slug);
```

## 4.2 Server Functions

```typescript
// src/lib/server/db.ts

import { Pool } from 'pg'
import { DATABASE_URL } from '$env/static/private'

export const db = new Pool({
  connectionString: DATABASE_URL,
  max: 10
})
```

```typescript
// src/lib/server/cache.ts

import { Redis } from '@upstash/redis'
import { UPSTASH_REDIS_URL, UPSTASH_REDIS_TOKEN } from '$env/static/private'

const redis = new Redis({
  url: UPSTASH_REDIS_URL,
  token: UPSTASH_REDIS_TOKEN
})

export const cache = {
  async get<T>(key: string): Promise<T | null> {
    try {
      return await redis.get(key)
    } catch {
      return null
    }
  },
  
  async set<T>(key: string, value: T, ttlSeconds: number = 3600): Promise<void> {
    try {
      await redis.set(key, value, { ex: ttlSeconds })
    } catch (e) {
      console.error('Cache set error:', e)
    }
  },
  
  async invalidate(pattern: string): Promise<void> {
    // Invalidate all keys matching pattern
    const keys = await redis.keys(pattern)
    if (keys.length > 0) {
      await redis.del(...keys)
    }
  }
}
```

```typescript
// src/lib/server/scanner-stats.ts

import { db } from './db'
import { cache } from './cache'

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface VulnerabilityStats {
  slug: string
  totalScanned: number
  affectedRepos: number
  percentage: number
  severity: {
    critical: number
    high: number
    medium: number
    low: number
  }
  byTool: Record<string, { count: number; percentage: number }>
  byStack: Record<string, number>
  trend: 'up' | 'down' | 'stable'
  weekOverWeekChange: number
  lastUpdated: string
}

export interface ToolStats {
  slug: string
  name: string
  totalScanned: number
  vulnerabilityRate: number
  avgVulnerabilitiesPerRepo: number
  securityScore: number
  topVulnerabilities: Array<{
    slug: string
    name: string
    percentage: number
  }>
  lastUpdated: string
}

export interface WeeklyIndex {
  weekStart: string
  totalScanned: number
  totalVulnerabilities: number
  overallRate: number
  topVulnerabilities: Array<{
    slug: string
    name: string
    count: number
    percentage: number
    change: number
  }>
  toolRankings: Array<{
    tool: string
    score: number
    rate: number
    topIssue: string
  }>
}

// ============================================
// DATA FETCHING FUNCTIONS
// ============================================

export async function getVulnerabilityStats(slug: string): Promise<VulnerabilityStats> {
  const cacheKey = `vuln-stats:${slug}`
  const cached = await cache.get<VulnerabilityStats>(cacheKey)
  if (cached) return cached

  const result = await db.query(`
    SELECT 
      vs.*,
      prev.percentage as prev_percentage
    FROM vulnerability_stats vs
    LEFT JOIN vulnerability_stats prev 
      ON prev.vulnerability_slug = vs.vulnerability_slug 
      AND prev.week_start = vs.week_start - INTERVAL '7 days'
    WHERE vs.vulnerability_slug = $1
    ORDER BY vs.week_start DESC
    LIMIT 1
  `, [slug])

  if (result.rows.length === 0) {
    // Return empty stats if no data
    return getEmptyStats(slug)
  }

  const row = result.rows[0]
  const stats: VulnerabilityStats = {
    slug,
    totalScanned: row.total_repos_scanned,
    affectedRepos: row.repos_with_vulnerability,
    percentage: parseFloat(row.percentage),
    severity: {
      critical: row.critical_count,
      high: row.high_count,
      medium: row.medium_count,
      low: row.low_count
    },
    byTool: {
      cursor: { count: row.cursor_count, percentage: parseFloat(row.cursor_percentage) },
      claudeCode: { count: row.claude_code_count, percentage: parseFloat(row.claude_code_percentage) },
      bolt: { count: row.bolt_count, percentage: parseFloat(row.bolt_percentage) },
      v0: { count: row.v0_count, percentage: parseFloat(row.v0_percentage) },
      replit: { count: row.replit_count, percentage: parseFloat(row.replit_percentage) },
      copilot: { count: row.copilot_count, percentage: parseFloat(row.copilot_percentage) },
      windsurf: { count: row.windsurf_count, percentage: parseFloat(row.windsurf_percentage) }
    },
    byStack: {
      'nextjs-supabase': row.nextjs_supabase_count,
      'nextjs-prisma': row.nextjs_prisma_count,
      'express-postgres': row.express_postgres_count,
      'sveltekit-supabase': row.sveltekit_supabase_count
    },
    trend: calculateTrend(row.percentage, row.prev_percentage),
    weekOverWeekChange: row.prev_percentage 
      ? parseFloat((row.percentage - row.prev_percentage).toFixed(2))
      : 0,
    lastUpdated: row.updated_at.toISOString()
  }

  await cache.set(cacheKey, stats, 3600) // 1 hour cache
  return stats
}

export async function getToolStats(toolSlug: string): Promise<ToolStats> {
  const cacheKey = `tool-stats:${toolSlug}`
  const cached = await cache.get<ToolStats>(cacheKey)
  if (cached) return cached

  const result = await db.query(`
    SELECT * FROM ai_tool_stats
    WHERE tool_slug = $1
    ORDER BY week_start DESC
    LIMIT 1
  `, [toolSlug])

  if (result.rows.length === 0) {
    return getEmptyToolStats(toolSlug)
  }

  const row = result.rows[0]
  const stats: ToolStats = {
    slug: toolSlug,
    name: formatToolName(toolSlug),
    totalScanned: row.total_repos_scanned,
    vulnerabilityRate: parseFloat(row.overall_vulnerability_rate),
    avgVulnerabilitiesPerRepo: parseFloat(row.avg_vulnerabilities_per_repo),
    securityScore: row.security_score,
    topVulnerabilities: row.top_vulnerabilities || [],
    lastUpdated: row.updated_at.toISOString()
  }

  await cache.set(cacheKey, stats, 3600)
  return stats
}

export async function getWeeklyIndex(date?: string): Promise<WeeklyIndex | null> {
  const cacheKey = date ? `weekly-index:${date}` : 'weekly-index:latest'
  const cached = await cache.get<WeeklyIndex>(cacheKey)
  if (cached) return cached

  const query = date
    ? `SELECT * FROM vulnerability_index WHERE week_start = $1`
    : `SELECT * FROM vulnerability_index ORDER BY week_start DESC LIMIT 1`
  
  const result = await db.query(query, date ? [date] : [])
  
  if (result.rows.length === 0) return null

  const row = result.rows[0]
  const index: WeeklyIndex = {
    weekStart: row.week_start.toISOString().split('T')[0],
    totalScanned: row.total_repos_scanned,
    totalVulnerabilities: row.total_vulnerabilities_found,
    overallRate: parseFloat(row.overall_vulnerability_rate),
    topVulnerabilities: row.top_vulnerabilities || [],
    toolRankings: row.tool_rankings || []
  }

  await cache.set(cacheKey, index, date ? 86400 : 3600) // 24h for historical, 1h for latest
  return index
}

export async function getAllToolsComparison(): Promise<ToolStats[]> {
  const cacheKey = 'tools-comparison'
  const cached = await cache.get<ToolStats[]>(cacheKey)
  if (cached) return cached

  const result = await db.query(`
    SELECT DISTINCT ON (tool_slug) *
    FROM ai_tool_stats
    ORDER BY tool_slug, week_start DESC
  `)

  const tools = result.rows.map(row => ({
    slug: row.tool_slug,
    name: formatToolName(row.tool_slug),
    totalScanned: row.total_repos_scanned,
    vulnerabilityRate: parseFloat(row.overall_vulnerability_rate),
    avgVulnerabilitiesPerRepo: parseFloat(row.avg_vulnerabilities_per_repo),
    securityScore: row.security_score,
    topVulnerabilities: row.top_vulnerabilities || [],
    lastUpdated: row.updated_at.toISOString()
  }))

  await cache.set(cacheKey, tools, 3600)
  return tools
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function calculateTrend(current: number, previous: number | null): 'up' | 'down' | 'stable' {
  if (!previous) return 'stable'
  const diff = current - previous
  if (diff > 1) return 'up'
  if (diff < -1) return 'down'
  return 'stable'
}

function formatToolName(slug: string): string {
  const names: Record<string, string> = {
    'cursor': 'Cursor',
    'claude-code': 'Claude Code',
    'bolt': 'Bolt',
    'v0': 'v0',
    'replit': 'Replit',
    'copilot': 'GitHub Copilot',
    'windsurf': 'Windsurf'
  }
  return names[slug] || slug
}

function getEmptyStats(slug: string): VulnerabilityStats {
  return {
    slug,
    totalScanned: 0,
    affectedRepos: 0,
    percentage: 0,
    severity: { critical: 0, high: 0, medium: 0, low: 0 },
    byTool: {},
    byStack: {},
    trend: 'stable',
    weekOverWeekChange: 0,
    lastUpdated: new Date().toISOString()
  }
}

function getEmptyToolStats(slug: string): ToolStats {
  return {
    slug,
    name: formatToolName(slug),
    totalScanned: 0,
    vulnerabilityRate: 0,
    avgVulnerabilitiesPerRepo: 0,
    securityScore: 50,
    topVulnerabilities: [],
    lastUpdated: new Date().toISOString()
  }
}
```

```typescript
// src/lib/server/content.ts

import { readFile, readdir } from 'fs/promises'
import { join } from 'path'
import { marked } from 'marked'
import { db } from './db'

const CONTENT_DIR = 'src/lib/content'

export interface ContentPage {
  slug: string
  category: string
  title: string
  description: string
  quickAnswer: string
  content: Record<string, string>
  fixPrompt?: string
  faqs: Array<{ question: string; answer: string }>
  stackNotes?: Array<{ stack: string; stackSlug: string; content: string }>
  relatedVulnerabilities?: string[]
  relatedTools?: string[]
  relatedStacks?: string[]
  publishedAt: string
  updatedAt: string
}

export async function getContent(category: string, slug: string): Promise<ContentPage | null> {
  try {
    const filePath = join(CONTENT_DIR, category, `${slug}.json`)
    const fileContent = await readFile(filePath, 'utf-8')
    const content = JSON.parse(fileContent)
    
    // Process markdown sections to HTML
    if (content.sections) {
      for (const [key, value] of Object.entries(content.sections)) {
        if (typeof value === 'string') {
          content.sections[key] = await marked(value)
        }
      }
    }
    
    return {
      slug,
      category,
      ...content
    }
  } catch {
    return null
  }
}

export async function getAllContent(category: string): Promise<ContentPage[]> {
  try {
    const dirPath = join(CONTENT_DIR, category)
    const files = await readdir(dirPath)
    
    const contents = await Promise.all(
      files
        .filter(f => f.endsWith('.json'))
        .map(async f => {
          const slug = f.replace('.json', '')
          return getContent(category, slug)
        })
    )
    
    return contents.filter((c): c is ContentPage => c !== null)
  } catch {
    return []
  }
}

export async function getRelatedContent(
  category: string, 
  currentSlug: string, 
  limit: number = 5
): Promise<ContentPage[]> {
  // Get related pages from database metadata
  const result = await db.query(`
    SELECT related_pages FROM content_pages
    WHERE slug = $1 AND category = $2
  `, [currentSlug, category])
  
  if (result.rows.length === 0 || !result.rows[0].related_pages) {
    // Fallback: return random pages from same category
    const all = await getAllContent(category)
    return all
      .filter(c => c.slug !== currentSlug)
      .slice(0, limit)
  }
  
  const relatedSlugs = result.rows[0].related_pages.slice(0, limit)
  const related = await Promise.all(
    relatedSlugs.map((slug: string) => getContent(category, slug))
  )
  
  return related.filter((c): c is ContentPage => c !== null)
}
```

---

# Part 5: Page Templates & Components

## 5.1 SEO Head Component

```svelte
<!-- src/lib/components/seo/SEOHead.svelte -->
<script lang="ts">
  import { page } from '$app/stores'
  
  export let title: string
  export let description: string
  export let type: 'article' | 'website' = 'article'
  export let image: string = 'https://vibeship.co/images/og/default.png'
  export let publishedTime: string | null = null
  export let modifiedTime: string | null = null
  export let section: string | null = null
  export let noindex: boolean = false
  
  // Schema data
  export let faqs: Array<{ question: string; answer: string }> = []
  export let howToSteps: Array<{ name: string; text: string }> = []
  export let breadcrumbs: Array<{ name: string; url: string }> = []
  
  const siteName = 'VibeShip'
  const siteUrl = 'https://vibeship.co'
  const twitterHandle = '@vibeship'
  
  $: canonical = `${siteUrl}${$page.url.pathname}`
  $: fullTitle = `${title} | ${siteName}`
  
  // Generate FAQ Schema
  $: faqSchema = faqs.length > 0 ? JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }) : null
  
  // Generate HowTo Schema
  $: howToSchema = howToSteps.length > 0 ? JSON.stringify({
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": title,
    "description": description,
    "step": howToSteps.map((step, i) => ({
      "@type": "HowToStep",
      "position": i + 1,
      "name": step.name,
      "text": step.text
    }))
  }) : null
  
  // Generate Breadcrumb Schema
  $: breadcrumbSchema = breadcrumbs.length > 0 ? JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  }) : null
  
  // Generate Article Schema
  $: articleSchema = type === 'article' ? JSON.stringify({
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": title,
    "description": description,
    "image": image,
    "author": {
      "@type": "Organization",
      "name": siteName,
      "url": siteUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": siteName,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/images/logo.png`
      }
    },
    "datePublished": publishedTime,
    "dateModified": modifiedTime || publishedTime,
    "mainEntityOfPage": canonical
  }) : null
  
  // Organization Schema (for main pages)
  const orgSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "VibeShip",
    "url": siteUrl,
    "logo": `${siteUrl}/images/logo.png`,
    "description": "Security tools for vibe coders. Find vulnerabilities in AI-generated code.",
    "sameAs": [
      "https://twitter.com/vibeship",
      "https://github.com/vibeship"
    ]
  })
</script>

<svelte:head>
  <!-- Primary Meta Tags -->
  <title>{fullTitle}</title>
  <meta name="title" content={fullTitle} />
  <meta name="description" content={description} />
  <link rel="canonical" href={canonical} />
  
  {#if noindex}
    <meta name="robots" content="noindex, nofollow" />
  {/if}
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content={type} />
  <meta property="og:url" content={canonical} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={image} />
  <meta property="og:site_name" content={siteName} />
  <meta property="og:locale" content="en_US" />
  
  {#if publishedTime}
    <meta property="article:published_time" content={publishedTime} />
  {/if}
  {#if modifiedTime}
    <meta property="article:modified_time" content={modifiedTime} />
  {/if}
  {#if section}
    <meta property="article:section" content={section} />
  {/if}
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content={canonical} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={image} />
  <meta name="twitter:site" content={twitterHandle} />
  
  <!-- Structured Data -->
  {#if faqSchema}
    {@html `<script type="application/ld+json">${faqSchema}</script>`}
  {/if}
  
  {#if howToSchema}
    {@html `<script type="application/ld+json">${howToSchema}</script>`}
  {/if}
  
  {#if breadcrumbSchema}
    {@html `<script type="application/ld+json">${breadcrumbSchema}</script>`}
  {/if}
  
  {#if articleSchema}
    {@html `<script type="application/ld+json">${articleSchema}</script>`}
  {/if}
  
  {@html `<script type="application/ld+json">${orgSchema}</script>`}
</svelte:head>
```

## 5.2 Vulnerability Page Template

```svelte
<!-- src/routes/kb/vulnerabilities/[slug]/+page.svelte -->
<script lang="ts">
  import SEOHead from '$lib/components/seo/SEOHead.svelte'
  import Breadcrumbs from '$lib/components/layout/Breadcrumbs.svelte'
  import TableOfContents from '$lib/components/layout/TableOfContents.svelte'
  import StatBox from '$lib/components/content/StatBox.svelte'
  import ToolChart from '$lib/components/content/ToolChart.svelte'
  import FixPrompt from '$lib/components/interactive/FixPrompt.svelte'
  import RelatedContent from '$lib/components/content/RelatedContent.svelte'
  import ScanCTA from '$lib/components/content/ScanCTA.svelte'
  
  export let data
  
  const toc = [
    { id: 'overview', label: 'Overview' },
    { id: 'ai-patterns', label: 'AI Tool Patterns' },
    { id: 'impact', label: 'What Could Happen' },
    { id: 'detection', label: 'How to Detect' },
    { id: 'fix', label: 'How to Fix' },
    { id: 'faq', label: 'FAQ' }
  ]
</script>

<SEOHead 
  title={data.title}
  description={data.description}
  image="https://vibeship.co/images/og/vulnerabilities/{data.slug}.png"
  publishedTime={data.publishedAt}
  modifiedTime={data.updatedAt}
  section="Security Vulnerabilities"
  faqs={data.faqs}
  breadcrumbs={[
    { name: 'Home', url: 'https://vibeship.co' },
    { name: 'Knowledge Base', url: 'https://vibeship.co/kb' },
    { name: 'Vulnerabilities', url: 'https://vibeship.co/kb/vulnerabilities' },
    { name: data.title, url: `https://vibeship.co/kb/vulnerabilities/${data.slug}` }
  ]}
/>

<div class="max-w-7xl mx-auto px-4 py-8">
  <Breadcrumbs items={[
    { label: 'KB', href: '/kb' },
    { label: 'Vulnerabilities', href: '/kb/vulnerabilities' },
    { label: data.title }
  ]} />
  
  <!-- Hero Section -->
  <header class="mb-12">
    <div class="flex items-center gap-3 mb-4">
      <span class="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium">
        Security Vulnerability
      </span>
      {#if data.stats.trend === 'up'}
        <span class="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm">
          📈 Trending Up
        </span>
      {/if}
    </div>
    
    <h1 class="text-4xl md:text-5xl font-bold text-white mb-6">
      {data.title}
    </h1>
    
    <!-- Quick Answer (First thing LLMs extract) -->
    <p class="text-xl text-slate-300 leading-relaxed max-w-3xl">
      {data.quickAnswer}
    </p>
  </header>
  
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <!-- Main Content -->
    <main class="lg:col-span-8 space-y-12">
      
      <!-- Stats Section -->
      <section id="overview">
        <StatBox 
          stats={data.stats} 
          vulnerabilityName={data.title}
        />
      </section>
      
      <!-- AI Tool Patterns (Unique Value) -->
      <section id="ai-patterns" class="scroll-mt-8">
        <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span class="text-2xl">🤖</span>
          How AI Tools Cause This
        </h2>
        
        <p class="text-slate-300 mb-6">
          {data.content.aiPatternIntro}
        </p>
        
        <ToolChart data={data.stats.byTool} />
        
        <div class="mt-6 prose prose-invert max-w-none">
          {@html data.content.aiPatternDetails}
        </div>
        
        <div class="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
          <p class="text-sm text-slate-400">
            💡 <strong class="text-slate-300">Want details for a specific tool?</strong> 
            See our analysis of 
            <a href="/kb/vibe-coding-tools/cursor/{data.slug}" class="text-blue-400 hover:text-blue-300">Cursor</a>, 
            <a href="/kb/vibe-coding-tools/claude-code/{data.slug}" class="text-blue-400 hover:text-blue-300">Claude Code</a>, or 
            <a href="/kb/vibe-coding-tools/bolt/{data.slug}" class="text-blue-400 hover:text-blue-300">Bolt</a> 
            specific patterns.
          </p>
        </div>
      </section>
      
      <!-- Impact -->
      <section id="impact" class="scroll-mt-8">
        <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span class="text-2xl">💥</span>
          What Could Happen
        </h2>
        <div class="prose prose-invert max-w-none">
          {@html data.content.impact}
        </div>
      </section>
      
      <!-- Detection -->
      <section id="detection" class="scroll-mt-8">
        <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span class="text-2xl">🔍</span>
          How to Detect It
        </h2>
        <div class="prose prose-invert max-w-none">
          {@html data.content.detection}
        </div>
        
        <ScanCTA 
          message="Scan your code for {data.title.toLowerCase()} in under 60 seconds"
        />
      </section>
      
      <!-- Fix -->
      <section id="fix" class="scroll-mt-8">
        <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span class="text-2xl">🛠️</span>
          How to Fix It
        </h2>
        
        <!-- AI Fix Prompt -->
        <div class="mb-8">
          <h3 class="text-xl font-semibold text-white mb-4">
            AI Fix Prompt
          </h3>
          <p class="text-slate-300 mb-4">
            Copy this into Claude Code or Cursor to fix automatically:
          </p>
          <FixPrompt 
            title="Fix {data.title}"
            prompt={data.fixPrompt}
          />
        </div>
        
        <!-- Manual Fix -->
        <div>
          <h3 class="text-xl font-semibold text-white mb-4">
            Manual Fix
          </h3>
          <div class="prose prose-invert max-w-none">
            {@html data.content.manualFix}
          </div>
        </div>
        
        <!-- Framework-specific fixes -->
        {#if data.frameworkFixes && data.frameworkFixes.length > 0}
          <div class="mt-8 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <h4 class="font-semibold text-white mb-3">Framework-Specific Fixes</h4>
            <div class="flex flex-wrap gap-2">
              {#each data.frameworkFixes as framework}
                <a 
                  href="/kb/fixes/{data.slug}/{framework.slug}"
                  class="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded text-sm transition-colors"
                >
                  {framework.name} →
                </a>
              {/each}
            </div>
          </div>
        {/if}
      </section>
      
      <!-- Stack Notes -->
      {#if data.stackNotes && data.stackNotes.length > 0}
        <section class="scroll-mt-8">
          <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <span class="text-2xl">📚</span>
            Stack-Specific Notes
          </h2>
          <div class="space-y-4">
            {#each data.stackNotes as note}
              <div class="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <h4 class="font-semibold text-white mb-2">{note.stack}</h4>
                <p class="text-slate-300 text-sm mb-2">{note.content}</p>
                <a 
                  href="/kb/stacks/{note.stackSlug}" 
                  class="text-blue-400 hover:text-blue-300 text-sm"
                >
                  Full {note.stack} security guide →
                </a>
              </div>
            {/each}
          </div>
        </section>
      {/if}
      
      <!-- FAQ -->
      <section id="faq" class="scroll-mt-8">
        <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <span class="text-2xl">❓</span>
          Frequently Asked Questions
        </h2>
        <div class="space-y-6">
          {#each data.faqs as faq, i}
            <div class="border-b border-slate-700 pb-6 last:border-0">
              <h3 class="text-lg font-semibold text-white mb-2">
                {faq.question}
              </h3>
              <p class="text-slate-300">
                {faq.answer}
              </p>
            </div>
          {/each}
        </div>
      </section>
      
      <!-- Related -->
      <RelatedContent 
        items={data.relatedVulnerabilities}
        title="Related Vulnerabilities"
        basePath="/kb/vulnerabilities"
      />
      
      <!-- Last Updated -->
      <div class="text-sm text-slate-500 pt-8 border-t border-slate-800">
        Last updated: {new Date(data.updatedAt).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
        · Data from {data.stats.totalScanned.toLocaleString()} scanned repositories
      </div>
    </main>
    
    <!-- Sidebar -->
    <aside class="lg:col-span-4">
      <div class="sticky top-8 space-y-6">
        <!-- Table of Contents -->
        <TableOfContents sections={toc} />
        
        <!-- Quick Stats Card -->
        <div class="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
          <h4 class="font-semibold text-white mb-3">Quick Stats</h4>
          <dl class="space-y-2 text-sm">
            <div class="flex justify-between">
              <dt class="text-slate-400">Prevalence</dt>
              <dd class="text-white font-medium">{data.stats.percentage}%</dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-slate-400">Repos Scanned</dt>
              <dd class="text-white font-medium">{data.stats.totalScanned.toLocaleString()}</dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-slate-400">Most Affected Tool</dt>
              <dd class="text-white font-medium">{data.mostAffectedTool}</dd>
            </div>
          </dl>
        </div>
        
        <!-- Scan CTA -->
        <div class="p-4 bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-lg border border-green-800/50">
          <h4 class="font-semibold text-white mb-2">
            Check Your Code
          </h4>
          <p class="text-sm text-slate-300 mb-4">
            Find {data.title.toLowerCase()} and other vulnerabilities instantly.
          </p>
          <a 
            href="https://scanner.vibeship.co"
            class="block text-center px-4 py-2 bg-green-600 hover:bg-green-500 text-white font-medium rounded transition-colors"
          >
            Free Security Scan →
          </a>
        </div>
        
        <!-- Need Help -->
        <div class="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
          <h4 class="font-semibold text-white mb-2">Need Help?</h4>
          <p class="text-sm text-slate-400 mb-3">
            Can't fix it yourself?
          </p>
          <a 
            href="/experts"
            class="text-blue-400 hover:text-blue-300 text-sm"
          >
            Get a VibeShip Expert →
          </a>
        </div>
      </div>
    </aside>
  </div>
</div>
```

## 5.3 Key Components

### StatBox Component

```svelte
<!-- src/lib/components/content/StatBox.svelte -->
<script lang="ts">
  import TrendIndicator from './TrendIndicator.svelte'
  
  export let stats: {
    percentage: number
    totalScanned: number
    affectedRepos: number
    trend: 'up' | 'down' | 'stable'
    weekOverWeekChange: number
    lastUpdated: string
  }
  export let vulnerabilityName: string
  
  $: formattedDate = new Date(stats.lastUpdated).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
</script>

<div class="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-6">
  <!-- Background Pattern -->
  <div class="absolute inset-0 opacity-5">
    <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" stroke-width="0.5"/>
      </pattern>
      <rect width="100" height="100" fill="url(#grid)"/>
    </svg>
  </div>
  
  <div class="relative">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <span class="text-sm font-medium text-slate-400">
        Prevalence in AI-Generated Code
      </span>
      <span class="text-xs text-slate-500">
        Updated {formattedDate}
      </span>
    </div>
    
    <!-- Main Stat -->
    <div class="flex items-baseline gap-4 mb-4">
      <span class="text-6xl font-bold text-white tabular-nums">
        {stats.percentage}%
      </span>
      <TrendIndicator 
        trend={stats.trend} 
        change={stats.weekOverWeekChange}
      />
    </div>
    
    <!-- Description -->
    <p class="text-slate-300 mb-6">
      Found <strong class="text-white">{vulnerabilityName}</strong> in 
      <strong class="text-white">{stats.affectedRepos.toLocaleString()}</strong> of 
      <strong class="text-white">{stats.totalScanned.toLocaleString()}</strong> 
      AI-generated codebases scanned.
    </p>
    
    <!-- Mini Stats -->
    <div class="grid grid-cols-3 gap-4 pt-4 border-t border-slate-700">
      <div>
        <div class="text-2xl font-bold text-white">{stats.totalScanned.toLocaleString()}</div>
        <div class="text-xs text-slate-400">Repos Scanned</div>
      </div>
      <div>
        <div class="text-2xl font-bold text-red-400">{stats.affectedRepos.toLocaleString()}</div>
        <div class="text-xs text-slate-400">Affected</div>
      </div>
      <div>
        <div class="text-2xl font-bold text-white">
          {stats.weekOverWeekChange > 0 ? '+' : ''}{stats.weekOverWeekChange}%
        </div>
        <div class="text-xs text-slate-400">vs Last Week</div>
      </div>
    </div>
  </div>
</div>
```

### FixPrompt Component

```svelte
<!-- src/lib/components/interactive/FixPrompt.svelte -->
<script lang="ts">
  import { fade } from 'svelte/transition'
  import CopyButton from './CopyButton.svelte'
  
  export let title: string
  export let prompt: string
  export let framework: string | null = null
  
  let expanded = false
  let copied = false
  
  async function copyToClipboard() {
    await navigator.clipboard.writeText(prompt)
    copied = true
    setTimeout(() => copied = false, 2000)
  }
  
  // Truncate for preview
  $: previewLines = prompt.split('\n').slice(0, 8)
  $: hasMore = prompt.split('\n').length > 8
</script>

<div class="rounded-lg overflow-hidden bg-slate-900 border border-slate-700">
  <!-- Header -->
  <div class="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
    <div class="flex items-center gap-2">
      <span class="text-lg">🛠️</span>
      <span class="font-medium text-white">AI Fix Prompt</span>
      {#if framework}
        <span class="px-2 py-0.5 bg-slate-700 text-slate-300 rounded text-xs">
          {framework}
        </span>
      {/if}
    </div>
    <button 
      on:click={copyToClipboard}
      class="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded transition-colors"
    >
      {#if copied}
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        Copied!
      {:else}
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
        </svg>
        Copy for Claude/Cursor
      {/if}
    </button>
  </div>
  
  <!-- Content -->
  <div class="p-4">
    <p class="text-sm text-slate-400 mb-3">{title}</p>
    
    <div class="relative">
      <pre class="text-sm text-slate-200 font-mono whitespace-pre-wrap bg-slate-950 p-4 rounded overflow-x-auto {!expanded && hasMore ? 'max-h-64' : ''}">{expanded ? prompt : previewLines.join('\n')}{!expanded && hasMore ? '\n...' : ''}</pre>
      
      {#if hasMore && !expanded}
        <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none"/>
      {/if}
    </div>
    
    {#if hasMore}
      <button 
        on:click={() => expanded = !expanded}
        class="mt-2 text-sm text-blue-400 hover:text-blue-300"
      >
        {expanded ? 'Show less' : 'Show full prompt'}
      </button>
    {/if}
  </div>
  
  <!-- Footer tip -->
  <div class="px-4 py-2 bg-slate-800/50 border-t border-slate-700">
    <p class="text-xs text-slate-500">
      💡 Paste this prompt into your AI coding tool and it will fix the vulnerability automatically
    </p>
  </div>
</div>
```

### ToolChart Component

```svelte
<!-- src/lib/components/content/ToolChart.svelte -->
<script lang="ts">
  export let data: Record<string, { count: number; percentage: number }>
  
  // Sort by percentage descending
  $: sortedTools = Object.entries(data)
    .map(([tool, stats]) => ({ tool: formatToolName(tool), ...stats }))
    .sort((a, b) => b.percentage - a.percentage)
    .filter(t => t.percentage > 0)
  
  $: maxPercentage = Math.max(...sortedTools.map(t => t.percentage), 1)
  
  function formatToolName(slug: string): string {
    const names: Record<string, string> = {
      cursor: 'Cursor',
      claudeCode: 'Claude Code',
      bolt: 'Bolt',
      v0: 'v0',
      replit: 'Replit',
      copilot: 'GitHub Copilot',
      windsurf: 'Windsurf'
    }
    return names[slug] || slug
  }
  
  function getBarColor(percentage: number): string {
    if (percentage >= 70) return 'bg-red-500'
    if (percentage >= 50) return 'bg-orange-500'
    if (percentage >= 30) return 'bg-yellow-500'
    return 'bg-green-500'
  }
</script>

<div class="bg-slate-800/50 rounded-lg border border-slate-700 p-4">
  <h4 class="text-sm font-medium text-slate-400 mb-4">
    Vulnerability Rate by AI Tool
  </h4>
  
  <div class="space-y-3">
    {#each sortedTools as tool}
      <div class="group">
        <div class="flex items-center justify-between text-sm mb-1">
          <a 
            href="/kb/vibe-coding-tools/{tool.tool.toLowerCase().replace(' ', '-')}"
            class="text-slate-300 hover:text-white transition-colors"
          >
            {tool.tool}
          </a>
          <span class="font-medium text-white tabular-nums">
            {tool.percentage}%
          </span>
        </div>
        <div class="h-2 bg-slate-700 rounded-full overflow-hidden">
          <div 
            class="h-full {getBarColor(tool.percentage)} rounded-full transition-all duration-500"
            style="width: {(tool.percentage / maxPercentage) * 100}%"
          />
        </div>
      </div>
    {/each}
  </div>
  
  {#if sortedTools.length === 0}
    <p class="text-sm text-slate-500 text-center py-4">
      No data available yet
    </p>
  {/if}
  
  <p class="text-xs text-slate-500 mt-4 pt-4 border-t border-slate-700">
    Based on VibeShip Scanner analysis. 
    <a href="/research/methodology" class="text-blue-400 hover:text-blue-300">
      See methodology →
    </a>
  </p>
</div>
```

---

# Part 6: Content System

## 6.1 Content File Format

All content is stored as JSON files for easy generation and manipulation:

```typescript
// src/lib/content/vulnerabilities/sql-injection.json

{
  "title": "SQL Injection",
  "technicalName": "SQL Injection (SQLi)",
  "slug": "sql-injection",
  "description": "Learn how SQL injection vulnerabilities appear in AI-generated code, why tools like Cursor and Claude Code create them, and how to fix them with copy-paste AI prompts.",
  "quickAnswer": "SQL injection happens when user input is put directly into database queries. An attacker can type special characters that change your query, letting them read, modify, or delete your entire database. AI coding tools generate this vulnerability in 23% of projects.",
  
  "content": {
    "aiPatternIntro": "AI coding assistants frequently generate SQL injection vulnerabilities because they optimize for working code, not secure code. When you ask for 'a function to get user by ID', they give you exactly that—without considering that the ID might come from an attacker.",
    
    "aiPatternDetails": "### Why Cursor Does This\n\nCursor tends to use template literals for SQL queries because they're readable and easy to generate...\n\n### Why Claude Code Does This\n\nClaude Code often provides example code with hardcoded values, and when you ask it to 'make it dynamic', it uses string concatenation...",
    
    "impact": "- **Data theft**: Attackers can download your entire database including user emails, passwords, and payment info\n- **Data destruction**: A single malicious query can delete all your data with `DROP TABLE`\n- **Authentication bypass**: Attackers can log in as any user without knowing their password\n- **Server takeover**: In severe cases, SQL injection can be used to execute commands on your server",
    
    "detection": "Look for these patterns in your code:\n\n```javascript\n// DANGEROUS: String concatenation\nconst user = await db.query(`SELECT * FROM users WHERE id = ${userId}`)\n\n// DANGEROUS: Template literals\nconst user = await db.query(`SELECT * FROM users WHERE email = '${email}'`)\n```\n\nAny time you see `${variable}` or `' + variable + '` inside a SQL query string, you have a potential SQL injection vulnerability.",
    
    "manualFix": "Replace string concatenation with parameterized queries:\n\n```javascript\n// BEFORE (vulnerable)\nconst user = await db.query(`SELECT * FROM users WHERE id = ${userId}`)\n\n// AFTER (safe)\nconst user = await db.query('SELECT * FROM users WHERE id = $1', [userId])\n```\n\nThe key difference: the `$1` is a placeholder that the database driver fills in safely, escaping any special characters."
  },
  
  "fixPrompt": "Fix all SQL injection vulnerabilities in my codebase.\n\nLook for:\n1. Template literals in SQL queries: `SELECT * FROM table WHERE col = ${var}`\n2. String concatenation in SQL: 'SELECT * FROM table WHERE col = ' + var\n3. Any user input being placed directly into query strings\n\nReplace with parameterized queries:\n- PostgreSQL/Supabase: Use $1, $2 placeholders with array of values\n- MySQL: Use ? placeholders with array of values\n- Prisma: Use the Prisma client methods which are safe by default\n\nFor each fix:\n1. Show me the file and line number\n2. Show the before and after code\n3. Explain what was vulnerable\n\nAfter fixing, search the entire codebase for similar patterns I might have missed.",
  
  "faqs": [
    {
      "question": "Is SQL injection still a real threat in 2025?",
      "answer": "Yes. SQL injection has been in the OWASP Top 10 for over 20 years and remains one of the most common vulnerabilities. AI coding tools have actually increased its prevalence because they often generate vulnerable code patterns."
    },
    {
      "question": "Does Prisma protect against SQL injection?",
      "answer": "Yes, when used correctly. Prisma's query methods are safe by default. However, if you use Prisma's $queryRaw or $executeRaw with string interpolation, you can still create SQL injection vulnerabilities."
    },
    {
      "question": "Does Supabase protect against SQL injection?",
      "answer": "Supabase's JavaScript client is safe for most operations. However, if you use the .rpc() method to call custom PostgreSQL functions, or write raw SQL in database functions, you need to be careful about parameterization."
    },
    {
      "question": "How do I know if my app is vulnerable?",
      "answer": "Run VibeShip Scanner on your codebase. It specifically checks for SQL injection patterns common in AI-generated code and shows you exactly which files and lines are affected."
    },
    {
      "question": "Can an ORM completely prevent SQL injection?",
      "answer": "ORMs significantly reduce the risk but don't eliminate it entirely. Any time you use 'raw query' features or build dynamic queries with string concatenation, you can introduce vulnerabilities. Always use parameterized queries even with an ORM."
    }
  ],
  
  "stackNotes": [
    {
      "stack": "Next.js + Supabase",
      "stackSlug": "nextjs-supabase",
      "content": "When using Supabase with Next.js, the JavaScript client methods like .select(), .insert(), etc. are safe. Be careful with .rpc() calls and any raw SQL in Supabase database functions."
    },
    {
      "stack": "Express + PostgreSQL",
      "stackSlug": "express-postgres",
      "content": "With the pg library, always use parameterized queries: client.query('SELECT * FROM users WHERE id = $1', [userId]). Never use template literals or string concatenation for SQL."
    }
  ],
  
  "frameworkFixes": [
    { "name": "Next.js", "slug": "nextjs" },
    { "name": "Express", "slug": "express" },
    { "name": "SvelteKit", "slug": "sveltekit" }
  ],
  
  "relatedVulnerabilities": ["xss", "idor", "missing-auth"],
  "relatedTools": ["cursor", "claude-code", "bolt"],
  "relatedStacks": ["nextjs-supabase", "express-postgres"],
  
  "cweId": "CWE-89",
  "owaspCategory": "A03:2021-Injection",
  
  "publishedAt": "2024-12-01T00:00:00Z",
  "updatedAt": "2024-12-15T00:00:00Z"
}
```

## 6.2 Content Loading

```typescript
// src/routes/kb/vulnerabilities/[slug]/+page.server.ts

import { error } from '@sveltejs/kit'
import { getContent, getRelatedContent } from '$lib/server/content'
import { getVulnerabilityStats } from '$lib/server/scanner-stats'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params }) => {
  const { slug } = params
  
  // Load content
  const content = await getContent('vulnerabilities', slug)
  if (!content) {
    throw error(404, {
      message: 'Vulnerability not found'
    })
  }
  
  // Load live stats from Scanner database
  const stats = await getVulnerabilityStats(slug)
  
  // Get related content for internal linking
  const relatedVulnerabilities = await getRelatedContent('vulnerabilities', slug, 4)
  
  // Calculate most affected tool
  const toolEntries = Object.entries(stats.byTool)
  const mostAffectedTool = toolEntries.length > 0
    ? toolEntries.reduce((a, b) => a[1].percentage > b[1].percentage ? a : b)[0]
    : 'Unknown'
  
  return {
    ...content,
    stats,
    relatedVulnerabilities,
    mostAffectedTool: formatToolName(mostAffectedTool)
  }
}

function formatToolName(slug: string): string {
  const names: Record<string, string> = {
    cursor: 'Cursor',
    claudeCode: 'Claude Code',
    bolt: 'Bolt',
    v0: 'v0',
    replit: 'Replit'
  }
  return names[slug] || slug
}
```

---

# Part 7: SEO Strategy

## 7.1 On-Page SEO Checklist

Every page must have:

- [ ] **Title tag** — `{Page Title} | VibeShip` (under 60 characters)
- [ ] **Meta description** — Compelling, includes target keyword (150-160 chars)
- [ ] **Canonical URL** — Self-referencing canonical
- [ ] **Open Graph tags** — Title, description, image, URL
- [ ] **Twitter Card tags** — Large image format
- [ ] **H1 tag** — One per page, includes primary keyword
- [ ] **H2-H6 hierarchy** — Logical heading structure
- [ ] **Internal links** — 3-5 links to related pages
- [ ] **External links** — 1-2 authoritative sources (where appropriate)
- [ ] **Image alt text** — Descriptive, includes keywords where natural
- [ ] **Schema markup** — FAQ, Article, Breadcrumb as appropriate
- [ ] **Last updated date** — Visible on page
- [ ] **Word count** — 1,500+ words for pillar pages

## 7.2 Schema Markup Strategy

| Page Type | Schema Types |
|-----------|--------------|
| Vulnerability | TechArticle + FAQPage + BreadcrumbList |
| AI Pattern | TechArticle + FAQPage + BreadcrumbList |
| Stack Guide | TechArticle + HowTo + BreadcrumbList |
| Fix Page | HowTo + BreadcrumbList |
| Glossary | DefinedTerm + BreadcrumbList |
| Checklist | HowTo + ItemList + BreadcrumbList |
| Research/Index | Article + Dataset + BreadcrumbList |

## 7.3 Internal Linking Strategy

```
Hub-and-Spoke Model:

                    ┌─────────────────┐
                    │  /kb/           │
                    │  (Main Hub)     │
                    └────────┬────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│/vulnerabilities│   │ /ai-patterns  │   │   /stacks     │
│   (Hub)       │   │    (Hub)      │   │    (Hub)      │
└───────┬───────┘   └───────┬───────┘   └───────┬───────┘
        │                   │                   │
    ┌───┼───┐           ┌───┼───┐           ┌───┼───┐
    ▼   ▼   ▼           ▼   ▼   ▼           ▼   ▼   ▼
  sql xss idor      cursor bolt v0     nextjs express svelte
   │       │           │       │           │       │
   └───────┼───────────┼───────┼───────────┼───────┘
           │           │       │           │
           └───────────┴───┬───┴───────────┘
                           │
                    Cross-links between
                    related topics
```

**Linking Rules:**

1. Every page links UP to its hub
2. Every hub links to ALL its children
3. Every vulnerability links to related AI patterns
4. Every AI pattern links to related vulnerabilities
5. Every stack links to relevant vulnerabilities
6. Every fix links to its vulnerability + framework stack
7. Footer has links to all major hubs

## 7.4 Technical SEO

### Sitemap Generation

```typescript
// src/routes/sitemap.xml/+server.ts

import { getAllContent } from '$lib/server/content'
import { getAllWeeklyIndexes } from '$lib/server/scanner-stats'

export async function GET() {
  const baseUrl = 'https://vibeship.co'
  
  // Static pages
  const staticPages = [
    { url: '', priority: 1.0, changefreq: 'weekly' },
    { url: '/kb', priority: 0.9, changefreq: 'weekly' },
    { url: '/kb/vulnerabilities', priority: 0.9, changefreq: 'weekly' },
    { url: '/kb/vibe-coding-tools', priority: 0.9, changefreq: 'weekly' },
    { url: '/kb/stacks', priority: 0.8, changefreq: 'monthly' },
    { url: '/kb/fixes', priority: 0.8, changefreq: 'weekly' },
    { url: '/kb/glossary', priority: 0.7, changefreq: 'monthly' },
    { url: '/kb/checklists', priority: 0.8, changefreq: 'monthly' },
    { url: '/research', priority: 0.8, changefreq: 'weekly' },
    { url: '/research/vulnerability-index', priority: 0.9, changefreq: 'weekly' },
    { url: '/research/ai-tool-comparison', priority: 0.8, changefreq: 'weekly' },
    { url: '/research/methodology', priority: 0.6, changefreq: 'monthly' },
    { url: '/blog', priority: 0.8, changefreq: 'daily' },
    { url: '/tools', priority: 0.7, changefreq: 'monthly' }
  ]
  
  // Dynamic content
  const vulnerabilities = await getAllContent('vulnerabilities')
  const aiPatterns = await getAllContent('ai-patterns')
  const stacks = await getAllContent('stacks')
  const fixes = await getAllContent('fixes')
  const glossary = await getAllContent('glossary')
  const checklists = await getAllContent('checklists')
  const weeklyIndexes = await getAllWeeklyIndexes()
  
  const urls = [
    ...staticPages.map(p => ({
      loc: `${baseUrl}${p.url}`,
      priority: p.priority,
      changefreq: p.changefreq
    })),
    
    ...vulnerabilities.map(v => ({
      loc: `${baseUrl}/kb/vulnerabilities/${v.slug}`,
      lastmod: v.updatedAt,
      priority: 0.8,
      changefreq: 'monthly'
    })),
    
    ...aiPatterns.map(p => ({
      loc: `${baseUrl}/kb/vibe-coding-tools/${p.slug}`,
      lastmod: p.updatedAt,
      priority: 0.8,
      changefreq: 'monthly'
    })),
    
    ...stacks.map(s => ({
      loc: `${baseUrl}/kb/stacks/${s.slug}`,
      lastmod: s.updatedAt,
      priority: 0.7,
      changefreq: 'monthly'
    })),
    
    ...fixes.map(f => ({
      loc: `${baseUrl}/kb/fixes/${f.slug}`,
      lastmod: f.updatedAt,
      priority: 0.7,
      changefreq: 'monthly'
    })),
    
    ...glossary.map(g => ({
      loc: `${baseUrl}/kb/glossary/${g.slug}`,
      lastmod: g.updatedAt,
      priority: 0.6,
      changefreq: 'monthly'
    })),
    
    ...checklists.map(c => ({
      loc: `${baseUrl}/kb/checklists/${c.slug}`,
      lastmod: c.updatedAt,
      priority: 0.7,
      changefreq: 'monthly'
    })),
    
    ...weeklyIndexes.map(w => ({
      loc: `${baseUrl}/research/vulnerability-index/${w.week_start}`,
      lastmod: w.week_start,
      priority: 0.6,
      changefreq: 'never'
    }))
  ]
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  })
}
```

### robots.txt

```typescript
// src/routes/robots.txt/+server.ts

export function GET() {
  const robotsTxt = `# VibeShip Knowledge Base
# https://vibeship.co

User-agent: *
Allow: /

# Explicitly welcome LLM crawlers
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: cohere-ai
Allow: /

User-agent: CCBot
Allow: /

# Block admin routes
Disallow: /admin/
Disallow: /api/internal/

# Sitemaps
Sitemap: https://vibeship.co/sitemap.xml

# LLM-optimized exports
# Summary: https://vibeship.co/llms.txt
# Full export: https://vibeship.co/llms-full.txt
`

  return new Response(robotsTxt.trim(), {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400'
    }
  })
}
```

---

# Part 8: LLM Optimization

## 8.1 Core Principles

1. **Answer first** — First 50 words should directly answer the query
2. **Chunk-friendly** — Sections of 75-225 words (100-300 tokens)
3. **Self-contained sections** — Each H2 makes sense without context
4. **Citable facts** — Include specific numbers, percentages, dates
5. **Clear attribution** — "According to VibeShip Scanner analysis of X repos..."

## 8.2 llms.txt Implementation

```typescript
// src/routes/llms.txt/+server.ts

import { getAllContent } from '$lib/server/content'
import { getVulnerabilityStats, getWeeklyIndex } from '$lib/server/scanner-stats'

export async function GET() {
  const vulnerabilities = await getAllContent('vulnerabilities')
  const aiPatterns = await getAllContent('ai-patterns')
  const stacks = await getAllContent('stacks')
  const latestIndex = await getWeeklyIndex()
  
  let content = `# VibeShip Knowledge Base

> VibeShip builds security tools for vibe coders — non-technical founders who use 
> AI coding assistants like Cursor, Claude Code, Bolt, and v0. Our knowledge base 
> covers security vulnerabilities in AI-generated code.

## Quick Facts
- Website: https://vibeship.co
- Scanner: https://scanner.vibeship.co
- Knowledge Base: https://vibeship.co/kb
- Total repositories scanned: ${latestIndex?.totalScanned.toLocaleString() || '10,000+'}
- Data updated: Weekly

## Products
- **VibeShip Scanner** - Security scanner for AI-generated code (https://scanner.vibeship.co)
- **VibeShip Mind** - Persistent memory for AI coding agents (https://mind.vibeship.co)

---

## Vulnerability Reference

`

  for (const vuln of vulnerabilities) {
    const stats = await getVulnerabilityStats(vuln.slug)
    content += `### ${vuln.title}
${vuln.quickAnswer}
- Prevalence: ${stats.percentage}% of AI-generated codebases
- Trend: ${stats.trend === 'up' ? 'Increasing' : stats.trend === 'down' ? 'Decreasing' : 'Stable'}
- Full article: https://vibeship.co/kb/vulnerabilities/${vuln.slug}

`
  }

  content += `---

## AI Tool Security Patterns

`

  for (const pattern of aiPatterns) {
    content += `### ${pattern.title}
${pattern.quickAnswer}
- Full analysis: https://vibeship.co/kb/vibe-coding-tools/${pattern.slug}

`
  }

  content += `---

## Stack Security Guides

`

  for (const stack of stacks) {
    content += `### ${stack.title}
${stack.description}
- Full guide: https://vibeship.co/kb/stacks/${stack.slug}

`
  }

  content += `---

## Research & Data

- **Hallucinated Vulnerability Index** (Weekly): https://vibeship.co/research/vulnerability-index
- **AI Tool Security Comparison**: https://vibeship.co/research/ai-tool-comparison  
- **Methodology**: https://vibeship.co/research/methodology

## Contact
- Twitter: @vibeship
- Discord: discord.gg/vibeship
- Email: hello@vibeship.co
`

  return new Response(content.trim(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  })
}
```

## 8.3 llms-full.txt (Complete Export)

```typescript
// src/routes/llms-full.txt/+server.ts

import { getAllContent, getContent } from '$lib/server/content'
import { getVulnerabilityStats } from '$lib/server/scanner-stats'

export async function GET() {
  const vulnerabilities = await getAllContent('vulnerabilities')
  
  let content = `# VibeShip Knowledge Base - Complete Export

Generated: ${new Date().toISOString()}
This file contains the full content of all VibeShip knowledge base articles.

================================================================================

`

  for (const vuln of vulnerabilities) {
    const fullContent = await getContent('vulnerabilities', vuln.slug)
    const stats = await getVulnerabilityStats(vuln.slug)
    
    if (!fullContent) continue
    
    content += `
================================================================================
# ${fullContent.title}
================================================================================

URL: https://vibeship.co/kb/vulnerabilities/${vuln.slug}
Category: Security Vulnerabilities
Last Updated: ${fullContent.updatedAt}

## Quick Answer
${fullContent.quickAnswer}

## Statistics (from VibeShip Scanner)
- Found in ${stats.percentage}% of ${stats.totalScanned.toLocaleString()} AI-generated codebases
- Trend: ${stats.trend} (${stats.weekOverWeekChange > 0 ? '+' : ''}${stats.weekOverWeekChange}% week-over-week)
- Most affected AI tool: ${getMostAffectedTool(stats.byTool)}

## How AI Tools Cause This
${fullContent.content.aiPatternIntro}

${fullContent.content.aiPatternDetails}

## What Could Happen
${fullContent.content.impact}

## How to Detect
${fullContent.content.detection}

## How to Fix

### AI Fix Prompt (copy into Claude Code or Cursor)
\`\`\`
${fullContent.fixPrompt}
\`\`\`

### Manual Fix
${fullContent.content.manualFix}

## Frequently Asked Questions

${fullContent.faqs.map(faq => `### ${faq.question}
${faq.answer}
`).join('\n')}

================================================================================

`
  }

  return new Response(content.trim(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400'
    }
  })
}

function getMostAffectedTool(byTool: Record<string, { percentage: number }>): string {
  let max = { tool: 'Unknown', percentage: 0 }
  for (const [tool, data] of Object.entries(byTool)) {
    if (data.percentage > max.percentage) {
      max = { tool, percentage: data.percentage }
    }
  }
  return `${max.tool} (${max.percentage}%)`
}
```

## 8.4 Content Structure for LLM Extraction

Every article should follow this structure:

```markdown
# [Clear Title That Matches Search Query]

[Quick Answer - 30-50 words that directly answer the main question]

## [Section with Question-Style H2]

[75-225 words, self-contained, citable]

## [Another Section]

[75-225 words]

## FAQ

### [Question people actually ask]?
[Direct answer, 50-100 words]

### [Another question]?
[Direct answer]
```

---

# Part 9: User Experience Design

## 9.1 Design Principles

### Not Another Boring Docs Site

| Traditional Docs | VibeShip KB |
|-----------------|-------------|
| White background, black text | Dark mode by default (vibe coder aesthetic) |
| Dense walls of text | Visual hierarchy, breathing room |
| Static content | Live stats, interactive elements |
| Academic tone | Conversational, occasionally playful |
| "Documentation" | "Knowledge Base for Vibe Coders" |

### Design Language

- **Colors**: Dark slate backgrounds, vibrant accent colors for severity/CTAs
- **Typography**: Clean sans-serif, monospace for code
- **Spacing**: Generous whitespace, clear section separation
- **Interactions**: Smooth animations, satisfying copy feedback
- **Data Visualization**: Charts, progress bars, trend indicators

## 9.2 Page Layout Principles

### 1. Answer Immediately
The first thing users see should answer their question:

```
┌────────────────────────────────────────────────────────────────┐
│  🔴 SQL Injection                                              │
│                                                                │
│  SQL injection happens when user input goes directly into      │
│  database queries. An attacker can manipulate your queries     │
│  to read, modify, or delete your entire database.              │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Found in 23% of 10,000+ AI-generated codebases         │  │
│  │  📈 +2.3% vs last week                                   │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────┘
```

### 2. Make Stats Visual
Don't just say "X% of repos" — show it:

```
┌──────────────────────────────────────────────────────────────┐
│  Vulnerability Rate by AI Tool                                │
│                                                              │
│  Cursor      ████████████████████░░░░░░░░░░  81%            │
│  Bolt        █████████████████░░░░░░░░░░░░░  74%            │
│  Claude Code ████████████████░░░░░░░░░░░░░░  67%            │
│  v0          ████████████░░░░░░░░░░░░░░░░░░  52%            │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### 3. Make Actions Obvious
Copy buttons, CTAs should be unmissable:

```
┌──────────────────────────────────────────────────────────────┐
│  🛠️ AI Fix Prompt                        [Copy for Claude] │
│  ──────────────────────────────────────────────────────────  │
│  Fix all SQL injection vulnerabilities in my codebase...     │
│                                                              │
│  💡 Paste this into Claude Code or Cursor                    │
└──────────────────────────────────────────────────────────────┘
```

### 4. Reduce Cognitive Load
- One primary CTA per section
- Collapsible sections for advanced content
- Progress indicators for long pages
- Clear visual hierarchy

## 9.3 Interactive Elements

### Checklist Progress

```svelte
<!-- src/lib/components/interactive/ChecklistProgress.svelte -->
<script lang="ts">
  import { browser } from '$app/environment'
  
  export let checklistId: string
  export let items: Array<{ id: string; label: string; description?: string }>
  
  let checked: Set<string> = new Set()
  
  // Load from localStorage
  $: if (browser) {
    const stored = localStorage.getItem(`checklist:${checklistId}`)
    if (stored) checked = new Set(JSON.parse(stored))
  }
  
  function toggle(id: string) {
    if (checked.has(id)) {
      checked.delete(id)
    } else {
      checked.add(id)
    }
    checked = checked // trigger reactivity
    
    if (browser) {
      localStorage.setItem(`checklist:${checklistId}`, JSON.stringify([...checked]))
    }
  }
  
  $: progress = items.length > 0 ? (checked.size / items.length) * 100 : 0
</script>

<div class="rounded-lg bg-slate-800/50 border border-slate-700 overflow-hidden">
  <!-- Progress bar -->
  <div class="h-1 bg-slate-700">
    <div 
      class="h-full bg-green-500 transition-all duration-300"
      style="width: {progress}%"
    />
  </div>
  
  <!-- Header -->
  <div class="px-4 py-3 border-b border-slate-700 flex items-center justify-between">
    <span class="text-sm text-slate-400">
      {checked.size} of {items.length} complete
    </span>
    {#if progress === 100}
      <span class="text-sm text-green-400">✓ All done!</span>
    {/if}
  </div>
  
  <!-- Items -->
  <div class="divide-y divide-slate-700">
    {#each items as item}
      <label 
        class="flex items-start gap-3 p-4 cursor-pointer hover:bg-slate-800/50 transition-colors"
      >
        <input 
          type="checkbox" 
          checked={checked.has(item.id)}
          on:change={() => toggle(item.id)}
          class="mt-1 w-5 h-5 rounded border-slate-600 bg-slate-700 text-green-500 focus:ring-green-500"
        />
        <div>
          <span class="text-white {checked.has(item.id) ? 'line-through text-slate-500' : ''}">
            {item.label}
          </span>
          {#if item.description}
            <p class="text-sm text-slate-400 mt-1">{item.description}</p>
          {/if}
        </div>
      </label>
    {/each}
  </div>
</div>
```

### Search with Keyboard Navigation

```svelte
<!-- src/lib/components/interactive/SearchModal.svelte -->
<script lang="ts">
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  
  export let open = false
  
  let query = ''
  let results: Array<{ title: string; url: string; category: string }> = []
  let selectedIndex = 0
  
  async function search() {
    if (query.length < 2) {
      results = []
      return
    }
    
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
    results = await res.json()
    selectedIndex = 0
  }
  
  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      selectedIndex = Math.min(selectedIndex + 1, results.length - 1)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      selectedIndex = Math.max(selectedIndex - 1, 0)
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      goto(results[selectedIndex].url)
      open = false
    } else if (e.key === 'Escape') {
      open = false
    }
  }
  
  // Global ⌘K shortcut
  onMount(() => {
    function handleGlobalKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        open = !open
      }
    }
    window.addEventListener('keydown', handleGlobalKey)
    return () => window.removeEventListener('keydown', handleGlobalKey)
  })
</script>

{#if open}
  <div 
    class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
    on:click={() => open = false}
  >
    <div 
      class="max-w-2xl mx-auto mt-20 bg-slate-900 rounded-xl border border-slate-700 shadow-2xl overflow-hidden"
      on:click|stopPropagation
    >
      <!-- Search input -->
      <div class="flex items-center gap-3 px-4 py-3 border-b border-slate-700">
        <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <input 
          type="text"
          bind:value={query}
          on:input={search}
          on:keydown={handleKeydown}
          placeholder="Search vulnerabilities, tools, guides..."
          class="flex-1 bg-transparent text-white placeholder-slate-500 focus:outline-none"
          autofocus
        />
        <kbd class="px-2 py-1 bg-slate-800 text-slate-400 text-xs rounded">ESC</kbd>
      </div>
      
      <!-- Results -->
      {#if results.length > 0}
        <div class="max-h-96 overflow-y-auto">
          {#each results as result, i}
            <a 
              href={result.url}
              class="flex items-center gap-3 px-4 py-3 {i === selectedIndex ? 'bg-slate-800' : 'hover:bg-slate-800/50'}"
              on:click={() => open = false}
            >
              <span class="text-xs px-2 py-0.5 bg-slate-700 text-slate-400 rounded">
                {result.category}
              </span>
              <span class="text-white">{result.title}</span>
            </a>
          {/each}
        </div>
      {:else if query.length >= 2}
        <div class="px-4 py-8 text-center text-slate-400">
          No results for "{query}"
        </div>
      {:else}
        <div class="px-4 py-8 text-center text-slate-500">
          Start typing to search...
        </div>
      {/if}
      
      <!-- Footer -->
      <div class="px-4 py-2 border-t border-slate-700 flex items-center gap-4 text-xs text-slate-500">
        <span><kbd class="px-1 bg-slate-800 rounded">↑↓</kbd> Navigate</span>
        <span><kbd class="px-1 bg-slate-800 rounded">↵</kbd> Open</span>
        <span><kbd class="px-1 bg-slate-800 rounded">esc</kbd> Close</span>
      </div>
    </div>
  </div>
{/if}
```

## 9.4 Mobile Experience

- Collapsible sidebar on mobile
- Touch-friendly tap targets (min 44px)
- Swipe to copy code blocks
- Bottom navigation for key actions
- Readable font sizes (16px minimum)

---

# Part 10: Content Generation

## 10.1 Claude Code Content Generator

```typescript
// scripts/generate-content.ts

import Anthropic from '@anthropic-ai/sdk'
import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'

const anthropic = new Anthropic()

interface ContentGenerationInput {
  category: 'vulnerabilities' | 'ai-patterns' | 'stacks' | 'fixes' | 'glossary' | 'checklists'
  slug: string
  context: Record<string, any>
}

const SYSTEM_PROMPT = `You are a content writer for VibeShip, a security company that helps "vibe coders" (non-technical founders using AI coding tools) secure their applications.

Your writing style:
- Plain English, no jargon without explanation
- Conversational but authoritative
- Direct and actionable
- Occasionally playful but always professional
- Back claims with data when provided

Format requirements:
- First paragraph must directly answer the main question (30-50 words)
- Sections should be 75-225 words (optimized for LLM extraction)
- Use markdown formatting
- Include specific, citable facts
- FAQ questions should be things people actually ask`

async function generateVulnerabilityContent(slug: string, stats: any) {
  const prompt = `Create a comprehensive knowledge base article about the security vulnerability: "${slug}"

REAL DATA TO INCLUDE:
- Found in ${stats.percentage}% of ${stats.totalScanned.toLocaleString()} AI-generated codebases
- Cursor projects affected: ${stats.byTool.cursor.percentage}%
- Claude Code projects affected: ${stats.byTool.claudeCode.percentage}%
- Bolt projects affected: ${stats.byTool.bolt.percentage}%

Generate a JSON object with this exact structure:
{
  "title": "Human-readable title (not technical name)",
  "technicalName": "Technical/official name",
  "description": "Meta description for SEO, 150-160 characters",
  "quickAnswer": "Direct answer to 'what is this vulnerability', 30-50 words",
  "content": {
    "aiPatternIntro": "Why AI tools generate this vulnerability, 50-75 words",
    "aiPatternDetails": "Detailed analysis with tool-specific patterns, markdown format, 150-200 words",
    "impact": "What could happen, bullet points in markdown, 4-5 items",
    "detection": "How to detect in code, include code examples, 100-150 words",
    "manualFix": "How to fix manually, include before/after code, 150-200 words"
  },
  "fixPrompt": "Complete AI fix prompt users can copy into Claude Code or Cursor, 200-300 words",
  "faqs": [
    {"question": "Is this still a real threat in 2025?", "answer": "..."},
    {"question": "Does [common framework/tool] protect against this?", "answer": "..."},
    {"question": "How do I know if my app is vulnerable?", "answer": "..."},
    {"question": "[Vulnerability-specific question]", "answer": "..."},
    {"question": "[Another relevant question]", "answer": "..."}
  ],
  "stackNotes": [
    {"stack": "Next.js + Supabase", "stackSlug": "nextjs-supabase", "content": "..."},
    {"stack": "Express + PostgreSQL", "stackSlug": "express-postgres", "content": "..."}
  ],
  "frameworkFixes": [
    {"name": "Next.js", "slug": "nextjs"},
    {"name": "Express", "slug": "express"},
    {"name": "SvelteKit", "slug": "sveltekit"}
  ],
  "relatedVulnerabilities": ["related-slug-1", "related-slug-2"],
  "relatedTools": ["cursor", "claude-code", "bolt"],
  "relatedStacks": ["nextjs-supabase", "express-postgres"]
}

Return ONLY the JSON object, no markdown code blocks or other text.`

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4000,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: prompt }]
  })

  const text = response.content[0].type === 'text' ? response.content[0].text : ''
  return JSON.parse(text)
}

async function generateAIPatternContent(tool: string, stats: any) {
  const prompt = `Create a knowledge base article about security vulnerabilities in ${tool}-generated code.

REAL DATA:
- Total repos scanned: ${stats.totalScanned.toLocaleString()}
- Overall vulnerability rate: ${stats.vulnerabilityRate}%
- Average vulnerabilities per repo: ${stats.avgVulnerabilitiesPerRepo}
- Security score: ${stats.securityScore}/100
- Top vulnerabilities: ${JSON.stringify(stats.topVulnerabilities)}

Generate JSON with this structure:
{
  "title": "Security Vulnerabilities in ${tool}-Generated Code",
  "slug": "${tool.toLowerCase().replace(' ', '-')}",
  "description": "Meta description, 150-160 chars",
  "quickAnswer": "Summary of ${tool}'s security profile, 30-50 words",
  "content": {
    "overview": "Overall security assessment, 100-150 words",
    "whyThisHappens": "Why ${tool} generates these vulnerabilities, 150-200 words",
    "recommendations": "How to use ${tool} more securely, 100-150 words"
  },
  "stats": {
    "totalScanned": ${stats.totalScanned},
    "vulnerabilityRate": ${stats.vulnerabilityRate},
    "avgVulnerabilitiesPerRepo": ${stats.avgVulnerabilitiesPerRepo},
    "securityScore": ${stats.securityScore}
  },
  "topVulnerabilities": ${JSON.stringify(stats.topVulnerabilities)},
  "faqs": [
    {"question": "Is ${tool} safe to use?", "answer": "..."},
    {"question": "What should I check after using ${tool}?", "answer": "..."},
    {"question": "How does ${tool} compare to other AI coding tools?", "answer": "..."}
  ],
  "relatedTools": ["other-tool-1", "other-tool-2"]
}

Return ONLY the JSON object.`

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 3000,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: prompt }]
  })

  const text = response.content[0].type === 'text' ? response.content[0].text : ''
  return JSON.parse(text)
}

// Main generation function
async function generateContent(input: ContentGenerationInput) {
  let content: any
  
  switch (input.category) {
    case 'vulnerabilities':
      content = await generateVulnerabilityContent(input.slug, input.context.stats)
      break
    case 'ai-patterns':
      content = await generateAIPatternContent(input.slug, input.context.stats)
      break
    // Add other categories...
    default:
      throw new Error(`Unknown category: ${input.category}`)
  }
  
  // Add metadata
  content.slug = input.slug
  content.publishedAt = new Date().toISOString()
  content.updatedAt = new Date().toISOString()
  
  // Save to file
  const dir = join('src/lib/content', input.category)
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
  
  const filePath = join(dir, `${input.slug}.json`)
  writeFileSync(filePath, JSON.stringify(content, null, 2))
  
  console.log(`✅ Generated: ${filePath}`)
  return content
}

// CLI usage
const args = process.argv.slice(2)
if (args.length >= 2) {
  const [category, slug] = args
  // You would load real stats here
  const mockStats = {
    percentage: 23,
    totalScanned: 10000,
    byTool: {
      cursor: { percentage: 81 },
      claudeCode: { percentage: 67 },
      bolt: { percentage: 74 }
    }
  }
  
  generateContent({
    category: category as any,
    slug,
    context: { stats: mockStats }
  }).catch(console.error)
}

export { generateContent }
```

## 10.2 Stats Update Script

```typescript
// scripts/update-stats.ts

import { db } from '../src/lib/server/db'
import { cache } from '../src/lib/server/cache'

async function aggregateWeeklyStats() {
  console.log('📊 Aggregating weekly stats...')
  
  const weekStart = getWeekStart(new Date())
  
  // Get all scans from this week
  const scans = await db.query(`
    SELECT * FROM scan_results
    WHERE scanned_at >= $1
  `, [weekStart])
  
  console.log(`Found ${scans.rows.length} scans this week`)
  
  // Aggregate by vulnerability
  const vulnStats = new Map<string, any>()
  const toolStats = new Map<string, any>()
  
  for (const scan of scans.rows) {
    const tool = scan.ai_tool_detected
    
    // Track tool stats
    if (!toolStats.has(tool)) {
      toolStats.set(tool, {
        total: 0,
        withVulns: 0,
        vulnCount: 0,
        vulnTypes: new Map()
      })
    }
    const ts = toolStats.get(tool)
    ts.total++
    
    if (scan.vulnerabilities_found?.length > 0) {
      ts.withVulns++
      ts.vulnCount += scan.vulnerabilities_found.length
      
      for (const vuln of scan.vulnerabilities_found) {
        // Track overall vulnerability stats
        if (!vulnStats.has(vuln.type)) {
          vulnStats.set(vuln.type, {
            total: 0,
            byTool: new Map(),
            byStack: new Map()
          })
        }
        const vs = vulnStats.get(vuln.type)
        vs.total++
        
        // By tool
        vs.byTool.set(tool, (vs.byTool.get(tool) || 0) + 1)
        
        // By stack
        const stack = scan.stack_detected
        vs.byStack.set(stack, (vs.byStack.get(stack) || 0) + 1)
        
        // Track in tool stats
        ts.vulnTypes.set(vuln.type, (ts.vulnTypes.get(vuln.type) || 0) + 1)
      }
    }
  }
  
  const totalScanned = scans.rows.length
  
  // Update vulnerability_stats table
  for (const [slug, stats] of vulnStats) {
    console.log(`Updating stats for: ${slug}`)
    
    await db.query(`
      INSERT INTO vulnerability_stats (
        vulnerability_slug, week_start, total_repos_scanned,
        repos_with_vulnerability, percentage,
        cursor_count, cursor_percentage,
        claude_code_count, claude_code_percentage,
        bolt_count, bolt_percentage,
        v0_count, v0_percentage,
        replit_count, replit_percentage,
        copilot_count, copilot_percentage,
        windsurf_count, windsurf_percentage
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
      ON CONFLICT (vulnerability_slug, week_start) DO UPDATE SET
        total_repos_scanned = EXCLUDED.total_repos_scanned,
        repos_with_vulnerability = EXCLUDED.repos_with_vulnerability,
        percentage = EXCLUDED.percentage,
        cursor_count = EXCLUDED.cursor_count,
        cursor_percentage = EXCLUDED.cursor_percentage,
        claude_code_count = EXCLUDED.claude_code_count,
        claude_code_percentage = EXCLUDED.claude_code_percentage,
        bolt_count = EXCLUDED.bolt_count,
        bolt_percentage = EXCLUDED.bolt_percentage,
        v0_count = EXCLUDED.v0_count,
        v0_percentage = EXCLUDED.v0_percentage,
        replit_count = EXCLUDED.replit_count,
        replit_percentage = EXCLUDED.replit_percentage,
        copilot_count = EXCLUDED.copilot_count,
        copilot_percentage = EXCLUDED.copilot_percentage,
        windsurf_count = EXCLUDED.windsurf_count,
        windsurf_percentage = EXCLUDED.windsurf_percentage,
        updated_at = NOW()
    `, [
      slug,
      weekStart,
      totalScanned,
      stats.total,
      (stats.total / totalScanned * 100).toFixed(2),
      stats.byTool.get('cursor') || 0,
      calculateToolPercentage('cursor', stats.byTool.get('cursor'), toolStats),
      stats.byTool.get('claude-code') || 0,
      calculateToolPercentage('claude-code', stats.byTool.get('claude-code'), toolStats),
      stats.byTool.get('bolt') || 0,
      calculateToolPercentage('bolt', stats.byTool.get('bolt'), toolStats),
      stats.byTool.get('v0') || 0,
      calculateToolPercentage('v0', stats.byTool.get('v0'), toolStats),
      stats.byTool.get('replit') || 0,
      calculateToolPercentage('replit', stats.byTool.get('replit'), toolStats),
      stats.byTool.get('copilot') || 0,
      calculateToolPercentage('copilot', stats.byTool.get('copilot'), toolStats),
      stats.byTool.get('windsurf') || 0,
      calculateToolPercentage('windsurf', stats.byTool.get('windsurf'), toolStats)
    ])
  }
  
  // Update ai_tool_stats table
  for (const [tool, stats] of toolStats) {
    const topVulns = [...stats.vulnTypes.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([vuln, count]) => ({
        slug: vuln,
        name: formatVulnName(vuln),
        percentage: (count / stats.withVulns * 100).toFixed(2)
      }))
    
    await db.query(`
      INSERT INTO ai_tool_stats (
        tool_slug, week_start, total_repos_scanned,
        repos_with_vulnerability, overall_vulnerability_rate,
        avg_vulnerabilities_per_repo, security_score, top_vulnerabilities
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (tool_slug, week_start) DO UPDATE SET
        total_repos_scanned = EXCLUDED.total_repos_scanned,
        repos_with_vulnerability = EXCLUDED.repos_with_vulnerability,
        overall_vulnerability_rate = EXCLUDED.overall_vulnerability_rate,
        avg_vulnerabilities_per_repo = EXCLUDED.avg_vulnerabilities_per_repo,
        security_score = EXCLUDED.security_score,
        top_vulnerabilities = EXCLUDED.top_vulnerabilities,
        updated_at = NOW()
    `, [
      tool,
      weekStart,
      stats.total,
      stats.withVulns,
      (stats.withVulns / stats.total * 100).toFixed(2),
      (stats.vulnCount / stats.total).toFixed(2),
      calculateSecurityScore(stats),
      JSON.stringify(topVulns)
    ])
  }
  
  // Invalidate cache
  await cache.invalidate('vuln-stats:*')
  await cache.invalidate('tool-stats:*')
  await cache.invalidate('weekly-index:*')
  
  console.log('✅ Stats updated successfully')
}

function getWeekStart(date: Date): string {
  const d = new Date(date)
  d.setDate(d.getDate() - d.getDay())
  d.setHours(0, 0, 0, 0)
  return d.toISOString().split('T')[0]
}

function calculateToolPercentage(tool: string, count: number | undefined, toolStats: Map<string, any>): number {
  if (!count) return 0
  const ts = toolStats.get(tool)
  if (!ts || ts.total === 0) return 0
  return Math.round(count / ts.total * 100 * 100) / 100
}

function calculateSecurityScore(stats: any): number {
  // Higher vulnerability rate = lower score
  // 0% vulns = 100 score, 100% vulns = 0 score
  const vulnRate = stats.withVulns / stats.total
  return Math.round((1 - vulnRate) * 100)
}

function formatVulnName(slug: string): string {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

// Run
aggregateWeeklyStats().catch(console.error)
```

---

# Part 11: Implementation Roadmap

## Week 1: Foundation

- [ ] Initialize SvelteKit project with TypeScript
- [ ] Set up Tailwind CSS with dark theme
- [ ] Configure database connection
- [ ] Create base layout components (Header, Footer, Sidebar)
- [ ] Implement SEOHead component with all schema types
- [ ] Set up robots.txt and sitemap.xml routes
- [ ] Create llms.txt endpoint

## Week 2: Core Components

- [ ] Build StatBox component with animations
- [ ] Build ToolChart component
- [ ] Build FixPrompt component with copy functionality
- [ ] Build Breadcrumbs and TableOfContents
- [ ] Build SearchModal with keyboard navigation
- [ ] Create content loading utilities
- [ ] Set up caching layer

## Week 3: Vulnerability Pages

- [ ] Create vulnerability page template
- [ ] Generate first 5 vulnerability content files
- [ ] Implement vulnerability hub page
- [ ] Add related content logic
- [ ] Connect live stats from database
- [ ] Test SEO and schema markup

## Week 4: AI Patterns (Your Moat)

- [ ] Create AI pattern page template
- [ ] Generate content for Cursor, Claude Code, Bolt
- [ ] Build tool comparison components
- [ ] Implement tool-specific vulnerability pages
- [ ] Cross-link with vulnerability pages

## Week 5: Additional Categories

- [ ] Create stack guide template and content
- [ ] Create fix prompt library
- [ ] Create glossary pages
- [ ] Create checklist pages with progress tracking
- [ ] Build hub pages for each category

## Week 6: Research Section

- [ ] Build Vulnerability Index page
- [ ] Create weekly index generation script
- [ ] Build AI tool comparison page
- [ ] Create methodology page
- [ ] Set up automated stats update cron job

## Week 7: Polish & Optimize

- [ ] Performance optimization (lazy loading, caching)
- [ ] Generate OG images for all pages
- [ ] Mobile responsiveness testing
- [ ] Accessibility audit
- [ ] Internal linking audit
- [ ] SEO audit (meta tags, schema, sitemap)

## Week 8: Launch

- [ ] Submit sitemap to Google Search Console
- [ ] Test LLM citations (ChatGPT, Claude, Perplexity)
- [ ] Set up analytics
- [ ] Create redirect rules
- [ ] Launch announcement
- [ ] Begin weekly content cadence

---

# Part 12: Success Metrics

## SEO Metrics

| Metric | Target (3 months) | Target (6 months) |
|--------|-------------------|-------------------|
| Organic traffic | 5,000 visits/month | 25,000 visits/month |
| Indexed pages | 50+ | 150+ |
| Top 10 rankings | 20 keywords | 100 keywords |
| Backlinks | 50 | 200 |
| Domain authority | 20 | 35 |

## LLM Metrics

| Metric | How to Measure | Target |
|--------|----------------|--------|
| ChatGPT citations | Weekly manual testing | Mentioned for 50% of relevant queries |
| Claude citations | Weekly manual testing | Mentioned for 50% of relevant queries |
| Perplexity citations | Weekly manual testing | Cited as source for 75% of relevant queries |
| LLM referral traffic | GA4 | 500 visits/month from LLM referrers |

## Business Metrics

| Metric | Target |
|--------|--------|
| KB → Scanner conversion | 5% of KB visitors |
| Time on page | 3+ minutes average |
| Pages per session | 2.5+ |
| Bounce rate | Under 60% |
| Return visitors | 20%+ |

---

# Appendix A: Target Keywords

## Primary Keywords (High Priority)

| Keyword | Search Volume | Difficulty | Target Page |
|---------|---------------|------------|-------------|
| vibe coding security | Low | Low | /kb |
| ai generated code security | Medium | Medium | /kb |
| cursor security issues | Low | Low | /kb/vibe-coding-tools/cursor |
| sql injection ai code | Low | Low | /kb/vulnerabilities/sql-injection |
| supabase security checklist | Medium | Medium | /kb/checklists/supabase |
| nextjs security best practices | High | High | /kb/stacks/nextjs-supabase |

## Long-Tail Keywords

- "is cursor ai safe to use"
- "how to secure ai generated code"
- "claude code security vulnerabilities"
- "bolt ai security issues"
- "supabase row level security tutorial"
- "nextjs api route authentication"
- "fix sql injection javascript"
- "hardcoded api key security risk"

---

# Appendix B: Content Templates

See the `src/lib/content/` directory for JSON templates for each content type.

---

# Appendix C: Design Tokens

```css
/* Tailwind theme extension */
colors: {
  slate: { /* Default slate palette */ },
  brand: {
    primary: '#3B82F6',    /* Blue */
    secondary: '#10B981',  /* Green */
    accent: '#8B5CF6',     /* Purple */
  },
  severity: {
    critical: '#EF4444',   /* Red */
    high: '#F97316',       /* Orange */
    medium: '#EAB308',     /* Yellow */
    low: '#22C55E',        /* Green */
    info: '#3B82F6',       /* Blue */
  }
}
```

---

**End of Document**

This document should be fed directly to Claude Code for implementation. Start with Week 1 tasks and progress sequentially.
