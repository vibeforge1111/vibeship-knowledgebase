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

	// Comparison data
	const comparisonData = [
		{ attr: 'Type', cline: 'VS Code Extension', cursor: 'Standalone IDE (VS Code fork)' },
		{ attr: 'Pricing', cline: 'Free (BYOK)', cursor: '$20/mo Pro' },
		{ attr: 'Open Source', cline: 'Yes (Apache 2.0)', cursor: 'No', clineHighlight: true },
		{ attr: 'Models', cline: 'Any (Claude, GPT-4, Ollama)', cursor: 'GPT-4, Claude (built-in)' },
		{ attr: 'Human-in-the-loop', cline: 'Yes (every action)', cursor: 'No (auto-apply)', clineHighlight: true },
		{ attr: 'Autocomplete', cline: 'No', cursor: 'Yes (Tab)', cursorHighlight: true },
		{ attr: 'Known CVEs', cline: 'None', cursor: 'CVE-2025-62352', clineHighlight: true },
		{ attr: 'Best For', cline: 'Control, auditability', cursor: 'Speed, polish' }
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

		<!-- Quick Comparison -->
		<section>
			<h2>Cline vs Cursor: Quick Comparison</h2>
			<p>
				Two different philosophies in AI-assisted development. Cline prioritizes developer control with approval workflows. Cursor prioritizes speed with automatic execution. Both are excellent tools for vibe coding with different tradeoffs.
			</p>

			<div class="comparison-cards">
				{#each comparisonData as row}
					<div class="comparison-row">
						<div class="comparison-attr">{row.attr}</div>
						<div class="comparison-values">
							<div class="comparison-tool" class:highlight={row.clineHighlight}>
								<span class="tool-label">Cline</span>
								<span class="tool-value">{row.cline}</span>
							</div>
							<div class="comparison-tool" class:highlight={row.cursorHighlight}>
								<span class="tool-label">Cursor</span>
								<span class="tool-value">{row.cursor}</span>
							</div>
						</div>
					</div>
				{/each}
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

		<!-- Security Comparison -->
		<section>
			<h2>Security Comparison</h2>
			<p>
				Cline and Cursor have fundamentally different security models. Per the <a href="https://owasp.org/www-project-top-10-for-large-language-model-applications/" target="_blank" rel="noopener">OWASP Top 10 for LLM Applications</a>, understanding these differences is critical.
			</p>

			<div class="security-comparison">
				<div class="security-card">
					<h3>Cline Security</h3>
					<div class="cve-status secure">No Known CVEs</div>
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

				<div class="security-card">
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

			<p>
				<strong>Bottom line:</strong> Cline's human-in-the-loop approval is a genuine security feature - malicious code cannot execute without your explicit consent. However, open source does not automatically mean "safer" - it means "auditable." Use <a href="/kb/vibe-coding/secure-vibe-coding-guide/">security best practices</a> with either tool.
			</p>
		</section>

		<!-- Pricing Comparison -->
		<section>
			<h2>Pricing: Free vs $20/Month</h2>
			<p>
				Cline is free but you pay for API usage. Cursor is $20/month with usage included. The true cost comparison depends on your usage patterns.
			</p>

			<div class="pricing-comparison">
				<div class="price-card">
					<h3>Cline</h3>
					<ul>
						<li><strong>Extension:</strong> Free (open source)</li>
						<li><strong>API Costs:</strong> $10-50/mo typical</li>
						<li><strong>Local Models:</strong> $0 (Ollama)</li>
					</ul>
					<p class="price-note">Cost varies with usage. Heavy users may exceed $20/mo.</p>
				</div>

				<div class="price-card">
					<h3>Cursor</h3>
					<ul>
						<li><strong>Free:</strong> 2000 completions</li>
						<li><strong>Pro:</strong> $20/month</li>
						<li><strong>Business:</strong> $40/user/month</li>
					</ul>
					<p class="price-note">Predictable monthly cost. All features included.</p>
				</div>
			</div>

			<p>
				<strong>Break-even analysis:</strong> If you spend less than $20/month on API calls, Cline is cheaper. With local models via Ollama, Cline can be truly free (at the cost of some model quality).
			</p>
		</section>

		<!-- When to Choose -->
		<section>
			<h2>When to Choose Cline</h2>
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

		<section>
			<h2>When to Choose Cursor</h2>
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
				<a href="/kb/vibe-coding-tools/cursor/" class="card card-interactive">
					<span class="related-card-category">Tool Guide</span>
					<h3 class="related-card-title">Cursor Security Patterns</h3>
				</a>
				<a href="/kb/vibe-coding-tools/cursor-vs-copilot/" class="card card-interactive">
					<span class="related-card-category">Comparison</span>
					<h3 class="related-card-title">Cursor vs GitHub Copilot</h3>
				</a>
				<a href="/kb/vibe-coding-tools/claude-code-vs-cursor/" class="card card-interactive">
					<span class="related-card-category">Comparison</span>
					<h3 class="related-card-title">Claude Code vs Cursor</h3>
				</a>
				<a href="/kb/vibe-coding-tools/windsurf-vs-cursor/" class="card card-interactive">
					<span class="related-card-category">Comparison</span>
					<h3 class="related-card-title">Windsurf vs Cursor</h3>
				</a>
				<a href="/kb/vibe-coding-tools/" class="card card-interactive">
					<span class="related-card-category">Hub</span>
					<h3 class="related-card-title">All Vibe Coding Tools</h3>
				</a>
				<a href="/kb/vibe-coding/secure-vibe-coding-guide/" class="card card-interactive">
					<span class="related-card-category">Pillar Guide</span>
					<h3 class="related-card-title">The Complete Secure Vibe Coding Guide</h3>
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

	/* Comparison Cards */
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
		padding: 0.5rem;
		background: var(--bg-tertiary);
	}

	.comparison-tool.highlight {
		border-left: 2px solid var(--green-muted);
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

	/* Security Comparison */
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

	.security-card h3 {
		margin-top: 0;
		margin-bottom: 0.75rem;
		color: var(--text-primary);
	}

	.security-card h4 {
		font-size: 0.85rem;
		margin-bottom: 0.5rem;
		margin-top: 1rem;
		color: var(--text-secondary);
	}

	.security-card ul {
		margin-bottom: 0.5rem;
		padding-left: 1.25rem;
	}

	.security-card li {
		margin-bottom: 0.25rem;
		font-size: 0.875rem;
	}

	.cve-status {
		display: inline-block;
		padding: 0.25rem 0.75rem;
		font-size: 0.8rem;
		font-weight: 600;
		margin-bottom: 1rem;
	}

	.cve-status.secure {
		background: var(--bg-tertiary);
		color: var(--green-muted);
		border: 1px solid var(--green-muted);
	}

	.cve-status.vulnerable {
		background: var(--bg-tertiary);
		color: var(--orange);
		border: 1px solid var(--orange);
	}

	.cve-status a {
		color: inherit;
	}

	/* Pricing Comparison */
	.pricing-comparison {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		margin: 1.5rem 0;
	}

	@media (max-width: 768px) {
		.pricing-comparison {
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

	/* Related Cards */
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
