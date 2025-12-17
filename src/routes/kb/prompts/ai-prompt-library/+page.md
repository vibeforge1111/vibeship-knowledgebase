---
title: "AI Prompt Library: 100+ Copy-Paste Prompts for Developers | VibeShip"
description: "Complete collection of AI prompts for debugging, refactoring, testing, and security. Copy-paste ready for Cursor, Claude Code, ChatGPT, and Copilot."
keywords: ["ai prompts", "developer prompts", "vibe coding prompts", "cursor prompts", "chatgpt prompts", "code debugging prompts", "security audit prompts"]
---

<script>
  import QuickAnswer from '$lib/components/QuickAnswer.svelte';
  import CodeBlock from '$lib/components/CodeBlock.svelte';
  import PromptBox from '$lib/components/PromptBox.svelte';
  import InternalLink from '$lib/components/InternalLink.svelte';
  import ExternalLink from '$lib/components/ExternalLink.svelte';
  import FAQSection from '$lib/components/FAQSection.svelte';
</script>

# AI Prompt Library: 100+ Copy-Paste Prompts for Developers

<QuickAnswer>
<strong>This library contains 100+ production-ready AI prompts for developers.</strong> Categories include debugging, refactoring, testing, security audits, code generation, and documentation. All prompts are copy-paste ready and work with Cursor, Claude Code, ChatGPT, and GitHub Copilot.
</QuickAnswer>

## What Is an AI Prompt Library?

An AI prompt library is a curated collection of pre-written instructions you can use with AI coding tools to accomplish specific development tasks. Instead of typing the same instructions repeatedly, you copy a tested prompt and customize it for your project. This library focuses on security-conscious vibe coding—giving you prompts that help you build fast while staying secure.

Unlike generic prompt collections, every prompt here includes security considerations. When you ask AI to generate code, refactor functions, or create tests, you're also checking for vulnerabilities like SQL injection, XSS, and authentication issues. According to research from Georgetown's Center for Security and Emerging Technology, only [55% of AI-generated code is secure](https://cset.georgetown.edu/publication/securing-ai-generated-code/), making security-aware prompts essential.

This library works with all major AI coding tools: Cursor, Claude Code (Anthropic), ChatGPT (OpenAI), GitHub Copilot, Bolt, v0, and Replit. The prompts are framework-agnostic unless specified, so they adapt to JavaScript, TypeScript, Python, Go, or whatever stack you're using.

## How to Use This Library

Copy any prompt below, paste it into your AI tool's chat or command interface, and customize the bracketed sections for your specific needs. For example, `[function name]` becomes `processPayment` or `validateUserInput`.

**Basic workflow:**
1. **Find the category** that matches your task (debugging, security, testing, etc.)
2. **Copy the entire prompt** - don't paraphrase or shorten
3. **Replace bracketed placeholders** with your actual code, file paths, or requirements
4. **Run in your AI tool** and iterate based on the output

**Tool compatibility notes:**
- **Cursor:** Use prompts in the chat panel or as Composer instructions
- **Claude Code:** Paste directly into the CLI or web interface
- **ChatGPT:** Works in both ChatGPT-4 and o1 models
- **GitHub Copilot:** Use in Copilot Chat within VS Code/IntelliJ
- **Bolt/v0/Replit:** Paste as initial project instructions or during development

Most prompts work instantly, but complex tasks (like security audits) may need follow-up questions. Let the AI guide you through the process.

## Debugging Prompts

Debugging AI-generated code requires different strategies than traditional debugging because AI tools sometimes introduce subtle logic errors or edge case failures that aren't immediately obvious. These prompts help you systematically identify root causes.

### Universal Debug Prompt

<PromptBox title="Universal Debug Prompt">
```
Analyze this error and help me debug it:

[PASTE ERROR MESSAGE AND STACK TRACE]

Here's the relevant code:
[PASTE CODE THAT TRIGGERED THE ERROR]

Expected behavior: [DESCRIBE WHAT SHOULD HAPPEN]
Actual behavior: [DESCRIBE WHAT IS HAPPENING]

1. Explain what's causing this error in plain English
2. Show me the exact line(s) causing the problem
3. Provide a fix with before/after code
4. Check for related issues that might cause this same error elsewhere
```
</PromptBox>

### Error Analysis Prompt

<PromptBox title="Error Analysis Prompt">
```
I'm getting this error repeatedly: [ERROR MESSAGE]

Analyze this error and tell me:
1. Root cause (not just symptoms)
2. Why this error happens in [framework/language]
3. Common scenarios that trigger this
4. How to prevent it in the future
5. Check my code for other places this pattern might exist

Here's my code:
[PASTE CODE]
```
</PromptBox>

### Stack Trace Interpretation Prompt

<PromptBox title="Stack Trace Interpretation">
```
Interpret this stack trace and walk me through what happened:

[PASTE FULL STACK TRACE]

Project context:
- Framework: [e.g., Next.js 14, Express, FastAPI]
- Database: [e.g., Postgres, MongoDB]
- Key libraries: [e.g., Prisma, React Query]

Explain:
1. What sequence of events led to this error?
2. Which file and function should I focus on?
3. What data or state likely caused this?
4. Show me a fix with code
```
</PromptBox>

### TypeScript Error Prompt

<PromptBox title="TypeScript Error Prompt">
```
I'm getting this TypeScript error: [ERROR MESSAGE]

Code:
[PASTE CODE]

Fix this error by:
1. Explaining what TypeScript is complaining about
2. Showing the type mismatch or inference issue
3. Providing the correct type definition
4. Suggesting better type patterns to avoid this

Maintain strict type safety - no `any` types.
```
</PromptBox>

### Race Condition Debugger

<PromptBox title="Race Condition Debugger">
```
I suspect a race condition in this code:

[PASTE CODE WITH ASYNC/AWAIT OR PROMISES]

This code sometimes works and sometimes fails. Help me:
1. Identify potential race conditions
2. Explain the timing issue causing intermittent failures
3. Fix it with proper async/await patterns
4. Add safeguards to prevent race conditions
5. Check for other timing-dependent bugs
```
</PromptBox>

### API Error Debugger

<PromptBox title="API Error Debugger">
```
My API call is failing with: [ERROR OR STATUS CODE]

Request details:
[PASTE FETCH/AXIOS CALL OR SHOW REQUEST]

Response:
[PASTE RESPONSE OR ERROR]

Debug this by:
1. Identifying the exact failure point (network, server, client)
2. Checking request headers, body, and auth
3. Validating response handling
4. Suggesting fixes with error handling
5. Checking for CORS, authentication, or rate limiting issues
```
</PromptBox>

## Refactoring Prompts

Refactoring vibe coded projects is crucial because AI tools often generate working code that's repetitive, poorly structured, or hard to maintain. These prompts help you clean up without breaking functionality.

### Code Cleanup Prompt

<PromptBox title="Code Cleanup Prompt">
```
Refactor this code to be cleaner and more maintainable:

[PASTE CODE]

Requirements:
1. Follow [language/framework] best practices
2. Eliminate code duplication (DRY principle)
3. Improve naming for clarity
4. Add helpful comments for complex logic
5. Maintain exact same functionality
6. Check for potential bugs or edge cases

Show before/after comparison.
```
</PromptBox>

### Performance Optimization Prompt

<PromptBox title="Performance Optimization">
```
Optimize this code for better performance:

[PASTE CODE]

Context:
- This code runs [frequency: e.g., on every page load, 1000x/sec]
- Current performance issue: [e.g., slow rendering, high memory usage]

Optimize by:
1. Identifying performance bottlenecks
2. Suggesting faster algorithms or data structures
3. Reducing unnecessary re-renders or re-computations
4. Adding memoization or caching where appropriate
5. Showing performance impact estimates

Maintain readability.
```
</PromptBox>

### DRY Principle Prompt

<PromptBox title="DRY Principle Prompt">
```
I have repeated code patterns across these files:

[PASTE CODE SNIPPETS OR DESCRIBE PATTERN]

Extract this into reusable functions/components:
1. Identify all repeated patterns
2. Create a shared utility, hook, or component
3. Show how to replace each instance with the shared code
4. Ensure type safety (if TypeScript)
5. Document the new utility with examples
```
</PromptBox>

### Readability Improvement Prompt

<PromptBox title="Readability Improvement">
```
Make this code more readable for other developers:

[PASTE CODE]

Improve by:
1. Breaking down complex functions into smaller ones
2. Using descriptive variable and function names
3. Adding comments that explain "why" not "what"
4. Simplifying nested logic or conditionals
5. Following [style guide: e.g., Airbnb, Google, Standard]

Show side-by-side before/after.
```
</PromptBox>

### React/Component Refactor Prompt

<PromptBox title="React Component Refactor">
```
Refactor this React component for better structure:

[PASTE COMPONENT CODE]

Refactor by:
1. Splitting large components into smaller ones
2. Extracting custom hooks for reusable logic
3. Optimizing re-renders (useMemo, useCallback, React.memo)
4. Improving props structure and prop drilling
5. Following React best practices (composition, single responsibility)

Maintain same functionality and UI.
```
</PromptBox>

### Database Query Optimization Prompt

<PromptBox title="Database Query Optimization">
```
Optimize this database query:

[PASTE QUERY OR ORM CODE]

Database: [e.g., PostgreSQL, MongoDB, MySQL]
ORM: [e.g., Prisma, Mongoose, TypeORM, or raw SQL]

Optimize by:
1. Identifying N+1 query problems
2. Adding appropriate indexes
3. Reducing data fetched (select only needed fields)
4. Using joins instead of multiple queries
5. Checking for SQL injection vulnerabilities

Show query execution plan insights.
```
</PromptBox>

## Testing Prompts

AI tools rarely generate tests automatically, and when they do, tests often miss edge cases or security scenarios. These prompts create comprehensive test coverage.

### Unit Test Generation Prompt

<PromptBox title="Unit Test Generation">
```
Generate unit tests for this function:

[PASTE FUNCTION CODE]

Testing framework: [e.g., Jest, Vitest, pytest, Go testing]

Generate tests that cover:
1. Happy path (expected inputs and outputs)
2. Edge cases (empty inputs, null, undefined, zero, negative numbers)
3. Error cases (invalid inputs, exceptions)
4. Boundary conditions (min/max values)
5. Security scenarios (injection attempts, XSS payloads if relevant)

Use descriptive test names and arrange-act-assert pattern.
```
</PromptBox>

### Integration Test Prompt

<PromptBox title="Integration Test Prompt">
```
Create integration tests for this API endpoint or feature:

[PASTE CODE OR DESCRIBE FEATURE]

Stack:
- Framework: [e.g., Next.js, Express, FastAPI]
- Database: [e.g., PostgreSQL, MongoDB]
- Auth: [e.g., JWT, OAuth, session cookies]

Test scenarios:
1. Successful authenticated request
2. Unauthenticated request (401)
3. Unauthorized request (403)
4. Invalid input validation (400)
5. Database errors or failures
6. Rate limiting (if applicable)

Show complete test file with setup and teardown.
```
</PromptBox>

### Edge Case Identification Prompt

<PromptBox title="Edge Case Identification">
```
Identify all edge cases for this code:

[PASTE CODE]

List edge cases that could break this code:
1. Input edge cases (empty, null, undefined, extreme values)
2. State edge cases (race conditions, async failures)
3. External dependency failures (API down, database timeout)
4. Security edge cases (malicious input, injection attempts)
5. Browser/environment edge cases (if frontend)

For each edge case, show:
- What could go wrong
- How to handle it
- Test case to verify the fix
```
</PromptBox>

### Test Coverage Prompt

<PromptBox title="Test Coverage Prompt">
```
Analyze test coverage for this module:

[PASTE MODULE CODE]

Current tests:
[PASTE EXISTING TESTS OR SAY "NO TESTS YET"]

Identify:
1. Uncovered code paths or branches
2. Missing test scenarios
3. Functions with no tests
4. Security scenarios not tested
5. Generate tests to achieve 80%+ coverage

Prioritize high-risk code paths.
```
</PromptBox>

### E2E Test Prompt

<PromptBox title="E2E Test Prompt">
```
Create end-to-end tests for this user flow:

User flow:
[DESCRIBE STEP-BY-STEP USER JOURNEY]

Testing tool: [e.g., Playwright, Cypress, Selenium]

Generate E2E tests that:
1. Cover the complete user journey
2. Test authentication flow
3. Verify UI elements and interactions
4. Check error states and validation messages
5. Test responsive behavior (if web app)
6. Include accessibility checks

Show complete test file with page object pattern.
```
</PromptBox>

### Snapshot Test Prompt

<PromptBox title="Snapshot Test Prompt">
```
Create snapshot tests for this UI component:

[PASTE COMPONENT CODE]

Framework: [e.g., React, Vue, Svelte]
Test tool: [e.g., Jest, Vitest with @testing-library]

Generate snapshot tests for:
1. Default state/props
2. All prop variations
3. Loading states
4. Error states
5. Empty states

Include visual regression test setup if using Storybook or Chromatic.
```
</PromptBox>

## Security Review Prompts

Security review prompts are this library's key differentiator. Vibe coding tools generate vulnerable code by default—these prompts help you catch issues before they reach production. Use these alongside <InternalLink href="/tools">VibeShip Scanner</InternalLink> for automated detection.

### SQL Injection Audit Prompt

<PromptBox title="SQL Injection Audit">
```
Audit this code for SQL injection vulnerabilities:

[PASTE CODE WITH DATABASE QUERIES]

Database: [e.g., PostgreSQL, MySQL, MongoDB]
ORM/Library: [e.g., Prisma, raw SQL, Mongoose]

Check for:
1. String concatenation in queries (vulnerable pattern)
2. User input directly in queries without sanitization
3. Dynamic WHERE clauses or ORDER BY
4. Stored procedures with concatenated input
5. ORM methods that allow raw queries

For each vulnerability:
- Show the vulnerable code
- Explain how it could be exploited
- Provide a secure fix using parameterized queries
- Show before/after code comparison

Reference: CWE-89, OWASP A03:2021 Injection
```
</PromptBox>

### XSS Vulnerability Scan Prompt

<PromptBox title="XSS Vulnerability Scan">
```
Scan this code for Cross-Site Scripting (XSS) vulnerabilities:

[PASTE FRONTEND CODE]

Framework: [e.g., React, Vue, vanilla JS, Svelte]

Check for:
1. dangerouslySetInnerHTML or v-html usage
2. Direct DOM manipulation with user input
3. Unescaped user data in templates
4. Unsafe use of eval() or Function()
5. innerHTML, outerHTML, or document.write with user data
6. URL parameters rendered without sanitization

For each vulnerability:
- Show the vulnerable pattern
- Explain the XSS attack vector
- Provide secure alternatives (sanitization, CSP)
- Reference framework-specific escaping mechanisms

Reference: CWE-79, OWASP A03:2021
```
</PromptBox>

### Authentication Review Prompt

<PromptBox title="Authentication Review">
```
Review this authentication implementation for security issues:

[PASTE AUTH CODE]

Auth method: [e.g., JWT, session cookies, OAuth, Supabase Auth]

Audit for:
1. Weak password requirements or missing validation
2. Missing rate limiting on login attempts
3. Insecure password storage (missing hashing, weak algorithms)
4. JWT secrets hardcoded or weak
5. Missing token expiration or refresh logic
6. Session fixation vulnerabilities
7. Missing CSRF protection
8. Insecure "remember me" implementation

For each issue:
- Explain the security risk
- Show the vulnerable code
- Provide a secure implementation
- Reference industry standards (OWASP, NIST)

Reference: CWE-287, OWASP A07:2021
```
</PromptBox>

### Secret Detection Prompt

<PromptBox title="Secret Detection">
```
Scan this codebase for hardcoded secrets and credentials:

[PASTE CODE OR DIRECTORY STRUCTURE]

Search for:
1. API keys, tokens, passwords in code
2. Database connection strings with credentials
3. AWS/Azure/GCP credentials
4. OAuth client secrets
5. Encryption keys or salts
6. Environment variables hardcoded instead of using .env
7. Secrets in comments or debug code
8. Private keys or certificates

For each secret found:
- Show the exact location
- Explain the risk if exposed
- Recommend secure alternatives (env vars, secrets manager)
- Provide migration steps to environment variables
- Check if already exposed in git history

Use patterns like: password, api_key, secret, token, credentials
Reference: CWE-798, OWASP A07:2021
```
</PromptBox>

### OWASP Top 10 Audit Prompt

<PromptBox title="OWASP Top 10 Audit">
```
Perform a comprehensive OWASP Top 10 security audit:

[PASTE CODE OR DESCRIBE APPLICATION]

Stack:
- Frontend: [framework]
- Backend: [framework]
- Database: [database]
- Auth: [auth method]

Audit against OWASP Top 10 (2021):
1. **A01: Broken Access Control** - Check for IDOR, missing authorization
2. **A02: Cryptographic Failures** - Check encryption, hashing, TLS
3. **A03: Injection** - Check SQL, NoSQL, command injection
4. **A04: Insecure Design** - Check business logic flaws
5. **A05: Security Misconfiguration** - Check default configs, debug mode
6. **A06: Vulnerable Components** - Check outdated dependencies
7. **A07: Authentication Failures** - Check auth implementation
8. **A08: Data Integrity Failures** - Check deserialization, CI/CD
9. **A09: Logging Failures** - Check insufficient logging
10. **A10: SSRF** - Check unvalidated URLs or webhooks

For each category:
- List specific findings
- Rate severity (Critical/High/Medium/Low)
- Provide fix recommendations
- Reference CWE IDs

Generate a security report summary.
Reference: https://owasp.org/Top10/
```
</PromptBox>

### Input Validation Prompt

<PromptBox title="Input Validation Audit">
```
Audit all user input validation in this code:

[PASTE CODE]

Check for:
1. Missing validation on API endpoints or forms
2. Client-side only validation (bypassed easily)
3. Weak regex patterns or incomplete validation
4. Type coercion vulnerabilities
5. Missing length limits (DoS risk)
6. Unvalidated file uploads
7. Missing sanitization before database or rendering
8. Whitelist vs blacklist approach (prefer whitelist)

For each input point:
- Show what's being validated (or not)
- Explain the vulnerability if validation is missing/weak
- Provide robust validation logic
- Include both client and server-side validation
- Add error messages for UX

Reference: CWE-20, OWASP A03/A04
```
</PromptBox>

### Authorization Check Prompt

<PromptBox title="Authorization Check">
```
Review this code for authorization vulnerabilities:

[PASTE CODE WITH API ENDPOINTS OR DATA ACCESS]

Check for:
1. IDOR (Insecure Direct Object Reference) - users accessing other users' data
2. Missing authorization checks on endpoints
3. Client-side authorization (easily bypassed)
4. Horizontal privilege escalation (user A accessing user B's data)
5. Vertical privilege escalation (user accessing admin functions)
6. Missing role-based access control (RBAC)
7. JWT/token validation issues

For each endpoint or data access point:
- Show the current authorization logic (or lack of it)
- Explain how it could be exploited
- Implement proper authorization checks
- Add ownership validation for resources
- Include test cases for unauthorized access attempts

Reference: CWE-639, OWASP A01:2021
```
</PromptBox>

### API Security Review Prompt

<PromptBox title="API Security Review">
```
Perform a security review of this API:

[PASTE API CODE OR OPENAPI SPEC]

Framework: [e.g., Express, FastAPI, Next.js API routes]

Audit for:
1. Missing authentication on sensitive endpoints
2. Lack of rate limiting (brute force, DoS)
3. Mass assignment vulnerabilities
4. Verbose error messages leaking info
5. CORS misconfiguration
6. Missing HTTPS enforcement
7. Insecure HTTP methods enabled (TRACE, OPTIONS)
8. No request size limits
9. Missing API versioning
10. Lack of input validation (see Input Validation prompt)

For each endpoint:
- Document security issues
- Rate severity
- Provide secure implementation
- Suggest middleware or guards

Reference: OWASP API Security Top 10
```
</PromptBox>

### Dependency Vulnerability Scan Prompt

<PromptBox title="Dependency Vulnerability Scan">
```
Analyze dependencies for known vulnerabilities:

[PASTE package.json, requirements.txt, go.mod, or Gemfile]

Check:
1. Outdated packages with known CVEs
2. Packages with high/critical severity issues
3. Transitive dependencies with vulnerabilities
4. Unmaintained packages (last update >2 years ago)
5. Packages with suspicious recent changes
6. License compatibility issues

For each vulnerable dependency:
- Show the CVE ID and severity (CVSS score)
- Explain the vulnerability
- Recommend safe version or alternative package
- Provide upgrade command
- Check for breaking changes in upgrade path

Tools to reference: npm audit, Snyk, Trivy, Dependabot
Reference: OWASP A06:2021
```
</PromptBox>

### CSRF Protection Check Prompt

<PromptBox title="CSRF Protection Check">
```
Check this code for CSRF (Cross-Site Request Forgery) vulnerabilities:

[PASTE FORM HANDLING OR STATE-CHANGING ENDPOINT CODE]

Framework: [e.g., Next.js, Express, Django]

Audit for:
1. Missing CSRF tokens on forms
2. State-changing GET requests (should be POST/PUT/DELETE)
3. Missing SameSite cookie attribute
4. Lack of origin/referer validation
5. Token validation on server side

For each state-changing action:
- Show current CSRF protection (or lack of it)
- Explain how CSRF attack would work
- Implement proper CSRF tokens
- Add SameSite=Strict or Lax to cookies
- Show before/after secure implementation

Reference: CWE-352, OWASP A01:2021
```
</PromptBox>

## Code Generation Prompts

Code generation prompts help you scaffold features quickly while maintaining quality and security. These prompts include security checks by default.

### Feature Implementation Prompt

<PromptBox title="Feature Implementation">
```
Implement this feature with complete, production-ready code:

Feature description:
[DESCRIBE FEATURE IN DETAIL]

Requirements:
- Framework: [e.g., Next.js 14, FastAPI, Rails]
- Database: [e.g., PostgreSQL with Prisma]
- Auth: [e.g., Supabase Auth, NextAuth]
- UI: [e.g., React with Tailwind]

Generate:
1. Frontend components with TypeScript types
2. API endpoints with validation and error handling
3. Database schema/migrations
4. Tests (unit and integration)
5. Security checks (auth, input validation, CSRF)
6. Error handling and logging
7. Documentation comments

Include:
- Type safety throughout
- Accessibility (ARIA, keyboard nav)
- Loading and error states
- Responsive design
```
</PromptBox>

### API Endpoint Prompt

<PromptBox title="API Endpoint Generator">
```
Create a secure API endpoint:

Endpoint: [METHOD] [PATH]
Purpose: [DESCRIBE WHAT IT DOES]

Framework: [e.g., Express, Next.js API routes, FastAPI]
Database: [e.g., PostgreSQL, MongoDB]

Requirements:
1. Input validation with Zod/Joi/Yup schema
2. Authentication check (return 401 if not authenticated)
3. Authorization check (return 403 if not authorized)
4. Rate limiting configuration
5. Error handling (try/catch, proper status codes)
6. Logging for debugging and security
7. Response with correct status codes and data structure

Generate:
- Route handler code
- Validation schema
- TypeScript types for request/response
- Integration tests
- OpenAPI/Swagger documentation
```
</PromptBox>

### Database Schema Prompt

<PromptBox title="Database Schema Generator">
```
Design a database schema for:

[DESCRIBE DATA REQUIREMENTS]

Database: [e.g., PostgreSQL, MySQL, MongoDB]
ORM: [e.g., Prisma, TypeORM, Mongoose, Drizzle]

Generate:
1. Complete schema with all tables/collections
2. Relationships (foreign keys, references)
3. Indexes for query performance
4. Constraints (unique, not null, check constraints)
5. Timestamps (createdAt, updatedAt)
6. Soft delete support (deletedAt) if needed
7. Migration files

Consider:
- Normalization (avoid redundancy)
- Query patterns and performance
- Data integrity
- Row-level security (if PostgreSQL/Supabase)
- Audit trails for sensitive data
```
</PromptBox>

### UI Component Prompt

<PromptBox title="UI Component Generator">
```
Create a reusable UI component:

Component: [NAME AND PURPOSE]

Framework: [e.g., React, Vue, Svelte]
Styling: [e.g., Tailwind, CSS Modules, styled-components]

Requirements:
1. TypeScript with strict props typing
2. Accessibility (ARIA labels, keyboard navigation)
3. Responsive design (mobile-first)
4. Loading state
5. Error state
6. Empty state (if applicable)
7. Dark mode support
8. Unit tests with Testing Library

Props:
[LIST EXPECTED PROPS]

Generate:
- Component code
- Props interface/type
- Storybook stories (if using Storybook)
- Tests
- Usage examples
```
</PromptBox>

### Form with Validation Prompt

<PromptBox title="Form with Validation">
```
Create a form with complete validation:

Form purpose: [e.g., user registration, checkout, settings]

Framework: [e.g., React Hook Form, Formik, Vue Formulate]
Validation: [e.g., Zod, Yup, Valibot]

Fields:
[LIST FIELDS WITH VALIDATION RULES]

Generate:
1. Form component with controlled inputs
2. Validation schema (client-side)
3. Server-side validation (API endpoint)
4. Error messages for each field
5. Submit handler with loading state
6. Success/error feedback to user
7. Accessibility (labels, ARIA, error announcements)
8. CSRF protection
9. Tests for validation logic

Include:
- Real-time validation (onBlur or onChange)
- Disabled submit button until valid
- Clear error states
- Password strength indicator (if password field)
```
</PromptBox>

### Webhook Handler Prompt

<PromptBox title="Webhook Handler">
```
Create a secure webhook handler:

Webhook source: [e.g., Stripe, GitHub, Slack]
Purpose: [WHAT THIS WEBHOOK DOES]

Framework: [e.g., Next.js, Express, FastAPI]

Generate:
1. Webhook endpoint route
2. Signature verification (HMAC, JWT, or provider-specific)
3. Payload validation
4. Idempotency handling (prevent duplicate processing)
5. Retry logic for failures
6. Logging for debugging
7. Error handling (return 200 even on error to prevent retries)
8. Background job processing (if heavy workload)

Security checks:
- Verify webhook signature before processing
- Validate payload structure
- Rate limiting
- IP whitelist (if provider supports it)

Reference provider docs: [LINK TO WEBHOOK DOCS]
```
</PromptBox>

## Documentation Prompts

Documentation prompts help you create clear, complete docs for your vibe coded projects. Good docs make your code maintainable and help others (or future you) understand what you built.

### README Generation Prompt

<PromptBox title="README Generator">
```
Generate a comprehensive README.md for this project:

[PASTE PROJECT CODE OR DESCRIBE PROJECT]

Stack:
- Frontend: [framework]
- Backend: [framework]
- Database: [database]
- Deployment: [platform]

Include in README:
1. Project title and description
2. Features list
3. Tech stack
4. Prerequisites
5. Installation steps (with exact commands)
6. Environment variables (.env.example)
7. Running locally (dev server)
8. Running tests
9. Deployment instructions
10. Project structure overview
11. Contributing guidelines
12. License

Use clear formatting:
- Badges for build status, version, license
- Code blocks for commands
- Screenshots or demo GIF (placeholder)
- Table of contents for long README
```
</PromptBox>

### API Documentation Prompt

<PromptBox title="API Documentation">
```
Document this API with complete reference:

[PASTE API CODE OR ENDPOINTS]

Generate documentation including:
1. Base URL and versioning
2. Authentication (how to get and use tokens)
3. Rate limits
4. Error codes and responses

For each endpoint:
- HTTP method and path
- Description of what it does
- Request parameters (path, query, body)
- Request headers (auth, content-type)
- Example request (curl and JavaScript)
- Response schema
- Example successful response (200)
- Error responses (400, 401, 403, 404, 500)
- Notes or caveats

Format: [OpenAPI/Swagger, Markdown, or Postman Collection]
```
</PromptBox>

### Code Comment Prompt

<PromptBox title="Code Commenting">
```
Add helpful comments to this code:

[PASTE CODE]

Comment style: [e.g., JSDoc, Python docstrings, Go doc comments]

Add comments that explain:
1. Function purpose and parameters (JSDoc style)
2. Complex algorithms or business logic (why, not what)
3. Edge cases or gotchas
4. Security considerations
5. Performance implications
6. TODOs for future improvements

Rules:
- Don't comment obvious code
- Focus on "why" not "what"
- Update existing comments if outdated
- Add examples for complex functions
- Include type information (if using JSDoc for TypeScript)
```
</PromptBox>

### Architecture Documentation Prompt

<PromptBox title="Architecture Documentation">
```
Document the architecture of this system:

[DESCRIBE SYSTEM OR PASTE RELEVANT CODE]

Create architecture documentation including:
1. High-level system overview (diagram in Mermaid or ASCII)
2. Component breakdown (frontend, backend, database, external services)
3. Data flow (how data moves through the system)
4. Authentication and authorization flow
5. Database schema overview
6. API structure and endpoints
7. Third-party integrations
8. Deployment architecture
9. Security measures
10. Performance considerations

Include:
- Mermaid diagrams for flows
- Decision rationale (why this architecture)
- Trade-offs made
- Future scalability considerations
```
</PromptBox>

### Changelog Generator Prompt

<PromptBox title="Changelog Generator">
```
Generate a CHANGELOG.md from these git commits or changes:

[PASTE GIT LOG OR DESCRIBE CHANGES]

Format using Keep a Changelog standard:
- Versions in descending order
- Dates in YYYY-MM-DD format
- Categories: Added, Changed, Deprecated, Removed, Fixed, Security

For each version:
[VERSION] - [DATE]
### Added
- [NEW FEATURE]

### Changed
- [MODIFICATION]

### Fixed
- [BUG FIX]

### Security
- [SECURITY IMPROVEMENT]

Reference: https://keepachangelog.com/
```
</PromptBox>

## Best Practices for Prompt Usage

Prompts work best when you customize them for your specific context and iterate based on results. Don't expect perfect output on the first try—AI tools benefit from clarifying questions and follow-up prompts.

**Customization tips:**
- Replace all bracketed placeholders with your actual code, framework names, or requirements
- Add project-specific constraints (coding standards, preferred libraries, existing patterns)
- Include relevant context (framework version, database schema, auth method)
- Paste actual error messages or code, not summaries

**When to use which category:**
- **Debugging prompts** when something breaks or behaves unexpectedly
- **Refactoring prompts** when code works but is messy, slow, or hard to maintain
- **Testing prompts** when you need test coverage or want to verify edge cases
- **Security prompts** before deploying, after major features, or during code review
- **Code generation prompts** when starting new features or components
- **Documentation prompts** when onboarding teammates or preparing for handoff

**Iteration strategies:**
If the AI's first response isn't quite right:
1. **Ask follow-up questions:** "Can you explain why you chose this approach?"
2. **Request alternatives:** "Show me 2 other ways to solve this"
3. **Add constraints:** "Now do it without using X library"
4. **Request improvements:** "Make this more performant" or "Add error handling"
5. **Combine prompts:** Use a security prompt after a code generation prompt

For complex tasks like security audits, expect to iterate 2-3 times as the AI uncovers deeper issues. This is normal and actually beneficial—you're systematically improving your code.

## Frequently Asked Questions

<FAQSection>
<details>
<summary>Do these prompts work with all AI coding tools?</summary>

Yes, these prompts work with Cursor, Claude Code, ChatGPT, GitHub Copilot, Bolt, v0, and Replit. They're designed to be tool-agnostic. The only difference is where you paste them: Cursor uses the chat panel, Claude Code uses the CLI, ChatGPT uses the web interface, and Copilot uses the chat sidebar in VS Code. The prompts themselves are identical across tools.
</details>

<details>
<summary>Should I run security prompts on every project?</summary>

Yes, absolutely. According to Georgetown University research, only [55% of AI-generated code is secure](https://cset.georgetown.edu/publication/securing-ai-generated-code/). Run the OWASP Top 10 audit prompt and specific vulnerability prompts (SQL injection, XSS, auth) before deploying any vibe coded project. For automated scanning, use <InternalLink href="/tools">VibeShip Scanner</InternalLink> alongside these prompts.
</details>

<details>
<summary>Can I modify these prompts for my specific framework?</summary>

Yes, you should customize prompts for your stack. Replace `[framework]` placeholders with your actual framework (Next.js 14, FastAPI, Rails, etc.). Add framework-specific requirements like "use Next.js Server Components" or "follow Django's class-based views pattern." The more context you provide, the better the AI's response will match your project conventions.
</details>

<details>
<summary>How do I know if an AI-generated fix is secure?</summary>

Cross-reference AI responses with official documentation and security standards. The security prompts in this library reference CWE IDs and OWASP guidelines—verify the AI's fixes match those standards. Use <InternalLink href="/kb/security/vulnerabilities/sql-injection">vulnerability guides</InternalLink> to understand attack patterns, then confirm the AI's fix addresses them. When in doubt, run automated scans with VibeShip Scanner or other SAST tools.
</details>

<details>
<summary>What's the difference between debugging and testing prompts?</summary>

Debugging prompts help you fix existing broken code—use them when you have an error or unexpected behavior. Testing prompts generate new tests for working code—use them to verify your code handles all scenarios correctly. You might debug first to fix an issue, then use testing prompts to create tests that prevent regression.
</details>
</FAQSection>

## Related Resources

**AI Tool Guides:**
- <InternalLink href="/kb/vibe-coding-tools/cursor">Cursor Security Patterns</InternalLink> - Security issues in Cursor-generated code
- <InternalLink href="/kb/vibe-coding-tools/claude-code">Claude Code Best Practices</InternalLink> - Using Claude Code securely
- <InternalLink href="/kb/vibe-coding-tools/bolt">Bolt.new Security Guide</InternalLink> - Securing Bolt projects

**Security Prompts Deep Dives:**
- <InternalLink href="/kb/security/vulnerabilities/sql-injection">SQL Injection Guide</InternalLink> - Complete fix guide with prompts
- <InternalLink href="/kb/security/vulnerabilities/xss">XSS Prevention</InternalLink> - Cross-site scripting defense
- <InternalLink href="/kb/security/vulnerabilities/hardcoded-secrets">Secret Management</InternalLink> - Removing hardcoded credentials

**Testing & Quality:**
- <InternalLink href="/kb/vibe-coding/testing-strategies">Testing AI-Generated Code</InternalLink> - Comprehensive testing guide
- <InternalLink href="/kb/vibe-coding/code-review-checklist">Vibe Code Review Checklist</InternalLink> - Pre-deployment checklist

**Automated Security:**
- <InternalLink href="/tools">VibeShip Scanner</InternalLink> - Automated vulnerability scanning for vibe coded projects
- <InternalLink href="/kb/security/checklists/pre-deployment">Pre-Deployment Security Checklist</InternalLink> - What to check before going live
