<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'SSI Injection: Find & Fix in AI-Generated Code',
		description: 'SSI injection lets attackers execute server commands through web pages. A legacy vulnerability that AI tools still generate. Fix prompts for Cursor, Bolt & Claude.',
		url: '/kb/security/vulnerabilities/ssi-injection/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'SSI Injection' }
	];

	// Real external data sources
	const owaspData = {
		ranking: '#3',
		category: 'A03:2021 - Injection',
		source: 'https://owasp.org/Top10/A03_2021-Injection/',
		cweId: 'CWE-97',
		cweSource: 'https://cwe.mitre.org/data/definitions/97.html'
	};

	// FAQ data for schema
	const faqs = [
		{
			question: 'What servers are vulnerable to SSI injection?',
			answer: 'Apache with mod_include enabled is the most common target. Nginx with the SSI module, IIS with SSI enabled, and some older web frameworks also support SSI. If your server parses .shtml files or has SSI enabled in config, you could be at risk. Most modern deployments disable SSI by default, but legacy configurations and some AI-generated server setups still enable it.'
		},
		{
			question: 'Why do AI tools generate SSI-vulnerable code?',
			answer: 'AI models trained on older codebases have seen plenty of SSI patterns from the late 90s and early 2000s when SSI was common. When you ask for dynamic includes or server-side templating, AI sometimes reaches for these legacy patterns. The code works, so it looks correct, but it opens a door that should stay closed.'
		},
		{
			question: 'How is SSI injection different from other injection attacks?',
			answer: 'SSI injection specifically targets server-side include directives that get processed before the page is sent to the browser. Unlike SQL injection which targets databases, or XSS which targets browsers, SSI injection targets the web server itself. Successful exploitation can lead to command execution on the server, file disclosure, or defacement.'
		},
		{
			question: 'Can SSI injection lead to full server compromise?',
			answer: 'Yes. The exec directive in SSI can run arbitrary system commands with the web server permissions. An attacker could read sensitive files, install backdoors, pivot to other systems, or use your server for further attacks. The impact depends on what permissions your web server process has, but it can escalate quickly.'
		},
		{
			question: 'How do I check if SSI is enabled on my server?',
			answer: 'For Apache, check your httpd.conf or apache2.conf for "Options +Includes" or AddHandler/AddType for .shtml. For Nginx, look for "ssi on" in your config. You can also create a test file with <!--#echo var="DATE_LOCAL" --> and see if the server processes it. If it shows the date instead of the raw directive, SSI is active.'
		}
	];

	let copied = $state(false);

	function copyPrompt() {
		const prompt = document.getElementById('ai-fix-prompt')?.textContent || '';
		navigator.clipboard.writeText(prompt);
		copied = true;
		setTimeout(() => copied = false, 2000);
	}
</script>

<svelte:head>
	<title>{meta.title}</title>
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
			{"@type": "ListItem", "position": 2, "name": "Security", "item": "https://vibeship.co/kb/security"},
			{"@type": "ListItem", "position": 3, "name": "Vulnerabilities", "item": "https://vibeship.co/kb/security/vulnerabilities"},
			{"@type": "ListItem", "position": 4, "name": "SSI Injection"}
		]
	}
	</script>`}

	<!-- Schema.org structured data -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "TechArticle",
		"headline": "${meta.title}",
		"description": "${meta.description}",
		"author": {
			"@type": "Organization",
			"name": "VibeShip"
		},
		"publisher": {
			"@type": "Organization",
			"name": "VibeShip",
			"logo": {
				"@type": "ImageObject",
				"url": "https://vibeship.co/logo.png"
			}
		},
		"datePublished": "2025-12-26",
		"dateModified": "2025-12-26"
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
				<span class="badge badge-high">High</span>
				<span class="badge">CWE-97</span>
				<span class="badge">OWASP A03:2021</span>
			</div>
			<h1>SSI Injection in Vibe Coded Apps</h1>
			<p class="text-secondary">Ancient server magic that still haunts modern codebases, explained simply</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>SSI injection lets attackers run server commands by sneaking special directives into web pages.</strong>
				Think of it like a magic spell book that your web server reads out loud. Normally, you write the spells. With SSI injection, attackers write their own spells and your server obediently casts them. This vulnerability dates back to the 1990s but AI tools still generate patterns that enable it. Part of <a href="https://owasp.org/Top10/A03_2021-Injection/">OWASP A03:2021 Injection</a>.
			</p>
		</div>

		<!-- Stats Box - Real OWASP Data -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">{owaspData.cweId}</div>
				<div class="stat-label"><a href={owaspData.cweSource}>CWE ID</a></div>
			</div>
			<div class="stat-box">
				<div class="stat-value">1995</div>
				<div class="stat-label">Origin Era</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">RCE</div>
				<div class="stat-label">Potential Impact</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">High</div>
				<div class="stat-label">Severity</div>
			</div>
		</div>
		<p class="data-source">
			Source: <a href={owaspData.cweSource}>MITRE CWE-97</a>, <a href={owaspData.source}>OWASP Top 10</a>
		</p>

		<!-- What Is It - @eli5sec voice -->
		<section class="article-section">
			<h2>What is SSI injection?</h2>
			<p>
				SSI stands for Server-Side Includes. Picture it like mail merge for web pages. Back in the 90s, web developers needed a way to include common elements across pages, things like headers, footers, and the current date. SSI was the answer: special comments in HTML that the server would process before sending the page to browsers.
			</p>
			<p>
				The magic happens through directives that look like HTML comments: <code>&lt;!--#command parameter="value" --&gt;</code>. When the server sees these, it executes the command and replaces the directive with the output. One of these commands is <code>exec</code>, which runs shell commands. This is where things get dangerous.
			</p>
			<p>
				SSI injection occurs when an attacker can insert their own directives into pages the server will process. If a vibe coder builds a guestbook or feedback form that displays user input on .shtml pages without sanitization, attackers can submit SSI directives instead of normal text. The server sees the directive, thinks it should execute it, and suddenly the attacker is running commands on your server.
			</p>
			<p>
				According to <a href="https://cwe.mitre.org/data/definitions/97.html">MITRE CWE-97</a>, this falls under improper neutralization of server-side includes. The vulnerability has existed for nearly 30 years, yet vibe coded applications sometimes resurrect it by mixing legacy server configurations with modern front-end code.
			</p>
		</section>

		<!-- AI Tool Patterns - @eli5sec voice -->
		<section class="article-section">
			<h2>How do AI tools cause SSI injection?</h2>
			<p>
				Think of AI coding tools as assistants who learned by reading millions of old recipe books. Some of those recipes include ingredients that made sense decades ago but are risky today. SSI patterns appear in training data from the era when every web server ran Apache with all the extras enabled.
			</p>

			<div class="tool-patterns-box">
				<h3>Patterns that enable SSI injection</h3>
				<p>AI tools generate these configurations and code patterns:</p>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">Apache Config</span>
					</div>
					<pre><code>{`# AI-generated Apache config with SSI enabled
<Directory "/var/www/html">
    Options +Includes
    AddType text/html .shtml
    AddOutputFilter INCLUDES .shtml
</Directory>

# Or even worse - SSI on all HTML files
<Directory "/var/www/html">
    Options +Includes +ExecCGI
    AddHandler server-parsed .html
</Directory>`}</code></pre>
				</div>
				<p class="pattern-note">
					The <code>Options +Includes</code> line tells Apache to process SSI directives. Combined with user input that gets displayed on these pages, attackers can inject commands like <code>&lt;!--#exec cmd="cat /etc/passwd" --&gt;</code> to read sensitive files.
				</p>
			</div>

			<p>
				AI assistants sometimes suggest SSI for simple tasks like displaying timestamps or including navigation. The suggestion works, which is the problem: working code that opens security holes looks the same as working code that does not. Vibe coders get functional features without realizing the server is now executing arbitrary directives from page content.
			</p>

			<p>
				Cursor, Claude Code, Bolt, and other tools have all generated SSI-enabling configurations when asked for dynamic includes or legacy-compatible setups. The pattern appears less frequently than SQL injection, but the impact can be worse because SSI gives direct command execution on the server.
			</p>
		</section>

		<!-- What Could Happen -->
		<section class="article-section">
			<h2>What could happen if I have SSI injection?</h2>
			<p>
				Imagine giving a stranger the keys to your server room. That is roughly what SSI injection enables. Once attackers can run commands through your web server:
			</p>
			<ul class="consequences-list">
				<li><strong>Server file exposure:</strong> Commands like <code>cat /etc/passwd</code> or <code>cat config.php</code> reveal user lists, database credentials, and application secrets. The attacker reads whatever the web server process can read.</li>
				<li><strong>Remote code execution:</strong> Attackers can download and run malicious scripts, install backdoors, or add themselves as users on the system. Your server becomes theirs.</li>
				<li><strong>Website defacement:</strong> SSI directives can modify what pages display. Attackers replace your content with their messages, damaging reputation and trust.</li>
				<li><strong>Pivot to internal systems:</strong> From the compromised server, attackers probe your internal network. Databases, admin panels, and other servers become targets.</li>
				<li><strong>Cryptomining and botnets:</strong> Compromised servers get enrolled in botnets or used to mine cryptocurrency. Your hosting bill spikes while your server attacks others.</li>
			</ul>
			<p>
				The damage scales with what permissions your web server has. Many legacy setups run with more access than necessary, making SSI injection particularly destructive.
			</p>
		</section>

		<!-- Detection - @eli5sec voice -->
		<section class="article-section">
			<h2>How do I detect SSI injection vulnerabilities?</h2>
			<p>
				Detection involves two parts: checking if SSI is enabled, and checking if user input reaches SSI-processed pages. Think of it like checking if you have a loaded weapon and whether it is pointed anywhere dangerous.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Detection Patterns</span>
				</div>
				<pre><code>{`# Check Apache config for SSI enablement
grep -r "Options.*Includes" /etc/apache2/
grep -r "AddHandler.*server-parsed" /etc/apache2/
grep -r "AddOutputFilter.*INCLUDES" /etc/apache2/

# Check Nginx config
grep -r "ssi on" /etc/nginx/

# Check for .shtml files in your project
find . -name "*.shtml"

# Check if user input displays on SSI-processed pages
# Look for these patterns in code:
# - Form submissions that display on .shtml pages
# - User data echoed without encoding
# - Template includes with user-controlled paths`}</code></pre>
			</div>

			<p>
				If SSI is disabled in your server config, the vulnerability cannot be exploited even if your code has issues. Modern deployments typically have SSI off by default, but AI-generated configurations sometimes enable it explicitly.
			</p>

			<div class="cta-box">
				<p><strong>Unsure about your server configuration?</strong></p>
				<a href="https://scanner.vibeship.co" class="btn btn-green">
					Scan your code free
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M5 12h14M12 5l7 7-7 7"/>
					</svg>
				</a>
			</div>
		</section>

		<!-- How to Fix - @eli5sec voice -->
		<section class="article-section">
			<h2>How do I fix SSI injection?</h2>
			<p>
				The simplest fix is turning off the magic spell book entirely. If your server does not process SSI directives, attackers cannot exploit them. For most modern applications, SSI is unnecessary since templating engines and JavaScript frameworks handle dynamic content better.
			</p>

			<!-- AI Fix Prompt -->
			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>Copy this prompt into Cursor, Claude Code, or Bolt to scan for and remediate SSI vulnerabilities:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Fix all SSI injection vulnerabilities in my codebase.

## What to look for

Search for these SSI-enabling patterns:

1. Apache configuration with SSI enabled:
   - Options +Includes or Options Includes
   - AddHandler server-parsed
   - AddOutputFilter INCLUDES
   - AddType text/html .shtml

2. Nginx configuration with SSI:
   - ssi on
   - ssi_types

3. Files with SSI extensions:
   - *.shtml files
   - *.stm files
   - *.shtm files

4. User input displayed on SSI-processed pages:
   - Form submissions echoed without sanitization
   - User-controlled data in .shtml templates
   - Dynamic includes with user paths

## How to fix

### Option 1: Disable SSI entirely (recommended)
\`\`\`apache
# Before (vulnerable)
<Directory "/var/www/html">
    Options +Includes
    AddHandler server-parsed .shtml
</Directory>

# After (secure)
<Directory "/var/www/html">
    Options -Includes
</Directory>
\`\`\`

### Option 2: If SSI is required, sanitize all user input
\`\`\`javascript
// Before (vulnerable) - user input goes directly to SSI page
app.post('/guestbook', (req, res) => {
  const message = req.body.message;
  appendToFile('guestbook.shtml', message);
});

// After (secure) - strip SSI directives
function sanitizeForSSI(input) {
  return input
    .replace(/<!--#/g, '&lt;!--#')
    .replace(/<![^>]*>/g, '');
}

app.post('/guestbook', (req, res) => {
  const message = sanitizeForSSI(req.body.message);
  appendToFile('guestbook.shtml', message);
});
\`\`\`

### Option 3: Migrate to modern templating
Replace SSI with EJS, Handlebars, or your framework's templating:
\`\`\`javascript
// Modern alternative to SSI includes
// Instead of <!--#include virtual="/header.shtml" -->
// Use your framework's include system
import Header from './components/Header';
\`\`\`

## After fixing

1. Verify SSI is disabled: Create test file with <!--#echo var="DATE_LOCAL" -->
   If it shows raw text instead of date, SSI is off
2. Remove all .shtml files if no longer needed
3. Search for remaining SSI directives in codebase
4. List all config files and code files you modified

Please proceed systematically through my codebase.`}</div>
				</div>
			</div>

			<!-- Manual Fix -->
			<div class="fix-section">
				<h3>Manual Fix</h3>
				<p>The core change is straightforward: stop letting the server interpret special directives from page content.</p>

				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-block-header">
							<span class="code-block-lang status-bad">VULNERABLE</span>
						</div>
						<pre><code>{`# Apache config enabling SSI
<Directory "/var/www/html">
    Options +Includes +ExecCGI
    AddHandler server-parsed .html .shtml
</Directory>

# User input displayed without sanitization
<!-- guestbook.shtml -->
<div class="messages">
  <!-- User messages inserted here -->
  <!-- Attacker submits: <!--#exec cmd="id" --> -->
</div>`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-block-header">
							<span class="code-block-lang status-good">SECURE</span>
						</div>
						<pre><code>{`# Apache config with SSI disabled
<Directory "/var/www/html">
    Options -Includes -ExecCGI
</Directory>

# Or if SSI needed, sanitize input
const sanitize = (input) => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/<!--/g, '&lt;!--');
};`}</code></pre>
					</div>
				</div>

				<p>
					<strong>What changed:</strong> The first example has SSI enabled and accepts user input directly. The server will execute any SSI directives in that input. The second example either disables SSI entirely (safest) or sanitizes input to prevent directive injection. Most vibe coded applications should simply disable SSI since modern frameworks provide better alternatives.
				</p>
			</div>

			<!-- Prevention Tips -->
			<div class="fix-section">
				<h3>Prevention for vibe coders</h3>
				<div class="prevention-list">
					<ul>
						<li><strong>Audit AI-generated server configs:</strong> When AI suggests Apache or Nginx configuration, check for Options +Includes or ssi on directives</li>
						<li><strong>Use modern templating:</strong> Instead of SSI, use React, Svelte, EJS, or your framework's component system</li>
						<li><strong>Sanitize all user input:</strong> Even if you think SSI is disabled, encode special characters in user-submitted content</li>
						<li><strong>Avoid .shtml extensions:</strong> These signal SSI processing and should be replaced with .html served through modern build tools</li>
						<li><strong>Check hosting defaults:</strong> Some shared hosting and legacy setups enable SSI by default</li>
					</ul>
				</div>
			</div>
		</section>

		<!-- FAQ -->
		<section class="article-section">
			<h2>Frequently asked questions</h2>

			<div class="faq-list">
				{#each faqs as faq}
					<div class="faq-item">
						<h3>{faq.question}</h3>
						<p>{faq.answer}</p>
					</div>
				{/each}
			</div>
		</section>

		<!-- Related -->
		<section class="article-section">
			<h2>Related content</h2>

			<div class="related-grid">
				<a href="/kb/security/vulnerabilities/command-injection/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Command Injection</div>
					<p class="related-card-description">When user input becomes system commands</p>
				</a>
				<a href="/kb/security/vulnerabilities/sql-injection/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">SQL Injection</div>
					<p class="related-card-description">The classic injection attack targeting databases</p>
				</a>
				<a href="/kb/security/vulnerabilities/xss/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Cross-Site Scripting (XSS)</div>
					<p class="related-card-description">Injecting malicious scripts into web pages</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Find legacy vulnerabilities before attackers do</h2>
			<p>SSI injection is just one of many old patterns that AI tools resurrect in modern code.</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">
				Scan your code now
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M5 12h14M12 5l7 7-7 7"/>
				</svg>
			</a>
		</div>
	</article>
</div>

<style>
	/* Badge row */
	.badge-row {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1rem;
		flex-wrap: wrap;
	}

	/* Data Source Attribution */
	.data-source {
		font-size: 0.75rem;
		color: var(--text-tertiary);
		margin: 0.5rem 0 1.5rem;
	}

	.data-source a {
		color: var(--text-secondary);
	}

	/* Tool Patterns Box */
	.tool-patterns-box {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.tool-patterns-box h3 {
		margin: 0 0 0.75rem;
		font-size: 1rem;
	}

	.tool-patterns-box > p {
		margin: 0 0 1rem;
		color: var(--text-secondary);
	}

	.pattern-note {
		margin: 1rem 0 0 !important;
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.pattern-note code {
		background: var(--bg-tertiary);
		padding: 0.125rem 0.375rem;
		font-size: 0.8125rem;
	}

	/* Consequences List */
	.consequences-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.consequences-list li {
		padding: 0.75rem 0;
		border-bottom: 1px solid var(--border);
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.consequences-list li:last-child {
		border-bottom: none;
	}

	.consequences-list strong {
		color: var(--text-primary);
	}

	/* Fix Sections */
	.fix-section {
		margin: 2rem 0;
	}

	.fix-section h3 {
		margin-bottom: 0.75rem;
	}

	/* Code Comparison */
	.code-comparison {
		display: grid;
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.code-block.vulnerable .code-block-header {
		border-left: 3px solid var(--red);
	}

	.code-block.secure .code-block-header {
		border-left: 3px solid var(--green);
	}

	.status-bad {
		color: var(--red);
	}

	.status-good {
		color: var(--green);
	}

	/* Prevention List */
	.prevention-list ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.prevention-list li {
		padding: 0.75rem 0;
		border-bottom: 1px solid var(--border);
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.prevention-list li:last-child {
		border-bottom: none;
	}

	.prevention-list strong {
		color: var(--text-primary);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.tool-patterns-box {
			padding: 1rem;
		}
	}
</style>
