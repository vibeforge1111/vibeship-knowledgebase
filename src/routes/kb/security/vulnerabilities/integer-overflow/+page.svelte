<script lang="ts">
	import { Header } from '$lib/components/layout';

	const meta = {
		title: 'Integer Overflow: Detect & Fix Guide',
		description: 'Integer overflow lets attackers manipulate prices and bypass security. Learn to detect numeric vulnerabilities in JavaScript and fix them with BigInt.',
		url: '/kb/security/vulnerabilities/integer-overflow/'
	};

	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Integer Overflow' }
	];

	const securityData = {
		cweId: 'CWE-190',
		cweName: 'Integer Overflow or Wraparound',
		cweSource: 'https://cwe.mitre.org/data/definitions/190.html',
		owaspCategory: 'A03:2021 - Injection',
		owaspSource: 'https://owasp.org/Top10/A03_2021-Injection/',
		cweRanking: '#12 CWE Top 25 (2024)',
		severity: 'High',
		cvssScore: '7.5-9.8'
	};

	const faqs = [
		{
			question: 'What is integer overflow?',
			answer: 'Integer overflow occurs when an arithmetic operation produces a value outside the range a data type can store. The number "wraps around" to the opposite end of the range. For example, adding 1 to the maximum positive integer gives you the minimum negative integer. In security contexts, this can turn large values into small ones or positive into negative.'
		},
		{
			question: 'How do I prevent integer overflow?',
			answer: 'Validate input ranges before arithmetic. Use BigInt for large numbers in JavaScript. Check if results would overflow before performing operations. Use libraries like safe-math for critical calculations. For money, store values as integer cents and validate maximums. Set explicit limits on quantity and price fields.'
		},
		{
			question: 'Can JavaScript have integer overflow?',
			answer: 'Yes, but differently than C/C++. JavaScript uses 64-bit floats, which lose precision past Number.MAX_SAFE_INTEGER (9007199254740991). Operations beyond this silently produce wrong results. Bitwise operations truncate to 32-bit signed integers, causing classic overflow. BigInt handles arbitrary precision integers safely.'
		},
		{
			question: 'What is the difference between overflow and underflow?',
			answer: 'Overflow happens when a value exceeds the maximum (e.g., MAX_INT + 1 wraps to MIN_INT). Underflow happens when a value goes below the minimum (e.g., MIN_INT - 1 wraps to MAX_INT). Both exploit the same wraparound behavior. The terms are sometimes used interchangeably, but technically refer to opposite boundaries.'
		},
		{
			question: 'How do hackers exploit integer overflow?',
			answer: 'Attackers craft inputs that cause calculations to wrap around. In e-commerce: large quantities times price might overflow to small or negative totals. In crypto: overflow in balance checks enabled infinite money. In access control: overflowing array indices bypasses bounds checks. The result is paying less, gaining more, or bypassing security.'
		}
	];

	let copied = $state(false);

	function copyPrompt() {
		const prompt = document.getElementById('ai-fix-prompt')?.textContent || '';
		navigator.clipboard.writeText(prompt);
		copied = true;
		setTimeout(() => copied = false, 2000);
	}
</script>

<svelte:head>
	<title>{meta.title}</title>
	<meta name="description" content={meta.description} />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:url" content={meta.url} />
	<meta property="og:type" content="article" />
	<link rel="canonical" href="https://vibeship.co{meta.url}" />

	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"itemListElement": [
			{"@type": "ListItem", "position": 1, "name": "Knowledge Base", "item": "https://vibeship.co/kb"},
			{"@type": "ListItem", "position": 2, "name": "Security", "item": "https://vibeship.co/kb/security"},
			{"@type": "ListItem", "position": 3, "name": "Vulnerabilities", "item": "https://vibeship.co/kb/security/vulnerabilities"},
			{"@type": "ListItem", "position": 4, "name": "Integer Overflow"}
		]
	}
	</script>`}

	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "TechArticle",
		"headline": "${meta.title}",
		"description": "${meta.description}",
		"author": {"@type": "Organization", "name": "VibeShip"},
		"publisher": {"@type": "Organization", "name": "VibeShip"},
		"datePublished": "2024-12-26",
		"dateModified": "2024-12-26"
	}
	</script>`}

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
		<header class="article-header">
			<div class="badge-row">
				<span class="badge badge-high">High</span>
				<span class="badge">{securityData.cweId}</span>
				<span class="badge">{securityData.cweRanking}</span>
			</div>
			<h1>Integer Overflow in Vibe Coded Apps</h1>
			<p class="text-secondary">When numbers wrap around and prices go negative</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Integer overflow happens when arithmetic exceeds a number's maximum value, causing it to wrap to a small or negative number.</strong>
				In e-commerce: quantity × price can overflow to $0. In crypto: balance checks can be bypassed.
				JavaScript's Number.MAX_SAFE_INTEGER is 9007199254740991. Beyond that, math breaks silently. The fix: validate bounds, use BigInt for large numbers, store money as integer cents.
			</p>
		</div>

		<!-- Stats Box -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">$60M</div>
				<div class="stat-label">DAO hack (2016)</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">2^53-1</div>
				<div class="stat-label">JS safe integer max</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">#12</div>
				<div class="stat-label">CWE Top 25 (2024)</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">{securityData.cvssScore}</div>
				<div class="stat-label">CVSS Score Range</div>
			</div>
		</div>
		<p class="data-source">
			Source: <a href="https://cwe.mitre.org/top25/archive/2024/2024_cwe_top25.html">CWE Top 25 2024</a>, <a href={securityData.owaspSource}>OWASP</a>
		</p>

		<!-- What Is It - @keystrokecounts voice (optimizer, precision-focused) -->
		<section class="article-section">
			<h2>What is integer overflow?</h2>
			<p>
				Think of an old car odometer with 6 digits. It goes from 999,999 to 000,000. It doesn't stop at max—it wraps around. Computer integers do the same thing.
			</p>
			<p>
				When a calculation produces a number larger than the maximum, it wraps to the minimum (often a large negative). When it goes below the minimum, it wraps to the maximum. This "wraparound" behavior is predictable—and exploitable.
			</p>
			<p>
				In JavaScript, <code>Number.MAX_SAFE_INTEGER</code> is 9007199254740991. Add 2 to it, and you get... 9007199254740992. Not 9007199254740993. The precision is gone. For security-critical calculations, that precision loss can be catastrophic.
			</p>
		</section>

		<!-- Real Impact -->
		<section class="article-section">
			<h2>$60 million stolen with one overflow</h2>
			<p>
				2016. The Ethereum DAO. A smart contract had an integer overflow in its balance checking. Attackers exploited it to withdraw funds they didn't have. $60 million gone. The entire Ethereum blockchain had to fork to recover.
			</p>

			<div class="incident-list">
				<div class="incident-item incident-critical">
					<div class="incident-company">Steam (2020)</div>
					<div class="incident-details">
						Negative quantity in cart caused integer underflow. Price wrapped to large negative. Games purchased for $0 or even added credit.
					</div>
				</div>
				<div class="incident-item incident-high">
					<div class="incident-company">Bitcoin (2010)</div>
					<div class="incident-details">
						Transaction created 184 billion BTC via integer overflow. Emergency patch deployed within hours.
					</div>
				</div>
				<div class="incident-item incident-high">
					<div class="incident-company">Multiple NFT Projects</div>
					<div class="incident-details">
						Minting functions with unchecked arithmetic allowed minting more tokens than supply limits.
					</div>
				</div>
			</div>
		</section>

		<!-- Why Vibe Coded Apps -->
		<section class="article-section">
			<h2>Why vibe coded apps are vulnerable</h2>
			<p>
				AI generates arithmetic without bounds checking. When you ask for "quantity × price" logic, you get multiplication. You don't get overflow protection.
			</p>

			<div class="code-comparison">
				<div class="code-block code-bad">
					<div class="code-block-header">
						<span class="code-block-lang">Vulnerable - AI-generated price calculation</span>
						<span class="code-label-bad">No bounds check</span>
					</div>
					<pre><code>{`// AI-generated cart total
function calculateTotal(items: CartItem[]) {
  return items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
}

// What happens with malicious input:
// price: 99999999999999999
// quantity: 99999999999999999
// Result: Infinity, NaN, or wrapped negative

// Or with bitwise operations:
const total = (price * quantity) | 0; // Truncates to 32-bit!
// 3000000000 | 0 = -1294967296 (negative!)`}</code></pre>
				</div>
				<div class="code-block code-good">
					<div class="code-block-header">
						<span class="code-block-lang">Secure - Bounded calculation</span>
						<span class="code-label-good">Fixed</span>
					</div>
					<pre><code>{`// Safe cart total with bounds checking
const MAX_QUANTITY = 9999;
const MAX_PRICE_CENTS = 99999999; // $999,999.99

function calculateTotal(items: CartItem[]): number {
  let total = 0;

  for (const item of items) {
    // Validate bounds BEFORE arithmetic
    if (item.quantity < 0 || item.quantity > MAX_QUANTITY) {
      throw new Error('Invalid quantity');
    }
    if (item.price < 0 || item.price > MAX_PRICE_CENTS) {
      throw new Error('Invalid price');
    }

    const lineTotal = item.price * item.quantity;

    // Check for overflow before adding
    if (total > Number.MAX_SAFE_INTEGER - lineTotal) {
      throw new Error('Total exceeds maximum');
    }

    total += lineTotal;
  }

  return total;
}`}</code></pre>
				</div>
			</div>

			<p>
				The vulnerable code "works" in testing. Nobody tests with 99999999999999999 as a quantity. But attackers do.
			</p>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How to detect integer overflow vulnerabilities</h2>
			<p>
				Look for arithmetic on user-controlled values without bounds checking.
			</p>

			<div class="detection-patterns">
				<h3>Red Flags in Code</h3>
				<div class="pattern-grid">
					<div class="pattern-item">
						<code>price * quantity</code>
						<span>No max check</span>
					</div>
					<div class="pattern-item">
						<code>amount | 0</code>
						<span>Bitwise truncation</span>
					</div>
					<div class="pattern-item">
						<code>balance - withdrawal</code>
						<span>Can go negative</span>
					</div>
					<div class="pattern-item">
						<code>index + offset</code>
						<span>Array bounds bypass</span>
					</div>
				</div>
			</div>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Testing for overflow</span>
				</div>
				<pre><code>{`// Test edge cases in your app
const testCases = [
  { quantity: 0, price: 100 },           // Zero
  { quantity: -1, price: 100 },          // Negative
  { quantity: Number.MAX_SAFE_INTEGER, price: 2 }, // Overflow
  { quantity: 2147483647, price: 2 },    // 32-bit max
  { quantity: 9999999999999, price: 1 }, // Large number
];

// In browser console or test file:
testCases.forEach(({ quantity, price }) => {
  const result = quantity * price;
  console.log(\`\${quantity} × \${price} = \${result}\`);
  // Check: Is result negative? NaN? Infinity? Wrong?
});`}</code></pre>
			</div>

			<div class="cta-box">
				<p><strong>Numeric bugs hide in plain sight.</strong></p>
				<a href="https://scanner.vibeship.co" class="btn btn-green">
					Scan your calculations
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M5 12h14M12 5l7 7-7 7"/>
					</svg>
				</a>
			</div>
		</section>

		<!-- How to Fix -->
		<section class="article-section">
			<h2>How to fix integer overflow</h2>
			<p>
				Three strategies: validate bounds before arithmetic, use BigInt for large numbers, or use safe math libraries.
			</p>

			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>Copy this into your AI coding tool to find and fix overflow vulnerabilities:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Audit my codebase for integer overflow vulnerabilities.

## What to search for

1. Arithmetic on user-controlled values:
   - price * quantity
   - balance + deposit / - withdrawal
   - amount * rate
   - count + increment
   - index calculations

2. Search patterns:
   \`\`\`
   * quantity
   * price
   * amount
   * count
   parseInt(
   parseFloat(
   Number(
   | 0
   >>
   <<
   \`\`\`

3. Critical contexts:
   - Payment/checkout calculations
   - Token/currency amounts
   - Array index calculations
   - Loop counters from user input
   - Discount/promotion calculations

## Detection steps

For each arithmetic operation:
1. Can user control any operand?
2. Is there a maximum value check BEFORE the operation?
3. What happens if the result exceeds Number.MAX_SAFE_INTEGER?
4. Are there bitwise operations that truncate to 32-bit?

## Fixes to apply

### Option A: Validate bounds before arithmetic
\`\`\`typescript
const MAX_QUANTITY = 9999;
const MAX_PRICE_CENTS = 99999999; // $999,999.99

function safeMuliply(a: number, b: number, max: number): number {
  if (a < 0 || b < 0) throw new Error('Negative value');
  if (a > max || b > max) throw new Error('Value too large');

  const result = a * b;
  if (result > Number.MAX_SAFE_INTEGER) {
    throw new Error('Result overflow');
  }
  return result;
}
\`\`\`

### Option B: Use BigInt for large numbers
\`\`\`typescript
function calculateLargeTotal(items: CartItem[]): bigint {
  return items.reduce((total, item) => {
    const price = BigInt(item.price);
    const quantity = BigInt(item.quantity);
    return total + (price * quantity);
  }, BigInt(0));
}

// Convert back for display
const displayTotal = Number(total) / 100; // cents to dollars
\`\`\`

### Option C: Use integer cents, not float dollars
\`\`\`typescript
// WRONG: Float dollars (precision loss)
const price = 19.99;
const total = price * 3; // 59.970000000000006

// RIGHT: Integer cents
const priceCents = 1999;
const totalCents = priceCents * 3; // 5997 (exact)
const displayPrice = (totalCents / 100).toFixed(2); // "59.97"
\`\`\`

### Option D: Overflow-checking library
\`\`\`typescript
// Using safe-math or similar
import { safeAdd, safeMul } from 'safe-math';

const total = safeMul(price, quantity); // Throws on overflow
\`\`\`

## Maximum safe values for reference

| Type | Max Value |
|------|-----------|
| JS Number (safe) | 9007199254740991 (2^53-1) |
| 32-bit signed | 2147483647 |
| 32-bit unsigned | 4294967295 |
| Practical price max | 99999999 cents ($999,999.99) |
| Practical quantity max | 9999 |

## After fixing

1. Add input validation at API boundaries
2. Write tests with edge case values (0, -1, MAX, MAX+1)
3. Use TypeScript strict mode to catch type coercion
4. Consider BigInt for any financial calculations`}</div>
				</div>
			</div>

			<div class="fix-section">
				<h3>JavaScript-specific solutions</h3>
				<div class="solution-cards">
					<div class="solution-card">
						<h4>BigInt for large numbers</h4>
						<pre><code>{`const big = BigInt(9007199254740991);
const bigger = big + BigInt(2);
// 9007199254740993n (correct!)`}</code></pre>
					</div>
					<div class="solution-card">
						<h4>Integer cents for money</h4>
						<pre><code>{`// Store $19.99 as 1999 cents
const priceCents = 1999;
const qty = 3;
const total = priceCents * qty; // 5997`}</code></pre>
					</div>
					<div class="solution-card">
						<h4>Pre-operation bounds check</h4>
						<pre><code>{`if (a > Number.MAX_SAFE_INTEGER / b) {
  throw new Error('Would overflow');
}
const result = a * b;`}</code></pre>
					</div>
				</div>
			</div>
		</section>

		<!-- FAQ -->
		<section class="article-section">
			<h2>Frequently asked questions</h2>
			<div class="faq-list">
				{#each faqs as faq}
					<div class="faq-item">
						<h3>{faq.question}</h3>
						<p>{faq.answer}</p>
					</div>
				{/each}
			</div>
		</section>

		<!-- Related -->
		<section class="article-section">
			<h2>Related content</h2>
			<div class="related-grid">
				<a href="/kb/security/vulnerabilities/price-manipulation/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Price Manipulation</div>
					<p class="related-card-description">When payment amounts can be tampered</p>
				</a>
				<a href="/kb/security/vulnerabilities/business-logic-bypass/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Business Logic Bypass</div>
					<p class="related-card-description">Breaking application flow assumptions</p>
				</a>
				<a href="/kb/security/vulnerabilities/input-validation/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Input Validation</div>
					<p class="related-card-description">Validating all user input properly</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Numbers wrap. Prices shouldn't.</h2>
			<p>Find overflow vulnerabilities before they cost you.</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">
				Scan for overflows
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M5 12h14M12 5l7 7-7 7"/>
				</svg>
			</a>
		</div>
	</article>
</div>

<style>
	.badge-row {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1rem;
		flex-wrap: wrap;
	}

	.data-source {
		font-size: 0.75rem;
		color: var(--text-tertiary);
		margin: 0.5rem 0 1.5rem;
	}

	.data-source a {
		color: var(--text-secondary);
	}

	/* Code Comparison */
	.code-comparison {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.code-bad {
		border-left: 3px solid var(--red);
	}

	.code-good {
		border-left: 3px solid var(--green);
	}

	.code-label-bad,
	.code-label-good {
		font-size: 0.6875rem;
		padding: 0.125rem 0.5rem;
		text-transform: uppercase;
		font-weight: 600;
	}

	.code-label-bad {
		color: var(--red);
		background: rgba(255, 107, 107, 0.1);
	}

	.code-label-good {
		color: var(--green);
		background: rgba(0, 255, 136, 0.1);
	}

	/* Incident List */
	.incident-list {
		margin: 1.5rem 0;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.incident-item {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1rem 1.25rem;
		border-left: 3px solid var(--border);
	}

	.incident-critical {
		border-left-color: var(--red);
	}

	.incident-high {
		border-left-color: var(--orange);
	}

	.incident-company {
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 0.25rem;
	}

	.incident-details {
		font-size: 0.875rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	/* Detection Patterns */
	.detection-patterns {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.detection-patterns h3 {
		margin: 0 0 1rem;
		font-size: 1rem;
	}

	.pattern-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: 0.75rem;
	}

	.pattern-item {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.pattern-item code {
		background: var(--bg-tertiary);
		padding: 0.375rem 0.625rem;
		font-size: 0.8125rem;
		color: var(--orange);
	}

	.pattern-item span {
		font-size: 0.75rem;
		color: var(--text-tertiary);
	}

	/* CTA Box */
	.cta-box {
		background: var(--bg-secondary);
		border: 1px solid var(--green-dim);
		padding: 1.5rem;
		text-align: center;
		margin: 2rem 0;
	}

	.cta-box p {
		margin: 0 0 1rem;
		color: var(--text-primary);
	}

	/* Fix Sections */
	.fix-section {
		margin: 2rem 0;
	}

	.fix-section h3 {
		margin-bottom: 0.75rem;
	}

	/* Solution Cards */
	.solution-cards {
		display: grid;
		gap: 1rem;
		margin-top: 1rem;
	}

	.solution-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1rem 1.25rem;
	}

	.solution-card h4 {
		margin: 0 0 0.75rem;
		font-size: 0.9375rem;
		color: var(--text-primary);
	}

	.solution-card pre {
		margin: 0;
		background: var(--bg-tertiary);
		padding: 0.75rem;
		overflow-x: auto;
	}

	.solution-card code {
		font-size: 0.8125rem;
	}

	/* FAQ */
	.faq-list {
		margin-top: 1rem;
	}

	.faq-item {
		padding: 1.5rem 0;
		border-bottom: 1px solid var(--border);
	}

	.faq-item:last-child {
		border-bottom: none;
	}

	.faq-item h3 {
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
		font-size: 1.0625rem;
		font-weight: 600;
		margin: 0 0 0.5rem;
		color: var(--text-primary);
		line-height: 1.5;
	}

	.faq-item p {
		margin: 0;
		font-size: 0.9375rem;
		line-height: 1.7;
		color: var(--text-secondary);
	}

	/* Final CTA */
	.final-cta {
		text-align: center;
		padding: 3rem 2rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		margin-top: 3rem;
	}

	.final-cta h2 {
		margin-bottom: 0.75rem;
	}

	.final-cta p {
		color: var(--text-secondary);
		margin-bottom: 1.5rem;
		max-width: 500px;
		margin-left: auto;
		margin-right: auto;
	}

	@media (max-width: 768px) {
		.faq-item h3 {
			font-size: 1rem;
		}

		.pattern-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
