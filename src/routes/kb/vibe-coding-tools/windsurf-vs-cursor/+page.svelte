<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Windsurf vs Cursor 2025: Which AI IDE Ships Faster?',
		description: 'Windsurf vs Cursor comparison for vibe coders. Cascade vs Composer agents, $15 vs $20 pricing, JetBrains support, and Cognition acquisition. See which tool matches your workflow.',
		url: '/kb/vibe-coding-tools/windsurf-vs-cursor/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Vibe Coding Tools', href: '/kb/vibe-coding-tools' },
		{ label: 'Windsurf vs Cursor' }
	];

	// FAQ data
	const faqs = [
		{
			question: 'Is Windsurf better than Cursor?',
			answer: 'Windsurf offers more autonomous coding via Cascade with Memories that persist context across sessions. Cursor has a larger community and more stability. Windsurf costs $15/month vs Cursor\'s $20/month. Choose Windsurf for autonomy and JetBrains support. Choose Cursor for ecosystem and proven reliability.'
		},
		{
			question: 'Is Windsurf free?',
			answer: 'Yes. Windsurf Free includes unlimited basic completions and limited Cascade credits. Pro costs $15/month for unlimited Cascade flows, priority models, and Memories. The free tier is more generous than Cursor\'s 2000 completion limit.'
		},
		{
			question: 'Who owns Windsurf now?',
			answer: 'Cognition (makers of Devin) acquired Windsurf from Codeium in July 2025. The acquisition valued Cognition at $10.2 billion. This brings Devin\'s autonomous agent technology to Windsurf users and positions it against Cursor more directly.'
		},
		{
			question: 'What is Windsurf Cascade?',
			answer: 'Cascade is Windsurf\'s autonomous AI agent that can execute multi-step tasks independently. Key features include Memories (persistent context), Turbo mode (faster completions), auto-fix on errors, and multi-step planning. It\'s more autonomous than Cursor Composer.'
		},
		{
			question: 'Does Windsurf work with JetBrains?',
			answer: 'Yes. Windsurf supports 40+ IDEs including JetBrains products (IntelliJ, PyCharm, WebStorm) and VS Code. Cursor only works as a VS Code fork. This makes Windsurf the only option if you\'re committed to JetBrains.'
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
			{"@type": "ListItem", "position": 3, "name": "Windsurf vs Cursor"}
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
			<h1>Windsurf vs Cursor: Which AI IDE Ships Faster?</h1>
			<p class="subtitle">Feature breakdown for vibe coders who want to ship, not configure</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Windsurf</strong> saves you $60/year ($15 vs $20/mo), works with JetBrains IDEs, and has Cascade - an agent with persistent memory.
				<strong>Cursor</strong> has a larger community, more stability, and background agents that keep working while you code.
				Most vibe coders pick based on IDE preference: JetBrains users have no choice but Windsurf. VS Code users often prefer Cursor's ecosystem.
			</p>
		</div>

		<!-- Big News: Cognition Acquisition -->
		<section class="acquisition-callout">
			<h2>What changed in 2025: Cognition acquired Windsurf</h2>
			<p>
				<a href="https://www.cognition.ai/" target="_blank" rel="noopener">Cognition</a>, the company behind <a href="https://www.devin.ai/" target="_blank" rel="noopener">Devin</a> (the autonomous AI developer), acquired Windsurf from Codeium in July 2025. The deal valued Cognition at <a href="https://techcrunch.com/2025/07/14/report-cognition-will-acquire-windsurf-in-10-2b-deal/" target="_blank" rel="noopener">$10.2 billion according to TechCrunch</a>.
			</p>
			<p>
				This matters for vibe coders because Devin's autonomous agent technology is coming to Windsurf. Cascade already feels more autonomous than Cursor's Composer - expect that gap to widen as Cognition integrates their tech.
			</p>
		</section>

		<!-- Quick Comparison - Mobile-friendly stacked layout -->
		<section>
			<h2>How do Windsurf and Cursor compare at a glance?</h2>
			<p>
				Both are popular choices for vibe coding, but they take different approaches. Here's what matters:
			</p>

			<div class="comparison-stack">
				<div class="comparison-row">
					<div class="comparison-label">Monthly cost</div>
					<div class="comparison-values">
						<div class="comparison-cell highlight-win">
							<span class="cell-tool">Windsurf</span>
							<span class="cell-value">$15/month</span>
						</div>
						<div class="comparison-cell">
							<span class="cell-tool">Cursor</span>
							<span class="cell-value">$20/month</span>
						</div>
					</div>
				</div>

				<div class="comparison-row">
					<div class="comparison-label">Parent company</div>
					<div class="comparison-values">
						<div class="comparison-cell">
							<span class="cell-tool">Windsurf</span>
							<span class="cell-value"><a href="https://www.cognition.ai/" target="_blank" rel="noopener">Cognition</a> (acquired Jul 2025)</span>
						</div>
						<div class="comparison-cell">
							<span class="cell-tool">Cursor</span>
							<span class="cell-value"><a href="https://anysphere.inc/" target="_blank" rel="noopener">Anysphere</a></span>
						</div>
					</div>
				</div>

				<div class="comparison-row">
					<div class="comparison-label">IDE support</div>
					<div class="comparison-values">
						<div class="comparison-cell highlight-win">
							<span class="cell-tool">Windsurf</span>
							<span class="cell-value">40+ IDEs (JetBrains, VS Code)</span>
						</div>
						<div class="comparison-cell">
							<span class="cell-tool">Cursor</span>
							<span class="cell-value">VS Code fork only</span>
						</div>
					</div>
				</div>

				<div class="comparison-row">
					<div class="comparison-label">AI agent</div>
					<div class="comparison-values">
						<div class="comparison-cell">
							<span class="cell-tool">Windsurf</span>
							<span class="cell-value">Cascade (autonomous)</span>
						</div>
						<div class="comparison-cell">
							<span class="cell-tool">Cursor</span>
							<span class="cell-value">Composer (guided)</span>
						</div>
					</div>
				</div>

				<div class="comparison-row">
					<div class="comparison-label">Persistent memory</div>
					<div class="comparison-values">
						<div class="comparison-cell highlight-win">
							<span class="cell-tool">Windsurf</span>
							<span class="cell-value">Memories (project context)</span>
						</div>
						<div class="comparison-cell">
							<span class="cell-tool">Cursor</span>
							<span class="cell-value">Notepad (manual)</span>
						</div>
					</div>
				</div>

				<div class="comparison-row">
					<div class="comparison-label">Background agents</div>
					<div class="comparison-values">
						<div class="comparison-cell">
							<span class="cell-tool">Windsurf</span>
							<span class="cell-value">Limited</span>
						</div>
						<div class="comparison-cell highlight-win">
							<span class="cell-tool">Cursor</span>
							<span class="cell-value">Yes (runs while you code)</span>
						</div>
					</div>
				</div>

				<div class="comparison-row">
					<div class="comparison-label">Free tier</div>
					<div class="comparison-values">
						<div class="comparison-cell highlight-win">
							<span class="cell-tool">Windsurf</span>
							<span class="cell-value">Generous</span>
						</div>
						<div class="comparison-cell">
							<span class="cell-tool">Cursor</span>
							<span class="cell-value">2000 completions</span>
						</div>
					</div>
				</div>

				<div class="comparison-row">
					<div class="comparison-label">Community size</div>
					<div class="comparison-values">
						<div class="comparison-cell">
							<span class="cell-tool">Windsurf</span>
							<span class="cell-value">Growing</span>
						</div>
						<div class="comparison-cell highlight-win">
							<span class="cell-tool">Cursor</span>
							<span class="cell-value">Largest</span>
						</div>
					</div>
				</div>

				<div class="comparison-row">
					<div class="comparison-label">Proprietary model</div>
					<div class="comparison-values">
						<div class="comparison-cell">
							<span class="cell-tool">Windsurf</span>
							<span class="cell-value">SWE-1.5</span>
						</div>
						<div class="comparison-cell">
							<span class="cell-tool">Cursor</span>
							<span class="cell-value">None (uses Claude, GPT-4)</span>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Cascade vs Composer -->
		<section>
			<h2>How does Windsurf Cascade compare to Cursor Composer?</h2>
			<p>
				This is the real comparison. Both tools have chat and autocomplete - those are table stakes. What separates them is their AI agent approach.
			</p>

			<div class="agent-cards">
				<div class="agent-card">
					<h3>Windsurf Cascade</h3>
					<p class="agent-philosophy">"Let me handle it end-to-end"</p>
					<ul>
						<li><strong>Memories:</strong> Remembers project context across sessions</li>
						<li><strong>Turbo mode:</strong> 13x faster completions with <a href="https://codeium.com/blog/swe-1-5-turbo-model" target="_blank" rel="noopener">SWE-1.5</a></li>
						<li><strong>Auto-fix:</strong> Detects errors and fixes them automatically</li>
						<li><strong>Multi-step planning:</strong> Breaks complex tasks into steps</li>
						<li><strong>Tool use:</strong> Can browse web, run terminal, edit files</li>
					</ul>
					<p class="agent-best">Best for: Tasks you want to hand off completely</p>
				</div>

				<div class="agent-card">
					<h3>Cursor Composer</h3>
					<p class="agent-philosophy">"Let's work through this together"</p>
					<ul>
						<li><strong>Multi-file editing:</strong> Changes multiple files at once</li>
						<li><strong>Background agents:</strong> Keep working while you code</li>
						<li><strong>Model flexibility:</strong> Switch between Claude, GPT-4, custom</li>
						<li><strong>Apply workflow:</strong> Review each change before applying</li>
						<li><strong>Codebase indexing:</strong> Understands your full project</li>
					</ul>
					<p class="agent-best">Best for: Collaborative coding with oversight</p>
				</div>
			</div>

			<p>
				The pattern: Windsurf gives you more autonomy, Cursor gives you more control. If you're vibe coding a prototype and want speed, Cascade's autonomy helps. If you're working in production code and want to review changes, Composer's workflow is safer.
			</p>
		</section>

		<!-- Workflow Comparison -->
		<section>
			<h2>What does each workflow actually look like?</h2>
			<p>
				Same task, different approaches. Here's how each tool handles a typical vibe coding session.
			</p>

			<div class="workflow-comparison">
				<div class="workflow-block">
					<div class="workflow-header">
						<span class="workflow-task">Task: Add new API endpoint with database integration</span>
					</div>
					<div class="workflow-steps">
						<div class="workflow-tool-section">
							<h4>Windsurf Cascade</h4>
							<div class="workflow-metrics">
								<span class="metric">Time: 8-12 min</span>
								<span class="metric">Iterations: 1-2</span>
								<span class="metric">Supervision: Low</span>
							</div>
							<ol>
								<li>Cascade reads Memories for project context</li>
								<li>Plans multi-step implementation</li>
								<li>Executes all steps autonomously</li>
								<li>Auto-fixes any errors it encounters</li>
								<li>Updates Memories with new context</li>
							</ol>
						</div>
						<div class="workflow-tool-section">
							<h4>Cursor Composer</h4>
							<div class="workflow-metrics">
								<span class="metric">Time: 12-18 min</span>
								<span class="metric">Iterations: 2-4</span>
								<span class="metric">Supervision: Medium</span>
							</div>
							<ol>
								<li>Reference codebase context manually</li>
								<li>Composer generates multi-file changes</li>
								<li>Review diff for each file</li>
								<li>Apply changes incrementally</li>
								<li>Fix issues as they surface</li>
							</ol>
						</div>
					</div>
					<div class="workflow-verdict">
						Windsurf faster for autonomous tasks. Cursor safer for production code.
					</div>
				</div>
			</div>
		</section>

		<!-- Pricing Deep Dive -->
		<section>
			<h2>What does each tool actually cost?</h2>
			<p>
				Windsurf is 25% cheaper. But there's nuance in what you get:
			</p>

			<div class="pricing-stack">
				<div class="pricing-tier">
					<div class="tier-header">
						<span class="tier-name">Free Tier</span>
					</div>
					<div class="tier-values">
						<div class="tier-cell highlight-win">
							<span class="tier-tool">Windsurf</span>
							<span class="tier-value">Unlimited basic completions + limited Cascade</span>
						</div>
						<div class="tier-cell">
							<span class="tier-tool">Cursor</span>
							<span class="tier-value">2000 completions + 50 slow requests</span>
						</div>
					</div>
				</div>

				<div class="pricing-tier">
					<div class="tier-header">
						<span class="tier-name">Pro Tier</span>
					</div>
					<div class="tier-values">
						<div class="tier-cell highlight-win">
							<span class="tier-tool">Windsurf</span>
							<span class="tier-value">$15/mo - Unlimited Cascade, Memories, Turbo</span>
						</div>
						<div class="tier-cell">
							<span class="tier-tool">Cursor</span>
							<span class="tier-value">$20/mo - Unlimited completions, 500 fast requests</span>
						</div>
					</div>
				</div>

				<div class="pricing-tier">
					<div class="tier-header">
						<span class="tier-name">Team/Business</span>
					</div>
					<div class="tier-values">
						<div class="tier-cell">
							<span class="tier-tool">Windsurf</span>
							<span class="tier-value">$30/user/mo - Admin controls, analytics</span>
						</div>
						<div class="tier-cell">
							<span class="tier-tool">Cursor</span>
							<span class="tier-value">$40/user/mo - Privacy mode, admin dashboard</span>
						</div>
					</div>
				</div>
			</div>

			<div class="pricing-callout">
				<h4>Annual Savings</h4>
				<p>
					<strong>Windsurf Pro saves you $60/year vs Cursor Pro.</strong> Both offer 2-week free trials. For vibe coders just starting out, Windsurf's free tier is more generous.
				</p>
			</div>
		</section>

		<!-- JetBrains Section -->
		<section>
			<h2>What if you use JetBrains (IntelliJ, PyCharm, WebStorm)?</h2>
			<p>
				Windsurf wins by default. Cursor is a VS Code fork - it doesn't work with JetBrains at all.
			</p>
			<p>
				<a href="https://codeium.com/windsurf/install" target="_blank" rel="noopener">Windsurf supports 40+ IDEs</a> including:
			</p>
			<ul>
				<li><strong>JetBrains:</strong> IntelliJ IDEA, PyCharm, WebStorm, PHPStorm, GoLand, Rider</li>
				<li><strong>VS Code family:</strong> VS Code, Cursor, Windsurf IDE</li>
				<li><strong>Others:</strong> Neovim, Vim, Emacs, Sublime Text, Eclipse</li>
			</ul>
			<p>
				If you're vibe coding in a JetBrains IDE, your only AI agent option with deep integration is Windsurf (or GitHub Copilot, but that's less autonomous).
			</p>
		</section>

		<!-- Decision Matrix -->
		<section>
			<h2>Quick decision matrix</h2>
			<p>
				Pick the right tool for your workflow:
			</p>

			<div class="decision-matrix">
				<div class="decision-category">
					<h3>Choose Windsurf when...</h3>
					<ul>
						<li><strong>Budget matters:</strong> $15/mo vs $20/mo saves $60/year</li>
						<li><strong>JetBrains user:</strong> No competition - only option</li>
						<li><strong>Maximum autonomy:</strong> Cascade handles tasks end-to-end</li>
						<li><strong>Context persistence:</strong> Memories remember across sessions</li>
						<li><strong>Speed priority:</strong> Turbo mode with SWE-1.5</li>
						<li><strong>Government work:</strong> FedRAMP High certified</li>
					</ul>
				</div>
				<div class="decision-category">
					<h3>Choose Cursor when...</h3>
					<ul>
						<li><strong>Community size:</strong> More tutorials, examples, answers</li>
						<li><strong>Background work:</strong> Agents run while you code</li>
						<li><strong>Model flexibility:</strong> Switch between Claude, GPT-4, custom</li>
						<li><strong>Change review:</strong> Review each diff before applying</li>
						<li><strong>VS Code ecosystem:</strong> Full extension compatibility</li>
						<li><strong>Stability:</strong> More mature, proven reliability</li>
					</ul>
				</div>
			</div>
		</section>

		<!-- Enterprise Features -->
		<section>
			<h2>What about enterprise features?</h2>
			<p>
				Both tools have enterprise offerings, but with different compliance levels:
			</p>

			<div class="comparison-stack">
				<div class="comparison-row">
					<div class="comparison-label">SOC 2 Type II</div>
					<div class="comparison-values">
						<div class="comparison-cell">
							<span class="cell-tool">Windsurf</span>
							<span class="cell-value">Yes</span>
						</div>
						<div class="comparison-cell">
							<span class="cell-tool">Cursor</span>
							<span class="cell-value">Yes</span>
						</div>
					</div>
				</div>

				<div class="comparison-row">
					<div class="comparison-label">Privacy mode</div>
					<div class="comparison-values">
						<div class="comparison-cell">
							<span class="cell-tool">Windsurf</span>
							<span class="cell-value">Yes</span>
						</div>
						<div class="comparison-cell">
							<span class="cell-tool">Cursor</span>
							<span class="cell-value">Yes (Business tier)</span>
						</div>
					</div>
				</div>

				<div class="comparison-row">
					<div class="comparison-label">FedRAMP High</div>
					<div class="comparison-values">
						<div class="comparison-cell highlight-win">
							<span class="cell-tool">Windsurf</span>
							<span class="cell-value">Yes</span>
						</div>
						<div class="comparison-cell">
							<span class="cell-tool">Cursor</span>
							<span class="cell-value">No</span>
						</div>
					</div>
				</div>

				<div class="comparison-row">
					<div class="comparison-label">Self-hosted option</div>
					<div class="comparison-values">
						<div class="comparison-cell">
							<span class="cell-tool">Windsurf</span>
							<span class="cell-value">Enterprise tier</span>
						</div>
						<div class="comparison-cell">
							<span class="cell-tool">Cursor</span>
							<span class="cell-value">Enterprise tier</span>
						</div>
					</div>
				</div>

				<div class="comparison-row">
					<div class="comparison-label">SSO/SAML</div>
					<div class="comparison-values">
						<div class="comparison-cell">
							<span class="cell-tool">Windsurf</span>
							<span class="cell-value">Enterprise</span>
						</div>
						<div class="comparison-cell">
							<span class="cell-tool">Cursor</span>
							<span class="cell-value">Business+</span>
						</div>
					</div>
				</div>
			</div>

			<p>
				If you need FedRAMP High compliance for government work, Windsurf is the only option. For most startups, both have sufficient security certifications.
			</p>
		</section>

		<!-- Security Note -->
		<section class="security-note">
			<h2>What about security?</h2>
			<p>
				Both tools have had CVEs in 2025. If you're vibe coding, you should:
			</p>
			<ul>
				<li>Keep your IDE updated (both auto-update by default)</li>
				<li>Use <a href="/kb/prompts/how-to-use-cursor-rules/">rules files</a> to guide AI behavior</li>
				<li>Never put secrets in files the AI can access</li>
				<li>Review AI-generated code before deploying</li>
			</ul>
			<p>
				More autonomous tools have larger attack surfaces. If security is your primary concern, see our <a href="/kb/vibe-coding/secure-vibe-coding-guide/">Secure Vibe Coding Guide</a> for detailed practices.
			</p>
		</section>

		<!-- Can You Use Both -->
		<section>
			<h2>Can you use both Windsurf and Cursor?</h2>
			<p>
				Yes. They install separately and don't conflict. Some vibe coders use:
			</p>
			<ul>
				<li><strong>Windsurf</strong> for JetBrains projects and autonomous prototyping</li>
				<li><strong>Cursor</strong> for VS Code projects and production work</li>
			</ul>
			<p>
				For even more power, combine either with <a href="/kb/vibe-coding-tools/claude-code/">Claude Code</a> in the terminal. Run Claude Code for complex reasoning tasks while using your IDE's agent for quick edits.
			</p>
		</section>

		<!-- FAQ Section -->
		<section>
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
				<a href="/kb/vibe-coding-tools/claude-code-vs-cursor/" class="card card-interactive">
					<span class="related-card-category">Comparison</span>
					<h3 class="related-card-title">Claude Code vs Cursor</h3>
				</a>
				<a href="/kb/vibe-coding-tools/cursor-vs-copilot/" class="card card-interactive">
					<span class="related-card-category">Comparison</span>
					<h3 class="related-card-title">Cursor vs GitHub Copilot</h3>
				</a>
				<a href="/kb/vibe-coding-tools/cursor/" class="card card-interactive">
					<span class="related-card-category">Tool Guide</span>
					<h3 class="related-card-title">Cursor for Vibe Coders</h3>
				</a>
				<a href="/kb/prompts/how-to-use-cursor-rules/" class="card card-interactive">
					<span class="related-card-category">Guide</span>
					<h3 class="related-card-title">How to Use Cursor Rules</h3>
				</a>
				<a href="/kb/vibe-coding/secure-vibe-coding-guide/" class="card card-interactive">
					<span class="related-card-category">Pillar Guide</span>
					<h3 class="related-card-title">Secure Vibe Coding Guide</h3>
				</a>
				<a href="/kb/prompts/best-ai-coding-tools-2025/" class="card card-interactive">
					<span class="related-card-category">Guide</span>
					<h3 class="related-card-title">Best AI Coding Tools 2025</h3>
				</a>
			</div>
		</section>
	</article>
</div>

<style>
	/* Badge row */
	.badge-row {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		margin-bottom: 1rem;
	}

	.badge-comparison {
		border-color: var(--text-tertiary);
		color: var(--text-secondary);
		background: transparent;
	}

	.subtitle {
		color: var(--text-secondary);
		font-size: 1.1rem;
	}

	/* Acquisition Callout */
	.acquisition-callout {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-left: 3px solid var(--border-strong);
		padding: 1.5rem;
		margin-bottom: 2.5rem;
	}

	.acquisition-callout h2 {
		margin-top: 0;
		color: var(--text-primary);
		border-bottom: none;
		padding-bottom: 0;
	}

	/* Mobile-friendly stacked comparison rows */
	.comparison-stack,
	.pricing-stack {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin: 1.5rem 0;
	}

	.comparison-row,
	.pricing-tier {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
	}

	.comparison-label,
	.tier-header {
		padding: 0.75rem 1rem;
		background: var(--bg-tertiary);
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--text-secondary);
		border-bottom: 1px solid var(--border);
	}

	.comparison-values,
	.tier-values {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	@media (max-width: 600px) {
		.comparison-values,
		.tier-values {
			grid-template-columns: 1fr;
		}
	}

	.comparison-cell,
	.tier-cell {
		padding: 0.75rem 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		border-right: 1px solid var(--border);
	}

	.comparison-cell:last-child,
	.tier-cell:last-child {
		border-right: none;
	}

	@media (max-width: 600px) {
		.comparison-cell,
		.tier-cell {
			border-right: none;
			border-bottom: 1px solid var(--border);
		}

		.comparison-cell:last-child,
		.tier-cell:last-child {
			border-bottom: none;
		}
	}

	.cell-tool,
	.tier-tool {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.65rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--text-tertiary);
	}

	.cell-value,
	.tier-value {
		font-size: 0.9rem;
		color: var(--text-primary);
	}

	.highlight-win .cell-value,
	.highlight-win .tier-value {
		color: var(--green-muted);
		font-weight: 500;
	}

	/* Agent Cards */
	.agent-cards {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
		margin: 1.5rem 0;
	}

	@media (max-width: 768px) {
		.agent-cards {
			grid-template-columns: 1fr;
		}
	}

	.agent-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
	}

	.agent-card h3 {
		margin-top: 0;
		margin-bottom: 0.5rem;
		color: var(--text-primary);
	}

	.agent-philosophy {
		font-style: italic;
		color: var(--text-secondary);
		margin-bottom: 1rem;
	}

	.agent-best {
		font-size: 0.875rem;
		padding-top: 1rem;
		border-top: 1px solid var(--border);
		margin-bottom: 0;
	}

	.agent-card ul {
		margin-bottom: 1rem;
	}

	.agent-card li {
		font-size: 0.9rem;
	}

	/* Workflow Comparison */
	.workflow-comparison {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		margin: 1.5rem 0;
	}

	.workflow-block {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
	}

	.workflow-header {
		padding: 0.75rem 1rem;
		background: var(--bg-tertiary);
		border-bottom: 1px solid var(--border);
	}

	.workflow-task {
		font-weight: 600;
		color: var(--text-primary);
	}

	.workflow-steps {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		padding: 1rem;
	}

	@media (max-width: 768px) {
		.workflow-steps {
			grid-template-columns: 1fr;
		}
	}

	.workflow-tool-section h4 {
		margin: 0 0 0.5rem 0;
		font-size: 0.9rem;
		color: var(--text-primary);
	}

	.workflow-metrics {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 0.75rem;
	}

	.metric {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.7rem;
		padding: 0.25rem 0.5rem;
		background: var(--bg-tertiary);
		color: var(--text-secondary);
	}

	.workflow-tool-section ol {
		margin: 0;
		padding-left: 1.25rem;
		font-size: 0.85rem;
		color: var(--text-secondary);
	}

	.workflow-tool-section li {
		margin-bottom: 0.25rem;
	}

	.workflow-verdict {
		padding: 0.75rem 1rem;
		background: var(--bg-tertiary);
		border-top: 1px solid var(--border);
		font-size: 0.85rem;
		color: var(--green-muted);
		font-weight: 500;
	}

	/* Pricing Callout */
	.pricing-callout {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-left: 3px solid var(--green-muted);
		padding: 1.25rem;
		margin: 1.5rem 0;
	}

	.pricing-callout h4 {
		margin: 0 0 0.5rem 0;
		color: var(--text-primary);
	}

	.pricing-callout p {
		margin: 0;
		font-size: 0.95rem;
	}

	/* Decision Matrix */
	.decision-matrix {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		margin: 1.5rem 0;
	}

	@media (max-width: 768px) {
		.decision-matrix {
			grid-template-columns: 1fr;
		}
	}

	.decision-category {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.25rem;
	}

	.decision-category h3 {
		margin-top: 0;
		font-size: 1rem;
		color: var(--text-primary);
	}

	.decision-category ul {
		margin: 0;
		padding-left: 1.25rem;
	}

	.decision-category li {
		font-size: 0.9rem;
		margin-bottom: 0.5rem;
	}

	/* Security Note */
	.security-note {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-left: 3px solid var(--orange);
		padding: 1.5rem;
	}

	.security-note h2 {
		margin-top: 0;
		border-bottom: none;
		padding-bottom: 0;
	}

	/* Related Content */
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
