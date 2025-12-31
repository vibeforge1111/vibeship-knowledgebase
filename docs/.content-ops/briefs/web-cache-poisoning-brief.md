# Content Brief: Web Cache Poisoning

**Generated:** December 2024
**Target Publish:** December 2024
**Priority:** P0 (High-value gap)
**Status:** Ready for Writer

---

## 1. Core Data

### Security References
| Metric | Value | Source |
|--------|-------|--------|
| **CWE ID** | CWE-525 | MITRE |
| **CWE Name** | Use of Web Browser Cache Containing Sensitive Information | MITRE |
| **Related CWE** | CWE-444 (HTTP Request Smuggling) | MITRE |
| **OWASP Category** | A04:2021 - Insecure Design | OWASP |
| **OWASP API** | API8:2023 - Security Misconfiguration | OWASP |
| **Severity** | High/Critical | CVSS 7.5-9.1 |

### Why AI Tools Generate This
- AI generates CDN/cache configurations without understanding cache key implications
- Default cache headers in AI-generated code often cache more than intended
- Unkeyed headers are frequently missed in AI-generated security reviews
- AI-suggested caching optimizations prioritize performance over security

### Notable Incidents
- **PayPal (2021):** Cache poisoning via unkeyed Accept-Language header
- **GitLab (2020):** Password reset poisoning via X-Forwarded-Host
- **Red Hat (2019):** Cache poisoning via unkeyed headers
- **Drupal (2014):** Stored XSS via cached poisoned responses
- **Multiple CDNs:** Ongoing issues with cache key normalization

---

## 2. SEO Strategy

### Target Keywords
| Keyword | Intent | Our Angle |
|---------|--------|-----------|
| web cache poisoning | Informational | AI-generated cache configs |
| cache poisoning attack | Informational | Plain English explanation |
| cache poisoning fix | Transactional | Copy-paste CDN configs |
| cache key injection | Informational | Technical how-it-works |

### People Also Ask (FAQ Targets)
1. "What is web cache poisoning?"
2. "How do I prevent cache poisoning?"
3. "What is the difference between cache poisoning and cache deception?"
4. "How do I detect cache poisoning vulnerabilities?"
5. "Is cache poisoning the same as DNS cache poisoning?"

---

## 3. Competitive Analysis

### Content Gaps (Our Opportunities)
1. No competitor covers AI-generated CDN/cache configurations
2. No vibe coder audience focus (most assume devops expertise)
3. No copy-paste Vercel/Cloudflare/Fastly configs
4. No "which headers are safe to cache" quick reference

---

## 4. Content Structure

### Required Sections
```
H1: Web Cache Poisoning: Find & Fix in AI-Generated Code

Quick Answer Box

H2: What is web cache poisoning?
    - Plain English: "shared drink" analogy
    - Cache keys vs unkeyed inputs
    - 100-150 words

H2: Why vibe coded apps are vulnerable
    - AI generates cache configs for performance
    - Unkeyed headers overlooked
    - 150-200 words

H2: Real-World Impact
    - PayPal, GitLab examples
    - XSS via cache, session hijacking
    - 75-100 words

H2: How to detect cache poisoning
    - Header fuzzing approach
    - Cache buster techniques
    - Scanner CTA
    - 100-150 words

H2: How to fix web cache poisoning
    H3: AI Fix Prompt (200-400 words)
    H3: Quick Fixes by Platform
        - Vercel configuration
        - Cloudflare configuration
        - Nginx/Varnish configuration
    - 200-300 words

H2: FAQ (5 questions)

H2: Related Content
```

---

## 5. Unique Angle

### Our Differentiator
Focus on AI-generated CDN configurations and how vibe coders accidentally create cache poisoning vulnerabilities when adding performance optimizations. Most content assumes security expertise.

### Key Message
Cache poisoning happens when your cache stores a response that includes attacker-controlled content, then serves it to other users. AI tools often generate aggressive caching without considering which inputs affect the cached content.

### Analogy
"Web cache poisoning is like tampering with a shared drink pitcher at a party. You poison one drink, and everyone who pours from that pitcher gets the poison. The cache is the pitcher."

---

## 6. Meta Information

### Title Tag (under 60 chars)
```
Web Cache Poisoning: Detect & Fix Guide | VibeShip
```

### Meta Description (150-160 chars)
```
Web cache poisoning lets attackers inject malicious content served to all users. Learn to detect unkeyed headers and fix cache configurations in your app.
```

### Target URL
```
/kb/security/vulnerabilities/web-cache-poisoning/
```

---

## 7. Writer Notes

### Persona Recommendation
**@pager_duty (The Firefighter)** - This is an urgent, high-impact vulnerability. Firefighter energy works well for "your cache is serving XSS to everyone" urgency.

### Technical Accuracy Notes
- Cache poisoning exploits unkeyed headers (headers not in cache key)
- Different from DNS cache poisoning (completely different attack)
- Different from cache deception (tricks ONE user, not all users)
- Common unkeyed headers: X-Forwarded-Host, X-Forwarded-Proto, Accept-Language
- Cache-Control, Vary headers are the defensive controls

### Things to Avoid
- Don't confuse with DNS cache poisoning
- Don't confuse with cache deception (different attack pattern)
- Don't recommend disabling caching (impractical)
- Don't skip the "understanding cache keys" section

---

**Brief Status:** ✅ Complete - Ready for Phase 2
