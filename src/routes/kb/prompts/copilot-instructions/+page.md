# GitHub Copilot Instructions: Customize Your AI Pair Programmer

<div class="quick-answer">
<strong>GitHub Copilot Instructions are markdown files in your repository that tell Copilot how to generate code for your specific project.</strong> They customize suggestions to match your architecture, coding standards, and security requirements.
</div>

## What Are GitHub Copilot Instructions?

GitHub Copilot Instructions are configuration files that teach Copilot about your project's architecture, build process, and coding standards. Think of them as a training manual for your AI pair programmer—instead of getting generic code suggestions, Copilot learns your specific frameworks, security patterns, and project structure.

These instructions live in `.github/copilot-instructions.md` for repository-wide guidance, or in `.github/instructions/*.instructions.md` for path-specific rules. When you're vibe coding with Copilot, these files ensure the AI generates code that matches your project's patterns rather than generic examples.

According to [GitHub's official documentation](https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot), instructions help Copilot understand context like your build commands, project layout, and dependencies—information it can't infer from code alone.

For vibe coders building production applications, instructions are critical because they let you enforce security patterns, prevent common vulnerabilities, and maintain consistent code quality across AI-generated suggestions.

## How to Set Up Copilot Instructions

Setting up GitHub Copilot Instructions requires creating a markdown file in your repository's `.github` folder. Start by creating the file `.github/copilot-instructions.md` in your repository root—this file contains repository-wide instructions that apply to all code generation.

Here's a step-by-step setup:

```bash
# Create .github folder if it doesn't exist
mkdir .github

# Create your instructions file
touch .github/copilot-instructions.md
```

Your first instructions file should include three essential sections: project overview, build commands, and architecture. Here's a minimal example:

```markdown
# Project Instructions

## Overview
This is a Next.js 14 application using TypeScript, Supabase for database, and Zod for validation.

## Build Commands
- Install: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build`
- Tests: `npm test`

## Architecture
- `/app` - Next.js App Router pages
- `/components` - Reusable React components
- `/lib` - Utility functions and database client
- `/types` - TypeScript type definitions
```

Once created, commit the file to your repository. GitHub Copilot automatically reads these instructions and applies them to code suggestions. You'll notice Copilot generating code that matches your specific frameworks and structure rather than generic patterns.

## Path-Specific Instructions

Path-specific instructions let you customize Copilot behavior for different parts of your codebase. Create these in `.github/instructions/` with filenames ending in `.instructions.md`. This is useful when different directories have different coding standards or security requirements.

Each path-specific file uses frontmatter to define which files it applies to:

```markdown
---
applyTo: "app/api/**/*.ts"
excludeAgent: "code-review"
---

# API Route Instructions

All API routes must:
- Validate input with Zod schemas
- Use Supabase RLS for authorization
- Return proper HTTP status codes
- Include error handling
```

The `applyTo` field uses glob patterns to match file paths. The `excludeAgent` field (optional) tells Copilot which AI agents should ignore these instructions—for example, you might exclude code review agents from build-specific instructions.

Here's an example structure for a Next.js project:

```
.github/
├── copilot-instructions.md              # Repository-wide
└── instructions/
    ├── api-routes.instructions.md       # API-specific rules
    ├── components.instructions.md       # Component patterns
    └── database.instructions.md         # Database queries
```

Path-specific instructions override repository-wide instructions when there's a conflict. Use this to enforce stricter security rules in sensitive parts of your codebase—like requiring parameterized queries in database layers or mandating input validation in API routes.

## Essential Instructions Sections

Every Copilot instructions file should include project overview, build commands, and architecture sections. These give Copilot the context needed to generate appropriate code for your specific stack.

**Project Overview Section:**

```markdown
## Overview
Next.js 14 application using:
- TypeScript for type safety
- Supabase (PostgreSQL) with Row Level Security
- Zod for runtime validation
- NextAuth.js for authentication
- Tailwind CSS for styling

Runtime: Node.js 20.x
```

This tells Copilot which frameworks to reference in suggestions. For vibe coding, listing your security libraries (like Zod, NextAuth) helps Copilot incorporate them into generated code.

**Build Commands Section:**

```markdown
## Build Commands
- Bootstrap: `npm install` (requires Node.js 20+)
- Development: `npm run dev` (runs on port 3000)
- Production build: `npm run build && npm start`
- Run tests: `npm test` (Jest + React Testing Library)
- Lint: `npm run lint` (ESLint + Prettier)
- Type check: `npm run type-check`
```

Include preconditions (like Node.js version) and postconditions (like port numbers). This prevents Copilot from suggesting incompatible commands.

**Architecture/Layout Section:**

```markdown
## Project Layout
- `/app` - Next.js App Router (pages, layouts, API routes)
- `/components/ui` - Reusable UI components (buttons, forms)
- `/components/features` - Feature-specific components
- `/lib/supabase` - Database client and query helpers
- `/lib/validations` - Zod schemas for all data types
- `/types` - Shared TypeScript definitions
- `/public` - Static assets
```

This structure helps Copilot suggest correct import paths and know where to create new files when generating code.

## Security Instructions for Copilot

Security instructions teach Copilot to avoid common vulnerabilities in AI-generated code. This is where vibe coders can prevent SQL injection, XSS, and authentication bypasses before they're written.

**Complete Security Instructions Template:**

```markdown
# Security Requirements

## Database Queries
ALWAYS use parameterized queries. NEVER concatenate user input into SQL.

❌ NEVER:
const user = await db.query(`SELECT * FROM users WHERE id = ${userId}`)

✅ ALWAYS:
const user = await db.query('SELECT * FROM users WHERE id = $1', [userId])

## Input Validation
All user input MUST be validated with Zod schemas before processing.

✅ REQUIRED:
import { z } from 'zod'

const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100)
})

const validated = userSchema.parse(input)

## Authentication
All API routes MUST verify authentication before processing requests.

✅ REQUIRED:
import { getServerSession } from 'next-auth'

export async function POST(request: Request) {
  const session = await getServerSession()
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  // Process authenticated request
}

## Authorization
Use Supabase Row Level Security (RLS) for data access control. Never query
data without checking user permissions.

✅ REQUIRED:
const { data, error } = await supabase
  .from('documents')
  .select('*')
  .eq('user_id', session.user.id)  // RLS enforces this

## Secrets Management
NEVER hardcode secrets, API keys, or credentials. Use environment variables.

❌ NEVER:
const apiKey = 'sk_live_abcd1234'

✅ ALWAYS:
const apiKey = process.env.STRIPE_SECRET_KEY
if (!apiKey) throw new Error('Missing STRIPE_SECRET_KEY')

## XSS Prevention
React escapes values by default. When using dangerouslySetInnerHTML,
sanitize with DOMPurify first.

✅ REQUIRED (if HTML needed):
import DOMPurify from 'isomorphic-dompurify'

const clean = DOMPurify.sanitize(userContent)
return <div dangerouslySetInnerHTML={{ __html: clean }} />

## Error Handling
Log errors internally but return generic messages to users. Never expose
stack traces or internal details.

✅ REQUIRED:
catch (error) {
  console.error('Database error:', error)  // Log internally
  return Response.json(
    { error: 'Failed to process request' },  // Generic to user
    { status: 500 }
  )
}
```

Add this to your `.github/copilot-instructions.md` and Copilot will suggest secure patterns by default. For vibe coded projects, this prevents vulnerabilities before code review.

According to research from [Georgetown University's Center for Security and Emerging Technology](https://cset.georgetown.edu/article/can-ai-write-secure-code/), only 55% of AI-generated code across 80 security-relevant tasks meets security standards. Custom instructions dramatically improve this by teaching the AI your security requirements.

## Copilot Instructions Templates by Stack

Here are complete instruction templates for popular vibe coding stacks. Copy these to `.github/copilot-instructions.md` and customize for your project.

**Next.js + TypeScript + Supabase:**

```markdown
# Next.js Project Instructions

## Overview
- Framework: Next.js 14 (App Router)
- Language: TypeScript (strict mode)
- Database: Supabase (PostgreSQL with RLS)
- Validation: Zod
- Auth: NextAuth.js v5

## Build Commands
- Install: `npm install`
- Dev: `npm run dev` (localhost:3000)
- Build: `npm run build`
- Test: `npm test`

## Architecture
- `/app` - Pages and API routes
- `/components` - React components
- `/lib/supabase` - Database client
- `/lib/validations` - Zod schemas
- `/types` - TypeScript types

## Coding Standards
- Use 'use client' for interactive components
- Use 'use server' for server actions
- All API routes must validate session
- All database queries use Supabase RLS
- All inputs validated with Zod

## Security
- Parameterized queries only (use Supabase client)
- Validate all user input with Zod
- Check authentication in API routes
- Environment variables for secrets
- Generic error messages to users
```

**Python + Django + PostgreSQL:**

```markdown
# Django Project Instructions

## Overview
- Framework: Django 5.0
- Language: Python 3.11+
- Database: PostgreSQL 15
- ORM: Django ORM
- Validation: Django Forms + Custom Validators

## Build Commands
- Install: `pip install -r requirements.txt`
- Migrate: `python manage.py migrate`
- Dev server: `python manage.py runserver`
- Tests: `python manage.py test`

## Architecture
- `/apps` - Django applications
- `/core` - Shared utilities
- `/templates` - HTML templates
- `/static` - Static assets
- `/api` - REST API views

## Coding Standards
- Use Django ORM (no raw SQL)
- Type hints for all functions
- Class-based views for CRUD
- Function-based views for complex logic

## Security
- ALWAYS use Django ORM (prevents SQL injection)
- Validate forms with Django Forms
- Use @login_required for protected views
- CSRF tokens required for POST
- Environment variables via django-environ
- Use Django's built-in sanitization
```

**Ruby on Rails + PostgreSQL:**

```markdown
# Rails Project Instructions

## Overview
- Framework: Rails 7.1
- Language: Ruby 3.2+
- Database: PostgreSQL
- Authentication: Devise

## Build Commands
- Install: `bundle install`
- Setup: `rails db:setup`
- Dev: `rails server`
- Tests: `rails test`

## Architecture
- `/app/models` - ActiveRecord models
- `/app/controllers` - Request handlers
- `/app/views` - Templates
- `/app/services` - Business logic
- `/config` - Configuration

## Coding Standards
- Use ActiveRecord queries (no raw SQL)
- Strong parameters in controllers
- Service objects for complex logic
- RSpec for testing

## Security
- Use ActiveRecord (prevents SQL injection)
- Strong parameters for mass assignment
- before_action :authenticate_user! for auth
- Secrets in credentials.yml.enc
- Sanitize user content with sanitize()
```

Each template includes the security patterns specific to that stack's ecosystem. For Next.js projects, this means Supabase RLS and Zod validation. For Django, it's Django Forms and ORM. Customize these for your specific setup.

## Copilot vs Cursor Rules Comparison

GitHub Copilot Instructions and Cursor Rules serve similar purposes but with different scopes and syntax. Copilot instructions are GitHub's official method for customizing code suggestions, while [Cursor Rules](/kb/prompts/cursor-rules/) are specific to the Cursor IDE.

**Key Differences:**

| Feature | GitHub Copilot | Cursor Rules |
|---------|----------------|--------------|
| File location | `.github/copilot-instructions.md` | `.cursorrules` |
| Format | Markdown with frontmatter | Plain text instructions |
| Scope | GitHub Copilot across all editors | Cursor IDE only |
| Path-specific rules | Supported (via frontmatter) | Single file for entire project |
| Official support | GitHub official | Cursor community convention |

**When to Use Each:**

Use GitHub Copilot Instructions when your team uses Copilot across multiple editors (VS Code, JetBrains, Visual Studio, Neovim). These instructions work everywhere Copilot is installed.

Use Cursor Rules when your team exclusively uses Cursor IDE. Cursor's implementation allows more detailed instructions and integrates with Cursor's chat and command features.

**Can They Work Together?**

Yes—you can maintain both `.github/copilot-instructions.md` and `.cursorrules` in the same repository. If you're vibe coding with Cursor, create Cursor Rules for Cursor-specific features (like chat context) and Copilot Instructions for universal patterns that work across all editors.

Many vibe coders use Copilot Instructions for security requirements and build commands (which should apply everywhere), then add Cursor-specific customizations in `.cursorrules` for features like agentic coding or multi-file edits.

## Best Practices

Following best practices for Copilot instructions ensures Copilot generates secure, consistent code that matches your project's architecture.

**Do's and Don'ts:**

| ✅ DO | ❌ DON'T |
|------|----------|
| Keep repository-wide instructions to 2 pages maximum | Write 20-page instruction manuals |
| Use imperative language ("ALWAYS validate input") | Use vague suggestions ("consider validating") |
| Include specific code examples with ❌/✅ | Describe patterns without examples |
| Document build preconditions (Node.js version, env vars) | Assume Copilot knows your environment |
| Update instructions when architecture changes | Let instructions become outdated |
| Use path-specific instructions for different security zones | Apply strict rules globally where unnecessary |
| Link to external docs for detailed patterns | Duplicate entire framework documentation |

**Common Mistakes:**

1. **Conflicting Instructions:** Path-specific rules that contradict repository-wide rules confuse Copilot. Make path-specific rules more specific, not opposite.

2. **Over-Specification:** Documenting every coding preference creates noise. Focus on architecture, security, and non-obvious patterns that Copilot can't infer from code.

3. **No Security Rules:** Vibe coders often forget security instructions, relying on code review to catch vulnerabilities. Add security rules upfront to prevent issues.

4. **Stale Instructions:** Instructions referencing old frameworks or deprecated patterns teach Copilot incorrect patterns. Update instructions when you migrate frameworks.

5. **Missing Build Context:** Without environment requirements (Node version, required environment variables), Copilot suggests commands that won't work in your project.

Keep instructions concise, specific, and focused on non-obvious patterns. According to [GitHub's guidance](https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot), the most effective instructions are 1-2 pages covering high-level overview, build process, and architectural decisions.

## FAQ

**Do GitHub Copilot Instructions work in all editors?**

Yes—GitHub Copilot Instructions work in any editor where GitHub Copilot is installed, including VS Code, JetBrains IDEs, Visual Studio, and Neovim. Once you commit `.github/copilot-instructions.md` to your repository, all team members using Copilot see suggestions based on those instructions, regardless of their editor choice.

**How do I test if Copilot is reading my instructions?**

Write a code comment requesting something specific from your instructions (like "create a validated API route") and see if Copilot's suggestion follows your patterns. If Copilot suggests Zod validation, Supabase queries, or error handling patterns from your instructions, it's working. You can also check Copilot's "Explanation" feature to see which context it used for suggestions.

**Can I have different instructions for different branches?**

Yes—Copilot reads instructions from the current branch, so feature branches can have different instructions than main. This is useful for testing new architectural patterns or security rules before applying them repository-wide. Just commit different versions of `.github/copilot-instructions.md` to different branches.

**Do instructions apply to Copilot Chat?**

Yes—according to [GitHub's documentation](https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot), Copilot uses instructions for both inline suggestions and chat responses. When you ask Copilot Chat to "create an API route," it applies your security rules and framework patterns from the instructions file.

**How often should I update Copilot instructions?**

Update instructions whenever you change frameworks, add security requirements, or modify project architecture. For actively developed projects, review instructions quarterly to ensure they match current patterns. Outdated instructions teach Copilot deprecated patterns, reducing code quality.

## Related Resources

**Prompting & AI Tools:**
- [Cursor Rules: Configure AI-Powered Code Generation](/kb/prompts/cursor-rules/)
- [Claude Code: Custom Instructions for AI Pair Programming](/kb/prompts/claude-code/)
- [Master Prompts: Write Better AI Code Generation Prompts](/kb/prompts/master-prompts/)

**Security Content:**
- [SQL Injection: Find & Fix in AI-Generated Code](/kb/security/vulnerabilities/sql-injection/)
- [XSS (Cross-Site Scripting): Prevent in Vibe Coded Apps](/kb/security/vulnerabilities/xss/)
- [Hardcoded Secrets: Find & Remove from Your Codebase](/kb/security/vulnerabilities/hardcoded-secrets/)
- [Missing Authorization: Fix Broken Access Control](/kb/security/vulnerabilities/missing-authorization/)

**AI Tool Security:**
- [GitHub Copilot Security: Common Vulnerabilities & Fixes](/kb/vibe-coding-tools/copilot/)
- [Cursor Security Patterns: Write Secure AI-Generated Code](/kb/vibe-coding-tools/cursor/)
- [Secure Vibe Coding Guide: Build Secure AI-Assisted Apps](/kb/guides/secure-vibe-coding/)

**Stack Guides:**
- [Next.js + Supabase Security: Complete Stack Guide](/kb/security/stacks/nextjs-supabase/)
- [Django Security: Prevent Common Vulnerabilities](/kb/security/stacks/django-postgresql/)

---

*Want to scan your AI-generated code for security vulnerabilities automatically? Try [VibeShip Scanner](https://scanner.vibeship.co) - it detects SQL injection, XSS, hardcoded secrets, and 40+ other vulnerabilities in Copilot, Cursor, Bolt, and v0 generated code.*
