<script lang="ts">
	import { Header } from '$lib/components/layout';

	const meta = {
		title: 'AI Prompts for Founders: Build Without Coding Experience',
		description: 'Prompts for non-technical founders to build apps with AI. MVP building, feature specs, and vibe coding basics explained without the jargon.',
		url: '/kb/prompts/ai-prompts-founders/'
	};

	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Prompts', href: '/kb/prompts' },
		{ label: 'AI Prompts for Founders' }
	];

	let copiedId: string | null = $state(null);

	function copyCode(id: string) {
		const el = document.getElementById(id);
		if (el) {
			navigator.clipboard.writeText(el.textContent || '').then(() => {
				copiedId = id;
				setTimeout(() => { copiedId = null; }, 2000);
			});
		}
	}

	const faqs = [
		{
			question: 'Do I need to understand code to vibe code?',
			answer: 'No, but you need to understand what you want. AI handles the code. You handle the vision. The clearer you describe what you want, the better results you get. Think of it like directing a contractor - you don\'t need to know plumbing to explain you want a sink.'
		},
		{
			question: 'How long does it take to build an MVP with AI?',
			answer: 'A simple MVP can be working in a weekend. Complex apps take weeks. The speed depends on how well you can break down what you want into clear requests. Start small - a landing page with one feature - and expand from there.'
		},
		{
			question: 'What if AI generates buggy code?',
			answer: 'It will. That\'s normal. The fix: paste the error message back to the AI and ask it to fix the problem. AI is better at fixing bugs when you show it the exact error. Don\'t try to debug it yourself - let AI do that part.'
		},
		{
			question: 'Should I use ChatGPT, Claude, or Cursor?',
			answer: 'For quick questions and planning: ChatGPT or Claude. For actually building: Cursor or Bolt.new. Cursor writes code directly into files. Bolt.new deploys instantly. Start with Bolt.new if you want something live today.'
		},
		{
			question: 'How do I know if my app is secure?',
			answer: 'You don\'t, without help. AI-generated code often has security holes. Before launch: 1) Run a security scanner like VibeShip, 2) Never store sensitive data in code, 3) Add authentication before payments. Security isn\'t optional for real users.'
		}
	];
</script>

<svelte:head>
	<title>{meta.title} | VibeShip</title>
	<meta name="description" content={meta.description} />
	<link rel="canonical" href="https://vibeship.co{meta.url}" />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:url" content="https://vibeship.co{meta.url}" />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<Header {breadcrumbs} />

<div class="content-wrapper">
	<article class="content-main content-wide">
		<div class="quick-answer">
			<p>
				<strong>You don't need to code to build software anymore.</strong> Vibe coding lets founders describe what they want in plain English and get working apps. These prompts help you communicate effectively with AI - no technical background required.
			</p>
		</div>

		<span class="badge badge-info">For Founders</span>

		<h1>AI Prompts for Founders: Build Without Code</h1>

		<p class="intro">
			Vibe coding is changing who can build software. You don't need a CS degree or years of programming experience. You need a clear idea and the ability to describe it. These prompts are designed for founders who want to build their MVP without hiring developers or learning to code.
		</p>

		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">8</div>
				<div class="stat-label">Prompts</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Zero</div>
				<div class="stat-label">Code Needed</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">MVP</div>
				<div class="stat-label">Ready</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Plain</div>
				<div class="stat-label">English</div>
			</div>
		</div>

		<!-- MVP Building Section -->
		<section class="article-section">
			<h2 id="mvp">MVP Building Prompts</h2>

			<p>Start here. These prompts help you go from idea to working prototype.</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">MVP Starter Prompt</span>
					<button class="copy-btn" class:copied={copiedId === 'mvp-starter'} onclick={() => copyCode('mvp-starter')}>
						{copiedId === 'mvp-starter' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="mvp-starter">{`I want to build [describe your app in one sentence].

Target users: [who will use this]
Main problem it solves: [the pain point]
Core feature (just one): [the most important thing it does]

Create a simple version with:
- Landing page explaining what it does
- Sign up/login
- The one core feature
- Clean, modern design

Use [Next.js/React] with [Supabase] for the database.
Keep it simple. I can add more features later.`}</code></pre>
			</div>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Feature Planning Prompt</span>
					<button class="copy-btn" class:copied={copiedId === 'feature-plan'} onclick={() => copyCode('feature-plan')}>
						{copiedId === 'feature-plan' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="feature-plan">{`I'm building [your app]. Here's what I want it to do:

1. [Feature 1 - describe what the user does and sees]
2. [Feature 2 - describe what the user does and sees]
3. [Feature 3 - describe what the user does and sees]

For each feature, tell me:
- What you'll build
- What database tables are needed
- What pages/screens are required
- Estimated complexity (simple/medium/complex)

Then build them one at a time, starting with the simplest.`}</code></pre>
			</div>
		</section>

		<!-- How to Describe Features Section -->
		<section class="article-section">
			<h2 id="describe">How to Describe Features</h2>

			<p>The better you describe what you want, the better results you get. Here's the formula.</p>

			<div class="describe-grid">
				<div class="card describe-card">
					<h3>Bad Description</h3>
					<p class="example bad">"Add a payment system"</p>
					<p class="why">Too vague. What kind of payments? One-time or subscription? What happens after payment?</p>
				</div>
				<div class="card describe-card">
					<h3>Good Description</h3>
					<p class="example good">"Add Stripe payments. Users pay $29/month for premium. After payment, unlock the dashboard. Show billing history in settings."</p>
					<p class="why">Clear outcome, specific amount, defined next step.</p>
				</div>
			</div>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Feature Description Template</span>
					<button class="copy-btn" class:copied={copiedId === 'feature-template'} onclick={() => copyCode('feature-template')}>
						{copiedId === 'feature-template' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="feature-template">{`Add [feature name].

When the user [action they take]:
1. They see [what appears on screen]
2. They can [what they can do]
3. The system [what happens behind the scenes]
4. Then [what happens next]

Example data:
- [Give a concrete example of what the data looks like]

Edge cases:
- If [this happens], then [do this]
- If [this other thing], then [do this instead]`}</code></pre>
			</div>
		</section>

		<!-- Talking to AI Section -->
		<section class="article-section">
			<h2 id="communicate">How to Talk to AI</h2>

			<p>AI isn't magic. It's a very fast intern who needs clear instructions. These patterns help vibe coders get better results.</p>

			<div class="tips-grid">
				<div class="card tip-card">
					<h4>Be Specific</h4>
					<p>"Make it better" fails. "Make the button bigger and green" works. Specific requests get specific results.</p>
				</div>
				<div class="card tip-card">
					<h4>One Thing at a Time</h4>
					<p>Don't ask for 5 features in one prompt. Ask for one, verify it works, then ask for the next.</p>
				</div>
				<div class="card tip-card">
					<h4>Show Examples</h4>
					<p>"Like Stripe's pricing page" gives AI a visual reference. Link to examples when you can.</p>
				</div>
				<div class="card tip-card">
					<h4>Include Context</h4>
					<p>Paste your current code when asking for changes. AI can't see your project unless you show it.</p>
				</div>
			</div>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">When Things Go Wrong</span>
					<button class="copy-btn" class:copied={copiedId === 'fix-errors'} onclick={() => copyCode('fix-errors')}>
						{copiedId === 'fix-errors' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="fix-errors">{`I'm getting this error:

[paste the exact error message here]

This happened when I tried to [what you were doing].

Here's the code that's causing it:

[paste the relevant code]

Fix this error and explain what was wrong.`}</code></pre>
			</div>
		</section>

		<!-- Common Mistakes Section -->
		<section class="article-section">
			<h2 id="mistakes">Mistakes to Avoid</h2>

			<p>Every vibe coder makes these mistakes at first. Learn from others.</p>

			<div class="mistakes-list">
				<div class="mistake">
					<span class="mistake-label">Mistake</span>
					<strong>Building too much at once</strong>
					<p>You describe 20 features. AI generates a mess. Start with one feature. Make it work. Add the next.</p>
				</div>
				<div class="mistake">
					<span class="mistake-label">Mistake</span>
					<strong>Not testing as you go</strong>
					<p>You generate 10 files before testing. Something's broken. You don't know where. Test after every change.</p>
				</div>
				<div class="mistake">
					<span class="mistake-label">Mistake</span>
					<strong>Ignoring error messages</strong>
					<p>The error tells you exactly what's wrong. Copy it. Paste it to AI. Let AI fix it. Don't guess.</p>
				</div>
				<div class="mistake">
					<span class="mistake-label">Mistake</span>
					<strong>Skipping authentication</strong>
					<p>Your app stores user data without login. Anyone can access anything. Add auth before storing any user data.</p>
				</div>
				<div class="mistake">
					<span class="mistake-label">Mistake</span>
					<strong>Hardcoding secrets</strong>
					<p>Your Stripe key is visible in the code. Use environment variables. Never put passwords or API keys in code.</p>
				</div>
			</div>
		</section>

		<!-- Security Basics Section -->
		<section class="article-section">
			<h2 id="security">Security Basics for Founders</h2>

			<p>Your vibe coded app works. Before real users touch it, check these.</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Security Review Prompt</span>
					<button class="copy-btn" class:copied={copiedId === 'security-review'} onclick={() => copyCode('security-review')}>
						{copiedId === 'security-review' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="security-review">{`Review this code for security issues.

Check for:
1. Hardcoded passwords, API keys, or secrets
2. Missing authentication on pages that need it
3. User input that goes directly to database (SQL injection)
4. User content displayed without sanitization (XSS)
5. Missing rate limiting on login/signup

For each issue found:
- Where it is
- Why it's dangerous
- How to fix it

Code:
[paste your main files]`}</code></pre>
			</div>

			<div class="security-checklist">
				<h4>Pre-Launch Security Checklist</h4>
				<ul>
					<li>All API keys are in environment variables, not code</li>
					<li>Login is required before accessing user data</li>
					<li>Users can only see/edit their own data</li>
					<li>Forms validate input before processing</li>
					<li>HTTPS is enabled (most hosts do this automatically)</li>
					<li>Run a security scanner on your codebase</li>
				</ul>
			</div>
		</section>

		<!-- Quick Prompts Section -->
		<section class="article-section">
			<h2>Quick Prompts for Common Tasks</h2>

			<div class="quick-prompts-grid">
				<div class="card prompt-card">
					<h3>Add User Accounts</h3>
					<div class="code-block">
						<div class="code-block-header">
							<span class="code-block-lang">Prompt</span>
							<button class="copy-btn" class:copied={copiedId === 'add-auth'} onclick={() => copyCode('add-auth')}>
								{copiedId === 'add-auth' ? 'Copied!' : 'Copy'}
							</button>
						</div>
						<pre><code id="add-auth">{`Add user authentication.

- Email/password signup and login
- Forgot password flow
- Protect [list pages] - require login
- Show user email in header when logged in
- Logout button

Use Supabase Auth (or Clerk if you prefer).`}</code></pre>
					</div>
				</div>

				<div class="card prompt-card">
					<h3>Add Payments</h3>
					<div class="code-block">
						<div class="code-block-header">
							<span class="code-block-lang">Prompt</span>
							<button class="copy-btn" class:copied={copiedId === 'add-payments'} onclick={() => copyCode('add-payments')}>
								{copiedId === 'add-payments' ? 'Copied!' : 'Copy'}
							</button>
						</div>
						<pre><code id="add-payments">{`Add Stripe payments.

Pricing: $[X]/month subscription
After payment: [what they unlock]

- Pricing page with one plan
- Checkout redirect to Stripe
- Webhook to update user to "premium"
- Show "Premium" badge in header
- Billing portal link in settings`}</code></pre>
					</div>
				</div>

				<div class="card prompt-card">
					<h3>Deploy the App</h3>
					<div class="code-block">
						<div class="code-block-header">
							<span class="code-block-lang">Prompt</span>
							<button class="copy-btn" class:copied={copiedId === 'deploy'} onclick={() => copyCode('deploy')}>
								{copiedId === 'deploy' ? 'Copied!' : 'Copy'}
							</button>
						</div>
						<pre><code id="deploy">{`Help me deploy this to Vercel.

Walk me through:
1. What files need to change (if any)
2. Environment variables to set
3. The exact commands to run
4. How to connect my domain

Assume I've never deployed before.`}</code></pre>
					</div>
				</div>

				<div class="card prompt-card">
					<h3>Fix This Bug</h3>
					<div class="code-block">
						<div class="code-block-header">
							<span class="code-block-lang">Prompt</span>
							<button class="copy-btn" class:copied={copiedId === 'fix-bug'} onclick={() => copyCode('fix-bug')}>
								{copiedId === 'fix-bug' ? 'Copied!' : 'Copy'}
							</button>
						</div>
						<pre><code id="fix-bug">{`This isn't working:

Expected: [what should happen]
Actual: [what's happening instead]
Error (if any): [paste error]

Relevant code:
[paste code]

Fix it and explain the problem.`}</code></pre>
					</div>
				</div>
			</div>
		</section>

		<!-- FAQ Section -->
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
			<h2>Next Steps</h2>
			<div class="related-grid">
				<a href="/kb/prompts/prompt-cheat-sheet/" class="card card-interactive related-card">
					<div class="related-card-category">Reference</div>
					<div class="related-card-title">Prompt Cheat Sheet</div>
					<p class="related-card-description">Quick copy-paste prompts</p>
				</a>
				<a href="/kb/prompts/debugging-prompts/" class="card card-interactive related-card">
					<div class="related-card-category">Debugging</div>
					<div class="related-card-title">Debugging Prompts</div>
					<p class="related-card-description">Fix errors with AI help</p>
				</a>
				<a href="/kb/prompts/security-prompts/" class="card card-interactive related-card">
					<div class="related-card-category">Security</div>
					<div class="related-card-title">Security Prompts</div>
					<p class="related-card-description">Find vulnerabilities</p>
				</a>
				<a href="/kb/guides/vibe-coding/what-is-vibe-coding/" class="card card-interactive related-card">
					<div class="related-card-category">Basics</div>
					<div class="related-card-title">What is Vibe Coding?</div>
					<p class="related-card-description">The complete introduction</p>
				</a>
			</div>
		</section>

		<div class="cta-box">
			<h3>Built Something? Check It's Secure</h3>
			<p>AI-generated code often has security holes you can't see. VibeShip Scanner finds vulnerabilities in vibe coded projects before hackers do.</p>
			<a href="https://vibeship.co" class="btn btn-green">Scan Your Code Free</a>
		</div>
	</article>
</div>

<style>
	.intro { font-size: 1.125rem; color: var(--text-secondary); margin-bottom: 2rem; line-height: 1.7; }
	.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin: 1.5rem 0 2rem; }

	/* Describe Grid */
	.describe-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1rem 0; }
	.describe-card h3 { margin: 0 0 0.75rem; font-size: 1rem; }
	.describe-card .example { font-family: monospace; font-size: 0.875rem; padding: 0.75rem; margin: 0 0 0.5rem; background: var(--bg-secondary); }
	.describe-card .example.bad { border-left: 3px solid var(--red); }
	.describe-card .example.good { border-left: 3px solid var(--green); }
	.describe-card .why { margin: 0; font-size: 0.875rem; color: var(--text-secondary); }

	/* Tips Grid */
	.tips-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1rem 0; }
	.tip-card h4 { margin: 0 0 0.5rem; font-size: 0.95rem; color: var(--green); }
	.tip-card p { margin: 0; font-size: 0.875rem; color: var(--text-secondary); }

	/* Mistakes List */
	.mistakes-list { display: flex; flex-direction: column; gap: 0.75rem; margin: 1rem 0; }
	.mistake { padding: 1rem; background: var(--bg-secondary); }
	.mistake-label { display: inline-block; font-size: 0.75rem; font-weight: 600; color: var(--red); text-transform: uppercase; margin-bottom: 0.25rem; }
	.mistake strong { display: block; margin-bottom: 0.5rem; }
	.mistake p { margin: 0; font-size: 0.875rem; color: var(--text-secondary); }

	/* Security Checklist */
	.security-checklist { background: var(--bg-secondary); padding: 1.5rem; margin: 1.5rem 0; }
	.security-checklist h4 { margin: 0 0 1rem; color: var(--green); }
	.security-checklist ul { margin: 0; padding-left: 1.25rem; }
	.security-checklist li { margin: 0.5rem 0; color: var(--text-secondary); }

	/* Quick Prompts Grid */
	.quick-prompts-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1rem 0; }
	.prompt-card h3 { margin: 0 0 0.75rem; font-size: 1rem; }

	@media (max-width: 768px) {
		.stats-row { grid-template-columns: repeat(2, 1fr); }
		.describe-grid, .tips-grid, .quick-prompts-grid { grid-template-columns: 1fr; }
	}
	@media (max-width: 480px) { .stats-row { grid-template-columns: 1fr; } }
</style>
