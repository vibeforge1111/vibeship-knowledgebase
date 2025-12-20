<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Command Injection: When AI Gives Attackers Shell Access',
		description: 'AI tools generate exec() and shell commands with user input, enabling attackers to run arbitrary commands. Learn CWE-78 patterns and use execFile/spawn safely.',
		url: '/kb/security/vulnerabilities/command-injection/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Command Injection' }
	];

	// Real external data sources
	const owaspData = {
		ranking: '#3',
		category: 'A03:2021 - Injection',
		source: 'https://owasp.org/Top10/A03_2021-Injection/',
		cweId: 'CWE-78',
		cweSource: 'https://cwe.mitre.org/data/definitions/78.html'
	};

	// Function comparison data
	const functionComparison = [
		{
			function: 'exec()',
			usesShell: 'Yes',
			safe: false,
			useWhen: 'Never with user input'
		},
		{
			function: 'execFile()',
			usesShell: 'No*',
			safe: true,
			useWhen: 'Running specific binary'
		},
		{
			function: 'spawn()',
			usesShell: 'No*',
			safe: true,
			useWhen: 'Streaming output'
		}
	];

	// FAQ data for schema
	const faqs = [
		{
			question: 'What is command injection?',
			answer: 'Command injection is a vulnerability where attackers insert shell metacharacters (;, |, &&, $()) into user input to execute arbitrary system commands. When your app passes unsanitized input to exec(), attackers can run any command with your app\'s privileges - enabling complete server takeover.'
		},
		{
			question: 'Why is exec() dangerous in Node.js?',
			answer: 'exec() spawns a shell (bash/sh) that interprets metacharacters. When user input contains ; or |, the shell treats them as command separators or pipes. exec("ping " + userIP) with userIP="; rm -rf /" executes both ping AND the destructive command.'
		},
		{
			question: 'How do I safely execute shell commands?',
			answer: 'Use execFile() or spawn() instead of exec(). These pass arguments directly to the program without shell interpretation. Pass arguments as arrays: execFile("ls", ["-la", userPath]) instead of exec("ls -la " + userPath). Never use shell: true with user input.'
		},
		{
			question: 'What\'s the difference between exec and execFile?',
			answer: 'exec() spawns a shell that interprets the command string including metacharacters. execFile() runs the program directly, passing arguments as an array. execFile("ls", ["-la", path]) treats the entire path as one argument - metacharacters aren\'t interpreted.'
		},
		{
			question: 'Can spawn() be vulnerable to command injection?',
			answer: 'spawn() is safe by default because it doesn\'t use a shell. However, if you set shell: true, spawn becomes as dangerous as exec(). Also, some programs interpret arguments as commands (find -exec), so always validate input even with spawn().'
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
			{"@type": "ListItem", "position": 4, "name": "Command Injection"}
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
			"name": "Vibeship"
		},
		"publisher": {
			"@type": "Organization",
			"name": "Vibeship",
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
	<article class="content-main content-wide">
		<!-- Header -->
		<header class="article-header">
			<div class="badge-row">
				<span class="badge badge-critical">Critical</span>
				<span class="badge">CWE-78</span>
				<span class="badge">OWASP A03:2021</span>
			</div>
			<h1>Command Injection</h1>
			<p class="text-secondary">When AI-generated code gives attackers shell access to your server</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Command injection lets attackers run arbitrary system commands when your app passes user input to shell functions like exec().</strong>
				AI tools often generate <code>exec(`command $&#123;userInput&#125;`)</code> patterns.
				Replace exec() with execFile() or spawn() using array arguments.
				<a href={owaspData.source} target="_blank" rel="noopener">OWASP A03:2021 Injection</a>.
			</p>
		</div>

		<!-- Stats Box -->
		<div class="stats-box">
			<h3>Command Injection Severity</h3>
			<div class="stats-grid">
				<div class="stat-item">
					<span class="stat-value">8.8-9.9</span>
					<span class="stat-label">CVSS Score</span>
					<span class="stat-source">Critical Range</span>
				</div>
				<div class="stat-item">
					<span class="stat-value">6.21%</span>
					<span class="stat-label">Copilot Code</span>
					<span class="stat-source">Academic Study</span>
				</div>
				<div class="stat-item">
					<span class="stat-value">#3</span>
					<span class="stat-label">OWASP Top 10</span>
					<span class="stat-source">Injection Category</span>
				</div>
				<div class="stat-item">
					<span class="stat-value">RCE</span>
					<span class="stat-label">Impact</span>
					<span class="stat-source">Remote Code Execution</span>
				</div>
			</div>
			<p class="stats-note">
				Sources: <a href={owaspData.cweSource} target="_blank" rel="noopener">MITRE CWE-78</a>,
				<a href="https://www.cisa.gov/resources-tools/resources/secure-design-alert-eliminating-os-command-injection-vulnerabilities" target="_blank" rel="noopener">CISA</a>,
				<a href="/kb/vibe-coding-tools/github-copilot/">GitHub Copilot Research</a>
			</p>
		</div>

		<!-- What is Command Injection -->
		<section>
			<h2>What is command injection?</h2>
			<p>
				Command injection happens when attackers hijack your shell commands to run their own code on your server. By inserting shell metacharacters like <code>;</code>, <code>|</code>, or <code>&&</code>, they break out of your intended command and execute arbitrary programs.
			</p>
			<p>
				For example, if your code runs <code>ping $&#123;userIP&#125;</code> and an attacker sends <code>8.8.8.8; cat /etc/passwd</code>, the shell runs both ping AND the cat command. This is ranked <a href={owaspData.source} target="_blank" rel="noopener">#3 in OWASP Top 10</a> under the Injection category.
			</p>
			<p>
				The impact is severe: attackers gain complete server takeover, data exfiltration, and can deploy ransomware. <a href="https://www.cisa.gov/resources-tools/resources/secure-design-alert-eliminating-os-command-injection-vulnerabilities" target="_blank" rel="noopener">CISA rates command injection</a> with CVSS scores of 8.8-9.9 (Critical).
			</p>
		</section>

		<!-- How Shell Commands Get Exploited -->
		<section>
			<h2>How do shell metacharacters enable attacks?</h2>
			<p>
				Shell metacharacters are special symbols that shells (bash, sh) interpret as commands rather than text. When user input contains these characters, the shell executes unintended commands:
			</p>

			<div class="metachar-grid">
				<div class="metachar-card">
					<code class="metachar">;</code>
					<span class="metachar-name">Command separator</span>
					<span class="metachar-example">ping; rm -rf /</span>
				</div>
				<div class="metachar-card">
					<code class="metachar">|</code>
					<span class="metachar-name">Pipe</span>
					<span class="metachar-example">ping | cat /etc/passwd</span>
				</div>
				<div class="metachar-card">
					<code class="metachar">&&</code>
					<span class="metachar-name">Chain on success</span>
					<span class="metachar-example">ping && whoami</span>
				</div>
				<div class="metachar-card">
					<code class="metachar">$()</code>
					<span class="metachar-name">Command substitution</span>
					<span class="metachar-example">ping $(whoami)</span>
				</div>
				<div class="metachar-card">
					<code class="metachar">></code>
					<span class="metachar-name">Redirect output</span>
					<span class="metachar-example">echo data > /etc/cron.d/backdoor</span>
				</div>
				<div class="metachar-card">
					<code class="metachar">`</code>
					<span class="metachar-name">Backticks</span>
					<span class="metachar-example">ping `whoami`</span>
				</div>
			</div>

			<p>
				The attacker doesn't just control arguments - they control the entire command. This is why command injection is so dangerous compared to other injection types.
			</p>
		</section>

		<!-- Why AI Tools Generate Vulnerable Code -->
		<section>
			<h2>Why do AI tools generate vulnerable shell commands?</h2>
			<p>
				Vibe coding with AI tools often produces command injection vulnerabilities because AI generates what's common in training data. When you prompt "run a shell command" or "ping a server", AI naturally reaches for <code>exec()</code> with template literals.
			</p>
			<p>
				Academic research on <a href="/kb/vibe-coding-tools/github-copilot/">GitHub Copilot security</a> found that 6.21% of generated code contains <a href={owaspData.cweSource} target="_blank" rel="noopener">CWE-78</a> command injection vulnerabilities. AI tools don't distinguish between trusted and untrusted input - they generate readable, functional code that happens to be insecure.
			</p>
			<p>
				The pattern <code>exec(`command $&#123;variable&#125;`)</code> is cleaner than array-based alternatives, so it appears frequently in vibe coded projects. <a href="/kb/vibe-coding-tools/cursor/">Cursor</a> and <a href="/kb/vibe-coding-tools/claude-code/">Claude Code</a> exhibit similar patterns when asked to execute system commands.
			</p>
		</section>

		<!-- The exec() Trap -->
		<section>
			<h2>How does exec() become a security trap?</h2>
			<p>
				<code>child_process.exec()</code> is a bash interpreter, not a program launcher. Every character in the command string passes through shell interpretation. Here's the vulnerable pattern AI tools generate:
			</p>

			<div class="code-block vulnerable">
				<div class="code-label">Vulnerable - AI-Generated exec()</div>
				<pre><code>{`// VULNERABLE: Common AI-generated pattern
const { exec } = require('child_process')

app.get('/ping', (req, res) => {
  const host = req.query.host

  // Attacker sends: host=8.8.8.8; cat /etc/passwd
  exec(\`ping -c 4 \${host}\`, (error, stdout) => {
    res.send(stdout)
  })
})`}</code></pre>
			</div>

			<p>
				<strong>What happens with malicious input:</strong>
			</p>
			<ol>
				<li><code>exec()</code> spawns a shell (bash/sh)</li>
				<li>Shell interprets <code>;</code> as command separator</li>
				<li>Attacker's command runs with your app's privileges</li>
				<li>Output of <code>cat /etc/passwd</code> returned to attacker</li>
			</ol>
		</section>

		<!-- Function Comparison -->
		<section>
			<h2>What's the difference between exec, execFile, and spawn?</h2>

			<div class="comparison-table-wrapper">
				<table class="comparison-table">
					<thead>
						<tr>
							<th>Function</th>
							<th>Uses Shell</th>
							<th>Safe by Default</th>
							<th>Use When</th>
						</tr>
					</thead>
					<tbody>
						{#each functionComparison as row}
							<tr class:highlight={!row.safe}>
								<td><code>{row.function}</code></td>
								<td>{row.usesShell}</td>
								<td>{row.safe ? '✅ Yes' : '❌ No'}</td>
								<td>{row.useWhen}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<p class="table-note">*Unless <code>shell: true</code> option is set</p>

			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-label">exec() - DANGEROUS</div>
					<pre><code>{`// Shell interprets everything
exec(\`ls -la \${userPath}\`)`}</code></pre>
				</div>
				<div class="code-block secure">
					<div class="code-label">execFile() - SAFE</div>
					<pre><code>{`// Arguments passed directly
execFile('ls', ['-la', userPath])`}</code></pre>
				</div>
			</div>

			<p>
				The key difference: <code>execFile()</code> and <code>spawn()</code> pass arguments directly to the program without shell interpretation. Metacharacters become literal text, not commands. Read the <a href="https://auth0.com/blog/preventing-command-injection-attacks-in-node-js-apps/" target="_blank" rel="noopener">Auth0 guide</a> for more depth.
			</p>
		</section>

		<!-- Pattern 1: Safe execFile -->
		<section>
			<h2>Pattern 1: Safe alternative with execFile()</h2>

			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-label">Vulnerable - exec with user input</div>
					<pre><code>{`const { exec } = require('child_process')

app.get('/fileinfo', (req, res) => {
  const filename = req.query.file
  // INJECTION: ; cat /etc/shadow
  exec(\`ls -la \${filename}\`, (err, stdout) => {
    res.send(stdout)
  })
})`}</code></pre>
				</div>
				<div class="code-block secure">
					<div class="code-label">Secure - execFile with validation</div>
					<pre><code>{`const { execFile } = require('child_process')
const path = require('path')

const ALLOWED_DIR = '/safe/directory'

app.get('/fileinfo', (req, res) => {
  const filename = req.query.file

  // Validate: only allow specific directory
  const safePath = path.join(
    ALLOWED_DIR,
    path.basename(filename)
  )

  // Verify path didn't escape
  if (!safePath.startsWith(ALLOWED_DIR)) {
    return res.status(403).send('Access denied')
  }

  // execFile: args are NOT shell-interpreted
  execFile('ls', ['-la', safePath], (err, stdout) => {
    if (err) {
      return res.status(500).send('Error listing file')
    }
    res.send(stdout)
  })
})`}</code></pre>
				</div>
			</div>

			<p>
				Always combine <code>execFile()</code> with input validation. Use <code>path.basename()</code> to strip directory traversal, and verify the resolved path stays within allowed directories. This protects against both command injection and <a href="/kb/security/vulnerabilities/path-traversal/">path traversal</a>.
			</p>
		</section>

		<!-- Pattern 2: Safe spawn -->
		<section>
			<h2>Pattern 2: Safe spawn() with streaming</h2>

			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-label">Vulnerable - exec for long-running command</div>
					<pre><code>{`app.get('/backup', (req, res) => {
  const dbName = req.query.db
  // INJECTION: ; rm -rf /
  exec(\`pg_dump \${dbName}\`, (err, stdout) => {
    res.send(stdout)
  })
})`}</code></pre>
				</div>
				<div class="code-block secure">
					<div class="code-label">Secure - spawn with allowlist</div>
					<pre><code>{`const { spawn } = require('child_process')

const ALLOWED_DATABASES = ['users', 'products', 'orders']

app.get('/backup', (req, res) => {
  const dbName = req.query.db

  // Allowlist validation - only known values
  if (!ALLOWED_DATABASES.includes(dbName)) {
    return res.status(400).send('Invalid database')
  }

  const backup = spawn('pg_dump', [dbName])

  backup.stdout.pipe(res)

  backup.stderr.on('data', (data) => {
    console.error('Backup error:', data.toString())
  })

  backup.on('error', (err) => {
    res.status(500).send('Backup failed')
  })
})`}</code></pre>
				</div>
			</div>

			<p>
				<code>spawn()</code> is ideal for streaming large outputs. Always use allowlist validation when possible - don't rely on sanitization alone. If the value isn't in your list of known-good values, reject it.
			</p>
		</section>

		<!-- Pattern 3: When You Need Shell Features -->
		<section>
			<h2>Pattern 3: When you must use shell features</h2>
			<p>
				Sometimes you need shell features like pipes or redirects. The safe approach is to use a strict allowlist of predefined commands - never construct commands from user input.
			</p>

			<div class="code-block secure">
				<div class="code-label">Secure - Command from allowlist only</div>
				<pre><code>{`const { exec } = require('child_process')

// Strict allowlist - commands are predefined
const ALLOWED_COMMANDS = {
  'disk-usage': 'df -h',
  'memory': 'free -m',
  'uptime': 'uptime'
}

app.get('/system/:command', (req, res) => {
  const cmd = ALLOWED_COMMANDS[req.params.command]

  if (!cmd) {
    return res.status(400).send('Invalid command')
  }

  // Safe: command comes from allowlist, not user
  exec(cmd, (err, stdout) => {
    if (err) {
      return res.status(500).send('Command failed')
    }
    res.send(stdout)
  })
})`}</code></pre>
			</div>

			<p>
				The user selects from a predefined list - they never provide the actual command text. This is the only safe way to use <code>exec()</code> in production.
			</p>
		</section>

		<!-- Dangerous Patterns to Find -->
		<section>
			<h2>What dangerous patterns should I search for?</h2>
			<p>
				Search your vibe coded projects for these patterns. Each one is a potential command injection vulnerability:
			</p>

			<div class="code-block vulnerable">
				<div class="code-label">Dangerous Patterns to Find</div>
				<pre><code>{`// Pattern 1: Template literals in exec
exec(\`command \${userInput}\`)
exec(\`command \${req.query.param}\`)
exec(\`command \${req.body.value}\`)

// Pattern 2: String concatenation
exec('command ' + userInput)
exec('ls -la ' + filename)

// Pattern 3: Entire command from user
exec(userCommand)
exec(\`\${userCommand}\`)

// Pattern 4: Array joined into command
const options = req.body.options
exec(\`tool \${options.join(' ')}\`)  // Array could contain ;`}</code></pre>
			</div>

			<p>
				Use <a href="https://semgrep.dev/docs/cheat-sheets/javascript-command-injection" target="_blank" rel="noopener">Semgrep</a> or <a href="https://github.com/eslint-community/eslint-plugin-security/blob/main/docs/avoid-command-injection-node.md" target="_blank" rel="noopener">eslint-plugin-security</a> to automatically detect these patterns in your codebase.
			</p>
		</section>

		<!-- Recent CVE -->
		<section>
			<h2>Recent Node.js vulnerability: CVE-2024-27980</h2>
			<p>
				Even <code>spawn()</code> had a vulnerability on Windows. <a href="https://nodejs.org/en/blog/vulnerability/april-2024-security-releases-2" target="_blank" rel="noopener">CVE-2024-27980</a> allowed command injection when executing .bat or .cmd files, even without <code>shell: true</code>.
			</p>
			<p>
				Node.js now returns EINVAL for batch file execution without the shell option. This demonstrates that staying updated is essential - even "safe" functions can have vulnerabilities.
			</p>
		</section>

		<!-- AI Fix Prompt -->
		<section class="fix-section">
			<h2>AI Fix Prompt for Command Injection</h2>
			<p>Copy this prompt to scan your vibe coded project for command injection vulnerabilities:</p>

			<div class="prompt-box">
				<button class="copy-button" onclick={copyPrompt}>
					{copied ? 'Copied!' : 'Copy Prompt'}
				</button>
				<pre id="ai-fix-prompt">{`Review my code for command injection vulnerabilities (CWE-78):

1. **Find exec() with user input**: Search for child_process.exec,
   execSync, or require('child_process').exec that includes:
   - req.query, req.body, req.params values
   - Template literals with variables
   - String concatenation with user data

2. **Replace with safe alternatives**:
   - Use execFile() or spawn() instead of exec()
   - Pass arguments as array, not string
   - Never use shell: true with user input

3. **Validate all input**:
   - Use allowlists for command names
   - Validate/sanitize arguments (alphanumeric only)
   - Use path.basename() for filenames
   - Verify paths stay within allowed directories

4. **Check for indirect injection**:
   - Arrays that get joined into commands
   - Config values that come from user input
   - Environment variables set from requests

For each vulnerability:
- Show the dangerous code
- Show the secure replacement using execFile/spawn
- Note if allowlist validation is also needed`}</pre>
			</div>
		</section>

		<!-- FAQs -->
		<section>
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
			<h2>Related Content</h2>
			<div class="related-grid">
				<a href="/kb/security/vulnerabilities/sql-injection/" class="related-card">
					<span class="related-type">Vulnerability</span>
					<span class="related-title">SQL Injection</span>
				</a>
				<a href="/kb/security/vulnerabilities/path-traversal/" class="related-card">
					<span class="related-type">Vulnerability</span>
					<span class="related-title">Path Traversal</span>
				</a>
				<a href="/kb/security/vulnerabilities/xss/" class="related-card">
					<span class="related-type">Vulnerability</span>
					<span class="related-title">XSS</span>
				</a>
				<a href="/kb/security/vulnerabilities/sensitive-data-exposure/" class="related-card">
					<span class="related-type">Vulnerability</span>
					<span class="related-title">Sensitive Data Exposure</span>
				</a>
				<a href="/kb/vibe-coding-tools/github-copilot/" class="related-card">
					<span class="related-type">AI Tool</span>
					<span class="related-title">GitHub Copilot Security</span>
				</a>
				<a href="/kb/vibe-coding-tools/cursor/" class="related-card">
					<span class="related-type">AI Tool</span>
					<span class="related-title">Cursor Security Patterns</span>
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

	.badge-critical {
		background: #dc2626;
		color: white;
	}

	h1 {
		font-size: 2.5rem;
		margin-bottom: 0.5rem;
	}

	.text-secondary {
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

	.quick-answer-text code {
		background: rgba(0,0,0,0.2);
		padding: 0.125rem 0.375rem;
		border-radius: 3px;
		font-size: 0.9em;
	}

	.stats-box {
		background: var(--surface-1, #1a1a1a);
		border: 1px solid var(--border, #333);
		border-radius: 8px;
		padding: 1.5rem;
		margin-bottom: 2rem;
	}

	.stats-box h3 {
		margin-top: 0;
		margin-bottom: 1rem;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
		gap: 1rem;
	}

	.stat-item {
		text-align: center;
	}

	.stat-value {
		display: block;
		font-size: 1.75rem;
		font-weight: 700;
		color: #dc2626;
	}

	.stat-label {
		display: block;
		font-size: 0.875rem;
		color: var(--text-primary, #fff);
	}

	.stat-source {
		display: block;
		font-size: 0.75rem;
		color: var(--text-secondary, #888);
	}

	.stats-note {
		margin-top: 1rem;
		font-size: 0.75rem;
		color: var(--text-secondary, #888);
	}

	section {
		margin-bottom: 3rem;
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
	}

	p {
		line-height: 1.7;
		margin-bottom: 1rem;
	}

	ol, ul {
		margin: 0 0 1rem 0;
		padding-left: 1.5rem;
	}

	li {
		margin-bottom: 0.5rem;
		line-height: 1.6;
	}

	code {
		font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
		background: rgba(0,0,0,0.3);
		padding: 0.125rem 0.375rem;
		border-radius: 3px;
		font-size: 0.9em;
	}

	/* Metacharacter Grid */
	.metachar-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.metachar-card {
		background: var(--surface-1, #1a1a1a);
		border: 1px solid var(--border, #333);
		border-radius: 8px;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.metachar {
		font-size: 1.5rem;
		color: #dc2626;
		background: transparent;
	}

	.metachar-name {
		font-weight: 600;
		font-size: 0.875rem;
	}

	.metachar-example {
		font-family: 'Fira Code', monospace;
		font-size: 0.75rem;
		color: var(--text-secondary, #888);
	}

	/* Code Blocks */
	.code-comparison {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		margin: 1rem 0;
	}

	@media (max-width: 768px) {
		.code-comparison {
			grid-template-columns: 1fr;
		}
	}

	.code-block {
		background: #0d0d0d;
		border-radius: 6px;
		overflow: hidden;
	}

	.code-block.vulnerable {
		border: 1px solid rgba(220, 38, 38, 0.3);
	}

	.code-block.secure {
		border: 1px solid rgba(34, 197, 94, 0.3);
	}

	.code-label {
		padding: 0.5rem 1rem;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
	}

	.vulnerable .code-label {
		background: rgba(220, 38, 38, 0.1);
		color: #f87171;
	}

	.secure .code-label {
		background: rgba(34, 197, 94, 0.1);
		color: #4ade80;
	}

	pre {
		margin: 0;
		padding: 1rem;
		overflow-x: auto;
		font-size: 0.8rem;
		line-height: 1.5;
	}

	pre code {
		background: transparent;
		padding: 0;
	}

	/* Comparison Table */
	.comparison-table-wrapper {
		overflow-x: auto;
		margin: 1rem 0;
	}

	.comparison-table {
		width: 100%;
		border-collapse: collapse;
	}

	.comparison-table th,
	.comparison-table td {
		padding: 0.75rem;
		text-align: left;
		border-bottom: 1px solid var(--border, #333);
	}

	.comparison-table th {
		font-weight: 600;
		background: var(--surface-1, #1a1a1a);
	}

	.comparison-table tr.highlight {
		background: rgba(220, 38, 38, 0.1);
	}

	.table-note {
		font-size: 0.875rem;
		color: var(--text-secondary, #888);
		margin-top: 0.5rem;
	}

	/* Fix Section */
	.fix-section {
		background: var(--surface-1, #1a1a1a);
		border-radius: 8px;
		padding: 1.5rem;
	}

	.prompt-box {
		position: relative;
		background: #0d0d0d;
		border-radius: 6px;
		overflow: hidden;
	}

	.copy-button {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		padding: 0.5rem 1rem;
		background: #22c55e;
		color: black;
		border: none;
		border-radius: 4px;
		font-size: 0.75rem;
		font-weight: 600;
		cursor: pointer;
	}

	.copy-button:hover {
		background: #16a34a;
	}

	/* FAQ Section */
	.faq-item {
		margin-bottom: 1.5rem;
	}

	.faq-item h3 {
		font-size: 1.1rem;
		margin-bottom: 0.5rem;
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

	a {
		color: #22c55e;
	}

	a:hover {
		color: var(--green);
	}
</style>
