# Content Brief: Integer Overflow

**Generated:** December 2024
**Target Publish:** December 2024
**Priority:** P0 (High-value gap)
**Status:** Ready for Writer

---

## 1. Core Data

### Security References
| Metric | Value | Source |
|--------|-------|--------|
| **CWE ID** | CWE-190 | MITRE |
| **CWE Name** | Integer Overflow or Wraparound | MITRE |
| **Related CWE** | CWE-191 (Integer Underflow) | MITRE |
| **OWASP Category** | A03:2021 - Injection | OWASP |
| **CWE Top 25** | #12 (2024) | MITRE |
| **Severity** | High/Critical | CVSS 7.5-9.8 |

### Why AI Tools Generate This
- AI generates arithmetic without bounds checking
- JavaScript's Number type hides overflow issues until deployment
- Price/quantity calculations without validation
- AI copies patterns without understanding numeric limits
- Type coercion hides overflow until edge cases

### Notable Incidents
- **Ethereum DAO Hack (2016):** $60M stolen via integer overflow
- **Steam (2020):** Free games via negative quantity overflow
- **Bitcoin (2010):** 184 billion BTC created via overflow (patched)
- **OpenSSL HeartBleed:** Integer issues in bounds checking

---

## 2. SEO Strategy

### Target Keywords
| Keyword | Intent | Our Angle |
|---------|--------|-----------|
| integer overflow | Informational | Price manipulation in web apps |
| integer overflow vulnerability | Informational | JavaScript/TypeScript focus |
| integer overflow prevention | Transactional | Copy-paste validation |
| numeric overflow security | Informational | E-commerce context |

### People Also Ask (FAQ Targets)
1. "What is integer overflow?"
2. "How do I prevent integer overflow?"
3. "Can JavaScript have integer overflow?"
4. "What is the difference between overflow and underflow?"
5. "How do hackers exploit integer overflow?"

---

## 3. Competitive Analysis

### Content Gaps (Our Opportunities)
1. No competitor covers JavaScript/TypeScript context
2. No e-commerce/price manipulation focus
3. No AI-generated code angle
4. No copy-paste BigInt solutions

---

## 4. Content Structure

### Required Sections
```
H1: Integer Overflow: Find & Fix in AI-Generated Code

Quick Answer Box

H2: What is integer overflow?
    - Plain English: "odometer" analogy
    - Wraparound behavior
    - 100-150 words

H2: Why vibe coded apps are vulnerable
    - Price calculations
    - Quantity handling
    - 150-200 words

H2: Real-World Impact
    - Steam, crypto examples
    - Money/security bypass
    - 75-100 words

H2: How to detect integer overflow
    - Edge case testing
    - Static analysis
    - Scanner CTA
    - 100-150 words

H2: How to fix integer overflow
    H3: AI Fix Prompt (200-400 words)
    H3: JavaScript/TypeScript solutions
        - BigInt usage
        - Bounds checking
        - Library options
    - 200-300 words

H2: FAQ (5 questions)

H2: Related Content
```

---

## 5. Unique Angle

### Our Differentiator
Focus on JavaScript/TypeScript numeric handling in e-commerce contexts. Most content covers C/C++. Vibe coders build payment flows in JS.

### Key Message
Integer overflow happens when a number exceeds its maximum value and wraps to a small or negative number. In price calculations, this can mean paying $0 for expensive items.

### Analogy
"Integer overflow is like an odometer rolling over from 999,999 to 000,000. The number doesn't stop at max—it wraps around to the start. In code, this can turn a large purchase into a $0 refund."

---

## 6. Meta Information

### Title Tag (under 60 chars)
```
Integer Overflow: Detect & Fix Guide | VibeShip
```

### Meta Description (150-160 chars)
```
Integer overflow lets attackers manipulate prices and bypass security. Learn to detect numeric vulnerabilities in JavaScript and fix them with BigInt.
```

### Target URL
```
/kb/security/vulnerabilities/integer-overflow/
```

---

## 7. Writer Notes

### Persona Recommendation
**@keystrokecounts (The Optimizer)** - This is about numeric precision and efficiency. The Optimizer's focus on details and edge cases fits well.

### Technical Accuracy Notes
- JavaScript Number is 64-bit float, safe integer range is ±2^53-1
- Number.MAX_SAFE_INTEGER = 9007199254740991
- BigInt handles arbitrary precision integers
- TypeScript doesn't prevent runtime overflow
- Price calculations should use integer cents, not float dollars

### Things to Avoid
- Don't make it seem like only C/C++ is affected
- Don't skip JavaScript-specific behavior
- Don't recommend just "using a library" without explaining why
- Don't forget underflow (negative wraparound)

---

**Brief Status:** ✅ Complete - Ready for Phase 2
