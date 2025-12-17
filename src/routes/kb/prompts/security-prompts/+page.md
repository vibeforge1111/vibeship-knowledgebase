# Security Prompts: AI Code Review That Catches Vulnerabilities

<div class="quick-answer">
<strong>Security prompts are copy-paste code review instructions for AI tools like Cursor and Claude Code.</strong> Use them to catch SQL injection, XSS, auth bypass, and hardcoded secrets in vibe coded projects before deployment.
</div>

## Why You Need Security Prompts

AI coding tools generate vulnerable code by default because they prioritize working code over secure code. According to [OWASP's research on AI-assisted development](https://owasp.org/www-project-top-10-for-large-language-model-applications/), LLMs frequently produce code with security flaws including injection vulnerabilities, missing authentication, and insecure data handling.

Security prompts give your AI assistant specific instructions to review code through a security lens. Instead of asking "is this code good?" you provide structured prompts that check for specific vulnerabilities from the [OWASP Top 10](https://owasp.org/Top10/) and [CWE Top 25](https://cwe.mitre.org/top25/archive/2024/2024_cwe_top25.html) most dangerous software weaknesses.

For vibe coders, security prompts are essential because they transform your AI tool from a code generator into a security reviewer. Paste these prompts with your code to catch vulnerabilities before they reach production.

## SQL Injection Review Prompt

SQL injection ([CWE-89](https://cwe.mitre.org/data/definitions/89.html)) happens when user input is inserted directly into database queries, allowing attackers to manipulate or steal your entire database. This vulnerability ranks #3 in the [OWASP Top 10 under Injection attacks](https://owasp.org/Top10/A03_2021-Injection/).

**Copy this prompt:**

```
Review this code for SQL injection vulnerabilities:

1. Check for string concatenation or template literals building SQL queries
2. Check for user input (query params, body data, headers) placed directly into queries
3. Check for missing parameterized queries or prepared statements
4. Check for ORM methods that accept raw SQL strings

For each issue found:
- Explain WHY it's vulnerable (what an attacker could do)
- Show the EXACT line(s) of vulnerable code
- Provide a FIXED version using parameterized queries

[PASTE YOUR DATABASE CODE HERE]
```

**What it catches:**
- String concatenation in SQL queries
- Template literals with user input
- Raw query methods without parameterization
- Dynamic table/column names from user input

**Example vulnerable code:**

```javascript
// ❌ VULNERABLE - user input directly in query
app.get('/api/users/:id', async (req, res) => {
  const userId = req.params.id;
  const user = await db.query(`SELECT * FROM users WHERE id = ${userId}`);
  res.json(user);
});
```

**Example fixed code:**

```javascript
// ✅ SECURE - parameterized query
app.get('/api/users/:id', async (req, res) => {
  const userId = req.params.id;
  const user = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
  res.json(user);
});
```

[Learn more about SQL injection detection and prevention →](/kb/security/vulnerabilities/sql-injection/)

## XSS (Cross-Site Scripting) Review Prompt

Cross-Site Scripting ([CWE-79](https://cwe.mitre.org/data/definitions/79.html)) allows attackers to inject malicious JavaScript into your application, stealing user data or performing actions as the victim. XSS appears in the [OWASP Top 10 under Injection](https://owasp.org/Top10/A03_2021-Injection/).

**Copy this prompt:**

```
Review this code for XSS (Cross-Site Scripting) vulnerabilities:

1. Check for innerHTML, outerHTML, or dangerouslySetInnerHTML with user input
2. Check for unescaped data in HTML attributes (href, src, onclick, etc.)
3. Check for eval(), Function(), or setTimeout/setInterval with string arguments
4. Check for document.write() or document.writeln() with user data
5. Check for missing Content-Security-Policy headers
6. Check for React/Vue/Svelte components that bypass default escaping

For each issue found:
- Explain WHY it's vulnerable (DOM XSS, reflected XSS, or stored XSS)
- Show the EXACT line(s) of vulnerable code
- Provide a FIXED version with proper escaping or sanitization

[PASTE YOUR FRONTEND/BACKEND CODE HERE]
```

**What it catches:**
- DOM XSS via innerHTML
- Reflected XSS in server-rendered pages
- Stored XSS in user-generated content
- Attribute-based XSS in event handlers
- JavaScript URL schemes (javascript:, data:)

**Example vulnerable React code:**

```jsx
// ❌ VULNERABLE - dangerouslySetInnerHTML with user input
function Comment({ comment }) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: comment.text }}
    />
  );
}
```

**Example fixed code:**

```jsx
// ✅ SECURE - React escapes by default
function Comment({ comment }) {
  return <div>{comment.text}</div>;
}

// ✅ SECURE - If HTML needed, use DOMPurify
import DOMPurify from 'dompurify';

function Comment({ comment }) {
  const cleanHTML = DOMPurify.sanitize(comment.text);
  return (
    <div
      dangerouslySetInnerHTML={{ __html: cleanHTML }}
    />
  );
}
```

[Learn more about XSS detection and prevention →](/kb/security/vulnerabilities/xss/)

## Authentication Bypass Review Prompt

Authentication bypass vulnerabilities ([CWE-287](https://cwe.mitre.org/data/definitions/287.html)) allow attackers to access protected resources without valid credentials. This falls under [OWASP A07:2021 - Identification and Authentication Failures](https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/).

**Copy this prompt:**

```
Review this code for authentication bypass vulnerabilities:

1. Check for API routes/endpoints without authentication middleware
2. Check for client-side only authentication checks
3. Check for missing session validation on protected routes
4. Check for JWT verification skipped or incorrectly implemented
5. Check for hardcoded bypass credentials or backdoors
6. Check for authentication logic that can be bypassed with empty/null values

For each issue found:
- Explain WHY it's vulnerable (how auth can be bypassed)
- Show the EXACT line(s) of vulnerable code
- Provide a FIXED version with proper authentication checks

[PASTE YOUR ROUTE/API CODE HERE]
```

**What it catches:**
- Missing authentication middleware
- Client-side only auth checks
- JWT verification errors
- Session validation gaps
- Boolean bypass vulnerabilities

**Example vulnerable API route:**

```javascript
// ❌ VULNERABLE - no authentication check
app.get('/api/admin/users', async (req, res) => {
  const users = await db.query('SELECT * FROM users');
  res.json(users);
});

// ❌ VULNERABLE - client-side check only
app.get('/api/profile', async (req, res) => {
  // Relies on frontend to send valid user
  const userId = req.query.userId;
  const profile = await db.query('SELECT * FROM profiles WHERE id = $1', [userId]);
  res.json(profile);
});
```

**Example fixed route:**

```javascript
// ✅ SECURE - authentication middleware
const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

app.get('/api/admin/users', authenticate, async (req, res) => {
  // Check admin role
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const users = await db.query('SELECT * FROM users');
  res.json(users);
});

// ✅ SECURE - server-side auth
app.get('/api/profile', authenticate, async (req, res) => {
  // Use authenticated user ID from token, not query param
  const profile = await db.query(
    'SELECT * FROM profiles WHERE user_id = $1',
    [req.user.id]
  );
  res.json(profile);
});
```

## Hardcoded Secrets Review Prompt

Hardcoded secrets ([CWE-798](https://cwe.mitre.org/data/definitions/798.html)) are API keys, passwords, tokens, or credentials committed directly in code. Once pushed to git, these secrets are permanent in your repository history even if deleted later.

**Copy this prompt:**

```
Review this code for hardcoded secrets and credentials:

1. Check for API keys, passwords, tokens in code or config files
2. Check for database credentials hardcoded in connection strings
3. Check for JWT secrets, encryption keys, or cryptographic material
4. Check for OAuth client secrets or third-party API credentials
5. Check for cloud provider credentials (AWS, GCP, Azure keys)
6. Check for .env files committed to git (check .gitignore)

For each issue found:
- Identify the TYPE of secret (API key, password, token, etc.)
- Show the EXACT line(s) with hardcoded secrets
- Provide a FIXED version using environment variables
- List which secrets need to be rotated/regenerated

[PASTE YOUR CODE AND CONFIG FILES HERE]
```

**What it catches:**
- API keys in code
- Database passwords in connection strings
- JWT secrets
- Third-party service credentials
- Encryption keys
- Private keys and certificates

**Example vulnerable code:**

```javascript
// ❌ VULNERABLE - hardcoded credentials
const stripe = require('stripe')('sk_YOUR_STRIPE_SECRET_KEY_HERE');

const db = new Pool({
  host: 'localhost',
  user: 'admin',
  password: 'SuperSecret123!',
  database: 'production'
});

const JWT_SECRET = 'my-secret-key-12345';
```

**Example with environment variables:**

```javascript
// ✅ SECURE - using environment variables
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const db = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

const JWT_SECRET = process.env.JWT_SECRET;

// .env file (NEVER commit this file)
// STRIPE_SECRET_KEY=sk_your_secret_key
// DB_HOST=localhost
// DB_USER=admin
// DB_PASSWORD=SuperSecret123!
// DB_NAME=production
// JWT_SECRET=my-secret-key-12345

// .gitignore (MUST include)
// .env
// .env.local
// .env.*.local
```

[Learn more about hardcoded secrets detection →](/kb/security/vulnerabilities/hardcoded-secrets/)

## IDOR (Insecure Direct Object Reference) Review Prompt

IDOR ([CWE-639](https://cwe.mitre.org/data/definitions/639.html)) happens when users can access other users' data by changing IDs in URLs or request parameters. This vulnerability appears in [OWASP A01:2021 - Broken Access Control](https://owasp.org/Top10/A01_2021-Broken_Access_Control/).

**Copy this prompt:**

```
Review this code for IDOR (Insecure Direct Object Reference) vulnerabilities:

1. Check for routes that accept user/resource IDs without ownership validation
2. Check for database queries using IDs from URL params or request body
3. Check for missing authorization checks before fetching sensitive data
4. Check for file access using user-provided paths or filenames
5. Check for object references that should be limited by user role/permissions

For each issue found:
- Explain WHY it's vulnerable (what data could be accessed)
- Show the EXACT line(s) of vulnerable code
- Provide a FIXED version with ownership/authorization checks

[PASTE YOUR API/ROUTE CODE HERE]
```

**What it catches:**
- Missing ownership validation
- ID-based access without authorization
- File path manipulation
- Cross-user data access
- Missing role-based access control

**Example vulnerable code:**

```javascript
// ❌ VULNERABLE - no ownership check
app.get('/api/orders/:orderId', authenticate, async (req, res) => {
  const orderId = req.params.orderId;

  // Any authenticated user can view any order by changing orderId
  const order = await db.query(
    'SELECT * FROM orders WHERE id = $1',
    [orderId]
  );

  res.json(order);
});

// ❌ VULNERABLE - file access without validation
app.get('/api/documents/:filename', authenticate, async (req, res) => {
  const filename = req.params.filename;

  // Any user can read any file
  res.sendFile(`./uploads/${filename}`);
});
```

**Example with authorization checks:**

```javascript
// ✅ SECURE - ownership validation
app.get('/api/orders/:orderId', authenticate, async (req, res) => {
  const orderId = req.params.orderId;

  // Verify the order belongs to the authenticated user
  const order = await db.query(
    'SELECT * FROM orders WHERE id = $1 AND user_id = $2',
    [orderId, req.user.id]
  );

  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  res.json(order);
});

// ✅ SECURE - file ownership check
app.get('/api/documents/:filename', authenticate, async (req, res) => {
  const filename = req.params.filename;

  // Verify user owns this document
  const document = await db.query(
    'SELECT filepath FROM documents WHERE filename = $1 AND user_id = $2',
    [filename, req.user.id]
  );

  if (!document) {
    return res.status(404).json({ error: 'Document not found' });
  }

  res.sendFile(document.filepath);
});
```

## Input Validation Review Prompt

Missing input validation ([CWE-20](https://cwe.mitre.org/data/definitions/20.html)) allows attackers to send unexpected data that crashes your app or bypasses security controls. Proper validation is essential for preventing multiple OWASP Top 10 vulnerabilities.

**Copy this prompt:**

```
Review this code for input validation vulnerabilities:

1. Check for missing validation on user inputs (body, query, params, headers)
2. Check for type validation (expecting number but accepting string)
3. Check for length/size limits on strings, arrays, file uploads
4. Check for whitelist validation (allowed values) vs blacklist (blocked values)
5. Check for server-side validation (never trust client-side only)
6. Check for proper error handling that doesn't expose validation logic

For each issue found:
- Explain WHY missing validation is dangerous
- Show the EXACT line(s) with missing/weak validation
- Provide a FIXED version with Zod schema or equivalent validation

[PASTE YOUR API/ROUTE CODE HERE]
```

**What it catches:**
- Missing type validation
- No length limits
- Accepting unexpected fields
- Client-side only validation
- Weak regex patterns
- Missing sanitization

**Example vulnerable code:**

```javascript
// ❌ VULNERABLE - no validation
app.post('/api/users', async (req, res) => {
  const { email, age, role } = req.body;

  // No validation - accepts any data
  const user = await db.query(
    'INSERT INTO users (email, age, role) VALUES ($1, $2, $3) RETURNING *',
    [email, age, role]
  );

  res.json(user);
});
```

**Example with Zod validation:**

```javascript
import { z } from 'zod';

// ✅ SECURE - comprehensive validation
const createUserSchema = z.object({
  email: z.string().email().max(255),
  age: z.number().int().min(13).max(120),
  role: z.enum(['user', 'admin']).default('user')
});

app.post('/api/users', async (req, res) => {
  // Validate and parse input
  const validationResult = createUserSchema.safeParse(req.body);

  if (!validationResult.success) {
    return res.status(400).json({
      error: 'Invalid input',
      details: validationResult.error.errors
    });
  }

  const { email, age, role } = validationResult.data;

  const user = await db.query(
    'INSERT INTO users (email, age, role) VALUES ($1, $2, $3) RETURNING *',
    [email, age, role]
  );

  res.json(user);
});
```

## Full Security Audit Prompt (Comprehensive)

This comprehensive prompt checks for all major vulnerability categories from the OWASP Top 10. Use this when you need a complete security review of a feature or entire codebase.

**Copy this prompt:**

```
Perform a comprehensive security audit of this code. Check for ALL of the following vulnerability categories:

**A01 - Broken Access Control:**
- Missing authentication on protected routes
- Missing authorization/ownership checks (IDOR)
- Insecure direct object references
- Missing role-based access control
- Path traversal vulnerabilities

**A02 - Cryptographic Failures:**
- Sensitive data transmitted without encryption (HTTP instead of HTTPS)
- Weak encryption algorithms (MD5, SHA1)
- Hardcoded encryption keys
- Missing encryption for sensitive data at rest
- Insecure random number generation

**A03 - Injection:**
- SQL injection (string concatenation in queries)
- NoSQL injection
- Command injection (exec, spawn with user input)
- LDAP injection
- XPath injection
- Template injection

**A04 - Insecure Design:**
- Missing rate limiting on sensitive operations
- No account lockout after failed login attempts
- Unlimited resource allocation
- Missing security logging
- Lack of separation between environments

**A05 - Security Misconfiguration:**
- Default credentials
- Unnecessary features enabled
- Detailed error messages in production
- Missing security headers (CSP, X-Frame-Options, etc.)
- Directory listing enabled
- Exposed stack traces

**A06 - Vulnerable and Outdated Components:**
- List all dependencies and their versions
- Flag known vulnerable packages
- Suggest npm audit or equivalent scan

**A07 - Identification and Authentication Failures:**
- Weak password requirements
- Missing multi-factor authentication
- Predictable session IDs
- Session fixation vulnerabilities
- Credentials exposed in URLs
- Weak JWT implementation

**A08 - Software and Data Integrity Failures:**
- Missing integrity checks on updates
- Insecure deserialization
- Missing code signing
- Untrusted data in CI/CD pipeline

**A09 - Security Logging and Monitoring Failures:**
- Missing logging for security events
- Logs containing sensitive data
- No alerting on suspicious activity
- Insufficient log retention

**A10 - Server-Side Request Forgery (SSRF):**
- User-controlled URLs in fetch/axios requests
- Missing URL validation/whitelisting
- Internal network access from user input

**Additional Cross-Cutting Concerns:**
- XSS (Cross-Site Scripting) in all contexts
- CSRF (Cross-Site Request Forgery) on state-changing operations
- Hardcoded secrets (API keys, passwords, tokens)
- Input validation gaps
- Race conditions in concurrent operations
- Business logic flaws

For EACH vulnerability found:
1. Cite the specific OWASP category and CWE number
2. Explain WHY it's vulnerable and the potential impact
3. Show the EXACT vulnerable code with line references
4. Provide a COMPLETE fix with secure code
5. Rate severity: CRITICAL, HIGH, MEDIUM, LOW

Output format:
- Summary: Total vulnerabilities by severity
- Detailed findings: One section per vulnerability
- Prioritized remediation plan

[PASTE YOUR COMPLETE CODE HERE - INCLUDE ALL RELEVANT FILES]
```

**When to use this vs individual prompts:**

Use the comprehensive audit when you:
- Need a complete security review before launch
- Are reviewing an entire feature (frontend + backend)
- Want to find vulnerabilities across multiple categories
- Need a prioritized list of fixes

Use individual prompts when you:
- Are working on a specific area (database queries, authentication, etc.)
- Want faster, focused feedback
- Are iterating quickly during development
- Need to verify a specific fix

The comprehensive prompt will produce longer output and may hit context limits with large codebases. For projects over 1000 lines, run individual prompts on specific files or features instead.

## How to Use These Prompts

Security prompts work best when integrated into your vibe coding workflow. Here is how to use them with popular AI coding tools.

**In Cursor:**

1. Open Cursor Composer (Cmd+I or Ctrl+I)
2. Paste the security prompt
3. Paste or reference your code files
4. Review the findings and apply fixes
5. Add prompts to `.cursorrules` for automatic checks

```bash
# .cursorrules
# Security Review Rules
- Always check database queries for SQL injection
- Validate all user inputs with Zod or equivalent
- Never use dangerouslySetInnerHTML without sanitization
- Check for hardcoded secrets before committing
```

**In Claude Code:**

1. Start a new chat or task
2. Include the security prompt with your code
3. Claude Code will analyze across multiple files
4. Implement suggested fixes
5. Run the prompt again to verify

```
Claude, review my API routes for authentication bypass vulnerabilities.
Use this prompt: [paste authentication bypass prompt]

Files to check:
- src/routes/api/+server.ts
- src/lib/auth.ts
```

**In ChatGPT:**

1. Start with clear context about your stack
2. Paste the security prompt
3. Include relevant code snippets (watch context limits)
4. Ask follow-up questions for clarification
5. Request code examples for fixes

```
I'm building a Next.js app with Supabase. Review this code for IDOR vulnerabilities.

[paste IDOR prompt]

[paste your API route code]
```

**Best practices:**

- **Run prompts early and often** - Don't wait until the end of development
- **Review one category at a time** - More focused results than the full audit
- **Include context** - Mention your framework, database, auth library
- **Verify fixes** - Run the prompt again after implementing changes
- **Combine with tools** - Use with ESLint security plugins, npm audit, and Scanner
- **Keep prompts updated** - Add new patterns as you discover them

## FAQ

### Can AI catch all security issues?

No, AI code review catches common vulnerability patterns but cannot replace professional security audits or penetration testing. AI tools excel at finding well-documented vulnerabilities like SQL injection, XSS, and hardcoded secrets because these patterns appear frequently in training data.

However, AI struggles with business logic flaws, complex authorization issues, and zero-day vulnerabilities. According to [OWASP guidance on AI-assisted development](https://owasp.org/www-project-top-10-for-large-language-model-applications/), AI should augment but not replace human security review.

For production applications handling sensitive data or payments, combine AI prompts with automated scanning tools and professional security audits.

### How often should I run security prompts?

Run security prompts at three key points in your development workflow. First, run individual prompts during active development when working on specific features like database queries or authentication flows. Second, run the comprehensive audit prompt before committing major features or merging pull requests. Third, run a full security review before deploying to production.

For ongoing projects, review new code weekly and re-audit the entire codebase monthly. Security is not a one-time check but a continuous practice. The OWASP recommendation is to integrate security checks into your CI/CD pipeline so every code change gets reviewed.

### Do I need a professional security audit too?

Yes, if your application handles sensitive data, payments, authentication, or serves over 1000 users. AI security prompts catch common vulnerabilities but professional auditors find business logic flaws, complex attack chains, and configuration issues that AI misses.

According to the [Verizon 2024 Data Breach Investigations Report](https://www.verizon.com/business/resources/reports/dbir/), web application attacks account for 26% of breaches. Professional penetration testing reduces this risk significantly.

Use AI prompts for continuous security hygiene during development, and schedule professional audits annually or before major releases. Many security firms now offer lightweight reviews specifically for vibe coded applications.

### Which vulnerabilities are most common in vibe coded apps?

Based on security research into AI-generated code patterns, the most common vulnerabilities are SQL injection, hardcoded secrets, missing authentication, and XSS. AI tools generate these patterns because they prioritize working code over secure code in training examples.

SQL injection appears when AI concatenates user input into queries. Hardcoded secrets happen when AI includes example API keys from documentation. Missing authentication occurs when AI generates routes without considering access control. XSS vulnerabilities appear in frontend code using innerHTML or dangerouslySetInnerHTML.

The [CWE Top 25 Most Dangerous Software Weaknesses (2024)](https://cwe.mitre.org/top25/archive/2024/2024_cwe_top25.html) lists these as persistent issues across all development, with AI code showing similar patterns.

### Can I add these to my cursor rules?

Yes, you can add security prompts to `.cursorrules` to make Cursor automatically check for vulnerabilities. However, keep rules concise because `.cursorrules` has context limits. Instead of pasting full prompts, create trigger rules that remind you to run security checks.

```bash
# .cursorrules - Security Trigger Rules

## Database Code
When writing database queries:
- Use parameterized queries ($1, $2) never string concatenation
- Check for SQL injection before committing

## Authentication Routes
When creating API routes:
- Add authentication middleware to protected routes
- Validate ownership before returning user data (IDOR check)

## User Input
When accepting user input:
- Validate with Zod schema
- Set max length limits
- Check for XSS in frontend rendering

## Environment Variables
Before committing:
- Scan for hardcoded API keys, passwords, tokens
- Verify .env is in .gitignore
```

For comprehensive reviews, manually paste the full security prompts into Cursor Composer rather than relying on rules alone.

## Related Resources

**Vulnerability Guides:**
- [SQL Injection: Detection and Prevention →](/kb/security/vulnerabilities/sql-injection/)
- [XSS (Cross-Site Scripting): Complete Guide →](/kb/security/vulnerabilities/xss/)
- [Hardcoded Secrets: Find and Remove →](/kb/security/vulnerabilities/hardcoded-secrets/)
- [IDOR: Access Control Vulnerabilities →](/kb/security/vulnerabilities/idor/)
- [Authentication Bypass: Common Patterns →](/kb/security/vulnerabilities/auth-bypass/)

**Security Checklists:**
- [Pre-Deployment Security Checklist →](/kb/security/checklists/pre-deployment/)
- [OWASP Top 10 Checklist for Vibe Coders →](/kb/security/checklists/owasp-top-10/)
- [Framework Security Guide: Next.js + Supabase →](/kb/security/stacks/nextjs-supabase/)

**Tools:**
- [VibeShip Scanner: Automated Security Scanning →](https://scanner.vibeship.co) - Scan your entire codebase for these vulnerabilities automatically
- [AI Tool Security Comparison →](/kb/vibe-coding-tools/) - How Cursor, Claude Code, Bolt compare on security

---

**Meta Description:**
Copy-paste security prompts for AI code review. Find SQL injection, XSS, auth bypass, hardcoded secrets in vibe coded projects. Works with Cursor, Claude Code, ChatGPT.

**Keywords:** security prompts, ai code review, code review prompts, security code review, cursor security, claude code security, sql injection prompt, xss detection, authentication review

**Schema Markup:**

```json
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "Security Prompts: AI Code Review That Catches Vulnerabilities",
  "description": "Copy-paste security prompts that help AI tools like Cursor, Claude Code, or ChatGPT find vulnerabilities in your vibe coded projects including SQL injection, XSS, auth bypass, and more.",
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
  "datePublished": "2025-12-17",
  "dateModified": "2025-12-17"
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Can AI catch all security issues?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, AI code review catches common vulnerability patterns but cannot replace professional security audits or penetration testing. AI tools excel at finding well-documented vulnerabilities like SQL injection, XSS, and hardcoded secrets. However, AI struggles with business logic flaws, complex authorization issues, and zero-day vulnerabilities."
      }
    },
    {
      "@type": "Question",
      "name": "How often should I run security prompts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Run individual prompts during active development, run comprehensive audit before committing major features, and run full security review before production deployment. For ongoing projects, review new code weekly and re-audit monthly."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need a professional security audit too?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, if your application handles sensitive data, payments, authentication, or serves over 1000 users. AI prompts catch common vulnerabilities but professional auditors find business logic flaws and complex attack chains that AI misses."
      }
    },
    {
      "@type": "Question",
      "name": "Which vulnerabilities are most common in vibe coded apps?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The most common vulnerabilities in AI-generated code are SQL injection, hardcoded secrets, missing authentication, and XSS. AI tools generate these patterns because they prioritize working code over secure code."
      }
    },
    {
      "@type": "Question",
      "name": "Can I add these to my cursor rules?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, you can add security prompts to .cursorrules, but keep rules concise due to context limits. Create trigger rules that remind you to run security checks rather than pasting full prompts."
      }
    }
  ]
}
```
