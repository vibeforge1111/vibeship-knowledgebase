# Content Brief: CLAUDE.md - Complete Guide

**Generated:** 2025-12-17
**Type:** Guide / Prompts
**Priority:** P0 (Emerging - 450+ volume)
**Status:** Ready for Writer

---

## 1. Article Overview

### Target Keywords (Ahrefs Data)
| Keyword | Volume | Difficulty | Intent |
|---------|--------|------------|--------|
| claude.md | 450 | - | Informational |
| claude md | 450 | - | Informational |
| claude code system prompt | 10 | - | Informational |
| claude code custom prompt | 10 | - | Informational |

**Total Addressable Volume:** ~900/month
**Average Difficulty:** Low (emerging term, uncontested)

### Search Intent
Users searching want to:
- Learn how to configure Claude Code with CLAUDE.md
- Find examples of CLAUDE.md files
- Understand best practices for Claude Code prompts
- Customize Claude Code behavior for their projects

### Article Goal
Become THE definitive resource for CLAUDE.md - own this term before competition arrives.

---

## 2. Topic Research

### What is CLAUDE.md?
- Configuration file for Claude Code (Anthropic's CLI tool)
- Lives in project root or ~/.claude/CLAUDE.md (global)
- Contains project context, coding standards, instructions
- Read automatically by Claude Code at session start

### File Locations (Priority Order)
```
1. ./CLAUDE.md              # Project root (highest priority)
2. ./claude.md              # Alternative casing
3. ~/.claude/CLAUDE.md      # Global user config
```

### Key Sections in CLAUDE.md
1. **Project Overview:** What the project does
2. **Tech Stack:** Languages, frameworks, tools
3. **Code Style:** Formatting, naming conventions
4. **Architecture:** Key patterns, file structure
5. **Commands:** How to build, test, run
6. **Security Rules:** (Our angle!)

### Example CLAUDE.md
```markdown
# CLAUDE.md

## Project Overview
E-commerce platform built with Next.js and Supabase.

## Tech Stack
- Next.js 14 (App Router)
- TypeScript (strict mode)
- Supabase (auth + database)
- Tailwind CSS

## Commands
- npm run dev: Start development server
- npm run build: Build for production
- npm test: Run tests

## Code Style
- Use functional components with hooks
- Prefer named exports
- Use TypeScript interfaces

## Security Rules
- Use Supabase RLS for all tables
- Validate input with Zod on API routes
- Never expose API keys in client code
```

---

## 3. Competitive Analysis

### Current SERP Landscape
- Very limited content (new feature)
- Anthropic docs (basic)
- A few GitHub examples
- Almost no comprehensive guides

### Content Gap (Our Opportunity)
**First-mover advantage:**
- Term is emerging, low competition
- No security-focused CLAUDE.md guides
- No comparison with .cursorrules
- Opportunity to define best practices

### Our Unique Angle
"CLAUDE.md: Complete Guide + Security Templates"
- Comprehensive setup guide
- Security rules library (like cursor rules)
- Stack-specific templates
- Comparison with .cursorrules

---

## 4. Content Structure

### Recommended Format
```
H1: CLAUDE.md: The Complete Guide for Claude Code

Quick Answer Box (50 words):
CLAUDE.md is a configuration file that customizes Claude Code's behavior
for your project. Place it in your project root with tech stack info,
coding standards, and security rules. Here's how to set it up with
copy-paste templates.

H2: What Is CLAUDE.md?
- Definition and purpose
- How Claude Code reads it
- Benefits of using it
- Target: 150-200 words

H2: How to Create a CLAUDE.md File
- File location and naming
- Basic structure
- Step-by-step setup
- Target: 200-250 words

H2: Essential CLAUDE.md Sections
- Project Overview
- Tech Stack
- Commands
- Code Style
- Architecture
- Security Rules
- Target: 300-350 words

H2: CLAUDE.md Best Practices
- Keep it updated
- Be specific about conventions
- Include security guidelines
- Document non-obvious patterns
- Target: 200-250 words

H2: Security Rules for CLAUDE.md (Copy-Paste Ready)
- Database security rules
- Auth patterns
- Input validation
- Secret handling
- LINK to vulnerability pages
- Target: 400-500 words

H2: CLAUDE.md Templates by Stack
- Next.js + Supabase template
- SvelteKit + Prisma template
- Python + FastAPI template
- Target: 400-500 words

H2: CLAUDE.md vs .cursorrules
- When to use each
- Key differences
- Can you use both?
- Target: 150-200 words

H2: Advanced CLAUDE.md Tips
- Global vs project config
- Combining with Memory features
- MCP server documentation
- Target: 150-200 words

H2: FAQ
- 5-6 questions

H2: Related Resources
- Link to cursor-rules guide
- Link to Claude Code tool page
- Link to security guides
```

---

## 5. Security Rules Library

### Database Security Rules
```markdown
## Database Security
- Use parameterized queries, never template literals
- Enable RLS on all Supabase tables
- Validate all input before database operations
- Use transactions for multi-step operations

Example pattern:
✅ await supabase.from('users').select().eq('id', userId)
❌ await db.query(`SELECT * FROM users WHERE id = ${userId}`)
```

### Authentication Rules
```markdown
## Authentication Rules
- Check auth on every API route and server action
- Use Supabase auth helpers for session management
- Never trust client-side auth state alone
- Implement proper RBAC for admin routes

Pattern for protected routes:
const { data: { user } } = await supabase.auth.getUser()
if (!user) return redirect('/login')
```

### Input Validation Rules
```markdown
## Input Validation
- Use Zod schemas for all API input validation
- Validate on server, never trust client validation
- Sanitize before database, file, or command operations

Pattern:
const schema = z.object({ email: z.string().email() })
const result = schema.safeParse(input)
if (!result.success) return error(400, result.error)
```

---

## 6. SEO Strategy

### Title Tag (under 60 chars)
```
CLAUDE.md Guide: Configure Claude Code 2025 | VibeShip
```
(52 characters)

### Meta Description (150-160 chars)
```
CLAUDE.md complete guide for Claude Code. Learn how to configure your project with copy-paste templates including security rules. Setup instructions + examples.
```
(160 characters)

### Target URL
```
/kb/prompts/claude-md/
```

### Internal Links TO Include
- /kb/vibe-coding-tools/claude-code/
- /kb/prompts/cursor-rules/
- /kb/security/vulnerabilities/sql-injection/
- /kb/security/stacks/nextjs-supabase/
- /kb/vibe-coding/secure-vibe-coding-guide/

---

## 7. FAQ Questions

1. "What is CLAUDE.md?"
2. "Where do I put CLAUDE.md?"
3. "Does Claude Code automatically read CLAUDE.md?"
4. "What's the difference between CLAUDE.md and .cursorrules?"
5. "How long should CLAUDE.md be?"
6. "Can I have a global CLAUDE.md?"

---

## 8. Writer Notes

### Tone
- Practical, actionable
- First-mover authority
- Copy-paste friendly

### Key Messages
1. CLAUDE.md is essential for Claude Code users
2. Security rules belong in every CLAUDE.md
3. We provide templates others don't
4. Works alongside .cursorrules if using both tools

### Word Count Target
2,000-2,500 words

### Opportunity Note
This is an **emerging term** - we can define what a good CLAUDE.md looks like and become the authority before competition arrives.

---

**Brief Status:** ✅ Ready for Writer Agent
