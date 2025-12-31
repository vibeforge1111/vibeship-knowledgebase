# Content Brief: Mass Assignment (Deep Dive)

**Generated:** December 2024
**Priority:** P1
**Status:** Ready for Writer

## Core Data
- **CWE ID:** CWE-915 (Improperly Controlled Modification of Dynamically-Determined Object Attributes)
- **OWASP:** A01:2021 - Broken Access Control
- **Severity:** Critical (privilege escalation)

## Why AI Generates This
- AI spreads objects directly: { ...req.body }
- Uses Object.assign without filtering
- ORMs auto-map all fields
- No distinction between user/admin fields

## Persona: @pager_duty (The Firefighter)
Mass assignment causes production incidents - Firefighter energy.

## Key Points
- { isAdmin: true } in request body = instant escalation
- Affects all frameworks with auto-binding
- Hidden fields still vulnerable
- Fix: explicit allowlists, DTOs, field-level permissions

**Brief Status:** ✅ Complete
