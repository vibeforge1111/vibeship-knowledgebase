# Content Brief: Cursor Rules - Complete Guide

**Generated:** 2025-12-17
**Type:** Guide / Prompts
**Priority:** P0 (High Volume - 5,300/month)
**Status:** Ready for Writer

---

## 1. Article Overview

### Target Keywords (Ahrefs Data)
| Keyword | Volume | Difficulty | Intent |
|---------|--------|------------|--------|
| cursor rules | 5,300 | 26 | Informational |
| cursorrules | 1,200 | - | Informational |
| .cursorrules | 450 | - | Informational |
| cursor rules file | 400 | - | Informational |
| cursor system prompt | 200 | - | Informational |
| cursor best practices | 150 | - | Informational |

**Total Addressable Volume:** ~7,700/month
**Average Difficulty:** 26 (Moderate - Achievable)

### Search Intent
Users searching want to:
- Learn how to create/configure .cursorrules files
- Find example cursor rules to copy
- Understand best practices for cursor configuration
- Optimize their Cursor AI workflow

### Article Goal
Become THE definitive resource for Cursor rules - with security-focused rules that competitors don't provide.

---

## 2. Topic Research

### What is .cursorrules?
- Configuration file for Cursor AI IDE
- Lives in project root as `.cursorrules` or `.cursor/rules`
- Contains instructions that guide Cursor's AI behavior
- Similar to system prompts but project-specific

### File Locations
```
project/
├── .cursorrules           # Legacy location (still works)
├── .cursor/
│   └── rules              # New recommended location
└── ...
```

### Common Use Cases
1. **Code Style:** Enforce formatting, naming conventions
2. **Framework Rules:** React patterns, Next.js conventions
3. **Security Rules:** Prevent vulnerable code patterns
4. **Project Context:** Explain architecture, key files
5. **Response Format:** How AI should structure responses

### Example Structure
```markdown
# Project Rules

## Tech Stack
- Next.js 14 with App Router
- TypeScript strict mode
- Tailwind CSS
- Supabase for backend

## Code Style
- Use functional components
- Prefer named exports
- Use TypeScript interfaces over types

## Security Rules
- Never use template literals for SQL
- Always validate user input
- Use parameterized queries only
```

---

## 3. Competitive Analysis

### Current SERP Landscape
- Cursor official docs (basic)
- GitHub repositories with example rules
- Blog posts with generic examples
- YouTube tutorials

### Content Gap (Our Opportunity)
**Security-focused rules completely missing:**
- No one covers security rules in .cursorrules
- No vulnerability prevention rules
- No auth/database security patterns
- Huge opportunity for VibeShip angle

### Our Unique Angle
"Cursor Rules: Complete Guide + Security Rules Library"
- How to set up .cursorrules
- Best practices for structure
- **Security rules library** (our differentiator)
- Copy-paste rules for common stacks
- Link to our security content

---

## 4. Content Structure

### Recommended Format
```
H1: Cursor Rules: The Complete Guide to .cursorrules

Quick Answer Box (50 words):
Cursor rules are project-specific instructions that guide Cursor AI's
behavior. Create a .cursorrules file in your project root with coding
standards, security rules, and context. Here's how to set them up
with copy-paste examples.

H2: What Are Cursor Rules?
- Definition and purpose
- How they work
- Benefits of using them
- Target: 150-200 words

H2: How to Create a .cursorrules File
- File location options
- Basic structure
- Step-by-step setup
- Target: 200-250 words

H2: Cursor Rules Best Practices
- Keep rules concise
- Be specific about tech stack
- Include security guidelines
- Update as project evolves
- Target: 200-250 words

H2: Essential Cursor Rules Categories
- Project context rules
- Code style rules
- Framework-specific rules
- Security rules (our angle!)
- Target: 250-300 words

H2: Security Rules for Cursor (Copy-Paste Ready)
- SQL injection prevention rules
- Auth check rules
- Input validation rules
- Secret handling rules
- LINK to our vulnerability pages
- Target: 400-500 words (major section)

H2: Cursor Rules Examples by Stack
- Next.js + TypeScript rules
- React + Supabase rules
- Python + FastAPI rules
- Target: 300-400 words

H2: Advanced Cursor Rules Techniques
- Conditional rules
- File-specific rules
- Integration with .cursor/settings
- Target: 150-200 words

H2: Cursor Rules vs CLAUDE.md
- When to use each
- Comparison table
- Link to CLAUDE.md guide
- Target: 100-150 words

H2: FAQ
- 5-7 questions

H2: Related Resources
- Links to security guides
- Links to tool pages
```

---

## 5. Security Rules Library (Key Differentiator)

### SQL Injection Prevention Rules
```markdown
## Database Security Rules
- NEVER use template literals for SQL queries
- ALWAYS use parameterized queries or ORM methods
- When I write database code, use this pattern:
  ✅ db.query('SELECT * FROM users WHERE id = $1', [userId])
  ❌ db.query(`SELECT * FROM users WHERE id = ${userId}`)
```

### Authentication Rules
```markdown
## Auth Security Rules
- Every API route must check authentication first
- Use middleware for auth, not inline checks
- Never trust client-side auth state alone
- Pattern for protected routes:
  1. Check session/token exists
  2. Validate session/token
  3. Then process request
```

### Input Validation Rules
```markdown
## Input Validation Rules
- Validate ALL user input on the server
- Use zod or similar for schema validation
- Never pass raw user input to:
  - Database queries
  - File system operations
  - Shell commands
  - URL redirects
```

### Secret Handling Rules
```markdown
## Secret Handling Rules
- NEVER hardcode API keys, passwords, or secrets
- Use environment variables for all secrets
- Never commit .env files
- Pattern: process.env.SECRET_NAME
```

---

## 6. SEO Strategy

### Title Tag (under 60 chars)
```
Cursor Rules: Complete .cursorrules Guide 2025 | VibeShip
```
(54 characters)

### Meta Description (150-160 chars)
```
Learn how to create Cursor rules with our complete guide. Get copy-paste .cursorrules examples including security rules to prevent vulnerabilities.
```
(148 characters)

### Target URL
```
/kb/prompts/cursor-rules/
```

### Internal Links TO Include
- /kb/vibe-coding-tools/cursor/
- /kb/security/vulnerabilities/sql-injection/
- /kb/security/vulnerabilities/hardcoded-secrets/
- /kb/security/vulnerabilities/missing-auth/
- /kb/prompts/claude-md/ (when created)
- /kb/vibe-coding/secure-vibe-coding-guide/

### External Links
- Cursor official docs
- GitHub .cursorrules examples
- Our security references (OWASP, CWE)

---

## 7. FAQ Questions

1. "What is a .cursorrules file?"
2. "Where do I put my cursor rules?"
3. "What should I include in cursor rules?"
4. "Do cursor rules work with all models?"
5. "How long should cursor rules be?"
6. "What's the difference between .cursorrules and system prompts?"
7. "Can cursor rules prevent security issues?"

---

## 8. Writer Notes

### Tone
- Practical and actionable
- Copy-paste friendly
- Security-conscious but not preachy

### Key Messages
1. Cursor rules are essential for consistent AI output
2. Security rules should be part of every .cursorrules
3. We provide the security rules others don't
4. Keep rules concise but comprehensive

### Word Count Target
2,500-3,000 words (comprehensive guide with examples)

### Code Block Requirements
- Multiple copy-paste ready examples
- Before/after comparisons where relevant
- Stack-specific variations

---

**Brief Status:** ✅ Ready for Writer Agent
