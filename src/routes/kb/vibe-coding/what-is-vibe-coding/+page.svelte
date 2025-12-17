<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'What is Vibe Coding? Definition & Guide 2025',
		description:
			"Vibe coding is AI-assisted development where you describe what you want and AI writes the code. Learn what it means, top tools, and how to vibe code safely.",
		url: '/kb/vibe-coding/what-is-vibe-coding/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Vibe Coding', href: '/kb/vibe-coding' },
		{ label: 'What is Vibe Coding?' }
	];

	// Tools data
	const tools = [
		{ name: 'Cursor', slug: 'cursor', type: 'IDE', best: 'Fast autocomplete' },
		{ name: 'Claude Code', slug: 'claude-code', type: 'CLI', best: 'Complex tasks' },
		{ name: 'Windsurf', slug: 'windsurf', type: 'IDE', best: 'Autonomous agent' },
		{ name: 'GitHub Copilot', slug: 'github-copilot', type: 'IDE', best: 'VS Code users' },
		{ name: 'Bolt.new', slug: 'bolt', type: 'Web', best: 'Quick prototypes' },
		{ name: 'Lovable', slug: 'lovable', type: 'Web', best: 'Full apps' },
		{ name: 'v0', slug: 'v0', type: 'Web', best: 'UI components' },
		{ name: 'Replit', slug: 'replit', type: 'Web', best: 'Learning' }
	];

	// FAQ data
	const faqs = [
		{
			question: 'What is vibe coding?',
			answer: 'Vibe coding is a style of programming where you describe what you want in natural language and let an AI tool write the code for you. Instead of writing code line by line, you collaborate with AI through conversation, iterating until you get the result you want. The term was coined by Andrej Karpathy in February 2025.'
		},
		{
			question: 'Who invented vibe coding?',
			answer: 'The term "vibe coding" was coined by Andrej Karpathy, former Tesla AI Director and OpenAI founding team member, in February 2025. He described it as "a new kind of coding where you fully give in to the vibes, embrace exponentials, and forget that the code even exists."'
		},
		{
			question: 'Is vibe coding safe?',
			answer: 'Vibe coding can be safe, but AI tools often generate insecure code patterns - SQL injection, hardcoded secrets, and missing authentication are common. Use security-focused prompting, review generated code, and scan for vulnerabilities before deploying. Our Secure Vibe Coding Guide covers this in detail.'
		},
		{
			question: 'What are the best vibe coding tools?',
			answer: 'The top vibe coding tools in 2025 are Cursor (IDE with autocomplete), Claude Code (CLI for complex tasks), Windsurf (autonomous agent), GitHub Copilot (VS Code integration), Bolt.new (web-based prototyping), Lovable (full app building), v0 (UI components), and Replit (learning).'
		},
		{
			question: 'Can I vibe code without knowing how to program?',
			answer: 'Yes, that\'s the power of vibe coding. You can build functional apps by describing what you want. However, basic understanding of how software works helps you communicate better with AI and recognize when something is wrong. You don\'t need to read every line, but understanding concepts helps.'
		},
		{
			question: "What's the difference between vibe coding and regular coding?",
			answer: 'In traditional coding, you write every line yourself based on deep language knowledge. In vibe coding, you describe intent and AI generates code. Traditional coding takes longer but gives full control. Vibe coding is faster but requires trusting AI output (with verification).'
		},
		{
			question: 'Is vibe coding good for beginners?',
			answer: 'Yes, vibe coding lowers the barrier to building software. Beginners can create real apps while learning concepts. However, treating AI as a teaching tool - asking it to explain the code it writes - helps you learn faster than just accepting output blindly.'
		},
		{
			question: 'What can you build with vibe coding?',
			answer: 'Almost anything: web apps, mobile apps, APIs, automation scripts, browser extensions, and more. Vibe coding excels at MVPs, prototypes, and internal tools. For complex, performance-critical, or highly regulated systems, traditional development may be more appropriate.'
		},
		{
			question: 'How do I start vibe coding?',
			answer: 'Pick a tool (Cursor, Bolt.new, or Lovable are beginner-friendly), start with a simple project, and describe what you want clearly. Learn to prompt effectively by being specific about requirements. Start small and iterate. Our tool guides help you choose.'
		},
		{
			question: 'Is vibe coding the future of programming?',
			answer: 'Vibe coding is becoming a major part of software development. It won\'t replace all traditional coding, but it\'s changing how developers work. Even professional programmers use AI tools to accelerate their workflow. The skill is shifting from "writing code" to "directing AI to write code."'
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
			{"@type": "ListItem", "position": 2, "name": "Vibe Coding", "item": "https://vibeship.co/kb/vibe-coding"},
			{"@type": "ListItem", "position": 3, "name": "What is Vibe Coding?"}
		]
	}
	</script>`}

	<!-- Article Schema -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "Article",
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

	<!-- DefinedTerm Schema -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "DefinedTerm",
		"name": "Vibe Coding",
		"description": "A style of programming where you describe what you want in natural language and AI tools write the code for you. Coined by Andrej Karpathy in February 2025.",
		"inDefinedTermSet": {
			"@type": "DefinedTermSet",
			"name": "Software Development Terms"
		}
	}
	</script>`}

	<!-- FAQ Schema -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "FAQPage",
		"mainEntity": ${JSON.stringify(
			faqs.map((faq) => ({
				'@type': 'Question',
				name: faq.question,
				acceptedAnswer: {
					'@type': 'Answer',
					text: faq.answer
				}
			}))
		)}
	}
	</script>`}
</svelte:head>

<Header {breadcrumbs} />

<div class="content-wrapper">
	<article class="content-main">
		<!-- Header -->
		<header class="article-header">
			<div class="badge-row">
				<span class="badge badge-pillar">Pillar Guide</span>
				<span class="badge">2025</span>
			</div>
			<h1>What is Vibe Coding? The Complete Guide to AI-Assisted Development</h1>
			<p class="subtitle">
				Everything you need to know about the coding revolution
			</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Vibe coding</strong> is building software by describing what you want to an AI tool, which writes the code for you. Coined by <a href="https://en.wikipedia.org/wiki/Andrej_Karpathy" target="_blank" rel="noopener">Andrej Karpathy</a> in February 2025, it lets anyone ship apps fast without writing code line by line. Here's what it means and <a href="/kb/vibe-coding/secure-vibe-coding-guide/">how to do it safely</a>.
			</p>
		</div>

		<!-- Definition -->
		<section>
			<h2>What is vibe coding? Definition</h2>
			<p>
				<strong>Vibe coding</strong> is a style of programming where you describe what you want in natural language and let an AI tool write the code for you. Instead of typing code character by character, you collaborate with AI through conversation - describing features, iterating on results, and building applications without deep technical expertise.
			</p>
			<p>
				The term was coined by <a href="https://en.wikipedia.org/wiki/Andrej_Karpathy" target="_blank" rel="noopener">Andrej Karpathy</a>, former Tesla AI Director and OpenAI founding team member, in February 2025.
			</p>

			<h3>Key Characteristics of Vibe Coding</h3>
			<ul>
				<li><strong>AI-First:</strong> The AI writes most or all of the code</li>
				<li><strong>Intent-Driven:</strong> Describe what you want, not how to build it</li>
				<li><strong>Iterative:</strong> Rapid back-and-forth with AI until it's right</li>
				<li><strong>Accessible:</strong> Don't need to understand every line of code</li>
				<li><strong>Speed-Focused:</strong> Ship fast, improve later</li>
			</ul>
		</section>

		<!-- Origin -->
		<section>
			<h2>Where did "vibe coding" come from?</h2>
			<p>
				The term comes from Andrej Karpathy, one of the most influential figures in AI. As a founding member of OpenAI and former Director of AI at Tesla (where he led Autopilot), Karpathy has shaped how we think about AI.
			</p>

			<blockquote class="quote-block">
				"There's a new kind of coding I call 'vibe coding', where you fully give in to the vibes, embrace exponentials, and forget that the code even exists... I just see stuff, say stuff, run stuff, and copy paste stuff, and it mostly works."
				<cite>- Andrej Karpathy, February 2025</cite>
			</blockquote>

			<p>
				The term resonated because it captured what millions of people were already doing - building software through conversation with AI rather than traditional programming. Within weeks, "vibe coding" became the standard term for this new approach.
			</p>
		</section>

		<!-- Comparison -->
		<section>
			<h2>Vibe coding vs traditional coding</h2>
			<p>
				Here's how vibe coding differs from traditional software development:
			</p>

			<div class="comparison-table-wrapper">
				<table class="comparison-table">
					<thead>
						<tr>
							<th>Aspect</th>
							<th>Traditional Coding</th>
							<th>Vibe Coding</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Who writes code</td>
							<td>Human writes every line</td>
							<td>AI writes, human directs</td>
						</tr>
						<tr>
							<td>Knowledge required</td>
							<td>Deep language expertise</td>
							<td>Basic concepts + clear intent</td>
						</tr>
						<tr>
							<td>Process</td>
							<td>Plan, Code, Debug</td>
							<td>Prompt, Generate, Iterate</td>
						</tr>
						<tr>
							<td>Speed</td>
							<td>Hours/days per feature</td>
							<td>Minutes/hours per feature</td>
						</tr>
						<tr>
							<td>Understanding</td>
							<td>Must understand every line</td>
							<td>Trust AI output (with review)</td>
						</tr>
						<tr>
							<td>Debugging</td>
							<td>Read and fix code manually</td>
							<td>Describe issue to AI</td>
						</tr>
					</tbody>
				</table>
			</div>

			<p>
				<strong>When vibe coding works best:</strong> MVPs, prototypes, internal tools, learning projects, and rapid iteration.
			</p>
			<p>
				<strong>When traditional coding is better:</strong> Performance-critical systems, regulated industries, complex algorithms, and when you need 100% understanding of every line.
			</p>
		</section>

		<!-- Who Are Vibe Coders -->
		<section>
			<h2>Who are vibe coders?</h2>
			<p>
				Vibe coders come from diverse backgrounds:
			</p>

			<div class="persona-grid">
				<div class="persona-card">
					<h3>Non-Technical Founders</h3>
					<p>Building MVPs without hiring developers. Validating ideas before investing in full engineering teams.</p>
				</div>
				<div class="persona-card">
					<h3>Designers</h3>
					<p>Creating functional prototypes, not just mockups. Bridging the gap between design and development.</p>
				</div>
				<div class="persona-card">
					<h3>Professional Developers</h3>
					<p>Accelerating their workflow by delegating routine code to AI. Focusing on architecture and complex problems.</p>
				</div>
				<div class="persona-card">
					<h3>Students & Learners</h3>
					<p>Learning by building real projects. Using AI as a teaching assistant that explains code.</p>
				</div>
			</div>
		</section>

		<!-- Tools -->
		<section>
			<h2>Best vibe coding tools in 2025</h2>
			<p>
				The vibe coding ecosystem has exploded. Here are the top tools, each with different strengths:
			</p>

			<div class="tools-grid">
				{#each tools as tool}
					<a href="/kb/vibe-coding-tools/{tool.slug}/" class="tool-card">
						<span class="tool-name">{tool.name}</span>
						<span class="tool-type">{tool.type}</span>
						<span class="tool-best">Best for: {tool.best}</span>
					</a>
				{/each}
			</div>

			<p class="cta-text">
				<a href="/kb/vibe-coding-tools/">See our complete tool comparison with security ratings</a>
			</p>
		</section>

		<!-- Security -->
		<section class="security-section">
			<h2>Is vibe coding safe?</h2>
			<p>
				This is the question most guides skip. <strong>Vibe coded apps can be secure, but they often aren't by default.</strong>
			</p>
			<p>
				AI tools frequently generate code with security vulnerabilities:
			</p>

			<ul>
				<li><a href="/kb/security/vulnerabilities/sql-injection/">SQL Injection</a> - AI uses string concatenation instead of parameterized queries</li>
				<li><a href="/kb/security/vulnerabilities/hardcoded-secrets/">Hardcoded Secrets</a> - API keys and passwords end up in code</li>
				<li><a href="/kb/security/vulnerabilities/missing-auth/">Missing Authentication</a> - Routes are created without auth checks</li>
				<li><a href="/kb/security/vulnerabilities/idor/">IDOR</a> - Users can access each other's data</li>
				<li><a href="/kb/security/vulnerabilities/xss/">XSS</a> - User input displayed without sanitization</li>
			</ul>

			<h3>Why AI Generates Insecure Code</h3>
			<p>
				AI tools are trained on all code, including insecure examples. They optimize for "working code" not "secure code." When you say "create a login form," the AI doesn't automatically add rate limiting, CSRF protection, or secure session handling unless you ask.
			</p>

			<h3>How to Vibe Code Safely</h3>
			<ol>
				<li><strong>Include security in your prompts</strong> - "Create a login form with rate limiting and CSRF protection"</li>
				<li><strong>Use security rules files</strong> - .cursorrules or CLAUDE.md with security instructions</li>
				<li><strong>Review generated code</strong> - Especially authentication, data handling, and API routes</li>
				<li><strong>Scan before deploying</strong> - Use security scanners to catch what you miss</li>
			</ol>

			<div class="cta-box">
				<p>
					<strong>Our <a href="/kb/vibe-coding/secure-vibe-coding-guide/">Complete Secure Vibe Coding Guide</a></strong> covers everything: security prompting, rules files, review checklists, and pre-launch security verification.
				</p>
			</div>
		</section>

		<!-- Getting Started -->
		<section>
			<h2>How to start vibe coding</h2>
			<p>
				Ready to try vibe coding? Here's how to get started:
			</p>

			<ol class="numbered-list">
				<li>
					<strong>Choose a tool</strong> - For beginners, try <a href="/kb/vibe-coding-tools/bolt/">Bolt.new</a> (web-based, free) or <a href="/kb/vibe-coding-tools/cursor/">Cursor</a> (IDE, most popular). For complex projects, <a href="/kb/vibe-coding-tools/claude-code/">Claude Code</a> handles multi-file tasks well.
				</li>
				<li>
					<strong>Start with a simple project</strong> - Build a to-do app, portfolio site, or simple API. Don't start with your startup MVP.
				</li>
				<li>
					<strong>Learn to prompt effectively</strong> - Be specific about requirements. "Build a user registration system with email verification, password hashing, and rate limiting" beats "build a signup form."
				</li>
				<li>
					<strong>Iterate and refine</strong> - Vibe coding is conversational. When something isn't right, describe the problem and let AI fix it.
				</li>
				<li>
					<strong>Know when to check the code</strong> - Always review authentication, data handling, and payment processing. Use our <a href="/kb/security/checklists/pre-launch/">pre-launch checklist</a>.
				</li>
			</ol>
		</section>

		<!-- Future -->
		<section>
			<h2>The future of vibe coding</h2>
			<p>
				Vibe coding isn't a fad - it's a fundamental shift in how software is built. Here's where it's heading:
			</p>
			<ul>
				<li><strong>Enterprise adoption:</strong> Large companies are integrating AI coding tools into their development workflows</li>
				<li><strong>Better security:</strong> Tools are adding security scanning and safer default patterns</li>
				<li><strong>Hybrid workflows:</strong> Professional developers use AI for routine code while focusing on architecture</li>
				<li><strong>New job skills:</strong> "AI prompting" and "AI code review" are becoming valued skills</li>
			</ul>
			<p>
				The best vibe coders will be those who can effectively direct AI while understanding enough to verify the output. It's not about replacing developers - it's about amplifying what anyone can build.
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

		<!-- Related Resources -->
		<section>
			<h2>Related Resources</h2>

			<h3>Vibe Coding Tools</h3>
			<div class="related-grid">
				<a href="/kb/vibe-coding-tools/" class="related-card">
					<span class="related-type">Hub</span>
					<span class="related-title">All Vibe Coding Tools</span>
				</a>
				<a href="/kb/vibe-coding-tools/cursor/" class="related-card">
					<span class="related-type">Tool</span>
					<span class="related-title">Cursor</span>
				</a>
				<a href="/kb/vibe-coding-tools/claude-code/" class="related-card">
					<span class="related-type">Tool</span>
					<span class="related-title">Claude Code</span>
				</a>
				<a href="/kb/vibe-coding-tools/windsurf/" class="related-card">
					<span class="related-type">Tool</span>
					<span class="related-title">Windsurf</span>
				</a>
				<a href="/kb/vibe-coding-tools/claude-code-vs-cursor/" class="related-card">
					<span class="related-type">Comparison</span>
					<span class="related-title">Claude Code vs Cursor</span>
				</a>
				<a href="/kb/vibe-coding-tools/windsurf-vs-cursor/" class="related-card">
					<span class="related-type">Comparison</span>
					<span class="related-title">Windsurf vs Cursor</span>
				</a>
			</div>

			<h3>Security Guides</h3>
			<div class="related-grid">
				<a href="/kb/vibe-coding/secure-vibe-coding-guide/" class="related-card">
					<span class="related-type">Pillar Guide</span>
					<span class="related-title">Secure Vibe Coding Guide</span>
				</a>
				<a href="/kb/security/vulnerabilities/sql-injection/" class="related-card">
					<span class="related-type">Vulnerability</span>
					<span class="related-title">SQL Injection</span>
				</a>
				<a href="/kb/security/vulnerabilities/hardcoded-secrets/" class="related-card">
					<span class="related-type">Vulnerability</span>
					<span class="related-title">Hardcoded Secrets</span>
				</a>
				<a href="/kb/security/vulnerabilities/prompt-injection/" class="related-card">
					<span class="related-type">Vulnerability</span>
					<span class="related-title">Prompt Injection</span>
				</a>
				<a href="/kb/security/checklists/pre-launch/" class="related-card">
					<span class="related-type">Checklist</span>
					<span class="related-title">Pre-Launch Security</span>
				</a>
				<a href="/kb/agents/security/mcp-servers/" class="related-card">
					<span class="related-type">Agent Security</span>
					<span class="related-title">MCP Server Security</span>
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

	.badge-pillar {
		background: linear-gradient(135deg, #22c55e, #16a34a);
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
		background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%);
		border: 1px solid rgba(34, 197, 94, 0.3);
		border-radius: 8px;
		padding: 1.5rem;
		margin-bottom: 2rem;
	}

	.quick-answer-label {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		color: #22c55e;
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
		margin-top: 1.5rem;
	}

	p {
		line-height: 1.7;
		margin-bottom: 1rem;
	}

	ul, ol {
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

	/* Quote Block */
	.quote-block {
		background: var(--surface-1, #1a1a1a);
		border-left: 4px solid #22c55e;
		padding: 1.5rem;
		margin: 1.5rem 0;
		font-style: italic;
		border-radius: 0 8px 8px 0;
	}

	.quote-block cite {
		display: block;
		margin-top: 1rem;
		font-style: normal;
		font-size: 0.9rem;
		color: var(--text-secondary, #888);
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
		color: var(--text-secondary, #888);
	}

	.comparison-table th:nth-child(3) {
		color: #22c55e;
	}

	/* Persona Grid */
	.persona-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.persona-card {
		background: var(--surface-1, #1a1a1a);
		border: 1px solid var(--border, #333);
		border-radius: 8px;
		padding: 1.25rem;
	}

	.persona-card h3 {
		margin-top: 0;
		font-size: 1rem;
		color: #22c55e;
	}

	.persona-card p {
		margin: 0;
		font-size: 0.9rem;
		color: var(--text-secondary, #aaa);
	}

	/* Tools Grid */
	.tools-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: 0.75rem;
		margin: 1.5rem 0;
	}

	.tool-card {
		display: flex;
		flex-direction: column;
		padding: 1rem;
		background: var(--surface-1, #1a1a1a);
		border: 1px solid var(--border, #333);
		border-radius: 8px;
		text-decoration: none;
		transition: all 0.2s;
	}

	.tool-card:hover {
		border-color: #22c55e;
		text-decoration: none;
	}

	.tool-name {
		font-weight: 600;
		color: var(--text-primary, #fff);
	}

	.tool-type {
		font-size: 0.75rem;
		color: var(--text-secondary, #888);
		text-transform: uppercase;
	}

	.tool-best {
		font-size: 0.8rem;
		color: #22c55e;
		margin-top: 0.5rem;
	}

	.cta-text {
		text-align: center;
		margin-top: 1rem;
	}

	/* Security Section */
	.security-section {
		background: linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, transparent 100%);
		border: 1px solid rgba(239, 68, 68, 0.2);
		border-radius: 12px;
		padding: 1.5rem;
		margin: 2rem 0;
	}

	.security-section h2 {
		border-bottom: none;
		padding-bottom: 0;
		color: #ef4444;
	}

	/* CTA Box */
	.cta-box {
		background: rgba(34, 197, 94, 0.1);
		border: 1px solid rgba(34, 197, 94, 0.3);
		border-radius: 8px;
		padding: 1.25rem;
		margin: 1.5rem 0;
	}

	.cta-box p {
		margin: 0;
	}

	/* Numbered List */
	.numbered-list {
		counter-reset: item;
		list-style: none;
		padding-left: 0;
	}

	.numbered-list li {
		counter-increment: item;
		padding-left: 2.5rem;
		position: relative;
		margin-bottom: 1rem;
	}

	.numbered-list li::before {
		content: counter(item);
		position: absolute;
		left: 0;
		top: 0;
		width: 1.75rem;
		height: 1.75rem;
		background: #22c55e;
		color: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 600;
		font-size: 0.9rem;
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
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: 0.75rem;
		margin: 1rem 0 2rem 0;
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
		font-size: 0.7rem;
		color: var(--text-secondary, #666);
		text-transform: uppercase;
		margin-bottom: 0.25rem;
	}

	.related-title {
		display: block;
		font-weight: 600;
		color: var(--text-primary, #fff);
	}
</style>
