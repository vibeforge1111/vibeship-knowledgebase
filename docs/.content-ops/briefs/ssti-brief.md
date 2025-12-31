# Content Brief: Server-Side Template Injection (SSTI)

## Status

```yaml
status: READY
created_at: 2025-12-17T22:15:00Z
created_by: Research Agent
claimed_by: null
claimed_at: null
completed_at: null
```

---

## Article Metadata

```yaml
type: vulnerability
slug: ssti
url: /kb/security/vulnerabilities/ssti/
title: "SSTI: When AI Template Code Becomes Remote Code Execution"
meta_description: "Server-Side Template Injection (SSTI) lets attackers execute code through template engines like Jinja2, EJS, and Pug. AI generates vulnerable patterns. Learn detection and prevention."
cwe: CWE-1336
cwe_parent: CWE-94
owasp: A03:2021-Injection
owasp_url: https://owasp.org/Top10/A03_2021-Injection/
cwe_url: https://cwe.mitre.org/data/definitions/1336.html
severity: Critical
word_count: 1500-1800
```

---

## Executive Summary

Server-Side Template Injection (SSTI) occurs when user input is embedded directly into server-side templates, allowing attackers to inject template expressions that execute on the server. This often leads to Remote Code Execution (RCE). AI tools frequently generate code that concatenates user input into templates rather than passing it as data. This article covers SSTI detection, exploitation patterns, and secure coding practices for popular template engines.

---

## Core Data

### Security References
- **CWE ID:** CWE-1336 (Improper Neutralization of Special Elements in Template Engine)
- **Parent CWE:** CWE-94 (Improper Control of Generation of Code - Code Injection)
- **Related CWE:** CWE-917 (Expression Language Injection)
- **OWASP Category:** A03:2021 - Injection
- **Severity:** Critical (usually leads to RCE)

### Key Statistics

| Statistic | Value | Source |
|-----------|-------|--------|
| Impact | Remote Code Execution | CWE-1336 Profile |
| Detection | SAST tools effective | CWE Profile |
| Related to XSS | SSTI can obscure XSS | CWE-1336 |

### Notable CVEs

| CVE | Product | Impact |
|-----|---------|--------|
| CVE-2024-34359 | llama_cpp_python (Jinja2) | RCE in Python LLM bindings |
| CVE-2020-12790 | Twig template | Code execution |
| CVE-2019-19999 | FreeMarker | Unsafe configuration SSTI |

### Affected Template Engines

| Engine | Language | Risk Level | Common Context |
|--------|----------|------------|----------------|
| Jinja2 | Python | High | Flask, FastAPI |
| EJS | Node.js | High | Express |
| Pug (Jade) | Node.js | High | Express |
| Handlebars | Node.js | Medium | Express |
| Twig | PHP | High | Symfony |
| FreeMarker | Java | High | Spring |
| Velocity | Java | High | Legacy Java apps |
| ERB | Ruby | High | Rails |

---

## How SSTI Attacks Work

### The Vulnerability Pattern
SSTI occurs when user input is concatenated into a template string rather than passed as data:

```python
# VULNERABLE: User input in template string
@app.route('/hello')
def hello():
    name = request.args.get('name')
    template = f"Hello {name}!"  # Direct concatenation
    return render_template_string(template)

# Attack: ?name={{config.items()}}
# Attack: ?name={{''.__class__.__mro__[1].__subclasses__()}}
```

```javascript
// VULNERABLE: User input in EJS template
app.get('/hello', (req, res) => {
    const template = `Hello <%= ${req.query.name} %>!`
    res.render('inline', { template })
})
```

### Attack Progression

**Step 1: Detection**
```
Input: ${7*7}
Output: 49

Input: {{7*7}}
Output: 49
```
If mathematical expressions evaluate, SSTI is likely present.

**Step 2: Engine Identification**
```
{{7*7}} = 49      → Jinja2, Twig
${7*7} = 49       → FreeMarker, Velocity
<%= 7*7 %>        → EJS, ERB
#{7*7}            → Pug
```

**Step 3: Exploitation (Jinja2 Example)**
```python
# Read /etc/passwd
{{ ''.__class__.__mro__[1].__subclasses__()[40]('/etc/passwd').read() }}

# Execute commands
{{ config.__class__.__init__.__globals__['os'].popen('id').read() }}
```

---

## Why AI Tools Generate Vulnerable Code

### The Template String Trap
AI tools often generate code that builds templates dynamically:

```python
# AI generates this for "personalized greeting"
@app.route('/greet')
def greet():
    name = request.args.get('name')
    return render_template_string(f"<h1>Welcome, {name}!</h1>")
```

Instead of the secure pattern:
```python
# SECURE: Pass data to template
@app.route('/greet')
def greet():
    name = request.args.get('name')
    return render_template_string("<h1>Welcome, {{ name }}!</h1>", name=name)
```

### Common AI Patterns

**Pattern 1: String Concatenation**
```python
# VULNERABLE
template = "Hello " + user_input + "!"
render_template_string(template)
```

**Pattern 2: f-string Templates**
```python
# VULNERABLE
template = f"<div>{user_data}</div>"
render_template_string(template)
```

**Pattern 3: Dynamic Template Selection**
```javascript
// VULNERABLE: User controls template name
const template = req.params.template
res.render(template, data)  // Path traversal + SSTI
```

---

## SEO Strategy

### Target Keywords

| Keyword | Search Intent | Priority |
|---------|---------------|----------|
| SSTI vulnerability | informational | Primary |
| server side template injection | informational | Primary |
| template injection attack | informational | Secondary |
| Jinja2 SSTI | informational | Secondary |
| CWE-1336 | informational | Tertiary |
| EJS template injection | informational | Tertiary |

### People Also Ask (FAQs)

1. What is server-side template injection?
2. How do I detect SSTI vulnerabilities?
3. Is Jinja2 vulnerable to SSTI?
4. What's the difference between SSTI and XSS?
5. How do I prevent template injection in Node.js?

### Competitive Gap

**Top results analysis:**
- PortSwigger: Excellent technical depth, pentest-focused
- HackTricks: Attack payloads, less on prevention
- OWASP: Testing guide, not developer-focused

**Our unique angle:**
- AI tool context: Why generated code is vulnerable
- Multiple template engines covered
- "Data vs template" mental model
- Copy-paste secure patterns
- Detection → Engine ID → Fix workflow

---

## Content Outline

### Quick Answer (50 words max)
Server-Side Template Injection lets attackers execute code by injecting template expressions into your app. AI tools generate vulnerable code that concatenates user input into templates. The fix: always pass user data as template variables, never embed it in the template string itself.

### Section 1: What is SSTI? (100-150 words)
- Plain English: User input becomes part of the template code
- Templates have expression languages ({{, ${, <%=)
- These expressions execute on the server
- Impact: Usually Remote Code Execution
- Part of OWASP A03:2021 Injection family
- Related to but different from XSS

### Section 2: How SSTI Attacks Work (200-250 words)
- Detection: Inject {{7*7}} or ${7*7}
- If output is 49, SSTI is likely
- Engine identification via syntax differences
- Exploitation varies by engine
- Jinja2 attack chain example
- Why it leads to RCE (access to Python/Node/Ruby runtime)

### Section 3: Why AI Tools Generate This (150-200 words)
- AI concatenates for "dynamic" templates
- f-strings and template literals are natural for AI
- Training data includes vulnerable patterns
- "Make it personalized" → string concatenation
- Code comparison: AI output vs secure pattern

### Section 4: Template Engine Patterns (300-400 words)

**Jinja2 (Python/Flask):**
```python
# VULNERABLE
return render_template_string(f"Hello {name}")

# SECURE
return render_template_string("Hello {{ name }}", name=name)
```

**EJS (Node.js/Express):**
```javascript
// VULNERABLE
const html = ejs.render(`<p>${userInput}</p>`)

// SECURE
const html = ejs.render('<p><%= name %></p>', { name: userInput })
```

**Pug (Node.js):**
```javascript
// VULNERABLE
const template = `h1 ${userInput}`
pug.render(template)

// SECURE
pug.render('h1= name', { name: userInput })
```

**Handlebars (Node.js):**
```javascript
// Handlebars auto-escapes by default
// But custom helpers can be dangerous
// VULNERABLE: Unsafe helper registration
Handlebars.registerHelper('exec', function(cmd) {
  return require('child_process').execSync(cmd)
})
```

**Twig (PHP):**
```php
// VULNERABLE
$twig->createTemplate("Hello $name")->render();

// SECURE
$twig->render('hello.twig', ['name' => $name]);
```

### Section 5: AI Fix Prompt (200-300 words)
```
Review my codebase for Server-Side Template Injection (SSTI) vulnerabilities (CWE-1336):

## Check 1: Template String Construction
Search for patterns where user input enters template strings:
- Python: f"...{user_input}...", "..." + user_input, render_template_string()
- Node.js: `...${userInput}...` with template engines, ejs.render()
- PHP: "...$variable..." with Twig/Blade

Flag: Any user input concatenated into template strings

## Check 2: Dynamic Template Names
Look for user-controlled template selection:
- render(req.params.template)
- render_template(user_input)
- Template path from user input

## Check 3: Unsafe Helper Registration
In Handlebars/custom engines:
- Helpers that execute code
- Helpers that access filesystem
- Helpers with eval() or exec()

## Secure Patterns by Engine

Jinja2:
- Use render_template() with named file
- Pass all data as template variables
- Enable autoescape (default in Flask)

EJS:
- Never build template strings from user input
- Use <%- %> only for trusted content
- Use <%= %> for escaped output

For each vulnerability:
- Show the vulnerable code
- Explain how {{7*7}} or ${7*7} would exploit it
- Provide secure replacement with data as variables
```

### Section 6: Detection Checklist (100-150 words)
- Test with {{7*7}}, ${7*7}, <%= 7*7 %>
- Check for error messages revealing engine
- Look for reflection of input in responses
- Tools: Tplmap, Burp Scanner

### Section 7: SSTI vs XSS (100 words)
- XSS: Executes in browser (client-side)
- SSTI: Executes on server (server-side)
- SSTI can cause XSS but is more dangerous
- SSTI = RCE, XSS = session theft
- Both are injection vulnerabilities

### Section 8: FAQ (5 questions, 50-100 words each)
- Use PAA questions above
- Direct answers first

### Section 9: Related Content
- XSS (client-side counterpart)
- Command injection (related RCE)
- Code injection (parent category)

---

## Internal Links (7-10 required)

| Anchor Text | URL | Context/Placement |
|-------------|-----|-------------------|
| XSS | /kb/security/vulnerabilities/xss/ | SSTI vs XSS comparison |
| command injection | /kb/security/vulnerabilities/command-injection/ | Related RCE vector |
| SQL injection | /kb/security/vulnerabilities/sql-injection/ | Injection family |
| insecure deserialization | /kb/security/vulnerabilities/insecure-deserialization/ | Related code execution |
| path traversal | /kb/security/vulnerabilities/path-traversal/ | Template path attacks |
| Cursor security patterns | /kb/vibe-coding-tools/cursor/ | AI tool context |
| Claude Code security patterns | /kb/vibe-coding-tools/claude-code/ | AI tool context |
| Bolt security patterns | /kb/vibe-coding-tools/bolt/ | AI tool context |

---

## External Links (10-12 required)

| Anchor Text | URL | Tier | Placement |
|-------------|-----|------|-----------|
| CWE-1336: SSTI | https://cwe.mitre.org/data/definitions/1336.html | 1 | Intro |
| OWASP A03:2021 Injection | https://owasp.org/Top10/A03_2021-Injection/ | 1 | Intro |
| PortSwigger SSTI | https://portswigger.net/web-security/server-side-template-injection | 2 | What is section |
| OWASP SSTI Testing | https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Input_Validation_Testing/18-Testing_for_Server-side_Template_Injection | 1 | Detection section |
| Jinja2 Documentation | https://jinja.palletsprojects.com/ | 6 | Python section |
| EJS npm package | https://www.npmjs.com/package/ejs | 6 | Node.js section |
| Pug Documentation | https://pugjs.org/ | 6 | Node.js section |
| PayloadsAllTheThings SSTI | https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/Server%20Side%20Template%20Injection | 4 | Detection section |
| Tplmap Tool | https://github.com/epinna/tplmap | 4 | Tools section |

---

## Notes for Writer Agent

### Tone Guidance
- **Critical severity:** SSTI usually means RCE
- **Clear mental model:** "Data vs template" distinction
- **Multi-engine:** Cover the engines vibe coders actually use
- **Detection-first:** How to find it, then how to fix

### Technical Accuracy
- SSTI and XSS are different - don't conflate them
- Jinja2's autoescape prevents XSS but not SSTI
- Handlebars is safer due to limited expression language
- Detection payload varies by engine
- CVE-2024-34359 is real and affects LLM tools

### Things to Avoid
- Don't confuse SSTI with XSS
- Don't suggest all templating is dangerous (only when concatenating)
- Don't provide too many exploitation payloads (focus on prevention)
- Don't forget Node.js engines (EJS, Pug are common)

### Vibe Coding Terms
Use these 3-5 times naturally:
- vibe coding / vibe coders
- AI-generated code
- AI tools

### Value Maximizers
- "Data vs template" mental model
- Detection payloads by engine
- Multiple engine examples (Python, Node.js, PHP)
- CVE-2024-34359 (LLM-related)
- AI fix prompt

---

## Checklist Before Marking READY

- [x] All external links verified working
- [x] CWE/OWASP references correct (CWE-1336, A03:2021)
- [x] 8 internal links identified
- [x] 5 PAA questions included
- [x] Competitive gap is specific
- [x] Multiple template engines covered
- [x] Detection payloads included
- [x] AI fix prompt included
- [x] SSTI vs XSS distinction clear

---

**Brief Status:** READY for Writer Agent
