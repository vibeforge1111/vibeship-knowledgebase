# Content Brief: Lovable AI Tool Security

## Status

```yaml
status: READY
created_at: 2025-12-17T21:30:00Z
created_by: Research Agent
claimed_by: null
claimed_at: null
completed_at: null
```

---

## Article Metadata

```yaml
type: tool
slug: lovable
url: /kb/vibe-coding-tools/lovable/
title: "Lovable Security: CVE-2025-48757, RLS Failures, and VibeScamming Risks"
meta_description: "Lovable's CVE-2025-48757 exposed 170+ apps due to missing RLS policies. Learn why Lovable scored 1.8/10 on security benchmarks and how to protect your vibe coded apps."
severity: Critical
word_count: 1800-2200
```

---

## Executive Summary

Lovable is a popular AI tool that lets users build full-stack apps by chatting with AI. However, security researchers discovered CVE-2025-48757 - a critical vulnerability affecting 170+ apps due to missing Row Level Security (RLS) policies. Additionally, Lovable scored 1.8/10 on "VibeScamming" benchmarks, meaning it's highly susceptible to generating phishing pages. This article covers Lovable's security vulnerabilities, what went wrong, and how vibe coders can protect their Lovable-built apps.

---

## Core Data

### Tool Overview

| Attribute | Value |
|-----------|-------|
| Company | Lovable (formerly GPT Engineer) |
| Valuation | $1.8B (as of February 2025) |
| Launch | 2024 |
| Tech Stack | React, TypeScript, Tailwind CSS, Vite, Shadcn UI |
| Backend | Supabase (database, auth, storage) |
| Deployment | One-click to Lovable subdomains |

### Critical Security Events

| Event | Date | Impact |
|-------|------|--------|
| CVE-2025-48757 Discovered | March 20, 2025 | RLS bypass vulnerability |
| Public Exploit Published | April 14, 2025 | Palantir engineer demonstrated attacks |
| Lovable 2.0 Released | April 24, 2025 | Added security scanner |
| CVE Published | May 29, 2025 | 45-day disclosure window expired |
| VibeScamming Report | April 2025 | Scored 1.8/10 (worst among tested) |

### CVE-2025-48757 Details

| Metric | Value |
|--------|-------|
| CVE ID | CVE-2025-48757 |
| CVSS Score | 8.26 (High) |
| Type | Improper Access Control (Missing RLS) |
| Attack Vector | Remote, Unauthenticated |
| Impact | Read/Write arbitrary database data |
| Affected Apps | 170+ (10.3% of analyzed projects) |
| Vulnerable Endpoints | 303 across analyzed apps |

### Exposed Data Types (from research)
- User databases (emails, phone numbers, addresses)
- Financial transactions and payment records
- API keys (Google Maps, Gemini, eBay)
- Stripe integration credentials
- Subscription and billing details

---

## The CVE-2025-48757 Vulnerability

### Root Cause
Lovable-generated apps use Supabase as the backend. By default, Lovable either:
1. Did not enable Row Level Security (RLS) on tables
2. Generated incorrect RLS policies that didn't properly restrict access

### Attack Mechanism
```
1. Attacker finds Lovable-built app
2. Inspects frontend code for Supabase anon_key (always public)
3. Uses anon_key to query Supabase directly
4. With missing/weak RLS, attacker reads/writes ANY data
```

### Vulnerable Endpoint Examples (from research)
```
/functions/v1/get-google-maps-token  → Exposed API credentials
/rest/v1/rpc/get_gemini_api_key      → Exposed AI API keys
/rest/v1/users                       → Full user database
/rest/v1/transactions                → Financial records
```

### Research Findings
- **1,645 projects** scanned from "Lovable Launched" showcase
- **303 vulnerable endpoints** found across 170 projects
- **10.3%** of analyzed applications had inadequate security
- Data exposed: Personal debt amounts, home addresses, API keys

### Timeline of Disclosure
1. **March 20, 2025:** Security researcher Matt Palmer reported to Lovable
2. **April 14, 2025:** Palantir engineer independently found and tweeted exploit
3. **April 24, 2025:** Lovable released 2.0 with "security scanner"
4. **May 29, 2025:** CVE published after 45-day window with no comprehensive fix

---

## VibeScamming Vulnerability

### What is VibeScamming?
Guardio Labs tested AI tools' resistance to generating phishing content. They developed the "VibeScamming Benchmark" to measure exploitability.

### Benchmark Results

| AI Tool | Score | Assessment |
|---------|-------|------------|
| ChatGPT | 8.0/10 | Most cautious, high pushback |
| Claude | 4.3/10 | Initial resistance, persuadable with "security research" framing |
| **Lovable** | **1.8/10** | Highest exploitability, minimal guardrails |

### What Attackers Can Do with Lovable
1. **Generate phishing pages:** Pixel-perfect login pages mimicking Microsoft, Google, etc.
2. **Auto-deploy:** Pages hosted on *.lovable.app subdomains (trusted by victims)
3. **Credential harvesting:** Built-in forms that capture and exfiltrate data
4. **Admin dashboards:** Monitor stolen credentials in real-time
5. **Exfiltration:** Send data to Firebase, Telegram, or external servers

### Why Lovable is Vulnerable
- Designed for rapid deployment without friction
- Minimal content moderation on generated apps
- Task-focused AI without security hardening
- One-click deployment enables instant phishing campaigns

---

## Lovable's Security Features (Current State)

### Built-in Security Tools

**API Key Detection:**
- Warns when API keys are pasted into chat
- Guides users to Secrets storage
- Recommends Edge Functions for server-side calls

**Security Scanner:**
- AI-powered scanning before publish
- Categorizes: Errors (critical), Warnings (important), Info (best practices)
- Checks for XSS, input sanitization, authentication flaws, RLS policies

**RLS Review Prompt:**
- Recommends reviewing RLS policies before publishing
- Users can ask "review my app's security"

### Critical Limitations

> "Seeing no warnings or errors from the security scanner does not guarantee that there are no security issues in your app."
> - Lovable Documentation

**Scanner Weaknesses:**
- Checks if RLS exists, not if it's correct
- Doesn't validate policy logic against app requirements
- Cannot catch all business logic flaws
- Relies on user to understand and act on warnings

---

## Security Patterns in Lovable-Generated Code

### Pattern 1: Missing RLS Policies
```sql
-- VULNERABLE: Table without RLS
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT,
  created_at TIMESTAMPTZ
);
-- RLS not enabled = anyone can read/write
```

```sql
-- SECURE: Enable RLS with proper policy
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only access own data"
ON users
FOR ALL
USING (auth.uid() = id);
```

### Pattern 2: Overly Permissive RLS
```sql
-- VULNERABLE: Policy that allows too much
CREATE POLICY "Allow all authenticated"
ON sensitive_data
FOR SELECT
USING (auth.role() = 'authenticated');
-- Any logged-in user sees ALL data
```

### Pattern 3: Exposed Supabase Keys
```javascript
// Lovable exposes these in frontend (by design)
const supabase = createClient(
  'https://xxx.supabase.co',
  'eyJhbG...' // anon key - ALWAYS public
)
// Security depends entirely on RLS policies
```

### Pattern 4: Missing Server-Side Validation
```javascript
// VULNERABLE: Client-side only validation
const handleSubmit = (data) => {
  if (data.amount > 0) {  // Bypassable
    await supabase.from('transactions').insert(data)
  }
}
```

---

## SEO Strategy

### Target Keywords

| Keyword | Search Intent | Priority |
|---------|---------------|----------|
| lovable security | informational | Primary |
| lovable.dev vulnerabilities | informational | Primary |
| CVE-2025-48757 | informational | Secondary |
| lovable RLS | informational | Secondary |
| is lovable safe | informational | Secondary |
| lovable vs bolt security | comparison | Tertiary |

### People Also Ask (FAQs)

1. Is Lovable AI safe to use?
2. What is CVE-2025-48757?
3. How do I fix RLS issues in Lovable apps?
4. Can Lovable be used for phishing?
5. How does Lovable compare to other AI tools for security?

### Competitive Gap

**Current coverage:**
- Superblocks blog: Technical CVE writeup, security researcher perspective
- Hacker News/Semafor: News coverage, not actionable guidance
- Lovable docs: Defensive, minimal acknowledgment
- GBHackers: Technical but not developer-focused

**Our unique angle:**
- Vibe coder audience: Plain English, actionable fixes
- Comparison context: How Lovable compares to Bolt, Cursor, etc.
- Complete RLS checklist for Lovable apps
- AI fix prompt tailored to Lovable/Supabase
- Honest assessment with practical mitigations

---

## Content Outline

### Quick Answer (50 words max)
Lovable is a popular AI app builder, but CVE-2025-48757 exposed 170+ apps due to missing database security. It also scored worst (1.8/10) on phishing resistance tests. Before publishing any Lovable app, enable Row Level Security on ALL Supabase tables and verify policies restrict access properly.

### Section 1: What is Lovable? (100-150 words)
- AI tool for building full-stack apps via chat
- $1.8B valuation, popular among vibe coders
- Stack: React, TypeScript, Tailwind, Supabase
- One-click deployment to lovable.app subdomains
- Rapid prototyping focus - "idea to app in minutes"

### Section 2: The CVE-2025-48757 Disaster (200-250 words)
- What happened: Missing RLS exposed user data
- Scale: 170+ apps, 303 vulnerable endpoints
- Exposed data: Emails, addresses, API keys, financial records
- Timeline: March discovery → May CVE publication
- Lovable's response: Security scanner (limited effectiveness)
- Quote: Scanner checks if RLS exists, not if it's correct

### Section 3: VibeScamming - The Phishing Risk (150-200 words)
- Guardio Labs benchmark results
- Lovable scored 1.8/10 (worst tested)
- What attackers can build: Pixel-perfect phishing pages
- Auto-deployment to trusted subdomains
- Credential harvesting with admin dashboards
- Why this matters for legitimate users

### Section 4: Common Security Issues (200-250 words)

**Missing RLS:**
- Default tables have no security
- Anyone with anon_key can query

**Weak RLS Policies:**
- "authenticated" doesn't mean "authorized"
- Need user-specific filters

**Exposed API Keys:**
- Supabase anon_key is always public
- Real API keys need server-side protection

**Client-Side Validation Only:**
- Bypassed by direct API calls

### Section 5: How to Secure Your Lovable App (300-400 words)

**Step 1: Audit Every Table**
```sql
-- List tables without RLS
SELECT schemaname, tablename
FROM pg_tables
WHERE schemaname = 'public';

-- Check RLS status
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public';
```

**Step 2: Enable RLS on ALL Tables**
```sql
ALTER TABLE your_table ENABLE ROW LEVEL SECURITY;
```

**Step 3: Create Proper Policies**
```sql
-- Users can only see their own data
CREATE POLICY "user_isolation" ON your_table
FOR ALL USING (auth.uid() = user_id);

-- Public read, authenticated write
CREATE POLICY "public_read" ON posts
FOR SELECT USING (true);

CREATE POLICY "auth_write" ON posts
FOR INSERT WITH CHECK (auth.uid() = author_id);
```

**Step 4: Protect API Keys**
- Never hardcode real API keys in frontend
- Use Lovable Secrets + Edge Functions
- Move sensitive operations server-side

**Step 5: Request Security Review**
- Ask Lovable: "review my app's security"
- But don't rely on it alone - manual review required

**AI Fix Prompt:**
```
Review my Lovable-generated app for security vulnerabilities:

## Check 1: Row Level Security
For every Supabase table:
- Is RLS enabled? (ALTER TABLE x ENABLE ROW LEVEL SECURITY)
- Are policies defined?
- Do policies properly restrict by auth.uid()?
- Flag: Tables with RLS disabled or overly permissive policies

## Check 2: API Key Exposure
Search for:
- Hardcoded API keys in frontend code
- Keys in environment variables exposed to client
- Recommend: Move to Lovable Secrets + Edge Functions

## Check 3: Authentication Requirements
For sensitive operations:
- Is auth required before data access?
- Are there unprotected API endpoints?
- Flag: Operations that should require auth but don't

## Check 4: Data Exposure
Check if responses include:
- More data than necessary
- Sensitive fields (passwords, tokens, PII)
- Recommend: Select only needed fields

## Check 5: Input Validation
Verify:
- Server-side validation exists (not just client)
- Edge Functions validate before database operations

For each issue:
- Show the vulnerable code/config
- Explain the attack scenario
- Provide secure replacement
```

### Section 6: Lovable vs Other AI Tools (150-200 words)

| Tool | RLS Handling | Security Scanner | Phishing Resistance |
|------|--------------|------------------|---------------------|
| Lovable | Often missing | Yes (limited) | 1.8/10 |
| Bolt | User responsibility | No | Not tested |
| v0 | Not applicable (UI only) | Deployment blocks | Not tested |
| Cursor | User responsibility | No | Not tested |

Key differences:
- Lovable deploys full apps with databases
- Other tools generate code, user deploys
- Lovable's convenience = security tradeoffs

### Section 7: FAQ (5 questions, 50-100 words each)
- Use PAA questions above
- Direct, honest answers
- Include CVE reference

### Section 8: Related Content
- Link to Supabase stack guides
- Link to Bolt article
- Link to IDOR article (related to RLS failures)

---

## Internal Links (8-10 required)

| Anchor Text | URL | Context/Placement |
|-------------|-----|-------------------|
| IDOR | /kb/security/vulnerabilities/idor/ | RLS failures cause IDOR |
| missing authentication | /kb/security/vulnerabilities/missing-auth/ | Auth patterns |
| hardcoded secrets | /kb/security/vulnerabilities/hardcoded-secrets/ | API key exposure |
| broken access control | /kb/security/vulnerabilities/broken-access-control/ | RLS is access control |
| Next.js + Supabase security | /kb/security/stacks/nextjs-supabase/ | Supabase RLS guidance |
| SvelteKit + Supabase security | /kb/security/stacks/sveltekit-supabase/ | Supabase RLS guidance |
| Bolt security patterns | /kb/vibe-coding-tools/bolt/ | Tool comparison |
| v0 security patterns | /kb/vibe-coding-tools/v0/ | Tool comparison |
| Cursor security patterns | /kb/vibe-coding-tools/cursor/ | Tool comparison |

---

## External Links (10-15 required)

| Anchor Text | URL | Tier | Placement |
|-------------|-----|------|-----------|
| Lovable | https://lovable.dev | Official | Intro |
| Lovable Security Documentation | https://docs.lovable.dev/features/security | Official | Security features |
| CVE-2025-48757 Details | https://www.superblocks.com/blog/lovable-vulnerabilities | 4 | CVE section |
| VibeScamming Research | https://thehackernews.com/2025/04/lovable-ai-found-most-vulnerable-to.html | 4 | Phishing section |
| Semafor Coverage | https://www.semafor.com/article/05/29/2025/the-hottest-new-vibe-coding-startup-lovable-is-a-sitting-duck-for-hackers | 4 | Background |
| Supabase Row Level Security | https://supabase.com/docs/guides/auth/row-level-security | 6 | Fix section |
| OWASP A01:2021 Broken Access Control | https://owasp.org/Top10/A01_2021-Broken_Access_Control/ | 1 | Context |
| CWE-284 Improper Access Control | https://cwe.mitre.org/data/definitions/284.html | 1 | Context |
| Guardio Labs Research | https://guardio.co | 4 | VibeScamming section |
| Matt Palmer CVE Statement | https://mattpalmer.io/posts/statement-on-CVE-2025-48757/ | 4 | Disclosure section |

---

## Notes for Writer Agent

### Tone Guidance
- **Honest but constructive:** Lovable has real problems, but can be used safely
- **Not alarmist:** Many vibe coders love Lovable, don't shame them
- **Practical focus:** Show exactly how to fix issues
- **Fair comparison:** Other tools have issues too

### Technical Accuracy
- Supabase anon_key is ALWAYS public by design - that's expected
- RLS is what protects data, not hiding the key
- Lovable's scanner exists but has known limitations
- CVE-2025-48757 is real and documented
- VibeScamming scores are from Guardio Labs research

### Things to Avoid
- Don't suggest Lovable is unusable (it's not)
- Don't blame users for Lovable's defaults
- Don't oversimplify RLS (it's complex)
- Don't forget the phishing angle (VibeScamming)

### Vibe Coding Terms
Use these 3-5 times naturally:
- vibe coding / vibe coders
- AI-generated apps
- vibe coded apps

### Value Maximizers
- CVE-2025-48757 details (timely, searchable)
- VibeScamming benchmark comparison
- Complete RLS audit checklist
- Tool comparison table
- AI fix prompt for Lovable apps
- Honest assessment with practical solutions

---

## Checklist Before Marking READY

- [x] All external links verified working
- [x] CVE details accurate (CVE-2025-48757, CVSS 8.26)
- [x] 9 internal links identified
- [x] 5 PAA questions included
- [x] Competitive gap is specific
- [x] RLS examples included
- [x] VibeScamming benchmark data included
- [x] Tool comparison table drafted
- [x] AI fix prompt included
- [x] Disclosure timeline accurate

---

**Brief Status:** READY for Writer Agent
