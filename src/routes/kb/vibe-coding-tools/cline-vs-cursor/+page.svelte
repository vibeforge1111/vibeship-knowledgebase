<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Cline vs Cursor: Free vs Paid AI Coding Compared',
		description: 'Cline vs Cursor: open-source free alternative vs $20/mo IDE. Compare features, security (CVEs, human-in-the-loop), and true costs. Complete 2025 guide.',
		url: '/kb/vibe-coding-tools/cline-vs-cursor/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Vibe Coding Tools', href: '/kb/vibe-coding-tools' },
		{ label: 'Cline vs Cursor' }
	];

	// FAQ data
	const faqs = [
		{
			question: 'Is Cline better than Cursor?',
			answer: 'Cline is better for developers who want approval control over every AI action, open-source auditability, or to use their own API keys. Cursor is better for those who want polished UX, autocomplete, and fixed pricing. Cline has no known CVEs; Cursor has CVE-2025-62352. Choose based on control vs convenience.'
		},
		{
			question: 'Is Cline free?',
			answer: 'Yes, Cline is free and open-source under Apache 2.0 license. You bring your own API keys (OpenAI, Anthropic, or local models via Ollama), so you pay usage-based API costs. Typical monthly costs range from $10-50 depending on usage, which can be more or less than Cursor\'s $20/month.'
		},
		{
			question: 'Can Cline use local models?',
			answer: 'Yes, Cline supports local models through Ollama integration. This means zero API costs and complete data privacy - your code never leaves your machine. Performance depends on your hardware and the local model quality. Popular choices include CodeLlama and DeepSeek Coder.'
		},
		{
			question: 'Is Cline safe to use?',
			answer: 'Cline has strong security properties: open-source (fully auditable), human-in-the-loop approval for every action, and no proprietary telemetry. However, API keys are stored in VS Code settings (local security matters), and it depends on community maintenance for security patches rather than a dedicated team.'
		},
		{
			question: 'What is Cline AI?',
			answer: 'Cline (formerly Claude Dev) is a free, open-source VS Code extension that provides autonomous AI coding assistance. Its key feature is human-in-the-loop approval - every file edit, terminal command, or browser action requires your explicit approval before execution. It supports Claude, GPT-4, and local models via Ollama.'
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
			{"@type": "ListItem", "position": 3, "name": "Cline vs Cursor"}
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
			<h1>Cline vs Cursor: Free Open-Source vs Paid AI IDE</h1>
			<p class="subtitle">Control and auditability vs polish and convenience</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Cline</strong> is a free, open-source VS Code extension with human-in-the-loop approval for every action.
				<strong>Cursor</strong> is a $20/mo IDE with faster workflows and autocomplete.
				Cline has no CVEs; Cursor has <a href="https://nvd.nist.gov/vuln/detail/CVE-2025-62352" target="_blank" rel="noopener">CVE-2025-62352</a>.
				Choose Cline for control and auditability; Cursor for speed and polish.
			</p>
		</div>

		<!-- Quick Comparison Table -->
		<section>
			<h2>Cline vs Cursor: Quick Comparison</h2>
			<p>
				This comparison represents two different philosophies in AI-assisted development. Cline prioritizes developer control with approval workflows. Cursor prioritizes speed with automatic execution. Both are excellent tools for vibe coding with different tradeoffs.
			</p>

			<div class="comparison-table-wrapper">
				<table class="comparison-table">
					<thead>
						<tr>
							<th>Attribute</th>
							<th>Cline</th>
							<th>Cursor</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Type</td>
							<td>VS Code Extension</td>
							<td>Standalone IDE (VS Code fork)</td>
						</tr>
						<tr>
							<td>Pricing</td>
							<td>Free (BYOK)</td>
							<td>$20/mo Pro</td>
						</tr>
						<tr>
							<td>Open Source</td>
							<td class="secure">Yes (Apache 2.0)</td>
							<td>No</td>
						</tr>
						<tr>
							<td>Models</td>
							<td>Any (Claude, GPT-4, Ollama)</td>
							<td>GPT-4, Claude (built-in)</td>
						</tr>
						<tr>
							<td>Human-in-the-loop</td>
							<td class="secure">Yes (every action)</td>
							<td>No (auto-apply)</td>
						</tr>
						<tr>
							<td>Autocomplete</td>
							<td>No</td>
							<td>Yes (Tab)</td>
						</tr>
						<tr>
							<td>Known CVEs</td>
							<td class="secure">None</td>
							<td class="vulnerable">CVE-2025-62352</td>
						</tr>
						<tr>
							<td>Best For</td>
							<td>Control, auditability</td>
							<td>Speed, polish</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- What Is Cline -->
		<section>
			<h2>What is Cline?</h2>
			<p>
				Cline (formerly Claude Dev) is a free, open-source VS Code extension that provides autonomous AI coding assistance with a critical difference: every action requires your approval before execution.
			</p>
			<p>
				Key features that define Cline:
			</p>
			<ul>
				<li><strong>Human-in-the-loop:</strong> Every file edit, terminal command, and browser action needs approval</li>
				<li><strong>Open source:</strong> Full transparency - <a href="https://github.com/cline/cline" target="_blank" rel="noopener">audit the code yourself</a></li>
				<li><strong>BYOK (Bring Your Own Key):</strong> Use Claude, GPT-4, or local models via Ollama</li>
				<li><strong>Browser integration:</strong> Can take screenshots for visual debugging</li>
				<li><strong>MCP support:</strong> Connect to external tools and data sources</li>
				<li><strong>Self-hosted option:</strong> Run entirely on your infrastructure</li>
			</ul>
			<p>
				Cline is ideal for vibe coders who want maximum control, security auditability, or prefer usage-based pricing over subscriptions.
			</p>
		</section>

		<!-- What Is Cursor -->
		<section>
			<h2>What is Cursor?</h2>
			<p>
				<a href="/kb/vibe-coding-tools/cursor/">Cursor</a> is the most popular AI coding IDE, built as a VS Code fork with AI integrated into every aspect of the editor. It prioritizes speed and seamless AI integration.
			</p>
			<p>
				Key features that make Cursor popular:
			</p>
			<ul>
				<li><strong>Tab autocomplete:</strong> Fast, context-aware code suggestions</li>
				<li><strong>Composer:</strong> Multi-file editing through natural language</li>
				<li><strong>Auto-apply:</strong> AI changes applied automatically (review after)</li>
				<li><strong>Model flexibility:</strong> GPT-4, Claude, or custom models built-in</li>
				<li><strong>Codebase indexing:</strong> AI understands your entire project</li>
				<li><strong>Polished UX:</strong> Refined interface purpose-built for AI coding</li>
			</ul>
			<p>
				Cursor is ideal for vibe coders who want the fastest AI-assisted workflow without the friction of approving each action.
			</p>
		</section>

		<!-- Feature Comparison -->
		<section>
			<h2>Feature Comparison</h2>
			<p>
				The fundamental difference is approval workflow: Cline asks before acting; Cursor acts then lets you review. Here's how other features compare:
			</p>

			<div class="comparison-table-wrapper">
				<table class="comparison-table">
					<thead>
						<tr>
							<th>Feature</th>
							<th>Cline</th>
							<th>Cursor</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Autocomplete</td>
							<td>No</td>
							<td>Yes (Tab)</td>
						</tr>
						<tr>
							<td>Chat</td>
							<td>Yes</td>
							<td>Yes</td>
						</tr>
						<tr>
							<td>Multi-file Editing</td>
							<td>Yes (with approval per file)</td>
							<td>Yes (Composer, auto-apply)</td>
						</tr>
						<tr>
							<td>Terminal Commands</td>
							<td>Yes (with approval)</td>
							<td>Yes</td>
						</tr>
						<tr>
							<td>File Creation</td>
							<td>Yes (with approval)</td>
							<td>Yes</td>
						</tr>
						<tr>
							<td>Browser Integration</td>
							<td>Yes (screenshot analysis)</td>
							<td>No</td>
						</tr>
						<tr>
							<td>MCP Support</td>
							<td>Yes</td>
							<td>Yes</td>
						</tr>
						<tr>
							<td>Local Models</td>
							<td>Yes (Ollama)</td>
							<td>Limited</td>
						</tr>
					</tbody>
				</table>
			</div>

			<p>
				<strong>Key insight:</strong> Cline lacks autocomplete - its strength is agentic tasks where you describe what you want and it plans and executes (with your approval). Cursor excels at both quick autocomplete and longer multi-file edits.
			</p>
		</section>

		<!-- Pricing Comparison -->
		<section>
			<h2>Pricing: Free vs $20/Month</h2>
			<p>
				Cline is free but you pay for API usage. Cursor is $20/month with usage included. The true cost comparison depends on your usage patterns:
			</p>

			<div class="comparison-table-wrapper">
				<table class="comparison-table">
					<thead>
						<tr>
							<th>Cost Type</th>
							<th>Cline</th>
							<th>Cursor</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Subscription</td>
							<td class="secure">$0</td>
							<td>$20/month</td>
						</tr>
						<tr>
							<td>API Costs</td>
							<td>Variable (~$10-50/mo typical)</td>
							<td>Included</td>
						</tr>
						<tr>
							<td>Local Models</td>
							<td class="secure">$0 (Ollama)</td>
							<td>N/A</td>
						</tr>
						<tr>
							<td>Predictability</td>
							<td>Variable</td>
							<td>Fixed</td>
						</tr>
					</tbody>
				</table>
			</div>

			<p>
				<strong>Break-even analysis:</strong> If you spend less than $20/month on API calls, Cline is cheaper. Heavy users may exceed $20/month, making Cursor's fixed pricing more economical. With local models via Ollama, Cline can be truly free (at the cost of some model quality).
			</p>
		</section>

		<!-- Security Comparison -->
		<section>
			<h2>Security Comparison</h2>
			<p>
				Cline and Cursor have fundamentally different security models. Per the <a href="https://owasp.org/www-project-top-10-for-large-language-model-applications/" target="_blank" rel="noopener">OWASP Top 10 for LLM Applications</a>, understanding these differences is critical.
			</p>

			<div class="security-comparison">
				<div class="security-card cline-card">
					<h3>Cline Security</h3>
					<div class="cve-status secure">
						No Known CVEs
					</div>
					<h4>Strengths</h4>
					<ul>
						<li>Human-in-the-loop: Every action requires approval</li>
						<li>Open source: Community can audit for vulnerabilities</li>
						<li>No proprietary telemetry by default</li>
						<li>BYOK: Your API keys, your data policies</li>
						<li>Self-hosted option for enterprises</li>
					</ul>
					<h4>Considerations</h4>
					<ul>
						<li>API keys stored in VS Code settings</li>
						<li>Community-maintained (slower patches)</li>
						<li>No dedicated security team</li>
					</ul>
				</div>

				<div class="security-card cursor-card">
					<h3>Cursor Security</h3>
					<div class="cve-status vulnerable">
						<a href="https://nvd.nist.gov/vuln/detail/CVE-2025-62352" target="_blank" rel="noopener">CVE-2025-62352</a> (Path Traversal)
					</div>
					<h4>Strengths</h4>
					<ul>
						<li>Dedicated security team</li>
						<li>Commercial liability/accountability</li>
						<li>Faster patch deployment</li>
						<li>Privacy mode available</li>
					</ul>
					<h4>Considerations</h4>
					<ul>
						<li>Closed source (cannot audit)</li>
						<li>Telemetry collection</li>
						<li>Auto-apply executes without review</li>
					</ul>
				</div>
			</div>

			<div class="comparison-table-wrapper">
				<table class="comparison-table">
					<thead>
						<tr>
							<th>Risk Factor</th>
							<th>Cline</th>
							<th>Cursor</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>CVE History</td>
							<td class="secure">0 known</td>
							<td class="vulnerable">1 known</td>
						</tr>
						<tr>
							<td>Auditability</td>
							<td class="secure">Full (open source)</td>
							<td>None (closed)</td>
						</tr>
						<tr>
							<td>Review Before Execute</td>
							<td class="secure">Mandatory</td>
							<td>Optional</td>
						</tr>
						<tr>
							<td>API Key Risk</td>
							<td>User managed</td>
							<td>Platform managed</td>
						</tr>
						<tr>
							<td>Telemetry</td>
							<td class="secure">None default</td>
							<td>Yes</td>
						</tr>
					</tbody>
				</table>
			</div>

			<p>
				<strong>Bottom line:</strong> Cline's human-in-the-loop approval is a genuine security feature - malicious code cannot execute without your explicit consent. However, open source does not automatically mean "safer" - it means "auditable." Use <a href="/kb/vibe-coding/secure-vibe-coding-guide/">security best practices</a> with either tool.
			</p>
		</section>

		<!-- When to Choose Cline -->
		<section>
			<h2>When to Choose Cline</h2>
			<p>
				Cline is the better choice when you need:
			</p>
			<ul>
				<li><strong>Control:</strong> Approve every file edit, command, and action</li>
				<li><strong>Auditability:</strong> Open source code you can inspect</li>
				<li><strong>Budget flexibility:</strong> Pay per use rather than fixed subscription</li>
				<li><strong>Model choice:</strong> Use any API or local models via Ollama</li>
				<li><strong>Privacy:</strong> Local models mean code never leaves your machine</li>
				<li><strong>No telemetry:</strong> Zero data collection by default</li>
			</ul>
			<p>
				<strong>Ideal user:</strong> Security-conscious developers who want full control over AI actions and prefer open-source tools.
			</p>
		</section>

		<!-- When to Choose Cursor -->
		<section>
			<h2>When to Choose Cursor</h2>
			<p>
				Cursor is the better choice when you need:
			</p>
			<ul>
				<li><strong>Speed:</strong> Auto-apply changes without approval friction</li>
				<li><strong>Autocomplete:</strong> Tab completions while you type</li>
				<li><strong>Polish:</strong> Purpose-built IDE with refined UX</li>
				<li><strong>Predictable costs:</strong> Fixed $20/month regardless of usage</li>
				<li><strong>Support:</strong> Commercial backing and faster updates</li>
				<li><strong>Simplicity:</strong> Everything works out of the box</li>
			</ul>
			<p>
				<strong>Ideal user:</strong> Developers who want the fastest AI-assisted workflow without managing API keys or approving individual actions.
			</p>
		</section>

		<!-- Can You Use Both -->
		<section>
			<h2>Can you use both?</h2>
			<p>
				Yes, since Cline is a VS Code extension, you can use it alongside other AI tools:
			</p>
			<ul>
				<li><strong>Cline for high-risk operations:</strong> When you want approval before execution</li>
				<li><strong>Cursor for rapid development:</strong> When speed matters more than review</li>
				<li><strong>Cline with local models:</strong> For sensitive codebases that cannot touch external APIs</li>
			</ul>
			<p>
				Some developers use Cline for initial prototyping (to see exactly what the AI is doing) then switch to Cursor for faster iteration once the patterns are established.
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
				<a href="/kb/vibe-coding-tools/cursor/" class="related-card">
					<span class="related-type">Tool Guide</span>
					<span class="related-title">Cursor Security Patterns</span>
				</a>
				<a href="/kb/vibe-coding-tools/cursor-vs-copilot/" class="related-card">
					<span class="related-type">Comparison</span>
					<span class="related-title">Cursor vs GitHub Copilot</span>
				</a>
				<a href="/kb/vibe-coding-tools/claude-code-vs-cursor/" class="related-card">
					<span class="related-type">Comparison</span>
					<span class="related-title">Claude Code vs Cursor</span>
				</a>
				<a href="/kb/vibe-coding-tools/windsurf-vs-cursor/" class="related-card">
					<span class="related-type">Comparison</span>
					<span class="related-title">Windsurf vs Cursor</span>
				</a>
				<a href="/kb/vibe-coding-tools/" class="related-card">
					<span class="related-type">Hub</span>
					<span class="related-title">All Vibe Coding Tools</span>
				</a>
				<a href="/kb/vibe-coding/secure-vibe-coding-guide/" class="related-card">
					<span class="related-type">Pillar Guide</span>
					<span class="related-title">The Complete Secure Vibe Coding Guide</span>
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
		color: #22c55e;
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

	.security-card.cline-card {
		border: 1px solid rgba(34, 197, 94, 0.3);
	}

	.security-card.cursor-card {
		border: 1px solid rgba(59, 130, 246, 0.3);
	}

	.security-card h3 {
		margin-top: 0;
		margin-bottom: 0.75rem;
	}

	.security-card.cline-card h3 {
		color: #22c55e;
	}

	.security-card.cursor-card h3 {
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
