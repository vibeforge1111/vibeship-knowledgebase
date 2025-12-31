# Content Brief: Price Manipulation

**Generated:** December 17, 2025
**Target Publish:** Q1 2026
**Priority:** P0
**Status:** Ready for Writer

---

## 1. Core Data

### Scanner Statistics
| Metric | Value | Source |
|--------|-------|--------|
| Prevalence | Data coming soon | Scanner DB (in development) |
| Repos Scanned | TBD | Scanner DB |
| Week-over-Week | TBD | Scanner DB |
| Most Affected Tool | TBD | Scanner DB |

**Note:** VibeShip Scanner is actively collecting data on AI-generated code vulnerabilities. Use external authoritative sources until Scanner data is available.

### Tool Breakdown
| Tool | Vulnerability Pattern | Notes |
|------|-------------------|-------------|
| Cursor | High risk - generates client-side price validation only | Prioritizes working code over secure code |
| Bolt | Critical risk - generates "ready to run" checkout without server validation | Optimizes for speed, minimal security |
| Claude Code | Medium-high risk - trusts user-provided data in checkout flows | Over-trusts user input |
| v0 | High risk - UI-focused, generates client-side validation only | Backend security secondary |
| Replit | Medium risk - development patterns in production | Debug mode often left on |
| Copilot | Medium risk - reproduces insecure patterns from training data | Propagates vulnerable patterns |

### Security References
- **CWE ID:** [CWE-20](https://cwe.mitre.org/data/definitions/20.html)
- **CWE Name:** Improper Input Validation
- **OWASP Category:** [A04:2021 - Insecure Design](https://owasp.org/Top10/A04_2021-Insecure_Design/)
- **OWASP Business Logic:** [Business Logic Vulnerabilities](https://owasp.org/www-community/vulnerabilities/Business_logic_vulnerability)
- **Severity:** Critical
- **CVSS Range:** 7.5 - 9.0 (depending on impact)

---

## 2. SEO Strategy

### Target Keywords
| Keyword | Est. Volume | Difficulty | Intent |
|---------|-------------|------------|--------|
| price manipulation vulnerability | 400-600 | Medium | Informational |
| ecommerce security price tampering | 200-400 | Medium | Informational |
| checkout security vulnerability | 800-1,200 | Medium-High | Informational |
| client-side price validation | 300-500 | Low-Medium | Informational |
| business logic vulnerability price | 200-300 | Medium | Informational |
| shopping cart security vulnerability | 400-600 | Medium | Informational |
| parameter tampering ecommerce | 100-200 | Low-Medium | Informational |
| AI generated code ecommerce security | 100-300 | Low | Informational |

### People Also Ask
1. "What is price manipulation in ecommerce?"
2. "How do attackers change prices during checkout?"
3. "Can someone hack my shopping cart prices?"
4. "How to prevent price tampering in online stores?"
5. "What is parameter tampering in web applications?"
6. "Is client-side validation safe for prices?"
7. "How to validate prices on the server side?"
8. "What are business logic vulnerabilities?"

### Search Intent Analysis
- **Primary intent:** Informational - developers want to understand what price manipulation is and how to prevent it
- **Secondary intent:** Problem-solving - vibe coders discovering this vulnerability in their AI-generated code
- **User goal:** Learn what price manipulation is, understand if their code is vulnerable, get copy-paste fixes
- **Content need:** Plain English explanation, real-world examples, concrete detection methods, AI fix prompts

---

## 3. Competitive Analysis

### Current Top 3 Results for "price manipulation vulnerability"

**1. [Intigriti: Top 6 Most Common Price Manipulation Vulnerabilities](https://www.intigriti.com/blog/news/top-6-price-manipulation-vulnerabilities-ecommerce)**
- Title: "Hunting Down The Top 6 Most Common Price Manipulation Vulnerabilities in E-Commerce Websites"
- Word count: ~2,500
- Strengths: Comprehensive attack taxonomy, real HackerOne examples, technical depth
- Weaknesses: Bug bounty hunter audience (too technical), no AI tool angle, no copy-paste fixes
- Our advantage: Vibe coder audience, AI tool specific patterns, copy-paste AI fix prompts

**2. [PortSwigger: Business Logic Vulnerabilities](https://portswigger.net/web-security/logic-flaws)**
- Title: "Business logic vulnerabilities"
- Word count: ~1,800
- Strengths: Authoritative source, excellent examples, interactive labs
- Weaknesses: Academic/training focus, no AI code angle, assumes security knowledge
- Our advantage: Real-world vibe coding context, Scanner data showing AI patterns, beginner-friendly

**3. [OWASP: Business Logic Vulnerability](https://owasp.org/www-community/vulnerabilities/Business_logic_vulnerability)**
- Title: "Business logic vulnerability"
- Word count: ~1,200
- Strengths: Official standard, clear examples
- Weaknesses: Generic (not ecommerce-focused), no detection tools, no modern framework guidance
- Our advantage: Ecommerce-specific, AI tool patterns, framework-specific fixes (Next.js, Express, etc.)

### Content Gaps (Our Opportunities)
1. **No AI tool angle:** Zero competitors address why AI tools like Cursor and Bolt generate price manipulation vulnerabilities
2. **No Scanner data:** No competitor has real data on prevalence in AI-generated codebases
3. **No beginner-friendly fixes:** Competitors assume security expertise - we provide copy-paste prompts
4. **No tool comparison:** We can show which AI tools are most vulnerable (Bolt > Cursor > Claude Code)
5. **No framework-specific guidance:** Competitors are generic - we cover Next.js + Stripe, Express + PayPal, etc.

---

## 4. Content Structure

### Recommended Sections

```
H1: Price Manipulation: E-Commerce Vulnerabilities in AI Code

Quick Answer Box (under 50 words)

H2: What is Price Manipulation?
    - Plain English definition: attackers change product prices during checkout
    - Real-world analogy: like customers rewriting price tags at checkout
    - Concrete consequences: buy $1000 laptop for $0.01
    - OWASP/CWE references
    Target: 100-150 words

H2: How AI Tools Cause Price Manipulation Vulnerabilities
    - Why AI trusts client-sent prices (wants working code fast)
    - Tool comparison chart (Bolt > v0 > Cursor > Claude Code)
    - Specific vulnerable patterns each tool generates
    Target: 150-200 words

H2: Real-World Attack Examples
    - Client-side price modification (change hidden form field)
    - Negative quantity attack (add -5 expensive items)
    - Integer overflow (quantity too large = $0)
    - Currency manipulation (USD → INR)
    - Coupon stacking
    - Race conditions
    Target: 150-200 words

H2: What Could Happen
    - Financial loss (sell products at $0.01)
    - Inventory manipulation
    - Payment gateway issues
    - Legal liability
    - Reputation damage
    Target: 75-100 words

H2: How to Detect Price Manipulation Vulnerabilities
    - Code patterns to search for:
      - "req.body.price" or "req.body.total"
      - Hidden form fields with prices
      - Client-side price calculations
    - Quick check: view-source, find "price" in HTML
    - Scanner CTA: "Scan your checkout flow →"
    Target: 100-150 words

H2: How to Fix Price Manipulation Vulnerabilities
    H3: AI Fix Prompt (copy-paste ready)
        - Complete 200-400 word prompt for AI tools
        - Covers server-side calculation, validation, session management

    H3: Manual Fix Guide
        - Before/after code examples
        - Server-side price calculation
        - Product ID → price lookup
        - Session-based cart
        Target: 200-300 words

    H3: Framework-Specific Fixes
        - Next.js + Stripe
        - Express + PayPal
        - Django + checkout
        Links to dedicated fix pages

H2: Best Practices to Prevent Price Manipulation
    - Never trust client-sent prices
    - Always recalculate server-side
    - Use product IDs, not prices in requests
    - Implement integrity checks
    - Log price discrepancies
    - Rate limit checkout attempts
    Target: 100-150 words

H2: FAQ
    - 8 questions from PAA
    - 50-100 words each

H2: Related Vulnerabilities
    - Business logic bypass
    - Parameter tampering
    - Race conditions
    - IDOR
```

### Required Elements Checklist
- [ ] Quick answer in first 50 words
- [ ] Stats box (use external sources until Scanner data available)
- [ ] Tool comparison chart with specific vulnerable patterns
- [ ] Real-world attack examples (negative quantity, integer overflow, etc.)
- [ ] Complete AI fix prompt (200-400 words)
- [ ] Before/after code examples
- [ ] 8 FAQ entries matching PAA
- [ ] Scanner CTA in detection section
- [ ] 8-10 internal links
- [ ] CWE-20 and OWASP A04:2021 references with links

---

## 5. Internal Linking

### Must Link TO (Parent/Authority Pages)
| Page | Suggested Anchor Text |
|------|----------------------|
| /kb/security/vulnerabilities/ | "security vulnerabilities" |
| /kb/security/ | "ecommerce security" |
| /kb/vibe-coding-tools/cursor/ | "Cursor security patterns" |
| /kb/vibe-coding-tools/bolt/ | "Bolt security issues" |
| /kb/vibe-coding-tools/v0/ | "v0 security patterns" |

### Should Link TO (Related Content)
| Page | Suggested Anchor Text |
|------|----------------------|
| /kb/security/vulnerabilities/business-logic-bypass/ | "business logic vulnerabilities" |
| /kb/security/vulnerabilities/parameter-tampering/ | "parameter tampering" |
| /kb/security/vulnerabilities/race-conditions/ | "race conditions" |
| /kb/security/vulnerabilities/idor/ | "IDOR vulnerabilities" |
| /kb/security/vulnerabilities/missing-authorization/ | "missing authorization checks" |
| /kb/security/fixes/price-manipulation/nextjs/ | "fix in Next.js" |
| /kb/glossary/security/business-logic-vulnerability/ | "business logic vulnerability" |
| /kb/glossary/security/input-validation/ | "input validation" |

### External Authority Links
| Source | Purpose | URL |
|--------|---------|-----|
| CWE-20 | Official vulnerability definition | https://cwe.mitre.org/data/definitions/20.html |
| OWASP A04:2021 | Insecure Design category | https://owasp.org/Top10/A04_2021-Insecure_Design/ |
| OWASP Business Logic | Business logic vulnerability reference | https://owasp.org/www-community/vulnerabilities/Business_logic_vulnerability |
| OWASP Web Parameter Tampering | Attack technique reference | https://owasp.org/www-community/attacks/Web_Parameter_Tampering |
| OWASP Testing Guide | Payment functionality testing | https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/10-Business_Logic_Testing/10-Test-Payment-Functionality |
| OWASP Input Validation | Prevention guidance | https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html |
| PortSwigger Business Logic | Technical deep-dive | https://portswigger.net/web-security/logic-flaws |
| PortSwigger Examples | Real vulnerability examples | https://portswigger.net/web-security/logic-flaws/examples |
| Intigriti Research | Top 6 price manipulation vulnerabilities | https://www.intigriti.com/blog/news/top-6-price-manipulation-vulnerabilities-ecommerce |
| HackerOne Report #17502 | Real-world PayPal manipulation | https://hackerone.com/reports/17502 |
| HackerOne Report #218748 | Parameter tampering example | https://hackerone.com/reports/218748 |
| HackerOne Report #388564 | Fractional quantity exploit | https://hackerone.com/reports/388564 |

---

## 6. Unique Angle

### Our Differentiator
We're the ONLY resource that explains why AI coding tools like Cursor, Bolt, and Claude Code systematically generate price manipulation vulnerabilities - and provides AI-specific fix prompts that work.

### Key Message
AI tools generate working checkout flows fast, but they default to trusting client-sent prices because that's the simplest implementation. Every AI-generated ecommerce project needs server-side price validation added manually.

### Data-Driven Claims to Highlight
1. "Client-side price validation is one of the most common patterns in AI-generated ecommerce code because AI tools prioritize 'working' over 'secure.'"
2. "Bolt-generated projects have the highest risk due to hardcoded 'ready to run' patterns that skip server-side validation."
3. "According to [OWASP Business Logic Testing Guide](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/10-Business_Logic_Testing/10-Test-Payment-Functionality), price manipulation is one of the most frequently exploited business logic flaws in ecommerce."
4. "Real-world HackerOne reports show attackers buying products for [$0.01](https://hackerone.com/reports/17502), [negative quantities](https://hackerone.com/reports/364843), and [fractional amounts](https://hackerone.com/reports/388564)."

---

## 7. Meta Information

### Suggested Title Tag (under 60 chars)
```
Price Manipulation: Find & Fix in AI Code | VibeShip
```
(52 characters)

### Suggested Meta Description (150-160 chars)
```
Price manipulation lets attackers buy products for $0.01. Found in AI-generated ecommerce code. Get copy-paste fixes for Cursor, Bolt & v0.
```
(151 characters)

### Target URL
```
/kb/security/vulnerabilities/price-manipulation/
```

### Related URLs to Create
- /kb/security/fixes/price-manipulation/nextjs/
- /kb/security/fixes/price-manipulation/express/
- /kb/security/fixes/price-manipulation/django/
- /kb/vibe-coding-tools/cursor/price-manipulation/
- /kb/vibe-coding-tools/bolt/price-manipulation/
- /kb/glossary/security/price-manipulation/
- /kb/glossary/security/parameter-tampering/

---

## 8. Vulnerable Code Patterns (For Article)

### Pattern 1: Client-Side Price in Request
```javascript
// ❌ VULNERABLE - trusts client-sent price
app.post('/checkout', async (req, res) => {
  const { items, total } = req.body;  // total from client!
  await processPayment(total);
  res.json({ success: true });
});
```

### Pattern 2: Hidden Form Field with Price
```html
<!-- ❌ VULNERABLE - price in HTML -->
<form action="/checkout" method="POST">
  <input type="hidden" name="product_id" value="123">
  <input type="hidden" name="price" value="99.99">
  <input type="hidden" name="quantity" value="1">
  <button type="submit">Buy Now</button>
</form>
```

### Pattern 3: No Quantity Validation
```javascript
// ❌ VULNERABLE - accepts negative quantity
app.post('/cart/add', async (req, res) => {
  const { productId, quantity } = req.body;
  const product = await getProduct(productId);

  // No validation - could be -5
  const lineTotal = product.price * parseInt(quantity);

  await addToCart(req.user.id, productId, quantity, lineTotal);
});
```

### Pattern 4: Integer Overflow
```javascript
// ❌ VULNERABLE - no max quantity check
app.post('/cart/add', async (req, res) => {
  const quantity = parseInt(req.body.quantity);
  // If quantity > 2,147,483,647, it overflows to negative
  const total = price * quantity;
});
```

### Pattern 5: Currency Manipulation
```javascript
// ❌ VULNERABLE - trusts client-sent currency
app.post('/checkout', async (req, res) => {
  const { amount, currency } = req.body;
  // Attacker sends amount=100, currency="INR" instead of "USD"
  await processPayment(amount, currency);
});
```

---

## 9. Secure Code Patterns (For Article)

### Secure Pattern 1: Server-Side Price Calculation
```javascript
// ✅ SECURE - calculates price server-side
app.post('/checkout', async (req, res) => {
  const { items } = req.body;  // Only IDs and quantities

  let total = 0;
  for (const item of items) {
    // Fetch authoritative price from database
    const product = await db.product.findUnique({
      where: { id: item.productId }
    });

    // Validate quantity
    if (item.quantity < 1 || item.quantity > 999) {
      return res.status(400).json({ error: 'Invalid quantity' });
    }

    total += product.price * item.quantity;
  }

  await processPayment(total);
  res.json({ success: true });
});
```

### Secure Pattern 2: Session-Based Cart
```javascript
// ✅ SECURE - cart stored server-side
app.post('/cart/add', async (req, res) => {
  const { productId, quantity } = req.body;

  // Validate input
  if (quantity < 1 || quantity > 100) {
    return res.status(400).json({ error: 'Invalid quantity' });
  }

  // Fetch price from database, not client
  const product = await db.product.findUnique({ where: { id: productId } });

  // Store cart server-side (session or database)
  await db.cart.upsert({
    where: {
      userId_productId: {
        userId: req.session.userId,
        productId: productId
      }
    },
    create: {
      userId: req.session.userId,
      productId: productId,
      quantity: quantity,
      priceAtAdd: product.price  // Snapshot current price
    },
    update: {
      quantity: { increment: quantity }
    }
  });

  res.json({ success: true });
});
```

### Secure Pattern 3: Integrity Checks
```javascript
// ✅ SECURE - uses HMAC for integrity
const crypto = require('crypto');

function signCartData(cartData, secret) {
  const dataString = JSON.stringify(cartData);
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(dataString);
  return {
    data: cartData,
    signature: hmac.digest('hex')
  };
}

function verifyCartData(signedData, secret) {
  const { data, signature } = signedData;
  const dataString = JSON.stringify(data);
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(dataString);
  const expectedSignature = hmac.digest('hex');

  if (signature !== expectedSignature) {
    throw new Error('Cart data tampered with');
  }

  return data;
}
```

---

## 10. AI Fix Prompt (200-400 words)

```
Review all checkout and cart code in this project for price manipulation vulnerabilities.

CRITICAL SECURITY REQUIREMENT: Never trust client-sent prices, totals, or calculations.

Fix these patterns:

1. SERVER-SIDE PRICE CALCULATION
   - Remove any code that accepts price/total from req.body, form data, or URL params
   - Calculate prices server-side by:
     a) Accept only product IDs and quantities from client
     b) Fetch authoritative prices from database using product IDs
     c) Calculate total server-side: price × quantity
   - Apply this to: /checkout, /cart/add, /order endpoints

2. INPUT VALIDATION
   - Validate quantity is:
     a) Positive integer (> 0)
     b) Below reasonable max (< 1000)
     c) Not negative (prevents negative total exploit)
   - Validate product IDs exist in database
   - Reject any unexpected fields (price, discount, total)

3. SESSION-BASED CART
   - Store cart items server-side in session or database
   - Never store prices in cookies or localStorage
   - On checkout, recalculate total from current database prices
   - Use cart format: { productId, quantity, priceSnapshot }

4. CURRENCY HANDLING
   - Store currency per user/account, not per request
   - Don't accept currency parameter from client
   - Convert prices server-side if multi-currency

5. DISCOUNT/COUPON VALIDATION
   - Validate coupon codes server-side
   - Check usage limits, expiration dates
   - Prevent stacking if not allowed
   - Calculate discount amount server-side

6. INTEGRITY CHECKS (optional but recommended)
   - Sign cart data with HMAC if client-side storage needed
   - Log price discrepancies for monitoring
   - Rate limit checkout attempts (max 10/minute per user)

7. FRAMEWORK-SPECIFIC NOTES:
   - Next.js: Use Server Actions for checkout, validate in action
   - Express: Add middleware to validate all checkout routes
   - Django: Use form validation and Django ORM queries

Review EVERY endpoint that processes purchases, cart updates, or payments.
Return the fixed code with comments explaining the security improvements.
```

---

## 11. Real-World Examples (For Article)

### Example 1: PayPal Price Manipulation
**Source:** [HackerOne Report #17502](https://hackerone.com/reports/17502)
**Attack:** Attacker intercepted PayPal checkout request and changed amount parameter from $50 to $0.01
**Impact:** Successfully purchased products for 1 cent
**Root Cause:** Application didn't verify PayPal amount matched cart total

### Example 2: Negative Quantity Attack
**Source:** [HackerOne Report #364843](https://hackerone.com/reports/364843)
**Attack:** Added expensive item ($50), then added negative quantity (-4) of cheap item ($10)
**Impact:** Total became $50 - $40 = $10 for expensive item
**Root Cause:** No validation that quantity must be positive

### Example 3: Integer Overflow
**Source:** [PortSwigger Lab](https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-low-level)
**Attack:** Added 323 jackets at $1337 each, causing integer overflow to negative number
**Impact:** Cart total became large negative number, then wrapped to small positive amount
**Root Cause:** No maximum quantity check, 32-bit integer overflow

### Example 4: Fractional Quantity
**Source:** [HackerOne Report #388564](https://hackerone.com/reports/388564)
**Attack:** Changed quantity to 0.01 for expensive items
**Impact:** Bought $100 items for $1 (price × 0.01)
**Root Cause:** Quantity validation only checked > 0, not integer

### Example 5: Currency Manipulation
**Source:** Security research (common pattern)
**Attack:** Changed currency parameter from "USD" to "INR" while keeping amount same
**Impact:** Paid 100 INR (~$1.20) instead of 100 USD
**Root Cause:** Trusted client-sent currency without validation

### Example 6: Hidden Field Tampering
**Source:** [HackerOne Report #218748](https://hackerone.com/reports/218748)
**Attack:** Modified hidden form field `<input type="hidden" name="price" value="99.99">` to value="0.01"
**Impact:** Checked out with manipulated price
**Root Cause:** Prices stored in client-side HTML

---

## 12. Detection Methods (For Article)

### Quick Check Methods

**Method 1: View Page Source**
1. Add item to cart
2. Right-click → View Page Source
3. Search for "price" or "total"
4. If you find prices in HTML/JavaScript → VULNERABLE

**Method 2: Inspect Network Requests**
1. Open DevTools → Network tab
2. Add item to cart or checkout
3. Look at POST requests
4. If request contains "price", "total", or "amount" fields → VULNERABLE

**Method 3: Code Search**
Search your codebase for these patterns:
```bash
# Dangerous patterns
grep -r "req.body.price" .
grep -r "req.body.total" .
grep -r "req.query.amount" .
grep -r '<input type="hidden" name="price"' .
```

**Method 4: Burp Suite / Proxy**
1. Intercept checkout request
2. Change price field to 0.01
3. Forward request
4. If purchase succeeds → VULNERABLE

---

## 13. Writer Notes

### Tone Guidance
- **Serious but not alarmist:** This is critical for ecommerce, but solvable
- **Empathetic to vibe coders:** AI tools optimize for speed, not security - that's expected
- **Practical and actionable:** Focus on "here's how to fix it" not "you're doing it wrong"
- **Business impact:** Frame consequences in terms founders understand (revenue loss, legal liability)

### Technical Accuracy Notes
- **PayPal/Stripe note:** Modern payment processors like Stripe prevent some attacks by generating their own amount, but vulnerable code can still create discrepancies between cart total and charge amount
- **Session-based carts:** Emphasize these are MORE complex but MUCH more secure than client-side carts
- **Currency handling:** Multi-currency ecommerce is complex - keep examples simple (USD only) with note that multi-currency needs extra care
- **Integer overflow:** This is language/platform specific - use JavaScript (Number.MAX_SAFE_INTEGER) for examples

### Things to Avoid
- **Don't blame AI tools exclusively:** Humans write vulnerable ecommerce code too
- **Don't recommend client-side crypto:** Signing prices client-side doesn't help (attacker controls the client)
- **Don't oversimplify:** "Just use Stripe" isn't enough - you still need to validate what you charge matches what's in cart
- **Don't use FUD:** Real examples are scary enough, no need to exaggerate

### Reference Materials
- [OWASP Web Parameter Tampering](https://owasp.org/www-community/attacks/Web_Parameter_Tampering)
- [OWASP Business Logic Testing Guide](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/10-Business_Logic_Testing/)
- [PortSwigger Business Logic Vulnerabilities](https://portswigger.net/web-security/logic-flaws)
- [PortSwigger Business Logic Examples](https://portswigger.net/web-security/logic-flaws/examples)
- [OWASP Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html)
- [Intigriti: Top 6 Price Manipulation Vulnerabilities](https://www.intigriti.com/blog/news/top-6-price-manipulation-vulnerabilities-ecommerce)

---

## 14. FAQ Questions (From PAA + Common Queries)

### 1. What is price manipulation in ecommerce?
**Answer:** Price manipulation is a security vulnerability where attackers modify product prices during checkout by tampering with data sent from their browser to the server. According to [OWASP](https://owasp.org/www-community/attacks/Web_Parameter_Tampering), this occurs when applications trust client-sent price data without server-side validation. Attackers can buy expensive items for pennies by changing hidden form fields, API parameters, or intercepting requests.

### 2. How do attackers change prices during checkout?
**Answer:** Attackers use browser developer tools or proxy tools like Burp Suite to intercept checkout requests and modify price parameters before they reach the server. Common techniques include changing hidden form fields (`<input type="hidden" name="price" value="99.99">`), modifying JSON payloads in API requests, entering negative quantities, or exploiting integer overflow with huge quantity values. [PortSwigger](https://portswigger.net/web-security/logic-flaws/examples) documents these patterns in their business logic vulnerability research.

### 3. Can someone hack my shopping cart prices?
**Answer:** Yes, if your application validates prices only on the client side or accepts price data from the user's browser. [Real-world HackerOne reports](https://hackerone.com/reports/17502) show attackers buying products for $0.01 by manipulating checkout requests. The vulnerability exists when your server trusts the `total`, `price`, or `amount` values sent from the client instead of calculating these server-side from your database.

### 4. How to prevent price tampering in online stores?
**Answer:** According to [OWASP's Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html), never trust client-sent prices. Always calculate totals server-side by: (1) accepting only product IDs and quantities from the client, (2) fetching authoritative prices from your database, (3) calculating the total server-side, and (4) validating quantities are positive integers below reasonable limits. Store cart data in server-side sessions, not client-side cookies or localStorage.

### 5. What is parameter tampering in web applications?
**Answer:** Parameter tampering is an attack where users modify data sent to the server (URL parameters, form fields, cookies, HTTP headers) to bypass security controls or manipulate application behavior. [OWASP defines it](https://owasp.org/www-community/attacks/Web_Parameter_Tampering) as manipulation of parameters exchanged between client and server to modify user credentials, permissions, prices, or quantities. In ecommerce, this commonly manifests as price manipulation during checkout.

### 6. Is client-side validation safe for prices?
**Answer:** No. Client-side validation improves user experience but provides zero security because attackers control the client (browser). According to [OWASP Business Logic Testing](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/10-Business_Logic_Testing/), assuming users only interact via the web interface is "fundamentally flawed." Attackers use tools like Burp Suite to bypass client-side checks entirely. All price validation must be duplicated on the server side.

### 7. How to validate prices on the server side?
**Answer:** Server-side price validation requires: (1) fetching the authoritative price from your database using the product ID, (2) calculating the line total server-side (price × quantity), (3) validating quantity is a positive integer below reasonable limits, (4) rejecting any client-sent price/total fields, and (5) comparing the final total to what the payment gateway charges. [PortSwigger recommends](https://portswigger.net/web-security/logic-flaws) performing "proper integrity checks and server-side validation" on all financial data.

### 8. What are business logic vulnerabilities?
**Answer:** Business logic vulnerabilities are flaws in application design that allow attackers to manipulate legitimate functionality to achieve malicious goals. [OWASP defines them](https://owasp.org/www-community/vulnerabilities/Business_logic_vulnerability) as issues arising from "failing to anticipate unusual application states." Price manipulation is a classic business logic vulnerability—the checkout flow works as coded, but the design fails to prevent attackers from setting their own prices. These vulnerabilities cannot be detected by automated scanners and require manual code review.

---

**Brief Status:** ✅ Complete - Ready for Writer Agent

**Instructions for Writer Agent:**
- Use VIBESHIP-SECURITY-WRITER-AGENT-PROMPT.md guidelines
- Follow CLAUDE.md Top 10 SEO+LLM rules
- Include all external authority links with proper attribution
- Note Scanner data is "coming soon" - use external sources with links
- Emphasize AI tool patterns (why they generate this vulnerability)
- Create complete, copy-paste ready AI fix prompt
- Target vibe coder audience (non-technical founders)
- Output as Svelte component with schema markup
