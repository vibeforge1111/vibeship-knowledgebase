<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Insecure File Upload: How AI Code Lets Attackers Upload Web Shells',
		description:
			'Insecure file upload lets attackers upload malicious files to your server. Learn why AI generates vulnerable upload code and how to fix it with secure patterns.',
		url: '/kb/security/vulnerabilities/insecure-file-upload/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Insecure File Upload' }
	];

	// FAQ data
	const faqs = [
		{
			question: 'What is insecure file upload?',
			answer:
				'Insecure file upload is a vulnerability where attackers can upload malicious files (like web shells) to your server due to insufficient validation. This can lead to remote code execution and complete server takeover. It\'s ranked in OWASP\'s Top 10 under Insecure Design (A04:2021).'
		},
		{
			question: 'Why do AI tools generate insecure file upload code?',
			answer:
				'AI tools prioritize getting uploads "working" over security. They commonly trust user-provided filenames (req.file.originalname), use extension blacklists instead of allowlists, skip content validation, and store files in publicly accessible directories. These patterns come from training data that emphasized functionality.'
		},
		{
			question: 'What is a web shell?',
			answer:
				'A web shell is a malicious script (usually PHP, JSP, or ASP) that gives attackers command-line access to your server through a web browser. Once uploaded, attackers can execute commands, read files, access databases, and pivot to other systems. Uploading a web shell often means game over for your server.'
		},
		{
			question: 'How do I validate file uploads securely?',
			answer:
				'Use multiple layers: 1) Allowlist permitted extensions (not blacklist), 2) Validate content type using magic bytes (file-type library), 3) Generate random filenames (never use user input), 4) Store outside webroot or use cloud storage, 5) Set size limits, 6) Scan with antivirus for sensitive applications.'
		},
		{
			question: 'Is checking file extension enough?',
			answer:
				'No. Extension checks can be bypassed with double extensions (file.php.jpg), null bytes (file.php%00.jpg), case variations (file.PHP), and content-type spoofing. Always validate the actual file content using magic byte detection in addition to extension checks.'
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
			{"@type": "ListItem", "position": 2, "name": "Security", "item": "https://vibeship.co/kb/security"},
			{"@type": "ListItem", "position": 3, "name": "Vulnerabilities", "item": "https://vibeship.co/kb/security/vulnerabilities"},
			{"@type": "ListItem", "position": 4, "name": "Insecure File Upload"}
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
				<span class="badge badge-critical">Critical</span>
				<span class="badge badge-cwe">CWE-434</span>
				<span class="badge badge-owasp">OWASP A04:2021</span>
			</div>
			<h1>Insecure File Upload: How AI Code Lets Attackers Upload Web Shells</h1>
			<p class="subtitle">
				When file uploads go wrong, attackers get shell access to your server
			</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Insecure file upload</strong> lets attackers upload malicious files like web shells to your server. AI tools commonly generate vulnerable patterns: trusting user filenames, using extension blacklists, and skipping content validation. A successful attack means complete server takeover. See <a href="https://cwe.mitre.org/data/definitions/434.html" target="_blank" rel="noopener">CWE-434</a>.
			</p>
		</div>

		<!-- What Is It -->
		<section>
			<h2>What is insecure file upload?</h2>
			<p>
				Insecure file upload occurs when your application accepts files without properly validating their type, content, or destination. Attackers exploit this to upload malicious files - most dangerously, web shells that give them command-line access to your server.
			</p>
			<p>
				Think of it like a building with a mail slot big enough to pass through anything. Instead of letters, an attacker slips through a remote control that lets them operate everything inside.
			</p>
			<p>
				The <a href="https://owasp.org/Top10/A04_2021-Insecure_Design/" target="_blank" rel="noopener">OWASP Top 10</a> categorizes this under A04:2021 Insecure Design because the vulnerability stems from missing security controls at the design level.
			</p>
		</section>

		<!-- Why AI Generates This -->
		<section>
			<h2>Why AI tools generate insecure file uploads</h2>
			<p>
				When you ask an AI tool to "add file upload," it generates code that works - but often with dangerous patterns:
			</p>

			<div class="pattern-grid">
				<div class="pattern-card vulnerable">
					<h3>Trusting User Filenames</h3>
					<p>AI uses <code>req.file.originalname</code> directly, enabling path traversal attacks like <code>../../../etc/passwd</code></p>
				</div>
				<div class="pattern-card vulnerable">
					<h3>Extension Blacklists</h3>
					<p>Blocking .php, .exe misses .php5, .phtml, .php.jpg and dozens of other dangerous extensions</p>
				</div>
				<div class="pattern-card vulnerable">
					<h3>Trusting Content-Type</h3>
					<p>Checking <code>req.file.mimetype</code> is useless - attackers control this header completely</p>
				</div>
				<div class="pattern-card vulnerable">
					<h3>Storing in Webroot</h3>
					<p>Saving to <code>/public/uploads</code> makes uploaded files directly executable</p>
				</div>
			</div>
		</section>

		<!-- Vulnerable Code Example -->
		<section>
			<h2>Vulnerable code AI generates</h2>
			<p>
				Here's typical AI-generated upload code with multiple vulnerabilities:
			</p>

			<div class="code-block">
				<div class="code-label vulnerable">Vulnerable - Multiple issues</div>
				<pre><code>{`// Express + Multer - AI-generated vulnerable upload
const multer = require('multer');

const storage = multer.diskStorage({
  destination: './public/uploads',  // ❌ Stored in webroot
  filename: (req, file, cb) => {
    cb(null, file.originalname);    // ❌ User-controlled filename
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // ❌ Blacklist approach - easily bypassed
    const blocked = ['.php', '.exe', '.sh', '.bat'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (blocked.includes(ext)) {
      return cb(new Error('File type not allowed'));
    }
    cb(null, true);
  }
});

app.post('/upload', upload.single('file'), (req, res) => {
  // ❌ No content validation
  res.json({ url: '/uploads/' + req.file.filename });
});`}</code></pre>
			</div>

			<h3>What's Wrong</h3>
			<ul>
				<li><strong>Line 4:</strong> Files stored in publicly accessible directory</li>
				<li><strong>Line 6:</strong> User controls filename - path traversal possible</li>
				<li><strong>Lines 11-16:</strong> Blacklist bypassed with .php5, .phtml, double extensions</li>
				<li><strong>Line 21:</strong> No validation of actual file contents</li>
			</ul>
		</section>

		<!-- Attack Techniques -->
		<section>
			<h2>Common bypass techniques</h2>
			<p>
				Attackers have over a decade of techniques to bypass file upload validation:
			</p>

			<div class="table-wrapper">
				<table class="data-table">
					<thead>
						<tr>
							<th>Technique</th>
							<th>Example</th>
							<th>Bypasses</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Double Extension</td>
							<td><code>shell.php.jpg</code></td>
							<td>Extension allowlists checking only last extension</td>
						</tr>
						<tr>
							<td>Null Byte</td>
							<td><code>shell.php%00.jpg</code></td>
							<td>Some parsers truncate at null byte</td>
						</tr>
						<tr>
							<td>Case Variation</td>
							<td><code>shell.PhP</code></td>
							<td>Case-sensitive extension checks</td>
						</tr>
						<tr>
							<td>Alternative Extensions</td>
							<td><code>shell.php5</code>, <code>.phtml</code></td>
							<td>Incomplete extension blacklists</td>
						</tr>
						<tr>
							<td>Content-Type Spoofing</td>
							<td>Send <code>image/jpeg</code> for PHP file</td>
							<td>MIME type validation</td>
						</tr>
						<tr>
							<td>Path Traversal</td>
							<td><code>../../../var/www/shell.php</code></td>
							<td>Trusting user-provided filenames</td>
						</tr>
						<tr>
							<td>Polyglot Files</td>
							<td>Valid JPEG that's also valid PHP</td>
							<td>Magic byte validation alone</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- Secure Implementation -->
		<section>
			<h2>Secure file upload implementation</h2>
			<p>
				Here's how to implement file uploads securely in Node.js:
			</p>

			<div class="code-block">
				<div class="code-label secure">Secure - Defense in depth</div>
				<pre><code>{`import multer from 'multer';
import { fileTypeFromBuffer } from 'file-type';
import crypto from 'crypto';
import path from 'path';

// ✅ Store OUTSIDE webroot
const UPLOAD_DIR = '/var/uploads';  // Not in /public

// ✅ Allowlist of permitted MIME types
const ALLOWED_TYPES = new Map([
  ['image/jpeg', '.jpg'],
  ['image/png', '.png'],
  ['image/gif', '.gif'],
  ['application/pdf', '.pdf'],
]);

// ✅ Memory storage for content inspection
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,  // ✅ 5MB limit
    files: 1,
  },
});

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    // ✅ Validate actual content using magic bytes
    const fileType = await fileTypeFromBuffer(req.file.buffer);

    if (!fileType || !ALLOWED_TYPES.has(fileType.mime)) {
      return res.status(400).json({
        error: 'Invalid file type. Allowed: JPEG, PNG, GIF, PDF'
      });
    }

    // ✅ Generate random filename - NEVER use user input
    const randomName = crypto.randomBytes(16).toString('hex');
    const safeExt = ALLOWED_TYPES.get(fileType.mime);
    const filename = \`\${randomName}\${safeExt}\`;

    // ✅ Ensure path stays within upload directory
    const filepath = path.join(UPLOAD_DIR, filename);
    if (!filepath.startsWith(UPLOAD_DIR)) {
      return res.status(400).json({ error: 'Invalid path' });
    }

    // ✅ Write file with restrictive permissions
    await fs.writeFile(filepath, req.file.buffer, { mode: 0o644 });

    // ✅ Return ID, not direct path - serve through controller
    res.json({ fileId: randomName });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// ✅ Serve files through controller, not static directory
app.get('/files/:id', async (req, res) => {
  const id = req.params.id.replace(/[^a-f0-9]/gi, '');  // Sanitize
  const files = await fs.readdir(UPLOAD_DIR);
  const file = files.find(f => f.startsWith(id));

  if (!file) {
    return res.status(404).json({ error: 'File not found' });
  }

  const filepath = path.join(UPLOAD_DIR, file);
  res.sendFile(filepath);
});`}</code></pre>
			</div>

			<h3>Security Layers Explained</h3>
			<ol>
				<li><strong>Store outside webroot:</strong> Files in <code>/var/uploads</code> can't be directly accessed or executed</li>
				<li><strong>Allowlist, not blacklist:</strong> Only permit known-safe types, reject everything else</li>
				<li><strong>Magic byte validation:</strong> <code>file-type</code> library reads actual file content, not user-controlled headers</li>
				<li><strong>Random filenames:</strong> Cryptographic random names prevent path traversal and enumeration</li>
				<li><strong>Size limits:</strong> Prevent DoS through large file uploads</li>
				<li><strong>Serve through controller:</strong> Never expose upload directory directly to web</li>
			</ol>
		</section>

		<!-- Cloud Storage -->
		<section>
			<h2>Even better: Use cloud storage</h2>
			<p>
				For most vibe coded apps, cloud storage eliminates server-side risks entirely:
			</p>

			<div class="code-block">
				<div class="code-label secure">Secure - S3 presigned URLs</div>
				<pre><code>{`import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3 = new S3Client({ region: process.env.AWS_REGION });

// Generate presigned URL - client uploads directly to S3
app.post('/upload-url', authenticateUser, async (req, res) => {
  const { filename, contentType } = req.body;

  // ✅ Validate content type
  const allowed = ['image/jpeg', 'image/png', 'application/pdf'];
  if (!allowed.includes(contentType)) {
    return res.status(400).json({ error: 'Invalid file type' });
  }

  // ✅ Generate safe key with user isolation
  const key = \`uploads/\${req.user.id}/\${crypto.randomUUID()}\`;

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: key,
    ContentType: contentType,
    // ✅ Limit size
    ContentLength: 5 * 1024 * 1024,
  });

  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 });

  res.json({ uploadUrl, key });
});`}</code></pre>
			</div>

			<p>
				<strong>Benefits of cloud storage:</strong>
			</p>
			<ul>
				<li>Files never touch your server (no execution risk)</li>
				<li>Built-in CDN and scalability</li>
				<li>Automatic malware scanning available</li>
				<li>User isolation through key prefixes</li>
			</ul>
		</section>

		<!-- AI Fix Prompt -->
		<section class="ai-fix-section">
			<h2>AI fix prompt: File upload audit</h2>
			<p>
				Copy this prompt to audit your file upload code:
			</p>

			<div class="code-block ai-prompt">
				<div class="code-label">Copy-paste into your AI tool</div>
				<pre><code>{`## Security Audit: File Upload Vulnerabilities

Review this code for insecure file upload patterns. Check for:

### Filename Handling
1. Using req.file.originalname or user-provided filenames
2. Missing path traversal prevention (../)
3. Predictable or sequential filenames

### Validation Issues
4. Extension blacklists instead of allowlists
5. Trusting Content-Type header (req.file.mimetype)
6. Missing magic byte validation
7. No file size limits

### Storage Problems
8. Files stored in webroot (/public, /static, /uploads)
9. Files directly accessible via URL
10. Executable permissions on upload directory

### Missing Controls
11. No authentication on upload endpoint
12. No rate limiting
13. Missing antivirus scanning for sensitive apps

### For each issue found:
- Specific line number and code
- Attack scenario (how it could be exploited)
- Fixed code using:
  - file-type library for content validation
  - crypto.randomBytes for filenames
  - Storage outside webroot OR cloud storage

[PASTE YOUR FILE UPLOAD CODE HERE]`}</code></pre>
			</div>
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
			<h2>Related Vulnerabilities</h2>
			<div class="related-grid">
				<a href="/kb/security/vulnerabilities/path-traversal/" class="related-card">
					<span class="related-type">Vulnerability</span>
					<span class="related-title">Path Traversal</span>
					<span class="related-desc">Often combined with file upload attacks</span>
				</a>
				<a href="/kb/security/vulnerabilities/command-injection/" class="related-card">
					<span class="related-type">Vulnerability</span>
					<span class="related-title">Command Injection</span>
					<span class="related-desc">What happens after web shell upload</span>
				</a>
				<a href="/kb/security/vulnerabilities/broken-access-control/" class="related-card">
					<span class="related-type">Vulnerability</span>
					<span class="related-title">Broken Access Control</span>
					<span class="related-desc">Missing auth on upload endpoints</span>
				</a>
				<a href="/kb/security/vulnerabilities/missing-auth/" class="related-card">
					<span class="related-type">Vulnerability</span>
					<span class="related-title">Missing Authentication</span>
					<span class="related-desc">Unprotected upload routes</span>
				</a>
				<a href="/kb/vibe-coding/secure-vibe-coding-guide/" class="related-card">
					<span class="related-type">Pillar Guide</span>
					<span class="related-title">Secure Vibe Coding Guide</span>
					<span class="related-desc">Complete security for AI-generated code</span>
				</a>
				<a href="/kb/security/checklists/pre-launch/" class="related-card">
					<span class="related-type">Checklist</span>
					<span class="related-title">Pre-Launch Security</span>
					<span class="related-desc">Verify before deploying</span>
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
		background: rgba(239, 68, 68, 0.2);
		color: #ef4444;
	}

	.badge-cwe {
		background: rgba(168, 85, 247, 0.2);
		color: #a855f7;
	}

	.badge-owasp {
		background: rgba(249, 115, 22, 0.2);
		color: #f97316;
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
		background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.05) 100%);
		border: 1px solid rgba(239, 68, 68, 0.3);
		border-radius: 8px;
		padding: 1.5rem;
		margin-bottom: 2rem;
	}

	.quick-answer-label {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		color: #ef4444;
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

	ul,
	ol {
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
		color: var(--green);
	}

	code {
		background: var(--surface-2, #2a2a2a);
		padding: 0.15rem 0.4rem;
		border-radius: 4px;
		font-size: 0.85em;
		font-family: 'Monaco', 'Menlo', monospace;
	}

	/* Pattern Grid */
	.pattern-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.pattern-card {
		background: var(--surface-1, #1a1a1a);
		border-radius: 8px;
		padding: 1.25rem;
		border: 1px solid var(--border, #333);
	}

	.pattern-card.vulnerable {
		border-color: rgba(239, 68, 68, 0.3);
	}

	.pattern-card h3 {
		margin-top: 0;
		font-size: 1rem;
		color: #ef4444;
	}

	.pattern-card p {
		margin: 0;
		font-size: 0.9rem;
		color: var(--text-secondary, #aaa);
	}

	/* Code Blocks */
	.code-block {
		background: var(--surface-1, #1a1a1a);
		border: 1px solid var(--border, #333);
		border-radius: 8px;
		margin: 1rem 0;
		overflow: hidden;
	}

	.code-label {
		background: var(--surface-2, #252525);
		padding: 0.5rem 1rem;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		color: var(--text-secondary, #888);
		border-bottom: 1px solid var(--border, #333);
	}

	.code-label.vulnerable {
		background: rgba(239, 68, 68, 0.1);
		color: #ef4444;
	}

	.code-label.secure {
		background: rgba(34, 197, 94, 0.1);
		color: #22c55e;
	}

	.code-block pre {
		margin: 0;
		padding: 1rem;
		overflow-x: auto;
	}

	.code-block code {
		font-family: 'Monaco', 'Menlo', monospace;
		font-size: 0.85rem;
		line-height: 1.5;
		background: transparent;
		padding: 0;
	}

	/* Data Table */
	.table-wrapper {
		overflow-x: auto;
		margin: 1.5rem 0;
	}

	.data-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.9rem;
	}

	.data-table th,
	.data-table td {
		padding: 0.75rem 1rem;
		text-align: left;
		border-bottom: 1px solid var(--border, #333);
	}

	.data-table th {
		background: var(--surface-1, #1a1a1a);
		font-weight: 600;
	}

	.data-table code {
		font-size: 0.8rem;
	}

	/* AI Fix Section */
	.ai-fix-section {
		background: linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, rgba(34, 197, 94, 0.02) 100%);
		border: 1px solid rgba(34, 197, 94, 0.2);
		border-radius: 12px;
		padding: 1.5rem;
		margin: 2rem 0;
	}

	.ai-fix-section h2 {
		border-bottom: none;
		padding-bottom: 0;
		color: #22c55e;
	}

	.ai-prompt .code-label {
		background: rgba(34, 197, 94, 0.15);
		color: #22c55e;
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
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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
		font-size: 0.7rem;
		color: var(--text-secondary, #666);
		text-transform: uppercase;
		margin-bottom: 0.25rem;
	}

	.related-title {
		display: block;
		font-weight: 600;
		color: var(--text-primary, #fff);
		margin-bottom: 0.25rem;
	}

	.related-desc {
		display: block;
		font-size: 0.8rem;
		color: var(--text-secondary, #888);
	}
</style>
