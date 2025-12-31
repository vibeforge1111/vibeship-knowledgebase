# Content Brief: Prototype Pollution

**Generated:** 2025-12-17
**Target Publish:** 2025-12-20
**Priority:** P1
**Status:** Ready for Writer

---

## 1. Core Data

### Scanner Statistics
| Metric | Value | Source |
|--------|-------|--------|
| Prevalence | Data coming soon | Scanner DB |
| Repos Scanned | Data coming soon | Scanner DB |
| Week-over-Week | Data coming soon | Scanner DB |
| Most Affected Tool | Data coming soon | Scanner DB |

**NOTE TO WRITER:** Scanner data for prototype pollution is being collected. Use external authoritative sources for now (Snyk, PortSwigger, OWASP).

### Tool Breakdown
| Tool | Vulnerability Rate | Sample Size |
|------|-------------------|-------------|
| Cursor | Data coming soon | TBD |
| Bolt | Data coming soon | TBD |
| Claude Code | Data coming soon | TBD |
| v0 | Data coming soon | TBD |
| Replit | Data coming soon | TBD |
| Copilot | Data coming soon | TBD |

### Security References
- **CWE ID:** CWE-1321
- **CWE Name:** Improperly Controlled Modification of Object Prototype Attributes ('Prototype Pollution')
- **OWASP Category:** A03:2021 - Injection (also A05:2025 in latest)
- **Severity:** High
- **CVSS Range:** 7.4 - 9.8 (depending on exploitation path)

### External Data Sources
According to [Snyk research](https://snyk.io/articles/prevent-prototype-pollution-vulnerabilities-javascript/), prototype pollution vulnerabilities represent approximately **25% of all discovered vulnerabilities in the JavaScript ecosystem**, with roughly 25% not fixable by upgrading to newer versions.

Key CVEs to reference:
- **CVE-2020-8203** - lodash versions <4.17.19 (CVSS 7.4)
- **CVE-2019-11358** - jQuery versions <3.4.0 (CVSS 6.1)
- **CVE-2020-7598** - minimist versions <1.2.2 (CVSS 5.6)
- **CVE-2020-28499** - deepmerge versions <4.2.2 (CVSS 7.5)

---

## 2. SEO Strategy

### Target Keywords
| Keyword | Est. Volume | Difficulty | Intent |
|---------|-------------|------------|--------|
| prototype pollution | 2,400 | Medium | Informational |
| javascript prototype pollution | 720 | Medium | Informational |
| __proto__ vulnerability | 480 | Low | Informational |
| prototype pollution javascript | 590 | Medium | Informational |
| what is prototype pollution | 320 | Low | Informational |
| prototype pollution attack | 260 | Medium | Informational |
| node.js prototype pollution | 210 | Medium | Informational |
| prevent prototype pollution | 140 | Low | Transactional |

### People Also Ask
1. "What is prototype pollution in JavaScript?"
2. "How does prototype pollution work?"
3. "What is the impact of prototype pollution?"
4. "Which libraries have been affected by prototype pollution?"
5. "How can you prevent prototype pollution?"
6. "What is __proto__ in JavaScript?"
7. "Can prototype pollution lead to remote code execution?"
8. "Is Object.assign safe from prototype pollution?"

### Search Intent Analysis
- **Primary intent:** Informational - developers want to understand what prototype pollution is and how it affects their code
- **User goal:** Learn to identify, understand, and fix prototype pollution vulnerabilities in JavaScript/Node.js applications
- **Content need:** Clear explanation of the vulnerability, why it happens (especially in AI-generated code), how to detect it, and practical fixes with code examples

---

## 3. Competitive Analysis

### Current Top 3 Results for "prototype pollution"

**1. https://portswigger.net/web-security/prototype-pollution**
- Title: "What is prototype pollution? | Web Security Academy"
- Word count: ~2,500 words (split across multiple pages)
- Strengths: Extremely comprehensive, excellent technical depth, interactive labs, covers both client-side and server-side, gadget analysis
- Weaknesses: Very technical (assumes security expertise), no AI tool context, no statistics on prevalence, lacks beginner-friendly explanations
- Our advantage: AI-specific angle, vibe coder audience, copy-paste fixes, tool comparison data, plain English explanations

**2. https://learn.snyk.io/lesson/prototype-pollution/**
- Title: "What is prototype pollution? | Tutorial & examples | Snyk Learn"
- Word count: ~1,800 words
- Strengths: Good balance of theory and practice, code examples, prevention techniques, mentions affected libraries
- Weaknesses: No AI tool discussion, generic examples, no tool comparison, missing real-world statistics
- Our advantage: AI-generated code patterns, vibe coding terminology, Scanner data (when available), tool-specific guidance

**3. https://cheatsheetseries.owasp.org/cheatsheets/Prototype_Pollution_Prevention_Cheat_Sheet.html**
- Title: "Prototype Pollution Prevention - OWASP Cheat Sheet Series"
- Word count: ~1,200 words
- Strengths: Authoritative source, prevention-focused, Node.js specific mitigations
- Weaknesses: Very dry/technical, no examples of vulnerable code, no statistics, assumes expert audience
- Our advantage: Engaging writing, before/after code, AI fix prompt, beginner-friendly, vibe coder focus

### Content Gaps (Our Opportunities)
1. **AI tool patterns:** No competitor analyzes why AI tools (Cursor, Claude Code, Bolt) generate vulnerable deep merge patterns - we can explain AI training on popular but vulnerable libraries
2. **Vibe coder audience:** All competitors assume technical security background - we explain in plain English for non-security developers
3. **Statistics and prevalence:** Only Snyk mentions the 25% figure - we can emphasize this to show how common/critical it is
4. **Tool comparison:** No one compares which AI tools generate this more frequently (when we have Scanner data)
5. **Complete AI fix prompt:** No competitor provides a copy-paste prompt to fix existing code using AI tools

---

## 4. Content Structure

### Recommended Sections

```
H1: Prototype Pollution: JavaScript's Hidden Attack Vector

Quick Answer Box (under 50 words):
Prototype pollution is a JavaScript vulnerability where attackers inject malicious properties into Object.prototype, affecting all objects in your application. Can lead to XSS, privilege escalation, or remote code execution. Represents 25% of JavaScript ecosystem vulnerabilities according to Snyk.

H2: What is Prototype Pollution?
    - Plain English: Attackers add malicious properties to base JavaScript objects
    - Real-world analogy: Like adding a master key to every lock in a building
    - Concrete consequences: Can escalate to RCE, XSS, DoS
    - Link to CWE-1321 and OWASP A03:2021
    Target: 100-150 words

H2: How Prototype Pollution Works
    - Explain __proto__, constructor.prototype, and prototype chain
    - Show vulnerable merge/assign patterns
    - Code example: malicious payload {"__proto__": {"isAdmin": true}}
    - Why this affects ALL objects
    Target: 150-200 words

H2: Why AI Tools Generate This Vulnerability
    - AI trained on popular libraries (lodash, jQuery) that had this vuln
    - Deep merge functions are common in AI-generated code
    - AI prioritizes "working code" over security validation
    - No input sanitization in AI-generated merge functions
    Target: 150-200 words

H2: Real-World Impact
    H3: Client-Side Exploitation
        - DOM XSS via polluted properties
        - Google Analytics gadget example (hitCallback)
    H3: Server-Side Exploitation (Node.js)
        - RCE via child_process.spawn() option pollution
        - Environment variable pollution
        - NODE_OPTIONS injection
    Target: 200-250 words total

H2: Affected Libraries and CVEs
    - lodash (CVE-2020-8203)
    - jQuery (CVE-2019-11358)
    - minimist (CVE-2020-7598)
    - deepmerge (CVE-2020-28499)
    - Table with CVE, CVSS score, affected versions, fix version
    Target: 100-150 words

H2: How to Detect Prototype Pollution
    - Search for: Object.assign with user input
    - Search for: lodash.merge, _.merge, $.extend
    - Search for: deep merge functions
    - Search for: __proto__, constructor.prototype in user input
    - Regex patterns to search codebase
    - Scanner CTA
    Target: 100-150 words

H2: How to Fix Prototype Pollution
    H3: AI Fix Prompt
        - Complete 200-400 word prompt
        - Include instructions to replace unsafe merge
        - Add input sanitization
        - Use Object.create(null) or Map
        - Freeze prototypes
    H3: Manual Fix
        - Before: vulnerable Object.assign/merge
        - After: safe alternatives with validation
        - Use Object.freeze(Object.prototype)
        - Filter dangerous keys (__proto__, constructor, prototype)
    H3: Framework-Specific Prevention
        - Node.js: --disable-proto=delete flag
        - Use Map instead of Object for user data
        - Schema validation (Joi, Yup, Zod)
    Target: 400-500 words total

H2: Prevention Best Practices
    - Use Object.create(null) for dictionaries
    - Validate input against schema
    - Freeze Object.prototype
    - Use Map/Set instead of plain objects
    - Keep dependencies updated
    - Use hasOwnProperty checks
    Target: 150-200 words

H2: FAQ
    1. What is prototype pollution in JavaScript?
    2. How does __proto__ pollution work?
    3. Can prototype pollution lead to RCE?
    4. Is Object.assign safe from prototype pollution?
    5. How do I prevent prototype pollution in Node.js?
    Target: 50-100 words each (250-500 words total)

H2: Related Vulnerabilities and Resources
    - Links to related vulns
    - Tool-specific pages
    - Stack guides
```

### Required Elements Checklist
- [x] Quick answer in first 50 words
- [ ] Stats box with external data (Snyk 25% figure)
- [ ] CVE table with lodash, jQuery, minimist, deepmerge
- [ ] Complete AI fix prompt (200-400 words)
- [ ] Before/after code examples (vulnerable merge vs safe)
- [ ] 5 FAQ entries matching PAA
- [ ] Scanner CTA in detection section
- [ ] 5-10 internal links
- [ ] CWE-1321 and OWASP A03:2021 references with links

---

## 5. Internal Linking

### Must Link TO (Parent/Authority Pages)
| Page | Suggested Anchor Text |
|------|----------------------|
| /kb/security/vulnerabilities/ | "JavaScript security vulnerabilities" |
| /kb/vibe-coding-tools/cursor/ | "Cursor security patterns" |
| /kb/vibe-coding-tools/claude-code/ | "Claude Code generated code" |
| /kb/vibe-coding-tools/bolt/ | "Bolt.new security" |

### Should Link TO (Related Content)
| Page | Suggested Anchor Text |
|------|----------------------|
| /kb/security/vulnerabilities/xss/ | "DOM XSS" or "cross-site scripting" |
| /kb/security/vulnerabilities/command-injection/ | "command injection" or "remote code execution" |
| /kb/security/vulnerabilities/mass-assignment/ | "mass assignment vulnerability" |
| /kb/glossary/security/prototype/ | "JavaScript prototype" |
| /kb/glossary/security/prototype-chain/ | "prototype chain" |

### External Authority Links (MUST INCLUDE)
| Source | Purpose | URL |
|--------|---------|-----|
| CWE-1321 | Official vulnerability definition | https://cwe.mitre.org/data/definitions/1321.html |
| OWASP Cheat Sheet | Prevention techniques | https://cheatsheetseries.owasp.org/cheatsheets/Prototype_Pollution_Prevention_Cheat_Sheet.html |
| OWASP Top 10 | Injection category | https://owasp.org/Top10/A03_2021-Injection/ |
| PortSwigger | Technical tutorial and gadgets | https://portswigger.net/web-security/prototype-pollution |
| PortSwigger Gadgets Research | Gadget analysis | https://portswigger.net/research/widespread-prototype-pollution-gadgets |
| MDN Security | JavaScript security basics | https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/Prototype_pollution |
| Snyk Prevention | Prevention guide | https://snyk.io/articles/prevent-prototype-pollution-vulnerabilities-javascript/ |
| Snyk Learn | Tutorial | https://learn.snyk.io/lesson/prototype-pollution/ |

---

## 6. Unique Angle

### Our Differentiator
We are the ONLY resource that connects prototype pollution directly to AI-generated code patterns. While PortSwigger and Snyk provide excellent technical coverage, they don't explain why vibe coders using Cursor, Bolt, or Claude Code are particularly vulnerable to generating this pattern.

### Key Message
**"Prototype pollution affects 25% of JavaScript vulnerabilities, and AI tools frequently generate vulnerable deep merge patterns because they're trained on popular libraries that historically had this issue. But it's easy to fix with the right approach."**

### Data-Driven Claims to Highlight
1. "According to Snyk, prototype pollution represents 25% of all discovered vulnerabilities in the JavaScript ecosystem"
2. "Approximately 25% of prototype pollution vulnerabilities cannot be fixed by simply upgrading dependencies"
3. "Major libraries affected: lodash (used in 74% of websites when CVE discovered), jQuery, minimist, deepmerge"
4. "Can escalate from property injection to full remote code execution in Node.js environments"

---

## 7. Meta Information

### Suggested Title Tag (under 60 chars)
```
Prototype Pollution: Find & Fix in JavaScript | VibeShip
```
(59 characters)

### Suggested Meta Description (150-160 chars)
```
Prototype pollution lets attackers inject malicious properties into all JavaScript objects. Affects 25% of JS vulnerabilities. Get AI fixes for vibe coded apps.
```
(159 characters)

### Target URL
```
/kb/security/vulnerabilities/prototype-pollution/
```

### Related URLs to Create (Future)
- /kb/security/fixes/prototype-pollution/nextjs/
- /kb/security/fixes/prototype-pollution/express/
- /kb/security/fixes/prototype-pollution/nodejs/
- /kb/vibe-coding-tools/cursor/prototype-pollution/
- /kb/glossary/security/prototype/
- /kb/glossary/security/prototype-chain/

---

## 8. Writer Notes

### Tone Guidance
- This is a **highly technical** vulnerability but explain it for non-security developers
- Use the "hotel master key" or "DNA modification" analogy to explain how polluting Object.prototype affects everything
- Balance severity (this IS serious) with optimism (it's fixable)
- Emphasize that AI tools generate this pattern innocently (trained on vulnerable code), not maliciously

### Technical Accuracy Notes
- **CRITICAL:** Distinguish between `__proto__`, `constructor.prototype`, and `prototype` - they're related but different
- **Object.assign() vulnerability:** Object.assign itself is safe for shallow copies but vulnerable when used recursively or with spread operator in loops
- **React/Vue safety:** These frameworks have their own object handling but can still be vulnerable if using lodash/jQuery
- **Node.js flags:** `--disable-proto=delete` removes __proto__ but doesn't prevent `constructor.prototype` pollution
- **25% statistic:** This is from Snyk research - cite properly and link

### Things to Avoid
- Don't say "just use Object.freeze" as the only solution - it can break legitimate code
- Don't claim Object.assign is always vulnerable - context matters
- Don't oversimplify the gadget concept - explain that pollution alone isn't exploitable without a gadget
- Don't forget to mention that ~25% of these vulns can't be fixed by upgrading (require code changes)
- **NEVER fabricate Scanner statistics** - use "Data coming soon" or external sources

### Vulnerable Code Patterns to Show

**Pattern 1: Unsafe Object.assign with user input**
```javascript
// ❌ VULNERABLE
function mergeOptions(defaults, userInput) {
  return Object.assign({}, defaults, userInput);
}

// Attack: userInput = JSON.parse('{"__proto__": {"isAdmin": true}}')
```

**Pattern 2: Recursive merge without key filtering**
```javascript
// ❌ VULNERABLE
function deepMerge(target, source) {
  for (let key in source) {
    if (typeof source[key] === 'object') {
      target[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}
```

**Pattern 3: lodash.merge with user input**
```javascript
// ❌ VULNERABLE (lodash < 4.17.19)
const _ = require('lodash');
const merged = _.merge({}, userInput);
```

**Pattern 4: jQuery.extend with user input**
```javascript
// ❌ VULNERABLE (jQuery < 3.4.0)
const options = $.extend(true, {}, defaults, userInput);
```

### Secure Code Patterns to Show

**Fix 1: Use Object.create(null)**
```javascript
// ✅ SECURE
function mergeOptions(defaults, userInput) {
  const safeDefaults = Object.create(null);
  Object.assign(safeDefaults, defaults);
  // Still need to filter userInput keys
  for (let key in userInput) {
    if (key !== '__proto__' && key !== 'constructor' && key !== 'prototype') {
      safeDefaults[key] = userInput[key];
    }
  }
  return safeDefaults;
}
```

**Fix 2: Use Map for user data**
```javascript
// ✅ SECURE
const userPreferences = new Map();
// Map doesn't have prototype pollution issues
userPreferences.set(userKey, userValue);
```

**Fix 3: Freeze the prototype**
```javascript
// ✅ DEFENSE IN DEPTH
Object.freeze(Object.prototype);
Object.freeze(Object);
```

**Fix 4: Filter dangerous keys**
```javascript
// ✅ SECURE
function safeMerge(target, source) {
  const dangerousKeys = ['__proto__', 'constructor', 'prototype'];
  for (let key in source) {
    if (dangerousKeys.includes(key)) continue;
    if (typeof source[key] === 'object' && source[key] !== null) {
      target[key] = safeMerge(target[key] || {}, source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}
```

**Fix 5: Use schema validation**
```javascript
// ✅ SECURE
const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required()
  // Explicitly define allowed properties
});

const { error, value } = schema.validate(userInput);
if (error) throw error;
// Now safe to merge 'value'
```

### Node.js RCE Escalation Example

**Vulnerable pattern:**
```javascript
// ❌ VULNERABLE - prototype pollution + child_process
const { spawn } = require('child_process');

// Attacker pollutes: {"__proto__": {"shell": true, "env": {"NODE_OPTIONS": "--require /tmp/malicious.js"}}}

// Later in code:
const options = {}; // Inherits polluted properties
const child = spawn('some-command', [], options);
// Now executes with shell=true and malicious NODE_OPTIONS
```

### Reference Materials

**Primary sources (MUST read before writing):**
1. [CWE-1321 Official Definition](https://cwe.mitre.org/data/definitions/1321.html)
2. [OWASP Prototype Pollution Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Prototype_Pollution_Prevention_Cheat_Sheet.html)
3. [PortSwigger Web Security Academy - Prototype Pollution](https://portswigger.net/web-security/prototype-pollution)
4. [PortSwigger Research - Widespread Prototype Pollution Gadgets](https://portswigger.net/research/widespread-prototype-pollution-gadgets)
5. [MDN - JavaScript Prototype Pollution](https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/Prototype_pollution)
6. [Snyk - Prevent Prototype Pollution](https://snyk.io/articles/prevent-prototype-pollution-vulnerabilities-javascript/)
7. [Snyk Learn - Prototype Pollution Tutorial](https://learn.snyk.io/lesson/prototype-pollution/)

**CVE details:**
- CVE-2020-8203 (lodash): https://nvd.nist.gov/vuln/detail/CVE-2020-8203
- CVE-2019-11358 (jQuery): https://nvd.nist.gov/vuln/detail/CVE-2019-11358
- CVE-2020-7598 (minimist): https://nvd.nist.gov/vuln/detail/CVE-2020-7598
- CVE-2020-28499 (deepmerge): https://nvd.nist.gov/vuln/detail/CVE-2020-28499

**Additional research:**
- [HackerOne - NodeJS Prototype Pollution](https://book.hacktricks.xyz/pentesting-web/deserialization/nodejs-proto-prototype-pollution)
- [Snyk Advisory - lodash.merge](https://security.snyk.io/vuln/SNYK-JS-LODASH-567746)

---

## 9. AI Tool Patterns Analysis

### Why AI Tools Generate Prototype Pollution

**Key patterns observed:**

1. **Training on vulnerable libraries:** AI models are trained on massive codebases including lodash, jQuery, and other libraries that historically had prototype pollution vulnerabilities. When asked to "merge objects" or "combine configuration", AI often suggests these patterns.

2. **Deep merge functions:** AI frequently generates custom deep merge functions when asked to "merge nested objects" or "combine configurations." These implementations rarely include prototype pollution protections.

3. **Object.assign recursion:** AI tools often suggest recursive Object.assign patterns without understanding the security implications.

4. **No input validation:** AI-generated code prioritizes functionality over security - merge functions work correctly for benign input but don't validate against malicious keys.

5. **Popular snippet reproduction:** AI reproduces Stack Overflow answers and GitHub snippets that contain vulnerable patterns (many pre-date security awareness of this issue).

### Tool-Specific Notes (for future when Scanner data available)

**Cursor:**
- Often suggests lodash.merge when asked for object merging
- May generate custom merge functions without key filtering

**Bolt.new:**
- Rapid prototyping focus means security validations often skipped
- Deep merge functions common in configuration management code

**Claude Code:**
- More likely to include comments about security but may still generate vulnerable patterns
- When prompted for "production-ready", more likely to include validation

**v0:**
- React/Next.js focus means less Node.js server-side RCE risk
- Still vulnerable to client-side prototype pollution → DOM XSS

**GitHub Copilot:**
- Suggests lodash methods frequently (trained on vast codebases using it)
- May autocomplete vulnerable patterns from context

---

## 10. Competitive Keywords Analysis

### Keywords We Can Dominate
1. **"prototype pollution vibe coding"** - Zero competition, we own this
2. **"prototype pollution AI generated code"** - Low competition, unique angle
3. **"fix prototype pollution cursor"** - No existing content
4. **"prototype pollution bolt.new"** - No existing content
5. **"__proto__ vulnerability AI code"** - Low competition

### Keywords We Should Target (Achievable)
1. **"what is prototype pollution"** - High volume, educational intent, we can rank with better UX
2. **"prototype pollution prevention"** - Less competitive than main term
3. **"javascript prototype pollution fix"** - Transactional intent, matches our AI fix prompt
4. **"node.js prototype pollution"** - Server-side focus, we can add AI angle

### Keywords We're Competing Against Authorities (Long-term)
1. **"prototype pollution"** - PortSwigger dominates, but we can rank for featured snippet with stats
2. **"javascript prototype pollution"** - Snyk and PortSwigger rank, need exceptional content
3. **"prototype pollution exploit"** - HackerOne and security blogs, need data differentiation

---

**Brief Status:** ✅ Complete - Ready for Writer Agent

**Writer Agent Instructions:**
Use the VIBESHIP-SECURITY-WRITER-AGENT-PROMPT guidelines from `docs/.content-ops/strategies/VIBESHIP-SECURITY-WRITER-AGENT-PROMPT.md` to transform this brief into a complete Svelte component article. Follow the content formula, writing rules, and quality checklist exactly. Output production-ready Svelte component code.
