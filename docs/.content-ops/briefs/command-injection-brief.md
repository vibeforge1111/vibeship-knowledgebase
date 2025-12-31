# Content Brief: Command Injection (OS Command Injection)

## Status

```yaml
status: DONE
created_at: 2025-12-17T17:45:00Z
created_by: Research Agent (Terminal 1)
claimed_by: Writer Agent
claimed_at: 2025-12-17T18:00:00Z
completed_at: 2025-12-17T19:00:00Z
```

---

## Article Metadata

```yaml
type: vulnerability
slug: command-injection
url: /kb/security/vulnerabilities/command-injection/
title: "Command Injection: When AI Gives Attackers Shell Access"
meta_description: "AI tools generate exec() and shell commands with user input, enabling attackers to run arbitrary commands. Learn CWE-78 patterns and use execFile/spawn safely."
cwe: CWE-78
cwe_parent: CWE-77
owasp: A03:2021-Injection
owasp_url: https://owasp.org/Top10/A03_2021-Injection/
cwe_url: https://cwe.mitre.org/data/definitions/78.html
severity: Critical
word_count: 1200-1500
```

---

## Core Data

### Primary References
| Reference | ID | Link |
|-----------|-----|------|
| CWE-78 | OS Command Injection | https://cwe.mitre.org/data/definitions/78.html |
| CWE-77 | Command Injection (parent) | https://cwe.mitre.org/data/definitions/77.html |
| OWASP A03:2021 | Injection | https://owasp.org/Top10/A03_2021-Injection/ |
| OWASP Command Injection | Attack description | https://owasp.org/www-community/attacks/Command_Injection |

### CVSS Severity
- **Typical CVSS Score:** 8.8 - 9.9 (Critical)
- **Impact:** Complete system compromise, data theft, remote code execution
- **Exploitability:** Often trivial with user input in shell commands

### Key Facts to Include
- Command injection CVSS scores range from 8.8 to 9.9 (CISA)
- `child_process.exec()` is a "bash interpreter, not a program launcher"
- Shell metacharacters (; | $ ` > <) enable arbitrary command execution
- GitHub Copilot generated code has 6.21% prevalence of CWE-78 (academic research)
- CISA added multiple command injection CVEs to KEV in 2024 (CVE-2024-20399, CVE-2024-3400, CVE-2024-21887)
- CVE-2024-27980: Node.js child_process.spawn vulnerability on Windows with .bat/.cmd files

### Recent CVE Reference
**CVE-2024-27980 (Node.js):**
- Malicious command line argument can inject commands in `child_process.spawn/spawnSync`
- Even without shell option enabled on Windows
- Affects .bat and .cmd file execution
- Node.js now errors with EINVAL for these cases without shell option

---

## SEO Strategy

### Target Keywords
| Keyword | Search Intent | Priority |
|---------|---------------|----------|
| command injection | informational | Primary |
| os command injection | informational | Primary |
| node.js exec security | informational | Secondary |
| child_process exec vulnerability | informational | Secondary |
| CWE-78 | informational | Secondary |
| shell injection | informational | Tertiary |

### People Also Ask (FAQs)
1. What is command injection?
2. Why is exec() dangerous in Node.js?
3. How do I safely execute shell commands?
4. What's the difference between exec and execFile?
5. Can spawn() be vulnerable to command injection?

### Competitive Gap
**Top results analysis:**
- OWASP: Good overview but not Node.js/JavaScript specific
- Auth0 blog: Solid but dated (2020)
- Semgrep: Rule-focused, less educational
- CWE: Technical definition, not actionable

**Our unique angle:**
- AI tool context: Why Copilot/Cursor generate vulnerable exec() calls
- Modern Node.js patterns with examples
- exec vs execFile vs spawn comparison table
- Copy-paste safe alternatives
- Framework-specific (Next.js API routes, Express handlers)

---

## Content Outline

### Quick Answer (50 words max)
Command injection lets attackers run arbitrary system commands when your app passes user input to shell functions like exec(). AI tools often generate `exec(\`command ${userInput}\`)` patterns. Replace exec() with execFile() or spawn() with array arguments to prevent shell interpretation.

### Section 1: What is Command Injection?
- Plain English: Attackers hijack your shell commands to run their own
- How it works: Shell metacharacters (; | && $() `) break out of intended command
- Real-world example: `ping -c 4 ${userIP}` → `userIP = "8.8.8.8; cat /etc/passwd"`
- Impact: Complete server takeover, data exfiltration, ransomware deployment
- CVSS 8.8-9.9 reflects severity
- Word count: 100-150

### Section 2: How Shell Commands Get Exploited
- Shell metacharacters:
  - `;` - Command separator: `ping; rm -rf /`
  - `|` - Pipe: `ping | cat /etc/passwd`
  - `&&` - Chain on success: `ping && whoami`
  - `$()` or backticks - Command substitution: `ping $(whoami)`
  - `>` `<` - Redirection: `ping > /dev/null; cat /etc/shadow > output.txt`
- The attacker controls the command, not just arguments
- Word count: 100-150

### Section 3: Why AI Tools Generate Vulnerable Code
- AI generates exec() because it's the most common pattern in training data
- "Run a shell command" naturally leads to exec()
- Template literals make code readable but dangerous
- AI doesn't distinguish trusted vs untrusted input
- 6.21% of Copilot-generated code contains CWE-78 (academic study)
- Word count: 100-150

### Section 4: The exec() Trap
```javascript
// VULNERABLE: AI generates this for "ping a server"
const { exec } = require('child_process')

app.get('/ping', (req, res) => {
  const host = req.query.host

  // Attacker sends: host=8.8.8.8; cat /etc/passwd
  exec(`ping -c 4 ${host}`, (error, stdout) => {
    res.send(stdout)
  })
})
```
**What happens:**
- `exec()` spawns a shell (bash/sh)
- Shell interprets `;` as command separator
- Attacker's command runs with app's privileges

- Word count: 100-150

### Section 5: exec() vs execFile() vs spawn()
| Function | Shell | Safe by Default | Use When |
|----------|-------|-----------------|----------|
| `exec()` | Yes | ❌ No | Never with user input |
| `execFile()` | No* | ✅ Yes | Running specific binary |
| `spawn()` | No* | ✅ Yes | Streaming output |

*Unless `shell: true` option is set

```javascript
// exec() - DANGEROUS
exec(`ls -la ${userPath}`)  // Shell interprets everything

// execFile() - SAFE
execFile('ls', ['-la', userPath])  // Arguments passed directly

// spawn() - SAFE
spawn('ls', ['-la', userPath])  // Arguments passed directly
```
- Word count: 150-200

### Section 6: Pattern 1 - Safe Alternative with execFile()
```javascript
// VULNERABLE: exec with user input
const { exec } = require('child_process')

app.get('/fileinfo', (req, res) => {
  const filename = req.query.file
  exec(`ls -la ${filename}`, (err, stdout) => {  // INJECTION!
    res.send(stdout)
  })
})
```

```javascript
// SECURE: execFile with array arguments
const { execFile } = require('child_process')
const path = require('path')

const ALLOWED_DIR = '/safe/directory'

app.get('/fileinfo', (req, res) => {
  const filename = req.query.file

  // Validate: only allow specific directory
  const safePath = path.join(ALLOWED_DIR, path.basename(filename))

  // Verify path didn't escape
  if (!safePath.startsWith(ALLOWED_DIR)) {
    return res.status(403).send('Access denied')
  }

  // execFile doesn't use shell - args are escaped
  execFile('ls', ['-la', safePath], (err, stdout) => {
    if (err) {
      return res.status(500).send('Error listing file')
    }
    res.send(stdout)
  })
})
```
- Word count: 150-200

### Section 7: Pattern 2 - Safe spawn() with Streaming
```javascript
// VULNERABLE: exec for long-running command
app.get('/backup', (req, res) => {
  const dbName = req.query.db
  exec(`pg_dump ${dbName}`, (err, stdout) => {  // INJECTION!
    res.send(stdout)
  })
})
```

```javascript
// SECURE: spawn with validated input
const { spawn } = require('child_process')

const ALLOWED_DATABASES = ['users', 'products', 'orders']

app.get('/backup', (req, res) => {
  const dbName = req.query.db

  // Allowlist validation
  if (!ALLOWED_DATABASES.includes(dbName)) {
    return res.status(400).send('Invalid database name')
  }

  const backup = spawn('pg_dump', [dbName])

  backup.stdout.pipe(res)

  backup.stderr.on('data', (data) => {
    console.error('Backup error:', data.toString())
  })

  backup.on('error', (err) => {
    res.status(500).send('Backup failed')
  })
})
```
- Word count: 150-200

### Section 8: Pattern 3 - When You Must Use Shell Features
```javascript
// Sometimes you need shell features (pipes, redirects)
// SECURE: Construct command safely, validate all inputs

const { exec } = require('child_process')

// Strict allowlist for commands
const ALLOWED_COMMANDS = {
  'disk-usage': 'df -h',
  'memory': 'free -m',
  'uptime': 'uptime'
}

app.get('/system/:command', (req, res) => {
  const cmd = ALLOWED_COMMANDS[req.params.command]

  if (!cmd) {
    return res.status(400).send('Invalid command')
  }

  // Command is from allowlist, not user input
  exec(cmd, (err, stdout) => {
    res.send(stdout)
  })
})
```
- Word count: 100-150

### Section 9: Common Dangerous Patterns to Find
```javascript
// Pattern 1: Template literals in exec
exec(`command ${userInput}`)
exec(`command ${req.query.param}`)
exec(`command ${req.body.value}`)

// Pattern 2: String concatenation
exec('command ' + userInput)
exec('ls -la ' + filename)

// Pattern 3: User input anywhere in command
exec(userCommand)
exec(`${userCommand}`)

// Pattern 4: Indirect user input
const options = req.body.options
exec(`tool ${options.join(' ')}`)  // Array could contain ; or |
```
- Word count: 100-150

### Section 10: AI Fix Prompt
```
Review my code for command injection vulnerabilities (CWE-78):

1. **Find exec() with user input**: Search for child_process.exec, execSync, or require('child_process').exec that includes:
   - req.query, req.body, req.params values
   - Template literals with variables
   - String concatenation with user data

2. **Replace with safe alternatives**:
   - Use execFile() or spawn() instead of exec()
   - Pass arguments as array, not string
   - Never use shell: true with user input

3. **Validate all input**:
   - Use allowlists for command names
   - Validate/sanitize arguments (alphanumeric only)
   - Use path.basename() for filenames
   - Verify paths stay within allowed directories

4. **Check for indirect injection**:
   - Arrays that get joined into commands
   - Config values that come from user input
   - Environment variables set from requests

For each vulnerability:
- Show the dangerous code
- Show the secure replacement using execFile/spawn
- Note if allowlist validation is also needed
```

### FAQ Section
- Use PAA questions above
- Each answer 50-100 words with citable fact

### Related Content
- Links to SQL injection (same injection family)
- Links to path traversal (often combined)
- Links to AI tool patterns

---

## Internal Links (7-10 required)

| Anchor Text | URL | Context/Placement |
|-------------|-----|-------------------|
| SQL injection | /kb/security/vulnerabilities/sql-injection/ | Same OWASP category |
| path traversal | /kb/security/vulnerabilities/path-traversal/ | Often combined attack |
| XSS | /kb/security/vulnerabilities/xss/ | Same injection family |
| missing authentication | /kb/security/vulnerabilities/missing-auth/ | Access control context |
| GitHub Copilot security patterns | /kb/vibe-coding-tools/github-copilot/ | AI tool context (6.21% stat) |
| Cursor security patterns | /kb/vibe-coding-tools/cursor/ | AI tool context |
| Claude Code security patterns | /kb/vibe-coding-tools/claude-code/ | AI tool context |
| sensitive data exposure | /kb/security/vulnerabilities/sensitive-data-exposure/ | Command output leakage |

---

## External Links (8-12 required)

| Anchor Text | URL | Tier | Placement |
|-------------|-----|------|-----------|
| CWE-78: OS Command Injection | https://cwe.mitre.org/data/definitions/78.html | 1 | Intro |
| CWE-77: Command Injection | https://cwe.mitre.org/data/definitions/77.html | 1 | Technical context |
| OWASP Command Injection | https://owasp.org/www-community/attacks/Command_Injection | 1 | What is section |
| OWASP A03:2021 Injection | https://owasp.org/Top10/A03_2021-Injection/ | 1 | Intro |
| CISA Secure by Design: Command Injection | https://www.cisa.gov/resources-tools/resources/secure-design-alert-eliminating-os-command-injection-vulnerabilities | 3 | Severity context |
| Auth0: Preventing Command Injection in Node.js | https://auth0.com/blog/preventing-command-injection-attacks-in-node-js-apps/ | 2 | Node.js section |
| Semgrep Command Injection Cheat Sheet | https://semgrep.dev/docs/cheat-sheets/javascript-command-injection | 4 | Pattern detection |
| eslint-plugin-security: avoid-command-injection | https://github.com/eslint-community/eslint-plugin-security/blob/main/docs/avoid-command-injection-node.md | 4 | Static analysis |
| Node.js Security Releases April 2024 | https://nodejs.org/en/blog/vulnerability/april-2024-security-releases-2 | 6 | CVE-2024-27980 context |

---

## Notes for Writer Agent

### Tone Guidance
- **Critical severity:** Emphasize this is system takeover, not just data leak
- **Simple explanation:** Shell metacharacters aren't obvious to vibe coders
- **Clear alternatives:** exec → execFile is the main message
- **Don't blame AI:** AI generates what's common in training data

### Technical Accuracy
- exec() spawns a shell; execFile/spawn do NOT (unless shell:true)
- execFile and spawn are NOT immune if shell:true is set
- Some commands (like find) are dangerous even with spawn
- CVE-2024-27980 is a real Node.js vulnerability (Windows .bat/.cmd)
- CVSS 8.8-9.9 is accurate for command injection

### Things to Avoid
- Don't suggest execFile/spawn are 100% safe (still need input validation)
- Don't forget the shell:true option makes them dangerous
- Don't imply sanitization alone is sufficient (allowlist preferred)
- Don't suggest regex sanitization (easy to bypass)

### Vibe Coding Terms
Use these 3-5 times naturally:
- vibe coding
- vibe coders
- vibe coded
- AI-generated code

---

## Checklist Before Marking READY

- [x] All external links verified working
- [x] CWE/OWASP references correct (CWE-78, CWE-77, A03:2021)
- [x] 8 internal links identified
- [x] 5 PAA questions included
- [x] Competitive gap is specific
- [x] Code examples drafted (3 patterns + comparison table)
- [x] No placeholder text
- [x] exec vs execFile vs spawn clearly explained

---

**Brief Status:** READY for Writer Agent
