# AI Coding Prompts: 50+ Prompts That Ship Faster

<div class="quick-answer">
<strong>AI coding prompts are copy-paste templates for building features, fixing bugs, and refactoring code.</strong> These 50+ prompts include security built in. Works with Cursor, Claude Code, ChatGPT, and Copilot.
</div>

## How to Use These Prompts

**Copy-paste any prompt below and customize the bracketed sections with your specific details.** Replace `[FEATURE TYPE]`, `[YOUR STACK]`, and similar placeholders with your actual requirements. Paste your existing code after the prompt for context. The AI tool will generate code that follows the security requirements built into each prompt.

For best results, be specific about your tech stack and include relevant existing code. The more context you provide, the better the AI-generated output.

## Feature Building Prompts

**These prompts create new features with security built in from the start.** Each includes input validation, authentication checks, and secure coding patterns by default.

### 1. Create a New Component

```
Build a [COMPONENT NAME] component that:
- Accepts these props: [PROP LIST]
- Displays [UI REQUIREMENTS]
- Handles [USER INTERACTIONS]

Security requirements:
- Sanitize all user-generated content before rendering
- Validate prop types with TypeScript or PropTypes
- Escape HTML to prevent XSS
- Handle error states gracefully

Tech stack: [React/Vue/Svelte]
Styling: [Tailwind/CSS Modules/styled-components]

[PASTE EXISTING COMPONENT CODE FOR REFERENCE]
```

### 2. Build an API Endpoint

```
Create a [HTTP METHOD] endpoint at /api/[ROUTE] that:
- Accepts [REQUEST PARAMETERS]
- Returns [RESPONSE FORMAT]
- Handles these cases: [SUCCESS/ERROR SCENARIOS]

Security requirements:
- Validate and sanitize all inputs
- Use parameterized queries (no string concatenation)
- Check authentication and authorization
- Implement rate limiting
- Return appropriate HTTP status codes
- Log errors without exposing sensitive data

Tech stack: [Next.js/Express/FastAPI/Django]
Database: [PostgreSQL/MongoDB/Supabase]

[PASTE EXISTING API CODE FOR CONTEXT]
```

### 3. Add Form Validation

```
Add validation to this form for:
- [FIELD 1]: [VALIDATION RULES]
- [FIELD 2]: [VALIDATION RULES]
- [FIELD 3]: [VALIDATION RULES]

Security requirements:
- Validate on both client and server side
- Sanitize inputs before processing
- Show user-friendly error messages
- Prevent XSS in error messages
- Implement CSRF protection
- Rate limit form submissions

Tech stack: [React Hook Form/Formik/Zod/Yup]

[PASTE FORM CODE]
```

### 4. Implement Authentication

```
Build authentication for [LOGIN/SIGNUP/PASSWORD RESET] that:
- Uses [EMAIL/PHONE/OAUTH]
- Stores credentials in [DATABASE]
- Returns [JWT/SESSION TOKEN]

Security requirements:
- Hash passwords with bcrypt (min 12 rounds)
- Use secure session storage (HttpOnly cookies)
- Implement rate limiting on auth endpoints
- Add CSRF protection
- Validate email format server-side
- Implement account lockout after failed attempts
- Use secure password reset tokens (expire in 1 hour)

Tech stack: [NextAuth/Passport/Supabase Auth]

[PASTE EXISTING AUTH CODE]
```

### 5. Create Database Schema

```
Design a database schema for [ENTITY NAME] with these fields:
- [FIELD 1]: [TYPE] - [PURPOSE]
- [FIELD 2]: [TYPE] - [PURPOSE]
- [FIELD 3]: [TYPE] - [PURPOSE]

Security requirements:
- Add Row Level Security (RLS) policies
- Create indexes for query performance
- Implement foreign key constraints
- Add created_at and updated_at timestamps
- Set appropriate NOT NULL constraints
- Define user_id relationships for access control

Database: [PostgreSQL/MySQL/Supabase]
ORM: [Prisma/Drizzle/TypeORM]

[PASTE EXISTING SCHEMA FOR REFERENCE]
```

### 6. Build a CRUD Feature

```
Create CRUD operations for [ENTITY] with:
- Create: [REQUIREMENTS]
- Read: [REQUIREMENTS]
- Update: [REQUIREMENTS]
- Delete: [REQUIREMENTS]

Security requirements:
- Check user owns the resource before update/delete
- Validate all inputs with Zod/Yup schema
- Use parameterized queries
- Implement soft deletes (deleted_at column)
- Log all delete operations
- Return only necessary fields (no sensitive data)

Tech stack: [YOUR STACK]

[PASTE EXISTING CODE]
```

### 7. Add File Upload

```
Implement file upload for [IMAGE/PDF/CSV] that:
- Accepts [FILE TYPES]
- Max size: [SIZE LIMIT]
- Stores in [S3/Cloudinary/Supabase Storage]
- Generates [THUMBNAIL/PREVIEW]

Security requirements:
- Validate file type by magic bytes (not just extension)
- Enforce file size limits
- Scan for malware if handling user uploads
- Generate random filenames (prevent path traversal)
- Set Content-Security-Policy headers
- Implement virus scanning for production
- Store files outside web root

Tech stack: [Multer/Uploadthing/Next.js API]

[PASTE EXISTING UPLOAD CODE]
```

### 8. Implement Search

```
Add search functionality for [ENTITY] that:
- Searches fields: [FIELD LIST]
- Returns results with [PAGINATION/INFINITE SCROLL]
- Filters by [CRITERIA]

Security requirements:
- Sanitize search query to prevent injection
- Implement rate limiting
- Use full-text search indexes
- Only return data user has access to
- Prevent ReDoS with query length limits
- Use parameterized queries

Tech stack: [Elasticsearch/PostgreSQL Full-Text/Algolia]

[PASTE EXISTING SEARCH CODE]
```

### 9. Create Pagination

```
Add pagination to [LIST/TABLE] showing [ENTITY]:
- Items per page: [NUMBER]
- Include [SORTING/FILTERING]
- Handle [EDGE CASES]

Security requirements:
- Validate page and limit parameters
- Cap maximum items per page (prevent resource exhaustion)
- Use cursor-based pagination for large datasets
- Check authorization before returning results
- Sanitize sort/filter inputs

Tech stack: [YOUR STACK]

[PASTE EXISTING LIST CODE]
```

### 10. Build a Dashboard Widget

```
Create a dashboard widget that displays:
- [METRIC 1]: [DESCRIPTION]
- [METRIC 2]: [DESCRIPTION]
- [METRIC 3]: [DESCRIPTION]

Security requirements:
- Only show data user has permission to view
- Aggregate sensitive data (no individual records)
- Cache results to prevent excessive queries
- Validate date range inputs
- Implement query timeouts

Tech stack: [React/Vue/Svelte]
Data source: [API/Database]

[PASTE EXISTING DASHBOARD CODE]
```

## Bug Fixing Prompts

**These prompts help diagnose and fix specific errors with security awareness.** Each includes steps to verify the fix doesn't introduce new vulnerabilities.

### 11. Debug Error Message

```
Fix this error:
[PASTE ERROR MESSAGE]

Context:
- Happens when: [TRIGGER]
- Expected behavior: [DESCRIPTION]
- Current behavior: [DESCRIPTION]

Security check after fix:
- Verify error doesn't expose sensitive data
- Ensure fix doesn't bypass validation
- Test with malicious inputs

[PASTE RELEVANT CODE]
```

### 12. Fix TypeScript Error

```
Resolve this TypeScript error:
[PASTE ERROR]

Security requirements:
- Don't use 'any' to bypass - fix the types
- Ensure type guards validate runtime data
- Add proper null/undefined checks

[PASTE CODE WITH ERROR]
```

### 13. Resolve React Warning

```
Fix this React warning:
[PASTE WARNING]

Security considerations:
- If key-related: ensure keys aren't based on index
- If useEffect-related: check for race conditions
- Verify fix doesn't break data flow

[PASTE COMPONENT CODE]
```

### 14. Debug API Call

```
This API call isn't working:
[DESCRIBE ISSUE]

Expected response: [DESCRIPTION]
Actual response: [DESCRIPTION]

Debug and fix:
- Check request validation
- Verify authentication headers
- Ensure proper error handling
- Test with edge cases

[PASTE API CODE]
```

### 15. Fix Database Query

```
This query returns [WRONG RESULTS/ERROR]:
[PASTE QUERY]

Expected: [DESCRIPTION]
Actual: [DESCRIPTION]

Security requirements:
- Use parameterized queries
- Add proper WHERE clauses
- Verify RLS policies apply
- Test with unauthorized user

[PASTE FULL QUERY CONTEXT]
```

### 16. Debug Authentication

```
Users can't [LOGIN/SIGNUP/RESET PASSWORD]:
[DESCRIBE ISSUE]

Debug checklist:
- Verify password hashing
- Check session/token creation
- Test rate limiting
- Verify CSRF protection
- Check cookie settings (HttpOnly, Secure, SameSite)

[PASTE AUTH CODE]
```

### 17. Fix Performance Issue

```
This [COMPONENT/API/QUERY] is slow:
[DESCRIBE PERFORMANCE ISSUE]

Current timing: [MEASUREMENTS]
Expected: [TARGET]

Optimize while maintaining security:
- Don't remove validation to speed up
- Keep authentication checks
- Maintain input sanitization
- Add caching if appropriate

[PASTE SLOW CODE]
```

### 18. Debug Build Error

```
Build fails with:
[PASTE BUILD ERROR]

Environment:
- Node version: [VERSION]
- Package manager: [npm/yarn/pnpm]
- Build command: [COMMAND]

[PASTE RELEVANT CONFIGURATION FILES]
```

**For comprehensive debugging strategies, see [AI Prompts for Debugging](/kb/prompts/debugging-prompts/).**

## Refactoring Prompts

**These prompts improve existing code while maintaining or enhancing security.** Each includes security validation steps.

### 19. Extract Component

```
Extract a reusable component from this code:
[PASTE CODE TO REFACTOR]

New component should:
- Accept props: [LIST]
- Handle [INTERACTIONS]
- Be reusable in [CONTEXTS]

Security requirements:
- Maintain existing validation
- Keep authentication checks
- Preserve error handling
- Don't expose sensitive props

Tech stack: [YOUR STACK]
```

### 20. Simplify Function

```
Simplify this function while maintaining behavior:
[PASTE COMPLEX FUNCTION]

Requirements:
- Keep the same inputs/outputs
- Maintain error handling
- Preserve security checks
- Add comments for clarity

Security checklist after refactor:
- All validation still present
- No bypassed authentication
- Same error handling
- Test with edge cases
```

### 21. Add TypeScript Types

```
Add proper TypeScript types to this code:
[PASTE UNTYPED CODE]

Requirements:
- Use strict types (no 'any')
- Add input/output types
- Create interfaces for complex objects
- Add JSDoc comments

Security benefit:
- Type validation prevents injection
- Null checks prevent crashes
- Proper types catch bugs early
```

### 22. Improve Error Handling

```
Add comprehensive error handling to:
[PASTE CODE]

Requirements:
- Try-catch blocks for async operations
- User-friendly error messages
- Log errors for debugging
- Return appropriate HTTP status codes

Security requirements:
- Don't expose stack traces to users
- Don't leak sensitive data in errors
- Log security events separately
- Rate limit error responses
```

### 23. Optimize Performance

```
Optimize this code for performance:
[PASTE CODE]

Current metrics: [TIMING/MEMORY USAGE]
Target: [GOAL]

Security constraints:
- Don't remove input validation
- Keep authentication checks
- Maintain rate limiting
- Preserve audit logging

Tech stack: [YOUR STACK]
```

### 24. Remove Duplication

```
Remove duplication from these functions/components:
[PASTE DUPLICATED CODE]

Create a shared [FUNCTION/COMPONENT/HOOK] that:
- [REQUIREMENT 1]
- [REQUIREMENT 2]

Security check:
- Shared code maintains all validation
- No security checks removed
- Test all use cases
```

### 25. Improve Readability

```
Make this code more readable:
[PASTE CODE]

Improvements needed:
- Better variable names
- Add comments
- Extract magic numbers
- Simplify logic

Security requirement:
- Maintain all validation logic
- Keep security checks visible
- Document security-critical sections
```

### 26. Add Input Validation

```
Add comprehensive input validation to:
[PASTE CODE WITHOUT VALIDATION]

Validate:
- [INPUT 1]: [RULES]
- [INPUT 2]: [RULES]
- [INPUT 3]: [RULES]

Validation requirements:
- Use Zod/Yup schema
- Validate both client and server
- Sanitize before processing
- Return specific error messages
- Prevent injection attacks

Tech stack: [YOUR STACK]
```

## Code Review Prompts

**These prompts analyze code for issues before they reach production.** Each focuses on a specific quality dimension.

### 27. Security Review

```
Review this code for security vulnerabilities:
[PASTE CODE]

Check for:
- SQL/NoSQL injection risks
- XSS vulnerabilities
- Authentication bypasses
- Authorization issues
- Hardcoded secrets
- Insecure dependencies
- Missing input validation
- Information disclosure
- CSRF protection
- Rate limiting

Provide:
- Vulnerability description
- Severity (Critical/High/Medium/Low)
- Fix recommendation with code example
```

### 28. Performance Review

```
Analyze performance bottlenecks in:
[PASTE CODE]

Check for:
- N+1 queries
- Missing database indexes
- Inefficient loops
- Unnecessary re-renders (React)
- Large bundle size
- Memory leaks

Provide optimization recommendations with code examples.
```

### 29. Accessibility Review

```
Review accessibility of this component:
[PASTE COMPONENT CODE]

Check for:
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Screen reader support
- Color contrast
- Focus management
- Form labels

Provide fixes with code examples.
```

### 30. Best Practices Review

```
Review this code against best practices:
[PASTE CODE]

Check for:
- Code organization
- Naming conventions
- Error handling
- Type safety
- Comments/documentation
- DRY principle
- SOLID principles

Tech stack: [YOUR STACK]
```

### 31. TypeScript Review

```
Review TypeScript usage in:
[PASTE CODE]

Check for:
- Any types (should be avoided)
- Missing return types
- Weak types (string instead of union)
- Type assertions (avoid when possible)
- Proper generic usage
- Interface vs type usage

Suggest improvements with examples.
```

### 32. Test Coverage Review

```
Analyze test coverage for:
[PASTE CODE]

Identify:
- Untested code paths
- Missing edge cases
- Missing error scenarios
- Integration gaps

Suggest additional test cases with examples.
```

**For comprehensive security review, see [AI Security Review Prompts](/kb/prompts/security-prompts/).**

## Testing Prompts

**These prompts generate comprehensive test suites with security test cases included.**

### 33. Generate Unit Tests

```
Generate unit tests for this function:
[PASTE FUNCTION]

Requirements:
- Test happy path
- Test edge cases
- Test error scenarios
- Test with invalid inputs (security)
- Mock dependencies
- Achieve 100% coverage

Testing framework: [Jest/Vitest/Pytest]
Tech stack: [YOUR STACK]
```

### 34. Generate Integration Tests

```
Create integration tests for:
[PASTE API/FEATURE CODE]

Test scenarios:
- [SCENARIO 1]
- [SCENARIO 2]
- [SCENARIO 3]

Security tests:
- Unauthorized access attempts
- Invalid input injection
- Rate limiting
- CSRF protection

Testing framework: [Supertest/Playwright/Cypress]
```

### 35. Generate Edge Case Tests

```
Identify and test edge cases for:
[PASTE CODE]

Consider:
- Boundary values
- Null/undefined inputs
- Empty arrays/objects
- Very large inputs
- Concurrent requests
- Malicious inputs (security)

Framework: [YOUR TESTING FRAMEWORK]
```

### 36. Generate Mock Data

```
Generate realistic mock data for:
[DESCRIBE DATA STRUCTURE]

Requirements:
- [NUMBER] records
- Include edge cases
- Realistic relationships
- Valid formats (emails, dates, etc.)

Security consideration:
- Don't use real user data
- Anonymize if based on production data

Tech stack: [Faker/MSW/Factory]
```

### 37. Generate Test Fixtures

```
Create test fixtures for:
[DESCRIBE ENTITIES]

Include:
- Typical records
- Edge cases
- Related entities
- Different states (active/inactive/deleted)

Format: [JSON/TypeScript/SQL]
```

### 38. Test Coverage Analysis

```
Analyze test coverage and suggest missing tests:
[PASTE CODE AND EXISTING TESTS]

Identify:
- Uncovered code paths
- Missing error scenarios
- Security edge cases not tested
- Integration gaps

Provide specific test cases to add.
```

## Documentation Prompts

**These prompts generate clear, security-conscious documentation.**

### 39. Generate README

```
Create a README for this project:
[DESCRIBE PROJECT]

Include:
- Project description
- Installation steps
- Usage examples
- Environment variables needed
- Security considerations
- Contributing guidelines

Tech stack: [YOUR STACK]
```

### 40. Generate API Documentation

```
Document these API endpoints:
[PASTE API CODE]

For each endpoint include:
- Method and path
- Request parameters
- Response format
- Authentication requirements
- Rate limits
- Error responses
- Example requests

Format: [OpenAPI/Markdown]
```

### 41. Generate JSDoc Comments

```
Add comprehensive JSDoc comments to:
[PASTE CODE]

Include:
- Function description
- @param for each parameter with type
- @returns with type and description
- @throws for possible errors
- @example with usage
- Security notes if applicable
```

### 42. Generate Changelog

```
Generate a changelog entry for these changes:
[DESCRIBE CHANGES OR PASTE DIFF]

Follow format:
- Added: New features
- Changed: Updates to existing features
- Fixed: Bug fixes
- Security: Security improvements
- Deprecated: Features being phased out

Version: [VERSION NUMBER]
```

### 43. Generate Onboarding Guide

```
Create an onboarding guide for developers joining this project:
[DESCRIBE PROJECT]

Include:
- Project overview
- Tech stack
- Local setup steps
- Code organization
- Development workflow
- Testing guidelines
- Security practices
- Common gotchas

Tech stack: [YOUR STACK]
```

### 44. Generate Architecture Documentation

```
Document the architecture of:
[DESCRIBE SYSTEM]

Include:
- System overview diagram
- Component descriptions
- Data flow
- External dependencies
- Security boundaries
- Deployment architecture

Format: [Markdown/Mermaid diagrams]
```

## The Security Upgrade

**Every prompt above includes security considerations, but you can enhance ANY AI coding prompt with this template:**

```
[YOUR ORIGINAL PROMPT]

Security requirements:
- Validate and sanitize all inputs
- Check authentication and authorization
- Use parameterized queries (no string concatenation)
- Implement rate limiting
- Add CSRF protection where applicable
- Sanitize output to prevent XSS
- Log security events
- Handle errors without exposing sensitive data

Before deploying, verify:
- No hardcoded secrets
- All dependencies up to date
- Security headers configured
- HTTPS enforced
```

**How to apply the security upgrade:**

1. **Copy your existing prompt** (feature, bug fix, refactor)
2. **Add the security requirements section** at the end
3. **Customize based on context** (not all items apply to every prompt)
4. **Include verification steps** specific to your use case

**Example - Before:**
```
Create a contact form that sends emails.
```

**Example - After:**
```
Create a contact form that sends emails.

Security requirements:
- Validate email format server-side
- Sanitize message content to prevent header injection
- Implement rate limiting (max 5 submissions per hour)
- Add CSRF protection
- Use environment variables for SMTP credentials
- Don't expose email service errors to users

Verify before deploying:
- Test with malicious inputs (XSS attempts, long strings)
- Confirm rate limiting works
- Check emails don't contain injected headers
```

This simple addition transforms a basic prompt into a security-conscious one that produces safer code.

## Prompt Templates by Stack

**Stack-specific prompts optimized for common frameworks with their security best practices built in.**

### Next.js Prompts

```
Create a Next.js Server Action that:
- [ACTION DESCRIPTION]
- Uses Server Components where possible
- Handles form submission

Security requirements:
- Validate inputs with Zod
- Use revalidatePath/revalidateTag for cache
- Add 'use server' directive
- Return errors safely (no sensitive data)
- Check session with auth()
- Implement CSRF protection

[PASTE EXISTING CODE]
```

```
Build a Next.js API route that:
- [REQUIREMENTS]

Security:
- Validate request method
- Use middleware for auth
- Set security headers (helmet/next-security)
- Rate limit with Upstash/Redis
- Use environment variables for secrets

Tech: Next.js 14+ App Router
```

```
Create a protected Next.js page with:
- [PAGE REQUIREMENTS]

Security:
- Use middleware for auth redirect
- Implement RLS on data fetching
- Add CSP headers
- Server-side session validation

Auth: [NextAuth/Clerk/Supabase]
```

```
Add dynamic routes to Next.js for:
- [ROUTE STRUCTURE]

Security:
- Validate route parameters server-side
- Check user owns resource
- Return 404 for unauthorized (not 403)
- Use proper TypeScript types for params

[PASTE ROUTE CODE]
```

### React Prompts

```
Create a React component using hooks:
- [COMPONENT REQUIREMENTS]

Security considerations:
- Sanitize user input before rendering
- Use dangerouslySetInnerHTML only when necessary (and sanitize with DOMPurify)
- Validate props with PropTypes or TypeScript
- Handle async operations safely (cleanup in useEffect)

Tech: React 18+ with hooks
```

```
Implement React Context for [STATE TYPE]:
- [REQUIREMENTS]

Security:
- Don't store sensitive data in Context (use secure storage)
- Validate context values
- Handle context updates safely

[PASTE EXISTING STATE CODE]
```

```
Add React Query for data fetching:
- [API REQUIREMENTS]

Security:
- Validate response data structure
- Handle auth token refresh
- Don't cache sensitive data
- Implement retry limits

Tech: TanStack Query (React Query)
```

```
Create a custom React hook for:
- [HOOK PURPOSE]

Security:
- Validate inputs
- Clean up side effects
- Handle async errors
- Don't expose internal state

[PASTE USAGE CONTEXT]
```

### Node.js/Express Prompts

```
Create an Express middleware that:
- [MIDDLEWARE PURPOSE]

Security requirements:
- Validate request data
- Don't expose errors to client
- Log security events
- Handle async errors with try-catch
- Set appropriate headers

Tech: Express 4+
```

```
Build an Express route with validation:
- [ROUTE REQUIREMENTS]

Security:
- Use express-validator or Zod
- Sanitize inputs
- Implement helmet for headers
- Add express-rate-limit
- Use parameterized queries

[PASTE EXISTING ROUTES]
```

```
Add authentication middleware to Express:
- [AUTH REQUIREMENTS]

Security:
- Verify JWT properly
- Use HttpOnly cookies
- Implement CSRF protection (csurf)
- Rate limit auth endpoints
- Hash passwords with bcrypt (12+ rounds)

Tech: [JWT/Passport/Session]
```

```
Create Express error handler:
- [ERROR HANDLING REQUIREMENTS]

Security:
- Don't expose stack traces in production
- Log full errors server-side
- Return generic messages to client
- Set proper status codes
- Handle async errors

[PASTE EXISTING ERROR HANDLING]
```

### Python/FastAPI Prompts

```
Create a FastAPI endpoint that:
- [ENDPOINT REQUIREMENTS]

Security requirements:
- Use Pydantic models for validation
- Add OAuth2/JWT authentication
- Implement rate limiting (slowapi)
- Use parameterized queries (SQLAlchemy)
- Return proper HTTP exceptions

Tech: FastAPI + SQLAlchemy/Prisma
```

```
Add FastAPI dependency injection for:
- [DEPENDENCY PURPOSE]

Security:
- Validate dependencies
- Check auth in dependencies
- Don't expose internal config
- Handle database connections safely

[PASTE EXISTING CODE]
```

```
Create Pydantic models for:
- [DATA STRUCTURES]

Security:
- Add field validators
- Set min/max constraints
- Sanitize string fields
- Use EmailStr for emails

[PASTE SCHEMA REQUIREMENTS]
```

```
Add background tasks to FastAPI:
- [TASK REQUIREMENTS]

Security:
- Validate task inputs
- Don't pass sensitive data to tasks
- Implement task timeouts
- Log task execution

Tech: FastAPI BackgroundTasks
```

## FAQ

### Can I combine multiple prompts?

**Yes, combining prompts often produces better results.** For example, use the "Build an API endpoint" prompt together with "Generate unit tests" to get both implementation and tests in one go. Add the "Security review" prompt to validate the generated code. When combining, paste all prompts together with clear sections and specify that you want all requirements addressed.

### How specific should I be in my prompts?

**Be as specific as possible - specificity directly improves output quality.** Include your exact tech stack versions (Next.js 14, React 18), existing code patterns, naming conventions, and any project-specific requirements. Generic prompts like "build a form" produce generic code. Specific prompts like "build a contact form with Zod validation, React Hook Form, and Resend email integration" produce production-ready code. According to research on [AI coding tool patterns](/kb/vibe-coding-tools/cursor/), specificity reduces security vulnerabilities by 40%.

### What if the AI generates insecure code?

**Always review AI-generated code before deploying - the prompts reduce risk but don't eliminate it.** If you receive insecure code, use the "Security review" prompt (#27) to analyze it, then use the security-specific fix prompts. Common issues include missing input validation (add prompt #26), weak authentication (use prompt #4), or SQL injection risks (use parameterized query patterns from prompt #2). Scan with [VibeShip Scanner](https://scanner.vibeship.co) to catch vulnerabilities automatically.

### Should I include my whole file in the prompt?

**Include only the relevant context - typically 50-200 lines around the area you're working on.** Large files (500+ lines) overwhelm the AI's context window and reduce output quality. Extract the specific function, component, or module you're modifying plus any dependencies it uses. If you need to refactor a whole file, break it into multiple prompts (extract components, add types, improve error handling) and apply them sequentially.

### How do I make any prompt security-aware?

**Add the security requirements template from "The Security Upgrade" section to any prompt.** Copy the security checklist and customize it for your use case - not all items apply to every prompt. For frontend components, focus on XSS prevention and input validation. For API endpoints, emphasize authentication, parameterized queries, and rate limiting. For database operations, add RLS and proper authorization checks. See [comprehensive security prompts](/kb/prompts/security-prompts/) for 50+ security-specific prompt templates.

## Related Resources

**Master AI coding with these comprehensive guides:**

- **[Prompt Engineering for Code](/kb/prompts/prompt-engineering-code/)** - Write better prompts that generate secure, production-ready code
- **[AI Security Review Prompts](/kb/prompts/security-prompts/)** - 50+ prompts for scanning and fixing vulnerabilities in AI-generated code
- **[Debugging Prompts for AI Tools](/kb/prompts/debugging-prompts/)** - Systematic debugging strategies for Cursor, Claude Code, and ChatGPT
- **[Cursor Rules Library](/kb/vibe-coding-tools/cursor/cursor-rules/)** - Pre-configured rules for secure AI code generation in Cursor

**Security scanning tools:**

- **[VibeShip Scanner](https://scanner.vibeship.co)** - Automated security scanning for AI-generated code with fix prompts
- **[Common Vulnerabilities in AI Code](/kb/security/vulnerabilities/)** - OWASP Top 10 vulnerabilities found in vibe coded projects

**AI coding tool guides:**

- **[Cursor Security Guide](/kb/vibe-coding-tools/cursor/)** - Security best practices for Cursor AI
- **[Claude Code Security](/kb/vibe-coding-tools/claude-code/)** - Secure coding with Claude Code
- **[Bolt Security Patterns](/kb/vibe-coding-tools/bolt/)** - Security considerations for Bolt.new

---

*Last updated: December 2024. Prompts tested with Cursor, Claude Code, ChatGPT, and GitHub Copilot.*
