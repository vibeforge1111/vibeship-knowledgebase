# Content Brief: NoSQL Injection Vulnerability Guide

**Generated:** 2025-12-17
**Type:** Vulnerability
**Priority:** P0 (Quick Win - KD 4)
**Status:** Ready for Writer

---

## 1. Article Overview

### Target Keywords (Ahrefs Data)
| Keyword | Volume | Difficulty | Intent |
|---------|--------|------------|--------|
| nosql injection | 250 | 4 | Informational |
| mongodb injection | 100 | 4 | Informational |
| nosql injection attack | 50 | - | Informational |
| mongodb security | 100 | - | Informational |

**Total Addressable Volume:** ~500/month
**Average Difficulty:** 4 (Very Easy - Quick Win!)

### Search Intent
Users searching want to:
- Understand what NoSQL injection is
- Learn how it differs from SQL injection
- Find examples of MongoDB injection attacks
- Learn prevention techniques

### Article Goal
Definitive NoSQL injection guide for vibe coders using MongoDB, Firestore, and other NoSQL databases.

---

## 2. Topic Research

### What is NoSQL Injection?
- Injection attack targeting NoSQL databases (MongoDB, Firestore, DynamoDB, etc.)
- Exploits query operators and JSON-based queries
- Different from SQL injection but similar concept
- Often overlooked because "NoSQL is safe" myth

### CWE/OWASP Classification
- **CWE-943:** Improper Neutralization of Special Elements in Data Query Logic
- **OWASP:** A03:2021-Injection
- Related to CWE-89 (SQL Injection) but specific to NoSQL

### Common Attack Vectors

**MongoDB Operator Injection:**
```javascript
// Vulnerable code
const user = await db.collection('users').findOne({
  username: req.body.username,
  password: req.body.password
})

// Attack payload
{ "username": "admin", "password": { "$ne": "" } }
// This matches any password that is not empty!
```

**MongoDB $where Injection:**
```javascript
// Vulnerable code
db.collection('users').find({
  $where: `this.username == '${username}'`
})

// Attack payload
username = "'; return true; //"
// Returns all users!
```

**Firestore Path Injection:**
```javascript
// Vulnerable code
const doc = await db.collection('users').doc(userId).get()
// If userId = "../secrets/apikeys" - path traversal!
```

### Why AI Tools Generate Vulnerable Code
1. Training data includes vulnerable patterns
2. AI prioritizes "working" over "secure"
3. NoSQL syntax looks safe (no SQL keywords)
4. Operator injection is less documented
5. AI often skips input validation

---

## 3. Competitive Analysis

### Current SERP Landscape
- OWASP documentation (technical)
- Academic/security research papers
- MongoDB security guides
- Penetration testing tutorials

### Content Gap (Our Opportunity)
**Vibe coder perspective missing:**
- AI-generated NoSQL code patterns
- JavaScript/TypeScript examples
- Firestore and modern databases
- Copy-paste prevention code

### Our Unique Angle
"NoSQL Injection: Protect Your MongoDB & Firestore Apps"
- Vibe coder friendly language
- AI tool pattern analysis
- Modern stack focus (MongoDB, Firestore)
- Copy-paste fixes

---

## 4. Prevention Techniques

### Input Validation (Primary Defense)
```typescript
// Validate input is a string, not an object
function sanitizeInput(input: unknown): string {
  if (typeof input !== 'string') {
    throw new Error('Invalid input type')
  }
  return input
}

// Usage
const username = sanitizeInput(req.body.username)
const user = await db.collection('users').findOne({ username })
```

### Schema Validation with Zod
```typescript
import { z } from 'zod'

const loginSchema = z.object({
  username: z.string().min(1).max(50),
  password: z.string().min(8)
})

// This rejects objects like { "$ne": "" }
const { username, password } = loginSchema.parse(req.body)
```

### MongoDB Query Sanitization
```typescript
// Use mongo-sanitize or similar
import sanitize from 'mongo-sanitize'

const cleanUsername = sanitize(req.body.username)
const user = await db.collection('users').findOne({
  username: cleanUsername
})
```

### Avoid $where and JavaScript Execution
```javascript
// ❌ NEVER use $where with user input
db.find({ $where: `this.name == '${name}'` })

// ✅ Use standard query operators
db.find({ name: name })
```

### Firestore Path Validation
```typescript
// Validate document IDs
function isValidDocId(id: string): boolean {
  // Only allow alphanumeric and hyphens
  return /^[a-zA-Z0-9-]+$/.test(id)
}

const userId = req.params.id
if (!isValidDocId(userId)) {
  return res.status(400).json({ error: 'Invalid ID' })
}
const doc = await db.collection('users').doc(userId).get()
```

---

## 5. Content Structure

### Recommended Format
```
H1: NoSQL Injection: Protect Your MongoDB & Firestore Apps

Quick Answer Box (50 words):
NoSQL injection exploits query operators in MongoDB, Firestore, and
other NoSQL databases. Attackers pass objects like {"$ne": ""} instead
of strings to bypass authentication. Ranked under OWASP A03:2021 Injection.
Here's how to detect and fix it.

H2: What Is NoSQL Injection?
- Definition
- How it differs from SQL injection
- Why NoSQL isn't automatically safe
- CWE-943 reference
- Target: 150-200 words

H2: How NoSQL Injection Works
- MongoDB operator injection
- $where JavaScript injection
- Firestore path injection
- Visual examples
- Target: 250-300 words

H2: Why AI Tools Generate Vulnerable NoSQL Code
- Pattern analysis from AI tools
- Common vulnerable patterns
- Why this happens
- Target: 150-200 words

H2: NoSQL Injection Examples
- MongoDB auth bypass
- Data extraction
- Firestore path traversal
- Code snippets
- Target: 250-300 words

H2: How to Prevent NoSQL Injection
- Input type validation
- Schema validation (Zod)
- Query sanitization
- Avoid $where
- Path validation
- Target: 350-400 words

H2: AI Fix Prompt
- Complete prompt for reviewing NoSQL code
- Target: 200-300 words

H2: FAQ
- 5 questions

H2: Related Vulnerabilities
- Links to SQL injection, other articles
```

---

## 6. SEO Strategy

### Title Tag (under 60 chars)
```
NoSQL Injection: MongoDB & Firestore Security | VibeShip
```
(54 characters)

### Meta Description (150-160 chars)
```
NoSQL injection lets attackers bypass auth with query operators like $ne. Learn how to protect MongoDB and Firestore apps with validation and sanitization.
```
(156 characters)

### Target URL
```
/kb/security/vulnerabilities/nosql-injection/
```

### Internal Links TO Include
- /kb/security/vulnerabilities/sql-injection/
- /kb/vibe-coding-tools/cursor/
- /kb/vibe-coding-tools/bolt/
- /kb/security/stacks/nextjs-supabase/
- /kb/vibe-coding/secure-vibe-coding-guide/

### External Links
- OWASP Injection: https://owasp.org/Top10/A03_2021-Injection/
- CWE-943: https://cwe.mitre.org/data/definitions/943.html
- MongoDB Security: https://www.mongodb.com/docs/manual/security/

---

## 7. FAQ Questions

1. "What is NoSQL injection?"
2. "Is MongoDB vulnerable to injection?"
3. "How do I prevent NoSQL injection?"
4. "What is the difference between SQL and NoSQL injection?"
5. "Can Firestore be injected?"

---

## 8. AI Fix Prompt

```markdown
## AI Security Review: NoSQL Injection

Review my MongoDB/Firestore code for NoSQL injection vulnerabilities:

**Check for:**
1. User input passed directly to queries without validation
2. Objects accepted where strings expected
3. Use of $where with any user-influenced data
4. Unvalidated document IDs or paths
5. Missing type checking on query parameters

**Flag these patterns:**
- findOne({ field: req.body.value }) without type check
- $where: `expression with ${userInput}`
- doc(userId) without ID validation
- Query operators in user-controllable fields

**Provide:**
- Specific vulnerable lines
- Why each is risky
- Fixed code with proper validation

[PASTE YOUR NOSQL DATABASE CODE HERE]
```

---

## 9. Writer Notes

### Tone
- Educational, not alarmist
- "Here's how to build safely"
- Vibe coder friendly

### Key Messages
1. NoSQL doesn't mean "no injection"
2. Operator injection is the main threat
3. Type validation is the primary defense
4. Zod/schema validation prevents most attacks

### Word Count Target
1,500-1,800 words

---

**Brief Status:** ✅ Ready for Writer Agent
