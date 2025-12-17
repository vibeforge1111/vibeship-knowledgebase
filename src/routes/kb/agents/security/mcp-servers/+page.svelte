<script lang="ts">
	import { onMount } from 'svelte';

	// FAQ accordion state using Svelte 5 runes
	let openFaq = $state<number | null>(null);

	function toggleFaq(index: number) {
		openFaq = openFaq === index ? null : index;
	}

	const faqs = [
		{
			question: 'What is MCP and why should I care about security?',
			answer:
				'MCP (Model Context Protocol) is Anthropic\'s open standard that connects AI tools like Claude Code and Cursor to external services - databases, APIs, files, and more. Security matters because MCP servers run with your local permissions. A malicious server can access your filesystem, steal credentials, and execute code. According to <a href="https://www.wiz.io/blog/mcp-security-research-briefing">Wiz Security</a>, installation resembles "pipe curl to bash" with no signing or verification.'
		},
		{
			question: 'Are official MCP servers safe to use?',
			answer:
				'Not necessarily. "Official" doesn\'t mean audited. <a href="https://www.wiz.io/blog/mcp-security-research-briefing">Wiz researchers</a> found an "Azure" MCP server with no Microsoft affiliation. Only use servers from verified publishers with strong security track records. Even official servers can have vulnerabilities - CVE-2025-6514 affected mcp-remote with a CVSS 9.6 critical RCE. Always audit before installing.'
		},
		{
			question: 'How do I audit MCP servers before installing?',
			answer:
				'Check four things: 1) Source ownership - who maintains it and what\'s their security track record? 2) Code review - if open source, scan for dangerous patterns like eval(), shell execution, or credential access. 3) Permissions requested - does a "calculator" need filesystem access? 4) Recent updates and CVE history. Use the AI fix prompt in this article to audit your existing configuration.'
		},
		{
			question: 'Can MCP servers access my files and credentials?',
			answer:
				'Yes. MCP servers run locally with your user permissions. They can access your filesystem, read SSH keys from ~/.ssh/, extract tokens from config files, and access any service you\'ve granted OAuth permissions. <a href="https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks">Invariant Labs</a> demonstrated extracting SSH keys and Cursor credentials through a malicious "calculator" tool.'
		},
		{
			question: 'What is a tool poisoning attack?',
			answer:
				'Tool poisoning embeds malicious instructions in MCP tool descriptions that are invisible to users but visible to AI models. When the AI invokes the tool, hidden instructions execute - extracting files, stealing credentials, or running commands. The attack succeeds because users see simplified descriptions while the AI sees the full malicious payload. Always review raw tool definitions before installing servers.'
		},
		{
			question: 'How do I secure my Claude Code/Cursor MCP setup?',
			answer:
				'Follow these steps: 1) Only install servers from trusted sources with verified publishers, 2) Use minimal OAuth scopes - don\'t grant Gmail access to a file tool, 3) Prefer local servers over remote ones, 4) Enable all approval prompts in your AI tool settings, 5) Pin server versions to prevent rug pull attacks, 6) Regularly audit connected OAuth accounts and revoke unused permissions.'
		}
	];

	// Schema.org structured data
	let schemaData: object;

	onMount(() => {
		schemaData = {
			'@context': 'https://schema.org',
			'@graph': [
				{
					'@type': 'TechArticle',
					headline: 'MCP Server Security: The Hidden Risks in AI Tool Integrations',
					description:
						'MCP servers connect AI tools to your data but expose you to tool poisoning, credential theft, and RCE. Learn attack vectors and secure your Claude Code, Cursor, and Windsurf setup.',
					author: {
						'@type': 'Organization',
						name: 'VibeShip',
						url: 'https://vibeship.co'
					},
					publisher: {
						'@type': 'Organization',
						name: 'VibeShip',
						url: 'https://vibeship.co'
					},
					datePublished: '2025-12-17',
					dateModified: '2025-12-17',
					mainEntityOfPage: {
						'@type': 'WebPage',
						'@id': 'https://vibeship.co/kb/agents/security/mcp-servers/'
					},
					about: [
						{
							'@type': 'Thing',
							name: 'Model Context Protocol',
							sameAs: 'https://modelcontextprotocol.io/'
						},
						{
							'@type': 'Thing',
							name: 'AI Agent Security',
							sameAs: 'https://owasp.org/Top10/A08_2021-Software_and_Data_Integrity_Failures/'
						}
					],
					keywords:
						'MCP security, model context protocol, MCP server vulnerabilities, claude code MCP, cursor MCP security, tool poisoning, AI agent security, vibe coding'
				},
				{
					'@type': 'FAQPage',
					mainEntity: faqs.map((faq) => ({
						'@type': 'Question',
						name: faq.question,
						acceptedAnswer: {
							'@type': 'Answer',
							text: faq.answer.replace(/<[^>]*>/g, '')
						}
					}))
				},
				{
					'@type': 'BreadcrumbList',
					itemListElement: [
						{
							'@type': 'ListItem',
							position: 1,
							name: 'Home',
							item: 'https://vibeship.co'
						},
						{
							'@type': 'ListItem',
							position: 2,
							name: 'Knowledge Base',
							item: 'https://vibeship.co/kb/'
						},
						{
							'@type': 'ListItem',
							position: 3,
							name: 'Agents',
							item: 'https://vibeship.co/kb/agents/'
						},
						{
							'@type': 'ListItem',
							position: 4,
							name: 'MCP Server Security',
							item: 'https://vibeship.co/kb/agents/security/mcp-servers/'
						}
					]
				},
				{
					'@type': 'HowTo',
					name: 'How to Secure Your MCP Server Setup',
					description: 'Step-by-step security checklist for MCP server installations',
					step: [
						{
							'@type': 'HowToStep',
							name: 'Audit the source',
							text: 'Check source ownership and security track record before installing any MCP server'
						},
						{
							'@type': 'HowToStep',
							name: 'Review permissions',
							text: 'Verify that requested permissions match expected functionality'
						},
						{
							'@type': 'HowToStep',
							name: 'Prefer local servers',
							text: 'Use local stdio transport over remote HTTP when possible'
						},
						{
							'@type': 'HowToStep',
							name: 'Enable approval prompts',
							text: 'Turn on all tool approval prompts in your AI tool settings'
						},
						{
							'@type': 'HowToStep',
							name: 'Pin versions',
							text: 'Lock server versions to prevent rug pull attacks via auto-updates'
						}
					]
				}
			]
		};

		// Inject schema into document head
		const script = document.createElement('script');
		script.type = 'application/ld+json';
		script.textContent = JSON.stringify(schemaData);
		document.head.appendChild(script);

		return () => {
			script.remove();
		};
	});
</script>

<svelte:head>
	<title>MCP Server Security: The Hidden Risks in AI Tool Integrations | VibeShip</title>
	<meta
		name="description"
		content="MCP servers connect AI tools to your data but expose you to tool poisoning, credential theft, and RCE. Learn attack vectors and secure your Claude Code, Cursor, and Windsurf setup."
	/>
	<meta
		name="keywords"
		content="MCP security, model context protocol, MCP server vulnerabilities, claude code MCP, cursor MCP security, tool poisoning, AI agent security"
	/>
	<link rel="canonical" href="https://vibeship.co/kb/agents/security/mcp-servers/" />

	<!-- Open Graph -->
	<meta
		property="og:title"
		content="MCP Server Security: The Hidden Risks in AI Tool Integrations"
	/>
	<meta
		property="og:description"
		content="MCP servers connect AI tools to your data but expose you to tool poisoning, credential theft, and RCE. Learn attack vectors and secure your setup."
	/>
	<meta property="og:url" content="https://vibeship.co/kb/agents/security/mcp-servers/" />
	<meta property="og:type" content="article" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta
		name="twitter:title"
		content="MCP Server Security: The Hidden Risks in AI Tool Integrations"
	/>
	<meta
		name="twitter:description"
		content="MCP servers connect AI tools to your data but expose you to tool poisoning, credential theft, and RCE."
	/>
</svelte:head>

<div class="article-container">
	<!-- Breadcrumb Navigation -->
	<nav class="breadcrumb" aria-label="Breadcrumb">
		<ol>
			<li><a href="/">Home</a></li>
			<li><a href="/kb/">Knowledge Base</a></li>
			<li><a href="/kb/agents/">Agents</a></li>
			<li><span aria-current="page">MCP Server Security</span></li>
		</ol>
	</nav>

	<article class="vulnerability-article">
		<!-- Article Header -->
		<header class="article-header">
			<div class="meta-badges">
				<span class="badge badge-critical">Critical Risk</span>
				<span class="badge badge-owasp"
					><a
						href="https://owasp.org/Top10/A08_2021-Software_and_Data_Integrity_Failures/"
						target="_blank"
						rel="noopener">OWASP A08:2021</a
					></span
				>
				<span class="badge badge-cwe"
					><a href="https://cwe.mitre.org/data/definitions/94.html" target="_blank" rel="noopener"
						>CWE-94</a
					></span
				>
			</div>

			<h1>MCP Server Security: The Hidden Risks in AI Tool Integrations</h1>

			<p class="subtitle">
				MCP servers give AI tools superpowers - but they also expose you to tool poisoning,
				credential theft, and remote code execution.
			</p>

			<!-- Quick Answer Box -->
			<div class="quick-answer">
				<strong>Quick Answer:</strong>
				<a href="https://modelcontextprotocol.io/" target="_blank" rel="noopener"
					>MCP (Model Context Protocol)</a
				>
				servers let AI tools access your files, databases, and APIs - but they also expose you to tool
				poisoning, credential theft, and code execution attacks. Before installing any MCP server, audit
				the source, limit permissions, and prefer local servers over remote ones.
			</div>
		</header>

		<!-- Table of Contents -->
		<nav class="toc">
			<h2>Contents</h2>
			<ol>
				<li><a href="#what-is-mcp">What is MCP?</a></li>
				<li><a href="#why-vibe-coders-care">Why Vibe Coders Should Care</a></li>
				<li><a href="#attack-vectors">The Attack Vectors</a></li>
				<li><a href="#real-world-examples">Real-World Examples</a></li>
				<li><a href="#which-tools-use-mcp">Which AI Tools Use MCP?</a></li>
				<li><a href="#secure-mcp-setup">How to Secure Your MCP Setup</a></li>
				<li><a href="#ai-fix-prompt">AI Fix Prompt</a></li>
				<li><a href="#faq">FAQ</a></li>
			</ol>
		</nav>

		<!-- Section 1: What is MCP? -->
		<section id="what-is-mcp">
			<h2>What is MCP?</h2>

			<p>
				MCP (Model Context Protocol) is like a "USB-C port for AI" - a standardized way for AI tools
				to connect to external services. <a
					href="https://www.anthropic.com/news/model-context-protocol"
					target="_blank"
					rel="noopener">Launched by Anthropic in November 2024</a
				>, MCP lets your AI assistant access Gmail, query databases, read files, call APIs, and
				integrate with hundreds of tools.
			</p>

			<p>
				The architecture is simple: your AI app (Claude Code, Cursor, Windsurf) is the <strong
					>host</strong
				>, which connects to MCP <strong>servers</strong> through <strong>clients</strong>. Each
				server exposes "tools" the AI can call - like <code>send_email</code>,
				<code>query_database</code>, or <code>read_file</code>.
			</p>

			<p>
				The benefit is powerful: vibe coders can connect their AI assistant to real data and
				services, making AI-generated code far more useful. The security tradeoff? More power means
				more risk - and that risk is significant.
			</p>
		</section>

		<!-- Section 2: Why Vibe Coders Should Care -->
		<section id="why-vibe-coders-care">
			<h2>Why Vibe Coders Should Care</h2>

			<p>
				MCP servers run locally <strong>with your user permissions</strong>. This means they can
				access your entire filesystem, read your SSH keys from <code>~/.ssh/</code>, extract tokens
				from config files, and access any service you've authenticated to.
			</p>

			<p>
				There's no central vetting process for MCP servers. Anyone can publish one, and the
				"official" label doesn't mean audited. <a
					href="https://www.wiz.io/blog/mcp-security-research-briefing"
					target="_blank"
					rel="noopener">Wiz Security researchers</a
				>
				found an "Azure" MCP server with no Microsoft affiliation - anyone could have published it.
			</p>

			<div class="warning-box">
				<strong>Supply Chain Risk:</strong> According to Wiz, MCP server installation "resembles pipe
				curl to bash" - no package signing, no pinning, no verification. If you're using
				<a href="/kb/vibe-coding-tools/cursor/">Cursor</a>,
				<a href="/kb/vibe-coding-tools/claude-code/">Claude Code</a>, or
				<a href="/kb/vibe-coding-tools/windsurf/">Windsurf</a> with MCP servers, you're trusting random packages
				with full access to your development environment.
			</div>
		</section>

		<!-- Section 3: Attack Vectors -->
		<section id="attack-vectors">
			<h2>The Attack Vectors</h2>

			<h3>Tool Poisoning Attacks</h3>

			<p>
				Tool poisoning is the most insidious MCP attack. Malicious instructions are embedded in tool
				descriptions that are <strong>invisible to users but visible to AI models</strong>. When the
				AI invokes the tool, the hidden instructions execute.
			</p>

			<p>
				<a
					href="https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks"
					target="_blank"
					rel="noopener">Invariant Labs demonstrated</a
				> a seemingly innocent <code>add()</code> function that:
			</p>

			<ul>
				<li>
					Extracted <code>~/.cursor/mcp.json</code> containing credentials
				</li>
				<li>
					Stole SSH private keys from <code>~/.ssh/id_rsa</code>
				</li>
				<li>Disguised the extraction as "mathematical parameters"</li>
				<li>Provided fake mathematical explanations to mask the attack</li>
			</ul>

			<p>
				Why it works: The MCP marketplace has no vetting. The UI shows simplified tool descriptions
				while hiding the full AI-visible instructions. Users can't see what the AI actually receives.
			</p>

			<h3>Tool Shadowing</h3>

			<p>
				In multi-server setups, a malicious server can override behavior of tools from trusted
				servers. Example: You install a trusted email server plus a malicious "helper" server. The
				helper's tool descriptions poison the AI's understanding of the email server - and suddenly
				your emails are being copied to an attacker's address without any visible indication.
			</p>

			<h3>Rug Pull Attacks</h3>

			<p>
				MCP allows dynamic tool definitions - servers can change what their tools do after you've
				approved them. A server might start safe, gain your trust, then silently update its
				definitions to include malicious instructions. Most clients don't re-verify definitions after
				initial approval.
			</p>

			<h3>Supply Chain Attacks</h3>

			<p>
				Classic npm-style attacks apply to MCP servers: typosquatting (<code>mcp-github</code> vs
				<code>mcp-gihub</code>), dependency confusion, legitimate maintainer accounts getting
				compromised, and initially safe packages updated with malware.
			</p>

			<h3>Credential and Token Theft</h3>

			<p>
				MCP servers often request OAuth access to services like Gmail, Google Drive, or GitHub. If a
				server stores those refresh tokens and later gets compromised - or was malicious from the
				start - attackers gain persistent access to your accounts.
			</p>

			<p>
				<a href="https://www.pillar.security/blog/the-security-risks-of-model-context-protocol-mcp"
					>Bitsight research</a
				> found approximately 1,000 MCP servers exposed without any authorization mechanism.
			</p>

			<h3>Remote Code Execution</h3>

			<p>
				Wiz researchers achieved RCE through an MCP server designed to parse GitHub documentation.
				Malicious content in a README.md file triggered code execution on the user's machine. Because
				MCP servers run locally with user permissions, malicious tool output can instruct the AI to
				execute system commands - turning your AI assistant into an attack vector.
			</p>

			<p>
				This relates to other injection vulnerabilities like
				<a href="/kb/security/vulnerabilities/command-injection/">command injection</a> and
				<a href="/kb/security/vulnerabilities/insecure-deserialization/">insecure deserialization</a>
				- patterns that are already common in vibe coded applications.
			</p>
		</section>

		<!-- Section 4: Real-World Examples -->
		<section id="real-world-examples">
			<h2>Real-World Examples</h2>

			<div class="cve-box">
				<h4>CVE-2025-6514: Critical RCE in mcp-remote</h4>
				<p><strong>CVSS Score:</strong> 9.6 (Critical)</p>
				<p><strong>Affected Versions:</strong> v0.0.5 - v0.1.15</p>
				<p>
					<strong>Impact:</strong> Remote code execution through the mcp-remote package, allowing attackers
					to execute arbitrary commands on affected systems.
				</p>
			</div>

			<h4>Cursor SSH Key Extraction</h4>
			<p>
				Invariant Labs demonstrated a complete attack chain against Cursor using tool poisoning. A
				fake "math calculator" MCP server extracted SSH private keys and Cursor configuration files,
				all while appearing to perform innocent calculations. The user saw "2 + 2 = 4" while the AI
				was silently exfiltrating credentials.
			</p>

			<h4>"Official" Azure Server</h4>
			<p>
				Wiz found an MCP server claiming to be an official Azure integration. It had no Microsoft
				affiliation. Anyone searching for Azure tools might install it, granting access to their
				development environment. The "official" label provides false confidence.
			</p>
		</section>

		<!-- Section 5: Which Tools Use MCP? -->
		<section id="which-tools-use-mcp">
			<h2>Which AI Tools Use MCP?</h2>

			<div class="comparison-table-container">
				<table class="comparison-table">
					<thead>
						<tr>
							<th>Tool</th>
							<th>MCP Support</th>
							<th>Security Features</th>
							<th>Risk Level</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><a href="/kb/vibe-coding-tools/claude-code/">Claude Code</a></td>
							<td>Native</td>
							<td>Approval prompts, local preference, permission model</td>
							<td><span class="risk-medium">Medium</span></td>
						</tr>
						<tr>
							<td><a href="/kb/vibe-coding-tools/cursor/">Cursor</a></td>
							<td>Native</td>
							<td>Permission model, tool approval required</td>
							<td><span class="risk-medium">Medium</span></td>
						</tr>
						<tr>
							<td><a href="/kb/vibe-coding-tools/windsurf/">Windsurf</a></td>
							<td>Native</td>
							<td>Basic approval prompts</td>
							<td><span class="risk-high">Medium-High</span></td>
						</tr>
						<tr>
							<td>Cline</td>
							<td>Native</td>
							<td>Minimal security controls</td>
							<td><span class="risk-high">High</span></td>
						</tr>
						<tr>
							<td>VS Code + Extensions</td>
							<td>Via plugins</td>
							<td>Varies by extension</td>
							<td><span class="risk-high">Variable</span></td>
						</tr>
					</tbody>
				</table>
			</div>

			<p>
				No MCP client is fully safe. Even tools with approval prompts can be bypassed through tool
				poisoning, where the malicious instructions are invisible in the approval dialog. The safest
				approach is careful server selection combined with principle of least privilege.
			</p>
		</section>

		<!-- Section 6: How to Secure Your MCP Setup -->
		<section id="secure-mcp-setup">
			<h2>How to Secure Your MCP Setup</h2>

			<h3>Before Installing Any Server</h3>

			<div class="checklist">
				<label class="checklist-item">
					<input type="checkbox" />
					<span>Check source ownership and publisher's security track record</span>
				</label>
				<label class="checklist-item">
					<input type="checkbox" />
					<span>Review server code if open source - look for eval(), exec(), shell commands</span>
				</label>
				<label class="checklist-item">
					<input type="checkbox" />
					<span>Verify on <a
							href="https://github.com/modelcontextprotocol/servers"
							target="_blank"
							rel="noopener">official MCP servers list</a
						> or trusted registries</span>
				</label>
				<label class="checklist-item">
					<input type="checkbox" />
					<span>Check for recent security audits or vulnerability history</span>
				</label>
				<label class="checklist-item">
					<input type="checkbox" />
					<span>Verify permissions match expected functionality (does a calculator need file access?)</span
					>
				</label>
			</div>

			<h3>During Configuration</h3>

			<div class="checklist">
				<label class="checklist-item">
					<input type="checkbox" />
					<span>Use minimal OAuth scopes - don't grant Gmail access to a file tool</span>
				</label>
				<label class="checklist-item">
					<input type="checkbox" />
					<span>Prefer local <code>stdio</code> servers over remote <code>HTTP</code> transport</span
					>
				</label>
				<label class="checklist-item">
					<input type="checkbox" />
					<span>Enable all approval prompts in your AI tool settings</span>
				</label>
				<label class="checklist-item">
					<input type="checkbox" />
					<span>Review raw tool descriptions, not just UI summaries</span>
				</label>
				<label class="checklist-item">
					<input type="checkbox" />
					<span>Avoid servers requesting <a href="/kb/security/vulnerabilities/hardcoded-secrets/"
							>hardcoded credentials</a
						> in config</span>
				</label>
			</div>

			<h3>Ongoing Maintenance</h3>

			<div class="checklist">
				<label class="checklist-item">
					<input type="checkbox" />
					<span>Pin server versions - no auto-updates that could introduce malicious changes</span>
				</label>
				<label class="checklist-item">
					<input type="checkbox" />
					<span>Monitor for CVEs in your installed servers</span>
				</label>
				<label class="checklist-item">
					<input type="checkbox" />
					<span>Audit connected OAuth accounts periodically</span>
				</label>
				<label class="checklist-item">
					<input type="checkbox" />
					<span>Remove unused servers immediately</span>
				</label>
				<label class="checklist-item">
					<input type="checkbox" />
					<span>Review the <a
							href="https://modelcontextprotocol.io/specification/2025-03-26/basic/authorization"
							target="_blank"
							rel="noopener">MCP Authorization spec</a
						> for security updates</span>
				</label>
			</div>
		</section>

		<!-- Section 7: AI Fix Prompt -->
		<section id="ai-fix-prompt">
			<h2>AI Fix Prompt: Audit Your MCP Configuration</h2>

			<p>
				Copy this prompt into Claude Code, Cursor, or any AI assistant to audit your MCP server
				setup:
			</p>

			<div class="code-block">
				<div class="code-header">
					<span class="code-lang">AI Security Audit Prompt</span>
					<button
						class="copy-btn"
						onclick={(e) =>
							navigator.clipboard.writeText(
								e.currentTarget.parentElement?.nextElementSibling?.textContent || ''
							)}
					>
						Copy
					</button>
				</div>
				<pre><code
						>{`Review my MCP server configuration for security issues:

## Step 1: Identify MCP Configuration
Find and read my MCP configuration file:
- Claude Code: ~/.config/claude-code/mcp.json or similar
- Cursor: ~/.cursor/mcp.json
- Check for any mcp.json, mcp-config.json, or similar files

## Step 2: For Each Server, Assess
1. **Source Trustworthiness**
   - Is this from an official/verified publisher?
   - Does the GitHub repo have security policies?
   - When was it last updated?
   - Are there open security issues?

2. **Permission Analysis**
   - What permissions does it request?
   - Do permissions match stated functionality?
   - Does it request OAuth tokens? For which services?
   - Does it access filesystem? Which paths?

3. **Transport Risk**
   - Is it local (stdio) or remote (HTTP)?
   - Remote servers are higher risk
   - Check for TLS/authentication if remote

4. **Version Pinning**
   - Is the version pinned or using "latest"?
   - Unpinned versions enable rug pull attacks

## Step 3: Flag High-Risk Patterns
Alert me to these red flags:
- [ ] Remote servers with filesystem access
- [ ] Servers requesting OAuth tokens for sensitive services (Gmail, GitHub)
- [ ] Unknown or unverified publishers
- [ ] Servers not pinned to specific versions
- [ ] Servers with known CVEs
- [ ] Excessive permissions for stated functionality

## Step 4: Recommendations
For each risk found:
- Explain the specific threat
- Recommend mitigation (remove, restrict, or replace)
- Suggest safer alternatives if available

Format your response as a security report with risk ratings (Critical/High/Medium/Low) for each server.`}</code
					></pre>
			</div>
		</section>

		<!-- FAQ Section -->
		<section id="faq" class="faq-section">
			<h2>Frequently Asked Questions</h2>

			<div class="faq-list">
				{#each faqs as faq, index}
					<div class="faq-item" class:open={openFaq === index}>
						<button
							class="faq-question"
							onclick={() => toggleFaq(index)}
							aria-expanded={openFaq === index}
						>
							<span>{faq.question}</span>
							<svg
								class="faq-icon"
								width="20"
								height="20"
								viewBox="0 0 20 20"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M5 7.5L10 12.5L15 7.5"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</button>
						{#if openFaq === index}
							<div class="faq-answer">
								<p>{@html faq.answer}</p>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</section>

		<!-- Related Content -->
		<section class="related-content">
			<h2>Related Articles</h2>

			<div class="related-grid">
				<a href="/kb/vibe-coding-tools/claude-code/" class="related-card">
					<h3>Claude Code Security</h3>
					<p>Security patterns for Claude Code including MCP configuration best practices.</p>
				</a>
				<a href="/kb/vibe-coding-tools/cursor/" class="related-card">
					<h3>Cursor Security Patterns</h3>
					<p>How to configure Cursor securely with MCP servers and code generation.</p>
				</a>
				<a href="/kb/security/vulnerabilities/command-injection/" class="related-card">
					<h3>Command Injection</h3>
					<p>Understand how MCP-enabled command execution can lead to system compromise.</p>
				</a>
				<a href="/kb/vibe-coding/secure-vibe-coding-guide/" class="related-card">
					<h3>Secure Vibe Coding Guide</h3>
					<p>Complete guide to building secure applications with AI code generation tools.</p>
				</a>
			</div>
		</section>

		<!-- CTA Section -->
		<section class="cta-section">
			<div class="cta-box">
				<h2>Scan Your Vibe Coded Project</h2>
				<p>
					VibeShip Scanner automatically detects security vulnerabilities in AI-generated code,
					including dangerous patterns that MCP servers might introduce.
				</p>
				<a href="https://scanner.vibeship.co" class="cta-button">Try VibeShip Scanner Free →</a>
			</div>
		</section>
	</article>
</div>

<style>
	/* Article Container */
	.article-container {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	/* Breadcrumb */
	.breadcrumb ol {
		display: flex;
		flex-wrap: wrap;
		list-style: none;
		padding: 0;
		margin: 0 0 2rem 0;
		font-size: 0.875rem;
	}

	.breadcrumb li:not(:last-child)::after {
		content: '/';
		margin: 0 0.5rem;
		color: #6b7280;
	}

	.breadcrumb a {
		color: #3b82f6;
		text-decoration: none;
	}

	.breadcrumb a:hover {
		text-decoration: underline;
	}

	.breadcrumb span[aria-current] {
		color: #6b7280;
	}

	/* Article Header */
	.article-header {
		margin-bottom: 2rem;
	}

	.meta-badges {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.badge {
		display: inline-block;
		padding: 0.25rem 0.75rem;
		border-radius: 9999px;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
	}

	.badge a {
		color: inherit;
		text-decoration: none;
	}

	.badge a:hover {
		text-decoration: underline;
	}

	.badge-critical {
		background-color: #fef2f2;
		color: #dc2626;
		border: 1px solid #fecaca;
	}

	.badge-owasp {
		background-color: #fefce8;
		color: #ca8a04;
		border: 1px solid #fef08a;
	}

	.badge-cwe {
		background-color: #f0f9ff;
		color: #0284c7;
		border: 1px solid #bae6fd;
	}

	h1 {
		font-size: 2.25rem;
		font-weight: 800;
		line-height: 1.2;
		margin: 0 0 1rem 0;
		color: #111827;
	}

	.subtitle {
		font-size: 1.25rem;
		color: #4b5563;
		margin: 0 0 1.5rem 0;
	}

	/* Quick Answer Box */
	.quick-answer {
		background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
		border: 1px solid #93c5fd;
		border-radius: 0.75rem;
		padding: 1.25rem;
		margin-bottom: 2rem;
	}

	.quick-answer strong {
		color: #1e40af;
	}

	.quick-answer a {
		color: #2563eb;
	}

	/* Table of Contents */
	.toc {
		background-color: #f9fafb;
		border: 1px solid #e5e7eb;
		border-radius: 0.75rem;
		padding: 1.5rem;
		margin-bottom: 2rem;
	}

	.toc h2 {
		font-size: 1rem;
		font-weight: 600;
		margin: 0 0 1rem 0;
		color: #374151;
	}

	.toc ol {
		margin: 0;
		padding-left: 1.25rem;
	}

	.toc li {
		margin-bottom: 0.5rem;
	}

	.toc a {
		color: #3b82f6;
		text-decoration: none;
	}

	.toc a:hover {
		text-decoration: underline;
	}

	/* Sections */
	section {
		margin-bottom: 3rem;
	}

	section h2 {
		font-size: 1.5rem;
		font-weight: 700;
		margin: 0 0 1rem 0;
		color: #111827;
		padding-top: 1rem;
	}

	section h3 {
		font-size: 1.25rem;
		font-weight: 600;
		margin: 1.5rem 0 0.75rem 0;
		color: #1f2937;
	}

	section h4 {
		font-size: 1.1rem;
		font-weight: 600;
		margin: 1.25rem 0 0.5rem 0;
		color: #374151;
	}

	section p {
		color: #374151;
		line-height: 1.75;
		margin-bottom: 1rem;
	}

	section ul,
	section ol {
		color: #374151;
		line-height: 1.75;
		margin-bottom: 1rem;
		padding-left: 1.5rem;
	}

	section li {
		margin-bottom: 0.5rem;
	}

	section a {
		color: #2563eb;
		text-decoration: none;
	}

	section a:hover {
		text-decoration: underline;
	}

	section code {
		background-color: #f3f4f6;
		padding: 0.125rem 0.375rem;
		border-radius: 0.25rem;
		font-size: 0.875em;
		font-family: 'Fira Code', 'Consolas', monospace;
	}

	/* Warning Box */
	.warning-box {
		background-color: #fef3c7;
		border: 1px solid #f59e0b;
		border-left: 4px solid #f59e0b;
		border-radius: 0.5rem;
		padding: 1rem 1.25rem;
		margin: 1.5rem 0;
	}

	.warning-box strong {
		color: #92400e;
	}

	.warning-box a {
		color: #b45309;
	}

	/* CVE Box */
	.cve-box {
		background-color: #fef2f2;
		border: 1px solid #fecaca;
		border-left: 4px solid #dc2626;
		border-radius: 0.5rem;
		padding: 1rem 1.25rem;
		margin: 1.5rem 0;
	}

	.cve-box h4 {
		color: #991b1b;
		margin-top: 0;
	}

	.cve-box p {
		margin-bottom: 0.5rem;
	}

	.cve-box p:last-child {
		margin-bottom: 0;
	}

	/* Comparison Table */
	.comparison-table-container {
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
		border-bottom: 1px solid #e5e7eb;
	}

	.comparison-table th {
		background-color: #f9fafb;
		font-weight: 600;
		color: #374151;
	}

	.comparison-table td a {
		color: #2563eb;
	}

	.risk-medium {
		display: inline-block;
		padding: 0.125rem 0.5rem;
		background-color: #fef3c7;
		color: #92400e;
		border-radius: 0.25rem;
		font-size: 0.75rem;
		font-weight: 600;
	}

	.risk-high {
		display: inline-block;
		padding: 0.125rem 0.5rem;
		background-color: #fee2e2;
		color: #991b1b;
		border-radius: 0.25rem;
		font-size: 0.75rem;
		font-weight: 600;
	}

	/* Checklist */
	.checklist {
		background-color: #f9fafb;
		border: 1px solid #e5e7eb;
		border-radius: 0.75rem;
		padding: 1.25rem;
		margin: 1rem 0;
	}

	.checklist-item {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		padding: 0.5rem 0;
		cursor: pointer;
		color: #374151;
	}

	.checklist-item input[type='checkbox'] {
		margin-top: 0.25rem;
		width: 1rem;
		height: 1rem;
		cursor: pointer;
	}

	.checklist-item span {
		flex: 1;
		line-height: 1.5;
	}

	.checklist-item a {
		color: #2563eb;
	}

	/* Code Block */
	.code-block {
		margin: 1.5rem 0;
		border-radius: 0.75rem;
		overflow: hidden;
		background-color: #1f2937;
	}

	.code-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem 1rem;
		background-color: #374151;
	}

	.code-lang {
		font-size: 0.75rem;
		font-weight: 600;
		color: #9ca3af;
		text-transform: uppercase;
	}

	.copy-btn {
		padding: 0.25rem 0.75rem;
		font-size: 0.75rem;
		font-weight: 500;
		color: #d1d5db;
		background-color: #4b5563;
		border: none;
		border-radius: 0.375rem;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	.copy-btn:hover {
		background-color: #6b7280;
	}

	.code-block pre {
		margin: 0;
		padding: 1.25rem;
		overflow-x: auto;
	}

	.code-block code {
		font-family: 'Fira Code', 'Consolas', monospace;
		font-size: 0.875rem;
		line-height: 1.6;
		color: #e5e7eb;
		background: none;
		padding: 0;
	}

	/* FAQ Section */
	.faq-section {
		margin-top: 3rem;
	}

	.faq-list {
		border: 1px solid #e5e7eb;
		border-radius: 0.75rem;
		overflow: hidden;
	}

	.faq-item {
		border-bottom: 1px solid #e5e7eb;
	}

	.faq-item:last-child {
		border-bottom: none;
	}

	.faq-question {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 1.25rem;
		background: none;
		border: none;
		cursor: pointer;
		text-align: left;
		font-size: 1rem;
		font-weight: 600;
		color: #111827;
		transition: background-color 0.2s;
	}

	.faq-question:hover {
		background-color: #f9fafb;
	}

	.faq-icon {
		flex-shrink: 0;
		transition: transform 0.2s;
		color: #6b7280;
	}

	.faq-item.open .faq-icon {
		transform: rotate(180deg);
	}

	.faq-answer {
		padding: 0 1.25rem 1.25rem;
		color: #4b5563;
		line-height: 1.75;
	}

	.faq-answer p {
		margin: 0;
	}

	.faq-answer a {
		color: #2563eb;
	}

	.faq-answer code {
		background-color: #f3f4f6;
		padding: 0.125rem 0.375rem;
		border-radius: 0.25rem;
		font-size: 0.875em;
	}

	/* Related Content */
	.related-content {
		margin-top: 3rem;
		padding-top: 2rem;
		border-top: 1px solid #e5e7eb;
	}

	.related-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1rem;
		margin-top: 1rem;
	}

	.related-card {
		display: block;
		padding: 1.25rem;
		background-color: #f9fafb;
		border: 1px solid #e5e7eb;
		border-radius: 0.75rem;
		text-decoration: none;
		transition:
			border-color 0.2s,
			box-shadow 0.2s;
	}

	.related-card:hover {
		border-color: #3b82f6;
		box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
	}

	.related-card h3 {
		font-size: 1rem;
		font-weight: 600;
		color: #111827;
		margin: 0 0 0.5rem 0;
	}

	.related-card p {
		font-size: 0.875rem;
		color: #6b7280;
		margin: 0;
		line-height: 1.5;
	}

	/* CTA Section */
	.cta-section {
		margin-top: 3rem;
	}

	.cta-box {
		background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
		border-radius: 1rem;
		padding: 2rem;
		text-align: center;
		color: white;
	}

	.cta-box h2 {
		color: white;
		margin: 0 0 0.75rem 0;
		padding-top: 0;
	}

	.cta-box p {
		color: rgba(255, 255, 255, 0.9);
		margin-bottom: 1.5rem;
	}

	.cta-button {
		display: inline-block;
		padding: 0.875rem 2rem;
		background-color: white;
		color: #1e40af;
		font-weight: 600;
		text-decoration: none;
		border-radius: 0.5rem;
		transition:
			transform 0.2s,
			box-shadow 0.2s;
	}

	.cta-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
	}

	/* Responsive */
	@media (max-width: 640px) {
		.article-container {
			padding: 1rem;
		}

		h1 {
			font-size: 1.75rem;
		}

		.subtitle {
			font-size: 1.1rem;
		}

		.meta-badges {
			gap: 0.375rem;
		}

		.badge {
			font-size: 0.7rem;
			padding: 0.2rem 0.5rem;
		}

		.comparison-table {
			font-size: 0.8rem;
		}

		.comparison-table th,
		.comparison-table td {
			padding: 0.5rem;
		}

		.code-block pre {
			padding: 1rem;
		}

		.code-block code {
			font-size: 0.75rem;
		}

		.related-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
