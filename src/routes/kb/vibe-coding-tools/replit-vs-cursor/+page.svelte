<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Replit vs Cursor: Cloud vs Desktop IDE Compared',
		description: 'Replit vs Cursor: cloud IDE ($25/mo) vs desktop AI IDE ($20/mo). Compare features, where your code lives, security implications. Complete 2025 comparison.',
		url: '/kb/vibe-coding-tools/replit-vs-cursor/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Vibe Coding Tools', href: '/kb/vibe-coding-tools' },
		{ label: 'Replit vs Cursor' }
	];

	// FAQ data
	const faqs = [
		{
			question: 'Is Replit better than Cursor?',
			answer: 'Replit is better for beginners, quick prototypes, and instant deployment. Cursor is better for professional development, complex projects, and privacy-conscious work. Replit runs in the browser with your code on their servers; Cursor runs locally with code on your machine. Choose based on convenience vs control.'
		},
		{
			question: 'Is Replit good for professional development?',
			answer: 'Replit can work for professional development, especially for small teams and rapid prototyping. However, enterprise teams often prefer local development (Cursor) for data residency requirements, complex debugging, and integration with existing toolchains. Replit lacks offline capability and some advanced IDE features.'
		},
		{
			question: 'Can I use Cursor online?',
			answer: 'No, Cursor is a desktop application that runs locally on Windows, Mac, or Linux. It cannot run in a browser. For browser-based AI coding, consider Replit, Bolt.new, or GitHub Codespaces. Cursor\'s local architecture means your code stays on your machine.'
		},
		{
			question: 'Is my code safe on Replit?',
			answer: 'Your code on Replit lives on their servers and is subject to their data policies. Public repls are visible to everyone. Private repls require a paid plan. Replit has SOC 2 compliance for enterprise needs. For maximum code privacy, local tools like Cursor keep code entirely on your machine.'
		},
		{
			question: 'Which is better for beginners, Replit or Cursor?',
			answer: 'Replit is better for beginners. It works in any browser with no installation, includes built-in deployment, and has a more forgiving learning curve. Cursor requires local setup and deployment knowledge. Replit\'s collaborative features also help beginners learn from others.'
		}
	];

	// Comparison data
	const comparisonData = [
		{ attr: 'Type', replit: 'Cloud IDE (browser)', cursor: 'Desktop IDE' },
		{ attr: 'Code Location', replit: 'Replit servers', cursor: 'Your machine', cursorHighlight: true },
		{ attr: 'Pro Pricing', replit: '$25/mo (Core)', cursor: '$20/mo' },
		{ attr: 'Free Tier', replit: 'Generous (public repos)', cursor: 'Limited (2000 completions)' },
		{ attr: 'Instant Deploy', replit: 'Yes (1-click)', cursor: 'No (external hosting)', replitHighlight: true },
		{ attr: 'Offline Work', replit: 'No', cursor: 'Yes', cursorHighlight: true },
		{ attr: 'Known CVEs', replit: 'Platform-level', cursor: 'CVE-2025-62352' },
		{ attr: 'Best For', replit: 'Beginners, prototypes', cursor: 'Professional development' }
	];

	// Paradigm comparison
	const paradigmData = {
		replit: [
			{ label: 'Code storage', value: 'Replit\'s servers' },
			{ label: 'Execution', value: 'Replit\'s containers' },
			{ label: 'Deployment', value: 'One click to .replit.app' },
			{ label: 'Collaboration', value: 'Real-time multiplayer' },
			{ label: 'Access', value: 'Any browser, anywhere' },
			{ label: 'Offline', value: 'Not available' }
		],
		cursor: [
			{ label: 'Code storage', value: 'Your machine' },
			{ label: 'Execution', value: 'Your machine' },
			{ label: 'Deployment', value: 'You manage (Vercel, AWS, etc.)' },
			{ label: 'Collaboration', value: 'Git-based' },
			{ label: 'Access', value: 'Your computer only' },
			{ label: 'Offline', value: 'Full editing capability' }
		]
	};
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
			{"@type": "ListItem", "position": 3, "name": "Replit vs Cursor"}
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
			<h1>Replit vs Cursor: Cloud IDE vs Desktop AI Coding</h1>
			<p class="subtitle">Browser-based convenience vs local control for vibe coders</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Replit</strong> is a cloud IDE with instant deployment at $25/mo.
				<strong>Cursor</strong> is a desktop IDE with powerful AI at $20/mo.
				Replit stores your code on their servers; Cursor keeps it local.
				Cursor has <a href="https://nvd.nist.gov/vuln/detail/CVE-2025-62352" target="_blank" rel="noopener">CVE-2025-62352</a>.
				Choose Replit for convenience; Cursor for control and privacy.
			</p>
		</div>

		<!-- Quick Comparison -->
		<section>
			<h2>Replit vs Cursor: Quick Comparison</h2>
			<p>
				This is not just "which AI is better" - it is a comparison of fundamentally different development paradigms. Replit runs everything in the browser with instant deployment. Cursor runs locally with your files on your machine. Both are excellent tools for vibe coding with different tradeoffs.
			</p>

			<div class="comparison-cards">
				{#each comparisonData as row}
					<div class="comparison-row">
						<div class="comparison-attr">{row.attr}</div>
						<div class="comparison-values">
							<div class="comparison-tool" class:highlight={row.replitHighlight}>
								<span class="tool-label">Replit</span>
								<span class="tool-value">{row.replit}</span>
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

		<!-- What Is Replit -->
		<section>
			<h2>What is Replit?</h2>
			<p>
				<a href="/kb/vibe-coding-tools/replit/">Replit</a> is a cloud-based development environment that runs entirely in your browser. It includes AI assistance (Ghostwriter), instant deployment, and collaborative features - all without installing anything.
			</p>
			<p>
				Key features that define Replit:
			</p>
			<ul>
				<li><strong>Browser-based:</strong> Works on any device with a web browser</li>
				<li><strong>Replit AI / Ghostwriter:</strong> Code completion and chat assistance</li>
				<li><strong>Instant deployment:</strong> One-click deploy to a .replit.app URL</li>
				<li><strong>Multiplayer:</strong> Real-time collaborative coding</li>
				<li><strong>Built-in database:</strong> Replit DB for simple persistence</li>
				<li><strong>Secrets management:</strong> Built-in environment variable handling</li>
				<li><strong>Mobile coding:</strong> Full IDE on phone or tablet</li>
			</ul>
			<p>
				Replit is ideal for vibe coders who want the fastest path from idea to deployed app with zero setup friction.
			</p>
		</section>

		<!-- What Is Cursor -->
		<section>
			<h2>What is Cursor?</h2>
			<p>
				<a href="/kb/vibe-coding-tools/cursor/">Cursor</a> is a VS Code fork with AI built into every aspect of the editor. It runs as a desktop application with your code stored locally on your machine.
			</p>
			<p>
				Key features that make Cursor popular:
			</p>
			<ul>
				<li><strong>Tab autocomplete:</strong> Fast, context-aware code suggestions</li>
				<li><strong>Composer:</strong> Multi-file editing through natural language</li>
				<li><strong>Local files:</strong> Your code stays on your machine</li>
				<li><strong>Offline capable:</strong> Works without internet (basic editing)</li>
				<li><strong>Model flexibility:</strong> GPT-4, Claude, or custom models</li>
				<li><strong>VS Code compatibility:</strong> All extensions work</li>
				<li><strong>Codebase indexing:</strong> AI understands your entire project</li>
			</ul>
			<p>
				Cursor is ideal for vibe coders who need professional-grade tools, want local control over their code, or work on complex projects.
			</p>
		</section>

		<!-- Cloud vs Desktop -->
		<section>
			<h2>Cloud vs Desktop: The Fundamental Difference</h2>
			<p>
				This is the key distinction that should drive your choice. Where does your code live?
			</p>

			<div class="paradigm-comparison">
				<div class="paradigm-card">
					<h3>Replit: Cloud Paradigm</h3>
					<ul>
						{#each paradigmData.replit as item}
							<li><strong>{item.label}:</strong> {item.value}</li>
						{/each}
					</ul>
				</div>

				<div class="paradigm-card">
					<h3>Cursor: Local Paradigm</h3>
					<ul>
						{#each paradigmData.cursor as item}
							<li><strong>{item.label}:</strong> {item.value}</li>
						{/each}
					</ul>
				</div>
			</div>

			<p>
				<strong>Key insight:</strong> Replit trades control for convenience. You get instant deployment and collaboration but give up data residency and offline access. Cursor trades convenience for control - more setup required, but you own your workflow entirely.
			</p>
		</section>

		<!-- Security Comparison -->
		<section>
			<h2>Security Comparison</h2>
			<p>
				The cloud vs local paradigm creates fundamentally different security models. Per the <a href="https://owasp.org/www-project-top-10-for-large-language-model-applications/" target="_blank" rel="noopener">OWASP Top 10 for LLM Applications</a>, understanding where your code and data reside is critical.
			</p>

			<div class="security-comparison">
				<div class="security-card">
					<h3>Replit Security</h3>
					<div class="cve-status neutral">Platform-Level CVEs</div>
					<h4>Cloud Security Model</h4>
					<p>Your code lives on Replit's servers. You trust their security posture.</p>
					<h4>Strengths</h4>
					<ul>
						<li>Built-in secrets management</li>
						<li>No local environment to compromise</li>
						<li>SOC 2 compliance available</li>
						<li>Regular platform security updates</li>
					</ul>
					<h4>Considerations</h4>
					<ul>
						<li>Code not under your physical control</li>
						<li>Dependent on Replit's security posture</li>
						<li>Free tier = public code by default</li>
						<li>Replit employees technically have access</li>
					</ul>
				</div>

				<div class="security-card">
					<h3>Cursor Security</h3>
					<div class="cve-status vulnerable">
						<a href="https://nvd.nist.gov/vuln/detail/CVE-2025-62352" target="_blank" rel="noopener">CVE-2025-62352</a> (Path Traversal)
					</div>
					<h4>Local Security Model</h4>
					<p>Your code stays on your machine. You control access.</p>
					<h4>Strengths</h4>
					<ul>
						<li>Complete data residency control</li>
						<li>Code never leaves your machine (for editing)</li>
						<li>Traditional IDE threat model</li>
						<li>Privacy mode available</li>
					</ul>
					<h4>Considerations</h4>
					<ul>
						<li>Known CVE for path traversal</li>
						<li>Your local security matters</li>
						<li>No built-in secrets management</li>
						<li>Need external deployment (more attack surface)</li>
					</ul>
				</div>
			</div>

			<p>
				<strong>Bottom line:</strong> If data residency matters (enterprise, regulated industries, sensitive code), Cursor's local model is more appropriate. If you want built-in security features and compliance certifications, Replit's managed platform provides that. Always use <a href="/kb/vibe-coding/secure-vibe-coding-guide/">security best practices</a> with either tool.
			</p>
		</section>

		<!-- When to Choose -->
		<section>
			<h2>When to Choose Replit</h2>
			<ul>
				<li><strong>Zero setup:</strong> Start coding in seconds from any browser</li>
				<li><strong>Instant deployment:</strong> One-click deploy to a live URL</li>
				<li><strong>Beginners:</strong> Lower learning curve, more forgiving</li>
				<li><strong>Collaboration:</strong> Real-time multiplayer coding</li>
				<li><strong>Mobile access:</strong> Code from phone or tablet</li>
				<li><strong>Quick prototypes:</strong> Fastest path from idea to demo</li>
			</ul>
			<p>
				<strong>Ideal user:</strong> Beginners, educators, hackathon participants, or anyone who wants the fastest path from idea to deployed app.
			</p>
		</section>

		<section>
			<h2>When to Choose Cursor</h2>
			<ul>
				<li><strong>Professional projects:</strong> Complex, long-term codebases</li>
				<li><strong>Data privacy:</strong> Code stays on your machine</li>
				<li><strong>Offline capability:</strong> Work without internet</li>
				<li><strong>Advanced AI:</strong> Composer multi-file editing</li>
				<li><strong>Existing toolchain:</strong> Integrate with local tools and CI/CD</li>
				<li><strong>VS Code ecosystem:</strong> Use all your extensions</li>
			</ul>
			<p>
				<strong>Ideal user:</strong> Professional developers, teams with data residency requirements, or anyone working on complex production applications.
			</p>
		</section>

		<!-- Can You Use Both -->
		<section>
			<h2>Can you use both?</h2>
			<p>
				Yes, many developers use both for different purposes:
			</p>
			<ul>
				<li><strong>Replit for quick experiments:</strong> Test an idea in 5 minutes</li>
				<li><strong>Cursor for production work:</strong> Serious development on local machine</li>
				<li><strong>Replit for teaching:</strong> Students can access from any computer</li>
				<li><strong>Replit for demos:</strong> Instantly shareable live URLs</li>
			</ul>
			<p>
				You can even export code from Replit and continue development in Cursor when a prototype needs to become a production application.
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
				<a href="/kb/vibe-coding-tools/replit/" class="card card-interactive">
					<span class="related-card-category">Tool Guide</span>
					<h3 class="related-card-title">Replit Agent Security</h3>
				</a>
				<a href="/kb/vibe-coding-tools/cursor/" class="card card-interactive">
					<span class="related-card-category">Tool Guide</span>
					<h3 class="related-card-title">Cursor Security Patterns</h3>
				</a>
				<a href="/kb/vibe-coding-tools/cursor-vs-copilot/" class="card card-interactive">
					<span class="related-card-category">Comparison</span>
					<h3 class="related-card-title">Cursor vs GitHub Copilot</h3>
				</a>
				<a href="/kb/vibe-coding-tools/lovable-vs-bolt/" class="card card-interactive">
					<span class="related-card-category">Comparison</span>
					<h3 class="related-card-title">Lovable vs Bolt</h3>
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

	/* Paradigm Comparison */
	.paradigm-comparison {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		margin: 1.5rem 0;
	}

	@media (max-width: 768px) {
		.paradigm-comparison {
			grid-template-columns: 1fr;
		}
	}

	.paradigm-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.25rem;
	}

	.paradigm-card h3 {
		margin-top: 0;
		margin-bottom: 1rem;
		color: var(--text-primary);
	}

	.paradigm-card ul {
		margin-bottom: 0;
	}

	.paradigm-card li {
		margin-bottom: 0.5rem;
		font-size: 0.9rem;
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

	.cve-status.neutral {
		background: var(--bg-tertiary);
		color: var(--text-tertiary);
		border: 1px solid var(--border);
	}

	.cve-status a {
		color: inherit;
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
