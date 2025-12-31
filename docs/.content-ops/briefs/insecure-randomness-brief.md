# Content Brief: Insecure Randomness

**Generated:** December 2024
**Priority:** P1
**Status:** Ready for Writer

## Core Data
- **CWE ID:** CWE-330 (Use of Insufficiently Random Values)
- **OWASP:** A02:2021 - Cryptographic Failures
- **Severity:** High (token prediction, session hijacking)

## Why AI Generates This
- AI uses Math.random() for everything
- Doesn't understand crypto vs pseudo-random
- Token generation without proper entropy
- Seeds with predictable values (timestamps)

## Persona: @tryhard_tk (The Tinkerer)
Deep-dive into PRNG internals and entropy - fits Tinkerer's curiosity.

## Key Points
- Math.random() is NOT cryptographically secure
- Predictable tokens = account takeover
- Time-based seeds are predictable
- Fix: crypto.randomBytes(), crypto.getRandomValues()

**Brief Status:** ✅ Complete
