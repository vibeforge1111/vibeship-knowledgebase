# Stack Security Guide Template

Use this template for all pages at `/kb/security/stacks/{stack}/`

## JSON Content Structure

```json
{
  "title": "{Framework} + {Database} Security Guide",
  "slug": "{framework}-{database}",
  "description": "Complete security guide for {Stack}. Covers top vulnerabilities, checklists, and AI-specific issues.",
  
  "quickAnswer": "{30-50 words. What makes this stack unique security-wise. Top concern. Who this guide is for.}",
  
  "stack": {
    "framework": "{framework}",
    "database": "{database}",
    "common_with": ["Cursor", "Bolt", "v0"]
  },
  
  "stats": {
    "totalScanned": 3500,
    "vulnerabilityRate": 68.4,
    "avgIssuesPerRepo": 2.8,
    "topVulnerability": "missing-auth"
  },
  
  "topVulnerabilities": [
    {
      "rank": 1,
      "slug": "missing-auth",
      "name": "Missing Authentication",
      "percentage": 72.3,
      "stackSpecificNote": "API routes in /app/api/ are unprotected by default"
    }
  ],
  
  "checklist": [
    {
      "category": "Authentication",
      "items": [
        {
          "id": "auth-1",
          "label": "All API routes require authentication",
          "priority": "critical",
          "description": "Add middleware to /app/api/ routes"
        }
      ]
    }
  ],
  
  "content": {
    "overview": "{100-150 words. Why this stack is popular. Security trade-offs. What to focus on.}",
    
    "frameworkSecurity": "{150-200 words. Framework-specific security features and gotchas.}",
    
    "databaseSecurity": "{150-200 words. Database-specific security features and gotchas.}",
    
    "aiMistakes": "{150-200 words. Common mistakes AI tools make with this stack.}",
    
    "environmentSetup": "{Code block showing required environment variables and security config.}"
  },
  
  "securityConfig": {
    "envVars": [
      {
        "name": "DATABASE_URL",
        "description": "Connection string - never commit to git",
        "example": "postgresql://user:pass@host:5432/db"
      }
    ],
    "configFiles": [
      {
        "file": "next.config.js",
        "code": "{Security-related config}",
        "explanation": "Why this matters"
      }
    ]
  },
  
  "recommendedPackages": [
    {
      "name": "next-auth",
      "purpose": "Authentication",
      "url": "https://next-auth.js.org"
    }
  ],
  
  "faqs": [
    {
      "question": "Is {Stack} secure out of the box?",
      "answer": "{Honest answer with specifics}"
    }
  ],
  
  "relatedStacks": ["similar-stack-1", "similar-stack-2"],
  "relatedVulnerabilities": ["missing-auth", "sql-injection"],
  
  "publishedAt": "2024-12-01T00:00:00Z",
  "updatedAt": "2024-12-15T00:00:00Z"
}
```

## Page Layout Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ Breadcrumb: KB > Security > Stacks > {Stack}                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ # {Framework} + {Database} Security Guide                       │
│                                                                 │
│ {quickAnswer}                                                   │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ ## Security Checklist                                           │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ [Progress Bar: 0/15 complete]                               │ │
│ │                                                             │ │
│ │ ▼ Authentication (Critical)                                 │ │
│ │   [ ] All API routes require authentication                 │ │
│ │   [ ] Session tokens are HTTP-only                          │ │
│ │   [ ] Password hashing uses bcrypt                          │ │
│ │                                                             │ │
│ │ ▼ Authorization                                             │ │
│ │   [ ] RLS enabled on all tables                            │ │
│ │   [ ] Users can only access their own data                  │ │
│ │                                                             │ │
│ │ ▼ Data Protection                                           │ │
│ │   [ ] No hardcoded secrets                                  │ │
│ │   [ ] Environment variables configured                      │ │
│ │                                                             │ │
│ │ [Download Checklist PDF]                                    │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ ## Top Vulnerabilities in {Stack} Projects                      │
│                                                                 │
│ Based on VibeShip Scanner analysis of {N} {Stack} projects:     │
│                                                                 │
│ ### 1. Missing Authentication (72%)                             │
│ {Stack-specific explanation}                                    │
│ ```javascript                                                   │
│ // Quick fix code                                               │
│ ```                                                             │
│ [Full guide →](/kb/security/vulnerabilities/missing-auth/)      │
│                                                                 │
│ {Repeat for top 5}                                              │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ ## {Framework} Security                                         │
│ {frameworkSecurity content}                                     │
│                                                                 │
│ ### Key Files to Secure                                         │
│ - `/app/api/` routes                                            │
│ - `middleware.ts`                                               │
│ - `next.config.js`                                              │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ ## {Database} Security                                          │
│ {databaseSecurity content}                                      │
│                                                                 │
│ ### Row Level Security                                          │
│ {RLS explanation and examples}                                  │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ ## Common AI Mistakes with {Stack}                              │
│ {aiMistakes content}                                            │
│                                                                 │
│ ### Mistake 1: {Pattern}                                        │
│ {Code example of what AI generates vs what it should be}        │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ ## Environment Setup                                            │
│ ```bash                                                         │
│ # Required environment variables                                │
│ DATABASE_URL=postgresql://...                                   │
│ NEXTAUTH_SECRET=...                                             │
│ ```                                                             │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ ## Recommended Security Packages                                │
│ | Package | Purpose |                                           │
│ |---------|---------|                                           │
│ | next-auth | Authentication |                                  │
│ | zod | Input validation |                                      │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ ## FAQ                                                          │
│ {FAQ accordion}                                                 │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ ## Scan Your {Stack} Project                                    │
│ [Free Security Scan →]                                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Example: Next.js + Supabase

### Quick Answer
> Next.js + Supabase is powerful but has security gaps by default. API routes are unprotected, and Supabase Row Level Security (RLS) is disabled on new tables. This guide covers the 5 critical security settings you must configure before launching.

### Top 5 Vulnerabilities

**1. Missing API Route Authentication (72%)**
Next.js API routes in `/app/api/` have no authentication by default.
```typescript
// ❌ Default - anyone can access
export async function GET(req: Request) {
  return Response.json(await getUsers())
}

// ✅ Secure
export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  return Response.json(await getUsers())
}
```

**2. Supabase RLS Disabled (68%)**
Tables have RLS off by default, exposing all data to anyone with the anon key.
```sql
-- ❌ Default - no RLS
-- Anyone can read all rows

-- ✅ Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only see own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = user_id);
```

**3. Service Role Key in Client (45%)**
AI tools sometimes use the service role key instead of anon key in client code.
```typescript
// ❌ Dangerous - service role bypasses RLS
const supabase = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY)

// ✅ Safe - anon key respects RLS
const supabase = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
```

### Security Checklist

#### Authentication (Critical)
- [ ] `next-auth` or Supabase Auth configured
- [ ] All `/app/api/` routes check session
- [ ] Session tokens are HTTP-only cookies
- [ ] CSRF protection enabled

#### Database (Critical)
- [ ] RLS enabled on ALL tables
- [ ] Policies created for SELECT, INSERT, UPDATE, DELETE
- [ ] Service role key only used server-side
- [ ] Anon key used in client

#### Environment
- [ ] `.env.local` in `.gitignore`
- [ ] No secrets in `NEXT_PUBLIC_*` variables
- [ ] Production environment variables set in Vercel

### Recommended Packages

| Package | Purpose | Install |
|---------|---------|---------|
| next-auth | Authentication | `npm i next-auth` |
| @supabase/auth-helpers-nextjs | Supabase auth | `npm i @supabase/auth-helpers-nextjs` |
| zod | Input validation | `npm i zod` |
| @t3-oss/env-nextjs | Type-safe env vars | `npm i @t3-oss/env-nextjs` |
