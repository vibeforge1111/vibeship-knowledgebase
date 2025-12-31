# Content Brief: CSV/Formula Injection

**Generated:** December 2024
**Target Publish:** December 2024
**Priority:** P0 (High-value gap)
**Status:** Ready for Writer

---

## 1. Core Data

### Security References
| Metric | Value | Source |
|--------|-------|--------|
| **CWE ID** | CWE-1236 | MITRE |
| **CWE Name** | Improper Neutralization of Formula Elements in a CSV File | MITRE |
| **OWASP Category** | A03:2021 - Injection | OWASP |
| **Severity** | Medium-High | CVSS 6.0-7.5 |

### Why AI Tools Generate This
- AI exports data without sanitizing for spreadsheet formulas
- User input directly written to CSV
- No awareness of Excel/Sheets formula execution
- Export features treated as "just data"

---

## 2. SEO Strategy

### Target Keywords
| Keyword | Intent | Our Angle |
|---------|--------|-----------|
| csv injection | Informational | Formula attack explained |
| formula injection | Informational | Excel/Sheets exploitation |
| csv injection prevention | Transactional | Sanitization patterns |
| excel formula injection | Informational | Specific application |

### People Also Ask (FAQ Targets)
1. "What is CSV injection?"
2. "How do I prevent formula injection in exports?"
3. "What characters trigger formula injection?"
4. "Can CSV injection lead to RCE?"
5. "How do I safely export user data to CSV?"

---

## 3. Content Structure

### Required Sections
```
H1: CSV/Formula Injection: Find & Fix in AI-Generated Code

Quick Answer Box

H2: What is CSV injection?
    - Formula execution in spreadsheets
    - Dangerous characters
    - 100-150 words

H2: Why vibe coded apps are vulnerable
    - Export features without sanitization
    - 150-200 words

H2: Real-World Impact
    - Data theft, RCE via DDE
    - 75-100 words

H2: How to detect CSV injection
    - Testing techniques
    - Scanner CTA
    - 100-150 words

H2: How to fix CSV injection
    H3: AI Fix Prompt (200-400 words)
    H3: Sanitization patterns
    - 200-300 words

H2: FAQ (5 questions)

H2: Related Content
```

---

## 5. Unique Angle

### Our Differentiator
CSV export is common in vibe coded dashboards. AI generates the export but forgets that spreadsheet apps execute formulas.

### Key Message
When users export data to CSV and open it in Excel/Sheets, formulas execute. If user-controlled data starts with =, +, -, @, it becomes code.

### Analogy
"CSV injection is like embedding executable code in a text file. It looks like data, but when opened in Excel, it runs."

---

## 6. Meta Information

### Title Tag (under 60 chars)
```
CSV Injection: Detect & Fix Guide | VibeShip
```

### Meta Description (150-160 chars)
```
CSV injection lets attackers embed formulas in exports that execute when opened in Excel. Learn to detect and sanitize user data in CSV exports.
```

### Target URL
```
/kb/security/vulnerabilities/csv-injection/
```

---

## 7. Writer Notes

### Persona Recommendation
**@keystrokecounts (The Optimizer)** - Export features are about efficiency. The Optimizer's focus on clean, efficient solutions fits sanitization patterns.

### Technical Accuracy Notes
- Dangerous prefixes: =, +, -, @, tab, carriage return
- DDE attacks can achieve RCE on Windows
- Prefix with single quote or tab+quote to escape
- Also affects Google Sheets, LibreOffice
- Consider JSON export as alternative

---

**Brief Status:** ✅ Complete - Ready for Phase 2

