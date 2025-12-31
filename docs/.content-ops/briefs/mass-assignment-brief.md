# Content Brief: Mass Assignment Vulnerability

## Status

```yaml
status: DONE
created_at: 2025-12-17T15:45:00Z
created_by: Research Agent Terminal 1B
claimed_by: Writer Agent
claimed_at: 2025-12-17T16:00:00Z
completed_at: 2025-12-17T17:00:00Z
```

---

## Article Metadata

```yaml
type: vulnerability
slug: mass-assignment
url: /kb/security/vulnerabilities/mass-assignment/
title: "Mass Assignment: When Users Modify Fields They Shouldn't"
meta_description: "Mass assignment lets attackers set admin privileges by adding unexpected fields to API requests. Common in Node.js and AI-generated code. Learn safe update patterns."
cwe: CWE-915
owasp: API3:2023-Broken Object Property Level Authorization
severity: High
word_count: 1200-1500
```

---

## Core Data

### Primary References
| Reference | ID | Link |
|-----------|-----|------|
| CWE-915 | Improperly Controlled Modification of Dynamically-Determined Object Attributes | https://cwe.mitre.org/data/definitions/915.html |
| OWASP API Security | API3:2023-Broken Object Property Level Authorization | https://owasp.org/API-Security/editions/2023/en/0xa3-broken-object-property-level-authorization/ |
| OWASP Cheat Sheet | Mass Assignment | https://cheatsheetseries.owasp.org/cheatsheets/Mass_Assignment_Cheat_Sheet.html |

### External Sources (for outbound links)
| Source | URL | Key Finding | Tier |
|--------|-----|-------------|------|
| CWE-915 Definition | https://cwe.mitre.org/data/definitions/915.html | Comprehensive vulnerability definition | 1 |
| OWASP API3:2023 | https://owasp.org/API-Security/editions/2023/en/0xa3-broken-object-property-level-authorization/ | Merged with Excessive Data Exposure in 2023 | 1 |
| OWASP Mass Assignment Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Mass_Assignment_Cheat_Sheet.html | Prevention strategies | 1 |
| OWASP API6:2019 | https://owasp.org/API-Security/editions/2019/en/0xa6-mass-assignment/ | Original mass assignment category | 1 |
| Pynt Mass Assignment | https://www.pynt.io/learning-hub/owasp-top-10-guide/mass-assignment-vulnerability-how-it-works-6-defensive-measures | 6 mitigation strategies | 2 |
| Wallarm Mass Assignment | https://www.wallarm.com/what/mass-assignment | Clear explanation with examples | 2 |

### Key Facts to Include
- Mass Assignment was API6:2019, now merged into API3:2023 (Broken Object Property Level Authorization)
- Also called "autobinding" (Spring), "object injection" (PHP)
- JavaScript prototype pollution is related (CWE-1321)
- Common attack: adding isAdmin: true to user update request
- Object.assign() and spread operator (...) are common culprits
- CVE-2012-2054 (GitHub): Users could push to any repo via mass assignment
- CVE-2008-7310: E-commerce payment bypass via parameter manipulation

---

## SEO Strategy

### Target Keywords
| Keyword | Search Intent | Priority |
|---------|---------------|----------|
| mass assignment vulnerability | informational | Primary |
| mass assignment attack | informational | Primary |
| Node.js mass assignment | informational | Secondary |
| API mass assignment fix | transactional | Secondary |
| object injection JavaScript | informational | Tertiary |

### People Also Ask (FAQs)
1. What is mass assignment vulnerability?
2. How do I prevent mass assignment in Node.js?
3. What is the difference between mass assignment and IDOR?
4. Can mass assignment lead to privilege escalation?
5. How do I safely update objects in JavaScript?

### Competitive Gap
**Top results analysis:**
- OWASP: Comprehensive but API-focused, misses frontend context
- Blog posts: Ruby on Rails focused, outdated
- Few Node.js/JavaScript specific examples

**Our unique angle:**
- JavaScript/Node.js focus (spread operator, Object.assign)
- AI tools generate this pattern constantly
- Clear before/after examples
- Prisma, Mongoose, raw JS patterns

---

## Content Outline

### Quick Answer (50 words max)
Mass assignment happens when your API accepts all fields from a request and updates the database without checking which fields users are allowed to modify. Attackers add fields like `isAdmin: true` to gain elevated privileges. Always use allowlists for updateable fields.

### Section 1: What is Mass Assignment?
- Plain English: User sends extra fields, server saves them all
- Analogy: Like a form where users can write in their own salary
- Known as "autobinding" in Spring, "object injection" in PHP
- Part of OWASP API Security Top 10
- Word count: 100-150

### Section 2: Why This Is Devastating
- Privilege escalation (isAdmin, role)
- Financial manipulation (balance, price)
- Data corruption
- GitHub CVE example (push to any repo)
- Word count: 100-150

### Section 3: Why AI Tools Generate This Pattern
- Object.assign(user, req.body) is "clean" code
- Spread operator: { ...user, ...req.body } looks modern
- Prisma: prisma.user.update({ data: req.body })
- AI optimizes for readability, not security
- Word count: 150-200

### Section 4: Common Mass Assignment Patterns
- Direct object merge
- ORM/ODM with unsanitized input
- GraphQL mutations accepting all fields
- Prototype pollution variant
- Word count: 150-200

### Section 5: How to Fix Mass Assignment
- Allowlist fields explicitly
- Use DTOs (Data Transfer Objects)
- Validation libraries (Zod, Joi, Yup)
- Framework protections (Prisma select, Mongoose)
- Word count: 200-300

### Section 6: AI Fix Prompt
- Complete prompt for scanning codebase
- Word count: 150-200

### FAQ Section
- Use PAA questions above
- Each answer: 50-100 words

### Related Content
- Links to other vulnerability articles

---

## Internal Links (5-10 required)

| Anchor Text | URL | Context/Placement |
|-------------|-----|-------------------|
| IDOR | /kb/security/vulnerabilities/idor/ | Related authorization flaw |
| missing authentication | /kb/security/vulnerabilities/missing-auth/ | Access control context |
| SQL injection | /kb/security/vulnerabilities/sql-injection/ | Input validation |
| Cursor security patterns | /kb/vibe-coding-tools/cursor/ | AI tool context |
| Bolt security patterns | /kb/vibe-coding-tools/bolt/ | AI tool context |
| Claude Code security patterns | /kb/vibe-coding-tools/claude-code/ | AI tool context |
| Next.js + Prisma security | /kb/security/stacks/nextjs-prisma/ | Prisma context |

---

## External Links (5-10 required)

| Anchor Text | URL | Tier | Placement |
|-------------|-----|------|-----------|
| CWE-915 | https://cwe.mitre.org/data/definitions/915.html | 1 | Intro |
| OWASP API3:2023 | https://owasp.org/API-Security/editions/2023/en/0xa3-broken-object-property-level-authorization/ | 1 | Intro |
| OWASP Mass Assignment Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Mass_Assignment_Cheat_Sheet.html | 1 | Fix section |
| OWASP API6:2019 | https://owasp.org/API-Security/editions/2019/en/0xa6-mass-assignment/ | 1 | History |
| Zod Documentation | https://zod.dev/ | 6 | Validation section |

---

## Code Examples Needed

### Pattern 1: Vulnerable Object.assign (AI Default)
```javascript
// VULNERABLE: AI generates this for "update user profile"
app.put('/api/user/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
  Object.assign(user, req.body) // DANGEROUS!
  await user.save()
  res.json(user)
})

// Attacker sends: { "name": "John", "isAdmin": true, "role": "superuser" }
// All fields get saved, including isAdmin!
```
Explanation: Object.assign copies ALL properties from request body. Attacker can modify any field.

### Pattern 2: Vulnerable Spread Operator
```javascript
// VULNERABLE: Spread operator is just as dangerous
app.put('/api/user/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
  const updated = { ...user.toObject(), ...req.body } // DANGEROUS!
  await User.findByIdAndUpdate(req.params.id, updated)
  res.json(updated)
})

// Same attack vector as Object.assign
```
Explanation: Spread operator (...) merges objects the same way. No protection against extra fields.

### Pattern 3: Vulnerable Prisma Update
```typescript
// VULNERABLE: Passing request body directly to Prisma
app.put('/api/user/:id', async (req, res) => {
  const user = await prisma.user.update({
    where: { id: req.params.id },
    data: req.body, // DANGEROUS!
  })
  res.json(user)
})

// Attacker can set any column in the users table
```
Explanation: Prisma accepts any fields matching the schema. No automatic field filtering.

### Pattern 4: Secure Allowlist Approach
```javascript
// SECURE: Explicitly pick allowed fields
const ALLOWED_UPDATE_FIELDS = ['name', 'email', 'avatar']

app.put('/api/user/:id', async (req, res) => {
  const user = await User.findById(req.params.id)

  // Only copy allowed fields
  for (const field of ALLOWED_UPDATE_FIELDS) {
    if (req.body[field] !== undefined) {
      user[field] = req.body[field]
    }
  }

  await user.save()
  res.json(user)
})

// Attacker's isAdmin: true is ignored
```
Explanation: Explicitly define which fields users can modify. Ignore everything else.

### Pattern 5: Secure with Zod Validation
```typescript
// SECURE: Use Zod to define and validate allowed fields
import { z } from 'zod'

const UpdateUserSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  email: z.string().email().optional(),
  avatar: z.string().url().optional(),
})

app.put('/api/user/:id', async (req, res) => {
  // Parse and validate - strips unknown fields
  const data = UpdateUserSchema.parse(req.body)

  const user = await prisma.user.update({
    where: { id: req.params.id },
    data, // Only contains allowed, validated fields
  })

  res.json(user)
})
```
Explanation: Zod strips unknown fields by default. Only schema-defined fields pass through.

### Pattern 6: Secure Prisma with Select
```typescript
// SECURE: Prisma with explicit field selection
app.put('/api/user/:id', async (req, res) => {
  const { name, email, avatar } = req.body // Destructure only allowed fields

  const user = await prisma.user.update({
    where: { id: req.params.id },
    data: {
      // Only set fields you explicitly allow
      ...(name && { name }),
      ...(email && { email }),
      ...(avatar && { avatar }),
    },
  })

  res.json(user)
})
```
Explanation: Destructure specific fields. Only those fields can be updated.

### Pattern 7: Secure Mongoose with Schema Options
```javascript
// SECURE: Mongoose with strict schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatar: String,
  isAdmin: { type: Boolean, default: false },
  role: { type: String, default: 'user' },
}, {
  strict: true, // Reject fields not in schema (default)
})

// For updates, use $set with explicit fields
app.put('/api/user/:id', async (req, res) => {
  const allowedFields = ['name', 'email', 'avatar']
  const updates = {}

  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field]
    }
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { $set: updates },
    { new: true }
  )

  res.json(user)
})
```
Explanation: Mongoose strict mode helps, but always use explicit allowlist for updates.

---

## AI Fix Prompt Requirements

The Writer Agent should create an AI fix prompt that includes:
- [ ] Search for Object.assign() with req.body or user input
- [ ] Search for spread operator merging request data: { ...obj, ...req.body }
- [ ] Look for ORM/ODM updates with unsanitized input (Prisma, Mongoose, Sequelize)
- [ ] Check for destructuring patterns that might miss validation
- [ ] Verify all update endpoints use field allowlists
- [ ] Look for role, isAdmin, permissions fields in schemas
- [ ] Framework-specific: Prisma data, Mongoose $set

---

## Notes for Writer Agent

### Tone Guidance
- This is very common in AI-generated code
- The code looks "clean" and "modern" - that's the trap
- Emphasize how easy the fix is (just allowlist fields)

### Technical Accuracy
- CWE-915 is the correct CWE
- OWASP API6:2019 merged into API3:2023
- Prototype pollution (CWE-1321) is related but different
- Zod strips unknown fields by default (good behavior)

### Things to Avoid
- Don't suggest blacklisting dangerous fields (use allowlist)
- Don't confuse with IDOR (mass assignment is about fields, IDOR is about records)
- Don't suggest schema validation alone is enough (strict mode doesn't prevent all cases)

### Vibe Coding Terms
Use these 3-5 times naturally:
- vibe coding
- vibe coders
- vibe coded
- AI-generated code

---

## Checklist Before Marking READY

- [x] All external links verified working
- [x] CWE/OWASP references correct (CWE-915, API3:2023)
- [x] 7 internal links identified
- [x] 5 PAA questions included
- [x] Competitive gap is specific
- [x] Code examples drafted (7 patterns)
- [x] No placeholder text

---

**Brief Status:** READY for Writer Agent
