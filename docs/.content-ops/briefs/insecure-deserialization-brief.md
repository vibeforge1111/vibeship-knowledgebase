# Content Brief: Insecure Deserialization

## Status

```yaml
status: DONE
created_at: 2025-12-17T19:00:00Z
created_by: Research Agent (Terminal 1)
claimed_by: Writer Agent
claimed_at: 2025-12-17T19:15:00Z
completed_at: 2025-12-17T20:00:00Z
```

---

## Article Metadata

```yaml
type: vulnerability
slug: insecure-deserialization
url: /kb/security/vulnerabilities/insecure-deserialization/
title: "Insecure Deserialization: When AI Code Lets Attackers Execute Commands"
meta_description: "AI tools generate unsafe eval(), yaml.load(), and deserialize patterns that lead to RCE. Learn CWE-502 patterns and safe alternatives for Node.js and Python."
cwe: CWE-502
cwe_parent: CWE-913
owasp: A08:2021-Software and Data Integrity Failures
owasp_url: https://owasp.org/Top10/A08_2021-Software_and_Data_Integrity_Failures/
cwe_url: https://cwe.mitre.org/data/definitions/502.html
severity: Critical
word_count: 1400-1800
```

---

## Core Data

### Primary References
| Reference | ID | Link |
|-----------|-----|------|
| CWE-502 | Deserialization of Untrusted Data | https://cwe.mitre.org/data/definitions/502.html |
| OWASP A08:2021 | Software and Data Integrity Failures | https://owasp.org/Top10/A08_2021-Software_and_Data_Integrity_Failures/ |
| OWASP Deserialization | Insecure Deserialization | https://owasp.org/www-community/vulnerabilities/Insecure_Deserialization |
| OWASP Cheat Sheet | Deserialization Prevention | https://cheatsheetseries.owasp.org/cheatsheets/Deserialization_Cheat_Sheet.html |

### CVSS Severity
- **Typical CVSS Score:** 9.8 (Critical)
- **Impact:** Remote Code Execution (RCE), complete system compromise
- **Exploitability:** Often trivial with known payloads

### OWASP Evolution
- **2017:** A8 - Insecure Deserialization (standalone)
- **2021:** Merged into A08 - Software and Data Integrity Failures
- Reflects broader concern about trusting untrusted data

### Key Facts to Include
- CWE-502 is in the 2024 CWE Top 25 Most Dangerous Software Weaknesses
- Deserialization attacks can lead to Remote Code Execution (RCE)
- node-serialize package has known RCE vulnerability (CVSS 9.8)
- Python yaml.load() was exploitable until PyYAML 5.4 (CVE-2020-14343)
- CVE-2025-55182: Critical React Server Components deserialization vulnerability (December 2024)
- JSON.parse() is safe, but custom deserializers are often not
- Prototype pollution in JavaScript is related and can enable RCE

### Recent Critical CVEs
**CVE-2025-55182 (React Server Components):**
- Affects React 19.0.0 - 19.2.0
- Unauthenticated RCE via crafted HTTP request to Server Function endpoint
- Also affects Next.js (CVE-2025-66478), React Router, Waku, Expo, and others
- Fixed in React 19.2.1 and Next.js 15.0.5+

**CVE-2020-14343 (PyYAML):**
- yaml.load() and yaml.full_load() allowed arbitrary code execution
- Fixed in PyYAML 5.4
- yaml.safe_load() was always safe

**node-serialize:**
- Arbitrary code execution via serialized JavaScript functions
- High severity, widely used in AI-generated code examples

---

## SEO Strategy

### Target Keywords
| Keyword | Search Intent | Priority |
|---------|---------------|----------|
| insecure deserialization | informational | Primary |
| deserialization vulnerability | informational | Primary |
| CWE-502 | informational | Secondary |
| yaml.load security | informational | Secondary |
| node.js deserialization attack | informational | Secondary |
| prototype pollution | informational | Tertiary |

### People Also Ask (FAQs)
1. What is insecure deserialization?
2. Is JSON.parse() safe from deserialization attacks?
3. Why is yaml.load() dangerous in Python?
4. How do I prevent deserialization vulnerabilities in Node.js?
5. What's the difference between deserialization and prototype pollution?

### Competitive Gap
**Top results analysis:**
- OWASP: Comprehensive but focuses on Java/.NET, less on JS/Python
- PortSwigger: Great for Java, thin on modern JS ecosystem
- HackTricks: Good attack techniques, less on prevention
- Snyk: Package-focused, not architectural patterns

**Our unique angle:**
- AI tool context: Why Copilot/Cursor generate unsafe patterns
- Modern stack focus: Node.js, Python, React Server Components
- The recent CVE-2025-55182 React vulnerability
- Prototype pollution as a related threat
- Copy-paste safe alternatives for vibe coders
- Framework-specific guidance (Next.js, Express, FastAPI)

---

## Content Outline

### Quick Answer (50 words max)
Insecure deserialization lets attackers execute code by manipulating data your app converts back into objects. AI tools generate vulnerable patterns like `eval()`, `yaml.load()`, and unsafe deserialize functions. Use JSON.parse(), yaml.safe_load(), and never deserialize untrusted data without validation.

### Section 1: What is Insecure Deserialization?
- Plain English: When converting stored data back to objects goes wrong
- Serialization: Object → String (safe)
- Deserialization: String → Object (dangerous if attacker controls the string)
- Real-world analogy: Opening a package someone sent you - it could contain anything
- Impact: Remote Code Execution (RCE) - attackers run commands on your server
- CWE-502 in Top 25 Most Dangerous Weaknesses
- Word count: 100-150

### Section 2: How Deserialization Attacks Work
- Attacker crafts malicious serialized data
- Your app deserializes it, executing attacker's payload
- Result: Attacker runs arbitrary code on your server
- Attack chain:
  1. Find endpoint that deserializes user input
  2. Craft payload that executes code when deserialized
  3. Send payload to endpoint
  4. Server executes malicious code
- Word count: 100-150

### Section 3: Why AI Tools Generate Vulnerable Code
- AI generates `eval()` because it's flexible
- AI uses `yaml.load()` without SafeLoader because tutorials do
- AI generates node-serialize patterns from older examples
- AI doesn't distinguish trusted vs untrusted input
- "Make it work" doesn't mean "make it secure"
- Recent CVE-2025-55182 in React Server Components shows even modern frameworks aren't immune
- Word count: 100-150

### Section 4: JavaScript/Node.js Patterns

**Pattern 1: eval() with User Input**
```javascript
// VULNERABLE: AI generates this for "dynamic execution"
app.post('/calculate', (req, res) => {
  const formula = req.body.formula
  const result = eval(formula) // RCE!
  res.json({ result })
})

// Attack: formula = "require('child_process').execSync('rm -rf /')"
```

```javascript
// SECURE: Use a safe expression parser
import { evaluate } from 'mathjs'

app.post('/calculate', (req, res) => {
  const formula = req.body.formula
  try {
    const result = evaluate(formula) // Safe math only
    res.json({ result })
  } catch (e) {
    res.status(400).json({ error: 'Invalid expression' })
  }
})
```

**Pattern 2: node-serialize**
```javascript
// VULNERABLE: node-serialize has known RCE
const serialize = require('node-serialize')

app.post('/save-state', (req, res) => {
  const state = serialize.unserialize(req.body.state) // RCE!
})

// Attack payload can include serialized functions that execute on unserialize
```

```javascript
// SECURE: Use JSON.parse()
app.post('/save-state', (req, res) => {
  try {
    const state = JSON.parse(req.body.state) // Safe
    // Validate schema with Zod/Yup
    res.json({ success: true })
  } catch (e) {
    res.status(400).json({ error: 'Invalid JSON' })
  }
})
```

**Pattern 3: Function() constructor**
```javascript
// VULNERABLE: Function() is like eval()
app.post('/run', (req, res) => {
  const fn = new Function('return ' + req.body.code) // RCE!
  const result = fn()
  res.json({ result })
})
```

- Word count: 200-250

### Section 5: Python Patterns

**Pattern 1: pickle.loads()**
```python
# VULNERABLE: AI generates this for "object persistence"
import pickle
import base64

@app.route('/load', methods=['POST'])
def load_data():
    data = request.json['data']
    obj = pickle.loads(base64.b64decode(data))  # RCE!
    return jsonify(obj)

# Attack: Craft pickle payload that executes os.system()
```

```python
# SECURE: Use JSON
import json

@app.route('/load', methods=['POST'])
def load_data():
    data = request.json['data']
    obj = json.loads(data)  # Safe
    return jsonify(obj)
```

**Pattern 2: yaml.load()**
```python
# VULNERABLE: yaml.load() without SafeLoader
import yaml

@app.route('/config', methods=['POST'])
def load_config():
    config = yaml.load(request.data)  # RCE in PyYAML < 5.4!
    return jsonify(config)

# Attack payload: !!python/object/apply:os.system ["rm -rf /"]
```

```python
# SECURE: Always use safe_load()
import yaml

@app.route('/config', methods=['POST'])
def load_config():
    config = yaml.safe_load(request.data)  # Safe
    return jsonify(config)
```

- Word count: 200-250

### Section 6: Prototype Pollution (JavaScript Related)
- JSON.parse() is safe BUT prototype pollution is related
- Happens when merging objects with `__proto__` keys
- Can lead to DoS, privilege escalation, or RCE
- Libraries affected: lodash (CVE-2019-10744), jQuery (CVE-2019-11358)

```javascript
// VULNERABLE: Recursive merge without sanitization
function merge(target, source) {
  for (let key in source) {
    if (typeof source[key] === 'object') {
      target[key] = merge(target[key] || {}, source[key])
    } else {
      target[key] = source[key] // __proto__ pollutes prototype!
    }
  }
  return target
}

// Attack: { "__proto__": { "isAdmin": true } }
```

```javascript
// SECURE: Use secure-json-parse or validate keys
import sjson from 'secure-json-parse'

const data = sjson.parse(userInput) // Rejects __proto__ keys
```

- Word count: 150-200

### Section 7: Framework-Specific Guidance

**Next.js / React Server Components:**
- CVE-2025-55182 affects Server Functions
- Update to React 19.2.1+ and Next.js 15.0.5+
- Validate all inputs to Server Actions

**Express.js:**
- Never use eval() or Function() with user input
- Use JSON.parse() for deserialization
- Validate with Zod/Yup before processing

**FastAPI / Flask:**
- Always use yaml.safe_load()
- Never use pickle with user input
- Use Pydantic for validation

- Word count: 100-150

### Section 8: AI Fix Prompt
```
Review my codebase for insecure deserialization vulnerabilities (CWE-502):

## JavaScript/Node.js Checks

1. **Search for eval()**: Find any use of eval() with user input
   - Pattern: `eval(`, `new Function(`
   - Replace with: Safe expression parsers or specific logic

2. **Search for unsafe deserializers**:
   - Pattern: `serialize.unserialize`, `node-serialize`
   - Replace with: `JSON.parse()` + schema validation

3. **Check for prototype pollution**:
   - Pattern: Recursive merge functions, `__proto__`
   - Replace with: `secure-json-parse` or key validation

## Python Checks

1. **Search for pickle.loads()**:
   - Pattern: `pickle.loads(`, `pickle.load(`
   - Replace with: JSON or explicitly trusted data only

2. **Search for yaml.load()**:
   - Pattern: `yaml.load(` without `Loader=yaml.SafeLoader`
   - Replace with: `yaml.safe_load()`

## Framework Checks

1. **React/Next.js**: Verify React >= 19.2.1, Next.js >= 15.0.5
2. **Express**: Check body-parser configuration
3. **FastAPI/Flask**: Check YAML and pickle usage

For each vulnerability:
- Show the dangerous code
- Show the secure replacement
- Note if schema validation is also needed
```

### FAQ Section
- Use PAA questions above
- Each answer 50-100 words with citable fact

### Related Content
- Links to command injection (related RCE vector)
- Links to XSS (different injection type)
- Links to AI tool patterns

---

## Internal Links (7-10 required)

| Anchor Text | URL | Context/Placement |
|-------------|-----|-------------------|
| command injection | /kb/security/vulnerabilities/command-injection/ | Similar RCE outcome |
| SQL injection | /kb/security/vulnerabilities/sql-injection/ | Different injection type |
| XSS | /kb/security/vulnerabilities/xss/ | Client-side injection |
| hardcoded secrets | /kb/security/vulnerabilities/hardcoded-secrets/ | Often combined |
| missing authentication | /kb/security/vulnerabilities/missing-auth/ | Access control context |
| Cursor security patterns | /kb/vibe-coding-tools/cursor/ | AI tool context |
| Claude Code security patterns | /kb/vibe-coding-tools/claude-code/ | AI tool context |
| GitHub Copilot security patterns | /kb/vibe-coding-tools/github-copilot/ | AI tool context |
| Next.js + Supabase security | /kb/security/stacks/nextjs-supabase/ | Framework context |

---

## External Links (8-12 required)

| Anchor Text | URL | Tier | Placement |
|-------------|-----|------|-----------|
| CWE-502: Deserialization of Untrusted Data | https://cwe.mitre.org/data/definitions/502.html | 1 | Intro |
| OWASP A08:2021 Software and Data Integrity | https://owasp.org/Top10/A08_2021-Software_and_Data_Integrity_Failures/ | 1 | Intro |
| OWASP Deserialization Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Deserialization_Cheat_Sheet.html | 1 | Fix section |
| OWASP Insecure Deserialization | https://owasp.org/www-community/vulnerabilities/Insecure_Deserialization | 1 | What is section |
| PortSwigger Prototype Pollution | https://portswigger.net/web-security/prototype-pollution | 2 | Prototype pollution section |
| Snyk node-serialize Vulnerability | https://security.snyk.io/package/npm/node-serialize | 4 | Node.js patterns |
| secure-json-parse GitHub | https://github.com/fastify/secure-json-parse | 4 | Fix section |
| PyYAML Documentation | https://pyyaml.org/wiki/PyYAMLDocumentation | 6 | Python patterns |
| SecureFlag Node.js Deserialization | https://knowledge-base.secureflag.com/vulnerabilities/unsafe_deserialization/unsafe_deserialization_nodejs.html | 4 | Node.js patterns |
| HackTricks Prototype Pollution | https://book.hacktricks.xyz/pentesting-web/deserialization/nodejs-proto-prototype-pollution | 4 | Prototype pollution |

---

## Notes for Writer Agent

### Tone Guidance
- **Critical severity:** This leads to complete server takeover
- **Practical focus:** Most vibe coders use JS/Python, not Java
- **Modern examples:** CVE-2025-55182 is very recent and relevant
- **Clear alternatives:** JSON.parse() and yaml.safe_load() are drop-in replacements

### Technical Accuracy
- JSON.parse() IS safe for deserialization (no code execution)
- Prototype pollution is RELATED but different (merging, not deserializing)
- eval() and Function() are basically equivalent
- yaml.safe_load() has always been safe
- pickle is NEVER safe with untrusted data (no "safe_pickle")
- node-serialize is a real, dangerous package that appears in AI-generated code

### Things to Avoid
- Don't imply JSON.parse() is dangerous (it's not)
- Don't suggest pickle can be made safe (it can't for untrusted data)
- Don't overcomplicate - most cases just need JSON
- Don't forget the CVE-2025-55182 React vulnerability - it's highly relevant

### Vibe Coding Terms
Use these 3-5 times naturally:
- vibe coding
- vibe coders
- vibe coded
- AI-generated code

### Value Maximizers
- Include the recent CVE-2025-55182 context (vibe coders using Next.js)
- Provide secure-json-parse as a drop-in solution
- Show exact attack payloads so they understand the threat
- Include version checks for PyYAML and React/Next.js

---

## Checklist Before Marking READY

- [x] All external links verified working
- [x] CWE/OWASP references correct (CWE-502, A08:2021)
- [x] 9 internal links identified
- [x] 5 PAA questions included
- [x] Competitive gap is specific
- [x] Code examples drafted (5 patterns + fixes)
- [x] No placeholder text
- [x] Recent CVE included (CVE-2025-55182)
- [x] Both JavaScript and Python covered

---

**Brief Status:** READY for Writer Agent
