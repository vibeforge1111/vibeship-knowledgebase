# Content Brief: File Inclusion (LFI/RFI)

**Generated:** December 2024
**Target Publish:** December 2024
**Priority:** P0 (High-value gap)
**Status:** Ready for Writer

---

## 1. Core Data

### Security References
| Metric | Value | Source |
|--------|-------|--------|
| **CWE ID** | CWE-98 (RFI), CWE-22 (Path Traversal) | MITRE |
| **CWE Name** | Improper Control of Filename for Include/Require | MITRE |
| **OWASP Category** | A03:2021 - Injection | OWASP |
| **CWE Top 25** | Path Traversal #8 (2024) | MITRE |
| **Severity** | Critical (RFI) / High (LFI) | CVSS 7.5-9.8 |

### Why AI Tools Generate This
- AI generates dynamic file includes based on user input
- Template loading from URL parameters
- Language/theme switchers with file paths
- AI copies include patterns without path validation

### Notable Incidents
- **PHP apps (common):** LFI to RCE via log poisoning
- **Joomla, WordPress plugins:** Multiple CVEs for file inclusion
- **TimThumb (2011):** Remote file inclusion in popular WP component

---

## 2. SEO Strategy

### Target Keywords
| Keyword | Intent | Our Angle |
|---------|--------|-----------|
| local file inclusion | Informational | Path traversal focus |
| LFI vulnerability | Informational | Plain English explanation |
| remote file inclusion | Informational | RFI vs LFI comparison |
| file inclusion fix | Transactional | Copy-paste validation |

### People Also Ask (FAQ Targets)
1. "What is local file inclusion?"
2. "How do I prevent file inclusion attacks?"
3. "What is the difference between LFI and RFI?"
4. "Can LFI lead to code execution?"
5. "How do I test for file inclusion vulnerabilities?"

---

## 3. Content Structure

### Required Sections
```
H1: File Inclusion (LFI/RFI): Find & Fix in AI-Generated Code

Quick Answer Box

H2: What is file inclusion?
    - LFI vs RFI explained
    - Path traversal basics
    - 100-150 words

H2: Why vibe coded apps are vulnerable
    - Dynamic template loading
    - Language switchers
    - 150-200 words

H2: Real-World Impact
    - Server compromise
    - 75-100 words

H2: How to detect file inclusion
    - Testing techniques
    - Path traversal payloads
    - Scanner CTA
    - 100-150 words

H2: How to fix file inclusion
    H3: AI Fix Prompt (200-400 words)
    H3: Allowlist approach
    - 200-300 words

H2: FAQ (5 questions)

H2: Related Content
```

---

## 5. Unique Angle

### Our Differentiator
Focus on modern JavaScript/Node.js patterns where LFI appears in template loading, dynamic imports, and configuration. Most content covers PHP—we cover the full stack.

### Key Message
File inclusion happens when user input controls which file gets loaded. Path traversal (../) lets attackers read /etc/passwd. Remote inclusion lets them load malicious code from their server.

### Analogy
"File inclusion is like letting someone tell you which book to read—but they say '../../../diary' and suddenly they're reading your private journal."

---

## 6. Meta Information

### Title Tag (under 60 chars)
```
File Inclusion (LFI/RFI): Detect & Fix | VibeShip
```

### Meta Description (150-160 chars)
```
File inclusion vulnerabilities let attackers read sensitive files or execute remote code. Learn to detect LFI/RFI in AI-generated code and fix with allowlists.
```

### Target URL
```
/kb/security/vulnerabilities/file-inclusion/
```

---

## 7. Writer Notes

### Persona Recommendation
**@danawhy (The Debugger)** - This vulnerability requires understanding file paths and how includes work. The Debugger's investigative style fits well.

### Technical Accuracy Notes
- LFI = Local File Inclusion (reading local files)
- RFI = Remote File Inclusion (loading remote code)
- Path traversal (../) is the main LFI technique
- Null byte injection (%00) used to truncate file extensions (older PHP)
- Allowlist of valid includes is the best fix
- Never use user input directly in file paths

---

**Brief Status:** ✅ Complete - Ready for Phase 2
