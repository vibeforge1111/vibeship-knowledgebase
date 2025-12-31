# Content Brief: Host Header Injection

**Generated:** December 2024
**Target Publish:** December 2024
**Priority:** P0 (High-value gap)
**Status:** Ready for Writer

---

## 1. Core Data

### Security References
| Metric | Value | Source |
|--------|-------|--------|
| **CWE ID** | CWE-20 | MITRE |
| **CWE Name** | Improper Input Validation | MITRE |
| **Related CWE** | CWE-644 (Improper Neutralization of HTTP Headers) | MITRE |
| **OWASP Category** | A05:2021 - Security Misconfiguration | OWASP |
| **OWASP Testing** | WSTG-INPV-17 | OWASP WSTG |
| **Severity** | Medium-High | CVSS 5.4-7.5 |

### Why AI Tools Generate This
- AI uses Host header for dynamic URL generation without validation
- Password reset emails with Host-derived links
- Redirect URLs built from Host header
- AI copies patterns without understanding header trust

### Notable Incidents
- **Django (Multiple CVEs):** Password reset poisoning via Host header
- **WordPress:** Multiple plugins vulnerable to Host header injection
- **Many SaaS apps:** Password reset token theft via Host manipulation

---

## 2. SEO Strategy

### Target Keywords
| Keyword | Intent | Our Angle |
|---------|--------|-----------|
| host header injection | Informational | Password reset poisoning focus |
| host header attack | Informational | Plain English explanation |
| host header vulnerability fix | Transactional | Copy-paste configs |
| password reset poisoning | Informational | Real-world attack scenario |

### People Also Ask (FAQ Targets)
1. "What is host header injection?"
2. "How do I prevent host header injection?"
3. "What is password reset poisoning?"
4. "Is the Host header safe to use?"
5. "How do I test for host header injection?"

---

## 3. Content Structure

### Required Sections
```
H1: Host Header Injection: Find & Fix in AI-Generated Code

Quick Answer Box

H2: What is host header injection?
    - Plain English: "return address" analogy
    - Password reset poisoning explained
    - 100-150 words

H2: Why vibe coded apps are vulnerable
    - Dynamic URL generation
    - Password reset flows
    - 150-200 words

H2: Real-World Impact
    - Account takeover scenarios
    - 75-100 words

H2: How to detect host header injection
    - Testing techniques
    - Scanner CTA
    - 100-150 words

H2: How to fix host header injection
    H3: AI Fix Prompt (200-400 words)
    H3: Framework-specific fixes
    - 200-300 words

H2: FAQ (5 questions)

H2: Related Content
```

---

## 5. Unique Angle

### Our Differentiator
Focus on password reset flows in vibe coded apps. Most content is generic—we show the actual attack and fix for AI-generated reset logic.

### Key Message
Host header injection happens when your app trusts the Host header for generating URLs. Attackers send a forged Host, and your password reset email contains their domain. They get the reset token.

### Analogy
"Host header injection is like someone changing the return address on your mail. When you reply, you send it to the attacker instead of who you thought."

---

## 6. Meta Information

### Title Tag (under 60 chars)
```
Host Header Injection: Detect & Fix Guide | VibeShip
```

### Meta Description (150-160 chars)
```
Host header injection lets attackers steal password reset tokens and hijack accounts. Learn to detect and fix this vulnerability in your app's URL generation.
```

### Target URL
```
/kb/security/vulnerabilities/host-header-injection/
```

---

## 7. Writer Notes

### Persona Recommendation
**@flaggedthis (The Auditor)** - This is about finding subtle issues in code. The Auditor's methodical, detail-oriented voice works well.

### Technical Accuracy Notes
- Host header can be forged by attackers
- Password reset emails are the primary attack vector
- X-Forwarded-Host can also be exploited
- Fix: use allowlist of valid hosts, or configure host in environment
- Most frameworks have built-in protection if configured

---

**Brief Status:** ✅ Complete - Ready for Phase 2
