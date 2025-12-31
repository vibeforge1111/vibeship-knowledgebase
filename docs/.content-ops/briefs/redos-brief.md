# Content Brief: ReDoS (Regular Expression Denial of Service)

**Generated:** December 2024
**Target Publish:** December 2024
**Priority:** P0 (High-value gap)
**Status:** Ready for Writer

---

## 1. Core Data

### Security References
| Metric | Value | Source |
|--------|-------|--------|
| **CWE ID** | CWE-1333 | MITRE |
| **CWE Name** | Inefficient Regular Expression Complexity | MITRE |
| **Related CWE** | CWE-400 (Uncontrolled Resource Consumption) | MITRE |
| **OWASP Category** | A04:2021 - Insecure Design | OWASP |
| **Severity** | Medium-High | CVSS 5.3-7.5 |

### Why AI Tools Generate This
- AI generates regex patterns without understanding backtracking complexity
- Copy-paste regex from Stack Overflow without validation
- AI doesn't test regex against malicious inputs
- Email/URL validators are common ReDoS sources
- AI prioritizes "works" over "performs safely"

### Notable Incidents
- **Cloudflare (2019):** Global outage from single regex, 30 minutes downtime
- **Stack Overflow (2016):** Site taken down by malicious regex input
- **npm packages:** Multiple popular packages (validator.js, etc.) had ReDoS
- **ua-parser-js (2021):** Supply chain attack included ReDoS patterns

---

## 2. SEO Strategy

### Target Keywords
| Keyword | Intent | Our Angle |
|---------|--------|-----------|
| redos | Informational | AI-generated regex risks |
| regex denial of service | Informational | Plain English explanation |
| redos vulnerability fix | Transactional | Copy-paste safe patterns |
| evil regex | Informational | Pattern identification |

### People Also Ask (FAQ Targets)
1. "What is ReDoS?"
2. "How do I prevent ReDoS attacks?"
3. "How do I check if my regex is vulnerable?"
4. "What makes a regex evil?"
5. "Can ReDoS crash a server?"

---

## 3. Competitive Analysis

### Content Gaps (Our Opportunities)
1. No competitor covers AI-generated regex patterns
2. No vibe coder audience focus
3. No copy-paste safe alternatives for common patterns
4. No "test your regex" guidance for non-experts

---

## 4. Content Structure

### Required Sections
```
H1: ReDoS: Find & Fix in AI-Generated Code

Quick Answer Box

H2: What is ReDoS?
    - Plain English: "maze" analogy
    - Catastrophic backtracking explained simply
    - 100-150 words

H2: Why AI-generated regex is dangerous
    - Stack Overflow patterns
    - Untested complexity
    - 150-200 words

H2: Real-World Impact
    - Cloudflare outage
    - npm package issues
    - 75-100 words

H2: How to detect ReDoS vulnerabilities
    - Pattern red flags
    - Testing tools
    - Scanner CTA
    - 100-150 words

H2: How to fix ReDoS
    H3: AI Fix Prompt (200-400 words)
    H3: Safe regex patterns
        - Email validation
        - URL validation
        - Input length limits
    - 200-300 words

H2: FAQ (5 questions)

H2: Related Content
```

---

## 5. Unique Angle

### Our Differentiator
Focus on AI-generated regex patterns and how vibe coders accidentally introduce ReDoS when asking AI for "email validation" or "URL parsing". Most content assumes regex expertise.

### Key Message
ReDoS happens when a regex backtracks exponentially on crafted input. One malicious string can freeze your server. AI tools copy vulnerable patterns from training data without understanding the risk.

### Analogy
"ReDoS is like giving someone a maze with infinite dead ends. The regex engine tries every path, and on malicious input, there are so many paths it never finishes. Your server is stuck in the maze."

---

## 6. Meta Information

### Title Tag (under 60 chars)
```
ReDoS: Detect & Fix Regex Attacks | VibeShip
```

### Meta Description (150-160 chars)
```
ReDoS attacks freeze servers with malicious regex input. Learn to detect evil patterns in AI-generated code and replace them with safe alternatives.
```

### Target URL
```
/kb/security/vulnerabilities/redos/
```

---

## 7. Writer Notes

### Persona Recommendation
**@eli5sec (The Translator)** - ReDoS is technical and intimidating. The Translator can make backtracking understandable without dumbing it down.

### Technical Accuracy Notes
- ReDoS = exponential backtracking, not infinite loops
- Evil regex patterns: nested quantifiers, overlapping alternations
- Patterns like `(a+)+`, `(a|a)+`, `([a-zA-Z]+)*` are dangerous
- Safe alternatives exist for most common use cases
- Input length limits are a valid mitigation

### Things to Avoid
- Don't make it sound like all regex is dangerous
- Don't recommend avoiding regex entirely (impractical)
- Don't skip the "test your regex" section
- Don't assume they know what backtracking means

---

**Brief Status:** ✅ Complete - Ready for Phase 2
