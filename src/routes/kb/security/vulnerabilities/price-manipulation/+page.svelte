<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Price Manipulation: E-Commerce Vulnerabilities in AI Code',
		description: 'Price manipulation lets attackers buy products for $0.01 by tampering with client-side prices. Common in vibe coded e-commerce. CWE-20. Fix prompts for Cursor, Bolt & Claude.',
		url: '/kb/security/vulnerabilities/price-manipulation/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Price Manipulation' }
	];

	// Real external data sources
	const owaspData = {
		category: 'A04:2021 - Insecure Design',
		source: 'https://owasp.org/Top10/A04_2021-Insecure_Design/',
		cweId: 'CWE-20',
		cweSource: 'https://cwe.mitre.org/data/definitions/20.html'
	};

	// Real HackerOne examples
	const hackerOneExamples = [
		{
			id: '#17502',
			title: 'PayPal price manipulation',
			impact: 'Products purchased for $0.01',
			url: 'https://hackerone.com/reports/17502'
		},
		{
			id: '#364843',
			title: 'Negative quantity attack',
			impact: 'Free products via negative pricing',
			url: 'https://hackerone.com/reports/364843'
		},
		{
			id: '#388564',
			title: 'Fractional quantity exploit',
			impact: 'Products purchased using 0.01 quantity',
			url: 'https://hackerone.com/reports/388564'
		},
		{
			id: '#218748',
			title: 'Hidden field tampering',
			impact: 'Client-side price override to $0',
			url: 'https://hackerone.com/reports/218748'
		}
	];

	// FAQ data for schema
	const faqs = [
		{
			question: 'Can attackers really change prices in my e-commerce app?',
			answer: 'Yes. If your checkout flow trusts prices sent from the browser, attackers just open DevTools, change the price to $0.01, and complete the purchase. This happens constantly. HackerOne has hundreds of reports where researchers bought products for pennies. The pattern is everywhere in vibe coded e-commerce because AI tools generate "working" checkout flows that calculate totals client-side.'
		},
		{
			question: 'What is a negative quantity attack?',
			answer: 'Attackers send a negative quantity like -5 for an expensive product. If your code doesn\'t validate, it adds -$500 to the cart total. Then they add a cheap item for +$5. Cart total: -$495. Some payment systems interpret this as a credit. They get paid to "buy" from you. Or the total rounds to $0 and the order goes through free. Real vulnerability, real losses.'
		},
		{
			question: 'How does currency manipulation work?',
			answer: 'Attacker changes the currency code from USD to INR (rupees) client-side. Your backend sees currency: "INR" and price: 100, charges their card 100 INR (about $1.20), but ships a $100 product. Or they switch currencies mid-checkout after price calculation. If you\'re not recalculating server-side in the correct currency, you\'re vulnerable.'
		},
		{
			question: 'Why do AI coding tools create price manipulation vulnerabilities?',
			answer: 'Because AI optimizes for "checkout flow works" not "checkout flow is secure." Calculating cart totals in the browser is simpler code. Sending the total to the backend is one variable instead of serializing the entire cart. The AI gives you working code. The fact that attackers can edit that total in DevTools before sending it? The model doesn\'t consider that. Every major tool (Cursor, Bolt, v0, Claude Code) generates this pattern by default.'
		},
		{
			question: 'What is an integer overflow price attack?',
			answer: 'Send a quantity so large (like 999999999) that the price calculation overflows and wraps to $0 or a negative number. Depends on your language and data types. In some systems, multiplying price * massive quantity exceeds the integer limit and the result becomes zero or negative. Then the attacker checks out for free. Rare but real. Validate maximum quantities.'
		},
		{
			question: 'How quickly can someone exploit price manipulation?',
			answer: 'Under 30 seconds. Open DevTools, find the price field in the POST request, change 49.99 to 0.01, replay the request. No special tools needed. This is script kiddie level exploitation. By the time you notice revenue looks wrong, they\'ve already received the shipment. Chargebacks won\'t help because you authorized the transaction.'
		},
		{
			question: 'Can coupon stacking be a security issue?',
			answer: 'Yes. If your code doesn\'t check for duplicate coupon usage or conflicting discounts, attackers stack multiple codes to drive the price negative or to zero. They apply a 50% off code, a $20 off code, and a free shipping code to a $25 product. If you\'re not validating one-coupon-per-order or checking final price >= 0, they get paid to shop. This is business logic bypass, not just a pricing bug.'
		},
		{
			question: 'What are race condition checkout attacks?',
			answer: 'Attacker sends multiple checkout requests simultaneously for a one-time coupon or limited inventory item. If your backend doesn\'t use proper locking, all requests might succeed. They use a 50%-off code five times on five orders before your system marks it used. Or they buy 10 units of a product with only 2 in stock. Race conditions in e-commerce checkout are critical severity because they directly cause revenue loss.'
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
			{"@type": "ListItem", "position": 4, "name": "Price Manipulation"}
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
			"name": "Vibeship"
		},
		"publisher": {
			"@type": "Organization",
			"name": "Vibeship",
			"logo": {
				"@type": "ImageObject",
				"url": "https://vibeship.co/logo.png"
			}
		},
		"datePublished": "2025-12-25",
		"dateModified": "2025-12-25"
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
				<span class="badge badge-critical">Critical</span>
				<span class="badge">CWE-20</span>
				<span class="badge">OWASP A04:2021</span>
			</div>
			<h1>Price Manipulation in Vibe Coded E-Commerce</h1>
			<p class="text-secondary">How attackers buy products for $0.01 by tampering with client-side prices and quantities</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Price manipulation happens when your checkout flow trusts prices sent from the browser instead of calculating them server-side.</strong>
				Attackers open DevTools, change the price to $0.01, and complete the purchase. Or they send negative quantities, manipulate currency codes, or exploit race conditions.
				It's classified as <a href="https://owasp.org/Top10/A04_2021-Insecure_Design/">OWASP A04:2021 - Insecure Design</a> and is extremely common in vibe coded e-commerce apps because AI tools generate vulnerable checkout flows by default.
			</p>
		</div>

		<!-- Stats Box -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">400+</div>
				<div class="stat-label">HackerOne Reports</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">{owaspData.cweId}</div>
				<div class="stat-label"><a href={owaspData.cweSource}>CWE ID</a></div>
			</div>
			<div class="stat-box">
				<div class="stat-value">6 Types</div>
				<div class="stat-label">Attack Vectors</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Critical</div>
				<div class="stat-label">Severity</div>
			</div>
		</div>
		<p class="data-source">
			Source: <a href={owaspData.source}>OWASP Top 10 (2021)</a> · <a href="https://hackerone.com/hacktivity?querystring=price%20manipulation">HackerOne Price Manipulation Reports</a>
		</p>

		<!-- What Is It -->
		<section class="article-section">
			<h2>What is price manipulation?</h2>
			<p>
				Price manipulation is what happens when you calculate prices in the browser and trust those calculations on the server.
				An attacker modifies the price before checkout, your backend processes it without recalculating, and they walk away with products for pennies.
				This isn't theoretical. <a href="https://hackerone.com/hacktivity?querystring=price">HackerOne has hundreds of validated reports</a> where researchers exploited this exact pattern.
			</p>
			<p>
				The vulnerability lives at the intersection of frontend convenience and backend trust. Vibe coders ask AI for a checkout flow.
				The AI generates code that works: add items to cart, calculate total in React, send total to API, charge the card.
				Clean code. One problem: the customer controls that total. They can edit it to anything.
			</p>
			<p>
				According to <a href="https://owasp.org/Top10/A04_2021-Insecure_Design/">OWASP A04:2021</a>, this falls under Insecure Design.
				Not a bug in implementation. A flaw in the architecture. The code does exactly what it was designed to do.
				The design itself is broken. And when AI tools vibe code your e-commerce platform, insecure design is the default.
			</p>
		</section>

		<!-- Real Examples -->
		<section class="article-section">
			<h2>Real-world price manipulation attacks</h2>
			<p>
				These aren't hypothetical. Every example below is a validated HackerOne report where researchers demonstrated real exploitation:
			</p>

			<div class="card-grid">
				{#each hackerOneExamples as example}
					<div class="feature-card">
						<div class="example-header">
							<span class="example-id">{example.id}</span>
							<a href={example.url} class="example-link">View Report</a>
						</div>
						<h3>{example.title}</h3>
						<p class="example-impact"><strong>Impact:</strong> {example.impact}</p>
					</div>
				{/each}
			</div>

			<p class="examples-note">
				Source: <a href="https://hackerone.com/hacktivity">HackerOne Disclosed Reports</a> · These are just the public ones. Most companies pay bounties and keep reports private.
			</p>
		</section>

		<!-- 6 Attack Types -->
		<section class="article-section">
			<h2>6 types of price manipulation attacks</h2>
			<p>
				Price manipulation isn't one vulnerability. It's a category. Here are the six most common attack vectors security researchers use to exploit vibe coded e-commerce:
			</p>

			<div class="faq-list">
				<div class="faq-item">
					<h3>1. Client-side price modification</h3>
					<p>
						The classic. Attacker opens DevTools, finds the hidden form field with <code>price="49.99"</code>, changes it to <code>price="0.01"</code>, submits the form.
						Backend sees <code>price: 0.01</code> in the POST body and processes it. They just bought a $50 product for a penny.
					</p>
					<p class="attack-example">
						<strong>Example payload:</strong> <code>POST /checkout &#123; "productId": "abc123", "price": 0.01, "quantity": 1 &#125;</code>
					</p>
				</div>

				<div class="faq-item">
					<h3>2. Negative quantity attack</h3>
					<p>
						Attacker sends <code>quantity: -5</code> for an expensive item. If your code does <code>price * quantity</code> without validation, the math is <code>$100 * -5 = -$500</code>.
						Add a cheap item for +$5. Cart total: -$495. Some payment gateways process this. The attacker gets paid to shop.
					</p>
					<p class="attack-example">
						<strong>Example payload:</strong> <code>POST /cart &#123; "productId": "expensive", "quantity": -5 &#125;</code>
					</p>
				</div>

				<div class="faq-item">
					<h3>3. Integer overflow exploit</h3>
					<p>
						Send a quantity like <code>999999999</code>. In some languages, <code>price * 999999999</code> exceeds the integer limit and wraps to zero or negative.
						The cart total becomes $0. Checkout succeeds. This depends on your stack (JavaScript handles big numbers differently than older systems), but it's real.
					</p>
					<p class="attack-example">
						<strong>Example payload:</strong> <code>POST /cart &#123; "productId": "abc", "quantity": 2147483647 &#125;</code>
					</p>
				</div>

				<div class="faq-item">
					<h3>4. Currency manipulation</h3>
					<p>
						Attacker intercepts the checkout request and changes <code>currency: "USD"</code> to <code>currency: "INR"</code> (Indian Rupees).
						Backend sees <code>price: 100, currency: "INR"</code> and charges 100 rupees ($1.20 USD). Product was supposed to cost $100. You just lost $98.80 per order.
					</p>
					<p class="attack-example">
						<strong>Example payload:</strong> <code>POST /checkout &#123; "total": 100, "currency": "INR" &#125;</code>
					</p>
				</div>

				<div class="faq-item">
					<h3>5. Coupon stacking abuse</h3>
					<p>
						Apply multiple discount codes that shouldn't stack. <code>SAVE50</code> (50% off) + <code>FREESHIP</code> + <code>EXTRA20</code> (20% off).
						If your backend doesn't enforce "one coupon per order" or validate the final total is positive, attackers drive the price to zero or negative.
					</p>
					<p class="attack-example">
						<strong>Example payload:</strong> <code>POST /checkout &#123; "coupons": ["SAVE50", "EXTRA20", "FREESHIP"] &#125;</code>
					</p>
				</div>

				<div class="faq-item">
					<h3>6. Race condition in checkout</h3>
					<p>
						Send 10 simultaneous checkout requests with the same one-time-use 90%-off coupon. If your backend doesn't use proper locking, all 10 requests succeed before the coupon is marked as used.
						Attacker places 10 orders at 90% off when they should only get one. This is <code>TOCTOU</code> (time-of-check-time-of-use) in e-commerce.
					</p>
					<p class="attack-example">
						<strong>Example attack:</strong> 10 parallel requests to <code>POST /checkout</code> with <code>coupon: "WELCOME90"</code>
					</p>
				</div>
			</div>
		</section>

		<!-- AI Tool Patterns -->
		<section class="article-section">
			<h2>How do AI tools cause price manipulation?</h2>
			<p>
				Every major AI coding tool generates this vulnerability. Not because the tools are broken.
				Because the training data is full of insecure patterns, and "calculate total client-side" is simpler code than "recalculate server-side."
				AI optimizes for working code, not secure code.
			</p>

			<div class="tool-risk-table">
				<h3>AI Tool Risk Levels</h3>
				<div class="table-wrapper">
					<table>
						<thead>
							<tr>
								<th>Tool</th>
								<th>Risk Level</th>
								<th>Why</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><strong>Bolt</strong></td>
								<td><span class="badge badge-critical">Critical</span></td>
								<td>Generates "ready to run" checkout flows with hardcoded prices in forms. No server-side validation by default.</td>
							</tr>
							<tr>
								<td><strong>Cursor</strong></td>
								<td><span class="badge badge-high">High</span></td>
								<td>Creates React checkout components that calculate totals in useState and send to backend. Trusts client total.</td>
							</tr>
							<tr>
								<td><strong>v0</strong></td>
								<td><span class="badge badge-high">High</span></td>
								<td>UI-focused generation. Beautiful checkout forms, prices in hidden fields. Backend security is "exercise for later."</td>
							</tr>
							<tr>
								<td><strong>Claude Code</strong></td>
								<td><span class="badge badge-medium">Medium-High</span></td>
								<td>Better at full-stack, but still defaults to client-calculated totals unless explicitly prompted for server-side validation.</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<div class="alert alert-danger">
				<div class="alert-title">The vulnerable pattern every tool generates</div>
				<p>Ask any AI: "Create a checkout flow for my e-commerce app." You'll get this:</p>

				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">React Component (Frontend)</span>
					</div>
					<pre><code>{`// Cursor, Bolt, v0, Claude Code - all generate this pattern
function Checkout({ cart }) {
  const total = cart.reduce((sum, item) =>
    sum + (item.price * item.quantity), 0
  )

  const handleCheckout = async () => {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify({
        items: cart,
        total: total  // ⚠️ TRUSTING CLIENT-CALCULATED TOTAL
      })
    })
  }

  return <button onClick={handleCheckout}>Pay \${total}</button>
}`}</code></pre>
				</div>

				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">API Route (Backend)</span>
					</div>
					<pre><code>{`// The backend just trusts what the client sent
export default async function handler(req, res) {
  const { items, total } = req.body

  // ⚠️ NO PRICE RECALCULATION
  const payment = await stripe.charges.create({
    amount: total * 100,
    currency: 'usd'
  })

  res.json({ success: true })
}`}</code></pre>
				</div>

				<p class="pattern-note">
					Looks clean. Works perfectly in development. Also completely vulnerable.
					An attacker just needs to intercept the request and change <code>"total": 99.99</code> to <code>"total": 0.01</code>.
					Stripe processes it. You ship a $100 product for a penny.
				</p>
			</div>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How do I detect price manipulation vulnerabilities?</h2>
			<p>
				Security audits start by tracing data flow from checkout button to payment processing.
				If the price touches the client at any point before the charge, you're vulnerable. Here's what to search for:
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Dangerous Patterns to Search For</span>
				</div>
				<pre><code>{`// 1. Price/total sent from client in POST body
fetch('/api/checkout', {
  body: JSON.stringify({ total: calculatedTotal })  // ⚠️ DANGEROUS
})

// 2. Hidden form fields with prices
<input type="hidden" name="price" value="49.99" />  // ⚠️ DANGEROUS

// 3. API routes that accept price/total from request
const { total } = req.body  // ⚠️ DANGEROUS if used directly

// 4. No server-side price lookup
// Backend doesn't query database for current product price

// 5. Quantity not validated
const amount = req.body.quantity * productPrice  // ⚠️ No check if quantity < 0

// Regex patterns to grep for:
// (total|price|amount).*req\\.body
// JSON\\.stringify.*total
// input.*type="hidden".*price`}</code></pre>
			</div>

			<div class="cta-box">
				<p><strong>Audit entire codebase automatically</strong></p>
				<a href="https://scanner.vibeship.co" class="btn btn-green">
					Scan for price manipulation
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M5 12h14M12 5l7 7-7 7"/>
					</svg>
				</a>
			</div>
		</section>

		<!-- How to Fix -->
		<section class="article-section">
			<h2>How do I fix price manipulation?</h2>
			<p>
				The fix is architectural: never trust client-sent prices. Calculate everything server-side from authoritative data (your database).
				Accept only product IDs and quantities from the client. Look up prices server-side. Validate quantities. Recalculate totals.
				Then charge. That's it. Here's how.
			</p>

			<!-- AI Fix Prompt -->
			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>Copy this prompt into Cursor, Claude Code, or Bolt to fix all price manipulation vulnerabilities in your checkout flow:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Fix all price manipulation vulnerabilities in my e-commerce checkout flow.

## Core Security Principle

NEVER trust prices, totals, or discounts sent from the client. The server must recalculate everything from authoritative sources (database).

## What to Look For

Search for these dangerous patterns:

1. **Client-sent prices/totals in API requests:**
   - \`const { total } = req.body\` then charging that amount
   - \`const { price, quantity } = req.body\` then multiplying
   - Hidden form fields with prices
   - Stripe/PayPal amounts from req.body

2. **No server-side price lookup:**
   - Backend doesn't query database for current product prices
   - Prices hardcoded in frontend components
   - Cart totals calculated only client-side

3. **Missing input validation:**
   - Quantity not checked for negative values
   - Quantity not capped at reasonable maximum (e.g., 100)
   - No validation that final total > 0

## How to Fix

Replace ALL instances of client-sent prices with server-side calculation:

### Before (Vulnerable)
\`\`\`typescript
// Frontend calculates and sends total
const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
await fetch('/api/checkout', {
  method: 'POST',
  body: JSON.stringify({ cart, total })  // ⚠️ TRUSTING CLIENT
})

// Backend just uses it
export async function POST(req) {
  const { total } = await req.json()
  const charge = await stripe.charges.create({
    amount: total * 100  // ⚠️ DANGEROUS
  })
}
\`\`\`

### After (Secure)
\`\`\`typescript
// Frontend sends only product IDs and quantities
const cartItems = cart.map(item => ({
  productId: item.id,
  quantity: item.quantity
}))
await fetch('/api/checkout', {
  method: 'POST',
  body: JSON.stringify({ items: cartItems })  // ✓ NO PRICES
})

// Backend recalculates everything
export async function POST(req) {
  const { items } = await req.json()

  // 1. Validate quantities
  for (const item of items) {
    if (item.quantity < 1 || item.quantity > 100) {
      return Response.json({ error: 'Invalid quantity' }, { status: 400 })
    }
  }

  // 2. Look up current prices from database
  const productIds = items.map(i => i.productId)
  const products = await db.product.findMany({
    where: { id: { in: productIds } }
  })

  // 3. Calculate total server-side
  let total = 0
  for (const item of items) {
    const product = products.find(p => p.id === item.productId)
    if (!product) {
      return Response.json({ error: 'Product not found' }, { status: 404 })
    }
    total += product.price * item.quantity
  }

  // 4. Validate total is positive
  if (total <= 0) {
    return Response.json({ error: 'Invalid total' }, { status: 400 })
  }

  // 5. NOW charge the recalculated amount
  const charge = await stripe.charges.create({
    amount: Math.round(total * 100)
  })
}
\`\`\`

## Session-Based Cart (Best Practice)

Instead of client-side cart state, store cart server-side in session or database:

\`\`\`typescript
// Add to cart - stores in session/DB
export async function POST(req) {
  const session = await getSession(req)
  const { productId, quantity } = await req.json()

  // Validate quantity
  if (quantity < 1 || quantity > 100) {
    return Response.json({ error: 'Invalid quantity' }, { status: 400 })
  }

  await db.cartItem.create({
    data: {
      sessionId: session.id,
      productId,
      quantity
    }
  })
}

// Checkout - recalculates from session cart
export async function POST(req) {
  const session = await getSession(req)
  const cartItems = await db.cartItem.findMany({
    where: { sessionId: session.id },
    include: { product: true }
  })

  // Calculate total from DB prices
  const total = cartItems.reduce((sum, item) =>
    sum + (item.product.price * item.quantity), 0
  )

  if (total <= 0) {
    return Response.json({ error: 'Invalid cart' }, { status: 400 })
  }

  const charge = await stripe.charges.create({
    amount: Math.round(total * 100)
  })
}
\`\`\`

## Additional Validations

1. **Currency validation:** Never trust \`currency\` from client. Set server-side based on business logic.
2. **Coupon validation:** Check coupon codes server-side, enforce usage limits, validate combinations.
3. **Race condition protection:** Use database transactions or locks when applying one-time coupons.
4. **Price consistency:** Log the price used at checkout time for audit trail.

## Files to Check

- All API routes handling checkout/payment
- Frontend components that send cart/checkout data
- Any Stripe/PayPal integration code
- Cart state management (Redux, Context, etc.)

Please proceed to fix all instances where prices are trusted from the client.`}</div>
				</div>
			</div>

			<!-- Manual Fix -->
			<div class="fix-section">
				<h3>Manual Fix - Before/After</h3>
				<p>Here's the exact code change that prevents price manipulation. One pattern causes revenue loss, the other doesn't:</p>

				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-block-header">
							<span class="code-block-lang status-bad">VULNERABLE - Client calculates total</span>
						</div>
						<pre><code>{`// API Route - DANGEROUS
export default async function handler(req, res) {
  const { total, items } = req.body

  // ⚠️ Trusting client-sent total
  const charge = await stripe.charges.create({
    amount: total * 100,
    currency: 'usd'
  })

  await createOrder({ items, total })
  res.json({ success: true })
}

// Attacker changes POST body:
// { "total": 0.01, "items": [...] }
// You just charged $0.01 for a $100 order`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-block-header">
							<span class="code-block-lang status-good">SECURE - Server calculates total</span>
						</div>
						<pre><code>{`// API Route - SAFE
export default async function handler(req, res) {
  const { items } = req.body  // Only IDs + quantities

  // 1. Validate quantities
  for (const item of items) {
    if (item.quantity < 1 || item.quantity > 100) {
      return res.status(400).json({ error: 'Invalid quantity' })
    }
  }

  // 2. Look up prices from database
  const productIds = items.map(i => i.productId)
  const products = await db.product.findMany({
    where: { id: { in: productIds } }
  })

  // 3. Calculate total server-side
  let total = 0
  for (const item of items) {
    const product = products.find(p => p.id === item.productId)
    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }
    total += product.price * item.quantity
  }

  // 4. Validate total
  if (total <= 0) {
    return res.status(400).json({ error: 'Invalid total' })
  }

  // 5. Charge the RECALCULATED amount
  const charge = await stripe.charges.create({
    amount: Math.round(total * 100),
    currency: 'usd'
  })

  await createOrder({ items, total })
  res.json({ success: true })
}

// Attacker tries to change total in POST body?
// Doesn't matter. Server ignores it and recalculates.`}</code></pre>
					</div>
				</div>

				<p>
					<strong>What changed:</strong> The server no longer accepts <code>total</code> from the client.
					It looks up current prices from the database, validates quantities are positive and reasonable, recalculates the total server-side, and only then processes payment.
					The client can send whatever numbers they want. The server doesn't care. It uses authoritative data only.
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
				<a href="/kb/security/vulnerabilities/mass-assignment/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Mass Assignment</div>
					<p class="related-card-description">Attackers modify fields they shouldn't have access to by adding extra parameters to requests</p>
				</a>
				<a href="/kb/security/vulnerabilities/insecure-file-upload/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Insecure File Upload</div>
					<p class="related-card-description">Upload malicious files to execute code or access sensitive data on the server</p>
				</a>
				<a href="/kb/vibe-coding-tools/bolt/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Bolt Security Patterns</div>
					<p class="related-card-description">Common vulnerabilities in Bolt-generated e-commerce code</p>
				</a>
				<a href="/kb/security/stacks/nextjs-stripe/" class="card card-interactive related-card">
					<div class="related-card-category">Stack Guide</div>
					<div class="related-card-title">Next.js + Stripe Security</div>
					<p class="related-card-description">Secure payment integration checklist for vibe coded apps</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Find these before you lose revenue</h2>
			<p>One price manipulation exploit can cost more than your entire security budget.</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">
				Scan your checkout flow
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M5 12h14M12 5l7 7-7 7"/>
				</svg>
			</a>
		</div>
	</article>
</div>

<style>
	/* Data Source Attribution */
	.data-source {
		font-size: 0.75rem;
		color: var(--text-tertiary);
		margin: 0.5rem 0 1.5rem;
	}

	.data-source a {
		color: var(--text-secondary);
	}

	/* Example Card Customizations */
	.example-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.75rem;
	}

	.example-id {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.7rem;
		font-weight: 600;
		color: var(--red);
		text-transform: uppercase;
	}

	.example-link {
		font-size: 0.75rem;
		color: var(--green-dim);
	}

	.feature-card h3 {
		font-size: 1rem;
		margin: 0 0 0.5rem;
		color: var(--text-primary);
	}

	.example-impact {
		font-size: 0.875rem;
		color: var(--text-secondary);
		margin: 0;
	}

	.examples-note {
		font-size: 0.75rem;
		color: var(--text-tertiary);
		margin-top: 1rem;
	}

	/* Attack Example Callouts */
	.attack-example {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.8125rem;
		padding: 0.75rem;
		background: var(--bg-tertiary);
		border-left: 3px solid var(--orange);
		margin-top: 0.75rem;
	}

	.attack-example code {
		background: transparent;
		padding: 0;
		font-size: inherit;
	}

	/* Tool Risk Table */
	.tool-risk-table {
		margin: 1.5rem 0;
	}

	.tool-risk-table h3 {
		margin-bottom: 1rem;
	}

	/* Pattern Note */
	.pattern-note {
		margin: 1rem 0 0 !important;
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.pattern-note code {
		background: var(--bg-tertiary);
		padding: 0.125rem 0.375rem;
		font-size: 0.8125rem;
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
		display: grid;
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.code-block.vulnerable .code-block-header {
		border-left: 3px solid var(--red);
	}

	.code-block.secure .code-block-header {
		border-left: 3px solid var(--green);
	}

	.status-bad {
		color: var(--red);
	}

	.status-good {
		color: var(--green);
	}
</style>
