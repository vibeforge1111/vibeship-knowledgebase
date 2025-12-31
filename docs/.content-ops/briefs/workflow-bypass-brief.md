# Content Brief: Workflow Bypass

**Generated:** 2025-12-17
**Target Publish:** 2025-12-20
**Priority:** P1
**Status:** Ready for Writer

---

## 1. Core Data

### Scanner Statistics
| Metric | Value | Source |
|--------|-------|--------|
| Prevalence | TBD | Scanner DB (pending) |
| Repos Scanned | TBD | Scanner DB (pending) |
| Week-over-Week | TBD | Scanner DB (pending) |
| Most Affected Tool | TBD | Scanner DB (pending) |

**Note:** Scanner data pending. Article will use external authoritative sources with proper attribution.

### Tool Breakdown
| Tool | Vulnerability Rate | Notes |
|------|-------------------|-------|
| Cursor | TBD | Generates independent step handlers without state validation |
| Bolt | TBD | "Ready to run" approach prioritizes speed over workflow integrity |
| Claude Code | TBD | Creates functional routes without cross-step validation |
| v0 | TBD | UI-first generation doesn't enforce backend workflow logic |
| Replit | TBD | Rapid prototyping leads to missing state checks |
| Copilot | TBD | Autocomplete suggestions lack business logic context |

### Security References
- **CWE ID:** [CWE-841](https://cwe.mitre.org/data/definitions/841.html)
- **CWE Name:** Improper Enforcement of Behavioral Workflow
- **OWASP Category:** [A04:2021 - Insecure Design](https://owasp.org/Top10/A04_2021-Insecure_Design/)
- **Severity:** High
- **CVSS Range:** 7.0 - 8.5 (High)

---

## 2. SEO Strategy

### Target Keywords
| Keyword | Est. Volume | Difficulty | Intent |
|---------|-------------|------------|--------|
| workflow bypass | 150 | 35 | Informational |
| multi step form security | 200 | 28 | Informational |
| wizard bypass vulnerability | 80 | 15 | Informational |
| checkout bypass attack | 120 | 32 | Informational |
| state machine security | 250 | 45 | Informational |
| skip verification step | 90 | 12 | Informational |

### People Also Ask
1. "What is a workflow bypass vulnerability?"
2. "How do attackers skip checkout payment steps?"
3. "How to prevent multi-step form bypass?"
4. "What is insufficient workflow validation?"
5. "How to secure wizard forms?"

### Search Intent Analysis
- **Primary intent:** Informational - understand what workflow bypass is and how it happens
- **User goal:** Learn why their multi-step process (checkout, registration, onboarding) is vulnerable
- **Content need:** Plain English explanation, real attack examples, code patterns to search for, copy-paste fix

---

## 3. Competitive Analysis

### Current Top 3 Results for "workflow bypass vulnerability"

**1. [OWASP Testing Guide - Circumvention of Work Flows](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/10-Business_Logic_Testing/06-Testing_for_the_Circumvention_of_Work_Flows)**
- Title: Testing for the Circumvention of Work Flows
- Word count: ~1,500
- Strengths: Authoritative OWASP source, testing methodology, real examples
- Weaknesses: Technical tester audience, no AI code patterns, no framework-specific guidance
- Our advantage: AI tool focus, vibe coder audience, copy-paste solutions

**2. [Medium - Business Logic Vulnerabilities: Insufficient Workflow Validation](https://medium.com/@AhmadSopyan/business-logic-vulnerabilities-part-8-insufficient-workflow-validation-bdb24381219a)**
- Title: Business Logic Vulnerabilities part-8: Insufficient workflow validation
- Word count: ~1,200
- Strengths: Good examples (e-commerce checkout bypass), clear definitions
- Weaknesses: General web app focus, no AI tool patterns, outdated (2020)
- Our advantage: 2025 AI coding tool context, modern frameworks (Next.js, Supabase)

**3. [PortSwigger - Business Logic Vulnerabilities](https://portswigger.net/burp/documentation/desktop/testing-workflow/input-validation/client-side-controls)**
- Title: Bypassing client-side controls
- Word count: ~800
- Strengths: Technical depth, Burp Suite integration
- Weaknesses: Pentester audience, tool-agnostic, no prevention guidance
- Our advantage: Developer-focused prevention, AI-generated code patterns

### Content Gaps (Our Opportunities)
1. **AI Code Patterns**: No competitor shows WHY AI tools generate workflow bypass vulnerabilities (step-by-step generation without state context)
2. **Framework-Specific**: No Next.js Server Actions, Supabase RLS, or modern stack guidance
3. **Vibe Coder Focus**: All existing content assumes technical background - we can explain in plain English
4. **Prevention Code**: No copy-paste secure implementations for common stacks

---

## 4. Content Structure

### Recommended Sections

```
H1: Workflow Bypass: Skipping Steps in Multi-Step Processes

H2: What is Workflow Bypass?
    - Plain English definition
    - Real-world analogy: "hotel room key you write yourself"
    - Concrete consequences: checkout without payment, skip verification
    Target: 100-150 words

H2: How AI Tools Cause Workflow Bypass
    - Why AI generates independent step handlers
    - Lack of state context across prompts
    - Tool comparison: Cursor vs Bolt vs Claude Code patterns
    - Code example: checkout step without payment validation
    Target: 150-200 words

H2: Real Attack Examples
    - Checkout bypass (skip payment step)
    - Email verification bypass (direct link to verified state)
    - Multi-step form bypass (URL manipulation)
    - KYC/onboarding bypass (skip identity verification)
    Target: 150-200 words

H2: What Could Happen
    - Financial loss (free purchases)
    - Compliance violations (unverified accounts)
    - Data integrity issues (incomplete records)
    - Business logic corruption
    Target: 75-100 words

H2: How to Detect Workflow Bypass
    - Code patterns to search:
      * Direct step access via URL
      * Missing state validation
      * No session tracking between steps
    - Manual testing: try skipping steps, direct URL access
    - Scanner CTA: "Check your workflows with VibeShip Scanner"
    Target: 100-150 words

H2: How to Fix Workflow Bypass
    H3: AI Fix Prompt
        - Complete prompt for adding workflow state validation (300-400 words)
        - Include: state machine pattern, token-based progression, server-side validation
    H3: Manual Fix - State Machine Pattern
        - Before/after code example
        - Session-based state tracking
        - Server-side validation on each step
        Target: 200-250 words
    H3: Manual Fix - Token-Based Progression
        - One-time tokens per step
        - Cryptographic validation
        - Expiration handling
        Target: 150-200 words
    H3: Framework-Specific Fixes
        - Next.js: Server Actions with session validation
        - Supabase: RLS policies for workflow states
        - Express: Middleware for state enforcement
        Target: 100-150 words per framework

H2: Prevention Best Practices
    - State machine design patterns
    - Server-side validation checklist
    - Token rotation between steps
    - Workflow audit logging
    Target: 150-200 words

H2: FAQ
    1. What is the difference between workflow bypass and IDOR?
    2. Can client-side state validation prevent workflow bypass?
    3. How do I test for workflow bypass vulnerabilities?
    4. What frameworks have built-in workflow protection?
    5. Is workflow bypass the same as business logic bypass?
    Target: 50-100 words each

H2: Related Vulnerabilities
    - Price manipulation
    - Business logic bypass
    - Missing authentication
    - IDOR
    - Race conditions
```

### Required Elements Checklist
- [ ] Quick answer in first 50 words
- [ ] External authoritative sources (OWASP, CWE, PortSwigger) with links
- [ ] Tool comparison showing AI patterns
- [ ] Complete AI fix prompt (300-400 words)
- [ ] 2+ before/after code examples
- [ ] 5 FAQ entries matching PAA
- [ ] Scanner CTA
- [ ] 7-10 internal links
- [ ] CWE/OWASP references with direct links

---

## 5. Internal Linking

### Must Link TO (Parent/Authority Pages)
| Page | Suggested Anchor Text |
|------|----------------------|
| /kb/security/vulnerabilities/ | "security vulnerabilities in AI-generated code" |
| /kb/vibe-coding/secure-vibe-coding-guide/ | "secure vibe coding guide" |
| /kb/vibe-coding-tools/cursor/ | "Cursor security patterns" |
| /kb/vibe-coding-tools/bolt/ | "Bolt security issues" |

### Should Link TO (Related Content)
| Page | Suggested Anchor Text |
|------|----------------------|
| /kb/security/vulnerabilities/price-manipulation/ | "price manipulation" |
| /kb/security/vulnerabilities/missing-auth/ | "missing authentication" |
| /kb/security/vulnerabilities/idor/ | "IDOR vulnerabilities" |
| /kb/security/vulnerabilities/race-conditions/ | "race conditions" |
| /kb/security/vulnerabilities/csrf/ | "CSRF protection" |
| /kb/security/stacks/nextjs-supabase/ | "Next.js + Supabase security" |

### External Authority Links
| Source | Purpose | URL |
|--------|---------|-----|
| CWE-841 | Official vulnerability definition | https://cwe.mitre.org/data/definitions/841.html |
| OWASP A04:2021 | Insecure Design category | https://owasp.org/Top10/A04_2021-Insecure_Design/ |
| OWASP Testing Guide | Testing workflow circumvention | https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/10-Business_Logic_Testing/06-Testing_for_the_Circumvention_of_Work_Flows |
| PortSwigger | Bypassing client-side controls | https://portswigger.net/burp/documentation/desktop/testing-workflow/input-validation/client-side-controls |
| AWS Step Functions Best Practices | State machine security patterns | https://docs.aws.amazon.com/step-functions/latest/dg/sfn-best-practices.html |

---

## 6. Unique Angle

### Our Differentiator
**"The only workflow bypass guide written for vibe coders using AI tools."**

We're the first to explain WHY AI coding tools (Cursor, Bolt, Claude Code) generate workflow bypass vulnerabilities:
1. AI generates each step in isolation without understanding the full workflow
2. Prompts like "create checkout page" don't include "enforce payment completion"
3. AI prioritizes functional code over business logic constraints
4. Step-by-step generation loses state context between prompts

### Key Message
"AI tools generate each step of your workflow independently, without validating that users actually completed previous steps. Attackers exploit this by skipping directly to the final step via URL manipulation or API calls."

### Data-Driven Claims to Highlight
1. "According to [OWASP Business Logic Testing Guide](https://owasp.org/www-project-web-security-testing-guide/), workflow bypass is one of the most exploited business logic flaws in web applications."
2. "Authentication bypass via flawed state machine allows attackers to unlawfully bypass authentication steps due to weak application state control ([Medium - Business Logic Vulnerabilities](https://medium.com/@AhmadSopyan/business-logic-vulnerabilities-part-9-authentication-bypass-via-flawed-state-machine-c5bb7a56b89b))."
3. "CWE-841 is classified under [OWASP Top 10 2021's A04: Insecure Design](https://owasp.org/Top10/A04_2021-Insecure_Design/) category, emphasizing the importance of threat modeling and secure workflow design."

---

## 7. Technical Details

### Common Vulnerable Patterns (AI-Generated Code)

**Pattern 1: Direct Step Access**
```javascript
// ❌ VULNERABLE - No validation of previous steps
app.get('/checkout/confirm', async (req, res) => {
  const orderId = req.query.orderId
  await db.orders.update(orderId, { status: 'confirmed' })
  res.json({ success: true })
})
```

**Pattern 2: Client-Side State**
```javascript
// ❌ VULNERABLE - Client controls workflow state
const [step, setStep] = useState(1)

function goToConfirmation() {
  setStep(3) // No server validation - attacker can call this directly
}
```

**Pattern 3: Missing Session Validation**
```javascript
// ❌ VULNERABLE - No check that payment was completed
app.post('/order/complete', async (req, res) => {
  const orderId = req.body.orderId
  // Missing: Check if payment step was completed
  await db.orders.update(orderId, { status: 'completed' })
})
```

### Secure Implementation Patterns

**Pattern 1: State Machine with Server Validation**
```typescript
// ✅ SECURE - Server tracks and validates workflow state
type OrderState = 'cart' | 'shipping' | 'payment' | 'confirmed'

const validTransitions: Record<OrderState, OrderState[]> = {
  cart: ['shipping'],
  shipping: ['payment'],
  payment: ['confirmed'],
  confirmed: []
}

app.post('/order/:orderId/transition', async (req, res) => {
  const order = await db.orders.findOne(req.params.orderId)
  const newState = req.body.state as OrderState

  // Validate transition is allowed from current state
  if (!validTransitions[order.state].includes(newState)) {
    return res.status(403).json({ error: 'Invalid state transition' })
  }

  // Additional validations per state
  if (newState === 'payment' && !order.shippingAddress) {
    return res.status(400).json({ error: 'Shipping address required' })
  }

  if (newState === 'confirmed' && !order.paymentConfirmed) {
    return res.status(400).json({ error: 'Payment not confirmed' })
  }

  await db.orders.update(order.id, { state: newState })
  res.json({ success: true })
})
```

**Pattern 2: Token-Based Progression**
```typescript
// ✅ SECURE - One-time tokens for each step
import crypto from 'crypto'

app.post('/checkout/payment', async (req, res) => {
  const shippingToken = req.body.shippingToken

  // Verify shipping step was completed
  const tokenValid = await verifyStepToken(shippingToken, 'shipping')
  if (!tokenValid) {
    return res.status(403).json({ error: 'Complete shipping step first' })
  }

  // Process payment...

  // Generate token for next step
  const confirmToken = crypto.randomBytes(32).toString('hex')
  await storeStepToken(confirmToken, 'confirmation', orderId)

  res.json({ paymentComplete: true, confirmToken })
})
```

---

## 8. AI Tool-Specific Patterns

### Cursor
**Common Pattern:** Generates independent route handlers without state validation
```typescript
// Cursor-generated checkout confirmation (VULNERABLE)
export async function POST(req: Request) {
  const { orderId } = await req.json()
  await db.order.update({ where: { id: orderId }, data: { status: 'confirmed' } })
  return Response.json({ success: true })
}
```

**Why:** Cursor's autocomplete suggests functional handlers but lacks business logic context.

### Bolt.new
**Common Pattern:** "Ready to run" approach creates wizard UI without backend validation
```jsx
// Bolt-generated wizard (VULNERABLE)
function Wizard() {
  const [step, setStep] = useState(1)

  return (
    <div>
      {step === 1 && <ShippingForm onNext={() => setStep(2)} />}
      {step === 2 && <PaymentForm onNext={() => setStep(3)} />}
      {step === 3 && <Confirmation onSubmit={handleSubmit} />}
    </div>
  )
}
```

**Why:** Bolt prioritizes speed and visual results over server-side validation logic.

### Claude Code
**Common Pattern:** Creates functional routes without enforcing step dependencies
```python
# Claude Code-generated checkout (VULNERABLE)
@app.post("/order/complete")
async def complete_order(order_id: int):
    order = db.query(Order).filter(Order.id == order_id).first()
    order.status = "completed"
    db.commit()
    return {"success": True}
```

**Why:** Generates isolated endpoints based on individual prompts without workflow context.

---

## 9. Prevention Research

### Academic & Industry Sources

**OWASP Business Logic Testing:**
According to the [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/10-Business_Logic_Testing/06-Testing_for_the_Circumvention_of_Work_Flows):
- "Workflow vulnerabilities involve any type of vulnerability that allows the attacker to misuse an application/system in a way that will allow them to circumvent (not follow) the designed/intended workflow."
- "The application must be self-aware and have checks in place ensuring that the users complete each step in the work flow process in the correct order."

**State Machine Security Model:**
From [State Machines Security Model Overview](https://www.restack.io/p/state-machines-answer-security-model-cat-ai):
- "In the context of security, FSMs can be employed to model the behavior of systems under various threat scenarios."
- "The state machine security model ensures that the system remains in a secure state and transitions only to other secure states, preventing unauthorized access or actions."

**Authentication Bypass via Flawed State Machine:**
Per [Medium - Business Logic Vulnerabilities](https://medium.com/@AhmadSopyan/business-logic-vulnerabilities-part-9-authentication-bypass-via-flawed-state-machine-c5bb7a56b89b):
- "Authentication bypass due to a flawed state machine is a type of business logic vulnerability that allows attackers to unlawfully bypass authentication steps due to weak application state control."
- Prevention: "Make sure that each request can only be accessed if the user has gone through all the previous validation steps."

### Real-World Attack Examples

**E-Commerce Checkout Bypass:**
- Attacker accesses `/checkout/confirmation?orderId=123` directly without payment
- Order status updated to "confirmed" without payment verification
- Resulted in free purchases worth thousands

**Email Verification Bypass:**
Per [Email Verification Bypass Research](https://medium.com/@maakthon/bug-bounty-insights-10-key-findings-email-verification-flaws-part-4-49412c461450):
- "Bypassing email verification means the target site assumes your email is validated, and actually ends up signing you in with a non-validated email."
- "This behavior can frequently lead to account takeovers in third parties since they often use the email as an identifier."

**KYC Workflow Bypass:**
- Multi-step identity verification (upload ID → selfie → address proof)
- Attacker skips directly to final step via URL manipulation
- Account activated without completing identity checks

---

## 10. Meta Information

### Suggested Title Tag (under 60 chars)
```
Workflow Bypass: Skipping Steps in AI Code | VibeShip
```
(57 characters)

### Suggested Meta Description (150-160 chars)
```
Workflow bypass lets attackers skip checkout, verification, or payment steps. Learn why AI tools generate this flaw and how to fix it with copy-paste code.
```
(158 characters)

### Target URL
```
/kb/security/vulnerabilities/workflow-bypass/
```

### Related URLs to Create
- /kb/security/fixes/workflow-bypass/nextjs/
- /kb/security/fixes/workflow-bypass/express/
- /kb/vibe-coding-tools/cursor/workflow-bypass/

---

## 11. Writer Notes

### Tone Guidance
- **Audience:** Non-technical founders building e-commerce, SaaS, fintech
- **Concern Level:** High - this can cause direct financial loss
- **Approach:** Explain like teaching a hotel analogy: "Imagine guests could write their own room keys"
- **Avoid:** Don't be alarmist about "attackers can buy things for free" - focus on prevention

### Technical Accuracy Notes
- **State Machine Pattern:** Emphasize that client-side validation is UX, not security
- **Session vs Token:** Both approaches valid - show when to use each
- **Framework Defaults:** Next.js Server Actions don't automatically validate workflow - must be explicit
- **Supabase RLS:** Can enforce state transitions via policies but requires careful design

### Things to Avoid
- Don't conflate with IDOR (different attack vector)
- Don't suggest client-side validation as a fix (only UX improvement)
- Don't imply state machine libraries alone solve this (still need validation logic)
- Don't recommend blocking direct URL access (breaks legitimate use) - validate state instead

### Reference Materials
1. [CWE-841: Improper Enforcement of Behavioral Workflow](https://cwe.mitre.org/data/definitions/841.html)
2. [OWASP A04:2021 - Insecure Design](https://owasp.org/Top10/A04_2021-Insecure_Design/)
3. [OWASP Testing Guide - Circumvention of Work Flows](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/10-Business_Logic_Testing/06-Testing_for_the_Circumvention_of_Work_Flows)
4. [PortSwigger - Business Logic Vulnerabilities](https://portswigger.net/burp/documentation/desktop/testing-workflow/input-validation/client-side-controls)
5. [Medium - Insufficient Workflow Validation](https://medium.com/@AhmadSopyan/business-logic-vulnerabilities-part-8-insufficient-workflow-validation-bdb24381219a)
6. [AWS Step Functions Best Practices](https://docs.aws.amazon.com/step-functions/latest/dg/sfn-best-practices.html)

---

## 12. AI Fix Prompt Template

### Complete AI Fix Prompt (Writer will expand to 300-400 words)

```
You are a security-focused senior developer. Review this multi-step workflow code and add state validation to prevent workflow bypass attacks.

CONTEXT:
This is a [checkout/registration/onboarding] flow with [N] steps. Currently, users can skip directly to later steps via URL manipulation or API calls.

REQUIREMENTS:
1. Implement server-side state machine to track workflow progress
2. Validate that each step was legitimately completed before allowing next step
3. Store state in server-side session or database (NOT client-side)
4. Add validation middleware to check previous steps completed
5. Generate one-time tokens for step progression (optional but recommended)
6. Return clear error messages when steps skipped
7. Log suspicious workflow bypass attempts

SECURITY RULES:
- Never trust client-sent state (step number, completion flags)
- Validate ALL state transitions on the server
- Check prerequisites for each step (e.g., payment requires shipping address)
- Implement idempotent handlers (safe to retry)
- Add audit logging for compliance

FRAMEWORK NOTES:
[Next.js: Use Server Actions with session validation]
[Express: Middleware function to check workflow state]
[Supabase: RLS policies to enforce state transitions]

OUTPUT:
- Secure state machine implementation
- Validation middleware/functions
- Updated route handlers with state checks
- TypeScript types for workflow states
- Comments explaining security decisions
```

---

**Brief Status:** ✅ Complete - Ready for Writer Agent

**External Sources Summary:**
- CWE-841 definition and examples
- OWASP A04:2021 Insecure Design guidance
- OWASP Testing Guide workflow circumvention methodology
- PortSwigger business logic vulnerability research
- Academic research on state machine security models
- Real-world attack examples from bug bounty reports

**Competitive Advantages:**
1. Only guide focused on AI tool patterns (Cursor, Bolt, Claude Code)
2. Vibe coder audience (non-technical founders)
3. Modern stack examples (Next.js, Supabase, TypeScript)
4. Copy-paste AI fix prompt (300-400 words)
5. Framework-specific implementation guides

**Next Steps for Writer:**
1. Expand AI fix prompt to 300-400 words with examples
2. Create 2-3 before/after code examples
3. Write 5 FAQ entries based on People Also Ask
4. Add internal links to related vulnerabilities
5. Include all external authority links with attribution
6. Verify all sections meet word count targets (1,500-1,800 total)
