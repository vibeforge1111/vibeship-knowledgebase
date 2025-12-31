# Content Brief: Hardcoded Cryptographic Keys

**Generated:** 2025-12-17
**Target Publish:** 2025-12-18
**Priority:** P0
**Status:** ✅ Ready for Writer

---

## 1. Core Data

### Scanner Statistics
| Metric | Value | Source |
|--------|-------|--------|
| Prevalence | Data coming soon | Scanner DB (in development) |
| Repos Scanned | Data coming soon | Scanner DB (in development) |
| Week-over-Week | Data coming soon | Scanner DB (in development) |
| Most Affected Tool | Data coming soon | Scanner DB (in development) |

**Note:** VibeShip Scanner is actively collecting data on cryptographic key vulnerabilities in AI-generated code. Use external authoritative sources until Scanner data is available.

### Tool Breakdown
| Tool | Vulnerability Rate | Sample Size |
|------|-------------------|-------------|
| Cursor | Data coming soon | Scanner data in progress |
| Bolt | Data coming soon | Scanner data in progress |
| Claude Code | Data coming soon | Scanner data in progress |
| v0 | Data coming soon | Scanner data in progress |
| Replit | Data coming soon | Scanner data in progress |
| Copilot | Data coming soon | Scanner data in progress |

### Security References
- **CWE ID:** CWE-321
- **CWE Name:** Use of Hard-coded Cryptographic Key
- **OWASP Category:** A02:2021 - Cryptographic Failures
- **Related CWE:** CWE-798 (Use of Hard-coded Credentials), CWE-327 (Broken or Risky Crypto Algorithm), CWE-331 (Insufficient Entropy)
- **Severity:** Critical
- **CVSS Range:** 7.5 - 9.8 (depending on context)

---

## 2. SEO Strategy

### Target Keywords
| Keyword | Est. Volume | Difficulty | Intent |
|---------|-------------|------------|--------|
| hardcoded encryption key | 2,400 | Medium | Informational |
| jwt secret hardcoded | 1,900 | Medium | Informational |
| hardcoded crypto key | 880 | Low | Informational |
| initialization vector reuse | 590 | Low | Informational |
| api signing key security | 720 | Medium | Informational |
| how to store encryption keys | 3,600 | Medium | Transactional |
| jwt secret environment variable | 1,200 | Low | Transactional |

### People Also Ask
1. "What is a hardcoded encryption key?"
2. "Why is hardcoding JWT secrets dangerous?"
3. "How do I detect hardcoded keys in my code?"
4. "What's the difference between hardcoded secrets and hardcoded crypto keys?"
5. "Should initialization vectors be hardcoded?"

### Search Intent Analysis
- **Primary intent:** Informational - understanding the vulnerability and why it's dangerous
- **User goal:** Learn what hardcoded crypto keys are, why they're risky, and how to fix them
- **Content need:** Clear explanation, real-world examples, detection methods, and actionable fixes

---

## 3. Competitive Analysis

### Current Top 3 Results for "hardcoded encryption key"

**1. https://vulncat.fortify.com/en/detail?id=desc.semantic.java.key_management_hardcoded_encryption_key**
- Title: Software Security | Key Management: Hardcoded Encryption Key
- Word count: ~800
- Strengths: Technical accuracy, code examples, Java-focused
- Weaknesses: No AI tool context, enterprise security tool marketing, limited language coverage
- Our advantage: AI-specific patterns, multi-language examples, Scanner data showing prevalence in vibe coded apps

**2. https://cwe.mitre.org/data/definitions/321.html**
- Title: CWE - CWE-321: Use of Hard-coded Cryptographic Key
- Word count: ~1,200
- Strengths: Authoritative source, comprehensive technical definition, mitigation strategies
- Weaknesses: Academic tone, no practical fix prompts, no AI tool analysis
- Our advantage: Plain English explanation, vibe coder audience, copy-paste AI fix prompts

**3. https://developer.android.com/privacy-and-security/risks/hardcoded-cryptographic-secrets**
- Title: Hardcoded Cryptographic Secrets | Security | Android Developers
- Word count: ~600
- Strengths: Official Android documentation, clear risk explanation, mobile-specific
- Weaknesses: Android-only, no web stack guidance, no AI tool patterns
- Our advantage: Web stack focus (Next.js, Express, etc.), AI tool comparison, broader language support

### Content Gaps (Our Opportunities)
1. **AI Tool Patterns:** No competitor analyzes WHY AI tools generate placeholder keys that go to production. We can explain the "example code" problem.
2. **Crypto-Specific Focus:** Most content conflates API keys with crypto keys. We clearly distinguish hardcoded-secrets (API keys) vs hardcoded-crypto-keys (JWT secrets, encryption keys, IVs).
3. **Detection Tooling:** Limited coverage of GitLeaks, TruffleHog, Opengrep patterns. We can provide specific regex patterns and scanner recommendations.
4. **IV Reuse:** Niche but critical vulnerability (initialization vector reuse) barely covered. We can explain this clearly.
5. **Real CVEs:** We have recent CVE examples (CVE-2023-27172, CVE-2025-20188) that competitors don't reference.

---

## 4. Content Structure

### Recommended Sections

```
H1: Hardcoded Crypto Keys: When AI Example Keys Go Production

H2: What are hardcoded cryptographic keys?
    - Plain English definition (crypto keys vs API keys)
    - Types: JWT secrets, AES keys, IV reuse, signing keys
    - Real-world analogy (hotel master key taped to front desk)
    - Why this is DIFFERENT from hardcoded-secrets article
    Target: 100-150 words

H2: How AI tools cause hardcoded crypto key vulnerabilities
    - Why AI generates placeholder keys ("secret", "your-key-here")
    - Example code problem: tutorials → production
    - Tool comparison (which tools most likely to generate vulnerable patterns)
    - Specific code patterns by framework
    Target: 150-200 words

H2: Types of hardcoded cryptographic keys
    H3: JWT secrets (JWT_SECRET = "secret")
    H3: Encryption keys (AES-256 keys in code)
    H3: Initialization vector reuse (static IVs)
    H3: API signing keys (HMAC secrets)
    Target: 200-250 words total

H2: What could happen
    - Attacker forges JWTs → account takeover
    - Encrypted data decrypted (if AES key exposed)
    - Pattern analysis (if IV reused)
    - API request forgery (if signing key leaked)
    - Real CVE examples: CVE-2023-27172, CVE-2025-20188, Yealink, Mercedes-Benz
    Target: 100-150 words

H2: How to detect hardcoded crypto keys
    - Code patterns to grep for
    - GitLeaks configuration
    - TruffleHog usage
    - Opengrep rules
    - Scanner CTA (VibeShip Scanner auto-detects)
    Target: 150-200 words

H2: How to fix hardcoded crypto keys
    H3: AI Fix Prompt
        - Complete prompt for AI tools (200-400 words)
        - Covers JWT secrets, encryption keys, IVs
    H3: Manual Fix
        - Environment variables approach
        - Secrets manager approach (AWS Secrets Manager, HashiCorp Vault)
        - Key derivation functions
        - Before/after code examples
        Target: 200-250 words
    H3: Framework-Specific Fixes
        - Next.js: process.env pattern
        - Express: dotenv + KMS
        - Django: django-environ
        - Links to fix pages

H2: FAQ
    - 5 questions from PAA
    - 50-100 words each

H2: Related
    - hardcoded-secrets (API keys vs crypto keys distinction)
    - jwt-vulnerabilities
    - sensitive-data-exposure
    - Tool links (Cursor, Bolt, Claude Code)
```

### Required Elements Checklist
- [x] Quick answer in first 50 words (what it is + why dangerous)
- [x] Stats box with external sources (OWASP, real CVEs)
- [x] Types breakdown (JWT, AES, IV, signing keys)
- [x] Complete AI fix prompt (200-400 words)
- [x] Before/after code examples (JWT, AES, IV)
- [x] 5 FAQ entries matching PAA
- [x] Scanner CTA in detection section
- [x] 5-10 internal links
- [x] CWE-321, OWASP A02 references with links

---

## 5. Internal Linking

### Must Link TO (Parent/Authority Pages)
| Page | Suggested Anchor Text |
|------|----------------------|
| /kb/security/vulnerabilities/ | "security vulnerabilities in AI-generated code" |
| /kb/security/vulnerabilities/hardcoded-secrets/ | "hardcoded secrets" (distinguish API keys vs crypto keys) |
| /kb/security/vulnerabilities/jwt-vulnerabilities/ | "JWT vulnerabilities" |
| /kb/vibe-coding-tools/cursor/ | "Cursor security patterns" |
| /kb/vibe-coding-tools/bolt/ | "Bolt security" |

### Should Link TO (Related Content)
| Page | Suggested Anchor Text |
|------|----------------------|
| /kb/security/vulnerabilities/sensitive-data-exposure/ | "sensitive data exposure" |
| /kb/security/vulnerabilities/insecure-deserialization/ | "insecure deserialization" |
| /kb/security/stacks/nextjs-supabase/ | "Next.js + Supabase security guide" |
| /kb/security/stacks/nextjs-prisma/ | "Next.js + Prisma security" |
| /kb/glossary/security/encryption/ | "encryption" (if exists) |

### External Authority Links
| Source | Purpose | URL |
|--------|---------|-----|
| CWE-321 | Official vulnerability definition | https://cwe.mitre.org/data/definitions/321.html |
| OWASP A02:2021 | Cryptographic failures category | https://owasp.org/Top10/A02_2021-Cryptographic_Failures/ |
| PortSwigger JWT | JWT attack methodology | https://portswigger.net/web-security/jwt |
| Semgrep Blog | Hardcoded secrets article | https://semgrep.dev/blog/2020/hardcoded-secrets-unverified-tokens-and-other-common-jwt-mistakes/ |
| Wallarm JWT Keys | Ongoing risks of hardcoded JWT | https://securityboulevard.com/2025/05/the-ongoing-risks-of-hardcoded-jwt-keys/ |
| GitLeaks | Secret detection tool | https://gitleaks.io/ |
| TruffleHog | Secret scanning | https://trufflesecurity.com/trufflehog |

---

## 6. Unique Angle

### Our Differentiator
**The "Example Code Goes Production" Problem:** AI tools like Cursor, Bolt, and Claude Code generate functional code with placeholder keys (`JWT_SECRET = "secret"`, `ENCRYPTION_KEY = "your-256-bit-secret"`). Vibe coders copy this code, it works locally, and it ships to production unchanged. We're the only resource analyzing this AI-specific pattern and providing tool-by-tool data.

### Key Message
Hardcoded cryptographic keys are DIFFERENT from hardcoded API keys. Crypto keys (JWT secrets, AES keys, IVs) protect authentication and data encryption—if compromised, attackers can forge identities and decrypt everything. AI tools generate working examples with weak keys that must be replaced before production.

### Data-Driven Claims to Highlight
1. "According to [OWASP Top 10 (2021)](https://owasp.org/Top10/A02_2021-Cryptographic_Failures/), cryptographic failures rank #2, with hardcoded keys specifically called out as a common weakness."
2. "CVE-2023-27172 shows how a hardcoded JWT secret was cracked in 160ms using a dictionary attack."
3. "The [Wallarm ThreatStats Report Q1 2025](https://securityboulevard.com/2025/05/the-ongoing-risks-of-hardcoded-jwt-keys/) found hardcoded secrets contributed to the majority of API security breaches in AI and healthcare sectors."
4. "According to [Semgrep's JWT analysis](https://semgrep.dev/blog/2020/hardcoded-secrets-unverified-tokens-and-other-common-jwt-mistakes/), hardcoded secrets are the 'most basic mistake' allowing attackers to forge tokens if source code is exposed."

---

## 7. Meta Information

### Suggested Title Tag (under 60 chars)
```
Hardcoded Crypto Keys: Find & Fix AI Example Keys | VibeShip
```
(58 characters)

### Suggested Meta Description (150-160 chars)
```
Hardcoded crypto keys let attackers forge JWTs and decrypt data. Common in AI-generated code. Get detection patterns and fixes for Cursor, Bolt & Claude Code.
```
(158 characters)

### Target URL
```
/kb/security/vulnerabilities/hardcoded-crypto-keys/
```

### Related URLs to Create (Future)
- /kb/security/fixes/hardcoded-crypto-keys/nextjs/
- /kb/security/fixes/hardcoded-crypto-keys/express/
- /kb/vibe-coding-tools/cursor/hardcoded-crypto-keys/
- /kb/glossary/security/jwt-secret/
- /kb/glossary/security/initialization-vector/

---

## 8. Writer Notes

### Tone Guidance
**Critical but not alarmist.** This is a severe vulnerability (CVSS 7.5-9.8), but it's fixable. Emphasize that AI tools aren't "broken"—they generate example code that works locally. The problem is vibe coders not knowing they need to replace placeholder keys before production.

**Distinguish from hardcoded-secrets article:** Make it VERY clear this article is about CRYPTOGRAPHIC keys (JWT, AES, signing) NOT API keys (Stripe, OpenAI). Cross-link heavily to hardcoded-secrets but clearly differentiate the two.

### Technical Accuracy Notes
1. **IV Reuse is mode-dependent:** IV reuse in CTR mode is catastrophic (full plaintext recovery), but less severe in CBC mode. Be precise about mode-specific risks.
2. **JWT HS256 vs RS256:** Hardcoded secrets only affect symmetric algorithms (HS256, HS384, HS512). RS256 uses private keys, which is a different vulnerability (hardcoded private key). Focus on HS256 for JWT examples.
3. **Environment variables are not a vault:** Clarify that environment variables are BETTER than hardcoding but not the ultimate solution. Secrets managers (AWS Secrets Manager, HashiCorp Vault) are the gold standard.
4. **Key rotation:** Emphasize that hardcoded keys can't be rotated without redeploying code. This is a major operational risk.

### Things to Avoid
1. **Don't conflate with hardcoded-secrets:** Keep the distinction clear—this article is about CRYPTOGRAPHIC keys, not API credentials.
2. **Don't recommend deprecated solutions:** No MD5, SHA-1, or weak algorithms. Stick to AES-256, Argon2id, RS256, ES256.
3. **Don't oversimplify IV reuse:** It's complex and mode-dependent. Explain CTR vs CBC vs GCM impact accurately.
4. **Don't fabricate Scanner stats:** Use "Data coming soon" until real Scanner data is available. Rely on external sources (OWASP, CVEs, Wallarm) for stats.

### Reference Materials
**Must Consult Before Writing:**
1. [CWE-321: Use of Hard-coded Cryptographic Key](https://cwe.mitre.org/data/definitions/321.html) - Official definition
2. [OWASP A02:2021 - Cryptographic Failures](https://owasp.org/Top10/A02_2021-Cryptographic_Failures/) - Category overview
3. [PortSwigger JWT Attacks](https://portswigger.net/web-security/jwt) - Attack methodology
4. [Semgrep: Hardcoded secrets, unverified tokens, and other common JWT mistakes](https://semgrep.dev/blog/2020/hardcoded-secrets-unverified-tokens-and-other-common-jwt-mistakes/) - Practical examples
5. [Wallarm: The Ongoing Risks of Hardcoded JWT Keys](https://securityboulevard.com/2025/05/the-ongoing-risks-of-hardcoded-jwt-keys/) - Recent threats
6. [GitLeaks](https://gitleaks.io/) - Detection tool documentation
7. [TruffleHog](https://trufflesecurity.com/trufflehog) - Secret scanning tool

**Real CVE Examples to Reference:**
- **CVE-2023-27172** (Write-Back): Hardcoded JWT secret cracked in 160ms
- **CVE-2025-20188** (Cisco IOS XE): Hardcoded JWT allowed root access
- **Yealink (2024-2025)**: Leaked AES key and RSA private key on GitHub
- **Mercedes-Benz (Jan 2024)**: Authentication token in public GitHub repo
- **Rabbit R1 (May 2024)**: Multiple API keys hardcoded in device code

---

## 9. AI Tool Patterns (Key Research Findings)

### Why AI Tools Generate Hardcoded Keys

**The "Working Example" Problem:**
AI tools are trained on tutorial code, Stack Overflow examples, and documentation that use placeholder values:
- `JWT_SECRET = "secret"`
- `const ENCRYPTION_KEY = "your-256-bit-secret";`
- `const IV = Buffer.from('0000000000000000');`

These patterns:
1. ✅ Work immediately (no config needed)
2. ✅ Pass local tests
3. ❌ Are insecure in production
4. ❌ Vibe coders often don't know to replace them

**The Training Data Bias:**
- Tutorial code prioritizes "getting it working" over security
- Stack Overflow answers show minimal viable examples
- Documentation uses simple hardcoded values for clarity
- AI tools replicate these patterns without context about production risk

### Expected Tool Patterns (Hypothesis - awaiting Scanner data)

| Tool | Risk Level | Pattern |
|------|-----------|---------|
| Bolt | High | Generates "quick start" code with example keys, less likely to prompt for env vars |
| Cursor | Medium-High | Context-aware but inherits patterns from training data |
| Claude Code | Medium | More likely to comment "CHANGE THIS" but still generates placeholders |
| v0 | Medium | UI-focused, backend auth often has placeholder keys |
| Replit | Medium-High | Focuses on "working now" over production readiness |
| Copilot | Medium | Suggests from surrounding code context—if other code has hardcoded keys, suggests more |

**Detection Keywords for AI-Generated Patterns:**
- `JWT_SECRET = "secret"` or `= 'your-secret-key'`
- `ENCRYPTION_KEY = "your-256-bit-secret"`
- `const IV = Buffer.from('0000000000000000')`
- `secretOrPrivateKey: 'shhhhh'` (common jwt.sign() example)
- `crypto.createCipher('aes192', 'password')` (deprecated + hardcoded)

---

## 10. Code Examples to Include

### Example 1: Hardcoded JWT Secret (HS256)

**Vulnerable:**
```javascript
// ❌ VULNERABLE - Example key in production
const jwt = require('jsonwebtoken');

const JWT_SECRET = "secret"; // Placeholder from AI tool

function generateToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
}
```

**Secure:**
```javascript
// ✅ SECURE - Key from environment
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable must be set');
}

function generateToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
}
```

### Example 2: Hardcoded AES Encryption Key

**Vulnerable:**
```javascript
// ❌ VULNERABLE - Example key from tutorial
const crypto = require('crypto');

const ENCRYPTION_KEY = "your-256-bit-secret-key-here!!"; // 32 chars = 256 bits
const IV = Buffer.from('0000000000000000'); // Static IV

function encrypt(text) {
  const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, IV);
  return cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
}
```

**Secure:**
```javascript
// ✅ SECURE - Key from KMS, unique IV per encryption
const crypto = require('crypto');
const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');

async function getEncryptionKey() {
  const client = new SecretsManagerClient({ region: 'us-east-1' });
  const response = await client.send(
    new GetSecretValueCommand({ SecretId: 'myapp/encryption-key' })
  );
  return Buffer.from(response.SecretString, 'base64');
}

async function encrypt(text) {
  const key = await getEncryptionKey();
  const iv = crypto.randomBytes(16); // Unique IV for each encryption

  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  const encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');

  // Return IV + encrypted data (IV doesn't need to be secret)
  return iv.toString('hex') + ':' + encrypted;
}
```

### Example 3: Initialization Vector Reuse

**Vulnerable:**
```python
# ❌ VULNERABLE - Static IV reused for multiple encryptions
from Crypto.Cipher import AES

ENCRYPTION_KEY = b'sixteen byte key'
IV = b'0000000000000000'  # Reused for every encryption

def encrypt(data):
    cipher = AES.new(ENCRYPTION_KEY, AES.MODE_CBC, IV)
    return cipher.encrypt(data)
```

**Secure:**
```python
# ✅ SECURE - Unique IV per encryption, key from environment
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
import os

ENCRYPTION_KEY = os.environ['ENCRYPTION_KEY'].encode()

def encrypt(data):
    iv = get_random_bytes(16)  # New IV for each encryption
    cipher = AES.new(ENCRYPTION_KEY, AES.MODE_CBC, iv)
    ciphertext = cipher.encrypt(data)
    return iv + ciphertext  # Prepend IV to ciphertext
```

### Example 4: API Request Signing Key

**Vulnerable:**
```javascript
// ❌ VULNERABLE - Signing key in source code
const crypto = require('crypto');

const SIGNING_KEY = "my-api-signing-secret";

function signRequest(payload) {
  const hmac = crypto.createHmac('sha256', SIGNING_KEY);
  hmac.update(JSON.stringify(payload));
  return hmac.digest('hex');
}
```

**Secure:**
```javascript
// ✅ SECURE - Signing key from secrets manager
const crypto = require('crypto');

async function getSigningKey() {
  // Fetch from AWS Secrets Manager, HashiCorp Vault, etc.
  const key = process.env.API_SIGNING_KEY;
  if (!key) throw new Error('API_SIGNING_KEY must be set');
  return key;
}

async function signRequest(payload) {
  const signingKey = await getSigningKey();
  const hmac = crypto.createHmac('sha256', signingKey);
  hmac.update(JSON.stringify(payload));
  return hmac.digest('hex');
}
```

---

## 11. Detection Patterns

### GitLeaks Configuration Example

```toml
[[rules]]
id = "hardcoded-jwt-secret"
description = "Hardcoded JWT secret"
regex = '''(?i)(jwt_secret|jwtsecret|jwt.secret)\s*=\s*['"][^'"]{1,64}['"]'''
tags = ["jwt", "secret", "hardcoded"]

[[rules]]
id = "hardcoded-encryption-key"
description = "Hardcoded encryption key"
regex = '''(?i)(encryption_key|encryptionkey|crypto_key)\s*=\s*['"][^'"]{16,}['"]'''
tags = ["encryption", "key", "hardcoded"]

[[rules]]
id = "static-iv"
description = "Static initialization vector"
regex = '''(?i)(iv|init_vector|initialization_vector)\s*=\s*(Buffer\.from\(['"]0+['"]\)|['"]\x00+['"])'''
tags = ["iv", "crypto", "hardcoded"]
```

### Opengrep Rules (Semgrep Syntax)

```yaml
rules:
  - id: hardcoded-jwt-secret-node
    pattern: |
      jwt.sign(..., $SECRET, ...)
    metavariable-pattern:
      metavariable: $SECRET
      pattern: |
        "..."
    message: "Hardcoded JWT secret detected. Use environment variables."
    languages: [javascript, typescript]
    severity: ERROR

  - id: hardcoded-aes-key
    pattern: |
      crypto.createCipheriv($ALG, $KEY, ...)
    metavariable-pattern:
      metavariable: $KEY
      pattern: |
        "..."
    message: "Hardcoded encryption key detected. Use secrets manager."
    languages: [javascript, typescript]
    severity: ERROR
```

### Grep Patterns for Quick Check

```bash
# Find potential hardcoded JWT secrets
grep -r "JWT_SECRET.*=.*['\"]" --include="*.js" --include="*.ts"

# Find potential hardcoded encryption keys
grep -r "ENCRYPTION_KEY.*=.*['\"]" --include="*.js" --include="*.py"

# Find static IVs
grep -r "IV.*=.*Buffer\.from.*0000" --include="*.js"
grep -r "iv.*=.*b'0000" --include="*.py"

# Find common placeholder patterns
grep -r "secret.*=.*['\"]secret['\"]" --include="*.js" --include="*.py"
grep -r "your-.*-key" --include="*.js" --include="*.py"
```

---

## 12. FAQ Question Bank

### From PAA Research + Common Questions

1. **What is a hardcoded encryption key?**
   - Answer: A cryptographic key embedded directly in source code instead of stored securely in environment variables or a secrets manager.

2. **Why is hardcoding JWT secrets dangerous?**
   - Answer: If an attacker discovers your hardcoded JWT secret (through leaked source code or reverse engineering), they can forge valid authentication tokens and impersonate any user.

3. **How do I detect hardcoded keys in my code?**
   - Answer: Use secret scanning tools like GitLeaks, TruffleHog, or Opengrep. Search for patterns like `JWT_SECRET = "..."`, `ENCRYPTION_KEY = "..."`, or static initialization vectors.

4. **What's the difference between hardcoded secrets and hardcoded crypto keys?**
   - Answer: Hardcoded secrets are third-party credentials (API keys, database passwords). Hardcoded crypto keys are keys YOUR app uses for encryption, signing, or authentication (JWT secrets, AES keys).

5. **Should initialization vectors be hardcoded?**
   - Answer: No. IVs must be unique for each encryption operation. Reusing an IV with the same key allows attackers to perform pattern analysis and potentially recover plaintext.

6. **Can environment variables be compromised?**
   - Answer: Yes, environment variables are better than hardcoding but not foolproof. For sensitive production apps, use a dedicated secrets manager (AWS Secrets Manager, HashiCorp Vault).

7. **How do I store JWT secrets securely?**
   - Answer: Use environment variables (minimum), secrets managers (better), or Hardware Security Modules (HSMs) for high-security applications. Rotate keys regularly.

8. **Does React/Next.js protect against hardcoded keys?**
   - Answer: No. Next.js provides `process.env` for environment variables, but it won't stop you from hardcoding keys. You must actively avoid hardcoding and use `NEXT_PUBLIC_` prefix carefully (never for secrets).

9. **What happens if my hardcoded JWT secret leaks?**
   - Answer: An attacker can forge JWTs for any user, bypass authentication entirely, and access all protected resources. You must rotate the secret immediately and invalidate all existing tokens.

10. **Are AES-256 keys safe if hardcoded?**
    - Answer: No. Even strong algorithms like AES-256 are completely compromised if the key is exposed. The key must be kept secret—hardcoding it in source code defeats the entire purpose of encryption.

---

**Brief Status:** ✅ Complete - Ready for Writer Agent

**Next Steps:**
1. Dispatch Writer Agent with this brief + VIBESHIP-SECURITY-WRITER-AGENT-PROMPT.md
2. Writer creates full Svelte component following content formula
3. QA against qa-checklist.md
4. Publish to /kb/security/vulnerabilities/hardcoded-crypto-keys/

---

## Sources

- [OWASP A02:2021 - Cryptographic Failures](https://owasp.org/Top10/A02_2021-Cryptographic_Failures/)
- [CWE-321: Use of Hard-coded Cryptographic Key](https://cwe.mitre.org/data/definitions/321.html)
- [PortSwigger: JWT attacks](https://portswigger.net/web-security/jwt)
- [Semgrep: Hardcoded secrets and JWT mistakes](https://semgrep.dev/blog/2020/hardcoded-secrets-unverified-tokens-and-other-common-jwt-mistakes/)
- [Security Boulevard: The Ongoing Risks of Hardcoded JWT Keys](https://securityboulevard.com/2025/05/the-ongoing-risks-of-hardcoded-jwt-keys/)
- [Wallarm CVE-2025-20188: Risks of Hardcoded JWT Keys](https://lab.wallarm.com/cve-2025-20188-risks-hardcoded-jwt-keys/)
- [Balwurk: CVE-2023-27172 - Weak JWT Secret](https://balwurk.com/cve-2023-27172-weak-jwt-secret/)
- [SecureFlag: Reused IV-Key Pair Vulnerability](https://knowledge-base.secureflag.com/vulnerabilities/broken_cryptography/reused_iv_key_pair_vulnerability.html)
- [Android Developers: Hardcoded Cryptographic Secrets](https://developer.android.com/privacy-and-security/risks/hardcoded-cryptographic-secrets)
- [Fortify: Key Management - Hardcoded Encryption Key](https://vulncat.fortify.com/en/detail?id=desc.semantic.java.key_management_hardcoded_encryption_key)
- [Codacy: Managing the Risks of Hard-Coded Secrets](https://blog.codacy.com/hard-coded-secrets)
- [CloudAware: Yealink Hardcoded Secrets (WHY 2025)](https://cloudaware.eu/blog/yealink_why2025/)
- [Approov: How to Eliminate Hardcoded API Keys](https://approov.io/how-to-eliminate-hardcoded-api-keys-from-your-app)
- [GitLeaks Documentation](https://gitleaks.io/)
- [TruffleHog](https://trufflesecurity.com/trufflehog)
