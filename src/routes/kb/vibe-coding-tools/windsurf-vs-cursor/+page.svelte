<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Windsurf vs Cursor: AI IDE Comparison 2025',
		description: 'Windsurf vs Cursor comparison: features, pricing, security. Both have 2025 CVEs. See which AI IDE is right for you and how to use each safely.',
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
			answer: 'It depends on your needs. Windsurf offers more autonomous coding via Cascade at $15/month. Cursor provides proven stability with a larger community at $20/month. Windsurf has a critical CVE (CVSS 9.8) while Cursor\'s CVE is less severe. Choose Windsurf for autonomy, Cursor for reliability.'
		},
		{
			question: 'Is Windsurf free?',
			answer: 'Yes, Windsurf has a generous free tier with unlimited basic features. Pro costs $15/month for advanced features like unlimited Cascade flows. Cursor\'s free tier is more limited (2000 completions), making Windsurf the better free option.'
		},
		{
			question: 'Is Windsurf safe to use?',
			answer: 'Windsurf has known security issues: CVE-2025-62353 (path traversal, CVSS 9.8 Critical) and documented prompt injection attacks that can exfiltrate .env files. Keep it updated, avoid opening untrusted projects, and never put secrets in files the AI can access.'
		},
		{
			question: 'What is Windsurf Cascade?',
			answer: 'Cascade is Windsurf\'s autonomous AI agent that can execute multi-step tasks independently. It maintains context through "Flows" and can run terminal commands, edit files, and browse the web. It\'s more autonomous than Cursor\'s Composer but that autonomy increases attack surface.'
		},
		{
			question: 'Should I switch from Cursor to Windsurf?',
			answer: 'Consider switching if you want more autonomous AI assistance, better free tier, or $5/month savings. Stay with Cursor if you value proven stability, larger community support, or prefer less autonomous AI. Both tools have 2025 CVEs, so neither is definitively "safer."'
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
	<article class="content-main">
		<!-- Header -->
		<header class="article-header">
			<div class="badge-row">
				<span class="badge badge-comparison">Comparison</span>
				<span class="badge">2025</span>
			</div>
			<h1>Windsurf vs Cursor: Complete AI IDE Comparison Guide</h1>
			<p class="subtitle">Features, pricing, and security compared for vibe coders</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Windsurf</strong> offers more autonomous coding with Cascade at $15/mo.
				<strong>Cursor</strong> provides proven reliability at $20/mo.
				Both have path traversal CVEs in 2025: Windsurf's <a href="https://nvd.nist.gov/vuln/detail/CVE-2025-62353" target="_blank" rel="noopener">CVE-2025-62353</a> (CVSS 9.8 Critical) is more severe than Cursor's <a href="https://nvd.nist.gov/vuln/detail/CVE-2025-62352" target="_blank" rel="noopener">CVE-2025-62352</a>.
				Windsurf's autonomy is powerful but increases attack surface.
			</p>
		</div>

		<!-- Quick Comparison Table -->
		<section>
			<h2>Windsurf vs Cursor: Quick Comparison</h2>
			<p>
				Both are VS Code forks with deep AI integration, but they take different approaches. Windsurf emphasizes autonomous agents while Cursor focuses on reliable AI augmentation. Both are popular choices for vibe coding.
			</p>

			<div class="comparison-table-wrapper">
				<table class="comparison-table">
					<thead>
						<tr>
							<th>Attribute</th>
							<th>Windsurf</th>
							<th>Cursor</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Company</td>
							<td><a href="https://codeium.com" target="_blank" rel="noopener">Codeium</a></td>
							<td>Anysphere</td>
						</tr>
						<tr>
							<td>Type</td>
							<td>AI-native IDE</td>
							<td>VS Code fork</td>
						</tr>
						<tr>
							<td>AI Agent</td>
							<td>Cascade (autonomous)</td>
							<td>Composer (guided)</td>
						</tr>
						<tr>
							<td>Pro Pricing</td>
							<td>$15/mo</td>
							<td>$20/mo</td>
						</tr>
						<tr>
							<td>Free Tier</td>
							<td>Generous</td>
							<td>Limited (2000 completions)</td>
						</tr>
						<tr>
							<td>Known CVEs</td>
							<td class="vulnerable-high">CVE-2025-62353 (CVSS 9.8)</td>
							<td class="vulnerable">CVE-2025-62352</td>
						</tr>
						<tr>
							<td>Best For</td>
							<td>Autonomous workflows</td>
							<td>Controlled AI assistance</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- What Is Windsurf -->
		<section>
			<h2>What is Windsurf?</h2>
			<p>
				<a href="/kb/vibe-coding-tools/windsurf/">Windsurf</a> is <a href="https://codeium.com" target="_blank" rel="noopener">Codeium's</a> AI-native IDE built for autonomous coding. Its standout feature is Cascade, an AI agent that can independently plan and execute complex tasks across your codebase.
			</p>
			<p>
				Key features that define Windsurf:
			</p>
			<ul>
				<li><strong>Cascade:</strong> Autonomous agent that executes multi-step tasks</li>
				<li><strong>Flows:</strong> Context management system that tracks your work</li>
				<li><strong>Supercomplete:</strong> Predictive autocomplete with multi-line suggestions</li>
				<li><strong>MCP support:</strong> Connect to external tools and data sources</li>
				<li><strong>Generous free tier:</strong> More free usage than most competitors</li>
			</ul>
			<p>
				Windsurf is ideal for vibe coders who want maximum autonomy - describe what you need and let Cascade figure out the implementation across multiple files.
			</p>
		</section>

		<!-- What Is Cursor -->
		<section>
			<h2>What is Cursor?</h2>
			<p>
				<a href="/kb/vibe-coding-tools/cursor/">Cursor</a> is the most popular AI coding IDE, built as a VS Code fork with native AI integration. It's known for reliability, strong community support, and a balance between AI power and developer control.
			</p>
			<p>
				Key features that make Cursor popular:
			</p>
			<ul>
				<li><strong>Tab autocomplete:</strong> Fast, context-aware code suggestions</li>
				<li><strong>Composer:</strong> Multi-file editing through guided chat</li>
				<li><strong>Cmd+K:</strong> Inline code editing with natural language</li>
				<li><strong>Model flexibility:</strong> GPT-4, Claude, or custom models</li>
				<li><strong>VS Code compatibility:</strong> All your extensions work</li>
			</ul>
			<p>
				Cursor is ideal for vibe coders who want proven AI assistance within a familiar IDE without giving up too much control.
			</p>
		</section>

		<!-- Feature Comparison -->
		<section>
			<h2>Feature Comparison</h2>
			<p>
				Here's how Windsurf and Cursor compare across key features for vibe coding:
			</p>

			<div class="comparison-table-wrapper">
				<table class="comparison-table">
					<thead>
						<tr>
							<th>Feature</th>
							<th>Windsurf</th>
							<th>Cursor</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Autocomplete</td>
							<td>Supercomplete (multi-line)</td>
							<td>Tab (single/multi-line)</td>
						</tr>
						<tr>
							<td>AI Agent</td>
							<td>Cascade (highly autonomous)</td>
							<td>Composer (guided)</td>
						</tr>
						<tr>
							<td>Context System</td>
							<td>Flows (persistent)</td>
							<td>Codebase indexing</td>
						</tr>
						<tr>
							<td>Autonomy Level</td>
							<td>High</td>
							<td>Medium</td>
						</tr>
						<tr>
							<td>Terminal Integration</td>
							<td>Yes (Cascade can run commands)</td>
							<td>Yes</td>
						</tr>
						<tr>
							<td>Background Tasks</td>
							<td>Yes</td>
							<td>Limited</td>
						</tr>
						<tr>
							<td>Rules Files</td>
							<td>.windsurfrules</td>
							<td>.cursorrules</td>
						</tr>
						<tr>
							<td>MCP Support</td>
							<td>Yes</td>
							<td>Yes</td>
						</tr>
						<tr>
							<td>Privacy Mode</td>
							<td>Yes</td>
							<td>Yes</td>
						</tr>
					</tbody>
				</table>
			</div>

			<p>
				<strong>Key insight:</strong> Windsurf's Cascade is more autonomous - it can independently browse, research, and execute multi-step plans. Cursor's Composer requires more guidance but gives you more control. The tradeoff is autonomy vs predictability.
			</p>
		</section>

		<!-- Pricing Comparison -->
		<section>
			<h2>Pricing Comparison</h2>
			<p>
				Windsurf offers better value at $15/month vs Cursor's $20/month, with a more generous free tier:
			</p>

			<div class="comparison-table-wrapper">
				<table class="comparison-table">
					<thead>
						<tr>
							<th>Tier</th>
							<th>Windsurf</th>
							<th>Cursor</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Free</td>
							<td>Generous limits, basic features</td>
							<td>2000 completions, limited</td>
						</tr>
						<tr>
							<td>Pro</td>
							<td>$15/month</td>
							<td>$20/month</td>
						</tr>
						<tr>
							<td>Team</td>
							<td>$30/user/month</td>
							<td>Custom pricing</td>
						</tr>
					</tbody>
				</table>
			</div>

			<p>
				<strong>Bottom line:</strong> If budget matters, Windsurf saves you $60/year with a better free tier for trying before buying.
			</p>
		</section>

		<!-- Security Comparison -->
		<section>
			<h2>Security Comparison: CVEs and Risks</h2>
			<p>
				Both tools have path traversal CVEs disclosed in 2025. Here's how their security profiles compare. Per the <a href="https://owasp.org/www-project-top-10-for-large-language-model-applications/" target="_blank" rel="noopener">OWASP Top 10 for LLM Applications</a>, all AI coding tools require security review.
			</p>

			<div class="security-comparison">
				<div class="security-card windsurf">
					<h3>Windsurf Security</h3>
					<div class="cve-status vulnerable-high">
						<a href="https://nvd.nist.gov/vuln/detail/CVE-2025-62353" target="_blank" rel="noopener">CVE-2025-62353</a> (CVSS 9.8 Critical)
					</div>
					<h4>The Vulnerability</h4>
					<p>Path traversal in <code>codebase_search</code> and <code>write_to_file</code> tools allows reading/writing files outside project directory.</p>
					<h4>Additional Risks</h4>
					<ul>
						<li><a href="https://www.pillar.security/blog/new-vulnerability-in-windsurf-editor-enabled-ai-to-exfiltrate-data-and-write-arbitrary-files" target="_blank" rel="noopener">Prompt injection</a> can exfiltrate .env files</li>
						<li>94+ inherited Electron/Chromium CVEs</li>
						<li>Higher autonomy = larger attack surface</li>
						<li>Cascade can run commands without confirmation</li>
					</ul>
				</div>

				<div class="security-card cursor">
					<h3>Cursor Security</h3>
					<div class="cve-status vulnerable">
						<a href="https://nvd.nist.gov/vuln/detail/CVE-2025-62352" target="_blank" rel="noopener">CVE-2025-62352</a> (Path Traversal)
					</div>
					<h4>The Vulnerability</h4>
					<p>Similar path traversal class affecting file operations. Less severe than Windsurf's CVE.</p>
					<h4>Additional Risks</h4>
					<ul>
						<li>Autocomplete can expose secrets</li>
						<li><a href="/kb/security/vulnerabilities/sql-injection/">SQL injection</a> via template literals</li>
						<li>94+ inherited Electron/Chromium CVEs</li>
						<li>Less autonomous = smaller attack surface</li>
					</ul>
				</div>
			</div>

			<div class="comparison-table-wrapper">
				<table class="comparison-table">
					<thead>
						<tr>
							<th>Risk Factor</th>
							<th>Windsurf</th>
							<th>Cursor</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>CVE Severity</td>
							<td class="vulnerable-high">Critical (CVSS 9.8)</td>
							<td class="vulnerable">Lower</td>
						</tr>
						<tr>
							<td>Attack Surface</td>
							<td>Larger (Cascade autonomy)</td>
							<td>Smaller</td>
						</tr>
						<tr>
							<td>Prompt Injection Risk</td>
							<td>Higher</td>
							<td>Medium</td>
						</tr>
						<tr>
							<td>Secret Exposure</td>
							<td>Documented attacks</td>
							<td>Autocomplete risk</td>
						</tr>
					</tbody>
				</table>
			</div>

			<p>
				<strong>Bottom line:</strong> Windsurf's higher autonomy comes with higher risk. Its CVE is more severe and its Cascade agent has documented prompt injection attacks. Cursor is relatively safer but not immune. Use <a href="/kb/vibe-coding/secure-vibe-coding-guide/">security rules files</a> and never put secrets in files the AI can access.
			</p>
		</section>

		<!-- When to Choose Windsurf -->
		<section>
			<h2>When to Choose Windsurf</h2>
			<p>
				Windsurf is the better choice when you need:
			</p>
			<ul>
				<li><strong>Maximum autonomy:</strong> Cascade executes complex tasks independently</li>
				<li><strong>Budget-conscious:</strong> $15/mo vs $20/mo ($60/year savings)</li>
				<li><strong>Better free tier:</strong> More generous limits for trying before buying</li>
				<li><strong>Multi-step workflows:</strong> Tasks requiring research, planning, and execution</li>
				<li><strong>Early adopter comfort:</strong> Willing to accept higher risk for more power</li>
			</ul>
			<p>
				<strong>Ideal user:</strong> Developers who want an AI that can work independently and don't mind the security tradeoffs of high autonomy.
			</p>
		</section>

		<!-- When to Choose Cursor -->
		<section>
			<h2>When to Choose Cursor</h2>
			<p>
				Cursor is the better choice when you need:
			</p>
			<ul>
				<li><strong>Proven stability:</strong> Larger community, more battle-tested</li>
				<li><strong>Lower risk:</strong> Less autonomous = smaller attack surface</li>
				<li><strong>Model flexibility:</strong> Easily switch between GPT-4, Claude, etc.</li>
				<li><strong>Controlled assistance:</strong> AI helps but you stay in charge</li>
				<li><strong>Larger ecosystem:</strong> More tutorials, community support</li>
			</ul>
			<p>
				<strong>Ideal user:</strong> Developers who want reliable AI augmentation within a familiar IDE without giving up control.
			</p>
		</section>

		<!-- Can You Use Both -->
		<section>
			<h2>Can you use both?</h2>
			<p>
				Yes. A practical workflow:
			</p>
			<ul>
				<li><strong>Windsurf Cascade</strong> for autonomous tasks: "Research and implement OAuth for this app"</li>
				<li><strong>Cursor</strong> for controlled editing: Quick fixes, autocomplete, inline edits</li>
			</ul>
			<p>
				Many developers keep both installed, using Windsurf when they want hands-off execution and Cursor when they want to stay more involved. Since both are VS Code forks, your extensions and settings transfer easily.
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
			<h2>Related Comparisons</h2>
			<div class="related-grid">
				<a href="/kb/vibe-coding-tools/windsurf/" class="related-card">
					<span class="related-type">Tool Guide</span>
					<span class="related-title">Windsurf Security Patterns</span>
				</a>
				<a href="/kb/vibe-coding-tools/cursor/" class="related-card">
					<span class="related-type">Tool Guide</span>
					<span class="related-title">Cursor Security Patterns</span>
				</a>
				<a href="/kb/vibe-coding-tools/claude-code-vs-cursor/" class="related-card">
					<span class="related-type">Comparison</span>
					<span class="related-title">Claude Code vs Cursor</span>
				</a>
				<a href="/kb/vibe-coding/secure-vibe-coding-guide/" class="related-card">
					<span class="related-type">Pillar Guide</span>
					<span class="related-title">The Complete Secure Vibe Coding Guide</span>
				</a>
				<a href="/kb/vibe-coding-tools/claude-code/" class="related-card">
					<span class="related-type">Tool Guide</span>
					<span class="related-title">Claude Code Security Patterns</span>
				</a>
				<a href="/kb/security/checklists/pre-launch/" class="related-card">
					<span class="related-type">Checklist</span>
					<span class="related-title">Pre-Launch Security Checklist</span>
				</a>
			</div>
		</section>
	</article>
</div>

<style>
	.content-wrapper {
		max-width: 900px;
		margin: 0 auto;
		padding: 2rem;
	}

	.article-header {
		margin-bottom: 2rem;
	}

	.badge-row {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		margin-bottom: 1rem;
	}

	.badge {
		display: inline-block;
		padding: 0.25rem 0.75rem;
		border-radius: 4px;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		background: var(--surface-2, #333);
		color: var(--text-secondary, #aaa);
	}

	.badge-comparison {
		background: #3b82f6;
		color: white;
	}

	h1 {
		font-size: 2.25rem;
		margin-bottom: 0.5rem;
		line-height: 1.2;
	}

	.subtitle {
		color: var(--text-secondary, #888);
		font-size: 1.1rem;
	}

	.quick-answer {
		background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%);
		border: 1px solid rgba(59, 130, 246, 0.3);
		border-radius: 8px;
		padding: 1.5rem;
		margin-bottom: 2rem;
	}

	.quick-answer-label {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		color: #3b82f6;
		margin-bottom: 0.5rem;
	}

	.quick-answer-text {
		margin: 0;
		line-height: 1.6;
	}

	section {
		margin-bottom: 2.5rem;
	}

	h2 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--border, #333);
	}

	h3 {
		font-size: 1.1rem;
		margin-bottom: 0.5rem;
		margin-top: 1rem;
	}

	h4 {
		font-size: 0.9rem;
		margin-bottom: 0.5rem;
		margin-top: 1rem;
		color: var(--text-secondary, #888);
	}

	p {
		line-height: 1.7;
		margin-bottom: 1rem;
	}

	ul {
		margin-bottom: 1rem;
		padding-left: 1.5rem;
	}

	li {
		margin-bottom: 0.5rem;
		line-height: 1.6;
	}

	a {
		color: #22c55e;
	}

	a:hover {
		text-decoration: underline;
	}

	code {
		background: var(--surface-2, #2a2a2a);
		padding: 0.15rem 0.4rem;
		border-radius: 4px;
		font-size: 0.85em;
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
		border-bottom: 1px solid var(--border, #333);
	}

	.comparison-table th {
		background: var(--surface-1, #1a1a1a);
		font-weight: 600;
	}

	.comparison-table th:nth-child(2) {
		color: #06b6d4;
	}

	.comparison-table th:nth-child(3) {
		color: #3b82f6;
	}

	.comparison-table td.secure {
		color: #22c55e;
		font-weight: 600;
	}

	.comparison-table td.vulnerable {
		color: #f59e0b;
	}

	.comparison-table td.vulnerable-high {
		color: #ef4444;
		font-weight: 600;
	}

	/* Security Comparison */
	.security-comparison {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
		margin: 1.5rem 0;
	}

	@media (max-width: 768px) {
		.security-comparison {
			grid-template-columns: 1fr;
		}
	}

	.security-card {
		background: var(--surface-1, #1a1a1a);
		border-radius: 8px;
		padding: 1.5rem;
	}

	.security-card.windsurf {
		border: 1px solid rgba(6, 182, 212, 0.3);
	}

	.security-card.cursor {
		border: 1px solid rgba(59, 130, 246, 0.3);
	}

	.security-card h3 {
		margin-top: 0;
		margin-bottom: 0.75rem;
	}

	.security-card.windsurf h3 {
		color: #06b6d4;
	}

	.security-card.cursor h3 {
		color: #3b82f6;
	}

	.cve-status {
		display: inline-block;
		padding: 0.25rem 0.75rem;
		border-radius: 4px;
		font-size: 0.8rem;
		font-weight: 600;
		margin-bottom: 1rem;
	}

	.cve-status.secure {
		background: rgba(34, 197, 94, 0.2);
		color: #22c55e;
	}

	.cve-status.vulnerable {
		background: rgba(245, 158, 11, 0.2);
		color: #f59e0b;
	}

	.cve-status.vulnerable-high {
		background: rgba(239, 68, 68, 0.2);
		color: #ef4444;
	}

	.cve-status a {
		color: inherit;
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
		background: var(--surface-1, #1a1a1a);
		border-radius: 8px;
		padding: 1.5rem;
	}

	.faq-item {
		padding: 1rem 0;
		border-bottom: 1px solid var(--border, #333);
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
		color: var(--text-secondary, #aaa);
		font-size: 0.9rem;
	}

	/* Related Content */
	.related-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
	}

	.related-card {
		display: block;
		padding: 1rem;
		background: var(--surface-1, #1a1a1a);
		border: 1px solid var(--border, #333);
		border-radius: 8px;
		text-decoration: none;
		transition: border-color 0.2s;
	}

	.related-card:hover {
		border-color: #22c55e;
		text-decoration: none;
	}

	.related-type {
		display: block;
		font-size: 0.75rem;
		color: var(--text-secondary, #888);
		text-transform: uppercase;
		margin-bottom: 0.25rem;
	}

	.related-title {
		display: block;
		font-weight: 600;
		color: var(--text-primary, #fff);
	}
</style>
