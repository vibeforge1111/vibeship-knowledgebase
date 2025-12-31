# Content Brief: API Versioning Vulnerabilities

**Generated:** December 2024
**Priority:** P1
**Status:** Ready for Writer

## Core Data
- **CWE ID:** CWE-1059 (Insufficient Technical Documentation)
- **OWASP:** A05:2021 - Security Misconfiguration
- **Severity:** Medium-High (deprecated endpoint abuse)

## Why AI Generates This
- AI copies old API patterns without updating
- No deprecation strategy
- Old endpoints left running with old vulnerabilities
- Version negotiation flaws

## Persona: @ninascales (The Architect)
API versioning is an architectural concern - Architect's domain.

## Key Points
- Old API versions keep old vulnerabilities
- /api/v1 may bypass /api/v2 security
- Version headers can be manipulated
- Fix: sunset old versions, unified security layer

**Brief Status:** ✅ Complete
