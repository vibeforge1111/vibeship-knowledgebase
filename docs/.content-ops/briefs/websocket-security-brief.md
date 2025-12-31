# Content Brief: WebSocket Security

**Generated:** December 2024
**Target Publish:** December 2024
**Priority:** P0 (High-value gap)
**Status:** Ready for Writer

---

## 1. Core Data

### Security References
| Metric | Value | Source |
|--------|-------|--------|
| **CWE ID** | CWE-1385 | MITRE |
| **CWE Name** | Missing Origin Validation in WebSockets | MITRE |
| **Related CWE** | CWE-346 (Origin Validation Error) | MITRE |
| **OWASP Category** | A01:2021 - Broken Access Control | OWASP |
| **OWASP Testing** | WSTG-CLNT-10 | OWASP WSTG |
| **Severity** | High | CVSS 7.0-8.5 |

### Why AI Tools Generate This
- AI copies WebSocket patterns without authentication
- Origin header not validated on connection
- No authentication check on upgrade request
- Message-level authorization skipped
- Cross-Site WebSocket Hijacking (CSWSH) not considered

---

## 2. SEO Strategy

### Target Keywords
| Keyword | Intent | Our Angle |
|---------|--------|-----------|
| websocket security | Informational | Auth + origin validation |
| websocket vulnerabilities | Informational | CSWSH focus |
| secure websocket implementation | Transactional | Copy-paste patterns |
| websocket authentication | Informational | Token validation |

### People Also Ask (FAQ Targets)
1. "How do I secure WebSocket connections?"
2. "What is Cross-Site WebSocket Hijacking?"
3. "Should WebSockets have authentication?"
4. "How do I validate WebSocket origin?"
5. "Are WebSockets vulnerable to XSS?"

---

## 3. Content Structure

### Required Sections
```
H1: WebSocket Security: Find & Fix in AI-Generated Code

Quick Answer Box

H2: What are WebSocket vulnerabilities?
    - CSWSH explained
    - Missing auth on upgrade
    - 100-150 words

H2: Why vibe coded apps are vulnerable
    - No origin validation
    - Auth at connection only
    - 150-200 words

H2: Real-World Impact
    - Hijacked connections, data theft
    - 75-100 words

H2: How to detect WebSocket issues
    - Testing techniques
    - Scanner CTA
    - 100-150 words

H2: How to fix WebSocket security
    H3: AI Fix Prompt (200-400 words)
    H3: Secure implementation
    - 200-300 words

H2: FAQ (5 questions)

H2: Related Content
```

---

## 5. Unique Angle

### Our Differentiator
WebSockets bypass normal browser protections. AI generates the upgrade but forgets authentication. We show the complete secure pattern.

### Key Message
WebSockets are persistent connections that bypass traditional request/response security. Without origin validation and message-level auth, attackers can hijack connections.

### Analogy
"WebSockets are like leaving a phone line open. Anyone who knows the number can listen in—unless you verify who's on the other end for every message."

---

## 6. Meta Information

### Title Tag (under 60 chars)
```
WebSocket Security: Detect & Fix Guide | VibeShip
```

### Meta Description (150-160 chars)
```
WebSocket vulnerabilities let attackers hijack connections and steal data. Learn to detect CSWSH and implement secure WebSocket authentication patterns.
```

### Target URL
```
/kb/security/vulnerabilities/websocket-security/
```

---

## 7. Writer Notes

### Persona Recommendation
**@flaggedthis (The Auditor)** - WebSocket security is about checking what's often overlooked. The Auditor's methodical approach to finding gaps fits perfectly.

### Technical Accuracy Notes
- WebSocket upgrade bypasses normal HTTP headers/cookies context
- Origin header must be validated server-side
- Authentication needed on upgrade AND per-message
- CSWSH is WebSocket equivalent of CSRF
- wss:// encrypts but doesn't authenticate

---

**Brief Status:** ✅ Complete - Ready for Phase 2

