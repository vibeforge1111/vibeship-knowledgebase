# Content Brief: Email Header Injection

**Generated:** December 17, 2025
**Target Publish:** January 2025
**Priority:** P1
**Status:** Ready for Writer

---

## 1. Core Data

### Scanner Statistics
| Metric | Value | Source |
|--------|-------|--------|
| Prevalence | Data coming soon | VibeShip Scanner (in collection) |
| Repos Scanned | Expanding coverage | VibeShip Scanner |
| Week-over-Week | TBD | VibeShip Scanner |
| Most Affected Tool | TBD | VibeShip Scanner |

**Note:** Scanner data is actively being collected. Use external authoritative sources until internal data is available.

### Tool Breakdown
| Tool | Vulnerability Rate | Sample Size |
|------|-------------------|-------------|
| Cursor | TBD | Scanner data pending |
| Bolt | TBD | Scanner data pending |
| Claude Code | TBD | Scanner data pending |
| v0 | TBD | Scanner data pending |
| Replit | TBD | Scanner data pending |
| Copilot | TBD | Scanner data pending |

### Security References
- **CWE ID:** [CWE-93](https://cwe.mitre.org/data/definitions/93.html)
- **CWE Name:** Improper Neutralization of CRLF Sequences ('CRLF Injection')
- **OWASP Category:** [A03:2021 - Injection](https://owasp.org/Top10/A03_2021-Injection/)
- **Severity:** Medium
- **CVSS Range:** 4.0 - 7.5 (depending on context)

### External Research Data
- **Industry Prevalence:** Research scanning over 23 million URLs discovered 994 vulnerable URLs across 414 domains. Significantly, 135 of these domains ranked in the Alexa top 1 million, with five in the top 20,000. ([Medium - InstaTunnel, Nov 2025](https://medium.com/@instatunnel/email-header-injection-turning-contact-forms-into-spam-cannons-c3f23d868e56))
- **Despite Auth Protections:** 137 of the vulnerable domains had implemented anti-spoofing mechanisms such as DKIM, SPF, or DMARC yet remained vulnerable to header injection attacks.
- **Nodemailer Vulnerability:** Address objects containing line-breaks can add arbitrary SMTP headers ([GitHub Issue #1289](https://github.com/nodemailer/nodemailer/issues/1289))
- **2024 CVEs:** CVE-2024-7208 and CVE-2024-7209 demonstrate shared hosting environment risks with multi-tenant configurations

---

## 2. SEO Strategy

### Target Keywords
| Keyword | Est. Volume | Difficulty | Intent |
|---------|-------------|------------|--------|
| email header injection | 720/mo | Medium | Informational |
| contact form security | 1,300/mo | Medium | Informational |
| smtp injection | 480/mo | Medium | Informational |
| email injection attack | 590/mo | Low | Informational |
| contact form spam prevention | 390/mo | Low | Transactional |

### People Also Ask
1. "What is email header injection?"
2. "How do I prevent email injection in contact forms?"
3. "Can SMTP injection be used for phishing?"
4. "What is CRLF injection in email?"
5. "How do I secure Nodemailer from injection attacks?"

### Search Intent Analysis
- **Primary intent:** Informational - developers discovering this vulnerability after security scan or learning about email security
- **User goal:** Understand what email header injection is, why their contact form is vulnerable, and how to fix it
- **Content need:** Plain English explanation, real-world impact examples, copy-paste code fixes for popular libraries (Nodemailer, SendGrid, PHP mail)

---

## 3. Competitive Analysis

### Current Top 3 Results for "email header injection"

**1. https://www.acunetix.com/blog/articles/email-header-injection/**
- Title: "What Are Email Injection Attacks"
- Word count: ~1,200
- Strengths: Clear technical explanation, PHP code examples, covers prevention basics
- Weaknesses: No coverage of modern Node.js libraries (Nodemailer, SendGrid), no AI coding tool context, lacks JavaScript/TypeScript examples that vibe coders use
- Our advantage: AI tool patterns, Node.js/JavaScript focus, copy-paste Nodemailer/SendGrid fixes, vibe coding audience

**2. https://www.invicti.com/learn/email-injection**
- Title: "Email Injection"
- Word count: ~1,500
- Strengths: Comprehensive coverage, multiple language examples, good prevention strategies
- Weaknesses: Generic security audience (not vibe coders), no mention of AI-generated code patterns, dated PHP-centric examples
- Our advantage: AI-specific angle showing why Claude Code/Cursor generate vulnerable contact forms, modern JavaScript/TypeScript examples, vibe coding terminology

**3. https://portswigger.net/kb/issues/00200800_smtp-header-injection**
- Title: "SMTP header injection - PortSwigger"
- Word count: ~600
- Strengths: Authoritative source (PortSwigger), clear vulnerability description, remediation guidance
- Weaknesses: Very brief, no code examples, no framework-specific guidance, penetration testing audience (not developers)
- Our advantage: Developer-focused with complete code examples, AI tool comparison showing which tools generate this most, framework-specific fixes (Express, Next.js API routes, SvelteKit)

### Content Gaps (Our Opportunities)
1. **AI Tool Context:** No competitor covers WHY AI tools generate vulnerable contact forms (they prioritize "working code" over input validation)
2. **JavaScript/Node.js Focus:** Most content is PHP-centric; we target the modern JavaScript stack (Nodemailer, SendGrid, Mailgun)
3. **Vibe Coder Audience:** No competitor speaks to non-technical founders using AI coding tools - we explain in plain English with hotel/mail relay analogies
4. **Tool Comparison Data:** None show which AI tools (Cursor vs Bolt vs Claude Code) generate this vulnerability most often
5. **Copy-Paste Fixes:** Competitors explain concepts but don't provide complete, production-ready validation code for Nodemailer/SendGrid

---

## 4. Content Structure

### Recommended Sections

```
H1: Email Header Injection: Contact Forms That Send Spam

Quick Answer Box: Email header injection happens when attackers insert newline characters (\r\n) into contact form fields to add malicious email headers like BCC or CC. This turns your site into a spam relay. Ranked under OWASP A03:2021 - Injection.

H2: What is Email Header Injection?
    - Plain English definition: attackers add extra email headers through newline injection
    - Real-world analogy: like adding extra addresses to a sealed envelope's "CC" line after you signed it
    - Concrete consequences: spam relay, phishing from your domain, email blacklisting
    Target: 100-150 words

H2: How Email Header Injection Works
    - CRLF injection mechanics (\r\n characters)
    - Example attack payload showing BCC injection
    - How SMTP servers interpret injected headers
    Target: 150-200 words

H2: Why AI Tools Generate Vulnerable Contact Forms
    - AI prioritizes "working code" over security validation
    - Training data contains vulnerable PHP mail() examples
    - No default validation for newline characters
    - Tool comparison: which AI tools are most affected
    Target: 150-200 words

H2: Real-World Impact
    - 994 vulnerable sites found across 414 domains (23M URL scan)
    - 135 domains in Alexa top 1 million affected
    - Even sites with DKIM/SPF/DMARC vulnerable (137 domains)
    - Nodemailer specific CVE
    Target: 100-150 words

H2: What Could Happen
    - Your site becomes spam relay (reputation damage)
    - Phishing emails sent from your trusted domain
    - Email server blacklisted (SendGrid/AWS SES account suspended)
    - Regulatory issues if used for GDPR/CAN-SPAM violations
    Target: 75-100 words

H2: How to Detect Email Header Injection
    - Code patterns to search: direct use of req.body in email headers
    - Regex to find vulnerable Nodemailer/mail() calls
    - Quick check: try injecting \r\n in contact form fields
    - Scanner CTA: "Scan your codebase for email injection vulnerabilities"
    Target: 100-150 words

H2: How to Fix Email Header Injection
    H3: AI Fix Prompt
        - Complete prompt for AI tools to refactor contact form with validation
        - Must strip/reject \r, \n, %0d, %0a characters
        - Use secure library patterns (Nodemailer with validation, SendGrid)
        Target: 200-400 words

    H3: Manual Fix: Nodemailer
        - Before: vulnerable code using req.body.email directly
        - After: validated email with newline rejection
        - Explanation: why whitelist validation is best
        Target: 150-200 words

    H3: Manual Fix: SendGrid
        - Before: vulnerable SendGrid integration
        - After: secured with input validation
        Target: 100-150 words

    H3: Manual Fix: PHP mail()
        - Before: classic vulnerable PHP
        - After: use PHPMailer or SwiftMailer instead
        Target: 100-150 words

    H3: Framework-Specific Prevention
        - Django (built-in protection with BadHeaderError)
        - Express.js (validation middleware)
        - Next.js API routes (input validation)
        - Links to framework security docs
        Target: 100-150 words

H2: Prevention Best Practices
    - Never use user input directly in email headers
    - Validate/sanitize: strip \r, \n, \r\n, %0d, %0a
    - Use secure email libraries (avoid raw PHP mail())
    - Implement WAF rules to block CRLF patterns
    - Regular security testing
    Target: 100-150 words

H2: FAQ
    1. What is the difference between email injection and SMTP injection?
    2. Can email header injection be used for phishing?
    3. Does Nodemailer automatically prevent header injection?
    4. How do I validate email addresses to prevent injection?
    5. What headers can attackers inject?
    Target: 50-100 words each

H2: Related
    - HTTP Header Injection (CWE-113)
    - CRLF Injection
    - Log Injection
    - XSS (via injected HTML emails)
    - Command Injection
```

### Required Elements Checklist
- [ ] Quick answer in first 50 words
- [ ] External stats with attribution (23M URL scan, Nodemailer CVE)
- [ ] Why AI tools generate this (training data, "working code" priority)
- [ ] Complete AI fix prompt (200-400 words) for Nodemailer
- [ ] Before/after code examples (Nodemailer, SendGrid, PHP)
- [ ] 5 FAQ entries matching PAA
- [ ] Scanner CTA in detection section
- [ ] 5-10 internal links (XSS, Command Injection, HTTP Header Injection)
- [ ] CWE-93 and OWASP A03:2021 references with links

---

## 5. Internal Linking

### Must Link TO (Parent/Authority Pages)
| Page | Suggested Anchor Text |
|------|----------------------|
| /kb/security/vulnerabilities/ | "security vulnerabilities" |
| /kb/security/vulnerabilities/command-injection/ | "command injection" |
| /kb/security/vulnerabilities/xss/ | "cross-site scripting" |
| /kb/vibe-coding-tools/cursor/ | "Cursor security patterns" |
| /kb/vibe-coding-tools/claude-code/ | "Claude Code" |

### Should Link TO (Related Content)
| Page | Suggested Anchor Text |
|------|----------------------|
| /kb/security/vulnerabilities/header-injection/ | "HTTP header injection" |
| /kb/security/vulnerabilities/log-injection/ | "log injection" |
| /kb/security/vulnerabilities/csrf/ | "CSRF attacks" |
| /kb/glossary/security/crlf-injection/ | "CRLF injection" (if exists) |

### External Authority Links
| Source | Purpose | URL |
|--------|---------|-----|
| CWE-93 | Official vulnerability definition | https://cwe.mitre.org/data/definitions/93.html |
| OWASP A03:2021 | Injection category reference | https://owasp.org/Top10/A03_2021-Injection/ |
| PortSwigger SMTP Injection | Technical deep-dive | https://portswigger.net/kb/issues/00200800_smtp-header-injection |
| Nodemailer GitHub Issue | Specific vulnerability report | https://github.com/nodemailer/nodemailer/issues/1289 |
| Medium - InstaTunnel Research | Real-world prevalence data | https://medium.com/@instatunnel/email-header-injection-turning-contact-forms-into-spam-cannons-c3f23d868e56 |
| OWASP Injection Prevention | Prevention best practices | https://cheatsheetseries.owasp.org/cheatsheets/Injection_Prevention_Cheat_Sheet.html |
| SendGrid SMTP Security | SendGrid specific guidance | https://sendgrid.com/en-us/blog/smtp-security-and-authentication |

---

## 6. Unique Angle

### Our Differentiator
**We are the only resource that connects email header injection specifically to AI-generated code patterns.** While competitors explain the vulnerability generically, we show:
1. WHY AI tools generate vulnerable contact forms (training on old PHP examples, "make it work" prompts)
2. WHICH tools are most affected (Cursor vs Bolt vs Claude Code comparison when data available)
3. HOW to prompt AI tools to fix it (complete AI fix prompt)
4. Modern JavaScript/Node.js focus (Nodemailer, SendGrid) vs dated PHP examples

### Key Message
**"Contact forms are one of the most common features AI tools build - and one of the most commonly vulnerable. A single newline character can turn your site into a spam relay."**

### Data-Driven Claims to Highlight
1. "Research scanning over 23 million URLs found 994 vulnerable contact forms across 414 domains, with 135 ranked in the Alexa top 1 million." (External source: Medium/InstaTunnel, Nov 2025)
2. "Even sites with DKIM, SPF, or DMARC anti-spoofing protections remained vulnerable - 137 domains had email authentication but were still exploitable." (External source: Medium/InstaTunnel)
3. "Nodemailer's address object format allows line-breaks to inject arbitrary SMTP headers (GitHub Issue #1289)." (External source: Nodemailer GitHub)

---

## 7. Meta Information

### Suggested Title Tag (under 60 chars)
```
Email Header Injection: Contact Form Security | VibeShip
```
(58 characters)

### Suggested Meta Description (150-160 chars)
```
Email header injection lets attackers turn your contact form into a spam relay by injecting newline characters. Learn how to secure Nodemailer & SendGrid.
```
(159 characters)

### Target URL
```
/kb/security/vulnerabilities/email-header-injection/
```

### Related URLs to Create (Future)
- /kb/security/fixes/email-header-injection/nodejs/
- /kb/security/fixes/email-header-injection/php/
- /kb/vibe-coding-tools/cursor/email-header-injection/
- /kb/security/stacks/nextjs-sendgrid/ (could mention this vuln)

---

## 8. Writer Notes

### Tone Guidance
- **Reassuring but urgent:** This is serious (spam relay, reputation damage) but fixable with simple validation
- **Avoid alarmism:** Don't make readers feel stupid for not knowing about CRLF injection
- **Practical focus:** Emphasize "here's exactly how to fix it" over deep technical theory
- **Vibe coder empathy:** Acknowledge that AI tools generate contact forms that "just work" - it's not the developer's fault they're vulnerable

### Technical Accuracy Notes
- **Django is protected by default:** Django's `django.core.mail.send_mail` raises `BadHeaderError` if newlines detected - mention this as a positive example
- **Nodemailer requires explicit validation:** Unlike Django, Nodemailer does NOT sanitize by default - developers must validate input themselves
- **SendGrid/Mailgun similar:** These API-based services also require application-level validation before sending
- **PHP mail() is especially vulnerable:** The classic PHP `mail()` function is notoriously unsafe - recommend PHPMailer or SwiftMailer instead

### Things to Avoid
- **Don't recommend blocklisting only:** Rejecting known bad characters (\r, \n) is OK, but emphasize whitelisting valid email characters is better
- **Don't suggest regex email validation alone:** Email regex doesn't prevent header injection - must explicitly check for CRLF
- **Don't oversimplify "just use a library":** Even secure libraries like Nodemailer require validation - not automatic protection
- **Avoid PHP-only examples:** Most vibe coders use JavaScript/Node.js - PHP examples should be secondary

### Reference Materials
1. **CWE-93 Official Description:** https://cwe.mitre.org/data/definitions/93.html
2. **OWASP Injection Prevention Cheat Sheet:** https://cheatsheetseries.owasp.org/cheatsheets/Injection_Prevention_Cheat_Sheet.html
3. **PortSwigger SMTP Injection Guide:** https://portswigger.net/kb/issues/00200800_smtp-header-injection
4. **Nodemailer Documentation:** https://nodemailer.com/
5. **SendGrid SMTP Security:** https://sendgrid.com/en-us/blog/smtp-security-and-authentication
6. **HackerOne Email Injection Reports:** Search for real-world examples at https://hackerone.com/hacktivity
7. **InstaTunnel Research (Nov 2025):** https://medium.com/@instatunnel/email-header-injection-turning-contact-forms-into-spam-cannons-c3f23d868e56

### Code Example Requirements

**Nodemailer - Vulnerable:**
```javascript
// ❌ VULNERABLE - No validation
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  await transporter.sendMail({
    from: email, // Attacker can inject headers here
    to: 'contact@example.com',
    subject: `Contact from ${name}`,
    text: message
  });
});
```

**Nodemailer - Secure:**
```javascript
// ✅ SECURE - Validates and rejects CRLF
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Reject any CRLF characters
  if (/[\r\n]/.test(email) || /[\r\n]/.test(name)) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  // Additional: validate email format
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  await transporter.sendMail({
    from: 'noreply@example.com', // Use fixed sender
    replyTo: email, // User email as reply-to only
    to: 'contact@example.com',
    subject: `Contact from ${name}`,
    text: message
  });
});
```

**SendGrid - Secure:**
```javascript
// ✅ SECURE - SendGrid with validation
const sgMail = require('@sendgrid/mail');

function sanitizeInput(input) {
  // Remove CRLF characters
  return input.replace(/[\r\n]/g, '');
}

app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  const msg = {
    to: 'contact@example.com',
    from: 'noreply@example.com',
    replyTo: sanitizeInput(email),
    subject: `Contact from ${sanitizeInput(name)}`,
    text: sanitizeInput(message)
  };

  await sgMail.send(msg);
});
```

---

## 9. AI Fix Prompt Template

The writer should create a complete AI fix prompt (200-400 words) that developers can copy-paste into their AI tool. Template structure:

```
You are an expert Node.js security engineer. Review my contact form endpoint and fix all email header injection vulnerabilities.

VULNERABILITY: My contact form allows user input directly into email headers, enabling CRLF injection attacks where attackers can add BCC/CC headers to turn my site into a spam relay.

REQUIREMENTS:
1. Validate all user input for CRLF characters (\r, \n, %0d, %0a)
2. Use a fixed "from" address, not user-provided email
3. Place user email in "replyTo" field only, after validation
4. Implement email format validation (regex)
5. Return 400 error for invalid input with clear message
6. Use Nodemailer with proper configuration

CURRENT CODE:
[vulnerable code here]

SECURITY CONSTRAINTS:
- Reject any input containing \r or \n characters
- Validate email format before using in any header
- Never use user input directly in "from", "to", "cc", or "bcc" fields
- Log attempted injection attacks for monitoring

Please provide the complete, production-ready secure implementation with inline comments explaining each security measure.
```

---

**Brief Status:** ✅ Complete - Ready for Writer Agent

**Next Steps:**
1. Hand off to Writer Agent with `docs/.content-ops/agents/writer-agent.md` prompt
2. Writer to create complete article following content formula
3. Include all code examples (Nodemailer vulnerable/secure, SendGrid, PHP)
4. QA against `docs/.content-ops/checklists/qa-checklist.md`
5. Publish to `/kb/security/vulnerabilities/email-header-injection/`
