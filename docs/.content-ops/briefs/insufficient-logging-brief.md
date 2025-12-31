# Content Brief: Insufficient Logging & Monitoring

**Generated:** December 2024
**Priority:** P1
**Status:** Ready for Writer

## Core Data
- **CWE ID:** CWE-778 (Insufficient Logging)
- **OWASP:** A09:2021 - Security Logging and Monitoring Failures
- **Severity:** Medium (enables undetected attacks)

## Why AI Generates This
- AI focuses on features, not operational security
- Logging seen as "boring" infrastructure
- No consideration for incident response needs
- Sensitive data logged without thought

## Persona: @flaggedthis (The Auditor)
Logging gaps are exactly what auditors find - fits perfectly.

## Key Points
- Attackers have ~200 days undetected on average
- Missing: auth failures, privilege changes, input validation failures
- Over-logging: PII, tokens, passwords in logs
- Fix: structured logging, log aggregation, alerting

**Brief Status:** ✅ Complete
