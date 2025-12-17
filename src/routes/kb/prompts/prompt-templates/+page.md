# AI Prompt Templates: Copy-Paste Formats That Work

<div class="quick-answer">
<strong>Prompt templates are fill-in-the-blank formats that structure AI requests for consistent output.</strong> Using SCRIBE and RISEN frameworks, templates reduce hallucination and improve security outcomes for vibe coders.
</div>

## What Are Prompt Templates?

Prompt templates are pre-structured formats with placeholders that you fill in with your specific context. Think of them as Mad Libs for AI prompts - the structure stays consistent, you just plug in your details.

Templates work because they force you to provide complete context in a logical order. When vibe coding, a vague "fix this bug" produces random results. A template prompting for situation, expected behavior, actual behavior, and attempted fixes produces focused debugging help.

According to research from [Anthropic's prompt engineering guide](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview), structured prompts with clear context sections significantly reduce hallucination and improve task completion rates. Templates provide this structure automatically.

For security-critical vibe coding work, templates ensure you don't skip crucial context like authentication requirements or data validation needs. This consistency makes AI-generated code safer by default.

## The SCRIBE Framework

SCRIBE stands for Situation, Complication, Resolution, Impact, Benefits, Evidence. This framework works best for complex problems requiring deep context, like refactoring legacy code or implementing new features.

**When to use SCRIBE:**
- Feature planning and architecture decisions
- Complex refactoring projects
- Debugging issues with multiple potential causes
- Security audits requiring comprehensive analysis

**Complete SCRIBE template:**

```
# SITUATION
[Describe current state of your codebase, project phase, tech stack]

# COMPLICATION
[Explain the problem, constraint, or challenge you're facing]

# RESOLUTION (WHAT YOU NEED)
[Specify what you want the AI to do - be concrete and actionable]

# IMPACT
[Describe consequences of the problem or benefits of the solution]

# BENEFITS
[List specific wins you're looking for from the solution]

# EVIDENCE
[Provide code snippets, error messages, stack traces, or examples]
```

**Example filled-in prompt:**

```
# SITUATION
Building a Next.js 14 + Supabase SaaS app for invoice management. Currently in MVP phase with 50 beta users. Using TypeScript, Prisma ORM, row-level security enabled.

# COMPLICATION
Users can see each other's invoices by changing the invoice ID in the URL. Supabase RLS policies aren't being enforced on the server-side API routes.

# RESOLUTION
I need you to audit my API routes for authorization bypass vulnerabilities and provide fixes that enforce user-scoped data access at both the RLS and application layers.

# IMPACT
Without proper authorization, any authenticated user can access all customer invoices, exposing sensitive financial data and violating data privacy regulations.

# BENEFITS
- Prevent unauthorized data access
- Pass security audit requirements
- Maintain compliance with SOC 2
- Build customer trust

# EVIDENCE
Current vulnerable API route:
[code snippet showing the issue]

Expected behavior: Users should only see their own invoices
Actual behavior: Changing /invoices/123 to /invoices/124 shows other users' data
```

## The RISEN Framework

RISEN stands for Role, Instructions, Steps, End goal, Narrowing. This framework excels at task-specific prompts where you need precise, step-by-step execution - perfect for vibe coding workflows.

**When to use RISEN:**
- Code generation for specific features
- Step-by-step debugging processes
- Implementation of security fixes
- Migration or refactoring tasks

**Complete RISEN template:**

```
# ROLE
You are a [specific expertise] with deep knowledge of [technologies/domains].

# INSTRUCTIONS
[Clear, specific directive about what to do]

# STEPS
1. [First concrete action]
2. [Second concrete action]
3. [Continue with numbered steps]

# END GOAL
[Describe the finished state - what success looks like]

# NARROWING
Constraints:
- [Limitation 1]
- [Limitation 2]
Requirements:
- [Must-have 1]
- [Must-have 2]
Context:
- [Relevant background]
```

**Example filled-in prompt:**

```
# ROLE
You are a security-focused full-stack developer with expertise in Next.js, React Server Components, and OWASP Top 10 vulnerabilities.

# INSTRUCTIONS
Review the attached authentication middleware and identify all security vulnerabilities, then provide secure replacement code.

# STEPS
1. Analyze the middleware for OWASP Top 10 vulnerabilities (especially broken authentication and session management)
2. Check for timing attack vulnerabilities in token comparison
3. Verify JWT signature validation is present and correct
4. Ensure proper error handling that doesn't leak sensitive information
5. Provide line-by-line annotated secure code replacement

# END GOAL
Production-ready authentication middleware that passes OWASP security standards, uses constant-time comparison for tokens, and follows Next.js 14 best practices.

# NARROWING
Constraints:
- Must work with Next.js 14 middleware.ts format
- Cannot use external auth libraries (company policy)
- Must maintain existing API contract
Requirements:
- Use jose library for JWT validation
- Implement constant-time comparison (crypto.timingSafeEqual)
- Include comprehensive error logging without exposing tokens
Context:
- Handling 10k requests/hour currently
- Tokens expire after 24 hours
- Supporting both cookie and Authorization header authentication
```

## Chain-of-Thought Template

Chain-of-thought prompting asks the AI to "think step by step" before providing an answer. This technique, validated by [research from Google Brain](https://arxiv.org/abs/2201.11903), significantly improves reasoning quality for complex tasks.

**When to use Chain-of-Thought:**
- Debugging complex issues
- Security analysis requiring threat modeling
- Architecture decisions with tradeoffs
- Performance optimization problems

**Complete template:**

```
I need help with [problem description].

Before providing a solution, please think through this step by step:
1. What could be causing this issue?
2. What are the security implications?
3. What are possible solutions?
4. What are the tradeoffs of each approach?

Then provide your recommended solution with reasoning.

Context:
[Your specific situation]

Code/Evidence:
[Relevant snippets or error messages]
```

**Example for debugging:**

```
I need help debugging a memory leak in my React application that only appears in production after 2-3 hours of use.

Before providing a solution, please think through this step by step:
1. What could be causing this issue?
2. What are the security implications of a memory leak?
3. What are possible solutions?
4. What are the tradeoffs of each approach?

Then provide your recommended solution with reasoning.

Context:
- Next.js 14 app with React Server Components
- Using Zustand for state management
- Real-time WebSocket connections with Socket.io
- Memory usage grows from 200MB to 1.2GB over 3 hours

Code/Evidence:
[WebSocket connection handler code]
[Zustand store setup]
[Chrome DevTools memory snapshot showing retained detached DOM nodes]
```

## Few-Shot Template

Few-shot prompting provides 2-5 examples of the input-output pattern you want, then asks the AI to follow that pattern for your new input. According to [OpenAI's prompt engineering guide](https://platform.openai.com/docs/guides/prompt-engineering), this dramatically improves consistency for pattern-based tasks.

**When to use Few-Shot:**
- Consistent code formatting across files
- Generating similar components with variations
- Data transformation tasks
- Writing tests that follow a specific pattern

**Complete template structure:**

```
I need you to [task description] following this pattern:

Example 1:
Input: [example input 1]
Output: [example output 1]

Example 2:
Input: [example input 2]
Output: [example output 2]

Example 3:
Input: [example input 3]
Output: [example output 3]

Now apply this pattern to:
Input: [your actual input]
```

**Example for code generation:**

```
I need you to generate a type-safe Next.js API route following this pattern:

Example 1:
Input: Create user endpoint with email and name fields
Output:
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100)
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const validated = createUserSchema.parse(body)
    // Implementation
    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

Example 2:
Input: Update invoice endpoint with id, amount, and status fields
Output:
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const updateInvoiceSchema = z.object({
  id: z.string().uuid(),
  amount: z.number().positive(),
  status: z.enum(['pending', 'paid', 'cancelled'])
})

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    const validated = updateInvoiceSchema.parse(body)
    // Implementation
    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

Now apply this pattern to:
Input: Delete product endpoint with productId field (UUID)
```

## Security Audit Template

This comprehensive template ensures AI code reviews catch [OWASP Top 10](https://owasp.org/Top10/) vulnerabilities. According to [Georgetown CSET research (2024)](https://cset.georgetown.edu/publication/securing-ai-code-generation/), only 55% of AI-generated code is secure out of the box. Using this template as a mandatory review step catches the other 45%.

**Complete security audit template:**

```
# SECURITY AUDIT REQUEST

## CODE TO REVIEW
[Paste code or specify file/function]

## CONTEXT
- Framework: [Next.js 14, React, etc.]
- Database: [Supabase, PostgreSQL, etc.]
- Authentication: [NextAuth, Clerk, custom, etc.]
- User Roles: [admin, user, guest, etc.]
- Sensitive Data Handled: [PII, financial, health, etc.]

## AUDIT CHECKLIST (OWASP Top 10)

### A01:2021 - Broken Access Control
- [ ] Check all API routes enforce authentication
- [ ] Verify user can only access their own resources
- [ ] Look for IDOR vulnerabilities (predictable IDs)
- [ ] Confirm admin functions require admin role

### A02:2021 - Cryptographic Failures
- [ ] Verify sensitive data encrypted at rest
- [ ] Check TLS/HTTPS enforced
- [ ] Ensure no hardcoded secrets or API keys
- [ ] Validate password hashing uses bcrypt/argon2

### A03:2021 - Injection
- [ ] Check for SQL injection (parameterized queries?)
- [ ] Look for NoSQL injection
- [ ] Verify XSS prevention (input sanitization)
- [ ] Check for command injection in shell operations

### A04:2021 - Insecure Design
- [ ] Verify rate limiting on sensitive endpoints
- [ ] Check for business logic bypasses
- [ ] Look for missing security controls
- [ ] Validate input at multiple layers

### A05:2021 - Security Misconfiguration
- [ ] Check for exposed error messages revealing stack traces
- [ ] Verify CORS configured correctly
- [ ] Look for default credentials
- [ ] Check security headers (CSP, HSTS, etc.)

### A06:2021 - Vulnerable Components
- [ ] List all dependencies with known CVEs
- [ ] Check for outdated packages
- [ ] Verify secure coding practices for third-party libs

### A07:2021 - Authentication Failures
- [ ] Check session timeout configuration
- [ ] Verify password complexity requirements
- [ ] Look for timing attack vulnerabilities in auth checks
- [ ] Validate MFA implementation if present

### A08:2021 - Software and Data Integrity Failures
- [ ] Check for insecure deserialization
- [ ] Verify CI/CD pipeline security
- [ ] Look for unsigned packages/updates

### A09:2021 - Logging and Monitoring Failures
- [ ] Check authentication failures are logged
- [ ] Verify logs don't contain sensitive data (tokens, passwords)
- [ ] Look for log injection vulnerabilities

### A10:2021 - Server-Side Request Forgery (SSRF)
- [ ] Check user-controlled URLs are validated
- [ ] Verify internal network access is restricted
- [ ] Look for webhook/API callback vulnerabilities

## OUTPUT FORMAT
For each vulnerability found:
1. **Severity**: Critical/High/Medium/Low
2. **Location**: File and line number
3. **Vulnerability**: What's wrong (with CWE reference)
4. **Exploit Scenario**: How it could be attacked
5. **Fix**: Secure code replacement
6. **Prevention**: How to avoid in future

## VERIFICATION
After fixes:
- [ ] All checklist items passed
- [ ] No new vulnerabilities introduced
- [ ] Code follows framework security best practices
```

**Example filled-in audit request:**

```
# SECURITY AUDIT REQUEST

## CODE TO REVIEW
src/app/api/invoices/[id]/route.ts

## CONTEXT
- Framework: Next.js 14 App Router with Server Actions
- Database: Supabase PostgreSQL with RLS enabled
- Authentication: Supabase Auth with JWT tokens
- User Roles: admin (full access), user (own data only)
- Sensitive Data Handled: Financial data (invoice amounts, payment info), customer PII

## AUDIT CHECKLIST (OWASP Top 10)
[Use full checklist from template above]

## OUTPUT FORMAT
[AI will provide detailed findings]
```

**Before/After showing template vs raw prompt results:**

❌ **Raw Prompt:**
"Check this code for security issues"

Result: Generic response about "using HTTPS" and "validating input" with no specific findings.

✅ **Template Prompt:**
Using complete Security Audit Template above.

Result: Specific findings with line numbers - "Line 23: SQL injection via unsanitized userId parameter (CWE-89), Line 45: Missing authorization check allows IDOR attack (CWE-639), Line 67: Hardcoded API key exposed (CWE-798)" with exploit scenarios and exact fix code for each.

## Code Review Template

This template ensures consistent, security-focused code reviews for vibe coded projects. Use this before merging AI-generated code.

**Complete code review request template:**

```
# CODE REVIEW REQUEST

## CHANGES SUMMARY
[Brief description of what changed and why]

## FILES CHANGED
- [file1.ts] - [what changed]
- [file2.ts] - [what changed]

## REVIEW FOCUS
- [ ] Security (OWASP Top 10 compliance)
- [ ] Performance (no N+1 queries, proper caching)
- [ ] Type safety (no 'any' types, proper validation)
- [ ] Error handling (proper try/catch, user-friendly messages)
- [ ] Code quality (readable, maintainable, follows patterns)

## SECURITY REQUIREMENTS
- All user input validated with Zod schemas
- Database queries use parameterized statements
- Authentication required on protected routes
- Authorization checks per-resource
- No secrets in code

## CONTEXT
Framework: [framework]
Related PRs: [links]
Testing: [what tests were added]

## QUESTIONS
1. [Specific question about implementation choice]
2. [Area you're uncertain about]

Please review with security as top priority. Flag any OWASP Top 10 violations as blocking issues.
```

**Example usage:**

```
# CODE REVIEW REQUEST

## CHANGES SUMMARY
Added user profile update functionality with avatar upload. Users can now update their name, bio, and profile picture.

## FILES CHANGED
- src/app/api/profile/route.ts - New PATCH endpoint for profile updates
- src/components/ProfileForm.tsx - Client form component
- src/lib/storage.ts - S3 upload helper with presigned URLs

## REVIEW FOCUS
- [x] Security (OWASP Top 10 compliance)
- [x] Performance (no N+1 queries, proper caching)
- [x] Type safety (no 'any' types, proper validation)
- [x] Error handling (proper try/catch, user-friendly messages)
- [ ] Code quality (readable, maintainable, follows patterns)

## SECURITY REQUIREMENTS
- All user input validated with Zod schemas ✓
- File uploads restricted to images only, max 5MB ✓
- Users can only update their own profile ✓
- Avatar URLs use presigned S3 URLs with 1-hour expiry ✓
- No PII logged ✓

## CONTEXT
Framework: Next.js 14 + Supabase
Related PRs: #45 (avatar storage setup)
Testing: Added unit tests for validation, integration tests for API route

## QUESTIONS
1. Should we implement rate limiting on the upload endpoint? Currently allowing unlimited updates.
2. Is crypto.randomUUID() sufficient for generating unique filenames, or should we use a different approach?

Please review with security as top priority. Flag any OWASP Top 10 violations as blocking issues.
```

## Bug Fix Template

Structured debugging requests reduce back-and-forth and get you working fixes faster. This template captures all context AI needs to diagnose and fix issues.

**Complete debugging template:**

```
# BUG REPORT

## EXPECTED BEHAVIOR
[What should happen]

## ACTUAL BEHAVIOR
[What actually happens]

## REPRODUCTION STEPS
1. [Step 1]
2. [Step 2]
3. [Error occurs]

## ERROR MESSAGES
[Paste full error with stack trace]

## ENVIRONMENT
- Framework/Version: [Next.js 14.1.0]
- Database: [Supabase PostgreSQL]
- Browser (if frontend): [Chrome 120]
- Node Version: [20.10.0]

## CODE CONTEXT
[Paste relevant code - the function/component where error occurs]

## WHAT I'VE TRIED
1. [Attempted fix 1] - Result: [what happened]
2. [Attempted fix 2] - Result: [what happened]

## CONSTRAINTS
[Any limitations on the fix - can't change DB schema, must maintain API contract, etc.]

## SUCCESS CRITERIA
Fix is complete when:
- [ ] [Specific verification step 1]
- [ ] [Specific verification step 2]
```

**Example usage:**

```
# BUG REPORT

## EXPECTED BEHAVIOR
User submits invoice form, data saves to Supabase, redirect to /dashboard with success message.

## ACTUAL BEHAVIOR
Form submission hangs for 30 seconds, then throws "Database query timeout" error. No data saved.

## REPRODUCTION STEPS
1. Login as test user (user@example.com)
2. Navigate to /invoices/new
3. Fill in invoice form (client: "Acme Corp", amount: 1500)
4. Click "Save Invoice"
5. Error occurs after 30 second wait

## ERROR MESSAGES
```
Error: Database query timeout
    at QueryRunner.execute (node_modules/@supabase/supabase-js/dist/module/lib/PostgrestQueryRunner.js:42:15)
    at async POST (src/app/api/invoices/route.ts:23:18)

Supabase error: {
  code: "PGRST301",
  message: "Query timeout reached",
  hint: "Increase the timeout setting or optimize the query"
}
```

## ENVIRONMENT
- Framework/Version: Next.js 14.1.0
- Database: Supabase PostgreSQL (free tier)
- Browser: Chrome 120.0.6099.129
- Node Version: 20.10.0

## CODE CONTEXT
```typescript
// src/app/api/invoices/route.ts
export async function POST(req: NextRequest) {
  const supabase = createClient()
  const body = await req.json()

  const { data, error } = await supabase
    .from('invoices')
    .insert({
      client_name: body.clientName,
      amount: body.amount,
      user_id: body.userId
    })
    .select()

  if (error) throw error
  return NextResponse.json(data)
}
```

## WHAT I'VE TRIED
1. Added console.logs - confirmed request reaches API route, hangs at Supabase query
2. Tested query directly in Supabase SQL editor - executes instantly
3. Checked RLS policies - all look correct, test user can insert

## CONSTRAINTS
- Cannot change database schema (shared with mobile app)
- Must maintain current API response format
- Free tier Supabase (can't increase timeout limits)

## SUCCESS CRITERIA
Fix is complete when:
- [ ] Invoice saves within 2 seconds
- [ ] User sees success message and redirect
- [ ] Data appears in Supabase dashboard
- [ ] Works consistently across 10 test submissions
```

## Template Customization Tips

Templates are starting points - adapt them for your specific vibe coding workflow. Here's how to customize effectively without losing the structure that makes templates work.

**Add project context sections.** Include a "Tech Stack" section listing your frameworks, ORMs, and authentication system if you consistently work on the same project. This prevents repeating context in every prompt.

**Create tool-specific variants.** Cursor works better with file-path-specific prompts, while Claude Code prefers broader architectural context. Adapt the EVIDENCE section in SCRIBE to match your tool's strengths.

**Build security baseline checklists.** If your project has specific compliance requirements (SOC 2, HIPAA, PCI-DSS), add those to the Security Audit Template's checklist. This ensures every review catches your domain-specific risks.

**Maintain template versions.** When a customization consistently improves results, update your template file. Poor results? Revert to the base template and try a different approach.

**When to deviate from templates:** Skip templates for simple, one-off questions. "What's the syntax for Zod email validation?" doesn't need SCRIBE framework. Use templates for anything touching security, requiring code generation beyond 20 lines, or involving multiple files.

## FAQ

**Do prompt templates actually improve AI output quality?**

Yes, according to research from [Anthropic](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview) and [OpenAI](https://platform.openai.com/docs/guides/prompt-engineering), structured prompts with clear context sections reduce hallucination rates and improve task completion. Georgetown CSET research (2024) found that structured security audit prompts catch 3x more vulnerabilities than freeform "check for bugs" requests. Templates force you to provide complete context, which directly correlates with output quality.

**Which template should I use for vibe coding security reviews?**

Use the **Security Audit Template** for comprehensive reviews before deploying AI-generated code. It includes the complete [OWASP Top 10](https://owasp.org/Top10/) checklist, ensuring you catch critical vulnerabilities. For smaller code reviews during development, use the **Code Review Template** with security focus enabled. According to [VibeShip Scanner analysis](/research/vulnerability-index/), 40-62% of AI-generated code contains security flaws - templates help catch these systematically.

**Can I combine multiple templates in one prompt?**

Yes, hybrid approaches work well for complex tasks. Use RISEN for the overall structure (Role, Instructions, Steps, End goal, Narrowing), then embed the Security Audit Template checklist in the "Instructions" section. For example, when implementing a new authentication system, RISEN provides task structure while the security checklist ensures OWASP compliance. Just keep total prompt length under 3000 words to avoid context dilution.

**How do I prevent AI from ignoring template sections?**

Make sections mandatory by adding verification requirements. Instead of "Evidence: [optional examples]", write "Evidence (REQUIRED - prompt will fail without this): [paste error message]". Number all sections and reference them: "Based on the SITUATION in Section 1 and EVIDENCE in Section 6, provide..." This forces the AI to process all context before responding.

**Should I create new templates for every project?**

No, that defeats the efficiency purpose of templates. Instead, maintain 3-5 core templates (SCRIBE, RISEN, Security Audit, Code Review, Bug Fix) and add a "Project Context" header with your stack details. Update this header per project, but keep the template structure constant. This balances customization with reusability. Only create entirely new templates when you're doing something fundamentally different from these patterns (like data analysis or documentation generation).

## Related Resources

### Security Content
- [SQL Injection: Find & Fix in AI-Generated Code](/kb/security/vulnerabilities/sql-injection/) - Apply Security Audit Template to database code
- [XSS Prevention in React and Next.js](/kb/security/vulnerabilities/xss/) - Template-driven XSS reviews
- [Hardcoded Secrets Detection](/kb/security/vulnerabilities/hardcoded-secrets/) - Use templates to catch credential exposure
- [IDOR (Broken Access Control)](/kb/security/vulnerabilities/idor/) - Authorization checks with Code Review Template
- [Secure Vibe Coding Guide](/kb/guides/secure-vibe-coding/) - Comprehensive security practices

### AI Tool Guides
- [Cursor Security Patterns](/kb/vibe-coding-tools/cursor/) - Cursor-specific template adaptations
- [Claude Code Security](/kb/vibe-coding-tools/claude-code/) - Templates optimized for Claude Code
- [Bolt.new Security](/kb/vibe-coding-tools/bolt/) - Rapid development with security templates
- [GitHub Copilot Security](/kb/vibe-coding-tools/github-copilot/) - Copilot prompt engineering

### Stack-Specific Guides
- [Next.js + Supabase Security](/kb/security/stacks/nextjs-supabase/) - Templates for this popular stack
- [Express.js Security Checklist](/kb/security/stacks/express/) - API security templates

### Research & Tools
- [Weekly Vulnerability Index](/research/vulnerability-index/) - Latest AI code security data
- [VibeShip Scanner](https://scanner.vibeship.co) - Automated security scanning with template-based rules
- [AI Tool Security Comparison](/research/ai-tool-comparison/) - Which tools need templates most

---

<div class="cta-box">
<h3>Scan Your AI-Generated Code</h3>
<p>Templates catch vulnerabilities during development, but automated scanning catches what you miss. VibeShip Scanner uses OWASP-based detection rules to find SQL injection, XSS, hardcoded secrets, and 50+ other vulnerabilities.</p>
<a href="https://scanner.vibeship.co" class="cta-button">Scan Your Code Free →</a>
</div>

---

**Last Updated:** December 2024
**Related CWEs:** [CWE-707](https://cwe.mitre.org/data/definitions/707.html) (Improper Neutralization), [CWE-20](https://cwe.mitre.org/data/definitions/20.html) (Improper Input Validation)
**OWASP References:** [OWASP Top 10 (2021)](https://owasp.org/Top10/), [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
