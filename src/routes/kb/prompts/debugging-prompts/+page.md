# Debugging Prompts: Fix Any Bug with AI Assistance

<div class="quick-answer">
<strong>Debugging prompts help AI systematically diagnose and fix bugs by providing structured context.</strong> Copy-paste templates that turn error messages into working fixes. Instead of guessing, get AI to analyze errors, interpret stack traces, and provide tested solutions.
</div>

<div class="metadata">
  <span class="reading-time">10 min read</span>
  <span class="last-updated">Last updated: December 2024</span>
</div>

## Why AI Debugging Works

AI debugging works because large language models can recognize patterns across millions of code examples that humans would miss. When you provide structured context—the error message, relevant code, and expected behavior—AI can correlate your specific issue with similar bugs it has seen and suggest proven solutions. According to research from [GitHub's 2024 Developer Survey](https://github.blog/2024-06-03-survey-ai-wave-grows/), developers using AI-assisted debugging resolve issues 55% faster than traditional debugging methods.

## The Universal Debug Prompt

The universal debug prompt works for any error in any language by providing AI with the three essential pieces of information it needs: what broke, what you were trying to do, and what actually happened.

```
Debug this error:

Error message:
[PASTE THE EXACT ERROR MESSAGE HERE]

Code that caused it:
[PASTE THE RELEVANT CODE - 10-50 lines including the error location]

What I expected:
[Describe what should happen - be specific]

What actually happened:
[Describe the actual behavior you're seeing]

Environment:
- Framework: [e.g., Next.js 14, SvelteKit 2.0]
- Language version: [e.g., Node 20, TypeScript 5.3]
- Key dependencies: [list relevant packages]

Please:
1. Explain WHY this error occurred (root cause)
2. Show me the EXACT fix with before/after code
3. Explain how to prevent this in the future
4. Suggest related issues I should check
```

## Error Message Analysis Prompt

Error message analysis helps AI decode cryptic JavaScript and TypeScript errors by examining the full error context, including the stack trace origin and surrounding code patterns.

Use this prompt when you get confusing errors like "Cannot read property 'X' of undefined" or "Unexpected token":

```
Analyze this error message:

Error:
[PASTE FULL ERROR INCLUDING LINE NUMBERS]

Code context (20 lines around the error):
[PASTE CODE WITH LINE NUMBERS]

This error started after:
[Describe what changed - new dependency, refactor, etc.]

Please:
1. Translate this error into plain English
2. Show me exactly which line/variable is causing it
3. Explain what makes this value undefined/null/wrong
4. Provide a working fix with explanation
5. Show me how to add safeguards to catch this earlier
```

**Example walkthrough:**

Error: `TypeError: Cannot read property 'map' of undefined at UserList.tsx:42`

The AI will identify that `users` is undefined, likely because:
- The API call hasn't completed yet (async timing)
- The API returned an error (missing error handling)
- The prop wasn't passed correctly (component wiring)

Fix: Add optional chaining and default value:
```javascript
// ❌ VULNERABLE
return users.map(user => <UserCard user={user} />)

// ✅ SECURE
return users?.map(user => <UserCard user={user} />) ?? <p>No users found</p>
```

## Stack Trace Interpretation Prompt

Stack trace interpretation helps AI identify the root cause by analyzing the call stack, not just the final error location where symptoms appear.

```
Interpret this stack trace:

Full stack trace:
[PASTE ENTIRE STACK TRACE]

Relevant source code:
File 1 - [filename]:
[PASTE CODE FOR TOP STACK FRAME]

File 2 - [filename]:
[PASTE CODE FOR SECOND STACK FRAME]

What I was doing when it crashed:
[User action or API call that triggered it]

Please:
1. Identify the ROOT CAUSE (not just where it crashed)
2. Explain the chain of events from root cause to crash
3. Show which stack frame contains the bug
4. Provide a fix for the root cause
5. Suggest how to add better error context for future debugging
```

**Example with root cause analysis:**

Stack trace shows:
```
at processUserData (utils.ts:89)
at handleSubmit (UserForm.tsx:42)
at onClick (Button.tsx:12)
```

AI identifies: The crash is at `processUserData` but the root cause is in `handleSubmit` - it passes unsanitized user input without validation. The fix belongs in `handleSubmit`, not `processUserData`.

## TypeScript Error Prompt

TypeScript errors need special handling because the compiler error messages often point to symptoms rather than the actual type mismatch causing the issue.

```
Fix this TypeScript error:

TypeScript error:
[PASTE FULL TS ERROR WITH TS#### CODE]

Code with the error:
[PASTE CODE SHOWING RED SQUIGGLES]

Type definitions:
[PASTE RELEVANT INTERFACES/TYPES]

What I'm trying to accomplish:
[Describe the goal]

Please:
1. Explain what type mismatch is actually happening
2. Show me where the type contract is broken
3. Provide 2-3 fix options (strictest to most flexible)
4. Recommend which fix is best and why
5. Show updated type definitions if needed
```

**Common TypeScript errors:**

**"Type X is not assignable to type Y"** - Usually caused by:
- Missing properties in an object
- Wrong function signature
- Incompatible generic constraints
- Null/undefined not handled

**"Property X does not exist on type Y"** - Usually caused by:
- Accessing properties before type guard
- Wrong interface imported
- Optional chaining needed
- Type narrowing issue

## React/Next.js Debug Prompt

React and Next.js debugging requires understanding component lifecycle, hydration, and server/client boundaries that AI can help navigate.

```
Debug this React/Next.js error:

Error:
[PASTE ERROR - include "Hydration", "Hook", "Rendering" context]

Component code:
[PASTE FULL COMPONENT]

How this component is used:
[PASTE PARENT COMPONENT OR PAGE]

App Router config (if relevant):
[PASTE layout.tsx or page.tsx setup]

Please:
1. Explain what React rule or pattern is violated
2. Identify if this is server/client mismatch
3. Show the corrected component code
4. Explain the React concept I'm misunderstanding
5. Suggest how to structure this pattern correctly
```

**Common React/Next.js issues:**

**Hydration errors** - Server HTML doesn't match client:
- Date/time rendering (use `useEffect`)
- Random IDs (generate on server, pass as prop)
- `window`/`localStorage` on server (check `typeof window !== 'undefined'`)

**"Cannot update a component while rendering"** - State update during render:
- Move state updates to `useEffect`
- Don't call `setState` directly in component body
- Use event handlers, not immediate calls

**Hook errors** - "Hooks can only be called inside a function component":
- Hooks in wrong order
- Conditional hooks (use `useMemo` pattern)
- Hooks in callbacks (move to component body)

## API Error Debug Prompt

API debugging requires understanding HTTP status codes, network timing, authentication flows, and error response formats.

```
Debug this API error:

Error response:
Status: [HTTP STATUS CODE]
Body: [PASTE ERROR RESPONSE JSON/TEXT]

Request details:
Method: [GET/POST/PUT/DELETE]
URL: [FULL URL]
Headers: [PASTE RELEVANT HEADERS - REDACT SECRETS]
Body: [PASTE REQUEST BODY IF APPLICABLE]

Expected response:
[What should come back]

Code making the request:
[PASTE FETCH/AXIOS CODE]

Please:
1. Explain what this HTTP status means
2. Identify the likely cause (auth, validation, server, network)
3. Show how to fix the request
4. Add proper error handling
5. Suggest how to debug this type of error in the future
```

**Error categories:**

**4xx Client Errors** - Your code sent wrong request:
- 400 Bad Request - Invalid payload format
- 401 Unauthorized - Missing/expired auth token
- 403 Forbidden - Valid auth, insufficient permissions
- 404 Not Found - Wrong URL or resource deleted
- 422 Unprocessable Entity - Validation failed

**5xx Server Errors** - Backend problem:
- 500 Internal Server Error - Backend crashed
- 502 Bad Gateway - Proxy/load balancer issue
- 503 Service Unavailable - Server overloaded/down
- 504 Gateway Timeout - Request took too long

**CORS issues** - Browser blocked the request:
```
Access to fetch at 'https://api.example.com' from origin 'http://localhost:3000'
has been blocked by CORS policy
```
Fix: Configure CORS headers on backend, not frontend.

## Database Query Debug Prompt

Database errors often hide the real issue behind ORM abstractions - AI can translate between the ORM error and the underlying SQL problem.

```
Debug this database error:

Error:
[PASTE DATABASE ERROR]

Query code:
[PASTE PRISMA/SUPABASE/SQL CODE]

Schema:
[PASTE RELEVANT TABLE SCHEMAS]

Data being queried:
[Example data structure]

What I'm trying to do:
[Describe the database operation]

Please:
1. Explain what database operation failed
2. Identify if this is schema, query, or data issue
3. Show the corrected query
4. Explain the underlying SQL concept
5. Suggest indexes or schema changes if relevant
```

**Common database issues:**

**Prisma errors:**
- "Invalid `prisma.user.findUnique()` - Missing required field" - Schema mismatch
- "Unique constraint failed" - Duplicate value in unique column
- "Foreign key constraint failed" - Referenced record doesn't exist

**Supabase/PostgreSQL errors:**
- "new row violates row-level security policy" - RLS blocking query
- "column does not exist" - Schema migration not applied
- "syntax error at or near" - Raw SQL syntax issue

**Connection issues:**
- "Can't reach database server" - Connection string wrong
- "Too many connections" - Connection pool exhausted
- "SSL connection required" - Missing `?sslmode=require`

## Rubber Duck Debugging Prompt

Rubber duck debugging flips the script - instead of giving AI the answer, have AI ask YOU questions to help you discover the solution yourself through the Socratic method.

```
I'm completely stuck on this bug. Please use the Socratic method to help me debug it.

The problem:
[Describe what's broken]

What I've tried:
1. [First attempt]
2. [Second attempt]
3. [Third attempt]

Code:
[PASTE RELEVANT CODE]

Please:
1. DON'T give me the answer yet
2. Ask me questions about my code and assumptions
3. Help me identify what I'm overlooking
4. Guide me to discover the solution myself
5. Only reveal the answer if I'm truly stuck after 5+ questions

Start by asking me about [suggest starting point].
```

This method is powerful when:
- You're learning and want to understand, not just fix
- The bug is in your mental model, not the code
- You've been staring at it too long and need fresh perspective
- You want to develop debugging intuition

AI will ask questions like:
- "What do you expect this variable to be at line 42?"
- "Have you checked what the API actually returns?"
- "What happens if the array is empty?"
- "Is this code path even executing?"

## The Systematic Debug Workflow

Follow this five-step workflow when debugging any issue to provide AI with complete context and verify fixes properly.

**Step 1: Reproduce the error reliably**

Before asking AI, make sure you can trigger the bug consistently. Identify:
- Exact steps to reproduce
- Required conditions (logged in/out, data state)
- Browser/environment specifics

**Step 2: Gather complete context**

Collect everything AI needs:
- Full error message and stack trace
- Code where error occurs (10-50 lines)
- Relevant dependencies and versions
- Recent changes that might have caused it
- Expected vs actual behavior
- Environment (dev/prod, browser, OS)

**Step 3: Choose the appropriate prompt**

Select the debug prompt matching your error type:
- Generic error → Universal Debug Prompt
- Confusing error message → Error Message Analysis
- Complex crash → Stack Trace Interpretation
- TypeScript type error → TypeScript Error Prompt
- React component issue → React/Next.js Debug Prompt
- API call failing → API Error Debug Prompt
- Database query problem → Database Query Debug Prompt
- Totally stuck → Rubber Duck Debugging Prompt

**Step 4: Apply the fix carefully**

When AI suggests a solution:
- Read the explanation, don't just copy code
- Understand WHY it fixes the issue
- Check for similar patterns elsewhere in your code
- Apply the fix in one place first
- Test thoroughly before applying everywhere

**Step 5: Verify the fix**

Confirm the bug is actually fixed:
- Reproduce the original error steps - should now work
- Test edge cases AI mentioned
- Check that the fix didn't break anything else
- Add a test to prevent regression (if applicable)
- Document the fix if it was non-obvious

If the bug persists or returns, you likely fixed a symptom, not the root cause. Go back to Step 2 with more context.

## FAQ

### What if AI gives the wrong fix?

AI gives wrong fixes when context is incomplete or the error is ambiguous. If the first fix doesn't work, provide more context: show the full file, include surrounding code, add console.log output, paste the network request/response. Often the "wrong" fix reveals what information was missing. Also try being more specific about what you've already tried and what didn't work.

### How much code should I include?

Include 10-50 lines around the error location - enough for AI to see how variables are defined and functions are called. If AI needs more context, it will ask. For component errors, include the full component (not just one function). For API errors, include the request code and response handling. Don't paste your entire codebase - focus on the relevant module.

### Should I include the whole file?

Include the whole file when the error involves: component lifecycle (React/Svelte), module imports, type definitions, or class structure. For simple function errors, just show the function and its callers. When debugging TypeScript, include interface definitions even if they're in another file. If the file is over 200 lines, paste the relevant sections and mention "there are other functions below."

### Can AI debug production issues?

AI can debug production issues if you provide production logs, error tracking data (Sentry, LogRocket), and reproduction steps. However, AI cannot access your production environment directly. For production issues: paste error logs from your logging service, include request/response examples from production traffic, note production-specific config differences (environment variables, database), and test fixes in staging before deploying. AI is excellent at analyzing production error patterns.

### What if the same bug keeps coming back?

Recurring bugs indicate you're fixing symptoms, not root causes. Use the Rubber Duck Debugging Prompt to question your assumptions. Ask AI to analyze the pattern: "This bug happens every time I [action]. I've fixed it 3 times by [fix], but it returns. What am I missing?" Often recurring bugs reveal architectural issues - missing validation, improper state management, race conditions, or unclear contracts between modules. AI can help identify the deeper pattern.

## Related Resources

**Prompt Engineering:**
- [Testing Prompts: Write Tests with AI](/kb/prompts/testing-prompts/) - Generate comprehensive test suites
- [Refactoring Prompts: Improve Code Quality](/kb/prompts/refactoring-prompts/) - Clean up and optimize code
- [Security Prompts: Find and Fix Vulnerabilities](/kb/prompts/security-prompts/) - Audit code for security issues

**Security Debugging:**
- [SQL Injection: Find & Fix in AI Code](/kb/security/vulnerabilities/sql-injection/) - Debug database query vulnerabilities
- [XSS: Find & Fix in AI Code](/kb/security/vulnerabilities/xss/) - Debug cross-site scripting issues
- [Hardcoded Secrets: Find & Fix](/kb/security/vulnerabilities/hardcoded-secrets/) - Debug exposed credentials

**AI Coding Tools:**
- [Cursor AI: Security Patterns](/kb/vibe-coding-tools/cursor/) - Debugging Cursor-generated code
- [Claude Code: Security Guide](/kb/vibe-coding-tools/claude-code/) - Debugging Claude Code projects
- [Bolt: Security Analysis](/kb/vibe-coding-tools/bolt/) - Debugging Bolt.new applications

---

<div class="cta-box">

## Debug Faster with VibeShip Scanner

Stop debugging manually. [VibeShip Scanner](https://scanner.vibeship.co) automatically detects bugs in AI-generated code before they reach production.

**Catch issues like:**
- Type errors and null references
- API integration problems
- Database query issues
- React/Next.js hydration bugs

[Scan Your Code Free →](https://scanner.vibeship.co)

</div>
