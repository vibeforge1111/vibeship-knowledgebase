<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'SSTI: When AI Template Code Becomes Remote Code Execution',
		description: 'Server-Side Template Injection (SSTI) lets attackers execute code through template engines like Jinja2, EJS, and Pug. AI generates vulnerable patterns. Learn detection and prevention.',
		url: '/kb/security/vulnerabilities/ssti/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'SSTI' }
	];

	// FAQ data for schema
	const faqs = [
		{
			question: 'What is server-side template injection?',
			answer: 'Server-side template injection (SSTI) is a vulnerability where attackers inject malicious expressions into template engines that execute on your server. Unlike XSS which runs in browsers, SSTI runs on your server - meaning attackers can read files, access databases, and execute system commands. It happens when user input is concatenated into template strings instead of passed as data.'
		},
		{
			question: 'How do I detect SSTI vulnerabilities?',
			answer: 'Test input fields with template expressions: {{7*7}}, ${7*7}, or <%= 7*7 %>. If the output shows "49" instead of the literal text, you likely have SSTI. Different template engines use different syntax - Jinja2/Twig use {{, FreeMarker uses ${, and EJS/ERB use <%=. Error messages can also reveal which engine is running.'
		},
		{
			question: 'Is Jinja2 vulnerable to SSTI?',
			answer: 'Jinja2 itself is not inherently vulnerable - the vulnerability comes from how developers use it. When you concatenate user input into template strings (like f"Hello {name}" with render_template_string()), you create SSTI. The secure pattern is passing data as variables: render_template_string("Hello {{ name }}", name=user_input). Jinja2\'s autoescape prevents XSS but does not prevent SSTI.'
		},
		{
			question: "What's the difference between SSTI and XSS?",
			answer: 'Location of execution is the key difference. XSS (Cross-Site Scripting) executes malicious code in the victim\'s browser - attackers can steal cookies or hijack sessions. SSTI (Server-Side Template Injection) executes on your server - attackers can read files, access databases, and run system commands. SSTI is typically more severe because it leads to Remote Code Execution (RCE), while XSS is limited to browser context.'
		},
		{
			question: 'How do I prevent template injection in Node.js?',
			answer: "Never concatenate user input into template strings. With EJS, use res.render('template', { data: userInput }) instead of building template strings dynamically. With Pug, pass data objects rather than interpolating into the template source. Avoid using eval() or Function() constructors. If you must render user-controlled templates, use a sandboxed environment and strictly validate input against an allowlist."
		}
	];

	const aiFixPrompt = `Review my codebase for Server-Side Template Injection (SSTI) vulnerabilities (CWE-1336):

## Check 1: Template String Construction
Search for patterns where user input enters template strings:
- Python: f"...{user_input}...", "..." + user_input, render_template_string()
- Node.js: \`...\${userInput}...\` with template engines, ejs.render()
- PHP: "...$variable..." with Twig/Blade
- Java: String concatenation into FreeMarker/Velocity templates

Flag: Any user input concatenated into template strings

## Check 2: Dynamic Template Names
Look for user-controlled template selection:
- render(req.params.template)
- render_template(user_input)
- Template path derived from user input
- Include statements with variable paths

## Check 3: Unsafe Helper Registration
In Handlebars/custom engines, check for:
- Helpers that execute shell commands
- Helpers that access the filesystem
- Helpers using eval() or exec()
- Custom filters with dangerous operations

## Check 4: Template Engine Configuration
Verify secure defaults:
- Jinja2: sandbox mode for untrusted templates
- EJS: avoid client option for untrusted data
- Twig: sandbox policy enabled
- FreeMarker: secure configuration

## Secure Patterns by Engine

Jinja2 (Python/Flask):
\`\`\`python
# SECURE: Pass data as template variables
return render_template('greeting.html', name=user_input)
# Or with inline templates
return render_template_string("Hello {{ name }}", name=user_input)
\`\`\`

EJS (Node.js/Express):
\`\`\`javascript
// SECURE: Use data object, never concatenate
res.render('page', {name: userInput})
// In template: <%= name %> for escaped output
\`\`\`

Pug (Node.js):
\`\`\`javascript
// SECURE: Pass data object
res.render('template', {name: userInput})
// In template: h1= name (interpolated and escaped)
\`\`\`

Twig (PHP):
\`\`\`php
// SECURE: Use named template with data
echo $twig->render('hello.twig', ['name' => $name]);
\`\`\`

FreeMarker (Java):
\`\`\`java
// SECURE: Use data model
template.process(dataModel, out);
\`\`\`

For each vulnerability found:
1. Show the vulnerable code with line numbers
2. Demonstrate how {{7*7}} or \${7*7} would evaluate
3. Explain the RCE path for that specific engine
4. Provide secure replacement with data passed as variables
5. If render_template_string() is used, suggest switching to file-based templates`;

	let copied = $state(false);

	function copyPrompt() {
		navigator.clipboard.writeText(aiFixPrompt);
		copied = true;
		setTimeout(() => copied = false, 2000);
	}
</script>

<svelte:head>
	<title>{meta.title}</title>
	<meta name="description" content={meta.description} />
	<meta name="keywords" content="SSTI, server-side template injection, template injection, Jinja2 SSTI, EJS security, CWE-1336, vibe coding security" />
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
			{"@type": "ListItem", "position": 4, "name": "SSTI"}
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
		"author": {"@type": "Organization", "name": "Vibeship"},
		"publisher": {"@type": "Organization", "name": "Vibeship", "url": "https://vibeship.co"},
		"datePublished": "2024-12-17",
		"dateModified": "2024-12-17"
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
			"acceptedAnswer": {"@type": "Answer", "text": faq.answer}
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
				<span class="badge badge-critical">Critical Severity</span>
				<span class="badge">CWE-1336</span>
				<span class="badge">OWASP A03:2021</span>
			</div>
			<h1>SSTI: When AI Template Code Becomes Remote Code Execution</h1>
			<p class="text-secondary">Server-Side Template Injection leads to full server compromise</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Server-Side Template Injection lets attackers execute code by injecting template expressions into your app.</strong>
				AI tools generate vulnerable code that concatenates user input into templates. The fix: always pass user data as template variables, never embed it in the template string itself.
				Classified as <a href="https://cwe.mitre.org/data/definitions/1336.html">CWE-1336</a>.
			</p>
		</div>

		<!-- Stats -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value critical">RCE</div>
				<div class="stat-label">Typical Impact</div>
			</div>
			<div class="stat-box">
				<div class="stat-value critical">Critical</div>
				<div class="stat-label">Severity</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">#3</div>
				<div class="stat-label">OWASP Injection</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">8+</div>
				<div class="stat-label">Major Engines Affected</div>
			</div>
		</div>

		<!-- What Is It -->
		<section class="article-section">
			<h2>What is Server-Side Template Injection?</h2>
			<p>
				Server-Side Template Injection (SSTI) is a vulnerability where user input is embedded directly into server-side templates, allowing attackers to inject malicious expressions that execute on your server. Template engines like Jinja2, EJS, and Pug process special syntax - and if attackers can inject that syntax, they control what runs on your server.
			</p>
			<p>
				Think of templates like fill-in-the-blank documents. Normally, you fill in the blanks with data. SSTI is like letting someone rewrite the document itself. Instead of filling in "name: John", they inject code that reads your database or executes system commands.
			</p>
			<p>
				SSTI is part of the <a href="https://owasp.org/Top10/A03_2021-Injection/">OWASP A03:2021 Injection</a> category. Unlike <a href="/kb/security/vulnerabilities/xss/">XSS</a> which runs in browsers, SSTI runs on your server - making it typically more severe. A successful SSTI attack usually leads to Remote Code Execution (RCE), giving attackers complete control over your server.
			</p>
		</section>

		<!-- How Attacks Work -->
		<section class="article-section">
			<h2>How SSTI Attacks Work</h2>
			<p>
				SSTI attacks follow a predictable pattern: detection, engine identification, and exploitation. Attackers test whether template expressions are evaluated, determine which engine is running, then craft payloads specific to that engine.
			</p>

			<h3>Step 1: Detection</h3>
			<p>Attackers inject simple mathematical expressions to test if templates are processed:</p>

			<div class="code-block">
				<pre><code># Test payloads
Input: {"{{"}7*7{"}}"}
Output: 49  ← SSTI confirmed!

Input: ${"${"}7*7{"}"}
Output: 49  ← SSTI confirmed!

Input: {"<%="}7*7{"%>"}
Output: 49  ← SSTI confirmed!</code></pre>
			</div>

			<p>If the output shows "49" instead of the literal text, the template engine evaluated the expression - confirming SSTI vulnerability exists.</p>

			<h3>Step 2: Engine Identification</h3>
			<p>Different engines use different syntax. Attackers identify the engine to craft appropriate exploits:</p>

			<div class="table-wrapper">
				<table>
					<thead>
						<tr>
							<th>Syntax</th>
							<th>Template Engines</th>
							<th>Language</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>{"{{"}...{"}}"}</code></td>
							<td>Jinja2, Twig, Django</td>
							<td>Python, PHP</td>
						</tr>
						<tr>
							<td><code>{"${"}...{"}"}</code></td>
							<td>FreeMarker, Velocity</td>
							<td>Java</td>
						</tr>
						<tr>
							<td><code>{"<%="}...{"%>"}</code></td>
							<td>EJS, ERB</td>
							<td>Node.js, Ruby</td>
						</tr>
						<tr>
							<td><code>#{"{}"}...</code></td>
							<td>Pug (Jade)</td>
							<td>Node.js</td>
						</tr>
					</tbody>
				</table>
			</div>

			<h3>Step 3: Exploitation</h3>
			<p>Once the engine is identified, attackers use engine-specific payloads to achieve RCE. Here's a Jinja2 example that reads system files:</p>

			<div class="code-block">
				<pre><code># Jinja2 payload to read /etc/passwd
{"{{"}''.__class__.__mro__[1].__subclasses__()[40]('/etc/passwd').read(){"}}"}

# Execute system commands
{"{{"}config.__class__.__init__.__globals__['os'].popen('id').read(){"}}"}</code></pre>
			</div>

			<p>The <a href="https://portswigger.net/web-security/server-side-template-injection">PortSwigger SSTI guide</a> documents exploitation techniques for various engines in detail.</p>
		</section>

		<!-- Why AI Generates Vulnerable Code -->
		<section class="article-section">
			<h2>Why AI Tools Generate Vulnerable Code</h2>
			<p>
				AI coding tools like <a href="/kb/vibe-coding-tools/cursor/">Cursor</a>, <a href="/kb/vibe-coding-tools/claude-code/">Claude Code</a>, and <a href="/kb/vibe-coding-tools/bolt/">Bolt</a> frequently generate SSTI-vulnerable code because string concatenation feels "natural" for dynamic content. When vibe coders ask for personalized templates, AI reaches for f-strings and template literals.
			</p>

			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-label">AI-Generated (Vulnerable)</div>
					<pre><code># Flask/Jinja2 - AI's typical output
@app.route('/greet')
def greet():
    name = request.args.get('name')
    # Direct concatenation into template
    template = f"&lt;h1&gt;Welcome, {"{"}name{"}"}!&lt;/h1&gt;"
    return render_template_string(template)

# Attack: ?name={"{{"}config.items(){"}}"}</code></pre>
				</div>
				<div class="code-block secure">
					<div class="code-label">Secure Pattern</div>
					<pre><code># Flask/Jinja2 - Correct approach
@app.route('/greet')
def greet():
    name = request.args.get('name')
    # Pass data as variable, not in template string
    return render_template_string(
        "&lt;h1&gt;Welcome, {"{{"}name{"}}"}!&lt;/h1&gt;",
        name=name
    )</code></pre>
				</div>
			</div>

			<h3>Common AI Patterns That Create SSTI</h3>
			<div class="code-block">
				<pre><code># Pattern 1: f-string templates (Python)
template = f"Hello {"{"}user_input{"}"}"
render_template_string(template)

# Pattern 2: Template literal concatenation (Node.js)
const template = `&lt;div&gt;${"{"}userInput{"}"}&lt;/div&gt;`
ejs.render(template)

# Pattern 3: String addition
template = "Hello " + user_input + "!"
render_template_string(template)</code></pre>
			</div>
		</section>

		<!-- Secure Patterns -->
		<section class="article-section">
			<h2>Secure Patterns by Template Engine</h2>
			<p>
				The fix is consistent across all engines: never concatenate user input into template strings. Always pass data as separate variables.
			</p>

			<h3>Jinja2 (Python/Flask)</h3>
			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-label">Vulnerable</div>
					<pre><code># NEVER do this
return render_template_string(
    f"Hello {"{"}name{"}"}"
)</code></pre>
				</div>
				<div class="code-block secure">
					<div class="code-label">Secure</div>
					<pre><code># Always pass data as variables
return render_template_string(
    "Hello {"{{"}name{"}}"}",
    name=name
)

# Or use file-based templates (preferred)
return render_template(
    'greeting.html',
    name=name
)</code></pre>
				</div>
			</div>

			<h3>EJS (Node.js/Express)</h3>
			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-label">Vulnerable</div>
					<pre><code>// NEVER build template strings
const html = ejs.render(
    `&lt;p&gt;${"{"}userInput{"}"}&lt;/p&gt;`
)</code></pre>
				</div>
				<div class="code-block secure">
					<div class="code-label">Secure</div>
					<pre><code>// Pass data object to template
res.render('page', {"{"}
    name: userInput
{"}"})

// In template file:
// &lt;p&gt;{"<%="}name{"%>"}&lt;/p&gt; (escaped)</code></pre>
				</div>
			</div>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How to Detect SSTI</h2>
			<p>
				Detection involves testing for template expression evaluation and identifying which engine is running. The <a href="https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Input_Validation_Testing/18-Testing_for_Server-side_Template_Injection">OWASP SSTI Testing Guide</a> provides comprehensive methodology.
			</p>

			<h3>Manual Testing</h3>
			<p>Inject these payloads into any user input field:</p>

			<div class="code-block">
				<pre><code># Universal detection payloads
{"{{"}7*7{"}}"}        → 49 = Jinja2/Twig/Django
${"${"}7*7{"}"}        → 49 = FreeMarker/Velocity
{"<%="}7*7{"%>"}       → 49 = EJS/ERB
#{"{}"}7*7             → 49 = Pug
${"{{"}7*7{"}}"}       → 49 = Smarty

# Error-based detection
${"{{"}               → Error message reveals engine
${"${"}               → Error message reveals engine</code></pre>
			</div>

			<h3>Automated Tools</h3>
			<ul>
				<li><a href="https://github.com/epinna/tplmap">Tplmap</a> - Automated SSTI detection and exploitation</li>
				<li><a href="https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/Server%20Side%20Template%20Injection">PayloadsAllTheThings</a> - Payload collection for various engines</li>
				<li>SAST tools - Opengrep, Trivy can detect vulnerable patterns in code</li>
			</ul>
		</section>

		<!-- SSTI vs XSS -->
		<section class="article-section">
			<h2>SSTI vs XSS: Understanding the Difference</h2>
			<p>Both are injection vulnerabilities, but they execute in different places with vastly different impacts.</p>

			<div class="table-wrapper">
				<table>
					<thead>
						<tr>
							<th>Aspect</th>
							<th>SSTI</th>
							<th>XSS</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><strong>Execution Location</strong></td>
							<td>Server</td>
							<td>Browser</td>
						</tr>
						<tr>
							<td><strong>Typical Impact</strong></td>
							<td>Remote Code Execution</td>
							<td>Session hijacking, defacement</td>
						</tr>
						<tr>
							<td><strong>What Attacker Accesses</strong></td>
							<td>Server files, databases, system commands</td>
							<td>User's browser session, cookies</td>
						</tr>
						<tr>
							<td><strong>Severity</strong></td>
							<td>Critical (server compromise)</td>
							<td>High (user account compromise)</td>
						</tr>
					</tbody>
				</table>
			</div>

			<p>Important: Jinja2's autoescape prevents XSS but NOT SSTI. Learn more about <a href="/kb/security/vulnerabilities/xss/">XSS prevention</a>.</p>
		</section>

		<!-- AI Fix Prompt -->
		<section class="article-section">
			<h2>AI Fix Prompt for SSTI</h2>
			<p>Copy this prompt to your AI coding tool to audit your codebase for Server-Side Template Injection vulnerabilities:</p>

			<div class="fix-prompt">
				<div class="fix-prompt-header">
					<span class="fix-prompt-label">SSTI Audit Prompt</span>
					<button class="copy-btn" class:copied onclick={copyPrompt}>
						{copied ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<div class="fix-prompt-content">{aiFixPrompt}</div>
			</div>

			<p>
				This prompt guides <a href="/kb/vibe-coding-tools/cursor/">Cursor</a>, <a href="/kb/vibe-coding-tools/claude-code/">Claude Code</a>, or other AI tools through a systematic review of template usage patterns.
			</p>
		</section>

		<!-- Notable CVEs -->
		<section class="article-section">
			<h2>Notable SSTI Vulnerabilities</h2>
			<ul>
				<li><strong>CVE-2024-34359</strong> - llama_cpp_python: Jinja2 SSTI in Python LLM bindings, allowing RCE</li>
				<li><strong>CVE-2020-12790</strong> - Twig: Template injection leading to code execution in Symfony</li>
				<li><strong>CVE-2019-19999</strong> - FreeMarker: Unsafe default configuration allowing SSTI in Java apps</li>
			</ul>
		</section>

		<!-- FAQ -->
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
		<section class="article-section">
			<h2>Related Security Topics</h2>
			<div class="related-grid">
				<a href="/kb/security/vulnerabilities/xss/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Cross-Site Scripting (XSS)</div>
					<p class="related-card-description">Client-side injection - compare with SSTI</p>
				</a>
				<a href="/kb/security/vulnerabilities/command-injection/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Command Injection</div>
					<p class="related-card-description">Another path to RCE through shell commands</p>
				</a>
				<a href="/kb/security/vulnerabilities/sql-injection/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">SQL Injection</div>
					<p class="related-card-description">Database injection in the OWASP Injection family</p>
				</a>
				<a href="/kb/security/vulnerabilities/insecure-deserialization/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Insecure Deserialization</div>
					<p class="related-card-description">Another code execution vulnerability in data handling</p>
				</a>
			</div>
		</section>

		<!-- CTA -->
		<section class="final-cta">
			<h2>Scan Your Code for SSTI</h2>
			<p>vibeship scanner automatically detects template injection vulnerabilities in your AI-generated code across Jinja2, EJS, Pug, Twig, and more.</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">Scan Your Repository</a>
		</section>
	</article>
</div>

<style>
	/* Quick Answer */
	.quick-answer {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-left: 3px solid var(--green-dim);
		padding: 1.25rem;
		margin-bottom: 2rem;
	}

	.quick-answer-label {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--green-dim);
		margin-bottom: 0.5rem;
	}

	.quick-answer-text {
		margin: 0;
		color: var(--text-secondary);
	}

	/* Stats Row */
	.stats-row {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
		margin-bottom: 2rem;
	}

	@media (max-width: 768px) {
		.stats-row {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	/* Code Label for comparison blocks */
	.code-label {
		padding: 0.5rem 1rem;
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		background: var(--bg-secondary);
		border-bottom: 1px solid var(--border);
	}

	.vulnerable .code-label {
		color: var(--red);
	}

	.secure .code-label {
		color: var(--green);
	}

	/* Fix prompt content scrolling */
	.fix-prompt-content {
		max-height: 400px;
		overflow-y: auto;
	}
</style>
