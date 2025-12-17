# Cline Rules: The Complete .clinerules Guide

<div class="quick-answer">
<strong>Cline rules are custom instructions that guide your AI coding assistant's behavior using .clinerules files or folders.</strong> They let you define coding standards, security patterns, and documentation requirements that Cline follows automatically. Proper rules prevent vulnerabilities in vibe coded projects.
</div>

## What Are Cline Rules?

Cline rules are configuration files that tell your AI coding assistant how to write code, what patterns to follow, and which security practices to enforce. Think of them as a style guide that your AI actually reads and follows.

Cline is one of the fastest-growing AI coding tools because it's free, open-source, and implements human-in-the-loop approval—you review every change before it runs. This makes it ideal for vibe coding projects where you want speed without sacrificing security. Rules help standardize what Cline generates, reducing the review burden.

Unlike paid tools that lock you into specific workflows, Cline's rules system gives you complete control over code generation patterns. You define the standards once, and Cline applies them consistently across your entire project.

## How to Set Up Cline Rules

Cline supports two approaches for organizing rules: a folder structure (recommended) or a single file. The folder approach lets you organize rules by category and control loading order.

**Folder Approach (Recommended):**
```
your-project/
├── .clinerules/
│   ├── 01-coding-standards.md
│   ├── 02-documentation.md
│   └── 03-security.md
└── src/
```

**Single File Approach:**
```
your-project/
├── .clinerules
└── src/
```

To create rules using the Cline interface:

1. **Via UI:** Click the `+` button in the Rules tab
2. **Via command:** Type `/newrule` in the chat
3. **Via toggle:** Use the popover UI (Cline v3.13+) to activate/deactivate rules

Rules are written in Markdown and loaded automatically when Cline starts. The folder approach is recommended for most projects because it allows better organization and explicit ordering.

## File Structure and Ordering

When using the `.clinerules/` folder approach, Cline loads files in alphabetical order. Use numeric prefixes to control the sequence—earlier rules take precedence when conflicts arise.

```
.clinerules/
├── 01-coding.md         # Core coding standards (loaded first)
├── 02-testing.md        # Testing requirements
├── 03-documentation.md  # Documentation standards
├── 04-security.md       # Security patterns (critical for vibe coding)
└── 05-stack-specific.md # Framework rules
```

**Why ordering matters:** If `01-coding.md` says "always use TypeScript" and `05-stack-specific.md` says "use JavaScript for scripts," Cline prioritizes the earlier rule. This ensures critical standards (security, type safety) override convenience preferences.

**Recommended organization:**
- **01-** = Non-negotiable standards (types, security)
- **02-** = Testing and quality requirements
- **03-** = Documentation and naming
- **04-** = Stack-specific patterns
- **05-** = Optional optimizations

Each file should focus on one category. Avoid mixing security rules with formatting preferences—separation makes rules easier to maintain and audit.

## Global Rules

Cline supports global rules that apply to all projects, stored in a system-wide location. Use these for universal coding standards that shouldn't change between projects.

**Global rules location by operating system:**

| OS | Path |
|---|---|
| Windows | `C:\Users\[YourName]\Documents\Cline\Rules` |
| macOS | `~/Documents/Cline/Rules` |
| Linux/WSL | `~/Documents/Cline/Rules` |

**When to use global vs project rules:**
- **Global:** Language-specific standards (TypeScript best practices), security baselines, accessibility requirements
- **Project:** Stack-specific patterns (Next.js conventions), API naming, database schema rules

Global rules load before project-specific rules. If a project rule conflicts with a global rule, the project rule wins. This lets you enforce organization-wide security standards while allowing per-project customization.

To set up global rules, create the `Rules` directory at the path above and add markdown files with the same numeric prefix pattern.

## Rules Bank Pattern

The rules bank pattern separates active rules (applied to every Cline request) from available rules (inactive but ready to toggle on). This is useful for context-specific rules that shouldn't always apply.

```
your-project/
├── .clinerules/              # Active rules (Cline loads these)
│   ├── 01-coding.md
│   └── 02-security.md
└── clinerules-bank/          # Available but inactive
    ├── migrate-to-prisma.md  # Database migration rules
    ├── add-analytics.md      # Analytics implementation
    └── performance-audit.md  # Performance optimization
```

**How to use the rules bank:**

1. Create a `clinerules-bank/` folder at your project root
2. Store optional rules there with descriptive names
3. When needed, copy rules from bank to `.clinerules/` with appropriate numeric prefixes
4. Remove from `.clinerules/` when task is complete

**Example workflow:**
```bash
# Starting database migration
cp clinerules-bank/migrate-to-prisma.md .clinerules/06-migration.md

# After migration completes
rm .clinerules/06-migration.md
```

This keeps your active ruleset focused on current work while maintaining a library of reusable instructions for common tasks.

## Essential Cline Rules Sections

Well-structured rules contain specific sections that cover different aspects of code generation. Here are the three most important categories with examples.

### Coding Standards Rules

```markdown
# Coding Standards

## TypeScript
- Use strict mode (`"strict": true`)
- Define return types for all functions
- Avoid `any` type—use `unknown` and type guards instead
- Prefer `interface` over `type` for object shapes

## Naming Conventions
- Components: PascalCase (`UserProfile.tsx`)
- Functions/variables: camelCase (`getUserData`)
- Constants: UPPER_SNAKE_CASE (`API_TIMEOUT`)
- Files: kebab-case for utilities (`date-formatter.ts`)

## Error Handling
- Always catch async errors with try-catch
- Return error objects, don't throw in async functions
- Log errors with context (user ID, request ID)
```

### Documentation Rules

```markdown
# Documentation Requirements

## Function Documentation
Every exported function needs JSDoc with:
- One-line summary
- @param descriptions with types
- @returns description
- @example with realistic usage

## Component Documentation
React/Svelte components need:
- Props table in JSDoc
- Usage example in comments
- Accessibility notes for interactive components

## README Updates
When adding features, update:
- Installation steps if dependencies change
- Usage examples for new APIs
- Environment variables section
```

### Testing Rules

```markdown
# Testing Standards

## Test Coverage
- All exported functions must have unit tests
- API routes require integration tests
- Critical user flows need E2E tests

## Test Structure
- Use describe/it blocks
- One assertion per test when possible
- Test names describe behavior: "returns 404 when user not found"

## Test Data
- Use factories/fixtures, not hardcoded data
- Reset database state between tests
- Mock external API calls
```

These three sections form the foundation of effective vibe coding rules—they ensure generated code is type-safe, documented, and tested.

## Security Rules for Cline

Security rules are critical for AI-generated code because vibe coding tools often prioritize "working code" over "secure code." Here's a comprehensive security ruleset you can copy-paste into `.clinerules/04-security.md`:

```markdown
# Security Standards for AI-Generated Code

## Input Validation (Prevent SQL Injection, XSS, Command Injection)

### ❌ NEVER DO THIS:
```javascript
// SQL Injection vulnerability
const user = await db.query(`SELECT * FROM users WHERE id = ${userId}`)

// XSS vulnerability
element.innerHTML = userInput

// Command Injection vulnerability
exec(`convert ${filename} output.jpg`)
```

### ✅ ALWAYS DO THIS:
```javascript
// Parameterized query (SQL injection protection)
const user = await db.query('SELECT * FROM users WHERE id = $1', [userId])

// Escape user input (XSS protection)
element.textContent = userInput

// Input validation and sanitization (command injection protection)
const safeFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '')
if (!/^[a-zA-Z0-9.-]+$/.test(safeFilename)) throw new Error('Invalid filename')
exec(`convert ${safeFilename} output.jpg`)
```

## Authentication & Authorization

### Session Management
- Use `httpOnly` and `secure` flags on all cookies
- Implement session timeout (30 minutes for sensitive apps)
- Regenerate session ID after login

### Authorization Checks
```javascript
// ❌ VULNERABLE: Missing authorization check
app.get('/api/user/:id/data', async (req, res) => {
  const data = await getUserData(req.params.id)
  return res.json(data)
})

// ✅ SECURE: Verify user owns the resource
app.get('/api/user/:id/data', async (req, res) => {
  if (req.session.userId !== req.params.id) {
    return res.status(403).json({ error: 'Forbidden' })
  }
  const data = await getUserData(req.params.id)
  return res.json(data)
})
```

## Secret Management

### Never Hardcode Secrets
```javascript
// ❌ VULNERABLE
const apiKey = 'sk-1234567890abcdef'

// ✅ SECURE
const apiKey = process.env.API_KEY
if (!apiKey) throw new Error('API_KEY environment variable required')
```

### Environment Variables
- Store secrets in `.env` (add to `.gitignore`)
- Validate all required env vars at startup
- Use different secrets for dev/staging/production

## Database Security

### Row-Level Security (RLS)
For Supabase/PostgreSQL projects:
- Enable RLS on all tables: `ALTER TABLE users ENABLE ROW LEVEL SECURITY;`
- Create policies for select/insert/update/delete
- Never bypass RLS in application code

### Query Safety
- Always use parameterized queries (prevent SQL injection)
- Limit query results (`LIMIT 100` by default)
- Sanitize user input before LIKE clauses: `escapeForLike(searchTerm)`

## API Security

### Rate Limiting
```javascript
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: 'Too many requests, try again later'
})

app.use('/api/', limiter)
```

### CORS Configuration
```javascript
// ❌ VULNERABLE: Allow all origins
app.use(cors({ origin: '*' }))

// ✅ SECURE: Whitelist specific origins
app.use(cors({
  origin: ['https://yourdomain.com', 'https://app.yourdomain.com'],
  credentials: true
}))
```

## File Upload Security

### Validation Rules
```javascript
// ✅ SECURE file upload handling
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE = 5 * 1024 * 1024 // 5MB

function validateUpload(file) {
  if (!ALLOWED_TYPES.includes(file.mimetype)) {
    throw new Error('Invalid file type')
  }
  if (file.size > MAX_SIZE) {
    throw new Error('File too large')
  }
  // Store with random name, not original filename
  return crypto.randomUUID() + path.extname(file.originalname)
}
```

## Logging & Monitoring

### Safe Logging
```javascript
// ❌ VULNERABLE: Logs sensitive data
console.log('User login:', { email, password, sessionToken })

// ✅ SECURE: Redact sensitive fields
console.log('User login:', { email, timestamp: new Date() })
```

### Security Event Logging
Log these events for security monitoring:
- Failed login attempts (potential brute force)
- Authorization failures (potential IDOR/BFLA)
- Unusual query patterns (potential SQL injection)
- Rate limit violations

## Human-in-the-Loop Security Review

When Cline generates code involving:
- Database queries (SQL injection risk)
- User input rendering (XSS risk)
- File operations (path traversal risk)
- Authentication/authorization (access control risk)
- External API calls (SSRF risk)

**ALWAYS:**
1. Review the generated code before approving
2. Verify input validation is present
3. Check for parameterized queries
4. Test with malicious input
5. Run `npm audit` or `pip-audit` for dependency vulnerabilities
```

This security ruleset covers the most common vulnerabilities in vibe coded projects. Cline will apply these patterns automatically, but you should still review security-critical code changes before approving them.

## Cline Rules Templates by Stack

Different tech stacks need different security patterns. Here are copy-paste templates for popular vibe coding stacks.

### Next.js + TypeScript + Supabase

```markdown
# Next.js Stack Rules

## API Routes
- Use Next.js middleware for auth checks
- Return typed responses: `NextResponse<{ data: User }>`
- Enable CORS only for specific origins
- Validate request bodies with Zod schemas

## Supabase Security
- Enable Row-Level Security (RLS) on all tables
- Use Supabase client with user JWT: `supabase.auth.getUser()`
- Never use service role key in client-side code
- Validate user owns resource before queries

## Server Actions
```typescript
'use server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100)
})

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Unauthorized')

  const input = schema.parse({
    email: formData.get('email'),
    name: formData.get('name')
  })

  return await supabase
    .from('profiles')
    .update(input)
    .eq('id', user.id)
}
```

## Environment Variables
Required: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
```

### React + TypeScript + Express

```markdown
# React + Express Stack Rules

## Express API Security
```javascript
import express from 'express'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

const app = express()

// Security headers
app.use(helmet())

// Rate limiting
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}))

// Input validation with express-validator
import { body, validationResult } from 'express-validator'

app.post('/api/user',
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    // Process request
  }
)
```

## React Security
- Avoid dangerouslySetInnerHTML
- Sanitize user input with DOMPurify if HTML required
- Use React Router's Navigate for redirects (not window.location)
- Store tokens in httpOnly cookies, not localStorage
```

### Python + FastAPI

```markdown
# FastAPI Security Rules

## Input Validation with Pydantic
```python
from pydantic import BaseModel, EmailStr, validator
from fastapi import HTTPException

class UserCreate(BaseModel):
    email: EmailStr
    password: str

    @validator('password')
    def password_strength(cls, v):
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters')
        return v

@app.post("/users")
async def create_user(user: UserCreate):
    # Pydantic validates automatically
    return {"email": user.email}
```

## Database Security
```python
# ❌ VULNERABLE: SQL injection
cursor.execute(f"SELECT * FROM users WHERE email = '{email}'")

# ✅ SECURE: Parameterized query
cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
```

## Authentication
- Use `fastapi.security.HTTPBearer` for JWT
- Validate JWT signature and expiration
- Use `bcrypt` for password hashing (never plain text)
```

These templates give Cline stack-specific security patterns, reducing the chance of framework-specific vulnerabilities in vibe coded projects.

## AGENTS.md Fallback

Some Cline users prefer `AGENTS.md` in the project root instead of `.clinerules`. Cline supports both, but they serve slightly different purposes.

**AGENTS.md** is a convention from the broader AI coding community. It's a single markdown file describing agent behaviors, often including workflow instructions beyond just code standards.

**When to use AGENTS.md:**
- You're migrating from another AI tool that used this pattern
- You prefer a single file over folder structure
- You want to share agent instructions across multiple AI tools

**When to use .clinerules:**
- You want organized, categorized rules
- You need explicit ordering via numeric prefixes
- You're working in a team and need different members to own different rule files

Cline will read both if present. If you have both `.clinerules/` and `AGENTS.md`, Cline loads `.clinerules/` first, then `AGENTS.md`. Rules from `AGENTS.md` can complement or override `.clinerules`, depending on specificity.

## Best Practices

| DO | DON'T |
|---|---|
| Use numeric prefixes (01-, 02-) for explicit ordering | Mix security rules with formatting preferences in one file |
| Write specific rules: "Use Zod for API validation" | Write vague rules: "Write good code" |
| Include before/after code examples | Assume Cline knows framework-specific patterns |
| Keep security rules in a dedicated file | Put critical rules at the end (they might be truncated) |
| Review generated code for security issues | Blindly approve Cline changes |
| Update rules when patterns change | Set rules once and forget them |
| Use global rules for universal standards | Duplicate the same rule in every project |
| Leverage rules bank for task-specific instructions | Keep all possible rules active at once |

**Common mistakes:**

1. **Too generic:** "Follow best practices" doesn't tell Cline anything actionable
2. **Too long:** Rules over 200 words per section get truncated in context window
3. **Conflicting rules:** Later files override earlier ones—keep critical rules in `01-`
4. **Missing examples:** Cline interprets code examples better than prose descriptions

**Leveraging human-in-the-loop:**

Cline's approval workflow is your safety net. Even with perfect rules, always review changes that:
- Touch authentication or authorization logic
- Modify database schemas or queries
- Handle user input or file uploads
- Integrate third-party APIs
- Change security headers or CORS config

Your rules guide Cline toward secure patterns, but your review catches edge cases rules can't anticipate.

## FAQ

**Does Cline work with other AI models besides Claude?**
Yes. Cline supports multiple AI models including GPT-4, Claude (Anthropic), and local models via Ollama. Rules apply regardless of which model you're using—they're part of the system prompt Cline sends.

**Can I share .clinerules files across projects?**
Absolutely. You can create a git repository of reusable rules and clone it as a submodule, or copy `.clinerules/` folders between similar projects. Global rules (in `Documents/Cline/Rules`) automatically apply to all projects.

**How do I debug rules that aren't working?**
Check the Cline output panel—it shows which rules were loaded. If a rule isn't being followed, make sure it's specific enough ("Use parameterized queries" vs "Be secure") and includes code examples. Rules at the end of large files may get truncated.

**What's the maximum number of rules I should have?**
There's no hard limit, but Cline's context window is finite. Aim for 3-5 rule files with 100-200 words each. If rules exceed ~1000 words total, consider moving generic standards to global rules and keeping only project-specific rules in `.clinerules/`.

**Can Cline rules prevent all security vulnerabilities?**
No. Rules help Cline generate more secure code by default, but AI tools lack the business context to catch logic flaws, authorization bugs, or timing attacks. Always review security-critical code manually and run security scanners like [VibeShip Scanner](https://scanner.vibeship.co) on vibe coded projects.

## Related Resources

**Security Content:**
- [SQL Injection in AI-Generated Code](/kb/security/vulnerabilities/sql-injection/) - Detect and fix SQL injection vulnerabilities
- [Hardcoded Secrets Detection](/kb/security/vulnerabilities/hardcoded-secrets/) - Prevent API keys in code
- [XSS in Vibe Coded Apps](/kb/security/vulnerabilities/xss/) - Stop cross-site scripting attacks
- [IDOR Vulnerabilities](/kb/security/vulnerabilities/idor/) - Fix insecure direct object references
- [Secure Vibe Coding Guide](/kb/vibe-coding/guides/secure-vibe-coding/) - Comprehensive security guide for AI tools

**AI Tool Security:**
- [Cursor Security Patterns](/kb/vibe-coding-tools/cursor/) - Security for Cursor AI
- [Claude Code Security](/kb/vibe-coding-tools/claude-code/) - Claude-specific patterns
- [AI Coding Tool Comparison](/research/ai-tool-comparison/) - Which tools generate secure code

**Prompting Guides:**
- [Cursor Rules (.cursorrules)](/kb/prompts/cursor-rules/) - Similar concept for Cursor
- [AI Fix Prompts](/kb/security/fixes/) - Security fix prompts by vulnerability
- [MCP Server Security](/kb/vibe-coding-tools/mcp-servers/) - Secure MCP integrations
