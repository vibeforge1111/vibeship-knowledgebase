# Prompt Engineering for Code: Developer's Complete Guide

<div class="quick-answer">
<strong>Prompt engineering for code is the skill of writing instructions that get AI to generate correct, secure, working code.</strong> Focus on context, examples, and constraints rather than clever tricks. The most effective approach is "context engineering"—filling the AI's context window with task descriptions, examples, and relevant code rather than optimizing prompt phrasing.
</div>

## What Is Prompt Engineering for Code?

Prompt engineering for code is the practice of crafting instructions that guide AI coding tools to generate correct, secure, and maintainable code. Unlike general prompting, code-focused prompting requires technical precision, security awareness, and understanding of how AI models interpret programming patterns.

For vibe coders using tools like [Cursor](/kb/vibe-coding-tools/cursor/), [Claude Code](/kb/vibe-coding-tools/claude-code/), Bolt, or ChatGPT, prompt engineering is the difference between spending hours debugging AI-generated bugs versus shipping working features quickly. According to [Anthropic's prompt engineering guide](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview), effective prompting can improve task success rates from 60% to 95%.

The paradigm shift from "prompt engineering" to **"context engineering"** (coined by [Simon Willison](https://simonwillison.net/2023/May/12/prompt-injection/)) emphasizes filling the AI's context window with relevant information rather than finding magic words. Give the AI examples, specifications, constraints, and relevant code—not clever phrasing.

## The 6 Core Techniques

These six techniques form the foundation of effective prompt engineering for code. Master these before exploring advanced patterns.

**1. Be Clear and Direct**

State exactly what you want in simple, unambiguous language. AI models respond better to direct instructions than subtle hints. Instead of "maybe add some validation," write "validate email format with regex, check length is under 255 characters, return error if invalid."

**2. Use Examples (Few-Shot/Multishot)**

Show the AI what you want with 2-5 complete examples. Few-shot prompting dramatically improves accuracy because AI learns your style and requirements from examples rather than descriptions. Include input, expected output, and edge cases.

**3. Chain of Thought**

Add "think step by step" or "reason through this" for complex logic. Chain of thought prompting encourages AI to show its reasoning process, which reduces logical errors and makes debugging easier. Particularly effective for algorithm design, debugging, and security analysis.

**4. XML Tags for Structure**

Use XML-style tags like `<context>`, `<task>`, `<constraints>`, `<format>` to organize prompts. This technique, recommended by [Anthropic's docs](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/use-xml-tags), helps AI parse different sections and prevents instruction mixing.

**5. System Prompts**

Configure the AI's base behavior with system-level instructions. System prompts set the overall context, role, and constraints before individual tasks. In Cursor, this is [`.cursorrules`](/kb/prompts/cursor-rules/). In Claude Code, it's [`CLAUDE.md`](/kb/prompts/claude-md/).

**6. Response Prefilling**

Start the AI's response for it to guide output format. For code generation, prefill with `// Solution:\n` or `function validateEmail(` to immediately get code rather than explanations. Works best with Claude models.

## Context Engineering: The New Paradigm

Context engineering recognizes that modern AI models have massive context windows (200K+ tokens) that should be filled strategically rather than kept minimal. Instead of writing the perfect 50-word prompt, provide the AI with comprehensive context that makes the task obvious.

**What to include in context:**

- **Task description**: Exactly what you need, expected behavior, edge cases
- **Examples**: 2-5 complete input/output pairs showing the pattern
- **Relevant code**: Existing functions, types, patterns to match
- **Constraints**: Security requirements, performance limits, framework patterns
- **State/background**: Project architecture, naming conventions, dependencies

According to [Eugene Yan's research on prompting](https://eugeneyan.com/writing/prompting/), context-rich prompts outperform optimized short prompts by 30-40% on complex coding tasks. The AI has the capacity—use it.

**Example: Context-poor vs context-rich**

```markdown
❌ CONTEXT-POOR:
"Create a login function"

✅ CONTEXT-RICH:
<context>
We use Next.js 14 with Supabase for auth. User data is stored in profiles table with email, hashed_password, role columns.
</context>

<task>
Create a secure login API route at /api/auth/login that:
1. Accepts email and password in request body
2. Validates inputs with Zod
3. Checks credentials against Supabase
4. Returns JWT token on success
5. Rate limits to 5 attempts per 15 minutes
</task>

<security-constraints>
- Use parameterized queries (no SQL injection)
- Hash passwords with bcrypt
- Return generic error messages (don't reveal if email exists)
- Set HttpOnly cookies for JWT
</security-constraints>

<example>
// Expected usage:
POST /api/auth/login
Body: { email: "user@example.com", password: "SecurePass123!" }

Success: { token: "jwt_token_here", user: { id: 1, email: "user@example.com" } }
Error: { error: "Invalid credentials" }
</example>
```

The context-rich version gives the AI everything needed to generate correct, secure code in one attempt.

## Few-Shot Prompting for Code

Few-shot prompting means providing 2-5 complete examples of the pattern you want. This technique is particularly powerful for code because AI learns your style, naming conventions, error handling patterns, and security practices from examples.

**Why examples beat descriptions:**

- AI sees the exact format you want (indentation, naming, structure)
- Examples show edge cases and error handling
- Security patterns are demonstrated, not just described
- Output is consistent with your existing codebase

**How many examples?**

- **0-shot (no examples)**: For common patterns AI knows well (basic CRUD, standard validations)
- **1-shot (one example)**: For simple, well-defined tasks with clear patterns
- **2-5 shot (multiple examples)**: Optimal range for most coding tasks
- **5+ shot (many examples)**: Rarely better than 2-5; diminishing returns

Research by [OpenAI](https://platform.openai.com/docs/guides/prompt-engineering) shows that 3 examples is the sweet spot for most programming tasks. More examples consume context without improving quality.

**Example: Few-shot for security-aware validation**

```javascript
<examples>
// Example 1: Email validation
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || typeof email !== 'string') {
    throw new ValidationError('Email is required');
  }

  if (email.length > 255) {
    throw new ValidationError('Email too long');
  }

  if (!emailRegex.test(email)) {
    throw new ValidationError('Invalid email format');
  }

  return email.toLowerCase().trim();
}

// Example 2: Password validation
function validatePassword(password) {
  if (!password || typeof password !== 'string') {
    throw new ValidationError('Password is required');
  }

  if (password.length < 12) {
    throw new ValidationError('Password must be at least 12 characters');
  }

  if (!/[A-Z]/.test(password)) {
    throw new ValidationError('Password must contain uppercase letter');
  }

  if (!/[a-z]/.test(password)) {
    throw new ValidationError('Password must contain lowercase letter');
  }

  if (!/[0-9]/.test(password)) {
    throw new ValidationError('Password must contain number');
  }

  return password; // Don't trim passwords
}
</examples>

<task>
Now create a validateUsername function following the same pattern.
Requirements:
- 3-20 characters
- Alphanumeric and underscore only
- Cannot start with underscore
- Cannot contain consecutive underscores
</task>
```

The AI learns your error handling style, validation structure, and security-conscious approach from examples. Output will match your existing code patterns.

**Security-focused few-shot:**

When generating security-sensitive code, provide examples showing secure patterns explicitly:

```javascript
<examples>
// Example 1: Secure database query with parameterization
async function getUserById(userId) {
  // ✅ SECURE: Parameterized query prevents SQL injection
  const result = await db.query(
    'SELECT id, email, name FROM users WHERE id = $1',
    [userId]
  );
  return result.rows[0];
}

// Example 2: Secure file access with path validation
async function readUserFile(filename) {
  // ✅ SECURE: Whitelist validation prevents path traversal
  if (!/^[a-zA-Z0-9_-]+\.txt$/.test(filename)) {
    throw new SecurityError('Invalid filename');
  }

  const safePath = path.join(UPLOAD_DIR, filename);

  // Verify path is still within UPLOAD_DIR
  if (!safePath.startsWith(UPLOAD_DIR)) {
    throw new SecurityError('Path traversal attempt');
  }

  return fs.readFile(safePath, 'utf8');
}
</examples>

<task>
Create a secure function to delete user files by filename.
</task>
```

The AI now knows your security requirements: parameterized queries, input validation, path sanitization.

## Chain of Thought for Code

Chain of thought (CoT) prompting asks the AI to "think step by step" before generating code. This technique dramatically improves performance on complex logic, debugging, and security analysis.

**When to use chain of thought:**

- **Debugging**: "Explain step-by-step why this code fails"
- **Algorithm design**: "Think through the algorithm before implementing"
- **Security analysis**: "Reason through potential attack vectors"
- **Complex business logic**: "Break down the requirements into steps"

**When NOT to use chain of thought:**

- Simple, well-defined tasks (adds unnecessary verbosity)
- When you need code output only (CoT produces explanations first)
- Performance-critical contexts (CoT uses more tokens)

**Example: Debugging with chain of thought**

```javascript
<task>
This code is failing intermittently. Think step by step about why:

async function processOrders() {
  const orders = await getOrders();

  for (const order of orders) {
    await updateInventory(order.items);
    await sendEmail(order.customerEmail);
    await markOrderComplete(order.id);
  }
}

Error: "Order 12847 marked complete but inventory unchanged"
</task>
```

With "think step by step," the AI will reason:
1. Function processes orders sequentially
2. If `updateInventory()` fails, execution stops (unhandled async error)
3. `markOrderComplete()` never runs for that order
4. Race condition possible if multiple processes run simultaneously
5. Solution: Add transaction wrapper or error handling

Without CoT, the AI might jump to a superficial fix without identifying the root cause.

**Chain of thought for security reasoning:**

```javascript
<task>
Analyze this authentication code for security vulnerabilities. Think through each potential attack vector step by step:

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await db.query(
    `SELECT * FROM users WHERE username = '${username}'`
  );

  if (user && user.password === password) {
    req.session.userId = user.id;
    res.json({ success: true });
  } else {
    res.json({ success: false, error: 'Invalid username or password' });
  }
});
</task>
```

Chain of thought security analysis will identify:
1. SQL injection via string concatenation in query
2. Passwords stored in plaintext (compared with `===`)
3. No rate limiting (brute force possible)
4. Timing attack (error messages reveal if username exists)
5. Session fixation (no session regeneration)

This systematic reasoning catches multiple vulnerabilities that simple prompting misses.

## Structuring Prompts with XML Tags

XML-style tags organize complex prompts into clear sections. This technique, recommended by [Anthropic](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/use-xml-tags), prevents instruction mixing and helps AI parse different types of information.

**Common tags for code prompts:**

- `<context>` - Background info, project architecture, dependencies
- `<task>` - The specific thing you want done
- `<constraints>` - Requirements, limitations, rules
- `<security>` - Security-specific requirements
- `<examples>` - Few-shot examples
- `<format>` - Expected output format
- `<code>` - Existing code to reference or modify

**Complete template:**

```xml
<context>
Next.js 14 app with Supabase auth and PostgreSQL database.
User table: id (uuid), email (text), role (enum: 'user' | 'admin'), created_at (timestamp).
Using Zod for validation and bcrypt for password hashing.
</context>

<task>
Create a user registration API route at /api/auth/register.
</task>

<constraints>
- Must validate email format and password strength
- Password must be at least 12 characters with upper, lower, number, special char
- Check if email already exists before creating user
- Return descriptive validation errors
- Hash password before storing (never store plaintext)
</constraints>

<security>
- Use parameterized queries to prevent SQL injection
- Rate limit to 3 registration attempts per IP per hour
- Set secure, HttpOnly cookies for session
- Don't reveal whether email exists in error messages
</security>

<format>
Return a complete Next.js API route file ready to use.
Include imports, type definitions, and error handling.
</format>

<examples>
// Expected success response:
{ "success": true, "userId": "uuid-here" }

// Expected error responses:
{ "error": "Email already registered" }
{ "error": "Password must be at least 12 characters" }
{ "error": "Too many registration attempts. Try again in 1 hour." }
</examples>
```

XML tags create clear boundaries so the AI knows "this is context" vs "this is the task" vs "these are constraints." Result: More accurate code generation with fewer iterations.

## Tool-Specific Prompt Patterns

Different AI coding tools have different prompt mechanisms. Understanding tool-specific patterns improves results dramatically.

### Cursor: Rules + Inline Prompts

Cursor uses [`.cursorrules`](/kb/prompts/cursor-rules/) for project-wide instructions and Composer (Cmd+I) for inline prompts.

**`.cursorrules` best practices:**

```bash
# Security Rules
- Always use parameterized queries ($1, $2) never string concatenation
- Validate all user inputs with Zod before processing
- Never use dangerouslySetInnerHTML without DOMPurify sanitization
- Check for hardcoded secrets before committing (API keys, passwords)

# Code Style
- Use TypeScript strict mode
- Prefer async/await over .then() chains
- Extract magic numbers to named constants
- Add JSDoc comments for public functions

# Framework Patterns (Next.js 14)
- Use server actions for mutations, not API routes
- Implement loading.tsx and error.tsx for better UX
- Use Suspense boundaries for async components
- Validate inputs in both client and server components
```

**Composer inline prompts:**

Cursor Composer works best with task-focused prompts that reference specific files:

```
Review src/app/api/auth/login/route.ts for SQL injection vulnerabilities.
Check the database query on line 23. If vulnerable, fix using parameterized queries.
```

[Learn how to use Cursor rules effectively →](/kb/prompts/how-to-use-cursor-rules/)

### Claude Code: CLAUDE.md + Commands

Claude Code reads [`CLAUDE.md`](/kb/prompts/claude-md/) in your project root for persistent instructions and context.

**`CLAUDE.md` structure:**

```markdown
# Project: MyApp

## Stack
Next.js 14, Supabase, TypeScript, Zod validation

## Code Patterns
- Use server actions in app/actions/ directory
- Validate with Zod schemas defined in lib/schemas/
- Database access through lib/db.ts wrapper
- Error handling: throw custom error classes, catch in error boundaries

## Security Requirements
- OWASP Top 10 compliance required
- All database queries use parameterized statements
- Input validation on both client and server
- Authentication required for /api/* and /dashboard/*
- Rate limiting on auth endpoints: 5 attempts per 15 minutes

## Naming Conventions
- React components: PascalCase (UserProfile.tsx)
- Utility functions: camelCase (validateEmail.ts)
- Database tables: snake_case (user_profiles)
- Environment variables: SCREAMING_SNAKE_CASE
```

Claude Code persists this context across the entire session. No need to repeat yourself.

**Command-based prompts:**

```
Scan all API routes for authentication bypass vulnerabilities.
Focus on routes in app/api/ that don't use the requireAuth middleware.
```

### ChatGPT: Custom Instructions

ChatGPT uses Custom Instructions (Settings > Custom Instructions) for persistent context.

**Custom Instructions for code:**

```
## About me
I'm building a Next.js 14 SaaS app with Supabase auth and PostgreSQL.
I'm a founder with basic JavaScript knowledge but limited security experience.

## How I want you to respond
- Prioritize secure code patterns (OWASP Top 10 compliance)
- Show before/after code examples for fixes
- Explain security vulnerabilities in plain English
- Use TypeScript with full type annotations
- Include error handling in all examples
- Validate user inputs with Zod
- Default to server components in Next.js (only mark 'use client' when needed)
- Flag potential security issues before I ask
```

**In-chat prompts:**

ChatGPT works best with context included in each message:

```
I'm building a Next.js API route for user login (Supabase + JWT).

Create /api/auth/login that:
1. Validates email and password with Zod
2. Checks credentials against Supabase
3. Returns JWT token in HttpOnly cookie
4. Rate limits to 5 attempts per 15 minutes

Include full code with imports and security best practices.
```

### GitHub Copilot: Comments as Prompts

Copilot reads inline comments as prompt context. Write descriptive comments above code blocks:

```javascript
// Secure login function that:
// 1. Validates email format and password length
// 2. Uses parameterized query to prevent SQL injection
// 3. Compares hashed password with bcrypt
// 4. Returns JWT token on success
// 5. Rate limits to 5 attempts per 15 minutes per IP
async function login(email, password) {
  // Copilot will generate implementation here
}
```

Copilot also learns from surrounding code context. Open related files in tabs to improve suggestions.

## Security-First Prompting

Always include security constraints in code prompts. AI tools default to working code, not secure code, so security must be explicit.

**Security constraints to include:**

```xml
<security>
1. Input Validation
   - Validate all user inputs with schema validation (Zod, Joi)
   - Set max length limits (email: 255, password: 128)
   - Whitelist allowed characters, don't blacklist dangerous ones

2. Injection Prevention
   - Use parameterized queries for SQL (never string concatenation)
   - Escape outputs in HTML context (or use framework defaults)
   - Validate file paths to prevent path traversal

3. Authentication & Authorization
   - Verify authentication on all protected routes
   - Check object ownership before returning data (prevent IDOR)
   - Use role-based access control where needed

4. Data Protection
   - Hash passwords with bcrypt (12+ rounds)
   - Use environment variables for secrets (never hardcode)
   - Set HttpOnly, Secure, SameSite cookies for sessions

5. Rate Limiting
   - Limit auth attempts: 5 per 15 minutes
   - Limit API calls: 100 per minute per user
   - Implement exponential backoff for sensitive operations
</security>
```

**Example: Security-aware prompt**

```
<task>
Create a password reset API route at /api/auth/reset-password
</task>

<security>
According to OWASP A07:2021 (Identification and Authentication Failures):
- Generate cryptographically random reset token (32 bytes minimum)
- Hash token before storing in database
- Set token expiration (15 minutes max)
- Rate limit to 3 reset requests per hour per email
- Don't reveal if email exists in database
- Invalidate token after one use
- Send reset link over HTTPS only
- Include token in URL, not request body
</security>

<references>
- Use crypto.randomBytes() for token generation
- Use bcrypt to hash token before storage
- Check OWASP guidance: https://owasp.org/www-project-top-ten/2017/A2_2017-Broken_Authentication
</references>
```

This prompt ensures AI generates secure password reset, not a vulnerable pattern.

[See complete security prompts for code review →](/kb/prompts/security-prompts/)

## Common Prompting Mistakes

Avoid these common pitfalls when prompting AI for code generation.

### 1. Too Vague

**❌ Bad:**
```
"Create a login system"
```

**✅ Good:**
```
Create a Next.js API route for login at /api/auth/login that:
- Accepts email and password in POST body
- Validates with Zod (email format, password 12+ chars)
- Checks credentials against Supabase auth
- Returns JWT in HttpOnly cookie
- Rate limits to 5 attempts per 15 minutes
- Returns generic error (don't reveal if email exists)
```

Vague prompts produce generic code. Specific prompts produce code that works in your project.

### 2. Too Long

**❌ Bad:**
```
[3000-word essay about authentication, security history, OWASP Top 10, JWT vs sessions, bcrypt internals, then buried at the end: "create a login function"]
```

**✅ Good:**
```
<context>
Next.js 14 app with Supabase. Using JWT auth with 7-day expiration.
</context>

<task>
Create secure login API route.
</task>

<details>
[Only include essential details: validation requirements, security constraints, expected format]
</details>
```

Long prompts bury the actual task. Use XML tags to separate context from task.

### 3. No Examples

**❌ Bad:**
```
"Create validation functions for user inputs"
```

**✅ Good:**
```
Create validation functions following this pattern:

// Example: Email validation
function validateEmail(email) {
  if (!email || typeof email !== 'string') {
    throw new ValidationError('Email is required');
  }
  if (email.length > 255) {
    throw new ValidationError('Email too long');
  }
  return email.toLowerCase().trim();
}

Now create validatePassword and validateUsername.
```

Examples show the exact pattern you want. AI matches your style.

### 4. Ignoring Security

**❌ Bad:**
```
"Create a database query function"
```

**✅ Good:**
```
Create a secure database query function that:
- Uses parameterized queries ($1, $2) to prevent SQL injection
- Validates input types before querying
- Returns sanitized results (no password fields)
- Logs queries for security auditing
```

Security must be explicit. AI defaults to insecure patterns if not instructed otherwise.

### 5. Over-Prompting

Research on GPT-5 and Claude-4 shows diminishing returns from overly detailed prompts. These models are trained on massive codebases and understand programming patterns deeply.

**❌ Over-prompted:**
```
Create a function. Make sure to use camelCase. Don't forget semicolons. Add error handling. Use try/catch blocks. Handle edge cases. Add comments. Make it readable. Use const not var. Make sure it's ES6+. Add type hints. [continues for 500 words...]
```

**✅ Right level:**
```
Create a secure user lookup function:
- Query Supabase users table by email
- Use parameterized query
- Return user object or null if not found
- TypeScript with full types
```

Modern AI knows how to write functions. Focus on business logic and security requirements, not language basics.

## Advanced Patterns

Once you've mastered the core techniques, these advanced patterns unlock even better code generation.

### Self-Consistency (Multiple Outputs)

Generate multiple solutions and compare them. Useful for algorithm design and security-critical code.

**Technique:**
```
<task>
Create a secure session token generator.
Generate 3 different implementations using different approaches.
Then compare security properties of each approach.
</task>
```

The AI will produce multiple solutions and analyze trade-offs. You pick the best one or combine approaches.

**When to use:**
- Security-critical functionality (auth, crypto, validation)
- Performance optimization (multiple algorithms to benchmark)
- Complex business logic with edge cases

### Task Decomposition

Break complex tasks into smaller sub-tasks that AI handles sequentially.

**Technique:**
```
<task>
Build a complete user authentication system.

Step 1: Create database schema for users table
Step 2: Create registration API route with validation
Step 3: Create login API route with JWT generation
Step 4: Create password reset flow
Step 5: Create authentication middleware
Step 6: Write integration tests

Complete each step before moving to the next.
Show output for each step.
</task>
```

Sequential decomposition produces higher-quality code than asking for everything at once.

**When to use:**
- Building complete features (not just single functions)
- Complex integrations across multiple files
- When you need to verify each piece before proceeding

### Tree of Thoughts

Explore multiple solution paths before committing to implementation. Particularly useful for architecture decisions.

**Technique:**
```
<task>
We need to implement rate limiting for our API.

Think of 3 different approaches:
1. In-memory rate limiting (e.g., node-cache)
2. Redis-based rate limiting
3. Database-based rate limiting

For each approach:
- List pros and cons
- Estimate implementation complexity
- Identify security considerations
- Suggest when to use this approach

Then recommend which approach fits our Next.js + Vercel deployment.
</task>
```

Tree of Thoughts explores the solution space before coding. Better architectural decisions result.

**When to use:**
- Architecture decisions (choosing patterns, libraries, approaches)
- Performance trade-offs
- Security vs usability balance

### ReAct (Reason + Act)

Combine reasoning with action steps. AI reasons about what to do, then does it, then reasons about the result.

**Technique:**
```
<task>
Debug this failing test. Use ReAct pattern:

1. OBSERVE: Read the test and error message
2. REASON: Why is it failing?
3. ACT: Make one small fix
4. OBSERVE: Did it work? New error?
5. REASON: What to try next?
6. ACT: Next fix
... repeat until fixed

Test:
[paste failing test code and error]
</task>
```

ReAct produces systematic debugging instead of random changes.

**When to use:**
- Debugging complex issues
- Refactoring without breaking changes
- Incremental feature additions to existing code

## Measuring Prompt Quality

How do you know if your prompt is effective? Test systematically.

**Quality metrics:**

1. **First-attempt success rate**: Does the code work without modifications?
2. **Security correctness**: Does it pass security review?
3. **Code quality**: Is it maintainable and well-structured?
4. **Iteration count**: How many back-and-forth exchanges needed?

**Testing workflow:**

```
1. Write prompt
2. Generate code
3. Test code (does it compile? pass tests? meet requirements?)
4. Security review (any vulnerabilities?)
5. Note what worked and what didn't
6. Refine prompt based on gaps
7. Repeat with refined version
```

**A/B testing prompts:**

When optimizing prompts, test variations systematically:

```
Prompt A (current):
"Create a login function"

Prompt B (more specific):
"Create a secure Next.js login API route with Zod validation, parameterized queries, and rate limiting"

Prompt C (with examples):
[Prompt B + 2 examples of secure routes]

Test each on same task. Measure:
- Code correctness
- Security vulnerabilities
- Time to working solution
- Code maintainability
```

Keep the best-performing prompt and iterate from there.

**When to give up and restructure:**

If prompt iteration isn't working after 3-4 tries:
- Break task into smaller sub-tasks
- Provide more examples or context
- Try different AI tool (Claude vs GPT vs Cursor)
- Question if the task is well-defined enough

Sometimes "prompt engineering" reveals the real issue: unclear requirements.

## FAQ

### How long should prompts be?

Prompts should be as short as possible while including all necessary context. For simple tasks, 50-100 words is enough. For complex features, 300-500 words including examples and constraints is appropriate. Modern AI models have 100K+ token context windows—use it when needed, but don't pad unnecessarily.

Short prompt example (simple task):
```
Create a TypeScript function to validate email format using regex.
Return true if valid, false if invalid.
```

Long prompt example (complex task):
```
<context>
Next.js 14 with Supabase auth, TypeScript, Zod validation
</context>

<task>
Create /api/auth/register API route
</task>

<requirements>
[200 words of specific validation, security, error handling requirements]
</requirements>

<examples>
[2-3 complete request/response examples]
</examples>
```

Use XML tags to organize longer prompts so AI can parse different sections clearly.

### Does politeness matter?

No, politeness has no measurable impact on code generation quality according to [Anthropic's research](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview). "Please create a function" performs identically to "Create a function." Save tokens and be direct.

That said, clarity matters enormously. "Create a secure login function with Zod validation" beats "maybe add some validation if you think it's good?" Directness ≠ rudeness. Just be specific about what you want.

### How many examples do I need?

For most coding tasks, 2-3 examples is optimal. Research by [OpenAI](https://platform.openai.com/docs/guides/prompt-engineering/strategy-provide-examples) shows that 3-shot prompting often outperforms 5-shot or 10-shot. More examples consume context without improving results.

- **0 examples**: For very common patterns (basic CRUD, standard functions)
- **1 example**: For simple tasks with clear requirements
- **2-3 examples**: Optimal for most tasks (shows pattern and variation)
- **4-5 examples**: For complex patterns with many edge cases
- **6+ examples**: Rarely helpful; diminishing returns

Focus on example quality over quantity. Show the pattern, an edge case, and error handling.

### Should I use markdown or plain text?

Use markdown code blocks with language tags for better syntax highlighting and parsing. AI models are trained on markdown-formatted code and perform better with it.

**❌ Plain text (harder to parse):**
```
Create this function: function add(a, b) { return a + b; }
```

**✅ Markdown with language tag:**
````markdown
Create a function like this:

```javascript
function add(a, b) {
  return a + b;
}
```
````

For complex prompts, use XML tags + markdown blocks for maximum clarity.

### Can I prompt for security?

Yes, security-focused prompting is effective for catching common vulnerabilities like SQL injection, XSS, hardcoded secrets, and missing authentication. AI models have been trained on millions of examples of vulnerable code and secure fixes.

Include explicit security constraints in every prompt:
```
<security>
- Use parameterized queries to prevent SQL injection
- Validate all user inputs with Zod
- Return generic error messages (don't reveal system details)
- Rate limit to prevent brute force
</security>
```

However, AI cannot replace security professionals for complex authorization logic, business logic flaws, or advanced attack vectors. Use [security prompts for code review](/kb/prompts/security-prompts/), but also run automated scanners and consider professional audits for production applications.

### What if the AI ignores my prompt?

When AI ignores instructions, it usually means conflicting signals or unclear priority. Fix this by:

1. **Make critical requirements more explicit**: Move them to top of prompt
2. **Use XML tags to separate concerns**: `<critical>`, `<required>`, `<optional>`
3. **Reduce competing instructions**: Remove contradictory requirements
4. **Add examples that show the requirement**: AI learns from examples more than rules
5. **Use response prefilling**: Start the AI's response to force the format you want

Example of making requirements explicit:
```xml
<critical>
REQUIRED: Use parameterized queries ($1, $2) for all database access.
NEVER use string concatenation or template literals in SQL.
This is a security requirement and cannot be skipped.
</critical>

<task>
Create user lookup function...
</task>
```

If AI still ignores after clarification, the requirement may conflict with the task itself. Reconsider if the requirement is achievable.

### How do I learn prompt engineering?

Learn prompt engineering for code by practicing systematically and studying effective patterns. Start with these steps:

1. **Read official docs**:
   - [Anthropic's Claude prompt engineering guide](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview)
   - [OpenAI's prompting guide](https://platform.openai.com/docs/guides/prompt-engineering)

2. **Study real examples**:
   - [Cursor rules examples](/kb/prompts/cursor-rules-examples/)
   - [Security prompts collection](/kb/prompts/security-prompts/)
   - [Debugging prompts](/kb/prompts/debugging-prompts/)

3. **Practice deliberately**:
   - Take a task you know how to code manually
   - Write a prompt to generate it
   - Compare AI output to your solution
   - Refine prompt and repeat

4. **Build a prompt library**:
   - Save effective prompts for common tasks
   - Create templates for your stack (Next.js, React, etc.)
   - Share with team in [`.cursorrules`](/kb/prompts/cursor-rules/) or [`CLAUDE.md`](/kb/prompts/claude-md/)

5. **Learn from failures**:
   - When AI generates bad code, analyze why
   - What context was missing?
   - Were examples needed?
   - Security constraints unclear?

According to [Lilian Weng's comprehensive prompting guide](https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/), prompt engineering is learned through iteration more than theory. Write prompts, test results, refine, repeat.

## Related Resources

**Prompt Guides:**
- [Security Prompts: AI Code Review That Catches Vulnerabilities →](/kb/prompts/security-prompts/)
- [Debugging Prompts: Fix AI-Generated Code Faster →](/kb/prompts/debugging-prompts/)
- [Cursor Rules: Project-Wide Prompt Configuration →](/kb/prompts/cursor-rules/)
- [Cursor Rules Examples: Copy-Paste Templates →](/kb/prompts/cursor-rules-examples/)
- [How to Use Cursor Rules Effectively →](/kb/prompts/how-to-use-cursor-rules/)
- [CLAUDE.md: Context File for Claude Code →](/kb/prompts/claude-md/)

**Tool-Specific Guides:**
- [Cursor: AI Code Editor Security Analysis →](/kb/vibe-coding-tools/cursor/)
- [Claude Code: Anthropic's AI Coding Assistant →](/kb/vibe-coding-tools/claude-code/)
- [AI Coding Tools Security Comparison →](/kb/vibe-coding-tools/)

**Security Resources:**
- [SQL Injection: Detection and Prevention →](/kb/security/vulnerabilities/sql-injection/)
- [XSS (Cross-Site Scripting): Complete Guide →](/kb/security/vulnerabilities/xss/)
- [Hardcoded Secrets: Find and Remove →](/kb/security/vulnerabilities/hardcoded-secrets/)
- [OWASP Top 10 for Vibe Coders →](/kb/security/)

**External Resources:**
- [Anthropic Prompt Engineering Guide](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview) - Official Claude prompting documentation
- [OpenAI Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering) - GPT prompting strategies
- [Simon Willison on Prompt Engineering](https://simonwillison.net/tags/prompt-engineering/) - Context engineering paradigm
- [Eugene Yan: Prompting Guide](https://eugeneyan.com/writing/prompting/) - Research-backed techniques
- [Lilian Weng: Prompt Engineering](https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/) - Comprehensive academic overview

---

**Meta Description:**
Master prompt engineering for code with AI tools like Cursor, Claude Code, and ChatGPT. Learn context engineering, few-shot prompting, chain of thought, security-first patterns, and advanced techniques.

**Keywords:** prompt engineering for code, prompt engineering coding, ai prompting for developers, prompt engineering guide, context engineering, few-shot prompting, chain of thought, cursor prompts, claude code prompts, ai code generation, secure prompting, vibe coding prompts

**Schema Markup:**

```json
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "Prompt Engineering for Code: Developer's Complete Guide",
  "description": "Comprehensive guide to prompt engineering for code generation with AI tools. Learn context engineering, few-shot prompting, chain of thought, security-first patterns, tool-specific techniques, and advanced patterns for Cursor, Claude Code, ChatGPT, and Copilot.",
  "author": {
    "@type": "Organization",
    "name": "VibeShip"
  },
  "publisher": {
    "@type": "Organization",
    "name": "VibeShip",
    "logo": {
      "@type": "ImageObject",
      "url": "https://vibeship.co/logo.png"
    }
  },
  "datePublished": "2025-12-18",
  "dateModified": "2025-12-18",
  "keywords": ["prompt engineering", "code generation", "AI coding", "context engineering", "few-shot prompting", "chain of thought", "Cursor", "Claude Code", "vibe coding"]
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How long should prompts be?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Prompts should be as short as possible while including all necessary context. For simple tasks, 50-100 words is enough. For complex features, 300-500 words including examples and constraints is appropriate. Modern AI models have 100K+ token context windows, so use it when needed but don't pad unnecessarily."
      }
    },
    {
      "@type": "Question",
      "name": "Does politeness matter in prompts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, politeness has no measurable impact on code generation quality. 'Please create a function' performs identically to 'Create a function.' Be direct and specific about requirements instead."
      }
    },
    {
      "@type": "Question",
      "name": "How many examples do I need in prompts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For most coding tasks, 2-3 examples is optimal. Research shows that 3-shot prompting often outperforms 5-shot or 10-shot. More examples consume context without improving results. Focus on example quality over quantity."
      }
    },
    {
      "@type": "Question",
      "name": "Should I use markdown or plain text for code prompts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use markdown code blocks with language tags for better syntax highlighting and parsing. AI models are trained on markdown-formatted code and perform better with it. For complex prompts, combine XML tags with markdown blocks for maximum clarity."
      }
    },
    {
      "@type": "Question",
      "name": "Can I prompt for security in code generation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, security-focused prompting is effective for catching common vulnerabilities like SQL injection, XSS, hardcoded secrets, and missing authentication. Include explicit security constraints in every prompt. However, AI cannot replace security professionals for complex authorization logic or advanced attack vectors."
      }
    },
    {
      "@type": "Question",
      "name": "What if the AI ignores my prompt?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "When AI ignores instructions, make critical requirements more explicit at the top of the prompt, use XML tags to separate concerns, reduce competing instructions, add examples that show the requirement, and use response prefilling to force the format you want."
      }
    },
    {
      "@type": "Question",
      "name": "How do I learn prompt engineering?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Learn prompt engineering by practicing systematically: read official docs from Anthropic and OpenAI, study real examples, practice deliberately on tasks you know how to code, build a prompt library, and learn from failures. Prompt engineering is learned through iteration more than theory."
      }
    }
  ]
}
```
