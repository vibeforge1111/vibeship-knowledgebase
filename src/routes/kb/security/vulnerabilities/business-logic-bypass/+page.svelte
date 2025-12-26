<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Business Logic Bypass: Find & Fix in AI-Generated Code',
		description: 'Business logic bypass lets attackers exploit flaws in your app\'s rules. Common in vibe coding. CWE-840. Fix prompts for Cursor, Bolt & Claude.',
		url: '/kb/security/vulnerabilities/business-logic-bypass/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Business Logic Bypass' }
	];

	// Real external data sources
	const referenceData = {
		cweId: 'CWE-840',
		cweSource: 'https://cwe.mitre.org/data/definitions/840.html',
		owaspCategory: 'Business Logic Vulnerabilities',
		owaspSource: 'https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/10-Business_Logic_Testing/README'
	};

	// FAQ data for schema
	const faqs = [
		{
			question: 'What is the difference between business logic bypass and input validation?',
			answer: 'Input validation stops malformed data (SQL injection, XSS). Business logic bypass exploits valid inputs used in unintended ways. A negative quantity passes input validation perfectly but breaks your pricing logic. Scanners catch bad input. They miss clever misuse of valid input. That difference is why business logic flaws require human review.'
		},
		{
			question: 'Why do AI coding tools create business logic vulnerabilities?',
			answer: 'AI tools optimize for "works in the happy path." They generate code that functions when users behave normally. Edge cases, abuse scenarios, and adversarial thinking fall outside their training. When you vibe code a checkout flow, the AI builds what a legitimate customer would use. It does not consider what a fraudster would try.'
		},
		{
			question: 'Can automated scanners detect business logic bypass?',
			answer: 'Not reliably. Traditional scanners look for known vulnerability patterns like SQL injection signatures. Business logic flaws are unique to each application. A scanner cannot know that your app should reject orders where quantity exceeds inventory. Manual code review, threat modeling, and security testing by humans remain essential.'
		},
		{
			question: 'What are the most common business logic bypass patterns in e-commerce?',
			answer: 'Price manipulation (negative values, zero prices), quantity abuse (ordering more than inventory), coupon stacking (applying discounts meant to be exclusive), race conditions (using the same credit multiple times), and checkout flow skipping (jumping to confirmation without payment). Each bypasses intended business rules while using technically valid inputs.'
		},
		{
			question: 'How do I prevent business logic bypass in my vibe coded app?',
			answer: 'Server-side validation for every assumption. Never trust client-side calculations. Validate state transitions (user must complete step 2 before step 3). Add integrity checks for financial calculations. Test with adversarial mindset: what would a fraudster try? Review AI-generated code for implicit assumptions about user behavior.'
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

	<!-- BreadcrumbList Schema -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"itemListElement": [
			{"@type": "ListItem", "position": 1, "name": "Knowledge Base", "item": "https://vibeship.co/kb"},
			{"@type": "ListItem", "position": 2, "name": "Security", "item": "https://vibeship.co/kb/security"},
			{"@type": "ListItem", "position": 3, "name": "Vulnerabilities", "item": "https://vibeship.co/kb/security/vulnerabilities"},
			{"@type": "ListItem", "position": 4, "name": "Business Logic Bypass"}
		]
	}
	</script>`}

	<!-- Schema.org structured data -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "TechArticle",
		"headline": "${meta.title}",
		"description": "${meta.description}",
		"author": {
			"@type": "Organization",
			"name": "VibeShip"
		},
		"publisher": {
			"@type": "Organization",
			"name": "VibeShip",
			"logo": {
				"@type": "ImageObject",
				"url": "https://vibeship.co/logo.png"
			}
		},
		"datePublished": "2025-12-26",
		"dateModified": "2025-12-26"
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
			"acceptedAnswer": {
				"@type": "Answer",
				"text": faq.answer
			}
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
				<span class="badge badge-high">High</span>
				<span class="badge">CWE-840</span>
				<span class="badge">Business Logic</span>
			</div>
			<h1>Business Logic Bypass in Vibe Coded Apps</h1>
			<p class="text-secondary">How attackers exploit your app's own rules to steal money, inventory, and access</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Business logic bypass happens when attackers abuse your application's intended workflows in unintended ways.</strong>
				They add negative quantities to get refunds for products they never bought. They apply the same coupon code 50 times. They skip the payment step and land on the order confirmation page. No SQL injection needed. Just clever misuse of valid inputs. AI coding tools generate these vulnerabilities constantly because they optimize for happy-path functionality, not adversarial abuse.
			</p>
		</div>

		<!-- Stats Box -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">{referenceData.cweId}</div>
				<div class="stat-label"><a href={referenceData.cweSource}>CWE ID</a></div>
			</div>
			<div class="stat-box">
				<div class="stat-value">High</div>
				<div class="stat-label">Severity</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Low</div>
				<div class="stat-label">Detection Rate</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">$$$</div>
				<div class="stat-label">Financial Impact</div>
			</div>
		</div>
		<p class="data-source">
			Source: <a href={referenceData.owaspSource}>OWASP Business Logic Testing Guide</a>
		</p>

		<!-- What Is It - @breachlore voice (historian, storytelling) -->
		<section class="article-section">
			<h2>What is business logic bypass?</h2>
			<p>
				December 2010. Citigroup. Attackers discovered they could iterate through account numbers in the URL and access other customers' statements. No SQL injection. No buffer overflow. Just changing a number in the browser's address bar. The breach exposed 360,000 accounts.
			</p>
			<p>
				Business logic bypass exploits flaws in how an application enforces its own rules. The code works exactly as written. The problem is what the code fails to check. An e-commerce site calculates totals on the client side? Attackers send modified totals to the server. A checkout flow assumes users complete steps in order? Attackers jump directly to confirmation. A coupon system trusts that codes are used once? Attackers race the same code against itself.
			</p>
			<p>
				Traditional vulnerabilities like <a href="/kb/security/vulnerabilities/sql-injection/">SQL injection</a> break how code processes data. Business logic vulnerabilities break how the application models reality. According to <a href="https://cwe.mitre.org/data/definitions/840.html">CWE-840</a>, these flaws occur when "the software does not properly implement application-specific business rules." The rules exist in the developer's mind. They never made it into the code.
			</p>
		</section>

		<!-- AI Tool Patterns - @breachlore voice -->
		<section class="article-section">
			<h2>How do AI tools cause business logic bypass?</h2>
			<p>
				In 1999, an online retailer discovered customers ordering -1 televisions and receiving refund credits. That pattern is older than the vibe coders using it today. AI coding tools have simply automated its reproduction.
			</p>

			<div class="tool-patterns-box">
				<h3>The pattern behind most business logic flaws</h3>
				<p>Ask any AI tool for an e-commerce cart. This is what you get:</p>
				<div class="code-block">
					<pre><code>{`// AI-generated checkout - optimized for the happy path
async function processOrder(cart, paymentInfo) {
  const total = cart.items.reduce((sum, item) =>
    sum + (item.price * item.quantity), 0
  );

  await chargePayment(paymentInfo, total);
  await createOrder(cart);
  return { success: true };
}

// What's missing:
// - No validation that quantities are positive
// - No check that prices match database values
// - No verification that payment actually succeeded
// - No inventory check before order creation`}</code></pre>
				</div>
				<p class="pattern-note">
					The code functions perfectly when users behave normally. It fails catastrophically when they do not. AI generates what works, not what is safe.
				</p>
			</div>

			<p>
				<strong>The historical pattern:</strong> 2014, Uber's promotion system allowed riders to apply the same promotional code multiple times during high-demand periods. 2018, a major airline's booking system let users skip the seat selection step and land on confirmation with unassigned seats at zero cost. 2021, a DeFi protocol lost $34 million when flash loans exploited assumptions about transaction ordering.
			</p>
			<p>
				Different applications. Different decades. Same vulnerability class. AI tools regenerate these patterns because their training data contains more working code than secure code. When vibe coders prompt for a checkout flow, they receive one that ships. They do not receive one that resists abuse.
			</p>
		</section>

		<!-- What Could Happen -->
		<section class="article-section">
			<h2>What could happen if I have business logic bypass?</h2>
			<p>
				The 2011 Bitcoin exchange breach did not require sophisticated hacking. Attackers exploited a race condition in the withdrawal system, requesting the same withdrawal multiple times before the balance updated. They drained accounts faster than the system could reconcile.
			</p>
			<ul class="consequences-list">
				<li><strong>Price manipulation:</strong> In 2022, researchers demonstrated ordering $500 products for $0 by modifying client-side price calculations. The server trusted what the browser sent. The company's fraud detection looked for stolen cards, not modified totals.</li>
				<li><strong>Coupon abuse:</strong> A major fast-food chain's app allowed the same one-time coupon to be applied by automating requests faster than the validation could process. Thousands of free meals before detection.</li>
				<li><strong>Inventory exploitation:</strong> Attackers order all available inventory at once, then selectively cancel, manipulating availability for competitors or extracting discounts for "inconvenience."</li>
				<li><strong>Account takeover through password reset:</strong> If the reset flow skips email verification under certain conditions, attackers gain access through intended functionality. The reset feature works. The security does not.</li>
				<li><strong>Privilege escalation:</strong> User modifies their role field in an API request. The endpoint accepts valid JSON. It does not check authorization. Admin access granted through normal functionality.</li>
			</ul>
			<p>
				Unlike SQL injection, these attacks leave clean logs. The requests look legitimate. The damage appears days or weeks later in financial reconciliation.
			</p>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How do I detect business logic bypass?</h2>
			<p>
				Automated scanners miss these. The Equifax breach involved a technical vulnerability. Business logic flaws involve valid inputs and intended functionality. Detection requires thinking like a fraudster, not running a tool.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Patterns to search for</span>
				</div>
				<pre><code>{`// Trust in client-side calculations (DANGEROUS)
const total = req.body.total;  // Sent from browser
await charge(paymentId, total);

// Missing state validation (DANGEROUS)
if (req.body.step === 'confirm') {
  await createOrder();  // Did they complete payment step?
}

// No negative number checks (DANGEROUS)
const quantity = parseInt(req.body.quantity);
const subtotal = price * quantity;  // quantity = -5 gives refund

// Single-use tokens without tracking (DANGEROUS)
if (couponCodes.includes(code)) {
  applyDiscount();  // Can be used repeatedly until deleted
}

// Race condition vulnerable patterns (DANGEROUS)
const balance = await getBalance(userId);
if (balance >= amount) {
  await withdraw(userId, amount);
  // Another request wins this race
}`}</code></pre>
			</div>

			<div class="cta-box">
				<p><strong>Need help finding these patterns?</strong></p>
				<a href="https://scanner.vibeship.co" class="btn btn-green">
					Scan your code free
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M5 12h14M12 5l7 7-7 7"/>
					</svg>
				</a>
			</div>
		</section>

		<!-- How to Fix -->
		<section class="article-section">
			<h2>How do I fix business logic bypass?</h2>
			<p>
				The fix requires encoding business rules into code that cannot be circumvented. Every assumption about user behavior becomes an explicit validation. Every calculation happens server-side. Every state transition is verified.
			</p>

			<!-- AI Fix Prompt -->
			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>This prompt identifies business logic vulnerabilities in AI-generated code. Copy it into Cursor, Claude Code, or Bolt:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Fix all business logic bypass vulnerabilities in my codebase.

## What to look for

Search for these dangerous patterns:

1. Client-side trust:
   - Prices, totals, or discounts sent from the browser
   - User role or permission data from client requests
   - State or step information from form submissions

2. Missing validation:
   - Quantities that could be negative or zero
   - Prices that could be modified before checkout
   - Coupons without single-use enforcement
   - Order flows without step completion verification

3. Race conditions:
   - Balance checks followed by withdrawals without locks
   - Inventory checks without reservation before order
   - Coupon validation without atomic usage tracking

4. State manipulation:
   - Endpoints that accept step/state parameters
   - Checkout flows accessible without prior steps
   - Role or permission changes via user input

## How to fix

### For price/total calculations:
\`\`\`javascript
// Before (vulnerable - trusts client)
const total = req.body.total;
await chargePayment(total);

// After (secure - recalculates server-side)
const cart = await getCart(userId);
const total = cart.items.reduce((sum, item) => {
  const product = await getProduct(item.productId);
  return sum + (product.price * Math.max(0, item.quantity));
}, 0);
await chargePayment(total);
\`\`\`

### For quantity validation:
\`\`\`javascript
// Before (vulnerable - allows negative)
const quantity = parseInt(req.body.quantity);
const subtotal = price * quantity;

// After (secure - validates range)
const quantity = Math.max(1, Math.min(100, parseInt(req.body.quantity) || 1));
const product = await getProduct(productId);
if (quantity > product.inventory) {
  throw new Error('Insufficient inventory');
}
\`\`\`

### For coupon single-use:
\`\`\`javascript
// Before (vulnerable - race condition)
if (await isValidCoupon(code)) {
  applyDiscount();
  await markCouponUsed(code);
}

// After (secure - atomic operation)
const result = await db.transaction(async (tx) => {
  const coupon = await tx.coupon.update({
    where: { code, usedAt: null },
    data: { usedAt: new Date(), usedBy: userId }
  });
  if (!coupon) throw new Error('Coupon invalid or already used');
  return coupon;
});
\`\`\`

### For checkout flow enforcement:
\`\`\`javascript
// Before (vulnerable - step skipping)
if (req.body.step === 'confirm') {
  await createOrder();
}

// After (secure - session state verification)
const session = await getCheckoutSession(userId);
if (session.currentStep !== 'payment' || !session.paymentVerified) {
  throw new Error('Complete previous steps first');
}
await advanceToStep(session, 'confirm');
await createOrder();
\`\`\`

## After fixing

1. Review all financial calculations for server-side enforcement
2. Add transaction boundaries around balance/inventory operations
3. Implement session-based state tracking for multi-step flows
4. Add monitoring for anomalous patterns (bulk orders, rapid retries)
5. List all files modified with before/after snippets

Please proceed systematically through my codebase.`}</div>
				</div>
			</div>

			<!-- Manual Fix -->
			<div class="fix-section">
				<h3>Manual Fix</h3>
				<p>The core principle: never trust the client for anything consequential.</p>

				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-block-header">
							<span class="code-block-lang status-bad">VULNERABLE</span>
						</div>
						<pre><code>{`// Trusts client-side price calculation
async function checkout(req) {
  const { items, total, couponCode } = req.body;

  if (couponCode && validCoupons.includes(couponCode)) {
    total = total * 0.8; // 20% off
  }

  await chargeCard(req.body.paymentToken, total);
  await createOrder(items, total);

  return { success: true, orderId: order.id };
}

// Attacker sends: { items: [...], total: 0.01 }
// Server charges $0.01 for $500 worth of products`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-block-header">
							<span class="code-block-lang status-good">SECURE</span>
						</div>
						<pre><code>{`// Recalculates everything server-side
async function checkout(req) {
  const { items, couponCode } = req.body;

  // Validate and price each item from database
  let total = 0;
  for (const item of items) {
    const product = await getProduct(item.productId);
    if (!product) throw new Error('Invalid product');
    if (item.quantity < 1 || item.quantity > product.maxPerOrder) {
      throw new Error('Invalid quantity');
    }
    if (item.quantity > product.inventory) {
      throw new Error('Insufficient inventory');
    }
    total += product.price * item.quantity;
  }

  // Atomic coupon validation and usage
  if (couponCode) {
    total = await applyCouponAtomically(couponCode, userId, total);
  }

  await chargeCard(req.body.paymentToken, total);
  await createOrderWithInventoryReservation(items, total);

  return { success: true };
}`}</code></pre>
					</div>
				</div>

				<p>
					<strong>What changed:</strong> The server now controls every calculation. Prices come from the database, not the request. Quantities are validated against business rules. Coupons are applied atomically to prevent race conditions. The client's role becomes presentation only.
				</p>
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
					<p class="related-card-description">When attackers modify prices in transit</p>
				</a>
				<a href="/kb/security/vulnerabilities/bola/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Broken Object-Level Authorization</div>
					<p class="related-card-description">Accessing resources you should not own</p>
				</a>
				<a href="/kb/security/vulnerabilities/bfla/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Broken Function-Level Authorization</div>
					<p class="related-card-description">Calling functions you should not access</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Find these before a fraudster does</h2>
			<p>Business logic flaws hide in plain sight. Your code works. Your assumptions do not.</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">
				Scan your code now
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M5 12h14M12 5l7 7-7 7"/>
				</svg>
			</a>
		</div>
	</article>
</div>

<style>
	/* Badge row */
	.badge-row {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1rem;
		flex-wrap: wrap;
	}

	/* Data Source Attribution */
	.data-source {
		font-size: 0.75rem;
		color: var(--text-tertiary);
		margin: 0.5rem 0 1.5rem;
	}

	.data-source a {
		color: var(--text-secondary);
	}

	/* Tool Patterns Box */
	.tool-patterns-box {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.tool-patterns-box h3 {
		margin: 0 0 0.75rem;
		font-size: 1rem;
	}

	.tool-patterns-box > p {
		margin: 0 0 1rem;
		color: var(--text-secondary);
	}

	.pattern-note {
		margin: 1rem 0 0 !important;
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	/* Consequences List */
	.consequences-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.consequences-list li {
		padding: 0.75rem 0;
		border-bottom: 1px solid var(--border);
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.consequences-list li:last-child {
		border-bottom: none;
	}

	.consequences-list strong {
		color: var(--text-primary);
	}

	/* Fix Sections */
	.fix-section {
		margin: 2rem 0;
	}

	.fix-section h3 {
		margin-bottom: 0.75rem;
	}

	/* Code Comparison */
	.code-comparison {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.code-block.vulnerable {
		border-left: 3px solid var(--red);
	}

	.code-block.secure {
		border-left: 3px solid var(--green);
	}

	.status-bad {
		color: var(--red);
	}

	.status-good {
		color: var(--green);
	}
</style>
