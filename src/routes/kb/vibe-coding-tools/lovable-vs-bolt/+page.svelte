<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Lovable vs Bolt 2025: Which Ships Your MVP Faster?',
		description: 'Lovable vs Bolt comparison for vibe coders. Supabase integration, GitHub sync, pricing ($20/mo both), and which tool gets your app to users faster.',
		url: '/kb/vibe-coding-tools/lovable-vs-bolt/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Vibe Coding Tools', href: '/kb/vibe-coding-tools' },
		{ label: 'Lovable vs Bolt' }
	];

	// FAQ data
	const faqs = [
		{
			question: 'Is Lovable better than Bolt?',
			answer: 'Lovable is better for polished MVPs with built-in Supabase, visual editor, and two-way GitHub sync. Bolt is better for fast prototypes and multi-framework experiments. Both cost $20/month for basic plans. Choose based on whether you need production polish (Lovable) or maximum speed (Bolt).'
		},
		{
			question: 'Is Lovable free?',
			answer: 'Yes. Lovable Free includes limited credits, public projects, GitHub sync, and one-click deployment. The $20/month Pro tier adds 100 messages/month. Higher tiers scale to $50/month (250 messages) and $900/month (5,000 messages).'
		},
		{
			question: 'How fast did Lovable grow?',
			answer: 'Lovable went from $0 to $20M ARR in 60 days, making it the fastest-growing European startup in history. This growth rate suggests strong product-market fit with vibe coders and non-technical founders.'
		},
		{
			question: 'What is the difference between Bolt tokens and Lovable messages?',
			answer: 'Bolt charges per token (code operations). You get 10M tokens for $20/month. Lovable charges per message (each AI interaction). You get 100 messages for $20/month. A complex Lovable message costs the same as a simple one. Complex Bolt operations consume more tokens.'
		},
		{
			question: 'Can I export code from Lovable or Bolt?',
			answer: 'Yes. Lovable has two-way GitHub sync - push changes back and Lovable stays in sync. Bolt allows download and basic export. Both let you continue development in Cursor, VS Code, or any IDE after building your initial prototype.'
		}
	];
</script>

<svelte:head>
	<title>{meta.title} | vibeship</title>
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
			{"@type": "ListItem", "position": 2, "name": "Vibe Coding Tools", "item": "https://vibeship.co/kb/vibe-coding-tools"},
			{"@type": "ListItem", "position": 3, "name": "Lovable vs Bolt"}
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
		"author": {
			"@type": "Organization",
			"name": "vibeship"
		},
		"publisher": {
			"@type": "Organization",
			"name": "vibeship",
			"logo": {
				"@type": "ImageObject",
				"url": "https://vibeship.co/logo.png"
			}
		},
		"datePublished": "2025-12-17",
		"dateModified": "2025-12-20"
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
				<span class="badge badge-comparison">Comparison</span>
				<span class="badge">Updated Dec 2025</span>
			</div>
			<h1>Lovable vs Bolt: Which Ships Your MVP Faster?</h1>
			<p class="subtitle">Both cost $20/mo. One optimizes for polish, the other for speed.</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Lovable</strong> builds polished apps with built-in Supabase, visual editing, and two-way GitHub sync. Hit $20M ARR in 60 days.
				<strong>Bolt</strong> ships prototypes faster with WebContainers and multi-framework support.
				Same price tier ($20/mo). Lovable for investor demos and production. Bolt for quick validation.
			</p>
		</div>

		<!-- Growth Callout -->
		<section class="growth-callout">
			<h2>Lovable's growth is hard to ignore</h2>
			<p>
				<a href="https://lovable.dev" target="_blank" rel="noopener">Lovable</a> (formerly GPT Engineer) went from <strong>$0 to $20M ARR in 60 days</strong> - <a href="https://www.nocode.mba/articles/bolt-vs-lovable-pricing" target="_blank" rel="noopener">the fastest-growing European startup ever</a>. That velocity comes from vibe coders who want apps that look production-ready without hiring designers.
			</p>
			<p>
				This doesn't make Lovable "better" - it means the market wants polished outputs. If you need speed over polish, Bolt still wins.
			</p>
		</section>

		<!-- Quick Comparison Table -->
		<section>
			<h2>How do Lovable and Bolt compare at a glance?</h2>
			<p>
				Both tools target vibe coders building MVPs. Both run in the browser. Both use Claude models. The differences are in workflow and output quality:
			</p>

			<div class="comparison-table-wrapper">
				<table class="comparison-table">
					<thead>
						<tr>
							<th>What You Care About</th>
							<th>Lovable</th>
							<th>Bolt</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Monthly cost (Pro)</td>
							<td>$20/mo (100 messages)</td>
							<td>$20/mo (10M tokens)</td>
						</tr>
						<tr>
							<td>UI quality</td>
							<td class="highlight-win">shadcn/ui (polished)</td>
							<td>Varies by prompt</td>
						</tr>
						<tr>
							<td>Database</td>
							<td class="highlight-win">Supabase built-in</td>
							<td>Manual setup</td>
						</tr>
						<tr>
							<td>Auth</td>
							<td class="highlight-win">Supabase Auth guided</td>
							<td>Manual implementation</td>
						</tr>
						<tr>
							<td>GitHub sync</td>
							<td class="highlight-win">Two-way sync</td>
							<td>Export only</td>
						</tr>
						<tr>
							<td>Visual editor</td>
							<td class="highlight-win">Yes (point-and-click)</td>
							<td>No (code only)</td>
						</tr>
						<tr>
							<td>Framework support</td>
							<td>React only</td>
							<td class="highlight-win">Multi-framework</td>
						</tr>
						<tr>
							<td>Speed to prototype</td>
							<td>Fast</td>
							<td class="highlight-win">Fastest</td>
						</tr>
						<tr>
							<td>Collaboration</td>
							<td class="highlight-win">SSO on self-serve</td>
							<td>SSO enterprise only</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- Pricing Deep Dive -->
		<section>
			<h2>What does each tool actually cost?</h2>
			<p>
				Both start at $20/month but measure usage differently. This matters more than you'd think:
			</p>

			<div class="pricing-grid">
				<div class="pricing-card">
					<div class="pricing-header lovable">
						<h3>Lovable</h3>
						<span class="pricing-model">Message-based</span>
					</div>
					<div class="pricing-tier">
						<span class="tier-name">Free</span>
						<span class="tier-price">$0</span>
						<ul>
							<li>Limited credits</li>
							<li>Public projects</li>
							<li>GitHub sync</li>
							<li>One-click deploy</li>
						</ul>
					</div>
					<div class="pricing-tier featured">
						<span class="tier-name">Pro</span>
						<span class="tier-price">$20/mo</span>
						<ul>
							<li>100 messages/month</li>
							<li>Private projects</li>
							<li>Priority support</li>
						</ul>
					</div>
					<div class="pricing-tier">
						<span class="tier-name">Team</span>
						<span class="tier-price">$50/mo</span>
						<ul>
							<li>250 messages/month</li>
							<li>Visual editor</li>
							<li>SSO included</li>
						</ul>
					</div>
					<div class="pricing-tier">
						<span class="tier-name">Enterprise</span>
						<span class="tier-price">$900/mo</span>
						<ul>
							<li>5,000 messages/month</li>
							<li>Everything above</li>
						</ul>
					</div>
				</div>

				<div class="pricing-card">
					<div class="pricing-header bolt">
						<h3>Bolt</h3>
						<span class="pricing-model">Token-based</span>
					</div>
					<div class="pricing-tier">
						<span class="tier-name">Free</span>
						<span class="tier-price">$0</span>
						<ul>
							<li>1M tokens total</li>
							<li>~100k/day limit</li>
							<li>Basic features</li>
						</ul>
					</div>
					<div class="pricing-tier featured">
						<span class="tier-name">Pro</span>
						<span class="tier-price">$20/mo</span>
						<ul>
							<li>10M tokens/month</li>
							<li>Priority access</li>
							<li>All frameworks</li>
						</ul>
					</div>
					<div class="pricing-tier">
						<span class="tier-name">Team</span>
						<span class="tier-price">$50/mo</span>
						<ul>
							<li>26M tokens/month</li>
							<li>Team sharing</li>
						</ul>
					</div>
					<div class="pricing-tier">
						<span class="tier-name">Business</span>
						<span class="tier-price">$200/mo</span>
						<ul>
							<li>120M tokens/month</li>
							<li>Everything above</li>
						</ul>
					</div>
				</div>
			</div>

			<div class="pricing-note">
				<h4>How the billing models differ</h4>
				<p>
					<strong>Lovable:</strong> Each AI interaction costs one message, regardless of complexity. Simple tweak? One message. Complex refactor? Still one message.
				</p>
				<p>
					<strong>Bolt:</strong> Token consumption varies by operation size. Complex operations use more tokens. Bolt's "diffs" feature edits existing code instead of rewriting files to conserve tokens.
				</p>
				<p>
					<strong>Bottom line:</strong> Lovable's model rewards complex prompts. Bolt's model rewards efficient, incremental changes.
				</p>
			</div>
		</section>

		<!-- Supabase Integration -->
		<section>
			<h2>Why does Lovable's Supabase integration matter?</h2>
			<p>
				Most vibe coded apps need auth and a database. Here's where the tools diverge:
			</p>

			<div class="integration-comparison">
				<div class="integration-card lovable-card">
					<h3>Lovable + Supabase</h3>
					<ul>
						<li>Database setup is guided (not manual)</li>
						<li>Auth flows pre-configured with Supabase Auth</li>
						<li>Row Level Security (RLS) prompts included</li>
						<li>Storage and functions available</li>
						<li>One-click connection to existing Supabase project</li>
					</ul>
					<p class="integration-verdict">You describe the data model. Lovable wires up the backend.</p>
				</div>

				<div class="integration-card bolt-card">
					<h3>Bolt + Backend</h3>
					<ul>
						<li>No default database integration</li>
						<li>You configure Supabase, Firebase, or other</li>
						<li>Auth requires manual implementation</li>
						<li>More flexibility, more setup work</li>
						<li>WebContainers sandbox protects during dev</li>
					</ul>
					<p class="integration-verdict">You wire the backend yourself. Bolt focuses on frontend speed.</p>
				</div>
			</div>

			<p>
				For vibe coders who want working auth in 10 minutes, Lovable's integration saves hours. For developers who prefer custom backends, Bolt's flexibility is the point.
			</p>
		</section>

		<!-- GitHub Sync -->
		<section>
			<h2>How does GitHub sync work?</h2>
			<p>
				This is where Lovable has a clear advantage for ongoing development:
			</p>

			<div class="comparison-table-wrapper">
				<table class="comparison-table">
					<thead>
						<tr>
							<th>Feature</th>
							<th>Lovable</th>
							<th>Bolt</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Push to GitHub</td>
							<td>Yes</td>
							<td>Yes (export)</td>
						</tr>
						<tr>
							<td>Pull from GitHub</td>
							<td class="highlight-win">Yes (two-way sync)</td>
							<td>No</td>
						</tr>
						<tr>
							<td>Continue in Cursor/VS Code</td>
							<td class="highlight-win">Yes, stays synced</td>
							<td>Yes, but one-way</td>
						</tr>
						<tr>
							<td>Team workflow</td>
							<td class="highlight-win">Full git workflow</td>
							<td>Basic sharing</td>
						</tr>
					</tbody>
				</table>
			</div>

			<p>
				Lovable's two-way sync means you can edit code locally in <a href="/kb/vibe-coding-tools/cursor/">Cursor</a>, push to GitHub, and Lovable picks up your changes. Bolt is export-only - once you leave, you don't come back.
			</p>
		</section>

		<!-- Workflow Cards -->
		<section>
			<h2>Which matches your vibe coding workflow?</h2>

			<div class="workflow-cards">
				<div class="workflow-card">
					<h3>Investor demo in 2 weeks</h3>
					<div class="recommendation lovable-rec">Lovable</div>
					<p>
						shadcn/ui looks professional out of the box. Supabase handles auth. You'll have something that looks like a real product, not a prototype.
					</p>
				</div>

				<div class="workflow-card">
					<h3>Validate idea in 2 hours</h3>
					<div class="recommendation bolt-rec">Bolt</div>
					<p>
						WebContainers spin up instantly. No account needed for free tier. Get a working prototype to test assumptions before investing more time.
					</p>
				</div>

				<div class="workflow-card">
					<h3>Non-technical founder</h3>
					<div class="recommendation lovable-rec">Lovable</div>
					<p>
						Visual editor means less code anxiety. Guided Supabase setup means no database knowledge needed. More guardrails, fewer footguns.
					</p>
				</div>

				<div class="workflow-card">
					<h3>Learning to code</h3>
					<div class="recommendation bolt-rec">Bolt</div>
					<p>
						Multi-framework support lets you experiment. Code-first approach teaches patterns. Export and study the generated code.
					</p>
				</div>

				<div class="workflow-card">
					<h3>Team collaboration</h3>
					<div class="recommendation lovable-rec">Lovable</div>
					<p>
						Two-way GitHub sync enables real team workflows. SSO on self-serve tiers. Multiplayer prototype development.
					</p>
				</div>

				<div class="workflow-card">
					<h3>Hackathon project</h3>
					<div class="recommendation bolt-rec">Bolt</div>
					<p>
						Speed is everything. WebContainers mean zero setup time. Share links instantly. Fastest path from idea to demo.
					</p>
				</div>
			</div>
		</section>

		<!-- The v0 Question -->
		<section>
			<h2>What about v0?</h2>
			<p>
				<a href="/kb/vibe-coding-tools/v0/">v0 by Vercel</a> competes in this space but serves a different use case:
			</p>
			<ul>
				<li><strong>v0:</strong> Best for UI components. Generates React/Tailwind components you copy into existing projects.</li>
				<li><strong>Lovable:</strong> Best for full-stack MVPs. Generates complete apps with backend and deployment.</li>
				<li><strong>Bolt:</strong> Best for fast prototypes. Generates complete apps but emphasizes speed over polish.</li>
			</ul>
			<p>
				Many vibe coders use v0 for component inspiration, then Lovable or Bolt for the full application.
			</p>
		</section>

		<!-- Security Note -->
		<section class="security-note">
			<h2>A note on security</h2>
			<p>
				Neither tool generates production-ready security out of the box. Common issues:
			</p>
			<ul>
				<li>Incomplete Row Level Security policies (even with Lovable's guidance)</li>
				<li>Missing input validation on API routes</li>
				<li>Hardcoded credentials in example code</li>
				<li>Permissive CORS configurations</li>
			</ul>
			<p>
				Lovable's Supabase integration gives you better defaults, but review everything before launch. See our <a href="/kb/vibe-coding/secure-vibe-coding-guide/">Secure Vibe Coding Guide</a> for the full checklist.
			</p>
		</section>

		<!-- Can You Use Both -->
		<section>
			<h2>Can you use both Lovable and Bolt?</h2>
			<p>
				Yes. A common workflow:
			</p>
			<ul>
				<li><strong>Bolt first:</strong> Rapid prototype to validate the idea works</li>
				<li><strong>Lovable second:</strong> Rebuild with production polish once validated</li>
				<li><strong>Export to Cursor:</strong> Continue development with full IDE power</li>
			</ul>
			<p>
				Bolt's speed advantage makes it ideal for throwaway prototypes. When you find a winner, Lovable's polish and Supabase integration make the production version faster to build.
			</p>
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
		<section>
			<h2>Related Comparisons</h2>
			<div class="related-grid">
				<a href="/kb/vibe-coding-tools/lovable/" class="card card-interactive">
					<span class="related-card-category">Tool Guide</span>
					<h3 class="related-card-title">Lovable for Vibe Coders</h3>
				</a>
				<a href="/kb/vibe-coding-tools/bolt/" class="card card-interactive">
					<span class="related-card-category">Tool Guide</span>
					<h3 class="related-card-title">Bolt.new for Vibe Coders</h3>
				</a>
				<a href="/kb/vibe-coding-tools/v0/" class="card card-interactive">
					<span class="related-card-category">Tool Guide</span>
					<h3 class="related-card-title">v0 by Vercel</h3>
				</a>
				<a href="/kb/vibe-coding-tools/replit-vs-cursor/" class="card card-interactive">
					<span class="related-card-category">Comparison</span>
					<h3 class="related-card-title">Replit vs Cursor</h3>
				</a>
				<a href="/kb/security/stacks/nextjs-supabase/" class="card card-interactive">
					<span class="related-card-category">Stack Guide</span>
					<h3 class="related-card-title">Next.js + Supabase Security</h3>
				</a>
				<a href="/kb/vibe-coding/secure-vibe-coding-guide/" class="card card-interactive">
					<span class="related-card-category">Pillar Guide</span>
					<h3 class="related-card-title">Secure Vibe Coding Guide</h3>
				</a>
			</div>
		</section>
	</article>
</div>

<style>
	/* Clean, minimal styles - no tool brand colors */

	.subtitle {
		color: var(--text-secondary);
		font-size: 1.1rem;
	}

	/* Growth Callout - neutral accent */
	.growth-callout {
		background: var(--bg-secondary);
		border-left: 3px solid var(--border-strong);
		padding: 1.5rem;
		margin-bottom: 2.5rem;
	}

	.growth-callout h2 {
		border-bottom: none;
		padding-bottom: 0;
		margin-bottom: 1rem;
	}

	/* Comparison Table - clean and readable */
	.comparison-table-wrapper {
		overflow-x: auto;
		margin: 1.5rem 0;
	}

	.comparison-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.9rem;
	}

	.comparison-table th,
	.comparison-table td {
		padding: 0.75rem 1rem;
		text-align: left;
		border-bottom: 1px solid var(--border);
	}

	.comparison-table th {
		background: var(--bg-secondary);
		font-weight: 600;
		color: var(--text-primary);
	}

	/* Muted green for winner highlights - not distracting */
	.comparison-table td.highlight-win {
		color: var(--green-muted);
		font-weight: 500;
	}

	/* Pricing Grid - neutral, no brand colors */
	.pricing-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
		margin: 1.5rem 0;
	}

	@media (max-width: 768px) {
		.pricing-grid {
			grid-template-columns: 1fr;
		}
	}

	.pricing-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		overflow: hidden;
	}

	.pricing-header {
		padding: 1rem 1.5rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: var(--bg-tertiary);
		border-bottom: 1px solid var(--border);
	}

	.pricing-header h3 {
		margin: 0;
		color: var(--text-primary);
	}

	.pricing-model {
		font-size: 0.75rem;
		padding: 0.25rem 0.5rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		color: var(--text-tertiary);
	}

	.pricing-tier {
		padding: 1rem 1.5rem;
		border-bottom: 1px solid var(--border);
	}

	.pricing-tier:last-child {
		border-bottom: none;
	}

	.pricing-tier.featured {
		background: var(--bg-tertiary);
	}

	.tier-name {
		font-weight: 600;
		font-size: 0.9rem;
	}

	.tier-price {
		float: right;
		font-size: 1.1rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.pricing-tier ul {
		margin: 0.75rem 0 0;
		padding-left: 1.25rem;
	}

	.pricing-tier li {
		font-size: 0.85rem;
		margin-bottom: 0.25rem;
	}

	.pricing-note {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin-top: 1.5rem;
	}

	.pricing-note p:last-child {
		margin-bottom: 0;
	}

	/* Integration Comparison - neutral cards */
	.integration-comparison {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
		margin: 1.5rem 0;
	}

	@media (max-width: 768px) {
		.integration-comparison {
			grid-template-columns: 1fr;
		}
	}

	.integration-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
	}

	.integration-card h3 {
		margin-top: 0;
		color: var(--text-primary);
	}

	.integration-verdict {
		font-size: 0.9rem;
		font-style: italic;
		color: var(--text-tertiary);
		margin-bottom: 0;
		padding-top: 1rem;
		border-top: 1px solid var(--border);
	}

	/* Workflow Cards - clean and uniform */
	.workflow-cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.workflow-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.25rem;
	}

	.workflow-card h3 {
		margin-top: 0;
		margin-bottom: 0.75rem;
		font-size: 1rem;
	}

	.workflow-card p {
		font-size: 0.9rem;
		margin-bottom: 0;
		color: var(--text-secondary);
	}

	/* Recommendation badges - subtle, text only */
	.recommendation {
		display: inline-block;
		padding: 0.25rem 0.5rem;
		font-size: 0.75rem;
		font-weight: 600;
		margin-bottom: 0.75rem;
		background: var(--bg-tertiary);
		color: var(--text-secondary);
		text-transform: uppercase;
		letter-spacing: 0.03em;
	}

	/* Security Note - neutral */
	.security-note {
		background: var(--bg-secondary);
		border-left: 3px solid var(--border-strong);
		padding: 1.5rem;
	}

	.security-note h2 {
		border-bottom: none;
		padding-bottom: 0;
	}

	/* Related card labels */
	.related-card-category {
		display: block;
		font-size: 0.75rem;
		color: var(--text-tertiary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 0.25rem;
	}

	.related-card-title {
		font-size: 1rem;
		margin: 0;
		color: var(--text-primary);
	}
</style>
