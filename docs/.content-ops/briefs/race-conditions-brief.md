# Content Brief: Race Conditions

## Status

```yaml
status: READY
created_at: 2025-12-17T22:30:00Z
created_by: Research Agent
claimed_by: null
claimed_at: null
completed_at: null
```

---

## Article Metadata

```yaml
type: vulnerability
slug: race-conditions
url: /kb/security/vulnerabilities/race-conditions/
title: "Race Conditions: How Async Code Creates Security Holes AI Misses"
meta_description: "Race conditions let attackers exploit timing gaps in async code to bypass limits, duplicate transactions, or escalate privileges. Learn secure patterns for Node.js and Python async code."
cwe: CWE-362
cwe_children: CWE-367
owasp: A04:2021-Insecure Design
owasp_url: https://owasp.org/Top10/A04_2021-Insecure_Design/
cwe_url: https://cwe.mitre.org/data/definitions/362.html
severity: High
word_count: 1500-1800
```

---

## Executive Summary

Race conditions occur when concurrent operations access shared resources without proper synchronization, creating timing windows attackers can exploit. In web applications, this enables redeeming gift cards multiple times, bypassing rate limits, or duplicating financial transactions. AI tools generate async code without proper locking mechanisms, making this vulnerability common in vibe coded apps. This article covers race condition patterns and fixes for modern JavaScript and Python applications.

---

## Core Data

### Security References
- **CWE ID:** CWE-362 (Concurrent Execution using Shared Resource with Improper Synchronization)
- **Child CWE:** CWE-367 (Time-of-check Time-of-use - TOCTOU)
- **Parent CWE:** CWE-662 (Improper Synchronization)
- **OWASP Category:** A04:2021 - Insecure Design
- **Severity:** Medium to High (enables financial fraud, privilege escalation)

### Key Statistics

| Statistic | Value | Source |
|-----------|-------|--------|
| CWE Ranking | In Top 25 historically | CWE/MITRE |
| Detection Difficulty | Hard (timing-dependent) | CWE Profile |
| Exploitation | Requires concurrent requests | PortSwigger |
| CVE Examples | 100+ per year | CVE Database |

### Recent Critical CVEs

| CVE | Product | Impact | Date |
|-----|---------|--------|------|
| CVE-2024-50379 | Apache Tomcat | RCE via TOCTOU | 2024 |
| CVE-2025-68146 | Python filelock | Symlink attack via TOCTOU | 2025 |
| CVE-2022-29527 | Privilege escalation | sudoers race | 2022 |
| CVE-2021-0920 | Android | Use-after-free via race | 2021 |
| CVE-2020-6819 | Firefox | Code execution via race | 2020 |

### Common Attack Targets

| Target | Attack | Impact |
|--------|--------|--------|
| Gift card redemption | Redeem same code multiple times | Financial loss |
| Discount codes | Apply same discount repeatedly | Financial loss |
| Rate limiting | Bypass request limits | DoS, brute force |
| Account balance | Withdraw more than available | Financial fraud |
| Inventory | Purchase more items than available | Overselling |
| Privilege checks | Escalate before validation completes | Unauthorized access |

---

## How Race Conditions Work

### The Fundamental Problem
Race conditions exploit the gap between CHECK and USE:

```
Normal flow:
1. CHECK: Is coupon valid? → Yes
2. USE: Apply coupon
3. UPDATE: Mark coupon as used

Race condition attack:
Request 1: CHECK (valid) → USE → UPDATE
Request 2: CHECK (still valid!) → USE → UPDATE
                    ↑
              Gap exploited
```

### Attack Categories

**1. Limit Overrun**
Bypass business logic limits by sending concurrent requests:
```
10 requests sent simultaneously for same gift card
All 10 pass the "is valid" check before any marks it as used
Result: $100 gift card redeemed 10 times = $1000
```

**2. TOCTOU (Time-of-check Time-of-use)**
Resource changes between check and use:
```javascript
// VULNERABLE: Gap between check and use
if (await hasBalance(userId, amount)) {  // CHECK
  // Attacker's parallel request also passes check here
  await deductBalance(userId, amount)     // USE
}
```

**3. Multi-Endpoint Collision**
Exploit interactions between different endpoints:
```
Request A: Add item to cart
Request B: Complete checkout
Result: Item added after price calculated but before order confirmed
```

**4. Single-Endpoint Collision**
Different values to same endpoint:
```
Request A: Reset password for victim@email.com
Request B: Reset password for attacker@email.com
Result: Victim's reset token sent to attacker's email
```

---

## Why AI Tools Miss This

### Async Without Atomicity
AI generates async code focused on correctness, not concurrency safety:

```javascript
// AI generates this for "redeem coupon"
app.post('/redeem', async (req, res) => {
  const coupon = await Coupon.findOne({ code: req.body.code })

  if (!coupon || coupon.used) {
    return res.status(400).json({ error: 'Invalid coupon' })
  }

  // RACE WINDOW: Another request can pass the check above
  await applyDiscount(req.user, coupon.discount)
  coupon.used = true
  await coupon.save()

  res.json({ success: true })
})
```

### The Problem
1. AI doesn't think about concurrent requests
2. await points create race windows
3. No database transactions or locking
4. "It works" in testing (single user)

### What AI Should Generate
```javascript
// SECURE: Atomic operation with database constraint
app.post('/redeem', async (req, res) => {
  const result = await db.transaction(async (tx) => {
    const coupon = await tx.coupon.update({
      where: {
        code: req.body.code,
        used: false  // Atomic check-and-set
      },
      data: { used: true }
    })

    if (!coupon) {
      throw new Error('Invalid or already used')
    }

    await tx.discount.create({
      data: { userId: req.user.id, amount: coupon.discount }
    })

    return coupon
  })

  res.json({ success: true })
})
```

---

## SEO Strategy

### Target Keywords

| Keyword | Search Intent | Priority |
|---------|---------------|----------|
| race condition vulnerability | informational | Primary |
| TOCTOU vulnerability | informational | Primary |
| race condition web application | informational | Secondary |
| CWE-362 | informational | Secondary |
| async race condition | informational | Tertiary |
| Node.js race condition | informational | Tertiary |

### People Also Ask (FAQs)

1. What is a race condition vulnerability?
2. How do attackers exploit race conditions?
3. How do I prevent race conditions in Node.js?
4. What is TOCTOU?
5. Are race conditions hard to detect?

### Competitive Gap

**Top results analysis:**
- PortSwigger: Excellent attack techniques, less on async patterns
- CWE/MITRE: Technical definitions, not developer-focused
- Academic papers: Too theoretical

**Our unique angle:**
- Async/await context: Modern JavaScript patterns
- AI tool patterns: Why generated code is vulnerable
- Practical fixes: Transactions, atomic operations
- Vibe coder audience: Simple explanations
- Real-world examples: Gift cards, rate limits

---

## Content Outline

### Quick Answer (50 words max)
Race conditions let attackers exploit timing gaps between checking a condition and acting on it. Send 10 requests simultaneously to redeem a gift card 10 times. AI generates async code without proper locking. Fix: use database transactions and atomic operations.

### Section 1: What is a Race Condition? (100-150 words)
- Plain English: Two operations racing to use the same resource
- The CHECK-USE gap
- Real-world analogy: Two people trying to book the last seat
- Why it matters: Financial fraud, privilege escalation
- CWE-362 and TOCTOU (CWE-367)

### Section 2: Attack Examples (200-250 words)

**Gift Card Attack:**
```
1. Attacker has $100 gift card
2. Opens 10 browser tabs
3. Clicks "Redeem" simultaneously in all tabs
4. All 10 requests pass "is valid" check
5. Gift card redeemed 10 times = $1000 credit
```

**Rate Limit Bypass:**
```
1. API allows 5 requests per minute
2. Attacker sends 100 requests simultaneously
3. All hit before rate limit counter updates
4. 100 requests processed instead of 5
```

**Account Takeover (Devise/GitLab Example):**
```
1. Request A: Change email to victim@email.com
2. Request B: Change email to attacker@email.com
3. Race condition: Confirmation token for victim sent to attacker
4. Attacker confirms victim's email, takes over account
```

### Section 3: Why AI Generates Vulnerable Code (150-200 words)
- AI focuses on functional correctness
- async/await creates natural race windows
- No concept of concurrent requests
- Database queries without transactions
- "It works" single-user testing passes
- Code comparison: AI output vs secure pattern

### Section 4: Vulnerable Code Patterns (200-250 words)

**Pattern 1: Check-Then-Act**
```javascript
// VULNERABLE: Gap between check and update
const user = await User.findById(id)
if (user.balance >= amount) {
  user.balance -= amount  // Race window!
  await user.save()
}
```

**Pattern 2: Non-Atomic Increment**
```javascript
// VULNERABLE: Read-modify-write race
const count = await Counter.findById(id)
count.value += 1
await count.save()  // Another request may have incremented
```

**Pattern 3: Optimistic Without Version Check**
```javascript
// VULNERABLE: No concurrency detection
const item = await Item.findById(id)
item.quantity -= 1
await item.save()  // May overwrite concurrent update
```

### Section 5: Secure Patterns (300-400 words)

**Fix 1: Database Transactions**
```javascript
// SECURE: Atomic transaction
await prisma.$transaction(async (tx) => {
  const user = await tx.user.findUnique({ where: { id } })
  if (user.balance < amount) throw new Error('Insufficient')

  await tx.user.update({
    where: { id },
    data: { balance: { decrement: amount } }
  })
})
```

**Fix 2: Atomic Update Operations**
```javascript
// SECURE: Single atomic operation
const result = await User.updateOne(
  { _id: id, balance: { $gte: amount } },  // Atomic check
  { $inc: { balance: -amount } }            // Atomic update
)
if (result.modifiedCount === 0) {
  throw new Error('Insufficient balance or user not found')
}
```

**Fix 3: Optimistic Locking**
```javascript
// SECURE: Version-based concurrency control
const user = await User.findById(id)
const result = await User.updateOne(
  { _id: id, version: user.version },  // Check version
  { $inc: { balance: -amount, version: 1 } }
)
if (result.modifiedCount === 0) {
  throw new Error('Concurrent modification detected')
}
```

**Fix 4: Pessimistic Locking (PostgreSQL)**
```sql
-- SECURE: Lock row during transaction
BEGIN;
SELECT * FROM users WHERE id = $1 FOR UPDATE;
UPDATE users SET balance = balance - $2 WHERE id = $1;
COMMIT;
```

**Fix 5: Unique Constraints**
```javascript
// SECURE: Database enforces uniqueness
await Redemption.create({
  couponCode: code,  // Unique constraint prevents duplicates
  userId: user.id
})
```

### Section 6: AI Fix Prompt (200-300 words)
```
Review my codebase for Race Condition vulnerabilities (CWE-362):

## Check 1: Check-Then-Act Patterns
Search for:
- if (condition) { ...await update... }
- Finding a record, checking a value, then updating
- Balance/inventory/limit checks before modifications

Flag: Any gap between validation and state change

## Check 2: Non-Atomic Operations
Look for:
- Read → Modify → Write patterns
- Incrementing/decrementing without atomic operators
- Multiple database calls that should be one transaction

## Check 3: Missing Transactions
For operations that must be atomic:
- Are they wrapped in database transactions?
- Do they use atomic update operators ($inc, increment)?
- Is optimistic/pessimistic locking implemented?

## Check 4: Rate Limiting Implementation
If rate limiting exists:
- Is the counter updated atomically?
- Can concurrent requests bypass the limit?
- Is Redis INCR or similar atomic operation used?

## Secure Patterns to Recommend

For balance/inventory:
- Use atomic decrement: { $inc: { balance: -amount } }
- Add condition in WHERE: WHERE balance >= amount

For unique operations:
- Add database unique constraints
- Let constraint violation signal duplicate

For multi-step operations:
- Wrap in database transaction
- Use SELECT FOR UPDATE for pessimistic locking

For each vulnerability:
- Show the race window in the code
- Explain the attack scenario
- Provide atomic replacement pattern
```

### Section 7: Testing for Race Conditions (100-150 words)
- Manual: Multiple browser tabs, rapid clicking
- Automated: Burp Suite Turbo Intruder
- Single-packet attack technique (HTTP/2)
- Stress testing with concurrent threads
- Insert artificial delays to widen race window

### Section 8: FAQ (5 questions, 50-100 words each)
- Use PAA questions above

### Section 9: Related Content
- Link to IDOR (related to access control)
- Link to missing rate limiting
- Link to broken access control

---

## Internal Links (7-10 required)

| Anchor Text | URL | Context/Placement |
|-------------|-----|-------------------|
| missing rate limiting | /kb/security/vulnerabilities/missing-rate-limiting/ | Rate limit bypass |
| broken access control | /kb/security/vulnerabilities/broken-access-control/ | Privilege escalation |
| IDOR | /kb/security/vulnerabilities/idor/ | Related access issues |
| JWT vulnerabilities | /kb/security/vulnerabilities/jwt-vulnerabilities/ | Session race conditions |
| Next.js + Supabase security | /kb/security/stacks/nextjs-supabase/ | Transaction patterns |
| Cursor security patterns | /kb/vibe-coding-tools/cursor/ | AI tool context |
| Claude Code security patterns | /kb/vibe-coding-tools/claude-code/ | AI tool context |

---

## External Links (10-12 required)

| Anchor Text | URL | Tier | Placement |
|-------------|-----|------|-----------|
| CWE-362: Race Condition | https://cwe.mitre.org/data/definitions/362.html | 1 | Intro |
| CWE-367: TOCTOU | https://cwe.mitre.org/data/definitions/367.html | 1 | TOCTOU section |
| OWASP A04:2021 Insecure Design | https://owasp.org/Top10/A04_2021-Insecure_Design/ | 1 | Intro |
| PortSwigger Race Conditions | https://portswigger.net/web-security/race-conditions | 2 | Attack techniques |
| PortSwigger Smashing the State Machine | https://portswigger.net/research/smashing-the-state-machine | 2 | Research |
| Prisma Transactions | https://www.prisma.io/docs/concepts/components/prisma-client/transactions | 6 | Fix section |
| MongoDB Atomic Operations | https://www.mongodb.com/docs/manual/core/write-operations-atomicity/ | 6 | Fix section |
| PostgreSQL FOR UPDATE | https://www.postgresql.org/docs/current/sql-select.html#SQL-FOR-UPDATE-SHARE | 6 | Locking section |

---

## Notes for Writer Agent

### Tone Guidance
- **Practical focus:** This is about async code patterns
- **Real-world examples:** Gift cards, rate limits resonate
- **Modern stack:** Focus on JavaScript async/await, not C threads
- **Fixable:** Show concrete transaction patterns

### Technical Accuracy
- Race conditions are hard to reproduce deterministically
- Database transactions are the primary defense
- Atomic operations (MongoDB $inc, SQL UPDATE with conditions) are key
- Optimistic locking uses version fields
- Pessimistic locking uses SELECT FOR UPDATE
- Single-packet attack is a real advanced technique

### Things to Avoid
- Don't overcomplicate with low-level threading concepts
- Don't suggest all async code is dangerous
- Don't forget database-level solutions
- Don't make it seem impossible to fix

### Vibe Coding Terms
Use these 3-5 times naturally:
- vibe coding / vibe coders
- AI-generated code
- vibe coded apps

### Value Maximizers
- Gift card/rate limit examples (relatable)
- async/await focus (modern JavaScript)
- Prisma transaction example (common ORM)
- MongoDB atomic operations
- AI fix prompt for code review
- Real CVEs (CVE-2024-50379, CVE-2025-68146)

---

## Checklist Before Marking READY

- [x] All external links verified working
- [x] CWE/OWASP references correct (CWE-362, A04:2021)
- [x] 7 internal links identified
- [x] 5 PAA questions included
- [x] Competitive gap is specific
- [x] Multiple fix patterns (transactions, atomic ops, locking)
- [x] Real-world attack examples
- [x] AI fix prompt included
- [x] Recent CVEs included

---

**Brief Status:** READY for Writer Agent
