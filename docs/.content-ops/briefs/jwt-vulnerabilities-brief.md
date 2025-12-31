# Content Brief: JWT Implementation Vulnerabilities

## Status

```yaml
status: DONE
created_at: 2025-12-17T16:00:00Z
created_by: Research Agent Terminal 1B
claimed_by: Writer Agent Terminal 1B
claimed_at: 2025-12-17T17:45:00Z
completed_at: 2025-12-17T18:00:00Z
```

---

## Article Metadata

```yaml
type: vulnerability
slug: jwt-vulnerabilities
url: /kb/security/vulnerabilities/jwt-vulnerabilities/
title: "JWT Security: 5 Flaws AI Tools Get Wrong"
meta_description: "JWT vulnerabilities like algorithm confusion and weak secrets let attackers forge tokens. AI tools often misconfigure JWT. Learn secure implementation patterns."
cwe: CWE-347
owasp: A02:2021-Cryptographic Failures
severity: Critical
word_count: 1500-2000
```

---

## Core Data

### Primary References
| Reference | ID | Link |
|-----------|-----|------|
| CWE-347 | Improper Verification of Cryptographic Signature | https://cwe.mitre.org/data/definitions/347.html |
| OWASP | A02:2021-Cryptographic Failures | https://owasp.org/Top10/A02_2021-Cryptographic_Failures/ |
| OWASP JWT Cheat Sheet | JWT Security | https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html |

### External Sources (for outbound links)
| Source | URL | Key Finding | Tier |
|--------|-----|-------------|------|
| CWE-347 Definition | https://cwe.mitre.org/data/definitions/347.html | Signature verification failures | 1 |
| OWASP Cryptographic Failures | https://owasp.org/Top10/A02_2021-Cryptographic_Failures/ | Top 10 category | 1 |
| PortSwigger JWT Attacks | https://portswigger.net/web-security/jwt | Comprehensive JWT attack guide | 2 |
| PortSwigger Algorithm Confusion | https://portswigger.net/web-security/jwt/algorithm-confusion | RS256 to HS256 attack | 2 |
| Auth0 JWT Vulnerabilities | https://auth0.com/blog/critical-vulnerabilities-in-json-web-token-libraries/ | Original library vulnerability disclosure | 2 |
| PentesterLab JWT Code Review | https://pentesterlab.com/blog/jwt-algorithm-confusion-code-review-lessons | Code review lessons | 2 |
| Vaadata JWT Best Practices | https://www.vaadata.com/blog/jwt-json-web-token-vulnerabilities-common-attacks-and-security-best-practices/ | Comprehensive security guide | 2 |

### Key Facts to Include
- Algorithm confusion attack: Changing RS256 to HS256 and signing with public key
- "none" algorithm attack: Some libraries accept tokens with no signature
- Auth0 discovered critical JWT library vulnerabilities in 2015 - still relevant
- Weak secrets can be brute-forced (tools like jwt_tool, hashcat)
- Missing expiration (exp) claim allows tokens to work forever
- JWK/JKU header injection lets attackers supply their own keys
- kid (key ID) parameter can be vulnerable to SQL injection, path traversal

---

## SEO Strategy

### Target Keywords
| Keyword | Search Intent | Priority |
|---------|---------------|----------|
| JWT vulnerabilities | informational | Primary |
| JWT security best practices | informational | Primary |
| JWT algorithm confusion | informational | Secondary |
| JWT none algorithm attack | informational | Secondary |
| secure JWT implementation | transactional | Tertiary |

### People Also Ask (FAQs)
1. What are common JWT vulnerabilities?
2. How do I secure JWT tokens?
3. What is JWT algorithm confusion attack?
4. Should I use JWT for authentication?
5. How long should JWT secrets be?

### Competitive Gap
**Top results analysis:**
- PortSwigger: Excellent but penetration testing focused
- Auth0: Good but promotes their service
- Blog posts: Often outdated or overly theoretical

**Our unique angle:**
- AI tools generate vulnerable JWT implementations
- Focus on Node.js libraries (jsonwebtoken, jose)
- Practical code fixes, not just theory
- 5 specific vulnerabilities with before/after

---

## Content Outline

### Quick Answer (50 words max)
JWT (JSON Web Token) authentication is often misconfigured by AI tools. Common flaws include weak secrets, missing algorithm validation, and no expiration. These let attackers forge tokens and impersonate any user. Always specify the algorithm explicitly and use strong, random secrets.

### Section 1: What is JWT and Why It Matters
- Plain English: Signed JSON containing user info
- How it works: Header.Payload.Signature
- Why it's popular for APIs and SPAs
- Why misconfigurations are dangerous
- Word count: 100-150

### Section 2: The 5 JWT Vulnerabilities AI Gets Wrong
Overview of the five main issues (detailed in subsequent sections)
- Algorithm confusion
- None algorithm
- Weak secrets
- Missing expiration
- Insecure storage
- Word count: 100-150

### Section 3: Algorithm Confusion Attack
- RS256 vs HS256 difference
- Attack: Change alg to HS256, sign with public key
- Why libraries are vulnerable
- How to fix: Always specify expected algorithm
- Word count: 200-250

### Section 4: None Algorithm Attack
- What "none" algorithm means
- Why libraries supported it
- How to prevent: Never allow "none"
- Word count: 150-200

### Section 5: Weak Secrets
- AI generates short, guessable secrets
- Brute force with hashcat/jwt_tool
- Recommended: 256-bit random secrets
- Word count: 150-200

### Section 6: Missing Claims Validation
- exp (expiration) - tokens that never expire
- iat (issued at) - can't detect stolen tokens
- aud (audience) - token reuse across services
- Word count: 150-200

### Section 7: Secure JWT Implementation
- Use established libraries correctly
- Always specify algorithm in verify()
- Generate cryptographically random secrets
- Set reasonable expiration
- Word count: 200-300

### Section 8: AI Fix Prompt
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
| hardcoded secrets | /kb/security/vulnerabilities/hardcoded-secrets/ | JWT secret exposure |
| missing authentication | /kb/security/vulnerabilities/missing-auth/ | Auth context |
| XSS | /kb/security/vulnerabilities/xss/ | Token theft via XSS |
| Cursor security patterns | /kb/vibe-coding-tools/cursor/ | AI tool context |
| Bolt security patterns | /kb/vibe-coding-tools/bolt/ | AI tool context |
| Claude Code security patterns | /kb/vibe-coding-tools/claude-code/ | AI tool context |
| Next.js + Supabase security | /kb/security/stacks/nextjs-supabase/ | Auth context |

---

## External Links (5-10 required)

| Anchor Text | URL | Tier | Placement |
|-------------|-----|------|-----------|
| CWE-347 | https://cwe.mitre.org/data/definitions/347.html | 1 | Intro |
| OWASP Cryptographic Failures | https://owasp.org/Top10/A02_2021-Cryptographic_Failures/ | 1 | Intro |
| PortSwigger JWT Attacks | https://portswigger.net/web-security/jwt | 2 | Attack sections |
| PortSwigger Algorithm Confusion | https://portswigger.net/web-security/jwt/algorithm-confusion | 2 | Algorithm section |
| Auth0 JWT Vulnerabilities | https://auth0.com/blog/critical-vulnerabilities-in-json-web-token-libraries/ | 2 | History |
| OWASP JWT Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html | 1 | Fix section |
| jwt.io | https://jwt.io/ | 7 | Debugging tool |

---

## Code Examples Needed

### Pattern 1: Vulnerable JWT Verification (AI Default)
```javascript
// VULNERABLE: AI generates this without algorithm specification
const jwt = require('jsonwebtoken')

app.get('/protected', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) // DANGEROUS!
    req.user = decoded
    // ... protected logic
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' })
  }
})

// Attacker can use algorithm confusion if not specified
```
Explanation: Without specifying algorithms, library might accept unexpected algorithms. Vulnerable to algorithm confusion.

### Pattern 2: Algorithm Confusion Attack
```javascript
// ATTACK SCENARIO:
// Server uses RS256 (asymmetric) - signs with private key, verifies with public key
// Attacker changes header to HS256 (symmetric)
// Attacker signs token with the PUBLIC key (which they have)
// Server's verify() uses public key - which now works for HS256!

// Original token header: { "alg": "RS256", "typ": "JWT" }
// Attacker's token header: { "alg": "HS256", "typ": "JWT" }
// Attacker signs with publicKey
// Server: jwt.verify(token, publicKey) // Works! HS256 with publicKey as secret

// VULNERABLE server code:
const decoded = jwt.verify(token, publicKey) // No algorithm specified!
```
Explanation: When algorithm isn't specified, attacker changes RS256 to HS256 and signs with the public key (which is public!).

### Pattern 3: Secure Algorithm Specification
```javascript
// SECURE: Always specify expected algorithm
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET
const JWT_OPTIONS = {
  algorithms: ['HS256'], // ONLY accept HS256
  issuer: 'myapp',
  audience: 'myapp-users',
}

app.get('/protected', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET, JWT_OPTIONS)
    req.user = decoded
    // ... protected logic
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' })
  }
})

// For RS256:
const RS256_OPTIONS = {
  algorithms: ['RS256'], // ONLY accept RS256
  issuer: 'myapp',
}
jwt.verify(token, publicKey, RS256_OPTIONS)
```
Explanation: Explicitly specify which algorithms to accept. Reject all others including "none".

### Pattern 4: Vulnerable Secret (AI Generated)
```javascript
// VULNERABLE: Weak secrets AI tools generate
const JWT_SECRET = 'secret' // Can be brute-forced in seconds
const JWT_SECRET = 'myapp-secret-key' // Dictionary word based
const JWT_SECRET = '12345678' // Numeric, very weak
const JWT_SECRET = process.env.JWT_SECRET || 'fallback' // Fallback in production!

// Attacker uses hashcat or jwt_tool:
// hashcat -m 16500 jwt.txt wordlist.txt
// jwt_tool -C -d wordlist.txt jwt_token
```
Explanation: Short or predictable secrets can be brute-forced. AI tools often generate weak defaults.

### Pattern 5: Secure Secret Generation
```javascript
// SECURE: Generate and use strong secrets
const crypto = require('crypto')

// Generate a 256-bit (32 byte) secret
const secret = crypto.randomBytes(32).toString('base64')
console.log(`JWT_SECRET=${secret}`) // Add to .env

// In application:
const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET || JWT_SECRET.length < 32) {
  throw new Error('JWT_SECRET must be at least 32 characters')
}

// Sign tokens
const token = jwt.sign(
  { userId: user.id, email: user.email },
  JWT_SECRET,
  {
    algorithm: 'HS256',
    expiresIn: '1h', // Always set expiration
    issuer: 'myapp',
  }
)
```
Explanation: Use cryptographically random secrets at least 256 bits (32 bytes). Never use defaults.

### Pattern 6: Missing Expiration (Vulnerable)
```javascript
// VULNERABLE: No expiration = token valid forever
const token = jwt.sign({ userId: user.id }, JWT_SECRET) // No expiresIn!

// Attacker steals token → can use it indefinitely
// Even after password change, token still works
```
Explanation: Tokens without expiration work forever. Stolen tokens remain valid indefinitely.

### Pattern 7: Secure Token with All Claims
```javascript
// SECURE: Full token with proper claims
const jwt = require('jsonwebtoken')

function generateToken(user) {
  return jwt.sign(
    {
      sub: user.id,           // Subject (user ID)
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      algorithm: 'HS256',
      expiresIn: '1h',        // Short-lived access token
      issuer: 'myapp',        // Who issued the token
      audience: 'myapp-api',  // Who can use the token
      jwtid: crypto.randomUUID(), // Unique token ID for revocation
    }
  )
}

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET, {
    algorithms: ['HS256'],    // Only accept HS256
    issuer: 'myapp',          // Must match issuer
    audience: 'myapp-api',    // Must match audience
    clockTolerance: 30,       // 30 second clock skew tolerance
  })
}
```
Explanation: Include all security-relevant claims. Verify them on every request.

### Pattern 8: Secure Token Storage (Frontend)
```javascript
// VULNERABLE: localStorage (accessible via XSS)
localStorage.setItem('token', jwtToken)

// SECURE: HttpOnly cookie (not accessible via JavaScript)
// Server-side:
res.cookie('token', jwtToken, {
  httpOnly: true,     // JavaScript can't access
  secure: true,       // HTTPS only
  sameSite: 'strict', // CSRF protection
  maxAge: 3600000,    // 1 hour
})

// Client reads token from cookie automatically via credentials: 'include'
fetch('/api/protected', {
  credentials: 'include', // Send cookies
})
```
Explanation: HttpOnly cookies prevent XSS token theft. Never store JWTs in localStorage.

---

## AI Fix Prompt Requirements

The Writer Agent should create an AI fix prompt that includes:
- [ ] Search for jwt.verify() without algorithms option
- [ ] Search for jwt.sign() without expiresIn
- [ ] Look for hardcoded JWT secrets in code
- [ ] Check for weak/short JWT secrets
- [ ] Verify tokens include exp, iss, aud claims
- [ ] Check for localStorage JWT storage
- [ ] Look for algorithms: ['none'] or algorithm validation bypass

---

## Notes for Writer Agent

### Tone Guidance
- JWT is ubiquitous in vibe coded apps
- Algorithm confusion is subtle but devastating
- Emphasize that the fix is simple: specify algorithm explicitly

### Technical Accuracy
- jsonwebtoken library accepts algorithm option in verify()
- HS256 uses same key for sign and verify (symmetric)
- RS256 uses private key to sign, public key to verify (asymmetric)
- Auth0 blog post from 2015 is still the authoritative source
- "none" algorithm is defined in JWT spec but should never be accepted

### Things to Avoid
- Don't suggest JWTs are inherently insecure (they're fine when configured correctly)
- Don't forget about token storage (localStorage vs cookies)
- Don't ignore refresh token patterns
- Don't suggest rolling your own JWT library

### Vibe Coding Terms
Use these 3-5 times naturally:
- vibe coding
- vibe coders
- vibe coded
- AI-generated code

---

## Checklist Before Marking READY

- [x] All external links verified working
- [x] CWE/OWASP references correct (CWE-347, A02:2021)
- [x] 7 internal links identified
- [x] 5 PAA questions included
- [x] Competitive gap is specific
- [x] Code examples drafted (8 patterns)
- [x] No placeholder text

---

**Brief Status:** READY for Writer Agent
