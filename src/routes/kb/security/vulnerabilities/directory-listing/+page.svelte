<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Directory Listing Enabled: Find & Fix Server Misconfigurations',
		description: 'Directory listing exposes your file structure to attackers. CWE-548 server misconfiguration. Config hardening checklist for Apache, Nginx, Express, and Next.js.',
		url: '/kb/security/vulnerabilities/directory-listing/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Directory Listing' }
	];

	// Real external data sources
	const owaspData = {
		category: 'A01:2021 - Broken Access Control',
		source: 'https://owasp.org/Top10/A01_2021-Broken_Access_Control/',
		cweId: 'CWE-548',
		cweSource: 'https://cwe.mitre.org/data/definitions/548.html'
	};

	// FAQ data for schema
	const faqs = [
		{
			question: 'What information can attackers get from directory listing?',
			answer: 'Directory listing reveals your complete file structure: backup files (.bak, .old), configuration files, source code, hidden directories, upload folders, and temporary files. Attackers use this reconnaissance to find sensitive files that should never be public. Environment files, database dumps, and admin paths often appear in these listings.'
		},
		{
			question: 'Is directory listing enabled by default on most servers?',
			answer: 'Apache enables it by default with Options Indexes. Nginx has autoindex off by default but many configurations enable it. Express static middleware disables it by default. Vibe coded projects often copy-paste server configs without understanding defaults. Always verify your specific configuration rather than assuming.'
		},
		{
			question: 'How do I check if directory listing is enabled on my site?',
			answer: 'Navigate to any directory path on your site that exists but has no index file. If you see a file listing with clickable links, directory listing is enabled. Check /uploads/, /assets/, /static/, and /backup/ paths. Automated scanners like nikto and OWASP ZAP detect this misconfiguration during routine scans.'
		},
		{
			question: 'Does disabling directory listing fully protect my files?',
			answer: 'Disabling directory listing is necessary but not sufficient. Files are still accessible if attackers guess or brute-force filenames. Sensitive files like .env, config.json, and backup archives need proper access controls beyond just hiding the listing. Defense in depth means multiple protections: disable listing, restrict file access, and move sensitive files outside the web root.'
		},
		{
			question: 'Why do AI coding tools generate configs with directory listing enabled?',
			answer: 'AI tools optimize for functionality over security hardening. When generating server configurations, they produce working setups that serve files correctly. Security hardening requires explicit instruction. The training data includes countless development configs where directory listing aids debugging. Production hardening patterns appear less frequently in public code.'
		}
	];

	// Server config checklist
	const serverChecklist = [
		{ server: 'Apache', config: 'Options -Indexes in .htaccess or httpd.conf', location: '.htaccess, /etc/apache2/apache2.conf' },
		{ server: 'Nginx', config: 'autoindex off; in server/location block', location: 'nginx.conf, sites-available/' },
		{ server: 'Express', config: 'serveIndex: false in static middleware', location: 'app.js, server.js' },
		{ server: 'Next.js', config: 'Verify /public folder has no sensitive files', location: 'next.config.js' },
		{ server: 'Vercel', config: 'cleanUrls and trailingSlash settings', location: 'vercel.json' },
		{ server: 'IIS', config: 'directoryBrowse enabled="false"', location: 'web.config' }
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
			{"@type": "ListItem", "position": 4, "name": "Directory Listing"}
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
				<span class="badge badge-medium">Medium</span>
				<span class="badge">CWE-548</span>
				<span class="badge">OWASP A01:2021</span>
			</div>
			<h1>Directory Listing Enabled</h1>
			<p class="text-secondary">A server misconfiguration that exposes your file structure to reconnaissance attacks</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Directory listing displays all files in a folder when no index file exists, giving attackers a map of your application.</strong>
				Security audits flag this configuration issue constantly. It falls under <a href="https://owasp.org/Top10/A01_2021-Broken_Access_Control/">OWASP A01:2021 Broken Access Control</a> and is classified as <a href="https://cwe.mitre.org/data/definitions/548.html">CWE-548</a>.
				One server config line fixes it across your entire site.
			</p>
		</div>

		<!-- Stats Box -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">{owaspData.cweId}</div>
				<div class="stat-label"><a href={owaspData.cweSource}>CWE ID</a></div>
			</div>
			<div class="stat-box">
				<div class="stat-value">A01</div>
				<div class="stat-label">OWASP Category</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">1 line</div>
				<div class="stat-label">Config to Fix</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Medium</div>
				<div class="stat-label">Severity</div>
			</div>
		</div>
		<p class="data-source">
			Source: <a href={owaspData.source}>OWASP Top 10 (2021)</a>, <a href={owaspData.cweSource}>MITRE CWE-548</a>
		</p>

		<!-- What Is It -->
		<section class="article-section">
			<h2>What is directory listing?</h2>
			<p>
				Directory listing is a server configuration that displays the contents of a directory when no index file (index.html, index.php) exists. Navigate to /uploads/ on a misconfigured server, and the browser shows every file in that folder with clickable download links.
			</p>
			<p>
				This pattern appears in code reviews constantly. The server technically works. Files get served correctly. But the configuration violates a fundamental security principle: minimize information disclosure.
			</p>
			<p>
				According to <a href="https://cwe.mitre.org/data/definitions/548.html">MITRE CWE-548</a>, this weakness enables attackers to gather sensitive information about the application's structure. Backup files, configuration fragments, temporary uploads, and forgotten test files become visible. Reconnaissance that should take hours now takes seconds.
			</p>
		</section>

		<!-- AI Tool Patterns -->
		<section class="article-section">
			<h2>How do AI tools cause directory listing exposure?</h2>
			<p>
				Vibe coded projects inherit server configurations from AI-generated boilerplate. The AI produces working configs, not hardened ones. Express static middleware, Apache virtual hosts, Nginx server blocks. They all serve files correctly while exposing directory structure.
			</p>

			<div class="tool-patterns-box">
				<h3>The pattern flagged in security audits</h3>
				<p>AI-generated Express configuration with static file serving:</p>
				<div class="code-block">
					<pre><code>{`// AI-generated server setup - works but exposes directories
const express = require('express');
const app = express();

// This serves files AND enables directory browsing
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Missing: serveIndex disabled, no file extension filters
// Missing: access control on upload directories`}</code></pre>
				</div>
				<p class="pattern-note">
					The configuration serves files correctly. Development works fine. But <code>/uploads/</code> shows every uploaded file to anyone who visits the path. Production audit finding: immediate remediation required.
				</p>
			</div>

			<p>
				AI tools generate development-friendly configurations. Directory listing helps during development when you need to see what files exist. Production servers require the opposite: hide everything that is not explicitly needed.
			</p>
		</section>

		<!-- What Could Happen -->
		<section class="article-section">
			<h2>What information does directory listing expose?</h2>
			<p>
				Security audits document what attackers find through directory listing. The reconnaissance value is significant.
			</p>
			<ul class="consequences-list">
				<li><strong>Backup files:</strong> Files ending in .bak, .old, .backup, .sql contain previous versions of code and database dumps. These often include hardcoded credentials that were "removed" in the current version.</li>
				<li><strong>Configuration files:</strong> Files like config.php.sample, .env.example, settings.json.bak reveal environment variable names, API structures, and sometimes actual secrets.</li>
				<li><strong>Upload directories:</strong> User uploads, admin uploads, temporary files. Attackers discover file naming patterns, potentially sensitive documents, and upload bypass opportunities.</li>
				<li><strong>Hidden directories:</strong> Folders like /admin/, /test/, /debug/, /staging/ that developers assume are private because "nobody knows the URL."</li>
				<li><strong>Source code:</strong> IDE backup files (.swp, ~files), version control artifacts (.git contents if exposed), compiled but unminified JavaScript.</li>
			</ul>
			<p>
				Each item represents a finding in security audits. Combined, they provide a complete map for targeted attacks.
			</p>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How do I detect directory listing?</h2>
			<p>
				The audit process checks every directory path that might exist without an index file. Standard security scans include this verification.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Audit checklist</span>
				</div>
				<pre><code>{`# Manual verification steps:

1. Navigate to known directories without index files:
   /uploads/
   /assets/
   /static/
   /images/
   /backup/
   /admin/
   /api/ (if no routing)

2. Check for file listing HTML response:
   - "Index of /" in page title
   - Clickable file links
   - File sizes and modification dates

3. Use automated scanners:
   nikto -h https://yoursite.com
   dirb https://yoursite.com
   OWASP ZAP automated scan

4. Verify server config:
   Apache: grep -r "Options.*Indexes" /etc/apache2/
   Nginx: grep -r "autoindex" /etc/nginx/`}</code></pre>
			</div>

			<div class="cta-box">
				<p><strong>Scan your deployment for server misconfigurations</strong></p>
				<a href="https://scanner.vibeship.co" class="btn btn-green">
					Run security scan
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M5 12h14M12 5l7 7-7 7"/>
					</svg>
				</a>
			</div>
		</section>

		<!-- Server Hardening Checklist -->
		<section class="article-section">
			<h2>Server hardening checklist</h2>
			<p>
				Every server type requires specific configuration. The following checklist covers the most common deployment targets for vibe coded applications.
			</p>

			<div class="table-wrapper">
				<table>
					<thead>
						<tr>
							<th>Server</th>
							<th>Configuration</th>
							<th>Location</th>
						</tr>
					</thead>
					<tbody>
						{#each serverChecklist as item}
							<tr>
								<td><strong>{item.server}</strong></td>
								<td><code>{item.config}</code></td>
								<td>{item.location}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</section>

		<!-- How to Fix -->
		<section class="article-section">
			<h2>How do I fix directory listing?</h2>
			<p>
				The remediation is a server configuration change. One line in the correct location disables directory listing site-wide. The fix applies during the next server reload.
			</p>

			<!-- AI Fix Prompt -->
			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>This prompt systematically hardens server configuration against directory listing and related information disclosure:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Audit and fix directory listing vulnerabilities in my server configuration.

## What to look for

1. Apache configurations (.htaccess, httpd.conf, apache2.conf):
   - Options Indexes (enables directory listing)
   - Missing Options -Indexes directive

2. Nginx configurations (nginx.conf, sites-available/):
   - autoindex on; (enables directory listing)
   - Missing autoindex off; in location blocks

3. Express/Node.js server files:
   - express.static() without serveIndex disabled
   - serve-index package usage
   - directory listing in static middleware options

4. Next.js / Vercel deployments:
   - Sensitive files in /public folder
   - API routes exposing file system

## How to fix

### Apache (.htaccess or vhost config):
\`\`\`apache
Options -Indexes
\`\`\`

### Nginx (server or location block):
\`\`\`nginx
autoindex off;
\`\`\`

### Express static middleware:
\`\`\`javascript
// Before: exposes directory contents
app.use(express.static('public'));

// After: explicitly disable directory listing
app.use(express.static('public', {
  index: false,
  dotfiles: 'deny'
}));
\`\`\`

## Additional hardening

1. Remove backup files from web root:
   - *.bak, *.old, *.backup, *.sql, *.swp

2. Block sensitive file extensions:
   - .env, .git, .htaccess (if not Apache)

3. Add security headers:
   - X-Content-Type-Options: nosniff

4. Verify all static directories serve only intended content

## After fixing

1. Test each static directory path manually
2. Run nikto or OWASP ZAP scan
3. List all configuration changes with before/after

Proceed through my server configuration files systematically.`}</div>
				</div>
			</div>

			<!-- Manual Fix -->
			<div class="fix-section">
				<h3>Configuration fixes by server</h3>

				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-label">Apache - Vulnerable</div>
						<pre><code>{`# httpd.conf or .htaccess
<Directory /var/www/html>
    Options Indexes FollowSymLinks
    AllowOverride All
</Directory>

# Directory listing ENABLED
# /uploads/ shows all files`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-label">Apache - Secure</div>
						<pre><code>{`# httpd.conf or .htaccess
<Directory /var/www/html>
    Options -Indexes +FollowSymLinks
    AllowOverride All
</Directory>

# Directory listing DISABLED
# /uploads/ returns 403 Forbidden`}</code></pre>
					</div>
				</div>

				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-label">Nginx - Vulnerable</div>
						<pre><code>{`# nginx.conf
server {
    location /uploads/ {
        autoindex on;
        alias /var/www/uploads/;
    }
}

# Directory listing ENABLED`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-label">Nginx - Secure</div>
						<pre><code>{`# nginx.conf
server {
    location /uploads/ {
        autoindex off;
        alias /var/www/uploads/;
    }
}

# Directory listing DISABLED`}</code></pre>
					</div>
				</div>

				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-label">Express - Vulnerable</div>
						<pre><code>{`const express = require('express');
const serveIndex = require('serve-index');
const app = express();

// Enables directory browsing
app.use('/files', express.static('files'));
app.use('/files', serveIndex('files'));`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-label">Express - Secure</div>
						<pre><code>{`const express = require('express');
const app = express();

// Static files only, no directory listing
app.use('/files', express.static('files', {
  index: false,
  dotfiles: 'deny',
  extensions: ['html', 'css', 'js', 'png', 'jpg']
}));`}</code></pre>
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
				<a href="/kb/security/vulnerabilities/verbose-errors/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Verbose Error Messages</div>
					<p class="related-card-description">Information disclosure through detailed error responses</p>
				</a>
				<a href="/kb/security/vulnerabilities/missing-security-headers/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Missing Security Headers</div>
					<p class="related-card-description">HTTP header misconfigurations that weaken security</p>
				</a>
				<a href="/kb/security/vulnerabilities/insecure-file-upload/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Insecure File Upload</div>
					<p class="related-card-description">Upload directory risks and file type validation</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Audit your server configuration</h2>
			<p>Server misconfigurations appear in every security assessment. Verify your deployment before attackers do.</p>
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

	/* Code Comparison - Stacked Layout */
	.code-comparison {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.code-block.vulnerable {
		border-left: 3px solid var(--red);
	}

	.code-block.secure {
		border-left: 3px solid var(--green);
	}

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
</style>
