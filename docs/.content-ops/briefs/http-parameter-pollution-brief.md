# Content Brief: HTTP Parameter Pollution

**Generated:** December 2024
**Target Publish:** December 2024
**Priority:** P0 (High-value gap)
**Status:** Ready for Writer

---

## 1. Core Data

### Security References
| Metric | Value | Source |
|--------|-------|--------|
| **CWE ID** | CWE-235 | MITRE |
| **CWE Name** | Improper Handling of Extra Parameters | MITRE |
| **OWASP Category** | A03:2021 - Injection | OWASP |
| **OWASP Testing** | WSTG-INPV-04 | OWASP WSTG |
| **Severity** | Medium | CVSS 5.3-6.5 |

### Why AI Tools Generate This
- AI doesn't consider duplicate parameter handling differences
- WAF bypass via HPP not considered in AI-generated code
- Different servers parse duplicates differently
- AI copies patterns without understanding parameter handling

---

## 2. SEO Strategy

### Target Keywords
| Keyword | Intent | Our Angle |
|---------|--------|-----------|
| http parameter pollution | Informational | WAF bypass focus |
| HPP vulnerability | Informational | Plain English explanation |
| parameter pollution attack | Informational | Server behavior differences |
| HPP fix | Transactional | Copy-paste validation |

### People Also Ask (FAQ Targets)
1. "What is HTTP parameter pollution?"
2. "How do I prevent HPP attacks?"
3. "Can HPP bypass WAF?"
4. "How do different servers handle duplicate parameters?"
5. "How do I test for HPP vulnerabilities?"

---

## 3. Content Structure

### Required Sections
```
H1: HTTP Parameter Pollution: Find & Fix in AI-Generated Code

Quick Answer Box

H2: What is HTTP parameter pollution?
    - Duplicate parameters explained
    - Server behavior differences
    - 100-150 words

H2: Why vibe coded apps are vulnerable
    - WAF bypass scenarios
    - Backend vs frontend handling
    - 150-200 words

H2: Real-World Impact
    - WAF bypass, business logic bypass
    - 75-100 words

H2: How to detect HPP
    - Testing techniques
    - Scanner CTA
    - 100-150 words

H2: How to fix HPP
    H3: AI Fix Prompt (200-400 words)
    H3: Server-specific handling
    - 200-300 words

H2: FAQ (5 questions)

H2: Related Content
```

---

## 5. Unique Angle

### Our Differentiator
Focus on how HPP bypasses security controls in vibe coded apps. Most content explains the concept—we show how it breaks real security assumptions.

### Key Message
HPP exploits the fact that different parts of your stack handle duplicate parameters differently. The WAF sees one value, your app sees another.

### Analogy
"HPP is like giving someone two business cards with different phone numbers. Which one do they call? Different people make different choices—and attackers exploit that inconsistency."

---

## 6. Meta Information

### Title Tag (under 60 chars)
```
HTTP Parameter Pollution (HPP): Fix Guide | VibeShip
```

### Meta Description (150-160 chars)
```
HTTP parameter pollution bypasses WAFs and security controls by exploiting duplicate parameter handling. Learn to detect and fix HPP in your applications.
```

### Target URL
```
/kb/security/vulnerabilities/http-parameter-pollution/
```

---

## 7. Writer Notes

### Persona Recommendation
**@tryhard_tk (The Tinkerer)** - HPP is about understanding how things work under the hood. The Tinkerer's curiosity about system internals fits well.

### Technical Accuracy Notes
- Different servers handle duplicates differently (first, last, array, concatenate)
- PHP: last value wins; ASP: comma-separated; Node/Express: array
- HPP can bypass WAFs, validation, business logic
- Fix: normalize parameter handling, validate all occurrences

---

**Brief Status:** ✅ Complete - Ready for Phase 2
