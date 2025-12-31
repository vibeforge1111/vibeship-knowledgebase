# Content Brief: HTTP Request Smuggling

**Generated:** December 2024
**Target Publish:** December 2024
**Priority:** P0 (High-value gap)
**Status:** Ready for Writer

---

## 1. Core Data

### Security References
| Metric | Value | Source |
|--------|-------|--------|
| **CWE ID** | CWE-444 | MITRE |
| **CWE Name** | Inconsistent Interpretation of HTTP Requests | MITRE |
| **OWASP Category** | A04:2021 - Insecure Design | OWASP |
| **OWASP API** | API8:2023 - Security Misconfiguration | OWASP |
| **Severity** | Critical/High | CVSS 7.3-8.7 |
| **CAPEC** | CAPEC-33, CAPEC-105 | MITRE |

### Why AI Tools Generate This
- AI generates proxy/load balancer configs without understanding header parsing differences
- Default configurations don't enforce HTTP/2 end-to-end
- AI copies patterns from tutorials without security hardening
- Microservices architectures with mixed server types are common AI suggestions

---

## 2. SEO Strategy

### Target Keywords
| Keyword | Intent | Our Angle |
|---------|--------|-----------|
| http request smuggling | Informational | AI-generated proxy configs |
| request smuggling fix | Transactional | Copy-paste fixes |
| CL.TE vulnerability | Informational | Detection + fix |
| http desync attack | Informational | Plain English explanation |

### People Also Ask (FAQ Targets)
1. "What is HTTP request smuggling?"
2. "How do I prevent HTTP request smuggling?"
3. "What is CL.TE and TE.CL?"
4. "Is HTTP/2 vulnerable to request smuggling?"
5. "How do I detect request smuggling vulnerabilities?"

---

## 3. Competitive Analysis

### Current Top Results
**1. PortSwigger Web Security Academy**
- Strengths: Comprehensive, interactive labs, technical depth
- Weaknesses: No AI/vibe coding angle, complex for beginners
- Our advantage: Plain English + AI fix prompts

**2. OWASP**
- Strengths: Authoritative, technical standards
- Weaknesses: Dense, no practical fixes for modern stacks
- Our advantage: Framework-specific fixes, vibe coder audience

**3. Imperva/Security Vendors**
- Strengths: Good overviews
- Weaknesses: Product-focused, no copy-paste solutions
- Our advantage: Actionable fixes, AI tool context

### Content Gaps (Our Opportunities)
1. No competitor covers AI-generated proxy/CDN configurations
2. No plain English analogies for vibe coders
3. No copy-paste Nginx/Caddy/Vercel fixes
4. No detection methods for non-security-experts

---

## 4. Content Structure

### Required Sections
```
H1: HTTP Request Smuggling: Find & Fix in AI-Generated Code

Quick Answer Box (first 50 words)

H2: What is HTTP Request Smuggling?
    - Plain English: "traffic cop" analogy
    - CL.TE, TE.CL, TE.TE variants briefly
    - 100-150 words

H2: Why AI Tools Generate Vulnerable Configurations
    - Proxy/CDN patterns AI suggests
    - Mixed server architectures
    - 150-200 words

H2: Real-World Impact
    - Apple 2022 incident
    - Session hijacking, cache poisoning
    - 75-100 words

H2: How to Detect HTTP Request Smuggling
    - Symptoms in logs
    - Testing approach (timing-based)
    - Scanner CTA
    - 100-150 words

H2: How to Fix HTTP Request Smuggling
    H3: AI Fix Prompt (200-400 words)
    H3: Quick Fixes by Platform
        - Nginx configuration
        - Caddy configuration
        - Vercel/Cloudflare (managed CDN)
    - 200-300 words

H2: FAQ (5 questions from PAA)

H2: Related Content
```

---

## 5. Internal Linking

### Must Link TO
| Page | Anchor Text |
|------|-------------|
| /kb/security/vulnerabilities/ | security vulnerabilities |
| /kb/security/vulnerabilities/web-cache-poisoning/ | web cache poisoning |
| /kb/security/vulnerabilities/ssrf/ | SSRF attacks |
| /kb/security/vulnerabilities/missing-security-headers/ | security headers |

### External Authority Links
| Source | URL |
|--------|-----|
| CWE-444 | https://cwe.mitre.org/data/definitions/444.html |
| PortSwigger Tutorial | https://portswigger.net/web-security/request-smuggling |
| OWASP Testing Guide | https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Input_Validation_Testing/15-Testing_for_HTTP_Splitting_Smuggling |

---

## 6. Unique Angle

### Our Differentiator
Focus on AI-generated proxy/CDN configurations and how vibe coders accidentally create these vulnerabilities when setting up infrastructure. Most content assumes security expertise - we assume zero background.

### Key Message
HTTP request smuggling happens when your servers disagree about where one request ends and another begins. AI tools often generate mixed-server configs that create this exact problem.

### Analogy
"Imagine two security guards at different doors. One guard thinks your ID badge says 'VIP access' and the other thinks it says 'access the VIP's account.' Request smuggling exploits this confusion."

---

## 7. Meta Information

### Title Tag (under 60 chars)
```
HTTP Request Smuggling: Detect & Fix Guide | VibeShip
```

### Meta Description (150-160 chars)
```
HTTP request smuggling lets attackers hijack sessions and bypass security. Learn to detect CL.TE/TE.CL vulnerabilities and fix them with copy-paste configs.
```

### Target URL
```
/kb/security/vulnerabilities/http-request-smuggling/
```

---

## 8. Writer Notes

### Persona Recommendation
**@eli5sec (The Translator)** - This is a complex, advanced vulnerability that needs serious demystification. The "traffic cop" or "security guard" analogy is essential.

### Technical Accuracy Notes
- HTTP/2 end-to-end IS immune (important to emphasize)
- CL.TE means front-end uses Content-Length, back-end uses Transfer-Encoding
- This requires proxy/CDN + backend setup (not single-server apps)
- Most Vercel/Netlify/Cloudflare users are protected by default

### Things to Avoid
- Don't make it sound like every app is vulnerable (needs specific architecture)
- Don't recommend disabling proxies/CDNs (that's not practical)
- Don't skip the "am I even vulnerable?" section

---

**Brief Status:** ✅ Complete - Ready for Phase 2
