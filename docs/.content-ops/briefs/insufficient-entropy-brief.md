# Content Brief: Insufficient Entropy

**Generated:** 2025-12-17
**Target Publish:** P0 (Immediate)
**Priority:** P0
**Status:** ✅ Complete - Ready for Writer

---

## 1. Core Data

### Scanner Statistics
| Metric | Value | Source |
|--------|-------|--------|
| Prevalence | Data pending | Scanner DB (to be collected) |
| Repos Scanned | Data pending | Scanner DB (to be collected) |
| Week-over-Week | Data pending | Scanner DB (to be collected) |
| Most Affected Tool | Data pending | Scanner DB (to be collected) |

**Note:** Until Scanner data is available, use external authoritative sources (OWASP, CWE, research papers) with proper attribution.

### Tool Breakdown (Estimated from AI Pattern Research)
| Tool | Vulnerability Pattern | Notes |
|------|-------------------|-------|
| Cursor | Common (Math.random for tokens) | Uses Math.random by default, prioritizes readable code |
| Bolt | Very Common (hardcoded + weak random) | Speed over security, generates "ready to run" code with weak tokens |
| Claude Code | Moderate (trusts user input) | Better than most but still generates Math.random without prompting |
| v0 | Common (client-side only) | UI-focused, misses server-side security |
| Replit | Common (dev patterns in prod) | Debug mode left on, weak random in production |
| Copilot | Moderate (outdated patterns) | Suggests MD5, propagates existing weak patterns |

### Security References
- **CWE ID:** [CWE-330](https://cwe.mitre.org/data/definitions/330.html)
- **CWE Name:** Use of Insufficiently Random Values
- **Related CWEs:**
  - [CWE-331](https://cwe.mitre.org/data/definitions/331.html): Insufficient Entropy
  - [CWE-335](https://cwe.mitre.org/data/definitions/335.html): Incorrect Usage of Seeds in PRNG
  - [CWE-336](https://cwe.mitre.org/data/definitions/336.html): Same Seed in PRNG
  - [CWE-337](https://cwe.mitre.org/data/definitions/337.html): Predictable Seed in PRNG
  - [CWE-338](https://cwe.mitre.org/data/definitions/338.html): Use of Cryptographically Weak PRNG
- **OWASP Category:** [A02:2021 - Cryptographic Failures](https://owasp.org/Top10/A02_2021-Cryptographic_Failures/)
- **OWASP 2025:** [A04:2025 - Cryptographic Failures](https://owasp.org/Top10/2025/A04_2025-Cryptographic_Failures/) (four of most common CWEs involve weak PRNG)
- **Severity:** High
- **CVSS Range:** 5.0-7.5 (depending on context)

---

## 2. SEO Strategy

### Target Keywords
| Keyword | Est. Volume | Difficulty | Intent |
|---------|-------------|------------|--------|
| insufficient entropy | 500 | Medium | Informational |
| weak random number generation | 800 | Medium | Informational |
| math.random security | 1,200 | Medium-High | Informational |
| cryptographically secure random | 600 | Medium | Informational |
| session token security | 2,400 | High | Informational |
| crypto.randomBytes vs Math.random | 300 | Low | Informational |
| UUID security | 900 | Medium | Informational |
| how to generate secure tokens | 1,800 | Medium | Transactional |

### People Also Ask
1. "Is Math.random() secure for session tokens?"
2. "What is insufficient entropy in cryptography?"
3. "How do I generate cryptographically secure random numbers in JavaScript?"
4. "What's the difference between Math.random and crypto.randomBytes?"
5. "How many bits of entropy do I need for a session token?"
6. "Is UUID v4 cryptographically secure?"
7. "Why is Math.random() predictable?"
8. "What is a CSPRNG?"

### Search Intent Analysis
- **Primary intent:** Informational (understand what weak random is, why it's dangerous)
- **Secondary intent:** Transactional (fix the vulnerability, implement secure random)
- **User goal:** Understand if their code has weak random generation and how to fix it
- **Content need:**
  - Clear explanation of entropy and randomness
  - Specific code examples showing Math.random() vs crypto alternatives
  - Real-world consequences (session hijacking, account takeover)
  - Copy-paste AI fix prompt
  - Framework-specific guidance

---

## 3. Competitive Analysis

### Current Top 3 Results for "insufficient entropy"

**1. [OWASP - Cryptographic Failures](https://owasp.org/Top10/A02_2021-Cryptographic_Failures/)**
- Title: A02:2021 - Cryptographic Failures
- Word count: ~2,000
- Strengths: Authoritative, comprehensive list of CWEs, prevention guidance
- Weaknesses: Very technical, no AI-specific context, no code examples for modern frameworks
- Our advantage: AI tool patterns, vibe coding context, practical fix prompts, before/after code

**2. [CWE-330 - MITRE](https://cwe.mitre.org/data/definitions/330.html)**
- Title: CWE-330: Use of Insufficiently Random Values
- Word count: ~1,500
- Strengths: Technical definition, relationships to other CWEs, formal description
- Weaknesses: Academic tone, generic examples, no JavaScript/Node.js focus, dated
- Our advantage: Modern JavaScript ecosystem, vibe coder audience, practical examples, AI context

**3. [Snyk Learn - Insecure Randomness](https://learn.snyk.io/lesson/insecure-randomness/)**
- Title: What is insecure randomness?
- Word count: ~1,200
- Strengths: Beginner-friendly, some code examples, clear structure
- Weaknesses: No AI tool analysis, limited depth on Math.random, missing session token specifics
- Our advantage: AI tool comparison data, vibe coding terminology, comprehensive token security guide

**4. [SmartScanner - Secure Random Function](https://www.thesmartscanner.com/blog/secure-coding-101-how-to-use-random-function)**
- Title: Secure Coding 101: How to Use Random Function
- Word count: ~1,800
- Strengths: Good examples, covers multiple languages
- Weaknesses: Generic, no AI focus, missing modern crypto APIs
- Our advantage: JavaScript/Node.js depth, AI tool patterns, crypto.randomUUID() coverage

### Content Gaps (Our Opportunities)
1. **AI Tool Patterns:** No competitor specifically covers why AI tools generate Math.random() for security tokens
2. **Vibe Coding Context:** No one addresses the non-technical founder using Cursor/Bolt/Claude Code
3. **Tool Comparison:** We have (or will have) data on which AI tools generate this vulnerability most
4. **Session Token Specifics:** Most content is generic; we can focus on the #1 use case (session/auth tokens)
5. **Modern JavaScript:** Many guides miss crypto.randomUUID(), crypto.randomInt(), and proper UUID v4 usage
6. **Copy-Paste AI Prompts:** No competitor offers AI fix prompts to regenerate secure code

---

## 4. Content Structure

### Recommended Sections

```
H1: Insufficient Entropy: Weak Random in AI-Generated Security Code

[Quick Answer Box - under 50 words]
Insufficient entropy happens when code uses weak random number generators like Math.random()
for security-critical values. Attackers can predict these "random" values to hijack sessions,
guess password reset tokens, or forge API keys. Ranked under [OWASP A02:2021](link).

[Stats Box - When Scanner data available]

H2: What is Insufficient Entropy?
    - Plain English: Not enough randomness in "random" values
    - Real-world analogy: Like a lock with only 10 possible keys instead of 1 million
    - Concrete consequences: Session hijacking, account takeover, API key prediction
    Target: 100-150 words

H2: Why AI Tools Generate Weak Random Code
    - Math.random() is familiar and "just works"
    - AI prioritizes working code over secure code
    - Training data includes old patterns (MD5, Math.random)
    - Tool comparison chart (Cursor vs Bolt vs Claude Code patterns)
    Target: 150-200 words

H2: Common Weak Random Patterns
    H3: Math.random() for Tokens
        - Session IDs
        - Password reset tokens
        - API keys
    H3: Timestamp-Based Seeds
        - Date.now() as seed
        - Sequential IDs
    H3: UUID Misconceptions
        - Not all UUID libraries are cryptographically secure
        - uuid() vs crypto.randomUUID()
    Target: 200-250 words total

H2: What Could Happen
    - Session hijacking (attacker predicts your session token)
    - Account takeover (attacker guesses password reset link)
    - API key prediction (attacker generates valid keys)
    - Real examples: Blockchain vulnerabilities, authentication bypasses
    Target: 100-150 words

H2: How to Detect Weak Random in Your Code
    - Search for Math.random() in security contexts
    - Check token/key generation code
    - Look for timestamp-based IDs
    - Regex patterns to find
    - Scanner CTA: "Scan your codebase for weak random patterns"
    Target: 150-200 words

H2: How to Fix Insufficient Entropy
    H3: AI Fix Prompt (Primary Solution)
        Complete 200-400 word prompt for AI tools:
        "Replace all weak random number generation with cryptographically
        secure alternatives. Specifically:

        1. Replace Math.random() with crypto.randomBytes() (Node.js) or
           crypto.getRandomValues() (browser)
        2. For session tokens: Use crypto.randomBytes(32).toString('hex')
        3. For UUIDs: Use crypto.randomUUID() not uuid library
        4. For random integers: Use crypto.randomInt(min, max)
        5. Ensure minimum 128 bits of entropy for tokens

        Review all code that generates:
        - Session IDs
        - Password reset tokens
        - API keys
        - CSRF tokens
        - Encryption IVs

        Follow OWASP Session Management Cheat Sheet for token generation."

    H3: Manual Fix (Before/After Examples)
        Session Tokens:
        ```javascript
        // ❌ VULNERABLE - Predictable
        const sessionId = Math.random().toString(36).substring(7)

        // ✅ SECURE - 128 bits entropy
        const crypto = require('crypto')
        const sessionId = crypto.randomBytes(16).toString('hex')
        ```

        Password Reset Tokens:
        ```javascript
        // ❌ VULNERABLE - Timestamp-based
        const resetToken = Date.now().toString(36) + Math.random().toString(36)

        // ✅ SECURE - Cryptographically random
        const resetToken = crypto.randomBytes(32).toString('hex')
        ```

        API Keys:
        ```javascript
        // ❌ VULNERABLE - Sequential
        const apiKey = 'key_' + userId + '_' + Date.now()

        // ✅ SECURE - CSPRNG
        const apiKey = 'key_' + crypto.randomBytes(32).toString('base64url')
        ```

        UUIDs (Browser):
        ```javascript
        // ❌ VULNERABLE - Some uuid libraries aren't secure
        import { v4 as uuid } from 'uuid' // Check implementation

        // ✅ SECURE - Built-in crypto UUID
        const id = crypto.randomUUID() // Native, cryptographically secure
        ```

    H3: Framework-Specific Fixes
        - Next.js: Use crypto in API routes and server actions
        - Express: Import crypto module, never Math.random
        - SvelteKit: Use crypto in +server.ts files
        - Supabase: Let Supabase handle session tokens (uses secure random)
        Links to /kb/security/fixes/insufficient-entropy/[framework]/
    Target: 400-500 words total

H2: Entropy Requirements by Use Case
    Table format:
    | Use Case | Minimum Bits | Recommended Method |
    |----------|--------------|-------------------|
    | Session tokens | 128 bits | crypto.randomBytes(16) |
    | Password reset | 256 bits | crypto.randomBytes(32) |
    | API keys | 256 bits | crypto.randomBytes(32) |
    | CSRF tokens | 128 bits | crypto.randomBytes(16) |
    | Encryption IVs | 128 bits | crypto.randomBytes(16) |
    | UUIDs | 122 bits | crypto.randomUUID() |

    Target: 100-150 words

H2: When Math.random() is Acceptable
    - Games and animations
    - UI effects (confetti, particles)
    - Non-security shuffling
    - Demo data generation
    - "It's never okay for security"
    Target: 75-100 words

H2: FAQ
    1. Is Math.random() secure for session tokens?
    2. What's the difference between PRNG and CSPRNG?
    3. How many bits of entropy do I need?
    4. Is UUID v4 cryptographically secure?
    5. Can attackers really predict Math.random()?
    Target: 50-100 words each (250-500 total)

H2: Related Vulnerabilities
    - Weak Password Hashing (similar crypto failures)
    - Hardcoded Crypto Keys (related to A02)
    - Session Fixation (another session vulnerability)
    Links to related KB articles
```

### Required Elements Checklist
- [ ] Quick answer in first 50 words with OWASP link
- [ ] Stats box (when Scanner data available; use external sources until then)
- [ ] AI tool pattern comparison (Cursor, Bolt, Claude Code, v0, Replit, Copilot)
- [ ] Complete AI fix prompt (200-400 words)
- [ ] 4+ before/after code examples (session, password reset, API keys, UUIDs)
- [ ] 8 FAQ entries matching PAA questions
- [ ] Scanner CTA in detection section
- [ ] 5-10 internal links
- [ ] CWE-330, CWE-331 references with links
- [ ] OWASP A02:2021 reference with link
- [ ] Entropy requirements table
- [ ] External authority links (OWASP Cheat Sheet, MDN crypto docs, etc.)

---

## 5. Internal Linking

### Must Link TO (Parent/Authority Pages)
| Page | Suggested Anchor Text |
|------|----------------------|
| /kb/security/vulnerabilities/ | "security vulnerabilities" |
| /kb/vibe-coding-tools/cursor/ | "Cursor security patterns" |
| /kb/vibe-coding-tools/bolt/ | "Bolt security issues" |
| /kb/vibe-coding-tools/claude-code/ | "Claude Code patterns" |

### Should Link TO (Related Content)
| Page | Suggested Anchor Text |
|------|----------------------|
| /kb/security/vulnerabilities/weak-password-hashing/ | "weak password hashing" |
| /kb/security/vulnerabilities/hardcoded-secrets/ | "hardcoded cryptographic keys" |
| /kb/security/vulnerabilities/session-fixation/ | "session fixation" |
| /kb/security/vulnerabilities/missing-authentication/ | "missing authentication" |
| /kb/glossary/security/entropy/ | "entropy" |
| /kb/glossary/security/csprng/ | "CSPRNG" |
| /kb/security/fixes/insufficient-entropy/nextjs/ | "fix in Next.js" |
| /kb/security/fixes/insufficient-entropy/express/ | "fix in Express" |

### External Authority Links (REQUIRED)
| Source | Purpose | URL |
|--------|---------|-----|
| OWASP A02:2021 | Official vulnerability category | https://owasp.org/Top10/A02_2021-Cryptographic_Failures/ |
| OWASP Session Management | Session token requirements | https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html |
| CWE-330 | Technical definition | https://cwe.mitre.org/data/definitions/330.html |
| CWE-331 | Insufficient entropy definition | https://cwe.mitre.org/data/definitions/331.html |
| MDN crypto.getRandomValues() | Browser API docs | https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues |
| MDN crypto.randomUUID() | Browser UUID API | https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID |
| Node.js crypto.randomBytes | Node.js API docs | https://nodejs.org/api/crypto.html#cryptorandombytessize-callback |
| Secure random values gist | Best practices guide | https://gist.github.com/joepie91/7105003c3b26e65efcea63f3db82dfba |

---

## 6. Unique Angle

### Our Differentiator
**AI tools generate weak random code because they prioritize "working" over "secure."** Math.random() is familiar, predictable in API, and generates values that look random to humans. AI training data includes millions of examples using Math.random() in contexts where crypto.randomBytes() should be used.

Vibe coders building with Cursor, Bolt, or Claude Code get functional token generation that passes tests but fails under attack. We're the only source showing:
1. **Which AI tools** generate this vulnerability most
2. **Why** they do it (training data, prioritization)
3. **How to prompt** AI tools to generate secure random code
4. **Copy-paste fixes** for every framework

### Key Message
**Math.random() is never secure for tokens. Use crypto.randomBytes() (Node.js) or crypto.getRandomValues() (browser) for anything security-related.**

### Data-Driven Claims to Highlight
1. "According to [OWASP Top 10:2025](https://owasp.org/Top10/2025/A04_2025-Cryptographic_Failures/), four of the most common CWEs in Cryptographic Failures involve weak PRNGs: CWE-327, CWE-331, CWE-1241, and CWE-338"
2. "Session tokens require [at least 64 bits of entropy](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html) to prevent brute-force guessing—Math.random() doesn't guarantee this"
3. "The [Verizon 2024 DBIR](#) reports that [X]% of web application breaches involve authentication vulnerabilities" (find exact stat)
4. "[Research shows](#) that ~0.5% of TLS/HTTPS servers and 0.03% of SSH servers had RSA keys breakable due to insufficient entropy during key generation" (from NIST paper)
5. "AI code generators like GitHub Copilot have been found to [use Math.random() for session tokens](https://www.rollingcodes.ai/read/2025-10-13.1400EST-copilot-vulnerabilities) instead of crypto.randomBytes()"

### Real-World Impact
- **2012 Debian OpenSSL vulnerability:** Insufficient entropy in RNG allowed attackers to predict SSL keys
- **Bitcoin/Ethereum wallet vulnerabilities:** Weak random seed generation led to predictable private keys
- **Android Bitcoin wallet apps (2013):** Insufficient entropy led to loss of Bitcoin
- **Session hijacking attacks:** Predictable session tokens allow account takeover

---

## 7. Meta Information

### Suggested Title Tag (under 60 chars)
```
Insufficient Entropy: Weak Random in Vibe Coded Apps
```
(55 characters)

Alternative:
```
Fix Weak Random: Math.random vs crypto.randomBytes
```
(52 characters)

### Suggested Meta Description (150-160 chars)
```
Insufficient entropy lets attackers predict session tokens generated with Math.random(). Learn to fix weak random in AI-generated code with crypto.randomBytes().
```
(159 characters)

Alternative:
```
AI tools generate Math.random() for tokens—attackers can predict these. Get copy-paste fixes for Cursor, Bolt & Claude Code using crypto.randomBytes().
```
(156 characters)

### Target URL
```
/kb/security/vulnerabilities/insufficient-entropy/
```

### Related URLs to Create
- /kb/security/fixes/insufficient-entropy/nextjs/
- /kb/security/fixes/insufficient-entropy/express/
- /kb/security/fixes/insufficient-entropy/sveltekit/
- /kb/vibe-coding-tools/cursor/insufficient-entropy/
- /kb/vibe-coding-tools/bolt/weak-random-patterns/
- /kb/glossary/security/entropy/
- /kb/glossary/security/csprng/
- /kb/glossary/security/prng/

---

## 8. Writer Notes

### Tone Guidance
- **Empowering, not scary:** "This is common and fixable"
- **No judgment:** Many developers don't know Math.random() is insecure
- **Technical but accessible:** Explain PRNG vs CSPRNG without going too deep
- **Action-oriented:** Focus on the fix, not dwelling on the problem
- **AI-aware:** Acknowledge that AI tools generate this—it's not the coder's fault

### Technical Accuracy Notes
- **Math.random() is deterministic:** It's a PRNG, not truly random
- **crypto.randomBytes() uses OS entropy:** /dev/urandom on Linux, CryptoGenRandom on Windows
- **Not all UUID libraries are secure:** Some use Math.random(); crypto.randomUUID() is guaranteed secure
- **Entropy is measured in bits:** 64 bits minimum for sessions (OWASP), 128+ recommended
- **UUIDv4 has 122 bits of randomness:** 6 bits are reserved for version/variant
- **When to use each:**
  - crypto.randomBytes() → raw bytes (convert to hex/base64)
  - crypto.randomInt() → random integer in range
  - crypto.randomUUID() → UUID v4 string
  - crypto.getRandomValues() → browser equivalent

### Things to Avoid
- **Don't recommend crypto.pseudoRandomBytes()** (deprecated in Node.js)
- **Don't say "use any UUID library"** (some aren't secure)
- **Don't recommend node-uuid** (different package, not secure)
- **Don't use % modulo for random ranges** (introduces bias)
- **Don't suggest Math.random() for ANY security use case** (even "low risk" ones)

### Reference Materials
**MUST READ before writing:**
1. [OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html) - Token generation requirements
2. [MDN Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) - Browser crypto functions
3. [Node.js Crypto Documentation](https://nodejs.org/api/crypto.html) - Node.js crypto module
4. [Secure random values in Node.js (GitHub Gist)](https://gist.github.com/joepie91/7105003c3b26e65efcea63f3db82dfba) - Best practices
5. [CWE-330](https://cwe.mitre.org/data/definitions/330.html) - Official vulnerability definition
6. [NIST SP 800-90A](https://csrc.nist.gov/publications/detail/sp/800-90a/rev-1/final) - Entropy requirements (optional deep dive)

### Code Example Requirements
- **Always show before AND after**
- **Use modern JavaScript (const, async/await)**
- **Include comments explaining why the secure version is better**
- **Show practical examples:** session tokens, password reset, API keys
- **Include browser AND Node.js examples**
- **Show framework integration:** Express, Next.js, SvelteKit

### AI Fix Prompt Requirements
The AI fix prompt MUST:
- Be 200-400 words
- Be copy-paste ready (no placeholders to fill)
- List specific functions to replace (Math.random → crypto.randomBytes)
- Include minimum entropy requirements (128 bits for tokens)
- Reference OWASP standards
- List all security contexts to review (session, reset tokens, API keys, CSRF, IVs)
- Be structured as instructions to an AI coding tool

### FAQ Answer Format
Each FAQ answer must:
- **First sentence:** Direct yes/no or fact
- **Next 2-3 sentences:** Brief explanation
- **Final sentence:** Link to deeper content or action
- **Total:** 50-100 words
- **Include code** if relevant (especially for "how to" questions)

Example:
```
Q: Is Math.random() secure for session tokens?

A: No. Math.random() is a pseudorandom number generator (PRNG) that is
predictable and not cryptographically secure. Attackers can predict the
next "random" value if they observe previous outputs. Use crypto.randomBytes(16)
for session tokens, which provides 128 bits of cryptographic entropy from
your operating system's secure random source. [OWASP requires at least 64 bits](link)
for session tokens.
```

---

## 9. Research Sources (For Attribution)

### Primary Sources
- [OWASP Top 10:2021 - A02 Cryptographic Failures](https://owasp.org/Top10/A02_2021-Cryptographic_Failures/)
- [OWASP Top 10:2025 - A04 Cryptographic Failures](https://owasp.org/Top10/2025/A04_2025-Cryptographic_Failures/)
- [OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)
- [CWE-330: Use of Insufficiently Random Values](https://cwe.mitre.org/data/definitions/330.html)
- [CWE-331: Insufficient Entropy](https://cwe.mitre.org/data/definitions/331.html)
- [CWE-338: Use of Cryptographically Weak PRNG](https://cwe.mitre.org/data/definitions/338.html)

### Technical Documentation
- [MDN: Crypto.getRandomValues()](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues)
- [MDN: Crypto.randomUUID()](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID)
- [MDN: Math.random()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
- [Node.js Crypto Module](https://nodejs.org/api/crypto.html)
- [Secure Random Values in Node.js (GitHub Gist)](https://gist.github.com/joepie91/7105003c3b26e65efcea63f3db82dfba)

### Security Research
- [Rolling Codes: Copilot Vulnerabilities](https://www.rollingcodes.ai/read/2025-10-13.1400EST-copilot-vulnerabilities) - AI code generators using Math.random for tokens
- [CQR: Insufficient Entropy](https://cqr.company/web-vulnerabilities/insufficient-entropy/)
- [Snyk Learn: Insecure Randomness](https://learn.snyk.io/lesson/insecure-randomness/)
- [SmartScanner: Secure Random Function](https://www.thesmartscanner.com/blog/secure-coding-101-how-to-use-random-function)
- [Ubiq Security: Exploring CWE-331](https://www.ubiqsecurity.com/exploring-cwe-331-insufficient-entropy/)

### Industry Reports
- Verizon Data Breach Investigations Report (find specific stat on auth vulnerabilities)
- NIST: True Randomness Can't be Left to Chance (entropy importance)
- Research on Debian OpenSSL vulnerability (insufficient entropy in RNG)
- Studies on Bitcoin wallet vulnerabilities from weak entropy

---

**Brief Status:** ✅ Complete - Ready for Writer Agent

**Next Steps:**
1. Writer agent should use this brief + VIBESHIP-SECURITY-WRITER-AGENT-PROMPT.md
2. Create complete Svelte component with all required elements
3. Verify against qa-checklist.md
4. When Scanner data becomes available, update stats box
5. Create related fix pages for Next.js, Express, SvelteKit
