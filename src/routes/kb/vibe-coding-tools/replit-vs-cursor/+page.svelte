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

		<!-- Quick Comparison Table -->
		<section>
			<h2>Replit vs Cursor: Quick Comparison</h2>
			<p>
				This is not just "which AI is better" - it is a comparison of fundamentally different development paradigms. Replit runs everything in the browser with instant deployment. Cursor runs locally with your files on your machine. Both are excellent tools for vibe coding with different tradeoffs.
			</p>

			<div class="comparison-table-wrapper">
				<table class="comparison-table">
					<thead>
						<tr>
							<th>Attribute</th>
							<th>Replit</th>
							<th>Cursor</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Type</td>
							<td>Cloud IDE (browser)</td>
							<td>Desktop IDE</td>
						</tr>
						<tr>
							<td>Code Location</td>
							<td>Replit servers</td>
							<td class="secure">Your machine</td>
						</tr>
						<tr>
							<td>Pro Pricing</td>
							<td>$25/mo (Core)</td>
							<td>$20/mo</td>
						</tr>
						<tr>
							<td>Free Tier</td>
							<td>Generous (public repos)</td>
							<td>Limited (2000 completions)</td>
						</tr>
						<tr>
							<td>Instant Deploy</td>
							<td class="secure">Yes (1-click)</td>
							<td>No (external hosting)</td>
						</tr>
						<tr>
							<td>Offline Work</td>
							<td>No</td>
							<td class="secure">Yes</td>
						</tr>
						<tr>
							<td>Known CVEs</td>
							<td>Platform-level</td>
							<td class="vulnerable">CVE-2025-62352</td>
						</tr>
						<tr>
							<td>Best For</td>
							<td>Beginners, prototypes</td>
							<td>Professional development</td>
						</tr>
					</tbody>
				</table>
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
				<div class="paradigm-card cloud">
					<h3>Replit: Cloud Paradigm</h3>
					<ul>
						<li><strong>Code storage:</strong> Replit's servers</li>
						<li><strong>Execution:</strong> Replit's containers</li>
						<li><strong>Deployment:</strong> One click to .replit.app</li>
						<li><strong>Collaboration:</strong> Real-time multiplayer</li>
						<li><strong>Access:</strong> Any browser, anywhere</li>
						<li><strong>Offline:</strong> Not available</li>
					</ul>
				</div>

				<div class="paradigm-card local">
					<h3>Cursor: Local Paradigm</h3>
					<ul>
						<li><strong>Code storage:</strong> Your machine</li>
						<li><strong>Execution:</strong> Your machine</li>
						<li><strong>Deployment:</strong> You manage (Vercel, AWS, etc.)</li>
						<li><strong>Collaboration:</strong> Git-based</li>
						<li><strong>Access:</strong> Your computer only</li>
						<li><strong>Offline:</strong> Full editing capability</li>
					</ul>
				</div>
			</div>

			<p>
				<strong>Key insight:</strong> Replit trades control for convenience. You get instant deployment and collaboration but give up data residency and offline access. Cursor trades convenience for control - more setup required, but you own your workflow entirely.
			</p>
		</section>

		<!-- Feature Comparison -->
		<section>
			<h2>Feature Comparison</h2>
			<p>
				Here's how Replit and Cursor compare across key features for vibe coding:
			</p>

			<div class="comparison-table-wrapper">
				<table class="comparison-table">
					<thead>
						<tr>
							<th>Feature</th>
							<th>Replit</th>
							<th>Cursor</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Autocomplete</td>
							<td>Ghostwriter</td>
							<td>Tab (multi-line)</td>
						</tr>
						<tr>
							<td>Chat</td>
							<td>Yes</td>
							<td>Yes (sidebar + inline)</td>
						</tr>
						<tr>
							<td>Multi-file Editing</td>
							<td>Limited</td>
							<td>Yes (Composer)</td>
						</tr>
						<tr>
							<td>Instant Deploy</td>
							<td class="secure">Yes</td>
							<td>No</td>
						</tr>
						<tr>
							<td>Multiplayer/Collab</td>
							<td class="secure">Yes (real-time)</td>
							<td>No (Git-based)</td>
						</tr>
						<tr>
							<td>Mobile Coding</td>
							<td class="secure">Yes</td>
							<td>No</td>
						</tr>
						<tr>
							<td>Offline Work</td>
							<td>No</td>
							<td class="secure">Yes</td>
						</tr>
						<tr>
							<td>Local File Access</td>
							<td>No</td>
							<td class="secure">Yes</td>
						</tr>
						<tr>
							<td>Built-in Database</td>
							<td class="secure">Yes (Replit DB)</td>
							<td>No</td>
						</tr>
						<tr>
							<td>Secrets Management</td>
							<td class="secure">Built-in</td>
							<td>Manual (.env)</td>
						</tr>
					</tbody>
				</table>
			</div>

			<p>
				<strong>Key insight:</strong> Replit excels at the full development-to-deployment cycle in one place. Cursor excels at powerful AI-assisted editing for complex projects. If you need deployment, Replit has it built in; with Cursor, you configure it yourself.
			</p>
		</section>

		<!-- Security Comparison -->
		<section>
			<h2>Security Comparison</h2>
			<p>
				The cloud vs local paradigm creates fundamentally different security models. Per the <a href="https://owasp.org/www-project-top-10-for-large-language-model-applications/" target="_blank" rel="noopener">OWASP Top 10 for LLM Applications</a>, understanding where your code and data reside is critical.
			</p>

			<div class="security-comparison">
				<div class="security-card replit-card">
					<h3>Replit Security</h3>
					<div class="cve-status neutral">
						Platform-Level CVEs
					</div>
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

				<div class="security-card cursor-card">
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

			<div class="comparison-table-wrapper">
				<table class="comparison-table">
					<thead>
						<tr>
							<th>Risk Factor</th>
							<th>Replit</th>
							<th>Cursor</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Data Residency</td>
							<td>Cloud (Replit)</td>
							<td class="secure">Local (your machine)</td>
						</tr>
						<tr>
							<td>Code Exposure Risk</td>
							<td>Higher (cloud storage)</td>
							<td class="secure">Lower (local)</td>
						</tr>
						<tr>
							<td>Secret Management</td>
							<td class="secure">Better (built-in)</td>
							<td>Manual</td>
						</tr>
						<tr>
							<td>CVE History</td>
							<td>Platform CVEs</td>
							<td class="vulnerable">1 IDE CVE</td>
						</tr>
						<tr>
							<td>Compliance</td>
							<td>SOC 2 available</td>
							<td>Self-managed</td>
						</tr>
					</tbody>
				</table>
			</div>

			<p>
				<strong>Bottom line:</strong> If data residency matters (enterprise, regulated industries, sensitive code), Cursor's local model is more appropriate. If you want built-in security features and compliance certifications, Replit's managed platform provides that. Always use <a href="/kb/vibe-coding/secure-vibe-coding-guide/">security best practices</a> with either tool.
			</p>
		</section>

		<!-- When to Choose Replit -->
		<section>
			<h2>When to Choose Replit</h2>
			<p>
				Replit is the better choice when you need:
			</p>
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

		<!-- When to Choose Cursor -->
		<section>
			<h2>When to Choose Cursor</h2>
			<p>
				Cursor is the better choice when you need:
			</p>
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
				<a href="/kb/vibe-coding-tools/replit/" class="related-card">
					<span class="related-type">Tool Guide</span>
					<span class="related-title">Replit Agent Security</span>
				</a>
				<a href="/kb/vibe-coding-tools/cursor/" class="related-card">
					<span class="related-type">Tool Guide</span>
					<span class="related-title">Cursor Security Patterns</span>
				</a>
				<a href="/kb/vibe-coding-tools/cursor-vs-copilot/" class="related-card">
					<span class="related-type">Comparison</span>
					<span class="related-title">Cursor vs GitHub Copilot</span>
				</a>
				<a href="/kb/vibe-coding-tools/lovable-vs-bolt/" class="related-card">
					<span class="related-type">Comparison</span>
					<span class="related-title">Lovable vs Bolt</span>
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
		color: #f97316;
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

	/* Paradigm Comparison */
	.paradigm-comparison {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
		margin: 1.5rem 0;
	}

	@media (max-width: 768px) {
		.paradigm-comparison {
			grid-template-columns: 1fr;
		}
	}

	.paradigm-card {
		background: var(--surface-1, #1a1a1a);
		border-radius: 8px;
		padding: 1.5rem;
	}

	.paradigm-card.cloud {
		border: 1px solid rgba(249, 115, 22, 0.3);
	}

	.paradigm-card.local {
		border: 1px solid rgba(59, 130, 246, 0.3);
	}

	.paradigm-card h3 {
		margin-top: 0;
		margin-bottom: 1rem;
	}

	.paradigm-card.cloud h3 {
		color: #f97316;
	}

	.paradigm-card.local h3 {
		color: #3b82f6;
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

	.security-card.replit-card {
		border: 1px solid rgba(249, 115, 22, 0.3);
	}

	.security-card.cursor-card {
		border: 1px solid rgba(59, 130, 246, 0.3);
	}

	.security-card h3 {
		margin-top: 0;
		margin-bottom: 0.75rem;
	}

	.security-card.replit-card h3 {
		color: #f97316;
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

	.cve-status.neutral {
		background: rgba(156, 163, 175, 0.2);
		color: #9ca3af;
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
