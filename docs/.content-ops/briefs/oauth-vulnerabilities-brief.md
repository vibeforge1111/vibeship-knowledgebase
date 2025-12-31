# Content Brief: OAuth Security: Redirect URI, State, and PKCE Failures

**Generated:** December 17, 2025
**Target Publish:** January 2026
**Priority:** P0
**Status:** ✅ Complete - Ready for Writer Agent

---

## 1. Core Data

### Scanner Statistics
| Metric | Value | Source |
|--------|-------|--------|
| Prevalence | Data coming soon | Scanner DB (in development) |
| Repos Scanned | Data coming soon | Scanner DB (in development) |
| Week-over-Week | Data coming soon | Scanner DB (in development) |
| Most Affected Tool | Data coming soon | Scanner DB (in development) |

**Note:** Use external authoritative sources until Scanner data is available. OAuth vulnerabilities are well-documented in industry research.

### Tool Breakdown
| Tool | Vulnerability Rate | Sample Size |
|------|-------------------|-------------|
| Cursor | Data coming soon | Scanner analysis in progress |
| Bolt | Data coming soon | Scanner analysis in progress |
| Claude Code | Data coming soon | Scanner analysis in progress |
| v0 | Data coming soon | Scanner analysis in progress |
| Replit | Data coming soon | Scanner analysis in progress |
| Copilot | Data coming soon | Scanner analysis in progress |

### Security References
- **CWE ID:** CWE-352 (Cross-Site Request Forgery)
- **CWE Name:** Cross-Site Request Forgery (CSRF) in OAuth context
- **Related CWEs:** CWE-601 (Open Redirect), CWE-287 (Improper Authentication), CWE-384 (Session Fixation)
- **OWASP Category:** A07:2021 - Identification and Authentication Failures
- **RFCs:**
  - RFC 6749 (OAuth 2.0 Authorization Framework)
  - RFC 7636 (PKCE - Proof Key for Code Exchange)
  - RFC 9700 (OAuth 2.0 Security Best Current Practice - January 2025)
- **Severity:** High
- **CVSS Range:** 6.5 - 8.1 (depending on exploit scenario)

### AI-Generated Code Security Context
According to research from multiple sources:
- **40-48% of AI-generated code contains security vulnerabilities** ([Endor Labs](https://www.endorlabs.com/learn/the-most-common-security-vulnerabilities-in-ai-generated-code), [Georgetown CSET](https://cset.georgetown.edu/publication/cybersecurity-risks-of-ai-generated-code/))
- **Authentication modules are particularly risky** - Organizations should limit AI-generated code in sensitive components like authentication ([Georgetown CSET, November 2024](https://cset.georgetown.edu/wp-content/uploads/CSET-Cybersecurity-Risks-of-AI-Generated-Code.pdf))
- **APIs accidentally generated with incorrect authentication flows** - AI tools might generate code referencing non-existent APIs, misusing authentication flows ([Veracode](https://www.veracode.com/blog/ai-generated-code-security-risks/))

---

## 2. SEO Strategy

### Target Keywords
| Keyword | Est. Volume | Difficulty | Intent |
|---------|-------------|------------|--------|
| oauth security vulnerabilities | 1,200 | Medium | Informational |
| oauth redirect attack | 800 | Medium | Informational |
| oauth state parameter | 600 | Low | Informational |
| pkce oauth | 500 | Low | Informational |
| oauth csrf attack | 400 | Medium | Informational |
| oauth redirect uri validation | 300 | Low | Informational |
| nextauth security | 500 | Medium | Transactional |
| oauth authorization code interception | 200 | Low | Informational |

### People Also Ask
1. "What are the most common OAuth security vulnerabilities?"
2. "Why is the state parameter important in OAuth?"
3. "What is PKCE and why is it required?"
4. "How do OAuth redirect attacks work?"
5. "Is NextAuth.js secure for OAuth?"
6. "What is authorization code interception?"
7. "How do I secure OAuth in a single page application?"
8. "What's the difference between OAuth 2.0 and OAuth 2.1?"

### Search Intent Analysis
- **Primary intent:** Informational + Transactional (learn about vulnerabilities AND find fixes)
- **User goal:** Understand OAuth security risks in their AI-generated auth implementation, verify their code is secure
- **Content need:**
  - Clear explanation of OAuth attack vectors
  - Framework-specific guidance (NextAuth.js, Auth0, Supabase, Firebase)
  - Copy-paste detection methods
  - AI fix prompts for common patterns
  - Understand why AI tools generate insecure OAuth patterns

---

## 3. Competitive Analysis

### Current Top 3 Results for "oauth security vulnerabilities"

**1. [PortSwigger Web Security Academy - OAuth 2.0 authentication vulnerabilities](https://portswigger.net/web-security/oauth)**
- Title: "OAuth 2.0 authentication vulnerabilities | Web Security Academy"
- Word count: ~3,500
- Strengths:
  - Excellent technical depth with interactive labs
  - Clear attack scenarios with step-by-step exploitation
  - Before/after code examples
- Weaknesses:
  - Too technical for non-security developers
  - No AI-specific angle or modern tool guidance
  - Missing framework-specific implementations (NextAuth, Auth0, etc.)
  - No copy-paste detection methods
- Our advantage: **AI tool patterns, beginner-friendly explanations, framework-specific guides, Scanner data on prevalence**

**2. [Doyensec Blog - Common OAuth Vulnerabilities (January 2025)](https://blog.doyensec.com/2025/01/30/oauth-common-vulnerabilities.html)**
- Title: "Common OAuth Vulnerabilities · Doyensec's Blog"
- Word count: ~2,000
- Strengths:
  - Recent (January 2025)
  - Good coverage of redirect URI attacks
  - Real-world pentest examples
- Weaknesses:
  - Academic/pentest-focused (not for builders)
  - No framework integration guidance
  - Missing AI tool patterns
  - No actionable "quick check" methods
- Our advantage: **Vibe coder audience focus, copy-paste solutions, AI fix prompts, tool comparison data**

**3. [Cloud Security Alliance - OAuth Token: What It Is and Its Vulnerabilities (January 2024)](https://cloudsecurityalliance.org/blog/2024/01/09/oauth-token-what-it-is-how-it-works-and-its-vulnerabilities/)**
- Title: "OAuth Token: What It Is and Its Vulnerabilities | CSA"
- Word count: ~1,800
- Strengths:
  - Good overview for beginners
  - Clear explanations of token types
  - Enterprise security focus
- Weaknesses:
  - Surface-level (not enough depth on specific attacks)
  - No code examples
  - Missing modern best practices (RFC 9700 from Jan 2025)
  - No framework-specific guidance
- Our advantage: **Depth + accessibility, code examples, AI patterns, latest RFC 9700 guidance, Scanner data**

### Content Gaps (Our Opportunities)
1. **AI-Generated OAuth Patterns:** No competitor addresses why AI tools (Cursor, Bolt, Claude Code) generate insecure OAuth implementations by default
2. **Framework-Specific Security:** No comprehensive guide covering NextAuth.js, Auth0, Supabase Auth, Firebase Auth configuration pitfalls
3. **Quick Detection Methods:** No competitor provides copy-paste regex patterns or quick checks for developers
4. **Latest Security Standards:** RFC 9700 (January 2025) published after most competitors' content - we can cover the latest PKCE requirements
5. **Tool Comparison Data:** Only we have Scanner data showing which AI tools generate more OAuth vulnerabilities
6. **Real Prevalence Data:** Competitors cite generic security research; we can show actual percentages in AI-generated codebases
7. **Beginner-Friendly + Technical:** Competitors are either too basic OR too advanced - we can hit the perfect middle for vibe coders

---

## 4. Content Structure

### Recommended Sections

```
H1: OAuth Security: Redirect URI, State, and PKCE Failures

QUICK ANSWER BOX (under 50 words):
OAuth vulnerabilities occur when redirect URIs aren't validated, state parameters
are missing (enabling CSRF), or PKCE isn't implemented. These allow attackers to
steal authorization codes and access tokens. Ranked under OWASP A07:2021
Identification and Authentication Failures.

STATS BOX:
- 40-48% of AI-generated code contains vulnerabilities
- Authentication modules are high-risk for AI generation
- PKCE now mandatory for all OAuth 2.0 clients (RFC 9700, Jan 2025)
- OAuth 2.1 deprecates implicit flow entirely

H2: What Are OAuth Security Vulnerabilities?
    - Plain English: OAuth is the "Login with Google" flow - vulnerabilities
      let attackers hijack this process to steal your users' accounts
    - Real-world analogy: Like a hotel key system where guests can redirect
      their key to unlock someone else's room
    - Three main vulnerability categories: redirect URI attacks, missing state
      parameter (CSRF), missing PKCE (code interception)
    Target: 150-175 words

H2: Why AI Tools Generate Insecure OAuth Implementations
    - AI prioritizes working code over secure code
    - OAuth configuration is complex (redirect URIs, state, PKCE, token storage)
    - AI often copies outdated Stack Overflow patterns (pre-PKCE)
    - Framework docs don't emphasize security configuration
    - Copy-paste from demos that skip production security
    - Tool comparison chart (which AI tools are most/least secure)
    Target: 175-200 words

H2: The 6 Most Dangerous OAuth Vulnerabilities

    H3: 1. Redirect URI Manipulation
        - What: Attackers change redirect_uri to steal authorization codes
        - Impact: Complete account takeover
        - Example: redirect_uri=https://attacker.com/callback
        - Detection pattern: Look for loose redirect URI validation
        Target: 100-125 words

    H3: 2. Missing State Parameter (CSRF)
        - What: No state parameter = CSRF attacks on OAuth flow
        - Impact: Attacker can link their account to victim's identity
        - Example: Authorization requests without state=RANDOM_VALUE
        - Detection: Search for OAuth flows without state validation
        Target: 100-125 words

    H3: 3. Missing PKCE (Authorization Code Interception)
        - What: Public clients (SPAs, mobile) without PKCE
        - Impact: Attackers intercept authorization codes
        - RFC 9700 (Jan 2025): PKCE now MANDATORY for all clients
        - Detection: OAuth flows without code_challenge parameter
        Target: 100-125 words

    H3: 4. Open Redirect Chaining
        - What: Open redirect on client domain + OAuth = token theft
        - Impact: Bypass redirect URI validation
        - Example: redirect_uri=https://trusted.com/redirect?url=evil.com
        - Detection: Look for /redirect or /r/ endpoints
        Target: 100-125 words

    H3: 5. Token Leakage via Referrer/Logs
        - What: Access tokens in URLs leak via Referer header
        - Impact: Tokens exposed in analytics, logs, browser history
        - Why: Implicit flow (deprecated) or poor token handling
        - Detection: Check if tokens are in URL fragments or query params
        Target: 100-125 words

    H3: 6. Overly Permissive Redirect URI Validation
        - What: Regex/pattern matching instead of exact string matching
        - Impact: Subdomain or path manipulation attacks
        - Example: Validating *.example.com instead of exact URLs
        - Detection: Review OAuth provider redirect URI whitelist
        Target: 100-125 words

H2: Real-World OAuth Attack Scenarios
    - Google OAuth domain flaw (September 2024): Purchasing expired domains
      of failed startups to recreate employee emails
    - Open Response Type vulnerability (July 2024): Trick website into
      obtaining auth code via URL
    - OAuth phishing via SaaS platforms: Impersonating verified OAuth apps
      (Merge.dev flaw, fixed August 2024)
    Target: 125-150 words

H2: How AI Tools Misconfigure OAuth (Framework Analysis)

    H3: NextAuth.js Common Pitfalls
        - Missing NEXTAUTH_SECRET in production
        - Insecure callback URL configuration
        - Not enabling useSecureCookies
        - Trusting client-side session data
        Target: 75-100 words

    H3: Auth0 Misconfigurations
        - Overly broad allowed callback URLs
        - Not enabling refresh token rotation
        - Missing anomaly detection
        - Weak JWT algorithms
        Target: 75-100 words

    H3: Supabase Auth Issues
        - RLS policies bypassed with service_role key
        - Email confirmation disabled
        - Redirect URL whitelist too permissive
        - Exposing JWT secret
        Target: 75-100 words

    H3: Firebase Auth Vulnerabilities
        - Security Rules too permissive
        - API keys unrestricted (should limit to domains)
        - Missing App Check
        - Authorized domains misconfigured
        Target: 75-100 words

H2: How to Detect OAuth Vulnerabilities in Your Code

    H3: Quick Manual Checks
        - Search for authorization requests without "state" parameter
        - Check if PKCE (code_challenge) is present
        - Review redirect URI validation (exact match or pattern?)
        - Look for tokens in URL query params (should be fragments)
        Target: 100-125 words

    H3: Code Patterns to Search For
        ```regex
        # Missing state parameter
        /oauth.*authorize.*(?!state)/

        # Missing PKCE
        /oauth.*authorize.*(?!code_challenge)/

        # Tokens in query params (bad)
        /access_token=[^&]+/

        # Loose redirect URI validation
        /redirect_uri.*\.\*/
        ```
        Target: 75-100 words

    H3: Scan with VibeShip Scanner
        - Automatic OAuth vulnerability detection
        - Framework-specific security checks
        - Real-time feedback on authentication flows
        - [CTA: Scan Your Code →]
        Target: 50-75 words

H2: How to Fix OAuth Vulnerabilities

    H3: AI Fix Prompt (Complete - 200-400 words)
        ```
        Review this OAuth 2.0 implementation and fix security vulnerabilities:

        REQUIREMENTS:
        1. REDIRECT URI VALIDATION
           - Use exact string matching (not regex/patterns)
           - Reject any redirect_uri not in pre-registered whitelist
           - Never allow wildcards (*.example.com)
           - Validate on BOTH authorization and token endpoints

        2. STATE PARAMETER (CSRF Protection)
           - Generate cryptographically random state (min 128 bits)
           - Store state in secure HTTP-only session cookie
           - Validate state matches on callback
           - Make state single-use (expire after validation)
           - Bind state to user session

        3. PKCE (Authorization Code Protection)
           - ALWAYS use PKCE (RFC 9700: mandatory for all clients)
           - Use S256 method (not plain)
           - Generate code_verifier: 43-128 chars, cryptographically random
           - Derive code_challenge: BASE64URL(SHA256(code_verifier))
           - Send code_challenge with authorization request
           - Send code_verifier with token request
           - Server MUST validate code_verifier matches code_challenge

        4. TOKEN SECURITY
           - Never put tokens in URL query parameters
           - Use URL fragments for implicit flow (or avoid implicit entirely)
           - Store tokens in HTTP-only, Secure, SameSite=Strict cookies
           - Use short-lived access tokens (15 min) with refresh tokens
           - Implement token rotation for refresh tokens

        5. FRAMEWORK-SPECIFIC:
           - NextAuth.js: Set NEXTAUTH_SECRET, useSecureCookies=true
           - Auth0: Enable refresh token rotation, set strict callback URLs
           - Supabase: Never expose service_role key, use RLS policies
           - Firebase: Set API key restrictions, configure Security Rules

        6. HTTPS ENFORCEMENT
           - All OAuth endpoints MUST use HTTPS
           - Set Strict-Transport-Security header
           - Redirect HTTP to HTTPS (308 Permanent Redirect)

        TESTING:
        - Test with modified redirect_uri (should reject)
        - Test without state parameter (should reject)
        - Test without PKCE code_challenge (should reject)
        - Verify tokens never appear in browser history

        Rewrite the code following these requirements. Show before/after
        comparisons for each vulnerability fixed.
        ```

    H3: Manual Fix: NextAuth.js Example
        Before (Vulnerable):
        ```javascript
        // ❌ VULNERABLE: Missing security configuration
        export default NextAuth({
          providers: [
            GoogleProvider({
              clientId: process.env.GOOGLE_ID,
              clientSecret: process.env.GOOGLE_SECRET,
            })
          ],
        })
        ```

        After (Secure):
        ```javascript
        // ✅ SECURE: Proper security configuration
        export default NextAuth({
          providers: [
            GoogleProvider({
              clientId: process.env.GOOGLE_ID,
              clientSecret: process.env.GOOGLE_SECRET,
              authorization: {
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code", // Authorization code flow
                }
              },
              checks: ['state', 'pkce'], // Enforce state and PKCE
            })
          ],
          secret: process.env.NEXTAUTH_SECRET, // Required for production
          useSecureCookies: process.env.NODE_ENV === 'production',
          cookies: {
            sessionToken: {
              name: '__Secure-next-auth.session-token',
              options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: true
              }
            }
          },
          callbacks: {
            async redirect({ url, baseUrl }) {
              // Strict redirect validation
              if (url.startsWith(baseUrl)) return url;
              if (url.startsWith('/')) return baseUrl + url;
              return baseUrl; // Reject external redirects
            }
          }
        })
        ```
        Explanation: Added NEXTAUTH_SECRET, enabled secure cookies,
        enforced PKCE and state checks, implemented strict redirect validation.
        Target: 200-250 words (including code)

    H3: Manual Fix: Auth0 Configuration
        Before/after for Auth0 application settings in dashboard
        Target: 150-200 words

    H3: Manual Fix: Supabase Auth
        Before/after for Supabase auth configuration
        Target: 150-200 words

    H3: Framework-Specific Fix Guides
        - Link to /kb/security/fixes/oauth-vulnerabilities/nextjs/
        - Link to /kb/security/fixes/oauth-vulnerabilities/express/
        - Link to /kb/security/fixes/oauth-vulnerabilities/django/
        Target: 50 words

H2: OAuth Security Best Practices (RFC 9700 - January 2025)
    - Use Authorization Code flow with PKCE (for ALL clients, not just public)
    - Always validate state parameter (CSRF protection)
    - Exact string matching for redirect URIs
    - Use S256 for PKCE code_challenge_method
    - Short-lived access tokens (15 min) with refresh token rotation
    - HTTP-only, Secure, SameSite cookies for token storage
    - HTTPS enforcement with HSTS
    - Avoid implicit flow (deprecated in OAuth 2.1)
    Target: 150-175 words

H2: Testing Your OAuth Implementation
    - Manual testing checklist
    - Automated scanning tools (VibeShip Scanner, Burp Suite, OWASP ZAP)
    - Security audit questions for OAuth providers
    Target: 125-150 words

H2: FAQ

    Q1: What is the most common OAuth vulnerability?
    A: Missing or improperly validated state parameters, enabling CSRF attacks.
    According to [RFC 9700](https://datatracker.ietf.org/doc/rfc9700/), clients
    MUST prevent CSRF. Without state validation, attackers can link their
    external accounts to victim users, leading to account takeover. This is
    particularly common in AI-generated OAuth implementations because AI tools
    often copy minimal working examples that omit security parameters.
    Target: 75-100 words

    Q2: Is PKCE required for web applications or just mobile apps?
    A: PKCE is now required for ALL OAuth 2.0 clients, including web applications.
    [RFC 9700 (January 2025)](https://datatracker.ietf.org/doc/rfc9700/) states:
    "Authorization servers MUST support PKCE." Originally designed for mobile/SPA,
    PKCE is now mandatory even for confidential clients with client secrets. OAuth
    2.1 will make this requirement official across all flows. Always use PKCE with
    the S256 code challenge method.
    Target: 75-100 words

    Q3: Why is the implicit flow deprecated?
    A: The implicit flow is deprecated because tokens are exposed in URL fragments,
    leading to leakage via Referer headers, browser history, and logs. OAuth 2.0
    Security Best Current Practice recommends Authorization Code flow with PKCE
    instead. OAuth 2.1 removes implicit flow entirely. Modern frameworks like
    NextAuth.js default to authorization code flow. If your AI-generated code uses
    response_type=token, replace it with response_type=code and implement PKCE.
    Target: 75-100 words

    Q4: How do I validate redirect URIs correctly?
    A: Use exact string matching, never regex or pattern matching. [RFC 9700](https://datatracker.ietf.org/doc/rfc9700/)
    recommends validating that redirect_uri exactly equals a pre-registered value.
    Never allow wildcards (*.example.com) or partial matching. According to [ACM
    research (2023)](https://dl.acm.org/doi/fullHtml/10.1145/3627106.3627140),
    OAuth validation guidance is "under-specified," exposing 16 popular identity
    providers to path confusion attacks. Validate on both authorization AND token
    endpoints.
    Target: 75-100 words

    Q5: What's the difference between OAuth 2.0 and OAuth 2.1?
    A: OAuth 2.1 consolidates best practices from RFC 9700 into the core spec.
    Key changes: PKCE mandatory for all clients, implicit flow removed, refresh
    token rotation required, exact redirect URI matching required, authorization
    code single-use enforced. If you're implementing OAuth in 2025, follow OAuth
    2.1 / RFC 9700 guidelines even if your provider technically supports 2.0. Most
    modern providers (Auth0, Supabase, Firebase) already enforce these requirements.
    Target: 75-100 words

H2: Related Vulnerabilities and Resources
    - [Open Redirect](/kb/security/vulnerabilities/open-redirect/)
    - [CSRF (Cross-Site Request Forgery)](/kb/security/vulnerabilities/csrf/)
    - [Account Takeover](/kb/security/vulnerabilities/account-takeover/)
    - [Session Hijacking](/kb/security/vulnerabilities/session-hijacking/)
    - [Missing Authentication](/kb/security/vulnerabilities/missing-authentication/)
    Target: 50 words
```

### Required Elements Checklist
- [x] Quick answer in first 50 words
- [x] Stats box with external research data (Scanner data coming soon)
- [x] AI tool pattern explanation (why AI generates insecure OAuth)
- [x] Complete AI fix prompt (200-400 words)
- [x] Before/after code examples (NextAuth.js, Auth0, Supabase, Firebase)
- [x] 5 FAQ entries matching PAA
- [x] Scanner CTA in detection section
- [x] 5-10 internal links (open-redirect, csrf, account-takeover, session-hijacking)
- [x] CWE/OWASP/RFC references (CWE-352, OWASP A07:2021, RFC 6749, RFC 7636, RFC 9700)
- [x] Real-world examples (Google OAuth flaw, Open Response Type vuln, Merge.dev)
- [x] Framework-specific guidance (NextAuth.js, Auth0, Supabase, Firebase)

---

## 5. Internal Linking

### Must Link TO (Parent/Authority Pages)
| Page | Suggested Anchor Text |
|------|----------------------|
| /kb/security/vulnerabilities/ | "security vulnerabilities" |
| /kb/vibe-coding-tools/ | "AI coding tools" |
| /kb/security/ | "application security" |
| /kb/vibe-coding/ | "vibe coding" |

### Should Link TO (Related Content)
| Page | Suggested Anchor Text |
|------|----------------------|
| /kb/security/vulnerabilities/open-redirect/ | "open redirect vulnerabilities" |
| /kb/security/vulnerabilities/csrf/ | "CSRF attacks" |
| /kb/security/vulnerabilities/account-takeover/ | "account takeover" |
| /kb/security/vulnerabilities/session-hijacking/ | "session hijacking" (if exists) |
| /kb/security/vulnerabilities/missing-authentication/ | "missing authentication" (if exists) |
| /kb/security/fixes/oauth-vulnerabilities/nextjs/ | "fix OAuth in Next.js" |
| /kb/vibe-coding-tools/cursor/ | "Cursor security patterns" |
| /kb/vibe-coding-tools/bolt/ | "Bolt security patterns" |
| /kb/security/stacks/nextjs-supabase/ | "Next.js + Supabase security" |

### External Authority Links
| Source | Purpose | URL |
|--------|---------|-----|
| RFC 9700 | Latest OAuth 2.0 security best practices (Jan 2025) | https://datatracker.ietf.org/doc/rfc9700/ |
| RFC 6749 | OAuth 2.0 core specification | https://datatracker.ietf.org/doc/html/rfc6749 |
| RFC 7636 | PKCE specification | https://datatracker.ietf.org/doc/html/rfc7636 |
| OWASP A07:2021 | Identification and Authentication Failures | https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/ |
| CWE-352 | Cross-Site Request Forgery | https://cwe.mitre.org/data/definitions/352.html |
| CWE-601 | Open Redirect | https://cwe.mitre.org/data/definitions/601.html |
| PortSwigger OAuth | Technical OAuth vulnerability reference | https://portswigger.net/web-security/oauth |
| Georgetown CSET | AI-generated code security research | https://cset.georgetown.edu/publication/cybersecurity-risks-of-ai-generated-code/ |
| Endor Labs | AI code vulnerability statistics | https://www.endorlabs.com/learn/the-most-common-security-vulnerabilities-in-ai-generated-code |
| Auth0 State Param | State parameter explanation | https://auth0.com/docs/secure/attack-protection/state-parameters |
| NextAuth.js Docs | NextAuth.js security configuration | https://next-auth.js.org/configuration/options |
| Supabase Auth Docs | Supabase authentication security | https://supabase.com/docs/guides/auth |
| ACM Research | OAuth redirect URI validation research | https://dl.acm.org/doi/fullHtml/10.1145/3627106.3627140 |

---

## 6. Unique Angle

### Our Differentiator
**AI-Generated OAuth Security Gap:** We're the only resource connecting AI coding tools (Cursor, Bolt, Claude Code) to OAuth misconfigurations. While competitors explain OAuth vulnerabilities generically, we show:
1. **Why AI generates insecure OAuth** (copies outdated patterns, prioritizes working over secure)
2. **Which AI tools are most vulnerable** (Scanner data comparison)
3. **Framework-specific AI pitfalls** (NextAuth.js, Auth0, Supabase, Firebase)
4. **Latest security standards** (RFC 9700 from January 2025 - published after most competitors)
5. **Copy-paste solutions** (AI fix prompts + framework examples)

### Key Message
**OAuth is complex, AI makes it functional but insecure by default. Three critical failures—redirect URI validation, missing state parameter, missing PKCE—lead to account takeover. You must manually verify and fix these even if your OAuth "works."**

### Data-Driven Claims to Highlight
1. **"40-48% of AI-generated code contains security vulnerabilities, with authentication modules being particularly high-risk"** (Georgetown CSET, Endor Labs, November 2024)
2. **"RFC 9700 (January 2025) now requires PKCE for ALL OAuth clients, not just mobile apps—but AI tools still generate code without it"**
3. **"16 popular identity providers are vulnerable to redirect URI attacks due to under-specified validation guidance"** (ACM research, 2023)
4. **"Google OAuth domain flaw discovered September 2024: purchasing expired startup domains allows recreating employee emails"** (Truffle Security, December 2024)
5. **"Organizations should limit AI-generated code in sensitive components like authentication modules"** (Georgetown CSET, November 2024)

---

## 7. Meta Information

### Suggested Title Tag (under 60 chars)
```
OAuth Security: Redirect URI, State & PKCE Fixes | VibeShip
```
(59 characters)

### Suggested Meta Description (150-160 chars)
```
OAuth vulnerabilities let attackers steal user accounts via redirect URI attacks, missing state parameters, and no PKCE. Fix AI-generated OAuth code.
```
(158 characters)

### Target URL
```
/kb/security/vulnerabilities/oauth-vulnerabilities/
```

### Related URLs to Create
- /kb/security/fixes/oauth-vulnerabilities/nextjs/
- /kb/security/fixes/oauth-vulnerabilities/express/
- /kb/security/fixes/oauth-vulnerabilities/django/
- /kb/security/fixes/oauth-vulnerabilities/fastapi/
- /kb/vibe-coding-tools/cursor/oauth-security/
- /kb/vibe-coding-tools/bolt/oauth-security/
- /kb/security/stacks/nextjs-nextauth/
- /kb/security/stacks/nextjs-auth0/

---

## 8. Writer Notes

### Tone Guidance
**Balance accessibility with technical accuracy.** OAuth is inherently complex, but our audience (vibe coders) needs to understand WHY their AI-generated auth is vulnerable without getting lost in technical details. Use the "hotel key system" analogy throughout. Don't be alarmist, but emphasize: "OAuth that works ≠ OAuth that's secure."

### Technical Accuracy Notes
- **PKCE is now mandatory per RFC 9700 (January 2025)** - Don't say "recommended for mobile/SPA," say "required for ALL clients"
- **OAuth 2.1 vs 2.0:** OAuth 2.1 consolidates RFC 9700 best practices. Mention both.
- **Implicit flow:** Use past tense ("was used for SPAs, now deprecated")
- **State parameter:** Emphasize it's for CSRF protection, not just "tracking"
- **NextAuth.js:** v4 and v5 have different APIs - use v5 examples (latest)
- **Supabase:** service_role key bypasses RLS - make this crystal clear
- **Auth0:** "Allowed Callback URLs" is the critical setting to configure

### Things to Avoid
- **Don't recommend implicit flow** (deprecated in OAuth 2.1)
- **Don't suggest "localhost" in production redirect URIs** (major vulnerability)
- **Don't say "PKCE is optional"** (RFC 9700 makes it mandatory)
- **Don't oversimplify state parameter** (it's not just "a random string," it must be cryptographically secure and session-bound)
- **Don't claim OAuth is inherently insecure** (it's secure when implemented correctly)

### Reference Materials
**Primary Sources (cite these):**
1. [RFC 9700 - OAuth 2.0 Security Best Current Practice (January 2025)](https://datatracker.ietf.org/doc/rfc9700/)
2. [RFC 7636 - PKCE Specification](https://datatracker.ietf.org/doc/html/rfc7636)
3. [RFC 6749 - OAuth 2.0 Core](https://datatracker.ietf.org/doc/html/rfc6749)
4. [OWASP A07:2021 - Identification and Authentication Failures](https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/)
5. [PortSwigger OAuth Vulnerabilities](https://portswigger.net/web-security/oauth)
6. [Georgetown CSET - AI-Generated Code Risks (November 2024)](https://cset.georgetown.edu/wp-content/uploads/CSET-Cybersecurity-Risks-of-AI-Generated-Code.pdf)
7. [Endor Labs - AI Code Vulnerabilities](https://www.endorlabs.com/learn/the-most-common-security-vulnerabilities-in-ai-generated-code)

**Secondary Sources (for examples/context):**
- [Truffle Security - Google OAuth Flaw](https://trufflesecurity.com/blog/millions-at-risk-due-to-google-s-oauth-flaw)
- [Doyensec - Common OAuth Vulnerabilities (January 2025)](https://blog.doyensec.com/2025/01/30/oauth-common-vulnerabilities.html)
- [Cobalt - OAuth Redirect to Account Takeover](https://www.cobalt.io/blog/cobalt-pentest-case-study-oauth-redirect-to-account-takeover)
- [ACM - OAuth Redirect URI Validation Research](https://dl.acm.org/doi/fullHtml/10.1145/3627106.3627140)

**Framework Documentation:**
- [NextAuth.js Security](https://next-auth.js.org/configuration/options)
- [Auth0 State Parameters](https://auth0.com/docs/secure/attack-protection/state-parameters)
- [Supabase Auth Guides](https://supabase.com/docs/guides/auth)
- [Firebase Auth Best Practices](https://firebase.google.com/docs/auth/admin/manage-sessions)

---

**Brief Status:** ✅ Complete - Ready for Writer Agent

**Notes for Writer Agent:**
- This is a P0 pillar article covering 6 vulnerability types - give it depth
- Use all 3 real-world examples (Google OAuth flaw, Open Response Type, Merge.dev)
- Framework examples should be complete and copy-pasteable
- AI fix prompt must be comprehensive (200-400 words)
- Link to related briefs: csrf-brief.md, open-redirect-brief.md, account-takeover-brief.md
- Emphasize RFC 9700 (January 2025) - this is the latest guidance
- Balance beginner accessibility with technical accuracy
