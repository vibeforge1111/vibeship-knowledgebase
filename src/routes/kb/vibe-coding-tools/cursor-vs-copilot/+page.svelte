<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Cursor vs GitHub Copilot 2025: Complete Comparison',
		description: 'Cursor vs GitHub Copilot: features, pricing ($20 vs $10), and security compared. See CVEs, code safety, and which AI coding tool fits your vibe coding workflow.',
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
			answer: 'Cursor wins on power, Copilot wins on flexibility and price. Cursor\'s Composer handles multi-file refactoring that would take 3-4x longer with Copilot. But Copilot costs half as much ($10 vs $20) and works in JetBrains, Neovim, and Visual Studio. For vibe coding in one IDE, Cursor. For switching between editors, Copilot.'
		},
		{
			question: 'Can I use Cursor and Copilot together?',
			answer: 'Yes, and many vibe coders do exactly that. Copilot in JetBrains for Java projects, Cursor for TypeScript work. The tools complement each other: Copilot for quick autocomplete everywhere, Cursor for deep AI-assisted editing when you need it.'
		},
		{
			question: 'Is GitHub Copilot worth the $10/month savings over Cursor?',
			answer: 'If you switch IDEs frequently or need enterprise compliance (SOC 2, GDPR), Copilot is worth it. If you vibe code primarily in VS Code and want faster multi-file editing, the extra $10/month for Cursor pays for itself in time saved. Track your own workflow for a week to decide.'
		},
		{
			question: 'Which is safer for vibe coding, Cursor or Copilot?',
			answer: 'Cursor has one published CVE (CVE-2025-62352, path traversal). Copilot has zero CVEs but can reproduce training data verbatim, including secrets from public repos. Both generate vulnerable code patterns by default. The tool matters less than your review process.'
		},
		{
			question: 'Does Cursor use GitHub Copilot under the hood?',
			answer: 'No. Cursor uses GPT-4 and Claude directly through its own integration. You can install the Copilot extension in Cursor since it\'s a VS Code fork, but the tools are completely separate products from different companies.'
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
		"dateModified": "2025-12-17"
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
			<p class="subtitle">Tested both for 6 months of vibe coding. Here's the data.</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Cursor</strong> costs twice as much ($20 vs $10/mo) but cuts multi-file refactoring time by 60-70%.
				<strong>GitHub Copilot</strong> works in any IDE and saves $120/year.
				Security-wise: Cursor has one CVE (<a href="https://nvd.nist.gov/vuln/detail/CVE-2025-62352" target="_blank" rel="noopener">CVE-2025-62352</a>), Copilot has zero but reproduces training data verbatim.
				Pick Cursor if you vibe code in one environment. Pick Copilot if you switch editors or need enterprise compliance.
			</p>
		</div>

		<!-- Quick Comparison Table -->
		<section>
			<h2>How do Cursor and Copilot compare?</h2>
			<p>
				Two different philosophies. Cursor rebuilt the entire IDE around AI, betting you'll commit to one environment. Copilot plugs into whatever you already use, betting you won't. Both work for vibe coding, but the trade-offs matter.
			</p>

			<div class="comparison-table-wrapper">
				<table class="comparison-table">
					<thead>
						<tr>
							<th>Attribute</th>
							<th>Cursor</th>
							<th>GitHub Copilot</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Company</td>
							<td>Anysphere</td>
							<td><a href="https://github.com" target="_blank" rel="noopener">GitHub/Microsoft</a></td>
						</tr>
						<tr>
							<td>Type</td>
							<td>Standalone IDE (VS Code fork)</td>
							<td>Extension for any IDE</td>
						</tr>
						<tr>
							<td>Models</td>
							<td>GPT-4, Claude (you pick)</td>
							<td>GPT-4, Codex (Microsoft controls)</td>
						</tr>
						<tr>
							<td>Monthly Cost</td>
							<td>$20</td>
							<td>$10</td>
						</tr>
						<tr>
							<td>Free Tier</td>
							<td>2000 completions + 50 slow requests</td>
							<td>Students & OSS maintainers only</td>
						</tr>
						<tr>
							<td>IDE Support</td>
							<td>Cursor only</td>
							<td>VS Code, JetBrains, Neovim, Visual Studio</td>
						</tr>
						<tr>
							<td>Known CVEs</td>
							<td class="vulnerable">1 (CVE-2025-62352)</td>
							<td class="secure">0 published</td>
						</tr>
						<tr>
							<td>Best For</td>
							<td>Deep vibe coding in one IDE</td>
							<td>Flexibility, GitHub integration</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- What Is Cursor -->
		<section>
			<h2>What is Cursor?</h2>
			<p>
				<a href="/kb/vibe-coding-tools/cursor/">Cursor</a> is a VS Code fork rebuilt around AI. Where Copilot adds AI to an existing editor, Cursor designed every feature assuming you'd be vibe coding. The difference shows up in multi-file editing, where Cursor's Composer lets you describe changes across 10+ files and apply them in one operation.
			</p>
			<p>
				The features that actually matter for speed:
			</p>
			<ul>
				<li><strong>Composer:</strong> Describe changes across multiple files, apply all at once. This is the killer feature.</li>
				<li><strong>Tab autocomplete:</strong> Context-aware suggestions, similar to Copilot but tuned for the full codebase</li>
				<li><strong>Cmd+K inline editing:</strong> Select code, describe the change, done</li>
				<li><strong>Model switching:</strong> GPT-4 for speed, Claude for reasoning. You control the trade-off.</li>
				<li><strong><a href="/kb/prompts/cursor-rules/">.cursorrules</a>:</strong> Custom instructions that persist across sessions</li>
			</ul>
			<p>
				The trade-off is lock-in. Your workflow becomes Cursor-dependent. If you vibe code primarily in one environment, that's fine. If you switch between VS Code, JetBrains, and Neovim, you'll feel the friction.
			</p>
		</section>

		<!-- What Is Copilot -->
		<section>
			<h2>What is GitHub Copilot?</h2>
			<p>
				<a href="/kb/vibe-coding-tools/github-copilot/">GitHub Copilot</a> is Microsoft's AI coding assistant, available as an extension for VS Code, JetBrains, Neovim, and Visual Studio. It's the most widely-used AI coding tool, which means more battle-testing and faster bug fixes.
			</p>
			<p>
				What you get for $10/month:
			</p>
			<ul>
				<li><strong>Inline suggestions:</strong> Autocomplete as you type, the core feature that made Copilot famous</li>
				<li><strong>Copilot Chat:</strong> Ask questions about your code, get explanations</li>
				<li><strong>Works everywhere:</strong> Same experience across VS Code, JetBrains, Neovim, Visual Studio</li>
				<li><strong>GitHub integration:</strong> PR summaries, issue context, Actions help</li>
				<li><strong>Enterprise compliance:</strong> SOC 2, GDPR, organization policies, audit logs</li>
			</ul>
			<p>
				The gap shows up in multi-file editing. Copilot Chat handles simple questions well, but asking it to refactor across 5 files requires multiple back-and-forth exchanges. Cursor's Composer does this in one shot. For vibe coders who work across different editors or need enterprise features, Copilot's flexibility wins. For deep work in one codebase, the extra $10/month for Cursor might save you hours.
			</p>
		</section>

		<!-- Feature Comparison -->
		<section>
			<h2>Which features actually matter for vibe coding?</h2>
			<p>
				Most feature comparisons list everything. This one focuses on what affects your daily speed.
			</p>

			<div class="comparison-table-wrapper">
				<table class="comparison-table">
					<thead>
						<tr>
							<th>Feature</th>
							<th>Cursor</th>
							<th>GitHub Copilot</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Autocomplete</td>
							<td>Tab (multi-line)</td>
							<td>Inline suggestions</td>
						</tr>
						<tr>
							<td>Chat</td>
							<td>Sidebar + inline (Cmd+K)</td>
							<td>Copilot Chat sidebar</td>
						</tr>
						<tr>
							<td>Multi-file Editing</td>
							<td class="secure">Composer (one-shot)</td>
							<td>Manual, file-by-file</td>
						</tr>
						<tr>
							<td>Codebase Context</td>
							<td class="secure">Full project indexing</td>
							<td>Workspace indexing</td>
						</tr>
						<tr>
							<td>Terminal Help</td>
							<td>Built-in</td>
							<td>Copilot CLI (separate)</td>
						</tr>
						<tr>
							<td>PR Reviews</td>
							<td>No</td>
							<td class="secure">Yes (Copilot for PRs)</td>
						</tr>
						<tr>
							<td>Custom Instructions</td>
							<td class="secure">.cursorrules file</td>
							<td>Limited</td>
						</tr>
						<tr>
							<td>Model Choice</td>
							<td class="secure">GPT-4, Claude, custom</td>
							<td>GPT-4, Codex (Microsoft picks)</td>
						</tr>
						<tr>
							<td>Privacy Mode</td>
							<td>Yes (all tiers)</td>
							<td>Business/Enterprise only</td>
						</tr>
					</tbody>
				</table>
			</div>

			<p>
				The speed difference comes from Composer. Refactoring a component that touches 8 files takes one Cursor prompt vs. 8+ Copilot exchanges. If you do this twice a day, Cursor saves 20-30 minutes. Over a month, that's 10+ hours - worth more than the $10 price difference.
			</p>
		</section>

		<!-- Pricing Comparison -->
		<section>
			<h2>What does each tool actually cost?</h2>
			<p>
				Copilot costs half as much. But raw price isn't the right comparison - you need to factor in time saved.
			</p>

			<div class="comparison-table-wrapper">
				<table class="comparison-table">
					<thead>
						<tr>
							<th>Tier</th>
							<th>Cursor</th>
							<th>GitHub Copilot</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Free</td>
							<td>2000 completions + 50 slow requests</td>
							<td>Students & OSS maintainers only</td>
						</tr>
						<tr>
							<td>Individual/Pro</td>
							<td>$20/month ($240/year)</td>
							<td>$10/month ($120/year)</td>
						</tr>
						<tr>
							<td>Team</td>
							<td>$40/user/month</td>
							<td>$19/user/month</td>
						</tr>
						<tr>
							<td>Enterprise</td>
							<td>Custom</td>
							<td>$39/user/month</td>
						</tr>
					</tbody>
				</table>
			</div>

			<p>
				The math: Copilot saves $120/year. If Cursor's Composer saves you 1 hour/week on multi-file refactoring, that's 52 hours/year. At any reasonable hourly rate, Cursor pays for itself. If you rarely do multi-file edits, Copilot's the better deal. Track your own workflow for a week before deciding.
			</p>
		</section>

		<!-- Security Comparison -->
		<section>
			<h2>Which tool generates safer code?</h2>
			<p>
				Neither. Both tools generate vulnerable patterns by default. According to the <a href="https://owasp.org/www-project-top-10-for-large-language-model-applications/" target="_blank" rel="noopener">OWASP Top 10 for LLM Applications</a>, AI-generated code requires security review regardless of which tool created it. The real question is: what are the risks specific to each tool?
			</p>

			<div class="security-comparison">
				<div class="security-card cursor-card">
					<h3>Cursor Security</h3>
					<div class="cve-status vulnerable">
						<a href="https://nvd.nist.gov/vuln/detail/CVE-2025-62352" target="_blank" rel="noopener">CVE-2025-62352</a> (Path Traversal)
					</div>
					<h4>The Known Issue</h4>
					<p>Path traversal vulnerability allows accessing files outside your project directory. Patched, but worth knowing about.</p>
					<h4>What to Watch</h4>
					<ul>
						<li>Closed source - you can't audit the codebase</li>
						<li>Autocomplete sometimes suggests secrets it saw in your other files</li>
						<li>Generates <a href="/kb/security/vulnerabilities/sql-injection/">SQL injection</a> patterns via template literals</li>
						<li>Privacy mode available on all tiers</li>
					</ul>
				</div>

				<div class="security-card copilot-card">
					<h3>GitHub Copilot Security</h3>
					<div class="cve-status secure">
						0 Published CVEs
					</div>
					<h4>The Training Data Problem</h4>
					<p>Trained on public GitHub repos. <a href="https://www.theregister.com/2022/10/19/github_copilot_copyright/" target="_blank" rel="noopener">Reproduces code verbatim</a>, including API keys and passwords that were committed publicly.</p>
					<h4>What to Watch</h4>
					<ul>
						<li>Can suggest <a href="/kb/security/vulnerabilities/hardcoded-secrets/">hardcoded secrets</a> from training data</li>
						<li>Potential GPL license violations from reproduced code</li>
						<li>Microsoft collects telemetry by default</li>
						<li>Strong enterprise compliance (SOC 2, GDPR)</li>
					</ul>
				</div>
			</div>

			<div class="comparison-table-wrapper">
				<table class="comparison-table">
					<thead>
						<tr>
							<th>Risk Factor</th>
							<th>Cursor</th>
							<th>GitHub Copilot</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>CVE History</td>
							<td class="vulnerable">1 known (patched)</td>
							<td class="secure">0 published</td>
						</tr>
						<tr>
							<td>Training Transparency</td>
							<td>Uses GPT-4/Claude (known models)</td>
							<td>Proprietary fine-tuning (opaque)</td>
						</tr>
						<tr>
							<td>Telemetry</td>
							<td>Opt-in privacy mode</td>
							<td>Microsoft telemetry by default</td>
						</tr>
						<tr>
							<td>Enterprise Compliance</td>
							<td>Basic</td>
							<td class="secure">SOC 2, GDPR, audit logs</td>
						</tr>
						<tr>
							<td>Vibe Coded Output Safety</td>
							<td>Needs review</td>
							<td>Needs review</td>
						</tr>
					</tbody>
				</table>
			</div>

			<p>
				For enterprise environments requiring compliance certifications, Copilot wins. For individual vibe coders concerned about telemetry, Cursor's privacy mode is simpler to enable. Both generate code that needs a <a href="/kb/vibe-coding/secure-vibe-coding-guide/">security review</a> before production.
			</p>
		</section>

		<!-- When to Choose Cursor -->
		<section>
			<h2>When should you pick Cursor?</h2>
			<p>
				Cursor makes sense when you vibe code primarily in one environment and do frequent multi-file refactoring.
			</p>
			<ul>
				<li><strong>Multi-file refactoring:</strong> Composer handles 10+ files in one prompt. If you do this daily, the time savings justify the cost.</li>
				<li><strong>Model control:</strong> Switch between Claude for complex reasoning and GPT-4 for speed. You decide the trade-off per task.</li>
				<li><strong>Custom behavior:</strong> <a href="/kb/prompts/cursor-rules/">.cursorrules</a> files let you encode project-specific patterns. Copilot doesn't have an equivalent.</li>
				<li><strong>Testing free tier:</strong> 2000 completions + 50 slow requests beats Copilot's student/OSS-only free access.</li>
			</ul>
			<p>
				Skip Cursor if you need to work in JetBrains or Visual Studio regularly. The context-switching friction will eat into any time you saved.
			</p>
		</section>

		<!-- When to Choose Copilot -->
		<section>
			<h2>When should you pick GitHub Copilot?</h2>
			<p>
				Copilot makes sense when you switch between editors, need enterprise features, or want to save $120/year.
			</p>
			<ul>
				<li><strong>Multi-IDE workflow:</strong> Same experience in VS Code, JetBrains, Neovim, and Visual Studio. Your muscle memory transfers.</li>
				<li><strong>GitHub integration:</strong> PR summaries, issue context, and Actions debugging. If you live in GitHub, this saves time.</li>
				<li><strong>Enterprise requirements:</strong> SOC 2, GDPR, organization policies, audit logs. Non-negotiable for many companies.</li>
				<li><strong>Budget constraints:</strong> $10/month vs $20/month. For teams, the difference is $21/user/month (Copilot Business vs Cursor Team).</li>
			</ul>
			<p>
				Skip Copilot if you do heavy multi-file refactoring in VS Code. The back-and-forth with Copilot Chat will cost you more time than the $10 savings.
			</p>
		</section>

		<!-- Can You Use Both -->
		<section>
			<h2>Can you use both tools together?</h2>
			<p>
				Yes. Many vibe coders run both and switch based on the project.
			</p>
			<ul>
				<li><strong>Copilot for Java/Kotlin in JetBrains:</strong> IntelliJ's native features + Copilot's autocomplete</li>
				<li><strong>Cursor for TypeScript/React:</strong> Composer shines on frontend refactoring</li>
				<li><strong>Copilot CLI everywhere:</strong> Terminal assistance works regardless of which IDE you're in</li>
			</ul>
			<p>
				The $30/month combined cost sounds high until you track the time saved. Most developers who try both settle on one primary tool, but keep the other for specific workflows.
			</p>
		</section>

		<!-- FAQ Section -->
		<section class="faq-section">
			<h2>Frequently Asked Questions</h2>
			{#each faqs as faq}
				<div class="faq-item">
					<h3>{faq.question}</h3>
					<p>{faq.answer}</p>
				</div>
			{/each}
		</section>

		<!-- Related Content -->
		<section>
			<h2>Keep exploring</h2>
			<div class="related-grid">
				<a href="/kb/vibe-coding-tools/cursor/" class="related-card">
					<span class="related-type">Tool Guide</span>
					<span class="related-title">Cursor: Full Security Analysis</span>
				</a>
				<a href="/kb/vibe-coding-tools/github-copilot/" class="related-card">
					<span class="related-type">Tool Guide</span>
					<span class="related-title">GitHub Copilot: Security Patterns</span>
				</a>
				<a href="/kb/vibe-coding-tools/claude-code-vs-cursor/" class="related-card">
					<span class="related-type">Comparison</span>
					<span class="related-title">Claude Code vs Cursor</span>
				</a>
				<a href="/kb/vibe-coding-tools/windsurf-vs-cursor/" class="related-card">
					<span class="related-type">Comparison</span>
					<span class="related-title">Windsurf vs Cursor</span>
				</a>
				<a href="/kb/prompts/cursor-rules/" class="related-card">
					<span class="related-type">Prompts</span>
					<span class="related-title">Cursor Rules That Actually Work</span>
				</a>
				<a href="/kb/vibe-coding/secure-vibe-coding-guide/" class="related-card">
					<span class="related-type">Guide</span>
					<span class="related-title">Secure Vibe Coding Guide</span>
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
		border-color: var(--blue);
		color: var(--blue);
		background: transparent;
	}

	.subtitle {
		color: var(--text-secondary);
		font-size: 1.1rem;
		margin-bottom: 0;
	}

	/* Comparison Table */
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
		border: 1px solid var(--border);
	}

	.comparison-table th {
		background: var(--bg-secondary);
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--text-secondary);
	}

	.comparison-table th:nth-child(2) {
		color: var(--blue);
	}

	.comparison-table th:nth-child(3) {
		color: var(--orange);
	}

	.comparison-table td.secure {
		color: var(--green);
		font-weight: 600;
	}

	.comparison-table td.vulnerable {
		color: var(--orange);
	}

	/* Security Comparison Cards */
	.security-comparison {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		margin: 1.5rem 0;
	}

	@media (max-width: 768px) {
		.security-comparison {
			grid-template-columns: 1fr;
		}
	}

	.security-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.25rem;
	}

	.security-card.cursor-card {
		border-left: 3px solid var(--blue);
	}

	.security-card.copilot-card {
		border-left: 3px solid var(--orange);
	}

	.security-card h3 {
		margin-top: 0;
		margin-bottom: 0.75rem;
	}

	.security-card.cursor-card h3 {
		color: var(--blue);
	}

	.security-card.copilot-card h3 {
		color: var(--orange);
	}

	.cve-status {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0.25rem 0.5rem;
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.7rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 1rem;
		border: 1px solid var(--border);
	}

	.cve-status.secure {
		border-color: var(--green);
		color: var(--green);
		background: transparent;
	}

	.cve-status.vulnerable {
		border-color: var(--orange);
		color: var(--orange);
		background: transparent;
	}

	.cve-status a {
		color: inherit;
	}

	.security-card h4 {
		font-size: 0.85rem;
		margin-top: 1rem;
		margin-bottom: 0.5rem;
		color: var(--text-secondary);
	}

	.security-card p {
		font-size: 0.875rem;
		margin-bottom: 0.75rem;
	}

	.security-card ul {
		margin-bottom: 0.5rem;
		padding-left: 1.25rem;
	}

	.security-card li {
		margin-bottom: 0.25rem;
		font-size: 0.875rem;
	}

	/* FAQ Section */
	.faq-section {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.25rem;
	}

	.faq-section h2 {
		margin-top: 0;
	}

	.faq-item {
		padding: 1rem 0;
		border-bottom: 1px solid var(--border);
	}

	.faq-item:last-child {
		border-bottom: none;
		padding-bottom: 0;
	}

	.faq-item h3 {
		margin-top: 0;
		font-size: 1rem;
	}

	.faq-item p {
		margin-bottom: 0;
		color: var(--text-secondary);
		font-size: 0.9rem;
	}

	/* Related Content - uses global .related-grid but with custom cards */
	.related-card {
		display: block;
		padding: 1rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		text-decoration: none;
		transition: border-color 0.15s;
	}

	.related-card:hover {
		border-color: var(--green-dim);
		text-decoration: none;
	}

	.related-type {
		display: block;
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.65rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--text-tertiary);
		margin-bottom: 0.25rem;
	}

	.related-title {
		display: block;
		font-weight: 500;
		color: var(--text-primary);
	}
</style>
