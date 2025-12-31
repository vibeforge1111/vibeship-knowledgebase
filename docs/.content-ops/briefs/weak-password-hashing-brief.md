# Content Brief: Weak Password Hashing

**Generated:** 2025-12-17
**Target Publish:** TBD
**Priority:** P0
**Status:** Ready for Writer

---

## 1. Core Data

### Scanner Statistics
| Metric | Value | Source |
|--------|-------|--------|
| Prevalence | Data coming soon | Scanner DB (when available) |
| Repos Scanned | TBD | Scanner DB (when available) |
| Week-over-Week | TBD | Scanner DB (when available) |
| Most Affected Tool | TBD | Scanner DB (when available) |

**Note:** Scanner data is actively being collected. Article will use established external sources until our data is available.

### Tool Breakdown
Data coming soon. Expected pattern based on research: AI tools frequently suggest MD5/SHA256 for password hashing because these are commonly documented hash functions, not because they're secure for passwords.

### Security References
- **CWE ID:** CWE-328, CWE-916
- **CWE-328 Name:** Use of Weak Hash
- **CWE-916 Name:** Use of Password Hash With Insufficient Computational Effort
- **OWASP Category:** A02:2021 - Cryptographic Failures
- **Severity:** Critical
- **CVSS Range:** 7.5-9.8 (depending on exposure)

### External Data Sources

**OWASP References:**
- [OWASP Top 10 A02:2021 - Cryptographic Failures](https://owasp.org/Top10/A02_2021-Cryptographic_Failures/)
- [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)

**CWE References:**
- [CWE-328: Use of Weak Hash](https://cwe.mitre.org/data/definitions/328.html)
- [CWE-916: Use of Password Hash With Insufficient Computational Effort](https://cwe.mitre.org/data/definitions/916.html)

**Industry Research:**
- [Security Boulevard - Comparative Analysis of Password Hashing Algorithms](https://securityboulevard.com/2024/07/comparative-analysis-of-password-hashing-algorithms-argon2-bcrypt-scrypt-and-pbkdf2/)
- [Bellator Cyber - Best Password Hashing Algorithms 2025](https://bellatorcyber.com/blog/best-password-hashing-algorithms-of-2023/)
- [Stytch - Argon2 vs bcrypt vs scrypt](https://stytch.com/blog/argon2-vs-bcrypt-vs-scrypt/)

---

## 2. SEO Strategy

### Target Keywords
| Keyword | Intent | Priority |
|---------|--------|----------|
| weak password hashing | Informational | Primary |
| bcrypt vs argon2 | Informational | Secondary |
| password hashing best practices | Informational | Secondary |
| MD5 password hashing vulnerable | Informational | Secondary |
| secure password storage | Informational | Secondary |
| password hashing algorithms | Informational | Tertiary |
| argon2id vs bcrypt | Informational | Tertiary |

### People Also Ask (Inferred from Research)
1. "What is weak password hashing?"
2. "Why is MD5 bad for passwords?"
3. "Should I use bcrypt or Argon2?"
4. "What is the best password hashing algorithm?"
5. "How do rainbow table attacks work?"
6. "What bcrypt cost factor should I use?"
7. "Is SHA-256 secure for password hashing?"

### Search Intent Analysis
- **Primary intent:** Informational - developers discovering their hashing is insecure
- **User goal:** Understand what makes password hashing weak and how to fix it
- **Content need:**
  - Clear explanation of weak vs strong hashing
  - Why AI tools generate weak patterns
  - Copy-paste solutions for modern algorithms
  - Migration strategy from weak to strong hashing

---

## 3. Competitive Analysis

### Current Top Results for "weak password hashing"

**1. [CWE-328: Use of Weak Hash](https://cwe.mitre.org/data/definitions/328.html)**
- Title: CWE-328: Use of Weak Hash
- Authority: MITRE CWE Database
- Strengths:
  - Authoritative technical definition
  - Clear examples of weak algorithms
  - Links to related CWEs
- Weaknesses:
  - Very technical, not beginner-friendly
  - No AI tool context
  - No modern framework examples
  - No practical migration guides
- **Our advantage:** Plain English explanations, AI tool patterns, copy-paste fixes

**2. [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)**
- Title: Password Storage - OWASP Cheat Sheet Series
- Authority: OWASP Foundation
- Strengths:
  - Comprehensive best practices
  - Algorithm recommendations with parameters
  - Salt and pepper guidance
- Weaknesses:
  - Dense technical format
  - No AI tool context
  - Doesn't explain WHY AI generates weak patterns
  - No before/after code examples
- **Our advantage:** AI-specific patterns, tool comparison, beginner-friendly

**3. [Ubiq Security - Exploring CWE-328](https://www.ubiqsecurity.com/exploring-cwe-328-use-of-a-weak-hash/)**
- Title: Exploring CWE-328 Use of a Weak Hash
- Word count: ~1,200
- Strengths:
  - Good technical explanation
  - Examples of weak algorithms
  - Real-world context
- Weaknesses:
  - No AI tool angle
  - Limited code examples
  - No comparison of modern algorithms
  - No migration guidance
- **Our advantage:** Vibe coding context, Scanner data, AI fix prompts

**4. [Auth0 Blog - Understanding bcrypt](https://auth0.com/blog/hashing-in-action-understanding-bcrypt/)**
- Title: Hashing in Action: Understanding bcrypt
- Strengths:
  - Great technical deep-dive on bcrypt
  - Explains salting clearly
  - Good diagrams
- Weaknesses:
  - Only covers bcrypt (no Argon2)
  - No weak hashing comparison
  - No AI tool context
- **Our advantage:** Multi-algorithm comparison, AI patterns, modern recommendations

### Content Gaps (Our Opportunities)
1. **AI Tool Patterns:** No competitor explains WHY AI tools default to MD5/SHA256 for passwords
2. **Vibe Coding Context:** Nobody connects weak hashing to AI-generated code specifically
3. **Tool Comparison Data:** No site compares which AI tools generate weak hashing most often (our future Scanner data)
4. **GPU Cracking Speeds:** Most sites mention speed differences but don't quantify them dramatically (MD5: billions/sec vs bcrypt: thousands/sec)
5. **Migration Path:** Limited guidance on migrating from weak to strong hashing without breaking existing passwords
6. **Cost Factor Guidance:** bcrypt cost factor recommendations exist but aren't emphasized enough (2024 recommendation: 12-14)

---

## 4. Content Structure

### Recommended Sections

```
H1: Weak Password Hashing: MD5, SHA1, and AI Defaults

Quick Answer Box (under 50 words):
Weak password hashing uses fast algorithms like MD5 or SHA1 that attackers can crack
in seconds. Modern password storage requires slow, memory-hard algorithms like Argon2id
or bcrypt. Ranked #2 in OWASP Top 10 under Cryptographic Failures.

H2: What is Weak Password Hashing?
    - Definition: Using fast hash functions (MD5, SHA1, SHA256) for passwords
    - Why it matters: Makes brute-force attacks trivial
    - Real-world analogy: Using a diary lock on a bank vault
    Target: 100-150 words

    Key points:
    - Hash functions designed for speed are the problem
    - MD5 considered broken since 2005
    - SHA1 collision attacks demonstrated 2017
    - Even SHA256 is too fast without work factor

H2: Why AI Tools Generate Weak Password Hashing
    - AI trained on general hashing examples, not password-specific
    - crypto.createHash('md5') is simpler than bcrypt setup
    - hashlib.md5() appears in many tutorials
    - AI doesn't distinguish "hashing" from "password hashing"
    Target: 150-200 words

    Vulnerable patterns AI generates:
    ```javascript
    // Pattern 1: MD5
    const crypto = require('crypto');
    const hash = crypto.createHash('md5').update(password).digest('hex');

    // Pattern 2: SHA256 without salt
    const hash = crypto.createHash('sha256').update(password).digest('hex');

    // Pattern 3: Python hashlib
    import hashlib
    hash = hashlib.md5(password.encode()).hexdigest()

    // Pattern 4: bcrypt with cost too low
    const hash = await bcrypt.hash(password, 4);  // Should be 12+
    ```

H2: The Attack: How Weak Hashing Gets Cracked
    H3: GPU Cracking Speed Comparison
    - MD5: ~150-170 billion hashes/second (RTX 4090)
    - SHA1: ~50-60 billion hashes/second
    - SHA256: ~20-25 billion hashes/second
    - bcrypt (cost 12): ~1,500 hashes/second
    - Argon2id: Even slower, memory-hard

    "bcrypt is roughly 10 million times slower to crack than MD5"

    H3: Rainbow Table Attacks
    - Pre-computed hash tables for common passwords
    - Millions of leaked hashes on dark web
    - Explains why salting is critical
    Target: 150-200 words total

H2: How to Detect Weak Password Hashing
    Code patterns to search for:
    - crypto.createHash('md5')
    - crypto.createHash('sha1')
    - crypto.createHash('sha256') near "password"
    - hashlib.md5() or hashlib.sha1()
    - bcrypt with cost < 12

    Grep patterns:
    ```bash
    # Find MD5/SHA1 usage
    rg "createHash\('(md5|sha1)'\)"
    rg "hashlib\.(md5|sha1)\("

    # Find SHA256 near password
    rg "password.*sha256|sha256.*password"

    # Find low bcrypt cost
    rg "bcrypt\.hash.*,\s*[0-9]\s*\)" --pcre2
    ```

    Scanner CTA: "Run VibeShip Scanner to detect weak password hashing across your codebase"
    Target: 100-150 words

H2: How to Fix Weak Password Hashing
    H3: AI Fix Prompt
        Complete prompt (200-400 words):
        ```
        I need to upgrade my password hashing from [MD5/SHA1/SHA256] to a secure algorithm.

        Requirements:
        1. Use Argon2id (preferred) or bcrypt as the hashing algorithm
        2. For Argon2id: Use minimum 19 MiB memory, 2 iterations, 1 parallelism
        3. For bcrypt: Use cost factor of 12 or higher (13-14 for high security)
        4. Generate a unique salt for each password automatically
        5. Store the salt with the hash (algorithms handle this by default)
        6. Ensure backward compatibility: when users log in, check old hash format first,
           then rehash with new algorithm on successful login
        7. NEVER truncate passwords before hashing
        8. Use timing-safe comparison for password verification

        Current vulnerable code:
        [PASTE YOUR CODE HERE]

        Framework: [Next.js/Express/Django/etc.]
        Language: [JavaScript/TypeScript/Python/etc.]
        Database: [PostgreSQL/MongoDB/etc.]

        Provide:
        1. Complete implementation with error handling
        2. Migration strategy to upgrade existing password hashes
        3. Unit tests for the new implementation
        4. Comments explaining the security improvements
        ```

    H3: Manual Fix - Node.js/JavaScript
        Before/After with Argon2id:
        ```javascript
        // ❌ VULNERABLE - MD5
        const crypto = require('crypto');
        const hash = crypto.createHash('md5')
          .update(password)
          .digest('hex');

        // ✅ SECURE - Argon2id
        const argon2 = require('argon2');

        async function hashPassword(password) {
          return await argon2.hash(password, {
            type: argon2.argon2id,
            memoryCost: 19456, // 19 MiB
            timeCost: 2,
            parallelism: 1
          });
        }

        async function verifyPassword(password, hash) {
          try {
            return await argon2.verify(hash, password);
          } catch (err) {
            return false;
          }
        }
        ```

        Before/After with bcrypt:
        ```javascript
        // ❌ VULNERABLE - SHA256
        const crypto = require('crypto');
        const hash = crypto.createHash('sha256')
          .update(password)
          .digest('hex');

        // ✅ SECURE - bcrypt
        const bcrypt = require('bcrypt');
        const SALT_ROUNDS = 12; // Adjust based on your server performance

        async function hashPassword(password) {
          return await bcrypt.hash(password, SALT_ROUNDS);
        }

        async function verifyPassword(password, hash) {
          return await bcrypt.compare(password, hash);
        }
        ```

        Target: 200-300 words with explanation

    H3: Manual Fix - Python
        ```python
        # ❌ VULNERABLE - MD5
        import hashlib
        hash = hashlib.md5(password.encode()).hexdigest()

        # ✅ SECURE - Argon2id (using argon2-cffi)
        from argon2 import PasswordHasher

        ph = PasswordHasher(
            time_cost=2,
            memory_cost=19456,  # 19 MiB
            parallelism=1,
            hash_len=32,
            salt_len=16,
            type=Type.ID  # Argon2id
        )

        # Hash password
        hash = ph.hash(password)

        # Verify password
        try:
            ph.verify(hash, password)
            # Password correct
        except:
            # Password incorrect
            pass
        ```
        Target: 150-200 words

    H3: Migration Strategy
        How to upgrade existing passwords:
        1. Don't immediately break old hashes
        2. Detect hash format (MD5 is 32 hex chars, bcrypt starts with $2, etc.)
        3. On successful login with old hash, rehash with new algorithm
        4. Store algorithm identifier in database
        5. Set deadline for users to log in (force password reset after)

        Target: 100-150 words

    H3: Framework-Specific Guidance
        - Next.js + Supabase: Use Supabase Auth (handles hashing)
        - Next.js + Prisma: Use bcrypt/argon2 middleware
        - Express: Use passport-local with bcrypt/argon2
        - Django: Settings.py PASSWORD_HASHERS (uses PBKDF2 by default, upgrade to Argon2)
        - Rails: has_secure_password uses bcrypt by default

        Links to framework security docs
        Target: 100 words

H2: Bcrypt vs Argon2: Which Should You Use?
    Quick comparison table:
    | Feature | bcrypt | Argon2id |
    |---------|--------|----------|
    | **Status** | Legacy, still secure | Modern, recommended |
    | **Memory Usage** | 4KB | Configurable (19MB+ recommended) |
    | **GPU Resistance** | Good | Excellent |
    | **Password Limit** | 72 bytes | None |
    | **Recommendation** | Legacy systems | New projects |

    Use Argon2id for new projects. bcrypt is acceptable for existing systems with cost 12+.
    Target: 100-150 words

H2: FAQ
    Q1: Is MD5 ever safe for passwords?
    A: No. MD5 has been broken since 2005 and should never be used for password storage.
    Modern GPUs can compute billions of MD5 hashes per second, making brute-force attacks trivial.

    Q2: What about SHA-256? Isn't it secure?
    A: SHA-256 is cryptographically secure for data integrity, but too fast for passwords.
    Without a work factor, attackers can still compute millions of hashes per second. Use
    Argon2id or bcrypt instead.

    Q3: What bcrypt cost factor should I use in 2024?
    A: Minimum cost factor 12, with 13-14 recommended for high-security applications.
    According to OWASP, aim for 250-500ms computation time. Test on your hardware and
    adjust accordingly.

    Q4: Do I need to store the salt separately?
    A: No. Both bcrypt and Argon2 store the salt within the hash string itself. The salt
    is automatically generated and verified during password comparison.

    Q5: How do I migrate from MD5 to Argon2 without breaking existing passwords?
    A: Implement hybrid verification: detect the hash format, verify against old algorithm,
    and rehash with new algorithm on successful login. This gradually upgrades your database
    without forcing password resets.

    Q6: Why does my AI tool generate MD5 for passwords?
    A: AI models are trained on general programming examples where MD5 is commonly used for
    checksums and data integrity. They don't distinguish between general hashing and
    password-specific hashing without explicit guidance.

    Q7: Is PBKDF2 a good choice?
    A: PBKDF2 is acceptable if you need FIPS-140 compliance, but Argon2id is generally
    preferred. If using PBKDF2, OWASP recommends 600,000+ iterations with HMAC-SHA-256.

H2: Related Vulnerabilities
    - Hardcoded Secrets: Storing passwords in plaintext
    - Insufficient Entropy: Weak password requirements
    - Hardcoded Crypto Keys: Using fixed salts

    Links to related articles

H2: Prevention Checklist
    - [ ] Use Argon2id or bcrypt (cost 12+) for all password hashing
    - [ ] Never use MD5, SHA1, or unsalted SHA-256 for passwords
    - [ ] Generate unique salts automatically (algorithms handle this)
    - [ ] Store algorithm identifier with hash for future upgrades
    - [ ] Test hash computation time (target 250-500ms)
    - [ ] Implement timing-safe password comparison
    - [ ] Plan migration strategy for existing weak hashes
    - [ ] Add password hashing checks to CI/CD pipeline
    - [ ] Use VibeShip Scanner to detect weak hashing patterns
```

### Required Elements Checklist
- [x] Quick answer in first 50 words
- [x] Stats box with external sources (Scanner data coming soon)
- [x] GPU cracking speed comparison
- [x] Complete AI fix prompt (200-400 words)
- [x] Before/after code examples (Node.js, Python)
- [x] 7 FAQ entries matching PAA
- [x] Scanner CTA
- [x] 5-10 internal links planned
- [x] CWE/OWASP references (CWE-328, CWE-916, OWASP A02:2021)

---

## 5. Internal Linking

### Must Link TO (Parent/Authority Pages)
| Page | Suggested Anchor Text |
|------|----------------------|
| /kb/security/vulnerabilities/ | "security vulnerabilities in AI-generated code" |
| /kb/vibe-coding-tools/cursor/ | "Cursor security patterns" |
| /kb/vibe-coding-tools/claude-code/ | "Claude Code security" |
| /kb/vibe-coding-tools/bolt/ | "Bolt security considerations" |
| /kb/security/stacks/nextjs-supabase/ | "Next.js + Supabase security" |

### Should Link TO (Related Content)
| Page | Suggested Anchor Text |
|------|----------------------|
| /kb/security/vulnerabilities/hardcoded-secrets/ | "hardcoded secrets" |
| /kb/security/vulnerabilities/missing-auth/ | "missing authentication" |
| /kb/security/vulnerabilities/sensitive-data-exposure/ | "sensitive data exposure" |
| /kb/glossary/security/hashing/ | "password hashing" (if glossary exists) |
| /kb/glossary/security/salt/ | "salt" (if glossary exists) |
| /kb/glossary/security/rainbow-table/ | "rainbow table attacks" (if glossary exists) |

### External Authority Links (REQUIRED)
| Source | Purpose | URL |
|--------|---------|-----|
| OWASP A02:2021 | Primary OWASP reference | https://owasp.org/Top10/A02_2021-Cryptographic_Failures/ |
| OWASP Password Storage | Best practices cheat sheet | https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html |
| CWE-328 | Weak hash definition | https://cwe.mitre.org/data/definitions/328.html |
| CWE-916 | Insufficient computational effort | https://cwe.mitre.org/data/definitions/916.html |
| Security Boulevard Analysis | Algorithm comparison | https://securityboulevard.com/2024/07/comparative-analysis-of-password-hashing-algorithms-argon2-bcrypt-scrypt-and-pbkdf2/ |
| Stytch Blog | Argon2 vs bcrypt comparison | https://stytch.com/blog/argon2-vs-bcrypt-vs-scrypt/ |
| Auth0 Blog | bcrypt deep-dive | https://auth0.com/blog/hashing-in-action-understanding-bcrypt/ |
| Beyond Identity | Rainbow table attacks | https://www.beyondidentity.com/glossary/rainbow-table-attack |
| CAPEC-55 | Rainbow table attack pattern | https://capec.mitre.org/data/definitions/55.html |

### Tool-Specific Links (if articles exist)
- Cursor docs: https://cursor.com
- Claude Code docs: https://claude.ai/code
- Bolt: https://bolt.new
- v0: https://v0.dev
- Replit: https://replit.com

---

## 6. Unique Angle

### Our Differentiator
**AI tools consistently generate weak password hashing because they're trained on general hashing examples (checksums, data integrity) rather than password-specific security patterns.** This is a perfect example of AI generating "working code" that's fundamentally insecure.

When developers prompt "create a user registration system," AI tools default to simple hash functions like MD5 or SHA256 because:
1. These appear more frequently in training data
2. They're simpler to implement (no library configuration)
3. AI doesn't understand the security context difference between hashing and password hashing

### Key Message
**Fast hash functions (MD5, SHA1, SHA256) are for data integrity, not passwords. Password storage requires SLOW, memory-hard algorithms specifically designed to resist brute-force attacks.**

### Data-Driven Claims to Highlight
1. "MD5 has been considered vulnerable since 2005" (CWE-328)
2. "Modern GPUs can compute 150+ billion MD5 hashes per second, but only ~1,500 bcrypt hashes per second" (hashcat benchmarks)
3. "Argon2 was the winner of the 2015 Password Hashing Competition" (OWASP)
4. "OWASP recommends Argon2id with minimum 19 MiB memory, 2 iterations, 1 parallelism" (OWASP Password Storage Cheat Sheet)
5. "bcrypt should use cost factor 12 or higher in 2024 for 250-500ms computation time" (OWASP recommendations)
6. "Rainbow tables with millions of pre-computed hashes are available on the dark web" (Multiple security sources)

---

## 7. Meta Information

### Suggested Title Tag (under 60 chars)
```
Weak Password Hashing: MD5, SHA1 & AI Defaults | VibeShip
```
(59 characters)

Alternative:
```
Password Hashing: Fix MD5 & SHA1 in AI Code | VibeShip
```
(56 characters)

### Suggested Meta Description (150-160 chars)
```
Weak password hashing with MD5 or SHA1 lets attackers crack passwords in seconds. Learn why AI tools generate this and how to upgrade to Argon2id or bcrypt.
```
(159 characters)

### Target URL
```
/kb/security/vulnerabilities/weak-password-hashing/
```

### Related URLs to Create (Future)
- /kb/security/fixes/weak-password-hashing/nextjs/
- /kb/security/fixes/weak-password-hashing/express/
- /kb/security/fixes/weak-password-hashing/django/
- /kb/security/fixes/weak-password-hashing/flask/
- /kb/vibe-coding-tools/cursor/weak-password-hashing/
- /kb/glossary/security/argon2/
- /kb/glossary/security/bcrypt/
- /kb/glossary/security/rainbow-table/

---

## 8. Writer Notes

### Tone Guidance
This vulnerability is critical but very common. Don't be alarmist, but emphasize that:
- MD5/SHA1 are completely broken for passwords (not debatable)
- Even SHA256 is too fast without proper work factor
- The fix is straightforward (use the right algorithm)
- Migration can be done gradually without breaking existing users

**Avoid:** Making readers feel dumb for using MD5 if AI suggested it
**Emphasize:** This is a systemic AI training issue, not developer incompetence

### Technical Accuracy Notes
1. **bcrypt 72-byte limit:** bcrypt only uses first 72 bytes of password. Mention this as a limitation vs Argon2.
2. **Salt storage:** Both bcrypt and Argon2 store salt in the hash string itself. Writers don't need separate salt storage.
3. **Cost factor timing:** Aim for 250-500ms per hash. Too fast = weak security, too slow = DOS risk.
4. **Argon2 variants:** Three types exist (Argon2i, Argon2d, Argon2id). Argon2id is recommended as it's hybrid.
5. **PBKDF2:** Acceptable for FIPS compliance but not preferred. If mentioned, recommend 600,000+ iterations with SHA-256.

### Things to Avoid
1. **Don't recommend SHA-256 with manual salting** - It's better than nothing but still too fast
2. **Don't suggest scrypt over Argon2** - Argon2 is newer and won the Password Hashing Competition
3. **Don't recommend cost factor below 12 for bcrypt** - 10 is OWASP minimum but outdated for 2024
4. **Don't use "encryption" and "hashing" interchangeably** - Hashing is one-way, encryption is two-way
5. **Don't say "salting makes MD5 safe"** - Salting helps but MD5 is fundamentally broken
6. **Don't recommend rolling your own crypto** - Use established libraries only

### Common Misconceptions to Address
1. **"SHA-256 is secure, so it's fine for passwords"** → SHA-256 is secure for integrity but too fast for passwords
2. **"I added a salt so MD5 is safe now"** → Salting prevents rainbow tables but doesn't slow down GPU cracking
3. **"My passwords are strong so weak hashing doesn't matter"** → Even strong passwords fall to weak hashing given enough time
4. **"bcrypt is old/deprecated"** → bcrypt is legacy but still secure with proper cost factor. Argon2 is just better.
5. **"I can just encrypt the password instead of hashing"** → Encryption is reversible, hashing is not. Passwords must be hashed.

### Reference Materials
The writer should consult:
1. [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html) - Primary reference for recommendations
2. [CWE-328](https://cwe.mitre.org/data/definitions/328.html) - Technical definition
3. [CWE-916](https://cwe.mitre.org/data/definitions/916.html) - Insufficient computational effort
4. [Stytch - Argon2 vs bcrypt](https://stytch.com/blog/argon2-vs-bcrypt-vs-scrypt/) - Modern comparison
5. [Security Boulevard Analysis](https://securityboulevard.com/2024/07/comparative-analysis-of-password-hashing-algorithms-argon2-bcrypt-scrypt-and-pbkdf2/) - 2024 recommendations

### Real-World Examples to Consider
If available, include:
- CVE-2021-39182 (EnroCrypt library supported MD5 for passwords)
- Any major breach attributed to weak password hashing
- LinkedIn 2012 breach (SHA1 without salt)
- Ashley Madison 2015 (bcrypt but also MD5 for legacy accounts)

---

## 9. Code Examples Summary

### Vulnerable Patterns (For Detection Section)

**JavaScript/Node.js:**
```javascript
// Pattern 1: MD5
const crypto = require('crypto');
const hash = crypto.createHash('md5').update(password).digest('hex');

// Pattern 2: SHA1
const hash = crypto.createHash('sha1').update(password).digest('hex');

// Pattern 3: SHA256 without salt/work factor
const hash = crypto.createHash('sha256').update(password).digest('hex');

// Pattern 4: SHA256 with static salt (still too fast)
const hash = crypto.createHash('sha256').update(password + 'STATIC_SALT').digest('hex');

// Pattern 5: bcrypt with cost too low
const hash = await bcrypt.hash(password, 4); // Should be 12+
```

**Python:**
```python
# Pattern 1: MD5
import hashlib
hash = hashlib.md5(password.encode()).hexdigest()

# Pattern 2: SHA1
hash = hashlib.sha1(password.encode()).hexdigest()

# Pattern 3: SHA256 without salt
hash = hashlib.sha256(password.encode()).hexdigest()

# Pattern 4: SHA256 with static salt
hash = hashlib.sha256((password + "STATIC_SALT").encode()).hexdigest()
```

### Secure Patterns (For Fix Section)

**Node.js - Argon2id (Preferred):**
```javascript
const argon2 = require('argon2');

// Hash password
async function hashPassword(password) {
  return await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 19456, // 19 MiB
    timeCost: 2,
    parallelism: 1
  });
}

// Verify password
async function verifyPassword(password, hash) {
  try {
    return await argon2.verify(hash, password);
  } catch (err) {
    return false;
  }
}
```

**Node.js - bcrypt (Legacy but acceptable):**
```javascript
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 12; // 2024 minimum

// Hash password
async function hashPassword(password) {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

// Verify password
async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}
```

**Python - Argon2id:**
```python
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError

ph = PasswordHasher(
    time_cost=2,
    memory_cost=19456,  # 19 MiB
    parallelism=1,
    hash_len=32,
    salt_len=16
)

# Hash password
hash = ph.hash(password)

# Verify password
try:
    ph.verify(hash, password)
    # Password correct
except VerifyMismatchError:
    # Password incorrect
    pass
```

**Python - bcrypt:**
```python
import bcrypt

# Hash password
salt = bcrypt.gensalt(rounds=12)  # 2024 minimum
hash = bcrypt.hashpw(password.encode(), salt)

# Verify password
is_valid = bcrypt.checkpw(password.encode(), hash)
```

---

## 10. Visual Elements to Include

### Suggested Comparison Table: GPU Cracking Speeds
| Algorithm | Hashes/Second (RTX 4090) | Time to Crack 8-char Password |
|-----------|-------------------------|-------------------------------|
| MD5 | ~170 billion | Seconds |
| SHA1 | ~60 billion | Seconds |
| SHA-256 | ~25 billion | Minutes |
| bcrypt (cost 12) | ~1,500 | Months-Years |
| Argon2id | ~500-1,000 | Years |

*Note: Estimates based on hashcat benchmarks. Actual speeds vary by GPU and password complexity.*

### Suggested Comparison Table: Algorithm Recommendations
| Algorithm | Status | Memory Usage | Recommendation |
|-----------|--------|--------------|----------------|
| MD5 | ❌ Broken | Minimal | Never use |
| SHA1 | ❌ Broken | Minimal | Never use |
| SHA-256 | ❌ Too fast | Minimal | Never use alone |
| PBKDF2 | ⚠️ Acceptable | Minimal | FIPS compliance only |
| bcrypt | ✅ Secure | 4KB | Legacy systems (cost 12+) |
| scrypt | ✅ Secure | Configurable | Alternative to bcrypt |
| Argon2id | ✅ Best | Configurable | **Recommended for new projects** |

### Suggested Tool Pattern Comparison (Placeholder for Scanner Data)
| Tool | Likely Uses Weak Hashing | Common Pattern | Notes |
|------|-------------------------|----------------|-------|
| Cursor | TBD (Scanner data coming) | crypto.createHash('sha256') | Based on research patterns |
| Bolt | TBD | hashlib.md5() | Based on research patterns |
| Claude Code | TBD | crypto.createHash('md5') | Based on research patterns |
| v0 | TBD | crypto.createHash('sha256') | Based on research patterns |
| Copilot | TBD | Mixed MD5/SHA256 | Based on research patterns |

*Scanner data will replace these placeholders when available.*

---

## 11. Research Summary

### Key Findings from Research

1. **OWASP Hierarchy (2024):**
   - **Tier 1:** Argon2id (preferred)
   - **Tier 2:** scrypt
   - **Tier 3:** bcrypt (legacy, cost 10+ minimum)
   - **Tier 4:** PBKDF2 (FIPS compliance only, 600k+ iterations)
   - **Never:** MD5, SHA1, unsalted SHA-256

2. **Argon2id Parameters (OWASP):**
   - Memory: Minimum 19 MiB, recommended 128 MiB for high security
   - Time cost: Minimum 2 iterations, 3-5 for high security
   - Parallelism: 1 (minimum)

3. **bcrypt Cost Factor (2024 Consensus):**
   - Minimum: 10 (OWASP baseline, considered low)
   - Recommended: 12 (standard for 2024)
   - High security: 13-14 (250-500ms computation time)
   - Rule of thumb: Aim for "less than a second" but as slow as tolerable

4. **GPU Cracking Reality:**
   - MD5: 150-170 billion H/s on RTX 4090
   - bcrypt (cost 12): ~1,500 H/s on RTX 4090
   - **Ratio: bcrypt is ~100 million times slower than MD5**

5. **Rainbow Table Attacks:**
   - Pre-computed tables exist for billions of common passwords
   - Effective against unsalted hashes
   - "Millions of leaked password hashes available on dark web" (multiple sources)
   - Salting prevents rainbow tables but doesn't slow GPU cracking

6. **AI Tool Patterns (Qualitative):**
   - AI tools suggest MD5/SHA256 because these are common in training data
   - `crypto.createHash()` and `hashlib` appear frequently in tutorials
   - AI doesn't distinguish "hashing for integrity" vs "hashing for passwords"
   - Developers need to explicitly request "secure password storage" to get bcrypt/argon2

7. **Historical Context:**
   - MD5: Considered broken since 2005
   - SHA1: Collision attack demonstrated 2017 (Google's SHAttered)
   - bcrypt: Released 1999, still secure with proper cost
   - Argon2: Won Password Hashing Competition 2015

8. **Real-World Vulnerabilities:**
   - CVE-2021-39182: EnroCrypt library supported MD5 for passwords
   - LinkedIn 2012: SHA1 without salt
   - Ashley Madison 2015: Mixed bcrypt and MD5

---

**Brief Status:** ✅ Complete - Ready for Writer Agent

**Writer Agent Instructions:**
Use this brief with the complete writer prompt from `docs/.content-ops/strategies/VIBESHIP-SECURITY-WRITER-AGENT-PROMPT.md`. Follow all data integrity rules: never fabricate statistics, use external sources with proper attribution, clearly label Scanner data as "coming soon" where applicable.
