# Content Brief: Account Takeover Patterns

**Generated:** 2025-12-17
**Target Publish:** 2025-12-20
**Priority:** P0 (Critical Security Vulnerability - Consolidating Article)
**Status:** Ready for Writer

---

## 1. Core Data

### Scanner Statistics
**NOTE:** Scanner data collection in progress. Use external sources until available.

| Metric | Value | Source |
|--------|-------|--------|
| Prevalence | TBD | Scanner DB (pending) |
| Repos Scanned | TBD | Scanner DB (pending) |
| Week-over-Week | TBD | Scanner DB (pending) |
| Most Affected Tool | TBD | Scanner DB (pending) |

### Tool Breakdown
**NOTE:** To be populated when Scanner data available.

| Tool | Vulnerability Rate | Sample Size |
|------|-------------------|-------------|
| Cursor | TBD | TBD |
| Bolt | TBD | TBD |
| Claude Code | TBD | TBD |
| v0 | TBD | TBD |
| Replit | TBD | TBD |
| Copilot | TBD | TBD |

### Security References
- **CWE ID:** CWE-306
- **CWE Name:** Missing Authentication for Critical Function
- **Related CWEs:** CWE-287 (Improper Authentication), CWE-384 (Session Fixation), CWE-307 (Improper Restriction of Excessive Authentication Attempts), CWE-798 (Use of Hard-coded Credentials)
- **OWASP Category:** A07:2021 - Identification and Authentication Failures
- **Severity:** Critical
- **CVSS Range:** 7.5-9.8 (High-Critical depending on data exposure)

### Real-World Impact Statistics

**FBI IC3 Data (2025):**
- 5,100+ complaints reporting ATO fraud since January 2025
- **$262 million in losses** from business email compromise (BEC) via account takeover
- Source: [FBI IC3 PSA](https://www.ic3.gov/PSA/2025/PSA251125)

**Industry Statistics (2024):**
- **2.1 billion credentials** stolen by infostealers in 2024
- **80% of Fortune 1000 companies** experienced at least one compromised account
- **24% year-over-year increase** in ATO incidents in 2024
- **$2.77 billion** in business email compromise losses reported to FBI in 2024
- **30% of U.S. adults** were victims of ATO fraud in 2023
- Source: [Rapyd](https://www.rapyd.net/blog/account-takeover-attacks/), [Undercode Testing](https://undercodetesting.com/the-account-takeover-bomb-deconstructing-a-critical-password-reset-vulnerability/)

**MFA Bypass Statistics:**
- **50% of Cisco Talos incident responses** in Q1 2024 involved MFA bypass attacks
- Source: [Astra Security](https://www.getastra.com/blog/dast/mfa-bypass-risks/)

---

## 2. SEO Strategy

### Target Keywords
| Keyword | Est. Volume | Difficulty | Intent |
|---------|-------------|------------|--------|
| account takeover | 3,600 | 51 | Informational |
| account takeover prevention | 500 | 45 | Informational/Transactional |
| account takeover attack | 800 | 48 | Informational |
| ato attack | 400 | 42 | Informational |
| account security | 2,400 | 55 | Informational |
| password reset vulnerability | 300 | 40 | Informational |
| session hijacking | 1,200 | 47 | Informational |
| mfa bypass | 600 | 43 | Informational |
| sim swapping attack | 900 | 44 | Informational |

### People Also Ask
1. "What is account takeover and how does it work?"
2. "How do hackers take over accounts?"
3. "What is the most common type of account takeover?"
4. "How do I protect my account from being taken over?"
5. "Can MFA prevent account takeover?"
6. "What is the difference between account takeover and identity theft?"
7. "How do I know if my account has been taken over?"
8. "What should I do if my account is taken over?"

### Search Intent Analysis
- **Primary intent:** Informational - understanding ATO attack vectors and comprehensive prevention
- **User goal:** Protect authentication systems from the full spectrum of account takeover techniques
- **Content need:** Comprehensive guide covering all 10 attack patterns with detection and prevention for each, targeting developers building auth systems with AI tools

---

## 3. Competitive Analysis

### Current Top 3 Results for "account takeover"

**1. https://www.vectra.ai/topics/account-takeover**
- Title: "Account Takeover: Complete Defense Guide"
- Word count: ~2,800
- Strengths: Comprehensive coverage of attack types, good explanations of detection methods (anomaly detection, impossible travel)
- Weaknesses: Enterprise-focused (EDR/XDR tools), no developer implementation guidance, missing AI tool context, no code examples
- Our advantage: Developer-focused, AI tool patterns, copy-paste code, vibe coder audience

**2. https://book.hacktricks.xyz/pentesting-web/account-takeover**
- Title: "Account Takeover - HackTricks"
- Word count: ~3,500
- Strengths: Extremely comprehensive attack taxonomy, technical depth, real HackerOne report examples
- Weaknesses: Pentester perspective (not developer defense), no prevention code, overwhelming detail
- Our advantage: Defense-focused, practical prevention code, plain English for non-security developers

**3. https://www.zoho.com/eprotect/articles/account-takeover-types-and-prevention.html**
- Title: "Account takeover: types, detection, and prevention measures"
- Word count: ~2,200
- Strengths: Good categorization of attack types, mentions device fingerprinting and anomaly detection
- Weaknesses: Vendor-focused (Zoho product promotion), generic advice, no specific implementation guidance
- Our advantage: Neutral perspective, framework-specific code, AI tool angle

### Content Gaps (Our Opportunities)
1. **AI Tool Context:** No competitor explains why AI-generated auth is vulnerable to ATO (focuses on functionality, skips security layers)
2. **Consolidating Hub:** No single article covers ALL 10 attack patterns with links to deeper content
3. **Developer Implementation:** Missing practical code for detection (impossible travel, device fingerprinting, anomaly detection)
4. **Prevention Matrix:** No clear mapping of which defenses block which attacks
5. **Vibe Coder Focus:** None target non-technical founders building with AI tools
6. **Password Reset Hijacking:** Underserved topic with critical vulnerabilities (Host header manipulation, token exposure)

---

## 4. Content Structure

### Article Type: CONSOLIDATING PILLAR

This article serves as the **comprehensive hub** for account takeover attacks, linking to more detailed articles for each attack pattern.

### Recommended Sections

```
H1: Account Takeover: 10 Attack Patterns in AI-Generated Auth

QUICK ANSWER BOX (under 50 words)
    - What account takeover is
    - Why AI-generated auth is vulnerable
    - Key FBI statistic ($262M losses)

H2: What is Account Takeover?
    - Plain English definition: Unauthorized access to user accounts
    - Real-world analogy: Hotel room key theft
    - CWE-306 + OWASP A07:2021 references
    - Concrete consequences: Data theft, fraud, reputation damage
    - FBI IC3 statistic: 5,100+ complaints, $262M losses (2025)
    Target: 100-150 words

H2: Why AI Tools Generate Vulnerable Auth
    - AI creates working login/registration - mission complete
    - Missing: Session management, MFA, rate limiting, monitoring
    - Pattern: Basic email/password with no security layers
    - "It authenticates" vs "It's secure"
    - Why AI skips defense-in-depth (not required for functionality)
    Target: 150-200 words

H2: The 10 Account Takeover Attack Patterns
    Brief overview of all 10 with link to detail section/article
    Target: 100-150 words

H2: Attack Pattern 1 - Credential Stuffing
    - What it is (testing leaked passwords at scale)
    - How it works (botnets + breach databases)
    - Why AI auth is vulnerable (no rate limiting, no breach checking)
    - Link to detailed credential-stuffing article
    - Quick fix: Rate limiting + HaveIBeenPwned integration
    Target: 150-200 words

H2: Attack Pattern 2 - Password Reset Hijacking
    - What it is (manipulating password reset flow)
    - Attack vectors:
      * Host header manipulation (attacker.com receives reset link)
      * X-Forwarded-For/Referrer/Origin header injection
      * Token exposure in API responses
      * Reset token not bound to user session
    - Why AI auth is vulnerable (basic reset flow, no token binding)
    - Real-world example: PeopleGIS 86 S3 buckets exposed (CWE-306)
    - Detection: Monitor reset token usage, validate Host header
    - Fix: Bind tokens to session, validate all headers, never expose tokens in responses
    Target: 200-250 words

H2: Attack Pattern 3 - Session Hijacking (Token Theft)
    - What it is (stealing active session tokens)
    - Attack vectors:
      * XSS attacks stealing cookies
      * Man-in-the-middle on public WiFi
      * Session token interception
    - Why AI auth is vulnerable (no secure cookie flags, no token rotation)
    - Detection: Monitor session anomalies (IP changes, impossible travel)
    - Fix: HttpOnly/Secure/SameSite cookies, short-lived tokens, device fingerprinting
    Target: 150-200 words

H2: Attack Pattern 4 - Session Fixation
    - What it is (attacker sets session ID before victim logs in)
    - How it differs from hijacking (fixation = pre-authentication)
    - Why AI auth is vulnerable (no session ID regeneration on login)
    - OWASP A07:2021 + CWE-384 reference
    - Fix: Always regenerate session ID after authentication
    Target: 100-150 words

H2: Attack Pattern 5 - OAuth Flow Attacks
    - What it is (authorization code interception/injection)
    - Attack vectors:
      * Authorization code interception (no TLS on redirect)
      * Custom URL schemes (MyApp://) hijacked by malicious apps
      * CSRF attacks initiating unauthorized OAuth flows
    - Why public clients are vulnerable (no client secret)
    - PKCE (Proof Key for Code Exchange) protection
    - Why AI tools skip PKCE (complexity, not required for basic flow)
    - OWASP recommendation: PKCE mandatory for public clients
    - Fix: Implement PKCE, validate redirect URIs, use state parameter
    Target: 200-250 words

H2: Attack Pattern 6 - MFA Bypass
    - What it is (circumventing multi-factor authentication)
    - Attack vectors:
      * SMS interception (SS7 protocol exploit)
      * SIM swapping (carrier social engineering)
      * MFA fatigue attacks (repeated prompts until user approves)
      * Adversary-in-the-Middle (Evilginx phishing)
      * Device code phishing (Microsoft 365 token interception)
    - FBI/CISA warning (Dec 2024): Do not use SMS for MFA
    - Cisco Talos: 50% of incidents involved MFA bypass (Q1 2024)
    - Real-world: SEC Twitter hack via SIM swap, Change Healthcare breach (192.7M records)
    - Why AI auth is vulnerable (no MFA implementation at all, or SMS-based)
    - Fix: FIDO2/hardware keys, disable SMS fallbacks, rate limit MFA attempts
    Target: 250-300 words

H2: Attack Pattern 7 - Social Engineering (Phishing)
    - What it is (tricking users into revealing credentials)
    - Attack vectors:
      * Phishing emails mimicking legitimate services
      * Fake login pages (typosquatting domains)
      * SEO poisoning (malicious ads in search results)
    - FBI warning: SEO poisoning via fraudulent ads
    - Why user education matters (technical defenses can't stop willing disclosure)
    - Detection: Monitor for unusual login patterns after phishing campaigns
    - Fix: User training, email authentication (SPF/DKIM/DMARC), phishing-resistant MFA
    Target: 150-200 words

H2: Attack Pattern 8 - SIM Swapping
    - What it is (transferring phone number to attacker-controlled SIM)
    - How it works (social engineering mobile carriers)
    - Why it's effective (bypasses SMS-based MFA and account recovery)
    - Real-world: SEC Twitter account hack (no MFA enabled)
    - Detection: Alert users on SIM changes, require re-authentication
    - Fix: Don't use SMS for MFA, require additional verification for SIM changes
    Target: 100-150 words

H2: Attack Pattern 9 - Email Account Compromise (EAC)
    - What it is (taking over email account to reset other passwords)
    - Why it's critical (email = master key to all accounts)
    - Attack vectors:
      * Weak email passwords
      * Email provider vulnerabilities
      * Password reset loops (reset email → reset all accounts)
    - FBI statistic: $2.77B in BEC losses via email takeover
    - Detection: Monitor email forwarding rules, unusual email access patterns
    - Fix: Strong email security, separate recovery email, email MFA
    Target: 150-200 words

H2: Attack Pattern 10 - Support Desk Manipulation (Help Desk Social Engineering)
    - What it is (convincing support staff to reset credentials)
    - Attack vectors:
      * Pretexting (believable story)
      * Caller ID spoofing
      * Using publicly available information to answer security questions
    - Why it bypasses technical controls (human element)
    - Real-world prevalence (common in enterprise environments)
    - Detection: Require callback verification to registered phone numbers
    - Fix: Strict identity verification procedures, video verification, manager approval for high-risk resets
    Target: 150-200 words

H2: Account Takeover Detection Methods
    H3: Impossible Travel Detection
        - What it is (login from Paris then Sydney in 20 minutes)
        - How it works (compare timestamps + IP geolocation)
        - False positives: VPNs, mobile networks
        - When to alert: Different devices + impossible timeframe
        - Code concept example
        Target: 100-150 words

    H3: Device Fingerprinting
        - What it is (unique identifier from browser/device attributes)
        - Collected data: OS, browser, screen resolution, fonts, plugins
        - Use case: Flag logins from unrecognized devices
        - Libraries: Fingerprint.com, FingerprintJS
        - Privacy considerations
        Target: 100-150 words

    H3: Behavioral Anomaly Detection
        - What it is (monitoring for unusual patterns)
        - Signals: Typing speed, mouse movements, navigation patterns
        - Use case: Detect when attacker uses stolen session
        - Machine learning approach
        Target: 75-100 words

    H3: Velocity Signals
        - What it is (tracking frequency of actions)
        - Patterns: Rapid login attempts, high IP address changes
        - Use case: Detect credential stuffing, session replay
        Target: 50-75 words

H2: Account Takeover Prevention Matrix
    Table format showing which defenses block which attacks

    | Attack Pattern | MFA | Rate Limiting | CAPTCHA | Device Fingerprinting | Session Regeneration | PKCE | Email Security |
    |---|---|---|---|---|---|---|---|
    | Credential Stuffing | ✅ | ✅ | ✅ | ✅ | - | - | - |
    | Password Reset Hijacking | - | - | - | - | - | - | ✅ |
    | Session Hijacking | ✅ | - | - | ✅ | ✅ | - | - |
    | Session Fixation | - | - | - | - | ✅ | - | - |
    | OAuth Attacks | - | - | - | - | - | ✅ | - |
    | MFA Bypass | ✅* | ✅ | - | ✅ | - | - | - |
    | Phishing | ✅* | - | - | - | - | - | ✅ |
    | SIM Swapping | ✅* | - | - | - | - | - | - |
    | Email Takeover | ✅ | - | - | - | - | - | ✅ |
    | Support Desk | - | - | - | - | - | - | - |

    *FIDO2/hardware keys only, not SMS

    Target: 150-200 words of explanation

H2: How to Fix Account Takeover Vulnerabilities
    H3: AI Fix Prompt
        - Complete prompt (200-400 words) to audit auth system
        - What to check for in existing code
        - Scanner CTA
    H3: Quick Wins (Priority Order)
        1. Implement MFA (FIDO2 preferred)
        2. Regenerate session IDs on login
        3. Add rate limiting (per-IP and per-account)
        4. Implement impossible travel detection
        5. Secure password reset flow (validate headers, bind tokens)
        6. Add PKCE to OAuth flows
        7. Monitor for anomalies
        8. Train support staff on social engineering
    H3: Framework-Specific Guides
        - Next.js + Supabase (link to stack guide)
        - Express + PostgreSQL
        - SvelteKit + Supabase (link to stack guide)

H2: FAQ
    - Use PAA questions from Section 2
    - 50-100 words each
    - Direct answer first sentence
    - Include citable facts

H2: Related Security Vulnerabilities
    - Credential Stuffing (link to detailed article)
    - Session Fixation (if separate article exists)
    - OAuth Vulnerabilities (if separate article exists)
    - MFA Bypass (if separate article exists)
    - Password Reset Vulnerabilities
    - Missing Authentication (link)
    - JWT Vulnerabilities (link)
```

### Required Elements Checklist
- [ ] Quick answer in first 50 words
- [ ] OWASP A07:2021 reference with link
- [ ] CWE-306 reference with link
- [ ] FBI IC3 statistic ($262M losses, 5,100+ complaints)
- [ ] All 10 attack patterns covered (150-250 words each)
- [ ] Prevention matrix table (which defenses block which attacks)
- [ ] Detection methods (impossible travel, device fingerprinting, anomaly detection)
- [ ] AI fix prompt (200-400 words)
- [ ] 8 FAQ entries matching PAA
- [ ] Scanner CTA
- [ ] 10-15 internal links (to detailed vulnerability articles)
- [ ] 15-20 external links (OWASP, CWE, FBI, research sources)

---

## 5. Internal Linking

### Must Link TO (Parent/Authority Pages)
| Page | Suggested Anchor Text |
|------|----------------------|
| /kb/security/vulnerabilities/ | "security vulnerabilities" |
| /kb/security/vulnerabilities/credential-stuffing/ | "credential stuffing" |
| /kb/security/vulnerabilities/missing-auth/ | "missing authentication" |
| /kb/security/vulnerabilities/jwt-vulnerabilities/ | "JWT vulnerabilities" |
| /kb/security/vulnerabilities/xss/ | "XSS attacks" |
| /kb/security/vulnerabilities/csrf/ | "CSRF attacks" |

### Should Link TO (Related Content)
| Page | Suggested Anchor Text |
|------|----------------------|
| /kb/vibe-coding-tools/cursor/ | "Cursor security patterns" |
| /kb/vibe-coding-tools/bolt/ | "Bolt security patterns" |
| /kb/vibe-coding-tools/claude-code/ | "Claude Code security patterns" |
| /kb/security/stacks/nextjs-supabase/ | "Next.js + Supabase security" |
| /kb/security/stacks/sveltekit-supabase/ | "SvelteKit + Supabase security" |
| /kb/security/vulnerabilities/missing-rate-limiting/ | "rate limiting" |

### External Authority Links
| Source | Purpose | Tier |
|--------|---------|------|
| [CWE-306](https://cwe.mitre.org/data/definitions/306.html) | Missing Authentication for Critical Function | 1 |
| [OWASP A07:2021](https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/) | Identification and Authentication Failures | 1 |
| [CWE-287](https://cwe.mitre.org/data/definitions/287.html) | Improper Authentication | 1 |
| [CWE-384](https://cwe.mitre.org/data/definitions/384.html) | Session Fixation | 1 |
| [FBI IC3 PSA](https://www.ic3.gov/PSA/2025/PSA251125) | Account Takeover Fraud Statistics (2025) | 3 |
| [OWASP OAuth2 Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/OAuth2_Cheat_Sheet.html) | OAuth security best practices | 1 |
| [OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html) | Session security guidance | 1 |
| [RFC 7636 - PKCE](https://tools.ietf.org/html/rfc7636) | Proof Key for Code Exchange specification | 1 |
| [PortSwigger Authentication](https://portswigger.net/web-security/authentication) | Authentication vulnerabilities deep-dive | 2 |
| [Fingerprint.com](https://fingerprint.com/account-takeover/) | Device fingerprinting for ATO prevention | 6 |
| [Impossible Travel Detection](https://fingerprint.com/blog/impossible-travel-detection/) | Impossible travel implementation guide | 6 |
| [1Password Blog - SMS MFA Risks](https://blog.1password.com/sms-based-mfa-risks/) | Why SMS-based MFA is vulnerable | 2 |
| [Astra - MFA Bypass Risks 2025](https://www.getastra.com/blog/dast/mfa-bypass-risks/) | MFA bypass techniques and statistics | 2 |
| [Vectra - Account Takeover](https://www.vectra.ai/topics/account-takeover) | Account takeover defense guide | 2 |
| [HackerOne - Account Takeover](https://book.hacktricks.xyz/pentesting-web/account-takeover) | Attack taxonomy and techniques | 2 |
| [Undercode - Password Reset Vulnerability](https://undercodetesting.com/the-account-takeover-bomb-deconstructing-a-critical-password-reset-vulnerability/) | Password reset attack patterns | 2 |
| [Rapyd - 9 Account Takeover Attacks](https://www.rapyd.net/blog/account-takeover-attacks/) | ATO statistics and attack types | 2 |

---

## 6. Unique Angle

### Our Differentiator
**The ONLY comprehensive guide covering all 10 account takeover attack patterns from the vibe coder perspective.** While competitors focus on enterprise security tools or pentesting techniques, we provide:
1. **AI Tool Context:** Why AI-generated auth is inherently vulnerable to ATO (focuses on functionality, skips security layers)
2. **Prevention Matrix:** Clear mapping of which defenses block which attacks
3. **Developer-Focused Detection:** Practical code for impossible travel, device fingerprinting, anomaly detection
4. **Consolidating Hub:** Links to detailed articles for each attack pattern

This is the **most comprehensive ATO resource** for developers building with AI tools, with real FBI data ($262M losses) and actionable code.

### Key Message
**Account takeover isn't one vulnerability - it's 10 different attack patterns. AI tools generate working auth but skip all 10 defenses.**

### Data-Driven Claims to Highlight
1. "According to [FBI IC3](https://www.ic3.gov/PSA/2025/PSA251125), more than 5,100 complaints reporting account takeover fraud have been received since January 2025, with losses exceeding $262 million"
2. "Security firm Cisco Talos reports that in the first quarter of 2024, [50% of their incident responses involved MFA bypass attacks](https://www.getastra.com/blog/dast/mfa-bypass-risks/)"
3. "In 2024, [2.1 billion credentials were stolen by infostealers](https://www.rapyd.net/blog/account-takeover-attacks/), fueling ongoing credential stuffing campaigns"
4. "[80% of Fortune 1000 companies](https://www.rapyd.net/blog/account-takeover-attacks/) have experienced at least one compromised account"
5. "Account takeover fraud resulted in [$2.77 billion in business email compromise losses](https://www.rapyd.net/blog/account-takeover-attacks/) reported to the FBI in 2024"
6. "In December 2024, the [FBI and CISA advised Americans against using SMS codes for MFA](https://blog.1password.com/sms-based-mfa-risks/) following Salt Typhoon cyber espionage attacks"
7. "[30% of U.S. adults](https://fingerprint.com/account-takeover/) said they were victims of ATO fraud in 2023"

---

## 7. Meta Information

### Suggested Title Tag (under 60 chars)
```
Account Takeover: 10 Patterns in AI-Generated Auth
```
(49 characters)

### Suggested Meta Description (150-160 chars)
```
Account takeover via 10 attack patterns: credential stuffing, password reset hijacking, session hijacking, MFA bypass & more. FBI: $262M losses in 2025.
```
(158 characters)

### Target URL
```
/kb/security/vulnerabilities/account-takeover/
```

### Related URLs to Create (Future Articles)
- /kb/security/vulnerabilities/password-reset-hijacking/ (Detailed article)
- /kb/security/vulnerabilities/session-fixation/ (Detailed article)
- /kb/security/vulnerabilities/oauth-vulnerabilities/ (Detailed article)
- /kb/security/vulnerabilities/mfa-bypass/ (Detailed article)
- /kb/security/fixes/account-takeover/nextjs/ (Fix guide)

---

## 8. Writer Notes

### Tone Guidance
- **This is comprehensive:** Cover all 10 attack patterns but don't overwhelm - each gets 150-250 words
- **Consolidating hub:** This article links to detailed articles for each attack (some exist, some future)
- **Practical balance:** Show detection methods with code concepts, not full implementations
- **Prevention matrix is key:** Visual table showing which defenses block which attacks
- **FBI data front and center:** $262M losses makes this real and urgent
- **Don't be alarmist:** These attacks are serious but preventable with proper defenses

### Technical Accuracy Notes
- **Account takeover ≠ identity theft:** ATO is unauthorized account access; identity theft is broader
- **Session hijacking ≠ session fixation:** Hijacking steals active session; fixation sets session before auth
- **PKCE mandatory for public clients:** OAuth 2.1 best practice (RFC 9700)
- **FIDO2/hardware keys only effective MFA:** SMS-based MFA vulnerable to SIM swap and interception
- **Impossible travel false positives:** VPNs and mobile networks can trigger false alerts
- **Device fingerprinting privacy:** Mention privacy considerations and user consent

### Things to Avoid
- Don't say "just add MFA" - SMS-based MFA can be bypassed
- Don't recommend security questions - easily guessed/researched
- Don't ignore the human element (social engineering, support desk manipulation)
- Don't overcomplicate detection - provide code concepts, not production implementations
- Don't forget to link to detailed articles for each attack pattern

### Vibe Coding Terms (Use 3-5 times naturally)
- vibe coding
- vibe coders
- vibe coded apps
- AI-generated code
- AI tools
- AI-generated auth

### Reference Materials
**Must consult before writing:**
1. [CWE-306](https://cwe.mitre.org/data/definitions/306.html) - Missing Authentication for Critical Function
2. [OWASP A07:2021](https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/) - Primary reference
3. [FBI IC3 PSA](https://www.ic3.gov/PSA/2025/PSA251125) - FBI statistics and warnings
4. [OWASP OAuth2 Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/OAuth2_Cheat_Sheet.html) - OAuth security
5. [RFC 7636 PKCE](https://tools.ietf.org/html/rfc7636) - PKCE specification
6. Credential Stuffing brief (C:\Users\USER\Desktop\vibeship-knowledgebase\docs\.content-ops\briefs\credential-stuffing-brief.md) - Related content for cross-reference

---

## 9. Code Examples Needed

### Pattern 1: Vulnerable Auth (AI-Generated)
```typescript
// VULNERABLE: AI generates working authentication with no security layers
// app/api/auth/login/route.ts
import { NextResponse } from 'next/server'
import { verifyPassword } from '@/lib/auth'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  // NO protection against any of the 10 attack patterns!
  const user = await verifyPassword(email, password)

  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  // No session regeneration (session fixation vulnerable)
  // No MFA (all MFA bypass attacks work)
  // No rate limiting (credential stuffing works)
  // No anomaly detection (all attacks succeed)
  return NextResponse.json({ user })
}
```
**Explanation:** AI creates functional authentication that accepts credentials and returns a user. It skips all security layers because they're not required for basic functionality. Vulnerable to all 10 attack patterns.

### Pattern 2: Impossible Travel Detection
```typescript
// SECURE: Detect impossible travel patterns
// lib/detect-impossible-travel.ts
interface LoginAttempt {
  email: string
  ip: string
  timestamp: number
  latitude: number
  longitude: number
}

async function detectImpossibleTravel(
  email: string,
  currentLogin: LoginAttempt
): Promise<{ suspicious: boolean; reason?: string }> {
  // Get last successful login for this account
  const lastLogin = await getLastLogin(email)

  if (!lastLogin) {
    return { suspicious: false } // First login
  }

  // Calculate time difference in hours
  const timeDiffHours = (currentLogin.timestamp - lastLogin.timestamp) / 3600000

  // Calculate distance in kilometers using Haversine formula
  const distance = calculateDistance(
    lastLogin.latitude,
    lastLogin.longitude,
    currentLogin.latitude,
    currentLogin.longitude
  )

  // Maximum possible speed (km/h) assuming commercial flight
  const maxSpeed = 1000 // km/h
  const minTimeRequired = distance / maxSpeed

  // If travel time is physically impossible
  if (timeDiffHours < minTimeRequired) {
    return {
      suspicious: true,
      reason: `Impossible travel: ${distance}km in ${timeDiffHours.toFixed(1)} hours`
    }
  }

  // Additional checks for suspicious patterns
  // Different device + rapid location change
  if (timeDiffHours < 1 && distance > 100) {
    return {
      suspicious: true,
      reason: 'Rapid location change detected'
    }
  }

  return { suspicious: false }
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  // Haversine formula for distance between two coordinates
  const R = 6371 // Earth's radius in km
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180)
}

// Usage in login endpoint
export async function POST(request: Request) {
  const { email, password } = await request.json()
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown'

  // Get geolocation from IP (using service like ipapi.co)
  const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`)
  const geo = await geoResponse.json()

  const currentLogin = {
    email,
    ip,
    timestamp: Date.now(),
    latitude: geo.latitude,
    longitude: geo.longitude
  }

  // Check for impossible travel
  const travelCheck = await detectImpossibleTravel(email, currentLogin)

  if (travelCheck.suspicious) {
    // Alert security team
    await alertSecurityTeam({
      type: 'impossible_travel',
      email,
      reason: travelCheck.reason
    })

    // Require additional verification (MFA, email confirmation, etc.)
    return NextResponse.json(
      {
        error: 'Additional verification required',
        requireMFA: true,
        reason: 'Unusual login location detected'
      },
      { status: 403 }
    )
  }

  // Continue with authentication...
}
```
**Explanation:** Impossible travel detection compares login locations and timestamps to detect physically impossible travel (e.g., Paris to Sydney in 20 minutes). Uses Haversine formula to calculate distance between coordinates. Assumes maximum speed of 1000 km/h (commercial flight). Triggers additional verification when suspicious patterns detected.

### Pattern 3: Session Regeneration (Fix Session Fixation)
```typescript
// SECURE: Regenerate session ID after authentication
// app/api/auth/login/route.ts
import { cookies } from 'next/headers'
import { randomBytes } from 'crypto'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  const user = await verifyPassword(email, password)

  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  // CRITICAL: Destroy old session and create new one
  const oldSessionId = cookies().get('session')?.value
  if (oldSessionId) {
    // Invalidate old session in database/Redis
    await invalidateSession(oldSessionId)
  }

  // Generate new cryptographically secure session ID
  const newSessionId = randomBytes(32).toString('hex')

  // Store session with user data
  await createSession(newSessionId, {
    userId: user.id,
    email: user.email,
    createdAt: Date.now(),
    ipAddress: request.headers.get('x-forwarded-for'),
    userAgent: request.headers.get('user-agent')
  })

  // Set new session cookie with secure flags
  cookies().set('session', newSessionId, {
    httpOnly: true,      // Prevents XSS from stealing cookie
    secure: true,        // HTTPS only
    sameSite: 'lax',     // CSRF protection
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/'
  })

  return NextResponse.json({ user })
}
```
**Explanation:** Session fixation prevention requires regenerating the session ID after successful authentication. This invalidates any session ID set by an attacker before login. Includes secure cookie flags: HttpOnly (XSS protection), Secure (HTTPS only), SameSite (CSRF protection).

### Pattern 4: Password Reset Token Security
```typescript
// SECURE: Secure password reset flow with token binding
// app/api/auth/reset-password/route.ts
import { randomBytes, createHash } from 'crypto'

export async function POST(request: Request) {
  const { email } = await request.json()

  // Validate Host header to prevent Host header injection
  const host = request.headers.get('host')
  const allowedHosts = ['yourdomain.com', 'www.yourdomain.com']

  if (!host || !allowedHosts.includes(host)) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }

  const user = await getUserByEmail(email)
  if (!user) {
    // Return success even if user doesn't exist (prevents email enumeration)
    return NextResponse.json({ success: true })
  }

  // Generate cryptographically secure reset token
  const resetToken = randomBytes(32).toString('hex')

  // Hash token before storing (never store plaintext tokens)
  const hashedToken = createHash('sha256').update(resetToken).digest('hex')

  // Bind token to user session context
  const tokenData = {
    userId: user.id,
    email: user.email,
    hashedToken,
    ipAddress: request.headers.get('x-forwarded-for'),
    userAgent: request.headers.get('user-agent'),
    createdAt: Date.now(),
    expiresAt: Date.now() + (60 * 60 * 1000), // 1 hour
    used: false
  }

  await storeResetToken(tokenData)

  // Build reset URL using validated Host header
  const resetUrl = `https://${host}/reset-password?token=${resetToken}`

  // Send email (NEVER expose token in API response!)
  await sendResetEmail(user.email, resetUrl)

  return NextResponse.json({ success: true })
}

// Verify reset token endpoint
export async function PUT(request: Request) {
  const { token, newPassword } = await request.json()

  // Hash submitted token
  const hashedToken = createHash('sha256').update(token).digest('hex')

  // Retrieve token data
  const tokenData = await getResetToken(hashedToken)

  if (!tokenData) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 })
  }

  // Verify token hasn't been used
  if (tokenData.used) {
    return NextResponse.json({ error: 'Token already used' }, { status: 400 })
  }

  // Verify token hasn't expired
  if (Date.now() > tokenData.expiresAt) {
    return NextResponse.json({ error: 'Token expired' }, { status: 400 })
  }

  // Optional: Verify IP/User-Agent matches (strict security)
  // This prevents token theft via email compromise
  const currentIP = request.headers.get('x-forwarded-for')
  if (currentIP !== tokenData.ipAddress) {
    // Alert security team about potential token theft
    await alertSecurityTeam({
      type: 'reset_token_ip_mismatch',
      userId: tokenData.userId,
      originalIP: tokenData.ipAddress,
      currentIP
    })
    // Optional: require additional verification
  }

  // Update password
  await updatePassword(tokenData.userId, newPassword)

  // Mark token as used
  await markTokenUsed(hashedToken)

  // Invalidate all existing sessions (force re-login)
  await invalidateAllUserSessions(tokenData.userId)

  return NextResponse.json({ success: true })
}
```
**Explanation:** Secure password reset requires: (1) Validating Host header to prevent header injection attacks, (2) Generating cryptographically secure tokens with crypto.randomBytes(), (3) Hashing tokens before storage (never store plaintext), (4) Binding tokens to user context (IP, user-agent) to detect theft, (5) NEVER exposing tokens in API responses, (6) Invalidating all sessions after password reset.

### Pattern 5: PKCE for OAuth Flows
```typescript
// SECURE: OAuth with PKCE (Proof Key for Code Exchange)
// app/api/auth/oauth/initiate/route.ts
import { randomBytes, createHash } from 'crypto'

export async function GET() {
  // Generate code verifier (random string)
  const codeVerifier = randomBytes(32).toString('base64url')

  // Create code challenge from verifier using SHA-256
  const codeChallenge = createHash('sha256')
    .update(codeVerifier)
    .digest('base64url')

  // Store code verifier in session (will need it later)
  cookies().set('oauth_code_verifier', codeVerifier, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 10 // 10 minutes
  })

  // Generate state parameter for CSRF protection
  const state = randomBytes(16).toString('hex')
  cookies().set('oauth_state', state, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 10 // 10 minutes
  })

  // Build authorization URL with PKCE parameters
  const authUrl = new URL('https://oauth-provider.com/authorize')
  authUrl.searchParams.set('client_id', process.env.OAUTH_CLIENT_ID!)
  authUrl.searchParams.set('redirect_uri', 'https://yourdomain.com/api/auth/oauth/callback')
  authUrl.searchParams.set('response_type', 'code')
  authUrl.searchParams.set('scope', 'openid profile email')
  authUrl.searchParams.set('state', state)
  authUrl.searchParams.set('code_challenge', codeChallenge)
  authUrl.searchParams.set('code_challenge_method', 'S256') // SHA-256

  // Redirect to authorization server
  return NextResponse.redirect(authUrl.toString())
}

// OAuth callback endpoint
// app/api/auth/oauth/callback/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')

  // Verify state parameter (CSRF protection)
  const storedState = cookies().get('oauth_state')?.value
  if (state !== storedState) {
    return NextResponse.json({ error: 'Invalid state parameter' }, { status: 400 })
  }

  // Retrieve code verifier from session
  const codeVerifier = cookies().get('oauth_code_verifier')?.value
  if (!codeVerifier) {
    return NextResponse.json({ error: 'Missing code verifier' }, { status: 400 })
  }

  // Exchange authorization code for tokens
  const tokenResponse = await fetch('https://oauth-provider.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: code!,
      redirect_uri: 'https://yourdomain.com/api/auth/oauth/callback',
      client_id: process.env.OAUTH_CLIENT_ID!,
      code_verifier: codeVerifier // PKCE verification
    })
  })

  const tokens = await tokenResponse.json()

  if (!tokens.access_token) {
    return NextResponse.json({ error: 'Token exchange failed' }, { status: 400 })
  }

  // Clear PKCE cookies
  cookies().delete('oauth_code_verifier')
  cookies().delete('oauth_state')

  // Continue with user creation/session...
  return NextResponse.json({ success: true })
}
```
**Explanation:** PKCE prevents authorization code interception attacks in OAuth flows. Client generates a random code_verifier, creates SHA-256 hash (code_challenge), sends challenge with auth request. Authorization server returns code. Client exchanges code for tokens by proving it has the original code_verifier. Attackers who intercept the code cannot exchange it without the verifier. PKCE is mandatory for public clients (RFC 9700) and recommended for all OAuth 2.x flows.

---

## 10. AI Fix Prompt Template

The Writer Agent should create an AI fix prompt (200-400 words) that includes:

**Prompt structure:**
```
You are a security expert. Analyze this codebase for account takeover vulnerabilities across all 10 attack patterns and implement comprehensive protection.

SEARCH FOR AUTHENTICATION CODE:
1. Login endpoints: "login", "signin", "authenticate", "/api/auth"
2. Registration: "register", "signup", "/api/users"
3. Password reset: "reset", "forgot-password", "/api/password"
4. OAuth flows: "oauth", "authorize", "callback"
5. Session management: "session", "cookie", "jwt"

CHECK CURRENT PROTECTIONS:
For each of the 10 attack patterns, identify missing defenses:

1. CREDENTIAL STUFFING:
   - Rate limiting: Search "rateLimit", "Ratelimit"
   - CAPTCHA: Search "captcha", "recaptcha"
   - Breached password check: Search "haveibeenpwned", "pwned"

2. PASSWORD RESET HIJACKING:
   - Host header validation: Check reset endpoints
   - Token binding to user context: Check token generation
   - Token storage: Must be hashed, never plaintext

3. SESSION HIJACKING:
   - Cookie security flags: HttpOnly, Secure, SameSite
   - Token rotation: Short-lived tokens
   - Device fingerprinting: Track device changes

4. SESSION FIXATION:
   - Session regeneration: Must regenerate ID after login
   - Check: Does session ID change after authentication?

5. OAUTH ATTACKS:
   - PKCE implementation: Search "code_verifier", "code_challenge"
   - State parameter: CSRF protection in OAuth flows
   - Redirect URI validation: Whitelist allowed redirects

6. MFA BYPASS:
   - MFA implementation: Check for 2FA/MFA
   - MFA type: FIDO2/hardware keys (good) vs SMS (vulnerable)
   - MFA rate limiting: Prevent MFA fatigue attacks

7. PHISHING/SOCIAL ENGINEERING:
   - User education: Security awareness
   - Email authentication: SPF/DKIM/DMARC
   - Phishing-resistant MFA: FIDO2 only

8. SIM SWAPPING:
   - SMS dependency: Never use SMS as sole MFA
   - Account recovery: Alternative recovery methods

9. EMAIL ACCOUNT COMPROMISE:
   - Email security: Separate recovery email
   - Email MFA: Require MFA on email account
   - Password reset loops: Don't allow email-only recovery

10. SUPPORT DESK MANIPULATION:
    - Verification procedures: Document current process
    - Callback verification: To registered phone numbers
    - Manager approval: For high-risk resets

IMPLEMENT THESE DEFENSES (Priority Order):

P0 - Critical (Implement First):
1. Session regeneration after login (fixes session fixation)
2. Secure cookie flags: httpOnly, secure, sameSite: 'lax'
3. Rate limiting: 5 login attempts per 15 min per account
4. Host header validation in password reset
5. Hash password reset tokens (SHA-256)

P1 - High (Implement Next):
6. PKCE for OAuth flows (code_verifier + code_challenge)
7. MFA implementation (FIDO2 preferred, not SMS)
8. Impossible travel detection (basic version)
9. Device fingerprinting (flag new devices)
10. Progressive CAPTCHA (after 3 failed attempts)

P2 - Medium (Implement After):
11. Breached password checking (HaveIBeenPwned)
12. Anomaly detection (velocity, patterns)
13. Support desk procedures documentation
14. Email security hardening

VERIFICATION:
After implementing, test each attack pattern:
1. Credential stuffing: Rapid login attempts → Should rate limit
2. Password reset hijacking: Manipulate Host header → Should reject
3. Session hijacking: Steal cookie → Should detect anomaly
4. Session fixation: Set session before login → Should regenerate
5. OAuth attack: Intercept code → Should fail without code_verifier
6. MFA bypass: Skip MFA step → Should block
7-10: Document procedures for human-based attacks

Use Next.js App Router with Upstash Redis for session storage.
```

---

## 11. FAQ Answers (Draft)

### Q1: What is account takeover and how does it work?

**Answer:** Account takeover (ATO) is when attackers gain unauthorized access to user accounts through various attack methods. According to [FBI IC3](https://www.ic3.gov/PSA/2025/PSA251125), over 5,100 ATO fraud complaints have been received since January 2025, resulting in $262 million in losses. ATO works through 10 primary attack patterns including credential stuffing (testing leaked passwords), password reset hijacking (manipulating reset flows), session hijacking (stealing active sessions), OAuth attacks, MFA bypass, phishing, SIM swapping, email compromise, and social engineering. Each pattern exploits different weaknesses in authentication systems.

### Q2: How do hackers take over accounts?

**Answer:** Hackers use multiple techniques depending on the target's security weaknesses. The most common is credential stuffing, where [2.1 billion credentials stolen by infostealers in 2024](https://www.rapyd.net/blog/account-takeover-attacks/) are tested across websites. Other methods include password reset hijacking (manipulating Host headers to redirect reset links), session hijacking (stealing cookies via XSS), OAuth authorization code interception, MFA bypass (SMS interception, SIM swapping), phishing (tricking users), and social engineering support desks. [OWASP A07:2021](https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/) categorizes these as Identification and Authentication Failures (CWE-306).

### Q3: What is the most common type of account takeover?

**Answer:** Credential stuffing is the most common account takeover method, exploiting password reuse across multiple sites. Attackers use databases of billions of leaked credentials from data breaches to test against login pages. According to industry reports, [24% year-over-year increase in ATO incidents](https://www.rapyd.net/blog/account-takeover-attacks/) occurred in 2024, primarily driven by credential stuffing attacks using distributed botnets. These attacks succeed because users reuse passwords and websites lack defenses like rate limiting, breached password checking, and multi-factor authentication.

### Q4: How do I protect my account from being taken over?

**Answer:** Protection requires multiple layers of defense according to [OWASP A07:2021](https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/): (1) Enable multi-factor authentication using FIDO2/hardware keys (not SMS), (2) Use unique, strong passwords for each account, (3) Monitor for unusual login patterns (impossible travel, new devices), (4) Enable device fingerprinting and login alerts, (5) Regenerate session IDs after authentication, (6) Implement rate limiting on login attempts, (7) Use PKCE for OAuth flows, (8) Validate password reset flows. For developers, implement all 10 defenses covering each attack pattern.

### Q5: Can MFA prevent account takeover?

**Answer:** Yes, but only if implemented correctly. According to [Cisco Talos](https://www.getastra.com/blog/dast/mfa-bypass-risks/), 50% of their incident responses in Q1 2024 involved MFA bypass attacks. SMS-based MFA is vulnerable to SIM swapping and interception - the [FBI and CISA warned against SMS MFA in December 2024](https://blog.1password.com/sms-based-mfa-risks/) following Salt Typhoon attacks. FIDO2 hardware keys and passkeys are phishing-resistant and cannot be intercepted. MFA also requires rate limiting to prevent MFA fatigue attacks (repeated prompts until user approves). Properly implemented phishing-resistant MFA blocks credential stuffing, session hijacking, and most ATO attacks.

### Q6: What is the difference between account takeover and identity theft?

**Answer:** Account takeover is unauthorized access to a specific user account (email, social media, banking), while identity theft is the broader crime of stealing someone's personal information to impersonate them. ATO is often a step toward identity theft. For example, attackers might take over an email account (ATO) to reset passwords for financial accounts, then use those accounts to steal money or open credit lines (identity theft). According to [OWASP](https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/), ATO falls under authentication failures (CWE-306), while identity theft is a criminal offense involving fraud beyond just account access.

### Q7: How do I know if my account has been taken over?

**Answer:** Warning signs include: (1) Unusual login alerts from unfamiliar locations or devices, (2) Password no longer works (attacker changed it), (3) Unexpected password reset emails you didn't request, (4) Unfamiliar activity in account history (messages sent, purchases made), (5) Account settings changed (email, phone number, security questions), (6) Sessions logged out unexpectedly. According to [device fingerprinting research](https://fingerprint.com/account-takeover/), monitoring for impossible travel patterns (login from Paris then Sydney in 20 minutes) and new device alerts are effective detection methods. If detected, immediately change passwords and enable MFA.

### Q8: What should I do if my account is taken over?

**Answer:** Act immediately: (1) Try to log in and change your password if possible, (2) Use "forgot password" to regain access via email, (3) Contact the service's support team if locked out, (4) Check for and change passwords on any accounts that share the same password, (5) Enable multi-factor authentication (FIDO2/hardware keys, not SMS), (6) Review account activity and reverse unauthorized actions, (7) Check for malware on your devices, (8) Report financial losses to your bank and [FBI IC3](https://www.ic3.gov/). According to FBI data, quick action limits damage - the [$262 million in losses](https://www.ic3.gov/PSA/2025/PSA251125) from 5,100+ complaints shows attackers act fast.

---

## 12. Checklist Before Marking READY

- [x] All external links verified and cited properly
- [x] CWE-306, CWE-287, CWE-384 references correct
- [x] OWASP A07:2021 reference correct
- [x] FBI IC3 statistics verified ($262M losses, 5,100+ complaints)
- [x] 10+ internal links identified
- [x] 8 PAA questions with draft answers
- [x] Competitive gap analysis completed
- [x] 5 complete code examples drafted (impossible travel, session regeneration, password reset, PKCE, vulnerable pattern)
- [x] All 10 attack patterns outlined with word count targets
- [x] Prevention matrix table structure defined
- [x] Detection methods covered (impossible travel, device fingerprinting, anomaly detection)
- [x] Unique angle clearly defined (comprehensive hub for all 10 patterns)
- [x] All data points have external sources cited
- [x] No fabricated statistics
- [x] Links to detailed articles planned (credential-stuffing already exists)

---

**Brief Status:** ✅ READY for Writer Agent

**Writer Agent Instructions:**
Use `docs/.content-ops/strategies/VIBESHIP-SECURITY-WRITER-AGENT-PROMPT.md` as your complete writing guide. This brief provides all research data, code examples, and structure. Focus on:

1. **Comprehensive but navigable:** Cover all 10 attack patterns (150-250 words each) with clear sections
2. **Consolidating hub:** Link to detailed articles (credential-stuffing exists, others planned)
3. **Prevention matrix is KEY:** Visual table showing which defenses block which attacks
4. **FBI data prominent:** $262M losses makes this urgent and real
5. **AI tool context:** Why AI-generated auth skips all 10 defenses
6. **Detection methods with code:** Impossible travel, device fingerprinting examples
7. **Plain English:** Non-technical vibe coders must understand each attack pattern
8. **Use "vibe coding" terminology 3-5 times naturally**
9. **Follow all Top 10 Rules for SEO + LLM Optimization from CLAUDE.md**

**Target word count:** 3,500-4,500 words (this is a comprehensive pillar article)

**Key differentiator:** This is the ONLY guide covering all 10 ATO patterns from the vibe coder perspective with a prevention matrix and detection code.
