---
title: "Custom Instructions: Set Up Your AI Coding Assistant | VibeShip"
description: "Set custom instructions for ChatGPT, Claude, and Copilot to generate secure code by default. Complete security-first templates for frontend, backend, and full-stack developers."
date: "2025-12-18"
category: "prompts"
tags: ["custom instructions", "chatgpt", "claude", "copilot", "vibe coding", "ai security"]
related:
  - /kb/vibe-coding-tools/cursor/
  - /kb/vibe-coding-tools/claude-code/
  - /kb/security/vulnerabilities/sql-injection/
  - /kb/security/vulnerabilities/hardcoded-secrets/
  - /kb/security/vulnerabilities/xss/
---

<script>
  import QuickAnswer from '$lib/components/QuickAnswer.svelte';
  import TableOfContents from '$lib/components/TableOfContents.svelte';
  import CodeBlock from '$lib/components/CodeBlock.svelte';
  import FAQ from '$lib/components/FAQ.svelte';
</script>

<QuickAnswer>
  <strong>Custom instructions are persistent guidelines that tell AI assistants how to respond across all conversations.</strong> For developers, they ensure tools like ChatGPT, Claude, and Copilot generate secure, stack-appropriate code by default—preventing common vulnerabilities before they're written.
</QuickAnswer>

<TableOfContents />

## What Are Custom Instructions?

Custom instructions are permanent settings that define how AI coding assistants behave across every conversation. Instead of repeating "use TypeScript" or "prevent SQL injection" in every prompt, you set these requirements once and the AI remembers them.

ChatGPT introduced the feature in July 2023, allowing users to define "what the AI should know about you" and "how it should respond." Claude offers similar functionality through project instructions and system prompts. GitHub Copilot uses a `.github/copilot-instructions.md` file in your repository.

For vibe coders, custom instructions are critical. According to [Georgetown CSET research (November 2024)](https://cset.georgetown.edu/article/measuring-the-impact-of-ai-code-generation-tools-on-security/), only 55% of AI-generated code is secure across 80 programming tasks. Custom instructions that prioritize security patterns significantly improve this baseline.

Think of custom instructions as hiring guidelines for your AI assistant—you wouldn't hire a developer without explaining your security requirements, coding standards, and tech stack.

## ChatGPT Custom Instructions

ChatGPT's custom instructions appear in Settings > Personalization and include two sections: "What would you like ChatGPT to know about you?" and "How would you like ChatGPT to respond?"

The first section (1500 character limit) defines your context—role, tech stack, preferences. The second section (1500 character limit) controls response style, code patterns, and security requirements.

**Developer-Focused Example:**

```
What would you like ChatGPT to know about you?

I'm a full-stack developer working with Next.js 15, TypeScript, Supabase (PostgreSQL), and Tailwind CSS. I deploy to Vercel. I prefer functional programming, server components, and TypeScript strict mode.

How would you like ChatGPT to respond?

- Always use TypeScript with explicit types
- Prefer server components over client components
- Use Supabase client with RLS (Row Level Security)
- Follow Next.js 15 App Router conventions
- Show complete code examples, not fragments
- Explain security implications when relevant
```

**Security-Conscious Example:**

```
What would you like ChatGPT to know about you?

I build web applications and prioritize security. I'm learning about common vulnerabilities like SQL injection, XSS, and authentication bypass. I use AI tools frequently.

How would you like ChatGPT to respond?

- Never use string concatenation for database queries
- Always validate and sanitize user input
- Use parameterized queries and prepared statements
- Implement proper authentication checks
- Avoid hardcoding secrets or API keys
- Flag security risks in code examples
- Link to [OWASP](https://owasp.org) or [CWE](https://cwe.mitre.org) when discussing vulnerabilities
```

These settings persist across all conversations. Update them as your stack or priorities change.

## Claude Custom Instructions

Claude offers two approaches to custom instructions: project instructions in the Claude web interface and system prompts in the API.

In Claude Projects, you can add custom instructions that apply to all conversations within that project. This is ideal for separating work contexts—one project for frontend work, another for backend, each with different instructions.

**Developer-Focused Example:**

```markdown
# Project: Next.js + Supabase Development

## Stack
- Next.js 15 (App Router)
- TypeScript (strict mode)
- Supabase (PostgreSQL + Auth + RLS)
- Tailwind CSS
- Deployed on Vercel

## Coding Preferences
- Use server components by default
- Client components only when necessary (interactivity, hooks)
- Functional programming style
- Explicit TypeScript types (no `any`)
- Supabase RLS for authorization

## Response Style
- Complete code examples with context
- Explain tradeoffs for architectural decisions
- Flag performance implications
```

**Security-Conscious Example:**

```markdown
# Security-First Development

## Security Requirements
- Use parameterized queries (never string concatenation)
- Implement input validation on all user data
- Follow principle of least privilege for database access
- Use environment variables for secrets
- Implement proper authentication checks
- Enable Supabase RLS on all tables

## When Writing Code
1. Check for common vulnerabilities (SQL injection, XSS, IDOR)
2. Use secure-by-default libraries
3. Validate input, escape output
4. Never hardcode credentials

## References
Link to OWASP or CWE when discussing security concepts.
```

Claude also supports a `CLAUDE.md` file in your repository root, which it automatically reads when working on that project. This is particularly useful with [Claude Code](/kb/vibe-coding-tools/claude-code/).

## GitHub Copilot Instructions

GitHub Copilot reads custom instructions from a `.github/copilot-instructions.md` file in your repository root. This applies to all developers using Copilot in that repository.

```markdown
# Copilot Instructions

## Stack
- Next.js 15, TypeScript, Supabase, Tailwind CSS

## Code Style
- Use TypeScript strict mode
- Prefer functional components
- Server components by default

## Security
- Use parameterized queries for database operations
- Validate all user input
- Never hardcode secrets
- Implement RLS checks for Supabase queries
```

Copilot's instructions are briefer than ChatGPT or Claude because they focus on inline code generation rather than conversation. For a complete guide to GitHub Copilot configuration, see our [Copilot Instructions guide](/kb/prompts/copilot-instructions/).

**Key difference:** Copilot instructions live in your repository and apply to your entire team, while ChatGPT and Claude instructions are personal settings.

## Security-First Custom Instructions

The biggest risk in vibe coding is that AI tools optimize for working code, not secure code. According to the [Georgetown CSET study](https://cset.georgetown.edu/article/measuring-the-impact-of-ai-code-generation-tools-on-security/), AI-generated code has a 45% failure rate on security tasks.

Here's a comprehensive security-focused instruction set you can copy-paste into any AI assistant.

**For ChatGPT (What ChatGPT should know about you):**

```
I build web applications and prioritize security. I'm aware of common vulnerabilities and want to prevent them by default. I use AI coding tools frequently.
```

**For ChatGPT (How ChatGPT should respond):**

```
SECURITY REQUIREMENTS - Apply to all code:

SQL Injection Prevention:
- Use parameterized queries or ORMs
- Never concatenate user input into SQL strings
- Example: db.query('SELECT * FROM users WHERE id = $1', [userId])

Authentication & Authorization:
- Check authentication status before protected operations
- Implement role-based access control where needed
- Use secure session management

Input Validation:
- Validate all user input on the server side
- Use allow-lists, not deny-lists
- Sanitize before database operations

Secret Management:
- Never hardcode API keys, passwords, or tokens
- Use environment variables (.env files)
- Add .env to .gitignore

Cross-Site Scripting (XSS):
- Escape output when rendering user data
- Use framework defaults (React, Vue escape by default)
- Avoid dangerouslySetInnerHTML or v-html

When writing code:
1. Flag potential security issues
2. Link to OWASP or CWE resources when relevant
3. Provide secure alternatives to vulnerable patterns
```

**For Claude (Project Instructions):**

```markdown
# Security-First Development

## Security Checklist (Apply to All Code)

### SQL Injection Prevention
- Use parameterized queries: `db.query('SELECT * FROM users WHERE id = $1', [id])`
- Never: `db.query(\`SELECT * FROM users WHERE id = ${id}\`)`
- Use ORM query builders (Prisma, Drizzle, TypeORM)

### Authentication & Authorization
- Verify authentication before protected operations
- Check user permissions for resource access
- Use secure session management (HttpOnly cookies)

### Input Validation
- Validate on server side (client validation is UX only)
- Use schema validation (Zod, Yup)
- Sanitize before storing or rendering

### Secret Management
- Use environment variables for all secrets
- Never commit .env files
- Rotate secrets regularly

### XSS Prevention
- Frameworks escape by default (React, Vue, Svelte)
- Avoid innerHTML, dangerouslySetInnerHTML
- Use Content Security Policy headers

## Response Pattern
When writing code:
1. Generate secure code by default
2. Flag security risks when they exist
3. Link to [OWASP](https://owasp.org/www-project-top-ten/) or [CWE](https://cwe.mitre.org/) for vulnerabilities
4. Provide secure alternatives
```

**For GitHub Copilot (.github/copilot-instructions.md):**

```markdown
# Security Requirements

## Database Operations
- Use parameterized queries only
- Example: db.query('SELECT * FROM users WHERE id = $1', [userId])
- Never concatenate user input into SQL

## Authentication
- Check auth status before protected operations
- Use secure session management

## Input Validation
- Validate all user input on server side
- Use schema validation libraries

## Secrets
- Use environment variables
- Never hardcode API keys or passwords

## XSS Prevention
- Use framework defaults (auto-escaping)
- Avoid innerHTML or dangerouslySetInnerHTML
```

These templates ensure every piece of AI-generated code follows security best practices. For specific vulnerabilities, see our guides on [SQL injection](/kb/security/vulnerabilities/sql-injection/), [XSS](/kb/security/vulnerabilities/xss/), and [hardcoded secrets](/kb/security/vulnerabilities/hardcoded-secrets/).

## Role-Based Instruction Templates

Different developer roles need different instruction sets. Here are complete templates for frontend, backend, and full-stack developers.

**Frontend Developer Template (React/Next.js):**

```markdown
# Frontend Development (React/Next.js)

## Stack
- React 19 / Next.js 15
- TypeScript (strict mode)
- Tailwind CSS
- State management: React Context / Zustand

## Code Preferences
- Functional components only
- Server components by default (Next.js)
- Client components for interactivity only
- TypeScript with explicit types

## Security
- Use framework defaults (React escapes by default)
- Avoid dangerouslySetInnerHTML
- Validate input on forms before submission
- Use HTTPS for API calls
- Implement Content Security Policy

## Response Style
- Complete components, not fragments
- Include TypeScript types
- Show imports and exports
```

**Backend Developer Template (Node.js/Python):**

```markdown
# Backend Development

## Stack
- Node.js (Express) / Python (FastAPI)
- PostgreSQL with Prisma/SQLAlchemy
- JWT authentication
- Deployed on Railway/Render

## Code Preferences
- RESTful API design
- Input validation on all endpoints
- TypeScript/type hints
- Structured error handling

## Security (Critical)
- Parameterized queries only (never string concatenation)
- Validate input with schemas (Zod/Pydantic)
- Hash passwords with bcrypt (12+ rounds)
- Use JWT with short expiry
- Rate limiting on auth endpoints
- CORS configuration
- Environment variables for secrets

## Response Style
- Complete endpoint examples
- Include error handling
- Show authentication middleware
```

**Full-Stack Developer Template (Combined):**

```markdown
# Full-Stack Development (Next.js + Supabase)

## Stack
- Next.js 15 (App Router, Server Actions)
- TypeScript (strict mode)
- Supabase (PostgreSQL, Auth, RLS)
- Tailwind CSS
- Deployed on Vercel

## Code Preferences
- Server components by default
- Server Actions for mutations
- Supabase RLS for authorization
- TypeScript with explicit types

## Security Requirements
Database:
- Use Supabase client with RLS enabled
- Parameterized queries only
- Example: supabase.from('users').select('*').eq('id', userId)

Authentication:
- Use Supabase Auth
- Check auth status in Server Actions
- Implement RLS policies on all tables

Input Validation:
- Validate with Zod schemas
- Server-side validation always

Secrets:
- Use environment variables
- Never commit .env.local

## Response Style
- Complete features (frontend + backend)
- Include RLS policies
- Show authentication checks
```

These templates cover 80% of common development scenarios. Customize based on your specific stack or requirements.

## Stack-Specific Instructions

For developers working with specific frameworks, here are optimized instruction sets.

**Next.js + TypeScript:**

```markdown
# Next.js 15 + TypeScript

## Conventions
- App Router (not Pages Router)
- Server components by default
- Use 'use client' only when necessary
- File-based routing

## Code Patterns
- Async server components
- Server Actions for mutations
- TypeScript with explicit return types
- Error boundaries for error handling

## Security
- Validate input in Server Actions
- Use environment variables (NEXT_PUBLIC_ for client-side)
- Implement middleware for auth checks
- Enable Content Security Policy

## Example Server Action
\`\`\`typescript
'use server'

export async function createUser(formData: FormData) {
  const schema = z.object({
    email: z.string().email(),
    name: z.string().min(1)
  })

  const data = schema.parse({
    email: formData.get('email'),
    name: formData.get('name')
  })

  // Use parameterized query
  await db.query('INSERT INTO users (email, name) VALUES ($1, $2)', [data.email, data.name])
}
\`\`\`
```

**Python + FastAPI:**

```markdown
# Python + FastAPI

## Stack
- FastAPI
- SQLAlchemy (PostgreSQL)
- Pydantic for validation
- JWT authentication

## Code Patterns
- Type hints everywhere
- Pydantic models for validation
- Dependency injection for auth
- Async endpoints

## Security
- Use SQLAlchemy ORM (parameterized by default)
- Validate with Pydantic models
- Hash passwords with bcrypt
- Use python-jose for JWT
- Environment variables via python-dotenv

## Example Endpoint
\`\`\`python
from fastapi import FastAPI, Depends
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session

class UserCreate(BaseModel):
    email: EmailStr
    name: str

@app.post("/users")
async def create_user(user: UserCreate, db: Session = Depends(get_db)):
    # Pydantic validates automatically
    # SQLAlchemy uses parameterized queries
    db_user = User(email=user.email, name=user.name)
    db.add(db_user)
    db.commit()
    return db_user
\`\`\`
```

**React + Node.js (Express):**

```markdown
# React + Node.js (Express)

## Frontend (React)
- Functional components
- TypeScript
- React Query for data fetching
- Tailwind CSS

## Backend (Express)
- TypeScript
- Prisma ORM
- JWT authentication
- Express Validator

## Security
Frontend:
- Use framework defaults (React escapes by default)
- Validate forms with Zod
- HTTPS for API calls

Backend:
- Parameterized queries via Prisma
- Validate input with express-validator
- Hash passwords with bcrypt
- Rate limiting on auth routes
- CORS configuration
- Environment variables

## Example API Route
\`\`\`typescript
import { body, validationResult } from 'express-validator'
import prisma from './prisma'

app.post('/users',
  body('email').isEmail(),
  body('name').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    // Prisma uses parameterized queries
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name
      }
    })

    res.json(user)
  }
)
\`\`\`
```

These stack-specific instructions ensure the AI generates idiomatic, secure code for your exact setup.

## Best Practices

Custom instructions are most effective when they're concise, pattern-focused, and regularly updated.

**Keep Instructions Concise:**
AI assistants have context limits. ChatGPT's custom instructions are capped at 1500 characters each. Focus on high-level patterns, not exhaustive rules. "Use parameterized queries" is better than listing every SQL operation.

**Focus on Patterns, Not Specifics:**
Instructions should define principles, not implementation details. "Validate user input with schemas" works across any framework. "Use Zod's z.string().email()" is too specific and limits the AI's ability to adapt.

**Update as You Learn:**
Encountering a new vulnerability? Add it to your instructions. Switched from Prisma to Drizzle? Update your stack section. Custom instructions should evolve with your knowledge and project requirements.

**Test Your Instructions:**
After setting custom instructions, test them with a new conversation. Ask the AI to generate code for common tasks (user authentication, database queries) and verify it follows your security requirements.

| Do | Don't |
|---|---|
| Use pattern-based rules ("parameterized queries") | List every SQL operation |
| Define security principles ("validate all input") | Provide exhaustive validation rules |
| Update when stack changes | Set once and forget |
| Test instructions regularly | Assume they're working |
| Keep under character limits | Write essays |

**Common Pitfall:** Over-specifying implementation details. "Use bcrypt with 12 rounds and SHA-256" is too rigid. "Hash passwords securely" gives the AI flexibility to use best practices.

For additional security guidance, scan your vibe coded projects with [VibeShip Scanner](https://scanner.vibeship.co) to identify which vulnerabilities your custom instructions should prioritize.

## FAQ

<FAQ>
  <details>
    <summary>Do custom instructions apply to all conversations?</summary>
    <div>
      Yes, custom instructions persist across all conversations in ChatGPT and within a specific project in Claude. For GitHub Copilot, instructions apply repository-wide to all developers using that repo. You can disable custom instructions temporarily in ChatGPT settings if needed, but they remain saved.
    </div>
  </details>

  <details>
    <summary>Can I have different custom instructions for different projects?</summary>
    <div>
      Yes. In Claude, create separate projects with different instructions (one for frontend, one for backend). In ChatGPT, you can manually toggle custom instructions on/off or update them between projects. For GitHub Copilot, each repository has its own <code>.github/copilot-instructions.md</code> file, so instructions are automatically project-specific.
    </div>
  </details>

  <details>
    <summary>Will custom instructions slow down AI responses?</summary>
    <div>
      No. Custom instructions are processed as part of the system prompt and don't add noticeable latency. They consume some of the AI's context window (ChatGPT has a large context window), but the trade-off is worth it for consistent, secure code generation. Keep instructions under 1500 characters to stay within limits.
    </div>
  </details>

  <details>
    <summary>What if my custom instructions conflict with a specific prompt?</summary>
    <div>
      Specific prompts generally override custom instructions. If you ask ChatGPT to "use string concatenation for SQL" despite instructions saying "use parameterized queries," it will follow your explicit request. Custom instructions act as defaults, not hard constraints. Claude behaves similarly—direct prompts take precedence.
    </div>
  </details>

  <details>
    <summary>Should I include security requirements in custom instructions even if I'm experienced?</summary>
    <div>
      Yes. Even experienced developers benefit from AI assistants that flag security issues by default. According to [Georgetown CSET research](https://cset.georgetown.edu/article/measuring-the-impact-of-ai-code-generation-tools-on-security/), 76% of developers use AI coding tools, but only 55% of AI-generated code is secure. Security-first instructions act as a safeguard against common vulnerabilities in vibe coded projects.
    </div>
  </details>
</FAQ>

## Related Resources

**AI Tool Security:**
- [Cursor Security Guide](/kb/vibe-coding-tools/cursor/) - Custom instructions for Cursor IDE
- [Claude Code Security](/kb/vibe-coding-tools/claude-code/) - Using CLAUDE.md files
- [AI Coding Tools Comparison](/kb/vibe-coding-tools/) - Security across all tools

**Common Vulnerabilities to Prevent:**
- [SQL Injection](/kb/security/vulnerabilities/sql-injection/) - Why parameterized queries matter
- [Cross-Site Scripting (XSS)](/kb/security/vulnerabilities/xss/) - Output escaping requirements
- [Hardcoded Secrets](/kb/security/vulnerabilities/hardcoded-secrets/) - Environment variable best practices
- [Authentication Bypass](/kb/security/vulnerabilities/missing-authentication/) - Auth check patterns

**Security Scanning:**
- [VibeShip Scanner](https://scanner.vibeship.co) - Scan your vibe coded projects for vulnerabilities
- [Security Checklists](/kb/security/checklists/) - Comprehensive security reviews

---

**Next Steps:**
1. Copy a template from this guide
2. Customize for your stack
3. Test with a new conversation
4. Scan your existing code with [VibeShip Scanner](https://scanner.vibeship.co)
5. Update instructions based on findings
