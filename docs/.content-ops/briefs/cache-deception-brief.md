# Content Brief: Web Cache Deception

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
| **Related CWE** | CWE-524 (Use of Cache Containing Sensitive Information) | MITRE |
| **OWASP Category** | A05:2021 - Security Misconfiguration | OWASP |
| **Severity** | High | CVSS 7.5-8.5 |

### Why AI Tools Generate This
- AI doesn't understand cache behavior differences
- Static file extensions assumed safe to cache
- Path normalization differences not considered
- Cache-Control headers often missing or wrong
- CDN configuration copied without understanding

---

## 2. SEO Strategy

### Target Keywords
| Keyword | Intent | Our Angle |
|---------|--------|-----------|
| web cache deception | Informational | Attack technique explained |
| cache deception attack | Informational | Path confusion focus |
| cache deception vs cache poisoning | Informational | Clear distinction |
| prevent cache deception | Transactional | Fix patterns |

### People Also Ask (FAQ Targets)
1. "What is web cache deception?"
2. "How is cache deception different from cache poisoning?"
3. "How do I prevent cache deception?"
4. "What causes cache deception vulnerabilities?"
5. "Can CDNs prevent cache deception?"

---

## 3. Content Structure

### Required Sections
```
H1: Web Cache Deception: Find & Fix in AI-Generated Code

Quick Answer Box

H2: What is web cache deception?
    - Path confusion attack
    - Tricking cache to store sensitive data
    - 100-150 words

H2: Why vibe coded apps are vulnerable
    - CDN misconfig
    - Path normalization gaps
    - 150-200 words

H2: Real-World Impact
    - Account data exposure
    - 75-100 words

H2: How to detect cache deception
    - Testing techniques
    - Scanner CTA
    - 100-150 words

H2: How to fix cache deception
    H3: AI Fix Prompt (200-400 words)
    H3: Cache-Control headers
    - 200-300 words

H2: FAQ (5 questions)

H2: Related Content
```

---

## 5. Unique Angle

### Our Differentiator
Cache deception is NOT cache poisoning. We explain the attack clearly: tricking the cache into storing YOUR sensitive page under a cacheable URL.

### Key Message
Cache deception exploits the gap between how your app interprets paths and how your cache interprets them. The attacker doesn't poison the cache—they trick it into caching your private data.

### Analogy
"Cache deception is like tricking a filing clerk into putting your private medical records in the 'public documents' folder by labeling them with a .pdf extension."

---

## 6. Meta Information

### Title Tag (under 60 chars)
```
Web Cache Deception: Detect & Fix Guide | VibeShip
```

### Meta Description (150-160 chars)
```
Web cache deception tricks caches into storing sensitive user data. Learn how path confusion attacks work and how to prevent them in your applications.
```

### Target URL
```
/kb/security/vulnerabilities/cache-deception/
```

---

## 7. Writer Notes

### Persona Recommendation
**@danawhy (The Debugger)** - Cache deception requires understanding the "why" behind path interpretation differences. The Debugger's investigative approach fits well.

### Technical Accuracy Notes
- Attack: victim visits /account.css, cache stores sensitive /account page
- Root cause: path normalization differences between cache and origin
- Cache sees: static file extension → cache it
- Origin sees: /account route → serve private data
- Fix: Cache-Control headers, path validation, cache key configuration

---

**Brief Status:** ✅ Complete - Ready for Phase 2

