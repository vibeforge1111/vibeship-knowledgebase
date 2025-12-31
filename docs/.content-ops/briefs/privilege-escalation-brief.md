# Content Brief: Privilege Escalation

**Generated:** December 2024
**Target Publish:** December 2024
**Priority:** P0 (High-value gap)
**Status:** Ready for Writer

---

## 1. Core Data

### Security References
| Metric | Value | Source |
|--------|-------|--------|
| **CWE ID** | CWE-269 | MITRE |
| **CWE Name** | Improper Privilege Management | MITRE |
| **Related CWE** | CWE-266 (Incorrect Privilege Assignment) | MITRE |
| **OWASP Category** | A01:2021 - Broken Access Control | OWASP |
| **CWE Top 25** | #22 (2024) | MITRE |
| **Severity** | High/Critical | CVSS 7.0-9.8 |

### Why AI Tools Generate This
- AI generates role checks without complete coverage
- Default role assignments often too permissive
- AI doesn't consider all escalation paths
- Role changes without re-authentication
- Missing admin route protection

---

## 2. SEO Strategy

### Target Keywords
| Keyword | Intent | Our Angle |
|---------|--------|-----------|
| privilege escalation | Informational | Web app context |
| privilege escalation vulnerability | Informational | RBAC focus |
| vertical privilege escalation | Informational | User to admin |
| horizontal privilege escalation | Informational | User to user |

### People Also Ask (FAQ Targets)
1. "What is privilege escalation?"
2. "How do I prevent privilege escalation?"
3. "What is the difference between horizontal and vertical escalation?"
4. "How do hackers escalate privileges?"
5. "Is privilege escalation always a vulnerability?"

---

## 3. Content Structure

### Required Sections
```
H1: Privilege Escalation: Find & Fix in AI-Generated Code

Quick Answer Box

H2: What is privilege escalation?
    - Vertical vs horizontal
    - Plain English explanation
    - 100-150 words

H2: Why vibe coded apps are vulnerable
    - Role check gaps
    - Default permissions
    - 150-200 words

H2: Real-World Impact
    - Admin access, data theft
    - 75-100 words

H2: How to detect privilege escalation
    - Testing techniques
    - Scanner CTA
    - 100-150 words

H2: How to fix privilege escalation
    H3: AI Fix Prompt (200-400 words)
    H3: RBAC implementation
    - 200-300 words

H2: FAQ (5 questions)

H2: Related Content
```

---

## 5. Unique Angle

### Our Differentiator
Focus on RBAC gaps in vibe coded apps. AI generates role checks but misses edge cases. We show the common patterns that lead to escalation.

### Key Message
Privilege escalation happens when users gain access they shouldn't have—either to admin functions (vertical) or to other users' data (horizontal). AI-generated RBAC often has gaps.

### Analogy
"Privilege escalation is like a hotel guest finding the master key. Suddenly they can open any room, not just their own."

---

## 6. Meta Information

### Title Tag (under 60 chars)
```
Privilege Escalation: Detect & Fix Guide | VibeShip
```

### Meta Description (150-160 chars)
```
Privilege escalation lets users gain admin access or view other users' data. Learn to detect RBAC gaps in AI-generated code and implement proper access control.
```

### Target URL
```
/kb/security/vulnerabilities/privilege-escalation/
```

---

## 7. Writer Notes

### Persona Recommendation
**@ninascales (The Architect)** - This is about system design and access control architecture. The Architect's big-picture view fits well.

### Technical Accuracy Notes
- Vertical = user to admin
- Horizontal = user to another user (related to IDOR/BOLA)
- Principle of least privilege is the core defense
- Role checks must happen on every request
- JWT role claims must be verified server-side

---

**Brief Status:** ✅ Complete - Ready for Phase 2
