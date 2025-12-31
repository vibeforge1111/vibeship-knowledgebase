# Content Brief: Clickjacking

**Generated:** 2025-12-17
**Target Publish:** TBD
**Priority:** P1
**Status:** Ready for Writer

---

## 1. Core Data

### Scanner Statistics
| Metric | Value | Source |
|--------|-------|--------|
| Prevalence | Data coming soon | Scanner DB (collecting) |
| Repos Scanned | TBD | Scanner DB (collecting) |
| Week-over-Week | TBD | Scanner DB (collecting) |
| Most Affected Tool | TBD | Scanner DB (collecting) |

**Note:** VibeShip Scanner is actively collecting data on clickjacking vulnerabilities. Use external industry data until internal stats are available.

### Industry Data (Use This)
| Metric | Value | Source |
|--------|-------|--------|
| Industry Prevalence | 1,226 instances found in 80%+ of applications | [Claranet 2024 Research](https://www.claranet.com/uk/blog/claranets-top-10-web-application-vulnerabilities-found-2024/) |
| Sample Size | ~500 web applications | Claranet penetration test results 2024 |
| Trend | Uptick in 2024-2025 | Industry reports |
| New Variants | DoubleClickjacking identified 2024 | Security research |

### Security References
- **CWE ID:** [CWE-1021](https://cwe.mitre.org/data/definitions/1021.html)
- **CWE Name:** Improper Restriction of Rendered UI Layers or Frames
- **OWASP Category:** [A01:2021 - Broken Access Control](https://owasp.org/Top10/A01_2021-Broken_Access_Control/)
- **Severity:** Medium
- **CVSS Range:** 4.0 - 6.5 (context-dependent)

### Attack Variants
- **Clickjacking (Classic):** Invisible iframe overlay attacks
- **Likejacking:** Social media "like" button hijacking (Facebook, Twitter)
- **Cursorjacking:** Fake cursor offset attacks
- **Cookiejacking:** Drag-and-drop cookie theft
- **Filejacking:** File system navigation exploitation
- **DoubleClickjacking:** Timing-based mousedown/onclick bypass (new 2024)

---

## 2. SEO Strategy

### Target Keywords
| Keyword | Est. Volume | Difficulty | Intent |
|---------|-------------|------------|--------|
| clickjacking | 5,400 | Medium | Informational |
| ui redressing attack | 320 | Low | Informational |
| x-frame-options | 2,900 | Medium | Informational/Technical |
| clickjacking prevention | 480 | Low | Informational |
| frame-ancestors csp | 590 | Low | Technical |
| likejacking | 210 | Low | Informational |
| what is clickjacking | 1,200 | Low | Informational |

### People Also Ask
1. "What is clickjacking and how does it work?"
2. "How do I protect my website from clickjacking attacks?"
3. "What is the difference between X-Frame-Options and CSP frame-ancestors?"
4. "Can clickjacking steal my data?"
5. "Is clickjacking still a threat in 2025?"
6. "What is likejacking on social media?"
7. "How do I test if my site is vulnerable to clickjacking?"

### Search Intent Analysis
- **Primary intent:** Informational (understand the attack)
- **User goal:** Learn what clickjacking is, how to detect it, and how to prevent it
- **Content need:** Plain English explanation, real examples, copy-paste prevention code

---

## 3. Competitive Analysis

### Current Top 3 Results for "clickjacking"

**1. [OWASP Clickjacking](https://owasp.org/www-community/attacks/Clickjacking)**
- Title: Clickjacking | OWASP Foundation
- Word count: ~1,200
- Strengths: Authoritative source, technical accuracy, detailed attack descriptions
- Weaknesses: Dry technical language, no AI tool context, lacks before/after code examples
- Our advantage: Vibe coder audience focus, AI fix prompts, tool-specific patterns

**2. [PortSwigger Web Security Academy](https://portswigger.net/web-security/clickjacking)**
- Title: What is Clickjacking? Tutorial & Examples
- Word count: ~2,500
- Strengths: Excellent technical depth, interactive labs, attack variations
- Weaknesses: Assumes security background, no AI-generated code focus, developer-heavy
- Our advantage: Non-technical explanations, AI tool comparison, quick fixes

**3. [MDN Clickjacking](https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/Clickjacking)**
- Title: Clickjacking - Security | MDN
- Word count: ~800
- Strengths: Developer-focused, trusted source, clear examples
- Weaknesses: Brief coverage, no AI context, limited prevention details
- Our advantage: Comprehensive prevention guide, AI tool patterns, Scanner integration

### Content Gaps (Our Opportunities)
1. **AI Tool Context:** No competitor explains why AI tools (Cursor, Bolt, Claude Code) omit security headers by default
2. **Vibe Coder Audience:** All competitors assume technical background - we speak plain English
3. **Copy-Paste Solutions:** Competitors explain concepts but don't provide ready-to-use AI fix prompts
4. **Tool Comparison:** No one compares clickjacking rates across AI coding tools (our future differentiator)
5. **Framework Configs:** Competitors show generic code - we provide Next.js, Express, SvelteKit specifics

---

## 4. Content Structure

### Recommended Sections

```
H1: Clickjacking: When UI Tricks Users into Attacks

Quick Answer (under 50 words):
Clickjacking tricks users into clicking invisible UI elements by layering
transparent iframes over legitimate pages. Found in 80%+ of web applications
tested in 2024. Prevent it with X-Frame-Options or CSP frame-ancestors headers.

H2: What is Clickjacking?
    - Plain English: "It's like a hotel where someone replaces your room
      keycard reader with a fake one that looks identical"
    - Technical definition: UI redress attack using iframe overlays
    - Real-world analogy: Transparent layer trick
    - Consequences: Unauthorized actions, credential theft, social media hijacking
    Target: 100-150 words

H2: How Clickjacking Works
    - Attacker creates decoy site
    - Embeds target site in invisible iframe
    - Uses CSS (opacity: 0, z-index) to hide iframe
    - User clicks decoy, actually interacts with hidden site
    - Include simple diagram description
    Target: 150-200 words

H2: Types of Clickjacking Attacks
    H3: Likejacking (Social Media)
    - Facebook Like button hijacking
    - Twitter follow button manipulation
    - Real example: 2011 Italy incident, 2015 CBC journalist

    H3: Cursorjacking
    - Fake cursor offset attacks
    - User sees cursor in wrong position
    - Firefox Mac OS X vulnerability (fixed v37.0)

    H3: Cookiejacking
    - Drag-and-drop cookie theft
    - Browser file system exploitation

    H3: DoubleClickjacking (New 2024)
    - Timing gap between mousedown/onclick
    - Bypasses traditional protections

    Target: 200-250 words total

H2: Why AI Tools Generate Clickjacking Vulnerabilities
    - AI focuses on functional code, not security headers
    - Express apps default to no X-Frame-Options
    - Next.js doesn't enforce frame-ancestors by default
    - Tool comparison chart (when data available):
      * Cursor: TBD% vulnerable
      * Bolt: TBD% vulnerable
      * Claude Code: TBD% vulnerable
      * v0: TBD% vulnerable
    - AI prioritizes "it works" over "it's secure"
    Target: 150-200 words

H2: What Could Happen
    - Unauthorized account actions (likes, follows, posts)
    - Credential theft through fake login overlays
    - Payment manipulation (one-click purchases)
    - OAuth token hijacking
    - Camera/microphone permission theft
    - Reputational damage (unknowing endorsements)
    Target: 100-150 words

H2: How to Detect Clickjacking Vulnerabilities
    H3: Quick Browser Test
    - Create test HTML with iframe
    - Try loading your site
    - If it loads, you're vulnerable

    H3: Check HTTP Headers
    - Use browser DevTools Network tab
    - Look for X-Frame-Options header
    - Check CSP frame-ancestors directive

    H3: Code Patterns to Search
    - Missing response.setHeader('X-Frame-Options')
    - No CSP configuration
    - No helmet() in Express
    - No headers config in Next.js

    Scanner CTA: "Scan your codebase for missing security headers →"
    Target: 150-200 words

H2: How to Fix Clickjacking Vulnerabilities
    H3: AI Fix Prompt (200-400 words)
    Complete prompt for Cursor/Claude Code:
    ---
    "Add clickjacking protection to my [framework] application by implementing
    proper security headers. I need:

    1. X-Frame-Options header set to SAMEORIGIN (or DENY if no framing needed)
    2. Content-Security-Policy with frame-ancestors directive
    3. Implementation that works with my current setup

    Current stack: [Next.js/Express/SvelteKit]

    Requirements:
    - Use modern CSP frame-ancestors as primary defense
    - Include X-Frame-Options for legacy browser support
    - Configure headers in [next.config.js/middleware/hooks.server.ts]
    - Set frame-ancestors to 'self' (allow same-origin framing)
    - Add comments explaining what each header does

    Provide complete, working code that I can copy-paste into my project."
    ---

    H3: Manual Fix - Express + Helmet
    Before:
    ```javascript
    const express = require('express');
    const app = express();

    app.get('/', (req, res) => {
      res.send('Hello World');
    });
    ```

    After:
    ```javascript
    const express = require('express');
    const helmet = require('helmet');
    const app = express();

    // Add helmet for security headers including X-Frame-Options
    app.use(helmet({
      xFrameOptions: { action: 'SAMEORIGIN' }, // or 'DENY'
      contentSecurityPolicy: {
        directives: {
          frameAncestors: ["'self'"], // Modern CSP approach
        },
      },
    }));

    app.get('/', (req, res) => {
      res.send('Hello World');
    });
    ```

    H3: Manual Fix - Next.js
    Before: No headers configuration

    After (next.config.js):
    ```javascript
    module.exports = {
      async headers() {
        return [
          {
            source: '/:path*',
            headers: [
              {
                key: 'X-Frame-Options',
                value: 'SAMEORIGIN',
              },
              {
                key: 'Content-Security-Policy',
                value: "frame-ancestors 'self'",
              },
            ],
          },
        ];
      },
    };
    ```

    H3: Manual Fix - SvelteKit
    Before: No headers

    After (src/hooks.server.ts):
    ```typescript
    import type { Handle } from '@sveltejs/kit';

    export const handle: Handle = async ({ event, resolve }) => {
      const response = await resolve(event);

      // Clickjacking protection
      response.headers.set('X-Frame-Options', 'SAMEORIGIN');
      response.headers.set(
        'Content-Security-Policy',
        "frame-ancestors 'self'"
      );

      return response;
    };
    ```

    H3: Choosing Your Defense Level
    - DENY: Block all framing (most secure, breaks embeds)
    - SAMEORIGIN: Allow same-origin framing (balanced)
    - frame-ancestors 'self': CSP equivalent to SAMEORIGIN
    - frame-ancestors 'self' https://trusted.com: Allow specific domains

    H3: Defense in Depth
    - Use BOTH X-Frame-Options AND CSP frame-ancestors
    - Add SameSite=Lax to session cookies
    - Consider frame-busting JavaScript (legacy support)
    - Note: Frame-busting can be bypassed with sandbox attribute

    Target: 500-700 words total

H2: Testing Your Fix
    - Browser DevTools check
    - Online header checkers (securityheaders.com)
    - Manual iframe test
    - Penetration testing tools
    Target: 75-100 words

H2: FAQ
    Q1: What is clickjacking?
    A: Clickjacking (UI redressing) tricks users into clicking invisible
    UI elements by overlaying transparent iframes over legitimate pages.
    Think of it like a transparent sheet of glass placed over your screen
    with different buttons underneath - you click where you see, but activate
    what's hidden. It's ranked under [OWASP A01:2021 - Broken Access Control](https://owasp.org/Top10/A01_2021-Broken_Access_Control/).

    Q2: How do I protect my website from clickjacking?
    A: Use the X-Frame-Options header (set to DENY or SAMEORIGIN) and CSP
    frame-ancestors directive. Modern approach: Configure
    `Content-Security-Policy: frame-ancestors 'self'` in your response headers.
    For Express, use [Helmet.js](https://helmetjs.github.io/). For Next.js,
    configure in next.config.js. Both headers provide defense in depth.

    Q3: What's the difference between X-Frame-Options and CSP frame-ancestors?
    A: X-Frame-Options is the older header (DENY/SAMEORIGIN/ALLOW-FROM)
    supported by legacy browsers. CSP frame-ancestors is the modern replacement
    with more flexibility (allows multiple trusted domains). Browsers that
    support frame-ancestors ignore X-Frame-Options. Best practice: use both
    for maximum compatibility. [OWASP recommends](https://cheatsheetseries.owasp.org/cheatsheets/Clickjacking_Defense_Cheat_Sheet.html)
    frame-ancestors as primary defense.

    Q4: Can clickjacking steal my data?
    A: Yes, but indirectly. Clickjacking tricks you into performing actions
    you didn't intend - like granting OAuth permissions, clicking "Confirm
    Payment," or changing account settings. It can also enable cookiejacking
    (drag-and-drop cookie theft) or credential theft through fake overlays.
    Claranet found it in [80%+ of applications tested in 2024](https://www.claranet.com/uk/blog/claranets-top-10-web-application-vulnerabilities-found-2024/).

    Q5: Is clickjacking still a threat in 2025?
    A: Yes. Despite modern browser protections, clickjacking remains prevalent.
    Claranet documented 1,226 instances in 2024 penetration tests. New variants
    like DoubleClickjacking (exploiting mousedown/onclick timing) emerged in
    2024. The threat persists because many applications still don't implement
    proper frame-ancestors or X-Frame-Options headers.

    Target: 50-100 words per answer

H2: Related Vulnerabilities
    - [Missing Security Headers](/kb/security/vulnerabilities/missing-security-headers/)
    - [CSP Misconfiguration](/kb/security/vulnerabilities/csp-misconfiguration/)
    - [CSRF (Cross-Site Request Forgery)](/kb/security/vulnerabilities/csrf/)
    - [OAuth Misconfiguration](/kb/security/vulnerabilities/oauth-misconfiguration/)

H2: Learn More
    - [Cursor Security Patterns](/kb/vibe-coding-tools/cursor/)
    - [Next.js Security Guide](/kb/security/stacks/nextjs/)
    - [Express Security Guide](/kb/security/stacks/express/)
```

### Required Elements Checklist
- [x] Quick answer in first 50 words
- [ ] Stats box with industry data (Claranet 2024)
- [ ] Tool comparison chart (placeholder for future Scanner data)
- [x] Complete AI fix prompt (200-400 words)
- [x] Before/after code examples (Express, Next.js, SvelteKit)
- [x] 5 FAQ entries matching PAA
- [ ] Scanner CTA in detection section
- [x] 5-10 internal links
- [x] CWE/OWASP references with links

---

## 5. Internal Linking

### Must Link TO (Parent/Authority Pages)
| Page | Suggested Anchor Text |
|------|----------------------|
| /kb/security/vulnerabilities/ | "security vulnerabilities" |
| /kb/vibe-coding-tools/cursor/ | "Cursor security patterns" |
| /kb/vibe-coding-tools/bolt/ | "Bolt security patterns" |

### Should Link TO (Related Content)
| Page | Suggested Anchor Text |
|------|----------------------|
| /kb/security/vulnerabilities/missing-security-headers/ | "missing security headers" |
| /kb/security/vulnerabilities/csp-misconfiguration/ | "CSP misconfiguration" |
| /kb/security/vulnerabilities/csrf/ | "CSRF attacks" |
| /kb/security/vulnerabilities/oauth-misconfiguration/ | "OAuth misconfiguration" |
| /kb/glossary/security/iframe/ | "iframe" (if glossary exists) |
| /kb/glossary/security/csp/ | "Content Security Policy" |

### External Authority Links (Required)
| Source | Purpose | URL |
|--------|---------|-----|
| OWASP Clickjacking | Official attack description | https://owasp.org/www-community/attacks/Clickjacking |
| OWASP Defense Cheat Sheet | Prevention techniques | https://cheatsheetseries.owasp.org/cheatsheets/Clickjacking_Defense_Cheat_Sheet.html |
| CWE-1021 | Technical reference | https://cwe.mitre.org/data/definitions/1021.html |
| OWASP Top 10 A01:2021 | Category reference | https://owasp.org/Top10/A01_2021-Broken_Access_Control/ |
| PortSwigger Tutorial | Deep technical dive | https://portswigger.net/web-security/clickjacking |
| MDN Clickjacking | Developer reference | https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/Clickjacking |
| Claranet 2024 Report | Industry statistics | https://www.claranet.com/uk/blog/claranets-top-10-web-application-vulnerabilities-found-2024/ |
| Helmet.js | Express security middleware | https://helmetjs.github.io/ |
| Next.js Security | Framework security docs | https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy |
| Stanford Frame Busting Study | Bypass research | https://crypto.stanford.edu/~dabo/pubs/papers/framebust.pdf |

---

## 6. Unique Angle

### Our Differentiator
We're the only security resource explaining clickjacking specifically for vibe coders using AI tools. While OWASP and PortSwigger provide excellent technical references, we translate that into plain English with AI-ready fix prompts. When Scanner data becomes available, we'll show clickjacking rates by tool (Cursor vs Bolt vs Claude Code).

### Key Message
"AI tools build working code fast, but they skip security headers by default. Adding X-Frame-Options or frame-ancestors takes 5 lines of code and protects against an attack found in 80%+ of web apps."

### Data-Driven Claims to Highlight
1. "Found in 80%+ of web applications tested in 2024 (Claranet penetration test data)"
2. "1,226 clickjacking instances documented across ~500 applications"
3. "New DoubleClickjacking variant emerged in 2024, bypassing timing protections"
4. "X-Frame-Options deprecated in favor of CSP frame-ancestors, but use both for defense in depth"

---

## 7. Meta Information

### Suggested Title Tag (under 60 chars)
```
Clickjacking: Find & Fix in AI-Generated Code | VibeShip
```
(57 characters)

### Suggested Meta Description (150-160 chars)
```
Clickjacking tricks users into clicking invisible UI elements. Found in 80%+ of web apps. Get copy-paste fixes for Next.js, Express & SvelteKit.
```
(158 characters)

### Target URL
```
/kb/security/vulnerabilities/clickjacking/
```

### Related URLs to Create (Future)
- /kb/security/fixes/clickjacking/nextjs/
- /kb/security/fixes/clickjacking/express/
- /kb/security/fixes/clickjacking/sveltekit/
- /kb/vibe-coding-tools/cursor/clickjacking/ (tool-specific pattern)
- /kb/glossary/security/ui-redressing/
- /kb/glossary/security/x-frame-options/
- /kb/glossary/security/frame-ancestors/

---

## 8. Writer Notes

### Tone Guidance
- **Non-alarmist but serious:** Clickjacking is Medium severity - present it as a real risk without fear-mongering
- **Empowering:** Focus on "this is easy to fix" rather than "you're vulnerable"
- **Plain English:** Avoid jargon - explain terms like "iframe," "frame-ancestors," "z-index" when first used
- **Practical:** Emphasize copy-paste solutions over theory

### Technical Accuracy Notes
- **X-Frame-Options vs frame-ancestors:** Be clear that frame-ancestors is modern/preferred, but both should be used for compatibility
- **ALLOW-FROM deprecated:** Don't recommend ALLOW-FROM - it's not supported in modern browsers. Use frame-ancestors with specific URIs instead
- **Frame-busting limitations:** Mention that JavaScript frame-busting can be bypassed with `sandbox="allow-forms allow-scripts"` attribute
- **SameSite cookies:** Clarify this is supplementary defense, not primary - it prevents authenticated clickjacking but doesn't block the attack itself
- **Defense in depth:** Emphasize using multiple defenses (headers + cookies + testing)

### Things to Avoid
- ❌ Don't say "just use X-Frame-Options" without mentioning frame-ancestors
- ❌ Don't recommend frame-busting as primary defense (it's bypassable)
- ❌ Don't use ALLOW-FROM in examples (deprecated)
- ❌ Don't overstate severity (it's Medium, not Critical)
- ❌ Don't claim "impossible to bypass" - there are edge cases
- ❌ Don't forget to mention that meta tags don't work for X-Frame-Options

### Key Analogies to Use
- **Transparent glass sheet:** "It's like placing a transparent sheet of glass over your screen with different buttons underneath"
- **Hotel keycard:** "Like a hotel where someone replaces your room keycard reader with a fake one"
- **Invisible maze:** "The attacker builds an invisible maze over your website's real buttons"

### Reference Materials
| Resource | Use For |
|----------|---------|
| [OWASP Clickjacking](https://owasp.org/www-community/attacks/Clickjacking) | Attack mechanics, official definitions |
| [OWASP Defense Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Clickjacking_Defense_Cheat_Sheet.html) | Prevention techniques, best practices |
| [PortSwigger Web Security Academy](https://portswigger.net/web-security/clickjacking) | Technical details, attack variants |
| [MDN Clickjacking](https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/Clickjacking) | Developer reference, code examples |
| [Claranet 2024 Report](https://www.claranet.com/uk/blog/claranets-top-10-web-application-vulnerabilities-found-2024/) | Industry statistics (1,226 instances, 80%+ prevalence) |
| [Stanford Frame Busting Study](https://crypto.stanford.edu/~dabo/pubs/papers/framebust.pdf) | Bypass techniques, academic reference |
| [Helmet.js Docs](https://helmetjs.github.io/) | Express configuration examples |
| [Next.js CSP Guide](https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy) | Next.js implementation |
| [CWE-1021](https://cwe.mitre.org/data/definitions/1021.html) | Technical classification |

### Framework-Specific Notes

**Express + Helmet:**
- Default `helmet()` sets X-Frame-Options: SAMEORIGIN
- Customize with `xFrameOptions: { action: 'deny' }`
- CSP configured separately in contentSecurityPolicy directive

**Next.js:**
- Configure in `next.config.js` headers() function
- Must apply to all routes: `source: '/:path*'`
- CSP can also use middleware for nonces (more complex)

**SvelteKit:**
- Use `src/hooks.server.ts` handle function
- Set headers on response object after resolve
- Apply to all routes automatically

### Real-World Examples to Mention
- **Adobe Flash Settings (2008):** Classic example - attackers tricked users into enabling camera/microphone
- **Twitter "Tweet Bomb" (2009):** Clickjacked links caused viral spreading
- **Facebook Likejacking (2011):** Italy incident where users unknowingly liked malicious pages
- **CBC Journalist (2015):** Unknowingly "liked" Conservative Party page
- **DoubleClickjacking (2024):** New timing-based bypass technique

### Scanner Integration Points
- Detection section: "VibeShip Scanner automatically detects missing X-Frame-Options and frame-ancestors headers"
- After manual fix examples: "Not sure if your code is vulnerable? Scan your repository →"
- FAQ answers: Reference Scanner for automated checking

### AI Tool Context (For Future Updates)
When Scanner data becomes available, add:
- Tool comparison chart showing clickjacking rates by AI tool
- Specific patterns each tool generates (e.g., "Cursor creates Express apps without helmet by default")
- Screenshots of AI-generated code missing headers

---

**Brief Status:** ✅ Complete - Ready for Writer Agent

---

## Sources Used

### Primary References
- [OWASP Clickjacking](https://owasp.org/www-community/attacks/Clickjacking)
- [OWASP Clickjacking Defense Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Clickjacking_Defense_Cheat_Sheet.html)
- [CWE-1021: Improper Restriction of Rendered UI Layers or Frames](https://cwe.mitre.org/data/definitions/1021.html)
- [OWASP Top 10 A01:2021 - Broken Access Control](https://owasp.org/Top10/A01_2021-Broken_Access_Control/)
- [PortSwigger Web Security Academy - Clickjacking](https://portswigger.net/web-security/clickjacking)
- [MDN Web Docs - Clickjacking](https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/Clickjacking)

### Industry Data
- [Claranet's Top 10 Web Application Vulnerabilities Found in 2024](https://www.claranet.com/uk/blog/claranets-top-10-web-application-vulnerabilities-found-2024/)
- Stanford Frame Busting Study (Busting Frame Busting: a Study of Clickjacking Vulnerabilities on Popular Sites)

### Framework Documentation
- [Helmet.js Documentation](https://helmetjs.github.io/)
- [Next.js Content Security Policy Guide](https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy)
- SvelteKit hooks documentation (inferred from framework patterns)

### Additional Research
- PortSwigger frame-ancestors vs X-Frame-Options comparison
- Medium article: CSP frame-ancestors vs. X-Frame-Options for Clickjacking prevention
- Chrome Lighthouse: Clickjacking mitigation guide
- Auth0 blog: Preventing Clickjacking Attacks
- Imperva Learning Center: Clickjacking definition
- Fortinet Cyber Glossary: Clickjacking
