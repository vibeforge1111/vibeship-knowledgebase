# Content Brief: Sensitive Data Exposure

## Status

```yaml
status: DONE
created_at: 2025-12-17T17:30:00Z
created_by: Research Agent (Terminal 1)
claimed_by: Writer Agent
claimed_at: 2025-12-17T17:45:00Z
completed_at: 2025-12-17T18:30:00Z
```

---

## Article Metadata

```yaml
type: vulnerability
slug: sensitive-data-exposure
url: /kb/security/vulnerabilities/sensitive-data-exposure/
title: "Sensitive Data Exposure: When AI Leaks Your Secrets"
meta_description: "AI tools expose secrets in error messages, logs, and API responses. Learn CWE-200, CWE-209 patterns and how to prevent sensitive data from leaking to attackers."
cwe: CWE-200
cwe_secondary: CWE-209
owasp: A02:2021-Cryptographic Failures
owasp_url: https://owasp.org/Top10/A02_2021-Cryptographic_Failures/
cwe_url: https://cwe.mitre.org/data/definitions/200.html
severity: High
word_count: 1200-1500
```

---

## Core Data

### Primary References
| Reference | ID | Link |
|-----------|-----|------|
| CWE-200 | Exposure of Sensitive Information to an Unauthorized Actor | https://cwe.mitre.org/data/definitions/200.html |
| CWE-209 | Generation of Error Message Containing Sensitive Information | https://cwe.mitre.org/data/definitions/209.html |
| CWE-532 | Information Exposure Through Log Files | https://cwe.mitre.org/data/definitions/532.html |
| OWASP A02:2021 | Cryptographic Failures (formerly Sensitive Data Exposure) | https://owasp.org/Top10/A02_2021-Cryptographic_Failures/ |
| OWASP Error Handling | Error Handling Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html |

### OWASP Naming Change
- **OWASP Top 10 2017:** A3 - Sensitive Data Exposure (symptom-based)
- **OWASP Top 10 2021:** A02 - Cryptographic Failures (root cause)
- **Reason:** Shifted focus from symptom (data exposed) to root cause (cryptography/handling failures)
- Sensitive data exposure is now considered an *outcome* of various failures, not a category itself

### Key Facts to Include
- CWE-200 is in the CWE Top 25 Most Dangerous Software Weaknesses (2024)
- Stack traces can reveal internal structure, file paths, component versions
- Error messages help attackers identify specific exploitable vulnerabilities
- Console.log statements with sensitive data persist in production
- API responses often return entire database objects instead of filtered fields
- Information in URL query strings is logged by servers, proxies, browser history

---

## SEO Strategy

### Target Keywords
| Keyword | Search Intent | Priority |
|---------|---------------|----------|
| sensitive data exposure | informational | Primary |
| error message security | informational | Primary |
| stack trace vulnerability | informational | Secondary |
| API data exposure | informational | Secondary |
| information disclosure vulnerability | informational | Secondary |
| CWE-200 | informational | Tertiary |

### People Also Ask (FAQs)
1. What is sensitive data exposure?
2. How do I prevent stack traces in production?
3. What data should never be in error messages?
4. How do I filter API responses to prevent data leakage?
5. Is console.log a security risk?

### Competitive Gap
**Top results analysis:**
- OWASP: Comprehensive but focuses on cryptography, less on logs/errors
- Generic security blogs: Not specific to AI-generated code patterns
- CWE pages: Technical definitions, not actionable

**Our unique angle:**
- AI tools generate verbose error messages for debugging
- AI includes console.log liberally (helpful for dev, dangerous in production)
- AI returns full database objects in API responses
- Copy-paste fixes specific to Next.js, Express patterns
- Framework-specific error handling configurations

---

## Content Outline

### Quick Answer (50 words max)
Sensitive data exposure happens when your app reveals secrets, user data, or system info through error messages, logs, or API responses. AI tools often generate verbose debugging code that leaks this data. Fix it by sanitizing errors, filtering responses, and removing console.log before production.

### Section 1: What is Sensitive Data Exposure?
- Plain English: Your app accidentally tells attackers things it shouldn't
- Examples of sensitive data:
  - User credentials, tokens, session IDs
  - Database queries, connection strings
  - Stack traces, file paths, internal IPs
  - API keys, third-party credentials
  - User PII (emails, addresses, phone numbers)
- OWASP renamed to "Cryptographic Failures" to focus on root cause
- Word count: 100-150

### Section 2: Three Ways Data Gets Exposed
- **Error Messages:** Stack traces, verbose errors expose internal structure
- **Logs:** console.log with passwords, tokens persists in cloud logs
- **API Responses:** Full database objects returned instead of filtered fields
- Real-world impact: Attackers use exposed info to craft targeted attacks
- Word count: 150-200

### Section 3: Why AI Tools Generate Leaky Code
- AI generates helpful debugging code (console.log everywhere)
- AI returns full objects for "flexibility" and "completeness"
- AI creates verbose error handlers that expose internal details
- "Make it work" doesn't include "make it production-safe"
- Error handling that aids debugging also aids attackers
- Word count: 100-150

### Section 4: Pattern 1 - Verbose Error Messages
```typescript
// VULNERABLE: AI generates helpful error messages
export async function POST(request: Request) {
  try {
    const user = await db.user.findUnique({
      where: { email: body.email }
    })
  } catch (error) {
    // Exposes internal details!
    return NextResponse.json({
      error: error.message,
      stack: error.stack,
      query: `SELECT * FROM users WHERE email = '${body.email}'`
    }, { status: 500 })
  }
}
```

**Secure version:**
```typescript
// SECURE: Generic error to client, detailed log server-side
export async function POST(request: Request) {
  try {
    const user = await db.user.findUnique({
      where: { email: body.email }
    })
  } catch (error) {
    // Log detailed error server-side
    console.error('User lookup failed:', {
      error: error.message,
      timestamp: new Date().toISOString(),
      // Don't log the actual email - use hash or truncate
      emailPrefix: body.email?.substring(0, 3) + '***'
    })

    // Return generic error to client
    return NextResponse.json({
      error: 'An error occurred. Please try again.'
    }, { status: 500 })
  }
}
```
- Word count: 150-200

### Section 5: Pattern 2 - Console.log with Sensitive Data
```typescript
// VULNERABLE: AI adds console.log for debugging
export async function login(email: string, password: string) {
  console.log('Login attempt:', { email, password }) // PASSWORD IN LOGS!

  const user = await authenticate(email, password)
  console.log('User authenticated:', user) // Full user object!

  const token = generateToken(user)
  console.log('Generated token:', token) // TOKEN IN LOGS!

  return token
}
```

**Secure version:**
```typescript
// SECURE: Never log sensitive data
export async function login(email: string, password: string) {
  // Log only non-sensitive identifiers
  console.log('Login attempt for:', email.substring(0, 3) + '***')

  const user = await authenticate(email, password)
  console.log('User authenticated:', user.id) // Only ID, not full object

  const token = generateToken(user)
  // Never log tokens - log success/failure only
  console.log('Token generated successfully for user:', user.id)

  return token
}
```
- Word count: 150-200

### Section 6: Pattern 3 - Over-Exposed API Responses
```typescript
// VULNERABLE: AI returns full database object
export async function GET(request: Request) {
  const { userId } = await request.json()

  // Returns EVERYTHING including password hash!
  const user = await db.user.findUnique({
    where: { id: userId }
  })

  return NextResponse.json(user)
}
```

**Secure version:**
```typescript
// SECURE: Return only needed fields
export async function GET(request: Request) {
  const { userId } = await request.json()

  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      // Explicitly exclude: password, tokens, internal flags
    }
  })

  return NextResponse.json(user)
}

// Or use a DTO (Data Transfer Object)
function toPublicUser(user: User): PublicUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  }
}
```
- Word count: 150-200

### Section 7: Pattern 4 - Query Strings with Sensitive Data
```typescript
// VULNERABLE: Sensitive data in URL
// GET /api/reset?token=abc123&email=user@example.com

export async function GET(request: Request) {
  const url = new URL(request.url)
  const token = url.searchParams.get('token')
  const email = url.searchParams.get('email')

  // These get logged in:
  // - Server access logs
  // - Browser history
  // - Proxy logs
  // - Referrer headers
}
```

**Secure version:**
```typescript
// SECURE: Use POST body for sensitive data
// POST /api/reset
// Body: { token: "abc123", email: "user@example.com" }

export async function POST(request: Request) {
  const { token, email } = await request.json()

  // Body data not logged by default
  // Not in browser history
  // Not in referrer headers
}
```
- Word count: 100-150

### Section 8: Framework Error Configuration
- Next.js: Disable stack traces in production
- Express: Use custom error handlers
- Environment-specific error verbosity
```typescript
// next.config.js
module.exports = {
  // Disable detailed errors in production
  productionBrowserSourceMaps: false,
}

// Express custom error handler
app.use((err, req, res, next) => {
  console.error(err.stack) // Log server-side

  res.status(500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message // Only in development
  })
})
```
- Word count: 100-150

### Section 9: AI Fix Prompt
```
Review my code for sensitive data exposure vulnerabilities:

1. **Error Messages**: Find try/catch blocks that return error.message, error.stack, or detailed error info to clients. Replace with generic messages and log details server-side.

2. **Console.log Statements**: Find console.log that includes:
   - Passwords, tokens, API keys
   - Full user objects
   - Database queries
   - Session data
   Remove or sanitize before production.

3. **API Responses**: Find endpoints that return full database objects. Add explicit field selection or use DTOs to return only public fields.

4. **Query Strings**: Find sensitive data passed in URL parameters (tokens, emails, IDs). Move to request body for POST requests.

5. **Stack Traces**: Ensure production error pages don't expose stack traces. Configure framework error handling.

For each issue:
- Show the vulnerable code
- Show the secure replacement
- Note the CWE reference (CWE-200, CWE-209, CWE-532)
```

### FAQ Section
- Use PAA questions above
- Each answer 50-100 words with citable fact

### Related Content
- Links to hardcoded-secrets (related exposure)
- Links to missing-auth (access control)
- Links to AI tool patterns

---

## Internal Links (7-10 required)

| Anchor Text | URL | Context/Placement |
|-------------|-----|-------------------|
| hardcoded secrets | /kb/security/vulnerabilities/hardcoded-secrets/ | Related exposure type |
| missing authentication | /kb/security/vulnerabilities/missing-auth/ | Access control context |
| IDOR | /kb/security/vulnerabilities/idor/ | Data access context |
| SQL injection | /kb/security/vulnerabilities/sql-injection/ | Error message exposure |
| XSS | /kb/security/vulnerabilities/xss/ | Output handling |
| Cursor security patterns | /kb/vibe-coding-tools/cursor/ | AI tool context |
| Claude Code security patterns | /kb/vibe-coding-tools/claude-code/ | AI tool context |
| Bolt security patterns | /kb/vibe-coding-tools/bolt/ | AI tool context |
| Next.js + Supabase security | /kb/security/stacks/nextjs-supabase/ | Framework context |

---

## External Links (8-12 required)

| Anchor Text | URL | Tier | Placement |
|-------------|-----|------|-----------|
| CWE-200: Exposure of Sensitive Information | https://cwe.mitre.org/data/definitions/200.html | 1 | Intro |
| CWE-209: Error Message Containing Sensitive Information | https://cwe.mitre.org/data/definitions/209.html | 1 | Error messages section |
| CWE-532: Information Exposure Through Log Files | https://cwe.mitre.org/data/definitions/532.html | 1 | Logging section |
| OWASP A02:2021 Cryptographic Failures | https://owasp.org/Top10/A02_2021-Cryptographic_Failures/ | 1 | Intro |
| OWASP Error Handling Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html | 1 | Fix section |
| OWASP Improper Error Handling | https://owasp.org/www-community/Improper_Error_Handling | 1 | Error section |
| OWASP Testing for Stack Traces | https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/08-Testing_for_Error_Handling/02-Testing_for_Stack_Traces | 1 | Testing section |
| Information Exposure Through Query Strings | https://owasp.org/www-community/vulnerabilities/Information_exposure_through_query_strings_in_url | 1 | Query string section |

---

## Notes for Writer Agent

### Tone Guidance
- **Practical over theoretical:** Focus on the specific patterns AI generates
- **Debug vs Production:** Emphasize the transition from development to production
- **Not just secrets:** Broader than hardcoded-secrets - includes errors, logs, responses
- **Actionable:** Each pattern has a clear before/after fix

### Technical Accuracy
- OWASP renamed the category from "Sensitive Data Exposure" to "Cryptographic Failures"
- CWE-200 is being reviewed because it's often misused as a catch-all
- Stack traces themselves aren't vulnerabilities but reveal exploitable info
- console.log persists in cloud logging services (Vercel, AWS CloudWatch)
- Query string data is logged by default in most web servers

### Things to Avoid
- Don't conflate with hardcoded-secrets (different vulnerability)
- Don't imply all logging is bad (structured, sanitized logging is good)
- Don't suggest removing all error handling (handle gracefully, just don't expose)
- Don't forget that development vs production error handling should differ

### Vibe Coding Terms
Use these 3-5 times naturally:
- vibe coding
- vibe coders
- vibe coded
- AI-generated code

---

## Checklist Before Marking READY

- [x] All external links verified working
- [x] CWE/OWASP references correct (CWE-200, CWE-209, CWE-532, A02:2021)
- [x] 9 internal links identified
- [x] 5 PAA questions included
- [x] Competitive gap is specific
- [x] Code examples drafted (4 patterns)
- [x] No placeholder text
- [x] Distinct from hardcoded-secrets article

---

**Brief Status:** READY for Writer Agent
