<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Cursor vs GitHub Copilot 2025: Complete Comparison',
		description: 'Cursor vs GitHub Copilot: features, pricing ($20 vs $10), and security compared. See CVEs, code safety, and which AI coding tool fits your workflow.',
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
			answer: 'It depends on your workflow. Cursor offers more powerful multi-file editing via Composer and works as a standalone IDE. Copilot is cheaper ($10 vs $20), works in any IDE, and has deeper GitHub integration. Cursor has CVE-2025-62352; Copilot has training data concerns. Choose Cursor for AI-first development, Copilot for IDE flexibility.'
		},
		{
			question: 'Can I use Cursor and Copilot together?',
			answer: 'Yes, many developers use both. Use Copilot in JetBrains IDEs or Visual Studio, and Cursor for VS Code-based projects. They serve complementary purposes - Copilot for quick autocomplete across IDEs, Cursor for deeper AI-assisted editing in one environment.'
		},
		{
			question: 'Is GitHub Copilot worth it over Cursor?',
			answer: 'Copilot is worth it if you need IDE flexibility (works in VS Code, JetBrains, Neovim, Visual Studio), use GitHub extensively (PR reviews, Issues integration), or want to save $10/month. Cursor is worth it if you want more powerful multi-file editing and an AI-first IDE experience.'
		},
		{
			question: 'Which is safer, Cursor or Copilot?',
			answer: 'Cursor has one published CVE (CVE-2025-62352, path traversal). Copilot has no published CVEs but has training data concerns - it was trained on public GitHub repos and can reproduce code verbatim. Both can generate insecure code patterns. Copilot has stronger enterprise compliance (SOC 2, GDPR).'
		},
		{
			question: 'Does Cursor use GitHub Copilot?',
			answer: 'No. Cursor uses its own AI integration with models like GPT-4 and Claude. It is a separate product from GitHub Copilot. However, you can technically install the Copilot extension in Cursor since it is a VS Code fork, though this is not officially supported.'
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
	<article class="content-main">
		<!-- Header -->
		<header class="article-header">
			<div class="badge-row">
				<span class="badge badge-comparison">Comparison</span>
				<span class="badge">2025</span>
			</div>
			<h1>Cursor vs GitHub Copilot: Complete Comparison Guide</h1>
			<p class="subtitle">Features, pricing, and security compared for vibe coders</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Cursor</strong> is a standalone AI IDE at $20/mo with powerful multi-file editing.
				<strong>GitHub Copilot</strong> is a $10/mo extension that works in any IDE with deep GitHub integration.
				Cursor has <a href="https://nvd.nist.gov/vuln/detail/CVE-2025-62352" target="_blank" rel="noopener">CVE-2025-62352</a>; Copilot has training data concerns.
				Choose based on whether you want IDE flexibility or AI-first workflows.
			</p>
		</div>

		<!-- Quick Comparison Table -->
		<section>
			<h2>Cursor vs Copilot: Quick Comparison</h2>
			<p>
				These are the two most popular AI coding assistants, but they take fundamentally different approaches. Cursor is a complete IDE built around AI. Copilot is an extension that adds AI to your existing IDE. Both are excellent tools for vibe coding.
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
							<td>Extension/Plugin</td>
						</tr>
						<tr>
							<td>Models</td>
							<td>GPT-4, Claude (configurable)</td>
							<td>GPT-4, Codex</td>
						</tr>
						<tr>
							<td>Pro Pricing</td>
							<td>$20/mo</td>
							<td>$10/mo</td>
						</tr>
						<tr>
							<td>Free Tier</td>
							<td>2000 completions, 50 slow requests</td>
							<td>Students & OSS maintainers only</td>
						</tr>
						<tr>
							<td>IDE Support</td>
							<td>Cursor only</td>
							<td>VS Code, JetBrains, Neovim, Visual Studio</td>
						</tr>
						<tr>
							<td>Known CVEs</td>
							<td class="vulnerable">CVE-2025-62352</td>
							<td class="secure">None published</td>
						</tr>
						<tr>
							<td>Best For</td>
							<td>AI-first workflows</td>
							<td>IDE flexibility, GitHub users</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- What Is Cursor -->
		<section>
			<h2>What is Cursor?</h2>
			<p>
				<a href="/kb/vibe-coding-tools/cursor/">Cursor</a> is a VS Code fork with AI built into every aspect of the editor. It is developed by Anysphere and designed specifically for AI-assisted development.
			</p>
			<p>
				Key features that define Cursor:
			</p>
			<ul>
				<li><strong>Tab autocomplete:</strong> Fast, context-aware code suggestions</li>
				<li><strong>Composer:</strong> Multi-file editing through natural language</li>
				<li><strong>Cmd+K:</strong> Inline code editing with AI</li>
				<li><strong>Model flexibility:</strong> Switch between GPT-4, Claude, or custom models</li>
				<li><strong>Codebase indexing:</strong> AI understands your entire project</li>
				<li><strong>.cursorrules:</strong> Custom instructions for consistent behavior</li>
			</ul>
			<p>
				Cursor is ideal for vibe coders who want the most powerful AI integration possible and are willing to commit to a single IDE.
			</p>
		</section>

		<!-- What Is Copilot -->
		<section>
			<h2>What is GitHub Copilot?</h2>
			<p>
				<a href="/kb/vibe-coding-tools/github-copilot/">GitHub Copilot</a> is an AI coding assistant from GitHub and Microsoft that works as an extension in multiple IDEs. It has the largest user base of any AI coding tool.
			</p>
			<p>
				Key features that make Copilot popular:
			</p>
			<ul>
				<li><strong>Inline suggestions:</strong> Code completions as you type</li>
				<li><strong>Copilot Chat:</strong> Conversational AI assistance</li>
				<li><strong>Multi-IDE support:</strong> VS Code, JetBrains, Neovim, Visual Studio</li>
				<li><strong>GitHub integration:</strong> PR reviews, issue summaries, code explanations</li>
				<li><strong>Copilot CLI:</strong> Command-line assistance</li>
				<li><strong>Enterprise features:</strong> SOC 2, organization policies, audit logs</li>
			</ul>
			<p>
				Copilot is ideal for vibe coders who use multiple IDEs, work heavily with GitHub, or need enterprise compliance features.
			</p>
		</section>

		<!-- Feature Comparison -->
		<section>
			<h2>Feature Comparison</h2>
			<p>
				Here's how Cursor and GitHub Copilot compare across key features for vibe coding:
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
							<td>Sidebar + inline</td>
							<td>Copilot Chat</td>
						</tr>
						<tr>
							<td>Multi-file Editing</td>
							<td>Yes (Composer)</td>
							<td>Limited</td>
						</tr>
						<tr>
							<td>Codebase Context</td>
							<td>Full indexing</td>
							<td>Workspace indexing</td>
						</tr>
						<tr>
							<td>Terminal Integration</td>
							<td>Yes</td>
							<td>Yes (Copilot CLI)</td>
						</tr>
						<tr>
							<td>PR Reviews</td>
							<td>No</td>
							<td>Yes (Copilot for PRs)</td>
						</tr>
						<tr>
							<td>Rules Files</td>
							<td>.cursorrules</td>
							<td>Limited</td>
						</tr>
						<tr>
							<td>Model Choice</td>
							<td>GPT-4, Claude, custom</td>
							<td>GPT-4, Codex only</td>
						</tr>
						<tr>
							<td>Privacy Mode</td>
							<td>Yes</td>
							<td>Business/Enterprise only</td>
						</tr>
					</tbody>
				</table>
			</div>

			<p>
				<strong>Key insight:</strong> Cursor excels at multi-file editing with Composer - you can describe changes across many files and it handles them together. Copilot is better for quick inline completions and GitHub-specific workflows like PR reviews.
			</p>
		</section>

		<!-- Pricing Comparison -->
		<section>
			<h2>Pricing Comparison</h2>
			<p>
				GitHub Copilot is significantly cheaper at half the price, but Cursor offers a more generous free tier for trial:
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
							<td>2000 completions, 50 slow requests</td>
							<td>Students & OSS only</td>
						</tr>
						<tr>
							<td>Individual/Pro</td>
							<td>$20/month</td>
							<td>$10/month</td>
						</tr>
						<tr>
							<td>Business/Team</td>
							<td>$40/user/month</td>
							<td>$19/user/month</td>
						</tr>
						<tr>
							<td>Enterprise</td>
							<td>Custom pricing</td>
							<td>$39/user/month</td>
						</tr>
					</tbody>
				</table>
			</div>

			<p>
				<strong>Bottom line:</strong> Copilot saves you $120/year at the individual tier. If budget matters and you do not need Cursor's advanced multi-file features, Copilot offers excellent value.
			</p>
		</section>

		<!-- Security Comparison -->
		<section>
			<h2>Security Comparison: Which Is Safer?</h2>
			<p>
				Both tools have security considerations, though of different types. Per the <a href="https://owasp.org/www-project-top-10-for-large-language-model-applications/" target="_blank" rel="noopener">OWASP Top 10 for LLM Applications</a>, all AI coding tools require security review.
			</p>

			<div class="security-comparison">
				<div class="security-card cursor-card">
					<h3>Cursor Security</h3>
					<div class="cve-status vulnerable">
						<a href="https://nvd.nist.gov/vuln/detail/CVE-2025-62352" target="_blank" rel="noopener">CVE-2025-62352</a> (Path Traversal)
					</div>
					<h4>The Vulnerability</h4>
					<p>Path traversal affecting file operations. Can access files outside project directory.</p>
					<h4>Considerations</h4>
					<ul>
						<li>Closed source - cannot audit code</li>
						<li>Autocomplete can expose secrets</li>
						<li>Template literal SQL patterns common</li>
						<li>Privacy mode available</li>
					</ul>
				</div>

				<div class="security-card copilot-card">
					<h3>GitHub Copilot Security</h3>
					<div class="cve-status secure">
						No Published CVEs
					</div>
					<h4>Training Data Concerns</h4>
					<p>Trained on public GitHub repos. <a href="https://www.theregister.com/2022/10/19/github_copilot_copyright/" target="_blank" rel="noopener">Can reproduce code verbatim</a>, raising license concerns.</p>
					<h4>Considerations</h4>
					<ul>
						<li>May suggest hardcoded secrets from training data</li>
						<li>Potential license violations (GPL code reproduction)</li>
						<li>Microsoft telemetry collection</li>
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
							<td class="vulnerable">1 known</td>
							<td class="secure">0 published</td>
						</tr>
						<tr>
							<td>Training Transparency</td>
							<td>Higher (uses external models)</td>
							<td>Lower (proprietary training)</td>
						</tr>
						<tr>
							<td>Privacy Concerns</td>
							<td>Lower</td>
							<td>Higher (Microsoft telemetry)</td>
						</tr>
						<tr>
							<td>Enterprise Compliance</td>
							<td>Limited</td>
							<td>Extensive (SOC 2, GDPR)</td>
						</tr>
						<tr>
							<td>Code Safety</td>
							<td>Similar</td>
							<td>Similar</td>
						</tr>
					</tbody>
				</table>
			</div>

			<p>
				<strong>Bottom line:</strong> Cursor has a known CVE; Copilot has training data controversies. Both can generate insecure code. For enterprise compliance, Copilot is stronger. For privacy, Cursor with privacy mode enabled may be preferable. Always review AI-generated code with a <a href="/kb/vibe-coding/secure-vibe-coding-guide/">security checklist</a>.
			</p>
		</section>

		<!-- When to Choose Cursor -->
		<section>
			<h2>When to Choose Cursor</h2>
			<p>
				Cursor is the better choice when you need:
			</p>
			<ul>
				<li><strong>Multi-file editing:</strong> Composer handles complex changes across many files</li>
				<li><strong>AI-first workflow:</strong> Every feature is designed around AI</li>
				<li><strong>Model flexibility:</strong> Switch between GPT-4, Claude, or custom models</li>
				<li><strong>Custom instructions:</strong> .cursorrules for consistent AI behavior</li>
				<li><strong>Free trial:</strong> More generous free tier than Copilot</li>
			</ul>
			<p>
				<strong>Ideal user:</strong> Developers who want the most powerful AI-assisted editing and are willing to commit to a single IDE.
			</p>
		</section>

		<!-- When to Choose Copilot -->
		<section>
			<h2>When to Choose GitHub Copilot</h2>
			<p>
				GitHub Copilot is the better choice when you need:
			</p>
			<ul>
				<li><strong>IDE flexibility:</strong> Use your preferred editor (JetBrains, Neovim, etc.)</li>
				<li><strong>GitHub integration:</strong> PR reviews, issue summaries, Actions help</li>
				<li><strong>Budget-conscious:</strong> $10/mo vs $20/mo ($120/year savings)</li>
				<li><strong>Enterprise compliance:</strong> SOC 2, GDPR, organization policies</li>
				<li><strong>Team adoption:</strong> Lower per-seat cost for organizations</li>
			</ul>
			<p>
				<strong>Ideal user:</strong> Developers who work in multiple IDEs, use GitHub extensively, or need enterprise-grade compliance features.
			</p>
		</section>

		<!-- Can You Use Both -->
		<section>
			<h2>Can you use both?</h2>
			<p>
				Yes, many developers use both tools for different workflows:
			</p>
			<ul>
				<li><strong>Copilot in JetBrains:</strong> When working on Java, Kotlin, or Python projects</li>
				<li><strong>Cursor for VS Code projects:</strong> When you want deeper AI integration</li>
				<li><strong>Copilot CLI:</strong> For terminal assistance regardless of IDE</li>
			</ul>
			<p>
				The tools are complementary rather than exclusive. Use Copilot for its breadth across IDEs and GitHub features; use Cursor for its depth of AI integration in one environment.
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
				<a href="/kb/vibe-coding-tools/github-copilot/" class="related-card">
					<span class="related-type">Tool Guide</span>
					<span class="related-title">GitHub Copilot Security</span>
				</a>
				<a href="/kb/vibe-coding-tools/claude-code-vs-cursor/" class="related-card">
					<span class="related-type">Comparison</span>
					<span class="related-title">Claude Code vs Cursor</span>
				</a>
				<a href="/kb/vibe-coding-tools/windsurf-vs-cursor/" class="related-card">
					<span class="related-type">Comparison</span>
					<span class="related-title">Windsurf vs Cursor</span>
				</a>
				<a href="/kb/vibe-coding-tools/cline-vs-cursor/" class="related-card">
					<span class="related-type">Comparison</span>
					<span class="related-title">Cline vs Cursor</span>
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
		color: #3b82f6;
	}

	.comparison-table th:nth-child(3) {
		color: #f97316;
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

	.security-card.cursor-card {
		border: 1px solid rgba(59, 130, 246, 0.3);
	}

	.security-card.copilot-card {
		border: 1px solid rgba(249, 115, 22, 0.3);
	}

	.security-card h3 {
		margin-top: 0;
		margin-bottom: 0.75rem;
	}

	.security-card.cursor-card h3 {
		color: #3b82f6;
	}

	.security-card.copilot-card h3 {
		color: #f97316;
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
