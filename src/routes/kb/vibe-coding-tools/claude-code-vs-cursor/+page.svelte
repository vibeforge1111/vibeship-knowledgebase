<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Claude Code vs Cursor 2025: Why Top Developers Use Both',
		description: 'Claude Code vs Cursor: not either/or. The best vibe coders run both. Learn the dual-stack workflow, pricing breakdown, and when to use each tool.',
		url: '/kb/vibe-coding-tools/claude-code-vs-cursor/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Vibe Coding Tools', href: '/kb/vibe-coding-tools' },
		{ label: 'Claude Code vs Cursor' }
	];

	// FAQ data
	const faqs = [
		{
			question: 'Is Claude Code better than Cursor?',
			answer: 'Different tools for different jobs. Claude Code produces 30% fewer code reworks on complex tasks. Cursor is faster for quick edits and autocomplete. Most experienced vibe coders use both: Claude Code for architecture and complex refactoring, Cursor for daily coding and fast iteration.'
		},
		{
			question: 'Can I run Claude Code inside Cursor?',
			answer: 'Yes. Open Cursor\'s integrated terminal and run Claude Code directly. You get Cursor\'s IDE features (extensions, diff viewer, file explorer) plus Claude Code\'s agentic capabilities. Use /ide command to enable automatic context sharing between them.'
		},
		{
			question: 'How much does Claude Code cost vs Cursor?',
			answer: 'Cursor is $20/month flat. Claude Code uses subscription tiers: Pro ($20/month, 40-80 hours Sonnet 4/week), Max $100 (140-280 hours Sonnet 4, 15-35 hours Opus 4), Max $200 (240-480 hours Sonnet 4, 24-40 hours Opus 4). For heavy vibe coding, the $100 Max tier with Cursor ($120/month total) is the power user setup.'
		},
		{
			question: 'Which tool has better context handling?',
			answer: 'Claude Code has a true 200K token context window, reliable for large codebases. Cursor\'s context can reduce under load to maintain performance. For massive refactoring across 50+ files, Claude Code handles context more consistently.'
		},
		{
			question: 'Should beginners start with Claude Code or Cursor?',
			answer: 'Start with Cursor. The familiar IDE interface, autocomplete, and visual feedback make learning easier. Add Claude Code once you\'re comfortable with AI-assisted development and need more autonomous task execution.'
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
			{"@type": "ListItem", "position": 3, "name": "Claude Code vs Cursor"}
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
				<span class="badge">2025</span>
			</div>
			<h1>Claude Code vs Cursor: The Smart Move Is Using Both</h1>
			<p class="subtitle">How top vibe coders combine terminal power with IDE speed</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				Stop asking "which one?" The <a href="https://www.starkinsider.com/2025/10/claude-vs-cursor-dual-ai-coding-workflow.html" target="_blank" rel="noopener">best developers use both</a>.
				<strong>Claude Code</strong> is your senior engineer for complex architecture and multi-file refactoring.
				<strong>Cursor</strong> is your fast IDE for autocomplete and quick edits.
				Run Claude Code in Cursor's terminal and you get the best of both. Claude Max ($100/mo) + Cursor Pro ($20/mo) = $120/mo for the full power user stack.
			</p>
		</div>

		<!-- Quantitative Comparison -->
		<section>
			<h2>How do Claude Code and Cursor compare?</h2>
			<p>
				Different tools, different strengths. Claude Code is a terminal-based autonomous agent that plans and executes complex tasks. Cursor is an AI-powered IDE that augments your typing with fast suggestions. <a href="https://www.sidetool.co/post/combining-cursor-and-claude-code-for-next-level-app-development/" target="_blank" rel="noopener">Together, they form a dual-stack workflow</a> where Claude architects and Cursor implements.
			</p>

			<div class="comparison-stack">
				<div class="comparison-row">
					<div class="comparison-label">Company</div>
					<div class="comparison-values">
						<div class="comparison-cell">
							<span class="cell-tool">Claude Code</span>
							<span class="cell-value"><a href="https://www.anthropic.com" target="_blank" rel="noopener">Anthropic</a></span>
						</div>
						<div class="comparison-cell">
							<span class="cell-tool">Cursor</span>
							<span class="cell-value">Anysphere</span>
						</div>
					</div>
				</div>

				<div class="comparison-row">
					<div class="comparison-label">Interface</div>
					<div class="comparison-values">
						<div class="comparison-cell">
							<span class="cell-tool">Claude Code</span>
							<span class="cell-value">Terminal (CLI)</span>
						</div>
						<div class="comparison-cell">
							<span class="cell-tool">Cursor</span>
							<span class="cell-value">IDE (VS Code fork)</span>
						</div>
					</div>
				</div>

				<div class="comparison-row">
					<div class="comparison-label">Core Strength</div>
					<div class="comparison-values">
						<div class="comparison-cell highlight-win">
							<span class="cell-tool">Claude Code</span>
							<span class="cell-value">Autonomous complex tasks</span>
						</div>
						<div class="comparison-cell highlight-win">
							<span class="cell-tool">Cursor</span>
							<span class="cell-value">Fast autocomplete + UI</span>
						</div>
					</div>
				</div>

				<div class="comparison-row">
					<div class="comparison-label">Context Window</div>
					<div class="comparison-values">
						<div class="comparison-cell highlight-win">
							<span class="cell-tool">Claude Code</span>
							<span class="cell-value">200K tokens (reliable)</span>
						</div>
						<div class="comparison-cell">
							<span class="cell-tool">Cursor</span>
							<span class="cell-value">Variable (performance-managed)</span>
						</div>
					</div>
				</div>

				<div class="comparison-row">
					<div class="comparison-label">Multi-file Editing</div>
					<div class="comparison-values">
						<div class="comparison-cell highlight-win">
							<span class="cell-tool">Claude Code</span>
							<span class="cell-value">Excellent (native)</span>
						</div>
						<div class="comparison-cell">
							<span class="cell-tool">Cursor</span>
							<span class="cell-value">Good (Composer)</span>
						</div>
					</div>
				</div>

				<div class="comparison-row">
					<div class="comparison-label">Autocomplete</div>
					<div class="comparison-values">
						<div class="comparison-cell">
							<span class="cell-tool">Claude Code</span>
							<span class="cell-value">No</span>
						</div>
						<div class="comparison-cell highlight-win">
							<span class="cell-tool">Cursor</span>
							<span class="cell-value">Yes (Tab)</span>
						</div>
					</div>
				</div>

				<div class="comparison-row">
					<div class="comparison-label">Background Agents</div>
					<div class="comparison-values">
						<div class="comparison-cell highlight-win">
							<span class="cell-tool">Claude Code</span>
							<span class="cell-value">30+ hour sustained tasks</span>
						</div>
						<div class="comparison-cell highlight-win">
							<span class="cell-tool">Cursor</span>
							<span class="cell-value">Remote sandboxes, parallel</span>
						</div>
					</div>
				</div>

				<div class="comparison-row">
					<div class="comparison-label">Pricing</div>
					<div class="comparison-values">
						<div class="comparison-cell">
							<span class="cell-tool">Claude Code</span>
							<span class="cell-value">$20-200/mo (usage tiers)</span>
						</div>
						<div class="comparison-cell highlight-win">
							<span class="cell-tool">Cursor</span>
							<span class="cell-value">$20/mo Pro (flat)</span>
						</div>
					</div>
				</div>

				<div class="comparison-row">
					<div class="comparison-label">Best For</div>
					<div class="comparison-values">
						<div class="comparison-cell">
							<span class="cell-tool">Claude Code</span>
							<span class="cell-value">Architecture, refactoring</span>
						</div>
						<div class="comparison-cell">
							<span class="cell-tool">Cursor</span>
							<span class="cell-value">Daily coding, quick edits</span>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- The Real Answer: Use Both -->
		<section class="highlight-section">
			<h2>Why the best vibe coders use both tools</h2>
			<p>
				The "Claude Code OR Cursor" framing misses the point. According to <a href="https://darrenredmond.com/blog/2025/08/23/claude-code-vs-cursor-ide-why-developers-need-both-in-2025/" target="_blank" rel="noopener">developers who've tested both extensively</a>, the smart setup is running them together. Claude Code functions as the architect and mentor. Cursor functions as the hands-on coding partner.
			</p>

			<div class="role-cards">
				<div class="role-card">
					<h3>Claude Code's Role</h3>
					<p class="role-tagline">The explainer. The architect.</p>
					<ul>
						<li>Analyze repos and draft architectural changes</li>
						<li>Plan complex refactoring before touching files</li>
						<li>Generate documentation (README, CLAUDE.md, roadmaps)</li>
						<li>Catch side effects before they become bugs</li>
						<li>Write meaningful commit messages that explain intent</li>
					</ul>
				</div>
				<div class="role-card">
					<h3>Cursor's Role</h3>
					<p class="role-tagline">The scaffolder. The speed demon.</p>
					<ul>
						<li>Fast Tab autocomplete while you type</li>
						<li>Quick Cmd+K edits on selected code</li>
						<li>Visual diff viewer for reviewing changes</li>
						<li>Full VS Code extension ecosystem</li>
						<li>Composer for multi-file edits with UI feedback</li>
					</ul>
				</div>
			</div>

			<p>
				One developer <a href="https://medium.com/realworld-ai-use-cases/i-tested-cursor-vs-claude-code-one-took-2-minutes-the-other-took-24-0b0614484f34" target="_blank" rel="noopener">reported stopping their Cursor subscription</a> initially, but most find the combination works better: "Claude Code on average produces 30% fewer code reworks and gets things right in the first or second iteration" for complex tasks, while Cursor excels at the rapid iteration needed for smaller changes.
			</p>
		</section>

		<!-- Workflow Comparison -->
		<section>
			<h2>What does each workflow actually look like?</h2>
			<p>
				Quantitative difference in how each tool approaches the same task. Same codebase, same complexity level - different approaches.
			</p>

			<div class="workflow-comparison">
				<div class="workflow-block">
					<div class="workflow-header">
						<span class="workflow-task">Task: Add authentication to existing API</span>
					</div>
					<div class="workflow-steps">
						<div class="workflow-tool-section">
							<h4>Claude Code Approach</h4>
							<div class="workflow-metrics">
								<span class="metric">Time: 15-25 min</span>
								<span class="metric">Iterations: 1-2</span>
								<span class="metric">Files touched: 12-15</span>
							</div>
							<ol>
								<li>Analyzes existing auth patterns in codebase</li>
								<li>Creates implementation plan with all files listed</li>
								<li>Applies changes across all files atomically</li>
								<li>Generates migration scripts and tests</li>
								<li>Commits with detailed message explaining changes</li>
							</ol>
						</div>
						<div class="workflow-tool-section">
							<h4>Cursor Approach</h4>
							<div class="workflow-metrics">
								<span class="metric">Time: 30-45 min</span>
								<span class="metric">Iterations: 3-5</span>
								<span class="metric">Files touched: 12-15</span>
							</div>
							<ol>
								<li>Cmd+K to generate auth middleware</li>
								<li>Tab-complete integration in routes</li>
								<li>Composer for multi-file updates</li>
								<li>Manual review of each diff</li>
								<li>Iterative fixes as issues surface</li>
							</ol>
						</div>
					</div>
					<div class="workflow-verdict">
						Claude Code wins on complex multi-file tasks. Fewer iterations, better first-attempt accuracy.
					</div>
				</div>

				<div class="workflow-block">
					<div class="workflow-header">
						<span class="workflow-task">Task: Fix typo and add console.log</span>
					</div>
					<div class="workflow-steps">
						<div class="workflow-tool-section">
							<h4>Claude Code Approach</h4>
							<div class="workflow-metrics">
								<span class="metric">Time: 45-60 sec</span>
								<span class="metric">Overhead: Terminal context</span>
							</div>
							<ol>
								<li>Type natural language request</li>
								<li>Wait for tool to analyze file</li>
								<li>Confirm the edit</li>
							</ol>
						</div>
						<div class="workflow-tool-section">
							<h4>Cursor Approach</h4>
							<div class="workflow-metrics">
								<span class="metric">Time: 10-15 sec</span>
								<span class="metric">Overhead: None</span>
							</div>
							<ol>
								<li>Select text, Cmd+K, type fix</li>
								<li>Accept inline change</li>
							</ol>
						</div>
					</div>
					<div class="workflow-verdict">
						Cursor wins on quick edits. Less overhead, faster iteration.
					</div>
				</div>
			</div>
		</section>

		<!-- How to Run Claude Code Inside Cursor -->
		<section>
			<h2>How to run Claude Code inside Cursor's terminal</h2>
			<p>
				This is the power user setup. You get Cursor's IDE features plus Claude Code's autonomous capabilities in one window.
			</p>

			<div class="setup-steps">
				<div class="setup-step">
					<span class="step-number">1</span>
					<div class="step-content">
						<h4>Install Claude Code CLI</h4>
						<p>If you haven't already, install Claude Code globally. It works on macOS, Linux, and Windows via WSL.</p>
						<pre><code>npm install -g @anthropic-ai/claude-code</code></pre>
					</div>
				</div>
				<div class="setup-step">
					<span class="step-number">2</span>
					<div class="step-content">
						<h4>Open Cursor's terminal</h4>
						<p>Use Ctrl+` (or Cmd+` on Mac) to open the integrated terminal in Cursor.</p>
					</div>
				</div>
				<div class="setup-step">
					<span class="step-number">3</span>
					<div class="step-content">
						<h4>Run Claude Code with IDE integration</h4>
						<p>The /ide command enables automatic context sharing with Cursor.</p>
						<pre><code>claude
/ide</code></pre>
					</div>
				</div>
				<div class="setup-step">
					<span class="step-number">4</span>
					<div class="step-content">
						<h4>Configure diff viewing</h4>
						<p>Set diffs to appear in Cursor's viewer instead of the terminal.</p>
						<pre><code>/config
# Set diff tool to "auto" for IDE detection</code></pre>
					</div>
				</div>
			</div>

			<div class="pro-tip">
				<h4>What you get with IDE integration</h4>
				<ul>
					<li><strong>Automatic context sharing:</strong> Claude Code knows about your current file and cursor position</li>
					<li><strong>Integrated diff viewing:</strong> Changes appear in Cursor's diff viewer, not just terminal output</li>
					<li><strong>File reference shortcuts:</strong> Cmd+Option+K (Mac) or Alt+Ctrl+K (Windows) to insert file references</li>
					<li><strong>Diagnostic integration:</strong> Claude Code sees Cursor's error diagnostics</li>
				</ul>
			</div>

			<p>
				You can also <a href="https://gist.github.com/sotayamashita/3da81de9d6f2c307d15bf83c9e6e1af6" target="_blank" rel="noopener">install the Claude Code VS Code extension</a> in Cursor for a launcher button, though the terminal approach is more reliable.
			</p>
		</section>

		<!-- Pricing Breakdown -->
		<section>
			<h2>What does each tool actually cost?</h2>
			<p>
				Cursor is simple: $20/month flat. Claude Code uses tiered subscriptions with usage limits. <a href="https://techcrunch.com/2025/07/28/anthropic-unveils-new-rate-limits-to-curb-claude-code-power-users/" target="_blank" rel="noopener">Anthropic introduced weekly rate limits</a> to manage heavy usage.
			</p>

			<div class="pricing-stack">
				<div class="pricing-tier">
					<div class="tier-header">
						<span class="tier-name">Free Tier</span>
					</div>
					<div class="tier-values">
						<div class="tier-cell">
							<span class="tier-tool">Claude Code</span>
							<span class="tier-value">Limited trial</span>
						</div>
						<div class="tier-cell">
							<span class="tier-tool">Cursor</span>
							<span class="tier-value">2000 completions + 50 slow requests</span>
						</div>
					</div>
				</div>

				<div class="pricing-tier">
					<div class="tier-header">
						<span class="tier-name">Pro ($20/mo)</span>
					</div>
					<div class="tier-values">
						<div class="tier-cell">
							<span class="tier-tool">Claude Code</span>
							<span class="tier-value">40-80 hours Sonnet 4/week</span>
						</div>
						<div class="tier-cell">
							<span class="tier-tool">Cursor</span>
							<span class="tier-value">Unlimited fast completions</span>
						</div>
					</div>
				</div>

				<div class="pricing-tier">
					<div class="tier-header">
						<span class="tier-name">Max $100/mo</span>
					</div>
					<div class="tier-values">
						<div class="tier-cell">
							<span class="tier-tool">Claude Code</span>
							<span class="tier-value">140-280 hrs Sonnet 4 + 15-35 hrs Opus 4</span>
						</div>
						<div class="tier-cell tier-cell-empty">
							<span class="tier-tool">Cursor</span>
							<span class="tier-value">-</span>
						</div>
					</div>
				</div>

				<div class="pricing-tier">
					<div class="tier-header">
						<span class="tier-name">Max $200/mo</span>
					</div>
					<div class="tier-values">
						<div class="tier-cell">
							<span class="tier-tool">Claude Code</span>
							<span class="tier-value">240-480 hrs Sonnet 4 + 24-40 hrs Opus 4</span>
						</div>
						<div class="tier-cell tier-cell-empty">
							<span class="tier-tool">Cursor</span>
							<span class="tier-value">-</span>
						</div>
					</div>
				</div>

				<div class="pricing-tier">
					<div class="tier-header">
						<span class="tier-name">Business/Team</span>
					</div>
					<div class="tier-values">
						<div class="tier-cell">
							<span class="tier-tool">Claude Code</span>
							<span class="tier-value">API pricing + enterprise features</span>
						</div>
						<div class="tier-cell">
							<span class="tier-tool">Cursor</span>
							<span class="tier-value">$40/user/month</span>
						</div>
					</div>
				</div>
			</div>

			<div class="pricing-callout">
				<h4>The Power User Stack</h4>
				<p>
					<strong>Claude Max $100 + Cursor Pro $20 = $120/month</strong><br>
					You get 140-280 hours of Sonnet 4 and 15-35 hours of Opus 4 per week for complex reasoning, plus unlimited Cursor autocomplete for daily coding. <a href="https://northflank.com/blog/claude-rate-limits-claude-code-pricing-cost" target="_blank" rel="noopener">Max subscribers can purchase additional usage</a> at standard API rates if they hit limits.
				</p>
			</div>

			<p>
				One comparison <a href="https://www.qodo.ai/blog/claude-code-vs-cursor/" target="_blank" rel="noopener">found Claude Code about 4x more expensive than Cursor</a> for similar tasks ($8 vs $2 for 90 minutes of work). The cost is justified when Claude Code's accuracy saves you from multiple rework cycles. Track your own usage to find the right balance.
			</p>
		</section>

		<!-- Feature Deep Dive -->
		<section>
			<h2>Which features matter for vibe coding?</h2>
			<p>
				Both tools have long feature lists. These are the ones that actually affect your daily workflow.
			</p>

			<div class="feature-stack">
				<div class="feature-row">
					<div class="feature-label">Autocomplete</div>
					<div class="feature-values">
						<div class="feature-cell">
							<span class="cell-tool">Claude Code</span>
							<span class="cell-value">No</span>
						</div>
						<div class="feature-cell highlight-win">
							<span class="cell-tool">Cursor</span>
							<span class="cell-value">Yes - Tab, multi-line</span>
						</div>
					</div>
				</div>

				<div class="feature-row">
					<div class="feature-label">Multi-file Refactoring</div>
					<div class="feature-values">
						<div class="feature-cell highlight-win">
							<span class="cell-tool">Claude Code</span>
							<span class="cell-value">Excellent - describes changes, applies all</span>
						</div>
						<div class="feature-cell">
							<span class="cell-tool">Cursor</span>
							<span class="cell-value">Good - Composer mode</span>
						</div>
					</div>
				</div>

				<div class="feature-row">
					<div class="feature-label">Plan Before Coding</div>
					<div class="feature-values">
						<div class="feature-cell highlight-win">
							<span class="cell-tool">Claude Code</span>
							<span class="cell-value">Yes - Plan Mode reviews approach first</span>
						</div>
						<div class="feature-cell">
							<span class="cell-tool">Cursor</span>
							<span class="cell-value">Limited</span>
						</div>
					</div>
				</div>

				<div class="feature-row">
					<div class="feature-label">Background Tasks</div>
					<div class="feature-values">
						<div class="feature-cell highlight-win">
							<span class="cell-tool">Claude Code</span>
							<span class="cell-value">30+ hours sustained focus</span>
						</div>
						<div class="feature-cell highlight-win">
							<span class="cell-tool">Cursor</span>
							<span class="cell-value">Remote sandboxes, parallel agents</span>
						</div>
					</div>
				</div>

				<div class="feature-row">
					<div class="feature-label">Git Integration</div>
					<div class="feature-values">
						<div class="feature-cell">
							<span class="cell-tool">Claude Code</span>
							<span class="cell-value">Native - commits, PRs, branch management</span>
						</div>
						<div class="feature-cell">
							<span class="cell-tool">Cursor</span>
							<span class="cell-value">Native - full git support</span>
						</div>
					</div>
				</div>

				<div class="feature-row">
					<div class="feature-label">GitHub PR Reviews</div>
					<div class="feature-values">
						<div class="feature-cell highlight-win">
							<span class="cell-tool">Claude Code</span>
							<span class="cell-value">Yes - /install-github-app</span>
						</div>
						<div class="feature-cell highlight-win">
							<span class="cell-tool">Cursor</span>
							<span class="cell-value">Yes - @Cursor in PRs</span>
						</div>
					</div>
				</div>

				<div class="feature-row">
					<div class="feature-label">Linear Integration</div>
					<div class="feature-values">
						<div class="feature-cell">
							<span class="cell-tool">Claude Code</span>
							<span class="cell-value">No</span>
						</div>
						<div class="feature-cell highlight-win">
							<span class="cell-tool">Cursor</span>
							<span class="cell-value">Yes - start agents from issues</span>
						</div>
					</div>
				</div>

				<div class="feature-row">
					<div class="feature-label">Custom Instructions</div>
					<div class="feature-values">
						<div class="feature-cell">
							<span class="cell-tool">Claude Code</span>
							<span class="cell-value"><a href="/kb/prompts/claude-md/">CLAUDE.md</a></span>
						</div>
						<div class="feature-cell">
							<span class="cell-tool">Cursor</span>
							<span class="cell-value"><a href="/kb/prompts/cursor-rules/">.cursorrules</a></span>
						</div>
					</div>
				</div>

				<div class="feature-row">
					<div class="feature-label">MCP Tools</div>
					<div class="feature-values">
						<div class="feature-cell">
							<span class="cell-tool">Claude Code</span>
							<span class="cell-value">Yes</span>
						</div>
						<div class="feature-cell">
							<span class="cell-tool">Cursor</span>
							<span class="cell-value">Yes</span>
						</div>
					</div>
				</div>

				<div class="feature-row">
					<div class="feature-label">Checkpoints/Rollback</div>
					<div class="feature-values">
						<div class="feature-cell highlight-win">
							<span class="cell-tool">Claude Code</span>
							<span class="cell-value">Yes - instant rollback</span>
						</div>
						<div class="feature-cell">
							<span class="cell-tool">Cursor</span>
							<span class="cell-value">Git-based</span>
						</div>
					</div>
				</div>
			</div>

			<p>
				<strong>Context window matters for large codebases.</strong> Claude Code maintains a true 200K token context window. <a href="https://northflank.com/blog/claude-code-vs-cursor-comparison" target="_blank" rel="noopener">Cursor's token window can reduce capacity</a> to maintain performance under load. For massive refactoring across 50+ files, Claude Code handles context more consistently.
			</p>
		</section>

		<!-- Background Agents Comparison -->
		<section>
			<h2>How do background agents compare?</h2>
			<p>
				Both tools can run AI agents in the background while you work on other things. The implementations differ significantly.
			</p>

			<div class="agent-cards">
				<div class="agent-card">
					<h3>Claude Code Background Tasks</h3>
					<ul>
						<li><a href="https://www.anthropic.com/engineering/claude-code-best-practices" target="_blank" rel="noopener">Sustained focus for 30+ hours</a> on complex multi-step tasks</li>
						<li>GitHub Actions integration for CI/CD workflows</li>
						<li>Automatic context compaction to avoid running out of tokens</li>
						<li>Checkpoints for instant rollback if something goes wrong</li>
						<li><a href="https://www.anthropic.com/engineering/claude-code-sandboxing" target="_blank" rel="noopener">Sandboxing reduces permission prompts by 84%</a></li>
					</ul>
				</div>
				<div class="agent-card">
					<h3>Cursor Background Agents</h3>
					<ul>
						<li>Run in <a href="https://cursor.com/changelog/0-50" target="_blank" rel="noopener">isolated remote sandboxes</a></li>
						<li>Multiple parallel agents for different tasks</li>
						<li><a href="https://cursor.com/changelog/1-4" target="_blank" rel="noopener">Tag @Cursor in GitHub PRs</a> - agent applies fixes and pushes commits</li>
						<li><a href="https://cursor.com/changelog/1-5" target="_blank" rel="noopener">Linear integration</a> - start agents directly from issues</li>
						<li>Auto-evaluation picks best solution when running parallel agents</li>
						<li>Requires disabling privacy mode (in preview phase)</li>
					</ul>
				</div>
			</div>

			<p>
				Claude Code's background tasks excel at sustained, complex work. Cursor's background agents excel at parallel exploration and integration with project management tools. For vibe coders using both, the pattern is: Claude Code for the hard architectural work, Cursor agents for investigating options and fixing PR feedback.
			</p>
		</section>

		<!-- Decision Matrix -->
		<section>
			<h2>Quick decision matrix</h2>
			<p>
				Based on workflow measurements and user reports. Pick the right tool for the job.
			</p>

			<div class="decision-matrix">
				<div class="decision-category">
					<h3>Use Claude Code when...</h3>
					<ul>
						<li><strong>Complex refactoring:</strong> Changing architecture across 20+ files</li>
						<li><strong>New feature implementation:</strong> "Build an auth system" from scratch</li>
						<li><strong>Documentation:</strong> README, CLAUDE.md, project roadmaps</li>
						<li><strong>Code review prep:</strong> Analyze side effects before touching brittle code</li>
						<li><strong>Debugging hard problems:</strong> Let it investigate for 30+ minutes uninterrupted</li>
						<li><strong>First drafts of medium PRs:</strong> Gets things right in 1-2 iterations</li>
					</ul>
				</div>
				<div class="decision-category">
					<h3>Use Cursor when...</h3>
					<ul>
						<li><strong>Quick edits:</strong> Fast Cmd+K changes on selected code</li>
						<li><strong>Autocomplete:</strong> Tab completion while typing</li>
						<li><strong>Visual feedback:</strong> See diffs and changes in context</li>
						<li><strong>Extension ecosystem:</strong> Need VS Code extensions</li>
						<li><strong>PR fixes:</strong> @Cursor in GitHub comments for quick patches</li>
						<li><strong>Parallel exploration:</strong> Run multiple agents to explore approaches</li>
					</ul>
				</div>
			</div>

			<div class="workflow-tip">
				<h4>The Recommended Workflow</h4>
				<p>
					<strong>Plan -> small diff -> tests -> review.</strong> Use Claude Code to plan the approach and generate documentation. Use Cursor for the actual implementation with visual feedback. Keep context tight with CLAUDE.md files. Clear context often with /clear. Never skip the review step under pressure.
				</p>
			</div>
		</section>

		<!-- Security Section -->
		<section>
			<h2>What about security?</h2>
			<p>
				Both tools can generate vulnerable code. That's inherent to AI code generation, not specific to either tool. Per the <a href="https://owasp.org/www-project-top-10-for-large-language-model-applications/" target="_blank" rel="noopener">OWASP Top 10 for LLM Applications</a>, all AI coding tools require review.
			</p>

			<div class="security-cards">
				<div class="security-card">
					<h4>Claude Code</h4>
					<p>3 CVEs (patched) including <a href="https://nvd.nist.gov/vuln/detail/CVE-2025-52882" target="_blank" rel="noopener">CVE-2025-52882</a> (CVSS 8.8). Built by Anthropic with AI safety focus. Plan Mode allows security review before execution.</p>
				</div>
				<div class="security-card">
					<h4>Cursor</h4>
					<p>1 CVE: <a href="https://nvd.nist.gov/vuln/detail/CVE-2025-62352" target="_blank" rel="noopener">CVE-2025-62352</a> (path traversal, patched). Privacy mode available. Can use Claude models for better security reasoning.</p>
				</div>
			</div>

			<p>
				The tool matters less than your process. Use <a href="/kb/prompts/cursor-rules/">rules files</a> to encode security patterns. Review generated code before deploying. Run <a href="/kb/vibe-coding/secure-vibe-coding-guide/">security scans</a> as part of your workflow.
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
			<h2>Keep exploring</h2>
			<div class="related-grid">
				<a href="/kb/vibe-coding-tools/claude-code/" class="card card-interactive">
					<span class="related-card-category">Tool Guide</span>
					<h3 class="related-card-title">Claude Code: Complete Guide</h3>
				</a>
				<a href="/kb/vibe-coding-tools/cursor/" class="card card-interactive">
					<span class="related-card-category">Tool Guide</span>
					<h3 class="related-card-title">Cursor: Complete Guide</h3>
				</a>
				<a href="/kb/prompts/claude-md/" class="card card-interactive">
					<span class="related-card-category">Prompts</span>
					<h3 class="related-card-title">Writing Effective CLAUDE.md Files</h3>
				</a>
				<a href="/kb/prompts/cursor-rules/" class="card card-interactive">
					<span class="related-card-category">Prompts</span>
					<h3 class="related-card-title">Cursor Rules That Work</h3>
				</a>
				<a href="/kb/vibe-coding-tools/cursor-vs-copilot/" class="card card-interactive">
					<span class="related-card-category">Comparison</span>
					<h3 class="related-card-title">Cursor vs GitHub Copilot</h3>
				</a>
				<a href="/kb/vibe-coding/secure-vibe-coding-guide/" class="card card-interactive">
					<span class="related-card-category">Guide</span>
					<h3 class="related-card-title">Secure Vibe Coding Guide</h3>
				</a>
			</div>
		</section>
	</article>
</div>

<style>
	/* Badge row for article header */
	.badge-row {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		margin-bottom: 1rem;
	}

	/* Custom badge variant for comparisons */
	.badge-comparison {
		border-color: var(--text-tertiary);
		color: var(--text-secondary);
		background: transparent;
	}

	.subtitle {
		color: var(--text-secondary);
		font-size: 1.1rem;
		margin-bottom: 0;
	}

	/* Mobile-friendly stacked comparison rows */
	.comparison-stack,
	.pricing-stack,
	.feature-stack {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin: 1.5rem 0;
	}

	.comparison-row,
	.pricing-tier,
	.feature-row {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
	}

	.comparison-label,
	.tier-header,
	.feature-label {
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
	.tier-values,
	.feature-values {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	@media (max-width: 600px) {
		.comparison-values,
		.tier-values,
		.feature-values {
			grid-template-columns: 1fr;
		}
	}

	.comparison-cell,
	.tier-cell,
	.feature-cell {
		padding: 0.75rem 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		border-right: 1px solid var(--border);
	}

	.comparison-cell:last-child,
	.tier-cell:last-child,
	.feature-cell:last-child {
		border-right: none;
	}

	@media (max-width: 600px) {
		.comparison-cell,
		.tier-cell,
		.feature-cell {
			border-right: none;
			border-bottom: 1px solid var(--border);
		}

		.comparison-cell:last-child,
		.tier-cell:last-child,
		.feature-cell:last-child {
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

	.highlight-win .cell-value {
		color: var(--green-muted);
		font-weight: 500;
	}

	.tier-cell-empty .tier-value {
		color: var(--text-tertiary);
	}

	/* Highlight Section */
	.highlight-section {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-left: 3px solid var(--border-strong);
		padding: 1.5rem;
		margin: 2rem 0;
	}

	.highlight-section h2 {
		margin-top: 0;
		border-bottom: none;
		padding-bottom: 0;
	}

	/* Role Cards (neutral) */
	.role-cards {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		margin: 1.5rem 0;
	}

	@media (max-width: 768px) {
		.role-cards {
			grid-template-columns: 1fr;
		}
	}

	.role-card {
		background: var(--bg-primary);
		border: 1px solid var(--border);
		padding: 1.25rem;
	}

	.role-card h3 {
		margin-top: 0;
		margin-bottom: 0.25rem;
		color: var(--text-primary);
	}

	.role-tagline {
		font-size: 0.85rem;
		color: var(--text-secondary);
		font-style: italic;
		margin-bottom: 1rem;
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

	/* Setup Steps */
	.setup-steps {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.setup-step {
		display: flex;
		gap: 1rem;
		align-items: flex-start;
	}

	.step-number {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		background: var(--text-primary);
		color: var(--bg-primary);
		font-weight: 700;
		font-size: 0.9rem;
		flex-shrink: 0;
	}

	.step-content {
		flex: 1;
	}

	.step-content h4 {
		margin: 0 0 0.5rem 0;
		font-size: 1rem;
	}

	.step-content p {
		margin: 0 0 0.5rem 0;
		font-size: 0.9rem;
		color: var(--text-secondary);
	}

	.step-content pre {
		margin: 0;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 0.75rem;
		overflow-x: auto;
	}

	.step-content code {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.85rem;
	}

	/* Pro Tip Box */
	.pro-tip {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-left: 3px solid var(--border-strong);
		padding: 1.25rem;
		margin: 1.5rem 0;
	}

	.pro-tip h4 {
		margin: 0 0 0.75rem 0;
		color: var(--text-primary);
	}

	.pro-tip ul {
		margin: 0;
		padding-left: 1.25rem;
	}

	.pro-tip li {
		font-size: 0.9rem;
		margin-bottom: 0.5rem;
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

	/* Agent Cards (neutral) */
	.agent-cards {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
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
		padding: 1.25rem;
	}

	.agent-card h3 {
		margin-top: 0;
		font-size: 1rem;
		color: var(--text-primary);
	}

	.agent-card ul {
		margin: 0;
		padding-left: 1.25rem;
	}

	.agent-card li {
		font-size: 0.9rem;
		margin-bottom: 0.5rem;
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

	/* Workflow Tip */
	.workflow-tip {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-left: 3px solid var(--orange);
		padding: 1.25rem;
		margin: 1.5rem 0;
	}

	.workflow-tip h4 {
		margin: 0 0 0.5rem 0;
		color: var(--text-primary);
	}

	.workflow-tip p {
		margin: 0;
		font-size: 0.95rem;
	}

	/* Security Cards */
	.security-cards {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		margin: 1.5rem 0;
	}

	@media (max-width: 768px) {
		.security-cards {
			grid-template-columns: 1fr;
		}
	}

	.security-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1rem;
	}

	.security-card h4 {
		margin: 0 0 0.5rem 0;
		color: var(--text-primary);
	}

	.security-card p {
		margin: 0;
		font-size: 0.9rem;
		color: var(--text-secondary);
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
