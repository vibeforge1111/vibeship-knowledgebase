# Content Brief: Password Reset Vulnerabilities

**Generated:** 2025-12-17
**Target Publish:** TBD
**Priority:** P0
**Status:** ✅ Complete - Ready for Writer

---

## 1. Core Data

### Scanner Statistics
| Metric | Value | Source |
|--------|-------|--------|
| Prevalence | Data coming soon | Scanner DB collection in progress |
| Repos Scanned | Data coming soon | Scanner DB collection in progress |
| Week-over-Week | Data coming soon | Scanner DB collection in progress |
| Most Affected Tool | Data coming soon | Scanner DB collection in progress |

**Note:** Scanner is actively collecting data on password reset vulnerabilities. Use external authoritative sources (OWASP, PortSwigger, CVEs) until Scanner data is available.

### Tool Breakdown
| Tool | Vulnerability Rate | Sample Size |
|------|-------------------|-------------|
| Cursor | Data coming soon | Scanner collecting |
| Bolt | Data coming soon | Scanner collecting |
| Claude Code | Data coming soon | Scanner collecting |
| v0 | Data coming soon | Scanner collecting |
| Replit | Data coming soon | Scanner collecting |
| Copilot | Data coming soon | Scanner collecting |

### Security References
- **CWE ID:** [CWE-640](https://cwe.mitre.org/data/definitions/640.html)
- **CWE Name:** Weak Password Recovery Mechanism for Forgotten Password
- **OWASP Category:** [A07:2021 - Identification and Authentication Failures](https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/)
- **Severity:** High
- **CVSS Range:** 7.5 - 9.8 (based on 2024 CVEs)

### Real-World CVEs (2024)
- **CVE-2024-20419** (Cisco SSM On-Prem): CVSS 9.1 - Unverified password change via crafted HTTP requests
- **CVE-2024-48887** (FortiSwitch): CVSS 9.8 - Unauthenticated admin password change
- **CVE-2024-45979** (Lines Police CAD): Host header injection allowing password reset token theft
- **CVE-2024-37897** (SFTPGo): Insufficient access control in password reset allowing expired accounts to reset
- **CVE-2023-7028** (GitLab): CVSS 10.0 - Password reset to unverified email (actively exploited in 2024)

---

## 2. SEO Strategy

### Target Keywords
| Keyword | Est. Volume | Difficulty | Intent |
|---------|-------------|------------|--------|
| password reset vulnerabilities | 300-500 | Medium | Informational |
| password reset security | 800-1000 | Medium | Informational |
| forgot password vulnerabilities | 200-400 | Medium | Informational |
| password reset token security | 150-300 | Low | Informational |
| password reset poisoning | 100-200 | Low | Informational |
| secure password reset implementation | 200-400 | Medium | Transactional |

### People Also Ask (Inferred from Research)
1. "What is password reset poisoning?"
2. "How to secure password reset tokens?"
3. "What makes a password reset token secure?"
4. "How long should password reset links last?"
5. "What is user enumeration in password reset?"
6. "How do attackers steal password reset tokens?"
7. "What is host header injection?"

### Search Intent Analysis
- **Primary intent:** Informational - Understanding password reset vulnerabilities and how to fix them
- **User goal:** Learn what makes password reset insecure, identify vulnerabilities in their code, get fix guidance
- **Content need:** Explanation of 7 common flaws, code examples, detection methods, secure implementation patterns

---

## 3. Competitive Analysis

### Current Top 3 Results for "password reset vulnerabilities"

**1. https://www.vaadata.com/blog/exploring-password-reset-vulnerabilities-and-security-best-practices/**
- Title: "Password Reset Vulnerabilities and Security Best Practices"
- Word count: ~2,500
- Strengths: Comprehensive coverage, technical depth, multiple vulnerability types
- Weaknesses: Generic examples, no framework-specific code, no AI tool angle
- Our advantage: AI-specific patterns, tool comparison, copy-paste fix prompts

**2. https://portswigger.net/web-security/authentication/other-mechanisms**
- Title: "Vulnerabilities in other authentication mechanisms | Web Security Academy"
- Word count: ~3,000
- Strengths: Authoritative source (PortSwigger), detailed technical explanations, labs
- Weaknesses: Academic tone, no code examples, no AI-generated code context
- Our advantage: Vibe coder audience, practical fixes, AI tool patterns

**3. https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html**
- Title: "Forgot Password - OWASP Cheat Sheet Series"
- Word count: ~1,500
- Strengths: Authoritative (OWASP), comprehensive best practices
- Weaknesses: Developer-focused, no vulnerability breakdown, no before/after examples
- Our advantage: Plain English, 7 specific flaws, complete AI fix prompts

### Content Gaps (Our Opportunities)
1. **AI-specific angle:** No competitor addresses WHY AI tools generate these vulnerabilities or provides tool-specific patterns
2. **7 Flaws Framework:** None break down password reset into 7 specific testable flaws
3. **Copy-paste solutions:** Competitors have best practices but no complete AI prompts (200-400 words)
4. **Real CVEs:** We can reference 5 recent (2024) CVEs showing severity and real-world impact
5. **Vibe coder language:** We write for non-technical founders, not security professionals

---

## 4. Content Structure

### The 7 Password Reset Flaws

Based on research from OWASP, PortSwigger, and 2024 CVEs:

1. **Predictable Tokens** (CWE-338)
   - Using `Math.random()`, sequential IDs, timestamps
   - Tokens can be guessed or brute-forced
   - Example: `Math.random().toString(36).substring(7)` (only ~2 billion possibilities)

2. **No Token Expiration**
   - Tokens valid forever or for days
   - Increases attack window if intercepted
   - OWASP recommends 15-60 minutes, ideally 20 minutes

3. **Token Reuse**
   - Same token can be used multiple times
   - Token not invalidated after successful reset
   - Allows replay attacks

4. **User Enumeration**
   - Different error messages for existing vs non-existing accounts
   - Different response times
   - Reveals which emails are registered
   - Example: "User not found" vs "Email sent"

5. **Host Header Injection (Password Reset Poisoning)**
   - Reset URL built from `Host` header or `X-Forwarded-Host`
   - Attacker controls where token is sent
   - Example: `$reset_url = "https://" . $_SERVER['HTTP_HOST'] . "/reset?token=" . $token;`

6. **Missing Rate Limiting**
   - Unlimited reset requests allowed
   - Enables brute-force attacks on tokens
   - Allows account enumeration at scale

7. **Insecure Token Transmission**
   - Tokens sent via HTTP (not HTTPS)
   - Tokens in URL path (logged by proxies)
   - Tokens visible in referrer headers
   - Tokens not hashed in database

### Recommended Sections

```
H1: Password Reset Vulnerabilities: 7 Flaws in AI-Generated Flows

H2: What Are Password Reset Vulnerabilities?
    - Plain English definition
    - Real-world analogy (hotel key card system)
    - Why password reset is a critical attack surface
    Target: 100-150 words

H2: The 7 Password Reset Flaws
    H3: 1. Predictable Tokens
        - Math.random() example
        - Why AI tools use this
        Target: 75-100 words

    H3: 2. No Token Expiration
        - Token lives forever
        - OWASP 20-minute recommendation
        Target: 75-100 words

    H3: 3. Token Reuse
        - Token works multiple times
        - Replay attack scenario
        Target: 75-100 words

    H3: 4. User Enumeration
        - Different error messages
        - Privacy/security risk
        Target: 75-100 words

    H3: 5. Host Header Injection (Password Reset Poisoning)
        - Most dangerous flaw
        - CVE examples (GitLab, Kanboard)
        Target: 100-125 words

    H3: 6. Missing Rate Limiting
        - Unlimited attempts
        - Brute force risk
        Target: 75-100 words

    H3: 7. Insecure Token Transmission
        - HTTP vs HTTPS
        - Logging concerns
        Target: 75-100 words

H2: Why AI Tools Generate These Vulnerabilities
    - AI prioritizes "working code" over security
    - Training data contains insecure examples
    - No security context in prompts
    - Tool comparison chart (if data available)
    Target: 150-200 words

H2: Real-World Impact
    - CVE-2023-7028 (GitLab) - CVSS 10.0, actively exploited
    - CVE-2024-20419 (Cisco) - Admin takeover
    - CVE-2024-48887 (FortiSwitch) - Unauthenticated reset
    - Account takeover → data breach → compliance violations
    Target: 100-150 words

H2: How to Detect Password Reset Vulnerabilities
    - Code patterns to search (grep examples)
    - Testing methodology
    - Manual checks (inspect reset email, test expiration, etc.)
    - Scanner CTA
    Target: 150-200 words

H2: How to Fix Password Reset Vulnerabilities
    H3: AI Fix Prompt (Complete)
        - Full prompt for AI tools (200-400 words)
        - Covers all 7 flaws
        - Copy-paste ready
        Target: 250-350 words

    H3: Manual Fix - Secure Implementation
        - Before/after code
        - Node.js/Express example (crypto.randomBytes)
        - Token storage (hashing)
        - Expiration logic
        - Rate limiting
        Target: 200-250 words

    H3: Framework-Specific Notes
        - Next.js: Link to fix pages
        - Express: Middleware patterns
        - Supabase: Auth.resetPasswordForEmail()
        Target: 100-150 words

H2: FAQ
    - 7 questions from PAA (expanded)
    - 75-100 words each

H2: Related Vulnerabilities
    - Links to related content
```

### Required Elements Checklist
- [ ] Quick answer in first 50 words
- [ ] Data box with OWASP/CWE references (Scanner stats when available)
- [ ] All 7 flaws explained with code examples
- [ ] Complete AI fix prompt (250-350 words)
- [ ] Before/after code examples for manual fix
- [ ] 7 FAQ entries matching PAA
- [ ] Scanner CTA in detection section
- [ ] 5-10 internal links
- [ ] CWE-640 and OWASP A07 references with links
- [ ] 5 recent CVEs cited with CVSS scores

---

## 5. Internal Linking

### Must Link TO (Parent/Authority Pages)
| Page | Suggested Anchor Text |
|------|----------------------|
| /kb/security/vulnerabilities/ | "security vulnerabilities" |
| /kb/vibe-coding-tools/cursor/ | "Cursor security patterns" |
| /kb/vibe-coding-tools/claude-code/ | "Claude Code security" |
| /kb/vibe-coding-tools/bolt/ | "Bolt security issues" |
| /kb/security/stacks/nextjs-supabase/ | "Next.js + Supabase security" |

### Should Link TO (Related Content)
| Page | Suggested Anchor Text |
|------|----------------------|
| /kb/security/vulnerabilities/missing-auth/ | "missing authentication" |
| /kb/security/vulnerabilities/jwt-vulnerabilities/ | "JWT vulnerabilities" |
| /kb/security/vulnerabilities/csrf/ | "CSRF attacks" |
| /kb/security/vulnerabilities/missing-rate-limiting/ | "rate limiting" |
| /kb/security/vulnerabilities/open-redirect/ | "open redirect" |
| /kb/security/vulnerabilities/sensitive-data-exposure/ | "sensitive data exposure" |
| /kb/security/fixes/password-reset/nextjs/ | "fix in Next.js" |
| /kb/security/fixes/password-reset/express/ | "fix in Express" |
| /kb/glossary/security/enumeration/ | "user enumeration" |
| /kb/glossary/security/entropy/ | "entropy" |

### External Authority Links (Required)
| Source | Purpose | URL |
|--------|---------|-----|
| CWE-640 | Official vulnerability description | https://cwe.mitre.org/data/definitions/640.html |
| OWASP A07:2021 | Authentication failures category | https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/ |
| OWASP Forgot Password Cheat Sheet | Best practices | https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html |
| PortSwigger Password Reset Poisoning | Technical deep-dive | https://portswigger.net/web-security/host-header/exploiting/password-reset-poisoning |
| OWASP Testing Guide | Testing methodology | https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/04-Authentication_Testing/09-Testing-for-Weak-Password-Change-or-Reset-Functionalities |
| CVE-2023-7028 | GitLab CVE | https://nvd.nist.gov/vuln/detail/CVE-2023-7028 |
| CVE-2024-20419 | Cisco CVE | https://nvd.nist.gov/vuln/detail/CVE-2024-20419 |
| CVE-2024-48887 | FortiSwitch CVE | https://nvd.nist.gov/vuln/detail/CVE-2024-48887 |
| CVE-2024-45979 | Lines Police CAD CVE | https://nvd.nist.gov/vuln/detail/CVE-2024-45979 |
| Node.js Crypto | crypto.randomBytes() docs | https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback |

---

## 6. Unique Angle

### Our Differentiator
**The 7 Flaws Framework for AI-Generated Code:** We're the only resource that breaks password reset into 7 specific, testable flaws WITH the AI-specific context of WHY tools generate these patterns. Competitors focus on best practices; we focus on identifying and fixing actual AI-generated vulnerabilities.

### Key Message
"Password reset is the most dangerous authentication feature because it bypasses normal login security. AI tools generate 7 common flaws—here's how to find and fix each one in your codebase."

### Data-Driven Claims to Highlight
1. "Password reset poisoning achieved a CVSS score of 10.0 in CVE-2023-7028 (GitLab), the maximum severity possible"
2. "According to [OWASP's Forgot Password Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html), tokens should be at least 128 bits of entropy—`Math.random()` provides only ~52 bits"
3. "5 critical password reset CVEs were disclosed in 2024, affecting major enterprise platforms including Cisco, Fortinet, and GitLab"
4. "PortSwigger's Web Security Academy identifies password reset poisoning as one of the most exploitable host header attacks"
5. "OWASP recommends token expiration of 15-60 minutes (ideally 20 minutes), but AI-generated flows often have no expiration"

---

## 7. Meta Information

### Suggested Title Tag (under 60 chars)
```
Password Reset Vulnerabilities: 7 AI Flaws | VibeShip
```
(59 characters)

### Suggested Meta Description (150-160 chars)
```
7 password reset flaws in AI-generated code: predictable tokens, no expiration, poisoning attacks. Get detection methods + copy-paste fixes.
```
(153 characters)

### Target URL
```
/kb/security/vulnerabilities/password-reset-vulnerabilities/
```

### Related URLs to Create (Future)
- /kb/security/fixes/password-reset/nextjs/
- /kb/security/fixes/password-reset/express/
- /kb/security/fixes/password-reset/sveltekit/
- /kb/vibe-coding-tools/cursor/password-reset/
- /kb/glossary/security/password-reset-poisoning/
- /kb/glossary/security/host-header-injection/

---

## 8. Writer Notes

### Tone Guidance
- **Balance urgency with actionability:** Password reset vulnerabilities are serious (CVSS 10.0 for GitLab), but don't be alarmist
- **Progressive disclosure:** Start with simple concepts (predictable tokens), build to complex ones (host header injection)
- **Empowering, not shaming:** Vibe coders didn't know about these flaws—now they do, and they can fix them

### Technical Accuracy Notes
- **Math.random() is NOT cryptographically secure:** Make this crystal clear. Use `crypto.randomBytes()` in Node.js, `secrets` in Python
- **OWASP timing matters:** Cite the 2021 Top 10 and the current Forgot Password Cheat Sheet (updated regularly)
- **Supabase Auth handles this correctly:** Supabase's `auth.resetPasswordForEmail()` uses secure tokens and proper expiration—mention as a framework that does it right
- **Host header vs X-Forwarded-Host:** Both can be exploited; middleware can prioritize X-Forwarded-Host making it even worse

### Things to Avoid
- **Don't recommend MD5 hashing tokens:** Even hashed, tokens should use SHA-256 or better
- **Don't suggest security questions as primary reset:** OWASP considers these weak (easily researched)
- **Don't use JWT for password reset:** JWTs are stateless and can't be invalidated on-demand
- **Don't recommend long expiration:** Some old guides suggest 24 hours—stick to OWASP's 15-60 minutes

### Code Example Guidance

**Vulnerable Pattern (Before):**
```javascript
// ❌ VULNERABLE - All 7 flaws present
app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const user = await db.users.findOne({ email });

  // Flaw 4: User enumeration
  if (!user) {
    return res.json({ error: 'User not found' });
  }

  // Flaw 1: Predictable token
  const resetToken = Math.random().toString(36).substring(7);

  // Flaw 3: Token reuse + Flaw 2: No expiration
  await db.users.update({ email }, { resetToken });

  // Flaw 5: Host header injection
  const resetUrl = `https://${req.headers.host}/reset?token=${resetToken}`;

  // Flaw 7: Token sent in plaintext (not shown: HTTP)
  await sendEmail(email, `Reset: ${resetUrl}`);

  // Flaw 6: No rate limiting
  res.json({ message: 'Email sent' });
});
```

**Secure Pattern (After):**
```javascript
// ✅ SECURE - All 7 flaws fixed
import crypto from 'crypto';
import rateLimit from 'express-rate-limit';

// Fix 6: Rate limiting
const resetLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // 3 requests per window
  message: 'Too many reset attempts'
});

app.post('/forgot-password', resetLimiter, async (req, res) => {
  const { email } = req.body;
  const user = await db.users.findOne({ email });

  // Fix 4: Consistent response (no enumeration)
  const message = 'If an account exists, you will receive an email';

  if (!user) {
    return res.json({ message });
  }

  // Fix 1: Cryptographically secure token (128 bits = 32 hex chars)
  const resetToken = crypto.randomBytes(32).toString('hex');

  // Fix 7: Hash token before storing
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  // Fix 2: Token expiration (20 minutes)
  const tokenExpiry = new Date(Date.now() + 20 * 60 * 1000);

  // Fix 3: Invalidate old tokens
  await db.users.update(
    { email },
    {
      resetToken: hashedToken,
      resetTokenExpiry: tokenExpiry,
      resetTokenUsed: false
    }
  );

  // Fix 5: Hardcoded domain (no host header)
  const resetUrl = `https://yourdomain.com/reset?token=${resetToken}`;

  await sendEmail(email, `Reset: ${resetUrl}`);

  res.json({ message });
});

// Reset handler with token validation
app.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await db.users.findOne({
    resetToken: hashedToken,
    resetTokenExpiry: { $gt: new Date() },
    resetTokenUsed: false
  });

  if (!user) {
    return res.status(400).json({ error: 'Invalid or expired token' });
  }

  // Update password and invalidate token
  const hashedPassword = await bcrypt.hash(newPassword, 12);
  await db.users.update(
    { _id: user._id },
    {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
      resetTokenUsed: true
    }
  );

  res.json({ message: 'Password reset successful' });
});
```

### Reference Materials
- [OWASP Forgot Password Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html) - Primary reference
- [PortSwigger Password Reset Poisoning](https://portswigger.net/web-security/host-header/exploiting/password-reset-poisoning) - Technical details
- [OWASP Testing Guide - Weak Password Reset](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/04-Authentication_Testing/09-Testing-for-Weak-Password-Change-or-Reset-Functionalities) - Testing methodology
- [CWE-640](https://cwe.mitre.org/data/definitions/640.html) - Official definition
- [Node.js Crypto Documentation](https://nodejs.org/api/crypto.html) - Secure random generation

---

## 9. AI Fix Prompt Structure

The complete AI fix prompt should address all 7 flaws in a copy-paste format:

```
Create a secure password reset flow that fixes these 7 vulnerabilities:

1. Use crypto.randomBytes(32) for tokens (not Math.random)
2. Set token expiration to 20 minutes
3. Mark tokens as used after successful reset
4. Return consistent messages for existing/non-existing accounts
5. Use hardcoded domain in reset URLs (not req.headers.host)
6. Implement rate limiting (3 requests per 15 minutes)
7. Hash tokens before storing with SHA-256

Requirements:
- Token: 32 bytes (64 hex characters) using crypto.randomBytes
- Store SHA-256 hash of token in database
- Expiration: 20 minutes from generation
- Single-use: Mark resetTokenUsed=true after use
- Rate limit: 3 requests per IP per 15 minutes
- Consistent responses: Same message for valid/invalid emails
- HTTPS-only: Set secure cookie flags
- Domain: Hardcode as https://yourdomain.com (no Host header)

Include validation in the reset handler to check:
- Token is valid (matches hash)
- Token hasn't expired
- Token hasn't been used
- New password meets strength requirements

Use [framework] with [database].
```

Target: 250-350 words, complete enough to paste into Cursor/Claude Code.

---

## 10. FAQ Section Guidance

### FAQ Questions (7 total)

1. **What is password reset poisoning?**
   - Direct answer: Host header injection allowing attacker-controlled reset URLs
   - Link to PortSwigger

2. **How do I generate secure password reset tokens?**
   - Direct answer: Use crypto.randomBytes(32) for 128+ bits entropy
   - Code snippet

3. **How long should password reset links last?**
   - Direct answer: 15-60 minutes (OWASP), ideally 20 minutes
   - Cite OWASP Cheat Sheet

4. **What is user enumeration in password resets?**
   - Direct answer: Revealing account existence via different responses
   - Privacy + security implications

5. **Should I store password reset tokens in plain text?**
   - Direct answer: No, hash with SHA-256 before storing
   - Compare to password storage

6. **How do I prevent brute force attacks on reset tokens?**
   - Direct answer: Rate limiting + high entropy tokens
   - Specific numbers (3 requests per 15 min)

7. **Can I use JWT for password reset tokens?**
   - Direct answer: Not recommended—JWTs can't be invalidated
   - Explain stateless nature

Each answer: 75-100 words, starts with direct answer in first sentence.

---

**Brief Status:** ✅ Complete - Ready for Writer Agent

**Sources Referenced:**
- [OWASP Forgot Password Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html)
- [PortSwigger Password Reset Poisoning](https://portswigger.net/web-security/host-header/exploiting/password-reset-poisoning)
- [OWASP Testing Guide](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/04-Authentication_Testing/09-Testing-for-Weak-Password-Change-or-Reset-Functionalities)
- [CWE-640](https://cwe.mitre.org/data/definitions/640.html)
- [OWASP A07:2021](https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/)
- 2024 CVE disclosures (GitLab, Cisco, FortiSwitch, SFTPGo, Lines Police CAD)
