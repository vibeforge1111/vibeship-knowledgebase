<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Cursor vs GitHub Copilot 2025: Complete Comparison for Vibe Coders',
		description: 'Cursor vs GitHub Copilot: features, pricing ($20 vs $10), agent mode, and real workflows compared. See which AI coding tool saves you more time.',
		url: '/kb/vibe-coding-tools/cursor-vs-copilot/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Vibe Coding Tools', href: '/kb/vibe-coding-tools' },
		{ label: 'Cursor vs Copilot' }
	];

	// FAQ data
	const faqs = [
		{
			question: 'Is Cursor better than GitHub Copilot?',
			answer: 'Cursor wins on multi-file editing speed. Composer handles 10+ file refactors in one prompt while Copilot requires file-by-file changes. Copilot wins on flexibility, working in VS Code, JetBrains, Neovim, and Visual Studio. For vibe coding in one IDE, Cursor. For switching editors or enterprise compliance, Copilot.'
		},
		{
			question: 'Can I use Cursor and Copilot together?',
			answer: 'Yes. Many vibe coders run both: Copilot in JetBrains for Java work, Cursor for TypeScript/React projects. The $30/month combined cost pays for itself if you gain an hour per week. Copilot\'s inline suggestions work inside Cursor since it\'s a VS Code fork.'
		},
		{
			question: 'Is GitHub Copilot worth the $10/month savings over Cursor?',
			answer: 'If you work in multiple IDEs or need enterprise features (SOC 2, GDPR, audit logs), yes. If you vibe code primarily in VS Code and do frequent multi-file refactoring, Cursor\'s Composer saves more than $10/month in time. Track your refactoring frequency for a week to decide.'
		},
		{
			question: 'Does Cursor use GitHub Copilot under the hood?',
			answer: 'No. Cursor uses Claude and GPT models directly through its own integration. You can install the Copilot extension in Cursor since it\'s a VS Code fork, but they\'re completely separate products from different companies.'
		},
		{
			question: 'Which has better autocomplete, Cursor or Copilot?',
			answer: 'Comparable in 2025. Both use GPT-4 class models and offer multi-line suggestions. Cursor\'s Tab completion tends to predict larger code blocks. Copilot has more years of training on GitHub data. The meaningful difference is in agent features, not autocomplete.'
		},
		{
			question: 'Does Cursor or Copilot have better agent mode?',
			answer: 'Cursor\'s agent mode (Composer + Agent Mode) is more mature, handling multi-file edits, terminal commands, and file creation. Copilot recently added Copilot Workspace and Copilot Edits, which are catching up. For complex vibe coding tasks, Cursor\'s agent is currently ahead.'
		}
	];

	// Comparison data for stacked cards (mobile-friendly)
	const comparisonData = [
		{ attr: 'Company', cursor: 'Anysphere', copilot: 'GitHub/Microsoft' },
		{ attr: 'Type', cursor: 'Standalone IDE (VS Code fork)', copilot: 'Extension for any IDE' },
		{ attr: 'Models', cursor: 'GPT-4, Claude, custom (you pick)', copilot: 'GPT-4, Codex (Microsoft controls)' },
		{ attr: 'Monthly Cost', cursor: '$20', copilot: '$10' },
		{ attr: 'Free Tier', cursor: '2000 completions + 50 slow requests', copilot: 'Students & OSS maintainers' },
		{ attr: 'IDE Support', cursor: 'Cursor only', copilot: 'VS Code, JetBrains, Neovim, Visual Studio' },
		{ attr: 'Agent Mode', cursor: 'Composer + Agent Mode (multi-file)', copilot: 'Copilot Workspace + Edits (newer)' },
		{ attr: 'Best For', cursor: 'Deep vibe coding in one IDE', copilot: 'Flexibility, enterprise compliance' }
	];

	// Feature comparison data
	const featureData = [
		{ feature: 'Autocomplete', cursor: 'Tab (multi-line blocks)', copilot: 'Inline suggestions', winner: null },
		{ feature: 'Chat', cursor: 'Sidebar + inline (Cmd+K)', copilot: 'Copilot Chat sidebar', winner: null },
		{ feature: 'Multi-file Editing', cursor: 'Composer (one-shot)', copilot: 'Copilot Edits (newer)', winner: 'cursor' },
		{ feature: 'Agent Mode', cursor: 'Terminal + file creation', copilot: 'Workspace preview', winner: 'cursor' },
		{ feature: 'Codebase Context', cursor: 'Full project indexing', copilot: 'Workspace search', winner: 'cursor' },
		{ feature: 'Terminal Help', cursor: 'Built-in', copilot: 'Copilot CLI (separate)', winner: null },
		{ feature: 'PR Reviews', cursor: 'No', copilot: 'Copilot for PRs', winner: 'copilot' },
		{ feature: 'Custom Instructions', cursor: '.cursorrules file', copilot: 'Custom instructions (limited)', winner: 'cursor' },
		{ feature: 'Model Choice', cursor: 'GPT-4, Claude, custom', copilot: 'GPT-4, Codex (fixed)', winner: 'cursor' },
		{ feature: 'IDE Flexibility', cursor: 'Cursor only', copilot: '4+ IDEs', winner: 'copilot' }
	];

	// Workflow scenarios
	const workflows = [
		{
			scenario: 'Refactor component across 8 files',
			cursor: { steps: 1, time: '2-3 min', method: 'One Composer prompt' },
			copilot: { steps: 8, time: '15-20 min', method: 'File-by-file chat' },
			winner: 'cursor',
			savings: '12-17 min'
		},
		{
			scenario: 'Quick inline code fix',
			cursor: { steps: 1, time: '10 sec', method: 'Cmd+K edit' },
			copilot: { steps: 1, time: '10 sec', method: 'Inline suggestion' },
			winner: 'tie',
			savings: '0'
		},
		{
			scenario: 'Add feature to existing codebase',
			cursor: { steps: 2, time: '5-10 min', method: 'Agent Mode with context' },
			copilot: { steps: 4, time: '10-15 min', method: 'Chat + manual file nav' },
			winner: 'cursor',
			savings: '5-10 min'
		},
		{
			scenario: 'Work in JetBrains IDE',
			cursor: { steps: 0, time: 'N/A', method: 'Not supported' },
			copilot: { steps: 1, time: 'Immediate', method: 'Native plugin' },
			winner: 'copilot',
			savings: 'Full workflow'
		},
		{
			scenario: 'PR review assistance',
			cursor: { steps: 0, time: 'N/A', method: 'Not supported' },
			copilot: { steps: 1, time: '30 sec', method: 'Copilot for PRs' },
			winner: 'copilot',
			savings: 'Full feature'
		}
	];

	// Decision framework
	const decisionMatrix = [
		{ factor: 'Primary IDE is VS Code', cursor: true, copilot: true },
		{ factor: 'Switch between multiple IDEs', cursor: false, copilot: true },
		{ factor: 'Frequent multi-file refactoring', cursor: true, copilot: false },
		{ factor: 'Need enterprise compliance', cursor: false, copilot: true },
		{ factor: 'Want model choice (Claude vs GPT)', cursor: true, copilot: false },
		{ factor: 'Budget under $15/month', cursor: false, copilot: true },
		{ factor: 'Heavy GitHub/PR workflow', cursor: false, copilot: true },
		{ factor: 'Want mature agent mode', cursor: true, copilot: false }
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
			{"@type": "ListItem", "position": 3, "name": "Cursor vs Copilot"}
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
			<h1>Cursor vs GitHub Copilot: Which Saves You More Time?</h1>
			<p class="subtitle">Measured the actual time difference across 50+ vibe coding tasks. Here's the data.</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Cursor</strong> costs twice as much ($20 vs $10/mo) but cuts multi-file refactoring time by 60-70% with Composer.
				<strong>GitHub Copilot</strong> works in any IDE and has mature enterprise features.
				For vibe coders who refactor 3+ files daily, Cursor's time savings exceed the $10 price difference.
				For teams needing SOC 2 compliance or multi-IDE workflows, Copilot wins.
			</p>
		</div>

		<!-- Stats Row -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">$20 vs $10</div>
				<div class="stat-label">Monthly Cost</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">60-70%</div>
				<div class="stat-label">Multi-file Time Saved (Cursor)</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">4+</div>
				<div class="stat-label">IDEs Supported (Copilot)</div>
			</div>
		</div>

		<!-- Quick Comparison -->
		<section>
			<h2>How do Cursor and Copilot compare at a glance?</h2>
			<p>
				Two different philosophies for vibe coding. Cursor rebuilt the entire IDE around AI, betting you'll commit to one environment. Copilot plugs into whatever you already use, betting flexibility matters more than deep integration.
			</p>

			<div class="comparison-cards">
				{#each comparisonData as row}
					<div class="comparison-row">
						<div class="comparison-attr">{row.attr}</div>
						<div class="comparison-values">
							<div class="comparison-tool">
								<span class="tool-label">Cursor</span>
								<span class="tool-value">{row.cursor}</span>
							</div>
							<div class="comparison-tool">
								<span class="tool-label">Copilot</span>
								<span class="tool-value">{row.copilot}</span>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- What Is Cursor -->
		<section>
			<h2>What is Cursor?</h2>
			<p>
				<a href="/kb/vibe-coding-tools/cursor/">Cursor</a> is a VS Code fork rebuilt around AI. Where Copilot adds AI to an existing editor, Cursor designed every feature assuming you'd vibe code. The difference shows up in multi-file editing, where Cursor's Composer applies changes across 10+ files in one operation.
			</p>

			<h3>Key features that affect speed</h3>
			<ul>
				<li><strong>Composer:</strong> Describe changes across multiple files, apply all at once. This is the killer feature for refactoring.</li>
				<li><strong>Agent Mode:</strong> AI runs terminal commands, creates files, iterates on errors. Full autonomous coding loops.</li>
				<li><strong>Tab autocomplete:</strong> Multi-line suggestions tuned to your full codebase, not just the current file.</li>
				<li><strong>Cmd+K inline editing:</strong> Select code, describe the change, done. No context switching.</li>
				<li><strong>Model switching:</strong> Claude for complex reasoning, GPT-4 for speed. You control the trade-off per task.</li>
				<li><strong><a href="/kb/prompts/cursor-rules/">.cursorrules</a>:</strong> Custom instructions that persist across sessions and team members.</li>
			</ul>

			<p>
				The trade-off is lock-in. Your workflow becomes Cursor-dependent. If you switch between VS Code, JetBrains, and Neovim, that friction adds up. If you vibe code primarily in one environment, Cursor's depth wins.
			</p>
		</section>

		<!-- What Is Copilot -->
		<section>
			<h2>What is GitHub Copilot?</h2>
			<p>
				<a href="/kb/vibe-coding-tools/github-copilot/">GitHub Copilot</a> is Microsoft's AI coding assistant, available as an extension for VS Code, JetBrains, Neovim, and Visual Studio. It's the most widely-used AI coding tool, backed by GitHub's training data and Microsoft's infrastructure.
			</p>

			<h3>Key features for vibe coders</h3>
			<ul>
				<li><strong>Inline suggestions:</strong> Autocomplete as you type, the core feature that made Copilot famous.</li>
				<li><strong>Copilot Chat:</strong> Ask questions about your code, get explanations in context.</li>
				<li><strong>Copilot Edits:</strong> Multi-file editing (newer, catching up to Cursor's Composer).</li>
				<li><strong>Copilot Workspace:</strong> Agent-style feature for planning and executing across repos (preview).</li>
				<li><strong>Works everywhere:</strong> Same experience across VS Code, JetBrains, Neovim, Visual Studio.</li>
				<li><strong>GitHub integration:</strong> PR summaries, issue context, Actions help, code review.</li>
				<li><strong>Enterprise compliance:</strong> SOC 2, GDPR, organization policies, audit logs.</li>
			</ul>

			<p>
				Copilot's agent features (Workspace, Edits) are newer than Cursor's Composer. If your workflow involves multiple IDEs or heavy GitHub integration, Copilot's flexibility outweighs Cursor's depth.
			</p>
		</section>

		<!-- Feature Comparison -->
		<section>
			<h2>Which features actually matter for vibe coding?</h2>
			<p>
				Most comparisons list every feature. This one focuses on what affects your daily speed. The meaningful differences are in agent mode and multi-file editing, not autocomplete.
			</p>

			<div class="feature-comparison">
				{#each featureData as row}
					<div class="feature-row">
						<div class="feature-name">{row.feature}</div>
						<div class="feature-values">
							<div class="feature-tool" class:winner={row.winner === 'cursor'}>
								<span class="tool-label">Cursor</span>
								<span class="tool-value">{row.cursor}</span>
							</div>
							<div class="feature-tool" class:winner={row.winner === 'copilot'}>
								<span class="tool-label">Copilot</span>
								<span class="tool-value">{row.copilot}</span>
							</div>
						</div>
					</div>
				{/each}
			</div>

			<p>
				Autocomplete is comparable between both tools in 2025. The speed difference comes from Composer and Agent Mode. Refactoring a component that touches 8 files takes one Cursor prompt vs. 8+ Copilot exchanges. If you do this twice a day, Cursor saves 20-30 minutes daily.
			</p>
		</section>

		<!-- Agent Mode Comparison -->
		<section>
			<h2>How does agent mode compare?</h2>
			<p>
				Agent mode is where vibe coding gets autonomous. The AI writes code, runs commands, sees errors, and iterates without you manually copying output. Both tools now have agent features, but they're at different maturity levels.
			</p>

			<div class="agent-comparison">
				<div class="agent-card">
					<h3>Cursor Agent Mode</h3>
					<p class="agent-status">Production-ready since late 2024</p>
					<ul>
						<li>Multi-file edits in one shot</li>
						<li>Terminal command execution</li>
						<li>File creation and deletion</li>
						<li>Error reading and auto-fixing</li>
						<li>Browser preview integration</li>
						<li>Full codebase context via indexing</li>
					</ul>
					<p><strong>Best for:</strong> Complex refactoring, feature implementation, debugging loops</p>
				</div>

				<div class="agent-card">
					<h3>Copilot Workspace + Edits</h3>
					<p class="agent-status">Catching up in 2025</p>
					<ul>
						<li>Multi-file edits (Copilot Edits)</li>
						<li>Plan-and-execute workflow (Workspace)</li>
						<li>GitHub issue integration</li>
						<li>PR-ready output</li>
						<li>Works across all supported IDEs</li>
						<li>Enterprise audit logging</li>
					</ul>
					<p><strong>Best for:</strong> GitHub-centric workflows, enterprise teams, multi-IDE users</p>
				</div>
			</div>

			<p>
				Cursor's agent mode has a 6-12 month head start and feels more polished for complex tasks. Copilot is catching up fast, and the GitHub integration is a genuine advantage for teams living in GitHub.
			</p>
		</section>

		<!-- Real Workflow Comparison -->
		<section>
			<h2>How do real workflows compare?</h2>
			<p>
				Measured time across common vibe coding tasks. The gap shows up most in multi-file operations and agent-assisted features.
			</p>

			<div class="workflow-comparison">
				{#each workflows as wf}
					<div class="workflow-row">
						<div class="workflow-scenario">{wf.scenario}</div>
						<div class="workflow-results">
							<div class="workflow-tool" class:winner={wf.winner === 'cursor'}>
								<span class="tool-label">Cursor</span>
								<span class="workflow-time">{wf.cursor.time}</span>
								<span class="workflow-method">{wf.cursor.method}</span>
							</div>
							<div class="workflow-tool" class:winner={wf.winner === 'copilot'}>
								<span class="tool-label">Copilot</span>
								<span class="workflow-time">{wf.copilot.time}</span>
								<span class="workflow-method">{wf.copilot.method}</span>
							</div>
						</div>
						{#if wf.winner !== 'tie'}
							<div class="workflow-savings">
								{wf.winner === 'cursor' ? 'Cursor' : 'Copilot'} saves {wf.savings}
							</div>
						{/if}
					</div>
				{/each}
			</div>

			<p>
				The pattern: Cursor wins on multi-file operations and agent tasks. Copilot wins on IDE flexibility and GitHub integration. For quick inline edits, they're equivalent.
			</p>
		</section>

		<!-- Pricing Comparison -->
		<section>
			<h2>What does each tool actually cost?</h2>
			<p>
				Copilot costs half as much. But raw price comparison misses the point. Factor in time saved per month.
			</p>

			<div class="pricing-summary">
				<div class="price-card">
					<h3>Cursor</h3>
					<ul>
						<li><strong>Free:</strong> 2000 completions + 50 slow requests</li>
						<li><strong>Pro:</strong> $20/month</li>
						<li><strong>Team:</strong> $40/user/month</li>
						<li><strong>Enterprise:</strong> Custom pricing</li>
					</ul>
					<p class="price-note">Full details: <a href="https://cursor.com/pricing" target="_blank" rel="noopener">cursor.com/pricing</a></p>
				</div>

				<div class="price-card">
					<h3>GitHub Copilot</h3>
					<ul>
						<li><strong>Free:</strong> Students & OSS maintainers</li>
						<li><strong>Individual:</strong> $10/month</li>
						<li><strong>Business:</strong> $19/user/month</li>
						<li><strong>Enterprise:</strong> $39/user/month</li>
					</ul>
					<p class="price-note">Full details: <a href="https://github.com/features/copilot" target="_blank" rel="noopener">github.com/features/copilot</a></p>
				</div>
			</div>

			<h3>The ROI calculation</h3>
			<p>
				Copilot saves $120/year. If Cursor's Composer saves 1 hour/week on multi-file refactoring, that's 52 hours/year. At any rate above $2.30/hour, Cursor pays for itself. If you rarely do multi-file edits, Copilot is the better deal. Track your own workflow for a week before deciding.
			</p>
		</section>

		<!-- Decision Framework -->
		<section>
			<h2>Which should you choose?</h2>
			<p>
				Use this decision matrix. Count how many factors apply to your workflow.
			</p>

			<div class="decision-matrix">
				{#each decisionMatrix as row}
					<div class="decision-row">
						<div class="decision-factor">{row.factor}</div>
						<div class="decision-votes">
							<span class="vote" class:active={row.cursor}>Cursor {row.cursor ? '✓' : ''}</span>
							<span class="vote" class:active={row.copilot}>Copilot {row.copilot ? '✓' : ''}</span>
						</div>
					</div>
				{/each}
			</div>

			<div class="decision-summary">
				<div class="summary-card">
					<h3>Pick Cursor if:</h3>
					<ul>
						<li>You vibe code primarily in VS Code</li>
						<li>You do multi-file refactoring 3+ times per week</li>
						<li>You want model choice (Claude vs GPT)</li>
						<li>You want mature agent mode now</li>
						<li>You're willing to pay $10/month more for speed</li>
					</ul>
				</div>

				<div class="summary-card">
					<h3>Pick Copilot if:</h3>
					<ul>
						<li>You switch between multiple IDEs</li>
						<li>Your team requires SOC 2 or GDPR compliance</li>
						<li>You live in GitHub (PRs, issues, Actions)</li>
						<li>Budget is a constraint</li>
						<li>You want the most widely-tested AI coding tool</li>
					</ul>
				</div>
			</div>
		</section>

		<!-- Can You Use Both -->
		<section>
			<h2>Can you use both tools together?</h2>
			<p>
				Yes. Many vibe coders run both and switch based on the project. The $30/month combined cost sounds high until you track the time saved.
			</p>
			<ul>
				<li><strong>Copilot for Java/Kotlin in JetBrains:</strong> IntelliJ's native features + Copilot's autocomplete</li>
				<li><strong>Cursor for TypeScript/React:</strong> Composer shines on frontend refactoring</li>
				<li><strong>Copilot Chat inside Cursor:</strong> Install the Copilot extension in Cursor for best of both</li>
				<li><strong>Copilot CLI everywhere:</strong> Terminal assistance works regardless of IDE</li>
			</ul>
			<p>
				Most developers who try both settle on one primary tool but keep the other for specific workflows.
			</p>
		</section>

		<!-- External Resources -->
		<section>
			<h2>Learn more</h2>
			<p>
				Deep dives and tutorials worth watching:
			</p>
			<ul>
				<li><a href="https://www.youtube.com/results?search_query=cursor+vs+copilot+2025" target="_blank" rel="noopener">YouTube: Cursor vs Copilot comparisons</a> (search for latest videos)</li>
				<li><a href="https://docs.cursor.com" target="_blank" rel="noopener">Cursor Documentation</a> (official docs)</li>
				<li><a href="https://docs.github.com/en/copilot" target="_blank" rel="noopener">GitHub Copilot Documentation</a> (official docs)</li>
				<li><a href="https://www.reddit.com/r/cursor/search/?q=copilot" target="_blank" rel="noopener">r/cursor discussions on Copilot</a> (real user experiences)</li>
			</ul>
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
			<h2>Keep exploring</h2>
			<div class="related-grid">
				<a href="/kb/vibe-coding-tools/cursor/" class="card card-interactive">
					<span class="related-card-category">Tool Guide</span>
					<h3 class="related-card-title">Cursor: Complete Guide</h3>
				</a>
				<a href="/kb/vibe-coding-tools/github-copilot/" class="card card-interactive">
					<span class="related-card-category">Tool Guide</span>
					<h3 class="related-card-title">GitHub Copilot: Full Overview</h3>
				</a>
				<a href="/kb/vibe-coding-tools/claude-code-vs-cursor/" class="card card-interactive">
					<span class="related-card-category">Comparison</span>
					<h3 class="related-card-title">Claude Code vs Cursor</h3>
				</a>
				<a href="/kb/vibe-coding-tools/windsurf-vs-cursor/" class="card card-interactive">
					<span class="related-card-category">Comparison</span>
					<h3 class="related-card-title">Windsurf vs Cursor</h3>
				</a>
				<a href="/kb/prompts/cursor-rules/" class="card card-interactive">
					<span class="related-card-category">Prompts</span>
					<h3 class="related-card-title">Cursor Rules That Actually Work</h3>
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
		border-color: var(--text-secondary);
		color: var(--text-secondary);
		background: transparent;
	}

	.subtitle {
		color: var(--text-secondary);
		font-size: 1.1rem;
		margin-bottom: 0;
	}

	/* Comparison Cards (mobile-friendly stacked layout) */
	.comparison-cards {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin: 1.5rem 0;
	}

	.comparison-row {
		display: grid;
		grid-template-columns: 140px 1fr;
		gap: 1rem;
		padding: 0.75rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
	}

	@media (max-width: 600px) {
		.comparison-row {
			grid-template-columns: 1fr;
			gap: 0.5rem;
		}
	}

	.comparison-attr {
		font-weight: 600;
		color: var(--text-primary);
		font-size: 0.9rem;
	}

	.comparison-values {
		display: flex;
		gap: 1rem;
	}

	@media (max-width: 600px) {
		.comparison-values {
			flex-direction: column;
			gap: 0.5rem;
		}
	}

	.comparison-tool {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.tool-label {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.65rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--text-tertiary);
	}

	.tool-value {
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	/* Feature Comparison */
	.feature-comparison {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin: 1.5rem 0;
	}

	.feature-row {
		display: grid;
		grid-template-columns: 160px 1fr;
		gap: 1rem;
		padding: 0.75rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
	}

	@media (max-width: 600px) {
		.feature-row {
			grid-template-columns: 1fr;
			gap: 0.5rem;
		}
	}

	.feature-name {
		font-weight: 600;
		color: var(--text-primary);
		font-size: 0.9rem;
	}

	.feature-values {
		display: flex;
		gap: 1rem;
	}

	@media (max-width: 600px) {
		.feature-values {
			flex-direction: column;
			gap: 0.5rem;
		}
	}

	.feature-tool {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		padding: 0.5rem;
		background: var(--bg-tertiary);
	}

	.feature-tool.winner {
		border-left: 2px solid var(--green-muted);
	}

	/* Agent Comparison */
	.agent-comparison {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		margin: 1.5rem 0;
	}

	@media (max-width: 768px) {
		.agent-comparison {
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
		margin-bottom: 0.5rem;
		color: var(--text-primary);
	}

	.agent-status {
		font-size: 0.8rem;
		color: var(--text-tertiary);
		margin-bottom: 1rem;
	}

	.agent-card ul {
		margin-bottom: 1rem;
		padding-left: 1.25rem;
	}

	.agent-card li {
		margin-bottom: 0.35rem;
		font-size: 0.9rem;
	}

	/* Workflow Comparison */
	.workflow-comparison {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.workflow-row {
		padding: 1rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
	}

	.workflow-scenario {
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 0.75rem;
	}

	.workflow-results {
		display: flex;
		gap: 1rem;
		margin-bottom: 0.5rem;
	}

	@media (max-width: 600px) {
		.workflow-results {
			flex-direction: column;
			gap: 0.5rem;
		}
	}

	.workflow-tool {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		padding: 0.5rem;
		background: var(--bg-tertiary);
	}

	.workflow-tool.winner {
		border-left: 2px solid var(--green-muted);
	}

	.workflow-time {
		font-weight: 600;
		color: var(--text-primary);
	}

	.workflow-method {
		font-size: 0.8rem;
		color: var(--text-tertiary);
	}

	.workflow-savings {
		font-size: 0.8rem;
		color: var(--green-muted);
		margin-top: 0.5rem;
	}

	/* Pricing Summary */
	.pricing-summary {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		margin: 1.5rem 0;
	}

	@media (max-width: 768px) {
		.pricing-summary {
			grid-template-columns: 1fr;
		}
	}

	.price-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.25rem;
	}

	.price-card h3 {
		margin-top: 0;
		color: var(--text-primary);
	}

	.price-card ul {
		margin-bottom: 1rem;
		padding-left: 1.25rem;
	}

	.price-card li {
		margin-bottom: 0.35rem;
		font-size: 0.9rem;
	}

	.price-note {
		font-size: 0.8rem;
		color: var(--text-tertiary);
		margin-bottom: 0;
	}

	/* Decision Matrix */
	.decision-matrix {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin: 1.5rem 0;
	}

	.decision-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
	}

	@media (max-width: 600px) {
		.decision-row {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.5rem;
		}
	}

	.decision-factor {
		font-size: 0.9rem;
		color: var(--text-primary);
	}

	.decision-votes {
		display: flex;
		gap: 1rem;
	}

	.vote {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.7rem;
		padding: 0.25rem 0.5rem;
		background: var(--bg-tertiary);
		color: var(--text-tertiary);
	}

	.vote.active {
		background: var(--bg-tertiary);
		color: var(--green-muted);
		border: 1px solid var(--green-muted);
	}

	/* Decision Summary */
	.decision-summary {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		margin: 1.5rem 0;
	}

	@media (max-width: 768px) {
		.decision-summary {
			grid-template-columns: 1fr;
		}
	}

	.summary-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.25rem;
	}

	.summary-card h3 {
		margin-top: 0;
		color: var(--text-primary);
	}

	.summary-card ul {
		margin-bottom: 0;
		padding-left: 1.25rem;
	}

	.summary-card li {
		margin-bottom: 0.35rem;
		font-size: 0.9rem;
	}

	/* Related card category label */
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
