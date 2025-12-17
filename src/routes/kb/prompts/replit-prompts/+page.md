# Replit Agent Prompts: Build Apps with AI

<div class="quick-answer">
<strong>Replit Agent builds complete applications from prompts.</strong> Write effective prompts by specifying features, tech stack, and security requirements. Request input validation and parameterized queries explicitly for secure vibe coded apps.
</div>

## What is Replit Agent?

Replit Agent is an AI-powered coding assistant that transforms natural language prompts into complete, runnable applications directly in the browser. Unlike tools like [Cursor](/kb/vibe-coding-tools/cursor/) or [Claude Code](/kb/vibe-coding-tools/claude-code/) that edit existing codebases locally, Replit Agent generates entire projects from scratch in Replit's cloud-based development environment.

Vibe coders use Replit Agent because it handles the full stack—frontend, backend, database, and deployment—without requiring local setup. You describe what you want to build, and the agent creates the folder structure, writes the code, installs dependencies, and gets it running. This makes it ideal for prototyping, learning new frameworks, or building MVPs quickly.

However, because Replit Agent prioritizes working code over secure code, vibe coded projects often contain vulnerabilities like [SQL injection](/kb/security/vulnerabilities/sql-injection/) and [hardcoded secrets](/kb/security/vulnerabilities/hardcoded-secrets/). The quality of your output depends heavily on how you write your prompts—especially when it comes to security.

## How to Write Effective Replit Prompts

Write effective Replit Agent prompts by being specific about what you want, describing the end result clearly, and including technical requirements upfront.

**Be specific about what you want.** Vague prompts like "build a todo app" give the agent too much freedom to make insecure choices. Instead, specify the tech stack, database type, authentication method, and UI framework. The more details you provide, the less the agent has to guess.

**Describe the end result clearly.** Instead of saying "add user login," describe the complete user experience: "Users should register with email/password, receive a confirmation email, and log in to see their dashboard. Passwords must be hashed with bcrypt, and sessions must use HTTP-only cookies."

**Include technical requirements upfront.** Specify framework versions, folder structure preferences, and security requirements in your initial prompt. It's harder to fix security issues after the agent has already generated vulnerable patterns throughout the codebase.

**Use a step-by-step prompting approach** for complex projects. Start with the basic structure and database schema, verify it's correct, then iteratively add features. This gives you checkpoints to catch issues early rather than debugging a fully-generated app with multiple problems.

## Project Structure Prompts

Specify your project's folder organization upfront to ensure the agent creates a maintainable codebase with clear separation of concerns.

**For full-stack applications, request explicit folder structure:**

```
Create a Next.js 14 app with this structure:
- /app - Next.js App Router pages
- /components - Reusable React components
- /lib - Database client and utility functions
- /api - API route handlers
- /middleware - Authentication middleware
- /types - TypeScript type definitions
Keep all database queries in /lib/db.ts using parameterized queries.
```

**For backend-only projects:**

```
Build an Express.js API with:
- /routes - API endpoint definitions
- /controllers - Business logic
- /models - Database models (PostgreSQL with Prisma)
- /middleware - Auth, validation, error handling
- /config - Environment-specific configs
Use environment variables for all secrets (no hardcoding).
```

**Specify database and backend structure** to avoid mixing concerns:

```
Use PostgreSQL with Prisma ORM. Create these tables:
- users (id, email, password_hash, created_at)
- posts (id, user_id, title, content, created_at)
- comments (id, post_id, user_id, content, created_at)

All foreign keys should have proper constraints and indexes.
Store connection string in .env file.
```

## Feature Building Prompts

Use detailed feature prompts that specify the exact behavior, security requirements, and edge cases the agent should handle.

**Authentication feature prompt:**

```
Add user authentication with these requirements:
- Registration: Email/password with email validation regex
- Password requirements: Minimum 12 characters, bcrypt hashing with cost factor 12
- Login: Return HTTP-only cookie with JWT (24-hour expiry)
- Protected routes: Middleware checks JWT validity before allowing access
- Logout: Clear cookie and invalidate token
- Rate limiting: Max 5 login attempts per 15 minutes per IP
Handle all errors gracefully with proper HTTP status codes.
```

**CRUD operations prompt:**

```
Create a blog post management system:
- CREATE: Form with title (max 200 chars) and content (max 10000 chars)
  Validate input length, sanitize HTML, use parameterized INSERT query
- READ: List all posts with pagination (20 per page)
  Use prepared statements with LIMIT/OFFSET
- UPDATE: Allow author to edit their own posts only
  Verify post ownership before allowing edits
- DELETE: Soft delete (set deleted_at timestamp)
  Check user owns the post before deleting
All database queries must use parameterized statements (no string concatenation).
```

**API integration prompt:**

```
Integrate Stripe for payments:
- Use Stripe's official Node.js SDK
- Store API keys in environment variables (STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY)
- Verify webhook signatures using the webhook secret
- Handle payment_intent.succeeded and payment_intent.failed events
- Log all webhook events for debugging
- Return proper error messages to frontend (don't leak internal errors)
```

**UI component prompt:**

```
Build a user dashboard with:
- Profile card showing user info (name, email, join date)
- Activity feed of recent posts (paginated)
- Settings panel for updating email/password
All forms must include CSRF tokens and input validation.
Sanitize user-generated content before rendering (XSS prevention).
```

## Security Prompts for Replit

Explicitly request security best practices in your prompts, as Replit Agent defaults to working code without security hardening.

**Requesting secure database queries:**

```
All database queries MUST use parameterized statements to prevent SQL injection.

❌ NEVER use string concatenation:
const user = await db.query(`SELECT * FROM users WHERE id = ${userId}`)

✅ ALWAYS use parameterized queries:
const user = await db.query('SELECT * FROM users WHERE id = $1', [userId])

Apply this to all SELECT, INSERT, UPDATE, DELETE statements.
```

**Authentication security prompts:**

```
Implement authentication with these security requirements:
1. Password storage: Use bcrypt with cost factor 12 (never store plaintext)
2. Session management: HTTP-only cookies with SameSite=Strict and Secure flags
3. Password reset: Time-limited tokens (1-hour expiry) with one-time use
4. Rate limiting: Max 5 failed login attempts per IP per 15 minutes
5. Account lockout: Lock account after 10 failed attempts, require email unlock

Example secure password hashing:
const bcrypt = require('bcrypt');
const saltRounds = 12;
const hashedPassword = await bcrypt.hash(password, saltRounds);
```

**Input validation prompts:**

```
Validate all user input before processing:
1. Email: Regex validation + existence check + email confirmation
2. Passwords: Min 12 chars, require uppercase, lowercase, number, special char
3. URLs: Validate against whitelist of allowed domains (prevent SSRF)
4. File uploads: Check file type, size limit (5MB max), scan with antivirus
5. Numeric IDs: Parse as integers and validate range

Example email validation:
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  throw new Error('Invalid email format');
}
```

**Secret handling prompts:**

```
Handle secrets securely in Replit's cloud environment:
1. Store ALL secrets in Replit Secrets (not in .env files committed to Git)
2. Access secrets via process.env.SECRET_NAME
3. Never log secret values (mask in logs)
4. Use separate secrets for development vs production
5. Rotate secrets regularly (document rotation process)

Create these secrets in Replit Secrets panel:
- DATABASE_URL (PostgreSQL connection string)
- JWT_SECRET (random 256-bit key for signing tokens)
- STRIPE_SECRET_KEY (Stripe API key)
- SESSION_SECRET (random 256-bit key for sessions)

Generate secure random secrets with:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Complete security-focused prompt template:**

```
Build a [PROJECT TYPE] with these security requirements:

AUTHENTICATION:
- bcrypt password hashing (cost factor 12)
- HTTP-only cookies with Secure and SameSite=Strict flags
- JWT tokens with 24-hour expiry
- Rate limiting: 5 attempts per 15 minutes

DATABASE:
- PostgreSQL with Prisma ORM
- ALL queries use parameterized statements (no string concatenation)
- Foreign key constraints on all relationships
- Indexes on frequently queried columns

INPUT VALIDATION:
- Validate all user input with regex patterns
- Sanitize HTML to prevent XSS attacks
- Check file upload types and sizes
- Validate numeric ranges

SECRET MANAGEMENT:
- Store all secrets in Replit Secrets (not hardcoded)
- Access via process.env
- Never log secret values
- Use separate secrets for dev/prod

ERROR HANDLING:
- Return generic error messages to users (no stack traces)
- Log detailed errors server-side for debugging
- Use proper HTTP status codes (400, 401, 403, 500)

DEPENDENCIES:
- Use latest stable versions
- Only include necessary packages
- Regularly update dependencies for security patches
```

## Debugging and Fixing Prompts

Use specific debugging prompts to help Replit Agent identify and fix issues in generated code.

**Error fixing prompt:**

```
I'm getting this error: [PASTE ERROR MESSAGE]

Debug this by:
1. Identifying the root cause (don't just suppress the error)
2. Checking for common issues (undefined variables, type mismatches, missing await)
3. Adding proper error handling (try-catch blocks with logging)
4. Fixing the underlying issue (not just the symptom)

Show me the before and after code with comments explaining the fix.
```

**Performance optimization prompt:**

```
Optimize this code for performance:
[PASTE SLOW CODE]

Focus on:
- Database query optimization (add indexes, reduce N+1 queries)
- Caching frequently accessed data (Redis or in-memory cache)
- Lazy loading for large datasets
- Reducing API calls (batch requests where possible)
- Using database connection pooling

Show benchmarks before and after optimization.
```

**Code review prompt:**

```
Review this code for security vulnerabilities and best practices:
[PASTE CODE]

Check for:
- SQL injection vulnerabilities (string concatenation in queries)
- XSS vulnerabilities (unescaped user input in HTML)
- Hardcoded secrets (API keys, passwords)
- Missing input validation
- Improper error handling (leaked stack traces)
- Authentication bypass opportunities

Provide a security report with severity ratings and specific fixes.
```

## Cloud vs Local Considerations

Replit Agent runs in a cloud-based environment, which has important security and deployment implications compared to local development tools.

**Security implications of cloud-based development:** All code runs on Replit's servers, not your local machine. This means anyone with access to your Repl can see your code and environment variables. Use Replit Secrets (not .env files) for sensitive data, as Secrets are encrypted and not visible in the code editor. For highly sensitive projects, consider using local tools like [Cursor](/kb/vibe-coding-tools/cursor/) instead.

**Environment variable handling:** Replit provides a Secrets tab for environment variables. Prompt the agent to use `process.env.SECRET_NAME` and document which secrets need to be manually added. The agent can't create Replit Secrets automatically, so you'll need to add them yourself after generation.

**Deployment considerations:** Replit automatically deploys your app when you run it. For production use, upgrade to Replit Deployments for custom domains, always-on hosting, and autoscaling. Prompt the agent to include production-ready features like health check endpoints, graceful shutdown handling, and structured logging.

## Replit Agent Best Practices

Follow these best practices to get the most out of Replit Agent while maintaining code quality and security.

| Do | Don't |
|---------|-----------|
| Specify exact tech stack and versions | Use vague prompts like "build a website" |
| Request security features explicitly | Assume the agent will add security by default |
| Include validation rules for all inputs | Skip input validation to save time |
| Use Replit Secrets for sensitive data | Hardcode API keys or passwords in code |
| Review generated code before running | Blindly trust AI-generated code |
| Test edge cases and error scenarios | Only test the happy path |
| Request parameterized database queries | Allow string concatenation in queries |
| Specify folder structure upfront | Let the agent decide file organization |
| Iterate with small, focused prompts | Try to build everything in one massive prompt |
| Ask for before/after code examples | Accept code without understanding changes |

**Common mistakes vibe coders make with Replit Agent:**

1. **Trusting default security settings** - The agent generates working code, not secure code. Always explicitly request security features.
2. **Skipping validation** - AI tools rarely add input validation unless you specifically ask for it.
3. **Not reviewing database queries** - Check every query for SQL injection vulnerabilities (look for string concatenation).
4. **Forgetting about secrets** - The agent will suggest creating .env files, but you should use Replit Secrets instead for anything sensitive.

**Iteration strategies for complex projects:**

Start with a basic structure prompt, verify it's correct, then add features one at a time. For example: (1) Set up database schema and connection, (2) Add user authentication, (3) Create CRUD operations, (4) Build frontend UI, (5) Add security hardening. This checkpoint approach makes debugging much easier than trying to fix a fully-generated app with multiple issues.

## FAQ

**Does Replit Agent write secure code by default?**

No, Replit Agent prioritizes working code over secure code. According to [Georgetown CSET's 2024 research](https://cset.georgetown.edu/publication/securing-ai-code-assistants/), only 55% of AI-generated code is secure across 80 common programming tasks. You must explicitly request security features like parameterized queries, input validation, and proper authentication in your prompts to avoid vulnerabilities like [SQL injection](/kb/security/vulnerabilities/sql-injection/) and [XSS](/kb/security/vulnerabilities/xss/).

**How do I prevent SQL injection in Replit Agent projects?**

Always specify in your prompt that database queries must use parameterized statements. Example: "All database queries MUST use parameterized statements with placeholders ($1, $2, etc.) instead of string concatenation to prevent SQL injection." After the agent generates code, search for string concatenation in queries (look for backticks or plus signs in SQL strings) and request fixes for any vulnerable patterns.

**Can I use Replit Agent for production applications?**

Yes, but only after thorough security review and testing. Replit Agent is excellent for prototyping and MVPs, but vibe coded applications often contain security flaws. Run your code through [VibeShip Scanner](https://scanner.vibeship.co) to detect vulnerabilities, add comprehensive input validation, implement proper authentication, and test all edge cases before deploying to production. Consider Replit's paid deployment options for production hosting with custom domains and autoscaling.

**How do I handle environment variables securely in Replit?**

Use Replit's Secrets feature (not .env files) for sensitive data. In your prompt, specify: "Store all secrets in Replit Secrets and access them via process.env. Document which secrets need to be manually added in the README." After the agent generates code, manually add secrets through the Secrets tab in the Replit interface. Secrets are encrypted and not visible in the code editor, unlike .env files which can be accidentally committed to version control.

**What's the difference between Replit Agent and Cursor?**

Replit Agent generates entire applications from scratch in a cloud-based environment, while [Cursor](/kb/vibe-coding-tools/cursor/) is a local code editor that edits existing codebases. Replit Agent is better for prototyping new projects quickly without local setup, while Cursor is better for iterating on existing code with full control over your development environment. For security-sensitive projects, Cursor's local execution may be preferable to Replit's cloud-based approach.

## Related Resources

**AI Tool Security Guides:**
- [Cursor Security Patterns](/kb/vibe-coding-tools/cursor/) - Compare Cursor vs Replit security
- [Claude Code Security](/kb/vibe-coding-tools/claude-code/) - Local AI coding with security focus
- [Bolt Security Patterns](/kb/vibe-coding-tools/bolt/) - Another cloud-based AI builder
- [AI Coding Tools Comparison](/kb/vibe-coding-tools/) - Full comparison of security features

**Vulnerability Prevention:**
- [SQL Injection: Find & Fix](/kb/security/vulnerabilities/sql-injection/) - Detect in AI-generated code
- [Hardcoded Secrets](/kb/security/vulnerabilities/hardcoded-secrets/) - Environment variable best practices
- [XSS Prevention](/kb/security/vulnerabilities/xss/) - Sanitize user input in AI code
- [Authentication Vulnerabilities](/kb/security/vulnerabilities/broken-authentication/) - Secure auth patterns

**Prompt Engineering:**
- [Claude Code Prompts](/kb/prompts/claude-code-prompts/) - Security-focused prompts for Claude
- [Cursor Prompts](/kb/prompts/cursor-prompts/) - Effective prompts for Cursor
- [Security Prompts Library](/kb/prompts/) - Copy-paste security prompt templates

**Security Scanning:**
Ready to scan your Replit projects for vulnerabilities? [Run VibeShip Scanner](https://scanner.vibeship.co) to detect SQL injection, hardcoded secrets, XSS, and other common issues in AI-generated code.
