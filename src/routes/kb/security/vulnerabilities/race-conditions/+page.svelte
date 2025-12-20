<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Race Conditions: How Async Code Creates Security Holes AI Misses',
		description: 'Race conditions let attackers exploit timing gaps in async code to bypass limits, duplicate transactions, or escalate privileges. Learn secure patterns for Node.js and Python async code.',
		url: '/kb/security/vulnerabilities/race-conditions/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Race Conditions' }
	];

	// FAQ data for schema
	const faqs = [
		{
			question: 'What is a race condition vulnerability?',
			answer: 'A race condition vulnerability occurs when two or more operations access shared data concurrently, and the final result depends on timing. In web applications, this means attackers can send multiple requests simultaneously to exploit the gap between checking a condition and acting on it. For example, redeeming a gift card 10 times by clicking simultaneously in 10 browser tabs.'
		},
		{
			question: 'How do attackers exploit race conditions?',
			answer: 'Attackers send multiple requests simultaneously to hit the vulnerable window before state updates. Tools like Burp Suite\'s Turbo Intruder can send hundreds of requests in parallel. The single-packet attack technique bundles multiple HTTP requests into one TCP packet, ensuring they arrive at the same instant. Common targets: gift card redemption, discount codes, rate limits, and balance transfers.'
		},
		{
			question: 'How do I prevent race conditions in Node.js?',
			answer: 'Use database transactions and atomic operations. With Prisma: prisma.$transaction(). With MongoDB: use $inc operator and conditions in queries. For critical operations, use database-level unique constraints to prevent duplicates. Never separate check from update - combine them into single atomic operations like UPDATE WHERE balance >= amount.'
		},
		{
			question: 'What is TOCTOU?',
			answer: 'TOCTOU (Time-of-check Time-of-use) is a specific type of race condition (CWE-367) where a resource is checked and then used, but changes between those two steps. Example: checking if a file exists, then reading it - an attacker could swap the file between check and read. In web apps, this happens when validating data in one query and using it in another.'
		},
		{
			question: 'Are race conditions hard to detect?',
			answer: 'Yes, race conditions are notoriously difficult to detect because they depend on timing and may not appear in normal testing. Single-user testing almost never reveals them. You need concurrent load testing or specialized tools. Code review patterns to look for: check-then-act sequences, non-atomic increments, and any gap between reading and writing shared state.'
		}
	];

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

	let copied = $state(false);
	let showPrompt = $state(false);

	function copyPrompt() {
		navigator.clipboard.writeText(aiFixPrompt);
		copied = true;
		setTimeout(() => copied = false, 2000);
	}
</script>

<svelte:head>
	<title>{meta.title}</title>
	<meta name="description" content={meta.description} />
	<meta name="keywords" content="race condition, TOCTOU, CWE-362, async security, concurrency vulnerability, vibe coding security" />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:url" content={meta.url} />
	<meta property="og:type" content="article" />
	<link rel="canonical" href="https://vibeship.co{meta.url}" />

	<!-- BreadcrumbList Schema -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"itemListElement": [
			{"@type": "ListItem", "position": 1, "name": "Knowledge Base", "item": "https://vibeship.co/kb"},
			{"@type": "ListItem", "position": 2, "name": "Security", "item": "https://vibeship.co/kb/security"},
			{"@type": "ListItem", "position": 3, "name": "Vulnerabilities", "item": "https://vibeship.co/kb/security/vulnerabilities"},
			{"@type": "ListItem", "position": 4, "name": "Race Conditions"}
		]
	}
	</script>`}

	<!-- TechArticle Schema -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "TechArticle",
		"headline": "${meta.title}",
		"description": "${meta.description}",
		"author": {"@type": "Organization", "name": "Vibeship"},
		"publisher": {"@type": "Organization", "name": "Vibeship", "url": "https://vibeship.co"},
		"datePublished": "2024-12-17",
		"dateModified": "2024-12-17"
	}
	</script>`}

	<!-- FAQ Schema -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "FAQPage",
		"mainEntity": ${JSON.stringify(faqs.map(faq => ({
			"@type": "Question",
			"name": faq.question,
			"acceptedAnswer": {"@type": "Answer", "text": faq.answer}
		})))}
	}
	</script>`}
</svelte:head>

<Header {breadcrumbs} />

<div class="content-wrapper">
	<article class="content-main content-wide">
		<!-- Header -->
		<header class="article-header">
			<div class="badge-row">
				<span class="badge badge-high">High Severity</span>
				<span class="badge">CWE-362</span>
				<span class="badge">OWASP A04:2021</span>
			</div>
			<h1>Race Conditions: How Async Code Creates Security Holes AI Misses</h1>
			<p class="text-secondary">Timing attacks that let attackers bypass limits and duplicate transactions</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Race conditions let attackers exploit timing gaps between checking a condition and acting on it.</strong>
				Send 10 requests simultaneously to redeem a gift card 10 times. AI generates async code without proper locking, making this common in vibe coded apps.
				Fix: use database transactions and atomic operations.
				Classified as <a href="https://cwe.mitre.org/data/definitions/362.html">CWE-362</a>.
			</p>
		</div>

		<!-- Stats -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">CWE-362</div>
				<div class="stat-label">Classification</div>
			</div>
			<div class="stat-box">
				<div class="stat-value warning">High</div>
				<div class="stat-label">Severity</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">100+</div>
				<div class="stat-label">CVEs Per Year</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Hard</div>
				<div class="stat-label">Detection Difficulty</div>
			</div>
		</div>

		<!-- What Is It -->
		<section class="article-section">
			<h2>What is a Race Condition?</h2>
			<p>
				A race condition occurs when two or more operations access shared resources concurrently, and the final result depends on timing. In web applications, this creates security vulnerabilities when attackers can exploit the gap between checking a condition and acting on it - known as the CHECK-USE gap.
			</p>
			<p>
				Think of it like two people trying to book the last airline seat simultaneously. Both see "1 seat available," both click "Book," and both succeed - even though only one seat exists. In code, this manifests when you check a value (is balance sufficient?), then act on it (deduct balance) - but another request slips in between.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Race Window Example</span>
				</div>
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

			<p>
				Race conditions fall under <a href="https://owasp.org/Top10/A04_2021-Insecure_Design/">OWASP A04:2021 Insecure Design</a>. A specific variant called TOCTOU (Time-of-check Time-of-use), documented as <a href="https://cwe.mitre.org/data/definitions/367.html">CWE-367</a>, is particularly common in file operations and web applications.
			</p>
		</section>

		<!-- Attack Examples -->
		<section class="article-section">
			<h2>Real-World Attack Examples</h2>
			<p>
				Race conditions enable financial fraud, privilege escalation, and security bypass. These attacks are effective because the vulnerability only appears under concurrent load - normal testing misses them entirely.
			</p>

			<h3>Gift Card Double Redemption</h3>
			<div class="alert alert-danger">
				<ol>
					<li>Attacker has a $100 gift card code</li>
					<li>Opens 10 browser tabs to the redemption page</li>
					<li>Clicks "Redeem" simultaneously in all 10 tabs</li>
					<li>All 10 requests pass the "is valid" check before any marks it used</li>
					<li>Result: $100 gift card redeemed 10 times = $1,000 store credit</li>
				</ol>
			</div>

			<h3>Rate Limit Bypass</h3>
			<div class="alert alert-danger">
				<ol>
					<li>API allows 5 login attempts per minute</li>
					<li>Attacker sends 100 login requests simultaneously</li>
					<li>All requests hit the server before the rate counter updates</li>
					<li>100 password guesses processed instead of 5</li>
					<li>This enables brute-force attacks on <a href="/kb/security/vulnerabilities/broken-access-control/">access control</a></li>
				</ol>
			</div>

			<h3>Notable CVEs</h3>
			<ul>
				<li><strong>CVE-2024-50379</strong> - Apache Tomcat RCE: TOCTOU race condition allowing remote code execution via file handling</li>
				<li><strong>CVE-2025-68146</strong> - Python filelock: Symlink attack via TOCTOU race condition in file locking library</li>
				<li><strong>CVE-2021-0920</strong> - Android Kernel: Use-after-free via race condition, actively exploited in the wild</li>
			</ul>
		</section>

		<!-- Why AI Misses It -->
		<section class="article-section">
			<h2>Why AI Tools Generate Vulnerable Code</h2>
			<p>
				AI coding tools like <a href="/kb/vibe-coding-tools/cursor/">Cursor</a> and <a href="/kb/vibe-coding-tools/claude-code/">Claude Code</a> generate async code that works perfectly for single users but breaks under concurrent load. The issue: AI focuses on functional correctness without considering concurrent access patterns.
			</p>

			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-label">AI-Generated (Vulnerable)</div>
					<pre><code>// "Redeem coupon" - AI's typical output
app.post('/redeem', async (req, res) => {'{'}
  const coupon = await Coupon.findOne({'{'}
    code: req.body.code
  {'}'})

  if (!coupon || coupon.used) {'{'}
    return res.status(400).json({'{'}
      error: 'Invalid coupon'
    {'}'})
  {'}'}

  // RACE WINDOW: Another request passes
  // the check above while we're here

  await applyDiscount(req.user, coupon.discount)
  coupon.used = true
  await coupon.save()

  res.json({'{'} success: true {'}'})
{'}'})</code></pre>
				</div>
				<div class="code-block secure">
					<div class="code-label">Secure Pattern</div>
					<pre><code>// Atomic operation with database transaction
app.post('/redeem', async (req, res) => {'{'}
  const result = await db.transaction(async (tx) => {'{'}
    // Atomic check-and-update in one query
    const coupon = await tx.coupon.update({'{'}
      where: {'{'}
        code: req.body.code,
        used: false  // Condition in the update
      {'}'},
      data: {'{'} used: true {'}'}
    {'}'})

    if (!coupon) {'{'}
      throw new Error('Invalid or already used')
    {'}'}

    await tx.discount.create({'{'}
      data: {'{'}
        userId: req.user.id,
        amount: coupon.discount
      {'}'}
    {'}'})

    return coupon
  {'}'})

  res.json({'{'} success: true {'}'})
{'}'})</code></pre>
				</div>
			</div>

			<h3>Why This Happens</h3>
			<ul>
				<li><strong>Training data:</strong> Most code samples are single-user scenarios</li>
				<li><strong>await creates gaps:</strong> Every await point is a potential race window</li>
				<li><strong>No concurrency model:</strong> AI doesn't think about parallel requests</li>
				<li><strong>"It works" testing:</strong> Single-user tests always pass</li>
			</ul>
		</section>

		<!-- Secure Patterns -->
		<section class="article-section">
			<h2>Secure Patterns</h2>
			<p>
				The solution is always the same principle: eliminate the gap between check and use. Here are concrete patterns for common scenarios.
			</p>

			<h3>Fix 1: Database Transactions</h3>
			<p>Wrap related operations in a transaction. With <a href="https://www.prisma.io/docs/concepts/components/prisma-client/transactions">Prisma</a>:</p>

			<div class="code-block">
				<pre><code>// SECURE: Atomic transaction
async function withdrawFunds(userId, amount) {'{'}
  await prisma.$transaction(async (tx) => {'{'}
    const user = await tx.user.findUnique({'{'}
      where: {'{'} id: userId {'}'}
    {'}'})

    if (user.balance &lt; amount) {'{'}
      throw new Error('Insufficient balance')
    {'}'}

    await tx.user.update({'{'}
      where: {'{'} id: userId {'}'},
      data: {'{'} balance: {'{'} decrement: amount {'}'} {'}'}
    {'}'})

    await tx.transaction.create({'{'}
      data: {'{'} userId, amount, type: 'withdrawal' {'}'}
    {'}'})
  {'}'})
{'}'}</code></pre>
			</div>

			<h3>Fix 2: Atomic Update with Condition</h3>
			<p>Combine check and update into single query. With <a href="https://www.mongodb.com/docs/manual/core/write-operations-atomicity/">MongoDB</a>:</p>

			<div class="code-block">
				<pre><code>// SECURE: Single atomic operation
async function withdrawFunds(userId, amount) {'{'}
  const result = await User.updateOne(
    {'{'}
      _id: userId,
      balance: {'{'} $gte: amount {'}'}  // Condition in query
    {'}'},
    {'{'}
      $inc: {'{'} balance: -amount {'}'}  // Atomic decrement
    {'}'}
  )

  if (result.modifiedCount === 0) {'{'}
    throw new Error('Insufficient balance or user not found')
  {'}'}
{'}'}</code></pre>
			</div>

			<h3>Fix 3: Database Unique Constraints</h3>
			<p>Let the database enforce uniqueness - don't check in application code:</p>

			<div class="code-block">
				<pre><code>// SECURE: Database enforces uniqueness
async function redeemCoupon(code, userId) {'{'}
  try {'{'}
    await Redemption.create({'{'}
      couponCode: code,
      userId
    {'}'})
  {'}'} catch (error) {'{'}
    if (error.code === 11000) {'{'} // MongoDB duplicate key
      throw new Error('Coupon already redeemed')
    {'}'}
    throw error
  {'}'}
{'}'}</code></pre>
			</div>
		</section>

		<!-- Testing -->
		<section class="article-section">
			<h2>Testing for Race Conditions</h2>
			<p>
				Race conditions are notoriously hard to find because they depend on timing. Normal testing with a single user will never reveal them. The <a href="https://portswigger.net/web-security/race-conditions">PortSwigger race conditions guide</a> covers testing techniques in depth.
			</p>

			<h3>Simple Test Script</h3>
			<div class="code-block">
				<pre><code>// Simple race condition test
async function testRaceCondition() {'{'}
  const requests = Array(20).fill().map(() =>
    fetch('/api/redeem', {'{'}
      method: 'POST',
      body: JSON.stringify({'{'} code: 'GIFT100' {'}'}),
      headers: {'{'} 'Content-Type': 'application/json' {'}'}
    {'}'})
  )

  const results = await Promise.all(requests)
  const successes = results.filter(r => r.ok).length

  console.log(`${'{'}successes{'}'} successful redemptions`)
  // If > 1, race condition exists
{'}'}</code></pre>
			</div>

			<h3>Code Review Patterns</h3>
			<p>Search your codebase for these patterns:</p>
			<ul>
				<li><code>if (await ...check...) {'{'}...await ...update...{'}'}</code> - check-then-act</li>
				<li><code>findById</code> followed by <code>save()</code> - read-modify-write</li>
				<li>Rate limiting without atomic counters</li>
				<li>Any code that checks availability, then reserves</li>
			</ul>
		</section>

		<!-- AI Fix Prompt -->
		<section class="article-section">
			<h2>AI Fix Prompt for Race Conditions</h2>
			<p>Copy this prompt to your AI coding tool to audit your codebase for race condition vulnerabilities:</p>

			<div class="fix-prompt">
				<div class="fix-prompt-header">
					<span class="fix-prompt-label">Race Condition Audit Prompt</span>
					<button class="copy-btn" class:copied onclick={copyPrompt}>
						{copied ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<div class="fix-prompt-content">{aiFixPrompt}</div>
			</div>

			<p>
				This prompt guides <a href="/kb/vibe-coding-tools/cursor/">Cursor</a>, <a href="/kb/vibe-coding-tools/claude-code/">Claude Code</a>, or other AI tools through systematic detection of check-then-act patterns, non-atomic operations, and missing transaction boundaries.
			</p>
		</section>

		<!-- FAQ -->
		<section class="article-section">
			<h2>Frequently Asked Questions</h2>
			<div class="faq-list">
				{#each faqs as faq}
					<div class="faq-item">
						<h3>{faq.question}</h3>
						<p>{faq.answer}</p>
					</div>
				{/each}
			</div>
		</section>

		<!-- Related Content -->
		<section class="article-section">
			<h2>Related Security Topics</h2>
			<div class="related-grid">
				<a href="/kb/security/vulnerabilities/broken-access-control/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Broken Access Control</div>
					<p class="related-card-description">Race conditions can bypass access checks</p>
				</a>
				<a href="/kb/security/vulnerabilities/idor/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">IDOR</div>
					<p class="related-card-description">Related access control vulnerabilities</p>
				</a>
				<a href="/kb/security/stacks/nextjs-supabase/" class="card card-interactive related-card">
					<div class="related-card-category">Stack Guide</div>
					<div class="related-card-title">Next.js + Supabase Security</div>
					<p class="related-card-description">Database transaction patterns for this stack</p>
				</a>
				<a href="/kb/security/vulnerabilities/jwt-vulnerabilities/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">JWT Vulnerabilities</div>
					<p class="related-card-description">Session race conditions in token handling</p>
				</a>
			</div>
		</section>

		<!-- CTA -->
		<section class="final-cta">
			<h2>Scan Your Code for Race Conditions</h2>
			<p>vibeship scanner detects check-then-act patterns, non-atomic operations, and other race condition vulnerabilities in your AI-generated code.</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">Scan Your Repository</a>
		</section>
	</article>
</div>

<style>
	/* Quick Answer - page-specific extension */
	.quick-answer {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-left: 3px solid var(--green-dim);
		padding: 1.25rem;
		margin-bottom: 2rem;
	}

	.quick-answer-label {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--green-dim);
		margin-bottom: 0.5rem;
	}

	.quick-answer-text {
		margin: 0;
		color: var(--text-secondary);
	}

	/* Stats Row */
	.stats-row {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
		margin-bottom: 2rem;
	}

	@media (max-width: 768px) {
		.stats-row {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	/* Code Label for comparison blocks */
	.code-label {
		padding: 0.5rem 1rem;
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		background: var(--bg-secondary);
		border-bottom: 1px solid var(--border);
	}

	.vulnerable .code-label {
		color: var(--red);
	}

	.secure .code-label {
		color: var(--green);
	}

	/* Alert lists */
	.alert ol {
		margin: 0;
		padding-left: 1.25rem;
	}

	.alert li {
		margin-bottom: 0.25rem;
		color: var(--text-secondary);
	}

	/* Fix prompt content scrolling */
	.fix-prompt-content {
		max-height: 400px;
		overflow-y: auto;
	}
</style>
