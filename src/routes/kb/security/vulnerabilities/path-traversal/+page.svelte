<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Path Traversal: Stop Attackers Escaping Your Directories',
		description: 'Path traversal lets attackers read files outside your app directory using ../. Found in file uploads and downloads. Get AI fix prompts for Node.js and Next.js.',
		url: '/kb/security/vulnerabilities/path-traversal/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Path Traversal' }
	];

	// Real external data sources
	const owaspData = {
		ranking: '#1',
		category: 'A01:2021 - Broken Access Control',
		source: 'https://owasp.org/Top10/A01_2021-Broken_Access_Control/',
		cweId: 'CWE-22',
		cweSource: 'https://cwe.mitre.org/data/definitions/22.html'
	};

	// FAQ data for schema
	const faqs = [
		{
			question: 'What is path traversal vulnerability?',
			answer: 'Path traversal (also called directory traversal or CWE-22) is a vulnerability where attackers use special character sequences like ../ to escape the intended directory and access files elsewhere on the server. This can expose sensitive files like /etc/passwd, configuration files, or your .env file containing secrets.'
		},
		{
			question: 'How do I prevent path traversal in Node.js?',
			answer: 'Use path.resolve() to get the absolute path, then verify it starts with your allowed base directory plus the path separator. For example: if (!filepath.startsWith(UPLOADS_DIR + path.sep)) return error. Never trust user-supplied filenames without validation.'
		},
		{
			question: 'What is the difference between path traversal and LFI?',
			answer: 'Path traversal is the technique of using ../ sequences to navigate directories. LFI (Local File Inclusion) is an attack that uses path traversal to include local files in application output, often to execute code or read sensitive data. LFI is essentially path traversal exploited in include/require functions.'
		},
		{
			question: 'Can path traversal lead to remote code execution?',
			answer: 'Yes. If attackers can traverse to writable directories, they may upload malicious files then access them. They might also overwrite configuration files, access log files for log poisoning attacks, or read source code to find other vulnerabilities. The risk depends on what files are accessible.'
		},
		{
			question: 'How do I test for path traversal vulnerabilities?',
			answer: 'Test by sending ../ sequences in any parameter that handles file paths: upload filenames, download parameters, image sources. Try URL encoding (%2e%2e%2f), double encoding (%252e%252e%252f), and backslashes on Windows. Tools like Burp Suite can automate this testing.'
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
			{"@type": "ListItem", "position": 4, "name": "Path Traversal"}
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
				<span class="badge badge-high">High</span>
				<span class="badge">CWE-22</span>
				<span class="badge">OWASP A01:2021</span>
			</div>
			<h1>Path Traversal in Vibe Coded Apps</h1>
			<p class="text-secondary">How attackers escape your directories to read sensitive files like .env and /etc/passwd</p>
		</header>

		<!-- Quick Answer - MUST be under 50 words -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Path traversal happens when attackers use <code>../</code> sequences to escape your intended directory and read files like your <code>.env</code> file.</strong>
				AI tools generate vulnerable file handling code. Always validate that resolved paths stay within allowed directories.
			</p>
		</div>

		<!-- Stats Box - Real OWASP Data -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">{owaspData.ranking}</div>
				<div class="stat-label">OWASP Ranking</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">{owaspData.cweId}</div>
				<div class="stat-label"><a href={owaspData.cweSource}>CWE ID</a></div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Top 25</div>
				<div class="stat-label">CWE Most Dangerous</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">High</div>
				<div class="stat-label">Severity</div>
			</div>
		</div>
		<p class="data-source">
			Source: <a href={owaspData.source}>OWASP Top 10 (2021)</a> - Path traversal is part of Broken Access Control
		</p>

		<!-- What Is It -->
		<section class="article-section">
			<h2>What is path traversal?</h2>
			<p>
				Path traversal (also called directory traversal) is a vulnerability where attackers use <code>../</code> sequences to escape your intended directory and access files elsewhere on the server.
				When your code uses user input to construct file paths without validation, attackers can read sensitive files like <code>/etc/passwd</code>, configuration files, or your <code>.env</code> file containing API keys.
			</p>
			<p>
				Think of it like an elevator that should only go to floors 1-10, but hackers trick it into going to the basement where secrets are stored by pressing "-1" repeatedly.
			</p>
			<p>
				According to <a href="https://owasp.org/Top10/A01_2021-Broken_Access_Control/">OWASP Top 10 (2021)</a>, path traversal falls under Broken Access Control, ranked #1.
				<a href="https://cwe.mitre.org/data/definitions/22.html">CWE-22</a> is in the CWE Top 25 Most Dangerous Software Weaknesses.
				For vibe coders building file upload or download features, this is critical because AI tools generate vulnerable patterns by default.
			</p>
		</section>

		<!-- AI Tool Patterns -->
		<section class="article-section">
			<h2>How do AI tools cause path traversal?</h2>
			<p>
				AI tools generate path traversal vulnerabilities by creating simple, functional file handling code that concatenates user input directly into file paths.
				When you ask for a "file download endpoint" or "file upload feature," AI prioritizes working code over secure code.
			</p>

			<div class="tool-patterns-box">
				<h3>Dangerous pattern: AI-generated file download</h3>
				<p>When you ask AI for a file download feature, it often generates this:</p>
				<div class="code-block">
					<pre><code>{`// VULNERABLE: AI generates this for "download file" feature
app.get('/download', (req, res) => {
  const filename = req.query.file
  const filepath = \`./uploads/\${filename}\` // DANGEROUS!
  res.sendFile(filepath)
})

// Attacker uses: /download?file=../../../etc/passwd
// Result: Server sends /etc/passwd to attacker`}</code></pre>
				</div>
				<p class="pattern-note">
					This code <em>works</em> for legitimate users, which is why AI generates it. But it allows attackers to escape the uploads directory using <code>../</code> sequences.
				</p>
			</div>

			<p>
				<strong>The false sense of security:</strong> Many vibe coders add <code>path.resolve()</code> thinking it prevents traversal. It doesn't. <code>path.resolve()</code> normalizes the path but doesn't restrict it. You must verify the result stays within your allowed directory.
			</p>

			<p>
				Common vulnerable features in vibe coded apps include file downloads, image uploads, user avatar handling, document exports, and any endpoint that takes a filename parameter.
				Tools like <a href="/kb/vibe-coding-tools/cursor/">Cursor</a>, <a href="/kb/vibe-coding-tools/bolt/">Bolt</a>, and <a href="/kb/vibe-coding-tools/claude-code/">Claude Code</a> can all generate these patterns.
			</p>
		</section>

		<!-- Common Patterns -->
		<section class="article-section">
			<h2>What attack patterns do hackers use?</h2>
			<p>
				Attackers use various encoding and sequence techniques to bypass weak filters. Simply removing <code>../</code> from input is not sufficient.
			</p>

			<div class="patterns-list">
				<div class="pattern-item">
					<h4>Basic traversal</h4>
					<code>../../../etc/passwd</code>
					<p>Simple sequence that works when there's no filtering at all.</p>
				</div>
				<div class="pattern-item">
					<h4>URL encoded</h4>
					<code>%2e%2e%2f%2e%2e%2f%2e%2e%2fetc%2fpasswd</code>
					<p>Bypasses filters that check for literal <code>../</code> but don't decode first.</p>
				</div>
				<div class="pattern-item">
					<h4>Double encoding</h4>
					<code>%252e%252e%252f</code>
					<p>Bypasses filters that decode once. Gets decoded twice by the server.</p>
				</div>
				<div class="pattern-item">
					<h4>Windows backslash</h4>
					<code>..\..\..\windows\system32\config\sam</code>
					<p>Windows accepts both <code>/</code> and <code>\</code> as separators.</p>
				</div>
				<div class="pattern-item">
					<h4>Filter bypass</h4>
					<code>....//....//....//etc/passwd</code>
					<p>If filter removes <code>../</code> once, this becomes <code>../../../etc/passwd</code>.</p>
				</div>
			</div>

			<p>
				According to <a href="https://portswigger.net/web-security/file-path-traversal">PortSwigger</a>, these bypass techniques are commonly successful because developers implement incomplete fixes.
			</p>
		</section>

		<!-- What Could Happen -->
		<section class="article-section">
			<h2>What could happen if I have path traversal?</h2>
			<p>
				Path traversal can lead to sensitive file exposure, configuration theft, source code leaks, and in some cases remote code execution.
			</p>
			<ul class="consequences-list">
				<li><strong>Secrets exposure:</strong> Attackers read your <code>.env</code> file containing API keys, database credentials, and JWT secrets - see <a href="/kb/security/vulnerabilities/hardcoded-secrets/">hardcoded secrets</a></li>
				<li><strong>Configuration theft:</strong> Access to <code>/etc/passwd</code>, database configs, cloud credentials</li>
				<li><strong>Source code leak:</strong> Reading your application code exposes business logic and other vulnerabilities</li>
				<li><strong>Data destruction:</strong> If combined with write access, attackers can overwrite or delete files</li>
				<li><strong>Code execution:</strong> Overwriting executable files or configs can lead to server compromise</li>
			</ul>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How do I detect path traversal?</h2>
			<p>
				Search for file path construction that uses user input. Any code that builds paths from request parameters is potentially vulnerable.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Patterns to search for</span>
				</div>
				<pre><code>{`// User input in file paths (DANGEROUS)
const filepath = \`./uploads/\${req.query.file}\`
const filepath = path.join(uploadDir, filename)
const filepath = uploadDir + '/' + userInput

// File operations with user input (DANGEROUS)
res.sendFile(filepath)
fs.readFile(filepath)
fs.writeFile(filepath, data)
fs.createReadStream(filepath)

// path.resolve WITHOUT validation (STILL DANGEROUS)
const filepath = path.resolve('./uploads', filename)
res.sendFile(filepath) // No check if it's still in uploads!

// Regex to find vulnerable patterns:
// (sendFile|readFile|writeFile|createReadStream)\\s*\\([^)]*\\$\\{
// path\\.(join|resolve)\\s*\\([^)]*req\\.(query|params|body)`}</code></pre>
			</div>

			<div class="cta-box">
				<p><strong>Don't want to search manually?</strong></p>
				<a href="https://scanner.vibeship.co" class="btn btn-green">
					Scan your code free
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M5 12h14M12 5l7 7-7 7"/>
					</svg>
				</a>
			</div>
		</section>

		<!-- How to Fix -->
		<section class="article-section">
			<h2>How do I fix path traversal?</h2>
			<p>
				Fix path traversal by validating that the resolved path stays within your allowed directory. Use <code>path.resolve()</code> to get the absolute path, then check it starts with your base directory.
			</p>

			<!-- AI Fix Prompt -->
			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>Copy this prompt into Cursor, Claude Code, or Bolt to automatically fix path traversal in your codebase:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Fix all path traversal vulnerabilities in my codebase.

## What to look for

Search for these dangerous patterns:

1. File path construction with user input:
   - \`./uploads/\${filename}\`
   - path.join(baseDir, userInput)
   - path.resolve(baseDir, userInput) WITHOUT validation

2. File operations with dynamic paths:
   - res.sendFile(filepath)
   - fs.readFile(filepath)
   - fs.writeFile(filepath, data)
   - fs.createReadStream(filepath)

3. File upload handling:
   - multer, express-fileupload, formidable
   - Anywhere originalname or filename from upload is used

## How to fix

Always validate the resolved path is within the allowed directory:

### For file downloads:
\`\`\`javascript
// Before (vulnerable)
app.get('/download', (req, res) => {
  const filename = req.query.file
  const filepath = path.resolve('./uploads', filename)
  res.sendFile(filepath) // DANGEROUS - no validation!
})

// After (secure)
const UPLOADS_DIR = path.resolve('./uploads')

app.get('/download', (req, res) => {
  const filename = req.query.file
  const filepath = path.resolve(UPLOADS_DIR, filename)

  // CRITICAL: Verify path is within uploads directory
  if (!filepath.startsWith(UPLOADS_DIR + path.sep)) {
    return res.status(403).send('Access denied')
  }

  res.sendFile(filepath)
})
\`\`\`

### For file uploads:
\`\`\`javascript
// Sanitize uploaded filenames
function sanitizeFilename(filename) {
  // path.basename removes directory components
  // Replace special chars with underscore
  return path.basename(filename).replace(/[^a-zA-Z0-9._-]/g, '_')
}
\`\`\`

### For Next.js API routes:
\`\`\`typescript
const FILES_DIR = path.resolve(process.cwd(), 'public/files')

export async function GET(request, { params }) {
  const filename = params.filename
  const filepath = path.resolve(FILES_DIR, filename)

  // Validate path is within allowed directory
  if (!filepath.startsWith(FILES_DIR + path.sep)) {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 })
  }

  // ... serve file
}
\`\`\`

## Framework-specific notes

- Express: Check all res.sendFile, res.download calls
- Next.js: Check API routes under /app/api/ and /pages/api/
- File uploads: Sanitize filename before saving, validate path before serving
- Remember: path.sep is '\\' on Windows, '/' on Unix

## After fixing

1. Search for remaining patterns: (sendFile|readFile|writeFile|download)
2. Ensure all file paths are validated against base directory
3. Test with ../ in filenames to verify fix works
4. List all files you modified with before/after snippets

Please proceed systematically through my codebase.`}</div>
				</div>
			</div>

			<!-- Manual Fix -->
			<div class="fix-section">
				<h3>Manual Fix</h3>
				<p>The fix is: <strong>resolve the path, then verify it's still inside your allowed directory</strong>. Never trust user-supplied filenames.</p>

				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-block-header">
							<span class="code-block-lang status-bad">VULNERABLE</span>
						</div>
						<pre><code>{`// path.resolve alone is NOT enough!
const path = require('path')

app.get('/download', (req, res) => {
  const filename = req.query.file
  const filepath = path.resolve('./uploads', filename)
  res.sendFile(filepath) // STILL DANGEROUS!
})

// Attacker inputs: ../../../etc/passwd
// path.resolve returns: /etc/passwd
// File is served - attack succeeds!`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-block-header">
							<span class="code-block-lang status-good">SECURE</span>
						</div>
						<pre><code>{`// Validate resolved path stays in allowed directory
const path = require('path')
const UPLOADS_DIR = path.resolve('./uploads')

app.get('/download', (req, res) => {
  const filename = req.query.file
  const filepath = path.resolve(UPLOADS_DIR, filename)

  // CRITICAL: Check path is within uploads
  if (!filepath.startsWith(UPLOADS_DIR + path.sep)) {
    return res.status(403).send('Access denied')
  }

  res.sendFile(filepath)
})

// Attacker inputs: ../../../etc/passwd
// filepath resolves to: /etc/passwd
// Check fails: /etc/passwd doesn't start with /uploads/
// Returns 403 - attack blocked!`}</code></pre>
					</div>
				</div>

				<p>
					<strong>Why <code>+ path.sep</code>?</strong> Without the separator, <code>/uploads-evil/file.txt</code> would pass the check because it starts with <code>/uploads</code>.
					Adding the separator ensures only paths <em>inside</em> the directory are allowed.
				</p>
			</div>

			<!-- Framework-Specific -->
			<div class="fix-section">
				<h3>Framework-specific patterns</h3>
				<div class="framework-links">
					<a href="/kb/security/stacks/nextjs-supabase/" class="card card-interactive">
						<span class="framework-name">Next.js</span>
						<span class="framework-desc">API routes & file serving</span>
					</a>
					<a href="/kb/security/vulnerabilities/missing-auth/" class="card card-interactive">
						<span class="framework-name">Express</span>
						<span class="framework-desc">sendFile & middleware</span>
					</a>
					<a href="/kb/security/vulnerabilities/idor/" class="card card-interactive">
						<span class="framework-name">IDOR</span>
						<span class="framework-desc">Related access control issues</span>
					</a>
					<a href="/kb/security/vulnerabilities/hardcoded-secrets/" class="card card-interactive">
						<span class="framework-name">.env protection</span>
						<span class="framework-desc">What attackers target</span>
					</a>
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
				<a href="/kb/security/vulnerabilities/hardcoded-secrets/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Hardcoded Secrets</div>
					<p class="related-card-description">What attackers find when they read your .env</p>
				</a>
				<a href="/kb/security/vulnerabilities/idor/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">IDOR</div>
					<p class="related-card-description">Related access control vulnerability</p>
				</a>
				<a href="/kb/vibe-coding-tools/cursor/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Cursor Security Patterns</div>
					<p class="related-card-description">Common vulnerabilities in Cursor-generated code</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Scan your code for path traversal</h2>
			<p>Check your codebase for path traversal and other file handling vulnerabilities in AI-generated code.</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">
				Try Vibeship Scanner
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

	/* Badge High severity */
	.badge-high {
		background: var(--orange-dim, rgba(255, 152, 0, 0.15));
		color: var(--orange, #ff9800);
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

	/* Patterns List */
	.patterns-list {
		display: grid;
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.pattern-item {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1rem;
	}

	.pattern-item h4 {
		margin: 0 0 0.5rem;
		font-size: 0.875rem;
		color: var(--text-primary);
	}

	.pattern-item code {
		display: block;
		background: var(--bg-tertiary);
		padding: 0.5rem;
		margin: 0.5rem 0;
		font-size: 0.8125rem;
		word-break: break-all;
	}

	.pattern-item p {
		margin: 0;
		font-size: 0.8125rem;
		color: var(--text-secondary);
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

	/* Framework Links */
	.framework-links {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}

	.framework-links a {
		text-decoration: none;
	}

	.framework-name {
		display: block;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 0.25rem;
	}

	.framework-desc {
		font-size: 0.875rem;
		color: var(--text-secondary);
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
		letter-spacing: -0.01em;
	}

	.faq-item p {
		margin: 0;
		font-size: 0.9375rem;
		line-height: 1.7;
		color: var(--text-secondary);
	}

	@media (max-width: 768px) {
		.faq-item h3 {
			font-size: 1rem;
		}
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

	/* Responsive */
	@media (max-width: 768px) {
		.framework-links {
			grid-template-columns: 1fr;
		}
	}
</style>
