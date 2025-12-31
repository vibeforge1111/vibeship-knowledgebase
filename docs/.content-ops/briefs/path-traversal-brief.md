# Content Brief: Path Traversal Vulnerability

## Status

```yaml
status: DONE
created_at: 2025-12-17T15:00:00Z
created_by: Research Agent Terminal 1B
claimed_by: Writer Agent Terminal 1B
claimed_at: 2025-12-17T16:30:00Z
completed_at: 2025-12-17T17:00:00Z
```

---

## Article Metadata

```yaml
type: vulnerability
slug: path-traversal
url: /kb/security/vulnerabilities/path-traversal/
title: "Path Traversal: Stop Attackers Escaping Your Directories"
meta_description: "Path traversal lets attackers read files outside your app directory using ../. Found in file uploads and downloads. Get AI fix prompts for Node.js and Next.js."
cwe: CWE-22
owasp: A01:2021-Broken Access Control
severity: High
word_count: 1200-1500
```

---

## Core Data

### Primary References
| Reference | ID | Link |
|-----------|-----|------|
| CWE-22 | Improper Limitation of a Pathname to a Restricted Directory | https://cwe.mitre.org/data/definitions/22.html |
| OWASP | A01:2021-Broken Access Control | https://owasp.org/Top10/A01_2021-Broken_Access_Control/ |
| OWASP Path Traversal | Attack Description | https://owasp.org/www-community/attacks/Path_Traversal |

### External Sources (for outbound links)
| Source | URL | Key Finding | Tier |
|--------|-----|-------------|------|
| CWE-22 Definition | https://cwe.mitre.org/data/definitions/22.html | Comprehensive vulnerability definition and mitigations | 1 |
| OWASP Path Traversal | https://owasp.org/www-community/attacks/Path_Traversal | Attack patterns and examples | 1 |
| PortSwigger Path Traversal | https://portswigger.net/web-security/file-path-traversal | Detailed exploitation techniques | 2 |
| Snyk Path Traversal | https://learn.snyk.io/lesson/directory-traversal/ | Node.js specific examples | 2 |
| Express Issue #3978 | https://github.com/expressjs/express/issues/3978 | Real Express.js vulnerability discussion | 6 |
| Node.js path module | https://nodejs.org/api/path.html | Official path.resolve documentation | 6 |
| ImmuniWeb Path Traversal | https://www.immuniweb.com/vulnerability/path-traversal.html | Exploitation and remediation guide | 2 |

### Key Facts to Include
- CWE-22 is in the CWE Top 25 Most Dangerous Software Weaknesses
- Path traversal can lead to reading /etc/passwd, configuration files, source code
- express-fileupload had implementation flaws allowing hidden file uploads
- Filtering only "../" is insufficient - attackers use "....//" or encoded variants
- Node.js path.resolve() alone is NOT sufficient - must verify result is within allowed directory
- Consequences include: confidentiality breach, integrity compromise, code execution

---

## SEO Strategy

### Target Keywords
| Keyword | Search Intent | Priority |
|---------|---------------|----------|
| path traversal vulnerability | informational | Primary |
| directory traversal attack | informational | Primary |
| path traversal Node.js | informational | Secondary |
| file upload security vulnerability | informational | Secondary |
| CWE-22 fix | transactional | Secondary |
| prevent path traversal | transactional | Tertiary |

### People Also Ask (FAQs)
1. What is path traversal vulnerability?
2. How do I prevent path traversal in Node.js?
3. What is the difference between path traversal and LFI?
4. Can path traversal lead to remote code execution?
5. How do I test for path traversal vulnerabilities?

### Competitive Gap
**Top results analysis:**
- PortSwigger: Excellent but generic, not AI-code focused
- OWASP: Comprehensive but dense, not beginner-friendly
- Snyk: Good examples but lacks AI tool context

**Our unique angle:**
- AI tools generate vulnerable file handling code by default
- Vibe coders building file uploads/downloads need this
- Copy-paste Node.js/Next.js fixes with before/after
- Why path.resolve() alone isn't enough

---

## Content Outline

### Quick Answer (50 words max)
Path traversal happens when attackers use `../` sequences to escape your intended directory and read files like `/etc/passwd` or your `.env` file. AI tools often generate vulnerable file handling code. Always validate that resolved paths stay within your allowed directory.

### Section 1: What is Path Traversal?
- Plain English: Attackers escape your intended folder using "../"
- Analogy: Like an elevator that should only go to floors 1-10, but hackers trick it into going to the basement where secrets are stored
- Consequences: Read sensitive files, overwrite configs, execute code
- CWE-22 reference
- Word count: 100-150

### Section 2: Why AI Tools Generate Vulnerable File Code
- AI generates simple, functional file handling
- No validation of user-supplied filenames
- express-fileupload, multer often misconfigured
- "Download file" features are high-risk
- Word count: 150-200

### Section 3: Common Path Traversal Patterns
- Basic: `../../../etc/passwd`
- URL encoded: `%2e%2e%2f`
- Double encoding: `%252e%252e%252f`
- Null byte: `../../../etc/passwd%00.png` (older systems)
- Backslash on Windows: `..\..\..\`
- Word count: 150-200

### Section 4: How to Fix Path Traversal in Node.js
- Step 1: Use path.resolve() to get absolute path
- Step 2: Verify result starts with allowed base directory
- Step 3: Reject if path escapes base
- Framework-specific: Next.js API routes, Express
- Word count: 200-300

### Section 5: AI Fix Prompt
- Complete prompt for scanning codebase
- Word count: 150-200

### FAQ Section
- Use PAA questions above
- Each answer: 50-100 words
- Include citable fact in each

### Related Content
- Links to other vulnerability articles
- Links to AI tool patterns

---

## Internal Links (5-10 required)

| Anchor Text | URL | Context/Placement |
|-------------|-----|-------------------|
| hardcoded secrets | /kb/security/vulnerabilities/hardcoded-secrets/ | Reading .env files |
| IDOR | /kb/security/vulnerabilities/idor/ | Related access control |
| missing authentication | /kb/security/vulnerabilities/missing-auth/ | Unprotected file endpoints |
| Cursor security patterns | /kb/vibe-coding-tools/cursor/ | AI tool context |
| Bolt security patterns | /kb/vibe-coding-tools/bolt/ | AI tool context |
| Claude Code security patterns | /kb/vibe-coding-tools/claude-code/ | AI tool context |
| Next.js + Supabase security | /kb/security/stacks/nextjs-supabase/ | Framework context |

---

## External Links (5-10 required)

| Anchor Text | URL | Tier | Placement |
|-------------|-----|------|-----------|
| CWE-22: Path Traversal | https://cwe.mitre.org/data/definitions/22.html | 1 | Intro |
| OWASP Path Traversal | https://owasp.org/www-community/attacks/Path_Traversal | 1 | What is section |
| PortSwigger File Path Traversal | https://portswigger.net/web-security/file-path-traversal | 2 | Attack patterns |
| OWASP Broken Access Control | https://owasp.org/Top10/A01_2021-Broken_Access_Control/ | 1 | Intro |
| Node.js path module | https://nodejs.org/api/path.html | 6 | Fix section |
| Snyk Directory Traversal | https://learn.snyk.io/lesson/directory-traversal/ | 2 | Testing section |

---

## Code Examples Needed

### Pattern 1: Vulnerable File Download (AI Default)
```javascript
// VULNERABLE: AI generates this for "download file" feature
app.get('/download', (req, res) => {
  const filename = req.query.file
  const filepath = `./uploads/${filename}` // DANGEROUS!
  res.sendFile(filepath)
})

// Attacker uses: /download?file=../../../etc/passwd
```
Explanation: User input directly concatenated into path. No validation allows escaping uploads directory.

### Pattern 2: Insufficient Fix (path.resolve only)
```javascript
// STILL VULNERABLE: path.resolve alone doesn't prevent traversal
const path = require('path')

app.get('/download', (req, res) => {
  const filename = req.query.file
  const filepath = path.resolve('./uploads', filename) // NOT ENOUGH!
  res.sendFile(filepath)
})

// Attacker: /download?file=../../../etc/passwd
// Resolves to: /etc/passwd (outside uploads!)
```
Explanation: path.resolve() normalizes the path but doesn't restrict it. Must verify result is within allowed directory.

### Pattern 3: Secure Implementation
```javascript
// SECURE: Validate resolved path is within allowed directory
const path = require('path')

const UPLOADS_DIR = path.resolve('./uploads')

app.get('/download', (req, res) => {
  const filename = req.query.file
  const filepath = path.resolve(UPLOADS_DIR, filename)

  // CRITICAL: Verify path is within uploads directory
  if (!filepath.startsWith(UPLOADS_DIR + path.sep)) {
    return res.status(403).send('Access denied')
  }

  res.sendFile(filepath)
})
```
Explanation: After resolving, check that the final path starts with the base directory. This catches all traversal attempts.

### Pattern 4: Secure File Upload Handling
```javascript
// SECURE: Sanitize uploaded filenames
const path = require('path')

function sanitizeFilename(filename) {
  // Remove path separators and traversal sequences
  return path.basename(filename).replace(/[^a-zA-Z0-9._-]/g, '_')
}

app.post('/upload', upload.single('file'), (req, res) => {
  const safeFilename = sanitizeFilename(req.file.originalname)
  const filepath = path.join(UPLOADS_DIR, safeFilename)
  // ... save file
})
```
Explanation: path.basename() strips directory components. Additional sanitization removes special characters.

### Pattern 5: Next.js API Route Protection
```typescript
// SECURE: Next.js API route with path validation
// app/api/files/[filename]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs/promises'

const FILES_DIR = path.resolve(process.cwd(), 'public/files')

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  const filename = params.filename
  const filepath = path.resolve(FILES_DIR, filename)

  // Validate path is within allowed directory
  if (!filepath.startsWith(FILES_DIR + path.sep)) {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 })
  }

  // Check file exists
  try {
    await fs.access(filepath)
    const file = await fs.readFile(filepath)
    return new NextResponse(file)
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
}
```
Explanation: Same pattern in Next.js context. Resolve path, validate it stays within allowed directory.

---

## AI Fix Prompt Requirements

The Writer Agent should create an AI fix prompt that includes:
- [ ] Search for file path construction with user input
- [ ] Search for `res.sendFile`, `fs.readFile`, `fs.writeFile` with dynamic paths
- [ ] Check for path.resolve() without subsequent validation
- [ ] Look for file upload handling (multer, express-fileupload)
- [ ] Verify all file operations validate paths stay within allowed directories
- [ ] Framework-specific: Next.js API routes, Express handlers
- [ ] Verification: Test with `../` in filenames

---

## Notes for Writer Agent

### Tone Guidance
- File operations feel "safe" to vibe coders - emphasize the risk
- The path.resolve() false sense of security is important to address
- Show that this is common in "download" and "upload" features

### Technical Accuracy
- path.resolve() normalizes but doesn't restrict
- Must check startsWith(baseDir + path.sep) - the separator is important!
- Windows uses backslash, Unix uses forward slash
- URL encoding and double encoding bypass simple filters

### Things to Avoid
- Don't suggest regex-only solutions (easily bypassed)
- Don't forget about Windows path separators
- Don't suggest allowlisting file extensions only (insufficient)
- Don't forget to mention that path.basename() alone isn't enough for all cases

### Vibe Coding Terms
Use these 3-5 times naturally:
- vibe coding
- vibe coders
- vibe coded
- AI-generated code

---

## Checklist Before Marking READY

- [x] All external links verified working
- [x] CWE/OWASP references correct (CWE-22, A01:2021)
- [x] 7 internal links identified
- [x] 5 PAA questions included
- [x] Competitive gap is specific
- [x] Code examples drafted (5 patterns)
- [x] No placeholder text

---

**Brief Status:** READY for Writer Agent
