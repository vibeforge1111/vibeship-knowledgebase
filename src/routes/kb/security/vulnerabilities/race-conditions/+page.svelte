<script lang="ts">
  import { onMount } from 'svelte';

  let showFixPrompt = $state(false);
  let copySuccess = $state(false);

  const aiFixPrompt = `Review my codebase for Race Condition vulnerabilities (CWE-362):

## Check 1: Check-Then-Act Patterns
Search for patterns where validation precedes modification:
- if (condition) { ...await update... }
- Finding a record, checking a value, then updating
- Balance/inventory/limit checks before modifications
- Coupon/discount validation before applying

Flag: Any gap between validation and state change

## Check 2: Non-Atomic Operations
Look for read-modify-write patterns:
- const value = await Model.findById(id)
- value.field += 1 (or -= 1)
- await value.save()

Flag: Any increment/decrement that isn't atomic ($inc, increment, etc.)

## Check 3: Missing Transactions
For operations that must be atomic:
- Are they wrapped in database transactions?
- Do they use atomic update operators ($inc, increment)?
- Is optimistic locking (version field) implemented?
- Is pessimistic locking (SELECT FOR UPDATE) used?

## Check 4: Rate Limiting Implementation
If rate limiting exists:
- Is the counter updated atomically?
- Can concurrent requests bypass the limit?
- Is Redis INCR or atomic database operation used?

## Check 5: Resource Reservation
For booking/reservation systems:
- Is availability checked and updated atomically?
- Can two users book the same resource simultaneously?
- Are unique constraints enforced at database level?

## Secure Patterns to Apply

For balance/inventory operations:
\`\`\`javascript
// Atomic decrement with condition
const result = await User.updateOne(
  { _id: id, balance: { $gte: amount } },
  { $inc: { balance: -amount } }
)
if (result.modifiedCount === 0) throw new Error('Insufficient')
\`\`\`

For unique operations (coupon redemption):
\`\`\`javascript
// Use unique constraint - let database enforce
try {
  await Redemption.create({ couponCode, userId })
} catch (e) {
  if (e.code === 11000) throw new Error('Already redeemed')
}
\`\`\`

For multi-step operations:
\`\`\`javascript
// Wrap in transaction
await prisma.$transaction(async (tx) => {
  const item = await tx.item.findUnique({ where: { id } })
  if (item.quantity < 1) throw new Error('Out of stock')
  await tx.item.update({
    where: { id },
    data: { quantity: { decrement: 1 } }
  })
  await tx.order.create({ data: { itemId: id, userId } })
})
\`\`\`

For PostgreSQL pessimistic locking:
\`\`\`sql
BEGIN;
SELECT * FROM items WHERE id = $1 FOR UPDATE;
UPDATE items SET quantity = quantity - 1 WHERE id = $1;
COMMIT;
\`\`\`

For each vulnerability found:
1. Identify the race window (gap between check and use)
2. Explain the attack scenario (e.g., 10 simultaneous requests)
3. Show how concurrent requests could exploit it
4. Provide atomic replacement pattern`;

  function copyPrompt() {
    navigator.clipboard.writeText(aiFixPrompt);
    copySuccess = true;
    setTimeout(() => copySuccess = false, 2000);
  }

  // Schema.org structured data
  onMount(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      "headline": "Race Conditions: How Async Code Creates Security Holes AI Misses",
      "description": "Race conditions let attackers exploit timing gaps in async code to bypass limits, duplicate transactions, or escalate privileges. Learn secure patterns for Node.js and Python async code.",
      "author": {
        "@type": "Organization",
        "name": "VibeShip"
      },
      "publisher": {
        "@type": "Organization",
        "name": "VibeShip",
        "url": "https://vibeship.co"
      },
      "datePublished": "2024-12-17",
      "dateModified": "2024-12-17",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://vibeship.co/kb/security/vulnerabilities/race-conditions/"
      }
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a race condition vulnerability?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A race condition vulnerability occurs when two or more operations access shared data concurrently, and the final result depends on timing. In web applications, this means attackers can send multiple requests simultaneously to exploit the gap between checking a condition and acting on it. For example, redeeming a gift card 10 times by clicking simultaneously in 10 browser tabs."
          }
        },
        {
          "@type": "Question",
          "name": "How do attackers exploit race conditions?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Attackers send multiple requests simultaneously to hit the vulnerable window before state updates. Tools like Burp Suite's Turbo Intruder can send hundreds of requests in parallel. The single-packet attack technique bundles multiple HTTP requests into one TCP packet, ensuring they arrive at the same instant. Common targets: gift card redemption, discount codes, rate limits, and balance transfers."
          }
        },
        {
          "@type": "Question",
          "name": "How do I prevent race conditions in Node.js?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Use database transactions and atomic operations. With Prisma: prisma.$transaction(). With MongoDB: use $inc operator and conditions in queries. For critical operations, use database-level unique constraints to prevent duplicates. Never separate check from update - combine them into single atomic operations like UPDATE WHERE balance >= amount."
          }
        },
        {
          "@type": "Question",
          "name": "What is TOCTOU?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "TOCTOU (Time-of-check Time-of-use) is a specific type of race condition (CWE-367) where a resource is checked and then used, but changes between those two steps. Example: checking if a file exists, then reading it - an attacker could swap the file between check and read. In web apps, this happens when validating data in one query and using it in another."
          }
        },
        {
          "@type": "Question",
          "name": "Are race conditions hard to detect?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, race conditions are notoriously difficult to detect because they depend on timing and may not appear in normal testing. Single-user testing almost never reveals them. You need concurrent load testing or specialized tools. Code review patterns to look for: check-then-act sequences, non-atomic increments, and any gap between reading and writing shared state."
          }
        }
      ]
    };

    const scriptTag = document.createElement('script');
    scriptTag.type = 'application/ld+json';
    scriptTag.text = JSON.stringify(schema);
    document.head.appendChild(scriptTag);

    const faqScriptTag = document.createElement('script');
    faqScriptTag.type = 'application/ld+json';
    faqScriptTag.text = JSON.stringify(faqSchema);
    document.head.appendChild(faqScriptTag);
  });
</script>

<svelte:head>
  <title>Race Conditions: How Async Code Creates Security Holes AI Misses | VibeShip</title>
  <meta name="description" content="Race conditions let attackers exploit timing gaps in async code to bypass limits, duplicate transactions, or escalate privileges. Learn secure patterns for Node.js and Python async code." />
  <meta name="keywords" content="race condition, TOCTOU, CWE-362, async security, concurrency vulnerability, vibe coding security" />
  <link rel="canonical" href="https://vibeship.co/kb/security/vulnerabilities/race-conditions/" />
</svelte:head>

<nav aria-label="Breadcrumb" class="breadcrumb">
  <a href="/">Home</a>
  <span>/</span>
  <a href="/kb">Knowledge Base</a>
  <span>/</span>
  <a href="/kb/security">Security</a>
  <span>/</span>
  <a href="/kb/security/vulnerabilities">Vulnerabilities</a>
  <span>/</span>
  <span aria-current="page">Race Conditions</span>
</nav>

<article class="vulnerability-article">
  <header class="article-header">
    <div class="severity-badge high">High Severity</div>
    <h1>Race Conditions: How Async Code Creates Security Holes AI Misses</h1>
    <p class="subtitle">Timing attacks that let attackers bypass limits and duplicate transactions</p>
  </header>

  <div class="quick-answer">
    <strong>Race conditions let attackers exploit timing gaps between checking a condition and acting on it.</strong>
    Send 10 requests simultaneously to redeem a gift card 10 times. AI generates async code without proper locking, making this common in vibe coded apps.
    Fix: use database transactions and atomic operations.
    Classified as <a href="https://cwe.mitre.org/data/definitions/362.html">CWE-362</a>.
  </div>

  <div class="stats-box">
    <div class="stat">
      <span class="stat-value">CWE-362</span>
      <span class="stat-label">Classification</span>
    </div>
    <div class="stat">
      <span class="stat-value">High</span>
      <span class="stat-label">Severity</span>
    </div>
    <div class="stat">
      <span class="stat-value">100+</span>
      <span class="stat-label">CVEs Per Year</span>
    </div>
    <div class="stat">
      <span class="stat-value">Hard</span>
      <span class="stat-label">Detection Difficulty</span>
    </div>
  </div>

  <nav class="toc">
    <h2>Contents</h2>
    <ul>
      <li><a href="#what-is-race">What is a Race Condition?</a></li>
      <li><a href="#attack-examples">Real-World Attack Examples</a></li>
      <li><a href="#why-ai-misses">Why AI Tools Generate Vulnerable Code</a></li>
      <li><a href="#vulnerable-patterns">Vulnerable Code Patterns</a></li>
      <li><a href="#secure-patterns">Secure Patterns</a></li>
      <li><a href="#testing">Testing for Race Conditions</a></li>
      <li><a href="#ai-fix-prompt">AI Fix Prompt</a></li>
      <li><a href="#faq">FAQ</a></li>
    </ul>
  </nav>

  <section id="what-is-race">
    <h2>What is a Race Condition?</h2>

    <p>A race condition occurs when two or more operations access shared resources concurrently, and the final result depends on timing. In web applications, this creates security vulnerabilities when attackers can exploit the gap between checking a condition and acting on it - known as the CHECK-USE gap.</p>

    <p>Think of it like two people trying to book the last airline seat simultaneously. Both see "1 seat available," both click "Book," and both succeed - even though only one seat exists. In code, this manifests when you check a value (is balance sufficient?), then act on it (deduct balance) - but another request slips in between.</p>

    <div class="attack-diagram">
      <pre><code>Normal single-user flow:
1. CHECK: Is coupon valid? → Yes
2. USE: Apply discount
3. UPDATE: Mark coupon as used

Race condition attack (two simultaneous requests):
Request A: CHECK (valid) → USE → UPDATE
Request B: CHECK (still valid!) → USE → UPDATE
                    ↑
              Gap exploited - coupon used twice</code></pre>
    </div>

    <p>Race conditions fall under <a href="https://owasp.org/Top10/A04_2021-Insecure_Design/">OWASP A04:2021 Insecure Design</a>. A specific variant called TOCTOU (Time-of-check Time-of-use), documented as <a href="https://cwe.mitre.org/data/definitions/367.html">CWE-367</a>, is particularly common in file operations and web applications.</p>
  </section>

  <section id="attack-examples">
    <h2>Real-World Attack Examples</h2>

    <p>Race conditions enable financial fraud, privilege escalation, and security bypass. These attacks are effective because the vulnerability only appears under concurrent load - normal testing misses them entirely.</p>

    <h3>Gift Card Double Redemption</h3>
    <div class="attack-scenario">
      <ol>
        <li>Attacker has a $100 gift card code</li>
        <li>Opens 10 browser tabs to the redemption page</li>
        <li>Clicks "Redeem" simultaneously in all 10 tabs</li>
        <li>All 10 requests pass the "is valid" check before any marks it used</li>
        <li>Result: $100 gift card redeemed 10 times = $1,000 store credit</li>
      </ol>
    </div>

    <h3>Rate Limit Bypass</h3>
    <div class="attack-scenario">
      <ol>
        <li>API allows 5 login attempts per minute</li>
        <li>Attacker sends 100 login requests simultaneously</li>
        <li>All requests hit the server before the rate counter updates</li>
        <li>100 password guesses processed instead of 5</li>
        <li>This enables brute-force attacks on <a href="/kb/security/vulnerabilities/broken-access-control/">access control</a></li>
      </ol>
    </div>

    <h3>Account Takeover via Email Change</h3>
    <div class="attack-scenario">
      <ol>
        <li>Request A: Change email to victim@target.com</li>
        <li>Request B: Change email to attacker@evil.com</li>
        <li>Race condition: confirmation token for victim sent to attacker</li>
        <li>Attacker confirms victim's email, takes over account</li>
        <li>This pattern appeared in GitLab's Devise implementation</li>
      </ol>
    </div>

    <h3>Notable CVEs</h3>
    <div class="cve-list">
      <div class="cve-item">
        <h4>CVE-2024-50379 - Apache Tomcat RCE</h4>
        <p>TOCTOU race condition allowing remote code execution via file handling.</p>
      </div>
      <div class="cve-item">
        <h4>CVE-2025-68146 - Python filelock</h4>
        <p>Symlink attack via TOCTOU race condition in file locking library.</p>
      </div>
      <div class="cve-item">
        <h4>CVE-2021-0920 - Android Kernel</h4>
        <p>Use-after-free via race condition, actively exploited in the wild.</p>
      </div>
    </div>
  </section>

  <section id="why-ai-misses">
    <h2>Why AI Tools Generate Vulnerable Code</h2>

    <p>AI coding tools like <a href="/kb/vibe-coding-tools/cursor/">Cursor</a> and <a href="/kb/vibe-coding-tools/claude-code/">Claude Code</a> generate async code that works perfectly for single users but breaks under concurrent load. The issue: AI focuses on functional correctness without considering concurrent access patterns.</p>

    <p>When vibe coders ask for "redeem coupon functionality," AI generates this:</p>

    <div class="code-comparison">
      <div class="code-vulnerable">
        <h4>AI-Generated (Vulnerable)</h4>
        <pre><code class="language-javascript">// "Redeem coupon" - AI's typical output
app.post('/redeem', async (req, res) => {"{"}
  const coupon = await Coupon.findOne({"{"}
    code: req.body.code
  {"}"})

  if (!coupon || coupon.used) {"{"}
    return res.status(400).json({"{"}
      error: 'Invalid coupon'
    {"}"})
  {"}"}

  // RACE WINDOW: Another request passes
  // the check above while we're here

  await applyDiscount(req.user, coupon.discount)
  coupon.used = true
  await coupon.save()

  res.json({"{"} success: true {"}"})
{"}"})</code></pre>
      </div>
      <div class="code-secure">
        <h4>Secure Pattern</h4>
        <pre><code class="language-javascript">// Atomic operation with database transaction
app.post('/redeem', async (req, res) => {"{"}
  const result = await db.transaction(async (tx) => {"{"}
    // Atomic check-and-update in one query
    const coupon = await tx.coupon.update({"{"}
      where: {"{"}
        code: req.body.code,
        used: false  // Condition in the update
      {"}"},
      data: {"{"} used: true {"}"}
    {"}"})

    if (!coupon) {"{"}
      throw new Error('Invalid or already used')
    {"}"}

    await tx.discount.create({"{"}
      data: {"{"}
        userId: req.user.id,
        amount: coupon.discount
      {"}"}
    {"}"})

    return coupon
  {"}"})

  res.json({"{"} success: true {"}"})
{"}"})</code></pre>
      </div>
    </div>

    <h3>Why This Happens</h3>
    <ul>
      <li><strong>Training data:</strong> Most code samples are single-user scenarios</li>
      <li><strong>await creates gaps:</strong> Every await point is a potential race window</li>
      <li><strong>No concurrency model:</strong> AI doesn't think about parallel requests</li>
      <li><strong>"It works" testing:</strong> Single-user tests always pass</li>
    </ul>

    <p>The fundamental issue: AI separates CHECK from USE. The fix is to combine them into a single atomic operation.</p>
  </section>

  <section id="vulnerable-patterns">
    <h2>Vulnerable Code Patterns</h2>

    <p>These patterns appear frequently in vibe coded applications. Each creates a race window that attackers can exploit with concurrent requests.</p>

    <h3>Pattern 1: Check-Then-Act</h3>
    <p>The most common pattern. Validation and update are separate operations:</p>

    <div class="code-block">
      <pre><code class="language-javascript">// VULNERABLE: Gap between check and update
async function withdrawFunds(userId, amount) {"{"}
  const user = await User.findById(userId)

  if (user.balance >= amount) {"{"}  // CHECK
    // Race window - another request passes check here
    user.balance -= amount          // USE
    await user.save()
  {"}"}
{"}"}</code></pre>
    </div>

    <h3>Pattern 2: Non-Atomic Increment/Decrement</h3>
    <p>Read-modify-write without atomic operators:</p>

    <div class="code-block">
      <pre><code class="language-javascript">// VULNERABLE: Read-modify-write race
async function incrementCounter(counterId) {"{"}
  const counter = await Counter.findById(counterId)
  counter.value += 1  // Another request may have incremented
  await counter.save()  // This overwrites the other increment
{"}"}</code></pre>
    </div>

    <h3>Pattern 3: Separate Check and Creation</h3>
    <p>Checking for existence before creating:</p>

    <div class="code-block">
      <pre><code class="language-javascript">// VULNERABLE: Check-then-create race
async function createUniqueResource(name) {"{"}
  const exists = await Resource.findOne({"{"} name {"}"})

  if (exists) {"{"}
    throw new Error('Already exists')
  {"}"}

  // Race window - another request creates it here
  await Resource.create({"{"} name {"}"})  // Duplicate created
{"}"}</code></pre>
    </div>

    <h3>Pattern 4: Rate Limiting Check</h3>
    <p>Checking rate limit before incrementing counter:</p>

    <div class="code-block">
      <pre><code class="language-javascript">// VULNERABLE: Rate limit bypass
async function checkRateLimit(userId) {"{"}
  const requests = await getRequestCount(userId)

  if (requests >= 5) {"{"}
    throw new Error('Rate limited')
  {"}"}

  // 100 concurrent requests all pass here
  await incrementRequestCount(userId)
{"}"}</code></pre>
    </div>
  </section>

  <section id="secure-patterns">
    <h2>Secure Patterns</h2>

    <p>The solution is always the same principle: eliminate the gap between check and use. Here are concrete patterns for common scenarios.</p>

    <h3>Fix 1: Database Transactions</h3>
    <p>Wrap related operations in a transaction. With <a href="https://www.prisma.io/docs/concepts/components/prisma-client/transactions">Prisma</a>:</p>

    <div class="code-block">
      <pre><code class="language-javascript">// SECURE: Atomic transaction
async function withdrawFunds(userId, amount) {"{"}
  await prisma.$transaction(async (tx) => {"{"}
    const user = await tx.user.findUnique({"{"}
      where: {"{"} id: userId {"}"}
    {"}"})

    if (user.balance < amount) {"{"}
      throw new Error('Insufficient balance')
    {"}"}

    // Both operations atomic within transaction
    await tx.user.update({"{"}
      where: {"{"} id: userId {"}"},
      data: {"{"} balance: {"{"} decrement: amount {"}"} {"}"}
    {"}"})

    await tx.transaction.create({"{"}
      data: {"{"} userId, amount, type: 'withdrawal' {"}"}
    {"}"})
  {"}"})
{"}"}</code></pre>
    </div>

    <h3>Fix 2: Atomic Update with Condition</h3>
    <p>Combine check and update into single query. With <a href="https://www.mongodb.com/docs/manual/core/write-operations-atomicity/">MongoDB</a>:</p>

    <div class="code-block">
      <pre><code class="language-javascript">// SECURE: Single atomic operation
async function withdrawFunds(userId, amount) {"{"}
  const result = await User.updateOne(
    {"{"}
      _id: userId,
      balance: {"{"} $gte: amount {"}"}  // Condition in query
    {"}"},
    {"{"}
      $inc: {"{"} balance: -amount {"}"}  // Atomic decrement
    {"}"}
  )

  if (result.modifiedCount === 0) {"{"}
    throw new Error('Insufficient balance or user not found')
  {"}"}
{"}"}</code></pre>
    </div>

    <h3>Fix 3: Database Unique Constraints</h3>
    <p>Let the database enforce uniqueness - don't check in application code:</p>

    <div class="code-block">
      <pre><code class="language-javascript">// SECURE: Database enforces uniqueness
async function redeemCoupon(code, userId) {"{"}
  try {"{"}
    // Unique constraint on (couponCode, userId) or just couponCode
    await Redemption.create({"{"}
      couponCode: code,
      userId
    {"}"})
  {"}"} catch (error) {"{"}
    if (error.code === 11000) {"{"} // MongoDB duplicate key
      throw new Error('Coupon already redeemed')
    {"}"}
    throw error
  {"}"}
{"}"}</code></pre>
    </div>

    <h3>Fix 4: Optimistic Locking</h3>
    <p>Use version fields to detect concurrent modifications:</p>

    <div class="code-block">
      <pre><code class="language-javascript">// SECURE: Version-based concurrency control
async function updateInventory(itemId, quantity) {"{"}
  const item = await Item.findById(itemId)

  const result = await Item.updateOne(
    {"{"}
      _id: itemId,
      version: item.version  // Must match current version
    {"}"},
    {"{"}
      $inc: {"{"} quantity: -quantity, version: 1 {"}"}
    {"}"}
  )

  if (result.modifiedCount === 0) {"{"}
    throw new Error('Concurrent modification - please retry')
  {"}"}
{"}"}</code></pre>
    </div>

    <h3>Fix 5: Pessimistic Locking (PostgreSQL)</h3>
    <p>Lock the row during the transaction with <a href="https://www.postgresql.org/docs/current/sql-select.html#SQL-FOR-UPDATE-SHARE">SELECT FOR UPDATE</a>:</p>

    <div class="code-block">
      <pre><code class="language-sql">-- SECURE: Lock row during transaction
BEGIN;
SELECT * FROM users WHERE id = $1 FOR UPDATE;
-- Row is locked - other transactions wait here
UPDATE users SET balance = balance - $2 WHERE id = $1;
COMMIT;</code></pre>
    </div>

    <h3>Fix 6: Atomic Rate Limiting (Redis)</h3>
    <p>Use Redis INCR for atomic rate limiting:</p>

    <div class="code-block">
      <pre><code class="language-javascript">// SECURE: Atomic rate limit with Redis
async function checkRateLimit(userId, limit, windowSec) {"{"}
  const key = `ratelimit:${"{"}userId{"}"}:${"{"}Math.floor(Date.now()/1000/windowSec){"}"}`

  // INCR is atomic - returns new value
  const count = await redis.incr(key)

  if (count === 1) {"{"}
    await redis.expire(key, windowSec)
  {"}"}

  if (count > limit) {"{"}
    throw new Error('Rate limited')
  {"}"}
{"}"}</code></pre>
    </div>
  </section>

  <section id="testing">
    <h2>Testing for Race Conditions</h2>

    <p>Race conditions are notoriously hard to find because they depend on timing. Normal testing with a single user will never reveal them. The <a href="https://portswigger.net/web-security/race-conditions">PortSwigger race conditions guide</a> covers testing techniques in depth.</p>

    <h3>Manual Testing</h3>
    <ul>
      <li>Open multiple browser tabs to the same endpoint</li>
      <li>Click submit simultaneously across all tabs (practice helps)</li>
      <li>Check if the operation happened multiple times</li>
    </ul>

    <h3>Automated Tools</h3>
    <ul>
      <li><strong>Burp Suite Turbo Intruder:</strong> Send hundreds of requests in parallel</li>
      <li><strong>Race-the-web:</strong> Specialized race condition testing tool</li>
      <li><strong>Custom scripts:</strong> Use Promise.all() to send concurrent requests</li>
    </ul>

    <div class="code-block">
      <pre><code class="language-javascript">// Simple race condition test
async function testRaceCondition() {"{"}
  const requests = Array(20).fill().map(() =>
    fetch('/api/redeem', {"{"}
      method: 'POST',
      body: JSON.stringify({"{"} code: 'GIFT100' {"}"}),
      headers: {"{"} 'Content-Type': 'application/json' {"}"}
    {"}"})
  )

  const results = await Promise.all(requests)
  const successes = results.filter(r => r.ok).length

  console.log(`${"{"}successes{"}"} successful redemptions`)
  // If > 1, race condition exists
{"}"}</code></pre>
    </div>

    <h3>Advanced: Single-Packet Attack</h3>
    <p>The <a href="https://portswigger.net/research/smashing-the-state-machine">single-packet attack</a> bundles multiple HTTP/2 requests into a single TCP packet, ensuring they arrive at exactly the same time. This technique, documented in PortSwigger research, maximizes race condition exploitation success rates.</p>

    <h3>Code Review Patterns</h3>
    <p>Search your codebase for these patterns:</p>
    <ul>
      <li><code>if (await ...check...) {"{"}...await ...update...{"}"}</code> - check-then-act</li>
      <li><code>findById</code> followed by <code>save()</code> - read-modify-write</li>
      <li>Rate limiting without atomic counters</li>
      <li>Any code that checks availability, then reserves</li>
    </ul>
  </section>

  <section id="ai-fix-prompt">
    <h2>AI Fix Prompt for Race Conditions</h2>

    <p>Copy this prompt to your AI coding tool to audit your codebase for race condition vulnerabilities:</p>

    <div class="fix-prompt-container">
      <button class="toggle-prompt" onclick={() => showFixPrompt = !showFixPrompt}>
        {showFixPrompt ? 'Hide' : 'Show'} AI Fix Prompt
      </button>

      {#if showFixPrompt}
        <div class="fix-prompt">
          <div class="prompt-header">
            <span>Race Condition Audit Prompt</span>
            <button class="copy-btn" onclick={copyPrompt}>
              {copySuccess ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre>{aiFixPrompt}</pre>
        </div>
      {/if}
    </div>

    <p>This prompt guides <a href="/kb/vibe-coding-tools/cursor/">Cursor</a>, <a href="/kb/vibe-coding-tools/claude-code/">Claude Code</a>, or other AI tools through systematic detection of check-then-act patterns, non-atomic operations, and missing transaction boundaries.</p>
  </section>

  <section id="faq">
    <h2>Frequently Asked Questions</h2>

    <div class="faq-list">
      <details class="faq-item">
        <summary>What is a race condition vulnerability?</summary>
        <div class="faq-answer">
          <p>A race condition vulnerability occurs when two or more operations access shared data concurrently, and the final result depends on timing. In web applications, this means attackers can send multiple requests simultaneously to exploit the gap between checking a condition and acting on it. For example, redeeming a gift card 10 times by clicking simultaneously in 10 browser tabs. It's classified as <a href="https://cwe.mitre.org/data/definitions/362.html">CWE-362</a>.</p>
        </div>
      </details>

      <details class="faq-item">
        <summary>How do attackers exploit race conditions?</summary>
        <div class="faq-answer">
          <p>Attackers send multiple requests simultaneously to hit the vulnerable window before state updates. Tools like Burp Suite's Turbo Intruder can send hundreds of requests in parallel. The single-packet attack technique bundles multiple HTTP requests into one TCP packet, ensuring they arrive at the same instant. Common targets: gift card redemption, discount codes, rate limits, and balance transfers.</p>
        </div>
      </details>

      <details class="faq-item">
        <summary>How do I prevent race conditions in Node.js?</summary>
        <div class="faq-answer">
          <p>Use database transactions and atomic operations. With Prisma: <code>prisma.$transaction()</code>. With MongoDB: use <code>$inc</code> operator and conditions in queries. For critical operations, use database-level unique constraints to prevent duplicates. Never separate check from update - combine them into single atomic operations like <code>UPDATE WHERE balance >= amount</code>.</p>
        </div>
      </details>

      <details class="faq-item">
        <summary>What is TOCTOU?</summary>
        <div class="faq-answer">
          <p>TOCTOU (Time-of-check Time-of-use) is a specific type of race condition (<a href="https://cwe.mitre.org/data/definitions/367.html">CWE-367</a>) where a resource is checked and then used, but changes between those two steps. Example: checking if a file exists, then reading it - an attacker could swap the file between check and read. In web apps, this happens when validating data in one query and using it in another.</p>
        </div>
      </details>

      <details class="faq-item">
        <summary>Are race conditions hard to detect?</summary>
        <div class="faq-answer">
          <p>Yes, race conditions are notoriously difficult to detect because they depend on timing and may not appear in normal testing. Single-user testing almost never reveals them. You need concurrent load testing or specialized tools. Code review patterns to look for: check-then-act sequences, non-atomic increments, and any gap between reading and writing shared state. SAST tools can help identify suspicious patterns.</p>
        </div>
      </details>
    </div>
  </section>

  <section class="related-content">
    <h2>Related Security Topics</h2>
    <div class="related-links">
      <a href="/kb/security/vulnerabilities/broken-access-control/" class="related-link">
        <h4>Broken Access Control</h4>
        <p>Race conditions can bypass access checks</p>
      </a>
      <a href="/kb/security/vulnerabilities/idor/" class="related-link">
        <h4>IDOR</h4>
        <p>Related access control vulnerabilities</p>
      </a>
      <a href="/kb/security/stacks/nextjs-supabase/" class="related-link">
        <h4>Next.js + Supabase Security</h4>
        <p>Database transaction patterns for this stack</p>
      </a>
      <a href="/kb/security/vulnerabilities/jwt-vulnerabilities/" class="related-link">
        <h4>JWT Vulnerabilities</h4>
        <p>Session race conditions in token handling</p>
      </a>
    </div>
  </section>

  <section class="cta-section">
    <h2>Scan Your Code for Race Conditions</h2>
    <p>VibeShip Scanner detects check-then-act patterns, non-atomic operations, and other race condition vulnerabilities in your AI-generated code.</p>
    <a href="https://scanner.vibeship.co" class="cta-button">Scan Your Repository</a>
  </section>
</article>

<style>
  .vulnerability-article {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 1rem;
    font-family: system-ui, -apple-system, sans-serif;
    line-height: 1.6;
    color: #1a1a2e;
  }

  .breadcrumb {
    display: flex;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: #666;
    margin-bottom: 2rem;
    flex-wrap: wrap;
  }

  .breadcrumb a {
    color: #6366f1;
    text-decoration: none;
  }

  .breadcrumb a:hover {
    text-decoration: underline;
  }

  .article-header {
    margin-bottom: 2rem;
  }

  .severity-badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 1rem;
  }

  .severity-badge.high {
    background: #fef3c7;
    color: #d97706;
    border: 1px solid #fde68a;
  }

  h1 {
    font-size: 2.25rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: #1a1a2e;
  }

  .subtitle {
    font-size: 1.125rem;
    color: #666;
  }

  .quick-answer {
    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
    border-left: 4px solid #d97706;
    padding: 1.5rem;
    border-radius: 0 8px 8px 0;
    margin-bottom: 2rem;
    font-size: 1rem;
  }

  .quick-answer a {
    color: #92400e;
    text-decoration: none;
  }

  .quick-answer a:hover {
    text-decoration: underline;
  }

  .stats-box {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 1rem;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 2rem;
  }

  .stat {
    text-align: center;
  }

  .stat-value {
    display: block;
    font-size: 1.5rem;
    font-weight: 700;
    color: #d97706;
  }

  .stat-label {
    font-size: 0.75rem;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .toc {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 2rem;
  }

  .toc h2 {
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  .toc ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1.5rem;
  }

  .toc a {
    color: #6366f1;
    text-decoration: none;
    font-size: 0.875rem;
  }

  .toc a:hover {
    text-decoration: underline;
  }

  section {
    margin-bottom: 3rem;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #1a1a2e;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #e2e8f0;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 1.5rem 0 1rem;
    color: #374151;
  }

  h4 {
    font-size: 1rem;
    font-weight: 600;
    margin: 1rem 0 0.5rem;
    color: #4b5563;
  }

  p {
    margin-bottom: 1rem;
  }

  a {
    color: #6366f1;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  .attack-diagram {
    background: #1e1e1e;
    border-radius: 8px;
    padding: 1rem;
    overflow-x: auto;
    margin: 1rem 0;
  }

  .attack-diagram pre {
    margin: 0;
  }

  .attack-diagram code {
    color: #d4d4d4;
    font-family: 'Fira Code', 'Consolas', monospace;
    font-size: 0.8rem;
    line-height: 1.5;
  }

  .attack-scenario {
    background: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 8px;
    padding: 1rem;
    margin: 1rem 0;
  }

  .attack-scenario ol {
    margin: 0;
    padding-left: 1.25rem;
  }

  .attack-scenario li {
    margin-bottom: 0.25rem;
    color: #991b1b;
  }

  .code-block {
    background: #1e1e1e;
    border-radius: 8px;
    padding: 1rem;
    overflow-x: auto;
    margin: 1rem 0;
  }

  .code-block pre {
    margin: 0;
  }

  .code-block code {
    color: #d4d4d4;
    font-family: 'Fira Code', 'Consolas', monospace;
    font-size: 0.875rem;
    line-height: 1.5;
  }

  .code-comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin: 1rem 0;
  }

  @media (max-width: 768px) {
    .code-comparison {
      grid-template-columns: 1fr;
    }
  }

  .code-vulnerable,
  .code-secure {
    border-radius: 8px;
    overflow: hidden;
  }

  .code-vulnerable {
    border: 1px solid #fecaca;
  }

  .code-secure {
    border: 1px solid #bbf7d0;
  }

  .code-vulnerable h4,
  .code-secure h4 {
    margin: 0;
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .code-vulnerable h4 {
    background: #fef2f2;
    color: #dc2626;
  }

  .code-secure h4 {
    background: #f0fdf4;
    color: #16a34a;
  }

  .code-vulnerable pre,
  .code-secure pre {
    margin: 0;
    padding: 1rem;
    background: #1e1e1e;
    overflow-x: auto;
  }

  .code-vulnerable code,
  .code-secure code {
    color: #d4d4d4;
    font-family: 'Fira Code', 'Consolas', monospace;
    font-size: 0.75rem;
    line-height: 1.5;
  }

  ul, ol {
    margin: 1rem 0;
    padding-left: 1.5rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  code {
    background: #f1f5f9;
    padding: 0.125rem 0.375rem;
    border-radius: 4px;
    font-size: 0.875rem;
    font-family: 'Fira Code', 'Consolas', monospace;
  }

  .cve-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 1rem 0;
  }

  .cve-item {
    padding: 1rem;
    background: #fef3c7;
    border-left: 4px solid #f59e0b;
    border-radius: 0 8px 8px 0;
  }

  .cve-item h4 {
    margin: 0 0 0.5rem 0;
    color: #92400e;
    font-size: 0.875rem;
  }

  .cve-item p {
    margin: 0;
    font-size: 0.875rem;
    color: #78350f;
  }

  .fix-prompt-container {
    margin: 1.5rem 0;
  }

  .toggle-prompt {
    background: #6366f1;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;
  }

  .toggle-prompt:hover {
    background: #4f46e5;
  }

  .fix-prompt {
    margin-top: 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    overflow: hidden;
  }

  .prompt-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
  }

  .prompt-header span {
    font-weight: 600;
    color: #374151;
  }

  .copy-btn {
    background: #e0e7ff;
    color: #4f46e5;
    border: none;
    padding: 0.375rem 0.75rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;
  }

  .copy-btn:hover {
    background: #c7d2fe;
  }

  .fix-prompt pre {
    margin: 0;
    padding: 1rem;
    background: #1e1e1e;
    color: #d4d4d4;
    font-family: 'Fira Code', 'Consolas', monospace;
    font-size: 0.8rem;
    line-height: 1.6;
    overflow-x: auto;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  .faq-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .faq-item {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    overflow: hidden;
  }

  .faq-item summary {
    padding: 1rem;
    font-weight: 500;
    cursor: pointer;
    background: #f8fafc;
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .faq-item summary::-webkit-details-marker {
    display: none;
  }

  .faq-item summary::after {
    content: '+';
    font-size: 1.25rem;
    color: #6366f1;
    font-weight: 300;
  }

  .faq-item[open] summary::after {
    content: '-';
  }

  .faq-answer {
    padding: 1rem;
    background: white;
    border-top: 1px solid #e2e8f0;
  }

  .faq-answer p {
    margin: 0;
    font-size: 0.875rem;
    color: #4b5563;
    line-height: 1.6;
  }

  .faq-answer code {
    background: #f1f5f9;
    padding: 0.125rem 0.375rem;
    border-radius: 4px;
    font-size: 0.8rem;
  }

  .faq-answer a {
    color: #6366f1;
  }

  .related-content {
    background: #f8fafc;
    border-radius: 12px;
    padding: 2rem;
  }

  .related-content h2 {
    border-bottom: none;
    padding-bottom: 0;
  }

  .related-links {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }

  .related-link {
    display: block;
    padding: 1rem;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    text-decoration: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .related-link:hover {
    border-color: #6366f1;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    text-decoration: none;
  }

  .related-link h4 {
    margin: 0 0 0.25rem 0;
    color: #6366f1;
    font-size: 0.875rem;
  }

  .related-link p {
    margin: 0;
    font-size: 0.75rem;
    color: #64748b;
  }

  .cta-section {
    text-align: center;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    border-radius: 12px;
    padding: 3rem 2rem;
    color: white;
  }

  .cta-section h2 {
    color: white;
    border-bottom: none;
    padding-bottom: 0;
  }

  .cta-section p {
    opacity: 0.9;
    max-width: 500px;
    margin: 0 auto 1.5rem;
  }

  .cta-button {
    display: inline-block;
    background: white;
    color: #6366f1;
    padding: 0.875rem 2rem;
    border-radius: 8px;
    font-weight: 600;
    text-decoration: none;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    text-decoration: none;
  }
</style>
