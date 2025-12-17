# Content Brief: NoSQL Injection

**Generated:** 2025-12-17
**Target Publish:** 2025-12-20
**Priority:** P0
**Status:** Ready for Writer

---

## 1. Core Data

### Scanner Statistics
**NOTE:** Scanner data collection in progress. Using external authoritative sources until data available.

| Metric | Value | Source |
|--------|-------|--------|
| Prevalence | Data coming soon | Scanner DB (pending) |
| Repos Scanned | Data coming soon | Scanner DB (pending) |
| Week-over-Week | Data coming soon | Scanner DB (pending) |
| Most Affected Tool | Data coming soon | Scanner DB (pending) |

**When Scanner data unavailable, reference:**
- Recent CVE data (CVE-2025-23061, CVE-2024-53900)
- OWASP A03:2021 ranking (#3)
- Research showing 17 MongoDB vulnerabilities in 2025 with average CVSS 5.7

### Tool Breakdown
| Tool | Vulnerability Pattern | Why AI Generates This |
|------|-------------------|-------------|
| Cursor | Accepts objects in query params without type checking | Training data includes vulnerable MongoDB patterns |
| Bolt | Uses template literals with user input in queries | Prioritizes "working code" over validation |
| Claude Code | Passes req.body directly to findOne() | Minimal boilerplate approach skips validation |
| v0 | Missing Zod schemas on API endpoints | Generates UI-first, security-second |
| Replit | Uses $where with string interpolation | Educational examples in training data use $where |
| Copilot | No input sanitization in suggested code | Context window misses security requirements |

**Common AI-Generated Pattern:**
```javascript
// What AI tools generate (VULNERABLE)
const user = await db.collection('users').findOne({
  username: req.body.username,
  password: req.body.password
})
```

**Why vulnerable:** AI doesn't add type validation. Attacker sends `{"username": "admin", "password": {"$ne": ""}}` to bypass auth.

### Security References
- **CWE ID:** [CWE-943](https://cwe.mitre.org/data/definitions/943.html)
- **CWE Name:** Improper Neutralization of Special Elements in Data Query Logic
- **OWASP Category:** [A03:2021 - Injection](https://owasp.org/Top10/A03_2021-Injection/)
- **Severity:** High
- **CVSS Range:** 7.5 - 9.0 (based on recent Mongoose CVEs)
- **Recent CVEs:**
  - [CVE-2025-23061](https://github.com/advisories/GHSA-vg7j-7cwx-8wgw) (CVSS 9.0) - Mongoose search injection via $or nesting
  - [CVE-2024-53900](https://vulert.com/vuln-db/CVE-2024-53900) (CVSS 9.1) - Mongoose $where injection

---

## 2. SEO Strategy

### Target Keywords
| Keyword | Est. Volume | Difficulty | Intent |
|---------|-------------|------------|--------|
| nosql injection | 250 | 4 | Informational |
| mongodb injection | 100 | 4 | Informational |
| nosql injection attack | 50 | Low | Informational |
| mongodb security | 100 | Medium | Informational |
| firestore security | 80 | Low | Informational |
| mongoose injection | 40 | Low | Informational |

**Total Addressable Volume:** ~620/month
**Average Difficulty:** 4 (Very Easy - Quick Win!)

### People Also Ask
1. "What is NoSQL injection?"
2. "Is MongoDB vulnerable to injection?"
3. "How do I prevent NoSQL injection?"
4. "What is the difference between SQL and NoSQL injection?"
5. "Can Firestore be injected?"
6. "How does $ne operator bypass authentication?"
7. "Is NoSQL safer than SQL?"

### Search Intent Analysis
- **Primary intent:** Informational (understand NoSQL injection)
- **User goal:** Learn if NoSQL databases are vulnerable and how to protect them
- **Content need:** Plain English explanation, debunk "NoSQL is safe" myth, copy-paste fixes
- **Key misconception to address:** "NoSQL = No SQL = No Injection" (FALSE)

---

## 3. Competitive Analysis

### Current Top 3 Results for "nosql injection"

**1. [PortSwigger Web Security Academy](https://portswigger.net/web-security/nosql-injection)**
- Title: NoSQL injection | Web Security Academy
- Word count: ~2,500
- Strengths: Comprehensive, lab exercises, syntax vs operator injection breakdown
- Weaknesses: Pentester audience, no AI-generated code angle, no modern JavaScript frameworks
- Our advantage: Vibe coder focus, AI tool patterns, TypeScript + Zod examples

**2. [Snyk Learn - NoSQL Injection Tutorial](https://learn.snyk.io/lesson/nosql-injection-attack/)**
- Title: NoSQL injection attack | Tutorials & examples | Snyk Learn
- Word count: ~1,800
- Strengths: Developer-friendly, code examples, clear vulnerability/fix structure
- Weaknesses: Generic examples, no Firestore coverage, no AI tool analysis
- Our advantage: Multi-database coverage (MongoDB, Firestore, DynamoDB), AI-specific patterns

**3. [HackTricks - NoSQL Injection](https://book.hacktricks.xyz/pentesting-web/nosql-injection)**
- Title: NoSQL injection - HackTricks
- Word count: ~3,000
- Strengths: Exhaustive attack payloads, multiple databases, regex extraction techniques
- Weaknesses: Offensive security focus, overwhelming for beginners, no prevention emphasis
- Our advantage: Defense-first approach, beginner-friendly, AI fix prompts

### Content Gaps (Our Opportunities)
1. **No AI tool analysis:** None cover why Cursor/Bolt/Claude Code generate vulnerable patterns
2. **Missing Firestore:** Most focus on MongoDB, ignore Firestore path injection
3. **No TypeScript examples:** All use plain JavaScript, miss typed validation (Zod)
4. **No copy-paste AI fix prompt:** None provide complete AI security review prompt
5. **Myth not addressed:** None explicitly debunk "NoSQL is safe by default"

---

## 4. Content Structure

### Recommended Sections

```
H1: NoSQL Injection: Why MongoDB Isn't Safe by Default

Quick Answer Box (under 50 words):
NoSQL injection exploits query operators ($ne, $gt, $where) in MongoDB,
Firestore, and other NoSQL databases to bypass authentication or steal data.
Ranked #3 in OWASP Top 10 as part of Injection attacks. AI tools often generate
vulnerable patterns by accepting objects without type validation.

H2: What is NoSQL Injection?
    - Plain English: Manipulation of NoSQL queries through operators
    - NOT just MongoDB - affects Firestore, DynamoDB, CouchDB
    - CWE-943 classification
    - Analogy: Like SQL injection, but with JSON operators instead of SQL keywords
    - Key myth to bust: "NoSQL databases don't have injection vulnerabilities"
    Target: 120-150 words

H2: The "NoSQL is Safe" Myth
    - Why developers believe this (no SQL = no injection?)
    - Reality: Different attack surface, similar risk
    - Recent CVEs prove ongoing threat (CVE-2025-23061 CVSS 9.0)
    - Quote OWASP Top 10: "NoSQL" explicitly listed under Injection
    Target: 100-120 words

H2: How NoSQL Injection Works
    H3: Operator Injection ($ne, $gt, $regex)
        - Code example: authentication bypass with {"$ne": ""}
        - Why it works: Object vs string confusion
        Target: 100-120 words

    H3: JavaScript Injection ($where)
        - Code example: $where with template literals
        - Remote code execution risk
        Target: 80-100 words

    H3: Path Injection (Firestore)
        - Code example: ../secrets/apikeys path traversal
        - Document ID validation importance
        Target: 80-100 words

    Total H2: 260-320 words

H2: Why AI Tools Generate Vulnerable NoSQL Code
    - Training data includes vulnerable patterns from tutorials
    - AI prioritizes "working" over "secure"
    - NoSQL queries look safe (no SQL keywords to flag)
    - Operator injection less documented than SQL injection
    - AI skips "boring" validation steps
    - Tool comparison table: What each tool typically generates
    Target: 150-200 words

H2: NoSQL Injection in the Wild
    - CVE-2025-23061: Mongoose $or nesting bypass (CVSS 9.0)
    - CVE-2024-53900: Mongoose $where injection (CVSS 9.1)
    - Real-world attack scenario: Admin panel bypass
    - Data exfiltration with $regex
    Target: 150-180 words

H2: What Could Happen
    - Authentication bypass (most common)
    - Unauthorized data access
    - Data exfiltration via regex
    - Remote code execution (via $where)
    - Privilege escalation
    Target: 80-100 words

H2: How to Detect NoSQL Injection
    - Code patterns to search for:
      - findOne({ field: req.body.value })
      - $where with ${} interpolation
      - .doc(userId) without validation
    - Quick check: Pass {"$ne": ""} to login
    - Scanner CTA: "Scan your codebase for NoSQL injection →"
    Target: 120-150 words

H2: How to Fix NoSQL Injection
    H3: AI Fix Prompt (Primary Solution)
        - Complete 200-400 word prompt
        - Checklist of what to look for
        - Expected output format
        Target: 250-350 words

    H3: Type Validation (Core Defense)
        - Before/after: Manual type checking
        - Zod schema validation (recommended)
        Target: 120-150 words

    H3: Query Sanitization
        - mongo-sanitize library
        - Custom sanitization function
        Target: 100-120 words

    H3: Avoid $where and Server-side JavaScript
        - Disable in production
        - Alternative query patterns
        Target: 80-100 words

    H3: Path Validation (Firestore)
        - Regex for valid document IDs
        - Whitelist approach
        Target: 80-100 words

    Total H2: 630-820 words

H2: Database-Specific Prevention
    H3: MongoDB
        - Mongoose strict mode
        - Query operator allowlist
        Target: 80-100 words

    H3: Firestore
        - Security Rules (server-side)
        - Client SDK patterns
        Target: 80-100 words

    H3: DynamoDB
        - Expression attribute names
        - Parameterized queries
        Target: 60-80 words

    Total H2: 220-280 words

H2: FAQ
    - 5 questions from PAA
    - 50-100 words each
    Total: 250-500 words

H2: Related Vulnerabilities
    - SQL Injection (comparison)
    - Command Injection
    - LDAP Injection
    - Mass Assignment
    Target: 60-80 words
```

### Total Word Count Target: 2,000-2,500 words

### Required Elements Checklist
- [ ] Quick answer under 50 words
- [ ] "NoSQL is safe" myth explicitly debunked in first 300 words
- [ ] Three attack types: operator, JavaScript, path injection
- [ ] Tool comparison chart (why each AI tool generates vulnerabilities)
- [ ] CVE references (CVE-2025-23061, CVE-2024-53900)
- [ ] Complete AI fix prompt (250-350 words)
- [ ] Before/after code examples (minimum 3 sets)
- [ ] TypeScript + Zod example
- [ ] MongoDB AND Firestore coverage
- [ ] 5-7 FAQ entries matching PAA
- [ ] Scanner CTA
- [ ] 8-12 internal links
- [ ] CWE-943 and OWASP A03:2021 references with links

---

## 5. Internal Linking

### Must Link TO (Parent/Authority Pages)
| Page | Suggested Anchor Text | Context |
|------|----------------------|---------|
| /kb/security/vulnerabilities/ | "security vulnerabilities" | In "What is NoSQL injection" section |
| /kb/vibe-coding/secure-vibe-coding-guide/ | "secure vibe coding practices" | In AI tools section |
| /kb/vibe-coding-tools/cursor/ | "Cursor security patterns" | In tool comparison |
| /kb/vibe-coding-tools/bolt/ | "Bolt-generated code" | In tool comparison |

### Should Link TO (Related Content)
| Page | Suggested Anchor Text | Context |
|------|----------------------|---------|
| /kb/security/vulnerabilities/sql-injection/ | "SQL injection" | Comparison in "What is" section |
| /kb/security/vulnerabilities/command-injection/ | "command injection" | Related vulnerabilities |
| /kb/security/vulnerabilities/mass-assignment/ | "mass assignment" | Related to object parameter manipulation |
| /kb/security/stacks/nextjs-mongodb/ | "Next.js + MongoDB security" | Framework-specific fixes |
| /kb/security/stacks/nextjs-firebase/ | "Next.js + Firebase guide" | Firestore examples |

### External Authority Links
| Source | Purpose | URL |
|--------|---------|-----|
| OWASP A03:2021 | Official vulnerability category | https://owasp.org/Top10/A03_2021-Injection/ |
| CWE-943 | Technical reference | https://cwe.mitre.org/data/definitions/943.html |
| PortSwigger NoSQL | Deep technical dive | https://portswigger.net/web-security/nosql-injection |
| MongoDB Security Docs | Official prevention guide | https://www.mongodb.com/docs/manual/security/ |
| Mongoose Security | Library-specific guidance | https://mongoosejs.com/docs/guides.html#security |
| Firestore Security Rules | Official Firestore protection | https://firebase.google.com/docs/firestore/security/get-started |
| CVE-2025-23061 | Recent Mongoose vulnerability | https://github.com/advisories/GHSA-vg7j-7cwx-8wgw |
| CVE-2024-53900 | Mongoose $where injection | https://vulert.com/vuln-db/CVE-2024-53900 |
| Snyk NoSQL Tutorial | Developer education | https://learn.snyk.io/lesson/nosql-injection-attack/ |
| MongoDB Injection Dataset | Research reference | https://pmc.ncbi.nlm.nih.gov/articles/PMC10997947/ |

---

## 6. Unique Angle

### Our Differentiator
**"The NoSQL Safety Myth: Why AI Tools Make It Worse"**

We're the ONLY resource that:
1. Explicitly debunks "NoSQL is safe by default"
2. Explains WHY AI tools (Cursor, Bolt, Claude Code) generate vulnerable NoSQL patterns
3. Covers MongoDB AND Firestore AND DynamoDB (not just MongoDB)
4. Provides TypeScript + Zod validation examples (modern stack)
5. Includes complete AI fix prompt for automated review

### Key Message
**NoSQL databases are NOT immune to injection attacks. The "NoSQL is safe" belief makes vibe coders vulnerable because AI tools generate code that accepts objects where strings are expected, enabling operator injection.**

### Data-Driven Claims to Highlight
1. "NoSQL injection ranks #3 in the OWASP Top 10 under Injection attacks"
2. "Recent Mongoose vulnerabilities (CVE-2025-23061, CVE-2024-53900) scored 9.0+ CVSS"
3. "17 MongoDB security vulnerabilities reported in 2025 alone with average CVSS 5.7"
4. "Authentication bypass possible with single-character payload: {\"$ne\": \"\"}"

---

## 7. Meta Information

### Suggested Title Tag (under 60 chars)
```
NoSQL Injection: Why MongoDB Isn't Safe | VibeShip
```
(51 characters)

### Suggested Meta Description (150-160 chars)
```
NoSQL injection exploits MongoDB, Firestore operators to bypass auth. AI tools generate vulnerable patterns. Get TypeScript + Zod fixes here.
```
(148 characters)

### Target URL
```
/kb/security/vulnerabilities/nosql-injection/
```

### Related URLs to Create (Future Content)
- /kb/security/fixes/nosql-injection/nextjs/
- /kb/security/fixes/nosql-injection/express/
- /kb/security/fixes/nosql-injection/firebase/
- /kb/vibe-coding-tools/cursor/nosql-patterns/
- /kb/security/stacks/nextjs-mongodb/
- /kb/security/stacks/nextjs-firebase/

---

## 8. Writer Notes

### Tone Guidance
- **Educational, myth-busting tone:** "You might think NoSQL is safe - here's why that's wrong"
- **Not alarmist:** Focus on "here's how to build it right" not "your app is doomed"
- **Vibe coder friendly:** Assume MongoDB basics but zero security knowledge
- **Empowering:** "You can fix this with 5 lines of Zod validation"

### Technical Accuracy Notes
- **IMPORTANT:** NoSQL injection is NOT the same as SQL injection - different attack vectors
- **Don't say:** "NoSQL databases are secure" (they're not automatically)
- **Do say:** "NoSQL databases have different injection vectors than SQL"
- **Mongoose strict mode:** Mention it helps but isn't complete protection
- **Firestore Security Rules:** These are server-side and SEPARATE from client code validation
- **$where operator:** Can execute JavaScript - this is RCE risk, emphasize severity

### Things to Avoid
- Don't recommend deprecated solutions (mongo-sanitize is OK but not sufficient alone)
- Don't oversimplify: "Just use Mongoose" (Mongoose HAD vulnerabilities, see CVEs)
- Don't ignore Firestore (many vibe coders use Firebase)
- Don't make this MongoDB-only (DynamoDB, CouchDB also affected)
- Don't skip TypeScript (vibe coders use it, show typed solutions)

### Code Example Requirements
**Every code example must show before AND after:**

```typescript
// ❌ VULNERABLE (what AI generates)
const user = await db.collection('users').findOne({
  username: req.body.username,
  password: req.body.password
})

// ✅ SECURE (with Zod validation)
import { z } from 'zod'

const loginSchema = z.object({
  username: z.string().min(1).max(50),
  password: z.string().min(8)
})

const { username, password } = loginSchema.parse(req.body)
const user = await db.collection('users').findOne({ username, password })
```

### Reference Materials
Writer should consult:
- [PortSwigger NoSQL Injection](https://portswigger.net/web-security/nosql-injection) - Attack techniques
- [OWASP NoSQL Injection Testing](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Input_Validation_Testing/05.6-Testing_for_NoSQL_Injection) - Testing methodology
- [MongoDB Security Checklist](https://www.mongodb.com/docs/manual/administration/security-checklist/) - Official prevention
- [Mongoose Security](https://mongoosejs.com/docs/guides.html#security) - Library-specific
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started) - Firestore protection
- [CVE-2025-23061 Analysis](https://nsfocusglobal.com/mongodb-mongoose-search-injection-vulnerability-cve-2025-23061/) - Recent vulnerability

### Vibe Coding Terminology
**MUST use "vibe coding" terms 5-8 times throughout article:**
- "vibe coding with MongoDB"
- "vibe coded apps often have NoSQL injection"
- "as a vibe coder building with Cursor"
- "AI-generated code from Bolt lacks validation"
- "when vibe coding with Firestore"

### FAQ Section - Questions to Answer
1. **What is NoSQL injection?** - Direct definition with CWE reference
2. **Is MongoDB vulnerable to injection?** - YES, operator injection and $where
3. **How do I prevent NoSQL injection?** - Type validation with Zod (primary answer)
4. **What is the difference between SQL and NoSQL injection?** - Operators vs SQL keywords
5. **Can Firestore be injected?** - Path injection and Security Rules importance
6. **How does $ne operator bypass authentication?** - Technical explanation with example
7. **Is NoSQL safer than SQL?** - NO, different attack surface, similar risk

---

## 9. AI Fix Prompt (Complete)

**This is the copy-paste prompt vibe coders will use. Must be 250-350 words.**

```markdown
## AI Security Review: NoSQL Injection Detection

Review the following MongoDB/Firestore/NoSQL database code for injection vulnerabilities.

**Check for these vulnerable patterns:**

1. **Operator Injection Risk:**
   - User input passed directly to query without type validation
   - Objects accepted where strings expected (allows `{"$ne": ""}` attacks)
   - Query parameters from req.body/req.query used without sanitization
   - Missing schema validation (Zod, Yup, or similar)

2. **JavaScript Execution Risk:**
   - Any use of `$where` operator with user-influenced data
   - Template literals (${}) in query strings
   - eval() or Function() with database-related variables

3. **Path Injection Risk (Firestore/Document DBs):**
   - Document IDs from user input without validation
   - Path parameters used in .doc() or .collection() without regex check
   - Missing alphanumeric-only validation on IDs

4. **Query Operator Risk:**
   - User-controlled query operators ($gt, $lt, $regex, $ne)
   - Unvalidated filter objects
   - Dynamic query building with user input

**For each vulnerability found, provide:**

1. **Vulnerable Line:** The exact code line with the issue
2. **Attack Scenario:** How an attacker could exploit it (with example payload)
3. **Impact:** What could happen (auth bypass, data leak, RCE)
4. **Fixed Code:** Complete replacement code with:
   - Zod schema validation (preferred) OR manual type checking
   - Input sanitization if needed
   - Safe query pattern

**Example vulnerability report format:**

```typescript
// VULNERABLE (Line 45):
const user = await db.collection('users').findOne({
  username: req.body.username
})

// ATTACK: {"username": {"$ne": ""}} returns all users
// IMPACT: Leak all usernames, potential auth bypass

// FIXED:
import { z } from 'zod'
const schema = z.object({ username: z.string().min(1).max(50) })
const { username } = schema.parse(req.body)
const user = await db.collection('users').findOne({ username })
```

**Now review this code:**

[PASTE YOUR NOSQL DATABASE CODE HERE]
```

---

## 10. Tool-Specific Attack Patterns

### What Each AI Tool Typically Generates

**Cursor:**
```typescript
// Cursor often generates this pattern
async function login(req: Request) {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password
  })
  if (user) return { success: true, user }
}
```
**Vulnerability:** Accepts objects without type checking. Attack: `{"email": "admin@example.com", "password": {"$ne": ""}}`

**Bolt:**
```javascript
// Bolt generates quick API endpoints
app.post('/api/users', async (req, res) => {
  const users = await db.collection('users').find(req.body).toArray()
  res.json(users)
})
```
**Vulnerability:** Entire req.body passed to find(). Attack: `{"$where": "return true"}` returns all users.

**Claude Code:**
```typescript
// Claude Code focuses on minimal boilerplate
const getUserById = async (id: string) => {
  return await db.collection('users').doc(id).get()
}
// Called with: getUserById(req.params.id)
```
**Vulnerability:** No ID validation. Attack: `../secrets/apikeys` (path traversal in Firestore).

**v0:**
```typescript
// v0 generates UI + API together
export async function POST(request: Request) {
  const json = await request.json()
  const result = await db.users.findOne(json)
  return Response.json(result)
}
```
**Vulnerability:** Entire JSON body used as query. Attack: `{"_id": {"$ne": null}}` returns first user.

---

## 11. Databases Affected

### Coverage Requirements
Article MUST cover at least these three:

**MongoDB (Primary Focus):**
- Operator injection ($ne, $gt, $where)
- Mongoose vulnerabilities (CVEs)
- Prevention with Mongoose strict mode

**Firestore (Secondary Focus):**
- Path injection
- Security Rules as server-side validation
- Client SDK safe patterns

**Brief Mentions:**
- DynamoDB (Expression Attribute Names as prevention)
- CouchDB (Similar operator injection risks)
- Redis (If used as document store)

---

**Brief Status:** ✅ Complete - Ready for Writer Agent

**Estimated Article Length:** 2,000-2,500 words
**Estimated Read Time:** 8-10 minutes
**Target Publishing Date:** 2025-12-20
