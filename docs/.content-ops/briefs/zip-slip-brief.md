# Content Brief: Zip Slip

**Generated:** December 2024
**Target Publish:** December 2024
**Priority:** P0 (High-value gap)
**Status:** Ready for Writer

---

## 1. Core Data

### Security References
| Metric | Value | Source |
|--------|-------|--------|
| **CWE ID** | CWE-22 | MITRE |
| **CWE Name** | Improper Limitation of a Pathname to a Restricted Directory | MITRE |
| **Related CVE** | Many library-specific CVEs | Various |
| **OWASP Category** | A01:2021 - Broken Access Control | OWASP |
| **Severity** | High-Critical | CVSS 7.5-9.8 |

### Why AI Tools Generate This
- AI uses archive libraries without path validation
- Extraction to user-specified directory without checks
- Trust in archive file structure
- No validation of entry names for traversal

---

## 2. SEO Strategy

### Target Keywords
| Keyword | Intent | Our Angle |
|---------|--------|-----------|
| zip slip vulnerability | Informational | Archive extraction attack |
| zip slip attack | Informational | Path traversal in archives |
| prevent zip slip | Transactional | Validation patterns |
| archive extraction security | Informational | Safe extraction |

### People Also Ask (FAQ Targets)
1. "What is Zip Slip?"
2. "How do I prevent Zip Slip attacks?"
3. "Which languages are vulnerable to Zip Slip?"
4. "Can Zip Slip lead to RCE?"
5. "How do I safely extract archives?"

---

## 6. Meta Information

### Title Tag (under 60 chars)
```
Zip Slip Vulnerability: Detect & Fix Guide | VibeShip
```

### Meta Description (150-160 chars)
```
Zip Slip lets attackers write files outside extraction directories via path traversal. Learn to detect and fix archive extraction vulnerabilities.
```

### Target URL
```
/kb/security/vulnerabilities/zip-slip/
```

---

## 7. Writer Notes

### Persona Recommendation
**@pager_duty (The Firefighter)** - Zip Slip can lead to RCE. The Firefighter's incident response mentality fits this critical vulnerability.

---

**Brief Status:** ✅ Complete - Ready for Phase 2

