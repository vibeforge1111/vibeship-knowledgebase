<script lang="ts">
	import { Header } from '$lib/components/layout';

	const meta = {
		title: 'Zip Slip Vulnerability: Detect & Fix Guide',
		description: 'Zip Slip lets attackers write files outside extraction directories via path traversal. Learn to detect and fix archive extraction vulnerabilities.',
		url: '/kb/security/vulnerabilities/zip-slip/'
	};

	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Zip Slip' }
	];

	const securityData = {
		cweId: 'CWE-22',
		cweName: 'Improper Limitation of a Pathname to a Restricted Directory',
		cweSource: 'https://cwe.mitre.org/data/definitions/22.html',
		owaspCategory: 'A01:2021 - Broken Access Control',
		owaspSource: 'https://owasp.org/Top10/A01_2021-Broken_Access_Control/',
		severity: 'High-Critical',
		cvssScore: '7.5-9.8'
	};

	const faqs = [
		{
			question: 'What is Zip Slip?',
			answer: 'Zip Slip is an archive extraction vulnerability where malicious filenames containing path traversal sequences (like ../../) allow attackers to write files outside the intended extraction directory. An archive entry named "../../etc/cron.d/backdoor" extracts to /etc/cron.d/ instead of the target folder, enabling RCE.'
		},
		{
			question: 'How do I prevent Zip Slip attacks?',
			answer: 'Validate that the resolved extraction path starts with the intended destination directory. Use canonical paths and reject any entry whose resolved path escapes the target. Never trust archive entry names—always validate before extraction. Use updated libraries that include Zip Slip protection.'
		},
		{
			question: 'Which languages are vulnerable to Zip Slip?',
			answer: 'Any language can be vulnerable if using archive libraries incorrectly. Java, Python, Node.js, Go, Ruby, and .NET all had vulnerable libraries before patches. The vulnerability is in how applications USE the libraries, not the libraries themselves—though many now include protections.'
		},
		{
			question: 'Can Zip Slip lead to RCE?',
			answer: 'Yes. Zip Slip commonly leads to RCE by overwriting executable files, config files, cron jobs, SSH keys, or web application files. If an attacker can write to locations like /etc/cron.d/, ~/.ssh/authorized_keys, or web roots, they achieve code execution.'
		},
		{
			question: 'How do I safely extract archives?',
			answer: 'For each archive entry: get the entry name, resolve the full extraction path, convert to canonical path, verify it starts with the target directory. If it doesn\'t, reject the entry. Use a dedicated extraction library with built-in protections. Never extract directly to sensitive locations.'
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
			{"@type": "ListItem", "position": 4, "name": "Zip Slip"}
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
				<span class="badge badge-critical">Critical</span>
				<span class="badge">{securityData.cweId}</span>
				<span class="badge">RCE Risk</span>
			</div>
			<h1>Zip Slip in Vibe Coded Apps</h1>
			<p class="text-secondary">When file extraction writes outside the target directory</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Zip Slip exploits path traversal in archive entry names to write files anywhere.</strong>
				A zip entry named <code>../../etc/cron.d/backdoor</code> extracts outside your target directory—directly to <code>/etc/cron.d/</code>. This leads to RCE. Fix: validate that every extraction path stays within the target directory using canonical path comparison.
			</p>
		</div>

		<!-- Stats Box -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">../../</div>
				<div class="stat-label">Path traversal</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">RCE</div>
				<div class="stat-label">Common outcome</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">All</div>
				<div class="stat-label">Languages affected</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Upload</div>
				<div class="stat-label">Common attack vector</div>
			</div>
		</div>

		<!-- What Is It - @pager_duty voice (firefighter, urgent) -->
		<section class="article-section">
			<h2>What is Zip Slip?</h2>
			<p>
				Zip Slip is a path traversal attack during archive extraction. The attacker creates a malicious archive where file entries contain <code>../</code> sequences. When your app extracts these files, they escape the target directory and overwrite critical system files.
			</p>

			<div class="attack-visual">
				<div class="attack-step-card">
					<div class="step-header critical">Malicious Archive</div>
					<div class="step-body">
						<code>evil.zip</code> contains:
						<ul>
							<li><code>../../etc/cron.d/backdoor</code></li>
							<li><code>../../../root/.ssh/authorized_keys</code></li>
							<li><code>../../var/www/html/shell.php</code></li>
						</ul>
					</div>
				</div>
				<div class="attack-arrow">→</div>
				<div class="attack-step-card">
					<div class="step-header warning">Extraction Target</div>
					<div class="step-body">
						<code>/tmp/uploads/user123/</code>
						<p>App extracts to this directory...</p>
					</div>
				</div>
				<div class="attack-arrow">→</div>
				<div class="attack-step-card">
					<div class="step-header critical">Actual Write Locations</div>
					<div class="step-body">
						<ul>
							<li><code>/etc/cron.d/backdoor</code> → RCE</li>
							<li><code>/root/.ssh/authorized_keys</code> → SSH access</li>
							<li><code>/var/www/html/shell.php</code> → Webshell</li>
						</ul>
					</div>
				</div>
			</div>

			<div class="alert-box critical">
				<strong>This is a P0 incident.</strong> If your app extracts user-uploaded archives without path validation, assume you're vulnerable. Check your extraction code immediately.
			</div>
		</section>

		<!-- Why Vibe Coded Apps -->
		<section class="article-section">
			<h2>Why vibe coded apps are vulnerable</h2>
			<p>
				AI generates file upload handling that "just works." It extracts archives without validating where files actually go. The extraction succeeds—files appear. Nobody checks that they're in the right place.
			</p>

			<div class="code-comparison">
				<div class="code-block code-bad">
					<div class="code-block-header">
						<span class="code-block-lang">Vulnerable - Direct extraction</span>
						<span class="code-label-bad">Path traversal possible</span>
					</div>
					<pre><code>{`// Node.js - AI-generated extraction
const AdmZip = require('adm-zip');

app.post('/upload', upload.single('file'), (req, res) => {
  const zip = new AdmZip(req.file.path);
  const extractPath = \`./uploads/\${req.user.id}/\`;

  // VULNERABLE: No path validation!
  zip.extractAllTo(extractPath, true);

  res.json({ success: true });
});

// Python - Same vulnerability
import zipfile

def extract_upload(zip_path, dest):
    with zipfile.ZipFile(zip_path) as zf:
        # VULNERABLE: extractall doesn't validate paths
        zf.extractall(dest)`}</code></pre>
				</div>
				<div class="code-block code-good">
					<div class="code-block-header">
						<span class="code-block-lang">Secure - Path validation before extraction</span>
						<span class="code-label-good">Fixed</span>
					</div>
					<pre><code>{`// Node.js - Safe extraction
const AdmZip = require('adm-zip');
const path = require('path');

function safeExtract(zipPath: string, destDir: string) {
  const zip = new AdmZip(zipPath);
  const entries = zip.getEntries();

  // Resolve destination to absolute path
  const destResolved = path.resolve(destDir);

  for (const entry of entries) {
    // Resolve full extraction path
    const entryPath = path.resolve(destDir, entry.entryName);

    // CRITICAL: Verify path stays within destination
    if (!entryPath.startsWith(destResolved + path.sep)) {
      throw new Error(\`Zip Slip detected: \${entry.entryName}\`);
    }

    // Safe to extract this entry
    zip.extractEntryTo(entry, destDir, true, true);
  }
}

// Python - Safe extraction
import zipfile
import os

def safe_extract(zip_path, dest):
    dest = os.path.realpath(dest)

    with zipfile.ZipFile(zip_path) as zf:
        for member in zf.namelist():
            # Resolve and validate each path
            member_path = os.path.realpath(os.path.join(dest, member))

            if not member_path.startswith(dest + os.sep):
                raise Exception(f"Zip Slip: {member}")

            zf.extract(member, dest)`}</code></pre>
				</div>
			</div>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How to detect Zip Slip</h2>
			<p>
				Test extraction with path traversal payloads.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Testing for Zip Slip</span>
				</div>
				<pre><code>{`# Create malicious test archive
# Using Python to create zip with traversal paths
python3 << 'EOF'
import zipfile

with zipfile.ZipFile('evil.zip', 'w') as zf:
    # Path traversal to write outside target
    zf.writestr('../../tmp/zipslip-test.txt', 'VULNERABLE')
    zf.writestr('../escape.txt', 'VULNERABLE')
    zf.writestr('normal.txt', 'safe file')
EOF

# Upload to your application
curl -F "file=@evil.zip" https://target.com/upload

# Check if files were written outside target
ls -la /tmp/zipslip-test.txt
# If exists: VULNERABLE

# Search codebase for vulnerable patterns
grep -r "extractAll" --include="*.js" --include="*.ts"
grep -r "extractall" --include="*.py"
grep -r "ZipInputStream" --include="*.java"
grep -r "Archive::extract" --include="*.rb"`}</code></pre>
			</div>

			<div class="check-list">
				<h3>Zip Slip audit checklist</h3>
				<ul>
					<li>Does extraction code validate entry paths?</li>
					<li>Are canonical/absolute paths compared?</li>
					<li>Are symlinks in archives handled safely?</li>
					<li>Is the archive library up to date?</li>
					<li>Are extraction directories properly sandboxed?</li>
				</ul>
			</div>

			<div class="cta-box">
				<p><strong>File upload = high risk area.</strong></p>
				<a href="https://scanner.vibeship.co" class="btn btn-green">
					Scan your upload handling
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M5 12h14M12 5l7 7-7 7"/>
					</svg>
				</a>
			</div>
		</section>

		<!-- How to Fix -->
		<section class="article-section">
			<h2>How to fix Zip Slip</h2>
			<p>
				Validate every extraction path before writing.
			</p>

			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>Copy this into your AI coding tool to find and fix Zip Slip vulnerabilities:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Audit my codebase for Zip Slip vulnerabilities.

## What to search for

1. Archive extraction code:
   \`\`\`
   extractAll
   extractAllTo
   extract(
   ZipFile
   ZipInputStream
   TarInputStream
   unzip
   gunzip
   \`\`\`

2. Archive libraries:
   \`\`\`
   adm-zip
   yauzl
   unzipper
   zipfile
   tarfile
   java.util.zip
   SharpZipLib
   \`\`\`

3. File upload + extraction patterns:
   \`\`\`
   upload.*extract
   .zip.*extract
   .tar.*extract
   \`\`\`

## Required fixes

### Fix 1: Path validation function
\`\`\`typescript
// utils/archiveSecurity.ts
import path from 'path';

export function isPathSafe(destDir: string, entryPath: string): boolean {
  // Resolve both paths to absolute
  const destResolved = path.resolve(destDir);
  const entryResolved = path.resolve(destDir, entryPath);

  // Entry must start with destination + separator
  // The separator prevents partial matches like /uploads vs /uploads-other
  return entryResolved.startsWith(destResolved + path.sep);
}

export function validateArchiveEntry(destDir: string, entryName: string): string {
  if (!isPathSafe(destDir, entryName)) {
    throw new Error(\`Zip Slip detected: \${entryName}\`);
  }
  return path.resolve(destDir, entryName);
}
\`\`\`

### Fix 2: Safe extraction wrapper
\`\`\`typescript
import AdmZip from 'adm-zip';
import { validateArchiveEntry } from './archiveSecurity';

export async function safeExtractZip(zipPath: string, destDir: string) {
  const zip = new AdmZip(zipPath);
  const entries = zip.getEntries();

  for (const entry of entries) {
    // Validate each entry before extraction
    const safePath = validateArchiveEntry(destDir, entry.entryName);

    if (entry.isDirectory) {
      await fs.mkdir(safePath, { recursive: true });
    } else {
      await fs.mkdir(path.dirname(safePath), { recursive: true });
      await fs.writeFile(safePath, entry.getData());
    }
  }
}
\`\`\`

### Fix 3: Python safe extraction
\`\`\`python
import zipfile
import os

def safe_extract_zip(zip_path: str, dest_dir: str):
    dest_dir = os.path.realpath(dest_dir)

    with zipfile.ZipFile(zip_path) as zf:
        for member in zf.namelist():
            # Get the real path after resolving
            member_path = os.path.realpath(
                os.path.join(dest_dir, member)
            )

            # Must start with destination directory
            if not member_path.startswith(dest_dir + os.sep):
                raise ValueError(f"Zip Slip attempt: {member}")

            # Safe to extract
            zf.extract(member, dest_dir)
\`\`\`

### Fix 4: Java safe extraction
\`\`\`java
public void safeExtract(ZipFile zip, File destDir) throws IOException {
    String destPath = destDir.getCanonicalPath();

    Enumeration<? extends ZipEntry> entries = zip.entries();
    while (entries.hasMoreElements()) {
        ZipEntry entry = entries.nextElement();
        File entryFile = new File(destDir, entry.getName());
        String entryPath = entryFile.getCanonicalPath();

        if (!entryPath.startsWith(destPath + File.separator)) {
            throw new IOException("Zip Slip: " + entry.getName());
        }

        if (entry.isDirectory()) {
            entryFile.mkdirs();
        } else {
            entryFile.getParentFile().mkdirs();
            try (InputStream in = zip.getInputStream(entry);
                 OutputStream out = new FileOutputStream(entryFile)) {
                in.transferTo(out);
            }
        }
    }
}
\`\`\`

## After fixing

1. Create test archive with ../../ paths
2. Attempt extraction—should throw error
3. Verify no files written outside destination
4. Update archive libraries to latest versions
5. Add symlink handling if applicable`}</div>
				</div>
			</div>

			<div class="fix-section">
				<h3>Key validation points</h3>
				<div class="validation-points">
					<div class="validation-point">
						<div class="point-icon">1</div>
						<div class="point-content">
							<strong>Resolve to absolute paths</strong>
							<p>Use <code>path.resolve()</code> or <code>os.path.realpath()</code> to get canonical paths.</p>
						</div>
					</div>
					<div class="validation-point">
						<div class="point-icon">2</div>
						<div class="point-content">
							<strong>Compare with destination + separator</strong>
							<p>Entry path must start with <code>destDir + /</code> to prevent partial matches.</p>
						</div>
					</div>
					<div class="validation-point">
						<div class="point-icon">3</div>
						<div class="point-content">
							<strong>Validate BEFORE writing</strong>
							<p>Check the path before extraction, not after. Once written, damage is done.</p>
						</div>
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
				<a href="/kb/security/vulnerabilities/path-traversal/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Path Traversal</div>
					<p class="related-card-description">Directory escape attacks</p>
				</a>
				<a href="/kb/security/vulnerabilities/insecure-file-upload/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Insecure File Upload</div>
					<p class="related-card-description">File upload security</p>
				</a>
				<a href="/kb/security/vulnerabilities/command-injection/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Command Injection</div>
					<p class="related-card-description">RCE via command execution</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Archive extraction needs validation</h2>
			<p>Don't let path traversal escape your upload directory.</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">
				Scan for Zip Slip
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

	/* Attack Visual */
	.attack-visual {
		display: flex;
		align-items: flex-start;
		gap: 0.5rem;
		margin: 1.5rem 0;
		overflow-x: auto;
		padding: 0.5rem 0;
	}

	.attack-step-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		min-width: 200px;
		flex-shrink: 0;
	}

	.step-header {
		padding: 0.5rem 1rem;
		font-weight: 600;
		font-size: 0.8125rem;
	}

	.step-header.critical {
		background: rgba(255, 107, 107, 0.15);
		color: var(--red);
	}

	.step-header.warning {
		background: rgba(255, 178, 55, 0.15);
		color: var(--orange);
	}

	.step-body {
		padding: 1rem;
	}

	.step-body code {
		display: block;
		font-size: 0.8125rem;
		margin-bottom: 0.5rem;
	}

	.step-body ul {
		margin: 0;
		padding-left: 1.25rem;
		font-size: 0.8125rem;
	}

	.step-body li {
		margin-bottom: 0.25rem;
	}

	.step-body p {
		margin: 0.5rem 0 0;
		font-size: 0.8125rem;
		color: var(--text-secondary);
	}

	.attack-arrow {
		color: var(--text-tertiary);
		font-size: 1.25rem;
		flex-shrink: 0;
		align-self: center;
	}

	/* Alert Box */
	.alert-box {
		padding: 1rem 1.25rem;
		margin: 1.5rem 0;
		font-size: 0.9375rem;
	}

	.alert-box.critical {
		background: rgba(255, 107, 107, 0.1);
		border-left: 3px solid var(--red);
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

	/* Check List */
	.check-list {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.check-list h3 {
		margin: 0 0 1rem;
		font-size: 1rem;
	}

	.check-list ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.check-list li {
		padding: 0.5rem 0;
		border-bottom: 1px solid var(--border);
		font-size: 0.9375rem;
		color: var(--text-secondary);
	}

	.check-list li:last-child {
		border-bottom: none;
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

	/* Validation Points */
	.validation-points {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-top: 1rem;
	}

	.validation-point {
		display: flex;
		gap: 1rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1rem;
	}

	.point-icon {
		width: 28px;
		height: 28px;
		background: var(--green-dim);
		color: var(--green);
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		font-size: 0.875rem;
		flex-shrink: 0;
	}

	.point-content strong {
		display: block;
		margin-bottom: 0.25rem;
	}

	.point-content p {
		margin: 0;
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
	}

	@media (max-width: 768px) {
		.attack-visual {
			flex-direction: column;
		}

		.attack-arrow {
			transform: rotate(90deg);
		}

		.faq-item h3 {
			font-size: 1rem;
		}
	}
</style>
