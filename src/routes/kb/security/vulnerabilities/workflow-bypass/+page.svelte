<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Workflow Bypass: Skipping Steps That Exist for a Reason',
		description: 'Workflow bypass lets attackers skip payment, verification, or approval steps. CWE-841. Common in AI-generated checkout flows. Fix prompts for Cursor, Bolt & Claude Code.',
		url: '/kb/security/vulnerabilities/workflow-bypass/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Workflow Bypass' }
	];

	// Real external data sources
	const owaspData = {
		category: 'A01:2021 - Broken Access Control',
		source: 'https://owasp.org/Top10/A01_2021-Broken_Access_Control/',
		cweId: 'CWE-841',
		cweSource: 'https://cwe.mitre.org/data/definitions/841.html',
		cweName: 'Improper Enforcement of Behavioral Workflow'
	};

	// FAQ data for schema
	const faqs = [
		{
			question: 'What is the difference between workflow bypass and broken access control?',
			answer: 'Broken access control is the broader category. Workflow bypass is a specific type where users skip required steps in a process. Someone accessing data they shouldn\'t see is broken access control. Someone checking out without paying, skipping email verification, or approving their own expense reports? That\'s workflow bypass. The attacker has legitimate access to the endpoint, they just reached it in the wrong order.'
		},
		{
			question: 'Can workflow bypass happen in single-page applications?',
			answer: 'Constantly. SPAs are particularly vulnerable because the frontend manages routing and state. Developers assume users will follow the React Router flow. Attackers don\'t use React Router. They call the API directly. The 2019 Magecart attacks exploited exactly this pattern in countless e-commerce SPAs. If your checkout API doesn\'t verify that the cart was validated, payment was confirmed, and inventory was checked server-side, you have workflow bypass.'
		},
		{
			question: 'How do I test for workflow bypass vulnerabilities?',
			answer: 'Skip steps. Open your browser\'s network tab, complete a workflow normally, then replay just the final API calls without the intermediate ones. Can you place an order without adding items to cart? Can you verify an email by guessing the token? Can you skip from step 1 to step 5? Use tools like Burp Suite to intercept and modify the sequence. Any time you can reach a "success" state without completing all required steps, you have a vulnerability.'
		},
		{
			question: 'Why do AI coding tools generate workflow bypass vulnerabilities?',
			answer: 'AI tools generate working code for individual features without understanding multi-step business processes. Ask for a checkout endpoint and you get one that processes orders. Ask for a payment endpoint and you get one that charges cards. Neither knows they need to verify the other happened first. The training data is full of isolated API endpoints. Business logic that spans multiple steps requires explicit architecture that AI rarely provides unprompted.'
		},
		{
			question: 'What is the most common workflow bypass in e-commerce?',
			answer: 'Price manipulation through checkout bypass. Attackers modify the cart total between price calculation and payment processing. In 2022, researchers found this vulnerability in platforms handling billions in transactions. The cart shows $500, the payment API receives $5. Without server-side validation at checkout, the order processes at the manipulated price. This specific pattern appears in vibe coded checkout flows with alarming regularity.'
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
			{"@type": "ListItem", "position": 4, "name": "Workflow Bypass"}
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
				<span class="badge">CWE-841</span>
				<span class="badge">OWASP A01:2021</span>
			</div>
			<h1>Workflow Bypass in Vibe Coded Apps</h1>
			<p class="text-secondary">When attackers skip the steps you assumed they'd follow</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Workflow bypass happens when attackers skip required steps in a multi-step process.</strong>
				Checkout without payment. Account creation without email verification. Approvals without proper authorization.
				Classified as <a href="https://cwe.mitre.org/data/definitions/841.html">CWE-841</a> (Improper Enforcement of Behavioral Workflow),
				this vulnerability surfaces constantly in vibe coded applications where AI generates individual endpoints without understanding the business process they belong to.
			</p>
		</div>

		<!-- Stats Box -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">#1</div>
				<div class="stat-label">OWASP Category</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">{owaspData.cweId}</div>
				<div class="stat-label"><a href={owaspData.cweSource}>CWE ID</a></div>
			</div>
			<div class="stat-box">
				<div class="stat-value">High</div>
				<div class="stat-label">Severity</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">$$$</div>
				<div class="stat-label">Financial Impact</div>
			</div>
		</div>
		<p class="data-source">
			Source: <a href={owaspData.source}>OWASP Top 10 (2021) - Broken Access Control</a>
		</p>

		<!-- What Is It - @breachlore voice (historian, storytelling, connects past to present) -->
		<section class="article-section">
			<h2>What is workflow bypass?</h2>
			<p>
				Workflow bypass is a vulnerability where attackers complete a multi-step process without going through all required steps.
				The checkout page assumes the cart was validated. The order confirmation assumes payment succeeded. The premium features assume the subscription was purchased.
				Attackers exploit these assumptions by jumping directly to later steps in the sequence.
			</p>
			<p>
				December 2014. Sony Pictures Entertainment. Attackers bypassed internal approval workflows to exfiltrate terabytes of data.
				The systems assumed requests followed proper authorization chains. They didn't.
				Same pattern, different context: e-commerce platforms in 2019 lost millions when attackers discovered they could modify order totals between cart and checkout.
				The Magecart campaigns that followed exploited workflow assumptions across thousands of sites.
			</p>
			<p>
				The <a href="https://cwe.mitre.org/data/definitions/841.html">CWE-841</a> specification calls this "Improper Enforcement of Behavioral Workflow."
				Translation: your code trusts that requests arrive in the correct sequence. Attackers don't follow sequences.
				AI coding tools generate this vulnerability constantly because they build endpoints in isolation, without understanding the multi-step business processes those endpoints belong to.
			</p>
		</section>

		<!-- AI Tool Patterns - @breachlore voice -->
		<section class="article-section">
			<h2>How do AI tools cause workflow bypass?</h2>
			<p>
				The pattern repeats across every major AI coding tool. Ask for a checkout system and you get individual endpoints: add to cart, calculate total, process payment, create order.
				Each endpoint works perfectly in isolation. None verifies that the previous steps actually completed.
			</p>

			<div class="tool-patterns-box">
				<h3>The pattern that enables fraud</h3>
				<p>This is what vibe coded checkout flows typically look like:</p>
				<div class="code-block">
					<pre><code>{`// AI-generated order endpoint - looks fine, fundamentally broken
app.post('/api/orders', async (req, res) => {
  const { userId, cartItems, shippingAddress } = req.body;

  // Calculate total from cart items
  const total = cartItems.reduce((sum, item) =>
    sum + item.price * item.quantity, 0);

  // Create the order
  const order = await db.orders.create({
    userId,
    items: cartItems,
    total,
    shippingAddress,
    status: 'confirmed'
  });

  res.json({ orderId: order.id });
});`}</code></pre>
				</div>
				<p class="pattern-note">
					The attacker modifies <code>cartItems</code> with whatever prices they want.
					Nothing verifies against actual product prices. Nothing checks if payment was processed.
					The order creates successfully because the endpoint trusts client-provided data.
				</p>
			</div>

			<p>
				<strong>The historical parallel:</strong> In 2011, Citigroup's mobile app allowed users to bypass the login screen entirely by modifying URL parameters.
				300,000 customer records exposed. Same root cause: the application assumed users would follow the intended flow.
				A decade later, AI tools generate code with the same assumptions. The technology evolved. The vulnerability didn't.
			</p>

			<p>
				Cursor, Claude Code, Bolt. The specific tool doesn't matter.
				Vibe coding produces this pattern because generating isolated, functional endpoints is what these tools excel at.
				Understanding that endpoint B should only execute after endpoint A requires business context that AI doesn't have.
			</p>
		</section>

		<!-- What Could Happen -->
		<section class="article-section">
			<h2>What could happen if I have workflow bypass?</h2>
			<p>
				The consequences depend on which workflow gets bypassed, but the damage is always financial or operational.
			</p>
			<ul class="consequences-list">
				<li><strong>Free products at scale:</strong> Attackers bypass payment verification and place orders that ship without charging. The 2019 e-commerce attacks exploited exactly this, with some merchants losing hundreds of thousands before detection. By the time fraud alerts trigger, products are already shipped.</li>
				<li><strong>Price manipulation:</strong> Cart totals get modified between calculation and payment. An attacker changes $500 to $5, payment processes, order confirms. This pattern appeared in disclosed vulnerabilities affecting platforms processing billions in transactions.</li>
				<li><strong>Account verification bypass:</strong> Email verification exists to prevent fake accounts. Bypassing it enables mass account creation for spam, fraud, or abuse. The 2018 Twitter fake account purge removed millions of accounts that had bypassed verification workflows.</li>
				<li><strong>Privilege escalation through approval bypass:</strong> Internal approval workflows prevent unauthorized access. Bypassing them grants permissions that should require review. The 2020 Twitter hack used social engineering to bypass internal verification, but technical bypass would achieve the same result.</li>
				<li><strong>Subscription fraud:</strong> Premium features unlock without payment. Trial periods extend indefinitely. Rate limits never apply because the limiting step gets skipped. Every SaaS product with vibe coded tier enforcement is vulnerable.</li>
			</ul>
			<p>
				The recurring theme across two decades of breaches: systems trusted that requests would follow prescribed sequences. They never do.
			</p>
		</section>

		<!-- Detection - @breachlore voice -->
		<section class="article-section">
			<h2>How do I detect workflow bypass?</h2>
			<p>
				Workflow bypass detection requires mapping your multi-step processes and verifying server-side enforcement at each step.
				The vulnerability hides in the gaps between endpoints.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Patterns to audit</span>
				</div>
				<pre><code>{`// 1. Endpoints that assume previous steps completed
app.post('/api/checkout')  // Does it verify cart exists and was validated?
app.post('/api/orders')    // Does it verify payment succeeded?
app.post('/api/ship')      // Does it verify order was paid and approved?

// 2. State transitions without validation
order.status = 'confirmed' // Was payment actually processed?
user.verified = true       // Was email actually confirmed?
subscription.active = true // Was payment actually received?

// 3. Client-provided data that should come from server
const { total } = req.body        // Should be calculated server-side
const { items } = req.body        // Prices should be validated
const { permissions } = req.body  // Should come from session

// 4. Missing cross-references
// Order creates without payment record
// Shipment creates without order validation
// Account upgrades without subscription check`}</code></pre>
			</div>

			<p>
				<strong>The audit approach:</strong> For each final action in your application (order placed, account verified, access granted), trace backwards.
				What steps should have happened first? Does the server verify each one? If verification exists only in the frontend, attackers bypass it.
			</p>

			<div class="cta-box">
				<p><strong>Automated workflow analysis coming soon</strong></p>
				<a href="https://scanner.vibeship.co" class="btn btn-green">
					Scan your code free
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M5 12h14M12 5l7 7-7 7"/>
					</svg>
				</a>
			</div>
		</section>

		<!-- How to Fix - @breachlore voice -->
		<section class="article-section">
			<h2>How do I fix workflow bypass?</h2>
			<p>
				The fix requires enforcing workflow state server-side. Every step must verify that all previous steps completed successfully.
				Client state is for UX. Server state is for security. The distinction has been clear since the first web applications in the 1990s. AI tools keep forgetting it.
			</p>

			<!-- AI Fix Prompt -->
			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>This prompt helps identify and fix workflow bypass vulnerabilities across multi-step processes:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Fix all workflow bypass vulnerabilities in my codebase.

## What to look for

Search for these dangerous patterns:

1. Order/checkout endpoints that don't verify payment:
   - createOrder() without checking paymentStatus
   - Endpoints accepting client-provided totals or prices
   - Status updates without validating previous state

2. Account operations that skip verification:
   - Setting user.verified without confirming token
   - Granting permissions without approval workflow
   - Subscription upgrades without payment confirmation

3. State transitions without validation:
   - Direct status changes: status = 'completed'
   - Client-controlled state: const { status } = req.body
   - Missing prerequisite checks before final actions

4. Multi-step processes with gaps:
   - Step 3 doesn't verify step 2 completed
   - Final action trusts intermediate state from client
   - No server-side workflow state tracking

## How to fix

### For e-commerce checkouts:
\`\`\`javascript
// Before (vulnerable)
app.post('/api/orders', async (req, res) => {
  const { cartItems, total } = req.body;
  await db.orders.create({ items: cartItems, total });
});

// After (secure)
app.post('/api/orders', async (req, res) => {
  // 1. Get cart from server, not client
  const cart = await db.carts.findUnique({ where: { userId: req.user.id } });
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ error: 'Invalid cart' });
  }

  // 2. Calculate total server-side from actual product prices
  const items = await db.products.findMany({
    where: { id: { in: cart.items.map(i => i.productId) } }
  });
  const total = items.reduce((sum, item) => {
    const cartItem = cart.items.find(i => i.productId === item.id);
    return sum + item.price * cartItem.quantity;
  }, 0);

  // 3. Verify payment exists and matches
  const payment = await db.payments.findFirst({
    where: { cartId: cart.id, status: 'completed', amount: total }
  });
  if (!payment) {
    return res.status(400).json({ error: 'Payment required' });
  }

  // 4. Create order with verified data
  const order = await db.orders.create({
    data: { userId: req.user.id, items: cart.items, total, paymentId: payment.id }
  });
});
\`\`\`

### For verification flows:
\`\`\`javascript
// Before (vulnerable)
app.post('/api/verify-email', async (req, res) => {
  await db.users.update({
    where: { id: req.user.id },
    data: { emailVerified: true }
  });
});

// After (secure)
app.post('/api/verify-email', async (req, res) => {
  const { token } = req.body;

  // Verify token exists and hasn't expired
  const verification = await db.emailVerifications.findFirst({
    where: { token, userId: req.user.id, expiresAt: { gt: new Date() } }
  });

  if (!verification) {
    return res.status(400).json({ error: 'Invalid or expired token' });
  }

  // Delete used token and verify user
  await db.$transaction([
    db.emailVerifications.delete({ where: { id: verification.id } }),
    db.users.update({ where: { id: req.user.id }, data: { emailVerified: true } })
  ]);
});
\`\`\`

## After fixing

1. Map all multi-step workflows in your application
2. Verify each step checks completion of previous steps
3. Remove any client-provided data that should come from server
4. Add database constraints where possible (foreign keys, status enums)
5. List all endpoints you modified with before/after snippets

Please proceed systematically through my codebase.`}</div>
				</div>
			</div>

			<!-- Manual Fix -->
			<div class="fix-section">
				<h3>Manual Fix</h3>
				<p>The core principle: never trust that previous steps happened. Verify server-side at every transition.</p>

				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-label">Vulnerable</div>
						<pre><code>{`// Trusts client-provided data
app.post('/api/orders', async (req, res) => {
  const { items, total, paymentId } = req.body;

  // Creates order using client data
  // No verification that:
  // - Items match actual cart
  // - Total was calculated correctly
  // - Payment actually succeeded
  // - PaymentId belongs to this user

  const order = await db.orders.create({
    data: { items, total, paymentId, status: 'confirmed' }
  });

  res.json({ orderId: order.id });
});`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-label">Secure</div>
						<pre><code>{`// Verifies every step server-side
app.post('/api/orders', async (req, res) => {
  const userId = req.user.id;

  // Step 1: Get cart from server
  const cart = await db.carts.findUnique({
    where: { userId, status: 'validated' }
  });
  if (!cart) return res.status(400).json({ error: 'No valid cart' });

  // Step 2: Verify payment completed for this cart
  const payment = await db.payments.findFirst({
    where: { cartId: cart.id, userId, status: 'completed' }
  });
  if (!payment) return res.status(400).json({ error: 'Payment required' });

  // Step 3: Verify amounts match
  if (payment.amount !== cart.total) {
    return res.status(400).json({ error: 'Amount mismatch' });
  }

  // Step 4: Create order with verified server data
  const order = await db.orders.create({
    data: {
      userId,
      cartId: cart.id,
      paymentId: payment.id,
      total: cart.total,
      status: 'confirmed'
    }
  });

  res.json({ orderId: order.id });
});`}</code></pre>
					</div>
				</div>

				<p>
					<strong>The historical lesson:</strong> In 2008, researchers demonstrated that 76% of e-commerce platforms accepted modified prices.
					Seventeen years later, the same vulnerability appears in AI-generated code. The fix hasn't changed either: server-side validation of every workflow step.
					Vibe coders who understand this history don't repeat it.
				</p>
			</div>

			<!-- Framework-Specific -->
			<div class="fix-section">
				<h3>Framework-specific approaches</h3>
				<div class="framework-links">
					<a href="/kb/security/stacks/nextjs-supabase/" class="card card-interactive">
						<span class="framework-name">Next.js + Supabase</span>
						<span class="framework-desc">Server actions & RLS policies</span>
					</a>
					<a href="/kb/security/stacks/sveltekit-supabase/" class="card card-interactive">
						<span class="framework-name">SvelteKit + Supabase</span>
						<span class="framework-desc">Form actions & database triggers</span>
					</a>
					<a href="/kb/security/vulnerabilities/bola/" class="card card-interactive">
						<span class="framework-name">BOLA / IDOR</span>
						<span class="framework-desc">Related access control vulnerability</span>
					</a>
					<a href="/kb/security/vulnerabilities/price-manipulation/" class="card card-interactive">
						<span class="framework-name">Price Manipulation</span>
						<span class="framework-desc">E-commerce workflow bypass variant</span>
					</a>
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
				<a href="/kb/security/vulnerabilities/bola/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Broken Object Level Authorization</div>
					<p class="related-card-description">When users access objects they shouldn't own</p>
				</a>
				<a href="/kb/security/vulnerabilities/price-manipulation/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Price Manipulation</div>
					<p class="related-card-description">Modifying prices between cart and checkout</p>
				</a>
				<a href="/kb/security/vulnerabilities/session-fixation/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Session Fixation</div>
					<p class="related-card-description">Authentication workflow attacks</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Stop trusting the sequence</h2>
			<p>Every multi-step process is a workflow bypass waiting to happen. Verify each step server-side.</p>
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

	.pattern-note code {
		background: var(--bg-tertiary);
		padding: 0.125rem 0.375rem;
		font-size: 0.8125rem;
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

	/* Code Comparison - stacked vertically */
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

	/* Framework Links */
	.framework-links {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}

	.framework-links a {
		text-decoration: none;
	}

	.framework-name {
		display: block;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 0.25rem;
	}

	.framework-desc {
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.framework-links {
			grid-template-columns: 1fr;
		}
	}
</style>
